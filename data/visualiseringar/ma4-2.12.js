/* ma4-2.12.js — visualisering: "Sneda asymptoter genom utzoomning". Hör
 * till ma4-2.12 (vertikala/horisontella asymptoter), ma4-2.13 (sneda
 * asymptoter) och ma4-2.14 (kurvritning med hjälp av asymptoter).
 *
 * Kärninsikt: en rationell funktion "beter sig som" sin kvotlinje för stora
 * |x| — polynomdivisionen f(x) = (kx + m) + R(x) visar exakt varför:
 * resttermen R(x) dör ut. Utzoomning gör det till en upplevelse: kurvan
 * smälter ihop med linjen.
 *
 * Tre steg (lager):
 *   1. Vertikal och horisontell — f(x) = 1/(x-2) + 1 (samma exempel som i
 *      genomgången ma4-2.12). Dragbar x-markör: f(x) rusar mot ±oändligheten
 *      nära den lodräta asymptoten x = 2, och närmar sig den vågräta
 *      asymptoten y = 1 långt åt höger.
 *   2. Delningen — byter till en funktion med sned asymptot (radioknappar:
 *      f(x) = (x²+1)/x = x + 1/x ur ma4-2.14 Exempel 1, eller
 *      f(x) = (2x²-4x+3)/x = 2x-4+3/x ur ma4-2.13 Exempel 2b). Knappen
 *      "Dela upp f(x)" visar polynomdivisionen steg för steg (KaTeX) och
 *      ritar kvotlinjen y = kx+m streckad röd. En dragbar x-markör visar
 *      avståndet mellan kurva och linje — resttermen R(x) — som en grön
 *      mätstapel med talet utskrivet.
 *   3. Zooma ut — samma scen, men med ett zoomreglage ×1 → ×50 (symmetrisk
 *      utzoomning kring origo, "nice"-rutnät). Kurvan och linjen smälter
 *      visuellt ihop; mätstapelns värde vid markören krymper mot 0 eftersom
 *      markören följer med utåt i takt med zoomen.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js). API: window.VISUALISERINGAR['<id>'] = { mount(el) →
 * { destroy() } }.
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
    // Väljer ett rimligt antal decimaler efter storleksordning (små
    // resttermer/långt-borta x-värden behöver olika precision).
    function decFor(v) {
        var a = Math.abs(v);
        if (a < 0.01) return 4;
        if (a < 0.1) return 3;
        if (a < 10) return 2;
        if (a < 100) return 1;
        return 0;
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

    // ── Färger (samma familj som graf.js/teorifigurerna/ma3c-2.3.js) ─────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // kurvan f(x) — blå
        secant: '#4a7d3a',     // avståndsstapeln / resttermen R(x) — grön
        tangent: '#c8324a',    // asymptoter (lodrät/vågrät/sned) — accentröd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── "Nice"-rutnät: väljer ett snyggt steg (1/2/5 × 10^n) ──────────────
    function niceStep(span, targetCount) {
        var raw = span / Math.max(targetCount, 1);
        if (!isFinite(raw) || raw <= 0) return 1;
        var mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
        var norm = raw / mag;
        var step;
        if (norm < 1.5) step = 1;
        else if (norm < 3) step = 2;
        else if (norm < 7) step = 5;
        else step = 10;
        return step * mag;
    }
    function ticksFor(min, max, targetCount) {
        var step = niceStep(max - min, targetCount);
        var start = Math.ceil(min / step) * step;
        var out = [];
        for (var v = start; v <= max + step * 1e-6; v += step) {
            var r = Math.round(v / step) * step;
            if (Math.abs(r) > step * 1e-6) out.push(r);   // hoppa över 0
        }
        return out;
    }

    // ── De tre exempelfunktionerna ─────────────────────────────────────
    var FUNCS = {
        hv: {
            f: function (x) { return 1 / (x - 2) + 1; },
            vAsym: 2, hAsym: 1
        },
        g: {
            id: 'g', k: 2, m: -4, restNum: '3', vAsym: 0,
            f: function (x) { return (2 * x * x - 4 * x + 3) / x; },
            rest: function (x) { return 3 / x; },
            unsplitTex: 'f(x) = \\dfrac{2x^2-4x+3}{x}',
            splitTex: 'f(x) = \\dfrac{2x^2-4x+3}{x} = \\dfrac{2x^2}{x} - \\dfrac{4x}{x} + \\dfrac{3}{x} = 2x - 4 + \\dfrac{3}{x}',
            radioLabel: 'f(x) = \\dfrac{2x^2-4x+3}{x}'
        },
        h: {
            id: 'h', k: 1, m: 0, restNum: '1', vAsym: 0,
            f: function (x) { return (x * x + 1) / x; },
            rest: function (x) { return 1 / x; },
            unsplitTex: 'f(x) = \\dfrac{x^2+1}{x}',
            splitTex: 'f(x) = \\dfrac{x^2+1}{x} = \\dfrac{x^2}{x} + \\dfrac{1}{x} = x + \\dfrac{1}{x}',
            radioLabel: 'f(x) = \\dfrac{x^2+1}{x}'
        }
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ────────────────────────────────────────────────────
        var state = {
            step: 1,
            mx1: 0,         // x-markör i steg 1 (funktionen med h/v-asymptot)
            sned: 'h',      // vald funktion i steg 2/3: 'g' eller 'h'
            mx: 3.5,        // x-markör i steg 2/3
            zoom: 1,        // zoomfaktor i steg 3 (×1 – ×50)
            split: false    // har "Dela upp" tryckts / är kvotlinjen synlig?
        };
        function defaultMx() { return 3.5; }

        // ── Geometri (fasta pixelmått, rörligt data-fönster) ──────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        var lastWin = null;   // senaste ritade fönster (för drag-mappning)

        function boundsFor(step) {
            if (step === 1) return { min: -2, max: 13, gap: 0.08, asym: 2 };
            var fn = FUNCS[state.sned];
            var Z = step === 3 ? state.zoom : 1;
            var Xh = 8 * Z;
            var gap = Math.max(Xh * 0.02, 0.05);
            return { min: -Xh * 0.97, max: Xh * 0.97, gap: gap, asym: 0, Xh: Xh, Z: Z, fn: fn };
        }
        function computeWindow() {
            if (state.step === 1) {
                return { XMIN: -2, XMAX: 13, YMIN: -12, YMAX: 14, vAsym: 2, hAsym: 1, kind: 'hv' };
            }
            var b = boundsFor(state.step);
            var Yh = Math.abs(b.fn.k) * b.Xh * 1.05 + 5;
            return { XMIN: -b.Xh, XMAX: b.Xh, YMIN: -Yh, YMAX: Yh, vAsym: 0, k: b.fn.k, m: b.fn.m, fn: b.fn, Z: b.Z, kind: 'sned' };
        }
        function clampAwayFromAsym(v, asym, gap, lo, hi) {
            v = clampNum(v, lo, hi);
            if (Math.abs(v - asym) < gap) v = (v >= asym) ? asym + gap : asym - gap;
            return v;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Sneda asymptoter genom utzoomning';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var funcRow = document.createElement('div');
        funcRow.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;' +
            'align-items:center;gap:16px;margin:0 0 12px;font-size:13px;color:var(--lab-ink-soft)';
        card.appendChild(funcRow);
        var funcLbl = document.createElement('span');
        funcLbl.textContent = 'Funktion:';
        funcRow.appendChild(funcLbl);

        var radioName = 'ma4-212-sned-' + (uid++);
        function makeFuncRadio(fn, value) {
            var lab = document.createElement('label');
            lab.className = 'lab-graf-check';
            var input = document.createElement('input');
            input.type = 'radio';
            input.name = radioName;
            input.value = value;
            lab.appendChild(input);
            var span = document.createElement('span');
            span.style.fontSize = '14px';
            katexInto(span, fn.radioLabel);
            lab.appendChild(span);
            input.addEventListener('change', function () {
                if (!input.checked) return;
                state.sned = value;
                state.split = (state.step === 3);
                update();
            });
            funcRow.appendChild(lab);
            return input;
        }
        var radioG = makeFuncRadio(FUNCS.g, 'g');
        var radioH = makeFuncRadio(FUNCS.h, 'h');

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        svg.style.touchAction = 'none';
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
        var legCurve = legendItem(COL.curve, '<em>f</em>(<em>x</em>) — kurvan');
        var legAsym = legendItem(COL.tangent, 'asymptot');
        var legRest = legendItem(COL.secant, '<em>R</em>(<em>x</em>) — avstånd till linjen');
        legend.appendChild(legCurve);
        legend.appendChild(legAsym);
        legend.appendChild(legRest);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.secant;
        formelB.style.fontSize = '15px';
        card.appendChild(formelB);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var delaBtn = document.createElement('button');
        delaBtn.type = 'button';
        delaBtn.className = 'lab-btn';
        delaBtn.addEventListener('click', function () {
            state.split = !state.split;
            update();
        });
        actions.appendChild(delaBtn);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Konfigurerbara reglage (bunden om till aktuellt steg) ─────────
        function makeConfigurableRow(name) {
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
            slider.setAttribute('aria-label', 'Värdet på ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            var cfg = null;
            function paint() {
                if (!cfg) return;
                var pct = clampNum((cfg.get() - cfg.min) / (cfg.max - cfg.min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function sync() {
                if (!cfg) return;
                slider.min = cfg.min; slider.max = cfg.max; slider.step = cfg.step;
                field.min = cfg.min; field.max = cfg.max; field.step = cfg.step;
                slider.value = cfg.get();
                field.value = fmt(cfg.get(), cfg.decimals).replace(',', '.');
                paint();
            }
            function apply(v, from) {
                if (!cfg || !isFinite(v)) return;
                cfg.set(clampNum(v, cfg.min, cfg.max));
                if (from !== 'slider') slider.value = cfg.get();
                if (from !== 'field') field.value = fmt(cfg.get(), cfg.decimals).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { if (cfg) field.value = fmt(cfg.get(), cfg.decimals).replace(',', '.'); });
            return {
                el: row,
                configure: function (c) { cfg = c; sync(); },
                sync: sync
            };
        }
        var xRow = makeConfigurableRow('x');
        controls.appendChild(xRow.el);
        var zoomRow = makeConfigurableRow('Z');
        controls.appendChild(zoomRow.el);

        function refreshControls() {
            if (state.step === 1) {
                xRow.configure({
                    min: -2, max: 13, step: 0.05, decimals: 2,
                    get: function () { return state.mx1; },
                    set: function (v) { state.mx1 = clampAwayFromAsym(v, 2, 0.08, -2, 13); }
                });
                zoomRow.el.style.display = 'none';
            } else {
                var b = boundsFor(state.step);
                xRow.configure({
                    min: b.min, max: b.max, step: Math.max(b.Xh / 400, 0.01), decimals: decFor(state.mx),
                    get: function () { return state.mx; },
                    set: function (v) { state.mx = (Math.abs(v) < b.gap) ? (v >= 0 ? b.gap : -b.gap) : v; }
                });
                if (state.step === 3) {
                    zoomRow.el.style.display = '';
                    zoomRow.configure({
                        min: 1, max: 50, step: 1, decimals: 0,
                        get: function () { return state.zoom; },
                        set: function (v) {
                            var newZ = clampNum(Math.round(v), 1, 50);
                            if (state.zoom > 0) state.mx = state.mx * (newZ / state.zoom);
                            state.zoom = newZ;
                        }
                    });
                } else {
                    zoomRow.el.style.display = 'none';
                }
            }
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.step = 1; state.mx1 = 0; state.sned = 'h'; state.mx = defaultMx();
            state.zoom = 1; state.split = false;
            update();
        });
        foot.appendChild(reset);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Vertikal och horisontell' },
            { n: 2, label: '2 · Delningen' },
            { n: 3, label: '3 · Zooma ut' }
        ];
        var INSTR = {
            1: 'Dra i markören längs kurvan. Vad händer med <em>f</em>(<em>x</em>) när du ' +
               'närmar dig den lodräta linjen <em>x</em> = 2? Och när du rör dig långt åt ' +
               'höger, mot den vågräta linjen <em>y</em> = 1?',
            2: 'Tryck på "Dela upp <em>f</em>(<em>x</em>)" för att se hur funktionen skrivs ' +
               'om som en rät linje plus en restterm. Dra sedan markören längs kurvan — den ' +
               'gröna stapeln visar resttermens värde <em>R</em>(<em>x</em>). Vad händer med ' +
               'stapeln när du drar markören långt ut åt sidorna?',
            3: 'Fundera först: vad tror du händer med avståndet mellan kurvan och linjen när ' +
               'du zoomar ut — och varför? Dra sedan i zoomreglaget <em>Z</em> från ×1 till ' +
               '×50 och se om du hade rätt.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                if (s.n === 2) { state.zoom = 1; state.mx = defaultMx(); state.split = false; }
                if (s.n === 3) { state.split = true; }
                state.step = s.n;
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Dragbar x-markör i scenen ──────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return lastWin.XMIN + (px - L) / PW * (lastWin.XMAX - lastWin.XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging || !lastWin) return;
            var xw = toWorldX(e.clientX);
            if (state.step === 1) {
                state.mx1 = clampAwayFromAsym(xw, 2, 0.08, -2, 13);
            } else {
                var b = boundsFor(state.step);
                xw = clampNum(xw, b.min, b.max);
                if (Math.abs(xw) < b.gap) xw = (xw >= 0) ? b.gap : -b.gap;
                state.mx = xw;
            }
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Kurvsampling: geometrisk fördelning nära asymptoten ────────────
        function branchPath(fn, asym, sign, dMin, dMax, N, X, Y, yLo, yHi) {
            var d, x, y, pts = [];
            for (var i = 0; i <= N; i++) {
                var t = i / N;
                d = dMin * Math.pow(dMax / dMin, t);
                x = asym + sign * d;
                y = fn(x);
                pts.push([x, y]);
            }
            var dstr = '', penDown = false;
            for (i = 0; i < pts.length; i++) {
                x = pts[i][0]; y = pts[i][1];
                if (y >= yLo - (yHi - yLo) * 0.4 && y <= yHi + (yHi - yLo) * 0.4) {
                    dstr += (penDown ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            return dstr;
        }

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var win = computeWindow();
            lastWin = win;
            var XMIN = win.XMIN, XMAX = win.XMAX, YMIN = win.YMIN, YMAX = win.YMAX;
            function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
            function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
            var axisY = Y(0), axisX = X(0);

            // Rutnät ("nice"-steg)
            var xt = ticksFor(XMIN, XMAX, 7);
            var yt = ticksFor(YMIN, YMAX, 6);
            var i;
            for (i = 0; i < xt.length; i++) {
                svg.appendChild(svgEl('line', { x1: X(xt[i]), y1: T, x2: X(xt[i]), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = 0; i < yt.length; i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(yt[i]), x2: L + PW, y2: Y(yt[i]), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar (x-axeln y=0, y-axeln x=0)
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY - 6, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter
            for (i = 0; i < xt.length; i++) {
                if (win.kind === 'hv' && Math.abs(xt[i] - win.vAsym) < (XMAX - XMIN) * 0.03) continue;
                svg.appendChild(svgVarText({ x: X(xt[i]), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(xt[i]).replace('-', '−')]));
            }
            for (i = 0; i < yt.length; i++) {
                svg.appendChild(svgVarText({ x: axisX - 6, y: Y(yt[i]) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(yt[i]).replace('-', '−')]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            if (win.kind === 'hv') {
                // ── Steg 1: f(x) = 1/(x-2) + 1 ──────────────────────────
                var fn = FUNCS.hv.f;
                // Lodrät asymptot x = 2 (streckad röd)
                g.appendChild(svgEl('line', { x1: X(2), y1: T, x2: X(2), y2: T + PH, stroke: COL.tangent, 'stroke-width': 1.8, 'stroke-dasharray': '7 5' }));
                // Vågrät asymptot y = 1 (streckad röd)
                g.appendChild(svgEl('line', { x1: L, y1: Y(1), x2: L + PW, y2: Y(1), stroke: COL.tangent, 'stroke-width': 1.8, 'stroke-dasharray': '7 5' }));

                // Kurvan, två grenar (geometrisk sampling mot asymptoten)
                var dL = branchPath(fn, 2, -1, 0.02, 2 - XMIN, 200, X, Y, YMIN, YMAX);
                var dR = branchPath(fn, 2, 1, 0.02, XMAX - 2, 200, X, Y, YMIN, YMAX);
                g.appendChild(svgEl('path', { d: dL, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: dR, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

                // Asymptotetiketter samlade i den tomma nedre-vänstra hörnan
                svg.appendChild(svgVarText({ x: X(-1.8), y: Y(-8.5), 'font-size': 13, 'text-anchor': 'start', fill: COL.tangent }, ['*x', ' = 2']));
                svg.appendChild(svgVarText({ x: X(-1.8), y: Y(-8.5) + 16, 'font-size': 13, 'text-anchor': 'start', fill: COL.tangent }, ['*y', ' = 1']));

                // Markör på kurvan
                var x0 = state.mx1, y0 = fn(x0);
                var mx = X(x0), my = Y(y0);
                g.appendChild(svgEl('circle', { cx: mx, cy: my, r: 5, fill: COL.curve }));
                var hit = svgEl('circle', { cx: mx, cy: my, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    dragging = true;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            } else {
                // ── Steg 2/3: sned asymptot ──────────────────────────────
                var fn2 = win.fn;
                var k = win.k, m = win.m;

                // Lodrät asymptot x = 0 sammanfaller med y-axeln — märk den
                svg.appendChild(svgVarText({ x: X(0) + 40, y: T + 16, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.tangent }, ['*x', ' = 0']));

                // Kvotlinjen y = kx + m (streckad röd) — bara när uppdelad
                if (state.split) {
                    g.appendChild(svgEl('line', {
                        x1: X(XMIN), y1: Y(k * XMIN + m), x2: X(XMAX), y2: Y(k * XMAX + m),
                        stroke: COL.tangent, 'stroke-width': 2, 'stroke-dasharray': '8 5'
                    }));
                    var lineLabel = 'y = ' + (k === 1 ? '' : fmtDisp(k, 0)) + 'x' +
                        (m === 0 ? '' : (m > 0 ? ' + ' + fmtDisp(m, 0) : ' − ' + fmtDisp(-m, 0)));
                    // Offsetten måste rensa både kurvan (som ligger tätt an
                    // mot linjen) OCH själva linjens branta stigning över
                    // etikettens textbredd — annars skär en brant linje
                    // (stort |k|) rakt igenom texten. Räkna ut hur mycket
                    // linjen stiger över en uppskattad textbredd och lägg på
                    // marginal.
                    var pxPerUnitX = PW / (XMAX - XMIN), pxPerUnitY = PH / (YMAX - YMIN);
                    var riseData = Math.abs(k) * (95 / pxPerUnitX);
                    var offPx = riseData * pxPerUnitY + 26;
                    svg.appendChild(svgVarText(
                        { x: X(XMAX) - 6, y: Y(k * XMAX + m) + offPx, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.tangent },
                        [lineLabel]));
                }

                // Kurvan, två grenar
                var dL2 = branchPath(fn2.f, 0, -1, boundsFor(state.step).gap, XMAX, 220, X, Y, YMIN, YMAX);
                var dR2 = branchPath(fn2.f, 0, 1, boundsFor(state.step).gap, XMAX, 220, X, Y, YMIN, YMAX);
                g.appendChild(svgEl('path', { d: dL2, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: dR2, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

                // Markör + avståndsstapel
                var x0b = state.mx, y0b = fn2.f(x0b);
                var mxp = X(x0b), myp = Y(y0b);
                if (state.split) {
                    var lineY = k * x0b + m;
                    var lyp = Y(lineY);
                    var top = Math.min(myp, lyp), bot = Math.max(myp, lyp);
                    if (bot - top > 1.2) {
                        g.appendChild(svgEl('line', { x1: mxp, y1: top, x2: mxp, y2: bot, stroke: COL.secant, 'stroke-width': 2, 'stroke-linecap': 'butt' }));
                        g.appendChild(svgEl('line', { x1: mxp - 5, y1: top, x2: mxp + 5, y2: top, stroke: COL.secant, 'stroke-width': 2 }));
                        g.appendChild(svgEl('line', { x1: mxp - 5, y1: bot, x2: mxp + 5, y2: bot, stroke: COL.secant, 'stroke-width': 2 }));
                    }
                    // Talet R(x) visas i formelB under scenen (grönt, matchar
                    // stapeln) — ingen flytande etikett i scenen, den skulle
                    // annars ligga an mot kurvan/linjen när R är litet.
                }
                g.appendChild(svgEl('circle', { cx: mxp, cy: myp, r: 5, fill: COL.curve }));
                var hit2 = svgEl('circle', { cx: mxp, cy: myp, r: 16, fill: 'rgba(0,0,0,0)' });
                hit2.style.cursor = 'grab';
                hit2.addEventListener('pointerdown', function (e) {
                    dragging = true;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit2);
            }

            svg.setAttribute('aria-label', win.kind === 'hv'
                ? 'Interaktiv graf: kurvan f(x) = 1 genom (x minus 2) plus 1, med lodrät ' +
                  'asymptot x = 2 och vågrät asymptot y = 1. Dra markören för att se f(x).'
                : 'Interaktiv graf: en rationell funktion med sned asymptot. Dra markören ' +
                  'för att se avståndet mellan kurvan och kvotlinjen.');
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            if (state.step === 1) {
                var x0 = state.mx1, y0 = 1 / (x0 - 2) + 1;
                var x0T = fmtTex(x0, decFor(x0));
                formelA.style.color = COL.curve;
                katexInto(formelA, 'f(' + x0T + ') = \\dfrac{1}{' + x0T + ' - 2} + 1 = ' + fmtTex(y0, decFor(y0)));
                formelB.textContent = '';

                var noteHtml;
                if (x0 < 2 && (2 - x0) < 0.6) {
                    noteHtml = 'Nära <em>x</em> = 2 underifrån: <em>f</em>(<em>x</em>) rusar mot −∞.';
                } else if (x0 > 2 && (x0 - 2) < 0.6) {
                    noteHtml = 'Nära <em>x</em> = 2 ovanifrån: <em>f</em>(<em>x</em>) rusar mot +∞.';
                } else if (x0 > 7) {
                    noteHtml = '<em>f</em>(<em>x</em>) närmar sig den vågräta linjen <em>y</em> = 1.';
                } else {
                    noteHtml = 'Dra markören mot <em>x</em> = 2, eller långt åt höger.';
                }
                note.innerHTML = noteHtml;
            } else {
                var fn = FUNCS[state.sned];
                formelA.style.color = state.split ? COL.tangent : COL.curve;
                katexInto(formelA, state.split ? fn.splitTex : fn.unsplitTex);

                if (state.split) {
                    var xv = state.mx;
                    var xvT = fmtTex(xv, decFor(xv));
                    var Rv = fn.rest(xv);
                    formelB.style.display = '';
                    katexInto(formelB, 'R(' + xvT + ') = \\dfrac{' + fn.restNum + '}{' + xvT + '} = ' + fmtTex(Rv, decFor(Rv)));

                    if (state.step === 2) {
                        note.innerHTML = 'Vid <em>x</em> = ' + fmtDisp(xv, decFor(xv)) +
                            ' är resttermen <em>R</em>(<em>x</em>) = ' + fmtDisp(Rv, decFor(Rv)) +
                            ' — dra markören längre ut och se den krympa.';
                    } else {
                        note.innerHTML = 'Zoom ×' + fmt(state.zoom, 0) + ': <em>R</em>(<em>x</em>) = ' +
                            fmtDisp(Rv, decFor(Rv)) +
                            (state.zoom >= 15 ? ' — nästan omärkbart mot linjen.' : '.');
                    }
                } else {
                    formelB.style.display = 'none';
                    note.innerHTML = state.step === 2
                        ? 'Tryck på knappen ovan för att dela upp <em>f</em>(<em>x</em>) i en rät linje plus en restterm.'
                        : '';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            funcRow.style.display = state.step === 1 ? 'none' : '';
            radioG.checked = state.sned === 'g';
            radioH.checked = state.sned === 'h';
            legRest.style.display = (state.step !== 1 && state.split) ? '' : 'none';
            formelB.style.display = (state.step !== 1 && state.split) ? '' : 'none';
            actions.style.display = state.step === 1 ? 'none' : '';
            delaBtn.textContent = state.split ? 'Dölj uppdelningen' : 'Dela upp f(x)';
            delaBtn.style.background = state.split ? COL.tangent : '';
            delaBtn.style.color = state.split ? '#fff' : '';
            delaBtn.style.borderColor = state.split ? COL.tangent : '';
            refreshControls();
            draw();
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
    window.VISUALISERINGAR['ma4-2.12'] = api;
    window.VISUALISERINGAR['ma4-2.13'] = api;
    window.VISUALISERINGAR['ma4-2.14'] = api;
})();
