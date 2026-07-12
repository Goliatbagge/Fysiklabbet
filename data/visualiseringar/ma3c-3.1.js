/* ma3c-3.1.js — visualisering: "Rita derivatan själv". Hör till ma3c-3.1
 * (derivatan av enkla potensfunktioner), ma3c-3.2 (derivatan av
 * polynomfunktioner) och ma4-2.5 (derivatan av sin x och cos x).
 *
 * Kärninsikt: derivatan är en NY FUNKTION — tangentlutningen utplottad
 * punkt för punkt. Eleven väljer en av tre kurvor (x², x³ − 3x, sin x),
 * känner på lutningen genom att dra en tangentpunkt, ritar sedan sin egen
 * gissning på hur f′(x) ser ut i ett tomt koordinatsystem, och slutligen
 * ser facit sveper fram som en animation — elevens gissning ligger kvar
 * som spöklinje för jämförelse.
 *
 * Tre steg (lager):
 *   1. Känn lutningen  — bara övre panelen: dragbar tangentpunkt + mätare.
 *   2. Rita din gissning — undre panelen aktiv: pointerdown/move/up ritar
 *                          en frihandskurva, kolumn för kolumn.
 *   3. Facit            — "Plotta derivatan": tangentpunkten sveper genom
 *                          övre panelen medan lutningsvärden faller ner
 *                          som prickar i undre panelen och bildar den
 *                          riktiga f′(x)-kurvan; elevens gissning ligger
 *                          kvar i grått.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js). API: window.VISUALISERINGAR['<id>'] = { mount(el) → { destroy() } }.
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
    // En del som börjar med prim-tecknet (′) får ett litet dx-nubb — Chrome
    // tappar annars primet visuellt när det kommer direkt efter en kursiv
    // tspan (fel avancemängd i den syntetiska kursiveringen får primet att
    // hamna dolt under föregående bokstav). Testat/verifierat i headless
    // Chrome; 1 px syns inte men räddar läsbarheten.
    function svgVarText(attrs, parts) {
        var el = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var italic = p.charAt(0) === '*';
            var txt = italic ? p.slice(1) : p;
            var tAttrs = italic ? { 'font-style': 'italic' } : {};
            if (txt.charAt(0) === '′') tAttrs.dx = '1';
            var t = svgEl('tspan', tAttrs);
            t.textContent = txt;
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
        curve: '#2563c9',      // f(x) — och den färdiga f'(x)-kurvan (facit)
        tangent: '#c8324a',    // tangent, mätarnål, fallande prickar
        guess: '#9aa0aa',      // elevens gissning (spöklinje)
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        panelBg: '#ffffff',
        panelBorder: 'rgba(15,22,32,0.28)'
    };

    // ── De tre kurvorna ─────────────────────────────────────────────────
    var FUNCS = [
        {
            id: 'x2',
            pillLabel: 'f(x) = x²',
            legendHtml: '<em>f</em>(<em>x</em>) = <em>x</em>²',
            facitLegendHtml: '<em>f</em><span style="margin-left:1px">′(</span><em>x</em>) = 2<em>x</em>',
            ruleTex: "f(x) = x^2 \\quad\\Rightarrow\\quad f'(x) = 2x",
            f: function (x) { return x * x; },
            fp: function (x) { return 2 * x; },
            xmin: -3.2, xmax: 3.2, ymin: -1.2, ymax: 12.5,
            y2min: -7.2, y2max: 7.2,
            a0: 2, step: 0.02,
            xTicks: [
                { x: -3, label: '−3' }, { x: -2, label: '−2' }, { x: -1, label: '−1' },
                { x: 1, label: '1' }, { x: 2, label: '2' }, { x: 3, label: '3' }
            ],
            yTicks: [
                { y: 2, label: '2' }, { y: 4, label: '4' }, { y: 6, label: '6' },
                { y: 8, label: '8' }, { y: 10, label: '10' }
            ],
            y2Ticks: [
                { y: -6, label: '−6' }, { y: -4, label: '−4' }, { y: -2, label: '−2' },
                { y: 2, label: '2' }, { y: 4, label: '4' }, { y: 6, label: '6' }
            ]
        },
        {
            id: 'x3m3x',
            pillLabel: 'f(x) = x³ − 3x',
            legendHtml: '<em>f</em>(<em>x</em>) = <em>x</em>³ − 3<em>x</em>',
            facitLegendHtml: '<em>f</em><span style="margin-left:1px">′(</span><em>x</em>) = 3<em>x</em>² − 3',
            ruleTex: "f(x) = x^3 - 3x \\quad\\Rightarrow\\quad f'(x) = 3x^2 - 3",
            f: function (x) { return x * x * x - 3 * x; },
            fp: function (x) { return 3 * x * x - 3; },
            xmin: -2.2, xmax: 2.2, ymin: -4.6, ymax: 4.6,
            y2min: -4.3, y2max: 12.2,
            a0: -1, step: 0.02,
            xTicks: [
                { x: -2, label: '−2' }, { x: -1, label: '−1' },
                { x: 1, label: '1' }, { x: 2, label: '2' }
            ],
            yTicks: [
                { y: -4, label: '−4' }, { y: -2, label: '−2' },
                { y: 2, label: '2' }, { y: 4, label: '4' }
            ],
            y2Ticks: [
                { y: -3, label: '−3' }, { y: 3, label: '3' },
                { y: 6, label: '6' }, { y: 9, label: '9' }
            ]
        },
        {
            id: 'sin',
            pillLabel: 'f(x) = sin x',
            legendHtml: '<em>f</em>(<em>x</em>) = sin <em>x</em>',
            facitLegendHtml: '<em>f</em><span style="margin-left:1px">′(</span><em>x</em>) = cos <em>x</em>',
            ruleTex: "f(x) = \\sin x \\quad\\text{har derivatan}\\quad f'(x) = \\cos x",
            f: Math.sin,
            fp: Math.cos,
            xmin: -0.3, xmax: 2 * Math.PI + 0.28, ymin: -1.35, ymax: 1.35,
            y2min: -1.35, y2max: 1.35,
            a0: Math.PI / 2, step: 0.01,
            xTicks: [
                { x: Math.PI / 2, label: 'π/2' }, { x: Math.PI, label: 'π' },
                { x: 3 * Math.PI / 2, label: '3π/2' }, { x: 2 * Math.PI, label: '2π' }
            ],
            yTicks: [{ y: 1, label: '1' }, { y: -1, label: '−1' }],
            y2Ticks: [{ y: 1, label: '1' }, { y: -1, label: '−1' }]
        }
    ];

    var uid = 0;

    function mount(el) {
        // ── Geometri: huvudplot (f) ───────────────────────────────────────
        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;
        // ── Geometri: derivataplot (f′) — samma x-kolumner ────────────────
        var H2 = 210, T2 = 12, B2 = 32;
        var PH2 = H2 - T2 - B2;
        var PWi = Math.round(PW);

        function curFunc() { return FUNCS[state.funcIdx]; }
        function X(x) { var cf = curFunc(); return L + (x - cf.xmin) / (cf.xmax - cf.xmin) * PW; }
        function Y(y) { var cf = curFunc(); return T + (cf.ymax - y) / (cf.ymax - cf.ymin) * PH; }
        function Y2(y) { var cf = curFunc(); return T2 + (cf.y2max - y) / (cf.y2max - cf.y2min) * PH2; }

        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { funcIdx: 0, step: 1, a: FUNCS[0].a0, showFacit: false, facitDone: false };
        var guessArr = newGuessArray();      // px-Y (i svg2) per kolumn, eller null
        var trueTrail = [];                  // facit-punkter som "landat" {xw, y2w}
        var fallingPoints = [];              // facit-punkter under animation {xw, y2w, t0, q}
        var lastSpawnX = null;
        var animId = null;
        var draggingPoint = false;
        var drawingGuess = false;
        var lastGuessPx = null;
        var guessPathEl = null;
        var rowX = null;

        function newGuessArray() {
            var n = PWi + 1, arr = new Array(n);
            for (var i = 0; i < n; i++) arr[i] = null;
            return arr;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Rita derivatan själv';
        card.appendChild(title);

        var funcRow = document.createElement('div');
        funcRow.className = 'lab-vis-steps';
        card.appendChild(funcRow);

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
            'aria-label': 'Interaktiv graf: den valda kurvan f(x) med en tangent i en ' +
                'punkt du kan dra längs kurvan. Lutningen visas i mätaren uppe till höger.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var gaugeWrap = document.createElement('div');
        gaugeWrap.style.position = 'absolute';
        gaugeWrap.style.top = '4px';
        gaugeWrap.style.right = '4px';
        gaugeWrap.style.width = '84px';
        gaugeWrap.style.pointerEvents = 'none';
        var gaugeSvg = svgEl('svg', {
            viewBox: '0 0 84 70', width: 84, height: 70,
            role: 'img', 'aria-label': 'Mätare som visar aktuell tangentlutning'
        });
        gaugeSvg.style.display = 'block';
        gaugeWrap.appendChild(gaugeSvg);
        scene.appendChild(gaugeWrap);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.curve;
        card.appendChild(formelA);

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
            'aria-label': 'Tomt koordinatsystem där du ritar din gissning på derivatans ' +
                'graf genom att dra med pekaren. Efter "Plotta derivatan" visas facit i blått.'
        });
        svg2.classList.add('lab-graf-svg');
        scene2.appendChild(svg2);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Funktionsval ──────────────────────────────────────────────────
        // OBS: knapparna får INTE klassen "lab-vis-step" — testrunnern
        // (.shots/vis-runner.html) söker just den klassen globalt för sitt
        // step=N-kommando, och skulle då råka klicka en funktionsknapp i
        // stället för ett steg. Bygg samma pill-utseende med inline-stilar.
        function makePillBtn(label, onClick) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = label;
            var active = false;
            function paint() {
                if (active) {
                    b.style.background = 'var(--lab-ink)';
                    b.style.color = 'var(--lab-bg-panel)';
                    b.style.borderColor = 'var(--lab-ink)';
                } else {
                    b.style.background = 'transparent';
                    b.style.color = 'var(--lab-ink-soft)';
                    b.style.borderColor = 'var(--lab-line-strong)';
                }
            }
            b.style.fontFamily = 'var(--lab-font-mono)';
            b.style.fontSize = '12px';
            b.style.letterSpacing = '0.04em';
            b.style.padding = '7px 13px';
            b.style.borderRadius = '999px';
            b.style.border = '1px solid var(--lab-line-strong)';
            b.style.cursor = 'pointer';
            paint();
            b.addEventListener('mouseenter', function () {
                if (!active) { b.style.background = 'var(--lab-bg-raised)'; b.style.color = 'var(--lab-ink)'; }
            });
            b.addEventListener('mouseleave', paint);
            b.addEventListener('click', onClick);
            return { el: b, setActive: function (v) { active = v; paint(); } };
        }
        var funcBtns = [];
        FUNCS.forEach(function (cf, idx) {
            var item = makePillBtn(cf.pillLabel, function () {
                if (state.funcIdx === idx) return;
                state.funcIdx = idx;
                resetForFunctionChange();
                update();
            });
            funcRow.appendChild(item.el);
            funcBtns.push(item);
        });

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Känn lutningen' },
            { n: 2, label: '2 · Rita din gissning' },
            { n: 3, label: '3 · Facit' }
        ];
        var INSTR = {
            1: 'Känn efter lutningen. Dra i den röda punkten längs kurvan (eller använd ' +
               '<em>x</em>-glidaren) och se hur lutningen ändras i mätaren uppe till höger. ' +
               'Innan du går vidare: var på kurvan är lutningen noll? Var är den som störst?',
            2: 'Rita din gissning. Dra med pekaren i det tomma koordinatsystemet nedanför ' +
               'och rita hur du tror att lutningen <em>f</em><span style="margin-left:1px">′(</span><em>x</em>) varierar — högt ' +
               'där kurvan stiger brant uppåt, noll vid toppar och dalar, negativt i ' +
               'nedförsbackar. Fel? Tryck Sudda och rita om.',
            3: 'Facit. Tryck på Plotta derivatan och se den riktiga derivatan växa fram, ' +
               'punkt för punkt, medan din gissning ligger kvar som en grå spökkurva att ' +
               'jämföra med.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopAnim(); state.step = s.n; update(); });
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
            return { el: span, setText: function (h) { txt.innerHTML = h; } };
        }
        var legF = legendItem(COL.curve, '');
        var legTangent = legendItem(COL.tangent, 'tangent');
        var legGuess = legendItem(COL.guess, 'din gissning');
        var legFacit = legendItem(COL.curve, '');
        legend.appendChild(legF.el);
        legend.appendChild(legTangent.el);
        legend.appendChild(legGuess.el);
        legend.appendChild(legFacit.el);

        // ── Knappar i actions-raden ───────────────────────────────────────
        var eraseBtn = document.createElement('button');
        eraseBtn.type = 'button';
        eraseBtn.className = 'lab-graf-reset';
        eraseBtn.textContent = 'Sudda';
        eraseBtn.addEventListener('click', function () {
            for (var i = 0; i < guessArr.length; i++) guessArr[i] = null;
            paintGuessPath();
            update();
        });
        actions.appendChild(eraseBtn);

        var plotBtn = document.createElement('button');
        plotBtn.type = 'button';
        plotBtn.className = 'lab-btn';
        plotBtn.textContent = 'Plotta derivatan';
        plotBtn.addEventListener('click', function () { startFacitAnim(); });
        actions.appendChild(plotBtn);

        // ── Glidare: x (tangentpunktens position) ─────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
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
        function buildXRow() {
            var cf = curFunc();
            controls.innerHTML = '';
            var margin = (cf.xmax - cf.xmin) * 0.03;
            rowX = makeRow('x', cf.xmin + margin, cf.xmax - margin, cf.step,
                function () { return state.a; },
                function (v) { state.a = Math.round(v / cf.step) * cf.step; });
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.funcIdx = 0;
            state.step = 1;
            resetForFunctionChange();
            update();
        });
        foot.appendChild(reset);

        function resetForFunctionChange() {
            var cf = curFunc();
            stopAnim();
            state.a = cf.a0;
            state.showFacit = false;
            state.facitDone = false;
            trueTrail = []; fallingPoints = []; lastSpawnX = null;
            guessArr = newGuessArray();
            drawingGuess = false; lastGuessPx = null;
            buildXRow();
        }

        // ── Animation: sekvensen h→0 finns inte här — i stället sveper vi
        //    tangentpunkten över hela domänen och släpper lutningsvärden. ──
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startFacitAnim() {
            stopAnim();
            state.showFacit = true;
            state.facitDone = false;
            trueTrail = []; fallingPoints = []; lastSpawnX = null;
            var cf = curFunc();
            var DURATION = 3200, DROP_MS = 220, SPAWN_STEP_PX = 4;
            var t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DURATION, 0, 1);
                var xw = cf.xmin + p * (cf.xmax - cf.xmin);
                state.a = xw;
                if (rowX) rowX.sync();
                var xs = X(xw);
                if (lastSpawnX == null || Math.abs(xs - lastSpawnX) >= SPAWN_STEP_PX) {
                    lastSpawnX = xs;
                    fallingPoints.push({ xw: xw, y2w: cf.fp(xw), t0: ts, q: 0 });
                }
                for (var i = fallingPoints.length - 1; i >= 0; i--) {
                    var pt = fallingPoints[i];
                    var q = clampNum((ts - pt.t0) / DROP_MS, 0, 1);
                    pt.q = q;
                    if (q >= 1) { trueTrail.push({ xw: pt.xw, y2w: pt.y2w }); fallingPoints.splice(i, 1); }
                }
                update();
                if (p < 1 || fallingPoints.length > 0) {
                    animId = requestAnimationFrame(frame);
                } else {
                    animId = null;
                    state.facitDone = true;
                    update();
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragpunkt på huvudkurvan ────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var cf = curFunc();
            return cf.xmin + (px - L) / PW * (cf.xmax - cf.xmin);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!draggingPoint) return;
            var cf = curFunc();
            var margin = (cf.xmax - cf.xmin) * 0.03;
            var xw = clampNum(toWorldX(e.clientX), cf.xmin + margin, cf.xmax - margin);
            state.a = Math.round(xw / cf.step) * cf.step;
            if (rowX) rowX.sync();
            update();
        });
        function endDragPoint() { draggingPoint = false; }
        svg.addEventListener('pointerup', endDragPoint);
        svg.addEventListener('pointercancel', endDragPoint);

        // ── Frihandsritning i derivata-panelen ─────────────────────────────
        function pointerPx(e, svgNode, hgt) {
            var r = svgNode.getBoundingClientRect();
            return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * hgt / r.height };
        }
        function storeColumn(col, pyVal) {
            col = Math.max(0, Math.min(PWi, Math.round(col)));
            guessArr[col] = clampNum(pyVal, T2, T2 + PH2);
        }
        function paintColumnRange(px0, py0, px1, py1) {
            var c0 = Math.round(px0 - L), c1 = Math.round(px1 - L);
            if (c0 === c1) { storeColumn(c0, py1); return; }
            var steps = Math.abs(c1 - c0), i, t, c, y;
            for (i = 0; i <= steps; i++) {
                t = i / steps;
                c = c0 + (c1 - c0) * t;
                y = py0 + (py1 - py0) * t;
                storeColumn(c, y);
            }
        }
        function buildGuessD() {
            var d = '', open = false, c;
            for (c = 0; c <= PWi; c++) {
                var v = guessArr[c];
                if (v == null) { open = false; continue; }
                d += (open ? 'L' : 'M') + (L + c) + ' ' + v.toFixed(1) + ' ';
                open = true;
            }
            return d;
        }
        function paintGuessPath() {
            if (guessPathEl) guessPathEl.setAttribute('d', buildGuessD());
        }
        svg2.addEventListener('pointerdown', function (e) {
            if (state.step !== 2) return;
            stopAnim();
            drawingGuess = true;
            try { svg2.setPointerCapture(e.pointerId); } catch (err) {}
            var p = pointerPx(e, svg2, H2);
            lastGuessPx = p;
            paintColumnRange(p.x, p.y, p.x, p.y);
            paintGuessPath();
            e.preventDefault();
        });
        svg2.addEventListener('pointermove', function (e) {
            if (!drawingGuess || state.step !== 2) return;
            var p = pointerPx(e, svg2, H2);
            paintColumnRange(lastGuessPx.x, lastGuessPx.y, p.x, p.y);
            lastGuessPx = p;
            paintGuessPath();
        });
        function endGuessDrag() {
            if (drawingGuess) { drawingGuess = false; lastGuessPx = null; update(); }
        }
        svg2.addEventListener('pointerup', endGuessDrag);
        svg2.addEventListener('pointercancel', endGuessDrag);

        // ── Mätaren (lutning: tal + lutande pil) ───────────────────────────
        function drawGauge() {
            while (gaugeSvg.firstChild) gaugeSvg.removeChild(gaugeSvg.firstChild);
            var cf = curFunc();
            var k = cf.fp(state.a);
            // Nålens räckvidd (cy ± Ln) hålls klart skild från siffertexten
            // därunder — annars korsar nålen "k = värde" vid branta lutningar
            // (nålen kan peka nästan rakt ner/upp och når då nästan ner till
            // texten om avståndet är för litet).
            var cx = 42, cy = 30, Ln = 13;
            gaugeSvg.appendChild(svgEl('rect', {
                x: 1, y: 1, width: 82, height: 68, rx: 6,
                fill: COL.panelBg, stroke: COL.panelBorder, 'stroke-width': 1
            }));
            gaugeSvg.appendChild(svgVarText(
                { x: 42, y: 12, 'font-size': 9.5, 'text-anchor': 'middle', fill: COL.tick },
                ['Lutning']));
            gaugeSvg.appendChild(svgEl('line', {
                x1: cx - Ln, y1: cy, x2: cx + Ln, y2: cy,
                stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '2.5 2.5'
            }));
            var theta = Math.atan(k);
            var dirx = Math.cos(theta), diry = -Math.sin(theta);
            var tipx = cx + Ln * dirx, tipy = cy + Ln * diry;
            var tailx = cx - Ln * 0.4 * dirx, taily = cy - Ln * 0.4 * diry;
            gaugeSvg.appendChild(svgEl('line', {
                x1: tailx, y1: taily, x2: tipx, y2: tipy,
                stroke: COL.tangent, 'stroke-width': 2.2, 'stroke-linecap': 'round'
            }));
            var backx = tipx - 7 * dirx, backy = tipy - 7 * diry;
            var perpx = -diry, perpy = dirx;
            var leftx = backx + 3 * perpx, lefty = backy + 3 * perpy;
            var rightx = backx - 3 * perpx, righty = backy - 3 * perpy;
            gaugeSvg.appendChild(svgEl('polygon', {
                points: tipx.toFixed(1) + ',' + tipy.toFixed(1) + ' ' +
                    leftx.toFixed(1) + ',' + lefty.toFixed(1) + ' ' +
                    rightx.toFixed(1) + ',' + righty.toFixed(1),
                fill: COL.tangent
            }));
            gaugeSvg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 2, fill: COL.axis }));
            gaugeSvg.appendChild(svgVarText(
                { x: 42, y: 62, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tangent },
                ['*k', ' = ' + fmtDisp(k, 2)]));
        }

        // ── Rita huvudscenen (f) ────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var cf = curFunc();
            var a = state.a, fa = cf.f(a), k = cf.fp(a);
            var axisY = Y(0), axisX = X(0);
            var i;

            cf.xTicks.forEach(function (t) {
                svg.appendChild(svgEl('line', { x1: X(t.x), y1: T, x2: X(t.x), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            });
            cf.yTicks.forEach(function (t) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(t.y), x2: L + PW, y2: Y(t.y), stroke: COL.grid, 'stroke-width': 1 }));
            });

            var xThresh = (cf.xmax - cf.xmin) * 0.09;

            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            // Axeletiketten "x" döljs när tangentpunkten ligger nära högerkanten
            // — annars kolliderar den med den dynamiska "x = värde"-etiketten
            // under punkten (t.ex. när facit-sveppet når ända ut till xmax).
            if (cf.xmax - a >= xThresh) {
                svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            }
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*f', '(', '*x', ')']));
            cf.xTicks.forEach(function (t) {
                if (Math.abs(t.x - a) < xThresh) return;
                svg.appendChild(svgVarText({ x: X(t.x), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [t.label]));
            });
            cf.yTicks.forEach(function (t) {
                svg.appendChild(svgVarText({ x: axisX - 6, y: Y(t.y) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [t.label]));
            });

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Kurvan f(x)
            var d = '', penDown = false, N = 260;
            var margY = (cf.ymax - cf.ymin) * 0.4;
            for (i = 0; i <= N; i++) {
                var xv = cf.xmin + (cf.xmax - cf.xmin) * i / N;
                var yv = cf.f(xv);
                if (yv >= cf.ymin - margY && yv <= cf.ymax + margY) {
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            g.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

            // Tangenten (röd, heldragen) — över hela fönstret
            var y1t = fa + k * (cf.xmin - a), y2t = fa + k * (cf.xmax - a);
            g.appendChild(svgEl('line', { x1: X(cf.xmin), y1: Y(y1t), x2: X(cf.xmax), y2: Y(y2t), stroke: COL.tangent, 'stroke-width': 2.2 }));

            // Lodrät hjälplinje ner till x-axeln + x-etikett. Kantmedveten
            // justering: nära höger/vänsterkant byts anchor="middle" mot
            // "end"/"start" så etiketten aldrig sticker ut ur viewBoxen
            // (t.ex. när facit-sveppet når ända ut till xmin/xmax).
            var Px = X(a), Py = Y(fa);
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: Px, y2: axisY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            var xLblAnchor = 'middle', xLblX = Px;
            if (Px > W - 45) { xLblAnchor = 'end'; xLblX = W - 4; }
            else if (Px < L + 45) { xLblAnchor = 'start'; xLblX = L + 4; }
            svg.appendChild(svgVarText({ x: xLblX, y: axisY + 16, 'font-size': 13, 'text-anchor': xLblAnchor, fill: COL.tangent }, ['*x', ' = ' + fmt(a, 2)]));

            // Punkten
            g.appendChild(svgEl('circle', { cx: Px, cy: Py, r: 4.5, fill: COL.tangent }));
            var hit = svgEl('circle', { cx: Px, cy: Py, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); draggingPoint = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);

            drawGauge();
        }

        // ── Rita derivata-planet (f′) ────────────────────────────────────────
        var clipId2 = 'lab-vis-clip-' + (uid++);
        function drawTrace() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var cf = curFunc();
            var axisY = Y2(0), axisX = X(0);

            cf.xTicks.forEach(function (t) {
                svg2.appendChild(svgEl('line', { x1: X(t.x), y1: T2, x2: X(t.x), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            });
            cf.y2Ticks.forEach(function (t) {
                svg2.appendChild(svgEl('line', { x1: L, y1: Y2(t.y), x2: L + PW, y2: Y2(t.y), stroke: COL.grid, 'stroke-width': 1 }));
            });

            svg2.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX, y1: T2 + PH2, x2: axisX, y2: 16, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX + ',6 ' + (axisX - 4.5) + ',16 ' + (axisX + 4.5) + ',16', fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: axisX + 10, y: 16, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*f', '′(', '*x', ')']));

            cf.xTicks.forEach(function (t) {
                svg2.appendChild(svgVarText({ x: X(t.x), y: axisY + 15, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [t.label]));
            });
            cf.y2Ticks.forEach(function (t) {
                svg2.appendChild(svgVarText({ x: axisX - 6, y: Y2(t.y) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [t.label]));
            });

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            // Elevens gissning (grå spöklinje) — alltid ovanpå rutnätet
            guessPathEl = svgEl('path', {
                d: buildGuessD(), fill: 'none', stroke: COL.guess, 'stroke-width': 2.2,
                'stroke-linecap': 'round', 'stroke-linejoin': 'round'
            });
            g.appendChild(guessPathEl);

            if (state.facitDone && animId == null) {
                // Färdig, slät facit-kurva
                var d = '', penDown = false, N = 240, i;
                for (i = 0; i <= N; i++) {
                    var xv = cf.xmin + (cf.xmax - cf.xmin) * i / N;
                    var yv = cf.fp(xv);
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y2(yv).toFixed(1) + ' ';
                    penDown = true;
                }
                g.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
                g.appendChild(svgEl('circle', { cx: X(state.a), cy: Y2(cf.fp(state.a)), r: 4, fill: COL.curve }));
            } else if (trueTrail.length || fallingPoints.length) {
                if (trueTrail.length > 1) {
                    var pts = trueTrail.map(function (t) { return X(t.xw).toFixed(1) + ',' + Y2(t.y2w).toFixed(1); }).join(' ');
                    g.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: COL.curve, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
                }
                fallingPoints.forEach(function (pt) {
                    var targetY = Y2(pt.y2w), startY = T2 + 4;
                    var curY = startY + (targetY - startY) * pt.q;
                    g.appendChild(svgEl('circle', { cx: X(pt.xw), cy: curY, r: 3.4, fill: COL.tangent, opacity: (0.35 + 0.65 * pt.q).toFixed(2) }));
                });
            }
        }

        // ── Jämförelse: hur nära var gissningen? ────────────────────────────
        function computeNote() {
            var cf = curFunc();
            var sum = 0, covered = 0, c;
            for (c = 0; c <= PWi; c++) {
                var v = guessArr[c];
                if (v == null) continue;
                covered++;
                var xw = cf.xmin + c / PWi * (cf.xmax - cf.xmin);
                var guessWorld = cf.y2max - (v - T2) / PH2 * (cf.y2max - cf.y2min);
                var trueWorld = cf.fp(xw);
                sum += Math.abs(guessWorld - trueWorld);
            }
            var coverage = covered / (PWi + 1);
            var verdict;
            if (coverage < 0.4) {
                verdict = 'Rita hela grafen (dra över hela bredden) för att se hur nära du var.';
            } else {
                var meanAbs = sum / covered;
                var rel = meanAbs / (cf.y2max - cf.y2min);
                if (rel < 0.06) verdict = 'Din gissning följer facit mycket bra!';
                else if (rel < 0.15) verdict = 'Din gissning följer facit ganska bra.';
                else if (rel < 0.3) verdict = 'Din gissning liknar facit delvis — några delar avviker.';
                else verdict = 'Pröva igen — jämför var kurvan är för hög, för låg eller har fel tecken.';
            }
            var extra = cf.id === 'sin'
                ? ' Lägg märke till att facitkurvan är cos <em>x</em> — precis som i genomgången om derivatan av sin <em>x</em> och cos <em>x</em>.'
                : '';
            return verdict + extra;
        }

        // ── Formler ──────────────────────────────────────────────────────
        function updateFormulas() {
            var cf = curFunc();
            if (state.showFacit) {
                katexInto(formelA, cf.ruleTex);
                note.innerHTML = computeNote();
            } else {
                formelA.textContent = '';
                note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            var cf = curFunc();
            funcBtns.forEach(function (b, i) { b.setActive(i === state.funcIdx); });
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legF.setText(cf.legendHtml);
            legFacit.setText(cf.facitLegendHtml);
            legGuess.el.style.display = state.step >= 2 ? '' : 'none';
            legFacit.el.style.display = state.showFacit ? '' : 'none';

            formelA.style.display = state.showFacit ? '' : 'none';
            note.style.display = state.showFacit ? '' : 'none';

            scene2.style.display = state.step >= 2 ? '' : 'none';
            svg2.style.cursor = state.step === 2 ? 'crosshair' : 'default';

            actions.style.display = state.step >= 2 ? '' : 'none';
            eraseBtn.style.display = state.step === 2 ? '' : 'none';
            plotBtn.style.display = state.step === 3 ? '' : 'none';

            drawMain();
            if (state.step >= 2) drawTrace();
            updateFormulas();
        }

        buildXRow();
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
    window.VISUALISERINGAR['ma3c-3.1'] = api;
    window.VISUALISERINGAR['ma3c-3.2'] = api;
    window.VISUALISERINGAR['ma4-2.5'] = api;
})();
