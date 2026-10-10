// Generator för data/np/ma4-vt2022-figurer-C.js: NP Matematik 4 VT 2022,
// delprov C (uppgift 11–19). Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2022-C.js
// Konventioner som i gen-ma3c-vt2022.js: ink #0f1620, soft #3f4a5c, accent
// #c8324a (markeringar i lösningssteg), blå #1c3d6b. Animationsklasser:
// anim-draw (heldragna linjer ritas), anim-fade (etiketter, streckade linjer,
// punkter). Basfördröjningen BAS ger läsaren tid att orientera sig.
// Delprov C saknar frågefigurer; här finns bara stegfigurer.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const MINUS = '−';

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        (o.anim || '') + '/>';
}

function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 12.5}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.anim || '') + `>${s}</text>`;
}

const it = s => `<tspan font-style="italic">${s}</tspan>`;

// Liten stackad kvot (täljare över bråkstreck över nämnare), centrerad i x.
function fracLab(x, y, top, bot, o = {}) {
    const c = o.fill || INK, an = o.anim || '', size = o.size || 12;
    const w = o.w || 16;
    return txt(x, y - 4.5, top, { size, fill: c, anim: an }) +
        line(x - w / 2, y, x + w / 2, y, { c, w: 1.2, anim: an }) +
        txt(x, y + size, bot, { size, fill: c, anim: an });
}

// Vinkelbåge i hörnet (vx, vy) från a1° till a2° (matematiska grader,
// moturs, y uppåt). I svg (y nedåt) blir moturs sweep 0.
function arc(vx, vy, a1, a2, r, o = {}) {
    const rad = a => a * Math.PI / 180;
    const p1 = { x: vx + r * Math.cos(rad(a1)), y: vy - r * Math.sin(rad(a1)) };
    const p2 = { x: vx + r * Math.cos(rad(a2)), y: vy - r * Math.sin(rad(a2)) };
    return `<path d="M ${A(p1.x)} ${A(p1.y)} A ${A(r)} ${A(r)} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${A(p2.x)} ${A(p2.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.4}"${o.anim || ''}/>`;
}

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Enhetscirkel med axlar (pilspets bara åt det positiva hållet) och
// tickmarkeringarna 1 och −1. C = medelpunkt, R = radie i px.
function enhetscirkel(C, R) {
    const g = [], ext = R + 26;
    g.push(line(C.x - ext, C.y, C.x + ext, C.y, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x + ext + 7)},${A(C.y)} ${A(C.x + ext)},${A(C.y + 4.2)} ${A(C.x + ext)},${A(C.y - 4.2)}" fill="${INK}"/>`);
    g.push(line(C.x, C.y + ext, C.x, C.y - ext, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x)},${A(C.y - ext - 7)} ${A(C.x + 4.2)},${A(C.y - ext)} ${A(C.x - 4.2)},${A(C.y - ext)}" fill="${INK}"/>`);
    g.push(txt(C.x + ext + 4, C.y + 17, 'x', { size: 14, italic: true }));
    g.push(txt(C.x + 13, C.y - ext - 1, 'y', { size: 14, italic: true }));
    g.push(`<circle cx="${A(C.x)}" cy="${A(C.y)}" r="${A(R)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
    // 1 och −1 på x-axeln, under axeln strax utanför cirkeln
    g.push(txt(C.x + R + 7, C.y + 15, '1', { size: 11.5, fill: SOFT, anchor: 'start' }));
    g.push(txt(C.x - R - 7, C.y + 15, MINUS + '1', { size: 11.5, fill: SOFT, anchor: 'end' }));
    return g;
}
const rad = a => a * Math.PI / 180;

const FIG = {};

/* ================= UPPGIFT 16: v i andra kvadranten ================= */
(function () {
    const C = { x: 150, y: 140 }, R = 100;
    const v = Math.acos(-1 / 3) * 180 / Math.PI;           // 109,47…°
    const P = { x: C.x + R * Math.cos(rad(v)), y: C.y - R * Math.sin(rad(v)) };
    const fot = { x: P.x, y: C.y };
    const g = enhetscirkel(C, R);
    // radien till punkten och vinkelbågen v
    g.push(line(C.x, C.y, P.x, P.y, { w: 1.6 }));
    g.push(`<circle cx="${A(P.x)}" cy="${A(P.y)}" r="3.4" fill="${INK}"/>`);
    g.push(arc(C.x, C.y, 0, v, 22));
    const bis = rad(v / 2);
    g.push(txt(C.x + 36 * Math.cos(bis), C.y - 36 * Math.sin(bis) + 4.5, 'v', { size: 13.5, italic: true }));
    // cos v: sträckan från origo till foten, på x-axeln (accent)
    g.push(line(C.x, C.y, fot.x, fot.y, { c: RED, w: 3.4, cap: 'butt', anim: aDraw(BAS) }));
    g.push(txt((C.x + fot.x) / 2 - 5, C.y + 19, MINUS, { size: 12, fill: RED, anim: aFade(BAS + 0.3) }));
    g.push(fracLab((C.x + fot.x) / 2 + 3, C.y + 21, '1', '3', { fill: RED, anim: aFade(BAS + 0.3), w: 9 }));
    g.push(txt(C.x - 7, C.y + 54, `cos ${it('v')} &lt; 0`, { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
    // sin v: den lodräta sträckan från foten upp till punkten (blå)
    g.push(line(fot.x, fot.y, P.x, P.y, { c: BLUE, w: 3.4, cap: 'butt', anim: aDraw(BAS + 0.9) }));
    g.push(fracLab(P.x - 18, (C.y + P.y) / 2 + 2, '√8', '3', { fill: BLUE, anim: aFade(BAS + 1.2), w: 17 }));
    g.push(txt(P.x - 10, P.y - 12, `sin ${it('v')} &gt; 0`, { size: 11.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 1.4) }));
    FIG['u16-s3'] = svg(300, 280, g.join(''));
})();

/* ================= UPPGIFT 18: två vinklar med samma sinusvärde ===== */
(function () {
    const C = { x: 160, y: 146 }, R = 100;
    const a = 70, b = 110;                                  // v − 40° och v
    const PA = { x: C.x + R * Math.cos(rad(a)), y: C.y - R * Math.sin(rad(a)) };
    const PB = { x: C.x + R * Math.cos(rad(b)), y: C.y - R * Math.sin(rad(b)) };
    const g = enhetscirkel(C, R);
    // vinkeln v − 40° (accent) och vinkeln v (blå), båda från positiva x-axeln
    g.push(line(C.x, C.y, PA.x, PA.y, { c: RED, w: 1.8, anim: aDraw(BAS) }));
    g.push(arc(C.x, C.y, 0, a, 22, { c: RED, w: 1.6, anim: aDraw(BAS + 0.3, 0.4) }));
    g.push(`<circle cx="${A(PA.x)}" cy="${A(PA.y)}" r="3.6" fill="${RED}"${aFade(BAS + 0.4)}/>`);
    g.push(txt(PA.x + 10, PA.y - 9, `${it('v')} ${MINUS} 40°`, { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
    g.push(line(C.x, C.y, PB.x, PB.y, { c: BLUE, w: 1.8, anim: aDraw(BAS + 0.9) }));
    g.push(arc(C.x, C.y, 0, b, 36, { c: BLUE, w: 1.6, anim: aDraw(BAS + 1.2, 0.4) }));
    g.push(`<circle cx="${A(PB.x)}" cy="${A(PB.y)}" r="3.6" fill="${BLUE}"${aFade(BAS + 1.3)}/>`);
    g.push(txt(PB.x - 10, PB.y - 9, it('v'), { size: 13.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 1.4) }));
    // samma höjd: streckad vågrät linje mellan punkterna
    g.push(line(PB.x + 5, PB.y, PA.x - 5, PA.y, { c: INK, w: 1.3, dash: '4 3', anim: aFade(BAS + 1.9) }));
    FIG['u18-s3'] = svg(320, 290, g.join(''));
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet: figurer till NP Ma 4 VT 2022, delprov C (genererade, redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2022-C.js).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2022'] = Object.assign(window.NP_FIGURER['ma4-vt2022'] || {}, {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2022-figurer-C.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
