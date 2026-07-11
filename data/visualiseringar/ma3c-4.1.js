/* ma3c-4.1.js — visualisering: "Konkavitetsbilen — teckentabellen som
 * körjournal". Hör till ma3c-4.1 (växande/avtagande), ma3c-4.2 (derivatans
 * nollställen och extrempunktens karaktär), ma3c-4.4 (andraderivatan och
 * grafen) och ma3c-4.5 (andraderivatametoden).
 *
 * Kärninsikt: teckentabellen är ingen död bokföring — den är en KÖRJOURNAL
 * över en resa längs kurvan. f′ är lutningen man känner i ratten, f″ är hur
 * lutningen ÄNDRAS.
 *
 * Funktionen är f(x) = x³ − 3x²  (f′(x) = 3x² − 6x, f″(x) = 6x − 6):
 *   lokal maximipunkt vid x = 0 (f(0) = 0)
 *   lokal minimipunkt  vid x = 2 (f(2) = −4)
 *   inflexionspunkt    vid x = 1 (f(1) = −2)
 * Detta är exakt det härledningstabellen i ma3c-4.4 beskriver abstrakt
 * (extrempunkter x = b och x = c, inflexionspunkt x = z mellan dem).
 *
 * Tre steg (lager):
 *   1. Kör!               — bilen (sidosilhuett) står på kurvan och lutar
 *                            som tangenten. Lutningsmätare (f′). Vändpunkter
 *                            (hålmarkeringar) tänds när bilen passerar dem.
 *   2. Teckentabellen byggs — 5-kolumnstabell (som i ma3c-4.2) fylls i live
 *                            i takt med resan. "Kör hela vägen"-knapp.
 *   3. Andraderivatan       — f″-mätare tillkommer, tabellen utökas till 7
 *                            kolumner med f″-rad, kurvan färgkodas efter
 *                            konkavitet (som i ma3c-4.4:s figur), inflexions-
 *                            punkten tänds när bilen passerar x = 1.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3).
 * API: window.VISUALISERINGAR['<id>'] = { mount(el) → { destroy() } }.
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
        curve: '#2563c9',      // neutral kurvfärg / konkav (f″ < 0)
        convex: '#c8324a',     // konvex (f″ > 0) / accent
        grow: '#4a7d3a',       // f′ > 0 — växande
        fall: '#c8324a',       // f′ < 0 — avtagande
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        carBody: '#c8324a',
        carInk: '#1f2530',
        white: '#ffffff'
    };

    var EPS = 0.04;
    var uid = 0;

    // ── Funktionen och dess derivator ─────────────────────────────────
    function fVal(x) { return x * x * x - 3 * x * x; }
    function fp(x) { return 3 * x * x - 6 * x; }
    function fpp(x) { return 6 * x - 6; }
    var X_MAX_PT = 0, F_MAX_PT = 0;
    var X_MIN_PT = 2, F_MIN_PT = -4;
    var X_INFL = 1, F_INFL = -2;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var XMIN = -1, XMAX = 3.2, YMIN = -5, YMAX = 3;
        var X_MIN = -0.9, X_MAX = 3.1, X_STEP = 0.02;
        var state = { x: X_MIN, step: 1, maxReached: X_MIN };
        var driveAnimId = null;

        // ── Geometri ──────────────────────────────────────────────────
        var W = 560, H = 420, L = 48, R = 24, T = 18, B = 44;
        var PW = W - L - R, PH = H - T - B;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
        var axisX = X(0), axisY = Y(0);

        function screenTangent(x) {
            var d = 0.045;
            var x1 = x - d, x2 = x + d;
            var p1x = X(x1), p1y = Y(fVal(x1));
            var p2x = X(x2), p2y = Y(fVal(x2));
            var ang = Math.atan2(p2y - p1y, p2x - p1x);
            return { rad: ang, deg: ang * 180 / Math.PI, sx: X(x), sy: Y(fVal(x)) };
        }

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Konkavitetsbilen — teckentabellen som körjournal';
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
            'aria-label': 'Interaktiv graf: kurvan f av x lika med x i tredje minus ' +
                '3x i kvadrat, med en liten bil som kör längs kurvan och lutar som ' +
                'tangenten. Dra bilen eller x-glidaren för att se hur lutningen ändras.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        // ── Instrumentpanel (egna inline-stylade kort) ───────────────
        var panel = document.createElement('div');
        panel.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;' +
            'gap:12px;margin:14px 0 2px;';
        card.appendChild(panel);

        function makeGaugeCard(labelText) {
            var c = document.createElement('div');
            c.style.cssText = 'flex:1 1 230px;max-width:270px;background:var(--lab-bg-panel);' +
                'border:1px solid var(--lab-line-strong);border-radius:8px;' +
                'padding:9px 14px;display:flex;align-items:center;gap:10px;';
            var iconWrap = document.createElement('div');
            iconWrap.style.cssText = 'flex:0 0 auto;display:flex;align-items:center;justify-content:center;';
            var isvg = svgEl('svg', { viewBox: '0 0 40 40', width: 34, height: 34 });
            var g = svgEl('g', {});
            var line = svgEl('line', { x1: 7, y1: 20, x2: 27, y2: 20, 'stroke-width': 2.6, 'stroke-linecap': 'round' });
            var head = svgEl('polygon', { points: '33,20 25,15.5 25,24.5' });
            g.appendChild(line); g.appendChild(head);
            isvg.appendChild(g);
            iconWrap.appendChild(isvg);
            var textWrap = document.createElement('div');
            textWrap.style.cssText = 'flex:1 1 auto;min-width:0;';
            var lbl = document.createElement('div');
            lbl.style.cssText = 'font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;' +
                'color:var(--lab-ink-soft);margin-bottom:2px;';
            lbl.textContent = labelText;
            var val = document.createElement('div');
            val.style.cssText = 'font-size:15.5px;min-height:20px;';
            var desc = document.createElement('div');
            desc.style.cssText = 'font-size:12px;margin-top:2px;line-height:1.35;';
            textWrap.appendChild(lbl); textWrap.appendChild(val); textWrap.appendChild(desc);
            c.appendChild(iconWrap); c.appendChild(textWrap);
            return { card: c, g: g, line: line, head: head, val: val, desc: desc };
        }
        var gauge1 = makeGaugeCard('Lutning');
        var gauge2 = makeGaugeCard('Andraderivatan');
        panel.appendChild(gauge1.card);
        panel.appendChild(gauge2.card);

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

        // ── Teckentabellen ────────────────────────────────────────────
        var tableWrap = document.createElement('div');
        tableWrap.style.cssText = 'margin-top:14px;';
        var tableTitle = document.createElement('div');
        tableTitle.style.cssText = 'text-align:center;font-size:12px;letter-spacing:.06em;' +
            'text-transform:uppercase;color:var(--lab-ink-soft);margin-bottom:6px;';
        tableTitle.textContent = 'Teckentabellen — körjournalen';
        var tableScroll = document.createElement('div');
        tableScroll.style.cssText = 'overflow-x:auto;';
        var table = document.createElement('table');
        table.style.cssText = 'border-collapse:collapse;margin:0 auto;font-size:13.5px;';
        tableScroll.appendChild(table);
        tableWrap.appendChild(tableTitle);
        tableWrap.appendChild(tableScroll);
        card.appendChild(tableWrap);

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
            { n: 1, label: '1 · Kör!' },
            { n: 2, label: '2 · Teckentabellen byggs' },
            { n: 3, label: '3 · Andraderivatan' }
        ];
        var INSTR = {
            1: 'Dra bilen längs vägen (eller använd <em>x</em>-glidaren). ' +
               'Lutningsmätaren visar <em>f</em>′(<em>x</em>) — bilens egen lutning ' +
               'i ratten. Vid en vändpunkt (<em>f</em>′(<em>x</em>) = 0) står bilen ' +
               'vågrätt, och en markering tänds på kurvan.',
            2: 'Kör vägen från vänster till höger — teckentabellen fylls i, kolumn ' +
               'för kolumn, i takt med resan. Ofärdiga kolumner är tomma tills du ' +
               'kört förbi dem. Tryck på "Kör hela vägen" för att se hela sträckan ' +
               'i ett svep.',
            3: '<em>f</em>″(<em>x</em>) beskriver hur lutningen ändras. Där ' +
               '<em>f</em>″(<em>x</em>) > 0 böjer kurvan uppåt (konvex, röd); där ' +
               '<em>f</em>″(<em>x</em>) < 0 böjer den nedåt (konkav, blå). Vid ' +
               '<em>x</em> = 1 byter kurvan bukt — kör dit för att tända ' +
               'inflexionspunkten.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopDrive(); state.step = s.n; update(); });
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
            return span;
        }
        var legCurve = legendItem(COL.curve, '<em>f</em>(<em>x</em>) = <em>x</em>³ − 3<em>x</em>²');
        var legTurn = legendItem(COL.convex, 'vändpunkt (<em>f</em>′(<em>x</em>) = 0)');
        var legConcave = legendItem(COL.curve, 'konkav (<em>f</em>″(<em>x</em>) &lt; 0)');
        var legConvex = legendItem(COL.convex, 'konvex (<em>f</em>″(<em>x</em>) &gt; 0)');
        var legInfl = legendItem(COL.axis, 'inflexionspunkt (<em>f</em>″(<em>x</em>) = 0)');
        legend.appendChild(legCurve);
        legend.appendChild(legTurn);
        legend.appendChild(legConcave);
        legend.appendChild(legConvex);
        legend.appendChild(legInfl);

        // ── "Kör hela vägen"-knapp ────────────────────────────────────
        var driveBtn = document.createElement('button');
        driveBtn.type = 'button';
        driveBtn.className = 'lab-btn';
        driveBtn.textContent = 'Kör hela vägen';
        driveBtn.addEventListener('click', function () { startDrive(); });
        actions.appendChild(driveBtn);

        // ── Glidare (x) ───────────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.convex + ' 0%, ' +
                    COL.convex + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopDrive();
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
        function setX(v) {
            state.x = Math.round(v / X_STEP) * X_STEP;
            state.maxReached = Math.max(state.maxReached, state.x);
        }
        var rowX = makeRow('x', X_MIN, X_MAX, X_STEP,
            function () { return state.x; }, setX);

        // ── Återställ ─────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Börja om';
        reset.addEventListener('click', function () {
            stopDrive();
            state.x = X_MIN; state.maxReached = X_MIN;
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: kör hela vägen ─────────────────────────────────
        function stopDrive() {
            if (driveAnimId != null) { cancelAnimationFrame(driveAnimId); driveAnimId = null; }
        }
        function startDrive() {
            stopDrive();
            state.x = X_MIN; state.maxReached = X_MIN;
            rowX.sync(); update();
            var T_MS = 5200, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.x = X_MIN + (X_MAX - X_MIN) * p;
                state.maxReached = Math.max(state.maxReached, state.x);
                rowX.sync();
                update();
                if (p < 1) driveAnimId = requestAnimationFrame(frame);
                else {
                    driveAnimId = null;
                    state.x = X_MAX; state.maxReached = Math.max(state.maxReached, X_MAX);
                    rowX.sync(); update();
                }
            }
            driveAnimId = requestAnimationFrame(frame);
        }

        // ── Dra bilen i scenen ────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            stopDrive();
            var xw = clampNum(toWorldX(e.clientX), X_MIN, X_MAX);
            setX(xw);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Bilens siluett (lokala koordinater: (0,0) = vägkontakt) ────
        function buildCar(x) {
            var t = screenTangent(x);
            var g = svgEl('g', {
                transform: 'translate(' + t.sx.toFixed(1) + ',' + t.sy.toFixed(1) + ') rotate(' + t.deg.toFixed(1) + ')'
            });
            // Hjul (bakom karossen)
            g.appendChild(svgEl('circle', { cx: -15, cy: -6, r: 6, fill: COL.carInk }));
            g.appendChild(svgEl('circle', { cx: -15, cy: -6, r: 2, fill: '#f3eee4' }));
            g.appendChild(svgEl('circle', { cx: 15, cy: -6, r: 6, fill: COL.carInk }));
            g.appendChild(svgEl('circle', { cx: 15, cy: -6, r: 2, fill: '#f3eee4' }));
            // Kaross
            g.appendChild(svgEl('path', {
                d: 'M -24 -10 L -24 -15 Q -24 -18 -21 -18 L -12 -18 Q -8 -25 0 -25 ' +
                   'L 9 -25 Q 15 -25 17 -18 L 21 -18 Q 25 -18 25 -14 L 25 -10 Z',
                fill: COL.carBody, stroke: COL.carInk, 'stroke-width': 1.1, 'stroke-linejoin': 'round'
            }));
            // Vindruta/dörrskarv
            g.appendChild(svgEl('line', {
                x1: 2, y1: -18, x2: 2, y2: -10, stroke: COL.carInk, 'stroke-width': 0.9, opacity: 0.4
            }));
            g.appendChild(svgEl('path', {
                d: 'M -10 -18 L -6.5 -24 L 8 -24 L 10.5 -18 Z',
                fill: '#f3eee4', stroke: COL.carInk, 'stroke-width': 0.8, opacity: 0.85
            }));
            // Framlykta
            g.appendChild(svgEl('circle', { cx: 24, cy: -13, r: 1.6, fill: '#f3eee4' }));
            return g;
        }

        // ── Rita huvudscenen ─────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var x = state.x, k = fp(x), k2 = fpp(x);
            var i;

            // Rutnät
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = Math.ceil(YMIN); i <= Math.floor(YMAX); i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: T + 4, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 8) + ' ' + (axisX - 4.5) + ',' + (T + 4) + ' ' + (axisX + 4.5) + ',' + (T + 4), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 6, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T + 12, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter: x-heltal (hoppa när bilen är nära), y-heltal (hoppa 0)
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                if (Math.abs(i - x) < 0.32) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = Math.ceil(YMIN); i <= Math.floor(YMAX); i++) {
                if (i === 0) continue;
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

            // Kurvan f(x) = x³ − 3x² — enfärgad i steg 1–2, konkav/konvex-
            // färgkodad (delad vid inflexionen) i steg 3
            function pathFor(x0, x1) {
                var d = '', penDown = false, N = 160;
                for (var j = 0; j <= N; j++) {
                    var xv = x0 + (x1 - x0) * j / N;
                    var yv = fVal(xv);
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    penDown = true;
                }
                return d;
            }
            if (state.step >= 3) {
                g.appendChild(svgEl('path', {
                    d: pathFor(XMIN, X_INFL), fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
                g.appendChild(svgEl('path', {
                    d: pathFor(X_INFL, XMAX), fill: 'none', stroke: COL.convex, 'stroke-width': 2.4,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            } else {
                g.appendChild(svgEl('path', {
                    d: pathFor(XMIN, XMAX), fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            }

            // Kurvetikett i fri yta uppe till vänster (curve max där är 0,
            // långt under y = 2) — ankrad mot vänster om y-axeln
            svg.appendChild(svgVarText(
                { x: axisX - 16, y: Y(2) + 4, 'font-size': 13, 'text-anchor': 'end', fill: COL.curve },
                ['*f', '(', '*x', ') = ', '*x', '³ − 3', '*x', '²']));

            // Tangentlinje under bilen (kort, streckad, färgad efter tecken)
            var tcol = k > EPS ? COL.grow : (k < -EPS ? COL.fall : COL.axis);
            var tang = screenTangent(x);
            var half = 46;
            g.appendChild(svgEl('line', {
                x1: tang.sx - half * Math.cos(tang.rad), y1: tang.sy - half * Math.sin(tang.rad),
                x2: tang.sx + half * Math.cos(tang.rad), y2: tang.sy + half * Math.sin(tang.rad),
                stroke: tcol, 'stroke-width': 2, 'stroke-dasharray': '7 5'
            }));

            // Vändpunktmarkeringar (max/min) — tänds när körjournalen passerat dem
            function turnMarker(px, py, visited) {
                if (visited) {
                    svg.appendChild(svgEl('circle', { cx: X(px), cy: Y(py), r: 4.6, fill: COL.convex, stroke: COL.axis, 'stroke-width': 1 }));
                } else {
                    svg.appendChild(svgEl('circle', { cx: X(px), cy: Y(py), r: 3.4, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.4, opacity: 0.55 }));
                }
            }
            var visitedMax = state.maxReached >= X_MAX_PT - EPS;
            var visitedMin = state.maxReached >= X_MIN_PT - EPS;
            turnMarker(X_MAX_PT, F_MAX_PT, visitedMax);
            turnMarker(X_MIN_PT, F_MIN_PT, visitedMin);
            if (visitedMax) {
                // Bilens kaross sträcker sig ±25 px lokalt kring punkten när
                // den står vågrätt (vändpunkt) — offsetta etiketten bortom
                // karossens högerkant så den aldrig hamnar under bilen.
                svg.appendChild(svgEl('text', {
                    x: X(X_MAX_PT) + 36, y: Y(F_MAX_PT) - 12, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.axis
                })).textContent = 'Maximipunkt';
            }
            if (visitedMin) {
                svg.appendChild(svgEl('text', {
                    x: X(X_MIN_PT) + 14, y: Y(F_MIN_PT) + 22, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.axis
                })).textContent = 'Minimipunkt';
            }

            // Inflexionsmarkering — bara i steg 3, samma stil som ma3c-4.4:s figur
            if (state.step >= 3) {
                var visitedInfl = state.maxReached >= X_INFL - EPS;
                svg.appendChild(svgEl('circle', {
                    cx: X(X_INFL), cy: Y(F_INFL), r: 3.5, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.6,
                    opacity: visitedInfl ? 1 : 0.4
                }));
                if (visitedInfl) {
                    svg.appendChild(svgEl('text', {
                        x: X(X_INFL) + 34, y: Y(F_INFL) - 30, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.axis
                    })).textContent = 'Inflexionspunkt';
                }
            }

            // Bilen + osynlig träffyta för dragning
            svg.appendChild(buildCar(x));
            var hit = svgEl('circle', { cx: tang.sx, cy: tang.sy, r: 22, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopDrive(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Instrumentpanelens mätare ──────────────────────────────────
        function updateGauges() {
            var x = state.x, k = fp(x);
            var col1 = k > EPS ? COL.grow : (k < -EPS ? COL.fall : COL.axis);
            katexInto(gauge1.val, "f'(x) = " + fmtTex(k, 2));
            gauge1.val.style.color = col1;
            gauge1.desc.textContent = k > EPS ? 'Bilen kör uppför — funktionen växer.' :
                (k < -EPS ? 'Bilen kör nedför — funktionen avtar.' : 'Bilen står vågrätt — vändpunkt.');
            gauge1.desc.style.color = col1;
            var deg1 = clampNum(-Math.atan(k) * 180 / Math.PI, -80, 80);
            gauge1.g.setAttribute('transform', 'rotate(' + deg1.toFixed(1) + ' 20 20)');
            gauge1.line.setAttribute('stroke', col1);
            gauge1.head.setAttribute('fill', col1);

            if (state.step >= 3) {
                var k2 = fpp(x);
                var col2 = k2 > EPS ? COL.convex : (k2 < -EPS ? COL.curve : COL.axis);
                katexInto(gauge2.val, "f''(x) = " + fmtTex(k2, 2));
                gauge2.val.style.color = col2;
                gauge2.desc.textContent = k2 > EPS ? 'Lutningen ökar — kurvan böjer uppåt (konvex).' :
                    (k2 < -EPS ? 'Lutningen minskar — kurvan böjer nedåt (konkav).' : 'Lutningen ändras inte — inflexionspunkt.');
                gauge2.desc.style.color = col2;
                var deg2 = clampNum(-Math.atan(k2) * 180 / Math.PI, -80, 80);
                gauge2.g.setAttribute('transform', 'rotate(' + deg2.toFixed(1) + ' 20 20)');
                gauge2.line.setAttribute('stroke', col2);
                gauge2.head.setAttribute('fill', col2);
            }
        }

        // ── Formler (live-substituerade) ───────────────────────────────
        function updateFormulas() {
            var x = state.x, k = fp(x);
            var xT = fmtTex(x, 2), kT = fmtTex(k, 2);
            var col1 = k > EPS ? COL.grow : (k < -EPS ? COL.fall : COL.axis);
            formelA.style.color = col1;
            katexInto(formelA,
                "f'(" + xT + ') = 3x^2-6x = 3\\cdot(' + xT + ')^2-6\\cdot(' + xT + ') = ' + kT);
            if (state.step >= 3) {
                var k2 = fpp(x);
                var k2T = fmtTex(k2, 2);
                var col2 = k2 > EPS ? COL.convex : (k2 < -EPS ? COL.curve : COL.axis);
                formelB.style.color = col2;
                katexInto(formelB, "f''(" + xT + ') = 6x-6 = 6\\cdot(' + xT + ')-6 = ' + k2T);
            } else formelB.textContent = '';
        }

        // ── Statustext (körjournalens berättarröst) ────────────────────
        function updateNote() {
            var x = state.x;
            var atMax = Math.abs(x - X_MAX_PT) < EPS + 0.02;
            var atMin = Math.abs(x - X_MIN_PT) < EPS + 0.02;
            var atInfl = state.step >= 3 && Math.abs(x - X_INFL) < EPS + 0.02;
            if (atMax) note.innerHTML = 'Bilen står vågrätt — <em>f</em>′(<em>x</em>) = 0. Lutningen växlar från positiv till negativ: det här är en <strong>maximipunkt</strong>.';
            else if (atMin) note.innerHTML = 'Bilen står vågrätt — <em>f</em>′(<em>x</em>) = 0. Lutningen växlar från negativ till positiv: det här är en <strong>minimipunkt</strong>.';
            else if (atInfl) note.innerHTML = 'Kurvan byter bukt här — <em>f</em>″(<em>x</em>) = 0: det här är en <strong>inflexionspunkt</strong>.';
            else if (x < X_MAX_PT) note.innerHTML = 'Bilen kör uppför — funktionen växer, <em>f</em>′(<em>x</em>) > 0.';
            else if (x < X_MIN_PT) note.innerHTML = 'Bilen kör nedför — funktionen avtar, <em>f</em>′(<em>x</em>) < 0.';
            else note.innerHTML = 'Bilen kör uppför igen — funktionen växer, <em>f</em>′(<em>x</em>) > 0.';
        }

        // ── Teckentabellen ──────────────────────────────────────────────
        var COLS5 = [
            { key: 'lt0', label: '<em>x</em> &lt; 0', type: 'always', x: -Infinity, fp: '+', f: 'nearrow' },
            { key: 'eq0', label: '<em>x</em> = 0', type: 'point', x: 0, fp: '0', f: '0 (max)' },
            { key: 'mid', label: '0 &lt; <em>x</em> &lt; 2', type: 'interval', x: 0, fp: '−', f: 'searrow' },
            { key: 'eq2', label: '<em>x</em> = 2', type: 'point', x: 2, fp: '0', f: '−4 (min)' },
            { key: 'gt2', label: '<em>x</em> &gt; 2', type: 'interval', x: 2, fp: '+', f: 'nearrow' }
        ];
        var COLS7 = [
            { key: 'lt0', label: '<em>x</em> &lt; 0', type: 'always', x: -Infinity, fp: '+', f: 'nearrow', fpp: '−' },
            { key: 'eq0', label: '<em>x</em> = 0', type: 'point', x: 0, fp: '0', f: '0 (max)', fpp: '−' },
            { key: 'm1', label: '0 &lt; <em>x</em> &lt; 1', type: 'interval', x: 0, fp: '−', f: 'searrow', fpp: '−' },
            { key: 'eq1', label: '<em>x</em> = 1', type: 'point', x: 1, fp: '−', f: '−2 (inflexion)', fpp: '0' },
            { key: 'm2', label: '1 &lt; <em>x</em> &lt; 2', type: 'interval', x: 1, fp: '−', f: 'searrow', fpp: '+' },
            { key: 'eq2', label: '<em>x</em> = 2', type: 'point', x: 2, fp: '0', f: '−4 (min)', fpp: '+' },
            { key: 'gt2', label: '<em>x</em> &gt; 2', type: 'interval', x: 2, fp: '+', f: 'nearrow', fpp: '+' }
        ];
        function isRevealed(c) {
            if (c.type === 'always') return true;
            if (c.type === 'point') return state.maxReached >= c.x - EPS;
            return state.maxReached > c.x + EPS;
        }
        function fpColor(sign) { return sign === '+' ? COL.grow : (sign === '−' ? COL.fall : COL.axis); }
        function fppColor(sign) { return sign === '+' ? COL.convex : (sign === '−' ? COL.curve : COL.axis); }
        function placeholder() { return '<span style="color:var(--lab-line-strong);">…</span>'; }
        function fpCellHtml(c) {
            return '<span style="color:' + fpColor(c.fp) + ';font-weight:700;">' + c.fp + '</span>';
        }
        function fCellHtml(c) {
            if (c.f === 'nearrow') return '<span style="color:' + COL.grow + ';font-weight:600;font-size:16px;">↗</span>';
            if (c.f === 'searrow') return '<span style="color:' + COL.fall + ';font-weight:600;font-size:16px;">↘</span>';
            var m = /^(.*) \((.*)\)$/.exec(c.f);
            return '<span style="color:' + COL.axis + ';font-weight:700;">' + m[1] + '</span>' +
                '<div style="font-size:10px;color:var(--lab-ink-soft);margin-top:1px;">(' + m[2] + ')</div>';
        }
        function fppCellHtml(c) {
            return '<span style="color:' + fppColor(c.fpp) + ';font-weight:700;">' + c.fpp + '</span>';
        }
        function styleHeadCell(cell) {
            cell.style.cssText = 'padding:6px 11px;border-bottom:2px solid var(--lab-ink);' +
                'font-size:12.5px;text-align:center;white-space:nowrap;color:var(--lab-ink);';
        }
        function styleRowHeadCell(cell) {
            cell.style.cssText = 'padding:6px 11px;border-bottom:1px solid var(--lab-line);' +
                'border-right:1px solid var(--lab-line-strong);font-weight:600;text-align:right;' +
                'white-space:nowrap;background:var(--lab-bg-raised);color:var(--lab-ink);';
        }
        function styleCell(cell) {
            cell.style.cssText = 'padding:6px 11px;border-bottom:1px solid var(--lab-line);' +
                'text-align:center;white-space:nowrap;min-width:56px;';
        }
        function rowEl(labelHtml, cols, cellFn) {
            var tr = document.createElement('tr');
            var th = document.createElement('td');
            th.innerHTML = labelHtml;
            styleRowHeadCell(th);
            tr.appendChild(th);
            cols.forEach(function (c) {
                var td = document.createElement('td');
                styleCell(td);
                td.innerHTML = isRevealed(c) ? cellFn(c) : placeholder();
                tr.appendChild(td);
            });
            return tr;
        }
        function renderTable() {
            while (table.firstChild) table.removeChild(table.firstChild);
            var cols = state.step >= 3 ? COLS7 : COLS5;
            var trX = document.createElement('tr');
            var corner = document.createElement('th');
            corner.innerHTML = '<em>x</em>';
            styleHeadCell(corner);
            corner.style.borderRight = '1px solid var(--lab-line-strong)';
            trX.appendChild(corner);
            cols.forEach(function (c) {
                var th = document.createElement('th');
                th.innerHTML = c.label;
                styleHeadCell(th);
                trX.appendChild(th);
            });
            table.appendChild(trX);
            table.appendChild(rowEl('<em>f</em>&prime;(<em>x</em>)', cols, fpCellHtml));
            table.appendChild(rowEl('<em>f</em>(<em>x</em>)', cols, fCellHtml));
            if (state.step >= 3) {
                table.appendChild(rowEl('<em>f</em>&Prime;(<em>x</em>)', cols, fppCellHtml));
            }
        }

        // ── Visa/dölj per steg + omritning ─────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legCurve.style.display = state.step < 3 ? '' : 'none';
            legConcave.style.display = state.step >= 3 ? '' : 'none';
            legConvex.style.display = state.step >= 3 ? '' : 'none';
            legInfl.style.display = state.step >= 3 ? '' : 'none';
            gauge2.card.style.display = state.step >= 3 ? '' : 'none';
            formelB.style.display = state.step >= 3 ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';
            tableWrap.style.display = state.step >= 2 ? '' : 'none';
            drawMain();
            updateGauges();
            updateFormulas();
            updateNote();
            if (state.step >= 2) renderTable();
        }

        update();

        return {
            destroy: function () {
                stopDrive();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-4.1'] = api;
    window.VISUALISERINGAR['ma3c-4.2'] = api;
    window.VISUALISERINGAR['ma3c-4.4'] = api;
    window.VISUALISERINGAR['ma3c-4.5'] = api;
})();
