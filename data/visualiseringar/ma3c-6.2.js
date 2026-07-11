/* ma3c-6.2.js — visualisering: "Enhetscirkeln rullas ut". Hör till
 * ma3c-6.2/ma4-1.2 (enhetscirkeln, definitionen av sin v/cos v), ma4-1.5
 * (radianer) och ma4-1.10 (sinus- och cosinusfunktionens graf).
 *
 * Kärninsikt: sin v och cos v är y- resp. x-koordinaten för en punkt på
 * enhetscirkeln, och sinuskurvan är cirkelrörelsen "rullad ut" längs en
 * axel. Radianer är den utrullade båglängden.
 *
 * Startläget är v = 60°, samma exempel som formelbladstabellen i ma4-1.2
 * (cos 60° = 0,5 exakt, sin 60° ≈ 0,87) — eleven kan "spela upp" exemplet.
 *
 * Tre steg (lager):
 *   1. Punkten på cirkeln — dra punkten, se v, (cos v, sin v), sin/cos
 *      som färgade segment i cirkeln.
 *   2. Kurvan rullas ut — grafen visas, sinus-/cosinuskurvan ritas fram
 *      till aktuell vinkel, vågrät hjälplinje kopplar cirkelns punkt till
 *      kurvans punkt.
 *   3. Radianer — bågen från 0 till v markeras (på cirkeln OCH på grafens
 *      x-axel som samma längd); x-axeln får både grad- och radianskala.
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
    // '=' om värdet är exakt (till given decimal), annars '\approx'.
    function chooseEq(value, decimals) {
        var scale = Math.pow(10, decimals);
        var rounded = Math.round(value * scale) / scale;
        return Math.abs(value - rounded) < 1e-6 ? '=' : '\\approx';
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
        track: 'rgba(15,22,32,0.22)',
        cos: '#2563c9',        // cos v — blå (vågrätt segment + kurva)
        sin: '#4a7d3a',        // sin v — grön (lodrätt segment + kurva)
        point: '#c8324a'       // dragbara punkten, hjälplinjen, radianbågen
    };

    // Exakta radianbråk för standardvinklar (grader → KaTeX-bråk av π).
    var DEG_FRAC = {
        0: '0', 30: '\\dfrac{\\pi}{6}', 45: '\\dfrac{\\pi}{4}', 60: '\\dfrac{\\pi}{3}',
        90: '\\dfrac{\\pi}{2}', 120: '\\dfrac{2\\pi}{3}', 135: '\\dfrac{3\\pi}{4}',
        150: '\\dfrac{5\\pi}{6}', 180: '\\pi', 210: '\\dfrac{7\\pi}{6}',
        225: '\\dfrac{5\\pi}{4}', 240: '\\dfrac{4\\pi}{3}', 270: '\\dfrac{3\\pi}{2}',
        300: '\\dfrac{5\\pi}{3}', 315: '\\dfrac{7\\pi}{4}', 330: '\\dfrac{11\\pi}{6}',
        360: '2\\pi'
    };

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { vDeg: 60, step: 1, showSin: true, showCos: false };
        var animId = null;

        // ── Geometri: cirkeln (vänster) ─────────────────────────────────
        var W = 560, H = 340;
        // viewBox har extra marginal till vänster (VBX < 0): när "sin v"-
        // etiketten hamnar till vänster om segmentets fot (fot nära cirkelns
        // vänsterkant, v nära 180°) sträcker sig texten annars utanför en
        // viewBox som börjar i x=0 och klipps.
        var VBX = -26, VBW = W - VBX;
        var CX = 110, CY = 190, R = 85;
        var RSMALL = 30; // liten vinkelbåge nära origo

        // ── Geometri: grafen (höger) ─────────────────────────────────────
        var GX0 = 232, GX1 = 540;
        var scaleX = (GX1 - GX0) / (2 * Math.PI);
        function GX(t) { return GX0 + t * scaleX; }
        function GY(v) { return CY - v * R; }

        function circlePoint(deg, radius) {
            var t = deg * Math.PI / 180;
            return { t: t, x: CX + radius * Math.cos(t), y: CY - radius * Math.sin(t) };
        }
        function pathFor(fn, tFrom, tTo, n) {
            var d = '';
            for (var i = 0; i <= n; i++) {
                var ti = tFrom + (tTo - tFrom) * i / n;
                var xi = GX(ti), yi = GY(fn(ti));
                d += (i === 0 ? 'M' : 'L') + xi.toFixed(1) + ' ' + yi.toFixed(1) + ' ';
            }
            return d;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Enhetscirkeln rullas ut';
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
            viewBox: VBX + ' 0 ' + VBW + ' ' + H,
            width: VBW, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Enhetscirkeln till vänster med en dragbar punkt vid ' +
                'vinkeln v. Till höger en graf där sinus- och cosinuskurvan ritas ' +
                'fram synkat med punktens läge. Dra punkten eller glidaren för att ' +
                'ändra v.'
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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Punkten på cirkeln' },
            { n: 2, label: '2 · Kurvan rullas ut' },
            { n: 3, label: '3 · Radianer' }
        ];
        var INSTR = {
            1: 'Dra punkten (eller <em>v</em>-glidaren) runt enhetscirkeln. ' +
               'Radien är alltid 1. Det gröna lodräta segmentet är <em>sin</em> <em>v</em>, ' +
               'det blå vågräta segmentet är <em>cos</em> <em>v</em> — punktens koordinater ' +
               'är alltså (<em>cos</em> <em>v</em>, <em>sin</em> <em>v</em>).',
            2: 'Nu rullas kurvan ut till höger. Den vågräta streckade linjen visar ' +
               'att punktens höjd på cirkeln är exakt samma höjd som kurvpunkten vid ' +
               '<em>x</em> = <em>v</em>. Grafens <em>x</em>-axel är inte cirkelns egen ' +
               '<em>x</em>-koordinat — det är vinkeln, uträtad till en rät linje. ' +
               'Kryssa i sin/cos för att jämföra kurvorna.',
            3: 'Bågen från 0 till <em>v</em> (rödmarkerad) är precis lika lång på ' +
               'cirkeln som på grafens <em>x</em>-axel — det är själva definitionen av ' +
               'en radian. Prova knappen "Rulla ut ett varv" och se hela sinuskurvan ' +
               'växa fram under ett helt varv.'
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
        var legSin = legendItem(COL.sin, '<em>sin</em> <em>v</em>');
        var legCos = legendItem(COL.cos, '<em>cos</em> <em>v</em>');
        var legArc = legendItem(COL.point, 'bågen = <em>v</em> rad');
        legend.appendChild(legSin);
        legend.appendChild(legCos);
        legend.appendChild(legArc);

        // ── Knappar/kryssrutor i actions-raden ─────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Rulla ut ett varv';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        function makeCheck(text, get, set) {
            var label = document.createElement('label');
            label.className = 'lab-graf-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = get();
            cb.addEventListener('change', function () {
                stopAnim();
                set(cb.checked);
                update();
            });
            label.appendChild(cb);
            var txt = document.createElement('span');
            txt.innerHTML = text;
            label.appendChild(txt);
            actions.appendChild(label);
            return { sync: function () { cb.checked = get(); } };
        }
        var checkSin = makeCheck('Visa <em>sin</em>-kurvan',
            function () { return state.showSin; }, function (v) { state.showSin = v; });
        var checkCos = makeCheck('Visa <em>cos</em>-kurvan',
            function () { return state.showCos; }, function (v) { state.showCos = v; });

        // ── Glidare (v i grader) ─────────────────────────────────────────
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
            slider.setAttribute('aria-label', 'Värdet på ' + name + ', i grader');
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name + ', i grader');
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.point + ' 0%, ' +
                    COL.point + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(Math.round(v), min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = String(get());
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { field.value = String(get()); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () {
                    slider.value = get();
                    field.value = String(get());
                    paint();
                }
            };
        }
        var rowV = makeRow('v (grader)', 0, 360, 1,
            function () { return state.vDeg; },
            function (v) { state.vDeg = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.vDeg = 60; state.step = 1; state.showSin = true; state.showCos = false;
            rowV.sync(); checkSin.sync(); checkCos.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: rulla ut ett varv ────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var T_MS = 4200, t0 = null;
            state.vDeg = 0; rowV.sync(); update();
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.vDeg = Math.round(p * 360);
                rowV.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragpunkt på cirkeln ──────────────────────────────────────────
        function toSvgXY(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return {
                x: VBX + (clientX - r.left) * VBW / r.width,
                y: (clientY - r.top) * H / r.height
            };
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var p = toSvgXY(e.clientX, e.clientY);
            var dx = p.x - CX, dy = CY - p.y;
            var deg = Math.atan2(dy, dx) * 180 / Math.PI;
            if (deg < 0) deg += 360;
            state.vDeg = Math.round(deg) % 360;
            rowV.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita scenen ───────────────────────────────────────────────────
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var vDeg = state.vDeg, t = vDeg * Math.PI / 180;
            var sinV = Math.sin(t), cosV = Math.cos(t);
            var P = circlePoint(vDeg, R);

            // ── Cirkelns rutnät/kant ──────────────────────────────────────
            svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: COL.axis, 'stroke-width': 1.5 }));

            // ── Cirkelns egna x/y-axlar (kort, lokalt) ────────────────────
            svg.appendChild(svgEl('line', { x1: 14, y1: CY, x2: CX + R + 20, y2: CY, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: (CX + R + 28) + ',' + CY + ' ' + (CX + R + 19) + ',' + (CY - 4.2) + ' ' + (CX + R + 19) + ',' + (CY + 4.2), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: CX, y1: CY + R + 16, x2: CX, y2: CY - R - 20, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: CX + ',' + (CY - R - 28) + ' ' + (CX - 4.2) + ',' + (CY - R - 19) + ' ' + (CX + 4.2) + ',' + (CY - R - 19), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: CX + R + 22, y: CY + 15, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: CX + 10, y: CY - R - 22, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // ── Radianbåge (steg 3): rödmarkerad del av cirkelns rand ─────
            if (state.step >= 3 && vDeg > 0.5) {
                var nArc = Math.max(2, Math.round(vDeg / 4));
                var dArc = '';
                for (var ia = 0; ia <= nArc; ia++) {
                    var da = vDeg * ia / nArc;
                    var pa = circlePoint(da, R);
                    dArc += (ia === 0 ? 'M' : 'L') + pa.x.toFixed(1) + ' ' + pa.y.toFixed(1) + ' ';
                }
                svg.appendChild(svgEl('path', { d: dArc, fill: 'none', stroke: COL.point, 'stroke-width': 3.4, 'stroke-linecap': 'round' }));
            }

            // ── Radien (svans i origo, spets i punkten) ───────────────────
            // (Ingen "1"-etikett i SVG:n — varje testad placering kolliderade med
            // cos/sin-segmentens etiketter vid något v. Radien = 1 förklaras i
            // instruktionstexten i stället.)
            svg.appendChild(svgEl('line', { x1: CX, y1: CY, x2: P.x, y2: P.y, stroke: COL.axis, 'stroke-width': 1.8 }));

            // ── cos v: vågrätt segment (blått) längs x-axeln ──────────────
            var footX = CX + R * cosV, footY = CY;
            if (Math.abs(cosV) * R > 4) {
                svg.appendChild(svgEl('line', { x1: CX, y1: CY, x2: footX, y2: footY, stroke: COL.cos, 'stroke-width': 3, 'stroke-linecap': 'butt' }));
                svg.appendChild(svgVarText({
                    x: (CX + footX) / 2, y: sinV >= 0 ? CY + 16 : CY - 9,
                    'font-size': 12.5, 'text-anchor': 'middle', fill: COL.cos
                }, ['cos ', '*v']));
            }
            // ── sin v: lodrätt segment (grönt) från foten till punkten ────
            if (Math.abs(sinV) * R > 4) {
                svg.appendChild(svgEl('line', { x1: footX, y1: footY, x2: P.x, y2: P.y, stroke: COL.sin, 'stroke-width': 3, 'stroke-linecap': 'butt' }));
                var sinRight = footX >= CX;
                svg.appendChild(svgVarText({
                    x: sinRight ? footX + 9 : footX - 9, y: (footY + P.y) / 2 + 4,
                    'font-size': 12.5, 'text-anchor': sinRight ? 'start' : 'end', fill: COL.sin
                }, ['sin ', '*v']));
            }

            // ── Liten vinkelbåge + v-etikett nära origo ────────────────────
            // Bågen sveper 0→v vid RSMALL: för stora v (>180°) skulle den
            // svepa en nästan hel liten cirkel och se ut som ett extra ring
            // — begränsa därför till högst ett halvt varv, där den läses som
            // en ren kil/halvcirkel.
            if (vDeg > 6 && vDeg <= 180) {
                var nSmall = Math.max(2, Math.round(vDeg / 6));
                var dSmall = '';
                for (var is = 0; is <= nSmall; is++) {
                    var dsdeg = vDeg * is / nSmall;
                    var ps = circlePoint(dsdeg, RSMALL);
                    dSmall += (is === 0 ? 'M' : 'L') + ps.x.toFixed(1) + ' ' + ps.y.toFixed(1) + ' ';
                }
                svg.appendChild(svgEl('path', { d: dSmall, fill: 'none', stroke: COL.axis, 'stroke-width': 1.3 }));
                // Bisektrisen (vDeg/2) sammanfaller med den lodräta y-axeln
                // exakt när vDeg = 180 (bisektris = 90°) — nudga då etiketten
                // några grader åt sidan så den inte hamnar på axellinjen.
                var bisDeg = vDeg / 2;
                if (Math.abs(bisDeg - 90) < 4) bisDeg -= 6;
                var bis = circlePoint(bisDeg, RSMALL + 12);
                svg.appendChild(svgVarText({ x: bis.x, y: bis.y + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*v']));
            }

            // ── Punkten (dragbar) ──────────────────────────────────────────
            svg.appendChild(svgEl('circle', { cx: P.x, cy: P.y, r: 5, fill: COL.point }));
            var hit = svgEl('circle', { cx: P.x, cy: P.y, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);

            // ── Grafen (steg 2+) ────────────────────────────────────────────
            if (state.step >= 2) {
                var axisY = GY(0);
                // Rutnät (lätt)
                svg.appendChild(svgEl('line', { x1: GX0, y1: GY(1), x2: GX1, y2: GY(1), stroke: COL.grid, 'stroke-width': 1 }));
                svg.appendChild(svgEl('line', { x1: GX0, y1: GY(-1), x2: GX1, y2: GY(-1), stroke: COL.grid, 'stroke-width': 1 }));

                // Grafens axlar
                svg.appendChild(svgEl('line', { x1: GX0, y1: axisY, x2: GX1 + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.4 }));
                svg.appendChild(svgEl('polygon', { points: (GX1 + 14) + ',' + axisY + ' ' + (GX1 + 5) + ',' + (axisY - 4.2) + ' ' + (GX1 + 5) + ',' + (axisY + 4.2), fill: COL.axis }));
                svg.appendChild(svgEl('line', { x1: GX0, y1: CY + R + 16, x2: GX0, y2: CY - R - 20, stroke: COL.axis, 'stroke-width': 1.4 }));
                svg.appendChild(svgEl('polygon', { points: GX0 + ',' + (CY - R - 28) + ' ' + (GX0 - 4.2) + ',' + (CY - R - 19) + ' ' + (GX0 + 4.2) + ',' + (CY - R - 19), fill: COL.axis }));
                // x-etiketten OVANFÖR axeln vid pilspetsen — under axeln
                // krockar den med 2π-ticketiketten (anchor middle vid GX1).
                svg.appendChild(svgVarText({ x: 559, y: axisY - 9, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
                svg.appendChild(svgVarText({ x: GX0 + 8, y: CY - R - 22, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
                svg.appendChild(svgVarText({ x: GX0 - 8, y: GY(1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['1']));
                svg.appendChild(svgVarText({ x: GX0 - 8, y: GY(-1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['−1']));

                // Radian-ticks (från steg 2) + gradtick-rad (från steg 3)
                var TICKS = [
                    { k: 1, rad: 'π/2', deg: '90°' },
                    { k: 2, rad: 'π', deg: '180°' },
                    { k: 3, rad: '3π/2', deg: '270°' },
                    { k: 4, rad: '2π', deg: '360°' }
                ];
                TICKS.forEach(function (tk) {
                    var xk = GX(tk.k * Math.PI / 2);
                    svg.appendChild(svgEl('line', { x1: xk, y1: axisY - 4, x2: xk, y2: axisY + 4, stroke: COL.axis, 'stroke-width': 1.2 }));
                    svg.appendChild(svgVarText({ x: xk, y: axisY + 16, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tick }, [tk.rad]));
                    if (state.step >= 3) {
                        svg.appendChild(svgVarText({ x: xk, y: axisY + 30, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [tk.deg]));
                    }
                });

                // Radiansegment på x-axeln (steg 3): rött, 0 till v
                if (state.step >= 3 && vDeg > 0.5) {
                    svg.appendChild(svgEl('line', { x1: GX0, y1: axisY, x2: GX(t), y2: axisY, stroke: COL.point, 'stroke-width': 3.4, 'stroke-linecap': 'butt' }));
                }

                // Klippram för kurvorna
                var clipId = 'lab-vis-uc-clip';
                var defs = svgEl('defs');
                var cp = svgEl('clipPath', { id: clipId });
                cp.appendChild(svgEl('rect', { x: GX0, y: CY - R - 4, width: GX1 - GX0, height: 2 * R + 8 }));
                defs.appendChild(cp);
                svg.appendChild(defs);
                var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
                svg.appendChild(g);

                var TWO_PI = 2 * Math.PI;
                if (state.showCos) {
                    g.appendChild(svgEl('path', { d: pathFor(Math.cos, 0, t, Math.max(4, Math.round(vDeg / 3))), fill: 'none', stroke: COL.cos, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
                    if (t < TWO_PI - 0.01) {
                        g.appendChild(svgEl('path', { d: pathFor(Math.cos, t, TWO_PI, 100), fill: 'none', stroke: COL.cos, 'stroke-width': 1.4, opacity: 0.25, 'stroke-dasharray': '4 4' }));
                    }
                    g.appendChild(svgEl('circle', { cx: GX(t), cy: GY(cosV), r: 4, fill: COL.cos }));
                }
                if (state.showSin) {
                    g.appendChild(svgEl('path', { d: pathFor(Math.sin, 0, t, Math.max(4, Math.round(vDeg / 3))), fill: 'none', stroke: COL.sin, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));
                    if (t < TWO_PI - 0.01) {
                        g.appendChild(svgEl('path', { d: pathFor(Math.sin, t, TWO_PI, 100), fill: 'none', stroke: COL.sin, 'stroke-width': 1.4, opacity: 0.25, 'stroke-dasharray': '4 4' }));
                    }
                    // Vågrät hjälplinje: punktens höjd på cirkeln → kurvans punkt
                    svg.appendChild(svgEl('line', { x1: P.x, y1: P.y, x2: GX(t), y2: P.y, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                    g.appendChild(svgEl('circle', { cx: GX(t), cy: GY(sinV), r: 4, fill: COL.sin }));
                }
                // (Ingen "y = sin x"/"y = cos x"-etikett i övre vänstra hörnet
                // — det är exakt där kurvorna startar (0,1) och (0,0), så
                // texten skulle kollidera med kurvan. Legenden ovanför scenen
                // identifierar redan färgerna.)
            }
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            var vDeg = state.vDeg, t = vDeg * Math.PI / 180;
            var sinV = Math.sin(t), cosV = Math.cos(t);
            var texA = 'v = ' + vDeg + '^\\circ';
            if (state.step >= 3) {
                var frac = DEG_FRAC[vDeg];
                // v = 0: frac ("0") och decimalapproximationen ("0") är
                // samma text — hoppa över dubbleringen "= 0 rad = 0 rad".
                if (frac && vDeg !== 0) texA += ' = ' + frac + '\\text{ rad}';
                texA += ' ' + chooseEq(t, 2) + ' ' + fmtTex(t, 2) + '\\text{ rad}';
            }
            katexInto(formelA, texA);

            var eqS = chooseEq(sinV, 2), eqC = chooseEq(cosV, 2);
            var texB = '\\textcolor{' + COL.sin + '}{\\sin v ' + eqS + ' ' + fmtTex(sinV, 2) + '}' +
                '\\qquad \\textcolor{' + COL.cos + '}{\\cos v ' + eqC + ' ' + fmtTex(cosV, 2) + '}';
            katexInto(formelB, texB);

            if (DEG_FRAC.hasOwnProperty(vDeg) && vDeg !== 0) {
                note.innerHTML = '<em>v</em> = ' + vDeg + '° är en standardvinkel — exakta värden finns i formelbladet.';
            } else {
                note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legArc.style.display = state.step >= 3 ? '' : 'none';
            checkSin.sync(); checkCos.sync();
            actions.style.display = state.step >= 2 ? '' : 'none';
            drawScene();
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
    window.VISUALISERINGAR['ma3c-6.2'] = api;
    window.VISUALISERINGAR['ma4-1.2'] = api;
    window.VISUALISERINGAR['ma4-1.5'] = api;
    window.VISUALISERINGAR['ma4-1.10'] = api;
})();
