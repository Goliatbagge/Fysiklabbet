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
  for (const r of st.rum) { r.skarmar = r.skarmar || []; r.blocked = r.blocked || []; r.vagg = r.vagg || []; }
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
const ui = { val: null, drag: null, mal: null, anim: null, pop: null, senaste: null, skarm: false, sparr: false };

/* ================= Geometri ================= */
const lokalBoxCache = {};
// Möblernas mått. Katedern kan dras större eller mindre och har då egna w och h.
const KATEDER_MIN = [80, 50], KATEDER_MAX = [400, 220];
function geo(it) {
  const t = TYPER[it.typ];
  if (it.typ !== 'kateder' || !(it.w || it.h)) return t;
  const w = it.w || t.w, h = it.h || t.h;
  return { ...t, w, h, larare: [0, -h / 2 - 22] };
}
function lokalBox(x) {
  const it = typeof x === 'string' ? { typ: x } : x;
  const egen = it.typ === 'kateder' && (it.w || it.h);
  if (!egen && lokalBoxCache[it.typ]) return lokalBoxCache[it.typ];
  const t = geo(it);
  let x0 = -t.w / 2, x1 = t.w / 2, y0 = -t.h / 2, y1 = t.h / 2;
  const stolar = t.seats.slice(); if (t.larare) stolar.push(t.larare);
  for (const [sx, sy] of stolar) {
    x0 = Math.min(x0, sx - STOL_B / 2); x1 = Math.max(x1, sx + STOL_B / 2);
    y0 = Math.min(y0, sy - STOL_D / 2); y1 = Math.max(y1, sy + STOL_D / 2);
  }
  const box = { x0, x1, y0, y1 };
  if (!egen) lokalBoxCache[it.typ] = box;
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
      out.push({ id: it.id + ':' + i, item: it.id, x: it.x + dx, y: it.y + dy, kx: it.x + kx, ky: it.y + ky, kort: t.kort });
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
function skarmSvg(g) {
  const L = Math.hypot(g.x2 - g.x1, g.y2 - g.y1) || 1, ux = (g.x2 - g.x1) / L, uy = (g.y2 - g.y1) / L, kant = 3;
  const a = [r1(g.x1 + ux * kant), r1(g.y1 + uy * kant)], b = [r1(g.x2 - ux * kant), r1(g.y2 - uy * kant)];
  return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${FARG.skarm}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${FARG.skarmLjus}" stroke-width="1.6" stroke-linecap="round"/>`;
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
const FORVAL = {
  par: { namn: 'Rader med parbänkar', bes: 'Klassisk möblering, två och två', gor: r => rutnat(r, 'par', 60, 140, 230) },
  enkel: { namn: 'Enskilda bänkar', bes: 'En och en, till exempel vid prov', gor: r => rutnat(r, 'enkel', 50, 115, 230) },
  grupp4: { namn: 'Grupper om fyra', bes: 'Gruppbord för samarbete', gor: r => rutnat(r, 'grupp4', 90, 230, 240) },
  hastsko: { namn: 'Hästsko', bes: 'Bänkarna i en U-form mot tavlan', gor: hastsko },
  trio: { namn: 'Labbsal', bes: 'Långa labbänkar för tre', gor: r => rutnat(r, 'trio', 70, 150, 230) },
};
function forval(r, namn) {
  r.items = r.items.filter(it => it.typ === 'kateder').concat(FORVAL[namn].gor(r));
  r.blocked = [];
}

/* ================= Namn ================= */
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
function vaggRekt(v, r) {
  const L = VAGGTYP[v.typ].len, a = v.t - L / 2, b = v.t + L / 2;
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
  const L = VAGGTYP[v.typ].len;
  const [x0, y0, x1, y1] = vaggRekt(v, r);
  const [x, y, w, h] = vyRekt(x0, y0, x1, y1);
  let s = `<g data-vagg="${v.id}">`;
  if (v.typ === 'fonster') {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${FARG.glas}" stroke="${FARG.vagg}" stroke-width="1.4"/>`;
    const lodr = w < h;
    s += lodr ? `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${FARG.vagg}" stroke-width="1"/>`
      : `<line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${FARG.vagg}" stroke-width="1"/>`;
  } else {
    // Gångjärnet i ena änden, dörrbladet öppet in i salen och en streckad svängbåge.
    let hx, hy, lx, ly, jx, jy;
    const a = v.t - L / 2;
    if (v.wall === 'n') { hx = a; hy = 0; lx = a; ly = L; jx = a + L; jy = 0; }
    else if (v.wall === 's') { hx = a; hy = r.D; lx = a; ly = r.D - L; jx = a + L; jy = r.D; }
    else if (v.wall === 'w') { hx = 0; hy = a; lx = L; ly = a; jx = 0; jy = a + L; }
    else { hx = r.W; hy = a; lx = r.W - L; ly = a; jx = r.W; jy = a + L; }
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
    for (const g of lagen) if (egna.has(g.k)) s += skarmSvg(g);
    if (skarmLage) {
      const ordning = lagen.filter(g => g.k[0] === 's' || g.k === 'mitt').concat(lagen.filter(g => !(g.k[0] === 's' || g.k === 'mitt')));
      for (const g of ordning) {
        const inre = g.k[0] === 's' || g.k === 'mitt';
        const L = Math.hypot(g.x2 - g.x1, g.y2 - g.y1) || 1, ux = (g.x2 - g.x1) / L * (inre ? 10 : 0), uy = (g.y2 - g.y1) / L * (inre ? 10 : 0);
        s += `<g data-kand="${it.id}|${g.k}"><line x1="${r1(g.x1 + ux)}" y1="${r1(g.y1 + uy)}" x2="${r1(g.x2 - ux)}" y2="${r1(g.y2 - uy)}" stroke="transparent" stroke-width="${inre ? 14 : 18}"/>` +
          (egna.has(g.k) ? '' : `<line class="kand" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}" stroke="${FARG.accent}" stroke-opacity=".5" stroke-width="2.2" stroke-dasharray="5 4"/>`) + '</g>';
      }
    }
    if (!exp && lage === 'rum' && !verktygLage && (ui.val === it.id || krock.has(it.id))) {
      const b = lokalBox(it);
      const farg = krock.has(it.id) ? FARG.accent : FARG.blue;
      s += `<rect x="${b.x0 - 6}" y="${b.y0 - 6}" width="${b.x1 - b.x0 + 12}" height="${b.y1 - b.y0 + 12}" rx="8" fill="none" stroke="${farg}" stroke-width="2" stroke-dasharray="${krock.has(it.id) ? '0' : '6 4'}"/>`;
    }
    // Spärrläget: varje stol går att klicka på
    if (sparrLage) {
      geo(it).seats.forEach(([sx, sy], i) => {
        const sparrad = bl.has(i);
        s += `<rect data-sparr="${it.id}:${i}" x="${sx - STOL_B / 2 - 5}" y="${sy - STOL_D / 2 - 5}" width="${STOL_B + 10}" height="${STOL_D + 10}" rx="11" fill="${sparrad ? FARG.accent : 'transparent'}" fill-opacity="${sparrad ? 0.1 : 0}" stroke="${FARG.accent}" stroke-opacity="${sparrad ? 0.9 : 0.45}" stroke-width="1.8" stroke-dasharray="${sparrad ? '0' : '4 3'}" style="cursor:pointer"/>`;
      });
    }
    // Handtag för att ändra katederns storlek
    if (!exp && lage === 'rum' && !verktygLage && ui.val === it.id && it.typ === 'kateder') {
      const t = geo(it);
      for (const [hx, hy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
        const vinkel = ((rv + Math.atan2(hy, hx) * 180 / Math.PI) % 180 + 180) % 180;
        const cur = ['ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize'][Math.round(vinkel / 45) % 4];
        s += `<circle data-handtag="${hx},${hy}" cx="${hx * t.w / 2}" cy="${hy * t.h / 2}" r="${hx && hy ? 6 : 7.5}" fill="#ffffff" stroke="${FARG.blue}" stroke-width="2.2" style="cursor:${cur}"/>`;
      }
    }
    s += '</g>';
    if (it.typ === 'kateder') {
      const t = geo(it);
      s += `<text x="${r1(vx)}" y="${r1(vy) + 5}" text-anchor="middle" font-size="${t.w >= 120 ? 14 : 11}" font-weight="600" fill="${FARG.bankKant}" pointer-events="none">Kateder</text>`;
    }
  }
  // Namnkorten
  if (visaNamn) {
    const anim = ui.anim, pool = anim ? anim.pool : null;
    const drag = ui.drag && ui.drag.kind !== 'item' && ui.drag.kind !== 'vagg' && ui.drag.moved ? ui.drag : null;
    for (const p of pl) {
      const [vx, vy] = V(p.kx, p.ky);
      const stId = c.map[p.id];
      const har = stId && elevIds.has(stId);
      const mal = !exp && ui.mal === p.id;
      const w = p.kort - 2, h = S.inst.namn === 'hela' ? 38 : 29;
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
        const a = passa(label.l1, w - 7, 15, fam), b = passa(label.l2 || '', w - 7, 12, fam);
        s += `<text y="-2" text-anchor="middle" font-size="${a.fs}" font-weight="600" fill="${farg}">${esc(a.s)}</text>`;
        if (b.s) s += `<text y="${13}" text-anchor="middle" font-size="${b.fs}" font-weight="500" fill="${FARG.soft}">${esc(b.s)}</text>`;
      } else {
        const a = passa(label.l1, w - 7, 17, fam);
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
function valjare(lista, valdId, prefix) {
  return `<div class="valj"><select id="${prefix}Sel" aria-label="Välj">${lista.map(x => `<option value="${x.id}"${x.id === valdId ? ' selected' : ''}>${esc(x.namn)}</option>`).join('')}<option value="__ny">${prefix === 'rum' ? 'Nytt klassrum …' : 'Ny klass …'}</option></select>` +
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
    <p class="note">Du kan också dra i en vägg eller ett hörn av salen.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Möbler</span><span class="count"><b>${pl.length - r.blocked.length}</b> platser</span></div>
    <div class="palett">${PALETT.map(t => {
      const typ = TYPER[t] || VAGGTYP[t];
      const n = TYPER[t] ? TYPER[t].seats.length : 0;
      const under = TYPER[t] ? (n ? n + (n === 1 ? ' plats' : ' platser') : 'Lärarens bord') : 'På väggen';
      return `<div class="mobelkort" data-ny="${t}" role="button" tabindex="0" aria-label="Lägg till ${esc(typ.namn)}">${ikonSvg(t)}<b>${esc(typ.namn)}</b><small>${under}</small></div>`;
    }).join('')}</div>
    <p class="note">Klicka för att ställa ut en möbel eller dra in den i salen. Släpps en bänk på en annan snäpper de ihop kant i kant (håll ned Alt för att placera fritt). Markera en möbel för att vrida, kopiera eller ta bort den. Katedern blir större eller mindre när du drar i handtagen på dess kanter.</p>
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
    <p class="note">Skärmar kan stå i bänkarnas kanter och i mitten av par- och labbänkar. Klicka på en streckad linje för att sätta ut en skärm och på skärmen igen för att ta bort den. Skärmarna följer med när bänken flyttas.</p>
  </div>
  <div class="grp">
    <div class="grp-h"><span class="eyebrow">Färdiga möbleringar</span></div>
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
    ${k.hist.length ? `<div class="hist">${k.hist.map(h => `<div class="histrad"><span><b>${esc(new Date(h.datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }))}</b> · ${esc(h.rumNamn)}</span><button class="btn liten" data-act="histVisa" data-id="${h.id}">Visa</button><button class="x" data-act="histBort" data-id="${h.id}" aria-label="Ta bort">${IKON.x}</button></div>`).join('')}</div>` : ''}
  </div>`;
}

/* ================= Slumpningen ================= */
// Direkt bredvid: sida vid sida vid samma bänk eller vid två bänkar som står tätt.
// Elever mitt emot varandra vid ett gruppbord räknas inte, inte heller rader framför och bakom.
const BREDVID = 85;
const bredvid = (a, b) => Math.hypot(a.x - b.x, a.y - b.y) < BREDVID;
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
  const L = VAGGTYP[v.typ].len, langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D;
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
    const hEl = e.target.closest('[data-handtag]'), itEl = e.target.closest('[data-item]'), vEl = e.target.closest('[data-vagg]');
    if (hEl && itEl) {
      const it = r.items.find(i => i.id === itEl.dataset.item), t = geo(it);
      const [hx, hy] = hEl.dataset.handtag.split(',').map(Number);
      ui.drag = { kind: 'storlek', id: it.id, hx, hy, x0: it.x, y0: it.y, w0: t.w, h0: t.h, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
      e.preventDefault();
      return;
    }
    if (itEl) {
      const it = r.items.find(i => i.id === itEl.dataset.item);
      ui.val = it.id;
      ui.drag = { kind: 'item', id: it.id, dx: it.x - x, dy: it.y - y, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
    } else if (vEl) {
      ui.val = vEl.dataset.vagg;
      ui.drag = { kind: 'vagg', id: vEl.dataset.vagg, cx: e.clientX, cy: e.clientY, moved: false, fore: JSON.stringify(S) };
    } else ui.val = null;
    ritaPlan();
    e.preventDefault();
    return;
  }
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
    if (!e.altKey) { snappa(it, r); hallInne(it, r); }
    ritaPlan();
  } else if (d.kind === 'rumstorlek') {
    // Mät avståndet från pekaren till den motsatta väggen, som står still.
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const fast = (vx, vy) => V(vx, vy);
    if (d.sx) {
      const [fx] = fast(d.sx > 0 ? 0 : r.W, 0);
      const W = clamp(snap(Math.abs(p.x - fx) - 5), MIN_W, MAX_W);
      const skift = d.sx < 0 ? W - d.W0 : 0;
      r.W = W;
      r.items.forEach((it, i) => { it.x = d.items0[i][0] + skift; });
      r.vagg.forEach((v, i) => { if (v.wall === 'n' || v.wall === 's') v.t = d.vagg0[i] + skift; });
    }
    if (d.sy) {
      const [, fy] = fast(0, d.sy > 0 ? 0 : r.D);
      const D = clamp(snap(Math.abs(p.y - fy) - 5), MIN_D, MAX_D);
      const skift = d.sy < 0 ? D - d.D0 : 0;
      r.D = D;
      r.items.forEach((it, i) => { it.y = d.items0[i][1] + skift; });
      r.vagg.forEach((v, i) => { if (v.wall === 'w' || v.wall === 'e') v.t = d.vagg0[i] + skift; });
    }
    for (const it of r.items) hallInne(it, r);
    for (const v of r.vagg) { const L = VAGGTYP[v.typ].len, langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D; v.t = clamp(v.t, L / 2, langd - L / 2); }
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
  if (d.kind === 'item' || d.kind === 'vagg' || d.kind === 'storlek' || d.kind === 'rumstorlek') {
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
  if (S.inst.lage !== 'rum' || !ui.val || (ui.drag && ui.drag.moved)) { v.classList.remove('on'); return; }
  const el = svg.querySelector(`[data-item="${ui.val}"], [data-vagg="${ui.val}"]`);
  if (!el) { v.classList.remove('on'); return; }
  const arVagg = !!el.dataset.vagg;
  v.querySelectorAll('[data-v="vridV"], [data-v="vridH"], [data-v="kopia"], .delare').forEach(b => { b.style.display = arVagg ? 'none' : ''; });
  v.classList.add('on');
  const b = el.getBoundingClientRect(), s = stage.getBoundingClientRect();
  const vw = v.offsetWidth, vh = v.offsetHeight;
  let left = b.left + b.width / 2 - s.left - vw / 2, top = b.top - s.top - vh - 10;
  if (top < 62) top = b.bottom - s.top + 10;
  left = clamp(left, 8, s.width - vw - 8);
  v.style.left = left + 'px'; v.style.top = top + 'px';
}
$('verktyg').addEventListener('click', e => {
  const b = e.target.closest('[data-v]'); if (!b || !ui.val) return;
  const r = rum();
  const it = r.items.find(i => i.id === ui.val);
  minns();
  if (b.dataset.v === 'bort') {
    if (it) { r.items = r.items.filter(i => i !== it); r.blocked = r.blocked.filter(s => !s.startsWith(it.id + ':')); }
    else r.vagg = r.vagg.filter(v => v.id !== ui.val);
    ui.val = null;
  } else if (it && b.dataset.v === 'vridV') { it.rot = (it.rot + 315) % 360; hallInne(it, r); }
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
  const dim = act.match(/^([WD])([+-])$/);
  if (dim) {
    minns();
    const steg = dim[2] === '+' ? 50 : -50;
    if (dim[1] === 'W') r.W = clamp(r.W + steg, MIN_W, MAX_W); else r.D = clamp(r.D + steg, MIN_D, MAX_D);
    for (const it of r.items) hallInne(it, r);
    for (const v of r.vagg) { const L = VAGGTYP[v.typ].len, langd = (v.wall === 'n' || v.wall === 's') ? r.W : r.D; v.t = clamp(v.t, L / 2, langd - L / 2); }
    spara(); allt(); return;
  }
  switch (act) {
    case 'forval':
      if (r.items.some(it => it.typ !== 'kateder') && !confirm('Den färdiga möbleringen ersätter bänkarna som står i salen nu. Vill du fortsätta?')) return;
      minns(); forval(r, b.dataset.n); ui.val = null; spara(); allt(); break;
    case 'skarmLage': ui.skarm = !ui.skarm; ui.sparr = false; ui.val = null; allt(); break;
    case 'sparrLage': ui.sparr = !ui.sparr; ui.skarm = false; ui.val = null; allt(); break;
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
  if (e.key === 'Enter' && (e.target.id === 'rumNamn' || e.target.id === 'klassNamn' || e.target.classList.contains('enamn'))) e.target.blur();
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
  S.inst.lage = b.dataset.lage; ui.val = null; ui.skarm = ui.sparr = false; stangPop(); spara(); allt(); panel.scrollTop = 0;
}));
$('nastaBtn').addEventListener('click', () => {
  if ($('nastaBtn').dataset.till === 'verktygKlar') { ui.skarm = ui.sparr = false; allt(); return; }
  S.inst.lage = $('nastaBtn').dataset.till; ui.val = null; ui.skarm = ui.sparr = false; spara(); allt(); panel.scrollTop = 0;
});
$('goBtn').addEventListener('click', () => { if (!ui.anim) slumpa(); });
$('angraBtn').addEventListener('click', angra);
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
  if (e.key === 'Escape') { stangPop(); if (ui.skarm || ui.sparr) { ui.skarm = ui.sparr = false; allt(); return; } if (ui.val) { ui.val = null; ritaPlan(); } return; }
  if (S.inst.lage !== 'rum') {
    if (e.key === ' ' && !t.closest('button')) { e.preventDefault(); if (!ui.anim) slumpa(); }
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
