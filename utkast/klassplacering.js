/* Klassrumsplacering (utkast, utkast/klassplacering.html)
 *
 * Läraren ritar upp klassrummet (steg 1), skriver in klassen (steg 2) och
 * slumpar en placering (steg 3). Allt sparas i webbläsarens localStorage;
 * inga namn lämnar datorn.
 *
 * KOORDINATER
 *   Salen beskrivs i "världskoordinater" i centimeter: x åt höger, y bort
 *   från tavlan. Tavlan sitter alltid på norra väggen (y = 0). Planen kan
 *   visas med tavlan överst (elevernas vy) eller nederst (lärarens vy, som
 *   man ser salen från tavlan). Vändningen är en rotation 180° kring salens
 *   mitt, V(x, y) = (W − x, D − y), och den är sin egen invers. Namnkorten
 *   ritas alltid upprätt, oavsett hur bänken och planen är vridna.
 *
 * MÖBLER
 *   En möbel har typ, mittpunkt (x, y) och vridning (grader, steg om 45°).
 *   Vid vridning 0 sitter eleverna vända mot tavlan, alltså med stolen
 *   söder om bänken. Platsernas lokala koordinater står i TYPER.
 *
 * SLUMPNINGEN
 *   1. Låsta platser behålls. 2. Platserna som ska användas väljs efter
 *   inställningen för tomma platser (längst bak, utspridda, var som helst).
 *   3. Eleverna fördelas med simulerad avkylning mot en kostnad där varje
 *   brutet önskemål (fram, isär, ihop) kostar 100 och varje granne från den
 *   senast sparade placeringen kostar 1. Startläget är slumpat, så bland
 *   lika bra placeringar blir resultatet slumpmässigt.
 *
 * INTEGRITET
 *   Önskemålen (fram, isär, ihop) visas bara i panelen, aldrig på planen,
 *   i helskärmsläget, på utskriften eller på bilden.
 */
(() => {
'use strict';

const LS_KEY = 'fl-klassplacering-v1';
const M = 50;                 // marginal runt salen i planen (cm)
const SNAP = 10;              // möblerna hamnar på hela decimeter
const GRANNAVSTAND = 100;     // platser närmare än så räknas som grannar
const STOL_B = 46, STOL_D = 30;
const MIN_W = 400, MAX_W = 1600, MIN_D = 400, MAX_D = 1400;
const FONT = '"DM Sans", system-ui, sans-serif';

const TYPER = {
  enkel:   { namn: 'Enkelbänk', w: 70, h: 50, seats: [[0, 47]], kort: 72 },
  par:     { namn: 'Parbänk', w: 130, h: 50, seats: [[-32, 47], [32, 47]], kort: 62 },
  trio:    { namn: 'Labbänk', w: 190, h: 60, seats: [[-63, 52], [0, 52], [63, 52]], kort: 62 },
  grupp4:  { namn: 'Gruppbord, fyra', w: 130, h: 100, seats: [[-32, -72], [32, -72], [-32, 72], [32, 72]], kort: 62 },
  grupp6:  { namn: 'Gruppbord, sex', w: 190, h: 100, seats: [[-63, -72], [0, -72], [63, -72], [-63, 72], [0, 72], [63, 72]], kort: 62 },
  kateder: { namn: 'Kateder', w: 160, h: 80, seats: [], larare: [0, -62] },
};
const VAGGTYP = { dorr: { namn: 'Dörr', len: 90 }, fonster: { namn: 'Fönster', len: 160 } };
const PALETT = ['enkel', 'par', 'trio', 'grupp4', 'grupp6', 'kateder', 'dorr', 'fonster'];

// Påhittad exempelklass. Två elever heter Leo, så att man ser hur
// dubbletter skiljs åt med efternamnets första bokstav.
const EXEMPEL = ['Alva Lindqvist', 'Leo Andersson', 'Ella Nyström', 'Noah Karlsson', 'Maja Holm',
  'Liam Ahmadi', 'Saga Ek', 'Hugo Johansson', 'Vera Sandberg', 'Elias Persson', 'Alice Wikström',
  'Oscar Nilsson', 'Wilma Strand', 'William Hassan', 'Ebba Lund', 'Lucas Bergqvist', 'Freja Sjöberg',
  'Adam Öberg', 'Selma Dahl', 'Ali Yilmaz', 'Elsa Forsberg', 'Nils Mattsson', 'Agnes Lindgren',
  'Theo Ali', 'Signe Hedlund', 'Viktor Åberg', 'Nova Engström', 'Leo Svensson'];

const FARG = {
  golv: '#fbf8f1', ruta: '#cfdbea', vagg: '#2a2f38', ute: '#ece5d6',
  bank: '#efe0c2', bankKant: '#8a6a44', kateder: '#dcc49c',
  stol: '#ddd3c2', stolKant: '#9a8f7e', ink: '#0f1620', soft: '#3f4a5c', muted: '#7d776c',
  accent: '#c8324a', blue: '#1c3d6b', glas: '#d6e6f2', kort: '#ffffff',
  skarm: '#4a5d78', skarmLjus: '#a9b9cf',
};

/* ================= Hjälpfunktioner ================= */
const uid = () => Math.random().toString(36).slice(2, 10);
const snap = v => Math.round(v / SNAP) * SNAP;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtM = cm => (cm / 100).toFixed(1).replace('.', ',') + ' m';
const r1 = v => Math.round(v * 10) / 10;
function blanda(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function rot(x, y, deg) {
  const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
  return [x * c - y * s, x * s + y * c];
}
const $ = id => document.getElementById(id);
const IKON = {
  bock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" stroke-width="1.8"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/></svg>',
  kryss: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" stroke-width="1.8"/><path d="M12 7.5v5.5M12 16.5v.2"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  pen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  sop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M5.5 7l1 12.5A1.5 1.5 0 0 0 8 21h8a1.5 1.5 0 0 0 1.5-1.5L18.5 7M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"/></svg>',
  las: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/></svg>',
  oppen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 7.7-1.5"/></svg>',
  sparr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/></svg>',
  ut: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4h4v16h-4M10 17l-5-5 5-5M5 12h11"/></svg>',
  skriv: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
  bild: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>',
  kopiera: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/></svg>',
  spara: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M8 3v5h7V3M8 21v-7h8v7"/></svg>',
  fil: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 19h16"/></svg>',
  oppnafil: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5M4 19h16"/></svg>',
  skold: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg>',
  pil: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

/* ================= Tillstånd ================= */
function nyttRum(namn) {
  const r = { id: uid(), namn, W: 900, D: 800, items: [], vagg: [], blocked: [], skarmar: [] };
  r.items.push({ id: uid(), typ: 'kateder', x: 150, y: 110, rot: 0 });
  r.vagg = [
    { id: uid(), typ: 'dorr', wall: 'e', t: 130 },
    { id: uid(), typ: 'fonster', wall: 'w', t: 330 },
    { id: uid(), typ: 'fonster', wall: 'w', t: 590 },
  ];
  forval(r, 'par');
  return r;
}
function nyKlass(namn, namnlista) {
  return { id: uid(), namn, elever: (namnlista || []).map(n => ({ id: uid(), namn: n, har: true, fram: false })), rel: [], hist: [] };
}
function startlage() {
  const rum = nyttRum('Mitt klassrum');
  const k = nyKlass('Exempelklass', EXEMPEL);
  k.exempel = true;
  const e = n => k.elever.find(x => x.namn === n).id;
  k.elever.find(x => x.namn === 'Ella Nyström').fram = true;
  k.elever.find(x => x.namn === 'Hugo Johansson').fram = true;
  k.rel.push({ id: uid(), a: e('Oscar Nilsson'), b: e('William Hassan'), typ: 'isar' });
  k.rel.push({ id: uid(), a: e('Saga Ek'), b: e('Freja Sjöberg'), typ: 'ihop' });
  return {
    v: 1, rum: [rum], klasser: [k], rumId: rum.id, klassId: k.id, plac: {},
    inst: { tomma: 'fram', nya: true, vy: 'elev', namn: 'kort', lage: 'rum' },
  };
}
function lasIn() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY));
    if (s && s.v === 1 && Array.isArray(s.rum) && s.rum.length && Array.isArray(s.klasser)) return s;
  } catch (e) { /* tomt eller blockerat: börja om */ }
  return null;
}
let S = null;   // sätts längst ned, när alla tabeller finns
function normalisera(st) {
  for (const r of st.rum) { r.skarmar = r.skarmar || []; r.blocked = r.blocked || []; r.vagg = r.vagg || []; r.mobleringar = r.mobleringar || []; }
  return st;
}
let sparTimer = 0;
function spara() {
  // Skärmar på bänkar som inte längre finns tas bort
  for (const r of S.rum) { const ids = new Set(r.items.map(i => i.id)); r.skarmar = r.skarmar.filter(x => ids.has(x.bord)); }
  clearTimeout(sparTimer);
  sparTimer = setTimeout(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* privat läge */ } }, 250);
}
const rum = () => S.rum.find(r => r.id === S.rumId) || S.rum[0];
const klass = () => S.klasser.find(k => k.id === S.klassId) || S.klasser[0] || null;
function cur() {
  const k = klass(); if (!k) return { map: {}, lasta: [] };
  const key = k.id + '|' + rum().id;
  if (!S.plac[key]) S.plac[key] = { map: {}, lasta: [], rapport: null };
  return S.plac[key];
}

/* Ångra: hela tillståndet som JSON, högst 40 steg. */
const angraStack = [];
function minns() {
  angraStack.push(JSON.stringify(S));
  if (angraStack.length > 40) angraStack.shift();
  $('angraBtn').hidden = false;
}
function angra() {
  const s = angraStack.pop(); if (!s) return;
  S = normalisera(JSON.parse(s)); ui.val = null; ui.anim = null;
  $('angraBtn').hidden = !angraStack.length;
  spara(); allt();
}

/* UI-tillstånd som inte sparas */
const ui = { guider: null, forslagSvar: null, val: null, grupp: [], ram: null, drag: null, mal: null, anim: null, pop: null, senaste: null, skarm: false, sparr: false };

/* ================= Geometri ================= */
const lokalBoxCache = {};
// Möblernas mått. Katedern kan dras större eller mindre och har då egna w och h.
const KATEDER_MIN = [80, 50], KATEDER_MAX = [400, 220];
/* Egna bänkmått: varje sal kan ha egen bredd och eget djup för varje
   bänktyp (r.matt[typ] = { w, h } i cm). Stolarna står kvar 22 cm från
   bänkens kant och fördelas jämnt längs bredden. */
const MATT_MIN = [40, 30], MATT_MAX = [320, 200];
const STOLAVSTAND = 22;
const skaladCache = {};
function bankMatt(typ) {
  if (!S || !S.rum || typ === 'kateder') return null;
  const r = rum(); return r && r.matt ? r.matt[typ] || null : null;
}
function skalad(typ, w, h) {
  const key = typ + '|' + w + '|' + h;
  if (skaladCache[key]) return skaladCache[key];
  const t = TYPER[typ], n = t.seats.length > 3 ? t.seats.length / 2 : t.seats.length;
  const seats = t.seats.map(([sx, sy]) => [r1(sx * w / t.w), sy < 0 ? -(h / 2 + STOLAVSTAND) : h / 2 + STOLAVSTAND]);
  const kort = clamp(Math.round(w / n - 3), 44, 96);
  return (skaladCache[key] = { ...t, w, h, seats, kort });
}
function geo(it) {
  const t = TYPER[it.typ];
  if (it.typ === 'kateder') {
    if (!(it.w || it.h)) return t;
    const w = it.w || t.w, h = it.h || t.h;
    return { ...t, w, h, larare: [0, -h / 2 - 22] };
  }
  const m = bankMatt(it.typ);
  return m ? skalad(it.typ, m.w, m.h) : t;
}
function lokalBox(x) {
  const it = typeof x === 'string' ? { typ: x } : x;
  const egen = it.typ === 'kateder' && (it.w || it.h);
  const g0 = geo(it), nyckel = it.typ + '|' + g0.w + '|' + g0.h;
  if (!egen && lokalBoxCache[nyckel]) return lokalBoxCache[nyckel];
  const t = geo(it);
  let x0 = -t.w / 2, x1 = t.w / 2, y0 = -t.h / 2, y1 = t.h / 2;
  const stolar = t.seats.slice(); if (t.larare) stolar.push(t.larare);
  for (const [sx, sy] of stolar) {
    x0 = Math.min(x0, sx - STOL_B / 2); x1 = Math.max(x1, sx + STOL_B / 2);
    y0 = Math.min(y0, sy - STOL_D / 2); y1 = Math.max(y1, sy + STOL_D / 2);
  }
  const box = { x0, x1, y0, y1 };
  if (!egen) lokalBoxCache[nyckel] = box;
  return box;
}
function horn(it) {
  const b = lokalBox(it);
  return [[b.x0, b.y0], [b.x1, b.y0], [b.x1, b.y1], [b.x0, b.y1]].map(([x, y]) => {
    const [a, c] = rot(x, y, it.rot); return [it.x + a, it.y + c];
  });
}
function aabb(it) {
  const h = horn(it);
  return { x0: Math.min(...h.map(p => p[0])), x1: Math.max(...h.map(p => p[0])), y0: Math.min(...h.map(p => p[1])), y1: Math.max(...h.map(p => p[1])) };
}
// Separerande axlar för två konvexa fyrhörningar; glipor och kant mot kant räknas inte som krock.
function krockar(a, b) {
  const A = horn(a), B = horn(b);
  for (const P of [A, B]) {
    for (let i = 0; i < 4; i++) {
      const p = P[i], q = P[(i + 1) % 4];
      const nx = -(q[1] - p[1]), ny = q[0] - p[0];
      const len = Math.hypot(nx, ny) || 1;
      const pa = A.map(v => (v[0] * nx + v[1] * ny) / len), pb = B.map(v => (v[0] * nx + v[1] * ny) / len);
      if (Math.max(...pa) <= Math.min(...pb) + 2 || Math.max(...pb) <= Math.min(...pa) + 2) return false;
    }
  }
  return true;
}
// Minsta förflyttning som skjuter ut a ur b (separerande axlar), eller null om de inte överlappar.
function mtv(a, b) {
  const A = horn(a), B = horn(b);
  let min = Infinity, ax = 0, ay = 0;
  for (const P of [A, B]) for (let i = 0; i < 4; i++) {
    const p = P[i], q = P[(i + 1) % 4];
    let nx = -(q[1] - p[1]), ny = q[0] - p[0];
    const len = Math.hypot(nx, ny) || 1; nx /= len; ny /= len;
    const pa = A.map(v => v[0] * nx + v[1] * ny), pb = B.map(v => v[0] * nx + v[1] * ny);
    const bak = Math.max(...pa) - Math.min(...pb), fram = Math.max(...pb) - Math.min(...pa);
    const o = Math.min(bak, fram);
    if (o <= 0.5) return null;
    if (o < min) { min = o; const t = bak < fram ? -1 : 1; ax = nx * t; ay = ny * t; }
  }
  return [ax * min, ay * min];
}
/* Snäpp kant i kant: en möbel som släpps ovanpå en annan skjuts ut tills
   kanterna möts, och en möbel som hamnar några centimeter från en annan dras
   intill den och linjeras med den. Alt-tangenten stänger av snäppningen. */
const MAGNET = 16;
function snappa(it, r) {
  const andra = r.items.filter(o => o.id !== it.id);
  const fri = () => !andra.some(o => krockar(it, o));
  const inne = () => { const b = aabb(it); return b.x0 > -0.5 && b.y0 > -0.5 && b.x1 < r.W + 0.5 && b.y1 < r.D + 0.5; };
  const x0 = it.x, y0 = it.y;
  if (!fri()) {
    // Ligger den ovanpå något: pröva alla lägen kant i kant mot möblerna i
    // närheten och välj det närmaste som är ledigt och ryms i salen.
    const b = aabb(it), vx = it.x - b.x0, hx = b.x1 - it.x, ovn = it.y - b.y0, ned = b.y1 - it.y;
    const kand = [];
    for (const o of andra) {
      const c = aabb(o);
      if (c.x1 < b.x0 - 400 || c.x0 > b.x1 + 400 || c.y1 < b.y0 - 400 || c.y0 > b.y1 + 400) continue;
      kand.push([c.x0 - hx, y0], [c.x1 + vx, y0], [x0, c.y0 - ned], [x0, c.y1 + ovn]);
      const m = mtv(it, o); if (m) kand.push([x0 + m[0], y0 + m[1]]);
    }
    let bast = null, bd = Infinity;
    for (const [x, y] of kand) {
      const d = Math.hypot(x - x0, (y - y0) * 1.25); if (d >= bd) continue;
      it.x = x; it.y = y;
      if (inne() && fri()) { bd = d; bast = [x, y]; }
    }
    if (bast) { it.x = bast[0]; it.y = bast[1]; }
    else {
      // Inget ledigt läge i närheten: skjut ut så gott det går.
      it.x = x0; it.y = y0;
      for (let varv = 0; varv < 6; varv++) {
        let flyttad = false;
        for (const o of andra) { const m = mtv(it, o); if (m) { it.x += m[0]; it.y += m[1]; flyttad = true; } }
        if (!flyttad) break;
      }
    }
  }
  // Magnet: dra in de sista centimetrarna så att kanterna möts, och linjera.
  if (it.rot % 90 === 0) {
    const b = aabb(it);
    let sx = null, sy = null;
    for (const o of andra) {
      if (o.rot % 90 !== 0) continue;
      const c = aabb(o);
      const ovY = Math.min(b.y1, c.y1) - Math.max(b.y0, c.y0), ovX = Math.min(b.x1, c.x1) - Math.max(b.x0, c.x0);
      if (ovY > 0) for (const d of [c.x0 - b.x1, c.x1 - b.x0]) if (Math.abs(d) < MAGNET && (!sx || Math.abs(d) < Math.abs(sx.d))) sx = { d, c };
      if (ovX > 0) for (const d of [c.y0 - b.y1, c.y1 - b.y0]) if (Math.abs(d) < MAGNET && (!sy || Math.abs(d) < Math.abs(sy.d))) sy = { d, c };
    }
    const prova = (dx, dy) => { it.x += dx; it.y += dy; if (!fri() || !inne()) { it.x -= dx; it.y -= dy; } };
    if (sx) prova(sx.d, 0);
    if (sy) prova(0, sy.d);
    // sida vid sida: linjera framkanterna; framför eller bakom: linjera mitten eller vänsterkanten
    if (sx && !sy && Math.abs(sx.c.y0 - b.y0) < MAGNET) prova(0, sx.c.y0 - b.y0);
    if (sy && !sx) {
      const dm = (sy.c.x0 + sy.c.x1) / 2 - (b.x0 + b.x1) / 2, dv = sy.c.x0 - b.x0;
      if (Math.abs(dm) < MAGNET) prova(dm, 0); else if (Math.abs(dv) < MAGNET) prova(dv, 0);
    }
  }
  it.x = r1(it.x); it.y = r1(it.y);
}
/* ---------- Flera markerade möbler ----------
   ui.grupp håller id:n när mer än en möbel är markerad. Gruppen flyttas,
   vrids, kopieras och tas bort som en enhet, med bibehållen inbördes placering. */
function gruppen() {
  const r = rum(), ids = new Set(ui.grupp);
  return r.items.filter(i => ids.has(i.id));
}
function avmarkera() { ui.val = null; ui.grupp = []; }
function gruppBox(g) {
  const b = g.map(aabb);
  return { x0: Math.min(...b.map(x => x.x0)), x1: Math.max(...b.map(x => x.x1)), y0: Math.min(...b.map(x => x.y0)), y1: Math.max(...b.map(x => x.y1)) };
}
function gruppFlytta(g, dx, dy) { for (const it of g) { it.x = r1(it.x + dx); it.y = r1(it.y + dy); } }
function gruppHallInne(g, r) {
  const b = gruppBox(g);
  let dx = 0, dy = 0;
  if (b.x0 < 0) dx = -b.x0; else if (b.x1 > r.W) dx = r.W - b.x1;
  if (b.y0 < 0) dy = -b.y0; else if (b.y1 > r.D) dy = r.D - b.y1;
  if (dx || dy) gruppFlytta(g, dx, dy);
}
// Skjut gruppen till närmaste läge där ingen av dess möbler krockar med någon annan möbel.
function gruppSnappa(g, r) {
  const ids = new Set(g.map(i => i.id)), andra = r.items.filter(i => !ids.has(i.id));
  const fri = () => !g.some(a => andra.some(o => krockar(a, o)));
  const inne = () => { const b = gruppBox(g); return b.x0 > -0.5 && b.y0 > -0.5 && b.x1 < r.W + 0.5 && b.y1 < r.D + 0.5; };
  if (fri()) return;
  const kand = [];
  for (const a of g) for (const o of andra) {
    if (!krockar(a, o)) continue;
    const A = aabb(a), C = aabb(o);
    kand.push([C.x0 - A.x1, 0], [C.x1 - A.x0, 0], [0, C.y0 - A.y1], [0, C.y1 - A.y0]);
    const m = mtv(a, o); if (m) kand.push(m);
  }
  let bast = null, bd = Infinity;
  for (const [dx, dy] of kand) {
    const d = Math.hypot(dx, dy * 1.25); if (d >= bd) continue;
    gruppFlytta(g, dx, dy);
    if (fri() && inne()) { bd = d; bast = [dx, dy]; }
    gruppFlytta(g, -dx, -dy);
  }
  if (bast) gruppFlytta(g, bast[0], bast[1]);
}
function gruppVrid(g, r, grader) {
  const b = gruppBox(g), cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
  for (const it of g) {
    const [nx, ny] = rot(it.x - cx, it.y - cy, grader);
    it.x = r1(cx + nx); it.y = r1(cy + ny); it.rot = ((it.rot + grader) % 360 + 360) % 360;
  }
  gruppHallInne(g, r);
}
function gruppKopiera(g, r) {
  const b = gruppBox(g), nya = g.map(it => ({ ...it, id: uid() }));
  const karta = new Map(g.map((it, i) => [it.id, nya[i].id]));
  r.items.push(...nya);
  gruppFlytta(nya, b.x1 - b.x0, 0);
  gruppHallInne(nya, r);
  gruppSnappa(nya, r);
  for (const x of r.skarmar.filter(x => karta.has(x.bord))) r.skarmar.push({ id: uid(), bord: karta.get(x.bord), k: x.k });
  ui.grupp = nya.map(i => i.id); ui.val = null;
}
function gruppBort(g, r) {
  const ids = new Set(g.map(i => i.id));
  r.items = r.items.filter(i => !ids.has(i.id));
  r.blocked = r.blocked.filter(x => !ids.has(x.split(':')[0]));
  avmarkera();
}
/* Väggen trycker möblerna framför sig när salen görs mindre. axel är 'x'
   eller 'y', tecken 1 när väggen på den stora sidan (öster, söder) rör sig och
   −1 när den på den lilla sidan (väster, norr) rör sig, då koordinaterna redan
   har förskjutits så att väggen ligger i 0. Möblerna gås igenom från väggen
   och inåt; var och en stannar mot väggen eller mot en möbel som redan
   knuffats och som står framför den i samma rad. Räcker inte salen till görs
   den så liten som möblerna tillåter. */
function trangIn(r, axel, tecken, d) {
  const lo = axel + '0', hi = axel + '1', alo = axel === 'x' ? 'y0' : 'x0', ahi = axel === 'x' ? 'y1' : 'x1';
  const flytta = (it, v) => { if (axel === 'x') it.x += v; else it.y += v; };
  const kor = () => {
    const L = axel === 'x' ? r.W : r.D;
    const lista = r.items.map(it => ({ it, b: aabb(it) }));
    lista.sort((a, b) => tecken > 0 ? b.b[hi] - a.b[hi] : a.b[lo] - b.b[lo]);
    const klara = [];
    let over = 0;
    for (const o of lista) {
      let grans = tecken > 0 ? L : 0;
      for (const q of klara) {
        if (Math.min(o.b[ahi], q.b[ahi]) - Math.max(o.b[alo], q.b[alo]) <= 0.5) continue;
        if (tecken > 0 && q.b[lo] >= o.b[hi] - 1) grans = Math.min(grans, q.ny0);
        if (tecken < 0 && q.b[hi] <= o.b[lo] + 1) grans = Math.max(grans, q.ny1);
      }
      let v = 0;
      if (tecken > 0 && o.b[hi] > grans) v = grans - o.b[hi];
      if (tecken < 0 && o.b[lo] < grans) v = grans - o.b[lo];
      flytta(o.it, v);
      o.ny0 = o.b[lo] + v; o.ny1 = o.b[hi] + v;
      over = Math.max(over, tecken > 0 ? -o.ny0 : o.ny1 - L);
      klara.push(o);
    }
    return { lista, over };
  };
  for (let varv = 0; varv < 200; varv++) {
    const start = r.items.map(it => [it.x, it.y]);
    const { over } = kor();
    if (over <= 0.5) break;
    // Får inte plats: backa och gör salen lite större i den här riktningen.
    r.items.forEach((it, i) => { it.x = start[i][0]; it.y = start[i][1]; });
    const steg = Math.max(SNAP, Math.ceil(over / SNAP) * SNAP);
    if (axel === 'x') { r.W += steg; if (tecken < 0) { r.items.forEach(it => { it.x += steg; }); r.vagg.forEach(v => { if (v.wall === 'n' || v.wall === 's') v.t += steg; }); } }
    else { r.D += steg; if (tecken < 0) { r.items.forEach(it => { it.y += steg; }); r.vagg.forEach(v => { if (v.wall === 'w' || v.wall === 'e') v.t += steg; }); } }
  }
  for (const it of r.items) { it.x = r1(it.x); it.y = r1(it.y); }
}
/* Antal enkelbänkar: fler ställs ut på lediga ytor framifrån, med mellanrum
   så att de är lätta att ta tag i; färre tar bort de senast tillagda. */
function ledigPlats(typ, r, marg) {
  const b = lokalBox(typ), it = { id: uid(), typ, x: 0, y: 0, rot: 0 };
  const andra = r.items.map(aabb);
  const y0 = Math.min(200, r.D / 3);
  for (let y = y0 - b.y0; y + b.y1 <= r.D - 10; y += 10) {
    for (let x = 40 - b.x0; x + b.x1 <= r.W - 40; x += 10) {
      const A = { x0: x + b.x0, x1: x + b.x1, y0: y + b.y0, y1: y + b.y1 };
      if (!andra.some(C => A.x1 + marg > C.x0 && C.x1 + marg > A.x0 && A.y1 + marg > C.y0 && C.y1 + marg > A.y0)) {
        it.x = x; it.y = y; return it;
      }
    }
  }
  return null;
}
/* Enkelbänkar som verktyget själv ställt ut (it.auto = [x, y, rot]) läggs om
   centrerat varje gång antalet ändras: rad för rad framifrån, varje rad
   centrerad i salen. En bänk som flyttats eller vridits sedan dess räknas som
   lärarens egen och står kvar. */
const arAuto = it => it.auto && it.auto[0] === it.x && it.auto[1] === it.y && it.auto[2] === it.rot;
function stallAntal(r, typ, n) {
  n = clamp(Math.round(n) || 0, 0, 80);
  const egna = r.items.filter(i => i.typ === typ && !arAuto(i));
  if (n <= egna.length) {
    // Färre än de egna: de senast tillagda tas bort, och alla automatiska försvinner.
    const bort = new Set(r.items.filter(i => i.typ === typ && arAuto(i)).map(i => i.id).concat(egna.slice(n).map(i => i.id)));
    r.items = r.items.filter(i => !bort.has(i.id));
    r.blocked = r.blocked.filter(x => !bort.has(x.split(':')[0]));
    return { fick: n, ville: n };
  }
  const gamla = r.items.filter(i => i.typ === typ && arAuto(i));
  const gamlaIds = new Set(gamla.map(i => i.id));
  r.items = r.items.filter(i => !gamlaIds.has(i.id));
  const b = lokalBox(typ), bw = b.x1 - b.x0, bh = b.y1 - b.y0, gap = 30;
  const kat = r.items.find(i => i.typ === 'kateder');
  let y = 170;
  if (kat) { const kb = aabb(kat); if (kb.y1 < r.D / 2) y = Math.max(y, kb.y1 + 40); }
  const perRad = Math.max(1, Math.floor((r.W - 80 + gap) / (bw + gap)));
  let kvar = n - egna.length;
  const nya = [];
  // Återanvänd de gamla id:na i tur och ordning, så att placeringarna i möjligaste mån gäller kvar.
  const ids = gamla.map(i => i.id);
  while (kvar > 0 && y + bh <= r.D - 10) {
    const m = Math.min(perRad, kvar), bredd = m * bw + (m - 1) * gap;
    for (let j = 0; j < m; j++) {
      const it = { id: ids.shift() || uid(), typ, x: r1((r.W - bredd) / 2 + j * (bw + gap) - b.x0), y: r1(y - b.y0), rot: 0 };
      if (r.items.some(o => krockar(o, it)) || nya.some(o => krockar(o, it))) { if (it.id) ids.unshift(it.id); continue; }
      it.auto = [it.x, it.y, 0];
      nya.push(it); kvar--;
    }
    y += bh + gap;
  }
  // Fick inte alla plats i raderna: fyll på där det finns ledigt golv.
  r.items.push(...nya);
  while (kvar > 0) { const it = ledigPlats(typ, r, 30) || ledigPlats(typ, r, 0); if (!it) break; r.items.push(it); kvar--; }
  const fick = n - kvar;
  const kvarIds = new Set(r.items.map(i => i.id));
  r.blocked = r.blocked.filter(x => kvarIds.has(x.split(':')[0]));
  return { fick, ville: n };
}
/* ---------- Föreslå bänkplacering ----------
   Sprider N enkelbänkar över golvet så att det minsta fria avståndet mellan
   två elevers platser blir så stort som möjligt. Avståndet mäts kant mot kant
   mellan bänkarnas fotavtryck (bänk och stol) och anges i bänkavstånd, där ett
   bänkavstånd är en bänkbredd: med 1 bänkavstånd får en tom bänk plats emellan.
   Både raka rader och förskjutna rader (varannan rad en halv plats åt sidan,
   som ett schackmönster) prövas med alla antal bänkar per rad, och den
   uppställning som ger störst minsta avstånd väljs. Vid lika avstånd vinner
   raka rader. Kateder, dörr och fönster står kvar. */
// Ett bänkavstånd är en enkelbänks bredd i salen (70 cm om inget annat angetts).
const bankavstand = () => geo({ typ: 'enkel' }).w;
function fmtAvst(cm) { const v = cm / bankavstand(); return (Math.round(v * 10) / 10).toFixed(1).replace('.', ','); }
function foreslaLayout(r, N) {
  const b = lokalBox('enkel'), bw = b.x1 - b.x0, bh = b.y1 - b.y0;
  const kat = r.items.find(i => i.typ === 'kateder');
  let yStart = 170;
  if (kat) { const kb = aabb(kat); if (kb.y1 < r.D / 2) yStart = Math.max(yStart, kb.y1 + 40); }
  const X0 = 30, X1 = r.W - 30, Y0 = yStart, Y1 = r.D - 30;
  const aw = X1 - X0, ah = Y1 - Y0;
  if (N < 1 || aw < bw || ah < bh) return null;
  let bast = null;
  const cmax = Math.max(1, Math.floor(aw / bw));
  for (const forsk of [false, true]) {
    for (let c = forsk ? 2 : 1; c <= cmax; c++) {
      const kap = rr => forsk ? Math.ceil(rr / 2) * c + Math.floor(rr / 2) * (c - 1) : rr * c;
      let rows = 1;
      while (kap(rows) < N) rows++;
      const px = c > 1 ? (aw - bw) / (c - 1) : 0, py = rows > 1 ? (ah - bh) / (rows - 1) : 0;
      if ((c > 1 && px < bw) || (rows > 1 && py < bh)) continue;
      let d = Infinity;
      if (c > 1) d = Math.min(d, px - bw);
      if (rows > 1) {
        if (forsk) {
          d = Math.min(d, Math.hypot(Math.max(0, px / 2 - bw), py - bh));
          if (rows > 2) d = Math.min(d, 2 * py - bh);
        } else d = Math.min(d, py - bh);
      }
      if (d === Infinity) d = Math.min(aw - bw, ah - bh);
      const poang = d - (forsk ? 1 : 0);
      if (!bast || poang > bast.poang) bast = { poang, d, c, rows, forsk, px, py };
    }
  }
  if (!bast) return null;
  const { c, rows, forsk, px, py } = bast;
  const rader = [];
  for (let i = 0; i < rows; i++) {
    const udda = forsk && i % 2 === 1, n = udda ? c - 1 : c, xs = [];
    for (let j = 0; j < n; j++) xs.push(X0 - b.x0 + (c > 1 ? (udda ? (j + 0.5) * px : j * px) : (aw - bw) / 2));
    rader.push({ y: Y0 - b.y0 + (rows > 1 ? i * py : (ah - bh) / 2), xs });
  }
  // Överskottet tas bort längst bak; de bänkar som blir kvar i en rad sprids jämnt.
  let over = rader.reduce((a, R) => a + R.xs.length, 0) - N;
  for (let i = rader.length - 1; i >= 0 && over > 0; i--) {
    const R = rader[i], kvar = Math.max(0, R.xs.length - over);
    over -= R.xs.length - kvar;
    if (!kvar) { R.xs = []; continue; }
    const nya = [];
    for (let j = 0; j < kvar; j++) nya.push(R.xs[kvar === 1 ? Math.floor((R.xs.length - 1) / 2) : Math.round(j * (R.xs.length - 1) / (kvar - 1))]);
    R.xs = nya;
  }
  const items = [];
  for (const R of rader) for (const x of R.xs) items.push({ id: uid(), typ: 'enkel', x: r1(x), y: r1(R.y), rot: 0 });
  return { items, d: bast.d, forsk };
}
function forslagAntal() {
  if (S.inst.forslagAntal) return S.inst.forslagAntal;
  const k = klass(), n = k ? k.elever.filter(e => e.har).length : 0;
  return n || 24;
}
/* Minsta avståndet sparas i den enhet läraren valt (S.inst.forslagEnhet):
   i bänkavstånd (S.inst.forslagAvst) eller i centimeter (S.inst.forslagCm).
   Då förblir 1 bänkavstånd 1 bänkavstånd när bänkmåtten ändras. Värdet
   räknas om först när enheten byts. */
function forslagCm() {
  if (S.inst.forslagEnhet === 'm') {
    if (S.inst.forslagCm == null) S.inst.forslagCm = Math.round((S.inst.forslagAvst ?? 1) * bankavstand());
    return S.inst.forslagCm;
  }
  return (S.inst.forslagAvst ?? 1) * bankavstand();
}
const fmtMeter = cm => (cm / 100).toFixed(cm % 10 ? 2 : 1).replace('.', ',');
function avstText(cm) {
  return S.inst.forslagEnhet === 'm' ? `${fmtMeter(cm)}&nbsp;m` : `${fmtAvst(cm)} bänkavstånd`;
}
function foresla() {
  const r = rum(), N = forslagAntal(), minCm = forslagCm();
  const res = foreslaLayout(r, N);
  if (!res || res.d < minCm - 0.5) {
    let max = 0;
    for (let n = N - 1; n >= 1; n--) { const x = foreslaLayout(r, n); if (x && x.d >= minCm - 0.5) { max = n; break; } }
    ui.forslagSvar = { ok: false, html: max
      ? `Med minst <b>${avstText(minCm)}</b> mellan eleverna ryms högst <b>${max}</b> bänkar i salen. Minska avståndet, gör salen större eller ställ ut färre bänkar.`
      : `Det går inte att ställa ut bänkar med minst <b>${avstText(minCm)}</b> mellan eleverna i salen. Minska avståndet eller gör salen större.` };
    ritaPanel();
    return;
  }
  if (r.items.some(it => it.typ !== 'kateder') && !confirm('Förslaget ersätter bänkarna som står i salen nu. Vill du fortsätta?')) return;
  minns();
  r.items = r.items.filter(it => it.typ === 'kateder').concat(res.items);
  r.blocked = [];
  avmarkera();
  ui.forslagSvar = { ok: true, html: `<b>${N}</b> enkelbänkar i ${res.forsk ? 'förskjutna' : 'raka'} rader, med minst <b>${fmtAvst(res.d)}</b> bänkavstånd mellan eleverna (${fmtMeter(Math.round(res.d))}&nbsp;m).` };
  spara(); allt();
}
/* Linjering: en möbel (eller grupp) som dras nästan i linje med en annan
   möbel snäpper i linje med den, oavsett hur långt bort den står, så att det
   blir lätt att få raka kolumner och rader. Mitten, vänster- och högerkant
   jämförs i sidled, mitten, fram- och bakkant framåt och bakåt. Hjälplinjerna
   ritas medan man drar. */
const LINJERA = 12;
function linjera(g, r, flytta = true) {
  ui.guider = [];
  const ids = new Set(g.map(i => i.id)), andra = r.items.filter(i => !ids.has(i.id));
  if (!andra.length) return;
  const varden = it => { const b = aabb(it); return { x: [b.x0, (b.x0 + b.x1) / 2, b.x1], y: [b.y0, (b.y0 + b.y1) / 2, b.y1], b }; };
  const mal = andra.map(varden);
  if (flytta) for (const ax of ['x', 'y']) {
    let bast = null;
    for (const e of g.map(varden)) for (let i = 0; i < 3; i++) for (const m of mal) {
      const d = m[ax][i] - e[ax][i];
      if (Math.abs(d) < LINJERA && (bast === null || Math.abs(d) < Math.abs(bast))) bast = d;
    }
    if (bast !== null) gruppFlytta(g, ax === 'x' ? bast : 0, ax === 'y' ? bast : 0);
  }
  // Hjälplinjer där något nu står exakt i linje, från den ena möbeln till den andra
  const sedda = new Set();
  for (const e of g.map(varden)) for (const m of mal) for (const ax of ['x', 'y']) for (let i = 0; i < 3; i++) {
    if (Math.abs(m[ax][i] - e[ax][i]) > 0.6) continue;
    const v = r1(e[ax][i]), nyckel = ax + v;
    const tv = ax === 'x' ? 'y' : 'x';
    const fran = Math.min(e.b[tv + '0'], m.b[tv + '0']), till = Math.max(e.b[tv + '1'], m.b[tv + '1']);
    const fanns = ui.guider.find(q => q.nyckel === nyckel);
    if (fanns) { fanns.fran = Math.min(fanns.fran, fran); fanns.till = Math.max(fanns.till, till); }
    else if (!sedda.has(nyckel)) { sedda.add(nyckel); ui.guider.push({ nyckel, ax, v, fran, till, mitt: i === 1 }); }
  }
  // Står mitten i linje räcker den hjälplinjen; kanterna visas bara annars.
  for (const ax of ['x', 'y']) if (ui.guider.some(q => q.ax === ax && q.mitt)) ui.guider = ui.guider.filter(q => q.ax !== ax || q.mitt);
}
function hallInne(it, r) {
  const b = aabb(it);
  if (b.x0 < 0) it.x += -b.x0; if (b.x1 > r.W) it.x -= b.x1 - r.W;
  if (b.y0 < 0) it.y += -b.y0; if (b.y1 > r.D) it.y -= b.y1 - r.D;
  it.x = r1(it.x); it.y = r1(it.y);
}
function platser(r) {
  const out = [];
  for (const it of r.items) {
    const t = geo(it);
    t.seats.forEach(([sx, sy], i) => {
      const [dx, dy] = rot(sx, sy, it.rot);
      const tecken = sy < 0 ? -1 : 1;
      const [kx, ky] = rot(sx, sy - tecken * 6, it.rot);
      out.push({ id: it.id + ':' + i, item: it.id, rot: it.rot, x: it.x + dx, y: it.y + dy, kx: it.x + kx, ky: it.y + ky, kort: t.kort });
    });
  }
  return out;
}
/* Provskärmar sitter fast på en bänk: på kortsidorna, framkanten (eller
   mittlinjen på gruppbord) och i skarvarna mellan platserna. Lägena är
   lokala, så skärmen följer med när bänken flyttas eller vrids. */
function skarmLagen(it) {
  if (it.typ === 'kateder') return [];
  const t = geo(it), w = t.w, h = t.h, L = [];
  L.push({ k: 'v', x1: -w / 2, y1: -h / 2, x2: -w / 2, y2: h / 2 });
  L.push({ k: 'h', x1: w / 2, y1: -h / 2, x2: w / 2, y2: h / 2 });
  if (it.typ === 'grupp4' || it.typ === 'grupp6') L.push({ k: 'mitt', x1: -w / 2, y1: 0, x2: w / 2, y2: 0 });
  else L.push({ k: 'f', x1: -w / 2, y1: -h / 2, x2: w / 2, y2: -h / 2 });
  const n = t.seats.length > 3 ? t.seats.length / 2 : t.seats.length;
  for (let i = 1; i < n; i++) { const x = r1(-w / 2 + i * w / n); L.push({ k: 's' + i, x1: x, y1: -h / 2, x2: x, y2: h / 2 }); }
  return L;
}
// Roteringshandtaget: ett runt handtag med en vridpil, på ett kort skaft.
function vridHandtag(cx, cy, fotX, fotY, data) {
  return `<line x1="${r1(fotX)}" y1="${r1(fotY)}" x2="${r1(cx)}" y2="${r1(cy)}" stroke="${FARG.blue}" stroke-width="1.6" pointer-events="none"/>` +
    `<g ${data} transform="translate(${r1(cx)} ${r1(cy)})" style="cursor:grab">` +
    `<circle r="13" fill="#ffffff" stroke="${FARG.blue}" stroke-width="2.2"/>` +
    `<path d="M5.6 -3.2A6.5 6.5 0 1 0 6.4 2.4" fill="none" stroke="${FARG.blue}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M6.9 -7.4 6 -2.6 1.3 -3.8" fill="none" stroke="${FARG.blue}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle r="20" fill="transparent"/></g>`;
}
function skarmSvg(g) {
  const L = Math.hypot(g.x2 - g.x1, g.y2 - g.y1) || 1, ux = (g.x2 - g.x1) / L, uy = (g.y2 - g.y1) / L, kant = 3;
  const a = [r1(g.x1 + ux * kant), r1(g.y1 + uy * kant)], b = [r1(g.x2 - ux * kant), r1(g.y2 - uy * kant)];
  return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${FARG.skarm}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${FARG.skarmLjus}" stroke-width="1.6" stroke-linecap="round"/>`;
}
// Närmaste lediga skärmläge till en punkt (världskoordinater), inom 35 cm.
function narmasteSkarmLage(x, y, r, undantag) {
  const c = cur(), upptagna = new Set(r.skarmar.concat(c.skarmar || []).filter(sk => sk.id !== undantag).map(sk => sk.bord + '|' + sk.k));
  let bast = null, bd = 35;
  for (const it of r.items) for (const g of skarmLagen(it)) {
    if (upptagna.has(it.id + '|' + g.k)) continue;
    const [ax, ay] = rot(g.x1, g.y1, it.rot), [bx, by] = rot(g.x2, g.y2, it.rot);
    const x1 = it.x + ax, y1 = it.y + ay, x2 = it.x + bx, y2 = it.y + by;
    const L2 = (x2 - x1) ** 2 + (y2 - y1) ** 2 || 1;
    const t = clamp(((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / L2, 0, 1);
    const d = Math.hypot(x - (x1 + t * (x2 - x1)), y - (y1 + t * (y2 - y1)));
    if (d < bd) { bd = d; bast = { bord: it.id, k: g.k }; }
  }
  return bast;
}
function borjaFlyttaSkarm(e, r) {
  const skEl = e.target.closest('[data-skarm]');
  if (!skEl) return false;
  const id = skEl.dataset.skarm, c = cur();
  const auto = !r.skarmar.some(sk => sk.id === id) && (c.skarmar || []).some(sk => sk.id === id);
  ui.drag = { kind: 'skarmflytt', id, auto, mal: null, korg: false, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
  e.preventDefault();
  return true;
}
function overKorg(cx, cy) {
  const k = $('korg'); if (!k || !k.classList.contains('on')) return false;
  const b = k.getBoundingClientRect(); return cx >= b.left - 8 && cx <= b.right + 8 && cy >= b.top - 8 && cy <= b.bottom + 8;
}
// Ligger punkten (världskoordinater) på någon annan bänk än undantaget?
function paAnnanBank(x, y, r, undantag) {
  return r.items.some(o => {
    if (o.id === undantag || o.typ === 'kateder') return false;
    const [lx, ly] = rot(x - o.x, y - o.y, -o.rot), t = geo(o);
    return Math.abs(lx) <= t.w / 2 && Math.abs(ly) <= t.h / 2;
  });
}
function skarmMitt(o, k) {
  const g = skarmLagen(o).find(x => x.k === k); if (!g) return null;
  const [ax, ay] = rot((g.x1 + g.x2) / 2, (g.y1 + g.y2) / 2, o.rot);
  return [o.x + ax, o.y + ay];
}
// Skärmar i varje skarv och mittlinje, och på kortsidor där en annan bänk står kant i kant.
function skarmarMellanAlla(r) {
  const har = new Set(r.skarmar.map(x => x.bord + '|' + x.k));
  const lagg = (bord, k) => { if (!har.has(bord + '|' + k)) { r.skarmar.push({ id: uid(), bord, k }); har.add(bord + '|' + k); } };
  for (const it of r.items) {
    const t = geo(it);
    for (const g of skarmLagen(it)) {
      if (g.k[0] === 's' || g.k === 'mitt') { lagg(it.id, g.k); continue; }
      if (g.k !== 'v' && g.k !== 'h') continue;
      const [dx, dy] = rot(g.k === 'v' ? -t.w / 2 - 12 : t.w / 2 + 12, 0, it.rot);
      if (!paAnnanBank(it.x + dx, it.y + dy, r, it.id)) continue;
      const m = skarmMitt(it, g.k);
      const dubbel = r.skarmar.some(x => {
        const o = r.items.find(i => i.id === x.bord); if (!o || o.id === it.id) return false;
        const mm = skarmMitt(o, x.k); return mm && Math.hypot(mm[0] - m[0], mm[1] - m[1]) < 6;
      });
      if (!dubbel) lagg(it.id, g.k);
    }
  }
}
const grannar = (a, b) => a.item === b.item || Math.hypot(a.x - b.x, a.y - b.y) < GRANNAVSTAND;
const parNyckel = (a, b) => a < b ? a + '|' + b : b + '|' + a;

/* Vy: elevernas (tavlan överst) eller lärarens (tavlan nederst). */
const vand = () => S.inst.vy === 'larare';
function V(x, y) { const r = rum(); return vand() ? [r.W - x, r.D - y] : [x, y]; }

/* ================= Färdiga möbleringar ================= */
function rutnat(r, typ, gapX, pitchY, yStart) {
  const b = lokalBox(typ), bw = b.x1 - b.x0, bh = b.y1 - b.y0;
  const bredd = r.W - 100;
  const cols = Math.max(1, Math.floor((bredd + gapX) / (bw + gapX)));
  const rows = Math.max(1, Math.floor((r.D - 40 - yStart - bh) / pitchY) + 1);
  const total = cols * bw + (cols - 1) * gapX;
  const x0 = (r.W - total) / 2 - b.x0;
  const ut = [];
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    ut.push({ id: uid(), typ, x: r1(x0 + j * (bw + gapX)), y: r1(yStart - b.y0 + i * pitchY), rot: 0 });
  }
  return ut;
}
function hastsko(r) {
  const ut = [];
  const b = lokalBox('par');               // x −65…65, y −25…62
  const yBak = r.D - 40 - b.y1;            // bakre raden, vänd mot tavlan
  const xV = 40 + b.y1, xO = r.W - 40 - b.y1;  // vridna 90°: stolen mot väggen
  const armStart = 230, armSlut = yBak + b.y0 - 30;
  const nArm = Math.max(1, Math.floor((armSlut - armStart) / 130));
  for (let i = 0; i < nArm; i++) {
    const y = armStart + 65 + i * 130;
    ut.push({ id: uid(), typ: 'par', x: r1(xV), y: r1(y), rot: 90 });
    ut.push({ id: uid(), typ: 'par', x: r1(xO), y: r1(y), rot: 270 });
  }
  const inre0 = xV - b.y0 + 30, inre1 = xO + b.y0 - 30;
  const nBak = Math.max(1, Math.floor((inre1 - inre0) / 130));
  const start = (r.W - nBak * 130) / 2 + 65;
  for (let i = 0; i < nBak; i++) ut.push({ id: uid(), typ: 'par', x: r1(start + i * 130), y: r1(yBak), rot: 0 });
  return ut;
}
/* Mot väggarna (datorprov): enkelbänkar längs vänster, höger och bakre vägg
   med eleverna vända mot väggen, och i mitten en rektangulär ring av bänkar
   med tomt golv inuti, där eleverna sitter på utsidan och tittar inåt. Då
   sitter alla rygg mot rygg och ingen skärm går att se från en annan plats.
   Bara en ring: en inre ring skulle synas över axeln från den yttre. Väggen
   med tavlan och området vid katedern lämnas fria, liksom dörrens svängområde.
   Vridningar: 270 = eleven tittar mot väster, 90 = mot öster, 180 = mot
   bakväggen, 0 = mot tavlan. */
function dorrZoner(r) {
  return (r.vagg || []).filter(v => v.typ === 'dorr').map(v => {
    const L = vaggLen(v), a = v.t - L / 2, b = v.t + L / 2;
    if (v.wall === 'n') return { x0: a, x1: b, y0: 0, y1: L };
    if (v.wall === 's') return { x0: a, x1: b, y0: r.D - L, y1: r.D };
    if (v.wall === 'w') return { x0: 0, x1: L, y0: a, y1: b };
    return { x0: r.W - L, x1: r.W, y0: a, y1: b };
  });
}
function motVaggarna(r, N) {
  const t = geo({ typ: 'enkel' }), b = lokalBox('enkel');
  const bw = t.w, h = t.h, ut = b.y1;          // ut: stolens yttersta kant räknat från bänkens mitt
  const kant = 5, gap = 10, gang = 100;
  const kat = (r.items || []).find(i => i.typ === 'kateder');
  let yStart = 190;
  if (kat) { const kb = aabb(kat); if (kb.y1 < r.D / 2) yStart = Math.max(yStart, kb.y1 + 40); }
  const hinder = dorrZoner(r);
  // Sträckorna där bänkar kan stå: { fran, till, pos: s => [x, y], rot }.
  // Längs en vägg klipps sträckan där dörren svänger upp.
  const strackor = [];
  const ny = (fran, till, pos, rot, band) => {
    let delar = [[fran, till]];
    if (band) for (const z of hinder) {
      const [z0, z1] = band.langsX ? [z.x0, z.x1] : [z.y0, z.y1];
      const [q0, q1] = band.langsX ? [z.y0, z.y1] : [z.x0, z.x1];
      if (q1 <= band.a || q0 >= band.b) continue;
      delar = delar.flatMap(([f, t2]) => (z1 <= f || z0 >= t2) ? [[f, t2]] : [[f, z0 - gap], [z1 + gap, t2]].filter(([u, w]) => w - u >= bw));
    }
    for (const [f, t2] of delar) if (t2 - f >= bw) strackor.push({ fran: f, till: t2, pos, rot });
  };
  const ySyd = r.D - kant - h / 2;
  const sidaInre = kant + h / 2 + ut;            // sidokolumnernas inre kant (med stol)
  const sydOvre = ySyd - ut;                      // bakraden når hit (med stol)
  // Bakväggen, vänster och höger vägg (eleverna tittar in i väggen)
  ny(sidaInre + gap, r.W - sidaInre - gap, s2 => [s2, ySyd], 180, { langsX: true, a: sydOvre, b: r.D });
  ny(yStart, sydOvre - gap, s2 => [kant + h / 2, s2], 270, { langsX: false, a: 0, b: sidaInre });
  ny(yStart, sydOvre - gap, s2 => [r.W - kant - h / 2, s2], 90, { langsX: false, a: r.W - sidaInre, b: r.W });
  // Ringen i mitten: tomt golv inuti, eleverna på utsidan tittar inåt,
  // rygg mot rygg med eleverna vid väggarna.
  const v = sidaInre + gang, hX = r.W - sidaInre - gang;
  const o = yStart + 20, n = sydOvre - gang;
  const djupRad = ut + h / 2;                     // från ringens ytterkant till bänkens framkant
  if (hX - v >= Math.max(bw, 2 * djupRad + 60) && n - o >= 2 * djupRad + 60) {
    ny(v, hX, s2 => [s2, o + ut], 180);
    ny(v, hX, s2 => [s2, n - ut], 0);
    ny(o + djupRad + gap, n - djupRad - gap, s2 => [v + ut, s2], 90);
    ny(o + djupRad + gap, n - djupRad - gap, s2 => [hX - ut, s2], 270);
  }
  // Hur många bänkar varje sträcka får. Utan antal: så många som ryms. Med
  // antal: en bänk i taget där det fria utrymmet per bänk är störst, så att
  // mellanrummen blir så lika stora som möjligt överallt.
  for (const q of strackor) { q.L = q.till - q.fran; q.max = Math.floor((q.L + gap) / (bw + gap)); q.k = 0; }
  const maxTot = strackor.reduce((a, q) => a + q.max, 0);
  if (N == null || N >= maxTot) strackor.forEach(q => { q.k = q.max; });
  else for (let i = 0; i < N; i++) {
    let bast = null, bp = -Infinity;
    for (const q of strackor) {
      if (q.k >= q.max) continue;
      const p = (q.L - (q.k + 1) * bw) / (q.k + 1);
      if (p > bp) { bp = p; bast = q; }
    }
    if (!bast) break;
    bast.k++;
  }
  const ut_ = [];
  for (const q of strackor) {
    for (let i = 0; i < q.k; i++) {
      const s2 = q.k === 1 ? (q.fran + q.till) / 2 : q.fran + bw / 2 + i * (q.L - bw) / (q.k - 1);
      const [x, y] = q.pos(s2);
      const it = { id: uid(), typ: 'enkel', x: r1(x), y: r1(y), rot: q.rot };
      if (kat && krockar(kat, it)) continue;
      if (ut_.some(o2 => krockar(o2, it))) continue;
      ut_.push(it);
    }
  }
  return ut_;
}
const FORVAL = {
  par: { namn: 'Rader med parbänkar', bes: 'Klassisk möblering, två och två', gor: r => rutnat(r, 'par', 60, 140, 230) },
  enkel: { namn: 'Enskilda bänkar', bes: 'En och en, till exempel vid prov', gor: r => rutnat(r, 'enkel', 50, 115, 230) },
  grupp4: { namn: 'Grupper om fyra', bes: 'Gruppbord för samarbete', gor: r => rutnat(r, 'grupp4', 90, 230, 240) },
  hastsko: { namn: 'Hästsko', bes: 'Bänkarna i en U-form mot tavlan', gor: hastsko },
  trio: { namn: 'Labbsal', bes: 'Långa labbänkar för tre', gor: r => rutnat(r, 'trio', 70, 150, 230) },
  vaggar: { namn: 'Mot väggarna', bes: 'Datorprov: mot väggen runt om och en ring i mitten', gor: motVaggarna },
};
/* En färdig möblering. Med ett antal platser (N) fördelas bänkarna jämnt i
   Mot väggarna; de andra möbleringarna fylls framifrån tills antalet nåtts. */
function forval(r, namn, N) {
  let nya = FORVAL[namn].gor(r, N);
  if (N && namn !== 'vaggar') {
    nya.sort((a, b) => (aabb(a).y0 - aabb(b).y0) || (a.x - b.x));
    const behall = []; let platser = 0;
    for (const it of nya) { if (platser >= N) break; behall.push(it); platser += geo(it).seats.length; }
    nya = behall;
  }
  r.items = r.items.filter(it => it.typ === 'kateder').concat(nya);
  r.blocked = [];
  return nya.reduce((a, it) => a + geo(it).seats.length, 0);
}

/* ================= Namn ================= */
const NAMNSTORLEK = [[1, 'Normal'], [1.35, 'Stor'], [1.7, 'Störst']];
function bytNamnstorlek(v) {
  if (v == null) { const i = NAMNSTORLEK.findIndex(([x]) => x === (S.inst.namnstorlek || 1)); v = NAMNSTORLEK[(i + 1) % NAMNSTORLEK.length][0]; }
  S.inst.namnstorlek = v; passCache.clear(); spara(); ritaPlan();
  if (S.inst.lage === 'plac') ritaPanel();
  visaTips(`Namnstorlek: ${NAMNSTORLEK.find(([x]) => x === v)[1]}`);
}
function visningsnamn(k) {
  const m = new Map(); if (!k) return m;
  const delar = e => e.namn.trim().split(/\s+/);
  if (S.inst.namn === 'hela') {
    for (const e of k.elever) { const d = delar(e); m.set(e.id, { l1: d[0], l2: d.slice(1).join(' ') }); }
    return m;
  }
  const antal = {};
  for (const e of k.elever) { const f = delar(e)[0].toLowerCase(); antal[f] = (antal[f] || 0) + 1; }
  for (const e of k.elever) {
    const d = delar(e); let n = d[0];
    if (antal[n.toLowerCase()] > 1 && d.length > 1) n += ' ' + d[d.length - 1][0] + '.';
    m.set(e.id, { l1: n });
  }
  const sedda = {};
  for (const [, v] of m) sedda[v.l1] = (sedda[v.l1] || 0) + 1;
  for (const e of k.elever) if (sedda[m.get(e.id).l1] > 1) m.set(e.id, { l1: e.namn.trim() });
  return m;
}
const mctx = document.createElement('canvas').getContext('2d');
const passCache = new Map();
function passa(s, maxW, fs0, fam) {
  const key = s + '|' + maxW + '|' + fs0 + '|' + fam;
  if (passCache.has(key)) return passCache.get(key);
  const b = (t, f) => { mctx.font = `600 ${f}px ${fam}`; return mctx.measureText(t).width; };
  let fs = fs0;
  while (fs > 9 && b(s, fs) > maxW) fs -= 0.5;
  let t = s;
  if (b(t, fs) > maxW) { while (t.length > 2 && b(t + '…', fs) > maxW) t = t.slice(0, -1); t += '…'; }
  const res = { s: t, fs };
  passCache.set(key, res);
  return res;
}
function tolkaLista(text) {
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).flatMap(l => {
    if (l.includes('\t')) return [l.split('\t').map(x => x.trim()).filter(Boolean).join(' ')];
    if (l.includes(';')) return l.split(';').map(x => x.trim()).filter(Boolean);
    const komma = l.split(',').map(x => x.trim()).filter(Boolean);
    if (komma.length === 2 && l.split(',').length === 2) return [komma[1] + ' ' + komma[0]];
    if (komma.length > 2) return komma;
    return [l];
  }).map(n => n.replace(/\s+/g, ' ').replace(/^\d+[.)]\s*/, '')).filter(Boolean);
}

/* ================= Ritning av planen ================= */
function stolSvg(sx, sy, blockerad) {
  const ovan = sy < 0;
  const x = sx - STOL_B / 2, y = sy - STOL_D / 2;
  const ryggY = ovan ? y + 3 : y + STOL_D - 3;
  let s = `<rect x="${x}" y="${y}" width="${STOL_B}" height="${STOL_D}" rx="8" fill="${FARG.stol}" stroke="${FARG.stolKant}" stroke-width="1.2"/>` +
    `<line x1="${x + 7}" y1="${ryggY}" x2="${x + STOL_B - 7}" y2="${ryggY}" stroke="${FARG.stolKant}" stroke-width="3.2" stroke-linecap="round"/>`;
  if (blockerad) s += `<path d="M${sx - 9} ${sy - 9}l18 18M${sx + 9} ${sy - 9}l-18 18" stroke="${FARG.accent}" stroke-width="2.6" stroke-linecap="round"/>`;
  return s;
}
function mobelInre(it, blockerade) {
  const typ = it.typ, t = geo(it);
  let s = '';
  t.seats.forEach(([sx, sy], i) => { s += `<g data-seat-i="${i}">${stolSvg(sx, sy, blockerade && blockerade.has(i))}</g>`; });
  if (t.larare) s += stolSvg(t.larare[0], t.larare[1], false);
  const fill = typ === 'kateder' ? FARG.kateder : FARG.bank;
  s += `<rect x="${-t.w / 2}" y="${-t.h / 2}" width="${t.w}" height="${t.h}" rx="4" fill="${fill}" stroke="${FARG.bankKant}" stroke-width="1.6"/>`;
  // Ådring: några tunna linjer längs bänken
  const n = Math.max(1, Math.round(t.h / 26));
  for (let i = 1; i <= n; i++) {
    const y = -t.h / 2 + i * t.h / (n + 1);
    s += `<path d="M${-t.w / 2 + 8} ${r1(y)} q${t.w * .25} ${-2} ${t.w * .5} 0 t${t.w * .5 - 16} 0" fill="none" stroke="${FARG.bankKant}" stroke-opacity=".14" stroke-width="1"/>`;
  }
  // Parbänkar och gruppbord: en tunn skarv mellan platserna
  if (typ === 'par' || typ === 'grupp4') s += `<line x1="0" y1="${-t.h / 2 + 3}" x2="0" y2="${t.h / 2 - 3}" stroke="${FARG.bankKant}" stroke-opacity=".3" stroke-width="1"/>`;
  return s;
}
// Fönster kan dras längre eller kortare och har då en egen längd.
const vaggLen = v => v.len || VAGGTYP[v.typ].len;
const FONSTER_MIN = 40;
function vaggRekt(v, r) {
  const L = vaggLen(v), a = v.t - L / 2, b = v.t + L / 2;
  switch (v.wall) {
    case 'n': return [a, -10, b, 0];
    case 's': return [a, r.D, b, r.D + 10];
    case 'w': return [-10, a, 0, b];
    default: return [r.W, a, r.W + 10, b];
  }
}
function vyRekt(x0, y0, x1, y1) {
  const [ax, ay] = V(x0, y0), [bx, by] = V(x1, y1);
  return [Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax), Math.abs(by - ay)];
}
function vaggSvg(v, r, vald) {
  const L = vaggLen(v);
  const [x0, y0, x1, y1] = vaggRekt(v, r);
  const [x, y, w, h] = vyRekt(x0, y0, x1, y1);
  let s = `<g data-vagg="${v.id}">`;
  if (v.typ === 'fonster') {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${FARG.glas}" stroke="${FARG.vagg}" stroke-width="1.4"/>`;
    const lodr = w < h;
    s += lodr ? `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${FARG.vagg}" stroke-width="1"/>`
      : `<line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${FARG.vagg}" stroke-width="1"/>`;
    // Ändarna går att dra i för att göra fönstret längre eller kortare.
    if (S.inst.lage === 'rum' && !ui.skarm && !ui.sparr) {
      const a0 = v.t - L / 2, a1 = v.t + L / 2, lang = v.wall === 'n' || v.wall === 's';
      for (const [sida, a] of [[-1, a0], [1, a1]]) {
        const box = lang ? [a - 8, v.wall === 'n' ? -16 : r.D - 6, a + 8, v.wall === 'n' ? 6 : r.D + 16]
          : [v.wall === 'w' ? -16 : r.W - 6, a - 8, v.wall === 'w' ? 6 : r.W + 16, a + 8];
        const [fx, fy, fw, fh] = vyRekt(...box);
        s += `<rect class="fkant" data-fkant="${v.id},${sida}" x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="3" fill="transparent" style="cursor:${lang ? 'ew-resize' : 'ns-resize'}"/>`;
      }
    }
  } else {
    // Gångjärnet i ena änden, dörrbladet öppet in i salen och en streckad svängbåge.
    // Med v.spegel sitter gångjärnet i den andra änden och dörren svänger åt andra hållet.
    let hx, hy, lx, ly, jx, jy;
    const a = v.spegel ? v.t + L / 2 : v.t - L / 2, b = v.spegel ? v.t - L / 2 : v.t + L / 2;
    if (v.wall === 'n') { hx = a; hy = 0; lx = a; ly = L; jx = b; jy = 0; }
    else if (v.wall === 's') { hx = a; hy = r.D; lx = a; ly = r.D - L; jx = b; jy = r.D; }
    else if (v.wall === 'w') { hx = 0; hy = a; lx = L; ly = a; jx = 0; jy = b; }
    else { hx = r.W; hy = a; lx = r.W - L; ly = a; jx = r.W; jy = b; }
    const [Hx, Hy] = V(hx, hy), [Lx, Ly] = V(lx, ly), [Jx, Jy] = V(jx, jy);
    const sweep = ((Lx - Hx) * (Jy - Hy) - (Ly - Hy) * (Jx - Hx)) > 0 ? 1 : 0;
    s += `<rect x="${x - 1}" y="${y - 1}" width="${w + 2}" height="${h + 2}" fill="${FARG.golv}"/>`;
    s += `<path d="M${Lx} ${Ly}A${L} ${L} 0 0 ${sweep} ${Jx} ${Jy}" fill="none" stroke="${FARG.muted}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
    s += `<line x1="${Hx}" y1="${Hy}" x2="${Lx}" y2="${Ly}" stroke="${FARG.vagg}" stroke-width="3" stroke-linecap="butt"/>`;
    // osynlig yta som går att greppa
    s += `<path d="M${Hx} ${Hy}L${Lx} ${Ly}A${L} ${L} 0 0 ${sweep} ${Jx} ${Jy}Z" fill="transparent"/>`;
  }
  if (vald) s += `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="6" fill="none" stroke="${FARG.accent}" stroke-width="2" stroke-dasharray="6 4"/>`;
  return s + '</g>';
}

function planSvg(opt = {}) {
  const r = rum(), k = klass(), c = cur();
  const exp = !!opt.export, fam = opt.fam || FONT;
  const lage = S.inst.lage;
  const now = opt.now || 0;
  const skarmLage = !exp && lage === 'rum' && ui.skarm;
  const sparrLage = !exp && lage === 'rum' && ui.sparr;
  const verktygLage = skarmLage || sparrLage;
  const visaNamn = exp || lage !== 'rum';
  const namn = visningsnamn(k);
  const elevIds = new Set(k ? k.elever.map(e => e.id) : []);
  const blockSet = new Set(r.blocked);
  const pl = platser(r);
  const topp = exp ? 70 : 0;
  const vb = [-M, -M - topp, r.W + 2 * M, r.D + 2 * M + topp];
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"${exp ? ` width="${vb[2] * 2}" height="${vb[3] * 2}"` : ''} font-family='${fam}'>`;
  s += `<defs><pattern id="kpRutor" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="${FARG.ruta}" stroke-width="1"/></pattern></defs>`;
  if (exp) {
    s += `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#ffffff"/>`;
    s += `<text x="0" y="${-M - 25}" font-size="34" font-weight="600" fill="${FARG.ink}">${esc(k ? k.namn : '')}</text>`;
    s += `<text x="${r.W}" y="${-M - 25}" font-size="17" text-anchor="end" fill="${FARG.soft}">${esc(r.namn)} · ${esc(datumText(new Date()))}</text>`;
  }
  // Golv och väggar
  s += `<rect x="0" y="0" width="${r.W}" height="${r.D}" fill="${FARG.golv}"/><rect x="0" y="0" width="${r.W}" height="${r.D}" fill="url(#kpRutor)"/>`;
  s += `<rect x="-5" y="-5" width="${r.W + 10}" height="${r.D + 10}" fill="none" stroke="${FARG.vagg}" stroke-width="10"/>`;
  // Väggarna går att dra i för att ändra salens storlek (under dörrar och fönster).
  const rumHandtag = !exp && lage === 'rum' && !ui.skarm && !ui.sparr;
  if (rumHandtag) {
    for (const [sx, sy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x0 = sx ? (sx > 0 ? r.W + 5 : -5) : -5, x1 = sx ? x0 : r.W + 5;
      const y0 = sy ? (sy > 0 ? r.D + 5 : -5) : -5, y1 = sy ? y0 : r.D + 5;
      const [ax, ay] = V(x0, y0), [bx, by] = V(x1, y1);
      s += `<line data-rumkant="${sx},${sy}" class="rumkant" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="transparent" stroke-width="18" style="cursor:${sx ? 'ew-resize' : 'ns-resize'}"/>`;
    }
  }
  for (const v of r.vagg) s += vaggSvg(v, r, !exp && lage === 'rum' && ui.val === v.id);
  if (rumHandtag) {
    for (const [sx, sy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const [cx, cy] = V(sx > 0 ? r.W + 5 : -5, sy > 0 ? r.D + 5 : -5);
      s += `<circle data-rumkant="${sx},${sy}" cx="${cx}" cy="${cy}" r="9" fill="#ffffff" stroke="${FARG.blue}" stroke-width="2.4" style="cursor:${(sx === sy) ? 'nwse-resize' : 'nesw-resize'}"/>`;
    }
  }
  // Tavlan
  const bw = Math.min(420, r.W - 160);
  {
    const [x, y, w, h] = vyRekt(r.W / 2 - bw / 2, 3, r.W / 2 + bw / 2, 13);
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#ffffff" stroke="${FARG.ink}" stroke-width="1.6"/>`;
    const [tx, ty] = V(r.W / 2, -27);
    s += `<text x="${tx}" y="${ty + 5}" text-anchor="middle" font-size="15" font-weight="600" letter-spacing="5" fill="${FARG.soft}">TAVLAN</text>`;
  }
  // Mått på salen när den ritas upp
  if (!exp && lage === 'rum') {
    const [ax, ay] = V(r.W / 2, r.D + 30), [bx, by] = V(r.W + 32, r.D / 2);
    s += `<text x="${ax}" y="${ay + 5}" text-anchor="middle" font-size="15" fill="${FARG.muted}">${fmtM(r.W)}</text>`;
    s += `<text x="${bx}" y="${by}" transform="rotate(-90 ${bx} ${by})" text-anchor="middle" font-size="15" fill="${FARG.muted}">${fmtM(r.D)}</text>`;
  }
  // Möbler
  const gruppSet = new Set(lage === 'rum' && !exp ? ui.grupp : []);
  const krock = new Set();
  if (!exp && lage === 'rum') {
    for (let i = 0; i < r.items.length; i++) for (let j = i + 1; j < r.items.length; j++) {
      if (krockar(r.items[i], r.items[j])) { krock.add(r.items[i].id); krock.add(r.items[j].id); }
    }
  }
  for (const it of r.items) {
    const [vx, vy] = V(it.x, it.y);
    const rv = it.rot + (vand() ? 180 : 0);
    const bl = new Set(); geo(it).seats.forEach((_, i) => { if (blockSet.has(it.id + ':' + i)) bl.add(i); });
    s += `<g data-item="${it.id}" transform="translate(${r1(vx)} ${r1(vy)}) rotate(${rv})">${mobelInre(it, bl)}`;
    // Provskärmarna, och i skärmläget de lediga lägena som streckade linjer
    const lagen = skarmLagen(it);
    const egna = new Set(r.skarmar.concat(c.skarmar || []).filter(x => x.bord === it.id).map(x => x.k));
    const flyttas = ui.drag && ui.drag.kind === 'skarmflytt' && ui.drag.moved ? ui.drag.id : null;
    for (const sk of r.skarmar.concat(c.skarmar || [])) {
      if (sk.bord !== it.id) continue;
      const g = lagen.find(l => l.k === sk.k); if (!g) continue;
      const grip = !exp && !verktygLage;
      s += `<g data-skarm="${sk.id}"${flyttas === sk.id ? ' opacity=".25"' : ''}${grip ? ' style="cursor:grab"' : ''}>${skarmSvg(g)}` +
        (grip ? `<line x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" stroke="transparent" stroke-width="14"/>` : '') + '</g>';
    }
    if (skarmLage) {
      const ordning = lagen.filter(g => g.k[0] === 's' || g.k === 'mitt').concat(lagen.filter(g => !(g.k[0] === 's' || g.k === 'mitt')));
      for (const g of ordning) {
        const inre = g.k[0] === 's' || g.k === 'mitt';
        const L = Math.hypot(g.x2 - g.x1, g.y2 - g.y1) || 1, ux = (g.x2 - g.x1) / L * (inre ? 10 : 0), uy = (g.y2 - g.y1) / L * (inre ? 10 : 0);
        s += `<g data-kand="${it.id}|${g.k}"><line x1="${r1(g.x1 + ux)}" y1="${r1(g.y1 + uy)}" x2="${r1(g.x2 - ux)}" y2="${r1(g.y2 - uy)}" stroke="transparent" stroke-width="${inre ? 14 : 18}"/>` +
          (egna.has(g.k) ? '' : `<line class="kand" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" stroke="${FARG.accent}" stroke-opacity=".5" stroke-width="2.2" stroke-dasharray="5 4"/>`) + '</g>';
      }
    }
    if (!exp && lage === 'rum' && !verktygLage && (ui.val === it.id || gruppSet.has(it.id) || krock.has(it.id))) {
      const b = lokalBox(it);
      const farg = krock.has(it.id) ? FARG.accent : FARG.blue;
      s += `<rect x="${b.x0 - 6}" y="${b.y0 - 6}" width="${b.x1 - b.x0 + 12}" height="${b.y1 - b.y0 + 12}" rx="8" fill="none" stroke="${farg}" stroke-width="2" stroke-dasharray="${krock.has(it.id) ? '0' : '6 4'}"/>`;
      if (ui.val === it.id && !ui.grupp.length && !(ui.drag && ui.drag.moved && ui.drag.kind !== 'vrid')) s += vridHandtag(0, b.y0 - 34, 0, b.y0 - 6, 'data-vrid="1"');
    }
    // Spärrläget: varje stol går att klicka på
    if (sparrLage) {
      geo(it).seats.forEach(([sx, sy], i) => {
        const sparrad = bl.has(i);
        s += `<rect data-sparr="${it.id}:${i}" x="${sx - STOL_B / 2 - 5}" y="${sy - STOL_D / 2 - 5}" width="${STOL_B + 10}" height="${STOL_D + 10}" rx="11" fill="${sparrad ? FARG.accent : 'transparent'}" fill-opacity="${sparrad ? 0.1 : 0}" stroke="${FARG.accent}" stroke-opacity="${sparrad ? 0.9 : 0.45}" stroke-width="1.8" stroke-dasharray="${sparrad ? '0' : '4 3'}" style="cursor:pointer"/>`;
      });
    }
    // Katederns kanter och hörn går alltid att dra i för att ändra storleken,
    // utan att katedern först markeras. Handtagen ritas synligt när den är markerad.
    if (!exp && lage === 'rum' && !verktygLage && it.typ === 'kateder') {
      const t = geo(it), w2 = t.w / 2, h2 = t.h / 2;
      const markor = (hx, hy) => {
        const vinkel = ((rv + Math.atan2(hy, hx) * 180 / Math.PI) % 180 + 180) % 180;
        return ['ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize'][Math.round(vinkel / 45) % 4];
      };
      for (const [hx, hy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const x1 = hx ? hx * w2 : -w2 + 8, x2 = hx ? hx * w2 : w2 - 8, y1 = hy ? hy * h2 : -h2 + 8, y2 = hy ? hy * h2 : h2 - 8;
        s += `<line class="katkant" data-handtag="${hx},${hy}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="transparent" stroke-width="14" style="cursor:${markor(hx, hy)}"/>`;
      }
      for (const [hx, hy] of [[1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        s += `<circle data-handtag="${hx},${hy}" cx="${hx * w2}" cy="${hy * h2}" r="9" fill="transparent" style="cursor:${markor(hx, hy)}"/>`;
      }
      if (ui.val === it.id) {
        for (const [hx, hy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
          s += `<circle data-handtag="${hx},${hy}" cx="${hx * w2}" cy="${hy * h2}" r="${hx && hy ? 6 : 7.5}" fill="#ffffff" stroke="${FARG.blue}" stroke-width="2.2" style="cursor:${markor(hx, hy)}"/>`;
        }
      }
    }
    s += '</g>';
    if (it.typ === 'kateder') {
      const t = geo(it);
      s += `<text x="${r1(vx)}" y="${r1(vy) + 5}" text-anchor="middle" font-size="${t.w >= 120 ? 14 : 11}" font-weight="600" fill="${FARG.bankKant}" pointer-events="none">Kateder</text>`;
    }
  }
  // Roteringshandtag för en markerad grupp
  if (!exp && lage === 'rum' && !verktygLage && ui.grupp.length > 1 && !(ui.drag && ui.drag.moved && ui.drag.kind !== 'gruppvrid')) {
    const g = gruppen();
    if (g.length > 1) {
      const gb = gruppBox(g), mx = (gb.x0 + gb.x1) / 2;
      const [hx, hy] = V(mx, gb.y0 - 40), [fx, fy] = V(mx, gb.y0 - 8);
      s += vridHandtag(hx, hy, fx, fy, 'data-gruppvrid="1"');
    }
  }
  // Det skärmläge en skärm som flyttas skulle hamna i
  if (!exp && ui.drag && ui.drag.kind === 'skarmflytt' && ui.drag.mal) {
    const m = ui.drag.mal, it = r.items.find(i => i.id === m.bord);
    const g = it && skarmLagen(it).find(l => l.k === m.k);
    if (g) {
      const [ax, ay] = rot(g.x1, g.y1, it.rot), [bx, by] = rot(g.x2, g.y2, it.rot);
      const [p1x, p1y] = V(it.x + ax, it.y + ay), [p2x, p2y] = V(it.x + bx, it.y + by);
      s += `<line x1="${r1(p1x)}" y1="${r1(p1y)}" x2="${r1(p2x)}" y2="${r1(p2y)}" stroke="${FARG.accent}" stroke-width="7" stroke-linecap="round" stroke-opacity=".75" pointer-events="none"/>`;
    }
  }
  // Hjälplinjer vid linjering
  if (!exp && ui.guider && ui.drag && ui.drag.moved) {
    for (const q of ui.guider) {
      const [a1, b1] = q.ax === 'x' ? V(q.v, q.fran - 12) : V(q.fran - 12, q.v);
      const [a2, b2] = q.ax === 'x' ? V(q.v, q.till + 12) : V(q.till + 12, q.v);
      s += `<line x1="${r1(a1)}" y1="${r1(b1)}" x2="${r1(a2)}" y2="${r1(b2)}" stroke="${FARG.accent}" stroke-width="1.4" stroke-dasharray="6 4" pointer-events="none"/>`;
    }
  }
  // Markeringsramen (vykoordinater)
  if (!exp && ui.ram) {
    const q = ui.ram;
    s += `<rect x="${Math.min(q.x0, q.x1)}" y="${Math.min(q.y0, q.y1)}" width="${Math.abs(q.x1 - q.x0)}" height="${Math.abs(q.y1 - q.y0)}" fill="${FARG.blue}" fill-opacity=".07" stroke="${FARG.blue}" stroke-width="1.6" stroke-dasharray="6 4" pointer-events="none"/>`;
  }
  // Namnkorten. Med större namnstorlek blir korten större än platsens bredd;
  // ett kort som då skulle överlappa ett annat flyttas i första hand in över
  // den egna bänken och i andra hand längre ut, så att alla namn syns och det
  // ändå är tydligt vilken bänk namnet hör till.
  if (visaNamn) {
    const anim = ui.anim, pool = anim ? anim.pool : null;
    const drag = ui.drag && ui.drag.kind !== 'item' && ui.drag.kind !== 'vagg' && ui.drag.moved ? ui.drag : null;
    const f = S.inst.namnstorlek || 1;
    const itemById = new Map(r.items.map(i => [i.id, i]));
    const upptagna = [];
    for (const p of pl) {
      let [vx, vy] = V(p.kx, p.ky);
      const stId = c.map[p.id];
      const har = stId && elevIds.has(stId);
      const mal = !exp && ui.mal === p.id;
      const w = (p.kort - 2) * f, h = (S.inst.namn === 'hela' ? 38 : 29) * f;
      if (har && f > 1) {
        // Riktningen rakt ut från bänkens framkant mot stolen (vinkelrätt mot bänken).
        const it = itemById.get(p.item);
        const sida = rot(p.x - it.x, p.y - it.y, -it.rot)[1] < 0 ? -1 : 1;
        let [dx, dy] = rot(0, sida, it.rot);
        if (vand()) { dx = -dx; dy = -dy; }
        let val = null;
        // Först på stolen, sedan in över den egna bänken, sist längre ut från den.
        for (const niva of [0, -1, 1, 2]) {
          if (val) break;
          const x = vx + dx * niva * (h + 3), y = vy + dy * niva * (h + 3);
          const q = { x0: x - w / 2, x1: x + w / 2, y0: y - h / 2, y1: y + h / 2 };
          if (!upptagna.some(o => o.x0 < q.x1 - 1 && q.x0 < o.x1 - 1 && o.y0 < q.y1 - 1 && q.y0 < o.y1 - 1)) val = { x, y, q };
        }
        if (!val) val = { x: vx, y: vy, q: { x0: vx - w / 2, x1: vx + w / 2, y0: vy - h / 2, y1: vy + h / 2 } };
        upptagna.push(val.q); vx = val.x; vy = val.y;
      }
      if (!har) {
        if (mal) s += `<rect x="${vx - w / 2}" y="${vy - h / 2}" width="${w}" height="${h}" rx="6" fill="${FARG.accent}" fill-opacity=".08" stroke="${FARG.accent}" stroke-width="2.4" stroke-dasharray="5 3"/>`;
        if (!exp) s += `<rect data-seat="${p.id}" x="${vx - STOL_B / 2 - 4}" y="${vy - STOL_D / 2 - 4}" width="${STOL_B + 8}" height="${STOL_D + 8}" fill="transparent"/>`;
        continue;
      }
      let label = namn.get(stId) || { l1: '?' };
      let skala = 1, snurr = false, dold = false;
      if (anim && anim.d.has(p.id)) {
        const el = now - anim.t0 - anim.d.get(p.id);
        if (el < 0) dold = true;
        else if (el < anim.spin) {
          snurr = true;
          const idx = (Math.floor(el / 75) + anim.h.get(p.id)) % pool.length;
          label = namn.get(pool[idx]) || label;
        } else skala = 1 + 0.16 * Math.max(0, 1 - (el - anim.spin) / 240);
      }
      if (dold) { s += `<rect data-seat="${p.id}" x="${vx - STOL_B / 2}" y="${vy - STOL_D / 2}" width="${STOL_B}" height="${STOL_D}" fill="transparent"/>`; continue; }
      const last = c.lasta.includes(p.id);
      const kalla = drag && drag.fran === p.id;
      const kant = mal ? FARG.accent : last ? FARG.blue : FARG.ink;
      s += `<g data-seat="${p.id}" transform="translate(${r1(vx)} ${r1(vy)})${skala !== 1 ? ` scale(${r1(skala * 100) / 100})` : ''}"${kalla ? ' opacity=".3"' : ''}>`;
      s += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="6" fill="${FARG.kort}" stroke="${kant}" stroke-width="${mal ? 2.6 : last ? 2 : 1.3}"/>`;
      const farg = snurr ? FARG.muted : FARG.ink;
      if (label.l2 !== undefined) {
        const a = passa(label.l1, w - 7, r1(15 * f), fam), b = passa(label.l2 || '', w - 7, r1(12 * f), fam);
        s += `<text y="${r1(-2 * f)}" text-anchor="middle" font-size="${a.fs}" font-weight="600" fill="${farg}">${esc(a.s)}</text>`;
        if (b.s) s += `<text y="${r1(13 * f)}" text-anchor="middle" font-size="${b.fs}" font-weight="500" fill="${FARG.soft}">${esc(b.s)}</text>`;
      } else {
        const a = passa(label.l1, w - 7, r1(17 * f), fam);
        s += `<text y="${r1(a.fs * 0.35)}" text-anchor="middle" font-size="${a.fs}" font-weight="600" fill="${farg}">${esc(a.s)}</text>`;
      }
      if (last && !exp) {
        s += `<g transform="translate(${w / 2 - 3} ${-h / 2 + 1})"><circle r="8" fill="${FARG.blue}"/><rect x="-3.5" y="-1.5" width="7" height="5.5" rx="1" fill="#fff"/><path d="M-2 -1.5v-1.6a2 2 0 0 1 4 0v1.6" fill="none" stroke="#fff" stroke-width="1.3"/></g>`;
      }
      s += '</g>';
    }
  }
  s += '</svg>';
  return s;
}
function datumText(d) {
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ================= Rendering ================= */
const svg = $('plan'), stage = $('stage'), panel = $('panel');
function ritaPlan(now) {
  const s = planSvg({ now });
  const inre = s.slice(s.indexOf('>') + 1, s.lastIndexOf('</svg>'));
  const r = rum(), topp = 0, d = ui.drag;
  if (d && d.kind === 'rumstorlek' && d.moved) {
    // Fryst skala under dragningen; förskjut så att den motsatta väggen står still på skärmen.
    const fast0 = vand() ? [d.W0 - (d.sx > 0 ? 0 : d.W0), d.D0 - (d.sy > 0 ? 0 : d.D0)] : [d.sx > 0 ? 0 : d.W0, d.sy > 0 ? 0 : d.D0];
    const fastNu = V(d.sx > 0 ? 0 : r.W, d.sy > 0 ? 0 : r.D);
    const ox = d.sx ? fastNu[0] - fast0[0] : 0, oy = d.sy ? fastNu[1] - fast0[1] : 0;
    svg.setAttribute('viewBox', `${d.vb[0] + ox} ${d.vb[1] + oy} ${d.vb[2]} ${d.vb[3]}`);
    svg.style.overflow = 'visible';
  } else {
    svg.setAttribute('viewBox', `${-M} ${-M - topp} ${r.W + 2 * M} ${r.D + 2 * M + topp}`);
    svg.style.overflow = '';
  }
  svg.innerHTML = inre;
  placeraVerktyg();
}
function ritaStatus() {
  const r = rum(), k = klass(), c = cur(), pl = platser(r);
  const fria = pl.filter(p => !r.blocked.includes(p.id)).length;
  const lage = S.inst.lage;
  let h = '';
  if (lage === 'rum') {
    h = `<b>${esc(r.namn)}</b><span class="sep"></span><span><b>${fria}</b> platser</span>`;
  } else if (k) {
    const har = k.elever.filter(e => e.har).length;
    const placerade = Object.values(c.map).filter(id => k.elever.some(e => e.id === id)).length;
    h = `<b>${esc(k.namn)}</b><span class="sep valfri"></span><span class="valfri">${esc(r.namn)}</span><span class="sep"></span><span><b>${placerade}</b> av ${har} placerade</span><span class="sep valfri"></span><span class="valfri">${fria} platser</span>`;
  }
  $('status').classList.remove('tips');
  $('status').innerHTML = h;
  $('utskrift').innerHTML = k ? `<b>${esc(k.namn)}</b><span>${esc(r.namn)} · ${esc(datumText(new Date()))}</span>` : '';

  const go = $('goBtn'), nasta = $('nastaBtn');
  const tomt = $('tomt');
  stage.classList.toggle('rum', lage === 'rum');
  $('storlekBtn').hidden = lage === 'rum';
  if (lage === 'rum') {
    go.hidden = true;
    nasta.hidden = false;
    if (ui.skarm || ui.sparr) {
      nasta.innerHTML = `${IKON.bock}${ui.skarm ? 'Klar med skärmarna' : 'Klar med platserna'}`;
      nasta.dataset.till = 'verktygKlar';
      $('status').classList.add('tips');
      $('status').innerHTML = ui.skarm ? '<b>Klicka på en streckad linje för att sätta ut en provskärm</b>' : '<b>Klicka på de stolar som inte ska användas</b>';
    } else {
      nasta.innerHTML = `Nästa steg: klassen ${IKON.pil}`;
      nasta.dataset.till = 'klass';
      if (ui.grupp.length > 1) {
        $('status').innerHTML = `<b>${esc(r.namn)}</b><span class="sep"></span><span><b>${ui.grupp.length}</b> möbler markerade, dra i en av dem för att flytta alla</span>`;
      }
    }
  } else {
    go.hidden = !k || lage === 'klass';
    $('goTxt').textContent = Object.keys(c.map).length ? 'Slumpa igen' : 'Slumpa placering';
    if (lage === 'klass') { nasta.hidden = false; nasta.innerHTML = `Nästa steg: placeringen ${IKON.pil}`; nasta.dataset.till = 'plac'; }
    else nasta.hidden = true;
  }
  const ingaBankar = !pl.length;
  tomt.classList.toggle('on', ingaBankar);
  tomt.firstElementChild.innerHTML = '<b>Salen är tom</b>Ställ ut bänkar från panelen till vänster, eller välj en färdig möblering.';
  document.querySelectorAll('.mode').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.lage === lage));
    const klar = (b.dataset.lage === 'rum' && pl.length > 0) || (b.dataset.lage === 'klass' && k && k.elever.length > 0) || (b.dataset.lage === 'plac' && Object.keys(c.map).length > 0);
    b.classList.toggle('klar', !!klar);
  });
}
function allt() { ritaPlan(); ritaStatus(); ritaPanel(); }

/* ================= Panelen ================= */
function stepper(id, varde) {
  return `<span class="stepper"><button data-act="${id}-" aria-label="Minska">−</button><output>${varde}</output><button data-act="${id}+" aria-label="Öka">+</button></span>`;
}
function ikonSvg(typ) {
  if (VAGGTYP[typ]) {
    if (typ === 'dorr') return `<svg viewBox="-8 -8 116 76"><rect x="-6" y="-6" width="112" height="10" fill="${FARG.vagg}"/><rect x="5" y="-7" width="90" height="12" fill="#fff"/><path d="M5 95A90 90 0 0 0 95 4" transform="translate(0 -35)" fill="none" stroke="${FARG.muted}" stroke-width="2" stroke-dasharray="6 5"/><line x1="5" y1="4" x2="5" y2="60" stroke="${FARG.vagg}" stroke-width="4"/></svg>`;
    return `<svg viewBox="-8 -30 196 60"><rect x="-6" y="-6" width="192" height="12" fill="${FARG.vagg}"/><rect x="10" y="-6" width="160" height="12" fill="${FARG.glas}" stroke="${FARG.vagg}" stroke-width="2"/><line x1="10" y1="0" x2="170" y2="0" stroke="${FARG.vagg}" stroke-width="1.5"/></svg>`;
  }
  const b = lokalBox(typ);
  return `<svg viewBox="${b.x0 - 6} ${b.y0 - 6} ${b.x1 - b.x0 + 12} ${b.y1 - b.y0 + 12}">${mobelInre({ typ }, null)}</svg>`;
}
function forvalIkon(namn) {
  const r = { W: 900, D: 800 };
  const its = FORVAL[namn].gor(r);
  let s = `<svg viewBox="-20 -20 940 840"><rect x="0" y="0" width="900" height="800" fill="${FARG.golv}" stroke="${FARG.vagg}" stroke-width="18"/><rect x="240" y="0" width="420" height="24" fill="${FARG.ink}"/>`;
  for (const it of its) {
    const t = TYPER[it.typ];
    s += `<rect x="${it.x - t.w / 2}" y="${it.y - t.h / 2}" width="${t.w}" height="${t.h}" transform="rotate(${it.rot} ${it.x} ${it.y})" fill="${FARG.bank}" stroke="${FARG.bankKant}" stroke-width="10"/>`;
  }
  return s + '</svg>';
}
/* ---------- Sparade möbleringar och kopior av klassrum ----------
   En möblering är bänkarna, provskärmarna, de spärrade platserna och
   bänkmåtten. Salens mått, dörr och fönster ingår inte. Bänkarna behåller
   sina id:n, så klassernas placeringar gäller igen när en möblering används.
   Id:n behöver bara vara unika inom en sal, så en kopierad sal kan behålla
   dem, och då följer klassernas placeringar med till kopian. */
const mobleringNu = r => JSON.stringify({ items: r.items, skarmar: r.skarmar, blocked: r.blocked, matt: r.matt || {} });
function sparaMoblering(r, namn) {
  const kopia = JSON.parse(mobleringNu(r));
  const fanns = r.mobleringar.find(m => m.namn.toLowerCase() === namn.toLowerCase());
  if (fanns && !confirm(`Det finns redan en möblering som heter ${fanns.namn}. Vill du skriva över den?`)) return false;
  minns();
  if (fanns) Object.assign(fanns, kopia, { datum: new Date().toISOString() });
  else r.mobleringar.unshift({ id: uid(), namn, datum: new Date().toISOString(), ...kopia });
  return true;
}
function anvandMoblering(r, m) {
  minns();
  const k = JSON.parse(JSON.stringify(m));
  r.items = k.items; r.skarmar = k.skarmar; r.blocked = k.blocked; r.matt = k.matt || {};
  for (const it of r.items) hallInne(it, r);
  avmarkera(); ui.forslagSvar = null;
}
function kopieraRum(r) {
  minns();
  const ny = JSON.parse(JSON.stringify(r));
  ny.id = uid();
  let namn = r.namn + ' (kopia)', n = 2;
  while (S.rum.some(x => x.namn === namn)) namn = `${r.namn} (kopia ${n++})`;
  ny.namn = namn;
  S.rum.splice(S.rum.indexOf(r) + 1, 0, ny);
  for (const [key, pl] of Object.entries(S.plac)) {
    const [kid, rid] = key.split('|');
    if (rid === r.id) S.plac[kid + '|' + ny.id] = JSON.parse(JSON.stringify(pl));
  }
  S.rumId = ny.id; avmarkera();
}
function valjare(lista, valdId, prefix) {
  return `<div class="valj"><select id="${prefix}Sel" aria-label="Välj">${lista.map(x => `<option value="${x.id}"${x.id === valdId ? ' selected' : ''}>${esc(x.namn)}</option>`).join('')}<option value="__ny">${prefix === 'rum' ? 'Nytt klassrum …' : 'Ny klass …'}</option></select>` +
    (prefix === 'rum' ? `<button class="ibtn" data-act="rumKopia" title="Kopiera klassrummet" aria-label="Kopiera klassrummet">${IKON.kopiera}</button>` : '') +
    `<button class="ibtn fara" data-act="${prefix}Bort" title="Ta bort" aria-label="Ta bort">${IKON.sop}</button></div>`;
}
function ritaPanel() {
  const lage = S.inst.lage;
  const fokus = document.activeElement && panel.contains(document.activeElement) ? document.activeElement : null;
  const fokusId = fokus && (fokus.id || (fokus.dataset.el ? 'el-' + fokus.dataset.el + '-' + fokus.dataset.f : ''));
  const skroll = panel.scrollTop;
  if (lage === 'rum') panel.innerHTML = panelRum();
  else if (lage === 'klass') panel.innerHTML = panelKlass();
  else panel.innerHTML = panelPlac();
  panel.scrollTop = skroll;
  if (fokusId) {
    const el = fokusId.startsWith('el-') ? panel.querySelector(`[data-el="${fokusId.split('-')[1]}"][data-f="${fokusId.split('-')[2]}"]`) : $(fokusId);
    if (el && el.focus) el.focus();
  }
}
function panelRum() {
  const r = rum(), pl = platser(r);
  return `
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Klassrum</span></div>
    ${valjare(S.rum, r.id, 'rum')}
    <label class="lbl" for="rumNamn">Namn</label>
    <input class="falt" id="rumNamn" value="${esc(r.namn)}" style="width:100%">
    <div class="row" style="margin-top:12px">Bredd ${stepper('W', fmtM(r.W))}</div>
    <div class="row">Djup ${stepper('D', fmtM(r.D))}</div>
    <p class="note">Du kan också dra i en vägg eller ett hörn av salen. Knappen bredvid listan gör en kopia av hela klassrummet, så att du kan prova något nytt och ha originalet kvar.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Sparade möbleringar</span><span class="count"><b>${r.mobleringar.length}</b> sparade</span></div>
    <div class="valj"><input class="falt" id="mobNamn" placeholder="Namn, till exempel Prov" aria-label="Namn på möbleringen"><button class="btn mork" data-act="mobSpara" style="height:36px">${IKON.spara}Spara</button></div>
    ${r.mobleringar.length ? `<div class="hist">${r.mobleringar.map(m => {
      const aktuell = mobleringNu(r) === JSON.stringify({ items: m.items, skarmar: m.skarmar, blocked: m.blocked, matt: m.matt || {} });
      const antal = m.items.reduce((a, it) => a + (TYPER[it.typ] ? TYPER[it.typ].seats.length : 0), 0) - (m.blocked || []).length;
      return `<div class="histrad${aktuell ? ' aktuell' : ''}"><span><b>${esc(m.namn)}</b> · ${antal} platser · ${esc(new Date(m.datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' }))}${aktuell ? ' · <i>används nu</i>' : ''}</span>` +
        `<button class="btn liten" data-act="mobAnvand" data-id="${m.id}"${aktuell ? ' disabled' : ''}>Använd</button><button class="x" data-act="mobBort" data-id="${m.id}" aria-label="Ta bort ${esc(m.namn)}">${IKON.x}</button></div>`;
    }).join('')}</div>` : ''}
    <p class="note">Spara möbleringen innan du provar en ny, så kan du gå tillbaka till den med <b>Använd</b>. Bänkar, provskärmar, spärrade platser och bänkmått sparas. Salens mått, dörr och fönster påverkas inte.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Möbler</span><span class="count"><b>${pl.length - r.blocked.length}</b> platser</span></div>
    <div class="row" style="margin:0 0 12px">Antal enkelbänkar <span class="stepper"><button data-act="enkel-" aria-label="En enkelbänk färre">−</button><input id="antalEnkel" type="number" min="0" max="80" inputmode="numeric" value="${r.items.filter(i => i.typ === 'enkel').length}" aria-label="Antal enkelbänkar"><button data-act="enkel+" aria-label="En enkelbänk till">+</button></span></div>
    <div class="palett">${PALETT.map(t => {
      const typ = TYPER[t] || VAGGTYP[t];
      const n = TYPER[t] ? TYPER[t].seats.length : 0;
      const under = TYPER[t] ? (n ? n + (n === 1 ? ' plats' : ' platser') : 'Lärarens bord') : 'På väggen';
      return `<div class="mobelkort" data-ny="${t}" role="button" tabindex="0" aria-label="Lägg till ${esc(typ.namn)}">${ikonSvg(t)}<b>${esc(typ.namn)}</b><small>${under}</small></div>`;
    }).join('')}</div>
    <p class="note">Klicka för att ställa ut en möbel eller dra in den i salen. Dörren och fönstren dras längs väggarna, och ett klick på dörren vänder den så att den öppnas åt andra hållet. Ett fönster blir längre eller kortare när du drar i någon av dess ändar. Släpps en bänk på en annan snäpper de ihop kant i kant, och en bänk som dras nästan i linje med en annan bänk snäpper rakt bakom, framför eller bredvid den (håll ned Alt för att placera fritt). Markera en möbel för att vrida, kopiera eller ta bort den. Ta tag i det runda handtaget ovanför en markerad bänk och dra runt för att vrida den i steg om 45°. Vill du flytta flera bänkar på en gång drar du en ram runt dem från golvet (eller håller ned Skift och klickar), och drar sedan i en av dem. Katedern blir större eller mindre när du drar i en kant eller ett hörn av den.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Bänkarnas mått</span></div>
    <div class="matt">
      <div class="matt-h"><span></span><span>Bredd</span><span>Djup</span></div>
      ${['enkel', 'par', 'trio', 'grupp4', 'grupp6'].map(typ => {
        const t = geo({ typ }), std = TYPER[typ], egen = !!bankMatt(typ);
        return `<div class="matt-rad${egen ? ' egen' : ''}"><span>${esc(std.namn)}</span>
          <label><input type="number" data-matt="${typ}" data-dim="w" min="${MATT_MIN[0]}" max="${MATT_MAX[0]}" step="5" value="${t.w}" aria-label="${esc(std.namn)}, bredd i centimeter"><i>cm</i></label>
          <label><input type="number" data-matt="${typ}" data-dim="h" min="${MATT_MIN[1]}" max="${MATT_MAX[1]}" step="5" value="${t.h}" aria-label="${esc(std.namn)}, djup i centimeter"><i>cm</i></label></div>`;
      }).join('')}
    </div>
    <div class="btns"><button class="btn liten" data-act="mattStd"${r.matt && Object.keys(r.matt).length ? '' : ' disabled'}>Standardmått</button></div>
    <p class="note">Mät bänkarna i salen och skriv in måtten, så stämmer planen med verkligheten. Bänkarna som redan står i salen ändrar storlek direkt. Bredden är bänkens långsida, där eleverna sitter, och djupet avståndet från framkant till bakkant.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Föreslå bänkplacering</span></div>
    <div class="row" style="margin-top:0">Antal bänkar <span class="stepper"><button data-act="fAntal-" aria-label="En bänk färre">−</button><input id="forslagAntal" type="number" min="1" max="80" inputmode="numeric" value="${forslagAntal()}" aria-label="Antal bänkar"><button data-act="fAntal+" aria-label="En bänk till">+</button></span></div>
    <span class="lbl">Minsta avstånd mellan eleverna</span>
    <div class="row" style="margin-top:0">
      <div class="seg" role="group" aria-label="Enhet" style="flex:none">
        <button data-act="fEnhet" data-v="bank" aria-pressed="${S.inst.forslagEnhet !== 'm'}">Bänkavstånd</button>
        <button data-act="fEnhet" data-v="m" aria-pressed="${S.inst.forslagEnhet === 'm'}">Meter</button>
      </div>
      ${stepper('fAvst', S.inst.forslagEnhet === 'm' ? fmtMeter(forslagCm()) + '\u00a0m' : fmtAvst(forslagCm()))}
    </div>
    <p class="note" style="margin-top:2px">Avståndet mäts från kant till kant mellan bänkarna med stolar. Ett bänkavstånd är en enkelbänks bredd, ${Math.round(bankavstand())} cm i den här salen: med 1 bänkavstånd får en tom bänk plats mellan två elever.</p>
    <div class="btns"><button class="btn mork" data-act="foresla">${IKON.pil}Föreslå bänkplacering</button></div>
    ${ui.forslagSvar ? `<div class="rapport" style="margin-top:10px"><div class="${ui.forslagSvar.ok ? 'ok' : 'nej'}">${ui.forslagSvar.ok ? IKON.bock : IKON.kryss}<span>${ui.forslagSvar.html}</span></div></div>` : ''}
    <p class="note">Enkelbänkarna sprids över hela golvet, i raka eller förskjutna rader beroende på vad som ger störst avstånd. Kateder, dörr och fönster står kvar.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Platser som inte används</span><span class="count"><b>${r.blocked.length}</b> spärrade</span></div>
    <div class="skarmrad">
      <svg viewBox="-70 -36 140 102" aria-hidden="true">${mobelInre({ typ: 'par' }, new Set([1]))}</svg>
      <button class="btn${ui.sparr ? ' mork' : ''}" data-act="sparrLage" aria-pressed="${ui.sparr}">${ui.sparr ? IKON.bock + 'Klar' : IKON.sparr + 'Spärra platser'}</button>
    </div>
    <div class="btns"><button class="btn liten fara" data-act="sparrBort"${r.blocked.length ? '' : ' disabled'}>Öppna alla platser</button></div>
    <p class="note">Klicka på de stolar som inte ska användas, till exempel för att de står för tätt. En spärrad plats får aldrig någon elev när placeringen slumpas. Klicka igen för att öppna platsen.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Provskärmar</span><span class="count"><b>${r.skarmar.length}</b> ${r.skarmar.length === 1 ? 'skärm' : 'skärmar'}</span></div>
    <div class="skarmrad">
      <svg viewBox="-70 -36 140 102" aria-hidden="true">${mobelInre({ typ: 'par' }, null)}${skarmSvg({ x1: 0, y1: -25, x2: 0, y2: 25 })}${skarmSvg({ x1: -65, y1: -25, x2: -65, y2: 25 })}</svg>
      <button class="btn${ui.skarm ? ' mork' : ''}" data-act="skarmLage" aria-pressed="${ui.skarm}">${ui.skarm ? IKON.bock + 'Klar' : IKON.plus + 'Placera provskärmar'}</button>
    </div>
    <div class="btns"><button class="btn liten" data-act="skarmAlla">Mellan alla platser</button><button class="btn liten fara" data-act="skarmBort"${r.skarmar.length ? '' : ' disabled'}>${IKON.sop}Ta bort alla</button></div>
    <p class="note">Skärmar kan stå i bänkarnas kanter och i mitten av par- och labbänkar. Klicka på en streckad linje för att sätta ut en skärm och på skärmen igen för att ta bort den. En utplacerad skärm kan också dras till en ny plats, eller till papperskorgen som dyker upp nederst i planen. Skärmarna följer med när bänken flyttas.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Färdiga möbleringar</span></div>
    <div class="row" style="margin-top:0">Antal platser <span class="stepper"><button data-act="pAntal-" aria-label="En plats färre">−</button><input id="forvalAntal" type="number" min="1" max="200" inputmode="numeric" placeholder="Alla" value="${S.inst.forvalAntal || ''}" aria-label="Antal platser"><button data-act="pAntal+" aria-label="En plats till">+</button></span></div>
    <p class="note" style="margin:0 0 10px">Lämna tomt för att fylla salen. Med ett antal fördelas bänkarna jämnt i <b>Mot väggarna</b>, och de andra möbleringarna fylls framifrån.</p>
    <div class="forval">${Object.keys(FORVAL).map(n => `<button data-act="forval" data-n="${n}">${forvalIkon(n)}<span><b>${FORVAL[n].namn}</b><small>${FORVAL[n].bes}</small></span></button>`).join('')}</div>
    <p class="note">En färdig möblering ersätter bänkarna i salen. Kateder, dörr och fönster står kvar.</p>
    <div class="btns"><button class="btn liten fara" data-act="tomSal">${IKON.sop}Töm salen</button></div>
  </div>`;
}
function panelKlass() {
  const k = klass();
  if (!k) return `<div class="grp"><div class="grp-h"><span class="eyebrow">Klass</span></div><button class="btn mork" data-act="klassNy">${IKON.plus}Skapa en klass</button></div>`;
  const har = k.elever.filter(e => e.har).length;
  const sorterade = k.elever.slice().sort((a, b) => a.namn.localeCompare(b.namn, 'sv'));
  const n = id => { const e = k.elever.find(x => x.id === id); return e ? esc(e.namn) : '?'; };
  return `
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Klass</span></div>
    ${valjare(S.klasser, k.id, 'klass')}
    <label class="lbl" for="klassNamn">Namn</label>
    <input class="falt" id="klassNamn" value="${esc(k.namn)}" style="width:100%">
    ${k.exempel ? '<p class="note">Det här är en påhittad exempelklass. Välj <b>Ny klass</b> i listan ovanför för att lägga in din egen.</p>' : ''}
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Lägg till elever</span></div>
    <textarea id="listaIn" placeholder="Klistra in klasslistan här, ett namn per rad"></textarea>
    <div class="btns"><button class="btn mork" data-act="laggTill">${IKON.plus}Lägg till</button></div>
    <p class="note">Ett namn per rad. Står efternamnet först med kommatecken, som i <b>Berg, Alva</b>, vänds det automatiskt. Det går också att klistra in två kolumner från ett kalkylark.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Eleverna</span><span class="count"><b>${har}</b> av ${k.elever.length} här idag</span></div>
    <div class="elever">${sorterade.length ? sorterade.map(e => `
      <div class="elev${e.har ? '' : ' borta'}">
        <label class="har" title="Här idag"><input type="checkbox" data-el="${e.id}" data-f="har"${e.har ? ' checked' : ''} aria-label="${esc(e.namn)} är här idag"><span class="bock"></span></label>
        <input class="enamn" data-el="${e.id}" data-f="namn" value="${esc(e.namn)}" aria-label="Namn">
        <button class="fram" data-act="fram" data-id="${e.id}" aria-pressed="${e.fram}" title="Placeras bland de främre platserna">Fram</button>
        <button class="x" data-act="elevBort" data-id="${e.id}" aria-label="Ta bort ${esc(e.namn)}">${IKON.x}</button>
      </div>`).join('') : '<div class="tom-lista">Inga elever ännu.</div>'}</div>
    ${k.elever.length ? `<div class="btns"><button class="btn liten" data-act="allaHar">Alla är här</button><button class="btn liten fara" data-act="allaBort">Ta bort alla elever</button></div>` : ''}
    <p class="note">Bocken visar vem som är här idag. <b>Fram</b> betyder att eleven placeras bland de främre platserna, till exempel för att se och höra bättre.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Önskemål</span></div>
    <div class="rels">${k.rel.length ? k.rel.map(rl => `<div class="rel"><span><i class="${rl.typ}">${rl.typ === 'isar' ? 'Isär' : 'Ihop'}</i><b>${n(rl.a)}</b> och <b>${n(rl.b)}</b> ${rl.typ === 'isar' ? 'ska inte sitta bredvid varandra' : 'ska sitta bredvid varandra'}</span><button class="x" data-act="relBort" data-id="${rl.id}" aria-label="Ta bort önskemålet">${IKON.x}</button></div>`).join('') : '<div class="tom-lista">Inga önskemål.</div>'}</div>
    ${k.elever.length > 1 ? `<div class="relform">
      <select id="relA" aria-label="Första eleven">${sorterade.map(e => `<option value="${e.id}">${esc(e.namn)}</option>`).join('')}</select>
      <select id="relTyp" aria-label="Önskemål"><option value="isar">ska inte sitta bredvid</option><option value="ihop">ska sitta bredvid</option></select>
      <select id="relB" aria-label="Andra eleven">${sorterade.map((e, i) => `<option value="${e.id}"${i === 1 ? ' selected' : ''}>${esc(e.namn)}</option>`).join('')}</select>
      <button class="btn" data-act="relNy">${IKON.plus}Lägg till önskemålet</button>
    </div>` : ''}
    <div class="integritet" style="margin-top:12px">${IKON.skold}<span>Önskemålen och markeringen Fram syns bara här. Planen som visas för klassen, skrivs ut eller laddas ned innehåller bara namnen.</span></div>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Spara och flytta</span></div>
    <p class="note" style="margin-top:0">Allt sparas i den här webbläsaren och inga namn skickas någonstans. Vill du använda klasserna på en annan dator sparar du dem till en fil.</p>
    <div class="btns"><button class="btn liten" data-act="exportera">${IKON.fil}Spara till fil</button><button class="btn liten" data-act="importera">${IKON.oppnafil}Öppna fil</button></div>
  </div>`;
}
function panelPlac() {
  const k = klass(), c = cur(), r = rum();
  if (!k) return panelKlass();
  const pl = platser(r);
  const seatIds = new Set(pl.map(p => p.id));
  const placerade = new Set(Object.entries(c.map).filter(([sid]) => seatIds.has(sid)).map(([, id]) => id));
  const utan = k.elever.filter(e => e.har && !placerade.has(e.id));
  const borta = k.elever.filter(e => !e.har);
  const rap = c.rapport;
  const T = S.inst.tomma;
  const tommaNot = { fram: 'Eleverna fyller salen framifrån och de tomma platserna hamnar längst bak.', glest: 'Eleverna sitter så långt isär som möjligt, till exempel vid prov.', slump: 'De tomma platserna kan hamna var som helst i salen.' };
  return `
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Så slumpas placeringen</span></div>
    <span class="lbl" style="margin-top:0">Tomma platser</span>
    <div class="seg" role="group" aria-label="Tomma platser">
      <button data-act="tomma" data-v="fram" aria-pressed="${T === 'fram'}">Längst bak</button>
      <button data-act="tomma" data-v="glest" aria-pressed="${T === 'glest'}">Utspridda</button>
      <button data-act="tomma" data-v="slump" aria-pressed="${T === 'slump'}">Var som helst</button>
    </div>
    <p class="note">${tommaNot[T]}</p>
    <label class="tgl"><span>Ingen bredvid någon</span><input type="checkbox" id="avstandTgl"${S.inst.avstand ? ' checked' : ''}><span class="sw"></span></label>
    <p class="note">Ingen elev placeras direkt bredvid en annan. Räcker inte platserna sätts en provskärm ut automatiskt mellan dem som måste sitta bredvid varandra.</p>
    <label class="tgl"><span>Nya grannar</span><input type="checkbox" id="nyaTgl"${S.inst.nya ? ' checked' : ''}><span class="sw"></span></label>
    <p class="note">${k.hist.length ? 'Undvik att eleverna får samma grannar som i den senast sparade placeringen.' : 'När du har sparat en placering försöker verktyget ge eleverna nya grannar nästa gång.'}</p>
  </div>
  ${rap ? `<div class="grp">
    <div class="grp-h"><span class="eyebrow">Senaste slumpningen</span></div>
    <div class="rapport">${rap.map(x => `<div class="${x.ok ? 'ok' : 'nej'}">${x.ok ? IKON.bock : IKON.kryss}<span>${x.html}</span></div>`).join('')}</div>
  </div>` : ''}
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Utan plats</span><span class="count"><b>${utan.length}</b> ${utan.length === 1 ? 'elev' : 'elever'}</span></div>
    <div class="utan" id="utan">${utan.length ? utan.map(e => `<span class="elevchip" data-chip="${e.id}">${esc(e.namn)}</span>`).join('') : '<span class="tom-lista">Alla som är här har en plats.</span>'}</div>
    ${borta.length ? `<div class="borta-rad">Frånvarande: ${borta.map(e => esc(e.namn)).join(', ')}</div>` : ''}
    <p class="note">Dra ett namn till en plats. Drar du ett namn till en upptagen plats byter eleverna plats. Klicka på en plats för att låsa eleven där eller spärra platsen.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Visning</span></div>
    <span class="lbl" style="margin-top:0">Tavlan</span>
    <div class="seg" role="group" aria-label="Tavlan">
      <button data-act="vy" data-v="elev" aria-pressed="${S.inst.vy === 'elev'}">Överst</button>
      <button data-act="vy" data-v="larare" aria-pressed="${S.inst.vy === 'larare'}">Nederst</button>
    </div>
    <p class="note">${S.inst.vy === 'elev' ? 'Planen visas som eleverna ser salen, med tavlan framför sig.' : 'Planen visas som du ser salen när du står vid tavlan.'}</p>
    <span class="lbl">Namn</span>
    <div class="seg" role="group" aria-label="Namn">
      <button data-act="namn" data-v="kort" aria-pressed="${S.inst.namn === 'kort'}">Förnamn</button>
      <button data-act="namn" data-v="hela" aria-pressed="${S.inst.namn === 'hela'}">Hela namnet</button>
    </div>
    <span class="lbl">Namnstorlek</span>
    <div class="seg" role="group" aria-label="Namnstorlek">
      ${NAMNSTORLEK.map(([v, t]) => `<button data-act="storlek" data-v="${v}" aria-pressed="${(S.inst.namnstorlek || 1) === v}">${t}</button>`).join('')}
    </div>
    <p class="note">Stora namn syns bättre på projektorn. Knappen <b>Aa</b> ovanför planen byter storlek, även i helskärm.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Spara och dela</span></div>
    <div class="btns" style="margin-top:0">
      <button class="btn mork" data-act="sparaPlac"${placerade.size ? '' : ' disabled'}>${IKON.spara}Spara placeringen</button>
      <button class="btn" data-act="skrivUt"${placerade.size ? '' : ' disabled'}>${IKON.skriv}Skriv ut</button>
      <button class="btn" data-act="bild"${placerade.size ? '' : ' disabled'}>${IKON.bild}Ladda ned bild</button>
      <button class="btn" data-act="kopieraBild"${placerade.size ? '' : ' disabled'}>${IKON.kopiera}Kopiera bild</button>
    </div>
    <p class="note">Spara placeringen när klassen börjar använda den. Då minns verktyget vilka som satt bredvid varandra.</p>
    ${k.hist.length ? `<div class="hist">${k.hist.map(h => `<div class="histrad"><span><b>${esc(new Date(h.datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' }))}</b> · ${esc(h.rumNamn)}</span><button class="btn liten" data-act="histVisa" data-id="${h.id}">Visa</button><button class="x" data-act="histBort" data-id="${h.id}" aria-label="Ta bort">${IKON.x}</button></div>`).join('')}</div>` : ''}
  </div>`;
}

/* ================= Slumpningen ================= */
// Direkt bredvid: sida vid sida vid samma bänk eller vid två bänkar som står tätt.
// Elever mitt emot varandra vid ett gruppbord räknas inte, inte heller rader framför och bakom.
// Platserna står i samma rad (mindre än 30 cm isär framåt eller bakåt, sett från
// a:s bänk) och är närmare varandra i sidled än en platsbredd plus lite marginal.
function bredvidGrans() {
  let g = 0;
  for (const it of rum().items) { const t = geo(it), n = t.seats.length > 3 ? t.seats.length / 2 : t.seats.length; if (n) g = Math.max(g, t.w / n); }
  return Math.max(85, g + 15);
}
let BREDVID = 85;
const bredvid = (a, b) => {
  const [lx, ly] = rot(b.x - a.x, b.y - a.y, -(a.rot || 0));
  return Math.abs(ly) < 30 && Math.abs(lx) < BREDVID;
};
// Alla lediga platser i den ordning läget föredrar dem.
function ordnaPlatser(fria, lage, fasta) {
  if (lage === 'slump') return blanda(fria.slice());
  if (lage === 'fram') {
    // Rad för rad framifrån; inom raden slumpas ordningen.
    const m = fria.map(p => ({ p, k: Math.round(p.y / 40) + Math.random() * 0.5 }));
    m.sort((a, b) => a.k - b.k);
    return m.map(x => x.p);
  }
  // Utspridda: välj hela tiden den plats som ligger längst från alla redan valda.
  const valda = [], kvar = fria.slice(), ref = fasta.slice();
  if (!ref.length && kvar.length) { const i = Math.floor(Math.random() * kvar.length); valda.push(kvar.splice(i, 1)[0]); }
  while (kvar.length) {
    let basta = -1, bastaD = -1;
    for (let i = 0; i < kvar.length; i++) {
      let d = Infinity;
      for (const q of valda.concat(ref)) {
        let dd = Math.hypot(kvar[i].x - q.x, kvar[i].y - q.y);
        if (kvar[i].item === q.item) dd *= 0.6;
        d = Math.min(d, dd);
      }
      d += Math.random() * 6;
      if (d > bastaD) { bastaD = d; basta = i; }
    }
    valda.push(kvar.splice(basta, 1)[0]);
  }
  return valda;
}
function valjPlatser(fria, n, lage, fasta, avstand) {
  if (!avstand) {
    if (lage === 'slump' || n >= fria.length) return fria.slice();
    return ordnaPlatser(fria, lage, fasta).slice(0, n);
  }
  // Ta bara platser som inte ligger bredvid någon redan vald. Räcker de inte
  // väljs sedan de platser som har minst antal grannar.
  const ordning = ordnaPlatser(fria, lage, fasta);
  const valda = [];
  const antal = p => valda.concat(fasta).filter(q => bredvid(p, q)).length;
  for (const p of ordning) { if (valda.length >= n) break; if (!antal(p)) valda.push(p); }
  const kvar = ordning.filter(p => !valda.includes(p));
  while (valda.length < n && kvar.length) {
    let bi = 0, ba = Infinity;
    kvar.forEach((p, i) => { const a = antal(p); if (a < ba) { ba = a; bi = i; } });
    valda.push(kvar.splice(bi, 1)[0]);
  }
  return valda;
}
function slumpa(animera = true) {
  const r = rum(), k = klass(); if (!k) return;
  BREDVID = bredvidGrans();
  const c = cur();
  const alla = platser(r).filter(p => !r.blocked.includes(p.id));
  if (!alla.length) { visaTips('Ställ först ut bänkar i salen.'); return; }
  const har = k.elever.filter(e => e.har);
  if (!har.length) { visaTips('Det finns inga elever som är här. Lägg till elever i steg 2.'); return; }
  minns();
  const harIds = new Set(har.map(e => e.id));
  const seatById = new Map(alla.map(p => [p.id, p]));
  const lasta = new Map();
  for (const sid of c.lasta) { const st = c.map[sid]; if (st && harIds.has(st) && seatById.has(sid)) lasta.set(sid, st); }
  const lastaElever = new Set(lasta.values());
  let attPlacera = blanda(har.filter(e => !lastaElever.has(e.id)).map(e => e.id));
  const fria = alla.filter(p => !lasta.has(p.id));
  let utanPlats = [];
  if (attPlacera.length > fria.length) utanPlats = attPlacera.splice(fria.length);
  const fastaP = [...lasta.keys()].map(id => seatById.get(id));
  const valda = valjPlatser(fria, attPlacera.length, S.inst.tomma, fastaP, !!S.inst.avstand);

  // Positioner: först de låsta (orörliga), sedan de valda.
  const P = fastaP.map(p => ({ p, st: lasta.get(p.id), fast: true }))
    .concat(valda.map(p => ({ p, st: null, fast: false })));
  const rorliga = [];
  P.forEach((x, i) => { if (!x.fast) rorliga.push(i); });
  blanda(rorliga.slice()).forEach((i, j) => { if (j < attPlacera.length) P[i].st = attPlacera[j]; });

  const nb = P.map(() => []);
  const parLista = [];
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
    if (grannar(P[i].p, P[j].p)) { nb[i].push(j); nb[j].push(i); parLista.push([i, j]); }
  }
  const arGrannar = (i, j) => nb[i].includes(j);
  // De främre platserna: den främsta tredjedelen, men minst så många som behövs.
  const framElever = har.filter(e => e.fram).map(e => e.id);
  const ys = P.map(x => x.p.y).sort((a, b) => a - b);
  const framAntal = Math.min(ys.length, Math.max(Math.ceil(ys.length * 0.34), framElever.length));
  const framGrans = ys[framAntal - 1] + 15;
  const arFram = i => P[i].p.y <= framGrans;
  const rels = k.rel.filter(rl => harIds.has(rl.a) && harIds.has(rl.b));
  const hist = S.inst.nya && k.hist.length ? new Set(k.hist[0].par) : null;

  const pos = new Map();
  const kostnad = () => {
    pos.clear(); P.forEach((x, i) => { if (x.st) pos.set(x.st, i); });
    let kst = 0;
    for (const f of framElever) { const i = pos.get(f); if (i !== undefined && !arFram(i)) kst += 100; }
    for (const rl of rels) {
      const a = pos.get(rl.a), b = pos.get(rl.b);
      if (a === undefined || b === undefined) { if (rl.typ === 'ihop') kst += 100; continue; }
      const g = arGrannar(a, b);
      if (rl.typ === 'isar' && g) kst += 100;
      if (rl.typ === 'ihop' && !g) kst += 100;
    }
    if (hist) for (const [i, j] of parLista) { if (P[i].st && P[j].st && hist.has(parNyckel(P[i].st, P[j].st))) kst += 1; }
    return kst;
  };
  let best = P.map(x => x.st), bestK = kostnad();
  if (rorliga.length > 1 && bestK > 0) {
    for (let omstart = 0; omstart < 4 && bestK > 0; omstart++) {
      if (omstart) { const st = blanda(rorliga.map(i => P[i].st)); rorliga.forEach((i, j) => { P[i].st = st[j]; }); }
      let kNu = kostnad();
      const N = 5000;
      for (let it = 0; it < N; it++) {
        const T = 3 * Math.pow(0.02 / 3, it / N);
        const a = rorliga[Math.floor(Math.random() * rorliga.length)], b = rorliga[Math.floor(Math.random() * rorliga.length)];
        if (a === b || (!P[a].st && !P[b].st)) continue;
        [P[a].st, P[b].st] = [P[b].st, P[a].st];
        const kNy = kostnad();
        if (kNy <= kNu || Math.random() < Math.exp((kNu - kNy) / T)) {
          kNu = kNy;
          if (kNu < bestK) { bestK = kNu; best = P.map(x => x.st); if (!bestK) break; }
        } else [P[a].st, P[b].st] = [P[b].st, P[a].st];
      }
    }
  }
  P.forEach((x, i) => { x.st = best[i]; });

  const tidigare = c.map;
  c.map = {};
  P.forEach(x => { if (x.st) c.map[x.p.id] = x.st; });
  c.lasta = [...lasta.keys()];

  // Rapport
  kostnad();
  const namn = id => { const e = k.elever.find(x => x.id === id); return e ? esc(e.namn) : '?'; };
  const rap = [];
  const framMiss = framElever.filter(f => pos.has(f) && !arFram(pos.get(f)));
  const relMiss = rels.filter(rl => {
    const a = pos.get(rl.a), b = pos.get(rl.b);
    if (a === undefined || b === undefined) return rl.typ === 'ihop';
    return rl.typ === 'isar' ? arGrannar(a, b) : !arGrannar(a, b);
  });
  const totOnsk = framElever.length + rels.length;
  if (totOnsk) {
    if (!framMiss.length && !relMiss.length) rap.push({ ok: true, html: totOnsk === 1 ? 'Önskemålet är uppfyllt.' : `Alla <b>${totOnsk}</b> önskemål är uppfyllda.` });
    for (const f of framMiss) rap.push({ ok: false, html: `<b>${namn(f)}</b> fick ingen av de främre platserna.` });
    for (const rl of relMiss) rap.push({ ok: false, html: `<b>${namn(rl.a)}</b> och <b>${namn(rl.b)}</b> ${rl.typ === 'isar' ? 'sitter bredvid varandra.' : 'sitter inte bredvid varandra.'}` });
  }
  if (hist) {
    let nya = 0, medGrannar = 0;
    P.forEach((x, i) => {
      if (!x.st) return;
      const gr = nb[i].filter(j => P[j].st);
      if (!gr.length) return;
      medGrannar++;
      if (gr.every(j => !hist.has(parNyckel(x.st, P[j].st)))) nya++;
    });
    if (medGrannar) rap.push({ ok: nya === medGrannar, html: nya === medGrannar ? `Alla <b>${medGrannar}</b> elever med grannar har fått helt nya grannar.` : `<b>${nya}</b> av ${medGrannar} elever har fått helt nya grannar.` });
  }
  if (S.inst.avstand) {
    const n = autoSkarmar(r, c);
    rap.push(n ? { ok: false, html: `Platserna räckte inte för att alla skulle sitta med mellanrum. <b>${n}</b> ${n === 1 ? 'provskärm har' : 'provskärmar har'} satts ut mellan elever som sitter bredvid varandra.` }
      : { ok: true, html: 'Ingen elev sitter direkt bredvid någon annan.' });
  } else c.skarmar = [];
  if (utanPlats.length) rap.push({ ok: false, html: `<b>${utanPlats.length}</b> ${utanPlats.length === 1 ? 'elev fick' : 'elever fick'} ingen plats. Ställ ut fler bänkar i steg 1.` });
  if (lasta.size) rap.push({ ok: true, html: `<b>${lasta.size}</b> ${lasta.size === 1 ? 'elev satt låst och ligger kvar' : 'elever satt låsta och ligger kvar'}.` });
  if (!rap.length) rap.push({ ok: true, html: `<b>${Object.keys(c.map).length}</b> elever har fått en plats.` });
  c.rapport = rap;
  spara();
  if (S.inst.lage === 'rum') S.inst.lage = 'plac';
  ritaStatus(); ritaPanel();
  if (animera) starta(tidigare); else ritaPlan();
}
function starta() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const c = cur(), k = klass();
  if (reduce || !k) { ritaPlan(); return; }
  const r = rum();
  const pl = platser(r).filter(p => c.map[p.id] && !c.lasta.includes(p.id));
  // I den ordning eleverna ser salen: framifrån och bakåt.
  pl.sort((a, b) => (Math.round(a.y / 40) - Math.round(b.y / 40)) || (vand() ? b.x - a.x : a.x - b.x));
  const steg = Math.min(55, 1500 / Math.max(1, pl.length));
  const d = new Map(), h = new Map();
  pl.forEach((p, i) => { d.set(p.id, i * steg); h.set(p.id, Math.floor(Math.random() * 1000)); });
  const pool = k.elever.filter(e => e.har).map(e => e.id);
  ui.anim = { t0: performance.now(), d, h, pool, spin: 560 };
  const slut = (pl.length - 1) * steg + 560 + 260;
  $('goBtn').classList.add('snurrar');
  const avsluta = () => { if (!ui.anim) return; ui.anim = null; $('goBtn').classList.remove('snurrar'); ritaPlan(); };
  // Reserv: i en dold flik står requestAnimationFrame still, men placeringen ska ändå bli klar.
  setTimeout(avsluta, slut + 150);
  const tick = now => {
    if (!ui.anim) return;
    if (now - ui.anim.t0 > slut) { avsluta(); return; }
    ritaPlan(now);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
/* Automatiska provskärmar: med "Ingen bredvid någon" sätts en skärm mellan
   varje par elever som ändå sitter direkt bredvid varandra. De hör till
   placeringen (inte till salen) och räknas om när placeringen ändras. */
function autoSkarmar(r, c) {
  c.skarmar = [];
  BREDVID = bredvidGrans();
  if (!S.inst.avstand) return 0;
  const items = new Map(r.items.map(i => [i.id, i]));
  const pl = platser(r).filter(p => c.map[p.id]);
  const mitter = r.skarmar.map(x => { const o = items.get(x.bord); return o ? skarmMitt(o, x.k) : null; }).filter(Boolean);
  const finns = m => mitter.some(q => Math.hypot(q[0] - m[0], q[1] - m[1]) < 8);
  for (let i = 0; i < pl.length; i++) for (let j = i + 1; j < pl.length; j++) {
    const a = pl[i], b = pl[j];
    if (!bredvid(a, b)) continue;
    let bord, k;
    if (a.item === b.item) {
      const it = items.get(a.item), n = geo(it).seats.length > 3 ? geo(it).seats.length / 2 : geo(it).seats.length;
      const ia = +a.id.split(':')[1] % n, ib = +b.id.split(':')[1] % n;
      bord = it.id; k = 's' + Math.max(ia, ib);
    } else {
      // Den kortsida på a:s bänk som vetter mot b
      const it = items.get(a.item);
      const mv = skarmMitt(it, 'v'), mh = skarmMitt(it, 'h');
      bord = it.id;
      k = Math.hypot(mv[0] - b.x, mv[1] - b.y) < Math.hypot(mh[0] - b.x, mh[1] - b.y) ? 'v' : 'h';
    }
    const m = skarmMitt(items.get(bord), k);
    if (!m || finns(m)) continue;
    c.skarmar.push({ id: uid(), bord, k });
    mitter.push(m);
  }
  return c.skarmar.length;
}
function grannparNu() {
  const c = cur(), pl = platser(rum()).filter(p => c.map[p.id]);
  const ut = [];
  for (let i = 0; i < pl.length; i++) for (let j = i + 1; j < pl.length; j++) {
    if (grannar(pl[i], pl[j])) ut.push(parNyckel(c.map[pl[i].id], c.map[pl[j].id]));
  }
  return ut;
}

/* ================= Tips (kort meddelande i statusraden) ================= */
let tipsTimer = 0;
function visaTips(text) {
  const st = $('status');
  st.classList.add('tips');
  st.innerHTML = `<b>${esc(text)}</b>`;
  clearTimeout(tipsTimer);
  tipsTimer = setTimeout(ritaStatus, 2600);
}

/* ================= Interaktion i planen ================= */
function varld(cx, cy) {
  const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
  const m = svg.getScreenCTM(); if (!m) return [0, 0];
  const p = pt.matrixTransform(m.inverse());
  return V(p.x, p.y);
}
function overPlan(cx, cy) { const b = svg.getBoundingClientRect(); return cx >= b.left && cx <= b.right && cy >= b.top && cy <= b.bottom; }
function platsVid(x, y) {
  const r = rum(); let basta = null, bd = 48;
  for (const p of platser(r)) {
    if (r.blocked.includes(p.id)) continue;
    const d = Math.hypot(p.kx - x, p.ky - y);
    if (d < bd) { bd = d; basta = p; }
  }
  return basta;
}
function narmasteVagg(x, y, r) {
  const d = { n: y, s: r.D - y, w: x, e: r.W - x };
  return Object.keys(d).reduce((a, b) => d[a] <= d[b] ? a : b);
}
function placeraVagg(v, x, y, r) {
  v.wall = narmasteVagg(x, y, r);
  const L = vaggLen(v), langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D;
  v.t = clamp(snap(v.wall === 'n' || v.wall === 's' ? x : y), L / 2, langd - L / 2);
}
function spoke(html, cx, cy, klass2) {
  let el = $('spoke');
  if (!el) { el = document.createElement('div'); el.id = 'spoke'; document.body.appendChild(el); }
  el.className = 'spoke' + (klass2 ? ' ' + klass2 : '');
  if (html !== null) el.innerHTML = html;
  el.style.left = cx + 'px'; el.style.top = cy + 'px';
}
function tabortSpoke() { const el = $('spoke'); if (el) el.remove(); }

svg.addEventListener('pointerdown', e => {
  if (e.button !== 0 || ui.anim) return;
  stangPop();
  const [x, y] = varld(e.clientX, e.clientY);
  const r = rum();
  if (S.inst.lage === 'rum') {
    if (ui.skarm) {
      const kand = e.target.closest('[data-kand]');
      if (kand) {
        const [bord, k] = kand.dataset.kand.split('|');
        minns();
        const fanns = r.skarmar.find(x => x.bord === bord && x.k === k);
        const c = cur(), auto = (c.skarmar || []).find(x => x.bord === bord && x.k === k);
        if (fanns) r.skarmar = r.skarmar.filter(x => x !== fanns);
        else if (auto) c.skarmar = c.skarmar.filter(x => x !== auto);
        else r.skarmar.push({ id: uid(), bord, k });
        spara(); ritaPlan(); ritaPanel();
      }
      e.preventDefault();
      return;
    }
    if (ui.sparr) {
      const st = e.target.closest('[data-sparr]');
      if (st) {
        const sid = st.dataset.sparr;
        minns();
        if (r.blocked.includes(sid)) r.blocked = r.blocked.filter(x => x !== sid);
        else {
          r.blocked.push(sid);
          // Eleven som satt där flyttas till Utan plats, i alla klasser.
          for (const [key, pl] of Object.entries(S.plac)) if (key.endsWith('|' + r.id)) { delete pl.map[sid]; pl.lasta = pl.lasta.filter(x => x !== sid); }
        }
        spara(); ritaPlan(); ritaPanel(); ritaStatus();
      }
      e.preventDefault();
      return;
    }
    const rk = e.target.closest('[data-rumkant]');
    if (rk) {
      const [sx, sy] = rk.dataset.rumkant.split(',').map(Number);
      const vb = svg.getAttribute('viewBox').split(' ').map(Number);
      ui.val = null;
      ui.drag = { kind: 'rumstorlek', sx, sy, W0: r.W, D0: r.D, vb, items0: r.items.map(i => [i.x, i.y]), vagg0: r.vagg.map(v => v.t), cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      e.preventDefault();
      return;
    }
    if (borjaFlyttaSkarm(e, r)) return;
    if (e.target.closest('[data-vrid]') && ui.val) {
      const it = r.items.find(i => i.id === ui.val);
      if (it) {
        ui.drag = { kind: 'vrid', id: it.id, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
        e.preventDefault(); return;
      }
    }
    if (e.target.closest('[data-gruppvrid]') && ui.grupp.length > 1) {
      const g = gruppen(), gb = gruppBox(g), mx = (gb.x0 + gb.x1) / 2, my = (gb.y0 + gb.y1) / 2;
      ui.drag = { kind: 'gruppvrid', mx, my, a0: Math.atan2(x - mx, -(y - my)) * 180 / Math.PI, pos0: g.map(i => [i.x, i.y, i.rot]), cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      e.preventDefault(); return;
    }
    const hEl = e.target.closest('[data-handtag]'), itEl = e.target.closest('[data-item]'), vEl = e.target.closest('[data-vagg]');
    if (hEl && itEl) {
      const it = r.items.find(i => i.id === itEl.dataset.item), t = geo(it);
      const [hx, hy] = hEl.dataset.handtag.split(',').map(Number);
      ui.drag = { kind: 'storlek', id: it.id, hx, hy, x0: it.x, y0: it.y, w0: t.w, h0: t.h, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      ui.val = it.id;
      ritaPlan();
      e.preventDefault();
      return;
    }
    if (itEl) {
      const it = r.items.find(i => i.id === itEl.dataset.item);
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        // Skift- eller Ctrl-klick lägger till eller tar bort möbeln ur markeringen.
        const ids = ui.grupp.length ? ui.grupp.slice() : (ui.val && r.items.some(i => i.id === ui.val) ? [ui.val] : []);
        const i = ids.indexOf(it.id);
        if (i >= 0) ids.splice(i, 1); else ids.push(it.id);
        ui.grupp = ids.length > 1 ? ids : []; ui.val = ids.length === 1 ? ids[0] : null;
      } else if (ui.grupp.includes(it.id)) {
        const g = gruppen();
        ui.drag = { kind: 'grupp', x0: x, y0: y, pos0: g.map(i => [i.x, i.y]), cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      } else {
        ui.grupp = []; ui.val = it.id;
        ui.drag = { kind: 'item', id: it.id, dx: it.x - x, dy: it.y - y, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      }
    } else if (e.target.closest('[data-fkant]')) {
      const [id, sida] = e.target.closest('[data-fkant]').dataset.fkant.split(',');
      const v = r.vagg.find(x => x.id === id), L = vaggLen(v);
      ui.grupp = []; ui.val = id;
      ui.drag = { kind: 'fonster', id, fast: sida === '1' ? v.t - L / 2 : v.t + L / 2, sida: +sida, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
    } else if (vEl) {
      ui.grupp = []; ui.val = vEl.dataset.vagg;
      ui.drag = { kind: 'vagg', id: vEl.dataset.vagg, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
    } else {
      // Tomt golv: börja dra en markeringsram, som när man markerar filer.
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const v0 = pt.matrixTransform(svg.getScreenCTM().inverse());
      const behall = (e.shiftKey || e.ctrlKey || e.metaKey) ? (ui.grupp.length ? ui.grupp.slice() : (ui.val ? [ui.val] : [])) : [];
      if (!behall.length) avmarkera();
      ui.drag = { kind: 'ram', vx: v0.x, vy: v0.y, behall, cx: e.clientX, cy: e.clientY, moved: false };
    }
    ritaPlan();
    ritaStatus();
    e.preventDefault();
    return;
  }
  // Provskärmarna går att flytta i alla steg, inte bara när salen ritas upp.
  if (borjaFlyttaSkarm(e, r)) return;
  const sEl = e.target.closest('[data-seat]');
  if (sEl) {
    ui.drag = { kind: 'seat', fran: sEl.dataset.seat, st: cur().map[sEl.dataset.seat], cx: e.clientX, cy: e.clientY, moved: false };
    e.preventDefault();
  }
});
window.addEventListener('pointermove', e => {
  const d = ui.drag; if (!d) return;
  if (!d.moved && Math.hypot(e.clientX - d.cx, e.clientY - d.cy) < 5) return;
  const r = rum();
  if (!d.moved) { d.moved = true; stage.classList.add('greppar'); }
  const [x, y] = varld(e.clientX, e.clientY);
  if (d.kind === 'item') {
    const it = r.items.find(i => i.id === d.id); if (!it) return;
    it.x = snap(x + d.dx); it.y = snap(y + d.dy); hallInne(it, r);
    ui.guider = null;
    if (!e.altKey) {
      linjera([it], r); hallInne(it, r);
      snappa(it, r); hallInne(it, r);
      linjera([it], r, false);
    }
    ritaPlan();
  } else if (d.kind === 'skarmflytt') {
    $('korg').classList.add('on');
    d.korg = overKorg(e.clientX, e.clientY);
    $('korg').classList.toggle('mal', d.korg);
    d.mal = d.korg ? null : narmasteSkarmLage(x, y, r, d.id);
    spoke('<svg width="44" height="10" viewBox="0 0 44 10"><line x1="4" y1="5" x2="40" y2="5" stroke="#4a5d78" stroke-width="6" stroke-linecap="round"/><line x1="4" y1="5" x2="40" y2="5" stroke="#a9b9cf" stroke-width="1.6" stroke-linecap="round"/></svg>', e.clientX, e.clientY, 'skarm');
    $('spoke').style.opacity = d.mal ? '0' : '1';
    ritaPlan();
  } else if (d.kind === 'vrid') {
    // Vinkeln från möbelns mitt till pekaren, i steg om 45°. Handtaget sitter
    // framför bänken, så pekaren rakt mot tavlan betyder ingen vridning.
    const it = r.items.find(i => i.id === d.id); if (!it) return;
    const a = Math.atan2(x - it.x, -(y - it.y)) * 180 / Math.PI;
    const ny = ((Math.round(a / 45) * 45) % 360 + 360) % 360;
    if (ny !== it.rot) { it.rot = ny; hallInne(it, r); }
    visaTips(`Vriden ${it.rot}°`);
    ritaPlan();
  } else if (d.kind === 'gruppvrid') {
    const g = gruppen();
    const a = Math.atan2(x - d.mx, -(y - d.my)) * 180 / Math.PI;
    let delta = Math.round((a - d.a0) / 45) * 45;
    g.forEach((it, i) => { it.x = d.pos0[i][0]; it.y = d.pos0[i][1]; it.rot = d.pos0[i][2]; });
    if (delta) {
      for (const it of g) {
        const [nx, ny] = rot(it.x - d.mx, it.y - d.my, delta);
        it.x = r1(d.mx + nx); it.y = r1(d.my + ny); it.rot = ((it.rot + delta) % 360 + 360) % 360;
      }
      gruppHallInne(g, r);
    }
    visaTips(`Gruppen vriden ${((delta % 360) + 360) % 360}°`);
    ritaPlan();
  } else if (d.kind === 'fonster') {
    // Den andra änden står still; fönstret får inte bli kortare än 40 cm eller gå utanför väggen.
    const v = r.vagg.find(i => i.id === d.id); if (!v) return;
    const lang = v.wall === 'n' || v.wall === 's', vagg = lang ? r.W : r.D;
    const pos = snap(lang ? x : y);
    const ande = d.sida > 0 ? clamp(pos, d.fast + FONSTER_MIN, vagg) : clamp(pos, 0, d.fast - FONSTER_MIN);
    v.len = Math.abs(ande - d.fast); v.t = (ande + d.fast) / 2;
    visaTips(`Fönstret är ${fmtM(v.len)}`);
    ritaPlan();
  } else if (d.kind === 'grupp') {
    const g = gruppen();
    let dx = snap(x - d.x0), dy = snap(y - d.y0);
    g.forEach((it, i) => { it.x = d.pos0[i][0] + dx; it.y = d.pos0[i][1] + dy; });
    gruppHallInne(g, r);
    ui.guider = null;
    if (!e.altKey) { linjera(g, r); gruppHallInne(g, r); gruppSnappa(g, r); gruppHallInne(g, r); linjera(g, r, false); }
    ritaPlan();
  } else if (d.kind === 'ram') {
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const v1 = pt.matrixTransform(svg.getScreenCTM().inverse());
    ui.ram = { x0: d.vx, y0: d.vy, x1: v1.x, y1: v1.y };
    // Allt som ramen nuddar blir markerat.
    const [ax, ay] = V(d.vx, d.vy), [bx, by] = V(v1.x, v1.y);
    const q = { x0: Math.min(ax, bx), x1: Math.max(ax, bx), y0: Math.min(ay, by), y1: Math.max(ay, by) };
    const inne = r.items.filter(it => { const b = aabb(it); return b.x1 > q.x0 && b.x0 < q.x1 && b.y1 > q.y0 && b.y0 < q.y1; }).map(i => i.id);
    const ids = [...new Set(d.behall.concat(inne))];
    ui.grupp = ids.length > 1 ? ids : []; ui.val = ids.length === 1 ? ids[0] : null;
    ritaPlan();
  } else if (d.kind === 'rumstorlek') {
    // Mät avståndet från pekaren till den motsatta väggen, som står still.
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const fast = (vx, vy) => V(vx, vy);
    // Utgå alltid från läget när dragningen började, så att bänkarna går
    // tillbaka om väggen dras ut igen under samma dragning.
    r.items.forEach((it, i) => { it.x = d.items0[i][0]; it.y = d.items0[i][1]; });
    r.vagg.forEach((v, i) => { v.t = d.vagg0[i]; });
    if (d.sx) {
      const [fx] = fast(d.sx > 0 ? 0 : r.W, 0);
      const W = clamp(snap(Math.abs(p.x - fx) - 5), MIN_W, MAX_W);
      const skift = d.sx < 0 ? W - d.W0 : 0;
      r.W = W;
      r.items.forEach(it => { it.x += skift; });
      r.vagg.forEach(v => { if (v.wall === 'n' || v.wall === 's') v.t += skift; });
    }
    if (d.sy) {
      const [, fy] = fast(0, d.sy > 0 ? 0 : r.D);
      const D = clamp(snap(Math.abs(p.y - fy) - 5), MIN_D, MAX_D);
      const skift = d.sy < 0 ? D - d.D0 : 0;
      r.D = D;
      r.items.forEach(it => { it.y += skift; });
      r.vagg.forEach(v => { if (v.wall === 'w' || v.wall === 'e') v.t += skift; });
    }
    // Väggen skjuter bänkarna framför sig, och de knuffar i sin tur bänkarna
    // de står kant i kant med. Går det inte att trycka ihop mer stannar väggen.
    if (d.sx) trangIn(r, 'x', d.sx, d);
    if (d.sy) trangIn(r, 'y', d.sy, d);
    for (const it of r.items) hallInne(it, r);
    for (const v of r.vagg) { const L = vaggLen(v), langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D; v.t = clamp(v.t, L / 2, langd - L / 2); }
    visaTips(`Salen är ${fmtM(r.W)} × ${fmtM(r.D)}`);
    ritaPlan();
  } else if (d.kind === 'storlek') {
    // Motsatt kant står still; den dragna kanten följer pekaren.
    const it = r.items.find(i => i.id === d.id); if (!it) return;
    const rv = it.rot;
    const [lx, ly] = rot(x - d.x0, y - d.y0, -rv);
    const w = d.hx ? clamp(snap(d.hx * lx + d.w0 / 2), KATEDER_MIN[0], KATEDER_MAX[0]) : d.w0;
    const h = d.hy ? clamp(snap(d.hy * ly + d.h0 / 2), KATEDER_MIN[1], KATEDER_MAX[1]) : d.h0;
    const [ox, oy] = rot(d.hx * (w - d.w0) / 2, d.hy * (h - d.h0) / 2, rv);
    it.w = w; it.h = h; it.x = r1(d.x0 + ox); it.y = r1(d.y0 + oy);
    hallInne(it, r);
    visaTips(`Katedern är ${fmtM(w)} × ${fmtM(h)}`);
    ritaPlan();
  } else if (d.kind === 'vagg') {
    const v = r.vagg.find(i => i.id === d.id); if (!v) return;
    placeraVagg(v, x, y, r);
    ritaPlan();
  } else if (d.kind === 'ny') {
    const inne = overPlan(e.clientX, e.clientY);
    spoke(null, e.clientX, e.clientY, 'mobel');
    $('spoke').style.opacity = inne ? '.95' : '.8';
  } else if (d.kind === 'seat' || d.kind === 'chip') {
    const k = klass(); const namn = visningsnamn(k).get(d.st);
    if (d.st) spoke(d.kind === 'chip' || !$('spoke') ? esc(namn ? namn.l1 : '') : null, e.clientX, e.clientY);
    let mal = null;
    if (overPlan(e.clientX, e.clientY)) { const p = platsVid(x, y); if (p && p.id !== d.fran) mal = p.id; }
    const utanEl = $('utan');
    const overUtan = utanEl && d.kind === 'seat' && (() => { const b = utanEl.getBoundingClientRect(); return e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom; })();
    if (utanEl) utanEl.classList.toggle('mal', !!overUtan);
    d.overUtan = overUtan;
    if (mal !== ui.mal || d.forstaRitning !== true) { ui.mal = mal; d.forstaRitning = true; ritaPlan(); }
  }
});
window.addEventListener('pointerup', e => {
  const d = ui.drag; if (!d) return;
  ui.drag = null;
  stage.classList.remove('greppar');
  tabortSpoke();
  const r = rum();
  if (d.kind === 'vagg' && !d.moved) {
    const v = r.vagg.find(i => i.id === d.id);
    if (v && v.typ === 'dorr') { minns(); v.spegel = !v.spegel; spara(); }
  }
  ui.guider = null;
  if (d.kind === 'skarmflytt') {
    $('korg').classList.remove('on', 'mal');
    if (!d.moved) { visaTips('Dra skärmen till en ny plats, eller till papperskorgen för att ta bort den'); ritaPlan(); return; }
    const c = cur();
    if (d.korg || d.mal) {
      angraStack.push(d.fore); if (angraStack.length > 40) angraStack.shift(); $('angraBtn').hidden = false;
      if (d.auto) c.skarmar = (c.skarmar || []).filter(sk => sk.id !== d.id);
      else r.skarmar = r.skarmar.filter(sk => sk.id !== d.id);
      if (d.mal) r.skarmar.push({ id: uid(), bord: d.mal.bord, k: d.mal.k });
      spara(); ritaPanel();
      if (d.korg) visaTips('Provskärmen är borttagen');
    }
    ritaPlan(); return;
  }
  if (d.kind === 'ram') { ui.ram = null; ritaPlan(); ritaStatus(); return; }
  if (d.kind === 'item' || d.kind === 'vagg' || d.kind === 'storlek' || d.kind === 'rumstorlek' || d.kind === 'grupp' || d.kind === 'fonster' || d.kind === 'vrid' || d.kind === 'gruppvrid') {
    if (d.moved) { angraStack.push(d.fore); if (angraStack.length > 40) angraStack.shift(); $('angraBtn').hidden = false; spara(); ritaPanel(); ritaStatus(); }
    ritaPlan();
    return;
  }
  if (d.kind === 'ny') {
    if (!d.moved) { laggTillMobel(d.typ); return; }
    if (overPlan(e.clientX, e.clientY)) { const [x, y] = varld(e.clientX, e.clientY); laggTillMobel(d.typ, x, y); }
    return;
  }
  const mal = ui.mal; ui.mal = null;
  const utanEl = $('utan'); if (utanEl) utanEl.classList.remove('mal');
  if (d.kind === 'seat') {
    if (!d.moved) { oppnaPop(d.fran); ritaPlan(); return; }
    if (mal && d.st) { minns(); flytta(d.fran, d.st, mal); }
    else if (d.overUtan && d.st) { minns(); const c = cur(); delete c.map[d.fran]; c.lasta = c.lasta.filter(s => s !== d.fran); }
    spara(); allt();
  } else if (d.kind === 'chip') {
    if (mal) { minns(); flytta(null, d.st, mal); spara(); allt(); }
    else ritaPlan();
  }
});
function flytta(fran, st, till) {
  const c = cur();
  setTimeout(() => { autoSkarmar(rum(), cur()); spara(); ritaPlan(); }, 0);
  const dar = c.map[till];
  if (fran) delete c.map[fran];
  for (const [sid, id] of Object.entries(c.map)) if (id === st) delete c.map[sid];
  if (dar && fran) c.map[fran] = dar;
  c.map[till] = st;
  c.lasta = c.lasta.filter(s => s !== fran && s !== till);
}
function laggTillMobel(typ, x, y) {
  const r = rum();
  minns();
  if (VAGGTYP[typ]) {
    const v = { id: uid(), typ, wall: 'e', t: 0 };
    if (x === undefined) { x = r.W - 1; y = r.D / 2; if (typ === 'fonster') x = 1; }
    placeraVagg(v, x, y, r);
    r.vagg.push(v); ui.val = v.id;
  } else {
    const it = { id: uid(), typ, x: 0, y: 0, rot: 0 };
    if (x === undefined) {
      const b = lokalBox(typ);
      let hittad = false;
      for (let yy = 200 - b.y0; yy + b.y1 <= r.D && !hittad; yy += 20) {
        for (let xx = 30 - b.x0; xx + b.x1 <= r.W && !hittad; xx += 20) {
          it.x = xx; it.y = yy;
          if (!r.items.some(o => krockar(o, it))) hittad = true;
        }
      }
      if (!hittad) { it.x = r.W / 2; it.y = r.D / 2; }
    } else { it.x = snap(x); it.y = snap(y); }
    it.x = snap(it.x); it.y = snap(it.y);
    hallInne(it, r);
    if (x !== undefined) { snappa(it, r); hallInne(it, r); }
    r.items.push(it); ui.val = it.id;
  }
  spara(); allt();
}

/* Verktygsraden vid den markerade möbeln */
function placeraVerktyg() {
  const v = $('verktyg');
  if (S.inst.lage === 'rum' && ui.grupp.length > 1 && !(ui.drag && ui.drag.moved)) {
    const els = ui.grupp.map(id => svg.querySelector(`[data-item="${id}"]`)).filter(Boolean);
    if (!els.length) { v.classList.remove('on'); return; }
    v.querySelectorAll('[data-v="vridV"], [data-v="vridH"], [data-v="kopia"], .delare').forEach(b => { b.style.display = ''; });
    v.querySelector('[data-v="vandDorr"]').style.display = 'none';
    v.classList.add('on');
    const hv = svg.querySelector('[data-gruppvrid]');
    const rs = els.concat(hv ? [hv] : []).map(el => el.getBoundingClientRect()), s = stage.getBoundingClientRect();
    const b = { left: Math.min(...rs.map(x => x.left)), right: Math.max(...rs.map(x => x.right)), top: Math.min(...rs.map(x => x.top)), bottom: Math.max(...rs.map(x => x.bottom)) };
    const vw = v.offsetWidth, vh = v.offsetHeight;
    let top = b.top - s.top - vh - 10;
    if (top < 62) top = b.bottom - s.top + 10;
    if (top + vh > s.height - 8) top = 62;
    v.style.left = clamp((b.left + b.right) / 2 - s.left - vw / 2, 8, s.width - vw - 8) + 'px'; v.style.top = top + 'px';
    return;
  }
  if (S.inst.lage !== 'rum' || !ui.val || (ui.drag && ui.drag.moved)) { v.classList.remove('on'); return; }
  const el = svg.querySelector(`[data-item="${ui.val}"], [data-vagg="${ui.val}"]`);
  if (!el) { v.classList.remove('on'); return; }
  const arVagg = !!el.dataset.vagg;
  const arDorr = arVagg && rum().vagg.some(x => x.id === ui.val && x.typ === 'dorr');
  v.querySelectorAll('[data-v="vridV"], [data-v="vridH"], [data-v="kopia"]').forEach(b => { b.style.display = arVagg ? 'none' : ''; });
  v.querySelector('[data-v="vandDorr"]').style.display = arDorr ? '' : 'none';
  v.querySelector('.delare').style.display = arVagg && !arDorr ? 'none' : '';
  v.classList.add('on');
  const b = el.getBoundingClientRect(), s = stage.getBoundingClientRect();
  const vw = v.offsetWidth, vh = v.offsetHeight;
  let left = b.left + b.width / 2 - s.left - vw / 2, top = b.top - s.top - vh - 10;
  if (top < 62) top = b.bottom - s.top + 10;
  left = clamp(left, 8, s.width - vw - 8);
  v.style.left = left + 'px'; v.style.top = top + 'px';
}
$('verktyg').addEventListener('click', e => {
  const b = e.target.closest('[data-v]'); if (!b) return;
  if (ui.grupp.length > 1) {
    const r = rum(), g = gruppen();
    minns();
    if (b.dataset.v === 'bort') gruppBort(g, r);
    else if (b.dataset.v === 'vridV') gruppVrid(g, r, -45);
    else if (b.dataset.v === 'vridH') gruppVrid(g, r, 45);
    else if (b.dataset.v === 'kopia') gruppKopiera(g, r);
    spara(); allt(); return;
  }
  if (!ui.val) return;
  const r = rum();
  const it = r.items.find(i => i.id === ui.val);
  minns();
  if (b.dataset.v === 'bort') {
    if (it) { r.items = r.items.filter(i => i !== it); r.blocked = r.blocked.filter(s => !s.startsWith(it.id + ':')); }
    else r.vagg = r.vagg.filter(v => v.id !== ui.val);
    ui.val = null;
  } else if (it && b.dataset.v === 'vridV') { it.rot = (it.rot + 315) % 360; hallInne(it, r); }
  else if (b.dataset.v === 'vandDorr') { const dv = r.vagg.find(x => x.id === ui.val); if (dv) dv.spegel = !dv.spegel; }
  else if (it && b.dataset.v === 'vridH') { it.rot = (it.rot + 45) % 360; hallInne(it, r); }
  else if (it && b.dataset.v === 'kopia') {
    const ny = { ...it, id: uid() };
    const bb = aabb(it), bredd = bb.x1 - bb.x0;
    ny.x = it.x + bredd; hallInne(ny, r);
    if (r.items.some(o => krockar(o, ny))) { ny.x = it.x; ny.y = it.y + (bb.y1 - bb.y0); hallInne(ny, r); }
    snappa(ny, r); hallInne(ny, r);
    r.items.push(ny); ui.val = ny.id;
    // Skärmarna följer med kopian
    for (const x of r.skarmar.filter(x => x.bord === it.id)) r.skarmar.push({ id: uid(), bord: ny.id, k: x.k });
  }
  spara(); allt();
});

/* Rutan vid en plats: lås, spärra, ta bort */
function oppnaPop(seatId) {
  const r = rum(), c = cur(), k = klass();
  const st = c.map[seatId];
  const e = st && k && k.elever.find(x => x.id === st);
  const blockerad = r.blocked.includes(seatId);
  const last = c.lasta.includes(seatId);
  const pop = $('pop');
  let h = `<div class="pop-h">${e ? 'Platsen' : 'Tom plats'}${e ? `<b>${esc(e.namn)}</b>` : ''}</div>`;
  if (e) {
    h += `<button data-p="las">${last ? IKON.oppen : IKON.las}${last ? 'Lås upp platsen' : 'Lås eleven här'}</button>`;
    h += `<button data-p="ut">${IKON.ut}Ta bort från platsen</button>`;
  }
  h += `<button data-p="sparr">${IKON.sparr}${blockerad ? 'Öppna platsen igen' : 'Spärra platsen'}</button>`;
  pop.innerHTML = h;
  pop.classList.add('on');
  ui.pop = seatId;
  const p = platser(r).find(x => x.id === seatId);
  const [vx, vy] = V(p.kx, p.ky);
  const pt = svg.createSVGPoint(); pt.x = vx; pt.y = vy;
  const sc = pt.matrixTransform(svg.getScreenCTM());
  const s = stage.getBoundingClientRect();
  let left = sc.x - s.left - pop.offsetWidth / 2, top = sc.y - s.top + 24;
  if (top + pop.offsetHeight > s.height - 8) top = sc.y - s.top - pop.offsetHeight - 24;
  pop.style.left = clamp(left, 8, s.width - pop.offsetWidth - 8) + 'px';
  pop.style.top = clamp(top, 8, s.height - pop.offsetHeight - 8) + 'px';
}
function stangPop() { $('pop').classList.remove('on'); ui.pop = null; }
$('pop').addEventListener('click', e => {
  const b = e.target.closest('[data-p]'); if (!b || !ui.pop) return;
  const sid = ui.pop, r = rum(), c = cur();
  minns();
  if (b.dataset.p === 'las') c.lasta = c.lasta.includes(sid) ? c.lasta.filter(s => s !== sid) : c.lasta.concat(sid);
  else if (b.dataset.p === 'ut') { delete c.map[sid]; c.lasta = c.lasta.filter(s => s !== sid); autoSkarmar(r, c); }
  else if (b.dataset.p === 'sparr') {
    if (r.blocked.includes(sid)) r.blocked = r.blocked.filter(s => s !== sid);
    else { r.blocked.push(sid); delete c.map[sid]; c.lasta = c.lasta.filter(s => s !== sid); }
  }
  stangPop(); spara(); allt();
});
document.addEventListener('pointerdown', e => {
  if (ui.pop && !e.target.closest('#pop') && !e.target.closest('[data-seat]')) stangPop();
});

/* ================= Panelens händelser ================= */
panel.addEventListener('pointerdown', e => {
  const kort = e.target.closest('[data-ny]');
  if (kort && e.button === 0) {
    ui.drag = { kind: 'ny', typ: kort.dataset.ny, cx: e.clientX, cy: e.clientY, moved: false };
    spoke(ikonSvg(kort.dataset.ny), -999, -999, 'mobel');
    e.preventDefault();
    return;
  }
  const chip = e.target.closest('[data-chip]');
  if (chip && e.button === 0) {
    ui.drag = { kind: 'chip', st: chip.dataset.chip, fran: null, cx: e.clientX, cy: e.clientY, moved: false };
    e.preventDefault();
  }
});
panel.addEventListener('keydown', e => {
  const kort = e.target.closest('[data-ny]');
  if (kort && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); laggTillMobel(kort.dataset.ny); }
});
panel.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act, r = rum(), k = klass();
  if (act === 'fAntal+' || act === 'fAntal-') {
    S.inst.forslagAntal = clamp(forslagAntal() + (act === 'fAntal+' ? 1 : -1), 1, 80); ui.forslagSvar = null; spara(); ritaPanel(); return;
  }
  if (act === 'fAvst+' || act === 'fAvst-') {
    const upp = act === 'fAvst+', cm = forslagCm(), bw = bankavstand();
    if (S.inst.forslagEnhet === 'm') {
      // steg om 1 dm, till närmaste hela decimeter
      const dm = upp ? Math.floor(cm / 10 + 1e-9) + 1 : Math.ceil(cm / 10 - 1e-9) - 1;
      S.inst.forslagCm = clamp(dm * 10, 0, 500);
    } else {
      // steg om ett halvt bänkavstånd, till närmaste halva
      const k = cm / bw, kn = upp ? Math.floor(k * 2 + 1e-9) / 2 + 0.5 : Math.ceil(k * 2 - 1e-9) / 2 - 0.5;
      S.inst.forslagAvst = clamp(kn, 0, 6);
    }
    ui.forslagSvar = null; spara(); ritaPanel(); return;
  }
  if (act === 'fEnhet') {
    const ny = b.dataset.v === 'm' ? 'm' : 'bank';
    if (ny !== (S.inst.forslagEnhet === 'm' ? 'm' : 'bank')) {
      const cm = forslagCm();
      if (ny === 'm') S.inst.forslagCm = Math.round(cm);
      else S.inst.forslagAvst = Math.round(cm / bankavstand() * 10) / 10;
      S.inst.forslagEnhet = ny;
    }
    ui.forslagSvar = null; spara(); ritaPanel(); return;
  }
  if (act === 'foresla') { foresla(); return; }
  if (act === 'pAntal+' || act === 'pAntal-') {
    const k = klass(), start = S.inst.forvalAntal || (k ? k.elever.filter(e => e.har).length : 0) || 30;
    S.inst.forvalAntal = clamp(start + (S.inst.forvalAntal ? (act === 'pAntal+' ? 1 : -1) : 0), 1, 200); spara(); ritaPanel(); return;
  }
  if (act === 'mattStd') { minns(); r.matt = {}; ui.forslagSvar = null; spara(); allt(); return; }
  if (act === 'enkel+' || act === 'enkel-') {
    minns();
    const nu = r.items.filter(i => i.typ === 'enkel').length;
    const res = stallAntal(r, 'enkel', nu + (act === 'enkel+' ? 1 : -1));
    ui.grupp = []; ui.val = null; spara(); allt();
    if (res.fick < res.ville) visaTips('Det finns ingen ledig yta för fler bänkar');
    return;
  }
  const dim = act.match(/^([WD])([+-])$/);
  if (dim) {
    minns();
    const steg = dim[2] === '+' ? 50 : -50;
    if (dim[1] === 'W') r.W = clamp(r.W + steg, MIN_W, MAX_W); else r.D = clamp(r.D + steg, MIN_D, MAX_D);
    for (const it of r.items) hallInne(it, r);
    for (const v of r.vagg) { const L = vaggLen(v), langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D; v.t = clamp(v.t, L / 2, langd - L / 2); }
    spara(); allt(); return;
  }
  switch (act) {
    case 'forval':
      if (r.items.some(it => it.typ !== 'kateder') && !confirm('Den färdiga möbleringen ersätter bänkarna som står i salen nu. Vill du fortsätta?')) return;
      {
        minns();
        const N = S.inst.forvalAntal || null, fick = forval(r, b.dataset.n, N);
        avmarkera(); spara(); allt();
        visaTips(N && fick < N ? `Det fick bara plats ${fick} platser med den här möbleringen` : `Möbleringen har ${fick} platser`);
      }
      break;
    case 'skarmLage': ui.skarm = !ui.skarm; ui.sparr = false; avmarkera(); allt(); break;
    case 'sparrLage': ui.sparr = !ui.sparr; ui.skarm = false; avmarkera(); allt(); break;
    case 'sparrBort': minns(); r.blocked = []; spara(); allt(); break;
    case 'skarmAlla': {
      minns(); const fore = r.skarmar.length; skarmarMellanAlla(r); ui.skarm = true; ui.sparr = false; spara(); allt();
      visaTips(r.skarmar.length - fore ? `${r.skarmar.length - fore} skärmar sattes ut` : 'Det fanns inga nya platser för skärmar');
      break;
    }
    case 'skarmBort': minns(); r.skarmar = []; spara(); allt(); break;
    case 'tomSal':
      if (!confirm('Vill du ta bort alla bänkar i salen?')) return;
      minns(); r.items = r.items.filter(it => it.typ === 'kateder'); r.blocked = []; ui.val = null; spara(); allt(); break;
    case 'rumKopia': kopieraRum(r); spara(); allt(); visaTips(`Kopian heter ${rum().namn}`); { const f = $('rumNamn'); if (f) { f.focus(); f.select(); } } break;
    case 'mobSpara': {
      const f = $('mobNamn'), namn = (f.value.trim() || `Möblering ${r.mobleringar.length + 1}`).slice(0, 40);
      if (sparaMoblering(r, namn)) { spara(); ritaPanel(); visaTips(`Möbleringen ${namn} är sparad`); }
      break;
    }
    case 'mobAnvand': {
      const m = r.mobleringar.find(x => x.id === b.dataset.id); if (!m) return;
      const sparad = r.mobleringar.some(x => mobleringNu(r) === JSON.stringify({ items: x.items, skarmar: x.skarmar, blocked: x.blocked, matt: x.matt || {} }));
      if (!sparad && r.items.some(it => it.typ !== 'kateder') && !confirm('Möbleringen som står i salen nu är inte sparad. Vill du ändå byta? (Den går att få tillbaka med Ångra.)')) return;
      anvandMoblering(r, m); spara(); allt(); visaTips(`Möbleringen ${m.namn} används`);
      break;
    }
    case 'mobBort': {
      const m = r.mobleringar.find(x => x.id === b.dataset.id); if (!m) return;
      if (!confirm(`Vill du ta bort den sparade möbleringen ${m.namn}?`)) return;
      minns(); r.mobleringar = r.mobleringar.filter(x => x !== m); spara(); ritaPanel();
      break;
    }
    case 'rumBort':
      if (S.rum.length < 2) { visaTips('Det måste finnas minst ett klassrum.'); return; }
      if (!confirm(`Vill du ta bort klassrummet ${r.namn}?`)) return;
      minns(); S.rum = S.rum.filter(x => x !== r); S.rumId = S.rum[0].id; spara(); allt(); break;
    case 'klassBort':
      if (!k || !confirm(`Vill du ta bort klassen ${k.namn} med alla elever och sparade placeringar?`)) return;
      minns(); S.klasser = S.klasser.filter(x => x !== k); S.klassId = S.klasser[0] ? S.klasser[0].id : null; spara(); allt(); break;
    case 'klassNy': nyKlassDialog(); break;
    case 'laggTill': {
      const text = $('listaIn').value;
      const nya = tolkaLista(text);
      if (!nya.length) { $('listaIn').focus(); return; }
      minns();
      const finns = new Set(k.elever.map(x => x.namn.toLowerCase()));
      let antal = 0;
      for (const n of nya) if (!finns.has(n.toLowerCase())) { k.elever.push({ id: uid(), namn: n, har: true, fram: false }); finns.add(n.toLowerCase()); antal++; }
      delete k.exempel;
      spara(); allt();
      visaTips(antal === 1 ? 'En elev lades till.' : `${antal} elever lades till.`);
      break;
    }
    case 'fram': { minns(); const el = k.elever.find(x => x.id === b.dataset.id); el.fram = !el.fram; spara(); ritaPanel(); break; }
    case 'elevBort': { minns(); k.elever = k.elever.filter(x => x.id !== b.dataset.id); k.rel = k.rel.filter(rl => rl.a !== b.dataset.id && rl.b !== b.dataset.id); spara(); allt(); break; }
    case 'allaHar': minns(); k.elever.forEach(x => { x.har = true; }); spara(); allt(); break;
    case 'allaBort':
      if (!confirm('Vill du ta bort alla elever i klassen?')) return;
      minns(); k.elever = []; k.rel = []; spara(); allt(); break;
    case 'relNy': {
      const a = $('relA').value, bb = $('relB').value, typ = $('relTyp').value;
      if (a === bb) { visaTips('Välj två olika elever.'); return; }
      if (k.rel.some(rl => parNyckel(rl.a, rl.b) === parNyckel(a, bb))) { visaTips('De två har redan ett önskemål.'); return; }
      minns(); k.rel.push({ id: uid(), a, b: bb, typ }); spara(); ritaPanel(); break;
    }
    case 'relBort': minns(); k.rel = k.rel.filter(rl => rl.id !== b.dataset.id); spara(); ritaPanel(); break;
    case 'tomma': S.inst.tomma = b.dataset.v; spara(); ritaPanel(); break;
    case 'vy': S.inst.vy = b.dataset.v; spara(); allt(); break;
    case 'namn': S.inst.namn = b.dataset.v; spara(); allt(); break;
    case 'storlek': bytNamnstorlek(+b.dataset.v); break;
    case 'sparaPlac': {
      minns();
      const c = cur();
      k.hist.unshift({ id: uid(), datum: new Date().toISOString(), rumId: r.id, rumNamn: r.namn, map: { ...c.map }, par: grannparNu() });
      k.hist = k.hist.slice(0, 8);
      spara(); ritaPanel(); visaTips('Placeringen är sparad.'); break;
    }
    case 'histVisa': {
      const h = k.hist.find(x => x.id === b.dataset.id); if (!h) return;
      minns();
      if (S.rum.some(x => x.id === h.rumId)) S.rumId = h.rumId;
      const c = cur(); c.map = { ...h.map }; c.lasta = []; c.rapport = null;
      spara(); allt(); break;
    }
    case 'histBort': minns(); k.hist = k.hist.filter(x => x.id !== b.dataset.id); spara(); ritaPanel(); break;
    case 'skrivUt': window.print(); break;
    case 'bild': exporteraBild(false); break;
    case 'kopieraBild': exporteraBild(true); break;
    case 'exportera': exporteraFil(); break;
    case 'importera': importeraFil(); break;
  }
});
panel.addEventListener('change', e => {
  const t = e.target;
  const r = rum(), k = klass();
  if (t.id === 'rumSel') {
    if (t.value === '__ny') { minns(); const nr = nyttRum('Klassrum ' + (S.rum.length + 1)); nr.items = nr.items.filter(i => i.typ === 'kateder'); S.rum.push(nr); S.rumId = nr.id; }
    else S.rumId = t.value;
    ui.val = null; spara(); allt();
    if (t.value === '__ny') { const f = $('rumNamn'); if (f) { f.focus(); f.select(); } }
  } else if (t.id === 'klassSel') {
    if (t.value === '__ny') nyKlassDialog();
    else { S.klassId = t.value; spara(); allt(); }
  } else if (t.dataset.matt) {
    const typ = t.dataset.matt, std = TYPER[typ], nu = geo({ typ });
    const i = t.dataset.dim === 'w' ? 0 : 1;
    let v = Math.round(+t.value);
    if (!v) { t.value = i ? nu.h : nu.w; return; }
    v = clamp(v, MATT_MIN[i], MATT_MAX[i]);
    minns();
    r.matt = r.matt || {};
    const m = { w: nu.w, h: nu.h }; if (i) m.h = v; else m.w = v;
    if (m.w === std.w && m.h === std.h) delete r.matt[typ]; else r.matt[typ] = m;
    for (const it of r.items) if (it.typ === typ) hallInne(it, r);
    ui.forslagSvar = null; spara(); allt();
  } else if (t.id === 'forvalAntal') {
    const v = Math.round(+t.value); S.inst.forvalAntal = v > 0 ? clamp(v, 1, 200) : null; spara(); ritaPanel();
  } else if (t.id === 'forslagAntal') {
    S.inst.forslagAntal = clamp(Math.round(+t.value) || 1, 1, 80); ui.forslagSvar = null; spara(); ritaPanel();
  } else if (t.id === 'antalEnkel') {
    minns();
    const res = stallAntal(r, 'enkel', +t.value);
    avmarkera(); spara(); allt();
    if (res.fick < res.ville) visaTips(`Det fick bara plats ${res.fick} enkelbänkar i salen`);
  } else if (t.id === 'rumNamn') { minns(); r.namn = t.value.trim() || 'Klassrum'; spara(); allt(); }
  else if (t.id === 'klassNamn') { minns(); k.namn = t.value.trim() || 'Klass'; spara(); allt(); }
  else if (t.id === 'nyaTgl') { S.inst.nya = t.checked; spara(); ritaPanel(); }
  else if (t.id === 'avstandTgl') { S.inst.avstand = t.checked; autoSkarmar(r, cur()); spara(); ritaPanel(); ritaPlan(); }
  else if (t.dataset.el) {
    const el = k.elever.find(x => x.id === t.dataset.el); if (!el) return;
    minns();
    if (t.dataset.f === 'har') el.har = t.checked;
    else if (t.dataset.f === 'namn') { const v = t.value.trim().replace(/\s+/g, ' '); if (v) el.namn = v; else t.value = el.namn; }
    spara(); allt();
  }
});
panel.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'mobNamn') { e.preventDefault(); panel.querySelector('[data-act="mobSpara"]').click(); return; }
  if (e.key === 'Enter' && (e.target.id === 'rumNamn' || e.target.id === 'klassNamn' || e.target.id === 'antalEnkel' || e.target.id === 'forslagAntal' || e.target.id === 'forvalAntal' || !!e.target.dataset.matt || e.target.classList.contains('enamn'))) e.target.blur();
});
function nyKlassDialog() {
  minns();
  const k = nyKlass('Klass ' + (S.klasser.length + 1));
  S.klasser.push(k); S.klassId = k.id;
  S.inst.lage = 'klass';
  spara(); allt();
  const f = $('klassNamn'); if (f) { f.focus(); f.select(); }
}

/* ================= Export ================= */
function filnamn(slut) {
  const k = klass(), d = new Date().toISOString().slice(0, 10);
  const bas = (k ? k.namn : 'placering').toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `placering-${bas || 'klass'}-${d}.${slut}`;
}
function ladda(blob, namn) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = namn;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function pngBlob() {
  return new Promise((res, rej) => {
    const s = planSvg({ export: true, fam: 'Arial, Helvetica, sans-serif' });
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement('canvas');
      cv.width = img.width; cv.height = img.height;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.drawImage(img, 0, 0);
      cv.toBlob(b => b ? res(b) : rej(new Error('ingen bild')), 'image/png');
    };
    img.onerror = rej;
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  });
}
async function exporteraBild(kopiera) {
  try {
    if (kopiera && navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob() })]);
      visaTips('Bilden är kopierad. Klistra in den där du vill ha den.');
      return;
    }
    ladda(await pngBlob(), filnamn('png'));
    if (kopiera) visaTips('Bilden kunde inte kopieras, så den laddades ned i stället.');
  } catch (err) {
    try { ladda(await pngBlob(), filnamn('png')); visaTips('Bilden kunde inte kopieras, så den laddades ned i stället.'); }
    catch (e2) { visaTips('Bilden kunde inte skapas i den här webbläsaren.'); }
  }
}
function exporteraFil() {
  ladda(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), `klassplacering-${new Date().toISOString().slice(0, 10)}.json`);
}
function importeraFil() {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = '.json,application/json';
  inp.onchange = () => {
    const f = inp.files[0]; if (!f) return;
    f.text().then(t => {
      const ny = JSON.parse(t);
      if (!ny || ny.v !== 1 || !Array.isArray(ny.rum) || !ny.rum.length || !Array.isArray(ny.klasser)) throw new Error('fel format');
      if (!confirm('Filen ersätter alla klassrum och klasser som finns här nu. Vill du fortsätta?')) return;
      minns(); S = normalisera(ny); ui.val = null; spara(); allt(); visaTips('Filen är inläst.');
    }).catch(() => visaTips('Filen gick inte att läsa. Välj en fil som sparats från det här verktyget.'));
  };
  inp.click();
}

/* ================= Sidhuvud, knappar och tangenter ================= */
document.querySelectorAll('.mode').forEach(b => b.addEventListener('click', () => {
  S.inst.lage = b.dataset.lage; avmarkera(); ui.skarm = ui.sparr = false; stangPop(); spara(); allt(); panel.scrollTop = 0;
}));
$('nastaBtn').addEventListener('click', () => {
  if ($('nastaBtn').dataset.till === 'verktygKlar') { ui.skarm = ui.sparr = false; allt(); return; }
  S.inst.lage = $('nastaBtn').dataset.till; ui.val = null; ui.skarm = ui.sparr = false; spara(); allt(); panel.scrollTop = 0;
});
$('goBtn').addEventListener('click', () => { if (!ui.anim) slumpa(); });
$('angraBtn').addEventListener('click', angra);
$('storlekBtn').addEventListener('click', () => bytNamnstorlek());
$('vandBtn').addEventListener('click', () => { S.inst.vy = vand() ? 'elev' : 'larare'; spara(); allt(); });
$('fsBtn').addEventListener('click', () => {
  const ar = document.fullscreenElement || document.webkitFullscreenElement;
  if (ar) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else { const f = stage.requestFullscreen || stage.webkitRequestFullscreen; if (f) f.call(stage); }
});
const fsAndrad = () => {
  const ar = !!(document.fullscreenElement || document.webkitFullscreenElement);
  $('fsBtn').innerHTML = ar
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
  $('fsBtn').title = ar ? 'Lämna helskärm' : 'Helskärm';
  setTimeout(() => ritaPlan(), 60);
};
document.addEventListener('fullscreenchange', fsAndrad);
document.addEventListener('webkitfullscreenchange', fsAndrad);

document.addEventListener('keydown', e => {
  const t = e.target;
  const iFalt = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !iFalt) { e.preventDefault(); angra(); return; }
  if (iFalt) return;
  if (e.key === 'Escape') { stangPop(); if (ui.skarm || ui.sparr) { ui.skarm = ui.sparr = false; allt(); return; } if (ui.val || ui.grupp.length) { avmarkera(); ritaPlan(); ritaStatus(); } return; }
  if (S.inst.lage !== 'rum') {
    if (e.key === ' ' && !t.closest('button')) { e.preventDefault(); if (!ui.anim) slumpa(); }
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a' && !ui.skarm && !ui.sparr) {
    e.preventDefault(); ui.val = null; ui.grupp = rum().items.map(i => i.id);
    if (ui.grupp.length === 1) { ui.val = ui.grupp[0]; ui.grupp = []; }
    ritaPlan(); ritaStatus(); return;
  }
  if (ui.grupp.length > 1) {
    const r = rum(), g = gruppen();
    const pilar = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); minns(); gruppBort(g, r); spara(); allt(); return; }
    if (pilar[e.key]) {
      e.preventDefault();
      let [dx, dy] = pilar[e.key]; if (vand()) { dx = -dx; dy = -dy; }
      const steg = e.shiftKey ? 50 : SNAP;
      gruppFlytta(g, dx * steg, dy * steg); gruppHallInne(g, r); spara(); ritaPlan(); return;
    }
    if (e.key === 'r' || e.key === 'R') { minns(); gruppVrid(g, r, e.shiftKey ? -45 : 45); spara(); allt(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); minns(); gruppKopiera(g, r); spara(); allt(); return; }
    return;
  }
  if (!ui.val) return;
  const r = rum();
  const it = r.items.find(i => i.id === ui.val), v = r.vagg.find(i => i.id === ui.val);
  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault(); minns();
    if (it) { r.items = r.items.filter(i => i !== it); r.blocked = r.blocked.filter(s => !s.startsWith(it.id + ':')); }
    if (v) r.vagg = r.vagg.filter(i => i !== v);
    ui.val = null; spara(); allt(); return;
  }
  if (!it) return;
  const pilar = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  if (pilar[e.key]) {
    e.preventDefault();
    let [dx, dy] = pilar[e.key];
    if (vand()) { dx = -dx; dy = -dy; }
    const steg = e.shiftKey ? 50 : SNAP;
    it.x += dx * steg; it.y += dy * steg; hallInne(it, r);
    spara(); ritaPlan(); return;
  }
  if (e.key === 'r' || e.key === 'R') { minns(); it.rot = (it.rot + (e.shiftKey ? 315 : 45)) % 360; hallInne(it, r); spara(); allt(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); $('verktyg').querySelector('[data-v="kopia"]').click(); }
});

function hdr() {
  const h = document.querySelector('.lab-header');
  document.documentElement.style.setProperty('--hdr', (h ? h.offsetHeight : 0) + 'px');
}
window.addEventListener('resize', () => { hdr(); placeraVerktyg(); if (ui.pop) stangPop(); });
S = normalisera(lasIn() || startlage());
hdr();
allt();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { passCache.clear(); ritaPlan(); });
})();
