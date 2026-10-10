// Generator för data/np/ma4-vt2022-figurer-D.js — NP Matematik 4 VT 2022,
// delprov D (uppgift 20–27). Alla koordinater beräknade, alla kurvor
// samplade tätt ur sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2022-D.js
// Konventioner (som gen-ma3c-vt2022.js): ink #0f1620, soft #3f4a5c,
// accent #c8324a (markeringar i lösningssteg), kurvblå #1c3d6b.
// Animationsklasser: anim-draw (heldragna linjer ritas), anim-fade
// (etiketter, streckade linjer, punkter, ytor). BAS = basfördröjning.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.13)';
const SHADE = 'rgba(15,22,32,0.16)';
const RED_T = 'rgba(200,50,74,0.16)';
const BLUE_T = 'rgba(28,61,107,0.16)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const MINUS = '−';
const NB = ' ';

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
// upphöjt sist i en text (ingen efterföljande text som ska tillbaka ned)
const supEnd = s => `<tspan dy="-5" font-size="9">${s}</tspan>`;

// Pil (butt-cap, skaftet slutar vid huvudets bas).
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

// Måttlinje med dubbelpil.
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

// Svenskt talformat: decimalkomma, äkta minus, hårt mellanslag i tusental.
function fmt(v, d = 0) {
    let s = Math.abs(v).toFixed(d).replace('.', ',');
    const [ip, fp] = s.split(',');
    const g = ip.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
    s = fp !== undefined ? g + ',' + fp : g;
    return (v < 0 && parseFloat(Math.abs(v).toFixed(d)) !== 0 ? MINUS : '') + s;
}

// ---- Koordinatsystem: fria skalor och fria skalstreck ------------------
// cfg: xmin,xmax,ymin,ymax, ux,uy (px/enhet), padL/R/T/B,
// xt/yt: [[värde, etikett|null]], xlab/ylab (html), grid: {xs:[], ys:[]}
function graph(cfg) {
    const ux = cfg.ux, uy = cfg.uy;
    const padL = cfg.padL ?? 40, padR = cfg.padR ?? 28, padT = cfg.padT ?? 22, padB = cfg.padB ?? 26;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    const ax = py(cfg.ax0 ?? 0), ay = px(cfg.ay0 ?? 0);
    if (cfg.grid) {
        (cfg.grid.xs || []).forEach(x => g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: GRID, w: 1 })));
        (cfg.grid.ys || []).forEach(y => g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: GRID, w: 1 })));
    }
    g.push(line(px(cfg.xmin), ax, px(cfg.xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(cfg.xmax) + 14)},${A(ax)} ${A(px(cfg.xmax) + 7)},${A(ax + 4.2)} ${A(px(cfg.xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, py(cfg.ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(cfg.ymax) - 14)} ${A(ay + 4.2)},${A(py(cfg.ymax) - 7)} ${A(ay - 4.2)},${A(py(cfg.ymax) - 7)}" fill="${INK}"/>`);
    if (cfg.xlab !== null) g.push(txt(px(cfg.xmax) + 12, ax + (cfg.xlabDy ?? 17), cfg.xlab || it('x'), { size: 14 }));
    if (cfg.ylab !== null) g.push(txt(ay + (cfg.ylabDx ?? 12), py(cfg.ymax) - 6, cfg.ylab || it('y'), { size: 14, anchor: cfg.ylabAnchor || 'middle' }));
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

// Samplar f(x) tätt (steg ≤ 2 px) och klipper mot y-fönstret.
function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || Math.max(120, Math.ceil(Math.abs(G.px(x1) - G.px(x0)) / 2.5));
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

// Fylld yta mellan f (övre) och g (undre) från x0 till x1.
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

const FIG = {};

/* ================= UPPGIFT 20 — sin x i grader och i radianer ================= */
(function () {
    const deg = x => Math.sin(x * Math.PI / 180);
    const rad = x => Math.sin(x);
    const cfgP = {
        xmin: -6, xmax: 112, ymin: -1.35, ymax: 1.35, ux: 4.3, uy: 26,
        padL: 36, padR: 26, padT: 12, padB: 28,
        xt: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => [v, String(v)]),
        grid: { xs: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110], ys: [1, -1] },
    };
    const TITLE_H = 26, GAP = 14;
    function panel(f, title, oy, id) {
        const G = graph(id === 'Z' ? Object.assign({}, cfgP, { xt: cfgP.xt.map(([v]) => [v, null]) }) : cfgP);
        const g = [];
        // y-skalan: 1 och −1 till vänster om axeln
        G.base.forEach(s => g.push(s));
        g.push(line(G.px(0) - 3.5, G.py(1), G.px(0) + 3.5, G.py(1), { w: 1.2 }));
        g.push(line(G.px(0) - 3.5, G.py(-1), G.px(0) + 3.5, G.py(-1), { w: 1.2 }));
        g.push(txt(G.px(0) - 7, G.py(1) + 4, '1', { size: 11.5, fill: SOFT, anchor: 'end' }));
        g.push(txt(G.px(0) - 7, G.py(-1) + 4, MINUS + '1', { size: 11.5, fill: SOFT, anchor: 'end' }));
        g.push(curvePath(G, f, id === 'Z' ? -0.6 : -6, 112, { w: 1.9, n: id === 'Z' ? 520 : 200 }));
        if (id === 'Z') cfgP.xt.forEach(([v, l]) => g.push(txt(G.px(v), G.py(-1) + 15, l, { size: 11.5, fill: SOFT })));
        const head = txt(G.px(40), oy + 17, title, { size: 13.5, anchor: 'middle' });
        return { G, inner: head + `<g transform="translate(0,${oy + TITLE_H})">${g.join('')}</g>`, H: G.H + TITLE_H };
    }
    const Y0 = 0;
    const Yp = panel(deg, 'Yosefs kurva', Y0, 'Y');
    const Zp = panel(rad, 'Zaras kurva', Y0 + Yp.H + GAP, 'Z');
    const W = Yp.G.W, H = Yp.H + GAP + Zp.H;
    FIG['u20'] = svg(W, H, Yp.inner + Zp.inner);

    // s1: Yosefs kurva har sin topp vid x = 90 → grader
    {
        const G = Yp.G, oy = Y0 + TITLE_H;
        const m = [];
        m.push(line(G.px(90), oy + G.py(0), G.px(90), oy + G.py(1), { c: RED, w: 1.6, dash: '4 3', anim: aFade(BAS) }));
        m.push(dot(G.px(90), oy + G.py(1), { anim: aFade(BAS + 0.3) }));
        m.push(txt(G.px(90) - 8, oy + G.py(1) - 8, `topp vid ${it('x')} = 90`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        FIG['u20-s1'] = svg(W, H, Yp.inner + Zp.inner + m.join(''));
    }
    // s2: Zaras kurva upprepar sig efter 2π ≈ 6,28 → radianer
    {
        const G = Zp.G, oy = Y0 + Yp.H + GAP + TITLE_H;
        const p1 = Math.PI / 2 + 2 * Math.PI * 2, p2 = p1 + 2 * Math.PI;
        const m = [];
        m.push(dot(G.px(p1), oy + G.py(1), { r: 3.2, anim: aFade(BAS) }));
        m.push(dot(G.px(p2), oy + G.py(1), { r: 3.2, anim: aFade(BAS) }));
        const yd = oy + G.py(1) - 12;
        m.push(line(G.px(p1), oy + G.py(1) - 4, G.px(p1), yd - 5, { c: RED, w: 1, anim: aFade(BAS + 0.3) }));
        m.push(line(G.px(p2), oy + G.py(1) - 4, G.px(p2), yd - 5, { c: RED, w: 1, anim: aFade(BAS + 0.3) }));
        m.push(dim(G.px(p1), yd, G.px(p2), yd, { c: RED, head: 5, fade: BAS + 0.3 }));
        m.push(txt(G.px(p2) + 6, yd + 4, `period 2${it('π')} ≈ 6,28`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        // panelens rubrik ligger till vänster, etiketten till höger om rubriken
        FIG['u20-s2'] = svg(W, H, Yp.inner + Zp.inner + m.join(''));
    }
})();

/* ================= UPPGIFT 21 — område mellan y = 4x³ + k och y = 3x² ================= */
(function () {
    const K = 3.5931; // värdet uppgiften leder till; figuren ritas skalenligt med det
    const fo = x => 4 * x ** 3 + K, fu = x => 3 * x * x;
    const cfg = {
        xmin: 0, xmax: 2.3, ymin: 0, ymax: 36, ux: 150, uy: 6.2,
        padL: 30, padR: 28, padT: 22, padB: 26,
        xt: [[1.9, '1,9']],
    };
    function base(o = {}) {
        const G = graph(cfg);
        const g = G.base.slice();
        g.push(areaPath(G, fo, fu, 0, 1.9, { fill: o.fill || SHADE, anim: o.areaAnim }));
        g.push(line(G.px(1.9), G.py(0), G.px(1.9), G.py(35.2), { w: 1.3 }));
        g.push(curvePath(G, fo, 0, 2.06));
        g.push(curvePath(G, fu, 0, 2.3));
        g.push(txt(G.px(0.42), G.py(19), `${it('y')} = 4${it('x')}${sup('3')}+ ${it('k')}`, { size: 13, anchor: 'start', fill: BLUE }));
        g.push(txt(G.px(1.96), G.py(fu(2.12)) + 30, `${it('y')} = 3${it('x')}${supEnd('2')}`, { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u21'] = svg(G.W, G.H, g.join('')); }
    // s1: övre minus undre kurvan, och k där den övre kurvan börjar
    {
        const { G, g } = base({ fill: RED_T });
        const xs = 1.45;
        g.push(dim(G.px(xs), G.py(fo(xs)), G.px(xs), G.py(fu(xs)), { c: RED, fade: BAS }));
        g.push(txt(G.px(1.95), G.py(22) + 4, 'övre − undre', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(arrow(G.px(1.94), G.py(21.2), G.px(xs) + 4, G.py((fo(xs) + fu(xs)) / 2), { c: RED, w: 1.1, fade: BAS + 0.3 }));
        g.push(line(G.px(0) - 3.5, G.py(K), G.px(0) + 3.5, G.py(K), { c: RED, w: 1.6, anim: aFade(BAS + 0.6) }));
        g.push(txt(G.px(0) - 7, G.py(K) + 4, it('k'), { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        g.push(txt(G.px(0.12), G.py(10.5), 'arean 13', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(arrow(G.px(0.34), G.py(9.3), G.px(1.0), G.py(5.2), { c: RED, w: 1.1, fade: BAS + 0.9 }));
        FIG['u21-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 22 — solpanelens effekt ================= */
(function () {
    const y = x => 390 * Math.sin(0.26 * x - 2.0) + 230;
    // "mätvärden": modellen dagtid (med små avvikelser), nära noll nattetid
    const pts = [];
    for (let x = 1; x <= 73.01; x += 0.8) {
        const m = y(x);
        const jit = 9 * Math.sin(x * 7.3) + 5 * Math.cos(x * 3.1);
        pts.push([x, m > 30 ? m + jit : 12 + 4 * Math.sin(x * 5.7)]);
    }
    const cfg = {
        xmin: -12, xmax: 78, ymin: -230, ymax: 680, ux: 6.2, uy: 0.33,
        padL: 48, padR: 28, padT: 30, padB: 26,
        xt: [[-10, MINUS + '10'], [10, '10'], [20, '20'], [30, '30'], [40, '40'], [50, '50'], [60, '60'], [70, '70']],
        yt: [[-200, MINUS + '200'], [200, null], [400, null], [600, null]],
        xlab: null, ylab: null,
    };
    function base() {
        const G = graph(cfg);
        const g = G.base.slice();
        g.push(txt(G.px(78) + 12, G.py(0) - 8, it('x'), { size: 14 }));
        g.push(txt(G.px(78) + 12, G.py(0) + 18, 'h', { size: 13 }));
        g.push(txt(G.px(0) - 8, G.py(680) - 4, 'W', { size: 13, anchor: 'end' }));
        g.push(txt(G.px(0) + 9, G.py(680) - 4, it('y'), { size: 14, anchor: 'start' }));
        [200, 400, 600].forEach(v => g.push(txt(G.px(0) + 7, G.py(v) + 4, String(v), { size: 11.5, fill: SOFT, anchor: 'start' })));
        g.push(curvePath(G, y, -12, 77.5, { w: 1.8 }));
        pts.forEach(([a, b]) => g.push(`<circle cx="${A(G.px(a))}" cy="${A(G.py(b))}" r="2.5" fill="${INK}"/>`));
        g.push(txt(G.px(8), G.py(680) - 4, `${it('y')} = 390 sin(0,26${it('x')} ${MINUS} 2,0) + 230`, { size: 12.5, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u22'] = svg(G.W, G.H, g.join('')); }
    // s1 (a): klockan 19.00 → x = 19
    {
        const { G, g } = base();
        const x = 19, v = y(x);
        g.push(line(G.px(x), G.py(0), G.px(x), G.py(v), { c: RED, w: 1.6, dash: '4 3', anim: aFade(BAS) }));
        g.push(txt(G.px(x), G.py(0) + 30, '19', { size: 12, fill: RED, anim: aFade(BAS) }));
        g.push(dot(G.px(x), G.py(v), { anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(x) + 8, G.py(v) - 6, '308 W', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        FIG['u22-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): tangenten i x = 15,5 med lutningen −45 W/h
    {
        const { G, g } = base();
        const x = 15.5, v = y(x), k = 390 * 0.26 * Math.cos(0.26 * x - 2.0);
        const t = s => v + k * (s - x);
        g.push(`<path d="M ${A(G.px(14.2))} ${A(G.py(t(14.2)))} L ${A(G.px(18.5))} ${A(G.py(t(18.5)))}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS)}/>`);
        g.push(dot(G.px(x), G.py(v), { anim: aFade(BAS + 0.4) }));
        g.push(line(G.px(x), G.py(0), G.px(x), G.py(v) + 4, { c: RED, w: 1.2, dash: '4 3', anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(x), G.py(0) + 30, '15,5', { size: 12, fill: RED, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(21.2), G.py(520), 'lutning ≈', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(21.2), G.py(520) + 15, `${MINUS}45 W/h`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(arrow(G.px(21.0), G.py(530), G.px(17.8) + 3, G.py(t(17.8)) + 1, { c: RED, w: 1.1, fade: BAS + 0.8 }));
        FIG['u22-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 23 — rotationskropp ================= */
(function () {
    const f = x => 9 * x - x ** 4 - 7;
    const bis = (a, b) => { for (let i = 0; i < 100; i++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; } return (a + b) / 2; };
    const za = bis(0.5, 1.2), zb = bis(1.5, 2);
    function base(ymin) {
        const G = graph({ xmin: -0.25, xmax: 2.25, ymin, ymax: 2.35, ux: 118, uy: 52,
            padL: 22, padR: 30, padT: 22, padB: 24 });
        const g = G.base.slice();
        return { G, g };
    }
    const curve = (G) => curvePath(G, f, 0.735, 1.745);
    const lab = (G) => txt(G.px(1.63), G.py(1.55), `${it('y')} = 9${it('x')} ${MINUS} ${it('x')}${sup('4')}${MINUS} 7`, { size: 13, anchor: 'start', fill: BLUE });
    {
        const { G, g } = base(-0.75);
        g.push(areaPath(G, f, () => 0, za, zb));
        g.push(curve(G)); g.push(lab(G));
        FIG['u23'] = svg(G.W, G.H, g.join(''));
    }
    // s1: nollställena är integrationsgränserna
    {
        const { G, g } = base(-0.75);
        g.push(areaPath(G, f, () => 0, za, zb));
        g.push(curve(G)); g.push(lab(G));
        g.push(dot(G.px(za), G.py(0), { anim: aFade(BAS) }));
        g.push(dot(G.px(zb), G.py(0), { anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(za) - 6, G.py(0) + 17, `${it('a')} ≈ 0,83`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(zb) + 6, G.py(0) + 17, `${it('b')} ≈ 1,70`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        FIG['u23-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: kroppen som bildas — spegelkurvan och en skiva med radien y
    {
        const { G, g } = base(-2.15);
        g.push(areaPath(G, f, () => 0, za, zb));
        g.push(areaPath(G, () => 0, x => -f(x), za, zb, { fill: BLUE_T, anim: aFade(BAS) }));
        g.push(curvePath(G, x => -f(x), za, zb, { c: BLUE, w: 1.4, dash: '5 4', anim: aFade(BAS) }));
        g.push(curve(G)); g.push(lab(G));
        // skivor (ellipser) i några x-lägen
        [1.0, 1.31, 1.58].forEach((xs, i) => {
            const r = f(xs) * G.cfg.uy;
            g.push(`<ellipse cx="${A(G.px(xs))}" cy="${A(G.py(0))}" rx="${A(Math.max(4, r * 0.16))}" ry="${A(r)}" fill="none" stroke="${i === 1 ? RED : SOFT}" stroke-width="${i === 1 ? 1.6 : 1}"${i === 1 ? '' : ' stroke-dasharray="3 3"'}${aFade(BAS + 0.4 + 0.2 * i)}/>`);
        });
        const xm = 1.31;
        g.push(line(G.px(xm), G.py(0), G.px(xm), G.py(f(xm)), { c: RED, w: 1.6, anim: aFade(BAS + 1.0) }));
        g.push(txt(G.px(xm) + 5, G.py(f(xm) / 2) + 4, it('y'), { size: 13.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
        g.push(txt(G.px(1.7), G.py(-1.75), 'skivans area π' + it('y') + supEnd('2'), { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.3) }));
        FIG['u23-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 24 — täthetsfunktionen ================= */
(function () {
    const f = t => 0.02 * t * Math.exp(-0.01 * t * t);
    const G = graph({ xmin: 0, xmax: 31, ymin: 0, ymax: 0.1, ux: 14, uy: 2300,
        padL: 50, padR: 30, padT: 24, padB: 28,
        xt: [5, 10, 15, 20, 25, 30].map(v => [v, String(v)]),
        yt: [[0.02, '0,02'], [0.04, '0,04'], [0.06, '0,06'], [0.08, '0,08']],
        xlab: it('t'), ylab: it('y') });
    const g = G.base.slice();
    g.push(areaPath(G, f, () => 0, 0, 5, { fill: RED_T, anim: aFade(BAS) }));
    g.push(curvePath(G, f, 0, 30.5));
    g.push(txt(G.px(12.5), G.py(0.083), `${it('y')} = ${it('f')}(${it('t')})`, { size: 13, anchor: 'start', fill: BLUE }));
    g.push(txt(G.px(6.0), G.py(0.010), `sena högst 5 min`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
    g.push(arrow(G.px(5.8), G.py(0.013), G.px(3.4), G.py(0.024), { c: RED, w: 1.2, fade: BAS + 0.4 }));
    g.push(txt(G.px(31) + 10, G.py(0) + 33, '(min)', { size: 11.5, fill: SOFT, anchor: 'end' }));
    FIG['u24-s1'] = svg(G.W, G.H + 8, g.join(''));
})();

/* ================= UPPGIFT 25 — vindkraftverket ================= */
(function () {
    // Frågefigur: tre vindkraftverk på en slätt (originalet är ett foto)
    {
        const g = [];
        const W = 340, H = 230, ground = 196;
        g.push(`<rect x="10" y="${ground}" width="${W - 20}" height="26" fill="rgba(15,22,32,0.08)"/>`);
        g.push(line(10, ground, W - 10, ground, { c: SOFT, w: 1 }));
        function turbine(x, hub, L, rot) {
            const s = [];
            const top = hub + 4;
            s.push(`<polygon points="${A(x - 1.6)},${A(top)} ${A(x + 1.6)},${A(top)} ${A(x + 3.4)},${A(ground)} ${A(x - 3.4)},${A(ground)}" fill="#e4e6ea" stroke="${SOFT}" stroke-width="0.9"/>`);
            for (let i = 0; i < 3; i++) {
                const a = (rot + i * 120) * Math.PI / 180;
                const ux = Math.cos(a), uy = -Math.sin(a), nx = -uy, ny = ux;
                const w0 = L * 0.05;
                const p = [[x + nx * w0 * 0.5, hub + ny * w0 * 0.5], [x + ux * L * 0.25 + nx * w0, hub + uy * L * 0.25 + ny * w0],
                    [x + ux * L, hub + uy * L], [x + ux * L * 0.25 - nx * w0 * 0.4, hub + uy * L * 0.25 - ny * w0 * 0.4], [x - nx * w0 * 0.5, hub - ny * w0 * 0.5]];
                s.push(`<polygon points="${p.map(q => A(q[0]) + ',' + A(q[1])).join(' ')}" fill="#eceef1" stroke="${SOFT}" stroke-width="0.9" stroke-linejoin="round"/>`);
            }
            s.push(`<rect x="${A(x - 6)}" y="${A(hub - 2.5)}" width="11" height="5" rx="2" fill="#d6d9de" stroke="${SOFT}" stroke-width="0.9"/>`);
            s.push(`<circle cx="${A(x)}" cy="${A(hub)}" r="2.6" fill="#f4f5f7" stroke="${SOFT}" stroke-width="0.9"/>`);
            return s.join('');
        }
        g.push(turbine(70, 52, 50, 70));
        g.push(turbine(160, 112, 28, 200));
        g.push(turbine(266, 82, 38, 40));
        FIG['u25'] = svg(W, H, g.join(''));
    }
    const v = x => 11 * Math.sin(0.11 * x - 0.89) + 28;
    const x1 = (Math.asin(8 / 11) + 0.89) / 0.11; // 15,494
    const xmax = (Math.PI / 2 + 0.89) / 0.11;     // 22,37
    const cfgV = {
        xmin: 0, xmax: 25, ymin: 0, ymax: 45, ux: 19, uy: 5.6,
        padL: 42, padR: 30, padT: 26, padB: 40,
        xt: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(v => [v, v % 4 === 0 ? String(v) : null]),
        yt: [[10, '10'], [20, '20'], [30, '30'], [40, '40']],
        grid: { xs: [4, 8, 12, 16, 20, 24], ys: [10, 20, 30, 40] },
        ylab: `${it('v')} (km/h)`, ylabDx: 8, ylabAnchor: 'start',
        xlab: `${it('x')}`,
    };
    function baseV() {
        const G = graph(cfgV);
        const g = G.base.slice();
        g.push(txt(G.px(25) + 12, G.py(0) + 33, '(h)', { size: 11.5, fill: SOFT }));
        g.push(curvePath(G, v, 0, 24));
        g.push(line(G.px(24), G.py(0), G.px(24), G.py(v(24)), { c: SOFT, w: 1, dash: '3 3' }));
        return { G, g };
    }
    // s1 (a): största värdet 39 km/h vid x ≈ 22,4
    {
        const { G, g } = baseV();
        g.push(line(G.px(0), G.py(39), G.px(xmax), G.py(39), { c: RED, w: 1.4, dash: '4 3', anim: aFade(BAS) }));
        g.push(dot(G.px(xmax), G.py(39), { anim: aFade(BAS + 0.3) }));
        g.push(txt(G.px(xmax) - 6, G.py(39) - 9, `(22,4; 39)`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        FIG['u25-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): över 36 km/h från x ≈ 15,5 till dygnets slut
    {
        const { G, g } = baseV();
        g.push(line(G.px(0), G.py(36), G.px(25), G.py(36), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS) }));
        g.push(txt(G.px(0) - 7, G.py(36) + 9, '36', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS) }));
        g.push(curvePath(G, v, x1, 24, { c: RED, w: 3, anim: aDraw(BAS + 0.4, 0.6) }));
        g.push(dot(G.px(x1), G.py(36), { anim: aFade(BAS + 0.3) }));
        g.push(line(G.px(x1), G.py(36), G.px(x1), G.py(0), { c: RED, w: 1.1, dash: '3 3', anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(x1) - 5, G.py(30), '15,49', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        const yd = G.py(13);
        g.push(dim(G.px(x1), yd, G.px(24), yd, { c: RED, fade: BAS + 1.0 }));
        g.push(txt(G.px((x1 + 24) / 2), yd - 7, '8,5 h', { size: 12.5, fill: RED, anim: aFade(BAS + 1.1) }));
        FIG['u25-s2'] = svg(G.W, G.H, g.join(''));
    }
    // s3 (c): producerad energi per timme som funktion av tiden — arean är energin
    {
        const P = x => 0.42 * Math.min(v(x), 36) ** 3;
        const G = graph({
            xmin: 0, xmax: 25, ymin: 0, ymax: 23000, ux: 19, uy: 0.0118,
            padL: 58, padR: 30, padT: 26, padB: 40,
            xt: [4, 8, 12, 16, 20, 24].map(v => [v, v === 16 ? null : String(v)]),
            yt: [[5000, '5' + NB + '000'], [10000, '10' + NB + '000'], [15000, '15' + NB + '000'], [20000, '20' + NB + '000']],
            ylab: 'MJ/h', ylabDx: 8, ylabAnchor: 'start', xlab: it('x'),
        });
        const g = G.base.slice();
        g.push(txt(G.px(25) + 12, G.py(0) + 33, '(h)', { size: 11.5, fill: SOFT }));
        g.push(areaPath(G, P, () => 0, 0, x1, { fill: BLUE_T, anim: aFade(BAS) }));
        g.push(areaPath(G, P, () => 0, x1, 24, { fill: RED_T, anim: aFade(BAS + 0.5) }));
        g.push(curvePath(G, P, 0, 24));
        g.push(line(G.px(x1), G.py(0), G.px(x1), G.py(P(x1)), { c: SOFT, w: 1.1, dash: '3 3' }));
        g.push(line(G.px(24), G.py(0), G.px(24), G.py(P(24)), { c: SOFT, w: 1.1 }));
        g.push(txt(G.px(x1) + 4, G.py(0) + 16, '15,49', { size: 11.5, fill: SOFT, anchor: 'start' }));
        g.push(txt(G.px(9.4), G.py(3600), 'integral', { size: 12, fill: BLUE, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px((x1 + 24) / 2), G.py(9800), 'rektangel', { size: 12, fill: RED, anim: aFade(BAS + 0.7) }));
        g.push(txt(G.px((x1 + 24) / 2), G.py(P(24)) - 8, '0,42 · 36' + supEnd('3'), { size: 12, fill: RED, anim: aFade(BAS + 0.9) }));
        FIG['u25-s3'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 26 — temperaturen i kylrummet ================= */
(function () {
    const B = Math.PI / 2, C = -Math.PI / 4;
    const T = t => 2.6 * Math.cos(B * t + C) + 3.9;
    const ux = 25, uy = 15;
    const padL = 64, padT = 30;
    const tmax = 13.6, Tmin = 0, Tmax = 7.6;
    const px = t => padL + t * ux, py = v => padT + (Tmax - v) * uy;
    const W = padL + tmax * ux + 84, H = py(Tmin) + 44;
    function base() {
        const g = [];
        // axlar (bara positiva riktningen har pil)
        g.push(line(px(0), py(0), px(tmax) + 8, py(0), { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(tmax) + 15)},${A(py(0))} ${A(px(tmax) + 7)},${A(py(0) + 4.4)} ${A(px(tmax) + 7)},${A(py(0) - 4.4)}" fill="${INK}"/>`);
        g.push(line(px(0), py(0), px(0), py(Tmax) - 4, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(0))},${A(py(Tmax) - 11)} ${A(px(0) + 4.4)},${A(py(Tmax) - 3)} ${A(px(0) - 4.4)},${A(py(Tmax) - 3)}" fill="${INK}"/>`);
        g.push(txt(px(0) - 7, py(Tmax) - 2, '°C', { size: 13, anchor: 'end' }));
        g.push(txt(px(0) + 9, py(Tmax) - 2, 'Temperatur', { size: 13, anchor: 'start' }));
        g.push(txt(px(tmax) + 2, py(0) + 18, 'Tid', { size: 13, anchor: 'middle' }));
        g.push(txt(px(tmax) + 2, py(0) + 36, 'h', { size: 13, anchor: 'middle' }));
        // streckade linjer vid högsta och lägsta temperatur
        g.push(line(px(-1.0), py(6.5), px(tmax), py(6.5), { c: SOFT, w: 1, dash: '4 3' }));
        g.push(line(px(-1.0), py(1.3), px(tmax), py(1.3), { c: SOFT, w: 1, dash: '4 3' }));
        g.push(dim(px(-0.6), py(6.5), px(-0.6), py(1.3), { head: 6 }));
        g.push(txt(px(-0.6) - 5, py(3.9) + 4, '5,2', { size: 12.5, anchor: 'end' }));
        // periodmått mellan tredje och fjärde toppen
        g.push(line(px(8.5), py(6.5) - 4, px(8.5), py(6.5) - 26, { c: SOFT, w: 1 }));
        g.push(line(px(12.5), py(6.5) - 4, px(12.5), py(6.5) - 26, { c: SOFT, w: 1 }));
        g.push(dim(px(8.5), py(6.5) - 19, px(12.5), py(6.5) - 19, { head: 6 }));
        g.push(txt(px(10.5), py(6.5) - 24, '4,0', { size: 12.5 }));
        // kurvan
        const G = { px, py, cfg: { ymin: Tmin, ymax: Tmax } };
        g.push(curvePath(G, T, 0.5, 13.45, { c: INK, w: 1.7 }));
        return g;
    }
    FIG['u26'] = svg(W, H, base().join(''));
    // s1: amplitud, mittlinje, toppen kl 08.30 och 3,9 °C en timme senare
    {
        const g = base();
        g.push(line(px(0), py(3.9), px(14.0), py(3.9), { c: RED, w: 1.3, dash: '6 4', anim: aFade(BAS) }));
        g.push(txt(px(14.0) + 6, py(3.9) + 15, `${it('D')} = 3,9`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(dim(px(14.0), py(3.9), px(14.0), py(6.5), { c: RED, head: 6, fade: BAS + 0.5 }));
        g.push(txt(px(14.0) + 6, py(5.4) + 4, `${it('A')} = 2,6`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        g.push(dot(px(8.5), py(6.5), { r: 3.4, anim: aFade(BAS + 0.9) }));
        g.push(dot(px(9.5), py(3.9), { r: 3.4, anim: aFade(BAS + 1.1) }));
        g.push(line(px(8.5), py(6.5), px(8.5), py(0), { c: RED, w: 1, dash: '3 3', anim: aFade(BAS + 0.9) }));
        g.push(line(px(9.5), py(3.9), px(9.5), py(0), { c: RED, w: 1, dash: '3 3', anim: aFade(BAS + 1.1) }));
        g.push(txt(px(8.5) - 3, py(0) + 16, '8,5', { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        g.push(txt(px(9.5) + 3, py(0) + 16, '9,5', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
        FIG['u26-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 27 — C = ∫ (7x − x² − 10) dx ================= */
(function () {
    const f = x => 7 * x - x * x - 10;
    const h = Math.sqrt(6.75), a2 = 3.5 - h, b2 = 3.5 + h;
    const cfg = {
        xmin: -0.4, xmax: 7.4, ymin: -11.5, ymax: 3.6, ux: 52, uy: 19,
        padL: 40, padR: 28, padT: 22, padB: 18,
        xt: [1, 2, 3, 4, 5, 6, 7].map(v => [v, null]),
        yt: [[2, '2'], [-2, MINUS + '2'], [-4, MINUS + '4'], [-6, MINUS + '6'], [-8, MINUS + '8'], [-10, MINUS + '10']],
    };
    function base() {
        const G = graph(cfg);
        const g = G.base.slice();
        // x-talen ovanför axeln där kurvan ligger under den, under axeln mellan nollställena
        [1, 2, 3, 4, 5, 6, 7].forEach(v => {
            const above = v <= 2 || v >= 5;
            g.push(txt(G.px(v) + (v === 2 ? -8 : v === 5 ? 8 : 0), G.py(0) + (above ? -7 : 16), String(v), { size: 11.5, fill: SOFT }));
        });
        return { G, g };
    }
    const lab = G => txt(G.px(4.9), G.py(2.6), `${it('y')} = 7${it('x')} ${MINUS} ${it('x')}${sup('2')}${MINUS} 10`, { size: 13, anchor: 'start', fill: BLUE });
    // s1 (a): C störst när vi integrerar precis där kurvan ligger över x-axeln
    {
        const { G, g } = base();
        g.push(areaPath(G, f, () => 0, 2, 5, { fill: BLUE_T, anim: aFade(BAS) }));
        g.push(curvePath(G, f, -0.15, 7.15));
        g.push(lab(G));
        g.push(dot(G.px(2), G.py(0), { anim: aFade(BAS + 0.3) }));
        g.push(dot(G.px(5), G.py(0), { anim: aFade(BAS + 0.3) }));
        g.push(dim(G.px(2), G.py(-3.2), G.px(5), G.py(-3.2), { c: RED, fade: BAS + 0.6 }));
        g.push(txt(G.px(3.5), G.py(-3.2) + 17, `${it('b')} ${MINUS} ${it('a')} = 3`, { size: 12.5, fill: RED, anim: aFade(BAS + 0.8) }));
        FIG['u27-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): symmetriskt intervall kring x = 3,5 där plus- och minusytorna tar ut varandra
    {
        const { G, g } = base();
        g.push(areaPath(G, f, () => 0, 2, 5, { fill: BLUE_T, anim: aFade(BAS + 0.4) }));
        g.push(areaPath(G, () => 0, f, a2, 2, { fill: RED_T, anim: aFade(BAS + 0.8) }));
        g.push(areaPath(G, () => 0, f, 5, b2, { fill: RED_T, anim: aFade(BAS + 0.8) }));
        g.push(line(G.px(3.5), G.py(3.4), G.px(3.5), G.py(-11.3), { c: RED, w: 1.3, dash: '5 4', anim: aFade(BAS) }));
        g.push(txt(G.px(3.5) + 8, G.py(-10.6), `${it('x')} = 3,5`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS) }));
        g.push(curvePath(G, f, -0.15, 7.15));
        g.push(lab(G));
        g.push(txt(G.px(3.0), G.py(0.6), '+', { size: 15, fill: BLUE, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(1.25), G.py(-1.7), MINUS, { size: 15, fill: RED, anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(5.75), G.py(-1.7), MINUS, { size: 15, fill: RED, anim: aFade(BAS + 0.9) }));
        g.push(line(G.px(a2), G.py(0), G.px(a2), G.py(f(a2)), { c: RED, w: 1.2, anim: aFade(BAS + 0.8) }));
        g.push(line(G.px(b2), G.py(0), G.px(b2), G.py(f(b2)), { c: RED, w: 1.2, anim: aFade(BAS + 0.8) }));
        const yd = G.py(-7.6);
        g.push(dim(G.px(a2), yd, G.px(3.5), yd, { c: RED, head: 6, fade: BAS + 1.2 }));
        g.push(dim(G.px(3.5), yd, G.px(b2), yd, { c: RED, head: 6, fade: BAS + 1.2 }));
        g.push(txt(G.px((a2 + 3.5) / 2), yd - 6, it('h'), { size: 13, fill: RED, anim: aFade(BAS + 1.3) }));
        g.push(txt(G.px((3.5 + b2) / 2), yd - 6, it('h'), { size: 13, fill: RED, anim: aFade(BAS + 1.3) }));
        g.push(txt(G.px(a2) - 4, G.py(0) - 7, it('a'), { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(b2) + 4, G.py(0) - 7, it('b'), { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u27-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 4 VT 2022, delprov D (genererade — redigera inte');
out.push('// för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2022-D.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2022'] = Object.assign(window.NP_FIGURER['ma4-vt2022'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2022-figurer-D.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
