// Generator för data/np/fy1-vt2017-figurer-1.js — Kursprov Fysik 1 VT 2017,
// delprov A, uppgift 1–10. Kör: node .claude/np-figs/gen-fy1-vt2017-1.js
// Alla koordinater beräknade. Konventioner som i gen-fy2vt2016.js: ink #0f1620,
// accent #c8324a (krafter), blå #1c5fa8 (avläst/givet/markering), soft #3f4a5c.
// Kraftpilar: butt-cap, skaftet slutar vid pilhuvudets bas. Nya linjer i
// stegfigurer RITAS (aDraw), nya etiketter TONAS IN (aFade).
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c5fa8';
const GRID = 'rgba(15,22,32,0.13)';
const PAPER = '#f3eee4';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.1;

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') + (o.anim || '') + '/>';
}
function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const h = o.head || Math.max(9, Math.min(12, L * 0.5));
    const bx = x2 - ux * h, by = y2 - uy * h;
    const wh = h * 0.44, px = -uy, py = ux;
    const al = o.anim !== undefined ? aDraw(o.anim, 0.4) : (o.fade !== undefined ? aFade(o.fade) : '');
    const ah = o.anim !== undefined ? aFade(o.anim + 0.25) : (o.fade !== undefined ? aFade(o.fade) : '');
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 2.6, cap: 'butt', dash: o.dash, anim: al }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"${ah}/>`;
}
function dim(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, h = o.head || 7, wh = h * 0.42;
    const px = -uy, py = ux, c = o.c || INK, an = o.fade !== undefined ? aFade(o.fade) : '';
    const head = (tx, ty, sx, sy) =>
        `<polygon points="${A(tx + sx * h + px * wh)},${A(ty + sy * h + py * wh)} ${A(tx)},${A(ty)} ${A(tx + sx * h - px * wh)},${A(ty + sy * h - py * wh)}" fill="${c}"${an}/>`;
    return line(x1 + ux * h, y1 + uy * h, x2 - ux * h, y2 - uy * h, { c, w: o.w || 1.3, cap: 'butt', anim: an }) +
        head(x1, y1, ux, uy) + head(x2, y2, -ux, -uy);
}
function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 13}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.weight ? ` font-weight="${o.weight}"` : '') +
        (o.anim || '') + `>${s}</text>`;
}
const it = s => `<tspan font-style="italic">${s}</tspan>`;
const sub = (v, ix) => `${it(v)}<tspan font-size="0.72em" dy="3">${ix}</tspan><tspan dy="-3">&#8203;</tspan>`;
const dot = (x, y, c, an) => `<circle cx="${A(x)}" cy="${A(y)}" r="2.6" fill="${c || RED}"${an || ''}/>`;

// width/height skalas upp från viewBoxen (samma k i båda led) så att
// etiketterna hamnar nära brödtextens storlek.
function svg(w, h, inner, k) {
    k = k || Math.min(1.3, 640 / w);
    return `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${Math.round(w * k)}" height="${Math.round(h * k)}" ` +
        `xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif">${inner}</svg>`;
}

const FIG = {};

/* ================= UPPGIFT 1 — cylinder på platta ================= */
(function () {
    const W = 330, H = 232;
    const cx = 150, rx = 62, ry = 13, yTop = 52, yBot = 168;
    // plattans översida (parallellogram) och tjocklek
    const P = { bl: [96, 150], br: [282, 150], fr: [236, 196], fl: [50, 196] }, th = 14;

    function base() {
        const g = [];
        g.push(`<polygon points="${P.bl} ${P.br} ${P.fr} ${P.fl}" fill="#e4e0d8" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
        g.push(`<polygon points="${P.fl} ${P.fr} ${P.fr[0]},${P.fr[1] + th} ${P.fl[0]},${P.fl[1] + th}" fill="#d2cdc3" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
        g.push(`<polygon points="${P.fr} ${P.br} ${P.br[0]},${P.br[1] + th} ${P.fr[0]},${P.fr[1] + th}" fill="#c7c1b6" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
        // cylinderns mantel + bottenellipsens främre halva
        g.push(`<path d="M ${cx - rx} ${yTop} L ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot} L ${cx + rx} ${yTop} Z" fill="#fbf9f4" stroke="${INK}" stroke-width="1.5"/>`);
        g.push(`<ellipse cx="${cx}" cy="${yTop}" rx="${rx}" ry="${ry}" fill="#fbf9f4" stroke="${INK}" stroke-width="1.5"/>`);
        g.push(line(cx - rx, yTop, cx + rx, yTop, { w: 1, dash: '4 3', c: SOFT }));
        // måttlinje 50 cm
        g.push(line(cx - rx, yTop - 4, cx - rx, 20, { w: 1, c: SOFT }));
        g.push(line(cx + rx, yTop - 4, cx + rx, 20, { w: 1, c: SOFT }));
        g.push(dim(cx - rx, 27, cx + rx, 27));
        g.push(txt(cx, 19, '50 cm', { size: 13 }));
        g.push(txt(cx, 90, '80 kg', { size: 14 }));
        return g;
    }
    FIG['u1'] = svg(W, H, base().join(''));

    const cmY = (yTop + yBot) / 2 + 2, LG = 62;
    function withFG(anim) {
        return dot(cx, cmY, RED, anim ? aFade(BAS) : '') +
            arrow(cx, cmY, cx, cmY + LG, anim ? { c: RED, anim: BAS } : { c: RED }) +
            txt(cx + 9, cmY + 30, sub('F', 'G'),
                { anchor: 'start', fill: RED, anim: anim ? aFade(BAS + 0.5) : '' });
    }
    FIG['u1-s1'] = svg(W, H, base().join('') + withFG(true));

    // s2: bottenytan markeras (den area kraften fördelas på)
    const bottom = `<path d="M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx - rx} ${yBot} Z" ` +
        `fill="rgba(28,95,168,0.22)" stroke="${BLUE}" stroke-width="1.8" stroke-dasharray="5 3"${aFade(BAS)}/>`;
    const lab = txt(cx + rx + 8, 122, 'bottenarea', { anchor: 'start', fill: BLUE, anim: aFade(BAS + 0.4) }) +
        txt(cx + rx + 8, 137, it('A') + ' = π · ' + it('r') + '<tspan font-size="0.72em" dy="-5">2</tspan>',
            { anchor: 'start', fill: BLUE, anim: aFade(BAS + 0.4) });
    FIG['u1-s2'] = svg(W, H, base().join('') + withFG(false) + bottom + lab);
})();

/* ================= UPPGIFT 2 — kretsarna A–E ================= */
// Komponenterna JÄMNT FÖRDELADE på sina grenar: g = (L − Σb)/(n + 1).
const KW = { V: 20, A: 20, R: 34, S: 18 };
function meter(cx, cy, ch, o = {}) {
    const c = o.c || INK;
    return `<circle cx="${A(cx)}" cy="${A(cy)}" r="10" fill="#fff" stroke="${c}" stroke-width="1.5"${o.anim || ''}/>` +
        txt(cx, cy + 4.4, ch, { size: 12, fill: c, anim: o.anim });
}
function resistor(cx, cy, o = {}) {
    return `<rect x="${A(cx - 17)}" y="${A(cy - 7)}" width="34" height="14" fill="#fff" stroke="${INK}" stroke-width="1.5"/>` +
        txt(cx, cy + 4.5, it('R'), { size: 12 });
}
function cell(cx, cy, withLabel = true) {
    const r = 9, g = [];
    g.push(`<circle cx="${A(cx)}" cy="${A(cy)}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`);
    g.push(line(cx - 2.6, cy - 6, cx - 2.6, cy + 6, { w: 1.5 }));   // långt streck = plus
    g.push(line(cx + 2.6, cy - 3.5, cx + 2.6, cy + 3.5, { w: 1.5 }));
    // två parallella ljuspilar snett uppifrån vänster
    const u = [Math.SQRT1_2, Math.SQRT1_2], p = [Math.SQRT1_2, -Math.SQRT1_2];
    [-3.6, 3.6].forEach(o => {
        const tx = cx - u[0] * (r + 2) + p[0] * o, ty = cy - u[1] * (r + 2) + p[1] * o;
        g.push(arrow(tx - u[0] * 15, ty - u[1] * 15, tx, ty, { w: 1.2, head: 5 }));
    });
    g.push(txt(cx - 9, cy + 21, '+', { size: 11 }));
    g.push(txt(cx + 9, cy + 20, '−', { size: 11 }));
    if (withLabel) g.push(txt(cx, cy - 31, 'Solcell', { size: 11.5 }));
    return g.join('');
}
// Gren mellan x0 och x1 på höjden y med komponenterna i ordning.
function branchH(x0, x1, y, comps, o = {}) {
    const sum = comps.reduce((s, c) => s + KW[c], 0);
    const gap = (x1 - x0 - sum) / (comps.length + 1);
    const g = []; let x = x0;
    comps.forEach(c => {
        g.push(line(x, y, x + gap, y, { w: 1.4, c: o.wc }));
        const cxm = x + gap + KW[c] / 2;
        if (c === 'R') g.push(resistor(cxm, y));
        else if (c === 'S') g.push(cell(cxm, y));
        else g.push(meter(cxm, y, c, { c: o.mc && o.mc[c] }));
        x += gap + KW[c];
    });
    g.push(line(x, y, x1, y, { w: 1.4, c: o.wc }));
    return g.join('');
}
function branchV(x, y0, y1, comps) {
    const sum = comps.reduce((s, c) => s + KW[c], 0);
    const gap = (y1 - y0 - sum) / (comps.length + 1);
    const g = []; let y = y0;
    comps.forEach(c => {
        g.push(line(x, y, x, y + gap, { w: 1.4 }));
        g.push(meter(x, y + gap + KW[c] / 2, c));
        y += gap + KW[c];
    });
    g.push(line(x, y, x, y1, { w: 1.4 }));
    return g.join('');
}
// Parallellkoppling: lodräta skenor + grenar på lika avstånd.
function parallel(x0, x1, ys, rows, o = {}) {
    const g = [line(x0, ys[0], x0, ys[ys.length - 1], { w: 1.4 }), line(x1, ys[0], x1, ys[ys.length - 1], { w: 1.4 })];
    rows.forEach((r, i) => g.push(branchH(x0, x1, ys[i], r, o)));
    return g.join('');
}
const CW = 116;
function circuitABC(x0, letter, rows) {
    return txt(x0 + CW / 2, 24, letter, { size: 14 }) + parallel(x0, x0 + CW, [50, 115, 180], rows);
}
(function () {
    const W = 450, H = 472, X = [10, 167, 324];
    const g = [];
    g.push(circuitABC(X[0], 'A', [['V'], ['S'], ['A', 'R']]));
    g.push(circuitABC(X[1], 'B', [['A'], ['S'], ['V', 'R']]));
    g.push(circuitABC(X[2], 'C', [['A', 'V'], ['S'], ['R']]));
    // D: en enda slinga. Solcellen på överledningen, A på högra sidan, R och V nertill.
    const dx = 66, dyT = 318, dyB = 418;
    g.push(txt(dx + CW / 2, 246, 'D', { size: 14 }));
    g.push(branchH(dx, dx + CW, dyT, ['S']));
    g.push(branchH(dx, dx + CW, dyB, ['R', 'V']));
    g.push(line(dx, dyT, dx, dyB, { w: 1.4 }));
    g.push(branchV(dx + CW, dyT, dyB, ['A']));
    // E: fyra parallella grenar
    const ex = 268, eys = [268, 330, 392, 454];
    g.push(txt(ex + CW / 2, 246, 'E', { size: 14 }));
    g.push(parallel(ex, ex + CW, eys, [['V'], ['S'], ['R'], ['A']]));
    FIG['u2'] = svg(W, H, g.join(''), 1.25);

    // s1: krets A förstorad med markeringar
    const S = 1.55, ox = 18, oy = 30 - 50 * S;
    const inner = parallel(0, CW, [50, 115, 180], [['V'], ['S'], ['A', 'R']]);
    const s = [];
    s.push(`<g transform="translate(${ox},${oy}) scale(${S})">${inner}</g>`);
    const P = (x, y) => [ox + x * S, oy + y * S];
    // voltmeterns gren blå, amperemetern blå
    const vY = P(0, 50)[1], aP = P(0, 180);
    const gapA = (CW - 54) / 3;
    const aCx = P(gapA + 10, 180)[0];
    s.push(`<circle cx="${A(P(CW / 2, 50)[0])}" cy="${A(vY)}" r="${A(10 * S + 4)}" fill="none" stroke="${BLUE}" stroke-width="2"${aFade(BAS)}/>`);
    s.push(`<circle cx="${A(aCx)}" cy="${A(aP[1])}" r="${A(10 * S + 4)}" fill="none" stroke="${BLUE}" stroke-width="2"${aFade(BAS + 0.9)}/>`);
    const tx = ox + CW * S + 16;
    s.push(txt(tx, vY - 4, 'voltmetern parallellt', { anchor: 'start', fill: BLUE, size: 13, anim: aFade(BAS + 0.3) }));
    s.push(txt(tx, vY + 13, 'med solcellen: mäter ' + it('U'), { anchor: 'start', fill: BLUE, size: 13, anim: aFade(BAS + 0.3) }));
    s.push(txt(tx, aP[1] - 4, 'amperemetern i serie', { anchor: 'start', fill: BLUE, size: 13, anim: aFade(BAS + 1.2) }));
    s.push(txt(tx, aP[1] + 13, 'med motorn: mäter ' + it('I'), { anchor: 'start', fill: BLUE, size: 13, anim: aFade(BAS + 1.2) }));
    FIG['u2-s1'] = svg(tx + 172, 262, s.join(''), 1.15);
})();

/* ================= UPPGIFT 5 — rymdskepp mot stjärna ================= */
(function () {
    const W = 470, H = 176;
    function base() {
        const g = [];
        [[30, 30], [118, 22], [205, 40], [262, 18], [338, 34], [445, 150], [330, 156], [222, 160], [96, 152], [20, 128]]
            .forEach(([x, y]) => g.push(`<circle cx="${x}" cy="${y}" r="1.6" fill="${SOFT}"/>`));
        // stjärnan
        const sx = 420, sy = 96;
        for (let i = 0; i < 12; i++) {
            const a = i * Math.PI / 6;
            g.push(line(sx + 17 * Math.cos(a), sy + 17 * Math.sin(a), sx + 25 * Math.cos(a), sy + 25 * Math.sin(a), { w: 1.4 }));
        }
        g.push(`<circle cx="${sx}" cy="${sy}" r="13" fill="#f5d77a" stroke="${INK}" stroke-width="1.5"/>`);
        g.push(txt(sx, sy + 46, 'stjärna', { size: 12, fill: SOFT }));
        // rymdskeppet (nos åt höger)
        g.push(`<polygon points="66,96 49,90 49,102" fill="#e8a24a" stroke="${INK}" stroke-width="1"/>`);
        g.push(`<polygon points="78,84 62,62 96,84" fill="#d9d4ca" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
        g.push(`<polygon points="78,108 62,130 96,108" fill="#d9d4ca" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`);
        g.push(`<path d="M 66 84 L 136 84 Q 158 88 164 96 Q 158 104 136 108 L 66 108 Z" fill="#fbf9f4" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`);
        g.push(`<circle cx="138" cy="96" r="4.5" fill="#bcd3ea" stroke="${INK}" stroke-width="1.2"/>`);
        g.push(txt(108, 146, 'rymdskepp', { size: 12, fill: SOFT }));
        return g;
    }
    const vArrow = o => arrow(167, 96, 232, 96, Object.assign({ c: RED }, o)) +
        txt(200, 88, it('v'), { fill: RED, anim: o.fade !== undefined ? aFade(o.fade) : (o.anim !== undefined ? aFade(o.anim + 0.3) : '') });
    FIG['u5'] = svg(W, H, base().join('') + vArrow({}));
    // s1: ljuset från stjärnan, samma c för astronauten
    const s = base();
    s.push(vArrow({}));
    [62, 130].forEach((y, i) => s.push(arrow(392, y, 176, y, { c: BLUE, w: 2, anim: BAS + 0.3 * i })));
    s.push(txt(284, 54, 'ljus: ' + it('c'), { fill: BLUE, anim: aFade(BAS + 0.8) }));
    s.push(txt(284, 147, 'mäts till ' + it('c') + ' ombord', { fill: BLUE, anim: aFade(BAS + 1.1) }));
    FIG['u5-s1'] = svg(W, H, s.join(''));
})();

/* ================= UPPGIFT 6 — boll som skjuts upp av en fjäder ========
 * Bollens lägen med lika tidsintervall: fritt fall baklänges från Z,
 * avstånden från Z växer som k² (k = 0 … 6), samma mönster som i
 * originalfiguren. Sista läget är bollen på fjäderns topp i Y. */
(function () {
    const W = 470, H = 404;
    const bx = 90, r = 6.5, yZ = 26;
    const yY = 318, yX = 350, yBase = 380;
    const yBallY = yY - r;
    const c = (yBallY - yZ) / 36;
    const ys = [0, 1, 2, 3, 4, 5, 6].map(k => yZ + c * k * k);

    function spring(x, ytop, ybot, wdt, n) {
        const pts = [[x, ybot]];
        for (let i = 1; i < 2 * n; i++) pts.push([x + (i % 2 ? -wdt : wdt) / 2, ybot - (ybot - ytop) * i / (2 * n)]);
        pts.push([x, ytop]);
        return `<polyline points="${pts.map(p => A(p[0]) + ',' + A(p[1])).join(' ')}" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
    }
    function base() {
        const g = [];
        g.push(`<rect x="${bx - 45}" y="${yBase}" width="90" height="13" fill="#d2cdc3" stroke="${INK}" stroke-width="1.3"/>`);
        g.push(line(bx - 15, yY - 6, bx - 15, yBase, { w: 2.2 }));
        g.push(line(bx + 15, yY - 6, bx + 15, yBase, { w: 2.2 }));
        g.push(spring(bx, yY, yBase, 20, 7));
        ys.forEach(y => g.push(`<circle cx="${bx}" cy="${A(y)}" r="${r}" fill="${INK}"/>`));
        g.push(line(bx - 34, yZ, bx - 10, yZ, { w: 1.1, dash: '3 2.5' }));
        g.push(txt(bx - 40, yZ + 4.5, 'Z', { anchor: 'end' }));
        g.push(line(bx - 38, yY, bx - 18, yY, { w: 1.1, dash: '3 2.5' }));
        g.push(txt(bx - 44, yY + 4.5, 'Y', { anchor: 'end' }));
        g.push(line(bx - 38, yX, bx - 18, yX, { w: 1.1, dash: '3 2.5' }));
        g.push(txt(bx - 44, yX + 4.5, 'X', { anchor: 'end' }));
        return g;
    }
    FIG['u6'] = svg(160, H, base().join(''), 1.0);

    // Insatsbilder till höger: bollen förstorad med krafterna. F_G lika lång
    // överallt; fjäderkraften vid X är bara ritad klart större än F_G (2,5
    // gånger), inte i skala, eftersom beloppet är okänt.
    const R = 14, LG = 34, LF = 2.5 * LG;   // samma kvot 2,5 som i pennlösningen
    const fd = an => an !== undefined ? aFade(an) : '';
    function ballFG(cx, cy, title, an) {
        const g = [];
        g.push(txt(cx, cy - R - 12, title, { size: 13, fill: SOFT, anim: fd(an) }));
        g.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fbf9f4" stroke="${INK}" stroke-width="1.5"${fd(an)}/>`);
        g.push(dot(cx, cy, RED, fd(an !== undefined ? an + 0.3 : undefined)));
        g.push(arrow(cx, cy, cx, cy + LG, an !== undefined ? { c: RED, anim: an + 0.3 } : { c: RED }));
        g.push(txt(cx + 8, cy + LG - 2, sub('F', 'G'), { anchor: 'start', fill: RED, anim: fd(an !== undefined ? an + 0.7 : undefined) }));
        return g.join('');
    }
    function stepYZ(anim) {
        return ballFG(250, 64, 'i Z', anim ? BAS : undefined) +
            ballFG(385, 64, 'mellan Y och Z', anim ? BAS + 1.0 : undefined) +
            txt(318, 146, 'bara ' + sub('F', 'G') + ' verkar:', { fill: RED, anim: anim ? aFade(BAS + 1.8) : '' }) +
            txt(318, 164, it('a') + ' = ' + it('g') + ', riktad nedåt', { fill: RED, anim: anim ? aFade(BAS + 1.8) : '' });
    }
    FIG['u6-s1'] = svg(W, H, base().join('') + stepYZ(true), 1.15);

    // s2: vid X, bollen på den sammanpressade fjädern
    const cx = 318, cy = 318, yC = cy + R, yB = yC + 38, an = BAS;
    const g = [];
    g.push(txt(cx - 34, cy + 5, 'vid X', { size: 13, fill: SOFT, anchor: 'end', anim: aFade(an) }));
    g.push(`<g${aFade(an)}>` +
        `<rect x="${cx - 40}" y="${yB}" width="80" height="11" fill="#d2cdc3" stroke="${INK}" stroke-width="1.3"/>` +
        spring(cx, yC, yB, 22, 4).replace(`stroke="${INK}" stroke-width="1.4"`, 'stroke="#b3ab9e" stroke-width="1.2"') +
        `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fbf9f4" stroke="${INK}" stroke-width="1.5"/></g>`);
    // fjäderkraften angriper i kontaktpunkten (bollens undersida), uppåt;
    // skaftet precis intill tyngdkraftens verkningslinje
    g.push(arrow(cx + 4, yC, cx + 4, yC - LF, { c: RED, anim: an + 0.4 }));
    g.push(txt(cx + 13, yC - LF + 10, sub('F', 'fjäder'), { anchor: 'start', fill: RED, anim: aFade(an + 0.8) }));
    g.push(dot(cx, cy, RED, aFade(an + 1.0)));
    g.push(arrow(cx, cy, cx, cy + LG, { c: RED, anim: an + 1.0 }));
    g.push(txt(cx - 22, cy + LG - 2, sub('F', 'G'), { anchor: 'end', fill: RED, anim: aFade(an + 1.3) }));
    g.push(txt(cx, yB + 30, 'fjäderkraften inte i skala', { size: 11.5, fill: SOFT, anim: aFade(an + 1.3) }));
    FIG['u6-s2'] = svg(W, H, base().join('') + stepYZ(false) + g.join(''), 1.15);
})();

/* ================= UPPGIFT 7 — U-I-diagram med mätpunkterna a–e ==========
 * Punkterna uppmätta i originalbilden (pixlar från origo, 300 dpi):
 * a (270,5; 142,5), b (602; 141,5), c (165; 294,5), d (446; 362),
 * e (602; 313,5). Skala 0,5. */
(function () {
    const W = 470, H = 330, ox = 46, oy = 290, k = 0.5;
    const pts = { a: [270.5, 142.5], b: [602, 141.5], c: [165, 294.5], d: [446, 362], e: [602, 313.5] };
    const X = i => ox + i * k, Y = u => oy - u * k;
    function base() {
        const g = [];
        g.push(line(ox - 16, oy, 446, oy, { w: 1.6, cap: 'butt' }));
        g.push(`<polygon points="456,${oy} 445,${oy - 5} 445,${oy + 5}" fill="${INK}"/>`);
        g.push(line(ox, oy + 18, ox, 26, { w: 1.6, cap: 'butt' }));
        g.push(`<polygon points="${ox},16 ${ox - 5},27 ${ox + 5},27" fill="${INK}"/>`);
        g.push(txt(ox - 14, 34, 'V', { size: 13 }));
        g.push(txt(ox + 16, 34, it('U'), { size: 14 }));
        g.push(txt(434, oy - 12, it('I'), { size: 14 }));
        g.push(txt(434, oy + 22, 'A', { size: 13 }));
        for (const [n, [i, u]] of Object.entries(pts)) {
            const x = X(i), y = Y(u);
            g.push(line(x - 4.5, y - 4.5, x + 4.5, y + 4.5, { w: 1.6 }));
            g.push(line(x - 4.5, y + 4.5, x + 4.5, y - 4.5, { w: 1.6 }));
            g.push(txt(x, y + 20, n, { size: 13.5 }));
        }
        return g;
    }
    FIG['u7'] = svg(W, H, base().join(''));
    // s1: linjer från origo genom varje punkt (lutning = resistansen)
    const s = [];
    let d = 0;
    for (const [n, [i, u]] of Object.entries(pts)) {
        const slope = u / i;
        // förläng till fönstrets kant
        let i2 = 780, u2 = slope * i2;
        if (u2 > 520) { u2 = 520; i2 = u2 / slope; }
        const hit = n === 'a' || n === 'e';
        if (n === 'e') continue;   // a-linjen går genom e
        s.push(line(ox, oy, X(i2), Y(u2), hit ? { c: BLUE, w: 2, anim: aDraw(BAS + 1.4, 0.8) } :
            { c: SOFT, w: 1.1, dash: '5 4', anim: aFade(BAS + 0.25 * d++) }));
    }
    s.push(txt(388, 168, 'a och e: samma lutning,', { size: 12.5, fill: BLUE, anim: aFade(BAS + 2.2) }));
    s.push(txt(388, 184, 'samma resistans ' + it('R'), { size: 12.5, fill: BLUE, anim: aFade(BAS + 2.2) }));
    // linjerna läggs UNDER kryssen
    FIG['u7-s1'] = svg(W, H, s.join('') + base().join(''));
})();

/* ================= UPPGIFT 8 — v-t-graf ================= */
(function () {
    const W = 330, H = 290, ox = 56, oy = 250, ux = 40, uy = 20;
    const X = t => ox + t * ux, Y = v => oy - v * uy;
    function base() {
        const g = [];
        for (let t = 1; t <= 6; t++) g.push(line(X(t), oy, X(t), Y(10), { c: GRID, w: 1 }));
        for (let v = 2; v <= 10; v += 2) g.push(line(ox, Y(v), X(6), Y(v), { c: GRID, w: 1 }));
        g.push(line(ox, oy, X(6) + 22, oy, { w: 1.6, cap: 'butt' }));
        g.push(`<polygon points="${X(6) + 32},${oy} ${X(6) + 21},${oy - 5} ${X(6) + 21},${oy + 5}" fill="${INK}"/>`);
        g.push(line(ox, oy, ox, Y(10) - 18, { w: 1.6, cap: 'butt' }));
        g.push(`<polygon points="${ox},${Y(10) - 28} ${ox - 5},${Y(10) - 17} ${ox + 5},${Y(10) - 17}" fill="${INK}"/>`);
        for (let t = 1; t <= 6; t++) g.push(txt(X(t), oy + 19, String(t), { size: 12.5 }));
        for (let v = 2; v <= 10; v += 2) g.push(txt(ox - 8, Y(v) + 4.5, String(v), { size: 12.5, anchor: 'end' }));
        g.push(txt(ox - 8, Y(10) - 20, 'm/s', { size: 12.5, anchor: 'end' }));
        g.push(txt(ox + 12, Y(10) - 20, it('v'), { size: 14, anchor: 'start' }));
        g.push(txt(X(6) + 26, oy - 12, it('t'), { size: 14 }));
        g.push(txt(X(6) + 26, oy + 19, 's', { size: 12.5 }));
        return g;
    }
    const graph = line(X(0), Y(2), X(6), Y(8), { w: 2.2 });
    FIG['u8'] = svg(W, H, base().join('') + graph);
    const area = an => `<polygon points="${X(0)},${oy} ${X(0)},${Y(2)} ${X(5)},${Y(7)} ${X(5)},${oy}" fill="rgba(28,95,168,0.22)" stroke="${BLUE}" stroke-width="1.4"${an}/>`;
    const areaLbl = an => txt(X(2.5), Y(1.6), 'arean = ' + it('s'), { fill: BLUE, anim: an });
    FIG['u8-s1'] = svg(W, H, base().join('') + area(aFade(BAS)) + graph + areaLbl(aFade(BAS + 0.4)));
    const s = base().join('') + area('') + graph + areaLbl('') +
        line(X(5), Y(7), ox, Y(7), { c: BLUE, w: 1.3, dash: '4 3', anim: aFade(BAS) }) +
        `<circle cx="${X(5)}" cy="${Y(7)}" r="3.4" fill="${BLUE}"${aFade(BAS)}/>` +
        `<circle cx="${X(0)}" cy="${Y(2)}" r="3.4" fill="${BLUE}"${aFade(BAS)}/>` +
        txt(ox - 8, Y(7) + 4.5, '7', { size: 12.5, anchor: 'end', fill: BLUE, anim: aFade(BAS + 0.4) });
    FIG['u8-s2'] = svg(W, H, s);
})();

/* ================= UPPGIFT 9 — vattenförträngning i mätglas ============= */
(function () {
    const W = 400, H = 262;
    function glass(x, yWater, withClump, lab, an) {
        const g = [], top = 30, bot = 220, w = 64;
        g.push(`<rect x="${x}" y="${yWater}" width="${w}" height="${bot - yWater}" fill="rgba(28,95,168,0.14)"/>`);
        g.push(`<path d="M ${x} ${top} L ${x} ${bot} L ${x + w} ${bot} L ${x + w} ${top}" fill="none" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(`<rect x="${x - 10}" y="${bot}" width="${w + 20}" height="8" fill="#d2cdc3" stroke="${INK}" stroke-width="1.3"/>`);
        for (let y = 60; y <= 200; y += 20) g.push(line(x, y, x + (y % 40 === 20 ? 16 : 10), y, { w: 1, c: SOFT }));
        g.push(line(x, yWater, x + w, yWater, { c: BLUE, w: 1.6 }));
        if (withClump) g.push(`<polygon points="${x + 18},218 ${x + 14},204 ${x + 22},193 ${x + 36},190 ${x + 46},198 ${x + 48},211 ${x + 42},218" fill="#8a8f98" stroke="${INK}" stroke-width="1.3"/>`);
        g.push(line(x + w, yWater, x + w + 14, yWater, { c: BLUE, w: 1.2, dash: '3 2' }));
        g.push(txt(x + w + 18, yWater + 5, lab, { anchor: 'start', fill: BLUE, size: 14 }));
        return g.join('');
    }
    const v1 = sub('V', '1'), v2 = sub('V', '2');
    const s = glass(40, 150, false, v1) +
        `<g${aFade(BAS)}>` + glass(230, 120, true, v2) + '</g>' +
        arrow(146, 120, 212, 120, { c: SOFT, w: 1.6, anim: BAS + 0.6 }) +
        txt(179, 110, 'sänk ned', { size: 12, fill: SOFT, anim: aFade(BAS + 0.6) }) +
        txt(200, 250, 'klumpens volym: ' + it('V') + ' = ' + v2 + ' − ' + v1, { fill: BLUE, anim: aFade(BAS + 1.2) });
    FIG['u9-s1'] = svg(W, H, s);
})();

module.exports = { FIG };

if (require.main === module) {
    const out = [];
    out.push('// Fysiklabbet — figurer till Kursprov Fysik 1 VT 2017, uppgift 1–10 (genererade,');
    out.push('// redigera inte för hand; generatorn ligger i .claude/np-figs/gen-fy1-vt2017-1.js).');
    out.push('// Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
    out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
    out.push("window.NP_FIGURER['fy1-vt2017'] = Object.assign(window.NP_FIGURER['fy1-vt2017'] || {}, {");
    for (const [k, v] of Object.entries(FIG)) out.push(`  '${k}': ${JSON.stringify(v)},`);
    out.push('});');
    fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'fy1-vt2017-figurer-1.js'), out.join('\n') + '\n');
    console.log('Figurer:', Object.keys(FIG).length, '->', Object.keys(FIG).join(', '));
}
