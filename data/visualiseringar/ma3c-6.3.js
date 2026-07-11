/* ma3c-6.3.js — visualisering: "Trig-ekvationens alla lösningar". Hör till
 * ma3c-6.3/ma3c-6.4 (trigonometriska ekvationer med enhetscirkeln, v1/v2 med
 * räknare) och ma4-1.3/ma4-1.4 (samtliga lösningar med periodterm n·360°).
 *
 * Kärninsikt: sin x = a har TVÅ lösningsfamiljer per varv — grundlösningen
 * v (blå) och spegelbilden 180° − v (röd) i enhetscirkeln — plus
 * periodiciteten (+ n · 360°). Den "glömda lösningen" är en synlig
 * spegling i cirkeln, inte en regel att memorera.
 *
 * Startläget är a = 0,5 i sin-läge, samma exempel som ma3c-6.3 (v1 = 30°,
 * v2 = 150°) — eleven kan "spela upp" exemplet.
 *
 * Tre steg (lager):
 *   1. Två träffar per varv — dra linjen y = a, se de två skärningarna med
 *      cirkeln OCH med kurvan i ett enda varv (0°–360°).
 *   2. Familjerna — grafen växer till tre varv (−360° till 720°), formlerna
 *      x = v + n·360° (blå) och x = 180° − v + n·360° (röd) visas, en
 *      n-stegare ringar in vilken prick som hör till vilket n.
 *   3. Gränsfallen — dra a mot ±1: familjerna smälter samman till en
 *      lösning per varv. Dra a förbi ±1: linjen missar kurvan/cirkeln
 *      helt och ekvationen saknar lösning.
 *
 * En kryssruta växlar till cos x = a (± v + n·360°) — cirkelns linje blir
 * då LODRÄT (x = a) i stället för VÅGRÄT, precis som de två figurerna i
 * ma3c-6.3.md.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js,
 * ma3c-2.3.js och ma3c-6.2.js). API: window.VISUALISERINGAR['<id>'] =
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
    // Unicode-minus (U+2212) i ren SVG-/DOM-text (inte KaTeX-källa).
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function mod360(d) { var m = d % 360; if (m < 0) m += 360; return m; }
    // '=' om graden är (nästan) ett heltal, annars '\approx'.
    function chooseEq(deg) { return Math.abs(deg - Math.round(deg)) < 1e-6 ? '=' : '\\approx'; }

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
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        curve: '#3a4453',      // sin x/cos x-kurvan — neutral, låter familjerna sticka ut
        famA: '#2563c9',       // grundlösningen v (blå)
        famB: '#c8324a',       // speglingen (röd)
        line: '#c98a1c'        // den dragbara linjen y = a / x = a (bärnsten)
    };

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var A_MIN = -1.3, A_MAX = 1.3, A_STEP = 0.05;
        var state = { a: 0.5, mode: 'sin', step: 1, selectedN: 0 };

        function fn(t) { return state.mode === 'cos' ? Math.cos(t) : Math.sin(t); }
        // v1/v2 (grader) för aktuellt a och läge. NaN om |a| > 1.
        function computeV(a, mode) {
            if (a < -1 || a > 1) return { v1: NaN, v2: NaN };
            if (mode === 'cos') {
                var vc = Math.acos(a) * 180 / Math.PI;
                return { v1: vc, v2: -vc };
            }
            var vs = Math.asin(a) * 180 / Math.PI;
            return { v1: vs, v2: 180 - vs };
        }

        // ── Geometri ──────────────────────────────────────────────────────
        var W = 560, H = 280;
        var CX = 92, CY = 172, R = 60;
        var GX0 = 216, GX1 = 540;
        function GY(v) { return CY - v * R; }
        function curDomain() {
            if (state.step === 1) return { lo: 0, hi: 360, scale: (GX1 - GX0) / 360 };
            return { lo: -360, hi: 720, scale: (GX1 - GX0) / 1080 };
        }
        function GX(deg) {
            var d = curDomain();
            return GX0 + (deg - d.lo) * d.scale;
        }
        function circlePoint(deg, radius) {
            var t = deg * Math.PI / 180;
            return { x: CX + radius * Math.cos(t), y: CY - radius * Math.sin(t) };
        }
        // Vinkelbåge från fromDeg till toDeg (kan gå åt endera hållet).
        function arcPath(fromDeg, toDeg, radius) {
            var n = Math.max(2, Math.round(Math.abs(toDeg - fromDeg) / 6));
            var d = '';
            for (var i = 0; i <= n; i++) {
                var deg = fromDeg + (toDeg - fromDeg) * i / n;
                var p = circlePoint(deg, radius);
                d += (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ' ';
            }
            return d;
        }
        function curvePath(fromDeg, toDeg, n) {
            var d = '';
            for (var i = 0; i <= n; i++) {
                var deg = fromDeg + (toDeg - fromDeg) * i / n;
                var t = deg * Math.PI / 180;
                var x = GX(deg), y = GY(fn(t));
                d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
            }
            return d;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Trig-ekvationens alla lösningar';
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
            'aria-label': 'Enhetscirkeln till vänster och en sinuskurva till höger, med en ' +
                'dragbar linje y = a som skär kurvan och cirkeln i två punkter: en blå ' +
                'grundlösning och en röd spegling. Dra linjen eller glidaren för att ändra a.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var actionsMode = document.createElement('div');
        actionsMode.className = 'lab-vis-actions';
        card.appendChild(actionsMode);

        var formelBase = document.createElement('div');
        formelBase.className = 'lab-vis-formel';
        card.appendChild(formelBase);

        var formelFamA = document.createElement('div');
        formelFamA.className = 'lab-vis-formel';
        formelFamA.style.color = COL.famA;
        card.appendChild(formelFamA);

        var formelFamB = document.createElement('div');
        formelFamB.className = 'lab-vis-formel';
        formelFamB.style.color = COL.famB;
        card.appendChild(formelFamB);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actionsN = document.createElement('div');
        actionsN.className = 'lab-vis-actions';
        card.appendChild(actionsN);

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
            { n: 1, label: '1 · Två träffar per varv' },
            { n: 2, label: '2 · Familjerna' },
            { n: 3, label: '3 · Gränsfallen' }
        ];
        function instrText(step, mode) {
            var f = mode === 'cos' ? 'cos' : 'sin';
            if (step === 1) {
                return 'Gissa först: hur många lösningar har <em>' + f + '</em> <em>x</em> = <em>a</em> ' +
                    'mellan 0° och 360°, oavsett vilket <em>a</em> du väljer? Dra i linjen ' +
                    '(eller <em>a</em>-glidaren) och räkna hur många gånger den skär cirkeln ' +
                    'och kurvan.';
            }
            if (step === 2) {
                return 'De två skärningarna hör till varsin oändliga lösningsfamilj — lägg till ' +
                    'eller dra ifrån hela varv (<em>n</em> · 360°) så hamnar du på en ny ' +
                    'skärningspunkt. Klicka på <em>n</em>-knapparna för att se vilken prick som ' +
                    'hör till vilket <em>n</em>.';
            }
            return 'Dra <em>a</em> mot 1 (eller −1): de två familjerna smälter samman till en enda ' +
                'lösning per varv. Dra <em>a</em> förbi 1 (eller under −1): linjen missar kurvan ' +
                'helt och ekvationen saknar lösning.';
        }
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
            return { el: span, txt: txt };
        }
        var legCurve = legendItem(COL.curve, '<em>sin</em> <em>x</em>');
        var legFamA = legendItem(COL.famA, '<em>x</em> = <em>v</em> + <em>n</em> · 360°');
        var legFamB = legendItem(COL.famB, '<em>x</em> = 180° − <em>v</em> + <em>n</em> · 360°');
        legend.appendChild(legCurve.el);
        legend.appendChild(legFamA.el);
        legend.appendChild(legFamB.el);

        // ── cos-kryssruta (alltid synlig) ──────────────────────────────────
        var cosLabel = document.createElement('label');
        cosLabel.className = 'lab-graf-check';
        var cosCb = document.createElement('input');
        cosCb.type = 'checkbox';
        cosCb.addEventListener('change', function () {
            state.mode = cosCb.checked ? 'cos' : 'sin';
            update();
        });
        cosLabel.appendChild(cosCb);
        var cosTxt = document.createElement('span');
        cosTxt.innerHTML = 'Visa <em>cos</em> <em>x</em> = <em>a</em> i stället';
        cosLabel.appendChild(cosTxt);
        actionsMode.appendChild(cosLabel);

        // ── n-stegare (steg 2+) ─────────────────────────────────────────────
        var nBtns = [];
        [-1, 0, 1].forEach(function (val) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.innerHTML = '<em>n</em> = ' + (val < 0 ? '−1' : String(val));
            b.addEventListener('click', function () {
                state.selectedN = state.selectedN === val ? null : val;
                update();
            });
            actionsN.appendChild(b);
            nBtns.push({ val: val, el: b });
        });
        function syncNBtns() {
            nBtns.forEach(function (nb) {
                var active = state.selectedN === nb.val;
                nb.el.style.background = active ? COL.axis : '';
                nb.el.style.borderColor = active ? COL.axis : '';
                nb.el.style.color = active ? '#fff' : '';
            });
        }

        // ── Glidare (a) ───────────────────────────────────────────────────
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
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.line + ' 0%, ' +
                    COL.line + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(clampNum(Math.round(v / step) * step, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), 2).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(get(), 2).replace(',', '.');
            });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), 2).replace(',', '.');
                    paint();
                }
            };
        }
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.a = 0.5; state.mode = 'sin'; state.step = 1; state.selectedN = 0;
            cosCb.checked = false;
            rowA.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbar linje (y = a i sin-läge, x = a i cos-läge) ─────────────
        function toSvgXY(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return { x: (clientX - r.left) * W / r.width, y: (clientY - r.top) * H / r.height };
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var p = toSvgXY(e.clientX, e.clientY);
            var raw = state.mode === 'sin' ? (CY - p.y) / R : (p.x - CX) / R;
            state.a = clampNum(Math.round(raw / A_STEP) * A_STEP, A_MIN, A_MAX);
            rowA.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function makeHandle(cx, cy) {
            svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 6, fill: COL.line }));
            var hit = svgEl('circle', { cx: cx, cy: cy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Rita scenen ───────────────────────────────────────────────────
        function drawDot(deg, color, ring) {
            var x = GX(deg), y = GY(state.a);
            svg.appendChild(svgEl('circle', { cx: x, cy: y, r: 4, fill: color }));
            if (ring) {
                svg.appendChild(svgEl('circle', { cx: x, cy: y, r: 8, fill: 'none', stroke: color, 'stroke-width': 2 }));
            }
        }
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, mode = state.mode, dom = curDomain();
            var V = computeV(a, mode), v1 = V.v1, v2 = V.v2, ok = isFinite(v1);
            var axisY = CY;

            // ── Cirkeln: omriss + 0°-referens + spegellinje ────────────────
            svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: COL.axis, 'stroke-width': 1.6 }));
            var t0a = circlePoint(0, R - 6), t0b = circlePoint(0, R + 6);
            svg.appendChild(svgEl('line', { x1: t0a.x, y1: t0a.y, x2: t0b.x, y2: t0b.y, stroke: COL.axis, 'stroke-width': 1.2 }));
            if (mode === 'sin') {
                svg.appendChild(svgEl('line', { x1: CX, y1: CY - R - 10, x2: CX, y2: CY + R + 10, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            } else {
                svg.appendChild(svgEl('line', { x1: CX - R - 10, y1: CY, x2: CX + R + 10, y2: CY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            }

            // ── Graf: rutnät, axlar, ticks ──────────────────────────────────
            svg.appendChild(svgEl('line', { x1: GX0, y1: GY(1), x2: GX1, y2: GY(1), stroke: COL.grid, 'stroke-width': 1 }));
            svg.appendChild(svgEl('line', { x1: GX0, y1: GY(-1), x2: GX1, y2: GY(-1), stroke: COL.grid, 'stroke-width': 1 }));
            svg.appendChild(svgEl('line', { x1: GX0, y1: axisY, x2: GX1 + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: (GX1 + 14) + ',' + axisY + ' ' + (GX1 + 5) + ',' + (axisY - 4.2) + ' ' + (GX1 + 5) + ',' + (axisY + 4.2), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: GX0, y1: CY + R + 20, x2: GX0, y2: CY - R - 24, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: GX0 + ',' + (CY - R - 32) + ' ' + (GX0 - 4.2) + ',' + (CY - R - 23) + ' ' + (GX0 + 4.2) + ',' + (CY - R - 23), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 5, y: axisY - 9, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: GX0 + 8, y: CY - R - 26, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            svg.appendChild(svgVarText({ x: GX0 - 8, y: GY(1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['1']));
            svg.appendChild(svgVarText({ x: GX0 - 8, y: GY(-1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['−1']));

            var tickStep = state.step === 1 ? 90 : 180;
            for (var td = dom.lo; td <= dom.hi + 0.5; td += tickStep) {
                var xk = GX(td);
                svg.appendChild(svgEl('line', { x1: xk, y1: axisY - 4, x2: xk, y2: axisY + 4, stroke: COL.axis, 'stroke-width': 1.2 }));
                svg.appendChild(svgVarText({ x: xk, y: axisY + 16, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [fmtDisp(td, 0) + '°']));
            }

            // ── Kurvan (sin x eller cos x) ────────────────────────────────
            var nSeg = Math.max(60, Math.round((dom.hi - dom.lo) / 2));
            svg.appendChild(svgEl('path', {
                d: curvePath(dom.lo, dom.hi, nSeg), fill: 'none', stroke: COL.curve,
                'stroke-width': 2.2, 'stroke-linejoin': 'round'
            }));
            svg.appendChild(svgVarText(
                { x: GX0 + 10, y: GY(1) - 8, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.curve },
                mode === 'cos' ? ['*y', ' = cos ', '*x'] : ['*y', ' = sin ', '*x']));

            // ── Dragbar linje y = a (sin) / x = a (cos) ────────────────────
            if (mode === 'sin') {
                var ly = GY(a);
                // Etiketten läggs OVANFÖR linjen när a ≥ 0, UNDER när a < 0 —
                // annars hamnar den (för negativa a) i samma nedre vänstra
                // kil som v2-bågens gradetikett (som mäts från 180° och
                // sveper nedåt när v2 > 180°).
                var lyLbl = a >= 0 ? ly - 9 : ly + 18;
                svg.appendChild(svgEl('line', { x1: 6, y1: ly, x2: GX1, y2: ly, stroke: COL.line, 'stroke-width': 2.4 }));
                svg.appendChild(svgVarText(
                    { x: 30, y: lyLbl, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.line },
                    ['*y', ' = ', fmtDisp(a, 2)]));
                makeHandle(12, ly);
            } else {
                var lx = CX + a * R;
                svg.appendChild(svgEl('line', { x1: lx, y1: CY - R - 14, x2: lx, y2: CY + R + 14, stroke: COL.line, 'stroke-width': 2.4 }));
                svg.appendChild(svgVarText(
                    { x: lx, y: CY - R - 20, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.line },
                    ['*x', ' = ', fmtDisp(a, 2)]));
                makeHandle(lx, CY - R - 16);
                var gly = GY(a);
                svg.appendChild(svgEl('line', { x1: GX0, y1: gly, x2: GX1, y2: gly, stroke: COL.line, 'stroke-width': 2.4 }));
                svg.appendChild(svgVarText(
                    { x: GX1 - 6, y: gly - 8, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.line },
                    ['*y', ' = ', fmtDisp(a, 2)]));
            }

            // ── Punkter, strålar och vinkelbågar i cirkeln (om lösning finns) ──
            if (ok) {
                var p1 = circlePoint(v1, R), p2 = circlePoint(v2, R);
                svg.appendChild(svgEl('line', { x1: CX, y1: CY, x2: p1.x, y2: p1.y, stroke: COL.famA, 'stroke-width': 1.8 }));
                svg.appendChild(svgEl('line', { x1: CX, y1: CY, x2: p2.x, y2: p2.y, stroke: COL.famB, 'stroke-width': 1.8 }));
                // v2:s båge mäts från 180° (inte 0°) i sin-läge — v2 = 180° − v1
                // är precis lika långt från 180° som v1 är från 0°, så bågen
                // hamnar i sin egen fria kil på andra sidan spegellinjen i
                // stället för nästlad inuti v1:s smala kil (som annars klämmer
                // ihop de två gradetiketterna mot varandra).
                var origin2 = state.mode === 'sin' ? 180 : 0;
                if (Math.abs(v1) > 6) {
                    svg.appendChild(svgEl('path', { d: arcPath(0, v1, 24), fill: 'none', stroke: COL.famA, 'stroke-width': 1.5 }));
                    var b1 = circlePoint(v1 / 2, 24 + 13);
                    svg.appendChild(svgVarText({ x: b1.x, y: b1.y + 4, 'font-size': 12, 'text-anchor': 'middle', fill: COL.famA }, [fmtDisp(v1, 1) + '°']));
                }
                if (Math.abs(v2 - origin2) > 6) {
                    svg.appendChild(svgEl('path', { d: arcPath(origin2, v2, 38), fill: 'none', stroke: COL.famB, 'stroke-width': 1.5 }));
                    var b2 = circlePoint((origin2 + v2) / 2, 38 + 13);
                    svg.appendChild(svgVarText({ x: b2.x, y: b2.y + 4, 'font-size': 12, 'text-anchor': 'middle', fill: COL.famB }, [fmtDisp(v2, 1) + '°']));
                }
                svg.appendChild(svgEl('circle', { cx: p1.x, cy: p1.y, r: 4.5, fill: COL.famA }));
                svg.appendChild(svgEl('circle', { cx: p2.x, cy: p2.y, r: 4.5, fill: COL.famB }));

                // ── Prickar i grafen ─────────────────────────────────────────
                if (state.step === 1) {
                    drawDot(mod360(v1), COL.famA, false);
                    drawDot(mod360(v2), COL.famB, false);
                } else {
                    for (var n = -3; n <= 3; n++) {
                        var xA = v1 + n * 360, xB = v2 + n * 360;
                        if (xA >= dom.lo - 0.5 && xA <= dom.hi + 0.5) drawDot(xA, COL.famA, state.selectedN === n);
                        if (xB >= dom.lo - 0.5 && xB <= dom.hi + 0.5) drawDot(xB, COL.famB, state.selectedN === n);
                    }
                }
            }
        }

        // ── Formler och notiser ─────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, mode = state.mode;
            var V = computeV(a, mode), v1 = V.v1, v2 = V.v2, ok = isFinite(v1);
            var fnTex = mode === 'cos' ? '\\cos' : '\\sin';
            var invTex = mode === 'cos' ? '\\cos^{-1}' : '\\sin^{-1}';
            var aT = fmtTex(a, 2);

            if (!ok) {
                katexInto(formelBase, fnTex + '\\ x = ' + aT + '\\ \\Rightarrow\\ \\text{Lösning saknas}');
            } else {
                var v1T = fmtTex(v1, 1), v2T = fmtTex(v2, 1);
                var eq1 = chooseEq(v1), eq2 = chooseEq(v2);
                var v2Def = mode === 'cos' ? '-v_1' : '180^\\circ - v_1';
                katexInto(formelBase,
                    fnTex + '\\ x = ' + aT +
                    '\\ \\Rightarrow\\ v_1 = ' + invTex + '(' + aT + ') ' + eq1 + ' ' + v1T + '^\\circ' +
                    ',\\quad v_2 = ' + v2Def + ' ' + eq2 + ' ' + v2T + '^\\circ');
            }

            if (ok && state.step >= 2) {
                var v1T2 = fmtTex(v1, 1);
                katexInto(formelFamA, '\\textcolor{' + COL.famA + '}{x = ' + v1T2 + '^\\circ + n \\cdot 360^\\circ}');
                var famBtex = mode === 'cos'
                    ? '\\textcolor{' + COL.famB + '}{x = -' + v1T2 + '^\\circ + n \\cdot 360^\\circ}'
                    : '\\textcolor{' + COL.famB + '}{x = 180^\\circ - ' + v1T2 + '^\\circ + n \\cdot 360^\\circ}';
                katexInto(formelFamB, famBtex);
            } else {
                formelFamA.textContent = '';
                formelFamB.textContent = '';
            }

            if (!ok) {
                note.innerHTML = 'Linjen missar kurvan helt vid <span style="white-space:nowrap">' +
                    '<em>a</em> = ' + fmt(a, 2) + '</span> — ekvationen saknar lösning.';
            } else {
                var diff = mod360(v2 - v1);
                var merged = diff < 0.06 || diff > 359.94;
                if (merged) {
                    note.innerHTML = 'Vid <span style="white-space:nowrap"><em>a</em> = ' + fmt(a, 2) + '</span> ' +
                        'sammanfaller de två familjerna — bara en lösning per varv.';
                } else {
                    note.textContent = '';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = instrText(state.step, state.mode);
            legCurve.txt.innerHTML = state.mode === 'cos' ? '<em>cos</em> <em>x</em>' : '<em>sin</em> <em>x</em>';
            legFamB.txt.innerHTML = state.mode === 'cos'
                ? '<em>x</em> = −<em>v</em> + <em>n</em> · 360°'
                : '<em>x</em> = 180° − <em>v</em> + <em>n</em> · 360°';
            actionsN.style.display = state.step >= 2 ? '' : 'none';
            syncNBtns();
            drawScene();
            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-6.3'] = api;
    window.VISUALISERINGAR['ma3c-6.4'] = api;
    window.VISUALISERINGAR['ma4-1.3'] = api;
    window.VISUALISERINGAR['ma4-1.4'] = api;
})();
