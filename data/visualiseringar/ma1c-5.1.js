/* ma1c-5.1.js — visualisering: "Opinionsmätaren — urval och felmarginal"
 * (hör till ma1c-5.1, Statistiska undersökningar, urval och felkällor, samt
 * ma1c-5.2, Felmarginal och signifikans).
 *
 * Kärninsikt: en opinionsmätning frågar ett URVAL, inte hela populationen —
 * skattningen studsar slumpmässigt kring det sanna (dolda) värdet, och
 * felmarginalen krymper som 1/roten ur n (fyrdubbla urvalet -> halva
 * felmarginalen). Ett SNEDVRIDET urval (frågar bara i ett hörn av
 * populationen) hjälps inte av ett större n — det är ett urvalsfel, inte
 * ett storleksproblem.
 *
 * Modellen: en population på 10 000 personer, visualiserad som 50x40 =
 * 2 000 prickar (1 prick motsvarar 5 personer — rent visuellt; den
 * faktiska statistiken simuleras oberoende av prickantalet, se nedan).
 * En dold andel TRUE_P = 46 % stödjer "Parti A". I det streckade hörnet av
 * rutan (uppe till vänster) är stödet i stället CORNER_P = 78 % — en
 * urvalsfel-fälla motsvarande genomgångens "fråga utanför en kyrka".
 *
 * Fyra steg (lager):
 *   1. Fråga ett urval   — n = 50/200/1000, ny slumpmässig skattning varje
 *                          gång; en historikremsa visar hur mycket EN
 *                          mätning kan studsa.
 *   2. Felmarginalen      — 100 mätningar körs i batch för n = 100 och för
 *      krymper             n = 400; bandens BREDD (empirisk + genomgångens
 *                          formel f = 1,96*roten(p(100-p)/n)) jämförs.
 *   3. Är skillnaden       — Parti A (46 %) mot Parti B (48 %). Genomgångens
 *      säker?               metod: ligger den nya mätningen innanför förra
 *                          mätningens konfidensintervall? n-glidare tills
 *                          punkten lämnar intervallet.
 *   4. Snedvridet urval   — fråga bara i hörnet: skattningen blir
 *                          systematiskt fel oavsett n (urvalsfel).
 *
 * Den faktiska statistiken simuleras som oberoende binomialförsök
 * (Math.random() < p, n gånger) — ORONOENDE av hur många prickar som
 * målas i populationsrutan. Prickmålningen är enbart en illustration av
 * VILKEN del av populationen som frågades (slumpmässigt spridd över hela
 * rutan för steg 1/2, bara i hörnet för steg 4:s hörn-knappar).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-6.5.js).
 * API: window.VISUALISERINGAR['ma1c-5.1'] / ['ma1c-5.2'] = { mount(el) -> { destroy() } }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll -> "0",
    //    NBSP som tusentalsavgränsare och framför %) ────────────────────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 1 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }
    function fmtTex(v, decimals) { return fmt(v, decimals).replace(',', '{,}'); }
    function fmtInt(n) {
        var s = Math.round(n).toString();
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    function fmtTexInt(n) {
        var s = Math.round(n).toString(), out = '';
        for (var i = 0; i < s.length; i++) {
            if (i > 0 && (s.length - i) % 3 === 0) out += '\\,';
            out += s.charAt(i);
        }
        return out;
    }
    function pctStr(v, decimals) { return fmt(v, decimals) + ' %'; }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var e = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
        return e;
    }
    // Text med kursiva variabler: delar märkta med * blir italic.
    function svgVarText(attrs, parts) {
        var e = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var italic = p.charAt(0) === '*';
            var t = svgEl('tspan', italic ? { 'font-style': 'italic' } : {});
            t.textContent = italic ? p.slice(1) : p;
            e.appendChild(t);
        }
        return e;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }
    // x nära vänster-/högerkant av ett plotintervall [PL,PR] -> byt ankare
    // så etiketten flödar inåt i stället för att sticka ut ur ramen.
    function safeAnchor(x, PL, PR) {
        if (x < PL + 42) return 'start';
        if (x > PR - 42) return 'end';
        return 'middle';
    }
    // För etiketter som sitter PÅ en vertikal referenslinje (t.ex. "sant
    // värde"-linjen): ALDRIG 'middle' — då hamnar linjen mitt i texten.
    // Etiketten flödar alltid helt åt EN sida av linjen.
    function sideAnchor(x, PL, PR) {
        return x > (PL + PR) / 2 ? 'end' : 'start';
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.35)',
        popGray: '#c9c3b3',          // ofrågade prickar i populationen
        first: '#3b82f6',            // Parti A / primärserie — blå
        second: '#f97316',           // Parti B / "övriga" — orange
        band: 'rgba(59,130,246,0.16)',  // teoretisk felmarginal (translucent blå)
        corner: '#8b5cf6',           // hörn-urvalet (snedvridet) — lila
        reveal: '#c8324a'            // "sant värde" — röd
    };

    // ── Modellkonstanter (delade mellan alla monteringar) ─────────────
    var TRUE_P = 46;     // Parti A:s sanna andel i hela populationen (dold)
    var TRUE_PB = 48;    // Parti B:s sanna andel i steg 3:s jämförelse
    var CORNER_P = 78;   // Parti A:s andel i det snedvridna hörnet (dold)

    var POP_COLS = 50, POP_ROWS = 40, POP_N = POP_COLS * POP_ROWS; // 2 000
    var CORNER_COLS = 16, CORNER_ROWS = 14; // hörn-regionen (224 prickar)

    var allIndices = [];
    var cornerIndices = [];
    (function buildIndices() {
        for (var row = 0; row < POP_ROWS; row++) {
            for (var col = 0; col < POP_COLS; col++) {
                var idx = row * POP_COLS + col;
                allIndices.push(idx);
                if (col < CORNER_COLS && row < CORNER_ROWS) cornerIndices.push(idx);
            }
        }
    })();

    function binomialCount(n, pPercent) {
        var p = pPercent / 100, c = 0;
        for (var i = 0; i < n; i++) if (Math.random() < p) c++;
        return c;
    }
    function felmarginal(pPercent, n) {
        if (n <= 0) return 0;
        return 1.96 * Math.sqrt(pPercent * (100 - pPercent) / n);
    }
    function felmarginalTex(p, n, sub) {
        var pT = fmtTex(p, 1), nT = fmtTexInt(n);
        var fT = fmtTex(felmarginal(p, n), 1);
        var fSym = sub ? 'f_' + sub : 'f';
        var pSym = sub ? 'p_' + sub : 'p';
        return fSym + ' = 1{,}96 \\cdot \\sqrt{\\dfrac{' + pSym + '(100 - ' + pSym + ')}{n}}' +
            ' = 1{,}96 \\cdot \\sqrt{\\dfrac{' + pT + '(100 - ' + pT + ')}{' + nT + '}} = ' + fT + '\\ \\%';
    }
    // Väljer count slumpmässiga index (utan återläggning) ur pool.
    function pickRandomIndices(pool, count) {
        var arr = pool.slice();
        var n = arr.length, take = Math.min(count, n);
        for (var i = 0; i < take; i++) {
            var j = i + Math.floor(Math.random() * (n - i));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr.slice(0, take);
    }
    function fitRange(values) {
        var lo = Math.min.apply(null, values), hi = Math.max.apply(null, values);
        if (lo === hi) { lo -= 5; hi += 5; }
        var pad = Math.max(3, (hi - lo) * 0.22);
        lo -= pad; hi += pad;
        if (hi - lo < 12) { var mid = (lo + hi) / 2; lo = mid - 6; hi = mid + 6; }
        if (lo < 0) { hi -= lo; lo = 0; }
        if (hi > 100) { lo -= (hi - 100); hi = 100; }
        lo = Math.max(0, lo); hi = Math.min(100, hi);
        return { lo: lo, hi: hi };
    }
    function niceTickStep(span) {
        var cands = [1, 2, 5, 10, 20, 25, 50];
        for (var i = 0; i < cands.length; i++) if (span / cands[i] <= 7) return cands[i];
        return 100;
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            step: 1,
            lastAsk: null,           // {n, countA, phat, dotIdx}
            hist1: [],               // [{n, phat}] senaste steg-1-mätningarna
            batch100: [], batch400: [],
            revealTrue: false,
            n3: 200,
            step3: null,             // {p1, f1, n, p2}
            lastCorner: null,        // {n, countA, phat, dotIdx}
            histCorner: [], histRandom4: []
        };

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Opinionsmätaren — urval och felmarginal';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var scenePop = document.createElement('div');
        scenePop.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scenePop);

        var POP_W = 560, popMarginX = 16, popMarginTop = 26, popMarginBottom = 10;
        var popSpacingX = (POP_W - 2 * popMarginX) / POP_COLS;
        var popSpacingY = 6.0;
        var popPlotH = POP_ROWS * popSpacingY;
        var POP_H = popMarginTop + popPlotH + popMarginBottom;
        var popRadius = 1.9;
        function popX(col) { return popMarginX + (col + 0.5) * popSpacingX; }
        function popY(row) { return popMarginTop + (row + 0.5) * popSpacingY; }

        var svgPop = svgEl('svg', {
            viewBox: '0 0 ' + POP_W + ' ' + POP_H,
            width: POP_W, height: POP_H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'En population av 10 000 personer, visad som 2 000 prickar. ' +
                'Gråa prickar har inte tillfrågats. Blåa och orangea prickar visar de ' +
                'som ingick i det senaste urvalet.'
        });
        svgPop.classList.add('lab-graf-svg');
        svgPop.style.cursor = 'default';
        scenePop.appendChild(svgPop);

        var popCaption = document.createElement('div');
        popCaption.style.fontSize = '11.5px';
        popCaption.style.color = COL.tick;
        popCaption.style.textAlign = 'center';
        popCaption.style.margin = '2px 0 8px';
        popCaption.textContent = 'Population: 10 000 personer. Varje prick motsvarar 5 personer (2 000 synliga prickar).';
        card.appendChild(popCaption);

        var sceneMet = document.createElement('div');
        sceneMet.className = 'lab-graf-scene lab-vis-scene';
        sceneMet.style.marginTop = '4px';
        card.appendChild(sceneMet);

        var MW = 560, MH = 180;
        var svgMet = svgEl('svg', {
            viewBox: '0 0 ' + MW + ' ' + MH,
            width: MW, height: MH,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Diagram som visar skattningar av andelen i procent på en tallinje.'
        });
        svgMet.classList.add('lab-graf-svg');
        svgMet.style.cursor = 'default';
        sceneMet.appendChild(svgMet);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelLine1 = document.createElement('div');
        formelLine1.className = 'lab-vis-formel';
        formelLine1.style.color = COL.first;
        card.appendChild(formelLine1);

        var formelLine2 = document.createElement('div');
        formelLine2.className = 'lab-vis-formel';
        formelLine2.style.color = COL.second;
        card.appendChild(formelLine2);

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
            { n: 1, label: '1 · Fråga ett urval' },
            { n: 2, label: '2 · Felmarginalen krymper' },
            { n: 3, label: '3 · Är skillnaden säker?' },
            { n: 4, label: '4 · Snedvridet urval' }
        ];
        var INSTR = {
            1: 'En opinionsmätning frågar inte hela populationen — den frågar ett ' +
               '<em>urval</em>. Klicka på en knapp för att göra en stickprovsundersökning. ' +
               'Det sanna värdet i populationen är dolt. Gissa innan du klickar: ' +
               'stödjer fler eller färre än hälften Parti A?',
            2: 'Kör 100 mätningar automatiskt, dels med <em>n</em> = 100, dels med ' +
               '<em>n</em> = 400, och jämför hur mycket skattningarna sprider sig. ' +
               'Formeln visar felmarginalen — spannet skattningen troligen ligger inom. ' +
               'Avslöja sedan det sanna värdet: hamnar det innanför banden?',
            3: 'Parti A och Parti B ligger nära varandra i en opinionsmätning. Dra i ' +
               '<em>n</em>-glidaren tills den nya mätningen (Parti B) hamnar UTANFÖR förra ' +
               'mätningens konfidensintervall (Parti A) — då är skillnaden statistiskt ' +
               'säkerställd med 95 % säkerhet.',
            4: 'Fråga bara personer i det streckade hörnet av populationen — precis som ' +
               'att bara fråga folk utanför en kyrka om gudstro. Jämför med ett ' +
               'slumpmässigt urval av samma storlek, och se att ett större urval INTE ' +
               'hjälper mot ett snedvridet urval.'
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
        var legEstimate = legendItem(COL.first, 'skattning (andel för Parti A)');
        var legBand = legendItem(COL.first, 'mätvärden (100 st)');
        var legMargin = legendItem(COL.band, 'teoretisk felmarginal');
        var legPartiA = legendItem(COL.first, 'Parti A: mätvärde ± felmarginal');
        var legPartiB = legendItem(COL.second, 'Parti B: ny mätning');
        var legRandom = legendItem(COL.first, 'slumpmässigt urval');
        var legCorner = legendItem(COL.corner, 'urval bara i hörnet');
        var legTrue = legendItem(COL.reveal, 'sant värde (dolt tills avslöjat)');
        [legEstimate, legBand, legMargin, legPartiA, legPartiB, legRandom, legCorner, legTrue]
            .forEach(function (it) { legend.appendChild(it); });

        // ── Actions: alla knappar skapas en gång, visas per steg ───────────
        function makeActionBtn(txt, fn) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = txt;
            b.addEventListener('click', fn);
            actions.appendChild(b);
            return b;
        }
        var btnAsk50 = makeActionBtn('Fråga 50', function () { doAsk(50); });
        var btnAsk200 = makeActionBtn('Fråga 200', function () { doAsk(200); });
        var btnAsk1000 = makeActionBtn('Fråga 1000', function () { doAsk(1000); });
        var btnRepeat = makeActionBtn('Upprepa', function () { doAsk(state.lastAsk ? state.lastAsk.n : 200); });

        var btnBatch100 = makeActionBtn('Kör 100 mätningar (n = 100)', function () { doBatch(100, 'batch100'); });
        var btnBatch400 = makeActionBtn('Kör 100 mätningar (n = 400)', function () { doBatch(400, 'batch400'); });

        var btnResample = makeActionBtn('Ny mätning', function () { resample3(); update(); });

        var btnCorner200 = makeActionBtn('Fråga i hörnet (n = 200)', function () { doAskCorner(200); });
        var btnCorner1000 = makeActionBtn('Fråga i hörnet (n = 1000)', function () { doAskCorner(1000); });
        var btnRandom4 = makeActionBtn('Fråga slumpmässigt (n = 200)', function () { doAskRandom4(200); });

        var btnReveal = makeActionBtn('Avslöja sant värde', function () { state.revealTrue = true; update(); });

        // ── n-glidare (steg 3) ──────────────────────────────────────────────
        var N3_MIN = 20, N3_MAX = 8000;
        var rowN = document.createElement('div');
        rowN.className = 'lab-graf-row';
        var lblN = document.createElement('label');
        lblN.className = 'lab-graf-lbl';
        var emN = document.createElement('em');
        emN.textContent = 'n';
        lblN.appendChild(emN);
        var sliderN = document.createElement('input');
        sliderN.type = 'range';
        sliderN.className = 'lab-graf-slider';
        sliderN.min = N3_MIN; sliderN.max = N3_MAX; sliderN.step = 10; sliderN.value = state.n3;
        sliderN.setAttribute('aria-label', 'Urvalsstorleken n');
        var fieldN = document.createElement('input');
        fieldN.type = 'number';
        fieldN.className = 'lab-graf-num';
        fieldN.min = N3_MIN; fieldN.max = N3_MAX; fieldN.step = 10; fieldN.value = state.n3;
        fieldN.setAttribute('inputmode', 'numeric');
        fieldN.setAttribute('aria-label', 'Urvalsstorleken n');
        function paintSliderN() {
            var pct = clampNum((state.n3 - N3_MIN) / (N3_MAX - N3_MIN) * 100, 0, 100);
            sliderN.style.background = 'linear-gradient(to right, ' + COL.first + ' 0%, ' +
                COL.first + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
        }
        function applyN3(v, from) {
            if (!isFinite(v)) return;
            state.n3 = Math.round(clampNum(v, N3_MIN, N3_MAX) / 10) * 10;
            if (from !== 'slider') sliderN.value = state.n3;
            if (from !== 'field') fieldN.value = state.n3;
            paintSliderN();
            resample3();
            update();
        }
        sliderN.addEventListener('input', function () { applyN3(parseFloat(sliderN.value), 'slider'); });
        fieldN.addEventListener('input', function () { applyN3(parseFloat(fieldN.value), 'field'); });
        paintSliderN();
        lblN.appendChild(sliderN);
        rowN.appendChild(lblN);
        rowN.appendChild(fieldN);
        controls.appendChild(rowN);

        // ── Nollställ ────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Nollställ';
        reset.addEventListener('click', function () {
            state.lastAsk = null; state.hist1 = [];
            state.batch100 = []; state.batch400 = []; state.revealTrue = false;
            state.n3 = 200; state.step3 = null;
            state.lastCorner = null; state.histCorner = []; state.histRandom4 = [];
            sliderN.value = 200; fieldN.value = 200; paintSliderN();
            update();
        });
        foot.appendChild(reset);

        // ── Populationsprickar (skapas EN gång, målas om vid varje ritning) ─
        var popG = svgEl('g');
        svgPop.appendChild(popG);
        var popDots = new Array(POP_N);
        for (var pi = 0; pi < POP_N; pi++) {
            var row = Math.floor(pi / POP_COLS), col = pi % POP_COLS;
            var c = svgEl('circle', { cx: popX(col), cy: popY(row), r: popRadius, fill: COL.popGray });
            popG.appendChild(c);
            popDots[pi] = c;
        }
        var cornerRectW = CORNER_COLS * popSpacingX, cornerRectH = CORNER_ROWS * popSpacingY;
        var cornerOutline = svgEl('rect', {
            x: popMarginX, y: popMarginTop, width: cornerRectW, height: cornerRectH,
            fill: 'none', stroke: COL.corner, 'stroke-width': 1.6, 'stroke-dasharray': '6 4'
        });
        svgPop.appendChild(cornerOutline);
        var cornerLabel = svgVarText(
            { x: popMarginX, y: popMarginTop - 8, 'font-size': 12, 'text-anchor': 'start', fill: COL.corner },
            ['Hörnet']);
        svgPop.appendChild(cornerLabel);

        function paintPopulationForStep() {
            for (var i = 0; i < POP_N; i++) popDots[i].setAttribute('fill', COL.popGray);
            var subset = null, phat = null;
            if (state.step === 1 && state.lastAsk) { subset = state.lastAsk.dotIdx; phat = state.lastAsk.phat; }
            else if (state.step === 4 && state.lastCorner) { subset = state.lastCorner.dotIdx; phat = state.lastCorner.phat; }
            if (subset) {
                var nBlue = Math.round(phat / 100 * subset.length);
                for (var j = 0; j < subset.length; j++) {
                    popDots[subset[j]].setAttribute('fill', j < nBlue ? COL.first : COL.second);
                }
            }
            var showCorner = state.step === 4;
            cornerOutline.style.display = showCorner ? '' : 'none';
            cornerLabel.style.display = showCorner ? '' : 'none';
        }

        // ── Handlingar ────────────────────────────────────────────────────
        function doAsk(n) {
            var countA = binomialCount(n, TRUE_P);
            var phat = countA / n * 100;
            var dotsShown = Math.max(1, Math.round(n / 5));
            var dotIdx = pickRandomIndices(allIndices, dotsShown);
            state.lastAsk = { n: n, countA: countA, phat: phat, dotIdx: dotIdx };
            state.hist1.push({ n: n, phat: phat });
            if (state.hist1.length > 8) state.hist1.shift();
            update();
        }
        function doBatch(n, key) {
            var arr = [];
            for (var i = 0; i < 100; i++) arr.push(binomialCount(n, TRUE_P) / n * 100);
            state[key] = arr;
            update();
        }
        function resample3() {
            var countA1 = binomialCount(state.n3, TRUE_P);
            var p1 = countA1 / state.n3 * 100;
            var f1 = felmarginal(p1, state.n3);
            var countA2 = binomialCount(state.n3, TRUE_PB);
            var p2 = countA2 / state.n3 * 100;
            state.step3 = { p1: p1, f1: f1, n: state.n3, p2: p2 };
        }
        function doAskCorner(n) {
            var countA = binomialCount(n, CORNER_P);
            var phat = countA / n * 100;
            var dotsShown = Math.max(1, Math.round(n / 5));
            var dotIdx = pickRandomIndices(cornerIndices, dotsShown);
            state.lastCorner = { n: n, countA: countA, phat: phat, dotIdx: dotIdx };
            state.histCorner.push({ n: n, phat: phat });
            if (state.histCorner.length > 3) state.histCorner.shift();
            update();
        }
        function doAskRandom4(n) {
            var countA = binomialCount(n, TRUE_P);
            var phat = countA / n * 100;
            state.histRandom4.push({ n: n, phat: phat });
            if (state.histRandom4.length > 3) state.histRandom4.shift();
            update();
        }

        // ── Tallinje-hjälpare (delad av alla fyra steg) ─────────────────────
        function drawPercentAxis(svg, y, lo, hi, labelText) {
            var step = niceTickStep(hi - lo);
            var PL = 28, PR = 528, PW = PR - PL;
            function X(v) { return PL + (v - lo) / (hi - lo) * PW; }
            svg.appendChild(svgEl('line', { x1: PL - 4, y1: y, x2: PR + 6, y2: y, stroke: COL.axis, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', {
                points: (PR + 14) + ',' + y + ' ' + (PR + 4) + ',' + (y - 4) + ' ' + (PR + 4) + ',' + (y + 4),
                fill: COL.axis
            }));
            var t0 = Math.ceil(lo / step) * step, t1 = Math.floor(hi / step) * step;
            for (var v = t0; v <= t1 + 1e-6; v += step) {
                var xx = X(v);
                svg.appendChild(svgEl('line', { x1: xx, y1: y - 4, x2: xx, y2: y + 4, stroke: COL.axis, 'stroke-width': 1.2 }));
                svg.appendChild(svgVarText(
                    { x: xx, y: y + 16, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick },
                    [fmt(v, 0)]));
            }
            if (labelText) {
                svg.appendChild(svgVarText(
                    { x: PR + 16, y: y - 8, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick },
                    [labelText]));
            }
            return { X: X, PL: PL, PR: PR };
        }

        // ── Steg 1: historikremsa ────────────────────────────────────────
        function drawStep1(svg) {
            var values = state.hist1.map(function (h) { return h.phat; });
            var r = fitRange(values.length ? values : [TRUE_P]);
            var axisY = 150;
            var ax = drawPercentAxis(svg, axisY, r.lo, r.hi, 'andel för Parti A (%)');
            var rowGap = 11;
            for (var i = 0; i < state.hist1.length; i++) {
                var idxFromNewest = state.hist1.length - 1 - i;
                var h = state.hist1[i];
                var y = axisY - 14 - idxFromNewest * rowGap;
                var newest = idxFromNewest === 0;
                svg.appendChild(svgEl('circle', {
                    cx: ax.X(h.phat), cy: y, r: newest ? 5.5 : 3.2,
                    fill: COL.first, opacity: newest ? 1 : 0.45
                }));
            }
        }

        // ── Steg 2: n = 100 mot n = 400 ──────────────────────────────────
        function meanOf(arr) {
            if (!arr.length) return null;
            var s = 0; for (var i = 0; i < arr.length; i++) s += arr[i];
            return s / arr.length;
        }
        function drawStep2(svg) {
            var vals = state.batch100.concat(state.batch400);
            if (state.revealTrue) vals.push(TRUE_P);
            var r = fitRange(vals.length ? vals : [TRUE_P - 12, TRUE_P + 12]);
            var axisY = 156;
            var ax = drawPercentAxis(svg, axisY, r.lo, r.hi, 'andel för Parti A (%)');
            // "Sant värde"-linjen ritas FÖRST (underst i z-ordningen) så att
            // kolumntitlarna/prickarna — ritade efter, i drawBand — alltid
            // hamnar ovanpå linjen i stället för att den skär igenom text.
            if (state.revealTrue) {
                var xt = ax.X(TRUE_P);
                svg.appendChild(svgEl('line', { x1: xt, y1: 14, x2: xt, y2: axisY, stroke: COL.reveal, 'stroke-width': 1.6, 'stroke-dasharray': '6 4' }));
            }
            function drawBand(arr, n, rowY, labelY) {
                svg.appendChild(svgEl('rect', { x: 26, y: labelY - 11, width: 74, height: 14, fill: 'var(--lab-bg-panel, #fff)' }));
                svg.appendChild(svgVarText(
                    { x: 30, y: labelY, 'font-size': 12, 'text-anchor': 'start', fill: COL.tick },
                    ['*n', ' = ' + n]));
                if (!arr.length) return;
                var mean = meanOf(arr);
                var f = felmarginal(mean, n);
                var x0 = ax.X(Math.max(r.lo, mean - f)), x1 = ax.X(Math.min(r.hi, mean + f));
                svg.appendChild(svgEl('rect', { x: x0, y: rowY - 16, width: Math.max(1, x1 - x0), height: 32, fill: COL.band }));
                arr.forEach(function (v) {
                    var jitter = (Math.random() - 0.5) * 24;
                    svg.appendChild(svgEl('circle', { cx: ax.X(v), cy: rowY + jitter, r: 2.3, fill: COL.first, opacity: 0.5 }));
                });
                svg.appendChild(svgEl('line', { x1: ax.X(mean), y1: rowY - 18, x2: ax.X(mean), y2: rowY + 18, stroke: COL.axis, 'stroke-width': 1.6 }));
            }
            drawBand(state.batch100, 100, 46, 22);
            drawBand(state.batch400, 400, 104, 80);
            if (state.revealTrue) {
                var anc = sideAnchor(xt, ax.PL, ax.PR);
                svg.appendChild(svgVarText(
                    { x: xt + (anc === 'end' ? -6 : anc === 'start' ? 6 : 0), y: 140, 'font-size': 11, 'text-anchor': anc, fill: COL.reveal },
                    ['sant värde: ' + pctStr(TRUE_P, 1)]));
            }
        }

        // ── Steg 3: signifikans ──────────────────────────────────────────
        function drawStep3(svg) {
            var s = state.step3;
            var vals = s ? [s.p1 - s.f1, s.p1 + s.f1, s.p2] : [TRUE_P - 8, TRUE_PB + 8];
            var r = fitRange(vals);
            var axisY = 130;
            var ax = drawPercentAxis(svg, axisY, r.lo, r.hi, 'andel (%)');
            if (!s) return;
            var bandY = 68;
            var x0 = ax.X(Math.max(r.lo, s.p1 - s.f1)), x1 = ax.X(Math.min(r.hi, s.p1 + s.f1));
            svg.appendChild(svgEl('rect', { x: x0, y: bandY - 24, width: Math.max(1, x1 - x0), height: 48, fill: COL.band }));
            svg.appendChild(svgEl('line', { x1: ax.X(s.p1), y1: bandY - 24, x2: ax.X(s.p1), y2: bandY + 24, stroke: COL.first, 'stroke-width': 2 }));
            var ancA = safeAnchor(ax.X(s.p1), ax.PL, ax.PR);
            svg.appendChild(svgVarText(
                { x: ax.X(s.p1) + (ancA === 'end' ? -6 : ancA === 'start' ? 6 : 0), y: 34, 'font-size': 12, 'text-anchor': ancA, fill: COL.first },
                ['*p', '₁ = ' + pctStr(s.p1, 1)]));
            svg.appendChild(svgEl('circle', { cx: ax.X(s.p2), cy: bandY, r: 6, fill: COL.second, stroke: COL.axis, 'stroke-width': 1.3 }));
            var ancB = safeAnchor(ax.X(s.p2), ax.PL, ax.PR);
            svg.appendChild(svgVarText(
                { x: ax.X(s.p2) + (ancB === 'end' ? -8 : ancB === 'start' ? 8 : 0), y: 105, 'font-size': 12, 'text-anchor': ancB, fill: COL.second },
                ['*p', '₂ = ' + pctStr(s.p2, 1)]));
        }

        // ── Steg 4: snedvridet urval ──────────────────────────────────────
        function drawStep4(svg) {
            var vals = [];
            state.histCorner.forEach(function (h) { vals.push(h.phat); });
            state.histRandom4.forEach(function (h) { vals.push(h.phat); });
            if (state.revealTrue) { vals.push(TRUE_P, CORNER_P); }
            var r = fitRange(vals.length ? vals : [TRUE_P - 6, CORNER_P + 6]);
            var axisY = 150;
            var ax = drawPercentAxis(svg, axisY, r.lo, r.hi, 'andel för Parti A (%)');
            var ROW_GAP = 11;
            var TRACK_CORNER_Y = 64, TRACK_RANDOM_Y = 136;
            // Den streckade "sant värde"-linjen ritas FÖRST (underst i
            // z-ordningen), så att spårens etiketter/prickar — ritade efter
            // — alltid hamnar OVANPÅ linjen i stället för att den skär
            // igenom text (annars ser etiketten ut att få en tvärstreck).
            if (state.revealTrue) {
                var xt = ax.X(TRUE_P);
                svg.appendChild(svgEl('line', { x1: xt, y1: 14, x2: xt, y2: axisY, stroke: COL.reveal, 'stroke-width': 1.6, 'stroke-dasharray': '6 4' }));
            }
            state.histCorner.forEach(function (h, i) {
                var idxFromNewest = state.histCorner.length - 1 - i;
                var y = TRACK_CORNER_Y - idxFromNewest * ROW_GAP;
                var big = idxFromNewest === 0;
                svg.appendChild(svgEl('circle', {
                    cx: ax.X(h.phat), cy: y, r: big ? 5.5 : 3.2,
                    fill: COL.corner, opacity: big ? 1 : 0.55
                }));
            });
            state.histRandom4.forEach(function (h, i) {
                var idxFromNewest = state.histRandom4.length - 1 - i;
                var y = TRACK_RANDOM_Y - idxFromNewest * ROW_GAP;
                var big = idxFromNewest === 0;
                svg.appendChild(svgEl('circle', {
                    cx: ax.X(h.phat), cy: y, r: big ? 5.5 : 3.2,
                    fill: COL.first, opacity: big ? 1 : 0.55
                }));
            });
            // Bakgrundsplattor bakom spårtitlarna (samma papperston som
            // scenen) döljer linjen där den annars skulle löpa rakt bakom
            // texten — utan detta syns linjen ändå genom en kort lucka.
            svg.appendChild(svgEl('rect', { x: 26, y: 11, width: 112, height: 14, fill: 'var(--lab-bg-panel, #fff)' }));
            svg.appendChild(svgEl('rect', { x: 26, y: 81, width: 150, height: 14, fill: 'var(--lab-bg-panel, #fff)' }));
            svg.appendChild(svgVarText(
                { x: 30, y: 20, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.corner },
                ['urval i hörnet']));
            svg.appendChild(svgVarText(
                { x: 30, y: 90, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.first },
                ['slumpmässigt urval']));
            if (state.revealTrue) {
                var anc = sideAnchor(xt, ax.PL, ax.PR);
                // y = 76: fri yta mellan hörn-spårets understa prick (64,
                // radie 5,5 -> nedkant ~70) och slumpmässigt-spårets
                // etikett (90, överkant ~81) — se till att detta INTE
                // krockar med någotdera vid ändring.
                svg.appendChild(svgVarText(
                    { x: xt + (anc === 'end' ? -6 : anc === 'start' ? 6 : 0), y: 76, 'font-size': 11, 'text-anchor': anc, fill: COL.reveal },
                    ['sant värde: ' + pctStr(TRUE_P, 1)]));
            }
        }

        // ── Formler ────────────────────────────────────────────────────────
        function updateFormulas() {
            formelLine1.textContent = ''; formelLine2.textContent = '';
            if (state.step === 2) {
                if (state.batch100.length) katexInto(formelLine1, felmarginalTex(meanOf(state.batch100), 100));
                if (state.batch400.length) katexInto(formelLine2, felmarginalTex(meanOf(state.batch400), 400));
            } else if (state.step === 3 && state.step3) {
                katexInto(formelLine1, felmarginalTex(state.step3.p1, state.step3.n, '1'));
                var lo = state.step3.p1 - state.step3.f1, hi = state.step3.p1 + state.step3.f1;
                var inside = state.step3.p2 >= lo && state.step3.p2 <= hi;
                katexInto(formelLine2,
                    'p_2 = ' + fmtTex(state.step3.p2, 1) + '\\ \\%\\ ' + (inside ? '\\in' : '\\notin') +
                    '\\ [' + fmtTex(lo, 1) + '\\ \\%,\\ ' + fmtTex(hi, 1) + '\\ \\%]');
            }
        }

        // ── Anteckningstext (dynamisk per steg) ──────────────────────────
        function updateNote() {
            if (state.step === 1) {
                if (!state.lastAsk) {
                    note.innerHTML = 'Ingen mätning gjord ännu — gissa först, klicka sedan på en knapp.';
                } else {
                    var a = state.lastAsk;
                    note.innerHTML = '<strong>' + fmtInt(a.countA) + ' av ' + fmtInt(a.n) +
                        '</strong> svarade Parti A &rarr; skattning: <strong>' + pctStr(a.phat, 1) +
                        '</strong>. Klicka &quot;Upprepa&quot; för att fråga ett NYTT urval av samma storlek.';
                }
            } else if (state.step === 2) {
                if (!state.batch100.length && !state.batch400.length) {
                    note.textContent = 'Kör minst en batch med 100 mätningar för att se hur mycket skattningarna sprider sig.';
                } else {
                    var msg = '';
                    if (state.batch100.length) {
                        var f100 = felmarginal(meanOf(state.batch100), 100);
                        msg += 'Vid <em>n</em> = 100 sprider sig skattningarna ungefär ± ' + fmt(f100, 1) + ' procentenheter. ';
                    }
                    if (state.batch400.length) {
                        var f400 = felmarginal(meanOf(state.batch400), 400);
                        msg += 'Vid <em>n</em> = 400 — fyra gånger så stort urval — är spridningen bara ungefär ± ' +
                            fmt(f400, 1) + ' procentenheter: ungefär HÄLFTEN. Felmarginalen krymper som 1 genom roten ur <em>n</em>.';
                    }
                    if (state.revealTrue) msg += ' Det sanna värdet, ' + pctStr(TRUE_P, 1) + ', hamnar oftast innanför banden.';
                    note.innerHTML = msg;
                }
            } else if (state.step === 3) {
                if (!state.step3) {
                    note.textContent = 'Dra i n-glidaren eller klicka "Ny mätning" för att göra en mätning.';
                } else {
                    var s = state.step3;
                    var lo = s.p1 - s.f1, hi = s.p1 + s.f1;
                    var inside = s.p2 >= lo && s.p2 <= hi;
                    note.innerHTML = 'Parti A mättes till <strong>' + pctStr(s.p1, 1) + '</strong> (konfidensintervall ' +
                        pctStr(lo, 1) + '–' + pctStr(hi, 1) + '). Parti B mättes till <strong>' + pctStr(s.p2, 1) +
                        '</strong>, vilket ligger ' + (inside ? 'INNANFÖR' : 'UTANFÖR') + ' det intervallet — skillnaden är ' +
                        (inside ? '<strong>inte statistiskt säkerställd</strong>.' : '<strong>statistiskt säkerställd</strong> (95 % säkerhet).');
                }
            } else if (state.step === 4) {
                if (!state.lastCorner) {
                    note.textContent = 'Klicka "Fråga i hörnet" för att bara intervjua personer i det streckade hörnet.';
                } else {
                    var c = state.lastCorner;
                    var msg2 = 'Urvalet i hörnet ger <strong>' + pctStr(c.phat, 1) + '</strong>. Oavsett om du frågar ' +
                        '200 eller 1 000 personer DÄR blir skattningen ungefär densamma — hörnet representerar inte ' +
                        'hela populationen. Det är ett <em>urvalsfel</em>, inte ett storleksproblem.';
                    if (state.revealTrue) msg2 += ' Det sanna värdet i hela populationen är ' + pctStr(TRUE_P, 1) + '.';
                    note.innerHTML = msg2;
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            var showPop = state.step === 1 || state.step === 4;
            scenePop.style.display = showPop ? '' : 'none';
            popCaption.style.display = showPop ? '' : 'none';

            legEstimate.style.display = state.step === 1 ? '' : 'none';
            legBand.style.display = state.step === 2 ? '' : 'none';
            legMargin.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            legPartiA.style.display = state.step === 3 ? '' : 'none';
            legPartiB.style.display = state.step === 3 ? '' : 'none';
            legRandom.style.display = state.step === 4 ? '' : 'none';
            legCorner.style.display = state.step === 4 ? '' : 'none';
            legTrue.style.display = (state.step === 2 || state.step === 4) ? '' : 'none';

            btnAsk50.style.display = state.step === 1 ? '' : 'none';
            btnAsk200.style.display = state.step === 1 ? '' : 'none';
            btnAsk1000.style.display = state.step === 1 ? '' : 'none';
            btnRepeat.style.display = state.step === 1 ? '' : 'none';
            btnBatch100.style.display = state.step === 2 ? '' : 'none';
            btnBatch400.style.display = state.step === 2 ? '' : 'none';
            btnResample.style.display = state.step === 3 ? '' : 'none';
            btnCorner200.style.display = state.step === 4 ? '' : 'none';
            btnCorner1000.style.display = state.step === 4 ? '' : 'none';
            btnRandom4.style.display = state.step === 4 ? '' : 'none';
            btnReveal.style.display = (state.step === 2 || state.step === 4) ? '' : 'none';

            controls.style.display = state.step === 3 ? '' : 'none';
            formelLine1.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';
            formelLine2.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';

            if (state.step === 3 && !state.step3) resample3();

            paintPopulationForStep();
            while (svgMet.firstChild) svgMet.removeChild(svgMet.firstChild);
            if (state.step === 1) drawStep1(svgMet);
            else if (state.step === 2) drawStep2(svgMet);
            else if (state.step === 3) drawStep3(svgMet);
            else drawStep4(svgMet);

            updateFormulas();
            updateNote();
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-5.1'] = api;
    window.VISUALISERINGAR['ma1c-5.2'] = api;
})();
