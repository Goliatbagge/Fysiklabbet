// Generator för data/np/ma2b-vt2022-figurer.js — NP Matematik 2b VT 2022.
// Bara 2b-provets EGNA figurer (nycklar 'b<nr>…'); de lånade uppgifterna
// använder 2c-provets figurer (se filhuvudet i data/np/ma2b-vt2022.js).
// Alla koordinater beräknade. Kör från repo-roten:
//   node .claude/np-figs/gen-ma2b-vt2022.js
// Konventioner: se .claude/np-figs/gen-ma2c-vt2022.js (samma stil).
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', RED = '#c8324a', BLUE = '#1c3d6b';
const SHADE = 'rgba(15,22,32,0.06)';
const PAPER = '#f6f1e7';

const A = x => Math.round(x * 100) / 100;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') + (o.anim || '') + '/>';
}
function txt(x, y, s, o = {}) {
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 12.5}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.weight ? ` font-weight="${o.weight}"` : '') + (o.anim || '') + `>${s}</text>`;
}
const it = s => `<tspan font-style="italic">${s}</tspan>`;
function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L, h = o.head || 9;
    const bx = x2 - ux * h, by = y2 - uy * h, wh = h * 0.44, px = -uy, py = ux;
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 1.5, cap: 'butt' }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"/>`;
}
const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${A(w)} ${A(h)}" width="${A(w)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Deterministisk slump (mulberry32), så att figuren blir densamma varje körning.
function rng(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const FIG = {};

/* ================= Uppgift 9: sex spridningsdiagram A–F =================
 * Återger provets figur: ett rutnät med 3 × 2 diagram, varannan ruta
 * gråtonad. Varje diagram har axlar med pil åt det positiva hållet, streck
 * för var tionde enhet och talet 10 vid första strecket på båda axlarna.
 * Linjerna och punktmolnen har samma karaktär som i provet:
 *   A brant uppåt, tät      B uppåt, mycket utspridd   C nedåt, alla PÅ linjen
 *   D brant nedåt, tät      E uppåt, utspridd          F flack uppåt, tät      */
(function () {
    const PW = 190, PH = 186, S = 2.75;          // ruta, px per enhet
    const OX = 28, OY = 160;                     // origo inne i rutan
    const XMAX = 57, YMAX = 52;                  // axlarnas längd i enheter
    const W = PW * 3, H = PH * 2;
    // linje: y = m + k·x för x i [x0, x1]; punkter: n st med brus sd
    const P = {
        A: { k: 2.0, m: 0, x0: 0, x1: 24.5, pts: { n: 9, xa: 4, xb: 23, sd: 1.6, seed: 11 } },
        B: { k: 0.62, m: 3.5, x0: 0, x1: 56, pts: { n: 46, xa: 1, xb: 55, sd: 11, seed: 23, ymin: 1.5, ymax: 50 } },
        C: { k: -0.88, m: 42, x0: 0, x1: 47.7, pts: { n: 24, xa: 2, xb: 46, sd: 0, seed: 0 } },
        D: { k: -1.65, m: 38, x0: 0, x1: 23, pts: { n: 18, xa: 3, xb: 22, sd: 1.3, seed: 41 } },
        E: { k: 1.38, m: 2, x0: 0, x1: 38.5, pts: { n: 30, xa: 1, xb: 44, sd: 8.5, seed: 57, ymin: 0.6, ymax: 50 } },
        F: { k: 0.13, m: 10, x0: 0, x1: 56, pts: { n: 24, xa: 2, xb: 53, sd: 0.85, seed: 71 } },
    };
    const ordning = ['A', 'B', 'C', 'D', 'E', 'F'];
    const ruta = id => { const i = ordning.indexOf(id); return { x: (i % 3) * PW, y: Math.floor(i / 3) * PH }; };

    function punkter(c) {
        const r = rng(c.pts.seed || 1), ut = [];
        for (let i = 0; i < c.pts.n; i++) {
            const t = c.pts.n === 1 ? 0 : i / (c.pts.n - 1);
            let x = c.pts.xa + (c.pts.xb - c.pts.xa) * t;
            if (c.pts.sd) x += (r() - 0.5) * (c.pts.xb - c.pts.xa) / c.pts.n;
            // ungefär normalfördelat brus (summan av tre likformiga)
            const z = (r() + r() + r() - 1.5) * 2;
            let y = c.m + c.k * x + z * c.pts.sd;
            if (c.pts.ymin != null) y = Math.max(c.pts.ymin, Math.min(c.pts.ymax, y));
            if (y < 0.6 || y > YMAX - 3) continue;
            ut.push([x, y]);
        }
        return ut;
    }

    function panel(id) {
        const c = P[id], o = ruta(id), g = [];
        const X = u => o.x + OX + u * S, Y = v => o.y + OY - v * S;
        const gra = ['B', 'D', 'F'].indexOf(id) >= 0;
        g.push(`<rect x="${o.x}" y="${o.y}" width="${PW}" height="${PH}" fill="${gra ? SHADE : 'none'}" stroke="${INK}" stroke-width="0.8"/>`);
        g.push(txt(o.x + 8, o.y + 18, id + '.', { size: 15, anchor: 'start' }));
        // axlar med pil bara åt det positiva hållet
        g.push(arrow(X(0), Y(0), X(XMAX), Y(0)));
        g.push(arrow(X(0), Y(0), X(0), Y(YMAX)));
        for (let v = 10; v <= 50; v += 10) {
            g.push(line(X(v), Y(0) - 3, X(v), Y(0) + 3, { w: 1.1 }));
            if (v <= 40) g.push(line(X(0) - 3, Y(v), X(0) + 3, Y(v), { w: 1.1 }));
        }
        g.push(txt(X(10), Y(0) + 16, '10', { size: 12 }));
        g.push(txt(X(0) - 6, Y(10) + 4, '10', { size: 12, anchor: 'end' }));
        g.push(txt(X(XMAX) - 2, Y(0) + 18, it('x'), { size: 14, anchor: 'end' }));
        g.push(txt(X(0) + 7, Y(YMAX) + 9, it('y'), { size: 14, anchor: 'start' }));
        // anpassad linje och punkter
        g.push(line(X(c.x0), Y(c.m + c.k * c.x0), X(c.x1), Y(c.m + c.k * c.x1), { w: 1.3 }));
        for (const [x, y] of punkter(c)) g.push(`<circle cx="${A(X(x))}" cy="${A(Y(y))}" r="1.9" fill="${INK}"/>`);
        return g.join('');
    }
    const bas = ordning.map(panel).join('');
    FIG['b9'] = svg(W, H, bas);

    // Lösningsfigurer: strukna diagram täcks av en halvgenomskinlig
    // pappersruta med en kort röd notering, de rätta ramas in i blått.
    function stryk(id, ord, anim) {
        // C och D: notisen nere till höger (linjen ligger uppe till vänster)
        const o = ruta(id), nere = id === 'C' || id === 'D';
        return `<g${anim || ''}><rect x="${o.x + 1}" y="${o.y + 1}" width="${PW - 2}" height="${PH - 2}" fill="${PAPER}" fill-opacity="0.72"/>` +
            line(o.x + 12, o.y + PH - 12, o.x + PW - 12, o.y + 12, { c: RED, w: 1.8, cap: 'round' }) +
            (nere ? txt(o.x + PW - 14, o.y + PH - 40, ord, { size: 13, fill: RED, anchor: 'end', weight: 600 })
                : txt(o.x + 30, o.y + 46, ord, { size: 13, fill: RED, anchor: 'start', weight: 600 })) + '</g>';
    }
    function ram(id, anim) {
        const o = ruta(id);
        return `<rect x="${o.x + 2.5}" y="${o.y + 2.5}" width="${PW - 5}" height="${PH - 5}" fill="none" stroke="${BLUE}" stroke-width="3.5"${anim || ''}/>` +
            txt(o.x + PW - 10, o.y + 20, 'stark positiv', { size: 12.5, fill: BLUE, anchor: 'end', weight: 600, anim });
    }
    FIG['b9-negativa'] = svg(W, H, bas + stryk('C', 'lutar nedåt', aFade(BAS)) + stryk('D', 'lutar nedåt', aFade(BAS + 0.3)));
    FIG['b9-svaga'] = svg(W, H, bas + stryk('C', 'lutar nedåt') + stryk('D', 'lutar nedåt') +
        stryk('B', 'utspridd', aFade(BAS)) + stryk('E', 'utspridd', aFade(BAS + 0.3)));
    FIG['b9-svar'] = svg(W, H, bas + stryk('C', 'lutar nedåt') + stryk('D', 'lutar nedåt') +
        stryk('B', 'utspridd') + stryk('E', 'utspridd') + ram('A', aFade(BAS)) + ram('F', aFade(BAS + 0.3)));
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet — figurer till NP Ma 2b VT 2022 (genererade — redigera inte för');
out.push('// hand; generatorn ligger i .claude/np-figs/gen-ma2b-vt2022.js, koordinater beräknade).');
out.push('// Bara 2b-provets egna figurer (b<nr>…). De lånade uppgifternas figurer');
out.push('// kopieras från ma2c-vt2022 av härledningen i data/np/ma2b-vt2022.js.');
out.push('// Klassen anim-fade animeras av CSS i np.html när steget fälls ut.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['ma2b-vt2022'] = Object.assign(window.NP_FIGURER['ma2b-vt2022'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'ma2b-vt2022-figurer.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
