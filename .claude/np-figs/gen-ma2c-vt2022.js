// Generator för data/np/ma2c-vt2022-figurer.js — NP Matematik 2c VT 2022.
// Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma2c-vt2022.js
// Konventioner: se .claude/np-figs/gen-ma3c-vt2022.js (samma helpers/stil).
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const SHADE = 'rgba(15,22,32,0.12)';
const SHADE2 = 'rgba(28,61,107,0.14)';
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

function fracLab(x, y, top, bot, o = {}) {
    const c = o.fill || INK, an = o.anim || '';
    const w = o.w || Math.max(String(top).length, 3) * 7;
    return txt(x, y - 4, top, { size: o.size || 11.5, fill: c, anim: an, italic: o.topItalic }) +
        line(x - w / 2, y, x + w / 2, y, { c, w: 1.1, anim: an ? an.replace('anim-draw', 'anim-fade') : '' }) +
        txt(x, y + 12, bot, { size: o.size || 11.5, fill: c, anim: an, italic: o.botItalic });
}

// Vinkelbåge centrerad i hörnet v, från riktning a1° till a2° (matematiska
// grader, y uppåt i den "matematiska" tolkningen, se angDeg-mönstret).
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

// Konverterar ett pixel-vektorpar (y ned) till samma "matematiska" gradmått
// som angleArc/pt() förväntar (y upp).
const angDeg = (from, to) => Math.atan2(-(to.y - from.y), to.x - from.x) * 180 / Math.PI;

// Litet tvärstreck (likhetsmarkering) vinkelrätt mot en sträckas mittpunkt.
function tick(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const nx = -dy / L, ny = dx / L, len = o.len || 5.5;
    return line(mx - nx * len, my - ny * len, mx + nx * len, my + ny * len, { c: o.c || INK, w: o.w || 1.6, anim: o.anim || '' });
}

// Litet rätvinkelmärke i ett hörn, d1/d2 = enhetsvektorer längs de två benen.
function rightAngle(corner, d1, d2, size = 10, o = {}) {
    const p1 = { x: corner.x + d1.x * size, y: corner.y + d1.y * size };
    const p2 = { x: p1.x + d2.x * size, y: p1.y + d2.y * size };
    const p3 = { x: corner.x + d2.x * size, y: corner.y + d2.y * size };
    return `<path d="M ${A(p1.x)} ${A(p1.y)} L ${A(p2.x)} ${A(p2.y)} L ${A(p3.x)} ${A(p3.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
}

function poly(pts, o = {}) {
    return `<polygon points="${pts.map(p => `${A(p.x)},${A(p.y)}`).join(' ')}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'none'}" stroke-width="${o.w || 0}"${o.anim || ''}/>`;
}

// ---- Koordinatsystem-helper (samma som ma3c-generatorn) ----------------
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
            g.push(txt(px(x), ax + 16, (x < 0 ? MINUS : '') + Math.abs(x), { size: 11.5, fill: SOFT }));
        }
        for (let y = Math.ceil(cfg.ymin); y <= cfg.ymax; y++) {
            if (y === 0) continue;
            g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
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

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ================= UPPGIFT 2 — punkter på en parabel ================= */
(function () {
    const f = x => -0.5 * x * x + 1.5 * x + 2; // genom D(-1,0) E(0,2) F(4,0)
    function base() {
        const G = graph({ xmin: -2, xmax: 5, ymin: -3, ymax: 4, ux: 34, uy: 34, grid: true, ticks: true });
        const g = G.base.slice();
        const D = { x: G.px(-1), y: G.py(0) }, E = { x: G.px(0), y: G.py(2) }, F = { x: G.px(4), y: G.py(0) };
        g.push(`<circle cx="${A(D.x)}" cy="${A(D.y)}" r="3.2" fill="${INK}"/>`);
        g.push(`<circle cx="${A(E.x)}" cy="${A(E.y)}" r="3.2" fill="${INK}"/>`);
        g.push(`<circle cx="${A(F.x)}" cy="${A(F.y)}" r="3.2" fill="${INK}"/>`);
        g.push(txt(D.x - 8, D.y - 8, it('D'), { size: 14, anchor: 'end' }));
        // E uppe till vänster om punkten och F uppe till höger: parabeln i
        // u2-s1 går genom båda punkterna, uppåt åt höger vid E och nedåt vid F
        g.push(txt(E.x - 9, E.y - 11, it('E'), { size: 14, anchor: 'end' }));
        g.push(txt(F.x + 8, F.y - 9, it('F'), { size: 14, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u2'] = svg(G.W, G.H, g.join('')); }
    {
        const { G, g } = base();
        g.push(curvePath(G, f, -2, 5, { anim: aDraw(BAS, 0.9) }));
        g.push(line(G.px(1.5), G.py(-3), G.px(1.5), G.py(4), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(1.5) + 8, G.py(4) + 16, `${it('x')} = 1,5`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        FIG['u2-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 4 — normalfördelningar ================= */
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
            { letter: 'A', mu: 3, sigma: 1, h: 46 },
            { letter: 'B', mu: 6, sigma: 2.5, h: 18.4 },
            { letter: 'C', mu: 11, sigma: 1.3, h: 35.4 },
            { letter: 'D', mu: 15, sigma: 0.5, h: 92 },
            { letter: 'E', mu: 18, sigma: 1.3, h: 35.4 },
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
            D: { color: RED, anim: aDraw(BAS, 0.7) },
            A: { color: SOFT }, B: { color: SOFT }, C: { color: SOFT }, E: { color: SOFT },
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
            const dDef = PB.defs.find(d => d.letter === 'D');
            const xLbl = PB.px(dDef.mu) + 12, yLbl = PB.py(dDef.h) + 20;
            const inner = txt(xLbl, yLbl, 'minst spridning', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) });
            parts.push(`<g transform="translate(${A(offX)},${A(yB)})">${inner}</g>`);
        }
        return svg(W, H, parts.join(''));
    }
    FIG['u4'] = build('base');
    FIG['u4-s1'] = build('s1');
    FIG['u4-s2'] = build('s2');
})();

/* ================= UPPGIFT 7 — hage: rektangel med x ================= */
(function () {
    const X = 40, Y = 34, Wr = 170, Hr = 150;
    const W = X + Wr + 96, H = Y + Hr + 56;
    function base() {
        const g = [];
        g.push(`<rect x="${A(X)}" y="${A(Y)}" width="${A(Wr)}" height="${A(Hr)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(txt(W - 10, 20, '(m)', { size: 12, fill: SOFT, anchor: 'end' }));
        const dimY = Y + Hr + 22;
        g.push(line(X, Y + Hr + 4, X, dimY, { w: 1, c: SOFT }));
        g.push(line(X + Wr, Y + Hr + 4, X + Wr, dimY, { w: 1, c: SOFT }));
        g.push(dim(X, dimY, X + Wr, dimY, {}));
        g.push(txt(X + Wr / 2, dimY + 18, it('x'), { size: 13.5 }));
        return g;
    }
    FIG['u7'] = svg(W, H, base().join(''));
    {
        const g = base();
        const dimX = X + Wr + 26;
        g.push(line(X + Wr + 4, Y, dimX, Y, { w: 1, c: RED, dash: '3 3', anim: aFade(BAS) }));
        g.push(line(X + Wr + 4, Y + Hr, dimX, Y + Hr, { w: 1, c: RED, dash: '3 3', anim: aFade(BAS) }));
        g.push(dim(dimX, Y, dimX, Y + Hr, { c: RED, fade: BAS + 0.3 }));
        g.push(txt(dimX + 10, Y + Hr / 2 + 4, `60 ${MINUS} ${it('x')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        FIG['u7-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 11 — bisektriser i triangel ================= */
(function () {
    const rad = a => a * Math.PI / 180;
    const Adeg = 70, Bdeg = 40; // vinkel A och B, ger v = 70
    const alpha = Adeg / 2, beta = Bdeg / 2; // 35, 20
    const AB = 1;
    // skärning av två strålar (matematiska koordinater, y upp)
    function rayIntersect(P1, ang1, P2, ang2) {
        const d1 = { x: Math.cos(rad(ang1)), y: Math.sin(rad(ang1)) };
        const d2 = { x: Math.cos(rad(ang2)), y: Math.sin(rad(ang2)) };
        // P1 + t d1 = P2 + s d2
        const den = d1.x * (-d2.y) - d1.y * (-d2.x);
        const rhsx = P2.x - P1.x, rhsy = P2.y - P1.y;
        const t = (rhsx * (-d2.y) - rhsy * (-d2.x)) / den;
        return { x: P1.x + t * d1.x, y: P1.y + t * d1.y };
    }
    const Aw = { x: 0, y: 0 }, Bw = { x: AB, y: 0 };
    const Cw = rayIntersect(Aw, Adeg, Bw, 180 - Bdeg);
    const Dw = rayIntersect(Aw, alpha, Bw, 180 - beta);
    const u = 280;
    const yMaxW = Cw.y;
    const padL = 40, padT = 30, padB = 40, padR = 40;
    const P = p => ({ x: padL + p.x * u, y: padT + (yMaxW - p.y) * u });
    const Ap = P(Aw), Bp = P(Bw), Cp = P(Cw), Dp = P(Dw);
    const W = Bp.x + padR, H = Ap.y + padB;
    function base() {
        const g = [];
        g.push(`<polygon points="${A(Ap.x)},${A(Ap.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Cp.x)},${A(Cp.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(line(Ap.x, Ap.y, Dp.x, Dp.y, { w: 1.7 }));
        g.push(line(Bp.x, Bp.y, Dp.x, Dp.y, { w: 1.7 }));
        g.push(`<circle cx="${A(Dp.x)}" cy="${A(Dp.y)}" r="2.6" fill="${INK}"/>`);
        g.push(txt(Ap.x - 10, Ap.y + 15, it('A'), { size: 14, anchor: 'end' }));
        g.push(txt(Bp.x + 10, Bp.y + 15, it('B'), { size: 14, anchor: 'start' }));
        g.push(txt(Cp.x, Cp.y - 11, it('C'), { size: 14 }));
        g.push(txt(Dp.x + 9, Dp.y - 5, it('D'), { size: 13.5, anchor: 'start' }));
        g.push(angleArc(Dp.x, Dp.y, angDeg(Dp, Ap), angDeg(Dp, Bp), 22, { label: '125°', labelR: 15, size: 11.5 }));
        g.push(angleArc(Cp.x, Cp.y, angDeg(Cp, Ap), angDeg(Cp, Bp), 26, { label: it('v'), labelR: 17, size: 13 }));
        return g;
    }
    FIG['u11'] = svg(W, H, base().join(''));
    // s1: halva vinklarna markerade — två bågar α vid A, två bågar β vid B
    {
        const g = base();
        const aC = angDeg(Ap, Cp), aD = angDeg(Ap, Dp), aB = angDeg(Ap, Bp);
        g.push(angleArc(Ap.x, Ap.y, aC, aD, 18, { c: RED, label: it('α'), labelR: 13, size: 11, anim: aFade(BAS) }));
        g.push(angleArc(Ap.x, Ap.y, aD, aB, 18, { c: RED, label: it('α'), labelR: 13, size: 11, anim: aFade(BAS + 0.2) }));
        const bA = angDeg(Bp, Ap), bD = angDeg(Bp, Dp), bC = angDeg(Bp, Cp);
        g.push(angleArc(Bp.x, Bp.y, bA, bD, 18, { c: RED, label: it('β'), labelR: 13, size: 11, anim: aFade(BAS + 0.4) }));
        g.push(angleArc(Bp.x, Bp.y, bD, bC, 18, { c: RED, label: it('β'), labelR: 13, size: 11, anim: aFade(BAS + 0.6) }));
        FIG['u11-s1'] = svg(W, H, g.join(''));
    }
    // s2: triangeln ABD skuggad + α + β = 55°
    {
        const g = base();
        g.push(poly([Ap, Bp, Dp], { fill: SHADE, anim: aFade(BAS) }));
        g.push(txt((Ap.x + Bp.x) / 2, Ap.y + 26, `${it('α')} + ${it('β')} = 55°`, { size: 12.5, fill: RED, anim: aFade(BAS + 0.4) }));
        FIG['u11-s2'] = svg(W, H, g.join(''));
    }
    // s3: v = 180 − 2·55 = 70
    {
        const g = base();
        g.push(`<circle cx="${A(Cp.x)}" cy="${A(Cp.y)}" r="3.4" fill="${RED}"${aFade(BAS)}/>`);
        g.push(txt((Ap.x + Bp.x) / 2, Ap.y + 26, `${it('v')} = 180° ${MINUS} 2 · 55° = 70°`, { size: 12.5, fill: RED, anim: aFade(BAS + 0.3) }));
        FIG['u11-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 14 — exponentialfunktion ================= */
(function () {
    const f = x => (2 / 9) * Math.pow(3, x);
    const xmin = -0.6, xmax = 5.3, ymin = 0, ymax = 58;
    const uxPx = 46, uyPx = 3.35;
    const padL = 34, padR = 22, padT = 16, padB = 24;
    const W = padL + (xmax - xmin) * uxPx + padR;
    const H = padT + (ymax - ymin) * uyPx + padB;
    const px = x => padL + (x - xmin) * uxPx;
    const py = y => padT + (ymax - y) * uyPx;
    function base() {
        const g = [];
        const ax = py(0), ay = px(0);
        g.push(line(px(xmin), ax, px(xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(xmax) + 14)},${A(ax)} ${A(px(xmax) + 7)},${A(ax + 4.2)} ${A(px(xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
        g.push(line(ay, py(ymin), ay, py(ymax) - 8, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(ay)},${A(py(ymax) - 14)} ${A(ay + 4.2)},${A(py(ymax) - 7)} ${A(ay - 4.2)},${A(py(ymax) - 7)}" fill="${INK}"/>`);
        g.push(txt(px(xmax) + 12, ax + 17, 'x', { size: 14, italic: true }));
        g.push(txt(ay + 12, py(ymax) - 8, 'y', { size: 14, italic: true }));
        // kurva
        let d = '', pen = false;
        for (let i = 0; i <= 160; i++) {
            const x = -0.5 + (5.1 - (-0.5)) * i / 160;
            const y = f(x);
            if (y > ymax * 1.03) { pen = false; continue; }
            d += (pen ? ' L ' : ' M ') + A(px(x)) + ' ' + A(py(y));
            pen = true;
        }
        g.push(`<path d="${d.trim()}" fill="none" stroke="${BLUE}" stroke-width="2.4"/>`);
        const p1 = { x: px(2), y: py(2) }, p2 = { x: px(5), y: py(54) };
        g.push(`<circle cx="${A(p1.x)}" cy="${A(p1.y)}" r="3.2" fill="${INK}"/>`);
        g.push(`<circle cx="${A(p2.x)}" cy="${A(p2.y)}" r="3.2" fill="${INK}"/>`);
        g.push(txt(p1.x - 8, p1.y - 9, '(2, 2)', { size: 12, anchor: 'end' }));
        g.push(txt(p2.x - 8, p2.y - 9, '(5, 54)', { size: 12, anchor: 'end' }));
        return g;
    }
    FIG['u14'] = svg(W, H, base().join(''));
    {
        const g = base();
        const p0 = { x: px(0), y: py(2 / 9) };
        g.push(`<circle cx="${A(p0.x)}" cy="${A(p0.y)}" r="3.4" fill="${RED}"${aFade(BAS)}/>`);
        g.push(line(p0.x - 6, p0.y, p0.x + 3, p0.y, { c: RED, w: 1.3, anim: aFade(BAS + 0.1) }));
        const inner = fracLab(p0.x - 22, p0.y - 2, '2', '9', { fill: RED, anim: aFade(BAS + 0.3), w: 13 });
        g.push(inner);
        FIG['u14-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 16 — randvinkelsatsen ================= */
(function () {
    const rad = a => a * Math.PI / 180;
    const M = { x: 145, y: 150 }, R = 100;
    const pt = a => ({ x: M.x + R * Math.cos(rad(a)), y: M.y - R * Math.sin(rad(a)) });
    const half = 52.3;
    const Cp = pt(90), Ap = pt(270 - half), Bp = pt(270 + half);
    function base() {
        const g = [];
        g.push(`<circle cx="${A(M.x)}" cy="${A(M.y)}" r="${R}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(line(Cp.x, Cp.y, Ap.x, Ap.y, { w: 1.6 }));
        g.push(line(Cp.x, Cp.y, Bp.x, Bp.y, { w: 1.6 }));
        g.push(line(M.x, M.y, Ap.x, Ap.y, { w: 1.6 }));
        g.push(line(M.x, M.y, Bp.x, Bp.y, { w: 1.6 }));
        g.push(`<circle cx="${A(M.x)}" cy="${A(M.y)}" r="2.6" fill="${INK}"/>`);
        g.push(txt(Cp.x, Cp.y - 10, it('C'), { size: 14 }));
        g.push(txt(Ap.x - 10, Ap.y + 6, it('A'), { size: 14, anchor: 'end' }));
        g.push(txt(Bp.x + 10, Bp.y + 6, it('B'), { size: 14, anchor: 'start' }));
        g.push(txt(M.x - 8, M.y - 8, it('M'), { size: 13.5, anchor: 'end' }));
        g.push(angleArc(Cp.x, Cp.y, angDeg(Cp, Ap), angDeg(Cp, Bp), 26, { label: '52,3°', labelR: 16, size: 11.5 }));
        g.push(angleArc(M.x, M.y, angDeg(M, Ap), angDeg(M, Bp), 22, { label: it('v'), labelR: 15, size: 13 }));
        return g;
    }
    const W = M.x + R + 30, H = M.y + R + 26;
    FIG['u16'] = svg(W, H, base().join(''));
    {
        const g = base();
        const a1 = angDeg(M, Ap), a2 = angDeg(M, Bp);
        g.push(angleArc(M.x, M.y, a1, a2, R, { c: RED, w: 3, anim: aDraw(BAS, 0.7) }));
        g.push(txt(M.x, M.y + R + 18, 'samma båge', { size: 12, fill: RED, anim: aFade(BAS + 0.9) }));
        FIG['u16-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 20 — likformiga rätvinkliga trianglar ================= */
(function () {
    const u = 22; // px per cm
    const AB = 5.6, BC = 1.8;
    const X0 = 40, baseY = 200;
    const Bp = { x: X0, y: baseY }, Ap = { x: X0, y: baseY - AB * u }, Cp = { x: X0 + BC * u, y: baseY };
    const gapX = 70;
    const Ep = { x: Cp.x + gapX, y: baseY }, Dp = { x: Ep.x, y: baseY - 2 * AB * u }, Fp = { x: Ep.x + 2 * BC * u, y: baseY };
    function base() {
        const g = [];
        g.push(`<polygon points="${A(Ap.x)},${A(Ap.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Cp.x)},${A(Cp.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(`<polygon points="${A(Dp.x)},${A(Dp.y)} ${A(Ep.x)},${A(Ep.y)} ${A(Fp.x)},${A(Fp.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(rightAngle(Bp, { x: 0, y: -1 }, { x: 1, y: 0 }, 9));
        g.push(rightAngle(Ep, { x: 0, y: -1 }, { x: 1, y: 0 }, 9));
        g.push(angleArc(Cp.x, Cp.y, angDeg(Cp, Bp), angDeg(Cp, Ap), 16, {}));
        g.push(angleArc(Fp.x, Fp.y, angDeg(Fp, Ep), angDeg(Fp, Dp), 22, {}));
        g.push(txt(Ap.x - 10, (Ap.y + Bp.y) / 2 + 4, '5,6', { size: 12.5, anchor: 'end' }));
        g.push(txt((Bp.x + Cp.x) / 2, Bp.y + 17, '1,8', { size: 12.5 }));
        g.push(txt(Ap.x, Ap.y - 10, it('A'), { size: 13.5 }));
        g.push(txt(Bp.x - 9, Bp.y + 4, it('B'), { size: 13.5, anchor: 'end' }));
        g.push(txt(Cp.x + 9, Cp.y + 4, it('C'), { size: 13.5, anchor: 'start' }));
        g.push(txt(Dp.x, Dp.y - 10, it('D'), { size: 13.5 }));
        g.push(txt(Ep.x - 9, Ep.y + 4, it('E'), { size: 13.5, anchor: 'end' }));
        g.push(txt(Fp.x + 9, Fp.y + 4, it('F'), { size: 13.5, anchor: 'start' }));
        g.push(txt(Fp.x + 30, Dp.y, '(cm)', { size: 12, fill: SOFT, anchor: 'start' }));
        return g;
    }
    const W = Fp.x + 70, H = baseY + 20;
    FIG['u20'] = svg(W, H, base().join(''));
    {
        const g = base();
        g.push(txt(Dp.x - 10, (Dp.y + Ep.y) / 2 + 4, '11,2', { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS) }));
        g.push(txt((Ep.x + Fp.x) / 2, Ep.y + 17, '3,6', { size: 12.5, fill: RED, anim: aFade(BAS + 0.25) }));
        g.push(txt((Cp.x + Ep.x) / 2, baseY - 30, 'skala 2', { size: 12.5, fill: RED, anim: aFade(BAS + 0.5) }));
        FIG['u20-s1'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 21 — byggnadens bredd och höjd ================= */
(function () {
    const f = x => -0.14 * x * x + 3.92 * x;
    const xTop = 14, yTop = f(14); // 27,44
    const ux = 8.6, uy = 3.9;
    const padL = 30, padR = 34, padT = 24, padB = 68;
    const W = padL + 28 * ux + padR;
    const ymaxWorld = yTop + 5;
    const H = padT + ymaxWorld * uy + padB;
    const px = x => padL + x * ux;
    const py = y => padT + (ymaxWorld - y) * uy;
    const y0 = py(0);
    function base() {
        const g = [];
        g.push(line(px(0) - 4, y0, px(28) + 10, y0, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(28) + 16)},${A(y0)} ${A(px(28) + 9)},${A(y0 + 4.2)} ${A(px(28) + 9)},${A(y0 - 4.2)}" fill="${INK}"/>`);
        g.push(line(px(0), py(0) + 4, px(0), py(ymaxWorld) - 8, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(0))},${A(py(ymaxWorld) - 14)} ${A(px(0) + 4.2)},${A(py(ymaxWorld) - 7)} ${A(px(0) - 4.2)},${A(py(ymaxWorld) - 7)}" fill="${INK}"/>`);
        g.push(txt(px(28) + 14, y0 + 17, 'x', { size: 14, italic: true }));
        g.push(txt(px(0) + 12, py(ymaxWorld) - 8, 'y', { size: 14, italic: true }));
        g.push(curveOf(g0 => g0));
        g.push(txt(px(20), py(f(20)) - 10, fnLab('f'), { size: 12.5, anchor: 'start', fill: BLUE }));
        // Höjd: lodrät dubbelpil vid toppen
        g.push(dim(px(xTop), y0, px(xTop), py(yTop), {}));
        g.push(txt(px(xTop) - 10, py(yTop / 2) + 4, 'Höjd', { size: 12.5, anchor: 'end' }));
        // Bredd: vågrät dubbelpil under axeln
        const dimY = y0 + 46;
        g.push(line(px(0), y0 + 6, px(0), dimY, { w: 1, c: SOFT }));
        g.push(line(px(28), y0 + 6, px(28), dimY, { w: 1, c: SOFT }));
        g.push(dim(px(0), dimY, px(28), dimY, {}));
        g.push(txt(px(14), dimY + 18, 'Bredd', { size: 12.5 }));
        g.push(txt(W - 8, 16, '(m)', { size: 12, fill: SOFT, anchor: 'end' }));
        return g;
        function curveOf() {
            let d = '', pen = false;
            for (let i = 0; i <= 160; i++) {
                const x = 0 + 28 * i / 160;
                const y = f(x);
                d += (pen ? ' L ' : ' M ') + A(px(x)) + ' ' + A(py(y));
                pen = true;
            }
            return `<path d="${d.trim()}" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
        }
    }
    const H2 = H;
    FIG['u21'] = svg(W, H2, base().join(''));
    {
        const g = base();
        g.push(`<circle cx="${A(px(0))}" cy="${A(y0)}" r="3.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(`<circle cx="${A(px(28))}" cy="${A(y0)}" r="3.6" fill="${RED}"${aFade(BAS + 0.1)}/>`);
        g.push(txt(px(0) - 7, y0 + 16, '0', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        g.push(txt(px(28) - 7, y0 + 16, '28', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.4) }));
        FIG['u21-s1'] = svg(W, H2, g.join(''));
    }
    {
        const g = base();
        g.push(`<circle cx="${A(px(0))}" cy="${A(y0)}" r="3.6" fill="${RED}"/>`);
        g.push(`<circle cx="${A(px(28))}" cy="${A(y0)}" r="3.6" fill="${RED}"/>`);
        g.push(txt(px(0) - 7, y0 + 16, '0', { size: 12, fill: RED, anchor: 'end' }));
        g.push(txt(px(28) - 7, y0 + 16, '28', { size: 12, fill: RED, anchor: 'end' }));
        g.push(line(px(xTop), y0, px(xTop), py(yTop) - 10, { c: RED, w: 1.5, dash: '4 4', anim: aFade(BAS) }));
        g.push(`<circle cx="${A(px(xTop))}" cy="${A(py(yTop))}" r="3.6" fill="${RED}"${aFade(BAS + 0.3)}/>`);
        g.push(txt(px(xTop) + 8, py(yTop) - 12, '27,44', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        FIG['u21-s2'] = svg(W, H2, g.join(''));
    }
})();

/* ================= UPPGIFT 23 — PMQR i en cirkel ================= */
(function () {
    const rad = a => a * Math.PI / 180;
    const M = { x: 150, y: 150 }, R = 100;
    const pt = a => ({ x: M.x + R * Math.cos(rad(a)), y: M.y - R * Math.sin(rad(a)) });
    const Rp = pt(90), Pp = pt(200), Qp = pt(340);
    function base() {
        const g = [];
        g.push(`<circle cx="${A(M.x)}" cy="${A(M.y)}" r="${R}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(line(Pp.x, Pp.y, M.x, M.y, { w: 1.6 }));
        g.push(line(M.x, M.y, Qp.x, Qp.y, { w: 1.6 }));
        g.push(line(Rp.x, Rp.y, Pp.x, Pp.y, { w: 1.6 }));
        g.push(line(Qp.x, Qp.y, Rp.x, Rp.y, { w: 1.6 }));
        g.push(`<circle cx="${A(M.x)}" cy="${A(M.y)}" r="2.6" fill="${INK}"/>`);
        g.push(txt(Rp.x, Rp.y - 10, it('R'), { size: 14 }));
        g.push(txt(Pp.x - 10, Pp.y + 8, it('P'), { size: 14, anchor: 'end' }));
        g.push(txt(Qp.x + 10, Qp.y + 8, it('Q'), { size: 14, anchor: 'start' }));
        g.push(txt(M.x + 11, M.y - 7, it('M'), { size: 13.5, anchor: 'start' }));
        g.push(angleArc(Pp.x, Pp.y, angDeg(Pp, M), angDeg(Pp, Rp), 20, { label: it('a'), labelR: 14, size: 12 }));
        g.push(angleArc(Qp.x, Qp.y, angDeg(Qp, Rp), angDeg(Qp, M), 20, { label: it('b'), labelR: 14, size: 12 }));
        // c-etiketten läggs till vänster om bisektrisen: hjälplinjen MR i
        // stegfigurerna går exakt längs bisektrisen (figuren är symmetrisk)
        g.push(angleArc(Rp.x, Rp.y, angDeg(Rp, Qp), angDeg(Rp, Pp), 26));
        g.push(txt(Rp.x - 15, Rp.y + 52, it('c'), { size: 12 }));
        return g;
    }
    const W = M.x + R + 26, H = M.y + R + 24;
    FIG['u23'] = svg(W, H, base().join(''));
    // s1: hjälplinjen MR + likhetsstreck på MP, MQ, MR
    {
        const g = base();
        g.push(line(M.x, M.y, Rp.x, Rp.y, { c: RED, w: 1.8, anim: aDraw(BAS, 0.5) }));
        g.push(tick(Pp.x, Pp.y, M.x, M.y, { c: RED, anim: aFade(BAS + 0.6) }));
        g.push(tick(M.x, M.y, Qp.x, Qp.y, { c: RED, anim: aFade(BAS + 0.7) }));
        g.push(tick(M.x, M.y, Rp.x, Rp.y, { c: RED, anim: aFade(BAS + 0.8) }));
        FIG['u23-s1'] = svg(W, H, g.join(''));
    }
    // s2: vinkel vid R på PR-sidan märkt a (rött), triangel MPR skuggad
    {
        const g = base();
        g.push(line(M.x, M.y, Rp.x, Rp.y, { c: SOFT, w: 1.6 }));
        g.push(poly([M, Pp, Rp], { fill: SHADE, anim: aFade(BAS) }));
        g.push(angleArc(Rp.x, Rp.y, angDeg(Rp, Pp), angDeg(Rp, M), 20, { c: RED, label: it('a'), labelR: 14, size: 12, anim: aFade(BAS + 0.4) }));
        FIG['u23-s2'] = svg(W, H, g.join(''));
    }
    // s3: vinkel vid R på RQ-sidan märkt b (rött), triangel MQR skuggad
    {
        const g = base();
        g.push(line(M.x, M.y, Rp.x, Rp.y, { c: SOFT, w: 1.6 }));
        g.push(poly([M, Qp, Rp], { fill: SHADE2, anim: aFade(BAS) }));
        g.push(angleArc(Rp.x, Rp.y, angDeg(Rp, M), angDeg(Rp, Qp), 20, { c: RED, label: it('b'), labelR: 14, size: 12, anim: aFade(BAS + 0.4) }));
        FIG['u23-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 27 — avstånd på en parabel ================= */
(function () {
    const f = x => x * x;
    const scale = { ux: 46, uy: 30 };
    const xmin = -0.4, xmax = 2.4, ymin = -0.4, ymax = 4.9;
    const padL = 18, padR = 18, padT = 14, padB = 18;
    const W = padL + (xmax - xmin) * scale.ux + padR;
    const H = padT + (ymax - ymin) * scale.uy + padB;
    const px = x => padL + (x - xmin) * scale.ux;
    const py = y => padT + (ymax - y) * scale.uy;
    const g = [];
    const ax = py(0), ay = px(0);
    g.push(line(px(xmin), ax, px(xmax) + 8, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(px(xmax) + 14)},${A(ax)} ${A(px(xmax) + 7)},${A(ax + 4.2)} ${A(px(xmax) + 7)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(ymin), ay, py(ymax) - 8, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(py(ymax) - 14)} ${A(ay + 4.2)},${A(py(ymax) - 7)} ${A(ay - 4.2)},${A(py(ymax) - 7)}" fill="${INK}"/>`);
    g.push(txt(px(xmax) + 12, ax + 16, 'x', { size: 13, italic: true }));
    g.push(txt(ay + 11, py(ymax) - 7, 'y', { size: 13, italic: true }));
    let d = '', pen = false;
    for (let i = 0; i <= 140; i++) {
        const x = xmin + 0.05 + (xmax - xmin - 0.1) * i / 140;
        const y = f(x);
        if (y > ymax) { pen = false; continue; }
        d += (pen ? ' L ' : ' M ') + A(px(x)) + ' ' + A(py(y));
        pen = true;
    }
    g.push(`<path d="${d.trim()}" fill="none" stroke="${BLUE}" stroke-width="2"/>`);
    const p1 = { x: px(1), y: py(1) }, p2 = { x: px(2), y: py(4) };
    g.push(`<circle cx="${A(p1.x)}" cy="${A(p1.y)}" r="3.2" fill="${INK}"/>`);
    g.push(`<circle cx="${A(p2.x)}" cy="${A(p2.y)}" r="3.2" fill="${INK}"/>`);
    g.push(txt(p1.x - 8, p1.y + 4, `(${it('a')}, ${it('a')})`, { size: 12, anchor: 'end' }));
    g.push(txt(p2.x + 8, p2.y - 6, `(2${it('a')}, 4${it('a')})`, { size: 12, anchor: 'start' }));
    // sträckan S
    g.push(line(p1.x, p1.y, p2.x, p2.y, { c: RED, w: 2 }));
    g.push(txt((p1.x + p2.x) / 2 - 10, (p1.y + p2.y) / 2 - 6, it('S'), { size: 13, fill: RED, anchor: 'end' }));
    // streckad rätvinklig triangel: a (vågrät), 3a (lodrät)
    g.push(line(p1.x, p1.y, p2.x, p1.y, { w: 1.3, dash: '4 3', c: SOFT }));
    g.push(line(p2.x, p1.y, p2.x, p2.y, { w: 1.3, dash: '4 3', c: SOFT }));
    g.push(txt((p1.x + p2.x) / 2, p1.y + 15, it('a'), { size: 12 }));
    g.push(txt(p2.x + 9, (p1.y + p2.y) / 2 + 4, `3${it('a')}`, { size: 12, anchor: 'start' }));
    FIG['u27-s1'] = svg(W + 44, H, g.join(''));   // plats för etiketten (2a, 4a)
})();

/* ================= UPPGIFT 28 — rektangel med förlängd diagonal ================= */
(function () {
    const s = 34; // px per "a"
    const Wr = 8 * s, Hr = 4 * s; // godtyckliga proportioner
    const X = 40, Y = 30;
    const Dp = { x: X, y: Y }, Cp = { x: X + Wr, y: Y };
    const Ap = { x: X, y: Y + Hr }, Bp = { x: X + Wr, y: Y + Hr };
    const Pp = { x: X + Wr, y: Y + Hr - s }; // BP = a (1 enhet), PC = 3a
    // Q: skärning av linjen D-P med linjen A-B (y = Ap.y), förlängd
    const tExt = (Ap.y - Dp.y) / (Pp.y - Dp.y);
    const Qp = { x: Dp.x + (Pp.x - Dp.x) * tExt, y: Ap.y };
    function base() {
        const g = [];
        g.push(`<polygon points="${A(Dp.x)},${A(Dp.y)} ${A(Cp.x)},${A(Cp.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Ap.x)},${A(Ap.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(line(Dp.x, Dp.y, Qp.x, Qp.y, { w: 1.7 }));
        [Ap, Bp, Cp, Dp, Pp].forEach(p => g.push(`<circle cx="${A(p.x)}" cy="${A(p.y)}" r="2.6" fill="${INK}"/>`));
        g.push(txt(Dp.x - 9, Dp.y - 4, it('D'), { size: 14, anchor: 'end' }));
        g.push(txt(Cp.x + 9, Cp.y - 4, it('C'), { size: 14, anchor: 'start' }));
        g.push(txt(Ap.x - 9, Ap.y + 15, it('A'), { size: 14, anchor: 'end' }));
        g.push(txt(Bp.x - 4, Bp.y + 16, it('B'), { size: 14, anchor: 'end' }));
        g.push(txt(Pp.x + 9, Pp.y + 3, it('P'), { size: 13.5, anchor: 'start' }));
        g.push(txt(Qp.x + 9, Qp.y + 15, it('Q'), { size: 14, anchor: 'start' }));
        return g;
    }
    const W = Qp.x + 60, H = Ap.y + 30;
    FIG['u28'] = svg(W, H, base().join(''));
    {
        const g = base();
        g.push(poly([Dp, Cp, Pp], { fill: SHADE, anim: aFade(BAS) }));
        g.push(poly([Qp, Bp, Pp], { fill: SHADE2, anim: aFade(BAS + 0.15) }));
        g.push(rightAngle(Cp, { x: -1, y: 0 }, { x: 0, y: 1 }, 8, { c: SOFT }));
        g.push(rightAngle(Bp, { x: 0, y: -1 }, { x: 1, y: 0 }, 8, { c: SOFT }));
        const aDP = angDeg(Pp, Dp), aCP = angDeg(Pp, Cp), aQP = angDeg(Pp, Qp), aBP = angDeg(Pp, Bp);
        g.push(angleArc(Pp.x, Pp.y, aCP, aDP, 15, { c: RED, anim: aFade(BAS + 0.5) }));
        g.push(angleArc(Pp.x, Pp.y, aBP, aQP, 15, { c: RED, anim: aFade(BAS + 0.7) }));
        FIG['u28-s1'] = svg(W, H, g.join(''));
    }
    {
        const g = base();
        const mx = Cp.x + 24;
        g.push(line(Cp.x + 5, Cp.y, mx, Cp.y, { w: 1, c: RED, dash: '2 3', anim: aFade(BAS) }));
        g.push(line(Pp.x + 5, Pp.y, mx, Pp.y, { w: 1, c: RED, dash: '2 3', anim: aFade(BAS) }));
        g.push(dim(mx, Cp.y, mx, Pp.y, { c: RED, fade: BAS + 0.2 }));
        g.push(txt(mx + 9, (Cp.y + Pp.y) / 2 + 4, `3${it('a')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        const my = Pp.y + (Bp.y - Pp.y) / 2;
        g.push(dim(mx, Pp.y, mx, Bp.y, { c: RED, fade: BAS + 0.6 }));
        g.push(line(Bp.x + 5, Bp.y, mx, Bp.y, { w: 1, c: RED, dash: '2 3', anim: aFade(BAS + 0.6) }));
        g.push(txt(mx + 9, my + 4, it('a'), { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(txt((Dp.x + Cp.x) / 2, Dp.y - 12, 'DC', { size: 12, fill: RED, anim: aFade(BAS + 1.0) }));
        g.push(txt((Ap.x + Qp.x) / 2, Ap.y + 26, 'BQ', { size: 12, fill: RED, anim: aFade(BAS + 1.2) }));
        FIG['u28-s2'] = svg(W, H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 2c VT 2022 (genererade — redigera inte för');
out.push('// hand; generatorn ligger i .claude/np-figs/gen-ma2c-vt2022.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma2c-vt2022'] = {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('};');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma2c-vt2022-figurer.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
