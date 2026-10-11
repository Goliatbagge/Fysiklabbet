// Generator för data/np/ma4-vt2018-figurer-C.js: NP Matematik 4 VT 2018,
// delprov C (uppgift 11–19). Alla koordinater beräknade, alla kurvor
// samplade tätt ur sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2018-C.js
// Konventioner som i gen-ma4-vt2022-C.js och -D.js: ink #0f1620, soft
// #3f4a5c, accent #c8324a (markeringar i lösningssteg), blå #1c3d6b.
// Animationsklasser: anim-draw (heldragna linjer ritas), anim-fade
// (etiketter, streckade linjer, punkter). BAS = basfördröjning.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.13)';

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
        (o.italic ? ' font-style="italic"' : '') + (o.weight ? ` font-weight="${o.weight}"` : '') +
        (o.anim || '') + `>${s}</text>`;
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

const svg = (w, h, inner, vx = 0, vy = 0) =>
    `<svg viewBox="${A(vx)} ${A(vy)} ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const rad = a => a * Math.PI / 180;
const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.6}" fill="${o.c || RED}"${o.anim || ''}/>`;

// Enhetscirkel med axlar (pilspets bara åt det positiva hållet) och
// tickmarkeringarna 1 och −1. C = medelpunkt, R = radie i px.
function enhetscirkel(C, R, o = {}) {
    const g = [], ext = R + 26;
    g.push(line(C.x - ext, C.y, C.x + ext, C.y, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x + ext + 7)},${A(C.y)} ${A(C.x + ext)},${A(C.y + 4.2)} ${A(C.x + ext)},${A(C.y - 4.2)}" fill="${INK}"/>`);
    g.push(line(C.x, C.y + ext, C.x, C.y - ext, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x)},${A(C.y - ext - 7)} ${A(C.x + 4.2)},${A(C.y - ext)} ${A(C.x - 4.2)},${A(C.y - ext)}" fill="${INK}"/>`);
    g.push(txt(C.x + ext + 4, C.y + 17, 'x', { size: 14, italic: true }));
    g.push(txt(C.x + 13, C.y - ext - 1, 'y', { size: 14, italic: true }));
    g.push(`<circle cx="${A(C.x)}" cy="${A(C.y)}" r="${A(R)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
    if (!o.utanEttor) {
        g.push(txt(C.x + R + 7, C.y + 15, '1', { size: 11.5, fill: SOFT, anchor: 'start' }));
        g.push(txt(C.x - R - 7, C.y + 15, MINUS + '1', { size: 11.5, fill: SOFT, anchor: 'end' }));
    }
    return g;
}

// ---- Koordinatsystem (samma som gen-ma4-vt2022-D.js) -------------------
function graph(cfg) {
    const ux = cfg.ux, uy = cfg.uy;
    const padL = cfg.padL ?? 40, padR = cfg.padR ?? 28, padT = cfg.padT ?? 22, padB = cfg.padB ?? 26;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    const ax = py(0), ay = px(0);
    if (cfg.grid) {
        (cfg.grid.xs || []).forEach(x => g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: GRID, w: 1 })));
        (cfg.grid.ys || []).forEach(y => g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: GRID, w: 1 })));
    }
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    g.push(txt(px(cfg.xmax) + 12, ax + (cfg.xlabDy ?? 17), cfg.xlab || it('x'), { size: 14 }));
    g.push(txt(ay + (cfg.ylabDx ?? 12), py(cfg.ymax) - 6, cfg.ylab || it('y'), { size: 14, anchor: cfg.ylabAnchor || 'middle' }));
    (cfg.xt || []).forEach(([v, lab]) => {
        g.push(line(px(v), ax - 3.5, px(v), ax + 3.5, { w: 1.2 }));
        if (lab != null) g.push(txt(px(v), ax + 16, lab, { size: 11.5, fill: SOFT }));
    });
    (cfg.yt || []).forEach(([v, lab]) => {
        g.push(line(ay - 3.5, py(v), ay + 3.5, py(v), { w: 1.2 }));
        if (lab != null) g.push(txt(ay - 7, py(v) + 4, lab, { size: 11.5, fill: SOFT, anchor: 'end' }));
    });
    return { W, H, px, py, base: g, cfg };
}

// Samplar f(x) tätt (steg ≤ 2,5 px) och klipper mot y-fönstret.
function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || Math.max(160, Math.ceil(Math.abs(G.px(x1) - G.px(x0)) / 2));
    const yPad = o.clip ?? 0.04 * (G.cfg.ymax - G.cfg.ymin);
    const lo = G.cfg.ymin - yPad, hi = G.cfg.ymax + yPad;
    let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n;
        const y = f(x);
        if (y < lo || y > hi || !isFinite(y)) { pen = false; continue; }
        d += (pen ? ' L ' : ' M ') + A(G.px(x)) + ' ' + A(G.py(y));
        pen = true;
    }
    return `<path d="${d.trim()}" fill="none" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.2}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + ' stroke-linejoin="round"' + (o.anim || '') + '/>';
}

const { textWidth } = require('../teckenbredd.js');

// Text där ett eller flera z ska ha konjugatstreck: parts = [[text, kursiv?, streck?], …].
// Strecket ritas som en egen linje ovanför bokstaven (text-decoration ger ett
// streck som hamnar fel i SVG). Bredderna mäts med teckenbredd.js.
function barText(x, y, parts, o = {}) {
    const size = o.size || 13, c = o.fill || INK;
    const plain = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const W = parts.reduce((w, p) => w + textWidth(plain(p[0]), size), 0);
    let x0 = o.anchor === 'middle' ? x - W / 2 : o.anchor === 'end' ? x - W : x;
    let html = '', out = '', cx = x0;
    parts.forEach(p => {
        const w = textWidth(plain(p[0]), size);
        html += p[1] ? `<tspan font-style="italic">${p[0]}</tspan>` : p[0];
        if (p[2]) out += line(cx + 0.12 * size, y - 0.76 * size, cx + w + 0.02 * size, y - 0.76 * size, { c, w: 1.1, anim: o.anim });
        cx += w;
    });
    return `<text x="${A(x0)}" y="${A(y)}" font-size="${size}" text-anchor="start" fill="${c}" xml:space="preserve"${o.anim || ''}>${html}</text>` + out;
}

const FIG = {};

/* ================= UPPGIFT 11: två vinklar med sinusvärdet 1/2 ======== */
(function () {
    const C = { x: 160, y: 150 }, R = 100;
    const g = enhetscirkel(C, R);
    const yH = C.y - R * 0.5;
    const xH = R * Math.cos(rad(30));
    const P1 = { x: C.x + xH, y: yH }, P2 = { x: C.x - xH, y: yH };
    // höjden 1/2: streckad vågrät linje genom båda punkterna
    g.push(line(C.x - R - 14, yH, C.x + R + 14, yH, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS) }));
    g.push(fracLab(C.x + R + 30, yH + 2, '1', '2', { fill: SOFT, w: 9, size: 11.5, anim: aFade(BAS) }));
    // 30°
    g.push(line(C.x, C.y, P1.x, P1.y, { c: RED, w: 1.8, anim: aDraw(BAS + 0.4) }));
    g.push(arc(C.x, C.y, 0, 30, 30, { c: RED, w: 1.6, anim: aDraw(BAS + 0.7, 0.4) }));
    g.push(dot(P1.x, P1.y, { anim: aFade(BAS + 0.8) }));
    g.push(txt(C.x + 44 * Math.cos(rad(15)) + 2, C.y - 44 * Math.sin(rad(15)) + 4.5, '30°', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
    // 150°
    g.push(line(C.x, C.y, P2.x, P2.y, { c: BLUE, w: 1.8, anim: aDraw(BAS + 1.3) }));
    g.push(arc(C.x, C.y, 0, 150, 18, { c: BLUE, w: 1.6, anim: aDraw(BAS + 1.6, 0.5) }));
    g.push(dot(P2.x, P2.y, { c: BLUE, anim: aFade(BAS + 1.8) }));
    g.push(txt(C.x - 4, C.y - 24, '150°', { size: 12, fill: BLUE, anchor: 'end', anim: aFade(BAS + 1.9) }));
    FIG['u11-s2'] = svg(340, 300, g.join(''));
})();

/* ================= UPPGIFT 14: frågefigur med pratbubblorna ============ */
(function () {
    const g = [];
    // bubbla med rundade hörn och en spets mot talaren
    function bubbla(x, y, w, h, spets, rader, namn, namnX, namnY) {
        const r = 12;
        const [tx, ty, side] = spets;   // spetsens punkt och vilken sida den sitter på
        let d;
        if (side === 'v') {
            // spets ut åt vänster från vänsterkanten, nära nederkanten
            const y0 = y + h - 26, y1 = y + h - 12;
            d = `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y1} L ${tx} ${ty} L ${x} ${y0} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
        } else {
            const y0 = y + h - 26, y1 = y + h - 12;
            d = `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y0} L ${tx} ${ty} L ${x + w} ${y1} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
        }
        g.push(`<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`);
        rader.forEach((s, i) => g.push(Array.isArray(s) ? barText(x + w / 2, y + 24 + i * 20, s, { size: 15, anchor: 'middle' }) : txt(x + w / 2, y + 24 + i * 20, s, { size: 15 })));
        g.push(txt(namnX, namnY, namn, { size: 13.5, fill: SOFT, weight: 600 }));
    }
        bubbla(70, 10, 132, 56, [36, 68, 'v'],
        [[['z', 1], [' + '], ['z', 1, 1], [' =']], 'Reellt tal'], 'Conny', 30, 92);
    bubbla(70, 96, 132, 56, [242, 150, 'h'],
        [[['z', 1], [' · '], ['z', 1, 1], [' =']], 'Reellt tal'], 'Yugat', 274, 168);
    FIG['u14'] = svg(310, 180, g.join(''));
})();

/* ================= UPPGIFT 14: z och konjugatet i talplanet ============ */
(function () {
    const O = { x: 70, y: 130 }, u = 34;           // 1 enhet = 34 px
    const a = 3, b = 2;
    const g = [];
    const xMax = O.x + 4.6 * u, yTop = O.y - 3.2 * u, yBot = O.y + 3.2 * u;
    g.push(line(O.x - 1.4 * u, O.y, xMax, O.y, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(xMax + 7)},${A(O.y)} ${A(xMax)},${A(O.y + 4.2)} ${A(xMax)},${A(O.y - 4.2)}" fill="${INK}"/>`);
    g.push(line(O.x, yBot, O.x, yTop, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(O.x)},${A(yTop - 7)} ${A(O.x + 4.2)},${A(yTop)} ${A(O.x - 4.2)},${A(yTop)}" fill="${INK}"/>`);
    g.push(txt(xMax + 6, O.y + 18, 'Re', { size: 13 }));
    g.push(txt(O.x + 8, yTop - 2, 'Im', { size: 13, anchor: 'start' }));
    const Z = { x: O.x + a * u, y: O.y - b * u }, Zb = { x: O.x + a * u, y: O.y + b * u };
    // z
    g.push(line(O.x, O.y, Z.x, Z.y, { c: BLUE, w: 1.8, anim: aDraw(BAS) }));
    g.push(dot(Z.x, Z.y, { c: BLUE, anim: aFade(BAS + 0.4) }));
    g.push(txt(Z.x + 9, Z.y - 6, `${it('z')} = ${it('a')} + ${it('b')}${it('i')}`, { size: 13, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.5) }));
    // konjugatet
    g.push(line(O.x, O.y, Zb.x, Zb.y, { c: RED, w: 1.8, anim: aDraw(BAS + 1.0) }));
    g.push(dot(Zb.x, Zb.y, { anim: aFade(BAS + 1.4) }));
    g.push(barText(Zb.x + 9, Zb.y + 17, [['z', 1, 1], [' = '], ['a', 1], [' ' + MINUS + ' '], ['bi', 1]], { size: 13, fill: RED, anim: aFade(BAS + 1.5) }));
    // spegling: streckad lodrät linje mellan punkterna, a på axeln
    g.push(line(Z.x, Z.y + 5, Zb.x, Zb.y - 5, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS + 1.9) }));
    g.push(txt(Z.x + 6, O.y - 6, it('a'), { size: 13, fill: SOFT, anchor: 'start', anim: aFade(BAS + 1.9) }));
    FIG['u14-s1'] = svg(300, 260, g.join(''));
})();

/* ================= UPPGIFT 15 a: sin v = cos v vid 45° och 225° ======== */
(function () {
    const C = { x: 160, y: 150 }, R = 100;
    const g = enhetscirkel(C, R);
    const P1 = { x: C.x + R * Math.cos(rad(45)), y: C.y - R * Math.sin(rad(45)) };
    const P2 = { x: C.x + R * Math.cos(rad(225)), y: C.y - R * Math.sin(rad(225)) };
    // 45°: punktens x- och y-koordinat lika stora (streckade projektioner)
    g.push(line(C.x, C.y, P1.x, P1.y, { c: RED, w: 1.8, anim: aDraw(BAS) }));
    g.push(arc(C.x, C.y, 0, 45, 28, { c: RED, w: 1.6, anim: aDraw(BAS + 0.3, 0.4) }));
    g.push(dot(P1.x, P1.y, { anim: aFade(BAS + 0.5) }));
    g.push(txt(C.x + 42 * Math.cos(rad(22.5)) + 2, C.y - 42 * Math.sin(rad(22.5)) + 4.5, '45°', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
    g.push(line(P1.x, P1.y + 5, P1.x, C.y, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS + 0.9) }));
    g.push(line(P1.x - 5, P1.y, C.x, P1.y, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS + 0.9) }));
    g.push(txt(P1.x + 9, P1.y - 7, `sin ${it('v')} = cos ${it('v')}`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
    // 225°: ett halvt varv bort
    g.push(line(C.x, C.y, P2.x, P2.y, { c: BLUE, w: 1.8, anim: aDraw(BAS + 1.6) }));
    g.push(arc(C.x, C.y, 0, 225, 16, { c: BLUE, w: 1.6, anim: aDraw(BAS + 1.9, 0.5) }));
    g.push(dot(P2.x, P2.y, { c: BLUE, anim: aFade(BAS + 2.2) }));
    g.push(txt(C.x - 20, C.y - 20, '225°', { size: 12, fill: BLUE, anchor: 'end', anim: aFade(BAS + 2.3) }));
    g.push(line(P2.x, P2.y - 5, P2.x, C.y, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS + 2.5) }));
    g.push(line(P2.x + 5, P2.y, C.x, P2.y, { c: SOFT, w: 1.2, dash: '4 3', anim: aFade(BAS + 2.5) }));
    FIG['u15-s3'] = svg(330, 300, g.join(''));
})();

/* ================= UPPGIFT 16: grafen och tangenten i (5, 3) ============ */
(function () {
    const f = x => Math.sqrt(2 * x - 1);
    const t = x => x / 3 + 4 / 3;
    const G = graph({ xmin: -1, xmax: 9, ymin: -1, ymax: 5, ux: 34, uy: 34, padL: 30, padR: 30, padT: 24, padB: 22,
        xt: [[1, '1'], [5, '5']], yt: [[1, '1'], [3, '3']],
        grid: { xs: [1, 2, 3, 4, 5, 6, 7, 8], ys: [1, 2, 3, 4] } });
    const g = G.base.slice();
    g.push(curvePath(G, f, 0.5, 9, { anim: aDraw(BAS, 0.7) }));
    g.push(barText(G.px(8.2), G.py(f(8.2)) + 44, [['y', 1], [' = √'], ['2', 0, 1], ['x', 1, 1], [' ' + MINUS + ' 1', 0, 1]], { size: 12.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.6) }));
    // tangenten
    g.push(line(G.px(-0.6), G.py(t(-0.6)), G.px(9), G.py(t(9)), { c: RED, w: 1.8, anim: aDraw(BAS + 1.2, 0.6) }));
    g.push(dot(G.px(5), G.py(3), { anim: aFade(BAS + 1.6) }));
    g.push(txt(G.px(5) + 2, G.py(3) + 22, '(5, 3)', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.7) }));
    {
        const lx = G.px(0.4), ly = G.py(4.3), an = aFade(BAS + 1.9);
        g.push(txt(lx, ly + 4, `${it('y')} =`, { size: 12.5, fill: RED, anchor: 'start', anim: an }));
        g.push(fracLab(lx + 30, ly, it('x'), '3', { fill: RED, w: 10, size: 12, anim: an }));
        g.push(txt(lx + 44, ly + 4, '+', { size: 12.5, fill: RED, anim: an }));
        g.push(fracLab(lx + 58, ly, '4', '3', { fill: RED, w: 10, size: 12, anim: an }));
    }
    FIG['u16-s7'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 18: grafen till |x − 1| + x − 1 ============= */
(function () {
    const f = x => Math.abs(x - 1) + x - 1;
    const G = graph({ xmin: -3, xmax: 4, ymin: -1, ymax: 5, ux: 34, uy: 34, padL: 30, padR: 30, padT: 24, padB: 22,
        xt: [[-2, MINUS + '2'], [-1, MINUS + '1'], [1, '1'], [2, '2'], [3, '3']], yt: [[2, '2'], [4, '4']],
        grid: { xs: [-2, -1, 1, 2, 3], ys: [1, 2, 3, 4] } });
    const g = G.base.slice();
    // vänstra delen: f = 0 (ligger på x-axeln), högra delen: f = 2(x − 1)
    g.push(line(G.px(-3), G.py(0), G.px(1), G.py(0), { c: BLUE, w: 3.4, cap: 'butt', anim: aDraw(BAS, 0.5) }));
    g.push(line(G.px(1), G.py(0), G.px(3.45), G.py(f(3.45)), { c: BLUE, w: 2.4, anim: aDraw(BAS + 0.5, 0.5) }));
    g.push(txt(G.px(-1.0), G.py(0) - 12, `${it('f')}(${it('x')}) = 0`, { size: 12.5, fill: BLUE, anim: aFade(BAS + 0.4) }));
    g.push(txt(G.px(2.55) + 10, G.py(f(2.55)) + 10, `${it('f')}(${it('x')}) = 2(${it('x')} ${MINUS} 1)`, { size: 12.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.0) }));
    FIG['u18-s4'] = svg(G.W + 40, G.H, g.join(''));
})();

/* ================= UPPGIFT 19: fallet a = 0 ger en terrasspunkt ======== */
(function () {
    const f = x => -6 * x + 2 * Math.sin(3 * x);
    const G = graph({ xmin: -2, xmax: 2, ymin: -10, ymax: 10, ux: 70, uy: 11, padL: 34, padR: 30, padT: 24, padB: 22,
        xt: [[-1, MINUS + '1'], [1, '1']], yt: [[-5, MINUS + '5'], [5, '5']],
        grid: { xs: [-1, 1], ys: [-5, 5] } });
    const g = G.base.slice();
    g.push(curvePath(G, f, -1.75, 1.75, { anim: aDraw(BAS, 0.8) }));
    g.push(txt(G.px(0.55), G.py(8), `${it('a')} = 0 och ${it('b')} = 2`, { size: 12.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.7) }));
    // punkten i origo. Den vågräta tangenten där sammanfaller med x-axeln,
    // så den ritas inte som egen linje.
    g.push(dot(G.px(0), G.py(0), { anim: aFade(BAS + 1.3) }));
    g.push(txt(G.px(0.12), G.py(0) - 32, 'terrasspunkt', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.5) }));
    FIG['u19-s5'] = svg(G.W, G.H, g.join(''));
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet: figurer till NP Ma 4 VT 2018, delprov C (genererade, redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2018-C.js).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2018'] = Object.assign(window.NP_FIGURER['ma4-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2018-figurer-C.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
