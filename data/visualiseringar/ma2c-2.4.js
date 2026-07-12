/* ma2c-2.4.js — visualisering: "Kvadratkomplettering som bygge".
 *
 * Kärninsikt: kvadratkomplettering är en BYGGRÖRELSE, inte ett abstrakt
 * formeltrick. x²-kvadraten plus px-remsan kan nästan formas till en
 * kvadrat med sidan x + p/2 — det som fattas är exakt hörnet (p/2)².
 * pq-formeln är minnesbilden av precis den rörelsen.
 *
 * Beteckningar speglar teorigenomgången ma2c-2.4.md exakt: x² + px + q = 0,
 * härledningen (subtrahera q, addera (p/2)², skriv VL som kvadreringsregel,
 * dra roten, lös ut x) och pq-formeln x = -p/2 ± sqrt((p/2)² - q).
 * Startläget p = 6, q = -7 återger genomgångens Exempel 1a exakt
 * (x² + 6x - 7 = 0 ⇒ x₁ = -7, x₂ = 1) så eleven kan "spela upp" exemplet.
 *
 * Fyra steg:
 *   1. Uttrycket som areor — x²-kvadrat (fast ritstorlek, symboliserar det
 *      okända x) + px-remsa (bredd ∝ p) sida vid sida, måttsatta.
 *   2. Vik remsan — "Vik remsan"-knapp (rAF ~1,2 s): remsan klyvs i två
 *      p/2-halvor; den ena roterar 90° och flyttas till kvadratens
 *      underkant. Nästan en kvadrat med sidan x + p/2 — hörnet (p/2)²
 *      fattas (streckad, pulserande kontur).
 *   3. Fyll hörnet — och pq-formeln — knappen "Lägg till hörnet" fyller
 *      gapet och avslöjar härledningens steg i KaTeX, en i taget via
 *      "Nästa steg", fram till pq-formeln. Ett live diskriminant-omdöme
 *      ((p/2)² - q) och — om täljaren är negativ — en "inga reella
 *      lösningar"-notis.
 *   4. Prova med tal — två snabbknappar (genomgångens exempel + ett
 *      exempel utan reella lösningar) kör hela kedjan direkt.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-2.1.js och ma2c-2.6.js). API: window.VISUALISERINGAR['ma2c-2.4'] =
 * { mount }, registrerad även för ma2c-2.5 (abc-formeln bygger på samma
 * kvadratkomplettering, bara med en extra division med a).
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
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
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        xSq: '#2563c9',             // x² — blå
        xSqFill: 'rgba(37,99,201,0.28)',
        px: '#3f8f5c',              // px-remsan — grön
        pxFill: 'rgba(63,143,92,0.28)',
        corner: '#c8324a',          // (p/2)²-hörnet — röd/accent
        cornerFill: 'rgba(200,50,74,0.28)',
        real: '#3f8f5c',            // två reella lösningar — grön
        zero: '#a9820c',            // dubbelrot — guldgul
        none: '#c8324a'             // inga reella lösningar — röd
    };

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var P_MIN = 1, P_MAX = 8, P_STEP = 0.5;
        var Q_MIN = -8, Q_MAX = 8, Q_STEP = 0.5;
        var EPS = 0.05;
        var state = { p: 6, q: -7, step: 1, moveT: 0, algStep: 0 };
        var animId = null;

        // ── Geometri (pixel-rum) ───────────────────────────────────────
        var W = 560, H = 420;
        var SQ = 200;    // x²-kvadratens sida (fast ritstorlek — x är okänd)
        var PXP = 20;    // pixlar per enhet p
        var X0 = 120, Y0 = 90;

        function half() { return state.p / 2; }
        function halfSq() { var h = half(); return h * h; }
        function disc() { return halfSq() - state.q; }
        function maxAlgStep() { return disc() >= -EPS ? 5 : 3; }
        function isDouble() { return Math.abs(disc()) <= EPS; }

        // ── DOM-skelett ─────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Kvadratkomplettering som bygge';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv figur: kvadraten x-kvadrat och remsan p gånger x ' +
                'ritade som areor. Vik remsan runt hörnet för att nästan bilda kvadraten ' +
                'x plus p halva i kvadrat — hörnet som fattas har arean p halva i kvadrat. ' +
                'Dra i remsans kant eller p-glidaren för att ändra bredden.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var LINE_COUNT = 6; // index 0 = given, 1..5 = härledningens steg
        var lineDivs = [];
        for (var li = 0; li < LINE_COUNT; li++) {
            var ld = document.createElement('div');
            ld.className = 'lab-vis-formel';
            card.appendChild(ld);
            lineDivs.push(ld);
        }

        var statusNote = document.createElement('div');
        statusNote.className = 'lab-vis-note';
        card.appendChild(statusNote);

        var epilogue = document.createElement('div');
        epilogue.className = 'lab-vis-note';
        card.appendChild(epilogue);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Uttrycket som areor' },
            { n: 2, label: '2 · Vik remsan' },
            { n: 3, label: '3 · Fyll hörnet' },
            { n: 4, label: '4 · Prova med tal' }
        ];
        var INSTR = {
            1: 'Uttrycket <em>x</em>² + <em>px</em> ritat som två areor: en <em>x</em>²-kvadrat ' +
               'och en <em>p</em>·<em>x</em>-remsa bredvid. Sidan <em>x</em> är okänd (fast ' +
               'ritstorlek) — dra i remsans kant eller <em>p</em>-glidaren för att ändra bredden.',
            2: 'Klyv remsan mitt itu och vik den ena halvan runt hörnet. Tryck på "Vik remsan": ' +
               'de två halvorna hamnar längs kvadratens högra och undre kant. Nästan en kvadrat ' +
               'med sidan <em>x</em> + <em>p</em>/2 — men hörnet fattas.',
            3: 'Hörnet som fattas har arean (<em>p</em>/2)². Lägg till den på BÅDA led av ' +
               'ekvationen <em>x</em>² + <em>px</em> + <em>q</em> = 0 och följ omskrivningen ' +
               'steg för steg, fram till pq-formeln.',
            4: 'Prova med konkreta tal. Välj ett exempel — eller ställ in <em>p</em> och ' +
               '<em>q</em> själv — och se hela kedjan fram till lösningarna på en gång.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { state.step = s.n; update(); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ────────────────────────────────────────────────────────
        function legendItem(color, html, dashed) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            if (dashed) sw.style.borderTopStyle = 'dashed';
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            legend.appendChild(span);
        }
        function buildLegend() {
            legend.innerHTML = '';
            legendItem(COL.xSq, '<em>x</em>²');
            legendItem(COL.px, '<em>p</em> · <em>x</em>' + (state.step >= 2 ? ' (klyvs i två)' : ''));
            if (state.step >= 2) legendItem(COL.corner, '(<em>p</em>/2)² — hörnet', true);
        }

        // ── Knappar i actions-raden ──────────────────────────────────────
        var foldBtn = document.createElement('button');
        foldBtn.type = 'button';
        foldBtn.className = 'lab-btn';
        foldBtn.addEventListener('click', function () { startFold(); });
        actions.appendChild(foldBtn);

        var stepAlgBtn = document.createElement('button');
        stepAlgBtn.type = 'button';
        stepAlgBtn.className = 'lab-btn';
        stepAlgBtn.addEventListener('click', function () {
            state.algStep = clampNum(state.algStep + 1, 0, maxAlgStep());
            update();
        });
        actions.appendChild(stepAlgBtn);

        function exampleBtn(label, p, q) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = label;
            b.addEventListener('click', function () {
                stopFoldAnim();
                state.p = p; state.q = q; state.moveT = 1;
                rowP.sync(); rowQ.sync();
                state.algStep = maxAlgStep();
                update();
            });
            actions.appendChild(b);
            return b;
        }
        exampleBtn('Exempel: p = 6, q = −7', 6, -7);
        exampleBtn('Exempel: p = 4, q = 6', 4, 6);

        // ── Glidare (p och q) ─────────────────────────────────────────────
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
            slider.setAttribute('aria-label', 'Värdet på ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            var decimals = step < 0.05 ? 2 : step < 1 ? 1 : 0;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.ink + ' 0%, ' +
                    COL.ink + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopFoldAnim();
                set(clampNum(v, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), decimals).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(get(), decimals).replace(',', '.');
            });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        var rowP = makeRow('p', P_MIN, P_MAX, P_STEP,
            function () { return state.p; },
            function (v) { state.p = v; });
        var rowQ = makeRow('q', Q_MIN, Q_MAX, Q_STEP,
            function () { return state.q; },
            function (v) { state.q = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopFoldAnim();
            state.p = 6; state.q = -7; state.step = 1; state.moveT = 0; state.algStep = 0;
            rowP.sync(); rowQ.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: "Vik remsan" ─────────────────────────────────────
        function stopFoldAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
        function startFold() {
            stopFoldAnim();
            var from = state.moveT, to = state.moveT >= 0.5 ? 0 : 1;
            var t0 = null, DUR = 1200;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var pr = clampNum((ts - t0) / DUR, 0, 1);
                state.moveT = from + (to - from) * easeInOutCubic(pr);
                update();
                if (pr < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.moveT = to; update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbart handtag: remsans yttre kant styr p ────────────────────
        var dragging = false;
        function toSvgX(clientX) {
            var r = svg.getBoundingClientRect();
            return (clientX - r.left) * W / r.width;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            stopFoldAnim();
            var px = toSvgX(e.clientX);
            var newP = clampNum(Math.round(((px - (X0 + SQ)) / PXP) / P_STEP) * P_STEP, P_MIN, P_MAX);
            state.p = newP;
            rowP.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function addDragHandle(cx, cy) {
            svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 5.5, fill: COL.px }));
            var hit = svgEl('circle', { cx: cx, cy: cy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopFoldAnim();
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Ritahjälpare: fält, etiketter, måttlinjer ─────────────────────
        function fieldRect(g, x, y, w, h, fill, strokeColor) {
            g.appendChild(svgEl('rect', {
                x: x, y: y, width: w, height: h, fill: fill,
                stroke: strokeColor || COL.ink, 'stroke-width': 1, 'stroke-opacity': strokeColor ? 1 : 0.35
            }));
        }
        function fieldLabel(g, cx, cy, wpx, hpx, parts, color, fontSize, minPx) {
            if (wpx < (minPx || 24) || hpx < (minPx || 24)) return;
            g.appendChild(svgVarText(
                { x: cx, y: cy + 5, 'font-size': fontSize || 15, 'text-anchor': 'middle', fill: color || COL.ink },
                parts));
        }
        function dimSegH(parent, x1, x2, y, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', {
                points: x1 + ',' + y + ' ' + (x1 + asz) + ',' + (y - asz * 0.6) + ' ' + (x1 + asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            parent.appendChild(svgEl('polygon', {
                points: x2 + ',' + y + ' ' + (x2 - asz) + ',' + (y - asz * 0.6) + ' ' + (x2 - asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            parent.appendChild(svgVarText(
                { x: (x1 + x2) / 2, y: y - 7, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink }, parts));
        }
        function dimSegV(parent, y1, y2, x, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x, y1: y1, x2: x, y2: y2, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', {
                points: x + ',' + y1 + ' ' + (x - asz * 0.6) + ',' + (y1 + asz) + ' ' + (x + asz * 0.6) + ',' + (y1 + asz),
                fill: COL.ink
            }));
            parent.appendChild(svgEl('polygon', {
                points: x + ',' + y2 + ' ' + (x - asz * 0.6) + ',' + (y2 - asz) + ' ' + (x + asz * 0.6) + ',' + (y2 - asz),
                fill: COL.ink
            }));
            parent.appendChild(svgVarText(
                { x: x - 9, y: (y1 + y2) / 2 + 4, 'font-size': 13, 'text-anchor': 'end', fill: COL.ink }, parts));
        }

        // ── Steg 1: uttrycket som areor ────────────────────────────────
        function drawAreasStep1() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var p = state.p, pPx = p * PXP;
            var g = svgEl('g');
            svg.appendChild(g);

            fieldRect(g, X0, Y0, SQ, SQ, COL.xSqFill);
            fieldRect(g, X0 + SQ, Y0, pPx, SQ, COL.pxFill);

            fieldLabel(g, X0 + SQ / 2, Y0 + SQ / 2, SQ, SQ, ['*x', '²'], COL.xSq, 22);
            fieldLabel(g, X0 + SQ + pPx / 2, Y0 + SQ / 2, pPx, SQ, ['*p', '*x'], COL.px, 16);

            dimSegH(svg, X0, X0 + SQ, Y0 - 22, ['*x']);
            dimSegH(svg, X0 + SQ, X0 + SQ + pPx, Y0 - 22, ['*p']);
            dimSegV(svg, Y0, Y0 + SQ, X0 - 22, ['*x']);

            addDragHandle(X0 + SQ + pPx, Y0 + SQ / 2);
        }

        // ── Steg 2/3/4: vikning + hörnet ──────────────────────────────
        function drawFoldScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var p = state.p, t = state.moveT;
            var hw = (p * PXP) / 2;
            var filled = state.step >= 3 && state.algStep >= 2;
            var g = svgEl('g');
            svg.appendChild(g);

            // x²-kvadraten (oförändrad genom hela figuren)
            fieldRect(g, X0, Y0, SQ, SQ, COL.xSqFill);
            fieldLabel(g, X0 + SQ / 2, Y0 + SQ / 2, SQ, SQ, ['*x', '²'], COL.xSq, 22);

            // Halva A — ligger kvar mot kvadratens högerkant
            fieldRect(g, X0 + SQ, Y0, hw, SQ, COL.pxFill);
            fieldLabel(g, X0 + SQ + hw / 2, Y0 + SQ / 2, hw, SQ, ['(', '*p', '/2)', '*x'], COL.px, 13);

            // Spökkontur: där halva B kom ifrån, medan den är på väg
            if (t > 0.02 && t < 0.98) {
                g.appendChild(svgEl('rect', {
                    x: X0 + SQ + hw, y: Y0, width: hw, height: SQ,
                    fill: 'none', stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
                }));
            }

            // Halva B — roterar och flyttas till kvadratens underkant
            var startCx = X0 + SQ + hw + hw / 2, startCy = Y0 + SQ / 2;
            var endCx = X0 + SQ / 2, endCy = Y0 + SQ + hw / 2;
            var cx = startCx + (endCx - startCx) * t;
            var cy = startCy + (endCy - startCy) * t;
            var theta = 90 * t;
            var mg = svgEl('g', {
                transform: 'translate(' + cx.toFixed(2) + ',' + cy.toFixed(2) + ') rotate(' + theta.toFixed(2) + ')'
            });
            mg.appendChild(svgEl('rect', {
                x: (-hw / 2).toFixed(2), y: (-SQ / 2).toFixed(2), width: hw, height: SQ,
                fill: COL.pxFill, stroke: COL.ink, 'stroke-width': 1, 'stroke-opacity': 0.35
            }));
            if (hw >= 24 && SQ >= 24) {
                var tg = svgEl('g', { transform: 'rotate(' + (-theta).toFixed(2) + ')' });
                tg.appendChild(svgVarText(
                    { x: 0, y: 5, 'font-size': 13, 'text-anchor': 'middle', fill: COL.px },
                    ['(', '*p', '/2)', '*x']));
                mg.appendChild(tg);
            }
            g.appendChild(mg);

            // Hörnet (p/2)²: dashat/pulserande gap eller solitt fyllt
            var ccX = X0 + SQ, ccY = Y0 + SQ, ccS = hw;
            if (t > 0.98) {
                if (filled) {
                    fieldRect(g, ccX, ccY, ccS, ccS, COL.cornerFill, COL.corner);
                    fieldLabel(g, ccX + ccS / 2, ccY + ccS / 2, ccS, ccS, ['+(', '*p', '/2)', '²'], COL.corner, 12, 54);
                } else {
                    var cornerRect = svgEl('rect', {
                        x: ccX, y: ccY, width: ccS, height: ccS,
                        fill: 'rgba(200,50,74,0.14)', stroke: COL.corner,
                        'stroke-width': 1.8, 'stroke-dasharray': '5 4'
                    });
                    cornerRect.appendChild(svgEl('animate', {
                        attributeName: 'opacity', values: '0.45;1;0.45', dur: '2.2s', repeatCount: 'indefinite'
                    }));
                    g.appendChild(cornerRect);
                    fieldLabel(g, ccX + ccS / 2, ccY + ccS / 2, ccS, ccS, ['(', '*p', '/2)', '²'], COL.corner, 12, 48);
                }
            }

            // Måttlinjer + yttre ram
            if (filled) {
                g.appendChild(svgEl('rect', {
                    x: X0, y: Y0, width: SQ + ccS, height: SQ + ccS,
                    fill: 'none', stroke: COL.ink, 'stroke-width': 2.4
                }));
                dimSegH(svg, X0, X0 + SQ + ccS, Y0 - 22, ['(', '*x', ' + ', '*p', '/2)']);
                dimSegV(svg, Y0, Y0 + SQ + ccS, X0 - 22, ['(', '*x', ' + ', '*p', '/2)']);
            } else {
                dimSegH(svg, X0, X0 + SQ, Y0 - 22, ['*x']);
                dimSegV(svg, Y0, Y0 + SQ, X0 - 22, ['*x']);
            }

            // Draghandtag för p — bara innan vikningen börjat
            if (t < 0.02) addDragHandle(X0 + SQ + p * PXP, Y0 + SQ / 2);
        }

        // ── KaTeX-hjälpare för härledningen ────────────────────────────
        function sqTex(v, d) {
            var t = fmtTex(v, d);
            return (v < 0 ? '(' + t + ')' : t) + '^2';
        }
        function term(v, d) {
            if (Math.abs(v) < 1e-9) return '';
            var t = fmtTex(Math.abs(v), d);
            return (v < 0 ? ' - ' : ' + ') + t;
        }
        function rhsTex(v, d) {
            var t = fmtTex(Math.abs(v), d);
            return v < 0 ? '-' + t : t;
        }

        // ── Formler och texter (steg 3/4) ─────────────────────────────
        function updateFormulas() {
            var showAlg = state.step >= 3;
            lineDivs.forEach(function (d) { d.style.display = showAlg ? '' : 'none'; });
            statusNote.style.display = showAlg ? '' : 'none';
            epilogue.style.display = showAlg ? '' : 'none';
            if (!showAlg) return;

            var p = state.p, q = state.q, h = half(), hs = halfSq(), D = disc();
            var pT = fmtTex(p, 1), hT = fmtTex(h, 2), DT = fmtTex(D, 2);
            var mAlg = maxAlgStep();

            katexInto(lineDivs[0], 'x^2 + ' + pT + 'x' + term(q, 1) + ' = 0');
            for (var i = 1; i <= 5; i++) lineDivs[i].style.display = state.algStep >= i ? '' : 'none';

            if (state.algStep >= 1) katexInto(lineDivs[1], 'x^2 + ' + pT + 'x = ' + rhsTex(-q, 1));
            if (state.algStep >= 2) katexInto(lineDivs[2],
                'x^2 + ' + pT + 'x + ' + sqTex(h, 2) + ' = ' + sqTex(h, 2) + term(-q, 1));
            if (state.algStep >= 3) katexInto(lineDivs[3],
                '(x + ' + hT + ')^2 = ' + sqTex(h, 2) + term(-q, 1) + ' = ' + DT);
            var dbl = isDouble();
            var sqrtD = Math.sqrt(Math.max(D, 0));
            if (mAlg >= 5) {
                if (state.algStep >= 4) katexInto(lineDivs[4], dbl
                    ? ('x + ' + hT + ' = 0')
                    : ('x + ' + hT + ' = \\pm\\sqrt{' + DT + '} = \\pm ' + fmtTex(sqrtD, 2)));
                if (state.algStep >= 5) katexInto(lineDivs[5], dbl
                    ? ('x = -' + hT)
                    : ('x = -' + hT + ' \\pm ' + fmtTex(sqrtD, 2)));
            }

            // Live diskriminant-status
            var col = D > EPS ? COL.real : dbl ? COL.zero : COL.none;
            statusNote.style.color = col;
            statusNote.innerHTML = 'Under rottecknet: (<em>p</em>/2)² − <em>q</em> = ' + fmtDisp(D, 2) +
                (D > EPS ? ' > 0 → två lösningar.' : dbl ? ' → en dubbelrot.' :
                    ' < 0 → (<em>x</em> + ' + fmtDisp(h, 2) + ')² kan aldrig bli negativt, så ' +
                    'ekvationen saknar reella lösningar.');

            // Facit (epilog) när härledningen är fullständig
            if (state.algStep >= mAlg) {
                epilogue.style.color = col;
                if (mAlg === 3) {
                    epilogue.innerHTML = 'Vänsterledet är alltid ≥ 0, men högerledet är ' + fmtDisp(D, 2) +
                        ' — ekvationen har inga reella lösningar.';
                } else if (dbl) {
                    epilogue.innerHTML = '<em>x</em> = ' + fmtDisp(-h, 2) + ' — en dubbelrot, de två ' +
                        'lösningarna sammanfaller.';
                } else {
                    var x1 = -h - sqrtD, x2 = -h + sqrtD;
                    epilogue.innerHTML = '<em>x</em>₁ = ' + fmtDisp(x1, 2) + '&emsp;<em>x</em>₂ = ' +
                        fmtDisp(x2, 2) + ' — det här är pq-formeln, med talen isatta.';
                }
            } else {
                epilogue.innerHTML = '';
            }

            // Steg-knappens etikett/synlighet
            if (state.algStep >= mAlg) {
                stepAlgBtn.style.display = 'none';
            } else {
                stepAlgBtn.style.display = '';
                stepAlgBtn.textContent = state.algStep === 1 ? 'Lägg till hörnet' : 'Nästa steg';
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            // Klampa algStep om q/p ändrats så diskriminanten bytt tecken
            var mAlg = maxAlgStep();
            if (state.algStep > mAlg) state.algStep = mAlg;
            // Senare steg bygger vidare på vikningen — säkerställ den är klar
            if (state.step >= 3 && state.moveT < 1) state.moveT = 1;

            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            buildLegend();

            if (state.step === 1) drawAreasStep1(); else drawFoldScene();

            actions.style.display = state.step >= 2 ? '' : 'none';
            foldBtn.style.display = state.step === 2 ? '' : 'none';
            foldBtn.textContent = state.moveT >= 0.5 ? 'Vik tillbaka' : 'Vik remsan';
            stepAlgBtn.style.display = (state.step === 3 || state.step === 4) ? '' : 'none';
            var exBtns = actions.querySelectorAll('.lab-btn');
            // exampleBtn-knapparna är de två sista i actions — visa bara steg 4
            for (var bi = 0; bi < exBtns.length; bi++) {
                var btn = exBtns[bi];
                if (btn === foldBtn || btn === stepAlgBtn) continue;
                btn.style.display = state.step === 4 ? '' : 'none';
            }

            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                stopFoldAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-2.4'] = api;
    window.VISUALISERINGAR['ma2c-2.5'] = api;
})();
