// Generator för data/np/ma4-vt2018-figurer-D.js — NP Matematik 4 VT 2018,
// delprov D (uppgift 20–27). Alla koordinater beräknade, alla kurvor
// samplade tätt ur sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2018-D.js
// Konventioner (som gen-ma4-vt2022-D.js): ink #0f1620, soft #3f4a5c,
// accent #c8324a (markeringar i lösningssteg), kurvblå #1c3d6b.
// Animationsklasser: anim-draw (heldragna linjer ritas), anim-fade
// (etiketter, streckade linjer, punkter, ytor). BAS = basfördröjning.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const SHADE = 'rgba(15,22,32,0.16)';
const RED_T = 'rgba(200,50,74,0.16)';
const BLUE_T = 'rgba(28,61,107,0.16)';
const GREY = '#c4c7cc', GREY_D = '#9aa0a8';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const MINUS = '−';
const NB = ' ';

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
const sup = s => `<tspan dy="-5" font-size="9">${s}</tspan><tspan dy="5"> </tspan>`;
const supEnd = s => `<tspan dy="-5" font-size="9">${s}</tspan>`;

function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const h = o.head || Math.max(8, Math.min(11, L * 0.5));
    const bx = x2 - ux * h, by = y2 - uy * h;
    const wh = h * 0.44, px = -uy, py = ux;
    const an = o.fade !== undefined ? aFade(o.fade) : '';
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 1.6, cap: 'butt', dash: o.dash, anim: an }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"${an}/>`;
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
const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.6}" fill="${o.c || RED}"${o.anim || ''}/>`;

function graph(cfg) {
    const ux = cfg.ux, uy = cfg.uy;
    const padL = cfg.padL ?? 40, padR = cfg.padR ?? 28, padT = cfg.padT ?? 22, padB = cfg.padB ?? 26;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    const ax = py(0), ay = px(0);
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    const ls = cfg.labSize || 14;
    if (cfg.xlab !== null) g.push(txt(px(cfg.xmax) + 12, ax + (cfg.xlabDy ?? 17), cfg.xlab || it('x'), { size: ls }));
    if (cfg.ylab !== null) g.push(txt(ay + (cfg.ylabDx ?? 12), py(cfg.ymax) - 6, cfg.ylab || it('y'), { size: ls, anchor: cfg.ylabAnchor || 'middle' }));
    (cfg.xt || []).forEach(([v, lab, up, dx]) => {
        g.push(line(px(v), ax - 3.5, px(v), ax + 3.5, { w: 1.2 }));
        const ts = cfg.tickSize || 11.5;
        if (lab != null) g.push(txt(px(v) + (dx || 0), up ? ax - 8 : ax + 4.5 + ts, lab, { size: ts, fill: SOFT }));
    });
    (cfg.yt || []).forEach(([v, lab]) => {
        g.push(line(ay - 3.5, py(v), ay + 3.5, py(v), { w: 1.2 }));
        if (lab != null) g.push(txt(ay - 7, py(v) + 0.35 * (cfg.tickSize || 11.5), lab, { size: cfg.tickSize || 11.5, fill: SOFT, anchor: 'end' }));
    });
    return { W, H, px, py, base: g, cfg };
}
function curvePts(G, f, x0, x1, n) {
    n = n || Math.max(160, Math.ceil(Math.abs(G.px(x1) - G.px(x0)) / 2));
    const pts = [];
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push([G.px(x), G.py(f(x))]); }
    return pts;
}
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
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        ' stroke-linejoin="round"' + (o.anim || '') + '/>';
}
function areaPath(G, f, g, x0, x1, o = {}) {
    const n = o.n || 160;
    const top = [], bot = [];
    for (let i = 0; i <= n; i++) {
        const x = x0 + (x1 - x0) * i / n;
        top.push(`${A(G.px(x))} ${A(G.py(f(x)))}`);
        bot.push(`${A(G.px(x))} ${A(G.py(g(x)))}`);
    }
    return `<path d="M ${top.join(' L ')} L ${bot.reverse().join(' L ')} Z" fill="${o.fill || SHADE}" stroke="none"${o.anim || ''}/>`;
}
const svg = (w, h, inner, x0 = 0, y0 = 0) =>
    `<svg viewBox="${A(x0)} ${A(y0)} ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Cirkelbåge kring (cx, cy) från skärmvinkeln a1 till a2 (radianer,
// y nedåt). Sweep-flaggan: ökande vinkel i skärmsystemet ⇒ 1.
function arcPath(cx, cy, r, a1, a2, o = {}) {
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const sweep = a2 > a1 ? 1 : 0;
    const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
    return `<path d="M ${A(x1)} ${A(y1)} A ${A(r)} ${A(r)} 0 ${large} ${sweep} ${A(x2)} ${A(y2)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
}
// liten rätvinkelmarkering i hörnet P med benen längs enhetsvektorerna u, v
function ratvinkel(P, u, v, s = 9, o = {}) {
    const a = [P[0] + u[0] * s, P[1] + u[1] * s], b = [a[0] + v[0] * s, a[1] + v[1] * s], c = [P[0] + v[0] * s, P[1] + v[1] * s];
    return `<path d="M ${A(a[0])} ${A(a[1])} L ${A(b[0])} ${A(b[1])} L ${A(c[0])} ${A(c[1])}" fill="none" stroke="${o.c || INK}" stroke-width="1.1"${o.anim || ''}/>`;
}

const FIG = {};

/* ================= UPPGIFT 20 — växthusets temperatur ================= */
(function () {
    const y = x => 20 + 15 * Math.sin(Math.PI * x / 12);
    const cfg = {
        xmin: 0, xmax: 24, ymin: 0, ymax: 40, ux: 16, uy: 5.2,
        padL: 40, padR: 34, padT: 26, padB: 40,
        xt: [3, 6, 9, 12, 15, 18, 21, 24].map(v => [v, String(v)]),
        yt: [[10, '10'], [20, '20'], [30, '30'], [40, '40']],
        ylab: `${it('y')} (°C)`, ylabDx: 8, ylabAnchor: 'start',
    };
    function base() {
        const G = graph(cfg);
        const g = G.base.slice();
        g.push(txt(G.px(24) + 12, G.py(0) + 33, '(h)', { size: 11.5, fill: SOFT }));
        g.push(curvePath(G, y, 0, 24));
        return { G, g };
    }
    // s1 (a): toppen vid x = 6
    {
        const { G, g } = base();
        g.push(line(G.px(6), G.py(0), G.px(6), G.py(35), { c: RED, w: 1.4, dash: '4 3', anim: aFade(BAS) }));
        g.push(line(G.px(0), G.py(35), G.px(6), G.py(35), { c: RED, w: 1.4, dash: '4 3', anim: aFade(BAS) }));
        g.push(dot(G.px(6), G.py(35), { anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(6.8), G.py(38.3), '(6, 35): klockan 15.00', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        FIG['u20-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): tangenten i x = 3
    {
        const { G, g } = base();
        const x = 3, v = y(x), k = 15 * Math.PI / 12 * Math.cos(Math.PI * x / 12);
        const t = s => v + k * (s - x);
        g.push(`<path d="M ${A(G.px(0.3))} ${A(G.py(t(0.3)))} L ${A(G.px(6.4))} ${A(G.py(t(6.4)))}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS)}/>`);
        g.push(dot(G.px(x), G.py(v), { anim: aFade(BAS + 0.4) }));
        g.push(line(G.px(x), G.py(0), G.px(x), G.py(v) + 4, { c: RED, w: 1.2, dash: '4 3', anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(12.4), G.py(35.5), 'lutning ≈ 2,8 °C/h', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(arrow(G.px(12.2), G.py(36.4), G.px(5.6) + 3, G.py(t(5.6)) + 2, { c: RED, w: 1.1, fade: BAS + 0.8 }));
        FIG['u20-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 21 — området mellan f, g och axlarna ================= */
(function () {
    const f = x => 2 * Math.cos(x / 2), gF = x => 5 * Math.log(x);
    let lo = 1, hi = 2;
    for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (f(m) - gF(m) > 0) lo = m; else hi = m; }
    const a = (lo + hi) / 2; // 1,3641
    const cfg = {
        xmin: -0.5, xmax: 2.4, ymin: -0.6, ymax: 2.5, ux: 105, uy: 105,
        padL: 22, padR: 28, padT: 24, padB: 16,
    };
    function base(o = {}) {
        const G = graph(o.q ? Object.assign({}, cfg, { ux: 70, uy: 70, padT: 30, padR: 34, labSize: 19, xlabDy: 22 }) : cfg);
        const g = G.base.slice();
        const fs = o.q ? 18 : 13;
        if (o.shade !== false) g.push(areaPath(G, f, x => (x < 1 ? 0 : gF(x)), 0, a, { fill: SHADE, n: 240 }));
        g.push(curvePath(G, f, -0.5, 2.4, { c: INK, w: 1.7 }));
        g.push(curvePath(G, gF, 0.885, 1.66, { c: INK, w: 1.7 }));
        g.push(txt(G.px(0.16), G.py(2.2), `${it('y')} = ${it('f')}(${it('x')})`, { size: fs, anchor: 'start' }));
        g.push(txt(G.px(1.42), G.py(0.3), `${it('y')} = ${it('g')}(${it('x')})`, { size: fs, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base({ q: true }); FIG['u21'] = svg(G.W + 34, G.H, g.join('')); }
    // s1: skärningspunkten a och g:s nollställe x = 1
    {
        const { G, g } = base();
        g.push(line(G.px(a), G.py(f(a)), G.px(a), G.py(0), { c: RED, w: 1.3, dash: '4 3', anim: aFade(BAS + 0.3) }));
        g.push(dot(G.px(a), G.py(f(a)), { anim: aFade(BAS) }));
        g.push(txt(G.px(a) + 9, G.py(f(a)) - 8, `(1,364; 1,553)`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(a) + 6, G.py(0) + 17, `${it('a')} ≈ 1,364`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        g.push(dot(G.px(1), G.py(0), { r: 3.2, c: BLUE, anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(1) + 5, G.py(0) + 17, '1', { size: 12, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u21-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: hela arean under f minus biten under g
    {
        const { G, g } = base({ shade: false });
        g.push(areaPath(G, f, () => 0, 0, a, { fill: BLUE_T, anim: aFade(BAS), n: 200 }));
        g.push(areaPath(G, gF, () => 0, 1, a, { fill: 'rgba(200,50,74,0.42)', anim: aFade(BAS + 0.7), n: 120 }));
        g.push(line(G.px(a), G.py(f(a)), G.px(a), G.py(0), { c: SOFT, w: 1.1, dash: '3 3', anim: aFade(BAS) }));
        g.push(txt(G.px(0.55), G.py(0.85), 'under ' + it('f'), { size: 12.5, fill: BLUE, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(1.62), G.py(-0.36), 'dras bort', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(arrow(G.px(1.6), G.py(-0.32), G.px(1.31), G.py(0.12), { c: RED, w: 1.1, fade: BAS + 0.9 }));
        g.push(txt(G.px(1) + 5, G.py(0) + 17, '1', { size: 12, fill: SOFT, anchor: 'start' }));
        g.push(txt(G.px(a) + 4, G.py(0) + 17, it('a'), { size: 12.5, fill: SOFT, anchor: 'start' }));
        FIG['u21-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 22 — huggormen ================= */
(function () {
    const f = x => 5 * Math.sin(x / 3);
    // Talen under x-axeln där ormen ligger ovanför den, ovanför axeln där
    // den ligger under (annars hamnar talen på ormens kropp).
    const xt = [5, 10, 15, 20, 25, 30, 35, 40].map(v => [v, String(v), f(v) < 0, v === 10 ? 7.5 : 0]);
    const cfg = {
        xmin: 0, xmax: 42, ymin: -6.6, ymax: 6.8, ux: 12.5, uy: 12.5,
        padL: 34, padR: 30, padT: 24, padB: 14,
        xt, yt: [[5, '5'], [-5, MINUS + '5']],
    };
    function base(q) {
        const G = graph(q ? Object.assign({}, cfg, { tickSize: 18, labSize: 20, padL: 44, padB: 22, xlabDy: 22,
            xt: xt.map(([v, l, up, dx]) => [v, l, up, v === 10 ? 11 : 0]) }) : cfg);
        return { G, g: G.base.slice() };
    }
    function orm(G) {
        const g = [];
        // kroppen: ett brett grått band längs kurvan, smalnar mot svansen
        const segs = 60, x1 = 38.2;
        for (let i = 0; i < segs; i++) {
            const xa = x1 * i / segs, xb = x1 * (i + 1) / segs;
            const w = 2.4 * G.cfg.uy * Math.min(1, 0.25 + 0.75 * Math.min(1, (xa + 0.4) / 4));
            const pts = curvePts(G, f, xa, xb + 0.06, 8);
            g.push(`<path d="M ${pts.map(p => A(p[0]) + ' ' + A(p[1])).join(' L ')}" fill="none" stroke="${GREY}" stroke-width="${A(w)}" stroke-linecap="round"/>`);
        }
        // huvudet: en ellips längs tangenten med nosen i x = 40
        const xh = 38.6, yh = f(xh), k = 5 / 3 * Math.cos(xh / 3);
        const ang = Math.atan2(-k * G.cfg.uy, G.cfg.ux) * 180 / Math.PI;
        const cx = G.px(xh), cy = G.py(yh);
        g.push(`<ellipse cx="${A(cx)}" cy="${A(cy)}" rx="${A(2.0 * G.cfg.ux)}" ry="${A(1.45 * G.cfg.uy)}" transform="rotate(${A(ang)} ${A(cx)} ${A(cy)})" fill="${GREY_D}" stroke="${SOFT}" stroke-width="1"/>`);
        const ex = Math.cos(ang * Math.PI / 180), ey = Math.sin(ang * Math.PI / 180);
        [[0.55, -0.55], [0.55, 0.55]].forEach(([a, b]) => {
            g.push(`<circle cx="${A(cx + ex * a * G.cfg.ux - ey * b * G.cfg.uy)}" cy="${A(cy + ey * a * G.cfg.ux + ex * b * G.cfg.uy)}" r="2.2" fill="${INK}"/>`);
        });
        return g.join('');
    }
    {
        const { G, g } = base(true);
        const body = orm(G);
        // ormen ritas under axlarna så att axelkorset syns
        g.unshift(body);
        g.push(curvePath(G, f, 0, 40, { c: INK, w: 1.6 }));
        g.push(txt(G.px(42) + 6, G.py(6.8) + 4, '(cm)', { size: 18, anchor: 'end' }));
        FIG['u22'] = svg(G.W, G.H, g.join(''));
    }
    // s1: en kort bit av kurvan är nästan rak: dx, dy och dL
    {
        const { G, g } = base();
        g.push(curvePath(G, f, 0, 40, { c: BLUE, w: 2 }));
        g.push(txt(G.px(42) + 6, G.py(6.8) + 4, '(cm)', { size: 12, anchor: 'end' }));
        const xa = 10.5, xb = 13.5;
        const P1 = [G.px(xa), G.py(f(xa))], P2 = [G.px(xb), G.py(f(xb))];
        g.push(line(P1[0], P1[1], P2[0], P1[1], { c: RED, w: 1.6, anim: aFade(BAS) }));
        g.push(line(P2[0], P1[1], P2[0], P2[1], { c: RED, w: 1.6, anim: aFade(BAS + 0.3) }));
        g.push(line(P1[0], P1[1], P2[0], P2[1], { c: RED, w: 2.6, anim: aFade(BAS + 0.6) }));
        g.push(txt((P1[0] + P2[0]) / 2, P1[1] - 6, `d${it('x')}`, { size: 12.5, fill: RED, anim: aFade(BAS) }));
        g.push(txt(P2[0] + 6, (P1[1] + P2[1]) / 2 + 4, `d${it('y')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(9.4), G.py(-4.5), `d${it('L')} = √(d${it('x')}${sup('2')}+ d${it('y')}${supEnd('2')})`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        g.push(arrow(G.px(9.6), G.py(-4.2), (P1[0] + P2[0]) / 2 - 5, (P1[1] + P2[1]) / 2 + 1, { c: RED, w: 1.1, fade: BAS + 0.8 }));
        FIG['u22-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 23 — två rätvinkliga trianglar ================= */
(function () {
    const k = 22, ox = 250, oy = 200;
    const P = (X, Y) => [ox + X * k, oy - Y * k];
    const s80 = Math.sqrt(80);
    // R rät vinkel nere till höger, T toppen, Q nere till vänster
    const Rw = [0, 0], Tw = [0, 8], Qw = [-6, 0];
    const dTQ = [-0.6, -0.8];
    const Pw = [Tw[0] + s80 * dTQ[0], Tw[1] + s80 * dTQ[1]];
    const u = Math.atan(0.5);
    const angTQ = Math.atan2(dTQ[1], dTQ[0]);           // matematisk vinkel
    const angTL = angTQ - u;                             // vrid medurs mot vänster
    const Lw = [Tw[0] + 8 * Math.cos(angTL), Tw[1] + 8 * Math.sin(angTL)];
    const R = P(...Rw), T = P(...Tw), Q = P(...Qw), Pp = P(...Pw), L = P(...Lw);
    const W = ox + 44, H = oy + 30, X0 = ox - 190;
    const unit = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    // skärmvinklar från T
    const sa = q => Math.atan2(q[1] - T[1], q[0] - T[0]);
    const aL = sa(L), aQ = sa(Q), aR = sa(R);           // aR = π/2, aQ ≈ 2,21, aL ≈ 2,68

    function base(o = {}) {
        const g = [];
        if (o.fillL) g.push(`<polygon points="${[T, L, Pp].map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="${o.fillL}" stroke="none"${aFade(BAS)}/>`);
        if (o.fillR) g.push(`<polygon points="${[T, Q, R].map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="${o.fillR}" stroke="none"${aFade(BAS)}/>`);
        g.push(`<polygon points="${[T, Q, R].map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`);
        g.push(`<polyline points="${[T, L, Pp].map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`);
        g.push(ratvinkel(L, unit(L, T), unit(L, Pp)));
        g.push(ratvinkel(R, unit(R, T), unit(R, Q)));
        g.push(arcPath(T[0], T[1], 20, aR, aQ));
        g.push(arcPath(T[0], T[1], 24, aQ, aL));
        // vinkelbeteckningar på bisektriserna
        const bu = (aQ + aL) / 2, bv = (aR + aQ) / 2;
        g.push(txt(T[0] + 34 * Math.cos(bu), T[1] + 34 * Math.sin(bu) + 5, it('u'), { size: 14 }));
        g.push(txt(T[0] + 30 * Math.cos(bv), T[1] + 30 * Math.sin(bv) + 5, it('v'), { size: 14 }));
        return g;
    }
    // sidetiketter: utåtriktad normal från sidans mittpunkt
    function sideLab(a, b, s, inre, o = {}) {
        const m = mid(a, b), d = unit(a, b);
        let n = [d[1], -d[0]];
        if (n[0] * (inre[0] - m[0]) + n[1] * (inre[1] - m[1]) > 0) n = [-n[0], -n[1]];
        const off = o.off || 11;
        return txt(m[0] + n[0] * off, m[1] + n[1] * off + 4.5, s, { size: o.size || 13.5, fill: o.fill || INK, anim: o.anim });
    }
    const labs = (o = {}) => [
        o.TL || sideLab(T, L, '8', Pp),
        o.LP || sideLab(L, Pp, '4', T),
        o.TR || sideLab(T, R, '8', Q),
        o.QR || sideLab(Q, R, '6', T, { off: 13 }),
    ];
    { const g = base(); FIG['u23'] = svg(W - X0, H, g.concat(labs()).join(''), X0, 0); }
    // s1: vänstra triangeln: motstående 4, närliggande 8, hypotenusan √80
    {
        const g = base({ fillL: RED_T });
        const L2 = labs({
            TL: sideLab(T, L, '8', Pp, { fill: BLUE }),
            LP: sideLab(L, Pp, '4', T, { fill: RED }),
        });
        g.push(...L2);
        g.push(line(T[0], T[1], Pp[0], Pp[1], { c: INK, w: 2.6, anim: aFade(BAS + 0.3) }));
        const m = mid(T, Pp), d = unit(T, Pp), n = [-d[1], d[0]];
        g.push(txt(m[0] + n[0] * 16 - 6, m[1] + n[1] * 16 + 4, '√80', { size: 13, anchor: 'end', anim: aFade(BAS + 0.5) }));
        g.push(txt(mid(L, Pp)[0] - 22, mid(L, Pp)[1] + 22, 'motstående', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
        g.push(txt(mid(T, L)[0] - 22, mid(T, L)[1] - 22, 'närliggande', { size: 11, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.9) }));
        FIG['u23-s1'] = svg(W - 20, H, g.join(''), 20, 0);
    }
    // s2: högra triangeln: motstående 6, närliggande 8, hypotenusan 10
    {
        const g = base({ fillR: BLUE_T });
        g.push(...labs({
            TR: sideLab(T, R, '8', Q, { fill: BLUE }),
            QR: sideLab(Q, R, '6', T, { off: 13, fill: RED }),
        }));
        g.push(line(T[0], T[1], Q[0], Q[1], { c: INK, w: 2.6, anim: aFade(BAS + 0.3) }));
        const m = mid(T, Q), d = unit(T, Q), n = [d[1], -d[0]];
        // innanför den högra triangeln, till höger om hypotenusan
        g.push(txt(m[0] + n[0] * 14, m[1] + n[1] * 14 + 4, '10', { size: 13, anchor: 'start', anim: aFade(BAS + 0.5) }));
        g.push(txt(R[0] + 12, mid(T, R)[1] + 22, 'närliggande', { size: 11, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(txt(mid(Q, R)[0], R[1] + 33, 'motstående', { size: 11, fill: RED, anim: aFade(BAS + 0.7) }));
        FIG['u23-s2'] = svg(W + 84 - X0, H + 14, g.join(''), X0, 0);
    }
})();

/* ================= UPPGIFT 24 — täthetsfunktionen ================= */
(function () {
    const f = t => (15 * t ** 5 - 7 * t ** 6) / 32;
    const G = graph({ xmin: 0, xmax: 2.15, ymin: 0, ymax: 1.6, ux: 165, uy: 125,
        padL: 44, padR: 34, padT: 26, padB: 40,
        xt: [[0.5, '0,5'], [1, '1'], [1.5, '1,5'], [2, '2']],
        yt: [[0.5, '0,5'], [1, '1'], [1.5, '1,5']],
        xlab: it('t'), ylab: it('y') });
    const g = G.base.slice();
    g.push(areaPath(G, f, () => 0, 1.5, 2, { fill: RED_T, anim: aFade(BAS) }));
    g.push(line(G.px(1.5), G.py(0), G.px(1.5), G.py(f(1.5)), { c: RED, w: 1.2, anim: aFade(BAS) }));
    g.push(curvePath(G, f, 0, 2));
    g.push(txt(G.px(0.55), G.py(0.62), `${it('y')} = ${it('f')}(${it('t')})`, { size: 13, anchor: 'start', fill: BLUE }));
    g.push(txt(G.px(1.18), G.py(1.32), 'sista halvtimmen', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.4) }));
    g.push(arrow(G.px(1.2), G.py(1.25), G.px(1.62), G.py(0.62), { c: RED, w: 1.2, fade: BAS + 0.4 }));
    g.push(txt(G.px(2.15) + 12, G.py(0) + 33, '(h)', { size: 11.5, fill: SOFT }));
    FIG['u24-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 25 — rotation runt linjen y = 5 ================= */
(function () {
    const f = x => x * x - 4;
    // s1: området och skärningspunkterna
    {
        const G = graph({ xmin: -4.2, xmax: 4.2, ymin: -4.8, ymax: 7, ux: 38, uy: 19,
            padL: 30, padR: 30, padT: 24, padB: 24,
            xt: [[-3, MINUS + '3'], [-2, null], [-1, null], [1, null], [2, null], [3, '3']],
            yt: [[5, null]] });
        const g = G.base.slice();
        g.push(txt(G.px(0) - 7, G.py(5) - 6, '5', { size: 11.5, fill: SOFT, anchor: 'end' }));
        g.push(areaPath(G, () => 5, f, -3, 3, { fill: SHADE }));
        g.push(line(G.px(-4.2), G.py(5), G.px(4.2), G.py(5), { c: INK, w: 1.6 }));
        g.push(curvePath(G, f, -3.3, 3.3));
        g.push(txt(G.px(3.3), G.py(1.6), `${it('y')} = ${it('x')}${sup('2')}${MINUS} 4`, { size: 13, anchor: 'start', fill: BLUE }));
        g.push(txt(G.px(4.2), G.py(5) - 7, `${it('y')} = 5`, { size: 13, anchor: 'end' }));
        g.push(dot(G.px(-3), G.py(5), { anim: aFade(BAS) }));
        g.push(dot(G.px(3), G.py(5), { anim: aFade(BAS) }));
        [-3, 3].forEach(v => g.push(line(G.px(v), G.py(5), G.px(v), G.py(0), { c: RED, w: 1.1, dash: '3 3', anim: aFade(BAS + 0.3) })));
        FIG['u25-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: radien r = 5 − (x² − 4) = 9 − x², och kroppens spegelkant
    {
        const G = graph({ xmin: -4.2, xmax: 4.2, ymin: -4.8, ymax: 14.6, ux: 60, uy: 15,
            padL: 30, padR: 30, padT: 24, padB: 24,
            xt: [[-3, MINUS + '3'], [-2, null], [-1, null], [1, null], [2, null], [3, '3']],
            yt: [[5, null], [10, '10']] });
        const g = G.base.slice();
        const fm = x => 10 - f(x);                 // spegling i y = 5
        g.push(txt(G.px(0) - 7, G.py(5) - 6, '5', { size: 11.5, fill: SOFT, anchor: 'end' }));
        g.push(areaPath(G, () => 5, f, -3, 3, { fill: SHADE }));
        g.push(areaPath(G, fm, () => 5, -3, 3, { fill: BLUE_T, anim: aFade(BAS) }));
        g.push(curvePath(G, fm, -3, 3, { c: BLUE, w: 1.4, dash: '5 4', anim: aFade(BAS) }));
        g.push(line(G.px(-4.2), G.py(5), G.px(4.2), G.py(5), { c: INK, w: 1.6 }));
        g.push(curvePath(G, f, -3.3, 3.3));
        g.push(txt(G.px(3.15), G.py(1.6), `${it('y')} = ${it('x')}${sup('2')}${MINUS} 4`, { size: 13, anchor: 'start', fill: BLUE }));
        g.push(txt(G.px(4.2), G.py(5) - 7, `${it('y')} = 5`, { size: 13, anchor: 'end' }));
        const xs = 2, r = 5 - f(xs);
        g.push(`<ellipse cx="${A(G.px(xs))}" cy="${A(G.py(5))}" rx="${A(Math.max(5, r * G.cfg.uy * 0.14))}" ry="${A(r * G.cfg.uy)}" fill="none" stroke="${RED}" stroke-width="1.5"${aFade(BAS + 0.4)}/>`);
        g.push(line(G.px(xs), G.py(5), G.px(xs), G.py(f(xs)), { c: RED, w: 2, anim: aFade(BAS + 0.7) }));
        // etiketten till vänster om radien, i luckan mellan y-axeln och radien
        g.push(txt(G.px(xs) - 18, G.py(2.3), it('r') + ' = 9 ' + MINUS + ' ' + it('x') + supEnd('2'), { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        FIG['u25-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 27 — laserpekaren ================= */
(function () {
    // Gemensamma mått (px). Väggens underkant yw, skivans mitt (cx, cy).
    let Lpx = 170, R = 36, LASL = 62, LASW = 11, FS = 1;
    const fz = v => A(v * FS);
    function panel(oy, alpha, o = {}) {
        const g = [];
        const cx = 232, yw = oy + 50, cy = yw + Lpx;
        // väggen
        g.push(`<rect x="110" y="${A(yw - 18)}" width="300" height="18" fill="${GREY}" stroke="${SOFT}" stroke-width="1"/>`);
        g.push(txt(112, yw - 25, 'Vägg', { size: fz(17), anchor: 'start' }));
        // skivan
        g.push(`<circle cx="${cx}" cy="${A(cy)}" r="${R}" fill="${GREY_D}" stroke="${SOFT}" stroke-width="1.2"/>`);
        // laserpekaren (vriden alpha medurs från lodrätt)
        const ux = Math.sin(alpha), uy = -Math.cos(alpha);
        g.push(`<rect x="${A(cx - LASW / 2)}" y="${A(cy - LASL / 2)}" width="${LASW}" height="${LASL}" fill="#ffffff" stroke="${INK}" stroke-width="1.3" transform="rotate(${A(alpha * 180 / Math.PI)} ${cx} ${A(cy)})"/>`);
        g.push(`<circle cx="${cx}" cy="${A(cy)}" r="1.8" fill="${INK}"/>`);
        // strålen
        const xs = cx + Lpx * Math.tan(alpha);
        g.push(line(cx + ux * LASL / 2, cy + uy * LASL / 2, xs, yw, { c: o.beam || INK, w: 1.5 }));
        g.push(dot(xs, yw, { r: 2.8, c: RED }));
        // måttet L (från väggen till skivans mitt)
        const xd = 150;
        g.push(line(xd - 10, cy, cx - 6, cy, { c: SOFT, w: 0.9 }));
        g.push(dim(xd, yw, xd, cy, { c: o.Lc || INK, w: 1.1, head: 7 }));
        g.push(txt(xd - 10, (yw + cy) / 2 + 5, it('L'), { size: fz(19), anchor: 'end', fill: o.Lc || INK }));
        return { g, cx, cy, yw, xs };
    }
    function fig1(oy) {
        const p = panel(oy, 0);
        const g = p.g;
        g.push(ratvinkel([p.cx, p.yw], [1, 0], [0, 1], 9));
        g.push(txt(296, oy + 14, 'Röd ljuspunkt', { size: fz(16), anchor: 'start' }));
        g.push(line(294, oy + 18, p.cx + 4, p.yw - 3, { c: INK, w: 1 }));
        g.push(txt(296, p.cy - 22, 'Laserpekare', { size: fz(16), anchor: 'start' }));
        g.push(line(294, p.cy - 26, p.cx + 6, p.cy - 14, { c: INK, w: 1 }));
        g.push(txt(296, p.cy + 8, 'Roterande', { size: fz(16), anchor: 'start' }));
        g.push(txt(296, p.cy + 8 + 19 * FS, 'skiva', { size: fz(16), anchor: 'start' }));
        g.push(line(294, p.cy + 4, p.cx + 24, p.cy + 6, { c: INK, w: 1 }));
        g.push(txt(120, p.cy + R + 26, 'Figur 1', { size: fz(17), anchor: 'start' }));
        return { g: g.join(''), h: p.cy + R + 34 - oy };
    }
    const ALPHA = 0.42;
    function fig2(oy, o = {}) {
        const p = panel(oy, ALPHA, o);
        const g = p.g;
        // streckad lodlinje från mitten till väggen + rät vinkel
        g.push(line(p.cx, p.cy, p.cx, p.yw, { c: o.Lc || SOFT, w: o.Lc ? 1.8 : 1.1, dash: '5 4' }));
        g.push(ratvinkel([p.cx, p.yw], [1, 0], [0, 1], 9, { c: o.rv || INK }));
        // vinkeln α
        const r = 62, a1 = -Math.PI / 2, a2 = -Math.PI / 2 + ALPHA;
        g.push(arcPath(p.cx, p.cy, r, a1, a2, { c: o.ac || INK, w: o.ac ? 1.8 : 1.3 }));
        const bm = (a1 + a2) / 2;
        g.push(txt(p.cx + (r + 12) * Math.cos(bm) - 2, p.cy + (r + 12) * Math.sin(bm) + 4, it('α'), { size: fz(19), fill: o.ac || INK }));
        // måttet x ovanför väggen
        const yx = p.yw - 34;
        g.push(line(p.cx, p.yw - 20, p.cx, yx - 6, { c: SOFT, w: 0.9 }));
        g.push(line(p.xs, p.yw - 20, p.xs, yx - 6, { c: SOFT, w: 0.9 }));
        g.push(dim(p.cx, yx, p.xs, yx, { c: o.xc || INK, w: 1.1, head: 7 }));
        g.push(txt((p.cx + p.xs) / 2, yx - 7, it('x'), { size: fz(19), fill: o.xc || INK }));
        // rotationspilen till höger om skivan (medurs)
        if (!o.noRot) {
            const rr = R + 16, b1 = -0.35, b2 = 1.05;
            g.push(arcPath(p.cx, p.cy, rr, b1, b2, { c: INK, w: 1.4 }));
            const ex = p.cx + rr * Math.cos(b2), ey = p.cy + rr * Math.sin(b2);
            const tx = -Math.sin(b2), ty = Math.cos(b2);
            g.push(arrow(ex - tx * 2, ey - ty * 2, ex + tx * 9, ey + ty * 9, { c: INK, w: 1.4, head: 9 }));
            g.push(txt(120, p.cy + R + 26, 'Figur 2', { size: fz(17), anchor: 'start' }));
        }
        return { g: g.join(''), h: p.cy + R + 34 - oy, p };
    }
    {
        // Figur 1 och figur 2 bredvid varandra (i provet under varandra):
        // en låg, bred figur ryms bättre bredvid uppgiftstexten.
        // Texten görs större här: figuren visas nedskalad i det nålade kortet.
        FS = 1.3; Lpx = 130;
        const f1 = fig1(34);
        const f2 = fig2(34);
        FIG['u27'] = svg(684, 34 + Math.max(f1.h, f2.h) + 8,
            `<g transform="translate(-100,0)">${f1.g}</g><g transform="translate(250,0)">${f2.g}</g>`);
        FS = 1; Lpx = 170;
    }
    // s1: triangeln: närliggande L (blå), motstående x (accent), vinkeln α
    {
        const f2 = fig2(20, { Lc: BLUE, xc: RED, ac: RED, noRot: true });
        const p = f2.p;
        const extra = [];
        extra.push(`<polygon points="${p.cx},${A(p.cy)} ${p.cx},${A(p.yw)} ${A(p.xs)},${A(p.yw)}" fill="${RED_T}" stroke="none"${aFade(BAS)}/>`);
        extra.push(line(p.cx, p.yw + 0.8, p.xs, p.yw + 0.8, { c: RED, w: 3, anim: aFade(BAS + 0.3) }));
        extra.push(txt(p.xs + 10, p.yw + 18, 'motstående katet', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        extra.push(txt(p.cx - 10, p.yw + 70, 'närliggande', { size: 12, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.7) }));
        extra.push(txt(p.cx - 10, p.yw + 85, 'katet', { size: 12, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.7) }));
        // flytta L-etiketten ur vägen: den står redan vid måttlinjen till vänster
        FIG['u27-s1'] = svg(380, f2.h + 26, f2.g + extra.join(''), 100, 0);
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 4 VT 2018, delprov D (genererade — redigera inte');
out.push('// för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2018-D.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2018'] = Object.assign(window.NP_FIGURER['ma4-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2018-figurer-D.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
