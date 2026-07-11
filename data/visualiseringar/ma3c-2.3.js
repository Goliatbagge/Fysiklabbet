/* ma3c-2.3.js — visualisering: "Sekanten blir tangent" (derivatans
 * definition). Hör till ma3c-2.1 (sekantens lutning), ma3c-2.2 (tangentens
 * lutning) och ma3c-2.3 (derivatans definition).
 *
 * Funktionen är f(x) = x² med startläget a = 5 — samma som Exempel 1 i
 * genomgången (f'(5) = 10), så eleven kan "spela upp" exemplet.
 *
 * Fyra steg (lager):
 *   1. Sekanten       — kurva + två dragbara punkter + sekant, h-glidare.
 *   2. Ändringskvoten — formeln med aktuella värden, live (grön som sekanten).
 *   3. Gränsvärdet    — knapp "Låt h gå mot 0", tangenten visas (röd),
 *                       lim-formeln med aktuellt a.
 *   4. Derivatan      — undre koordinatsystem: lutningen prickas in för
 *                       varje a man drar till; facit-linjen f'(x) = 2x.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js).
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
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    // Text med kursiva variabler: delar märkta med * i arrayen blir italic.
    // svgVarText(attrs, ['f', '(', 'a', '+', 'h', ')']) — strängar med
    // prefixet '*' kursiveras: ['*f', '(', '*a', '+', '*h', ')'].
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
        curve: '#2563c9',      // f(x) = x² — blå som teorifigurens kurva
        secant: '#4a7d3a',     // sekanten — grön som teorifigurens sekant
        tangent: '#c8324a',    // tangenten/derivatan — accentröd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var A_MIN = 0.5, A_MAX = 5.5, A_STEP = 0.05;
        var H_MIN = 0.01, H_MAX = 3, H_STEP = 0.01;
        var state = { a: 5, h: 2.5, step: 1, showFacit: false };
        var trail = [];            // [{a, k}] — prickar i derivata-planet
        var animId = null;         // rAF-id för "Låt h gå mot 0"
        function f(x) { return x * x; }
        function kNow() { return 2 * state.a + state.h; }   // exakt för x²

        // ── Geometri: huvudplot ───────────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -0.8, XMAX = 9.8, YMIN = -8, YMAX = 80;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── Geometri: derivata-plot (samma x-kolumner som huvudplotten) ───
        var H2 = 210, T2 = 12, B2 = 32;
        var PH2 = H2 - T2 - B2;
        var Y2MIN = -1.5, Y2MAX = 14;
        function Y2(y) { return T2 + (Y2MAX - y) / (Y2MAX - Y2MIN) * PH2; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Sekanten blir tangent';
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
            'aria-label': 'Interaktiv graf: kurvan f(x) = x-kvadrat med en sekant ' +
                'genom punkterna (a, f(a)) och (a+h, f(a+h)). Dra i punkterna eller ' +
                'glidarna för att ändra a och h.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.secant;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.tangent;
        card.appendChild(formelB);

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
            'aria-label': 'Koordinatsystem där sekantens lutning k prickas in ' +
                'för varje a. Prickarna bildar linjen f-prim av x lika med 2x ' +
                'när h är liten.'
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
            { n: 1, label: '1 · Sekanten' },
            { n: 2, label: '2 · Ändringskvoten' },
            { n: 3, label: '3 · Gränsvärdet' },
            { n: 4, label: '4 · Derivatan' }
        ];
        var INSTR = {
            1: 'En sekant är en rät linje genom två punkter på kurvan. Dra i den ' +
               'högra punkten (eller <em>h</em>-glidaren) och se hur sekantens ' +
               'lutning ändras. Avståndet i sidled mellan punkterna är <em>h</em>.',
            2: 'Sekantens lutning är ändringskvoten. Talen i formeln nedanför ' +
               'uppdateras live när du drar — följ hur <em>f</em>(<em>a</em>+<em>h</em>), ' +
               '<em>f</em>(<em>a</em>) och <em>h</em> byts ut mot aktuella värden.',
            3: 'Låt <em>h</em> gå mot 0: tryck på knappen eller dra ' +
               '<em>h</em>-glidaren långsamt åt vänster. Sekanten vrider sig mot ' +
               'tangenten, och ändringskvoten närmar sig ett gränsvärde — ' +
               'derivatan <em>f</em>′(<em>a</em>).',
            4: 'Derivatan är en egen funktion! Dra den vänstra punkten i sidled — ' +
               'lutningen prickas in i det undre koordinatsystemet för varje ' +
               '<em>a</em>. Gör <em>h</em> liten först. Vilket mönster bildar ' +
               'prickarna?'
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
        var legCurve = legendItem(COL.curve, '<em>f</em>(<em>x</em>) = <em>x</em>²');
        var legSecant = legendItem(COL.secant, 'sekant');
        var legTangent = legendItem(COL.tangent, 'tangent');
        legend.appendChild(legCurve);
        legend.appendChild(legSecant);
        legend.appendChild(legTangent);

        // ── Knappar/val i actions-raden ───────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Låt h gå mot 0';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        var facitLabel = document.createElement('label');
        facitLabel.className = 'lab-graf-check';
        var facitCb = document.createElement('input');
        facitCb.type = 'checkbox';
        facitCb.addEventListener('change', function () {
            state.showFacit = facitCb.checked;
            update();
        });
        facitLabel.appendChild(facitCb);
        var facitTxt = document.createElement('span');
        facitTxt.innerHTML = 'Visa mönstret: <em>f</em>′(<em>x</em>) = 2<em>x</em>';
        facitLabel.appendChild(facitTxt);
        actions.appendChild(facitLabel);

        var clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'lab-graf-reset';
        clearBtn.textContent = 'Rensa prickarna';
        clearBtn.addEventListener('click', function () { trail = []; update(); });
        actions.appendChild(clearBtn);

        // ── Glidare (a och h) ─────────────────────────────────────────────
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
        var lastTrailA = null;
        function pushTrail() {
            if (lastTrailA != null && Math.abs(state.a - lastTrailA) < 0.1) return;
            lastTrailA = state.a;
            trail.push({ a: state.a, k: kNow() });
            if (trail.length > 240) trail.shift();
        }
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = Math.round(v / A_STEP) * A_STEP; pushTrail(); });
        var rowH = makeRow('h', H_MIN, H_MAX, H_STEP,
            function () { return state.h; },
            function (v) { state.h = Math.round(v / H_STEP) * H_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.a = 5; state.h = 2.5; state.showFacit = false;
            trail = []; lastTrailA = null;
            facitCb.checked = false;
            rowA.sync(); rowH.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: h → 0 ──────────────────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var h0 = state.h > 0.2 ? state.h : 2.5;   // om h redan är litet: börja om
            state.h = h0;
            var T_MS = 2600, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.h = h0 * Math.pow(H_MIN / h0, p);
                rowH.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.h = H_MIN; rowH.sync(); update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragpunkter i scenen ──────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = null;   // 'P' | 'Q' | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = toWorldX(e.clientX);
            if (dragging === 'P') {
                state.a = clampNum(Math.round(xw / A_STEP) * A_STEP, A_MIN, A_MAX);
                pushTrail();
                rowA.sync();
            } else {
                state.h = clampNum(Math.round((xw - state.a) / H_STEP) * H_STEP, H_MIN, H_MAX);
                rowH.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita huvudscenen ──────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, h = state.h;
            var fa = f(a), fah = f(a + h), k = kNow();
            var axisY = Y(0), axisX = X(0);

            // Rutnät
            var i;
            for (i = 1; i <= 9; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 10; i <= 70; i += 10) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter: x-heltal (hoppa över dem som krockar med a/a+h),
            // y var 20:e.
            for (i = 1; i <= 9; i++) {
                if (Math.abs(i - a) < 0.7 || Math.abs(i - (a + h)) < 0.7) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = 20; i <= 60; i += 20) {
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

            // Sekant (grön, heldragen) — över hela fönstret
            var secY1 = fa + k * (XMIN - a), secY2 = fa + k * (XMAX - a);
            g.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(secY1), x2: X(XMAX), y2: Y(secY2),
                stroke: COL.secant, 'stroke-width': 2
            }));

            // Tangent (röd, streckad) — steg 3+
            if (state.step >= 3) {
                var kt = 2 * a;
                var tanY1 = fa + kt * (XMIN - a), tanY2 = fa + kt * (XMAX - a);
                g.appendChild(svgEl('line', {
                    x1: X(XMIN), y1: Y(tanY1), x2: X(XMAX), y2: Y(tanY2),
                    stroke: COL.tangent, 'stroke-width': 2, 'stroke-dasharray': '7 5'
                }));
            }

            // Kurvan f(x) = x²
            var d = '', penDown = false, N = 240;
            for (i = 0; i <= N; i++) {
                var xv = XMIN + (XMAX - XMIN) * i / N;
                var yv = f(xv);
                if (yv <= YMAX + 6) {
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Kurvetikett i lugn yta nere till vänster om parabelbågen
            svg.appendChild(svgVarText(
                { x: X(0.9), y: Y(7), 'font-size': 13, 'text-anchor': 'middle', fill: COL.curve },
                ['*f', '(', '*x', ') = ', '*x', '²']));

            // Δ-triangeln: P → hörn → Q (streckad)
            var Px = X(a), Py = Y(fa), Qx = X(a + h), Qy = Y(fah);
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: Qx, y2: Py, stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }));
            g.appendChild(svgEl('line', { x1: Qx, y1: Py, x2: Qx, y2: Qy, stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }));
            if (h >= 0.35) {
                // "h" under den vågräta kateten
                g.appendChild(svgVarText(
                    { x: (Px + Qx) / 2, y: Py + 15, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                    ['*h']));
                // "f(a+h) − f(a)" vid den lodräta kateten. Till höger om
                // kateten när det ryms (fri yta under kurvan); annars INUTI
                // triangeln, strax ovanför den vågräta kateten — aldrig på
                // sekantlinjen (hypotenusan).
                var right = (a + h) <= 7.5;
                g.appendChild(svgVarText(
                    {
                        x: right ? Qx + 7 : Qx - 7,
                        y: right ? (Py + Qy) / 2 + 4 : Y(fa + (fah - fa) * 0.18),
                        'font-size': 12.5,
                        'text-anchor': right ? 'start' : 'end',
                        fill: COL.axis
                    },
                    ['*f', '(', '*a', '+', '*h', ') − ', '*f', '(', '*a', ')']));
            }

            // Lodräta hjälplinjer till x-axeln + etiketterna a och a+h
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: Px, y2: axisY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            svg.appendChild(svgVarText(
                { x: Px, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                ['*a']));
            if (h >= 0.55) {
                g.appendChild(svgEl('line', { x1: Qx, y1: Qy, x2: Qx, y2: axisY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                svg.appendChild(svgVarText(
                    { x: Qx, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                    ['*a', '+', '*h']));
            }

            // Punkterna P (dra a) och Q (dra h) + generösa träffytor
            g.appendChild(svgEl('circle', { cx: Qx, cy: Qy, r: 4.5, fill: COL.curve }));
            g.appendChild(svgEl('circle', { cx: Px, cy: Py, r: 4.5, fill: COL.curve }));
            var hitQ = svgEl('circle', { cx: Qx, cy: Qy, r: 16, fill: 'rgba(0,0,0,0)' });
            hitQ.style.cursor = 'grab';
            hitQ.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = 'Q';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitQ);
            var hitP = svgEl('circle', { cx: Px, cy: Py, r: 16, fill: 'rgba(0,0,0,0)' });
            hitP.style.cursor = 'grab';
            hitP.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = 'P';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitP);
        }

        // ── Rita derivata-planet (steg 4) ─────────────────────────────────
        var clipId2 = 'lab-vis-clip-' + (uid++);
        function drawTrace() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var axisY = Y2(0), axisX = X(0);
            var i;

            for (i = 1; i <= 9; i++) {
                svg2.appendChild(svgEl('line', { x1: X(i), y1: T2, x2: X(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 2; i <= 12; i += 2) {
                svg2.appendChild(svgEl('line', { x1: L, y1: Y2(i), x2: L + PW, y2: Y2(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            svg2.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX, y1: T2 + PH2, x2: axisX, y2: 16, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX + ',6 ' + (axisX - 4.5) + ',16 ' + (axisX + 4.5) + ',16', fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisX + 10, y: 16, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis },
                ['*k', ' (lutning)']));

            for (i = 1; i <= 9; i++) {
                svg2.appendChild(svgVarText(
                    { x: X(i), y: axisY + 15, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = 4; i <= 12; i += 4) {
                svg2.appendChild(svgVarText(
                    { x: axisX - 6, y: Y2(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            // Facit: linjen f'(x) = 2x. Etiketten UNDER linjen i fri yta
            // (linjen lämnar fönstret uppåt vid x = 7) — aldrig på linjen.
            if (state.showFacit) {
                g.appendChild(svgEl('line', {
                    x1: X(0), y1: Y2(0), x2: X(7), y2: Y2(14),
                    stroke: COL.tangent, 'stroke-width': 1.8, 'stroke-dasharray': '7 5'
                }));
                svg2.appendChild(svgVarText(
                    { x: X(7.05), y: Y2(12.1), 'font-size': 13, 'text-anchor': 'start', fill: COL.tangent },
                    ['*f', '′(', '*x', ') = 2', '*x']));
            }

            // Spår av tidigare prickar + aktuell punkt (a, k)
            trail.forEach(function (p) {
                g.appendChild(svgEl('circle', { cx: X(p.a), cy: Y2(p.k), r: 2.6, fill: 'rgba(200,50,74,0.45)' }));
            });
            g.appendChild(svgEl('circle', { cx: X(state.a), cy: Y2(kNow()), r: 4.5, fill: COL.tangent }));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, h = state.h;
            var aT = fmtTex(a, 1), hT = fmtTex(h, 2);
            var ahT = fmtTex(a + h, 2);
            var faT = fmtTex(f(a), 2), fahT = fmtTex(f(a + h), 2);
            var kT = fmtTex(kNow(), 2);
            if (state.step >= 2) {
                katexInto(formelA,
                    'k = \\dfrac{f(a+h)-f(a)}{h}' +
                    ' = \\dfrac{f(' + ahT + ')-f(' + aT + ')}{' + hT + '}' +
                    ' = \\dfrac{' + fahT + '-' + faT + '}{' + hT + '}' +
                    ' = ' + kT);
            } else formelA.textContent = '';
            if (state.step >= 3) {
                var dT = fmtTex(2 * a, 1);
                katexInto(formelB,
                    "f'(" + aT + ') = \\lim\\limits_{h \\to 0} \\dfrac{f(' + aT + '+h)-f(' + aT + ')}{h} = ' + dT);
                note.innerHTML = (h <= 0.05)
                    ? 'Nu är sekanten nästan en tangent: ' +
                      '<span style="white-space:nowrap"><em>k</em> = ' + fmt(kNow(), 2) + '</span> ≈ ' +
                      '<span style="white-space:nowrap"><em>f</em>′(' + fmt(a, 1) + ') = ' + fmt(2 * a, 1) + '</span>'
                    : '';
            } else { formelB.textContent = ''; note.textContent = ''; }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legTangent.style.display = state.step >= 3 ? '' : 'none';
            formelA.style.display = state.step >= 2 ? '' : 'none';
            formelB.style.display = state.step >= 3 ? '' : 'none';
            note.style.display = state.step >= 3 ? '' : 'none';
            playBtn.style.display = state.step >= 3 ? '' : 'none';
            facitLabel.style.display = state.step === 4 ? '' : 'none';
            clearBtn.style.display = state.step === 4 ? '' : 'none';
            actions.style.display = state.step >= 3 ? '' : 'none';
            scene2.style.display = state.step === 4 ? '' : 'none';
            drawMain();
            if (state.step === 4) drawTrace();
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
    window.VISUALISERINGAR['ma3c-2.1'] = api;
    window.VISUALISERINGAR['ma3c-2.2'] = api;
    window.VISUALISERINGAR['ma3c-2.3'] = api;
})();
