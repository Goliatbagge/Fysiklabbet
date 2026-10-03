// Bygger övningsbladet "Rita hävarmen" (Fysik nivå 1, avsnitt fy1-3.11, delat med fy2-1.1
// Kraftmoment): ett genomräknat exempel i tre steg och tolv figurer där
// eleven ritar in hävarmen, facit på baksidan. Fotpunkterna, de räta
// vinklarna och hävarmarna i facit räknas ut ur figurernas koordinater.
//
//   node .claude/bygg-ovningsblad-havarm.js      bygger ovningsblad/ovningsblad-havarm.html
//
// PDF-versionen (A4, två sidor: uppgifter fram, facit bak) görs sedan med
// headless Chrome, som för de andra bladen:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=8000
//     --print-to-pdf=ovningsblad/ovningsblad-havarm.pdf http://localhost:8000/ovningsblad/ovningsblad-havarm.html
//
// Bladet registreras i data/ovningsblad.js under 'fy2-1.1'.
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1f2530', force: '#2563c9', arm: '#0d9488', pivot: '#d13b2e',
  metal: '#b3b9c1', metalS: '#6b7178', dark: '#4a5058',
  wood: '#c69a5e', woodS: '#8a6a3a', light: '#d9dde2',
};
const W = 240, H = 150;
const r1 = (n) => (Math.round(n * 10) / 10).toString();
const norm = (x, y) => { const l = Math.hypot(x, y); return [x / l, y / l]; };
const deg = (d) => { const r = d * Math.PI / 180; return [Math.cos(r), -Math.sin(r)]; };
const add = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

// ---------- ritprimitiver ----------
function head(tip, u, hl, hw, col) {
  const b = add(tip, u, -hl), p = [-u[1], u[0]];
  return `<polygon points="${r1(b[0] + p[0] * hw)},${r1(b[1] + p[1] * hw)} ${r1(tip[0])},${r1(tip[1])} ${r1(b[0] - p[0] * hw)},${r1(b[1] - p[1] * hw)}" fill="${col}"/>`;
}
function arrow(a, b, col, w = 2.8, hl = 11, hw = 5.5) {
  const u = norm(b[0] - a[0], b[1] - a[1]);
  const base = add(b, u, -hl);
  return `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(base[0])}" y2="${r1(base[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="butt"/>` + head(b, u, hl, hw, col);
}
function dbl(a, b, col, w = 2.2, hl = 9, hw = 4.3) {
  const u = norm(b[0] - a[0], b[1] - a[1]);
  const s = add(a, u, hl), e = add(b, u, -hl);
  return `<line x1="${r1(s[0])}" y1="${r1(s[1])}" x2="${r1(e[0])}" y2="${r1(e[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="butt"/>` +
    head(b, u, hl, hw, col) + head(a, [-u[0], -u[1]], hl, hw, col);
}
function rod(a, b, w, fill, stroke) {
  return `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${stroke}" stroke-width="${w + 2.6}" stroke-linecap="round"/>` +
    `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
}
// vägg: ytan vid x, skraffering åt vänster
function wallL(x, y1, y2) {
  let s = `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.ink}" stroke-width="1.6"/>`;
  for (let y = y1 + 2; y < y2 - 2; y += 8) s += `<line x1="${x}" y1="${y}" x2="${x - 7}" y2="${y + 7}" stroke="${C.ink}" stroke-width="0.9"/>`;
  return s;
}
// mark: ytan vid y, skraffering nedåt
function ground(y, x1, x2) {
  let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.ink}" stroke-width="1.6"/>`;
  for (let x = x1 + 2; x < x2 - 4; x += 8) s += `<line x1="${x + 7}" y1="${y}" x2="${x}" y2="${y + 7}" stroke="${C.ink}" stroke-width="0.9"/>`;
  return s;
}
const pivotDot = (P) => `<circle cx="${r1(P[0])}" cy="${r1(P[1])}" r="4" fill="${C.pivot}"/>`;
function sym(s, idx, extra = '') {
  return `<tspan font-style="italic">${s}</tspan>` + (idx ? `<tspan font-size="10" dy="3">${idx}</tspan>${extra ? `<tspan dy="-3">${extra}</tspan>` : ''}` : extra);
}

// Liang–Barsky: klipp linjen A + t·u, t ∈ [t0, t1], mot rutan
function clip(A, u, t0, t1, m = 3) {
  const p = [-u[0], u[0], -u[1], u[1]];
  const q = [A[0] - m, W - m - A[0], A[1] - m, (clip.H || H) - m - A[1]];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(p[i]) < 1e-9) { if (q[i] < 0) return null; continue; }
    const r = q[i] / p[i];
    if (p[i] < 0) t0 = Math.max(t0, r); else t1 = Math.min(t1, r);
  }
  return t0 < t1 ? [t0, t1] : null;
}

function geom(t) {
  const u = t.u.length === 2 ? t.u : null;
  const tF = dot(sub(t.P, t.A), u);
  const F = add(t.A, u, tF);
  const l = Math.hypot(t.P[0] - F[0], t.P[1] - F[1]);
  return { u, tF, F, l };
}

// mode: 'task' | 'facit' | 'steg1' | 'steg2' | 'steg3'
function render(t, mode) {
  const { u, tF, F, l } = geom(t);
  const tip = add(t.A, u, t.L);
  const showLine = mode === 'facit' || mode === 'steg2' || mode === 'steg3';
  const showArm = mode === 'facit' || mode === 'steg3';
  let s = t.body || '';
  if (showLine) {
    const lo = Math.min(tF, 0, t.L), hi = Math.max(tF, 0, t.L);
    clip.H = t.H || H;
    const c = clip(t.A, u, lo - (t.extLo ?? 18), hi + (t.extHi ?? 18));
    const a = add(t.A, u, c[0]), b = add(t.A, u, c[1]);
    s += `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${C.force}" stroke-width="1.4" stroke-dasharray="7 4.5" opacity="0.8"/>`;
  }
  if (showArm && l > 1) {
    s += dbl(t.P, F, C.arm);
    const d1 = Math.abs(tF) < 1 ? u : (tF > 0 ? [-u[0], -u[1]] : u);
    const d2 = norm(t.P[0] - F[0], t.P[1] - F[1]);
    const q = 7;
    const a = add(F, d1, q), b = add(a, d2, q), c = add(F, d2, q);
    s += `<polyline points="${r1(a[0])},${r1(a[1])} ${r1(b[0])},${r1(b[1])} ${r1(c[0])},${r1(c[1])}" fill="none" stroke="${C.ink}" stroke-width="1.1"/>`;
  }
  s += arrow(t.A, tip, C.force);
  s += pivotDot(t.P);
  // kraftens etikett vid spetsen
  let lp = t.fLbl;
  if (!lp) {
    let n = [-u[1], u[0]];
    if (dot(n, sub(t.A, t.P)) < 0) n = [-n[0], -n[1]];
    if (Math.abs(dot(n, sub(t.A, t.P))) < 1) n = [Math.abs(n[0]), n[1] * Math.sign(n[0] || 1)];
    const p = add(add(tip, u, -6), n, 9);
    const anchor = n[0] > 0.35 ? 'start' : n[0] < -0.35 ? 'end' : 'middle';
    const dy = n[1] > 0.5 ? 11 : n[1] < -0.5 ? -1 : 5;
    lp = [p[0], p[1] + dy, anchor];
  }
  s += `<text x="${r1(lp[0])}" y="${r1(lp[1])}" font-size="14" fill="${C.force}" text-anchor="${lp[2]}">${sym('F', t.idx)}</text>`;
  if (showArm) {
    if (l > 1) {
      const side = t.armSide ?? (tF >= 0 ? 1 : -1);
      const m = [(t.P[0] + F[0]) / 2, (t.P[1] + F[1]) / 2];
      let p = t.armLbl || add(m, u, side * 13);
      const lbl = mode === 'steg3' ? `Hävarm ${sym('l', t.idx)}` : sym('l', t.idx);
      s += `<text x="${r1(p[0])}" y="${r1(p[1] + 5)}" font-size="14" fill="${C.arm}" text-anchor="${p[2] || 'middle'}">${lbl}</text>`;
    } else {
      const p = t.armLbl;
      s += `<text x="${r1(p[0])}" y="${r1(p[1])}" font-size="14" fill="${C.arm}" text-anchor="${p[2] || 'middle'}">${sym('l', t.idx, ' = 0')}</text>`;
    }
  }
  if (t.extra) s += t.extra(mode, { u, tF, F, l, tip });
  return `<svg viewBox="0 0 ${W} ${t.H || H}" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif">${s}</svg>`;
}

// ---------- uppgifterna ----------
const tasks = [];

// 1 Punkt och kraft (förläng förbi spetsen)
tasks.push({ cap: 'Punkt och kraft', P: [55, 40], A: [150, 70], u: deg(200), L: 40 });

// 2 Kranbom, lodrät kraft i spetsen
{
  const P = [44, 116], E = [196, 36];
  const body = ground(138, 8, 232) +
    `<rect x="32" y="24" width="12" height="114" fill="${C.metal}" stroke="${C.metalS}" stroke-width="1.3"/>` +
    rod(P, E, 6, C.metal, C.metalS);
  tasks.push({ cap: 'Kranbom', P, A: E, u: [0, 1], L: 40, body, extLo: 10, note: 'Kraften är lodrät, så hävarmen blir vågrät.' });
}

// 3 Stång fäst i vägg, kraft snett uppåt
{
  const P = [30, 56], E = [200, 56];
  const body = wallL(22, 16, 100) +
    `<rect x="22" y="49" width="10" height="14" fill="${C.metal}" stroke="${C.metalS}" stroke-width="1.2"/>` +
    rod(P, E, 8, C.wood, C.woodS);
  tasks.push({ cap: 'Stång fäst i vägg', P, A: [196, 56], u: deg(60), L: 36, body });
}

// 4 Nyckel på mutter
{
  const P = [55, 96], d = norm(0.906, -0.423);
  const E = add(P, d, 150);
  let hex = '';
  for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; hex += `${r1(P[0] + 10 * Math.cos(a))},${r1(P[1] + 10 * Math.sin(a))} `; }
  const body = rod(P, E, 11, C.metal, C.metalS) +
    `<circle cx="${P[0]}" cy="${P[1]}" r="19" fill="${C.metal}" stroke="${C.metalS}" stroke-width="1.3"/>` +
    `<polygon points="${hex}" fill="#969ea7" stroke="#666c74" stroke-width="1.2"/>`;
  tasks.push({ cap: 'Nyckel på mutter', P, A: add(P, d, 139), u: deg(-100), L: 38, body, note: 'Riktningslinjen förlängs förbi pilspetsen.' });
}

// 5 Gungbräda, någon drar snett uppåt i ena änden
{
  const P = [120, 100];
  const body = ground(132, 8, 232) +
    `<polygon points="120,100 105,132 135,132" fill="#9aa0a6" stroke="${C.metalS}" stroke-width="1.3" stroke-linejoin="round"/>` +
    rod([30, 96], [210, 96], 8, C.wood, C.woodS);
  tasks.push({ cap: 'Gungbräda', P, A: [205, 96], u: deg(135), L: 32, body });
}

// 6 Cykelvev
{
  const P = [80, 70], A = [160, 70];
  const body = `<circle cx="80" cy="70" r="26" fill="${C.light}" stroke="${C.metalS}" stroke-width="1.3"/>` +
    `<circle cx="80" cy="70" r="15" fill="none" stroke="${C.metalS}" stroke-width="1"/>` +
    rod(P, [156, 70], 7, C.dark, '#2b2f36') +
    `<rect x="151" y="66" width="18" height="8" rx="2" fill="#2b2f36"/>`;
  tasks.push({ cap: 'Cykelvev', P, A, u: deg(-60), L: 36, body });
}

// 7 Dörr sedd ovanifrån
{
  const P = [60, 40], d = norm(Math.cos(35 * Math.PI / 180), Math.sin(35 * Math.PI / 180));
  const body = `<rect x="4" y="35" width="52" height="10" fill="${C.light}" stroke="${C.metalS}" stroke-width="1.2"/>` +
    `<rect x="190" y="35" width="46" height="10" fill="${C.light}" stroke="${C.metalS}" stroke-width="1.2"/>` +
    rod(P, add(P, d, 130), 5, '#e2c89a', C.woodS);
  tasks.push({ cap: 'Dörr sedd ovanifrån', P, A: add(P, d, 120), u: deg(20), L: 36, body });
}

// 8 Stång med lina
{
  const P = [30, 110], A = [196, 110], K = [22, 28];
  const u = norm(K[0] - A[0], K[1] - A[1]);
  const body = wallL(22, 14, 128) +
    `<rect x="22" y="103" width="10" height="14" fill="${C.metal}" stroke="${C.metalS}" stroke-width="1.2"/>` +
    rod(P, [200, 110], 8, C.wood, C.woodS) +
    `<line x1="${K[0]}" y1="${K[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${C.ink}" stroke-width="1.4"/>`;
  tasks.push({ cap: 'Stång med lina', P, A, u, L: 42, idx: 'S', body, armSide: -1, fLbl: [150, 79, 'middle'], extLo: 10, extHi: 30,
    note: 'Linan ligger längs kraftens riktningslinje.' });
}

// 9 Hjul med snöre
{
  const P = [78, 82], R = 47, u = deg(-15);
  const n = [u[1], -u[0]]; // uppåt, vinkelrät mot u
  const T = add(P, n, R);
  const A = add(T, u, 55);
  const aT = Math.atan2(n[1], n[0]);
  const a2 = aT - 1.9; // snöret lindat moturs bakåt över hjulet
  const p2 = [P[0] + R * Math.cos(a2), P[1] + R * Math.sin(a2)];
  const body = `<circle cx="${P[0]}" cy="${P[1]}" r="44.5" fill="none" stroke="${C.metalS}" stroke-width="5"/>` +
    `<circle cx="${P[0]}" cy="${P[1]}" r="9" fill="${C.light}" stroke="${C.metalS}" stroke-width="1.3"/>` +
    `<path d="M ${r1(p2[0])} ${r1(p2[1])} A ${R} ${R} 0 0 1 ${r1(T[0])} ${r1(T[1])} L ${r1(A[0])} ${r1(A[1])}" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
  tasks.push({ cap: 'Hjul med snöre', P, A, u, L: 38, body, note: 'Hävarmen är lika lång som hjulets radie.' });
}

// 10 Spett på sten
{
  const P = [72, 106], d = norm(0.832, -0.555);
  const body = ground(132, 8, 232) +
    `<path d="M56,132 C52,116 60,105 72,104 C84,104 92,116 88,132 Z" fill="#8a8f96" stroke="#5f646b" stroke-width="1.3" stroke-linejoin="round"/>` +
    rod(add(P, d, -30), add(P, d, 140), 5, '#2b2f36', '#2b2f36');
  tasks.push({ cap: 'Spett på sten', P, A: add(P, d, 136), u: deg(190), L: 38, body });
}

// 11 Punkt och kraft (förläng bakåt)
{
  const P = [170, 40], u = deg(160);
  const n = [-u[1], u[0]];
  let F = add(P, n, 60); if (F[1] < P[1]) F = add(P, n, -60);
  tasks.push({ cap: 'Punkt och kraft', P, A: add(F, u, 50), u, L: 38,
    note: 'Riktningslinjen förlängs bakåt, förbi kraftens startpunkt.' });
}

// 12 Stång i led, kraften drar längs stången
{
  const P = [50, 116], E = [175, 38];
  const d = norm(E[0] - P[0], E[1] - P[1]);
  const body = ground(132, 8, 232) +
    `<polygon points="50,116 40,132 60,132" fill="#9aa0a6" stroke="${C.metalS}" stroke-width="1.2" stroke-linejoin="round"/>` +
    rod(P, E, 7, C.wood, C.woodS);
  tasks.push({ cap: 'Stång i led', P, A: add(E, d, -4), u: d, L: 38, body, extLo: 150, armLbl: [96, 124, 'start'],
    note: 'Riktningslinjen går genom vridningspunkten. Hävarmen är noll och kraften ger inget moment.' });
}

// ---------- kontroll ----------
tasks.forEach((t, i) => {
  const g = geom(t);
  const tip = add(t.A, g.u, t.L);
  const bad = (p) => p[0] < 8 || p[0] > W - 8 || p[1] < 8 || p[1] > H - 8;
  if (process.env.VERBOSE) console.log(`${i + 1} ${t.cap.padEnd(20)} l=${r1(g.l).padStart(6)} tF=${r1(g.tF).padStart(7)} fot=(${r1(g.F[0])},${r1(g.F[1])}) spets=(${r1(tip[0])},${r1(tip[1])})` +
    (bad(g.F) ? '  ** FOT UTANFÖR' : '') + (bad(tip) ? '  ** SPETS UTANFÖR' : ''));
});

// ---------- exemplet ----------
const ex = (() => {
  const P = [45, 28], u = deg(30), n = deg(-60);
  const F = add(P, n, 70);
  const A = add(F, u, 50);
  return {
    H: 112, P, A, u, L: 40, extLo: 20, extHi: 16, armLbl: [74, 42, 'start'],
    extra: (mode) => {
      let s = `<text x="12" y="16" font-size="12" fill="${C.ink}">Vridningspunkt</text>`;
      if (mode !== 'steg1') s += `<text x="150" y="90" font-size="12" fill="${C.force}" text-anchor="middle">Kraftens<tspan x="150" dy="13">riktningslinje</tspan></text>`;
      return s;
    },
  };
})();

// ---------- HTML ----------
const cell = (t, i, mode) => `<div class="cell"><div class="ch"><span class="num">${i + 1}</span><span class="cap">${t.cap}</span></div>${render(t, mode)}${mode === 'facit' && t.note ? `<div class="note">${t.note}</div>` : ''}</div>`;

const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: Rita hävarmen — Fysiklabbet</title>
<meta name="description" content="Övningsblad i kraftmoment (Fysik nivå 1): rita in hävarmen som det kortaste avståndet mellan vridningspunkten och kraftens riktningslinje. Genomräknat exempel i tre steg, tolv figurer och facit. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/ovningsblad-havarm.html">
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
.kicker { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #5b6472; font-weight: 600; }
h1 { font-size: 21pt; margin: 0; line-height: 1.1; font-weight: 700; }
.namn { font-size: 10pt; color: #5b6472; }
.namn span { display: inline-block; width: 58mm; border-bottom: .8pt solid #8a929e; margin-left: 2mm; }
.def { margin-top: 3mm; border-left: 3pt solid ${C.arm}; background: #eef6f5; padding: 2.2mm 3.5mm; font-size: 9.6pt; line-height: 1.45; }
.def b { font-weight: 600; }
h2 { font-size: 11pt; margin: 3.4mm 0 1.6mm; font-weight: 600; }
h2 small { font-weight: 400; color: #5b6472; font-size: 9pt; margin-left: 2mm; }
.steg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.steg .panel { border: .6pt solid #c8cdd4; border-radius: 2mm; padding: 1.2mm 1.6mm 1.6mm; }
.steg .sh { font-size: 8.4pt; font-weight: 600; color: ${C.arm}; text-transform: uppercase; letter-spacing: .08em; }
.steg svg { width: 100%; height: auto; display: block; }
.steg p { margin: .6mm 0 0; font-size: 8.4pt; line-height: 1.35; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.4mm 4mm; }
.cell { border: .6pt solid #c8cdd4; border-radius: 2mm; padding: 1mm 1.6mm 1.2mm; display: flex; flex-direction: column; }
.ch { display: flex; align-items: baseline; gap: 2mm; }
.num { font-weight: 700; font-size: 10pt; }
.cap { font-size: 8.4pt; color: #5b6472; }
.cell svg { width: 100%; height: auto; display: block; }
.note { font-size: 7.8pt; line-height: 1.3; color: #3c4450; margin-top: .4mm; }
.foot { font-size: 7.5pt; color: #8a929e; display: flex; justify-content: space-between; margin-top: 2mm; }
.facit .grid { margin-top: 4mm; }
i { font-style: italic; }
/* Smal skärm: färre figurer per rad, så att etiketterna blir läsbara. */
@media screen and (max-width: 640px) {
  .steg { grid-template-columns: 1fr; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .steg p, .cap { font-size: 10pt; }
  .def, .note { font-size: 10.5pt; }
}
@media screen and (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
/* Utskrift: exakt två A4-sidor, uppgifterna fram och facit bak. Rutnätet
   fyller resten av sidan och figurerna krymps in i sina rutor. */
@page { size: A4; margin: 0; }
@media print {
  .page { width: 210mm; height: 297mm; max-width: none; margin: 0; padding: 10mm 12mm 8mm; display: flex; flex-direction: column; page-break-after: always; overflow: hidden; }
  .page + .page { border-top: 0; }
  .page:last-child { page-break-after: auto; }
  .grid { grid-template-rows: repeat(4, minmax(0, 1fr)); flex: 1; min-height: 0; }
  .facit .grid { gap: 3.4mm 4mm; }
  .cell { min-height: 0; }
  .cell svg { flex: 1; min-height: 0; }
}
</style>
</head>
<body>
<section class="page">
  <div class="top">
    <div><div class="kicker">Fysik nivå 1 · Kraftmoment</div><h1>Rita hävarmen</h1></div>
    <div class="namn">Namn:<span></span></div>
  </div>
  <div class="def"><b>Hävarmen <i>l</i></b> är det kortaste avståndet mellan vridningspunkten och kraftens riktningslinje. Det kortaste avståndet möter alltid linjen i <b>rät vinkel</b>. Kraftmomentet är <i>M</i> = <i>F</i> · <i>l</i>.</div>
  <h2>Exempel: så ritar du hävarmen</h2>
  <div class="steg">
    <div class="panel"><div class="sh">Steg 1</div>${render(ex, 'steg1')}<p>Utgå från vridningspunkten och kraftvektorn <i>F</i>.</p></div>
    <div class="panel"><div class="sh">Steg 2</div>${render(ex, 'steg2')}<p>Förläng kraftvektorn åt båda hållen med en streckad linje. Det är kraftens riktningslinje.</p></div>
    <div class="panel"><div class="sh">Steg 3</div>${render(ex, 'steg3')}<p>Rita kortaste sträckan från vridningspunkten till riktningslinjen, i rät vinkel mot linjen. Sätt pilar i båda ändar.</p></div>
  </div>
  <h2>Uppgifter <small>Rita in hävarmen i varje figur. Använd linjal, och kontrollera den räta vinkeln med hörnet på ett papper.</small></h2>
  <div class="grid">${tasks.map((t, i) => cell(t, i, 'task')).join('')}</div>
  <div class="foot"><span>Den röda pricken är vridningspunkten.</span><span>fysiklabbet.se</span></div>
</section>
<section class="page facit">
  <div class="top">
    <div><div class="kicker">Fysik nivå 1 · Kraftmoment</div><h1>Facit: Rita hävarmen</h1></div>
  </div>
  <div class="def">Streckad linje: kraftens riktningslinje. Grön sträcka med pilar i båda ändar: hävarmen <i>l</i>. Den lilla vinkelmarkeringen visar att hävarmen möter riktningslinjen i rät vinkel.</div>
  <div class="grid">${tasks.map((t, i) => cell(t, i, 'facit')).join('')}</div>
  <div class="foot"><span></span><span>fysiklabbet.se</span></div>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;

const OUT = path.join(__dirname, '..', 'ovningsblad', 'ovningsblad-havarm.html');
fs.writeFileSync(OUT, html);
console.log('skrev', path.relative(path.join(__dirname, '..'), OUT));
