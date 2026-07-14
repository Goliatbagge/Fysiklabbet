// Generator för data/np/fy2-vt2016-figurer.js — Kursprov Fysik 2 VT 2016.
// Alla koordinater beräknade. Kör: node gen-fy2vt2016.js
// Konventioner: ink #0f1620, accent #c8324a (krafter/markeringar),
// blå #1c5fa8 (hastigheter/fält 1), soft #3f4a5c. Kraftpilar: butt-cap,
// skaft slutar vid pilhuvudets bas, skalenliga längder.
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c5fa8';
const GRID = 'rgba(15,22,32,0.10)';
const GLASS = 'rgba(28,61,107,0.06)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2; // basfördröjning innan animation startar

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        (o.anim || '') + '/>';
}

// Kraft-/hastighetspil: butt-cap, skaftet slutar vid pilhuvudets BAS.
// o.anim = fördröjning (s): skaftet ritas (aDraw), huvudet tonas in strax efter.
function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const h = o.head || Math.max(9, Math.min(13, L * 0.5));
    const bx = x2 - ux * h, by = y2 - uy * h;
    const wh = h * 0.44, px = -uy, py = ux;
    const animLine = o.anim !== undefined ? aDraw(o.anim, 0.4) : (o.fade !== undefined ? aFade(o.fade) : '');
    const animHead = o.anim !== undefined ? aFade(o.anim + 0.25) : (o.fade !== undefined ? aFade(o.fade) : '');
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 2.6, cap: 'butt', dash: o.dash, anim: animLine }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"${animHead}/>`;
}

// Måttlinje med dubbelpil (pilhuvud i båda ändar).
function dim(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, h = o.head || 8, wh = h * 0.42;
    const px = -uy, py = ux;
    const c = o.c || INK, an = o.fade !== undefined ? aFade(o.fade) : '';
    const headAt = (tx, ty, sx, sy) =>
        `<polygon points="${A(tx + sx * h + px * wh)},${A(ty + sy * h + py * wh)} ${A(tx)},${A(ty)} ${A(tx + sx * h - px * wh)},${A(ty + sy * h - py * wh)}" fill="${c}"${an}/>`;
    return line(x1 + ux * h, y1 + uy * h, x2 - ux * h, y2 - uy * h, { c, w: o.w || 1.4, cap: 'butt', anim: an }) +
        headAt(x1, y1, ux, uy) + headAt(x2, y2, -ux, -uy);
}

function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 12.5}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.anim || '') + `>${s}</text>`;
}

// Variabel med nedsänkt index: kursiv bokstav + rakt/kursivt index.
const sub = (v, ix, o = {}) =>
    `<tspan font-style="italic">${v}</tspan><tspan font-size="${o.ixSize || 9}" dy="3">${ix}</tspan><tspan dy="-3"> ${o.rest || ''}</tspan>`;

const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${w} ${h}" width="${w}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const FIG = {};

/* ================= UPPGIFT 2 — pendel ================= */
(function () {
    const P = { x: 255, y: 38 }, R = 168;
    const angB = 42 * Math.PI / 180, angA = -55 * Math.PI / 180;
    const pt = a => ({ x: P.x + R * Math.sin(a), y: P.y + R * Math.cos(a) });
    const Bp = pt(angB), Ap = pt(angA), Np = pt(0);

    // Hängande figur vid en punkt (händerna i punkten).
    function figure(p, opts = {}) {
        const c = opts.c || INK, an = opts.anim || '', dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : '';
        const g = [];
        const hx = p.x, hy = p.y;
        g.push(`<line x1="${A(hx - 7)}" y1="${A(hy + 2)}" x2="${A(hx)}" y2="${A(hy + 16)}" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        g.push(`<line x1="${A(hx + 7)}" y1="${A(hy + 2)}" x2="${A(hx)}" y2="${A(hy + 16)}" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        g.push(`<circle cx="${A(hx)}" cy="${A(hy + 23)}" r="6.5" fill="none" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        g.push(`<line x1="${A(hx)}" y1="${A(hy + 29.5)}" x2="${A(hx)}" y2="${A(hy + 52)}" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        g.push(`<line x1="${A(hx)}" y1="${A(hy + 52)}" x2="${A(hx - 8)}" y2="${A(hy + 68)}" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        g.push(`<line x1="${A(hx)}" y1="${A(hy + 52)}" x2="${A(hx + 7)}" y2="${A(hy + 69)}" stroke="${c}" stroke-width="2"${dash}${an}/>`);
        return g.join('');
    }

    function base(withGhost) {
        const g = [];
        // takfäste
        g.push(line(P.x - 22, P.y - 8, P.x + 22, P.y - 8, { w: 2.2 }));
        for (let i = -18; i <= 18; i += 9) g.push(line(P.x + i, P.y - 8, P.x + i - 6, P.y - 16, { w: 1.1, c: SOFT }));
        g.push(`<circle cx="${P.x}" cy="${P.y}" r="3" fill="${INK}"/>`);
        // streckad pendelbana A → botten → B
        g.push(`<path d="M ${A(Ap.x)} ${A(Ap.y)} A ${R} ${R} 0 0 0 ${A(Bp.x)} ${A(Bp.y)}" fill="none" stroke="${SOFT}" stroke-width="1.3" stroke-dasharray="5 5"/>`);
        // streckat rep till A, heldraget till B
        g.push(line(P.x, P.y, Ap.x, Ap.y, { c: SOFT, w: 1.2, dash: '5 5' }));
        g.push(line(P.x, P.y, Bp.x, Bp.y, { w: 2 }));
        g.push(`<circle cx="${A(Ap.x)}" cy="${A(Ap.y)}" r="3" fill="${INK}"/>`);
        g.push(txt(Ap.x - 14, Ap.y - 4, 'A', { size: 14 }));
        g.push(txt(Bp.x + 16, Bp.y - 6, 'B', { size: 14 }));
        g.push(figure(Bp));
        if (withGhost) {
            g.push(figure(Np, { c: SOFT, dash: '3 3' }));
            g.push(txt(Np.x - 14, Np.y + 78, 'nedersta läget', { size: 10.5, fill: SOFT, anchor: 'end' }));
        }
        return g;
    }

    FIG['u2'] = svg(430, 300, base(false).join(''));

    // Tyngdpunkter (mitt på kroppen)
    const cmB = { x: Bp.x, y: Bp.y + 38 }, cmN = { x: Np.x, y: Np.y + 38 };
    const FG = 46; // px-längd för F_G

    // s1: tyngdkraften ritas ut i båda lägena
    (function () {
        const g = base(true);
        g.push(`<circle cx="${A(cmB.x)}" cy="${A(cmB.y)}" r="2.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(arrow(cmB.x, cmB.y, cmB.x, cmB.y + FG, { c: RED, anim: BAS }));
        g.push(txt(cmB.x + 10, cmB.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        g.push(`<circle cx="${A(cmN.x)}" cy="${A(cmN.y)}" r="2.6" fill="${RED}"${aFade(BAS + 0.7)}/>`);
        g.push(arrow(cmN.x, cmN.y, cmN.x, cmN.y + FG, { c: RED, anim: BAS + 0.7 }));
        g.push(txt(cmN.x + 10, cmN.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
        FIG['u2-s1'] = svg(430, 340, g.join(''));
    })();

    // s2: spännkraften läggs till (skalenligt: B: F_G·cos42 ≈ 0,74·F_G; botten: större än F_G)
    (function () {
        const g = base(true);
        // F_G statiska
        g.push(`<circle cx="${A(cmB.x)}" cy="${A(cmB.y)}" r="2.6" fill="${RED}"/>`);
        g.push(arrow(cmB.x, cmB.y, cmB.x, cmB.y + FG, { c: RED }));
        g.push(txt(cmB.x + 10, cmB.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start' }));
        g.push(`<circle cx="${A(cmN.x)}" cy="${A(cmN.y)}" r="2.6" fill="${RED}"/>`);
        g.push(arrow(cmN.x, cmN.y, cmN.x, cmN.y + FG, { c: RED }));
        g.push(txt(cmN.x + 10, cmN.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start' }));
        // F_S vid B: längs repet mot P, längd F_G·cos42
        const LS = FG * Math.cos(angB);
        const uB = { x: (P.x - Bp.x) / R, y: (P.y - Bp.y) / R };
        g.push(arrow(Bp.x, Bp.y, Bp.x + uB.x * LS, Bp.y + uB.y * LS, { c: BLUE, anim: BAS }));
        g.push(txt(Bp.x + uB.x * LS - 16, Bp.y + uB.y * LS + 12, sub('F', 'S'), { fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.4) }));
        // F_S i botten: rakt upp, längd F_G·1,3
        const LSN = FG * 1.3;
        g.push(arrow(Np.x, Np.y, Np.x, Np.y - LSN, { c: BLUE, anim: BAS + 0.7 }));
        g.push(txt(Np.x + 9, Np.y - LSN - 5, sub('F', 'S'), { fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.1) }));
        FIG['u2-s2'] = svg(430, 340, g.join(''));
    })();

    // s3: jämförelsen + fartpil i botten
    (function () {
        const g = base(true);
        const LS = FG * Math.cos(angB), LSN = FG * 1.3;
        const uB = { x: (P.x - Bp.x) / R, y: (P.y - Bp.y) / R };
        g.push(`<circle cx="${A(cmB.x)}" cy="${A(cmB.y)}" r="2.6" fill="${RED}"/>`);
        g.push(arrow(cmB.x, cmB.y, cmB.x, cmB.y + FG, { c: RED }));
        g.push(txt(cmB.x + 10, cmB.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start' }));
        g.push(`<circle cx="${A(cmN.x)}" cy="${A(cmN.y)}" r="2.6" fill="${RED}"/>`);
        g.push(arrow(cmN.x, cmN.y, cmN.x, cmN.y + FG, { c: RED }));
        g.push(txt(cmN.x + 10, cmN.y + FG + 4, sub('F', 'G'), { fill: RED, anchor: 'start' }));
        g.push(arrow(Bp.x, Bp.y, Bp.x + uB.x * LS, Bp.y + uB.y * LS, { c: BLUE }));
        g.push(arrow(Np.x, Np.y, Np.x, Np.y - LSN, { c: BLUE }));
        // fartpil i botten + noteringskolumn i fri yta nere till höger
        g.push(arrow(cmN.x + 16, cmN.y + 26, cmN.x + 60, cmN.y + 26, { c: BLUE, anim: BAS + 0.6 }));
        g.push(txt(Np.x - 16, Np.y - LSN + 6, `${sub('F', 'S')} störst`, { fill: BLUE, anchor: 'end', size: 11.5, anim: aFade(BAS + 1.4) }));
        g.push(txt(330, 272, `I läge B: <tspan font-style="italic">v</tspan> = 0`, { fill: BLUE, anchor: 'start', size: 11.5, anim: aFade(BAS) }));
        g.push(txt(330, 290, `och ${sub('F', 'S')} &lt; ${sub('F', 'G')}`, { fill: SOFT, anchor: 'start', size: 11.5, anim: aFade(BAS) }));
        g.push(txt(330, 316, `Längst ner: <tspan font-style="italic">v</tspan> störst`, { fill: BLUE, anchor: 'start', size: 11.5, anim: aFade(BAS + 1) }));
        FIG['u2-s3'] = svg(430, 340, g.join(''));
    })();
})();

/* ================= UPPGIFT 3 — rödförskjutet spektrum ================= */
(function () {
    const W = 470, H = 260;
    const x0 = 55, x1 = 440, y0 = 205, y1 = 30; // plottyta
    const lMin = 388, lMax = 408;
    const X = l => x0 + (l - lMin) / (lMax - lMin) * (x1 - x0);
    const Y = v => y0 - v * (y0 - y1); // v i 0..1
    const caK = 393.4, caH = 396.8, shift = 3.2; // förskjutning i nm
    const d1 = caK + shift, d2 = caH + shift;

    function curve() {
        const pts = [];
        for (let l = lMin; l <= lMax; l += 0.1) {
            let base = l < 399 ? 0.5 : 0.5 + 0.22 * Math.min(1, (l - 399) / 3);
            base += 0.03 * Math.sin(l * 2.1) + 0.02 * Math.sin(l * 3.7);
            const dip = 0.32 * Math.exp(-(((l - d1) / 0.55) ** 2)) + 0.30 * Math.exp(-(((l - d2) / 0.55) ** 2));
            pts.push(`${A(X(l))},${A(Y(Math.max(0.05, base - dip)))}`);
        }
        return `<polyline points="${pts.join(' ')}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
    }

    function base(extra) {
        const g = [];
        g.push(arrow(x0, y0, x0, y1 - 8, { w: 1.6, head: 9 }));
        g.push(arrow(x0 - 20, y0, x1 + 4, y0, { w: 1.6, head: 9 }));
        for (let l = 390; l <= 405; l += 5) {
            g.push(line(X(l), y0, X(l), y0 + 4, { w: 1.1 }));
            g.push(txt(X(l), y0 + 16, String(l), { size: 10.5 }));
        }
        g.push(txt(x0 + 8, y1 - 2, 'Relativ intensitet', { size: 11, anchor: 'start', fill: SOFT }));
        g.push(txt(x1, y0 + 32, 'Våglängd (nm)', { size: 11, anchor: 'end', fill: SOFT }));
        // streckade linjer vid uppmätta dippar
        g.push(line(X(d1), Y(0.22), X(d1), y0, { c: INK, w: 1.1, dash: '4 4' }));
        g.push(line(X(d2), Y(0.24), X(d2), y0, { c: INK, w: 1.1, dash: '4 4' }));
        // pilar + etiketter för labbvåglängderna
        g.push(arrow(X(caK), y0 + 42, X(caK), y0 + 6, { w: 1.6, head: 8 }));
        g.push(arrow(X(caH), y0 + 42, X(caH), y0 + 6, { w: 1.6, head: 8 }));
        g.push(txt(X(caK) - 4, y0 + 54, 'Ca K', { size: 11 }));
        g.push(txt(X(caH) + 6, y0 + 54, 'Ca H', { size: 11 }));
        g.push(curve());
        if (extra) g.push(extra);
        return svg(W, H + 15, g.join(''));
    }

    FIG['u3'] = base('');

    // s1: förskjutningspilar Δλ
    const yA = Y(0.16);
    FIG['u3-s1'] = base(
        arrow(X(caK), yA, X(d1) - 2, yA, { c: RED, w: 2.2, anim: BAS }) +
        arrow(X(caH), yA - 22, X(d2) - 2, yA - 22, { c: RED, w: 2.2, anim: BAS + 0.4 }) +
        line(X(caK), yA - 6, X(caK), yA + 6, { c: RED, w: 1.4, anim: aFade(BAS) }) +
        line(X(caH), yA - 28, X(caH), yA - 16, { c: RED, w: 1.4, anim: aFade(BAS + 0.4) }) +
        txt(X(d1) + 8, yA + 4, 'Δ<tspan font-style="italic">λ</tspan>', { fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }) +
        txt(x1 - 4, 52, 'linjerna förskjutna mot', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.1) }) +
        txt(x1 - 4, 67, 'längre våglängd (rött)', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.1) })
    );
})();

/* ================= UPPGIFT 4 — magnet faller genom ring ================= */
(function () {
    const g = [];
    const cx = 150, ringY = 150, rx = 78, ry = 17;
    // stavmagnet ovanför (faller)
    g.push(`<rect x="${cx - 11}" y="34" width="22" height="34" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
    g.push(`<rect x="${cx - 11}" y="68" width="22" height="34" fill="rgba(28,61,107,0.10)" stroke="${INK}" stroke-width="1.8"/>`);
    g.push(txt(cx, 56, 'N', { size: 12.5 }));
    g.push(txt(cx, 90, 'S', { size: 12.5 }));
    // fallpil
    g.push(arrow(cx + 30, 44, cx + 30, 92, { c: SOFT, w: 2.2 }));
    g.push(txt(cx + 40, 72, 'faller', { size: 11, fill: SOFT, anchor: 'start' }));
    // ring (horisontell, i perspektiv) — bakre halva bakom magneten
    g.push(`<path d="M ${cx - rx} ${ringY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${ringY}" fill="none" stroke="${INK}" stroke-width="2.4"/>`);
    g.push(`<path d="M ${cx - rx} ${ringY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${ringY}" fill="none" stroke="${INK}" stroke-width="2.4"/>`);
    g.push(txt(cx + rx + 10, ringY + 4, 'metallring', { size: 11, fill: SOFT, anchor: 'start' }));
    // inducerad ström: pil längs ringens framkant
    g.push(`<path d="M ${cx - 40} ${A(ringY + ry * 0.88)} A ${rx} ${ry} 0 0 0 ${cx + 40} ${A(ringY + ry * 0.88)}" fill="none" stroke="${RED}" stroke-width="2.2"${aDraw(BAS, 0.6)}/>`);
    g.push(`<polygon points="${cx + 40},${A(ringY + ry * 0.88 + 5)} ${cx + 52},${A(ringY + ry * 0.82)} ${cx + 38},${A(ringY + ry * 0.88 - 6)}" fill="${RED}"${aFade(BAS + 0.5)}/>`);
    g.push(txt(cx - 50, ringY + 34, 'inducerad ström', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
    FIG['u4-s1'] = svg(330, 210, g.join(''));
})();

/* ================= UPPGIFT 5 — två ledare, fältsymboler ================= */
(function () {
    const W = 360, H = 330;
    const gx0 = 45, gy0 = 25, cell = 30, n = 9;
    const gx1 = gx0 + n * cell, gy1 = gy0 + n * cell;
    const cx = gx0 + 4.5 * cell, cy = gy0 + 4.5 * cell; // skärningspunkt (mitt)

    // symbol: fält ut ur planet (punkt) / in i planet (kryss)
    function dotSym(x, y, c, an) {
        return `<circle cx="${A(x)}" cy="${A(y)}" r="6.5" fill="none" stroke="${c}" stroke-width="1.5"${an || ''}/>` +
            `<circle cx="${A(x)}" cy="${A(y)}" r="1.8" fill="${c}"${an || ''}/>`;
    }
    function crossSym(x, y, c, an) {
        const d = 4.2;
        return `<circle cx="${A(x)}" cy="${A(y)}" r="6.5" fill="none" stroke="${c}" stroke-width="1.5"${an || ''}/>` +
            line(x - d, y - d, x + d, y + d, { c, w: 1.5, anim: an }) +
            line(x - d, y + d, x + d, y - d, { c, w: 1.5, anim: an });
    }

    function base() {
        const g = [];
        for (let i = 0; i <= n; i++) {
            g.push(line(gx0 + i * cell, gy0, gx0 + i * cell, gy1, { c: GRID, w: 1 }));
            g.push(line(gx0, gy0 + i * cell, gx1, gy0 + i * cell, { c: GRID, w: 1 }));
        }
        // vågrät ledare med ström åt höger
        g.push(line(gx0 - 20, cy, gx1 + 20, cy, { w: 2.6 }));
        g.push(`<polygon points="${cx - 68},${cy - 6} ${cx - 52},${cy} ${cx - 68},${cy + 6}" fill="${INK}"/>`);
        g.push(txt(cx - 74, cy - 12, 'I', { italic: true, size: 13 }));
        // lodrät ledare med ström uppåt
        g.push(line(cx, gy1 + 20, cx, gy0 - 20, { w: 2.6 }));
        g.push(`<polygon points="${cx - 6},${cy + 68} ${cx},${cy + 52} ${cx + 6},${cy + 68}" fill="${INK}"/>`);
        g.push(txt(cx - 14, cy + 78, 'I', { italic: true, size: 13 }));
        return g;
    }

    FIG['u5'] = svg(W, H, base().join(''));

    // kvadrantankare (mitt i varje kvadrant)
    const q = {
        tr: { x: cx + 2.3 * cell, y: cy - 2.3 * cell },
        tl: { x: cx - 2.3 * cell, y: cy - 2.3 * cell },
        bl: { x: cx - 2.3 * cell, y: cy + 2.3 * cell },
        br: { x: cx + 2.3 * cell, y: cy + 2.3 * cell },
    };

    // s1: fältet från den vågräta ledaren (blått): ovanför ⊙, nedanför ⊗
    (function () {
        const g = base();
        g.push(dotSym(q.tl.x - 16, q.tl.y, BLUE, aFade(BAS)));
        g.push(dotSym(q.tr.x - 16, q.tr.y, BLUE, aFade(BAS)));
        g.push(crossSym(q.bl.x - 16, q.bl.y, BLUE, aFade(BAS + 0.5)));
        g.push(crossSym(q.br.x - 16, q.br.y, BLUE, aFade(BAS + 0.5)));
        g.push(txt(gx1 + 6, gy0 + 8, 'fält från den', { size: 10.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.8) }));
        g.push(txt(gx1 + 6, gy0 + 22, 'vågräta ledaren', { size: 10.5, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.8) }));
        FIG['u5-s1'] = svg(W, H, g.join(''));
    })();

    // s2: fältet från den lodräta ledaren (rött): höger ⊗, vänster ⊙
    (function () {
        const g = base();
        g.push(dotSym(q.tl.x - 16, q.tl.y, BLUE));
        g.push(dotSym(q.tr.x - 16, q.tr.y, BLUE));
        g.push(crossSym(q.bl.x - 16, q.bl.y, BLUE));
        g.push(crossSym(q.br.x - 16, q.br.y, BLUE));
        g.push(crossSym(q.tr.x + 16, q.tr.y, RED, aFade(BAS)));
        g.push(crossSym(q.br.x + 16, q.br.y, RED, aFade(BAS)));
        g.push(dotSym(q.tl.x + 16, q.tl.y, RED, aFade(BAS + 0.5)));
        g.push(dotSym(q.bl.x + 16, q.bl.y, RED, aFade(BAS + 0.5)));
        g.push(txt(gx1 + 6, gy0 + 8, 'fält från den', { size: 10.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        g.push(txt(gx1 + 6, gy0 + 22, 'lodräta ledaren', { size: 10.5, fill: RED, anchor: 'end', anim: aFade(BAS + 0.8) }));
        FIG['u5-s2'] = svg(W, H, g.join(''));
    })();

    // s3: motriktade i tr och bl → linjen y = x ritas
    (function () {
        const g = base();
        g.push(dotSym(q.tl.x - 16, q.tl.y, BLUE)); g.push(dotSym(q.tr.x - 16, q.tr.y, BLUE));
        g.push(crossSym(q.bl.x - 16, q.bl.y, BLUE)); g.push(crossSym(q.br.x - 16, q.br.y, BLUE));
        g.push(crossSym(q.tr.x + 16, q.tr.y, RED)); g.push(crossSym(q.br.x + 16, q.br.y, RED));
        g.push(dotSym(q.tl.x + 16, q.tl.y, RED)); g.push(dotSym(q.bl.x + 16, q.bl.y, RED));
        // diagonalen (y = x): nere till vänster → uppe till höger
        g.push(line(gx0 + 0.5 * cell, gy1 - 0.5 * cell, gx1 - 0.5 * cell, gy0 + 0.5 * cell, { c: RED, w: 2.4, anim: aDraw(BAS, 0.7) }));
        g.push(txt(gx1 - 0.4 * cell, gy0 + 0.2 * cell, `<tspan font-style="italic">B</tspan> = 0`, { fill: RED, anchor: 'end', size: 12, anim: aFade(BAS + 0.8) }));
        FIG['u5-s3'] = svg(W, H, g.join(''));
    })();
})();

/* ================= UPPGIFT 7 — brytning i halvcirkel ================= */
(function () {
    const W = 450, H = 315;
    const M = { x: 230, y: 195 }, R = 130;

    function ray(theta, label, o = {}) {
        // infallande stråle ovanifrån, vinkel theta (grader) från normalen (uppåt), från vänster
        const t = theta * Math.PI / 180;
        const dir = { x: -Math.sin(t), y: -Math.cos(t) };
        const p1 = { x: M.x + dir.x * (R + 55), y: M.y + dir.y * (R + 55) };
        const g = [];
        const c = o.c || INK, w = o.w || 1.7;
        g.push(line(p1.x, p1.y, M.x, M.y, { c, w }));
        // pilhuvud en bit in på strålen
        const hp = { x: M.x + dir.x * (R + 14), y: M.y + dir.y * (R + 14) };
        const u = { x: -dir.x, y: -dir.y }, ph = 9, wh = 4;
        g.push(`<polygon points="${A(hp.x - u.x * ph - u.y * wh)},${A(hp.y - u.y * ph + u.x * wh)} ${A(hp.x)},${A(hp.y)} ${A(hp.x - u.x * ph + u.y * wh)},${A(hp.y - u.y * ph - u.x * wh)}" fill="${c}"/>`);
        g.push(txt(p1.x - 8, p1.y - 4, label, { size: 13, fill: c, anchor: 'end' }));
        return g.join('');
    }

    function arc(theta, r, label, o = {}) {
        // vinkelbåge från normalen (rakt upp) till strålriktningen, medelpunkt M
        const t = theta * Math.PI / 180;
        const pA = { x: M.x, y: M.y - r };
        const pB = { x: M.x - r * Math.sin(t), y: M.y - r * Math.cos(t) };
        const c = o.c || SOFT;
        // från normal (vinkel 0) till −theta: minskande vinkel → sweep 0
        const gArc = `<path d="M ${A(pA.x)} ${A(pA.y)} A ${r} ${r} 0 0 0 ${A(pB.x)} ${A(pB.y)}" fill="none" stroke="${c}" stroke-width="1.2"/>`;
        // etiketten strax till höger om normalen, vid bågens överkant (fri yta)
        return gArc + txt(M.x + 8, M.y - r + 4, label, { size: 11, fill: c, anchor: 'start' });
    }

    function base(hl) {
        // hl = true: markera C och D i accent
        const g = [];
        // glaskropp
        g.push(`<path d="M ${M.x - R} ${M.y} A ${R} ${R} 0 0 1 ${M.x + R} ${M.y} Z" fill="${GLASS}" stroke="${INK}" stroke-width="1.8"/>`);
        // normal (streckad lodrät)
        g.push(line(M.x, M.y - R - 62, M.x, M.y + 105, { c: SOFT, w: 1, dash: '5 4' }));
        // strålar
        g.push(ray(60, 'A'));
        g.push(ray(45, 'B'));
        g.push(ray(26, 'C', hl ? { c: RED, w: 2.2 } : {}));
        // vinkelbågar (26 innerst? nej — större radie för mindre vinkel så etiketterna får plats)
        g.push(arc(60, 58, '60°'));
        g.push(arc(45, 84, '45°'));
        g.push(arc(26, 112, '26°', hl ? { c: RED } : {}));
        // bruten stråle D (nedåt höger, 38,3° från normalen)
        const tD = 38.3 * Math.PI / 180;
        const dD = { x: Math.sin(tD), y: Math.cos(tD) };
        const pD = { x: M.x + dD.x * 118, y: M.y + dD.y * 118 };
        const cD = hl ? RED : INK;
        g.push(arrow(M.x, M.y, pD.x, pD.y, { c: cD, w: hl ? 2.2 : 1.7, head: 10 }));
        g.push(txt(pD.x + 10, pD.y + 2, 'D', { size: 13, fill: cD, anchor: 'start' }));
        // vinkelbåge för D: från nedre normalen till D-strålen (ökande vinkel → sweep 1)
        const rD = 62;
        const pA2 = { x: M.x, y: M.y + rD };
        const pB2 = { x: M.x + rD * Math.sin(tD), y: M.y + rD * Math.cos(tD) };
        g.push(`<path d="M ${A(pA2.x)} ${A(pA2.y)} A ${rD} ${rD} 0 0 0 ${A(pB2.x)} ${A(pB2.y)}" fill="none" stroke="${hl ? RED : SOFT}" stroke-width="1.2"/>`);
        const tb2 = tD / 2;
        g.push(txt(M.x + (rD + 30) * Math.sin(tb2) - 4, M.y + (rD + 30) * Math.cos(tb2) + 4, '38,3°', { size: 11, fill: hl ? RED : SOFT, anchor: 'end' }));
        // medium-etiketter
        g.push(txt(M.x - R - 12, M.y - 26, 'luft', { size: 12, fill: SOFT, anchor: 'end' }));
        g.push(txt(M.x - R + 26, M.y + 22, 'luft', { size: 12, fill: SOFT }));
        g.push(txt(M.x + R - 34, M.y - 30, 'material', { size: 12, fill: SOFT }));
        return g;
    }

    FIG['u7'] = svg(W, H, base(false).join(''));

    (function () {
        const g = base(true);
        g.push(txt(M.x + 96, M.y - R - 20, '26° &lt; 38,3° — C hör ihop med D', { size: 11.5, fill: RED, anim: aFade(BAS) }));
        FIG['u7-s1'] = svg(W, H, g.join(''));
    })();
})();

/* ================= UPPGIFT 8 — pendeluppställning ================= */
(function () {
    const g = [];
    const rodX = 62, baseY = 234, armY = 50;
    const hang = { x: 205, y: armY + 4 };
    const L = 140, bobR = 13;
    const bob = { x: hang.x, y: hang.y + L };
    // stativ
    g.push(`<rect x="${rodX - 26}" y="${baseY}" width="120" height="8" fill="rgba(15,22,32,0.14)" stroke="${INK}" stroke-width="1.4"/>`);
    g.push(line(rodX, baseY, rodX, armY, { w: 3 }));
    g.push(line(rodX, armY, hang.x + 12, armY, { w: 3 }));
    g.push(line(hang.x, armY, hang.x, hang.y, { w: 1.4 }));
    // svängningsbåge (litet utslag)
    const swing = 22 * Math.PI / 180;
    const pS = { x: hang.x - L * Math.sin(swing), y: hang.y + L * Math.cos(swing) };
    const pE = { x: hang.x + L * Math.sin(swing), y: hang.y + L * Math.cos(swing) };
    g.push(`<path d="M ${A(pS.x)} ${A(pS.y)} A ${L} ${L} 0 0 0 ${A(pE.x)} ${A(pE.y)}" fill="none" stroke="${SOFT}" stroke-width="1.1" stroke-dasharray="4 4"/>`);
    g.push(line(hang.x, hang.y, pS.x, pS.y, { c: SOFT, w: 1, dash: '4 4' }));
    // snöre + kula
    g.push(line(hang.x, hang.y, bob.x, bob.y - bobR, { w: 1.6 }));
    g.push(`<circle cx="${bob.x}" cy="${bob.y}" r="${bobR}" fill="rgba(28,61,107,0.10)" stroke="${INK}" stroke-width="1.8"/>`);
    g.push(`<circle cx="${bob.x}" cy="${bob.y}" r="2.4" fill="${INK}"/>`);
    g.push(txt(bob.x - bobR - 10, bob.y + 26, 'metallkula', { size: 11, fill: SOFT, anchor: 'end' }));
    g.push(txt(hang.x + 10, hang.y - 10, 'upphängning', { size: 11, fill: SOFT, anchor: 'start' }));
    // måttlinje l: från upphängning till kulans MITT (tyngdpunkt)
    const mx = hang.x + 64;
    g.push(line(hang.x + 4, hang.y, mx + 8, hang.y, { c: SOFT, w: 1, dash: '3 3' }));
    g.push(line(bob.x + bobR + 2, bob.y, mx + 8, bob.y, { c: SOFT, w: 1, dash: '3 3' }));
    g.push(dim(mx, hang.y, mx, bob.y, {}));
    g.push(txt(mx + 12, (hang.y + bob.y) / 2 + 4, 'l', { italic: true, size: 14, anchor: 'start' }));
    g.push(txt(mx + 24, (hang.y + bob.y) / 2 + 4, '(till kulans mitt)', { size: 10.5, fill: SOFT, anchor: 'start' }));
    FIG['u8-s1'] = svg(400, 260, g.join(''));
})();

/* ================= UPPGIFT 9 — energistaplar (fotoelektrisk) ================= */
(function () {
    const g = [];
    const y0 = 190, scale = 15; // px per 10^-19 J
    const Ef = 9.94, Eu = 6.63, Ek = 3.31;
    const b1 = { x: 80, w: 58 }, b2 = { x: 230, w: 58 };
    // stapel 1: fotonens energi
    g.push(`<rect x="${b1.x}" y="${A(y0 - Ef * scale)}" width="${b1.w}" height="${A(Ef * scale)}" fill="rgba(28,95,168,0.15)" stroke="${BLUE}" stroke-width="1.8"/>`);
    g.push(txt(b1.x + b1.w / 2, y0 + 18, 'fotonens energi', { size: 11 }));
    g.push(txt(b1.x + b1.w / 2, y0 - Ef * scale - 10, `${sub('E', 'foton')}`, { size: 12.5, fill: BLUE }));
    // likhetstecken
    g.push(txt((b1.x + b1.w + b2.x) / 2, y0 - 60, '=', { size: 20 }));
    // stapel 2: E_U (nederst) + E_k (överst), tonas in i tur och ordning
    g.push(`<rect x="${b2.x}" y="${A(y0 - Eu * scale)}" width="${b2.w}" height="${A(Eu * scale)}" fill="rgba(63,74,92,0.12)" stroke="${SOFT}" stroke-width="1.8"${aFade(BAS)}/>`);
    g.push(txt(b2.x + b2.w + 10, y0 - Eu * scale / 2 + 4, `${sub('E', 'U')} = 6,63 · 10<tspan font-size="9" dy="-4">−19</tspan><tspan dy="4"> J</tspan>`, { size: 11.5, fill: SOFT, anchor: 'start', anim: aFade(BAS + 0.3) }));
    g.push(`<rect x="${b2.x}" y="${A(y0 - Ef * scale)}" width="${b2.w}" height="${A(Ek * scale)}" fill="rgba(200,50,74,0.14)" stroke="${RED}" stroke-width="1.8"${aFade(BAS + 0.8)}/>`);
    g.push(txt(b2.x + b2.w + 10, y0 - (Eu + Ek / 2) * scale + 4, `${sub('E', 'k')} = 3,3 · 10<tspan font-size="9" dy="-4">−19</tspan><tspan dy="4"> J</tspan>`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
    g.push(txt(b2.x + b2.w / 2, y0 + 18, 'utträdesarbete + rörelseenergi', { size: 11 }));
    // baslinje
    g.push(line(50, y0, 420, y0, { w: 1.6 }));
    FIG['u9-s1'] = svg(460, 225, g.join(''));
})();

/* ================= UPPGIFT 10 — solspektrum ================= */
(function () {
    const W = 500, H = 305;
    const x0 = 60, x1 = 470, y0 = 245, y1 = 35;
    const lMin = 280, lMax = 860;
    const X = l => x0 + (l - lMin) / (lMax - lMin) * (x1 - x0);
    const Y = v => y0 - v / 62 * (y0 - y1); // v i %
    const basePts = [[300, 1], [340, 3], [370, 12], [395, 26], [420, 40], [445, 50], [470, 55.5], [495, 57], [520, 55.5], [550, 53], [580, 49.5], [610, 44.5], [640, 39.5], [670, 33], [700, 27.5], [730, 22.5], [760, 18.5], [790, 13.5], [820, 10.5], [850, 9]];
    function baseVal(l) {
        // linjär interpolation
        for (let i = 0; i < basePts.length - 1; i++) {
            const [l1, v1] = basePts[i], [l2, v2] = basePts[i + 1];
            if (l >= l1 && l <= l2) return v1 + (v2 - v1) * (l - l1) / (l2 - l1);
        }
        return l < 300 ? 0.5 : 9;
    }
    const dips = [[410, 9, 2.2], [434, 10, 2.2], [486, 13, 2.6], [527, 6, 2], [589, 6, 2], [656, 10, 2.6], [761, 7, 2.4]];
    function val(l) {
        let v = baseVal(l);
        for (const [c, d, s] of dips) v -= d * Math.exp(-(((l - c) / s) ** 2));
        return Math.max(0.3, v);
    }
    function curve() {
        const pts = [];
        for (let l = 300; l <= 850; l += 1.5) pts.push(`${A(X(l))},${A(Y(val(l)))}`);
        return `<polyline points="${pts.join(' ')}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    }
    function base(extra) {
        const g = [];
        // rutnät
        for (let l = 300; l <= 850; l += 50) g.push(line(X(l), y0, X(l), y1, { c: GRID, w: 1 }));
        for (let v = 10; v <= 60; v += 10) g.push(line(x0, Y(v), x1, Y(v), { c: GRID, w: 1 }));
        g.push(arrow(x0, y0, x0, y1 - 10, { w: 1.6, head: 9 }));
        g.push(arrow(x0, y0, x1 + 10, y0, { w: 1.6, head: 9 }));
        for (let l = 300; l <= 850; l += 50) g.push(txt(X(l), y0 + 16, String(l), { size: 10 }));
        for (let v = 10; v <= 60; v += 10) g.push(txt(x0 - 8, Y(v) + 4, String(v), { size: 10, anchor: 'end' }));
        g.push(txt(x0 + 6, y1 - 14, 'Relativ spektral emittans (%)', { size: 11, fill: SOFT, anchor: 'start' }));
        g.push(txt(x1, y0 + 32, 'Våglängd (nm)', { size: 11, fill: SOFT, anchor: 'end' }));
        g.push(curve());
        if (extra) g.push(extra);
        return svg(W, H, g.join(''));
    }
    FIG['u10'] = base('');

    // s1: avläsning av λ_max ≈ 500 nm
    FIG['u10-s1'] = base(
        line(X(500), Y(val(500)) - 4, X(500), y0, { c: RED, w: 1.6, dash: '5 4', anim: aFade(BAS) }) +
        txt(X(500) + 8, Y(57) - 12, `${sub('λ', 'max')} ≈ 500 nm`, { fill: RED, anchor: 'start', anim: aFade(BAS + 0.5) })
    );

    // s2: vätets Balmerlinjer markerade vid dipparna
    (function () {
        const hl = [[656, '656', 46], [486, '486', 46], [434, '434', 66], [410, '410', 46]];
        let ex = '';
        hl.forEach(([l, lab, len], i) => {
            const d = BAS + i * 0.35;
            ex += arrow(X(l), Y(val(l)) - len, X(l), Y(val(l)) - 8, { c: RED, w: 1.8, head: 8, anim: d });
            ex += txt(X(l), Y(val(l)) - len - 8, lab, { size: 10.5, fill: RED, anim: aFade(d + 0.3) });
        });
        ex += txt(x1, y1 + 4, 'vätets absorptionslinjer (nm)', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.6) });
        FIG['u10-s2'] = base(ex);
    })();
})();

/* ================= UPPGIFT 12 — hopptorn ================= */
(function () {
    const W = 470, H = 285;
    const waterY = 205, poolL = 130, poolR = 410, scale = (poolR - poolL) / 12; // px per m
    const deckY = waterY - 5 * scale; // 5 m upp

    function diver(x, y, c) {
        // enkel simhoppare på språng (horisontell hållning)
        const g = [];
        g.push(`<circle cx="${A(x + 12)}" cy="${A(y - 4)}" r="5.5" fill="none" stroke="${c}" stroke-width="2"/>`);
        g.push(line(x - 10, y + 4, x + 7, y - 2, { c, w: 2 }));   // kropp
        g.push(line(x - 10, y + 4, x - 20, y + 12, { c, w: 2 })); // ben
        g.push(line(x + 4, y - 1, x + 10, y + 8, { c, w: 2 }));   // arm
        return g.join('');
    }

    function base() {
        const g = [];
        // torn (vänster om bassängen)
        g.push(`<rect x="${poolL - 58}" y="${A(deckY)}" width="58" height="${A(waterY - deckY)}" fill="rgba(15,22,32,0.06)" stroke="${INK}" stroke-width="1.6"/>`);
        for (let y = deckY + 22; y < waterY - 8; y += 22) g.push(line(poolL - 58, y, poolL, y, { c: GRID, w: 1 }));
        g.push(line(poolL - 62, deckY, poolL + 2, deckY, { w: 2.6 })); // plattform
        // räcke
        g.push(line(poolL - 58, deckY, poolL - 58, deckY - 26, { w: 1.4 }));
        g.push(line(poolL - 58, deckY - 26, poolL - 30, deckY - 26, { w: 1.4 }));
        // mark vänster + höger
        g.push(line(30, waterY, poolL - 58, waterY, { w: 2.2 }));
        g.push(line(poolR, waterY, W - 20, waterY, { w: 2.2 }));
        // bassäng
        g.push(line(poolL, waterY, poolL, waterY + 48, { w: 2 }));
        g.push(line(poolR, waterY, poolR, waterY + 48, { w: 2 }));
        g.push(line(poolL, waterY + 48, poolR, waterY + 48, { w: 1.2, c: SOFT }));
        // vattenyta (vågig)
        let wpts = '';
        for (let x = poolL + 3; x <= poolR - 3; x += 8) wpts += `${A(x)},${A(waterY + 6 + 2 * Math.sin(x / 9))} `;
        g.push(`<polyline points="${wpts.trim()}" fill="none" stroke="${BLUE}" stroke-width="1.3"/>`);
        // simhopparen + v-pil
        g.push(diver(poolL - 22, deckY - 12, INK));
        g.push(arrow(poolL + 2, deckY - 18, poolL + 46, deckY - 18, { c: BLUE, w: 2.4 }));
        g.push(txt(poolL + 54, deckY - 14, 'v', { italic: true, size: 13.5, fill: BLUE, anchor: 'start' }));
        // måttlinje 5 m (fri yta till vänster om tornet)
        const mx = poolL - 78;
        g.push(line(poolL - 62, deckY, mx - 6, deckY, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(dim(mx, deckY, mx, waterY, {}));
        g.push(txt(mx - 8, (deckY + waterY) / 2 + 4, '5 m', { size: 12, anchor: 'end' }));
        // måttlinje 12 m (under vattnet, fri yta)
        const my = waterY + 66;
        g.push(line(poolL, waterY + 50, poolL, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(line(poolR, waterY + 50, poolR, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(dim(poolL, my, poolR, my, {}));
        g.push(txt((poolL + poolR) / 2, my - 8, '12 m', { size: 12 }));
        return g;
    }

    FIG['u12'] = svg(W, H, base().join(''));

    // kritisk bana: start vid plattformskanten, träffar precis kanten på andra sidan
    const sx = poolL + 2, sy = deckY - 14;
    function traj() {
        const pts = [];
        for (let f = 0; f <= 1.0001; f += 0.04) {
            pts.push(`${A(sx + (poolR - sx) * f)} ${A(sy + (waterY - sy) * f * f)}`);
        }
        return 'M ' + pts.join(' L ');
    }

    // s1: rörelsen delas upp — banan ritas + y-led markeras
    (function () {
        const g = base();
        g.push(`<path d="${traj()}" fill="none" stroke="${SOFT}" stroke-width="1.6" stroke-dasharray="6 5"${aFade(BAS)}/>`);
        // y-led: fallpil vid tornet
        g.push(arrow(poolL + 40, deckY - 6, poolL + 40, waterY - 6, { c: RED, w: 2.4, anim: BAS + 0.5 }));
        g.push(txt(poolL + 50, (deckY + waterY) / 2, 'fritt fall 5,0 m', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(txt(poolL + 50, (deckY + waterY) / 2 + 16, 'ger tiden i luften', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
        FIG['u12-s1'] = svg(W, H, g.join(''));
    })();

    // s2: x-led — sträckan 12 m på 1,0 s
    (function () {
        const g = base();
        g.push(`<path d="${traj()}" fill="none" stroke="${SOFT}" stroke-width="1.6" stroke-dasharray="6 5"/>`);
        const ay = deckY - 40;
        g.push(arrow(sx, ay, poolR, ay, { c: BLUE, w: 2.4, anim: BAS }));
        g.push(txt((sx + poolR) / 2, ay - 10, '12 m på 1,0 s kräver <tspan font-style="italic">v</tspan> ≈ 12 m/s', { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.5) }));
        g.push(`<circle cx="${poolR}" cy="${waterY}" r="4" fill="${RED}"${aFade(BAS + 0.8)}/>`);
        g.push(txt(poolR + 8, waterY - 10, 'kanten', { size: 10.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
        FIG['u12-s2'] = svg(W, H, g.join(''));
    })();
})();

module.exports = { FIG, svg, line, arrow, dim, txt, sub, aDraw, aFade, A, BAS, INK, SOFT, RED, BLUE, GRID, GLASS };

// Om filen körs direkt och del 2 finns: bygg allt.
if (require.main === module) {
    const p2 = path.join(__dirname, 'gen-fy2vt2016-del2.js');
    if (fs.existsSync(p2)) {
        require(p2)(FIG);
    }
    const out = [];
    out.push('// Fysiklabbet — figurer till Kursprov Fysik 2 VT 2016 (genererade — redigera');
    out.push('// inte för hand; generatorn ligger i .claude/np-figs/gen-fy2vt2016.js (+ -del2.js),');
    out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
    out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
    out.push("window.NP_FIGURER['fy2-vt2016'] = {");
    for (const [k, v] of Object.entries(FIG)) {
        out.push(`  '${k}': ${JSON.stringify(v)},`);
    }
    out.push('};');
    fs.writeFileSync('C:\\claude\\Fysiklabbet\\data\\np\\fy2-vt2016-figurer.js', out.join('\n') + '\n');
    console.log('Figurer:', Object.keys(FIG).length, '->', Object.keys(FIG).join(', '));
}
