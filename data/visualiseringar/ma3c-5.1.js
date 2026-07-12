/* ma3c-5.1.js — visualisering: "Primitivornas parallellskara". Hör till
 * ma3c-5.1 (primitiva funktioner) och ma3c-5.2 (primitiva funktioner med
 * villkor).
 *
 * Funktionen är f(x) = 2x med F(x) = x² + C — det allra första exemplet i
 * genomgången ("En primitiv funktion till f(x) = 2x är alltså F(x) = x² ...
 * Men även F(x) = x² + 7 eller F(x) = x² − 12 har derivatan F'(x) = 2x.").
 * Villkoret i steg 3 (F(2) = 7 ⟹ C = 3) ligger inom C-glidarens intervall
 * (−4…4), i samma anda som genomgångens exempel på skiftade konstanter.
 *
 * Tre steg (lager):
 *   1. Skaran            — C-glidare/dragbar punkt på y-axeln: EN kurva
 *                          glider upp/ner, ett spöke-spår av tidigare
 *                          C-lägen ackumuleras. F(x) = x² + C, och
 *                          F'(x) = 2x = f(x) — oberoende av C.
 *   2. Parallella tangenter — dragbar x-markör genom båda panelerna;
 *                          tangenter på tre av skarans kurvor (C = −2,0,2)
 *                          — alla exakt parallella. Gissa-först-fråga med
 *                          avslöj-kryssruta.
 *   3. Villkoret väljer  — en fast punkt (villkor) ritas i undre panelen;
 *                          dra C tills kurvan träffar den. KaTeX-lösningen
 *                          som i genomgången (sätt in villkoret, lös ut C).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3).
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

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        f: '#2563c9',          // f(x) = 2x — blå
        F: '#c8324a',          // F(x) = x² + C (aktuell kurva) — accentröd
        ghost: 'rgba(200,50,74,0.30)',   // spöke-spår
        preset: 'rgba(200,50,74,0.55)',  // skarans tre fasta kurvor i steg 2
        tangent: '#4a7d3a',     // tangenter — grön
        ok: '#3a7d4a'           // villkor träffat
    };

    var uid = 0;

    function mount(el) {
        // ── Delad geometri (samma x-kolumner i båda panelerna) ────────────
        var W = 560, L = 46, R = 16;
        var PW = W - L - R;
        var XMIN = -4.3, XMAX = 4.3;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }

        // f-panelen (överst, liten): f(x) = 2x
        var T = 14, B = 28, H = 150;
        var PH = H - T - B;
        var YMIN = -9, YMAX = 9;
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // F-panelen (underst, stor): skaran F(x) = x² + C
        var T2 = 14, B2 = 34, H2 = 320;
        var PH2 = H2 - T2 - B2;
        var Y2MIN = -6, Y2MAX = 24;
        function Y2(y) { return T2 + (Y2MAX - y) / (Y2MAX - Y2MIN) * PH2; }

        var XGRID = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
        var YGRID_F = [-8, -4, 0, 4, 8];
        var YGRID_FAM = [-4, 0, 4, 8, 12, 16, 20];
        var C_MIN = -4, C_MAX = 4, C_STEP = 0.5;
        var MX_MIN = -3.8, MX_MAX = 3.8, MX_STEP = 0.1;
        var PRESET_C = [-2, 0, 2];

        function f(x) { return 2 * x; }
        function Fval(x, C) { return x * x + C; }

        function randomVillkor() {
            var xs = [-3, -2, -1, 1, 2, 3];
            var cs = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
            var x0 = xs[Math.floor(Math.random() * xs.length)];
            var Ct = cs[Math.floor(Math.random() * cs.length)];
            return { x0: x0, y0: x0 * x0 + Ct, C: Ct };
        }

        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            C: 2,
            markerX: 2,
            showTangents: false,
            villkor: { x0: 2, y0: 7, C: 3 }   // F(2) = 7 ⟹ C = 3 (inom C-glidarens intervall)
        };
        var trail = [];            // [{C}] — spöke-spår i steg 1
        var lastTrailC = null;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Primitivornas parallellskara';
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
            'aria-label': 'Graf över f(x) = 2x. I steg 2 visas även en dragbar ' +
                'lodrät markör som visar f-värdet vid ett valt x.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.F;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.tangent;
        card.appendChild(formelB);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2,
            width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Koordinatsystem med skaran av primitiva funktioner ' +
                'F(x) = x-kvadrat + C. Dra i punkten på y-axeln eller C-glidaren ' +
                'för att ändra C.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

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
            { n: 1, label: '1 · Skaran' },
            { n: 2, label: '2 · Parallella tangenter' },
            { n: 3, label: '3 · Villkoret väljer' }
        ];
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                var prev = state.step;
                state.step = s.n;
                if (s.n === 2 && prev !== 2) {
                    state.showTangents = false;
                    tangentCb.checked = false;
                }
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        function instrText() {
            if (state.step === 1) {
                return 'Varje val av <em>C</em> ger en ny primitiv funktion till ' +
                    '<em>f</em>(<em>x</em>) = 2<em>x</em>. Dra i punkten på ' +
                    'y-axeln (eller <em>C</em>-glidaren) — bakom kurvan syns var ' +
                    'den legat innan, och en hel parallellskara växer fram.';
            }
            if (state.step === 2) {
                return state.showTangents
                    ? 'Tangenterna är exakt parallella i varje <em>x</em> — ' +
                      'lutningen beror bara på <em>x</em>, inte på <em>C</em>.'
                    : 'Gissa först: kan två olika kurvor ur skaran ha olika ' +
                      'lutning i samma <em>x</em>? Dra <em>x</em>-markören, bocka ' +
                      'sedan i rutan för att se svaret.';
            }
            return 'En primitiv funktion ska gå genom den markerade punkten — ' +
                'det kallas ett <em>villkor</em>. Dra <em>C</em> tills kurvan ' +
                'träffar ringen.';
        }

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
            return { el: span };
        }
        var legF = legendItem(COL.f, '<em>f</em>(<em>x</em>) = 2<em>x</em>');
        var legFam = legendItem(COL.F, '<em>F</em>(<em>x</em>) = <em>x</em>² + <em>C</em>');
        var legPreset = legendItem(COL.preset, 'tre kurvor: <em>C</em> = −2, 0, 2');
        var legTan = legendItem(COL.tangent, 'tangent');
        legend.appendChild(legF.el);
        legend.appendChild(legFam.el);
        legend.appendChild(legPreset.el);
        legend.appendChild(legTan.el);

        // ── Actions: kryssruta (steg 2), knappar (steg 1 / steg 3) ────────
        var clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'lab-graf-reset';
        clearBtn.textContent = 'Rensa spåret';
        clearBtn.addEventListener('click', function () { trail = []; lastTrailC = null; update(); });
        actions.appendChild(clearBtn);

        var tangentLabel = document.createElement('label');
        tangentLabel.className = 'lab-graf-check';
        var tangentCb = document.createElement('input');
        tangentCb.type = 'checkbox';
        tangentCb.addEventListener('change', function () {
            state.showTangents = tangentCb.checked;
            update();
        });
        tangentLabel.appendChild(tangentCb);
        var tangentTxt = document.createElement('span');
        tangentTxt.innerHTML = 'Visa tangenterna';
        tangentLabel.appendChild(tangentTxt);
        actions.appendChild(tangentLabel);

        var newPointBtn = document.createElement('button');
        newPointBtn.type = 'button';
        newPointBtn.className = 'lab-btn';
        newPointBtn.textContent = 'Ny punkt';
        newPointBtn.addEventListener('click', function () {
            state.villkor = randomVillkor();
            update();
        });
        actions.appendChild(newPointBtn);

        // ── Glidare (C och x-markör) ────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.F + ' 0%, ' +
                    COL.F + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
                row: row,
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        function pushTrail() {
            if (lastTrailC != null && Math.abs(state.C - lastTrailC) < 0.4) return;
            lastTrailC = state.C;
            trail.push({ C: state.C });
            if (trail.length > 15) trail.shift();
        }
        var rowC = makeRow('C', C_MIN, C_MAX, C_STEP,
            function () { return state.C; },
            function (v) {
                state.C = Math.round(v / C_STEP) * C_STEP;
                if (state.step === 1) pushTrail();
            });
        var rowX = makeRow('x', MX_MIN, MX_MAX, MX_STEP,
            function () { return state.markerX; },
            function (v) { state.markerX = Math.round(v / MX_STEP) * MX_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.C = 2; state.markerX = 2; state.showTangents = false;
            state.villkor = { x0: 2, y0: 7, C: 3 };
            trail = []; lastTrailC = null;
            tangentCb.checked = false;
            rowC.sync(); rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragbara objekt ──────────────────────────────────────────────
        function toWorldX(svgNode, clientX) {
            var r = svgNode.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        function toWorldY2(clientY) {
            var r = svg2.getBoundingClientRect();
            var py = (clientY - r.top) * H2 / r.height;
            return Y2MAX - (py - T2) / PH2 * (Y2MAX - Y2MIN);
        }
        var dragging = null;   // 'C' | 'X' | null
        function onMove(e) {
            if (!dragging) return;
            if (dragging === 'C') {
                var yw = toWorldY2(e.clientY);
                state.C = clampNum(Math.round(yw / C_STEP) * C_STEP, C_MIN, C_MAX);
                if (state.step === 1) pushTrail();
                rowC.sync();
            } else {
                var xw = toWorldX(svg2, e.clientX);
                state.markerX = clampNum(Math.round(xw / MX_STEP) * MX_STEP, MX_MIN, MX_MAX);
                rowX.sync();
            }
            update();
        }
        function endDrag() { dragging = null; }
        [svg, svg2].forEach(function (node) {
            node.addEventListener('pointermove', onMove);
            node.addEventListener('pointerup', endDrag);
            node.addEventListener('pointercancel', endDrag);
        });
        function startDrag(node, e, which) {
            dragging = which;
            try { node.setPointerCapture(e.pointerId); } catch (err) {}
            e.preventDefault();
        }

        // ── Generiska ritverktyg (delas mellan panelerna) ─────────────────
        function drawGrid(svgNode, T_, PH_, L_, PW_, xVals, yVals, Yfn) {
            xVals.forEach(function (v) {
                svgNode.appendChild(svgEl('line', { x1: X(v), y1: T_, x2: X(v), y2: T_ + PH_, stroke: COL.grid, 'stroke-width': 1 }));
            });
            yVals.forEach(function (v) {
                svgNode.appendChild(svgEl('line', { x1: L_, y1: Yfn(v), x2: L_ + PW_, y2: Yfn(v), stroke: COL.grid, 'stroke-width': 1 }));
            });
        }
        function drawAxes(svgNode, T_, PH_, axisYpx) {
            var axisXpx = X(0);
            svgNode.appendChild(svgEl('line', { x1: L, y1: axisYpx, x2: L + PW + 6, y2: axisYpx, stroke: COL.axis, 'stroke-width': 1.6 }));
            svgNode.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisYpx + ' ' + (L + PW + 4) + ',' + (axisYpx - 4.5) + ' ' + (L + PW + 4) + ',' + (axisYpx + 4.5), fill: COL.axis }));
            svgNode.appendChild(svgEl('line', { x1: axisXpx, y1: T_ + PH_, x2: axisXpx, y2: T_ - 2, stroke: COL.axis, 'stroke-width': 1.6 }));
            svgNode.appendChild(svgEl('polygon', { points: axisXpx + ',' + (T_ - 10) + ' ' + (axisXpx - 4.5) + ',' + (T_) + ' ' + (axisXpx + 4.5) + ',' + T_, fill: COL.axis }));
        }
        function drawTicks(svgNode, axisYpx, Yfn, xSkip) {
            XGRID.forEach(function (v) {
                if (v === 0) return;
                if (xSkip != null && Math.abs(v - xSkip) < 0.6) return;
                svgNode.appendChild(svgVarText(
                    { x: X(v), y: axisYpx + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(v)]));
            });
        }

        // ── Rita f-panelen (överst) ─────────────────────────────────────
        var clipId1 = 'lab-vis-clip-' + (uid++);
        function drawF() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var axisYpx = Y(0), axisXpx = X(0);
            drawGrid(svg, T, PH, L, PW, XGRID, YGRID_F, Y);
            drawAxes(svg, T, PH, axisYpx);
            drawTicks(svg, axisYpx, Y, state.step === 2 ? state.markerX : null);
            YGRID_F.forEach(function (v) {
                if (v === 0) return;
                svg.appendChild(svgVarText(
                    { x: axisXpx - 6, y: Y(v) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(v)]));
            });
            svg.appendChild(svgVarText({ x: W - 4, y: axisYpx + 17, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisXpx + 9, y: T + 4, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*f']));

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId1 });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId1 + ')' });
            svg.appendChild(g);

            g.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(f(XMIN)), x2: X(XMAX), y2: Y(f(XMAX)),
                stroke: COL.f, 'stroke-width': 2.4, 'stroke-linecap': 'round'
            }));

            // Kurvetikett i lugn yta uppe till vänster (linjen ligger lågt där)
            svg.appendChild(svgVarText(
                { x: X(-3.9), y: Y(7.6), 'font-size': 12.5, 'text-anchor': 'start', fill: COL.f },
                ['*f', '(', '*x', ') = 2', '*x']));

            if (state.step === 2) {
                var mx = state.markerX, fy = f(mx);
                g.appendChild(svgEl('line', {
                    x1: X(mx), y1: T, x2: X(mx), y2: T + PH,
                    stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
                }));
                var dotCol = state.showTangents ? COL.tangent : COL.dash;
                g.appendChild(svgEl('circle', { cx: X(mx), cy: Y(fy), r: 4.5, fill: dotCol }));
                var labelRight = mx <= 2.6;
                svg.appendChild(svgVarText(
                    {
                        x: labelRight ? X(mx) + 8 : X(mx) - 8, y: Y(fy) - 7,
                        'font-size': 12, 'text-anchor': labelRight ? 'start' : 'end', fill: COL.axis
                    },
                    ['*f', '(', '*x', ') = ', fmtDisp(fy, 1)]));
            }

            var hit = svgEl('circle', { cx: X(0), cy: Y(0), r: 1, fill: 'rgba(0,0,0,0)' });
            svg.appendChild(hit);
        }

        // ── Rita F-panelen (underst, skaran) ─────────────────────────────
        var clipId2 = 'lab-vis-clip-' + (uid++);
        function parabolaPath(C) {
            var d = '', N = 100, i, xv, yv;
            for (i = 0; i <= N; i++) {
                xv = XMIN + (XMAX - XMIN) * i / N;
                yv = Fval(xv, C);
                d += (i === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y2(yv).toFixed(1) + ' ';
            }
            return d;
        }
        function drawFamily() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var axisYpx = Y2(0), axisXpx = X(0);
            drawGrid(svg2, T2, PH2, L, PW, XGRID, YGRID_FAM, Y2);
            drawAxes(svg2, T2, PH2, axisYpx);
            drawTicks(svg2, axisYpx, Y2, state.step === 2 ? state.markerX : null);
            YGRID_FAM.forEach(function (v) {
                if (v === 0) return;
                svg2.appendChild(svgVarText(
                    { x: axisXpx - 6, y: Y2(v) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(v)]));
            });
            svg2.appendChild(svgVarText({ x: W - 4, y: axisYpx + 17, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisXpx + 9, y: T2 + 4, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*F']));

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            if (state.step === 1) {
                trail.forEach(function (p) {
                    g.appendChild(svgEl('path', { d: parabolaPath(p.C), fill: 'none', stroke: COL.ghost, 'stroke-width': 1.8 }));
                });
                g.appendChild(svgEl('path', { d: parabolaPath(state.C), fill: 'none', stroke: COL.F, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));

                // Dragbar punkt på y-axeln: (0, C)
                var hy = Y2(state.C);
                g.appendChild(svgEl('circle', { cx: axisXpx, cy: hy, r: 2.6, fill: COL.F }));
                var hit = svgEl('circle', { cx: axisXpx, cy: hy, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) { startDrag(svg2, e, 'C'); });
                svg2.appendChild(hit);

                var right = X(4.15);
                svg2.appendChild(svgVarText(
                    { x: right, y: Y2(Fval(4.15, state.C)) - 7, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.F },
                    ['*C', ' = ', fmtDisp(state.C, 1)]));
            } else if (state.step === 2) {
                PRESET_C.forEach(function (C) {
                    g.appendChild(svgEl('path', { d: parabolaPath(C), fill: 'none', stroke: COL.preset, 'stroke-width': 2 }));
                });
                var mx = state.markerX;
                g.appendChild(svgEl('line', {
                    x1: X(mx), y1: T2, x2: X(mx), y2: T2 + PH2,
                    stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3'
                }));
                if (state.showTangents) {
                    var k = 2 * mx;
                    PRESET_C.forEach(function (C) {
                        var y0 = Fval(mx, C);
                        var y1 = y0 + k * (XMIN - mx), y2v = y0 + k * (XMAX - mx);
                        g.appendChild(svgEl('line', {
                            x1: X(XMIN), y1: Y2(y1), x2: X(XMAX), y2: Y2(y2v),
                            stroke: COL.tangent, 'stroke-width': 2, 'stroke-dasharray': '7 5'
                        }));
                        g.appendChild(svgEl('circle', { cx: X(mx), cy: Y2(y0), r: 4, fill: COL.tangent }));
                    });
                }
                svg2.appendChild(svgVarText(
                    { x: X(mx), y: T2 + PH2 + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                    ['*x']));
            } else {
                // Steg 3: villkoret
                g.appendChild(svgEl('path', { d: parabolaPath(state.C), fill: 'none', stroke: COL.F, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
                var hy3 = Y2(state.C);
                g.appendChild(svgEl('circle', { cx: axisXpx, cy: hy3, r: 2.6, fill: COL.F }));
                var hit3 = svgEl('circle', { cx: axisXpx, cy: hy3, r: 16, fill: 'rgba(0,0,0,0)' });
                hit3.style.cursor = 'grab';
                hit3.addEventListener('pointerdown', function (e) { startDrag(svg2, e, 'C'); });
                svg2.appendChild(hit3);

                var matched = Math.abs(state.C - state.villkor.C) < 0.01;
                var ringCol = matched ? COL.ok : COL.F;
                var vx = X(state.villkor.x0), vy = Y2(state.villkor.y0);
                g.appendChild(svgEl('circle', {
                    cx: vx, cy: vy, r: matched ? 8 : 7,
                    fill: matched ? 'rgba(58,125,74,0.28)' : 'none',
                    stroke: ringCol, 'stroke-width': 2.4,
                    'stroke-dasharray': matched ? 'none' : '3 3'
                }));
                var vLabelRight = state.villkor.x0 <= 0;
                svg2.appendChild(svgVarText(
                    {
                        x: vLabelRight ? vx + 12 : vx - 12, y: vy - 10,
                        'font-size': 12.5, 'text-anchor': vLabelRight ? 'start' : 'end', fill: ringCol
                    },
                    ['*F', '(', fmtDisp(state.villkor.x0, 0), ') = ', fmtDisp(state.villkor.y0, 0)]));

                var right3 = X(4.15);
                svg2.appendChild(svgVarText(
                    { x: right3, y: Y2(Fval(4.15, state.C)) - 7, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.F },
                    ['*C', ' = ', fmtDisp(state.C, 1)]));
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            if (state.step === 1) {
                katexInto(formelA, 'F(x) = x^2 + C = x^2 ' + (state.C >= 0 ? '+ ' : '- ') + fmtTex(Math.abs(state.C), 1));
                katexInto(formelB, "F'(x) = 2x = f(x) \\quad \\text{(oberoende av } C\\text{)}");
                note.textContent = '';
            } else if (state.step === 2) {
                if (state.showTangents) {
                    var mx = state.markerX, k = 2 * mx;
                    katexInto(formelA, "k = F'(x) = 2x = 2 \\cdot " + fmtTex(mx, 1) + ' = ' + fmtTex(k, 1));
                    note.innerHTML = 'Överst: <span style="white-space:nowrap"><em>f</em>(' + fmt(mx, 1) + ') = ' +
                        fmt(f(mx), 1) + '</span> — exakt samma tal som lutningen på alla tre kurvorna.';
                } else {
                    formelA.textContent = '';
                    note.textContent = '';
                }
                formelB.textContent = '';
            } else {
                var x0 = state.villkor.x0, y0 = state.villkor.y0, Ct = state.villkor.C;
                var x0T = String(x0);
                var x0Sq = x0 < 0 ? '(' + x0T + ')^2' : x0T + '^2';
                katexInto(formelA, 'F(' + x0T + ') = ' + x0Sq + ' + C = ' + String(y0));
                katexInto(formelB, 'C = ' + String(y0) + ' - ' + x0Sq + ' = ' + String(Ct));
                var matched = Math.abs(state.C - Ct) < 0.01;
                note.innerHTML = matched
                    ? 'Rätt! <span style="white-space:nowrap"><em>C</em> = ' + fmt(Ct, 1) +
                      '</span> uppfyller villkoret — kurvan går genom punkten.'
                    : 'Din kurva har just nu <span style="white-space:nowrap"><em>C</em> = ' +
                      fmt(state.C, 1) + '</span>. Dra tills den går genom ringen.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = instrText();

            legFam.el.style.display = state.step === 2 ? 'none' : '';
            legPreset.el.style.display = state.step === 2 ? '' : 'none';
            legTan.el.style.display = state.step === 2 && state.showTangents ? '' : 'none';

            clearBtn.style.display = state.step === 1 ? '' : 'none';
            tangentLabel.style.display = state.step === 2 ? '' : 'none';
            newPointBtn.style.display = state.step === 3 ? '' : 'none';

            rowC.row.style.display = state.step === 2 ? 'none' : '';
            rowX.row.style.display = state.step === 2 ? '' : 'none';

            formelA.style.display = state.step === 2 && !state.showTangents ? 'none' : '';
            formelB.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            note.style.display = (state.step === 2 && !state.showTangents) ? 'none' : '';

            drawF();
            drawFamily();
            updateFormulas();
        }

        update();

        return {
            destroy: function () {
                [svg, svg2].forEach(function (node) {
                    node.removeEventListener('pointermove', onMove);
                    node.removeEventListener('pointerup', endDrag);
                    node.removeEventListener('pointercancel', endDrag);
                });
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-5.1'] = api;
    window.VISUALISERINGAR['ma3c-5.2'] = api;
})();
