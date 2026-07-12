/* ma2c-6.2.js — visualisering: "Lådagrammet som lever". Hör till ma2c-6.1
 * (lägesmått: medelvärde, median) och ma2c-6.2 (spridningsmått, lådagram).
 *
 * KÄRNINSIKT: lägesmåtten reagerar OLIKA på ett extremvärde — medelvärdet
 * rusar, medianen står still. Och: lådagrammet sammanfattar en hel
 * datamängd med bara fem tal, så två helt olika datamängder kan ha exakt
 * samma låda.
 *
 * ── KVARTILMETOD (måste stämma EXAKT med data/teori/ma2c-6.2.md) ─────────
 * Genomgången definierar (avsnitt om lådagram, samt Exempel 1 "Två
 * middagar"): medianen är mittvärdet i den sorterade datamängden (medel av
 * de två mittersta vid jämnt antal). Nedre kvartilen Q1 är "medianen till
 * alla värden till vänster om medianen" och övre kvartilen Q3 är "medianen
 * till alla värden till höger om medianen". Vid UDDA antal värden EXKLUDERAS
 * medianvärdet själv ur båda halvorna innan man tar medianen av respektive
 * halva (verifierat mot facit i Exempel 1: 15 värden, medianindex 8,
 * nedre halva = de 7 värdena FÖRE medianen, övre halva = de 7 värdena
 * EFTER). Vid JÄMNT antal delas datamängden exakt i två lika stora halvor
 * (ingen exkludering behövs, eftersom medianen redan är ett medelvärde och
 * inte ett eget datavärde). Denna metod kallas ibland "exklusiv median"-
 * metoden (samma som Tukeys hinges för udda n). Se funktionerna median()
 * och quartiles() nedan.
 *
 * Variationsbredd = största värdet − minsta värdet.
 * Kvartilavstånd  = övre kvartil − nedre kvartil.
 *
 * Tre steg:
 *   1. Måtten i handen — en datamängd (13 punkter), lådagram + medelvärde
 *      live ovanför en dragbar "dot plot". Värdetabell med alla mått.
 *   2. Robusthet — dra den högraste punkten mot 30: medelvärdet flyttar
 *      sig (Δ visas), medianen (och kvartilerna) står still.
 *   3. Lådans blinda fläck — två datamängder A och B med olika
 *      punktmönster men (i utgångsläget) EXAKT samma femtalssammanfattning
 *      → samma lådagram trots olika data.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat. API:
 * window.VISUALISERINGAR['<id>'] = { mount(el) → { destroy() } }.
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
        dot: '#2563c9',        // datapunkter
        box: '#8fb8d8',        // lådans fyllning (matchar teorifiguren)
        boxLine: '#1f2530',    // box- och medianstreck (bläck)
        boxText: '#215a8c',    // kvartilavstånd-formeln (kopplad till lådan)
        mean: '#c8324a',       // medelvärdesmarkör, accentröd
        dash: 'rgba(31,37,48,0.35)',
        track: 'rgba(15,22,32,0.2)'
    };

    // ── Statistik: median/kvartiler enligt genomgångens metod ─────────────
    function median(sorted) {
        var n = sorted.length;
        if (n === 0) return NaN;
        var mid = Math.floor(n / 2);
        return (n % 2 === 1) ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    function quartiles(sorted) {
        var n = sorted.length;
        var med = median(sorted);
        var lower, upper;
        if (n % 2 === 1) {
            lower = sorted.slice(0, (n - 1) / 2);
            upper = sorted.slice((n + 1) / 2);
        } else {
            lower = sorted.slice(0, n / 2);
            upper = sorted.slice(n / 2);
        }
        return { q1: median(lower), q3: median(upper) };
    }
    function computeStats(values) {
        var sorted = values.slice().sort(function (a, b) { return a - b; });
        var n = sorted.length;
        var sum = 0;
        for (var i = 0; i < n; i++) sum += sorted[i];
        var q = quartiles(sorted);
        var med = median(sorted);
        return {
            min: sorted[0], max: sorted[n - 1],
            q1: q.q1, median: med, q3: q.q3,
            mean: sum / n,
            range: sorted[n - 1] - sorted[0],
            iqr: q.q3 - q.q1
        };
    }

    // ── Etikett-deklutter: skjut isär värden som ligger för nära (i px) ───
    function declutter(xs, minGap, lo, hi) {
        var out = xs.slice(), i;
        for (i = 1; i < out.length; i++) {
            if (out[i] - out[i - 1] < minGap) out[i] = out[i - 1] + minGap;
        }
        var overflow = out[out.length - 1] - hi;
        if (overflow > 0) for (i = 0; i < out.length; i++) out[i] -= overflow;
        if (out[0] < lo) {
            var deficit = lo - out[0];
            for (i = 0; i < out.length; i++) out[i] += deficit;
        }
        return out;
    }
    function anchorFor(x, minX, maxX) {
        if (x < minX + 20) return { anchor: 'start', x: minX };
        if (x > maxX - 20) return { anchor: 'end', x: maxX };
        return { anchor: 'middle', x: x };
    }

    // ── Startdata ───────────────────────────────────────────────────────
    // 13 mätvärden 0–30 (tänk t.ex. provresultat). Den högsta punkten
    // (17) ligger medvetet en bit under taket så steg 2:s uppdrag ("dra
    // den till 30") ger ett tydligt, exakt Δ i medelvärdet.
    var BASE_MAIN = [2, 4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    // Två datamängder med, verifierat, EXAKT samma femtalssammanfattning
    // (min 2, Q1 8, median 15, Q3 22, max 28) fast helt olika mönster:
    // A är jämnt utspridd, B är klumpad vid kvartilerna (dubbletter vid
    // Q1 = 8 och Q3 = 22).
    var INITIAL_A = [2, 6, 10, 13, 15, 17, 20, 24, 28];
    var INITIAL_B = [2, 8, 8, 14, 15, 16, 22, 22, 28];

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ───────────────────────────────────────────────────
        var state = { step: 1 };
        var pointsMain = BASE_MAIN.map(function (v, i) { return { id: 'm' + i, value: v }; });
        var pointsA = INITIAL_A.map(function (v, i) { return { id: 'a' + i, value: v }; });
        var pointsB = INITIAL_B.map(function (v, i) { return { id: 'b' + i, value: v }; });
        var baseline = null;   // {mean, median} — sätts när steg 2 öppnas
        var dragState = null;  // {key: 'main'|'A'|'B', idx}

        function valuesOf(points) { return points.map(function (p) { return p.value; }); }

        // ── Delad geometri för alla tallinjer (0–30 mappat likadant) ──────
        var mainCfg = {
            W: 560, H: 260, L: 28, R: 28,
            medianLabelY: 20, boxTop: 34, boxBottom: 72,
            meanTip: 76, meanBase: 88, belowLabelY: 104,
            guideTop: 110, axisY: 220, tickLabelY: 236, axisWordY: 250,
            dotStep: 11, dotR: 5, hitR: 15, minGap: 27,
            fontVal: 12.5, fontTick: 11, showMean: true
        };
        mainCfg.PW = mainCfg.W - mainCfg.L - mainCfg.R;
        var miniCfg = {
            W: 560, H: 150, L: 28, R: 28,
            medianLabelY: 16, boxTop: 22, boxBottom: 48,
            belowLabelY: 64, guideTop: 68, axisY: 118, tickLabelY: 132,
            dotStep: 9, dotR: 4, hitR: 13, minGap: 23,
            fontVal: 10.5, fontTick: 9.5, showMean: false
        };
        miniCfg.PW = miniCfg.W - miniCfg.L - miniCfg.R;

        function X(cfg, v) { return cfg.L + v / 30 * cfg.PW; }
        function xToValue(svg, clientX, cfg) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * cfg.W / r.width;
            var v = (px - cfg.L) / cfg.PW * 30;
            return clampNum(Math.round(v / 0.5) * 0.5, 0, 30);
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Lådagrammet som lever';
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
            'aria-label': 'Tallinje 0 till 30 med dragbara datapunkter och ett ' +
                'lådagram som ritas om direkt ovanför. Dra i punkterna för att se ' +
                'hur medianen, medelvärdet och kvartilerna ändras.'
        });
        svgMain.classList.add('lab-graf-svg');
        svgMain.style.cursor = 'default';
        svgMain.style.touchAction = 'none';
        scene.appendChild(svgMain);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.axis;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.boxText;
        card.appendChild(formelB);

        // Värdetabell (lägesmått + spridningsmått), steg 1 & 2
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
        var valMedian = statCell('Medianen');
        var valMean = statCell('Medelvärdet');
        var valQ1 = statCell('Nedre kvartil (<em>Q</em>₁)');
        var valQ3 = statCell('Övre kvartil (<em>Q</em>₃)');
        var valRange = statCell('Variationsbredd');
        var valIqr = statCell('Kvartilavstånd');

        // Δ-panel, endast steg 2
        var deltaPanel = document.createElement('div');
        deltaPanel.style.cssText = 'display:flex;gap:28px;align-items:baseline;' +
            'margin:6px 2px 4px;padding:10px 14px;border:1px solid rgba(31,37,48,0.15);' +
            'border-radius:8px;background:rgba(37,99,201,0.045);';
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
        var deltaMeanVal = deltaCell('Δ medelvärde (jämfört med start)', COL.mean);
        var deltaMedianVal = deltaCell('Δ median (jämfört med start)', COL.axis);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var rebaseBtn = document.createElement('button');
        rebaseBtn.type = 'button';
        rebaseBtn.className = 'lab-btn';
        rebaseBtn.textContent = 'Nollställ jämförelse';
        rebaseBtn.addEventListener('click', function () {
            baseline = { mean: computeStats(valuesOf(pointsMain)).mean, median: computeStats(valuesOf(pointsMain)).median };
            update();
        });
        actions.appendChild(rebaseBtn);

        // Steg 3: två datamängder A och B
        var titleA = document.createElement('div');
        titleA.textContent = 'Datamängd A';
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
            'aria-label': 'Datamängd A: dragbara punkter med ett lådagram ovanför.'
        });
        svgA.classList.add('lab-graf-svg');
        svgA.style.cursor = 'default';
        svgA.style.touchAction = 'none';
        sceneA.appendChild(svgA);

        var fiveA = document.createElement('div');
        fiveA.style.cssText = 'font-size:12px;color:' + COL.axis + ';margin:2px 2px 0;';
        card.appendChild(fiveA);

        var titleB = document.createElement('div');
        titleB.textContent = 'Datamängd B';
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
            'aria-label': 'Datamängd B: dragbara punkter med ett lådagram ovanför.'
        });
        svgB.classList.add('lab-graf-svg');
        svgB.style.cursor = 'default';
        svgB.style.touchAction = 'none';
        sceneB.appendChild(svgB);

        var fiveB = document.createElement('div');
        fiveB.style.cssText = 'font-size:12px;color:' + COL.axis + ';margin:2px 2px 0;';
        card.appendChild(fiveB);

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
            { n: 1, label: '1 · Måtten i handen' },
            { n: 2, label: '2 · Robusthet' },
            { n: 3, label: '3 · Lådans blinda fläck' }
        ];
        var INSTR = {
            1: 'Dra i punkterna på tallinjen (eller lådagrammet ritar om sig ' +
               'direkt) och se hur alla mått i tabellen ändras live. Gissa ' +
               'först: vad händer med medianen om du drar den största punkten ' +
               'långt åt höger? Och med medelvärdet?',
            2: 'Dra den högraste punkten mot 30 — som om en av observationerna ' +
               'blev ett extremvärde. Jämför förändringen (Δ) i medelvärde och ' +
               'median mot utgångsläget nedan.',
            3: 'Datamängderna A och B har just nu exakt samma lådagram — fast ' +
               'punkterna ligger helt olika (A jämnt utspridd, B klumpad). Dra ' +
               'punkterna i någon av dem. Klarar du att flytta en punkt utan ' +
               'att lådans fem tal ändras? Eller: hur lite behövs för att ' +
               'lådorna ska bli olika?'
        };
        var NOTE = {
            1: '',
            2: 'Ett enda extremvärde drar medelvärdet med sig, men rubbar ' +
               'knappt medianen — precis som i genomgångens exempel med ' +
               '61-åringen: vid sneda fördelningar med utstickande värden är ' +
               'medianen ofta det mest representativa lägesmåttet.',
            3: 'Lådagrammet sammanfattar en hel datamängd med bara fem tal ' +
               '(minsta värdet, nedre kvartil, median, övre kvartil, största ' +
               'värdet). Två helt olika fördelningar kan därför se identiska ut ' +
               'i lådagrammet — lådan visar inte allt.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                if (s.n === 2 && state.step !== 2) {
                    var st = computeStats(valuesOf(pointsMain));
                    baseline = { mean: st.mean, median: st.median };
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
        var legBox = legendItem(COL.box, 'låda (<em>Q</em>₁–<em>Q</em>₃) med medianen som streck');
        var legMean = legendItem(COL.mean, 'medelvärde (markör)');
        legend.appendChild(legDot);
        legend.appendChild(legBox);
        legend.appendChild(legMean);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            pointsMain = BASE_MAIN.map(function (v, i) { return { id: 'm' + i, value: v }; });
            pointsA = INITIAL_A.map(function (v, i) { return { id: 'a' + i, value: v }; });
            pointsB = INITIAL_B.map(function (v, i) { return { id: 'b' + i, value: v }; });
            var st = computeStats(valuesOf(pointsMain));
            baseline = { mean: st.mean, median: st.median };
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

        // ── Nivåer för staplade prickar (samma värde staplas i höjdled) ────
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

        // ── Rita en tallinje + lådagram (delad av alla tre scener) ─────────
        function renderScene(svg, points, cfg, key, baselineSnap) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var vals = valuesOf(points);
            var st = computeStats(vals);
            var levels = levelsOf(points);

            // Axel
            svg.appendChild(svgEl('line', {
                x1: cfg.L, y1: cfg.axisY, x2: cfg.L + cfg.PW + 6, y2: cfg.axisY,
                stroke: COL.axis, 'stroke-width': 1.5
            }));
            svg.appendChild(svgEl('polygon', {
                points: (cfg.L + cfg.PW + 13) + ',' + cfg.axisY + ' ' +
                    (cfg.L + cfg.PW + 4) + ',' + (cfg.axisY - 4) + ' ' +
                    (cfg.L + cfg.PW + 4) + ',' + (cfg.axisY + 4),
                fill: COL.axis
            }));
            var tv;
            for (tv = 0; tv <= 30; tv += 5) {
                var tx = X(cfg, tv);
                svg.appendChild(svgEl('line', {
                    x1: tx, y1: cfg.axisY - 4, x2: tx, y2: cfg.axisY + 4,
                    stroke: COL.tick, 'stroke-width': 1
                }));
                var ta = anchorFor(tx, cfg.L, cfg.L + cfg.PW);
                svg.appendChild(svgText({
                    x: ta.x, y: cfg.tickLabelY, 'font-size': cfg.fontTick,
                    'text-anchor': ta.anchor, fill: COL.tick
                }, String(tv)));
            }
            if (cfg.axisWordY) {
                svg.appendChild(svgText({
                    x: cfg.L + cfg.PW / 2, y: cfg.axisWordY, 'font-size': cfg.fontTick + 1,
                    'text-anchor': 'middle', fill: COL.tick
                }, 'mätvärde (0–30)'));
            }

            // Lådagram: box + morrhår + median
            var boxX1 = X(cfg, st.q1), boxX2 = X(cfg, st.q3);
            var whiskerY = (cfg.boxTop + cfg.boxBottom) / 2;
            var capTop = whiskerY - 8, capBottom = whiskerY + 8;
            // morrhår
            svg.appendChild(svgEl('line', { x1: X(cfg, st.min), y1: whiskerY, x2: boxX1, y2: whiskerY, stroke: COL.boxLine, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: boxX2, y1: whiskerY, x2: X(cfg, st.max), y2: whiskerY, stroke: COL.boxLine, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: X(cfg, st.min), y1: capTop, x2: X(cfg, st.min), y2: capBottom, stroke: COL.boxLine, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('line', { x1: X(cfg, st.max), y1: capTop, x2: X(cfg, st.max), y2: capBottom, stroke: COL.boxLine, 'stroke-width': 1.4 }));
            // box
            svg.appendChild(svgEl('rect', {
                x: Math.min(boxX1, boxX2), y: cfg.boxTop, width: Math.max(0, boxX2 - boxX1),
                height: cfg.boxBottom - cfg.boxTop, fill: COL.box, stroke: COL.boxLine, 'stroke-width': 1.4
            }));
            // median
            var mx = X(cfg, st.median);
            svg.appendChild(svgEl('line', { x1: mx, y1: cfg.boxTop, x2: mx, y2: cfg.boxBottom, stroke: COL.boxLine, 'stroke-width': 1.9 }));

            // guider ner mot punktmolnet (Q1, median, Q3)
            [boxX1, mx, boxX2].forEach(function (gx) {
                svg.appendChild(svgEl('line', {
                    x1: gx, y1: cfg.guideTop, x2: gx, y2: cfg.axisY - 8,
                    stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3'
                }));
            });

            // etikett: median (ovanför lådan)
            var ma = anchorFor(mx, cfg.L, cfg.L + cfg.PW);
            svg.appendChild(svgText({
                x: ma.x, y: cfg.medianLabelY, 'font-size': cfg.fontVal, 'font-weight': 600,
                'text-anchor': ma.anchor, fill: COL.boxLine
            }, fmt(st.median, 1)));

            // etiketter: min, Q1, Q3, max (under lådan, deklutterade)
            var trueX = [X(cfg, st.min), boxX1, boxX2, X(cfg, st.max)];
            var labX = declutter(trueX, cfg.minGap, cfg.L, cfg.L + cfg.PW);
            var labStr = [fmt(st.min, 1), fmt(st.q1, 1), fmt(st.q3, 1), fmt(st.max, 1)];
            for (var i = 0; i < 4; i++) {
                var a = anchorFor(labX[i], cfg.L, cfg.L + cfg.PW);
                svg.appendChild(svgText({
                    x: a.x, y: cfg.belowLabelY, 'font-size': cfg.fontVal,
                    'text-anchor': a.anchor, fill: COL.boxLine
                }, labStr[i]));
            }

            // medelvärdesmarkör (endast huvudscenen)
            if (cfg.showMean) {
                var meanX = X(cfg, st.mean);
                if (baselineSnap) {
                    var ghostX = X(cfg, baselineSnap.mean);
                    svg.appendChild(svgEl('polygon', {
                        points: (ghostX - 6) + ',' + cfg.meanBase + ' ' + (ghostX + 6) + ',' + cfg.meanBase + ' ' + ghostX + ',' + cfg.meanTip,
                        fill: 'none', stroke: COL.mean, 'stroke-width': 1.3, opacity: 0.55
                    }));
                    if (Math.abs(meanX - ghostX) > 4) {
                        var midY = (cfg.meanTip + cfg.meanBase) / 2 + 2;
                        svg.appendChild(svgEl('line', {
                            x1: ghostX, y1: midY, x2: meanX, y2: midY,
                            stroke: COL.mean, 'stroke-width': 1.4, opacity: 0.75
                        }));
                    }
                }
                svg.appendChild(svgEl('polygon', {
                    points: (meanX - 6) + ',' + cfg.meanBase + ' ' + (meanX + 6) + ',' + cfg.meanBase + ' ' + meanX + ',' + cfg.meanTip,
                    fill: COL.mean, stroke: COL.boxLine, 'stroke-width': 0.8
                }));
            }

            // prickar (dot plot), staplade i höjdled vid samma värde
            points.forEach(function (p) {
                var lvl = levels[p.id];
                var px = X(cfg, p.value);
                var py = cfg.axisY - 9 - lvl * cfg.dotStep;
                svg.appendChild(svgEl('circle', { cx: px, cy: py, r: cfg.dotR, fill: COL.dot }));
                var hit = svgEl('circle', { cx: px, cy: py, r: cfg.hitR, fill: 'rgba(0,0,0,0)' });
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

        // ── Formler (variationsbredd, kvartilavstånd) ─────────────────────
        function updateFormulas(st) {
            katexInto(formelA,
                '\\text{variationsbredd} = \\text{största värdet} - \\text{minsta värdet} = ' +
                fmtTex(st.max, 1) + ' - ' + fmtTex(st.min, 1) + ' = ' + fmtTex(st.range, 1));
            katexInto(formelB,
                '\\text{kvartilavstånd} = \\text{övre kvartil} - \\text{nedre kvartil} = ' +
                fmtTex(st.q3, 1) + ' - ' + fmtTex(st.q1, 1) + ' = ' + fmtTex(st.iqr, 1));
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            note.innerHTML = NOTE[state.step];
            note.style.display = NOTE[state.step] ? '' : 'none';

            scene.style.display = state.step <= 2 ? '' : 'none';
            legend.style.display = state.step <= 2 ? '' : 'none';
            legMean.style.display = state.step <= 2 ? '' : 'none';
            formelA.style.display = state.step <= 2 ? '' : 'none';
            formelB.style.display = state.step <= 2 ? '' : 'none';
            statsGrid.style.display = state.step <= 2 ? 'grid' : 'none';
            deltaPanel.style.display = state.step === 2 ? 'flex' : 'none';
            actions.style.display = state.step === 2 ? '' : 'none';

            titleA.style.display = titleB.style.display = sceneA.style.display =
                sceneB.style.display = fiveA.style.display = fiveB.style.display =
                matchBox.style.display = state.step === 3 ? '' : 'none';

            if (state.step <= 2) {
                var st = renderScene(svgMain, pointsMain, mainCfg, 'main', state.step === 2 ? baseline : null);
                valMedian.textContent = fmt(st.median, 1);
                valMean.textContent = fmt(st.mean, 2);
                valQ1.textContent = fmt(st.q1, 1);
                valQ3.textContent = fmt(st.q3, 1);
                valRange.textContent = fmt(st.range, 1);
                valIqr.textContent = fmt(st.iqr, 1);
                updateFormulas(st);
                if (state.step === 2 && baseline) {
                    deltaMeanVal.textContent = fmtDelta(st.mean - baseline.mean, 2);
                    deltaMedianVal.textContent = fmtDelta(st.median - baseline.median, 2);
                }
            } else {
                var stA = renderScene(svgA, pointsA, miniCfg, 'A', null);
                var stB = renderScene(svgB, pointsB, miniCfg, 'B', null);
                fiveA.innerHTML = 'min ' + fmt(stA.min, 1) + ' &middot; <em>Q</em>₁ ' + fmt(stA.q1, 1) +
                    ' &middot; median ' + fmt(stA.median, 1) + ' &middot; <em>Q</em>₃ ' + fmt(stA.q3, 1) +
                    ' &middot; max ' + fmt(stA.max, 1);
                fiveB.innerHTML = 'min ' + fmt(stB.min, 1) + ' &middot; <em>Q</em>₁ ' + fmt(stB.q1, 1) +
                    ' &middot; median ' + fmt(stB.median, 1) + ' &middot; <em>Q</em>₃ ' + fmt(stB.q3, 1) +
                    ' &middot; max ' + fmt(stB.max, 1);
                var same = Math.abs(stA.min - stB.min) < 0.01 && Math.abs(stA.q1 - stB.q1) < 0.01 &&
                    Math.abs(stA.median - stB.median) < 0.01 && Math.abs(stA.q3 - stB.q3) < 0.01 &&
                    Math.abs(stA.max - stB.max) < 0.01;
                matchBox.textContent = same
                    ? 'Lådorna är identiska — alla fem tal matchar exakt.'
                    : 'Lådorna skiljer sig nu — jämför de fem talen ovan.';
            }
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-6.1'] = api;
    window.VISUALISERINGAR['ma2c-6.2'] = api;
})();
