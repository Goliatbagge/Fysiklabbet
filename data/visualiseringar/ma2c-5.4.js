/* ma2c-5.4.js — visualisering: "Räknestickan" (logaritmlagarna i trä).
 * Hör till ma2c-5.4 (logaritmlagarna) och ma2c-5.5 (tillämpningar).
 *
 * Kärninsikt: lg(a·b) = lg a + lg b betyder att multiplikation blir
 * STRÄCKOR SOM LÄGGS I RAD på en logaritmisk skala — det är exakt så en
 * räknesticka fungerar. Två "linjaler" (rundade pappersrektanglar), båda
 * log-graderade 1→10. Den övre är dragbar i sidled; en röd hårlinje-
 * markör läses av mot den undre.
 *
 * Fyra steg:
 *   1. Multiplicera med stickan — dra övre linjalens 1 till a, dra
 *      markören till b, läs av a·b på undre linjalen. Färgade segment
 *      (grönt lg a, blått lg b) läggs i rad under linjalerna.
 *   2. Därför fungerar det — samma scen, KaTeX-raden
 *      lg(a·b) = lg a + lg b med aktuella tal.
 *   3. Division åt andra hållet — dra en grön flagga (täljare a) och en
 *      blå flagga (nämnare b) på undre linjalen. Övre linjalen glider
 *      automatiskt så dess 1:a (rödmarkerad) hamnar vid svaret a/b.
 *      Segmentbilden visar subtraktion: blått "äts" bort från grönt.
 *   4. Potenslagen — dra en grön flagga till a, välj exponent n (2–4).
 *      Segmentet lg a kopieras n gånger i rad och landar på a^n.
 *
 * Alla tre lägen delar SAMMA fysiska modell: en log-skala där fysiskt
 * avstånd ∝ lg(värde), så addition/subtraktion av sträckor = addition/
 * subtraktion av logaritmer.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / graf.js).
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
    // Fast antal decimaler (INGEN trimning av efternollor) — för lg-
    // approximationer där t.ex. "0,30" måste behålla nollan så additionen
    // 0,30 + 0,48 = 0,78 blir konsekvent på decimalantal.
    function fmtFix(v, decimals) {
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    function fmtFixTex(v, decimals) { return fmtFix(v, decimals).replace(',', '{,}'); }
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
        axis: '#1f2530',
        tick: '#5b6472',
        rulerA: '#faf6ec',
        rulerB: '#eee3cf',
        rulerStroke: 'rgba(31,37,48,0.38)',
        segA: '#4a7d3a',       // grönt — första talet (a)
        segB: '#2563c9',       // blått — andra talet (b)
        segTotal: '#c8324a',   // rött — resultatet
        dash: 'rgba(31,37,48,0.45)',
        cursor: '#c8324a'
    };

    // ── Snap-grid: "fina" avläsningsbara värden på 1–10-skalan ─────────────
    var SNAP = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10];
    var POW_SNAP = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.5, 2.8, 3, 3.16];
    function snapTo(v, arr) {
        arr = arr || SNAP;
        var best = arr[0], bd = Math.abs(v - arr[0]);
        for (var i = 1; i < arr.length; i++) {
            var d = Math.abs(v - arr[i]);
            if (d < bd) { bd = d; best = arr[i]; }
        }
        return best;
    }
    // Justera 'moving' så fixed*moving <= 10 (störst tillåtna snap-värde).
    function fitProduct(fixed, moving) {
        var max = 10 / fixed;
        if (moving <= max + 1e-9) return snapTo(moving);
        var cand = SNAP.filter(function (x) { return x <= max + 1e-9; });
        return cand.length ? cand[cand.length - 1] : 1;
    }
    // Justera divB så 1 <= divB <= divA.
    function fitDivB(divA, divB) {
        var snapped = snapTo(clampNum(divB, 1, divA));
        if (snapped > divA + 1e-9) {
            var cand = SNAP.filter(function (x) { return x <= divA + 1e-9; });
            snapped = cand.length ? cand[cand.length - 1] : 1;
        }
        return snapped;
    }
    function powMax(n) { return Math.pow(10, 1 / n); }
    function clampPowA(v, n) {
        var max = powMax(n);
        var cand = POW_SNAP.filter(function (x) { return x <= max + 1e-9; });
        if (!cand.length) cand = [1];
        return snapTo(clampNum(v, 1, max), cand);
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            a: 2, b: 3,            // steg 1–2: multiplikation
            divA: 6, divB: 3,      // steg 3: division
            powA: 2, n: 3,         // steg 4: potenslagen
            revealed: false        // steg 2: "gissa först"-knapp
        };

        // ── Geometri ─────────────────────────────────────────────────────
        var W = 560, H = 310;
        var X0 = 46, RW = 490;
        function xLower(v) { return X0 + Math.log10(v) * RW; }
        function pxToWorldValue(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return Math.pow(10, (px - X0) / RW);
        }
        var rulerH = 34;
        var upperRulerY = 44, upperLabelY = 34;
        var lowerRulerY = 150, lowerLabelY = 216;
        var cursorY1 = 44, cursorY2 = 194;
        var markAboveTip = lowerRulerY, markAboveBase = lowerRulerY - 14;
        var markBelowTip = lowerRulerY + rulerH, markBelowBase = lowerRulerY + rulerH + 14;
        var row1Y = 234, rowH = 16, row2Y = 270;

        var TICKS = [1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var MINOR = [2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5];

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Räknestickan';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var nRow = document.createElement('div');
        nRow.className = 'lab-vis-steps';
        nRow.style.marginTop = '-4px';
        card.appendChild(nRow);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            overflow: 'hidden',
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv räknesticka: två log-graderade linjaler. Dra i den ' +
                'övre linjalen eller markören för att multiplicera, eller dra flaggorna ' +
                'för att dividera eller upphöja till en potens.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelReadout = document.createElement('div');
        formelReadout.className = 'lab-vis-formel';
        formelReadout.style.fontSize = '21px';
        formelReadout.style.color = COL.axis;
        card.appendChild(formelReadout);

        var formelSegA = document.createElement('div');
        formelSegA.className = 'lab-vis-formel';
        formelSegA.style.fontSize = '14px';
        formelSegA.style.color = COL.segA;
        card.appendChild(formelSegA);

        var formelSegB = document.createElement('div');
        formelSegB.className = 'lab-vis-formel';
        formelSegB.style.fontSize = '14px';
        formelSegB.style.color = COL.segB;
        card.appendChild(formelSegB);

        var formelCombined = document.createElement('div');
        formelCombined.className = 'lab-vis-formel';
        formelCombined.style.color = COL.segTotal;
        card.appendChild(formelCombined);

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
            { n: 1, label: '1 · Multiplicera med stickan' },
            { n: 2, label: '2 · Därför fungerar det' },
            { n: 3, label: '3 · Division åt andra hållet' },
            { n: 4, label: '4 · Potenslagen' }
        ];
        var INSTR = {
            1: 'Dra i den <em>övre</em> linjalen tills dess 1:a hamnar över talet <em>a</em> ' +
               'på den undre — dra sedan den röda markören till talet <em>b</em> på den övre ' +
               'linjalen. Var pekar markören på den undre linjalen?',
            2: 'Fundera först: varför sitter markeringarna tätare ju närmare 10 de kommer? ' +
               'Tryck sedan på knappen nedan för att se varför stickan fungerar — ' +
               '<em>sträckor läggs i rad</em>.',
            3: 'Ställ täljaren <em>a</em> på den undre linjalen (dra den gröna flaggan) och ' +
               'nämnaren <em>b</em> (dra den blå flaggan). Den övre linjalen glider automatiskt ' +
               'så att dess rödmarkerade 1:a hamnar precis vid svaret <em>a</em>/<em>b</em>.',
            4: 'Dra den gröna flaggan till talet <em>a</em> och välj exponenten <em>n</em>. ' +
               'Segmentet lg <em>a</em> kopieras <em>n</em> gånger i rad och landar vid ' +
               '<em>a</em><sup><em>n</em></sup> (röd flagga).'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { state.step = s.n; state.revealed = false; update(); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // n-väljare (steg 4)
        var nBtns = [];
        [2, 3, 4].forEach(function (nv) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.innerHTML = '<em>n</em> = ' + nv;
            b.addEventListener('click', function () {
                state.n = nv;
                state.powA = clampPowA(state.powA, state.n);
                rowPowA.sync();
                update();
            });
            nRow.appendChild(b);
            nBtns.push({ n: nv, el: b });
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
        var legA = legendItem(COL.segA, 'grönt = <em>lg</em> av första talet');
        var legB = legendItem(COL.segB, 'blått = <em>lg</em> av andra talet');
        var legR = legendItem(COL.segTotal, 'rött = <em>lg</em> av resultatet');
        legend.appendChild(legA);
        legend.appendChild(legB);
        legend.appendChild(legR);

        // ── Reveal-knapp (steg 2) ───────────────────────────────────────────
        var revealBtn = document.createElement('button');
        revealBtn.type = 'button';
        revealBtn.className = 'lab-btn';
        revealBtn.textContent = 'Visa varför';
        revealBtn.addEventListener('click', function () {
            state.revealed = !state.revealed;
            update();
        });
        actions.appendChild(revealBtn);

        // ── Glidare ───────────────────────────────────────────────────────
        var rowA, rowB, rowDivA, rowDivB, rowPowA;
        function setA(v) {
            state.a = snapTo(clampNum(v, 1, 10));
            if (state.a * state.b > 10 + 1e-9) state.b = fitProduct(state.a, state.b);
            if (rowB) rowB.sync();
        }
        function setB(v) {
            state.b = snapTo(clampNum(v, 1, 10));
            if (state.a * state.b > 10 + 1e-9) state.a = fitProduct(state.b, state.a);
            if (rowA) rowA.sync();
        }
        function setDivA(v) {
            state.divA = snapTo(clampNum(v, 1, 10));
            state.divB = fitDivB(state.divA, state.divB);
            if (rowDivB) rowDivB.sync();
        }
        function setDivB(v) {
            state.divB = fitDivB(state.divA, clampNum(v, 1, 10));
        }
        function setPowA(v) {
            state.powA = clampPowA(v, state.n);
        }

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
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' +
                    color + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(v);
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), 1).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(get(), 1).replace(',', '.');
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
                    field.value = fmt(get(), 1).replace(',', '.');
                    paint();
                }
            };
        }
        rowA = makeRow('a', 1, 10, 0.1, function () { return state.a; }, setA, COL.segA);
        rowB = makeRow('b', 1, 10, 0.1, function () { return state.b; }, setB, COL.segB);
        rowDivA = makeRow('a', 1, 10, 0.1, function () { return state.divA; }, setDivA, COL.segA);
        rowDivB = makeRow('b', 1, 10, 0.1, function () { return state.divB; }, setDivB, COL.segB);
        rowPowA = makeRow('a', 1, 3.2, 0.05, function () { return state.powA; }, setPowA, COL.segA);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.a = 2; state.b = 3;
            state.divA = 6; state.divB = 3;
            state.powA = 2; state.n = 3;
            state.revealed = false;
            rowA.sync(); rowB.sync(); rowDivA.sync(); rowDivB.sync(); rowPowA.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragning ──────────────────────────────────────────────────────
        var dragging = null;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var v = pxToWorldValue(e.clientX);
            if (dragging === 'ruler') {
                setA(v); rowA.sync();
            } else if (dragging === 'cursor') {
                // v = avläsning på undre skalan (= a*b) under markören
                var bNew = fitProduct(state.a, snapTo(clampNum(v / state.a, 1, 10 / state.a)));
                state.b = bNew;
                rowB.sync();
            } else if (dragging === 'divA') {
                setDivA(v); rowDivA.sync();
            } else if (dragging === 'divB') {
                setDivB(v); rowDivB.sync();
            } else if (dragging === 'powA') {
                setPowA(v); rowPowA.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── SVG-byggare ───────────────────────────────────────────────────
        function computeIdx() {
            if (state.step === 3) return state.divA / state.divB;
            return state.a;
        }
        function drawRulerGroup(idx, y, side, interactive, dimmed, highlightTick) {
            function xFor(v) { return xLower(idx * v); }
            var x1 = xFor(1), x2 = xFor(10);
            var g = svgEl('g', { opacity: dimmed ? 0.32 : 1 });
            var gradId = 'lab-vis-rulergrad-' + (uid++);
            var defs = svgEl('defs');
            var grad = svgEl('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' });
            grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': COL.rulerA }));
            grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': COL.rulerB }));
            defs.appendChild(grad);
            g.appendChild(defs);
            g.appendChild(svgEl('rect', {
                x: x1, y: y, width: (x2 - x1), height: rulerH, rx: 6, ry: 6,
                fill: 'url(#' + gradId + ')', stroke: COL.rulerStroke, 'stroke-width': 1.2
            }));
            TICKS.forEach(function (v) {
                var x = xFor(v);
                if (x < -30 || x > W + 30) return;
                var isHi = highlightTick != null && Math.abs(v - highlightTick) < 1e-9;
                var col = isHi ? COL.segTotal : COL.axis;
                g.appendChild(svgEl('line', {
                    x1: x, y1: y, x2: x, y2: y + rulerH,
                    stroke: col, 'stroke-width': isHi ? 2.6 : 1.3
                }));
                var ly = side === 'above' ? upperLabelY : lowerLabelY;
                g.appendChild(svgVarText(
                    { x: x, y: ly, 'font-size': isHi ? 12.5 : 11, 'text-anchor': 'middle', fill: col, 'font-weight': isHi ? '700' : '400' },
                    [fmt(v, 1)]));
            });
            MINOR.forEach(function (v) {
                var x = xFor(v);
                if (x < -10 || x > W + 10) return;
                g.appendChild(svgEl('line', {
                    x1: x, y1: y + rulerH * 0.22, x2: x, y2: y + rulerH * 0.78,
                    stroke: COL.axis, 'stroke-width': 1, opacity: 0.35
                }));
            });
            svg.appendChild(g);
            if (interactive) {
                var hit = svgEl('rect', { x: x1 - 10, y: y - 6, width: (x2 - x1) + 20, height: rulerH + 12, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    dragging = 'ruler';
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            }
        }
        function drawCursor(x) {
            svg.appendChild(svgEl('line', { x1: x, y1: cursorY1, x2: x, y2: cursorY2, stroke: COL.cursor, 'stroke-width': 2.4 }));
            svg.appendChild(svgEl('polygon', {
                points: (x - 6) + ',' + (cursorY2 - 12) + ' ' + (x + 6) + ',' + (cursorY2 - 12) + ' ' + x + ',' + cursorY2,
                fill: COL.cursor
            }));
            var hit = svgEl('rect', { x: x - 14, y: cursorY1 - 8, width: 28, height: (cursorY2 - cursorY1) + 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = 'cursor';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }
        function drawMarker(x, dir, color, dragKind) {
            var tipY = dir === 'down' ? markAboveTip : markBelowTip;
            var baseY = dir === 'down' ? markAboveBase : markBelowBase;
            var pts = x + ',' + tipY + ' ' + (x - 7) + ',' + baseY + ' ' + (x + 7) + ',' + baseY;
            svg.appendChild(svgEl('polygon', { points: pts, fill: color, stroke: 'rgba(15,22,32,0.4)', 'stroke-width': 1 }));
            if (dragKind) {
                var hit = svgEl('circle', { cx: x, cy: (tipY + baseY) / 2, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    dragging = dragKind;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            }
        }
        function drawBarRow(y, segments) {
            var x = X0;
            segments.forEach(function (s) {
                var w = s.len * RW;
                if (w > 0.4) {
                    svg.appendChild(svgEl('rect', { x: x, y: y, width: w, height: rowH, fill: s.color, opacity: s.opacity || 1, rx: 2 }));
                }
                x += w;
            });
            return x;
        }
        function drawConnector(x) {
            svg.appendChild(svgEl('line', {
                x1: x, y1: row1Y - 2, x2: x, y2: row2Y + rowH + 2,
                stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
            }));
        }

        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var idx = computeIdx();

            drawRulerGroup(idx, upperRulerY, 'above', state.step <= 2, state.step === 4, state.step === 3 ? 1 : null);
            drawRulerGroup(1, lowerRulerY, 'below', false, false, null);

            // Referenslinje vid "1" genom bar-raderna
            svg.appendChild(svgEl('line', {
                x1: X0, y1: row1Y - 6, x2: X0, y2: row2Y + rowH + 6,
                stroke: COL.axis, 'stroke-width': 1, opacity: 0.25
            }));

            if (state.step <= 2) {
                drawCursor(xLower(state.a * state.b));
                var endX1 = drawBarRow(row1Y, [
                    { len: Math.log10(state.a), color: COL.segA },
                    { len: Math.log10(state.b), color: COL.segB }
                ]);
                drawBarRow(row2Y, [{ len: Math.log10(state.a * state.b), color: COL.segTotal }]);
                drawConnector(endX1);
            } else if (state.step === 3) {
                drawMarker(xLower(state.divA), 'down', COL.segA, 'divA');
                drawMarker(xLower(state.divB), 'up', COL.segB, 'divB');
                var lenA = Math.log10(state.divA), lenB = Math.log10(state.divB);
                if (lenA * RW > 0.4) {
                    svg.appendChild(svgEl('rect', { x: X0, y: row1Y, width: lenA * RW, height: rowH, fill: COL.segA, rx: 2 }));
                }
                var subW = lenB * RW;
                if (subW > 0.4) {
                    svg.appendChild(svgEl('rect', {
                        x: X0 + (lenA - lenB) * RW, y: row1Y, width: subW, height: rowH,
                        fill: COL.segB, opacity: 0.88, rx: 2
                    }));
                }
                var quotLen = Math.max(0, lenA - lenB);
                drawBarRow(row2Y, [{ len: quotLen, color: COL.segTotal }]);
                drawConnector(X0 + quotLen * RW);
            } else if (state.step === 4) {
                drawMarker(xLower(state.powA), 'down', COL.segA, 'powA');
                drawMarker(xLower(Math.pow(state.powA, state.n)), 'up', COL.segTotal, null);
                var segs = [];
                for (var i = 0; i < state.n; i++) {
                    segs.push({ len: Math.log10(state.powA), color: COL.segA, opacity: i % 2 === 0 ? 1 : 0.72 });
                }
                var endX4 = drawBarRow(row1Y, segs);
                drawBarRow(row2Y, [{ len: state.n * Math.log10(state.powA), color: COL.segTotal }]);
                drawConnector(endX4);
            }
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            if (state.step <= 2) {
                var a = state.a, b = state.b, ab = a * b;
                var lgA = Math.log10(a), lgB = Math.log10(b);
                katexInto(formelReadout, fmtTex(a, 2) + ' \\cdot ' + fmtTex(b, 2) + ' = ' + fmtTex(ab, 2));
                katexInto(formelSegA, '\\lg ' + fmtTex(a, 2) + ' \\approx ' + fmtFixTex(lgA, 2));
                katexInto(formelSegB, '\\lg ' + fmtTex(b, 2) + ' \\approx ' + fmtFixTex(lgB, 2));
                if (state.step === 2 && state.revealed) {
                    katexInto(formelCombined,
                        '\\lg(' + fmtTex(a, 2) + '\\cdot ' + fmtTex(b, 2) + ') = \\lg ' + fmtTex(a, 2) +
                        ' + \\lg ' + fmtTex(b, 2) + ' \\approx ' + fmtFixTex(lgA, 2) + ' + ' + fmtFixTex(lgB, 2) +
                        ' = ' + fmtFixTex(lgA + lgB, 2) + ' = \\lg ' + fmtTex(ab, 2));
                    note.innerHTML = 'Skalan är logaritmisk: samma FÖRHÅLLANDE (kvot) mellan två tal ' +
                        'ger alltid samma sträcka. Från 1 till 2 är kvoten 2 — lång sträcka. Från 9 ' +
                        'till 10 är kvoten bara 1,11 — kort sträcka. Därför trängs siffrorna ihop mot slutet.';
                } else {
                    formelCombined.textContent = '';
                    note.textContent = '';
                }
            } else if (state.step === 3) {
                var dA = state.divA, dB = state.divB, q = dA / dB;
                var lgDA = Math.log10(dA), lgDB = Math.log10(dB);
                katexInto(formelReadout, '\\dfrac{' + fmtTex(dA, 2) + '}{' + fmtTex(dB, 2) + '} = ' + fmtTex(q, 2));
                katexInto(formelSegA, '\\lg ' + fmtTex(dA, 2) + ' \\approx ' + fmtFixTex(lgDA, 2));
                katexInto(formelSegB, '\\lg ' + fmtTex(dB, 2) + ' \\approx ' + fmtFixTex(lgDB, 2));
                katexInto(formelCombined,
                    '\\lg\\dfrac{' + fmtTex(dA, 2) + '}{' + fmtTex(dB, 2) + '} = \\lg ' + fmtTex(dA, 2) +
                    ' - \\lg ' + fmtTex(dB, 2) + ' \\approx ' + fmtFixTex(lgDA, 2) + ' - ' + fmtFixTex(lgDB, 2) +
                    ' = ' + fmtFixTex(lgDA - lgDB, 2) + ' = \\lg ' + fmtTex(q, 2));
                note.innerHTML = 'Den blå längden (lg <em>b</em>) tas bort från slutet av den gröna ' +
                    '(lg <em>a</em>) — det som blir kvar är lg(<em>a</em>/<em>b</em>).';
            } else if (state.step === 4) {
                var pA = state.powA, n = state.n, res = Math.pow(pA, n);
                var lgPA = Math.log10(pA);
                katexInto(formelReadout, fmtTex(pA, 2) + '^{' + n + '} = ' + fmtTex(res, 2));
                katexInto(formelSegA, '\\lg ' + fmtTex(pA, 2) + ' \\approx ' + fmtFixTex(lgPA, 2));
                formelSegB.textContent = '';
                katexInto(formelCombined,
                    '\\lg(' + fmtTex(pA, 2) + '^{' + n + '}) = ' + n + ' \\cdot \\lg ' + fmtTex(pA, 2) +
                    ' \\approx ' + n + ' \\cdot ' + fmtFixTex(lgPA, 2) + ' = ' + fmtFixTex(n * lgPA, 2) +
                    ' = \\lg ' + fmtTex(res, 2));
                note.innerHTML = 'Segmentet lg <em>a</em> upprepas <em>n</em> gånger i rad — därför blir ' +
                    'lg(<em>a<sup>n</sup></em>) = <em>n</em> · lg <em>a</em>.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            nBtns.forEach(function (o) { o.el.classList.toggle('active', state.n === o.n); });
            instr.innerHTML = INSTR[state.step];
            nRow.style.display = state.step === 4 ? '' : 'none';

            legB.style.display = state.step === 4 ? 'none' : '';

            formelReadout.style.display = '';
            formelSegA.style.display = '';
            formelSegB.style.display = state.step === 4 ? 'none' : '';
            formelCombined.style.display = (state.step === 2 && !state.revealed) ? 'none' : '';
            note.style.display = (state.step === 2 && !state.revealed) ? 'none' : '';

            actions.style.display = state.step === 2 ? '' : 'none';
            revealBtn.textContent = state.revealed ? 'Dölj förklaringen' : 'Visa varför';

            rowA.row.style.display = state.step <= 2 ? '' : 'none';
            rowB.row.style.display = state.step <= 2 ? '' : 'none';
            rowDivA.row.style.display = state.step === 3 ? '' : 'none';
            rowDivB.row.style.display = state.step === 3 ? '' : 'none';
            rowPowA.row.style.display = state.step === 4 ? '' : 'none';

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
    window.VISUALISERINGAR['ma2c-5.4'] = api;
    window.VISUALISERINGAR['ma2c-5.5'] = api;
})();
