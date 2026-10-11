// Generator för data/np/ma3c-vt2018-figurer-C.js — NP Matematik 3c VT 2018,
// delprov C (uppgift 12–19). Delprovet har inga figurer i uppgifterna
// (blåbärsfotot i uppgift 15 är en illustration och återges inte), så
// figurerna här hör alla till lösningsstegen. Alla koordinater beräknade
// och alla kurvor samplade ur sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma3c-vt2018-C.js
// Konventioner som gen-ma3c-vt2022.js: ink #0f1620, soft #3f4a5c, accent
// #c8324a, kurvblå #1c3d6b, rutnät rgba(15,22,32,0.10). Animationsklasser:
// anim-draw (heldragna linjer ritas), anim-fade (etiketter, streckade
// linjer, punkter). BAS ger läsaren tid att orientera sig.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GREEN = '#2f6b3a';
const GRID = 'rgba(15,22,32,0.10)';
const SHADE_UP = 'rgba(28,61,107,0.13)', SHADE_DN = 'rgba(200,50,74,0.13)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.6) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.1;
const MINUS = '−';
const it = s => `<tspan font-style="italic">${s}</tspan>`;
const tal = v => (v < 0 ? MINUS : '') + String(Math.abs(v)).replace('.', ',');

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
function dot(x, y, c, anim, r = 4) {
    return `<circle cx="${A(x)}" cy="${A(y)}" r="${r}" fill="${c}"${anim || ''}/>`;
}

// Koordinatsystem med valfria skalstreck. cfg: xmin,xmax,ymin,ymax, ux,uy,
// xt/yt (listor med skalvärden), xGrid/yGrid (rutnätssteg), pad*,
// xName/yName (axelnamn, kursiva).
function graph(cfg) {
    const ux = cfg.ux, uy = cfg.uy;
    const padL = cfg.padL ?? 36, padR = cfg.padR ?? 26, padT = cfg.padT ?? 22, padB = cfg.padB ?? 24;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    if (cfg.xGrid) for (let x = Math.ceil(cfg.xmin / cfg.xGrid) * cfg.xGrid; x <= cfg.xmax + 1e-9; x += cfg.xGrid)
        g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: GRID, w: 1 }));
    if (cfg.yGrid) for (let y = Math.ceil(cfg.ymin / cfg.yGrid) * cfg.yGrid; y <= cfg.ymax + 1e-9; y += cfg.yGrid)
        g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: GRID, w: 1 }));
    const ax = py(0), ay = px(0);
    // axlar: pilspets bara åt det positiva hållet
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    g.push(txt(px(cfg.xmax) + 10, ax + 18, cfg.xName || 'x', { size: 14, italic: true }));
    g.push(txt(ay + 9, py(cfg.ymax) - 4, cfg.yName || 'y', { size: 14, italic: true, anchor: 'start' }));
    (cfg.xt || []).forEach(x => {
        g.push(line(px(x), ax - 3, px(x), ax + 3, { w: 1.2 }));
        g.push(txt(px(x), ax + 16, tal(x), { size: 11.5, fill: SOFT }));
    });
    (cfg.yt || []).forEach(y => {
        g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
        g.push(txt(ay - 7, py(y) + 4, tal(y), { size: 11.5, fill: SOFT, anchor: 'end' }));
    });
    return { W, H, px, py, base: g, cfg };
}
// Samplad kurva (steg ≤ 2 px), klippt mot y-fönstret.
function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || 240;
    const lo = G.cfg.ymin - 0.02 * (G.cfg.ymax - G.cfg.ymin), hi = G.cfg.ymax + 0.02 * (G.cfg.ymax - G.cfg.ymin);
    let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n, y = f(x);
        if (y < lo || y > hi || !isFinite(y)) { pen = false; continue; }
        d += (pen ? ' L ' : ' M ') + A(G.px(x)) + ' ' + A(G.py(y));
        pen = true;
    }
    return `<path d="${d.trim()}" fill="none" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.4}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.anim || '') + '/>';
}
// Fyllt område mellan kurvan och x-axeln.
function areaPath(G, f, x0, x1, fill, anim, n = 120) {
    let d = `M ${A(G.px(x0))} ${A(G.py(0))}`;
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; d += ` L ${A(G.px(x))} ${A(G.py(f(x)))}`; }
    d += ` L ${A(G.px(x1))} ${A(G.py(0))} Z`;
    return `<path d="${d}" fill="${fill}" stroke="none"${anim || ''}/>`;
}
const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ===== UPPGIFT 15 — derivatans tecken visar var inkomsten växer =====
 * Grafen till f'(x) = 75 − 3x². Nollställena ±5; bara x ≥ 0 hör till
 * uppgiften. Ovanför x-axeln (0 ≤ x < 5) växer f, nedanför (x > 5) avtar f. */
(function () {
    const d = x => 75 - 3 * x * x;
    // s1: derivatans graf med båda nollställena (−5 utanför definitionsmängden)
    {
        const G = graph({ xmin: -6.5, xmax: 7, ymin: -75, ymax: 90, ux: 34, uy: 1.5,
            xt: [-5, 5], yt: [-50, 25, 50], xGrid: 1, yGrid: 25, xName: 'x', yName: 'y', padL: 38 });
        const g = G.base.slice();
        g.push(curvePath(G, d, -6.4, 6.9, { anim: aDraw(BAS, 0.9) }));
        g.push(txt(G.px(1.2), G.py(84), `${it('y')} = ${it('f')}′(${it('x')})`, { size: 13, anchor: 'start', fill: BLUE, anim: aFade(BAS + 0.6) }));
        // definitionsmängden x ≥ 0: x < 0 tonas med en grå skärm
        g.push(`<rect x="${A(G.px(-6.5))}" y="${A(G.py(90))}" width="${A(G.px(0) - G.px(-6.5))}" height="${A(G.py(-75) - G.py(90))}" fill="rgba(246,241,231,0.62)"${aFade(BAS + 1.0)}/>`);
        g.push(txt(G.px(-3.4), G.py(-40), `${it('x')} &lt; 0 ingår inte`, { size: 12, fill: SOFT, anim: aFade(BAS + 1.1) }));
        g.push(dot(G.px(-5), G.py(0), SOFT, aFade(BAS + 1.2)));
        g.push(dot(G.px(5), G.py(0), RED, aFade(BAS + 1.3)));
        g.push(txt(G.px(5) + 8, G.py(0) - 8, `${it('x')} = 5`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.4) }));
        FIG['u15-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: teckenbyte vid x = 5: plus före, minus efter (bara x ≥ 0)
    {
        const G = graph({ xmin: -1, xmax: 7, ymin: -75, ymax: 90, ux: 52, uy: 1.5,
            xt: [1, 2, 3, 4, 5, 6], yt: [-50, 25, 50], xGrid: 1, yGrid: 25, padL: 38 });
        const g = G.base.slice();
        g.push(areaPath(G, d, 0, 5, SHADE_UP, aFade(BAS + 0.7)));
        g.push(areaPath(G, d, 5, 6.9, SHADE_DN, aFade(BAS + 1.1)));
        g.push(curvePath(G, d, 0, 6.9, { anim: aDraw(BAS, 0.7) }));
        g.push(txt(G.px(0.7), G.py(80), `${it('y')} = ${it('f')}′(${it('x')})`, { size: 13, anchor: 'start', fill: BLUE, anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(2.3), G.py(32), `${it('f')}′(${it('x')}) &gt; 0`, { size: 12.5, fill: BLUE, anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(2.3), G.py(17), 'inkomsten växer', { size: 12, fill: BLUE, anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(4.35), G.py(-45), `${it('f')}′(${it('x')}) &lt; 0`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.3) }));
        g.push(txt(G.px(4.35), G.py(-60), 'inkomsten avtar', { size: 12, fill: RED, anim: aFade(BAS + 1.3) }));
        g.push(dot(G.px(5), G.py(0), INK, aFade(BAS + 1.6)));
        g.push(txt(G.px(5) + 6, G.py(0) - 10, `${it('f')} har max`, { size: 12.5, anchor: 'start', anim: aFade(BAS + 1.7) }));
        FIG['u15-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ===== UPPGIFT 16 — ln x och eˣ i x = π/3 ≈ 1,05 ===== */
(function () {
    const X = Math.PI / 3;
    // etiketten x = π/3 med stackat bråk (rakt bråkstreck, aldrig snedstreck)
    function xPiTre(G, an) {
        const x0 = G.px(X) + 6, yb = G.py(-1.95);
        return txt(x0, yb, `${it('x')} =`, { size: 12.5, fill: RED, anchor: 'start', anim: an }) +
            txt(x0 + 30, yb - 6, 'π', { size: 11.5, fill: RED, anim: an }) +
            line(x0 + 24, yb - 4, x0 + 36, yb - 4, { c: RED, w: 1.1, anim: an }) +
            txt(x0 + 30, yb + 8, '3', { size: 11.5, fill: RED, anim: an });
    }
    // x-axelns 1 utelämnas: linjen x = π/3 är märkt och går nästan där
    function base(yt) {
        const G = graph({ xmin: -1.5, xmax: 2.6, ymin: -2.4, ymax: 3.6, ux: 64, uy: 48,
            xt: [-1, 2], yt: yt || [-2, -1, 1, 2, 3], xGrid: 0.5, yGrid: 0.5, padL: 32 });
        return { G, g: G.base.slice() };
    }
    // s1: y = ln x och punkten (π/3, ln(π/3)) nära (1, 0)
    {
        const { G, g } = base();
        g.push(curvePath(G, Math.log, 0.09, 2.55, { anim: aDraw(BAS, 0.8) }));
        g.push(txt(G.px(1.95), G.py(0.9), `${it('y')} = ln ${it('x')}`, { size: 13, fill: BLUE, anim: aFade(BAS + 0.5) }));
        g.push(line(G.px(X), G.py(-2.4), G.px(X), G.py(3.4), { c: RED, w: 1.3, dash: '4 4', anim: aFade(BAS + 0.8) }));
        g.push(xPiTre(G, aFade(BAS + 0.9)));
        g.push(dot(G.px(X), G.py(Math.log(X)), RED, aFade(BAS + 1.1)));
        g.push(txt(G.px(X) - 8, G.py(Math.log(X)) - 9, '≈ 0', { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 1.2) }));
        FIG['u16-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: samma figur plus y = eˣ och punkten (π/3, e^(π/3)) nära (1, e)
    {
        // y-axelns 1 utelämnas: kurvan y = e^x går genom (0, 1)
        const { G, g } = base([-2, -1, 2, 3]);
        g.push(curvePath(G, Math.log, 0.09, 2.55));
        g.push(txt(G.px(1.95), G.py(0.9), `${it('y')} = ln ${it('x')}`, { size: 13, fill: BLUE }));
        g.push(line(G.px(X), G.py(-2.4), G.px(X), G.py(3.4), { c: RED, w: 1.3, dash: '4 4' }));
        g.push(xPiTre(G, ''));
        g.push(dot(G.px(X), G.py(Math.log(X)), RED));
        g.push(txt(G.px(X) - 8, G.py(Math.log(X)) - 9, '≈ 0', { size: 12.5, fill: RED, anchor: 'end' }));
        g.push(curvePath(G, Math.exp, -1.5, 1.28, { c: GREEN, anim: aDraw(BAS, 0.8) }));
        g.push(txt(G.px(-1.4), G.py(0.8), `${it('y')} = e<tspan dy="-6" font-size="10" font-style="italic">x</tspan>`, { size: 13, fill: GREEN, anchor: 'start', anim: aFade(BAS + 0.5) }));
        g.push(dot(G.px(X), G.py(Math.exp(X)), RED, aFade(BAS + 1.0)));
        g.push(txt(G.px(X) + 9, G.py(Math.exp(X)) + 4, '≈ e ≈ 2,72', { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
        FIG['u16-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ===== UPPGIFT 18 — derivatans graf y = x² + x + a för tre värden på a =====
 * Tre små paneler sida vid sida: a = −2 ger två nollställen (två
 * extrempunkter), a = 1/4 ett dubbelt nollställe (terrasspunkt) och a = 1
 * inga nollställen (inga extrempunkter). */
(function () {
    const fall = [
        { a: -2, aTxt: `${MINUS}2`, c: BLUE, rad1: 'två nollställen:', rad2: 'två extrempunkter', nst: [-2, 1] },
        { a: 0.25, aTxt: null, c: SOFT, rad1: 'ett dubbelt nollställe:', rad2: 'terrasspunkt', nst: [-0.5] },
        { a: 1, aTxt: '1', c: GREEN, rad1: 'inga nollställen:', rad2: 'inga extrempunkter', nst: [] },
    ];
    const parts = [];
    let xoff = 0, Hmax = 0;
    fall.forEach((k, i) => {
        const G = graph({ xmin: -2.6, xmax: 1.7, ymin: -2.5, ymax: 3.3, ux: 40, uy: 32,
            xt: [-1], yt: [2], xGrid: 1, yGrid: 1, padL: 26, padR: 22, padT: 50, padB: 58 });
        const g = G.base.slice();
        const f = x => x * x + x + k.a;
        const d = BAS + i * 0.9;
        // rubrik: kurvan är derivatans graf, y = f′(x); a = 1/4 som staplat bråk
        const rub = `${it('y')} = ${it('f')}′(${it('x')}),  ${it('a')} = `;
        const xr = G.W / 2 + 26;
        g.push(txt(xr, 22, rub, { size: 13, fill: k.c, anchor: 'end', anim: aFade(d) }));
        const xv = xr + 4;
        if (k.aTxt) g.push(txt(xv, 22, k.aTxt, { size: 13, fill: k.c, anchor: 'start', anim: aFade(d) }));
        else g.push(txt(xv + 5, 15, '1', { size: 11.5, fill: k.c, anim: aFade(d) }) +
            line(xv - 1, 18, xv + 11, 18, { c: k.c, w: 1.1, anim: aFade(d) }) +
            txt(xv + 5, 30, '4', { size: 11.5, fill: k.c, anim: aFade(d) }));
        // nollställenas skalvärden läggs utanför kurvan (−2 ned åt vänster, 1 ned åt höger)
        if (k.a === -2) {
            g.push(txt(G.px(-2) - 5, G.py(0) + 16, `${MINUS}2`, { size: 11.5, fill: SOFT, anchor: 'end' }));
            g.push(txt(G.px(1) + 5, G.py(0) + 16, '1', { size: 11.5, fill: SOFT, anchor: 'start' }));
        }
        g.push(curvePath(G, f, -2.6, 1.7, { c: k.c, anim: aDraw(d + 0.1, 0.6) }));
        k.nst.forEach(x0 => g.push(dot(G.px(x0), G.py(0), k.c, aFade(d + 0.6))));
        g.push(txt(G.W / 2, G.H - 30, k.rad1, { size: 12, fill: k.c, anim: aFade(d + 0.7) }));
        g.push(txt(G.W / 2, G.H - 14, k.rad2, { size: 12, fill: k.c, anim: aFade(d + 0.7) }));
        parts.push(`<g transform="translate(${A(xoff)},0)">${g.join('')}</g>`);
        xoff += G.W + 12;
        Hmax = Math.max(Hmax, G.H);
    });
    FIG['u18-s1'] = svg(xoff - 12, Hmax, parts.join(''));
})();

/* ===== UPPGIFT 19 — integralens värde I(a) = −a³/6 + a, max i a = √2 ===== */
(function () {
    const I = a => -a * a * a / 6 + a;
    const G = graph({ xmin: 0, xmax: 3.2, ymin: -1.2, ymax: 1.4, ux: 110, uy: 110,
        xt: [1, 2, 3], yt: [-1, 1], xGrid: 0.5, yGrid: 0.5, xName: 'a', yName: 'y', padL: 34 });
    const g = G.base.slice();
    g.push(curvePath(G, I, 0, 3.15, { anim: aDraw(BAS, 0.8) }));
    g.push(txt(G.px(2.5), G.py(0.55), `${it('y')} = ${it('I')}<tspan dx="2.5">(</tspan>${it('a')})`, { size: 13, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.5) }));
    const s2 = Math.SQRT2, top = I(s2);
    g.push(line(G.px(s2), G.py(0), G.px(s2), G.py(top), { c: RED, w: 1.3, dash: '4 4', anim: aFade(BAS + 0.9) }));
    g.push(dot(G.px(s2), G.py(top), RED, aFade(BAS + 1.0)));
    g.push(txt(G.px(s2), G.py(top) - 12, 'största värdet ≈ 0,94', { size: 12.5, fill: RED, anim: aFade(BAS + 1.1) }));
    g.push(dot(G.px(s2), G.py(0), RED, aFade(BAS + 1.2), 3.2));
    g.push(txt(G.px(s2) + 4, G.py(0) + 18, `${it('a')} = √2`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.3) }));
    FIG['u19-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 3c VT 2018, delprov C (genererade — redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma3c-vt2018-C.js).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma3c-vt2018'] = Object.assign(window.NP_FIGURER['ma3c-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma3c-vt2018-figurer-C.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
