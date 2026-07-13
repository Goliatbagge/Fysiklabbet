/* ma1c-4.9.js — visualisering: "Vad går in, vad kommer ut?" (definitions-
 * mängd och värdemängd). Hör till ma1c-4.9.
 *
 * Kärninsikt: definitionsmängden är vilka x som får MATAS IN, värde-
 * mängden är vilka y som KOMMER UT — två olika frågor på två olika
 * axlar, och grafen är maskinen däremellan.
 *
 * Tre funktioner (radioknappar):
 *   - f(x) = 4 − x² på −1 < x ≤ 2  — exakt kurvan i genomgångens Exempel 2
 *     (tom ring vid (−1, 3), toppen (0, 4) INUTI intervallet, ifylld punkt
 *     vid (2, 0)). Standardintervallet i steg 1 (−0,5 ≤ x ≤ 1,5) placerar
 *     toppen inuti bandet — den klassiska fällan: värdemängden är INTE
 *     bara ändpunkternas värden.
 *   - f(x) = √(x + 1) — naturlig gräns x ≥ −1 (roten kräver icke-negativt
 *     under rottecknet), annars obegränsad. Monoton — ingen fälla.
 *   - f(x) = 1/x — hål vid x = 0 (division med 0), vilket också gör att
 *     y ≠ 0. Monoton på varje gren.
 *
 * Tre steg (lager):
 *   1. In och ut       — dra det blå x-bandet, se den lysande kurvbiten
 *                         och det gröna y-bandet på y-axeln. Gissa-först:
 *                         y-bandet döljs tills "Visa värdemängden" klickas.
 *   2. Hela funktionens mängder — knappen "Visa hela definitionsmängden"
 *                         drar bandet till funktionens fulla D_f/V_f (eller,
 *                         för 1/x, visar båda grenarna + hålet). Byt
 *                         funktion och se hur gränserna skiljer sig.
 *   3. Maskinen        — mata in ett enskilt x; maskinkortet visar f(x),
 *                         eller ett rött avslag om x ligger utanför
 *                         definitionsmängden.
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
        curve: '#2563c9',      // funktionskurvan — blå
        curveDim: 'rgba(37,99,201,0.30)',
        xband: '#2563c9',      // x-bandet (inmatning) — blå
        yband: '#4a7d3a',      // y-bandet (utmatning) — grön
        dash: 'rgba(31,37,48,0.45)',
        reject: '#c8324a'      // avvisat värde — röd
    };

    // ── Funktionsval ──────────────────────────────────────────────────
    var FUNCS = [
        {
            key: 'quad',
            tex: 'f(x) = 4-x^2',
            f: function (x) { return 4 - x * x; },
            win: { XMIN: -2.3, XMAX: 3.3, YMIN: -1.6, YMAX: 5.3 },
            domain: { aMin: -1, aOpen: true, bMax: 2, bOpen: false, bUnbounded: false },
            def: { a: -0.5, b: 1.5 },
            gap: 0.3, step: 0.1,
            machine: { min: -2, max: 3, def: 1 },
            naturalNote: 'Den här kurvan är helt enkelt ritad bara för <em>x</em> mellan −1 och 2 — ' +
                'precis som grafen i genomgångens Exempel 2. Definitionsmängden är så långt kurvan sträcker sig.'
        },
        {
            key: 'sqrt',
            tex: 'f(x) = \\sqrt{x+1}',
            f: function (x) { return Math.sqrt(x + 1); },
            win: { XMIN: -2.2, XMAX: 7.6, YMIN: -1, YMAX: 3.5 },
            domain: { aMin: -1, aOpen: false, bMax: Infinity, bOpen: true, bUnbounded: true, bPractical: 7 },
            def: { a: 0, b: 3 },
            gap: 0.4, step: 0.1,
            machine: { min: -2.2, max: 7.5, def: 3 },
            naturalNote: 'Roten kräver att talet under rottecknet aldrig är negativt: ' +
                '<em>x</em> + 1 ≥ 0, alltså <em>x</em> ≥ −1. Försök dra bandet längre åt vänster — det går inte!'
        },
        {
            key: 'inv',
            tex: 'f(x) = \\dfrac{1}{x}',
            f: function (x) { return 1 / x; },
            win: { XMIN: -4.2, XMAX: 4.2, YMIN: -4.2, YMAX: 4.2 },
            domain: { hole: 0 },
            def: { a: 1, b: 3 },
            gap: 0.4, step: 0.1,
            dragAMin: 0.15, dragBMax: 3.9,
            machine: { min: -4, max: 4, def: 2 },
            naturalNote: 'Vi kan aldrig dela med 0, så <em>x</em> ≠ 0. Dra bandet mot 0 och se hur ' +
                'utmatningen växer utan gräns — och eftersom 1 delat med något aldrig blir 0, är <em>y</em> ≠ 0 också.'
        }
    ];

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, funcIdx: 0, a: -0.5, b: 1.5, revealY: false, wholeShown: false, machineX: 1 };
        var animId = null;
        function curFunc() { return FUNCS[state.funcIdx]; }
        function curWin() { return curFunc().win; }

        // ── Geometri ──────────────────────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        function X(x) { var w = curWin(); return L + (x - w.XMIN) / (w.XMAX - w.XMIN) * PW; }
        function Y(y) { var w = curWin(); return T + (w.YMAX - y) / (w.YMAX - w.YMIN) * PH; }

        // ── Domän-hjälp ───────────────────────────────────────────────────
        function dragBounds() {
            var fn = curFunc();
            if (fn.key === 'quad') return { aMin: fn.domain.aMin, bMax: fn.domain.bMax };
            if (fn.key === 'sqrt') return { aMin: fn.domain.aMin, bMax: fn.domain.bPractical };
            return { aMin: fn.dragAMin, bMax: fn.dragBMax };
        }
        function curAOpen() {
            var fn = curFunc();
            if (fn.key === 'inv') return false;
            return fn.domain.aOpen && Math.abs(state.a - fn.domain.aMin) < 1e-6;
        }
        function curBOpen() {
            var fn = curFunc();
            if (fn.key === 'inv') return false;
            if (fn.domain.bUnbounded) return false;
            return fn.domain.bOpen && Math.abs(state.b - fn.domain.bMax) < 1e-6;
        }
        function curBUnbounded() {
            var fn = curFunc();
            if (fn.key !== 'sqrt') return false;
            return state.b >= fn.domain.bPractical - 1e-6;
        }
        function checkDomain(fn, x) {
            if (fn.key === 'inv') return Math.abs(x) > 1e-9;
            var d = fn.domain;
            var okLow = d.aOpen ? x > d.aMin + 1e-9 : x >= d.aMin - 1e-9;
            var okHigh = d.bUnbounded ? true : (d.bOpen ? x < d.bMax - 1e-9 : x <= d.bMax + 1e-9);
            return okLow && okHigh;
        }

        // Min/max av f över [a,b] via tät sampling — hittar INRE extrempunkter
        // (t.ex. parabelns topp), inte bara ändpunkterna. Avgör även om
        // extremvärdet är "med" (closed) eller bara en gräns som inte nås
        // (open), baserat på om det uppnås av en inkluderad x-punkt.
        function computeRange(fn, a, b, aOpen, bOpen) {
            var N = 480, yMin = Infinity, yMax = -Infinity, samples = [];
            for (var i = 0; i <= N; i++) {
                var t = i / N, x = a + (b - a) * t, y = fn.f(x);
                if (!isFinite(y)) continue;
                var included = !((aOpen && i === 0) || (bOpen && i === N));
                samples.push({ x: x, y: y, included: included });
                if (y < yMin) yMin = y;
                if (y > yMax) yMax = y;
            }
            var tol = Math.max((yMax - yMin) * 0.004, 1e-4);
            var xAtMin = a, xAtMax = a, bestMinD = Infinity, bestMaxD = Infinity;
            var yMinIncluded = false, yMaxIncluded = false;
            samples.forEach(function (p) {
                var dmin = Math.abs(p.y - yMin), dmax = Math.abs(p.y - yMax);
                if (dmin < bestMinD) { bestMinD = dmin; xAtMin = p.x; }
                if (dmax < bestMaxD) { bestMaxD = dmax; xAtMax = p.x; }
                if (p.included && dmin <= tol) yMinIncluded = true;
                if (p.included && dmax <= tol) yMaxIncluded = true;
            });
            return {
                yMin: yMin, yMax: yMax, yMinOpen: !yMinIncluded, yMaxOpen: !yMaxIncluded,
                xAtMin: xAtMin, xAtMax: xAtMax
            };
        }
        function naiveRange(fn, a, b) {
            var fa = fn.f(a), fb = fn.f(b);
            return { min: Math.min(fa, fb), max: Math.max(fa, fb) };
        }

        // ── Notation-byggare (genomgångens skrivsätt: "a ≤ x ≤ b") ─────────
        function xIneqTex(a, b, aOpen, bOpen, bUnbounded) {
            if (bUnbounded) return fmtTex(a, 2) + (aOpen ? ' < ' : ' \\leq ') + 'x';
            return fmtTex(a, 2) + (aOpen ? ' < ' : ' \\leq ') + 'x' + (bOpen ? ' < ' : ' \\leq ') + fmtTex(b, 2);
        }
        function yIneqTex(yMin, yMax, yMinOpen, yMaxOpen, yUnbounded) {
            if (yUnbounded) return fmtTex(yMin, 2) + (yMinOpen ? ' < ' : ' \\leq ') + 'y';
            return fmtTex(yMin, 2) + (yMinOpen ? ' < ' : ' \\leq ') + 'y' + (yMaxOpen ? ' < ' : ' \\leq ') + fmtTex(yMax, 2);
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Vad går in, vad kommer ut?';
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
            'aria-label': 'Interaktiv graf: en funktionskurva med ett dragbart x-intervall på ' +
                'x-axeln. Den valda kurvbiten lyser upp, och motsvarande y-intervall projiceras ' +
                'på y-axeln.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var machineCard = document.createElement('div');
        machineCard.style.display = 'none';
        machineCard.style.flexWrap = 'wrap';
        machineCard.style.alignItems = 'center';
        machineCard.style.justifyContent = 'center';
        machineCard.style.gap = '10px';
        machineCard.style.margin = '12px 0 2px';
        card.appendChild(machineCard);

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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · In och ut' },
            { n: 2, label: '2 · Hela funktionens mängder' },
            { n: 3, label: '3 · Maskinen' }
        ];
        var INSTR = {
            1: 'Dra i de blå handtagen på <em>x</em>-axeln för att välja vilka <em>x</em>-värden ' +
               'som matas in. Den lysande kurvbiten visar vad som händer med dem. ' +
               '<strong>Gissa värdemängden innan du kollar!</strong>',
            2: 'Klicka på knappen för att se HELA funktionens definitions- och värdemängd — så ' +
               'långt <em>x</em> respektive <em>y</em> får sträcka sig totalt. Byt gärna funktion ' +
               'ovan och se hur gränserna skiljer sig åt mellan funktionerna.',
            3: 'Skriv in ett <em>x</em>-värde (eller dra i punkten på <em>x</em>-axeln). Maskinen ' +
               'matar ut <em>f</em>(<em>x</em>) om <em>x</em> tillhör definitionsmängden — annars ' +
               'vägrar den ta emot talet.'
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
        function legendItem() {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            span.appendChild(sw);
            var txt = document.createElement('span');
            span.appendChild(txt);
            return { el: span, sw: sw, txt: txt };
        }
        var legCurve = legendItem();
        legCurve.sw.style.borderTopColor = COL.curve;
        var legIn = legendItem();
        legIn.sw.style.borderTopColor = COL.xband;
        legIn.txt.textContent = 'matas in (x)';
        var legOut = legendItem();
        legOut.sw.style.borderTopColor = COL.yband;
        legOut.txt.textContent = 'kommer ut (y)';
        legend.appendChild(legCurve.el);
        legend.appendChild(legIn.el);
        legend.appendChild(legOut.el);
        function syncLegendCurve() { katexInto(legCurve.txt, curFunc().tex); }

        // ── Formel-rader med etikett ──────────────────────────────────────
        function setLabeledFormula(container, label, tex, color) {
            container.innerHTML = '';
            container.style.display = 'flex';
            container.style.alignItems = 'baseline';
            container.style.justifyContent = 'center';
            container.style.gap = '9px';
            container.style.color = color;
            var lbl = document.createElement('span');
            lbl.textContent = label;
            lbl.style.fontFamily = 'var(--lab-font-mono)';
            lbl.style.fontSize = '11px';
            lbl.style.letterSpacing = '0.06em';
            lbl.style.textTransform = 'uppercase';
            lbl.style.opacity = '0.72';
            lbl.style.whiteSpace = 'nowrap';
            container.appendChild(lbl);
            var math = document.createElement('span');
            container.appendChild(math);
            katexInto(math, tex);
        }

        // ── Knappar (actions-raden) ────────────────────────────────────────
        var revealBtn = document.createElement('button');
        revealBtn.type = 'button';
        revealBtn.className = 'lab-btn';
        revealBtn.textContent = 'Visa värdemängden';
        revealBtn.addEventListener('click', function () { state.revealY = true; update(); });
        actions.appendChild(revealBtn);

        var wholeBtn = document.createElement('button');
        wholeBtn.type = 'button';
        wholeBtn.className = 'lab-btn';
        wholeBtn.textContent = 'Visa hela definitionsmängden';
        wholeBtn.addEventListener('click', function () {
            var fn = curFunc();
            state.wholeShown = true;
            if (fn.key === 'quad') { state.a = fn.domain.aMin; state.b = fn.domain.bMax; }
            else if (fn.key === 'sqrt') { state.a = fn.domain.aMin; state.b = fn.domain.bPractical; }
            rowA.sync(); rowB.sync();
            update();
        });
        actions.appendChild(wholeBtn);

        // ── Glidare (a, b, machineX) ────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + 'var(--lab-line-strong)' + ' ' + pct + '%, ' + 'var(--lab-line-strong)' + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(v);
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
                row: row,
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), 2).replace(',', '.');
                    paint();
                }
            };
        }
        var rowA = makeRow('a', -4, 8, 0.1,
            function () { return state.a; },
            function (v) {
                var db = dragBounds(), fn = curFunc();
                v = clampNum(v, db.aMin, db.bMax);
                state.a = Math.min(v, state.b - fn.gap);
                if (state.a < db.aMin) state.a = db.aMin;
                state.wholeShown = false;
            });
        var rowB = makeRow('b', -4, 8, 0.1,
            function () { return state.b; },
            function (v) {
                var db = dragBounds(), fn = curFunc();
                v = clampNum(v, db.aMin, db.bMax);
                state.b = Math.max(v, state.a + fn.gap);
                if (state.b > db.bMax) state.b = db.bMax;
                state.wholeShown = false;
            });
        var rowX = makeRow('x', -4, 8, 0.1,
            function () { return state.machineX; },
            function (v) {
                var fn = curFunc();
                state.machineX = clampNum(v, fn.machine.min, fn.machine.max);
            });

        function syncSliderRanges() {
            var db = dragBounds(), fn = curFunc();
            var aSlider = rowA.row.querySelector('.lab-graf-slider'), aField = rowA.row.querySelector('.lab-graf-num');
            var bSlider = rowB.row.querySelector('.lab-graf-slider'), bField = rowB.row.querySelector('.lab-graf-num');
            var xSlider = rowX.row.querySelector('.lab-graf-slider'), xField = rowX.row.querySelector('.lab-graf-num');
            aSlider.min = aField.min = db.aMin; aSlider.max = aField.max = db.bMax;
            bSlider.min = bField.min = db.aMin; bSlider.max = bField.max = db.bMax;
            xSlider.min = xField.min = fn.machine.min; xSlider.max = xField.max = fn.machine.max;
            rowA.sync(); rowB.sync(); rowX.sync();
        }

        // ── Funktionsval (radioknappar) ──────────────────────────────────
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
            radio.name = 'defvarde-func-' + uid;
            radio.checked = idx === state.funcIdx;
            radio.addEventListener('change', function () {
                if (!radio.checked) return;
                selectFunc(idx);
            });
            lbl.appendChild(radio);
            var span = document.createElement('span');
            funcRow.appendChild(lbl);
            lbl.appendChild(span);
            katexInto(span, fn.tex);
            funcRadios.push(radio);
        });
        controls.insertBefore(funcRow, controls.firstChild);
        uid++;

        function selectFunc(idx) {
            stopAnim();
            state.funcIdx = idx;
            var fn = curFunc();
            state.a = fn.def.a; state.b = fn.def.b;
            state.revealY = false; state.wholeShown = false;
            state.machineX = fn.machine.def;
            syncLegendCurve();
            syncSliderRanges();
            update();
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            funcRadios.forEach(function (r, i) { r.checked = i === 0; });
            state.step = 1;
            selectFunc(0);
        });
        foot.appendChild(reset);

        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }

        // ── Dragbara handtag i scenen ───────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var w = curWin();
            return w.XMIN + (px - L) / PW * (w.XMAX - w.XMIN);
        }
        var dragging = null; // 'a' | 'b' | 'x' | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = toWorldX(e.clientX);
            var fn = curFunc();
            if (dragging === 'a') {
                var db = dragBounds();
                xw = clampNum(Math.round(xw / fn.step) * fn.step, db.aMin, db.bMax);
                state.a = Math.min(xw, state.b - fn.gap);
                if (state.a < db.aMin) state.a = db.aMin;
                state.wholeShown = false;
                rowA.sync();
            } else if (dragging === 'b') {
                var db2 = dragBounds();
                xw = clampNum(Math.round(xw / fn.step) * fn.step, db2.aMin, db2.bMax);
                state.b = Math.max(xw, state.a + fn.gap);
                if (state.b > db2.bMax) state.b = db2.bMax;
                state.wholeShown = false;
                rowB.sync();
            } else if (dragging === 'x') {
                xw = clampNum(Math.round(xw / fn.step) * fn.step, fn.machine.min, fn.machine.max);
                state.machineX = xw;
                rowX.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function startDrag(which) {
            return function (e) {
                dragging = which;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            };
        }

        // ── Rita scenen ───────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawAxesAndGrid(g0) {
            var fn = curFunc(), w = fn.win, axisY = Y(0), axisX = X(0), i;
            var i0 = Math.ceil(w.XMIN), i1 = Math.floor(w.XMAX);
            for (i = i0; i <= i1; i++) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            var j0 = Math.ceil(w.YMIN), j1 = Math.floor(w.YMAX);
            for (i = j0; i <= j1; i++) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            return { axisX: axisX, axisY: axisY, i0: i0, i1: i1, j0: j0, j1: j1 };
        }
        function drawTickLabels(ax, skipXNear, skipYNear) {
            var i;
            for (i = ax.i0; i <= ax.i1; i++) {
                if (i === 0) continue;
                var skip = skipXNear.some(function (v) { return Math.abs(i - v) < 0.55; });
                if (skip) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: ax.axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = ax.j0; i <= ax.j1; i++) {
                if (i === 0) continue;
                var skipY = skipYNear.some(function (v) { return Math.abs(i - v) < 0.45; });
                if (skipY) continue;
                svg.appendChild(svgVarText(
                    { x: ax.axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }
        }
        function pathForRange(fn, x0, x1, N) {
            var d = '', penDown = false, w = fn.win;
            for (var i = 0; i <= N; i++) {
                var xv = x0 + (x1 - x0) * i / N;
                var yv = fn.f(xv);
                if (isFinite(yv) && yv <= w.YMAX + 6 && yv >= w.YMIN - 6) {
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            return d;
        }
        function drawEndMarker(g0, cx, cy, isOpen, color) {
            if (isOpen) {
                g0.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 5.5, fill: 'none', stroke: color, 'stroke-width': 2.2 }));
            } else {
                g0.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 5, fill: color }));
            }
        }
        function drawArrowMark(g0, cx, cy, dx, dy, color) {
            // Liten pilspets som markerar "fortsätter obegränsat" i riktning (dx,dy).
            var len = 9;
            var px = cx + dx * len, py = cy + dy * len;
            var nx = -dy, ny = dx;
            g0.appendChild(svgEl('polygon', {
                points: px + ',' + py + ' ' + (cx + nx * 4.5) + ',' + (cy + ny * 4.5) + ' ' + (cx - nx * 4.5) + ',' + (cy - ny * 4.5),
                fill: color
            }));
        }

        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var fn = curFunc(), d = fn.domain;
            var showBand = state.step === 1 || state.step === 2;
            var showY = (state.step === 1 && state.revealY) || state.step === 2;

            var ax = drawAxesAndGrid();
            var skipX = showBand ? [state.a, state.b] : [];
            var skipY = [];

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            var rng = null;
            if (showY && fn.key !== 'inv') {
                rng = computeRange(fn, state.a, state.b, curAOpen(), curBOpen());
                skipY = [rng.yMin, rng.yMax];
            } else if (state.step === 3 && checkDomain(fn, state.machineX)) {
                skipY = [fn.f(state.machineX)];
                skipX = [state.machineX];
            }

            // Dimmad heldragen kurva över hela funktionens ritbara domän.
            if (fn.key === 'inv') {
                var gapPx = 0.06;
                g.appendChild(svgEl('path', { d: pathForRange(fn, fn.win.XMIN, -gapPx, 220), fill: 'none', stroke: COL.curveDim, 'stroke-width': 2.2, 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: pathForRange(fn, gapPx, fn.win.XMAX, 220), fill: 'none', stroke: COL.curveDim, 'stroke-width': 2.2, 'stroke-linecap': 'round' }));
            } else {
                var domA = d.aOpen ? d.aMin : d.aMin, domB = d.bUnbounded ? fn.win.XMAX : d.bMax;
                g.appendChild(svgEl('path', { d: pathForRange(fn, domA, domB, 260), fill: 'none', stroke: COL.curveDim, 'stroke-width': 2.2, 'stroke-linecap': 'round' }));
            }

            if (state.step !== 3) {
                // Lysande kurvbit för det valda intervallet.
                g.appendChild(svgEl('path', {
                    d: pathForRange(fn, state.a, state.b, 160), fill: 'none', stroke: COL.curve,
                    'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
                }));

                // y-band + projektionslinjer.
                if (showY) {
                    if (fn.key === 'inv' && state.wholeShown) {
                        drawInvWholeOverlay(g);
                    } else {
                        // OBS: när yUnb är sant är det ALLTID yMax-änden (stora y, sqrt
                        // stigande) som är den "obegränsade" — yMin är då den riktiga,
                        // beräknade gränsen. Bandet ska då spänna hela vägen från den
                        // riktiga yMin-gränsen upp till fönstrets överkant (pil), inte
                        // bara en liten bit ovanför det praktiska klippvärdet f(b).
                        var yUnb = fn.key === 'sqrt' && curBUnbounded();
                        var yTopPx = yUnb ? (T - 2) : Y(rng.yMax);
                        g.appendChild(svgEl('line', {
                            x1: ax.axisX, y1: yTopPx, x2: ax.axisX, y2: Y(rng.yMin),
                            stroke: COL.yband, 'stroke-width': 7, opacity: 0.30, 'stroke-linecap': 'round'
                        }));
                        // Projektionslinje från kurvans lägsta punkt (alltid en riktig,
                        // beräknad punkt) till y-axeln.
                        g.appendChild(svgEl('line', { x1: X(rng.xAtMin), y1: Y(rng.yMin), x2: ax.axisX, y2: Y(rng.yMin), stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                        if (!yUnb) g.appendChild(svgEl('line', { x1: X(rng.xAtMax), y1: Y(rng.yMax), x2: ax.axisX, y2: Y(rng.yMax), stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                        drawEndMarker(g, ax.axisX, Y(rng.yMin), rng.yMinOpen, COL.yband);
                        if (yUnb) drawArrowMark(g, ax.axisX, T - 2, 0, -1, COL.yband);
                        else drawEndMarker(g, ax.axisX, Y(rng.yMax), rng.yMaxOpen, COL.yband);
                        svg.appendChild(svgVarText({ x: ax.axisX - 9, y: Y(rng.yMin) + 12, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.yband }, [fmtDisp(rng.yMin, 2)]));
                        if (!yUnb) svg.appendChild(svgVarText({ x: ax.axisX - 9, y: Y(rng.yMax) - 5, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.yband }, [fmtDisp(rng.yMax, 2)]));
                    }
                }

                // x-band + handtag.
                if (showBand && !(fn.key === 'inv' && state.wholeShown)) {
                    var xA = X(state.a), xB = X(state.b);
                    g.appendChild(svgEl('line', { x1: xA, y1: ax.axisY, x2: xB, y2: ax.axisY, stroke: COL.xband, 'stroke-width': 7, opacity: 0.30, 'stroke-linecap': 'round' }));
                    drawEndMarker(g, xA, ax.axisY, curAOpen(), COL.xband);
                    var bUnb = fn.key === 'sqrt' && curBUnbounded();
                    if (bUnb) drawArrowMark(g, xB, ax.axisY, 1, 0, COL.xband);
                    else drawEndMarker(g, xB, ax.axisY, curBOpen(), COL.xband);
                    svg.appendChild(svgVarText({ x: xA, y: ax.axisY + 30, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.xband }, [fmtDisp(state.a, 2)]));
                    if (!bUnb) svg.appendChild(svgVarText({ x: xB, y: ax.axisY + 30, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.xband }, [fmtDisp(state.b, 2)]));

                    var hitA = svgEl('circle', { cx: xA, cy: ax.axisY, r: 16, fill: 'rgba(0,0,0,0)' });
                    hitA.style.cursor = 'grab';
                    hitA.addEventListener('pointerdown', startDrag('a'));
                    svg.appendChild(hitA);
                    var hitB = svgEl('circle', { cx: xB, cy: ax.axisY, r: 16, fill: 'rgba(0,0,0,0)' });
                    hitB.style.cursor = 'grab';
                    hitB.addEventListener('pointerdown', startDrag('b'));
                    svg.appendChild(hitB);
                }
                if (fn.key === 'inv' && state.wholeShown) {
                    // Håltecken vid origo på båda axlarna.
                    drawEndMarker(g, ax.axisX, ax.axisY, true, COL.axis);
                }
            } else {
                // Steg 3: maskinen — enskild punkt.
                var mx = state.machineX, inDom = checkDomain(fn, mx);
                if (inDom) {
                    var my = fn.f(mx), px = X(mx), py = Y(my);
                    g.appendChild(svgEl('line', { x1: px, y1: ax.axisY, x2: px, y2: py, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
                    g.appendChild(svgEl('line', { x1: px, y1: py, x2: ax.axisX, y2: py, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
                    g.appendChild(svgEl('circle', { cx: px, cy: py, r: 5.5, fill: COL.curve }));
                    g.appendChild(svgEl('circle', { cx: px, cy: ax.axisY, r: 4, fill: COL.xband }));
                    g.appendChild(svgEl('circle', { cx: ax.axisX, cy: py, r: 4, fill: COL.yband }));
                } else {
                    var px2 = X(mx);
                    g.appendChild(svgEl('line', { x1: px2 - 6, y1: ax.axisY - 6, x2: px2 + 6, y2: ax.axisY + 6, stroke: COL.reject, 'stroke-width': 2.6, 'stroke-linecap': 'round' }));
                    g.appendChild(svgEl('line', { x1: px2 - 6, y1: ax.axisY + 6, x2: px2 + 6, y2: ax.axisY - 6, stroke: COL.reject, 'stroke-width': 2.6, 'stroke-linecap': 'round' }));
                }
                var hitX = svgEl('circle', { cx: X(mx), cy: ax.axisY, r: 16, fill: 'rgba(0,0,0,0)' });
                hitX.style.cursor = 'grab';
                hitX.addEventListener('pointerdown', startDrag('x'));
                svg.appendChild(hitX);
            }

            drawTickLabels(ax, skipX, skipY);
            return rng;
        }

        // Statisk overlay: 1/x:s HELA definitions-/värdemängd — båda grenarna
        // markerade, öppna håltecken vid x = 0 och y = 0 (dubbla luckor).
        function drawInvWholeOverlay(g) {
            var w = curFunc().win, axisY = Y(0), axisX = X(0);
            [{ x0: w.XMIN, x1: -0.08 }, { x0: 0.08, x1: w.XMAX }].forEach(function (seg) {
                g.appendChild(svgEl('line', { x1: X(seg.x0), y1: axisY, x2: X(seg.x1), y2: axisY, stroke: COL.xband, 'stroke-width': 7, opacity: 0.26, 'stroke-linecap': 'round' }));
            });
            [{ y0: w.YMIN, y1: -0.08 }, { y0: 0.08, y1: w.YMAX }].forEach(function (seg) {
                g.appendChild(svgEl('line', { x1: axisX, y1: Y(seg.y0), x2: axisX, y2: Y(seg.y1), stroke: COL.yband, 'stroke-width': 7, opacity: 0.26, 'stroke-linecap': 'round' }));
            });
            drawArrowMark(g, X(w.XMAX) - 4, axisY, 1, 0, COL.xband);
            drawArrowMark(g, X(w.XMIN) + 4, axisY, -1, 0, COL.xband);
            drawArrowMark(g, axisX, Y(w.YMAX) + 4, 0, -1, COL.yband);
            drawArrowMark(g, axisX, Y(w.YMIN) - 4, 0, 1, COL.yband);
            drawEndMarker(g, axisX, axisY, true, COL.axis);
        }

        // ── Maskinkort (steg 3) ──────────────────────────────────────────
        function mkBox(text, kind) {
            var box = document.createElement('div');
            box.style.padding = '8px 14px';
            box.style.borderRadius = '6px';
            box.style.fontFamily = 'var(--lab-font-mono)';
            box.style.fontSize = '13.5px';
            box.style.border = '1px solid var(--lab-line-strong)';
            box.style.minWidth = '64px';
            box.style.textAlign = 'center';
            if (kind === 'machine') {
                box.style.background = 'var(--lab-ink)';
                box.style.color = 'var(--lab-bg-panel)';
                box.style.borderColor = 'var(--lab-ink)';
            } else if (kind === 'ok') {
                box.style.background = 'rgba(74,125,58,0.14)';
                box.style.borderColor = COL.yband;
                box.style.color = COL.yband;
            } else if (kind === 'reject') {
                box.style.background = 'rgba(200,50,74,0.10)';
                box.style.borderColor = COL.reject;
                box.style.color = COL.reject;
            } else {
                box.style.background = 'var(--lab-bg-raised)';
                box.style.color = COL.xband;
            }
            box.textContent = text;
            return box;
        }
        function mkArrow() {
            var a = document.createElement('span');
            a.textContent = '→';
            a.style.fontSize = '18px';
            a.style.color = 'var(--lab-ink-soft)';
            return a;
        }
        function updateMachine() {
            machineCard.innerHTML = '';
            var fn = curFunc(), x = state.machineX, inDom = checkDomain(fn, x);
            machineCard.appendChild(mkBox('x = ' + fmtDisp(x, 2), 'in'));
            machineCard.appendChild(mkArrow());
            machineCard.appendChild(mkBox('f', 'machine'));
            machineCard.appendChild(mkArrow());
            if (inDom) {
                machineCard.appendChild(mkBox('f(x) = ' + fmtDisp(fn.f(x), 2), 'ok'));
            } else {
                machineCard.appendChild(mkBox('avvisas', 'reject'));
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas(rng) {
            var fn = curFunc();
            if (state.step === 3) return;
            var inLabel = state.wholeShown ? 'Definitionsmängd' : 'Matar in';
            var outLabel = state.wholeShown ? 'Värdemängd' : 'Kommer ut';
            if (fn.key === 'inv' && state.wholeShown) {
                setLabeledFormula(formelA, inLabel, 'x \\neq 0', COL.xband);
                setLabeledFormula(formelB, outLabel, 'y \\neq 0', COL.yband);
                return;
            }
            var bUnb = fn.key === 'sqrt' && curBUnbounded();
            setLabeledFormula(formelA, inLabel, xIneqTex(state.a, state.b, curAOpen(), curBOpen(), bUnb), COL.xband);
            var showY = (state.step === 1 && state.revealY) || state.step === 2;
            if (showY && rng) {
                setLabeledFormula(formelB, outLabel, yIneqTex(rng.yMin, rng.yMax, rng.yMinOpen, rng.yMaxOpen, bUnb), COL.yband);
            } else {
                formelB.innerHTML = '';
            }
        }

        function buildTrapNote(rng, naive) {
            var trapMax = rng.yMax > naive.max + 1e-6;
            var trapMin = rng.yMin < naive.min - 1e-6;
            if (!trapMax && !trapMin) {
                return 'Gissningen stämde! Grafen är hela tiden stigande eller fallande i det här ' +
                    'intervallet, så den största och minsta utmatningen ligger precis i ändpunkterna.';
            }
            var which = trapMax ? 'en TOPP' : 'en DAL';
            var word = trapMax ? 'högsta' : 'lägsta';
            var val = trapMax ? fmt(rng.yMax, 2) : fmt(rng.yMin, 2);
            return 'Se upp — grafen har ' + which + ' mitt i intervallet! Ändpunkterna räcker inte: ' +
                'den verkliga ' + word + ' utmatningen är <em>f</em>(<em>x</em>) = ' + val +
                ', inte något av ändpunktsvärdena.';
        }

        // ── Visa/dölj per steg + omritning ─────────────────────────────────
        function update() {
            var fn = curFunc();
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legend.style.display = state.step === 3 ? 'none' : '';
            machineCard.style.display = state.step === 3 ? 'flex' : 'none';
            rowA.row.style.display = state.step === 3 ? 'none' : '';
            rowB.row.style.display = state.step === 3 ? 'none' : '';
            rowX.row.style.display = state.step === 3 ? '' : 'none';
            revealBtn.style.display = (state.step === 1 && !state.revealY) ? '' : 'none';
            wholeBtn.style.display = state.step === 2 ? '' : 'none';
            actions.style.display = (state.step === 1 || state.step === 2) ? '' : 'none';
            formelA.style.display = state.step === 3 ? 'none' : '';
            formelB.style.display = state.step === 3 ? 'none' : '';

            var rng = drawMain();
            updateFormulas(rng);
            updateMachine();

            if (state.step === 1) {
                if (!state.revealY) {
                    note.style.display = '';
                    note.style.color = 'var(--lab-ink-soft)';
                    note.innerHTML = 'Gissa: blir värdemängden bara <em>f</em>(<em>a</em>) och ' +
                        '<em>f</em>(<em>b</em>) — eller gömmer grafen något mitt emellan?';
                } else if (rng) {
                    var naive = naiveRange(fn, state.a, state.b);
                    note.style.display = '';
                    note.style.color = (rng.yMax > naive.max + 1e-6 || rng.yMin < naive.min - 1e-6) ? COL.reject : COL.yband;
                    note.innerHTML = buildTrapNote(rng, naive);
                }
            } else if (state.step === 2) {
                note.style.display = '';
                note.style.color = 'var(--lab-ink-soft)';
                note.innerHTML = state.wholeShown ? fn.naturalNote :
                    'Just nu visas bara ett utvalt intervall. Klicka på knappen nedan för att se HELA definitions- och värdemängden.';
            } else {
                note.style.display = 'none';
                note.textContent = '';
            }
        }

        syncLegendCurve();
        syncSliderRanges();
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
    window.VISUALISERINGAR['ma1c-4.9'] = api;
})();
