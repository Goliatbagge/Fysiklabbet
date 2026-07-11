/* ma4-3.7.js — visualisering: "Rotationskroppar steg för steg" (skivmetoden).
 * Hör till ma4-3.7 (rotation kring x-axeln) och ma4-3.8 (rotation kring
 * y-axeln).
 *
 * Funktionen är f(x) = √x på 0 ≤ x ≤ 4 — samma som Exempel 2 i ma4-3.7.md
 * (V = 8π ≈ 25,1 v.e.), så eleven kan "spela upp" exemplet. Kring y-axeln
 * inverteras samma kurva till x = g(y) = y² på 0 ≤ y ≤ 2 (eftersom
 * f(4) = 2), vilket ger V = π∫x²dy = 32π/5 = 6,4π ≈ 20,1 v.e. — en fin
 * kontrast mot samma kurva runt x-axeln.
 *
 * Fem steg (lager):
 *   1. Området    — kurvan y = f(x), skuggat område mellan kurvan och
 *                    x-axeln på a ≤ x ≤ b.
 *   2. Rotera     — vridningsvinkel 0–360°, det platta området "svänger"
 *                    runt x-axeln (foreshortened via en ellips-projektion)
 *                    tills en hel kropp bildats. Animationsknapp.
 *   3. Skivorna   — n cylinderskivor (2–60), en vald skiva lyfts ut och
 *                    förstoras med radie/tjocklek/volym i KaTeX.
 *   4. Summera    — Σ π·f(xᵢ)²·Δx jämförs med V = π∫f(x)²dx; skillnaden
 *                    krymper när n växer.
 *   5. Kring y-axeln — samma kurva roteras kring y-axeln i stället;
 *                    vågräta skivor med radien x = g(y) = y².
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
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    var NBSP = ' ';

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
    function pathD(points, close) {
        var d = '';
        for (var i = 0; i < points.length; i++) {
            d += (i === 0 ? 'M' : 'L') + points[i][0].toFixed(2) + ' ' + points[i][1].toFixed(2) + ' ';
        }
        if (close) d += 'Z';
        return d;
    }
    function clearSvg(target) { while (target.firstChild) target.removeChild(target.firstChild); }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',          // f(x) = √x — blå
        curveSoft: 'rgba(37,99,201,0.55)',
        area: 'rgba(37,99,201,0.16)',
        body: 'rgba(37,99,201,0.16)',
        bodyLine: '#3b6fc4',
        bodyLineSoft: 'rgba(59,111,196,0.6)',
        ghost: 'rgba(37,99,201,0.09)',
        accent: '#c8324a',         // vald skiva
        accentFill: 'rgba(200,50,74,0.22)',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    function mount(el) {
        // ── Geometrikonstanter: huvudscenen (steg 1–4, rotation kring x) ──
        var W = 560, H = 400, L = 48, R = 18, T = 20, Bm = 44;
        var A = 0, B = 4;                       // integrationsgränser i x
        var S = 78;                             // px per enhet (uniform)
        var CX = 110, CY = 188;                 // pixel för världsorigo
        var XMIN = -0.6, XMAX = 4.8, YMIN = -2.15, YMAX = 2.15;
        var RXK = 0.24;                          // ellips-foreshortening (x-rotation)
        function f(x) { return Math.sqrt(Math.max(0, x)); }
        function X(x) { return CX + x * S; }
        function Y(y) { return CY - y * S; }

        // ── Geometrikonstanter: steg 5 (rotation kring y) ─────────────────
        var AY = 0, BY = f(B);                  // = 2
        function g(y) { return y * y; }         // invers: x = g(y)
        var Sx5 = 52, Sy5 = 130, CX5 = 295, CY5 = 352;
        var RYK5 = 0.16;                          // ellips-foreshortening (y-rotation, "pannkaka")
        function X5(x) { return CX5 + x * Sx5; }
        function Y5(y) { return CY5 - y * Sy5; }

        // ── Sekundär scen: förstorad skiva (steg 3 och 5) ──────────────────
        var W2 = 560, H2 = 190, CX2 = 280, CY2 = 95;

        var VX_EXACT = 8 * Math.PI;             // π∫₀⁴ x dx = 8π
        var VY_EXACT = 6.4 * Math.PI;           // π∫₀² y⁴ dy = 32π/5 = 6,4π
        var N5 = 8;                              // fast antal skivor i steg 5

        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, angle: 0, n: 8, i: 3, j: 6 };
        var animId = null;
        var dragging = null;   // 'angle' | 'sliceX' | 'sliceY' | null

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Rotationskroppar steg för steg';
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
            'aria-label': 'Interaktiv figur: kurvan f(x) = roten ur x roterad ' +
                'kring x-axeln (eller y-axeln i steg 5) bildar en rotationskropp ' +
                'av tunna cylinderskivor.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '8px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Förstorad bild av den valda skivan med radie och tjocklek.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.curve;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.accent;
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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Området' },
            { n: 2, label: '2 · Rotera' },
            { n: 3, label: '3 · Skivorna' },
            { n: 4, label: '4 · Summera' },
            { n: 5, label: '5 · Kring y-axeln' }
        ];
        var INSTR = {
            1: 'Området mellan kurvan <em>y</em> = <em>f</em>(<em>x</em>) och ' +
               '<em>x</em>-axeln på intervallet <em>a</em> ≤ <em>x</em> ≤ <em>b</em> ' +
               'ska rotera ett helt varv runt <em>x</em>-axeln. Det skuggade ' +
               'området är det som sveper ut kroppen.',
            2: 'Dra i den röda markören (eller vinkel-glidaren <em>θ</em>) och se ' +
               'området svänga runt <em>x</em>-axeln. Den ljusa konturen visar var ' +
               'den färdiga kroppen hamnar. Tryck på knappen för att se ett helt varv.',
            3: 'Kroppen delas in i <em>n</em> tunna cylinderskivor. Varje skiva har ' +
               'radien <em>f</em>(<em>x</em>ᵢ) och tjockleken <em>Δx</em>. Dra i ' +
               'markören (eller <em>i</em>-glidaren) för att välja en skiva — den ' +
               'visas förstorad till höger.',
            4: 'Summan av alla skivornas volymer, <em>Σ</em> <em>π</em>·<em>f</em>(<em>x</em>ᵢ)²·<em>Δx</em>, ' +
               'närmar sig den exakta volymen <em>V</em> = <em>π</em>∫<em>f</em>(<em>x</em>)²<em>dx</em> ' +
               'när <em>n</em> blir stort. Dra <em>n</em>-glidaren och se skillnaden krympa.',
            5: 'Samma kurva kan i stället rotera runt <em>y</em>-axeln. Nu blir ' +
               'skivorna vågräta, med radien <em>x</em> = <em>g</em>(<em>y</em>) i ' +
               'stället för <em>y</em> = <em>f</em>(<em>x</em>). Dra i markören för ' +
               'att välja en skiva.'
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
        var legCurve = legendItem(COL.curve, '<em>f</em>(<em>x</em>) = √<em>x</em>');
        var legBody = legendItem(COL.bodyLine, 'rotationskropp');
        var legSlice = legendItem(COL.accent, 'vald skiva');
        legend.appendChild(legCurve);
        legend.appendChild(legBody);
        legend.appendChild(legSlice);

        // ── Knappar ───────────────────────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Rotera ett varv';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        // ── Reglage (rader visas/döljs per steg) ───────────────────────────
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
                var mx = parseFloat(slider.max), mn = parseFloat(slider.min);
                var pct = clampNum((get() - mn) / (mx - mn) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.accent + ' 0%, ' +
                    COL.accent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(v, parseFloat(slider.min), parseFloat(slider.max)));
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
                row: row,
                setMax: function (mx) { slider.max = mx; field.max = mx; paint(); },
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        var rowAngle = makeRow('θ', 0, 360, 1,
            function () { return state.angle; },
            function (v) { state.angle = Math.round(v); });
        var rowN = makeRow('n', 2, 60, 1,
            function () { return state.n; },
            function (v) { state.n = Math.round(v); state.i = clampNum(state.i, 0, state.n - 1); rowI.setMax(state.n - 1); rowI.sync(); });
        var rowI = makeRow('i', 0, 7, 1,
            function () { return state.i; },
            function (v) { state.i = Math.round(v); });
        var rowJ = makeRow('j', 0, N5 - 1, 1,
            function () { return state.j; },
            function (v) { state.j = Math.round(v); });
        rowI.setMax(state.n - 1);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.angle = 0; state.n = 8; state.i = 3; state.j = 6;
            rowI.setMax(state.n - 1);
            rowAngle.sync(); rowN.sync(); rowI.sync(); rowJ.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: rotera ett varv ──────────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var a0 = state.angle >= 359 ? 0 : state.angle;
            state.angle = a0;
            var T_MS = 2400, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.angle = a0 + (360 - a0) * p;
                rowAngle.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.angle = 360; rowAngle.sync(); update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragning i huvudscenen ──────────────────────────────────────────
        function svgPoint(e) {
            var r = svg.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var p = svgPoint(e);
            if (dragging === 'angle') {
                var rB = f(B) * S;
                var rx = RXK * rB, ry = rB;
                var dx = p.x - X(B), dy = p.y - CY;
                var s = clampNum(dx / rx, -1, 1), c = clampNum(-dy / ry, -1, 1);
                var ang = Math.atan2(s, c) * 180 / Math.PI;
                if (ang < 0) ang += 360;
                state.angle = ang;
                rowAngle.sync();
            } else if (dragging === 'sliceX') {
                var xw = (p.x - CX) / S;
                var dxw = (B - A) / state.n;
                var idx = Math.floor((xw - A) / dxw);
                state.i = clampNum(idx, 0, state.n - 1);
                rowI.sync();
            } else if (dragging === 'sliceY') {
                var yw = (CY5 - p.y) / Sy5;
                var dyw = (BY - AY) / N5;
                var jdx = Math.floor((yw - AY) / dyw);
                state.j = clampNum(jdx, 0, N5 - 1);
                rowJ.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Axel-helpers ──────────────────────────────────────────────────
        function hArrow(target, x1, y, x2, color) {
            target.appendChild(svgEl('line', { x1: x1, y1: y, x2: x2 + 6, y2: y, stroke: color, 'stroke-width': 1.6 }));
            target.appendChild(svgEl('polygon', {
                points: (x2 + 14) + ',' + y + ' ' + (x2 + 4) + ',' + (y - 4.5) + ' ' + (x2 + 4) + ',' + (y + 4.5),
                fill: color
            }));
        }
        function vArrow(target, x, y1, y2, color) {
            target.appendChild(svgEl('line', { x1: x, y1: y1, x2: x, y2: y2 - 6, stroke: color, 'stroke-width': 1.6 }));
            target.appendChild(svgEl('polygon', {
                points: x + ',' + (y2 - 14) + ' ' + (x - 4.5) + ',' + (y2 - 4) + ' ' + (x + 4.5) + ',' + (y2 - 4),
                fill: color
            }));
        }

        // ── Grid (huvudscen, steg 1–4) ───────────────────────────────────
        function drawGridMain(target) {
            var i;
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                if (i === 0) continue;
                target.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: H - Bm, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = Math.ceil(YMIN); i <= Math.floor(YMAX); i++) {
                if (i === 0) continue;
                target.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: W - R, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
        }
        function drawAxesMain(target) {
            hArrow(target, L, CY, W - R, COL.axis);
            vArrow(target, CX, H - Bm, T, COL.axis);
            target.appendChild(svgVarText({ x: W - 6, y: CY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            target.appendChild(svgVarText({ x: CX + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
        }
        // Siffer-etiketterna ritas SIST (efter kropp/skivor) så de alltid
        // hamnar ovanpå fyllda ytor — aldrig under en halvgenomskinlig kropp.
        function drawTicksMain(target) {
            var i;
            for (i = 1; i <= 4; i++) {
                target.appendChild(svgVarText({ x: X(i), y: CY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = 1; i <= 2; i++) {
                target.appendChild(svgVarText({ x: CX - 8, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }
        }

        // ── Kurvpunkter (huvudscen) ──────────────────────────────────────
        function curvePointsPx(x0, x1, nSamp) {
            var pts = [];
            for (var i = 0; i <= nSamp; i++) {
                var xw = x0 + (x1 - x0) * i / nSamp;
                pts.push([X(xw), Y(f(xw))]);
            }
            return pts;
        }

        // ── Steg 1: området ───────────────────────────────────────────────
        function drawStep1() {
            clearSvg(svg);
            drawGridMain(svg);
            drawAxesMain(svg);

            var cpts = curvePointsPx(A, B, 90);
            // Skuggat område
            var areaPts = [[X(A), CY]].concat(cpts).concat([[X(B), CY]]);
            svg.appendChild(svgEl('path', { d: pathD(areaPts, true), fill: COL.area, stroke: 'none' }));
            // Kurvan
            svg.appendChild(svgEl('path', { d: pathD(cpts, false), fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));

            // Gränslinjer a och b
            svg.appendChild(svgEl('line', { x1: X(B), y1: Y(f(B)), x2: X(B), y2: CY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            svg.appendChild(svgVarText({ x: X(A) - 9, y: CY + 30, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*a', ' = 0']));
            svg.appendChild(svgVarText({ x: X(B), y: CY + 30, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*b', ' = 4']));

            // Kurvetikett i fri yta ovanför kurvans slut
            svg.appendChild(svgVarText({ x: X(2.55), y: Y(f(2.55)) - 14, 'font-size': 13, 'text-anchor': 'middle', fill: COL.curve }, ['*y', ' = ', '*f', '(', '*x', ') = √', '*x']));

            drawTicksMain(svg);
        }

        // ── Kropp (smidig, "sann" siluett) — används som spöke/facit i steg 2 ──
        function bodyPathPx() {
            var top = curvePointsPx(A, B, 90);
            var bottom = [];
            for (var i = top.length - 1; i >= 0; i--) {
                var xw = A + (B - A) * i / 90;
                bottom.push([X(xw), Y(-f(xw))]);
            }
            return top.concat(bottom);
        }
        function drawBodyGhost(target, opacity) {
            var pts = bodyPathPx();
            target.appendChild(svgEl('path', { d: pathD(pts, true), fill: 'rgba(37,99,201,' + opacity + ')', stroke: COL.bodyLineSoft, 'stroke-width': 1.2, 'stroke-dasharray': '5 4' }));
        }
        function drawEndEllipse(target, xw, r_px, opts) {
            var cx = X(xw), cy = CY;
            var rx = RXK * r_px, ry = r_px;
            var e = svgEl('ellipse', { cx: cx, cy: cy, rx: Math.max(rx, 0.6), ry: Math.max(ry, 0.6) });
            for (var k in opts) e.setAttribute(k, opts[k]);
            target.appendChild(e);
        }

        // ── Steg 2: rotera ────────────────────────────────────────────────
        function sweepPoint(xw, phiDeg) {
            var rpx = f(xw) * S;
            var phi = phiDeg * Math.PI / 180;
            return [X(xw) + RXK * rpx * Math.sin(phi), CY - rpx * Math.cos(phi)];
        }
        function drawStep2() {
            clearSvg(svg);
            drawGridMain(svg);
            drawAxesMain(svg);

            // Spöke: färdig kropp, mycket ljus
            drawBodyGhost(svg, 0.07);

            // Roterande "spade": det platta området vridet till aktuell vinkel
            var nSamp = 70, pts = [[X(A), CY]];
            for (var i = 0; i <= nSamp; i++) {
                var xw = A + (B - A) * i / nSamp;
                pts.push(sweepPoint(xw, state.angle));
            }
            pts.push([X(B), CY]);
            svg.appendChild(svgEl('path', {
                d: pathD(pts, true), fill: 'rgba(37,99,201,0.5)', stroke: COL.bodyLine, 'stroke-width': 1.8
            }));

            // Om vridningen kommit runt (≥ 180°): visa den undre siluetten helt
            if (state.angle >= 180) {
                var bottomOpacity = clampNum((state.angle - 180) / 40, 0, 1) * 0.5 + 0.15;
                var bpts = [];
                for (i = 0; i <= nSamp; i++) {
                    xw = A + (B - A) * i / nSamp;
                    bpts.push([X(xw), Y(-f(xw))]);
                }
                svg.appendChild(svgEl('path', { d: pathD(bpts, false), fill: 'none', stroke: COL.bodyLineSoft, 'stroke-width': 1.4, opacity: bottomOpacity }));
            }

            // Protraktor vid x = b: målring + vinkelsektor + handtag
            var rB = f(B) * S, rx = RXK * rB, ry = rB;
            svg.appendChild(svgEl('ellipse', { cx: X(B), cy: CY, rx: rx, ry: ry, fill: 'none', stroke: COL.dash, 'stroke-width': 1.1, 'stroke-dasharray': '3 3' }));
            var p0 = sweepPoint(B, 0), p1 = sweepPoint(B, state.angle);
            var largeArc = state.angle > 180 ? 1 : 0;
            if (state.angle > 0.5) {
                svg.appendChild(svgEl('path', {
                    d: 'M ' + p0[0].toFixed(2) + ' ' + p0[1].toFixed(2) + ' A ' + rx.toFixed(2) + ' ' + ry.toFixed(2) + ' 0 ' + largeArc + ' 1 ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2),
                    fill: 'none', stroke: COL.accent, 'stroke-width': 2.4
                }));
            }
            // Draghandtag
            svg.appendChild(svgEl('circle', { cx: p1[0], cy: p1[1], r: 5, fill: COL.accent }));
            var hit = svgEl('circle', { cx: p1[0], cy: p1[1], r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = 'angle';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);

            // Vinkeletikett i fri yta ovanför protraktorn
            svg.appendChild(svgVarText({ x: X(B) + rx + 12, y: T + 14, 'font-size': 13, 'text-anchor': 'start', fill: COL.accent }, ['*θ', ' = ' + fmt(state.angle, 0) + '°']));

            drawTicksMain(svg);
        }

        // ── Delad geometri: n skivor kring x-axeln ───────────────────────
        function sliceGeomX(n) {
            var dx = (B - A) / n;
            var arr = [];
            for (var i = 0; i < n; i++) {
                var xi = A + i * dx, r = f(xi);
                arr.push({ i: i, xi: xi, xEnd: xi + dx, r: r, dx: dx });
            }
            return arr;
        }

        // ── Steg 3 / 4: skivad kropp kring x-axeln ───────────────────────
        function drawSlicedBody(highlightOn) {
            clearSvg(svg);
            drawGridMain(svg);
            drawAxesMain(svg);

            var slices = sliceGeomX(state.n);
            slices.forEach(function (sl) {
                var isSel = highlightOn && sl.i === state.i;
                var rpx = sl.r * S;
                var x1 = X(sl.xi), x2 = X(sl.xEnd);
                var top = CY - rpx, bot = CY + rpx;
                var fillC = isSel ? COL.accentFill : COL.body;
                var lineC = isSel ? COL.accent : COL.bodyLine;
                svg.appendChild(svgEl('path', {
                    d: 'M ' + x1.toFixed(2) + ' ' + top.toFixed(2) + ' L ' + x2.toFixed(2) + ' ' + top.toFixed(2) +
                       ' L ' + x2.toFixed(2) + ' ' + bot.toFixed(2) + ' L ' + x1.toFixed(2) + ' ' + bot.toFixed(2) + ' Z',
                    fill: fillC, stroke: 'none'
                }));
                svg.appendChild(svgEl('line', { x1: x1, y1: top, x2: x2, y2: top, stroke: lineC, 'stroke-width': 1.3 }));
                svg.appendChild(svgEl('line', { x1: x1, y1: bot, x2: x2, y2: bot, stroke: lineC, 'stroke-width': 1.3 }));
                drawEndEllipse(svg, sl.xEnd, rpx, { fill: fillC, stroke: lineC, 'stroke-width': isSel ? 1.8 : 1 });
            });
            // Sann kurva ovanpå, som referens (tunn, streckad)
            var cpts = curvePointsPx(A, B, 90);
            svg.appendChild(svgEl('path', { d: pathD(cpts, false), fill: 'none', stroke: COL.curveSoft, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));
            var bpts = cpts.map(function (p) { return [p[0], 2 * CY - p[1]]; });
            svg.appendChild(svgEl('path', { d: pathD(bpts, false), fill: 'none', stroke: COL.curveSoft, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));

            if (highlightOn) {
                var sel = slices[state.i];
                var mid = X((sel.xi + sel.xEnd) / 2);
                // Draghandtag på x-axeln
                svg.appendChild(svgEl('polygon', {
                    points: mid + ',' + (CY + 9) + ' ' + (mid - 7) + ',' + (CY + 20) + ' ' + (mid + 7) + ',' + (CY + 20),
                    fill: COL.accent
                }));
                var hit = svgEl('rect', { x: X(sel.xi) - 4, y: CY - 4, width: X(sel.xEnd) - X(sel.xi) + 8, height: 30, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    stopAnim(); dragging = 'sliceX';
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
                // xi-etikett
                svg.appendChild(svgVarText({ x: X(sel.xi), y: CY + 32, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.accent }, ['*x', '*ᵢ']));
            }
            drawTicksMain(svg);
        }

        // ── Förstorad skiva (steg 3, kring x-axeln — "rör"-orientering) ────
        function drawEnlargedSliceX() {
            clearSvg(svg2);
            var dx = (B - A) / state.n, xi = A + state.i * dx, r = f(xi);
            var Rmax = 68, scale = Rmax / f(B);
            var ry2 = Math.max(r * scale, 7), rx2 = Math.max(ry2 * RXK, 3);
            var halfDepth = 55;
            var frontX = CX2 + halfDepth, backX = CX2 - halfDepth;

            // Bakre ellips (streckad, ljusare)
            svg2.appendChild(svgEl('ellipse', { cx: backX, cy: CY2, rx: rx2, ry: ry2, fill: 'rgba(200,50,74,0.10)', stroke: COL.accent, 'stroke-width': 1.1, 'stroke-dasharray': '4 3' }));
            // Mantel (sidolinjer)
            svg2.appendChild(svgEl('line', { x1: backX, y1: CY2 - ry2, x2: frontX, y2: CY2 - ry2, stroke: COL.accent, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('line', { x1: backX, y1: CY2 + ry2, x2: frontX, y2: CY2 + ry2, stroke: COL.accent, 'stroke-width': 1.6 }));
            // Främre ellips (solid, fylld)
            svg2.appendChild(svgEl('ellipse', { cx: frontX, cy: CY2, rx: rx2, ry: ry2, fill: COL.accentFill, stroke: COL.accent, 'stroke-width': 1.8 }));

            // Radiemått (vertikalt, vid bakre kant)
            var dimX = backX - 20;
            svg2.appendChild(svgEl('line', { x1: dimX, y1: CY2, x2: dimX, y2: CY2 - ry2, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: dimX - 4, y1: CY2, x2: dimX + 4, y2: CY2, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: dimX - 4, y1: CY2 - ry2, x2: dimX + 4, y2: CY2 - ry2, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgVarText({ x: dimX - 8, y: CY2 - ry2 / 2 + 4, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*r']));

            // Tjockleksmått (horisontellt, under)
            var dimY = CY2 + ry2 + 26;
            svg2.appendChild(svgEl('line', { x1: backX, y1: dimY, x2: frontX, y2: dimY, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: backX, y1: dimY - 4, x2: backX, y2: dimY + 4, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: frontX, y1: dimY - 4, x2: frontX, y2: dimY + 4, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgVarText({ x: CX2, y: dimY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['Δ', '*x']));
        }

        // ── Formler och texter: steg 1–4 ────────────────────────────────────
        function updateFormulasX() {
            if (state.step === 1) {
                katexInto(formelA, 'y = f(x) = \\sqrt{x}, \\quad 0 \\le x \\le 4');
                formelB.textContent = '';
                note.textContent = '';
            } else if (state.step === 2) {
                katexInto(formelA, 'y = f(x) = \\sqrt{x}, \\quad 0 \\le x \\le 4');
                katexInto(formelB, 'V_\\text{skiva} = \\pi r^2 h');
                note.innerHTML = state.angle >= 359.5
                    ? 'Ett helt varv klart — nu är kroppen färdigsvept.'
                    : '';
            } else if (state.step === 3) {
                var dx = (B - A) / state.n, xi = A + state.i * dx, fxi = f(xi);
                var vSlice = Math.PI * fxi * fxi * dx;
                katexInto(formelA,
                    'x_i = ' + fmtTex(xi, 2) + ',\\quad \\Delta x = \\dfrac{b-a}{n} = ' + fmtTex(dx, 3));
                katexInto(formelB,
                    'V_\\text{skiva} = \\pi\\cdot f(x_i)^2\\cdot \\Delta x = \\pi\\cdot(' + fmtTex(fxi, 2) + ')^2\\cdot ' +
                    fmtTex(dx, 3) + ' = ' + fmtTex(vSlice, 3) + '\\ \\text{v.e.}');
                note.textContent = '';
            } else if (state.step === 4) {
                var slices = sliceGeomX(state.n);
                var sum = 0;
                slices.forEach(function (sl) { sum += Math.PI * sl.r * sl.r * sl.dx; });
                katexInto(formelA,
                    'V \\approx \\sum_{i=0}^{n-1} \\pi\\, f(x_i)^2\\, \\Delta x = ' + fmtTex(sum, 3) + '\\ \\text{v.e.}');
                katexInto(formelB,
                    'V = \\pi\\int_0^4 f(x)^2\\, dx = \\pi\\int_0^4 x\\, dx = 8\\pi \\approx ' + fmtTex(VX_EXACT, 2) + '\\ \\text{v.e.}');
                var diff = Math.abs(VX_EXACT - sum), pct = diff / VX_EXACT * 100;
                note.innerHTML = 'Skillnad: ' + fmt(diff, 3) + NBSP + 'v.e. (' + fmt(pct, 1) + NBSP + '% av exakta volymen)';
            }
        }

        // ── Steg 5: kring y-axeln ────────────────────────────────────────
        function sliceGeomY(n) {
            var dy = (BY - AY) / n;
            var arr = [];
            for (var j = 0; j < n; j++) {
                var yj = AY + j * dy, r = g(yj);
                arr.push({ j: j, yj: yj, yEnd: yj + dy, r: r, dy: dy });
            }
            return arr;
        }
        function drawGridY(target) {
            var i;
            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                target.appendChild(svgEl('line', { x1: X5(i), y1: T, x2: X5(i), y2: H - Bm, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 1; i <= 2; i++) {
                target.appendChild(svgEl('line', { x1: L, y1: Y5(i), x2: W - R, y2: Y5(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
        }
        function drawStep5() {
            clearSvg(svg);
            drawGridY(svg);
            hArrow(svg, L, CY5, W - R, COL.axis);
            vArrow(svg, X5(0), H - Bm + 8, T, COL.axis);
            svg.appendChild(svgVarText({ x: W - 6, y: CY5 + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: X5(0) + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            var i;

            var slices = sliceGeomY(N5);
            slices.forEach(function (sl) {
                var isSel = sl.j === state.j;
                var rxw = sl.r * Sx5;
                var ryPancake = rxw * RYK5;
                var y1 = Y5(sl.yj), y2 = Y5(sl.yEnd);
                var left = X5(0) - rxw, right = X5(0) + rxw;
                var fillC = isSel ? COL.accentFill : COL.body;
                var lineC = isSel ? COL.accent : COL.bodyLine;
                svg.appendChild(svgEl('path', {
                    d: 'M ' + left.toFixed(2) + ' ' + y1.toFixed(2) + ' L ' + right.toFixed(2) + ' ' + y1.toFixed(2) +
                       ' L ' + right.toFixed(2) + ' ' + y2.toFixed(2) + ' L ' + left.toFixed(2) + ' ' + y2.toFixed(2) + ' Z',
                    fill: fillC, stroke: 'none'
                }));
                svg.appendChild(svgEl('line', { x1: left, y1: y1, x2: left, y2: y2, stroke: lineC, 'stroke-width': 1.3 }));
                svg.appendChild(svgEl('line', { x1: right, y1: y1, x2: right, y2: y2, stroke: lineC, 'stroke-width': 1.3 }));
                var e = svgEl('ellipse', { cx: X5(0), cy: y2, rx: Math.max(rxw, 0.6), ry: Math.max(ryPancake, 0.6), fill: fillC, stroke: lineC, 'stroke-width': isSel ? 1.8 : 1 });
                svg.appendChild(e);
            });
            // Sann kurva som referens
            var cpts = [];
            for (i = 0; i <= 60; i++) {
                var yw = AY + (BY - AY) * i / 60;
                cpts.push([X5(g(yw)), Y5(yw)]);
            }
            svg.appendChild(svgEl('path', { d: pathD(cpts, false), fill: 'none', stroke: COL.curveSoft, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));
            var cpts2 = cpts.map(function (p) { return [2 * X5(0) - p[0], p[1]]; });
            svg.appendChild(svgEl('path', { d: pathD(cpts2, false), fill: 'none', stroke: COL.curveSoft, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));

            var sel = slices[state.j];
            var midY = Y5((sel.yj + sel.yEnd) / 2);
            svg.appendChild(svgEl('polygon', {
                points: (X5(0) - 9) + ',' + midY + ' ' + (X5(0) - 20) + ',' + (midY - 7) + ' ' + (X5(0) - 20) + ',' + (midY + 7),
                fill: COL.accent
            }));
            var hit = svgEl('rect', { x: X5(0) - 30, y: Y5(sel.yEnd) - 4, width: 30, height: Y5(sel.yj) - Y5(sel.yEnd) + 8, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = 'sliceY';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
            svg.appendChild(svgVarText({ x: X5(0) - 26, y: midY - 12, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.accent }, ['*y', '*ⱼ']));

            // Siffer-etiketter SIST, ovanpå de fyllda skivorna
            for (i = 2; i <= 4; i += 2) {
                svg.appendChild(svgVarText({ x: X5(i), y: CY5 + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = 1; i <= 2; i++) {
                svg.appendChild(svgVarText({ x: X5(0) - 8, y: Y5(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }
        }
        function drawEnlargedSliceY() {
            clearSvg(svg2);
            var dy = (BY - AY) / N5, yj = AY + state.j * dy, r = g(yj);
            var Rmax = 92, scale = Rmax / g(BY);
            var rx2 = Math.max(r * scale, 6), ry2 = Math.max(rx2 * RYK5, 2);
            var halfDepth = 40;
            var topY = CY2 - halfDepth, botY = CY2 + halfDepth;

            svg2.appendChild(svgEl('ellipse', { cx: CX2, cy: botY, rx: rx2, ry: ry2, fill: 'rgba(200,50,74,0.10)', stroke: COL.accent, 'stroke-width': 1.1, 'stroke-dasharray': '4 3' }));
            svg2.appendChild(svgEl('line', { x1: CX2 - rx2, y1: topY, x2: CX2 - rx2, y2: botY, stroke: COL.accent, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('line', { x1: CX2 + rx2, y1: topY, x2: CX2 + rx2, y2: botY, stroke: COL.accent, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('ellipse', { cx: CX2, cy: topY, rx: rx2, ry: ry2, fill: COL.accentFill, stroke: COL.accent, 'stroke-width': 1.8 }));

            // Radiemått (horisontellt, ovanför)
            var dimY = topY - 22;
            svg2.appendChild(svgEl('line', { x1: CX2, y1: dimY, x2: CX2 + rx2, y2: dimY, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: CX2, y1: dimY - 4, x2: CX2, y2: dimY + 4, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: CX2 + rx2, y1: dimY - 4, x2: CX2 + rx2, y2: dimY + 4, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgVarText({ x: CX2 + rx2 / 2, y: dimY - 8, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*x']));

            // Tjockleksmått (vertikalt, till höger)
            var dimX = CX2 + rx2 + 24;
            svg2.appendChild(svgEl('line', { x1: dimX, y1: topY, x2: dimX, y2: botY, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: dimX - 4, y1: topY, x2: dimX + 4, y2: topY, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgEl('line', { x1: dimX - 4, y1: botY, x2: dimX + 4, y2: botY, stroke: COL.dash, 'stroke-width': 1.2 }));
            svg2.appendChild(svgVarText({ x: dimX + 8, y: CY2 + 4, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['Δ', '*y']));
        }
        function updateFormulasY() {
            var dy = (BY - AY) / N5, yj = AY + state.j * dy, xj = g(yj);
            var vSlice = Math.PI * xj * xj * dy;
            katexInto(formelA,
                'y_j = ' + fmtTex(yj, 2) + ',\\quad \\Delta y = ' + fmtTex(dy, 3) +
                ',\\quad V_\\text{skiva} = \\pi\\cdot x_j^2\\cdot \\Delta y = \\pi\\cdot(' + fmtTex(xj, 2) + ')^2\\cdot ' +
                fmtTex(dy, 3) + ' = ' + fmtTex(vSlice, 3) + '\\ \\text{v.e.}');
            katexInto(formelB,
                'x = g(y) = y^2 \\quad\\Rightarrow\\quad V = \\pi\\int_0^2 x^2\\, dy = \\pi\\int_0^2 y^4\\, dy = ' +
                '\\dfrac{32\\pi}{5} \\approx ' + fmtTex(VY_EXACT, 1) + '\\ \\text{v.e.}');
            note.innerHTML = 'Samma kurva runt <em>y</em>-axeln ger <em>V</em> ≈ ' + fmt(VY_EXACT, 1) + NBSP + 'v.e. — mindre än de ' +
                fmt(VX_EXACT, 1) + NBSP + 'v.e. som blev resultatet runt <em>x</em>-axeln.';
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, idx) {
                b.classList.toggle('active', state.step === idx + 1);
            });
            instr.innerHTML = INSTR[state.step];

            rowAngle.row.style.display = state.step === 2 ? '' : 'none';
            rowN.row.style.display = (state.step === 3 || state.step === 4) ? '' : 'none';
            rowI.row.style.display = state.step === 3 ? '' : 'none';
            rowJ.row.style.display = state.step === 5 ? '' : 'none';
            playBtn.style.display = state.step === 2 ? '' : 'none';
            actions.style.display = state.step === 2 ? '' : 'none';
            scene2.style.display = (state.step === 3 || state.step === 5) ? '' : 'none';
            legSlice.style.display = state.step >= 3 ? '' : 'none';
            legBody.style.display = state.step >= 2 ? '' : 'none';
            note.style.display = (state.step === 2 || state.step === 4 || state.step === 5) ? '' : 'none';

            if (state.step === 1) { drawStep1(); updateFormulasX(); }
            else if (state.step === 2) { drawStep2(); updateFormulasX(); }
            else if (state.step === 3) { drawSlicedBody(true); drawEnlargedSliceX(); updateFormulasX(); }
            else if (state.step === 4) { drawSlicedBody(false); updateFormulasX(); }
            else if (state.step === 5) { drawStep5(); drawEnlargedSliceY(); updateFormulasY(); }
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
    window.VISUALISERINGAR['ma4-3.7'] = api;
    window.VISUALISERINGAR['ma4-3.8'] = api;
})();
