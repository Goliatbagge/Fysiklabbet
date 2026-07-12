/* ma3c-1.4.js — visualisering: "Rationella uttryckets hål" (gränsvärden och
 * hål i rationella uttryck). Hör till ma3c-1.1 (förkortning/förlängning av
 * rationella uttryck) och ma3c-1.4 (gränsvärden).
 *
 * Huvudexemplet är f(x) = (x² − 1)/(x − 1) — exakt Exempel 2 i ma3c-1.4:
 * grafen är linjen y = x + 1 med ett punkterat hål i (1, 2). f(1) saknas
 * (division med 0), men gränsvärdet finns och är 2. Ett andra exempel,
 * (5x² − 5x)/(3x − 3) = 5x/3 (från ma3c-1.1 Exempel 4b), generaliserar
 * insikten i steg 4.
 *
 * Fyra steg (lager):
 *   1. Hålet         — dragbar x-markör, live-avläsning f(x), tabell som
 *                       byggs (manuellt eller via "Fyll tabellen") precis
 *                       som ma3c-1.4 Exempel 2a.
 *   2. Zooma på hålet — zoomglidare ×1 → ×100 mot (1, 2); linjen förblir
 *                       spikrak, hålet finns kvar, lim-notation.
 *   3. Faktorisera    — knappen visar faktoriseringen steg för steg med
 *                       den gemensamma faktorn färgmarkerad (ma3c-1.4
 *                       Exempel 2b / ma3c-1.1 Exempel 4).
 *   4. Ett hål till   — samma verktyg för ett andra uttryck, för att
 *                       generalisera insikten.
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
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function roundN(v, n) { var f = Math.pow(10, n); return Math.round(v * f) / f; }

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
    // Renderar till en HTML-sträng (för att blanda KaTeX med vanlig text).
    function katexHTML(tex) {
        if (window.katex) {
            try { return window.katex.renderToString(tex, { throwOnError: false, displayMode: false }); }
            catch (e) { /* fall igenom */ }
        }
        return tex.replace(/\{,\}/g, ',');
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // linjen f(x) — blå
        hole: '#c8324a',       // hålet / odefinierat — accentröd
        hilite: '#b8590a',     // den gemensamma faktorn vid förkortning — amber
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── De två exemplen (holeX = 1 för båda) ──────────────────────────
    var EXAMPLES = [
        {
            numTex: 'x^2-1', denTex: 'x-1',
            numParts: ['(x+1)', '(x-1)'], numCommonIdx: 1,
            denParts: ['(x-1)'], denCommonIdx: 0,
            simplifiedTex: 'x+1',
            holeX: 1, holeY: 2,
            halfX: 4, halfY: 5,
            num: function (x) { return x * x - 1; },
            den: function (x) { return x - 1; },
            simplified: function (x) { return x + 1; },
            btnTex: '\\dfrac{x^2-1}{x-1}'
        },
        {
            numTex: '5x^2-5x', denTex: '3x-3',
            numParts: ['5x', '(x-1)'], numCommonIdx: 1,
            denParts: ['3', '(x-1)'], denCommonIdx: 1,
            simplifiedTex: '\\dfrac{5x}{3}',
            holeX: 1, holeY: 5 / 3,
            halfX: 4, halfY: 8,
            num: function (x) { return 5 * x * x - 5 * x; },
            den: function (x) { return 3 * x - 3; },
            simplified: function (x) { return 5 * x / 3; },
            btnTex: '\\dfrac{5x^2-5x}{3x-3}'
        }
    ];

    function niceStep(range) {
        var candidates = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];
        for (var i = 0; i < candidates.length; i++) {
            if (range / candidates[i] <= 10) return candidates[i];
        }
        return candidates[candidates.length - 1];
    }
    function decimalsForStep(step) {
        var s = String(step);
        var i = s.indexOf('.');
        return i < 0 ? 0 : (s.length - i - 1);
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var state = {
            step: 1,
            example: 0,
            x: 0,
            zoom: 1,
            factStage: 0
        };
        var revealed = [
            { left: [false, false, false], right: [false, false, false] },
            { left: [false, false, false], right: [false, false, false] }
        ];
        var fillAnimId = null, fillTimeoutId = null;
        var zoomAnimId = null;
        var dragging = false;

        function currentExample() { return EXAMPLES[state.example]; }
        function currentRevealed() { return revealed[state.example]; }

        // ── Geometri: huvudscenen ────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;

        function currentWindow() {
            var ex = currentExample();
            var halfX = ex.halfX / state.zoom, halfY = ex.halfY / state.zoom;
            return {
                XMIN: ex.holeX - halfX, XMAX: ex.holeX + halfX,
                YMIN: ex.holeY - halfY, YMAX: ex.holeY + halfY
            };
        }

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Rationella uttryckets hål';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var exampleRow = document.createElement('div');
        exampleRow.className = 'lab-vis-actions';
        card.appendChild(exampleRow);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf av ett rationellt uttryck som är en rät ' +
                'linje med ett punkterat hål vid definitionsluckan. Dra i markören ' +
                'eller glidarna för att utforska.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var readout = document.createElement('div');
        readout.className = 'lab-vis-formel';
        card.appendChild(readout);

        var limFormula = document.createElement('div');
        limFormula.className = 'lab-vis-formel';
        limFormula.style.color = COL.hole;
        card.appendChild(limFormula);

        // ── Zoom-rad (steg 2) ─────────────────────────────────────────
        var zoomWrap = document.createElement('div');
        zoomWrap.className = 'lab-graf-controls';
        card.appendChild(zoomWrap);

        var zoomRow = document.createElement('div');
        zoomRow.className = 'lab-graf-row';
        var zoomLbl = document.createElement('label');
        zoomLbl.className = 'lab-graf-lbl';
        var zoomSpan = document.createElement('span');
        zoomSpan.style.cssText = 'font-family:var(--lab-font-display);font-size:13.5px;' +
            'color:var(--lab-ink-soft);min-width:5.2em;text-align:left;flex-shrink:0;';
        zoomSpan.textContent = 'Förstoring';
        zoomLbl.appendChild(zoomSpan);
        var zoomSlider = document.createElement('input');
        zoomSlider.type = 'range';
        zoomSlider.className = 'lab-graf-slider';
        zoomSlider.min = 1; zoomSlider.max = 100; zoomSlider.step = 1; zoomSlider.value = 1;
        zoomSlider.setAttribute('aria-label', 'Förstoringsgrad mot hålet');
        zoomLbl.appendChild(zoomSlider);
        var zoomVal = document.createElement('div');
        zoomVal.className = 'lab-graf-num';
        zoomVal.style.cssText += 'display:flex;align-items:center;justify-content:center;';
        zoomVal.textContent = '×1';
        zoomRow.appendChild(zoomLbl);
        zoomRow.appendChild(zoomVal);
        zoomWrap.appendChild(zoomRow);

        var zoomActions = document.createElement('div');
        zoomActions.className = 'lab-vis-actions';
        zoomWrap.appendChild(zoomActions);
        var zoomAnimBtn = document.createElement('button');
        zoomAnimBtn.type = 'button';
        zoomAnimBtn.className = 'lab-btn';
        zoomAnimBtn.textContent = 'Zooma in automatiskt';
        zoomActions.appendChild(zoomAnimBtn);

        function setZoom(z) {
            stopZoomAnim();
            state.zoom = clampNum(z, 1, 100);
            zoomSlider.value = state.zoom;
            zoomVal.textContent = '×' + fmt(state.zoom, 0);
            recenterIfHidden();
            update();
        }
        zoomSlider.addEventListener('input', function () {
            setZoom(parseFloat(zoomSlider.value));
        });
        zoomAnimBtn.addEventListener('click', function () { startZoomAnim(); });
        function stopZoomAnim() {
            if (zoomAnimId != null) { cancelAnimationFrame(zoomAnimId); zoomAnimId = null; }
        }
        function startZoomAnim() {
            stopZoomAnim();
            var T_MS = 3000, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.zoom = Math.pow(100, p);
                zoomSlider.value = state.zoom;
                zoomVal.textContent = '×' + fmt(state.zoom, 0);
                recenterIfHidden();
                update();
                if (p < 1) zoomAnimId = requestAnimationFrame(frame);
                else zoomAnimId = null;
            }
            zoomAnimId = requestAnimationFrame(frame);
        }
        function recenterIfHidden() {
            var w = currentWindow(), ex = currentExample();
            if (state.x < w.XMIN - 1e-9 || state.x > w.XMAX + 1e-9) {
                state.x = ex.holeX;
                rowX.sync();
            }
        }

        // ── Legend ────────────────────────────────────────────────────
        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);
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
        var legCurve = legendItem(COL.curve, '<em>f</em>(<em>x</em>)');
        var legHole = legendItem(COL.hole, 'hål — inte definierad');
        legend.appendChild(legCurve);
        legend.appendChild(legHole);

        // ── Tabell (steg 1 och 4) ─────────────────────────────────────
        var tableWrap = document.createElement('div');
        tableWrap.style.cssText = 'margin-top:10px;';
        card.appendChild(tableWrap);
        var tableTitle = document.createElement('div');
        tableTitle.style.cssText = 'text-align:center;font-size:12px;letter-spacing:.06em;' +
            'text-transform:uppercase;color:var(--lab-ink-soft);margin-bottom:6px;';
        tableTitle.textContent = 'Tabellen — underifrån och ovanifrån';
        var tableScroll = document.createElement('div');
        tableScroll.style.cssText = 'overflow-x:auto;';
        var table = document.createElement('table');
        table.style.cssText = 'border-collapse:collapse;margin:0 auto;font-size:13.5px;' +
            'font-family:var(--lab-font-mono);';
        tableScroll.appendChild(table);
        tableWrap.appendChild(tableTitle);
        tableWrap.appendChild(tableScroll);

        function styleHeadCell(cell) {
            cell.style.cssText = 'padding:6px 13px;border-bottom:2px solid var(--lab-ink);' +
                'font-size:12.5px;text-align:center;white-space:nowrap;color:var(--lab-ink);' +
                'font-family:var(--lab-font-display);';
        }
        function styleCell(cell, revealedNow) {
            cell.style.cssText = 'padding:6px 13px;border-bottom:1px solid var(--lab-line);' +
                'text-align:center;white-space:nowrap;min-width:52px;' +
                (revealedNow ? 'color:var(--lab-ink);' : 'color:var(--lab-line-strong);');
        }
        var OFFSETS = [0.1, 0.01, 0.001];
        function renderTable() {
            while (table.firstChild) table.removeChild(table.firstChild);
            var ex = currentExample(), rv = currentRevealed();
            var head = document.createElement('tr');
            var hL = document.createElement('th'); hL.innerHTML = 'Underifrån <em>x</em>'; styleHeadCell(hL); head.appendChild(hL);
            var hLv = document.createElement('th'); hLv.innerHTML = katexHTML('\\dfrac{' + ex.numTex + '}{' + ex.denTex + '}'); styleHeadCell(hLv); head.appendChild(hLv);
            var hR = document.createElement('th'); hR.innerHTML = 'Ovanifrån <em>x</em>'; styleHeadCell(hR); head.appendChild(hR);
            var hRv = document.createElement('th'); hRv.innerHTML = katexHTML('\\dfrac{' + ex.numTex + '}{' + ex.denTex + '}'); styleHeadCell(hRv); head.appendChild(hRv);
            table.appendChild(head);
            for (var i = 0; i < 3; i++) {
                var tr = document.createElement('tr');
                var lx = ex.holeX - OFFSETS[i], rx = ex.holeX + OFFSETS[i];
                var lRev = rv.left[i], rRev = rv.right[i];
                var c1 = document.createElement('td'); c1.textContent = fmt(lx, 3); styleCell(c1, lRev); tr.appendChild(c1);
                var c2 = document.createElement('td'); c2.textContent = lRev ? fmt(ex.simplified(lx), 3) : '…'; styleCell(c2, lRev); tr.appendChild(c2);
                var c3 = document.createElement('td'); c3.textContent = fmt(rx, 3); styleCell(c3, rRev); tr.appendChild(c3);
                var c4 = document.createElement('td'); c4.textContent = rRev ? fmt(ex.simplified(rx), 3) : '…'; styleCell(c4, rRev); tr.appendChild(c4);
                table.appendChild(tr);
            }
        }

        var fillWrap = document.createElement('div');
        fillWrap.className = 'lab-vis-actions';
        card.appendChild(fillWrap);
        var fillBtn = document.createElement('button');
        fillBtn.type = 'button';
        fillBtn.className = 'lab-btn';
        fillBtn.textContent = 'Fyll tabellen';
        fillBtn.addEventListener('click', function () { startFill(); });
        fillWrap.appendChild(fillBtn);

        var tableNote = document.createElement('div');
        tableNote.className = 'lab-vis-note';
        card.appendChild(tableNote);

        function stopFill() {
            if (fillAnimId != null) { cancelAnimationFrame(fillAnimId); fillAnimId = null; }
            if (fillTimeoutId != null) { clearTimeout(fillTimeoutId); fillTimeoutId = null; }
        }
        function startFill() {
            stopFill();
            var ex = currentExample();
            var seq = [
                { side: 'left', i: 0, x: ex.holeX - 0.1 },
                { side: 'left', i: 1, x: ex.holeX - 0.01 },
                { side: 'left', i: 2, x: ex.holeX - 0.001 },
                { side: 'right', i: 0, x: ex.holeX + 0.1 },
                { side: 'right', i: 1, x: ex.holeX + 0.01 },
                { side: 'right', i: 2, x: ex.holeX + 0.001 }
            ];
            var segIdx = 0, fromX = state.x;
            function nextSeg() {
                if (segIdx >= seq.length) { fillAnimId = null; return; }
                var target = seq[segIdx];
                var t0 = null, startX = fromX, DUR = 480;
                function frame(ts) {
                    if (t0 == null) t0 = ts;
                    var p = clampNum((ts - t0) / DUR, 0, 1);
                    state.x = startX + (target.x - startX) * p;
                    rowX.sync();
                    update();
                    if (p < 1) { fillAnimId = requestAnimationFrame(frame); }
                    else {
                        state.x = target.x;
                        rowX.sync();
                        revealed[state.example][target.side][target.i] = true;
                        update();
                        fromX = target.x;
                        segIdx++;
                        fillTimeoutId = setTimeout(nextSeg, 260);
                    }
                }
                fillAnimId = requestAnimationFrame(frame);
            }
            nextSeg();
        }
        function checkAutoReveal() {
            var ex = currentExample();
            var rx = roundN(state.x, 3);
            var targets = [
                { side: 'left', i: 0, x: ex.holeX - 0.1 },
                { side: 'left', i: 1, x: ex.holeX - 0.01 },
                { side: 'left', i: 2, x: ex.holeX - 0.001 },
                { side: 'right', i: 0, x: ex.holeX + 0.1 },
                { side: 'right', i: 1, x: ex.holeX + 0.01 },
                { side: 'right', i: 2, x: ex.holeX + 0.001 }
            ];
            targets.forEach(function (t) {
                if (roundN(t.x, 3) === rx) revealed[state.example][t.side][t.i] = true;
            });
        }

        // ── Faktorisering (steg 3) ──────────────────────────────────────
        var factorWrap = document.createElement('div');
        card.appendChild(factorWrap);
        var factorFormula = document.createElement('div');
        factorFormula.className = 'lab-vis-formel';
        factorFormula.style.fontSize = '18px';
        factorWrap.appendChild(factorFormula);
        var factorActions = document.createElement('div');
        factorActions.className = 'lab-vis-actions';
        factorWrap.appendChild(factorActions);
        var factorBtn = document.createElement('button');
        factorBtn.type = 'button';
        factorBtn.className = 'lab-btn';
        factorActions.appendChild(factorBtn);
        factorBtn.addEventListener('click', function () {
            state.factStage = (state.factStage + 1) % 3;
            update();
        });
        var factorNote = document.createElement('div');
        factorNote.className = 'lab-vis-note';
        factorWrap.appendChild(factorNote);

        function coloredParts(parts, idx) {
            return parts.map(function (p, i) {
                return i === idx ? '\\textcolor{' + COL.hilite + '}{' + p + '}' : p;
            }).join('');
        }
        function updateFactor() {
            var ex = currentExample();
            var base = '\\dfrac{' + ex.numTex + '}{' + ex.denTex + '}';
            var factored = '\\dfrac{' + coloredParts(ex.numParts, ex.numCommonIdx) + '}{' +
                coloredParts(ex.denParts, ex.denCommonIdx) + '}';
            var tex = base;
            if (state.factStage >= 1) tex += ' = ' + factored;
            if (state.factStage >= 2) tex += ' = ' + ex.simplifiedTex + '\\quad(x \\neq ' + fmtTex(ex.holeX, 0) + ')';
            katexInto(factorFormula, tex);
            factorBtn.textContent = state.factStage === 0 ? 'Faktorisera'
                : state.factStage === 1 ? 'Förkorta bort gemensam faktor' : 'Börja om';
            factorNote.innerHTML = state.factStage === 2
                ? 'Precis som vid förkortning av bråk ändras inte uttryckets storlek av ' +
                  'förkortningen — men bara där båda formerna är definierade. I <em>x</em> = ' +
                  fmt(ex.holeX, 0) + ' blir nämnaren i <strong>originaluttrycket</strong> 0, så ' +
                  'just den punkten saknas i grafen. Det är hålet.'
                : '';
        }

        // ── Exempel-väljare (steg 4) ────────────────────────────────────
        var exBtns = [];
        EXAMPLES.forEach(function (ex, idx) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.innerHTML = katexHTML(ex.btnTex);
            b.addEventListener('click', function () {
                state.example = idx;
                state.factStage = 0;
                recenterIfHidden();
                rowX.sync();
                update();
            });
            exampleRow.appendChild(b);
            exBtns.push(b);
        });

        // ── x-glidare/fält ────────────────────────────────────────────
        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

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
            var decimals = 3;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.hole + ' 0%, ' +
                    COL.hole + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopFill();
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
        var X_MIN = -3, X_MAX = 5, X_STEP = 0.001;
        var rowX = makeRow('x', X_MIN, X_MAX, X_STEP,
            function () { return state.x; },
            function (v) {
                // Ingen snappning här (glidare/fält ska kunna träffa exakt
                // 0,99/0,999 för tabellen) — snappning till hålet sker bara
                // vid dragning direkt i scenen, se pointermove nedan.
                state.x = roundN(v, 3);
                checkAutoReveal();
            });

        // ── Återställ ─────────────────────────────────────────────────
        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopFill(); stopZoomAnim();
            state.step = 1; state.example = 0; state.x = 0; state.zoom = 1; state.factStage = 0;
            revealed = [
                { left: [false, false, false], right: [false, false, false] },
                { left: [false, false, false], right: [false, false, false] }
            ];
            zoomSlider.value = 1; zoomVal.textContent = '×1';
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Hålet' },
            { n: 2, label: '2 · Zooma på hålet' },
            { n: 3, label: '3 · Faktorisering' },
            { n: 4, label: '4 · Ett hål till' }
        ];
        var INSTR = {
            1: 'Dra i markören (eller skriv ett <em>x</em>-värde i fältet) och se hur ' +
               '<em>f</em>(<em>x</em>) ändras. Vad tror du händer <strong>exakt</strong> när ' +
               '<em>x</em> = 1? Testa själv — fyll sedan tabellen och se om du hade rätt.',
            2: 'Zooma in mot punkten (1, 2). Linjen är spikrak genom den öppna ringen — hur ' +
               'mycket du än zoomar hittar du aldrig ett funktionsvärde exakt i <em>x</em> = 1. ' +
               'Ändå pekar allt mot samma punkt: det är gränsvärdet.',
            3: 'Tryck på knappen för att faktorisera täljare och nämnare. Den gemensamma ' +
               'faktorn kan förkortas bort — men bara där den inte är 0.',
            4: 'Samma idé gäller för alla rationella uttryck: en gemensam faktor i täljare ' +
               'och nämnare ger ett hål just där den faktorn gör nämnaren 0. Välj ett uttryck ' +
               'och utforska på samma sätt som i steg 1.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                stopFill(); stopZoomAnim();
                state.step = s.n;
                if (s.n !== 2) { state.zoom = 1; zoomSlider.value = 1; zoomVal.textContent = '×1'; }
                if (s.n !== 4) { state.example = 0; }
                else { state.example = 1; }
                state.factStage = 0;
                recenterIfHidden();
                rowX.sync();
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Dragpunkt i scenen ────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var win = currentWindow();
            var px = (clientX - r.left) * W / r.width;
            return win.XMIN + (px - L) / PW * (win.XMAX - win.XMIN);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = clampNum(toWorldX(e.clientX), X_MIN, X_MAX);
            var ex = currentExample();
            var rv = roundN(xw, 3);
            state.x = Math.abs(rv - ex.holeX) < 0.03 ? ex.holeX : rv;
            checkAutoReveal();
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Perpendikulär offset (för etiketter som inte får ligga på linjen) ──
        function perpOffset(worldX, worldY, dist, X, Y, ex) {
            var dx = X(worldX + 1) - X(worldX);
            var dy = Y(ex.simplified(worldX + 1)) - Y(worldY);
            var len = Math.sqrt(dx * dx + dy * dy) || 1;
            var ux = dx / len, uy = dy / len;
            var px = uy, py = -ux;
            if (py > 0) { px = -px; py = -py; }
            return { x: X(worldX) + px * dist, y: Y(worldY) + py * dist, sx: px };
        }

        // ── Rita huvudscenen ──────────────────────────────────────────
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var ex = currentExample();
            var win = currentWindow();
            var XMIN = win.XMIN, XMAX = win.XMAX, YMIN = win.YMIN, YMAX = win.YMAX;
            function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
            function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

            var xAxisVisible = (0 >= YMIN && 0 <= YMAX);
            var yAxisVisible = (0 >= XMIN && 0 <= XMAX);
            var axisY = xAxisVisible ? Y(0) : null;
            var axisX = yAxisVisible ? X(0) : null;
            var xStep = niceStep(XMAX - XMIN), yStep = niceStep(YMAX - YMIN);
            var xDec = decimalsForStep(xStep), yDec = decimalsForStep(yStep);
            var i, v;

            // Rutnät
            for (i = Math.ceil(XMIN / xStep - 1e-9); i * xStep <= XMAX + 1e-9; i++) {
                v = i * xStep;
                svg.appendChild(svgEl('line', { x1: X(v), y1: T, x2: X(v), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = Math.ceil(YMIN / yStep - 1e-9); i * yStep <= YMAX + 1e-9; i++) {
                v = i * yStep;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(v), x2: L + PW, y2: Y(v), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar (bara om 0 syns i respektive led)
            if (xAxisVisible) {
                svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
                svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
                svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            }
            if (yAxisVisible) {
                svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
                svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
                svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            }

            // Tick-etiketter
            var xTickY = xAxisVisible ? (axisY + 16) : (T + PH + 16);
            var yTickX = yAxisVisible ? (axisX - 6) : (L - 6);
            for (i = Math.ceil(XMIN / xStep - 1e-9); i * xStep <= XMAX + 1e-9; i++) {
                v = i * xStep;
                if (xAxisVisible && Math.abs(v) < xStep / 1000) continue;
                svg.appendChild(svgVarText(
                    { x: X(v), y: xTickY, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [fmt(v, xDec)]));
            }
            for (i = Math.ceil(YMIN / yStep - 1e-9); i * yStep <= YMAX + 1e-9; i++) {
                v = i * yStep;
                if (yAxisVisible && Math.abs(v) < yStep / 1000) continue;
                svg.appendChild(svgVarText(
                    { x: yTickX, y: Y(v) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [fmt(v, yDec)]));
            }

            // Linjen f(x) = "förenklad form" (rak linje, alltid inom fönstret)
            svg.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(ex.simplified(XMIN)), x2: X(XMAX), y2: Y(ex.simplified(XMAX)),
                stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linecap': 'round'
            }));

            // Kurvetikett f(x) i fri yta, förskjuten vinkelrätt från linjen
            var lblWx = XMIN + (XMAX - XMIN) * 0.22;
            var lblPos = perpOffset(lblWx, ex.simplified(lblWx), 15, X, Y, ex);
            svg.appendChild(svgVarText(
                { x: lblPos.x, y: lblPos.y, 'font-size': 13, 'text-anchor': lblPos.sx < 0 ? 'end' : 'start', fill: COL.curve },
                ['*f', '(', '*x', ')']));

            // Hålet: öppen ring i (holeX, holeY) — fast pixelradie oavsett zoom
            var hx = X(ex.holeX), hy = Y(ex.holeY);
            var atHole = state.x === ex.holeX;
            if (atHole) {
                svg.appendChild(svgEl('circle', { cx: hx, cy: hy, r: 10, fill: 'none', stroke: COL.hole, 'stroke-width': 1.2, opacity: 0.4 }));
            }
            svg.appendChild(svgEl('circle', {
                cx: hx, cy: hy, r: 5.5, style: 'fill:var(--lab-bg-panel);stroke:' + COL.hole + ';stroke-width:2.2'
            }));

            // Hål-etikett, vinkelrätt förskjuten
            var holePos = perpOffset(ex.holeX, ex.holeY, 32, X, Y, ex);
            svg.appendChild(svgVarText(
                { x: holePos.x, y: holePos.y, 'font-size': 12.5, 'text-anchor': holePos.sx < 0 ? 'end' : 'start', fill: COL.hole },
                ['hål']));
            svg.appendChild(svgVarText(
                { x: holePos.x, y: holePos.y + 14, 'font-size': 12, 'text-anchor': holePos.sx < 0 ? 'end' : 'start', fill: COL.hole },
                ['(', fmt(ex.holeX, 0), ', ', fmt(ex.holeY, 2), ')']));

            // Dragbar markör vid (x, f(x)) — bara om x inuti fönstret och x ≠ hål
            if (state.x >= XMIN - 1e-9 && state.x <= XMAX + 1e-9 && !atHole) {
                var mx = X(state.x), my = Y(ex.simplified(state.x));
                svg.appendChild(svgEl('circle', { cx: mx, cy: my, r: 5, fill: COL.hole }));
                var hit = svgEl('circle', { cx: mx, cy: my, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    stopFill(); dragging = true;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            } else if (atHole) {
                // Osynlig träffyta ovanpå ringen så man kan börja dra därifrån igen
                var hit2 = svgEl('circle', { cx: hx, cy: hy, r: 16, fill: 'rgba(0,0,0,0)' });
                hit2.style.cursor = 'grab';
                hit2.addEventListener('pointerdown', function (e) {
                    stopFill(); dragging = true;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit2);
            }
        }

        // ── Live-avläsning under scenen ────────────────────────────────
        function updateReadout() {
            var ex = currentExample();
            if (state.x === ex.holeX) {
                readout.style.color = COL.hole;
                var numV = ex.num(ex.holeX), denV = ex.den(ex.holeX);
                readout.innerHTML = katexHTML('f(' + fmtTex(ex.holeX, 0) + ')') +
                    '&nbsp;är inte definierat — division med 0 (täljare = ' + fmt(numV, 0) +
                    ', nämnare = ' + fmt(denV, 0) + ')';
            } else {
                readout.style.color = COL.curve;
                var xT = fmtTex(state.x, 3), vT = fmtTex(ex.simplified(state.x), 3);
                readout.innerHTML = katexHTML('f(' + xT + ') = ' + vT);
            }
        }
        function updateLim() {
            var ex = currentExample();
            var tex = '\\lim\\limits_{x \\to ' + fmtTex(ex.holeX, 0) + '} \\dfrac{' + ex.numTex +
                '}{' + ex.denTex + '} = ' + fmtTex(ex.holeY, 2);
            katexInto(limFormula, tex);
        }
        function updateTableNote() {
            var ex = currentExample(), rv = currentRevealed();
            var allDone = rv.left.every(Boolean) && rv.right.every(Boolean);
            tableNote.innerHTML = allDone
                ? 'Både underifrån och ovanifrån närmar sig samma värde — <em>gränsvärdet</em> ' +
                  'är ' + fmt(ex.holeY, 2) + ', även om <em>f</em>(' + fmt(ex.holeX, 0) + ') saknas.'
                : '';
        }

        // ── Visa/dölj per steg + omritning ──────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            exBtns.forEach(function (b, i) { b.classList.toggle('active', state.example === i); });
            instr.innerHTML = INSTR[state.step];

            exampleRow.style.display = state.step === 4 ? '' : 'none';
            limFormula.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            zoomWrap.style.display = state.step === 2 ? '' : 'none';
            tableWrap.style.display = (state.step === 1 || state.step === 4) ? '' : 'none';
            fillWrap.style.display = (state.step === 1 || state.step === 4) ? '' : 'none';
            tableNote.style.display = (state.step === 1 || state.step === 4) ? '' : 'none';
            factorWrap.style.display = state.step === 3 ? '' : 'none';
            controls.style.display = state.step === 3 ? 'none' : 'flex';
            readout.style.display = state.step === 3 ? 'none' : 'flex';
            legend.style.display = state.step === 3 ? 'none' : 'flex';

            drawMain();
            updateReadout();
            if (state.step === 2 || state.step === 3) updateLim();
            if (state.step === 1 || state.step === 4) { renderTable(); updateTableNote(); }
            if (state.step === 3) updateFactor();
        }

        update();

        return {
            destroy: function () {
                stopFill(); stopZoomAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-1.1'] = api;
    window.VISUALISERINGAR['ma3c-1.4'] = api;
})();
