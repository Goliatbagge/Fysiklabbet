// Generator för data/np/fy1-vt2017-figurer-3.js: Kursprov Fysik 1 VT 2017,
// uppgift 17–21 (del 3). Alla koordinater beräknade. Kör: node gen-fy1-vt2017-3.js
// Konventioner som gen-fy2vt2016.js: ink #0f1620, accent #c8324a (krafter,
// markeringar), blå #1c5fa8 (hastigheter, avläst data), soft #3f4a5c.
// Pilar: butt-cap, skaftet slutar vid pilhuvudets bas. Kurvor samplas tätt
// ur sin funktion.
'use strict';
const fs = require('fs');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c5fa8';
const GRID = 'rgba(15,22,32,0.16)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        (o.anim || '') + '/>';
}
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
function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 12.5}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.tf ? ` transform="${o.tf}"` : '') + (o.anim || '') + `>${s}</text>`;
}
const sub = (v, ix, o = {}) =>
    `<tspan font-style="italic">${v}</tspan><tspan font-size="${o.ixSize || 9}" dy="3">${ix}</tspan><tspan dy="-3">${o.rest || '&#8203;'}</tspan>`;
const it = v => `<tspan font-style="italic">${v}</tspan>`;
const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${w} ${h}" width="${w}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const poly = (pts, o = {}) =>
    `<polyline points="${pts.map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="${o.fill || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
    (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.anim || '') + '/>';
const dec = (v, d) => v.toFixed(d).replace('.', ',');

const FIG = {};

/* ================= UPPGIFT 17: bollarna före och efter stöten ================= */
(function () {
    const W = 390, H = 300, R = 14;
    const paneX = 330;
    function ball(cx, cy, o = {}) {
        return `<circle cx="${A(cx)}" cy="${A(cy)}" r="${R}" fill="${o.fill || 'rgba(63,74,92,0.12)'}" stroke="${INK}" stroke-width="1.6"${o.anim || ''}/>`;
    }
    function pane(y0, y1) {
        return `<rect x="${paneX}" y="${y0}" width="9" height="${y1 - y0}" fill="rgba(28,95,168,0.12)" stroke="${SOFT}" stroke-width="1.2"/>`;
    }
    const g = [];
    const V1 = 66, V2 = 50;              // pilarnas längd i px (v₂ ≈ 0,75·v₁ för boll A)
    const rows = [{ name: 'Boll A', top: 18, studs: true }, { name: 'Boll B', top: 150, studs: false }];
    rows.forEach((r, i) => {
        const yF = r.top + 34, yE = r.top + 92;
        const d = BAS + i * 1.4;
        g.push(pane(r.top + 6, r.top + 118));
        g.push(txt(28, r.top + 66, r.name, { size: 14, anchor: 'start' }));
        g.push(txt(110, yF + 4, 'före', { size: 11, fill: SOFT, anchor: 'end' }));
        g.push(txt(110, yE + 4, 'efter', { size: 11, fill: SOFT, anchor: 'end' }));
        // före: bollen på väg mot rutan, v₁ från bollens högra kant
        const cxF = 200;
        g.push(ball(cxF, yF));
        g.push(arrow(cxF + R, yF, cxF + R + V1, yF, { c: BLUE, anim: d }));
        g.push(txt(cxF + R + V1 / 2, yF - 10, sub('v', '1'), { fill: BLUE, anim: aFade(d + 0.3) }));
        if (r.studs) {
            const cxE = paneX - R - 30;
            g.push(ball(cxE, yE, { anim: aFade(d + 0.6) }));
            g.push(arrow(cxE - R, yE, cxE - R - V2, yE, { c: BLUE, anim: d + 0.8 }));
            g.push(txt(cxE - R - V2 / 2, yE - 10, sub('v', '2'), { fill: BLUE, anim: aFade(d + 1.1) }));
            g.push(txt(cxE - R - V2 - 8, yE + 4, 'studsar tillbaka', { size: 11, fill: SOFT, anchor: 'end', anim: aFade(d + 1.1) }));
        } else {
            const cxE = paneX - R;
            g.push(ball(cxE, yE, { anim: aFade(d + 0.6) }));
            g.push(txt(cxE - R - 10, yE + 5, `${sub('v', '2')} = 0`, { fill: BLUE, anchor: 'end', anim: aFade(d + 0.8) }));
            g.push(txt(cxE - R - 70, yE + 5, 'stannar', { size: 11, fill: SOFT, anchor: 'end', anim: aFade(d + 0.8) }));
        }
    });
    // positiv riktning
    g.push(arrow(210, 284, 270, 284, { c: INK, w: 1.6, head: 9 }));
    g.push(txt(202, 288, 'positiv riktning', { size: 11, fill: SOFT, anchor: 'end' }));
    g.push(txt(paneX + 4.5, 296, 'glasruta', { size: 11, fill: SOFT }));
    FIG['u17-s1'] = svg(W, H, g.join(''));
})();

/* ================= UPPGIFT 17: kraft-tid-diagram ================= */
(function () {
    const W = 470, H = 270;
    const ox = 60, oy = 220, xEnd = 430, yTop = 26;
    // Pulser F(t) = h·sin²(πt/T). Arean = h·T/2.
    // Boll B: T_B = 230 px, h_B = 34 px  → area ∝ 34·230/2.
    // Boll A: |Δp_A| = 1,75·|Δp_B| (v₂ = 0,75·v₁), T_A = T_B/2,5 → h_A = 1,75·2,5·h_B.
    const TB = 230, hB = 34, TA = TB / 2.5, hA = hB * 1.75 * 2.5;
    function pulse(T, h) {
        const pts = [];
        for (let i = 0; i <= 120; i++) {
            const t = T * i / 120;
            pts.push([ox + t, oy - h * Math.sin(Math.PI * t / T) ** 2]);
        }
        return pts;
    }
    const g = [];
    g.push(arrow(ox, oy, xEnd, oy, { w: 1.6, head: 9 }));
    g.push(arrow(ox, oy, ox, yTop, { w: 1.6, head: 9 }));
    g.push(txt(ox - 10, yTop + 8, it('F'), { size: 14, anchor: 'end' }));
    g.push(txt(xEnd, oy + 20, it('t'), { size: 14, anchor: 'end' }));
    const pB = pulse(TB, hB), pA = pulse(TA, hA);
    g.push(`<polygon points="${pB.map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="rgba(28,95,168,0.14)" stroke="none"${aFade(BAS + 0.4)}/>`);
    g.push(poly(pB, { c: BLUE, w: 2, anim: aDraw(BAS, 0.8) }));
    g.push(`<polygon points="${pA.map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="rgba(200,50,74,0.14)" stroke="none"${aFade(BAS + 1.6)}/>`);
    g.push(poly(pA, { c: RED, w: 2, anim: aDraw(BAS + 1.2, 0.8) }));
    // etiketter i fri yta
    g.push(txt(ox + TA / 2 + 22, oy - hA + 8, 'boll A', { fill: RED, anchor: 'start', anim: aFade(BAS + 1.8) }));
    g.push(txt(ox + TB * 0.78, oy - hB - 10, 'boll B', { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.6) }));
    // kontakttider som måttlinjer under axeln
    function span(x1, x2, y, c, lab, d) {
        return line(x1, y - 4, x1, y + 4, { c, w: 1.4, anim: aFade(d) }) + line(x2, y - 4, x2, y + 4, { c, w: 1.4, anim: aFade(d) }) +
            line(x1, y, x2, y, { c, w: 1.4, anim: aFade(d) }) + txt(x2 + 6, y + 4, lab, { size: 11.5, fill: c, anchor: 'start', anim: aFade(d) });
    }
    g.push(span(ox, ox + TA, oy + 18, RED, `Δ${sub('t', 'A')}`, BAS + 2.0));
    g.push(span(ox, ox + TB, oy + 36, BLUE, `Δ${sub('t', 'B')}`, BAS + 2.2));
    g.push(txt(xEnd, 56, 'arean under kurvan = impulsen', { size: 11, fill: SOFT, anchor: 'end', anim: aFade(BAS + 2.4) }));
    FIG['u17-s2'] = svg(W, H, g.join(''));
})();

/* ================= UPPGIFT 18: försöksuppställningen ================= */
(function () {
    const W = 500, H = 320;
    const g = [];
    // golv/bänk
    g.push(line(20, 290, 480, 290, { w: 1.8 }));
    // vågen med den tomma ballongen
    const vx = 110;
    g.push(`<rect x="${vx - 60}" y="262" width="120" height="28" rx="4" fill="rgba(63,74,92,0.10)" stroke="${INK}" stroke-width="1.6"/>`);
    g.push(`<rect x="${vx - 26}" y="269" width="52" height="14" rx="2" fill="#fff" stroke="${SOFT}" stroke-width="1"/>`);
    g.push(txt(vx, 280, '3,4 g', { size: 10, fill: SOFT }));
    // tom ballong: liten skrynklig form på vågen
    g.push(`<path d="M ${vx - 30} 262 Q ${vx - 34} 246 ${vx - 14} 244 Q ${vx + 4} 236 ${vx + 18} 248 Q ${vx + 30} 252 ${vx + 26} 262 Z" fill="rgba(200,50,74,0.25)" stroke="${RED}" stroke-width="1.4"/>`);
    g.push(txt(vx, 228, 'tom ballong', { size: 11, fill: SOFT }));
    g.push(txt(vx, 212, sub('m', 'B'), { size: 13, fill: BLUE, anim: aFade(BAS) }));
    // fylld ballong som svävar
    const bx = 330, by = 92, br = 56;
    g.push(`<circle cx="${bx}" cy="${by}" r="${br}" fill="rgba(200,50,74,0.18)" stroke="${RED}" stroke-width="1.6"/>`);
    g.push(`<circle cx="${bx}" cy="${by + br + 3}" r="3.6" fill="${RED}"/>`);
    // snöre och vikter
    const sy0 = by + br + 6, sy1 = 236;
    g.push(line(bx, sy0, bx, sy1, { c: SOFT, w: 1.2 }));
    const wts = [[236, 12], [248, 12], [260, 12]];
    wts.forEach(([y, h]) => g.push(`<rect x="${bx - 11}" y="${y}" width="22" height="${h - 1}" rx="2" fill="rgba(15,22,32,0.55)" stroke="${INK}" stroke-width="1"/>`));
    g.push(txt(bx + 20, 256, sub('m', 'L'), { size: 13, fill: BLUE, anchor: 'start', anim: aFade(BAS + 1.3) }));
    g.push(txt(bx + 40, 256, '(vikter)', { size: 11, fill: SOFT, anchor: 'start', anim: aFade(BAS + 1.3) }));
    // måttband runt ballongens bredaste del: främre halvan heldragen, bakre streckad
    const ry = 11;
    const front = [], back = [];
    for (let i = 0; i <= 60; i++) {
        const a = Math.PI * i / 60;
        front.push([bx + br * Math.cos(a), by + ry * Math.sin(a)]);
        back.push([bx + br * Math.cos(a), by - ry * Math.sin(a)]);
    }
    g.push(poly(back, { c: BLUE, w: 1.6, dash: '4 3', anim: aFade(BAS + 0.6) }));
    g.push(poly(front, { c: BLUE, w: 2.6, anim: aDraw(BAS + 0.5, 0.6) }));
    g.push(txt(bx + br + 10, by + 4, `omkrets ${it('O')}`, { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.9) }));
    g.push(txt(bx + br + 10, by + 22, 'mäts med måttband', { size: 11, fill: SOFT, anchor: 'start', anim: aFade(BAS + 0.9) }));
    g.push(txt(bx, 310, 'ballongen svävar: varken stiger eller sjunker', { size: 11, fill: SOFT, anim: aFade(BAS + 1.6) }));
    FIG['u18-s1'] = svg(W, H, g.join(''));
})();

/* ================= UPPGIFT 18: diagrammet som testar modellen ================= */
(function () {
    const W = 500, H = 320;
    const ox = 70, oy = 232, kx = 12, ky = 6.4; // px per dm³, px per g
    const X = v => ox + v * kx, Y = m => oy - m * ky;
    const g = [];
    for (let v = 10; v <= 30; v += 10) g.push(line(X(v), Y(0), X(v), Y(32), { c: GRID, w: 1 }));
    for (let m = 10; m <= 30; m += 10) g.push(line(X(0), Y(m), X(32), Y(m), { c: GRID, w: 1 }));
    g.push(arrow(ox, oy, X(34), oy, { w: 1.6, head: 9 }));
    g.push(arrow(ox, Y(-8), ox, Y(34), { w: 1.6, head: 9 }));
    for (let v = 10; v <= 30; v += 10) {
        g.push(line(X(v), oy - 4, X(v), oy + 4, { w: 1.2 }));
        g.push(txt(X(v), oy + 17, String(v), { size: 11 }));
    }
    for (let m = 10; m <= 30; m += 10) {
        g.push(line(ox - 4, Y(m), ox + 4, Y(m), { w: 1.2 }));
        g.push(txt(ox - 8, Y(m) + 4, String(m), { size: 11, anchor: 'end' }));
    }
    g.push(txt(ox + 8, Y(34) + 4, `${sub('m', 'L')} (g)`, { anchor: 'start' }));
    g.push(txt(X(34), oy + 34, `${sub('V', 'B')} (dm³)`, { anchor: 'end' }));
    // tänkta mätpunkter (m_L = 1,11·V − 4 med små mätfel)
    const pts = [[8, 5.2], [12, 8.9], [16, 14.0], [20, 17.9], [24, 23.0], [28, 26.9]];
    pts.forEach((p, i) => g.push(`<circle cx="${A(X(p[0]))}" cy="${A(Y(p[1]))}" r="3.4" fill="${INK}"${aFade(BAS + i * 0.15)}/>`));
    g.push(txt(X(28) + 8, Y(26.9) + 18, 'mätpunkter', { size: 11, fill: SOFT, anchor: 'start', anim: aFade(BAS + 0.9) }));
    // anpassad rät linje
    const k = 1.11, m0 = -4;
    g.push(line(X(0), Y(m0), X(31), Y(k * 31 + m0), { c: RED, w: 2, anim: aDraw(BAS + 1.2, 0.7) }));
    // skärning med lodräta axeln
    g.push(`<circle cx="${A(X(0))}" cy="${A(Y(m0))}" r="3.4" fill="${RED}"${aFade(BAS + 2.0)}/>`);
    g.push(txt(ox + 10, Y(m0) + 16, `skär i −${sub('m', 'B')}`, { fill: RED, anchor: 'start', anim: aFade(BAS + 2.0) }));
    // lutningstrappa mellan V = 14 och V = 24
    const x1 = 14, x2 = 24, y1 = k * x1 + m0, y2 = k * x2 + m0;
    g.push(line(X(x1), Y(y1), X(x2), Y(y1), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 2.5) }));
    g.push(line(X(x2), Y(y1), X(x2), Y(y2), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 2.5) }));
    g.push(txt(X(x2) + 10, Y((y1 + y2) / 2) + 4, `lutning = ${sub('ρ', 'luft')} − ${sub('ρ', 'He')}`, { fill: RED, anchor: 'start', anim: aFade(BAS + 2.8) }));
    FIG['u18-s2'] = svg(W, H, g.join(''));
})();

/* ================= UPPGIFT 19: avsvalningsdiagrammet ================= */
// Mätpunkterna lästa ur originalfiguren (pixelmätning av elevhäftets bild).
const U19 = [[0.2, 35.75], [12.1, 34.76], [33.2, 33.45], [61.3, 31.56], [85.4, 29.94], [116.9, 28.14], [146.4, 26.45]];
// Anpassad avsvalningskurva T(t) = Ta + D·e^(−kt) (minsta kvadrat-anpassning till punkterna).
const FIT = { Ta: -2.58736334, D: 38.3112042, k: 0.001893188 };
const Tfit = t => FIT.Ta + FIT.D * Math.exp(-FIT.k * t);
const T30 = 85.4737, SLOPE = -0.0616940; // tid då T = 30 °C och kurvans lutning där (°C/min)
(function () {
    const W = 540, H = 330;
    const x0 = 72, x1 = 472, y0 = 282, y1 = 42;
    const X = t => x0 + t / 160 * (x1 - x0), Y = T => y0 - T / 40 * (y0 - y1);
    function base(extra, vb) {
        const g = [];
        for (let t = 0; t <= 160; t += 20) g.push(line(X(t), y0, X(t), y1, { c: t === 0 ? INK : GRID, w: t === 0 ? 1.4 : 1 }));
        for (let T = 0; T <= 40; T += 5) g.push(line(x0, Y(T), x1, Y(T), { c: T === 0 ? INK : GRID, w: T === 0 ? 1.4 : 1 }));
        for (let t = 0; t <= 160; t += 20) g.push(txt(X(t), y0 + 18, String(t), { size: 11 }));
        for (let T = 0; T <= 40; T += 5) g.push(txt(x0 - 9, Y(T) + 4, String(T), { size: 11, anchor: 'end' }));
        g.push(txt(28, (y0 + y1) / 2, 'Temperatur / °C', { size: 11.5, tf: `rotate(-90 28 ${(y0 + y1) / 2})` }));
        g.push(txt(x1, y0 + 36, 'Tid / minuter', { size: 11.5, anchor: 'end' }));
        if (extra) g.push(extra);
        U19.forEach(p => g.push(`<circle cx="${A(X(p[0]))}" cy="${A(Y(p[1]))}" r="3.2" fill="${INK}"/>`));
        if (vb) return `<svg viewBox="${vb.join(' ')}" width="${vb[2]}" xmlns="http://www.w3.org/2000/svg">${g.join('')}</svg>`;
        return svg(W, H, g.join(''));
    }
    FIG['u19'] = base('', [14, 32, 474, 294]);

    function curve(anim, svag) {
        const pts = [];
        for (let t = 0; t <= 160; t += 1) pts.push([X(t), Y(Tfit(t))]);
        if (svag) return poly(pts, { c: SOFT, w: 1, dash: '4 4' });
        return poly(pts, { c: BLUE, w: 1.8, anim });
    }
    // s1: jämn kurva genom punkterna, 30 °C markeras
    FIG['u19-s1'] = base(
        curve(aDraw(BAS, 1.0)) +
        line(x0, Y(30), X(T30), Y(30), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 1.2) }) +
        line(X(T30), Y(30), X(T30), y0, { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 1.4) }) +
        `<circle cx="${A(X(T30))}" cy="${A(Y(30))}" r="4.4" fill="none" stroke="${RED}" stroke-width="1.8"${aFade(BAS + 1.6)}/>` +
        txt(X(T30) + 10, Y(30) - 30, '30 °C efter cirka 85 min', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.8) })
    );
    // s2: tangenten vid 30 °C och avläsningarna vid 0 och 160 min
    const Ta0 = 30 + SLOPE * (0 - T30), Ta160 = 30 + SLOPE * (160 - T30);
    FIG['u19-s2'] = base(
        curve('', true) +
        line(X(0), Y(Ta0), X(160), Y(Ta160), { c: RED, w: 1.8, anim: aDraw(BAS, 0.8) }) +
        `<circle cx="${A(X(T30))}" cy="${A(Y(30))}" r="4.4" fill="none" stroke="${RED}" stroke-width="1.8"/>` +
        `<circle cx="${A(X(0))}" cy="${A(Y(Ta0))}" r="3" fill="${RED}"${aFade(BAS + 1.0)}/>` +
        `<circle cx="${A(X(160))}" cy="${A(Y(Ta160))}" r="3" fill="${RED}"${aFade(BAS + 1.2)}/>` +
        line(X(0) + 3, Y(Ta0) + 3, X(5), Y(32.6), { c: RED, w: 1, anim: aFade(BAS + 1.0) }) +
        txt(X(5) + 2, Y(31.6), `${dec(Ta0, 1)} °C`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }) +
        txt(X(160) + 8, Y(Ta160) + 4, `${dec(Ta160, 1)} °C`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }) +
        txt(X(T30) + 8, Y(30) - 32, 'tangent vid 30 °C', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) })
    );
})();

/* ================= UPPGIFT 21: aktiviteten avtar ================= */
(function () {
    const W = 470, H = 280;
    const ox = 70, oy = 232, kx = 30, ky = 38; // px per h, px per MBq
    const X = t => ox + t * kx, Y = a => oy - a * ky;
    const A0 = 4.8, Th = 6.0058;
    const Af = t => A0 * Math.pow(0.5, t / Th);
    const g = [];
    for (let t = 2; t <= 12; t += 2) g.push(line(X(t), Y(0), X(t), Y(5), { c: GRID, w: 1 }));
    for (let a = 1; a <= 5; a += 1) g.push(line(X(0), Y(a), X(12.4), Y(a), { c: GRID, w: 1 }));
    g.push(arrow(ox, oy, X(13), oy, { w: 1.6, head: 9 }));
    g.push(arrow(ox, oy, ox, Y(5.6), { w: 1.6, head: 9 }));
    for (let t = 2; t <= 12; t += 2) g.push(txt(X(t), oy + 17, String(t), { size: 11 }));
    for (let a = 1; a <= 5; a += 1) g.push(txt(ox - 8, Y(a) + 4, String(a), { size: 11, anchor: 'end' }));
    g.push(txt(ox + 8, Y(5.6) + 4, `${it('A')} (MBq)`, { anchor: 'start' }));
    g.push(txt(X(13), oy + 34, `${it('t')} (h)`, { anchor: 'end' }));
    const pts = [];
    for (let t = 0; t <= 12.2; t += 0.05) pts.push([X(t), Y(Af(t))]);
    g.push(poly(pts, { c: INK, w: 2, anim: aDraw(BAS, 1.0) }));
    // A₀ vid t = 0
    g.push(`<circle cx="${A(X(0))}" cy="${A(Y(A0))}" r="3.4" fill="${BLUE}"${aFade(BAS + 0.2)}/>`);
    g.push(txt(X(0) + 10, Y(A0) - 6, `${sub('A', '0')} = 4,8 MBq`, { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.2) }));
    // halveringstiden
    g.push(line(X(Th), Y(A0 / 2), X(Th), oy, { c: SOFT, w: 1.2, dash: '4 4', anim: aFade(BAS + 1.1) }));
    g.push(txt(X(Th) - 6, oy - 10, `${sub('T', '1/2')}`, { size: 12, fill: SOFT, anchor: 'end', anim: aFade(BAS + 1.1) }));
    // t = 8 h
    const A8 = Af(8);
    g.push(line(X(8), oy, X(8), Y(A8), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 1.4) }));
    g.push(line(X(8), Y(A8), X(0), Y(A8), { c: RED, w: 1.4, dash: '5 4', anim: aFade(BAS + 1.6) }));
    g.push(`<circle cx="${A(X(8))}" cy="${A(Y(A8))}" r="3.4" fill="${RED}"${aFade(BAS + 1.6)}/>`);
    g.push(txt(X(8) + 10, Y(A8) - 10, `${it('A')} ≈ 1,91 MBq efter 8 h`, { fill: RED, anchor: 'start', anim: aFade(BAS + 1.8) }));
    FIG['u21-s1'] = svg(W, H, g.join(''));
})();

if (require.main === module) {
    const out = [];
    out.push('// Fysiklabbet: figurer till Kursprov Fysik 1 VT 2017, uppgift 17–21 (genererade,');
    out.push('// redigera inte för hand; generatorn ligger i .claude/np-figs/gen-fy1-vt2017-3.js,');
    out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
    out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
    out.push("window.NP_FIGURER['fy1-vt2017'] = Object.assign(window.NP_FIGURER['fy1-vt2017'] || {}, {");
    for (const [k, v] of Object.entries(FIG)) out.push(`  '${k}': ${JSON.stringify(v)},`);
    out.push('});');
    fs.writeFileSync('C:\\claude\\Fysiklabbet\\data\\np\\fy1-vt2017-figurer-3.js', out.join('\n') + '\n');
    console.log('Figurer:', Object.keys(FIG).length, '->', Object.keys(FIG).join(', '));
}
