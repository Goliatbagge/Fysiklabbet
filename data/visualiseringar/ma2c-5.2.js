/* ma2c-5.2.js — visualisering: "Logaritmen som exponentjakt".
 * Hör till ma2c-5.2 (tiologaritmer), ma2c-5.3 (exponentialekvationer och
 * tiologaritmer) och ma2c-5.6 (logaritmer med andra baser).
 *
 * Kärninsikt: lg y svarar på frågan "10 upphöjt till VAD blir y?" —
 * logaritmen är exponentialfunktionens invers. Grafiskt är det en
 * spegling i linjen y = x: byt plats på in- och utvärde. En dragbar punkt
 * på kurvan y = 10^x har en spegelpunkt som lämnar ett spår — spåret ÄR
 * logaritmkurvan som växer fram när man drar.
 *
 * Fyra steg:
 *   1. Frågan baklänges — dra punkten, läs av paret (x, 10^x) ↔ (10^x, x)
 *      färgkodat. Gissa-först: "10 upphöjt till vad blir 42?" (samma
 *      resonemang som ma2c-5.2: 10^1=10 för litet, 10^2=100 för stort).
 *   2. Speglingen — kryssruta ritar hela y = lg x (grön), exakt spegling
 *      i den streckade linjen y = x. Specialpunkterna (0,1)↔(1,0) och
 *      (1,10)↔(10,1) markeras (lg 1 = 0, lg 10 = 1).
 *   3. Lös genom att dra — lös 10^x = 5 genom att dra till målinjen
 *      y = 5,0. Sedan: 10^x = 53 (Exempel 1a i ma2c-5.3) ligger UTANFÖR
 *      fönstret — poängen med logaritmer är att lösa den ändå, exakt,
 *      utan att rita: x = lg 53 ≈ 1,72. Kopplar även till den omvända
 *      logaritmekvationen lg x = 3 ⟺ x = 1 000.
 *   4. Andra baser — basväljare 2 / e / 10 (ma2c-5.6): kurvorna a^x och
 *      log_a x byter roller på samma sätt, oavsett bas.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-5.4.js / graf.js).
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
    // Fast antal decimaler (ingen trimning) — för koordinatpar/avläsningar
    // som ska hålla ett konsekvent antal decimaler medan man drar.
    function fmtFix(v, decimals) {
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    function fmtFixTex(v, decimals) { return fmtFix(v, decimals).replace(',', '{,}'); }
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

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',    // exponentialkurvan a^x — blå
        log: '#4a7d3a',      // logaritmkurvan/spegelpunkten — grön
        accent: '#c8324a',   // mållinje / "utanför fönstret"-notis — röd
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── Bas-hjälpare (10 → "lg", annars log_a) ─────────────────────────────
    function logBase(x, a) { return a === 10 ? Math.log10(x) : Math.log(x) / Math.log(a); }
    function powBase(x, a) { return Math.pow(a, x); }
    function baseNumTex(a) { return a === Math.E ? 'e' : fmt(a, 0); }
    function baseNumHtml(a) { return a === Math.E ? '<em>e</em>' : fmt(a, 0); }
    function baseApplyTex(a, argTex) {
        return a === 10 ? ('\\lg ' + argTex) : ('\\log_{' + baseNumTex(a) + '} ' + argTex);
    }
    function baseApplyHtml(a) {
        return a === 10 ? 'lg' : ('log<sub>' + baseNumHtml(a) + '</sub>');
    }
    function powExprTex(a, xTex) { return baseNumTex(a) + '^{' + xTex + '}'; }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var X0_MIN = -1.3, X0_STEP = 0.05;
        var Y_VISIBLE_MAX = 10.2;
        function xMaxFor(a) { return logBase(Y_VISIBLE_MAX, a); }

        var state = { step: 1, a: 10, x0: 0.7, showLog: false, revealed42: false, trail: [] };

        // ── Geometri: kvadratiskt fönster så y = x verkligen blir diagonal ──
        var W = 560, H = 552, L = 50, R = 18, T = 18, B = 42;
        var PW = W - L - R, PH = H - T - B;                 // 492 × 492
        var XMIN = -1.5, XMAX = 10.5, YMIN = -1.5, YMAX = 10.5;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Logaritmen som exponentjakt';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var baseRow = document.createElement('div');
        baseRow.className = 'lab-vis-steps';
        baseRow.style.marginTop = '-4px';
        card.appendChild(baseRow);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktivt koordinatsystem: kurvan y = 10 upphöjt till x (blå) och ' +
                'dess spegling i linjen y = x. Dra den blå punkten på kurvan för att utforska ' +
                'sambandet med tiologaritmen — spegelpunkten ritas grön på andra sidan linjen.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelExp = document.createElement('div');
        formelExp.className = 'lab-vis-formel';
        formelExp.style.color = COL.curve;
        card.appendChild(formelExp);

        var formelLog = document.createElement('div');
        formelLog.className = 'lab-vis-formel';
        formelLog.style.color = COL.log;
        card.appendChild(formelLog);

        var formelBig = document.createElement('div');
        formelBig.className = 'lab-vis-formel';
        formelBig.style.color = COL.axis;
        card.appendChild(formelBig);

        var formelReverse = document.createElement('div');
        formelReverse.className = 'lab-vis-formel';
        formelReverse.style.fontSize = '14px';
        formelReverse.style.color = COL.tick;
        card.appendChild(formelReverse);

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
            { n: 1, label: '1 · Frågan baklänges' },
            { n: 2, label: '2 · Speglingen' },
            { n: 3, label: '3 · Lös genom att dra' },
            { n: 4, label: '4 · Andra baser' }
        ];
        var INSTR = {
            1: 'Innan du drar: <em>10</em> upphöjt till vad blir 42? Du vet att ' +
               '10<sup>1</sup> = 10 (för litet) och 10<sup>2</sup> = 100 (för stort) — svaret ' +
               'ligger alltså mellan 1 och 2. Dra nu den blå punkten längs kurvan ' +
               '<em>y</em> = 10<sup><em>x</em></sup> och se hur <em>x</em> (frågan) och ' +
               '<em>y</em> (svaret) hänger ihop.',
            2: 'En logaritm är en spegling: byt plats på in- och utvärde så får du den ' +
               'inversa funktionen. Kryssa i rutan nedanför för att rita hela logaritmkurvan ' +
               '<em>y</em> = lg <em>x</em> — den är en exakt spegelbild av ' +
               '<em>y</em> = 10<sup><em>x</em></sup> i den streckade linjen <em>y</em> = <em>x</em>.',
            3: 'Lös ekvationen 10<sup><em>x</em></sup> = 5 genom att dra punkten tills ' +
               '<em>y</em> = 5,0 (den röda målinjen). Testa sedan att dra till ' +
               '10<sup><em>x</em></sup> = 53 — vad händer?',
            4: 'Samma spegling gäller oavsett bas. Välj bas <em>a</em> nedan och dra punkten — ' +
               'kurvorna <em>y</em> = <em>a</em><sup><em>x</em></sup> och ' +
               '<em>y</em> = log<sub><em>a</em></sub> <em>x</em> (lg när <em>a</em> = 10) byter ' +
               'roller på exakt samma sätt.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                if (s.n !== 4 && state.a !== 10) setBase(10);
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Basväljare (steg 4) ──────────────────────────────────────────
        var BASES = [2, Math.E, 10];
        var baseBtns = [];
        BASES.forEach(function (av) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.innerHTML = '<em>a</em> = ' + baseNumHtml(av);
            b.addEventListener('click', function () { setBase(av); });
            baseRow.appendChild(b);
            baseBtns.push({ a: av, el: b });
        });

        // ── Legend (dynamisk text efter aktuell bas) ────────────────────────
        function legendItem(color, html) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            sw.style.borderTopColor = color;
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return { el: span, txt: txt };
        }
        var legExp = legendItem(COL.curve, '');
        var legLog = legendItem(COL.log, '');
        var legDiag = legendItem(COL.dash, '<em>y</em> = <em>x</em> (spegellinjen)');
        legend.appendChild(legExp.el);
        legend.appendChild(legLog.el);
        legend.appendChild(legDiag.el);
        function updateLegend() {
            legExp.txt.innerHTML = '<em>y</em> = ' + baseNumHtml(state.a) + '<sup><em>x</em></sup>';
            legLog.txt.innerHTML = '<em>y</em> = ' + baseApplyHtml(state.a) + ' <em>x</em>';
        }

        // ── Reveal-knapp (steg 1: gissningen om 42) ─────────────────────────
        var revealBtn = document.createElement('button');
        revealBtn.type = 'button';
        revealBtn.className = 'lab-btn';
        revealBtn.textContent = 'Visa svaret på gissningen';
        revealBtn.addEventListener('click', function () {
            state.revealed42 = !state.revealed42;
            update();
        });
        actions.appendChild(revealBtn);

        // ── Kryssruta (steg 2: hela logaritmkurvan) ─────────────────────────
        var logLabel = document.createElement('label');
        logLabel.className = 'lab-graf-check';
        var logCb = document.createElement('input');
        logCb.type = 'checkbox';
        logCb.addEventListener('change', function () {
            state.showLog = logCb.checked;
            update();
        });
        logLabel.appendChild(logCb);
        var logTxt = document.createElement('span');
        logTxt.innerHTML = 'Visa hela logaritmkurvan';
        logLabel.appendChild(logTxt);
        actions.appendChild(logLabel);

        // ── Glidare: x (exponenten) ─────────────────────────────────────────
        var rowX0 = (function () {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = 'x';
            lbl.appendChild(em);
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.step = X0_STEP;
            slider.setAttribute('aria-label', 'Exponenten x');
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.step = X0_STEP;
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Exponenten x');
            var curMin = X0_MIN, curMax = xMaxFor(10);
            function paint() {
                var pct = clampNum((state.x0 - curMin) / (curMax - curMin) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                setX0(clampNum(v, curMin, curMax));
                if (from !== 'slider') slider.value = state.x0;
                if (from !== 'field') field.value = fmt(state.x0, 2).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(state.x0, 2).replace(',', '.');
            });
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                setRange: function (min, max) {
                    curMin = min; curMax = max;
                    slider.min = min; slider.max = max;
                    field.min = min; field.max = max;
                },
                sync: function () {
                    slider.value = state.x0;
                    field.value = fmt(state.x0, 2).replace(',', '.');
                    paint();
                }
            };
        })();
        rowX0.setRange(X0_MIN, xMaxFor(10));
        rowX0.sync();

        // ── Bas- och x0-hantering ─────────────────────────────────────────
        var lastTrailX0 = null;
        function pushTrail() {
            if (lastTrailX0 != null && Math.abs(state.x0 - lastTrailX0) < 0.06) return;
            lastTrailX0 = state.x0;
            state.trail.push(state.x0);
            if (state.trail.length > 260) state.trail.shift();
        }
        function setX0(v) {
            state.x0 = Math.round(v / X0_STEP) * X0_STEP;
            pushTrail();
        }
        function setBase(av) {
            state.a = av;
            var newMax = xMaxFor(av);
            state.x0 = clampNum(state.x0, X0_MIN, newMax);
            rowX0.setRange(X0_MIN, newMax);
            rowX0.sync();
            state.trail = [];
            lastTrailX0 = null;
            update();
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.step = 1; state.a = 10; state.x0 = 0.7;
            state.showLog = false; state.revealed42 = false;
            state.trail = []; lastTrailX0 = null;
            logCb.checked = false;
            rowX0.setRange(X0_MIN, xMaxFor(10));
            rowX0.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Dragning av punkten på kurvan ────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = toWorldX(e.clientX);
            setX0(clampNum(xw, X0_MIN, xMaxFor(state.a)));
            rowX0.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Kurvbana (klippt via pad, riktig klippning sker med clipPath) ──
        function pathFor(fn, xFrom, xTo, N) {
            var d = '', down = false;
            for (var i = 0; i <= N; i++) {
                var xv = xFrom + (xTo - xFrom) * i / N;
                var yv = fn(xv);
                if (isFinite(yv) && yv <= YMAX + 2 && yv >= YMIN - 2) {
                    d += (down ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    down = true;
                } else down = false;
            }
            return d;
        }

        // ── Rita scenen ───────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var a = state.a, x0 = state.x0, y0 = powBase(x0, a);
            var axisY = Y(0), axisX = X(0);
            var i;

            // Rutnät
            for (i = -1; i <= 10; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: T + 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 4) + ' ' + (axisX - 4.5) + ',' + (T + 6) + ' ' + (axisX + 4.5) + ',' + (T + 6), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (heltal, hoppar över 0 vid axelkorset). I steg 2
            // (bas 10) krockar 1 och 10 med specialpunkternas egna etiketter
            // ((0;1)/(1;0) och (1;10)/(10;1)) — hoppa över dem då.
            var specialActive = (state.step === 2 && a === 10);
            for (i = -1; i <= 10; i++) {
                if (i === 0) continue;
                if (specialActive && (i === 1 || i === 10)) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(i)]));
            }

            // Klippram — allt datarelaterat innanför plotytan
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Spegellinjen y = x (går exakt hörn till hörn — inget klipp behövs)
            g.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(XMIN), x2: X(XMAX), y2: Y(XMAX),
                stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '7 5'
            }));
            g.appendChild(svgVarText(
                { x: X(6) - 9, y: Y(6) - 9, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.tick },
                ['*y', ' = ', '*x']));

            // Exponentialkurvan a^x (blå)
            g.appendChild(svgEl('path', {
                d: pathFor(function (x) { return powBase(x, a); }, XMIN, XMAX, 320),
                fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Logaritmkurvan log_a x (grön) — hela kurvan, steg 2+ (kryssruta)
            if (state.showLog) {
                g.appendChild(svgEl('path', {
                    d: pathFor(function (x) { return logBase(x, a); }, 0.005, XMAX, 320),
                    fill: 'none', stroke: COL.log, 'stroke-width': 2.4,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            }

            // Spår av tidigare punkter (spegelpunkternas bana — "logaritmkurvan
            // som växer fram")
            state.trail.forEach(function (xt) {
                var yt = powBase(xt, a);
                g.appendChild(svgEl('circle', { cx: X(yt), cy: Y(xt), r: 2.4, fill: 'rgba(74,125,58,0.45)' }));
            });

            // Specialpunkter (endast steg 2, endast bas 10): (0,1)↔(1,0) och
            // (1,10)↔(10,1) — lg 1 = 0 och lg 10 = 1.
            if (state.step === 2 && a === 10) {
                g.appendChild(svgEl('circle', { cx: X(0), cy: Y(1), r: 3.6, fill: COL.curve }));
                g.appendChild(svgEl('circle', { cx: X(1), cy: Y(0), r: 3.6, fill: COL.log }));
                g.appendChild(svgVarText(
                    { x: X(0) - 8, y: Y(1) + 4, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.curve },
                    ['(0; 1)']));
                g.appendChild(svgVarText(
                    { x: X(1) + 7, y: Y(0) + 15, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.log },
                    ['(1; 0)']));
                g.appendChild(svgEl('circle', { cx: X(1), cy: Y(10), r: 3.6, fill: COL.curve }));
                g.appendChild(svgEl('circle', { cx: X(10), cy: Y(1), r: 3.6, fill: COL.log }));
                g.appendChild(svgVarText(
                    { x: X(1) + 7, y: Y(10) - 6, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.curve },
                    ['(1; 10)']));
                g.appendChild(svgVarText(
                    { x: X(10) - 7, y: Y(1) - 7, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.log },
                    ['(10; 1)']));
            }

            // Steg 3: mållinje y = 5 + "utanför fönstret"-notis om 53
            if (state.step === 3 && a === 10) {
                g.appendChild(svgEl('line', {
                    x1: L, y1: Y(5), x2: L + PW, y2: Y(5),
                    stroke: COL.accent, 'stroke-width': 1.6, 'stroke-dasharray': '6 4'
                }));
                g.appendChild(svgVarText(
                    { x: L + PW - 6, y: Y(5) - 7, 'font-size': 12, 'text-anchor': 'end', fill: COL.accent },
                    ['*y', ' = 5,0']));

                // Liten pil som visar att kurvan rusar vidare uppåt mot y = 53
                var ex = X(1), ey = Y(10);
                g.appendChild(svgEl('line', { x1: ex, y1: ey, x2: ex, y2: ey - 14, stroke: COL.accent, 'stroke-width': 1.8 }));
                g.appendChild(svgEl('polygon', { points: (ex - 4) + ',' + (ey - 10) + ' ' + (ex + 4) + ',' + (ey - 10) + ' ' + ex + ',' + (ey - 18), fill: COL.accent }));
                g.appendChild(svgVarText(
                    { x: ex + 10, y: ey - 8, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.accent },
                    ['kurvan fortsätter till ', '*y', ' = 53']));
            }

            // Droppa hjälplinjer till axlarna för aktuell punkt (svaga)
            var Px = X(x0), Py = Y(y0), Qx = X(y0), Qy = Y(x0);
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: Px, y2: axisY, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.5 }));
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: axisX, y2: Py, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.5 }));
            g.appendChild(svgEl('line', { x1: Qx, y1: Qy, x2: Qx, y2: axisY, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.5 }));
            g.appendChild(svgEl('line', { x1: Qx, y1: Qy, x2: axisX, y2: Qy, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.5 }));

            // Punkten P (på a^x, dragbar) och spegelpunkten Q (på log_a x)
            g.appendChild(svgEl('circle', { cx: Qx, cy: Qy, r: 4.6, fill: COL.log }));
            g.appendChild(svgVarText(
                { x: Qx + 8, y: Qy - 8, 'font-size': 12, 'text-anchor': Qx > L + PW - 70 ? 'end' : 'start', fill: COL.log },
                ['(' + fmtFix(y0, 2) + '; ' + fmtFix(x0, 2) + ')']));

            g.appendChild(svgEl('circle', { cx: Px, cy: Py, r: 4.6, fill: COL.curve }));
            g.appendChild(svgVarText(
                { x: Px + 8, y: Py - 8, 'font-size': 12, 'text-anchor': Px > L + PW - 70 ? 'end' : 'start', fill: COL.curve },
                ['(' + fmtFix(x0, 2) + '; ' + fmtFix(y0, 2) + ')']));

            var hitP = svgEl('circle', { cx: Px, cy: Py, r: 16, fill: 'rgba(0,0,0,0)' });
            hitP.style.cursor = 'grab';
            hitP.addEventListener('pointerdown', function (e) {
                dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitP);
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var a = state.a, x0 = state.x0, y0 = powBase(x0, a);
            katexInto(formelExp, powExprTex(a, fmtFixTex(x0, 2)) + ' \\approx ' + fmtFixTex(y0, 2));
            katexInto(formelLog, baseApplyTex(a, fmtFixTex(y0, 2)) + ' \\approx ' + fmtFixTex(x0, 2));

            if (state.step === 1) {
                if (state.revealed42) {
                    note.innerHTML = 'lg 42 ≈ <em>1,62</em> eftersom 10<sup>1,62</sup> ≈ 42 — prova gärna ' +
                        'räknarens lg-knapp. Lägg märke till att 42 ligger utanför vårt fönster ' +
                        '(<em>y</em> går bara upp till 10 här) — vi löser den typen av ekvationer ' +
                        'exakt i steg 3, utan att behöva rita.';
                } else {
                    note.textContent = '';
                }
            } else if (state.step === 2) {
                note.innerHTML = state.showLog
                    ? 'Punkterna (0; 1) och (1; 0) byter plats — liksom (1; 10) och (10; 1). Det är ' +
                      'därför lg 1 = 0 och lg 10 = 1: precis samma tal som i tabellen i genomgången.'
                    : '';
            } else if (state.step === 3) {
                katexInto(formelBig,
                    '10^x = 53 \\iff 10^x = 10^{\\lg 53} \\iff x = \\lg 53 \\approx ' + fmtFixTex(Math.log10(53), 2));
                katexInto(formelReverse, '\\lg x = 3 \\iff x = 10^3 = 1\\,000');
                if (Math.abs(y0 - 5) < 0.1) {
                    note.innerHTML = 'Rätt! <em>x</em> ≈ ' + fmt(x0, 2) + ' löser 10<sup><em>x</em></sup> = 5, ' +
                        'eftersom lg 5 ≈ 0,70.';
                } else {
                    note.innerHTML = '10<sup><em>x</em></sup> = 53 går inte att nå genom att dra — kurvan har redan ' +
                        'rusat ur bild vid <em>x</em> ≈ 1. Det är precis poängen med logaritmer: de tämjer ' +
                        'stora tal utan att vi behöver rita dem.';
                }
            } else if (state.step === 4) {
                note.innerHTML = 'Kom ihåg: lg är bara smeknamnet för log₁₀. Kontroll: log₂ 16 = 4 eftersom ' +
                    '2<sup>4</sup> = 16 (utanför fönstret här, men du kan räkna efter).';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            baseBtns.forEach(function (o) { o.el.classList.toggle('active', o.a === state.a); });
            instr.innerHTML = INSTR[state.step];
            updateLegend();

            baseRow.style.display = state.step === 4 ? '' : 'none';
            revealBtn.style.display = state.step === 1 ? '' : 'none';
            revealBtn.textContent = state.revealed42 ? 'Dölj svaret' : 'Visa svaret på gissningen';
            logLabel.style.display = state.step === 2 ? '' : 'none';
            actions.style.display = (state.step === 1 || state.step === 2) ? '' : 'none';

            formelBig.style.display = state.step === 3 ? '' : 'none';
            formelReverse.style.display = state.step === 3 ? '' : 'none';

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
    window.VISUALISERINGAR['ma2c-5.2'] = api;
    window.VISUALISERINGAR['ma2c-5.3'] = api;
    window.VISUALISERINGAR['ma2c-5.6'] = api;
})();
