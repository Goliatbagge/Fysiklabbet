/* ma4-1.13.js — visualisering: "Tangenten på tan-linjen". Hör till ma4-1.13
 * (grafen till y = tan x).
 *
 * Kärninsikt: tan v ÄR en längd — sträckan på den lodräta tangentlinjen
 * x = 1 där strålen från origo (genom vinkelpunkten på enhetscirkeln)
 * träffar. Asymptoterna uppstår när strålen blir parallell med linjen
 * (v = 90°, 270°, ...). Perioden är π (inte 2π): strålen är i själva
 * verket en HEL LINJE genom origo, så v och v + 180° ligger på exakt
 * samma linje och träffar tangentlinjen i samma punkt.
 *
 * Startläget är v = 35°, samma exempeltyp som nämns i uppgiften
 * (tan 35° ≈ 0,70) — eleven kan "spela upp" exemplet direkt.
 *
 * Tre steg (lager):
 *   1. Längden tan v        — dra vinkeln, segmentet på tangentlinjen och
 *                              grafpunkten följer med. Formel med sin/cos.
 *   2. Asymptoten som rörelse — dra mot 90°: skärningen rusar uppåt,
 *                              värdet exploderar. Exakt vid 90°: strålen är
 *                              parallell med linjen — tan 90° är odefinierad.
 *   3. Perioden är π         — förbi 90° ritas linjens bakåtförlängning
 *                              streckad. Knappen "Jämför v och v + 180°"
 *                              visar att de ligger på exakt samma linje och
 *                              träffar tangentlinjen i samma punkt.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js,
 * ma3c-2.3.js och ma3c-6.2.js). API: window.VISUALISERINGAR['<id>'] =
 * { mount(el) → { destroy() } }.
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
        curve: '#2563c9',   // y = tan x (grafen), blå
        tan: '#c8324a'      // tan v — segmentet på tangentlinjen, punkten i
                              // grafen och den dragbara vinkelpunkten, accentrött
    };

    var CLAMP_TAN = 8; // klipp segment/graf vid ±8 i tan-värde

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { vDeg: 35, step: 1, compare: false };

        // ── Geometri: cirkeln + tangentlinjen (vänster) ───────────────────
        var W = 560, H = 440;
        var T = 16, BOT = 420;               // synligt fönster (klipps utanför)
        var CX = 100, CY = 205, R = 72;
        var X_TAN = CX + R;                  // tangentlinjen x = 1 (världsenhet)
        var TANSCALE = R;                    // px per tan-enhet (samma skala som radien)
        var RSMALL = 26;                     // liten vinkelbåge nära origo

        // ── Geometri: grafen y = tan x (höger), domän 0–2π ────────────────
        var GX0 = 224, GX1 = 548;
        var scaleX = (GX1 - GX0) / (2 * Math.PI);
        function GX(rad) { return GX0 + rad * scaleX; }
        // Delad vertikal skala: samma rad ger samma höjd på tangentlinjens
        // segment OCH på grafens kurva — det är detta som synkar dem visuellt.
        function TY(v) { return CY - clampNum(v, -CLAMP_TAN, CLAMP_TAN) * TANSCALE; }

        function circlePoint(deg, radius) {
            var t = deg * Math.PI / 180;
            return { t: t, x: CX + radius * Math.cos(t), y: CY - radius * Math.sin(t) };
        }
        function isAsymptote(deg) { return deg % 180 === 90; }
        function pieceOf(deg) { return deg < 90 ? 0 : (deg < 270 ? 1 : 2); }

        var BRANCHES = [
            { lo: 0, hi: Math.PI / 2, loAsym: false, hiAsym: true },
            { lo: Math.PI / 2, hi: 3 * Math.PI / 2, loAsym: true, hiAsym: true },
            { lo: 3 * Math.PI / 2, hi: 2 * Math.PI, loAsym: true, hiAsym: false }
        ];
        function branchPath(b, n) {
            var EPS = 0.02;
            var xFrom = b.lo + (b.loAsym ? EPS : 0);
            var xTo = b.hi - (b.hiAsym ? EPS : 0);
            var d = '';
            for (var i = 0; i <= n; i++) {
                var x = xFrom + (xTo - xFrom) * i / n;
                var y = Math.tan(x);
                var X = GX(x), Y = TY(y);
                d += (i === 0 ? 'M' : 'L') + X.toFixed(1) + ' ' + Y.toFixed(1) + ' ';
            }
            return d;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Tangenten på tan-linjen';
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
            'aria-label': 'Enhetscirkeln till vänster med en dragbar vinkelpunkt och den ' +
                'lodräta tangentlinjen x = 1, där tan v mäts som en längd. Till höger grafen ' +
                'y = tan x med lodräta asymptoter. Dra punkten eller glidaren för att ändra v.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.tan;
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
            { n: 1, label: '1 · Längden tan v' },
            { n: 2, label: '2 · Asymptoten som rörelse' },
            { n: 3, label: '3 · Perioden är π' }
        ];
        var INSTR = {
            1: 'Dra vinkelpunkten (eller <em>v</em>-glidaren) runt enhetscirkeln. Strålen ' +
               'från origo genom punkten förlängs tills den skär den lodräta linjen ' +
               '<em>x</em> = 1 — höjden där de möts är precis <em>tan</em> <em>v</em>, ' +
               'markerad som ett rött segment. Grafpunkten till höger ligger på exakt ' +
               'samma höjd.',
            2: 'Dra <em>v</em> mot 90°. Skärningspunkten rusar uppåt och värdet växer mot ' +
               'oändligheten — se hur snabbt talet i formeln nedan ökar. Precis vid 90° är ' +
               'strålen parallell med linjen <em>x</em> = 1: de möts aldrig, så ' +
               '<em>tan</em> 90° är inte definierat. Samma sak syns i grafen som en lodrät ' +
               'asymptot.',
            3: 'Passera 90°: nu räcker inte strålen till linjen längre, så dess ' +
               'bakåtförlängning (streckad) ritas till skärningspunkten i stället, och ' +
               '<em>tan</em> <em>v</em> blir negativ. Tryck på knappen för att jämföra ' +
               '<em>v</em> med <em>v</em> + 180° — de ligger på exakt samma linje genom ' +
               'origo och träffar tangentlinjen i samma punkt. Därför upprepas tangens ' +
               'redan efter 180° (π rad), inte 360°.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                if (s.n !== 3) state.compare = false;
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ────────────────────────────────────────────────────────
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
        var legTan = legendItem(COL.tan, '<em>tan</em> <em>v</em> (segment/punkt)');
        var legCurve = legendItem(COL.curve, '<em>y</em> = <em>tan</em> <em>x</em>');
        var legAsym = legendItem(COL.tick, 'asymptot', true);
        legend.appendChild(legTan);
        legend.appendChild(legCurve);
        legend.appendChild(legAsym);

        // ── Knapp: jämför v och v + 180° (steg 3) ──────────────────────────
        var compareBtn = document.createElement('button');
        compareBtn.type = 'button';
        compareBtn.className = 'lab-btn';
        compareBtn.textContent = 'Jämför v och v + 180°';
        compareBtn.addEventListener('click', function () {
            state.compare = !state.compare;
            compareBtn.textContent = state.compare ? 'Dölj jämförelsen' : 'Jämför v och v + 180°';
            update();
        });
        actions.appendChild(compareBtn);

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
                slider.style.background = 'linear-gradient(to right, ' + COL.tan + ' 0%, ' +
                    COL.tan + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
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
            state.vDeg = 35; state.step = 1; state.compare = false;
            compareBtn.textContent = 'Jämför v och v + 180°';
            rowV.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragpunkt på cirkeln ──────────────────────────────────────────
        function toSvgXY(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return { x: (clientX - r.left) * W / r.width, y: (clientY - r.top) * H / r.height };
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
        var clipId = 'lab-vis-tan-clip';
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var vDeg = state.vDeg, t = vDeg * Math.PI / 180;
            var asym = isAsymptote(vDeg);
            var axisY = CY;
            var i;

            // ── Rutnät: vågräta hjälplinjer vid heltalsvärden av tan ──────
            for (i = -2; i <= 2; i++) {
                if (i === 0) continue;
                var gy = TY(i);
                if (gy < T || gy > BOT) continue;
                svg.appendChild(svgEl('line', { x1: 6, y1: gy, x2: W - 6, y2: gy, stroke: COL.grid, 'stroke-width': 1 }));
            }

            // ── Klippram (allt som kan växa ur bild) ──────────────────────
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: 0, y: T, width: W, height: BOT - T }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });

            // ── Grafens asymptoter (lodräta streckade linjer) ─────────────
            [Math.PI / 2, 3 * Math.PI / 2].forEach(function (ra) {
                var deg = Math.round(ra * 180 / Math.PI);
                var hi = asym && deg === vDeg;
                g.appendChild(svgEl('line', {
                    x1: GX(ra), y1: T, x2: GX(ra), y2: BOT,
                    stroke: hi ? COL.tan : COL.tick, 'stroke-width': hi ? 2 : 1.3,
                    'stroke-dasharray': hi ? '2 4' : '5 4', opacity: hi ? 0.85 : 0.55
                }));
            });

            // ── Grafens kurva, i tre grenar (branchfärgas i steg 3) ────────
            BRANCHES.forEach(function (b, idx) {
                var hi = state.compare && !asym &&
                    (idx === pieceOf(vDeg) || idx === pieceOf((vDeg + 180) % 360));
                g.appendChild(svgEl('path', {
                    d: branchPath(b, 130), fill: 'none',
                    stroke: hi ? COL.tan : COL.curve,
                    'stroke-width': hi ? 2.6 : 2.2, 'stroke-linejoin': 'round'
                }));
            });

            svg.appendChild(g); // klippt innehåll hittills (grid ovan är utanför g, redan ritat)

            // ── Grafens axlar ──────────────────────────────────────────────
            svg.appendChild(svgEl('line', { x1: GX0, y1: axisY, x2: GX1 + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: (GX1 + 14) + ',' + axisY + ' ' + (GX1 + 5) + ',' + (axisY - 4.2) + ' ' + (GX1 + 5) + ',' + (axisY + 4.2), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: GX0, y1: CY + R + 14, x2: GX0, y2: CY - R - 18, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: GX0 + ',' + (CY - R - 26) + ' ' + (GX0 - 4.2) + ',' + (CY - R - 17) + ' ' + (GX0 + 4.2) + ',' + (CY - R - 17), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: 554, y: axisY - 9, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: GX0 + 8, y: CY - R - 20, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Radian-ticks + gradtick-rad
            var TICKS = [
                { rad: Math.PI / 2, lbl: 'π/2', deg: '90°' },
                { rad: Math.PI, lbl: 'π', deg: '180°' },
                { rad: 3 * Math.PI / 2, lbl: '3π/2', deg: '270°' },
                { rad: 2 * Math.PI, lbl: '2π', deg: '360°' }
            ];
            svg.appendChild(svgVarText({ x: GX0, y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, ['0']));
            TICKS.forEach(function (tk) {
                var xk = GX(tk.rad);
                svg.appendChild(svgEl('line', { x1: xk, y1: axisY - 4, x2: xk, y2: axisY + 4, stroke: COL.axis, 'stroke-width': 1.2 }));
                svg.appendChild(svgVarText({ x: xk, y: axisY + 16, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tick }, [tk.lbl]));
                svg.appendChild(svgVarText({ x: xk, y: axisY + 30, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [tk.deg]));
            });
            svg.appendChild(svgVarText({ x: GX0 - 8, y: TY(1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['1']));
            svg.appendChild(svgVarText({ x: GX0 - 8, y: TY(-1) + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['−1']));

            // ── Cirkelns rand ───────────────────────────────────────────────
            svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: COL.axis, 'stroke-width': 1.5 }));

            // ── Cirkelns egna lokala x/y-axlar ──────────────────────────────
            svg.appendChild(svgEl('line', { x1: 14, y1: axisY, x2: X_TAN + 18, y2: axisY, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: (X_TAN + 26) + ',' + axisY + ' ' + (X_TAN + 17) + ',' + (axisY - 4.2) + ' ' + (X_TAN + 17) + ',' + (axisY + 4.2), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: CX, y1: CY + R + 14, x2: CX, y2: CY - R - 18, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', { points: CX + ',' + (CY - R - 26) + ' ' + (CX - 4.2) + ',' + (CY - R - 17) + ' ' + (CX + 4.2) + ',' + (CY - R - 17), fill: COL.axis }));

            // ── Tangentlinjen x = 1 (bläck, spänner hela synliga bandet) ────
            svg.appendChild(svgEl('line', { x1: X_TAN, y1: T, x2: X_TAN, y2: BOT, stroke: COL.axis, 'stroke-width': 1.8 }));
            svg.appendChild(svgVarText({ x: X_TAN + 6, y: T + 12, 'font-size': 12, 'text-anchor': 'start', fill: COL.axis }, ['*x', ' = 1']));
            // Ruttmärken ±1, ±2 på tangentlinjen
            [1, 2, -1, -2].forEach(function (k) {
                var ky = TY(k);
                if (ky < T + 6 || ky > BOT - 6) return;
                svg.appendChild(svgEl('line', { x1: X_TAN - 5, y1: ky, x2: X_TAN + 5, y2: ky, stroke: COL.axis, 'stroke-width': 1.2 }));
            });

            // ── Liten vinkelbåge + v-etikett nära origo (endast v ≤ 180°) ──
            if (vDeg > 6 && vDeg <= 180) {
                var nSmall = Math.max(2, Math.round(vDeg / 6));
                var dSmall = '';
                for (var is = 0; is <= nSmall; is++) {
                    var dsdeg = vDeg * is / nSmall;
                    var ps = circlePoint(dsdeg, RSMALL);
                    dSmall += (is === 0 ? 'M' : 'L') + ps.x.toFixed(1) + ' ' + ps.y.toFixed(1) + ' ';
                }
                svg.appendChild(svgEl('path', { d: dSmall, fill: 'none', stroke: COL.axis, 'stroke-width': 1.3 }));
                var bisDeg = vDeg / 2;
                if (Math.abs(bisDeg - 90) < 4) bisDeg -= 6;
                var bis = circlePoint(bisDeg, RSMALL + 12);
                svg.appendChild(svgVarText({ x: bis.x, y: bis.y + 4, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*v']));
            }

            // ── Konstruktionen: strålen/linjen, segmentet, punkterna ────────
            var g2 = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            var P = circlePoint(vDeg, R);
            var O = { x: CX, y: CY };

            if (asym) {
                // Strålen är parallell med tangentlinjen — ingen skärning.
                var edgeY = Math.sin(t) > 0 ? T : BOT;
                g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: P.x, y2: P.y, stroke: COL.axis, 'stroke-width': 1.8 }));
                g2.appendChild(svgEl('line', {
                    x1: P.x, y1: P.y, x2: P.x, y2: edgeY,
                    stroke: COL.dash, 'stroke-width': 1.8, 'stroke-dasharray': '6 5'
                }));
            } else {
                var tanVal = Math.tan(t);
                var tanClamped = clampNum(tanVal, -CLAMP_TAN, CLAMP_TAN);
                var hit = { x: X_TAN, y: TY(tanVal) };
                var cosT = Math.cos(t);
                var vDeg2 = (vDeg + 180) % 360;
                var P2 = circlePoint(vDeg2, R);

                if (state.compare) {
                    // "Avslöjandet": hela linjen ritas heldragen i accentfärg —
                    // O→P, O→P2 och O→skärningspunkten är samma linje.
                    g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: P.x, y2: P.y, stroke: COL.tan, 'stroke-width': 1.8 }));
                    g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: P2.x, y2: P2.y, stroke: COL.tan, 'stroke-width': 1.8 }));
                    g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: hit.x, y2: hit.y, stroke: COL.tan, 'stroke-width': 1.8 }));
                    g2.appendChild(svgEl('circle', { cx: P2.x, cy: P2.y, r: 4, fill: '#fff', stroke: COL.tan, 'stroke-width': 2 }));
                    // Etiketten nudgas tangentiellt bort från vinkeln 0°/360°
                    // (tangentpunkten) — annars kan den hamna ovanpå den
                    // lodräta linjen x = 1 eller det röda segmentet, som
                    // alltid ligger i just den riktningen från origo.
                    var lblAngle = vDeg2 + (vDeg2 <= 180 ? 20 : -20);
                    var lbl2 = circlePoint(lblAngle, R + 14);
                    // Nära vänsterkanten (vDeg2 ≈ 180°) kan mitten-ankrad
                    // text sticka ut utanför viewBoxen — ankra då till
                    // vänster kant i stället och låt texten växa åt höger.
                    var lblAnchor = 'middle', lblX = lbl2.x;
                    if (lblX < 46) { lblAnchor = 'start'; lblX = 6; }
                    svg.appendChild(svgVarText(
                        { x: lblX, y: lbl2.y + 4, 'font-size': 11.5, 'text-anchor': lblAnchor, fill: COL.tan },
                        ['*v', ' + 180°']));
                } else if (cosT > 0) {
                    // Strålen räcker fram: en sammanhängande linje O → skärningspunkten.
                    g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: hit.x, y2: hit.y, stroke: COL.axis, 'stroke-width': 1.8 }));
                } else {
                    // Strålen genom P räcker inte fram — bakåtförlängningen
                    // (streckad) träffar linjen på andra sidan origo.
                    var Pext = circlePoint(vDeg, R * 1.16);
                    g2.appendChild(svgEl('line', { x1: O.x, y1: O.y, x2: Pext.x, y2: Pext.y, stroke: COL.axis, 'stroke-width': 1.8 }));
                    g2.appendChild(svgEl('line', {
                        x1: O.x, y1: O.y, x2: hit.x, y2: hit.y,
                        stroke: COL.dash, 'stroke-width': 1.8, 'stroke-dasharray': '6 5'
                    }));
                }

                // Segmentet på tangentlinjen: foten (x=1, y=0) → skärningspunkten
                var foot = { x: X_TAN, y: CY };
                g2.appendChild(svgEl('line', {
                    x1: foot.x, y1: foot.y, x2: hit.x, y2: hit.y,
                    stroke: COL.tan, 'stroke-width': 5, 'stroke-linecap': 'butt'
                }));
                g2.appendChild(svgEl('circle', { cx: hit.x, cy: hit.y, r: state.compare ? 5 : 4, fill: COL.tan }));

                // Vågrät guidelinje: skärningspunkten → grafpunkten (samma höjd)
                var gx = GX(t);
                if (hit.y >= T + 2 && hit.y <= BOT - 2) {
                    g2.appendChild(svgEl('line', {
                        x1: hit.x, y1: hit.y, x2: gx, y2: hit.y,
                        stroke: COL.dash, 'stroke-width': 1.1, 'stroke-dasharray': '4 3'
                    }));
                }
                g2.appendChild(svgEl('circle', { cx: gx, cy: TY(tanClamped), r: 4.2, fill: COL.tan }));
                if (state.compare) {
                    var t2 = vDeg2 * Math.PI / 180;
                    var gx2 = GX(t2);
                    g2.appendChild(svgEl('circle', { cx: gx2, cy: TY(tanClamped), r: 4.2, fill: '#fff', stroke: COL.tan, 'stroke-width': 2 }));
                }
            }
            svg.appendChild(g2);

            // ── Dragbar punkt P (alltid ovanpå, aldrig klippt) ──────────────
            svg.appendChild(svgEl('circle', { cx: P.x, cy: P.y, r: 5, fill: COL.tan }));
            var hitCircle = svgEl('circle', { cx: P.x, cy: P.y, r: 16, fill: 'rgba(0,0,0,0)' });
            hitCircle.style.cursor = 'grab';
            hitCircle.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitCircle);

            // ── Fast avläsning uppe till vänster (fri yta, kolliderar aldrig) ──
            var readParts;
            if (asym) {
                readParts = ['tan ', String(vDeg) + '° odefinierad'];
            } else {
                var eqc = chooseEq(Math.tan(t), 2) === '=' ? '=' : '≈';
                readParts = ['tan ', '*v', ' ' + eqc + ' ' + fmt(Math.tan(t), 2)];
            }
            svg.appendChild(svgVarText({ x: 16, y: T + 16, 'font-size': 13, 'text-anchor': 'start', fill: COL.tan }, readParts));
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var vDeg = state.vDeg, t = vDeg * Math.PI / 180;
            var asym = isAsymptote(vDeg);
            var sinV = Math.sin(t), cosV = Math.cos(t);

            if (asym) {
                katexInto(formelA, '\\tan ' + vDeg + '^\\circ \\text{ är inte definierat}');
                katexInto(formelB,
                    '\\tan v = \\dfrac{\\sin v}{\\cos v} = \\dfrac{' + fmtTex(sinV, 2) + '}{0}');
                note.innerHTML = 'Vid exakt ' + vDeg + '° är strålen parallell med linjen ' +
                    '<em>x</em> = 1 — de möts aldrig. <em>tan</em> ' + vDeg + '° är inte definierat.';
            } else {
                var tanV = Math.tan(t);
                var eq = chooseEq(tanV, 2);
                katexInto(formelA, '\\tan ' + vDeg + '^\\circ ' + eq + ' ' + fmtTex(tanV, 2));
                katexInto(formelB,
                    '\\tan v = \\dfrac{\\sin v}{\\cos v} = \\dfrac{' + fmtTex(sinV, 2) + '}{' +
                    fmtTex(cosV, 2) + '} ' + eq + ' ' + fmtTex(tanV, 2));

                if (state.compare) {
                    var vDeg2 = (vDeg + 180) % 360;
                    note.innerHTML = '<em>v</em> = ' + vDeg + '° och <em>v</em> + 180° = ' + vDeg2 +
                        '° ligger på exakt samma linje genom origo (samma färg i grafen) — de ' +
                        'träffar tangentlinjen i samma punkt. Perioden är därför 180° (π rad), ' +
                        'inte 360°.';
                } else if (state.step === 2 && Math.min(Math.abs(vDeg - 90), Math.abs(vDeg - 270)) <= 15) {
                    note.innerHTML = 'Ju närmare 90° (eller 270°), desto snabbare växer <em>tan</em> <em>v</em> ' +
                        'mot oändligheten.';
                } else {
                    note.textContent = '';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            actions.style.display = state.step === 3 ? '' : 'none';
            drawScene();
            updateFormulas();
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
    window.VISUALISERINGAR['ma4-1.13'] = api;
})();
