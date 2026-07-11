/* ma2c-4.5.js — visualisering: "Pythagoras areapussel".
 *
 * Kärninsikt: a² + b² = c² handlar om AREOR — kvadraterna på kateterna kan
 * bokstavligen pusslas om till kvadraten på hypotenusan. Och likheten gäller
 * BARA vid rät vinkel.
 *
 * Beteckningar speglar teorigenomgången ma2c-4.5.md exakt: kateter a, b,
 * hypotenusa c, a² + b² = c². Startläget a=4, b=3 (c=5) är samma triangel-
 * form (3-4-5) som genomgångens Exempel 1 (9-12-15), skalad ner för att
 * rymmas i glidarintervallet 2–6.
 *
 * Tre steg:
 *   1. Tre kvadrater        — dra a, b; kvadraterna a², b², c² uppdateras
 *                              live. Gissa-först: går de två små alltid att
 *                              pussla ihop till den stora?
 *   2. Omflyttningsbeviset  — Perigal-styckningen: den STÖRRE av de två
 *                              kvadraterna delas i fyra kongruenta bitar via
 *                              två snitt genom centrum (parallella med
 *                              hypotenuse-kvadratens sidor). Bitarna +
 *                              den mindre kvadraten (hel) FLYTTAS (ingen
 *                              rotation behövs — verifierat numeriskt) och
 *                              fyller kvadraten på hypotenusan exakt.
 *   3. Bara vid rät vinkel  — vinkeln vid C blir dragbar (60°–120°).
 *                              a² + b² jämförs med c² live: lika bara vid
 *                              90°, annars a²+b² > c² (spetsig vinkel)
 *                              eller a²+b² < c² (trubbig vinkel).
 *
 * Perigal-geometrin (fyra pusselbitar + hel kvadrat) är härledd och
 * NUMERISKT verifierad (nolla glipor/överlapp vid dussintals a,b-par,
 * inklusive gränsfallet a=b) innan den skrevs in här — se de slutna
 * formlerna i perigalGeom(). Kräver att den STÖRRE kateten skärs (annars
 * går pusslet inte ihop med enbart translation); vilken bokstav (a eller
 * b) som råkar vara störst avgörs dynamiskt av glidarvärdena.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3/ma2c-2.1). API: window.VISUALISERINGAR['ma2c-4.5'] = { mount }.
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

    // ── Pixel-vektorhjälp ───────────────────────────────────────────────
    function subv(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
    function normv(v) { var L = Math.sqrt(v[0] * v[0] + v[1] * v[1]) || 1; return [v[0] / L, v[1] / L]; }
    function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        aSq: '#2563c9', aSqFill: 'rgba(37,99,201,0.22)',
        bSq: '#3f8f5c', bSqFill: 'rgba(63,143,92,0.22)',
        cSq: '#c1622c', cSqFill: 'rgba(193,98,44,0.20)',
        equal: '#3f8f5c', equalFill: 'rgba(63,143,92,0.22)',
        diff: '#c8324a', diffFill: 'rgba(200,50,74,0.18)',
        p1: '#c1622c', p1Fill: 'rgba(193,98,44,0.32)',
        p2: '#7c5cbf', p2Fill: 'rgba(124,92,191,0.32)',
        p3: '#b45309', p3Fill: 'rgba(180,83,9,0.32)',
        p4: '#0e7490', p4Fill: 'rgba(14,116,144,0.32)'
    };

    var W = 560, H = 430;

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var A_MIN = 2, A_MAX = 6, A_STEP = 0.5;
        var B_MIN = 2, B_MAX = 6, B_STEP = 0.5;
        var ANG_MIN = 60, ANG_MAX = 120, ANG_STEP = 1;
        var state = { step: 1, a: 4, b: 3, angleC: 90, puzzleT: 0, guess: null };
        var animId = null;

        // ── Geometri: allmän triangel med vinkel C (math-rum, y uppåt) ────
        // C = origo (vinkelspets), b-kateten pekar åt vänster (fast
        // riktning), a-kateten pekar uppåt/vinklat beroende på vinkeln.
        // Speglar teorigenomgångens figur (rät vinkel nere till höger,
        // bas = b, lodrät sida = a, hypotenusa = c).
        function triangleGeom(a, b, angleCdeg) {
            var thetaB = Math.PI;                                   // b-katet: 180°
            var thetaA = Math.PI - angleCdeg * Math.PI / 180;        // a-katet
            var C = [0, 0];
            var Pb = [b * Math.cos(thetaB), b * Math.sin(thetaB)];
            var Pa = [a * Math.cos(thetaA), a * Math.sin(thetaA)];
            var c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleCdeg * Math.PI / 180));
            // Kvadrat på b (utåt = nedåt, bort från triangelns inre)
            var Sb = [C, Pb, [Pb[0], Pb[1] - b], [C[0], C[1] - b]];
            // Kvadrat på a (utåt = vinkelrätt bort från triangelns inre)
            var dirA = [Math.cos(thetaA), Math.sin(thetaA)];
            var nA = [dirA[1], -dirA[0]];
            var Sa = [C, Pa, [Pa[0] + a * nA[0], Pa[1] + a * nA[1]], [C[0] + a * nA[0], C[1] + a * nA[1]]];
            // Kvadrat på c (utåt = bort från C)
            var dirC = [(Pb[0] - Pa[0]) / c, (Pb[1] - Pa[1]) / c];
            var nCraw = [dirC[1], -dirC[0]];
            var mid = [(Pa[0] + Pb[0]) / 2, (Pa[1] + Pb[1]) / 2];
            var toC = [C[0] - mid[0], C[1] - mid[1]];
            var nC = (nCraw[0] * toC[0] + nCraw[1] * toC[1] > 0) ? [-nCraw[0], -nCraw[1]] : nCraw;
            var Sc = [Pa, Pb, [Pb[0] + c * nC[0], Pb[1] + c * nC[1]], [Pa[0] + c * nC[0], Pa[1] + c * nC[1]]];
            return { C: C, Pa: Pa, Pb: Pb, c: c, Sa: Sa, Sb: Sb, Sc: Sc, dirA: dirA, nA: nA };
        }

        // ── Geometri: Perigal-styckningen (bara rät vinkel) ────────────────
        // Math-rum: O=(0,0) rät vinkel, A=(p,0) STÖRRE katet (skärs),
        // B=(0,q) MINDRE katet (hel). Slutna formler, numeriskt verifierade
        // (noll glipor/överlapp) för p ≥ q, inklusive p = q.
        function perigalGeom(a, b) {
            var aBigger = a >= b;
            var p = aBigger ? a : b, q = aBigger ? b : a;
            var r = Math.sqrt(p * p + q * q);
            var O = [0, 0], A = [p, 0], B = [0, q], Ap = [p, -p], Op = [0, -p];
            var Ca = [p / 2, -p / 2];
            var Cc = [q, p + q], D = [p + q, p];
            var Sc = [A, B, Cc, D];
            var pieceO = [O, [(p + q) / 2, 0], Ca, [0, (q - p) / 2]];
            var pieceA = [[(p + q) / 2, 0], A, [p, -(p + q) / 2], Ca];
            var pieceAp = [[p, -(p + q) / 2], Ap, [(p - q) / 2, -p], Ca];
            var pieceOp = [[(p - q) / 2, -p], Op, [0, (q - p) / 2], Ca];
            var Sq = [O, B, [-q, q], [-q, 0]];
            var T_A = [p / 2, p / 2];
            var T_B = [-p / 2, q + p / 2];
            var T_C = [q - p / 2, 3 * p / 2 + q];
            var T_D = [p / 2 + q, 3 * p / 2];
            var Tq = [p / 2 + q, p / 2];
            return {
                aBigger: aBigger, p: p, q: q, r: r, Sc: Sc,
                pieces: [
                    { poly: pieceO, T: T_A, color: COL.p1, fill: COL.p1Fill },
                    { poly: pieceA, T: T_B, color: COL.p2, fill: COL.p2Fill },
                    { poly: pieceAp, T: T_C, color: COL.p3, fill: COL.p3Fill },
                    { poly: pieceOp, T: T_D, color: COL.p4, fill: COL.p4Fill }
                ],
                Sq: Sq, Tq: Tq
            };
        }
        // Perigal-rum → samma lokala math-rum som triangleGeom (C=origo,
        // b-katet åt vänster, a-katet uppåt). O ↦ C alltid.
        function perigalToLocal(pt, aBigger) {
            return aBigger ? [-pt[1], pt[0]] : [-pt[0], pt[1]];
        }
        function movePoly(poly, T, t) {
            if (!t) return poly.map(function (v) { return v.slice(); });
            return poly.map(function (v) { return [v[0] + T[0] * t, v[1] + T[1] * t]; });
        }
        function toLocalPoly(poly, T, t, aBigger) {
            return movePoly(poly, T, t).map(function (v) { return perigalToLocal(v, aBigger); });
        }

        // ── Anpassa world-rum till pixelruta (fast viewBox, dynamisk skala) ─
        function makeFit(points, boxX, boxY, boxW, boxH, marginPx) {
            var xs = points.map(function (p) { return p[0]; });
            var ys = points.map(function (p) { return p[1]; });
            var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
            var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
            var w = Math.max(xmax - xmin, 1e-6), h = Math.max(ymax - ymin, 1e-6);
            var availW = boxW - 2 * marginPx, availH = boxH - 2 * marginPx;
            var scale = Math.min(availW / w, availH / h);
            var cx = (xmin + xmax) / 2, cy = (ymin + ymax) / 2;
            var pcx = boxX + boxW / 2, pcy = boxY + boxH / 2;
            return {
                scale: scale,
                toPx: function (pt) { return [pcx + (pt[0] - cx) * scale, pcy - (pt[1] - cy) * scale]; }
            };
        }
        function toPxPoly(fit, pts) { return pts.map(fit.toPx); }
        function ptsAttr(ptsPx) { return ptsPx.map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' '); }
        function drawPoly(parent, ptsPx, fill, stroke, sw, dash) {
            var attrs = { points: ptsAttr(ptsPx), fill: fill, stroke: stroke || COL.ink, 'stroke-width': sw || 1.4 };
            if (dash) attrs['stroke-dasharray'] = dash;
            parent.appendChild(svgEl('polygon', attrs));
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Pythagoras areapussel';
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
            'aria-label': 'Interaktiv figur: rätvinklig triangel med kvadrater på ' +
                'kateterna a, b och hypotenusan c. Dra i glidarna, pussla ihop ' +
                'kvadraterna, eller dra i vinkeln vid C.'
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
            { n: 1, label: '1 · Tre kvadrater' },
            { n: 2, label: '2 · Omflyttningsbeviset' },
            { n: 3, label: '3 · Bara vid rät vinkel' }
        ];
        var INSTR = {
            1: 'Dra i glidarna för <em>a</em> och <em>b</em> och se hur kvadraterna på ' +
               'kateterna och hypotenusan ändras. Gissa: går de två små kvadraterna ' +
               'alltid att pussla ihop så att de exakt fyller den stora?',
            2: 'Den större av de två kvadraterna delas i fyra bitar. Tryck på ' +
               '"Pussla om" — bitarna FLYTTAS bara (ingen rotation behövs!) tills de, ' +
               'tillsammans med den mindre kvadraten, exakt fyller kvadraten på ' +
               'hypotenusan.',
            3: 'Dra i hörnet vid <em>C</em> — eller glidaren — för att ändra vinkeln. ' +
               'Jämför <em>a</em>² + <em>b</em>² med <em>c</em>²: likheten gäller ' +
               'bara när vinkeln är exakt 90°.'
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

        // ── Legend (byggs om per steg/tillstånd) ───────────────────────────
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
            if (state.step === 1) {
                legend.appendChild(legendItem(COL.aSq, '<em>a</em>²'));
                legend.appendChild(legendItem(COL.bSq, '<em>b</em>²'));
                legend.appendChild(legendItem(COL.cSq, '<em>c</em>²'));
            } else if (state.step === 2) {
                var pg = perigalGeom(state.a, state.b);
                var wholeLetter = pg.aBigger ? 'b' : 'a';
                var wholeColor = pg.aBigger ? COL.bSq : COL.aSq;
                legend.appendChild(legendItem(COL.p1, 'Bit 1'));
                legend.appendChild(legendItem(COL.p2, 'Bit 2'));
                legend.appendChild(legendItem(COL.p3, 'Bit 3'));
                legend.appendChild(legendItem(COL.p4, 'Bit 4'));
                legend.appendChild(legendItem(wholeColor, 'Hela <em>' + wholeLetter + '</em>² (flyttas, ändras inte)'));
                legend.appendChild(legendItem(COL.ink, 'Mål: <em>c</em>²', true));
            } else if (state.step === 3) {
                var g3 = triangleGeom(state.a, state.b, state.angleC);
                var equalNow = Math.abs(state.angleC - 90) < 0.05;
                legend.appendChild(legendItem(COL.aSq, '<em>a</em>²'));
                legend.appendChild(legendItem(COL.bSq, '<em>b</em>²'));
                legend.appendChild(legendItem(equalNow ? COL.equal : COL.diff, '<em>c</em>²'));
            }
        }

        // ── Gissa-först (steg 1) ────────────────────────────────────────
        var guessYes = document.createElement('button');
        guessYes.type = 'button';
        guessYes.className = 'lab-btn';
        guessYes.textContent = 'Ja, alltid';
        guessYes.addEventListener('click', function () { state.guess = 'ja'; update(); });
        actions.appendChild(guessYes);

        var guessNo = document.createElement('button');
        guessNo.type = 'button';
        guessNo.className = 'lab-btn';
        guessNo.textContent = 'Nej, inte alltid';
        guessNo.addEventListener('click', function () { state.guess = 'nej'; update(); });
        actions.appendChild(guessNo);

        // ── Pussla om (steg 2) ──────────────────────────────────────────
        var puzzleBtn = document.createElement('button');
        puzzleBtn.type = 'button';
        puzzleBtn.className = 'lab-btn';
        puzzleBtn.textContent = 'Pussla om';
        puzzleBtn.addEventListener('click', function () { startPuzzle(); });
        actions.appendChild(puzzleBtn);

        // ── Sätt 90° (steg 3) ───────────────────────────────────────────
        var snap90Btn = document.createElement('button');
        snap90Btn.type = 'button';
        snap90Btn.className = 'lab-btn';
        snap90Btn.textContent = 'Sätt vinkeln till 90°';
        snap90Btn.addEventListener('click', function () {
            stopAnim();
            state.angleC = 90;
            rowAngle.sync();
            update();
        });
        actions.appendChild(snap90Btn);

        // ── Glidare ───────────────────────────────────────────────────────
        function makeRow(name, min, maxSrc, step, get, set, onSet) {
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
                if (onSet) onSet();
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
                el: row,
                sync: function () {
                    slider.max = curMax();
                    field.max = curMax();
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        function resetPuzzle() { state.puzzleT = 0; }
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = v; }, resetPuzzle);
        var rowB = makeRow('b', B_MIN, B_MAX, B_STEP,
            function () { return state.b; },
            function (v) { state.b = v; }, resetPuzzle);
        var rowAngle = makeRow('vinkeln C', ANG_MIN, ANG_MAX, ANG_STEP,
            function () { return state.angleC; },
            function (v) { state.angleC = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.a = 4; state.b = 3; state.angleC = 90; state.puzzleT = 0; state.guess = null;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: Pussla om (steg 2) ──────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function easeInOutCubic(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
        function startPuzzle() {
            stopAnim();
            var from = state.puzzleT, to = state.puzzleT >= 0.5 ? 0 : 1;
            var t0 = null, DUR = 1500;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DUR, 0, 1);
                state.puzzleT = from + (to - from) * easeInOutCubic(p);
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.puzzleT = to; update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbart hörn C (steg 3, ändrar vinkeln) ────────────────────────
        var draggingAngle = false;
        var lastR3px = null, lastPb3px = null;
        function angleBetweenPx(v1, v2) {
            var a1 = Math.atan2(v1[1], v1[0]), a2 = Math.atan2(v2[1], v2[0]);
            var diff = a2 - a1;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            while (diff < -Math.PI) diff += 2 * Math.PI;
            return Math.abs(diff) * 180 / Math.PI;
        }
        function toSvgPt(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return [(clientX - r.left) * W / r.width, (clientY - r.top) * H / r.height];
        }
        svg.addEventListener('pointermove', function (e) {
            if (!draggingAngle || !lastR3px || !lastPb3px) return;
            var pt = toSvgPt(e.clientX, e.clientY);
            var newAngle = angleBetweenPx(subv(lastPb3px, lastR3px), subv(pt, lastR3px));
            state.angleC = clampNum(Math.round(newAngle / ANG_STEP) * ANG_STEP, ANG_MIN, ANG_MAX);
            rowAngle.sync();
            update();
        });
        function endDrag() { draggingAngle = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Vinkelmarkör: rät vinkel-fyrkant eller vinkelbåge + gradtal ─────
        function drawAngleMarker(fit, g) {
            var Rpx = fit.toPx(g.C);
            var bDir = normv(subv(fit.toPx(g.Pb), Rpx));
            var aDir = normv(subv(fit.toPx(g.Pa), Rpx));
            if (Math.abs(state.angleC - 90) < 0.4) {
                var s = 13;
                var p1 = [Rpx[0] + bDir[0] * s, Rpx[1] + bDir[1] * s];
                var p3 = [Rpx[0] + aDir[0] * s, Rpx[1] + aDir[1] * s];
                var p2 = [p1[0] + aDir[0] * s, p1[1] + aDir[1] * s];
                svg.appendChild(svgEl('polyline', {
                    points: p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + ' ' + p3[0].toFixed(1) + ',' + p3[1].toFixed(1),
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.3
                }));
            } else {
                var rArc = 22;
                var q1 = [Rpx[0] + bDir[0] * rArc, Rpx[1] + bDir[1] * rArc];
                var q2 = [Rpx[0] + aDir[0] * rArc, Rpx[1] + aDir[1] * rArc];
                var ang1 = Math.atan2(bDir[1], bDir[0]), ang2 = Math.atan2(aDir[1], aDir[0]);
                var diff = ang2 - ang1;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                var sweep = diff > 0 ? 1 : 0;
                var d = 'M ' + q1[0].toFixed(1) + ' ' + q1[1].toFixed(1) + ' A ' + rArc + ' ' + rArc + ' 0 0 ' + sweep + ' ' + q2[0].toFixed(1) + ' ' + q2[1].toFixed(1);
                svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.ink, 'stroke-width': 1.5 }));
                var bisAng = ang1 + diff / 2;
                var lr = rArc + 17;
                var lx = Rpx[0] + Math.cos(bisAng) * lr, ly = Rpx[1] + Math.sin(bisAng) * lr;
                svg.appendChild(svgVarText(
                    { x: lx, y: ly + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink },
                    [fmt(state.angleC, 0) + '°']));
            }
        }

        // ── Areatext i en kvadrat (döljs om för liten) ──────────────────────
        function squareAreaLabel(cornersPx, letter, value, color) {
            var cx = 0, cy = 0;
            cornersPx.forEach(function (p) { cx += p[0]; cy += p[1]; });
            cx /= cornersPx.length; cy /= cornersPx.length;
            var side = dist(cornersPx[0], cornersPx[1]);
            if (side < 30) return;
            svg.appendChild(svgVarText(
                { x: cx, y: cy + 5, 'font-size': 15, 'text-anchor': 'middle', fill: color },
                ['*' + letter, '² = ', fmt(value)]));
        }

        // ── Steg 1: tre kvadrater ────────────────────────────────────────
        function drawStep1() {
            var a = state.a, b = state.b;
            var g = triangleGeom(a, b, 90);
            var pts = [g.C, g.Pa, g.Pb].concat(g.Sa, g.Sb, g.Sc);
            var fit = makeFit(pts, 0, 0, W, H, 34);

            drawPoly(svg, toPxPoly(fit, g.Sc), COL.cSqFill, COL.cSq, 1.6);
            drawPoly(svg, toPxPoly(fit, g.Sa), COL.aSqFill, COL.aSq, 1.6);
            drawPoly(svg, toPxPoly(fit, g.Sb), COL.bSqFill, COL.bSq, 1.6);
            drawPoly(svg, [fit.toPx(g.C), fit.toPx(g.Pa), fit.toPx(g.Pb)], 'rgba(31,37,48,0.06)', COL.ink, 2);

            squareAreaLabel(toPxPoly(fit, g.Sa), 'a', a * a, COL.aSq);
            squareAreaLabel(toPxPoly(fit, g.Sb), 'b', b * b, COL.bSq);
            squareAreaLabel(toPxPoly(fit, g.Sc), 'c', g.c * g.c, COL.cSq);

            drawAngleMarker(fit, g);
        }

        // ── Steg 2: Perigal-pusslet ──────────────────────────────────────
        function drawStep2() {
            var a = state.a, b = state.b;
            var pg = perigalGeom(a, b);
            var t = state.puzzleT;
            var g90 = triangleGeom(a, b, 90);

            var ScLocal = pg.Sc.map(function (v) { return perigalToLocal(v, pg.aBigger); });
            var bboxPts = [g90.C, g90.Pa, g90.Pb].concat(ScLocal);
            pg.pieces.forEach(function (pc) {
                bboxPts = bboxPts.concat(toLocalPoly(pc.poly, pc.T, 0, pg.aBigger)).concat(toLocalPoly(pc.poly, pc.T, 1, pg.aBigger));
            });
            bboxPts = bboxPts.concat(toLocalPoly(pg.Sq, pg.Tq, 0, pg.aBigger)).concat(toLocalPoly(pg.Sq, pg.Tq, 1, pg.aBigger));
            var fit = makeFit(bboxPts, 0, 0, W, H, 36);

            // Mål: dashad kontur av c²
            drawPoly(svg, toPxPoly(fit, ScLocal), 'none', COL.ink, 1.6, '7 5');

            // Ursprunglig triangel (kontext), tunn — tonas bort när pusslet
            // är ihopsatt så ingen oförklarad kvarleva blir kvar i scenen.
            if (t < 0.5) {
                drawPoly(svg, [fit.toPx(g90.C), fit.toPx(g90.Pa), fit.toPx(g90.Pb)], 'none', COL.dash, 1.2);
            }

            // Rörliga bitar
            pg.pieces.forEach(function (pc) {
                var local = toLocalPoly(pc.poly, pc.T, t, pg.aBigger);
                drawPoly(svg, toPxPoly(fit, local), pc.fill, pc.color, 1.6);
            });
            var sqLocal = toLocalPoly(pg.Sq, pg.Tq, t, pg.aBigger);
            var wholeColor = pg.aBigger ? COL.bSq : COL.aSq;
            var wholeFill = pg.aBigger ? COL.bSqFill : COL.aSqFill;
            drawPoly(svg, toPxPoly(fit, sqLocal), wholeFill, wholeColor, 1.6);
        }

        // ── Steg 3: vinkeln avgör ────────────────────────────────────────
        function drawStep3() {
            var a = state.a, b = state.b, angleC = state.angleC;
            var g = triangleGeom(a, b, angleC);
            var pts = [g.C, g.Pa, g.Pb].concat(g.Sa, g.Sb, g.Sc);
            var fit = makeFit(pts, 0, 0, W, H, 34);
            var equalNow = Math.abs(angleC - 90) < 0.05;
            var cColor = equalNow ? COL.equal : COL.diff;
            var cFill = equalNow ? COL.equalFill : COL.diffFill;

            drawPoly(svg, toPxPoly(fit, g.Sc), cFill, cColor, 1.6);
            drawPoly(svg, toPxPoly(fit, g.Sa), COL.aSqFill, COL.aSq, 1.6);
            drawPoly(svg, toPxPoly(fit, g.Sb), COL.bSqFill, COL.bSq, 1.6);
            drawPoly(svg, [fit.toPx(g.C), fit.toPx(g.Pa), fit.toPx(g.Pb)], 'rgba(31,37,48,0.06)', COL.ink, 2);

            squareAreaLabel(toPxPoly(fit, g.Sa), 'a', a * a, COL.aSq);
            squareAreaLabel(toPxPoly(fit, g.Sb), 'b', b * b, COL.bSq);
            squareAreaLabel(toPxPoly(fit, g.Sc), 'c', g.c * g.c, cColor);

            drawAngleMarker(fit, g);

            // Dragbart hörn vid Pa (svep vinkeln)
            var Papx = fit.toPx(g.Pa);
            lastR3px = fit.toPx(g.C);
            lastPb3px = fit.toPx(g.Pb);
            svg.appendChild(svgEl('circle', { cx: Papx[0], cy: Papx[1], r: 4.5, fill: COL.ink }));
            var hit = svgEl('circle', { cx: Papx[0], cy: Papx[1], r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim();
                draggingAngle = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, b = state.b;
            if (state.step === 1 || state.step === 2) {
                var c90 = Math.sqrt(a * a + b * b);
                formelA.style.display = '';
                formelB.style.display = '';
                katexInto(formelA,
                    '\\textcolor{' + COL.aSq + '}{a^2} + \\textcolor{' + COL.bSq + '}{b^2} = \\textcolor{' + COL.cSq + '}{c^2}');
                katexInto(formelB,
                    '\\textcolor{' + COL.aSq + '}{' + fmtTex(a) + '^2} + \\textcolor{' + COL.bSq + '}{' + fmtTex(b) + '^2} = ' +
                    fmtTex(a * a) + ' + ' + fmtTex(b * b) + ' = ' + fmtTex(a * a + b * b) + ' = \\textcolor{' + COL.cSq + '}{' + fmtTex(c90) + '^2}');
                if (state.step === 1) {
                    if (state.guess === 'ja') {
                        note.innerHTML = 'Rätt — så länge vinkeln är exakt 90° kan de två små kvadraterna ' +
                            'alltid pusslas ihop till en exakt kopia av den stora. Se beviset i steg 2.';
                    } else if (state.guess === 'nej') {
                        note.innerHTML = 'Testa igen: svaret är faktiskt <em>ja</em> — så länge vinkeln är rät ' +
                            '(90°) går det alltid ihop exakt. Se beviset i steg 2.';
                    } else {
                        note.textContent = '';
                    }
                } else {
                    var phase = state.puzzleT < 0.02 ? 'Bitarna ligger kvar i sina ursprungliga lägen.'
                        : state.puzzleT > 0.98 ? 'Klart! Bitarna fyller kvadraten på hypotenusan exakt — ingen glipa, inget överlapp.'
                        : 'Bitarna glider rakt (ingen rotation) mot sina platser i kvadraten på hypotenusan.';
                    note.innerHTML = phase + ' Arean är hela tiden oförändrad: <em>a</em>² + <em>b</em>² = ' +
                        fmt(a * a + b * b) + ' = <em>c</em>² = ' + fmt(c90 * c90) + '.';
                }
            } else if (state.step === 3) {
                var g = triangleGeom(a, b, state.angleC);
                var lhs = a * a + b * b, rhs = g.c * g.c;
                var equalNow = Math.abs(state.angleC - 90) < 0.05;
                var opTex = equalNow ? '=' : (lhs > rhs ? '>' : '<');
                var cColor = equalNow ? COL.equal : COL.diff;
                formelA.style.display = '';
                formelB.style.display = '';
                katexInto(formelA, 'a^2 + b^2 \\; ' + opTex + ' \\; \\textcolor{' + cColor + '}{c^2}');
                katexInto(formelB,
                    fmtTex(a) + '^2 + ' + fmtTex(b) + '^2 = ' + fmtTex(lhs) + ' \\; ' + opTex + ' \\; ' +
                    fmtTex(rhs) + ' = \\textcolor{' + cColor + '}{' + fmtTex(g.c) + '^2}');
                if (equalNow) {
                    note.innerHTML = 'Vinkeln är exakt 90° — <em>a</em>² + <em>b</em>² = <em>c</em>². ' +
                        'Det är precis Pythagoras sats.';
                } else if (state.angleC < 90) {
                    note.innerHTML = 'Vinkeln är spetsig (mindre än 90°): sidan mitt emot blir kortare, så ' +
                        '<em>a</em>² + <em>b</em>² &gt; <em>c</em>².';
                } else {
                    note.innerHTML = 'Vinkeln är trubbig (mer än 90°): sidan mitt emot blir längre, så ' +
                        '<em>a</em>² + <em>b</em>² &lt; <em>c</em>².';
                }
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (btn, i) { btn.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            buildLegend();

            guessYes.style.display = state.step === 1 ? '' : 'none';
            guessNo.style.display = state.step === 1 ? '' : 'none';
            puzzleBtn.style.display = state.step === 2 ? '' : 'none';
            snap90Btn.style.display = state.step === 3 ? '' : 'none';
            actions.style.display = 'flex';
            puzzleBtn.textContent = state.puzzleT >= 0.999 ? 'Tillbaka' : 'Pussla om';

            rowAngle.el.style.display = state.step === 3 ? '' : 'none';

            while (svg.firstChild) svg.removeChild(svg.firstChild);
            if (state.step === 1) drawStep1();
            else if (state.step === 2) drawStep2();
            else if (state.step === 3) drawStep3();

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
    window.VISUALISERINGAR['ma2c-4.5'] = { mount: mount };
})();
