// Generator för data/np/ma4-vt2022-figurer-B.js — NP Matematik 4 VT 2022,
// delprov B (uppgift 1–10). Alla koordinater beräknade, kurvor samplade ur
// sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2022-B.js
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
const GRID2 = 'rgba(15,22,32,0.22)';
const SHADE = 'rgba(15,22,32,0.12)';
const RSHADE = 'rgba(200,50,74,0.16)';
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
const sub = s => `<tspan font-size="0.72em" dy="0.32em">${s}</tspan>`;
const sup = s => `<tspan font-size="0.72em" dy="-0.45em">${s}</tspan>`;

// Pil: butt-cap, skaftet slutar vid huvudets bas.
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

const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.4}" fill="${o.c || INK}"${o.anim || ''}/>`;

// Polylinje ur punkter (tätt samplad), valfri animation.
function poly(pts, o = {}) {
    const d = pts.map((p, i) => (i ? 'L ' : 'M ') + A(p[0]) + ' ' + A(p[1])).join(' ');
    return `<path d="${d}" fill="none" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.4}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.cap ? ` stroke-linecap="${o.cap}"` : '') + (o.anim || '') + '/>';
}

// ---- Koordinatsystem-helper --------------------------------------------
// cfg: xmin,xmax,ymin,ymax (rutnätets utsträckning i världskoordinater),
// gx/gy (rutnätslinjer), ux,uy (px per enhet), xlab/ylab (axeltext),
// xlabItalic, tickX/tickY (tal som får siffra), pad*.
function graph(cfg) {
    const ux = cfg.ux, uy = cfg.uy || cfg.ux;
    const padL = cfg.padL ?? 16, padR = cfg.padR ?? 24, padT = cfg.padT ?? 16, padB = cfg.padB ?? 20;
    const W = padL + (cfg.xmax - cfg.xmin) * ux + padR;
    const H = padT + (cfg.ymax - cfg.ymin) * uy + padB;
    const px = x => padL + (x - cfg.xmin) * ux;
    const py = y => padT + (cfg.ymax - y) * uy;
    const g = [];
    (cfg.gx || []).forEach(x => g.push(line(px(x), py(cfg.ymin), px(x), py(cfg.ymax), { c: cfg.gridC || GRID, w: 1 })));
    (cfg.gy || []).forEach(y => g.push(line(px(cfg.xmin), py(y), px(cfg.xmax), py(y), { c: cfg.gridC || GRID, w: 1 })));
    const ax = py(0), ay = px(0);
    const xEnd = px(cfg.xmax) + (cfg.xOver ?? 8), yEnd = py(cfg.ymax) - (cfg.yOver ?? 8);
    g.push(line(px(cfg.xmin), ax, xEnd, ax, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(xEnd + 6)},${A(ax)} ${A(xEnd - 1)},${A(ax + 4.2)} ${A(xEnd - 1)},${A(ax - 4.2)}" fill="${INK}"/>`);
    g.push(line(ay, py(cfg.ymin), ay, yEnd, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(ay)},${A(yEnd - 6)} ${A(ay + 4.2)},${A(yEnd + 1)} ${A(ay - 4.2)},${A(yEnd + 1)}" fill="${INK}"/>`);
    const xl = cfg.xlab || it('x'), yl = cfg.ylab || it('y');
    g.push(txt(xEnd + 2, ax + 18, xl, { size: 14, anchor: cfg.xlabAnchor || 'middle' }));
    g.push(txt(ay - 8, yEnd + 2, yl, { size: 14, anchor: 'end' }));
    (cfg.tickX || []).forEach(x => {
        g.push(line(px(x), ax - 3, px(x), ax + 3, { w: 1.2 }));
        if ((cfg.noLabX || []).includes(x)) return;
        g.push(txt(px(x) + (cfg.tickXdx || 0), ax + 16, (x < 0 ? MINUS : '') + Math.abs(x), { size: 11.5, fill: SOFT }));
    });
    (cfg.tickY || []).forEach(y => {
        g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
        if ((cfg.noLabY || []).includes(y)) return;
        g.push(txt(ay - 7, py(y) + 4, (y < 0 ? MINUS : '') + Math.abs(y), { size: 11.5, fill: SOFT, anchor: 'end' }));
    });
    return { W, H, px, py, base: g, cfg };
}

// Samplar f(x) och klipper mot y-fönstret; kan ge flera delsegment.
function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || 400;
    const lo = o.ylo ?? G.cfg.ymin, hi = o.yhi ?? G.cfg.ymax;
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

// Löser f(x) = c med bisektion på [a, b] (f monoton där).
function solve(f, c, a, b) {
    let fa = f(a) - c;
    for (let i = 0; i < 80; i++) {
        const m = (a + b) / 2, fm = f(m) - c;
        if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m;
    }
    return (a + b) / 2;
}

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ================= UPPGIFT 3 — y = sin x, punkten P, skiss av sin(x/2) =====
 * Originalet: lodräta rutlinjer var π/2 (x = π/2 … 13π/2), vågräta linjer i
 * y = ±1, inga skalsiffror. Kurvan går från x ≈ −0,85 till x ≈ 21,1.
 * P ligger i x = 6π (tolfte rutlinjen). */
(function () {
    const Q = Math.PI / 2;
    const X0 = -0.87, X1 = 21.15;
    const cfg = {
        xmin: X0, xmax: X1, ymin: -1.38, ymax: 1.45, ux: 24.5, uy: 50,
        gx: Array.from({ length: 13 }, (_, k) => (k + 1) * Q), gy: [-1, 1],
        padL: 30, padR: 26, padT: 40, padB: 26, xOver: 6, yOver: 4,
    };
    function base(o = {}) {
        const G = graph(cfg);
        const g = G.base.slice();
        if (!o.noCurve) {
            g.push(curvePath(G, Math.sin, -0.85, 21.1, { c: o.dashed ? INK : BLUE, w: o.dashed ? 1.5 : 2.2, dash: o.dashed ? '5 4' : null, ylo: -2, yhi: 2 }));
        }
        // kurvetiketten i fri yta ovanför x-axeln mellan topparna (mellan 2π och 2,5π)
        g.push(txt(G.px(3.25 * Math.PI), G.py(1.18), `${it('y')} = sin ${it('x')}`, { size: 13, anchor: 'middle', fill: o.dashed ? INK : BLUE }));
        return { G, g };
    }
    {
        const { G, g } = base();
        g.push(dot(G.px(6 * Math.PI), G.py(0), { r: 3.6 }));
        g.push(txt(G.px(6 * Math.PI) - 8, G.py(0) - 9, it('P'), { size: 14, anchor: 'end' }));
        // Originalets två diagram staplade: a) med P, b) med y = sin x streckad
        const b = base({ dashed: true });
        const GAP = 14;
        const inner = txt(4, 18, 'a)', { size: 13, anchor: 'start', fill: SOFT }) + g.join('') +
            `<g transform="translate(0,${A(G.H + GAP)})">` +
            txt(4, 18, 'b)', { size: 13, anchor: 'start', fill: SOFT }) + b.g.join('') + '</g>';
        FIG['u3'] = svg(G.W, 2 * G.H + GAP, inner);
    }
    // s1 (a): sinus nollställen π, 2π, … 6π (varannan rutlinje); P = 6π
    {
        const { G, g } = base();
        for (let n = 1; n <= 6; n++) {
            const x = n * Math.PI, d = BAS + (n - 1) * 0.3;
            const upp = n % 2 === 0; // kurvan går uppåt genom jämna multipler
            g.push(dot(G.px(x), G.py(0), { r: n === 6 ? 4.4 : 3.4, c: RED, anim: aFade(d) }));
            // etiketten där kurvan inte är: nedanför och åt det håll kurvan ligger över axeln
            g.push(txt(G.px(x) + (upp ? 6 : -6), G.py(0) + 17, `${n === 1 ? '' : n}π`, { size: 12.5, fill: RED, anchor: upp ? 'start' : 'end', anim: aFade(d + 0.1) }));
        }
        g.push(txt(G.px(6 * Math.PI) - 8, G.py(0) - 9, it('P'), { size: 14, anchor: 'end' }));
        FIG['u3-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): hjälpkurvan sin x streckad, sin(x/2) ritas med topp i π, dal i 3π
    {
        const { G, g } = base({ dashed: true });
        const f = x => Math.sin(x / 2);
        g.push(curvePath(G, f, -0.85, 21.1, { c: RED, w: 2.4, ylo: -2, yhi: 2, anim: aDraw(BAS + 0.9, 1.6) }));
        // nyckelpunkterna: nollställen 0, 2π, 4π, 6π; topp π, 5π; dal 3π
        const kp = [[0, 0], [Math.PI, 1], [2 * Math.PI, 0], [3 * Math.PI, -1], [4 * Math.PI, 0], [5 * Math.PI, 1], [6 * Math.PI, 0]];
        kp.forEach(([x, y], i) => g.push(dot(G.px(x), G.py(y), { r: 3.4, c: RED, anim: aFade(BAS + i * 0.1) })));
        // etiketten ovanför rutnätet (fritt), med x/2 som stående bråk
        const yl = G.py(1.45) - 12, xl = G.px(6.6 * Math.PI);
        g.push(txt(xl - 16, yl, `${it('y')} = sin`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 2.4) }));
        g.push(txt(xl - 8, yl - 9, it('x'), { size: 12, fill: RED, anim: aFade(BAS + 2.4) }));
        g.push(line(xl - 14, yl - 4.5, xl - 2, yl - 4.5, { c: RED, w: 1.1, anim: aFade(BAS + 2.4) }));
        g.push(txt(xl - 8, yl + 7.5, '2', { size: 12, fill: RED, anim: aFade(BAS + 2.4) }));
        // perioden 4π som måttklammer under x-axeln (0 till 4π)
        const yy = G.py(-1.25);
        g.push(line(G.px(0), yy, G.px(4 * Math.PI), yy, { c: RED, w: 1.3, anim: aFade(BAS + 2.7) }));
        g.push(line(G.px(0), yy - 5, G.px(0), yy, { c: RED, w: 1.3, anim: aFade(BAS + 2.7) }));
        g.push(line(G.px(4 * Math.PI), yy - 5, G.px(4 * Math.PI), yy, { c: RED, w: 1.3, anim: aFade(BAS + 2.7) }));
        g.push(txt(G.px(1.5 * Math.PI), yy + 15, 'period 4π', { size: 12, fill: RED, anim: aFade(BAS + 2.9) }));
        FIG['u3-s2'] = svg(G.W, G.H + 6, g.join(''));
    }
})();

/* ================= UPPGIFT 4 — asymptoter till y = 3/(x+2) + x − 1 =========
 * Originalet: tomt rutnät x = −6 … 7, y = −6 … 7, bara talen 1 utsatta.
 * Kurvans vänstra gren ligger helt under y ≈ −6,46 (lokal maxpunkt i
 * x = −2 − √3), alltså utanför rutnätet — bara högra grenen syns. */
(function () {
    const f = x => 3 / (x + 2) + x - 1;
    const cfg = {
        xmin: -6.5, xmax: 7.4, ymin: -6.4, ymax: 7.4, ux: 26, uy: 26,
        gx: Array.from({ length: 14 }, (_, k) => k - 6).filter(v => v !== 0),
        gy: Array.from({ length: 14 }, (_, k) => k - 6).filter(v => v !== 0),
        tickX: [1], tickY: [1], padL: 12, padR: 22, padT: 22, padB: 12, xOver: 8, yOver: 6,
    };
    function base() { const G = graph(cfg); return { G, g: G.base.slice() }; }
    { const { G, g } = base(); FIG['u4'] = svg(G.W, G.H, g.join('')); }
    function lodrat(G, g, anim) {
        g.push(line(G.px(-2), G.py(-6.4), G.px(-2), G.py(7.4), { c: RED, w: 1.8, dash: '6 4', anim: aFade(anim) }));
        g.push(txt(G.px(-2) - 6, G.py(6.6), `${it('x')} = ${MINUS}2`, { size: 13, fill: RED, anchor: 'end', anim: aFade(anim + 0.3) }));
    }
    function sned(G, g, anim) {
        const xa = -5.4, xb = 7.4;
        g.push(line(G.px(xa), G.py(xa - 1), G.px(xb), G.py(xb - 1), { c: RED, w: 1.8, dash: '6 4', anim: aFade(anim) }));
        // etiketten under linjen, i fri yta till höger (x ≈ 4,6)
        g.push(txt(G.px(4.3), G.py(2.1), `${it('y')} = ${it('x')} ${MINUS} 1`, { size: 13, fill: RED, anchor: 'start', anim: aFade(anim + 0.3) }));
    }
    // s1: lodrät asymptot x = −2
    { const { G, g } = base(); lodrat(G, g, BAS); FIG['u4-s1'] = svg(G.W, G.H, g.join('')); }
    // s2: + sned asymptot y = x − 1
    { const { G, g } = base(); lodrat(G, g, 0); sned(G, g, BAS); FIG['u4-s2'] = svg(G.W, G.H, g.join('')); }
    // s3: kurvans högra gren ritas mellan asymptoterna
    {
        const { G, g } = base(); lodrat(G, g, 0); sned(G, g, 0);
        const xTop = solve(f, 7.4, -1.999, -0.27); // där grenen går ut i överkant
        const pts = [];
        const N = 500;
        for (let i = 0; i <= N; i++) {
            // tätare nära asymptoten: parametrisera med t^2
            const t = i / N, x = xTop + (7.4 - xTop) * t * t;
            pts.push([G.px(x), G.py(f(x))]);
        }
        g.push(poly(pts, { c: BLUE, w: 2.4, anim: aDraw(BAS, 1.2) }));
        // vänstra grenen ligger under rutnätet: kort notis i tom yta nere till höger
        g.push(txt(G.px(0.6), G.py(-3.9), 'Vänstra grenen ligger under', { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 1.3) }));
        g.push(txt(G.px(0.6), G.py(-3.9) + 14, 'rutnätet: högsta punkten är', { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 1.3) }));
        g.push(txt(G.px(0.6), G.py(-3.9) + 28, `(${MINUS}3,7; ${MINUS}6,5).`, { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 1.3) }));
        FIG['u4-s3'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 7 — komplexa talplanet ============================
 * z1 = −4 + 3i, z2 = 3 − 2i. Rutnät −5 … 5 med alla tal utsatta. */
(function () {
    const cfg = {
        xmin: -5.5, xmax: 5.5, ymin: -5.5, ymax: 5.5, ux: 34, uy: 34,
        gx: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], gy: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
        tickX: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], tickY: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
        tickXdx: -3, xlab: 'Re', ylab: 'Im', xlabAnchor: 'start',
        padL: 14, padR: 40, padT: 24, padB: 14, xOver: 8, yOver: 6,
    };
    function base(o = {}) {
        const G = graph(Object.assign({}, cfg, o));
        const g = G.base.slice();
        g.push(dot(G.px(-4), G.py(3)));
        g.push(txt(G.px(-4) + 7, G.py(3) - 8, `${it('z')}${sub('1')}`, { size: 14, anchor: 'start' }));
        g.push(dot(G.px(3), G.py(-2)));
        g.push(txt(G.px(3) + 7, G.py(-2) - 8, `${it('z')}${sub('2')}`, { size: 14, anchor: 'start' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u7'] = svg(G.W, G.H, g.join('')); }
    // s1 (a): konjugatet = spegling i reella axeln
    {
        const { G, g } = base({ noLabX: [-4] }); // talet −4 skulle hamna på spegellinjen
        g.push(line(G.px(-4), G.py(3) + 5, G.px(-4), G.py(-3) - 5, { c: RED, w: 1.5, dash: '4 4', anim: aFade(BAS) }));
        g.push(dot(G.px(-4), G.py(-3), { r: 4, c: RED, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(-4) + 7, G.py(-3) + 18, `${MINUS}4 ${MINUS} 3${it('i')}`, { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u7-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2 (b): z2 − 1 = 2 − 2i (ett steg åt vänster), visaren och vinkeln −π/4
    {
        const { G, g } = base();
        g.push(arrow(G.px(3) - 4, G.py(-2), G.px(2) + 5, G.py(-2), { c: RED, w: 1.4, head: 7, fade: BAS }));
        g.push(dot(G.px(2), G.py(-2), { r: 4, c: RED, anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(2) - 6, G.py(-2) + 20, `${it('z')}${sub('2')} ${MINUS} 1`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        g.push(line(G.px(0), G.py(0), G.px(2), G.py(-2), { c: RED, w: 2, anim: aDraw(BAS + 1.0, 0.5) }));
        // vinkelbåge från positiva Re-axeln medurs till visaren (−45°)
        const r = 20, cx = G.px(0), cy = G.py(0);
        const p2 = { x: cx + r * Math.cos(Math.PI / 4), y: cy + r * Math.sin(Math.PI / 4) };
        g.push(`<path d="M ${A(cx + r)} ${A(cy)} A ${r} ${r} 0 0 1 ${A(p2.x)} ${A(p2.y)}" fill="none" stroke="${RED}" stroke-width="1.5"${aFade(BAS + 1.5)}/>`);
        // etiketten −π/4 (stående bråk) i vinkelns kil, utanför bågen
        const lx = G.px(1.55), ly = G.py(-0.72);
        g.push(txt(lx - 7, ly + 4, MINUS, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 1.7) }));
        g.push(txt(lx, ly - 4, 'π', { size: 12, fill: RED, anim: aFade(BAS + 1.7) }));
        g.push(line(lx - 6, ly, lx + 6, ly, { c: RED, w: 1.1, anim: aFade(BAS + 1.7) }));
        g.push(txt(lx, ly + 12, '4', { size: 12, fill: RED, anim: aFade(BAS + 1.7) }));
        FIG['u7-s2'] = svg(G.W, G.H, g.join(''));
    }
    // s3 (c): linjen Im z = Re z + 2. Talen −2 och 2 vid axlarna skulle
    // hamna på linjen; de ersätts av röda etiketter för de två
    // lösningarna −2 och 2i i fri yta.
    {
        const { G, g } = base({ noLabX: [-2], noLabY: [2] });
        const xa = -5.5, xb = 3.5;
        g.push(line(G.px(xa), G.py(xa + 2), G.px(xb), G.py(xb + 2), { c: RED, w: 2.4, anim: aDraw(BAS, 0.8) }));
        g.push(dot(G.px(-2), G.py(0), { r: 3.8, c: RED, anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(-2.15), G.py(0) - 8, `${MINUS}2`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.9) }));
        g.push(dot(G.px(0), G.py(2), { r: 3.8, c: RED, anim: aFade(BAS + 1.0) }));
        g.push(txt(G.px(-0.22), G.py(2.28), `2${it('i')}`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 1.1) }));
        g.push(txt(G.px(-1.3), G.py(4.3), `Im ${it('z')} = Re ${it('z')} + 2`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 1.3) }));
        FIG['u7-s3'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 9 — z^10 = 1, tio rötter på enhetscirkeln ======== */
(function () {
    const C = { x: 150, y: 140 }, R = 92;
    const rad = a => a * Math.PI / 180;
    const pt = a => ({ x: C.x + R * Math.cos(rad(a)), y: C.y - R * Math.sin(rad(a)) });
    const g = [];
    g.push(line(C.x - 124, C.y, C.x + 122, C.y, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x + 128)},${A(C.y)} ${A(C.x + 121)},${A(C.y + 4.2)} ${A(C.x + 121)},${A(C.y - 4.2)}" fill="${INK}"/>`);
    g.push(line(C.x, C.y + 120, C.x, C.y - 118, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x)},${A(C.y - 124)} ${A(C.x + 4.2)},${A(C.y - 117)} ${A(C.x - 4.2)},${A(C.y - 117)}" fill="${INK}"/>`);
    g.push(txt(C.x + 124, C.y + 18, 'Re', { size: 13 }));
    g.push(txt(C.x - 8, C.y - 112, 'Im', { size: 13, anchor: 'end' }));
    g.push(`<circle cx="${C.x}" cy="${C.y}" r="${R}" fill="none" stroke="${SOFT}" stroke-width="1.3" stroke-dasharray="4 4"${aFade(BAS)}/>`);
    g.push(txt(C.x + R + 7, C.y + 17, '1', { size: 12, fill: SOFT, anchor: 'start', anim: aFade(BAS) }));
    for (let n = 0; n < 10; n++) {
        const p = pt(36 * n);
        g.push(dot(p.x, p.y, { r: n === 1 ? 4.6 : 3.4, c: n === 1 ? RED : INK, anim: aFade(BAS + 0.4 + n * 0.12) }));
    }
    const p1 = pt(36);
    g.push(line(C.x, C.y, p1.x, p1.y, { c: RED, w: 1.8, anim: aDraw(BAS + 1.8, 0.4) }));
    // vinkelbåge 0 → 36°
    const r = 30, q = { x: C.x + r * Math.cos(rad(36)), y: C.y - r * Math.sin(rad(36)) };
    g.push(`<path d="M ${A(C.x + r)} ${A(C.y)} A ${r} ${r} 0 0 0 ${A(q.x)} ${A(q.y)}" fill="none" stroke="${RED}" stroke-width="1.4"${aFade(BAS + 2.2)}/>`);
    const lr = r + 15, bis = rad(18);
    g.push(txt(C.x + lr * Math.cos(bis) + 2, C.y - lr * Math.sin(bis) + 4, '36°', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 2.3) }));
    g.push(txt(p1.x + 10, p1.y - 8, `${it('z')} = cos 36° + ${it('i')} sin 36°`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 2.5) }));
    FIG['u9-s1'] = svg(420, 270, g.join(''));
})();

/* ================= UPPGIFT 10 — området kring y-axeln =======================
 * y = x^(1/4) från (0, 0) till (16, 2). Området: mellan y-axeln och kurvan,
 * under linjen y = 2. En vågrät skiva på höjden y har radien x = y^4. */
(function () {
    const f = x => Math.pow(x, 0.25);
    const xOf = y => Math.pow(y, 4);
    const cfg = {
        xmin: 0, xmax: 17, ymin: 0, ymax: 2.45, ux: 17, uy: 80,
        gx: [], gy: [], tickX: [16], tickY: [2],
        padL: 30, padR: 26, padT: 22, padB: 24, xOver: 6, yOver: 6,
    };
    function base(o = {}) {
        const G = graph(cfg);
        const g = G.base.slice();
        // området: från (0,0) längs kurvan till (16,2), tillbaka längs y = 2
        let d = `M ${A(G.px(0))} ${A(G.py(0))}`;
        for (let i = 1; i <= 200; i++) { const y = 2 * i / 200; d += ` L ${A(G.px(xOf(y)))} ${A(G.py(y))}`; }
        d += ` L ${A(G.px(0))} ${A(G.py(2))} Z`;
        g.push(`<path d="${d}" fill="${SHADE}"/>`);
        // kurvan samplas i y (x = y^4) — tätt där den är brant
        const pts = [];
        const yEnd = Math.pow(16.9, 0.25);
        for (let i = 0; i <= 300; i++) { const y = yEnd * i / 300; pts.push([G.px(xOf(y)), G.py(y)]); }
        g.push(poly(pts, { c: BLUE, w: 2.2 }));
        g.push(line(G.px(0), G.py(2), G.px(16.8), G.py(2), { w: 1.5 }));
        // y = x^(1/4) med exponenten som litet stående bråk (aldrig snedstreck)
        const lx = G.px(13.2), ly = G.py(1.3);
        g.push(txt(lx, ly, `${it('y')} = ${it('x')}`, { size: 13, fill: BLUE, anchor: 'end' }));
        g.push(txt(lx + 6, ly - 12, '1', { size: 9.5, fill: BLUE }));
        g.push(line(lx + 2, ly - 9, lx + 10, ly - 9, { c: BLUE, w: 0.9 }));
        g.push(txt(lx + 6, ly - 1, '4', { size: 9.5, fill: BLUE }));
        g.push(txt(G.px(4.2), G.py(2) - 7, `${it('y')} = 2`, { size: 12.5, anchor: 'start' }));
        return { G, g };
    }
    // s1: skivan på höjden y — radien är x = y⁴
    {
        const { G, g } = base();
        const yv = 1.55, xv = xOf(yv);
        g.push(`<rect x="${A(G.px(0))}" y="${A(G.py(yv + 0.05))}" width="${A(G.px(xv) - G.px(0))}" height="${A(G.py(yv - 0.05) - G.py(yv + 0.05))}" fill="${RSHADE}" stroke="${RED}" stroke-width="1.2"${aFade(BAS)}/>`);
        g.push(txt(G.px(0) - 7, G.py(yv) + 4, it('y'), { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
        g.push(dot(G.px(xv), G.py(yv), { r: 3.6, c: RED, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(xv) + 10, G.py(yv - 0.38), `radie ${it('x')} = ${it('y')}${sup('4')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u10-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: rotationskroppen — området speglat i y-axeln, skivor som ellipser
    {
        const u = 9.5, vy = 80; // px per enhet i x resp. y
        const ox = 190, oy = 222;
        const X = x => ox + x * u, Y = y => oy - y * vy;
        const g = [];
        // axlar
        g.push(line(X(-18), Y(0), X(18), Y(0), { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(X(18) + 6)},${A(Y(0))} ${A(X(18) - 1)},${A(Y(0) + 4.2)} ${A(X(18) - 1)},${A(Y(0) - 4.2)}" fill="${INK}"/>`);
        g.push(line(X(0), Y(-0.15), X(0), Y(2.55), { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(X(0))},${A(Y(2.55) - 6)} ${A(X(0) + 4.2)},${A(Y(2.55) + 1)} ${A(X(0) - 4.2)},${A(Y(2.55) + 1)}" fill="${INK}"/>`);
        g.push(txt(X(18) + 4, Y(0) + 18, it('x'), { size: 14 }));
        g.push(txt(X(0) - 8, Y(2.55) + 4, it('y'), { size: 14, anchor: 'end' }));
        // kroppens kontur: höger kurva heldragen, vänster spegelbild
        const right = [], left = [];
        for (let i = 0; i <= 300; i++) { const y = 2 * i / 300; right.push([X(xOf(y)), Y(y)]); left.push([X(-xOf(y)), Y(y)]); }
        g.push(poly(right, { c: BLUE, w: 2.2 }));
        g.push(poly(left, { c: BLUE, w: 2.2, anim: aDraw(BAS, 0.8) }));
        // locket y = 2 som ellips, och en skiva på höjden y = 1,55
        const ell = (y, rx, ry, o) => `<ellipse cx="${A(X(0))}" cy="${A(Y(y))}" rx="${A(rx * u)}" ry="${A(ry)}" fill="${o.fill || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 1.4}"${o.anim || ''}/>`;
        g.push(ell(2, 16, 9, { c: INK, w: 1.5, anim: aFade(BAS + 0.8) }));
        const yv = 1.55, rv = xOf(yv);
        g.push(ell(yv, rv, 4.5, { c: RED, w: 1.6, fill: RSHADE, anim: aFade(BAS + 1.2) }));
        g.push(line(X(0), Y(yv), X(rv), Y(yv), { c: RED, w: 1.5, anim: aFade(BAS + 1.4) }));
        g.push(line(X(rv) + 3, Y(yv), X(16) + 6, Y(yv), { c: RED, w: 1, dash: '3 3', anim: aFade(BAS + 1.5) }));
        g.push(txt(X(16) + 10, Y(yv) + 4, `radie ${it('x')} = ${it('y')}${sup('4')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.6) }));
        g.push(txt(X(16) + 10, Y(2) + 4, `${it('y')} = 2`, { size: 12.5, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u10-s2'] = svg(470, 250, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 4 VT 2022, delprov B (genererade — redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2022-B.js,');
out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2022'] = Object.assign(window.NP_FIGURER['ma4-vt2022'] || {}, {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2022-figurer-B.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
