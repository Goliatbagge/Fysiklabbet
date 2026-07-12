/* ma3c-6.5.js — visualisering: "Areasatsen — höjden fälls upp".
 *
 * Kärninsikt: T = (a·b·sinC)/2 ÄR "basen gånger höjden genom två" — höjden
 * mot basen a är h = b·sinC, och sinus mäter hur "uppfälld" sidan b är mot
 * basen. Dra vinkeln C och se höjden växa till max vid 90° och sjunka igen;
 * arean-som-funktion-av-vinkeln är bokstavligen en sinuskurva.
 *
 * Beteckningar speglar teorigenomgången ma3c-6.5.md exakt: triangel ABC,
 * area T (INTE A — A är ett hörn), areasatsens första form T = (ab sinC)/2
 * med C som mellanliggande vinkel till sidorna a och b. Geometrin läggs så
 * att a = CB är vågrät bas och b = CA går från hörnet C till spetsen A;
 * höjden mot a fälls då ner (eller vid trubbig C: ner till basens
 * förlängning) från A, och är exakt A:s y-koordinat: h = b·sinC.
 *
 * Tre steg:
 *   1. Höjden fälls upp — gissa-först (spetsig/rät/trubbig ger störst area?).
 *                          Dra hörnet A (eller C-glidaren): höjden h = b·sinC
 *                          ritas som streckat lod ner till basen (eller dess
 *                          streckade förlängning vid trubbig C), med
 *                          rät-vinkel-symbol vid lodets fot. Arean skuggas.
 *   2. Kurvan är en sinus — T(C) för C 0°–180° ritas som en sinusbåge,
 *                          skalad med ab/2. En punkt följer aktuell vinkel
 *                          live; max markerad vid 90°. "Svep vinkeln"-knapp.
 *   3. Använd satsen      — snabbknappar spelar upp genomgångens Exempel 1
 *                          (a=11, b=8, C=80° ⟹ T≈43,3 cm²) och Exempel 2
 *                          (a=4,0, b=12,0, T=10 cm² ⟹ C₁≈25° eller C₂≈155°,
 *                          samma area — sinuskurvans symmetri om 90°).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma3c-6.7.js). API: window.VISUALISERINGAR['ma3c-6.5'].
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
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    // Text med kursiva variabler: delar märkta med * kursiveras.
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
    function svgText(attrs, text) {
        var el = svgEl('text', attrs);
        el.textContent = text;
        return el;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Pixel-vektorhjälp ───────────────────────────────────────────────
    function subv(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
    function normv(v) { var L = Math.sqrt(v[0] * v[0] + v[1] * v[1]) || 1; return [v[0] / L, v[1] / L]; }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        a: '#2563c9',          // sidan a — blå
        b: '#7c5cbf',          // sidan b — lila
        h: '#c1622c',          // höjden h — orange
        area: '#3f8f5c',       // arean T — grön
        areaFill: 'rgba(63,143,92,0.16)',
        marker: '#c8324a'      // aktuell punkt i grafen — röd
    };

    // ── Genomgångens Exempel 2 (a=4,0, b=12,0, T=10 cm² ⟹ C) ─────────────
    var EX2_T = 10, EX2_A = 4, EX2_B = 12;
    var EX2_SINC = (2 * EX2_T) / (EX2_A * EX2_B);
    var EX2_C1 = Math.asin(EX2_SINC) * 180 / Math.PI;   // ≈ 24,624°
    var EX2_C2 = 180 - EX2_C1;                          // ≈ 155,376°

    var W = 560, H = 380;
    var W2 = 560, H2 = 230, L2 = 46, R2 = 20, T2 = 18, B2 = 40;
    var PW2 = W2 - L2 - R2, PH2 = H2 - T2 - B2;

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var A_MIN = 2, A_MAX = 14, A_STEP = 1;
        var B_MIN = 2, B_MAX = 14, B_STEP = 1;
        var ANG_MIN = 10, ANG_MAX = 170, ANG_STEP = 1;
        var state = { step: 1, a: 6, b: 5, angleC: 60, guess: null };

        // ── Geometri: C i origo, a = CB vågrät bas, b = CA mot spetsen A ──
        // Höjden mot basen a är då exakt A:s y-koordinat: h = b·sinC.
        // P = höjdens fot på basens (ev. förlängda) linje.
        function triangleGeom(a, b, angleCdeg) {
            var rad = angleCdeg * Math.PI / 180;
            var C = [0, 0];
            var B = [a, 0];
            var A = [b * Math.cos(rad), b * Math.sin(rad)];
            var P = [b * Math.cos(rad), 0];
            var c = Math.sqrt((A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]));
            return { A: A, B: B, C: C, P: P, h: A[1], c: c };
        }

        function computeAll() {
            var a = state.a, b = state.b, angleC = state.angleC;
            var g = triangleGeom(a, b, angleC);
            var T = a * b * Math.sin(angleC * Math.PI / 180) / 2;
            var Tmax = a * b / 2;
            var isMax = Math.abs(angleC - 90) < 0.3;
            return { a: a, b: b, angleC: angleC, h: g.h, c: g.c, T: T, Tmax: Tmax, isMax: isMax, geom: g };
        }

        // ── Anpassa world-rum till pixelruta ────────────────────────────
        function makeFit(points, boxX, boxY, boxW, boxH, marginPx) {
            var xs = points.map(function (p) { return p[0]; });
            var ys = points.map(function (p) { return p[1]; });
            var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
            var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
            var w = Math.max(xmax - xmin, 1e-6), h = Math.max(ymax - ymin, 1e-6);
            var availW = boxW - 2 * marginPx, availH = boxH - 2 * marginPx;
            var scale = Math.min(availW / w, availH / h);
            var cx = (xmin + xmax) / 2, cy = (ymin + ymax) / 2;
            var pcx = boxX + boxW / 2, pcy = boxY + boxH / 2;
            return {
                scale: scale,
                toPx: function (pt) { return [pcx + (pt[0] - cx) * scale, pcy - (pt[1] - cy) * scale]; }
            };
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Areasatsen — höjden fälls upp';
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
            'aria-label': 'Interaktiv triangel ABC med vågrät bas a och sidan b ' +
                'från hörnet C. Höjden mot basen ritas som ett streckat lod från ' +
                'spetsen A. Dra i hörnet A eller vinkelglidaren för C.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var graphHeading = document.createElement('div');
        graphHeading.style.fontSize = '13px';
        graphHeading.style.fontWeight = '600';
        graphHeading.style.color = COL.inkSoft;
        graphHeading.style.margin = '12px 2px 4px';
        graphHeading.textContent = 'Arean T som funktion av vinkeln C';
        card.appendChild(graphHeading);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Graf över arean T som funktion av vinkeln C mellan 0 ' +
                'och 180 grader — en sinuskurva skalad med ab genom två, med max ' +
                'vid 90 grader. En punkt visar aktuell vinkel.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        card.appendChild(formelB);

        var formelC = document.createElement('div');
        formelC.className = 'lab-vis-formel';
        card.appendChild(formelC);

        var formelD = document.createElement('div');
        formelD.className = 'lab-vis-formel';
        card.appendChild(formelD);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Höjden fälls upp' },
            { n: 2, label: '2 · Kurvan är en sinus' },
            { n: 3, label: '3 · Använd satsen' }
        ];
        var INSTR = {
            1: 'Höjden mot basen <em>a</em> är <em>h</em> = <em>b</em>·sin<em>C</em> — den ' +
               '"fälls upp" när vinkeln <em>C</em> växer. Gissa <strong>innan</strong> du ' +
               'drar: vilken sorts vinkel ger den STÖRSTA arean? Dra sedan i hörnet ' +
               '<em>A</em> (eller <em>C</em>-glidaren) och se höjden och den skuggade ' +
               'arean ändras.',
            2: 'Arean som funktion av vinkeln <em>C</em> ritas nedan — en hel sinuskurva! ' +
               'Punkten på kurvan följer vinkeln du drar i triangeln ovan. Testa ' +
               '"Svep vinkeln" eller dra själv mot 0°, 90° och 180°.',
            3: 'Två exempel från genomgången: tryck på en knapp för lösningen steg för ' +
               'steg. Exempel 2 visar att <strong>två</strong> olika vinklar ger exakt ' +
               'samma area — precis symmetrin i sinuskurvan från steg 2.'
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
        function legendItem(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return span;
        }
        legend.appendChild(legendItem(COL.a, '<em>a</em> (bas)'));
        legend.appendChild(legendItem(COL.b, '<em>b</em>'));
        legend.appendChild(legendItem(COL.h, '<em>h</em> = <em>b</em>sin<em>C</em>'));
        legend.appendChild(legendItem(COL.area, '<em>T</em> (area)'));

        // ── Gissa-först (steg 1) ─────────────────────────────────────────
        var guessAcute = document.createElement('button');
        guessAcute.type = 'button';
        guessAcute.className = 'lab-btn';
        guessAcute.textContent = 'Spetsig vinkel (< 90°)';
        guessAcute.addEventListener('click', function () { state.guess = 'spetsig'; update(); });
        actions.appendChild(guessAcute);

        var guess90 = document.createElement('button');
        guess90.type = 'button';
        guess90.className = 'lab-btn';
        guess90.textContent = 'Exakt 90°';
        guess90.addEventListener('click', function () { state.guess = '90'; update(); });
        actions.appendChild(guess90);

        var guessObtuse = document.createElement('button');
        guessObtuse.type = 'button';
        guessObtuse.className = 'lab-btn';
        guessObtuse.textContent = 'Trubbig vinkel (> 90°)';
        guessObtuse.addEventListener('click', function () { state.guess = 'trubbig'; update(); });
        actions.appendChild(guessObtuse);

        // ── Svep vinkeln (steg 2) ─────────────────────────────────────────
        var sweepBtn = document.createElement('button');
        sweepBtn.type = 'button';
        sweepBtn.className = 'lab-btn';
        sweepBtn.textContent = 'Svep vinkeln C';
        sweepBtn.addEventListener('click', function () { startSweep(); });
        actions.appendChild(sweepBtn);

        // ── Exempel (steg 3) ─────────────────────────────────────────────
        var ex1Btn = document.createElement('button');
        ex1Btn.type = 'button';
        ex1Btn.className = 'lab-btn';
        ex1Btn.textContent = 'Exempel 1: a = 11, b = 8, C = 80°';
        ex1Btn.addEventListener('click', function () {
            stopDrag(); stopSweep();
            state.a = 11; state.b = 8; state.angleC = 80;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        actions.appendChild(ex1Btn);

        var ex2aBtn = document.createElement('button');
        ex2aBtn.type = 'button';
        ex2aBtn.className = 'lab-btn';
        ex2aBtn.textContent = 'Exempel 2: C₁ ≈ 25°';
        ex2aBtn.addEventListener('click', function () {
            stopDrag(); stopSweep();
            state.a = EX2_A; state.b = EX2_B; state.angleC = EX2_C1;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        actions.appendChild(ex2aBtn);

        var ex2bBtn = document.createElement('button');
        ex2bBtn.type = 'button';
        ex2bBtn.className = 'lab-btn';
        ex2bBtn.textContent = 'Exempel 2: C₂ ≈ 155°';
        ex2bBtn.addEventListener('click', function () {
            stopDrag(); stopSweep();
            state.a = EX2_A; state.b = EX2_B; state.angleC = EX2_C2;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        actions.appendChild(ex2bBtn);

        // ── Glidare ───────────────────────────────────────────────────────
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
                stopDrag(); stopSweep();
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
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; }, function (v) { state.a = v; });
        var rowB = makeRow('b', B_MIN, B_MAX, B_STEP,
            function () { return state.b; }, function (v) { state.b = v; });
        var rowAngle = makeRow('vinkeln C', ANG_MIN, ANG_MAX, ANG_STEP,
            function () { return state.angleC; }, function (v) { state.angleC = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopDrag(); stopSweep();
            state.a = 6; state.b = 5; state.angleC = 60; state.guess = null;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Svepanimation (steg 2) ───────────────────────────────────────
        var sweepId = null;
        function stopSweep() { if (sweepId != null) { cancelAnimationFrame(sweepId); sweepId = null; } }
        function startSweep() {
            stopDrag(); stopSweep();
            var t0 = null, T_MS = 3200;
            var from = ANG_MIN, to = ANG_MAX;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.angleC = from + (to - from) * p;
                rowAngle.sync();
                update();
                if (p < 1) sweepId = requestAnimationFrame(frame);
                else sweepId = null;
            }
            sweepId = requestAnimationFrame(frame);
        }

        // ── Dragbart hörn A i triangelscenen (ändrar vinkeln C) ────────────
        var draggingAngle = false;
        var lastCpx = null, lastBpx = null;
        function stopDrag() { draggingAngle = false; }
        function toSvgPt(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return [(clientX - r.left) * W / r.width, (clientY - r.top) * H / r.height];
        }
        function angleBetweenPx(v1, v2) {
            var a1 = Math.atan2(v1[1], v1[0]), a2 = Math.atan2(v2[1], v2[0]);
            var diff = a2 - a1;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            while (diff < -Math.PI) diff += 2 * Math.PI;
            return Math.abs(diff) * 180 / Math.PI;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!draggingAngle || !lastCpx || !lastBpx) return;
            var pt = toSvgPt(e.clientX, e.clientY);
            var newAngle = angleBetweenPx(subv(lastBpx, lastCpx), subv(pt, lastCpx));
            state.angleC = clampNum(Math.round(newAngle / ANG_STEP) * ANG_STEP, ANG_MIN, ANG_MAX);
            rowAngle.sync();
            update();
        });
        svg.addEventListener('pointerup', stopDrag);
        svg.addEventListener('pointercancel', stopDrag);

        // ── Vinkelmarkör vid C: rät-vinkel-symbol eller båge + gradtal ──────
        // Returnerar textetikettens pixelposition (för kollisionskontroll med
        // area-etiketten T), eller null när ingen text ritas (rät vinkel).
        function drawAngleMarker(Cpx, Bpx, Apx, angleC) {
            var bDir = normv(subv(Bpx, Cpx));
            var aDir = normv(subv(Apx, Cpx));
            if (Math.abs(angleC - 90) < 0.4) {
                var s = 14;
                var p1 = [Cpx[0] + bDir[0] * s, Cpx[1] + bDir[1] * s];
                var p3 = [Cpx[0] + aDir[0] * s, Cpx[1] + aDir[1] * s];
                var p2 = [p1[0] + aDir[0] * s, p1[1] + aDir[1] * s];
                svg.appendChild(svgEl('polyline', {
                    points: p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' +
                        p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + ' ' +
                        p3[0].toFixed(1) + ',' + p3[1].toFixed(1),
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.4
                }));
                return null;
            } else {
                var rArc = 26;
                var q1 = [Cpx[0] + bDir[0] * rArc, Cpx[1] + bDir[1] * rArc];
                var q2 = [Cpx[0] + aDir[0] * rArc, Cpx[1] + aDir[1] * rArc];
                var ang1 = Math.atan2(bDir[1], bDir[0]), ang2 = Math.atan2(aDir[1], aDir[0]);
                var diff = ang2 - ang1;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                var sweep = diff > 0 ? 1 : 0;
                var d = 'M ' + q1[0].toFixed(1) + ' ' + q1[1].toFixed(1) + ' A ' + rArc + ' ' + rArc +
                    ' 0 0 ' + sweep + ' ' + q2[0].toFixed(1) + ' ' + q2[1].toFixed(1);
                svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));
                var bisAng = ang1 + diff / 2;
                var lr = rArc + 16;
                var lx = Cpx[0] + Math.cos(bisAng) * lr, ly = Cpx[1] + Math.sin(bisAng) * lr;
                svg.appendChild(svgText(
                    { x: lx, y: ly + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink },
                    fmt(angleC, 0) + '°'));
                return [lx, ly];
            }
        }

        // ── Sid- och hörnetiketter (fri yta, offsettade vinkelrätt/bisektris) ──
        function placeSide(letter, val, p1, p2, other, color) {
            var edge = subv(p2, p1);
            var n = normv([edge[1], -edge[0]]);
            var mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
            var toOther = subv(other, mid);
            if (n[0] * toOther[0] + n[1] * toOther[1] > 0) n = [-n[0], -n[1]];
            var lx = mid[0] + n[0] * 24, ly = mid[1] + n[1] * 24;
            svg.appendChild(svgVarText(
                { x: lx, y: ly + 4, 'font-size': 13.5, 'text-anchor': 'middle', fill: color },
                ['*' + letter, ' = ' + fmt(val, 0)]));
        }
        // Vinkelrätt avstånd från punkt till linjen genom p1,p2 (för att
        // hålla area-etiketten borta från trianglens kanter).
        function distToLine(pt, p1, p2) {
            var ex = p2[0] - p1[0], ey = p2[1] - p1[1];
            var len = Math.sqrt(ex * ex + ey * ey) || 1;
            var nx = ey / len, ny = -ex / len;
            return Math.abs((pt[0] - p1[0]) * nx + (pt[1] - p1[1]) * ny);
        }
        function placeVertex(letter, p, other1, other2) {
            var d1 = normv(subv(other1, p)), d2 = normv(subv(other2, p));
            var bis = normv([d1[0] + d2[0], d1[1] + d2[1]]);
            var lx = p[0] - bis[0] * 22, ly = p[1] - bis[1] * 22;
            svg.appendChild(svgText(
                { x: lx, y: ly + 5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.ink }, letter));
        }

        // ── Rita triangelscenen ─────────────────────────────────────────
        function drawTriangleScene(calc) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = calc.a, angleC = calc.angleC, g = calc.geom;
            var fit = makeFit([g.A, g.B, g.C, g.P], 0, 0, W, H, 58);
            var Apx = fit.toPx(g.A), Bpx = fit.toPx(g.B), Cpx = fit.toPx(g.C), Ppx = fit.toPx(g.P);

            // Arean skuggad (ljus grön fyllning)
            svg.appendChild(svgEl('polygon', {
                points: Apx[0].toFixed(1) + ',' + Apx[1].toFixed(1) + ' ' +
                    Bpx[0].toFixed(1) + ',' + Bpx[1].toFixed(1) + ' ' +
                    Cpx[0].toFixed(1) + ',' + Cpx[1].toFixed(1),
                fill: COL.areaFill, stroke: COL.ink, 'stroke-width': 2
            }));

            // Basens förlängning (streckad) om höjdens fot hamnar utanför CB
            var footWorldX = g.P[0];
            // Vid C ≈ 90° faller foten exakt i C — höjden sammanfaller då med
            // sidan b (som redan ritas som triangelkant), så det streckade
            // lodet och dess etikett hoppas över (annars dubbla, överlappande
            // etiketter "b" och "h" på samma linje).
            var nearRight = Math.abs(angleC - 90) < 2;
            if (footWorldX < -1e-6) {
                svg.appendChild(svgEl('line', {
                    x1: Cpx[0], y1: Cpx[1], x2: Ppx[0], y2: Ppx[1],
                    stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
            } else if (footWorldX > a + 1e-6) {
                svg.appendChild(svgEl('line', {
                    x1: Bpx[0], y1: Bpx[1], x2: Ppx[0], y2: Ppx[1],
                    stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
            }

            if (!nearRight) {
                // Höjden — streckat lod från spetsen A ner till foten P
                svg.appendChild(svgEl('line', {
                    x1: Apx[0], y1: Apx[1], x2: Ppx[0], y2: Ppx[1],
                    stroke: COL.h, 'stroke-width': 1.8, 'stroke-dasharray': '6 4'
                }));
            }

            // Rät-vinkel-symbol vid höjdens fot (utelämnas nära 90°, då C:s
            // egen rät-vinkel-symbol redan sitter på exakt samma plats)
            if (!nearRight) {
                var dxSign = footWorldX < -1e-6 ? 1 : (footWorldX > a + 1e-6 ? -1 : 1);
                var sMark = 11;
                var mp1 = [Ppx[0], Ppx[1] - sMark];
                var mp3 = [Ppx[0] + dxSign * sMark, Ppx[1]];
                var mp2 = [mp1[0] + dxSign * sMark, mp1[1]];
                svg.appendChild(svgEl('polyline', {
                    points: mp1[0].toFixed(1) + ',' + mp1[1].toFixed(1) + ' ' +
                        mp2[0].toFixed(1) + ',' + mp2[1].toFixed(1) + ' ' +
                        mp3[0].toFixed(1) + ',' + mp3[1].toFixed(1),
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.3
                }));
            }

            var angleLabelPos = drawAngleMarker(Cpx, Bpx, Apx, angleC);

            // Hörnetiketter
            placeVertex('A', Apx, Bpx, Cpx);
            placeVertex('B', Bpx, Apx, Cpx);
            placeVertex('C', Cpx, Apx, Bpx);

            // Sidetiketter a (bas) och b
            placeSide('a', calc.a, Bpx, Cpx, Apx, COL.a);
            placeSide('b', calc.b, Cpx, Apx, Bpx, COL.b);

            // Höjdetikett — på den sida av lodlinjen där det är fri yta.
            // Placerad nära SPETSEN (72 % upp), inte vid mitten: sidan b:s
            // etikett sitter alltid på sin egen mittpunkt, som (eftersom
            // både C och P ligger på baslinjen) råkar hamna på EXAKT samma
            // höjd som lodlinjens mittpunkt — särskilt vid branta b (C nära
            // 90°) skulle b- och h-etiketterna annars hamna på samma rad.
            // Triangelns tyngdpunkt (där T-etiketten oftast sitter) ligger
            // alltid på 1/3 av höjden — 72 % ligger tydligt ovanför den zonen.
            if (!nearRight) {
                var hSide = (Bpx[0] > Ppx[0]) ? -1 : 1;
                var hLabelY = Ppx[1] + (Apx[1] - Ppx[1]) * 0.72;
                svg.appendChild(svgVarText(
                    {
                        x: Ppx[0] + hSide * 8, y: hLabelY + 4,
                        'font-size': 13, 'text-anchor': hSide < 0 ? 'end' : 'start', fill: COL.h
                    },
                    ['*h', ' = ' + fmt(calc.h, 1)]));
            }

            // Arean T — normalt i triangelns tyngdpunkt, men om den punkten
            // hamnar för nära vinkeletiketten vid C (smala/trubbiga
            // trianglar) eller triangeln är för låg: flytta etiketten till
            // fri yta ovanför hela figuren i stället.
            var pxHeight = Math.abs(Apx[1] - Ppx[1]);
            var centroidPos = [(Apx[0] + Bpx[0] + Cpx[0]) / 3, (Apx[1] + Bpx[1] + Cpx[1]) / 3 + 4];
            var tooCloseToAngle = angleLabelPos &&
                Math.pow(centroidPos[0] - angleLabelPos[0], 2) + Math.pow(centroidPos[1] - angleLabelPos[1], 2) < 55 * 55;
            var tooCloseToEdge = distToLine(centroidPos, Cpx, Apx) < 20 || distToLine(centroidPos, Apx, Bpx) < 20;
            var Tpos;
            if (pxHeight > 42 && !tooCloseToAngle && !tooCloseToEdge) {
                Tpos = centroidPos;
            } else {
                var bxs = [Apx[0], Bpx[0], Cpx[0], Ppx[0]], bys = [Apx[1], Bpx[1], Cpx[1], Ppx[1]];
                var bboxMinX = Math.min.apply(null, bxs), bboxMaxX = Math.max.apply(null, bxs);
                var bboxMinY = Math.min.apply(null, bys);
                Tpos = [(bboxMinX + bboxMaxX) / 2, Math.max(bboxMinY - 20, 16)];
            }
            svg.appendChild(svgVarText(
                { x: Tpos[0], y: Tpos[1], 'font-size': 13, 'text-anchor': 'middle', fill: COL.area },
                ['*T', ' = ' + fmt(calc.T, 1) + ' a.e.']));

            // Dragbart hörn A
            lastCpx = Cpx; lastBpx = Bpx;
            svg.appendChild(svgEl('circle', { cx: Apx[0], cy: Apx[1], r: 4.5, fill: COL.ink }));
            var hit = svgEl('circle', { cx: Apx[0], cy: Apx[1], r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopSweep(); stopDrag(); draggingAngle = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
            svg.appendChild(svgEl('circle', { cx: Bpx[0], cy: Bpx[1], r: 3, fill: COL.ink }));
            svg.appendChild(svgEl('circle', { cx: Cpx[0], cy: Cpx[1], r: 3, fill: COL.ink }));
        }

        // ── Rita grafscenen: T(C) för C mellan 0° och 180° ──────────────
        function drawGraphScene(calc) {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var domainMax = Math.max(calc.Tmax * 1.18, 1);
            function X2(deg) { return L2 + deg / 180 * PW2; }
            function Y2(v) { return T2 + (domainMax - v) / domainMax * PH2; }
            var baseline = Y2(0);
            var i;

            // Rutnät
            for (i = 0; i <= 180; i += 30) {
                svg2.appendChild(svgEl('line', {
                    x1: X2(i), y1: T2, x2: X2(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1
                }));
            }
            var ySteps = 4;
            for (i = 1; i <= ySteps; i++) {
                var v = domainMax * i / ySteps;
                svg2.appendChild(svgEl('line', {
                    x1: L2, y1: Y2(v), x2: L2 + PW2, y2: Y2(v), stroke: COL.grid, 'stroke-width': 1
                }));
            }

            // Axlar med pilspetsar
            svg2.appendChild(svgEl('line', { x1: L2, y1: baseline, x2: L2 + PW2 + 6, y2: baseline, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L2 + PW2 + 14) + ',' + baseline + ' ' + (L2 + PW2 + 4) + ',' + (baseline - 4.5) + ' ' + (L2 + PW2 + 4) + ',' + (baseline + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: L2, y1: T2 + PH2, x2: L2, y2: T2 - 4, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: L2 + ',' + (T2 - 12) + ' ' + (L2 - 4.5) + ',' + (T2 - 2) + ' ' + (L2 + 4.5) + ',' + (T2 - 2), fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: W2 - 4, y: baseline + 17, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*C', ' (°)']));
            svg2.appendChild(svgVarText({ x: L2 + 8, y: T2 - 6, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*T', ' (a.e.)']));

            // Tick-etiketter
            for (i = 0; i <= 180; i += 30) {
                if (i === 180) continue; // krockar med C(°)-axeletiketten vid kanten
                svg2.appendChild(svgText({ x: X2(i), y: baseline + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, String(i)));
            }
            for (i = 1; i <= ySteps; i++) {
                var vv = domainMax * i / ySteps;
                svg2.appendChild(svgText({ x: L2 - 6, y: Y2(vv) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, fmt(vv, 0)));
            }

            // Kurvan T(C) = ab·sinC/2, C i grader 0–180
            var d = '', N = 180;
            for (i = 0; i <= N; i++) {
                var deg = 180 * i / N;
                var Tv = calc.a * calc.b * Math.sin(deg * Math.PI / 180) / 2;
                d += (i === 0 ? 'M' : 'L') + X2(deg).toFixed(1) + ' ' + Y2(Tv).toFixed(1) + ' ';
            }
            svg2.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.area, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));

            // Maxmarkering vid 90°
            svg2.appendChild(svgEl('line', {
                x1: X2(90), y1: baseline, x2: X2(90), y2: Y2(calc.Tmax),
                stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
            }));
            svg2.appendChild(svgEl('line', {
                x1: L2, y1: Y2(calc.Tmax), x2: X2(90), y2: Y2(calc.Tmax),
                stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
            }));
            svg2.appendChild(svgEl('circle', { cx: X2(90), cy: Y2(calc.Tmax), r: 3, fill: COL.ink }));
            svg2.appendChild(svgVarText(
                { x: X2(90) + 8, y: Y2(calc.Tmax) - 8, 'font-size': 12, 'text-anchor': 'start', fill: COL.inkSoft },
                ['*T', 'max = ', '*ab', '/2 = ' + fmt(calc.Tmax, 1)]));

            // Kollaps-noteringar nära ändarna
            svg2.appendChild(svgText(
                { x: X2(10), y: Y2(domainMax * 0.1), 'font-size': 11, 'text-anchor': 'start', fill: COL.inkSoft },
                'T → 0'));
            svg2.appendChild(svgText(
                { x: X2(170), y: Y2(domainMax * 0.1), 'font-size': 11, 'text-anchor': 'end', fill: COL.inkSoft },
                'T → 0'));

            // Aktuell punkt
            var curDeg = clampNum(calc.angleC, 0, 180);
            svg2.appendChild(svgEl('circle', { cx: X2(curDeg), cy: Y2(calc.T), r: 4.5, fill: COL.marker }));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas(calc) {
            var aT = fmtTex(calc.a, 0), bT = fmtTex(calc.b, 0), angT = fmtTex(calc.angleC, 0);
            var TT = fmtTex(calc.T, 1), TmaxT = fmtTex(calc.Tmax, 1), hT = fmtTex(calc.h, 1);

            katexInto(formelA, 'T = \\dfrac{\\textcolor{' + COL.a + '}{a}\\,\\textcolor{' + COL.b + '}{b}\\sin C}{2}');
            formelC.style.display = 'none';
            formelD.style.display = 'none';

            if (state.step === 1) {
                katexInto(formelB, 'T = \\dfrac{' + aT + '\\cdot ' + bT + '\\sin ' + angT + '^\\circ}{2} \\approx ' + TT + '\\ \\text{a.e.}');
                var guessMsg = '';
                if (state.guess) {
                    guessMsg = state.guess === '90' ? 'Rätt! ' : 'Pröva igen: dra vinkeln mot 90° och jämför höjden. ';
                }
                var stateMsg;
                if (calc.isMax) {
                    stateMsg = 'Vinkeln är exakt 90°: höjden <em>h</em> är nu lika lång som sidan <em>b</em>, och arean är som störst — <em>T</em> = <em>ab</em>/2 = ' + fmt(calc.Tmax, 1) + ' a.e.';
                } else if (calc.angleC < 90) {
                    stateMsg = 'Vinkeln är spetsig: höjden <em>h</em> ≈ ' + fmt(calc.h, 1) + ' är kortare än <em>b</em> = ' + fmt(calc.b, 0) + ', eftersom sin<em>C</em> &lt; 1.';
                } else {
                    stateMsg = 'Vinkeln är trubbig: höjden <em>h</em> ≈ ' + fmt(calc.h, 1) + ' är fortfarande kortare än <em>b</em> — samma höjd som vid vinkeln 180° − <em>C</em> ≈ ' + fmt(180 - calc.angleC, 0) + '°, eftersom sin<em>C</em> = sin(180° − <em>C</em>).';
                }
                note.innerHTML = guessMsg + stateMsg;
            } else if (state.step === 2) {
                katexInto(formelB, 'T(' + angT + '^\\circ) = \\dfrac{' + aT + '\\cdot ' + bT + '\\sin ' + angT + '^\\circ}{2} \\approx ' + TT + '\\ \\text{a.e.}');
                var pct = calc.Tmax > 0 ? Math.round(calc.T / calc.Tmax * 100) : 0;
                note.innerHTML = 'Kurvan <em>T</em>(<em>C</em>) är en sinuskurva skalad med <em>ab</em>/2 = ' + fmt(calc.Tmax, 1) +
                    ' a.e. Just nu, vid <em>C</em> = ' + fmt(calc.angleC, 0) + '°, är <em>T</em> ≈ ' + fmt(calc.T, 1) +
                    ' a.e. — ' + pct + ' % av maxarean. Vid <em>C</em> = 0° eller 180° kollapsar triangeln (<em>T</em> → 0).';
            } else {
                var isEx1 = calc.a === 11 && calc.b === 8 && Math.abs(calc.angleC - 80) < 0.01;
                var isEx2a = calc.a === EX2_A && calc.b === EX2_B && Math.abs(calc.angleC - EX2_C1) < 0.05;
                var isEx2b = calc.a === EX2_A && calc.b === EX2_B && Math.abs(calc.angleC - EX2_C2) < 0.05;
                if (isEx1) {
                    katexInto(formelB, 'T = \\dfrac{a\\,b\\sin C}{2} = \\dfrac{11\\cdot 8\\sin 80^\\circ}{2} \\approx 43{,}331\\ldots \\approx 43{,}3\\ \\text{cm}^2');
                    note.innerHTML = 'Genomgångens Exempel 1 — den kända vinkeln kallas där <em>A</em> (mellanliggande till sidorna 11 cm och 8 cm). Här heter samma mellanliggande vinkel <em>C</em>, men det är exakt samma formel och samma tal.';
                } else if (isEx2a || isEx2b) {
                    katexInto(formelB, '10 = \\dfrac{4{,}0\\cdot 12{,}0\\sin C}{2} \\iff \\sin C = \\dfrac{2\\cdot 10}{4{,}0\\cdot 12{,}0} = 0{,}416\\ldots');
                    katexInto(formelC, 'C_1 = \\sin^{-1}(0{,}416\\ldots) \\approx 24{,}624\\ldots^\\circ \\approx 25^\\circ');
                    katexInto(formelD, 'C_2 = 180^\\circ - C_1 \\approx 180^\\circ - 25^\\circ = 155^\\circ');
                    formelC.style.display = '';
                    formelD.style.display = '';
                    note.innerHTML = isEx2a
                        ? 'Denna triangel visar den spetsiga lösningen <em>C</em>₁ ≈ 25°.'
                        : 'Denna triangel visar den trubbiga lösningen <em>C</em>₂ ≈ 155°. Båda vinklarna ger <strong>exakt samma area</strong>, 10 cm² — precis den symmetri i sinuskurvan som steg 2 visade (sin<em>C</em> = sin(180° − <em>C</em>)).';
                } else {
                    katexInto(formelB, 'T = \\dfrac{' + aT + '\\cdot ' + bT + '\\sin ' + angT + '^\\circ}{2} \\approx ' + TT + '\\ \\text{a.e.}');
                    note.innerHTML = 'Tryck på en av exempel-knapparna, eller experimentera med dina egna värden på <em>a</em>, <em>b</em> och vinkeln <em>C</em>.';
                }
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            var calc = computeAll();
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            guessAcute.style.display = state.step === 1 ? '' : 'none';
            guess90.style.display = state.step === 1 ? '' : 'none';
            guessObtuse.style.display = state.step === 1 ? '' : 'none';
            sweepBtn.style.display = state.step === 2 ? '' : 'none';
            ex1Btn.style.display = state.step === 3 ? '' : 'none';
            ex2aBtn.style.display = state.step === 3 ? '' : 'none';
            ex2bBtn.style.display = state.step === 3 ? '' : 'none';

            graphHeading.style.display = state.step >= 2 ? '' : 'none';
            scene2.style.display = state.step >= 2 ? '' : 'none';

            drawTriangleScene(calc);
            if (state.step >= 2) drawGraphScene(calc);
            updateFormulas(calc);
        }

        update();

        return {
            destroy: function () {
                stopDrag();
                stopSweep();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-6.5'] = api;
})();
