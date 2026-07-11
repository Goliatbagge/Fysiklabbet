/* ma3c-5.3.js — visualisering: "Riemann-kläm: arean under kurvan".
 * Hör till ma3c-5.3 (arean under en kurva) och ma4-3.2 (areaberäkning med
 * integraler).
 *
 * Kärninsikt: integralen är gränsvärdet av en summa av rektangelareor.
 * Vänstersumman approximerar arean med staplar; undersumman (grön) och
 * översumman (röd) klämmer in den exakta arean mellan sig, och när
 * antalet rektanglar n växer kan differensen mellan dem göras hur liten
 * som helst — gränsvärdet är integralen.
 *
 * Standardfunktionen f(x) = 0,25x² + 1 på [0, 4] ger exakt area 28/3
 * ≈ 9,33 a.e. (samma funktion som brief/uppgift föreslår, x²/4 skrivet
 * utan snedstreck som decimalkoefficient). Ett andra val,
 * f(x) = 0,5x + 2 på [2, 6], speglar Exempel 2 i ma3c-5.3.md (arean 16).
 * Båda funktionerna växer på sitt intervall, så vänstersumman är alltid
 * en undersumma och högersumman alltid en översumma — enhetlig
 * färgsemantik (grön = under, röd = över) genom alla tre stegen.
 *
 * Tre steg (lager):
 *   1. Rektanglarna     — vänstersumma som gröna staplar, n-glidare,
 *                         live-avläsning av summan. Gissa-först i instr.
 *   2. Över- och undersumma — undersumma (grön) OCH översumma (röd,
 *                         halvtransparent) samtidigt; två mätare:
 *                         under ≤ A ≤ över, samt differensen ΔS.
 *   3. Gränsvärdet      — integralnotation med exakt värde, exakt
 *                         skuggad area, och en "n → ∞"-knapp som kör n
 *                         upp mot 100 medan differensen rasar mot 0.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js/graf.js). API: window.VISUALISERINGAR['<id>'] =
 * { mount(el) → { destroy() } }.
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
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // kurvan f(x) — blå
        under: '#4a7d3a',      // undersumma / vänstersumma — grön
        over: '#c8324a',       // översumma — röd
        diff: '#9c6b12',       // differensen ΔS — amber, egen färg
        dash: 'rgba(31,37,48,0.45)',
        exactFill: 'rgba(37,99,201,0.14)'
    };
    var SUND = 'S_{\\text{under}}';
    var SOVER = 'S_{\\text{över}}';

    // ── Funktionsval ──────────────────────────────────────────────────
    var FUNCS = [
        {
            key: 'quad', a: 0, b: 4, exact: 28 / 3,
            f: function (x) { return 0.25 * x * x + 1; },
            legendHtml: '<em>f</em>(<em>x</em>) = 0,25<em>x</em><sup>2</sup> + 1',
            integrandTex: '\\left(0{,}25x^2+1\\right)'
        },
        {
            key: 'lineUp', a: 2, b: 6, exact: 16,
            f: function (x) { return 0.5 * x + 2; },
            legendHtml: '<em>f</em>(<em>x</em>) = 0,5<em>x</em> + 2',
            integrandTex: '\\left(0{,}5x+2\\right)'
        }
    ];

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var N_MIN = 1, N_MAX = 100, N_STEP = 1;
        var state = { step: 1, n: 8, funcIdx: 0 };
        var animId = null;
        function curFunc() { return FUNCS[state.funcIdx]; }

        // Vänster-/höger-/under-/översumma för aktuell funktion vid n.
        function computeSums(n) {
            var fn = curFunc(), a = fn.a, b = fn.b, dx = (b - a) / n;
            var leftSum = 0, underSum = 0, overSum = 0, bars = [];
            for (var i = 0; i < n; i++) {
                var x0 = a + i * dx, x1 = a + (i + 1) * dx;
                var f0 = fn.f(x0), f1 = fn.f(x1);
                var minH = Math.min(f0, f1), maxH = Math.max(f0, f1);
                leftSum += f0 * dx;
                underSum += minH * dx;
                overSum += maxH * dx;
                bars.push({ x0: x0, x1: x1, under: minH, over: maxH });
            }
            return { dx: dx, leftSum: leftSum, underSum: underSum, overSum: overSum, diff: overSum - underSum, bars: bars };
        }

        // ── Geometri ──────────────────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -0.6, XMAX = 7.6, YMIN = -0.6, YMAX = 6.4;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Riemann-kläm: arean under kurvan';
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
            'aria-label': 'Interaktiv graf: kurvan f(x) med rektanglar som ' +
                'approximerar arean mellan x lika med a och x lika med b. ' +
                'Dra i n-glidaren för att ändra antalet rektanglar.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        card.appendChild(formelB);

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

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Rektanglarna' },
            { n: 2, label: '2 · Över- och undersumma' },
            { n: 3, label: '3 · Gränsvärdet' }
        ];
        var INSTR = {
            1: 'Varje rektangel har bredden Δ<em>x</em> och höjden <em>f</em>(<em>x</em>) ' +
               'vid sin vänsterkant — tillsammans bildar de vänstersumman. ' +
               '<strong>Gissa arean under kurvan innan du börjar!</strong> Dra sedan i ' +
               '<em>n</em>-glidaren: fler och smalare rektanglar ger en bättre uppskattning.',
            2: 'Nu visas både undersumman (grön) och översumman (röd) samtidigt — ' +
               'röd sticker upp där en stapel missar kurvan. Undersumman är alltid för ' +
               'låg, översumman alltid för hög: den sanna arean ligger klämd mellan dem. ' +
               'Dra <em>n</em> och se glipan krympa.',
            3: 'Låt <em>n</em> gå mot 100 — glipan mellan under- och översumman krymper ' +
               'mot 0, och båda summorna klämmer in exakt samma tal. Det talet är ' +
               'integralens värde: den exakta arean under kurvan.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopAnim(); state.step = s.n; update(); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ────────────────────────────────────────────────────
        function legendItem(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return { el: span, txt: txt };
        }
        var legCurve = legendItem(COL.curve, curFunc().legendHtml);
        var legUnder = legendItem(COL.under, 'undersumma');
        var legOver = legendItem(COL.over, 'översumma');
        legend.appendChild(legCurve.el);
        legend.appendChild(legUnder.el);
        legend.appendChild(legOver.el);

        // ── Knapp: n → ∞ (steg 3) ────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Låt n → ∞';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        // ── Glidare: n ────────────────────────────────────────────────
        function makeRow(name, min, max, step, decimals, get, set) {
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
            field.setAttribute('inputmode', decimals > 0 ? 'decimal' : 'numeric');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + 'var(--lab-line-strong)' + ' ' + pct + '%, ' + 'var(--lab-line-strong)' + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(Math.round(v / step) * step, min, max));
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
        var rowN = makeRow('n', N_MIN, N_MAX, N_STEP, 0,
            function () { return state.n; },
            function (v) { state.n = v; });

        // ── Funktionsval (radioknappar) ──────────────────────────────
        var funcRow = document.createElement('div');
        funcRow.className = 'lab-graf-row';
        funcRow.style.flexWrap = 'wrap';
        funcRow.style.justifyContent = 'center';
        var funcRadios = [];
        FUNCS.forEach(function (fn, idx) {
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-check';
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'riemann-func-' + (uid);
            radio.checked = idx === state.funcIdx;
            radio.addEventListener('change', function () {
                if (!radio.checked) return;
                stopAnim();
                state.funcIdx = idx;
                legCurve.txt.innerHTML = curFunc().legendHtml;
                update();
            });
            lbl.appendChild(radio);
            var span = document.createElement('span');
            span.innerHTML = fn.legendHtml;
            lbl.appendChild(span);
            funcRow.appendChild(lbl);
            funcRadios.push(radio);
        });
        controls.appendChild(funcRow);
        uid++;

        // ── Återställ ─────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.step = 1; state.n = 8; state.funcIdx = 0;
            funcRadios.forEach(function (r, i) { r.checked = i === 0; });
            legCurve.txt.innerHTML = curFunc().legendHtml;
            rowN.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: n → 100 ────────────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var n0 = state.n >= N_MAX ? N_MIN : state.n;
            state.n = n0;
            var T_MS = 3000, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.n = Math.round(n0 + (N_MAX - n0) * p);
                rowN.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.n = N_MAX; rowN.sync(); update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Rita scenen ───────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (Math.random().toString(36).slice(2));
        function drawMain(s) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var fn = curFunc(), a = fn.a, b = fn.b;
            var axisY = Y(0), axisX = X(0);
            var i;

            // Rutnät
            for (i = 1; i <= 7; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 1; i <= 6; i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: T - 4, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 10) + ' ' + (axisX - 4.5) + ',' + T + ' ' + (axisX + 4.5) + ',' + T, fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (hoppa dem som krockar med a/b)
            for (i = 1; i <= 7; i++) {
                if (Math.abs(i - a) < 0.5 || Math.abs(i - b) < 0.5) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = 1; i <= 6; i++) {
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Exakt skuggad area (steg 3) — under kurvan, bakom staplarna
            if (state.step >= 3) {
                var d0 = 'M' + X(a).toFixed(1) + ' ' + axisY.toFixed(1) + ' ';
                var NP = 40;
                for (i = 0; i <= NP; i++) {
                    var xv = a + (b - a) * i / NP;
                    d0 += 'L' + X(xv).toFixed(1) + ' ' + Y(fn.f(xv)).toFixed(1) + ' ';
                }
                d0 += 'L' + X(b).toFixed(1) + ' ' + axisY.toFixed(1) + ' Z';
                g.appendChild(svgEl('path', { d: d0, fill: COL.exactFill, stroke: 'none' }));
            }

            // Översumma-staplar (röd) — under stapeln syns glipan mot undersumman
            if (state.step >= 2) {
                s.bars.forEach(function (bar) {
                    var x0 = X(bar.x0), x1 = X(bar.x1), yTop = Y(bar.over);
                    g.appendChild(svgEl('rect', {
                        x: x0, y: yTop, width: Math.max(0, x1 - x0), height: Math.max(0, axisY - yTop),
                        fill: 'rgba(200,50,74,0.28)', stroke: COL.over, 'stroke-width': 1
                    }));
                });
            }

            // Under-/vänstersumma-staplar (grön) — alltid synliga
            s.bars.forEach(function (bar) {
                var x0 = X(bar.x0), x1 = X(bar.x1), yTop = Y(bar.under);
                g.appendChild(svgEl('rect', {
                    x: x0, y: yTop, width: Math.max(0, x1 - x0), height: Math.max(0, axisY - yTop),
                    fill: 'rgba(74,125,58,0.32)', stroke: COL.under, 'stroke-width': 1
                }));
            });

            // Kurvan f(x)
            var d = '', penDown = false, N = 200;
            for (i = 0; i <= N; i++) {
                var xw = XMIN + (XMAX - XMIN) * i / N;
                var yw = fn.f(xw);
                if (yw <= YMAX + 6 && yw >= YMIN - 6) {
                    d += (penDown ? 'L' : 'M') + X(xw).toFixed(1) + ' ' + Y(yw).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Kurvetikett i fri yta strax till höger om b, nära axeln — där
            // varken kurvan (som ligger högt där) eller staplarna (som
            // slutar vid b) förekommer, oavsett vald funktion eller n.
            svg.appendChild(svgVarText(
                { x: X(b + 0.35), y: Y(1.0), 'font-size': 13, 'text-anchor': 'start', fill: COL.curve },
                ['*y', ' = ', '*f', '(', '*x', ')']));

            // Dashade gränslinjer vid a och b, upp till kurvan
            [a, b].forEach(function (bound) {
                var xp = X(bound), yp = Y(fn.f(bound));
                g.appendChild(svgEl('line', { x1: xp, y1: axisY, x2: xp, y2: yp, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            });

            // Tick-markeringar och etiketter för a och b
            [{ v: a, tag: '*a' }, { v: b, tag: '*b' }].forEach(function (o) {
                var xp = X(o.v);
                svg.appendChild(svgEl('line', { x1: xp, y1: axisY - 4, x2: xp, y2: axisY + 4, stroke: COL.axis, 'stroke-width': 1.3 }));
                svg.appendChild(svgVarText(
                    { x: xp, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                    [o.tag]));
            });
        }

        // ── Formler och texter ────────────────────────────────────────
        function updateFormulas(s) {
            var fn = curFunc(), n = state.n;
            var leftTex = fmtTex(s.leftSum, 2);
            var underTex = fmtTex(s.underSum, 2);
            var overTex = fmtTex(s.overSum, 2);
            var diffTex = fmtTex(s.diff, 2);

            if (state.step === 1) {
                formelA.style.color = COL.under;
                katexInto(formelA,
                    'S_n = \\sum_{i=0}^{' + (n - 1) + '} f(x_i)\\,\\Delta x \\approx ' +
                    leftTex + '\\ \\text{a.e.}');
            } else if (state.step === 2) {
                formelA.style.color = COL.axis;
                katexInto(formelA, underTex + '\\ \\text{a.e.} \\ \\le\\ A\\ \\le\\ ' + overTex + '\\ \\text{a.e.}');
                formelB.style.color = COL.diff;
                katexInto(formelB, '\\Delta S = ' + SOVER + ' - ' + SUND + ' = ' + diffTex + '\\ \\text{a.e.}');
            } else {
                var aStr = fmt(fn.a, 0), bStr = fmt(fn.b, 0), exactTex = fmtTex(fn.exact, 2);
                formelA.style.color = COL.curve;
                katexInto(formelA, '\\int_{' + aStr + '}^{' + bStr + '} ' + fn.integrandTex + '\\,dx = ' + exactTex);
                formelB.style.color = COL.diff;
                katexInto(formelB, '\\Delta S = ' + diffTex + '\\ \\text{a.e.}\\ \\xrightarrow{n\\,\\to\\,\\infty}\\ 0');
                note.innerHTML = '∫ är ett utdraget S — tecknet betyder <em>summa</em>. Både undersumman och ' +
                    'översumman krymper mot samma tal när <em>n</em> → ∞: det talet är integralens värde, ' +
                    'arean under kurvan.';
            }
        }

        // ── Visa/dölj per steg + omritning ─────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legOver.el.style.display = state.step >= 2 ? '' : 'none';
            formelB.style.display = state.step >= 2 ? '' : 'none';
            note.style.display = state.step === 3 ? '' : 'none';
            if (state.step !== 3) note.textContent = '';
            actions.style.display = state.step === 3 ? '' : 'none';

            var s = computeSums(state.n);
            drawMain(s);
            updateFormulas(s);
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
    window.VISUALISERINGAR['ma3c-5.3'] = api;
    window.VISUALISERINGAR['ma4-3.2'] = api;
})();
