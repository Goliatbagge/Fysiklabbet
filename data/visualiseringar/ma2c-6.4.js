/* ma2c-6.4.js — visualisering: "Standardavvikelsen i handen" (hör till
 * ma2c-6.4, Standardavvikelse).
 *
 * KÄRNINSIKT: standardavvikelsen är ett AVSTÅND — det typiska avståndet
 * från medelvärdet — byggt av kvadrerade avvikelser. Kvadraten straffar
 * långa avstånd hårt, så måttet är känsligt för extremvärden. Det är något
 * helt annat än variationsbredden, som bara ser på de två yttersta värdena.
 *
 * ── FORMEL (måste stämma EXAKT med data/teori/ma2c-6.4.md) ────────────────
 * Genomgången definierar (kuriosa-rutan "Varför ser formeln ut som den
 * gör?"): standardavvikelse för TOTALUNDERSÖKNING betecknas σ och delas med
 * n:
 *     σ = sqrt( ((x_1-x̄)² + (x_2-x̄)² + … + (x_n-x̄)²) / n )
 * (Stickprov betecknas s och delas i stället med n−1 — nämns kort i en
 * notis men byggs inte som eget läge här, eftersom Exempel 1 i genomgången
 * uttryckligen förutsätter totalundersökning när inget annat anges.)
 * Medelvärdet skrivs x̄ (\bar{x}), precis som i genomgången.
 *
 * Fyra steg:
 *   1. Avstånden        — dot plot 0–20, medelvärdesmarkör (triangel),
 *      band x̄ ± σ, en kvadrat per punkt (sida = |avvikelse|). Värdetabell.
 *   2. Formeln byggs     — KaTeX-uppställning: avvikelser → kvadrerade →
 *      medelvärde av kvadraterna → roten ur, med aktuella tal.
 *   3. Extremvärdet       — dra en mellanpunkt till 20: σ sväller (Δ visas)
 *      medan variationsbredden (redan satt av kant-punkterna) inte rör sig.
 *   4. Samma bredd, olika spridning — två datamängder med samma medelvärde
 *      och variationsbredd men olika σ (A klumpad + två ytterpunkter,
 *      B jämnt utspridd).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-6.2.js / ma2c-6.6.js / ma3c-2.3.js).
 * API: window.VISUALISERINGAR['ma2c-6.4'] = { mount(el) -> { destroy() } }.
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
    function fmtDelta(v, decimals) {
        var d = decimals == null ? 2 : decimals;
        var rounded = parseFloat(v.toFixed(d));
        if (rounded === 0) return '0';
        return (rounded > 0 ? '+' : '−') + fmt(Math.abs(rounded), d);
    }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    function svgText(attrs, str) {
        var t = svgEl('text', attrs);
        t.textContent = str;
        return t;
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
        axis: '#1f2530',
        tick: '#5b6472',
        dot: '#2563c9',         // datapunkter
        mean: '#c8324a',        // medelvärdesmarkör (triangel), accentröd
        bandFill: 'rgba(37,99,201,0.10)',   // x̄ ± σ-bandet, samma familj som dot
        square: '#c8324a',      // avvikelsens kvadrat — samma röd som medelvärdet/summan
        squareFill: 'rgba(200,50,74,0.16)',
        dash: 'rgba(31,37,48,0.35)'
    };

    // ── Statistik ───────────────────────────────────────────────────────
    // σ = kvadratroten ur medelvärdet av de kvadrerade avvikelserna
    // (totalundersökning: delar med n — se genomgångens kuriosa-ruta).
    function computeStats(values) {
        var n = values.length, i, sum = 0;
        for (i = 0; i < n; i++) sum += values[i];
        var mean = sum / n;
        var ss = 0;
        for (i = 0; i < n; i++) { var d = values[i] - mean; ss += d * d; }
        var variance = ss / n;
        var sigma = Math.sqrt(variance);
        var sorted = values.slice().sort(function (a, b) { return a - b; });
        return {
            n: n, mean: mean, ss: ss, variance: variance, sigma: sigma,
            min: sorted[0], max: sorted[n - 1], range: sorted[n - 1] - sorted[0],
            sorted: sorted
        };
    }

    // ── Startdata ───────────────────────────────────────────────────────
    // 8 mätvärden 0–20, medelvärde exakt 10. Max ligger redan vid 20, så
    // steg 3:s uppdrag ("dra en mellanpunkt till 20") sväller σ utan att
    // röra variationsbredden (den bestäms redan av 3 och 20).
    var BASE_MAIN = [3, 5, 8, 9, 10, 11, 14, 20];
    // Steg 4: samma medelvärde (10) och samma variationsbredd (0–20), men
    // olika spridning. A är klumpad kring mitten med två ytterpunkter,
    // B är jämnt utspridd över hela intervallet (σ verifierat olika:
    // A ≈ 5,05, B ≈ 6,44).
    var DATA_A = [0, 9, 9, 10, 10, 11, 11, 20];
    var DATA_B = [0, 3, 6, 9, 11, 14, 17, 20];

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var state = { step: 1 };
        var pointsMain = BASE_MAIN.map(function (v, i) { return { id: 'm' + i, value: v }; });
        var pointsA = DATA_A.map(function (v, i) { return { id: 'a' + i, value: v }; });
        var pointsB = DATA_B.map(function (v, i) { return { id: 'b' + i, value: v }; });
        var baseline = null;    // {mean, sigma, range} — satt när steg 3 öppnas
        var dragState = null;   // {key: 'main'|'A'|'B', idx}

        function valuesOf(points) { return points.map(function (p) { return p.value; }); }

        // ── Delad geometri (0–20 mappat likadant i alla scener) ───────────
        var mainCfg = {
            W: 560, H: 300, L: 34, R: 34,
            meanTip: 24, meanBase: 36, bandTop: 44,
            dotBase: 96, dotStep: 10, dotR: 4.5, hitR: 15,
            tickLabelY: 118, axisY: 130, fontTick: 11,
            sqScale: 6, sqMax: 126
        };
        mainCfg.PW = mainCfg.W - mainCfg.L - mainCfg.R;
        var miniCfg = {
            W: 560, H: 112, L: 34, R: 34,
            meanTip: 18, meanBase: 28, bandTop: 34,
            dotBase: 64, dotStep: 9, dotR: 4, hitR: 13,
            tickLabelY: 82, axisY: 94, fontTick: 10.5
        };
        miniCfg.PW = miniCfg.W - miniCfg.L - miniCfg.R;

        function X(cfg, v) { return cfg.L + v / 20 * cfg.PW; }
        function xToValue(svg, clientX, cfg) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * cfg.W / r.width;
            var v = (px - cfg.L) / cfg.PW * 20;
            return clampNum(Math.round(v / 0.5) * 0.5, 0, 20);
        }
        function levelsOf(points) {
            var groups = {}, levels = {};
            points.forEach(function (p) {
                var key = p.value.toFixed(1);
                if (!groups[key]) groups[key] = 0;
                levels[p.id] = groups[key];
                groups[key]++;
            });
            return levels;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Standardavvikelsen i handen';
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

        var svgMain = svgEl('svg', {
            viewBox: '0 0 ' + mainCfg.W + ' ' + mainCfg.H,
            width: mainCfg.W, height: mainCfg.H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Tallinje 0 till 20 med åtta dragbara datapunkter. En triangel ' +
                'markerar medelvärdet, ett skuggat band visar medelvärdet plus/minus ' +
                'standardavvikelsen, och en kvadrat under varje punkt har sida lika med ' +
                'punktens avstånd till medelvärdet.'
        });
        svgMain.classList.add('lab-graf-svg');
        svgMain.style.cursor = 'default';
        svgMain.style.touchAction = 'none';
        scene.appendChild(svgMain);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var sumText = document.createElement('div');
        sumText.style.cssText = 'margin:4px 2px 0;font-size:13.5px;color:' + COL.square + ';';
        card.appendChild(sumText);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.axis;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.square;
        card.appendChild(formelB);

        // Värdetabell: medelvärde, standardavvikelse, variationsbredd
        var statsGrid = document.createElement('div');
        statsGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);' +
            'gap:10px 16px;margin:12px 2px 4px;';
        card.appendChild(statsGrid);
        function statCell(labelHtml) {
            var cell = document.createElement('div');
            cell.style.cssText = 'display:flex;flex-direction:column;gap:2px;';
            var lbl = document.createElement('span');
            lbl.style.cssText = 'font-size:11px;color:' + COL.tick + ';letter-spacing:.02em;';
            lbl.innerHTML = labelHtml;
            var val = document.createElement('span');
            val.style.cssText = 'font-size:19px;font-weight:600;color:' + COL.axis + ';';
            cell.appendChild(lbl); cell.appendChild(val);
            statsGrid.appendChild(cell);
            return val;
        }
        var valMean = statCell('Medelvärdet (<em>x̄</em>)');
        var valSigma = statCell('Standardavvikelsen (<em>σ</em>)');
        var valRange = statCell('Variationsbredd');

        // Δ-panel, endast steg 3
        var deltaPanel = document.createElement('div');
        deltaPanel.style.cssText = 'display:flex;gap:24px;align-items:baseline;flex-wrap:wrap;' +
            'margin:6px 2px 4px;padding:10px 14px;border:1px solid rgba(31,37,48,0.15);' +
            'border-radius:8px;background:rgba(200,50,74,0.045);';
        card.appendChild(deltaPanel);
        function deltaCell(labelHtml, color) {
            var cell = document.createElement('div');
            cell.style.cssText = 'display:flex;flex-direction:column;gap:2px;';
            var lbl = document.createElement('span');
            lbl.style.cssText = 'font-size:11px;color:' + COL.tick + ';';
            lbl.innerHTML = labelHtml;
            var val = document.createElement('span');
            val.style.cssText = 'font-size:20px;font-weight:700;color:' + color + ';';
            cell.appendChild(lbl); cell.appendChild(val);
            deltaPanel.appendChild(cell);
            return val;
        }
        var deltaSigmaVal = deltaCell('Δ <em>σ</em> (jämfört med start)', COL.square);
        var deltaRangeVal = deltaCell('Δ variationsbredd (jämfört med start)', COL.axis);
        var deltaMeanVal = deltaCell('Δ medelvärde (jämfört med start)', COL.dot);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        // Steg 4: två datamängder A och B
        var titleA = document.createElement('div');
        titleA.textContent = 'Datamängd A — klumpad med två ytterpunkter';
        titleA.style.cssText = 'font-weight:600;font-size:13px;color:' + COL.axis + ';margin:14px 2px 2px;';
        card.appendChild(titleA);

        var sceneA = document.createElement('div');
        sceneA.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(sceneA);
        var svgA = svgEl('svg', {
            viewBox: '0 0 ' + miniCfg.W + ' ' + miniCfg.H,
            width: miniCfg.W, height: miniCfg.H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Datamängd A: dragbara punkter på en tallinje 0 till 20 med ' +
                'medelvärdesmarkör och band för medelvärdet plus/minus standardavvikelsen.'
        });
        svgA.classList.add('lab-graf-svg');
        svgA.style.cursor = 'default';
        svgA.style.touchAction = 'none';
        sceneA.appendChild(svgA);

        var summaryA = document.createElement('div');
        summaryA.style.cssText = 'font-size:12.5px;color:' + COL.axis + ';margin:2px 2px 0;';
        card.appendChild(summaryA);

        var titleB = document.createElement('div');
        titleB.textContent = 'Datamängd B — jämnt utspridd';
        titleB.style.cssText = 'font-weight:600;font-size:13px;color:' + COL.axis + ';margin:14px 2px 2px;';
        card.appendChild(titleB);

        var sceneB = document.createElement('div');
        sceneB.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(sceneB);
        var svgB = svgEl('svg', {
            viewBox: '0 0 ' + miniCfg.W + ' ' + miniCfg.H,
            width: miniCfg.W, height: miniCfg.H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Datamängd B: dragbara punkter på en tallinje 0 till 20 med ' +
                'medelvärdesmarkör och band för medelvärdet plus/minus standardavvikelsen.'
        });
        svgB.classList.add('lab-graf-svg');
        svgB.style.cursor = 'default';
        svgB.style.touchAction = 'none';
        sceneB.appendChild(svgB);

        var summaryB = document.createElement('div');
        summaryB.style.cssText = 'font-size:12.5px;color:' + COL.axis + ';margin:2px 2px 0;';
        card.appendChild(summaryB);

        var matchBox = document.createElement('div');
        matchBox.style.cssText = 'margin:12px 2px 4px;font-size:13.5px;font-weight:600;color:' + COL.axis + ';';
        card.appendChild(matchBox);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Avstånden' },
            { n: 2, label: '2 · Formeln byggs' },
            { n: 3, label: '3 · Extremvärdet' },
            { n: 4, label: '4 · Samma bredd, olika spridning' }
        ];
        var INSTR = {
            1: 'Dra punkterna på tallinjen. Medelvärdet (triangeln) och kvadraterna under ' +
               'varje punkt uppdateras direkt — kvadratens sida är punktens avstånd till ' +
               'medelvärdet. Gissa först: kan två datamängder ha exakt samma ' +
               'variationsbredd men helt olika spridning? Testa i steg 4.',
            2: 'Så byggs formeln: varje punkts avvikelse från medelvärdet kvadreras (så att ' +
               'minus- och plustecken inte tar ut varandra), kvadraterna summeras och delas ' +
               'med antalet värden — det ger medelvärdet av kvadraterna. Roten ur det talet ' +
               'är standardavvikelsen <em>σ</em>.',
            3: 'Dra en av de mellersta punkterna hela vägen till 20 (rör inte punkterna vid ' +
               'kanterna, 3 och 20). Se hur <em>σ</em> sväller nedan — och jämför med ' +
               'variationsbredden, som kanske inte ändras alls.',
            4: 'Datamängderna A och B har samma medelvärde och samma variationsbredd — men ' +
               'helt olika standardavvikelse. Dra gärna i punkterna och se hur <em>σ</em> ' +
               'reagerar på var punkterna faktiskt ligger, inte bara var de yttersta ligger.'
        };
        var NOTE = {
            1: '',
            2: '(Här antar vi en totalundersökning och delar med <em>n</em>, precis som i ' +
               'genomgångens exempel. Vid ett stickprov delar man i stället med <em>n</em> − 1 ' +
               'och kallar resultatet <em>s</em>.)',
            3: 'Kvadraten straffar långa avstånd hårt — ett enda extremvärde drar därför ' +
               '<em>σ</em> med sig mycket mer än det påverkar variationsbredden.',
            4: 'Variationsbredden ser bara på de två yttersta värdena. Standardavvikelsen ' +
               'väger in ALLA punkter — det är därför den är ett bättre mått på den typiska ' +
               'spridningen.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                if (s.n === 3 && state.step !== 3) {
                    var st = computeStats(valuesOf(pointsMain));
                    baseline = { mean: st.mean, sigma: st.sigma, range: st.range };
                }
                state.step = s.n;
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
        var legDot = legendItem(COL.dot, 'datapunkt');
        var legMean = legendItem(COL.mean, 'medelvärde (<em>x̄</em>), triangel');
        var legBand = legendItem('#2563c9', 'bandet <em>x̄</em> ± <em>σ</em>');
        var legSquare = legendItem(COL.square, 'avvikelsens kvadrat');
        legend.appendChild(legDot);
        legend.appendChild(legMean);
        legend.appendChild(legBand);
        legend.appendChild(legSquare);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            pointsMain = BASE_MAIN.map(function (v, i) { return { id: 'm' + i, value: v }; });
            pointsA = DATA_A.map(function (v, i) { return { id: 'a' + i, value: v }; });
            pointsB = DATA_B.map(function (v, i) { return { id: 'b' + i, value: v }; });
            baseline = null;
            update();
        });
        foot.appendChild(reset);

        // ── Drag: gemensam hantering för alla tre tallinjer ────────────────
        function endDrag() { dragState = null; }
        function bindDragSvg(svg, key, cfg, points) {
            svg.addEventListener('pointermove', function (e) {
                if (!dragState || dragState.key !== key) return;
                var v = xToValue(svg, e.clientX, cfg);
                points[dragState.idx].value = v;
                update();
            });
            svg.addEventListener('pointerup', endDrag);
            svg.addEventListener('pointercancel', endDrag);
        }
        bindDragSvg(svgMain, 'main', mainCfg, pointsMain);
        bindDragSvg(svgA, 'A', miniCfg, pointsA);
        bindDragSvg(svgB, 'B', miniCfg, pointsB);

        // ── Rita en tallinje + medelvärde/band(+ ev. kvadrater) ────────────
        function renderScene(svg, points, cfg, key, showSquares) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var vals = valuesOf(points);
            var st = computeStats(vals);
            var levels = levelsOf(points);
            var axisY = cfg.axisY;

            // Axel med pilspets
            svg.appendChild(svgEl('line', {
                x1: cfg.L, y1: axisY, x2: cfg.L + cfg.PW + 6, y2: axisY,
                stroke: COL.axis, 'stroke-width': 1.5
            }));
            svg.appendChild(svgEl('polygon', {
                points: (cfg.L + cfg.PW + 13) + ',' + axisY + ' ' +
                    (cfg.L + cfg.PW + 4) + ',' + (axisY - 4) + ' ' +
                    (cfg.L + cfg.PW + 4) + ',' + (axisY + 4),
                fill: COL.axis
            }));

            // Ticks 0, 5, 10, 15, 20
            [0, 5, 10, 15, 20].forEach(function (tv) {
                var tx = X(cfg, tv);
                svg.appendChild(svgEl('line', {
                    x1: tx, y1: axisY - 4, x2: tx, y2: axisY + 4, stroke: COL.tick, 'stroke-width': 1
                }));
                var anchor = tv === 0 ? 'start' : (tv === 20 ? 'end' : 'middle');
                var lx = tv === 0 ? cfg.L : (tv === 20 ? cfg.L + cfg.PW : tx);
                svg.appendChild(svgText(
                    { x: lx, y: cfg.tickLabelY, 'font-size': cfg.fontTick, 'text-anchor': anchor, fill: COL.tick },
                    String(tv)));
            });

            // Band x̄ ± σ (skuggat, bakom allt annat)
            var bx1 = X(cfg, clampNum(st.mean - st.sigma, 0, 20));
            var bx2 = X(cfg, clampNum(st.mean + st.sigma, 0, 20));
            svg.appendChild(svgEl('rect', {
                x: Math.min(bx1, bx2), y: cfg.bandTop, width: Math.max(0, Math.abs(bx2 - bx1)),
                height: axisY - cfg.bandTop, fill: COL.bandFill
            }));

            // Medelvärdesmarkör (triangel) + guidelinje ner till axeln
            var mx = X(cfg, st.mean);
            svg.appendChild(svgEl('line', {
                x1: mx, y1: cfg.meanBase, x2: mx, y2: axisY,
                stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3'
            }));
            svg.appendChild(svgEl('polygon', {
                points: (mx - 6) + ',' + cfg.meanBase + ' ' + (mx + 6) + ',' + cfg.meanBase + ' ' + mx + ',' + cfg.meanTip,
                fill: COL.mean
            }));

            // Kvadraterna: sida = |avvikelse| · skala, hängande från axeln.
            // Klampas horisontellt inom [L, L+PW] så en stor kvadrat vid en
            // kantpunkt inte spiller ut ur scenen (asymmetrisk växt inåt).
            if (showSquares) {
                points.forEach(function (p) {
                    var dev = p.value - st.mean;
                    if (Math.abs(dev) < 0.2) return;
                    var side = clampNum(Math.abs(dev) * cfg.sqScale, 0, cfg.sqMax);
                    var cx = X(cfg, p.value);
                    var x0 = cx - side / 2, x1 = cx + side / 2;
                    if (x0 < cfg.L) { x0 = cfg.L; x1 = cfg.L + side; }
                    if (x1 > cfg.L + cfg.PW) { x1 = cfg.L + cfg.PW; x0 = x1 - side; }
                    svg.appendChild(svgEl('rect', {
                        x: x0, y: axisY, width: side, height: side,
                        fill: COL.squareFill, stroke: COL.square, 'stroke-width': 1.1, 'stroke-opacity': 0.6
                    }));
                });
            }

            // Punkter (dragbara) + droppline ner till axeln
            points.forEach(function (p) {
                var lvl = levels[p.id];
                var cx = X(cfg, p.value);
                var cy = cfg.dotBase - lvl * cfg.dotStep;
                svg.appendChild(svgEl('line', {
                    x1: cx, y1: cy, x2: cx, y2: axisY,
                    stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3'
                }));
                svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: cfg.dotR, fill: COL.dot }));
                var hit = svgEl('circle', { cx: cx, cy: cy, r: cfg.hitR, fill: 'rgba(0,0,0,0)', 'data-pt': p.id });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    dragState = { key: key, idx: points.indexOf(p) };
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            });

            return st;
        }

        // ── Formler: allmän form + med aktuella tal (steg 2) ───────────────
        function termTex(v, meanV) { return '(' + fmtTex(v, 1) + '-' + fmtTex(meanV, 1) + ')^2'; }
        function updateFormulas(st) {
            katexInto(formelA,
                '\\sigma = \\sqrt{\\dfrac{(x_1-\\bar{x})^2+(x_2-\\bar{x})^2+\\ldots+(x_n-\\bar{x})^2}{n}}');
            var sorted = st.sorted, n = st.n;
            var t1 = termTex(sorted[0], st.mean), t2 = termTex(sorted[1], st.mean), tn = termTex(sorted[n - 1], st.mean);
            katexInto(formelB,
                '\\sigma = \\sqrt{\\dfrac{' + t1 + '+' + t2 + '+\\ldots+' + tn + '}{' + n + '}}' +
                ' = \\sqrt{\\dfrac{' + fmtTex(st.ss, 2) + '}{' + n + '}}' +
                ' = \\sqrt{' + fmtTex(st.variance, 2) + '}' +
                ' = ' + fmtTex(st.sigma, 2));
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            note.innerHTML = NOTE[state.step];
            note.style.display = NOTE[state.step] ? '' : 'none';

            var onMain = state.step <= 3;
            scene.style.display = onMain ? '' : 'none';
            legend.style.display = onMain ? '' : 'none';
            sumText.style.display = onMain ? '' : 'none';
            statsGrid.style.display = onMain ? 'grid' : 'none';
            formelA.style.display = state.step === 2 ? '' : 'none';
            formelB.style.display = state.step === 2 ? '' : 'none';
            deltaPanel.style.display = state.step === 3 ? 'flex' : 'none';

            titleA.style.display = titleB.style.display = sceneA.style.display =
                sceneB.style.display = summaryA.style.display = summaryB.style.display =
                matchBox.style.display = state.step === 4 ? '' : 'none';

            if (onMain) {
                var st = renderScene(svgMain, pointsMain, mainCfg, 'main', true);
                valMean.textContent = fmt(st.mean, 2);
                valSigma.textContent = fmt(st.sigma, 2);
                valRange.textContent = fmt(st.range, 1);
                sumText.innerHTML = 'Summan av alla kvadraters area: <strong>' + fmt(st.ss, 2) + '</strong>';
                if (state.step === 2) updateFormulas(st);
                if (state.step === 3 && baseline) {
                    deltaSigmaVal.textContent = fmtDelta(st.sigma - baseline.sigma, 2);
                    deltaRangeVal.textContent = fmtDelta(st.range - baseline.range, 1);
                    deltaMeanVal.textContent = fmtDelta(st.mean - baseline.mean, 2);
                }
            } else {
                var stA = renderScene(svgA, pointsA, miniCfg, 'A', false);
                var stB = renderScene(svgB, pointsB, miniCfg, 'B', false);
                summaryA.innerHTML = 'medelvärde ' + fmt(stA.mean, 1) + ' &middot; variationsbredd ' +
                    fmt(stA.range, 1) + ' &middot; <em>σ</em> ≈ ' + fmt(stA.sigma, 2);
                summaryB.innerHTML = 'medelvärde ' + fmt(stB.mean, 1) + ' &middot; variationsbredd ' +
                    fmt(stB.range, 1) + ' &middot; <em>σ</em> ≈ ' + fmt(stB.sigma, 2);
                var sameRange = Math.abs(stA.range - stB.range) < 0.05;
                var sameMean = Math.abs(stA.mean - stB.mean) < 0.05;
                var sigmaDiff = Math.abs(stA.sigma - stB.sigma) > 0.1;
                matchBox.textContent = (sameRange && sameMean && sigmaDiff)
                    ? 'Samma medelvärde och variationsbredd — men σ skiljer tydligt: ' +
                      fmt(stA.sigma, 2) + ' mot ' + fmt(stB.sigma, 2) + '.'
                    : 'Jämför talen ovan: medelvärde, variationsbredd och σ för A och B.';
            }
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-6.4'] = api;
})();
