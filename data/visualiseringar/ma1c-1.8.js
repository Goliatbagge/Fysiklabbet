/* ma1c-1.8.js — visualisering: "Exponentglidaren" (rationella exponenter).
 * Hör till ma1c-1.8 (rationella exponenter: a^(1/n) = n:te roten ur a).
 *
 * Kärnidé: en enda kontinuerlig glidare för exponenten n i y = x^n
 * (n från -2 till 3). Kurvan morfar MJUKT — hyperbel (n=-1) → konstant
 * (n=0) → rotkurva (n=1/2) → rät linje (n=1) → parabel (n=2) → kubik
 * (n=3) är bara sex punkter på SAMMA sammanhängande skala. x^(1/2) = √x
 * faller ut som en enda punkt bland de andra, inte en särskild regel.
 *
 * Tre steg (lager):
 *   1. Fri morfning   — n-glidare + snabbknappar för de namngivna
 *                        specialfallen; kurvans namn visas live.
 *   2. Roten ur x      — fokus n = 1/2. Punkten (4, 2) visar 2² = 4.
 *                        Gissa-först: vad ger kurvan vid x = 9? Dra sedan
 *                        den röda punkten längs kurvan för att pröva mer.
 *   3. Negativa exponenter — fokus n = -1: y = x^(-1) = 1/x. Kurvan är
 *                        inte definierad vid x = 0 (division med noll);
 *                        udda/jämn exponent avgör vilka kvadranter
 *                        grenarna hamnar i.
 *
 * Domän hanteras ÄRLIGT och matematiskt korrekt: Math.pow(x, n) ger
 * själv NaN för negativ bas med icke-heltalsexponent (JS-specen), så
 * kurvan ritas bara för x ≥ 0 när n inte är ett exakt heltal — ingen
 * egen branch-logik behövs i ritningen, bara ett isFinite-test.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / graf.js).
 * API: window.VISUALISERINGAR['ma1c-1.8'] = { mount(el) → { destroy() } }.
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
    function isIntish(v) { return Math.abs(v - Math.round(v)) < 1e-6; }

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
    // Koordinatpar: ", " när båda talen är heltal, "; " annars (kommat är
    // redan upptaget som decimalavskiljare).
    function coordLabel(x, y) {
        var sep = (isIntish(x) && isIntish(y)) ? ', ' : '; ';
        return '(' + fmt(x, 2) + sep + fmt(y, 2) + ')';
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // y = x^n — blå huvudkurva
        pointA: '#4a7d3a',     // givet exempel (4, 2) — grön
        pointB: '#c8324a',     // utforska-punkten (dra mig) — röd/accent
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ────────────────────────────────────────────────────
        var N_MIN = -2, N_MAX = 3, N_STEP = 0.01;
        var state = { n: 1, step: 1, bx: 1, guessValue: '', guessRevealed: false };
        var animId = null;
        var draggingB = false;

        function setN(v) {
            state.n = Math.round(clampNum(v, N_MIN, N_MAX) * 100) / 100;
        }
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }

        // ── Vyer per steg (samma viewBox, olika världskoordinater) ─────────
        var VIEWS = {
            1: { XMIN: -3.4, XMAX: 3.4, YMIN: -8.4, YMAX: 8.4, xTick: 1, yTick: 2 },
            2: { XMIN: -1.4, XMAX: 10.4, YMIN: -1.3, YMAX: 4.3, xTick: 2, yTick: 1 },
            3: { XMIN: -4.3, XMAX: 4.3, YMIN: -6.3, YMAX: 6.3, xTick: 1, yTick: 2 }
        };
        function currentView() { return VIEWS[state.step] || VIEWS[1]; }

        var W = 560, H = 400, L = 46, R = 16, T = 14, B = 36;
        var PW = W - L - R, PH = H - T - B;

        // Domän-säker klämning av utforska-punktens x (steg 2/3): icke-
        // heltalsexponent → bara x ≥ 0; alltid undvik x = 0 när kurvan
        // saknas där (n ≤ 0, division med noll eller 0^0).
        function nearestValidX(n, xRaw, view) {
            var x = clampNum(xRaw, view.XMIN, view.XMAX);
            if (!isIntish(n) && x < 0) x = 0;
            if (n < -0.004 || Math.abs(n) < 0.004) {
                var eps = (view.XMAX - view.XMIN) * 0.015;
                if (x > -eps && x < eps) x = (xRaw < 0 ? -eps : eps);
            }
            return x;
        }

        // ── Kurvans namn/ekvation beroende av n ────────────────────────────
        function curveInfo(n) {
            var nr = Math.round(n * 100) / 100;
            if (Math.abs(nr + 1) < 0.015) return { name: 'hyperbel', tex: 'y = x^{-1} = \\dfrac{1}{x}' };
            if (Math.abs(nr) < 0.015) return { name: 'konstant funktion', tex: 'y = x^{0} = 1' };
            if (Math.abs(nr - 0.5) < 0.015) return { name: 'rotkurva', tex: 'y = x^{1/2} = \\sqrt{x}' };
            if (Math.abs(nr - 1) < 0.015) return { name: 'rät linje', tex: 'y = x^{1} = x' };
            if (Math.abs(nr - 2) < 0.015) return { name: 'parabel', tex: 'y = x^{2}' };
            if (Math.abs(nr - 3) < 0.015) return { name: 'kubik', tex: 'y = x^{3}' };
            return { name: null, tex: 'y = x^{' + fmtTex(nr, 2) + '}' };
        }
        function pointFormula(n, x, y) {
            var xT = fmtTex(x, 2), yT = fmtTex(y, 2);
            if (Math.abs(n - 0.5) < 0.02) return '\\sqrt{' + xT + '} = ' + yT;
            if (Math.abs(n + 1) < 0.02) return '\\dfrac{1}{' + xT + '} = ' + yT;
            if (Math.abs(n + 2) < 0.02) return '\\dfrac{1}{' + xT + '^2} = ' + yT;
            return xT + '^{' + fmtTex(n, 2) + '} = ' + yT;
        }
        function domainNoteStep3(n) {
            if (!isIntish(n)) {
                return 'Just nu är <em>n</em> inte ett heltal, så kurvan finns bara för ' +
                    '<em>x</em> ≥ 0 — roten ur ett negativt tal är inte definierad här.';
            }
            var k = Math.round(n);
            if (k === 0) {
                return 'Vid <em>n</em> = 0 är <em>x</em><sup>0</sup> = 1 för alla <em>x</em> utom ' +
                    '<em>x</em> = 0 — den öppna punkten ovanför origo markerar hålet.';
            }
            if (k > 0) {
                return 'Vid <em>n</em> = ' + fmtDisp(k) + ' är kurvan definierad för alla <em>x</em> ' +
                    '— inga asymptoter.';
            }
            var evenK = Math.abs(k) % 2 === 0;
            return 'Exponenten <em>n</em> = ' + fmtDisp(k) + ' är ' + (evenK ? 'jämn' : 'udda') +
                ', så kurvans grenar hamnar i ' +
                (evenK ? 'kvadrant I och II (alltid <em>y</em> > 0)' : 'kvadrant I och III (symmetriska kring origo)') +
                '. Kurvan är aldrig definierad vid <em>x</em> = 0 — där skulle vi dela med noll.';
        }

        // ── DOM-skelett ──────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Exponentglidaren';
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
            'aria-label': 'Interaktiv graf: kurvan y lika med x upphöjt till n. Dra i n-glidaren ' +
                'eller tryck på snabbknapparna för att ändra exponenten n och se kurvan morfa ' +
                'mellan hyperbel, konstant funktion, rotkurva, rät linje, parabel och kubik.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var quickRow = document.createElement('div');
        quickRow.className = 'lab-vis-actions';
        card.appendChild(quickRow);

        var formelMain = document.createElement('div');
        formelMain.className = 'lab-vis-formel';
        formelMain.style.color = COL.curve;
        card.appendChild(formelMain);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.pointA;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.pointB;
        card.appendChild(formelB);

        var guessWrap = document.createElement('div');
        guessWrap.className = 'lab-vis-actions';
        card.appendChild(guessWrap);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ─────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Fri morfning' },
            { n: 2, label: '2 · Roten ur x' },
            { n: 3, label: '3 · Negativa exponenter' }
        ];
        var INSTR = {
            1: 'Dra i <em>n</em>-glidaren eller tryck på en snabbknapp och se hur kurvan ' +
               '<em>y</em> = <em>x</em><sup><em>n</em></sup> morfar mjukt mellan kända former. ' +
               'Hyperbel, konstant funktion, rotkurva, rät linje, parabel och kubik är bara sex ' +
               'punkter på samma sammanhängande skala.',
            2: 'Vid <em>n</em> = 1/2 blir kurvan kvadratroten, <em>y</em> = √<em>x</em>. Punkten ' +
               '(4, 2) ligger på kurvan eftersom 2<sup>2</sup> = 4. Gissa själv vad kurvan ger vid ' +
               '<em>x</em> = 9 innan du trycker på "Visa svaret" — dra sedan den röda punkten ' +
               'längs kurvan för att pröva andra tal.',
            3: 'Vid negativa exponenter, t.ex. <em>n</em> = −1, blir <em>y</em> = ' +
               '<em>x</em><sup><em>n</em></sup> en hyperbel: <em>y</em> = 1/<em>x</em>. Kurvan är ' +
               'inte definierad vid <em>x</em> = 0 — där skulle vi dela med noll. Dra ' +
               '<em>n</em>-glidaren mot −2 och se hur kurvans grenar byter kvadrant.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                stopAnim();
                state.step = s.n;
                if (s.n === 2) { setN(0.5); state.bx = 1; state.guessValue = ''; state.guessRevealed = false; guessInput.value = ''; }
                if (s.n === 3) { setN(-1); state.bx = 2; }
                rowN.sync();
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ───────────────────────────────────────────────────────
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
        var legCurve = legendItem(COL.curve, '<em>y</em> = <em>x</em><sup><em>n</em></sup>');
        var legA = legendItem(COL.pointA, 'given punkt (4, 2)');
        var legB = legendItem(COL.pointB, 'din punkt — dra mig');
        var legAsym = legendItem(COL.dash, 'asymptoter: <em>x</em> = 0 och <em>y</em> = 0');
        legend.appendChild(legCurve);
        legend.appendChild(legA);
        legend.appendChild(legB);
        legend.appendChild(legAsym);

        // ── Snabbknappar för namngivna specialfall (steg 1) ───────────────
        var QUICK = [
            { value: -1, label: '−1', name: 'hyperbel' },
            { value: 0, label: '0', name: 'konstant' },
            { value: 0.5, label: '1/2', name: 'rotkurva' },
            { value: 1, label: '1', name: 'linje' },
            { value: 2, label: '2', name: 'parabel' },
            { value: 3, label: '3', name: 'kubik' }
        ];
        QUICK.forEach(function (qd) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            // Innehållet lindas i en <span> — .lab-btn är display:inline-flex,
            // och blandas <em> med syskon-textnoder direkt i knappen blir
            // textnoden en egen flex-item vars INLEDANDE mellanslag trimmas
            // bort (CSS-kvirk), så "n" och "=" hamnar ihop utan mellanrum.
            b.innerHTML = '<span><em>n</em> = ' + qd.label + ' · ' + qd.name + '</span>';
            b.addEventListener('click', function () {
                stopAnim();
                setN(qd.value);
                rowN.sync();
                update();
            });
            quickRow.appendChild(b);
            qd.el = b;
        });
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Spela morfningen';
        playBtn.addEventListener('click', function () { startAnim(); });
        quickRow.appendChild(playBtn);

        // ── Gissa-först (steg 2) ───────────────────────────────────────────
        var guessLbl = document.createElement('span');
        guessLbl.style.fontSize = '13.5px';
        guessLbl.style.color = 'var(--lab-ink-soft)';
        guessLbl.innerHTML = 'Gissa: <em>x</em> = 9 ger <em>y</em> = ?';
        guessWrap.appendChild(guessLbl);
        var guessInput = document.createElement('input');
        guessInput.type = 'number';
        guessInput.className = 'lab-graf-num';
        guessInput.placeholder = 'ditt svar';
        guessInput.setAttribute('inputmode', 'decimal');
        guessInput.setAttribute('aria-label', 'Din gissning för roten ur 9');
        guessInput.addEventListener('input', function () { state.guessValue = guessInput.value; });
        guessWrap.appendChild(guessInput);
        var guessBtn = document.createElement('button');
        guessBtn.type = 'button';
        guessBtn.className = 'lab-btn';
        guessBtn.textContent = 'Visa svaret';
        guessBtn.addEventListener('click', function () {
            stopAnim();
            setN(0.5);
            state.bx = 9;
            state.guessRevealed = true;
            rowN.sync();
            update();
        });
        guessWrap.appendChild(guessBtn);

        // ── n-glidare ────────────────────────────────────────────────────
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
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(v);
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), 2).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { field.value = fmt(get(), 2).replace(',', '.'); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () { slider.value = get(); field.value = fmt(get(), 2).replace(',', '.'); paint(); }
            };
        }
        var rowN = makeRow('n', N_MIN, N_MAX, N_STEP, function () { return state.n; }, function (v) { setN(v); });

        // ── Återställ ────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            setN(1); state.step = 1; state.bx = 1; state.guessValue = ''; state.guessRevealed = false;
            guessInput.value = '';
            rowN.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: svep n från -2 till 3 ────────────────────────────
        function startAnim() {
            stopAnim();
            var t0 = null, DUR = 6000;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DUR, 0, 1);
                setN(N_MIN + (N_MAX - N_MIN) * p);
                rowN.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragpunkt B (steg 2/3) ───────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var view = currentView();
            return view.XMIN + (px - L) / PW * (view.XMAX - view.XMIN);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!draggingB) return;
            var xw = toWorldX(e.clientX);
            state.bx = nearestValidX(state.n, xw, currentView());
            update();
        });
        function endDragB() { draggingB = false; }
        svg.addEventListener('pointerup', endDragB);
        svg.addEventListener('pointercancel', endDragB);

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var view = currentView();
            var n = state.n;
            function X(x) { return L + (x - view.XMIN) / (view.XMAX - view.XMIN) * PW; }
            function Y(y) { return T + (view.YMAX - y) / (view.YMAX - view.YMIN) * PH; }
            var axisX = X(0), axisY = Y(0);
            var i;

            // Rutnät
            for (i = Math.ceil(view.XMIN / view.xTick) * view.xTick; i <= view.XMAX + 1e-9; i += view.xTick) {
                if (Math.abs(i) < 1e-9) continue;
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = Math.ceil(view.YMIN / view.yTick) * view.yTick; i <= view.YMAX + 1e-9; i += view.yTick) {
                if (Math.abs(i) < 1e-9) continue;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter
            for (i = Math.ceil(view.XMIN / view.xTick) * view.xTick; i <= view.XMAX + 1e-9; i += view.xTick) {
                if (Math.abs(i) < 1e-9) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [fmtDisp(i, 2)]));
            }
            for (i = Math.ceil(view.YMIN / view.yTick) * view.yTick; i <= view.YMAX + 1e-9; i += view.yTick) {
                if (Math.abs(i) < 1e-9) continue;
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [fmtDisp(i, 2)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Vertikal asymptot vid x = 0 när n < 0 (division med noll)
            if (n < -0.004) {
                g.appendChild(svgEl('line', {
                    x1: X(0), y1: T, x2: X(0), y2: T + PH,
                    stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
            }

            // Kurvan y = x^n — Math.pow ger själv NaN för negativ bas med
            // icke-heltalsexponent, så domänet hanteras helt av isFinite.
            var N = 400, d = '', penDown = false;
            var margin = (view.YMAX - view.YMIN) * 0.6;
            for (i = 0; i <= N; i++) {
                var xv = view.XMIN + (view.XMAX - view.XMIN) * i / N;
                var yv;
                if (Math.abs(n) < 0.004 && Math.abs(xv) < 1e-6) yv = NaN;   // hål vid n = 0, x = 0
                else yv = Math.pow(xv, n);
                var ok = isFinite(yv) && yv > view.YMIN - margin && yv < view.YMAX + margin;
                if (ok) {
                    d += (penDown ? 'L' : 'M') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
                    penDown = true;
                } else penDown = false;
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Öppen punkt (hål) vid n = 0, x = 0 — 0^0 är inte definierat
            if (Math.abs(n) < 0.004) {
                g.appendChild(svgEl('circle', { cx: X(0), cy: Y(1), r: 4.5, fill: '#ffffff', stroke: COL.curve, 'stroke-width': 2 }));
            }

            // Punkt A: givet exempel (4, 2) — bara steg 2, bara vid n ≈ 1/2
            if (state.step === 2 && Math.abs(n - 0.5) < 0.02) {
                var pxA = X(4), pyA = Y(2);
                g.appendChild(svgEl('line', { x1: axisX, y1: pyA, x2: pxA, y2: pyA, stroke: COL.pointA, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                g.appendChild(svgEl('line', { x1: pxA, y1: pyA, x2: pxA, y2: axisY, stroke: COL.pointA, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
                g.appendChild(svgEl('circle', { cx: pxA, cy: pyA, r: 4.5, fill: COL.pointA }));
                // Etiketten uppe till VÄNSTER om punkten — kurvan stiger åt
                // höger och skulle skära texten där; åt vänster ligger den
                // under punktens nivå och ytan är fri.
                svg.appendChild(svgVarText(
                    { x: pxA - 9, y: pyA - 10, 'font-size': 13, 'text-anchor': 'end', fill: COL.pointA },
                    ['(4, 2)']));
            }

            // Punkt B: dra-mig-punkten — steg 2 och 3
            if (state.step === 2 || state.step === 3) {
                var bx = state.bx, by = Math.pow(bx, n);
                if (isFinite(by)) {
                    var pxB = clampNum(X(bx), L, L + PW);
                    var pyB = clampNum(Y(by), T, T + PH);
                    g.appendChild(svgEl('circle', { cx: pxB, cy: pyB, r: 4.5, fill: COL.pointB }));
                    // Etiketten läggs i den fria kvadranten BORT från kurvan:
                    // stigande kurva upptar upp-höger/ner-vänster → etiketten
                    // ner-höger (eller upp-vänster vid kanten); avtagande
                    // kurva upptar upp-vänster/ner-höger → etiketten upp-höger
                    // (eller ner-vänster vid kanten).
                    var slopeB = n * Math.pow(bx, n - 1);
                    var incB = isFinite(slopeB) && slopeB > 0;
                    var nearRight = pxB > L + PW - 90;
                    var nearTop = pyB < T + 28, nearBottom = pyB > T + PH - 26;
                    var labelAbove, anchorEnd;
                    if (incB) {
                        anchorEnd = nearRight || nearBottom;
                        labelAbove = anchorEnd;
                        if (labelAbove && nearTop) { labelAbove = false; anchorEnd = false; }
                    } else {
                        anchorEnd = nearRight || nearTop;
                        labelAbove = !anchorEnd;
                        if (!labelAbove && nearBottom) { labelAbove = true; anchorEnd = false; }
                    }
                    svg.appendChild(svgVarText(
                        {
                            x: pxB + (anchorEnd ? -9 : 9),
                            y: labelAbove ? pyB - 10 : pyB + 18,
                            'font-size': 12.5, 'text-anchor': anchorEnd ? 'end' : 'start', fill: COL.pointB
                        },
                        [coordLabel(bx, by)]));
                    var hitB = svgEl('circle', { cx: pxB, cy: pyB, r: 16, fill: 'rgba(0,0,0,0)' });
                    hitB.style.cursor = 'grab';
                    hitB.addEventListener('pointerdown', function (e) {
                        stopAnim();
                        draggingB = true;
                        try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                        e.preventDefault();
                    });
                    svg.appendChild(hitB);
                }
            }
        }

        // ── Formler och texter ───────────────────────────────────────────
        function updateFormulas() {
            var n = state.n;
            var info = curveInfo(n);
            katexInto(formelMain, info.tex);

            if (state.step === 2 && Math.abs(n - 0.5) < 0.02) {
                katexInto(formelA, '\\sqrt{4} = 2');
            } else formelA.textContent = '';

            if (state.step === 2 || state.step === 3) {
                var by = Math.pow(state.bx, n);
                if (isFinite(by)) katexInto(formelB, pointFormula(n, state.bx, by));
                else formelB.textContent = '';
            } else formelB.textContent = '';

            if (state.step === 1) {
                note.innerHTML = info.name
                    ? 'Just nu är kurvan en <em>' + info.name + '</em>.'
                    : 'Ingen namngiven kurvtyp just här — men det är fortfarande exakt samma familj ' +
                      '<em>y</em> = <em>x</em><sup><em>n</em></sup>.';
            } else if (state.step === 2) {
                if (state.guessRevealed) {
                    var gv = parseFloat(String(state.guessValue).replace(',', '.'));
                    var pre = isFinite(gv) ? ('Din gissning: ' + fmt(gv, 2) + '. ') : '';
                    note.innerHTML = pre + 'Kurvans svar: <em>x</em> = 9 ger <em>y</em> = 3, eftersom 3<sup>2</sup> = 9.';
                } else note.textContent = '';
            } else if (state.step === 3) {
                note.innerHTML = domainNoteStep3(n);
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            state.bx = nearestValidX(state.n, state.bx, currentView());

            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            var nearHalf = Math.abs(state.n - 0.5) < 0.02;

            quickRow.style.display = state.step === 1 ? '' : 'none';
            QUICK.forEach(function (qd) { qd.el.classList.toggle('lab-btn-primary', Math.abs(state.n - qd.value) < 0.015); });

            legA.style.display = (state.step === 2 && nearHalf) ? '' : 'none';
            legB.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            legAsym.style.display = (state.step === 3) ? '' : 'none';

            formelA.style.display = (state.step === 2 && nearHalf) ? '' : 'none';
            formelB.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            guessWrap.style.display = (state.step === 2) ? '' : 'none';

            draw();
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
    window.VISUALISERINGAR['ma1c-1.8'] = { mount: mount };
})();
