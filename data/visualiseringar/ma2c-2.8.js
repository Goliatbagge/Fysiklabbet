/* ma2c-2.8.js — visualisering: "Rotekvationens falska rot" (rotekvationer).
 * Hör till ma2c-2.8 (Rotekvationer).
 *
 * Exemplet är genomgångens Exempel 1c / Exempel 2: x + 3√x − 4 = 0, omskrivet
 * (steg 1 i "Lösa rotekvationer") till 3√x = 4 − x. Kvadrering ger
 * x² − 17x + 16 = 0 med rötterna x = 1 och x = 16 — där x = 16 visar sig
 * vara en falsk rot (samma exempel och samma falska rot som i md-filen).
 *
 * Tre steg (lager):
 *   1. Originalet   — VL = 3√x (blå, bara definierad för x ≥ 0) möter
 *                      HL = 4 − x (grön rät linje). Dragbar x-markör med
 *                      live-avläsning. Kryssruta avslöjar den enda äkta
 *                      skärningen (gissa-först).
 *   2. Kvadrera      — knapp visar den kvadrerade jämförelsen (VL² = 9x mot
 *                      HL² = (4−x)²) i ett andra koordinatsystem: nu TVÅ
 *                      skärningar. Algebra-stegen som i genomgången.
 *   3. Prövningen    — två kort: sätt in x = 1 respektive x = 16 i den
 *                      ursprungliga ekvationen. Original-panelen märker ut
 *                      var den falska roten hamnar (VL ≥ 0 men HL negativt)
 *                      och en kort text förklarar varför kvadrering
 *                      "glömmer" tecknet (A = B ger A² = B², vilket även
 *                      tillåter A = −B).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3).
 * API: window.VISUALISERINGAR['ma2c-2.8'] = { mount(el) → { destroy() } }.
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
    function katexInto(div, tex, display) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: !!display }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',   // VL = 3√x — blå
        line: '#4a7d3a',    // HL = 4 − x — grön (äkta/rätt)
        false: '#c8324a',   // falsk rot — röd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var X_STEP = 0.1, X_LO = -1, X_HI = 18;
        var state = { step: 1, x: 6, squared: false, showIntersections: false };
        var animId = null;

        function fVL(x) { return x >= 0 ? 3 * Math.sqrt(x) : NaN; }
        function fHL(x) { return 4 - x; }
        function fVL2(x) { return x >= 0 ? 9 * x : NaN; }
        function fHL2(x) { return (4 - x) * (4 - x); }
        var ROOT_TRUE = 1, ROOT_FALSE = 16;

        // ── Geometri: panel 1 (originalet) ─────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = X_LO, XMAX = X_HI, YMIN = -15, YMAX = 15;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── Geometri: panel 2 (kvadrerat) — samma x-kolumner ────────────────
        var H2 = 250, T2 = 14, B2 = 34;
        var PH2 = H2 - T2 - B2;
        var Y2MIN = -15, Y2MAX = 185;
        function Y2(y) { return T2 + (Y2MAX - y) / (Y2MAX - Y2MIN) * PH2; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Rotekvationens falska rot';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var eqLine = document.createElement('div');
        eqLine.className = 'lab-vis-formel';
        eqLine.style.fontSize = '15px';
        eqLine.style.color = 'var(--lab-ink)';
        card.appendChild(eqLine);
        katexInto(eqLine,
            'x + 3\\sqrt{x} - 4 = 0 \\quad\\Longleftrightarrow\\quad 3\\sqrt{x} = 4-x', true);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf: den blå kurvan VL = 3 roten ur x möter ' +
                'den gröna linjen HL = 4 minus x. Dra i markören för att flytta x ' +
                'och läsa av båda leden.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelVL = document.createElement('div');
        formelVL.className = 'lab-vis-formel';
        formelVL.style.color = COL.curve;
        card.appendChild(formelVL);

        var formelHL = document.createElement('div');
        formelHL.className = 'lab-vis-formel';
        formelHL.style.color = COL.line;
        card.appendChild(formelHL);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var algebraWrap = document.createElement('div');
        algebraWrap.style.marginTop = '4px';
        card.appendChild(algebraWrap);
        var algebraLines = [
            '(3\\sqrt{x})^2 = (4-x)^2',
            '9x = 16-8x+x^2',
            'x^2-17x+16=0',
            'x = 8{,}5 \\pm \\sqrt{8{,}5^2-16} = 8{,}5\\pm\\sqrt{56{,}25} = 8{,}5\\pm7{,}5',
            '\\textcolor{#4a7d3a}{x_1 = 1} \\qquad \\textcolor{#c8324a}{x_2 = 16}'
        ];
        algebraLines.forEach(function (tex) {
            var d = document.createElement('div');
            d.className = 'lab-vis-formel';
            algebraWrap.appendChild(d);
            katexInto(d, tex, true);
        });

        var scene2Label = document.createElement('div');
        scene2Label.className = 'lab-vis-instr';
        scene2Label.style.marginTop = '10px';
        scene2Label.style.marginBottom = '4px';
        scene2Label.innerHTML = 'Samma <em>x</em>-axel — men nu jämför vi VL² och HL²:';
        card.appendChild(scene2Label);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2,
            width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Koordinatsystem med de kvadrerade leden: linjen VL i ' +
                'kvadrat lika med 9x möter parabeln HL i kvadrat lika med ' +
                'fyra minus x i kvadrat i två punkter, x lika med 1 och x lika med 16.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var provningWrap = document.createElement('div');
        provningWrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:14px; margin-top:14px;';
        card.appendChild(provningWrap);

        function makeProvningCard(xVal, correct) {
            var c = document.createElement('div');
            c.style.cssText = 'flex:1 1 220px; border:1px solid rgba(31,37,48,0.18); ' +
                'border-left:4px solid ' + (correct ? COL.line : COL.false) + '; ' +
                'border-radius:8px; padding:12px 14px; background:' +
                (correct ? 'rgba(74,125,58,0.07)' : 'rgba(200,50,74,0.07)') + ';';
            var h = document.createElement('div');
            h.style.cssText = 'font-family:var(--lab-font-display); font-size:15px; ' +
                'margin-bottom:6px; color:var(--lab-ink); text-align:center;';
            h.innerHTML = 'Prövning: <em style="font-style:italic">x</em> = ' + xVal;
            c.appendChild(h);
            var vlDiv = document.createElement('div');
            vlDiv.className = 'lab-vis-formel';
            vlDiv.style.fontSize = '14.5px';
            c.appendChild(vlDiv);
            var concl = document.createElement('div');
            concl.style.cssText = 'text-align:center; font-size:13.5px; font-weight:600; ' +
                'margin-top:6px; color:' + (correct ? COL.line : COL.false) + ';';
            concl.textContent = correct ? 'Stämmer!' : 'Stämmer inte — falsk rot!';
            c.appendChild(concl);
            provningWrap.appendChild(c);
            return vlDiv;
        }
        var cardTrueVL = makeProvningCard(ROOT_TRUE, true);
        katexInto(cardTrueVL,
            '\\mathrm{VL} = x+3\\sqrt{x}-4 = 1+3\\sqrt{1}-4 = 1+3-4 = 0 = \\mathrm{HL}', true);
        var cardFalseVL = makeProvningCard(ROOT_FALSE, false);
        katexInto(cardFalseVL,
            '\\mathrm{VL} = x+3\\sqrt{x}-4 = 16+3\\sqrt{16}-4 = 16+12-4 = 24 \\neq \\mathrm{HL} = 0', true);

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
            { n: 1, label: '1 · Originalet' },
            { n: 2, label: '2 · Kvadrera' },
            { n: 3, label: '3 · Prövningen' }
        ];
        var INSTR = {
            1: 'Vänsterledet VL = 3√<em>x</em> (blå kurva, bara definierad för ' +
               '<em>x</em> ≥ 0) och högerledet HL = 4 − <em>x</em> (grön linje). ' +
               'Dra i markören och läs av båda leden — hur många skärningspunkter ' +
               'mellan kurvorna ser du?',
            2: 'Vi kvadrerar båda led för att bli av med rottecknet. Tryck på ' +
               'knappen och se vad som händer med kurvorna nedanför — och följ ' +
               'algebran, steg för steg, precis som i genomgången.',
            3: 'Nu prövar vi båda rötterna i den URSPRUNGLIGA ekvationen (inte ' +
               'den kvadrerade!). En av dem stämmer. Den andra är en falsk rot ' +
               'som bara uppstod för att vi kvadrerade.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                if (s.n >= 2) state.squared = true;
                update();
            });
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
        var legVL = legendItem(COL.curve, 'VL = 3√<em>x</em>');
        var legHL = legendItem(COL.line, 'HL = 4 − <em>x</em>');
        var legFalse = legendItem(COL.false, 'falsk rot');
        legend.appendChild(legVL);
        legend.appendChild(legHL);
        legend.appendChild(legFalse);

        // ── Knappar/val i actions-raden ───────────────────────────────────
        var checkLabel = document.createElement('label');
        checkLabel.className = 'lab-graf-check';
        var checkCb = document.createElement('input');
        checkCb.type = 'checkbox';
        checkCb.addEventListener('change', function () {
            state.showIntersections = checkCb.checked;
            update();
        });
        checkLabel.appendChild(checkCb);
        var checkTxt = document.createElement('span');
        checkTxt.innerHTML = 'Visa skärningspunkten';
        checkLabel.appendChild(checkTxt);
        actions.appendChild(checkLabel);

        var squareBtn = document.createElement('button');
        squareBtn.type = 'button';
        squareBtn.className = 'lab-btn';
        squareBtn.textContent = 'Kvadrera båda led';
        squareBtn.addEventListener('click', function () {
            state.squared = true;
            update();
        });
        actions.appendChild(squareBtn);

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
                slider.style.background = 'linear-gradient(to right, ' + COL.tick + ' 0%, ' +
                    COL.tick + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
                }
            };
        }
        var rowX = makeRow('x', X_LO, X_HI, X_STEP,
            function () { return state.x; },
            function (v) { state.x = Math.round(v / X_STEP) * X_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.step = 1; state.x = 6; state.squared = false; state.showIntersections = false;
            checkCb.checked = false;
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragmarkör i panel 1 ──────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        function dragTo(clientX) {
            var xw = toWorldX(clientX);
            state.x = clampNum(Math.round(xw / X_STEP) * X_STEP, X_LO, X_HI);
            rowX.sync();
            update();
        }
        svg.addEventListener('pointerdown', function (e) {
            dragging = true;
            try { svg.setPointerCapture(e.pointerId); } catch (err) {}
            dragTo(e.clientX);
            e.preventDefault();
        });
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            dragTo(e.clientX);
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita panel 1 (originalet) ───────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var x = state.x;
            var axisY = Y(0), axisX = X(0);
            var i;

            // Rutnät
            for (i = 0; i <= 18; i += 2) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = -15; i <= 15; i += 5) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
            var falseRootLabelActive = state.step === 3;

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter: x jämna 0..16 (hoppa nära markören och nära den
            // egna "x"-axeletiketten vid högerkanten; 18 hoppas alltid över
            // eftersom den annars kolliderar med axeletiketten "x" bredvid
            // pilspetsen), y var 5:e
            for (i = 0; i <= 16; i += 2) {
                if (Math.abs(i - x) < 0.9) continue;
                if (falseRootLabelActive && i === ROOT_FALSE) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = -15; i <= 15; i += 5) {
                if (i === 0) continue;
                // Hoppa över en y-tick om den nästan sammanfaller med
                // markörens VL- eller HL-punkt just nu — annars kolliderar
                // siffran med markörprickarna/handtaget i det läget.
                if (Math.abs(i - fHL(x)) < 1.6) continue;
                if (x >= 0 && Math.abs(i - fVL(x)) < 1.6) continue;
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

            // HL = 4 − x (grön, heldragen, hela fönstret)
            g.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(fHL(XMIN)), x2: X(XMAX), y2: Y(fHL(XMAX)),
                stroke: COL.line, 'stroke-width': 2.2
            }));

            // VL = 3√x (blå, bara x ≥ 0)
            var d = '', N = 220, xi;
            for (i = 0; i <= N; i++) {
                xi = 0 + (XMAX - 0) * i / N;
                var yv = fVL(xi);
                d += (i === 0 ? 'M' : 'L') + X(xi).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Kurvetiketter i fri yta
            svg.appendChild(svgVarText(
                { x: X(0.4), y: Y(-9.3), 'font-size': 12.5, 'text-anchor': 'start', fill: COL.curve },
                ['VL = 3', '√', '*x']));
            // HL-etiketten: linjen har lutning −1 och faller ~2,6 världs-
            // enheter över etikettens bredd — 16 px vinkelrät marginal
            // räckte inte (linjen skar genom bokstäverna). Centrerad UNDER
            // linjen vid x = 14 med 24 px marginal.
            svg.appendChild(svgVarText(
                { x: X(14), y: Y(fHL(14)) + 24, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.line },
                ['HL = 4 − ', '*x']));

            // Äkta skärningspunkt x = 1 (kryssruta ELLER steg 3)
            var showTrue = state.showIntersections || state.step === 3;
            if (showTrue) {
                var tx = X(ROOT_TRUE), ty = Y(fVL(ROOT_TRUE));
                g.appendChild(svgEl('circle', { cx: tx, cy: ty, r: 5, fill: COL.line }));
                // Etiketten lyft till kilen OVANFÖR skärningen — direkt
                // uppe till höger om punkten kliver den blå kurvan (3√x)
                // in i glyfboxen, och till vänster korsar den gröna linjen.
                svg.appendChild(svgVarText(
                    { x: X(2.35), y: Y(6.0), 'font-size': 12, 'text-anchor': 'middle', fill: COL.line },
                    ['äkta rot']));
            }

            // Varför-detalj: falsk rot x = 16 (bara steg 3)
            if (state.step === 3) {
                var fx = X(ROOT_FALSE), fyVL = Y(fVL(ROOT_FALSE)), fyHL = Y(fHL(ROOT_FALSE));
                g.appendChild(svgEl('line', { x1: fx, y1: fyVL, x2: fx, y2: fyHL, stroke: COL.false, 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }));
                g.appendChild(svgEl('circle', { cx: fx, cy: fyVL, r: 5, fill: COL.curve, stroke: COL.false, 'stroke-width': 2 }));
                g.appendChild(svgEl('circle', { cx: fx, cy: fyHL, r: 5, fill: COL.line, stroke: COL.false, 'stroke-width': 2 }));
                svg.appendChild(svgEl('line', { x1: fx, y1: axisY, x2: fx, y2: T + PH, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
                svg.appendChild(svgVarText(
                    { x: fx, y: axisY + 16, 'font-size': 12, 'text-anchor': 'middle', fill: COL.false },
                    ['16']));

                // Förklarande text i fri yta (mellan kurvorna, ovanför
                // x-axeln — hela blocket hålls på ETT håll om axeln så det
                // aldrig kolliderar med axellinjen/tickraden, och ankras vid
                // x = 15 så vänsterkanten på de bredaste raderna ändå har
                // marginal till den stigande VL-kurvan).
                var tX = X(15);
                var lines = [
                    ['Vid ', '*x', ' = 16:'],
                    ['VL = 3√16 = 12'],
                    ['HL = 4 − 16 = −12'],
                    ['12 ≠ −12 → falsk rot!']
                ];
                var lineColors = [COL.axis, COL.curve, COL.line, COL.false];
                lines.forEach(function (parts, idx) {
                    svg.appendChild(svgVarText(
                        { x: tX, y: Y(8 - idx * 2.3), 'font-size': 12, 'text-anchor': 'end', fill: lineColors[idx] },
                        parts));
                });
            }

            // Dragmarkör vid x
            var mx = X(x);
            svg.appendChild(svgEl('line', { x1: mx, y1: T, x2: mx, y2: T + PH, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '5 4' }));
            var yVLpix = x >= 0 ? Y(fVL(x)) : null;
            var yHLpix = Y(fHL(x));
            if (yVLpix != null) {
                svg.appendChild(svgEl('circle', { cx: mx, cy: yVLpix, r: 4.5, fill: COL.curve }));
            }
            svg.appendChild(svgEl('circle', { cx: mx, cy: yHLpix, r: 4.5, fill: COL.line }));
            // "x ="-etiketten under axeln hoppas över nära högerkanten —
            // annars kolliderar den med den fasta axeletiketten "x" vid
            // pilspetsen (samma problem som på tick-etiketterna ovan).
            if (x <= 16.7) {
                svg.appendChild(svgVarText(
                    { x: mx, y: axisY + 16, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis },
                    ['*x']));
            }

            // Handtag: hänger 14 px ovanför den högst belägna av VL-/HL-
            // punkten (i stället för ett fast tak-läge) så det aldrig
            // kolliderar med y-axelns topp-etiketter när x ligger nära
            // vänsterkanten (där VL är odefinierad och HL är litet).
            var handleY = clampNum(Math.min(yVLpix != null ? yVLpix : yHLpix, yHLpix) - 14, T + 8, T + PH - 8);
            var handle = svgEl('circle', { cx: mx, cy: handleY, r: 6, fill: COL.axis });
            svg.appendChild(handle);
            var hit = svgEl('circle', { cx: mx, cy: handleY, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            svg.appendChild(hit);
        }

        // ── Rita panel 2 (kvadrerat) ────────────────────────────────────────
        var clipId2 = 'lab-vis-clip-' + (uid++);
        function drawSquared() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var axisY = Y2(0), axisX = X(0);
            var i;

            for (i = 0; i <= 18; i += 2) {
                svg2.appendChild(svgEl('line', { x1: X(i), y1: T2, x2: X(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 0; i <= 180; i += 20) {
                svg2.appendChild(svgEl('line', { x1: L, y1: Y2(i), x2: L + PW, y2: Y2(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            svg2.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX, y1: T2 + PH2, x2: axisX, y2: 16, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX + ',6 ' + (axisX - 4.5) + ',16 ' + (axisX + 4.5) + ',16', fill: COL.axis }));
            // Axeletiketten "x" sitter nära bottenkanten (axisY ligger långt
            // ner eftersom nästan alla värden är positiva) — placera den
            // OVANFÖR axellinjen, vid pilspetsen, där kurvorna redan ligger
            // långt uppe (fri yta), i stället för i samma rad som tick-
            // etiketterna nedanför.
            svg2.appendChild(svgVarText({ x: W - 4, y: axisY - 8, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisX + 10, y: 16, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // x-tick-etiketter i en FAST rad längst ner i marginalen (inte
            // bunden till axisY, som ligger nära botten här) — 18 hoppas
            // över eftersom den annars ligger dikt an mot pilspetsen.
            var xTickRow2 = T2 + PH2 + 13;
            for (i = 0; i <= 16; i += 2) {
                svg2.appendChild(svgVarText(
                    { x: X(i), y: xTickRow2, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = 0; i <= 180; i += 40) {
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

            // HL² = (4 − x)² — grön parabel
            var d2 = '', N = 220, xi, i2;
            for (i2 = 0; i2 <= N; i2++) {
                xi = 0 + (XMAX - 0) * i2 / N;
                d2 += (i2 === 0 ? 'M' : 'L') + X(xi).toFixed(1) + ' ' + Y2(fHL2(xi)).toFixed(1) + ' ';
            }
            g.appendChild(svgEl('path', {
                d: d2, fill: 'none', stroke: COL.line, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // VL² = 9x — blå linje
            g.appendChild(svgEl('line', {
                x1: X(0), y1: Y2(fVL2(0)), x2: X(18), y2: Y2(fVL2(18)),
                stroke: COL.curve, 'stroke-width': 2.2
            }));

            svg2.appendChild(svgVarText(
                { x: X(9.4), y: Y2(fVL2(9.4)) - 8, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.curve },
                ['VL² = 9', '*x']));
            // HL²-etiketten flyttad bort från roten x = 1 (annars kolliderar
            // den med "äkta rot"-etiketten där borta) till en lugn del av
            // parabeln längre till höger.
            svg2.appendChild(svgVarText(
                { x: X(6.3), y: Y2(fHL2(6.3)) - 8, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.line },
                ['HL² = (4 − ', '*x', ')²']));

            // Skärning 1: äkta rot (grön). Ingen textetikett här — linjen och
            // parabeln ligger för nära varandra runt skärningspunkten för att
            // rymma text utan att korsa någon av kurvorna; en tunn statisk
            // ring runt punkten räcker (legend + panel 1 förklarar redan
            // vad den gröna punkten betyder).
            var t1x = X(ROOT_TRUE), t1y = Y2(fVL2(ROOT_TRUE));
            g.appendChild(svgEl('circle', { cx: t1x, cy: t1y, r: 8, fill: 'none', stroke: COL.line, 'stroke-width': 1.6, opacity: 0.55 }));
            g.appendChild(svgEl('circle', { cx: t1x, cy: t1y, r: 5, fill: COL.line }));

            // Skärning 2: falsk rot (röd, pulserande ring)
            var t2x = X(ROOT_FALSE), t2y = Y2(fVL2(ROOT_FALSE));
            g.appendChild(svgEl('circle', { cx: t2x, cy: t2y, r: 5, fill: COL.false }));
            var ring = svgEl('circle', { cx: t2x, cy: t2y, r: 6, fill: 'none', stroke: COL.false, 'stroke-width': 2.2, opacity: 0.85 });
            var animR = svgEl('animate', { attributeName: 'r', values: '6;14;6', dur: '1.6s', repeatCount: 'indefinite' });
            var animO = svgEl('animate', { attributeName: 'opacity', values: '0.85;0.05;0.85', dur: '1.6s', repeatCount: 'indefinite' });
            ring.appendChild(animR);
            ring.appendChild(animO);
            g.appendChild(ring);
            svg2.appendChild(svgVarText(
                { x: t2x - 8, y: t2y - 10, 'font-size': 12, 'text-anchor': 'end', fill: COL.false },
                ['falsk rot!']));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var x = state.x;
            var xT = fmtTex(x, 1);
            var xInsertMinus = x < 0 ? '(' + xT + ')' : xT;
            if (state.step === 1) {
                if (x >= 0) {
                    katexInto(formelVL, '\\mathrm{VL} = 3\\sqrt{x} = 3\\sqrt{' + xT + '} = ' + fmtTex(fVL(x), 2));
                } else {
                    katexInto(formelVL, '\\mathrm{VL} = 3\\sqrt{x}: \\text{inte definierat för } x = ' + xT + ' \\ (x < 0)');
                }
                katexInto(formelHL, '\\mathrm{HL} = 4-x = 4-' + xInsertMinus + ' = ' + fmtTex(fHL(x), 2));
            } else {
                formelVL.textContent = '';
                formelHL.textContent = '';
            }

            if (state.step === 1) {
                note.innerHTML = state.showIntersections
                    ? 'Originalet har bara EN skärningspunkt: <em>x</em> = 1.'
                    : '';
            } else if (state.step === 2) {
                note.innerHTML = state.squared
                    ? 'Den kvadrerade ekvationen har TVÅ skärningspunkter: ' +
                      '<em>x</em> = 1 och <em>x</em> = 16 — men bara en av dem löser originalet.'
                    : '';
            } else {
                note.innerHTML = 'Varför uppstår <em>x</em> = 16? Kvadrering av <em>A</em> = <em>B</em> ' +
                    'ger <em>A</em>² = <em>B</em>², vilket även tillåter <em>A</em> = −<em>B</em>. Här är ' +
                    '<em>A</em> = 3√<em>x</em> och <em>B</em> = 4 − <em>x</em>; den falska roten löser i ' +
                    'stället 3√<em>x</em> = <em>x</em> − 4 — en helt annan ekvation som kvadreringen inte ' +
                    'kan skilja från den riktiga.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];

            checkLabel.style.display = state.step === 1 ? '' : 'none';
            squareBtn.style.display = (state.step === 2 && !state.squared) ? '' : 'none';
            formelVL.style.display = state.step === 1 ? '' : 'none';
            formelHL.style.display = state.step === 1 ? '' : 'none';
            actions.style.display = (state.step === 1 || (state.step === 2 && !state.squared)) ? '' : 'none';

            var showSquaredStuff = state.step >= 2 && state.squared;
            algebraWrap.style.display = showSquaredStuff ? '' : 'none';
            scene2Label.style.display = showSquaredStuff ? '' : 'none';
            scene2.style.display = showSquaredStuff ? '' : 'none';
            legFalse.style.display = showSquaredStuff ? '' : 'none';

            provningWrap.style.display = state.step === 3 ? '' : 'none';

            drawMain();
            if (showSquaredStuff) drawSquared();
            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                if (animId != null) { cancelAnimationFrame(animId); animId = null; }
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-2.8'] = api;
})();
