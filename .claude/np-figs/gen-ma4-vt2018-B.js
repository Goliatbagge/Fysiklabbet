// Generator för data/np/ma4-vt2018-figurer-B.js — NP Matematik 4 VT 2018,
// delprov B (uppgift 1–10). Alla koordinater beräknade, kurvor samplade ur
// sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma4-vt2018-B.js
// Konventioner (samma som gen-ma4-vt2022-B.js): ink #0f1620, soft #3f4a5c,
// accent #c8324a (markeringar i lösningssteg), kurvblå #1c3d6b, rutnät
// rgba(15,22,32,0.10). Animationsklasser: anim-draw (heldragna linjer
// ritas), anim-fade (etiketter, streckade linjer, punkter). Basfördröjning
// BAS ger läsaren tid att orientera sig innan animationen startar.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.10)';
const GRID2 = 'rgba(15,22,32,0.30)';
const RSHADE = 'rgba(200,50,74,0.20)';
const BSHADE = 'rgba(28,61,107,0.16)';

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
const sup = s => `<tspan font-size="0.72em" dy="-0.45em">${s}</tspan>`;

const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.4}" fill="${o.c || INK}"${o.anim || ''}/>`;
const ring = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 4}" fill="#f6f1e7" stroke="${o.c || RED}" stroke-width="1.6"${o.anim || ''}/>`;

// Stående bråk som etikett: (xc, ybar) = bråkstrecket mitt, aldrig snedstreck.
function fracLab(xc, ybar, num, den, o = {}) {
    const size = o.size || 12, c = o.fill || INK, an = o.anim || '';
    const w = o.w || Math.max(num.replace(/<[^>]+>/g, '').length, den.replace(/<[^>]+>/g, '').length) * size * 0.58 + 4;
    return `<g${an}>` + txt(xc, ybar - 3.5, num, { size, fill: c }) +
        line(xc - w / 2, ybar, xc + w / 2, ybar, { c, w: 1.1 }) +
        txt(xc, ybar + size - 0.5, den, { size, fill: c }) + '</g>';
}

// Polylinje ur punkter (tätt samplad), valfri animation.
function poly(pts, o = {}) {
    const d = pts.map((p, i) => (i ? 'L ' : 'M ') + A(p[0]) + ' ' + A(p[1])).join(' ');
    return `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.c || BLUE}" stroke-width="${o.w || 2.4}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.join ? ` stroke-linejoin="${o.join}"` : '') + (o.anim || '') + '/>';
}

// ---- Koordinatsystem-helper (som gen-ma4-vt2022-B.js) -------------------
// cfg: xmin,xmax,ymin,ymax, gx/gy (rutnätslinjer), ux,uy (px per enhet),
// xlab/ylab, tickX/tickY (tal som får siffra), noLabX/noLabY,
// labDx/labDy = { värde: [dx, dy] } knuffar enskilda tal.
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
    const ldx = cfg.labDx || {}, ldy = cfg.labDy || {};
    (cfg.tickX || []).forEach(x => {
        g.push(line(px(x), ax - 3, px(x), ax + 3, { w: 1.2 }));
        if ((cfg.noLabX || []).includes(x)) return;
        const d = ldx[x] || [0, 0];
        g.push(txt(px(x) + (cfg.tickXdx || 0) + d[0], ax + 16 + d[1], (x < 0 ? MINUS : '') + Math.abs(x), { size: 11.5, fill: SOFT }));
    });
    (cfg.tickY || []).forEach(y => {
        g.push(line(ay - 3, py(y), ay + 3, py(y), { w: 1.2 }));
        if ((cfg.noLabY || []).includes(y)) return;
        const d = ldy[y] || [0, 0];
        g.push(txt(ay - 7 + d[0], py(y) + 4 + d[1], (y < 0 ? MINUS : '') + Math.abs(y), { size: 11.5, fill: SOFT, anchor: 'end' }));
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

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Vinkelbåge (matematisk vinkel, moturs från a0 till a1 i grader) kring (cx, cy).
function arcDeg(cx, cy, r, a0, a1, o = {}) {
    const rad = a => a * Math.PI / 180;
    const p0 = [cx + r * Math.cos(rad(a0)), cy - r * Math.sin(rad(a0))];
    const p1 = [cx + r * Math.cos(rad(a1)), cy - r * Math.sin(rad(a1))];
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    const sweep = a1 > a0 ? 0 : 1; // moturs i matematisk mening = minskande SVG-vinkel
    return `<path d="M ${A(p0[0])} ${A(p0[1])} A ${r} ${r} 0 ${large} ${sweep} ${A(p1[0])} ${A(p1[1])}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.4}"${o.anim || ''}/>`;
}

// Ett "√x"-uttryck som etikett: rottecken + radikand med rotstreck över.
function sqrtLab(x, y, rad, o = {}) {
    const size = o.size || 12.5, c = o.fill || INK;
    const wR = o.wRad || size * 0.55;
    const x0 = o.anchor === 'end' ? x - (size * 0.62 + wR) : x;
    return `<g${o.anim || ''}>` +
        txt(x0, y, '√', { size, fill: c, anchor: 'start' }) +
        line(x0 + size * 0.56, y - size * 0.86, x0 + size * 0.6 + wR, y - size * 0.86, { c, w: 1 }) +
        txt(x0 + size * 0.6, y, rad, { size, fill: c, anchor: 'start' }) + '</g>';
}

const FIG = {};

/* ================= UPPGIFT 1 — f(x) = 1 + 2 sin 3x ======================
 * Steg b): grafen över drygt en period, minsta värdet −1 i minimipunkterna
 * x = π/2 och x = 7π/6, perioden 2π/3 mellan dem. */
(function () {
    const f = x => 1 + 2 * Math.sin(3 * x);
    const cfg = {
        xmin: -0.15, xmax: 4.05, ymin: -1.6, ymax: 3.6, ux: 80, uy: 34,
        gx: [], gy: [-1, 1, 2, 3], tickY: [-1, 1, 2, 3], noLabY: [-1],
        padL: 28, padR: 26, padT: 22, padB: 50, xOver: 6, yOver: 6,
    };
    const G = graph(cfg);
    const g = G.base.slice();
    g.push(curvePath(G, f, 0, 4.0, { n: 600, anim: aDraw(BAS, 1.2) }));
    g.push(txt(G.px(0.62), G.py(3.25), `${it('y')} = 1 + 2 sin 3${it('x')}`, { size: 13, anchor: 'start', fill: BLUE, anim: aFade(BAS + 0.6) }));
    // minsta värdet: streckad linje y = −1 och minimipunkterna
    g.push(line(G.px(-0.05), G.py(-1), G.px(4.0), G.py(-1), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 1.4) }));
    const m1 = Math.PI / 2, m2 = 7 * Math.PI / 6;
    [m1, m2].forEach((x, i) => g.push(dot(G.px(x), G.py(-1), { r: 3.8, c: RED, anim: aFade(BAS + 1.6 + 0.15 * i) })));
    g.push(txt(G.px(0) - 7, G.py(-1) + 4, `${MINUS}1`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 1.7) }));
    // perioden: måttlinje mellan minimipunkterna under kurvan
    const yy = G.py(-1) + 18;
    g.push(line(G.px(m1), yy, G.px(m2), yy, { c: RED, w: 1.3, anim: aFade(BAS + 2.0) }));
    g.push(line(G.px(m1), yy - 5, G.px(m1), yy + 5, { c: RED, w: 1.3, anim: aFade(BAS + 2.0) }));
    g.push(line(G.px(m2), yy - 5, G.px(m2), yy + 5, { c: RED, w: 1.3, anim: aFade(BAS + 2.0) }));
    const xm = (G.px(m1) + G.px(m2)) / 2;
    g.push(txt(xm - 4, yy + 21, 'perioden', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 2.2) }));
    g.push(fracLab(xm + 16, yy + 17, '2π', '3', { size: 12, fill: RED, anim: aFade(BAS + 2.2) }));
    FIG['u1-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 2 — integral ur grafen =========================
 * Originalet: rutnät x = −4 … 4, y = −2 … 3. Grafen är styckvis linjär:
 * (−4,5; 1) → (−3; −2) → (−1; 2) → (2; 2) → (4,35; −0,35). */
(function () {
    const P = [[-4.5, 1], [-3, -2], [-1, 2], [2, 2], [4.35, -0.35]];
    const cfg = {
        xmin: -4.5, xmax: 4.5, ymin: -2.5, ymax: 3.5, ux: 38, uy: 38,
        gx: [-4, -3, -2, -1, 1, 2, 3, 4], gy: [-2, -1, 1, 2, 3],
        tickX: [-4, -3, -2, -1, 1, 2, 3, 4], tickY: [-2, -1, 1, 2, 3],
        // talen där grafen korsar x-axeln flyttas till den sida där grafen
        // ligger ovanför axeln; "2" på y-axeln lyfts över den vågräta delen
        labDx: { '-4': [-9, 0], '-2': [9, 0], '4': [-9, 0] }, labDy: { '2': [0, -7] },
        padL: 16, padR: 24, padT: 22, padB: 12, xOver: 8, yOver: 6,
    };
    function base(o = {}) {
        const G = graph(Object.assign({}, cfg, o));
        const g = G.base.slice();
        return { G, g };
    }
    function kurva(G) { return poly(P.map(p => [G.px(p[0]), G.py(p[1])]), { c: INK, w: 2, join: 'miter' }); }
    function etikett(G) { return txt(G.px(1.2), G.py(2.42), `${it('y')} = ${it('f')}(${it('x')})`, { size: 13, anchor: 'start' }); }
    {
        const { G, g } = base();
        g.push(kurva(G), etikett(G));
        FIG['u2'] = svg(G.W, G.H, g.join(''));
    }
    // s1: integrationsgränserna och de tre delområdena
    {
        const { G, g } = base({ noLabY: [1], labDx: { '-4': [-9, 0], '-3': [-12, 0], '-2': [9, 0], '4': [-9, 0] } });
        const reg = (pts, fill, d) => `<path d="${pts.map((p, i) => (i ? 'L ' : 'M ') + A(G.px(p[0])) + ' ' + A(G.py(p[1]))).join(' ')} Z" fill="${fill}"${aFade(d)}/>`;
        g.push(line(G.px(-3), G.py(-2.5), G.px(-3), G.py(3.3), { c: RED, w: 1.3, dash: '5 4', anim: aFade(BAS) }));
        g.push(reg([[-3, 0], [-3, -2], [-2, 0]], RSHADE, BAS + 0.4));
        g.push(reg([[-2, 0], [-1, 2], [-1, 0]], BSHADE, BAS + 0.8));
        g.push(reg([[-1, 0], [-1, 2], [0, 2], [0, 0]], BSHADE, BAS + 1.2));
        g.push(kurva(G), etikett(G));
        g.push(txt(G.px(-2.68), G.py(-0.85), `${MINUS}1`, { size: 13, fill: RED, anim: aFade(BAS + 1.6) }));
        g.push(txt(G.px(-1.32), G.py(0.55), '+1', { size: 13, fill: BLUE, anim: aFade(BAS + 1.8) }));
        g.push(txt(G.px(-0.5), G.py(0.85), '+2', { size: 13, fill: BLUE, anim: aFade(BAS + 2.0) }));
        FIG['u2-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 3 — argumentet för z och z⁵ ====================
 * z har beloppet 2 och argumentet π/6 (30°). z⁵ har argumentet 5π/6
 * (150°). Beloppet 32 ryms inte i figuren, så z⁵ visas som en riktning. */
(function () {
    const C = { x: 190, y: 150 }, U = 46;
    const rad = a => a * Math.PI / 180;
    const pt = (r, a) => ({ x: C.x + r * Math.cos(rad(a)), y: C.y - r * Math.sin(rad(a)) });
    const g = [];
    g.push(line(C.x - 170, C.y, C.x + 156, C.y, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x + 162)},${A(C.y)} ${A(C.x + 155)},${A(C.y + 4.2)} ${A(C.x + 155)},${A(C.y - 4.2)}" fill="${INK}"/>`);
    g.push(line(C.x, C.y + 30, C.x, C.y - 132, { w: 1.5, cap: 'butt' }));
    g.push(`<polygon points="${A(C.x)},${A(C.y - 138)} ${A(C.x + 4.2)},${A(C.y - 131)} ${A(C.x - 4.2)},${A(C.y - 131)}" fill="${INK}"/>`);
    g.push(txt(C.x + 160, C.y + 18, 'Re', { size: 13 }));
    g.push(txt(C.x - 8, C.y - 126, 'Im', { size: 13, anchor: 'end' }));
    // z: visaren med längden 2
    const z = pt(2 * U, 30);
    g.push(line(C.x, C.y, z.x, z.y, { c: BLUE, w: 2.2 }));
    g.push(dot(z.x, z.y, { c: BLUE }));
    g.push(txt(z.x + 8, z.y - 4, it('z'), { size: 14, fill: BLUE, anchor: 'start' }));
    g.push(arcDeg(C.x, C.y, 30, 0, 30, { c: BLUE, w: 1.4, anim: aFade(BAS) }));
    // π/6 i vinkelns kil, utanför bågen
    const l1 = pt(52, 15);
    g.push(fracLab(l1.x + 6, l1.y + 2, 'π', '6', { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.2) }));
    // z⁵: riktningen 150°, streckad halvlinje
    const e = pt(150, 150);
    g.push(line(C.x, C.y, e.x, e.y, { c: RED, w: 2, dash: '6 4', anim: aFade(BAS + 0.8) }));
    g.push(arcDeg(C.x, C.y, 22, 0, 150, { c: RED, w: 1.5, anim: aFade(BAS + 1.2) }));
    const l2 = pt(48, 124);
    g.push(fracLab(l2.x, l2.y, '5π', '6', { size: 11.5, fill: RED, anim: aFade(BAS + 1.4) }));
    g.push(txt(e.x + 2, e.y - 10, `riktningen för ${it('z')}${sup('5')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.6) }));
    FIG['u3-s1'] = svg(372, 196, g.join(''));
})();

/* ================= UPPGIFT 4 — exakta värden i enhetscirkeln ============== */
(function () {
    const C = { x: 170, y: 140 }, R = 100;
    const rad = a => a * Math.PI / 180;
    const pt = (r, a) => ({ x: C.x + r * Math.cos(rad(a)), y: C.y - r * Math.sin(rad(a)) });
    function base() {
        const g = [];
        g.push(`<circle cx="${C.x}" cy="${C.y}" r="${R}" fill="none" stroke="${SOFT}" stroke-width="1.3"/>`);
        g.push(line(C.x - 130, C.y, C.x + 132, C.y, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(C.x + 138)},${A(C.y)} ${A(C.x + 131)},${A(C.y + 4.2)} ${A(C.x + 131)},${A(C.y - 4.2)}" fill="${INK}"/>`);
        g.push(line(C.x, C.y + 128, C.x, C.y - 126, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(C.x)},${A(C.y - 132)} ${A(C.x + 4.2)},${A(C.y - 125)} ${A(C.x - 4.2)},${A(C.y - 125)}" fill="${INK}"/>`);
        g.push(txt(C.x + 136, C.y + 18, it('x'), { size: 14 }));
        g.push(txt(C.x - 8, C.y - 120, it('y'), { size: 14, anchor: 'end' }));
        g.push(txt(C.x + R + 5, C.y + 16, '1', { size: 12, fill: SOFT, anchor: 'start' }));
        return g;
    }
    // s1 (a): 390° = ett helt varv + 30°. Spiralbåge, punkten vid 30°,
    // x-koordinaten är cosinusvärdet.
    {
        const g = base();
        const sp = [];
        for (let i = 0; i <= 260; i++) {
            const a = 390 * i / 260, r = 20 + 16 * i / 260;
            sp.push([C.x + r * Math.cos(rad(a)), C.y - r * Math.sin(rad(a))]);
        }
        g.push(poly(sp, { c: RED, w: 1.5, anim: aDraw(BAS, 1.4) }));
        // pilspets vid spiralens slut (riktning moturs)
        const pe = sp[sp.length - 1], pq = sp[sp.length - 6];
        const ux = pe[0] - pq[0], uy = pe[1] - pq[1], L = Math.hypot(ux, uy);
        const dx = ux / L, dy = uy / L, h = 7;
        g.push(`<polygon points="${A(pe[0] + dx * 3)},${A(pe[1] + dy * 3)} ${A(pe[0] - dx * h - dy * 3.4)},${A(pe[1] - dy * h + dx * 3.4)} ${A(pe[0] - dx * h + dy * 3.4)},${A(pe[1] - dy * h - dx * 3.4)}" fill="${RED}"${aFade(BAS + 1.4)}/>`);
        const P = pt(R, 30);
        g.push(line(C.x, C.y, P.x, P.y, { c: INK, w: 1.8, anim: aDraw(BAS + 1.5, 0.4) }));
        g.push(dot(P.x, P.y, { r: 4, c: RED, anim: aFade(BAS + 1.8) }));
        g.push(txt(P.x + 8, P.y - 6, '390° = 360° + 30°', { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.9) }));
        // x-koordinaten: lod ned till x-axeln och sträckan längs axeln
        g.push(line(P.x, P.y, P.x, C.y, { c: BLUE, w: 1.3, dash: '4 3', anim: aFade(BAS + 2.3) }));
        g.push(line(C.x, C.y + 1, P.x, C.y + 1, { c: BLUE, w: 3, anim: aDraw(BAS + 2.5, 0.5) }));
        g.push(txt(C.x + 46, C.y + 40, 'cos 390°', { size: 12.5, fill: BLUE, anim: aFade(BAS + 2.9) }));
        g.push(txt(C.x + 46, C.y + 57, '= cos 30°', { size: 12.5, fill: BLUE, anim: aFade(BAS + 2.9) }));
        g.push(line(C.x + 43, C.y + 6, C.x + 45, C.y + 27, { c: BLUE, w: 1, anim: aFade(BAS + 2.9) }));
        FIG['u4-s1'] = svg(372, 278, g.join(''));
    }
    // s2 (b): 210° = 180° + 30°; punkten mitt emot 30°-punkten,
    // y-koordinaterna lika stora med olika tecken.
    {
        const g = base();
        const P = pt(R, 210), Q = pt(R, 30);
        g.push(line(Q.x, Q.y, P.x, P.y, { c: SOFT, w: 1.2, dash: '4 4', anim: aFade(BAS) }));
        g.push(dot(Q.x, Q.y, { r: 3.6, c: BLUE, anim: aFade(BAS) }));
        g.push(arcDeg(C.x, C.y, 24, 0, 30, { c: BLUE, w: 1.4, anim: aFade(BAS + 0.2) }));
        g.push(txt(C.x + 44, C.y - 7, '30°', { size: 12, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(line(C.x, C.y, P.x, P.y, { c: INK, w: 1.8, anim: aDraw(BAS + 0.7, 0.4) }));
        g.push(arcDeg(C.x, C.y, 32, 0, 210, { c: RED, w: 1.4, anim: aFade(BAS + 1.0) }));
        g.push(txt(C.x - 4, C.y - 40, '210°', { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 1.1) }));
        g.push(dot(P.x, P.y, { r: 4, c: RED, anim: aFade(BAS + 1.2) }));
        // y-koordinaterna som lodräta sträckor från x-axeln
        g.push(line(Q.x, C.y, Q.x, Q.y, { c: BLUE, w: 3, anim: aDraw(BAS + 1.6, 0.4) }));
        g.push(txt(C.x + R + 6, (C.y + Q.y) / 2 + 4, 'sin 30°', { size: 12.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.9) }));
        g.push(line(P.x, C.y, P.x, P.y, { c: RED, w: 3, anim: aDraw(BAS + 2.2, 0.4) }));
        g.push(txt(C.x - R - 6, (C.y + P.y) / 2 + 4, 'sin 210°', { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 2.5) }));
        FIG['u4-s2'] = svg(372, 278, g.join(''));
    }
})();

/* ================= UPPGIFT 5 — vilken kurva är y = x·|x|? ==================
 * Originalet: sex små axelkors utan rutnät och skala, 2 × 3. */
(function () {
    function panel(fn, o = {}) {
        const G = graph({ xmin: -1.25, xmax: 1.25, ymin: -1.25, ymax: 1.25, ux: 50, uy: 50,
            padL: 8, padR: 20, padT: 14, padB: 8, xOver: 8, yOver: 4 });
        const g = G.base.slice();
        (o.pieces || [[-1.2, 1.2]]).forEach(([a, b]) => g.push(curvePath(G, fn, a, b, { c: INK, w: 1.8, n: 300, ylo: -1.25, yhi: 1.25 })));
        return { G, inner: g.join('') };
    }
    const alts = [
        ['A', panel(x => Math.abs(x))],
        ['B', panel(x => x * x, { pieces: [[-1.05, 1.05]] })],
        ['C', panel(x => x * Math.abs(x), { pieces: [[-1.05, 1.05]] })],
        ['D', panel(x => x > 0 ? 0.18 : -0.18, { pieces: [[-1.2, -0.0001], [0.0001, 1.2]] })],
        ['E', panel(x => 1.03 * Math.sqrt(x), { pieces: [[0, 0.9]] })],
        ['F', panel(x => x, { pieces: [[-1.2, 1.2]] })],
    ];
    // 3 kolumner × 2 rader: bred och låg, så att panelerna blir stora när
    // np.html skalar figuren efter rutans höjd (originalet: 2 × 3)
    const W0 = alts[0][1].G.W, H0 = alts[0][1].G.H, GAP = 26, RG = 18;
    const parts = [];
    alts.forEach(([L, p], i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const ox = col * (W0 + 14 + GAP), oy = row * (H0 + RG);
        parts.push(txt(ox + 2, oy + 14, L + '.', { size: 13, anchor: 'start' }));
        parts.push(`<g transform="translate(${A(ox + 14)},${A(oy + 10)})">${p.inner}</g>`);
    });
    FIG['u5'] = svg(3 * (W0 + 14) + 2 * GAP, 2 * H0 + RG + 10, parts.join(''));

    // Stegfigurerna: kurvan y = x·|x| i större skala, halva för halva.
    function big(halvor) {
        const G = graph({ xmin: -1.4, xmax: 1.4, ymin: -1.4, ymax: 1.4, ux: 95, uy: 95,
            gx: [-1, 1], gy: [-1, 1], tickX: [-1, 1], tickY: [-1, 1],
            labDx: { '1': [-8, 0], '-1': [0, -22] }, labDy: { '-1': [0, -2] },
            padL: 20, padR: 26, padT: 18, padB: 14, xOver: 8, yOver: 6 });
        const g = G.base.slice();
        if (halvor.includes('h')) {
            const d = halvor === 'h' ? BAS : 0;
            g.push(curvePath(G, x => x * x, 0, 1.18, { c: RED, w: 2.4, anim: halvor === 'h' ? aDraw(d, 0.8) : '' }));
            // under kurvhalvan i första kvadranten, två rader
            const an = halvor === 'h' ? aFade(d + 0.8) : '';
            g.push(txt(G.px(0.72), G.py(0.27), `${it('y')} = ${it('x')}${sup('2')}`, { size: 13, fill: RED, anchor: 'start', anim: an }));
            g.push(txt(G.px(0.72), G.py(0.09), `då ${it('x')} ≥ 0`, { size: 13, fill: RED, anchor: 'start', anim: an }));
        }
        if (halvor.includes('v')) {
            g.push(curvePath(G, x => -x * x, -1.18, 0, { c: RED, w: 2.4, anim: aDraw(BAS, 0.8) }));
            // ovanför kurvhalvan i tredje kvadranten, två rader
            g.push(txt(G.px(-0.72), G.py(-0.2), `${it('y')} = ${MINUS}${it('x')}${sup('2')}`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
            g.push(txt(G.px(-0.72), G.py(-0.38), `då ${it('x')} &lt; 0`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        }
        return svg(G.W, G.H, g.join(''));
    }
    FIG['u5-s1'] = big('h');
    FIG['u5-s2'] = big('hv');
})();

/* ================= UPPGIFT 6 — kurvan y = x/(x − 1) och dess asymptoter === */
(function () {
    const f = x => x / (x - 1);
    const cfg = {
        xmin: -3.5, xmax: 5.5, ymin: -3.5, ymax: 5.5, ux: 30, uy: 30,
        gx: [-3, -2, -1, 1, 2, 3, 4, 5], gy: [-3, -2, -1, 1, 2, 3, 4, 5],
        tickX: [-3, -2, -1, 1, 2, 3, 4, 5], tickY: [-3, -2, -1, 1, 2, 3, 4, 5],
        noLabX: [-3, -1, 1, 3, 5], noLabY: [-3, -1, 1, 3, 5],
        padL: 16, padR: 24, padT: 22, padB: 12, xOver: 8, yOver: 6,
    };
    const G = graph(cfg);
    const g = G.base.slice();
    g.push(line(G.px(1), G.py(-3.5), G.px(1), G.py(5.5), { c: RED, w: 1.8, dash: '6 4', anim: aFade(BAS) }));
    g.push(txt(G.px(1) + 6, G.py(-2.8), `${it('x')} = 1`, { size: 13, fill: RED, anchor: 'start', anim: aFade(BAS + 0.2) }));
    g.push(line(G.px(-3.5), G.py(1), G.px(5.5), G.py(1), { c: RED, w: 1.8, dash: '6 4', anim: aFade(BAS + 0.5) }));
    g.push(txt(G.px(5.3), G.py(0.55), `${it('y')} = 1`, { size: 13, fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
    // grenarna: tätare sampling nära asymptoten
    const left = [], right = [];
    for (let i = 0; i <= 300; i++) {
        const t = i / 300;
        const xl = -3.5 + (1 - 1e-9 - (-3.5)) * (1 - (1 - t) * (1 - t));
        const yl = f(xl);
        if (yl >= -3.5) left.push([G.px(xl), G.py(yl)]);
        const xr = 1 + 4.5 * t * t + 1e-9;
        const yr = f(xr);
        if (yr <= 5.5) right.push([G.px(xr), G.py(yr)]);
    }
    g.push(poly(left, { c: BLUE, w: 2.4, anim: aDraw(BAS + 1.0, 0.9) }));
    g.push(poly(right, { c: BLUE, w: 2.4, anim: aDraw(BAS + 1.0, 0.9) }));
    g.push(txt(G.px(2.15), G.py(3.6), `${it('y')} =`, { size: 13, fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.9) }));
    g.push(fracLab(G.px(3.55), G.py(3.6) - 4.5, it('x'), `${it('x')} ${MINUS} 1`, { size: 12.5, fill: BLUE, w: 40, anim: aFade(BAS + 1.9) }));
    FIG['u6-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 7 — rötterna z = (3 + a) − ai =================
 * Alla rötter ligger på linjen Im z = 3 − Re z. Första kvadranten: den
 * öppna sträckan mellan 3i (a = −3) och 3 (a = 0). */
(function () {
    const cfg = {
        xmin: -1.5, xmax: 5.5, ymin: -2.5, ymax: 4.5, ux: 34, uy: 34,
        gx: [-1, 1, 2, 3, 4, 5], gy: [-2, -1, 1, 2, 3, 4],
        tickX: [-1, 1, 2, 3, 4, 5], tickY: [-2, -1, 1, 2, 3, 4],
        xlab: 'Re', ylab: 'Im', xlabAnchor: 'start', noLabY: [-1],
        labDx: { '3': [-7, 0] }, labDy: { '3': [0, 4] },
        padL: 16, padR: 40, padT: 24, padB: 14, xOver: 8, yOver: 6,
    };
    const G = graph(cfg);
    const g = G.base.slice();
    // hela linjen (alla reella a) tunt streckad
    g.push(line(G.px(-1.5), G.py(4.5), G.px(5.5), G.py(-2.5), { c: SOFT, w: 1.3, dash: '5 4', anim: aFade(BAS) }));
    // sträckan i första kvadranten
    g.push(line(G.px(0), G.py(3), G.px(3), G.py(0), { c: RED, w: 3, anim: aDraw(BAS + 0.6, 0.6) }));
    g.push(ring(G.px(0), G.py(3), { anim: aFade(BAS + 1.2) }));
    g.push(ring(G.px(3), G.py(0), { anim: aFade(BAS + 1.3) }));
    g.push(txt(G.px(0.22), G.py(3.32), `${it('a')} = ${MINUS}3`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.5) }));
    g.push(txt(G.px(3.2), G.py(0.32), `${it('a')} = 0`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.6) }));
    // ett exempel: a = −1 ger z = 2 + i
    g.push(dot(G.px(2), G.py(1), { r: 3.6, c: RED, anim: aFade(BAS + 1.9) }));
    g.push(txt(G.px(1.85), G.py(0.62), `${it('a')} = ${MINUS}1`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 2.0) }));
    FIG['u7-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 9 — fyra sammansatta funktioner ================
 * f(x) = √x, g(x) = cos x. Samma skala i alla fyra: 3,33 px per enhet i
 * x-led, 10 px per enhet i y-led, x upp till 66. A = cos √x, B = √(cos x),
 * C = √x · cos x, D = √x + cos x (originalets ordning). */
(function () {
    const UX = 3.33, UY = 10, XM = 66;
    const fA = x => Math.cos(Math.sqrt(x));
    const fC = x => Math.sqrt(x) * Math.cos(x);
    const fD = x => Math.sqrt(x) + Math.cos(x);
    function bPts(G, x0, x1) {
        // √(cos x): en båge per intervall där cos x ≥ 0, tätt mot ändarna
        const segs = [];
        for (let k = -3; k <= 11; k++) {
            const c = 2 * Math.PI * k, a = Math.max(x0, c - Math.PI / 2), b = Math.min(x1, c + Math.PI / 2);
            if (b <= a) continue;
            const pts = [];
            for (let i = 0; i <= 120; i++) {
                const s = -Math.PI / 2 + Math.PI * i / 120;
                const x = c + (Math.PI / 2) * Math.sin(s);
                if (x < a - 1e-9 || x > b + 1e-9) continue;
                pts.push([G.px(x), G.py(Math.sqrt(Math.max(0, Math.cos(x))))]);
            }
            if (pts.length > 1) segs.push(pts);
        }
        return segs;
    }
    function panel(key, o = {}) {
        const xmin = key === 'B' ? -13.5 : -4;
        const G = graph({ xmin, xmax: XM + 2, ymin: -9.5, ymax: 10.5, ux: UX, uy: UY,
            padL: 10, padR: 22, padT: 14, padB: 8, xOver: 8, yOver: 4 });
        const g = G.base.slice();
        const col = o.c || INK, w = o.w || 1.6, an = o.anim || '';
        if (o.extra) g.push(...o.extra(G));
        if (key === 'A') g.push(curvePath(G, fA, 0, XM, { c: col, w, n: 600, anim: an }));
        if (key === 'C') g.push(curvePath(G, fC, 0, XM, { c: col, w, n: 3000, ylo: -20, yhi: 20, anim: an }));
        if (key === 'D') g.push(curvePath(G, fD, 0, XM, { c: col, w, n: 2000, anim: an }));
        if (key === 'B') bPts(G, -13, XM).forEach(p => g.push(poly(p, { c: col, w, anim: an })));
        if (o.after) g.push(...o.after(G));
        return { G, inner: g.join('') };
    }
    const keys = ['A', 'B', 'C', 'D'];
    {
        const ps = keys.map(k => panel(k));
        // 2 × 2 med täta mellanrum. Uppmätt i uppgiftsrutan (1290×730):
        // en rad A–D gav ~93 px breda och bara 70 px höga grafer, 2 × 2
        // ger större grafer eftersom rutan begränsas av både bredd och höjd.
        const W0 = Math.max(...ps.map(p => p.G.W)), H0 = ps[0].G.H, GAP = 12, RG = 8;
        const parts = [];
        ps.forEach((p, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const ox = col * (W0 + 14 + GAP), oy = row * (H0 + RG);
            parts.push(txt(ox + 2, oy + 14, keys[i] + '.', { size: 13, anchor: 'start' }));
            parts.push(`<g transform="translate(${A(ox + 14)},${A(oy + 10)})">${p.inner}</g>`);
        });
        FIG['u9'] = svg(2 * (W0 + 14) + GAP, 2 * H0 + RG + 10, parts.join(''));
    }
    function stegFig(key, o) {
        const p = panel(key, o);
        const parts = [txt(2, 14, key + '.', { size: 13, anchor: 'start' }),
            `<g transform="translate(14,10)">${p.inner}</g>`];
        return svg(p.G.W + 14 + (o.padExtra || 0), p.G.H + 10, parts.join(''));
    }
    const sq = x => Math.sqrt(x);
    // s1: f + g = D — svänger kring y = √x (streckad)
    FIG['u9-s1'] = stegFig('D', {
        c: RED, w: 1.8, anim: aDraw(BAS + 0.6, 1.4),
        extra: G => [curvePath(G, sq, 0, XM, { c: BLUE, w: 1.4, dash: '5 4', anim: aFade(BAS) })],
        after: G => [sqrtLab(G.px(36), G.py(3.4), it('x'), { fill: BLUE, anim: aFade(BAS + 0.2), wRad: 7 }),
            txt(G.px(36) - 4, G.py(3.4), `${it('y')} =`, { size: 12.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.2) })],
    });
    // s2: f · g = C — innesluten mellan y = √x och y = −√x
    FIG['u9-s2'] = stegFig('C', {
        c: RED, w: 1.6, anim: aDraw(BAS + 0.6, 1.6),
        extra: G => [curvePath(G, sq, 0, XM, { c: BLUE, w: 1.4, dash: '5 4', anim: aFade(BAS) }),
            curvePath(G, x => -sq(x), 0, XM, { c: BLUE, w: 1.4, dash: '5 4', anim: aFade(BAS) })],
    });
    // s3: f(g(x)) = B — finns bara där cos x ≥ 0 (cos x streckad)
    FIG['u9-s3'] = stegFig('B', {
        c: RED, w: 1.8, anim: aFade(BAS + 0.7),
        extra: G => [curvePath(G, Math.cos, -13, XM, { c: BLUE, w: 1.3, dash: '4 3', n: 1500, anim: aFade(BAS) })],
        after: G => [txt(G.px(30), G.py(-3.6), `${it('y')} = cos ${it('x')}`, { size: 12.5, fill: BLUE, anim: aFade(BAS + 0.2) })],
    });
    // s4: g(f(x)) = A — börjar i (0, 1) och svänger allt långsammare
    FIG['u9-s4'] = stegFig('A', {
        c: RED, w: 2, anim: aDraw(BAS + 0.3, 1.2),
        after: G => [dot(G.px(0), G.py(1), { r: 3.4, c: RED, anim: aFade(BAS + 1.5) }),
            txt(G.px(1.5), G.py(3.2), '(0, 1)', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.6) }),
            dot(G.px(Math.PI * Math.PI), G.py(-1), { r: 3.4, c: RED, anim: aFade(BAS + 1.8) }),
            txt(G.px(Math.PI * Math.PI) + 2, G.py(-1) + 18, `${it('x')} = π${sup('2')}`, { size: 12, fill: RED, anim: aFade(BAS + 1.9) })],
    });
})();

/* ================= UPPGIFT 10 — |z + z̄| = |z − z̄| ===========================
 * Originalet: tomt rutnät −5 … 5 med alla tal utsatta. Lösningen är de två
 * linjerna Im z = Re z och Im z = −Re z. */
(function () {
    const cfg = {
        xmin: -5.5, xmax: 5.5, ymin: -5.5, ymax: 5.5, ux: 30, uy: 30,
        gx: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], gy: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
        tickX: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], tickY: [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5],
        tickXdx: -3, xlab: 'Re', ylab: 'Im', xlabAnchor: 'start', labDy: { '-1': [0, 4] },
        padL: 14, padR: 40, padT: 24, padB: 14, xOver: 8, yOver: 6,
    };
    { const G = graph(cfg); FIG['u10'] = svg(G.W, G.H, G.base.join('')); }
    {
        const G = graph(cfg);
        const g = G.base.slice();
        g.push(line(G.px(-5.5), G.py(-5.5), G.px(5.5), G.py(5.5), { c: RED, w: 2.4, anim: aDraw(BAS, 0.8) }));
        g.push(line(G.px(-5.5), G.py(5.5), G.px(5.5), G.py(-5.5), { c: RED, w: 2.4, anim: aDraw(BAS + 0.9, 0.8) }));
        g.push(txt(G.px(4.0), G.py(4.75), `Im ${it('z')} = Re ${it('z')}`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(-4.0), G.py(4.75), `Im ${it('z')} = ${MINUS}Re ${it('z')}`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.7) }));
        // två kontrollpunkter: 2 + 2i och −3 + 3i
        g.push(dot(G.px(2), G.py(2), { r: 3.8, c: RED, anim: aFade(BAS + 2.0) }));
        g.push(txt(G.px(2.25), G.py(1.55), `2 + 2${it('i')}`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 2.1) }));
        g.push(dot(G.px(-3), G.py(3), { r: 3.8, c: RED, anim: aFade(BAS + 2.2) }));
        g.push(txt(G.px(-3.25), G.py(2.55), `${MINUS}3 + 3${it('i')}`, { size: 12, fill: RED, anchor: 'end', anim: aFade(BAS + 2.3) }));
        FIG['u10-s1'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 4 VT 2018, delprov B (genererade — redigera');
out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-ma4-vt2018-B.js,');
out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma4-vt2018'] = Object.assign(window.NP_FIGURER['ma4-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) {
    out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
}
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma4-vt2018-figurer-B.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
