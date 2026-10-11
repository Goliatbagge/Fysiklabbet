// Generator för data/np/ma3c-vt2018-figurer-B.js — NP Matematik 3c VT 2018,
// delprov B (uppgift 1–11). Alla koordinater beräknade, kurvor samplade ur
// sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma3c-vt2018-B.js
// Konventioner (samma som gen-ma3c-vt2022.js): ink #0f1620, soft #3f4a5c,
// accent #c8324a (markeringar i lösningssteg), kurvblå #1c3d6b, rutnät
// rgba(15,22,32,0.10). Animationsklasser: anim-draw (heldragna linjer
// ritas), anim-fade (etiketter, streckade linjer, punkter). Basfördröjning
// BAS ger läsaren tid att orientera sig innan animationen startar.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const PAPER = '#f6f1e7';

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
const fnLab = (fn) => `${it('y')} = ${it(fn)}(${it('x')})`;
const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.6}" fill="${o.c || INK}"${o.anim || ''}/>`;

// Axlar med pilspets bara åt det positiva hållet.
function axes(px, py, x0, x1, y0, y1, o = {}) {
    const g = [];
    const ax = py(0), ay = px(0);
    g.push(line(px(x0), ax, px(x1) - 7, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(x1))},${A(ax)} ${A(px(x1) - 8)},${A(ax + 4.2)} ${A(px(x1) - 8)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(y0), ay, py(y1) + 7, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(y1))} ${A(ay + 4.2)},${A(py(y1) + 8)} ${A(ay - 4.2)},${A(py(y1) + 8)}" fill="${INK}"/>`);
    g.push(txt(px(x1) - 4, ax + 18, 'x', { size: 14, italic: true }));
    g.push(txt(ay - 12, py(y1) + 9, 'y', { size: 14, italic: true }));
    return g;
}

// Samplad kurva i världskoordinater, klippt mot [ylo, yhi].
function curve(px, py, f, xa, xb, ylo, yhi, o = {}) {
    const n = o.n || 240;
    let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
        const x = xa + (xb - xa) * i / n, y = f(x);
        if (y < ylo || y > yhi || !isFinite(y)) { pen = false; continue; }
        d += (pen ? ' L ' : ' M ') + A(px(x)) + ' ' + A(py(y));
        pen = true;
    }
    return `<path d="${d.trim()}" fill="none" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.2}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.anim || '') + '/>';
}

// Nollställe med bisektion.
function bisect(g, a, b) {
    let fa = g(a);
    for (let i = 0; i < 80; i++) {
        const m = (a + b) / 2, fm = g(m);
        if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m;
    }
    return (a + b) / 2;
}

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ================= UPPGIFT 2 — tangent och sekant ================= */
(function () {
    // Fjärdegradsfunktion med två toppar och en dal (symmetrisk kring m).
    const m = 3.42, w2 = 1.38 * 1.38, a = 0.408, M = 2.59;
    const f = x => M - a * Math.pow((x - m) * (x - m) - w2, 2);
    const df = x => -4 * a * (x - m) * ((x - m) * (x - m) - w2);
    // Linjerna
    const kA = 0.094, mA = 0.32, lA = x => kA * x + mA;          // sekant
    const kC = 0.135, mC = 2.70, lC = x => kC * x + mC;          // passerar ovanför
    const x0B = bisect(x => df(x) + 0.5, m + 1.39, m + 1.9);     // f'(x0) = -0,5
    const lB = x => f(x0B) - 0.5 * (x - x0B);                    // tangent
    const xE = m, xD = 5.23;
    const U = 66, X0 = -0.56, X1 = 6.35, Y0 = -0.42, Y1 = 4.2;
    const padL = 10, padR = 66, padT = 16, padB = 22;
    const px = x => padL + (x - X0) * U, py = y => padT + (Y1 - y) * U;
    const W = padL + (X1 - X0) * U + padR, H = padT + (Y1 - Y0) * U + padB;
    const xEnd = 6.15;                                           // linjernas högra ände
    function base() {
        const g = axes(px, py, X0, X1 + 0.05, Y0 + 0.08, Y1);
        g.push(curve(px, py, f, 1.0, 5.8, Y0 + 0.1, Y1));
        // vågräta/sneda linjer
        g.push(line(px(X0), py(lC(X0)), px(xEnd), py(lC(xEnd)), { w: 1.4 }));
        g.push(line(px(1.95), py(lB(1.95)), px(xEnd), py(lB(xEnd)), { w: 1.4 }));
        g.push(line(px(X0), py(lA(X0)), px(xEnd), py(lA(xEnd)), { w: 1.4 }));
        // lodräta linjer
        g.push(line(px(xE), py(Y0 + 0.1), px(xE), py(3.95), { w: 1.4 }));
        g.push(line(px(xD), py(Y0 + 0.1), px(xD), py(3.95), { w: 1.4 }));
        g.push(txt(px(xEnd) + 8, py(lC(xEnd)) + 5, 'C', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(px(xEnd) + 8, py(lB(xEnd)) + 5, 'B', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(px(xEnd) + 8, py(lA(xEnd)) + 5, 'A', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(px(xE), py(3.95) - 6, 'E', { size: 14, italic: true }));
        g.push(txt(px(xD), py(3.95) - 6, 'D', { size: 14, italic: true }));
        g.push(txt(px(1.5), py(2.12), fnLab('f'), { size: 13, anchor: 'end', fill: BLUE }));
        return g;
    }
    FIG['u2'] = svg(W, H, base().join(''));
    // s1: B är tangenten — rödmarkerad, tangeringspunkten
    {
        const g = base();
        g.push(line(px(1.95), py(lB(1.95)), px(xEnd), py(lB(xEnd)), { c: RED, w: 2.4, anim: aDraw(BAS, 0.6) }));
        g.push(dot(px(x0B), py(f(x0B)), { c: RED, r: 4, anim: aFade(BAS + 0.6) }));
        g.push(txt(px(xEnd) + 24, py(lB(xEnd)) + 5, 'tangent', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u2-s1'] = svg(W + 44, H, g.join(''));
    }
    // s2: A är sekanten — två skärningspunkter
    {
        const g = base();
        const s1 = bisect(x => f(x) - lA(x), 1.0, 2.0), s2 = bisect(x => f(x) - lA(x), 5.0, 5.8);
        g.push(line(px(X0), py(lA(X0)), px(xEnd), py(lA(xEnd)), { c: RED, w: 2.4, anim: aDraw(BAS, 0.6) }));
        g.push(dot(px(s1), py(lA(s1)), { c: RED, r: 4, anim: aFade(BAS + 0.6) }));
        g.push(dot(px(s2), py(lA(s2)), { c: RED, r: 4, anim: aFade(BAS + 0.8) }));
        g.push(txt(px(xEnd) + 24, py(lA(xEnd)) + 5, 'sekant', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }));
        FIG['u2-s2'] = svg(W + 44, H, g.join(''));
    }
})();

/* ================= UPPGIFT 4 — sex enhetscirklar ================= */
(function () {
    const rad = d => d * Math.PI / 180;
    // en enhetscirkel med centrum (cx, cy), radie R; vinkeln v i grader
    function unit(cx, cy, R, v, o = {}) {
        const g = [], E = R + 14, T = R + 22;
        g.push(line(cx - E, cy, cx + T - 7, cy, { w: 1.4, cap: 'butt' }));
        g.push(`<polygon points="${A(cx + T)},${A(cy)} ${A(cx + T - 8)},${A(cy + 3.8)} ${A(cx + T - 8)},${A(cy - 3.8)}" fill="${INK}"/>`);
        g.push(line(cx, cy + E, cx, cy - T + 7, { w: 1.4, cap: 'butt' }));
        g.push(`<polygon points="${A(cx)},${A(cy - T)} ${A(cx + 3.8)},${A(cy - T + 8)} ${A(cx - 3.8)},${A(cy - T + 8)}" fill="${INK}"/>`);
        g.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INK}" stroke-width="1.4"/>`);
        // skalstreck vid ±0,5 på båda axlarna
        [-0.5, 0.5].forEach(s => {
            g.push(line(cx + s * R, cy - 3, cx + s * R, cy + 3, { w: 1.2 }));
            g.push(line(cx - 3, cy - s * R, cx + 3, cy - s * R, { w: 1.2 }));
        });
        g.push(txt(cx + R - 5, cy + 15, '1', { size: 11, fill: SOFT, anchor: 'end' }));
        g.push(txt(cx - 5, cy - R - 4, '1', { size: 11, fill: SOFT, anchor: 'end' }));
        g.push(txt(cx + T, cy + 17, 'x', { size: 13, italic: true, anchor: 'end' }));
        g.push(txt(cx - 8, cy - T + 8, 'y', { size: 13, italic: true, anchor: 'end' }));
        // vridna benet
        const P = { x: cx + R * Math.cos(rad(v)), y: cy - R * Math.sin(rad(v)) };
        g.push(line(cx, cy, P.x, P.y, { w: 1.8, c: o.c || INK, anim: o.anim }));
        // vinkelbåge moturs från 0° till v (stor båge när v > 180°)
        const r = 13, q = { x: cx + r * Math.cos(rad(v)), y: cy - r * Math.sin(rad(v)) };
        g.push(`<path d="M ${A(cx + r)} ${A(cy)} A ${r} ${r} 0 ${v > 180 ? 1 : 0} 0 ${A(q.x)} ${A(q.y)}" fill="none" stroke="${INK}" stroke-width="1"/>`);
        // v-etiketten: på bisektrisen till vänster/höger enligt originalet
        const lv = v <= 180 ? 38 : 128, lr = 26;
        g.push(txt(cx + lr * Math.cos(rad(lv)), cy - lr * Math.sin(rad(lv)) + 4, 'v', { size: 13, italic: true }));
        return { g, P };
    }
    const R = 62, CW = 196, CH = 192;
    const alts = [['A', 120], ['B', 150], ['C', 210], ['D', 240], ['E', 300], ['F', 330]];
    const parts = [];
    alts.forEach(([L, v], i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const cx = 16 + col * CW + 80, cy = 22 + row * CH + 88;
        parts.push(txt(cx - 88, cy - 70, L + '.', { size: 14, anchor: 'start' }));
        parts.push(...unit(cx, cy, R, v).g);
    });
    FIG['u4'] = svg(3 * CW + 8, 2 * CH + 20, parts.join(''));

    // s1: linjen x = −0,5 skär cirkeln i två punkter, 120° och 240°
    {
        const g = [], cx = 150, cy = 140, Rb = 92;
        g.push(line(cx - 118, cy, cx + 118, cy, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(cx + 126)},${A(cy)} ${A(cx + 118)},${A(cy + 4.2)} ${A(cx + 118)},${A(cy - 4.2)}" fill="${INK}"/>`);
        g.push(line(cx, cy + 112, cx, cy - 118, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(cx)},${A(cy - 126)} ${A(cx + 4.2)},${A(cy - 118)} ${A(cx - 4.2)},${A(cy - 118)}" fill="${INK}"/>`);
        g.push(txt(cx + 124, cy + 18, 'x', { size: 14, italic: true }));
        g.push(txt(cx - 12, cy - 112, 'y', { size: 14, italic: true }));
        g.push(`<circle cx="${cx}" cy="${cy}" r="${Rb}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(line(cx + Rb, cy - 3, cx + Rb, cy + 3, { w: 1.2 }));
        g.push(txt(cx + Rb + 6, cy + 16, '1', { size: 12, fill: SOFT, anchor: 'start' }));
        const xh = cx - 0.5 * Rb;
        g.push(line(xh, cy - 3, xh, cy + 3, { w: 1.2 }));
        g.push(line(xh, cy - Rb - 6, xh, cy + Rb + 6, { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        // talet −0,5 står redan i etiketten x = −0,5 ovanför linjen
        g.push(txt(xh - 6, cy - Rb - 8, `${it('x')} = ${MINUS}0,5`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        [120, 240].forEach((v, i) => {
            const P = { x: cx + Rb * Math.cos(rad(v)), y: cy - Rb * Math.sin(rad(v)) };
            const d = BAS + 0.6 + i * 0.9;
            g.push(line(cx, cy, P.x, P.y, { c: RED, w: 2, anim: aDraw(d, 0.4) }));
            g.push(dot(P.x, P.y, { c: RED, r: 4, anim: aFade(d + 0.4) }));
            const r = i ? 56 : 26;
            const q = { x: cx + r * Math.cos(rad(v)), y: cy - r * Math.sin(rad(v)) };
            g.push(`<path d="M ${A(cx + r)} ${A(cy)} A ${r} ${r} 0 ${v > 180 ? 1 : 0} 0 ${A(q.x)} ${A(q.y)}" fill="none" stroke="${RED}" stroke-width="1.3"${aFade(d + 0.5)}/>`);
        });
        // gradtal inne i vinkelns svep, strax utanför bågen: 120° kring 60°, 240° kring 203°;
        // 240° till vänster om den streckade linjen, innanför 240°-bågen
        g.push(txt(cx + 19, cy - 29, '120°', { size: 11, fill: RED, anim: aFade(BAS + 1.2) }));
        g.push(txt(cx - 71, cy + 28, '240°', { size: 11, fill: RED, anim: aFade(BAS + 2.1) }));
        FIG['u4-s1'] = svg(300, 272, g.join(''));
    }
})();

/* ================= UPPGIFT 9 — tredjegradsfunktion, f''(x) ≤ 0 ================= */
(function () {
    // f'(x) = (4/9)(x + 3)(x − 1): max i (−3, 4), min i (1, −20/27)
    const k = 4 / 9;
    const f = x => k * (x * x * x / 3 + x * x - 3 * x);
    const fp = x => k * (x * x + 2 * x - 3);
    const U = 26, X0 = -5.5, X1 = 5.5, Y0 = -5.5, Y1 = 5.5;
    const padL = 14, padR = 28, padT = 20, padB = 24;
    const px = x => padL + (x - X0) * U, py = y => padT + (Y1 - y) * U;
    const W = padL + (X1 - X0) * U + padR, H = padT + (Y1 - Y0) * U + padB;
    function base() {
        const g = [];
        for (let x = -5; x <= 5; x++) g.push(line(px(x), py(Y0), px(x), py(Y1), { c: GRID, w: 1 }));
        for (let y = -5; y <= 5; y++) g.push(line(px(X0), py(y), px(X1), py(y), { c: GRID, w: 1 }));
        g.push(...axes(px, py, X0, X1 + 0.6, Y0, Y1 + 0.5));
        for (let x = -5; x <= 5; x++) if (x) g.push(line(px(x), py(0) - 3, px(x), py(0) + 3, { w: 1.2 }));
        for (let y = -5; y <= 5; y++) if (y) g.push(line(px(0) - 3, py(y), px(0) + 3, py(y), { w: 1.2 }));
        g.push(txt(px(1), py(0) + 13, '1', { size: 11.5, fill: SOFT }));
        g.push(txt(px(0) - 5, py(1) + 4, '1', { size: 11.5, fill: SOFT, anchor: 'end' }));
        g.push(curve(px, py, f, X0, 3.6, Y0, Y1 + 0.1));
        g.push(txt(px(0.55), py(4.35), fnLab('f'), { size: 13, anchor: 'start', fill: BLUE }));
        return g;
    }
    FIG['u9'] = svg(W, H, base().join(''));
    // s1: extrempunkterna där f'(x) = 0
    {
        const g = base();
        g.push(dot(px(-3), py(4), { c: RED, r: 4, anim: aFade(BAS) }));
        g.push(line(px(-3), py(4), px(-3), py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 0.2) }));
        g.push(txt(px(-3), py(4) - 9, `${it('f')}′(${MINUS}3) = 0`, { size: 12, fill: RED, anim: aFade(BAS + 0.4) }));
        g.push(dot(px(1), py(f(1)), { c: RED, r: 4, anim: aFade(BAS + 0.7) }));
        g.push(txt(px(1.15), py(-1.75), `${it('f')}′(1) = 0`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u9-s1'] = svg(W, H, g.join(''));
    }
    // s2: derivatans graf, en parabel med nollställena −3 och 1 och vertex i x = −1
    {
        const U2 = 26, Y20 = -2.4, Y21 = 3.4;
        const py2 = y => padT + (Y21 - y) * U2;
        const W2 = W, H2 = padT + (Y21 - Y20) * U2 + padB;
        const g = [];
        for (let x = -5; x <= 5; x++) g.push(line(px(x), py2(Y20), px(x), py2(Y21), { c: GRID, w: 1 }));
        for (let y = -2; y <= 3; y++) g.push(line(px(X0), py2(y), px(X1), py2(y), { c: GRID, w: 1 }));
        g.push(...axes(px, py2, X0, X1 + 0.6, Y20, Y21 + 0.3));
        for (let x = -5; x <= 5; x++) if (x) g.push(line(px(x), py2(0) - 3, px(x), py2(0) + 3, { w: 1.2 }));
        g.push(txt(px(1) + 4, py2(0) + 15, '1', { size: 11.5, fill: SOFT, anchor: 'start' }));
        g.push(curve(px, py2, fp, X0, X1, Y20, Y21, { c: RED, w: 2.2, anim: aDraw(BAS, 0.8) }));
        [-3, 1].forEach((x, i) => g.push(dot(px(x), py2(0), { c: RED, r: 3.8, anim: aFade(BAS + 0.8 + i * 0.15) })));
        g.push(txt(px(-3) - 4, py2(0) + 15, MINUS + '3', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        g.push(line(px(-1), py2(Y21 - 0.2), px(-1), py2(Y20 + 0.1), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 1.2) }));
        g.push(dot(px(-1), py2(fp(-1)), { c: RED, r: 3.8, anim: aFade(BAS + 1.3) }));
        g.push(txt(px(-1) - 6, py2(Y21 - 0.2) + 10, `${it('x')} = ${MINUS}1`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 1.4) }));
        g.push(txt(px(2.7), py2(1.0), `${it('y')} = ${it('f')}′(${it('x')})`, { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }));
        FIG['u9-s2'] = svg(W2, H2, g.join(''));
    }
    // s3: den konkava delen (x ≤ −1) och inflexionspunkten
    {
        const g = base();
        g.push(curve(px, py, f, X0, -1, Y0, Y1, { c: RED, w: 3.2, anim: aDraw(BAS, 0.8) }));
        g.push(dot(px(-1), py(f(-1)), { c: RED, r: 4.2, anim: aFade(BAS + 0.8) }));
        g.push(line(px(-1), py(f(-1)), px(-1), py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 1.0) }));
        g.push(line(px(X0), py(0), px(-1), py(0), { c: RED, w: 4, cap: 'butt', anim: aFade(BAS + 1.2) }));
        g.push(dot(px(-1), py(0), { c: RED, r: 4, anim: aFade(BAS + 1.2) }));
        g.push(txt(px(-3.2), py(-0.75) + 4, `${it('x')} ≤ ${MINUS}1`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.4) }));
        g.push(txt(px(-1.18), py(1.15), 'inflexionspunkt', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.0) }));
        FIG['u9-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 10 — brantaste möjliga grafer från (6, 3) ================= */
(function () {
    const UX = 36, UY = 17, X0 = 0, X1 = 10.9, Y0 = -1, Y1 = 16.6;
    const padL = 34, padR = 24, padT = 16, padB = 22;
    const px = x => padL + (x - X0) * UX, py = y => padT + (Y1 - y) * UY;
    const W = padL + (X1 - X0) * UX + padR, H = padT + (Y1 - Y0) * UY + padB;
    function base() {
        const g = [];
        for (let x = 1; x <= 10; x++) g.push(line(px(x), py(Y0), px(x), py(16), { c: GRID, w: 1 }));
        for (let y = 1; y <= 16; y++) g.push(line(px(0), py(y), px(10.5), py(y), { c: GRID, w: 1 }));
        // axlar (y-axeln i x = 0, x-axeln i y = 0)
        g.push(line(px(0), py(0), px(X1) - 7, py(0), { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(X1))},${A(py(0))} ${A(px(X1) - 8)},${A(py(0) + 4.2)} ${A(px(X1) - 8)},${A(py(0) - 4.2)}" fill="${INK}"/>`);
        g.push(line(px(0), py(Y0), px(0), py(Y1) + 7, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(0))},${A(py(Y1))} ${A(px(0) + 4.2)},${A(py(Y1) + 8)} ${A(px(0) - 4.2)},${A(py(Y1) + 8)}" fill="${INK}"/>`);
        g.push(txt(px(X1) - 4, py(0) + 18, 'x', { size: 14, italic: true }));
        g.push(txt(px(0) - 12, py(Y1) + 9, 'y', { size: 14, italic: true }));
        for (let x = 1; x <= 10; x++) {
            g.push(line(px(x), py(0) - 3, px(x), py(0) + 3, { w: 1.2 }));
            g.push(txt(px(x), py(0) + 15, String(x), { size: 11, fill: SOFT }));
        }
        for (let y = 1; y <= 16; y++) g.push(line(px(0) - 3, py(y), px(0) + 3, py(y), { w: 1.2 }));
        [3, 5, 7, 10, 15].forEach(y => g.push(txt(px(0) - 6, py(y) + 4, String(y), { size: 11, fill: SOFT, anchor: 'end' })));
        g.push(dot(px(6), py(3), { r: 4 }));
        g.push(txt(px(6) + 4, py(3) + 18, '(6, 3)', { size: 12, anchor: 'start' }));
        return g;
    }
    const hoger = (d, red) => {
        const g = [];
        g.push(line(px(6), py(3), px(10), py(7), { c: RED, w: 2.2, anim: red ? aDraw(d, 0.5) : '' }));
        g.push(dot(px(10), py(7), { c: RED, r: 4, anim: red ? aFade(d + 0.5) : '' }));
        g.push(txt(px(10) - 6, py(7) - 9, '(10, 7)', { size: 12, fill: RED, anchor: 'end', anim: red ? aFade(d + 0.7) : '' }));
        g.push(txt(px(8.6), py(4.1) + 12, 'lutning 1', { size: 11.5, fill: RED, anchor: 'start', anim: red ? aFade(d + 0.8) : '' }));
        return g;
    };
    {
        const g = base();
        g.push(...hoger(BAS, true));
        FIG['u10-s1'] = svg(W, H, g.join(''));
    }
    {
        const g = base();
        g.push(...hoger(0, false));
        g.push(line(px(6), py(3), px(0), py(15), { c: RED, w: 2.2, anim: aDraw(BAS, 0.6) }));
        g.push(dot(px(0), py(15), { c: RED, r: 4.2, anim: aFade(BAS + 0.6) }));
        g.push(txt(px(0) + 9, py(15) - 7, '(0, 15)', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(txt(px(3.0), py(9.6), `lutning ${MINUS}2`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u10-s2'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 11 — cirkeln (x + 2)² + (y − 2)² = 8 ================= */
(function () {
    const r = Math.sqrt(8), C = { x: -2, y: 2 };
    const U = 40, X0 = -5.3, X1 = 2.2, Y0 = -1.1, Y1 = 5.3;
    const padL = 10, padR = 16, padT = 14, padB = 22;
    const px = x => padL + (x - X0) * U, py = y => padT + (Y1 - y) * U;
    const W = padL + (X1 - X0) * U + padR + 80, H = padT + (Y1 - Y0) * U + padB;
    const P = { x: C.x + r, y: 2 };
    function base() {
        const g = axes(px, py, X0, X1, Y0, Y1);
        g.push(`<circle cx="${A(px(C.x))}" cy="${A(py(C.y))}" r="${A(r * U)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(dot(px(P.x), py(P.y), { r: 3.8 }));
        g.push(txt(px(P.x) + 9, py(P.y) + 5, 'P', { size: 15, italic: true, anchor: 'start' }));
        return g;
    }
    FIG['u11'] = svg(W, H, base().join(''));
    // s1: medelpunkten och radien (till origo, som ligger på cirkeln)
    {
        const g = base();
        g.push(dot(px(C.x), py(C.y), { c: RED, r: 4, anim: aFade(BAS) }));
        g.push(txt(px(C.x), py(C.y) - 10, `(${MINUS}2, 2)`, { size: 12.5, fill: RED, anim: aFade(BAS + 0.2) }));
        g.push(line(px(C.x), py(C.y), px(0), py(0), { c: RED, w: 2, anim: aDraw(BAS + 0.5, 0.5) }));
        g.push(txt(px(-1.15) + 2, py(0.85) + 14, `${it('r')} = √8`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 1.0) }));
        FIG['u11-s1'] = svg(W, H, g.join(''));
    }
    // s2: vågrät radie till P, lodrät tangent och rät vinkel
    {
        const g = base();
        g.push(dot(px(C.x), py(C.y), { c: RED, r: 4 }));
        g.push(line(px(C.x), py(C.y), px(P.x), py(P.y), { c: RED, w: 2, anim: aDraw(BAS, 0.5) }));
        g.push(txt(px(C.x + r / 2), py(C.y) - 8, '√8', { size: 12.5, fill: RED, anim: aFade(BAS + 0.4) }));
        g.push(line(px(P.x), py(0.35), px(P.x), py(3.75), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS + 0.8) }));
        const s = 9;
        g.push(`<path d="M ${A(px(P.x) - s)} ${A(py(P.y))} L ${A(px(P.x) - s)} ${A(py(P.y) - s)} L ${A(px(P.x))} ${A(py(P.y) - s)}" fill="none" stroke="${RED}" stroke-width="1.2"${aFade(BAS + 1.0)}/>`);
        g.push(txt(px(P.x) + 9, py(P.y) + 24, `(√8 ${MINUS} 2, 2)`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        FIG['u11-s2'] = svg(W, H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 3c VT 2018, delprov B (genererade — redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma3c-vt2018-B.js,');
out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma3c-vt2018'] = Object.assign(window.NP_FIGURER['ma3c-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma3c-vt2018-figurer-B.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
