/* ma3c-6.7.js — visualisering: "Cosinussatsen = Pythagoras + korrektion".
 *
 * Kärninsikt: cosinussatsen c² = a² + b² − 2ab·cos C ÄR Pythagoras sats plus
 * en korrektionsterm. Dra vinkeln C genom 90° och se korrektionen krympa
 * till noll, byta tecken, och Pythagoras "blinka fram" som specialfallet
 * C = 90° (då cos C = 0).
 *
 * Beteckningar speglar teorigenomgången ma3c-6.7.md exakt: triangel ABC,
 * sida a motstående A, b motstående B, c motstående C; cosinussatsen
 * c² = a² + b² − 2ab·cos C. Steg 3 spelar upp genomgångens Exempel 1
 * (a = 19, b = 17, C = 34° ⟹ c ≈ 10,7).
 *
 * Tre steg:
 *   1. Håller Pythagoras?  — gissa-först. Triangel med dragbar vinkel C
 *                            (glidare + dra i hörnet A). Jämför a²+b² med
 *                            c² live (stapeldiagram). Rät-vinkel-symbol vid
 *                            C = 90°, annars vinkelbåge med gradtal.
 *   2. Korrektionstermen   — samma scen, nu visas differensen a²+b² − c²
 *                            som en pil i stapeldiagrammet: röd "tas bort"
 *                            (spetsig vinkel) eller grön "läggs till"
 *                            (trubbig vinkel). Full formel + balansrad
 *                            med insatta tal.
 *   3. Använd satsen        — snabbknapp snappar glidarna till genomgångens
 *                            Exempel 1; lösningen (c² = ... ⟺ c = √... ≈ c)
 *                            byggs upp steg för steg, exakt som i md-filen.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-4.5.js). API: window.VISUALISERINGAR['ma3c-6.7'].
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
    // Text med kursiva variabler: delar märkta med * kursiveras.
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
    function svgText(attrs, text) {
        var el = svgEl('text', attrs);
        el.textContent = text;
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

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        aSq: '#2563c9', aSqFill: 'rgba(37,99,201,0.20)',
        bSq: '#7c5cbf', bSqFill: 'rgba(124,92,191,0.20)',
        cSq: '#c1622c', cSqFill: 'rgba(193,98,44,0.20)',
        equal: '#3f8f5c', equalFill: 'rgba(63,143,92,0.22)',
        minus: '#c8324a',
        plus: '#3f8f5c'
    };

    var W = 560, H = 340;
    var W2 = 560, H2 = 232, L2 = 40, R2 = 40, T2 = 22, B2 = 54;
    var XA = 170, XC = 390, BW = 110;
    var XBRACKET = (XA + BW / 2 + XC - BW / 2) / 2;

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var A_MIN = 2, A_MAX = 20, A_STEP = 1;
        var B_MIN = 2, B_MAX = 20, B_STEP = 1;
        var ANG_MIN = 25, ANG_MAX = 155, ANG_STEP = 1;
        var state = { step: 1, a: 5, b: 4, angleC: 70, guess: null };

        // ── Geometri: triangeln (C i origo, matchar teorins ABC-märkning) ──
        // Sida a = CB (motstående A), sida b = CA (motstående B),
        // sida c = AB (motstående C, beräknas med cosinussatsen).
        function triangleGeom(a, b, angleCdeg) {
            var angC = angleCdeg * Math.PI / 180;
            var thetaB = Math.PI;               // CB pekar åt vänster
            var thetaA = Math.PI - angC;         // CA — vinkeln angleC från CB
            var C = [0, 0];
            var B = [a * Math.cos(thetaB), a * Math.sin(thetaB)];
            var A = [b * Math.cos(thetaA), b * Math.sin(thetaA)];
            var c = Math.sqrt(Math.max(a * a + b * b - 2 * a * b * Math.cos(angC), 0));
            return { A: A, B: B, C: C, c: c };
        }

        function computeAll() {
            var a = state.a, b = state.b, angleC = state.angleC;
            var rad = angleC * Math.PI / 180;
            var aSq = a * a, bSq = b * b, sumSq = aSq + bSq;
            var corr = 2 * a * b * Math.cos(rad);        // = 2ab·cos C
            var cSq = Math.max(sumSq - corr, 0);
            var c = Math.sqrt(cSq);
            var equalNow = Math.abs(angleC - 90) < 0.05;
            return {
                a: a, b: b, angleC: angleC, aSq: aSq, bSq: bSq, sumSq: sumSq,
                corr: corr, cSq: cSq, c: c, equalNow: equalNow
            };
        }

        // ── Anpassa world-rum till pixelruta ────────────────────────────
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

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Cosinussatsen = Pythagoras + korrektion';
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
            'aria-label': 'Interaktiv triangel ABC med sidorna a, b och c samt ' +
                'vinkeln C mellan sidorna a och b. Dra i hörnet A eller glidaren ' +
                'för C för att ändra vinkeln.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var barsHeading = document.createElement('div');
        barsHeading.style.fontSize = '13px';
        barsHeading.style.fontWeight = '600';
        barsHeading.style.color = COL.inkSoft;
        barsHeading.style.margin = '12px 2px 4px';
        barsHeading.textContent = 'Areabalansen: a² + b² mot c²';
        card.appendChild(barsHeading);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Stapeldiagram som jämför a² plus b² med c². Vid rät ' +
                'vinkel är staplarna lika höga; annars skiljer de med ' +
                'korrektionstermen 2ab cos C.'
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

        var formelC = document.createElement('div');
        formelC.className = 'lab-vis-formel';
        card.appendChild(formelC);

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
            { n: 1, label: '1 · Håller Pythagoras?' },
            { n: 2, label: '2 · Korrektionstermen' },
            { n: 3, label: '3 · Använd satsen' }
        ];
        var INSTR = {
            1: 'Gäller <em>a</em>² + <em>b</em>² = <em>c</em>² i alla trianglar? Gissa ' +
               'först — dra sedan i hörnet <em>A</em> (eller <em>C</em>-glidaren) och se ' +
               'staplarna för <em>a</em>²+<em>b</em>² och <em>c</em>² ändras.',
            2: 'Differensen mellan staplarna är korrektionstermen <em>2ab</em>·cos <em>C</em>. ' +
               'Den <strong>dras bort</strong> (röd pil) när vinkeln är spetsig, är ' +
               '<strong>noll</strong> vid 90° och <strong>läggs till</strong> (grön pil) ' +
               'när vinkeln är trubbig.',
            3: 'Ett exempel från genomgången: sidorna <em>a</em> och <em>b</em> samt den ' +
               'mellanliggande vinkeln <em>C</em> är kända — cosinussatsen ger sidan ' +
               '<em>c</em>. Tryck på exempel-knappen, eller lös en egen triangel med dina ' +
               'egna glidarvärden.'
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
        function buildLegend(calc) {
            legend.innerHTML = '';
            legend.appendChild(legendItem(COL.aSq, '<em>a</em>²'));
            legend.appendChild(legendItem(COL.bSq, '<em>b</em>²'));
            legend.appendChild(legendItem(calc.equalNow ? COL.equal : COL.cSq, '<em>c</em>²'));
            if (state.step >= 2) {
                legend.appendChild(legendItem(COL.minus, 'korrektion (tas bort)'));
                legend.appendChild(legendItem(COL.plus, 'korrektion (läggs till)'));
            }
        }

        // ── Gissa-först (steg 1) ─────────────────────────────────────────
        var guessYes = document.createElement('button');
        guessYes.type = 'button';
        guessYes.className = 'lab-btn';
        guessYes.textContent = 'Ja, alltid';
        guessYes.addEventListener('click', function () { state.guess = 'ja'; update(); });
        actions.appendChild(guessYes);

        var guessNo = document.createElement('button');
        guessNo.type = 'button';
        guessNo.className = 'lab-btn';
        guessNo.textContent = 'Nej, bara ibland';
        guessNo.addEventListener('click', function () { state.guess = 'nej'; update(); });
        actions.appendChild(guessNo);

        // ── Sätt 90° (steg 1–2) ──────────────────────────────────────────
        var snap90Btn = document.createElement('button');
        snap90Btn.type = 'button';
        snap90Btn.className = 'lab-btn';
        snap90Btn.textContent = 'Sätt vinkeln till 90°';
        snap90Btn.addEventListener('click', function () {
            stopDrag();
            state.angleC = 90;
            rowAngle.sync();
            update();
        });
        actions.appendChild(snap90Btn);

        // ── Exempel (steg 3) ─────────────────────────────────────────────
        var exampleBtn = document.createElement('button');
        exampleBtn.type = 'button';
        exampleBtn.className = 'lab-btn';
        exampleBtn.textContent = 'Exempel: a = 19, b = 17, C = 34°';
        exampleBtn.addEventListener('click', function () {
            state.a = 19; state.b = 17; state.angleC = 34;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        actions.appendChild(exampleBtn);

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
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            var decimals = step < 0.05 ? 2 : step < 1 ? 1 : 0;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.ink + ' 0%, ' +
                    COL.ink + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopDrag();
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
            function () { return state.a; }, function (v) { state.a = v; });
        var rowB = makeRow('b', B_MIN, B_MAX, B_STEP,
            function () { return state.b; }, function (v) { state.b = v; });
        var rowAngle = makeRow('vinkeln C', ANG_MIN, ANG_MAX, ANG_STEP,
            function () { return state.angleC; }, function (v) { state.angleC = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopDrag();
            state.a = 5; state.b = 4; state.angleC = 70; state.guess = null;
            rowA.sync(); rowB.sync(); rowAngle.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbart hörn A i triangelscenen (ändrar vinkeln C) ────────────
        var draggingAngle = false;
        var lastCpx = null, lastBpx = null;
        function stopDrag() { draggingAngle = false; }
        function toSvgPt(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return [(clientX - r.left) * W / r.width, (clientY - r.top) * H / r.height];
        }
        function angleBetweenPx(v1, v2) {
            var a1 = Math.atan2(v1[1], v1[0]), a2 = Math.atan2(v2[1], v2[0]);
            var diff = a2 - a1;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            while (diff < -Math.PI) diff += 2 * Math.PI;
            return Math.abs(diff) * 180 / Math.PI;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!draggingAngle || !lastCpx || !lastBpx) return;
            var pt = toSvgPt(e.clientX, e.clientY);
            var newAngle = angleBetweenPx(subv(lastBpx, lastCpx), subv(pt, lastCpx));
            state.angleC = clampNum(Math.round(newAngle / ANG_STEP) * ANG_STEP, ANG_MIN, ANG_MAX);
            rowAngle.sync();
            update();
        });
        svg.addEventListener('pointerup', stopDrag);
        svg.addEventListener('pointercancel', stopDrag);

        // ── Vinkelmarkör vid C: rät-vinkel-symbol eller båge + gradtal ──────
        function drawAngleMarker(Cpx, Bpx, Apx, angleC) {
            var bDir = normv(subv(Bpx, Cpx));
            var aDir = normv(subv(Apx, Cpx));
            if (Math.abs(angleC - 90) < 0.4) {
                var s = 14;
                var p1 = [Cpx[0] + bDir[0] * s, Cpx[1] + bDir[1] * s];
                var p3 = [Cpx[0] + aDir[0] * s, Cpx[1] + aDir[1] * s];
                var p2 = [p1[0] + aDir[0] * s, p1[1] + aDir[1] * s];
                svg.appendChild(svgEl('polyline', {
                    points: p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' +
                        p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + ' ' +
                        p3[0].toFixed(1) + ',' + p3[1].toFixed(1),
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.4
                }));
            } else {
                var rArc = 24;
                var q1 = [Cpx[0] + bDir[0] * rArc, Cpx[1] + bDir[1] * rArc];
                var q2 = [Cpx[0] + aDir[0] * rArc, Cpx[1] + aDir[1] * rArc];
                var ang1 = Math.atan2(bDir[1], bDir[0]), ang2 = Math.atan2(aDir[1], aDir[0]);
                var diff = ang2 - ang1;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                var sweep = diff > 0 ? 1 : 0;
                var d = 'M ' + q1[0].toFixed(1) + ' ' + q1[1].toFixed(1) + ' A ' + rArc + ' ' + rArc +
                    ' 0 0 ' + sweep + ' ' + q2[0].toFixed(1) + ' ' + q2[1].toFixed(1);
                svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));
                var bisAng = ang1 + diff / 2;
                var lr = rArc + 16;
                var lx = Cpx[0] + Math.cos(bisAng) * lr, ly = Cpx[1] + Math.sin(bisAng) * lr;
                svg.appendChild(svgText(
                    { x: lx, y: ly + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink },
                    fmt(angleC, 0) + '°'));
            }
        }

        // ── Rita triangelscenen ─────────────────────────────────────────
        function drawTriangleScene(calc) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = calc.a, b = calc.b, angleC = calc.angleC, c = calc.c;
            var g = triangleGeom(a, b, angleC);
            var fit = makeFit([g.A, g.B, g.C], 0, 0, W, H, 56);
            var Apx = fit.toPx(g.A), Bpx = fit.toPx(g.B), Cpx = fit.toPx(g.C);

            svg.appendChild(svgEl('polygon', {
                points: Apx[0].toFixed(1) + ',' + Apx[1].toFixed(1) + ' ' +
                    Bpx[0].toFixed(1) + ',' + Bpx[1].toFixed(1) + ' ' +
                    Cpx[0].toFixed(1) + ',' + Cpx[1].toFixed(1),
                fill: 'rgba(31,37,48,0.05)', stroke: COL.ink, 'stroke-width': 2
            }));

            // Sidetiketter (variabel kursiv + värde rakt), i fri yta utanför sidan.
            // Riktningen är den EDGE-lokala normalen (vinkelrät mot sidan, bort
            // från den tredje hörnpunkten) — robust även för smala "kniv"-
            // trianglar där en centroid-baserad riktning kan hamna för nära
            // en annan etikett.
            function placeSide(letter, val, p1, p2, other) {
                var edge = subv(p2, p1);
                var n = normv([edge[1], -edge[0]]);
                var mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
                var toOther = subv(other, mid);
                if (n[0] * toOther[0] + n[1] * toOther[1] > 0) n = [-n[0], -n[1]];
                var lx = mid[0] + n[0] * 24, ly = mid[1] + n[1] * 24;
                svg.appendChild(svgVarText(
                    { x: lx, y: ly + 4, 'font-size': 13.5, 'text-anchor': 'middle', fill: COL.ink },
                    ['*' + letter, ' = ' + fmt(val, letter === 'c' ? 1 : 0)]));
            }
            placeSide('a', a, Bpx, Cpx, Apx);
            placeSide('b', b, Cpx, Apx, Bpx);
            placeSide('c', c, Apx, Bpx, Cpx);

            // Hörnetiketter (raka, som i genomgångens figur). Riktningen är
            // motsatt hörnets EGEN bisektris (summan av enhetsvektorerna mot
            // de två andra hörnen) — lokal per hörn, robust för alla former.
            function placeVertex(letter, p, other1, other2) {
                var d1 = normv(subv(other1, p)), d2 = normv(subv(other2, p));
                var bis = normv([d1[0] + d2[0], d1[1] + d2[1]]);
                var lx = p[0] - bis[0] * 20, ly = p[1] - bis[1] * 20;
                svg.appendChild(svgText(
                    { x: lx, y: ly + 5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.ink }, letter));
            }
            placeVertex('A', Apx, Bpx, Cpx);
            placeVertex('B', Bpx, Apx, Cpx);
            placeVertex('C', Cpx, Apx, Bpx);

            drawAngleMarker(Cpx, Bpx, Apx, angleC);

            // Dragbart hörn A
            lastCpx = Cpx; lastBpx = Bpx;
            svg.appendChild(svgEl('circle', { cx: Apx[0], cy: Apx[1], r: 4.5, fill: COL.ink }));
            var hit = svgEl('circle', { cx: Apx[0], cy: Apx[1], r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopDrag(); draggingAngle = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
            svg.appendChild(svgEl('circle', { cx: Bpx[0], cy: Bpx[1], r: 3, fill: COL.ink }));
            svg.appendChild(svgEl('circle', { cx: Cpx[0], cy: Cpx[1], r: 3, fill: COL.ink }));
        }

        // ── Rita stapeldiagrammet (areabalansen) ───────────────────────────
        function drawBarsScene(calc) {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var baseline = H2 - B2;
            var innerH = baseline - T2;
            var domainMax = Math.max(calc.sumSq, calc.cSq, 1) * 1.18;
            var scaleY = innerH / domainMax;

            svg2.appendChild(svgEl('line', {
                x1: L2, y1: baseline, x2: W2 - R2, y2: baseline, stroke: COL.ink, 'stroke-width': 1.4
            }));

            var topLeftY = baseline - calc.sumSq * scaleY;
            var topRightY = baseline - calc.cSq * scaleY;
            var aTopY = baseline - calc.aSq * scaleY;

            // Vänster stapel: a² (nedre) + b² (övre, staplad)
            svg2.appendChild(svgEl('rect', {
                x: XA - BW / 2, y: aTopY, width: BW, height: baseline - aTopY,
                fill: COL.aSqFill, stroke: COL.aSq, 'stroke-width': 1.6
            }));
            svg2.appendChild(svgEl('rect', {
                x: XA - BW / 2, y: topLeftY, width: BW, height: aTopY - topLeftY,
                fill: COL.bSqFill, stroke: COL.bSq, 'stroke-width': 1.6
            }));
            // Höger stapel: c²
            var cColor = calc.equalNow ? COL.equal : COL.cSq;
            var cFill = calc.equalNow ? COL.equalFill : COL.cSqFill;
            svg2.appendChild(svgEl('rect', {
                x: XC - BW / 2, y: topRightY, width: BW, height: baseline - topRightY,
                fill: cFill, stroke: cColor, 'stroke-width': 1.6
            }));

            // Värdeetiketter inuti/ovanför staplarna (fri yta, ej i korrektionszonen)
            function segLabel(cx, yTop, yBot, parts, color) {
                if (yBot - yTop < 22) return;
                svg2.appendChild(svgVarText(
                    { x: cx, y: (yTop + yBot) / 2 + 4, 'font-size': 12, 'text-anchor': 'middle', fill: color },
                    parts));
            }
            segLabel(XA, aTopY, baseline, ['*a', '² = ' + fmt(calc.aSq, 0)], COL.aSq);
            segLabel(XA, topLeftY, aTopY, ['*b', '² = ' + fmt(calc.bSq, 0)], COL.bSq);
            segLabel(XC, topRightY, baseline, ['*c', '² ≈ ' + fmt(calc.cSq, 1)], cColor);

            svg2.appendChild(svgVarText(
                { x: XA, y: Math.max(topLeftY - 10, T2 + 10), 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink },
                ['*a', '² + ', '*b', '² = ' + fmt(calc.sumSq, 0)]));
            svg2.appendChild(svgVarText(
                { x: XC, y: Math.max(topRightY - 10, T2 + 10), 'font-size': 13, 'text-anchor': 'middle', fill: cColor },
                ['*c', '² ≈ ' + fmt(calc.cSq, 1)]));

            // Axeltexter under staplarna
            svg2.appendChild(svgVarText(
                { x: XA, y: baseline + 20, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.inkSoft },
                ['*a', '² + ', '*b', '²']));
            svg2.appendChild(svgVarText(
                { x: XC, y: baseline + 20, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.inkSoft },
                ['*c', '²']));

            // Korrektionspil mellan staplarnas toppar (steg 2+)
            if (state.step >= 2) {
                if (calc.equalNow) {
                    svg2.appendChild(svgEl('line', {
                        x1: XA + BW / 2, y1: topLeftY, x2: XC - BW / 2, y2: topRightY,
                        stroke: COL.equal, 'stroke-width': 1.6, 'stroke-dasharray': '5 4'
                    }));
                    svg2.appendChild(svgText(
                        { x: XBRACKET, y: topLeftY - 10, 'font-size': 13, 'text-anchor': 'middle', fill: COL.equal, 'font-weight': '700' },
                        '0'));
                } else {
                    var yTop = Math.min(topLeftY, topRightY), yBot = Math.max(topLeftY, topRightY);
                    var arrColor = calc.sumSq > calc.cSq ? COL.minus : COL.plus;
                    svg2.appendChild(svgEl('line', {
                        x1: XA + BW / 2, y1: topLeftY, x2: XBRACKET, y2: topLeftY,
                        stroke: COL.dash, 'stroke-width': 1.1, 'stroke-dasharray': '3 3'
                    }));
                    svg2.appendChild(svgEl('line', {
                        x1: XC - BW / 2, y1: topRightY, x2: XBRACKET, y2: topRightY,
                        stroke: COL.dash, 'stroke-width': 1.1, 'stroke-dasharray': '3 3'
                    }));
                    svg2.appendChild(svgEl('line', {
                        x1: XBRACKET, y1: yTop, x2: XBRACKET, y2: yBot,
                        stroke: arrColor, 'stroke-width': 1.8
                    }));
                    if (yBot - yTop >= 18) {
                        svg2.appendChild(svgEl('polygon', {
                            points: XBRACKET + ',' + yTop + ' ' + (XBRACKET - 4) + ',' + (yTop + 7) + ' ' + (XBRACKET + 4) + ',' + (yTop + 7),
                            fill: arrColor
                        }));
                        svg2.appendChild(svgEl('polygon', {
                            points: XBRACKET + ',' + yBot + ' ' + (XBRACKET - 4) + ',' + (yBot - 7) + ' ' + (XBRACKET + 4) + ',' + (yBot - 7),
                            fill: arrColor
                        }));
                    }
                    var signChar = calc.sumSq > calc.cSq ? '−' : '+';
                    svg2.appendChild(svgText(
                        { x: XBRACKET + 11, y: (yTop + yBot) / 2 + 5, 'font-size': 16, 'text-anchor': 'start', fill: arrColor, 'font-weight': '700' },
                        signChar));
                }
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas(calc) {
            var aT = fmtTex(calc.a, 0), bT = fmtTex(calc.b, 0), angT = fmtTex(calc.angleC, 0);
            var aSqT = fmtTex(calc.aSq, 0), bSqT = fmtTex(calc.bSq, 0), sumT = fmtTex(calc.sumSq, 0);
            var cSqT = fmtTex(calc.cSq, 1), cT = fmtTex(calc.c, 1);
            var corrT = fmtTex(calc.corr, 1), absCorrT = fmtTex(Math.abs(calc.corr), 1);

            if (state.step === 1) {
                var op = calc.equalNow ? '=' : (calc.sumSq > calc.cSq ? '>' : '<');
                katexInto(formelA,
                    '\\textcolor{' + COL.aSq + '}{a^2} + \\textcolor{' + COL.bSq + '}{b^2} \\; ' + op +
                    ' \\; \\textcolor{' + (calc.equalNow ? COL.equal : COL.cSq) + '}{c^2}');
                katexInto(formelB,
                    aT + '^2 + ' + bT + '^2 = ' + aSqT + ' + ' + bSqT + ' = ' + sumT + ' \\; ' + op + ' \\; ' + cSqT + ' = c^2');
                var guessMsg = '';
                if (state.guess === 'ja') guessMsg = 'Testa att dra vinkeln bort från 90° — du ser att likheten då brister. ';
                if (state.guess === 'nej') guessMsg = 'Rätt tänkt! ';
                var stateMsg = calc.equalNow
                    ? 'Vinkeln är exakt 90° — här stämmer <em>a</em>² + <em>b</em>² = <em>c</em>² precis. Pythagoras sats är specialfallet <em>C</em> = 90°.'
                    : (calc.angleC < 90
                        ? 'Vinkeln är spetsig (mindre än 90°): <em>a</em>² + <em>b</em>² &gt; <em>c</em>². Pythagoras stämmer inte här.'
                        : 'Vinkeln är trubbig (större än 90°): <em>a</em>² + <em>b</em>² &lt; <em>c</em>². Pythagoras stämmer inte här.');
                note.innerHTML = guessMsg + stateMsg;
            } else if (state.step === 2) {
                var cosColor = calc.equalNow ? COL.equal : (calc.corr > 0 ? COL.minus : COL.plus);
                katexInto(formelA,
                    'c^2 = \\textcolor{' + COL.aSq + '}{a^2} + \\textcolor{' + COL.bSq + '}{b^2} - \\textcolor{' + cosColor + '}{2ab\\cos C}');
                if (calc.equalNow) {
                    katexInto(formelB, aSqT + ' + ' + bSqT + ' = ' + sumT + ' = c^2 \\quad(\\cos 90^\\circ = 0)');
                    note.innerHTML = 'Vid <em>C</em> = 90° är cos <em>C</em> = 0, så hela korrektionstermen försvinner — ' +
                        'kvar blir precis Pythagoras sats!';
                } else if (calc.corr > 0) {
                    katexInto(formelB,
                        aSqT + ' + ' + bSqT + ' - ' + corrT + ' = ' + sumT + ' - ' + corrT + ' = ' + cSqT + ' = c^2');
                    note.innerHTML = 'Vinkeln är spetsig, så cos <em>C</em> &gt; 0: termen <em>2ab</em>·cos <em>C</em> = ' +
                        fmt(calc.corr, 1) + ' är positiv och <strong>dras bort</strong> — se den röda pilen.';
                } else {
                    katexInto(formelB,
                        aSqT + ' + ' + bSqT + ' + ' + absCorrT + ' = ' + sumT + ' + ' + absCorrT + ' = ' + cSqT + ' = c^2');
                    note.innerHTML = 'Vinkeln är trubbig, så cos <em>C</em> &lt; 0: termen <em>2ab</em>·cos <em>C</em> = ' +
                        fmt(calc.corr, 1) + ' är negativ, och att dra bort ett negativt tal betyder att korrektionen ' +
                        '<strong>läggs till</strong> — se den gröna pilen.';
                }
            } else {
                katexInto(formelA, 'c^2 = a^2 + b^2 - 2ab\\cos C');
                // Uppdelad i två rader (i stället för genomgångens enda långa
                // ⟺-kedja) så att svaret aldrig klipps av kortets bredd.
                katexInto(formelB,
                    'c^2 = ' + aT + '^2 + ' + bT + '^2 - 2 \\cdot ' + aT + ' \\cdot ' + bT + '\\cos ' + angT + '^\\circ = ' + cSqT);
                katexInto(formelC, 'c = \\sqrt{' + cSqT + '} \\approx ' + cT);
                var isExample = state.a === 19 && state.b === 17 && state.angleC === 34;
                note.innerHTML = 'Svar: <strong><em>c</em> ≈ ' + fmt(calc.c, 1) + '</strong>' +
                    (isExample
                        ? ' — precis som i genomgångens Exempel 1.'
                        : '. Prova andra värden på <em>a</em>, <em>b</em> eller <em>C</em> och se lösningen uppdateras.');
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            var calc = computeAll();
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            guessYes.style.display = state.step === 1 ? '' : 'none';
            guessNo.style.display = state.step === 1 ? '' : 'none';
            snap90Btn.style.display = state.step === 1 || state.step === 2 ? '' : 'none';
            exampleBtn.style.display = state.step === 3 ? '' : 'none';
            formelC.style.display = state.step === 3 ? '' : 'none';

            drawTriangleScene(calc);
            drawBarsScene(calc);
            buildLegend(calc);
            updateFormulas(calc);
        }

        update();

        return {
            destroy: function () {
                stopDrag();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma3c-6.7'] = { mount: mount };
})();
