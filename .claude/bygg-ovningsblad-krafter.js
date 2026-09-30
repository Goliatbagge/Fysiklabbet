// Bygger övningsbladet "Rita krafterna" (Fysik nivå 1, kapitel 3 Kraft och
// rörelse): ett genomräknat exempel i tre steg och femton situationer där
// eleven ritar alla krafter som verkar på en kropp, facit på två sidor.
//
//   node .claude/bygg-ovningsblad-krafter.js      bygger ovningsblad/ovningsblad-krafter.html
//
// PDF-versionen (A4, fyra sidor: uppgifter på två, facit på två) görs sedan
// med headless Chrome, som för de andra bladen:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=8000
//     --print-to-pdf=ovningsblad/ovningsblad-krafter.pdf http://localhost:8000/ovningsblad/ovningsblad-krafter.html
//
// Fysiken kontrolleras maskinellt för varje figur i facit, och skriptet
// avbryter om något inte stämmer:
//   1. Kraftsumman. Pilarnas längder är skalenliga, och vektorsumman ska bli
//      noll (vila, konstant hastighet) eller peka åt accelerationens håll.
//   2. Momentsumman kring tyngdpunkten ska vara noll, eftersom ingen av
//      kropparna börjar rotera. Normalkraftens angreppspunkt räknas därför
//      ut ur momentjämvikten i stället för att sättas under tyngdpunkten:
//      skjuts en låda framåt trycker golvet mest under framkanten, och då
//      hamnar normalkraften en bit framför tyngdpunkten (CLAUDE.md,
//      "Vridmomentskontroll"). Två motriktade, lika stora krafter på samma
//      verkningslinje ritas en skaftbredd isär (nudge) för läsbarhetens
//      skull; den förskjutningen räknas inte in i kontrollen.
//
// Konventionerna följer CLAUDE.md: F_G från tyngdpunkten med en prick,
// normalkraften från kontaktytan, friktionen längs ytan med svansen i
// kroppens kant, spännkraften längs snöret, pilskaft med rak ände.
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1f2530', muted: '#5b6472',
  G: '#c8324a', N: '#0d9488', f: '#c4730f', S: '#2563c9', P: '#7c3aed',
  given: '#6b7280',
  box: '#d3e4f5', boxS: '#4f7197',
  wood: '#c69a5e', woodS: '#8a6a3a', metal: '#b3b9c1', metalS: '#6b7178',
  skin: '#f0c7a3', skinS: '#b3805a',
};
const W = 240, H = 170;
const r1 = (n) => (Math.round(n * 10) / 10).toString();
const norm = (v) => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; };
const add = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const deg = (d) => { const r = d * Math.PI / 180; return [Math.cos(r), -Math.sin(r)]; };
// Alla uppgiftsfigurer har samma utsnitt, så att pilar och etiketter får
// samma skala i varje ruta. vbc(x, y) centrerar utsnittet kring (x, y).
const VBW = 184, VBH = 140;
const vbc = (x, y) => [x - VBW / 2, y - VBH / 2, VBW, VBH];
const UP = [0, -1], DOWN = [0, 1], LEFT = [-1, 0], RIGHT = [1, 0];

// ---------- ritprimitiver ----------
function head(tip, u, hl, hw, col) {
  const b = add(tip, u, -hl), p = [-u[1], u[0]];
  return `<polygon points="${r1(b[0] + p[0] * hw)},${r1(b[1] + p[1] * hw)} ${r1(tip[0])},${r1(tip[1])} ${r1(b[0] - p[0] * hw)},${r1(b[1] - p[1] * hw)}" fill="${col}"/>`;
}
function arrow(a, b, col, w = 3, hl = 9.5, hw = 5) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  hl = Math.min(hl, L * 0.55); hw = Math.min(hw, hl * 0.6);
  const u = norm(sub(b, a));
  const base = add(b, u, -hl);
  return `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(base[0])}" y2="${r1(base[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="butt"/>` + head(b, u, hl, hw, col);
}
const line = (a, b, col, w = 1.4, extra = '') =>
  `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${col}" stroke-width="${w}"${extra}/>`;
const rect = (x, y, w, h, fill = C.box, stroke = C.boxS, extra = '') =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"${extra}/>`;
// Kontaktmärkning: två element som ska nudda varandra (handen och lådan,
// lådan och golvet) får samma namn i data-k. verify-ovningsblad-kontakt.js
// mäter i den renderade figuren att de verkligen möts, utan glipa.
const K = (...namn) => ` data-k="${namn.join(' ')}"`;
// mark: ytan vid y, skraffering nedåt
function ground(y, x1, x2, k = '') {
  let s = line([x1, y], [x2, y], C.ink, 1.6, k);
  for (let x = x1 + 2; x < x2 - 4; x += 8) s += line([x + 7, y], [x, y + 7], C.ink, 0.9);
  return s;
}
// tak: ytan vid y, skraffering uppåt
function ceiling(y, x1, x2) {
  let s = line([x1, y], [x2, y], C.ink, 1.6);
  for (let x = x1 + 2; x < x2 - 4; x += 8) s += line([x, y], [x + 7, y - 7], C.ink, 0.9);
  return s;
}
// vägg: ytan vid x, skraffering åt höger
function wallR(x, y1, y2, k = '') {
  let s = line([x, y1], [x, y2], C.ink, 1.6, k);
  for (let y = y1 + 2; y < y2 - 4; y += 8) s += line([x, y + 7], [x + 7, y], C.ink, 0.9);
  return s;
}
const cmRing = (p) => `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="2.6" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`;
function sym(s, idx) {
  return `<tspan font-style="italic">${s}</tspan>` + (idx ? `<tspan font-size="9" dy="3">${idx}</tspan>` : '');
}
// hastighet eller acceleration: tunn grå pil med kursiv beteckning
function given(a, b, name, lp) {
  const u = norm(sub(b, a));
  let s = arrow(a, b, C.given, 1.6, 7, 3.4);
  const p = lp ? add(b, lp) : add(add(a, b, 1), [0, 0]);
  const q = lp ? p : [(a[0] + b[0]) / 2 - u[1] * 9, (a[1] + b[1]) / 2 + u[0] * 9 + 4];
  s += `<text x="${r1(q[0])}" y="${r1(q[1])}" font-size="12" fill="${C.given}" text-anchor="middle" font-style="italic">${name}</text>`;
  return s;
}
// ---------- kraftmodell ----------
// En kraft: { n: etikettens index, c: färg, p: angreppspunkt, d: riktning
// (enhetsvektor), L: längd i px (skalenlig), lp: [dx, dy, anchor] etikettens
// läge relativt spetsen, nudge: förskjutning vid ritning }
function F(n, c, p, d, L, lp, extra = {}) { return Object.assign({ n, c, p, d: norm(d), L, lp }, extra); }

// Flytta kraften f längs riktningen s så att momentsumman kring cm blir noll.
function balanceAlong(forces, cm, f, s) {
  s = norm(s);
  let tau = 0;
  for (const g of forces) if (g !== f) tau += cross(sub(g.p, cm), [g.d[0] * g.L, g.d[1] * g.L]);
  tau += cross(sub(f.p, cm), [f.d[0] * f.L, f.d[1] * f.L]);
  const k = cross(s, [f.d[0] * f.L, f.d[1] * f.L]);
  f.p = add(f.p, s, -tau / k);
}

function check(t, i) {
  let R = [0, 0], tau = 0, Lmax = 0;
  for (const f of t.forces) {
    const v = [f.d[0] * f.L, f.d[1] * f.L];
    R = add(R, v); tau += cross(sub(f.p, t.cm), v); Lmax = Math.max(Lmax, f.L);
  }
  const want = t.R || [0, 0];
  const eR = Math.hypot(R[0] - want[0], R[1] - want[1]);
  const eT = Math.abs(tau) / Lmax;
  const ok = eR < 0.6 && eT < 0.6;
  if (process.env.VERBOSE || !ok) {
    console.log(`${String(i).padStart(2)} ${t.cap.padEnd(34)} ΣF=(${r1(R[0])}, ${r1(R[1])}) önskat (${r1(want[0])}, ${r1(want[1])})  Στ/Lmax=${eT.toFixed(2)} px` + (ok ? '' : '   ** FEL'));
  }
  if (!ok) process.exitCode = 1;
}

// mode: 'task' | 'facit' | 'steg1' | 'steg2' | 'steg3'
function render(t, mode) {
  const Hh = t.H || H;
  let s = typeof t.body === 'function' ? t.body(mode) : (t.body || '');
  const facit = mode !== 'task';
  let show = t.forces;
  if (t.steg && t.steg[mode]) show = t.forces.filter((f) => t.steg[mode].includes(f.n));
  if (!facit) s += cmRing(t.cm);
  if (facit) {
    for (const f of show) {
      const a = add(f.p, f.nudge || [0, 0]);
      const b = add(a, f.d, f.L);
      s += arrow(a, b, f.c);
      if (f.n === 'G') s += `<circle cx="${r1(a[0])}" cy="${r1(a[1])}" r="2.6" fill="${C.G}"/>`;
      const lp = f.lp || [7, f.d[1] < -0.5 ? 6 : 3, 'start'];
      s += `<text x="${r1(b[0] + lp[0])}" y="${r1(b[1] + lp[1])}" font-size="12" fill="${f.c}" text-anchor="${lp[2]}">${sym('F', f.n)}</text>`;
    }
    // tyngdpunkten syns även när F_G inte ritas (steg 2 och 3 visar alla)
  }
  if (t.over) s += t.over(mode);
  const vb = t.vb || [0, 0, W, Hh];
  return `<svg viewBox="${vb.join(' ')}" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif">${s}</svg>`;
}

// ---------- uppgifterna ----------
const tasks = [];

// 1 Låda i vila på golvet
{
  const cm = [120, 114];
  const body = ground(132, 20, 220, K('golv')) + rect(88, 96, 64, 36, C.box, C.boxS, K('golv'));
  const forces = [
    F('G', C.G, cm, DOWN, 46, [7, 0, 'start'], { nudge: [-2.2, 0] }),
    F('N', C.N, [120, 132], UP, 46, [7, 2, 'start'], { nudge: [2.2, 0] }),
  ];
  tasks.push({ cap: 'Låda i vila', vb: vbc(120, 121), txt: 'Lådan står stilla på golvet. Rita krafterna på <b>lådan</b>.', cm, body, forces,
    note: 'Lådan är i vila, så <i>F</i><sub>N</sub> och <i>F</i><sub>G</sub> är lika långa. Normalkraften utgår från kontaktytan, tyngdkraften från tyngdpunkten.' });
}

// 2 Lampa i sladd
{
  const cm = [120, 90];
  const body = ceiling(12, 70, 170) + line([120, 12], [120, 70], C.ink, 1.6, K('sladd')) +
    `<polygon data-k="sladd" points="111,70 129,70 148,100 92,100" fill="#e8dcc6" stroke="${C.woodS}" stroke-width="1.5" stroke-linejoin="round"/>` +
    `<circle cx="120" cy="104" r="6" fill="#fbf1c9" stroke="#b59a45" stroke-width="1.2"/>`;
  const forces = [
    F('S', C.S, [120, 70], UP, 44, [7, 7, 'start']),
    F('G', C.G, cm, DOWN, 44, [7, 1, 'start']),
  ];
  tasks.push({ cap: 'Lampa i sladd', vb: vbc(120, 75), txt: 'Lampan hänger stilla i en sladd från taket. Rita krafterna på <b>lampan</b>.', cm, body, forces,
    note: 'Sladden drar uppåt med spännkraften <i>F</i><sub>S</sub>, lika stor som <i>F</i><sub>G</sub>. Spännkraften verkar där sladden är fäst och pekar längs sladden.' });
}

// 3 Boll mot vägg
{
  const cm = [150, 112], r = 20;
  const body = ground(132, 20, 176, K('golv')) + wallR(170, 30, 132, K('vagg')) +
    `<circle data-k="golv vagg" cx="${cm[0]}" cy="${cm[1]}" r="${r}" fill="#f6d8b0" stroke="#b07a3c" stroke-width="1.5"/>` +
    `<path d="M 131 106 Q 150 99 169 106 M 131 118 Q 150 125 169 118" fill="none" stroke="#b07a3c" stroke-width="1"/>`;
  const forces = [
    F('G', C.G, cm, DOWN, 48, [-7, 0, 'end'], { nudge: [-2.2, 0] }),
    F('N', C.N, [150, 132], UP, 48, [-7, 1, 'end'], { nudge: [2.2, 0] }),
  ];
  tasks.push({ cap: 'Boll intill vägg', vb: vbc(143, 114), txt: 'Bollen ligger stilla på golvet och nuddar väggen. Rita krafterna på <b>bollen</b>.', cm, body, forces,
    note: 'Väggen ger ingen kraft, eftersom inget trycker bollen mot den. Om väggen ändå sköt på bollen skulle ingen annan kraft ta ut den, och bollen skulle börja röra sig. Kontakt betyder inte alltid kraft.' });
}

// 4 Puck på is
{
  const cm = [120, 123];
  const body = `<rect x="14" y="128" width="212" height="12" fill="#e4f0f9"/>` + line([14, 128], [226, 128], '#7aa0c0', 1.6, K('is')) +
    `<rect data-k="is" x="102" y="118" width="36" height="10" rx="2" fill="#3a4048" stroke="#1f2328" stroke-width="1"/>`;
  const forces = [
    F('G', C.G, cm, DOWN, 40, [7, 0, 'start'], { nudge: [-2.2, 0] }),
    F('N', C.N, [120, 128], UP, 40, [7, 2, 'start'], { nudge: [2.2, 0] }),
  ];
  const over = () => given([142, 116], [184, 116], 'v', [4, -6]);
  tasks.push({ cap: 'Puck på is', vb: vbc(141, 124), txt: 'Pucken glider åt höger med konstant hastighet. Friktionen är försumbar. Rita krafterna på <b>pucken</b>.', cm, body, forces, over,
    note: 'Ingen kraft framåt! Pucken behöver ingen kraft för att fortsätta glida (Newtons första lag). Krafterna tar ut varandra.' });
}

// 5 Kastad boll
{
  const x0 = 120, y0 = 38, g = 112 / (84 * 84), yb = 150;
  const yf = (x) => y0 + g * (x - x0) * (x - x0);
  let pts = [];
  for (let x = 36; x <= 204; x += 2) pts.push(`${r1(x)},${r1(yf(x))}`);
  const bx = 76, by = yf(bx), cm = [bx, by];
  const u = norm([1, 2 * g * (bx - x0)]);
  const body = ground(yb, 28, 212) +
    `<polyline points="${pts.join(' ')}" fill="none" stroke="${C.given}" stroke-width="1.1" stroke-dasharray="3 4"/>` +
    `<circle cx="${r1(bx)}" cy="${r1(by)}" r="7" fill="#f6d8b0" stroke="#b07a3c" stroke-width="1.5"/>`;
  const forces = [F('G', C.G, cm, DOWN, 40, [7, 0, 'start'])];
  const over = () => given(add(cm, u, 9), add(cm, u, 40), 'v', [5, 2]);
  tasks.push({ cap: 'Kastad boll', vb: vbc(120, 92), txt: 'Bollen har lämnat handen och är på väg uppåt. Rita krafterna på <b>bollen</b>.', cm, body, forces, over,
    R: [0, 40],
    note: 'Bara tyngdkraften verkar. Kraften från handen finns inte kvar när bollen har lämnat den, och ingen kraft behövs för att bollen ska fortsätta uppåt.' });
}

// 6 Låda som skjuts
{
  const cm = [132, 114];
  // Handen ritas i egna koordinater med fingertopparnas framsida vid x = 97
  // och flyttas så att den ligger an mot lådans vänstra sida (boxX).
  const boxX = 100, handX = 97;
  const hand = `<g transform="translate(${boxX - handX} 0)">` +
    `<path d="M 36 100 L 58 100 L 58 118 L 36 118 Z" fill="#8fb0cf" stroke="${C.boxS}" stroke-width="1.4" stroke-linejoin="round"/>` +
    `<path d="M 58 102 L 86 102 Q 90 102 90 106 L 90 114 Q 90 117 86 117 L 58 117 Z" fill="${C.skin}" stroke="${C.skinS}" stroke-width="1.3" stroke-linejoin="round"/>` +
    `<path data-k="hand" d="M 90 117 L 90 92 Q 90 88 93.5 88 Q 97 88 97 92 L 97 118 Q 97 121 93.5 121 L 88 121 Q 85 121 86 117 Z" fill="${C.skin}" stroke="${C.skinS}" stroke-width="1.3" stroke-linejoin="round"/>` +
    `<path d="M 72 102 Q 76 95 84 96 Q 88 97 87 101" fill="${C.skin}" stroke="${C.skinS}" stroke-width="1.3" stroke-linejoin="round"/>` + '</g>';
  const body = ground(132, 14, 226, K('golv')) + rect(boxX, 96, 64, 36, C.box, C.boxS, K('golv', 'hand')) + hand;
  const forces = [
    F('G', C.G, cm, DOWN, 44, [7, 0, 'start']),
    F('N', C.N, [132, 132], UP, 44, [7, 2, 'start']),
    F('putt', C.P, [100, 108], RIGHT, 20, [-22, -26, 'end']),
    F('f', C.f, [100, 132], LEFT, 20, [0, 22, 'middle']),
  ];
  balanceAlong(forces, cm, forces[1], RIGHT);
  tasks.push({ cap: 'Låda som skjuts', vb: vbc(109, 122), txt: 'Handen skjuter lådan åt höger med konstant hastighet. Rita krafterna på <b>lådan</b>.', cm, body, forces,
    note: 'Konstant hastighet: <i>F</i><sub>putt</sub> är lika lång som friktionen <i>F</i><sub>f</sub>, och <i>F</i><sub>N</sub> som <i>F</i><sub>G</sub>. Friktionen pekar mot rörelsen.' });
}

// 7 Snöre drar uppåt, lådan står kvar
{
  const cm = [120, 116];
  const body = ground(132, 20, 220, K('golv')) + line([120, 100], [120, 8], C.ink, 1.6, K('snore')) + rect(98, 100, 44, 32, C.box, C.boxS, K('golv', 'snore'));
  const forces = [
    F('G', C.G, cm, DOWN, 48, [7, 0, 'start'], { nudge: [2.2, 0] }),
    F('N', C.N, [120, 132], UP, 18, [-5, 5, 'end'], { nudge: [-2.2, 0] }),
    F('S', C.S, [120, 100], UP, 30, [7, 7, 'start']),
  ];
  tasks.push({ cap: 'Lyft som inte räcker', vb: vbc(116, 105), txt: 'Snöret drar rakt uppåt, men lådan står kvar på golvet. Rita krafterna på <b>lådan</b>.', cm, body, forces,
    note: '<i>F</i><sub>N</sub> är mindre än <i>F</i><sub>G</sub>: snöret bär en del av tyngden. <i>F</i><sub>N</sub> + <i>F</i><sub>S</sub> = <i>F</i><sub>G</sub>.' });
}

// 8 Låda som bromsas
{
  const cm = [120, 116];
  const body = ground(132, 14, 226, K('golv')) + rect(88, 100, 64, 32, C.box, C.boxS, K('golv'));
  const forces = [
    F('G', C.G, cm, DOWN, 46, [-7, 0, 'end']),
    F('N', C.N, [120, 132], UP, 46, [7, 2, 'start']),
    F('f', C.f, [88, 132], LEFT, 18, [-3, -5, 'end']),
  ];
  balanceAlong(forces, cm, forces[1], RIGHT);
  const over = () => given([154, 110], [192, 110], 'v', [2, -7]);
  tasks.push({ cap: 'Låda som bromsas', vb: vbc(130, 123), txt: 'Lådan har fått en knuff och glider åt höger. Farten minskar. Rita krafterna på <b>lådan</b>.', cm, body, forces, over,
    R: [-18, 0],
    note: 'Ingen kraft framåt: knuffen är över. Friktionen är den resulterande kraften och pekar bakåt, därför minskar farten.' });
}

// 9 Pulka med snett rep
{
  const cm = [114, 116], a = 30;
  const u = deg(a);
  const A = add([114, 132], u, 46 / Math.cos(a * Math.PI / 180)); // repet pekar mot punkten under tyngdpunkten
  const body = `<rect x="14" y="132" width="212" height="8" fill="#eef3f8"/>` + line([14, 132], [226, 132], '#7aa0c0', 1.6, K('sno')) +
    `<path data-k="sno rep" d="M 80 132 L 146 132 Q 158 132 161 ${r1(A[1] + 3)} L 163 ${r1(A[1] - 1)} L 156 ${r1(A[1] - 1)} Q 152 120 144 120 L 84 120 Q 76 120 76 126 Q 76 132 80 132 Z" fill="#d85b4a" stroke="#9c3a2d" stroke-width="1.4" stroke-linejoin="round"/>` +
    `<rect x="88" y="100" width="46" height="21" rx="6" fill="#8fae7a" stroke="#5d7a4b" stroke-width="1.4"/>` +
    line(A, add(A, u, 80), C.ink, 1.5, K('rep'));
  const forces = [
    F('G', C.G, cm, DOWN, 50, [7, 0, 'start'], { nudge: [2.2, 0] }),
    F('N', C.N, [114, 132], UP, 50 - 28 * Math.sin(a * Math.PI / 180), [-9, -1, 'end'], { nudge: [-2.2, 0] }),
    F('S', C.S, A, u, 28, [2, -8, 'start']),
    F('f', C.f, [80, 132], LEFT, 28 * Math.cos(a * Math.PI / 180), [-3, -5, 'end']),
  ];
  tasks.push({ cap: 'Pulka med snett rep', vb: vbc(127, 120), txt: 'Pulkan dras åt höger med konstant hastighet. Repet lutar snett uppåt. Rita krafterna på <b>pulkan med packningen</b>.', cm, body, forces,
    note: 'Repet lyfter lite, så <i>F</i><sub>N</sub> blir mindre än <i>F</i><sub>G</sub>. Friktionen är lika stor som den vågräta komposanten av <i>F</i><sub>S</sub>.' });
}

// 10 Två lådor, rita på den undre
{
  const cm = [120, 116];
  const upper = (m) => rect(81, 74, 22, 26, '#c9d8e8', C.boxS, K('lador') + (m === 'task' ? '' : ' opacity="0.35" stroke-dasharray="3 2"'));
  const body = (m) => ground(132, 20, 220, K('golv')) + rect(80, 100, 80, 32, C.box, C.boxS, K('golv', 'lador')) + upper(m);
  const forces = [
    F('G', C.G, cm, DOWN, 36, [7, 0, 'start']),
    F('N2', C.N, [92, 100], DOWN, 20, [-16, -2, 'end']),
    F('N1', C.N, [120, 132], UP, 56, [7, 8, 'start']),
  ];
  balanceAlong(forces, cm, forces[2], RIGHT);
  tasks.push({ cap: 'Två lådor', vb: vbc(116, 113), txt: 'En liten tung låda står på en större. Rita krafterna på <b>den undre lådan</b>.', cm, body, forces,
    note: '<i>F</i><sub>N2</sub> är kraften från den övre lådan. Den är lika stor som den övre lådans tyngd men är ingen tyngdkraft. Golvet bär båda: <i>F</i><sub>N1</sub> = <i>F</i><sub>G</sub> + <i>F</i><sub>N2</sub>.' });
}

// 11 Låda i hiss som accelererar uppåt
{
  const cm = [120, 120];
  const body = line([120, 26], [120, 40], C.ink, 1.6, K('vajer')) +
    `<rect data-k="vajer" x="66" y="40" width="108" height="100" fill="#f4f0e7" stroke="${C.ink}" stroke-width="1.6"/>` +
    `<rect data-k="golv" x="66" y="136" width="108" height="4" fill="${C.ink}"/>` + rect(98, 104, 44, 32, C.box, C.boxS, K('golv'));
  const forces = [
    F('G', C.G, cm, DOWN, 40, [7, 0, 'start'], { nudge: [-2.2, 0] }),
    F('N', C.N, [120, 136], UP, 52, [7, 2, 'start'], { nudge: [2.2, 0] }),
  ];
  const over = () => given([194, 112], [194, 72], 'a', [8, 20]);
  tasks.push({ cap: 'Hiss som startar uppåt', vb: vbc(137, 96), txt: 'Hissen och lådan ökar farten uppåt. Rita krafterna på <b>lådan</b>.', cm, body, forces, over,
    R: [0, -12],
    note: 'Accelerationen är uppåt, så den resulterande kraften pekar uppåt: <i>F</i><sub>N</sub> är längre än <i>F</i><sub>G</sub>.' });
}

// 12 Kloss i vila på lutande plan
{
  const a = 30, ar = a * Math.PI / 180;
  const P0 = [40, 150], u = deg(a), n = [-Math.sin(ar), -Math.cos(ar)];
  const B = add(P0, u, 96);
  const cm = add(B, n, 14);
  const c1 = add(B, u, -22), c2 = add(B, u, 22), c3 = add(c2, n, 28), c4 = add(c1, n, 28);
  const top = add(P0, u, 160 / Math.cos(ar));
  let arc = '';
  { const R = 30, e = add(P0, u, R); arc = `<path d="M ${P0[0] + R} ${P0[1]} A ${R} ${R} 0 0 0 ${r1(e[0])} ${r1(e[1])}" fill="none" stroke="${C.ink}" stroke-width="1.1"/>` +
    `<text x="${P0[0] + R + 5}" y="${P0[1] - 4}" font-size="11" fill="${C.ink}">30°</text>`; }
  const body = `<polygon points="${P0[0]},${P0[1]} ${r1(top[0])},${P0[1]} ${r1(top[0])},${r1(top[1])}" fill="rgba(15,22,32,0.05)" stroke="rgba(15,22,32,0.5)" stroke-width="1.4" stroke-linejoin="round"/>` + arc +
    `<polygon points="${[c1, c2, c3, c4].map((p) => r1(p[0]) + ',' + r1(p[1])).join(' ')}" fill="${C.box}" stroke="${C.boxS}" stroke-width="1.5" stroke-linejoin="round"/>`;
  const Q = [cm[0], P0[1] - (cm[0] - P0[0]) * Math.tan(ar)]; // punkten på ytan rakt under tyngdpunkten
  const FG = 46;
  const forces = [
    F('G', C.G, cm, DOWN, FG, [7, 0, 'start']),
    F('N', C.N, Q, n, FG * Math.cos(ar), [-5, 2, 'end']),
    F('f', C.f, c2, u, FG * Math.sin(ar), [0, -10, 'end']),
  ];
  tasks.push({ cap: 'Kloss på lutande plan', vb: vbc(120, 102), txt: 'Klossen ligger stilla på ett plan som lutar 30°. Rita krafterna på <b>klossen</b>.', cm, body, forces,
    note: 'Normalkraften är vinkelrät mot planet, inte lodrät. Friktionen pekar uppför planet och hindrar klossen från att glida ned.' });
}

// 13 Tavla i två snören
{
  const cm = [120, 92], nail = [120, 22];
  const L1 = [68, 62], L2 = [172, 62];
  const d1 = norm(sub(nail, L1)), d2 = norm(sub(nail, L2));
  const FG = 44, FS = FG / (2 * -d1[1]);
  const body = `<circle cx="120" cy="22" r="2.4" fill="${C.ink}"/>` + line(L1, nail, C.ink, 1.4, K('snore1')) + line(L2, nail, C.ink, 1.4, K('snore2')) +
    `<rect data-k="snore1 snore2" x="66" y="62" width="108" height="60" fill="${C.wood}" stroke="${C.woodS}" stroke-width="1.5"/>` +
    `<rect x="73" y="69" width="94" height="46" fill="#f7f2e8" stroke="${C.woodS}" stroke-width="1"/>`;
  const forces = [
    F('G', C.G, cm, DOWN, FG, [7, 0, 'start']),
    F('S1', C.S, L1, d1, FS, [-4, -6, 'end']),
    F('S2', C.S, L2, d2, FS, [4, -6, 'start']),
  ];
  tasks.push({ cap: 'Tavla i två snören', vb: vbc(120, 80), txt: 'Tavlan hänger stilla i två snören från en spik. Rita krafterna på <b>tavlan</b>.', cm, body, forces,
    note: 'Spännkrafterna pekar längs snörena. Var för sig är de mindre än <i>F</i><sub>G</sub>, men tillsammans tar deras lodräta delar ut tyngdkraften.' });
}

// 14 Fallskärmshoppare
{
  const cm = [120, 104];
  const body =
    `<path d="M 70 50 Q 72 28 120 26 Q 168 28 170 50 Q 157.5 44 145 50 Q 132.5 44 120 50 Q 107.5 44 95 50 Q 82.5 44 70 50 Z" fill="#f4c7a6" stroke="#b86a3c" stroke-width="1.5" stroke-linejoin="round"/>` +
    line([71, 50], [116, 90], C.muted, 0.9) + line([95, 50], [116, 90], C.muted, 0.9) +
    line([145, 50], [124, 90], C.muted, 0.9) + line([169, 50], [124, 90], C.muted, 0.9) +
    `<path d="M 120 91 L 120 108 M 120 108 L 110 127 M 120 108 L 130 127" stroke="#3d5d80" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `<path d="M 117 92 L 116 90 M 123 92 L 124 90" stroke="#3d5d80" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="120" cy="85" r="4.5" fill="${C.skin}" stroke="${C.skinS}" stroke-width="1.2"/>`;
  const forces = [
    F('G', C.G, cm, DOWN, 32, [7, 0, 'start']),
    F('luft', C.P, [120, 50], UP, 32, [7, 2, 'start']),
  ];
  tasks.push({ cap: 'Fallskärmshoppare', vb: vbc(120, 78), txt: 'Hopparen faller med konstant hastighet. Rita krafterna på <b>hoppare och skärm tillsammans</b>.', cm, body, forces,
    note: 'Konstant hastighet nedåt: luftmotståndet <i>F</i><sub>luft</sub> är lika stort som <i>F</i><sub>G</sub>. Det verkar främst på skärmen.' });
}

// 15 Låda på lastbilsflak som accelererar
{
  const cm = [115, 103];
  const wheel = (x) => `<circle data-k="vag" cx="${x}" cy="135" r="11" fill="#2f343b"/><circle cx="${x}" cy="135" r="4" fill="${C.metal}"/>`;
  const body = line([56, 146], [240, 146], C.ink, 1.4, K('vag')) +
    `<rect x="78" y="124" width="122" height="6" fill="#5c636c"/>` +
    `<rect data-k="flak" x="76" y="116" width="122" height="8" fill="${C.metal}" stroke="${C.metalS}" stroke-width="1.3"/>` +
    `<path d="M 198 124 L 198 84 L 218 84 L 230 104 L 230 124 Z" fill="#d85b4a" stroke="#9c3a2d" stroke-width="1.4" stroke-linejoin="round"/>` +
    `<path d="M 204 90 L 216 90 L 224 103 L 204 103 Z" fill="#dfeaf3" stroke="#9c3a2d" stroke-width="1"/>` +
    wheel(100) + wheel(178) + rect(92, 90, 46, 26, C.box, C.boxS, K('flak'));
  const forces = [
    F('G', C.G, cm, DOWN, 46, [7, 10, 'start']),
    F('N', C.N, [115, 116], UP, 46, [-7, 8, 'end']),
    F('f', C.f, [138, 116], RIGHT, 18.4, [4, -5, 'start']),
  ];
  balanceAlong(forces, cm, forces[1], RIGHT);
  const over = () => given([150, 64], [188, 64], 'a', [4, -6]);
  tasks.push({ cap: 'Låda på lastbilsflak', vb: vbc(148, 106), txt: 'Lastbilen ökar farten åt höger. Lådan glider inte på flaket. Rita krafterna på <b>lådan</b>.', cm, body, forces, over,
    R: [18.4, 0],
    note: 'Friktionen pekar framåt! Den är den enda kraften som kan ge lådan acceleration framåt. Utan friktion skulle flaket glida iväg under lådan.' });
}

// ---------- exemplet ----------
const ex = (() => {
  const cm = [102, 114];
  const body = ground(132, 14, 226, K('golv')) + rect(70, 96, 64, 36, C.box, C.boxS, K('golv', 'snore')) + line([134, 124], [230, 124], C.ink, 1.5, K('snore'));
  const forces = [
    F('G', C.G, cm, DOWN, 44, [7, 0, 'start']),
    F('N', C.N, [102, 132], UP, 44, [7, 2, 'start']),
    F('S', C.S, [134, 124], RIGHT, 22, [2, -7, 'middle']),
    F('f', C.f, [70, 132], LEFT, 22, [-3, -5, 'end']),
  ];
  balanceAlong(forces, cm, forces[1], RIGHT);
  return {
    cap: 'Exempel', cm, body, forces, H: 170, vb: [28, 72, 184, 96],
    steg: { steg1: ['G'], steg2: ['G', 'N', 'f'], steg3: ['G', 'N', 'f', 'S'] },
    over: (m) => given([150, 92], [186, 92], 'v', [4, -6]) + (m === 'steg1' ? '' : ''),
  };
})();

// ---------- kontroll ----------
tasks.forEach((t, i) => check(t, i + 1));
check(ex, 0);
if (process.exitCode) { console.error('Kraft- eller momentsumman stämmer inte i figurerna ovan.'); process.exit(1); }

// ---------- HTML ----------
const cell = (t, i, mode) => `<div class="cell"><div class="ch"><span class="num">${i + 1}</span><span class="cap">${t.cap}</span></div>` +
  (mode === 'task' ? `<div class="txt">${t.txt}</div>` : '') + render(t, mode) +
  (mode === 'facit' && t.note ? `<div class="note">${t.note}</div>` : '') + '</div>';

const legend = [['G', 'tyngdkraft'], ['N', 'normalkraft'], ['f', 'friktionskraft'], ['S', 'spännkraft'], ['P', 'övriga krafter (handen, luften)']]
  .map(([k, t]) => `<span class="lg"><span class="sw" style="background:${C[k]}"></span>${t}</span>`).join('');

const head_ = (title, sub) => `<div class="top">
    <div><div class="kicker">Fysik nivå 1 · Kraft och rörelse</div><h1>${title}</h1></div>
    ${sub}
  </div>`;

const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: Rita krafterna — Fysiklabbet</title>
<meta name="description" content="Övningsblad i kraft och rörelse (Fysik nivå 1): rita alla krafter som verkar på en kropp i femton situationer, med rätt angreppspunkter och skalenliga längder. Genomräknat exempel och facit med förklaringar. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/ovningsblad-krafter.html">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; }
html { color-scheme: light; }
html, body { margin: 0; padding: 0; background: #fff; }
body { font-family: Poppins, system-ui, sans-serif; color: ${C.ink}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { max-width: 210mm; margin: 0 auto; padding: 20px 16px 28px; }
.page + .page { border-top: 2px dashed #c8cdd4; }
.top { display: flex; flex-wrap: wrap; gap: 8px 16px; justify-content: space-between; align-items: flex-end; border-bottom: 1.4pt solid ${C.ink}; padding-bottom: 2mm; }
.kicker { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: ${C.muted}; font-weight: 600; }
h1 { font-size: 21pt; margin: 0; line-height: 1.1; font-weight: 700; }
.namn { font-size: 10pt; color: ${C.muted}; }
.namn span { display: inline-block; width: 58mm; border-bottom: .8pt solid #8a929e; margin-left: 2mm; }
.def { margin-top: 3mm; border-left: 3pt solid ${C.N}; background: #eef6f5; padding: 2mm 3.5mm; font-size: 9pt; line-height: 1.42; }
.def b { font-weight: 600; }
.def ul { margin: .8mm 0 0; padding-left: 4.5mm; }
.def li { margin: .3mm 0; }
h2 { font-size: 11pt; margin: 3mm 0 1.6mm; font-weight: 600; }
h2 small { font-weight: 400; color: ${C.muted}; font-size: 8.8pt; margin-left: 2mm; }
.steg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.steg .panel { border: .6pt solid #c8cdd4; border-radius: 2mm; padding: 1.2mm 1.6mm 1.6mm; }
.steg .sh { font-size: 8.4pt; font-weight: 600; color: ${C.N}; text-transform: uppercase; letter-spacing: .08em; }
.steg svg { width: 100%; height: auto; display: block; }
.steg p { margin: .4mm 0 0; font-size: 8.2pt; line-height: 1.35; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.6mm 4mm; }
.cell { border: .6pt solid #c8cdd4; border-radius: 2mm; padding: 1mm 1.6mm 1.2mm; display: flex; flex-direction: column; }
.ch { display: flex; align-items: baseline; gap: 2mm; }
.num { font-weight: 700; font-size: 10pt; }
.cap { font-size: 8.6pt; font-weight: 600; }
.txt { font-size: 8.2pt; line-height: 1.3; color: #3c4450; margin-top: .3mm; min-height: 2.6em; }
.txt b { font-weight: 600; }
.cell svg { width: 100%; height: auto; display: block; }
.note { font-size: 7.8pt; line-height: 1.32; color: #3c4450; margin-top: .4mm; }
.legend { display: flex; flex-wrap: wrap; gap: 1.2mm 4.5mm; font-size: 8.4pt; margin-top: 2mm; }
.lg { display: inline-flex; align-items: center; gap: 1.6mm; }
.sw { display: inline-block; width: 6mm; height: 1.1mm; border-radius: .5mm; }
.foot { font-size: 7.5pt; color: #8a929e; display: flex; justify-content: space-between; margin-top: 2mm; }
.facit .grid { margin-top: 3mm; }
i { font-style: italic; }
sub { font-size: .75em; line-height: 0; }
/* Smal skärm: färre figurer per rad, så att etiketterna blir läsbara. */
@media screen and (max-width: 640px) {
  .steg { grid-template-columns: 1fr; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .steg p, .cap, .txt { font-size: 10pt; }
  .def, .note { font-size: 10.5pt; }
}
@media screen and (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
/* Utskrift: exakt fyra A4-sidor, uppgifterna på de två första och facit
   på de två sista. Rutnätet fyller resten av sidan och figurerna krymps in
   i sina rutor. */
@page { size: A4; margin: 0; }
@media print {
  .page { width: 210mm; height: 297mm; max-width: none; margin: 0; padding: 10mm 12mm 8mm; display: flex; flex-direction: column; page-break-after: always; overflow: hidden; }
  .page + .page { border-top: 0; }
  .page:last-child { page-break-after: auto; }
  .grid { flex: 1; min-height: 0; }
  .grid.r2 { grid-template-rows: repeat(2, minmax(0, 1fr)); }
  .grid.r3 { grid-template-rows: repeat(3, minmax(0, 1fr)); }
  .cell { min-height: 0; }
  .cell svg { flex: 1; min-height: 0; }
}
</style>
</head>
<body>
<section class="page">
  ${head_('Rita krafterna', '<div class="namn">Namn:<span></span></div>')}
  <div class="def"><b>Så ritar du krafterna på en kropp.</b> Rita varje kraft som en pil från sin <b>angreppspunkt</b>. Pilens längd visar hur stor kraften är, så lika stora krafter ritas lika långa.
    <ul>
      <li><b>Tyngdkraften</b> <i>F</i><sub>G</sub> pekar rakt nedåt från tyngdpunkten (den lilla ringen i figurerna).</li>
      <li>Alla andra krafter kommer från något som <b>rör</b> kroppen: ett underlag ger <b>normalkraft</b> <i>F</i><sub>N</sub> vinkelrätt ut från ytan och ofta <b>friktion</b> <i>F</i><sub>f</sub> längs ytan, ett snöre ger <b>spännkraft</b> <i>F</i><sub>S</sub> längs snöret.</li>
      <li>Det finns ingen kraft som ”håller igång” en rörelse. Är kroppen i vila eller rör den sig med konstant hastighet tar krafterna ut varandra. Ändras hastigheten pekar den resulterande kraften åt accelerationens håll.</li>
    </ul>
  </div>
  <h2>Exempel: lådan dras åt höger med konstant hastighet. Rita krafterna på lådan.</h2>
  <div class="steg">
    <div class="panel"><div class="sh">Steg 1</div>${render(ex, 'steg1')}<p>Rita tyngdkraften <i>F</i><sub>G</sub> från tyngdpunkten, rakt nedåt.</p></div>
    <div class="panel"><div class="sh">Steg 2</div>${render(ex, 'steg2')}<p>Gå runt kroppen och leta kontakter. Golvet ger normalkraften <i>F</i><sub>N</sub> från kontaktytan och friktionen <i>F</i><sub>f</sub> längs ytan, mot rörelsen.</p></div>
    <div class="panel"><div class="sh">Steg 3</div>${render(ex, 'steg3')}<p>Snöret ger <i>F</i><sub>S</sub> längs snöret. Konstant hastighet betyder att krafterna tar ut varandra: <i>F</i><sub>N</sub> = <i>F</i><sub>G</sub> och <i>F</i><sub>f</sub> = <i>F</i><sub>S</sub>.</p></div>
  </div>
  <h2>Uppgifter <small>Rita alla krafter som verkar på kroppen som står i fetstil, och skriv ut beteckningarna. Grå pilar visar hastigheten <i>v</i> eller accelerationen <i>a</i>. De är inga krafter.</small></h2>
  <div class="grid r2">${tasks.slice(0, 6).map((t, i) => cell(t, i, 'task')).join('')}</div>
  <div class="foot"><span>Bortse från luftmotståndet om inget annat sägs.</span><span>fysiklabbet.se</span></div>
</section>
<section class="page">
  ${head_('Rita krafterna', '<div class="namn">Namn:<span></span></div>')}
  <div class="grid r3">${tasks.slice(6).map((t, i) => cell(t, i + 6, 'task')).join('')}</div>
  <div class="foot"><span>Bortse från luftmotståndet om inget annat sägs.</span><span>fysiklabbet.se</span></div>
</section>
<section class="page facit">
  ${head_('Facit: Rita krafterna', '')}
  <div class="legend">${legend}</div>
  <div class="grid r3">${tasks.slice(0, 9).map((t, i) => cell(t, i, 'facit')).join('')}</div>
  <div class="foot"><span>Lika långa pilar betyder lika stora krafter.</span><span>fysiklabbet.se</span></div>
</section>
<section class="page facit">
  ${head_('Facit: Rita krafterna', '')}
  <div class="grid r2">${tasks.slice(9).map((t, i) => cell(t, i + 9, 'facit')).join('')}</div>
  <div class="foot"><span>Lika långa pilar betyder lika stora krafter.</span><span>fysiklabbet.se</span></div>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;

const OUT = path.join(__dirname, '..', 'ovningsblad', 'ovningsblad-krafter.html');
fs.writeFileSync(OUT, html);
console.log('skrev', path.relative(path.join(__dirname, '..'), OUT));
