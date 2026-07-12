/* ma1c-1.6.js — visualisering: "Potenstrappan — ner till a⁰ och vidare".
 * Hör till ma1c-1.6 (potenser med positiva heltalsexponenter) och ma1c-1.7
 * (negativa exponenter och exponenten noll).
 *
 * KÄRNINSIKT: a⁰ = 1 och a⁻ⁿ = 1/aⁿ är inte godtyckliga definitioner — de
 * är mönstrets TVINGANDE fortsättning. Varje steg nedåt i exponenttrappan
 * (a⁴, a³, a², a¹, a⁰, a⁻¹, a⁻², a⁻³) är samma räkneoperation: dividera
 * med basen a. Eleven kliver själv nedåt genom trappan med en ÷ a-knapp;
 * bara nästa steg är upplåsbart. Passerar man a¹ MÅSTE nästa tal bli 1
 * (annars bryts mönstret) — det är hela beviset för a⁰ = 1.
 *
 * SKALVAL (dokumenterat, se CLAUDE.md-kravet på att motivera skalan):
 * Talen spänner enormt — vid bas a = 5 är a⁴ = 625 och a⁻³ = 0,008, en
 * kvot på över 78 000. En linjär skala för det verkliga värdet skulle
 * antingen klippa de stora staplarna eller göra de små osynliga. I stället
 * bestäms stapelhöjden av EXPONENTENS POSITION i trappan, inte av
 * värdets storlek:
 *   höjd(n) = H1 · R^n,   R = (MAXHÖJD / H1)^(1/4)
 * (H1 = höjden vid n = 0, dvs. vid värdet 1; MAXHÖJD = höjden vid n = 4).
 * R är alltså en FAST kvot — samma för alla baser — så trappans siluett
 * (samma silhuett oavsett vilken bas man ställer in) fylls konsekvent
 * hela scenytan, utan tomrum längst upp för små baser och utan att
 * klippas för stora. Det håller ändå mönstret ärligt: varje stapel är
 * EXAKT R gånger föregående, ett enda konstant förhållande hela vägen
 * — precis den regelbundenhet eleven ska upptäcka. De verkliga talen
 * (inkl. bråkform för negativa exponenter) skrivs alltid ut i klartext
 * ovanför/under staplarna och i formelraden; det är bara pixelhöjden som
 * är komprimerad för att få plats, aldrig de tal eleven faktiskt läser.
 * Som bonus landar värdet 1 (dvs. a⁰) alltid på exakt samma pixelhöjd
 * H1, oavsett bas — den tunna streckade "1"-linjen i scenen är alltså
 * samma mållinje som den kritiska a⁰-stapeln siktar mot.
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
    // Siffra → unicode-superscript (endast för SVG-figuretiketter, se
    // brief-undantaget — aldrig i HTML-löptext, där <sup> används i stället).
    var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
    function supStr(n) {
        var s = String(Math.abs(n));
        var out = n < 0 ? SUP['-'] : '';
        for (var i = 0; i < s.length; i++) out += SUP[s.charAt(i)];
        return out;
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        axis: '#1f2530',
        tick: '#5b6472',
        pos: '#2563c9',        // n ≥ 1 — känt mönster (blå)
        zero: '#c8324a',       // n = 0 — det kritiska ögonblicket (accentröd)
        neg: '#4a7d3a',        // n < 0 — nytt territorium (grön)
        dash: 'rgba(31,37,48,0.4)',
        lockFill: 'rgba(31,37,48,0.045)',
        lockStroke: 'rgba(31,37,48,0.32)'
    };

    var EXPONENTS = [4, 3, 2, 1, 0, -1, -2, -3];

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var A_MIN = 2, A_MAX = 5;
        var state = { a: 2, step: 1, unlocked: 1 };
        var animId = null;
        var ghost = null;   // { x, h, topY, color, opacity } — under ÷a-animationen

        function valueAt(n) { return Math.pow(state.a, n); }

        // ── Geometri: trappscenen ──────────────────────────────────────────
        var W = 560, H = 380, L = 46, MR = 16, PT = 20;
        var baselineY = 340;
        var H1 = 64, MAXH = 290;                 // se skalmotiveringen i filhuvudet
        var STEP_RATIO = Math.pow(MAXH / H1, 0.25);   // fast kvot mellan grannstaplar
        var colW = (W - L - MR) / 8, barW = 34;
        function xCenter(i) { return L + colW * (i + 0.5); }
        function heightPx(n) {
            var hpx = H1 * Math.pow(STEP_RATIO, n);
            var maxH = baselineY - PT;
            return hpx > maxH ? maxH : hpx;
        }
        function zoneColor(n) { return n > 0 ? COL.pos : (n === 0 ? COL.zero : COL.neg); }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Potenstrappan';
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
            'aria-label': 'Trappa av åtta staplar som visar talet a upphöjt till ' +
                'avtagande exponenter, från 4 ner till minus 3. Tryck på dela-med-a-' +
                'knappen för att klyva fram nästa stapel i trappan.'
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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Mönstret nedåt' },
            { n: 2, label: '2 · Förbi ettan' },
            { n: 3, label: '3 · Byt bas' }
        ];
        var INSTR = {
            1: 'Trappan visar potenser av <em>a</em> med sjunkande exponent — ' +
               '<em>a</em><sup>4</sup>, <em>a</em><sup>3</sup>, <em>a</em><sup>2</sup>… ' +
               'Varje steg nedåt är samma räkneoperation: dividera med <em>a</em>. ' +
               'Tryck på ÷ <em>a</em> och kliv nedåt till <em>a</em><sup>1</sup> — ' +
               'se att mönstret stämmer hela vägen.',
            2: 'Fortsätt trycka på ÷ <em>a</em> förbi <em>a</em><sup>1</sup>. Vad ' +
               'MÅSTE nästa tal bli, om mönstret ska fortsätta att stämma? Kliv ' +
               'sedan vidare in i minus-exponenterna också — samma division, ' +
               'samma mönster, rakt igenom.',
            3: 'Dra i bas-glidaren <em>a</em> nedanför scenen. Hela trappan räknas ' +
               'om direkt — men mönstret (÷ <em>a</em> per steg, och att ' +
               '<em>a</em><sup>0</sup> alltid landar på 1) håller för varje bas.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                finishAnimIfAny();
                state.step = s.n;
                if (s.n === 3 && state.unlocked < 8) state.unlocked = 8;
                update();
            });
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
        legend.appendChild(legendItem(COL.pos, '<em>a</em><sup><em>n</em></sup>, <em>n</em> ≥ 1 — känt mönster'));
        legend.appendChild(legendItem(COL.zero, '<em>a</em><sup>0</sup> = 1'));
        legend.appendChild(legendItem(COL.neg, '<em>a</em><sup><em>n</em></sup>, <em>n</em> &lt; 0'));

        // ── Knapp: ÷ a ────────────────────────────────────────────────────
        var divBtn = document.createElement('button');
        divBtn.type = 'button';
        divBtn.className = 'lab-btn lab-btn-primary';
        divBtn.addEventListener('click', function () { startDivide(); });
        actions.appendChild(divBtn);

        // ── Glidare: bas a ───────────────────────────────────────────────
        var rowA = document.createElement('div');
        rowA.className = 'lab-graf-row';
        var lblA = document.createElement('label');
        lblA.className = 'lab-graf-lbl';
        var emA = document.createElement('em');
        emA.textContent = 'a';
        lblA.appendChild(emA);
        var sliderA = document.createElement('input');
        sliderA.type = 'range';
        sliderA.className = 'lab-graf-slider';
        sliderA.min = A_MIN; sliderA.max = A_MAX; sliderA.step = 1; sliderA.value = state.a;
        sliderA.setAttribute('aria-label', 'Basen a');
        var fieldA = document.createElement('input');
        fieldA.type = 'number';
        fieldA.className = 'lab-graf-num';
        fieldA.min = A_MIN; fieldA.max = A_MAX; fieldA.step = 1; fieldA.value = state.a;
        fieldA.setAttribute('aria-label', 'Basen a');
        function paintA() {
            var pct = clampNum((state.a - A_MIN) / (A_MAX - A_MIN) * 100, 0, 100);
            sliderA.style.background = 'linear-gradient(to right, ' + COL.zero + ' 0%, ' +
                COL.zero + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
        }
        function applyA(v) {
            if (!isFinite(v)) return;
            finishAnimIfAny();
            state.a = Math.round(clampNum(v, A_MIN, A_MAX));
            sliderA.value = state.a;
            fieldA.value = state.a;
            paintA();
            update();
        }
        sliderA.addEventListener('input', function () { applyA(parseFloat(sliderA.value)); });
        fieldA.addEventListener('input', function () { applyA(parseFloat(String(fieldA.value).replace(',', '.'))); });
        fieldA.addEventListener('blur', function () { fieldA.value = state.a; });
        paintA();
        lblA.appendChild(sliderA);
        rowA.appendChild(lblA);
        rowA.appendChild(fieldA);
        controls.appendChild(rowA);

        // ── Återställ (låser trappan igen) ──────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Börja om';
        reset.addEventListener('click', function () {
            finishAnimIfAny();
            state.unlocked = 1;
            update();
        });
        foot.appendChild(reset);

        function setControlsDisabled(dis) {
            divBtn.disabled = dis;
            sliderA.disabled = dis;
            fieldA.disabled = dis;
        }

        // ── Animation: ÷ a ───────────────────────────────────────────────
        function finishAnimIfAny() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            if (ghost) { ghost = null; state.unlocked = Math.min(8, state.unlocked + 1); setControlsDisabled(false); }
        }
        function startDivide() {
            if (ghost || state.unlocked >= 8) return;
            var fromIdx = state.unlocked - 1, toIdx = state.unlocked;
            var h0 = heightPx(EXPONENTS[fromIdx]), h1 = heightPx(EXPONENTS[toIdx]);
            var x0 = xCenter(fromIdx), x1 = xCenter(toIdx);
            var color1 = zoneColor(EXPONENTS[toIdx]);
            setControlsDisabled(true);
            var t0 = null, T_MS = 650;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
                var hNow = h0 + (h1 - h0) * e;
                ghost = {
                    x: x0 + (x1 - x0) * e,
                    h: hNow,
                    topY: baselineY - hNow,
                    color: color1,
                    opacity: 0.5 + 0.5 * e
                };
                drawStaircase();
                if (p < 1) {
                    animId = requestAnimationFrame(frame);
                } else {
                    animId = null; ghost = null;
                    state.unlocked = toIdx + 1;
                    setControlsDisabled(false);
                    update();
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Rita trappscenen ─────────────────────────────────────────────
        function drawStaircase() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);

            // "1"-referenslinje — a⁰ landar alltid exakt här, oavsett bas.
            var y1r = baselineY - H1;
            svg.appendChild(svgEl('line', {
                x1: L, y1: y1r, x2: W - MR, y2: y1r,
                stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 4'
            }));
            svg.appendChild(svgVarText(
                { x: L - 6, y: y1r + 4, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                ['1']));

            // Baslinjen (marknivå, v → 0)
            svg.appendChild(svgEl('line', {
                x1: L - 4, y1: baselineY, x2: W - MR, y2: baselineY,
                stroke: COL.axis, 'stroke-width': 1.6
            }));

            var nextIdx = state.unlocked < 8 ? state.unlocked : -1;

            for (var i = 0; i < 8; i++) {
                var n = EXPONENTS[i], cx = xCenter(i);
                if (i < state.unlocked) {
                    var v = valueAt(n), h = heightPx(n), topY = baselineY - h, color = zoneColor(n);
                    svg.appendChild(svgEl('rect', {
                        x: cx - barW / 2, y: topY, width: barW, height: Math.max(h, 1),
                        fill: color, opacity: 0.88, rx: 3
                    }));
                    var decimals = n < 0 ? 3 : 0;
                    var labelY = Math.max(topY - 10, 14);
                    svg.appendChild(svgVarText(
                        { x: cx, y: labelY, 'font-size': 12.5, 'text-anchor': 'middle', fill: color },
                        [fmt(v, decimals)]));
                    svg.appendChild(svgVarText(
                        { x: cx, y: baselineY + 22, 'font-size': 13, 'text-anchor': 'middle', fill: color },
                        [String(state.a) + supStr(n)]));
                } else {
                    var isNext = (i === nextIdx);
                    var boxH = isNext ? 30 : 16;
                    var tY = baselineY - boxH;
                    svg.appendChild(svgEl('rect', {
                        x: cx - barW / 2, y: tY, width: barW, height: boxH,
                        fill: COL.lockFill, stroke: isNext ? COL.zero : COL.lockStroke,
                        'stroke-width': isNext ? 1.6 : 1.2, 'stroke-dasharray': '4 3', rx: 3
                    }));
                    if (isNext) {
                        svg.appendChild(svgVarText(
                            { x: cx, y: tY + boxH / 2 + 4.5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.zero },
                            ['?']));
                        svg.appendChild(svgVarText(
                            { x: cx, y: tY - 10, 'font-size': 11, 'text-anchor': 'middle', fill: COL.zero },
                            ['÷ ' + state.a]));
                    }
                    svg.appendChild(svgVarText(
                        { x: cx, y: baselineY + 22, 'font-size': 13, 'text-anchor': 'middle', fill: COL.tick },
                        [String(state.a) + supStr(n)]));
                }
            }

            if (ghost) {
                svg.appendChild(svgEl('rect', {
                    x: ghost.x - barW / 2, y: ghost.topY, width: barW, height: Math.max(ghost.h, 1),
                    fill: ghost.color, opacity: ghost.opacity, rx: 3
                }));
            }
        }

        // ── Formelrad (KaTeX) ────────────────────────────────────────────
        function computeFormulaTex() {
            var a = state.a;
            if (state.step === 3) {
                var n3 = 3, denom = Math.pow(a, n3), val3 = 1 / denom;
                return a + '^{-' + n3 + '} = \\dfrac{1}{' + a + '^{' + n3 + '}}' +
                    ' = \\dfrac{1}{' + denom + '} = ' + fmtTex(val3, 3);
            }
            var idx = state.unlocked - 1;
            if (idx < 1) return '';
            var prevN = EXPONENTS[idx - 1], curN = EXPONENTS[idx];
            var curV = valueAt(curN);
            var left = a + '^{' + prevN + '}', right = a + '^{' + curN + '}';
            var tail;
            if (curN >= 0) {
                tail = ' = ' + fmtTex(curV, 0);
            } else {
                var d = Math.pow(a, -curN);
                tail = ' = \\dfrac{1}{' + a + '^{' + (-curN) + '}} = \\dfrac{1}{' + d + '} = ' + fmtTex(curV, 3);
            }
            return left + ' \\div ' + a + ' = ' + right + tail;
        }
        function updateFormula() {
            var tex = computeFormulaTex();
            if (!tex) { formel.innerHTML = ''; return; }
            katexInto(formel, tex);
        }

        // ── Notis (den kritiska "aha"-formuleringen) ──────────────────────
        function computeNoteHTML() {
            var idx = state.unlocked - 1;
            if (idx < 1) return '';
            var n = EXPONENTS[idx], a = state.a;
            if (n === 0) {
                return a + ' ÷ ' + a + ' = 1 — alltså MÅSTE ' + a +
                    '<sup>0</sup> vara 1!';
            }
            if (n === -1) {
                var v1 = 1 / a;
                return 'Mönstret fortsätter under ettan: ' + a + '<sup>−1</sup> = ' +
                    fmt(v1, 3) + ' (se bråkformen i raden ovan).';
            }
            if (n === -3) {
                var v3 = 1 / Math.pow(a, 3);
                return 'Sista steget: ' + a + '<sup>−3</sup> = ' + fmt(v3, 3) +
                    ' — trappan är klar! Prova gärna att byta bas i steg 3.';
            }
            return '';
        }
        function updateNote() { note.innerHTML = computeNoteHTML(); }

        // ── Visa/dölj + samlad omritning ──────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            divBtn.textContent = '÷ ' + state.a;
            divBtn.style.display = state.unlocked < 8 ? '' : 'none';
            drawStaircase();
            updateFormula();
            updateNote();
        }

        update();

        return {
            destroy: function () {
                if (animId != null) cancelAnimationFrame(animId);
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-1.6'] = api;
    window.VISUALISERINGAR['ma1c-1.7'] = api;
})();
