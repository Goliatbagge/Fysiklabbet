/* ma4-3.6.js — visualisering: "Täthetsfunktionen föds ur histogrammet"
 * (hör till ma4-3.6, Täthetsfunktioner).
 *
 * Kärninsikt: en täthetsfunktion är gränsen av allt finare NORMERADE
 * histogram — och sannolikhet är AREA under kurvan, inte höjd. Ett enda
 * exakt värde har bredden noll, så P(X = exakt ett värde) = 0.
 *
 * Data: 500 "kroppslängder" (cm), seedad pseudo-slump (Box–Muller på en
 * mulberry32-generator), normalfördelade kring 173 cm med σ ≈ 7 cm,
 * genererade EN gång vid modul-laddning så bilden är deterministisk.
 *
 * Fyra steg (lager):
 *   1. Histogrammet     — normerat histogram (andel per cm), klassbredds-
 *                          glidare Δx = 24..1 cm. Totalarean är alltid 1.
 *   2. Kurvan träder fram — normalfördelningskurvan (röd, från datans eget
 *                           medelvärde/standardavvikelse) läggs över.
 *                           Villkoren f(x) ≥ 0 och totalarea = 1.
 *   3. Sannolikhet = area — dragbara gränser a, b på x-axeln; grön
 *                           area under kurvan jämförs live med andelen av
 *                           de 500 datapunkterna som faller i [a, b].
 *   4. Fällan: exakt värde — knapp krymper b mot a; arean/andelen rasar
 *                            mot 0 — P(X = exakt ett värde) = 0.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-6.5.js).
 * API: window.VISUALISERINGAR['ma4-3.6'] = { mount(el) -> { destroy() } }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    // fmt/fmtTex: stryker onödiga avslutande nollor (166,0 -> 166) — bra för
    // koordinat-etiketter. fmtFixed/fmtFixedTex: ALLTID exakt `decimals`
    // decimaler (utom exakt/avrundad noll) — används för areor/sannolik-
    // heter som ska jämföras sida vid sida (1,00 ska inte krympa till "1").
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function fmtFixed(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    function fmtFixedTex(v, decimals) { return fmtFixed(v, decimals).replace(',', '{,}'); }
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

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        bar: '#2563c9',        // histogram — blå
        curve: '#c8324a',      // normalfördelningskurvan — röd
        area: 'rgba(74,125,58,0.35)',   // sannolikhetsarean — grön skuggning
        handle: '#3f6b34',     // a/b-handtag — mörkgrön (matchar arean)
        dash: 'rgba(31,37,48,0.38)'
    };

    // ── Deterministisk datalista (seedad pseudo-slump) ────────────────────
    function mulberry32(seed) {
        return function () {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    var N_DATA = 500, MU_GEN = 173, SIGMA_GEN = 7;
    var XLO = 150, XHI = 196;
    var DATA = (function () {
        var rng = mulberry32(20260712);
        var out = [];
        for (var i = 0; i < N_DATA; i++) {
            var x, tries = 0;
            do {
                var u1 = Math.max(rng(), 1e-9), u2 = rng();
                var z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
                x = MU_GEN + SIGMA_GEN * z;
                tries++;
            } while ((x < XLO || x > XHI) && tries < 20);
            x = clampNum(x, XLO + 0.05, XHI - 0.05);
            out.push(Math.round(x * 10) / 10);
        }
        out.sort(function (a, b) { return a - b; });
        return out;
    })();
    var SAMPLE_MEAN = (function () {
        var s = 0; for (var i = 0; i < DATA.length; i++) s += DATA[i];
        return s / DATA.length;
    })();
    var SAMPLE_SD = (function () {
        var s = 0; for (var i = 0; i < DATA.length; i++) s += (DATA[i] - SAMPLE_MEAN) * (DATA[i] - SAMPLE_MEAN);
        return Math.sqrt(s / DATA.length);
    })();
    function gaussPdf(x, mu, sigma) {
        var dz = x - mu;
        return Math.exp(-(dz * dz) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI));
    }
    function pdfFn(x) { return gaussPdf(x, SAMPLE_MEAN, SAMPLE_SD); }
    function trapz(fn, a, b, n) {
        if (b <= a) return 0;
        var h = (b - a) / n, sum = 0.5 * (fn(a) + fn(b));
        for (var i = 1; i < n; i++) sum += fn(a + i * h);
        return sum * h;
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var WIDTH_MIN = 1, WIDTH_MAX = 24, WIDTH_STEP = 1;
        // Handtagen hålls en bit innanför hela x-domänen (XLO..XHI) så att
        // "b"-etiketten aldrig kolliderar med x-axelns enhetsetikett längst
        // ut till höger (upptäckt i skärmdumpsgranskning).
        var HANDLE_MIN = 156, HANDLE_MAX = 190, A_STEP = 0.5, MIN_GAP = 1;
        var state = { step: 1, width: 20, showCurve: false, a: 166, b: 180 };
        var shrinkId = null;

        // ── Geometri ─────────────────────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        function X(x) { return L + (x - XLO) / (XHI - XLO) * PW; }

        function computeBins(width) {
            var nBins = Math.max(1, Math.ceil((XHI - XLO) / width));
            var counts = new Array(nBins).fill(0);
            for (var i = 0; i < DATA.length; i++) {
                var idx = Math.floor((DATA[i] - XLO) / width);
                if (idx < 0) idx = 0; if (idx >= nBins) idx = nBins - 1;
                counts[idx]++;
            }
            return counts;
        }
        function niceYStep(maxVal) {
            var cand = [0.002, 0.005, 0.01, 0.02, 0.025, 0.05, 0.1, 0.2];
            for (var i = 0; i < cand.length; i++) if (maxVal / cand[i] <= 5) return cand[i];
            return cand[cand.length - 1];
        }
        function isCurveOn() {
            return (state.step === 2 && state.showCurve) || state.step >= 3;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Täthetsfunktionen föds ur histogrammet';
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
            'aria-label': 'Histogram över 500 kroppslängder med en klassbredds-glidare. ' +
                'En röd normalfördelningskurva kan läggas över, och två dragbara gränser ' +
                'a och b skuggar sannolikhetsarean mellan sig gron.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.bar;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.curve;
        card.appendChild(formelB);

        var formelC = document.createElement('div');
        formelC.className = 'lab-vis-formel';
        formelC.style.color = COL.handle;
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
            { n: 1, label: '1 · Histogrammet' },
            { n: 2, label: '2 · Kurvan träder fram' },
            { n: 3, label: '3 · Sannolikhet som area' },
            { n: 4, label: '4 · Fällan: exakt värde' }
        ];
        var INSTR = {
            1: 'Dra i <em>klassbredd</em>-glidaren (<em>Δx</em>) och se staplarna smalna av. ' +
               'Varje stapels höjd är <em>andelen per cm</em> — inte antalet — så att arean ' +
               '(höjd gånger bredd) alltid är rättvisande, oavsett klassbredd.',
            2: 'Kryssa i "Visa normalfördelningskurvan": en kurva räknad från datans eget ' +
               'medelvärde och standardavvikelse läggs över staplarna. Dra klassbredden mot ' +
               '1 cm — staplarna följer kurvan allt bättre.',
            3: 'Dra i handtagen <em>a</em> och <em>b</em> på x-axeln. Den gröna arean under ' +
               'kurvan mellan dem är sannolikheten <em>P</em>(<em>a</em> ≤ <em>X</em> ≤ <em>b</em>) ' +
               '— jämför den med hur stor andel av de 500 datapunkterna som faktiskt hamnar ' +
               'i intervallet.',
            4: 'Tryck på "Krymp intervallet" och se <em>b</em> glida mot <em>a</em>. Både arean ' +
               'och andelen datapunkter rasar mot 0 — ett enda exakt värde har bredden noll, så ' +
               'sannolikheten att träffa det exakt är alltid 0.'
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
        var legBar = legendItem(COL.bar, 'histogram (andel per cm)');
        var legCurve = legendItem(COL.curve, 'normalfördelning <em>f</em>(<em>x</em>)');
        var legArea = legendItem(COL.handle, '<em>P</em>(<em>a</em> ≤ <em>X</em> ≤ <em>b</em>) — area');
        legend.appendChild(legBar);
        legend.appendChild(legCurve);
        legend.appendChild(legArea);

        // ── Actions: kurv-kryssruta + krymp-knapp ───────────────────────────
        var curveLabel = document.createElement('label');
        curveLabel.className = 'lab-graf-check';
        var curveCb = document.createElement('input');
        curveCb.type = 'checkbox';
        curveCb.addEventListener('change', function () {
            state.showCurve = curveCb.checked;
            update();
        });
        curveLabel.appendChild(curveCb);
        var curveTxt = document.createElement('span');
        curveTxt.innerHTML = 'Visa normalfördelningskurvan';
        curveLabel.appendChild(curveTxt);
        actions.appendChild(curveLabel);

        var shrinkBtn = document.createElement('button');
        shrinkBtn.type = 'button';
        shrinkBtn.className = 'lab-btn';
        shrinkBtn.textContent = 'Krymp intervallet';
        shrinkBtn.addEventListener('click', function () { startShrink(); });
        actions.appendChild(shrinkBtn);

        // ── Glidare ───────────────────────────────────────────────────────
        function makeRow(name, min, max, step, get, set, color) {
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
                slider.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' +
                    color + ' ' + pct + '%, ' + COL.dash + ' ' + pct + '%, ' + COL.dash + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopShrink();
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
                el: row,
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        var rowWidth = makeRow('Δx', WIDTH_MIN, WIDTH_MAX, WIDTH_STEP,
            function () { return state.width; },
            function (v) { state.width = Math.round(v / WIDTH_STEP) * WIDTH_STEP; },
            COL.bar);
        var rowA = makeRow('a', HANDLE_MIN, HANDLE_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = clampNum(Math.round(v / A_STEP) * A_STEP, HANDLE_MIN, state.b - MIN_GAP); },
            COL.handle);
        var rowB = makeRow('b', HANDLE_MIN, HANDLE_MAX, A_STEP,
            function () { return state.b; },
            function (v) { state.b = clampNum(Math.round(v / A_STEP) * A_STEP, state.a + MIN_GAP, HANDLE_MAX); },
            COL.handle);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopShrink();
            state.width = 20; state.showCurve = false; state.a = 166; state.b = 180;
            curveCb.checked = false;
            rowWidth.sync(); rowA.sync(); rowB.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: krymp b mot a ─────────────────────────────────────
        function stopShrink() {
            if (shrinkId != null) { cancelAnimationFrame(shrinkId); shrinkId = null; }
        }
        function startShrink() {
            stopShrink();
            var aFix = state.a;
            var b0 = state.b > aFix + 0.5 ? state.b : aFix + 8;
            if (b0 > HANDLE_MAX) b0 = HANDLE_MAX;
            state.b = b0;
            var GAP_MIN = 0.02, T_MS = 2800, t0 = null;
            var gap0 = b0 - aFix;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.b = aFix + gap0 * Math.pow(GAP_MIN / gap0, p);
                rowB.sync();
                update();
                if (p < 1) shrinkId = requestAnimationFrame(frame);
                else { shrinkId = null; state.b = aFix + GAP_MIN; rowB.sync(); update(); }
            }
            shrinkId = requestAnimationFrame(frame);
        }

        // ── Dragbara a/b-handtag ─────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XLO + (px - L) / PW * (XHI - XLO);
        }
        var dragging = null; // 'a' | 'b' | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            stopShrink();
            var xw = toWorldX(e.clientX);
            if (dragging === 'a') {
                state.a = clampNum(Math.round(xw / A_STEP) * A_STEP, HANDLE_MIN, state.b - MIN_GAP);
                rowA.sync();
            } else {
                state.b = clampNum(Math.round(xw / A_STEP) * A_STEP, state.a + MIN_GAP, HANDLE_MAX);
                rowB.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain(counts) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var width = state.width;
            var curveOn = isCurveOn();

            var maxDensity = 0;
            for (var i = 0; i < counts.length; i++) {
                var dens = counts[i] / (DATA.length * width);
                if (dens > maxDensity) maxDensity = dens;
            }
            var curvePeak = curveOn ? gaussPdf(SAMPLE_MEAN, SAMPLE_MEAN, SAMPLE_SD) : 0;
            var yMax = Math.max(maxDensity, curvePeak, 0.005) * 1.2;
            function Y(d) { return T + (yMax - d) / yMax * PH; }
            var axisY = Y(0);

            // Rutnät: lodräta linjer vid tiotal, vågräta vid y-ticksen
            var xt;
            for (xt = 160; xt <= 190; xt += 10) {
                svg.appendChild(svgEl('line', { x1: X(xt), y1: T, x2: X(xt), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            var yStep = niceYStep(yMax);
            var yDecimals = (yStep.toString().split('.')[1] || '').length;
            var yv;
            for (yv = yStep; yv <= yMax * 1.001; yv += yStep) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(yv), x2: L + PW, y2: Y(yv), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar (hörn nere till vänster, som i genomgångens figur)
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: L, y1: T + PH, x2: L, y2: 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: L + ',0 ' + (L - 4.5) + ',10 ' + (L + 4.5) + ',10', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x', ' (cm)']));
            svg.appendChild(svgVarText({ x: L + 8, y: 16, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.axis }, ['andel per cm']));

            // x-tick-etiketter (hoppa nära a/b i steg 3-4 för att undvika krock)
            var aVal = Math.min(state.a, state.b), bVal = Math.max(state.a, state.b);
            var nearHandles = state.step >= 3;
            for (xt = 160; xt <= 190; xt += 10) {
                if (nearHandles && (Math.abs(xt - aVal) < 3.5 || Math.abs(xt - bVal) < 3.5)) continue;
                svg.appendChild(svgVarText({ x: X(xt), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(xt)]));
            }
            // y-tick-etiketter
            for (yv = yStep; yv <= yMax * 1.001; yv += yStep) {
                svg.appendChild(svgVarText({ x: L - 6, y: Y(yv) + 3.5, 'font-size': 10, 'text-anchor': 'end', fill: COL.tick }, [fmt(yv, yDecimals)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Histogramstaplar
            for (i = 0; i < counts.length; i++) {
                var x0 = XLO + i * width, x1v = Math.min(XHI, x0 + width);
                var density = counts[i] / (DATA.length * width);
                var barTop = Y(density);
                var barH = axisY - barTop;
                if (barH < 0.6) continue;
                g.appendChild(svgEl('rect', {
                    x: X(x0) + 0.5, y: barTop, width: Math.max(0, X(x1v) - X(x0) - 1), height: barH,
                    fill: COL.bar, 'fill-opacity': curveOn ? 0.5 : 0.82, stroke: COL.axis, 'stroke-width': 1
                }));
            }

            // Sannolikhetsarean (grön), under kurvan, bakom kurvlinjen
            if (state.step >= 3) {
                var dd = 'M' + X(aVal).toFixed(1) + ' ' + Y(0).toFixed(1) + ' ';
                var Ns = 80, xi2, yy2;
                for (i = 0; i <= Ns; i++) {
                    xi2 = aVal + (bVal - aVal) * i / Ns;
                    yy2 = pdfFn(xi2);
                    dd += 'L' + X(xi2).toFixed(1) + ' ' + Y(yy2).toFixed(1) + ' ';
                }
                dd += 'L' + X(bVal).toFixed(1) + ' ' + Y(0).toFixed(1) + ' Z';
                g.appendChild(svgEl('path', { d: dd, fill: COL.area, stroke: 'none' }));
            }

            // Normalfördelningskurvan (röd), ovanpå staplar/area
            if (curveOn) {
                var d = '', Nc = 220, xi;
                for (i = 0; i <= Nc; i++) {
                    xi = XLO + (XHI - XLO) * i / Nc;
                    var yy = Math.min(yMax * 1.15, pdfFn(xi));
                    d += (i === 0 ? 'M' : 'L') + X(xi).toFixed(1) + ' ' + Y(yy).toFixed(1) + ' ';
                }
                g.appendChild(svgEl('path', {
                    d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.3,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
                // Kurvetikett i fri yta uppe till höger om toppen
                svg.appendChild(svgVarText(
                    { x: X(SAMPLE_MEAN) + 46, y: Y(curvePeak * 0.9), 'font-size': 12.5, 'text-anchor': 'start', fill: COL.curve },
                    ['*f', '(', '*x', ')']));
            }

            // Dragbara a/b-handtag + streckade guider (utanför klippet, så
            // handtagen aldrig klipps av rutans nederkant)
            if (state.step >= 3) {
                var aX = X(aVal), bX = X(bVal);
                var aY0 = Y(pdfFn(aVal)), bY0 = Y(pdfFn(bVal));
                svg.appendChild(svgEl('line', { x1: aX, y1: axisY, x2: aX, y2: aY0, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
                svg.appendChild(svgEl('line', { x1: bX, y1: axisY, x2: bX, y2: bY0, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));

                if (bX - aX < 22) {
                    svg.appendChild(svgVarText({ x: (aX + bX) / 2, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*a', ', ', '*b']));
                } else {
                    svg.appendChild(svgVarText({ x: aX, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*a']));
                    svg.appendChild(svgVarText({ x: bX, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*b']));
                }

                [{ x: aX, key: 'a' }, { x: bX, key: 'b' }].forEach(function (h) {
                    svg.appendChild(svgEl('circle', { cx: h.x, cy: axisY, r: 4.5, fill: COL.handle, stroke: 'rgba(15,22,32,0.45)', 'stroke-width': 1 }));
                    var hit = svgEl('circle', { cx: h.x, cy: axisY, r: 16, fill: 'rgba(0,0,0,0)' });
                    hit.style.cursor = 'grab';
                    hit.addEventListener('pointerdown', function (e) {
                        stopShrink(); dragging = h.key;
                        try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                        e.preventDefault();
                    });
                    svg.appendChild(hit);
                });
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas(counts) {
            var totalArea = 0;
            for (var i = 0; i < counts.length; i++) totalArea += counts[i];
            totalArea = totalArea / DATA.length;
            katexInto(formelA,
                '\\text{Totalarea} = \\sum_i h_i \\cdot \\Delta x = ' + fmtFixedTex(totalArea, 2));

            katexInto(formelB,
                'f(x) \\geq 0 \\quad \\text{och} \\quad \\int_{-\\infty}^{\\infty} f(x)\\,dx = 1');

            var aVal = Math.min(state.a, state.b), bVal = Math.max(state.a, state.b);
            var areaTheo = trapz(pdfFn, aVal, bVal, 400);
            var empCount = 0;
            for (i = 0; i < DATA.length; i++) if (DATA[i] >= aVal && DATA[i] <= bVal) empCount++;
            var empFrac = empCount / DATA.length;
            var aT = fmtTex(aVal, 1), bT = fmtTex(bVal, 1), areaT = fmtFixedTex(areaTheo, 2);
            katexInto(formelC,
                'P(' + aT + ' \\leq X \\leq ' + bT + ') = \\int_{' + aT + '}^{' + bT + '} f(x)\\,dx \\approx ' + areaT);

            if (state.step === 1) {
                note.innerHTML = 'Klassbredden är nu <em>Δx</em> = ' + fmt(state.width, 0) +
                    '&nbsp;cm. Oavsett hur du sätter den är totalarean alltid 1 — det är hela ' +
                    'poängen med att normera y-axeln till andel per cm i stället för antal.';
            } else if (state.step === 2) {
                note.innerHTML = state.showCurve
                    ? 'Dra klassbredden mot 1 cm — staplarna smälter samman med kurvan. En ' +
                      'täthetsfunktion måste vara noll eller större överallt, och hela arean ' +
                      'under den är exakt 1 (samma area som histogrammets, oavsett klassbredd).'
                    : 'Kryssa i "Visa normalfördelningskurvan" ovan för att lägga kurvan över staplarna.';
            } else if (state.step === 3) {
                note.innerHTML = 'Andel av de 500 datapunkterna i intervallet: <strong>' +
                    fmtFixed(empFrac, 2) + '</strong> (' + empCount + ' av 500) — nära den ' +
                    'teoretiska sannolikheten <strong>' + fmtFixed(areaTheo, 2) + '</strong> från kurvans area.';
            } else if (state.step === 4) {
                var gap = bVal - aVal;
                if (gap < 0.15) {
                    note.innerHTML = 'Nu är intervallet nästan borta: <em>P</em>(<em>X</em> = ' +
                        fmtFixed(aVal, 1) + '&nbsp;cm) = 0. Ett enda exakt värde har bredden noll ' +
                        '— sannolikheten att träffa precis det värdet är alltid 0, hur troligt ' +
                        'värdet än "känns".';
                } else {
                    note.innerHTML = 'Arean (<strong>' + fmtFixed(areaTheo, 2) + '</strong>) och andelen ' +
                        'datapunkter (<strong>' + fmtFixed(empFrac, 2) + '</strong>) hör ihop. Tryck på ' +
                        'knappen ovan för att se båda rasa mot 0.';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            rowWidth.el.style.display = state.step <= 2 ? '' : 'none';
            rowA.el.style.display = state.step >= 3 ? '' : 'none';
            rowB.el.style.display = state.step >= 3 ? '' : 'none';

            curveLabel.style.display = state.step === 2 ? '' : 'none';
            shrinkBtn.style.display = state.step === 4 ? '' : 'none';
            actions.style.display = state.step === 1 ? 'none' : '';
            if (state.step >= 3) { curveCb.checked = true; curveCb.disabled = true; state.showCurve = true; }
            else { curveCb.disabled = false; }

            legCurve.style.display = state.step >= 2 ? '' : 'none';
            legArea.style.display = state.step >= 3 ? '' : 'none';

            formelA.style.display = state.step === 1 ? '' : 'none';
            formelB.style.display = state.step === 2 ? '' : 'none';
            formelC.style.display = state.step >= 3 ? '' : 'none';

            var counts = computeBins(state.width);
            drawMain(counts);
            updateFormulas(counts);
        }

        update();

        return {
            destroy: function () {
                stopShrink();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma4-3.6'] = api;
})();
