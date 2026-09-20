// Generator för data/np/ma2c-vt2018-figurer.js — NP Matematik 2c VT 2018.
// Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma2c-vt2018.js
// Konventioner: se .claude/np-figs/gen-ma2c-vt2022.js (samma helpers/stil).
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const SHADE = 'rgba(15,22,32,0.12)';
const SHADE2 = 'rgba(28,61,107,0.14)';
const SHADE3 = 'rgba(200,50,74,0.16)';
const PANEL = '#d7d7d7';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const MINUS = '−';
const dec = (v, n) => { const s = v.toFixed(n).replace('.', ','); return (v < 0 ? MINUS : '') + s.replace('-', ''); };

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

function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const h = o.head || Math.max(8, Math.min(12, L * 0.5));
    const bx = x2 - ux * h, by = y2 - uy * h;
    const wh = h * 0.44, px = -uy, py = ux;
    const animLine = o.anim !== undefined ? aDraw(o.anim, 0.4) : (o.fade !== undefined ? aFade(o.fade) : '');
    const animHead = o.anim !== undefined ? aFade(o.anim + 0.25) : (o.fade !== undefined ? aFade(o.fade) : '');
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 1.6, cap: 'butt', dash: o.dash, anim: animLine }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"${animHead}/>`;
}

function dim(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, h = o.head || 7, wh = h * 0.42;
    const px = -uy, py = ux;
    const c = o.c || INK, an = o.fade !== undefined ? aFade(o.fade) : '';
    const headAt = (tx, ty, sx, sy) =>
        `<polygon points="${A(tx + sx * h + px * wh)},${A(ty + sy * h + py * wh)} ${A(tx)},${A(ty)} ${A(tx + sx * h - px * wh)},${A(ty + sy * h - py * wh)}" fill="${c}"${an}/>`;
    return line(x1 + ux * h, y1 + uy * h, x2 - ux * h, y2 - uy * h, { c, w: o.w || 1.3, cap: 'butt', anim: an }) +
        headAt(x1, y1, ux, uy) + headAt(x2, y2, -ux, -uy);
}

function angleArc(vx, vy, a1, a2, r, o = {}) {
    let d = ((a2 - a1) % 360 + 360) % 360;
    if (d > 180 && !o.reflex) { const t = a1; a1 = a2; a2 = t; d = 360 - d; }
    const rad = a => a * Math.PI / 180;
    const p1 = { x: vx + r * Math.cos(rad(a1)), y: vy - r * Math.sin(rad(a1)) };
    const p2 = { x: vx + r * Math.cos(rad(a2)), y: vy - r * Math.sin(rad(a2)) };
    let s = `<path d="M ${A(p1.x)} ${A(p1.y)} A ${A(r)} ${A(r)} 0 ${d > 180 ? 1 : 0} 0 ${A(p2.x)} ${A(p2.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
    if (o.label) {
        const bis = rad(a1 + d / 2), lr = r + (o.labelR || 13);
        s += txt(vx + lr * Math.cos(bis), vy - lr * Math.sin(bis) + 4, o.label, { size: o.size || 11.5, fill: o.c || INK, anim: o.animLabel || o.anim || '' });
    }
    return s;
}
const angDeg = (from, to) => Math.atan2(-(to.y - from.y), to.x - from.x) * 180 / Math.PI;

function rightAngle(corner, d1, d2, size = 10, o = {}) {
    const p1 = { x: corner.x + d1.x * size, y: corner.y + d1.y * size };
    const p2 = { x: p1.x + d2.x * size, y: p1.y + d2.y * size };
    const p3 = { x: corner.x + d2.x * size, y: corner.y + d2.y * size };
    return `<path d="M ${A(p1.x)} ${A(p1.y)} L ${A(p2.x)} ${A(p2.y)} L ${A(p3.x)} ${A(p3.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
}

function poly(pts, o = {}) {
    return `<polygon points="${pts.map(p => `${A(p.x)},${A(p.y)}`).join(' ')}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'none'}" stroke-width="${o.w || 0}"${o.anim || ''}/>`;
}
const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.2}" fill="${o.c || INK}"${o.anim || ''}/>`;

// ---- Koordinatsystem-helper (som ma2c-vt2022) med valbara skalsiffror ----
function graph(cfg) {
    const ux = cfg.ux || 34, uy = cfg.uy || cfg.ux || 34;
    const padL = cfg.padL ?? 16, padR = cfg.padR ?? 24, padT = cfg.padT ?? 14, padB = cfg.padB ?? 20;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    if (cfg.grid) {
        for (let x = Math.ceil(cfg.xmin); x <= cfg.xmax; x++)
            g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: GRID, w: 1 }));
        for (let y = Math.ceil(cfg.ymin); y <= cfg.ymax; y++)
            g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: GRID, w: 1 }));
    }
    const ax = py(0), ay = px(0);
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    g.push(txt(px(cfg.xmax) + 12, ax + 17, 'x', { size: 14, italic: true }));
    g.push(txt(ay + 12, py(cfg.ymax) - 8, 'y', { size: 14, italic: true }));
    if (cfg.ticks) {
        for (let x = Math.ceil(cfg.xmin); x <= cfg.xmax; x++) {
            if (x === 0) continue;
            g.push(line(px(x), ax - 3, px(x), ax + 3, { w: 1.2 }));
            if (cfg.xlab && cfg.xlab.indexOf(x) < 0) continue;
            g.push(txt(px(x), ax + 16, (x < 0 ? MINUS : '') + Math.abs(x), { size: 11.5, fill: SOFT }));
        }
        for (let y = Math.ceil(cfg.ymin); y <= cfg.ymax; y++) {
            if (y === 0) continue;
            g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
            if (cfg.ylab && cfg.ylab.indexOf(y) < 0) continue;
            g.push(txt(ay - 7, py(y) + 4, (y < 0 ? MINUS : '') + Math.abs(y), { size: 11.5, fill: SOFT, anchor: 'end' }));
        }
    }
    return { W, H, px, py, base: g, cfg };
}

function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || 160;
    const yPad = 0.04 * (G.cfg.ymax - G.cfg.ymin);
    const lo = G.cfg.ymin - yPad, hi = G.cfg.ymax + yPad;
    let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n;
        const y = f(x);
        if (y < lo || y > hi || !isFinite(y)) { pen = false; continue; }
        d += (pen ? ' L ' : ' M ') + A(G.px(x)) + ' ' + A(G.py(y));
        pen = true;
    }
    return `<path d="${d.trim()}" fill="none" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.4}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.anim || '') + '/>';
}

// Generellt diagram med egen skala i x och y (tal med decimaler tillåtna).
// cfg: xmin, xmax, ymin, ymax, ux, uy, xstep, ystep, xdec, ydec, xlabTxt, ylabTxt
function panel(cfg) {
    const padL = cfg.padL ?? 40, padR = cfg.padR ?? 26, padT = cfg.padT ?? 18, padB = cfg.padB ?? 26;
    const W = padL + (cfg.xmax - cfg.xmin) * cfg.ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * cfg.uy + padB;
    const px = x => padL + (x - cfg.xmin) * cfg.ux;
    const py = y => padT + (cfg.ymax - y) * cfg.uy;
    const g = [];
    const ax = py(Math.max(0, cfg.ymin)), ay = px(Math.max(0, cfg.xmin));
    if (cfg.grid) {
        for (let x = cfg.xmin; x <= cfg.xmax + 1e-9; x += cfg.xstep)
            g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: GRID, w: 1 }));
        for (let y = cfg.ymin; y <= cfg.ymax + 1e-9; y += cfg.ystep)
            g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: GRID, w: 1 }));
    }
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    g.push(txt(px(cfg.xmax) + (cfg.xlabTxt ? 20 : 12), ax + 17, cfg.xlabTxt || 'x', { size: 14, italic: cfg.xlabTxt ? false : true, anchor: cfg.xlabTxt ? 'start' : 'middle' }));
    g.push(txt(ay + 12, py(cfg.ymax) - 8, cfg.ylabTxt || 'y', { size: 14, italic: cfg.ylabTxt ? false : true, anchor: 'start' }));
    for (let x = cfg.xmin; x <= cfg.xmax + 1e-9; x += cfg.xstep) {
        if (Math.abs(x) < 1e-9 && cfg.xmin <= 0) continue;
        if (x < cfg.xmin - 1e-9) continue;
        g.push(line(px(x), ax - 3, px(x), ax + 3, { w: 1.2 }));
        g.push(txt(px(x), ax + 16, dec(x, cfg.xdec || 0), { size: 11.5, fill: SOFT }));
    }
    for (let y = cfg.ymin; y <= cfg.ymax + 1e-9; y += cfg.ystep) {
        if (Math.abs(y) < 1e-9 && cfg.ymin <= 0) continue;
        g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
        g.push(txt(ay - 7, py(y) + 4, dec(y, cfg.ydec || 0), { size: 11.5, fill: SOFT, anchor: 'end' }));
    }
    const G = { W, H, px, py, base: g, cfg: { ymin: cfg.ymin, ymax: cfg.ymax } };
    return G;
}

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ================= UPPGIFT 1 — rät linje y = 2x + 3 ================= */
(function () {
    const f = x => 2 * x + 3;
    function base() {
        const G = graph({ xmin: -5, xmax: 5, ymin: -4, ymax: 7, ux: 26, uy: 26, grid: true, ticks: true, padL: 18 });
        const g = G.base.slice();
        g.push(curvePath(G, f, -3.5, 2, { c: INK, w: 2.2 }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u1'] = svg(G.W, G.H, g.join('')); }
    {
        const { G, g } = base();
        g.push(dot(G.px(0), G.py(3), { c: RED, r: 3.6, anim: aFade(BAS) }));
        g.push(txt(G.px(0) - 9, G.py(3) - 6, `${it('m')} = 3`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.2) }));
        FIG['u1-s1'] = svg(G.W, G.H, g.join(''));
    }
    {
        const { G, g } = base();
        g.push(dot(G.px(0), G.py(3), { c: RED, r: 3.6 }));
        g.push(txt(G.px(0) - 9, G.py(3) - 6, `${it('m')} = 3`, { size: 12, fill: RED, anchor: 'end' }));
        // lutningstrappan från (0, 3): 1 åt höger, 2 upp
        g.push(line(G.px(0), G.py(3), G.px(1), G.py(3), { c: RED, w: 1.6, dash: '4 3', anim: aFade(BAS) }));
        g.push(line(G.px(1), G.py(3), G.px(1), G.py(5), { c: RED, w: 1.6, dash: '4 3', anim: aFade(BAS + 0.3) }));
        g.push(dot(G.px(1), G.py(5), { c: RED, r: 3.6, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(0.5), G.py(3) + 15, '1', { size: 11.5, fill: RED, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(1) + 8, G.py(4) + 4, '2', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.45) }));
        g.push(txt(G.px(2.2), G.py(5.3), `${it('k')} = 2`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.7) }));
        FIG['u1-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 2 — parabeln genom (−3, 0), (−1, −4), (1, 0) ================= */
(function () {
    const f = x => x * x + 2 * x - 3;
    function base() {
        const G = graph({ xmin: -4, xmax: 3, ymin: -5, ymax: 2, ux: 30, uy: 30, grid: true, ticks: true, padL: 18, padT: 18 });
        const g = G.base.slice();
        g.push(curvePath(G, f, -4.3, 2.3, { c: INK, w: 2.2 }));
        g.push(txt(G.px(1.35), G.py(-2.2), fnLab('f'), { size: 12.5, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u2'] = svg(G.W, G.H, g.join('')); }
    {
        const { G, g } = base();
        g.push(dot(G.px(-3), G.py(0), { c: RED, r: 3.6, anim: aFade(BAS) }));
        g.push(dot(G.px(1), G.py(0), { c: RED, r: 3.6, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(-3) + 8, G.py(0) - 8, `${it('x')}₁ = ${MINUS}3`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(1) + 6, G.py(-0.9), `${it('x')}₂ = 1`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(-1.3), G.py(1.5), 'nollställen', { size: 12, fill: RED, anim: aFade(BAS + 0.6) }));
        FIG['u2-s1'] = svg(G.W, G.H, g.join(''));
    }
    {
        const { G, g } = base();
        g.push(line(G.px(-1), G.py(-5), G.px(-1), G.py(2), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        g.push(txt(G.px(-1) - 6, G.py(2) - 3, `${it('x')} = ${MINUS}1`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(-1) - 6, G.py(-4.75), 'symmetrilinje', { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        FIG['u2-s2'] = svg(G.W, G.H, g.join(''));
    }
    {
        const { G, g } = base();
        g.push(dot(G.px(-1), G.py(-4), { c: RED, r: 3.8, anim: aFade(BAS) }));
        g.push(txt(G.px(-1.3), G.py(-4) + 17, `(${MINUS}1, ${MINUS}4)`, { size: 11.5, fill: RED, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(-1.3), G.py(-4) + 31, 'minimipunkt', { size: 12, fill: RED, anim: aFade(BAS + 0.4) }));
        FIG['u2-s3'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 3 — normalfördelningar ================= */
(function () {
    const bellY = (mu, sigma, h, x) => h * Math.exp(-((x - mu) * (x - mu)) / (2 * sigma * sigma));
    function bellPath(px, py, mu, sigma, h, x0, x1, o = {}) {
        const n = 140;
        let d = '';
        for (let i = 0; i <= n; i++) {
            const x = x0 + (x1 - x0) * i / n;
            const y = bellY(mu, sigma, h, x);
            d += (i === 0 ? 'M ' : 'L ') + A(px(x)) + ' ' + A(py(y)) + ' ';
        }
        return `<path d="${d.trim()}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.8}"${o.anim || ''}/>`;
    }
    const A_HPEAK = 62;
    function panelA() {
        const xmin = 1.3, xmax = 15.7, ux = 27;
        const padL = 16, padR = 30, padT = 34, padB = 22;
        const W = padL + (xmax - xmin) * ux + padR;
        const H = padT + A_HPEAK + padB;
        const px = x => padL + (x - xmin) * ux;
        const py = h => H - padB - h;
        const baseY = H - padB;
        const g = [];
        g.push(line(px(xmin), baseY, px(xmax) + 6, baseY, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(xmax) + 12)},${A(baseY)} ${A(px(xmax) + 5)},${A(baseY + 4)} ${A(px(xmax) + 5)},${A(baseY - 4)}" fill="${INK}"/>`);
        for (let x = 2; x <= 15; x++) {
            const yTop = bellY(9, 2, A_HPEAK, x);
            g.push(line(px(x), baseY, px(x), py(yTop), { w: 0.8, c: GRID }));
            g.push(line(px(x), baseY - 2, px(x), baseY + 2, { w: 1 }));
            g.push(txt(px(x), baseY + 14, String(x), { size: 10.5, fill: SOFT }));
        }
        g.push(bellPath(px, py, 9, 2, A_HPEAK, xmin, xmax));
        return { g, W, H, px, py, baseY };
    }
    function panelB(overrides) {
        const xmin = 0.3, xmax = 19.7, ux = 24.5;
        const padL = 16, padR = 30, padT = 32, padB = 22;
        const defs = [
            { letter: 'A', mu: 3, sigma: 1.7, h: 30 },
            { letter: 'B', mu: 7, sigma: 0.9, h: 92 },
            { letter: 'C', mu: 11, sigma: 1.15, h: 62 },
            { letter: 'D', mu: 15, sigma: 0.45, h: 130 },
            { letter: 'E', mu: 17.5, sigma: 1.3, h: 46 },
        ];
        const hMax = Math.max(...defs.map(d => d.h));
        const W = padL + (xmax - xmin) * ux + padR;
        const H = padT + hMax + padB;
        const px = x => padL + (x - xmin) * ux;
        const py = h => H - padB - h;
        const baseY = H - padB;
        const g = [];
        g.push(line(px(xmin), baseY, px(xmax) + 6, baseY, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(xmax) + 12)},${A(baseY)} ${A(px(xmax) + 5)},${A(baseY + 4)} ${A(px(xmax) + 5)},${A(baseY - 4)}" fill="${INK}"/>`);
        for (let x = 1; x <= 19; x++) {
            g.push(line(px(x), baseY - 2, px(x), baseY + 2, { w: 1 }));
            g.push(txt(px(x), baseY + 14, String(x), { size: 10.5, fill: SOFT }));
        }
        defs.forEach(d => {
            const ov = (overrides && overrides[d.letter]) || {};
            const color = ov.color || INK, anim = ov.anim || '', w = ov.w || 1.8;
            const x0 = Math.max(xmin, d.mu - 4.3 * d.sigma), x1 = Math.min(xmax, d.mu + 4.3 * d.sigma);
            g.push(bellPath(px, py, d.mu, d.sigma, d.h, x0, x1, { c: color, w, anim }));
            g.push(txt(px(d.mu), py(d.h) - 9, d.letter, { size: 13, fill: ov.labelColor || color }));
        });
        return { g, W, H, px, py, baseY, defs };
    }
    function build(variant) {
        const PA = panelA();
        const overrides = variant === 's2' ? {
            A: { color: RED, anim: aDraw(BAS, 0.7) },
            B: { color: SOFT }, C: { color: SOFT }, D: { color: SOFT }, E: { color: SOFT },
        } : null;
        const PB = panelB(overrides);
        const offX = 26, gap = 30;
        const W = Math.max(PA.W, PB.W) + offX;
        const yB = PA.H + gap;
        const H = yB + PB.H;
        const parts = [];
        parts.push(txt(10, 16, 'a)', { size: 13, anchor: 'start' }));
        parts.push(`<g transform="translate(${A(offX)},0)">${PA.g.join('')}</g>`);
        parts.push(txt(10, yB + 16, 'b)', { size: 13, anchor: 'start' }));
        parts.push(`<g transform="translate(${A(offX)},${A(yB)})">${PB.g.join('')}</g>`);
        if (variant === 's1') {
            const muX = PA.px(9), yTop = PA.py(A_HPEAK);
            const inner = line(muX, PA.baseY, muX, yTop, { c: RED, w: 1.6, dash: '4 4', anim: aFade(BAS) }) +
                txt(muX + 8, yTop - 10, 'medelvärde 9', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) });
            parts.push(`<g transform="translate(${A(offX)},0)">${inner}</g>`);
        }
        if (variant === 's2') {
            const aDef = PB.defs.find(d => d.letter === 'A');
            const xLbl = PB.px(1.2), yLbl = PB.py(aDef.h) - 26;
            const inner = txt(xLbl, yLbl, 'störst spridning', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) });
            parts.push(`<g transform="translate(${A(offX)},${A(yB)})">${inner}</g>`);
        }
        return svg(W, H, parts.join(''));
    }
    FIG['u3'] = build('base');
    FIG['u3-s1'] = build('s1');
    FIG['u3-s2'] = build('s2');
})();

/* ================= UPPGIFT 16 — (lg x)^8 mot x, två fönster ================= */
(function () {
    const f = x => Math.pow(Math.log10(x), 8);
    // vänster fönster: 0 ≤ x ≤ 0,5 — höger fönster: 0 ≤ x ≤ 100
    function build(variant) {
        const L = panel({ xmin: 0, xmax: 0.5, ymin: 0, ymax: 0.5, ux: 400, uy: 240, xstep: 0.1, ystep: 0.1, xdec: 1, ydec: 1, grid: true, padL: 34 });
        const R = panel({ xmin: 0, xmax: 100, ymin: 0, ymax: 100, ux: 2.0, uy: 1.2, xstep: 10, ystep: 10, grid: true, padL: 34 });
        const gL = L.base.slice(), gR = R.base.slice();
        // g(x) = x
        gL.push(curvePath(L, x => x, 0, 0.5, { c: INK, w: 2 }));
        gR.push(curvePath(R, x => x, 0, 100, { c: INK, w: 2 }));
        // f(x) = (lg x)^8
        gL.push(curvePath(L, f, 0.1, 0.5, { c: BLUE, w: 2.4, n: 260 }));
        gR.push(curvePath(R, f, 0.5, 100, { c: BLUE, w: 2.4, n: 260 }));
        gL.push(txt(L.px(0.42), L.py(0.42) - 8, fnLab('g'), { size: 11.5, anchor: 'end' }));
        gL.push(txt(L.px(0.13) + 8, L.py(0.36), fnLab('f'), { size: 11.5, fill: BLUE, anchor: 'start' }));
        gR.push(txt(R.px(84), R.py(84) + 16, fnLab('g'), { size: 11.5, anchor: 'start' }));
        gR.push(txt(R.px(52), R.py(76) - 6, fnLab('f'), { size: 11.5, fill: BLUE, anchor: 'end' }));
        if (variant === 's1') {
            gL.push(dot(L.px(0.161), L.py(0.161), { c: RED, r: 4, anim: aFade(BAS) }));
            gL.push(txt(L.px(0.161) + 10, L.py(0.161) + 4, `${it('x')} ≈ 0,16`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
            gR.push(dot(R.px(37.6), R.py(37.6), { c: RED, r: 4, anim: aFade(BAS + 0.4) }));
            gR.push(txt(R.px(37.6) + 10, R.py(37.6) + 4, `${it('x')} ≈ 37,6`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        }
        const gap = 40;
        const W = L.W + gap + R.W, H = Math.max(L.H, R.H) + 22;
        const parts = [];
        parts.push(txt(10, 14, '0 ≤ ' + it('x') + ' ≤ 0,5', { size: 12, anchor: 'start', fill: SOFT }));
        parts.push(`<g transform="translate(0,${A(22)})">${gL.join('')}</g>`);
        parts.push(txt(L.W + gap + 10, 14, '0 ≤ ' + it('x') + ' ≤ 100', { size: 12, anchor: 'start', fill: SOFT }));
        parts.push(`<g transform="translate(${A(L.W + gap)},${A(22)})">${gR.join('')}</g>`);
        return svg(W, H, parts.join(''));
    }
    FIG['u16-s1'] = build('base');
    FIG['u16-s2'] = build('s1');
})();

/* ================= UPPGIFT 17 — spegeln på marken ================= */
(function () {
    const groundY = 200, X0 = 40;
    const person = { x: 90 }, mirror = { x: 150 }, tree = { x: 350 };
    const eyeH = 40, treeH = 160;
    const eye = { x: person.x, y: groundY - eyeH };
    const top = { x: tree.x, y: groundY - treeH };
    const M = { x: mirror.x, y: groundY };
    function base() {
        const g = [];
        // marken
        g.push(line(X0, groundY, tree.x + 90, groundY, { w: 2.2, cap: 'butt' }));
        for (let x = X0 + 6; x < tree.x + 90; x += 14)
            g.push(line(x, groundY, x - 6, groundY + 7, { w: 1, c: SOFT }));
        // spegeln
        g.push(`<rect x="${A(M.x - 12)}" y="${A(groundY - 3)}" width="24" height="3" fill="${BLUE}"/>`);
        g.push(txt(M.x, groundY - 48, 'Spegel', { size: 11.5, fill: SOFT }));
        g.push(arrow(M.x, groundY - 42, M.x, groundY - 8, { c: SOFT, w: 1.1, head: 7 }));
        // personen: huvud, kropp, ben, armar (streckgubbe)
        const hx = person.x, hy = groundY - eyeH - 2;
        g.push(`<circle cx="${A(hx)}" cy="${A(hy)}" r="5" fill="none" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(line(hx, hy + 5, hx, groundY - 14, { w: 1.6 }));
        g.push(line(hx, groundY - 14, hx - 6, groundY, { w: 1.6 }));
        g.push(line(hx, groundY - 14, hx + 6, groundY, { w: 1.6 }));
        g.push(line(hx, hy + 14, hx - 7, hy + 24, { w: 1.4 }));
        g.push(line(hx, hy + 14, hx + 7, hy + 24, { w: 1.4 }));
        // trädet: stam + tre grantoppar
        g.push(`<rect x="${A(tree.x - 5)}" y="${A(groundY - 22)}" width="10" height="22" fill="${SOFT}"/>`);
        const tiers = [[0, 44, 52], [40, 36, 46], [76, 26, 40], [104, 14, 40]];
        tiers.forEach(([yOff, w, h]) => {
            const yb = groundY - 16 - yOff;
            g.push(poly([{ x: tree.x - w, y: yb }, { x: tree.x + w, y: yb }, { x: tree.x, y: yb - h }], { fill: 'none', stroke: INK, w: 1.5 }));
        });
        // siktlinjer (streckade) och vinklarna v
        g.push(line(eye.x, eye.y, M.x, M.y, { w: 1.3, dash: '5 4' }));
        g.push(line(M.x, M.y, top.x, top.y, { w: 1.3, dash: '5 4' }));
        g.push(angleArc(M.x, M.y, 180, angDeg(M, eye), 16, { label: it('v'), labelR: 12, size: 11 }));
        g.push(angleArc(M.x, M.y, angDeg(M, top), 0, 16, { label: it('v'), labelR: 12, size: 11 }));
        // mått
        g.push(dim(person.x - 26, groundY, person.x - 26, eye.y, {}));
        g.push(txt(person.x - 32, groundY - eyeH / 2 + 4, '1,70', { size: 11.5, anchor: 'end' }));
        const dimY = groundY + 24;
        g.push(line(person.x, groundY + 6, person.x, dimY + 4, { w: 0.9, c: SOFT }));
        g.push(line(M.x, groundY + 6, M.x, dimY + 4, { w: 0.9, c: SOFT }));
        g.push(line(tree.x, groundY + 6, tree.x, dimY + 4, { w: 0.9, c: SOFT }));
        g.push(dim(person.x, dimY, M.x, dimY, {}));
        g.push(txt((person.x + M.x) / 2, dimY + 16, '2,10', { size: 11.5 }));
        g.push(dim(M.x, dimY, tree.x, dimY, {}));
        g.push(txt((M.x + tree.x) / 2, dimY + 16, '13,2', { size: 11.5 }));
        g.push(dim(tree.x + 58, groundY, tree.x + 58, top.y, {}));
        g.push(txt(tree.x + 66, groundY - treeH / 2 + 4, it('x'), { size: 13, anchor: 'start' }));
        g.push(txt(tree.x + 92, top.y - 6, '(m)', { size: 12, fill: SOFT, anchor: 'end' }));
        return g;
    }
    const W = tree.x + 100, H = groundY + 46;
    FIG['u17'] = svg(W, H, base().join(''));
    {
        const g = base();
        g.push(poly([eye, { x: person.x, y: groundY }, M], { fill: SHADE2, anim: aFade(BAS) }));
        g.push(poly([top, { x: tree.x, y: groundY }, M], { fill: SHADE3, anim: aFade(BAS + 0.3) }));
        g.push(txt(M.x - 30, groundY - 58, 'liten', { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.5) }));
        g.push(txt(tree.x - 100, groundY - 90, 'stor', { size: 11.5, fill: RED, anim: aFade(BAS + 0.7) }));
        FIG['u17-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 18 — normalfördelning μ = 0,90, σ = 0,40 ================= */
(function () {
    const mu = 0.9, sigma = 0.4;
    const xmin = -0.4, xmax = 2.2, ux = 150;
    const padL = 20, padR = 40, padT = 40, padB = 46;
    const HP = 110;
    const W = padL + (xmax - xmin) * ux + padR;
    const H = padT + HP + padB;
    const px = x => padL + (x - xmin) * ux;
    const baseY = H - padB;
    const py = h => baseY - h;
    const bell = x => HP * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
    function build(variant) {
        const g = [];
        g.push(line(px(xmin), baseY, px(xmax) + 6, baseY, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(xmax) + 12)},${A(baseY)} ${A(px(xmax) + 5)},${A(baseY + 4)} ${A(px(xmax) + 5)},${A(baseY - 4)}" fill="${INK}"/>`);
        // skuggning: svansen till höger om 1,70
        if (variant !== 'base') {
            let d = `M ${A(px(1.7))} ${A(baseY)}`;
            for (let i = 0; i <= 60; i++) { const x = 1.7 + (xmax - 1.7) * i / 60; d += ` L ${A(px(x))} ${A(py(bell(x)))}`; }
            d += ` L ${A(px(xmax))} ${A(baseY)} Z`;
            g.push(`<path d="${d}" fill="${SHADE3}" stroke="none"${aFade(BAS + 0.6)}/>`);
        }
        let d = '';
        for (let i = 0; i <= 200; i++) { const x = xmin + (xmax - xmin) * i / 200; d += (i ? ' L ' : 'M ') + A(px(x)) + ' ' + A(py(bell(x))); }
        g.push(`<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        const marks = [[0.1, `${it('μ')} ${MINUS} 2${it('σ')}`, '0,10'], [0.5, `${it('μ')} ${MINUS} ${it('σ')}`, '0,50'], [0.9, it('μ'), '0,90'], [1.3, `${it('μ')} + ${it('σ')}`, '1,30'], [1.7, `${it('μ')} + 2${it('σ')}`, '1,70']];
        marks.forEach(([x, lab, val]) => {
            g.push(line(px(x), baseY - 3, px(x), baseY + 3, { w: 1.2 }));
            g.push(txt(px(x), baseY + 15, val, { size: 11, fill: SOFT }));
            g.push(txt(px(x), baseY + 29, lab, { size: 10.5, fill: SOFT }));
        });
        g.push(line(px(mu), baseY, px(mu), py(HP), { w: 1, c: SOFT, dash: '3 3' }));
        if (variant !== 'base') {
            g.push(line(px(1.7), baseY, px(1.7), py(bell(1.7)) - 30, { w: 1.4, c: RED, dash: '4 3', anim: aFade(BAS) }));
            g.push(txt(px(1.7) + 6, py(bell(1.7)) - 34, '1,70', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
            g.push(dim(px(0.1), py(HP) - 16, px(1.7), py(HP) - 16, { c: BLUE, fade: BAS + 0.3 }));
            g.push(txt(px(mu), py(HP) - 22, '95,4 %', { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.5) }));
            g.push(txt(px(1.95), py(bell(1.85)) - 16, '2,3 %', { size: 11.5, fill: RED, anim: aFade(BAS + 0.8) }));
            g.push(arrow(px(1.95), py(bell(1.85)) - 12, px(1.84), py(bell(1.84) / 3), { c: RED, w: 1.1, head: 7, fade: BAS + 0.8 }));
        }
        return svg(W, H, g.join(''));
    }
    FIG['u18-s1'] = build('s1');
})();

/* ================= UPPGIFT 19 — linjen y = 3x − 1 flyttas ================= */
(function () {
    const f = x => 3 * x - 1, f2 = x => 3 * x - 10;
    function base() {
        const G = graph({ xmin: -4, xmax: 4, ymin: -4, ymax: 4, ux: 28, uy: 28, grid: true, ticks: true, xlab: [1], ylab: [1], padL: 18 });
        const g = G.base.slice();
        g.push(curvePath(G, f, -1.1, 1.75, { c: INK, w: 2.2 }));
        g.push(txt(G.px(1.4), G.py(2.1), `${it('y')} = 3${it('x')} ${MINUS} 1`, { size: 12, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u19'] = svg(G.W, G.H, g.join('')); }
    {
        const { G, g } = base();
        g.push(dot(G.px(0), G.py(-1), { c: RED, r: 3.6, anim: aFade(BAS) }));
        g.push(txt(G.px(0) - 12, G.py(-1) + 15, `(0, ${MINUS}1)`, { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.1) }));
        g.push(line(G.px(0), G.py(-1), G.px(2), G.py(-1), { c: RED, w: 1.4, dash: '4 3', anim: aFade(BAS + 0.3) }));
        g.push(arrow(G.px(2), G.py(-1), G.px(2), G.py(-4), { c: RED, w: 1.4, dash: '4 3', fade: BAS + 0.5, head: 8 }));
        g.push(txt(G.px(1), G.py(-1) + 15, '+2', { size: 11, fill: RED, anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(2) + 7, G.py(-2.5) + 4, `${MINUS}3`, { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        g.push(dot(G.px(2), G.py(-4), { c: RED, r: 3.6, anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(2) + 8, G.py(-4) + 4, `(2, ${MINUS}4)`, { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u19-s1'] = svg(G.W, G.H, g.join(''));
    }
    {
        const { G, g } = base();
        g.push(dot(G.px(0), G.py(-1), { c: RED, r: 3.6 }));
        g.push(dot(G.px(2), G.py(-4), { c: RED, r: 3.6 }));
        g.push(curvePath(G, f2, 1.9, 4.4, { c: RED, w: 2.2, anim: aDraw(BAS, 0.8) }));
        g.push(txt(G.px(2.65), G.py(-3.55), `${it('y')} = 3${it('x')} ${MINUS} 10`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u19-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 20 — triangeln (0, 0), (2, 4), (10, 0) ================= */
(function () {
    const G = graph({ xmin: -1, xmax: 11, ymin: -1, ymax: 5, ux: 30, uy: 30, grid: true, ticks: true, xlab: [2, 4, 6, 8, 10], ylab: [2, 4], padL: 18 });
    const O = { x: G.px(0), y: G.py(0) }, P = { x: G.px(2), y: G.py(4) }, Q = { x: G.px(10), y: G.py(0) };
    function base() {
        const g = G.base.slice();
        g.push(poly([O, P, Q], { fill: SHADE, stroke: INK, w: 2 }));
        g.push(dot(O.x, O.y), dot(P.x, P.y), dot(Q.x, Q.y));
        g.push(txt(P.x - 8, P.y - 8, '(2, 4)', { size: 12, anchor: 'end' }));
        g.push(txt(Q.x + 8, Q.y - 8, '(10, 0)', { size: 12, anchor: 'start' }));
        g.push(txt(O.x - 8, O.y - 8, '(0, 0)', { size: 12, anchor: 'end' }));
        return g;
    }
    FIG['u20'] = svg(G.W, G.H, base().join(''));
    {
        const g = base();
        g.push(txt((O.x + P.x) / 2 + 7, (O.y + P.y) / 2 + 2, `√20`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS) }));
        g.push(txt((P.x + Q.x) / 2 + 6, (P.y + Q.y) / 2 - 8, `√80`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(txt((O.x + Q.x) / 2, O.y + 30, '10', { size: 12, fill: RED, anim: aFade(BAS + 0.4) }));
        FIG['u20-s1'] = svg(G.W, G.H, g.join(''));
    }
    {
        const g = base();
        const d1 = { x: (O.x - P.x), y: (O.y - P.y) }, d2 = { x: (Q.x - P.x), y: (Q.y - P.y) };
        const n1 = Math.hypot(d1.x, d1.y), n2 = Math.hypot(d2.x, d2.y);
        g.push(rightAngle(P, { x: d1.x / n1, y: d1.y / n1 }, { x: d2.x / n2, y: d2.y / n2 }, 11, { c: RED, w: 1.6, anim: aFade(BAS) }));
        g.push(txt(P.x + 40, P.y + 2, 'rät vinkel', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        FIG['u20-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 21 — sex utsnitt A–F ================= */
(function () {
    const PW = 150, PH = 150, gapX = 40, gapY = 36, X0 = 10, Y0 = 26;
    // f(t) med t i [0, 1] → panelen; värde i [0, 1]
    const defs = [
        { L: 'A', f: x => 0.1 + 0.5 * (x - 1.3) ** 2, xr: [0.2, 1.1], p: 0.55 },
        { L: 'B', f: x => 0.1 + 0.5 * (x + 0.3) ** 2, xr: [-0.1, 0.8], p: 0.45 },
        { L: 'C', f: x => 0.15 + 1.4 * (x - 0.5) ** 2, xr: [0.05, 0.95], p: 0.5 },
        { L: 'D', f: x => 0.85 - 1.4 * (x - 0.5) ** 2, xr: [0.05, 0.95], p: 0.5 },
        { L: 'E', f: x => 0.9 - 0.5 * (x - 1.3) ** 2, xr: [0.2, 1.1], p: 0.5 },
        { L: 'F', f: x => 0.9 - 0.5 * (x + 0.3) ** 2, xr: [-0.1, 0.8], p: 0.5 },
    ];
    function build(hl) {
        const parts = [];
        defs.forEach((d, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const X = X0 + col * (PW + gapX), Y = Y0 + row * (PH + gapY);
            const px = x => X + (x + 0.2) / 1.4 * PW, py = v => Y + (1 - v) * PH;
            parts.push(txt(X + 2, Y - 8, d.L + '.', { size: 13, anchor: 'start' }));
            parts.push(`<rect x="${A(X)}" y="${A(Y)}" width="${PW}" height="${PH}" fill="${PANEL}"${hl === d.L ? ` stroke="${RED}" stroke-width="2.4"` : ''}/>`);
            let path = '';
            for (let k = 0; k <= 80; k++) { const x = d.xr[0] + (d.xr[1] - d.xr[0]) * k / 80; path += (k ? ' L ' : 'M ') + A(px(x)) + ' ' + A(py(d.f(x))); }
            parts.push(`<path d="${path}" fill="none" stroke="${INK}" stroke-width="2"/>`);
            const Px = px(d.p), Py = py(d.f(d.p));
            parts.push(dot(Px, Py, { r: 3.4 }));
            const lab = { A: [-9, 6, 'end'], B: [9, 6, 'start'], C: [0, 18, 'middle'], D: [0, -10, 'middle'], E: [-9, 2, 'end'], F: [9, 2, 'start'] }[d.L];
            parts.push(txt(Px + lab[0], Py + lab[1], it('P'), { size: 13, anchor: lab[2] }));
        });
        const W = X0 + 2 * PW + gapX + 10, H = Y0 + 3 * PH + 2 * gapY + 4;
        return svg(W, H, parts.join(''));
    }
    FIG['u21'] = build(null);
    // s1: skiss — parabel med max, symmetrilinje x = 5 och P vid x = 3
    {
        const G = graph({ xmin: -0.5, xmax: 10.5, ymin: -0.5, ymax: 5, ux: 30, uy: 30, grid: false, ticks: false, padL: 24, padT: 24 });
        const g = G.base.slice();
        const f = x => 4 - 0.3 * (x - 5) ** 2;
        g.push(curvePath(G, f, 1.2, 8.8, { c: INK, w: 2.2 }));
        g.push(line(G.px(5), G.py(0), G.px(5), G.py(5), { c: RED, w: 1.5, dash: '5 4', anim: aFade(BAS) }));
        g.push(txt(G.px(5) + 6, G.py(4.9), `${it('x')} = 5`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(line(G.px(3), G.py(0), G.px(3), G.py(3), { w: 1.2, c: SOFT, dash: '3 3' }));
        g.push(txt(G.px(3), G.py(0) + 16, '3', { size: 11.5, fill: SOFT }));
        g.push(txt(G.px(5), G.py(0) + 16, '5', { size: 11.5, fill: SOFT }));
        g.push(dot(G.px(3), G.py(f(3)), { c: RED, r: 3.8, anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(3) - 9, G.py(f(3)) + 4, it('P'), { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        // liten ruta kring P — utsnittet
        g.push(`<rect x="${A(G.px(3) - 30)}" y="${A(G.py(f(3)) - 30)}" width="60" height="60" fill="none" stroke="${RED}" stroke-width="1.3" stroke-dasharray="3 3"${aFade(BAS + 0.7)}/>`);
        g.push(txt(G.px(3) - 34, G.py(f(3)) - 36, 'utsnittet', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u21-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: tre lägen i höjdled — två, ett eller inget nollställe
    {
        const G = graph({ xmin: -0.5, xmax: 10.5, ymin: -3, ymax: 3.5, ux: 30, uy: 30, grid: false, ticks: false, padL: 24, padT: 24 });
        const g = G.base.slice();
        g.push(line(G.px(5), G.py(-3), G.px(5), G.py(3.5), { c: SOFT, w: 1.2, dash: '5 4' }));
        g.push(txt(G.px(5) + 6, G.py(3.4), `${it('x')} = 5`, { size: 12, fill: SOFT, anchor: 'start' }));
        const shape = c => (x => c - 0.35 * (x - 5) ** 2);
        g.push(curvePath(G, shape(2.5), 1.4, 8.6, { c: RED, w: 2, anim: aDraw(BAS, 0.7) }));
        g.push(curvePath(G, shape(0), 2.0, 8.0, { c: BLUE, w: 2, anim: aDraw(BAS + 0.8, 0.7) }));
        g.push(curvePath(G, shape(-1.6), 3.0, 7.0, { c: SOFT, w: 2, anim: aDraw(BAS + 1.6, 0.7) }));
        g.push(txt(G.px(8.9), G.py(2.2), 'två', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        g.push(txt(G.px(8.3), G.py(-0.4), 'ett', { size: 11.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.4) }));
        g.push(txt(G.px(7.3), G.py(-1.9), 'inget', { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 2.2) }));
        FIG['u21-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 24 — dödstal mot vattenförbrukning ================= */
(function () {
    const xs = [8, 10, 10, 30, 43, 50, 67, 84, 88, 100, 100], ys = [45, 38, 34, 31, 35, 26, 24, 21, 20, 18, 16];
    const k = -0.2411727311673415, m = 40.9356283080665;
    function build(variant) {
        const ext = variant === 's2';
        const cfg = ext
            ? { xmin: 0, xmax: 200, ymin: -10, ymax: 45, ux: 1.9, uy: 3.4, xstep: 20, ystep: 5, grid: true, padL: 84, padR: 130, padT: 38, padB: 46 }
            : { xmin: 0, xmax: 100, ymin: 15, ymax: 45, ux: 3.6, uy: 4.4, xstep: 10, ystep: 5, grid: true, padL: 84, padR: 130, padT: 38, padB: 46 };
        const G = panel(cfg);
        const g = G.base.slice();
        const ax = G.py(Math.max(0, cfg.ymin));
        g.push(txt(G.px(cfg.xmax) + 20, ax + 4, 'Förbrukning av', { size: 11, anchor: 'start', fill: SOFT }));
        g.push(txt(G.px(cfg.xmax) + 20, ax + 18, 'vattenledningsvatten', { size: 11, anchor: 'start', fill: SOFT }));
        g.push(txt(G.px(cfg.xmax) + 20, ax + 32, '(liter/person/dygn)', { size: 11, anchor: 'start', fill: SOFT }));
        g.push(txt(G.px(0) - 6, G.py(cfg.ymax) - 18, 'Dödstal (‰)', { size: 11, anchor: 'end', fill: SOFT }));
        if (!ext) {
            // axelbrott: y-axeln börjar vid 15, inte 0
            const yb = G.py(15) + 8;
            g.push(line(G.px(0) - 5, yb + 4, G.px(0) + 5, yb - 4, { w: 1.5 }));
            g.push(line(G.px(0) - 5, yb + 9, G.px(0) + 5, yb + 1, { w: 1.5 }));
        }
        xs.forEach((x, i) => g.push(dot(G.px(x), G.py(ys[i]), { r: 3.2 })));
        if (variant !== 'base') {
            const x0 = 0, x1 = ext ? 176 : 100;
            g.push(line(G.px(x0), G.py(k * x0 + m), G.px(x1), G.py(k * x1 + m), { c: RED, w: 2, anim: aDraw(BAS, 0.9) }));
            const lx = ext ? 112 : 55;
            g.push(txt(G.px(lx), G.py(k * lx + m) + (ext ? 18 : -12), `${it('y')} = ${MINUS}0,24${it('x')} + 41`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }));
        }
        if (ext) {
            const xz = -m / k;
            g.push(dot(G.px(xz), G.py(0), { c: RED, r: 3.8, anim: aFade(BAS + 1.2) }));
            g.push(txt(G.px(xz), G.py(0) - 12, `${it('x')} ≈ 170`, { size: 11.5, fill: RED, anim: aFade(BAS + 1.3) }));
            const yN = G.py(-10), yZ = G.py(0);
            g.push(`<rect x="${A(G.px(0))}" y="${A(yZ)}" width="${A(G.px(200) - G.px(0))}" height="${A(yN - yZ)}" fill="${SHADE3}"${aFade(BAS + 1.5)}/>`);
            g.push(txt(G.px(100), G.py(-8.6) + 4, 'negativt dödstal: omöjligt', { size: 11.5, fill: RED, anim: aFade(BAS + 1.6) }));
        }
        return svg(G.W, G.H, g.join(''));
    }
    FIG['u24'] = build('base');
    FIG['u24-s1'] = build('s1');
    FIG['u24-s2'] = build('s2');
})();

/* ================= UPPGIFT 25 — bitens övre kant ================= */
(function () {
    const u = 24; // px per cm
    const X0 = 60, baseY = 160;
    const bw = 11.5, bh = 4.5;
    const px = x => X0 + x * u, py = y => baseY - y * u;
    const a = -bh / (bw / 2) ** 2, b = -a * bw;
    const f = x => a * x * x + b * x;
    function arch(fill) {
        let d = `M ${A(px(0))} ${A(py(0))}`;
        for (let i = 1; i <= 120; i++) { const x = bw * i / 120; d += ` L ${A(px(x))} ${A(py(f(x)))}`; }
        d += ' Z';
        return `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;
    }
    function base() {
        const g = [];
        g.push(arch(SHADE));
        g.push(txt(px(0.3), py(bh) - 24, 'Övre kant', { size: 11.5, anchor: 'start', fill: SOFT }));
        g.push(arrow(px(1.5), py(bh) - 20, px(2.6), py(f(2.6)) - 3, { c: SOFT, w: 1.1, head: 7 }));
        const dx = px(bw) + 26;
        g.push(line(px(bw / 2) + 3, py(bh), dx + 4, py(bh), { w: 0.9, c: SOFT, dash: '2 2' }));
        g.push(dim(dx, py(0), dx, py(bh), {}));
        g.push(txt(dx + 8, py(bh / 2) + 4, '4,5', { size: 11.5, anchor: 'start' }));
        const dy = baseY + 22;
        g.push(line(px(0), baseY + 5, px(0), dy + 4, { w: 0.9, c: SOFT }));
        g.push(line(px(bw), baseY + 5, px(bw), dy + 4, { w: 0.9, c: SOFT }));
        g.push(dim(px(0), dy, px(bw), dy, {}));
        g.push(txt(px(bw / 2), dy + 16, '11,5', { size: 11.5 }));
        g.push(txt(dx + 46, py(bh) - 12, '(cm)', { size: 12, fill: SOFT, anchor: 'end' }));
        return g;
    }
    const W = px(bw) + 80, H = baseY + 46;
    FIG['u25'] = svg(W, H, base().join(''));
    {
        const g = base();
        // axlar med origo i bitens vänstra hörn
        g.push(line(px(-1.2), baseY, px(bw + 1.6), baseY, { w: 1.5, c: BLUE, cap: 'butt', anim: aFade(BAS) }));
        g.push(`<polygon points="${A(px(bw + 1.6) + 8)},${A(baseY)} ${A(px(bw + 1.6) + 1)},${A(baseY + 4.2)} ${A(px(bw + 1.6) + 1)},${A(baseY - 4.2)}" fill="${BLUE}"${aFade(BAS)}/>`);
        g.push(line(px(0), py(-0.8), px(0), py(bh + 1.4), { w: 1.5, c: BLUE, cap: 'butt', anim: aFade(BAS) }));
        g.push(`<polygon points="${A(px(0))},${A(py(bh + 1.4) - 8)} ${A(px(0) + 4.2)},${A(py(bh + 1.4) - 1)} ${A(px(0) - 4.2)},${A(py(bh + 1.4) - 1)}" fill="${BLUE}"${aFade(BAS)}/>`);
        g.push(txt(px(bw + 1.6) + 6, baseY + 17, 'x', { size: 14, italic: true, fill: BLUE, anim: aFade(BAS) }));
        g.push(txt(px(0) + 12, py(bh + 1.4) - 2, 'y', { size: 14, italic: true, fill: BLUE, anim: aFade(BAS) }));
        g.push(dot(px(0), py(0), { c: RED, r: 3.8, anim: aFade(BAS + 0.4) }));
        g.push(dot(px(bw), py(0), { c: RED, r: 3.8, anim: aFade(BAS + 0.6) }));
        g.push(dot(px(bw / 2), py(bh), { c: RED, r: 3.8, anim: aFade(BAS + 0.8) }));
        g.push(txt(px(0) - 8, py(0) - 8, '(0, 0)', { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        g.push(txt(px(bw) + 8, py(0) - 8, '(11,5; 0)', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.7) }));
        g.push(txt(px(bw / 2) + 8, py(bh) - 8, '(5,75; 4,5)', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(line(px(bw / 2), py(0), px(bw / 2), py(bh), { w: 1.3, c: RED, dash: '4 3', anim: aFade(BAS + 1.0) }));
        FIG['u25-s1'] = svg(W + 20, H, g.join(''));
    }
})();

/* ================= UPPGIFT 26 — rektangel i triangel ================= */
(function () {
    const u = 30; // px per cm
    const X0 = 70, baseY = 240;
    const B = { x: X0, y: baseY }, C = { x: X0 + 9 * u, y: baseY }, Ap = { x: X0 + 2.4 * u, y: baseY - 7 * u };
    const hRect = 2.2;               // rektangelns höjd i figuren (cm)
    const yTop = baseY - hRect * u;
    // rektangelns hörn på sidorna AB och AC vid höjden hRect
    const lerp = (P, Q, t) => ({ x: P.x + (Q.x - P.x) * t, y: P.y + (Q.y - P.y) * t });
    const t = hRect / 7;
    const L = lerp(B, Ap, t), R = lerp(C, Ap, t);
    function base(o = {}) {
        const g = [];
        g.push(poly([Ap, B, C], { fill: 'none', stroke: INK, w: 2 }));
        g.push(`<rect x="${A(L.x)}" y="${A(yTop)}" width="${A(R.x - L.x)}" height="${A(baseY - yTop)}" fill="${o.rectFill || SHADE}" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(txt(Ap.x, Ap.y - 10, it('A'), { size: 14 }));
        g.push(txt(B.x - 10, B.y + 6, it('B'), { size: 14, anchor: 'end' }));
        g.push(txt(C.x + 10, C.y + 6, it('C'), { size: 14, anchor: 'start' }));
        // höjden 7,0 till vänster, basen 9,0 under
        const dx = B.x - 28;
        g.push(line(Ap.x - 4, Ap.y, dx - 4, Ap.y, { w: 0.9, c: SOFT, dash: '2 2' }));
        g.push(dim(dx, baseY, dx, Ap.y, {}));
        g.push(txt(dx - 8, (baseY + Ap.y) / 2 + 4, '7,0', { size: 11.5, anchor: 'end' }));
        const dy = baseY + 22;
        g.push(dim(B.x, dy, C.x, dy, {}));
        g.push(txt((B.x + C.x) / 2, dy + 16, '9,0', { size: 11.5 }));
        g.push(txt(C.x + 30, Ap.y - 4, '(cm)', { size: 12, fill: SOFT, anchor: 'end' }));
        return g;
    }
    const W = C.x + 40, H = baseY + 46;
    FIG['u26'] = svg(W, H, base().join(''));
    {
        const g = base();
        g.push(txt((L.x + R.x) / 2, baseY - 8, it('b'), { size: 13, fill: RED, anim: aFade(BAS) }));
        g.push(txt(R.x + 8, (yTop + baseY) / 2 + 4, it('h'), { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(poly([Ap, L, R], { fill: SHADE3, anim: aFade(BAS + 0.5) }));
        const dx2 = C.x + 12;
        g.push(line(Ap.x + 4, Ap.y, dx2 + 4, Ap.y, { w: 0.9, c: RED, dash: '2 2', anim: aFade(BAS + 0.7) }));
        g.push(line(R.x + 4, yTop, dx2 + 4, yTop, { w: 0.9, c: RED, dash: '2 2', anim: aFade(BAS + 0.7) }));
        g.push(dim(dx2, yTop, dx2, Ap.y, { c: RED, fade: BAS + 0.8 }));
        g.push(txt(dx2 + 8, (yTop + Ap.y) / 2 + 4, `7 ${MINUS} ${it('h')}`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u26-s1'] = svg(W + 40, H, g.join(''));
    }
    {
        // areafunktionen A(h) = 9/7 (7h − h²)
        const G = panel({ xmin: 0, xmax: 7, ymin: 0, ymax: 18, ux: 40, uy: 8, xstep: 1, ystep: 2, grid: true, padL: 34, padT: 22, xlabTxt: `${it('h')} (cm)`, ylabTxt: `${it('A')} (cm²)` });
        const g = G.base.slice();
        const f = h => 9 / 7 * (7 * h - h * h);
        g.push(curvePath(G, f, 0, 7, { c: BLUE, w: 2.4 }));
        g.push(line(G.px(3.5), G.py(0), G.px(3.5), G.py(f(3.5)), { c: RED, w: 1.5, dash: '4 3', anim: aFade(BAS) }));
        g.push(dot(G.px(3.5), G.py(f(3.5)), { c: RED, r: 3.8, anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(3.5) + 8, G.py(f(3.5)) - 8, '(3,5; 15,75)', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(3.5), G.py(0) + 30, `${it('h')} = 3,5`, { size: 11.5, fill: RED, anim: aFade(BAS + 0.7) }));
        FIG['u26-s2'] = svg(G.W + 52, G.H + 14, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 2c VT 2018 (genererade — redigera inte för');
out.push('// hand; generatorn ligger i .claude/np-figs/gen-ma2c-vt2018.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma2c-vt2018'] = {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('};');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma2c-vt2018-figurer.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
