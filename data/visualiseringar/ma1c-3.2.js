/* ma1c-3.2.js — visualisering: "Faktorkedjan" (procentuella förändringar
 * multipliceras, inte adderas). Hör till ma1c-3.2 (förändringsfaktor) och
 * ma1c-3.3 (upprepade procentuella förändringar).
 *
 * Kärninsikt: en höjning med 20 % följd av en sänkning med 20 % ger INTE
 * tillbaka startvärdet — förändringsfaktorerna MULTIPLICERAS
 * (1,20 · 0,80 = 0,96, en minskning med 4 %), de adderas inte. Samma
 * multiplikativa princip gäller när samma faktor upprepas n gånger
 * (förändringsfaktor^n), som i genomgångens sparkonto-exempel
 * (80 000 kr, 2,5 % ränta, 18 år).
 *
 * Tre steg:
 *   1. Gissa först   — huvudfrågan (±20 %) med två svarsknappar; facit
 *                       (kedjan ×1,20 → ×0,80) läggs in och kvitteras.
 *   2. Bygg egna kedjor — fri kedjebyggnad (max 5 brickor) med
 *                       höjnings-/sänkningsknappar; total förändringsfaktor
 *                       och total procentuell förändring live (KaTeX,
 *                       färgkodad grön/röd).
 *   3. Upprepad förändring — en faktor (glidare, default 2,5 % som i
 *                       genomgångens sparkonto-exempel) upprepas n gånger
 *                       (glidare 1–20, default 18): stapelserie +
 *                       formeln nya värdet = startvärde · förändringsfaktor^n.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3/ma1c-2.5). API: window.VISUALISERINGAR['ma1c-3.2'/'ma1c-3.3']
 * = { mount(el) → { destroy() } }.
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

    // Fast två decimaler UTAN trimning — matchar genomgångens tabellstil
    // (1,05 / 1,27 / 2,40 / 0,96 / 0,75), bara för de fem fasta brickornas
    // förändringsfaktor (alltid exakt två decimaler).
    function fmtFactor2dp(v) {
        var s = v.toFixed(2);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    // Belopp med NBSP-tusentalsgrupper, för visning i scenen (SVG/HTML).
    function fmtKr(v, decimals) {
        var d = decimals == null ? 0 : decimals;
        var s = fmt(v, d);
        if (s === '0' || s === '–') return s;
        var neg = s.charAt(0) === '-';
        if (neg) s = s.slice(1);
        var parts = s.split(',');
        var grouped = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return (neg ? '−' : '') + grouped + (parts[1] !== undefined ? ',' + parts[1] : '');
    }
    // Belopp med \,-tusentalsgrupper, för KaTeX.
    function fmtTexMoney(v, decimals) {
        var d = decimals == null ? 0 : decimals;
        var s = fmt(v, d);
        if (s === '0' || s === '–') return s;
        var neg = s.charAt(0) === '-';
        if (neg) s = s.slice(1);
        var parts = s.split(',');
        var grouped = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
        return (neg ? '-' : '') + grouped + (parts[1] !== undefined ? '{,}' + parts[1] : '');
    }
    // Signerad procent för KaTeX ("+21", "−4", "0").
    function signPctTex(pct) {
        if (Math.abs(pct) < 0.005) return '0';
        return (pct > 0 ? '+' : '−') + fmtTex(Math.abs(pct), 2);
    }
    function totalFactor(list) {
        var t = 1;
        for (var i = 0; i < list.length; i++) t *= (1 + list[i] / 100);
        return t;
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
    function svgText(attrs, str) {
        var el = svgEl('text', attrs);
        el.textContent = str;
        return el;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }
    // Krymper formelns teckenstorlek (från baseSize och neråt) tills den
    // ryms i kortets bredd — annars klipps den tysta av overflow-x-scrollen
    // på smala skärmar (upptäckt vid 500 px-test). Mäter den renderade
    // KaTeX-spannens EGEN bredd (inte förälderns scrollWidth — den ljuger
    // vid `justify-content: center` + overflow, eftersom vänsterspill inte
    // räknas in). Körs EFTER att formeln fått innehåll och display satts
    // till synlig.
    function fitFormula(div, baseSize) {
        var size = baseSize;
        div.style.fontSize = size + 'px';
        var inner = div.firstElementChild;
        if (!inner) return;
        var avail = div.clientWidth;
        var tries = 0;
        while (inner.getBoundingClientRect().width > avail + 1 && size > 9 && tries < 14) {
            size -= 1;
            div.style.fontSize = size + 'px';
            tries++;
        }
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.4)',
        axis: '#1f2530',
        barFill: '#dbe7f7',
        gain: '#3f8f5c',
        gainFill: '#e1efe4',
        loss: '#c8324a',
        lossFill: '#f6d4d9'
    };
    function colorForPct(pct) {
        if (pct > 0.005) return COL.gain;
        if (pct < -0.005) return COL.loss;
        return COL.ink;
    }
    // Krympande teckenstorlek för formelraden ju fler faktorer som
    // multipliceras — förhindrar att den viktiga slutprocenten hamnar
    // utanför kortet (bortom overflow-x-scrollen) vid en full 5-bricke-kedja.
    function formulaFontSize(n) {
        if (n <= 2) return 16;
        if (n === 3) return 15;
        if (n === 4) return 13.5;
        return 12;
    }

    // ── Konstanter ──────────────────────────────────────────────────────
    var START1 = 1000;     // startbelopp för kedje-scenen (steg 1 & 2)
    var START3 = 80000;    // startbelopp för upprepnings-scenen (steg 3) —
                            // samma som genomgångens sparkonto-exempel
    var DEMO = [20, -20];  // gissa-först-facit: +20 % följt av −20 %
    var TILES = [20, -20, 50, -10, 5];
    var MAX_CHAIN = 5;

    // Kedje-scenen (steg 1 & 2)
    var CW = 560, CH = 380, CL = 46, CR = 16;
    var CPW = CW - CL - CR;
    var CTILEY = 22, CTILEH = 52, CGAP = 22;
    var CBARTOP = CTILEY + CTILEH + CGAP;
    var CB = 36;
    var CBASE = CH - CB;

    // Upprepnings-scenen (steg 3)
    var RW = 560, RH = 380, RL = 46, RR = 16, RT = 34, RB = 40;
    var RPW = RW - RL - RR;
    var RPH = RH - RT - RB;
    var RAXISY = RT + RPH;
    var RMAXBARH = RPH - 22;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            guessed: false,
            guess: null,       // 'same' | 'no'
            chain: [],          // fri kedja (steg 2), lista av procenttal
            pct3: 2.5,
            n3: 18
        };

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Faktorkedjan';
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
            viewBox: '0 0 ' + CW + ' ' + CH,
            width: CW, height: CH,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Kedja av staplar och faktor-brickor. Startbeloppet visas som en ' +
                'stapel längst till vänster; varje bricka multiplicerar beloppet med en ' +
                'förändringsfaktor och skapar en ny stapel till höger.'
        });
        svg.classList.add('lab-graf-svg');
        scene.appendChild(svg);

        var scene3 = document.createElement('div');
        scene3.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene3);

        var svg3 = svgEl('svg', {
            viewBox: '0 0 ' + RW + ' ' + RH,
            width: RW, height: RH,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Stapeldiagram som visar beloppet efter n upprepningar av samma ' +
                'förändringsfaktor. Dra i reglagen för procent och n för att se stapelserien ' +
                'växa eller krympa exponentiellt.'
        });
        svg3.classList.add('lab-graf-svg');
        scene3.appendChild(svg3);

        var guessActions = document.createElement('div');
        guessActions.className = 'lab-vis-actions';
        card.appendChild(guessActions);

        var guessAgainWrap = document.createElement('div');
        guessAgainWrap.className = 'lab-vis-actions';
        card.appendChild(guessAgainWrap);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formel = document.createElement('div');
        formel.className = 'lab-vis-formel';
        card.appendChild(formel);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var tileActions = document.createElement('div');
        tileActions.className = 'lab-vis-actions';
        card.appendChild(tileActions);

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
            { n: 1, label: '1 · Gissa först' },
            { n: 2, label: '2 · Bygg egna kedjor' },
            { n: 3, label: '3 · Upprepad förändring' }
        ];
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

        // ── Legend (steg 1 & 2) ──────────────────────────────────────────
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
        legend.appendChild(legendItem(COL.axis, 'belopp'));
        legend.appendChild(legendItem(COL.gain, 'höjning'));
        legend.appendChild(legendItem(COL.loss, 'sänkning'));

        // ── Gissa-först-knappar ───────────────────────────────────────────
        function makeGuessButton(text, key) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = text;
            b.addEventListener('click', function () {
                state.guessed = true;
                state.guess = key;
                update();
            });
            return b;
        }
        guessActions.appendChild(makeGuessButton('Ja, tillbaka på start', 'same'));
        guessActions.appendChild(makeGuessButton('Nej', 'no'));

        var guessAgainBtn = document.createElement('button');
        guessAgainBtn.type = 'button';
        guessAgainBtn.className = 'lab-graf-reset';
        guessAgainBtn.textContent = 'Gissa igen';
        guessAgainBtn.addEventListener('click', function () {
            state.guessed = false;
            state.guess = null;
            update();
        });
        guessAgainWrap.appendChild(guessAgainBtn);

        // ── Fri kedjebyggnad (steg 2) ─────────────────────────────────────
        function tileLabel(pct) {
            var sign = pct >= 0 ? '+' : '−';
            var pctTxt = sign + fmt(Math.abs(pct), 0) + ' %';
            var facTxt = '×' + fmtFactor2dp(1 + pct / 100);
            return pctTxt + ' · ' + facTxt;
        }
        var tileBtns = [];
        TILES.forEach(function (pct) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = tileLabel(pct);
            var gain = pct >= 0;
            b.style.borderColor = gain ? COL.gain : COL.loss;
            b.style.color = gain ? COL.gain : COL.loss;
            b.addEventListener('click', function () {
                if (state.chain.length >= MAX_CHAIN) return;
                state.chain.push(pct);
                update();
            });
            tileActions.appendChild(b);
            tileBtns.push(b);
        });
        var removeLastBtn = document.createElement('button');
        removeLastBtn.type = 'button';
        removeLastBtn.className = 'lab-btn lab-btn-quiet';
        removeLastBtn.textContent = 'Ta bort sista';
        removeLastBtn.addEventListener('click', function () {
            state.chain.pop();
            update();
        });
        tileActions.appendChild(removeLastBtn);

        var clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'lab-graf-reset';
        clearBtn.textContent = 'Rensa';
        clearBtn.addEventListener('click', function () {
            state.chain = [];
            update();
        });
        tileActions.appendChild(clearBtn);

        // ── Glidare (steg 3: procent p och antal n) ───────────────────────
        function makeRow(name, min, max, step, decimals, get, set) {
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
                slider.style.background = 'linear-gradient(to right, ' + COL.loss + ' 0%, ' +
                    COL.loss + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(clampNum(Math.round(v / step) * step, min, max));
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
        var rowP = makeRow('p', -20, 20, 0.5, 1,
            function () { return state.pct3; },
            function (v) { state.pct3 = v; });
        var rowN = makeRow('n', 1, 20, 1, 0,
            function () { return state.n3; },
            function (v) { state.n3 = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.chain = [];
            state.guessed = false;
            state.guess = null;
            state.pct3 = 2.5;
            state.n3 = 18;
            rowP.sync(); rowN.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Rita kedje-scenen (steg 1 & 2) ────────────────────────────────
        function drawChainScene(list) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var N = list.length;
            var values = [START1];
            var i;
            for (i = 0; i < N; i++) values.push(values[i] * (1 + list[i] / 100));
            var maxVal = Math.max.apply(null, values);
            var colW = CPW / (N + 1);
            var barWidth = Math.min(60, colW * 0.5);
            var tileWidth = Math.min(60, colW * 0.42);
            var barFont = barWidth < 45 ? 10 : 12;
            var tileFactorFont = tileWidth < 45 ? 11 : 13;
            var tilePctFont = tileWidth < 45 ? 9 : 10.5;
            var maxBarPixelH = CBASE - CBARTOP;
            var scale = maxVal > 0 ? maxBarPixelH / maxVal : 0;

            // Baslinje
            svg.appendChild(svgEl('line', {
                x1: CL - 6, y1: CBASE, x2: CL + CPW + 6, y2: CBASE,
                stroke: COL.dash, 'stroke-width': 1.2
            }));

            // Pilar mellan element (bakom staplar/brickor — kolliderar aldrig,
            // ligger i tile-bandet ovanför staplarnas maxhöjd)
            var connY = CTILEY + CTILEH / 2;
            function connector(x1, x2) {
                if (x2 - x1 < 4) return;
                svg.appendChild(svgEl('line', { x1: x1, y1: connY, x2: x2 - 5, y2: connY, stroke: COL.dash, 'stroke-width': 1.3 }));
                svg.appendChild(svgEl('polygon', {
                    points: x2 + ',' + connY + ' ' + (x2 - 6) + ',' + (connY - 3.5) + ' ' + (x2 - 6) + ',' + (connY + 3.5),
                    fill: COL.dash
                }));
            }
            for (i = 0; i < N; i++) {
                var barCx = CL + colW * (i + 0.5);
                var tileCx = CL + colW * (i + 1);
                var nextBarCx = CL + colW * (i + 1.5);
                connector(barCx + barWidth / 2, tileCx - tileWidth / 2);
                connector(tileCx + tileWidth / 2, nextBarCx - barWidth / 2);
            }

            // Staplar + värde-etiketter
            for (i = 0; i <= N; i++) {
                var cx = CL + colW * (i + 0.5);
                var h = Math.max(3, values[i] * scale);
                var y = CBASE - h;
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: y, width: barWidth, height: h,
                    fill: COL.barFill, stroke: COL.axis, 'stroke-width': 1.4, rx: 3
                }));
                svg.appendChild(svgText(
                    { x: cx, y: CBASE + 16, 'font-size': barFont, 'text-anchor': 'middle', fill: COL.axis },
                    fmtKr(values[i], 0) + ' kr'));
            }

            // Brickor (rita efter staplarna, ovanpå pilarna)
            for (i = 0; i < N; i++) {
                var pct = list[i];
                var tcx = CL + colW * (i + 1);
                var gain = pct >= 0;
                var fillC = gain ? COL.gainFill : COL.lossFill;
                var strokeC = gain ? COL.gain : COL.loss;
                svg.appendChild(svgEl('rect', {
                    x: tcx - tileWidth / 2, y: CTILEY, width: tileWidth, height: CTILEH, rx: 8,
                    fill: fillC, stroke: strokeC, 'stroke-width': 1.4
                }));
                svg.appendChild(svgText(
                    { x: tcx, y: CTILEY + 22, 'font-size': tileFactorFont, 'text-anchor': 'middle', fill: strokeC, 'font-weight': '600' },
                    '×' + fmtFactor2dp(1 + pct / 100)));
                svg.appendChild(svgText(
                    { x: tcx, y: CTILEY + 39, 'font-size': tilePctFont, 'text-anchor': 'middle', fill: strokeC },
                    (pct >= 0 ? '+' : '−') + fmt(Math.abs(pct), 0) + ' %'));
            }
        }

        // ── Rita upprepnings-scenen (steg 3) ──────────────────────────────
        function drawRepeat() {
            while (svg3.firstChild) svg3.removeChild(svg3.firstChild);
            var n = state.n3, factor = 1 + state.pct3 / 100;
            var values = [], i;
            for (i = 0; i <= n; i++) values.push(START3 * Math.pow(factor, i));
            var maxVal = Math.max.apply(null, values);
            var colW = RPW / (n + 1);
            var barWidth = Math.min(60, Math.max(6, colW * 0.7));
            var scale = maxVal > 0 ? RMAXBARH / maxVal : 0;
            var gain = state.pct3 > 0.005, loss = state.pct3 < -0.005;
            var hiCol = gain ? COL.gain : (loss ? COL.loss : COL.axis);
            var hiFill = gain ? COL.gainFill : (loss ? COL.lossFill : COL.barFill);

            // x-axel med pilspets
            svg3.appendChild(svgEl('line', { x1: RL - 6, y1: RAXISY, x2: RL + RPW + 6, y2: RAXISY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg3.appendChild(svgEl('polygon', {
                points: (RL + RPW + 16) + ',' + RAXISY + ' ' + (RL + RPW + 6) + ',' + (RAXISY - 4.5) + ' ' + (RL + RPW + 6) + ',' + (RAXISY + 4.5),
                fill: COL.axis
            }));
            svg3.appendChild(svgVarText(
                { x: RL + RPW + 16, y: RAXISY - 8, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis },
                ['*n']));

            // Tick-etiketter
            var ticks = [0, 5, 10, 15, 20].filter(function (v) { return v <= n; });
            if (ticks.indexOf(n) < 0) ticks.push(n);
            ticks.forEach(function (v) {
                var cx = RL + colW * (v + 0.5);
                svg3.appendChild(svgText(
                    { x: cx, y: RAXISY + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick },
                    String(v)));
            });

            // Staplar
            for (i = 0; i <= n; i++) {
                var cx = RL + colW * (i + 0.5);
                var h = Math.max(3, values[i] * scale);
                var y = RAXISY - h;
                var isLast = (i === n);
                svg3.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: y, width: barWidth, height: h,
                    fill: isLast ? hiFill : COL.barFill,
                    stroke: isLast ? hiCol : COL.axis,
                    'stroke-width': isLast ? 1.8 : 1, rx: 2
                }));
            }

            // Startvärde-etikett under bar 0 (om n > 0 — annars krockar den med
            // toppetiketten på samma stapel)
            if (n > 0) {
                var cx0 = RL + colW * 0.5;
                svg3.appendChild(svgText(
                    { x: cx0, y: RAXISY + 30, 'font-size': 11, 'text-anchor': 'middle', fill: COL.axis },
                    fmtKr(START3, 0) + ' kr'));
            }

            // Nuvarande värde ovanför sista stapeln (flyttas till 'end'-ankare
            // nära högerkanten så texten aldrig sticker ut ur viewBoxen)
            var lastCx = RL + colW * (n + 0.5);
            var lastH = Math.max(3, values[n] * scale);
            var lastY = Math.max(RT + 10, RAXISY - lastH - 8);
            var nearEdge = lastCx > (RW - 110);
            svg3.appendChild(svgText(
                {
                    x: nearEdge ? (RL + RPW - 2) : lastCx,
                    y: lastY,
                    'font-size': n >= 15 ? 10.5 : 12,
                    'text-anchor': nearEdge ? 'end' : 'middle',
                    fill: hiCol, 'font-weight': '600'
                },
                fmtKr(values[n], 0) + ' kr'));
        }

        // ── Instruktion, kvittering och tips per steg ─────────────────────
        function instrHTML() {
            if (state.step === 1) {
                return state.guessed
                    ? 'Så här blev det. Klicka <em>Gissa igen</em> för att göra om, eller gå ' +
                      'vidare till steg 2 och bygg egna kedjor.'
                    : 'Ett belopp på 1 000 kr höjs med 20 %, och sänks sedan med ' +
                      '20 %. Är beloppet <em>tillbaka på start</em> igen? Gissa innan du testar.';
            }
            if (state.step === 2) {
                return 'Bygg en egen kedja med knapparna nedan (max 5 brickor). Den ' +
                    '<em>totala förändringsfaktorn</em> är produkten av alla förändringsfaktorer ' +
                    'i kedjan — INTE deras summa.';
            }
            return 'Samma förändring upprepas <em>n</em> gånger — den totala förändringsfaktorn ' +
                'blir förändringsfaktorn upphöjd till <em>n</em>. Dra i reglagen: dubblas ' +
                'beloppet dubbelt så fort om procentsatsen fördubblas?';
        }

        function kvitteringHTML() {
            var total = totalFactor(DEMO);
            var finalVal = START1 * total;
            var pct = (total - 1) * 100;
            var guessedSame = state.guess === 'same';
            var lead = guessedSame
                ? 'Du gissade &quot;Ja, tillbaka på start&quot; — men så blev det inte.'
                : 'Du gissade &quot;Nej&quot; — och du hade rätt.';
            return lead + ' Beloppet blev <strong>' + fmtKr(finalVal, 0) + ' kr</strong>, ' +
                'inte ' + fmtKr(START1, 0) + ' kr. En ökning med 20 % följd av en ' +
                'minskning med 20 % ger INTE en förändring på 0 %, utan en minskning ' +
                'med ' + fmt(Math.abs(pct), 2) + ' %.';
        }

        function updateNote() {
            if (state.step === 1) {
                note.style.color = '';
                note.innerHTML = state.guessed ? kvitteringHTML() : '';
            } else if (state.step === 2) {
                note.style.color = COL.inkSoft;
                note.innerHTML = 'Till exempel: två höjningar på 10 % ger tillsammans en ' +
                    'total förändringsfaktor på <span style="white-space:nowrap">1,10 · 1,10 ' +
                    '= 1,21</span> — en ökning med 21 %, inte 20 %.';
            } else {
                note.style.color = COL.inkSoft;
                note.innerHTML = 'Märk att en dubbelt så hög procentsats INTE ger en dubbelt så ' +
                    'stor ökning efter samma antal steg — förändringen växer exponentiellt ' +
                    '(upphöjt till <em>n</em>), inte proportionellt mot procentsatsen.';
            }
        }

        function updateFormula() {
            if (state.step === 1) {
                if (state.guessed) {
                    var partsD = DEMO.map(function (p) { return fmtFactor2dp(1 + p / 100); });
                    var totalD = totalFactor(DEMO);
                    var pctD = (totalD - 1) * 100;
                    katexInto(formel, '\\text{total förändringsfaktor} = ' + partsD.join(' \\cdot ') +
                        ' = ' + fmtTex(totalD, 4) + ' \\;\\Longrightarrow\\; ' + signPctTex(pctD) + '\\ \\%');
                    formel.style.color = colorForPct(pctD);
                    formel.style.display = '';
                    fitFormula(formel, formulaFontSize(DEMO.length));
                } else {
                    formel.style.display = 'none';
                }
            } else if (state.step === 2) {
                if (state.chain.length >= 1) {
                    var parts2 = state.chain.map(function (p) { return fmtFactor2dp(1 + p / 100); });
                    var total2 = totalFactor(state.chain);
                    var pct2 = (total2 - 1) * 100;
                    katexInto(formel, '\\text{total förändringsfaktor} = ' + parts2.join(' \\cdot ') +
                        ' = ' + fmtTex(total2, 4) + ' \\;\\Longrightarrow\\; ' + signPctTex(pct2) + '\\ \\%');
                    formel.style.color = colorForPct(pct2);
                    formel.style.display = '';
                    fitFormula(formel, formulaFontSize(state.chain.length));
                } else {
                    formel.style.display = 'none';
                }
            } else {
                var factor3 = 1 + state.pct3 / 100;
                var val3 = START3 * Math.pow(factor3, state.n3);
                katexInto(formel, '\\text{nya värdet} = \\text{startvärde} \\cdot ' +
                    '\\text{förändringsfaktor}^n = ' + fmtTexMoney(START3) + ' \\cdot ' +
                    fmtTex(factor3, 4) + '^{' + state.n3 + '} = ' + fmtTexMoney(val3, 0) + '\\ \\text{kr}');
                formel.style.color = colorForPct(state.pct3);
                formel.style.display = '';
                fitFormula(formel, 16);
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = instrHTML();

            scene.style.display = (state.step === 1 || state.step === 2) ? '' : 'none';
            scene3.style.display = state.step === 3 ? '' : 'none';
            legend.style.display = (state.step === 1 || state.step === 2) ? '' : 'none';
            guessActions.style.display = (state.step === 1 && !state.guessed) ? '' : 'none';
            guessAgainWrap.style.display = (state.step === 1 && state.guessed) ? '' : 'none';
            tileActions.style.display = state.step === 2 ? '' : 'none';
            controls.style.display = state.step === 3 ? '' : 'none';

            if (state.step === 1) drawChainScene(state.guessed ? DEMO : []);
            else if (state.step === 2) drawChainScene(state.chain);
            else drawRepeat();

            updateFormula();
            updateNote();

            var full = state.chain.length >= MAX_CHAIN;
            tileBtns.forEach(function (b) {
                b.disabled = full;
                b.style.opacity = full ? 0.4 : '';
                b.style.cursor = full ? 'not-allowed' : 'pointer';
            });
            var chainEmpty = state.chain.length === 0;
            removeLastBtn.disabled = chainEmpty;
            removeLastBtn.style.opacity = chainEmpty ? 0.4 : '';
            removeLastBtn.style.cursor = chainEmpty ? 'not-allowed' : 'pointer';
            clearBtn.disabled = chainEmpty;
            clearBtn.style.opacity = chainEmpty ? 0.4 : '';
            clearBtn.style.cursor = chainEmpty ? 'not-allowed' : 'pointer';
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
    window.VISUALISERINGAR['ma1c-3.2'] = api;
    window.VISUALISERINGAR['ma1c-3.3'] = api;
})();
