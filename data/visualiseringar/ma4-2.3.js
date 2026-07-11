/* ma4-2.3.js — visualisering: "Kedjeregeln som tre kopplade tallinjer".
 * Hör till ma4-2.3 (derivatan av sammansatta funktioner och kedjeregeln)
 * och ma4-2.4 (tillämpningar av kedjeregeln, dy/dx = dy/du · du/dx).
 *
 * Kärninsikt: derivatan är en lokal FÖRSTORINGSFAKTOR. Att sätta samman två
 * funktioner (y = f(g(x))) MULTIPLICERAR förstoringsfaktorerna — "inre
 * gånger yttre" är två stämplar av sträckning som komponeras. Detta görs
 * bokstavligt genom tre vågräta tallinjer (x, u = g(x), y = f(u)) staplade
 * ovanpå varandra: en punkt på linje 1 avbildas via tunna trådar till linje
 * 2, sedan till linje 3. Ett litet fast intervall Δx runt x avbildas till
 * Δu och Δy — och kvoten Δy⁄Δx närmar sig produkten g′(x)·f′(u).
 *
 * Tre förval (radioknappar), färgkodade inre (grön) / yttre (blå) exakt
 * som genomgångens ord "inre funktion" / "yttre funktion":
 *   y = sin(x²)      — startvärde x = 0,7 (u = 0,49, y ≈ 0,47). Inte x = 1,2:
 *                      då hamnar u = 1,44 farligt nära sinus max (π/2 ≈ 1,57)
 *                      och Δy⁄Δx byter TECKEN jämfört med g′(x)·f′(u) för
 *                      varje Δx stor nog att synas — se kommentar vid FUNCS.
 *   y = e^(2x)        — startvärde x = 0,5 (u = 1, y ≈ e ≈ 2,72)
 *   y = (3x + 1)⁵     — startvärde x = 0,15
 *
 * Tre steg (lager):
 *   1. Kedjan                — bara avbildningen x → u → y (dra punkten
 *                              eller glidaren); live-formler u = g(x) och
 *                              y = f(u) med aktuella tal.
 *   2. Förstoringsfaktorerna — ett fast litet intervall Δx runt x ritas som
 *                              en klammer, med sina bilder Δu och Δy på de
 *                              andra linjerna (beräknade exakt, inte
 *                              linjäriserat). Faktorerna g′(x) och f′(u)
 *                              visas som "×"-märken mellan linjerna, och
 *                              ändringskvoten Δy⁄Δx jämförs med produkten
 *                              g′(x)·f′(u).
 *   3. Kedjeregeln           — kedjeregeln y′ = f′(g(x))·g′(x) skriven med
 *                              aktuella tal, jämförd mot Δy⁄Δx, plus en
 *                              varning för det vanliga felet att glömma
 *                              den inre derivatan.
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
    // Höjer decimalantalet tills värdet inte längre avrundas till exakt "0"
    // (annars kan t.ex. Δy visas som "0" i en bråkrad trots att kvoten
    // Δy⁄Δx intill inte är 0 — motsägelsefullt för eleven).
    function autoDec(v, base, max) {
        var d = base;
        while (d < max && Math.abs(v) > 1e-9 && parseFloat(v.toFixed(d)) === 0) d++;
        return d;
    }

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
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        inner: '#3f7d3a',   // inre funktion g — grön
        outer: '#2563c9',   // yttre funktion f — blå
        delta: '#9c6b12',   // det givna intervallet Δx — amber
        warn: '#c8324a'     // varning ("vanligt fel") — röd
    };

    // ── Funktionsval: inre g(x), yttre f(u) ───────────────────────────────
    // gSub/fSub/gPrimeSub/fPrimeSub returnerar KaTeX-strängar med aktuellt
    // tal insatt i uttrycket (för live-formlerna).
    var FUNCS = [
        {
            key: 'sin_x2',
            radioHtml: '<em>y</em> = sin(<em>x</em><sup>2</sup>)',
            innerHtml: '<em>g</em>(<em>x</em>) = <em>x</em><sup>2</sup>',
            outerHtml: '<em>f</em>(<em>u</em>) = sin <em>u</em>',
            g: function (x) { return x * x; },
            gPrime: function (x) { return 2 * x; },
            f: function (u) { return Math.sin(u); },
            fPrime: function (u) { return Math.cos(u); },
            gSub: function (xv) { return '(' + fmtTex(xv, 2) + ')^2'; },
            gPrimeSub: function (xv) { return '2\\cdot ' + fmtTex(xv, 2); },
            fSub: function (uv) { return '\\sin(' + fmtTex(uv, 2) + ')'; },
            fPrimeSub: function (uv) { return '\\cos(' + fmtTex(uv, 2) + ')'; },
            // xDefault = 0,7 (inte 1,2) — x = 1,2 ger u = 1,44, farligt nära
            // sinus max vid u = π/2 ≈ 1,57: minsta Δx som passerar toppen
            // (även Δx = 0,1) ger fel TECKEN på Δy⁄Δx jämfört med g′(x)·f′(u).
            // Vid x = 0,7 (u = 0,49) ligger sammansättningens andraderivata
            // nära noll (x²:s konvexitet och sinus konkavitet tar nästan ut
            // varandra), så Δy⁄Δx ≈ g′(x)·f′(u) stämmer fint redan vid
            // Δx = 0,3 — en ärlig OCH pedagogisk approximation.
            xMin: -3, xMax: 3, xTick: 1, xDefault: 0.7, xStep: 0.05, deltaX: 0.3,
            uTick: 2, yTick: 0.5
        },
        {
            key: 'e_2x',
            radioHtml: '<em>y</em> = e<sup>2<em>x</em></sup>',
            innerHtml: '<em>g</em>(<em>x</em>) = 2<em>x</em>',
            outerHtml: '<em>f</em>(<em>u</em>) = e<sup><em>u</em></sup>',
            g: function (x) { return 2 * x; },
            gPrime: function () { return 2; },
            f: function (u) { return Math.exp(u); },
            fPrime: function (u) { return Math.exp(u); },
            gSub: function (xv) { return '2\\cdot ' + fmtTex(xv, 2); },
            gPrimeSub: function () { return '2'; },
            fSub: function (uv) { return 'e^{' + fmtTex(uv, 2) + '}'; },
            fPrimeSub: function (uv) { return 'e^{' + fmtTex(uv, 2) + '}'; },
            xMin: -1.5, xMax: 1.5, xTick: 0.5, xDefault: 0.5, xStep: 0.05, deltaX: 0.1,
            uTick: 1, yTick: 5
        },
        {
            key: 'lin5',
            radioHtml: '<em>y</em> = (3<em>x</em> + 1)<sup>5</sup>',
            innerHtml: '<em>g</em>(<em>x</em>) = 3<em>x</em> + 1',
            outerHtml: '<em>f</em>(<em>u</em>) = <em>u</em><sup>5</sup>',
            g: function (x) { return 3 * x + 1; },
            gPrime: function () { return 3; },
            f: function (u) { return Math.pow(u, 5); },
            fPrime: function (u) { return 5 * Math.pow(u, 4); },
            gSub: function (xv) { return '3\\cdot ' + fmtTex(xv, 2) + '+1'; },
            gPrimeSub: function () { return '3'; },
            fSub: function (uv) { return '(' + fmtTex(uv, 2) + ')^5'; },
            fPrimeSub: function (uv) { return '5\\cdot(' + fmtTex(uv, 2) + ')^4'; },
            xMin: -0.5, xMax: 0.5, xTick: 0.25, xDefault: 0.15, xStep: 0.01, deltaX: 0.03,
            uTick: 0.5, yTick: 25
        }
    ];

    // ── Domäner för u- och y-linjerna, uträknade ur g/f (cachas per fn) ───
    function sampleRange(fn, lo, hi, n) {
        var min = Infinity, max = -Infinity;
        for (var i = 0; i <= n; i++) {
            var t = lo + (hi - lo) * i / n;
            var v = fn(t);
            if (v < min) min = v;
            if (v > max) max = v;
        }
        return [min, max];
    }
    function padRange(r, padFrac, padMin) {
        var span = r[1] - r[0];
        var pad = Math.max(span * padFrac, padMin);
        return [r[0] - pad, r[1] + pad];
    }
    function domainsFor(fn) {
        if (fn._dom) return fn._dom;
        var uR = padRange(sampleRange(fn.g, fn.xMin, fn.xMax, 240), 0.08, 0.3);
        var yR = padRange(sampleRange(fn.f, uR[0], uR[1], 240), 0.08, 0.3);
        fn._dom = { uMin: uR[0], uMax: uR[1], yMin: yR[0], yMax: yR[1] };
        return fn._dom;
    }

    function decimalsForStep(step) {
        if (Math.abs(step - Math.round(step)) < 1e-9) return 0;
        if (Math.abs(step * 10 - Math.round(step * 10)) < 1e-9) return 1;
        return 2;
    }
    function ticksFor(min, max, step) {
        var ticks = [];
        var start = Math.ceil((min - 1e-9) / step) * step;
        for (var t = start; t <= max + 1e-9; t += step) ticks.push(Math.round(t / step) * step);
        return ticks;
    }

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, fnIdx: 0, x: FUNCS[0].xDefault };
        function curFn() { return FUNCS[state.fnIdx]; }

        // ── Geometri: tre vågräta tallinjer staplade med luft emellan ──────
        var W = 560, H = 460, L = 58, R = 120;
        var PW = W - L - R;
        var Y1 = 90, Y2 = 250, Y3 = 410;
        var GAP1 = (Y1 + Y2) / 2, GAP2 = (Y2 + Y3) / 2;

        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var fn = curFn();
            return fn.xMin + (px - L) / PW * (fn.xMax - fn.xMin);
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Kedjeregeln som tre kopplade tallinjer';
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
            'aria-label': 'Tre vågräta tallinjer staplade ovanpå varandra: x överst, ' +
                'u lika med g av x i mitten, y lika med f av u underst. En punkt på ' +
                'x-linjen avbildas med trådar till de andra linjerna. Dra punkten för ' +
                'att utforska kedjeregeln.'
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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Kedjan' },
            { n: 2, label: '2 · Förstoringsfaktorerna' },
            { n: 3, label: '3 · Kedjeregeln' }
        ];
        var INSTR = {
            1: 'Dra punkten på den översta linjen (eller <em>x</em>-glidaren). Trådarna ' +
               'visar hur <em>x</em> avbildas till <em>u</em> = <em>g</em>(<em>x</em>) på ' +
               'mittenlinjen, och vidare till <em>y</em> = <em>f</em>(<em>u</em>) på den ' +
               'understa linjen.',
            2: 'Ett litet fast intervall Δ<em>x</em> runt <em>x</em> ritas som en klammer. ' +
               'Dess bild Δ<em>u</em> på mittenlinjen och Δ<em>y</em> på understa linjen ' +
               'räknas fram exakt — inte linjäriserat. Faktorerna <em>g</em>′(<em>x</em>) ' +
               'och <em>f</em>′(<em>u</em>) visas mellan linjerna: de anger hur mycket ' +
               'varje steg <em>förstorar</em> ett litet intervall.',
            3: 'Kedjeregeln säger att den sammanlagda förstoringen är en PRODUKT av de ' +
               'två faktorerna. Jämför ändringskvoten Δ<em>y</em>⁄Δ<em>x</em> från steg 2 ' +
               'med produkten <em>g</em>′(<em>x</em>)·<em>f</em>′(<em>u</em>) — de ska ' +
               'stämma nära överens.'
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

        // ── Legend: inre/yttre funktion, färgkodat ─────────────────────────
        function legendItem(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            legend.appendChild(span);
            return { el: span, txt: txt };
        }
        var legInner = legendItem(COL.inner, 'inre: ' + curFn().innerHtml);
        var legOuter = legendItem(COL.outer, 'yttre: ' + curFn().outerHtml);

        // ── Funktionsval (radioknappar) ─────────────────────────────────────
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
            radio.name = 'ma4-23-func';
            radio.checked = idx === state.fnIdx;
            radio.addEventListener('change', function () {
                if (!radio.checked) return;
                state.fnIdx = idx;
                state.x = curFn().xDefault;
                legInner.txt.innerHTML = 'inre: ' + curFn().innerHtml;
                legOuter.txt.innerHTML = 'yttre: ' + curFn().outerHtml;
                var fn = curFn();
                rowX.configure(fn.xMin, fn.xMax - fn.deltaX, fn.xStep);
                rowX.sync();
                update();
            });
            lbl.appendChild(radio);
            var span = document.createElement('span');
            span.innerHTML = fn.radioHtml;
            lbl.appendChild(span);
            funcRow.appendChild(lbl);
            funcRadios.push(radio);
        });
        controls.appendChild(funcRow);

        // ── Glidare: x ────────────────────────────────────────────────────
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
            var decimals = 2;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.outer + ' 0%, ' +
                    COL.outer + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
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
                },
                configure: function (newMin, newMax, newStep) {
                    min = newMin; max = newMax; step = newStep;
                    slider.min = min; slider.max = max; slider.step = step;
                    field.min = min; field.max = max; field.step = step;
                }
            };
        }
        var rowX = makeRow('x', curFn().xMin, curFn().xMax - curFn().deltaX, curFn().xStep,
            function () { return state.x; },
            function (v) { state.x = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.step = 1; state.fnIdx = 0; state.x = FUNCS[0].xDefault;
            funcRadios.forEach(function (r, i) { r.checked = i === 0; });
            legInner.txt.innerHTML = 'inre: ' + curFn().innerHtml;
            legOuter.txt.innerHTML = 'yttre: ' + curFn().outerHtml;
            var fn = curFn();
            rowX.configure(fn.xMin, fn.xMax - fn.deltaX, fn.xStep);
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbar punkt på x-linjen ────────────────────────────────────
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var fn = curFn();
            var xw = toWorldX(e.clientX);
            state.x = clampNum(Math.round(xw / fn.xStep) * fn.xStep, fn.xMin, fn.xMax - fn.deltaX);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita en tallinje: axel med pilspetsar, ticks, etikett till vänster ──
        function drawNumberLine(Y, min, max, step, labelParts) {
            var mapper = function (v) { return L + (v - min) / (max - min) * PW; };
            svg.appendChild(svgEl('line', { x1: L - 10, y1: Y, x2: L + PW + 10, y2: Y, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', {
                points: (L + PW + 14) + ',' + Y + ' ' + (L + PW + 4) + ',' + (Y - 4.5) + ' ' + (L + PW + 4) + ',' + (Y + 4.5),
                fill: COL.axis
            }));
            svg.appendChild(svgEl('polygon', {
                points: (L - 14) + ',' + Y + ' ' + (L - 4) + ',' + (Y - 4.5) + ' ' + (L - 4) + ',' + (Y + 4.5),
                fill: COL.axis
            }));
            var ticks = ticksFor(min, max, step);
            var decimals = decimalsForStep(step);
            ticks.forEach(function (t) {
                var xp = mapper(t);
                svg.appendChild(svgEl('line', { x1: xp, y1: Y - 4, x2: xp, y2: Y + 4, stroke: COL.axis, 'stroke-width': 1.2 }));
                svg.appendChild(svgVarText(
                    { x: xp, y: Y + 18, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [fmtDisp(t, decimals)]));
            });
            // Etiketten OVANFÖR linjens vänsterände — höger-ankrad vid
            // L − 24 klipps "u = g(x)"/"y = f(u)" utanför viewBox-vänsterkanten.
            svg.appendChild(svgVarText(
                { x: 4, y: Y - 14, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis },
                labelParts));
            return mapper;
        }

        // ── Δ-klammer mellan två punkter på en linje ────────────────────────
        function drawDeltaBracket(xA, xB, Y, color, letter) {
            var x0 = Math.min(xA, xB), x1 = Math.max(xA, xB);
            if (x1 - x0 < 3) { var mid0 = (x0 + x1) / 2; x0 = mid0 - 1.5; x1 = mid0 + 1.5; }
            var barY = Y - 22;
            svg.appendChild(svgEl('line', { x1: x0, y1: barY, x2: x1, y2: barY, stroke: color, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: x0, y1: barY, x2: x0, y2: Y - 6, stroke: color, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: x1, y1: barY, x2: x1, y2: Y - 6, stroke: color, 'stroke-width': 1.4 }));
            svg.appendChild(svgVarText(
                { x: (x0 + x1) / 2, y: barY - 6, 'font-size': 11.5, 'text-anchor': 'middle', fill: color },
                ['Δ', '*' + letter]));
        }

        // ── Förstoringsfaktor-märke mellan två linjer (i högermarginalen) ───
        function drawBadge(Y, color, letter, argLetter, value) {
            var valStr = value < 0 ? '(' + fmtDisp(value, 2) + ')' : fmtDisp(value, 2);
            svg.appendChild(svgVarText(
                { x: W - 8, y: Y + 4, 'font-size': 13.5, 'text-anchor': 'end', fill: color },
                ['×', '*' + letter, '′(', '*' + argLetter, ') = ×', valStr]));
        }

        // ── Numerisk tagg OVANFÖR en punkt (bara steg 1 — steg 2+ använder
        // samma zon till Δ-klammern). Mittenlinjen har trådar både uppåt
        // OCH nedåt från punkten, så en vit "chip" bakom siffrorna läggs in
        // (via getBBox, samma vita ton som kortets bakgrund — osynlig
        // förutom att den döljer tråden bakom texten) i stället för att
        // försöka räkna ut en kollisionsfri sida för hand. ─────────────────
        function drawPointTag(xp, Y, color, valStr) {
            var right = xp < L + PW - 44;
            var t = svgVarText(
                { x: xp + (right ? 8 : -8), y: Y - 11, 'font-size': 12.5, 'text-anchor': right ? 'start' : 'end', fill: color },
                [valStr]);
            svg.appendChild(t);
            try {
                var bb = t.getBBox();
                var pad = 2;
                var rect = svgEl('rect', {
                    x: bb.x - pad, y: bb.y - pad, width: bb.width + 2 * pad, height: bb.height + 2 * pad,
                    fill: '#ffffff'
                });
                svg.insertBefore(rect, t);
            } catch (e) { /* getBBox otillgänglig (t.ex. dolt element) — no-op */ }
        }

        // ── Rita hela scenen ─────────────────────────────────────────────
        var clipId = 'ma4-23-clip-' + Math.random().toString(36).slice(2);
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var fn = curFn(), dom = domainsFor(fn);
            var x = state.x, u = fn.g(x), y = fn.f(u);

            var Xx = function (v) { return L + (v - fn.xMin) / (fn.xMax - fn.xMin) * PW; };
            var Xu = function (v) { return L + (v - dom.uMin) / (dom.uMax - dom.uMin) * PW; };
            var Xy = function (v) { return L + (v - dom.yMin) / (dom.yMax - dom.yMin) * PW; };

            drawNumberLine(Y1, fn.xMin, fn.xMax, fn.xTick, ['*x']);
            drawNumberLine(Y2, dom.uMin, dom.uMax, fn.uTick, ['*u', ' = ', '*g', '(', '*x', ')']);
            drawNumberLine(Y3, dom.yMin, dom.yMax, fn.yTick, ['*y', ' = ', '*f', '(', '*u', ')']);

            // Trådar mellan linjerna (grön = inre avbildning, blå = yttre)
            svg.appendChild(svgEl('line', { x1: Xx(x), y1: Y1, x2: Xu(u), y2: Y2, stroke: COL.inner, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));
            svg.appendChild(svgEl('line', { x1: Xu(u), y1: Y2, x2: Xy(y), y2: Y3, stroke: COL.outer, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));

            // Δ-klammer och faktorer (steg 2+)
            if (state.step >= 2) {
                var dx = fn.deltaX;
                var x2 = x + dx, u2 = fn.g(x2), y2v = fn.f(u2);
                drawDeltaBracket(Xx(x), Xx(x2), Y1, COL.delta, 'x');
                drawDeltaBracket(Xu(u), Xu(u2), Y2, COL.inner, 'u');
                drawDeltaBracket(Xy(y), Xy(y2v), Y3, COL.outer, 'y');
                drawBadge(GAP1, COL.inner, 'g', 'x', fn.gPrime(x));
                drawBadge(GAP2, COL.outer, 'f', 'u', fn.fPrime(u));
            }

            // Punkter (annars ritas de över klammern ovan)
            svg.appendChild(svgEl('circle', { cx: Xx(x), cy: Y1, r: 4.5, fill: COL.axis }));
            svg.appendChild(svgEl('circle', { cx: Xu(u), cy: Y2, r: 4.5, fill: COL.inner }));
            svg.appendChild(svgEl('circle', { cx: Xy(y), cy: Y3, r: 4.5, fill: COL.outer }));

            if (state.step === 1) {
                drawPointTag(Xx(x), Y1, COL.axis, fmtDisp(x, 2));
                drawPointTag(Xu(u), Y2, COL.inner, fmtDisp(u, 2));
                drawPointTag(Xy(y), Y3, COL.outer, fmtDisp(y, 2));
            }

            // Dragbart handtag på x-punkten (osynlig, generös träffyta)
            var hit = svgEl('circle', { cx: Xx(x), cy: Y1, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var fn = curFn(), x = state.x, u = fn.g(x), y = fn.f(u);
            if (state.step === 1) {
                formelA.style.color = COL.inner;
                katexInto(formelA, 'u = g(x) = ' + fn.gSub(x) + ' = ' + fmtTex(u, 2));
                formelB.style.color = COL.outer;
                katexInto(formelB, 'y = f(u) = ' + fn.fSub(u) + ' = ' + fmtTex(y, 2));
                note.innerHTML = '';
            } else if (state.step === 2) {
                var dx = fn.deltaX, x2 = x + dx, u2 = fn.g(x2), y2v = fn.f(u2);
                var dY = y2v - y, ratio = dY / dx;
                var gP = fn.gPrime(x), fP = fn.fPrime(u), prod = gP * fP;
                var dYdec = autoDec(dY, 2, 5);
                formelA.style.color = COL.delta;
                katexInto(formelA, '\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{' + fmtTex(dY, dYdec) + '}{' + fmtTex(dx, 2) + '} \\approx ' + fmtTex(ratio, 2));
                formelB.style.color = COL.axis;
                katexInto(formelB, "g'(x)\\cdot f'(u) = " + fmtTex(gP, 2) + '\\cdot ' + fmtTex(fP, 2) + ' \\approx ' + fmtTex(prod, 2));
                note.innerHTML = 'De två raderna ligger nära varandra — ändringskvoten Δ<em>y</em>⁄Δ<em>x</em> ' +
                    'är en approximation av produkten <em>g</em>′(<em>x</em>)·<em>f</em>′(<em>u</em>), och blir ' +
                    'ännu närmare om Δ<em>x</em> görs mindre.';
            } else {
                var gP3 = fn.gPrime(x), fP3 = fn.fPrime(u), prod3 = gP3 * fP3;
                var dx3 = fn.deltaX, u3b = fn.g(x + dx3), y3b = fn.f(u3b), ratio3 = (y3b - y) / dx3;
                formelA.style.color = COL.axis;
                katexInto(formelA,
                    "y' = f'(g(x))\\cdot g'(x) = f'(" + fmtTex(u, 2) + ')\\cdot ' + "g'(" + fmtTex(x, 2) + ') = ' +
                    fmtTex(fP3, 2) + '\\cdot ' + fmtTex(gP3, 2) + ' = ' + fmtTex(prod3, 2));
                formelB.style.color = COL.delta;
                katexInto(formelB,
                    '\\dfrac{\\Delta y}{\\Delta x} \\approx ' + fmtTex(ratio3, 2) + " \\approx y'(" + fmtTex(x, 2) + ') = ' + fmtTex(prod3, 2));
                note.innerHTML = 'OBS: att bara derivera den yttre funktionen ger <em>f</em>′(<em>g</em>(<em>x</em>)) = ' +
                    fmt(fP3, 2) + ' — fel svar! Den inre derivatan <em>g</em>′(<em>x</em>) = ' + fmt(gP3, 2) +
                    ' måste multipliceras in (rätt svar: <em>y</em>′ = ' + fmt(prod3, 2) + ').';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            note.style.display = state.step >= 2 ? '' : 'none';
            draw();
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
    window.VISUALISERINGAR['ma4-2.3'] = api;
    window.VISUALISERINGAR['ma4-2.4'] = api;
})();
