/* ma2c-4.10.js — visualisering: "SSA-tvetydigheten — hur många trianglar?"
 * Hör till ma2c-4.10 (Kongruens).
 *
 * Kärninsikt: två sidor (a, c) och en vinkel (A) som INTE ligger mellan dem
 * (SSA) bestämmer ibland 0, 1 eller 2 olika trianglar. Konstruktionen: en
 * fast bas-stråle från hörnet A, en given vinkel A, en fast sida c = AB
 * längs vinkelbenet. Från B svänger sidan a (dragbar längd) som en cirkel
 * — tredje hörnet C måste ligga BÅDE på cirkeln OCH på bas-strålen. Cirkeln
 * skär strålen i 0, 1 eller 2 punkter, beroende på hur a förhåller sig
 * till höjden c·sin A och till c självt. Därför är SSA inget kongruensfall
 * (till skillnad från SSS, SVS, VSV — se ma2c-4.10.md) och därför ger
 * sinussatsen ibland två svar C₁ = sin⁻¹(...) och C₂ = 180° − C₁ (se
 * exempel 2 i ma3c-6.6.md, samma räknemönster återanvänds i steg 3).
 *
 * Tre steg (lager):
 *   1. Svep med sidan       — dra i cirkelns handtag (eller a-glidaren),
 *                             se antalet trianglar och gränsvillkoren live.
 *   2. Därför är SSA inget kongruensfall — de två trianglarna sida vid
 *                             sida med tvärstreck på a och c, men olika b/C.
 *   3. Sinussatsen ger två svar — algebraisk härledning av C₁/C₂, matchar
 *                             ma3c-6.6 exempel 2:s uppställning.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['ma2c-4.10'] = { mount }.
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

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        axis: '#1f2530',
        tick: '#5b6472',
        grid: 'rgba(31,37,48,0.10)',
        dash: 'rgba(31,37,48,0.42)',
        circle: '#6b4fa0',   // lila — svepcirkeln och höjden
        green: '#2f8f4e',    // triangel med den trubbiga vinkeln C₂
        blue: '#2563c9',     // triangel med den spetsiga vinkeln C₁ (eller enda triangeln)
        bad: '#b23b3b'       // ingen triangel
    };

    // ── Geometrihjälp: generisk vinkelbåge (skärmvinklar, se CLAUDE.md) ──
    function normDelta(d) {
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d <= -Math.PI) d += 2 * Math.PI;
        return d;
    }
    function arcPath(cx, cy, r, a1, a2) {
        var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
        var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
        var delta = normDelta(a2 - a1);
        var sweep = delta > 0 ? 1 : 0;
        return 'M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
            ' A ' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + x2.toFixed(2) + ' ' + y2.toFixed(2);
    }
    function toScreen(worldRad) { return -worldRad; }
    function arrowHead(tipX, tipY, dirAngle, size, color) {
        var spread = 0.42;
        var w1 = dirAngle + Math.PI - spread, w2 = dirAngle + Math.PI + spread;
        var p1x = tipX + size * Math.cos(w1), p1y = tipY + size * Math.sin(w1);
        var p2x = tipX + size * Math.cos(w2), p2y = tipY + size * Math.sin(w2);
        return svgEl('polygon', {
            points: tipX.toFixed(1) + ',' + tipY.toFixed(1) + ' ' + p1x.toFixed(1) + ',' + p1y.toFixed(1) + ' ' + p2x.toFixed(1) + ',' + p2y.toFixed(1),
            fill: color
        });
    }
    function perpLabel(p1, p2, dist, sign, t) {
        if (t == null) t = 0.5;
        var dx = p2.x - p1.x, dy = p2.y - p1.y, len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len * sign, ny = dx / len * sign;
        var bx = p1.x + dx * t, by = p1.y + dy * t;
        return { x: bx + nx * dist, y: by + ny * dist };
    }
    function tickMarks(container, p1, p2, count, color) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y, len = Math.hypot(dx, dy) || 1;
        var ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
        var spacing = 5, mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
        for (var i = 0; i < count; i++) {
            var t = (i - (count - 1) / 2) * spacing;
            var cx = mx + ux * t, cy = my + uy * t;
            container.appendChild(svgEl('line', {
                x1: (cx - nx * 4.5).toFixed(1), y1: (cy - ny * 4.5).toFixed(1),
                x2: (cx + nx * 4.5).toFixed(1), y2: (cy + ny * 4.5).toFixed(1),
                stroke: color, 'stroke-width': 1.4
            }));
        }
    }
    // Fit en punktmängd (world-koord) in i en pixel-cell, isotrop skala.
    function fitTransform(pts, cellL, cellT, cellW, cellH, pad) {
        var xs = pts.map(function (p) { return p.x; });
        var ys = pts.map(function (p) { return p.y; });
        var xmin = Math.min.apply(null, xs) - pad, xmax = Math.max.apply(null, xs) + pad;
        var ymin = Math.min(0, Math.min.apply(null, ys)) - pad, ymax = Math.max.apply(null, ys) + pad;
        var s = Math.min(cellW / (xmax - xmin), cellH / (ymax - ymin));
        var usedW = (xmax - xmin) * s, usedH = (ymax - ymin) * s;
        var x0 = cellL + (cellW - usedW) / 2 - xmin * s;
        var y0 = cellT + (cellH - usedH) / 2 + ymax * s;
        return { X: function (x) { return x0 + x * s; }, Y: function (y) { return y0 - y * s; }, s: s };
    }

    function mount(el) {
        // ── Konstanter (matchar sinussatsens beteckningar: a mitt emot A,
        //    c = AB den fasta sidan mitt emot C) ────────────────────────
        var C_SIDE = 5;
        var A_MIN = 20, A_MAX = 110, A_STEP = 1;
        var LEN_MIN = 1.5, LEN_MAX = 8.5, LEN_STEP = 0.1;
        var state = { A: 55, a: 4.3, step: 1, showHeight: true };

        // ── Geometri: cirkel (radie a, centrum B) möter bas-strålen ─────
        function solveGeometry(a, Adeg, c) {
            var Arad = Adeg * Math.PI / 180;
            var Bx = c * Math.cos(Arad), By = c * Math.sin(Arad);
            var h = By; // höjden från B ner till bas-strålen
            var disc = a * a - h * h;
            var EPS = 1e-6, roots = [];
            if (disc > EPS) {
                var sq = Math.sqrt(disc);
                var x1 = Bx - sq, x2 = Bx + sq;
                if (x1 > EPS) roots.push(x1);
                if (x2 > EPS) roots.push(x2);
            } else if (disc >= -EPS) {
                if (Bx > EPS) roots.push(Bx);
            }
            roots.sort(function (p, q) { return p - q; });
            return { Bx: Bx, By: By, h: h, disc: disc, roots: roots };
        }
        function angleAtC(x, Bx, By) {
            var v1x = -x, v1y = 0, v2x = Bx - x, v2y = By;
            var mag = Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y);
            if (mag < 1e-9) return 0;
            var cosT = clampNum((v1x * v2x + v1y * v2y) / mag, -1, 1);
            return Math.acos(cosT) * 180 / Math.PI;
        }
        // Klassificera rötterna: 1 rot → enda triangeln (blå). 2 rötter →
        // den med minst vinkel vid C blir C₁ (spetsig, blå), störst blir
        // C₂ (trubbig, grön) — matchar sin C₁ = sin⁻¹(...), C₂ = 180°−C₁.
        function classifyRoots(roots, Bx, By) {
            if (roots.length === 0) return [];
            if (roots.length === 1) {
                return [{ x: roots[0], angle: angleAtC(roots[0], Bx, By), label: 'C', color: COL.blue }];
            }
            var items = roots.map(function (x) { return { x: x, angle: angleAtC(x, Bx, By) }; });
            items.sort(function (p, q) { return p.angle - q.angle; });
            items[0].label = 'C₁'; items[0].color = COL.blue;
            items[1].label = 'C₂'; items[1].color = COL.green;
            return items;
        }
        function regimeOf(a, c, h, count) {
            if (count === 0) return '0';
            if (count === 2) return '2';
            return (a < c - 1e-6) ? 'tangent' : 'big';
        }

        // ── World-fönster: räknas om varje ritning så att den AKTUELLA
        //    cirkeln (radie a) och ledarbågen (radie c) alltid fyller
        //    scenen bra — annars blir små/stora a-värden panorerade i en
        //    scen dimensionerad för det extremaste fallet. ────────────
        var W = 560, H = 420, L = 46, R = 16, T = 26, B = 34;
        var PW = W - L - R, PH = H - T - B;
        var curX0 = 0, curY0 = 0, curScale = 20; // senaste ritningens transform (för drag)
        function computeWindow(a, Adeg, c, roots) {
            var Arad = Adeg * Math.PI / 180;
            var Bx = c * Math.cos(Arad), By = c * Math.sin(Arad);
            var pts = [
                { x: 0, y: 0 },
                { x: Bx - a, y: By }, { x: Bx + a, y: By }, { x: Bx, y: By - a }, { x: Bx, y: By + a },
                { x: c * Math.cos(A_MIN * Math.PI / 180), y: c * Math.sin(A_MIN * Math.PI / 180) },
                { x: c * Math.cos(A_MAX * Math.PI / 180), y: c * Math.sin(A_MAX * Math.PI / 180) },
                { x: 0, y: c }
            ];
            roots.forEach(function (r) { pts.push({ x: r, y: 0 }); });
            var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
            var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
            var ymin = Math.min(0, Math.min.apply(null, ys)), ymax = Math.max.apply(null, ys);
            var pad = Math.max(xmax - xmin, ymax - ymin) * 0.16 + 0.35;
            return { xmin: xmin - pad, xmax: xmax + pad + 0.9, ymin: ymin - pad, ymax: ymax + pad };
        }
        function applyWindow(win) {
            var spanX = win.xmax - win.xmin, spanY = win.ymax - win.ymin;
            var scale = Math.min(PW / spanX, PH / spanY);
            var usedW = spanX * scale, usedH = spanY * scale;
            var x0 = L + (PW - usedW) / 2 - win.xmin * scale;
            var y0 = T + (PH - usedH) / 2 + win.ymax * scale;
            curX0 = x0; curY0 = y0; curScale = scale;
            return {
                X: function (x) { return x0 + x * scale; },
                Y: function (y) { return y0 - y * scale; },
                s: scale, xmax: win.xmax
            };
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'SSA-tvetydigheten — hur många trianglar?';
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
            viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif', role: 'img'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);
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
        var legCircle = legendItem(COL.circle, 'cirkel, radie <em>a</em> kring <em>B</em>');
        var legBlue = legendItem(COL.blue, 'triangel med <em>C</em>₁ (spetsig)');
        var legGreen = legendItem(COL.green, 'triangel med <em>C</em>₂ (trubbig)');
        legend.appendChild(legCircle);
        legend.appendChild(legBlue);
        legend.appendChild(legGreen);

        var counter = document.createElement('div');
        counter.className = 'lab-vis-formel';
        counter.style.fontSize = '19px';
        counter.style.fontWeight = '600';
        counter.style.marginTop = '10px';
        card.appendChild(counter);

        var formelHeight = document.createElement('div');
        formelHeight.className = 'lab-vis-formel';
        formelHeight.style.color = COL.circle;
        formelHeight.style.fontSize = '15px';
        card.appendChild(formelHeight);

        var formelStatus = document.createElement('div');
        formelStatus.className = 'lab-vis-formel';
        formelStatus.style.fontSize = '15px';
        card.appendChild(formelStatus);

        var derivWrap = document.createElement('div');
        card.appendChild(derivWrap);
        var derivLines = [];
        for (var dl = 0; dl < 4; dl++) {
            var dRow = document.createElement('div');
            dRow.className = 'lab-vis-formel';
            dRow.style.fontSize = '15px';
            derivWrap.appendChild(dRow);
            derivLines.push(dRow);
        }

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var demoNote = document.createElement('div');
        demoNote.className = 'lab-vis-note';
        demoNote.style.color = 'var(--lab-ink-muted)';
        card.appendChild(demoNote);

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
            { n: 1, label: '1 · Svep med sidan' },
            { n: 2, label: '2 · Inget kongruensfall' },
            { n: 3, label: '3 · Sinussatsen' }
        ];
        var INSTR = {
            1: 'Dra i den lila punkten ovanför <em>B</em> (eller <em>a</em>-glidaren) — den sätter längden på sidan ' +
               '<em>a</em> = <em>BC</em>. Punkten <em>C</em> måste ligga BÅDE på cirkeln OCH på bas-strålen från ' +
               '<em>A</em>. Gissa innan du drar: kan samma tre mått ge två OLIKA trianglar?',
            2: 'Samma tre mått <em>a</em>, <em>c</em> och vinkel <em>A</em> gav nyss två olika trianglar. De är ' +
               'utlyfta här, sida vid sida — strecken visar att <em>a</em> och <em>c</em> är exakt lika i båda, ' +
               'men sidan <em>b</em> och vinkeln vid <em>C</em> skiljer sig.',
            3: 'Sinussatsen löser ut vinkeln <em>C</em> ur <em>a</em>, <em>c</em> och <em>A</em>. Ekvationen ' +
               'sin <em>C</em> = ... har ofta TVÅ lösningar mellan 0° och 180° — det är därför sinussatsen ibland ' +
               'ger två svar, precis som scenen visar.'
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

        // ── Preset-knappar (hoppa till karakteristiska lägen) ───────────
        function presets() {
            var Arad = state.A * Math.PI / 180;
            var h = C_SIDE * Math.sin(Arad);
            return {
                zero: clampNum(h * 0.55, LEN_MIN, LEN_MAX),
                tangent: clampNum(h, LEN_MIN, LEN_MAX),
                two: clampNum(h + 0.25 * (C_SIDE - h), LEN_MIN, LEN_MAX),
                big: clampNum(C_SIDE * 1.4, LEN_MIN, LEN_MAX)
            };
        }
        function presetBtn(txt, get) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = txt;
            b.addEventListener('click', function () {
                state.a = get();
                rowLen.sync();
                update();
            });
            actions.appendChild(b);
            return b;
        }
        var btnZero = presetBtn('0 trianglar', function () { return presets().zero; });
        var btnTangent = presetBtn('1 (rätvinklig)', function () { return presets().tangent; });
        var btnTwo = presetBtn('2 trianglar', function () { return presets().two; });
        var btnBig = presetBtn('1 (stor a)', function () { return presets().big; });

        var heightLabel = document.createElement('label');
        heightLabel.className = 'lab-graf-check';
        var heightCb = document.createElement('input');
        heightCb.type = 'checkbox';
        heightCb.checked = true;
        heightCb.addEventListener('change', function () { state.showHeight = heightCb.checked; update(); });
        heightLabel.appendChild(heightCb);
        var heightTxt = document.createElement('span');
        heightTxt.innerHTML = 'Visa höjden <em>c</em>·sin <em>A</em>';
        heightLabel.appendChild(heightTxt);
        actions.appendChild(heightLabel);

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
                slider.style.background = 'linear-gradient(to right, ' + COL.circle + ' 0%, ' +
                    COL.circle + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
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
            field.addEventListener('blur', function () { field.value = fmt(get(), decimals).replace(',', '.'); });
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
        var rowA = makeRow('A', A_MIN, A_MAX, A_STEP,
            function () { return state.A; },
            function (v) { state.A = Math.round(v / A_STEP) * A_STEP; });
        var rowLen = makeRow('a', LEN_MIN, LEN_MAX, LEN_STEP,
            function () { return state.a; },
            function (v) { state.a = Math.round(v / LEN_STEP) * LEN_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.A = 55; state.a = 4.3; state.showHeight = true;
            heightCb.checked = true;
            rowA.sync(); rowLen.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Drag: B (ändrar vinkel A) och handtag på cirkeln (ändrar a) ──
        function toWorld(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return { x: (px - curX0) / curScale, y: (curY0 - py) / curScale };
        }
        var dragging = null; // 'angle' | 'len' | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var w = toWorld(e.clientX, e.clientY);
            if (dragging === 'angle') {
                var deg = Math.atan2(w.y, w.x) * 180 / Math.PI;
                state.A = Math.round(clampNum(deg, A_MIN, A_MAX) / A_STEP) * A_STEP;
                rowA.sync();
            } else if (dragging === 'len') {
                var Arad = state.A * Math.PI / 180;
                var Bx = C_SIDE * Math.cos(Arad), By = C_SIDE * Math.sin(Arad);
                var dist = Math.hypot(w.x - Bx, w.y - By);
                state.a = Math.round(clampNum(dist, LEN_MIN, LEN_MAX) / LEN_STEP) * LEN_STEP;
                rowLen.sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita: överlappande konstruktion (steg 1 och 3) ──────────────
        function drawOverlap() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, Adeg = state.A, c = C_SIDE;
            var geo = solveGeometry(a, Adeg, c);
            var Arad = Adeg * Math.PI / 180;
            var cls = classifyRoots(geo.roots, geo.Bx, geo.By);
            var tf = applyWindow(computeWindow(a, Adeg, c, geo.roots));
            var X = tf.X, Y = tf.Y, SCALE = tf.s;
            var Apx = { x: X(0), y: Y(0) }, Bpx = { x: X(geo.Bx), y: Y(geo.By) };

            // ledarbåge (radie c) — visar var B kan glida
            svg.appendChild(svgEl('path', {
                d: arcPath(Apx.x, Apx.y, c * SCALE, toScreen(A_MIN * Math.PI / 180), toScreen(A_MAX * Math.PI / 180)),
                fill: 'none', stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '2 5'
            }));

            // bas-strålen (obegränsad)
            var rayEnd = tf.xmax - 0.5;
            svg.appendChild(svgEl('line', { x1: Apx.x, y1: Apx.y, x2: X(rayEnd), y2: Apx.y, stroke: COL.axis, 'stroke-width': 1.8 }));
            svg.appendChild(arrowHead(X(rayEnd + 0.35), Apx.y, 0, 8, COL.axis));

            // höjden (dashad lodrät) c·sin A
            if (state.showHeight) {
                svg.appendChild(svgEl('line', {
                    x1: Bpx.x, y1: Bpx.y, x2: Bpx.x, y2: Apx.y,
                    stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
                }));
            }

            // svepcirkeln (radie a, centrum B)
            svg.appendChild(svgEl('circle', {
                cx: Bpx.x, cy: Bpx.y, r: a * SCALE, fill: 'none',
                stroke: COL.circle, 'stroke-width': 1.6, 'stroke-dasharray': '5 4'
            }));

            // vinkelbåge vid A + gradtal
            var rArcA = clampNum(SCALE * 0.5, 18, 36);
            svg.appendChild(svgEl('path', {
                d: arcPath(Apx.x, Apx.y, rArcA, 0, toScreen(Arad)),
                fill: 'none', stroke: COL.axis, 'stroke-width': 1.4
            }));
            var midAngA = toScreen(Arad / 2);
            svg.appendChild(svgVarText({
                x: (Apx.x + (rArcA + 15) * Math.cos(midAngA)).toFixed(1),
                y: (Apx.y + (rArcA + 15) * Math.sin(midAngA) + 4).toFixed(1),
                'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis
            }, [fmt(Adeg, 0) + '°']));

            // sida c (A–B)
            svg.appendChild(svgEl('line', { x1: Apx.x, y1: Apx.y, x2: Bpx.x, y2: Bpx.y, stroke: COL.axis, 'stroke-width': 1.8 }));
            var cLab = perpLabel(Apx, Bpx, 15, 1, 0.3);
            svg.appendChild(svgVarText({ x: cLab.x.toFixed(1), y: (cLab.y + 4).toFixed(1), 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*c']));

            // trianglar (fyllning + a-sidor + C-punkter)
            cls.forEach(function (item) {
                var Cpx = { x: X(item.x), y: Y(0) };
                svg.appendChild(svgEl('polygon', {
                    points: Apx.x + ',' + Apx.y + ' ' + Bpx.x + ',' + Bpx.y + ' ' + Cpx.x + ',' + Cpx.y,
                    fill: item.color, 'fill-opacity': 0.15, stroke: 'none'
                }));
            });
            cls.forEach(function (item, idx) {
                var Cpx = { x: X(item.x), y: Y(0) };
                svg.appendChild(svgEl('line', {
                    x1: Bpx.x, y1: Bpx.y, x2: Cpx.x, y2: Cpx.y,
                    stroke: item.color, 'stroke-width': 2.2, 'stroke-linecap': 'round'
                }));
                var sign = (item.label === 'C₂') ? -1 : 1;
                var aLab = perpLabel(Bpx, Cpx, 13, sign, 0.62);
                svg.appendChild(svgVarText({ x: aLab.x.toFixed(1), y: (aLab.y + 4).toFixed(1), 'font-size': 13, 'text-anchor': 'middle', fill: item.color }, ['*a']));

                // rät vinkel-markör om tangentfallet (endast 1 rot, a = h)
                if (cls.length === 1 && Math.abs(geo.disc) <= 1e-4 * Math.max(1, a * a)) {
                    var s = 9;
                    svg.appendChild(svgEl('polyline', {
                        points: (Cpx.x - s) + ',' + Cpx.y + ' ' + (Cpx.x - s) + ',' + (Cpx.y - s) + ' ' + Cpx.x + ',' + (Cpx.y - s),
                        fill: 'none', stroke: item.color, 'stroke-width': 1.3
                    }));
                }

                // vertex-etikett vid C (staggra om två punkter ligger nära)
                var closeRoots = cls.length === 2 && (cls[1].x - cls[0].x) * SCALE < 42;
                var dy = 16 + (closeRoots ? idx * 13 : 0);
                svg.appendChild(svgVarText({ x: Cpx.x, y: (Cpx.y + dy).toFixed(1), 'font-size': 12.5, 'text-anchor': 'middle', fill: item.color }, [item.label]));
                svg.appendChild(svgEl('circle', { cx: Cpx.x, cy: Cpx.y, r: 3.6, fill: item.color }));
            });

            // punkt A och B + etiketter
            svg.appendChild(svgEl('circle', { cx: Apx.x, cy: Apx.y, r: 3.2, fill: COL.axis }));
            svg.appendChild(svgVarText({ x: Apx.x - 9, y: Apx.y + 16, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['A']));
            svg.appendChild(svgEl('circle', { cx: Bpx.x, cy: Bpx.y, r: 3.6, fill: COL.axis }));
            svg.appendChild(svgVarText({ x: Bpx.x, y: Bpx.y - 10, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['B']));

            // dragbara handtag: B (vinkel) + lila punkt ovanför B (längd a)
            var hitB = svgEl('circle', { cx: Bpx.x, cy: Bpx.y, r: 15, fill: 'rgba(0,0,0,0)' });
            hitB.style.cursor = 'grab';
            hitB.addEventListener('pointerdown', function (e) {
                dragging = 'angle';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitB);

            var handlePx = { x: X(geo.Bx), y: Y(geo.By + a) };
            svg.appendChild(svgEl('line', { x1: Bpx.x, y1: Bpx.y, x2: handlePx.x, y2: handlePx.y, stroke: COL.circle, 'stroke-width': 1, 'stroke-dasharray': '2 3', opacity: 0.6 }));
            svg.appendChild(svgEl('circle', { cx: handlePx.x, cy: handlePx.y, r: 5, fill: COL.circle }));
            var hitLen = svgEl('circle', { cx: handlePx.x, cy: handlePx.y, r: 15, fill: 'rgba(0,0,0,0)' });
            hitLen.style.cursor = 'grab';
            hitLen.addEventListener('pointerdown', function (e) {
                dragging = 'len';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitLen);

            svg.setAttribute('aria-label', 'Konstruktion: vinkel A vid hörnet A, sidan c upp till B, och en cirkel med ' +
                'radie a kring B som sveper mot bas-strålen. Just nu ger måtten ' + cls.length + ' triangel eller trianglar.');
        }

        // ── Rita: de två trianglarna sida vid sida (steg 2) ─────────────
        function demoParamsForStep2() {
            var Arad = state.A * Math.PI / 180;
            var h = C_SIDE * Math.sin(Arad);
            var liveGeo = solveGeometry(state.a, state.A, C_SIDE);
            if (state.A < 90 && liveGeo.roots.length === 2) {
                return { A: state.A, a: state.a, isLive: true };
            }
            if (state.A < 90) {
                return { A: state.A, a: clampNum(h + 0.25 * (C_SIDE - h), LEN_MIN, LEN_MAX), isLive: false };
            }
            return { A: 55, a: 4.3, isLive: false };
        }
        function drawPanelTriangle(tf, Bx, By, item, Adeg) {
            var Apx = { x: tf.X(0), y: tf.Y(0) };
            var Bpx = { x: tf.X(Bx), y: tf.Y(By) };
            var Cpx = { x: tf.X(item.x), y: tf.Y(0) };
            svg.appendChild(svgEl('polygon', {
                points: Apx.x + ',' + Apx.y + ' ' + Bpx.x + ',' + Bpx.y + ' ' + Cpx.x + ',' + Cpx.y,
                fill: item.color, 'fill-opacity': 0.15, stroke: 'none'
            }));
            svg.appendChild(svgEl('line', { x1: Apx.x, y1: Apx.y, x2: Bpx.x, y2: Bpx.y, stroke: item.color, 'stroke-width': 2 }));
            svg.appendChild(svgEl('line', { x1: Bpx.x, y1: Bpx.y, x2: Cpx.x, y2: Cpx.y, stroke: item.color, 'stroke-width': 2 }));
            svg.appendChild(svgEl('line', { x1: Apx.x, y1: Apx.y, x2: Cpx.x, y2: Cpx.y, stroke: item.color, 'stroke-width': 2 }));
            tickMarks(svg, Apx, Bpx, 1, COL.axis);
            tickMarks(svg, Bpx, Cpx, 2, COL.axis);

            var rA = 19, Arad = Adeg * Math.PI / 180;
            svg.appendChild(svgEl('path', { d: arcPath(Apx.x, Apx.y, rA, 0, toScreen(Arad)), fill: 'none', stroke: COL.axis, 'stroke-width': 1.3 }));
            var midA = toScreen(Arad / 2);
            svg.appendChild(svgVarText({
                x: (Apx.x + (rA + 13) * Math.cos(midA)).toFixed(1), y: (Apx.y + (rA + 13) * Math.sin(midA) + 4).toFixed(1),
                'font-size': 11.5, 'text-anchor': 'middle', fill: COL.axis
            }, [fmt(Adeg, 0) + '°']));

            var toA = Math.atan2(Apx.y - Cpx.y, Apx.x - Cpx.x);
            var toB = Math.atan2(Bpx.y - Cpx.y, Bpx.x - Cpx.x);
            var rC = 15;
            svg.appendChild(svgEl('path', { d: arcPath(Cpx.x, Cpx.y, rC, toA, toB), fill: 'none', stroke: item.color, 'stroke-width': 1.3 }));
            var midC = toA + normDelta(toB - toA) / 2;
            svg.appendChild(svgVarText({
                x: (Cpx.x + (rC + 14) * Math.cos(midC)).toFixed(1), y: (Cpx.y + (rC + 14) * Math.sin(midC) + 4).toFixed(1),
                'font-size': 11.5, 'text-anchor': 'middle', fill: item.color
            }, [fmt(item.angle, 1) + '°']));

            svg.appendChild(svgVarText({ x: Apx.x - 8, y: Apx.y + 15, 'font-size': 12, 'text-anchor': 'end', fill: COL.axis }, ['A']));
            svg.appendChild(svgVarText({ x: Bpx.x, y: Bpx.y - 9, 'font-size': 12, 'text-anchor': 'middle', fill: COL.axis }, ['B']));
            svg.appendChild(svgVarText({ x: Cpx.x, y: Cpx.y + 15, 'font-size': 12, 'text-anchor': 'middle', fill: item.color }, [item.label]));

            var cLab = perpLabel(Apx, Bpx, 13, -1, 0.3);
            svg.appendChild(svgVarText({ x: cLab.x.toFixed(1), y: (cLab.y + 4).toFixed(1), 'font-size': 12, 'text-anchor': 'middle', fill: COL.axis }, ['*c']));
            var aLab = perpLabel(Bpx, Cpx, 13, 1, 0.62);
            svg.appendChild(svgVarText({ x: aLab.x.toFixed(1), y: (aLab.y + 4).toFixed(1), 'font-size': 12, 'text-anchor': 'middle', fill: item.color }, ['*a']));
            var bY = Math.max(Apx.y, Cpx.y) + 30;
            svg.appendChild(svgVarText({ x: (Apx.x + Cpx.x) / 2, y: bY, 'font-size': 12, 'text-anchor': 'middle', fill: item.color }, ['*b', ' ≈ ' + fmt(item.x, 1) + ' cm']));
        }
        function drawSideBySide() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var dp = demoParamsForStep2();
            var geo = solveGeometry(dp.a, dp.A, C_SIDE);
            var cls = classifyRoots(geo.roots, geo.Bx, geo.By);
            if (cls.length < 2) return; // ska inte kunna hända (se demoParamsForStep2)
            var gap = 30, cellW = (PW - gap) / 2;
            var pts = [{ x: 0, y: 0 }, { x: geo.Bx, y: geo.By }, { x: cls[0].x, y: 0 }, { x: cls[1].x, y: 0 }];
            var t1 = fitTransform(pts, L, T, cellW, PH, 0.9);
            var t2 = fitTransform(pts, L + cellW + gap, T, cellW, PH, 0.9);
            svg.appendChild(svgEl('line', {
                x1: L + cellW + gap / 2, y1: T + 4, x2: L + cellW + gap / 2, y2: T + PH - 4,
                stroke: COL.grid, 'stroke-width': 1.4, 'stroke-dasharray': '2 5'
            }));
            // vänster = C₂ (grön, trubbig) — höger = C₁ (blå, spetsig): samma
            // vänster-höger-ordning (mindre x → större x) som steg 1-scenen.
            drawPanelTriangle(t1, geo.Bx, geo.By, cls[1], dp.A);
            drawPanelTriangle(t2, geo.Bx, geo.By, cls[0], dp.A);
            svg.setAttribute('aria-label', 'Två trianglar sida vid sida. Sidorna a och c är markerade med lika ' +
                'många streck och är lika långa i båda, men sidan b och vinkeln vid C skiljer sig.');
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateCounter(count) {
            counter.textContent = 'Antal möjliga trianglar: ' + count;
            counter.style.color = count === 0 ? COL.bad : (count === 2 ? COL.circle : COL.blue);
        }
        function updateFormulasStep1() {
            var a = state.a, Adeg = state.A, c = C_SIDE;
            var geo = solveGeometry(a, Adeg, c);
            var count = geo.roots.length;
            var regime = regimeOf(a, c, geo.h, count);
            var aT = fmtTex(a, 1), cT = fmtTex(c, 1), hT = fmtTex(geo.h, 1), AT = fmtTex(Adeg, 0);

            updateCounter(count);

            katexInto(formelHeight, 'c\\sin A = ' + cT + '\\sin ' + AT + '^\\circ \\approx ' + hT + '\\ \\text{cm}');

            var statusTex, statusColor;
            if (regime === '0') {
                statusTex = 'a = ' + aT + '\\ \\text{cm} \\;<\\; c\\sin A \\approx ' + hT + '\\ \\text{cm} \\quad\\Rightarrow\\quad \\textbf{0 trianglar}';
                statusColor = COL.bad;
            } else if (regime === 'tangent') {
                statusTex = 'a = c\\sin A \\approx ' + hT + '\\ \\text{cm} \\quad\\Rightarrow\\quad \\textbf{1 triangel (rät vinkel vid } C\\textbf{)}';
                statusColor = COL.blue;
            } else if (regime === '2') {
                statusTex = 'c\\sin A \\approx ' + hT + '\\ \\text{cm} \\;<\\; a = ' + aT + '\\ \\text{cm} \\;<\\; c = ' + cT + '\\ \\text{cm} \\quad\\Rightarrow\\quad \\textbf{2 trianglar}';
                statusColor = COL.circle;
            } else {
                statusTex = 'a = ' + aT + '\\ \\text{cm} \\;\\ge\\; c = ' + cT + '\\ \\text{cm} \\quad\\Rightarrow\\quad \\textbf{1 triangel}';
                statusColor = COL.blue;
            }
            formelStatus.style.color = statusColor;
            katexInto(formelStatus, statusTex);
            note.textContent = '';
        }
        function updateFormulasStep2() {
            var dp = demoParamsForStep2();
            var geo = solveGeometry(dp.a, dp.A, C_SIDE);
            var cls = classifyRoots(geo.roots, geo.Bx, geo.By);
            var live = state.A === dp.A && Math.abs(state.a - dp.a) < 1e-9;
            var count = solveGeometry(state.a, state.A, C_SIDE).roots.length;
            var msg = 'SSS, SVS (sida-vinkel-sida) och VSV (vinkel-sida-vinkel) räcker för att avgöra kongruens. ' +
                'SSA gör det INTE: a, c och A är identiska i de två trianglarna ovan (strecken markerar det) — ' +
                'men sidan b och vinkeln vid C skiljer sig. Samma tre mått ger alltså inte en entydig triangel.';
            note.textContent = msg;
            if (!live) {
                demoNote.textContent = 'Exempel ovan: A = ' + fmt(dp.A, 0) + '°, a ≈ ' + fmt(dp.a, 1) +
                    ' cm (dina nuvarande glidarvärden ger just nu ' + count + (count === 1 ? ' triangel' : ' trianglar') +
                    ', så exemplet lånar andra värden för att visa båda fallen).';
            } else {
                demoNote.textContent = '';
            }
        }
        function updateFormulasStep3() {
            var a = state.a, Adeg = state.A, c = C_SIDE, Arad = Adeg * Math.PI / 180;
            var aT = fmtTex(a, 1), cT = fmtTex(c, 1), AT = fmtTex(Adeg, 0);
            var sinC = c * Math.sin(Arad) / a;
            var sinCT = fmtTex(sinC, 3);
            updateCounter(solveGeometry(a, Adeg, c).roots.length);
            katexInto(derivLines[0], '\\dfrac{\\sin A}{a} = \\dfrac{\\sin C}{c}');
            katexInto(derivLines[1],
                '\\dfrac{\\sin ' + AT + '^\\circ}{' + aT + '} = \\dfrac{\\sin C}{' + cT + '} \\iff ' +
                '\\sin C = \\dfrac{' + cT + '\\sin ' + AT + '^\\circ}{' + aT + '} \\approx ' + sinCT);

            var count = solveGeometry(a, Adeg, c).roots.length;
            var regime = regimeOf(a, c, c * Math.sin(Arad), count);
            derivLines[2].style.color = '';
            if (sinC <= 1 + 1e-9) {
                var C1 = Math.asin(clampNum(sinC, -1, 1)) * 180 / Math.PI;
                var C2 = 180 - C1;
                katexInto(derivLines[2], 'C_1 = \\sin^{-1}(' + sinCT + ') \\approx ' + fmtTex(C1, 1) + '^\\circ');
                katexInto(derivLines[3], 'C_2 = 180^\\circ - C_1 \\approx ' + fmtTex(C2, 1) + '^\\circ');
                if (regime === '2') {
                    note.textContent = 'Både C₁ ≈ ' + fmt(C1, 1) + '° och C₂ ≈ ' + fmt(C2, 1) + '° ger en vinkelsumma ' +
                        'under 180° tillsammans med A = ' + fmt(Adeg, 0) + '° — därför finns det två giltiga trianglar.';
                } else if (regime === 'tangent') {
                    note.textContent = 'Här sammanfaller C₁ och C₂ i 90° — triangeln är rätvinklig vid C, och det ' +
                        'finns bara en triangel.';
                } else {
                    note.textContent = 'C₂ ≈ ' + fmt(C2, 1) + '° är orimlig, eftersom A + C₂ ≈ ' + fmt(Adeg + C2, 1) +
                        '° blir större än 180° (vinkelsumman i en triangel). Bara C₁ ≈ ' + fmt(C1, 1) + '° duger — en triangel.';
                }
            } else {
                derivLines[2].style.color = COL.bad;
                katexInto(derivLines[2], '\\sin C \\approx ' + sinCT + ' > 1');
                derivLines[3].textContent = '';
                note.textContent = 'sin C ≈ ' + fmt(sinC, 3) + ' > 1, vilket saknar lösning — ingen vinkel har det ' +
                    'sinusvärdet, så det finns ingen triangel med dessa mått.';
            }
            demoNote.textContent = '';
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            var s1 = state.step === 1, s2 = state.step === 2, s3 = state.step === 3;
            legCircle.style.display = s2 ? 'none' : '';
            counter.style.display = s2 ? 'none' : '';
            formelHeight.style.display = s1 ? '' : 'none';
            formelStatus.style.display = s1 ? '' : 'none';
            derivWrap.style.display = s3 ? '' : 'none';
            note.style.display = (s2 || s3) ? '' : 'none';
            demoNote.style.display = s2 ? '' : 'none';
            actions.style.display = s2 ? 'none' : '';
            heightLabel.style.display = s1 ? '' : 'none';
            btnZero.style.display = (s1 || s3) ? '' : 'none';
            btnBig.style.display = (s1 || s3) ? '' : 'none';
            var obtuse = state.A >= 90;
            btnTangent.style.display = (!s2 && !obtuse) ? '' : 'none';
            btnTwo.style.display = (!s2 && !obtuse) ? '' : 'none';

            if (s2) { drawSideBySide(); updateFormulasStep2(); }
            else { drawOverlap(); if (s3) updateFormulasStep3(); else updateFormulasStep1(); }
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma2c-4.10'] = { mount: mount };
})();
