/* ma1c-2.11.js — visualisering: "Olikhetens vändpunkt" (olikheter).
 *
 * Kärninsikt: att multiplicera/dividera en olikhet med ett NEGATIVT tal
 * vänder olikhetstecknet — inte som en regel att memorera, utan för att
 * HELA TALLINJEN SPEGLAS kring 0 (allt byter sida och ordning, precis som
 * i genomgångens härledning: 5 > 3 men (−1)·5 < (−1)·3).
 *
 * Två olikheter (samma modell coeffX·x + constLeft [cmp] rhs):
 *   Problem 0: −2x < 6        →  x > −3               (huvudexempel, ett
 *              enda steg — hela poängen är speglingen)
 *   Problem 1: −x + 3 ≥ 1     →  −x ≥ −2  →  x ≤ 2     ("Testa en till",
 *              två steg: subtraktion, sedan spegling)
 *
 * Tre steg:
 *   1. Lösningsmängden — dra en testpunkt längs tallinjen, se den lysa
 *      grönt (uppfyller) eller rött (uppfyller inte) olikheten. Ingen
 *      lösning ännu, bara utforskning genom insättning.
 *   2. Lös olikheten — operationsknappar (en i taget, som ekvationsvågen).
 *      Vid division/multiplikation med ett negativt tal spelas en
 *      ~1,2 s speglingsanimation: tallinjens former (band, gränspunkt,
 *      testpunkt) flippas via en scaleX(cos(2πp))-transform kring pixel-
 *      positionen för 0, och olikhetstecknet i formeln byter samtidigt
 *      (bytet sker vid animationens mittpunkt, då scaleX ≈ 0 — osynligt).
 *      Lösningsmängden (och testpunktens dom) är matematiskt OFÖRÄNDRAD
 *      genom alla giltiga steg — det är själva poängen, och det är därför
 *      testpunkten aldrig byter färg.
 *   3. Testa en till — samma verktyg (utforskning + operationer) på
 *      problem 1, för att öva överföring.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3/ma1c-2.5). API: window.VISUALISERINGAR['ma1c-2.11']
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
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function fmt0(v) { return fmt(v, 0); }
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
    // Bygger notetext av blandad text/math-delar: [{text:'...'}, {math:'...'}, ...]
    function renderParts(container, parts) {
        container.innerHTML = '';
        parts.forEach(function (p) {
            if (p.math != null) {
                var s = document.createElement('span');
                s.style.whiteSpace = 'nowrap';
                katexInto(s, p.math);
                container.appendChild(s);
            } else {
                container.appendChild(document.createTextNode(p.text));
            }
        });
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        grid: 'rgba(31,37,48,0.08)',
        band: '#2563c9',      // lösningsmängden (blå, som kurvan i övriga moduler)
        good: '#3f8f5c',      // testpunkt uppfyller (grön)
        bad: '#c8324a',       // testpunkt uppfyller inte (röd/accent)
        paper: '#f7f2e8'      // fyllning i öppen ring — matchar teorifigurens ringfyllnad
    };

    // ── Cmp-hjälp ───────────────────────────────────────────────────────
    function cmpFlip(c) {
        if (c === '<') return '>';
        if (c === '>') return '<';
        if (c === '≤') return '≥';
        return '≤'; // '≥' → '≤'
    }
    function cmpTex(c) { return c === '≤' ? '\\leq' : c === '≥' ? '\\geq' : c; }
    function cmpIsUpper(c) { return c === '>' || c === '≥'; }
    function cmpIsClosed(c) { return c === '≤' || c === '≥'; }

    // ── De två problemen (coeffX·x + constLeft [cmp] rhs) ──────────────
    var PROBLEMS = [
        { coeffX: -2, constLeft: 0, cmp: '<', rhs: 6, defaultTestX: -6 },
        { coeffX: -1, constLeft: 3, cmp: '≥', rhs: 1, defaultTestX: 5 }
    ];

    // ── sideTex: "coeffX·x + constLeft" som KaTeX ──────────────────────
    function sideTex(X, C) {
        var parts = [];
        if (X) parts.push((X === 1 ? '' : (X === -1 ? '-' : fmtTex(X))) + 'x');
        if (C !== 0) parts.push((parts.length ? (C > 0 ? ' + ' : ' - ') : (C < 0 ? '-' : '')) + fmtTex(Math.abs(C)));
        if (!parts.length) parts.push('0');
        return parts.join('');
    }

    // ── Scen-geometri (tallinje) ───────────────────────────────────────
    var W = 560, H = 140;
    var XMIN = -12.8, XMAX = 12.8, L = 26, R = 26;
    var PW = W - L - R;
    var AXIS_Y = 82;
    function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var state = {
            step: 1, probIdx: 0,
            coeffX: 0, constLeft: 0, cmp: '<', rhs: 0,
            origTex: '', origBand: null,
            testX: 0,
            history: [], undoStack: [],
            animating: false
        };
        var flip = null;      // { pre:{...}, post:{...}, opLabel, e, swapped } under animation
        var animId = null;

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Olikhetens vändpunkt';
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
            'aria-label': 'Interaktiv tallinje som visar lösningsmängden till en olikhet ' +
                'som ett skuggat band. En dragbar testpunkt lyser grönt om talet uppfyller ' +
                'olikheten och rött annars.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
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
        legend.appendChild(legendItem(COL.band, 'lösningsmängd'));
        legend.appendChild(legendItem(COL.good, 'testpunkt uppfyller'));
        legend.appendChild(legendItem(COL.bad, 'uppfyller inte'));

        // Formelrad: tre delar (VL, jämförelsetecken, HL) i en flexrad
        var formelMain = document.createElement('div');
        formelMain.className = 'lab-vis-formel';
        formelMain.style.fontSize = '19px';
        formelMain.style.gap = '9px';
        formelMain.style.alignItems = 'baseline';
        card.appendChild(formelMain);
        var lhsSpan = document.createElement('div');
        var opSpan = document.createElement('div');
        opSpan.style.fontFamily = 'KaTeX_Main, KaTeX_Math, serif';
        opSpan.style.fontSize = '1.21em';
        opSpan.style.lineHeight = '1';
        opSpan.style.color = COL.ink;
        opSpan.style.display = 'inline-block';
        var rhsSpan = document.createElement('div');
        formelMain.appendChild(lhsSpan);
        formelMain.appendChild(opSpan);
        formelMain.appendChild(rhsSpan);

        var historyBox = document.createElement('div');
        historyBox.style.cssText = 'margin-top:2px;';
        card.appendChild(historyBox);

        var resultLine = document.createElement('div');
        resultLine.className = 'lab-vis-formel';
        resultLine.style.color = COL.good;
        resultLine.style.fontSize = '17px';
        card.appendChild(resultLine);

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

        // ── Steg-pills ────────────────────────────────────────────────
        var STEP_LABELS = ['1 · Lösningsmängden', '2 · Lös olikheten', '3 · Testa en till'];
        var stepBtns = [];
        STEP_LABELS.forEach(function (label, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = label;
            b.addEventListener('click', function () { goToStep(i + 1); });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Operationsknapp + ångra ──────────────────────────────────
        var opBtn = document.createElement('button');
        opBtn.type = 'button';
        opBtn.className = 'lab-btn';
        opBtn.addEventListener('click', function () { performOp(); });
        actions.appendChild(opBtn);

        var undoBtn = document.createElement('button');
        undoBtn.type = 'button';
        undoBtn.className = 'lab-graf-reset';
        undoBtn.textContent = 'Ångra';
        undoBtn.addEventListener('click', function () { undo(); });
        actions.appendChild(undoBtn);

        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () { loadProblem(state.probIdx, false); update(); });
        foot.appendChild(reset);

        // ── Testpunkt: glidare + sifferfält ──────────────────────────
        var TX_MIN = -12, TX_MAX = 12, TX_STEP = 0.5;
        var row = document.createElement('div');
        row.className = 'lab-graf-row';
        var lbl = document.createElement('label');
        lbl.className = 'lab-graf-lbl';
        var em = document.createElement('em');
        em.textContent = 'x';
        lbl.appendChild(em);
        var txSlider = document.createElement('input');
        txSlider.type = 'range';
        txSlider.className = 'lab-graf-slider';
        txSlider.min = TX_MIN; txSlider.max = TX_MAX; txSlider.step = TX_STEP;
        txSlider.setAttribute('aria-label', 'Testpunktens värde x');
        var txField = document.createElement('input');
        txField.type = 'number';
        txField.className = 'lab-graf-num';
        txField.min = TX_MIN; txField.max = TX_MAX; txField.step = TX_STEP;
        txField.setAttribute('inputmode', 'decimal');
        txField.setAttribute('aria-label', 'Testpunktens värde x');
        function paintTxSlider() {
            var pct = clampNum((state.testX - TX_MIN) / (TX_MAX - TX_MIN) * 100, 0, 100);
            var c = testColor();
            txSlider.style.background = 'linear-gradient(to right, ' + c + ' 0%, ' + c + ' ' + pct +
                '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
        }
        function syncTx() {
            txSlider.value = state.testX;
            txField.value = fmt(state.testX, 1).replace(',', '.');
            paintTxSlider();
        }
        function applyTx(v, from) {
            if (!isFinite(v)) return;
            stopFlip();
            state.testX = clampNum(Math.round(v / TX_STEP) * TX_STEP, TX_MIN, TX_MAX);
            if (from !== 'slider') txSlider.value = state.testX;
            if (from !== 'field') txField.value = fmt(state.testX, 1).replace(',', '.');
            paintTxSlider();
            update();
        }
        txSlider.addEventListener('input', function () { applyTx(parseFloat(txSlider.value), 'slider'); });
        txField.addEventListener('input', function () { applyTx(parseFloat(String(txField.value).replace(',', '.')), 'field'); });
        txField.addEventListener('blur', function () { txField.value = fmt(state.testX, 1).replace(',', '.'); });
        lbl.appendChild(txSlider);
        row.appendChild(lbl);
        row.appendChild(txField);
        controls.appendChild(row);

        // ── Problem-logik ────────────────────────────────────────────
        function band(s) {
            var effRhs = s.rhs - s.constLeft;
            var boundary = effRhs / s.coeffX;
            var upper = cmpIsUpper(s.cmp);
            var actualUpper = s.coeffX > 0 ? upper : !upper;
            return { boundary: boundary, upper: actualUpper, closed: cmpIsClosed(s.cmp) };
        }
        function testSat(x, b) {
            if (b.upper) return b.closed ? x >= b.boundary - 1e-9 : x > b.boundary + 1e-9;
            return b.closed ? x <= b.boundary + 1e-9 : x < b.boundary - 1e-9;
        }
        function currentBand() { return band(state); }
        function testColor() { return testSat(state.testX, currentBand()) ? COL.good : COL.bad; }

        function nextOp(s) {
            if (s.constLeft > 0) {
                var v1 = s.constLeft;
                return {
                    kind: 'const', flips: false, amount: v1,
                    label: '− ' + fmt0(v1) + ' på båda led',
                    apply: function (t) { t.constLeft -= v1; t.rhs -= v1; }
                };
            }
            if (s.constLeft < 0) {
                var v2 = -s.constLeft;
                return {
                    kind: 'const', flips: false, amount: v2,
                    label: '+ ' + fmt0(v2) + ' på båda led',
                    apply: function (t) { t.constLeft += v2; t.rhs += v2; }
                };
            }
            if (s.coeffX !== 1) {
                var c = s.coeffX;
                var doesFlip = c < 0;
                var lbl2 = (c === -1) ? 'Multiplicera båda led med −1' : ('Dela båda led med ' + fmtDisp(c, 0));
                return {
                    kind: 'divide', flips: doesFlip, amount: c,
                    label: lbl2,
                    apply: function (t) { t.rhs = t.rhs / c; t.coeffX = 1; if (doesFlip) t.cmp = cmpFlip(t.cmp); }
                };
            }
            return null;
        }
        function isSolved(s) { return s.coeffX === 1 && s.constLeft === 0; }

        function loadProblem(idx, resetTestX) {
            stopFlip();
            var P = PROBLEMS[idx];
            state.probIdx = idx;
            state.coeffX = P.coeffX; state.constLeft = P.constLeft; state.cmp = P.cmp; state.rhs = P.rhs;
            state.origTex = sideTex(P.coeffX, P.constLeft) + ' ' + cmpTex(P.cmp) + ' ' + fmtTex(P.rhs);
            state.origBand = band(state);
            state.history = [];
            state.undoStack = [];
            if (resetTestX) state.testX = P.defaultTestX;
            syncTx();
        }

        function goToStep(n) {
            var targetProb = (n === 3) ? 1 : 0;
            var probChanged = targetProb !== state.probIdx;
            loadProblem(targetProb, probChanged || n === 1);
            state.step = n;
            update();
        }

        // ── Operationer + ångra ────────────────────────────────────────
        function snapshot() {
            return {
                coeffX: state.coeffX, constLeft: state.constLeft, cmp: state.cmp, rhs: state.rhs,
                historyLen: state.history.length
            };
        }
        function performOp() {
            if (state.animating) return;
            var op = nextOp(state);
            if (!op) return;
            var pre = { coeffX: state.coeffX, constLeft: state.constLeft, cmp: state.cmp, rhs: state.rhs };
            var post = { coeffX: state.coeffX, constLeft: state.constLeft, cmp: state.cmp, rhs: state.rhs };
            op.apply(post);
            state.undoStack.push(snapshot());
            if (op.flips) {
                runFlip(pre, post, op.label);
            } else {
                state.coeffX = post.coeffX; state.constLeft = post.constLeft;
                state.cmp = post.cmp; state.rhs = post.rhs;
                state.history.push({ tex: sideTex(state.coeffX, state.constLeft) + ' ' + cmpTex(state.cmp) + ' ' + fmtTex(state.rhs), label: op.label, flip: false });
                update();
            }
        }
        function undo() {
            if (state.animating || !state.undoStack.length) return;
            var backup = state.undoStack.pop();
            state.coeffX = backup.coeffX; state.constLeft = backup.constLeft;
            state.cmp = backup.cmp; state.rhs = backup.rhs;
            state.history.length = backup.historyLen;
            update();
        }

        // ── Speglingsanimation (multiplikation/division med negativt tal) ─
        function stopFlip() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            if (flip) {
                // Hoppa direkt till slutläget om animationen avbryts.
                state.coeffX = flip.post.coeffX; state.constLeft = flip.post.constLeft;
                state.cmp = flip.post.cmp; state.rhs = flip.post.rhs;
            }
            flip = null;
            state.animating = false;
        }
        function runFlip(pre, post, opLabel) {
            if (animId != null) cancelAnimationFrame(animId);
            flip = { pre: pre, post: post, opLabel: opLabel, e: 1, swapped: false };
            state.animating = true;
            updateButtons();
            var t0 = null, DUR = 1200;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DUR, 0, 1);
                flip.e = Math.cos(2 * Math.PI * p);
                if (!flip.swapped && p >= 0.5) {
                    flip.swapped = true;
                    state.coeffX = post.coeffX; state.constLeft = post.constLeft;
                    state.cmp = post.cmp; state.rhs = post.rhs;
                }
                renderScene();
                renderFormula();
                if (p < 1) animId = requestAnimationFrame(frame);
                else {
                    animId = null;
                    flip = null;
                    state.animating = false;
                    state.history.push({
                        tex: sideTex(state.coeffX, state.constLeft) + ' ' + cmpTex(state.cmp) + ' ' + fmtTex(state.rhs),
                        label: opLabel, flip: true
                    });
                    update();
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Drag av testpunkten i scenen ───────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var xw = toWorldX(e.clientX);
            applyTx(clampNum(Math.round(xw / TX_STEP) * TX_STEP, TX_MIN, TX_MAX), 'drag');
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita tallinjen ───────────────────────────────────────────
        var clipId = 'ov-clip-' + (uid++);
        function rayArrow(xTip, y, dir) {
            var AHl = 10, AWl = 5.5;
            var back = xTip + (dir === 1 ? -AHl : AHl);
            return svgEl('polygon', {
                points: xTip + ',' + y + ' ' + back + ',' + (y - AWl) + ' ' + back + ',' + (y + AWl),
                fill: COL.band
            });
        }
        function renderScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var b = currentBand();
            var sx = flip ? flip.e : 1;
            var textOpacity = Math.max(0.1, Math.abs(sx));

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: 0, y: 0, width: W, height: H }));
            defs.appendChild(cp);
            svg.appendChild(defs);

            // Transformerbar grupp: axel, ticks, band, gränspunkt, testpunkt.
            var gShapes = svgEl('g', {});
            gShapes.style.transformOrigin = X(0) + 'px ' + AXIS_Y + 'px';
            gShapes.style.transform = 'scaleX(' + sx.toFixed(4) + ')';
            svg.appendChild(gShapes);

            // Statisk textlager (siffror/etiketter) — tonas ned mitt i flippen.
            var gText = svgEl('g', { opacity: textOpacity.toFixed(3) });
            svg.appendChild(gText);

            // Grundlinjen
            gShapes.appendChild(svgEl('line', {
                x1: X(XMIN), y1: AXIS_Y, x2: X(XMAX), y2: AXIS_Y,
                stroke: COL.ink, 'stroke-width': 1.4
            }));

            // Ticks var 2:a enhet + siffror (hoppa etikett nära gränspunkten)
            for (var t = -12; t <= 12; t += 2) {
                gShapes.appendChild(svgEl('line', {
                    x1: X(t), y1: AXIS_Y - 5, x2: X(t), y2: AXIS_Y + 5,
                    stroke: COL.ink, 'stroke-width': 1.2
                }));
                if (Math.abs(t - b.boundary) < 0.8) continue;
                gText.appendChild(svgVarText(
                    { x: X(t), y: AXIS_Y + 22, 'font-size': 12, 'text-anchor': 'middle', fill: COL.inkSoft },
                    [String(t)]));
            }

            // Lösningsband (rät stråle) + pilspets vid ytteränden
            var edgeVal = b.upper ? XMAX - 0.3 : XMIN + 0.3;
            gShapes.appendChild(svgEl('line', {
                x1: X(b.boundary), y1: AXIS_Y, x2: X(edgeVal), y2: AXIS_Y,
                stroke: COL.band, 'stroke-width': 4, 'stroke-linecap': 'butt'
            }));
            gShapes.appendChild(rayArrow(X(edgeVal), AXIS_Y, b.upper ? 1 : -1));

            // Gränspunkt: öppen ring (< eller >) eller fylld prick (≤/≥)
            if (b.closed) {
                gShapes.appendChild(svgEl('circle', { cx: X(b.boundary), cy: AXIS_Y, r: 6.5, fill: COL.band }));
            } else {
                gShapes.appendChild(svgEl('circle', { cx: X(b.boundary), cy: AXIS_Y, r: 6.5, fill: COL.paper, stroke: COL.band, 'stroke-width': 2.2 }));
            }
            gText.appendChild(svgVarText(
                { x: X(b.boundary), y: AXIS_Y - 13, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.band },
                [fmtDisp(b.boundary, 2)]));

            // Testpunkt: markör ovanför linjen + streckad droppLinje + etikett
            var tColor = testSat(state.testX, b) ? COL.good : COL.bad;
            var txp = X(state.testX), typ = AXIS_Y - 34;
            gShapes.appendChild(svgEl('line', {
                x1: txp, y1: typ + 7, x2: txp, y2: AXIS_Y - 6,
                stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '3 3'
            }));
            gShapes.appendChild(svgEl('circle', { cx: txp, cy: typ, r: 7.2, fill: tColor }));
            var hit = svgEl('circle', { cx: txp, cy: typ, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopFlip(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
            gText.appendChild(svgVarText(
                { x: txp, y: typ - 14, 'font-size': 13, 'text-anchor': 'middle', fill: tColor },
                ['*x', ' = ', fmtDisp(state.testX, 1)]));
        }

        // ── Formelrad (VL / tecken / HL), tecknet swappar vid flip-mitten ─
        function renderFormula() {
            var s = state;
            lhsSpan.style.color = COL.ink;
            katexInto(lhsSpan, sideTex(s.coeffX, s.constLeft));
            rhsSpan.style.color = COL.ink;
            katexInto(rhsSpan, fmtTex(s.rhs));
            var sxAbs = flip ? Math.abs(flip.e) : 1;
            opSpan.style.transform = 'scaleX(' + (flip ? flip.e.toFixed(4) : 1) + ')';
            opSpan.style.color = flip ? COL.bad : COL.ink;
            opSpan.textContent = s.cmp;
            opSpan.style.opacity = Math.max(0.15, sxAbs).toFixed(3);
        }

        // ── Historik + facit ───────────────────────────────────────────
        function renderHistory() {
            historyBox.innerHTML = '';
            state.history.forEach(function (h) {
                var rowEl = document.createElement('div');
                rowEl.style.cssText = 'display:flex;align-items:center;justify-content:center;' +
                    'gap:8px;font-size:12.5px;color:var(--lab-ink-soft);margin-top:3px;flex-wrap:wrap;';
                var lblEl = document.createElement('span');
                lblEl.textContent = h.label + (h.flip ? ' — tecknet vändes!' : '') + ' →';
                lblEl.style.fontFamily = 'var(--lab-font-mono)';
                if (h.flip) lblEl.style.color = COL.bad;
                rowEl.appendChild(lblEl);
                var eq = document.createElement('span');
                katexInto(eq, h.tex);
                rowEl.appendChild(eq);
                historyBox.appendChild(rowEl);
            });
        }

        // ── Note (blandad text + math) ────────────────────────────────
        function subSteps(s, x) {
            var val = s.coeffX * x + s.constLeft;
            return {
                tex: (s.coeffX ? fmtTex(s.coeffX) + '\\cdot(' + fmtTex(x, 1) + ')' : '') +
                    (s.constLeft ? (s.constLeft > 0 ? ' + ' : ' - ') + fmtTex(Math.abs(s.constLeft)) : '') +
                    ' = ' + fmtTex(val, 2),
                val: val
            };
        }
        function updateNote() {
            note.style.color = '';
            if (state.animating) {
                renderParts(note, [{ text: 'Olikhetstecknet vänds — hela tallinjen speglas kring 0.' }]);
                return;
            }
            if (state.step === 1) {
                var b1 = currentBand();
                var sat1 = testSat(state.testX, b1);
                var sub1 = subSteps(state, state.testX);
                note.style.color = sat1 ? COL.good : COL.bad;
                renderParts(note, [
                    { math: 'x = ' + fmtTex(state.testX, 1) }, { text: ': ' },
                    { math: sub1.tex + '\\ ' + cmpTex(state.cmp) + '\\ ' + fmtTex(state.rhs, 2) },
                    { text: sat1 ? ' — sant, olikheten uppfylls.' : ' — falskt, olikheten uppfylls inte.' }
                ]);
                return;
            }
            if (isSolved(state)) {
                var bF = currentBand();
                var satF = testSat(state.testX, bF);
                var finalTex = sideTex(state.coeffX, state.constLeft) + ' ' + cmpTex(state.cmp) + ' ' + fmtTex(state.rhs);
                note.style.color = satF ? COL.good : COL.bad;
                renderParts(note, satF ? [
                    { math: 'x = ' + fmtTex(state.testX, 1) }, { text: ' uppfyller både ' },
                    { math: state.origTex }, { text: ' och ' }, { math: finalTex },
                    { text: ' — omskrivningen ändrade inte lösningarna, bara skrivsättet.' }
                ] : [
                    { math: 'x = ' + fmtTex(state.testX, 1) }, { text: ' uppfyller varken ' },
                    { math: state.origTex }, { text: ' eller ' }, { math: finalTex },
                    { text: ' — omskrivningen ändrade inte lösningarna, bara skrivsättet.' }
                ]);
                return;
            }
            if (state.history.length) {
                var last = state.history[state.history.length - 1];
                renderParts(note, [
                    { text: 'Vi gjorde ' + last.label + '. Lösningsmängden är fortfarande exakt densamma — bara skrivsättet ändrades.' }
                ]);
                return;
            }
            note.textContent = '';
        }

        // ── Knappar + instr per steg ────────────────────────────────────
        var INSTR = {
            1: 'Dra i testpunkten (eller skriv in ett värde) och se om talet uppfyller olikheten. ' +
               'Grönt betyder att det stämmer, rött att det inte gör det. Var går gränsen mellan de gröna och röda talen?',
            2: 'Lös olikheten steg för steg med knappen nedanför. Håll ett öga på testpunkten — den ' +
               'ska förbli likadan (grön eller röd) genom hela lösningen, för lösningsmängden ändras aldrig, ' +
               'bara hur den skrivs. Vid division/multiplikation med ett negativt tal speglas hela tallinjen ' +
               'och tecknet vänds.',
            3: 'Testa en ny olikhet på egen hand. Dra testpunkten för att undersöka den, och lös den sedan ' +
               'med knapparna.'
        };
        function updateButtons() {
            var op = state.step === 1 ? null : nextOp(state);
            var busy = state.animating;
            if (state.step === 1) {
                opBtn.style.display = 'none';
                undoBtn.style.display = 'none';
            } else if (!op) {
                opBtn.style.display = 'none';
                undoBtn.style.display = state.undoStack.length ? '' : 'none';
                undoBtn.disabled = busy;
            } else {
                opBtn.style.display = ''; opBtn.disabled = busy; opBtn.textContent = op.label;
                undoBtn.style.display = state.undoStack.length ? '' : 'none';
                undoBtn.disabled = busy;
            }
            actions.style.display = (state.step === 1) ? 'none' : '';
        }

        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            historyBox.style.display = (state.step === 1 || !state.history.length) ? 'none' : '';
            if (isSolved(state) && !state.animating) {
                resultLine.style.display = '';
                renderParts(resultLine, [{ math: 'x\\ ' + cmpTex(state.cmp) + '\\ ' + fmtTex(state.rhs) }]);
            } else {
                resultLine.style.display = 'none';
            }
            renderScene();
            renderFormula();
            renderHistory();
            updateNote();
            updateButtons();
            paintTxSlider();
        }

        loadProblem(0, true);
        update();

        return {
            destroy: function () {
                if (animId != null) cancelAnimationFrame(animId);
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma1c-2.11'] = { mount: mount };
})();
