// Del 2 av figurgeneratorn för Kursprov Fysik 2 VT 2016: uppgift 13–19.
'use strict';
const H = require('./gen-fy2vt2016.js');
const { svg, line, arrow, dim, txt, sub, aDraw, aFade, A, BAS, INK, SOFT, RED, BLUE, GRID, GLASS } = H;

module.exports = function (FIG) {

    /* ================= UPPGIFT 13 — orgelpipa + cellosträng ================= */
    (function () {
        const W = 480;
        const pipe = { x: 40, y: 48, len: 200, h: 52 }; // 0,80 m → 250 px/m
        const str = { x: 300, y: 74, len: 151 };        // 0,605 m → 151 px

        function basePipe(g) {
            // pipa: sluten vänster (tjock vägg + skraffering), öppen höger
            g.push(line(pipe.x, pipe.y, pipe.x + pipe.len, pipe.y, { w: 2 }));
            g.push(line(pipe.x, pipe.y + pipe.h, pipe.x + pipe.len, pipe.y + pipe.h, { w: 2 }));
            g.push(line(pipe.x, pipe.y, pipe.x, pipe.y + pipe.h, { w: 3 }));
            for (let y = pipe.y + 5; y < pipe.y + pipe.h; y += 9)
                g.push(line(pipe.x, y + 7, pipe.x - 8, y, { c: SOFT, w: 1.1 }));
            g.push(txt(pipe.x + pipe.len / 2, pipe.y - 14, 'orgelpipa — sluten · öppen', { size: 11, fill: SOFT }));
            // måttlinje 0,80 m
            const my = pipe.y + pipe.h + 26;
            g.push(line(pipe.x, pipe.y + pipe.h + 4, pipe.x, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(line(pipe.x + pipe.len, pipe.y + pipe.h + 4, pipe.x + pipe.len, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(dim(pipe.x, my, pipe.x + pipe.len, my, {}));
            g.push(txt(pipe.x + pipe.len / 2, my + 16, '0,80 m', { size: 11.5 }));
        }
        function baseStr(g, titleY) {
            // sträng mellan två stall
            g.push(`<polygon points="${str.x - 6},${str.y + 16} ${str.x},${str.y} ${str.x + 6},${str.y + 16}" fill="rgba(15,22,32,0.14)" stroke="${INK}" stroke-width="1.3"/>`);
            g.push(`<polygon points="${str.x + str.len - 6},${str.y + 16} ${str.x + str.len},${str.y} ${str.x + str.len + 6},${str.y + 16}" fill="rgba(15,22,32,0.14)" stroke="${INK}" stroke-width="1.3"/>`);
            g.push(line(str.x - 20, str.y + 16, str.x + str.len + 20, str.y + 16, { w: 2 }));
            g.push(line(str.x, str.y, str.x + str.len, str.y, { w: 1.8 }));
            g.push(txt(str.x + str.len / 2, titleY || str.y - 26, 'cellosträng', { size: 11, fill: SOFT }));
            const my = str.y + 52;
            g.push(line(str.x, str.y + 18, str.x, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(line(str.x + str.len, str.y + 18, str.x + str.len, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(dim(str.x, my, str.x + str.len, my, {}));
            g.push(txt(str.x + str.len / 2, my + 16, '60,5 cm', { size: 11.5 }));
        }

        (function () {
            const g = [];
            basePipe(g); baseStr(g);
            FIG['u13'] = svg(W, 165, g.join(''));
        })();

        // s1: stående våg i pipan — kvarts våglängd (nod vid sluten, buk vid öppen)
        (function () {
            const g = [];
            basePipe(g);
            const mid = pipe.y + pipe.h / 2, Amp = pipe.h / 2 - 7;
            let up = '', dn = '';
            for (let f = 0; f <= 1.0001; f += 0.04) {
                const x = pipe.x + f * pipe.len;
                const s = Math.sin(f * Math.PI / 2) * Amp;
                up += `${A(x)} ${A(mid - s)} L `;
                dn += `${A(x)} ${A(mid + s)} L `;
            }
            up = 'M ' + up.slice(0, -3); dn = 'M ' + dn.slice(0, -3);
            g.push(`<path d="${up}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS, 0.7)}/>`);
            g.push(`<path d="${dn}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS, 0.7)}/>`);
            g.push(line(pipe.x, mid, pipe.x + pipe.len, mid, { c: SOFT, w: 1, dash: '3 4' }));
            g.push(txt(pipe.x - 16, mid + 4, 'nod', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
            g.push(txt(pipe.x + pipe.len + 8, mid + 4, 'buk', { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
            g.push(txt(pipe.x + pipe.len + 46, mid + 4, `<tspan font-style="italic">L</tspan> = <tspan font-style="italic">λ</tspan>/4`, { size: 12, anchor: 'start', anim: aFade(BAS + 1.2) }));
            FIG['u13-s1'] = svg(W, 165, g.join(''));
        })();

        // s2: grundsvängning på strängen — halv våglängd (nod–buk–nod)
        (function () {
            const g = [];
            baseStr(g, str.y - 52);
            let up = '', dn = '';
            const Amp = 26;
            for (let f = 0; f <= 1.0001; f += 0.04) {
                const x = str.x + f * str.len;
                const s = Math.sin(f * Math.PI) * Amp;
                up += `${A(x)} ${A(str.y - s)} L `;
                dn += `${A(x)} ${A(str.y + s)} L `;
            }
            up = 'M ' + up.slice(0, -3); dn = 'M ' + dn.slice(0, -3);
            g.push(`<path d="${up}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS, 0.7)}/>`);
            g.push(`<path d="${dn}" fill="none" stroke="${RED}" stroke-width="2"${aDraw(BAS, 0.7)}/>`);
            g.push(txt(str.x - 10, str.y - 8, 'nod', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.7) }));
            g.push(txt(str.x + str.len + 10, str.y - 8, 'nod', { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 0.7) }));
            g.push(txt(str.x + str.len / 2, str.y - Amp - 8, 'buk', { size: 11, fill: RED, anim: aFade(BAS + 0.9) }));
            g.push(txt(str.x + str.len / 2, str.y + Amp + 18, `<tspan font-style="italic">L</tspan> = <tspan font-style="italic">λ</tspan>/2`, { size: 12, anim: aFade(BAS + 1.2) }));
            FIG['u13-s2'] = svg(W, 165, g.join(''));
        })();
    })();

    /* ================= UPPGIFT 14 — transformator ================= */
    (function () {
        const W = 470, Hh = 250;
        const core = { x: 150, y: 45, w: 180, h: 160, t: 34 }; // ram med tjocklek t

        function base(withCoils) {
            const g = [];
            // järnkärna: yttre + inre rektangel
            g.push(`<rect x="${core.x}" y="${core.y}" width="${core.w}" height="${core.h}" fill="rgba(15,22,32,0.07)" stroke="${INK}" stroke-width="1.8"/>`);
            g.push(`<rect x="${core.x + core.t}" y="${core.y + core.t}" width="${core.w - 2 * core.t}" height="${core.h - 2 * core.t}" fill="#ffffff" fill-opacity="0" stroke="${INK}" stroke-width="1.8"/>`);
            g.push(`<rect x="${core.x + core.t}" y="${core.y + core.t}" width="${core.w - 2 * core.t}" height="${core.h - 2 * core.t}" fill="rgba(255,255,255,0.0)"/>`);
            // ok-markering: skarvlinjer upptill
            g.push(line(core.x, core.y + core.t, core.x + core.t, core.y + core.t, { c: SOFT, w: 1.1 }));
            g.push(line(core.x + core.w - core.t, core.y + core.t, core.x + core.w, core.y + core.t, { c: SOFT, w: 1.1 }));
            g.push(txt(core.x + core.w / 2, core.y - 10, 'järnkärna med ok', { size: 11, fill: SOFT }));
            if (withCoils) {
                // primärspole på vänster ben
                const lx = core.x, ly0 = core.y + 52, n1 = 7;
                for (let i = 0; i < n1; i++) {
                    const y = ly0 + i * 11;
                    g.push(`<rect x="${lx - 7}" y="${y}" width="${core.t + 14}" height="7" rx="3.5" fill="rgba(28,95,168,0.12)" stroke="${BLUE}" stroke-width="1.3"/>`);
                }
                g.push(line(lx - 7, ly0 - 8, lx - 34, ly0 - 8, { c: BLUE, w: 1.4 }));
                g.push(line(lx - 7, ly0 + n1 * 11 + 4, lx - 34, ly0 + n1 * 11 + 4, { c: BLUE, w: 1.4 }));
                g.push(txt(lx - 40, ly0 + 34, '230 V', { size: 11.5, fill: BLUE, anchor: 'end' }));
                g.push(txt(lx + core.t / 2, core.y + core.h + 22, `${sub('N', '1')} varv`, { size: 11.5, fill: BLUE }));
                // sekundärspole på höger ben
                const rx = core.x + core.w - core.t, n2 = 4, ry0 = core.y + 66;
                for (let i = 0; i < n2; i++) {
                    const y = ry0 + i * 11;
                    g.push(`<rect x="${rx - 7}" y="${y}" width="${core.t + 14}" height="7" rx="3.5" fill="rgba(200,50,74,0.10)" stroke="${RED}" stroke-width="1.3"/>`);
                }
                g.push(line(rx + core.t + 7, ry0 - 8, rx + core.t + 34, ry0 - 8, { c: RED, w: 1.4 }));
                g.push(line(rx + core.t + 7, ry0 + n2 * 11 + 4, rx + core.t + 34, ry0 + n2 * 11 + 4, { c: RED, w: 1.4 }));
                g.push(txt(rx + core.t + 40, ry0 + 28, `${sub('U', '2')}`, { size: 12.5, fill: RED, anchor: 'start' }));
                g.push(txt(rx + core.t / 2, core.y + core.h + 22, `${sub('N', '2')} varv`, { size: 11.5, fill: RED }));
            }
            return g;
        }

        (function () {
            const g = base(true);
            g.push(txt(W / 2, Hh - 6, 'spolar: 10 · 50 · 100 · 500 · 1000 varv', { size: 11, fill: SOFT }));
            FIG['u14'] = svg(W, Hh, g.join(''));
        })();

        // s1: flödesbanan genom kärnan
        (function () {
            const g = base(true);
            const m = core.t / 2;
            const fx0 = core.x + m, fy0 = core.y + m, fx1 = core.x + core.w - m, fy1 = core.y + core.h - m;
            const r = 12;
            const d = `M ${fx0 + r} ${fy0} H ${fx1 - r} A ${r} ${r} 0 0 1 ${fx1} ${fy0 + r} V ${fy1 - r} A ${r} ${r} 0 0 1 ${fx1 - r} ${fy1} H ${fx0 + r} A ${r} ${r} 0 0 1 ${fx0} ${fy1 - r} V ${fy0 + r} A ${r} ${r} 0 0 1 ${fx0 + r} ${fy0}`;
            g.push(`<path d="${d}" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="7 5"${aFade(BAS)}/>`);
            // flödespilar på över- och undersida
            g.push(`<polygon points="${A((fx0 + fx1) / 2 - 7)},${fy0 - 6} ${A((fx0 + fx1) / 2 + 7)},${fy0} ${A((fx0 + fx1) / 2 - 7)},${fy0 + 6}" fill="${RED}"${aFade(BAS + 0.4)}/>`);
            g.push(`<polygon points="${A((fx0 + fx1) / 2 + 7)},${fy1 - 6} ${A((fx0 + fx1) / 2 - 7)},${fy1} ${A((fx0 + fx1) / 2 + 7)},${fy1 + 6}" fill="${RED}"${aFade(BAS + 0.4)}/>`);
            g.push(txt((fx0 + fx1) / 2, (fy0 + fy1) / 2 + 4, 'magnetiskt flöde', { size: 11.5, fill: RED, anim: aFade(BAS + 0.7) }));
            FIG['u14-s1'] = svg(W, Hh, g.join(''));
        })();
    })();

    /* ================= UPPGIFT 15 — energinivåer ================= */
    (function () {
        const W = 470, Hh = 265;
        const lx0 = 70, lx1 = 250, gx1 = 290; // nivålängder
        const yE1 = 52, yE2 = 96, yE3 = 124, yG = 215;

        function base(withNames) {
            const g = [];
            g.push(line(lx0, yE1, lx1, yE1, { w: 2.6 }));
            g.push(line(lx0, yE2, lx1, yE2, { w: 2.6 }));
            g.push(line(lx0, yE3, lx1, yE3, { w: 2.6 }));
            g.push(line(lx0, yG, gx1, yG, { w: 3.2 }));
            // klammer + etiketter
            g.push(`<path d="M ${lx1 + 14} ${yE1 - 6} Q ${lx1 + 26} ${yE1 - 6} ${lx1 + 26} ${yE1 + 6} V ${A((yE1 + yE3) / 2 - 8)} Q ${lx1 + 26} ${A((yE1 + yE3) / 2)} ${lx1 + 38} ${A((yE1 + yE3) / 2)} Q ${lx1 + 26} ${A((yE1 + yE3) / 2)} ${lx1 + 26} ${A((yE1 + yE3) / 2 + 8)} V ${yE3 - 6} Q ${lx1 + 26} ${yE3 + 6} ${lx1 + 14} ${yE3 + 6}" fill="none" stroke="${SOFT}" stroke-width="1.2"/>`);
            g.push(txt(lx1 + 46, (yE1 + yE3) / 2 - 4, 'Exciterade', { size: 11.5, fill: SOFT, anchor: 'start' }));
            g.push(txt(lx1 + 46, (yE1 + yE3) / 2 + 11, 'nivåer', { size: 11.5, fill: SOFT, anchor: 'start' }));
            g.push(txt(gx1 + 12, yG + 4, 'Grundtillstånd', { size: 11.5, fill: SOFT, anchor: 'start' }));
            if (withNames) {
                g.push(txt(lx0 - 10, yE1 + 4, sub('E', '1'), { size: 12, anchor: 'end' }));
                g.push(txt(lx0 - 10, yE2 + 4, sub('E', '2'), { size: 12, anchor: 'end' }));
                g.push(txt(lx0 - 10, yE3 + 4, sub('E', '3'), { size: 12, anchor: 'end' }));
            }
            // de tre observerade övergångarna till grundtillståndet
            g.push(arrow(100, yE1, 100, yG - 2, { w: 1.7, head: 9 }));
            g.push(arrow(122, yE2, 122, yG - 2, { w: 1.7, head: 9 }));
            g.push(arrow(144, yE3, 144, yG - 2, { w: 1.7, head: 9 }));
            return g;
        }

        FIG['u15'] = svg(W, Hh, base(false).join(''));

        // s1: övergångarna mellan de exciterade nivåerna (λ4, λ5, λ6)
        (function () {
            const g = base(true);
            g.push(txt(100 - 8, yE3 + 46, sub('λ', '1'), { size: 11, fill: SOFT, anchor: 'end' }));
            g.push(txt(122 + 8, yE3 + 64, sub('λ', '2'), { size: 11, fill: SOFT, anchor: 'start' }));
            g.push(txt(144 + 8, yE3 + 82, sub('λ', '3'), { size: 11, fill: SOFT, anchor: 'start' }));
            const a4 = 200, a5 = 172, a6 = 228;
            g.push(arrow(a5, yE1, a5, yE2 - 2, { c: RED, w: 1.8, head: 8, anim: BAS }));
            g.push(txt(a5 - 7, (yE1 + yE2) / 2 + 4, sub('λ', '5'), { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 0.3) }));
            g.push(arrow(a4, yE1, a4, yE3 - 2, { c: RED, w: 1.8, head: 8, anim: BAS + 0.4 }));
            g.push(txt(a4 + 7, yE2 - 8, sub('λ', '4'), { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 0.7) }));
            g.push(arrow(a6, yE2, a6, yE3 - 2, { c: RED, w: 1.8, head: 8, anim: BAS + 0.8 }));
            g.push(txt(a6 + 7, (yE2 + yE3) / 2 + 4, sub('λ', '6'), { size: 11, fill: RED, anchor: 'start', anim: aFade(BAS + 1.1) }));
            g.push(txt(W - 14, yE3 + 46, 'övergångar mellan de', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.4) }));
            g.push(txt(W - 14, yE3 + 61, 'exciterade nivåerna', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.4) }));
            FIG['u15-s1'] = svg(W, Hh, g.join(''));
        })();
    })();

    /* ================= UPPGIFT 16 — högtalare + mikrofon ================= */
    (function () {
        const W = 470, Hh = 175;
        const ly = 78;

        function speaker(x, c, an) {
            // liten högtalare som strålar åt höger
            return `<rect x="${x - 22}" y="${ly - 14}" width="14" height="28" fill="rgba(15,22,32,0.08)" stroke="${c}" stroke-width="1.6"${an || ''}/>` +
                `<polygon points="${x - 8},${ly - 8} ${x},${ly - 18} ${x},${ly + 18} ${x - 8},${ly + 8}" fill="none" stroke="${c}" stroke-width="1.6"${an || ''}/>`;
        }

        const g = [];
        g.push(line(20, ly, 450, ly, { c: GRID, w: 1.2, dash: '4 4' }));
        g.push(speaker(80, INK));
        g.push(speaker(180, INK));
        // mikrofon
        g.push(`<circle cx="380" cy="${ly}" r="9" fill="rgba(15,22,32,0.08)" stroke="${INK}" stroke-width="1.6"/>`);
        g.push(line(380, ly + 9, 380, ly + 30, { w: 1.6 }));
        g.push(line(366, ly + 30, 394, ly + 30, { w: 1.6 }));
        g.push(txt(80 - 14, ly - 30, 'högtalare 1', { size: 11, fill: SOFT }));
        g.push(txt(180, ly + 38, 'högtalare 2 (flyttas)', { size: 11, fill: SOFT }));
        g.push(txt(380, ly - 22, 'mikrofon + mätdator', { size: 11, fill: SOFT }));
        // flyttpil vid högtalare 2
        g.push(arrow(152, ly - 26, 208, ly - 26, { c: RED, w: 2, head: 9 }));
        g.push(arrow(208, ly - 26, 152, ly - 26, { c: RED, w: 2, head: 9 }));
        // vägskillnad Δs
        const my = ly + 58;
        g.push(line(80, ly + 20, 80, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(line(180, ly + 20 + 26, 180, my + 4, { c: SOFT, w: 1, dash: '3 3' }));
        g.push(dim(80, my, 180, my, {}));
        g.push(txt(130, my + 17, 'Δ<tspan font-style="italic">s</tspan> = <tspan font-style="italic">λ</tspan>/2 vid första minimum', { size: 11 }));
        FIG['u16-s1'] = svg(W, Hh + 5, g.join(''));
    })();

    /* ================= UPPGIFT 17 — masspektrometer ================= */
    (function () {
        const W = 480, Hh = 350;
        const f = { x0: 55, x1: 240, yTop: 55, yBot: 150 }; // filterplattor
        const beamY = (f.yTop + f.yBot) / 2;               // 102,5
        const exit = { x: 258, y: beamY };
        const R40 = 106, R38 = 99;
        const C = { x: exit.x, y: beamY + R40 };            // centrum för 40Ar-banan
        const plateX = exit.x;                              // fotografisk plåt (lodrät)

        function ionAt(x, y, c, an) {
            return `<circle cx="${A(x)}" cy="${A(y)}" r="4" fill="${c}"${an || ''}/>`;
        }

        function base(o = {}) {
            const g = [];
            // filterplattor
            g.push(line(f.x0, f.yTop, f.x1, f.yTop, { w: 3 }));
            g.push(line(f.x0, f.yBot, f.x1, f.yBot, { w: 3 }));
            g.push(txt((f.x0 + f.x1) / 2, f.yTop - 26, 'Hastighetsfilter', { size: 12 }));
            // E-fältpilar (nedåt) mellan plattorna
            for (const x of [90, 140, 190]) {
                g.push(arrow(x, f.yTop + 10, x, f.yBot - 10, { c: SOFT, w: 1.2, head: 7 }));
            }
            g.push(txt(108, f.yBot - 28, 'E', { italic: true, size: 12.5, fill: SOFT }));
            // B1: kryss (in i planet) i hörnen, fritt från jon och kraftpilar
            for (const [x, y] of [[75, f.yTop + 18], [225, f.yTop + 18], [75, f.yBot - 18], [225, f.yBot - 18]]) {
                g.push(line(x - 4, y - 4, x + 4, y + 4, { c: INK, w: 1.4 }));
                g.push(line(x - 4, y + 4, x + 4, y - 4, { c: INK, w: 1.4 }));
            }
            g.push(txt(225, f.yTop + 35, sub('B', '1'), { size: 12 }));
            // jonbana genom filtret
            g.push(line(f.x0 - 20, beamY, exit.x, beamY, { c: SOFT, w: 1.1, dash: '5 4' }));
            // fotografisk plåt: lodrät under utgången
            g.push(line(plateX, beamY + 18, plateX, beamY + 2 * R40 + 40, { w: 3.4 }));
            g.push(txt(plateX - 10, beamY + 2 * R40 + 34, 'Fotografisk plåt', { size: 11.5, anchor: 'end' }));
            // B2: punkter (ut ur planet) i högra området
            for (let ix = 0; ix < 3; ix++) for (let iy = 0; iy < 4; iy++) {
                const x = 310 + ix * 62, y = 55 + iy * 78;
                g.push(`<circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/>`);
            }
            g.push(txt(455, 180, sub('B', '2'), { size: 12, anchor: 'start' }));
            // v-pil vid utgången
            g.push(arrow(exit.x + 2, beamY, exit.x + 54, beamY, { c: BLUE, w: 2.2 }));
            g.push(txt(exit.x + 62, beamY + 4, 'v', { italic: true, size: 13, fill: BLUE, anchor: 'start' }));
            // 40Ar-banan (heldragen halvcirkel, medurs)
            g.push(`<path d="M ${A(exit.x)} ${A(beamY)} A ${R40} ${R40} 0 0 1 ${A(exit.x)} ${A(beamY + 2 * R40)}" fill="none" stroke="${INK}" stroke-width="1.7"${o.animBana || ''}/>`);
            g.push(txt(exit.x - 10, beamY + 2 * R40 + 5, '<tspan font-size="9" dy="-4">40</tspan><tspan dy="4">Ar</tspan>', { size: 11.5, anchor: 'end' }));
            // okänd isotop (streckad, mindre radie)
            g.push(`<path d="M ${A(exit.x)} ${A(beamY)} A ${R38} ${R38} 0 0 1 ${A(exit.x)} ${A(beamY + 2 * R38)}" fill="none" stroke="${SOFT}" stroke-width="1.4" stroke-dasharray="6 5"/>`);
            // radie r för den okända svärtningen
            const ang = Math.PI * 0.82; // vinkel för måttlinjens riktning
            g.push(dim(exit.x, beamY + R38, exit.x + R38 * Math.sin(ang - Math.PI / 2) * 0 + R38 * 0.585, beamY + R38 + R38 * 0.81, { c: SOFT }));
            g.push(txt(exit.x + R38 * 0.32, beamY + R38 + R38 * 0.34, 'r', { italic: true, size: 13, fill: SOFT }));
            return g;
        }

        FIG['u17'] = svg(W, Hh, base().join(''));

        // s1: den elektriska kraften på jonen i filtret
        (function () {
            const g = base();
            const ion = { x: 150, y: beamY };
            g.push(ionAt(ion.x, ion.y, BLUE));
            g.push(txt(ion.x - 8, ion.y - 10, 'Ar<tspan font-size="9" dy="-4">+</tspan>', { size: 11, fill: BLUE, anchor: 'end' }));
            g.push(arrow(ion.x, ion.y, ion.x, ion.y + 38, { c: RED, anim: BAS }));
            g.push(txt(ion.x + 9, ion.y + 40, `${sub('F', 'E')} = <tspan font-style="italic">Q</tspan><tspan font-style="italic">E</tspan>`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
            FIG['u17-s1'] = svg(W, Hh, g.join(''));
        })();

        // s2: den magnetiska kraften balanserar — lika långa pilar
        (function () {
            const g = base();
            const ion = { x: 150, y: beamY };
            g.push(ionAt(ion.x, ion.y, BLUE));
            g.push(txt(ion.x - 8, ion.y - 10, 'Ar<tspan font-size="9" dy="-4">+</tspan>', { size: 11, fill: BLUE, anchor: 'end' }));
            g.push(arrow(ion.x, ion.y, ion.x, ion.y + 38, { c: RED }));
            g.push(txt(ion.x + 9, ion.y + 40, `${sub('F', 'E')}`, { size: 11.5, fill: RED, anchor: 'start' }));
            g.push(arrow(ion.x, ion.y, ion.x, ion.y - 38, { c: RED, anim: BAS }));
            g.push(txt(ion.x + 9, ion.y - 34, `${sub('F', 'B')} = <tspan font-style="italic">Q</tspan><tspan font-style="italic">v</tspan>${sub('B', '1')}`, { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.4) }));
            FIG['u17-s2'] = svg(W, Hh, g.join(''));
        })();

        // s3: i B2 är den magnetiska kraften centripetalkraft
        (function () {
            const g = base();
            // jon på banans högra punkt, rör sig nedåt (medurs)
            const p = { x: exit.x + R40, y: beamY + R40 };
            g.push(ionAt(p.x, p.y, BLUE, aFade(BAS)));
            g.push(arrow(p.x, p.y + 4, p.x, p.y + 46, { c: BLUE, w: 2.2, anim: BAS + 0.2 }));
            g.push(txt(p.x + 9, p.y + 48, 'v', { italic: true, size: 12.5, fill: BLUE, anchor: 'start', anim: aFade(BAS + 0.5) }));
            g.push(arrow(p.x - 4, p.y, C.x + 6, C.y, { c: RED, anim: BAS + 0.7 }));
            g.push(txt((p.x + C.x) / 2 + 12, p.y - 12, sub('F', 'B'), { size: 11.5, fill: RED, anim: aFade(BAS + 1.1) }));
            g.push(`<circle cx="${A(C.x)}" cy="${A(C.y)}" r="2.4" fill="${SOFT}"${aFade(BAS + 0.7)}/>`);
            g.push(txt(W - 14, 26, 'den magnetiska kraften pekar', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.3) }));
            g.push(txt(W - 14, 41, 'mot cirkelns centrum', { size: 11, fill: RED, anchor: 'end', anim: aFade(BAS + 1.3) }));
            FIG['u17-s3'] = svg(W, Hh, g.join(''));
        })();
    })();

    /* ================= UPPGIFT 18 — kraft–tid-diagram ================= */
    (function () {
        const W = 490, Hh = 300;
        const x0 = 65, x1 = 460, y0 = 250, y1 = 40;
        const tMax = 5, Fmin = 1.8, Fmax = 3.4;
        const X = t => x0 + t / tMax * (x1 - x0);
        const Y = F => y0 - (F - Fmin) / (Fmax - Fmin) * (y0 - y1);
        const T = 1.35, F0 = 2.6, Amp = 0.7, phi = 0.31;
        const Ft = t => F0 + Amp * Math.sin(2 * Math.PI * t / T + phi);
        const tPeak1 = (Math.PI / 2 - phi) * T / (2 * Math.PI);
        const tPeak2 = tPeak1 + T;

        function curve() {
            const pts = [];
            for (let t = 0; t <= tMax; t += 0.02) pts.push(`${A(X(t))},${A(Y(Ft(t)))}`);
            return `<polyline points="${pts.join(' ')}" fill="none" stroke="${INK}" stroke-width="1.7"/>`;
        }
        function base(extra) {
            const g = [];
            for (let t = 0.5; t <= tMax; t += 0.5) g.push(line(X(t), y0, X(t), y1, { c: GRID, w: 1 }));
            for (let F = 1.9; F <= 3.35; F += 0.1) g.push(line(x0, Y(F), x1, Y(F), { c: GRID, w: 1 }));
            g.push(arrow(x0, y0 + 6, x0, y1 - 8, { w: 1.6, head: 9 }));
            g.push(arrow(x0 - 6, y0, x1 + 10, y0, { w: 1.6, head: 9 }));
            for (let t = 0; t <= tMax; t += 1) { g.push(line(X(t), y0, X(t), y0 + 5, { w: 1.2 })); g.push(txt(X(t), y0 + 18, String(t), { size: 10.5 })); }
            for (const F of [2.0, 2.5, 3.0]) { g.push(line(x0 - 5, Y(F), x0, Y(F), { w: 1.2 })); g.push(txt(x0 - 9, Y(F) + 4, F.toFixed(1).replace('.', ','), { size: 10.5, anchor: 'end' })); }
            g.push(txt(x0 + 6, y1 - 16, 'Kraft (N)', { size: 11, fill: SOFT, anchor: 'start' }));
            g.push(txt(x1, y0 + 34, 'Tid (s)', { size: 11, fill: SOFT, anchor: 'end' }));
            g.push(curve());
            if (extra) g.push(extra);
            return svg(W, Hh, g.join(''));
        }

        FIG['u18'] = base('');

        // s1: periodtiden läses av mellan två toppar
        FIG['u18-s1'] = base(
            line(X(tPeak1), Y(Ft(tPeak1)), X(tPeak1), y1 + 6, { c: RED, w: 1.3, dash: '4 4', anim: aFade(BAS) }) +
            line(X(tPeak2), Y(Ft(tPeak2)), X(tPeak2), y1 + 6, { c: RED, w: 1.3, dash: '4 4', anim: aFade(BAS) }) +
            dim(X(tPeak1), y1 + 14, X(tPeak2), y1 + 14, { c: RED, fade: BAS + 0.4 }) +
            txt((X(tPeak1) + X(tPeak2)) / 2, y1 + 6, '<tspan font-style="italic">T</tspan> = 1,35 s', { fill: RED, anim: aFade(BAS + 0.7) })
        );

        // s2: jämviktsläget mitt emellan max och min
        FIG['u18-s2'] = base(
            line(x0, Y(3.3), x1, Y(3.3), { c: SOFT, w: 1.2, dash: '5 4', anim: aFade(BAS) }) +
            txt(x1 - 4, Y(3.3) - 6, 'max 3,3 N', { size: 10.5, fill: SOFT, anchor: 'end', anim: aFade(BAS) }) +
            line(x0, Y(1.9), x1, Y(1.9), { c: SOFT, w: 1.2, dash: '5 4', anim: aFade(BAS + 0.3) }) +
            txt(X(0.68), Y(1.9) + 14, 'min 1,9 N', { size: 10.5, fill: SOFT, anim: aFade(BAS + 0.3) }) +
            line(x0, Y(2.6), x1, Y(2.6), { c: RED, w: 1.6, dash: '7 4', anim: aFade(BAS + 0.7) }) +
            txt(X(2.35), Y(2.6) - 9, 'jämviktsläge 2,6 N', { size: 11, fill: RED, anim: aFade(BAS + 1) })
        );

        // s3 (b): resulterande kraft i nedre vändläget = 3,3 − 2,6
        FIG['u18-s3'] = base(
            line(x0, Y(2.6), x1, Y(2.6), { c: SOFT, w: 1.2, dash: '7 4' }) +
            txt(x0 + 6, Y(2.6) + 15, 'jämviktsläge 2,6 N', { size: 10.5, fill: SOFT, anchor: 'start' }) +
            line(x0, Y(3.3), x1, Y(3.3), { c: SOFT, w: 1.2, dash: '5 4' }) +
            txt(x0 + 6, Y(3.3) - 6, 'nedre vändläget: fjäderkraften 3,3 N', { size: 10.5, fill: SOFT, anchor: 'start' }) +
            dim(X(4.55), Y(2.6), X(4.55), Y(3.3), { c: RED, fade: BAS }) +
            txt(X(3.65), (Y(2.6) + Y(3.3)) / 2 + 4, `${sub('F', 'R')} = 0,70 N`, { size: 11.5, fill: RED, anim: aFade(BAS + 0.4) })
        );
    })();

    /* ================= UPPGIFT 19 — katodstrålerör ================= */
    (function () {
        const W = 490, Hh = 300;
        const plate = { x0: 205, x1: 335, yTop: 78, yBot: 198, th: 9 };
        const beamY = (plate.yTop + plate.yBot) / 2; // 138
        const entry = { x: plate.x0, y: beamY };
        const tan30 = Math.tan(30 * Math.PI / 180);
        const cPar = tan30 / (2 * (plate.x1 - plate.x0)); // parabel: y' = c(x-x0)², slut-lutning tan30
        const exitP = { x: plate.x1, y: beamY + cPar * (plate.x1 - plate.x0) ** 2 };

        function base(o = {}) {
            const g = [];
            // plattor
            g.push(`<rect x="${plate.x0}" y="${plate.yTop - plate.th}" width="${plate.x1 - plate.x0}" height="${plate.th}" fill="rgba(15,22,32,0.10)" stroke="${INK}" stroke-width="1.4"/>`);
            g.push(`<rect x="${plate.x0}" y="${plate.yBot}" width="${plate.x1 - plate.x0}" height="${plate.th}" fill="rgba(15,22,32,0.10)" stroke="${INK}" stroke-width="1.4"/>`);
            // spänningskälla + ledningar
            g.push(`<circle cx="70" cy="${beamY - 20}" r="3" fill="${INK}"/>`);
            g.push(`<circle cx="70" cy="${beamY + 20}" r="3" fill="${INK}"/>`);
            g.push(txt(56, beamY - 22, '−', { size: 14 }));
            g.push(txt(56, beamY + 28, '+', { size: 14 }));
            g.push(txt(70, beamY + 5, 'U', { italic: true, size: 13.5 }));
            g.push(line(70, beamY - 23, 70, 34, { w: 1.3 }));
            g.push(line(70, 34, (plate.x0 + plate.x1) / 2, 34, { w: 1.3 }));
            g.push(line((plate.x0 + plate.x1) / 2, 34, (plate.x0 + plate.x1) / 2, plate.yTop - plate.th, { w: 1.3 }));
            g.push(line(70, beamY + 23, 70, 262, { w: 1.3 }));
            g.push(line(70, 262, (plate.x0 + plate.x1) / 2, 262, { w: 1.3 }));
            g.push(line((plate.x0 + plate.x1) / 2, 262, (plate.x0 + plate.x1) / 2, plate.yBot + plate.th, { w: 1.3 }));
            // mått 3,0 cm (i gapet, strax under övre plattan)
            const dy = plate.yTop + 16;
            g.push(dim(plate.x0, dy, plate.x1, dy, {}));
            g.push(txt((plate.x0 + plate.x1) / 2 + 30, dy - 7, '3,0 cm', { size: 11.5 }));
            // mått 4,0 cm (vänster om plattorna)
            const dx = plate.x0 - 28;
            g.push(line(plate.x0 - 2, plate.yTop, dx - 4, plate.yTop, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(line(plate.x0 - 2, plate.yBot, dx - 4, plate.yBot, { c: SOFT, w: 1, dash: '3 3' }));
            g.push(dim(dx, plate.yTop, dx, plate.yBot, {}));
            g.push(txt(dx - 8, beamY + 26, '4,0 cm', { size: 11.5, anchor: 'end' }));
            // elektronbana: rak in, parabel mellan plattorna, rak ut i 30°
            g.push(line(100, beamY, entry.x, beamY, { c: SOFT, w: 1.4, dash: '5 4' }));
            let par = `M ${A(entry.x)} ${A(entry.y)} `;
            for (let fx = 0.1; fx <= 1.0001; fx += 0.1) {
                const x = entry.x + fx * (plate.x1 - plate.x0);
                par += `L ${A(x)} ${A(beamY + cPar * (x - entry.x) ** 2)} `;
            }
            g.push(`<path d="${par}" fill="none" stroke="${SOFT}" stroke-width="1.4" stroke-dasharray="5 4"/>`);
            const outEnd = { x: exitP.x + 118, y: exitP.y + 118 * tan30 };
            g.push(line(exitP.x, exitP.y, outEnd.x, outEnd.y, { c: SOFT, w: 1.4, dash: '5 4' }));
            g.push(`<circle cx="${A(entry.x)}" cy="${A(entry.y)}" r="3.2" fill="${INK}"/>`);
            // 30°-vinkel vid utgången
            g.push(line(exitP.x, exitP.y, exitP.x + 110, exitP.y, { c: GRID, w: 1.2, dash: '4 4' }));
            const r30 = 56;
            const pB = { x: exitP.x + r30 * Math.cos(Math.PI / 6), y: exitP.y + r30 * Math.sin(Math.PI / 6) };
            g.push(`<path d="M ${A(exitP.x + r30)} ${A(exitP.y)} A ${r30} ${r30} 0 0 1 ${A(pB.x)} ${A(pB.y)}" fill="none" stroke="${SOFT}" stroke-width="1.2"/>`);
            g.push(txt(exitP.x + r30 + 16, exitP.y + 16, '30°', { size: 11.5, fill: SOFT }));
            return g;
        }

        FIG['u19'] = svg(W, Hh, base().join(''));

        // s1: fältområdet skuggas, v_x-pil in
        (function () {
            const g = base();
            g.push(`<rect x="${plate.x0}" y="${plate.yTop}" width="${plate.x1 - plate.x0}" height="${plate.yBot - plate.yTop}" fill="rgba(28,95,168,0.08)"${aFade(BAS)}/>`);
            g.push(arrow(114, beamY - 20, 168, beamY - 20, { c: BLUE, w: 2.4, anim: BAS + 0.3 }));
            g.push(txt(140, beamY - 32, `${sub('v', 'x')} = 37 Mm/s`, { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.7) }));
            g.push(txt((plate.x0 + plate.x1) / 2, plate.yBot - 12, `tid i fältet: <tspan font-style="italic">t</tspan> = <tspan font-style="italic">s</tspan>/${sub('v', 'x')}`, { size: 11.5, fill: BLUE, anim: aFade(BAS + 1) }));
            FIG['u19-s1'] = svg(W, Hh, g.join(''));
        })();

        // s2: hastighetstriangeln vid utgången
        (function () {
            const g = base();
            const p = exitP, Lx = 92;
            g.push(arrow(p.x, p.y, p.x + Lx, p.y, { c: BLUE, w: 2.4, anim: BAS }));
            g.push(txt(p.x + Lx / 2, p.y - 10, sub('v', 'x'), { size: 11.5, fill: BLUE, anim: aFade(BAS + 0.3) }));
            g.push(arrow(p.x + Lx, p.y, p.x + Lx, p.y + Lx * tan30, { c: RED, w: 2.4, anim: BAS + 0.5 }));
            g.push(txt(p.x + Lx + 9, p.y + Lx * tan30 / 2 + 4, sub('v', 'y'), { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.8) }));
            g.push(arrow(p.x, p.y, p.x + Lx, p.y + Lx * tan30, { c: INK, w: 2, anim: BAS + 1 }));
            g.push(txt(p.x + Lx / 2 - 6, p.y + Lx * tan30 / 2 + 18, 'v', { italic: true, size: 12.5, anim: aFade(BAS + 1.3) }));
            FIG['u19-s2'] = svg(W, Hh, g.join(''));
        })();

        // s3: kraften på elektronen mellan plattorna (mot plusplattan)
        (function () {
            const g = base();
            // laddningstecken på plattorna
            for (let i = 0; i < 5; i++) {
                const x = plate.x0 + 14 + i * 26;
                g.push(txt(x, plate.yTop - plate.th + 6, '−', { size: 12, fill: SOFT, anim: aFade(BAS) }));
                g.push(txt(x, plate.yBot + plate.th - 1, '+', { size: 11, fill: SOFT, anim: aFade(BAS) }));
            }
            const ep = { x: entry.x + 62, y: beamY + cPar * 62 * 62 };
            g.push(`<circle cx="${A(ep.x)}" cy="${A(ep.y)}" r="3.6" fill="${BLUE}"${aFade(BAS + 0.3)}/>`);
            g.push(txt(ep.x - 8, ep.y - 8, 'e<tspan font-size="9" dy="-4">−</tspan>', { size: 11, fill: BLUE, anchor: 'end', anim: aFade(BAS + 0.3) }));
            g.push(arrow(ep.x, ep.y, ep.x, ep.y + 40, { c: RED, anim: BAS + 0.5 }));
            g.push(txt(ep.x + 9, ep.y + 30, '<tspan font-style="italic">F</tspan> = <tspan font-style="italic">qE</tspan>', { size: 11.5, fill: RED, anchor: 'start', anim: aFade(BAS + 0.9) }));
            g.push(txt((plate.x0 + plate.x1) / 2, 288, 'kraften pekar mot plusplattan — elektronen dras nedåt', { size: 11, fill: RED, anim: aFade(BAS + 1.2) }));
            FIG['u19-s3'] = svg(W, Hh, g.join(''));
        })();
    })();
};
