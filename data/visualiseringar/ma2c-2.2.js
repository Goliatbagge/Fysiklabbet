/* ma2c-2.2.js — visualisering: "Faktorisering som areapussel".
 *
 * Kärninsikt: att faktorisera x² + bx + c är att hitta SIDLÄNGDERNA till en
 * rektangel med den arean. Bitarna (en x²-kvadrat, x-remsor, enhetsrutor)
 * pusslas till en perfekt rektangel — sidorna ÄR faktorerna. Nollprodukten
 * (x + m)(x + n) = 0 är sedan bara: arean är 0 precis när en sida är 0.
 *
 * Hör till ma1c-2.4 (bryta ut gemensam faktor — grundmetoden denna bygger
 * vidare på), ma2c-2.2 (faktorisering av uttryck) och ma2c-2.3
 * (nollproduktmetoden). Beteckningar speglar genomgångarna: "faktorisera",
 * "rot", nollproduktmetodens teckenbyte-konvention (rot x = −5 ⟹ faktor
 * (x + 5), se ma2c-2.3 Exempel 2).
 *
 * Fyra steg:
 *   1. Uttrycket som bitar   — välj uttryck; 1 kvadrat + b remsor + c rutor
 *                              visas utspridda (ej ihopsatta).
 *   2. Pussla rektangeln     — "Pussla ihop" animerar bitarna till en
 *                              rektangel; sidorna måttsätts = faktorerna.
 *   3. Talparet               — pröva olika talpar (delare till c); rätt par
 *                              (produkt c, summa b) ger en hel rektangel,
 *                              fel par ger synliga glapp eller överskott.
 *   4. Nollprodukten          — (x+m)(x+n) som två signerade sidmått på en
 *                              tallinje; en x-glidare visar hur en sida
 *                              krymper till 0 exakt vid roten. Negativa
 *                              sidlängder ritas ALDRIG som bokstavlig
 *                              geometri (ett minus-brett rektangel-tile är
 *                              meningslöst) — i stället ritas varje faktor
 *                              som ett signerat tallinjemått (stapel som kan
 *                              peka åt vänster om noll), på SAMMA pixelskala
 *                              som tallinjen ovanför, så stapelns fasta
 *                              ände sitter exakt vid roten.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3
 * och ma2c-2.1). API: window.VISUALISERINGAR['ma1c-2.4' / 'ma2c-2.2' /
 * 'ma2c-2.3'] = { mount }.
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
    function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

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
        sq: '#2563c9',              // x² — blå
        sqFill: 'rgba(37,99,201,0.24)',
        strip: '#3f8f5c',           // x-remsa — grön
        stripFill: 'rgba(63,143,92,0.26)',
        unit: '#b9821f',            // enhetsruta — guld
        unitFill: 'rgba(185,130,31,0.28)',
        wrong: '#c8324a',
        wrongFill: 'rgba(200,50,74,0.10)',
        ghostFill: 'rgba(200,50,74,0.05)',
        f1: '#3f8f5c',              // (x+m) — grön (minsta faktorn)
        f2: '#b1552c',              // (x+n) — brunorange (största faktorn)
        pos: '#2563c9',
        neg: '#c8324a'
    };

    // ── Uttryck (talparen speglar ma2c-2.4 Exempel 1b: x²−5x+6=(x−2)(x−3);
    // här med positiva termer så bitarna kan pusslas med positiva mått,
    // samma princip som nollproduktmetodens teckenbyte i ma2c-2.3) ────────
    // m = minsta faktorn (vänster/höjd-tillägg), n = största (höger/bredd-
    // tillägg): b = m+n, c = m·n. Rektangelns sidor blir (x+n) nertill och
    // (x+m) till vänster.
    var EXPRS = [
        { b: 5, c: 6, m: 2, n: 3 },   // x² + 5x + 6 = (x+2)(x+3)
        { b: 4, c: 3, m: 1, n: 3 },   // x² + 4x + 3 = (x+1)(x+3)
        { b: 7, c: 12, m: 3, n: 4 }   // x² + 7x + 12 = (x+3)(x+4)
    ];

    function divisorPairs(c) {
        var pairs = [];
        for (var d = 1; d * d <= c; d++) {
            if (c % d === 0) pairs.push({ m: d, n: c / d });
        }
        return pairs;
    }

    // ── Geometri för bit-scenen (steg 1–3) ────────────────────────────────
    var UNIT = 30;     // px per enhet
    var XLEN = 3.2;    // symbolisk längd av x, i enheter (medvetet "ojämn")
    var XW = XLEN * UNIT;
    var X0 = 76, Y0 = 46;
    var STAGING_Y = 176;

    function stagingStripCenter(idx) {
        var perRow = 4, cellW = XW + 10, rowH = 40;
        var col = idx % perRow, row = Math.floor(idx / perRow);
        return { x: X0 + XW / 2 + col * cellW, y: STAGING_Y + row * rowH + UNIT / 2 };
    }
    function stagingUnitCenter(idx, available) {
        var perRow = 6, cellW = UNIT + 7, rowH = UNIT + 7;
        var stripRows = Math.ceil(available / 4);
        var baseY = STAGING_Y + stripRows * 40 + 18;
        var col = idx % perRow, row = Math.floor(idx / perRow);
        return { x: X0 + UNIT / 2 + col * cellW, y: baseY + row * rowH + UNIT / 2 };
    }

    // Bygger tile-layouten för ett givet uttryck + ett försökt talpar.
    // pair = {m,n} (m<=n), available = expr.b (fysiska remsor som finns).
    function tilePositions(expr, pair, available) {
        var n = pair.n, m = pair.m;
        var targetSum = n + m;
        var rightSlots = n, bottomSlots = m;
        var rightFilled = Math.min(rightSlots, available);
        var bottomFilled = Math.min(bottomSlots, Math.max(0, available - rightFilled));
        var missing = Math.max(0, targetSum - available);
        var leftover = Math.max(0, available - targetSum);

        var strips = [];
        for (var i = 0; i < available; i++) {
            var st = stagingStripCenter(i);
            var tile = { sx: st.x, sy: st.y, srot: 0, w: XW, h: UNIT };
            if (i < rightFilled) {
                tile.ex = X0 + XW + i * UNIT + UNIT / 2;
                tile.ey = Y0 + XW / 2;
                tile.erot = 90;
                tile.group = 'right';
            } else if (i < rightFilled + bottomFilled) {
                var j = i - rightFilled;
                tile.ex = X0 + XW / 2;
                tile.ey = Y0 + XW + j * UNIT + UNIT / 2;
                tile.erot = 0;
                tile.group = 'bottom';
            } else {
                tile.ex = st.x; tile.ey = st.y; tile.erot = 0;
                tile.group = 'leftover';
            }
            strips.push(tile);
        }

        var ghosts = [];
        for (var gi = rightFilled; gi < rightSlots; gi++) {
            ghosts.push({ x: X0 + XW + gi * UNIT, y: Y0, w: UNIT, h: XW });
        }
        for (var gj = bottomFilled; gj < bottomSlots; gj++) {
            ghosts.push({ x: X0, y: Y0 + XW + gj * UNIT, w: XW, h: UNIT });
        }

        var cCount = m * n;
        var units = [];
        for (var u = 0; u < cCount; u++) {
            var col2 = u % n, row2 = Math.floor(u / n);
            var stu = stagingUnitCenter(u, available);
            units.push({
                sx: stu.x, sy: stu.y,
                ex: X0 + XW + col2 * UNIT + UNIT / 2, ey: Y0 + XW + row2 * UNIT + UNIT / 2,
                w: UNIT, h: UNIT
            });
        }

        return {
            rectW: XW + n * UNIT, rectH: XW + m * UNIT,
            strips: strips, units: units, ghosts: ghosts,
            leftover: leftover, missing: missing, n: n, m: m
        };
    }

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var state = {
            exprIdx: 0, step: 1,
            moveT2: 0,                 // steg 2: animation mot korrekt talpar
            pair3: null, moveT3: 0,    // steg 3: valt talpar + animation
            xVal: 1                    // steg 4: x-glidarens värde
        };
        var animId = null;
        var X4MIN = -5.5, X4MAX = 2.5;

        function expr() { return EXPRS[state.exprIdx]; }

        // ── DOM-skelett ─────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Faktorisering som areapussel';
        card.appendChild(title);

        var exprRow = document.createElement('div');
        exprRow.className = 'lab-vis-actions';
        exprRow.style.marginTop = '0';
        card.appendChild(exprRow);

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
            viewBox: '0 0 560 372',
            width: 560, height: 372,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv figur: ett andragradsuttryck uppdelat i en ' +
                'x-kvadrat, x-remsor och enhetsrutor som pusslas till en rektangel ' +
                'vars sidor är faktorerna.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '4px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 560 280',
            width: 560, height: 280,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Tallinje med en draggbar punkt x. Två staplar visar ' +
                'faktorernas värden (x+m) och (x+n) — de krymper till noll exakt ' +
                'vid rötterna.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

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

        var pairRow = document.createElement('div');
        pairRow.className = 'lab-vis-actions';
        card.appendChild(pairRow);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Uttrycksväljare ─────────────────────────────────────────────
        var exprBtns = [];
        EXPRS.forEach(function (e, idx) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.innerHTML = '<em>x</em><sup style="margin-right:2px">2</sup>+ ' + e.b + '<em>x</em> + ' + e.c;
            b.addEventListener('click', function () {
                if (state.exprIdx === idx) return;
                stopAnim();
                state.exprIdx = idx;
                state.moveT2 = 0; state.pair3 = null; state.moveT3 = 0;
                update();
            });
            exprRow.appendChild(b);
            exprBtns.push(b);
        });

        // ── Steg-knappar ────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Uttrycket som bitar' },
            { n: 2, label: '2 · Pussla rektangeln' },
            { n: 3, label: '3 · Talparet' },
            { n: 4, label: '4 · Nollprodukten' }
        ];
        var INSTR = {
            1: 'Ett andragradsuttryck kan delas upp i bitar: en <em>x</em>²-kvadrat, ' +
               '<em>x</em>-remsor och enhetsrutor. Välj ett uttryck ovan — bitarna ' +
               'motsvarar exakt termerna.',
            2: 'Att faktorisera är att hitta <em>sidlängderna</em> till en rektangel med ' +
               'samma area. Tryck på "Pussla ihop" och se bitarna glida på plats.',
            3: 'Konstanttermen kan delas upp i talpar (faktorer som multiplicerade ' +
               'ger termen). Pröva ett par nedan — bara paret vars <em>summa</em> stämmer med ' +
               '<em>x</em>-termens koefficient ger en hel rektangel utan glapp.',
            4: 'Rektangelns sidor är (<em>x</em>+<em>m</em>) och (<em>x</em>+<em>n</em>). ' +
               'Dra i punkten på tallinjen — vid roten krymper en sida till noll, och ' +
               'då är hela arean (produkten) noll. Det är nollproduktmetoden!'
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
            if (state.step <= 3) {
                legend.appendChild(legendItem(COL.sq, '<em>x</em>² (kvadrat)'));
                legend.appendChild(legendItem(COL.strip, '<em>x</em> (remsa)'));
                legend.appendChild(legendItem(COL.unit, '1 (enhetsruta)'));
                if (state.step === 3) legend.appendChild(legendItem(COL.wrong, 'glapp/överskott', true));
            } else {
                var m = expr().m, n = expr().n;
                legend.appendChild(legendItem(COL.f1, '(<em>x</em>+' + m + ')'));
                legend.appendChild(legendItem(COL.f2, '(<em>x</em>+' + n + ')'));
                legend.appendChild(legendItem(COL.pos, 'produkt ≥ 0'));
                legend.appendChild(legendItem(COL.neg, 'produkt < 0', true));
            }
        }

        // ── Steg 2: "Pussla ihop"-knapp ───────────────────────────────────
        var assembleBtn = document.createElement('button');
        assembleBtn.type = 'button';
        assembleBtn.className = 'lab-btn';
        assembleBtn.addEventListener('click', function () {
            var to = state.moveT2 >= 0.999 ? 0 : 1;
            animateValue(function () { return state.moveT2; }, function (v) { state.moveT2 = v; }, to, 900);
        });
        actions.appendChild(assembleBtn);

        // ── Steg 4: hoppa-till-rot-knappar ─────────────────────────────
        var jumpM = document.createElement('button');
        jumpM.type = 'button';
        jumpM.className = 'lab-btn';
        jumpM.addEventListener('click', function () {
            animateValue(function () { return state.xVal; }, function (v) { state.xVal = v; }, -expr().m, 700);
        });
        actions.appendChild(jumpM);

        var jumpN = document.createElement('button');
        jumpN.type = 'button';
        jumpN.className = 'lab-btn';
        jumpN.addEventListener('click', function () {
            animateValue(function () { return state.xVal; }, function (v) { state.xVal = v; }, -expr().n, 700);
        });
        actions.appendChild(jumpN);

        // ── Steg 3: talpar-knappar (byggs om per uttryck) ────────────────
        function buildPairRow() {
            pairRow.innerHTML = '';
            var c = expr().c, b = expr().b;
            var pairs = divisorPairs(c);
            pairs.forEach(function (p) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'lab-btn';
                btn.textContent = p.m + ' ⋅ ' + p.n + '  (summa ' + (p.m + p.n) + ')';
                btn.addEventListener('click', function () {
                    state.pair3 = { m: p.m, n: p.n };
                    state.moveT3 = 0;
                    animateValue(function () { return state.moveT3; }, function (v) { state.moveT3 = v; }, 1, 900,
                        function () { paintPairButtons(); });
                    paintPairButtons();
                });
                pairRow.appendChild(btn);
            });
        }
        function paintPairButtons() {
            var btns = pairRow.querySelectorAll('button');
            var c = expr().c, b = expr().b;
            var pairs = divisorPairs(c);
            btns.forEach(function (btn, i) {
                var p = pairs[i];
                var isChosen = state.pair3 && state.pair3.m === p.m && state.pair3.n === p.n;
                if (!isChosen) {
                    btn.style.borderColor = ''; btn.style.color = ''; btn.style.background = '';
                    return;
                }
                var correct = (p.m + p.n) === b;
                btn.style.borderColor = correct ? COL.strip : COL.wrong;
                btn.style.color = correct ? COL.strip : COL.wrong;
                btn.style.background = correct ? COL.stripFill : COL.wrongFill;
            });
        }

        // ── Glidare (x, steg 4) ────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.ink + ' 0%, ' +
                    COL.ink + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(v, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), 2).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { field.value = fmt(get(), 2).replace(',', '.'); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () { slider.value = get(); field.value = fmt(get(), 2).replace(',', '.'); paint(); }
            };
        }
        var rowX = makeRow('x', -5, 2, 0.05,
            function () { return state.xVal; },
            function (v) { state.xVal = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.exprIdx = 0; state.step = 1;
            state.moveT2 = 0; state.pair3 = null; state.moveT3 = 0; state.xVal = 1;
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animationshjälpare ────────────────────────────────────────────
        function stopAnim() { if (animId != null) { cancelAnimationFrame(animId); animId = null; } }
        function animateValue(getCur, setCur, to, duration, onDone) {
            stopAnim();
            var from = getCur(), t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / duration, 0, 1);
                var e = easeInOutCubic(p);
                setCur(from + (to - from) * e);
                rowX.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; setCur(to); rowX.sync(); update(); if (onDone) onDone(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Rita en tile-rektangel (roterbar grupp) ────────────────────
        function drawTile(g, tile, moveT, fill, stroke, labelParts, fontSize) {
            var e = easeInOutCubic(moveT);
            var cx = tile.sx + (tile.ex - tile.sx) * e;
            var cy = tile.sy + (tile.ey - tile.sy) * e;
            var rot = tile.srot + (tile.erot - tile.srot) * e;
            var gg = svgEl('g', { transform: 'translate(' + cx.toFixed(2) + ',' + cy.toFixed(2) + ') rotate(' + rot.toFixed(2) + ')' });
            gg.appendChild(svgEl('rect', {
                x: (-tile.w / 2).toFixed(2), y: (-tile.h / 2).toFixed(2), width: tile.w, height: tile.h,
                fill: fill, stroke: stroke, 'stroke-width': 1
            }));
            if (labelParts) {
                var tg = svgEl('g', { transform: 'rotate(' + (-rot).toFixed(2) + ')' });
                tg.appendChild(svgVarText({ x: 0, y: 4.5, 'font-size': fontSize || 12, 'text-anchor': 'middle', fill: COL.ink }, labelParts));
                gg.appendChild(tg);
            }
            g.appendChild(gg);
        }

        // ── Måttlinjer (bottom/vänster) ──────────────────────────────────
        function dimSegH(parent, x1, x2, y, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', { points: x1 + ',' + y + ' ' + (x1 + asz) + ',' + (y - asz * 0.6) + ' ' + (x1 + asz) + ',' + (y + asz * 0.6), fill: COL.ink }));
            parent.appendChild(svgEl('polygon', { points: x2 + ',' + y + ' ' + (x2 - asz) + ',' + (y - asz * 0.6) + ' ' + (x2 - asz) + ',' + (y + asz * 0.6), fill: COL.ink }));
            parent.appendChild(svgVarText({ x: (x1 + x2) / 2, y: y + 17, 'font-size': 14, 'text-anchor': 'middle', fill: COL.ink }, parts));
        }
        function dimSegV(parent, y1, y2, x, parts) {
            var asz = 5;
            parent.appendChild(svgEl('line', { x1: x, y1: y1, x2: x, y2: y2, stroke: COL.ink, 'stroke-width': 1.4 }));
            parent.appendChild(svgEl('polygon', { points: x + ',' + y1 + ' ' + (x - asz * 0.6) + ',' + (y1 + asz) + ' ' + (x + asz * 0.6) + ',' + (y1 + asz), fill: COL.ink }));
            parent.appendChild(svgEl('polygon', { points: x + ',' + y2 + ' ' + (x - asz * 0.6) + ',' + (y2 - asz) + ' ' + (x + asz * 0.6) + ',' + (y2 - asz), fill: COL.ink }));
            parent.appendChild(svgVarText({ x: x - 9, y: (y1 + y2) / 2 + 4, 'font-size': 14, 'text-anchor': 'end', fill: COL.ink }, parts));
        }

        // ── Rita bit-scenen (steg 1–3) ────────────────────────────────────
        function drawTileScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var e = expr();
            var pair, moveT, showGaps;
            if (state.step === 1) { pair = { m: e.m, n: e.n }; moveT = 0; showGaps = false; }
            else if (state.step === 2) { pair = { m: e.m, n: e.n }; moveT = state.moveT2; showGaps = false; }
            else {
                if (state.pair3) { pair = state.pair3; moveT = state.moveT3; showGaps = true; }
                else { pair = { m: e.m, n: e.n }; moveT = 0; showGaps = false; }
            }
            var layout = tilePositions(e, pair, e.b);
            var g = svgEl('g');
            svg.appendChild(g);

            // x²-kvadraten (fast förankrad i hörnet, flyttas aldrig)
            g.appendChild(svgEl('rect', { x: X0, y: Y0, width: XW, height: XW, fill: COL.sqFill, stroke: COL.sq, 'stroke-width': 1.4 }));
            g.appendChild(svgVarText({ x: X0 + XW / 2, y: Y0 + XW / 2 + 6, 'font-size': 19, 'text-anchor': 'middle', fill: COL.sq }, ['*x', '²']));

            // Remsor (höger = lodräta, under = vågräta; vid steg 3 med fel
            // talpar kan vissa hamna som "leftover" — ritas kvar i
            // uppläggningszonen med röd kantlinje)
            layout.strips.forEach(function (t) {
                var isLeftover = (moveT >= 0.98 && t.group === 'leftover');
                drawTile(g, t, moveT,
                    isLeftover ? COL.wrongFill : COL.stripFill,
                    isLeftover ? COL.wrong : COL.strip,
                    ['*x'], 12);
            });

            // Enhetsrutor
            layout.units.forEach(function (t) {
                var tile = { sx: t.sx, sy: t.sy, srot: 0, ex: t.ex, ey: t.ey, erot: 0, w: t.w, h: t.h };
                drawTile(g, tile, moveT, COL.unitFill, COL.unit, ['1'], 11);
            });

            // Glapp (saknade remsplatser) — bara synliga när showGaps och
            // rektangeln är (försökt) ihoppusslad
            if (showGaps && moveT >= 0.5) {
                var op = clampNum((moveT - 0.5) / 0.5, 0, 1);
                layout.ghosts.forEach(function (gh) {
                    g.appendChild(svgEl('rect', {
                        x: gh.x, y: gh.y, width: gh.w, height: gh.h,
                        fill: COL.ghostFill, stroke: COL.wrong, 'stroke-width': 1.4,
                        'stroke-dasharray': '5 4', opacity: op.toFixed(2)
                    }));
                });
            }

            // Yttre rektangelkontur + måttlinjer när ihoppusslad
            if (moveT >= 0.999) {
                var ok = layout.missing === 0 && layout.leftover === 0;
                g.appendChild(svgEl('rect', {
                    x: X0, y: Y0, width: layout.rectW, height: layout.rectH,
                    fill: 'none', stroke: ok ? COL.ink : COL.wrong, 'stroke-width': 2.2,
                    'stroke-dasharray': ok ? 'none' : '7 5'
                }));
                dimSegH(svg, X0, X0 + layout.rectW, Y0 + layout.rectH + 20, ['*x', '+' + layout.n]);
                dimSegV(svg, Y0, Y0 + layout.rectH, X0 - 18, ['*x', '+' + layout.m]);
            }
        }

        // ── Rita tallinje-scenen (steg 4) ─────────────────────────────────
        var W2 = 560, L2 = 44, R2 = 20, PW2 = W2 - L2 - R2;
        function X4(x) { return L2 + (x - X4MIN) / (X4MAX - X4MIN) * PW2; }
        function drawZeroScene() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var e = expr(), m = e.m, n = e.n;
            var x = state.xVal;
            var yLine = 46, yTicks = yLine + 15;

            // Tallinje
            svg2.appendChild(svgEl('line', { x1: L2 - 6, y1: yLine, x2: L2 + PW2 + 10, y2: yLine, stroke: COL.ink, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', {
                points: (L2 + PW2 + 18) + ',' + yLine + ' ' + (L2 + PW2 + 8) + ',' + (yLine - 4.5) + ' ' + (L2 + PW2 + 8) + ',' + (yLine + 4.5),
                fill: COL.ink
            }));
            svg2.appendChild(svgVarText({ x: L2 + PW2 + 30, y: yLine + 5, 'font-size': 14.5, 'text-anchor': 'middle', fill: COL.ink }, ['*x']));

            for (var i = -5; i <= 2; i++) {
                svg2.appendChild(svgEl('line', { x1: X4(i), y1: yLine - 4, x2: X4(i), y2: yLine + 4, stroke: COL.ink, 'stroke-width': 1.2 }));
                svg2.appendChild(svgVarText({ x: X4(i), y: yTicks + 9, 'font-size': 11, 'text-anchor': 'middle', fill: COL.inkSoft }, [String(i)]));
            }

            // Rotmarkeringar
            [{ v: -m, c: COL.f1 }, { v: -n, c: COL.f2 }].forEach(function (r) {
                svg2.appendChild(svgEl('circle', { cx: X4(r.v), cy: yLine, r: 5, fill: '#fff', stroke: r.c, 'stroke-width': 2 }));
                svg2.appendChild(svgVarText({ x: X4(r.v), y: yLine - 12, 'font-size': 11.5, 'text-anchor': 'middle', fill: r.c }, ['*x', '=' + fmtDisp(r.v, 0)]));
            });

            // Draggbar punkt
            var handleY = yLine;
            var hit = svgEl('circle', { cx: X4(x), cy: handleY, r: 15, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (ev) {
                stopAnim(); dragging = true;
                try { svg2.setPointerCapture(ev.pointerId); } catch (err) {}
                ev.preventDefault();
            });
            svg2.appendChild(svgEl('line', { x1: X4(x), y1: yLine, x2: X4(x), y2: 205, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '3 3' }));
            svg2.appendChild(svgEl('circle', { cx: X4(x), cy: handleY, r: 5.5, fill: COL.ink }));
            svg2.appendChild(hit);

            // Faktor-staplar (signerat mått på samma pixelskala som tallinjen)
            function bar(rowY, rootV, color, labelParts) {
                var x0 = X4(rootV), x1 = X4(x);
                var val = x - rootV;
                var lo = Math.min(x0, x1), w = Math.abs(x1 - x0);
                var collapsed = Math.abs(val) < 0.03;
                svg2.appendChild(svgEl('line', { x1: L2 - 6, y1: rowY, x2: L2 + PW2 + 10, y2: rowY, stroke: COL.track, 'stroke-width': 1 }));
                if (!collapsed) {
                    svg2.appendChild(svgEl('rect', {
                        x: lo, y: rowY - 6, width: Math.max(w, 1.5), height: 12,
                        fill: color, opacity: 0.72
                    }));
                }
                svg2.appendChild(svgEl('circle', { cx: x0, cy: rowY, r: 4, fill: color }));
                svg2.appendChild(svgEl('circle', { cx: x1, cy: rowY, r: collapsed ? 5.5 : 4, fill: collapsed ? COL.wrong : color }));
                svg2.appendChild(svgVarText({ x: L2 - 6, y: rowY - 12, 'font-size': 12.5, 'text-anchor': 'start', fill: color }, labelParts));
                svg2.appendChild(svgVarText(
                    { x: L2 + PW2 + 10, y: rowY + 4.5, 'font-size': 12.5, 'text-anchor': 'end', fill: collapsed ? COL.wrong : color },
                    ['*x', '+' + rootFmt(rootV) + ' = ' + fmtDisp(val, 2)]));
            }
            function rootFmt(rootV) {
                // rootV = -m eller -n → visas som "+m"/"+n" i "x+m"-etiketten
                return String(-rootV);
            }
            bar(100, -m, COL.f1, ['*x', '+' + m]);
            bar(140, -n, COL.f2, ['*x', '+' + n]);

            // Produktmätare (signerad, egen nollreferens i mitten)
            var gy = 195, gx0 = X0 + 30; // återanvänd X0 som horisontell ankare
            var prod = (x + m) * (x + n);
            var scale = 5.2;
            var pw = clampNum(Math.abs(prod) * scale, 0, 170);
            var neg = prod < 0;
            svg2.appendChild(svgEl('line', { x1: 60, y1: gy, x2: 500, y2: gy, stroke: COL.track, 'stroke-width': 1 }));
            svg2.appendChild(svgEl('line', { x1: gx0, y1: gy - 12, x2: gx0, y2: gy + 12, stroke: COL.ink, 'stroke-width': 1.4 }));
            if (Math.abs(prod) >= 0.03) {
                svg2.appendChild(svgEl('rect', {
                    x: neg ? gx0 - pw : gx0, y: gy - 9, width: Math.max(pw, 1.5), height: 18,
                    fill: neg ? COL.neg : COL.pos, opacity: 0.75
                }));
            }
            svg2.appendChild(svgVarText({ x: gx0, y: gy - 20, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.inkSoft }, ['produkt (', '*x', '+' + m, ')(', '*x', '+' + n, ')']));
            svg2.appendChild(svgVarText(
                { x: gx0, y: gy + 32, 'font-size': 13, 'text-anchor': 'middle', fill: Math.abs(prod) < 0.03 ? COL.wrong : (neg ? COL.neg : COL.pos) },
                ['= ' + fmtDisp(prod, 2)]));
        }

        var dragging = false;
        function toWorldX4(clientX) {
            var r = svg2.getBoundingClientRect();
            var px = (clientX - r.left) * W2 / r.width;
            return X4MIN + (px - L2) / PW2 * (X4MAX - X4MIN);
        }
        svg2.addEventListener('pointermove', function (ev) {
            if (!dragging) return;
            var xv = clampNum(Math.round(toWorldX4(ev.clientX) / 0.05) * 0.05, -5, 2);
            state.xVal = xv;
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg2.addEventListener('pointerup', endDrag);
        svg2.addEventListener('pointercancel', endDrag);

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var e = expr(), b = e.b, c = e.c, m = e.m, n = e.n;
            if (state.step === 1) {
                formelA.style.display = ''; formelB.style.display = 'none'; note.style.display = 'none';
                katexInto(formelA,
                    '\\textcolor{' + COL.sq + '}{x^2} + \\textcolor{' + COL.strip + '}{' + b + 'x} + \\textcolor{' + COL.unit + '}{' + c + '}');
            } else if (state.step === 2) {
                formelA.style.display = ''; formelB.style.display = 'none'; note.style.display = '';
                katexInto(formelA,
                    '\\textcolor{' + COL.sq + '}{x^2} + \\textcolor{' + COL.strip + '}{' + b + 'x} + \\textcolor{' + COL.unit + '}{' + c + '} = (x+' + n + ')(x+' + m + ')');
                note.innerHTML = state.moveT2 >= 0.999
                    ? 'Remsorna delas i <span style="white-space:nowrap">' + n + ' (höger, lodräta)</span> och ' +
                      '<span style="white-space:nowrap">' + m + ' (nedre, vågräta)</span> — talparet med ' +
                      '<span style="white-space:nowrap">produkt ' + c + '</span> och <span style="white-space:nowrap">summa ' + b + '</span>.'
                    : 'Tryck på "Pussla ihop" för att se rektangeln växa fram.';
            } else if (state.step === 3) {
                formelA.style.display = ''; formelB.style.display = ''; note.style.display = '';
                katexInto(formelA, '(x+' + n + ')(x+' + m + ') = x^2 + ' + b + 'x + ' + c);
                if (state.pair3) {
                    var pm = state.pair3.m, pn = state.pair3.n, psum = pm + pn;
                    katexInto(formelB, '(x+' + pn + ')(x+' + pm + ') = x^2 + ' + psum + 'x + ' + c);
                    if (psum === b) {
                        note.innerHTML = 'Talparet <span style="white-space:nowrap">' + pm + ' och ' + pn +
                            '</span> ger <span style="white-space:nowrap">summa ' + psum + '</span> — precis rätt! Rektangeln blir hel.';
                    } else if (psum > b) {
                        var missing = psum - b;
                        note.innerHTML = 'Talparet ger <span style="white-space:nowrap">summa ' + psum +
                            '</span>, men uttrycket har bara <span style="white-space:nowrap">' + b + ' remsor</span> — ' +
                            missing + (missing === 1 ? ' ruta saknas' : ' rutor saknas') + ' (glappen är streckade).';
                    } else {
                        var over = b - psum;
                        note.innerHTML = 'Talparet ger <span style="white-space:nowrap">summa ' + psum +
                            '</span>, men uttrycket har <span style="white-space:nowrap">' + b + ' remsor</span> — ' +
                            over + (over === 1 ? ' remsa blir över' : ' remsor blir över') + ' och får inte plats.';
                    }
                } else {
                    formelB.style.display = 'none';
                    note.textContent = 'Välj ett talpar nedan och se om det bildar en hel rektangel utan glapp.';
                }
            } else {
                formelA.style.display = ''; formelB.style.display = ''; note.style.display = '';
                katexInto(formelA, '(x+' + m + ')(x+' + n + ') = 0 \\iff x = ' + (-m) + ' \\ \\text{eller} \\ x = ' + (-n));
                var x = state.xVal;
                var prod = (x + m) * (x + n);
                katexInto(formelB,
                    '(' + fmtTex(x + m, 2) + ')(' + fmtTex(x + n, 2) + ') = ' + fmtTex(prod, 2));
                if (Math.abs(x + m) < 0.03) {
                    note.innerHTML = 'Nu är sidan <span style="white-space:nowrap">(<em>x</em>+' + m + ') = 0</span> — arean (produkten) är noll!';
                } else if (Math.abs(x + n) < 0.03) {
                    note.innerHTML = 'Nu är sidan <span style="white-space:nowrap">(<em>x</em>+' + n + ') = 0</span> — arean (produkten) är noll!';
                } else {
                    note.textContent = 'Dra punkten mot en av rötterna och se sidan krympa mot noll.';
                }
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            exprBtns.forEach(function (b, i) { b.classList.toggle('lab-btn-primary', state.exprIdx === i); });
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            buildLegend();

            scene.style.display = state.step <= 3 ? '' : 'none';
            scene2.style.display = state.step === 4 ? '' : 'none';
            actions.style.display = (state.step === 2 || state.step === 4) ? '' : 'none';
            assembleBtn.style.display = state.step === 2 ? '' : 'none';
            jumpM.style.display = state.step === 4 ? '' : 'none';
            jumpN.style.display = state.step === 4 ? '' : 'none';
            pairRow.style.display = state.step === 3 ? '' : 'none';
            controls.style.display = state.step === 4 ? '' : 'none';

            if (state.step === 2) assembleBtn.textContent = state.moveT2 >= 0.999 ? 'Plocka isär' : 'Pussla ihop';
            if (state.step === 4) {
                jumpM.textContent = 'Hoppa till x = ' + fmtDisp(-expr().m, 0);
                jumpN.textContent = 'Hoppa till x = ' + fmtDisp(-expr().n, 0);
            }
            if (state.step === 3) buildPairRow();

            if (state.step <= 3) drawTileScene();
            else drawZeroScene();
            updateFormulas();
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
    window.VISUALISERINGAR['ma1c-2.4'] = api;
    window.VISUALISERINGAR['ma2c-2.2'] = api;
    window.VISUALISERINGAR['ma2c-2.3'] = api;
})();
