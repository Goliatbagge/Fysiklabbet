/* ma3c-5.4.js — visualisering: "Fundamentalsatsen — arean har en lutning".
 * Hör till ma3c-5.4 (integralkalkylens fundamentalsats), med koppling till
 * ma3c-5.3 (arean under en kurva).
 *
 * Kärninsikt: den ackumulerade arean A(x) = ∫₀ˣ f(t) dt växer i varje
 * ögonblick med hastigheten f(x) — dvs. A′(x) = f(x). Integration och
 * derivering är varandras motsatser, och det SYNS när man drar markören.
 *
 * Funktion: f(x) = 4 − 0,25(x − 2)² på [0, 8]. Positiv på [0, 6), negativ
 * på (6, 8] — arean växer först, krymper sedan (tydlig teckenväxling).
 * f(2) = 4 (max), f(6) = 0 (A:s topp), f(8) = −5.
 * Primitiv funktion F(x) = 4x − (x − 2)³/12 ⇒ A(x) = F(x) − F(0),
 * F(0) = 2/3. A(6) = 18 (max), A(8) ≈ 13,33 — arean krymper synligt.
 *
 * Två synkade koordinatsystem med SAMMA x-kolumner (samma mönster som
 * ma3c-2.3.js steg 4): övre = f(x) (blå), undre = A(x) (byggs upp, lila).
 *
 * Tre steg (lager):
 *   1. Samla area        — dragbar x-markör på övre systemets x-axel,
 *                           arean 0→x skuggas grönt/rött, A(x) live.
 *   2. Areafunktionen     — undre systemet: A(x) ritas som kurva 0→x,
 *                           en prick markerar toppen vid f:s nollställe.
 *   3. Lutningen = f(x)   — tangent på A(x) vid markören; f(x) och A′(x)
 *                           visas sida vid sida (alltid lika) + satsen.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['ma3c-5.4'] = { mount(el) }.
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
        curve: '#2563c9',                  // f(x) — blå
        areaPos: 'rgba(74,125,58,0.30)',   // positiv area — grön skuggning
        areaNeg: 'rgba(200,50,74,0.26)',   // negativ area — röd skuggning
        acc: '#7c3aed',                    // A(x) — lila (skild från f och tangent)
        tangent: '#c8324a',                // tangent / A′(x) — accentröd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    var uid = 0;

    function mount(el) {
        // ── Funktionen och dess primitiva (analytiskt, exakt) ──────────────
        function f(x) { return 4 - 0.25 * (x - 2) * (x - 2); }
        var X0 = 6; // f:s nollställe i [0, 8] — A:s maximum
        function Fprim(x) { return 4 * x - Math.pow(x - 2, 3) / 12; }
        var F0 = Fprim(0);
        function Acc(x) { return Fprim(x) - F0; }

        // ── Tillstånd ─────────────────────────────────────────────────────
        var X_MIN = 0, X_MAX = 8, X_STEP = 0.02, X_START = 3;
        var state = { x: X_START, step: 1 };
        var animId = null, playing = false, dragging = false;

        // ── Geometri: övre systemet (f) ──────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -0.6, XMAX = 8.6, YMIN = -6.5, YMAX = 6.2;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── Geometri: undre systemet (A) — samma x-kolumner ──────────────
        var H2 = 260, T2 = 12, B2 = 32;
        var PH2 = H2 - T2 - B2;
        var Y2MIN = -2.5, Y2MAX = 20.5;
        function Y2(y) { return T2 + (Y2MAX - y) / (Y2MAX - Y2MIN) * PH2; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Fundamentalsatsen — arean har en lutning';
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
            'aria-label': 'Interaktiv graf: funktionen f av x mellan 0 och 8. Arean mellan ' +
                'kurvan och x-axeln, från 0 till markörens x-värde, skuggas grönt där f är ' +
                'positiv och rött där f är negativ. Dra markören på x-axeln eller använd glidaren.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelAcc = document.createElement('div');
        formelAcc.className = 'lab-vis-formel';
        formelAcc.style.color = COL.acc;
        card.appendChild(formelAcc);

        var pairWrap = document.createElement('div');
        pairWrap.className = 'lab-vis-formel';
        pairWrap.style.gap = '28px';
        var pairLeft = document.createElement('div');
        pairLeft.style.color = COL.curve;
        var pairRight = document.createElement('div');
        pairRight.style.color = COL.tangent;
        pairWrap.appendChild(pairLeft);
        pairWrap.appendChild(pairRight);
        card.appendChild(pairWrap);

        var formelTheorem = document.createElement('div');
        formelTheorem.className = 'lab-vis-formel';
        card.appendChild(formelTheorem);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2,
            width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Koordinatsystem där den ackumulerade areafunktionen A av x ritas ' +
                'upp till markörens x-värde. Vid markören visas tangenten, vars lutning A-prim ' +
                'av x alltid är lika med f av x i det övre systemet.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

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
            { n: 1, label: '1 · Samla area' },
            { n: 2, label: '2 · Areafunktionen' },
            { n: 3, label: '3 · Lutningen = funktionsvärdet' }
        ];
        var INSTR = {
            1: 'Dra markören längs <em>x</em>-axeln i det övre systemet (eller använd ' +
               'glidaren). Arean mellan kurvan och <em>x</em>-axeln, från 0 till <em>x</em>, ' +
               'skuggas — grönt där <em>f</em> är positiv, rött där den är negativ. Gissa ' +
               'innan du drar: var växer <em>A</em>(<em>x</em>) snabbast? Var börjar den krympa?',
            2: 'I det undre systemet byggs <em>A</em>(<em>x</em>) upp som en egen kurva när ' +
               'du drar markören — ett spår av all area som samlats hittills. Dra förbi ' +
               'punkten där den blå kurvan korsar <em>x</em>-axeln: se hur <em>A</em>(<em>x</em>) ' +
               'får en topp precis där.',
            3: 'Vid markören ritas tangenten till <em>A</em>(<em>x</em>)-kurvan. Jämför de ' +
               'två talen nedanför — tangentens lutning <em>A</em>′(<em>x</em>) är alltid ' +
               'exakt samma tal som <em>f</em>(<em>x</em>) i det övre systemet. Det är ' +
               'fundamentalsatsen i praktiken.'
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
        function legendLine(color, html) {
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
        function legendFill(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.style.display = 'inline-block';
            sw.style.width = '14px';
            sw.style.height = '14px';
            sw.style.background = color;
            sw.style.borderRadius = '3px';
            sw.style.marginRight = '6px';
            sw.style.verticalAlign = 'middle';
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return span;
        }
        var legF = legendLine(COL.curve, '<em>f</em>(<em>x</em>) = 4 − 0,25(<em>x</em> − 2)²');
        var legPos = legendFill(COL.areaPos, 'positiv area');
        var legNeg = legendFill(COL.areaNeg, 'negativ area');
        var legAcc = legendLine(COL.acc, '<em>A</em>(<em>x</em>)');
        var legTangent = legendLine(COL.tangent, 'tangent, lutning <em>A</em>′(<em>x</em>)');
        legend.appendChild(legF);
        legend.appendChild(legPos);
        legend.appendChild(legNeg);
        legend.appendChild(legAcc);
        legend.appendChild(legTangent);

        // ── Knapp: spela igenom ──────────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Spela igenom';
        playBtn.addEventListener('click', function () { if (playing) stopAnim(); else startAnim(); });
        actions.appendChild(playBtn);

        // ── Glidare (x) ───────────────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        var rowX = makeRow('x', X_MIN, X_MAX, X_STEP,
            function () { return state.x; },
            function (v) { state.x = Math.round(v / X_STEP) * X_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.x = X_START;
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: spela igenom 0 → 8 ─────────────────────────────────
        function updatePlayBtn() { playBtn.textContent = playing ? 'Stoppa' : 'Spela igenom'; }
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            playing = false;
            updatePlayBtn();
        }
        function startAnim() {
            stopAnim();
            var xStart = state.x >= X_MAX - 0.05 ? X_MIN : state.x;
            state.x = xStart; rowX.sync(); update();
            var T_MS = 6000, t0 = null;
            playing = true; updatePlayBtn();
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.x = xStart + (X_MAX - xStart) * p;
                rowX.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; playing = false; state.x = X_MAX; rowX.sync(); update(); updatePlayBtn(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar x-markör (övre systemets x-axel) ──────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xv = clampNum(Math.round(toWorldX(e.clientX) / X_STEP) * X_STEP, X_MIN, X_MAX);
            state.x = xv;
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Areapolygon: fyllning mellan kurvan och x-axeln på [t0, t1] ───
        function areaPolygonD(axisY, t0, t1) {
            if (t1 <= t0 + 1e-6) return '';
            var N = Math.max(2, Math.round((t1 - t0) / 0.05));
            var d = 'M ' + X(t0).toFixed(1) + ' ' + axisY.toFixed(1) + ' ';
            for (var i = 0; i <= N; i++) {
                var t = t0 + (t1 - t0) * i / N;
                d += 'L ' + X(t).toFixed(1) + ' ' + Y(f(t)).toFixed(1) + ' ';
            }
            d += 'L ' + X(t1).toFixed(1) + ' ' + axisY.toFixed(1) + ' Z';
            return d;
        }

        // ── Rita övre systemet (f) ─────────────────────────────────────────
        var clipId1 = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var x = state.x;
            var axisY = Y(0), axisX = X(0);
            var i;

            // Rutnät
            for (i = 1; i <= 7; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = -6; i <= 6; i += 2) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (hoppar över de som krockar med markörens etikett)
            [0, 2, 4, 6, 8].forEach(function (v) {
                if (Math.abs(v - x) < 0.6) return;
                svg.appendChild(svgVarText(
                    { x: X(v), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(v)]));
            });
            for (i = -6; i <= 6; i += 2) {
                if (i === 0) continue;
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId1 });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId1 + ')' });
            svg.appendChild(g);

            // Areaskuggning: grönt 0→min(x,X0), rött X0→x
            var posEnd = Math.min(x, X0);
            if (posEnd > 0.001) {
                g.appendChild(svgEl('path', { d: areaPolygonD(axisY, 0, posEnd), fill: COL.areaPos }));
            }
            if (x > X0 + 0.001) {
                g.appendChild(svgEl('path', { d: areaPolygonD(axisY, X0, x), fill: COL.areaNeg }));
            }

            // Kurvan f(x)
            var d = '', N = 200;
            for (i = 0; i <= N; i++) {
                var xv = 8 * i / N;
                d += (i === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y(f(xv)).toFixed(1) + ' ';
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Lodrät kopplingslinje (från kurvan, genom axeln, ner mot undre systemet)
            g.appendChild(svgEl('line', {
                x1: X(x), y1: Y(f(x)), x2: X(x), y2: T + PH,
                stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
            }));

            // Kurvetikett i fri yta (övre vänstra hörnet, ovanför kurvans max)
            svg.appendChild(svgVarText(
                { x: X(0.3), y: T + 18, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.curve },
                ['*f', '(', '*x', ') = 4 − 0,25(', '*x', ' − 2)²']));

            // Punkt på kurvan (avläsning av f(x), ej dragbar)
            g.appendChild(svgEl('circle', { cx: X(x), cy: Y(f(x)), r: 4.5, fill: COL.curve }));

            // Dragbart handtag på x-axeln
            var hx = X(x), hy = axisY;
            svg.appendChild(svgEl('circle', { cx: hx, cy: hy, r: 6, fill: COL.axis }));
            var hit = svgEl('circle', { cx: hx, cy: hy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);

            // x-avläsning under axeln (förskjuten åt höger nära y-axeln, så
            // texten inte hamnar ovanpå axellinjen)
            var xLabelNearAxis = x < 0.45;
            svg.appendChild(svgVarText(
                {
                    x: xLabelNearAxis ? hx + 9 : hx, y: axisY + 16, 'font-size': 12.5,
                    'text-anchor': xLabelNearAxis ? 'start' : 'middle', fill: COL.axis
                },
                ['*x', ' = ' + fmt(x, 2)]));
        }

        // ── Rita undre systemet (A) ─────────────────────────────────────────
        var clipId2 = 'lab-vis-clip-' + (uid++);
        function drawTrace() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var x = state.x;
            var axisY2 = Y2(0), axisX2 = X(0);
            var i;

            for (i = 1; i <= 7; i++) {
                svg2.appendChild(svgEl('line', { x1: X(i), y1: T2, x2: X(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 4; i <= 20; i += 4) {
                svg2.appendChild(svgEl('line', { x1: L, y1: Y2(i), x2: L + PW, y2: Y2(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            svg2.appendChild(svgEl('line', { x1: L, y1: axisY2, x2: L + PW + 6, y2: axisY2, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY2 + ' ' + (L + PW + 4) + ',' + (axisY2 - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY2 + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX2, y1: T2 + PH2, x2: axisX2, y2: 16, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX2 + ',6 ' + (axisX2 - 4.5) + ',16 ' + (axisX2 + 4.5) + ',16', fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: W - 4, y: axisY2 + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisX2 + 10, y: 16, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis },
                ['*A', '(', '*x', ')']));

            [0, 2, 4, 6, 8].forEach(function (v) {
                if (Math.abs(v - x) < 0.6) return;
                svg2.appendChild(svgVarText(
                    { x: X(v), y: axisY2 + 15, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(v)]));
            });
            for (i = 4; i <= 20; i += 4) {
                svg2.appendChild(svgVarText(
                    { x: axisX2 - 6, y: Y2(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            // A(x)-kurvan, spårad 0 → x
            if (x > 0.001) {
                var N = Math.max(2, Math.round(x / 0.04)), d = '';
                for (i = 0; i <= N; i++) {
                    var t = x * i / N;
                    d += (i === 0 ? 'M' : 'L') + X(t).toFixed(1) + ' ' + Y2(Acc(t)).toFixed(1) + ' ';
                }
                g.appendChild(svgEl('path', {
                    d: d, fill: 'none', stroke: COL.acc, 'stroke-width': 2.4,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            }

            // Toppmarkering vid X0 (syns när markören har passerat den)
            if (x >= X0 - 0.001) {
                g.appendChild(svgEl('circle', { cx: X(X0), cy: Y2(Acc(X0)), r: 4, fill: COL.tangent }));
            }

            // Tangent vid markören (steg 3) — ritas alltid, även vid x = 0
            // (klipps naturligt av panelens vänsterkant där)
            if (state.step >= 3) {
                var slope = f(x), dxs = 1.0;
                var xa = x - dxs, xb = x + dxs;
                var ya = Acc(x) - slope * dxs, yb = Acc(x) + slope * dxs;
                g.appendChild(svgEl('line', {
                    x1: X(xa), y1: Y2(ya), x2: X(xb), y2: Y2(yb),
                    stroke: COL.tangent, 'stroke-width': 2.2
                }));
            }

            // Lodrät kopplingslinje (från toppen av panelen ner till A-kurvans punkt)
            g.appendChild(svgEl('line', {
                x1: X(x), y1: T2, x2: X(x), y2: Y2(Acc(x)),
                stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
            }));

            // Aktuell punkt (A(x)) — ej klippt, syns även vid kanterna
            svg2.appendChild(svgEl('circle', { cx: X(x), cy: Y2(Acc(x)), r: 4.5, fill: COL.acc }));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var x = state.x, fx = f(x), ax = Acc(x);
            var xT = fmtTex(x, 2), axT = fmtTex(ax, 2);
            katexInto(formelAcc, 'A(' + xT + ') = \\int_0^{' + xT + '} f(t)\\,dt = ' + axT);
            if (state.step >= 3) {
                var fxT = fmtTex(fx, 2);
                katexInto(pairLeft, 'f(' + xT + ') = ' + fxT);
                katexInto(pairRight, "A'(" + xT + ') = ' + fxT);
                katexInto(formelTheorem, '\\int_a^b f(x)\\, dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a)');
            }
        }
        function updateNote() {
            var x = state.x;
            if (Math.abs(x - X0) < 0.12) {
                note.innerHTML = (state.step >= 3)
                    ? 'Nu är <em>f</em>(<em>x</em>) = 0 — arean har precis sin topp, ' +
                      'och tangenten är vågrät.'
                    : 'Nu är <em>f</em>(<em>x</em>) = 0 — arean har precis sin topp: den ' +
                      'slutar växa och börjar krympa.';
            } else if (x < X0) {
                note.innerHTML = 'Arean växer just nu, eftersom <em>f</em>(<em>x</em>) är positiv.';
            } else {
                note.innerHTML = 'Arean krymper nu, eftersom <em>f</em>(<em>x</em>) är negativ.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legAcc.style.display = state.step >= 2 ? '' : 'none';
            legTangent.style.display = state.step >= 3 ? '' : 'none';
            pairWrap.style.display = state.step >= 3 ? '' : 'none';
            formelTheorem.style.display = state.step >= 3 ? '' : 'none';
            scene2.style.display = state.step >= 2 ? '' : 'none';
            drawMain();
            if (state.step >= 2) drawTrace();
            updateFormulas();
            updateNote();
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
    window.VISUALISERINGAR['ma3c-5.4'] = { mount: mount };
})();
