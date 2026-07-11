/* ma2c-6.5.js — visualisering: "Galtonbrädan — normalfördelningen växer
 * fram" (hör till ma2c-6.5, Normalfördelning; se även ma2c-6.4,
 * Standardavvikelse, för beteckningen sigma).
 *
 * Kärninsikt: många små oberoende slumpsteg (kulan studsar vänster/höger
 * med lika sannolikhet vid varje pinne) ackumuleras till en förutsägbar
 * klockform — normalfördelningen är slumpens eget mönster, inte en
 * påhittad kurva.
 *
 * Modellen: en Galtonbräda med ROWS = 11 rader pinnar. En kula som
 * passerar alla rader har gjort 11 oberoende vänster/höger-val; antalet
 * högersteg k (0..11) avgör vilket av de 12 facken kulan hamnar i.
 * k är binomialfördelat, Bin(11, 0,5), med väntevärde mu = 11/2 = 5,5 och
 * standardavvikelse sigma = sqrt(11 * 0,25) ≈ 1,66 (mätt i fack/pinn-steg)
 * — binomialfördelningen närmar sig normalfördelningen redan vid detta
 * blygsamma antal rader.
 *
 * Tre steg (lager):
 *   1. Släpp kulor   — bräda + växande histogram. +1/+100/+1000-kulor.
 *   2. Mönstret       — normalfördelningskurvan (röd) läggs ovanpå
 *                        histogrammet; live-andel mittersta/yttersta fack.
 *   3. 68–95-regeln   — zonerna mu +/- sigma och mu +/- 2*sigma skuggas
 *                        (två gröna toner); live-andel jämförs med
 *                        68,2 % / 95,4 % (samma tal som genomgångens
 *                        normalfördelningsfigur).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / graf.js).
 * API: window.VISUALISERINGAR['ma2c-6.5'] = { mount(el) -> { destroy() } }.
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
    function fmtInt(n) {
        var s = Math.round(n).toString();
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    function pct(x) { return fmt(x * 100, 1).replace('-', '−') + ' %'; }

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
        peg: '#8a92a0',
        bar: '#2563c9',       // histogram — blå
        curve: '#c8324a',     // normalfördelningskurvan — röd
        zoneText: '#3f6b34',  // formeltext för sigma-zonerna
        zone1: 'rgba(74,125,58,0.30)',  // mu +/- sigma — mörkare grön
        zone2: 'rgba(74,125,58,0.14)',  // mu +/- 2*sigma — ljusare grön
        dash: 'rgba(31,37,48,0.35)'
    };

    var uid = 0;

    function mount(el) {
        // ── Modellkonstanter ────────────────────────────────────────────
        var ROWS = 11;                       // antal pinnrader
        var BINS = ROWS + 1;                 // antal fack (0..ROWS)
        var MU = ROWS / 2;                   // väntevärde, i fack-enheter
        var SIGMA = Math.sqrt(ROWS * 0.25);  // standardavvikelse, i fack-enheter
        var CAP_BALLS = 6;                   // max kulor animerade samtidigt

        var state = { step: 1, showCurve: false, totalBalls: 0 };
        var counts = new Array(BINS).fill(0);
        var balls = [];        // kulor i luften: {pts:[{x,y}], t0, dur, bin}
        var ballUid = 0;
        var animId = null;

        // ── Geometri ─────────────────────────────────────────────────────
        var W = 560, H = 392;
        var colSpacing = 32;
        var centerX = 280;
        var pegTop = 36, rowSpacing = 14;
        var lastPegY = pegTop + (ROWS - 1) * rowSpacing;
        var binTop = lastPegY + 36;
        var maxBarHeight = 116;
        var baseline = binTop + maxBarHeight;
        var barW = 20;
        var plotLeft = centerX - (ROWS / 2) * colSpacing - colSpacing / 2;
        var plotRight = centerX + (ROWS / 2) * colSpacing + colSpacing / 2;
        var axisRightX = plotRight + 24;

        function pegX(r, c) { return centerX + (c - r / 2) * colSpacing; }
        function pegY(r) { return pegTop + r * rowSpacing; }
        function binX(k) { return centerX + (k - ROWS / 2) * colSpacing; }

        function midBins() {
            var m = ROWS / 2;
            return Number.isInteger(m) ? [m] : [Math.floor(m), Math.ceil(m)];
        }
        function sumBins(list) {
            var s = 0;
            for (var i = 0; i < list.length; i++) s += counts[list[i]];
            return s;
        }
        // Antal kulor inom mu +/- nSigma*sigma, med kantfacken viktade efter
        // hur stor del av facket (bredd 1, centrerat på k) som ligger i
        // zonen. Utan viktningen räknas hela kantfack med och andelen blir
        // systematiskt ~77 % i stället för regelns ~68 % — zonskuggningen
        // skär ju synligt genom kantfacken, så viktningen matchar bilden.
        function zoneCount(nSigma) {
            var lo = MU - nSigma * SIGMA, hi = MU + nSigma * SIGMA;
            var s = 0;
            for (var k = 0; k <= ROWS; k++) {
                var a = Math.max(lo, k - 0.5), b = Math.min(hi, k + 0.5);
                if (b > a) s += counts[k] * (b - a);
            }
            return s;
        }
        function gaussDensity(k) {
            var dz = k - MU;
            return Math.exp(-(dz * dz) / (2 * SIGMA * SIGMA)) / (SIGMA * Math.sqrt(2 * Math.PI));
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Galtonbrädan — normalfördelningen växer fram';
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
            'aria-label': 'Galtonbräda med elva rader pinnar ovanför ett växande ' +
                'histogram över tolv fack. Kulor släpps genom brädan och studsar ' +
                'slumpmässigt åt vänster eller höger vid varje pinne.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelMu = document.createElement('div');
        formelMu.className = 'lab-vis-formel';
        formelMu.style.color = COL.zoneText;
        card.appendChild(formelMu);

        var formelSigma = document.createElement('div');
        formelSigma.className = 'lab-vis-formel';
        formelSigma.style.color = COL.zoneText;
        card.appendChild(formelSigma);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Släpp kulor' },
            { n: 2, label: '2 · Mönstret' },
            { n: 3, label: '3 · 68–95-regeln' }
        ];
        var INSTR = {
            1: 'Släpp kulor genom Galtonbrädan. Vid varje pinne studsar kulan åt ' +
               'vänster eller höger med lika stor sannolikhet — helt slumpmässigt. ' +
               'Antalet högersteg (<em>k</em>) avgör vilket av de tolv facken kulan ' +
               'hamnar i. Innan du börjar: var tror du kulorna samlas när många har ' +
               'fallit — jämnt utspritt över alla fack, eller mest i mitten?',
            2: 'Klicka i "Visa kurvan" för att lägga en normalfördelningskurva ' +
               '(röd) ovanpå histogrammet. Fastän varje enskild kula bara studsar ' +
               'slumpmässigt åt vänster eller höger bildar många kulor tillsammans ' +
               'en förutsägbar klockform — normalfördelningen.',
            3: '68–95-regeln säger att ungefär 68 % av alla värden i en ' +
               'normalfördelning ligger inom en standardavvikelse (<em>σ</em>) från ' +
               'medelvärdet (<em>μ</em>), och ungefär 95 % ligger inom två ' +
               'standardavvikelser. De skuggade zonerna visar detta — jämför med ' +
               'hur stor andel av dina kulor som faktiskt hamnat där.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                if (s.n >= 3) { state.showCurve = true; curveCb.checked = true; }
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
        var legBar = legendItem(COL.bar, 'kulor (histogram)');
        var legCurve = legendItem(COL.curve, 'normalfördelning');
        var legZone1 = legendItem('#4a7d3a', '<em>μ</em> ± <em>σ</em>');
        var legZone2 = legendItem('rgba(74,125,58,0.55)', '<em>μ</em> ± 2<em>σ</em>');
        legend.appendChild(legBar);
        legend.appendChild(legCurve);
        legend.appendChild(legZone1);
        legend.appendChild(legZone2);

        // ── Actions: räknare, kula-knappar, kryssruta ───────────────────────
        var counterSpan = document.createElement('span');
        counterSpan.style.fontSize = '13.5px';
        counterSpan.style.fontWeight = '600';
        counterSpan.style.color = COL.axis;
        actions.appendChild(counterSpan);

        function makeBtn(txt, fn) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = txt;
            b.addEventListener('click', fn);
            actions.appendChild(b);
            return b;
        }
        makeBtn('+1 kula', function () { spawnBall(); });
        makeBtn('+100 kulor', function () { dropBatch(100); });
        makeBtn('+1000 kulor', function () { dropBatch(1000); });

        var curveLabel = document.createElement('label');
        curveLabel.className = 'lab-graf-check';
        var curveCb = document.createElement('input');
        curveCb.type = 'checkbox';
        curveCb.addEventListener('change', function () {
            state.showCurve = curveCb.checked;
            update();
        });
        curveLabel.appendChild(curveCb);
        var curveTxt = document.createElement('span');
        curveTxt.innerHTML = 'Visa kurvan';
        curveLabel.appendChild(curveTxt);
        actions.appendChild(curveLabel);

        // ── Nollställ ────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Nollställ';
        reset.addEventListener('click', function () {
            stopAnim();
            counts = new Array(BINS).fill(0);
            balls = [];
            state.totalBalls = 0;
            state.showCurve = false;
            curveCb.checked = false;
            update();
        });
        foot.appendChild(reset);

        // ── Skala (delad av bars/kurva/kulor) ───────────────────────────────
        function niceStep(maxVal) {
            if (maxVal <= 0) return 1;
            var raw = maxVal / 4;
            var mag = Math.pow(10, Math.floor(Math.log10(raw)));
            var norm = raw / mag;
            var step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
            return step * mag;
        }
        function getScale() {
            var maxActual = 0;
            for (var i = 0; i < counts.length; i++) if (counts[i] > maxActual) maxActual = counts[i];
            var showCurveNow = (state.step === 2 && state.showCurve) || state.step >= 3;
            var curvePeak = showCurveNow ? state.totalBalls * gaussDensity(MU) : 0;
            var effMax = Math.max(maxActual, curvePeak, 1);
            var yScale = maxBarHeight / (effMax * 1.15);
            return { yScale: yScale, effMax: effMax, showCurveNow: showCurveNow };
        }

        // ── Kulanimation ─────────────────────────────────────────────────
        function computePath(landY) {
            var col = 0;
            var pts = [{ x: centerX, y: pegTop - 26 }];
            for (var r = 0; r < ROWS; r++) {
                pts.push({ x: pegX(r, col), y: pegY(r) });
                if (Math.random() < 0.5) col++;
            }
            var bin = col;
            pts.push({ x: binX(bin), y: landY });
            return { pts: pts, bin: bin };
        }
        function spawnBall() {
            if (balls.length >= CAP_BALLS) {
                // Redan max antal kulor i luften: lös direkt utan animation.
                var quick = computePath(0);
                counts[quick.bin]++;
                state.totalBalls++;
                update();
                return;
            }
            var scale = getScale();
            var provisional = counts.slice();
            var path = computePath(0); // landY beräknas nedan från stapelhöjd
            var landY = baseline - (provisional[path.bin] + 0.5) * scale.yScale;
            path.pts[path.pts.length - 1].y = Math.max(binTop - 6, landY);
            balls.push({ pts: path.pts, t0: null, dur: 900 + path.pts.length * 30, bin: path.bin, id: ballUid++ });
            runAnim();
        }
        function dropBatch(n) {
            for (var i = 0; i < n; i++) {
                var col = 0;
                for (var r = 0; r < ROWS; r++) if (Math.random() < 0.5) col++;
                counts[col]++;
            }
            state.totalBalls += n;
            update();
        }
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            balls = [];
        }
        function runAnim() {
            if (animId != null) return;
            function frame(ts) {
                for (var i = balls.length - 1; i >= 0; i--) {
                    var b = balls[i];
                    if (b.t0 == null) b.t0 = ts;
                    var p = clampNum((ts - b.t0) / b.dur, 0, 1);
                    b.p = p;
                    if (p >= 1) {
                        counts[b.bin]++;
                        state.totalBalls++;
                        balls.splice(i, 1);
                    }
                }
                drawScene();
                updateCounterAndNote();
                if (balls.length > 0) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }
        function ballPos(b) {
            var segs = b.pts.length - 1;
            var seg = clampNum(Math.floor(b.p * segs), 0, segs - 1);
            var localT = b.p * segs - seg;
            var p0 = b.pts[seg], p1 = b.pts[seg + 1];
            return { x: p0.x + (p1.x - p0.x) * localT, y: p0.y + (p1.y - p0.y) * localT };
        }

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var sc = getScale();
            var yScale = sc.yScale, showCurveNow = sc.showCurveNow;
            var showZones = state.step >= 3;
            var i;

            // Zonskuggning (bakgrund, under allt annat)
            if (showZones) {
                var x2a = binX(MU - 2 * SIGMA), x2b = binX(MU + 2 * SIGMA);
                var x1a = binX(MU - SIGMA), x1b = binX(MU + SIGMA);
                svg.appendChild(svgEl('rect', {
                    x: x2a, y: pegTop - 12, width: (x2b - x2a), height: (baseline - (pegTop - 12)),
                    fill: COL.zone2
                }));
                svg.appendChild(svgEl('rect', {
                    x: x1a, y: pegTop - 12, width: (x1b - x1a), height: (baseline - (pegTop - 12)),
                    fill: COL.zone1
                }));
            }

            // Horisontella hjälplinjer + count-etiketter (y-skala)
            var step = Math.max(1, niceStep(sc.effMax));
            for (var c = step; c <= sc.effMax * 1.05; c += step) {
                var gy = baseline - c * yScale;
                svg.appendChild(svgEl('line', { x1: plotLeft - 8, y1: gy, x2: plotRight + 8, y2: gy, stroke: COL.grid, 'stroke-width': 1 }));
                svg.appendChild(svgVarText(
                    { x: plotLeft - 12, y: gy + 3.5, 'font-size': 10, 'text-anchor': 'end', fill: COL.tick },
                    [fmtInt(c)]));
            }

            // Baslinje (x-axel) med pilspets
            svg.appendChild(svgEl('line', { x1: plotLeft - 10, y1: baseline, x2: axisRightX, y2: baseline, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', {
                points: (axisRightX + 8) + ',' + baseline + ' ' + (axisRightX - 2) + ',' + (baseline - 4.5) + ' ' + (axisRightX - 2) + ',' + (baseline + 4.5),
                fill: COL.axis
            }));
            svg.appendChild(svgVarText(
                { x: axisRightX + 10, y: baseline + 4, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis },
                ['*k']));

            // Fack-index under baslinjen
            for (i = 0; i <= ROWS; i++) {
                svg.appendChild(svgVarText(
                    { x: binX(i), y: baseline + 15, 'font-size': 10, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }

            // Klippram för histogram + kurva
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: 0, y: binTop - 40, width: W, height: baseline - (binTop - 40) }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Histogramstaplar
            for (i = 0; i <= ROWS; i++) {
                var h2 = counts[i] * yScale;
                if (h2 < 0.6) continue;
                g.appendChild(svgEl('rect', {
                    x: binX(i) - barW / 2, y: baseline - h2, width: barW, height: h2,
                    fill: COL.bar, stroke: COL.axis, 'stroke-width': 1
                }));
            }

            // Normalfördelningskurvan (ingen mening att rita en platt nolla)
            if (showCurveNow && state.totalBalls > 0) {
                var d = '', N = 90;
                for (i = 0; i <= N; i++) {
                    var kk = -0.6 + (ROWS + 1.2) * i / N;
                    var yy = baseline - state.totalBalls * gaussDensity(kk) * yScale;
                    yy = Math.max(binTop - 30, yy);
                    d += (i === 0 ? 'M' : 'L') + binX(kk).toFixed(1) + ' ' + yy.toFixed(1) + ' ';
                }
                g.appendChild(svgEl('path', {
                    d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.2,
                    'stroke-linejoin': 'round', 'stroke-linecap': 'round'
                }));
            }

            // Pinnar (ritas ovanpå staplarna eftersom de ligger i egen zon ovanför)
            for (var r = 0; r < ROWS; r++) {
                for (var cIdx = 0; cIdx <= r; cIdx++) {
                    svg.appendChild(svgEl('circle', { cx: pegX(r, cIdx), cy: pegY(r), r: 2.6, fill: COL.peg }));
                }
            }
            // Tratt ovanför pinnarna (dekorativ)
            svg.appendChild(svgEl('path', {
                d: 'M ' + (centerX - 15) + ' ' + (pegTop - 34) + ' L ' + (centerX + 15) + ' ' + (pegTop - 34) +
                   ' L ' + (centerX + 4) + ' ' + (pegTop - 12) + ' L ' + (centerX - 4) + ' ' + (pegTop - 12) + ' Z',
                fill: 'none', stroke: COL.axis, 'stroke-width': 1.2
            }));

            // Kulor i luften
            balls.forEach(function (b) {
                var pos = ballPos(b);
                svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 5, fill: COL.bar, stroke: COL.axis, 'stroke-width': 1 }));
            });
        }

        // ── Formel (mu, sigma) ────────────────────────────────────────────
        function updateFormula() {
            if (state.step >= 3) {
                katexInto(formelMu,
                    '\\mu = \\dfrac{n}{2} = \\dfrac{' + ROWS + '}{2} = ' + fmtTex(MU, 1));
                katexInto(formelSigma,
                    '\\sigma = \\sqrt{n \\cdot 0{,}25} = \\sqrt{' + ROWS + ' \\cdot 0{,}25} \\approx ' + fmtTex(SIGMA, 2));
            } else { formelMu.textContent = ''; formelSigma.textContent = ''; }
        }

        // ── Räknare + live-text ────────────────────────────────────────────
        function updateCounterAndNote() {
            counterSpan.textContent = 'Antal kulor: ' + fmtInt(state.totalBalls);
            var total = state.totalBalls;
            if (state.step === 2) {
                if (total === 0) { note.textContent = 'Släpp några kulor för att se mönstret.'; return; }
                var mids = midBins();
                var midShare = sumBins(mids) / total;
                var edgeShare = sumBins([0, ROWS]) / total;
                var midLabel = mids.length === 2 ? (mids[0] + ' och ' + mids[1]) : String(mids[0]);
                note.innerHTML = 'De mittersta facken (' + midLabel + ') innehåller <strong>' +
                    pct(midShare) + '</strong> av kulorna. De yttersta facken (0 och ' + ROWS +
                    ') innehåller bara <strong>' + pct(edgeShare) + '</strong> tillsammans.';
            } else if (state.step >= 3) {
                if (total === 0) { note.textContent = 'Släpp några kulor för att se mönstret.'; return; }
                var s1 = zoneCount(1) / total;
                var s2 = zoneCount(2) / total;
                note.innerHTML = 'Andel kulor inom <em>μ</em> ± <em>σ</em>: <strong>' + pct(s1) +
                    '</strong> (normalfördelningen ger 68,2 %). Andel inom <em>μ</em> ± 2<em>σ</em>: <strong>' +
                    pct(s2) + '</strong> — kantfacken viktade efter zonens överlapp (normalfördelningen ger 95,4 %).';
            } else {
                note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            legCurve.style.display = state.step >= 2 ? '' : 'none';
            legZone1.style.display = state.step >= 3 ? '' : 'none';
            legZone2.style.display = state.step >= 3 ? '' : 'none';
            curveLabel.style.display = state.step === 2 ? '' : 'none';
            if (state.step >= 3) { curveCb.checked = true; curveCb.disabled = true; state.showCurve = true; }
            else { curveCb.disabled = false; }
            formelMu.style.display = state.step >= 3 ? '' : 'none';
            formelSigma.style.display = state.step >= 3 ? '' : 'none';
            updateFormula();
            drawScene();
            updateCounterAndNote();
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
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-6.5'] = api;
})();
