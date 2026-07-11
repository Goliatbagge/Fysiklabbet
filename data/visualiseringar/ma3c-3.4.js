/* ma3c-3.4.js — visualisering: "Hitta talet e" (derivatan av aˣ).
 * Hör till ma3c-3.4 (derivatan av eˣ) och ma3c-3.5 (derivatan av eᵏˣ och aˣ).
 *
 * Kärninsikt: e är inte ett godtyckligt tal — det är LÖSNINGEN på
 * sökproblemet "vilken bas a gör att aˣ är sin egen derivata?". Eleven
 * hittar e själv genom att dra i basen och jämföra kurvan f(x) = aˣ (blå)
 * med sin derivata (röd, streckad).
 *
 * Tre steg (lager):
 *   1. Jämför kurvorna — dra a och en x-markör, se f(x) och f'(x) sida vid
 *      sida. Vid a = 2 ligger derivatan under funktionen, vid a = 3 över.
 *   2. Ringa in — kvoten f'(x)/f(x) är konstant (oberoende av x). Dra a
 *      tills kvoten blir exakt 1 — då har eleven hittat e.
 *   3. Talet e och ln a — visar e = 2,7182818… och sambandet
 *      f'(x) = aˣ · ln a (samma ordning som ma3c-3.5.md). Knapp som
 *      snäpper a till exakt e.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js-piloten).
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

    // ── Färger (samma familj som graf.js/teorifigurerna, plus en accent för
    //    sökprocessen och ett grönt facit-meddelande) ──────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // f(x) = aˣ — blå
        tangent: '#c8324a',    // derivatan f'(x) — accentröd, streckad
        accent: '#7c3aed',     // kvoten f'(x)/f(x) — lila (sökprocessen)
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        success: '#2f7d4f'     // grönt facit-meddelande
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var A_MIN = 1.2, A_MAX = 4.0, A_STEP = 0.01;
        var XM_MIN = -1.8, XM_MAX = 2.8, XM_STEP = 0.05;
        var state = { a: 2, xMark: 1, step: 1 };
        function f(x) { return Math.pow(state.a, x); }
        function fprime(x) { return Math.log(state.a) * Math.pow(state.a, x); }

        // ── Geometri ──────────────────────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -2.3, XMAX = 3.3, YMIN = 0, YMAX = 10.6;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Hitta talet e';
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
            'aria-label': 'Interaktiv graf: kurvan f(x) = a upphöjt till x (blå) och dess ' +
                'derivata (röd, streckad). Dra i a-glidaren för att ändra basen, och dra ' +
                'i x-markören för att jämföra kurvorna i en punkt.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        // Steg 1: f(x) och f'(x) sida vid sida
        var formelRow = document.createElement('div');
        formelRow.style.display = 'flex';
        formelRow.style.flexWrap = 'wrap';
        formelRow.style.justifyContent = 'center';
        formelRow.style.gap = '22px';
        formelRow.style.marginTop = '8px';
        card.appendChild(formelRow);

        var formelF = document.createElement('div');
        formelF.className = 'lab-vis-formel';
        formelF.style.color = COL.curve;
        formelF.style.marginTop = '0';
        formelRow.appendChild(formelF);

        var formelFp = document.createElement('div');
        formelFp.className = 'lab-vis-formel';
        formelFp.style.color = COL.tangent;
        formelFp.style.marginTop = '0';
        formelRow.appendChild(formelFp);

        // Steg 2: kvoten
        var formelKvot = document.createElement('div');
        formelKvot.className = 'lab-vis-formel';
        formelKvot.style.color = COL.accent;
        card.appendChild(formelKvot);

        // Steg 3: talet e + sambandet f'(x) = aˣ · ln a
        var formelE = document.createElement('div');
        formelE.className = 'lab-vis-formel';
        formelE.style.color = COL.axis;
        card.appendChild(formelE);

        var formelDeriv = document.createElement('div');
        formelDeriv.className = 'lab-vis-formel';
        formelDeriv.style.color = COL.axis;
        card.appendChild(formelDeriv);

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
            { n: 1, label: '1 · Jämför kurvorna' },
            { n: 2, label: '2 · Ringa in' },
            { n: 3, label: '3 · Talet e' }
        ];
        var INSTR = {
            1: 'Blå kurva är <em>f</em>(<em>x</em>) = <em>a</em><sup><em>x</em></sup>, röd ' +
               'streckad är dess derivata. Finns det en bas <em>a</em> där de två kurvorna ' +
               'är <strong>exakt</strong> samma kurva? Är den närmare 2 eller 3? Dra i ' +
               '<em>a</em>-glidaren och jämför vid <em>x</em>-markören (dra även den).',
            2: 'Kvoten mellan derivatan och funktionen — <em>f</em>′(<em>x</em>) delat med ' +
               '<em>f</em>(<em>x</em>) — är densamma oavsett var du sätter <em>x</em>-' +
               'markören. Flytta markören och se att kvoten står stilla. Uppdrag: dra ' +
               '<em>a</em> tills kvoten blir exakt 1.',
            3: 'Basen du letade efter kallas <em>e</em>. Sambandet <em>f</em>′(<em>x</em>) = ' +
               '<em>a</em><sup><em>x</em></sup> · ln <em>a</em> gäller för alla baser — se ' +
               'vad ln <em>a</em> blir när <em>a</em> = <em>e</em>. Tryck på knappen för att ' +
               'snäppa <em>a</em> till exakt <em>e</em>.'
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
        legend.appendChild(legendItem(COL.curve, '<em>f</em>(<em>x</em>) = <em>a</em><sup><em>x</em></sup>'));
        legend.appendChild(legendItem(COL.tangent, '<em>f</em>′(<em>x</em>) — derivatan'));

        // ── Knapp: sätt a = e (steg 3) ──────────────────────────────────────
        var snapBtn = document.createElement('button');
        snapBtn.type = 'button';
        snapBtn.className = 'lab-btn';
        snapBtn.textContent = 'Sätt a = e';
        snapBtn.addEventListener('click', function () {
            state.a = Math.E;
            rowA.sync();
            update();
        });
        actions.appendChild(snapBtn);

        // ── Glidare (a och x-markör) ──────────────────────────────────────
        function makeRow(name, min, max, step, get, set, accentColor) {
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
                slider.style.background = 'linear-gradient(to right, ' + accentColor + ' 0%, ' +
                    accentColor + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        var rowA = makeRow('a', A_MIN, A_MAX, A_STEP,
            function () { return state.a; },
            function (v) { state.a = v; },
            COL.accent);
        var rowX = makeRow('x', XM_MIN, XM_MAX, XM_STEP,
            function () { return state.xMark; },
            function (v) { state.xMark = v; },
            COL.axis);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.a = 2; state.xMark = 1; state.step = 1;
            rowA.sync(); rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dra x-markören direkt i scenen ──────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = toWorldX(e.clientX);
            state.xMark = clampNum(Math.round(xw / XM_STEP) * XM_STEP, XM_MIN, XM_MAX);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita scenen ───────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, xm = state.xMark;
            var axisY = Y(0), axisX = X(0);
            var i;

            // Rutnät
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 2; i <= 10; i += 2) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            var arrowTipY = T - 4, arrowBaseY = T + 6;
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: axisY, x2: axisX, y2: arrowBaseY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + arrowTipY + ' ' + (axisX - 4.5) + ',' + arrowBaseY + ' ' + (axisX + 4.5) + ',' + arrowBaseY, fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: arrowTipY + 8, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (hoppar över origo, som redan markeras av axlarna)
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                if (i === 0) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (i = 2; i <= 10; i += 2) {
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            // Klippram för kurvor + markör (så att branta grenar bara klipps
            // bort i stället för att sticka ut ur scenen)
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            function buildPath(fn) {
                var d = '', penDown = false, N = 220, j, xv, yv;
                for (j = 0; j <= N; j++) {
                    xv = XMIN + (XMAX - XMIN) * j / N;
                    yv = fn(xv);
                    if (yv <= YMAX + 3 && yv >= YMIN - 3) {
                        d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                        penDown = true;
                    } else penDown = false;
                }
                return d;
            }

            // Kurvan f(x) = aˣ (blå, heldragen)
            g.appendChild(svgEl('path', {
                d: buildPath(function (x) { return Math.pow(a, x); }),
                fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));
            // Derivatan f'(x) = aˣ · ln a (röd, streckad)
            g.appendChild(svgEl('path', {
                d: buildPath(function (x) { return Math.log(a) * Math.pow(a, x); }),
                fill: 'none', stroke: COL.tangent, 'stroke-width': 2.2, 'stroke-dasharray': '7 5',
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // x-markören: lodrät streckad linje upp till kurvorna + prickar
            var fVal = f(xm), fpVal = fprime(xm);
            var topWorld = Math.min(Math.max(fVal, fpVal), YMAX);
            g.appendChild(svgEl('line', {
                x1: X(xm), y1: Y(0), x2: X(xm), y2: Y(topWorld),
                stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '4 3'
            }));
            if (fVal <= YMAX) g.appendChild(svgEl('circle', { cx: X(xm), cy: Y(fVal), r: 4.5, fill: COL.curve }));
            if (fpVal <= YMAX) g.appendChild(svgEl('circle', { cx: X(xm), cy: Y(fpVal), r: 4.5, fill: COL.tangent }));

            // Draghandtag för x-markören (på x-axeln) + generös träffyta
            svg.appendChild(svgEl('circle', { cx: X(xm), cy: axisY, r: 5, fill: COL.axis }));
            var hit = svgEl('circle', { cx: X(xm), cy: axisY, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, xm = state.xMark;
            var fVal = f(xm), fpVal = fprime(xm);
            var lnA = Math.log(a);
            var xT = fmtTex(xm, 2), fT = fmtTex(fVal, 2), fpT = fmtTex(fpVal, 2);
            var aT = fmtTex(a, 2), lnAT = fmtTex(lnA, 2);

            if (state.step === 1) {
                katexInto(formelF, 'f(' + xT + ') = ' + fT);
                katexInto(formelFp, "f'(" + xT + ') = ' + fpT);
            }
            if (state.step === 2) {
                var kvotT = fmtTex(fpVal / fVal, 2);
                katexInto(formelKvot,
                    '\\dfrac{f\'(' + xT + ')}{f(' + xT + ')} = \\dfrac{' + fpT + '}{' + fT + '} = ' + kvotT);
            }
            if (state.step === 3) {
                katexInto(formelE, 'e = 2{,}7182818\\ldots \\approx 2{,}72');
                katexInto(formelDeriv,
                    "f'(x) = " + aT + '^{x} \\cdot \\ln ' + aT + ' = ' + aT + '^{x} \\cdot ' + lnAT);
            }
        }

        // ── Notismeddelande (kontextuellt per steg) ─────────────────────────
        function updateNote() {
            var lnA = Math.log(state.a);
            if (state.step === 1) {
                note.style.color = '';
                if (lnA < 0.985) {
                    note.innerHTML = 'Den röda kurvan (derivatan) ligger <strong>under</strong> den blå — lutningen är ännu för liten.';
                } else if (lnA > 1.015) {
                    note.innerHTML = 'Den röda kurvan (derivatan) ligger <strong>över</strong> den blå — lutningen är nu för stor.';
                } else {
                    note.innerHTML = 'De två kurvorna ligger nästan exakt på varandra!';
                }
            } else if (state.step === 2) {
                if (Math.abs(lnA - 1) < 0.01) {
                    note.style.color = COL.success;
                    note.innerHTML = 'Du hittade basen! <em>a</em> ≈ 2,72 — talet kallas <em>e</em>.';
                } else {
                    note.style.color = '';
                    note.innerHTML = 'Kvoten är just nu ' + fmtDisp(lnA, 2) + ' — ' +
                        (lnA < 1 ? 'mindre än 1, prova en <strong>större</strong> bas.' : 'större än 1, prova en <strong>mindre</strong> bas.');
                }
            } else {
                if (Math.abs(state.a - Math.E) < 0.005) {
                    note.style.color = COL.success;
                    note.innerHTML = 'Nu sammanfaller kurvorna exakt — <em>f</em>(<em>x</em>) = <em>f</em>′(<em>x</em>) för alla <em>x</em>.';
                } else {
                    note.style.color = '';
                    note.innerHTML = 'Tryck på knappen för att se vad som händer när <em>a</em> = <em>e</em>.';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            formelRow.style.display = state.step === 1 ? '' : 'none';
            formelKvot.style.display = state.step === 2 ? '' : 'none';
            formelE.style.display = state.step === 3 ? '' : 'none';
            formelDeriv.style.display = state.step === 3 ? '' : 'none';
            actions.style.display = state.step === 3 ? '' : 'none';
            drawScene();
            updateFormulas();
            updateNote();
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
    window.VISUALISERINGAR['ma3c-3.4'] = api;
    window.VISUALISERINGAR['ma3c-3.5'] = api;
})();
