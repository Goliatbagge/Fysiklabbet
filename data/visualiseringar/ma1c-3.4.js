/* ma1c-3.4.js — visualisering: "Ränta på ränta: sparande och lån". Hör till
 * ma1c-3.4 (Sparande och ränteberäkningar) och ma1c-3.5 (Lån och
 * ränteberäkningar).
 *
 * Fyra steg:
 *   1. Engångsinsättning  — ett belopp växer med samma förändringsfaktor
 *                            varje år (staplar per år). Varje stapel delas
 *                            i en blå del (vad du hade fått med enkel,
 *                            icke sammansatt ränta) och en grön del (extra
 *                            från ränta på ränta). Startläge = Exempel 1a
 *                            i ma1c-3.4 (30 000 kr, 3,5 %, 8 år →
 *                            39 504,27 kr).
 *   2. Dubbla räntan       — gissa-först: fördubblas avkastningen (räntan
 *                            du tjänar) om räntesatsen fördubblas? Svar:
 *                            nej, den blir MER än dubbelt (ränta-på-ränta-
 *                            effekten — bevisbart för alla n ≥ 2).
 *   3. Årligt sparande     — samma belopp sätts in varje år. Staplar visar
 *                            hur mycket du själv satt in (trappstegen);
 *                            en kurva ovanpå staplarna visar den verkliga
 *                            behållningen. Startläge = Exempel 2 i
 *                            ma1c-3.4 (5 000 kr/år, 2,8 %, 10 insättningar
 *                            → 56 794,24 kr).
 *   4. Lån och amortering  — rak amortering: skulden minskar LINJÄRT
 *                            (samma amorteringsbelopp varje månad), men
 *                            räntan krymper i takt med skulden. Startläge
 *                            = Exempel 1 i ma1c-3.5 (Billånet: 150 000 kr,
 *                            5 år, 4,8 % → 168 300 kr totalt, varav
 *                            18 300 kr ränta).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3/ma1c-3.2). API: window.VISUALISERINGAR['ma1c-3.4'/'ma1c-3.5']
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
        return s.replace('.', ',');
    }
    function fmtTrim(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // Belopp med tusentalsgrupper + "kr", för scenen (SVG/HTML).
    function fmtKr(v, decimals) {
        var d = decimals == null ? 0 : decimals;
        var s = fmt(v, d);
        if (s === '0' || s === '–') return s;
        var neg = s.charAt(0) === '-';
        if (neg) s = s.slice(1);
        var parts = s.split(',');
        var grouped = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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
    // Krymper formelns teckenstorlek tills den ryms i kortets bredd.
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
    // Väljer säker text-anchor/x så att en etikett ovanför en stapel aldrig
    // sticker ut genom viewBox-kanterna.
    function safeLabel(cx, W, margin) {
        var m = margin == null ? 8 : margin;
        if (cx > W - 74) return { anchor: 'end', x: W - m };
        if (cx < 74) return { anchor: 'start', x: m };
        return { anchor: 'middle', x: cx };
    }
    function niceStep(maxVal, targetTicks) {
        if (maxVal <= 0) return 1;
        var raw = maxVal / targetTicks;
        var mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
        var norm = raw / mag;
        var step;
        if (norm < 1.5) step = 1;
        else if (norm < 3) step = 2;
        else if (norm < 7) step = 5;
        else step = 10;
        return step * mag;
    }
    function niceScale(maxVal, targetTicks) {
        if (maxVal <= 0) maxVal = 1;
        var step = niceStep(maxVal, targetTicks);
        var top = Math.ceil(maxVal / step) * step;
        if (top - maxVal < step * 0.12) top += step;
        return { step: step, max: top };
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        tick: '#5b6472',
        axis: '#1f2530',
        dash: 'rgba(31,37,48,0.42)',
        grid: 'rgba(31,37,48,0.09)',
        principalFill: '#dbe7f7',
        principal: '#2f5fa8',
        curve: '#2563c9',
        gain: '#3f8f5c',
        gainFill: '#cfe8d7',
        loss: '#c8324a',
        lossFill: '#f6d4d9',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── Finansmatematik (verifierad mot genomgångens tabeller) ────────────
    function compoundValue(K0, pPct, t) { return K0 * Math.pow(1 + pPct / 100, t); }
    function linearValue(K0, pPct, t) { return K0 * (1 + t * pPct / 100); }
    // Exakt samma rekursion som cellformeln i ma1c-3.4 Exempel 2:
    // B(1) = insättning; B(k) = B(k-1) · förändringsfaktor + insättning.
    function savingsSeries(dep, pPct, n) {
        var vals = [], factor = 1 + pPct / 100, prev = 0;
        for (var k = 1; k <= n; k++) {
            var v = k === 1 ? dep : prev * factor + dep;
            vals.push(v);
            prev = v;
        }
        return vals;
    }
    // Rak amortering: samma amorteringsbelopp varje månad, ränta räknas på
    // kvarvarande skuld — exakt samma modell som cellformlerna i ma1c-3.5
    // Exempel 1.
    function loanSchedule(loan, pPct, years) {
        var months = years * 12;
        var amort = loan / months;
        var rows = [], skuld = loan, totalRanta = 0, totalPaid = 0;
        for (var k = 1; k <= months; k++) {
            var ranta = skuld * (pPct / 100) / 12;
            var inbet = amort + ranta;
            rows.push({ month: k, skuld: skuld, ranta: ranta, inbet: inbet });
            totalRanta += ranta;
            totalPaid += inbet;
            skuld -= amort;
        }
        return { amort: amort, months: months, rows: rows, totalRanta: totalRanta, totalPaid: totalPaid };
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            // Steg 1 & 2 (delade glidare) — Exempel 1a i ma1c-3.4
            K0: 30000, p: 3.5, n: 8,
            guessed: false, guess: null,
            // Steg 3 — Exempel 2 i ma1c-3.4
            dep: 5000, p3: 2.8, n3: 10,
            // Steg 4 — Exempel 1 i ma1c-3.5 (Billånet)
            loan: 150000, p4: 4.8, years4: 5
        };

        var W = 560;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Ränta på ränta: sparande och lån';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        function makeScene(H, ariaLabel) {
            var scene = document.createElement('div');
            scene.className = 'lab-graf-scene lab-vis-scene';
            var svg = svgEl('svg', {
                viewBox: '0 0 ' + W + ' ' + H,
                width: W, height: H,
                'font-family': 'DM Sans, system-ui, sans-serif',
                role: 'img',
                'aria-label': ariaLabel
            });
            svg.classList.add('lab-graf-svg');
            scene.appendChild(svg);
            card.appendChild(scene);
            return { scene: scene, svg: svg };
        }

        var H1 = 360, L1 = 62, R1 = 16, T1 = 18, B1 = 40;
        var g1 = { L: L1, R: R1, T: T1, B: B1, PW: W - L1 - R1, PH: H1 - T1 - B1, W: W, H: H1 };
        var s1 = makeScene(H1, 'Stapeldiagram: behållningen på ett sparkonto växer år för år. ' +
            'Varje stapel delas i en blå del (utan ränta på ränta) och en grön del (extra ' +
            'från ränta på ränta).');

        var H2 = 300, L2 = 62, R2 = 16, T2 = 20, B2 = 54;
        var g2 = { L: L2, R: R2, T: T2, B: B2, PW: W - L2 - R2, PH: H2 - T2 - B2, W: W, H: H2 };
        var s2 = makeScene(H2, 'Jämförelse mellan behållningen vid ursprunglig räntesats och vid ' +
            'dubbla räntesatsen, efter att du gissat om avkastningen fördubblas.');

        var guessActions = document.createElement('div');
        guessActions.className = 'lab-vis-actions';
        card.appendChild(guessActions);

        var guessAgainWrap = document.createElement('div');
        guessAgainWrap.className = 'lab-vis-actions';
        card.appendChild(guessAgainWrap);

        var H3 = 380, L3 = 62, R3 = 16, T3 = 18, B3 = 40;
        var g3 = { L: L3, R: R3, T: T3, B: B3, PW: W - L3 - R3, PH: H3 - T3 - B3, W: W, H: H3 };
        var s3 = makeScene(H3, 'Stapeldiagram: staplarna visar hur mycket kapital du själv satt ' +
            'in hittills. En kurva ovanpå staplarna visar den verkliga behållningen — gapet ' +
            'mellan dem är räntedelen.');

        var H4a = 260, L4a = 62, R4a = 16, T4a = 18, B4a = 36;
        var g4a = { L: L4a, R: R4a, T: T4a, B: B4a, PW: W - L4a - R4a, PH: H4a - T4a - B4a, W: W, H: H4a };
        var s4a = makeScene(H4a, 'Stapeldiagram: varje stapel är ett års inbetalningar på lånet, ' +
            'uppdelat i amortering och ränta. Räntedelen krymper år för år.');

        var H4b = 210, L4b = 62, R4b = 16, T4b = 16, B4b = 32;
        var g4b = { L: L4b, R: R4b, T: T4b, B: B4b, PW: W - L4b - R4b, PH: H4b - T4b - B4b, W: W, H: H4b };
        var s4b = makeScene(H4b, 'Linjediagram: den kvarvarande skulden minskar rakt linjärt över ' +
            'åren, eftersom amorteringen är lika stor varje månad.');

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        card.appendChild(formelB);

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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Engångsinsättning' },
            { n: 2, label: '2 · Dubbla räntan' },
            { n: 3, label: '3 · Årligt sparande' },
            { n: 4, label: '4 · Lån och amortering' }
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

        // ── Legend (byggs om per steg) ────────────────────────────────────
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
        function setLegend(items) {
            legend.innerHTML = '';
            items.forEach(function (it) { legend.appendChild(legendItem(it[0], it[1])); });
        }

        // ── Gissa-först-knappar (steg 2) ──────────────────────────────────
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
        guessActions.appendChild(makeGuessButton('Ja, den fördubblas', 'double'));
        guessActions.appendChild(makeGuessButton('Nej, mer eller mindre', 'no'));

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

        // ── Glidare ───────────────────────────────────────────────────────
        function makeRow(name, min, max, step, decimals, get, set, wide) {
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
            // Kronbelopp kan bli upp till 6 siffror (t.ex. 150000) — den
            // delade klassen .lab-graf-num är bara 72px bred, för smal för
            // så många siffror plus number-inputens spinnerpilar (sista
            // siffran klipptes annars bort). Bredda enbart dessa fält
            // inline, utan att röra den delade CSS-klassen.
            if (wide) field.style.width = '92px';
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
                row: row,
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }

        var rowK0 = makeRow('insatt belopp', 5000, 100000, 5000, 0,
            function () { return state.K0; }, function (v) { state.K0 = v; }, true);
        var rowP = makeRow('räntesats', 0, 10, 0.1, 1,
            function () { return state.p; }, function (v) { state.p = v; });
        var rowN = makeRow('antal år', 0, 20, 1, 0,
            function () { return state.n; }, function (v) { state.n = v; });

        var rowDep = makeRow('insättning', 500, 20000, 500, 0,
            function () { return state.dep; }, function (v) { state.dep = v; }, true);
        var rowP3 = makeRow('räntesats', 0, 10, 0.1, 1,
            function () { return state.p3; }, function (v) { state.p3 = v; });
        var rowN3 = makeRow('antal insättningar', 1, 30, 1, 0,
            function () { return state.n3; }, function (v) { state.n3 = v; });

        var rowLoan = makeRow('lånebelopp', 20000, 400000, 10000, 0,
            function () { return state.loan; }, function (v) { state.loan = v; }, true);
        var rowP4 = makeRow('räntesats', 0, 12, 0.1, 1,
            function () { return state.p4; }, function (v) { state.p4 = v; });
        var rowYears4 = makeRow('amorteringstid (år)', 1, 10, 1, 0,
            function () { return state.years4; }, function (v) { state.years4 = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.K0 = 30000; state.p = 3.5; state.n = 8;
            state.guessed = false; state.guess = null;
            state.dep = 5000; state.p3 = 2.8; state.n3 = 10;
            state.loan = 150000; state.p4 = 4.8; state.years4 = 5;
            rowK0.sync(); rowP.sync(); rowN.sync();
            rowDep.sync(); rowP3.sync(); rowN3.sync();
            rowLoan.sync(); rowP4.sync(); rowYears4.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Baslinje-helper (kategoriska stapeldiagram) ───────────────────
        function drawBaseline(svg, geom) {
            var axisY = geom.T + geom.PH;
            svg.appendChild(svgEl('line', {
                x1: geom.L - 6, y1: axisY, x2: geom.L + geom.PW + 6, y2: axisY,
                stroke: COL.dash, 'stroke-width': 1.3
            }));
            return axisY;
        }

        // ── Steg 1: Engångsinsättning ──────────────────────────────────────
        function drawStep1() {
            var svg = s1.svg;
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var K0 = state.K0, p = state.p, n = state.n;
            var N = n + 1; // staplar för år 0..n
            var vals = [];
            for (var t = 0; t <= n; t++) {
                vals.push({ t: t, comp: compoundValue(K0, p, t), lin: linearValue(K0, p, t) });
            }
            var maxVal = 0;
            vals.forEach(function (v) { if (v.comp > maxVal) maxVal = v.comp; });
            var axisY = drawBaseline(svg, g1);
            var colW = g1.PW / N;
            var barWidth = Math.min(52, Math.max(6, colW * 0.6));
            var maxBarH = g1.PH - 26;
            var scale = maxVal > 0 ? maxBarH / maxVal : 0;

            vals.forEach(function (v, i) {
                var cx = g1.L + colW * (i + 0.5);
                var hComp = Math.max(2, v.comp * scale);
                var hLin = Math.max(0, v.lin * scale);
                var yComp = axisY - hComp;
                var yLin = axisY - hLin;
                // Blå del: enkel ränta (utan ränta-på-ränta)
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yLin, width: barWidth, height: Math.max(0, axisY - yLin),
                    fill: COL.principalFill, stroke: COL.principal, 'stroke-width': 1.2
                }));
                // Grön del: extra från ränta på ränta
                if (hComp - hLin > 0.6) {
                    svg.appendChild(svgEl('rect', {
                        x: cx - barWidth / 2, y: yComp, width: barWidth, height: Math.max(0, yLin - yComp),
                        fill: COL.gainFill, stroke: COL.gain, 'stroke-width': 1.2
                    }));
                }
                // x-tick (årtal) — hoppa över var annan om många staplar
                var showTick = N <= 12 || i % Math.ceil(N / 10) === 0 || i === vals.length - 1;
                if (showTick) {
                    svg.appendChild(svgText(
                        { x: cx, y: axisY + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick },
                        String(v.t)));
                }
                // Etikett endast på år 0 och sista året
                if (i === 0 || i === vals.length - 1) {
                    var lab = safeLabel(cx, g1.W);
                    svg.appendChild(svgText(
                        { x: lab.x, y: yComp - 8, 'font-size': 11, 'text-anchor': lab.anchor, fill: COL.ink, 'font-weight': '600' },
                        fmtKr(v.comp, 0) + ' kr'));
                }
            });
            svg.appendChild(svgVarText(
                { x: g1.L + g1.PW, y: axisY + 30, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.tick },
                ['år']));
        }

        // ── Steg 2: Dubbla räntan (gissa-först) ────────────────────────────
        function drawStep2() {
            var svg = s2.svg;
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var K0 = state.K0, p = state.p, n = state.n;
            var totalP = compoundValue(K0, p, n);
            var avkP = totalP - K0;
            var totalP2 = compoundValue(K0, 2 * p, n);
            var avk2P = totalP2 - K0;
            var axisY = drawBaseline(svg, g2);
            var cx1 = g2.L + g2.PW * 0.27;
            var cx2 = g2.L + g2.PW * 0.73;
            var barWidth = 96;
            var maxVal = state.guessed ? Math.max(totalP, totalP2) : totalP * 1.15;
            var maxBarH = g2.PH - 30;
            var scale = maxVal > 0 ? maxBarH / maxVal : 0;

            function stackedBar(cx, totalK, avk, label) {
                var hTot = Math.max(2, totalK * scale);
                var hBase = Math.max(0, K0 * scale);
                var yTot = axisY - hTot;
                var yBase = axisY - hBase;
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yBase, width: barWidth, height: Math.max(0, axisY - yBase),
                    fill: COL.principalFill, stroke: COL.principal, 'stroke-width': 1.3
                }));
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yTot, width: barWidth, height: Math.max(0, yBase - yTot),
                    fill: COL.gainFill, stroke: COL.gain, 'stroke-width': 1.3
                }));
                svg.appendChild(svgText(
                    { x: cx, y: yTot - 9, 'font-size': 12, 'text-anchor': 'middle', fill: COL.ink, 'font-weight': '600' },
                    fmtKr(totalK, 0) + ' kr'));
                svg.appendChild(svgText(
                    { x: cx, y: axisY + 18, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tick },
                    label));
            }

            stackedBar(cx1, totalP, avkP, fmtTrim(p, 1) + ' %');

            if (!state.guessed) {
                // Dold placeholder tills eleven gissat
                var hRef = Math.max(2, totalP * scale);
                svg.appendChild(svgEl('rect', {
                    x: cx2 - barWidth / 2, y: axisY - hRef, width: barWidth, height: hRef,
                    fill: 'none', stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
                svg.appendChild(svgText(
                    { x: cx2, y: axisY - hRef / 2 + 6, 'font-size': 22, 'text-anchor': 'middle', fill: COL.inkSoft, 'font-weight': '600' },
                    '?'));
                svg.appendChild(svgText(
                    { x: cx2, y: axisY + 18, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tick },
                    fmtTrim(2 * p, 1) + ' %'));
            } else {
                stackedBar(cx2, totalP2, avk2P, fmtTrim(2 * p, 1) + ' %');
                // Referenslinje: "om avkastningen bara fördubblades". Ligger
                // alltid ovanför vänstra stapelns topp (bevisbart: naiveTotal
                // = totalP + avkP > totalP), men gapet krymper mot 0 när
                // avkP är litet (t.ex. n = 1) — då skulle etiketten kollidera
                // med vänstra stapelns eget värde-label. Visa den bara när
                // gapet ger tillräcklig frigång.
                var naiveTotal = K0 + 2 * avkP;
                var yNaive = axisY - Math.max(0, naiveTotal * scale);
                var yTotA = axisY - Math.max(2, totalP * scale);
                if (yTotA - yNaive > 22) {
                    svg.appendChild(svgEl('line', {
                        x1: g2.L, y1: yNaive, x2: g2.L + g2.PW, y2: yNaive,
                        stroke: COL.loss, 'stroke-width': 1.3, 'stroke-dasharray': '6 4'
                    }));
                    // Etiketten läggs vänsterställd ovanför den kortare
                    // vänstra stapeln (aldrig den högra), eftersom
                    // referenslinjen alltid ligger ovanför vänstra stapeln
                    // men kan ligga nära eller inuti den högra.
                    svg.appendChild(svgText(
                        { x: g2.L + 2, y: Math.max(g2.T + 10, yNaive - 6), 'font-size': 10, 'text-anchor': 'start', fill: COL.loss },
                        'om avkastningen bara dubblades'));
                }
            }
        }

        // ── Steg 3: Årligt sparande ────────────────────────────────────────
        function drawStep3() {
            var svg = s3.svg;
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var dep = state.dep, p3 = state.p3, n3 = state.n3;
            var vals = savingsSeries(dep, p3, n3);
            var maxVal = vals[vals.length - 1];
            var axisY = drawBaseline(svg, g3);
            var colW = g3.PW / n3;
            var barWidth = Math.min(40, Math.max(5, colW * 0.55));
            var maxBarH = g3.PH - 30;
            var scale = maxVal > 0 ? maxBarH / maxVal : 0;

            var pts = [];
            for (var k = 1; k <= n3; k++) {
                var i = k - 1;
                var behall = vals[i];
                var insatt = dep * k;
                var cx = g3.L + colW * (i + 0.5);
                var hBehall = Math.max(2, behall * scale);
                var hInsatt = Math.max(0, insatt * scale);
                var yBehall = axisY - hBehall;
                var yInsatt = axisY - hInsatt;
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yInsatt, width: barWidth, height: Math.max(0, axisY - yInsatt),
                    fill: COL.principalFill, stroke: COL.principal, 'stroke-width': 1.1
                }));
                if (hBehall - hInsatt > 0.6) {
                    svg.appendChild(svgEl('rect', {
                        x: cx - barWidth / 2, y: yBehall, width: barWidth, height: Math.max(0, yInsatt - yBehall),
                        fill: COL.gainFill, stroke: COL.gain, 'stroke-width': 1.1
                    }));
                }
                pts.push({ x: cx, y: yBehall });
                var showTick = n3 <= 12 || i % Math.ceil(n3 / 10) === 0 || i === n3 - 1;
                if (showTick) {
                    svg.appendChild(svgText(
                        { x: cx, y: axisY + 15, 'font-size': 10, 'text-anchor': 'middle', fill: COL.tick },
                        String(k)));
                }
            }
            // Kurva ovanpå bar-topparna (behållningens tillväxt)
            var d = pts.map(function (pt, i) { return (i === 0 ? 'M' : 'L') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1); }).join(' ');
            svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
            pts.forEach(function (pt, i) {
                svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: i === pts.length - 1 ? 3.6 : 2.4, fill: COL.curve }));
            });
            var last = pts[pts.length - 1];
            var lab = safeLabel(last.x, g3.W);
            svg.appendChild(svgText(
                { x: lab.x, y: last.y - 10, 'font-size': 11.5, 'text-anchor': lab.anchor, fill: COL.curve, 'font-weight': '600' },
                fmtKr(vals[vals.length - 1], 0) + ' kr'));
            svg.appendChild(svgVarText(
                { x: g3.L + g3.PW, y: axisY + 30, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.tick },
                ['insättning nr']));
        }

        // ── Steg 4a: betalningar per år (amortering + ränta) ──────────────
        function drawStep4a(sched) {
            var svg = s4a.svg;
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var years4 = state.years4;
            var amortYear = sched.amort * 12;
            var rantaYear = [];
            for (var y = 1; y <= years4; y++) {
                var sum = 0;
                for (var m = (y - 1) * 12; m < y * 12; m++) sum += sched.rows[m].ranta;
                rantaYear.push(sum);
            }
            var maxVal = amortYear + rantaYear[0];
            var axisY = drawBaseline(svg, g4a);
            var colW = g4a.PW / years4;
            var barWidth = Math.min(64, Math.max(8, colW * 0.55));
            var maxBarH = g4a.PH - 26;
            var scale = maxVal > 0 ? maxBarH / maxVal : 0;

            for (var yy = 1; yy <= years4; yy++) {
                var idx = yy - 1;
                var totYear = amortYear + rantaYear[idx];
                var cx = g4a.L + colW * (idx + 0.5);
                var hTot = Math.max(2, totYear * scale);
                var hAmort = Math.max(0, amortYear * scale);
                var yTot = axisY - hTot;
                var yAmort = axisY - hAmort;
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yAmort, width: barWidth, height: Math.max(0, axisY - yAmort),
                    fill: COL.principalFill, stroke: COL.principal, 'stroke-width': 1.2
                }));
                svg.appendChild(svgEl('rect', {
                    x: cx - barWidth / 2, y: yTot, width: barWidth, height: Math.max(0, yAmort - yTot),
                    fill: COL.lossFill, stroke: COL.loss, 'stroke-width': 1.2
                }));
                svg.appendChild(svgText(
                    { x: cx, y: axisY + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick },
                    String(yy)));
                if (idx === 0 || idx === years4 - 1) {
                    var lab = safeLabel(cx, g4a.W);
                    svg.appendChild(svgText(
                        { x: lab.x, y: yTot - 8, 'font-size': 10.5, 'text-anchor': lab.anchor, fill: COL.ink, 'font-weight': '600' },
                        fmtKr(totYear, 0) + ' kr'));
                }
            }
            svg.appendChild(svgVarText(
                { x: g4a.L + g4a.PW, y: axisY + 30, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.tick },
                ['år']));
        }

        // ── Steg 4b: kvarvarande skuld (linjär nedgång) ────────────────────
        function drawStep4b(sched) {
            var svg = s4b.svg;
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var years4 = state.years4, loan = state.loan;
            var scaleInfo = niceScale(loan, 4);
            var axisY = g4b.T + g4b.PH;
            var axisX = g4b.L;

            // Gridlinjer + y-etiketter
            for (var v = 0; v <= scaleInfo.max + 1e-6; v += scaleInfo.step) {
                var y = axisY - (v / scaleInfo.max) * g4b.PH;
                svg.appendChild(svgEl('line', { x1: g4b.L, y1: y, x2: g4b.L + g4b.PW, y2: y, stroke: COL.grid, 'stroke-width': 1 }));
                if (v > 0) {
                    svg.appendChild(svgText(
                        { x: g4b.L - 8, y: y + 3.5, 'font-size': 10, 'text-anchor': 'end', fill: COL.tick },
                        fmtKr(v, 0)));
                }
            }
            // Axlar
            svg.appendChild(svgEl('line', { x1: g4b.L - 6, y1: axisY, x2: g4b.L + g4b.PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.5 }));
            svg.appendChild(svgEl('polygon', { points: (g4b.L + g4b.PW + 14) + ',' + axisY + ' ' + (g4b.L + g4b.PW + 4) + ',' + (axisY - 4) + ' ' + (g4b.L + g4b.PW + 4) + ',' + (axisY + 4), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: axisY, x2: axisX, y2: g4b.T - 4, stroke: COL.axis, 'stroke-width': 1.5 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (g4b.T - 12) + ' ' + (axisX - 4) + ',' + (g4b.T - 2) + ' ' + (axisX + 4) + ',' + (g4b.T - 2), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: g4b.L + g4b.PW + 14, y: axisY - 9, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.axis }, ['år']));
            svg.appendChild(svgText({ x: axisX + 8, y: g4b.T + 4, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.axis }, 'skuld (kr)'));

            // Reservera lite luft i högerkanten (PWeff) så den sista
            // årsprickens tick-etikett aldrig kolliderar med "år"-etiketten
            // vid pilspetsen.
            var PWeff = g4b.PW - 20;
            var pts = [];
            for (var yy = 0; yy <= years4; yy++) {
                var skuld = Math.max(0, loan - sched.amort * 12 * yy);
                var cx = g4b.L + (yy / years4) * PWeff;
                var cy = axisY - (skuld / scaleInfo.max) * g4b.PH;
                pts.push({ x: cx, y: cy, v: skuld, yy: yy });
            }
            var d = pts.map(function (pt, i) { return (i === 0 ? 'M' : 'L') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1); }).join(' ');
            svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: COL.loss, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
            pts.forEach(function (pt) {
                svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 3, fill: COL.loss }));
                var showTick = years4 <= 10;
                if (showTick) {
                    svg.appendChild(svgText(
                        { x: pt.x, y: axisY + 15, 'font-size': 9.5, 'text-anchor': 'middle', fill: COL.tick },
                        String(pt.yy)));
                }
            });
        }

        // ── Instruktioner, formler och kommentarer per steg ────────────────
        function instrHTML() {
            if (state.step === 1) {
                return 'Ett engångsbelopp sätts in på ett sparkonto. Varje år växer ' +
                    '<em>behållningen</em> med samma <em>förändringsfaktor</em> — det kallas ' +
                    'ränta på ränta. Den blå delen av stapeln visar vad du hade fått med enkel ' +
                    'ränta (ingen ränta-på-ränta-effekt); den gröna delen är det extra.';
            }
            if (state.step === 2) {
                return state.guessed
                    ? 'Så här blev det. Klicka <em>Gissa igen</em> för att prova andra värden ' +
                      '(ändra räntesats eller antal år i steg 1), eller gå vidare till steg 3.'
                    : 'Samma sparkonto, men räntesatsen fördubblas — från <em>' + fmtTrim(state.p, 1) +
                      ' %</em> till <em>' + fmtTrim(2 * state.p, 1) + ' %</em>. Fördubblas då ' +
                      'avkastningen (räntan du tjänar) efter <em>' + state.n + '</em> år? Gissa innan du testar.';
            }
            if (state.step === 3) {
                return 'Du sätter in samma <em>insättning</em> varje år. Staplarna visar hur ' +
                    'mycket kapital du själv satt in hittills (trappstegen); kurvan ovanpå visar ' +
                    'den verkliga <em>behållningen</em>. Gapet mellan dem är <em>räntedelen</em> — ' +
                    'pengar du fått "gratis" genom ränta på ränta.';
            }
            return 'Ett lån betalas av med <em>rak amortering</em>: samma amorteringsbelopp varje ' +
                'månad. Övre diagrammet visar varje års inbetalningar (blått = amortering, rött = ' +
                'ränta); nedre diagrammet visar hur <em>skulden</em> minskar rakt linjärt.';
        }

        function updateFormula() {
            if (state.step === 1) {
                var K0 = state.K0, p = state.p, n = state.n;
                var factor = 1 + p / 100;
                var result = compoundValue(K0, p, n);
                var linResult = linearValue(K0, p, n);
                katexInto(formelA,
                    '\\text{behållning} = ' + fmtTexMoney(K0, 0) + '\\ \\text{kr} \\cdot ' +
                    fmtTex(factor, 3) + '^{' + n + '} = ' + fmtTexMoney(result, 2) + '\\ \\text{kr}');
                formelA.style.color = COL.gain;
                formelA.style.display = '';
                fitFormula(formelA, 15.5);
                katexInto(formelB,
                    '\\text{utan ränta-på-ränta} = ' + fmtTexMoney(K0, 0) + '\\ \\text{kr} \\cdot (1 + ' +
                    n + ' \\cdot ' + fmtTex(p / 100, 4) + ') = ' + fmtTexMoney(linResult, 2) + '\\ \\text{kr}');
                formelB.style.color = COL.principal;
                formelB.style.display = '';
                fitFormula(formelB, 14);
                note.style.color = COL.gain;
                var extra = result - linResult;
                note.innerHTML = n >= 1
                    ? 'Ränta-på-ränta-effekten har gett dig <strong>' + fmtKr(extra, 2) + ' kr</strong> extra ' +
                      'jämfört med enkel ränta efter ' + n + ' år.'
                    : 'Vid år 0 finns ingen skillnad ännu — dra i <em>antal år</em>.';
            } else if (state.step === 2) {
                if (state.guessed) {
                    var K02 = state.K0, p2 = state.p, n2 = state.n;
                    var avkP = compoundValue(K02, p2, n2) - K02;
                    var avk2P = compoundValue(K02, 2 * p2, n2) - K02;
                    var ratio = avkP > 0 ? avk2P / avkP : 0;
                    katexInto(formelA,
                        '\\text{avkastning vid ' + fmtTrim(p2, 1) + '\\,\\%} = ' + fmtTexMoney(avkP, 2) +
                        '\\ \\text{kr}, \\quad \\text{vid ' + fmtTrim(2 * p2, 1) + '\\,\\%} = ' +
                        fmtTexMoney(avk2P, 2) + '\\ \\text{kr}');
                    formelA.style.color = COL.gain;
                    formelA.style.display = '';
                    fitFormula(formelA, 14.5);
                    formelB.style.display = 'none';
                    var guessedDouble = state.guess === 'double';
                    var lead = guessedDouble
                        ? 'Du gissade &quot;Ja, den fördubblas&quot; — men så blev det inte.'
                        : 'Du gissade &quot;Nej&quot; — och du hade rätt.';
                    var relation;
                    if (n2 < 1) relation = 'Vid 0 år finns ingen intjänad ränta ännu — det går inte att jämföra.';
                    else if (Math.abs(ratio - 2) < 0.01) relation = 'Avkastningen blev nästan exakt dubbelt så stor (kvot ' +
                        fmtTrim(ratio, 2) + ') — vid bara 1 år hinner ränta-på-ränta-effekten knappt synas.';
                    else relation = 'Avkastningen blev <strong>' + fmtTrim(ratio, 2) + ' gånger</strong> så stor, inte ' +
                        'exakt 2,00 gånger — räntan har själv börjat ge ränta (ränta på ränta), så en dubblad ' +
                        'räntesats ger MER än dubbelt så stor avkastning.';
                    note.style.color = COL.ink;
                    note.innerHTML = lead + ' ' + relation;
                } else {
                    formelA.style.display = 'none';
                    formelB.style.display = 'none';
                    note.textContent = '';
                }
            } else if (state.step === 3) {
                var dep = state.dep, p3 = state.p3, n3 = state.n3;
                var vals = savingsSeries(dep, p3, n3);
                var behall = vals[vals.length - 1];
                var insatt = dep * n3;
                var rantedel = behall - insatt;
                katexInto(formelA,
                    '\\text{insatt kapital} = ' + fmtTexMoney(dep, 0) + '\\ \\text{kr} \\cdot ' + n3 +
                    ' = ' + fmtTexMoney(insatt, 0) + '\\ \\text{kr}');
                formelA.style.color = COL.principal;
                formelA.style.display = '';
                fitFormula(formelA, 15);
                katexInto(formelB,
                    '\\text{behållning} = ' + fmtTexMoney(behall, 2) + '\\ \\text{kr} \\quad(\\text{räntedel} = ' +
                    fmtTexMoney(rantedel, 2) + '\\ \\text{kr})');
                formelB.style.color = COL.gain;
                formelB.style.display = '';
                fitFormula(formelB, 14.5);
                note.style.color = COL.inkSoft;
                note.innerHTML = 'Räntedelen är ' + fmtTrim(rantedel / behall * 100, 1) + ' % av den ' +
                    'slutliga behållningen.';
            } else {
                var sched = loanSchedule(state.loan, state.p4, state.years4);
                katexInto(formelA,
                    '\\text{amortering/månad} = \\dfrac{' + fmtTexMoney(state.loan, 0) + '\\ \\text{kr}}{' +
                    sched.months + '} = ' + fmtTexMoney(sched.amort, 0) + '\\ \\text{kr}');
                formelA.style.color = COL.principal;
                formelA.style.display = '';
                fitFormula(formelA, 15);
                katexInto(formelB,
                    '\\text{totalt betalt} = ' + fmtTexMoney(state.loan, 0) + '\\ \\text{kr} + ' +
                    fmtTexMoney(sched.totalRanta, 0) + '\\ \\text{kr (ränta)} = ' +
                    fmtTexMoney(sched.totalPaid, 0) + '\\ \\text{kr}');
                formelB.style.color = COL.loss;
                formelB.style.display = '';
                fitFormula(formelB, 14);
                note.style.color = COL.loss;
                note.innerHTML = 'Du lånade <strong>' + fmtKr(state.loan, 0) + ' kr</strong> men betalar totalt ' +
                    '<strong>' + fmtKr(sched.totalPaid, 0) + ' kr</strong> — ' + fmtKr(sched.totalRanta, 0) +
                    ' kr av det är ränta, kostnaden för lånet.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = instrHTML();

            s1.scene.style.display = state.step === 1 ? '' : 'none';
            s2.scene.style.display = state.step === 2 ? '' : 'none';
            s3.scene.style.display = state.step === 3 ? '' : 'none';
            s4a.scene.style.display = state.step === 4 ? '' : 'none';
            s4b.scene.style.display = state.step === 4 ? '' : 'none';
            guessActions.style.display = (state.step === 2 && !state.guessed) ? '' : 'none';
            guessAgainWrap.style.display = (state.step === 2 && state.guessed) ? '' : 'none';

            [rowK0, rowP, rowN].forEach(function (r) { r.row.style.display = (state.step === 1 || state.step === 2) ? '' : 'none'; });
            [rowDep, rowP3, rowN3].forEach(function (r) { r.row.style.display = state.step === 3 ? '' : 'none'; });
            [rowLoan, rowP4, rowYears4].forEach(function (r) { r.row.style.display = state.step === 4 ? '' : 'none'; });

            if (state.step === 1) {
                setLegend([[COL.principal, 'utan ränta-på-ränta'], [COL.gain, 'extra: ränta på ränta']]);
                drawStep1();
            } else if (state.step === 2) {
                setLegend([[COL.principal, 'insatt belopp'], [COL.gain, 'avkastning (ränta)']]);
                drawStep2();
            } else if (state.step === 3) {
                setLegend([[COL.principal, 'insatt kapital'], [COL.curve, 'behållning (kurva)'], [COL.gain, 'räntedel']]);
                drawStep3();
            } else {
                setLegend([[COL.principal, 'amortering'], [COL.loss, 'ränta'], [COL.loss, 'skuld (kurva)']]);
                var sched = loanSchedule(state.loan, state.p4, state.years4);
                drawStep4a(sched);
                drawStep4b(sched);
            }
            updateFormula();
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
    window.VISUALISERINGAR['ma1c-3.4'] = api;
    window.VISUALISERINGAR['ma1c-3.5'] = api;
})();
