#!/usr/bin/env node
/* gen-ma1b-vt2022.js — figurer till NP Ma 1b VT 2022 (bara 1b-provets EGNA
 * uppgifter; de lånade uppgifternas figurer kommer från ma1c-vt2022-figurer.js).
 *
 * Kör:  node .claude/np-figs/gen-ma1b-vt2022.js
 * Skriver data/np/ma1b-vt2022-figurer.js. Nycklarna börjar med 'b' så att de
 * aldrig krockar med de lånade 'u'-nycklarna.
 */
const fs = require('fs'), path = require('path');
const INK = '#0f1620', GRAF = '#3f4a5c', ACC = '#c8324a', BLA = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const f = n => Math.round(n * 100) / 100;

/* ---------- uppgift 5: indexdiagrammet för Päronis ----------
 * x: år 1975–2025 (lodräta stödlinjer var femte år, axeln vid 1975),
 * y: index 0–700 (vågräta stödlinjer var 50:e). Samma upplägg som provets
 * diagram. */
const DATA = [[1980, 100], [1990, 308], [2000, 461], [2010, 539], [2020, 615]];
const X0 = 58, DX = 26 / 5;          // px per år (en ruta = 5 år = 26 px)
const Y0 = 318, DY = 20 / 50;        // px per indexenhet (en ruta = 50 = 20 px)
const px = ar => X0 + (ar - 1975) * DX;
const py = v => Y0 - v * DY;
const XMAX = px(2025), YMIN = py(700);

function diagram(extra) {
    const o = [];
    for (let ar = 1975; ar <= 2025; ar += 5)
        o.push(`<line x1="${f(px(ar))}" y1="${Y0}" x2="${f(px(ar))}" y2="${f(YMIN)}" stroke="${GRID}" stroke-width="1"/>`);
    for (let v = 0; v <= 700; v += 50)
        o.push(`<line x1="${X0}" y1="${f(py(v))}" x2="${f(XMAX)}" y2="${f(py(v))}" stroke="${GRID}" stroke-width="1"/>`);
    // axlar med pilspets åt det positiva hållet
    o.push(`<line x1="${X0}" y1="${Y0}" x2="${f(XMAX + 14)}" y2="${Y0}" stroke="${INK}" stroke-width="1.4"/>`);
    o.push(`<polygon points="${f(XMAX + 22)},${Y0} ${f(XMAX + 13)},${Y0 - 4} ${f(XMAX + 13)},${Y0 + 4}" fill="${INK}"/>`);
    o.push(`<line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${f(YMIN - 12)}" stroke="${INK}" stroke-width="1.4"/>`);
    o.push(`<polygon points="${X0},${f(YMIN - 20)} ${X0 - 4},${f(YMIN - 11)} ${X0 + 4},${f(YMIN - 11)}" fill="${INK}"/>`);
    for (let v = 0; v <= 700; v += 100) {
        o.push(`<line x1="${X0 - 4}" y1="${f(py(v))}" x2="${X0}" y2="${f(py(v))}" stroke="${INK}" stroke-width="1.2"/>`);
        o.push(`<text x="${X0 - 8}" y="${f(py(v) + 4.5)}" font-size="13" text-anchor="end" fill="${INK}">${v}</text>`);
    }
    for (const [ar] of DATA)
        o.push(`<text x="${f(px(ar))}" y="${Y0 + 18}" font-size="13" text-anchor="middle" fill="${INK}">${ar}</text>`);
    o.push(`<text x="${X0 - 6}" y="${f(YMIN - 26)}" font-size="13" text-anchor="middle" fill="${INK}">Index</text>`);
    o.push(`<text x="${f(XMAX + 26)}" y="${Y0 + 4.5}" font-size="13" text-anchor="start" fill="${INK}">År</text>`);
    // kurvan och mätpunkterna med sina värden
    o.push(`<polyline points="${DATA.map(([a, v]) => f(px(a)) + ',' + f(py(v))).join(' ')}" fill="none" stroke="${INK}" stroke-width="2"/>`);
    for (const [a, v] of DATA) {
        o.push(`<rect x="${f(px(a) - 2.5)}" y="${f(py(v) - 2.5)}" width="5" height="5" fill="${GRAF}"/>`);
        // första punkten ligger nära y-axeln: dess värde står till höger under
        if (a === 1980) o.push(`<text x="${f(px(a) + 7)}" y="${f(py(v) + 15)}" font-size="12" text-anchor="start" fill="${INK}">${v}</text>`);
        else o.push(`<text x="${f(px(a) - 6)}" y="${f(py(v) - 8)}" font-size="12" text-anchor="end" fill="${INK}">${v}</text>`);
    }
    if (extra) o.push(extra);
    const W = Math.ceil(XMAX + 46), H = Y0 + 28, top = Math.floor(YMIN - 42);
    return `<svg viewBox="0 ${top} ${W} ${H - top}" width="${W}" xmlns="http://www.w3.org/2000/svg">${o.join('')}</svg>`;
}

/* Lösningssteg 1: de två avlästa punkterna ringas in. */
function avlasning() {
    const o = [];
    let d = 1.2;
    for (const [a, v] of [DATA[0], DATA[4]]) {
        o.push(`<circle class="anim-fade" style="animation-delay:${d}s" cx="${f(px(a))}" cy="${f(py(v))}" r="7" fill="none" stroke="${ACC}" stroke-width="1.8"/>`);
        d += 0.6;
    }
    return o.join('');
}

const FIG = { 'b5': diagram(), 'b5-los1': diagram(avlasning()) };

const ut = [
    '// Fysiklabbet — figurer till NP Ma 1b VT 2022, bara provets egna uppgifter',
    '// (genererade — redigera inte för hand; generatorn är',
    '// .claude/np-figs/gen-ma1b-vt2022.js). De lånade uppgifternas figurer kopieras',
    '// in från ma1c-vt2022-figurer.js av härledningen i ma1b-vt2022.js.',
    'window.NP_FIGURER = window.NP_FIGURER || {};',
    "window.NP_FIGURER['ma1b-vt2022'] = Object.assign(window.NP_FIGURER['ma1b-vt2022'] || {}, {",
    ...Object.entries(FIG).map(([k, v]) => `  '${k}': ${JSON.stringify(v)},`),
    '});',
    '',
];
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma1b-vt2022-figurer.js'), ut.join('\n'));
console.log('skrev', Object.keys(FIG).join(', '));
