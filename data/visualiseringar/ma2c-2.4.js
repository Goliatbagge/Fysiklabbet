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
 * Fem steg:
 *   1. Uttrycket som areor — x²-kvadrat (fast ritstorlek, symboliserar det
 *      okända x) + px-remsa (bredd ∝ p) sida vid sida, måttsatta.
 *   2. Klyv remsan — när steget öppnas från steg 1 ANIMERAS klyvningen
 *      (rAF ~0,7 s): en klipplinje ritas uppifrån och ner genom remsan,
 *      varpå den delas i två p/2-halvor, båda måttsatta med dubbelpil-
 *      måttlinjer "p/2" ovanför (staggrade i höjd vid små p så
 *      etiketterna inte kolliderar).
 *   3. Vik halvorna på plats — vikanimationen (rAF ~1,2 s) spelas
 *      AUTOMATISKT när steget öppnas: ena halvan ligger kvar vid höger-
 *      kanten, den andra roterar 90° ner till underkanten. Nästan en
 *      kvadrat med sidan x + p/2 — hörnet lämnas HELT TOMT (bara
 *      bakgrund), inget ritas i gapet. "Spela vikningen igen"-knapp för
 *      repris; backar man till steg 2 spelas vikningen baklänges.
 *   4. Fyll hörnet — och pq-formeln — den röda streckade (p/2)²-kvadraten
 *      växer fram ur gapets inre hörn (rAF ~0,6 s, skala + fade); ram och
 *      (x + p/2)-mått tänds när den vuxit klart. Härledningens steg
 *      avslöjas i KaTeX en i taget via "Visa nästa rad", fram till
 *      pq-formeln. Ett live diskriminant-omdöme ((p/2)² - q) och — om
 *      täljaren är negativ — en "inga reella lösningar"-notis.
 *   5. Prova med tal — två snabbknappar (genomgångens exempel + ett
 *      exempel utan reella lösningar) kör hela kedjan direkt.
 *
 * Navigering: steg-pillerna ELLER "← Föregående"/"Nästa →"-knapparna
 * (inaktiverade vid ändlägena). Alla stegbyten går via gotoStep(), som
 * triggar rätt animation; viloläges-regeln i update() snappar tweens till
 * stegets slutläge så snart ingen animation kör.
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
        // cleaveT: klipplinjen som klyver remsan (steg 2), moveT: vikningen
        // (steg 3), fillT: hörnkvadraten som växer fram (steg 4) — alla 0..1
        var state = { p: 6, q: -7, step: 1, cleaveT: 0, moveT: 0, fillT: 0, algStep: 0 };
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
                'ritade som areor. Remsan klyvs i två halvor med bredden p halva, som viks ' +
                'runt hörnet och nästan bildar kvadraten x plus p halva i kvadrat — hörnet ' +
                'som fattas är en kvadrat med sidan p halva. ' +
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

        var navRow = document.createElement('div');
        navRow.className = 'lab-vis-actions';
        card.appendChild(navRow);

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
            { n: 2, label: '2 · Klyv remsan' },
            { n: 3, label: '3 · Vik halvorna på plats' },
            { n: 4, label: '4 · Fyll hörnet' },
            { n: 5, label: '5 · Prova med tal' }
        ];
        var INSTR = {
            1: 'Uttrycket <em>x</em>² + <em>px</em> ritat som två areor: en <em>x</em>²-kvadrat ' +
               'och en <em>p</em>·<em>x</em>-remsa bredvid. Sidan <em>x</em> är okänd (fast ' +
               'ritstorlek) — dra i remsans kant eller <em>p</em>-glidaren för att ändra bredden.',
            2: 'Remsan klyvs mitt itu i två lika breda delar — var och en med den nya bredden ' +
               '<em>p</em>/2, måttsatt ovanför. Dra i remsans kant eller <em>p</em>-glidaren ' +
               'för att ändra bredden.',
            3: 'Den ena halvan ligger kvar längs kvadratens högerkant; den andra viks ner till ' +
               'underkanten. Nästan en kvadrat med sidan <em>x</em> + <em>p</em>/2 — men hörnet ' +
               'fattas.',
            4: 'Hörnet som fattas är en kvadrat med sidan <em>p</em>/2 och arean (<em>p</em>/2)². ' +
               'Fyll i den — och lägg till (<em>p</em>/2)² på BÅDA led av ekvationen ' +
               '<em>x</em>² + <em>px</em> + <em>q</em> = 0. Följ omskrivningen steg för steg, ' +
               'fram till pq-formeln.',
            5: 'Prova med konkreta tal. Välj ett exempel — eller ställ in <em>p</em> och ' +
               '<em>q</em> själv — och se hela kedjan fram till lösningarna på en gång.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { gotoStep(s.n); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // Stegbyte med animationer: 1→2 ritas klipplinjen, in i steg 3
        // spelas vikningen framåt, tillbaka till steg 2 baklänges, in i
        // steg 4 växer hörnkvadraten fram. Övriga hopp landar direkt i
        // stegets viloläge (snap-regeln i update).
        function gotoStep(n) {
            n = clampNum(n, 1, STEPS.length);
            var prev = state.step;
            if (n === prev) return;
            state.step = n;
            if (n === 2 && prev === 1) {
                state.cleaveT = 0;
                startAnimTo('cleaveT', 1, 700);
                return;
            }
            if (n === 3 && state.moveT < 1) {
                state.cleaveT = 1;
                startAnimTo('moveT', 1, 1200);
                return;
            }
            if (n === 2 && state.moveT > 0) { startAnimTo('moveT', 0, 1200); return; }
            if (n === 4 && prev < 4) {
                stopAnim();
                state.cleaveT = 1; state.moveT = 1; state.fillT = 0;
                startAnimTo('fillT', 1, 600);
                return;
            }
            stopAnim();
            update();
        }

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
            legendItem(COL.px, '<em>p</em> · <em>x</em>' + (state.step >= 2 ? ' (kluven i två)' : ''));
            if (state.step >= 4) legendItem(COL.corner, '(<em>p</em>/2)² — hörnet', true);
        }

        // ── Knappar i actions-raden ──────────────────────────────────────
        var foldBtn = document.createElement('button');
        foldBtn.type = 'button';
        foldBtn.className = 'lab-btn';
        foldBtn.addEventListener('click', function () {
            stopAnim();
            state.moveT = 0;
            startAnimTo('moveT', 1, 1200);
        });
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
                stopAnim();
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

        // ── Föregående/Nästa — stega genom visualiseringen ───────────────
        function navBtn(label, delta) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = label;
            b.addEventListener('click', function () { gotoStep(state.step + delta); });
            navRow.appendChild(b);
            return b;
        }
        var prevBtn = navBtn('← Föregående', -1);
        var nextBtn = navBtn('Nästa →', 1);
        function setNavEnabled(btn, enabled) {
            btn.disabled = !enabled;
            btn.style.opacity = enabled ? '' : '0.35';
            btn.style.cursor = enabled ? '' : 'default';
        }

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
                stopAnim();
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
            stopAnim();
            state.p = 6; state.q = -7; state.step = 1; state.algStep = 0;
            state.cleaveT = 0; state.moveT = 0; state.fillT = 0;
            rowP.sync(); rowQ.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: "Vik remsan" ─────────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
        // Generisk animator: tweenar state[prop] till `to` under DUR ms.
        // En animation i taget (animId) — en ny avbryter den föregående.
        function startAnimTo(prop, to, DUR) {
            stopAnim();
            var from = state[prop];
            if (Math.abs(to - from) < 0.001) { state[prop] = to; update(); return; }
            var t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var pr = clampNum((ts - t0) / DUR, 0, 1);
                state[prop] = from + (to - from) * easeInOutCubic(pr);
                update();
                if (pr < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state[prop] = to; update(); }
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
            stopAnim();
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
                stopAnim();
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
            var filled = state.step >= 4;
            // Under hörnfyllnadens tween visas fortfarande steg 3-måtten;
            // ram + (x + p/2)-mått tänds först när kvadraten vuxit klart
            var fullyFilled = filled && state.fillT > 0.98;
            // Klyvningsläge (steg 2): remsan är fortfarande hel medan
            // klipplinjen ritas uppifrån och ner
            var cleaving = state.step === 2 && state.cleaveT < 1;
            var g = svgEl('g');
            svg.appendChild(g);

            // x²-kvadraten (oförändrad genom hela figuren)
            fieldRect(g, X0, Y0, SQ, SQ, COL.xSqFill);
            fieldLabel(g, X0 + SQ / 2, Y0 + SQ / 2, SQ, SQ, ['*x', '²'], COL.xSq, 22);

            if (cleaving) {
                // Hel px-remsa (som i steg 1) + klipplinje som växer nedåt
                fieldRect(g, X0 + SQ, Y0, 2 * hw, SQ, COL.pxFill);
                fieldLabel(g, X0 + SQ + hw, Y0 + SQ / 2, 2 * hw, SQ, ['*p', '*x'], COL.px, 16);
                var cutLen = SQ * state.cleaveT;
                if (cutLen > 0.5) {
                    g.appendChild(svgEl('line', {
                        x1: X0 + SQ + hw, y1: Y0, x2: X0 + SQ + hw, y2: Y0 + cutLen,
                        stroke: COL.ink, 'stroke-width': 2, 'stroke-linecap': 'butt'
                    }));
                }
            } else {
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
            }

            // Hörnet (p/2)²: helt tomt gap i steg 3 — i steg 4 växer den
            // röda streckade kvadraten fram från inre hörnet (skala + fade)
            var ccX = X0 + SQ, ccY = Y0 + SQ, ccS = hw;
            if (t > 0.98 && filled && state.fillT > 0.01) {
                var f = clampNum(state.fillT, 0, 1);
                var cg = svgEl('g', {
                    transform: 'translate(' + ccX + ',' + ccY + ') scale(' + f.toFixed(3) + ')',
                    opacity: f.toFixed(3)
                });
                cg.appendChild(svgEl('rect', {
                    x: 0, y: 0, width: ccS, height: ccS,
                    fill: COL.cornerFill, stroke: COL.corner,
                    'stroke-width': 1.8, 'stroke-dasharray': '5 4'
                }));
                fieldLabel(cg, ccS / 2, ccS / 2, ccS, ccS, ['(', '*p', '/2)', '²'], COL.corner, 12, 48);
                g.appendChild(cg);
            }

            // Måttlinjer + yttre ram
            if (fullyFilled) {
                g.appendChild(svgEl('rect', {
                    x: X0, y: Y0, width: SQ + ccS, height: SQ + ccS,
                    fill: 'none', stroke: COL.ink, 'stroke-width': 2.4
                }));
                dimSegH(svg, X0, X0 + SQ + ccS, Y0 - 22, ['(', '*x', ' + ', '*p', '/2)']);
                dimSegV(svg, Y0, Y0 + SQ + ccS, X0 - 22, ['(', '*x', ' + ', '*p', '/2)']);
            } else {
                dimSegH(svg, X0, X0 + SQ, Y0 - 22, ['*x']);
                dimSegV(svg, Y0, Y0 + SQ, X0 - 22, ['*x']);
                if (cleaving) {
                    // Remsan ännu hel: p-måttet över hela bredden (som steg 1)
                    dimSegH(svg, X0 + SQ, X0 + SQ + 2 * hw, Y0 - 22, ['*p']);
                } else {
                    // p/2-mått ovanför halva A (ligger alltid kvar uppe till höger)
                    dimSegH(svg, X0 + SQ, X0 + SQ + hw, Y0 - 22, ['*p', '/2']);
                    if (t < 0.02) {
                        // Halva B ovikt: eget p/2-mått bredvid — staggra i höjd
                        // vid små p så etiketterna inte kolliderar
                        var bDimY = hw < 30 ? Y0 - 44 : Y0 - 22;
                        dimSegH(svg, X0 + SQ + hw, X0 + SQ + 2 * hw, bDimY, ['*p', '/2']);
                    } else if (t > 0.98) {
                        // Halva B nedvikt: p/2 är nu en höjd — lodrätt mått till vänster
                        dimSegV(svg, Y0 + SQ, Y0 + SQ + hw, X0 - 22, ['*p', '/2']);
                    }
                }
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
            var showAlg = state.step >= 4;
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
                stepAlgBtn.textContent = 'Visa nästa rad';
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            // Klampa algStep om q/p ändrats så diskriminanten bytt tecken
            var mAlg = maxAlgStep();
            if (state.algStep > mAlg) state.algStep = mAlg;
            // Viloläge: utan pågående animation ligger alla tweens i
            // stegets slutläge (kluven fr.o.m. steg 2, färdigvikt fr.o.m.
            // steg 3, fyllt hörn fr.o.m. steg 4)
            if (animId == null) {
                state.cleaveT = state.step >= 2 ? 1 : 0;
                state.moveT = state.step >= 3 ? 1 : 0;
                state.fillT = state.step >= 4 ? 1 : 0;
            }

            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            buildLegend();

            if (state.step === 1) drawAreasStep1(); else drawFoldScene();

            actions.style.display = state.step >= 3 ? '' : 'none';
            foldBtn.style.display = state.step === 3 ? '' : 'none';
            foldBtn.textContent = 'Spela vikningen igen';
            setNavEnabled(prevBtn, state.step > 1);
            setNavEnabled(nextBtn, state.step < STEPS.length);
            stepAlgBtn.style.display = (state.step === 4 || state.step === 5) ? '' : 'none';
            var exBtns = actions.querySelectorAll('.lab-btn');
            // exampleBtn-knapparna är de två sista i actions — visa bara steg 5
            for (var bi = 0; bi < exBtns.length; bi++) {
                var btn = exBtns[bi];
                if (btn === foldBtn || btn === stepAlgBtn) continue;
                btn.style.display = state.step === 5 ? '' : 'none';
            }

            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                stopAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-2.4'] = api;
    window.VISUALISERINGAR['ma2c-2.5'] = api;
})();
