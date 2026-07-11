/* ma2c-2.6.js — visualisering: "Diskriminantens gränsland".
 * Hör till ma2c-2.6 (antal lösningar till en andragradsekvation) och
 * bryggar till ma4-4.3 (andragradsekvationer med komplexa rötter).
 *
 * Kärninsikt: pq-formeln ger x = -p/2 ± sqrt((p/2)² - q). Antalet lösningar
 * avgörs helt av uttrycket under rottecknet ("diskriminanten"). När det
 * passerar noll KOLLIDERAR de två reella rötterna i en dubbelrot — och
 * viker sedan av VINKELRÄTT ut i det komplexa talplanet som ett
 * komplexkonjugerat par. "Saknar reell lösning" är alltså inte att
 * lösningarna försvinner, utan att de smiter ut ur reella axeln.
 *
 * Beteckningar speglar teorigenomgångarna exakt:
 *   ma2c-2.4.md — pq-formeln: x² + px + q = 0 ⇒ x = -p/2 ± sqrt((p/2)² - q).
 *   ma2c-2.6.md — uttrycket under rottecknet kallas "diskriminanten";
 *                 positiv → två lösningar, noll → en lösning (dubbelrot),
 *                 negativ → inga (reella) lösningar.
 *   ma4-4.3.md  — samma diskriminant, negativ ⇒ två komplexkonjugerade
 *                 rötter x = -p/2 ± i·sqrt(q - (p/2)²).
 *
 * Tre steg (lager):
 *   1. Antal lösningar   — bara parabelpanelen y = x² + px + q + diskriminant-
 *      mätaren. Gissa-först: vad händer med lösningarna när parabeln lyfter
 *      över x-axeln? Rotmarkeringar (gröna prickar) på parabelns skärningar
 *      med x-axeln, bara när diskriminanten är positiv/noll.
 *   2. Kollisionen       — det komplexa talplanet visas under parabeln.
 *      Dra q (glidare, eller dra i parabelns lägsta punkt): rötterna glider
 *      mot varandra på reella axeln, möts i en dubbelrot och viker sedan av
 *      vinkelrätt uppåt/nedåt. Ett spår av svaga prickar ("rot-banan") visar
 *      vägen medan man drar.
 *   3. Komplexa rötterna — lösningarna skrivs ut exakt, x = -p/2 ± i·(tal)
 *      när diskriminanten är negativ (ma4-4.3-notation), och konjugatparet
 *      förbinds med en streckad lodrät linje i det komplexa planet.
 *
 * Startläge p = -2, q = -3 (x² - 2x - 3 = 0, rötterna -1 och 3) — enkla,
 * lättlästa heltal. Snabbknappar hoppar till dubbelrot (q = 1) och komplexa
 * rötter (q = 4) för samma p.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-3.1.js och ma4-4.5.js). API: window.VISUALISERINGAR['ma2c-2.6'] =
 * { mount }, registrerad även för ma4-4.3.
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
    var SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    function subDigits(n) { return String(n).split('').map(function (c) { return SUB[+c]; }).join(''); }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        curve: '#2563c9',      // parabeln — blå som teorifigurernas kurva
        real: '#3f8f5c',       // reella lösningar — grön
        complex: '#c8324a',    // komplexa lösningar — röd
        zero: '#a9820c'        // dubbelrot (diskriminant = 0) — guldgul
    };
    function kindColor(kind) {
        return kind === 'real' ? COL.real : kind === 'complex' ? COL.complex : COL.zero;
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd: (p, q) är enda sanningskällan ────────────────────
        var P_MIN = -6, P_MAX = 6, P_STEP = 0.1;
        var Q_MIN = -6, Q_MAX = 8, Q_STEP = 0.1;
        var EPS = 0.06;   // band kring 0 som räknas som "dubbelrot"
        var state = { p: -2, q: -3, step: 1 };
        var trail = [];              // [{kind, x1,x2} | {kind, re,im} | {kind, x}]
        var lastTrailPQ = null;
        var animId = null;

        function rootsOf(p, q) {
            var half = p / 2;
            var D = half * half - q;
            if (D > EPS) {
                var s = Math.sqrt(D);
                return { kind: 'real', half: half, D: D, sqrtD: s, x1: -half - s, x2: -half + s };
            }
            if (D < -EPS) {
                var im = Math.sqrt(-D);
                return { kind: 'complex', half: half, D: D, im: im, re: -half };
            }
            return { kind: 'double', half: half, D: D, x: -half };
        }

        // ── Geometri: parabelpanelen ──────────────────────────────────────
        var W = 560, H = 400, L = 48, R = 18, T = 20, B = 40;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -6.5, XMAX = 6.5, YMIN = -9, YMAX = 9;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
        var axisX = X(0), axisY = Y(0);

        // ── Geometri: komplexa planet (kvadratiskt rutnät, lika px/enhet) ──
        var W2 = 560, H2 = 432, L2 = 44, R2 = 20, T2 = 20, B2 = 40;
        var PW2 = W2 - L2 - R2, PH2 = H2 - T2 - B2;   // 496 × 372 → 62 px/enhet
        var XMIN2 = -4, XMAX2 = 4, YMIN2 = -3, YMAX2 = 3;
        function X2(re) { return L2 + (re - XMIN2) / (XMAX2 - XMIN2) * PW2; }
        function Y2(im) { return T2 + (YMAX2 - im) / (YMAX2 - YMIN2) * PH2; }
        var axisX2 = X2(0), axisY2 = Y2(0);

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Diskriminantens gränsland';
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
            'aria-label': 'Interaktiv graf: parabeln y lika med x-kvadrat plus px plus q. ' +
                'Dra i parabelns lägsta punkt eller i glidarna p och q för att ändra kurvan ' +
                'och se hur den skär x-axeln.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        svg.style.userSelect = 'none';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelDisc = document.createElement('div');
        formelDisc.className = 'lab-vis-formel';
        card.appendChild(formelDisc);

        var statusNote = document.createElement('div');
        statusNote.className = 'lab-vis-note';
        card.appendChild(statusNote);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Komplext talplan som visar ekvationens två rötter — gröna på ' +
                'reella axeln när de är reella, röda som ett komplexkonjugerat par när ' +
                'diskriminanten är negativ. Ett svagt spår visar rötternas väg.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var formelRoots = document.createElement('div');
        formelRoots.className = 'lab-vis-formel';
        card.appendChild(formelRoots);

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
            { n: 1, label: '1 · Antal lösningar' },
            { n: 2, label: '2 · Kollisionen' },
            { n: 3, label: '3 · Komplexa rötterna' }
        ];
        var INSTR = {
            1: 'Gissa först: vad händer med lösningarna när parabeln lyfter över ' +
               '<em>x</em>-axeln? Dra i parabelns lägsta punkt, eller i glidarna ' +
               '<em>p</em> och <em>q</em>, och se skärningspunkterna med <em>x</em>-axeln ' +
               'glida ihop — och till slut försvinna.',
            2: 'Nu visas det komplexa talplanet under parabeln. Dra <em>q</em> långsamt ' +
               'uppåt: de två reella rötterna glider mot varandra, möts i en dubbelrot — ' +
               'och viker sedan av <strong>vinkelrätt</strong>, rakt uppåt och nedåt, som ' +
               'ett komplexkonjugerat par. Spåret av svaga prickar visar vägen de tagit.',
            3: 'Rötternas exakta värden skrivs ut nedan. När diskriminanten är negativ ' +
               'blir lösningarna <em>x</em> = −<em>p</em>/2 ± <em>i</em> · (ett tal) — ' +
               'konjugatparet är förbundet med en streckad lodrät linje i det komplexa ' +
               'planet.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopAnim(); state.step = s.n; update(); });
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
            legend.appendChild(span);
            return span;
        }
        var legCurve = legendItem(COL.curve, '<em>y</em> = <em>x</em>² + <em>px</em> + <em>q</em>');
        var legReal = legendItem(COL.real, 'reella lösningar');
        var legComplex = legendItem(COL.complex, 'komplexa lösningar');

        // ── Actions: animation + snabbexempel ──────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Animera q';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        function exampleBtn(label, p, q) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = label;
            b.addEventListener('click', function () {
                stopAnim();
                state.p = p; state.q = q;
                rowP.sync(); rowQ.sync();
                pushTrail();
                update();
            });
            actions.appendChild(b);
        }
        exampleBtn('Exempel: två lösningar', -2, -3);
        exampleBtn('Exempel: dubbelrot', -2, 1);
        exampleBtn('Exempel: komplexa lösningar', -2, 4);

        // ── Glidare p och q ───────────────────────────────────────────────
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
            var decimals = 1;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.curve + ' 0%, ' +
                    COL.curve + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(v, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = fmt(get(), decimals).replace(',', '.');
                paint();
                pushTrail();
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
        var rowP = makeRow('p', P_MIN, P_MAX, P_STEP,
            function () { return state.p; },
            function (v) { state.p = Math.round(v / P_STEP) * P_STEP; });
        var rowQ = makeRow('q', Q_MIN, Q_MAX, Q_STEP,
            function () { return state.q; },
            function (v) { state.q = Math.round(v / Q_STEP) * Q_STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.p = -2; state.q = -3; state.step = 1;
            trail = []; lastTrailPQ = null;
            rowP.sync(); rowQ.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Spår ("rot-banan") ──────────────────────────────────────────
        function pushTrail() {
            if (state.step < 2) return;
            if (lastTrailPQ && Math.hypot(state.p - lastTrailPQ.p, state.q - lastTrailPQ.q) < 0.2) return;
            lastTrailPQ = { p: state.p, q: state.q };
            var info = rootsOf(state.p, state.q);
            trail.push(info.kind === 'real' ? { kind: 'real', x1: info.x1, x2: info.x2 } :
                info.kind === 'complex' ? { kind: 'complex', re: info.re, im: info.im } :
                { kind: 'double', x: info.x });
            if (trail.length > 300) trail.shift();
        }

        // ── Animation: svep q genom hela intervallet ────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var T_MS = 6000, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var pr = clampNum((ts - t0) / T_MS, 0, 1);
                state.q = Q_MIN + (Q_MAX - Q_MIN) * pr;
                rowQ.sync();
                pushTrail();
                update();
                if (pr < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar lägsta punkt (vertex) på parabeln ────────────────────
        // Vertex ligger i (h, k) med h = -p/2, k = q - p². Fri 2D-drag av
        // denna punkt styr p OCH q tillsammans: sidled ändrar p (h = -p/2),
        // lodrätt ändrar q (så att k hamnar rätt för det nya h).
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        function toWorldY(clientY) {
            var r = svg.getBoundingClientRect();
            var py = (clientY - r.top) * H / r.height;
            return YMAX - (py - T) / PH * (YMAX - YMIN);
        }
        var draggingVertex = false;
        svg.addEventListener('pointermove', function (e) {
            if (!draggingVertex) return;
            stopAnim();
            var hx = clampNum(toWorldX(e.clientX), -3.05, 3.05);
            var newP = clampNum(-2 * hx, P_MIN, P_MAX);
            var hActual = -newP / 2;
            var ky = toWorldY(e.clientY);
            var newQ = clampNum(ky + hActual * hActual, Q_MIN, Q_MAX);
            state.p = Math.round(newP / P_STEP) * P_STEP;
            state.q = Math.round(newQ / Q_STEP) * Q_STEP;
            rowP.sync(); rowQ.sync();
            pushTrail();
            update();
        });
        function endDrag() { draggingVertex = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita parabelpanelen ──────────────────────────────────────────
        var clipId1 = 'ma2c26-clip-' + (uid++);
        function drawParabola(info) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var p = state.p, q = state.q;
            var h = -p / 2, k = q - h * h;
            var i;

            // Rutnät
            for (i = -6; i <= 6; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = -8; i <= 8; i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: X(XMIN), y1: axisY, x2: X(XMAX) + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (X(XMAX) + 14) + ',' + axisY + ' ' + (X(XMAX) + 4) + ',' + (axisY - 4.5) + ' ' + (X(XMAX) + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: Y(YMIN), x2: axisX, y2: T - 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 14) + ' ' + (axisX - 4.5) + ',' + (T - 4) + ' ' + (axisX + 4.5) + ',' + (T - 4), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T + 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter (varannan enhet). Rot-etiketterna (se längre
            // ner) delar rad med x-tickens siffror (axisY+16) och sträcker
            // sig UTÅT från roten — hoppa därför över alla x-tick-siffror
            // inom en generös radie av vardera roten, inte bara exakt på
            // rotens position, annars kolliderar de horisontellt.
            var sep = info.kind === 'real' && Math.abs(info.x2 - info.x1) >= 1.3;
            // Dubbelrotens etikett läggs åt sidan BORT från y-axeln (annars
            // korsar texten axellinjen när roten ligger nära origo) — så
            // tick-skipzonen är asymmetrisk: bred på den sida texten
            // sträcker sig, smal på den andra.
            var ddir = h >= 0 ? 1 : -1;
            var skipX = [0, h];
            function nearAny(v, arr, eps) {
                for (var j = 0; j < arr.length; j++) if (Math.abs(v - arr[j]) < (eps || 0.55)) return true;
                return false;
            }
            for (i = -6; i <= 6; i += 2) {
                if (i === 0 || nearAny(i, skipX)) continue;
                if (sep && (Math.abs(i - info.x1) < 1.7 || Math.abs(i - info.x2) < 1.7)) continue;
                if (info.kind === 'real' && !sep && (Math.abs(i - info.x1) < 0.55 || Math.abs(i - info.x2) < 0.55)) continue;
                if (info.kind === 'double') {
                    var lo = ddir > 0 ? info.x - 0.4 : info.x - 3.3;
                    var hi = ddir > 0 ? info.x + 3.3 : info.x + 0.4;
                    if (i >= lo && i <= hi) continue;
                }
                svg.appendChild(svgVarText({ x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = -8; i <= 8; i += 2) {
                if (i === 0) continue;
                svg.appendChild(svgVarText({ x: axisX - 8, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }

            // Klippram + parabeln
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId1 });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId1 + ')' });
            svg.appendChild(g);
            var d = '', N = 240;
            for (i = 0; i <= N; i++) {
                var xv = XMIN + (XMAX - XMIN) * i / N;
                var yv = xv * xv + p * xv + q;
                d += (i === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Y(yv).toFixed(1) + ' ';
            }
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Kurvetikett i lugn yta uppe till vänster
            svg.appendChild(svgVarText(
                { x: L + 8, y: T + 14, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.curve },
                ['*y', ' = ', '*x', '² + ', '*px', ' + ', '*q']));

            // Rotmarkeringar på x-axeln (bara när reella). Etiketterna
            // placeras UTANFÖR rotparet (bort från valleyn mellan dem) —
            // där är parabeln alltid ≥ 0, så en etikett strax under axeln
            // hamnar aldrig ovanpå den nedåtdykande kurvan (till skillnad
            // från en etikett rakt under roten, som skär tvärs igenom
            // kurvans brant fallande gren).
            if (info.kind === 'real') {
                var show1 = Math.abs(info.x1) <= 6.3, show2 = Math.abs(info.x2) <= 6.3;
                if (show1) svg.appendChild(svgEl('circle', { cx: X(info.x1), cy: axisY, r: 4.5, fill: COL.real }));
                if (show2) svg.appendChild(svgEl('circle', { cx: X(info.x2), cy: axisY, r: 4.5, fill: COL.real }));
                if (sep) {
                    if (show1) svg.appendChild(svgVarText(
                        { x: X(info.x1) - 8, y: axisY + 16, 'font-size': 12, 'text-anchor': 'end', fill: COL.real },
                        ['*x', '₁ = ' + fmtDisp(info.x1, 1)]));
                    if (show2) svg.appendChild(svgVarText(
                        { x: X(info.x2) + 8, y: axisY + 16, 'font-size': 12, 'text-anchor': 'start', fill: COL.real },
                        ['*x', '₂ = ' + fmtDisp(info.x2, 1)]));
                }
            } else if (info.kind === 'double') {
                // Vid dubbelrot rör kurvan aldrig axeln nedåt (den nuddar
                // bara i denna enda punkt), så etiketten kan ligga i samma
                // rad som x-tickens siffror (axisY+16) utan att någonsin
                // korsa kurvan — men läggs ändå åt den sida där det finns
                // mest fri yta innan viewBox-kanten (ddir), så den inte klipps.
                svg.appendChild(svgEl('circle', { cx: X(info.x), cy: axisY, r: 4.5, fill: COL.zero }));
                svg.appendChild(svgVarText(
                    { x: X(info.x) + ddir * 8, y: axisY + 16, 'font-size': 12, 'text-anchor': ddir > 0 ? 'start' : 'end', fill: COL.zero },
                    ['*x', ' = ' + fmtDisp(info.x, 1) + ' (dubbelrot)']));
            }

            // Draghandtag: parabelns lägsta punkt (vertex)
            var vx = X(h), vy = Y(k);
            svg.appendChild(svgEl('circle', { cx: vx, cy: vy, r: 5, fill: COL.curve }));
            var hit = svgEl('circle', { cx: vx, cy: vy, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim();
                draggingVertex = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Rita det komplexa planet ───────────────────────────────────
        var clipId2 = 'ma2c26-clip2-' + (uid++);
        function drawComplex(info) {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var i;

            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                svg2.appendChild(svgEl('line', { x1: X2(i), y1: T2, x2: X2(i), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = -3; i <= 3; i++) {
                if (i === 0) continue;
                svg2.appendChild(svgEl('line', { x1: L2, y1: Y2(i), x2: L2 + PW2, y2: Y2(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar
            svg2.appendChild(svgEl('line', { x1: L2, y1: axisY2, x2: (L2 + PW2 + 6), y2: axisY2, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L2 + PW2 + 14) + ',' + axisY2 + ' ' + (L2 + PW2 + 4) + ',' + (axisY2 - 4.5) + ' ' + (L2 + PW2 + 4) + ',' + (axisY2 + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: axisX2, y1: (T2 + PH2), x2: axisX2, y2: (T2 - 6), stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: axisX2 + ',' + (T2 - 14) + ' ' + (axisX2 - 4.5) + ',' + (T2 - 4) + ' ' + (axisX2 + 4.5) + ',' + (T2 - 4), fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: (L2 + PW2 + 12), y: axisY2 + 18, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*Re']));
            svg2.appendChild(svgVarText({ x: axisX2 + 10, y: T2 - 4, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*Im']));

            var avoidX = [], avoidY = [];
            if (info.kind === 'real') { avoidX.push(info.x1, info.x2); avoidY.push(0); }
            else if (info.kind === 'complex') { avoidX.push(info.re); avoidY.push(info.im, -info.im); }
            else { avoidX.push(info.x); avoidY.push(0); }
            function nearAny(v, arr) {
                for (var j = 0; j < arr.length; j++) if (Math.abs(v - arr[j]) < 0.35) return true;
                return false;
            }
            for (i = -4; i <= 4; i++) {
                if (i === 0 || nearAny(i, avoidX)) continue;
                svg2.appendChild(svgVarText({ x: X2(i), y: axisY2 + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = -3; i <= 3; i++) {
                if (i === 0 || nearAny(i, avoidY)) continue;
                svg2.appendChild(svgVarText({ x: axisX2 - 7, y: Y2(i) + 3.5, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }

            // Klippram + spår
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L2, y: T2, width: PW2, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            trail.forEach(function (t) {
                var c = kindColor(t.kind === 'double' ? 'zero' : t.kind);
                if (t.kind === 'real') {
                    g.appendChild(svgEl('circle', { cx: X2(t.x1), cy: axisY2, r: 2.2, fill: c, opacity: 0.4 }));
                    g.appendChild(svgEl('circle', { cx: X2(t.x2), cy: axisY2, r: 2.2, fill: c, opacity: 0.4 }));
                } else if (t.kind === 'complex') {
                    g.appendChild(svgEl('circle', { cx: X2(t.re), cy: Y2(t.im), r: 2.2, fill: c, opacity: 0.4 }));
                    g.appendChild(svgEl('circle', { cx: X2(t.re), cy: Y2(-t.im), r: 2.2, fill: c, opacity: 0.4 }));
                } else {
                    g.appendChild(svgEl('circle', { cx: X2(t.x), cy: axisY2, r: 2.2, fill: c, opacity: 0.4 }));
                }
            });

            // Konjugatets streckade lodräta koppling (steg 3, bara komplexa)
            if (state.step === 3 && info.kind === 'complex') {
                g.appendChild(svgEl('line', {
                    x1: X2(info.re), y1: Y2(info.im), x2: X2(info.re), y2: Y2(-info.im),
                    stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '5 4'
                }));
            }

            // Rötterna
            if (info.kind === 'real') {
                g.appendChild(svgEl('circle', { cx: X2(info.x1), cy: axisY2, r: 5, fill: COL.real }));
                g.appendChild(svgEl('circle', { cx: X2(info.x2), cy: axisY2, r: 5, fill: COL.real }));
                svg2.appendChild(svgVarText({ x: X2(info.x1), y: axisY2 + 20, 'font-size': 12, 'text-anchor': 'middle', fill: COL.real }, ['*x', '₁']));
                svg2.appendChild(svgVarText({ x: X2(info.x2), y: axisY2 + 20, 'font-size': 12, 'text-anchor': 'middle', fill: COL.real }, ['*x', '₂']));
            } else if (info.kind === 'complex') {
                g.appendChild(svgEl('circle', { cx: X2(info.re), cy: Y2(info.im), r: 5, fill: COL.complex }));
                g.appendChild(svgEl('circle', { cx: X2(info.re), cy: Y2(-info.im), r: 5, fill: COL.complex }));
                svg2.appendChild(svgVarText({ x: X2(info.re) + 10, y: Y2(info.im) + 4, 'font-size': 12, 'text-anchor': 'start', fill: COL.complex }, ['*x', '₁']));
                svg2.appendChild(svgVarText({ x: X2(info.re) + 10, y: Y2(-info.im) + 4, 'font-size': 12, 'text-anchor': 'start', fill: COL.complex }, ['*x', '₂']));
            } else {
                g.appendChild(svgEl('circle', { cx: X2(info.x), cy: axisY2, r: 5, fill: COL.zero }));
                svg2.appendChild(svgVarText({ x: X2(info.x), y: axisY2 + 20, 'font-size': 12, 'text-anchor': 'middle', fill: COL.zero }, ['*x', '₁,₂']));
            }
        }

        // ── Formler och texter ────────────────────────────────────────────
        function sqTex(v, d) {
            var t = fmtTex(v, d);
            return (v < 0 ? '(' + t + ')' : t) + '^2';
        }
        function subTermTex(v, d) {
            var av = Math.abs(v);
            return (v < 0 ? ' + ' : ' - ') + fmtTex(av, d);
        }
        function updateFormulas(info) {
            var half = info.half, D = info.D;
            var col = kindColor(info.kind === 'double' ? 'zero' : info.kind);
            formelDisc.style.color = col;
            katexInto(formelDisc,
                '\\left(\\dfrac{p}{2}\\right)^2 - q = ' + sqTex(half, 1) + subTermTex(state.q, 1) +
                ' = ' + fmtTex(D, 2));

            var kindWord = info.kind === 'real' ? 'positiv' : info.kind === 'complex' ? 'negativ' : 'noll';
            var solText = info.kind === 'real' ? 'två reella lösningar' :
                info.kind === 'complex' ? 'inga reella lösningar (två komplexa)' : 'en lösning (dubbelrot)';
            statusNote.style.color = col;
            statusNote.innerHTML = 'Diskriminanten är <strong>' + kindWord + '</strong> — ekvationen har ' +
                '<strong>' + solText + '</strong>.';

            if (state.step === 3) {
                formelRoots.style.display = '';
                formelRoots.style.color = col;
                if (info.kind === 'double') {
                    katexInto(formelRoots, 'x = -\\dfrac{p}{2} = ' + fmtTex(info.x, 1) + '\\quad(\\text{dubbelrot})');
                } else if (info.kind === 'real') {
                    katexInto(formelRoots,
                        'x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2-q} = ' +
                        fmtTex(-half, 1) + ' \\pm ' + fmtTex(info.sqrtD, 2) +
                        ' \\;\\Rightarrow\\; x_1 = ' + fmtTex(info.x1, 2) + ',\\ x_2 = ' + fmtTex(info.x2, 2));
                } else {
                    katexInto(formelRoots,
                        'x = -\\dfrac{p}{2} \\pm i\\sqrt{q-\\left(\\dfrac{p}{2}\\right)^2} = ' +
                        fmtTex(-half, 1) + ' \\pm ' + fmtTex(info.im, 2) + 'i');
                }
            } else {
                formelRoots.style.display = 'none';
            }
        }

        // ── Master-uppdatering ──────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legComplex.style.display = state.step >= 2 ? '' : 'none';

            scene2.style.display = state.step >= 2 ? '' : 'none';

            var info = rootsOf(state.p, state.q);
            drawParabola(info);
            if (state.step >= 2) drawComplex(info);
            updateFormulas(info);
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
    window.VISUALISERINGAR['ma2c-2.6'] = api;
    window.VISUALISERINGAR['ma4-4.3'] = api;
})();
