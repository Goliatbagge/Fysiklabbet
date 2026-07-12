/* ma1c-1.3.js — visualisering: "Bråkverkstaden". Hör till ma1c-1.2 (Bråk),
 * ma1c-1.3 (Addition och subtraktion av bråk) och ma1c-1.4 (Multiplikation
 * och division av bråk).
 *
 * Kärninsikt: bråk är AREOR. Addition kräver lika stora bitar (gemensam
 * nämnare = förfina uppdelningen). Multiplikation a/b · c/d är en
 * rektangelarea i en enhetskvadrat. Missuppfattningen "täljare+täljare,
 * nämnare+nämnare" dör när man SER bitarna.
 *
 * Fyra steg (lager):
 *   1. Bråket som area   — stapel delad i n delar, t täckta. Glidare t, n.
 *                           Förläng/Förkorta animerar om uppdelningen medan
 *                           den färgade arean står stilla.
 *   2. Addition           — 1/3 + 1/4. Gissa-först (stämmer 2/7?), sedan
 *                           "Hitta gemensam nämnare" animerar båda staplarna
 *                           till tolftedelar och bitarna flyttas ihop.
 *   3. Multiplikation      — enhetskvadrat, a/b lodräta band, c/d vågräta
 *                           band, överlappet är produkten.
 *   4. Division            — hur många gånger ryms c/d i a/b? Kurerade
 *                           exempel (bl.a. genomgångens Exempel 3), räknas
 *                           synligt bit för bit.
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

    function gcd(a, b) {
        a = Math.round(Math.abs(a)); b = Math.round(Math.abs(b));
        while (b) { var t = a % b; a = b; b = t; }
        return a;
    }
    function lcm(a, b) { return Math.round(a * b / gcd(a, b)); }
    function reduceFrac(n, d) {
        if (n === 0) return { n: 0, d: 1 };
        var g = gcd(n, d);
        return { n: n / g, d: d / g };
    }
    function isTerminatingDenom(n) {
        n = Math.abs(Math.round(n));
        if (n === 0) return true;
        while (n % 2 === 0) n /= 2;
        while (n % 5 === 0) n /= 5;
        return n === 1;
    }
    function easeInOutQuad(p) { return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    function clearEl(el) { while (el.firstChild) el.removeChild(el.firstChild); }
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
    // Kompakt stapelfraktion (rak divisionslinje) ritad direkt i SVG:n —
    // används för korta bilegetiketter (mätetal, inte formelpresentation).
    function svgFrac(parent, cx, cyMid, num, den, fs, color) {
        var numS = String(num), denS = String(den);
        var w = Math.max(numS.length, denS.length, 1) * fs * 0.62 + 6;
        var g = svgEl('g', {});
        g.appendChild(svgVarText({ x: cx, y: cyMid - 3, 'font-size': fs, 'text-anchor': 'middle', fill: color }, [numS]));
        g.appendChild(svgEl('line', { x1: cx - w / 2, y1: cyMid + 2, x2: cx + w / 2, y2: cyMid + 2, stroke: color, 'stroke-width': 1.4 }));
        g.appendChild(svgVarText({ x: cx, y: cyMid + fs + 3, 'font-size': fs, 'text-anchor': 'middle', fill: color }, [denS]));
        parent.appendChild(g);
        return w;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }
    // Numerisk kedja: prefixTex + ev. förkortad form + ev. blandad form +
    // decimalform (= eller ≈). N/D avgör reduktion/blandad/decimal.
    function fracResultTex(prefixTex, N, D) {
        var s = prefixTex;
        if (N === 0) return s + ' = 0';
        var r = reduceFrac(N, D);
        if (r.n !== N || r.d !== D) {
            s += ' = ' + (r.d === 1 ? String(r.n) : ('\\dfrac{' + r.n + '}{' + r.d + '}'));
        }
        if (r.d > 1 && r.n > r.d) {
            var whole = Math.floor(r.n / r.d), rem = r.n - whole * r.d;
            s += ' = ' + (rem > 0 ? (whole + '\\dfrac{' + rem + '}{' + r.d + '}') : String(whole));
        }
        if (r.d !== 1) {
            var op = isTerminatingDenom(r.d) ? ' = ' : ' \\approx ';
            s += op + fmtTex(N / D, 3);
        }
        return s;
    }
    // Rutdelningar med crossfade-animation (delar som finns kvar i BÅDA
    // upplösningarna ritas alltid med full opacitet; bara de tillkommande/
    // försvinnande linjerna toningsanimeras). fromN/toN relaterade med
    // heltalskvot (dubblering eller exakt gcd-division) by construction.
    function drawPartitionLines(parent, x0, w, y, h, fromN, toN, p, color, sw) {
        function lineAt(frac, op) {
            if (op <= 0.01) return;
            var x = x0 + w * frac;
            parent.appendChild(svgEl('line', { x1: x, y1: y, x2: x, y2: y + h, stroke: color, 'stroke-width': sw, opacity: op }));
        }
        if (fromN === toN) {
            for (var j = 1; j < toN; j++) lineAt(j / toN, 1);
            return;
        }
        if (toN > fromN) {
            var ratio = toN / fromN;
            for (var j1 = 1; j1 < fromN; j1++) lineAt(j1 / fromN, 1);
            for (var j2 = 1; j2 < toN; j2++) { if (j2 % ratio !== 0) lineAt(j2 / toN, p); }
        } else {
            var ratio2 = fromN / toN;
            for (var j3 = 1; j3 < toN; j3++) lineAt(j3 / toN, 1);
            for (var j4 = 1; j4 < fromN; j4++) { if (j4 % ratio2 !== 0) lineAt(j4 / fromN, 1 - p); }
        }
    }

    // ── Färger (samma familj som övriga moduler) ──────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        grid: 'rgba(31,37,48,0.14)',
        f1: '#2563c9',      // första bråket — blå
        f2: '#4a7d3a',      // andra bråket — grön
        accent: '#c8324a'   // svar/produkt/rest — röd
    };

    // ── Kurerade exempel för steg 4 (division) ─────────────────────────────
    var PRESETS4 = [
        { a: 3, b: 4, c: 1, d: 8, tex: '\\tfrac{3}{4} \\Big/ \\tfrac{1}{8}' },
        { a: 3, b: 4, c: 2, d: 5, tex: '\\tfrac{3}{4} \\Big/ \\tfrac{2}{5}' },
        { a: 4, b: 5, c: 2, d: 7, tex: '\\tfrac{4}{5} \\Big/ \\tfrac{2}{7}' },
        { a: 5, b: 1, c: 3, d: 4, tex: '5 \\Big/ \\tfrac{3}{4}' }
    ];

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            s1: { t: 6, n: 8, k: 1, gridAnim: null, msg: '' },
            s2: { phase: 'guess', answer: null, progress: 0 },
            s3: { a: 1, b: 2, c: 3, d: 4 },
            s4: { presetIdx: 0, revealed: false, progress: 0 }
        };
        var animId = null;
        var curRows = [];

        function stopAnim() { if (animId != null) { cancelAnimationFrame(animId); animId = null; } }
        function runAnim(durationMs, onFrame, onDone) {
            stopAnim();
            var t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / durationMs, 0, 1);
                onFrame(p);
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; if (onDone) onDone(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Bråkverkstaden';
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

        var W = 560, H = 420;
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv figur som visar bråk som areor.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formel = document.createElement('div');
        formel.className = 'lab-vis-formel';
        card.appendChild(formel);

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

        var resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'lab-graf-reset';
        resetBtn.textContent = 'Återställ';
        resetBtn.addEventListener('click', function () {
            stopAnim();
            state.s1 = { t: 6, n: 8, k: 1, gridAnim: null, msg: '' };
            state.s2 = { phase: 'guess', answer: null, progress: 0 };
            state.s3 = { a: 1, b: 2, c: 3, d: 4 };
            state.s4 = { presetIdx: 0, revealed: false, progress: 0 };
            renderChrome();
            update();
        });
        foot.appendChild(resetBtn);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Bråket som area' },
            { n: 2, label: '2 · Addition kräver lika bitar' },
            { n: 3, label: '3 · Multiplikation som area' },
            { n: 4, label: '4 · Division — hur många ryms?' }
        ];
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { setStep(s.n); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });
        function setStep(n) {
            stopAnim();
            state.step = n;
            renderChrome();
            update();
        }

        // ── Generisk glidarrad (min/max kan vara tal eller funktion) ───────
        function makeRow(name, minA, maxA, get, set) {
            function curMin() { return typeof minA === 'function' ? minA() : minA; }
            function curMax() { return typeof maxA === 'function' ? maxA() : maxA; }
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
            slider.min = curMin(); slider.max = curMax(); slider.step = 1; slider.value = get();
            slider.setAttribute('aria-label', 'Värdet på ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = curMin(); field.max = curMax(); field.step = 1; field.value = get();
            field.setAttribute('inputmode', 'numeric');
            field.setAttribute('aria-label', 'Värdet på ' + name);
            function paint() {
                var mn = curMin(), mx = curMax();
                slider.min = mn; slider.max = mx; field.min = mn; field.max = mx;
                var pct = clampNum((get() - mn) / Math.max(1e-6, mx - mn) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.accent + ' 0%, ' +
                    COL.accent + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                var mn = curMin(), mx = curMax();
                v = Math.round(clampNum(v, mn, mx));
                set(v);
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = get();
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(field.value), 'field'); });
            field.addEventListener('blur', function () { field.value = get(); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                row: row,
                sync: function () {
                    slider.min = curMin(); slider.max = curMax(); slider.value = get();
                    field.min = curMin(); field.max = curMax(); field.value = get();
                    paint();
                }
            };
        }
        function setDisabled(btn, disabled) {
            btn.disabled = disabled;
            btn.style.opacity = disabled ? '0.4' : '';
            btn.style.pointerEvents = disabled ? 'none' : '';
        }
        function katexButton(texLabel, onClick) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            var span = document.createElement('span');
            katexInto(span, texLabel);
            b.appendChild(span);
            b.addEventListener('click', onClick);
            return b;
        }
        function textButton(label, onClick) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = label;
            b.addEventListener('click', onClick);
            return b;
        }

        // ── Chrome (legend/actions/controls) byggs om per steg ─────────────
        var forlangBtn, forkortaBtn, rowT, rowN;
        var jaBtn, nejBtn, gemBtn;
        var rowA3, rowB3, rowC3, rowD3;
        var raknaBtn4, presetBtns4;

        function renderChrome() {
            clearEl(legend); clearEl(actions); clearEl(controls);
            curRows = [];
            controls.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';

            if (state.step === 1) {
                legend.appendChild(legendItem(COL.f1, 'den färgade delen — bråket'));

                forlangBtn = textButton('Förläng med 2', function () {
                    if (!canForlang()) return;
                    var oldN = state.s1.n * state.s1.k;
                    state.s1.k *= 2;
                    var newN = state.s1.n * state.s1.k;
                    state.s1.msg = 'Bråket förlängdes — bitarna blev fler och mindre, men den färgade arean är exakt densamma.';
                    state.s1.gridAnim = { from: oldN, to: newN, p: 0 };
                    update();
                    runAnim(650, function (p) { state.s1.gridAnim.p = p; drawStep1(); },
                        function () { state.s1.gridAnim = null; update(); });
                });
                forkortaBtn = textButton('Förkorta', function () {
                    if (state.s1.k > 1) {
                        var oldN = state.s1.n * state.s1.k;
                        state.s1.k = state.s1.k / 2;
                        var newN = state.s1.n * state.s1.k;
                        state.s1.msg = 'Bitarna slogs ihop till färre och större — samma area som innan.';
                        state.s1.gridAnim = { from: oldN, to: newN, p: 0 };
                    } else {
                        var g = state.s1.t > 0 ? gcd(state.s1.t, state.s1.n) : 1;
                        if (g <= 1) return;
                        var oldN2 = state.s1.n;
                        state.s1.t = state.s1.t / g; state.s1.n = state.s1.n / g;
                        var newN2 = state.s1.n;
                        state.s1.msg = 'Bråket förkortades — täljare och nämnare delades med samma tal (' + g + '). Värdet ändrades inte.';
                        state.s1.gridAnim = { from: oldN2, to: newN2, p: 0 };
                        rowT.sync(); rowN.sync();
                    }
                    update();
                    var ga = state.s1.gridAnim;
                    runAnim(650, function (p) { ga.p = p; drawStep1(); },
                        function () { state.s1.gridAnim = null; update(); });
                });
                actions.appendChild(forlangBtn);
                actions.appendChild(forkortaBtn);

                rowT = makeRow('t', 0, 12, function () { return state.s1.t; },
                    function (v) { state.s1.t = v; state.s1.k = 1; state.s1.gridAnim = null; state.s1.msg = ''; });
                rowN = makeRow('n', 2, 12, function () { return state.s1.n; },
                    function (v) { state.s1.n = v; state.s1.k = 1; state.s1.gridAnim = null; state.s1.msg = ''; });
                curRows = [rowT, rowN];

            } else if (state.step === 2) {
                legend.appendChild(legendItem(COL.f1, 'första bråket'));
                legend.appendChild(legendItem(COL.f2, 'andra bråket'));
                legend.appendChild(legendItem(COL.accent, 'summan'));

                jaBtn = textButton('Ja, det stämmer', function () {
                    state.s2.answer = 'ja'; state.s2.phase = 'revealed'; update();
                });
                nejBtn = textButton('Nej, det stämmer inte', function () {
                    state.s2.answer = 'nej'; state.s2.phase = 'revealed'; update();
                });
                gemBtn = textButton('Hitta gemensam nämnare', function () {
                    if (state.s2.phase === 'animating') return;
                    state.s2.phase = 'animating'; state.s2.progress = 0;
                    update();
                    runAnim(1800, function (p) { state.s2.progress = p; drawStep2(); },
                        function () { state.s2.phase = 'common'; state.s2.progress = 1; update(); });
                });
                actions.appendChild(jaBtn);
                actions.appendChild(nejBtn);
                actions.appendChild(gemBtn);
                curRows = [];

            } else if (state.step === 3) {
                legend.appendChild(legendItem(COL.f1, 'bråket till vänster (lodrätt band)'));
                legend.appendChild(legendItem(COL.f2, 'bråket till höger (vågrätt band)'));
                legend.appendChild(legendItem(COL.accent, 'produkten (överlappet)'));

                rowA3 = makeRow('a', 1, function () { return state.s3.b; }, function () { return state.s3.a; },
                    function (v) { state.s3.a = v; });
                rowB3 = makeRow('b', 1, 6, function () { return state.s3.b; },
                    function (v) { state.s3.b = v; if (state.s3.a > v) state.s3.a = v; rowA3.sync(); });
                rowC3 = makeRow('c', 1, function () { return state.s3.d; }, function () { return state.s3.c; },
                    function (v) { state.s3.c = v; });
                rowD3 = makeRow('d', 1, 6, function () { return state.s3.d; },
                    function (v) { state.s3.d = v; if (state.s3.c > v) state.s3.c = v; rowC3.sync(); });
                curRows = [rowA3, rowB3, rowC3, rowD3];

            } else if (state.step === 4) {
                legend.appendChild(legendItem(COL.f1, 'bråket som delas upp (utgångsdelen)'));
                legend.appendChild(legendItem(COL.accent, 'resten — en ofullständig del'));

                presetBtns4 = [];
                PRESETS4.forEach(function (pr, idx) {
                    var b = katexButton(pr.tex, function () {
                        state.s4.presetIdx = idx; state.s4.revealed = false; state.s4.progress = 0;
                        update();
                    });
                    actions.appendChild(b);
                    presetBtns4.push(b);
                });
                raknaBtn4 = textButton('Räkna hur många som ryms', function () {
                    if (state.s4.revealed) return;
                    state.s4.revealed = true; state.s4.progress = 0;
                    var pr = PRESETS4[state.s4.presetIdx];
                    var fine = lcm(pr.b, pr.d), shaded = pr.a * fine / pr.b, chunkSize = pr.c * fine / pr.d;
                    var full = Math.floor(shaded / chunkSize), rem = shaded - full * chunkSize;
                    var totalChunks = full + (rem > 0 ? 1 : 0);
                    var dur = Math.max(600, totalChunks * 420);
                    update();
                    runAnim(dur, function (p) { state.s4.progress = p; drawStep4(); },
                        function () { state.s4.progress = 1; update(); });
                });
                actions.appendChild(raknaBtn4);
                curRows = [];
            }
        }
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

        // ── Steg 1: Bråket som area ─────────────────────────────────────────
        function canForlang() { return state.s1.n * state.s1.k * 2 <= 24; }
        function canForkorta() {
            return state.s1.k > 1 || (state.s1.k === 1 && state.s1.t > 0 && gcd(state.s1.t, state.s1.n) > 1);
        }
        var BAND_TOP1 = 56, BAND_BOTTOM1 = 356, BARS_X0 = 56, BARS_W = 460;
        function drawStep1() {
            clearEl(svg);
            var t = state.s1.t, n = state.s1.n, k = state.s1.k;
            var numBars = t > 0 ? Math.ceil(t / n) : 1;
            var bandH = BAND_BOTTOM1 - BAND_TOP1, gap = 10;
            var barH = clampNum((bandH - (numBars - 1) * gap) / numBars, 22, 92);
            var totalH = numBars * barH + (numBars - 1) * gap;
            var startY = BAND_TOP1 + (bandH - totalH) / 2;

            var fromN, toN, p;
            if (state.s1.gridAnim) { fromN = state.s1.gridAnim.from; toN = state.s1.gridAnim.to; p = state.s1.gridAnim.p; }
            else { fromN = toN = n * k; p = 1; }

            for (var i = 0; i < numBars; i++) {
                var y = startY + i * (barH + gap);
                var ratio = clampNum(t / n - i, 0, 1);
                if (ratio > 0.0001) {
                    svg.appendChild(svgEl('rect', {
                        x: BARS_X0, y: y, width: BARS_W * ratio, height: barH,
                        fill: COL.f1, 'fill-opacity': 0.5
                    }));
                }
                svg.appendChild(svgEl('rect', {
                    x: BARS_X0, y: y, width: BARS_W, height: barH,
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.6
                }));
                drawPartitionLines(svg, BARS_X0, BARS_W, y, barH, fromN, toN, p, COL.ink, 1.1);

                // Klickbar träffyta: sätt t = i*n + segment.
                var hit = svgEl('rect', { x: BARS_X0, y: y, width: BARS_W, height: barH, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'pointer';
                (function (barIndex) {
                    hit.addEventListener('pointerdown', function (e) {
                        stopAnim();
                        var r = svg.getBoundingClientRect();
                        var px = (e.clientX - r.left) * W / r.width;
                        var seg = clampNum(Math.ceil((px - BARS_X0) / BARS_W * n), 0, n);
                        var newT = clampNum(barIndex * n + seg, 0, 12);
                        state.s1.t = newT; state.s1.k = 1; state.s1.gridAnim = null; state.s1.msg = '';
                        rowT.sync();
                        update();
                    });
                })(i);
                svg.appendChild(hit);
            }
        }
        function textStep1() {
            instr.innerHTML = 'Dra i glidarna för <em>täljaren</em> (antal färgade delar) och ' +
                '<em>nämnaren</em> (antal delar totalt) — kom ihåg: täljaren i toppen, nämnaren där nere. ' +
                'Du kan även klicka direkt i rektangeln. Varje rektangel är en hel enhet.';
            var t = state.s1.t, n = state.s1.n, k = state.s1.k;
            var dT = t * k, dN = n * k;
            katexInto(formel, fracResultTex('\\dfrac{' + dT + '}{' + dN + '}', dT, dN));
            note.innerHTML = state.s1.msg || '';
            setDisabled(forlangBtn, !canForlang());
            setDisabled(forkortaBtn, !canForkorta());
        }

        // ── Steg 2: Addition kräver lika bitar (1/3 + 1/4) ─────────────────
        var S2_X0 = 130, S2_W = 360, S2_BARH = 44, S2_YA = 66, S2_YB = 152, S2_YR = 272;
        function drawStep2() {
            clearEl(svg);
            var phase = state.s2.phase, prog = state.s2.progress || 0;
            var gridP = clampNum(prog / 0.45, 0, 1);
            var moveP = prog <= 0.45 ? 0 : clampNum((prog - 0.45) / 0.55, 0, 1);
            if (phase === 'common') { gridP = 1; moveP = 1; }
            var fine = (phase === 'guess' || phase === 'revealed') ? null : 12;

            function bar(y, num, den, color, toN) {
                svg.appendChild(svgEl('rect', {
                    x: S2_X0, y: y, width: S2_W * (num / den), height: S2_BARH,
                    fill: color, 'fill-opacity': 0.5
                }));
                svg.appendChild(svgEl('rect', {
                    x: S2_X0, y: y, width: S2_W, height: S2_BARH,
                    fill: 'none', stroke: COL.ink, 'stroke-width': 1.6
                }));
                drawPartitionLines(svg, S2_X0, S2_W, y, S2_BARH, den, toN || den, gridP, COL.ink, 1.1);
                svgFrac(svg, S2_X0 + S2_W + 26, y + S2_BARH / 2, num, den, 14, color);
            }
            bar(S2_YA, 1, 3, COL.f1, fine || 3);
            bar(S2_YB, 1, 4, COL.f2, fine || 4);

            // Resultatstapel (streckad tills fylld)
            var filled = moveP >= 0.999;
            svg.appendChild(svgEl('rect', {
                x: S2_X0, y: S2_YR, width: S2_W, height: S2_BARH,
                fill: 'none', stroke: COL.ink, 'stroke-width': 1.6,
                'stroke-dasharray': filled ? '' : '5 4'
            }));
            if (filled) {
                drawPartitionLines(svg, S2_X0, S2_W, S2_YR, S2_BARH, 12, 12, 1, COL.ink, 1.1);
                svgFrac(svg, S2_X0 + S2_W + 26, S2_YR + S2_BARH / 2, 7, 12, 14, COL.accent);
            }

            // Flygande/landade bitar
            if (moveP > 0) {
                var wA = S2_W * 4 / 12, wB = S2_W * 3 / 12;
                var ep = easeInOutQuad(moveP);
                var pAy = S2_YA + (S2_YR - S2_YA) * ep;
                svg.appendChild(svgEl('rect', { x: S2_X0, y: pAy, width: wA, height: S2_BARH, fill: COL.f1, 'fill-opacity': 0.85 }));
                var dxB = S2_W * 4 / 12;
                var pBx = S2_X0 + dxB * ep;
                var pBy = S2_YB + (S2_YR - S2_YB) * ep;
                svg.appendChild(svgEl('rect', { x: pBx, y: pBy, width: wB, height: S2_BARH, fill: COL.f2, 'fill-opacity': 0.85 }));
            }

            // + och = i vänstermarginalen
            var plusY = (S2_YA + S2_BARH + S2_YB) / 2 + 5;
            svg.appendChild(svgVarText({ x: S2_X0 - 22, y: plusY, 'font-size': 20, 'text-anchor': 'middle', fill: COL.ink }, ['+']));
            var eqY = (S2_YB + S2_BARH + S2_YR) / 2 + 5;
            svg.appendChild(svgVarText({ x: S2_X0 - 22, y: eqY, 'font-size': 20, 'text-anchor': 'middle', fill: COL.ink }, ['=']));
        }
        function textStep2() {
            var phase = state.s2.phase;
            if (phase === 'guess') {
                instr.innerHTML = 'Gissa innan du räknar: stämmer likheten i rutan nedanför scenen? ' +
                    'Bråken har olika nämnare (3 och 4), så vi kan inte bara lägga ihop täljare och nämnare rakt av.';
                katexInto(formel, '\\dfrac13 + \\dfrac14 \\stackrel{?}{=} \\dfrac27');
                note.innerHTML = '';
            } else if (phase === 'revealed') {
                instr.innerHTML = 'Tryck på knappen "Hitta gemensam nämnare" för att se det rätta svaret.';
                katexInto(formel, '\\dfrac13 + \\dfrac14 \\stackrel{?}{=} \\dfrac27');
                if (state.s2.answer === 'nej') {
                    note.innerHTML = 'Rätt tänkt — två sjundedelar är för litet för att vara summan.';
                } else {
                    note.innerHTML = 'Nästan: en tredjedel är redan ungefär 0,33 för sig själv. Lägger vi till mer ' +
                        'måste summan bli större än 0,33 — men två sjundedelar är bara ungefär 0,29. Något är fel!';
                }
            } else {
                instr.innerHTML = 'Nu är alla bitar tolftedelar (samma nämnare) och kan läggas ihop rakt av: ' +
                    'täljarna adderas, nämnaren behålls.';
                katexInto(formel, '\\dfrac13 + \\dfrac14 = \\dfrac{1\\cdot4}{3\\cdot4} + \\dfrac{1\\cdot3}{4\\cdot3} = ' +
                    '\\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{4+3}{12} = \\dfrac{7}{12}');
                if (phase === 'common') {
                    note.innerHTML = 'Sju tolftedelar är ungefär 0,583 — inte två sjundedelar (ungefär 0,286).';
                } else {
                    note.innerHTML = '';
                }
            }
            setDisabled(gemBtn, phase === 'animating' || phase === 'common');
            jaBtn.style.display = phase === 'guess' ? '' : 'none';
            nejBtn.style.display = phase === 'guess' ? '' : 'none';
            gemBtn.style.display = phase === 'guess' ? 'none' : '';
        }

        // ── Steg 3: Multiplikation som area av area ────────────────────────
        var S3_X0 = 150, S3_Y0 = 76, S3_S = 300;
        function drawStep3() {
            clearEl(svg);
            var a = state.s3.a, b = state.s3.b, c = state.s3.c, d = state.s3.d;
            var x0 = S3_X0, y0 = S3_Y0, S = S3_S;
            var j;
            for (j = 1; j < b; j++) {
                svg.appendChild(svgEl('line', { x1: x0 + S * j / b, y1: y0, x2: x0 + S * j / b, y2: y0 + S, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (j = 1; j < d; j++) {
                svg.appendChild(svgEl('line', { x1: x0, y1: y0 + S * j / d, x2: x0 + S, y2: y0 + S * j / d, stroke: COL.grid, 'stroke-width': 1 }));
            }
            svg.appendChild(svgEl('rect', { x: x0, y: y0, width: S * a / b, height: S, fill: COL.f1, 'fill-opacity': 0.32 }));
            svg.appendChild(svgEl('rect', { x: x0, y: y0, width: S, height: S * c / d, fill: COL.f2, 'fill-opacity': 0.32 }));
            svg.appendChild(svgEl('rect', {
                x: x0, y: y0, width: S * a / b, height: S * c / d,
                fill: 'none', stroke: COL.accent, 'stroke-width': 2, 'stroke-dasharray': '6 4'
            }));
            svg.appendChild(svgEl('rect', { x: x0, y: y0, width: S, height: S, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));

            // Toppbrace för a/b
            var bx1 = x0, bx2 = x0 + S * a / b, byy = y0 - 16;
            svg.appendChild(svgEl('line', { x1: bx1, y1: byy, x2: bx2, y2: byy, stroke: COL.f1, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: bx1, y1: byy - 4, x2: bx1, y2: byy + 4, stroke: COL.f1, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: bx2, y1: byy - 4, x2: bx2, y2: byy + 4, stroke: COL.f1, 'stroke-width': 1.4 }));
            svgFrac(svg, (bx1 + bx2) / 2, y0 - 42, a, b, 14, COL.f1);

            // Vänsterbrace för c/d
            var cy1 = y0, cy2 = y0 + S * c / d, cxx = x0 - 16;
            svg.appendChild(svgEl('line', { x1: cxx, y1: cy1, x2: cxx, y2: cy2, stroke: COL.f2, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: cxx - 4, y1: cy1, x2: cxx + 4, y2: cy1, stroke: COL.f2, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: cxx - 4, y1: cy2, x2: cxx + 4, y2: cy2, stroke: COL.f2, 'stroke-width': 1.4 }));
            svgFrac(svg, x0 - 46, (cy1 + cy2) / 2, c, d, 14, COL.f2);

            // Produktetikett i högermarginalen med ledare
            var pyMid = y0 + S * c / d / 2;
            var pxEdge = x0 + S * a / b;
            svg.appendChild(svgEl('line', { x1: pxEdge, y1: pyMid, x2: x0 + S + 20, y2: pyMid, stroke: COL.accent, 'stroke-width': 1.2, 'stroke-dasharray': '3 3' }));
            svgFrac(svg, x0 + S + 44, pyMid, a * c, b * d, 15, COL.accent);
        }
        function textStep3() {
            instr.innerHTML = 'Dra i glidarna för de fyra talen. Det blå bandet visar bråket till vänster (lodrätt), ' +
                'det gröna bandet visar bråket till höger (vågrätt). Den streckade, mörkare rutan där banden möts är produkten.';
            var a = state.s3.a, b = state.s3.b, c = state.s3.c, d = state.s3.d;
            var prefix = '\\dfrac{' + a + '}{' + b + '}\\cdot\\dfrac{' + c + '}{' + d + '} = ' +
                '\\dfrac{' + a + '\\cdot' + c + '}{' + b + '\\cdot' + d + '} = \\dfrac{' + (a * c) + '}{' + (b * d) + '}';
            katexInto(formel, fracResultTex(prefix, a * c, b * d));
            note.innerHTML = 'Att beräkna en bråkdel AV något innebär att multiplicera med bråkdelen — precis som ' +
                'ytan där de två banden överlappar.';
        }

        // ── Steg 4: Division — hur många ryms? ─────────────────────────────
        var S4_X0 = 40, S4_W = 480, S4_Y = 176, S4_BARH = 56;
        function drawStep4() {
            clearEl(svg);
            var pr = PRESETS4[state.s4.presetIdx];
            var a = pr.a, b = pr.b, c = pr.c, d = pr.d;
            var fine = lcm(b, d), shaded = a * fine / b, chunkSize = c * fine / d;
            var full = Math.floor(shaded / chunkSize), remCells = shaded - full * chunkSize;
            var totalChunks = full + (remCells > 0 ? 1 : 0);
            var cellW = S4_W / shaded;

            svg.appendChild(svgEl('rect', { x: S4_X0, y: S4_Y, width: S4_W, height: S4_BARH, fill: COL.f1, 'fill-opacity': 0.28 }));
            svg.appendChild(svgEl('rect', { x: S4_X0, y: S4_Y, width: S4_W, height: S4_BARH, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));
            for (var j = 1; j < shaded; j++) {
                svg.appendChild(svgEl('line', { x1: S4_X0 + cellW * j, y1: S4_Y, x2: S4_X0 + cellW * j, y2: S4_Y + S4_BARH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            svgFrac(svg, S4_X0 + S4_W / 2, S4_Y - 26, a, b, 15, COL.ink);

            if (state.s4.revealed) {
                var prog = totalChunks > 0 ? state.s4.progress : 1;
                var i;
                for (i = 0; i < full; i++) {
                    var threshold = i / totalChunks;
                    var localP = clampNum((prog - threshold) / (1 / totalChunks), 0, 1);
                    if (localP <= 0) continue;
                    var cx0 = S4_X0 + cellW * chunkSize * i, cw = cellW * chunkSize;
                    svg.appendChild(svgEl('rect', { x: cx0, y: S4_Y, width: cw, height: S4_BARH, fill: COL.f1, 'fill-opacity': 0.22 * localP }));
                    svg.appendChild(svgEl('line', { x1: cx0, y1: S4_Y + S4_BARH + 8, x2: cx0 + cw, y2: S4_Y + S4_BARH + 8, stroke: COL.f1, 'stroke-width': 2, opacity: localP }));
                    svg.appendChild(svgEl('line', { x1: cx0, y1: S4_Y + S4_BARH + 4, x2: cx0, y2: S4_Y + S4_BARH + 12, stroke: COL.f1, 'stroke-width': 2, opacity: localP }));
                    svg.appendChild(svgEl('line', { x1: cx0 + cw, y1: S4_Y + S4_BARH + 4, x2: cx0 + cw, y2: S4_Y + S4_BARH + 12, stroke: COL.f1, 'stroke-width': 2, opacity: localP }));
                    var numEl = svgVarText({ x: cx0 + cw / 2, y: S4_Y + S4_BARH + 28, 'font-size': 14, 'text-anchor': 'middle', fill: COL.ink }, [String(i + 1)]);
                    numEl.setAttribute('opacity', localP);
                    svg.appendChild(numEl);
                }
                if (remCells > 0) {
                    var threshold2 = full / totalChunks;
                    var localP2 = clampNum((prog - threshold2) / (1 / totalChunks), 0, 1);
                    if (localP2 > 0) {
                        var cx0b = S4_X0 + cellW * chunkSize * full, cwb = cellW * remCells;
                        svg.appendChild(svgEl('rect', { x: cx0b, y: S4_Y, width: cwb, height: S4_BARH, fill: COL.accent, 'fill-opacity': 0.22 * localP2 }));
                        svg.appendChild(svgEl('line', { x1: cx0b, y1: S4_Y + S4_BARH + 8, x2: cx0b + cwb, y2: S4_Y + S4_BARH + 8, stroke: COL.accent, 'stroke-width': 2, 'stroke-dasharray': '4 3', opacity: localP2 }));
                        svg.appendChild(svgEl('line', { x1: cx0b, y1: S4_Y + S4_BARH + 4, x2: cx0b, y2: S4_Y + S4_BARH + 12, stroke: COL.accent, 'stroke-width': 2, opacity: localP2 }));
                        svg.appendChild(svgEl('line', { x1: cx0b + cwb, y1: S4_Y + S4_BARH + 4, x2: cx0b + cwb, y2: S4_Y + S4_BARH + 12, stroke: COL.accent, 'stroke-width': 2, opacity: localP2 }));
                        var rr = reduceFrac(remCells, chunkSize);
                        var g5 = svgEl('g', { opacity: localP2 });
                        svg.appendChild(g5);
                        svgFrac(g5, cx0b + cwb / 2, S4_Y + S4_BARH + 26, rr.n, rr.d, 13, COL.accent);
                    }
                }
            }
        }
        function textStep4() {
            instr.innerHTML = 'Klicka på ett exempel. Den blå stapeln visar hela det första bråket. Tryck sedan på ' +
                '"Räkna hur många som ryms" för att se hur många gånger det andra bråket ryms i den, en bit i taget.';
            var pr = PRESETS4[state.s4.presetIdx];
            var a = pr.a, b = pr.b, c = pr.c, d = pr.d;
            var leftTex = b === 1 ? (a + ' = \\dfrac{' + a + '}{1}') : ('\\dfrac{' + a + '}{' + b + '}');
            var rightTex = '\\dfrac{' + c + '}{' + d + '}';
            var prefix = leftTex + ' \\Big/ ' + rightTex + ' = \\dfrac{' + a + '}{' + b + '}\\cdot\\dfrac{' + d + '}{' + c + '} = ' +
                '\\dfrac{' + a + '\\cdot' + d + '}{' + b + '\\cdot' + c + '} = \\dfrac{' + (a * d) + '}{' + (b * c) + '}';
            if (state.s4.revealed && state.s4.progress >= 0.999) {
                katexInto(formel, fracResultTex(prefix, a * d, b * c));
                var fine = lcm(b, d), shaded = a * fine / b, chunkSize = c * fine / d;
                var full = Math.floor(shaded / chunkSize), remCells = shaded - full * chunkSize;
                if (remCells === 0) {
                    note.innerHTML = 'Svaret: delen ryms exakt ' + full + ' hela gånger.';
                } else {
                    var totalDec = full + remCells / chunkSize;
                    note.innerHTML = 'Svaret: delen ryms ' + full + ' hela gånger, plus en rest — sammanlagt ' +
                        fmt(totalDec, 2) + ' gånger.';
                }
            } else {
                katexInto(formel, leftTex + ' \\Big/ ' + rightTex);
                note.innerHTML = '';
            }
            setDisabled(raknaBtn4, state.s4.revealed);
        }

        // ── Dispatcher ────────────────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            if (state.step === 1) { drawStep1(); textStep1(); }
            else if (state.step === 2) { drawStep2(); textStep2(); }
            else if (state.step === 3) { drawStep3(); textStep3(); }
            else { drawStep4(); textStep4(); }
            curRows.forEach(function (r) { r.sync(); });
        }

        renderChrome();
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
    window.VISUALISERINGAR['ma1c-1.2'] = api;
    window.VISUALISERINGAR['ma1c-1.3'] = api;
    window.VISUALISERINGAR['ma1c-1.4'] = api;
})();
