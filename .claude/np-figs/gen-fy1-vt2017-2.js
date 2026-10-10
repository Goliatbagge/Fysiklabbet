// Generator för data/np/fy1-vt2017-figurer-2.js: Kursprov Fysik 1 VT 2017,
// delprov A, uppgift 11–16 (del 2 av 3). Alla koordinater beräknade.
// Kör från repo-roten:  node .claude/np-figs/gen-fy1-vt2017-2.js
// Konventioner (som gen-fy2vt2016.js): ink #0f1620, soft #3f4a5c,
// accent #c8324a (krafter/markeringar i lösningssteg), blå #1c5fa8
// (hastigheter/givna värden). Kraftpilar: butt-cap, skaftet slutar vid
// pilhuvudets bas, skalenliga längder. Animation: anim-draw (heldragna
// linjer ritas), anim-fade (etiketter, streckade linjer, ytor).
'use strict';
const fs = require('fs');
const path = require('path');

const INK = '#0f1620', SOFT = '#3f4a5c', RED = '#c8324a', BLUE = '#1c5fa8';
const RED_T = 'rgba(200,50,74,0.12)';
const GRAY = 'rgba(15,22,32,0.16)';
const GRAY2 = 'rgba(15,22,32,0.30)';

const A = x => Math.round(x * 100) / 100;
const aDraw = (d, dur = 0.5) => ` pathLength="1" class="anim-draw" style="animation-delay:${d}s;animation-duration:${dur}s"`;
const aFade = d => ` class="anim-fade" style="animation-delay:${d}s"`;
const BAS = 1.2;
const D2R = Math.PI / 180;

function line(x1, y1, x2, y2, o = {}) {
    return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.6}"` +
        (o.dash ? ` stroke-dasharray="${o.dash}"` : '') +
        (o.cap ? ` stroke-linecap="${o.cap}"` : '') +
        (o.anim || '') + '/>';
}
// Kraft-/hastighetspil: butt-cap, skaftet slutar vid pilhuvudets BAS.
// o.anim = fördröjning: skaftet ritas, huvudet tonas in. o.fade = allt tonas
// in (krävs för streckade pilar, som inte kan stroke-animeras).
function arrow(x1, y1, x2, y2, o = {}) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const h = o.head || Math.max(7, Math.min(12, L * 0.5));
    const bx = x2 - ux * h, by = y2 - uy * h;
    const wh = h * 0.44, px = -uy, py = ux;
    const animLine = o.anim !== undefined ? aDraw(o.anim, 0.4) : (o.fade !== undefined ? aFade(o.fade) : '');
    const animHead = o.anim !== undefined ? aFade(o.anim + 0.25) : (o.fade !== undefined ? aFade(o.fade) : '');
    return line(x1, y1, bx, by, { c: o.c, w: o.w || 2.6, cap: 'butt', dash: o.dash, anim: animLine }) +
        `<polygon points="${A(bx + px * wh)},${A(by + py * wh)} ${A(x2)},${A(y2)} ${A(bx - px * wh)},${A(by - py * wh)}" fill="${o.c || INK}"${animHead}/>`;
}
// Måttlinje med dubbelpil.
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
    return `<text x="${A(x)}" y="${A(y)}" font-size="${o.size || 13}" text-anchor="${o.anchor || 'middle'}" fill="${o.fill || INK}"` +
        (o.italic ? ' font-style="italic"' : '') + (o.anim || '') + `>${s}</text>`;
}
const it = s => `<tspan font-style="italic">${s}</tspan>`;
// Variabel med nedsänkt index (indexet rakt).
const sub = (v, ix, rest = '') =>
    `<tspan font-style="italic">${v}</tspan><tspan font-size="9.5" dy="3">${ix}</tspan><tspan dy="-3">${rest || '&#8203;'}</tspan>`;
const svg = (w, h, inner) =>
    `<svg viewBox="0 0 ${w} ${h}" width="${w}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const NB = ' ';

const FIG = {};

/* ===================================================================
 * UPPGIFT 11: två kretsar. Komponenterna jämnt fördelade på sina
 * ledarsträckor (CLAUDE.md, kopplingsscheman): mellanrummet före, mellan
 * och efter komponenterna är lika stort på varje sträcka nod till nod.
 * =================================================================== */
(function () {
    const W = 510, H = 192;
    const yT = 30, yB = 150;
    const RW = 40, RH = 12;               // resistor 40 × 12
    const AR = 11;                         // amperemeterns radie
    const BP = 8;                          // avstånd mellan batteriplattorna
    // Vänster ledare: amperemeter + batteri, tre lika mellanrum.
    const gL = ((yB - yT) - 2 * AR - BP) / 3;   // = 30
    const yAm = yT + gL + AR;                   // 71
    const yBat1 = yAm + AR + gL, yBat2 = yBat1 + BP; // 112, 120

    function wire(x1, y1, x2, y2, c, anim) {
        return `<line x1="${A(x1)}" y1="${A(y1)}" x2="${A(x2)}" y2="${A(y2)}" stroke="${c || INK}" stroke-width="1.7" stroke-linecap="round"${anim || ''}/>`;
    }
    function resH(cx, cy, o = {}) {
        return `<rect x="${A(cx - RW / 2)}" y="${A(cy - RH / 2)}" width="${RW}" height="${RH}" fill="${o.fill || 'none'}" stroke="${o.c || INK}" stroke-width="1.7"${o.anim || ''}/>`;
    }
    function resV(cx, cy, o = {}) {
        return `<rect x="${A(cx - RH / 2)}" y="${A(cy - RW / 2)}" width="${RH}" height="${RW}" fill="${o.fill || 'none'}" stroke="${o.c || INK}" stroke-width="1.7"${o.anim || ''}/>`;
    }
    // Vänster ledare (amperemeter överst, batteri under), som i originalet.
    function leftWire(x) {
        const g = [];
        g.push(wire(x, yT, x, yAm - AR));
        g.push(`<circle cx="${x}" cy="${yAm}" r="${AR}" fill="none" stroke="${INK}" stroke-width="1.7"/>`);
        g.push(txt(x, yAm + 4.5, 'A', { size: 12 }));
        g.push(wire(x, yAm + AR, x, yBat1));
        g.push(line(x - 13, yBat1, x + 13, yBat1, { w: 1.7 }));      // pluspol: lång tunn
        g.push(line(x - 6, yBat2, x + 6, yBat2, { w: 3.4 }));        // minuspol: kort tjock
        g.push(wire(x, yBat2, x, yB));
        return g.join('');
    }
    // Krets I: 150 Ω på toppledningen till noden, 470 Ω lodrätt nod–botten,
    // 220 Ω på toppledningen från noden till högra hörnet.
    const xL = 40, xN = 190, xR = 300;
    const c150 = (xL + xN) / 2, c220 = (xN + xR) / 2, c470 = (yT + yB) / 2;
    function kretsI(o = {}) {
        const g = [];
        g.push(leftWire(xL));
        g.push(wire(xL, yT, c150 - RW / 2, yT));
        g.push(resH(c150, yT));
        g.push(wire(c150 + RW / 2, yT, xN, yT));
        const pc = o.par ? RED : INK;
        g.push(wire(xN, yT, c220 - RW / 2, yT, pc));
        g.push(resH(c220, yT, { c: pc, fill: o.par ? RED_T : 'none' }));
        g.push(wire(c220 + RW / 2, yT, xR, yT, pc));
        g.push(wire(xR, yT, xR, yB, pc));
        g.push(wire(xN, yT, xN, c470 - RW / 2, pc));
        g.push(resV(xN, c470, { c: pc, fill: o.par ? RED_T : 'none' }));
        g.push(wire(xN, c470 + RW / 2, xN, yB, pc));
        g.push(wire(xL, yB, xN, yB));
        g.push(wire(xN, yB, xR, yB, pc));
        g.push(`<circle cx="${xN}" cy="${yT}" r="2.6" fill="${pc}"/>`);
        g.push(`<circle cx="${xN}" cy="${yB}" r="2.6" fill="${pc}"/>`);
        return g.join('');
    }
    const x2L = 370, x2R = 470;
    function kretsII(rLabel) {
        const g = [];
        g.push(leftWire(x2L));
        g.push(wire(x2L, yT, x2R, yT));
        g.push(wire(x2L, yB, x2R, yB));
        g.push(wire(x2R, yT, x2R, c470 - RW / 2));
        g.push(resV(x2R, c470));
        g.push(wire(x2R, c470 + RW / 2, x2R, yB));
        g.push(rLabel || txt(x2R - 12, c470 + 5, it('R'), { anchor: 'end' }));
        return g.join('');
    }
    const ohm = v => `${v}${NB}Ω`;

    // Frågefiguren
    (function () {
        const g = [kretsI(), kretsII()];
        g.push(txt(c150, yT + 23, ohm(150)));
        g.push(txt(c220, yT + 23, ohm(220)));
        g.push(txt(xN - 12, c470 + 5, ohm(470), { anchor: 'end' }));
        g.push(txt((xL + xR) / 2, H - 10, 'Krets I'));
        g.push(txt((x2L + x2R) / 2, H - 10, 'Krets II'));
        FIG['u11'] = svg(W, H, g.join(''));
    })();

    // s1: parallellkopplingen (470 Ω och 220 Ω) markeras
    (function () {
        const g = [kretsI({ par: true }), kretsII()];
        g.push(txt(c150, yT + 23, `${sub('R', '1')} = ${ohm(150)}`));
        g.push(txt(c220, yT + 23, `${sub('R', '3')} = ${ohm(220)}`, { fill: RED, anim: aFade(BAS + 0.3) }));
        g.push(txt(xN - 12, c470 + 5, `${sub('R', '2')} = ${ohm(470)}`, { anchor: 'end', fill: RED, anim: aFade(BAS + 0.3) }));
        g.push(txt(c220, yB - 14, 'parallellkopplade', { size: 11.5, fill: RED, anim: aFade(BAS + 0.6) }));
        g.push(txt((xL + xR) / 2, H - 10, 'Krets I'));
        g.push(txt((x2L + x2R) / 2, H - 10, 'Krets II'));
        FIG['u11-s1'] = svg(W, H, g.join(''));
    })();

    // s2: ersättningskretsen: R1 i serie med R2,3 (på högra ledaren)
    (function () {
        const g = [];
        g.push(leftWire(xL));
        const cTop = (xL + xR) / 2;
        g.push(wire(xL, yT, cTop - RW / 2, yT));
        g.push(resH(cTop, yT));
        g.push(wire(cTop + RW / 2, yT, xR, yT));
        g.push(wire(xL, yB, xR, yB));
        g.push(wire(xR, yT, xR, c470 - RW / 2, RED));
        g.push(resV(xR, c470, { c: RED, fill: RED_T }));
        g.push(wire(xR, c470 + RW / 2, xR, yB, RED));
        g.push(txt(cTop, yT + 23, `${sub('R', '1')} = ${ohm(150)}`));
        g.push(txt(xR - 12, c470 + 5, sub('R', '2,3'), { anchor: 'end', fill: RED }));
        g.push(txt((xL + xR) / 2, c470 + 30, `${sub('R', 'tot')} = ${sub('R', '1')} + ${sub('R', '2,3')}`,
            { fill: RED, anim: aFade(BAS + 0.4) }));
        g.push(kretsII(txt(x2R - 12, c470 + 5, `${it('R')} = ${sub('R', 'tot')}`, { anchor: 'end', fill: RED, anim: aFade(BAS + 0.9) })));
        g.push(txt((xL + xR) / 2, H - 10, 'Krets I, förenklad'));
        g.push(txt((x2L + x2R) / 2, H - 10, 'Krets II'));
        FIG['u11-s2'] = svg(W, H, g.join(''));
    })();
})();

/* ===================================================================
 * UPPGIFT 12: två laddade kulor på en lodrät tråd.
 * Skala i stegfigurerna: m·g ↔ 52 px. Den övre kulan: F_G och F_e lika
 * långa och motriktade, intill varandra på var sin sida om tråden (lika
 * stora, symmetriska ⇒ inget vridmoment). Den nedre: F_G och F_e nedåt
 * (symmetriskt kring tråden), F_N uppåt från kontaktpunkten mot bordet,
 * dubbelt så lång (F_N = 2·m·g), på trådens linje.
 * =================================================================== */
(function () {
    const W = 330;
    const tx = 150;                 // trådens x
    const yTab = 300;               // bordsytan
    const R = 16;                   // kulans radie
    const yLo = yTab - R;           // nedre kulans centrum (vilar på bordet)
    const rPx = 120;                // avståndet r i figuren
    const yUp = yLo - rPx;          // övre kulans centrum
    const rod = { x: 245, w: 8, top: 36 };
    const arm = { y: 46, h: 6, x0: 124, x1: rod.x + rod.w / 2 + 14 };
    const base = { x0: 221, x1: 269, y0: 286 };
    const MG = 52;                  // px för m·g

    function ball(cy) {
        return `<circle cx="${tx}" cy="${A(cy)}" r="${R}" fill="${GRAY}" stroke="${INK}" stroke-width="2"/>` +
            line(tx, cy - R + 1.5, tx, cy + R - 1.5, { c: INK, w: 1.2, dash: '3 3' });
    }
    function base_(o = {}) {
        const g = [];
        // bord med skraffering (o.hatchGap: utan skraffering under kulan)
        g.push(line(92, yTab, 300, yTab, { w: 2 }));
        for (let x = 98; x <= 296; x += 11) {
            if (o.hatchGap && x >= o.hatchGap[0] && x - 8 <= o.hatchGap[1]) continue;
            g.push(line(x, yTab, x - 8, yTab + 10, { c: SOFT, w: 1.1 }));
        }
        // stativ: fot, stång, arm
        g.push(`<rect x="${base.x0}" y="${base.y0}" width="${base.x1 - base.x0}" height="${yTab - base.y0}" fill="${GRAY2}" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(`<rect x="${rod.x - rod.w / 2}" y="${rod.top}" width="${rod.w}" height="${base.y0 - rod.top}" fill="${GRAY}" stroke="${INK}" stroke-width="1.3"/>`);
        g.push(`<rect x="${arm.x0}" y="${arm.y}" width="${arm.x1 - arm.x0}" height="${arm.h}" fill="${GRAY}" stroke="${INK}" stroke-width="1.3"/>`);
        // tråden
        g.push(line(tx, arm.y + arm.h, tx, yUp - R, { w: 1.4 }));
        g.push(line(tx, yUp + R, tx, yLo - R, { w: 1.4 }));
        g.push(ball(yUp));
        g.push(ball(yLo));
        // måttet r (måttlinje i fri yta till vänster)
        const xd = 112;
        g.push(line(xd - 8, yUp, tx - R - 3, yUp, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(line(xd - 8, yLo, tx - R - 3, yLo, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(dim(xd, yUp, xd, yLo, {}));
        g.push(txt(xd - 8, (yUp + yLo) / 2 + 5, it('r'), { anchor: 'end' }));
        return g;
    }
    FIG['u12'] = svg(W, 318, base_().join(''));

    // s1: krafterna på den ÖVRE kulan. F_G och F_e intill varandra, 4 px
    // isär, symmetriskt kring tyngdpunkten (lika stora ⇒ inget moment).
    (function () {
        const g = base_();
        const d = 2;
        g.push(arrow(tx - d, yUp, tx - d, yUp + MG, { c: RED, anim: BAS }));
        g.push(`<circle cx="${tx}" cy="${yUp}" r="2.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(txt(tx + 9, yUp + MG + 2, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        g.push(arrow(tx + d, yUp, tx + d, yUp - MG, { c: RED, anim: BAS + 0.8 }));
        g.push(txt(tx + 12, yUp - MG + 6, sub('F', 'e'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        FIG['u12-s1'] = svg(W, 318, g.join(''));
    })();

    // s2: krafterna på den NEDRE kulan. F_G från tyngdpunkten (x = tx),
    // F_e på x = tx + 8 och F_N = 2·m·g på x = tx + 4. Moment kring
    // tyngdpunkten: F_e·8 − F_N·4 = 8 − 8 = 0. Bordets skraffering är
    // borttagen under kulan, så att pilarna går genom fri yta.
    (function () {
        const g = base_({ hatchGap: [tx - 26, tx + 34] });
        g.push(arrow(tx, yLo, tx, yLo + MG, { c: RED, anim: BAS }));
        g.push(`<circle cx="${tx}" cy="${yLo}" r="2.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(txt(tx - 6, yLo + MG + 14, sub('F', 'G'), { fill: RED, anchor: 'end', anim: aFade(BAS + 0.4) }));
        g.push(arrow(tx + 8, yLo, tx + 8, yLo + MG, { c: RED, anim: BAS + 0.8 }));
        g.push(txt(tx + 14, yLo + MG + 14, sub('F', 'e'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        g.push(arrow(tx + 4, yTab, tx + 4, yTab - 2 * MG, { c: RED, anim: BAS + 1.6 }));
        g.push(txt(tx + 13, yTab - 2 * MG + 8, sub('F', 'N'), { fill: RED, anchor: 'start', anim: aFade(BAS + 2.0) }));
        FIG['u12-s2'] = svg(W, 372, g.join(''));
    })();
})();

/* ===================================================================
 * UPPGIFT 14: bilen bromsar. Skala: tyngdkraften F_G ↔ 130 px (plan väg)
 * resp. 190 px (backen). Normalkraften delas lika på de två hjulens
 * kontaktpunkter (symmetriskt kring tyngdpunkten), friktionen = 0,20·F_N.
 * =================================================================== */
// Bilen ritas i lokala koordinater (s längs vägen, h upp från vägen) och
// avbildas med P(s,h). Hjulen tangerar vägen.
function car(P0, k = 1) {
    const g = [];
    const P = (s, h) => P0(s * k, h * k);
    const poly = pts => pts.map(p => P(p[0], p[1])).map(p => `${A(p[0])},${A(p[1])}`).join(' ');
    g.push(`<polygon points="${poly([[0, 10], [120, 10], [120, 34], [104, 38], [90, 58], [36, 58], [22, 38], [0, 34]])}" fill="${GRAY}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`);
    g.push(`<polygon points="${poly([[42, 40], [86, 40], [80, 54], [44, 54]])}" fill="rgba(255,255,255,0.55)" stroke="${INK}" stroke-width="1.1"/>`);
    for (const s of [25, 95]) {
        const c = P(s, 11);
        g.push(`<circle cx="${A(c[0])}" cy="${A(c[1])}" r="${A(11 * k)}" fill="${GRAY2}" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(`<circle cx="${A(c[0])}" cy="${A(c[1])}" r="3.5" fill="${INK}"/>`);
    }
    return g.join('');
}
(function () {
    const K = 1.3;                         // bilens skala
    // Momentbalans kring tyngdpunkten: friktionen F_f angriper vid marken,
    // h = 34·K under tyngdpunkten, och ger ett moment som måste tas ut av
    // att framhjulets normalkraft är större än bakhjulets. Hjulen sitter
    // d = 35·K framför respektive bakom tyngdpunkten:
    //   F_N2·d − F_N1·d − F_f·h = 0  och  F_N1 + F_N2 = F_N
    //   ⇒ F_N2 − F_N1 = F_f·h/d.
    const h = 34 * K, dW = 35 * K;
    function normaler(FN, FF) {
        const diff = FF * h / dW;
        return [(FN - diff) / 2, (FN + diff) / 2];
    }
    /* ---- s1: plan väg ---- */
    (function () {
        const W = 470, H = 336;
        const yR = 190, x0 = 120;
        const P = (s, hh) => [x0 + s, yR - hh];
        const g = [];
        g.push(line(30, yR, 440, yR, { w: 2 }));
        for (let x = 36; x <= 436; x += 12) g.push(line(x, yR, x - 8, yR + 9, { c: SOFT, w: 1 }));
        g.push(car(P, K));
        const FG = 150, FF = 0.20 * FG;
        const [FN1, FN2] = normaler(FG, FF);
        const cm = P(60 * K, h), w1 = P(25 * K, 0), w2 = P(95 * K, 0);
        g.push(`<circle cx="${A(cm[0])}" cy="${A(cm[1])}" r="2.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(arrow(cm[0], cm[1], cm[0], cm[1] + FG, { c: RED, anim: BAS }));
        g.push(txt(cm[0] + 9, cm[1] + FG - 2, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        g.push(arrow(w1[0], w1[1], w1[0], w1[1] - FN1, { c: RED, anim: BAS + 0.8 }));
        g.push(arrow(w2[0], w2[1], w2[0], w2[1] - FN2, { c: RED, anim: BAS + 0.8 }));
        g.push(txt(w1[0] - 12, w1[1] - FN1 - 2, sub('F', 'N1'), { fill: RED, anchor: 'end', anim: aFade(BAS + 1.2) }));
        g.push(txt(w2[0] + 9, w2[1] - FN2 + 6, sub('F', 'N2'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        g.push(arrow(w1[0], w1[1], w1[0] - FF, w1[1], { c: RED, anim: BAS + 1.6, head: 10 }));
        g.push(txt(w1[0] - FF / 2, yR + 27, sub('F', 'f'), { fill: RED, anim: aFade(BAS + 2.0) }));
        const fr = P(120 * K, 22 * K);
        g.push(arrow(fr[0], fr[1], fr[0] + 52, fr[1], { c: BLUE, w: 2.2 }));
        g.push(txt(fr[0] + 58, fr[1] + 5, `${sub('v', '0')} = 90${NB}km/h`, { fill: BLUE, anchor: 'start' }));
        FIG['u14-s1'] = svg(W, H, g.join(''));
    })();

    /* ---- s2: nedförsbacke 5° med krafterna på bilen ---- */
    const al = 5 * D2R, ca = Math.cos(al), sa = Math.sin(al);
    (function () {
        const W = 470, H = 330;
        const Ax = 24, Ay = 150, Ls = 420;
        const ux = ca, uy = sa;                     // nedför backen
        const nx = sa, ny = -ca;                    // ut från vägytan
        const P = (s, hh) => [Ax + s * ux + hh * nx, Ay + s * uy + hh * ny];
        const B = P(Ls, 0);
        const g = [];
        g.push(`<polygon points="${A(Ax)},${A(Ay)} ${A(B[0])},${A(B[1])} ${A(Ax)},${A(B[1])}" fill="rgba(15,22,32,0.06)" stroke="none"/>`);
        g.push(line(Ax, Ay, B[0], B[1], { w: 2 }));
        g.push(line(Ax, B[1], B[0] + 16, B[1], { w: 1.6 }));
        g.push(line(Ax, Ay, Ax, B[1], { w: 1.2, c: SOFT }));
        // vinkelbågen med medelpunkt i B; etiketten under marklinjen
        const rA = 150;
        const a1 = [B[0] - rA, B[1]], a2 = [B[0] - rA * ca, B[1] - rA * sa];
        g.push(`<path d="M ${A(a1[0])} ${A(a1[1])} A ${rA} ${rA} 0 0 1 ${A(a2[0])} ${A(a2[1])}" fill="none" stroke="${INK}" stroke-width="1.4"/>`);
        g.push(line(a1[0], B[1], a1[0], B[1] + 6, { c: INK, w: 1 }));
        g.push(txt(a1[0] + 4, B[1] + 20, `${it('α')} = 5°`, { size: 12.5, anchor: 'middle' }));

        const s0 = 40;
        const Pc = (s, hh) => P(s0 + s, hh);
        g.push(car(Pc, K));
        const FG = 170, F2 = FG * ca, FF = 0.20 * F2;
        const [FN1, FN2] = normaler(F2, FF);
        const cm = Pc(60 * K, h), w1 = Pc(25 * K, 0), w2 = Pc(95 * K, 0);
        g.push(`<circle cx="${A(cm[0])}" cy="${A(cm[1])}" r="2.6" fill="${RED}"${aFade(BAS)}/>`);
        g.push(arrow(cm[0], cm[1], cm[0], cm[1] + FG, { c: RED, anim: BAS }));
        g.push(txt(cm[0] + 9, cm[1] + FG - 2, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
        g.push(arrow(w1[0], w1[1], w1[0] + nx * FN1, w1[1] + ny * FN1, { c: RED, anim: BAS + 0.8 }));
        g.push(arrow(w2[0], w2[1], w2[0] + nx * FN2, w2[1] + ny * FN2, { c: RED, anim: BAS + 0.8 }));
        g.push(txt(w1[0] + nx * FN1 - 12, w1[1] + ny * FN1 - 2, sub('F', 'N1'), { fill: RED, anchor: 'end', anim: aFade(BAS + 1.2) }));
        g.push(txt(w2[0] + nx * FN2 + 9, w2[1] + ny * FN2 + 8, sub('F', 'N2'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        g.push(arrow(w1[0], w1[1], w1[0] - ux * FF, w1[1] - uy * FF, { c: RED, anim: BAS + 1.6, head: 10 }));
        g.push(txt(w1[0] - ux * FF - 4, w1[1] - uy * FF - 9, sub('F', 'f'), { fill: RED, anchor: 'end', anim: aFade(BAS + 2.0) }));
        const fr = Pc(120 * K, 22 * K);
        g.push(arrow(fr[0], fr[1], fr[0] + ux * 50, fr[1] + uy * 50, { c: BLUE, w: 2.2 }));
        g.push(txt(fr[0] + ux * 56, fr[1] + uy * 56 + 5, sub('v', '0'), { fill: BLUE, anchor: 'start' }));
        FIG['u14-s2'] = svg(W, H, g.join(''));
    })();

    /* ---- s3: komposantuppdelningen av F_G, förstorad (F_G = 300 px) ----
     * Parallellogram: F_1 längs vägen och F_2 vinkelrätt mot vägen, båda
     * streckade från angreppspunkten, plus två svaga streckade guider. */
    (function () {
        const W = 330, H = 420;
        const FG = 300, F1 = FG * sa, F2 = FG * ca;
        const Q = [170, 52];
        const u = [ca, sa], m = [-sa, ca];          // längs vägen nedför, in mot vägen
        const T1 = [Q[0] + u[0] * F1, Q[1] + u[1] * F1];
        const T2 = [Q[0] + m[0] * F2, Q[1] + m[1] * F2];
        const TG = [Q[0], Q[1] + FG];
        const g = [];
        // en bit av vägens riktning genom angreppspunkten, som referens
        g.push(line(Q[0] - u[0] * 110, Q[1] - u[1] * 110, Q[0] + u[0] * 120, Q[1] + u[1] * 120, { c: SOFT, w: 1.2 }));
        g.push(txt(Q[0] - u[0] * 110, Q[1] - u[1] * 110 - 8, 'vägens riktning', { size: 11, fill: SOFT, anchor: 'start' }));
        g.push(`<circle cx="${Q[0]}" cy="${Q[1]}" r="2.8" fill="${RED}"/>`);
        g.push(arrow(Q[0], Q[1], TG[0], TG[1], { c: RED, anim: BAS }));
        g.push(txt(TG[0] + 9, TG[1] + 4, sub('F', 'G'), { fill: RED, anchor: 'start', anim: aFade(BAS + 0.3) }));
        // komposanterna, streckade
        g.push(arrow(Q[0], Q[1], T2[0], T2[1], { c: RED, dash: '7 4', fade: BAS + 0.7 }));
        g.push(txt(T2[0] - 9, T2[1] + 4, sub('F', '2'), { fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
        g.push(arrow(Q[0], Q[1], T1[0], T1[1], { c: RED, dash: '4 2.5', head: 9, fade: BAS + 1.0 }));
        g.push(txt(T1[0] + 4, T1[1] + 20, sub('F', '1'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.0) }));
        // svaga guider som sluter parallellogrammen
        g.push(line(T1[0], T1[1], TG[0], TG[1], { c: RED, w: 1, dash: '3 4', anim: aFade(BAS + 1.3) }));
        g.push(line(T2[0], T2[1], TG[0], TG[1], { c: RED, w: 1, dash: '3 4', anim: aFade(BAS + 1.3) }));
        // vinkeln α mellan F_G och F_2, medelpunkt i Q
        const rA = 210, rT = 236, mid = 2.5 * D2R;
        const b1 = [Q[0], Q[1] + rA], b2 = [Q[0] - sa * rA, Q[1] + ca * rA];
        g.push(`<path d="M ${A(b1[0])} ${A(b1[1])} A ${rA} ${rA} 0 0 1 ${A(b2[0])} ${A(b2[1])}" fill="none" stroke="${INK}" stroke-width="1.4"${aFade(BAS + 1.6)}/>`);
        g.push(txt(Q[0] - rT * Math.sin(mid), Q[1] + rT * Math.cos(mid) + 5, it('α'), { size: 13, anim: aFade(BAS + 1.6) }));
        g.push(txt(W / 2, H - 26, 'Förstorad: tyngdkraften är ritad', { size: 11.5, fill: SOFT }));
        g.push(txt(W / 2, H - 10, 'längre här än i bilfiguren.', { size: 11.5, fill: SOFT }));
        FIG['u14-s3'] = svg(W, H, g.join(''));
    })();
})();
/* ===================================================================
 * UPPGIFT 15: varmfronten. Varm luft (A) glider upp längs den kalla
 * luftmassans front till B, där moln bildas.
 * =================================================================== */
// Moln som en sluten bana: bulor (cirkelbågar) längs en översida, plan undersida.
function cloud(x0, x1, yb, hump, o = {}) {
    const n = o.n || 5;
    const w = (x1 - x0) / n;
    const yTop = yb - hump;
    let d = `M ${A(x0)} ${A(yb)} `;
    // vänster sida upp
    d += `Q ${A(x0 - hump * 0.35)} ${A(yb - hump * 0.45)} ${A(x0 + w * 0.25)} ${A(yTop + hump * 0.35)} `;
    for (let i = 0; i < n; i++) {
        const xa = x0 + w * (i + 0.25), xb = Math.min(x1 - w * 0.25, x0 + w * (i + 1.25));
        const hh = hump * (o.hs ? o.hs[i] : 1);
        if (xb <= xa) break;
        d += `C ${A(xa)} ${A(yb - hh * 1.25)} ${A(xb)} ${A(yb - hh * 1.25)} ${A(xb)} ${A(yTop + hump * 0.35)} `;
    }
    d += `Q ${A(x1 + hump * 0.35)} ${A(yb - hump * 0.45)} ${A(x1)} ${A(yb)} Z`;
    return `<path d="${d}" fill="${o.fill || GRAY}" stroke="${o.c || INK}" stroke-width="${o.w || 1.3}" stroke-linejoin="round"${o.anim || ''}/>`;
}
function tree(x, yb, h, o = {}) {
    const w = h * 0.55;
    return `<polygon points="${A(x - w / 2)},${A(yb - h * 0.18)} ${A(x)},${A(yb - h)} ${A(x + w / 2)},${A(yb - h * 0.18)}" fill="${o.fill || 'rgba(15,22,32,0.45)'}" stroke="${INK}" stroke-width="1"/>` +
        line(x, yb - h * 0.18, x, yb, { w: 1.6 });
}
(function () {
    const W = 520, H = 250;
    const xAx = 46, yG = 232;
    // kalla luftens front: från marken vid xF0 upp till (xF1, yTop)
    const xF0 = 248, xF1 = 330, yTop = 52, xEnd = 500;
    const fdx = xF1 - xF0, fdy = yG - yTop;
    const fl = Math.hypot(fdx, fdy), fu = [fdx / fl, -fdy / fl];   // uppåt längs fronten
    const angF = Math.atan2(-fdy, fdx) / D2R;                      // fronten i skärmvinkel
    const Bc = [xF0 + fu[0] * 118 - 18, yG + fu[1] * 118];         // B:s centrum, strax framför fronten

    function base(o = {}) {
        const g = [];
        g.push(`<polygon points="${xF0},${yG} ${xF1},${yTop} ${xEnd},${yTop} ${xEnd},${yG}" fill="rgba(15,22,32,0.09)" stroke="none"/>`);
        // axel med pil bara uppåt, markytan utan pil
        g.push(line(xAx, yG, xEnd, yG, { w: 1.6 }));
        g.push(arrow(xAx, yG, xAx, 14, { w: 1.6, head: 10 }));
        g.push(txt(xAx - 6, 22, 'höjd', { anchor: 'end', size: 12.5 }));
        // träd på marken under den kalla luften
        [[262, 22], [276, 20], [338, 18], [372, 22], [388, 18], [430, 20], [452, 17], [474, 21]]
            .forEach(([x, h]) => g.push(tree(x, yG, h)));
        // A
        g.push(`<ellipse cx="130" cy="196" rx="62" ry="26" fill="none" stroke="${RED}" stroke-width="1.6" stroke-dasharray="6 4"/>`);
        g.push(txt(130, 190, 'A', { size: 13.5 }));
        g.push(txt(130, 208, 'varm luft', { size: 12 }));
        [176, 196, 216].forEach((y, i) => g.push(arrow(202 + (i === 1 ? 8 : 0), y, 248 + (i === 1 ? 8 : 0), y, { c: RED, w: 2.6, head: 10 })));
        // B: lutad ellips längs fronten
        g.push(`<ellipse cx="${A(Bc[0])}" cy="${A(Bc[1])}" rx="72" ry="21" transform="rotate(${A(angF)} ${A(Bc[0])} ${A(Bc[1])})" fill="none" stroke="${RED}" stroke-width="1.6" stroke-dasharray="6 4"/>`);
        for (const t of [-44, 4]) {
            const p0 = [Bc[0] + fu[0] * t, Bc[1] + fu[1] * t];
            g.push(arrow(p0[0], p0[1], p0[0] + fu[0] * 34, p0[1] + fu[1] * 34, { c: RED, w: 2.6, head: 10 }));
        }
        g.push(txt(Bc[0] - 12, Bc[1] + 3, 'B', { size: 13.5 }));
        // moln vid B
        if (!o.noCloud) {
            g.push(cloud(318, 362, 112, 12, { n: 3 }));
            g.push(cloud(300, 340, 124, 11, { n: 3 }));
        }
        return g;
    }
    FIG['u15'] = svg(W, H, base().join(''));

    // s1: tillstånden i A och B
    (function () {
        const g = base();
        g.push(txt(84, 154, `${sub('p', '1')}, ${sub('V', '1')}, ${sub('T', '1')}`, { fill: BLUE, anchor: 'start', anim: aFade(BAS) }));
        const lx = 140, ly = 92;
        g.push(txt(lx, ly, `${sub('p', '2')} = 0,50 · ${sub('p', '1')}`, { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.6) }));
        g.push(txt(lx, ly + 20, `${sub('T', '2')} = 0,80 · ${sub('T', '1')}`, { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.9) }));
        g.push(txt(lx, ly + 40, sub('V', '2'), { fill: RED, anchor: 'start', anim: aFade(BAS + 1.2) }));
        FIG['u15-s1'] = svg(W, H, g.join(''));
    })();

    // s2: luften kyls, vattenångan kondenserar till droppar = moln
    (function () {
        const g = base({ noCloud: true });
        const an = aFade(BAS);
        g.push(`<g${an}>${cloud(318, 362, 112, 12, { n: 3 })}${cloud(300, 340, 124, 11, { n: 3 })}</g>`);
        // droppar
        [[292, 90], [300, 84], [304, 96], [294, 100], [286, 94]].forEach(([x, y], i) =>
            g.push(`<circle cx="${x}" cy="${y}" r="2.2" fill="${BLUE}"${aFade(BAS + 0.4 + i * 0.1)}/>`));
        g.push(line(238, 80, 282, 90, { c: SOFT, w: 1, anim: aFade(BAS + 0.9) }));
        g.push(txt(234, 82, 'kondensation', { size: 12, anchor: 'end', fill: BLUE, anim: aFade(BAS + 0.9) }));
        g.push(txt(92, 34, 'lägre tryck och temperatur:', { size: 12, anchor: 'start', fill: RED, anim: aFade(BAS + 1.3) }));
        g.push(txt(92, 52, 'vattenånga blir vattendroppar', { size: 12, anchor: 'start', fill: RED, anim: aFade(BAS + 1.5) }));
        FIG['u15-s2'] = svg(W, H, g.join(''));
    })();
})();

/* ===================================================================
 * UPPGIFT 16: åskmolnet. Molnets undersida (−) 1,5 km över marken.
 * Fältlinjerna mellan marken och molnet är parallella med pilspetsen
 * MITT på linjen, alla spetsar på samma höjd (fältlinjeregeln).
 * =================================================================== */
(function () {
    const W = 520, H = 280;
    const yCb = 86, yG = 226;        // molnets undersida, marken
    const xG0 = 100, xG1 = 486;
    function base(o = {}) {
        const g = [];
        // mark med lätt kulle i mitten
        const hill = [];
        for (let i = 0; i <= 60; i++) {
            const x = xG0 + (300 - xG0) * i / 60;
            hill.push([x, yG - 10 * Math.exp(-Math.pow((x - 215) / 34, 2))]);
        }
        const hillD = 'M ' + hill.map(p => `${A(p[0])} ${A(p[1])}`).join(' L ') + ` L ${xG1} ${yG}`;
        g.push(`<path d="${hillD} L ${xG1} 262 L ${xG0} 262 Z" fill="rgba(15,22,32,0.08)" stroke="none"/>`);
        g.push(`<path d="${hillD}" fill="none" stroke="${INK}" stroke-width="1.8"/>`);
        [[112, 20], [124, 24], [136, 18], [204, 20], [220, 26], [236, 18], [252, 22]].forEach(([x, h]) => {
            const yb = yG - 10 * Math.exp(-Math.pow((x - 215) / 34, 2));
            g.push(tree(x, yb + 1, h));
        });
        // jordsymbol
        const jx = 456;
        g.push(line(jx, yG, jx, yG + 12, { w: 1.6 }));
        g.push(line(jx - 13, yG + 12, jx + 13, yG + 12, { w: 1.6 }));
        g.push(line(jx - 8, yG + 18, jx + 8, yG + 18, { w: 1.6 }));
        g.push(line(jx - 3, yG + 24, jx + 3, yG + 24, { w: 1.6 }));
        // moln: ljus bakre del, mörkare främre del
        g.push(cloud(110, 330, 70, 22, { n: 4, fill: '#ddd7cc', hs: [0.9, 1.2, 1, 0.8] }));
        g.push(cloud(196, 392, yCb, 26, { n: 4, fill: '#b3ada3', hs: [1, 1.25, 0.9, 0.8] }));
        // + och − med hjälplinjer till molnets över- och undersida
        g.push(line(336, 38, 456, 38, { c: SOFT, w: 0.9 }));
        g.push(txt(468, 43, '+', { size: 16 }));
        g.push(line(396, yCb, 456, yCb, { c: SOFT, w: 0.9 }));
        g.push(txt(468, yCb + 5, '−', { size: 16 }));
        if (!o.clean) {
            // regn och blixt
            for (let i = 0; i < 9; i++) {
                const x = 200 + i * 15, y0 = 102 + (i % 3) * 10;
                g.push(line(x, y0, x - 7, y0 + 30, { c: SOFT, w: 1.3 }));
            }
            g.push(`<polygon points="232,88 220,128 234,126 218,174 246,118 232,121 244,88" fill="#ffffff" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`);
        }
        // avståndet 1,5 km (måttlinje i fri yta till höger)
        g.push(dim(442, yCb, 442, yG, {}));
        g.push(txt(434, (yCb + yG) / 2 + 5, `1,5${NB}km`, { anchor: 'end' }));
        return g;
    }
    FIG['u16'] = svg(W, H, base().join(''));

    // s1: fältlinjer från marken (+) upp mot molnets undersida (−)
    (function () {
        const g = base({ clean: true });
        const xs = [270, 298, 326, 354, 382];
        const yMid = (yCb + yG) / 2 + 2;
        xs.forEach((x, i) => {
            const d = BAS + i * 0.15;
            const yb = yG - 10 * Math.exp(-Math.pow((x - 215) / 34, 2));
            g.push(line(x, yb, x, yCb + 1, { c: RED, w: 1.8, anim: aDraw(d, 0.5) }));
            // pilspets mitt på linjen, uppåt
            g.push(`<polygon points="${x - 5},${A(yMid + 6)} ${x},${A(yMid - 6)} ${x + 5},${A(yMid + 6)}" fill="${RED}"${aFade(d + 0.4)}/>`);
        });
        // laddningar: − längs molnets undersida, + längs marken (influens)
        [284, 312, 340, 368].forEach((x, i) => g.push(txt(x, yCb + 15, '−', { size: 13, fill: RED, anim: aFade(BAS + 1.0 + i * 0.05) })));
        [284, 312, 340, 368].forEach((x, i) => g.push(txt(x, yG - 5, '+', { size: 13, fill: RED, anim: aFade(BAS + 1.2 + i * 0.05) })));
        FIG['u16-s1'] = svg(W, H, g.join(''));
    })();

    // s2: fältstyrkan och avståndet
    (function () {
        const g = base({ clean: true });
        const xs = [270, 298, 326, 354, 382];
        const yMid = (yCb + yG) / 2 + 2;
        xs.forEach(x => {
            const yb = yG - 10 * Math.exp(-Math.pow((x - 215) / 34, 2));
            g.push(line(x, yb, x, yCb + 1, { c: RED, w: 1.8 }));
            g.push(`<polygon points="${x - 5},${A(yMid + 6)} ${x},${A(yMid - 6)} ${x + 5},${A(yMid + 6)}" fill="${RED}"/>`);
        });
        g.push(txt(24, 146, `𝔼 = 3,1${NB}kV/m`, { fill: BLUE, anchor: 'start', anim: aFade(BAS) }));
        g.push(txt(24, 166, `${it('d')} = 1,5${NB}km`, { fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.3) }));
        g.push(txt(24, 186, `${it('U')} = 𝔼 · ${it('d')}`, { fill: RED, anchor: 'start', anim: aFade(BAS + 0.7) }));
        FIG['u16-s2'] = svg(W, H, g.join(''));
    })();
})();

/* ================= skriv fil ================= */
const out = [];
out.push('// Fysiklabbet: figurer till Kursprov Fysik 1 VT 2017, uppgift 11–16 (genererade —');
out.push('// redigera inte för hand; generatorn ligger i .claude/np-figs/gen-fy1-vt2017-2.js,');
out.push('// koordinater beräknade). Klasserna anim-draw/anim-fade animeras av CSS i np.html.');
out.push('window.NP_FIGURER = window.NP_FIGURER || {};');
out.push("window.NP_FIGURER['fy1-vt2017'] = Object.assign(window.NP_FIGURER['fy1-vt2017'] || {}, {");
for (const k of Object.keys(FIG)) out.push(`  '${k}': ${JSON.stringify(FIG[k])},`);
out.push('});');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'np', 'fy1-vt2017-figurer-2.js'), out.join('\n') + '\n');
console.log('Skrev', Object.keys(FIG).length, 'figurer:', Object.keys(FIG).join(', '));
