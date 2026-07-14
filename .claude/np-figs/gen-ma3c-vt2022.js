// Generator för data/np/ma3c-vt2022-figurer.js — NP Matematik 3c VT 2022.
// Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma3c-vt2022.js
// Konventioner: ink #0f1620, soft #3f4a5c, accent #c8324a (markeringar/
// tangenter i lösningssteg), kurvblå #1c3d6b, rutnät rgba(15,22,32,0.10).
// Animationsklasser: anim-draw (heldragna linjer ritas), anim-fade (etiketter,
// streckade linjer, punkter). Basfördröjning BAS ger läsaren tid att
// orientera sig innan animationen startar.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const SHADE = 'rgba(15,22,32,0.12)';
const PAPER = '#f6f1e7';
const GOLD = '#a8720a';

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

// Kurv-/funktionsetikett "y = f(x)" med kursiva variabler.
const fnLab = (fn) => `${it('y')} = ${it(fn)}(${it('x')})`;

// Pil (t.ex. hänvisningspil): butt-cap, skaftet slutar vid huvudets bas.
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

// Liten stackad kvot ("550" över bråkstreck över "x").
function fracLab(x, y, top, bot, o = {}) {
    const c = o.fill || INK, an = o.anim || '';
    const w = o.w || Math.max(String(top).length, 3) * 7;
    return txt(x, y - 4, top, { size: o.size || 11.5, fill: c, anim: an, italic: o.topItalic }) +
        line(x - w / 2, y, x + w / 2, y, { c, w: 1.1, anim: an ? an.replace('anim-draw', 'anim-fade') : '' }) +
        txt(x, y + 12, bot, { size: o.size || 11.5, fill: c, anim: an, italic: o.botItalic });
}

// Vinkelbåge centrerad i hörnet v, från riktning a1° till a2° (matematiska
// grader, y uppåt). Ritar kortaste vägen. Returnerar path + ev. etikett på
// bisektrisen (utanför bågen).
function angleArc(vx, vy, a1, a2, r, o = {}) {
    let d = ((a2 - a1) % 360 + 360) % 360;
    if (d > 180 && !o.reflex) { const t = a1; a1 = a2; a2 = t; d = 360 - d; }
    const rad = a => a * Math.PI / 180;
    const p1 = { x: vx + r * Math.cos(rad(a1)), y: vy - r * Math.sin(rad(a1)) };
    const p2 = { x: vx + r * Math.cos(rad(a2)), y: vy - r * Math.sin(rad(a2)) };
    // vinkeln växer (moturs i matte) = medurs i svg-y-ned → sweep 0
    let s = `<path d="M ${A(p1.x)} ${A(p1.y)} A ${A(r)} ${A(r)} 0 ${d > 180 ? 1 : 0} 0 ${A(p2.x)} ${A(p2.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
    if (o.label) {
        const bis = rad(a1 + d / 2), lr = r + (o.labelR || 13);
        s += txt(vx + lr * Math.cos(bis), vy - lr * Math.sin(bis) + 4, o.label, { size: o.size || 11.5, fill: o.c || INK, anim: o.animLabel || o.anim || '' });
    }
    return s;
}

// ---- Koordinatsystem-helper --------------------------------------------
// cfg: xmin,xmax,ymin,ymax (världskoordinater), ux,uy (px per enhet),
// grid (bool), ticks (bool), padL/padR/padT/padB.
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
    // axlar med pilspetsar
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
            const right = Array.isArray(cfg.yLabelsRight) && cfg.yLabelsRight.includes(y);
            g.push(txt(right ? ay + 7 : ay - 7, py(y) + 4, (y < 0 ? MINUS : '') + Math.abs(y), { size: 11.5, fill: SOFT, anchor: right ? 'start' : 'end' }));
        }
    }
    return { W, H, px, py, base: g, cfg };
}

// Samplar f(x) och klipper mot y-fönstret; kan ge flera delsegment.
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

/* ================= UPPGIFT 3 — parabel, avläs f'(2) ================= */
(function () {
    const f = x => 5 - (x - 1) * (x - 1);
    function base() {
        const G = graph({ xmin: -2, xmax: 4, ymin: -1, ymax: 6, ux: 36, uy: 36, grid: true, ticks: true, yLabelsRight: [3, 4] });
        const g = G.base.slice();
        g.push(curvePath(G, f, 1 - Math.sqrt(6.15), 1 + Math.sqrt(6.15)));
        g.push(txt(G.px(2.35), G.py(5.15), fnLab('f'), { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u3'] = svg(G.W, G.H, g.join('')); }
    // s1: tangent i x = 2 + trappsteg som visar lutningen −2
    {
        const { G, g } = base();
        const t = x => -2 * x + 8; // tangent i (2, 4)
        g.push(`<path d="M ${A(G.px(1))} ${A(G.py(6))} L ${A(G.px(4.05))} ${A(G.py(t(4.05)))}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS)}/>`);
        g.push(`<circle cx="${A(G.px(2))}" cy="${A(G.py(4))}" r="4" fill="${RED}"${aFade(BAS + 0.4)}/>`);
        g.push(line(G.px(2), G.py(4), G.px(3), G.py(4), { c: RED, w: 1.8, dash: '4 4', anim: aFade(BAS + 0.7) }));
        g.push(txt(G.px(2.5), G.py(4) - 7, '+1', { size: 11.5, fill: RED, anim: aFade(BAS + 0.9) }));
        g.push(line(G.px(3), G.py(4), G.px(3), G.py(2), { c: RED, w: 1.8, dash: '4 4', anim: aFade(BAS + 1.1) }));
        g.push(txt(G.px(3) + 7, G.py(3) + 4, MINUS + '2', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.3) }));
        FIG['u3-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 5 — enhetscirkeln ================= */
(function () {
    const C = { x: 150, y: 138 }, R = 92;
    const rad = a => a * Math.PI / 180;
    const pt = a => ({ x: C.x + R * Math.cos(rad(a)), y: C.y - R * Math.sin(rad(a)) });
    const P = pt(50), Q = pt(230);
    function base() {
        const g = [];
        // axlar
        g.push(line(C.x - 128, C.y, C.x + 128, C.y, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(C.x + 134)},${A(C.y)} ${A(C.x + 127)},${A(C.y + 4.2)} ${A(C.x + 127)},${A(C.y - 4.2)}" fill="${INK}"/>`);
        g.push(line(C.x, C.y + 122, C.x, C.y - 122, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(C.x)},${A(C.y - 128)} ${A(C.x + 4.2)},${A(C.y - 121)} ${A(C.x - 4.2)},${A(C.y - 121)}" fill="${INK}"/>`);
        g.push(txt(C.x + 132, C.y + 17, 'x', { size: 14, italic: true }));
        g.push(txt(C.x + 12, C.y - 120, 'y', { size: 14, italic: true }));
        g.push(`<circle cx="${C.x}" cy="${C.y}" r="${R}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        // radie till punkten + vinkelbåge 50°
        g.push(line(C.x, C.y, P.x, P.y, { w: 1.6 }));
        g.push(angleArc(C.x, C.y, 0, 50, 26, { label: '50°', labelR: 16, size: 11.5 }));
        g.push(`<circle cx="${A(P.x)}" cy="${A(P.y)}" r="3.2" fill="${INK}"/>`);
        g.push(txt(P.x + 8, P.y - 8, '(0,64; 0,77)', { size: 12, anchor: 'start' }));
        return g;
    }
    FIG['u5'] = svg(300, 276, base().join(''));
    // s1: sin 50° = y-koordinaten — streckad projektion till y-axeln
    {
        const g = base();
        g.push(line(P.x, P.y, C.x, P.y, { c: RED, w: 1.6, dash: '4 4', anim: aFade(BAS) }));
        g.push(line(C.x - 4, P.y, C.x + 4, P.y, { c: RED, w: 2.4, anim: aFade(BAS + 0.3) }));
        g.push(txt(C.x - 8, P.y + 4, '0,77', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        FIG['u5-s1'] = svg(300, 276, g.join(''));
    }
    // s2: cos 230° — motstående punkt, båge 230°, projektion till x-axeln
    {
        const g = base();
        g.push(angleArc(C.x, C.y, 0, 230, 20, { c: RED, reflex: true, anim: aFade(BAS) }));
        g.push(txt(C.x + 34, C.y + 38, '230°', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
        g.push(line(C.x, C.y, Q.x, Q.y, { c: RED, w: 1.8, anim: aDraw(BAS + 0.4, 0.4) }));
        g.push(`<circle cx="${A(Q.x)}" cy="${A(Q.y)}" r="3.2" fill="${RED}"${aFade(BAS + 0.8)}/>`);
        // koordinatetiketten utanför cirkeln, längs radiens förlängning
        const lp = pt(230); const ext = { x: C.x + (lp.x - C.x) * (R + 34) / R, y: C.y + (lp.y - C.y) * (R + 34) / R };
        g.push(txt(ext.x + 12, ext.y + 8, `(${MINUS}0,64; ${MINUS}0,77)`, { size: 12, fill: RED, anim: aFade(BAS + 1.0) }));
        g.push(line(Q.x, Q.y, Q.x, C.y, { c: RED, w: 1.6, dash: '4 4', anim: aFade(BAS + 1.2) }));
        g.push(line(Q.x, C.y - 4, Q.x, C.y + 4, { c: RED, w: 2.4, anim: aFade(BAS + 1.4) }));
        g.push(txt(Q.x + 7, C.y + 16, MINUS + '0,64', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.5) }));
        FIG['u5-s2'] = svg(300, 276, g.join(''));
    }
})();

/* ================= UPPGIFT 9 — vilken graf är f'? ================= */
(function () {
    const f = x => x * x * x - 3 * x;
    // Toppgraf (utan rutnät/siffror, som originalet)
    function topGraph() {
        const G = graph({ xmin: -2.4, xmax: 2.4, ymin: -3.4, ymax: 3.4, ux: 42, uy: 25, grid: false, ticks: false, padL: 12, padR: 24, padT: 12, padB: 14 });
        const g = G.base.slice();
        g.push(curvePath(G, f, -2.35, 2.35));
        g.push(txt(G.px(0.55), G.py(2.9), fnLab('f'), { size: 12.5, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    // Miniparabler A–F
    function mini(letter, fn) {
        const G = graph({ xmin: -2, xmax: 2, ymin: -2, ymax: 2, ux: 22, uy: 21, grid: false, ticks: false, padL: 10, padR: 18, padT: 10, padB: 12 });
        const g = G.base.slice();
        g.push(curvePath(G, fn, -1.95, 1.95, { w: 2 }));
        return { W: G.W, H: G.H, inner: g.join(''), letter };
    }
    const alts = [
        mini('A', x => 0.55 * x * x),
        mini('B', x => 0.55 * x * x - 1.1),
        mini('C', x => 0.55 * x * x + 0.7),
        mini('D', x => -0.55 * x * x),
        mini('E', x => -0.55 * x * x + 1.1),
        mini('F', x => -0.55 * x * x - 0.7),
    ];
    {
        const top = topGraph();
        const parts = [];
        const GAP = 20;
        const topX = (3 * (alts[0].W + GAP) - GAP - top.G.W) / 2;
        parts.push(`<g transform="translate(${A(topX)},0)">${top.g.join('')}</g>`);
        const y0 = top.G.H + 26;
        alts.forEach((m, i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const ox = col * (m.W + GAP), oy = y0 + row * (m.H + 30);
            parts.push(txt(ox + 8, oy + 10, m.letter + '.', { size: 13, anchor: 'start' }));
            parts.push(`<g transform="translate(${A(ox)},${A(oy + 14)})">${m.inner}</g>`);
        });
        const W = 3 * (alts[0].W + GAP) - GAP;
        const H = y0 + 2 * (alts[0].H + 30) - 16 + 14;
        FIG['u9'] = svg(W, H, parts.join(''));
    }
    // s1: f överst, f' underst — extrempunkter ↔ nollställen (streckade lod)
    {
        const top = topGraph();
        const g1 = top.g;
        const G2 = graph({ xmin: -2.4, xmax: 2.4, ymin: -3.5, ymax: 6.2, ux: 42, uy: 14, grid: false, ticks: false, padL: 12, padR: 24, padT: 10, padB: 14 });
        const g2 = G2.base.slice();
        g2.push(curvePath(G2, x => 3 * x * x - 3, -1.72, 1.72, { c: RED, w: 2.2, anim: aDraw(BAS + 0.8, 0.7) }));
        g2.push(txt(G2.px(1.15), G2.py(-1.5), `${it('y')} = ${it('f')}′(${it('x')})`, { size: 12.5, anchor: 'start', fill: RED, anim: aFade(BAS + 1.4) }));
        [-1, 1].forEach((x, i) => {
            g2.push(`<circle cx="${A(G2.px(x))}" cy="${A(G2.py(0))}" r="3.4" fill="${RED}"${aFade(BAS + 1.6 + i * 0.2)}/>`);
        });
        const H2off = top.G.H + 8;
        const parts = [];
        parts.push(`<g>${g1.join('')}</g>`);
        parts.push(`<g transform="translate(0,${A(H2off)})">${g2.join('')}</g>`);
        // extrempunkter i f + streckade lod genom båda systemen
        [-1, 1].forEach((x, i) => {
            const d = BAS + i * 0.35;
            parts.push(`<circle cx="${A(top.G.px(x))}" cy="${A(top.G.py(f(x)))}" r="3.4" fill="${RED}"${aFade(d)}/>`);
            parts.push(line(top.G.px(x), top.G.py(f(x)), G2.px(x), H2off + G2.py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(d + 0.15) }));
        });
        FIG['u9-s1'] = svg(top.G.W, H2off + G2.H, parts.join(''));
    }
})();

/* ================= UPPGIFT 10 — teckenstudium av p ================= */
(function () {
    const p = x => 0.3 * x * x * x - 1.35 * x * x + 3;
    function base() {
        const G = graph({ xmin: -2, xmax: 4, ymin: -2, ymax: 4, ux: 38, uy: 36, grid: true, ticks: true });
        const g = G.base.slice();
        g.push(curvePath(G, p, -1.72, 4.45));
        g.push(txt(G.px(0.75), G.py(3.5), fnLab('p'), { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u10'] = svg(G.W, G.H, g.join('')); }
    // s1: avtagande del 0 < x < 3 markerad + intervall på x-axeln
    {
        const { G, g } = base();
        g.push(curvePath(G, p, 0, 3, { c: RED, w: 3, anim: aDraw(BAS, 0.8) }));
        g.push(line(G.px(0), G.py(3), G.px(0), G.py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 0.8) }));
        g.push(line(G.px(3), G.py(p(3)), G.px(3), G.py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 0.9) }));
        g.push(line(G.px(0), G.py(0), G.px(3), G.py(0), { c: RED, w: 4, cap: 'butt', anim: aFade(BAS + 1.0) }));
        g.push(`<circle cx="${A(G.px(0))}" cy="${A(G.py(0))}" r="4" fill="${PAPER}" stroke="${RED}" stroke-width="2"${aFade(BAS + 1.1)}/>`);
        g.push(`<circle cx="${A(G.px(3))}" cy="${A(G.py(0))}" r="4" fill="${PAPER}" stroke="${RED}" stroke-width="2"${aFade(BAS + 1.1)}/>`);
        g.push(txt(G.px(1.5), G.py(0) + 30, `0 < ${it('x')} < 3`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.2) }));
        FIG['u10-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: horisontella tangenter där p'(x) = 0 (x = 0 och x = 3)
    {
        const { G, g } = base();
        g.push(line(G.px(-0.9), G.py(3), G.px(0.9), G.py(3), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        g.push(`<circle cx="${A(G.px(0))}" cy="${A(G.py(3))}" r="4" fill="${RED}"${aFade(BAS + 0.2)}/>`);
        g.push(txt(G.px(-0.25), G.py(3.55), `${it('p')}′(0) = 0`, { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.4) }));
        g.push(line(G.px(2.1), G.py(p(3)), G.px(3.9), G.py(p(3)), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS + 0.7) }));
        g.push(`<circle cx="${A(G.px(3))}" cy="${A(G.py(p(3)))}" r="4" fill="${RED}"${aFade(BAS + 0.9)}/>`);
        g.push(txt(G.px(3), G.py(p(3) - 0.75), `${it('p')}′(3) = 0`, { size: 11.5, fill: RED, anim: aFade(BAS + 1.1) }));
        FIG['u10-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 11 — integral av f' ur graf ================= */
(function () {
    const a = 15 / 14, b = -27 / 14;
    const f = x => a * x * x * x + b * x * x + 3;
    function base() {
        const G = graph({ xmin: -2, xmax: 3, ymin: -1, ymax: 5, ux: 38, uy: 36, grid: true, ticks: true });
        const g = G.base.slice();
        g.push(curvePath(G, f, -1.12, 2.18));
        g.push(txt(G.px(0.45), G.py(4.5), fnLab('f'), { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u11'] = svg(G.W, G.H, g.join('')); }
    // s1: punkten (−1, 0) — f(−1) = 0 avläses
    {
        const { G, g } = base();
        g.push(`<circle cx="${A(G.px(-1))}" cy="${A(G.py(0))}" r="4" fill="${RED}"${aFade(BAS)}/>`);
        g.push(txt(G.px(0.32), G.py(0.62), `${it('f')}(${MINUS}1) = 0`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(arrow(G.px(0.26), G.py(0.5), G.px(-0.86), G.py(0.12), { c: RED, w: 1.2, fade: BAS + 0.3, head: 7 }));
        FIG['u11-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: nivålinjen y = 3 → skärning på växande delen vid x ≈ 1,8
    {
        const { G, g } = base();
        g.push(`<circle cx="${A(G.px(-1))}" cy="${A(G.py(0))}" r="4" fill="${RED}"/>`);
        g.push(line(G.px(-1.6), G.py(3), G.px(2.5), G.py(3), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        g.push(txt(G.px(-1.68), G.py(3) + 4, `${it('y')} = 3`, { size: 11.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.2) }));
        g.push(`<circle cx="${A(G.px(1.8))}" cy="${A(G.py(3))}" r="4" fill="${RED}"${aFade(BAS + 0.5)}/>`);
        g.push(line(G.px(1.8), G.py(3), G.px(1.8), G.py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 0.7) }));
        g.push(txt(G.px(1.72), G.py(0.32), `${it('a')} ≈ 1,8`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        FIG['u11-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 15 — område under g ================= */
(function () {
    const g5 = x => 5 + 4 * x - x * x;
    function base(withShade) {
        const G = graph({ xmin: -1.4, xmax: 5.8, ymin: -1.4, ymax: 9.6, ux: 34, uy: 19, grid: false, ticks: false });
        const g = G.base.slice();
        if (withShade) {
            let d = `M ${A(G.px(0))} ${A(G.py(0))} L ${A(G.px(0))} ${A(G.py(5))}`;
            for (let i = 1; i <= 40; i++) { const x = 3 * i / 40; d += ` L ${A(G.px(x))} ${A(G.py(g5(x)))}`; }
            d += ` L ${A(G.px(3))} ${A(G.py(0))} Z`;
            g.push(`<path d="${d}" fill="${SHADE}"/>`);
        }
        g.push(curvePath(G, g5, -1.05, 5.35));
        g.push(line(G.px(3), G.py(-0.9), G.px(3), G.py(9.2), { w: 1.5 }));
        g.push(txt(G.px(3.75), G.py(7.4), fnLab('g'), { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(true); FIG['u15'] = svg(G.W, G.H, g.join('')); }
    // s1: områdets gränser markeras + arean 24
    {
        const { G, g } = base(true);
        g.push(line(G.px(0), G.py(0), G.px(0), G.py(5), { c: RED, w: 2.4, cap: 'butt', anim: aFade(BAS) }));
        g.push(line(G.px(0), G.py(0), G.px(3), G.py(0), { c: RED, w: 2.4, cap: 'butt', anim: aFade(BAS + 0.25) }));
        g.push(line(G.px(3), G.py(0), G.px(3), G.py(g5(3)), { c: RED, w: 2.4, cap: 'butt', anim: aFade(BAS + 0.5) }));
        g.push(curvePath(G, g5, 0, 3, { c: RED, w: 2.6, anim: aDraw(BAS + 0.75, 0.6) }));
        g.push(txt(G.px(1.5), G.py(2.4), 'Area = 24', { size: 13, fill: RED, anim: aFade(BAS + 1.4) }));
        FIG['u15-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 18 — tangent till x³, triangel ================= */
(function () {
    const a = 1.5, a3 = a * a * a; // 3,375
    const f = x => x * x * x;
    const t = x => 6.75 * x - 6.75;
    function base() {
        const G = graph({ xmin: -1.05, xmax: 2.2, ymin: -1.3, ymax: 4.4, ux: 62, uy: 40, grid: false, ticks: false });
        const g = G.base.slice();
        // triangel (skuggad)
        g.push(`<polygon points="${A(G.px(1))},${A(G.py(0))} ${A(G.px(a))},${A(G.py(0))} ${A(G.px(a))},${A(G.py(a3))}" fill="${SHADE}"/>`);
        g.push(curvePath(G, f, -1.02, 1.62));
        // tangent och linjen x = a
        g.push(line(G.px(0.82), G.py(t(0.82)), G.px(2.12), G.py(t(2.12) > 4.3 ? 4.3 : t(2.12)), { w: 1.5 }));
        g.push(line(G.px(a), G.py(-0.9), G.px(a), G.py(4.15), { w: 1.5 }));
        g.push(`<circle cx="${A(G.px(a))}" cy="${A(G.py(a3))}" r="3.2" fill="${INK}"/>`);
        g.push(txt(G.px(-0.12), G.py(2.55), fnLab('f'), { size: 13, anchor: 'end', fill: BLUE }));
        g.push(txt(G.px(a) + 7, G.py(0) + 16, 'a', { size: 12.5, italic: true }));
        return { G, g };
    }
    // klipp tangenten korrekt: t(x)=4,3 → x=(4,3+6,75)/6,75
    { const { G, g } = base(); FIG['u18'] = svg(G.W, G.H, g.join('')); }
    // s1: tangeringspunkten (a, a³)
    {
        const { G, g } = base();
        g.push(`<circle cx="${A(G.px(a))}" cy="${A(G.py(a3))}" r="4.4" fill="${RED}"${aFade(BAS)}/>`);
        g.push(txt(G.px(1.4), G.py(3.98), `(${it('a')}, ${it('a')}³)`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        FIG['u18-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: skärning med x-axeln 2a/3 + bas och höjd måttsätts
    {
        const { G, g } = base();
        g.push(`<circle cx="${A(G.px(1))}" cy="${A(G.py(0))}" r="4" fill="${RED}"${aFade(BAS)}/>`);
        g.push(fracLab(G.px(1) - 20, G.py(0) + 20, `2${it('a')}`, '3', { fill: RED, anim: aFade(BAS + 0.2), w: 16 }));
        // basens måttlinje under x-axeln
        g.push(dim(G.px(1), G.py(-0.62), G.px(a), G.py(-0.62), { c: RED, fade: BAS + 0.6 }));
        g.push(line(G.px(1), G.py(0), G.px(1), G.py(-0.72), { c: RED, w: 1, dash: '3 3', anim: aFade(BAS + 0.6) }));
        g.push(line(G.px(a), G.py(-0.72), G.px(a), G.py(-0.9), { c: RED, w: 1, dash: '3 3', anim: aFade(BAS + 0.6) }));
        g.push(fracLab(G.px(1.25), G.py(-0.62) + 18, it('a'), '3', { fill: RED, anim: aFade(BAS + 0.8), w: 12 }));
        // höjdens måttlinje till höger om x = a
        g.push(dim(G.px(a + 0.22), G.py(0), G.px(a + 0.22), G.py(a3), { c: RED, fade: BAS + 1.1 }));
        g.push(txt(G.px(a + 0.32), G.py(a3 / 2) + 4, `${it('a')}³`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.3) }));
        FIG['u18-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 20 — triangel, areasatsen ================= */
(function () {
    const u = 52; // px per cm
    const rad = a => a * Math.PI / 180;
    // L = vänstra hörnet (42°), B = nedre hörnet (120°), T = toppen (18°)
    const LB = 5.1 * Math.sin(rad(42)) / Math.sin(rad(120)); // sida mot T... nej:
    // sidan LB står mot vinkeln T (18°): LB = 6,6·sin18/sin120 · ... använd
    // sinussatsen med 2R = 6,6/sin120: LB = (6,6/sin120)·sin18
    const twoR = 6.6 / Math.sin(rad(120));
    const lb = twoR * Math.sin(rad(18)); // ≈ 2,355
    const L = { x: 0, y: 0 };
    const dirLB = -25; // grader (matte, y upp)
    const B = { x: lb * Math.cos(rad(dirLB)), y: lb * Math.sin(rad(dirLB)) };
    const T = { x: 6.6 * Math.cos(rad(dirLB + 42)), y: 6.6 * Math.sin(rad(dirLB + 42)) };
    // px-koordinater (y flippas), padding
    const minx = Math.min(L.x, B.x, T.x), maxy = Math.max(L.y, B.y, T.y);
    const P = p => ({ x: 20 + (p.x - minx) * u, y: 30 + (maxy - p.y) * u });
    const Lp = P(L), Bp = P(B), Tp = P(T);
    const angDeg = (from, to) => Math.atan2(-(to.y - from.y), to.x - from.x) * 180 / Math.PI;
    function base(shade) {
        const g = [];
        if (shade) g.push(`<polygon points="${A(Lp.x)},${A(Lp.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Tp.x)},${A(Tp.y)}" fill="${SHADE}"${aFade(BAS + 0.8)}/>`);
        g.push(`<polygon points="${A(Lp.x)},${A(Lp.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Tp.x)},${A(Tp.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        // sidetiketter: 6,6 ovanför LT, 5,1 till höger om TB
        const mLT = { x: (Lp.x + Tp.x) / 2, y: (Lp.y + Tp.y) / 2 };
        const mTB = { x: (Tp.x + Bp.x) / 2, y: (Tp.y + Bp.y) / 2 };
        g.push(txt(mLT.x - 8, mLT.y - 10, '6,6', { size: 12.5 }));
        g.push(txt(mTB.x + 14, mTB.y + 6, '5,1', { size: 12.5, anchor: 'start' }));
        g.push(txt(Tp.x + 40, Lp.y - 14, '(cm)', { size: 12, fill: SOFT }));
        // vinkelbågar: 42° vid L (mellan LB och LT), 120° vid B (mellan BL och BT)
        g.push(angleArc(Lp.x, Lp.y, angDeg(Lp, Bp), angDeg(Lp, Tp), 30, { label: '42°', labelR: 17 }));
        g.push(angleArc(Bp.x, Bp.y, angDeg(Bp, Lp), angDeg(Bp, Tp), 22, { label: '120°', labelR: 15 }));
        return g;
    }
    const W = Math.max(Lp.x, Bp.x, Tp.x) + 78, H = Math.max(Lp.y, Bp.y) + 34;
    FIG['u20'] = svg(W, H, base(false).join(''));
    // s1: tredje vinkeln 18° vid toppen
    {
        const g = base(false);
        g.push(angleArc(Tp.x, Tp.y, angDeg(Tp, Bp), angDeg(Tp, Lp), 44, { c: RED, label: '18°', labelR: 48, anim: aFade(BAS) }));
        FIG['u20-s1'] = svg(W, H, g.join(''));
    }
    // s2: arean skuggas (två sidor + mellanliggande vinkel markerade)
    {
        const g = base(true);
        g.push(line(Lp.x, Lp.y, Tp.x, Tp.y, { c: RED, w: 2.6, cap: 'butt', anim: aFade(BAS) }));
        g.push(line(Tp.x, Tp.y, Bp.x, Bp.y, { c: RED, w: 2.6, cap: 'butt', anim: aFade(BAS + 0.2) }));
        g.push(angleArc(Tp.x, Tp.y, angDeg(Tp, Bp), angDeg(Tp, Lp), 44, { c: RED, label: '18°', labelR: 48, anim: aFade(BAS + 0.4) }));
        FIG['u20-s2'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 24 — triangel ABC med punkt D ================= */
(function () {
    const rad = a => a * Math.PI / 180;
    const AB = 7.7 * Math.sin(rad(39)) / Math.sin(rad(35)); // ≈ 8,45
    // världskoordinater (y upp), AC lutar −8°
    const tilt = -8;
    const Aw = { x: 0, y: 0 };
    const Cw = { x: 7.7 * Math.cos(rad(tilt)), y: 7.7 * Math.sin(rad(tilt)) };
    const Dw = { x: 5.0 * Math.cos(rad(tilt)), y: 5.0 * Math.sin(rad(tilt)) };
    const Bw = { x: AB * Math.cos(rad(tilt - 106)), y: AB * Math.sin(rad(tilt - 106)) };
    const u = 29;
    const minx = Math.min(Aw.x, Bw.x, Cw.x), maxy = Math.max(Aw.y, Cw.y, 0);
    const P = p => ({ x: 26 + (p.x - minx) * u, y: 40 + (maxy - p.y) * u });
    const Ap = P(Aw), Bp = P(Bw), Cp = P(Cw), Dp = P(Dw);
    const angDeg = (from, to) => Math.atan2(-(to.y - from.y), to.x - from.x) * 180 / Math.PI;
    function base() {
        const g = [];
        g.push(`<polygon points="${A(Ap.x)},${A(Ap.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Cp.x)},${A(Cp.y)}" fill="none" stroke="${INK}" stroke-width="2"/>`);
        g.push(line(Bp.x, Bp.y, Dp.x, Dp.y, { w: 2 }));
        [Ap, Bp, Cp, Dp].forEach(p => g.push(`<circle cx="${A(p.x)}" cy="${A(p.y)}" r="2.8" fill="${INK}"/>`));
        g.push(txt(Ap.x - 12, Ap.y - 2, 'A', { size: 13.5, italic: true }));
        g.push(txt(Bp.x - 12, Bp.y + 8, 'B', { size: 13.5, italic: true }));
        g.push(txt(Cp.x + 12, Cp.y + 2, 'C', { size: 13.5, italic: true }));
        g.push(txt(Dp.x + 8, Dp.y + 17, 'D', { size: 13.5, italic: true }));
        // måttlinjer ovanför AC: A–D 5,0 och D–C 2,7
        const off = 22, off2 = 38;
        const n = { x: -Math.sin(rad(-8)), y: -Math.cos(rad(-8)) }; // normal uppåt i px-koordinater
        const lift = (p, o) => ({ x: p.x + n.x * o, y: p.y + n.y * o });
        const a1 = lift(Ap, off), d1 = lift(Dp, off);
        const d2 = lift(Dp, off2 - 22 + off), c2 = lift(Cp, off2 - 22 + off);
        g.push(line(Ap.x, Ap.y - 4, a1.x, a1.y - 4, { w: 1, c: SOFT }));
        g.push(line(Dp.x, Dp.y - 4, d1.x, d1.y - 12, { w: 1, c: SOFT }));
        g.push(line(Cp.x, Cp.y - 4, c2.x, c2.y - 4, { w: 1, c: SOFT }));
        g.push(dim(a1.x, a1.y - 6, d1.x, d1.y - 6, {}));
        g.push(txt((a1.x + d1.x) / 2, (a1.y + d1.y) / 2 - 12, '5,0', { size: 12.5 }));
        g.push(dim(d1.x, d1.y - 6 + 14, c2.x, c2.y - 6 + 14, {}));
        g.push(txt((d1.x + c2.x) / 2 + 6, (d1.y + c2.y) / 2 + 2, '2,7', { size: 12.5 }));
        g.push(txt(Cp.x + 46, Ap.y - 24, '(cm)', { size: 12, fill: SOFT }));
        // vinklar: 106° vid A (mellan AC och AB), 39° vid C (mellan CD och CB)
        g.push(angleArc(Ap.x, Ap.y, angDeg(Ap, Cp), angDeg(Ap, Bp), 22, { label: '106°', labelR: 17 }));
        g.push(angleArc(Cp.x, Cp.y, angDeg(Cp, Ap), angDeg(Cp, Bp), 30, { label: '39°', labelR: 17 }));
        return g;
    }
    const W = Cp.x + 84, H = Bp.y + 30;
    FIG['u24'] = svg(W, H, base().join(''));
    // s1: vinkeln ABC = 35°
    {
        const g = base();
        g.push(angleArc(Bp.x, Bp.y, angDeg(Bp, Ap), angDeg(Bp, Cp), 34, { c: RED, label: '35°', labelR: 16, anim: aFade(BAS) }));
        FIG['u24-s1'] = svg(W, H, g.join(''));
    }
    // s2: sidan AB beräknas med sinussatsen i hela triangeln
    {
        const g = base();
        g.push(angleArc(Bp.x, Bp.y, angDeg(Bp, Ap), angDeg(Bp, Cp), 34, { c: RED, label: '35°', labelR: 16 }));
        g.push(line(Ap.x, Ap.y, Bp.x, Bp.y, { c: RED, w: 2.8, cap: 'butt', anim: aDraw(BAS, 0.5) }));
        const m = { x: (Ap.x + Bp.x) / 2, y: (Ap.y + Bp.y) / 2 };
        g.push(txt(m.x - 10, m.y, `AB ≈ 8,4`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 0.5) }));
        FIG['u24-s2'] = svg(W, H, g.join(''));
    }
    // s3: triangeln ABD — BD söks med cosinussatsen
    {
        const g = base();
        g.push(`<polygon points="${A(Ap.x)},${A(Ap.y)} ${A(Bp.x)},${A(Bp.y)} ${A(Dp.x)},${A(Dp.y)}" fill="${SHADE}"${aFade(BAS)}/>`);
        g.push(line(Ap.x, Ap.y, Bp.x, Bp.y, { c: RED, w: 2.8, cap: 'butt' }));
        const m = { x: (Ap.x + Bp.x) / 2, y: (Ap.y + Bp.y) / 2 };
        g.push(txt(m.x - 10, m.y, `AB ≈ 8,4`, { size: 12, fill: RED, anchor: 'end' }));
        g.push(line(Bp.x, Bp.y, Dp.x, Dp.y, { c: RED, w: 2.8, cap: 'butt', anim: aDraw(BAS + 0.4, 0.5) }));
        const mBD = { x: (Bp.x + Dp.x) / 2, y: (Bp.y + Dp.y) / 2 };
        g.push(txt(mBD.x - 6, mBD.y - 10, 'BD = ?', { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        FIG['u24-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 25 — sekant och tangent till 2^x ================= */
(function () {
    const f = x => Math.pow(2, x);
    const k = 7 / 6;
    const sek = x => k * (x + 1) + 0.5;
    const x0 = Math.log(7 / (6 * Math.LN2)) / Math.LN2; // ≈ 0,7514
    const tan = x => k * (x - x0) + f(x0);
    function base() {
        const G = graph({ xmin: -2.5, xmax: 2.9, ymin: -0.9, ymax: 5.1, ux: 44, uy: 34, grid: false, ticks: false });
        const g = G.base.slice();
        g.push(curvePath(G, sek, -2.15, 2.85, { c: INK, w: 1.5 }));
        g.push(curvePath(G, f, -2.45, 2.32));
        g.push(`<circle cx="${A(G.px(-1))}" cy="${A(G.py(0.5))}" r="3.2" fill="${INK}"/>`);
        g.push(`<circle cx="${A(G.px(2))}" cy="${A(G.py(4))}" r="3.2" fill="${INK}"/>`);
        g.push(txt(G.px(-1.12), G.py(0.95), `(${MINUS}1; 0,5)`, { size: 12, anchor: 'end' }));
        g.push(txt(G.px(1.9), G.py(4.12), '(2, 4)', { size: 12, anchor: 'end' }));
        g.push(txt(G.px(2.42), G.py(2.9), fnLab('f'), { size: 13, anchor: 'start', fill: BLUE }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u25'] = svg(G.W, G.H, g.join('')); }
    // s1: sekantens lutning — Δx och Δy
    {
        const { G, g } = base();
        g.push(line(G.px(-1), G.py(0.5), G.px(2), G.py(0.5), { c: RED, w: 1.6, dash: '4 4', anim: aFade(BAS) }));
        g.push(txt(G.px(0.5), G.py(0.5) + 17, `Δ${it('x')} = 3`, { size: 12, fill: RED, anim: aFade(BAS + 0.3) }));
        g.push(line(G.px(2), G.py(0.5), G.px(2), G.py(4), { c: RED, w: 1.6, dash: '4 4', anim: aFade(BAS + 0.6) }));
        g.push(txt(G.px(2.12), G.py(2.25), `Δ${it('y')} = 3,5`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u25-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: parallell tangent — tangeringspunktens x ≈ 0,75
    {
        const { G, g } = base();
        g.push(curvePath(G, tan, -1.75, 2.85, { c: RED, w: 2, anim: aDraw(BAS, 0.6) }));
        g.push(`<circle cx="${A(G.px(x0))}" cy="${A(G.py(f(x0)))}" r="4" fill="${RED}"${aFade(BAS + 0.6)}/>`);
        g.push(line(G.px(x0), G.py(f(x0)), G.px(x0), G.py(0), { c: RED, w: 1.4, dash: '4 4', anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(x0) - 6, G.py(0) + 17, `${it('x')} ≈ 0,75`, { size: 12, fill: RED, anchor: 'middle', anim: aFade(BAS + 1.1) }));
        FIG['u25-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 26 — parallella tangenter i P och R ================= */
(function () {
    const f = x => (x - 1) * (x - 2) * (x - 3);
    function base() {
        const G = graph({ xmin: -0.25, xmax: 3.8, ymin: -0.8, ymax: 0.8, ux: 92, uy: 100, grid: false, ticks: false, padT: 26 });
        const g = G.base.slice();
        // tangenter (lutning 2 i P respektive R)
        g.push(curvePath(G, x => 2 * (x - 1), 0.62, 1.38, { c: INK, w: 1.4 }));
        g.push(curvePath(G, x => 2 * (x - 3), 2.62, 3.38, { c: INK, w: 1.4 }));
        g.push(curvePath(G, f, -0.2, 3.72));
        [1, 2, 3].forEach(x => g.push(`<circle cx="${A(G.px(x))}" cy="${A(G.py(0))}" r="3.2" fill="${INK}"/>`));
        g.push(txt(G.px(1) + 8, G.py(0) + 18, 'P', { size: 13, italic: true, anchor: 'start' }));
        g.push(txt(G.px(2) - 8, G.py(0) + 18, 'Q', { size: 13, italic: true, anchor: 'end' }));
        g.push(txt(G.px(3) + 8, G.py(0) + 18, 'R', { size: 13, italic: true, anchor: 'start' }));
        g.push(txt(G.px(0.85), 18, `${it('f')}(${it('x')}) = ${it('a')}(${it('x')} ${MINUS} ${it('a')})(${it('x')} ${MINUS} 2${it('a')})(${it('x')} ${MINUS} 3${it('a')})`, { size: 12.5, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u26'] = svg(G.W, G.H, g.join('')); }
    // s1: nollställenas koordinater
    {
        const { G, g } = base();
        [[1, `(${it('a')}, 0)`, 'start', 6], [2, `(2${it('a')}, 0)`, 'end', -6], [3, `(3${it('a')}, 0)`, 'start', 6]].forEach(([x, lab, anchor, dx], i) => {
            g.push(`<circle cx="${A(G.px(x))}" cy="${A(G.py(0))}" r="4" fill="${RED}"${aFade(BAS + i * 0.3)}/>`);
            g.push(txt(G.px(x) + dx, G.py(0) + 36, lab, { size: 12, fill: RED, anchor, anim: aFade(BAS + i * 0.3 + 0.15) }));
        });
        FIG['u26-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 28 — silverplatta med guldtråd ================= */
(function () {
    // platta ritad med proportioner nära optimum (bredd 19,1 × höjd 28,7)
    const s = 6.4; // px per mm
    const wmm = 19.1, hmm = 28.7, off = 8 * s;
    const X = 84, Y = 30, Wp = wmm * s, Hp = hmm * s;
    const wireA = { x: X, y: Y + off }, wireB = { x: X + Wp, y: Y + Hp - off };
    function base() {
        const g = [];
        g.push(`<rect x="${X}" y="${Y}" width="${A(Wp)}" height="${A(Hp)}" fill="rgba(15,22,32,0.07)" stroke="${SOFT}" stroke-width="1.6"/>`);
        g.push(line(wireA.x, wireA.y, wireB.x, wireB.y, { c: GOLD, w: 3, cap: 'butt' }));
        // hänvisning "Guldtråd"
        const mid = { x: (wireA.x + wireB.x) / 2, y: (wireA.y + wireB.y) / 2 };
        g.push(txt(X + Wp + 66, mid.y - 26, 'Guldtråd', { size: 12.5, anchor: 'start' }));
        g.push(arrow(X + Wp + 62, mid.y - 22, mid.x + 14, mid.y - 3, { w: 1.2 }));
        g.push(txt(X + Wp + 66, Y + 6, '(mm)', { size: 12, fill: SOFT, anchor: 'start' }));
        // 8-måtten
        g.push(line(X, Y, X - 26, Y, { w: 1, c: SOFT }));
        g.push(line(wireA.x, wireA.y, X - 26, wireA.y, { w: 1, c: SOFT }));
        g.push(dim(X - 18, Y, X - 18, wireA.y, {}));
        g.push(txt(X - 26, (Y + wireA.y) / 2 + 4, '8', { size: 12, anchor: 'end' }));
        g.push(line(X + Wp, Y + Hp, X + Wp + 26, Y + Hp, { w: 1, c: SOFT }));
        g.push(line(wireB.x, wireB.y, X + Wp + 26, wireB.y, { w: 1, c: SOFT }));
        g.push(dim(X + Wp + 18, wireB.y, X + Wp + 18, Y + Hp, {}));
        g.push(txt(X + Wp + 26, (wireB.y + Y + Hp) / 2 + 4, '8', { size: 12, anchor: 'start' }));
        return g;
    }
    const W = X + Wp + 132, H = Y + Hp + 64;
    FIG['u28'] = svg(W, H, base().join(''));
    // s1: inför variabeln x = plattans höjd; bredden blir 550/x
    {
        const g = base();
        g.push(dim(X - 52, Y, X - 52, Y + Hp, { c: RED, fade: BAS }));
        g.push(line(X, Y, X - 58, Y, { w: 1, c: RED, dash: '3 3', anim: aFade(BAS) }));
        g.push(line(X, Y + Hp, X - 58, Y + Hp, { w: 1, c: RED, dash: '3 3', anim: aFade(BAS) }));
        g.push(txt(X - 60, Y + Hp / 2 + 4, 'x', { size: 13, italic: true, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        g.push(dim(X, Y + Hp + 22, X + Wp, Y + Hp + 22, { c: RED, fade: BAS + 0.6 }));
        g.push(fracLab(X + Wp / 2, Y + Hp + 40, '550', it('x'), { fill: RED, anim: aFade(BAS + 0.9), w: 24 }));
        FIG['u28-s1'] = svg(W, H, g.join(''));
    }
    // s2: rätvinklig triangel — kateterna 550/x och x − 16, hypotenusan L
    {
        const g = base();
        g.push(line(wireA.x, wireA.y, wireB.x, wireA.y, { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        g.push(fracLab(X + Wp / 2, wireA.y - 24, '550', it('x'), { fill: RED, anim: aFade(BAS + 0.3), w: 24 }));
        g.push(line(wireB.x, wireA.y, wireB.x, wireB.y, { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS + 0.6) }));
        g.push(txt(wireB.x + 30, (wireA.y + wireB.y) / 2 + 24, `${it('x')} ${MINUS} 16`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        const mid = { x: (wireA.x + wireB.x) / 2, y: (wireA.y + wireB.y) / 2 };
        g.push(txt(mid.x - 12, mid.y + 22, 'L', { size: 13.5, italic: true, fill: RED, anchor: 'end', anim: aFade(BAS + 1.2) }));
        FIG['u28-s2'] = svg(W, H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 3c VT 2022 (genererade — redigera inte för');
out.push('// hand; generatorn ligger i .claude/np-figs/gen-ma3c-vt2022.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma3c-vt2022'] = {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('};');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma3c-vt2022-figurer.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
