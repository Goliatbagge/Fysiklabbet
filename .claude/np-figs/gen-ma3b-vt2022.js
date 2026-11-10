// Generator för data/np/ma3b-vt2022-figurer.js — NP Matematik 3b VT 2022.
// Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma3b-vt2022.js
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
const FILL = 'rgba(28,61,107,0.14)';

/* ================= UPPGIFT 5 — två linjer och sex punkter ================= */
(function () {
    const P = { A: [2, 5], B: [-1, 3], C: [1, 3], D: [2, 3], E: [4, 3], F: [2, 1] };
    // etikettens förskjutning i px från punkten (fri yta, aldrig på en linje)
    const OFF = { A: [6, 16, 'start'], B: [0, 17, 'middle'], C: [6, 17, 'start'],
                  D: [0, -11, 'middle'], E: [6, 17, 'start'], F: [6, 17, 'start'] };
    function base() {
        const G = graph({ xmin: -1.4, xmax: 5.4, ymin: -0.5, ymax: 5.5, ux: 40, uy: 40,
                          grid: true, ticks: true, yLabelsRight: [5] });
        const g = G.base.slice();
        // y = 5 − x och y = x + 1, klippta mot fönstret
        g.push(line(G.px(-0.4), G.py(5.4), G.px(5.4), G.py(-0.4), { w: 1.6 }));
        // den stigande linjen börjar strax under x-axeln, så att den inte
        // korsar skalvärdet −1 (som dessutom knuffas lite åt höger)
        g.push(line(G.px(-1.15), G.py(-0.15), G.px(4.4), G.py(5.4), { w: 1.6 }));
        const i1 = g.findIndex(s => s.includes('>' + MINUS + '1</text>') && s.includes('y="' + A(G.py(0) + 16) + '"'));
        if (i1 >= 0) g[i1] = txt(G.px(-1) + 7, G.py(0) + 16, MINUS + '1', { size: 11.5, fill: SOFT });
        return { G, g };
    }
    function punkter(G, g) {
        for (const k of Object.keys(P)) {
            const [x, y] = P[k], o = OFF[k];
            g.push(`<circle cx="${A(G.px(x))}" cy="${A(G.py(y))}" r="3.2" fill="${INK}"/>`);
            g.push(txt(G.px(x) + o[0], G.py(y) + o[1], it(k), { size: 13.5, anchor: o[2] }));
        }
    }
    function etiketter(G, g, d) {
        const an = k => (d == null ? '' : aFade(d + k));
        g.push(txt(G.px(3.65), G.py(1.75), `${it('y')} = 5 ${MINUS} ${it('x')}`, { size: 13, anchor: 'start', fill: RED, anim: an(0) }));
        g.push(txt(G.px(3.5), G.py(3.85), `${it('y')} = ${it('x')} + 1`, { size: 13, anchor: 'start', fill: RED, anim: an(0.3) }));
    }
    { const { G, g } = base(); punkter(G, g); FIG['b5'] = svg(G.W, G.H, g.join('')); }
    // los1: linjerna får sina ekvationer
    { const { G, g } = base(); punkter(G, g); etiketter(G, g, BAS); FIG['b5-los1'] = svg(G.W, G.H, g.join('')); }
    // los2: området skuggas och C ringas in
    {
        const { G, g } = base();
        g.splice(G.base.length, 0, `<polygon points="${A(G.px(0))},${A(G.py(1))} ${A(G.px(0))},${A(G.py(5))} ${A(G.px(2))},${A(G.py(3))}" fill="${FILL}" stroke="none"${aFade(BAS)}/>`);
        punkter(G, g); etiketter(G, g);
        g.push(`<circle cx="${A(G.px(1))}" cy="${A(G.py(3))}" r="9" fill="none" stroke="${RED}" stroke-width="1.8"${aFade(BAS + 0.6)}/>`);
        FIG['b5-los2'] = svg(G.W, G.H, g.join(''));
    }
})();

/* ================= UPPGIFT 24 — linjär optimering ================= */
(function () {
    const S = 1.9, padL = 62, padT = 30, padB = 34, padR = 30;
    const XMAX = 150, YMAX = 160;
    const W = padL + XMAX * S + padR, H = padT + YMAX * S + padB;
    const px = x => padL + x * S, py = y => padT + (YMAX - y) * S;
    function base() {
        const g = [];
        for (let v = 25; v <= XMAX; v += 25) g.push(line(px(v), py(0), px(v), py(YMAX), { c: GRID, w: 1 }));
        for (let v = 25; v <= YMAX; v += 25) g.push(line(px(0), py(v), px(XMAX), py(v), { c: GRID, w: 1 }));
        g.push(line(px(0), py(0), px(XMAX) + 8, py(0), { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(XMAX) + 14)},${A(py(0))} ${A(px(XMAX) + 7)},${A(py(0) + 4.2)} ${A(px(XMAX) + 7)},${A(py(0) - 4.2)}" fill="${INK}"/>`);
        g.push(line(px(0), py(0), px(0), py(YMAX) - 8, { w: 1.5, cap: 'butt' }));
        g.push(`<polygon points="${A(px(0))},${A(py(YMAX) - 14)} ${A(px(0) + 4.2)},${A(py(YMAX) - 7)} ${A(px(0) - 4.2)},${A(py(YMAX) - 7)}" fill="${INK}"/>`);
        g.push(txt(px(XMAX) + 12, py(0) + 18, 'x', { size: 14, italic: true }));
        g.push(txt(px(0) + 12, py(YMAX) - 8, 'y', { size: 14, italic: true }));
        for (let v = 25; v <= XMAX; v += 25) {
            g.push(line(px(v), py(0) - 3, px(v), py(0) + 3, { w: 1.2 }));
            g.push(txt(px(v), py(0) + 16, String(v), { size: 11.5, fill: SOFT }));
        }
        for (let v = 25; v <= YMAX; v += 25) {
            g.push(line(px(0) - 3, py(v), px(0) + 3, py(v), { w: 1.2 }));
            g.push(txt(px(0) - 7, py(v) + 4, String(v), { size: 11.5, fill: SOFT, anchor: 'end' }));
        }
        return g;
    }
    // gränslinjerna: y = 150 − 1,5x och y = 125 − x, från axel till axel
    function linjer(g, anim) {
        g.push(line(px(0), py(150), px(100), py(0), { c: BLUE, w: 2, anim: anim ? aDraw(BAS) : '' }));
        g.push(txt(px(6), py(150) - 2, `${it('y')} = 150 ${MINUS} 1,5${it('x')}`, { size: 12.5, anchor: 'start', fill: BLUE, anim: anim ? aFade(BAS + 0.5) : '' }));
        g.push(line(px(0), py(125), px(125), py(0), { c: BLUE, w: 2, anim: anim ? aDraw(BAS + 0.8) : '' }));
        g.push(txt(px(106), py(26), `${it('y')} = 125 ${MINUS} ${it('x')}`, { size: 12.5, anchor: 'start', fill: BLUE, anim: anim ? aFade(BAS + 1.3) : '' }));
    }
    const HORN = [[0, 0, '(0, 0)', -6, 16, 'end'], [100, 0, '(100, 0)', -17, -8, 'end'],
                  [50, 75, '(50, 75)', 9, -6, 'start'], [0, 125, '(0, 125)', -7, -13, 'end']];
    function omrade(g, d) {
        g.push(`<polygon points="${HORN.map(h => A(px(h[0])) + ',' + A(py(h[1]))).join(' ')}" fill="${FILL}" stroke="none"${d == null ? '' : aFade(d)}/>`);
    }
    function horn(g, d) {
        HORN.forEach((h, i) => {
            const an = d == null ? '' : aFade(d + 0.25 * i);
            g.push(`<circle cx="${A(px(h[0]))}" cy="${A(py(h[1]))}" r="3.6" fill="${RED}"${an}/>`);
            g.push(txt(px(h[0]) + h[3], py(h[1]) + h[4], h[2], { size: 12, anchor: h[5], fill: RED, anim: an }));
        });
    }
    { const g = base(); linjer(g, true); FIG['b24-s1'] = svg(W, H, g.join('')); }
    { const g = base(); omrade(g, BAS); linjer(g, false); horn(g, BAS + 0.5); FIG['b24-s2'] = svg(W, H, g.join('')); }
    {
        const g = base(); omrade(g); linjer(g, false); horn(g);
        g.push(`<circle cx="${A(px(50))}" cy="${A(py(75))}" r="10" fill="none" stroke="${RED}" stroke-width="1.8"${aFade(BAS)}/>`);
        g.push(txt(px(50) + 12, py(75) - 24, `${it('V')} = 55 000`, { size: 12.5, anchor: 'start', fill: RED, anim: aFade(BAS + 0.3) }));
        FIG['b24-s3'] = svg(W, H, g.join(''));
    }
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 3b VT 2022 (genererade — redigera inte för');
out.push('// hand; generatorn ligger i .claude/np-figs/gen-ma3b-vt2022.js, koordinater beräknade).');
out.push('// Bara 3b-provets egna uppgifter. De lånade uppgifternas figurer kopieras in från');
out.push('// ma3c-vt2022 av härledningen i data/np/ma3b-vt2022.js, därför Object.assign.');
out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma3b-vt2022'] = Object.assign(window.NP_FIGURER['ma3b-vt2022'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma3b-vt2022-figurer.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
