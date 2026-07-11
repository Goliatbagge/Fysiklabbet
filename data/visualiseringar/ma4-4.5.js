/* ma4-4.5.js — visualisering: "Visare, multiplikation och zⁿ = w".
 * Hör till ma4-4.5 (komplexa tal som punkter/visare), ma4-4.6 (polär form),
 * ma4-4.7 (multiplikation/division i polär form), ma4-4.8 (de Moivres
 * formel) och ma4-4.9 (ekvationen zⁿ = w).
 *
 * Kärninsikt: multiplikation av komplexa tal = argumenten adderas och
 * beloppen multipliceras (rotation + skalning). de Moivre är upprepad
 * sådan rotation. Rötterna till zⁿ = w bildar en regelbunden n-hörning.
 *
 * Fyra steg (lager):
 *   1. Visare och polär form — en dragbar visare z. Live r = |z|, v = arg z,
 *      polär form. Startläge z = 3 + 2i (ma4-4.5 Exempel 1).
 *   2. Multiplikation        — två dragbara visare z, w; produkten z·w
 *      ritas live (röd). Vinkelbågarna för arg z (u) och arg w (v) staplas
 *      vid origo, radierna växer utåt (u, u+v, summan) — samma vinklar
 *      (40°, 80°) som ma4-4.7:s exempel/figur, skalade för att rymmas.
 *   3. de Moivres formel      — en visare z + heltalsväljare n (2–8).
 *      z, z², …, zⁿ ritas som visare i tonad färgskala (blå → röd).
 *      Animationsknapp "Upphöj steg för steg" tänder visarna en i taget.
 *   4. Ekvationen zⁿ = w      — en dragbar visare w (grön). De n lösningarna
 *      ritas som blå visare + en regelbunden n-hörning (tunn bläcklinje).
 *      Startläge |w| = 4, n = 3 ekar ma4-4.9:s exempel z³ = 64 (r = 4^(1/3),
 *      tre lösningar 120° isär) — argumentet är förskjutet 15° från reella
 *      axeln så w:s visare inte smälter samman med Re-axeln i scenen.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / graf.js).
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

    var SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    function subDigits(n) { return String(n).split('').map(function (c) { return SUB[+c]; }).join(''); }
    var SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    function supDigits(n) { return String(n).split('').map(function (c) { return SUP[+c]; }).join(''); }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        unit: 'rgba(31,37,48,0.22)',
        dash: 'rgba(31,37,48,0.45)',
        ink2: 'rgba(31,37,48,0.55)',
        track: 'rgba(15,22,32,0.22)',
        z: '#1d4ed8',
        w: '#3f7d3a',
        result: '#c8324a'
    };
    function hexToRgb(hex) {
        var h = hex.replace('#', '');
        return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
    }
    function lerpColor(c1, c2, t) {
        t = clampNum(t, 0, 1);
        var a = hexToRgb(c1), b = hexToRgb(c2);
        var r = Math.round(a.r + (b.r - a.r) * t);
        var g = Math.round(a.g + (b.g - a.g) * t);
        var bl = Math.round(a.b + (b.b - a.b) * t);
        return 'rgb(' + r + ',' + g + ',' + bl + ')';
    }

    function mount(el) {
        // ── Geometri (kvadratiskt rutnät: samma px/enhet i x och y) ──────
        var W = 560, H = 560, L = 42, R = 26, T = 26, B = 42;
        var PW = W - L - R, PH = H - T - B;               // 492 × 492
        var XMIN = -4.4, XMAX = 4.4, YMIN = -4.4, YMAX = 4.4;
        function X(re) { return L + (re - XMIN) / (XMAX - XMIN) * PW; }
        function Y(im) { return T + (YMAX - im) / (YMAX - YMIN) * PH; }
        var UNIT_PX = PW / (XMAX - XMIN);
        var axisX = X(0), axisY = Y(0);

        function toWorldXY(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return {
                re: XMIN + (px - L) / PW * (XMAX - XMIN),
                im: YMAX - (py - T) / PH * (YMAX - YMIN)
            };
        }
        function polarPt(cx, cy, rad, angDeg) {
            var t = angDeg * Math.PI / 180;
            return { x: cx + rad * Math.cos(t), y: cy - rad * Math.sin(t) };
        }
        // Kortaste vägens vinkelbåge (grader) från a1 till a2 (matematisk
        // vinkel, moturs positiv). Sweep-flaggan väljs så bågen buktar rätt
        // väg i SVG:s y-nedåt-system (medelpunkt alltid i origo/hörnet).
        function arcD(cx, cy, rad, a1, a2) {
            var diff = a2 - a1;
            while (diff > 180) diff -= 360;
            while (diff <= -180) diff += 360;
            var end = a1 + diff;
            var sweep = diff >= 0 ? 0 : 1;
            var p1 = polarPt(cx, cy, rad, a1), p2 = polarPt(cx, cy, rad, end);
            return 'M' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) +
                ' A' + rad + ' ' + rad + ' 0 0 ' + sweep + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
        }

        // ── Komplex aritmetik på {a,b}-objekt ────────────────────────────
        function cmul(p, q) { return { a: p.a * q.a - p.b * q.b, b: p.a * q.b + p.b * q.a }; }
        function polarOf(p) { return { r: Math.hypot(p.a, p.b), v: Math.atan2(p.b, p.a) * 180 / Math.PI }; }
        function fromPolar(r, vDeg) {
            var t = vDeg * Math.PI / 180;
            return { a: r * Math.cos(t), b: r * Math.sin(t) };
        }
        function snap01(v) { return Math.round(v * 10) / 10; }
        function clampMag(p, min, max) {
            var r = Math.hypot(p.a, p.b);
            if (r < 1e-9) return { a: min, b: 0 };
            if (r < min) { var k1 = min / r; return { a: p.a * k1, b: p.b * k1 }; }
            if (r > max) { var k2 = max / r; return { a: p.a * k2, b: p.b * k2 }; }
            return { a: p.a, b: p.b };
        }

        // ── Tillstånd ─────────────────────────────────────────────────────
        function defaultPoints() {
            return {
                z1: { a: 3, b: 2 },                 // ma4-4.5 Exempel 1
                z2: fromPolar(2, 40),                // ma4-4.7-exemplets vinklar
                w2: fromPolar(1.5, 80),
                zp: fromPolar(1.2, 20), n: 3,
                we: fromPolar(4, 15), neq: 3           // ekar z³ = 64 (roterad av axeln)
            };
        }
        var state = { step: 1, points: defaultPoints(), revealK: 3 };

        var CLAMP = {
            z1: { min: 0.3, max: 4.0 },
            z2: { min: 0.3, max: 2.0 },
            w2: { min: 0.3, max: 2.0 },
            we: { min: 0.3, max: 4.2 }
        };
        function zpMax() { return Math.min(2.0, Math.pow(4.0, 1 / state.points.n)); }
        function clampFor(key) {
            if (key === 'zp') return { min: 0.4, max: zpMax() };
            return CLAMP[key];
        }
        function setPolar(key, r, vDeg) {
            var c = clampFor(key);
            r = clampNum(r, c.min, c.max);
            vDeg = clampNum(vDeg, -180, 180);
            state.points[key] = fromPolar(r, vDeg);
        }
        function setN(v) {
            state.points.n = Math.round(clampNum(v, 2, 8));
            state.revealK = state.points.n;
            state.points.zp = clampMag(state.points.zp, 0.4, zpMax());
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Visare, multiplikation och zⁿ = w';
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
            'aria-label': 'Interaktivt komplext talplan med dragbara visare. Utforska ' +
                'multiplikation (argument adderas, belopp multipliceras), de Moivres ' +
                'formel och lösningarna till z upphöjt till n lika med w.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div'); formelA.className = 'lab-vis-formel'; card.appendChild(formelA);
        var formelB = document.createElement('div'); formelB.className = 'lab-vis-formel'; card.appendChild(formelB);
        var formelC = document.createElement('div'); formelC.className = 'lab-vis-formel'; card.appendChild(formelC);
        var formelD = document.createElement('div'); formelD.className = 'lab-vis-formel'; card.appendChild(formelD);

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
            { n: 1, label: '1 · Visare och polär form' },
            { n: 2, label: '2 · Multiplikation' },
            { n: 3, label: '3 · de Moivres formel' },
            { n: 4, label: '4 · Ekvationen zⁿ = w' }
        ];
        var INSTR = {
            1: 'Dra i visarens spets (blå) eller glidarna <em>r</em> och <em>v</em>. Talet ' +
               '<em>z</em> = <em>a</em> + <em>bi</em> är samtidigt en punkt och en visare ' +
               'med längd <em>r</em> = |<em>z</em>| och vinkel <em>v</em> = arg <em>z</em> ' +
               'mot positiva reella axeln.',
            2: 'Dra i båda visarna: <em>z</em> (blå) och <em>w</em> (grön). Produkten ' +
               '<em>z</em>·<em>w</em> (röd) ritas automatiskt. Vinkelbågarna vid origo ' +
               'staplas: först <em>u</em> = arg <em>z</em>, sedan <em>v</em> = arg <em>w</em> ' +
               'ovanpå — tillsammans blir de produktens vinkel.',
            3: 'Dra visaren <em>z</em> och ändra <em>n</em>. Potenserna <em>z</em>, <em>z</em>², ' +
               '…, <em>z</em>ⁿ ritas som visare i en tonad spiral — varje steg vrider och ' +
               'skalar lika mycket till. Tryck "Upphöj steg för steg" för att se dem tändas ' +
               'en i taget.',
            4: 'Dra visaren <em>w</em> (grön) och välj <em>n</em>. De <em>n</em> lösningarna ' +
               'till <em>z</em>ⁿ = <em>w</em> ritas som blå visare — hörnen i en regelbunden ' +
               '<em>n</em>-hörning. Dra <em>w</em> ett helt varv runt origo: hur långt hinner ' +
               'n-hörningen rotera?'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopAnim3(); state.step = s.n; update(); });
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
            legend.appendChild(span);
            return { el: span, txt: txt };
        }
        var legZ = legendItem(COL.z, '<em>z</em>');
        var legW = legendItem(COL.w, '<em>w</em>');
        var legR = legendItem(COL.result, '<em>z</em>·<em>w</em>');

        // ── Animationsknapp (steg 3) ─────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Upphöj steg för steg';
        playBtn.addEventListener('click', function () { startAnim3(); });
        actions.appendChild(playBtn);

        // ── Glidare: r/v-par per punkt + heltalsväljare n ────────────────
        function makeRow(name, min, max, step, get, set, decimalsOverride) {
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
            var decimals = decimalsOverride != null ? decimalsOverride : (step < 0.05 ? 2 : step < 1 ? 1 : 0);
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.result + ' 0%, ' +
                    COL.result + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim3();
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
                el: row,
                sync: function () { slider.value = get(); field.value = fmt(get(), decimals).replace(',', '.'); paint(); }
            };
        }
        function rowR(key, min, max, label) {
            // I steg med TVÅ visare måste glidarparen märkas per visare
            // (|z|/u respektive |w|/v, som i formelraderna) — två par som
            // båda heter "r"/"v" går inte att skilja åt.
            return makeRow(label || 'r', min, max, 0.05,
                function () { return polarOf(state.points[key]).r; },
                function (v) { setPolar(key, v, polarOf(state.points[key]).v); }, 2);
        }
        function rowV(key, label) {
            return makeRow(label || 'v', -180, 180, 1,
                function () { return polarOf(state.points[key]).v; },
                function (v) { setPolar(key, polarOf(state.points[key]).r, v); });
        }
        var rowZ1r = rowR('z1', CLAMP.z1.min, CLAMP.z1.max), rowZ1v = rowV('z1');
        var rowZ2r = rowR('z2', CLAMP.z2.min, CLAMP.z2.max, '|z|'), rowZ2v = rowV('z2', 'u');
        var rowW2r = rowR('w2', CLAMP.w2.min, CLAMP.w2.max, '|w|'), rowW2v = rowV('w2', 'v');
        var rowZPr = makeRow('r', 0.4, 2.0, 0.05,
            function () { return polarOf(state.points.zp).r; },
            function (v) { setPolar('zp', v, polarOf(state.points.zp).v); }, 2);
        var rowZPv = rowV('zp');
        var rowN = makeRow('n', 2, 8, 1,
            function () { return state.points.n; },
            function (v) { setN(v); rowZPr.sync(); });
        var rowWEr = rowR('we', CLAMP.we.min, CLAMP.we.max), rowWEv = rowV('we');
        var rowNEq = makeRow('n', 2, 6, 1,
            function () { return state.points.neq; },
            function (v) { state.points.neq = Math.round(v); });

        var ALL_ROWS = [rowZ1r, rowZ1v, rowZ2r, rowZ2v, rowW2r, rowW2v, rowZPr, rowZPv, rowN, rowWEr, rowWEv, rowNEq];
        function syncRows() { ALL_ROWS.forEach(function (r) { r.sync(); }); }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim3();
            state.points = defaultPoints();
            state.revealK = state.points.n;
            syncRows();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: "Upphöj steg för steg" (endast steg 3) ─────────────
        var animId = null;
        function stopAnim3() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            state.revealK = state.points.n;
        }
        function startAnim3() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            state.revealK = 1;
            draw(); updateFormulas();
            var T_MS = 550, t0 = null, n = state.points.n;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var idx = clampNum(1 + Math.floor((ts - t0) / T_MS), 1, n);
                state.revealK = idx;
                draw(); updateFormulas();
                if (idx < n) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbara visare (pekare via svg, ett gemensamt event-par) ─────
        var dragging = null;
        var dragTargets = {};
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var spec = dragTargets[dragging];
            if (!spec) return;
            var wc = toWorldXY(e.clientX, e.clientY);
            var re = snap01(wc.re), im = snap01(wc.im);
            var c = clampMag({ a: re, b: im }, spec.min, spec.max);
            spec.set(c.a, c.b);
            syncRows();
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        function addHandle(parent, tipX, tipY, key, color) {
            parent.appendChild(svgEl('circle', { cx: tipX.toFixed(1), cy: tipY.toFixed(1), r: 4, fill: color }));
            var hit = svgEl('circle', { cx: tipX.toFixed(1), cy: tipY.toFixed(1), r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim3();
                dragging = key;
                try { svg.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            parent.appendChild(hit);
        }

        // ── Rita en visare (pil) från origo till (re, im) ────────────────
        function drawArrow(parent, re, im, color, width) {
            var px = X(re), py = Y(im);
            var dx = px - axisX, dy = py - axisY, len = Math.hypot(dx, dy);
            if (len < 1e-3) return { tipX: px, tipY: py, ux: 1, uy: 0, len: 0 };
            var ux = dx / len, uy = dy / len;
            var headLen = clampNum(len * 0.22, 8, 14);
            var headW = headLen * 0.62;
            var baseX = px - ux * headLen, baseY = py - uy * headLen;
            var sw = width || 2.2;
            parent.appendChild(svgEl('line', {
                x1: axisX.toFixed(1), y1: axisY.toFixed(1), x2: baseX.toFixed(1), y2: baseY.toFixed(1),
                stroke: color, 'stroke-width': sw, 'stroke-linecap': 'butt'
            }));
            var nx = -uy, ny = ux;
            var h1x = baseX + nx * headW / 2, h1y = baseY + ny * headW / 2;
            var h2x = baseX - nx * headW / 2, h2y = baseY - ny * headW / 2;
            parent.appendChild(svgEl('polygon', {
                points: px.toFixed(1) + ',' + py.toFixed(1) + ' ' + h1x.toFixed(1) + ',' + h1y.toFixed(1) + ' ' + h2x.toFixed(1) + ',' + h2y.toFixed(1),
                fill: color
            }));
            return { tipX: px, tipY: py, ux: ux, uy: uy, len: len };
        }
        function arrowLabel(parts, info, color, offset) {
            offset = offset == null ? 16 : offset;
            var lx = info.tipX + info.ux * offset;
            var ly = info.tipY + info.uy * offset;
            var anchor = info.ux > 0.2 ? 'start' : (info.ux < -0.2 ? 'end' : 'middle');
            ly += info.uy < -0.3 ? -2 : (info.uy > 0.3 ? 9 : 4);
            svg.appendChild(svgVarText({ x: lx.toFixed(1), y: ly.toFixed(1), 'font-size': 13.5, 'text-anchor': anchor, fill: color }, parts));
        }
        function arcLabel(cx, cy, rad, a1, a2, text, color, pad) {
            var diff = a2 - a1;
            while (diff > 180) diff -= 360;
            while (diff <= -180) diff += 360;
            var mid = a1 + diff / 2;
            var pt = polarPt(cx, cy, rad + (pad || 12), mid);
            var cosm = Math.cos(mid * Math.PI / 180);
            var anchor = cosm > 0.25 ? 'start' : (cosm < -0.25 ? 'end' : 'middle');
            svg.appendChild(svgVarText({ x: pt.x.toFixed(1), y: (pt.y + 4).toFixed(1), 'font-size': 11.5, 'text-anchor': anchor, fill: color }, [text]));
        }

        // ── Rita: gemensamt rutnät/axlar + steg-specifikt innehåll ────────
        var clipId = 'ma4-45-clip-' + Math.random().toString(36).slice(2);
        function nearAny(list, val, eps) {
            for (var i = 0; i < list.length; i++) if (Math.abs(list[i] - val) < eps) return true;
            return false;
        }
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            dragTargets = {};

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // avoid-listor för att hoppa över kolliderande heltalsetiketter
            var avoidX = [], avoidY = [];
            if (state.step === 1) { avoidX.push(state.points.z1.a); avoidY.push(state.points.z1.b); }
            else if (state.step === 2) {
                avoidX.push(state.points.z2.a, state.points.w2.a);
                avoidY.push(state.points.z2.b, state.points.w2.b);
                var prod0 = cmul(state.points.z2, state.points.w2);
                avoidX.push(prod0.a); avoidY.push(prod0.b);
            } else if (state.step === 3) {
                var pb0 = polarOf(state.points.zp), n0 = state.points.n, K0 = clampNum(state.revealK, 1, n0);
                for (var kk = 1; kk <= K0; kk++) {
                    var pk = fromPolar(Math.pow(pb0.r, kk), pb0.v * kk);
                    avoidX.push(pk.a); avoidY.push(pk.b);
                }
            } else {
                avoidX.push(state.points.we.a); avoidY.push(state.points.we.b);
                var pw0 = polarOf(state.points.we), r0e = Math.pow(pw0.r, 1 / state.points.neq);
                for (var kr = 0; kr < state.points.neq; kr++) {
                    var rt = fromPolar(r0e, (pw0.v + kr * 360) / state.points.neq);
                    avoidX.push(rt.a); avoidY.push(rt.b);
                }
            }

            var i;
            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                g.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
                g.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
            g.appendChild(svgEl('circle', { cx: axisX, cy: axisY, r: UNIT_PX, fill: 'none', stroke: COL.unit, 'stroke-width': 1, 'stroke-dasharray': '3 4' }));
            g.appendChild(svgEl('circle', { cx: axisX, cy: axisY, r: 2.4, fill: COL.axis }));

            // axlar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: (L + PW + 6), y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: (T + PH), x2: axisX, y2: (T - 6), stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 14) + ' ' + (axisX - 4.5) + ',' + (T - 4) + ' ' + (axisX + 4.5) + ',' + (T - 4), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: (L + PW + 12), y: axisY + 18, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*Re']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T - 4, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*Im']));

            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                if (!nearAny(avoidX, i, 0.35)) {
                    svg.appendChild(svgVarText({ x: X(i), y: axisY + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
                }
                if (!nearAny(avoidY, i, 0.35)) {
                    svg.appendChild(svgVarText({ x: axisX - 7, y: Y(i) + 3.5, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
                }
            }

            if (state.step === 1) drawStep1(g);
            else if (state.step === 2) drawStep2(g);
            else if (state.step === 3) drawStep3(g);
            else drawStep4(g);
        }

        function drawStep1(g) {
            var p = state.points.z1;
            var pol = polarOf(p), r = pol.r, v = pol.v;
            if (Math.abs(v) > 0.5) {
                g.appendChild(svgEl('path', { d: arcD(axisX, axisY, 30, 0, v), fill: 'none', stroke: COL.z, 'stroke-width': 1.4 }));
                // Etiketten hoppas över för mycket spetsiga vinklar: vid liten
                // v hamnar bisektrisens punkt (radie·sin(v/2)) för nära axeln
                // och kolliderar med axellinjen — se CLAUDE.md "Geometrifigurer".
                if (Math.abs(v) > 20) arcLabel(axisX, axisY, 30, 0, v, fmtDisp(v, 1) + '°', COL.z, 13);
            }
            var px = X(p.a), py = Y(p.b);
            g.appendChild(svgEl('line', { x1: px, y1: py, x2: px, y2: axisY, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
            g.appendChild(svgEl('line', { x1: px, y1: py, x2: axisX, y2: py, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
            svg.appendChild(svgVarText({ x: px, y: axisY + 15, 'font-size': 12, 'text-anchor': 'middle', fill: COL.z }, ['*a']));
            svg.appendChild(svgVarText({ x: axisX - 8, y: py + 4, 'font-size': 12, 'text-anchor': 'end', fill: COL.z }, ['*b']));

            var info = drawArrow(g, p.a, p.b, COL.z, 2.4);
            arrowLabel(['*z'], info, COL.z, 16);
            addHandle(g, info.tipX, info.tipY, 'z1', COL.z);
            dragTargets.z1 = { min: CLAMP.z1.min, max: CLAMP.z1.max, set: function (a, b) { state.points.z1 = { a: a, b: b }; } };
        }

        function drawStep2(g) {
            var z = state.points.z2, w = state.points.w2;
            var pz = polarOf(z), pw = polarOf(w);
            var uz = pz.v, vw = pw.v;
            var prod = cmul(z, w), pp = polarOf(prod);

            if (Math.abs(uz) > 0.5) {
                g.appendChild(svgEl('path', { d: arcD(axisX, axisY, 24, 0, uz), fill: 'none', stroke: COL.z, 'stroke-width': 1.4 }));
                if (Math.abs(uz) > 20) arcLabel(axisX, axisY, 24, 0, uz, fmtDisp(uz, 1) + '°', COL.z, 12);
            }
            if (Math.abs(vw) > 0.5) {
                g.appendChild(svgEl('path', { d: arcD(axisX, axisY, 36, uz, uz + vw), fill: 'none', stroke: COL.w, 'stroke-width': 1.4 }));
                if (Math.abs(vw) > 20) arcLabel(axisX, axisY, 36, uz, uz + vw, (vw >= 0 ? '+' : '') + fmtDisp(vw, 1) + '°', COL.w, 12);
            }
            if (Math.abs(pp.v) > 0.5) {
                g.appendChild(svgEl('path', { d: arcD(axisX, axisY, 48, 0, pp.v), fill: 'none', stroke: COL.result, 'stroke-width': 1.2, 'stroke-dasharray': '2 3' }));
            }

            var infoZ = drawArrow(g, z.a, z.b, COL.z, 2.2);
            arrowLabel(['*z'], infoZ, COL.z, 16);
            addHandle(g, infoZ.tipX, infoZ.tipY, 'z2', COL.z);
            dragTargets.z2 = { min: CLAMP.z2.min, max: CLAMP.z2.max, set: function (a, b) { state.points.z2 = { a: a, b: b }; } };

            var infoW = drawArrow(g, w.a, w.b, COL.w, 2.2);
            arrowLabel(['*w'], infoW, COL.w, 16);
            addHandle(g, infoW.tipX, infoW.tipY, 'w2', COL.w);
            dragTargets.w2 = { min: CLAMP.w2.min, max: CLAMP.w2.max, set: function (a, b) { state.points.w2 = { a: a, b: b }; } };

            var infoP = drawArrow(g, prod.a, prod.b, COL.result, 2.2);
            arrowLabel(['*z', '·', '*w'], infoP, COL.result, 16);
        }

        function drawStep3(g) {
            var base = state.points.zp, n = state.points.n, K = clampNum(state.revealK, 1, n);
            var pol = polarOf(base), r0 = pol.r, v0 = pol.v;
            var pts = [], k;
            for (k = 1; k <= n; k++) {
                var rk = Math.pow(r0, k), vk = v0 * k;
                pts.push(fromPolar(rk, vk));
            }
            var dPath = 'M' + axisX.toFixed(1) + ' ' + axisY.toFixed(1) + ' ';
            for (k = 0; k < K; k++) dPath += 'L' + X(pts[k].a).toFixed(1) + ' ' + Y(pts[k].b).toFixed(1) + ' ';
            g.appendChild(svgEl('path', { d: dPath, fill: 'none', stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));

            for (k = 1; k <= K; k++) {
                var pp = pts[k - 1];
                var t = n === 1 ? 0 : (k - 1) / (n - 1);
                var col = lerpColor(COL.z, COL.result, t);
                var info = drawArrow(g, pp.a, pp.b, col, k === 1 ? 2.4 : 2);
                var showLabel = n <= 4 || k === 1 || k === 2 || k === n;
                if (showLabel) {
                    var parts = k === 1 ? ['*z'] : ['*z', supDigits(k)];
                    arrowLabel(parts, info, col, 14);
                }
                if (k === 1) {
                    addHandle(g, info.tipX, info.tipY, 'zp', col);
                    dragTargets.zp = { min: 0.4, max: zpMax(), set: function (a, b) { state.points.zp = { a: a, b: b }; } };
                }
            }
        }

        function drawStep4(g) {
            var w = state.points.we, n = state.points.neq;
            var pw = polarOf(w), rw = pw.r, argw = pw.v;
            var r = Math.pow(rw, 1 / n);
            g.appendChild(svgEl('circle', { cx: axisX, cy: axisY, r: r * UNIT_PX, fill: 'none', stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 3' }));

            var roots = [], k;
            for (k = 0; k < n; k++) roots.push(fromPolar(r, (argw + k * 360) / n));

            var poly = roots.map(function (p) { return X(p.a).toFixed(1) + ',' + Y(p.b).toFixed(1); }).join(' ');
            g.appendChild(svgEl('polygon', { points: poly, fill: 'none', stroke: COL.ink2, 'stroke-width': 1.4, 'stroke-linejoin': 'round' }));

            for (k = 0; k < n; k++) {
                var info = drawArrow(g, roots[k].a, roots[k].b, COL.z, 1.8);
                arrowLabel(['*z', subDigits(k + 1)], info, COL.z, 13);
            }

            var infoW = drawArrow(g, w.a, w.b, COL.w, 2.4);
            arrowLabel(['*w'], infoW, COL.w, 16);
            addHandle(g, infoW.tipX, infoW.tipY, 'we', COL.w);
            dragTargets.we = { min: CLAMP.we.min, max: CLAMP.we.max, set: function (a, b) { state.points.we = { a: a, b: b }; } };
        }

        // ── Formler (KaTeX, live) ─────────────────────────────────────────
        function updateFormulas() {
            formelA.style.display = 'none'; formelB.style.display = 'none';
            formelC.style.display = 'none'; formelD.style.display = 'none';
            note.innerHTML = '';

            if (state.step === 1) {
                var p = state.points.z1, pol = polarOf(p), r = pol.r, v = pol.v;
                formelA.style.color = COL.z; formelA.style.display = '';
                katexInto(formelA, 'z = a + bi = ' + fmtTex(p.a, 2) + (p.b < 0 ? ' - ' : ' + ') + fmtTex(Math.abs(p.b), 2) +
                    'i \\qquad |z| = r = \\sqrt{a^2+b^2} = ' + fmtTex(r, 2));
                formelB.style.color = COL.z; formelB.style.display = '';
                katexInto(formelB, '\\arg z = v \\approx ' + fmtTex(v, 1) + '^\\circ \\qquad z = r(\\cos v + i\\sin v) = ' +
                    fmtTex(r, 2) + '(\\cos ' + fmtTex(v, 1) + '^\\circ + i\\sin ' + fmtTex(v, 1) + '^\\circ)');
            } else if (state.step === 2) {
                var z = state.points.z2, w = state.points.w2;
                var pz = polarOf(z), pw = polarOf(w);
                var prod = cmul(z, w), pp = polarOf(prod);
                formelA.style.color = COL.z; formelA.style.display = '';
                katexInto(formelA, 'z = |z|(\\cos u + i\\sin u) = ' + fmtTex(pz.r, 2) + '(\\cos ' + fmtTex(pz.v, 1) + '^\\circ + i\\sin ' + fmtTex(pz.v, 1) + '^\\circ)');
                formelB.style.color = COL.w; formelB.style.display = '';
                katexInto(formelB, 'w = |w|(\\cos v + i\\sin v) = ' + fmtTex(pw.r, 2) + '(\\cos ' + fmtTex(pw.v, 1) + '^\\circ + i\\sin ' + fmtTex(pw.v, 1) + '^\\circ)');
                formelC.style.color = COL.result; formelC.style.display = '';
                katexInto(formelC, '|z\\cdot w| = |z|\\cdot|w| = ' + fmtTex(pz.r, 2) + '\\cdot' + fmtTex(pw.r, 2) + ' = ' + fmtTex(pp.r, 2) +
                    '\\qquad \\arg(z\\cdot w) = u + v = ' + fmtTex(pz.v, 1) + '^\\circ + ' + fmtTex(pw.v, 1) + '^\\circ = ' + fmtTex(pp.v, 1) + '^\\circ');
            } else if (state.step === 3) {
                var b0 = state.points.zp, n = state.points.n;
                var pb = polarOf(b0), r0 = pb.r, v0 = pb.v;
                var rn = Math.pow(r0, n), vn = v0 * n;
                var zn = fromPolar(rn, vn);
                formelA.style.color = COL.z; formelA.style.display = '';
                katexInto(formelA, 'z = r(\\cos v + i\\sin v) = ' + fmtTex(r0, 2) + '(\\cos ' + fmtTex(v0, 1) + '^\\circ + i\\sin ' + fmtTex(v0, 1) + '^\\circ)');
                formelC.style.color = COL.result; formelC.style.display = '';
                katexInto(formelC, 'z^{' + n + '} = r^{' + n + '}(\\cos ' + n + 'v + i\\sin ' + n + 'v) = ' + fmtTex(r0, 2) + '^{' + n + '}\\big(\\cos(' + n + '\\cdot' + fmtTex(v0, 1) + '^\\circ) + i\\sin(' + n + '\\cdot' + fmtTex(v0, 1) + '^\\circ)\\big)');
                formelD.style.color = COL.result; formelD.style.display = '';
                katexInto(formelD, 'z^{' + n + '} = ' + fmtTex(rn, 2) + '(\\cos ' + fmtTex(vn, 1) + '^\\circ + i\\sin ' + fmtTex(vn, 1) + '^\\circ) \\approx ' +
                    fmtTex(zn.a, 2) + (zn.b < 0 ? ' - ' : ' + ') + fmtTex(Math.abs(zn.b), 2) + 'i');
                note.innerHTML = 'Visar upphöjt till exponent ' + state.revealK + ' av totalt ' + n + '.';
            } else {
                var w2 = state.points.we, n2 = state.points.neq;
                var pw2 = polarOf(w2), rw2 = pw2.r, argw = pw2.v;
                var r2 = Math.pow(rw2, 1 / n2), v0b = argw / n2;
                formelA.style.color = COL.axis; formelA.style.display = '';
                katexInto(formelA, 'z^{' + n2 + '} = w');
                formelB.style.color = COL.w; formelB.style.display = '';
                katexInto(formelB, 'w = |w|(\\cos(\\arg w) + i\\sin(\\arg w)) = ' + fmtTex(rw2, 2) + '(\\cos ' + fmtTex(argw, 1) + '^\\circ + i\\sin ' + fmtTex(argw, 1) + '^\\circ)');
                formelC.style.color = COL.z; formelC.style.display = '';
                katexInto(formelC, 'r = \\sqrt[' + n2 + ']{|w|} = \\sqrt[' + n2 + ']{' + fmtTex(rw2, 2) + '} = ' + fmtTex(r2, 2));
                formelD.style.color = COL.z; formelD.style.display = '';
                katexInto(formelD, 'v = \\dfrac{\\arg w + k\\cdot 360^\\circ}{' + n2 + '} \\;\\Rightarrow\\; v_0 = \\dfrac{' + fmtTex(argw, 1) + '^\\circ}{' + n2 + '} = ' + fmtTex(v0b, 1) + '^\\circ');
                note.innerHTML = 'Ekvationen har <em>n</em> = ' + n2 + ' lösningar (<em>k</em> = 0, 1, …, ' + (n2 - 1) + ').';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legZ.el.style.display = (state.step === 1 || state.step === 2 || state.step === 3) ? '' : 'none';
            legW.el.style.display = (state.step === 2 || state.step === 4) ? '' : 'none';
            legR.el.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            legZ.txt.innerHTML = state.step === 3 ? '<em>z</em>¹ (bas)' : '<em>z</em>';
            legR.txt.innerHTML = state.step === 3 ? '<em>z</em>ⁿ (störst potens)' : '<em>z</em>·<em>w</em>';
            if (state.step === 4) { legZ.el.style.display = ''; legZ.txt.innerHTML = 'lösningar <em>z</em>₁…<em>z</em>ₙ'; }

            ALL_ROWS.forEach(function (r) { r.el.style.display = 'none'; });
            if (state.step === 1) { rowZ1r.el.style.display = ''; rowZ1v.el.style.display = ''; }
            else if (state.step === 2) {
                rowZ2r.el.style.display = ''; rowZ2v.el.style.display = '';
                rowW2r.el.style.display = ''; rowW2v.el.style.display = '';
            } else if (state.step === 3) {
                rowZPr.el.style.display = ''; rowZPv.el.style.display = ''; rowN.el.style.display = '';
            } else {
                rowWEr.el.style.display = ''; rowWEv.el.style.display = ''; rowNEq.el.style.display = '';
            }
            actions.style.display = state.step === 3 ? '' : 'none';

            draw();
            updateFormulas();
        }

        syncRows();
        update();

        return {
            destroy: function () {
                stopAnim3();
                if (animId != null) { cancelAnimationFrame(animId); animId = null; }
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma4-4.5'] = api;
    window.VISUALISERINGAR['ma4-4.6'] = api;
    window.VISUALISERINGAR['ma4-4.7'] = api;
    window.VISUALISERINGAR['ma4-4.8'] = api;
    window.VISUALISERINGAR['ma4-4.9'] = api;
})();
