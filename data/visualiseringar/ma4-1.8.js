/* ma4-1.8.js — visualisering: "Additionsformlerna i rektangeln" (bevis och
 * uttolkning av sin(u+v) = sin u·cos v + cos u·sin v). Hör till ma4-1.8
 * (additions- och subtraktionsformler) och ma4-1.9 (formler och
 * trigonometriska ekvationer).
 *
 * Kärninsikt: sin(u+v) är INTE sin u + sin v. Den klassiska rektangel-
 * konstruktionen visar var varje term i sin u·cos v + cos u·sin v bor som
 * ett verkligt linjesegment.
 *
 * Konstruktion (allt med hypotenusa 1, radie skalad med R):
 *   O = origo. B = (cos v·cos u, cos v·sin u) — hörnet i den undre
 *   triangeln (vinkel u vid O, hypotenusa OB = cos v). C = (cos(u+v),
 *   sin(u+v)) — ändpunkten på "enhetscirkeln", vinkel u+v vid O, OC = 1
 *   (hypotenusan i den övre triangeln OBC, vinkel v vid O, rät vinkel i B).
 *   F = foten av lodräten från B till baslinjen. D = foten av lodräten
 *   från C till baslinjen. E = punkten på linjen D–C i samma höjd som B.
 *   Rektangeln D-F-B-E ger DE = FB = sin u·cos v (grön), och förlängningen
 *   E–C = cos u·sin v (orange). Tillsammans: D–C = sin(u+v) (röd) = grön +
 *   orange staplade.
 *
 * Tre steg (lager):
 *   1. Gissningen  — "är sin(u+v) = sin u + sin v?" Ja/Nej, sedan facit med
 *                     aktuella tal (grundläget u=30°, v=40° ger just det
 *                     talande motexemplet: 1,143 > 1, omöjligt för sinus).
 *   2. Rektangeln  — hela konstruktionen; termväljare (tre knappar) lyser
 *                     upp motsvarande sträcka i figuren; KaTeX-rad med
 *                     samma färger och aktuella tal.
 *   3. Fler formler — knapp "u = v" snappar glidarna lika (de färgade
 *                     sträckorna blir lika långa) och visar formeln för
 *                     dubbla vinkeln; cos(u+v)-formeln kontrolleras numeriskt.
 *
 * Punkten B är dragbar direkt i scenen (vinkel → u, radie → v via
 * v = arccos(radie)); glidare för u och v är komplement.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['<id>'] = { mount(el) }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    // Text med kursiva variabler: delar märkta med * i arrayen blir italic.
    function svgVarText(attrs, parts) {
        var el = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var italic = p.charAt(0) === '*';
            var t = svgEl('tspan', italic ? { 'font-style': 'italic' } : {});
            t.textContent = italic ? p.slice(1) : p;
            el.appendChild(t);
        }
        return el;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        green: '#3f8f5c',      // sin u · cos v
        orange: '#c1622c',     // cos u · sin v
        red: '#c8324a',        // sin(u+v)
        hyp: '#2563c9'         // hypotenusan OC = 1
    };

    // ── Geometrihjälp (skärmrymd) ──────────────────────────────────────
    function polarPt(cx, cy, r, angDeg) {
        var a = angDeg * Math.PI / 180;
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }
    function arcPathD(cx, cy, r, a1, a2, sweep) {
        var p1 = polarPt(cx, cy, r, a1), p2 = polarPt(cx, cy, r, a2);
        var laf = Math.abs(a2 - a1) > 180 ? 1 : 0;
        return 'M ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) + ' A ' + r + ' ' + r +
            ' 0 ' + laf + ' ' + sweep + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
    }

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var U_MIN = 10, U_MAX = 60, V_MIN = 10, V_MAX = 60, SUM_MAX = 118;
        var state = { u: 30, v: 40, step: 1, guess: null, term: null };

        function clampUV(u, v) {
            u = Math.round(clampNum(u, U_MIN, U_MAX));
            v = Math.round(clampNum(v, V_MIN, V_MAX));
            if (u + v > SUM_MAX) {
                var over = u + v - SUM_MAX;
                v = Math.max(V_MIN, v - over);
                if (u + v > SUM_MAX) u = Math.max(U_MIN, SUM_MAX - v);
            }
            return { u: u, v: v };
        }

        // ── Geometri: huvudscen ────────────────────────────────────────
        var W = 560, H = 420;
        var R = 240, X0 = 200, Y0 = 380;

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Additionsformlerna i rektangeln';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        // Steg 1: gissa-först
        var guessRow = document.createElement('div');
        guessRow.className = 'lab-vis-actions';
        card.appendChild(guessRow);

        var guessNote = document.createElement('div');
        guessNote.className = 'lab-vis-note';
        card.appendChild(guessNote);

        // Scen (steg 2–3)
        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Två rätvinkliga trianglar staplade: en med vinkel u längst ner, en med ' +
                'vinkel v och hypotenusa 1 ovanpå. Sträckan sin(u+v) består synligt av en grön del ' +
                '(sin u·cos v) och en orange del (cos u·sin v) staplade. Dra i punkten B eller ' +
                'glidarna för att ändra u och v.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        // Termväljare (steg 2–3)
        var termRow = document.createElement('div');
        termRow.className = 'lab-vis-actions';
        card.appendChild(termRow);

        var formelGeneral = document.createElement('div');
        formelGeneral.className = 'lab-vis-formel';
        card.appendChild(formelGeneral);

        var formelNumeric = document.createElement('div');
        formelNumeric.className = 'lab-vis-formel';
        card.appendChild(formelNumeric);

        // Steg 3: fler formler
        var actions3 = document.createElement('div');
        actions3.className = 'lab-vis-actions';
        card.appendChild(actions3);

        var formelDoubleGen = document.createElement('div');
        formelDoubleGen.className = 'lab-vis-formel';
        formelDoubleGen.style.color = COL.green;
        card.appendChild(formelDoubleGen);

        var formelDoubleNum = document.createElement('div');
        formelDoubleNum.className = 'lab-vis-formel';
        formelDoubleNum.style.color = COL.green;
        card.appendChild(formelDoubleNum);

        var formelCosGen = document.createElement('div');
        formelCosGen.className = 'lab-vis-formel';
        formelCosGen.style.color = COL.hyp;
        card.appendChild(formelCosGen);

        var formelCosNum = document.createElement('div');
        formelCosNum.className = 'lab-vis-formel';
        formelCosNum.style.color = COL.hyp;
        card.appendChild(formelCosNum);

        var note3 = document.createElement('div');
        note3.className = 'lab-vis-note';
        card.appendChild(note3);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Gissningen' },
            { n: 2, label: '2 · Rektangeln' },
            { n: 3, label: '3 · Fler formler' }
        ];
        var INSTR = {
            1: 'Är sin(<em>u</em> + <em>v</em>) samma sak som sin <em>u</em> + sin <em>v</em>? ' +
               'Gissa Ja eller Nej — prova sedan att ändra <em>u</em> och <em>v</em> nedan och se ' +
               'vad talen säger.',
            2: 'Den klassiska konstruktionen: en triangel med vinkeln <em>v</em> (hypotenusa 1) ' +
               'ovanpå en triangel med vinkeln <em>u</em>. Tryck på en term nedanför för att lysa ' +
               'upp exakt den sträcka i figuren som talet motsvarar.',
            3: 'Sätt <em>v</em> = <em>u</em> med knappen — de två färgade sträckorna blir lika ' +
               'långa, och formeln blir dubbla vinkeln. Cosinusformeln kan du kontrollera med ' +
               'siffrorna direkt.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                state.term = null;
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Gissa-knappar (steg 1) ──────────────────────────────────────
        var guessLbl = document.createElement('span');
        guessLbl.textContent = 'sin(u+v) = sin u + sin v?';
        guessLbl.style.fontSize = '13.5px';
        guessLbl.style.color = 'var(--lab-ink-soft)';
        guessRow.appendChild(guessLbl);
        var guessBtns = {};
        [['ja', 'Ja'], ['nej', 'Nej']].forEach(function (g) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = g[1];
            b.addEventListener('click', function () { state.guess = g[0]; update(); });
            guessRow.appendChild(b);
            guessBtns[g[0]] = b;
        });
        function paintGuessButtons() {
            for (var k in guessBtns) {
                var on = state.guess === k;
                guessBtns[k].style.background = on ? COL.axis : '';
                guessBtns[k].style.color = on ? '#fff' : '';
                guessBtns[k].style.borderColor = on ? COL.axis : '';
            }
        }

        // ── Termväljare (steg 2–3) ───────────────────────────────────────
        var termBtns = {};
        function termBtn(key, color, html) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            var sw = document.createElement('span');
            sw.style.cssText = 'display:inline-block;width:11px;height:11px;border-radius:2px;' +
                'margin-right:6px;vertical-align:-1px;background:' + color;
            b.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            b.appendChild(txt);
            b.addEventListener('click', function () {
                state.term = state.term === key ? null : key;
                update();
            });
            termRow.appendChild(b);
            termBtns[key] = { btn: b, color: color };
        }
        termBtn('sinCos', COL.green, 'sin <em>u</em>·cos <em>v</em>');
        termBtn('cosSin', COL.orange, 'cos <em>u</em>·sin <em>v</em>');
        termBtn('sum', COL.red, 'sin(<em>u</em>+<em>v</em>)');
        function paintTermButtons() {
            for (var k in termBtns) {
                var on = state.term === k, t = termBtns[k];
                t.btn.style.background = on ? t.color : '';
                t.btn.style.color = on ? '#fff' : '';
                t.btn.style.borderColor = on ? t.color : '';
            }
        }

        // ── "u = v"-knapp (steg 3) ────────────────────────────────────
        var eqBtn = document.createElement('button');
        eqBtn.type = 'button';
        eqBtn.className = 'lab-btn lab-btn-primary';
        eqBtn.innerHTML = '<em>v</em> = <em>u</em> (dubbla vinkeln)';
        eqBtn.addEventListener('click', function () {
            var r = clampUV(state.u, state.u);
            state.u = r.u; state.v = r.v;
            rowU.sync(); rowV.sync();
            update();
        });
        actions3.appendChild(eqBtn);

        // ── Glidare (u och v) ─────────────────────────────────────────
        function makeRow(name, min, max, step, get, set) {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = name;
            lbl.appendChild(em);
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = min; slider.max = max; slider.step = step; slider.value = get();
            slider.setAttribute('aria-label', 'Vinkeln ' + name + ' i grader');
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Vinkeln ' + name + ' i grader');
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.hyp + ' 0%, ' +
                    COL.hyp + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(Math.round(v));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = String(get());
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { field.value = String(get()); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () { slider.value = get(); field.value = String(get()); paint(); }
            };
        }
        var rowU = makeRow('u', U_MIN, U_MAX, 1,
            function () { return state.u; },
            function (v) { var r = clampUV(v, state.v); state.u = r.u; state.v = r.v; });
        var rowV = makeRow('v', V_MIN, V_MAX, 1,
            function () { return state.v; },
            function (v) { var r = clampUV(state.u, v); state.u = r.u; state.v = r.v; });

        // ── Återställ ─────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.u = 30; state.v = 40; state.step = 1; state.guess = null; state.term = null;
            rowU.sync(); rowV.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbar punkt B ───────────────────────────────────────────
        function toWorld(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return { x: (px - X0) / R, y: (Y0 - py) / R };
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var w = toWorld(e.clientX, e.clientY);
            var ang = Math.atan2(w.y, w.x) * 180 / Math.PI;
            var rad = Math.hypot(w.x, w.y);
            var radClamped = clampNum(rad, Math.cos(V_MAX * Math.PI / 180), Math.cos(V_MIN * Math.PI / 180));
            var newV = Math.round(Math.acos(radClamped) * 180 / Math.PI);
            var newU = Math.round(ang);
            var r = clampUV(newU, newV);
            state.u = r.u; state.v = r.v;
            rowU.sync(); rowV.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita huvudscenen ──────────────────────────────────────────
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var uD = state.u, vD = state.v;
            var uR = uD * Math.PI / 180, vR = vD * Math.PI / 180;
            var sinU = Math.sin(uR), cosU = Math.cos(uR), sinV = Math.sin(vR), cosV = Math.cos(vR);
            var sumR = uR + vR;
            var sinSum = Math.sin(sumR);

            var Bw = { x: cosV * cosU, y: cosV * sinU };
            var Cw = { x: Math.cos(sumR), y: sinSum };
            var Fw = { x: Bw.x, y: 0 };
            var Dw = { x: Cw.x, y: 0 };
            var Ew = { x: Cw.x, y: Bw.y };
            function toPx(w) { return { x: X0 + w.x * R, y: Y0 - w.y * R }; }
            var O = { x: X0, y: Y0 }, B = toPx(Bw), C = toPx(Cw), F = toPx(Fw), D = toPx(Dw), E = toPx(Ew);

            var term = state.term;
            var helperOp = term == null ? 0.85 : 0.4;
            var greenOp = term === 'cosSin' ? 0.22 : 1;
            var orangeOp = term === 'sinCos' ? 0.22 : 1;
            var redOp = term == null ? 0.4 : (term === 'sum' ? 1 : 0.15);
            var greenW = term === 'sinCos' ? 9 : 7;
            var orangeW = term === 'cosSin' ? 9 : 7;
            var redW = term === 'sum' ? 16 : 11;

            // Baslinje med liten pilspets
            var baseX1 = X0 + (-0.62) * R, baseX2 = X0 + 1.05 * R;
            svg.appendChild(svgEl('line', { x1: baseX1, y1: O.y, x2: baseX2, y2: O.y, stroke: COL.axis, 'stroke-width': 1.4, opacity: helperOp }));
            svg.appendChild(svgEl('polygon', {
                points: (baseX2 + 8) + ',' + O.y + ' ' + (baseX2 - 1) + ',' + (O.y - 4) + ' ' + (baseX2 - 1) + ',' + (O.y + 4),
                fill: COL.axis, opacity: helperOp
            }));

            // Röd bakgrundssträcka D–C (bas för grön+orange staplade)
            svg.appendChild(svgEl('line', {
                x1: D.x, y1: D.y, x2: C.x, y2: C.y, stroke: COL.red, 'stroke-width': redW,
                'stroke-linecap': 'round', opacity: redOp
            }));

            // Hjälplinjer: OB, OC (hypotenusa 1), BC, dashad EB
            svg.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: B.x, y2: B.y, stroke: COL.axis, 'stroke-width': 1.4, opacity: helperOp }));
            svg.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: C.x, y2: C.y, stroke: COL.hyp, 'stroke-width': 1.6, opacity: helperOp }));
            svg.appendChild(svgEl('line', { x1: B.x, y1: B.y, x2: C.x, y2: C.y, stroke: COL.axis, 'stroke-width': 1.4, opacity: helperOp }));
            svg.appendChild(svgEl('line', { x1: E.x, y1: E.y, x2: B.x, y2: B.y, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3', opacity: helperOp }));

            // Gröna sträckor: F–B och D–E (samma längd = sin u·cos v)
            svg.appendChild(svgEl('line', { x1: F.x, y1: F.y, x2: B.x, y2: B.y, stroke: COL.green, 'stroke-width': greenW, 'stroke-linecap': 'round', opacity: greenOp }));
            svg.appendChild(svgEl('line', { x1: D.x, y1: D.y, x2: E.x, y2: E.y, stroke: COL.green, 'stroke-width': greenW, 'stroke-linecap': 'round', opacity: greenOp }));

            // Orange sträcka: E–C (= cos u·sin v)
            svg.appendChild(svgEl('line', { x1: E.x, y1: E.y, x2: C.x, y2: C.y, stroke: COL.orange, 'stroke-width': orangeW, 'stroke-linecap': 'round', opacity: orangeOp }));

            // Hörnprickar
            [[O, COL.axis, 3], [B, COL.axis, 3.2], [C, COL.hyp, 3.2], [F, COL.dash, 2], [D, COL.dash, 2], [E, COL.dash, 2]].forEach(function (p) {
                svg.appendChild(svgEl('circle', { cx: p[0].x, cy: p[0].y, r: p[2], fill: p[1], opacity: p[0] === O || p[0] === B || p[0] === C ? 0.95 : helperOp }));
            });

            // Vinkelbågar vid O: u (baslinje → OB), v (OB → OC)
            var rU = 34, rV = 56;
            svg.appendChild(svgEl('path', { d: arcPathD(O.x, O.y, rU, 0, -uD, 0), fill: 'none', stroke: COL.axis, 'stroke-width': 1.3, opacity: 0.8 }));
            svg.appendChild(svgEl('path', { d: arcPathD(O.x, O.y, rV, -uD, -(uD + vD), 0), fill: 'none', stroke: COL.axis, 'stroke-width': 1.3, opacity: 0.8 }));

            // Bågetiketter (kursiv u/v), pressade utåt vid smala vinklar
            function labelRadius(rBase, spanDeg) {
                var spanRad = Math.max(spanDeg, 4) * Math.PI / 180;
                var needed = 10 / Math.sin(Math.max(spanRad / 2, 0.03));
                return Math.max(rBase + 14, Math.min(needed, rBase + 70));
            }
            var uLabR = labelRadius(rU, uD);
            var vLabR = labelRadius(rV, vD);
            var uBis = polarPt(O.x, O.y, uLabR, -uD / 2);
            var vBis = polarPt(O.x, O.y, vLabR, -(uD + vD / 2));
            svg.appendChild(svgVarText({ x: uBis.x, y: uBis.y + 4.5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.axis }, ['*u']));
            svg.appendChild(svgVarText({ x: vBis.x, y: vBis.y + 4.5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.axis }, ['*v']));

            // Etikett "1" vid hypotenusan OC — förskjuten i fri yta bort från B
            var dx = C.x - O.x, dy = C.y - O.y, len = Math.hypot(dx, dy) || 1;
            var perpX = -dy / len, perpY = dx / len;
            var dot = perpX * (B.x - O.x) + perpY * (B.y - O.y);
            var sign = dot > 0 ? -1 : 1;
            var midX = (O.x + C.x) / 2, midY = (O.y + C.y) / 2;
            var oneX = midX + sign * perpX * 15, oneY = midY + sign * perpY * 15;
            svg.appendChild(svgEl('text', { x: oneX, y: oneY + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.hyp })).textContent = '1';

            // Dragbar träffyta på B
            var hit = svgEl('circle', { cx: B.x, cy: B.y, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
            svg.appendChild(svgEl('circle', { cx: B.x, cy: B.y, r: 5, fill: 'none', stroke: COL.axis, 'stroke-width': 1.2, opacity: 0.55 }));
        }

        // ── Formler och texter ─────────────────────────────────────────
        function updateFormulas() {
            var uD = state.u, vD = state.v, sumD = uD + vD;
            var uR = uD * Math.PI / 180, vR = vD * Math.PI / 180, sumR = uR + vR;
            var sinU = Math.sin(uR), cosU = Math.cos(uR), sinV = Math.sin(vR), cosV = Math.cos(vR);
            var sinSum = Math.sin(sumR), cosSum = Math.cos(sumR);
            var sU = fmtTex(sinU, 3), cU = fmtTex(cosU, 3), sV = fmtTex(sinV, 3), cV = fmtTex(cosV, 3);

            if (state.step === 1) {
                if (state.guess == null) {
                    guessNote.innerHTML = '';
                } else {
                    var sumSc = sinU + sinV;
                    var intro = state.guess === 'nej'
                        ? 'Rätt tänkt! Se varför på siffrorna:'
                        : 'Nästan alla tror det till en början — men se på siffrorna:';
                    var html = intro + '<br>' +
                        'sin ' + fmt(uD, 0) + '° + sin ' + fmt(vD, 0) + '° = ' + fmt(sinU, 3) + ' + ' + fmt(sinV, 3) + ' = ' + fmt(sumSc, 3) + '<br>' +
                        'sin(' + fmt(uD, 0) + '° + ' + fmt(vD, 0) + '°) = sin ' + fmt(sumD, 0) + '° = ' + fmt(sinSum, 3) + '<br>' +
                        fmt(sumSc, 3) + ' ≠ ' + fmt(sinSum, 3) + ' — alltså är sin(<em>u</em>+<em>v</em>) INTE lika med sin <em>u</em> + sin <em>v</em>.';
                    if (sumSc > 1) {
                        html += ' Dessutom: sinus kan aldrig bli större än 1, så ' + fmt(sumSc, 3) +
                            ' kan omöjligen vara ett sinusvärde!';
                    }
                    guessNote.innerHTML = html;
                }
            }

            if (state.step >= 2) {
                katexInto(formelGeneral,
                    '\\sin(u+v) = \\textcolor{' + COL.green + '}{\\sin u \\cdot \\cos v} + \\textcolor{' + COL.orange + '}{\\cos u \\cdot \\sin v}');
                katexInto(formelNumeric,
                    '\\sin(' + fmtTex(sumD, 0) + '^\\circ) = \\textcolor{' + COL.green + '}{' + sU + '\\cdot ' + cV + '} + ' +
                    '\\textcolor{' + COL.orange + '}{' + cU + '\\cdot ' + sV + '} = ' +
                    '\\textcolor{' + COL.green + '}{' + fmtTex(sinU * cosV, 3) + '} + \\textcolor{' + COL.orange + '}{' + fmtTex(cosU * sinV, 3) + '} = ' + fmtTex(sinSum, 3));
            } else {
                formelGeneral.textContent = ''; formelNumeric.textContent = '';
            }

            if (state.step === 3) {
                var val2 = 2 * sinU * cosU;
                katexInto(formelDoubleGen, '\\sin(2u) = 2\\sin u \\cdot \\cos u');
                katexInto(formelDoubleNum, '\\sin(' + fmtTex(2 * uD, 0) + '^\\circ) = 2\\cdot ' + sU + '\\cdot ' + cU + ' = ' + fmtTex(val2, 3));
                var cosCheck = cosU * cosV - sinU * sinV;
                katexInto(formelCosGen, '\\cos(u+v) = \\cos u\\cos v - \\sin u\\sin v');
                katexInto(formelCosNum, '\\cos(' + fmtTex(sumD, 0) + '^\\circ) = ' + cU + '\\cdot ' + cV + ' - ' + sU + '\\cdot ' + sV + ' = ' + fmtTex(cosCheck, 3));
                var same = fmt(cosSum, 3) === fmt(cosCheck, 3);
                note3.innerHTML = 'cos ' + fmt(sumD, 0) + '° = ' + fmt(cosSum, 3) + ' — ' + (same ? 'stämmer.' : 'avviker något pga avrundning.') +
                    (Math.abs(uD - vD) < 0.5
                        ? ' Med <em>v</em> = <em>u</em> blir de gröna och orange sträckorna i figuren exakt lika långa — båda är sin <em>u</em>·cos <em>u</em>.'
                        : '');
            } else {
                formelDoubleGen.textContent = ''; formelDoubleNum.textContent = '';
                formelCosGen.textContent = ''; formelCosNum.textContent = ''; note3.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ──────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            paintGuessButtons();
            paintTermButtons();

            guessRow.style.display = state.step === 1 ? '' : 'none';
            guessNote.style.display = state.step === 1 ? '' : 'none';
            scene.style.display = state.step >= 2 ? '' : 'none';
            termRow.style.display = state.step >= 2 ? '' : 'none';
            formelGeneral.style.display = state.step >= 2 ? '' : 'none';
            formelNumeric.style.display = state.step >= 2 ? '' : 'none';
            actions3.style.display = state.step === 3 ? '' : 'none';
            formelDoubleGen.style.display = state.step === 3 ? '' : 'none';
            formelDoubleNum.style.display = state.step === 3 ? '' : 'none';
            formelCosGen.style.display = state.step === 3 ? '' : 'none';
            formelCosNum.style.display = state.step === 3 ? '' : 'none';
            note3.style.display = state.step === 3 ? '' : 'none';

            if (state.step >= 2) drawMain();
            updateFormulas();
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma4-1.8'] = api;
    window.VISUALISERINGAR['ma4-1.9'] = api;
})();
