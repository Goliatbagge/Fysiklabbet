/* ma2c-3.1.js — visualisering: "Parabelns tre klädnader".
 *
 * Kärninsikt: faktorform, symmetrilinje/extrempunkt och allmän form är
 * SAMMA parabel — bara olika skrivsätt som avslöjar olika hemligheter
 * (nollställen, extrempunkt, y-skärning). Fyra draghandtag ("klädnader"):
 * de två nollställena x1/x2 (faktorform), extrempunkten (symmetrilinje)
 * och y-skärningen (allmän form). En a-glidare styr öppning/bredd.
 *
 * Beteckningar speglar teorigenomgångarna exakt:
 *   ma2c-3.1.md — allmän form y = ax² + bx + c, nollställen, symmetrilinje
 *                 x_s, extrempunkt, maximi-/minimipunkt ("glad/sur mun").
 *   ma2c-3.2.md — symmetrilinje = medelvärdet av nollställena,
 *                 extrempunkt via insättning av x_s i funktionen.
 *   ma2c-3.3.md — faktorform f(x) = k(x-x1)(x-x2).
 * Startläget är ma2c-3.1 Exempel 1: g(x) = -x²-2x+3 (nollställen -3 och 1,
 * extrempunkt (-1, 4), en maximipunkt, symmetrilinje x_s = -1).
 *
 * Internt tillstånd är alltid (a, b, c) — allmän form. Varje handtags drag
 * räknar om (a,b,c) så att just DEN egenskapen får det nya värdet medan
 * övriga hålls så konstanta som möjligt (se kommentarer vid varje
 * draghanterare). Härifrån härleds nollställen, symmetrilinje/extrempunkt
 * och faktorform varje uppdatering.
 *
 * Specialfall: nollställena kan smälta ihop till en dubbelrot (D ≈ 0) eller
 * saknas helt (D < 0) — då göms nollställe-handtagen och faktorformen visar
 * ett förklarande meddelande i stället för en ekvation.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js och ma2c-2.1.js). API: window.VISUALISERINGAR['ma2c-3.1'] =
 * { mount }, registrerad även för ma2c-3.2 och ma2c-3.3.
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
    function snap(v) { return Math.round(v / 0.25) * 0.25; }
    function isIntish(v) { return Math.abs(v - Math.round(v)) < 1e-6; }

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
    // Text med kursiv variabel + upprätt sifferindex (x_s) — baseline-shift.
    function svgSubText(attrs, italicMain, sub) {
        var el = svgEl('text', attrs);
        var t1 = svgEl('tspan', { 'font-style': 'italic' });
        t1.textContent = italicMain;
        el.appendChild(t1);
        var t2 = svgEl('tspan', { 'baseline-shift': '-4', 'font-size': '0.72em' });
        t2.textContent = sub;
        el.appendChild(t2);
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
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        curve: '#2563c9',      // parabeln — blå som teorifigurernas kurva
        factor: '#3f8f5c',     // nollställen / faktorform — grön
        vertex: '#c8324a',     // extrempunkt / symmetrilinje — röd
        general: '#c1622c'     // y-skärning / allmän form — amber
    };
    var X_CLAMP = 7.5, Y_CLAMP = 9.25;
    var A_MIN = -3, A_MAX = 3, A_STEP = 0.25;

    function clampA(v) {
        if (Math.abs(v) < 0.25) return v < 0 ? -0.25 : 0.25;
        return Math.round(v / A_STEP) * A_STEP;
    }

    // ── Formeltext-hjälpare ────────────────────────────────────────────
    function coefTex(v) {
        var m = Math.abs(v);
        var mt = Math.abs(m - 1) < 1e-9 ? '' : fmtTex(m, 2);
        return (v < 0 ? '-' : '') + mt;
    }
    function termTex(coef, suffix, isFirst) {
        if (Math.abs(coef) < 1e-9) return '';
        var m = Math.abs(coef);
        var mt = (Math.abs(m - 1) < 1e-9 && suffix !== '') ? '' : fmtTex(m, 2);
        var body = mt + suffix;
        if (isFirst) return (coef < 0 ? '-' : '') + (body || '0');
        return (coef < 0 ? ' - ' : ' + ') + (body || '0');
    }
    function polyTex(a, b, c) {
        var s = termTex(a, 'x^2', true) + termTex(b, 'x', false) + termTex(c, '', false);
        return s || '0';
    }
    function factorTermTex(r) {
        if (Math.abs(r) < 1e-9) return '(x)';
        return r > 0 ? '(x-' + fmtTex(r, 2) + ')' : '(x+' + fmtTex(-r, 2) + ')';
    }
    function pairTex(x, y) {
        var sep = (isIntish(x) && isIntish(y)) ? ',\\ ' : ';\\ ';
        return '(' + fmtTex(x, 2) + sep + fmtTex(y, 2) + ')';
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd: (a, b, c) är enda sanningskällan ────────────────
        // Startläge: ma2c-3.1 Exempel 1, g(x) = -x²-2x+3.
        var state = { a: -1, b: -2, c: 3, step: 1, active: 'factor' };

        function f(x) { return state.a * x * x + state.b * x + state.c; }
        function hOf() { return -state.b / (2 * state.a); }
        function kOf(h) { var hh = h == null ? hOf() : h; return state.a * hh * hh + state.b * hh + state.c; }
        function deriveRoots() {
            var a = state.a, b = state.b, c = state.c;
            var D = b * b - 4 * a * c;
            if (D < -1e-6) return { hasRoots: false, D: D };
            var sq = Math.sqrt(Math.max(D, 0));
            var r1 = (-b - sq) / (2 * a), r2 = (-b + sq) / (2 * a);
            var x1 = Math.min(r1, r2), x2 = Math.max(r1, r2);
            return { hasRoots: true, D: D, x1: x1, x2: x2, isDouble: Math.abs(x2 - x1) < 0.02 };
        }

        // ── Geometri ─────────────────────────────────────────────────
        var W = 560, H = 430, L = 48, R = 18, T = 20, B = 40;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -8, XMAX = 8, YMIN = -10, YMAX = 10;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
        var axisX = X(0), axisY = Y(0);

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Parabelns tre klädnader';
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
            'aria-label': 'Interaktiv graf: en parabel med fyra draghandtag — de två ' +
                'nollställena, extrempunkten och y-skärningen. Dra i punkterna, eller ' +
                'i a-glidaren, för att se faktorform, symmetrilinje/extrempunkt och ' +
                'allmän form uppdateras live.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        svg.style.userSelect = 'none';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelFactor = document.createElement('div');
        formelFactor.className = 'lab-vis-formel';
        formelFactor.style.transition = 'opacity 0.2s';
        card.appendChild(formelFactor);

        var formelVertex = document.createElement('div');
        formelVertex.className = 'lab-vis-formel';
        formelVertex.style.transition = 'opacity 0.2s';
        card.appendChild(formelVertex);

        var formelGeneral = document.createElement('div');
        formelGeneral.className = 'lab-vis-formel';
        formelGeneral.style.transition = 'opacity 0.2s';
        card.appendChild(formelGeneral);

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
            { n: 1, label: '1 · Nollställena', active: 'factor' },
            { n: 2, label: '2 · Extrempunkten och symmetrilinjen', active: 'vertex' },
            { n: 3, label: '3 · Allmänna formen', active: 'general' }
        ];
        var INSTR = {
            1: 'Dra i punkterna <em>x</em>₁ och <em>x</em>₂ på <em>x</em>-axeln — parabelns ' +
               'nollställen. Faktorformen därunder lyser upp och uppdateras live. Drar du ' +
               'bara den ena punkten ligger den andra kvar, men symmetrilinjen flyttar sig.',
            2: 'Dra i punkten på parabelns topp eller botten — extrempunkten. Den streckade ' +
               'lodräta linjen är symmetrilinjen: den går alltid genom extrempunkten, mitt ' +
               'emellan nollställena.',
            3: 'Dra i punkten där parabeln skär <em>y</em>-axeln, eller använd <em>a</em>-' +
               'glidaren nedanför för att ändra hur brant parabeln är. Allmänna formen ' +
               'lyser upp och uppdateras live — prova ett negativt <em>a</em> för en ' +
               'maximipunkt.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n; state.active = s.active; update();
            });
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
        legend.appendChild(legendItem(COL.curve, 'parabeln'));
        legend.appendChild(legendItem(COL.factor, 'nollställen (<em>x</em>₁, <em>x</em>₂)'));
        legend.appendChild(legendItem(COL.vertex, 'extrempunkt &amp; symmetrilinje'));
        legend.appendChild(legendItem(COL.general, '<em>y</em>-skärning (<em>c</em>)'));

        // ── Exempelknappar ────────────────────────────────────────────
        var exDouble = document.createElement('button');
        exDouble.type = 'button';
        exDouble.className = 'lab-btn';
        exDouble.textContent = 'Exempel: dubbelrot';
        exDouble.addEventListener('click', function () {
            state.a = 1; state.b = -4; state.c = 4; state.active = 'factor';
            syncAll();
        });
        actions.appendChild(exDouble);

        var exNoRoots = document.createElement('button');
        exNoRoots.type = 'button';
        exNoRoots.className = 'lab-btn';
        exNoRoots.textContent = 'Exempel: inga nollställen';
        exNoRoots.addEventListener('click', function () {
            state.a = 1; state.b = 0; state.c = 4; state.active = 'factor';
            syncAll();
        });
        actions.appendChild(exNoRoots);

        // ── a-glidare (öppning/bredd) ─────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.general + ' 0%, ' +
                    COL.general + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        // a-glidaren håller extrempunkten (h, k) fast och räknar om b, c —
        // parabeln blir brantare/flackare (eller byter max/min) utan att
        // extrempunkten flyttar sig.
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) {
                var h = hOf(), k = kOf(h);
                var newA = clampA(v);
                state.a = newA;
                state.b = -2 * newA * h;
                state.c = newA * h * h + k;
                state.active = 'general';
            });

        function syncAll() { rowA.sync(); update(); }

        // ── Återställ ─────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.a = -1; state.b = -2; state.c = 3; state.step = 1; state.active = 'factor';
            syncAll();
        });
        foot.appendChild(reset);

        // ── Dragning ──────────────────────────────────────────────────
        var dragging = null;    // null | 'root' | 'vertex' | 'yint'
        var dragFrozen = 0;     // den låsta nollstället vid rot-drag
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        function toWorldY(clientY) {
            var r = svg.getBoundingClientRect();
            var py = (clientY - r.top) * H / r.height;
            return YMAX - (py - T) / PH * (YMAX - YMIN);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            if (dragging === 'root') {
                var newRoot = clampNum(snap(toWorldX(e.clientX)), -X_CLAMP, X_CLAMP);
                state.b = -state.a * (newRoot + dragFrozen);
                state.c = state.a * newRoot * dragFrozen;
                state.active = 'factor';
            } else if (dragging === 'vertex') {
                var newH = clampNum(snap(toWorldX(e.clientX)), -X_CLAMP, X_CLAMP);
                var newK = clampNum(snap(toWorldY(e.clientY)), -Y_CLAMP, Y_CLAMP);
                state.b = -2 * state.a * newH;
                state.c = state.a * newH * newH + newK;
                state.active = 'vertex';
            } else if (dragging === 'yint') {
                var newC = clampNum(snap(toWorldY(e.clientY)), -Y_CLAMP, Y_CLAMP);
                state.c = newC;
                state.active = 'general';
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        function makeHandle(parent, cx, cy, color, mode, frozen) {
            parent.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 5, fill: color }));
            var hit = svgEl('circle', { cx: cx, cy: cy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = mode;
                if (frozen != null) dragFrozen = frozen;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            parent.appendChild(hit);
        }

        // ── Rita scenen ───────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene(geo) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, b = state.b, c = state.c;
            var h = hOf(), k = kOf(h);
            var i;

            // Rutnät (varje heltal)
            for (i = XMIN; i <= XMAX; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = YMIN; i <= YMAX; i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: X(XMIN), y1: axisY, x2: X(XMAX) + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (X(XMAX) + 14) + ',' + axisY + ' ' + (X(XMAX) + 4) + ',' + (axisY - 4.5) + ' ' + (X(XMAX) + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: Y(YMIN), x2: axisX, y2: T + 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 4) + ' ' + (axisX - 4.5) + ',' + (T + 6) + ' ' + (axisX + 4.5) + ',' + (T + 6), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (varannan enhet, aldrig ytterst vid pilarna,
            // och alltid utom en dynamisk handtagsposition)
            var skipX = [0, h];
            if (geo.hasRoots) { skipX.push(geo.x1, geo.x2); }
            var skipY = [0, k, c];
            function nearAny(v, arr) {
                for (var j = 0; j < arr.length; j++) if (Math.abs(v - arr[j]) < 0.55) return true;
                return false;
            }
            for (i = -6; i <= 6; i += 2) {
                if (i === 0 || nearAny(i, skipX)) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = -8; i <= 8; i += 2) {
                if (i === 0 || nearAny(i, skipY)) continue;
                svg.appendChild(svgVarText(
                    { x: axisX - 8, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            // Symmetrilinjen — alltid synlig, streckad, lodrät genom vertex
            svg.appendChild(svgEl('line', {
                x1: X(h), y1: T, x2: X(h), y2: T + PH,
                stroke: COL.vertex, 'stroke-width': 1.4, 'stroke-dasharray': '6 5', opacity: 0.75
            }));
            // Sidoval för etiketter nära symmetrilinjen: flytta åt den sida
            // som har MEST fri yta innan nästa hinder (y-axeln om den är
            // närmast, annars viewBox-kanten) — annars riskerar en etikett
            // nära x = 0 att hamna ovanpå y-axeln (den är alltid mitt i
            // fönstret, så "mot mitten" är samma sak som "mot axeln").
            function pickDir(px) {
                if (px < 0) return ((px - XMIN) > -px) ? -1 : 1;
                if (px > 0) return ((XMAX - px) > px) ? 1 : -1;
                return 1;
            }
            var symDir = pickDir(h);
            svg.appendChild(svgSubText(
                { x: X(h) + symDir * 9, y: T + 15, 'font-size': 12.5, 'text-anchor': symDir > 0 ? 'start' : 'end', fill: COL.vertex },
                'x', 's'));

            // Klippram + parabeln (kan lämna fönstret vertikalt)
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);
            var d = '', N = 240;
            for (i = 0; i <= N; i++) {
                var xv = XMIN + (XMAX - XMIN) * i / N;
                var yv = a * xv * xv + b * xv + c;
                d += (i === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Nollställen (om de finns och ligger inom synligt intervall)
            if (geo.hasRoots) {
                var showX1 = Math.abs(geo.x1) <= X_CLAMP + 0.1;
                var showX2 = Math.abs(geo.x2) <= X_CLAMP + 0.1;
                if (geo.isDouble) {
                    if (showX1) {
                        makeHandle(svg, X(geo.x1), axisY, COL.factor, 'root', geo.x2);
                        svg.appendChild(svgVarText(
                            { x: X(geo.x1), y: axisY + 17, 'font-size': 12, 'text-anchor': 'middle', fill: COL.factor },
                            [fmt(geo.x1, 2) + ' (dubbelrot)']));
                    }
                } else {
                    if (showX1) {
                        makeHandle(svg, X(geo.x1), axisY, COL.factor, 'root', geo.x2);
                        svg.appendChild(svgVarText(
                            { x: X(geo.x1), y: axisY + 17, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.factor },
                            [fmt(geo.x1, 2)]));
                    }
                    if (showX2) {
                        makeHandle(svg, X(geo.x2), axisY, COL.factor, 'root', geo.x1);
                        svg.appendChild(svgVarText(
                            { x: X(geo.x2), y: axisY + 17, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.factor },
                            [fmt(geo.x2, 2)]));
                    }
                }
            }

            // y-skärningen ritas FÖRE extrempunkten så att extrempunktens
            // handtag hamnar överst (mer kapabelt — fritt 2D-drag) i det
            // specialfall då de råkar sammanfalla (se nedan).
            var vertexOnAxis = Math.abs(h) < 0.05;   // vertex = y-skärning när b = 0
            makeHandle(svg, axisX, Y(c), COL.general, 'yint', null);
            if (!vertexOnAxis) {
                svg.appendChild(svgEl('text', {
                    x: axisX + 11, y: Y(c) + 4 + (a < 0 ? -5 : 5),
                    'font-size': 12.5, 'text-anchor': 'start', fill: COL.general
                })).textContent = '(0' + (isIntish(c) ? ', ' : '; ') + fmt(c, 2) + ')';
            }

            // Extrempunkten — vågrätt: sidan med mest fri yta (pickDir,
            // samma logik som symmetrilinje-etiketten ovan, se kommentar).
            // Lodrätt: eftersom hela kurvan ligger på ena sidan om k (aldrig
            // över en maximipunkt, aldrig under en minimipunkt) räcker en
            // liten marginal för att alltid vara fri från kurvan. Etiketten
            // hoppas över vid en dubbelrot (den sammanfaller då med
            // nollställe-etiketten "x (dubbelrot)") och vid en y-skärning
            // som sammanfaller med extrempunkten (etiketten "(0, c)" ovan
            // hoppades då redan över, så den här visas i stället).
            makeHandle(svg, X(h), Y(k), COL.vertex, 'vertex', null);
            if (!geo.isDouble) {
                var vertDir = pickDir(h);
                var vertDy = a < 0 ? -13 : 21;
                svg.appendChild(svgEl('text', {
                    x: X(h) + vertDir * 9, y: Y(k) + vertDy,
                    'font-size': 12.5, 'text-anchor': vertDir > 0 ? 'start' : 'end', fill: COL.vertex
                })).textContent = '(' + fmt(h, 2) + (isIntish(h) && isIntish(k) ? ', ' : '; ') + fmt(k, 2) + ')';
            }
        }

        // ── Formler och texter ────────────────────────────────────────
        function setActiveStyle(div, key) {
            var active = state.active === key;
            div.style.opacity = active ? '1' : '0.4';
        }
        function updateFormulas(geo) {
            var a = state.a, h = hOf(), k = kOf(h);

            formelFactor.style.color = COL.factor;
            setActiveStyle(formelFactor, 'factor');
            if (!geo.hasRoots) {
                formelFactor.innerHTML = 'Inga reella nollställen — parabeln skär inte <em>x</em>-axeln.';
            } else if (geo.isDouble) {
                katexInto(formelFactor, 'f(x) = k(x-x_1)^2 = ' + coefTex(a) + factorTermTex(geo.x1) + '^{2}');
            } else {
                katexInto(formelFactor, 'f(x) = k(x-x_1)(x-x_2) = ' + coefTex(a) + factorTermTex(geo.x1) + factorTermTex(geo.x2));
            }

            formelVertex.style.color = COL.vertex;
            setActiveStyle(formelVertex, 'vertex');
            katexInto(formelVertex,
                'x_s = ' + fmtTex(h, 2) + '\\qquad \\text{Extrempunkt} = ' + pairTex(h, k) +
                '\\ (' + (a < 0 ? '\\text{maximipunkt}' : '\\text{minimipunkt}') + ')');

            formelGeneral.style.color = COL.general;
            setActiveStyle(formelGeneral, 'general');
            katexInto(formelGeneral, 'f(x) = ax^2+bx+c = ' + polyTex(state.a, state.b, state.c));

            // Note: symmetrilinjens samband med nollställena / dubbelrot / saknas
            if (geo.isDouble) {
                note.innerHTML = 'Nollställena har smält samman till en <strong>dubbelrot</strong> vid ' +
                    '<span style="white-space:nowrap"><em>x</em> = ' + fmt(geo.x1, 2) +
                    '</span> — punkten ligger precis på symmetrilinjen.';
            } else if (geo.hasRoots) {
                note.innerHTML = 'Symmetrilinjen ligger mitt emellan nollställena: ' +
                    '<span style="white-space:nowrap"><em>x</em><sub>s</sub> = (' + fmt(geo.x1, 2) +
                    ' + ' + fmt(geo.x2, 2) + ')/2 = ' + fmt(h, 2) + '</span>.';
            } else {
                note.innerHTML = 'Symmetrilinjen kan bestämmas även utan nollställen: ' +
                    '<span style="white-space:nowrap"><em>x</em><sub>s</sub> = ' + fmt(h, 2) + '</span>.';
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (btn, i) { btn.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            var geo = deriveRoots();
            drawScene(geo);
            updateFormulas(geo);
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
    window.VISUALISERINGAR['ma2c-3.1'] = api;
    window.VISUALISERINGAR['ma2c-3.2'] = api;
    window.VISUALISERINGAR['ma2c-3.3'] = api;
})();
