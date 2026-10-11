// Generator för data/np/ma3c-vt2018-figurer-D.js: NP Matematik 3c VT 2018,
// delprov D (uppgift 20–28). Alla koordinater beräknade, alla kurvor
// samplade tätt ur sin funktion. Kör från repo-roten:
//   node .claude/np-figs/gen-ma3c-vt2018-D.js
// Konventioner (som gen-ma3c-vt2022.js och gen-ma4-vt2022-D.js): ink
// #0f1620, soft #3f4a5c, accent #c8324a (markeringar i lösningssteg),
// kurvblå #1c3d6b. Animationsklasser: anim-draw (heldragna linjer ritas),
// anim-fade (etiketter, streckade linjer, punkter, ytor). BAS =
// basfördröjning som ger läsaren tid att orientera sig.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c3d6b';
const GRID = 'rgba(15,22,32,0.13)';
const SHADE = 'rgba(15,22,32,0.12)';
const RED_T = 'rgba(200,50,74,0.16)';
const BLUE_T = 'rgba(28,61,107,0.14)';
const LAWN = 'rgba(15,22,32,0.16)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const MINUS = '−';
const NB = ' ';
const rad = a => a * Math.PI / 180;

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        (o.anim || '') + '/>';
}

function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 12.5}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.weight ? ` font-weight="${o.weight}"` : '') +
        (o.rot ? ` transform="rotate(${o.rot} ${A(x)} ${A(y)})"` : '') +
        (o.anim || '') + `>${s}</text>`;
}

const it = s => `<tspan font-style="italic">${s}</tspan>`;
const sup = s => `<tspan dy="-5" font-size="9">${s}</tspan><tspan dy="5"> </tspan>`;
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
    return line(x1 + ux * h, y1 + uy * h, x2 - ux * h, y2 - uy * h, { c, w: o.w || 1.2, cap: 'butt', anim: an }) +
        headAt(x1, y1, ux, uy) + headAt(x2, y2, -ux, -uy);
}

const dot = (x, y, o = {}) => `<circle cx="${A(x)}" cy="${A(y)}" r="${o.r || 3.6}" fill="${o.c || RED}"${o.anim || ''}/>`;

// Vinkelbåge i hörnet (vx, vy) mellan riktningarna a1 och a2 (grader,
// matematisk riktning med y uppåt). Kortaste vägen. Etikett på
// bisektrisen strax utanför bågen.
function angleArc(vx, vy, a1, a2, r, o = {}) {
    let d = ((a2 - a1) % 360 + 360) % 360;
    if (d > 180) { const t = a1; a1 = a2; a2 = t; d = 360 - d; }
    const p1 = { x: vx + r * Math.cos(rad(a1)), y: vy - r * Math.sin(rad(a1)) };
    const p2 = { x: vx + r * Math.cos(rad(a2)), y: vy - r * Math.sin(rad(a2)) };
    let s = `<path d="M ${A(p1.x)} ${A(p1.y)} A ${A(r)} ${A(r)} 0 0 0 ${A(p2.x)} ${A(p2.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}"${o.anim || ''}/>`;
    if (o.label) {
        const bis = rad(a1 + d / 2), lr = r + (o.labelR || 13);
        s += txt(vx + lr * Math.cos(bis) + (o.ldx || 0), vy - lr * Math.sin(bis) + 4 + (o.ldy || 0), o.label,
            { size: o.size || 12, fill: o.c || INK, anim: o.animLabel || o.anim || '' });
    }
    return s;
}
// Rät vinkel-markering i hörnet v mellan enhetsriktningarna u1, u2 (px).
function rightMark(v, u1, u2, s, o = {}) {
    const p1 = { x: v.x + u1.x * s, y: v.y + u1.y * s };
    const p2 = { x: v.x + (u1.x + u2.x) * s, y: v.y + (u1.y + u2.y) * s };
    const p3 = { x: v.x + u2.x * s, y: v.y + u2.y * s };
    return `<path d="M ${A(p1.x)} ${A(p1.y)} L ${A(p2.x)} ${A(p2.y)} L ${A(p3.x)} ${A(p3.y)}" fill="none" stroke="${o.c || INK}" stroke-width="${o.w || 1.2}"${o.anim || ''}/>`;
}
const unit = (p, q) => { const L = Math.hypot(q.x - p.x, q.y - p.y); return { x: (q.x - p.x) / L, y: (q.y - p.y) / L }; };
// Riktning (grader, y uppåt) från p till q i px-koordinater.
const dirDeg = (p, q) => Math.atan2(-(q.y - p.y), q.x - p.x) * 180 / Math.PI;

// Svenskt talformat: decimalkomma, äkta minus, hårt mellanslag i tusental.
function fmt(v, d = 0) {
    let s = Math.abs(v).toFixed(d).replace('.', ',');
    const [ip, fp] = s.split(',');
    const g = ip.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
    s = fp !== undefined ? g + ',' + fp : g;
    return (v < 0 && parseFloat(Math.abs(v).toFixed(d)) !== 0 ? MINUS : '') + s;
}

// ---- Koordinatsystem med fria skalor och fria skalstreck ---------------
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
    if (cfg.xlab !== null) g.push(txt(px(cfg.xmax) + 12, ax + (cfg.xlabDy ?? 17), cfg.xlab || it('x'), { size: 14, anchor: cfg.xlabAnchor || 'middle' }));
    if (cfg.ylab !== null) g.push(txt(ay + (cfg.ylabDx ?? 12), py(cfg.ymax) - 6, cfg.ylab || it('y'), { size: 14, anchor: cfg.ylabAnchor || 'middle' }));
    (cfg.xt || []).forEach(([v, lab]) => {
        g.push(line(px(v), ax - 3.5, px(v), ax + 3.5, { w: 1.2 }));
        if (lab != null) g.push(txt(px(v) + (cfg.xtDx || 0), ax + 16, lab, { size: 11.5, fill: SOFT }));
    });
    (cfg.yt || []).forEach(([v, lab]) => {
        g.push(line(ay - 3.5, py(v), ay + 3.5, py(v), { w: 1.2 }));
        if (lab != null) g.push(txt(ay - 7, py(v) + 4, lab, { size: 11.5, fill: SOFT, anchor: 'end' }));
    });
    return { W, H, px, py, base: g, cfg };
}

// Samplar f(x) tätt (steg ≤ 2,5 px) och klipper mot y-fönstret.
function curvePath(G, f, x0, x1, o = {}) {
    const n = o.n || Math.max(120, Math.ceil(Math.abs(G.px(x1) - G.px(x0)) / 2));
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

/* ================= UPPGIFT 20: bloggbesökare, linjediagram ================= */
(function () {
    const data = [[13, 10], [14, 15], [15, 10], [16, 30], [17, 40], [18, 40], [19, 30], [20, 35], [21, 20]];
    const val = t => data.find(p => p[0] === t)[1];
    const ux = 50, uy = 5.2;
    const padL = 74, padT = 14, padR = 30, padB = 56;
    const px = t => padL + (t - 13) * ux;
    const py = v => padT + (45 - v) * uy;
    const W = padL + 8 * ux + padR, H = padT + 45 * uy + padB;
    function base() {
        const g = [];
        for (let t = 13; t <= 21; t++) g.push(line(px(t), py(0), px(t), py(45), { c: GRID, w: 1 }));
        for (let v = 0; v <= 45; v += 5) g.push(line(px(13), py(v), px(21), py(v), { c: GRID, w: 1 }));
        g.push(line(px(13), py(0), px(21), py(0), { w: 1.5 }));
        g.push(line(px(13), py(0), px(13), py(45), { w: 1.5 }));
        for (let t = 13; t <= 21; t++) {
            g.push(line(px(t), py(0), px(t), py(0) + 4, { w: 1.2 }));
            g.push(txt(px(t), py(0) + 19, `${t}.00`, { size: 12, fill: SOFT }));
        }
        for (let v = 0; v <= 45; v += 5) {
            g.push(line(px(13) - 4, py(v), px(13), py(v), { w: 1.2 }));
            g.push(txt(px(13) - 8, py(v) + 4, String(v), { size: 12, fill: SOFT, anchor: 'end' }));
        }
        g.push(txt((px(13) + px(21)) / 2, py(0) + 42, 'Tid, klockslag', { size: 13 }));
        g.push(txt(22, (py(0) + py(45)) / 2, 'Antal bloggbesökare', { size: 13, rot: -90 }));
        // streckade förbindelselinjer + punkter
        for (let i = 0; i < data.length - 1; i++)
            g.push(line(px(data[i][0]), py(data[i][1]), px(data[i + 1][0]), py(data[i + 1][1]), { w: 1.2, dash: '4 3', c: SOFT }));
        data.forEach(([t, v]) => g.push(dot(px(t), py(v), { c: INK, r: 3.8 })));
        return g;
    }
    FIG['u20'] = svg(W, H, base().join(''));
    // s1: brantaste ökningen 15.00 till 16.00
    {
        const g = base();
        g.push(line(px(15), py(10), px(16), py(30), { c: RED, w: 3, cap: 'round', anim: aDraw(BAS, 0.5) }));
        g.push(line(px(15), py(10), px(16), py(10), { c: RED, w: 1.5, dash: '4 3', anim: aFade(BAS + 0.6) }));
        g.push(txt((px(15) + px(16)) / 2, py(10) + 17, '1 h', { size: 12, fill: RED, anim: aFade(BAS + 0.7) }));
        g.push(line(px(16), py(10), px(16), py(30), { c: RED, w: 1.5, dash: '4 3', anim: aFade(BAS + 0.9) }));
        g.push(txt(px(16) + 6, py(20) + 4, '+20', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }));
        FIG['u20-s1'] = svg(W, H, g.join(''));
    }
    // s2: sekanten 15.00 till 19.00 med Δx = 4 h och Δy = 20
    {
        const g = base();
        g.push(line(px(15), py(10), px(19), py(30), { c: RED, w: 2.4, anim: aDraw(BAS, 0.6) }));
        g.push(line(px(15), py(10), px(19), py(10), { c: RED, w: 1.5, dash: '4 3', anim: aFade(BAS + 0.7) }));
        g.push(txt((px(15) + px(19)) / 2, py(10) + 17, `Δ${it('x')} = 4 h`, { size: 12, fill: RED, anim: aFade(BAS + 0.8) }));
        g.push(line(px(19), py(10), px(19), py(30), { c: RED, w: 1.5, dash: '4 3', anim: aFade(BAS + 1.0) }));
        g.push(txt(px(19) + 6, py(20) + 4, `Δ${it('y')} = 20`, { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
        g.push(dot(px(15), py(10), { anim: aFade(BAS + 0.2) }));
        g.push(dot(px(19), py(30), { anim: aFade(BAS + 0.2) }));
        FIG['u20-s2'] = svg(W, H, g.join(''));
    }
    void val;
})();

/* ================= UPPGIFT 21: glaspelaren på Sergels torg ================= */
(function () {
    // Frågefiguren i provets perspektiv (koordinater ur originalet, flyttade).
    const Ap = { x: 30, y: 418 }, Bp = { x: 465, y: 418 }, Cp = { x: 293, y: 286 }, Dp = { x: 293, y: 36 };
    {
        const g = [];
        // fontänens bassäng och glaspelaren (skiss)
        g.push(`<ellipse cx="${A(Cp.x - 28)}" cy="${A(Cp.y + 22)}" rx="224" ry="44" fill="rgba(15,22,32,0.07)" stroke="${SOFT}" stroke-width="1"/>`);
        g.push(`<ellipse cx="${A(Cp.x - 6)}" cy="${A(Cp.y + 10)}" rx="160" ry="28" fill="rgba(15,22,32,0.06)" stroke="${SOFT}" stroke-width="1"/>`);
        g.push(`<rect x="${A(Cp.x - 7)}" y="${A(Dp.y)}" width="14" height="${A(Cp.y - Dp.y)}" fill="#4a5262" stroke="${INK}" stroke-width="1"/>`);
        g.push(line(Ap.x, Ap.y, Bp.x, Bp.y, { w: 1.8 }));
        g.push(line(Ap.x, Ap.y, Cp.x, Cp.y, { w: 1.8 }));
        g.push(line(Bp.x, Bp.y, Cp.x, Cp.y, { w: 1.8 }));
        g.push(line(Ap.x, Ap.y, Dp.x, Dp.y, { w: 1.8 }));
        g.push(rightMark(Cp, unit(Cp, Ap), { x: 0, y: -1 }, 15, { w: 1.2 }));
        [Ap, Bp, Cp, Dp].forEach(p => g.push(dot(p.x, p.y, { c: INK, r: 3.6 })));
        g.push(txt(Ap.x - 10, Ap.y + 4, 'A', { size: 14, italic: true, anchor: 'end' }));
        g.push(txt(Bp.x + 10, Bp.y + 4, 'B', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(Cp.x - 4, Cp.y + 22, 'C', { size: 14, italic: true }));
        g.push(txt(Dp.x - 10, Dp.y + 4, 'D', { size: 14, italic: true, anchor: 'end' }));
        const aAC = dirDeg(Ap, Cp), aAD = dirDeg(Ap, Dp), aBC = dirDeg(Bp, Cp);
        g.push(angleArc(Ap.x, Ap.y, 0, aAC, 76, { label: '43°', labelR: -24, ldx: 4 }));
        g.push(angleArc(Ap.x, Ap.y, aAC, aAD, 92, { label: '42°', labelR: -26 }));
        g.push(angleArc(Bp.x, Bp.y, aBC, 180, 76, { label: '55°', labelR: -24, ldx: -2 }));
        // måttlinje 50 m under AB
        g.push(line(Ap.x, Ap.y + 6, Ap.x, Ap.y + 30, { w: 1, c: SOFT }));
        g.push(line(Bp.x, Bp.y + 6, Bp.x, Bp.y + 30, { w: 1, c: SOFT }));
        const mx = (Ap.x + Bp.x) / 2, yd = Ap.y + 24;
        g.push(arrow(mx - 26, yd, Ap.x, yd, { w: 1.2, head: 7 }));
        g.push(arrow(mx + 26, yd, Bp.x, yd, { w: 1.2, head: 7 }));
        g.push(txt(mx, yd + 4.5, '50 m', { size: 12.5 }));
        FIG['u21'] = svg(500, 456, g.join(''));
    }
    // Trianglarna i verklig form.
    const C = 82, AC = 50 * Math.sin(rad(55)) / Math.sin(rad(C)), CD = AC * Math.tan(rad(42));
    // s1/s2: triangeln ABC sedd ovanifrån
    const u = 7.4;
    const a0 = { x: 34, y: 262 }, b0 = { x: 34 + 50 * u, y: 262 };
    const c0 = { x: 34 + AC * Math.cos(rad(43)) * u, y: 262 - AC * Math.sin(rad(43)) * u };
    function topView(withAC) {
        const g = [];
        g.push(txt(14, 22, 'Triangeln ABC sedd ovanifrån', { size: 12, fill: SOFT, anchor: 'start' }));
        g.push(`<polygon points="${A(a0.x)},${A(a0.y)} ${A(b0.x)},${A(b0.y)} ${A(c0.x)},${A(c0.y)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        [a0, b0, c0].forEach(p => g.push(dot(p.x, p.y, { c: INK, r: 3.2 })));
        g.push(txt(a0.x - 9, a0.y + 5, 'A', { size: 14, italic: true, anchor: 'end' }));
        g.push(txt(b0.x + 9, b0.y + 5, 'B', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(c0.x, c0.y - 10, 'C', { size: 14, italic: true }));
        g.push(angleArc(a0.x, a0.y, 0, 43, 34, { label: '43°', labelR: 16 }));
        g.push(angleArc(b0.x, b0.y, dirDeg(b0, c0), 180, 34, { label: '55°', labelR: 16 }));
        g.push(txt((a0.x + b0.x) / 2, a0.y + 20, '50 m', { size: 12.5 }));
        if (withAC) {
            g.push(angleArc(c0.x, c0.y, dirDeg(c0, a0), dirDeg(c0, b0), 26, { c: RED, label: '82°', labelR: 14 }));
            g.push(line(a0.x, a0.y, c0.x, c0.y, { c: RED, w: 3, cap: 'butt', anim: aDraw(BAS, 0.5) }));
            const m = { x: (a0.x + c0.x) / 2, y: (a0.y + c0.y) / 2 };
            g.push(txt(m.x - 12, m.y - 6, `${it('AC')} ≈ 41,4 m`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        } else {
            g.push(angleArc(c0.x, c0.y, dirDeg(c0, a0), dirDeg(c0, b0), 26, { c: RED, label: '82°', labelR: 14, anim: aFade(BAS) }));
        }
        return g;
    }
    FIG['u21-s1'] = svg(440, 290, topView(false).join(''));
    FIG['u21-s2'] = svg(440, 290, topView(true).join(''));
    // s3: triangeln ACD sedd från sidan (rät vinkel i C)
    {
        const v = 7.4;
        const a = { x: 40, y: 326 }, c = { x: 40 + AC * v, y: 326 }, d = { x: 40 + AC * v, y: 326 - CD * v };
        const g = [];
        g.push(txt(14, 22, 'Triangeln ACD sedd från sidan', { size: 12, fill: SOFT, anchor: 'start' }));
        g.push(`<polygon points="${A(a.x)},${A(a.y)} ${A(c.x)},${A(c.y)} ${A(d.x)},${A(d.y)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(rightMark(c, { x: -1, y: 0 }, { x: 0, y: -1 }, 12));
        [a, c, d].forEach(p => g.push(dot(p.x, p.y, { c: INK, r: 3.2 })));
        g.push(txt(a.x - 9, a.y + 5, 'A', { size: 14, italic: true, anchor: 'end' }));
        g.push(txt(c.x + 9, c.y + 5, 'C', { size: 14, italic: true, anchor: 'start' }));
        g.push(txt(d.x + 9, d.y + 5, 'D', { size: 14, italic: true, anchor: 'start' }));
        g.push(angleArc(a.x, a.y, 0, 42, 44, { label: '42°', labelR: 16 }));
        g.push(txt((a.x + c.x) / 2, a.y + 20, '41,4 m', { size: 12.5, fill: BLUE }));
        g.push(line(c.x, c.y, d.x, d.y, { c: RED, w: 3.2, cap: 'butt', anim: aDraw(BAS, 0.5) }));
        g.push(txt(c.x + 10, (c.y + d.y) / 2 + 4, it('CD'), { size: 13.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) }));
        g.push(txt(c.x + 10, (c.y + d.y) / 2 + 20, 'motstående katet', { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 0.8) }));
        g.push(txt((a.x + c.x) / 2, a.y + 36, 'närliggande katet', { size: 11.5, fill: SOFT, anim: aFade(BAS + 0.8) }));
        FIG['u21-s3'] = svg(470, 370, g.join(''));
    }
})();

/* ================= UPPGIFT 22: f och g, vem är derivatan? ================= */
// OBS: originalprovets figur är en skiss ("huvuddragen") där g i själva
// verket är 2f′: f har sitt maximum strax över 3 medan g:s topp är 2. En
// elev som jämför lutning med derivatavärde skulle se att det inte stämmer,
// så figuren här är gjord EXAKT: g(x) = 4x − 2x² och f(x) = −2x³/3 + 2x² + 2,
// alltså f′ = g, med f(0) = 2 som i originalet. Maximum (2, 14/3),
// nollstället x ≈ 3,28.
(function () {
    const f = x => -2 * x * x * x / 3 + 2 * x * x + 2;
    const gg = x => 4 * x - 2 * x * x;
    // kontroll: f′ = g (central differens)
    [-0.5, 0.7, 1.9, 3].forEach(x => { if (Math.abs((f(x + 1e-6) - f(x - 1e-6)) / 2e-6 - gg(x)) > 1e-4) throw new Error('u22: f′ ≠ g'); });
    function base() {
        const G = graph({ xmin: -1.05, xmax: 3.95, ymin: -3.9, ymax: 5.4, ux: 44, uy: 44,
            padL: 20, padR: 30, padT: 20, padB: 14,
            grid: { xs: [-1, 1, 2, 3], ys: [-3, -2, -1, 1, 2, 3, 4, 5] },
            xt: [[1, '1']], yt: [[1, '1']], xtDx: 6 });
        const g = G.base.slice();
        g.push(curvePath(G, f, -0.88, 3.62, { c: INK, w: 2 }));
        g.push(curvePath(G, gg, -0.72, 2.72, { c: INK, w: 2 }));
        g.push(txt(G.px(0.3), G.py(5.0), `${it('y')} = ${it('f')}(${it('x')})`, { size: 13, anchor: 'start' }));
        g.push(txt(G.px(-0.3), G.py(-0.55), `${it('y')} = ${it('g')}(${it('x')})`, { size: 13, anchor: 'end' }));
        return { G, g };
    }
    { const { G, g } = base(); FIG['u22'] = svg(G.W, G.H, g.join('')); }
    // s1: f:s extrempunkter ligger rakt ovanför g:s nollställen
    {
        const { G, g } = base();
        [0, 2].forEach((x, i) => {
            const d = BAS + i * 0.5;
            g.push(line(G.px(x - 0.45), G.py(f(x)), G.px(x + 0.45), G.py(f(x)), { c: RED, w: 1.6, dash: '5 4', anim: aFade(d) }));
            g.push(dot(G.px(x), G.py(f(x)), { anim: aFade(d) }));
            g.push(line(G.px(x), G.py(f(x)), G.px(x), G.py(0), { c: RED, w: 1.3, dash: '3 3', anim: aFade(d + 0.25) }));
            g.push(dot(G.px(x), G.py(0), { anim: aFade(d + 0.35) }));
        });
        FIG['u22-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: f växer mellan 0 och 2 där g är positiv
    {
        const { G, g } = base();
        g.push(curvePath(G, f, 0, 2, { c: RED, w: 3, anim: aDraw(BAS, 0.6) }));
        // teckenmarkering längs x-axeln: g > 0 mellan 0 och 2, g < 0 utanför
        g.push(line(G.px(0), G.py(0), G.px(2), G.py(0), { c: RED, w: 4, cap: 'butt', anim: aFade(BAS + 0.7) }));
        g.push(txt(G.px(1), G.py(0) + 34, `${it('g')} > 0`, { size: 12.5, fill: RED, anim: aFade(BAS + 0.9) }));
        g.push(txt(G.px(-0.55), G.py(0) - 8, `${it('g')} < 0`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.1) }));
        g.push(txt(G.px(2.62), G.py(0) + 30, `${it('g')} < 0`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.1) }));
        FIG['u22-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 24: kontroll: f′(x) = 12 grafiskt ================= */
(function () {
    const fp = x => -2 * Math.exp(-0.4 * x) + 100;
    const x0 = Math.log(44) / -0.4; // −9,4605
    const G = graph({ xmin: -12, xmax: 2.6, ymin: -45, ymax: 118, ux: 30, uy: 1.75,
        padL: 26, padR: 30, padT: 22, padB: 30,
        xt: [[-10, null], [-5, MINUS + '5']], yt: [[50, '50'], [100, null]], ylabDx: 12 });
    const g = G.base.slice();
    g.push(txt(G.px(0) + 7, G.py(100) - 7, '100', { size: 11.5, fill: SOFT, anchor: 'start' }));
    g.push(txt(G.px(-10) - 4, G.py(0) + 16, MINUS + '10', { size: 11.5, fill: SOFT, anchor: 'end' }));
    g.push(curvePath(G, fp, -12, 2.5, { anim: aDraw(BAS, 0.8) }));
    g.push(txt(G.px(-4.4), G.py(103), `${it('y')} = ${it('f')}′(${it('x')})`, { size: 13, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.6) }));
    g.push(line(G.px(-12), G.py(12), G.px(2.5), G.py(12), { c: RED, w: 1.8, anim: aDraw(BAS + 0.9, 0.5) }));
    g.push(txt(G.px(1.2), G.py(12) - 7, `${it('y')} = 12`, { size: 12.5, fill: RED, anim: aFade(BAS + 1.3) }));
    g.push(dot(G.px(x0), G.py(12), { anim: aFade(BAS + 1.5) }));
    g.push(txt(G.px(x0) + 9, G.py(12) + 16, `${it('x')} ≈ ${MINUS}9,46`, { size: 12.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.7) }));
    FIG['u24-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 25: gräsmattan ================= */
(function () {
    // Fyrhörningen i meter: P1 nere till vänster, P2 nere till höger,
    // P3 uppe till höger (rät vinkel i P2), P4 uppe till vänster.
    // P4 ur |P1P4| = 13 och |P3P4| = 20.
    const P3m = { x: 24, y: 10 };
    // 48x + 20y = 445 och x² + y² = 169
    const a = 48, b = 20, c = 445;
    const qa = 1 + (a / b) ** 2, qb = -2 * a * c / (b * b), qc = (c / b) ** 2 - 169;
    const xs = [(-qb - Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa), (-qb + Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa)];
    const x4 = xs.find(x => (c - a * x) / b > 0 && x < 10);
    const P4m = { x: x4, y: (c - a * x4) / b };
    const chk = [Math.hypot(P4m.x, P4m.y), Math.hypot(P4m.x - 24, P4m.y - 10)];
    if (Math.abs(chk[0] - 13) > 1e-9 || Math.abs(chk[1] - 20) > 1e-9) throw new Error('u25 geometri');

    function quad(u, ox, oy) {
        const P = p => ({ x: ox + p.x * u, y: oy - p.y * u });
        return { P1: P({ x: 0, y: 0 }), P2: P({ x: 24, y: 0 }), P3: P(P3m), P4: P(P4m) };
    }
    // vänstra panelen (frågefiguren)
    function leftPanel(ox0) {
        const g = [];
        const q = quad(9, ox0 + 30, 196);
        g.push(`<rect x="${A(ox0)}" y="14" width="292" height="236" fill="none" stroke="${INK}" stroke-width="1.4"/>`);
        g.push(txt(ox0 + 12, 44, '(m)', { size: 12.5, anchor: 'start' }));
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P2.x)},${A(q.P2.y)} ${A(q.P3.x)},${A(q.P3.y)} ${A(q.P4.x)},${A(q.P4.y)}" fill="${LAWN}" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(rightMark(q.P2, { x: -1, y: 0 }, { x: 0, y: -1 }, 9));
        // måttlinjer: 24 under, 10 till höger, 20 ovanför, 13 till vänster
        const off = (p, n, o) => ({ x: p.x + n.x * o, y: p.y + n.y * o });
        const nrm = (p, q2) => { const e = unit(p, q2); return { x: e.y, y: -e.x }; }; // vänster normal i px
        function sideDim(p, q2, o, lab, lx, ly, anchor) {
            const n = nrm(p, q2);
            const p1 = off(p, n, o), q1 = off(q2, n, o);
            g.push(line(p.x + n.x * 4, p.y + n.y * 4, p.x + n.x * (o + 5), p.y + n.y * (o + 5), { w: 0.9, c: SOFT }));
            g.push(line(q2.x + n.x * 4, q2.y + n.y * 4, q2.x + n.x * (o + 5), q2.y + n.y * (o + 5), { w: 0.9, c: SOFT }));
            g.push(dim(p1.x, p1.y, q1.x, q1.y, { head: 6 }));
            g.push(txt(lx, ly, lab, { size: 12.5, anchor: anchor || 'middle' }));
        }
        sideDim(q.P2, q.P1, 14, '24', (q.P1.x + q.P2.x) / 2, q.P1.y + 31);          // under
        sideDim(q.P3, q.P2, 14, '10', q.P2.x + 24, (q.P2.y + q.P3.y) / 2 + 4, 'start'); // höger
        sideDim(q.P4, q.P3, 12, '20', (q.P3.x + q.P4.x) / 2 + 2, (q.P3.y + q.P4.y) / 2 - 20); // ovanför
        sideDim(q.P1, q.P4, 12, '13', (q.P1.x + q.P4.x) / 2 - 20, (q.P1.y + q.P4.y) / 2 + 2, 'end'); // vänster
        return g;
    }
    // högra panelen: skiss av tomten med huset
    function rightPanel(ox0) {
        const g = [];
        g.push(`<rect x="${A(ox0)}" y="14" width="288" height="236" fill="none" stroke="${INK}" stroke-width="1.4"/>`);
        // horisontlinje och mark
        g.push(line(ox0 + 14, 70, ox0 + 200, 66, { w: 1, c: SOFT }));
        // gräsmattan i perspektiv
        const L = [[ox0 + 52, 130], [ox0 + 212, 130], [ox0 + 262, 160], [ox0 + 20, 184]];
        g.push(`<polygon points="${L.map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="${LAWN}" stroke="${INK}" stroke-width="1.3"/>`);
        // huset: gavel, långsida och tak
        const hx = ox0 + 214, hy = 158;
        g.push(`<polygon points="${A(hx)},${A(hy - 40)} ${A(hx + 40)},${A(hy - 30)} ${A(hx + 40)},${A(hy + 2)} ${A(hx)},${A(hy - 6)}" fill="#e6dfd1" stroke="${INK}" stroke-width="1.2"/>`);
        g.push(`<polygon points="${A(hx + 40)},${A(hy - 30)} ${A(ox0 + 286)},${A(hy - 36)} ${A(ox0 + 286)},${A(hy - 4)} ${A(hx + 40)},${A(hy + 2)}" fill="#d9d1c1" stroke="${INK}" stroke-width="1.2"/>`);
        g.push(`<polygon points="${A(hx - 4)},${A(hy - 38)} ${A(hx + 20)},${A(hy - 74)} ${A(hx + 44)},${A(hy - 28)}" fill="#e6dfd1" stroke="${INK}" stroke-width="1.2"/>`);
        g.push(`<polygon points="${A(hx + 20)},${A(hy - 74)} ${A(ox0 + 286)},${A(hy - 84)} ${A(ox0 + 286)},${A(hy - 34)} ${A(hx + 44)},${A(hy - 28)}" fill="#4a5262" stroke="${INK}" stroke-width="1.2"/>`);
        g.push(txt(ox0 + 132, 100, 'gräsmatta', { size: 13 }));
        g.push(arrow(ox0 + 126, 106, ox0 + 110, 150, { w: 1.2, head: 8 }));
        return g;
    }
    FIG['u25'] = svg(600, 264, leftPanel(4).concat(rightPanel(306)).join(''));

    // Lösningsfigurer: bara fyrhörningen, större.
    const u = 13, ox = 50, oy = 214;
    const q = quad(u, ox, oy);
    const W = ox + 24 * u + 60, H = oy + 40;
    function solBase() {
        const g = [];
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P2.x)},${A(q.P2.y)} ${A(q.P3.x)},${A(q.P3.y)} ${A(q.P4.x)},${A(q.P4.y)}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        g.push(rightMark(q.P2, { x: -1, y: 0 }, { x: 0, y: -1 }, 11));
        g.push(txt((q.P1.x + q.P2.x) / 2, q.P1.y + 20, '24', { size: 13 }));
        g.push(txt(q.P2.x + 9, (q.P2.y + q.P3.y) / 2 + 5, '10', { size: 13, anchor: 'start' }));
        const m34 = { x: (q.P3.x + q.P4.x) / 2, y: (q.P3.y + q.P4.y) / 2 };
        g.push(txt(m34.x, m34.y - 10, '20', { size: 13 }));
        const m14 = { x: (q.P1.x + q.P4.x) / 2, y: (q.P1.y + q.P4.y) / 2 };
        g.push(txt(m14.x - 12, m14.y + 4, '13', { size: 13, anchor: 'end' }));
        g.push(txt(14, 22, '(m)', { size: 12, fill: SOFT, anchor: 'start' }));
        return g;
    }
    const dm = { x: (q.P1.x + q.P3.x) / 2, y: (q.P1.y + q.P3.y) / 2 };
    // s1: diagonalen delar fyrhörningen; den rätvinkliga triangeln ger 26
    {
        const g = solBase();
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P2.x)},${A(q.P2.y)} ${A(q.P3.x)},${A(q.P3.y)}" fill="${BLUE_T}"${aFade(BAS + 0.6)}/>`);
        g.push(line(q.P1.x, q.P1.y, q.P3.x, q.P3.y, { c: RED, w: 2.6, cap: 'butt', anim: aDraw(BAS, 0.5) }));
        g.push(txt(dm.x + 26, dm.y + 30, it('d') + ' = 26', { size: 13, fill: RED, anim: aFade(BAS + 0.9) }));
        FIG['u25-s1'] = svg(W, H, g.join(''));
    }
    // s2: den sneda triangeln 13, 20, 26; vinkeln α mellan 13 och 20
    const a4 = dirDeg(q.P4, q.P1), b4 = dirDeg(q.P4, q.P3);
    {
        const g = solBase();
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P3.x)},${A(q.P3.y)} ${A(q.P4.x)},${A(q.P4.y)}" fill="${RED_T}"${aFade(BAS + 0.4)}/>`);
        g.push(line(q.P1.x, q.P1.y, q.P3.x, q.P3.y, { c: INK, w: 1.8 }));
        g.push(txt(dm.x + 26, dm.y + 30, '26', { size: 13 }));
        g.push(angleArc(q.P4.x, q.P4.y, a4, b4, 22, { c: RED, w: 1.8, label: it('α'), labelR: 6, ldx: 0, ldy: 28, anim: aFade(BAS + 0.8) }));
        FIG['u25-s2'] = svg(W, H, g.join(''));
    }
    // s3: båda triangelareorna
    {
        const g = solBase();
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P2.x)},${A(q.P2.y)} ${A(q.P3.x)},${A(q.P3.y)}" fill="${BLUE_T}"${aFade(BAS)}/>`);
        g.push(`<polygon points="${A(q.P1.x)},${A(q.P1.y)} ${A(q.P3.x)},${A(q.P3.y)} ${A(q.P4.x)},${A(q.P4.y)}" fill="${RED_T}"${aFade(BAS + 0.4)}/>`);
        g.push(line(q.P1.x, q.P1.y, q.P3.x, q.P3.y, { c: INK, w: 1.8 }));
        const c1 = { x: (q.P1.x + q.P2.x + q.P3.x) / 3, y: (q.P1.y + q.P2.y + q.P3.y) / 3 };
        const c2 = { x: (q.P1.x + q.P3.x + q.P4.x) / 3, y: (q.P1.y + q.P3.y + q.P4.y) / 3 };
        g.push(txt(c1.x + 18, c1.y + 10, '120 m' + supEnd('2'), { size: 13.5, fill: BLUE, weight: 600, anim: aFade(BAS + 0.3) }));
        g.push(txt(c2.x - 4, c2.y - 2, '≈ 127,2 m' + supEnd('2'), { size: 13.5, fill: RED, weight: 600, anim: aFade(BAS + 0.7) }));
        FIG['u25-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= UPPGIFT 26: röstningen, r(x) ================= */
(function () {
    const r = x => 12600 * x - 140 * x * x;
    const G = graph({ xmin: 0, xmax: 122, ymin: -95000, ymax: 310000, ux: 3.3, uy: 0.00074,
        padL: 70, padR: 44, padT: 26, padB: 26,
        xt: [[30, '30'], [60, '60'], [90, '90'], [120, '120']],
        yt: [[100000, '100' + NB + '000'], [200000, '200' + NB + '000'], [300000, '300' + NB + '000']],
        xlab: it('x'), ylab: it('y'), xtDx: -8 });
    function base() {
        const g = G.base.slice();
        g.push(curvePath(G, r, 0, 120));
        g.push(txt(G.px(52), G.py(298000), `${it('y')} = ${it('r')}(${it('x')})`, { size: 13, fill: BLUE, anchor: 'start' }));
        return g;
    }
    // s1: arean under r från 0 till t är antalet röster
    {
        const g = base();
        g.push(areaPath(G, r, () => 0, 0, 60, { fill: RED_T, anim: aFade(BAS) }));
        g.push(line(G.px(60), G.py(0), G.px(60), G.py(r(60)), { c: RED, w: 1.6, anim: aFade(BAS + 0.2) }));
        g.push(txt(G.px(30), G.py(110000), '12,6 miljoner', { size: 12.5, fill: RED, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(30), G.py(110000) + 16, 'röster', { size: 12.5, fill: RED, anim: aFade(BAS + 0.5) }));
        g.push(txt(G.px(60), G.py(0) + 30, it('t'), { size: 13.5, fill: RED, anim: aFade(BAS + 0.3) }));
        FIG['u26-s1'] = svg(G.W, G.H, g.join(''));
    }
    // s2: r(x) är negativ efter x = 90; lösningen 114 förkastas
    {
        const g = base();
        g.push(areaPath(G, r, () => 0, 0, 60, { fill: RED_T }));
        g.push(curvePath(G, r, 90, 120, { c: RED, w: 3, anim: aDraw(BAS, 0.5) }));
        g.push(dot(G.px(90), G.py(0), { anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(88), G.py(-55000), `${it('r')} < 0`, { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.6) }));
        g.push(dot(G.px(60), G.py(0), { anim: aFade(BAS + 0.8) }));
        g.push(txt(G.px(60), G.py(0) - 8, '60', { size: 12.5, fill: RED, anim: aFade(BAS + 0.9) }));
        FIG['u26-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 27: meterpriset närmar sig 20 kr/m ================= */
(function () {
    const k = x => 20 + 150 / (x * x);
    const G = graph({ xmin: 0, xmax: 15.5, ymin: 0, ymax: 62, ux: 26, uy: 4,
        padL: 40, padR: 52, padT: 22, padB: 28,
        xt: [[5, '5'], [10, '10'], [15, '15']], yt: [[20, '20'], [40, '40'], [60, '60']],
        xlab: it('x'), ylab: 'kr/m', ylabDx: 8, ylabAnchor: 'start' });
    const g = G.base.slice();
    g.push(line(G.px(0), G.py(20), G.px(15.5), G.py(20), { c: RED, w: 1.6, dash: '6 4', anim: aFade(BAS + 0.8) }));
    g.push(curvePath(G, k, 1.5, 15.4, { anim: aDraw(BAS, 0.8) }));
    g.push(dot(G.px(5), G.py(26), { c: BLUE, anim: aFade(BAS + 0.6) }));
    g.push(txt(G.px(5) + 8, G.py(26) - 8, '(5, 26)', { size: 12, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.6) }));
    // kurvetikett: meterpriset P(x)/x = 20 + 150/x²
    const lx = G.px(4.2), an7 = aFade(BAS + 0.7);
    g.push(txt(lx + 16, G.py(52) - 8, `${it('P')}(${it('x')})`, { size: 12, fill: BLUE, anim: an7 }));
    g.push(line(lx, G.py(52) - 4, lx + 32, G.py(52) - 4, { c: BLUE, w: 1.1, anim: an7 }));
    g.push(txt(lx + 16, G.py(52) + 11, it('x'), { size: 12, fill: BLUE, anim: an7 }));
    g.push(txt(lx + 37, G.py(52), ' = 20 + ', { size: 13, fill: BLUE, anchor: 'start', anim: an7 }));
    const fx = lx + 84;
    g.push(txt(fx + 13, G.py(52) - 8, '150', { size: 12, fill: BLUE, anim: aFade(BAS + 0.7) }));
    g.push(line(fx, G.py(52) - 4, fx + 26, G.py(52) - 4, { c: BLUE, w: 1.1, anim: aFade(BAS + 0.7) }));
    g.push(txt(fx + 13, G.py(52) + 11, it('x') + supEnd('2'), { size: 12, fill: BLUE, anim: aFade(BAS + 0.7) }));
    g.push(txt(G.px(15.4), G.py(20) - 8, '20 kr/m', { size: 12.5, fill: RED, anchor: 'end', anim: aFade(BAS + 1.0) }));
    FIG['u27-s1'] = svg(G.W, G.H, g.join(''));
})();

/* ================= UPPGIFT 28: burken ================= */
(function () {
    // s1: cylindern + utvikt mantel och två cirklar
    {
        const g = [];
        const cx = 90, top = 50, bot = 210, rx = 52, ry = 15;
        g.push(`<path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}" fill="rgba(15,22,32,0.07)" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(`<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`);
        g.push(`<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="rgba(15,22,32,0.13)" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(line(cx, top, cx + rx, top, { c: BLUE, w: 1.6 }));
        g.push(dot(cx, top, { c: BLUE, r: 2.6 }));
        g.push(txt(cx + rx / 2, top - ry - 5, it('r'), { size: 13.5, fill: BLUE }));
        g.push(line(cx + rx + 6, top, cx + rx + 26, top, { w: 0.9, c: SOFT }));
        g.push(line(cx + rx + 6, bot, cx + rx + 26, bot, { w: 0.9, c: SOFT }));
        g.push(dim(cx + rx + 18, top, cx + rx + 18, bot, { c: BLUE }));
        g.push(txt(cx + rx + 25, (top + bot) / 2 + 5, it('h'), { size: 13.5, fill: BLUE, anchor: 'start' }));
        // utvikt: mantelrektangel och två cirklar
        const X0 = 210, mw = 2 * Math.PI * 30, mh = 120;
        g.push(`<rect x="${X0}" y="${top + 20}" width="${A(mw)}" height="${mh}" fill="${BLUE_T}" stroke="${INK}" stroke-width="1.4"${aFade(BAS)}/>`);
        g.push(txt(X0 + mw / 2, top + 20 + mh / 2 - 6, 'mantel', { size: 12.5, anim: aFade(BAS + 0.2) }));
        g.push(txt(X0 + mw / 2, top + 20 + mh / 2 + 12, '0,10 kr/dm' + supEnd('2'), { size: 12, fill: SOFT, anim: aFade(BAS + 0.2) }));
        g.push(txt(X0 + mw / 2, top + 20 + mh + 18, `2π${it('r')}`, { size: 13, fill: BLUE, anim: aFade(BAS + 0.4) }));
        g.push(txt(X0 + mw + 8, top + 20 + mh / 2 + 5, it('h'), { size: 13.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.4) }));
        const ccx = X0 + mw + 70;
        [top + 32, top + 128].forEach((cy, i) => {
            g.push(`<circle cx="${A(ccx)}" cy="${A(cy)}" r="30" fill="${RED_T}" stroke="${INK}" stroke-width="1.4"${aFade(BAS + 0.7 + i * 0.2)}/>`);
            g.push(txt(ccx, cy + 5, `π${it('r')}` + supEnd('2'), { size: 13, anim: aFade(BAS + 0.8 + i * 0.2) }));
        });
        g.push(txt(ccx, top + 180, 'botten och lock', { size: 12.5, anim: aFade(BAS + 1.1) }));
        g.push(txt(ccx, top + 196, '0,20 kr/dm' + supEnd('2'), { size: 12, fill: SOFT, anim: aFade(BAS + 1.1) }));
        FIG['u28-s1'] = svg(ccx + 74, 262, g.join(''));
    }
    // s2: kostnaden K(r) med minimipunkten
    {
        const K = r => 0.4 * Math.PI * r * r + 0.4 / r;
        const r0 = Math.cbrt(1 / (2 * Math.PI)), K0 = K(r0);
        const G = graph({ xmin: 0, xmax: 1.3, ymin: 0, ymax: 3.1, ux: 300, uy: 80,
            padL: 34, padR: 40, padT: 22, padB: 28,
            xt: [[0.5, '0,5'], [1, '1']], yt: [[1, '1'], [2, '2'], [3, '3']],
            xlab: it('r'), ylab: it('K') });
        const g = G.base.slice();
        g.push(curvePath(G, K, 0.13, 1.28));
        g.push(txt(G.px(0.86), G.py(2.55), `${it('y')} = ${it('K')}(${it('r')})`, { size: 13, fill: BLUE, anchor: 'end' }));
        g.push(line(G.px(r0 - 0.22), G.py(K0), G.px(r0 + 0.22), G.py(K0), { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }));
        g.push(dot(G.px(r0), G.py(K0), { anim: aFade(BAS + 0.2) }));
        g.push(line(G.px(r0), G.py(K0), G.px(r0), G.py(0), { c: RED, w: 1.3, dash: '3 3', anim: aFade(BAS + 0.4) }));
        g.push(txt(G.px(r0) + 8, G.py(K0) + 22, '(0,542; 1,107)', { size: 12, fill: RED, anchor: 'start', anim: aFade(BAS + 0.6) }));
        FIG['u28-s2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet: figurer till NP Ma 3c VT 2018, delprov D (genererade, redigera inte');
out.push('// för hand; generatorn ligger i .claude/np-figs/gen-ma3c-vt2018-D.js, koordinater beräknade).');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma3c-vt2018'] = Object.assign(window.NP_FIGURER['ma3c-vt2018'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma3c-vt2018-figurer-D.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
