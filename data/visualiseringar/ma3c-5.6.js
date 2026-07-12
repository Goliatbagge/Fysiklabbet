/* ma3c-5.6.js — visualisering: "Kurvor emellan — skannern" (arean mellan
 * två kurvor). Hör till ma3c-5.6 (Area mellan kurvor, Matematik 3c) och
 * ma4-3.4 (Arean mellan två kurvor, Matematik 4).
 *
 * Kärninsikt: arean mellan två kurvor är integralen av HÖJDSKILLNADEN
 * (övre − undre). Skärningspunkterna sätter gränserna, och korsar kurvorna
 * varandra INNE i intervallet måste integralen delas upp — annars tar
 * plus- och minusdelarna ut varandra (den klassiska "fällan").
 *
 * Två exempel (funktionerna är fritt valda, i samma anda som genomgångens
 * exempel 1/2 — parabel mot linje, skärningspunkter genom pq-formeln):
 *   A: f(x) = 4 − x²/2 (parabel), g(x) = x/2 + 1 (linje).
 *      Skär vid x = −3 och x = 2, f > g i hela intervallet → arean är
 *      en enda integral. Area = 125/12 ≈ 10,42 a.e.
 *   B: f(x) = −0,5x² + 2x + 1, g(x) = −0,5x + 3, skannat på x ∈ [2, 6].
 *      Kurvorna korsar varandra INNE i intervallet vid x = 4 — den naiva
 *      integralen över hela [2,6] blandar plus- och minusarea och ger
 *      −8/3 (omöjligt, negativ area!). Rätt svar (uppdelat vid x = 4)
 *      är 5/3 + 13/3 = 6 a.e.
 *
 * Tre steg (lager):
 *   1. Skannern    — dragbar lodrät linje, stapel mellan kurvorna med
 *                    live höjd f(x) − g(x); arean målas upp bakom skannern.
 *   2. Integralen  — KaTeX-uppställning med exakta gränser och areavärde;
 *                    "Skanna hela" sveper skannern och räknar upp arean.
 *   3. Korsningen — fällan — nytt funktionspar som korsar varandra i
 *                    intervallet; naiv integral (fel, kan bli negativ)
 *                    jämförs med rätt uppdelad beräkning.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js). API: window.VISUALISERINGAR['<id>'] = { mount(el) }.
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

    // ── Färger (samma familj som graf.js/teorifigurerna) ─────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // f(x) — blå
        secant: '#4a7d3a',     // g(x) och positiv area (f > g) — grön
        tangent: '#c8324a',    // vänd area (g > f) och "fel" — accentröd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        handle: 'rgba(15,22,32,0.62)'
    };

    // ── Dataset A: ingen korsning inne i intervallet ──────────────────────
    var A_LO = -3, A_HI = 2;
    function fA(x) { return 4 - x * x / 2; }
    function gA(x) { return x / 2 + 1; }
    function IA(x) { return 3 * x - x * x * x / 6 - x * x / 4; } // ∫(f−g)dx
    var A_AREA = IA(A_HI) - IA(A_LO); // 125/12 ≈ 10,41667

    var DATASET_A = {
        key: 'A', f: fA, g: gA, antideriv: IA,
        a: A_LO, b: A_HI, bounds: [A_LO, A_HI], trueCrossings: [A_LO, A_HI],
        XMIN: -3.6, XMAX: 2.6, YMIN: -3.2, YMAX: 4.8,
        xTickStep: 1, yTickStep: 1,
        legendF: '4 − <em>x</em>²/2', legendG: '<em>x</em>/2 + 1'
    };

    // ── Dataset B: kurvorna korsar varandra vid x = 4, skannat på [2, 6] ──
    var B_LO = 2, B_HI = 6, B_CROSS = 4;
    function fB(x) { return -0.5 * x * x + 2 * x + 1; }
    function gB(x) { return -0.5 * x + 3; }
    function IB(x) { return -x * x * x / 6 + 1.25 * x * x - 2 * x; } // ∫(f−g)dx
    var B_NAIVE = IB(B_HI) - IB(B_LO);              // −8/3 ≈ −2,67 (FEL)
    var B_A1 = IB(B_CROSS) - IB(B_LO);               // 5/3  (f > g)
    var B_A2 = -(IB(B_HI) - IB(B_CROSS));            // 13/3 (g > f, vänt tecken)
    var B_CORRECT = B_A1 + B_A2;                     // 6 (RÄTT)

    var DATASET_B = {
        key: 'B', f: fB, g: gB, antideriv: IB,
        a: B_LO, b: B_HI, bounds: [B_LO, B_CROSS, B_HI], trueCrossings: [B_CROSS],
        XMIN: 1.3, XMAX: 6.5, YMIN: -7.6, YMAX: 3.6,
        xTickStep: 1, yTickStep: 2,
        legendF: '−0,5<em>x</em>² + 2<em>x</em> + 1', legendG: '−0,5<em>x</em> + 3'
    };

    // ── Delar upp [ds.a, x] i tecken-konstanta segment (för målning) ──────
    function computeSegments(ds, xNow) {
        var pts = ds.bounds, segs = [];
        for (var i = 0; i < pts.length - 1; i++) {
            var p = pts[i], q = Math.min(pts[i + 1], xNow);
            if (q <= p + 1e-9) break;
            var mid = (p + q) / 2;
            segs.push({ p: p, q: q, upperIsF: ds.f(mid) >= ds.g(mid) });
        }
        return segs;
    }

    var W = 560, H = 420, L = 48, R = 18, T = 16, B = 40;
    var PW = W - L - R, PH = H - T - B;

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, x: DATASET_A.a };
        var sweepId = null;
        var dragging = false;
        var lastDSKey = 'A';

        function activeDS() { return state.step === 3 ? DATASET_B : DATASET_A; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Kurvor emellan — skannern';
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
            'aria-label': 'Interaktiv graf med tva kurvor f av x och g av x. En ' +
                'dragbar lodrat skannerlinje visar stapeln mellan kurvorna vid ' +
                'aktuellt x-varde, och arean malas upp bakom skannern.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'ew-resize';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var runningDiv = document.createElement('div');
        runningDiv.className = 'lab-vis-formel';
        runningDiv.style.color = COL.curve;
        card.appendChild(runningDiv);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.curve;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.tangent;
        card.appendChild(formelB);

        var formelC = document.createElement('div');
        formelC.className = 'lab-vis-formel';
        formelC.style.color = COL.secant;
        card.appendChild(formelC);

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
            { n: 1, label: '1 · Skannern' },
            { n: 2, label: '2 · Integralen' },
            { n: 3, label: '3 · Korsningen — fällan' }
        ];
        var INSTR = {
            1: 'En stapel mellan kurvorna visar höjdskillnaden <em>f</em>(<em>x</em>) ' +
               '− <em>g</em>(<em>x</em>) vid varje <em>x</em>. Dra i skannerlinjen ' +
               '(eller <em>x</em>-glidaren) åt höger — bakom den målas arean upp, ' +
               'i takt med att du drar.',
            2: 'Arean är summan av alla stapelhöjder mellan skärningspunkterna. ' +
               'Tryck på "Skanna hela" och se skannern svepa själv medan arean ' +
               '<em>A</em> räknas upp mot sitt sluttal.',
            3: 'Nu korsar kurvorna varandra INNE i intervallet, vid <em>x</em> = 4. ' +
               'Stapeln byter färg när över- och underfunktion byter plats. Dra ' +
               'skannern över hela sträckan — eller tryck "Skanna hela" — och se ' +
               'vad som händer om man integrerar rakt över utan att dela upp.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                stopSweep();
                state.step = s.n;
                update();
            });
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
            return { el: span, txt: txt };
        }
        var legF = legendItem(COL.curve, '<em>f</em>(<em>x</em>) = ' + DATASET_A.legendF);
        var legG = legendItem(COL.secant, '<em>g</em>(<em>x</em>) = ' + DATASET_A.legendG);
        var legPos = legendItem(COL.secant, '<em>f</em> &gt; <em>g</em> (positiv area)');
        var legNeg = legendItem(COL.tangent, '<em>g</em> &gt; <em>f</em> (tecken vänt)');
        legend.appendChild(legF.el);
        legend.appendChild(legG.el);
        legend.appendChild(legPos.el);
        legend.appendChild(legNeg.el);

        function updateLegend(ds) {
            legF.txt.innerHTML = '<em>f</em>(<em>x</em>) = ' + ds.legendF;
            legG.txt.innerHTML = '<em>g</em>(<em>x</em>) = ' + ds.legendG;
            legPos.el.style.display = state.step === 3 ? '' : 'none';
            legNeg.el.style.display = state.step === 3 ? '' : 'none';
        }

        // ── Knappar i actions-raden ───────────────────────────────────────
        var sweepBtn = document.createElement('button');
        sweepBtn.type = 'button';
        sweepBtn.className = 'lab-btn';
        sweepBtn.textContent = 'Skanna hela';
        sweepBtn.addEventListener('click', function () { startSweep(); });
        actions.appendChild(sweepBtn);

        // ── Glidare (x) ───────────────────────────────────────────────────
        var rowX = (function () {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = 'x';
            lbl.appendChild(em);
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på x');
            slider.setAttribute('aria-label', 'Värdet på x');
            var STEP = 0.02;

            function paint() {
                var ds = activeDS();
                var pct = clampNum((state.x - ds.a) / (ds.b - ds.a) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopSweep();
                var ds = activeDS();
                state.x = clampNum(v, ds.a, ds.b);
                if (from !== 'slider') slider.value = state.x;
                if (from !== 'field') field.value = fmt(state.x, 2).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(state.x, 2).replace(',', '.');
            });
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                setBounds: function (a, b) {
                    slider.min = a; slider.max = b; slider.step = STEP;
                    field.min = a; field.max = b; field.step = STEP;
                    slider.value = state.x;
                    field.value = fmt(state.x, 2).replace(',', '.');
                    paint();
                },
                sync: function () {
                    slider.value = state.x;
                    field.value = fmt(state.x, 2).replace(',', '.');
                    paint();
                }
            };
        })();
        rowX.setBounds(DATASET_A.a, DATASET_A.b);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopSweep();
            state.step = 1;
            lastDSKey = 'A';
            state.x = DATASET_A.a;
            update();
        });
        foot.appendChild(reset);

        // ── Animation: "Skanna hela" ─────────────────────────────────────
        function stopSweep() {
            if (sweepId != null) { cancelAnimationFrame(sweepId); sweepId = null; }
        }
        function startSweep() {
            stopSweep();
            var ds = activeDS();
            var x0 = ds.a, x1 = ds.b;
            state.x = x0;
            var T_MS = 2800, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.x = x0 + (x1 - x0) * p;
                rowX.sync();
                update();
                if (p < 1) sweepId = requestAnimationFrame(frame);
                else { sweepId = null; state.x = x1; rowX.sync(); update(); }
            }
            sweepId = requestAnimationFrame(frame);
        }

        // ── Dragbar skanner ───────────────────────────────────────────────
        function toWorldX(clientX, ds) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return ds.XMIN + (px - L) / PW * (ds.XMAX - ds.XMIN);
        }
        svg.addEventListener('pointerdown', function (e) {
            stopSweep();
            dragging = true;
            try { svg.setPointerCapture(e.pointerId); } catch (err) {}
            var ds = activeDS();
            state.x = clampNum(toWorldX(e.clientX, ds), ds.a, ds.b);
            rowX.sync();
            update();
            e.preventDefault();
        });
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var ds = activeDS();
            state.x = clampNum(toWorldX(e.clientX, ds), ds.a, ds.b);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita scenen ───────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var ds = activeDS();
            var x = state.x;
            function X(xv) { return L + (xv - ds.XMIN) / (ds.XMAX - ds.XMIN) * PW; }
            function Y(yv) { return T + (ds.YMAX - yv) / (ds.YMAX - ds.YMIN) * PH; }
            var axisY = Y(0);
            var axisVisible = ds.XMIN <= 0 && ds.XMAX >= 0;
            var axisX = axisVisible ? X(0) : null;
            var i;

            // Rutnät
            for (i = Math.ceil(ds.XMIN / ds.xTickStep) * ds.xTickStep; i <= ds.XMAX + 1e-9; i += ds.xTickStep) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = Math.ceil(ds.YMIN / ds.yTickStep) * ds.yTickStep; i <= ds.YMAX + 1e-9; i += ds.yTickStep) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // x-axel med pilspets (alltid inom vy)
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY - 8, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));

            // y-axel (bara om x = 0 är inom vyn)
            if (axisVisible) {
                svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 22, stroke: COL.axis, 'stroke-width': 1.6 }));
                svg.appendChild(svgEl('polygon', { points: axisX + ',12 ' + (axisX - 4.5) + ',22 ' + (axisX + 4.5) + ',22', fill: COL.axis }));
                svg.appendChild(svgVarText({ x: axisX + 9, y: 24, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            }

            // Tick-etiketter: x under x-axeln, y i vänstermarginalen (undviker
            // kollision när y-axeln inte ligger nära vänsterkanten).
            for (i = Math.ceil(ds.XMIN / ds.xTickStep) * ds.xTickStep; i <= ds.XMAX + 1e-9; i += ds.xTickStep) {
                if (Math.abs(i) < 1e-6) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [fmtDisp(i, 0)]));
            }
            for (i = Math.ceil(ds.YMIN / ds.yTickStep) * ds.yTickStep; i <= ds.YMAX + 1e-9; i += ds.yTickStep) {
                if (Math.abs(i) < 1e-6) continue;
                svg.appendChild(svgVarText(
                    { x: L - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [fmtDisp(i, 0)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Målad area (segment med tecken-konstant höjd, från a till x)
            var segs = computeSegments(ds, x);
            segs.forEach(function (seg) {
                var N = 28, d = '', t;
                for (t = 0; t <= N; t++) {
                    var xv = seg.p + (seg.q - seg.p) * t / N;
                    var yv = seg.upperIsF ? ds.f(xv) : ds.g(xv);
                    d += (t === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                }
                for (t = N; t >= 0; t--) {
                    var xv2 = seg.p + (seg.q - seg.p) * t / N;
                    var yv2 = seg.upperIsF ? ds.g(xv2) : ds.f(xv2);
                    d += 'L' + X(xv2).toFixed(1) + ' ' + Y(yv2).toFixed(1) + ' ';
                }
                d += 'Z';
                g.appendChild(svgEl('path', {
                    d: d, fill: seg.upperIsF ? COL.secant : COL.tangent,
                    'fill-opacity': 0.22, stroke: 'none'
                }));
            });

            // Kurvorna f och g
            function curvePath(fn) {
                var N = 160, d = '', t;
                for (t = 0; t <= N; t++) {
                    var xv = ds.XMIN + (ds.XMAX - ds.XMIN) * t / N;
                    d += (t === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y(fn(xv)).toFixed(1) + ' ';
                }
                return d;
            }
            g.appendChild(svgEl('path', { d: curvePath(ds.g), fill: 'none', stroke: COL.secant, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            g.appendChild(svgEl('path', { d: curvePath(ds.f), fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

            // Gränser: streckad guide upp till max(f,g) vid varje ds.bounds-punkt
            ds.bounds.forEach(function (bx) {
                var topY = Y(Math.max(ds.f(bx), ds.g(bx)));
                g.appendChild(svgEl('line', { x1: X(bx), y1: axisY, x2: X(bx), y2: topY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            });
            // Ringar bara vid FAKTISKA skärningspunkter (där f(t) = g(t))
            ds.trueCrossings.forEach(function (cx) {
                g.appendChild(svgEl('circle', { cx: X(cx), cy: Y(ds.f(cx)), r: 3.4, fill: 'none', stroke: COL.axis, 'stroke-width': 1.6 }));
            });

            // Aktuell stapel vid x (bredare rektangel, mer mättad)
            var fx = ds.f(x), gxv = ds.g(x), upperIsF = fx >= gxv;
            var barCol = upperIsF ? COL.secant : COL.tangent;
            var barTopPix = Y(Math.max(fx, gxv)), barBotPix = Y(Math.min(fx, gxv));
            g.appendChild(svgEl('rect', {
                x: X(x) - 5, y: Math.min(barTopPix, barBotPix), width: 10,
                height: Math.max(1, Math.abs(barBotPix - barTopPix)),
                fill: barCol, 'fill-opacity': 0.5, stroke: barCol, 'stroke-width': 1.2
            }));
            g.appendChild(svgEl('circle', { cx: X(x), cy: Y(fx), r: 3.5, fill: COL.curve }));
            g.appendChild(svgEl('circle', { cx: X(x), cy: Y(gxv), r: 3.5, fill: COL.secant }));

            // Skannerlinjen (över allt, alltid synlig) + grepphandtag. Handtaget
            // sitter en bit NEDANFÖR y-axelns pilspets/etikett (annars kolliderar
            // det med "y"-pilen när skannern passerar x = 0).
            svg.appendChild(svgEl('line', { x1: X(x), y1: T, x2: X(x), y2: T + PH, stroke: COL.handle, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('circle', { cx: X(x), cy: T + 22, r: 6.5, fill: COL.handle }));

            // Stapelhöjd-etikett i fri yta, ovanför stapelns topp — men ALDRIG
            // i bandet strax under x-axeln där tick-etiketterna sitter (annars
            // krockar en kort/nollhög stapel nära axeln med "-3"/"2" osv.).
            var mid = (ds.a + ds.b) / 2;
            var anchorStart = x < mid;
            var labelY = Math.min(Math.min(barTopPix, barBotPix) - 12, axisY - 18);
            labelY = Math.max(T + 12, labelY);
            var labelX = X(x) + (anchorStart ? 9 : -9);
            svg.appendChild(svgVarText(
                { x: labelX, y: labelY, 'font-size': 12.5, 'text-anchor': anchorStart ? 'start' : 'end', fill: barCol },
                ['*f', '(', '*x', ') − ', '*g', '(', '*x', ') = ', fmtDisp(fx - gxv, 2)]));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var ds = activeDS();
            if (state.step === 2) {
                var runningVal = ds.antideriv(state.x) - ds.antideriv(ds.a);
                katexInto(runningDiv,
                    'A(x) = \\displaystyle\\int_{' + fmtTex(ds.a, 0) + '}^{' + fmtTex(state.x, 2) + '} ' +
                    '\\big(f(x)-g(x)\\big)\\,dx = ' + fmtTex(runningVal, 2) + '\\ \\text{a.e.}');
            } else if (state.step === 3) {
                var runningNaive = ds.antideriv(state.x) - ds.antideriv(ds.a);
                katexInto(runningDiv,
                    'A_{\\text{naiv}}(x) = \\displaystyle\\int_{' + fmtTex(ds.a, 0) + '}^{' + fmtTex(state.x, 2) + '} ' +
                    '\\big(f(x)-g(x)\\big)\\,dx = ' + fmtTex(runningNaive, 2) + '\\ \\text{a.e.}');
            }
            if (state.step === 2) {
                katexInto(formelA,
                    'A = \\int_{' + fmtTex(A_LO, 0) + '}^{' + fmtTex(A_HI, 0) + '} \\big(f(x)-g(x)\\big)\\,dx = ' +
                    '\\dfrac{125}{12}\\ \\text{a.e.} \\approx ' + fmtTex(A_AREA, 2) + '\\ \\text{a.e.}');
            } else formelA.textContent = '';
            if (state.step === 3) {
                katexInto(formelB,
                    '\\text{Naiv (fel):}\\quad A_{\\text{naiv}} = \\int_{' + fmtTex(B_LO, 0) + '}^{' + fmtTex(B_HI, 0) + '} ' +
                    '\\big(f(x)-g(x)\\big)\\,dx = -\\dfrac{8}{3}\\ \\text{a.e.} \\approx ' + fmtTex(B_NAIVE, 2) + '\\ \\text{a.e.}');
                katexInto(formelC,
                    '\\text{Rätt, uppdelat vid } x = ' + fmtTex(B_CROSS, 0) + '\\text{:}\\quad A = ' +
                    '\\dfrac{5}{3} + \\dfrac{13}{3} = ' + fmtTex(B_CORRECT, 0) + '\\ \\text{a.e.}');
                note.innerHTML = 'En negativ area är omöjlig — i den naiva integralen tar den positiva ' +
                    'delen (<em>f</em> &gt; <em>g</em>) och den negativa delen (<em>g</em> &gt; <em>f</em>) ut ' +
                    'varandra. Skillnaden mot rätt svar är ' + fmtDisp(B_CORRECT - B_NAIVE, 2) + ' a.e.';
            } else { formelB.textContent = ''; formelC.textContent = ''; note.textContent = ''; }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            var ds = activeDS();
            if (ds.key !== lastDSKey) {
                lastDSKey = ds.key;
                state.x = ds.a;
            }
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            updateLegend(ds);
            runningDiv.style.display = state.step >= 2 ? '' : 'none';
            formelA.style.display = state.step === 2 ? '' : 'none';
            formelB.style.display = state.step === 3 ? '' : 'none';
            formelC.style.display = state.step === 3 ? '' : 'none';
            note.style.display = state.step === 3 ? '' : 'none';
            sweepBtn.style.display = state.step >= 2 ? '' : 'none';
            rowX.setBounds(ds.a, ds.b);
            drawMain();
            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                stopSweep();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-5.6'] = api;
    window.VISUALISERINGAR['ma4-3.4'] = api;
})();
