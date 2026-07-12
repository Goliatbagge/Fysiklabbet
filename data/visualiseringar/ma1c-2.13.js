/* ma1c-2.13.js — visualisering: "Talföljdsverkstaden" (mönster och formler).
 * Hör till ma1c-2.13 (Mönster och formler).
 *
 * Genomgången har två exempel:
 *   Exempel 1 — talföljden 3, 7, 11, 15, 19, … → a_n = 4n − 1 (ren talföljd,
 *               ingen figur).
 *   Exempel 2 — "prickmönstret": figur n = en rad med (2n+1) prickar + n
 *               prickar staplade ovanpå mittprickern → a_n = 3n + 1.
 * Modulen bygger huvudsakligen på Exempel 2 (prickfiguren), och använder
 * Exempel 1:s talföljd som ett andra mönster i steg 4 för att visa att
 * samma metod fungerar även utan en figur att rita.
 *
 * Fyra steg (lager):
 *   1. Mönstret växer  — n-glidare, nya prickar (jämfört med föregående
 *                         figur) lyser rött. Räknarkedja med "+3" mellan
 *                         figurerna. Gissa-först: figur 10 och figur 100.
 *   2. Bygg formeln     — eleven väljer a och b i a·n + b, jämförelsetabell
 *                         (n = 1, 2, 3, 4, 10) mot mönstrets riktiga antal.
 *   3. Varför 3n + 1?    — färgkodning i figuren: blå mittprick = konstanten,
 *                         gröna prickar = tre nya per figur (3n).
 *   4. Ett mönster till — talföljden 3, 7, 11, 15, 19, … (Exempel 1) som
 *                         stapeldiagram, samma formel-byggarverktyg.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js).
 * API: window.VISUALISERINGAR['ma1c-2.13'] = { mount(el) → { destroy() } }.
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

    // ── Färger (samma familj som graf.js/teorifigurerna) ─────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // "gamla" prickar / bas
        secant: '#4a7d3a',     // gröna prickar — termen 3n
        tangent: '#c8324a',    // nya prickar / accent
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── De två mönstren ────────────────────────────────────────────────
    function dotCount(n) { return 3 * n + 1; }   // Exempel 2: prickmönstret
    function seqValue(n) { return 4 * n - 1; }   // Exempel 1: talföljden
    var TEST_NS = [1, 2, 3, 4, 10];

    // Formaterar a·n + b enligt genomgångens skrivsätt ("3n + 1", "4n − 1",
    // ingen multiplikationsprick mellan koefficient och n — matchar
    // Exempel 1/2 exakt). Städar bort 0-termer och "1n" → "n".
    function formatLinearTex(a, b) {
        var parts = [];
        if (a !== 0) {
            parts.push((a === 1 ? '' : a === -1 ? '-' : String(a)) + 'n');
        }
        if (b !== 0) {
            if (parts.length === 0) parts.push(String(b));
            else parts.push((b > 0 ? '+ ' : '- ') + Math.abs(b));
        }
        if (parts.length === 0) parts.push('0');
        return parts.join(' ');
    }

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            n: 3,               // steg 1 & 3 — prickfiguren
            a: 0, b: 0,          // steg 2 — elevens formel för prickmönstret
            n4: 3,               // steg 4 — talföljden (bar-diagram)
            a4: 0, b4: 0,        // steg 4 — elevens formel för talföljden
            showGuess: false     // steg 1 — "visa svar" för figur 10/100
        };

        // ── Geometri: prickfiguren (steg 1–3) ──────────────────────────────
        var W = 560, H = 380, cx = 280, ROW_Y = 296, S = 16, DOT_R = 4.6;

        // ── Geometri: stapeldiagrammet (steg 4) ────────────────────────────
        var H2 = 260, L2 = 50, R2 = 20, T2 = 26, B2 = 42;
        var PW2 = W - L2 - R2, PH2 = H2 - T2 - B2;
        var N4MAX = 8;
        var SLOT = PW2 / N4MAX, BAR_W = 34;
        var MAXV4 = seqValue(N4MAX);
        var SCALE_Y = PH2 / (MAXV4 + 5);
        var BASE_Y = T2 + PH2;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Hitta formeln i mönstret';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var sceneDiv = document.createElement('div');
        sceneDiv.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(sceneDiv);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Ett prickmönster: figur n har en rad med prickar och ' +
                'en stapel prickar ovanpå mittprickern. Dra i n-glidaren för att ' +
                'se figuren växa.'
        });
        svg.classList.add('lab-graf-svg');
        sceneDiv.appendChild(svg);

        var scene2Div = document.createElement('div');
        scene2Div.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene2Div);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2,
            width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Stapeldiagram över talföljden 3, 7, 11, 15, 19 och så ' +
                'vidare — varje stapel är 4 högre än den förra.'
        });
        svg2.classList.add('lab-graf-svg');
        scene2Div.appendChild(svg2);

        var chipRow = document.createElement('div');
        chipRow.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:2px;margin:10px 0 2px;';
        card.appendChild(chipRow);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelPattern = document.createElement('div');
        formelPattern.className = 'lab-vis-formel';
        card.appendChild(formelPattern);

        var tableWrap = document.createElement('div');
        card.appendChild(tableWrap);

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
            { n: 1, label: '1 · Mönstret växer' },
            { n: 2, label: '2 · Bygg formeln' },
            { n: 3, label: '3 · Varför 3n + 1?' },
            { n: 4, label: '4 · Ett mönster till' }
        ];
        var INSTR = {
            1: 'Dra i <em>n</em>-glidaren och se hur figuren växer. De röda ' +
               'prickarna är nya jämfört med föregående figur — differensen är ' +
               'alltid +3. Hur många prickar behöver figur 10? Och figur 100? ' +
               'Gissa själv innan du trycker på knappen.',
            2: 'Bygg en formel på formen <em>a</em> · <em>n</em> + <em>b</em> ' +
               'genom att välja <em>a</em> och <em>b</em> nedan. Tabellen jämför ' +
               'din formel med mönstrets riktiga antal, rad för rad — gröna rader ' +
               'stämmer, röda stämmer inte. En formel som stämmer för <em>n</em> = 1 ' +
               'kan ändå spricka vid <em>n</em> = 10.',
            3: 'Den blå mittpricken finns med i alla figurer — det är konstanten ' +
               'i formeln. De gröna prickarna är tre nya för varje steg i ' +
               '<em>n</em> — det är koefficienten framför <em>n</em>. Dra i ' +
               'glidaren och se hur grupperna växer.',
            4: 'Samma metod fungerar även utan en figur att rita! Talföljden ' +
               '3, 7, 11, 15, 19, … växer med 4 för varje steg. Bygg formeln ' +
               '<em>a</em> · <em>n</em> + <em>b</em> igen och se att tekniken är densamma.'
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
        function setLegend(items) {
            legend.innerHTML = '';
            items.forEach(function (it) { legend.appendChild(legendItem(it.color, it.html)); });
        }

        // ── "Visa svar"-knapp (steg 1) ──────────────────────────────────────
        var guessBtn = document.createElement('button');
        guessBtn.type = 'button';
        guessBtn.className = 'lab-btn';
        guessBtn.textContent = 'Visa svar';
        guessBtn.addEventListener('click', function () {
            state.showGuess = !state.showGuess;
            guessBtn.textContent = state.showGuess ? 'Dölj svar' : 'Visa svar';
            update();
        });
        actions.appendChild(guessBtn);

        // ── Glidare ───────────────────────────────────────────────────────
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
            field.setAttribute('inputmode', 'numeric');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(clampNum(Math.round(v), min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = get();
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(field.value), 'field'); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                el: row,
                sync: function () {
                    slider.value = get();
                    field.value = get();
                    paint();
                }
            };
        }
        var rowN = makeRow('n', 1, 10, 1, function () { return state.n; }, function (v) { state.n = v; });
        var rowA = makeRow('a', 0, 6, 1, function () { return state.a; }, function (v) { state.a = v; });
        var rowB = makeRow('b', -5, 5, 1, function () { return state.b; }, function (v) { state.b = v; });
        var rowN4 = makeRow('n', 1, N4MAX, 1, function () { return state.n4; }, function (v) { state.n4 = v; });
        var rowA4 = makeRow('a', 0, 6, 1, function () { return state.a4; }, function (v) { state.a4 = v; });
        var rowB4 = makeRow('b', -5, 5, 1, function () { return state.b4; }, function (v) { state.b4 = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.step = 1; state.n = 3; state.a = 0; state.b = 0;
            state.n4 = 3; state.a4 = 0; state.b4 = 0; state.showGuess = false;
            guessBtn.textContent = 'Visa svar';
            rowN.sync(); rowA.sync(); rowB.sync(); rowN4.sync(); rowA4.sync(); rowB4.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Ritar prickfiguren (steg 1–3) ───────────────────────────────────
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var n = state.n;
            var mode = state.step === 3 ? 'breakdown' : (state.step === 1 ? 'growth' : 'neutral');

            var dots = [], i, L;
            for (i = -n; i <= n; i++) dots.push({ x: cx + i * S, y: ROW_Y, level: Math.abs(i) });
            for (L = 1; L <= n; L++) dots.push({ x: cx, y: ROW_Y - L * S, level: L });

            dots.forEach(function (d) {
                var color;
                if (mode === 'growth') color = (d.level === n) ? COL.tangent : COL.curve;
                else if (mode === 'breakdown') color = (d.level === 0) ? COL.curve : COL.secant;
                else color = COL.curve;
                svg.appendChild(svgEl('circle', { cx: d.x, cy: d.y, r: DOT_R, fill: color }));
            });

            svg.appendChild(svgVarText(
                { x: 20, y: 26, 'font-size': 15, 'text-anchor': 'start', fill: COL.axis },
                ['*n', ' = ' + n + '  →  ' + dotCount(n) + ' prickar']));
        }

        // ── Ritar stapeldiagrammet (steg 4) ─────────────────────────────────
        function drawBars() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var n4 = state.n4, i;

            svg2.appendChild(svgEl('line', {
                x1: L2, y1: BASE_Y, x2: L2 + PW2, y2: BASE_Y, stroke: COL.axis, 'stroke-width': 1.4
            }));

            for (i = 1; i <= N4MAX; i++) {
                var val = seqValue(i);
                var h = val * SCALE_Y;
                var slotX = L2 + (i - 1) * SLOT;
                var barX = slotX + (SLOT - BAR_W) / 2;
                var barY = BASE_Y - h;
                var color = (i === n4) ? COL.tangent : COL.curve;

                svg2.appendChild(svgEl('rect', { x: barX, y: barY, width: BAR_W, height: h, fill: color, rx: 2 }));

                var valText = svgEl('text', {
                    x: barX + BAR_W / 2, y: barY - 8, 'font-size': 12.5,
                    'text-anchor': 'middle', fill: color
                });
                valText.textContent = String(val);
                svg2.appendChild(valText);

                var nText = svgEl('text', {
                    x: barX + BAR_W / 2, y: BASE_Y + 18, 'font-size': 12,
                    'text-anchor': 'middle', fill: COL.tick
                });
                nText.textContent = String(i);
                svg2.appendChild(nText);
            }

            svg2.appendChild(svgVarText(
                { x: 20, y: 20, 'font-size': 15, 'text-anchor': 'start', fill: COL.axis },
                ['*n', ' = ' + n4 + '  →  ' + seqValue(n4) + ' i talföljden']));
        }

        // ── Räknarkedja (chips) — återanvänds för båda mönstren ────────────
        function renderChipRow(count, valueFn, currentIndex) {
            chipRow.innerHTML = '';
            for (var i = 1; i <= count; i++) {
                var isCur = (i === currentIndex);
                var chip = document.createElement('span');
                chip.textContent = valueFn(i);
                chip.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;' +
                    'min-width:30px;height:26px;padding:0 6px;border-radius:6px;font-size:12.5px;font-weight:600;' +
                    'border:1.5px solid ' + (isCur ? COL.tangent : 'rgba(31,37,48,0.25)') + ';' +
                    'color:' + (isCur ? COL.tangent : COL.axis) + ';' +
                    'background:' + (isCur ? 'rgba(200,50,74,0.08)' : 'transparent') + ';margin:2px 0';
                chipRow.appendChild(chip);
                if (i < count) {
                    var diff = document.createElement('span');
                    diff.textContent = '+' + (valueFn(i + 1) - valueFn(i));
                    diff.style.cssText = 'font-size:11px;color:' + COL.tick + ';padding:0 3px;';
                    chipRow.appendChild(diff);
                }
            }
        }

        // ── Jämförelsetabell — återanvänds för båda formel-byggarna ────────
        function renderComparisonTable(a, b, actualFn) {
            var rowsHtml = '';
            var allMatch = true;
            TEST_NS.forEach(function (n) {
                var mine = a * n + b;
                var actual = actualFn(n);
                var match = mine === actual;
                if (!match) allMatch = false;
                var bg = match ? 'rgba(74,125,58,0.14)' : 'rgba(200,50,74,0.12)';
                var fg = match ? '#2f5a23' : '#8a2438';
                rowsHtml += '<tr style="background:' + bg + '">' +
                    '<td style="padding:4px 10px;border-bottom:1px solid rgba(31,37,48,0.12)">' + n + '</td>' +
                    '<td style="padding:4px 10px;text-align:right;border-bottom:1px solid rgba(31,37,48,0.12);color:' + fg + ';font-weight:600">' + fmtDisp(mine, 0) + '</td>' +
                    '<td style="padding:4px 10px;text-align:right;border-bottom:1px solid rgba(31,37,48,0.12);color:' + fg + ';font-weight:600">' + fmtDisp(actual, 0) + '</td>' +
                    '</tr>';
            });
            tableWrap.innerHTML =
                '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:4px">' +
                '<thead><tr>' +
                '<th style="text-align:left;padding:4px 10px;border-bottom:2px solid ' + COL.axis + '"><em>n</em></th>' +
                '<th style="text-align:right;padding:4px 10px;border-bottom:2px solid ' + COL.axis + '">Din formel</th>' +
                '<th style="text-align:right;padding:4px 10px;border-bottom:2px solid ' + COL.axis + '">Mönstret</th>' +
                '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';
            return allMatch;
        }

        function updateFormula(a, b, allMatch) {
            katexInto(formelPattern, 'a_n = ' + formatLinearTex(a, b));
            formelPattern.style.color = allMatch ? COL.secant : COL.axis;
        }

        function setNote(html) {
            note.innerHTML = html;
            note.style.display = html ? '' : 'none';
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            var s = state.step;
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', s === i + 1); });
            instr.innerHTML = INSTR[s];

            sceneDiv.style.display = (s <= 3) ? '' : 'none';
            scene2Div.style.display = (s === 4) ? '' : 'none';
            chipRow.style.display = (s === 1 || s === 4) ? '' : 'none';
            actions.style.display = (s === 1) ? '' : 'none';
            legend.style.display = (s === 1 || s === 3) ? '' : 'none';
            formelPattern.style.display = (s === 2 || s === 4) ? '' : 'none';
            tableWrap.style.display = (s === 2 || s === 4) ? '' : 'none';

            rowN.el.style.display = (s <= 3) ? '' : 'none';
            rowA.el.style.display = (s === 2) ? '' : 'none';
            rowB.el.style.display = (s === 2) ? '' : 'none';
            rowN4.el.style.display = (s === 4) ? '' : 'none';
            rowA4.el.style.display = (s === 4) ? '' : 'none';
            rowB4.el.style.display = (s === 4) ? '' : 'none';

            if (s <= 3) drawMain();
            if (s === 4) drawBars();

            if (s === 1) renderChipRow(state.n, dotCount, state.n);
            else if (s === 4) renderChipRow(state.n4, seqValue, state.n4);

            if (s === 1) setLegend([
                { color: COL.curve, html: 'tidigare prickar' },
                { color: COL.tangent, html: 'nya prickar (+3)' }
            ]);
            else if (s === 3) setLegend([
                { color: COL.curve, html: 'konstanten (+1)' },
                { color: COL.secant, html: 'tre nya per figur (3<em>n</em>)' }
            ]);

            if (s === 2) {
                var ok2 = renderComparisonTable(state.a, state.b, dotCount);
                updateFormula(state.a, state.b, ok2);
                setNote(ok2
                    ? 'Alla rader stämmer! Formeln för mönstret är 3<em>n</em> + 1 — precis som i genomgången.'
                    : '');
            } else if (s === 4) {
                var ok4 = renderComparisonTable(state.a4, state.b4, seqValue);
                updateFormula(state.a4, state.b4, ok4);
                setNote(ok4
                    ? ('Alla rader stämmer! Formeln för talföljden är 4<em>n</em> − 1 — precis som i genomgången. ' +
                       'Då vet vi också att det 100:e talet är 4 · 100 − 1 = ' + seqValue(100) + '.')
                    : '');
            } else if (s === 1) {
                setNote(state.showGuess
                    ? ('Figur 10: ' + dotCount(10) + ' prickar. Figur 100: ' + dotCount(100) + ' prickar.')
                    : '');
            } else if (s === 3) {
                setNote('1 (blå) + 3 · ' + state.n + ' (gröna) = ' + dotCount(state.n) + ' prickar.');
            }
        }

        update();

        return {
            destroy: function () {
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma1c-2.13'] = { mount: mount };
})();
