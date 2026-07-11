/* ma1c-5.4.js — visualisering: "Tärningsverkstaden" (utfallsrum och stora
 * talens lag). Hör till ma1c-5.4 (den klassiska sannolikhetsdefinitionen)
 * och ma1c-5.5 (experimentella sannolikheter).
 *
 * Kärninsikt:
 *   1. Den klassiska sannolikheten räknas ur ett synligt utfallsrum — 36
 *      lika sannolika kombinationer av två tärningar. Summan 7 är vanligast
 *      för att den har flest gynnsamma kombinationer (6 st).
 *   2. Den relativa frekvensen från riktiga (simulerade) kast stabiliseras
 *      mot den klassiska sannolikheten när antalet kast växer — stora
 *      talens lag, inte "kompensation" för en ojämn svit.
 *
 * Tre steg (lager):
 *   1. Utfallsrummet  — 6×6-rutnät, händelseväljare, gynnsamma rutor gröna,
 *                        live-formel P(händelse) = gynnsamma/möjliga.
 *   2. Kasta på riktigt — batch-kast (+1/+100/+10 000), graf: relativ
 *                        frekvens mot antal kast, streckad röd mållinje.
 *   3. Stora talens lag — instruktionstext + fälla-fråga om "skyldig"
 *                        träff, live-avläsning av aktuell svit utan träff.
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
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // Heltal med NBSP-tusentalsgrupper (UI-text, inte KaTeX).
    function fmtInt(n) {
        var v = Math.round(n);
        var neg = v < 0; v = Math.abs(v);
        var s = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return (neg ? '−' : '') + s;
    }
    // Heltal med \,-tusentalsgrupper (KaTeX-säker tunn avgränsare).
    function texInt(n) {
        var v = Math.round(n);
        var neg = v < 0; v = Math.abs(v);
        var s = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
        return (neg ? '-' : '') + s;
    }
    // ~2 gällande siffror — samma avrundningskänsla som teorins exempel
    // (0,17 / 0,33 / 0,077).
    function sigDecimals(p) {
        if (!(p > 0) || !isFinite(p)) return 2;
        var mag = Math.floor(Math.log10(p));
        return Math.max(2, -mag + 1);
    }
    function gcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { var t = b; b = a % b; a = t; }
        return a || 1;
    }

    // ── "Nice numbers"-axelskalning (Heckbert) ─────────────────────────────
    function niceNum(rangeVal, round) {
        if (!(rangeVal > 0)) return 1;
        var exponent = Math.floor(Math.log10(rangeVal));
        var fraction = rangeVal / Math.pow(10, exponent);
        var niceFraction;
        if (round) {
            if (fraction < 1.5) niceFraction = 1;
            else if (fraction < 3) niceFraction = 2;
            else if (fraction < 7) niceFraction = 5;
            else niceFraction = 10;
        } else {
            if (fraction <= 1) niceFraction = 1;
            else if (fraction <= 2) niceFraction = 2;
            else if (fraction <= 5) niceFraction = 5;
            else niceFraction = 10;
        }
        return niceFraction * Math.pow(10, exponent);
    }
    function niceTicks(minV, maxV, targetCount) {
        var range = niceNum(Math.max(maxV - minV, 1e-9), false);
        var step = niceNum(range / Math.max(1, targetCount - 1), true);
        var niceMin = Math.floor(minV / step) * step;
        var niceMax = Math.ceil(maxV / step) * step;
        var ticks = [];
        var v = niceMin, guard = 0;
        while (v <= niceMax + step * 1e-6 && guard < 200) {
            ticks.push(Math.round(v * 1e9) / 1e9);
            v += step; guard++;
        }
        return { ticks: ticks, min: niceMin, max: niceMax || step, step: step };
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

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        match: '#4a7d3a',                    // gynnsamma utfall — grön
        matchFill: 'rgba(74,125,58,0.24)',
        freq: '#2563c9',                     // relativ frekvens — blå
        target: '#c8324a'                    // klassisk sannolikhet — röd
    };

    // ── Händelser (utfallsrummet för två tärningar, 36 möjliga utfall) ────
    var EVENTS = [
        { key: 'sum7', label: 'Summan är 7', word: 'summan är 7',
          match: function (d1, d2) { return d1 + d2 === 7; } },
        { key: 'sum2', label: 'Summan är 2', word: 'summan är 2',
          match: function (d1, d2) { return d1 + d2 === 2; } },
        { key: 'six', label: 'Minst en sexa', word: 'minst en sexa',
          match: function (d1, d2) { return d1 === 6 || d2 === 6; } },
        { key: 'equal', label: 'Båda lika', word: 'båda lika',
          match: function (d1, d2) { return d1 === d2; } }
    ];
    EVENTS.forEach(function (ev) {
        var count = 0;
        for (var d1 = 1; d1 <= 6; d1++) for (var d2 = 1; d2 <= 6; d2++) if (ev.match(d1, d2)) count++;
        ev.gynnsamma = count;
        ev.p = count / 36;
        var g = gcd(count, 36);
        ev.num = count / g; ev.den = 36 / g;
        ev.reducible = ev.den !== 36;
    });
    function eventByKey(key) {
        for (var i = 0; i < EVENTS.length; i++) if (EVENTS[i].key === key) return EVENTS[i];
        return EVENTS[0];
    }

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, eventKey: 'sum7', n: 0, hits: 0, missStreak: 0 };
        var history = [];      // [{n, f}] — relativ frekvens vid kastindex n
        var recordEvery = 1;

        function currentEvent() { return eventByKey(state.eventKey); }
        function resetSim() {
            state.n = 0; state.hits = 0; state.missStreak = 0;
            history = []; recordEvery = 1;
        }
        function recordPoint(n, f) {
            history.push({ n: n, f: f });
            if (history.length > 420) {
                var kept = [];
                for (var i = 0; i < history.length; i += 2) kept.push(history[i]);
                history = kept; recordEvery *= 2;
            }
        }
        function throwDice(count) {
            var ev = currentEvent();
            for (var i = 0; i < count; i++) {
                state.n++;
                var d1 = 1 + Math.floor(Math.random() * 6);
                var d2 = 1 + Math.floor(Math.random() * 6);
                if (ev.match(d1, d2)) { state.hits++; state.missStreak = 0; }
                else { state.missStreak++; }
                if (state.n % recordEvery === 0) recordPoint(state.n, state.hits / state.n);
            }
            var lastN = history.length ? history[history.length - 1].n : -1;
            if (lastN !== state.n) recordPoint(state.n, state.hits / state.n);
            update();
        }

        // ── Geometri: utfallsrummet (steg 1) ────────────────────────────────
        var W1 = 560, H1 = 300, CELL = 34, GT = 40, GL = 200;
        var gridW = 6 * CELL, gridH = 6 * CELL;   // 204 × 204

        // ── Geometri: grafen (steg 2–3) ─────────────────────────────────────
        var W2 = 560, H2 = 344, L2 = 56, R2 = 18, T2 = 26, B2 = 52;
        var PW2 = W2 - L2 - R2, PH2 = H2 - T2 - B2;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Tärningsverkstaden';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var eventRow = document.createElement('div');
        eventRow.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:0 0 12px;';
        card.appendChild(eventRow);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W1 + ' ' + H1, width: W1, height: H1,
            'font-family': 'Poppins, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Utfallsrummet för två tärningar: ett rutnät med 36 ' +
                'kombinationer. Rutorna som stämmer med den valda händelsen är ' +
                'gröna.'
        });
        svg.classList.add('lab-graf-svg');
        scene.appendChild(svg);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene2);
        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2, width: W2, height: H2,
            'font-family': 'Poppins, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Graf över relativ frekvens mot antal kast, med den ' +
                'klassiska sannolikheten som en streckad röd linje.'
        });
        svg2.classList.add('lab-graf-svg');
        scene2.appendChild(svg2);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.match;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.freq;
        card.appendChild(formelB);

        var chipsWrap = document.createElement('div');
        chipsWrap.className = 'lab-graf-chips';
        card.appendChild(chipsWrap);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actionsStep2 = document.createElement('div');
        actionsStep2.className = 'lab-vis-actions';
        card.appendChild(actionsStep2);

        var actionsStep3 = document.createElement('div');
        actionsStep3.className = 'lab-vis-actions';
        card.appendChild(actionsStep3);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Utfallsrummet' },
            { n: 2, label: '2 · Kasta på riktigt' },
            { n: 3, label: '3 · Stora talens lag' }
        ];
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

        // ── Händelseväljare ───────────────────────────────────────────────
        var eventBtns = [];
        EVENTS.forEach(function (ev) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = ev.label;
            b.addEventListener('click', function () {
                if (state.eventKey === ev.key) return;
                state.eventKey = ev.key;
                resetSim();
                update();
            });
            eventRow.appendChild(b);
            eventBtns.push(b);
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
        var legMatch = legendItem(COL.match, 'gynnsamma utfall');
        var legFreq = legendItem(COL.freq, 'relativ frekvens');
        var legTarget = legendItem(COL.target, '<em>P</em>(händelse) — klassisk sannolikhet');
        legend.appendChild(legMatch);
        legend.appendChild(legFreq);
        legend.appendChild(legTarget);

        // ── Batch-kast (steg 2) ───────────────────────────────────────────
        [[1, '+1 kast'], [100, '+100 kast'], [10000, '+10 000 kast']].forEach(function (pair) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = pair[1];
            b.addEventListener('click', function () { throwDice(pair[0]); });
            actionsStep2.appendChild(b);
        });

        // ── Fortsätt kasta (steg 3) ───────────────────────────────────────
        var moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.className = 'lab-btn';
        moreBtn.textContent = 'Kasta 10 000 till';
        moreBtn.addEventListener('click', function () { throwDice(10000); });
        actionsStep3.appendChild(moreBtn);

        // ── Nollställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Nollställ';
        reset.addEventListener('click', function () { resetSim(); update(); });
        foot.appendChild(reset);

        // ── Rita utfallsrummet (steg 1) ──────────────────────────────────
        function drawGrid() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var ev = currentEvent();

            // Axeltitlar (hörn-caption, som i teorifiguren)
            svg.appendChild(svgVarText(
                { x: 158, y: 28, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.tick },
                ['tärning 2']));
            svg.appendChild(svgVarText(
                { x: GL + gridW / 2, y: GT + gridH + 40, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.tick },
                ['tärning 1']));

            // Rad- och kolumnhuvuden (tärningsvärden 1–6)
            var r, c;
            for (r = 1; r <= 6; r++) {
                var idx = 6 - r;
                var ymid = GT + idx * CELL + CELL / 2;
                svg.appendChild(svgVarText(
                    { x: GL - 14, y: ymid + 5, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis },
                    [String(r)]));
            }
            for (c = 1; c <= 6; c++) {
                var xmid = GL + (c - 1) * CELL + CELL / 2;
                svg.appendChild(svgVarText(
                    { x: xmid, y: GT + gridH + 18, 'font-size': 14, 'text-anchor': 'middle', fill: COL.axis },
                    [String(c)]));
            }

            // Rutorna: c = tärning 1 (kolumn), r = tärning 2 (rad)
            for (r = 1; r <= 6; r++) {
                var rowIdx = 6 - r;
                var y0 = GT + rowIdx * CELL;
                for (c = 1; c <= 6; c++) {
                    var x0 = GL + (c - 1) * CELL;
                    var matched = ev.match(c, r);
                    svg.appendChild(svgEl('rect', {
                        x: x0, y: y0, width: CELL, height: CELL,
                        fill: matched ? COL.matchFill : 'none',
                        stroke: matched ? COL.match : COL.grid,
                        'stroke-width': matched ? 1.6 : 1
                    }));
                    svg.appendChild(svgVarText(
                        {
                            x: x0 + CELL / 2, y: y0 + CELL / 2 + 5, 'font-size': 13,
                            'text-anchor': 'middle', fill: matched ? COL.axis : COL.tick
                        },
                        [String(r + c)]));
                }
            }

            // Yttre ram
            svg.appendChild(svgEl('rect', {
                x: GL, y: GT, width: gridW, height: gridH, fill: 'none',
                stroke: COL.axis, 'stroke-width': 1.6
            }));
        }

        // ── Rita grafen (steg 2–3) ────────────────────────────────────────
        var clipId = 'lab-vis-clip-dice-' + Math.random().toString(36).slice(2);
        function drawGraph() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var ev = currentEvent();
            var n = state.n, hits = state.hits;
            var freqNow = n > 0 ? hits / n : 0;

            var rawXMax = n > 0 ? n * 1.06 : 20;
            var xt = niceTicks(0, rawXMax, 6);
            var xMax = xt.max > 0 ? xt.max : 20;

            var freqPeak = freqNow;
            history.forEach(function (pt) { if (pt.f > freqPeak) freqPeak = pt.f; });
            var rawYMax = Math.max(ev.p * 1.8, freqPeak * 1.15, 0.05);
            var yt = niceTicks(0, rawYMax, 5);
            var yMax = yt.max > 0 ? yt.max : 0.1;

            function X(v) { return L2 + v / xMax * PW2; }
            function Y(v) { return T2 + (yMax - v) / yMax * PH2; }
            var axisY = Y(0), axisX = X(0);

            // Rutnät
            xt.ticks.forEach(function (v) {
                if (v <= 0) return;
                svg2.appendChild(svgEl('line', { x1: X(v), y1: T2, x2: X(v), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            });
            yt.ticks.forEach(function (v) {
                if (v <= 0) return;
                svg2.appendChild(svgEl('line', { x1: L2, y1: Y(v), x2: L2 + PW2, y2: Y(v), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // Axlar med pilspetsar
            svg2.appendChild(svgEl('line', { x1: L2, y1: axisY, x2: L2 + PW2 + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L2 + PW2 + 14) + ',' + axisY + ' ' + (L2 + PW2 + 4) + ',' + (axisY - 4.5) + ' ' + (L2 + PW2 + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX, y1: T2 + PH2, x2: axisX, y2: T2 - 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX + ',' + (T2 - 16) + ' ' + (axisX - 4.5) + ',' + (T2 - 6) + ' ' + (axisX + 4.5) + ',' + (T2 - 6), fill: COL.axis }));

            svg2.appendChild(svgVarText(
                { x: L2 + PW2, y: T2 + PH2 + 34, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis },
                ['antal kast']));
            svg2.appendChild(svgVarText(
                { x: L2 + 8, y: T2 - 4, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis },
                ['relativ frekvens']));

            // Tick-etiketter
            xt.ticks.forEach(function (v) {
                svg2.appendChild(svgVarText(
                    { x: X(v), y: T2 + PH2 + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [fmtInt(v)]));
            });
            yt.ticks.forEach(function (v) {
                if (v === yt.max) return;   // undvik krock med y-axelns caption
                svg2.appendChild(svgVarText(
                    { x: L2 - 8, y: Y(v) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [fmt(v, 3)]));
            });

            // Streckad mållinje: klassisk sannolikhet
            svg2.appendChild(svgEl('line', {
                x1: X(0), y1: Y(ev.p), x2: X(xMax), y2: Y(ev.p),
                stroke: COL.target, 'stroke-width': 1.8, 'stroke-dasharray': '7 5'
            }));
            // Fast hörn-annotering (kolliderar aldrig med kurvan — ligger nära
            // yMax, medan kurvan konvergerar mot p, klart under yMax).
            svg2.appendChild(svgVarText(
                { x: L2 + PW2 - 4, y: T2 + 14, 'font-size': 13, 'text-anchor': 'end', fill: COL.target },
                ['*P', '(', ev.word, ') ≈ ', fmt(ev.p, sigDecimals(ev.p))]));

            // Klippram + kurva (relativ frekvens)
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L2, y: T2, width: PW2, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg2.appendChild(g);

            if (history.length >= 2) {
                var d = '';
                history.forEach(function (pt, i) {
                    d += (i === 0 ? 'M' : 'L') + X(pt.n).toFixed(1) + ' ' + Y(pt.f).toFixed(1) + ' ';
                });
                g.appendChild(svgEl('path', {
                    d: d, fill: 'none', stroke: COL.freq, 'stroke-width': 2.2,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            }
            if (n > 0) {
                g.appendChild(svgEl('circle', { cx: X(n), cy: Y(freqNow), r: 4.5, fill: COL.freq }));
            }
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            var ev = currentEvent();
            var dP = sigDecimals(ev.p);
            var dPercent = Math.max(0, dP - 2);
            var tex = 'P(\\text{' + ev.word + '}) = \\dfrac{' + ev.gynnsamma + '}{36}';
            if (ev.reducible) tex += ' = \\dfrac{' + ev.num + '}{' + ev.den + '}';
            tex += ' \\approx ' + fmtTex(ev.p, dP) + ' = ' + fmtTex(ev.p * 100, dPercent) + '\\ \\%';
            katexInto(formelA, tex);

            if (state.n === 0) {
                formelB.textContent = 'Inga kast ännu — tryck på en knapp nedan för att börja.';
            } else {
                var freq = state.hits / state.n;
                var dF = sigDecimals(freq);
                katexInto(formelB,
                    '\\text{relativ frekvens} = \\dfrac{\\text{antal träffar}}{\\text{antal kast}}' +
                    ' = \\dfrac{' + texInt(state.hits) + '}{' + texInt(state.n) + '}' +
                    ' \\approx ' + fmtTex(freq, dF));
            }
        }

        function updateChips() {
            chipsWrap.innerHTML = '';
            var freq = state.n > 0 ? state.hits / state.n : NaN;
            var rows = [
                ['Antal kast', fmtInt(state.n)],
                ['Antal träffar', fmtInt(state.hits)],
                ['Relativ frekvens', state.n > 0 ? fmt(freq, sigDecimals(freq)) : '–']
            ];
            rows.forEach(function (r) {
                var c = document.createElement('span');
                c.className = 'lab-graf-chip';
                c.textContent = r[0] + ' = ' + r[1];
                chipsWrap.appendChild(c);
            });
        }

        function updateNote() {
            if (state.step !== 3) { note.innerHTML = ''; return; }
            var ev = currentEvent();
            var streak = state.missStreak;
            note.innerHTML = 'Din aktuella svit utan träff: <strong>' + fmtInt(streak) +
                (streak === 1 ? ' kast.' : ' kast.') +
                '</strong> Är en träff "skyldig" att komma nu? Nej — tärningen minns ingenting. ' +
                'Sannolikheten för nästa kast är fortfarande <em>P</em>(' + ev.word + ') ≈ ' +
                fmt(ev.p, sigDecimals(ev.p)) + '. Frekvensen stabiliseras på längden, inte genom ' +
                'att slumpen "kompenserar" en svit.';
        }

        // ── Instruktionstexter ───────────────────────────────────────────
        function updateInstr() {
            var ev = currentEvent();
            if (state.step === 1) {
                instr.innerHTML = 'Gissa först: är summan 7 lika vanlig som summan 2? Varje ruta i ' +
                    'rutnätet nedan är en av 36 lika sannolika kombinationer av två tärningar. Välj en ' +
                    'händelse — de gynnsamma rutorna markeras gröna, och formeln räknar ut den ' +
                    'klassiska sannolikheten.';
            } else if (state.step === 2) {
                instr.innerHTML = 'Nu kastar vi <em>' + ev.word + '</em> på riktigt (simulerat slumpmässigt). ' +
                    'Tryck på en knapp för att slå tärningarna — kurvan visar hur den relativa frekvensen ' +
                    'rör sig, och den röda hörn-etiketten är den klassiska sannolikheten från steg 1.';
            } else {
                instr.innerHTML = 'Stora talens lag: ju fler kast, desto närmare den klassiska ' +
                    'sannolikheten hamnar den relativa frekvensen — inte för att slumpen "kompenserar" en ' +
                    'sned svit, utan för att varje enskilt kast väger allt mindre av helheten ju fler de blir. ' +
                    'Kasta tusentals gånger till och se kurvan plana ut.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            eventBtns.forEach(function (b, i) { b.classList.toggle('active', EVENTS[i].key === state.eventKey); });

            updateInstr();

            scene.style.display = state.step === 1 ? '' : 'none';
            scene2.style.display = state.step >= 2 ? '' : 'none';

            legMatch.style.display = state.step === 1 ? '' : 'none';
            legFreq.style.display = state.step >= 2 ? '' : 'none';
            legTarget.style.display = state.step >= 2 ? '' : 'none';

            formelA.style.display = state.step === 1 ? '' : 'none';
            formelB.style.display = state.step >= 2 ? '' : 'none';
            chipsWrap.style.display = state.step >= 2 ? '' : 'none';
            note.style.display = state.step === 3 ? '' : 'none';
            actionsStep2.style.display = state.step === 2 ? '' : 'none';
            actionsStep3.style.display = state.step === 3 ? '' : 'none';

            if (state.step === 1) drawGrid();
            if (state.step >= 2) drawGraph();
            updateFormulas();
            updateChips();
            updateNote();
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-5.4'] = api;
    window.VISUALISERINGAR['ma1c-5.5'] = api;
})();
