/* ma2c-2.1.js — visualisering: "Kvadrerings- och konjugatregeln som areor".
 *
 * Kärninsikt: (a+b)² = a² + 2ab + b² är en bokstavlig areauppdelning av en
 * kvadrat — den "missade" termen 2ab är två synliga rektanglar, inte ett
 * abstrakt symbolfel. Konjugatregeln (a+b)(a−b) = a² − b² är en kvadrat med
 * ett hörn bortklippt som pusslas om till en rektangel med SAMMA area.
 *
 * Beteckningar och formler speglar teorigenomgången ma2c-2.1.md exakt
 * (a, b; (a+b)² = a²+2ab+b²; (a-b)² = a²-2ab+b²; (a+b)(a-b) = a²-b²).
 *
 * Fyra steg:
 *   1. Kvadraten (a+b)²        — fyrfältad kvadrat, dra i glidare ELLER i
 *                                 den svarta korspunkten.
 *   2. Formeln term för term   — live-formel med aktuella tal + "vanligt
 *                                 fel"-ruta: (a+b)² ≠ a²+b².
 *   3. Andra kvadreringsregeln — kvadrat sida a, två b-remsor skuggas bort
 *                                 (överlappar i hörnet) → +b² läggs tillbaka.
 *   4. Konjugatregeln          — b×b-hörn klipps bort ur a²; "Flytta biten"
 *                                 roterar+flyttar (a-b)×b-biten till en
 *                                 (a+b)×(a-b)-rektangel. Sifferexempel-knapp
 *                                 "Räkna 19 · 21" (a=20,b=1 → 399).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3
 * och ma2c-4.11). API: window.VISUALISERINGAR['ma2c-2.1'] = { mount }.
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
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        aSq: '#2563c9',            // a² — blå
        aSqFill: 'rgba(37,99,201,0.28)',
        bSq: '#3f8f5c',            // b² — grön
        bSqFill: 'rgba(63,143,92,0.28)',
        ab: '#c1622c',             // ab-fälten — orange/röd
        abFill: 'rgba(193,98,44,0.28)'
    };

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var A_MIN = 2, A_MAX = 20, A_STEP = 1;
        var B_MIN = 0.5, B_MAX = 3, B_STEP = 0.5;
        var state = { a: 4, b: 2, step: 1, moveT: 0, example: false };
        var animId = null;
        function bMaxDyn(a) { return clampNum(a - 0.5, B_MIN, B_MAX); }

        // ── Geometri (pixel-rum) ───────────────────────────────────────
        var W = 560, H = 420, DRAWW = 290;
        var originX = (W - DRAWW) / 2, originY = 80;

        // ── DOM-skelett ─────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Kvadrerings- och konjugatregeln som areor';
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
            'aria-label': 'Interaktiv figur: kvadrerings- och konjugatregeln visade ' +
                'som areor. Dra i glidarna för a och b, eller i den markerade ' +
                'punkten i figuren, för att ändra sidornas längd.'
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

        // ── Steg-knappar ────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Kvadraten (a+b)²' },
            { n: 2, label: '2 · Formeln term för term' },
            { n: 3, label: '3 · Andra kvadreringsregeln' },
            { n: 4, label: '4 · Konjugatregeln' }
        ];
        var INSTR = {
            1: 'En kvadrat med sidan <em>a</em> + <em>b</em> delas upp i fyra fält. ' +
               'Dra i glidarna — eller i den svarta punkten mitt i kvadraten — och ' +
               'se hur fälten ändras.',
            2: 'Varje fält är en term i formeln. Lägg ihop dem: <em>a</em>² + <em>ab</em> ' +
               '+ <em>ab</em> + <em>b</em>² = <em>a</em>² + 2<em>ab</em> + <em>b</em>². ' +
               'Observera att <em>a</em>² + <em>b</em>² ensamt inte räcker.',
            3: 'Samma idé baklänges: i en kvadrat med sidan <em>a</em> skuggas en ' +
               'remsa med bredden <em>b</em> bort längs två kanter. Hörnet skuggas ' +
               'då bort två gånger — därför läggs <em>b</em>² tillbaka.',
            4: 'Klipp bort ett <em>b</em>×<em>b</em>-hörn ur kvadraten <em>a</em>². ' +
               'Tryck på "Flytta biten" för att pussla ihop resten till en rektangel ' +
               'med sidorna (<em>a</em>+<em>b</em>) och (<em>a</em>−<em>b</em>) — ' +
               'samma area som innan!'
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

        // ── Legend (byggs om per steg) ──────────────────────────────────
        function legendItem(color, html, dashed) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            if (dashed) sw.style.borderTopStyle = 'dashed';
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return span;
        }
        function buildLegend() {
            legend.innerHTML = '';
            if (state.step === 1 || state.step === 2) {
                legend.appendChild(legendItem(COL.aSq, '<em>a</em>²'));
                legend.appendChild(legendItem(COL.ab, '<em>ab</em> (två fält)'));
                legend.appendChild(legendItem(COL.bSq, '<em>b</em>²'));
            } else if (state.step === 3) {
                legend.appendChild(legendItem(COL.aSq, '(<em>a</em>−<em>b</em>)² — resultatet'));
                legend.appendChild(legendItem(COL.ab, '<em>ab</em> — skuggade remsor'));
                legend.appendChild(legendItem(COL.bSq, '<em>b</em>² — hörnet läggs tillbaka', true));
            } else if (state.step === 4) {
                legend.appendChild(legendItem(COL.aSq, '<em>a</em>(<em>a</em>−<em>b</em>) — flyttas inte'));
                legend.appendChild(legendItem(COL.ab, '<em>b</em>(<em>a</em>−<em>b</em>) — flyttas'));
                legend.appendChild(legendItem(COL.ink, '<em>b</em>² — klipps bort', true));
            }
        }

        // ── Knappar i actions-raden (steg 4) ──────────────────────────────
        var moveBtn = document.createElement('button');
        moveBtn.type = 'button';
        moveBtn.className = 'lab-btn';
        moveBtn.textContent = 'Flytta biten';
        moveBtn.addEventListener('click', function () { startMove(); });
        actions.appendChild(moveBtn);

        var exampleBtn = document.createElement('button');
        exampleBtn.type = 'button';
        exampleBtn.className = 'lab-btn';
        exampleBtn.textContent = 'Räkna 19 · 21';
        exampleBtn.addEventListener('click', function () {
            stopAnim();
            state.a = 20; state.b = 1; state.moveT = 0; state.example = true;
            syncAll();
        });
        actions.appendChild(exampleBtn);

        // ── Glidare (a och b) ─────────────────────────────────────────────
        function makeRow(name, min, maxSrc, step, get, set) {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = name;
            lbl.appendChild(em);
            function curMax() { return typeof maxSrc === 'function' ? maxSrc() : maxSrc; }
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = min; slider.max = curMax(); slider.step = step; slider.value = get();
            slider.setAttribute('aria-label', 'Värdet på ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = curMax(); field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            var decimals = step < 0.05 ? 2 : step < 1 ? 1 : 0;
            function paint() {
                var mx = curMax();
                var pct = clampNum((get() - min) / (mx - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.ink + ' 0%, ' +
                    COL.ink + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                var mx = curMax();
                set(clampNum(v, min, mx));
                state.moveT = 0; state.example = false;
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), decimals).replace(',', '.');
                paint();
                syncAll();
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
                refreshMax: function () {
                    var mx = curMax();
                    slider.max = mx; field.max = mx;
                    if (get() > mx) set(mx);
                    paint();
                }
            };
        }
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = v; });
        var rowB = makeRow('b', B_MIN, function () { return bMaxDyn(state.a); }, B_STEP,
            function () { return state.b; },
            function (v) { state.b = v; });

        function syncAll() {
            rowA.sync();
            rowB.refreshMax();
            rowB.sync();
            update();
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.a = 4; state.b = 2; state.step = 1; state.moveT = 0; state.example = false;
            syncAll();
        });
        foot.appendChild(reset);

        // ── Animation: "Flytta biten" (steg 4) ─────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
        function startMove() {
            stopAnim();
            var from = state.moveT, to = state.moveT >= 0.5 ? 0 : 1;
            var t0 = null, DUR = 1000;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DUR, 0, 1);
                state.moveT = from + (to - from) * easeInOutCubic(p);
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.moveT = to; update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar korspunkt (styr a i steg 1/2, b i steg 3) ──────────────
        var dragMode = null;   // null | 'a' | 'b'
        var dragScale = 1;
        function toSvgX(clientX) {
            var r = svg.getBoundingClientRect();
            return (clientX - r.left) * W / r.width;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragMode) return;
            var px = toSvgX(e.clientX);
            var worldU = (px - originX) / dragScale;
            if (dragMode === 'a') {
                state.a = clampNum(Math.round(worldU / A_STEP) * A_STEP, A_MIN, A_MAX);
            } else if (dragMode === 'b') {
                state.b = clampNum(Math.round((state.a - worldU) / B_STEP) * B_STEP, B_MIN, bMaxDyn(state.a));
            }
            state.moveT = 0; state.example = false;
            syncAll();
        });
        function endDrag() { dragMode = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function makeDragHandle(cx, cy, scaleAtDraw, mode) {
            svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 5.5, fill: COL.ink }));
            var hit = svgEl('circle', { cx: cx, cy: cy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim();
                dragMode = mode;
                dragScale = scaleAtDraw;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Ritahjälpare: fält, etiketter, måttlinjer ─────────────────────
        function fieldRect(g, x, y, w, h, fill) {
            g.appendChild(svgEl('rect', {
                x: x, y: y, width: w, height: h, fill: fill,
                stroke: COL.ink, 'stroke-width': 1, 'stroke-opacity': 0.35
            }));
        }
        function fieldLabel(g, cx, cy, wpx, hpx, parts, color, fontSize) {
            if (wpx < 24 || hpx < 24) return;
            g.appendChild(svgVarText(
                { x: cx, y: cy + 5, 'font-size': fontSize || 15, 'text-anchor': 'middle', fill: color || COL.ink },
                parts));
        }
        function dimSegH(parent, x1, x2, y, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', {
                points: x1 + ',' + y + ' ' + (x1 + asz) + ',' + (y - asz * 0.6) + ' ' + (x1 + asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            parent.appendChild(svgEl('polygon', {
                points: x2 + ',' + y + ' ' + (x2 - asz) + ',' + (y - asz * 0.6) + ' ' + (x2 - asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            parent.appendChild(svgVarText(
                { x: (x1 + x2) / 2, y: y - 7, 'font-size': 14, 'text-anchor': 'middle', fill: COL.ink }, parts));
        }
        function dimSegV(parent, y1, y2, x, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x, y1: y1, x2: x, y2: y2, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', {
                points: x + ',' + y1 + ' ' + (x - asz * 0.6) + ',' + (y1 + asz) + ' ' + (x + asz * 0.6) + ',' + (y1 + asz),
                fill: COL.ink
            }));
            parent.appendChild(svgEl('polygon', {
                points: x + ',' + y2 + ' ' + (x - asz * 0.6) + ',' + (y2 - asz) + ' ' + (x + asz * 0.6) + ',' + (y2 - asz),
                fill: COL.ink
            }));
            parent.appendChild(svgVarText(
                { x: x - 9, y: (y1 + y2) / 2 + 4, 'font-size': 14, 'text-anchor': 'end', fill: COL.ink }, parts));
        }

        // ── Steg 1/2: kvadraten (a+b)² ──────────────────────────────────
        function drawSumSquare() {
            var a = state.a, b = state.b, S = a + b;
            var scale = DRAWW / S;
            var X0 = originX, Y0 = originY;
            function X(u) { return X0 + u * scale; }
            function Y(v) { return Y0 + v * scale; }
            var g = svgEl('g');
            svg.appendChild(g);

            fieldRect(g, X(0), Y(0), X(a) - X(0), Y(a) - Y(0), COL.aSqFill);
            fieldRect(g, X(a), Y(0), X(a + b) - X(a), Y(a) - Y(0), COL.abFill);
            fieldRect(g, X(0), Y(a), X(a) - X(0), Y(a + b) - Y(a), COL.abFill);
            fieldRect(g, X(a), Y(a), X(a + b) - X(a), Y(a + b) - Y(a), COL.bSqFill);
            g.appendChild(svgEl('rect', {
                x: X(0), y: Y(0), width: X(a + b) - X(0), height: Y(a + b) - Y(0),
                fill: 'none', stroke: COL.ink, 'stroke-width': 2
            }));

            fieldLabel(g, (X(0) + X(a)) / 2, (Y(0) + Y(a)) / 2, X(a) - X(0), Y(a) - Y(0), ['*a', '²']);
            fieldLabel(g, (X(a) + X(a + b)) / 2, (Y(0) + Y(a)) / 2, X(a + b) - X(a), Y(a) - Y(0), ['*a', '*b']);
            fieldLabel(g, (X(0) + X(a)) / 2, (Y(a) + Y(a + b)) / 2, X(a) - X(0), Y(a + b) - Y(a), ['*a', '*b']);
            fieldLabel(g, (X(a) + X(a + b)) / 2, (Y(a) + Y(a + b)) / 2, X(a + b) - X(a), Y(a + b) - Y(a), ['*b', '²']);

            dimSegH(svg, X(0), X(a), Y(0) - 22, ['*a']);
            dimSegH(svg, X(a), X(a + b), Y(0) - 22, ['*b']);
            dimSegV(svg, Y(0), Y(a), X(0) - 22, ['*a']);
            dimSegV(svg, Y(a), Y(a + b), X(0) - 22, ['*b']);

            makeDragHandle(X(a), Y(a), scale, 'a');
        }

        // ── Steg 3: andra kvadreringsregeln (a-b)² ─────────────────────
        function drawDiffSquare() {
            var a = state.a, b = clampNum(state.b, B_MIN, bMaxDyn(a));
            var scale = DRAWW / a;
            var X0 = originX, Y0 = originY;
            function X(u) { return X0 + u * scale; }
            function Y(v) { return Y0 + v * scale; }
            var g = svgEl('g');
            svg.appendChild(g);
            var ab = a - b;

            fieldRect(g, X(0), Y(0), X(ab) - X(0), Y(ab) - Y(0), COL.aSqFill);
            fieldRect(g, X(ab), Y(0), X(a) - X(ab), Y(a) - Y(0), COL.abFill);   // höger remsa (bredd b, höjd a)
            fieldRect(g, X(0), Y(ab), X(a) - X(0), Y(a) - Y(ab), COL.abFill);   // nedre remsa (bredd a, höjd b)
            g.appendChild(svgEl('rect', {
                x: X(ab), y: Y(ab), width: X(a) - X(ab), height: Y(a) - Y(ab),
                fill: 'none', stroke: COL.bSq, 'stroke-width': 2, 'stroke-dasharray': '5 4'
            }));
            g.appendChild(svgEl('rect', {
                x: X(0), y: Y(0), width: X(a) - X(0), height: Y(a) - Y(0),
                fill: 'none', stroke: COL.ink, 'stroke-width': 2
            }));

            fieldLabel(g, (X(0) + X(ab)) / 2, (Y(0) + Y(ab)) / 2, X(ab) - X(0), Y(ab) - Y(0),
                ['(', '*a', '−', '*b', ')²'], COL.ink, 14);
            // Remsornas etiketter placeras i den EGNA, icke-överlappande delen
            // (ovanför/vänster om det dubbelskuggade hörnet) — annars hamnar de
            // inuti hörnet och krockar med "+b²"-etiketten. Avgörs i PIXLAR
            // (inte världsenheter), eftersom skalan varierar kraftigt med a.
            var rightFreeH = Y(ab) - Y(0), rightW = X(a) - X(ab);
            fieldLabel(g, (X(ab) + X(a)) / 2, (Y(0) + Y(ab)) / 2, rightW, rightFreeH, ['*a', '*b']);
            var bottomFreeW = X(ab) - X(0), bottomH = Y(a) - Y(ab);
            fieldLabel(g, (X(0) + X(ab)) / 2, (Y(ab) + Y(a)) / 2, bottomFreeW, bottomH, ['*a', '*b']);
            fieldLabel(g, (X(ab) + X(a)) / 2, (Y(ab) + Y(a)) / 2, X(a) - X(ab), Y(a) - Y(ab), ['+', '*b', '²']);

            dimSegH(svg, X(0), X(a), Y(0) - 22, ['*a']);
            dimSegV(svg, Y(0), Y(a), X(0) - 22, ['*a']);

            makeDragHandle(X(ab), Y(ab), scale, 'b');
        }

        // ── Steg 4: konjugatregeln ────────────────────────────────────
        function drawConjugate() {
            var a = state.a, b = clampNum(state.b, B_MIN, bMaxDyn(a));
            var ab = a - b, S = a + b;
            var scale = DRAWW / S;
            var X0 = originX, Y0 = originY;
            function X(u) { return X0 + u * scale; }
            function Y(v) { return Y0 + v * scale; }
            var g = svgEl('g');
            svg.appendChild(g);
            var t = state.moveT;

            // Övre biten (flyttas inte): x:[0,a], y:[0,a-b]
            var tpX = X(0), tpY = Y(0), tpW = X(a) - X(0), tpH = Y(ab) - Y(0);
            fieldRect(g, tpX, tpY, tpW, tpH, COL.aSqFill);
            g.appendChild(svgEl('rect', { x: tpX, y: tpY, width: tpW, height: tpH, fill: 'none', stroke: COL.ink, 'stroke-width': 2 }));
            fieldLabel(g, tpX + tpW / 2, tpY + tpH / 2, tpW, tpH, ['*a', '(', '*a', '−', '*b', ')'], COL.ink, 14);

            // Bortklippt hörn (visas alltid, streckat): x:[a-b,a], y:[a-b,a]
            var ccX = X(ab), ccY = Y(ab), ccW = X(a) - X(ab), ccH = Y(a) - Y(ab);
            g.appendChild(svgEl('rect', {
                x: ccX, y: ccY, width: ccW, height: ccH,
                fill: 'rgba(31,37,48,0.06)', stroke: COL.ink, 'stroke-width': 1.6, 'stroke-dasharray': '5 4'
            }));
            if (t < 0.3) fieldLabel(g, ccX + ccW / 2, ccY + ccH / 2, ccW, ccH, ['−', '*b', '²'], COL.inkSoft, 13);

            // Flyttbar bit: start x:[0,a-b], y:[a-b,a] (bredd a-b, höjd b)
            var pw = ab * scale, ph = b * scale;
            var startCx = tpX + pw / 2, startCy = Y(ab) + ph / 2;
            var endCx = X(a) + ph / 2, endCy = Y(0) + pw / 2;   // roterad 90°: bredd b, höjd a-b
            var cx = startCx + (endCx - startCx) * t;
            var cy = startCy + (endCy - startCy) * t;
            var theta = 90 * t;

            if (t > 0.02 && t < 0.999) {
                g.appendChild(svgEl('rect', {
                    x: tpX, y: Y(ab), width: pw, height: ph,
                    fill: 'none', stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
                }));
            }

            var mg = svgEl('g', { transform: 'translate(' + cx.toFixed(2) + ',' + cy.toFixed(2) + ') rotate(' + theta.toFixed(2) + ')' });
            mg.appendChild(svgEl('rect', {
                x: (-pw / 2).toFixed(2), y: (-ph / 2).toFixed(2), width: pw, height: ph,
                fill: COL.abFill, stroke: COL.ink, 'stroke-width': 1
            }));
            if (pw >= 24 && ph >= 24) {
                var tg = svgEl('g', { transform: 'rotate(' + (-theta).toFixed(2) + ')' });
                tg.appendChild(svgVarText(
                    { x: 0, y: 5, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink },
                    ['*b', '(', '*a', '−', '*b', ')']));
                mg.appendChild(tg);
            }
            g.appendChild(mg);

            if (t >= 0.999) {
                g.appendChild(svgEl('rect', {
                    x: X(0), y: Y(0), width: X(a + b) - X(0), height: Y(ab) - Y(0),
                    fill: 'none', stroke: COL.ink, 'stroke-width': 2.4
                }));
            }

            if (t < 0.5) {
                dimSegH(svg, X(0), X(a), Y(0) - 22, ['*a']);
                dimSegV(svg, Y(0), Y(a), X(0) - 22, ['*a']);
            } else {
                dimSegH(svg, X(0), X(a + b), Y(0) - 22, ['(', '*a', '+', '*b', ')']);
                dimSegV(svg, Y(0), Y(ab), X(0) - 22, ['(', '*a', '−', '*b', ')']);
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, b = state.b;
            var aT = fmtTex(a), bT = fmtTex(b);
            if (state.step === 1) {
                formelA.style.display = 'none';
                formelB.style.display = 'none';
                note.style.display = 'none';
            } else if (state.step === 2) {
                formelA.style.display = '';
                formelB.style.display = '';
                note.style.display = '';
                katexInto(formelA,
                    '(a+b)^2 = \\textcolor{' + COL.aSq + '}{a^2} + \\textcolor{' + COL.ab + '}{2ab} + \\textcolor{' + COL.bSq + '}{b^2}');
                var a2 = a * a, twoab = 2 * a * b, b2 = b * b, sum = a2 + twoab + b2, ab1 = a * b;
                katexInto(formelB,
                    '(' + aT + '+' + bT + ')^2 = \\textcolor{' + COL.aSq + '}{' + fmtTex(a2) + '} + ' +
                    '\\textcolor{' + COL.ab + '}{2\\cdot ' + fmtTex(ab1) + '} + ' +
                    '\\textcolor{' + COL.bSq + '}{' + fmtTex(b2) + '} = ' + fmtTex(sum));
                var a2plusb2 = a2 + b2;
                note.innerHTML = 'Vanligt fel: <span style="white-space:nowrap">(<em>a</em>+<em>b</em>)² ≠ ' +
                    '<em>a</em>²+<em>b</em>²</span>. Med dessa tal: <span style="white-space:nowrap">(' +
                    fmt(a, 0) + '+' + fmt(b, 1) + ')² = ' + fmt(sum) + '</span> men <span style="white-space:nowrap">' +
                    '<em>a</em>²+<em>b</em>² = ' + fmt(a2plusb2) + '</span> — mellanskillnaden <span style="white-space:nowrap">' +
                    '2<em>ab</em> = ' + fmt(twoab) + '</span> glöms ofta bort.';
            } else if (state.step === 3) {
                formelA.style.display = '';
                formelB.style.display = '';
                note.style.display = '';
                var bEff = clampNum(b, B_MIN, bMaxDyn(a));
                var bT2 = fmtTex(bEff);
                katexInto(formelA,
                    '(a-b)^2 = \\textcolor{' + COL.ink + '}{a^2} - \\textcolor{' + COL.ab + '}{2ab} + \\textcolor{' + COL.bSq + '}{b^2}');
                var ab2 = (a - bEff) * (a - bEff), a2_ = a * a, twoab_ = 2 * a * bEff, b2_ = bEff * bEff;
                katexInto(formelB,
                    '(' + aT + '-' + bT2 + ')^2 = ' + fmtTex(a2_) + ' - 2\\cdot ' + fmtTex(a * bEff) + ' + ' +
                    fmtTex(b2_) + ' = ' + fmtTex(ab2));
                note.innerHTML = 'Hörnet <span style="white-space:nowrap"><em>b</em>² = ' + fmt(b2_) +
                    '</span> skuggas två gånger när de två <span style="white-space:nowrap">2<em>ab</em> = ' +
                    fmt(twoab_) + '</span>-remsorna tas bort — därför läggs det tillbaka en gång.';
            } else if (state.step === 4) {
                formelA.style.display = '';
                formelB.style.display = '';
                note.style.display = '';
                var bEff4 = clampNum(b, B_MIN, bMaxDyn(a));
                var bT4 = fmtTex(bEff4);
                katexInto(formelA, 'a^2 - b^2 = (a+b)(a-b)');
                var lhs = a * a - bEff4 * bEff4, rhs = (a + bEff4) * (a - bEff4);
                katexInto(formelB,
                    aT + '^2 - ' + bT4 + '^2 = (' + fmtTex(a + bEff4) + ')(' + fmtTex(a - bEff4) + ') = ' + fmtTex(rhs));
                if (state.example) {
                    note.innerHTML = 'Räkneknep: <span style="white-space:nowrap">19 · 21 = (20−1)(20+1)</span> = ' +
                        '<span style="white-space:nowrap">20<sup>2</sup> − 1<sup>2</sup> = 400 − 1 = 399</span>.';
                } else if (state.moveT >= 0.999) {
                    note.innerHTML = 'Arean är oförändrad efter flytten: <span style="white-space:nowrap">' +
                        '<em>a</em><sup>2</sup> − <em>b</em><sup>2</sup> = ' + fmt(lhs) + '</span> = <span style="white-space:nowrap">' +
                        '(<em>a</em>+<em>b</em>)(<em>a</em>−<em>b</em>) = ' + fmt(rhs) + '</span>.';
                } else {
                    note.innerHTML = 'Tryck på "Flytta biten" för att pussla ihop resten till en rektangel.';
                }
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (btn, i) { btn.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            buildLegend();
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            if (state.step === 1 || state.step === 2) drawSumSquare();
            else if (state.step === 3) drawDiffSquare();
            else if (state.step === 4) drawConjugate();
            updateFormulas();
            actions.style.display = state.step === 4 ? '' : 'none';
            moveBtn.textContent = state.moveT >= 0.999 ? 'Flytta tillbaka' : 'Flytta biten';
        }

        syncAll();

        return {
            destroy: function () {
                stopAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma2c-2.1'] = { mount: mount };
})();
