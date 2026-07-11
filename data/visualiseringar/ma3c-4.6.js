/* ma3c-4.6.js — visualisering: "Extremvärdesfabriken — lådan" (extremvärdes-
 * problem löst med derivata). Hör till ma3c-4.6 (extremvärdesproblem),
 * ma3c-4.7 (samma sorts problem grafiskt) och ma4-2.9 (repetition).
 *
 * Scenario: ett kvadratiskt kartongark, 24 × 24 cm. I varje hörn klipps en
 * kvadrat med sidan x bort, och de fyra flikarna viks upp till en låda utan
 * lock. Basen blir (24 − 2x) × (24 − 2x) och höjden x, så
 *
 *   V(x) = x(24 − 2x)²,   0 < x < 12.
 *
 * Kärninsikten: eleven bygger upp grafen över V(x) själv genom att prova
 * olika x — mätpunkterna prickas in innan derivatan ens nämns. Först i sista
 * steget kopplas toppen till att derivatan är noll.
 *
 * Tre steg (lager):
 *   1. Bygg lådan     — dra hörnet (eller x-glidaren); lådan (och dess volym)
 *                        uppdateras live. Gissa-först: litet / mellan / stort x?
 *   2. Dina mätpunkter — varje besökt x prickas in i ett (x, V)-koordinat-
 *                        system. "Rita hela kurvan" låses upp efter ~5 punkter.
 *   3. Derivatan pekar ut toppen — V(x) deriveras, V'(x) = 0 löses (x = 4),
 *                        tangenten på kurvan blir vågrät i toppen. Facit och
 *                        gissningen kvitteras.
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
    function polyPts(pts) {
        var s = '';
        for (var i = 0; i < pts.length; i++) s += pts[i].x.toFixed(1) + ',' + pts[i].y.toFixed(1) + ' ';
        return s.trim();
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // V(x) — blå
        secant: '#4a7d3a',     // mätpunkter — grön
        tangent: '#c8324a',    // tangent/derivata — accentröd
        cutFill: 'rgba(31,37,48,0.09)',
        cutStroke: 'rgba(31,37,48,0.55)',
        boxFront: '#cdae82',
        boxSide: '#a9895d',
        boxInterior: 'rgba(90,64,38,0.5)'
    };

    // ── Matematisk modell ──────────────────────────────────────────────
    function V(x) { var b = 24 - 2 * x; return x * b * b; }
    function Vp(x) { return 12 * x * x - 192 * x + 576; }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var X_MIN = 0.5, X_MAX = 11.5, X_STEP = 0.1;
        var state = { x: 2, step: 1, showCurve: false, guess: null };
        var trail = [];             // [{x, v}] — elevens egna mätpunkter
        var lastTrailX = null;

        // ── Geometri: huvudscen (ark + låda) ─────────────────────────
        var W = 560, H = 270;
        var SX0 = 45, SY0 = 50, SS = 170, S1 = SS / 24;              // arket
        var BZX = 300, BZY = 50, BZW = 245, BZH = 170;                // lådans zon
        var BOX_CX = BZX + BZW / 2;
        var S2 = 7.5, BK = 0.42, BANG = 35 * Math.PI / 180;
        var BCOS = Math.cos(BANG), BSIN = Math.sin(BANG);

        function boxGeom(b, hgt) {
            var ddx = b * S2 * BK * BCOS, ddy = b * S2 * BK * BSIN;
            var totalW = b * S2 + ddx, totalH = hgt * S2 + ddy;
            var ox = BZX + BZW / 2 - totalW / 2;
            var oy = BZY + BZH / 2 + totalH / 2;
            function corner(wx, wy, wz) {
                return { x: ox + wx * S2 + wz * S2 * BK * BCOS, y: oy - wy * S2 - wz * S2 * BK * BSIN };
            }
            return {
                A: corner(0, 0, 0), B: corner(b, 0, 0), C: corner(b, 0, b), D: corner(0, 0, b),
                A2: corner(0, hgt, 0), B2: corner(b, hgt, 0), C2: corner(b, hgt, b), D2: corner(0, hgt, b)
            };
        }

        // ── Geometri: mätdiagram (x, V) ───────────────────────────────
        var H2 = 250, L = 56, R = 16, T2 = 16, B2 = 34;
        var PW = W - L - R, PH2 = H2 - T2 - B2;
        var GXMIN = -0.6, GXMAX = 12.8, GYMIN = -70, GYMAX = 1150;
        function GX(x) { return L + (x - GXMIN) / (GXMAX - GXMIN) * PW; }
        function GY(y) { return T2 + (GYMAX - y) / (GYMAX - GYMIN) * PH2; }

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Extremvärdesfabriken — lådan';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var domainNote = document.createElement('div');
        domainNote.className = 'lab-vis-note';
        domainNote.style.color = 'var(--lab-ink-soft)';
        domainNote.innerHTML = 'Definitionsmängden: 0 &lt; <em>x</em> &lt; 12 — för litet <em>x</em> blir lådan en tunn ' +
            'bricka, för stort <em>x</em> en smal, hög pelare (ingen botten kvar).';
        card.appendChild(domainNote);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Ett kvadratiskt kartongark där fyra hörnkvadrater med sidan x klipps bort. ' +
                'Dra i hörnet eller x-glidaren för att ändra x — lådan till höger visar resultatet, ' +
                'och dess volym uppdateras live.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var guessRow = document.createElement('div');
        guessRow.className = 'lab-vis-actions';
        card.appendChild(guessRow);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '8px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2,
            width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Koordinatsystem med x på den vågräta axeln och volymen V på den lodräta. ' +
                'Varje x-värde du provar prickas in som en mätpunkt.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var formelRows = [];
        for (var fi = 0; fi < 6; fi++) {
            var frow = document.createElement('div');
            frow.className = 'lab-vis-formel';
            card.appendChild(frow);
            formelRows.push(frow);
        }
        var formelLive = document.createElement('div');
        formelLive.className = 'lab-vis-formel';
        formelLive.style.color = COL.tangent;
        card.appendChild(formelLive);

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

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Bygg lådan' },
            { n: 2, label: '2 · Dina mätpunkter' },
            { n: 3, label: '3 · Derivatan pekar ut toppen' }
        ];
        var INSTR = {
            1: 'Fyra kvadrater med sidan <em>x</em> klipps bort i hörnen på kartongarket, och kanterna viks ' +
               'upp till en låda utan lock. Dra i hörnet (eller <em>x</em>-glidaren) och se lådan — och dess ' +
               'volym — ändras.',
            2: 'Varje <em>x</em>-värde du provar prickas in här nedanför som en mätpunkt (<em>x</em>, <em>V</em>). ' +
               'Testa minst fem olika värden på <em>x</em> — vilket mönster anar du? Tryck sedan på ' +
               '"Rita hela kurvan".',
            3: 'Derivatan <em>V</em>′(<em>x</em>) är kurvans lutning. Dra <em>x</em> och se tangenten svänga — ' +
               'i toppen är den vågrät, och <em>V</em>′(<em>x</em>) = 0.'
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

        // ── Legend ────────────────────────────────────────────────────
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
        var legCurve = legendItem(COL.curve, '<em>V</em>(<em>x</em>) = lådans volym');
        var legPoints = legendItem(COL.secant, 'dina mätpunkter');
        var legTangent = legendItem(COL.tangent, 'tangent — vågrät i toppen');
        legend.appendChild(legCurve);
        legend.appendChild(legPoints);
        legend.appendChild(legTangent);

        // ── Gissa-först (steg 1) ──────────────────────────────────────
        var guessLbl = document.createElement('span');
        guessLbl.textContent = 'Gissa: vilket x ger störst volym?';
        guessLbl.style.fontSize = '13.5px';
        guessLbl.style.color = 'var(--lab-ink-soft)';
        guessRow.appendChild(guessLbl);
        var guessBtns = {};
        [['litet', 'Ett litet x'], ['mitt', 'Ett mellanstort x'], ['stort', 'Ett stort x']].forEach(function (g) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = g[1];
            b.addEventListener('click', function () {
                state.guess = g[0];
                paintGuessButtons();
            });
            guessRow.appendChild(b);
            guessBtns[g[0]] = b;
        });
        function paintGuessButtons() {
            for (var k in guessBtns) {
                var on = state.guess === k;
                guessBtns[k].style.background = on ? COL.axis : '';
                guessBtns[k].style.color = on ? '#fff' : '';
                guessBtns[k].style.borderColor = on ? COL.axis : '';
            }
        }

        // ── Rita hela kurvan / Rensa mätpunkter (steg 2+) ─────────────
        var drawCurveBtn = document.createElement('button');
        drawCurveBtn.type = 'button';
        drawCurveBtn.className = 'lab-btn lab-btn-primary';
        drawCurveBtn.textContent = 'Rita hela kurvan';
        drawCurveBtn.addEventListener('click', function () {
            if (trail.length >= 5) { state.showCurve = true; update(); }
        });
        actions.appendChild(drawCurveBtn);

        var clearTrailBtn = document.createElement('button');
        clearTrailBtn.type = 'button';
        clearTrailBtn.className = 'lab-btn lab-btn-quiet';
        clearTrailBtn.textContent = 'Rensa mätpunkter';
        clearTrailBtn.addEventListener('click', function () {
            trail = []; lastTrailX = null; state.showCurve = false; update();
        });
        actions.appendChild(clearTrailBtn);

        // ── Glidare (x) ───────────────────────────────────────────────
        function pushTrail() {
            if (lastTrailX != null && Math.abs(state.x - lastTrailX) < 0.35) return;
            lastTrailX = state.x;
            trail.push({ x: state.x, v: V(state.x) });
            if (trail.length > 200) trail.shift();
        }
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
            var decimals = 1;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
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
        function setX(v) {
            state.x = clampNum(Math.round(v / X_STEP) * X_STEP, X_MIN, X_MAX);
            pushTrail();
        }
        var rowX = makeRow('x', X_MIN, X_MAX, X_STEP,
            function () { return state.x; },
            function (v) { setX(v); });

        // ── Återställ ─────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.x = 2; state.step = 1; state.showCurve = false; state.guess = null;
            trail = []; lastTrailX = null;
            paintGuessButtons();
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbart hörn i huvudscenen ──────────────────────────────
        function toSheetLocal(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return { x: (px - SX0) / S1, y: (py - SY0) / S1 };
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var loc = toSheetLocal(e.clientX, e.clientY);
            setX((loc.x + loc.y) / 2);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Ritfunktioner: hörnpil för måttlinjer ────────────────────
        function arrowUp(cx, y) { return svgEl('polygon', { points: cx + ',' + (y - 4) + ' ' + (cx - 3.2) + ',' + (y + 3) + ' ' + (cx + 3.2) + ',' + (y + 3), fill: COL.axis }); }
        function arrowDown(cx, y) { return svgEl('polygon', { points: cx + ',' + (y + 4) + ' ' + (cx - 3.2) + ',' + (y - 3) + ' ' + (cx + 3.2) + ',' + (y - 3), fill: COL.axis }); }
        function arrowLeft(cy, x) { return svgEl('polygon', { points: (x - 4) + ',' + cy + ' ' + (x + 3) + ',' + (cy - 3.2) + ' ' + (x + 3) + ',' + (cy + 3.2), fill: COL.axis }); }
        function arrowRight(cy, x) { return svgEl('polygon', { points: (x + 4) + ',' + cy + ' ' + (x - 3) + ',' + (cy - 3.2) + ' ' + (x - 3) + ',' + (cy + 3.2), fill: COL.axis }); }

        // ── Rita huvudscenen: arket + lådan ───────────────────────────
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var x = state.x, cs = x * S1, b = 24 - 2 * x;

            // Zonrubriker
            svg.appendChild(svgEl('text', { x: SX0 + SS / 2, y: 24, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis }))
                .textContent = 'Kartongarket (24 × 24 cm)';
            svg.appendChild(svgEl('text', { x: BOX_CX, y: 24, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis }))
                .textContent = 'Lådan du bygger';

            // Sheet: outer square
            svg.appendChild(svgEl('rect', { x: SX0, y: SY0, width: SS, height: SS, fill: 'none', stroke: COL.axis, 'stroke-width': 1.8 }));

            // Hörnkvadrater (klipps bort) + inre kvikta (fold-linjen)
            for (var ci = 0; ci < 4; ci++) {
                var left = ci % 2 === 0, top = ci < 2;
                var rx = left ? SX0 : SX0 + SS - cs;
                var ry = top ? SY0 : SY0 + SS - cs;
                svg.appendChild(svgEl('rect', { x: rx, y: ry, width: cs, height: cs, fill: COL.cutFill, stroke: COL.cutStroke, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            }
            var innerSide = SS - 2 * cs;
            svg.appendChild(svgEl('rect', { x: SX0 + cs, y: SY0 + cs, width: innerSide, height: innerSide, fill: 'none', stroke: COL.curve, 'stroke-width': 1.6, 'stroke-dasharray': '1 3 7 3' }));

            // Måttlinje: x (vertikal, till vänster om arket)
            var vdX = SX0 - 15;
            svg.appendChild(svgEl('line', { x1: vdX, y1: SY0, x2: vdX, y2: SY0 + cs, stroke: COL.axis, 'stroke-width': 1.2 }));
            if (cs >= 18) { svg.appendChild(arrowUp(vdX, SY0)); svg.appendChild(arrowDown(vdX, SY0 + cs)); }
            svg.appendChild(svgVarText({ x: vdX - 8, y: SY0 + cs / 2 + 4, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x']));

            // Måttlinje: 24 − 2x (horisontell, under arket)
            var hdY = SY0 + SS + 14;
            svg.appendChild(svgEl('line', { x1: SX0 + cs, y1: hdY, x2: SX0 + SS - cs, y2: hdY, stroke: COL.axis, 'stroke-width': 1.2 }));
            if (innerSide >= 18) { svg.appendChild(arrowLeft(hdY, SX0 + cs)); svg.appendChild(arrowRight(hdY, SX0 + SS - cs)); }
            svg.appendChild(svgVarText({ x: SX0 + SS / 2, y: hdY + 15, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['24 − 2', '*x']));

            // Dragbart hörn (inre fold-hörn uppe till vänster)
            var hx = SX0 + cs, hy = SY0 + cs;
            svg.appendChild(svgEl('circle', { cx: hx, cy: hy, r: 4.5, fill: COL.curve }));
            var hit = svgEl('circle', { cx: hx, cy: hy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);

            // Lådan (parallellprojektion)
            var g = boxGeom(b, x);
            svg.appendChild(svgEl('polygon', { points: polyPts([g.A2, g.B2, g.C2, g.D2]), fill: COL.boxInterior, stroke: 'none' }));
            svg.appendChild(svgEl('polygon', { points: polyPts([g.B, g.C, g.C2, g.B2]), fill: COL.boxSide, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: polyPts([g.A, g.B, g.B2, g.A2]), fill: COL.boxFront, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polyline', { points: polyPts([g.A2, g.B2, g.C2, g.D2, g.A2]), fill: 'none', stroke: COL.axis, 'stroke-width': 1.2 }));

            // Live V(x)-etikett under lådan
            svg.appendChild(svgVarText(
                { x: BOX_CX, y: 238, 'font-size': 15, 'text-anchor': 'middle', fill: COL.curve },
                ['*V', '(', '*x', ') = ' + fmt(V(x), 1) + ' cm³']));
        }

        // ── Rita mätdiagrammet (steg 2+) ──────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawGraph() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var axisY = GY(0), axisX = GX(0), i;

            for (i = 0; i <= 12; i++) {
                svg2.appendChild(svgEl('line', { x1: GX(i), y1: T2, x2: GX(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 100; i <= 1100; i += 100) {
                svg2.appendChild(svgEl('line', { x1: L, y1: GY(i), x2: L + PW, y2: GY(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            svg2.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX, y1: T2 + PH2, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*V']));

            for (i = 0; i <= 12; i += 2) {
                svg2.appendChild(svgVarText({ x: GX(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = 200; i <= 1000; i += 200) {
                svg2.appendChild(svgVarText({ x: axisX - 6, y: GY(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg2.appendChild(g);

            // Nollställe x = 4 (steg 3)
            if (state.step === 3) {
                g.appendChild(svgEl('line', { x1: GX(4), y1: T2, x2: GX(4), y2: T2 + PH2, stroke: COL.tangent, 'stroke-width': 1.4, 'stroke-dasharray': '6 4' }));
                svg2.appendChild(svgVarText({ x: GX(4) + 8, y: T2 + 13, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.tangent }, ['*x', ' = 4']));
            }

            // Hela kurvan V(x) (upplåst efter minst 5 mätpunkter)
            if (state.showCurve) {
                var d = '', penDown = false, N = 240;
                for (i = 0; i <= N; i++) {
                    var xv = 0 + 12 * i / N;
                    var yv = V(xv);
                    d += (penDown ? 'L' : 'M') + GX(xv).toFixed(1) + ' ' + GY(yv).toFixed(1) + ' ';
                    penDown = true;
                }
                g.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            }

            // Tangent vid aktuellt x (steg 3)
            if (state.step === 3) {
                var xt = state.x, vt = V(xt), kt = Vp(xt);
                var x1 = xt - 1.3, x2 = xt + 1.3;
                g.appendChild(svgEl('line', {
                    x1: GX(x1), y1: GY(vt + kt * (x1 - xt)), x2: GX(x2), y2: GY(vt + kt * (x2 - xt)),
                    stroke: COL.tangent, 'stroke-width': 2, 'stroke-dasharray': '7 5'
                }));
            }

            // Mätpunkter (spår)
            trail.forEach(function (p) {
                g.appendChild(svgEl('circle', { cx: GX(p.x), cy: GY(p.v), r: 3, fill: 'rgba(74,125,58,0.55)' }));
            });
            // Aktuell punkt
            g.appendChild(svgEl('circle', { cx: GX(state.x), cy: GY(V(state.x)), r: 4.5, fill: COL.curve, stroke: COL.axis, 'stroke-width': 1 }));
        }

        // ── Formler ────────────────────────────────────────────────────
        function updateFormulas() {
            if (state.step === 3) {
                katexInto(formelRows[0], "V(x) = x(24-2x)^2 = 4x^3 - 96x^2 + 576x");
                katexInto(formelRows[1], "V'(x) = 12x^2 - 192x + 576");
                katexInto(formelRows[2], "V'(x) = 0 \\Leftrightarrow x^2 - 16x + 48 = 0 \\Leftrightarrow x = 4 \\text{ eller } x = 12");
                katexInto(formelRows[3], "0 < x < 12 \\;\\Rightarrow\\; x = 4 \\text{ är den relevanta lösningen}");
                katexInto(formelRows[4], "V''(x) = 24x - 192 \\;\\Rightarrow\\; V''(4) = -96 < 0 \\;\\Rightarrow\\; \\text{maximipunkt}");
                katexInto(formelRows[5], "V(4) = 4\\cdot(24-2\\cdot4)^2 = 4\\cdot16^2 = 1024\\ \\mathrm{cm}^3");
                var xT = fmtTex(state.x, 1), vpT = fmtTex(Vp(state.x), 1);
                katexInto(formelLive, "V'(" + xT + ") = " + vpT);

                var vpFmt = fmt(Vp(state.x), 1);
                var signSentence;
                if (vpFmt === '0') signSentence = 'Precis här är lutningen noll — det här är toppen! <em>V</em>′(<em>x</em>) = 0.';
                else if (Vp(state.x) > 0) signSentence = '<em>V</em>′(<em>x</em>) &gt; 0 — volymen växer fortfarande när <em>x</em> ökar.';
                else signSentence = '<em>V</em>′(<em>x</em>) &lt; 0 — volymen minskar. Du har redan passerat toppen.';

                var guessSentence = '';
                if (state.guess === 'mitt') {
                    guessSentence = 'Din gissning stämde: bäst är ett mellanvärde, <em>x</em> = 4 cm, med volymen 1024 cm³.';
                } else if (state.guess) {
                    var word = state.guess === 'litet' ? 'ett litet x' : 'ett stort x';
                    guessSentence = 'Du gissade ' + word + ' — men bäst är faktiskt ett mellanvärde: <em>x</em> = 4 cm ' +
                        '(volymen 1024 cm³). Varken en tunn bricka eller en smal, hög låda rymmer mest.';
                }
                note.innerHTML = signSentence + (guessSentence ? '<br>' + guessSentence : '');
            } else {
                formelRows.forEach(function (r) { r.textContent = ''; });
                formelLive.textContent = '';
                note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            guessRow.style.display = state.step === 1 ? '' : 'none';
            scene2.style.display = state.step >= 2 ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';
            legPoints.style.display = state.step >= 2 ? '' : 'none';
            legTangent.style.display = state.step === 3 ? '' : 'none';
            formelRows.forEach(function (r) { r.style.display = state.step === 3 ? '' : 'none'; });
            formelLive.style.display = state.step === 3 ? '' : 'none';
            note.style.display = state.step === 3 ? '' : 'none';

            drawCurveBtn.disabled = trail.length < 5;
            drawCurveBtn.style.opacity = drawCurveBtn.disabled ? '0.45' : '1';
            drawCurveBtn.style.cursor = drawCurveBtn.disabled ? 'default' : 'pointer';
            drawCurveBtn.title = drawCurveBtn.disabled ? 'Prova minst 5 olika x-värden först' : '';

            drawMain();
            if (state.step >= 2) drawGraph();
            updateFormulas();
        }

        pushTrail();
        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-4.6'] = api;
    window.VISUALISERINGAR['ma3c-4.7'] = api;
    window.VISUALISERINGAR['ma4-2.9'] = api;
})();
