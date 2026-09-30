// Bygger övningsbladet "Kapitel 1, avancerade uppgifter" (Fysik nivå 2): nio
// utmanande uppgifter som täcker hela kapitel 1 (kraftmoment, stabilitet,
// cirkulär rörelse, gravitation i cirkelbanor, konisk pendel och
// kaströrelse), följda av lösningsförslag.
//
// Nivån (Avancerad) är kalibrerad mot de svåraste uppgifterna i tidigare kursprov i Fysik 2 och
// mot de svåraste blandade uppgifterna i läroboken, men uppgifterna är
// egna: ingen uppgiftstext eller siffra är hämtad därifrån.
//
// Alla svar i lösningsförslagen räknas fram här i skriptet (funktionen
// svar() nedan) och figurerna ritas ur beräknade koordinater, så att text,
// figur och facit alltid hänger ihop.
//
//   node .claude/bygg-ovningsblad-fy2-kap1-avancerad.js
//     bygger ovningsblad/ovningsblad-fy2-kap1-avancerad.html
//
// PDF-versionen görs sedan med headless Chrome mot dev-servern:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//     --print-to-pdf=ovningsblad/ovningsblad-fy2-kap1-avancerad.pdf
//     http://localhost:8000/ovningsblad/ovningsblad-fy2-kap1-avancerad.html
'use strict';
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'ovningsblad', 'ovningsblad-fy2-kap1-avancerad.html');

// ---------- konstanter och svar ----------
const g = 9.82, G = 6.674e-11, D = Math.PI / 180;
const S = {}; // alla uträknade värden, används både i facit och i figurerna

// 2 Stegen
S.s = { L: 4.0, M: 12, m: 75, a: 65, mu: 0.35 };
S.s.FG1 = S.s.M * g; S.s.FG2 = S.s.m * g;
S.s.FN1 = S.s.FG1 + S.s.FG2;
S.s.FN2 = S.s.mu * S.s.FN1;
S.s.MN2 = S.s.FN2 * S.s.L * Math.sin(S.s.a * D);
S.s.MG1 = S.s.FG1 * S.s.L / 2 * Math.cos(S.s.a * D);
S.s.x = (S.s.MN2 - S.s.MG1) / (S.s.FG2 * Math.cos(S.s.a * D));
S.s.tan = (S.s.M / 2 + S.s.m) / (S.s.mu * (S.s.M + S.s.m));
S.s.amin = Math.atan(S.s.tan) / D;

// 3 Skåpet
S.k = { h: 1.80, b: 0.60, m: 60 };
S.k.FG = S.k.m * g;
S.k.MG = S.k.FG * S.k.b / 2;
S.k.Fa = S.k.MG / S.k.h;
S.k.diag = Math.hypot(S.k.h, S.k.b);
S.k.Fb = S.k.MG / S.k.diag;
S.k.vinkel = Math.atan(S.k.b / S.k.h) / D;

// 4 Klossen
S.q = { b: 0.12, h: 0.30, mu: 0.45 };
S.q.aV = Math.atan(S.q.b / S.q.h) / D;
S.q.aG = Math.atan(S.q.mu) / D;
S.q.hmax = S.q.b / S.q.mu;

// 5 Rotorn
S.r = { r: 2.4, mu: 0.40 };
S.r.v = Math.sqrt(g * S.r.r / S.r.mu);
S.r.T = 2 * Math.PI * S.r.r / S.r.v;
S.r.n = 60 / S.r.T;

// 6 Loopen
S.l = { r: 8.0, m: 60 };
S.l.h = 2.5 * S.l.r;
S.l.FG = S.l.m * g;
S.l.FN = 6 * S.l.FG;

// 7 Himlakroppen
S.p = { Tmin: 108 };
S.p.T = S.p.Tmin * 60;
S.p.rho = 3 * Math.PI / (G * S.p.T ** 2);

// 8 Kedjekarusellen
S.c = { d: 3.0, l: 5.0, a: 40, m: 70 };
S.c.r = S.c.d + S.c.l * Math.sin(S.c.a * D);
S.c.v = Math.sqrt(S.c.r * g * Math.tan(S.c.a * D));
S.c.T = 2 * Math.PI * S.c.r / S.c.v;
S.c.Tfel = 2 * Math.PI * Math.sqrt(S.c.l * Math.cos(S.c.a * D) / g);
S.c.rfel = S.c.l * Math.sin(S.c.a * D);
S.c.FG = S.c.m * g;
S.c.FS = S.c.FG / Math.cos(S.c.a * D);

// 9 Basket
S.u = { y0: 2.10, y1: 3.05, x: 4.60, a: 52 };
S.u.y = S.u.y1 - S.u.y0;
{
  const u = S.u, a = u.a * D;
  u.v0 = Math.sqrt(g * u.x ** 2 / (2 * Math.cos(a) ** 2 * (u.x * Math.tan(a) - u.y)));
  u.vx = u.v0 * Math.cos(a); u.t = u.x / u.vx; u.vy = u.v0 * Math.sin(a) - g * u.t;
  u.fi = Math.atan(-u.vy / u.vx) / D;
  u.ytop = u.y0 + (u.v0 * Math.sin(a)) ** 2 / (2 * g);
  u.xtop = u.vx * u.v0 * Math.sin(a) / g;
}

// 10 Backhopparen
S.h = { v0: 26, b: 35 };
{
  const h = S.h, b = h.b * D;
  h.t = 2 * h.v0 * Math.tan(b) / g; h.x = h.v0 * h.t; h.y = g * h.t ** 2 / 2;
  h.s = h.x / Math.cos(b); h.s2 = 1.1 ** 2 * h.s;
  h.fi = Math.atan(2 * Math.tan(b)) / D; h.rel = h.fi - h.b;
}

// Kontroller: facit får aldrig bygga på ett räknefel eller en omöjlig situation.
function kontroll(villkor, text) { if (!villkor) throw new Error('Kontroll misslyckades: ' + text); }
kontroll(S.s.x > 0 && S.s.x < S.s.L, 'personen når en punkt på stegen');
kontroll(Math.abs(S.s.FN2 * S.s.L * Math.sin(S.s.a * D) - S.s.FG1 * S.s.L / 2 * Math.cos(S.s.a * D) - S.s.FG2 * S.s.x * Math.cos(S.s.a * D)) < 1e-9, 'momentjämvikt stege');
kontroll(S.q.aV < S.q.aG, 'klossen välter före den glider');
kontroll(S.u.vy < 0 && S.u.xtop < S.u.x, 'bollen är på väg nedåt vid ringen');
{ const b = S.h.b * D; kontroll(Math.abs(S.h.y / S.h.x - Math.tan(b)) < 1e-12, 'landningspunkten ligger på backen'); }
kontroll(Math.abs(S.c.FS * Math.sin(S.c.a * D) - S.c.m * S.c.v ** 2 / S.c.r) < 1e-9, 'kedjekarusellens centripetalkraft');

// ---------- talformat ----------
// t(v, d): TeX-tal med decimalkomma {,} och tunt mellanrum i tusental.
function t(v, d) {
  const s = v.toFixed(d);
  if (parseFloat(s) === 0) return '0';
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const ii = (neg ? i.slice(1) : i).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  return (neg ? '-' : '') + ii + (f !== undefined ? '{,}' + f : '');
}
// tp: med "…" efter, för oavrundade mellanled
const tp = (v, d) => t(v, d) + '\\ldots';
// h(v, d): HTML-tal med decimalkomma och hårt mellanslag i tusental
function h(v, d) {
  const s = v.toFixed(d);
  if (parseFloat(s) === 0) return '0';
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;') + (f !== undefined ? ',' + f : '');
}

// ---------- SVG-primitiver ----------
const C = {
  ink: '#1f2530', mute: '#5b6472', force: '#2563c9', pivot: '#d13b2e',
  wood: '#c69a5e', woodS: '#8a6a3a', woodL: '#efe3cc', ground: '#e6ddcb',
  metal: '#8a929e', orange: '#d9772b',
};
const r1 = (n) => (Math.round(n * 10) / 10).toString();
const norm = (x, y) => { const l = Math.hypot(x, y); return [x / l, y / l]; };
const add = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s];
const FONT = 'font-family="Poppins, system-ui, sans-serif"';

function svg(w, hh, body, vb) {
  const k = Math.min(1.25, 330 / w);
  return `<svg viewBox="${vb || `0 0 ${w} ${hh}`}" width="${Math.round(w * k)}" height="${Math.round(hh * k)}" xmlns="http://www.w3.org/2000/svg" ${FONT} role="img">${body}</svg>`;
}
function line(a, b, col = C.ink, w = 1.4, extra = '') {
  return `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${col}" stroke-width="${w}" ${extra}/>`;
}
const dash = (a, b, col = C.mute, w = 1.1) => line(a, b, col, w, 'stroke-dasharray="4 3"');
function head(tip, u, hl, hw, col) {
  const b = add(tip, u, -hl), p = [-u[1], u[0]];
  return `<polygon points="${r1(b[0] + p[0] * hw)},${r1(b[1] + p[1] * hw)} ${r1(tip[0])},${r1(tip[1])} ${r1(b[0] - p[0] * hw)},${r1(b[1] - p[1] * hw)}" fill="${col}"/>`;
}
// Kraftpil: skaftet slutar vid pilhuvudets bas, rak linjeände (butt).
function arrow(a, b, col = C.force, w = 2.6, hl = 9, hw = 4.6) {
  const u = norm(b[0] - a[0], b[1] - a[1]);
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  hl = Math.min(hl, L * 0.8);
  return line(a, add(b, u, -hl), col, w, 'stroke-linecap="butt"') + head(b, u, hl, hw, col);
}
// Måttlinje med pilspets i båda ändar
function dbl(a, b, col = C.ink, w = 1.1, hl = 6, hw = 3) {
  const u = norm(b[0] - a[0], b[1] - a[1]);
  return line(add(a, u, hl), add(b, u, -hl), col, w, 'stroke-linecap="butt"') + head(b, u, hl, hw, col) + head(a, [-u[0], -u[1]], hl, hw, col);
}
function text(x, y, s, anchor = 'middle', size = 12, col = C.ink) {
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" font-size="${size}" fill="${col}">${s}</text>`;
}
// kursiv beteckning med rakt index
const v = (s, idx) => `<tspan font-style="italic">${s}</tspan>` + (idx ? `<tspan font-size="9" dy="3">${idx}</tspan><tspan dy="-3">&#8203;</tspan>` : '');
const dot = (p, r = 2.6, col = C.ink) => `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r}" fill="${col}"/>`;
// Vinkelbåge med medelpunkt i hörnet P från vinkeln a1 till a2 (grader, SVG:s
// y nedåt). Ökande vinkel ger sweep 1, minskande sweep 0.
function arc(P, r, a1, a2, col = C.ink, w = 1.3) {
  const p1 = [P[0] + r * Math.cos(a1 * D), P[1] + r * Math.sin(a1 * D)];
  const p2 = [P[0] + r * Math.cos(a2 * D), P[1] + r * Math.sin(a2 * D)];
  const sweep = a2 > a1 ? 1 : 0;
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `<path d="M ${r1(p1[0])} ${r1(p1[1])} A ${r} ${r} 0 ${large} ${sweep} ${r1(p2[0])} ${r1(p2[1])}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
}
function ground(y, x1, x2) {
  let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.ink}" stroke-width="1.5"/>`;
  for (let x = x1 + 2; x < x2 - 4; x += 8) s += `<line x1="${x + 7}" y1="${y}" x2="${x}" y2="${y + 7}" stroke="${C.ink}" stroke-width="0.8"/>`;
  return s;
}
function wallR(x, y1, y2) { // väggyta vid x, skraffering åt höger
  let s = `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.ink}" stroke-width="1.5"/>`;
  for (let y = y1 + 2; y < y2 - 2; y += 8) s += `<line x1="${x}" y1="${y + 7}" x2="${x + 7}" y2="${y}" stroke="${C.ink}" stroke-width="0.8"/>`;
  return s;
}

// ---------- figurer ----------
function figStege(facit) {
  const W = 230, H = 196, gy = 182, wx = 192, Lpx = 150, a = S.s.a * D;
  const u = [Math.cos(a), -Math.sin(a)], p = [Math.sin(a), Math.cos(a)];
  const O = [wx - Lpx * Math.cos(a), gy], T = [wx, gy - Lpx * Math.sin(a)];
  let s = ground(gy, 8, 218) + wallR(wx, 12, gy);
  s += line(O, T, C.woodS, 7.2) + line(O, T, C.wood, 4.6);
  for (let d = 12; d < Lpx - 4; d += 16) s += dot(add(O, u, d), 1.5, C.woodS);
  if (!facit) {
    s += arc(O, 26, 0, -S.s.a);
    const lp = add(O, [Math.cos(S.s.a / 2 * D), -Math.sin(S.s.a / 2 * D)], 40);
    s += text(lp[0] + 2, lp[1] + 4, '65°');
    const mid = add(O, u, Lpx / 2), lab = add(mid, p, -13);
    s += text(lab[0], lab[1] + 4, '4,0 m', 'end');
    s += dot(O, 3.2, C.pivot) + text(O[0] - 4, O[1] - 7, 'O', 'end', 12);
  } else {
    const k = 0.08, fs = 15; // px per newton
    const P2 = add(O, u, Lpx * S.s.x / S.s.L), M = add(O, u, Lpx / 2);
    s += arrow(O, [O[0], O[1] - S.s.FN1 * k]) + text(O[0] - 6, O[1] - S.s.FN1 * k + 12, v('F', 'N1'), 'end', fs);
    s += arrow([O[0], gy - 3], [O[0] + S.s.FN2 * k, gy - 3]) + text(O[0] + S.s.FN2 * k + 4, gy - 8, v('F', 'f'), 'start', fs);
    s += arrow(T, [T[0] - S.s.FN2 * k, T[1]]) + text(T[0] - S.s.FN2 * k - 5, T[1] + 5, v('F', 'N2'), 'end', fs);
    s += dot(M) + arrow(M, [M[0], M[1] + S.s.FG1 * k], C.force, 2.6, 7, 4) + text(M[0] - 9, M[1] - 7, v('F', 'G'), 'end', fs);
    s += dot(P2) + arrow(P2, [P2[0], P2[1] + S.s.FG2 * k]) + text(P2[0] - 1, P2[1] + S.s.FG2 * k + 17, v('F', 'P'), 'middle', fs);
    s += dot(O, 3.2, C.pivot) + text(O[0] - 5, O[1] - 7, 'O', 'end', 13);
  }
  return svg(W, H, s);
}

function figSkap(facit) {
  const W = 200, H = 188, gy = 176, sc = 80;
  const w = S.k.b * sc, hh = S.k.h * sc, x0 = 76, y0 = gy - hh;
  const P = [x0 + w, gy], A = [x0, y0];
  let s = ground(gy, 10, 192);
  s += `<rect x="${x0}" y="${r1(y0)}" width="${w}" height="${r1(hh)}" fill="${C.woodL}" stroke="${C.woodS}" stroke-width="1.6"/>`;
  s += line([x0 + 4, gy - 8], [x0 + w - 4, gy - 8], C.woodS, 0.9);
  if (!facit) {
    s += dbl([x0, y0 - 10], [x0 + w, y0 - 10]) + text(x0 + w / 2, y0 - 15, '0,60 m', 'middle', 11);
    s += dbl([x0 - 12, y0], [x0 - 12, gy]) + text(x0 - 17, y0 + hh / 2 + 4, '1,80 m', 'end', 11);
  } else {
    const d = norm(P[0] - A[0], P[1] - A[1]), f = [-d[1], d[0]];
    const fdir = f[0] > 0 ? f : [-f[0], -f[1]];
    s += dash(A, P, C.ink, 1.1);
    const q = 7;
    s += `<polyline points="${r1(A[0] + d[0] * q)},${r1(A[1] + d[1] * q)} ${r1(A[0] + d[0] * q + fdir[0] * q)},${r1(A[1] + d[1] * q + fdir[1] * q)} ${r1(A[0] + fdir[0] * q)},${r1(A[1] + fdir[1] * q)}" fill="none" stroke="${C.ink}" stroke-width="1"/>`;
    const tip = add(A, fdir, 62);
    s += arrow(A, tip) + text(tip[0] + 4, tip[1] + 5, v('F'), 'start', 15);
    const lm = add(add(A, d, S.k.diag * sc * 0.36), fdir, -10);
    s += text(lm[0], lm[1] + 5, v('l'), 'middle', 15);
    s += dash([A[0], A[1]], [A[0] + 70, A[1]], C.mute, 0.9);
    s += arc(A, 44, 0, -S.k.vinkel, C.mute, 1.1);
    s += text(A[0] + 74, A[1] + 5, '18°', 'start', 12, C.mute);
  }
  s += dot(P, 3.4, C.pivot) + text(P[0] + 6, P[1] - 6, 'P', 'start', 12);
  return svg(W, H, s);
}

function figKloss() {
  const W = 270, H = 190, gy = 176, a = 14 * D;
  const u = [Math.cos(a), -Math.sin(a)], n = [-Math.sin(a), -Math.cos(a)];
  const H0 = [20, gy], bw = S.q.b * 300, bh = S.q.h * 300;
  const end = add(H0, u, 240);
  let s = '';
  // bräda (tjocklek under ytan) och stöd under högra änden
  const bb = (p) => add(p, n, -7);
  s += `<polygon points="${[H0, end, bb(end), bb(H0)].map(q => r1(q[0]) + ',' + r1(q[1])).join(' ')}" fill="${C.wood}" stroke="${C.woodS}" stroke-width="1.2"/>`;
  const sx1 = 212, sx2 = 240, yb = (x) => gy - (x - 20) * Math.tan(a) + 7 / Math.cos(a);
  s += `<polygon points="${sx1},${r1(yb(sx1))} ${sx2},${r1(yb(sx2))} ${sx2},${gy} ${sx1},${gy}" fill="#d8cfbd" stroke="${C.mute}" stroke-width="1"/>`;
  s += `<rect x="6" y="${gy}" width="258" height="10" fill="${C.ground}"/>` + ground(gy, 6, 264);
  // klossen
  const Cc = add(H0, u, 110);
  const BL = add(Cc, u, -bw / 2), BR = add(Cc, u, bw / 2), TL = add(BL, n, bh), TR = add(BR, n, bh);
  s += `<polygon points="${[BL, BR, TR, TL].map(q => r1(q[0]) + ',' + r1(q[1])).join(' ')}" fill="${C.woodL}" stroke="${C.woodS}" stroke-width="1.6"/>`;
  // mått
  s += dbl(add(TL, n, 10), add(TR, n, 10));
  const m1 = add(add(TL, TR, 1).map(q => q / 2), n, 26);
  s += text(m1[0], m1[1] + 4, '12 cm', 'middle', 11);
  s += dbl(add(BR, u, 10), add(TR, u, 10));
  const m2 = add(add(BR, TR, 1).map(q => q / 2), u, 16);
  s += text(m2[0], m2[1] + 4, '30 cm', 'start', 11);
  // vinkel
  s += arc(H0, 60, 0, -14);
  s += text(H0[0] + 76 * Math.cos(7 * D), H0[1] - 76 * Math.sin(7 * D) + 4, v('α'), 'middle', 13);
  return svg(W, H, s);
}

function figLoop() {
  const W = 290, H = 200, gy = 188, R = 50, cx = 196, cy = gy - R, hs = 132;
  const top = gy - hs;
  let s = `<rect x="4" y="${gy}" width="282" height="8" fill="${C.ground}"/>` + ground(gy, 4, 286);
  s += `<path d="M 26 ${top} L 40 ${top} C 78 ${top} 78 ${gy} 124 ${gy} L 276 ${gy}" fill="none" stroke="${C.ink}" stroke-width="2.4"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.ink}" stroke-width="2.4"/>`;
  // vagnen
  s += `<rect x="26" y="${top - 13}" width="17" height="10" rx="2.5" fill="${C.force}"/>` + dot([30, top - 2.5], 2.4) + dot([39, top - 2.5], 2.4);
  // mått h
  s += dash([26, top], [12, top]);
  s += dbl([14, top], [14, gy]) + text(19, (top + gy) / 2 + 4, v('h'), 'start', 13);
  // radie
  const e = [cx + R * Math.cos(-40 * D), cy + R * Math.sin(-40 * D)];
  s += dot([cx, cy], 2.2) + line([cx, cy], e, C.ink, 1.1);
  const rm = add([(cx + e[0]) / 2, (cy + e[1]) / 2], [Math.sin(-40 * D), -Math.cos(-40 * D)], -8);
  s += text(rm[0], rm[1] + 4, v('r'), 'middle', 13);
  return svg(W, H, s);
}

function figKarusell() {
  const W = 300, H = 176, gy = 166, mx = 150, ay = 36, sc = 22, a = S.c.a * D;
  const arm = S.c.d * sc, ch = S.c.l * sc;
  const PR = [mx + arm, ay], PL = [mx - arm, ay];
  const SR = [PR[0] + ch * Math.sin(a), ay + ch * Math.cos(a)], SL = [PL[0] - ch * Math.sin(a), SR[1]];
  let s = ground(gy, 6, 294);
  s += `<polygon points="${mx},10 ${mx - arm - 10},${ay - 4} ${mx + arm + 10},${ay - 4}" fill="#d8cfbd" stroke="${C.mute}" stroke-width="1.1"/>`;
  s += line([mx, ay - 4], [mx, gy], C.metal, 6) + line(PL, PR, C.metal, 3);
  s += `<ellipse cx="${mx}" cy="${r1(SR[1] + 6)}" rx="${r1(SR[0] - mx)}" ry="12" fill="none" stroke="${C.mute}" stroke-width="1" stroke-dasharray="4 3"/>`;
  for (const [P, Q] of [[PR, SR], [PL, SL]]) {
    s += line(P, Q, C.ink, 1.4);
    s += `<rect x="${r1(Q[0] - 6)}" y="${r1(Q[1])}" width="12" height="7" rx="1.5" fill="${C.force}"/>`;
  }
  // vinkel mot lodlinjen
  s += dash(PR, [PR[0], PR[1] + 92]);
  const aSvg = Math.atan2(SR[1] - PR[1], SR[0] - PR[0]) / D;
  s += arc(PR, 32, 90, aSvg);
  const bis = (90 + aSvg) / 2 * D;
  s += text(PR[0] + 45 * Math.cos(bis), PR[1] + 45 * Math.sin(bis) + 4, '40°', 'middle', 11);
  // mått
  s += dbl([mx, ay + 10], [PR[0], ay + 10]) + text((mx + PR[0]) / 2, ay + 23, '3,0 m', 'middle', 11);
  const cm = [(PR[0] + SR[0]) / 2, (PR[1] + SR[1]) / 2], cn = [Math.cos(a), -Math.sin(a)];
  s += text(cm[0] + cn[0] * 9, cm[1] + cn[1] * 9 + 2, '5,0 m', 'start', 11);
  return svg(W, H, s);
}

function figBasket() {
  const W = 310, H = 184, gy = 172, sc = 38, x0 = 42, a = S.u.a * D, u = S.u;
  const R = [x0, gy - u.y0 * sc], Hc = [x0 + u.x * sc, gy - u.y1 * sc];
  let s = ground(gy, 6, 304);
  // stolpe, skiva, ring, nät
  const bx = Hc[0] + 16;
  s += line([bx + 16, Hc[1] - 6], [bx + 16, gy], C.metal, 5) + line([bx, Hc[1] - 6], [bx + 16, Hc[1] - 6], C.metal, 3);
  s += line([bx, Hc[1] - 28], [bx, Hc[1] + 10], C.ink, 3);
  s += line([Hc[0] - 9, Hc[1] + 3], [Hc[0] - 5, Hc[1] + 17], C.mute, 0.9) + line([Hc[0] + 9, Hc[1] + 3], [Hc[0] + 5, Hc[1] + 17], C.mute, 0.9) + line([Hc[0], Hc[1] + 3], [Hc[0], Hc[1] + 17], C.mute, 0.9);
  s += line([Hc[0] - 9, Hc[1]], [bx, Hc[1]], C.orange, 2.6);
  // banan, samplad ur kastekvationen
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const X = u.x * i / 120, Y = X * Math.tan(a) - g * X * X / (2 * u.v0 ** 2 * Math.cos(a) ** 2);
    pts.push(r1(x0 + X * sc) + ',' + r1(R[1] - Y * sc));
  }
  s += `<polyline points="${pts.join(' ')}" fill="none" stroke="${C.force}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
  s += `<circle cx="${R[0]}" cy="${r1(R[1])}" r="4.6" fill="${C.orange}" stroke="${C.ink}" stroke-width="0.8"/>`;
  // utkastvinkel
  s += dash([R[0] + 5, R[1]], [R[0] + 58, R[1]]);
  s += arc(R, 28, 0, -S.u.a);
  const lb = [R[0] + 42 * Math.cos(-26 * D), R[1] + 42 * Math.sin(-26 * D)];
  s += text(lb[0], lb[1] + 4, '52°', 'middle', 11);
  // mått
  s += dbl([x0, gy], [x0, R[1] + 5]) + text(x0 + 6, (gy + R[1]) / 2 + 12, '2,10 m', 'start', 11);
  s += dash([Hc[0], Hc[1] + 18], [Hc[0], gy - 12]);
  s += dbl([x0, gy - 12], [Hc[0], gy - 12]) + text((x0 + Hc[0]) / 2 + 20, gy - 17, '4,60 m', 'middle', 11);
  s += dbl([bx + 34, gy], [bx + 34, Hc[1]]) + dash([bx + 4, Hc[1]], [bx + 40, Hc[1]]) + text(bx + 38, (gy + Hc[1]) / 2 + 4, '3,05 m', 'start', 11);
  return svg(W, H, s);
}

function figBackhopp() {
  const W = 260, H = 176, b = S.h.b * D, O = [44, 44];
  const end = [O[0] + 230 * Math.cos(b), O[1] + 230 * Math.sin(b)];
  let s = `<polygon points="4,${O[1]} ${O[0]},${O[1]} ${r1(end[0])},${r1(end[1])} 4,${r1(end[1])}" fill="${C.ground}"/>`;
  s += line([4, O[1]], O, C.ink, 1.8) + line(O, end, C.ink, 1.8);
  for (let x = 8; x < O[0] - 2; x += 8) s += line([x + 7, O[1]], [x, O[1] + 7], C.ink, 0.8);
  s += dash([O[0], O[1]], [O[0] + 86, O[1]]);
  s += arc(O, 42, 0, S.h.b);
  s += text(O[0] + 56 * Math.cos(b / 2), O[1] + 56 * Math.sin(b / 2) + 4, '35°', 'middle', 11);
  const J = [O[0] - 2, O[1] - 7];
  s += line([J[0] - 12, O[1] - 2], [J[0] + 10, O[1] - 2], C.ink, 1.8) + dot(J, 4, C.force);
  s += arrow([J[0] + 6, J[1] - 8], [J[0] + 50, J[1] - 8]) + text(J[0] + 28, J[1] - 14, v('v', '0'), 'middle', 12);
  return svg(W, H, s);
}

// ---------- figurer till uppgift 4 och lösningsförslagen ----------
const ARM = '#0d9488'; // hävarmar och mått i lösningsfigurerna
const tdbl = (a, b) => dbl(a, b, ARM, 1.4, 6, 3.2);

function wallL(x, y1, y2) { // väggyta vid x, skraffering åt vänster
  let s = `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.ink}" stroke-width="1.5"/>`;
  for (let y = y1 + 2; y < y2 - 2; y += 8) s += `<line x1="${x}" y1="${y + 7}" x2="${x - 7}" y2="${y}" stroke="${C.ink}" stroke-width="0.8"/>`;
  return s;
}
function person(xBody, wall, top) { // stående passagerare med ryggen mot väggen
  const w = 14, x = wall === 'r' ? xBody - w : xBody, cx = x + w / 2;
  return `<circle cx="${r1(cx)}" cy="${top + 8}" r="8" fill="#9fb0c8" stroke="${C.ink}" stroke-width="1"/>` +
    `<rect x="${r1(x)}" y="${top + 18}" width="${w}" height="44" rx="5" fill="#9fb0c8" stroke="${C.ink}" stroke-width="1"/>` +
    line([cx - 3, top + 62], [cx - 3, top + 78], C.ink, 2.2) + line([cx + 3, top + 62], [cx + 3, top + 78], C.ink, 2.2);
}
function figRotor() {
  const W = 270, H = 200, xl = 40, xr = 220, ax = 130, top = 24, fl = 184;
  let s = wallL(xl, top, fl) + wallR(xr, top, fl) + ground(fl, xl, xr);
  s += dash([xl, 158], [xr, 158], C.mute, 1);
  s += arrow([146, 162], [146, 180], C.mute, 1.4, 6, 3.2) + text(152, 175, 'golvet sänks', 'start', 10, C.mute);
  s += person(xr - 1, 'r', 78) + person(xl + 1, 'l', 78);
  s += dash([ax, 10], [ax, 190], C.ink, 1);
  s += `<path d="M 102 38 A 28 7 0 1 0 150 33" fill="none" stroke="${C.ink}" stroke-width="1.3"/>` + head([156, 36], norm(1, 0.55), 7, 3.6, C.ink);
  s += text(ax + 6, 18, 'rotationsaxel', 'start', 11, C.mute);
  s += dbl([ax, 64], [xr, 64]) + text((ax + xr) / 2, 59, '2,4 m', 'middle', 11);
  return svg(W, H, s);
}

function figRotorKraft() {
  const W = 230, H = 170, wx = 200, k = 34; // F_G = 34 px
  let s = wallR(wx, 10, 162);
  s += `<rect x="139" y="54" width="60" height="82" rx="6" fill="#dbe3ee" stroke="${C.ink}" stroke-width="1"/>`;
  const CM = [165, 96];
  s += dot(CM) + arrow(CM, [CM[0], CM[1] + k]) + text(CM[0] - 6, CM[1] + k + 2, v('F', 'G'), 'end', 14);
  s += arrow([196, 128], [196, 128 - k]) + text(190, 118, v('F', 'f'), 'end', 14);
  s += arrow([198, 72], [198 - 2.5 * k, 72]);
  s += text(198 - 2.5 * k - 4, 77, v('F', 'N') + ' = ' + v('F', 'C'), 'end', 14);
  s += dash([22, 12], [22, 162], C.ink, 1) + text(28, 22, 'axeln', 'start', 11, C.mute);
  return svg(W, H, s);
}

function figSkapA() {
  const W = 214, H = 204, gy = 172, sc = 80, k = 0.11;
  const w = S.k.b * sc, hh = S.k.h * sc, x0 = 60, y0 = gy - hh, P = [x0 + w, gy], Cg = [x0 + w / 2, gy - hh / 2];
  let s = ground(gy, 10, 196);
  s += `<rect x="${x0}" y="${r1(y0)}" width="${w}" height="${r1(hh)}" fill="${C.woodL}" stroke="${C.woodS}" stroke-width="1.6"/>`;
  s += dot(Cg) + arrow(Cg, [Cg[0], Cg[1] + S.k.FG * k]) + text(Cg[0] - 6, Cg[1] + 34, v('F', 'G'), 'end', 14);
  const A = [x0 + w, y0];
  s += arrow(A, [A[0] + S.k.Fa * k, A[1]]) + text(A[0] + S.k.Fa * k + 4, A[1] - 6, v('F'), 'start', 14);
  s += dash([A[0] + S.k.Fa * k, A[1]], [A[0] + 40, A[1]], C.mute, 0.9);
  s += tdbl([P[0] + 34, gy], [P[0] + 34, y0]) + text(P[0] + 40, (gy + y0) / 2 + 5, v('l', 'F') + ' = ' + v('h'), 'start', 13, ARM);
  s += dash([Cg[0], gy], [Cg[0], gy + 24], C.mute, 0.9) + dash([P[0], gy], [P[0], gy + 24], C.mute, 0.9);
  s += tdbl([Cg[0], gy + 20], [P[0], gy + 20]) + text(P[0] + 5, gy + 25, v('l', 'G') + ' = ' + '<tspan font-style="italic">b</tspan>/2', 'start', 13, ARM);
  s += dot(P, 3.4, C.pivot) + text(P[0] + 6, P[1] - 6, 'P', 'start', 12);
  return svg(W, H, s);
}

function figKlossKraft() {
  const W = 360, H = 200, gy = 186, a = 20 * D, FG = 40;
  const u = [Math.cos(a), -Math.sin(a)], n = [-Math.sin(a), -Math.cos(a)];
  const H0 = [14, gy], bw = 56, bh = 140;
  const end = add(H0, u, 222), bb = (q) => add(q, n, -7);
  let s = `<polygon points="${[H0, end, bb(end), bb(H0)].map(q => r1(q[0]) + ',' + r1(q[1])).join(' ')}" fill="${C.wood}" stroke="${C.woodS}" stroke-width="1.2"/>`;
  s += `<rect x="4" y="${gy}" width="228" height="10" fill="${C.ground}"/>` + ground(gy, 4, 232);
  const Cc = add(H0, u, 118), BL = add(Cc, u, -bw / 2), BR = add(Cc, u, bw / 2), TL = add(BL, n, bh), TR = add(BR, n, bh);
  s += `<polygon points="${[BL, BR, TR, TL].map(q => r1(q[0]) + ',' + r1(q[1])).join(' ')}" fill="${C.woodL}" stroke="${C.woodS}" stroke-width="1.6"/>`;
  const CM = add(Cc, n, bh / 2), tipG = [CM[0], CM[1] + FG];
  s += dot(CM) + arrow(CM, tipG) + text(tipG[0] - 6, tipG[1] - 2, v('F', 'G'), 'end', 14);
  const tipN = add(Cc, n, FG * Math.cos(a));
  s += arrow(Cc, tipN) + text(tipN[0] + 6, tipN[1] + 6, v('F', 'N'), 'start', 14);
  const Pf = add(BR, n, 3), tipF = add(Pf, u, FG * Math.sin(a));
  s += arrow(Pf, tipF, C.force, 2.6, 7, 4) + text(tipF[0] + 4, tipF[1] - 5, v('F', 'f'), 'start', 14);
  s += arc(H0, 46, 0, -20) + text(H0[0] + 60 * Math.cos(10 * D), H0[1] - 60 * Math.sin(10 * D) + 4, v('α'), 'middle', 13);
  // utlyft krafttriangel: F_G = komposanten vinkelrätt mot brädan + komposanten längs brädan
  const Q = [262, 34], K = 2.1, L = FG * K;
  const pC = add(Q, n, -L * Math.cos(a)), pG = [Q[0], Q[1] + L];
  s += arrow(Q, pG) + text(Q[0] - 6, Q[1] + L / 2 + 4, v('F', 'G'), 'end', 14);
  s += line(Q, add(pC, n, 7), C.force, 2, 'stroke-dasharray="5 3"') + head(pC, [-n[0], -n[1]], 8, 4.2, C.force);
  s += line(pC, add(pG, u, 7), C.force, 2, 'stroke-dasharray="5 3"') + head(pG, [-u[0], -u[1]], 8, 4.2, C.force);
  const q = 7, c1 = add(pC, n, q), c3 = add(pC, u, -q), c2 = add(c1, u, -q);
  s += `<polyline points="${[c1, c2, c3].map(z => r1(z[0]) + ',' + r1(z[1])).join(' ')}" fill="none" stroke="${C.ink}" stroke-width="0.9"/>`;
  s += arc(Q, 22, 90, 70, C.ink, 1.1) + text(Q[0] + 34 * Math.cos(80 * D), Q[1] + 34 * Math.sin(80 * D) + 5, v('α'), 'middle', 13);
  const mC = add(add(Q, pC).map(z => z / 2), [-n[0], -n[1]], 0);
  s += text(mC[0] + 10, mC[1], v('F', 'G') + '·cos <tspan font-style="italic">α</tspan>', 'start', 12, C.force);
  const mS = [(pC[0] + pG[0]) / 2, (pC[1] + pG[1]) / 2];
  s += text(mS[0] + 8, mS[1] + 18, v('F', 'G') + '·sin <tspan font-style="italic">α</tspan>', 'start', 12, C.force);
  s += text(Q[0] + 10, 16, 'krafttriangel', 'middle', 11, C.mute);
  return svg(W, H, s);
}

function figStegeHavarm() {
  const gy = 226, wx = 232, Lpx = 200, a = S.s.a * D, k = 0.1;
  const u = [Math.cos(a), -Math.sin(a)], p = [Math.sin(a), Math.cos(a)];
  const O = [wx - Lpx * Math.cos(a), gy], T = [wx, gy - Lpx * Math.sin(a)];
  const M = add(O, u, Lpx / 2), P2 = add(O, u, Lpx * S.s.x / S.s.L);
  let s = ground(gy, 70, 244) + wallR(wx, T[1] - 10, gy);
  s += line(O, T, C.woodS, 7.2) + line(O, T, C.wood, 4.6);
  for (let d = 12; d < Lpx - 4; d += 16) s += dot(add(O, u, d), 1.5, C.woodS);
  // verkningslinjer
  const xl = O[0] - 44;
  s += dash([T[0] - S.s.FN2 * k, T[1]], [xl - 4, T[1]], C.mute, 1);
  s += dash([M[0], M[1]], [M[0], gy + 24], C.mute, 1) + dash([P2[0], P2[1]], [P2[0], gy + 44], C.mute, 1);
  s += dash([O[0], gy], [O[0], gy + 44], C.mute, 1);
  // krafter (skalenliga)
  s += arrow(T, [T[0] - S.s.FN2 * k, T[1]]) + text(T[0] + 3, T[1] - 15, v('F', 'N2'), 'start', 14);
  s += dot(M) + arrow(M, [M[0], M[1] + S.s.FG1 * k], C.force, 2.6, 7, 4) + text(M[0] + 5, M[1] - 6, v('F', 'G'), 'start', 13);
  s += dot(P2) + arrow(P2, [P2[0], P2[1] + S.s.FG2 * k]) + text(P2[0] - 5, P2[1] + S.s.FG2 * k - 2, v('F', 'P'), 'end', 14);
  // hävarmar
  s += tdbl([xl, gy], [xl, T[1]]) + text(xl - 5, (gy + T[1]) / 2 + 5, v('l', 'N2'), 'end', 14, ARM);
  s += tdbl([O[0], gy + 20], [M[0], gy + 20]) + text(M[0] + 5, gy + 25, v('l', 'G'), 'start', 14, ARM);
  s += tdbl([O[0], gy + 40], [P2[0], gy + 40]) + text(P2[0] + 5, gy + 45, v('l', 'P'), 'start', 14, ARM);
  // mått längs stegen
  const oL = -28, ox = -14;
  s += dash(O, add(O, p, oL - 3), C.mute, 0.8) + dash(T, add(T, p, oL - 3), C.mute, 0.8) + dash(P2, add(P2, p, oL + 11), C.mute, 0.8);
  s += dbl(add(O, p, oL), add(T, p, oL), C.ink, 1.1);
  const Lt = add(add(O, u, Lpx * 0.62), p, oL - 9);
  s += text(Lt[0], Lt[1] + 4, v('L'), 'end', 14);
  s += dbl(add(O, p, ox), add(P2, p, ox), C.ink, 1.1);
  const xt = add(add(O, u, Lpx * 0.3), p, ox - 9);
  s += text(xt[0] + 2, xt[1] + 5, v('x'), 'end', 14);
  s += arc(O, 22, 0, -S.s.a) + text(O[0] + 33 * Math.cos(32.5 * D), O[1] - 33 * Math.sin(32.5 * D) + 5, v('α'), 'middle', 14);
  s += dot(O, 3.4, C.pivot) + text(O[0] + 4, gy + 16, 'O', 'start', 12);
  return svg(250, 270, s, '52 16 218 274');
}

function figLoopKraft() {
  const W = 330, H = 176, R = 52;
  let s = '';
  // högsta punkten
  const A = [84, 92];
  s += `<circle cx="${A[0]}" cy="${A[1]}" r="${R}" fill="none" stroke="${C.ink}" stroke-width="2.2"/>` + dot(A, 2);
  s += `<rect x="${A[0] - 11}" y="${A[1] - R + 2}" width="22" height="11" rx="2.5" fill="#9fb0c8" stroke="${C.ink}" stroke-width="0.8"/>`;
  const cmA = [A[0], A[1] - R + 7];
  s += dot(cmA, 2.2) + arrow(cmA, [cmA[0], cmA[1] + 22]) + text(cmA[0] - 6, cmA[1] + 20, v('F', 'G'), 'end', 13);
  s += arrow([A[0] + 7, A[1] - R + 2], [A[0] + 7, A[1] - R + 20]) + text(A[0] + 13, A[1] - R + 20, v('F', 'N'), 'start', 13);
  s += text(A[0], 168, 'högsta punkten', 'middle', 11, C.mute);
  // lägsta punkten (b), skalenlig: F_N = 6 · F_G
  const B = [248, 92], g0 = 12;
  s += `<circle cx="${B[0]}" cy="${B[1]}" r="${R}" fill="none" stroke="${C.ink}" stroke-width="2.2"/>` + dot(B, 2);
  s += `<rect x="${B[0] - 11}" y="${B[1] + R - 13}" width="22" height="11" rx="2.5" fill="#9fb0c8" stroke="${C.ink}" stroke-width="0.8"/>`;
  const cmB = [B[0] - 5, B[1] + R - 7];
  s += dot(cmB, 2.2) + arrow(cmB, [cmB[0], cmB[1] + g0], C.force, 2.6, 7, 4) + text(cmB[0] - 13, cmB[1] + 2, v('F', 'G'), 'end', 13);
  s += arrow([B[0] + 6, B[1] + R - 2], [B[0] + 6, B[1] + R - 2 - 6 * g0]) + text(B[0] + 12, B[1] + R - 2 - 6 * g0 + 12, v('F', 'N'), 'start', 13);
  s += text(B[0], 168, 'lägsta punkten', 'middle', 11, C.mute);
  return svg(W, H, s);
}

function figPlanet() {
  const W = 230, H = 172, Cc = [100, 100], R = 62;
  let s = `<circle cx="${Cc[0]}" cy="${Cc[1]}" r="${R}" fill="${C.ground}" stroke="${C.ink}" stroke-width="1.4"/>`;
  s += `<circle cx="${Cc[0]}" cy="${Cc[1]}" r="${R + 6}" fill="none" stroke="${C.mute}" stroke-width="1" stroke-dasharray="4 3"/>`;
  s += dot(Cc, 2.4) + text(Cc[0] + 6, Cc[1] + 18, v('M'), 'start', 14);
  const e = [Cc[0] + R * Math.cos(150 * D), Cc[1] + R * Math.sin(150 * D)];
  s += line(Cc, e, C.ink, 1.1) + text((Cc[0] + e[0]) / 2 + 2, (Cc[1] + e[1]) / 2 - 5, v('R'), 'middle', 14);
  const Pr = [Cc[0], Cc[1] - R - 6];
  s += `<rect x="${Pr[0] - 5}" y="${Pr[1] - 4}" width="10" height="8" fill="${C.mute}"/>` + text(Pr[0] - 9, Pr[1] - 3, v('m'), 'end', 14);
  s += arrow([Pr[0], Pr[1] + 4], [Pr[0], Pr[1] + 34]) + text(Pr[0] + 6, Pr[1] + 32, v('F', 'G'), 'start', 13);
  s += arrow([Pr[0] + 5, Pr[1]], [Pr[0] + 50, Pr[1]]) + text(Pr[0] + 30, Pr[1] - 7, v('v'), 'middle', 14);
  return svg(W, H, s);
}

function figKarusellKraft() {
  const W = 250, H = 250, gy = 240, mx = 30, ay = 62, sc = 22, a = S.c.a * D, k = 0.07;
  const P = [mx + S.c.d * sc, ay], Sx = [P[0] + S.c.l * sc * Math.sin(a), ay + S.c.l * sc * Math.cos(a)];
  let s = ground(gy, 8, 244) + line([mx, ay - 6], [mx, gy], C.metal, 6) + line([mx, ay], P, C.metal, 3);
  s += line(P, Sx, C.mute, 1.1);
  s += `<rect x="${r1(Sx[0] - 7)}" y="${r1(Sx[1] + 2)}" width="14" height="7" rx="1.5" fill="#9fb0c8" stroke="${C.ink}" stroke-width="0.8"/>`;
  // mått
  s += dash([mx, ay - 6], [mx, 12], C.mute, 0.9) + dash(P, [P[0], 34], C.mute, 0.9) + dash([Sx[0], Sx[1] - 6], [Sx[0], 12], C.mute, 0.9);
  s += dash(P, [P[0], P[1] + 104], C.mute, 0.9);
  s += tdbl([mx, 44], P.map((q, i) => i ? 44 : q)) + text((mx + P[0]) / 2, 39, v('d'), 'middle', 14, ARM);
  s += tdbl([P[0], 44], [Sx[0], 44]) + text((P[0] + Sx[0]) / 2, 39, v('l') + '·sin <tspan font-style="italic">α</tspan>', 'middle', 13, ARM);
  s += tdbl([mx, 18], [Sx[0], 18]) + text((mx + Sx[0]) / 2, 13, v('r'), 'middle', 14, ARM);
  const aSvg = Math.atan2(Sx[1] - P[1], Sx[0] - P[0]) / D;
  s += arc(P, 26, 90, aSvg) + text(P[0] + 36 * Math.cos((90 + aSvg) / 2 * D), P[1] + 36 * Math.sin((90 + aSvg) / 2 * D) + 5, v('α'), 'middle', 14);
  const lm = [(P[0] + Sx[0]) / 2, (P[1] + Sx[1]) / 2];
  const lq = [P[0] + (Sx[0] - P[0]) * 0.28, P[1] + (Sx[1] - P[1]) * 0.28];
  s += text(lq[0] + 8, lq[1] - 4, v('l'), 'start', 14);
  // krafter och krafttriangel
  const cm = [Sx[0], Sx[1]];
  const dS = norm(P[0] - Sx[0], P[1] - Sx[1]);
  const tS = add(cm, dS, S.c.FS * k), tC = [cm[0] - S.c.FS * k * Math.sin(a), cm[1]];
  s += line(tS, tC, C.mute, 0.8, 'stroke-dasharray="2 2"');
  s += line(cm, add(tC, [1, 0], 7), C.force, 2.2, 'stroke-dasharray="5 3"') + head(tC, [-1, 0], 8, 4.2, C.force) + text(tC[0] + 14, tC[1] + 17, v('F', 'C'), 'middle', 14);
  s += arrow(cm, tS) + text(tS[0] + 9, tS[1] + 4, v('F', 'S'), 'start', 14);
  s += dot(cm, 2.4) + arrow(cm, [cm[0], cm[1] + S.c.FG * k]) + text(cm[0] + 6, cm[1] + S.c.FG * k - 4, v('F', 'G'), 'start', 14);
  return svg(W, H, s);
}

function figBasketKoord() {
  const W = 330, H = 190, u = S.u, sc = 38, a = u.a * D, O = [84, 158];
  const R = [O[0] + u.x * sc, O[1] - u.y * sc];
  let s = arrow([O[0] - 10, O[1]], [O[0] + u.x * sc + 40, O[1]], C.ink, 1.2, 8, 3.8) + text(O[0] + u.x * sc + 40, O[1] + 16, v('x'), 'middle', 14);
  s += arrow([O[0], O[1] + 10], [O[0], 22], C.ink, 1.2, 8, 3.8) + text(O[0] - 8, 30, v('y'), 'end', 14);
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const X = u.x * i / 120, Y = X * Math.tan(a) - g * X * X / (2 * u.v0 ** 2 * Math.cos(a) ** 2);
    pts.push(r1(O[0] + X * sc) + ',' + r1(O[1] - Y * sc));
  }
  s += `<polyline points="${pts.join(' ')}" fill="none" stroke="${C.mute}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  s += dash(R, [R[0], O[1]], C.mute, 0.9) + dash(R, [O[0], R[1]], C.mute, 0.9);
  s += text(R[0], O[1] + 16, '4,60 m', 'middle', 12) + text(O[0] - 6, R[1] + 4, '0,95 m', 'end', 12);
  s += text(O[0] - 6, O[1] + 14, '0', 'end', 12);
  const t0 = add(O, [Math.cos(a), -Math.sin(a)], 46);
  s += arrow(O, t0) + text(t0[0] + 6, t0[1] + 9, v('v', '0'), 'start', 14);
  s += arc(O, 20, 0, -u.a) + text(O[0] + 30 * Math.cos(26 * D), O[1] - 30 * Math.sin(26 * D) + 5, v('α'), 'middle', 13);
  const f = 6.5; // px per m/s
  const tx = [R[0] + u.vx * f, R[1]], ty = [R[0], R[1] - u.vy * f], tv = [R[0] + u.vx * f, R[1] - u.vy * f];
  s += line(tx, tv, C.mute, 0.8, 'stroke-dasharray="2 2"') + line(ty, tv, C.mute, 0.8, 'stroke-dasharray="2 2"');
  s += line(R, add(tx, [-1, 0], 7), C.force, 2, 'stroke-dasharray="4 3"') + head(tx, [1, 0], 7, 3.8, C.force) + text(tx[0] + 5, tx[1] + 4, v('v', 'x'), 'start', 13);
  s += line(R, add(ty, [0, -1], 7), C.force, 2, 'stroke-dasharray="4 3"') + head(ty, [0, 1], 7, 3.8, C.force) + text(ty[0] - 5, ty[1] - 2, v('v', 'y'), 'end', 13);
  s += arrow(R, tv) + text(tv[0] + 5, tv[1] + 6, v('v'), 'start', 14);
  s += arc(R, 14, 0, u.fi, C.ink, 1.1) + text(R[0] + 23 * Math.cos(u.fi / 2 * D), R[1] + 23 * Math.sin(u.fi / 2 * D) + 5, v('β'), 'middle', 12);
  s += `<circle cx="${r1(R[0])}" cy="${r1(R[1])}" r="3" fill="${C.orange}"/>` + text(R[0] + 4, R[1] - 9, 'ringen', 'start', 11, C.mute);
  return svg(W, H, s);
}

function figBackhoppKoord() {
  const W = 320, H = 196, b = S.h.b * D, sc = 1.45, O = [30, 30];
  const L = [O[0] + S.h.x * sc, O[1] + S.h.y * sc];
  const end = [O[0] + 200 * Math.cos(b), O[1] + 200 * Math.sin(b)];
  let s = `<polygon points="${O[0]},${O[1]} ${r1(end[0])},${r1(end[1])} ${O[0]},${r1(end[1])}" fill="${C.ground}"/>` + line(O, end, C.ink, 1.8);
  s += arrow(O, [210, O[1]], C.ink, 1.2, 8, 3.8) + text(210, O[1] - 7, v('x'), 'middle', 14);
  s += arrow(O, [O[0], 188], C.ink, 1.2, 8, 3.8) + text(O[0] - 7, 186, v('y'), 'end', 14);
  s += dash(L, [L[0], O[1]], C.mute, 0.9) + dash(L, [O[0], L[1]], C.mute, 0.9);
  s += dot(L, 3) + text(L[0] + 6, L[1] - 6, '(<tspan font-style="italic">x</tspan>, <tspan font-style="italic">y</tspan>)', 'start', 13);
  const sm = add([(O[0] + L[0]) / 2, (O[1] + L[1]) / 2], [-Math.sin(b), Math.cos(b)], 12);
  s += text(sm[0], sm[1] + 5, v('s'), 'middle', 14);
  s += arc(O, 34, 0, S.h.b) + text(O[0] + 46 * Math.cos(b / 2), O[1] + 46 * Math.sin(b / 2) + 5, v('α'), 'middle', 13);
  s += text(O[0] - 4, O[1] - 6, 'O', 'end', 12);
  // hastigheten vid landningen, ritad för sig
  const Q = [236, 70], f = 1.1;
  const vx = S.h.v0 * f, vy = 2 * S.h.v0 * Math.tan(b) * f;
  const tx = [Q[0] + vx, Q[1]], ty = [Q[0], Q[1] + vy], tv = [Q[0] + vx, Q[1] + vy];
  s += line(tx, tv, C.mute, 0.8, 'stroke-dasharray="2 2"') + line(ty, tv, C.mute, 0.8, 'stroke-dasharray="2 2"');
  s += line(Q, add(tx, [-1, 0], 7), C.force, 2, 'stroke-dasharray="4 3"') + head(tx, [1, 0], 7, 3.8, C.force) + text((Q[0] + tx[0]) / 2, Q[1] - 6, v('v', 'x'), 'middle', 13);
  s += line(Q, add(ty, [0, -1], 7), C.force, 2, 'stroke-dasharray="4 3"') + head(ty, [0, 1], 7, 3.8, C.force) + text(Q[0] - 5, (Q[1] + ty[1]) / 2 + 4, v('v', 'y'), 'end', 13);
  s += arrow(Q, tv) + text(tv[0] + 4, tv[1] + 12, v('v'), 'start', 14);
  s += arc(Q, 16, 0, S.h.fi, C.ink, 1.1) + text(Q[0] + 26 * Math.cos(S.h.fi / 2 * D), Q[1] + 26 * Math.sin(S.h.fi / 2 * D) + 5, v('β'), 'middle', 12);
  s += text(Q[0] + vx / 2, Q[1] + vy + 32, 'vid landningen', 'middle', 11, C.mute);
  return svg(W, H, s);
}

// ---------- uppgifterna ----------
const NB = '&nbsp;';
const UPG = [
  {
    omr: 'Mer kraftmoment', titel: 'Hur högt kan man klättra?', fig: figStege(false),
    text: `En 4,0${NB}m lång stege med massan 12${NB}kg lutar mot en vägg och bildar vinkeln 65° med marken. Väggen är så hal att friktionen mot den kan försummas. Friktionstalet mellan stegens fötter och marken är 0,35. En person med massan 75${NB}kg klättrar långsamt uppför stegen.<br>a) Hur långt upp längs stegen kan personen komma innan stegen börjar glida?<br>b) Hur stor vinkel mot marken måste stegen minst ha för att personen ska kunna klättra ända upp?`,
  },
  {
    omr: 'Kraftmoment och stabilitet', titel: 'Att välta ett skåp', fig: figSkap(false),
    text: `Ett jämntjockt skåp är 1,80${NB}m högt och 0,60${NB}m djupt och har massan 60${NB}kg. Man vill välta skåpet kring kanten P. Friktionen mot golvet är så stor att skåpet inte glider.<br>a) Hur stor kraft måste man minst dra med, vågrätt i skåpets överkant, för att det ska börja välta?<br>b) Skåpet går att välta med en mindre kraft än i a). Var ska kraften angripa och åt vilket håll ska den verka för att bli så liten som möjligt? Hur stor är den minsta kraften?`,
  },
  {
    omr: 'Stabilitet', titel: 'Glider den eller välter den?', fig: figKloss(),
    text: `En jämntjock träkloss som är 12${NB}cm bred och 30${NB}cm hög står upprätt på en bräda. Brädan lutas långsamt allt mer. Friktionstalet mellan klossen och brädan är 0,45.<br>a) Börjar klossen glida eller välter den först? Vid vilken lutningsvinkel händer det?<br>b) Hur hög får en kloss med samma bredd och samma friktionstal högst vara om den ska glida i stället för att välta?`,
  },
  {
    omr: 'Cirkulär rörelse', titel: 'Rotorn', fig: figRotor(),
    text: `I en nöjesattraktion står passagerarna med ryggen mot väggen i en stor, lodrät cylinder med radien 2,4${NB}m. Cylindern börjar rotera, och när den snurrar tillräckligt fort sänks golvet. Passagerarna blir då hängande kvar på väggen. Friktionstalet mellan kläderna och väggen är 0,40.<br>a) Hur många varv per minut måste cylindern minst rotera för att ingen ska glida ned?<br>b) Visa att svaret inte beror på passagerarens massa, och förklara varför det är viktigt för attraktionen.`,
  },
  {
    omr: 'Energi i cirkelbanor', titel: 'Loopen', fig: figLoop(),
    text: `En berg- och dalbanevagn släpps från vila på höjden $h$ över marken. Den rullar utan energiförluster ned till marknivå och in i en cirkelformad loop med radien $r$, vars lägsta punkt ligger på marknivå. Vagnens storlek kan försummas.<br>a) Visa att vagnen tar sig runt loopen utan att tappa kontakten med banan bara om $h \\geq 2{,}5 \\cdot r$.<br>b) Loopens radie är 8,0${NB}m, och vagnen släpps från den lägsta möjliga höjden. Hur stor kraft verkar från sätet på en passagerare med massan 60${NB}kg när vagnen passerar loopens lägsta punkt? Jämför med passagerarens tyngd.`,
  },
  {
    omr: 'Gravitation', titel: 'Vad består himlakroppen av?',
    text: `En rymdsond går i en cirkelbana strax ovanför ytan på en klotformad himlakropp, så nära att banradien kan räknas som lika stor som himlakroppens radie. Sonden gör ett varv på 108 minuter. Mer än så vet man inte om himlakroppen.<br>a) Visa att himlakroppens medeldensitet $\\rho$ går att bestämma enbart ur omloppstiden $T$, och att $\\rho = \\dfrac{3\\pi}{G \\cdot T^2}$.<br>b) Beräkna medeldensiteten. Består himlakroppen troligen mest av is ($920\\ \\mathrm{kg/m^3}$), av sten (cirka $3\\,000\\ \\mathrm{kg/m^3}$) eller av järn ($7\\,870\\ \\mathrm{kg/m^3}$)?`,
  },
  {
    omr: 'Konisk pendel', titel: 'Kedjekarusellen', fig: figKarusell(),
    text: `I en kedjekarusell hänger stolarna i 5,0${NB}m långa kedjor, som är fästa i karusellens tak 3,0${NB}m från rotationsaxeln. När karusellen snurrar med konstant varvtal bildar kedjorna vinkeln 40° med lodlinjen.<br>a) Hur lång tid tar ett varv?<br>b) En elev räknar i stället med formeln för den koniska pendelns periodtid, $T = 2\\pi \\sqrt{\\frac{l \\cdot \\cos\\alpha}{g}}$. Förklara varför formeln ger fel svar här, och om elevens svar blir för långt eller för kort.<br>c) Hur stor är kraften från kedjan på en person som tillsammans med stolen har massan 70${NB}kg?`,
  },
  {
    omr: 'Kaströrelse', titel: 'Straffkastet', fig: figBasket(),
    text: `En basketspelare släpper bollen 2,10${NB}m över golvet, med vinkeln 52° mot vågrätt. Korgens ring sitter 3,05${NB}m över golvet, och det vågräta avståndet från utkastpunkten till ringens mitt är 4,60${NB}m.<br>a) Med vilken fart ska bollen kastas för att gå rakt ned i ringens mitt?<br>b) Med vilken vinkel mot vågrätt kommer bollen ned i ringen?`,
  },
  {
    omr: 'Kaströrelse', titel: 'Backhopparen', fig: figBackhopp(),
    text: `En backhoppare lämnar hoppet vågrätt med farten 26${NB}m/s. Backen börjar vid hoppets kant och lutar 35° mot vågrätt.<br>a) Hur långt från hoppets kant, räknat längs backen, landar hopparen?<br>b) Hur många procent längre blir hoppet om farten från hoppet är 10${NB}% större?<br>c) Visa att vinkeln mellan hopparens hastighet och backen vid landningen inte beror på farten från hoppet, och beräkna vinkeln.`,
  },
];

// ---------- lösningsförslagen ----------
// Regler (se "Övningsblad: lösningsförslagen" i CLAUDE.md): figur med
// krafter och hävarmar, numrerade ekvationer, varje insättning sägs i ord
// ("F_f = F_N2 från (2) insatt i (3) ger"), och varje ekvationsoperation
// skrivs som en egen rad med operationen i fetstil i båda led.
const k = (s) => `$$${s}$$`;
const ekv = (s, n) => `$$${s} \\tag{${n}}$$`;
const klammer = (...rader) => k(`\\left[\\begin{array}{l} ${rader.join(' \\\\ ')} \\end{array}\\right]`);
const p = (s) => `<p>${s}</p>`;
const ul = (...items) => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
const svarRad = (s) => `<p class="svar"><b>Svar:</b> ${s}</p>`;
const del = (bokstav) => `<p class="del">${bokstav})</p>`;
const rim = (s) => `<p class="rim"><i>Rimligt?</i> ${s}</p>`;
const fig = (svgKod, cap, stl) => `<div class="losfig${stl === true ? ' smal' : stl ? ' ' + stl : ''}">${svgKod}<p class="cap">${cap}</p></div>`;

const s2 = S.s, q3 = S.k, q4 = S.q, r5 = S.r, l6 = S.l, p7 = S.p, c8 = S.c, u9 = S.u, h10 = S.h;
const LOS = [
  // 2 Stegen
  p(String.raw`Vi kallar stegens massa $m$ och personens massa $m_\mathrm{P}$. Fem krafter verkar på stegen:`) +
  ul(String.raw`tyngdkraften $F_\mathrm{G} = m \cdot g$ på stegen, i dess tyngdpunkt mitt på stegen`,
     String.raw`tyngdkraften $F_\mathrm{P} = m_\mathrm{P} \cdot g$ från personen`,
     String.raw`normalkraften $F_\mathrm{N1}$ från marken, uppåt vid foten O`,
     String.raw`friktionskraften $F_\mathrm{f}$ från marken vid foten. Foten vill glida ut från väggen, så friktionen är riktad in mot väggen`,
     String.raw`normalkraften $F_\mathrm{N2}$ från väggen. Väggen saknar friktion, så $F_\mathrm{N2}$ är vågrät, riktad ut från väggen.`) +
  fig(figStege(true), 'Krafterna på stegen, ritade i skala, när personen står så högt som möjligt.') +
  del('a') + p(String.raw`Stegen står still. Då tar både krafterna och momenten ut varandra. Vi börjar med krafterna.`) +
  p(String.raw`<b>Lodrätt</b> verkar $F_\mathrm{N1}$ uppåt och $F_\mathrm{G}$ och $F_\mathrm{P}$ nedåt:`) +
  ekv(String.raw`F_\mathrm{N1} = F_\mathrm{G} + F_\mathrm{P} = m \cdot g + m_\mathrm{P} \cdot g = (m + m_\mathrm{P}) \cdot g`, 1) +
  p(String.raw`<b>Vågrätt</b> verkar $F_\mathrm{f}$ mot väggen och $F_\mathrm{N2}$ ut från väggen:`) +
  ekv(String.raw`F_\mathrm{f} = F_\mathrm{N2}`, 2) +
  p(String.raw`Friktionen anpassar sig efter hur mycket som behövs, men den kan aldrig bli större än $\mu \cdot F_\mathrm{N1}$. Ju högre personen kommer, desto mer friktion behövs (det ser vi i momentlagen nedan). Stegen är på väg att glida när friktionen har nått sitt största värde:`) +
  ekv(String.raw`F_\mathrm{f} = \mu \cdot F_\mathrm{N1}`, 3) +
  p(String.raw`$F_\mathrm{f} = F_\mathrm{N2}$ från (2) och $F_\mathrm{N1} = (m + m_\mathrm{P}) \cdot g$ från (1) insatta i (3) ger`) +
  ekv(String.raw`F_\mathrm{N2} = \mu \cdot (m + m_\mathrm{P}) \cdot g`, 4) +
  klammer(String.raw`\mu = 0{,}35`, String.raw`m = 12\ \mathrm{kg}\ \text{(stegen)}`, String.raw`m_\mathrm{P} = 75\ \mathrm{kg}\ \text{(personen)}`) +
  k(String.raw`F_\mathrm{N2} = 0{,}35 \cdot (12 + 75) \cdot 9{,}82\ \mathrm{N} = ${tp(s2.FN2, 2)}\ \mathrm{N}`) +
  p(String.raw`Nu <b>momentlagen</b>. Vi väljer foten O som vridningspunkt. Där angriper $F_\mathrm{N1}$ och $F_\mathrm{f}$, och en kraft som angriper i vridningspunkten har ingen hävarm och därmed inget moment. Hävarmen till en kraft är det vinkelräta avståndet från O till kraftens verkningslinje, den streckade linjen i figuren nedan.`) +
  fig(figStegeHavarm(), String.raw`Hävarmarna (turkosa) är de vinkelräta avstånden från O till krafternas verkningslinjer (streckade). $F_\mathrm{N1}$ och $F_\mathrm{f}$ angriper i O och har ingen hävarm, därför är de inte med här.`) +
  ul(String.raw`$F_\mathrm{N2}$ är vågrät, så hävarmen $l_\mathrm{N2}$ är det lodräta avståndet från O upp till stegens topp. Stegen är hypotenusan $L$ i den rätvinkliga triangeln mot väggen och marken, och $l_\mathrm{N2}$ är den motstående kateten till $\alpha$: $l_\mathrm{N2} = L \cdot \sin\alpha$.`,
     String.raw`$F_\mathrm{G}$ och $F_\mathrm{P}$ är lodräta, så hävarmarna är de vågräta avstånden från O. Stegens tyngdpunkt sitter $\dfrac{L}{2}$ från O längs stegen och personen sträckan $x$. De vågräta avstånden är närliggande kateter till $\alpha$: $l_\mathrm{G} = \dfrac{L}{2} \cdot \cos\alpha$ och $l_\mathrm{P} = x \cdot \cos\alpha$.`) +
  p(String.raw`$F_\mathrm{N2}$ vrider stegen moturs kring O, tyngdkrafterna vrider den medurs:`) +
  k(String.raw`\Mmot = \Mmed`) +
  ekv(String.raw`F_\mathrm{N2} \cdot l_\mathrm{N2} = F_\mathrm{G} \cdot l_\mathrm{G} + F_\mathrm{P} \cdot l_\mathrm{P}`, 5) +
  p(String.raw`Hävarmarna $l_\mathrm{N2} = L \cdot \sin\alpha$, $l_\mathrm{G} = \dfrac{L}{2} \cdot \cos\alpha$ och $l_\mathrm{P} = x \cdot \cos\alpha$ insatta i (5) ger`) +
  ekv(String.raw`F_\mathrm{N2} \cdot L \cdot \sin\alpha = F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha + F_\mathrm{P} \cdot x \cdot \cos\alpha`, 6) +
  p(String.raw`Vi löser ut $x$. Först subtraherar vi $F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha$ från båda led:`) +
  k(String.raw`F_\mathrm{N2} \cdot L \cdot \sin\alpha \mathbin{\boldsymbol{-}} \boldsymbol{F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha} = F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha + F_\mathrm{P} \cdot x \cdot \cos\alpha \mathbin{\boldsymbol{-}} \boldsymbol{F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha}`) +
  k(String.raw`F_\mathrm{N2} \cdot L \cdot \sin\alpha - F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha = F_\mathrm{P} \cdot x \cdot \cos\alpha`) +
  p(String.raw`Sedan dividerar vi båda led med $F_\mathrm{P} \cdot \cos\alpha$:`) +
  k(String.raw`\dfrac{F_\mathrm{N2} \cdot L \cdot \sin\alpha - F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha}{\boldsymbol{F_\mathrm{P} \cdot \cos\alpha}} = \dfrac{F_\mathrm{P} \cdot x \cdot \cos\alpha}{\boldsymbol{F_\mathrm{P} \cdot \cos\alpha}}`) +
  k(String.raw`x = \dfrac{F_\mathrm{N2} \cdot L \cdot \sin\alpha - F_\mathrm{G} \cdot \dfrac{L}{2} \cdot \cos\alpha}{F_\mathrm{P} \cdot \cos\alpha}`) +
  klammer(String.raw`F_\mathrm{N2} = ${tp(s2.FN2, 2)}\ \mathrm{N}\ \text{(från (4))}`, String.raw`F_\mathrm{G} = m \cdot g = 12 \cdot 9{,}82\ \mathrm{N} = ${t(s2.FG1, 2)}\ \mathrm{N}`, String.raw`F_\mathrm{P} = m_\mathrm{P} \cdot g = 75 \cdot 9{,}82\ \mathrm{N} = ${t(s2.FG2, 1)}\ \mathrm{N}`, String.raw`L = 4{,}0\ \mathrm{m}`, String.raw`\alpha = 65^\circ`) +
  k(String.raw`x = \dfrac{${tp(s2.FN2, 2)} \cdot 4{,}0 \cdot \sin 65^\circ - ${t(s2.FG1, 2)} \cdot 2{,}0 \cdot \cos 65^\circ}{${t(s2.FG2, 1)} \cdot \cos 65^\circ}\ \mathrm{m} = ${tp(s2.x, 3)}\ \mathrm{m}`) +
  rim(`Punkten ligger på stegen (${h(s2.x, 1)}${NB}m av 4,0${NB}m). Att en stege kan glida innan man når toppen stämmer med erfarenheten: därför ska någon stå vid foten.`) +
  svarRad(`Personen kommer cirka 3,2${NB}m upp längs stegen.`) +
  del('b') + p(String.raw`Nu ska personen nå toppen, $x = L$, precis när friktionen är som störst. Vi utgår från momentlagen (6) i a).`) +
  p(String.raw`$F_\mathrm{N2} = \mu \cdot (m + m_\mathrm{P}) \cdot g$ från (4), $F_\mathrm{G} = m \cdot g$, $F_\mathrm{P} = m_\mathrm{P} \cdot g$ och $x = L$ insatta i (6) ger`) +
  k(String.raw`\mu \cdot (m + m_\mathrm{P}) \cdot g \cdot L \cdot \sin\alpha = m \cdot g \cdot \dfrac{L}{2} \cdot \cos\alpha + m_\mathrm{P} \cdot g \cdot L \cdot \cos\alpha`) +
  p(String.raw`Vi dividerar båda led med $g \cdot L \cdot \cos\alpha$:`) +
  k(String.raw`\dfrac{\mu \cdot (m + m_\mathrm{P}) \cdot g \cdot L \cdot \sin\alpha}{\boldsymbol{g \cdot L \cdot \cos\alpha}} = \dfrac{m \cdot g \cdot \dfrac{L}{2} \cdot \cos\alpha + m_\mathrm{P} \cdot g \cdot L \cdot \cos\alpha}{\boldsymbol{g \cdot L \cdot \cos\alpha}}`) +
  p(String.raw`I vänster led förkortas $g$ och $L$, och $\dfrac{\sin\alpha}{\cos\alpha} = \tan\alpha$. I höger led förkortas $g$, $L$ och $\cos\alpha$ i båda termerna:`) +
  k(String.raw`\mu \cdot (m + m_\mathrm{P}) \cdot \tan\alpha = \dfrac{m}{2} + m_\mathrm{P}`) +
  p(String.raw`Vi dividerar båda led med $\mu \cdot (m + m_\mathrm{P})$:`) +
  k(String.raw`\dfrac{\mu \cdot (m + m_\mathrm{P}) \cdot \tan\alpha}{\boldsymbol{\mu \cdot (m + m_\mathrm{P})}} = \dfrac{\dfrac{m}{2} + m_\mathrm{P}}{\boldsymbol{\mu \cdot (m + m_\mathrm{P})}}`) +
  k(String.raw`\tan\alpha = \dfrac{\dfrac{m}{2} + m_\mathrm{P}}{\mu \cdot (m + m_\mathrm{P})} = \dfrac{6{,}0 + 75}{0{,}35 \cdot (12 + 75)} = ${tp(s2.tan, 4)}`) +
  k(String.raw`\alpha = \tan^{-1}(${tp(s2.tan, 4)}) = ${tp(s2.amin, 2)}^\circ`) +
  rim('En brantare stege ger kortare hävarmar åt tyngdkrafterna och längre hävarm åt väggens kraft, så det behövs mindre friktion. Vinkeln blir lite större än 65°, som den ska eftersom 65° inte räckte ända upp.') +
  svarRad(`Stegen måste luta minst 69° mot marken.`),

  // 3 Skåpet
  del('a') + p(String.raw`Vi väljer kanten P som vridningspunkt. I det ögonblick skåpet börjar välta lyfter den vänstra kanten från golvet, och golvets krafter (normalkraft och friktion) angriper då bara i P. De har alltså inget moment kring P.`) +
  ul(String.raw`Tyngdkraften $F_\mathrm{G} = m \cdot g$ angriper i tyngdpunkten, mitt i skåpet. Den är lodrät, så hävarmen $l_\mathrm{G}$ är det vågräta avståndet från P till tyngdpunkten, halva djupet: $l_\mathrm{G} = \dfrac{b}{2}$.`,
     String.raw`Kraften $F$ är vågrät, så hävarmen $l_F$ är det lodräta avståndet från P upp till överkanten, skåpets höjd: $l_F = h$.`) +
  fig(figSkapA(), String.raw`Hävarmarna till $F_\mathrm{G}$ och $F$ kring P. Krafterna är ritade i skala.`, true) +
  p(String.raw`$F$ vrider skåpet medurs kring P, alltså åt vältningshållet, och tyngdkraften vrider det moturs, tillbaka. Skåpet börjar välta när momenten är lika stora:`) +
  k(String.raw`\Mmot = \Mmed`) +
  ekv(String.raw`F_\mathrm{G} \cdot l_\mathrm{G} = F \cdot l_F`, 1) +
  p(String.raw`$F_\mathrm{G} = m \cdot g$, $l_\mathrm{G} = \dfrac{b}{2}$ och $l_F = h$ insatta i (1) ger`) +
  k(String.raw`m \cdot g \cdot \dfrac{b}{2} = F \cdot h`) +
  p(String.raw`Vi dividerar båda led med $h$:`) +
  k(String.raw`\dfrac{m \cdot g \cdot \dfrac{b}{2}}{\boldsymbol{h}} = \dfrac{F \cdot h}{\boldsymbol{h}}`) +
  k(String.raw`F = \dfrac{m \cdot g \cdot b}{2 \cdot h}`) +
  klammer(String.raw`m = 60\ \mathrm{kg}`, String.raw`b = 0{,}60\ \mathrm{m}`, String.raw`h = 1{,}80\ \mathrm{m}`) +
  k(String.raw`F = \dfrac{60 \cdot 9{,}82 \cdot 0{,}60}{2 \cdot 1{,}80}\ \mathrm{N} = ${tp(q3.Fa, 2)}\ \mathrm{N}`) +
  rim('Hävarmen för dragkraften är sex gånger så lång som tyngdkraftens, så kraften blir en sjättedel av tyngden, 589 N.') +
  svarRad(`Kraften måste vara minst 98${NB}N.`) +
  del('b') + '<div class="losrad"><div>' + p(String.raw`Tyngdkraftens moment kring P ändras inte. Momentlagen (1) gäller för en kraft $F$ i vilken riktning som helst, med hävarmen $l_F$ till just den kraften. Vi dividerar båda led i (1) med $l_F$:`) +
  k(String.raw`\dfrac{F_\mathrm{G} \cdot l_\mathrm{G}}{\boldsymbol{l_F}} = \dfrac{F \cdot l_F}{\boldsymbol{l_F}} \quad\Leftrightarrow\quad F = \dfrac{F_\mathrm{G} \cdot l_\mathrm{G}}{l_F}`) +
  p(String.raw`Täljaren är fast, så kraften blir minst när hävarmen $l_F$ är så stor som möjligt. Hävarmen är det vinkelräta avståndet från P till kraftens verkningslinje, och det kan aldrig bli längre än avståndet från P till angreppspunkten (den vinkelräta sträckan är alltid den kortaste). Den punkt på skåpet som ligger längst från P är det övre hörnet på motsatt sida. Om kraften verkar vinkelrätt mot diagonalen blir hela diagonalen hävarm.`) +
  p(String.raw`Diagonalen är hypotenusan i en rätvinklig triangel med kateterna $h$ och $b$. Enligt Pythagoras sats är`) +
  k(String.raw`l_F = \sqrt{h^2 + b^2} = \sqrt{1{,}80^2 + 0{,}60^2}\ \mathrm{m} = ${tp(q3.diag, 3)}\ \mathrm{m}`) +
  '</div>' + fig(figSkap(true), 'Största möjliga hävarm: diagonalen från P till det motsatta övre hörnet.', true) + '</div>' +
  p(String.raw`$l_F = \sqrt{h^2 + b^2}$, $F_\mathrm{G} = m \cdot g$ och $l_\mathrm{G} = \dfrac{b}{2}$ insatta i $F = \dfrac{F_\mathrm{G} \cdot l_\mathrm{G}}{l_F}$ ger`) +
  k(String.raw`F_\mathrm{min} = \dfrac{m \cdot g \cdot \dfrac{b}{2}}{\sqrt{h^2 + b^2}} = \dfrac{60 \cdot 9{,}82 \cdot 0{,}30}{${tp(q3.diag, 3)}}\ \mathrm{N} = ${tp(q3.Fb, 2)}\ \mathrm{N}`) +
  p(String.raw`Riktningen: diagonalen lutar vinkeln $\beta$ mot skåpets lodräta kant, där $b$ är motstående och $h$ närliggande katet: $\tan\beta = \dfrac{b}{h}$, så $\beta = \tan^{-1}\left(\dfrac{0{,}60}{1{,}80}\right) = ${tp(q3.vinkel, 2)}^\circ$. Kraften är vinkelrät mot diagonalen och den vågräta linjen vinkelrät mot kanten. Vinkeln mellan kraften och vågrätt blir därför också $\beta$, snett uppåt (se figuren).`) +
  rim(`Diagonalen är bara lite längre än höjden (1,90${NB}m mot 1,80${NB}m), så vinsten är liten: cirka 5${NB}%.`) +
  svarRad(`Kraften ska angripa i det övre hörnet längst från P och verka vinkelrätt mot diagonalen, 18° snett uppåt från vågrätt. Den minsta kraften är 93${NB}N.`),

  // 4 Klossen
  del('a') + p(String.raw`Vi räknar ut vid vilken lutning klossen skulle välta och vid vilken den skulle glida. Det som inträffar vid den minsta vinkeln händer först.`) +
  p(String.raw`<b>Vältning.</b> Klossen välter när lodlinjen genom tyngdpunkten hamnar utanför klossens nedre kant (se genomgången Stabilitet). För en jämntjock kloss med bredden $b$ och höjden $h$ sker det vid lutningsvinkeln $\alpha_\mathrm{v}$ där`) +
  k(String.raw`\tan\alpha_\mathrm{v} = \dfrac{b}{h} = \dfrac{12}{30} = 0{,}40 \quad\Leftrightarrow\quad \alpha_\mathrm{v} = \tan^{-1}(0{,}40) = ${tp(q4.aV, 2)}^\circ`) +
  p(String.raw`<b>Glidning.</b> Vi delar upp tyngdkraften i en komposant längs brädan och en vinkelrät mot brädan. Vinkeln mellan $F_\mathrm{G}$ och den vinkelräta komposanten är lika stor som brädans lutning $\alpha$ (se figuren). I den rätvinkliga triangeln där $F_\mathrm{G}$ är hypotenusa blir komposanterna $F_\mathrm{G} \cdot \sin\alpha$ längs brädan och $F_\mathrm{G} \cdot \cos\alpha$ vinkelrätt mot brädan.`) +
  fig(figKlossKraft(), String.raw`Krafterna på klossen, ritade i skala. Till höger är tyngdkraften uppdelad i sina två komposanter (streckade).`, 'bred') +
  p(String.raw`Vinkelrätt mot brädan rör sig klossen inte, så normalkraften tar ut den vinkelräta komposanten:`) +
  ekv(String.raw`F_\mathrm{N} = F_\mathrm{G} \cdot \cos\alpha`, 1) +
  p(String.raw`Friktionen kan som mest bli`) +
  ekv(String.raw`F_\mathrm{f,max} = \mu \cdot F_\mathrm{N}`, 2) +
  p(String.raw`$F_\mathrm{N} = F_\mathrm{G} \cdot \cos\alpha$ från (1) insatt i (2) ger`) +
  ekv(String.raw`F_\mathrm{f,max} = \mu \cdot F_\mathrm{G} \cdot \cos\alpha`, 3) +
  p(String.raw`Klossen glider när komposanten längs brädan blir större än den största friktionen (3):`) +
  k(String.raw`F_\mathrm{G} \cdot \sin\alpha > \mu \cdot F_\mathrm{G} \cdot \cos\alpha`) +
  p(String.raw`Vi dividerar båda led med $F_\mathrm{G} \cdot \cos\alpha$. Det är ett positivt tal, så olikhetstecknet vänds inte:`) +
  k(String.raw`\dfrac{F_\mathrm{G} \cdot \sin\alpha}{\boldsymbol{F_\mathrm{G} \cdot \cos\alpha}} > \dfrac{\mu \cdot F_\mathrm{G} \cdot \cos\alpha}{\boldsymbol{F_\mathrm{G} \cdot \cos\alpha}}`) +
  p(String.raw`$F_\mathrm{G}$ förkortas, och $\dfrac{\sin\alpha}{\cos\alpha} = \tan\alpha$:`) +
  k(String.raw`\tan\alpha > \mu`) +
  p(String.raw`Gränsen för glidning är alltså $\tan\alpha_\mathrm{g} = \mu$:`) +
  k(String.raw`\tan\alpha_\mathrm{g} = 0{,}45 \quad\Leftrightarrow\quad \alpha_\mathrm{g} = \tan^{-1}(0{,}45) = ${tp(q4.aG, 2)}^\circ`) +
  p(String.raw`Vältningsvinkeln nås först, eftersom $${t(q4.aV, 1)}^\circ < ${t(q4.aG, 1)}^\circ$. När brädan lutar 22° håller friktionen fortfarande klossen kvar, men tyngdpunktens lodlinje har redan hamnat utanför den nedre kanten.`) +
  svarRad(`Klossen välter, när brädan lutar cirka 22°.`) +
  del('b') + p(String.raw`Klossen glider först om glidvinkeln är mindre än vältningsvinkeln. För vinklar mellan 0° och 90° betyder större vinkel större tangensvärde, så vi kan jämföra tangensvärdena i stället: $\tan\alpha_\mathrm{g} < \tan\alpha_\mathrm{v}$. $\tan\alpha_\mathrm{g} = \mu$ och $\tan\alpha_\mathrm{v} = \dfrac{b}{h}$ insatta ger`) +
  k(String.raw`\mu < \dfrac{b}{h}`) +
  p(String.raw`Vi multiplicerar båda led med $h$:`) +
  k(String.raw`\mu \mathbin{\boldsymbol{\cdot}} \boldsymbol{h} < \dfrac{b}{h} \mathbin{\boldsymbol{\cdot}} \boldsymbol{h} \quad\Leftrightarrow\quad \mu \cdot h < b`) +
  p(String.raw`Vi dividerar båda led med $\mu$:`) +
  k(String.raw`\dfrac{\mu \cdot h}{\boldsymbol{\mu}} < \dfrac{b}{\boldsymbol{\mu}} \quad\Leftrightarrow\quad h < \dfrac{b}{\mu} = \dfrac{0{,}12}{0{,}45}\ \mathrm{m} = ${tp(q4.hmax, 3)}\ \mathrm{m}`) +
  rim(`En kloss som är 27${NB}cm hög välter och glider vid samma vinkel, 24°. Lägre klossar är stabilare och glider i stället.`) +
  svarRad(`Klossen får högst vara cirka 27${NB}cm hög.`),

  // 5 Rotorn
  del('a') + p(String.raw`Vi tittar på en passagerare när golvet har sänkts. Tre krafter verkar:`) +
  ul(String.raw`tyngdkraften $F_\mathrm{G} = m \cdot g$, nedåt`,
     String.raw`friktionskraften $F_\mathrm{f}$ från väggen, uppåt längs väggen`,
     String.raw`normalkraften $F_\mathrm{N}$ från väggen, vågrät och riktad in mot axeln.`) +
  fig(figRotorKraft(), String.raw`Krafterna på passageraren, ritade i skala i gränsfallet. Normalkraften är ensam om att peka in mot axeln och är därför centripetalkraften.`) +
  p(String.raw`Passageraren rör sig i en vågrät cirkel. I lodled rör hon sig inte, så där är det jämvikt:`) +
  ekv(String.raw`F_\mathrm{f} = F_\mathrm{G} = m \cdot g`, 1) +
  p(String.raw`I vågled verkar bara normalkraften. Den håller passageraren i cirkelbanan och är alltså centripetalkraften:`) +
  ekv(String.raw`F_\mathrm{N} = F_\mathrm{C} = \dfrac{m \cdot v^2}{r}`, 2) +
  p(String.raw`Friktionen kan som mest bli $\mu \cdot F_\mathrm{N}$. Passageraren sitter kvar om den friktion som behövs inte är större än den största möjliga:`) +
  ekv(String.raw`F_\mathrm{f} \leq \mu \cdot F_\mathrm{N}`, 3) +
  p(String.raw`Den lägsta farten får vi i gränsfallet, när likhet gäller i (3). $F_\mathrm{f} = m \cdot g$ från (1) och $F_\mathrm{N} = \dfrac{m \cdot v^2}{r}$ från (2) insatta i (3) ger`) +
  k(String.raw`m \cdot g = \mu \cdot \dfrac{m \cdot v^2}{r}`) +
  p(String.raw`Vi löser ut $v$. Först multiplicerar vi båda led med $r$:`) +
  k(String.raw`m \cdot g \mathbin{\boldsymbol{\cdot}} \boldsymbol{r} = \mu \cdot \dfrac{m \cdot v^2}{r} \mathbin{\boldsymbol{\cdot}} \boldsymbol{r} \quad\Leftrightarrow\quad m \cdot g \cdot r = \mu \cdot m \cdot v^2`) +
  p(String.raw`Sedan dividerar vi båda led med $\mu \cdot m$:`) +
  k(String.raw`\dfrac{m \cdot g \cdot r}{\boldsymbol{\mu \cdot m}} = \dfrac{\mu \cdot m \cdot v^2}{\boldsymbol{\mu \cdot m}} \quad\Leftrightarrow\quad v^2 = \dfrac{g \cdot r}{\mu}`) +
  p(String.raw`Farten är positiv, så vi drar roten ur båda led:`) +
  ekv(String.raw`v = \sqrt{\dfrac{g \cdot r}{\mu}}`, 4) +
  klammer(String.raw`r = 2{,}4\ \mathrm{m}`, String.raw`\mu = 0{,}40`) +
  k(String.raw`v = \sqrt{\dfrac{9{,}82 \cdot 2{,}4}{0{,}40}}\ \mathrm{m/s} = ${tp(r5.v, 3)}\ \mathrm{m/s}`) +
  p(String.raw`Under ett varv, omloppstiden $T$, går passageraren runt en cirkel med omkretsen $2\pi r$. Farten är sträcka delad med tid, $v = \dfrac{2\pi r}{T}$. Vi multiplicerar båda led med $T$ och dividerar sedan båda led med $v$:`) +
  k(String.raw`v \mathbin{\boldsymbol{\cdot}} \boldsymbol{T} = \dfrac{2\pi r}{T} \mathbin{\boldsymbol{\cdot}} \boldsymbol{T} \quad\Leftrightarrow\quad v \cdot T = 2\pi r`) +
  k(String.raw`\dfrac{v \cdot T}{\boldsymbol{v}} = \dfrac{2\pi r}{\boldsymbol{v}} \quad\Leftrightarrow\quad T = \dfrac{2\pi r}{v} = \dfrac{2\pi \cdot 2{,}4}{${tp(r5.v, 3)}}\ \mathrm{s} = ${tp(r5.T, 3)}\ \mathrm{s}`) +
  p(String.raw`Antalet varv per minut är antalet omloppstider som ryms i en minut:`) +
  k(String.raw`\dfrac{60\ \mathrm{s}}{T} = \dfrac{60\ \mathrm{s}}{${tp(r5.T, 3)}\ \mathrm{s}} = ${tp(r5.n, 2)}`) +
  rim(`Ett varv på knappt två sekunder och farten ${h(r5.v * 3.6, 0)}${NB}km/h låter rimligt för en sådan attraktion.`) +
  svarRad(`Cylindern måste rotera med minst cirka 31 varv per minut.`) +
  del('b') + p(String.raw`I a) förkortades massan $m$ bort i ekvationen $m \cdot g = \mu \cdot \dfrac{m \cdot v^2}{r}$, och den minsta farten (4) innehåller bara $g$, $r$ och $\mu$. En tyngre passagerare behöver visserligen mer friktion, men pressas också hårdare mot väggen, i exakt samma proportion. Normalkraften är hela tiden $\dfrac{1}{\mu} = 2{,}5$ gånger tyngden.`) +
  svarRad(`Villkoret är detsamma för ett litet barn och en tung vuxen. Därför räcker ett och samma varvtal för att alla ska sitta kvar när golvet sänks.`),

  // 6 Loopen
  fig(figLoopKraft(), String.raw`Vänster: i högsta punkten pekar båda krafterna nedåt, mot loopens centrum. Höger: i lägsta punkten i b), ritad i skala, där $F_\mathrm{N}$ är sex gånger $F_\mathrm{G}$.`, 'bred') +
  del('a') + p(String.raw`Risken att tappa kontakten är störst i loopens högsta punkt, där farten är lägst. Vagnen kör på insidan av loopen, så i toppen är banan ovanför vagnen. Där verkar tyngdkraften $F_\mathrm{G} = m \cdot g$ och banans normalkraft $F_\mathrm{N}$, båda nedåt mot loopens centrum. Tillsammans utgör de centripetalkraften:`) +
  ekv(String.raw`m \cdot g + F_\mathrm{N} = \dfrac{m \cdot v_\mathrm{topp}^2}{r}`, 1) +
  p(String.raw`Banan kan bara trycka på vagnen, aldrig dra i den. Vagnen har alltså kontakt med banan så länge $F_\mathrm{N} \geq 0$. Vi löser ut $F_\mathrm{N}$ ur (1) genom att subtrahera $m \cdot g$ från båda led:`) +
  k(String.raw`m \cdot g + F_\mathrm{N} \mathbin{\boldsymbol{-}} \boldsymbol{m \cdot g} = \dfrac{m \cdot v_\mathrm{topp}^2}{r} \mathbin{\boldsymbol{-}} \boldsymbol{m \cdot g} \quad\Leftrightarrow\quad F_\mathrm{N} = \dfrac{m \cdot v_\mathrm{topp}^2}{r} - m \cdot g`) +
  p(String.raw`Villkoret $F_\mathrm{N} \geq 0$ blir`) +
  k(String.raw`\dfrac{m \cdot v_\mathrm{topp}^2}{r} - m \cdot g \geq 0`) +
  p(String.raw`Vi adderar $m \cdot g$ till båda led och multiplicerar sedan båda led med $\dfrac{r}{m}$:`) +
  k(String.raw`\dfrac{m \cdot v_\mathrm{topp}^2}{r} - m \cdot g \mathbin{\boldsymbol{+}} \boldsymbol{m \cdot g} \geq 0 \mathbin{\boldsymbol{+}} \boldsymbol{m \cdot g} \quad\Leftrightarrow\quad \dfrac{m \cdot v_\mathrm{topp}^2}{r} \geq m \cdot g`) +
  k(String.raw`\dfrac{m \cdot v_\mathrm{topp}^2}{r} \mathbin{\boldsymbol{\cdot}} \boldsymbol{\dfrac{r}{m}} \geq m \cdot g \mathbin{\boldsymbol{\cdot}} \boldsymbol{\dfrac{r}{m}}`) +
  ekv(String.raw`v_\mathrm{topp}^2 \geq g \cdot r`, 2) +
  p(String.raw`Farten i toppen får vi ur energiprincipen. Vagnen startar i vila på höjden $h$, och toppen ligger på höjden $2r$ (loopens diameter). Utan energiförluster är den totala energin densamma i båda lägena:`) +
  k(String.raw`E_\mathrm{p,start} + E_\mathrm{k,start} = E_\mathrm{p,topp} + E_\mathrm{k,topp}`) +
  k(String.raw`m \cdot g \cdot h + 0 = m \cdot g \cdot 2r + \dfrac{m \cdot v_\mathrm{topp}^2}{2}`) +
  p(String.raw`Vi subtraherar $m \cdot g \cdot 2r$ från båda led:`) +
  k(String.raw`m \cdot g \cdot h \mathbin{\boldsymbol{-}} \boldsymbol{m \cdot g \cdot 2r} = m \cdot g \cdot 2r + \dfrac{m \cdot v_\mathrm{topp}^2}{2} \mathbin{\boldsymbol{-}} \boldsymbol{m \cdot g \cdot 2r}`) +
  k(String.raw`m \cdot g \cdot (h - 2r) = \dfrac{m \cdot v_\mathrm{topp}^2}{2}`) +
  p(String.raw`Vi multiplicerar båda led med $\dfrac{2}{m}$:`) +
  k(String.raw`\boldsymbol{\dfrac{2}{m}} \mathbin{\boldsymbol{\cdot}} m \cdot g \cdot (h - 2r) = \boldsymbol{\dfrac{2}{m}} \mathbin{\boldsymbol{\cdot}} \dfrac{m \cdot v_\mathrm{topp}^2}{2}`) +
  ekv(String.raw`2g \cdot (h - 2r) = v_\mathrm{topp}^2`, 3) +
  p(String.raw`$v_\mathrm{topp}^2 = 2g \cdot (h - 2r)$ från (3) insatt i villkoret (2) ger`) +
  k(String.raw`2g \cdot (h - 2r) \geq g \cdot r`) +
  p(String.raw`Vi dividerar båda led med $2g$ och adderar sedan $2r$ till båda led:`) +
  k(String.raw`\dfrac{2g \cdot (h - 2r)}{\boldsymbol{2g}} \geq \dfrac{g \cdot r}{\boldsymbol{2g}} \quad\Leftrightarrow\quad h - 2r \geq \dfrac{r}{2}`) +
  k(String.raw`h - 2r \mathbin{\boldsymbol{+}} \boldsymbol{2r} \geq \dfrac{r}{2} \mathbin{\boldsymbol{+}} \boldsymbol{2r} \quad\Leftrightarrow\quad h \geq 2{,}5 \cdot r`) +
  p('Det var det som skulle visas. Massan och $g$ har förkortats bort, så villkoret gäller alla vagnar.') +
  del('b') + p(String.raw`Vagnen släpps från $h = 2{,}5 \cdot r$. Farten $v$ i lägsta punkten (höjden 0) ger energiprincipen:`) +
  k(String.raw`m \cdot g \cdot h = \dfrac{m \cdot v^2}{2}`) +
  p(String.raw`Vi multiplicerar båda led med $\dfrac{2}{m}$:`) +
  k(String.raw`\boldsymbol{\dfrac{2}{m}} \mathbin{\boldsymbol{\cdot}} m \cdot g \cdot h = \boldsymbol{\dfrac{2}{m}} \mathbin{\boldsymbol{\cdot}} \dfrac{m \cdot v^2}{2} \quad\Leftrightarrow\quad v^2 = 2g \cdot h`) +
  p(String.raw`$h = 2{,}5 \cdot r$ insatt ger`) +
  ekv(String.raw`v^2 = 2g \cdot 2{,}5 \cdot r = 5g \cdot r`, 4) +
  p(String.raw`I lägsta punkten verkar normalkraften $F_\mathrm{N}$ uppåt, mot centrum, och tyngdkraften nedåt. Resultanten är centripetalkraften, riktad uppåt mot centrum:`) +
  ekv(String.raw`F_\mathrm{N} - m \cdot g = \dfrac{m \cdot v^2}{r}`, 5) +
  p(String.raw`$v^2 = 5g \cdot r$ från (4) insatt i (5) ger`) +
  k(String.raw`F_\mathrm{N} - m \cdot g = \dfrac{m \cdot 5g \cdot r}{r} = 5m \cdot g`) +
  p(String.raw`Vi adderar $m \cdot g$ till båda led:`) +
  k(String.raw`F_\mathrm{N} - m \cdot g \mathbin{\boldsymbol{+}} \boldsymbol{m \cdot g} = 5m \cdot g \mathbin{\boldsymbol{+}} \boldsymbol{m \cdot g} \quad\Leftrightarrow\quad F_\mathrm{N} = 6m \cdot g`) +
  k(String.raw`F_\mathrm{N} = 6 \cdot 60 \cdot 9{,}82\ \mathrm{N} = ${t(l6.FN, 1)}\ \mathrm{N}`) +
  rim(`Radien förkortades bort, så svaret blir detsamma för alla cirkelformade looppar. Sex gånger tyngden är så mycket att riktiga berg- och dalbanor har droppformade looppar, med större krökningsradie längst ned.`) +
  svarRad(`Sätet trycker med 3,5${NB}kN, sex gånger passagerarens tyngd (${h(l6.FG, 0)}${NB}N).`),

  // 7 Himlakroppen
  fig(figPlanet(), String.raw`Sonden (massan $m$) i en bana strax ovanför ytan. Gravitationskraften är riktad mot himlakroppens centrum.`, true) +
  del('a') + p(String.raw`Den enda kraften på sonden är gravitationskraften från himlakroppen (massan $M$, radien $R$). Den är riktad mot centrum och håller sonden i cirkelbanan, så den är centripetalkraften. Enligt gravitationslagen och formeln för centripetalkraft:`) +
  ekv(String.raw`F_\mathrm{G} = G \cdot \dfrac{M \cdot m}{R^2}`, 1) +
  ekv(String.raw`F_\mathrm{C} = \dfrac{m \cdot v^2}{R}`, 2) +
  p(String.raw`Farten får vi ur omloppstiden. På tiden $T$ går sonden ett varv, en cirkel med omkretsen $2\pi R$:`) +
  ekv(String.raw`v = \dfrac{2\pi \cdot R}{T}`, 3) +
  p(String.raw`$v = \dfrac{2\pi \cdot R}{T}$ från (3) insatt i (2) ger`) +
  ekv(String.raw`F_\mathrm{C} = \dfrac{m}{R} \cdot \left(\dfrac{2\pi \cdot R}{T}\right)^2 = \dfrac{m}{R} \cdot \dfrac{4\pi^2 \cdot R^2}{T^2} = \dfrac{4\pi^2 \cdot m \cdot R}{T^2}`, 4) +
  p(String.raw`Gravitationskraften (1) är centripetalkraften (4):`) +
  k(String.raw`G \cdot \dfrac{M \cdot m}{R^2} = \dfrac{4\pi^2 \cdot m \cdot R}{T^2}`) +
  p(String.raw`Vi löser ut $M$ genom att multiplicera båda led med $\dfrac{R^2}{G \cdot m}$:`) +
  k(String.raw`\boldsymbol{\dfrac{R^2}{G \cdot m}} \mathbin{\boldsymbol{\cdot}} G \cdot \dfrac{M \cdot m}{R^2} = \boldsymbol{\dfrac{R^2}{G \cdot m}} \mathbin{\boldsymbol{\cdot}} \dfrac{4\pi^2 \cdot m \cdot R}{T^2}`) +
  ekv(String.raw`M = \dfrac{4\pi^2 \cdot R^3}{G \cdot T^2}`, 5) +
  p(String.raw`Densiteten är massan delad med volymen, $\rho = \dfrac{M}{V}$. Himlakroppen är ett klot:`) +
  ekv(String.raw`V = \dfrac{4\pi \cdot R^3}{3}`, 6) +
  p(String.raw`$M$ från (5) och $V$ från (6) insatta i $\rho = \dfrac{M}{V}$ ger ett bråk delat med ett bråk. Att dividera med ett bråk är samma sak som att multiplicera med det inverterade bråket:`) +
  k(String.raw`\rho = \dfrac{\dfrac{4\pi^2 \cdot R^3}{G \cdot T^2}}{\dfrac{4\pi \cdot R^3}{3}} = \dfrac{4\pi^2 \cdot R^3}{G \cdot T^2} \cdot \dfrac{3}{4\pi \cdot R^3} = \dfrac{3\pi}{G \cdot T^2}`) +
  p(String.raw`I sista steget förkortas $4\pi$ och $R^3$. Radien försvinner, så omloppstiden räcker. Det var det som skulle visas.`) +
  del('b') + klammer(String.raw`T = 108\ \mathrm{min} = 108 \cdot 60\ \mathrm{s} = 6\,480\ \mathrm{s}`, String.raw`G = 6{,}674 \cdot 10^{-11}\ \mathrm{Nm^2/kg^2}`) +
  k(String.raw`\rho = \dfrac{3\pi}{6{,}674 \cdot 10^{-11} \cdot 6\,480^2}\ \mathrm{kg/m^3} = ${tp(p7.rho, 1)}\ \mathrm{kg/m^3}`) +
  rim(`Värdet ligger nära stenens, långt från både isens och järnets. Månen har medeldensiteten 3${NB}340${NB}kg/m³, och en sond i låg bana runt månen gör just ett varv på knappt två timmar. Himlakroppen kan mycket väl vara månen.`) +
  svarRad(String.raw`Medeldensiteten är $3{,}36 \cdot 10^{3}\ \mathrm{kg/m^3}$. Himlakroppen består troligen mest av sten.`),

  // 8 Kedjekarusellen
  p(String.raw`Personen med stolen rör sig i en vågrät cirkel runt karusellens axel. Två krafter verkar: tyngdkraften $F_\mathrm{G} = m \cdot g$ nedåt och kraften $F_\mathrm{S}$ från kedjan, riktad längs kedjan. Deras resultant är centripetalkraften $F_\mathrm{C}$, vågrät och riktad mot axeln.`) +
  fig(figKarusellKraft(), String.raw`Banradien $r$ och krafterna på personen, ritade i skala. $F_\mathrm{S}$, $F_\mathrm{G}$ och den streckade resultanten $F_\mathrm{C}$ bildar en rätvinklig krafttriangel.`) +
  del('a') + p(String.raw`I krafttriangeln är vinkeln mellan $F_\mathrm{S}$ och lodlinjen samma som kedjans vinkel $\alpha$. $F_\mathrm{C}$ är motstående katet och $F_\mathrm{G}$ närliggande katet till $\alpha$:`) +
  ekv(String.raw`\tan\alpha = \dfrac{F_\mathrm{C}}{F_\mathrm{G}}`, 1) +
  p(String.raw`$F_\mathrm{C} = \dfrac{m \cdot v^2}{r}$ och $F_\mathrm{G} = m \cdot g$ insatta i (1) ger`) +
  k(String.raw`\tan\alpha = \dfrac{\dfrac{m \cdot v^2}{r}}{m \cdot g} = \dfrac{m \cdot v^2}{r} \cdot \dfrac{1}{m \cdot g} = \dfrac{v^2}{g \cdot r}`) +
  p(String.raw`Massan förkortas bort. Vi löser ut $v$ genom att multiplicera båda led med $g \cdot r$ och sedan dra roten ur:`) +
  k(String.raw`\tan\alpha \mathbin{\boldsymbol{\cdot}} \boldsymbol{g \cdot r} = \dfrac{v^2}{g \cdot r} \mathbin{\boldsymbol{\cdot}} \boldsymbol{g \cdot r} \quad\Leftrightarrow\quad v^2 = g \cdot r \cdot \tan\alpha`) +
  ekv(String.raw`v = \sqrt{g \cdot r \cdot \tan\alpha}`, 2) +
  p(String.raw`Banradien $r$ är avståndet från axeln till stolen (figuren). Kedjan sitter $d$ ut från axeln, och stolen hänger dessutom $l \cdot \sin\alpha$ längre ut: det är den motstående kateten till $\alpha$ i triangeln som kedjan bildar med lodlinjen.`) +
  klammer(String.raw`d = 3{,}0\ \mathrm{m}`, String.raw`l = 5{,}0\ \mathrm{m}`, String.raw`\alpha = 40^\circ`) +
  k(String.raw`r = d + l \cdot \sin\alpha = (3{,}0 + 5{,}0 \cdot \sin 40^\circ)\ \mathrm{m} = ${tp(c8.r, 3)}\ \mathrm{m}`) +
  p(String.raw`$r$ insatt i (2):`) +
  k(String.raw`v = \sqrt{9{,}82 \cdot ${tp(c8.r, 3)} \cdot \tan 40^\circ}\ \mathrm{m/s} = ${tp(c8.v, 3)}\ \mathrm{m/s}`) +
  p(String.raw`Ett varv är sträckan $2\pi r$. Farten är sträcka delad med tid, $v = \dfrac{2\pi r}{T}$, så omloppstiden är (samma omskrivning som i uppgift 4)`) +
  k(String.raw`T = \dfrac{2\pi \cdot r}{v} = \dfrac{2\pi \cdot ${tp(c8.r, 3)}}{${tp(c8.v, 3)}}\ \mathrm{s} = ${tp(c8.T, 3)}\ \mathrm{s}`) +
  rim('Kedjekaruseller snurrar ungefär tio varv per minut, alltså ett varv på omkring sex sekunder.') +
  svarRad(`Ett varv tar 5,5${NB}s.`) +
  del('b') + p(String.raw`Formeln för den koniska pendeln förutsätter att snöret är fäst på rotationsaxeln. Då är banradien bara $l \cdot \sin\alpha = ${t(c8.rfel, 1)}\ \mathrm{m}$, men här är den $${t(c8.r, 1)}\ \mathrm{m}$, eftersom kedjan hänger 3,0${NB}m ut från axeln.`) +
  p(String.raw`Hur radien påverkar omloppstiden ser vi om vi sätter in $v = \dfrac{2\pi r}{T}$ i sambandet $\tan\alpha = \dfrac{v^2}{g \cdot r}$ från a):`) +
  k(String.raw`\tan\alpha = \dfrac{\left(\dfrac{2\pi r}{T}\right)^2}{g \cdot r} = \dfrac{4\pi^2 \cdot r^2}{T^2} \cdot \dfrac{1}{g \cdot r} = \dfrac{4\pi^2 \cdot r}{g \cdot T^2}`) +
  p(String.raw`Vinkeln är densamma i båda fallen, så $\dfrac{r}{T^2}$ måste vara lika stort. Större radie kräver då längre omloppstid. Eleven räknar med för liten radie och får därför för kort tid:`) +
  k(String.raw`T_\mathrm{elev} = 2\pi \sqrt{\frac{5{,}0 \cdot \cos 40^\circ}{9{,}82}}\ \mathrm{s} = ${tp(c8.Tfel, 2)}\ \mathrm{s}`) +
  svarRad(`Formeln räknar med fel banradie. Elevens svar, 3,9${NB}s, blir för kort.`) +
  del('c') + p(String.raw`Lodrätt rör sig personen inte, så kedjans lodräta komposant bär tyngden. I krafttriangeln är den lodräta komposanten närliggande katet till $\alpha$, $F_\mathrm{S} \cdot \cos\alpha$:`) +
  k(String.raw`F_\mathrm{S} \cdot \cos\alpha = m \cdot g`) +
  p(String.raw`Vi dividerar båda led med $\cos\alpha$:`) +
  k(String.raw`\dfrac{F_\mathrm{S} \cdot \cos\alpha}{\boldsymbol{\cos\alpha}} = \dfrac{m \cdot g}{\boldsymbol{\cos\alpha}} \quad\Leftrightarrow\quad F_\mathrm{S} = \dfrac{m \cdot g}{\cos\alpha} = \dfrac{70 \cdot 9{,}82}{\cos 40^\circ}\ \mathrm{N} = ${tp(c8.FS, 1)}\ \mathrm{N}`) +
  rim(`Kraften är ${h(c8.FS / c8.FG, 1)} gånger tyngden, ${h(c8.FG, 0)}${NB}N. Personen känner sig alltså tyngre än vanligt, vilket stämmer med upplevelsen.`) +
  svarRad(`Kedjan drar med 0,90${NB}kN.`),

  // 9 Basket
  p(String.raw`Vi lägger origo i utkastpunkten, med $x$-axeln vågrätt mot korgen och $y$-axeln uppåt. Ringens mitt ligger då i punkten $x = 4{,}60\ \mathrm{m}$, $y = (3{,}05 - 2{,}10)\ \mathrm{m} = 0{,}95\ \mathrm{m}$.`) +
  fig(figBasketKoord(), String.raw`Koordinatsystemet med origo i utkastpunkten. Vid ringen är hastigheten $v$ uppdelad i komposanterna $v_x$ och $v_y$.`, 'bred') +
  del('a') + p(String.raw`Utan luftmotstånd rör sig bollen med konstant hastighet i $x$-led och med accelerationen $g$ nedåt i $y$-led:`) +
  ekv(String.raw`x = v_0 \cdot \cos\alpha \cdot t`, 1) +
  ekv(String.raw`y = v_0 \cdot \sin\alpha \cdot t - \dfrac{g \cdot t^2}{2}`, 2) +
  p(String.raw`Kastvidden i formelsamlingen gäller inte, eftersom bollen landar högre än den kastas. Vi känner inte tiden $t$, så vi löser ut den ur (1) genom att dividera båda led med $v_0 \cdot \cos\alpha$:`) +
  k(String.raw`\dfrac{x}{\boldsymbol{v_0 \cdot \cos\alpha}} = \dfrac{v_0 \cdot \cos\alpha \cdot t}{\boldsymbol{v_0 \cdot \cos\alpha}}`) +
  ekv(String.raw`t = \dfrac{x}{v_0 \cdot \cos\alpha}`, 3) +
  p(String.raw`$t = \dfrac{x}{v_0 \cdot \cos\alpha}$ från (3) insatt i (2) ger`) +
  k(String.raw`y = v_0 \cdot \sin\alpha \cdot \dfrac{x}{v_0 \cdot \cos\alpha} - \dfrac{g}{2} \cdot \left(\dfrac{x}{v_0 \cdot \cos\alpha}\right)^2`) +
  p(String.raw`I första termen förkortas $v_0$, och $\dfrac{\sin\alpha}{\cos\alpha} = \tan\alpha$. I andra termen kvadreras bråket:`) +
  ekv(String.raw`y = x \cdot \tan\alpha - \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha}`, 4) +
  p(String.raw`Nu löser vi ut $v_0$ ur (4), en operation i taget. Vi adderar $\dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha}$ till båda led:`) +
  k(String.raw`y \mathbin{\boldsymbol{+}} \boldsymbol{\dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha}} = x \cdot \tan\alpha - \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha} \mathbin{\boldsymbol{+}} \boldsymbol{\dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha}}`) +
  k(String.raw`y + \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha} = x \cdot \tan\alpha`) +
  p(String.raw`Vi subtraherar $y$ från båda led:`) +
  k(String.raw`y + \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha} \mathbin{\boldsymbol{-}} \boldsymbol{y} = x \cdot \tan\alpha \mathbin{\boldsymbol{-}} \boldsymbol{y} \quad\Leftrightarrow\quad \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha} = x \cdot \tan\alpha - y`) +
  p(String.raw`Vi multiplicerar båda led med $v_0^2$:`) +
  k(String.raw`\boldsymbol{v_0^2} \mathbin{\boldsymbol{\cdot}} \dfrac{g \cdot x^2}{2 v_0^2 \cdot \cos^2\alpha} = \boldsymbol{v_0^2} \mathbin{\boldsymbol{\cdot}} (x \cdot \tan\alpha - y) \quad\Leftrightarrow\quad \dfrac{g \cdot x^2}{2\cos^2\alpha} = v_0^2 \cdot (x \cdot \tan\alpha - y)`) +
  p(String.raw`Vi dividerar båda led med $(x \cdot \tan\alpha - y)$:`) +
  k(String.raw`\dfrac{g \cdot x^2}{2\cos^2\alpha \mathbin{\boldsymbol{\cdot}} \boldsymbol{(x \cdot \tan\alpha - y)}} = \dfrac{v_0^2 \cdot (x \cdot \tan\alpha - y)}{\boldsymbol{(x \cdot \tan\alpha - y)}} \quad\Leftrightarrow\quad v_0^2 = \dfrac{g \cdot x^2}{2\cos^2\alpha \cdot (x \cdot \tan\alpha - y)}`) +
  p(String.raw`Farten är positiv, så vi drar roten ur båda led:`) +
  k(String.raw`v_0 = \sqrt{\dfrac{g \cdot x^2}{2\cos^2\alpha \cdot (x \cdot \tan\alpha - y)}}`) +
  klammer(String.raw`x = 4{,}60\ \mathrm{m}`, String.raw`y = 0{,}95\ \mathrm{m}`, String.raw`\alpha = 52^\circ`) +
  k(String.raw`v_0 = \sqrt{\dfrac{9{,}82 \cdot 4{,}60^2}{2\cos^2 52^\circ \cdot (4{,}60 \cdot \tan 52^\circ - 0{,}95)}}\ \mathrm{m/s} = ${tp(u9.v0, 3)}\ \mathrm{m/s}`) +
  rim(`Bollen når som högst ${h(u9.ytop, 2)}${NB}m över golvet, ${h(u9.xtop, 1)}${NB}m från utkastpunkten, och är alltså på väg ned när den når ringen. Farten motsvarar ${h(u9.v0 * 3.6, 0)}${NB}km/h, ett lagom hårt kast.`) +
  svarRad(`Bollen ska kastas med farten 7,5${NB}m/s.`) +
  del('b') + p(String.raw`Tiden fram till ringen får vi ur (3), med $v_0$ från a):`) +
  k(String.raw`t = \dfrac{x}{v_0 \cdot \cos\alpha} = \dfrac{4{,}60}{${tp(u9.v0, 3)} \cdot \cos 52^\circ}\ \mathrm{s} = ${tp(u9.t, 4)}\ \mathrm{s}`) +
  p(String.raw`Hastigheten i $x$-led är konstant. I $y$-led minskar den med $g$ varje sekund:`) +
  k(String.raw`v_x = v_0 \cdot \cos\alpha = ${tp(u9.v0, 3)} \cdot \cos 52^\circ\ \mathrm{m/s} = ${tp(u9.vx, 3)}\ \mathrm{m/s}`) +
  k(String.raw`v_y = v_0 \cdot \sin\alpha - g \cdot t = (${tp(u9.v0, 3)} \cdot \sin 52^\circ - 9{,}82 \cdot ${tp(u9.t, 4)})\ \mathrm{m/s} = ${tp(u9.vy, 3)}\ \mathrm{m/s}`) +
  p(String.raw`Minustecknet visar att bollen rör sig nedåt. I figurens hastighetstriangel är $|v_y|$ motstående och $v_x$ närliggande katet till vinkeln $\beta$ under vågrätt:`) +
  k(String.raw`\tan\beta = \dfrac{|v_y|}{v_x} = \dfrac{${tp(-u9.vy, 3)}}{${tp(u9.vx, 3)}} \quad\Leftrightarrow\quad \beta = ${tp(u9.fi, 2)}^\circ`) +
  rim('Bollen landar flackare än den kastas, eftersom ringen ligger högre än utkastpunkten. Ett brantare fall hade gett en större öppning att träffa.') +
  svarRad(`Bollen kommer ned med vinkeln 41° mot vågrätt.`),

  // 10 Backhopparen
  p(String.raw`Vi lägger origo O i hoppets kant, med $x$-axeln vågrätt framåt och $y$-axeln <b>nedåt</b>, så att fallsträckan blir positiv. Backens lutning kallar vi $\alpha = 35^\circ$.`) +
  fig(figBackhoppKoord(), String.raw`Hopparen landar i punkten $(x, y)$ på backen, sträckan $s$ från kanten. Till höger: hastigheten vid landningen.`, 'bred') +
  del('a') + p(String.raw`Hopparen lämnar hoppet vågrätt, så hastigheten har från början bara en $x$-komposant. I $x$-led är hastigheten konstant och i $y$-led faller hopparen fritt:`) +
  ekv(String.raw`x = v_0 \cdot t`, 1) +
  ekv(String.raw`y = \dfrac{g \cdot t^2}{2}`, 2) +
  p(String.raw`Landningspunkten ligger på backen. I den rätvinkliga triangeln i figuren är $y$ motstående och $x$ närliggande katet till $\alpha$, så $\tan\alpha = \dfrac{y}{x}$. Vi multiplicerar båda led med $x$:`) +
  ekv(String.raw`y = x \cdot \tan\alpha`, 3) +
  p(String.raw`$x = v_0 \cdot t$ från (1) och $y = \dfrac{g \cdot t^2}{2}$ från (2) insatta i (3) ger`) +
  k(String.raw`\dfrac{g \cdot t^2}{2} = v_0 \cdot t \cdot \tan\alpha`) +
  p(String.raw`Vi dividerar båda led med $t$. Det går eftersom $t \neq 0$ vid landningen (lösningen $t = 0$ är avfärden):`) +
  k(String.raw`\dfrac{g \cdot t^2}{2 \boldsymbol{t}} = \dfrac{v_0 \cdot t \cdot \tan\alpha}{\boldsymbol{t}} \quad\Leftrightarrow\quad \dfrac{g \cdot t}{2} = v_0 \cdot \tan\alpha`) +
  p(String.raw`Vi multiplicerar båda led med $\dfrac{2}{g}$:`) +
  k(String.raw`\boldsymbol{\dfrac{2}{g}} \mathbin{\boldsymbol{\cdot}} \dfrac{g \cdot t}{2} = \boldsymbol{\dfrac{2}{g}} \mathbin{\boldsymbol{\cdot}} v_0 \cdot \tan\alpha`) +
  ekv(String.raw`t = \dfrac{2 v_0 \cdot \tan\alpha}{g}`, 4) +
  klammer(String.raw`v_0 = 26\ \mathrm{m/s}`, String.raw`\alpha = 35^\circ`) +
  k(String.raw`t = \dfrac{2 \cdot 26 \cdot \tan 35^\circ}{9{,}82}\ \mathrm{s} = ${tp(h10.t, 3)}\ \mathrm{s}`) +
  p(String.raw`$t$ insatt i (1):`) +
  k(String.raw`x = v_0 \cdot t = 26 \cdot ${tp(h10.t, 3)}\ \mathrm{m} = ${tp(h10.x, 2)}\ \mathrm{m}`) +
  p(String.raw`Sträckan $s$ längs backen är hypotenusan, och $x$ är närliggande katet till $\alpha$: $\cos\alpha = \dfrac{x}{s}$. Vi multiplicerar båda led med $s$ och dividerar sedan båda led med $\cos\alpha$:`) +
  k(String.raw`\cos\alpha \mathbin{\boldsymbol{\cdot}} \boldsymbol{s} = \dfrac{x}{s} \mathbin{\boldsymbol{\cdot}} \boldsymbol{s} \quad\Leftrightarrow\quad s \cdot \cos\alpha = x`) +
  ekv(String.raw`\dfrac{s \cdot \cos\alpha}{\boldsymbol{\cos\alpha}} = \dfrac{x}{\boldsymbol{\cos\alpha}} \quad\Leftrightarrow\quad s = \dfrac{x}{\cos\alpha}`, 5) +
  k(String.raw`s = \dfrac{${tp(h10.x, 2)}}{\cos 35^\circ}\ \mathrm{m} = ${tp(h10.s, 1)}\ \mathrm{m}`) +
  rim('Hopp på 110 till 140 meter är vanliga i stora backar. Riktiga hoppare svävar dessutom en del på luften.') +
  svarRad(`Hopparen landar cirka 120${NB}m ned i backen.`) +
  del('b') + p(String.raw`Vi tar reda på hur $s$ beror på $v_0$. $x = v_0 \cdot t$ från (1) insatt i (5), och sedan $t$ från (4), ger`) +
  k(String.raw`s = \dfrac{v_0 \cdot t}{\cos\alpha} = \dfrac{v_0}{\cos\alpha} \cdot \dfrac{2 v_0 \cdot \tan\alpha}{g} = \dfrac{2 v_0^2 \cdot \tan\alpha}{g \cdot \cos\alpha}`) +
  p(String.raw`Allt utom $v_0^2$ är detsamma i båda hoppen, så hopplängden är proportionell mot $v_0^2$. Blir farten $1{,}10$ gånger så stor blir hoppet $1{,}10^2 = 1{,}21$ gånger så långt, cirka ${h(h10.s2, 0)}${NB}m.`) +
  svarRad(`Hoppet blir 21${NB}% längre.`) +
  del('c') + p(String.raw`Vid landningen är $v_x = v_0$, eftersom hastigheten i $x$-led är konstant. I $y$-led ökar hastigheten med $g$ varje sekund från noll, $v_y = g \cdot t$. $t$ från (4) insatt ger`) +
  k(String.raw`v_y = g \cdot \dfrac{2 v_0 \cdot \tan\alpha}{g} = 2 v_0 \cdot \tan\alpha`) +
  p(String.raw`Hastighetens vinkel $\beta$ under vågrätt: i hastighetstriangeln till höger i figuren är $v_y$ motstående och $v_x$ närliggande katet. $v_y = 2 v_0 \cdot \tan\alpha$ och $v_x = v_0$ insatta ger`) +
  k(String.raw`\tan\beta = \dfrac{v_y}{v_x} = \dfrac{2 v_0 \cdot \tan\alpha}{v_0} = 2\tan\alpha`) +
  p(String.raw`Farten $v_0$ förkortas bort, så $\beta$ beror bara på backens lutning. Vinkeln mellan hastigheten och backen är skillnaden mellan hastighetens och backens lutning mot vågrätt, $\beta - \alpha$, som alltså inte heller beror på farten. Det var det som skulle visas.`) +
  k(String.raw`\beta = \tan^{-1}(2 \cdot \tan 35^\circ) = ${tp(h10.fi, 2)}^\circ \qquad \beta - \alpha = (${tp(h10.fi, 2)} - 35)^\circ = ${tp(h10.rel, 2)}^\circ`) +
  rim('Hastigheten lutar brantare än backen, som den måste för att hopparen ska träffa den, men bara med en liten vinkel. En flack träff mot backen är just vad som gör landningen möjlig.') +
  svarRad(`Hopparen träffar backen med vinkeln 19°, oavsett farten från hoppet.`),
];

// ---------- sidan ----------
const upgHtml = UPG.map((u, i) => `
<article class="upg${u.fig ? ' medfig' : ''}">
  <div class="uh"><span class="num">${i + 1}</span><span class="titel">${u.titel}</span><span class="omr">${u.omr}</span></div>
  <div class="ut"><p>${u.text}</p></div>${u.fig ? `\n  <div class="uf">${u.fig}</div>` : ''}
</article>`).join('');

const losHtml = UPG.map((u, i) => `
<article class="sol">
  <h3><span class="num">${i + 1}</span> ${u.titel}</h3>
  ${LOS[i]}
</article>`).join('');

const svarHtml = [
  `a) 3,2${NB}m&emsp;b) 69°`,
  `a) 98${NB}N&emsp;b) 93${NB}N`,
  `a) välter vid 22°&emsp;b) 27${NB}cm`,
  `a) 31 varv/min`,
  `b) 3,5${NB}kN (sex gånger tyngden)`,
  `b) 3,36·10<sup>3</sup>${NB}kg/m³, sten`,
  `a) 5,5${NB}s&emsp;b) för kort&emsp;c) 0,90${NB}kN`,
  `a) 7,5${NB}m/s&emsp;b) 41°`,
  `a) 1,2·10<sup>2</sup>${NB}m&emsp;b) 21${NB}%&emsp;c) 19°`,
].map((s, i) => `<div><span class="nr">${i + 1}</span><span>${s}</span></div>`).join('');

const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: Kapitel 1, avancerade uppgifter — Fysiklabbet</title>
<meta name="description" content="Nio avancerade uppgifter i Fysik nivå 2, kapitel 1: kraftmoment, stabilitet, cirkulär rörelse, gravitation, konisk pendel och kaströrelse. Med lösningsförslag. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/ovningsblad-fy2-kap1-avancerad.html">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    throwOnError: false,
    macros: { '\\\\Mmot': '\\\\overset{\\\\displaystyle\\\\curvearrowleft}{M}', '\\\\Mmed': '\\\\overset{\\\\displaystyle\\\\curvearrowright}{M}' }
  });
  document.documentElement.setAttribute('data-katex', 'klar');
});
</script>
<style>
* { box-sizing: border-box; }
html { color-scheme: light; }
html, body { margin: 0; padding: 0; background: #fff; }
body { font-family: Poppins, system-ui, sans-serif; color: #1f2530; font-size: 10.5pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { max-width: 210mm; margin: 0 auto; padding: 20px 16px 28px; }
.top { display: flex; flex-wrap: wrap; gap: 8px 16px; justify-content: space-between; align-items: flex-end; border-bottom: 1.4pt solid #1f2530; padding-bottom: 2mm; }
.kicker { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase; color: #5b6472; font-weight: 600; }
h1 { font-size: 21pt; margin: 0; line-height: 1.1; font-weight: 700; }
.namn { font-size: 10pt; color: #5b6472; }
.namn span { display: inline-block; width: 58mm; border-bottom: .8pt solid #8a929e; margin-left: 2mm; }
.def { margin: 3mm 0 4mm; border-left: 3pt solid #0d9488; background: #eef6f5; padding: 2.2mm 3.5mm; font-size: 9.6pt; line-height: 1.45; }
.upg { border-top: .6pt solid #c8cdd4; padding: 2.6mm 0 3mm; break-inside: avoid; page-break-inside: avoid; }
.upg.medfig { display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "uh uh" "ut uf"; column-gap: 5mm; align-items: start; }
.uh { grid-area: uh; display: flex; align-items: baseline; gap: 2.5mm; margin-bottom: 1mm; }
.ut { grid-area: ut; } .uf { grid-area: uf; }
.ut p { margin: 0; }
.ut .katex, .sol p .katex, .def .katex { white-space: nowrap; }
.uf svg { display: block; max-width: 72mm; height: auto; }
.num { font-weight: 700; font-size: 12pt; }
.titel { font-weight: 600; font-size: 11pt; }
.omr { margin-left: auto; font-size: 7.8pt; letter-spacing: .1em; text-transform: uppercase; color: #0d9488; font-weight: 600; }
.facit { break-before: page; page-break-before: always; margin-top: 10mm; }
.facit h2 { border-bottom: 1.4pt solid #1f2530; font-size: 15pt; margin: 0 0 2mm; padding-bottom: 1.5mm; }
.facit h2 small { font-size: 9pt; font-weight: 400; color: #5b6472; margin-left: 2mm; }
.svarlista { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1mm 8mm; font-size: 9.6pt; margin: 2mm 0 5mm; }
.svarlista div { display: flex; gap: 2mm; align-items: baseline; }
.svarlista .nr { font-weight: 700; min-width: 1.4em; text-align: right; }
.sol { border-top: .6pt solid #c8cdd4; padding: 2mm 0 3mm; }
.sol h3 { margin: 0 0 1mm; font-size: 11.5pt; font-weight: 600; break-after: avoid; page-break-after: avoid; }
.sol h3 .num { font-size: 11.5pt; margin-right: 1.5mm; }
.sol p { margin: 1mm 0; }
.sol ul { margin: 1mm 0; padding-left: 5mm; }
.sol li { margin: .5mm 0; }
.sol .del { font-weight: 700; margin: 2.4mm 0 .6mm; break-after: avoid; page-break-after: avoid; }
.sol .rim { color: #3c4450; }
.sol .svar { break-before: avoid; page-break-before: avoid; margin-top: 1.4mm; }
.sol .note { font-size: 9pt; color: #3c4450; border-left: 2.5pt solid #c8cdd4; padding-left: 3mm; margin-top: 2mm; }
.sol .katex-display { margin: 1.2mm 0 1.6mm; text-align: left; padding-left: 4mm; overflow-x: auto; overflow-y: hidden; padding-bottom: 2px; }
.sol .katex-display > .katex { text-align: left; }
.losfig { margin: 2mm auto 2.5mm; width: 76mm; max-width: 100%; text-align: center; break-inside: avoid; page-break-inside: avoid; }
.losfig.smal { width: 50mm; }
.losfig.bred { width: 118mm; }
.losrad { display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 6mm; align-items: start; }
.losrad .losfig { margin-top: 3mm; }
.losfig svg { width: 100%; height: auto; display: block; }
.losfig .cap { font-size: 8.2pt; color: #5b6472; margin: 0; line-height: 1.3; }
.foot { font-size: 7.5pt; color: #8a929e; display: flex; justify-content: space-between; margin-top: 6mm; }
@media screen and (max-width: 640px) {
  .upg.medfig { grid-template-columns: 1fr; grid-template-areas: "uh" "ut" "uf"; }
  .uf svg { max-width: 100%; width: 100%; margin-top: 2mm; }
  .omr { display: none; }
  .svarlista { grid-template-columns: 1fr; }
  .sol .katex-display { padding-left: 0; }
  .losrad { grid-template-columns: 1fr; }
}
@page { size: A4; margin: 12mm 13mm 13mm; }
@media print {
  body { font-size: 10pt; }
  .page { max-width: none; padding: 0; }
  .facit { margin-top: 0; }
}
</style>
</head>
<body>
<section class="page">
  <div class="top">
    <div><div class="kicker">Fysik nivå 2 · Kapitel 1 · Nivå: Avancerad</div><h1>Avancerade uppgifter</h1></div>
    <div class="namn">Namn:<span></span></div>
  </div>
  <div class="def">Nio uppgifter från hela kapitlet: kraftmoment, stabilitet, cirkulär rörelse, gravitation, konisk pendel och kaströrelse. Uppgifterna kräver att du kombinerar flera samband eller visar ett samband generellt innan du sätter in värden. Rita en figur med krafterna, skriv upp sambanden, lös ut det sökta och gör en rimlighetsbedömning. Räkna med $g = 9{,}82\\ \\mathrm{m/s^2}$ och bortse från luftmotståndet. Svar och lösningsförslag finns efter uppgifterna.</div>
${upgHtml}
  <section class="facit">
    <h2>Svar och lösningsförslag<small>Kapitel 1, avancerade uppgifter</small></h2>
    <div class="svarlista">${svarHtml}</div>
${losHtml}
  </section>
  <div class="foot"><span>Fysik nivå 2 · Kapitel 1 · Avancerad</span><span>fysiklabbet.se</span></div>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('Skrev', path.relative(process.cwd(), OUT));
console.log('Kontrollvärden:', JSON.stringify({
  stege: [+S.s.x.toFixed(3), +S.s.amin.toFixed(2)],
  skap: [+S.k.Fa.toFixed(1), +S.k.Fb.toFixed(1)], kloss: [+S.q.aV.toFixed(1), +S.q.aG.toFixed(1), +S.q.hmax.toFixed(3)],
  rotor: +S.r.n.toFixed(2), loop: +S.l.FN.toFixed(0), rho: +S.p.rho.toFixed(0), karusell: [+S.c.T.toFixed(2), +S.c.Tfel.toFixed(2), +S.c.FS.toFixed(0)],
  basket: [+S.u.v0.toFixed(3), +S.u.fi.toFixed(1)], backhopp: [+S.h.s.toFixed(1), +S.h.rel.toFixed(1)],
}));
