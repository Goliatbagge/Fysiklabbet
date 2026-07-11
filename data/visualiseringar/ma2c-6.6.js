/* ma2c-6.6.js — visualisering: "Minsta kvadratmetoden — med riktiga
 * kvadrater" (hör till ma2c-6.6, Linjär regression, och ma2c-6.7, Olika
 * regressionsmodeller).
 *
 * Kärninsikt: "bästa linjen" är inte en känsla — det är den räta linje som
 * gör summan av avvikelsernas KVADRATER så liten som möjligt. Varje
 * avvikelse (mätvärde minus linjens värde) ritas som en bokstavlig kvadrat
 * vars sida är avvikelsens belopp, så att den totala arean man ser faktiskt
 * ÄR det tal (kvadratsumman) man minimerar. Beteckningarna y = kx + m och
 * korrelationskoefficienten r är hämtade rakt av från ma2c-6.6/6.7.
 *
 * Tre steg (lager):
 *   1. Lägg din egen linje — dra i två handtag (bläck); kvadraterna och
 *      den totala kvadratarean uppdateras live. Gissa-först.
 *   2. Facit — regressionslinjen — knappen "Minimera" animerar linjen till
 *      den beräknade regressionslinjen (grön); jämförelse mot elevens
 *      gissning (streckad).
 *   3. Outliern — dra en punkt långt bort och tryck Minimera igen: se hur
 *      hårt en enda avvikande punkt drar regressionslinjen mot sig.
 *
 * Datapunkterna är dragbara i alla steg, och man kan klicka på en tom yta
 * i diagrammet för att lägga till en ny punkt.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-6.5.js / graf.js).
 * API: window.VISUALISERINGAR['ma2c-6.6'|'ma2c-6.7'] = { mount(el) -> { destroy() } }.
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
    function roundVal(v, d) { return parseFloat(fmt(v, d).replace(',', '.')); }

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
        point: '#1f2530',      // datapunkter — bläck
        student: '#1f2530',    // elevens linje — bläck
        ghost: 'rgba(31,37,48,0.5)',
        regression: '#4a7d3a', // regressionslinjen — grön
        square: '#c8324a',     // avvikelsens kvadrat — röd
        squareFill: 'rgba(200,50,74,0.18)',
        track: 'rgba(15,22,32,0.16)'
    };

    var AREA_MAX = 25;   // referens för mätarens stapel (kalibrerad mot startdata)
    var uid = 0;

    function mount(el) {
        // ── Data (utan enheter — generellt "mätvärde x" / "mätvärde y") ────
        var INITIAL_POINTS = [
            { x: 1.0, y: 2.3 }, { x: 1.8, y: 3.0 }, { x: 2.6, y: 2.6 },
            { x: 3.3, y: 4.1 }, { x: 4.0, y: 3.6 }, { x: 4.7, y: 5.0 },
            { x: 5.5, y: 4.7 }, { x: 6.2, y: 6.1 }, { x: 7.0, y: 5.6 },
            { x: 8.0, y: 7.0 }
        ];
        var INITIAL_H1 = { x: 1, y: 4.5 };
        var INITIAL_H2 = { x: 9, y: 4.5 };
        var MAX_POINTS = 16;

        var state = {
            step: 1,
            points: INITIAL_POINTS.map(function (p) { return { x: p.x, y: p.y }; }),
            h1: { x: INITIAL_H1.x, y: INITIAL_H1.y },
            h2: { x: INITIAL_H2.x, y: INITIAL_H2.y },
            revealed: false,
            ghost: null,        // { k, m } — elevens linje precis före senaste Minimera
            lastResult: null    // { areaUser, areaOpt, pct } — efter senaste animation
        };
        var animId = null;
        var dragging = null;    // 'H1' | 'H2' | 'P<i>' | null
        var bgDown = null;      // { cx, cy } — för klick-lägg-till-punkt

        function studentK() {
            var dx = state.h2.x - state.h1.x;
            if (Math.abs(dx) < 1e-6) dx = dx < 0 ? -1e-6 : 1e-6;
            return (state.h2.y - state.h1.y) / dx;
        }
        function studentM() { return state.h1.y - studentK() * state.h1.x; }

        function regression(pts) {
            var n = pts.length;
            if (n < 2) return { k: 0, m: pts.length ? pts[0].y : 0, r: 0 };
            var sx = 0, sy = 0, sxy = 0, sxx = 0, syy = 0;
            pts.forEach(function (p) {
                sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; syy += p.y * p.y;
            });
            var denomK = n * sxx - sx * sx;
            var k = Math.abs(denomK) < 1e-9 ? 0 : (n * sxy - sx * sy) / denomK;
            var m = (sy - k * sx) / n;
            var denomR = Math.sqrt(Math.max(0, (n * sxx - sx * sx) * (n * syy - sy * sy)));
            var r = denomR < 1e-9 ? 0 : (n * sxy - sx * sy) / denomR;
            return { k: k, m: m, r: r };
        }
        function areaFor(k, m, pts) {
            var s = 0;
            pts.forEach(function (p) { var d = p.y - (k * p.x + m); s += d * d; });
            return s;
        }
        // "y = kx + m" med aktuella värden, korrekt minustecken framför m.
        function lineTexKM(k, m) {
            var kTex = fmtTex(k, 2);
            var mR = roundVal(m, 2);
            var sign = mR < 0 ? ' - ' : ' + ';
            var mTex = fmtTex(Math.abs(mR), 2);
            return kTex + 'x' + sign + mTex;
        }

        // ── Geometri: kvadratisk skala (samma px/enhet i x och y!) ─────────
        var W = 560, L = 54, R = 54, T = 20, B = 40;
        var PW = W - L - R;             // 452
        var PH = PW;                    // tvingat lika — annars blir kvadraterna rektanglar
        var H = T + PH + B;             // 512
        var XMIN = 0, XMAX = 10, YMIN = 0, YMAX = 10;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }
        function Y(y) { return T + (YMAX - y) / (YMAX - YMIN) * PH; }
        function toWorldXY(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return {
                x: XMIN + (px - L) / PW * (XMAX - XMIN),
                y: YMAX - (py - T) / PH * (YMAX - YMIN)
            };
        }
        function snap(v) { return Math.round(v * 10) / 10; }
        function clampAway(newX, otherX, minSep) {
            if (Math.abs(newX - otherX) < minSep) {
                return otherX + (newX >= otherX ? minSep : -minSep);
            }
            return newX;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Minsta kvadratmetoden — med riktiga kvadrater';
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
            'aria-label': 'Spridningsdiagram med dragbara punkter och en dragbar linje ' +
                'med två handtag. Varje punkts avvikelse mot linjen ritas som en ' +
                'kvadrat vars area är avvikelsen i kvadrat.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        // Mätare: total kvadratarea (textrad + stapel)
        var meterWrap = document.createElement('div');
        meterWrap.style.margin = '8px 2px 0';
        var meterLabel = document.createElement('div');
        meterLabel.style.fontSize = '13.5px';
        meterLabel.style.color = COL.axis;
        meterWrap.appendChild(meterLabel);
        var barTrack = document.createElement('div');
        barTrack.style.height = '10px';
        barTrack.style.borderRadius = '5px';
        barTrack.style.background = COL.track;
        barTrack.style.marginTop = '4px';
        barTrack.style.overflow = 'hidden';
        var barFill = document.createElement('div');
        barFill.style.height = '100%';
        barFill.style.width = '0%';
        barFill.style.background = COL.square;
        barFill.style.borderRadius = 'inherit';
        barFill.style.transition = 'width .18s ease, background .18s ease';
        barTrack.appendChild(barFill);
        meterWrap.appendChild(barTrack);
        card.appendChild(meterWrap);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.student;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.regression;
        card.appendChild(formelB);

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
            { n: 1, label: '1 · Lägg din egen linje' },
            { n: 2, label: '2 · Facit — regressionslinjen' },
            { n: 3, label: '3 · Outliern' }
        ];
        var INSTR = {
            1: 'Dra i de två svarta handtagen för att lägga din egen räta linje ' +
               'genom punkterna. För varje punkt ritas avvikelsen mot linjen som en ' +
               'verklig kvadrat — ju sämre linjen passar, desto större blir ' +
               'kvadraterna. Lägg linjen så att den totala kvadratarean blir så ' +
               'liten du kan! Du kan också klicka på en tom yta i diagrammet för ' +
               'att lägga till en ny punkt.',
            2: 'Tryck på <em>Minimera</em> för att se din linje glida till ' +
               '<strong>regressionslinjen</strong> (grön) — den räta linje som ger ' +
               'minsta möjliga totala kvadratarea. Metoden kallas ' +
               '<em>minsta kvadratmetoden</em>. Din egen gissning visas streckad ' +
               'för jämförelse.',
            3: 'Dra en punkt långt bort från de andra och tryck <em>Minimera</em> ' +
               'igen — se hur hårt en enda avvikande punkt drar regressionslinjen ' +
               'mot sig. Kvadratarean växer med kvadraten på avståndet till linjen.'
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
        var legStudent = legendItem(COL.student, 'din linje');
        var legReg = legendItem(COL.regression, 'regressionslinje');
        var legSquare = legendItem(COL.square, 'avvikelsens kvadrat');
        legend.appendChild(legStudent);
        legend.appendChild(legReg);
        legend.appendChild(legSquare);

        // ── Actions: Minimera ────────────────────────────────────────────
        var minBtn = document.createElement('button');
        minBtn.type = 'button';
        minBtn.className = 'lab-btn';
        minBtn.textContent = 'Minimera';
        minBtn.addEventListener('click', function () { startMinimize(); });
        actions.appendChild(minBtn);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.points = INITIAL_POINTS.map(function (p) { return { x: p.x, y: p.y }; });
            state.h1 = { x: INITIAL_H1.x, y: INITIAL_H1.y };
            state.h2 = { x: INITIAL_H2.x, y: INITIAL_H2.y };
            state.revealed = false;
            state.ghost = null;
            state.lastResult = null;
            state.step = 1;
            update();
        });
        foot.appendChild(reset);

        // ── Animation: elevens linje → regressionslinjen ────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function easeInOut(t) { return t * t * (3 - 2 * t); }
        function startMinimize() {
            stopAnim();
            var reg = regression(state.points);
            var k0 = studentK(), m0 = studentM();
            state.ghost = { k: k0, m: m0 };
            state.revealed = true;
            state.lastResult = null;
            var h1x = state.h1.x, h2x = state.h2.x;
            var h1y0 = state.h1.y, h2y0 = state.h2.y;
            var h1yT = reg.k * h1x + reg.m, h2yT = reg.k * h2x + reg.m;
            var areaUserCaptured = areaFor(k0, m0, state.points);
            var areaOptCaptured = areaFor(reg.k, reg.m, state.points);
            var T_MS = 1200, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                var e = easeInOut(p);
                state.h1.y = h1y0 + (h1yT - h1y0) * e;
                state.h2.y = h2y0 + (h2yT - h2y0) * e;
                update();
                if (p < 1) { animId = requestAnimationFrame(frame); }
                else {
                    animId = null;
                    state.h1.y = h1yT; state.h2.y = h2yT;
                    var pctVal = areaUserCaptured > 1e-9
                        ? clampNum(100 * areaOptCaptured / areaUserCaptured, 0, 100) : 100;
                    state.lastResult = { areaUser: areaUserCaptured, areaOpt: areaOptCaptured, pct: pctVal };
                    update();
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Pekarhantering (drag + klicka-för-att-lägga-till) ──────────────
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var w = toWorldXY(e.clientX, e.clientY);
            var xs = clampNum(snap(w.x), XMIN, XMAX);
            var ys = clampNum(snap(w.y), YMIN, YMAX);
            if (dragging === 'H1') {
                state.h1.x = clampAway(xs, state.h2.x, 0.5);
                state.h1.y = ys;
            } else if (dragging === 'H2') {
                state.h2.x = clampAway(xs, state.h1.x, 0.5);
                state.h2.y = ys;
            } else if (dragging.charAt(0) === 'P') {
                var idx = parseInt(dragging.slice(1), 10);
                if (state.points[idx]) { state.points[idx].x = xs; state.points[idx].y = ys; }
            }
            update();
        });
        function endDrag(e) {
            if (dragging) {
                dragging = null;
                bgDown = null;
                update();
                return;
            }
            if (bgDown) {
                var dx = e.clientX - bgDown.cx, dy = e.clientY - bgDown.cy;
                if (Math.sqrt(dx * dx + dy * dy) < 6 && state.points.length < MAX_POINTS) {
                    var w = toWorldXY(bgDown.cx, bgDown.cy);
                    var xs = clampNum(snap(w.x), XMIN, XMAX);
                    var ys = clampNum(snap(w.y), YMIN, YMAX);
                    state.points.push({ x: xs, y: ys });
                    update();
                }
            }
            bgDown = null;
        }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', function () { dragging = null; bgDown = null; });

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var pts = state.points;
            var sK = studentK(), sM = studentM();
            var reg = regression(pts);
            var showReg = state.revealed && state.step >= 2;
            var showGhost = state.step === 2 && state.ghost != null;
            var i;

            // Bakgrundsyta (transparent) — klick i tom yta lägger till punkt
            var bgRect = svgEl('rect', {
                x: L, y: T, width: PW, height: PH, fill: 'rgba(0,0,0,0)', 'pointer-events': 'all'
            });
            bgRect.style.cursor = 'crosshair';
            bgRect.addEventListener('pointerdown', function (e) {
                if (e.button != null && e.button !== 0) return;
                stopAnim();
                bgDown = { cx: e.clientX, cy: e.clientY };
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
            });
            svg.appendChild(bgRect);

            // Rutnät
            for (i = 1; i <= 9; i++) {
                svg.appendChild(svgEl('line', {
                    x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1, 'pointer-events': 'none'
                }));
                svg.appendChild(svgEl('line', {
                    x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1, 'pointer-events': 'none'
                }));
            }

            // Axlar med pilspetsar (x=0 och y=0 sammanfaller med rutans kanter)
            var axisY = Y(0), axisX = X(0);
            svg.appendChild(svgEl('line', {
                x1: axisX - 6, y1: axisY, x2: L + PW + 8, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6, 'pointer-events': 'none'
            }));
            svg.appendChild(svgEl('polygon', {
                points: (L + PW + 16) + ',' + axisY + ' ' + (L + PW + 6) + ',' + (axisY - 4.5) + ' ' + (L + PW + 6) + ',' + (axisY + 4.5),
                fill: COL.axis, 'pointer-events': 'none'
            }));
            svg.appendChild(svgEl('line', {
                x1: axisX, y1: T + PH + 6, x2: axisX, y2: T, stroke: COL.axis, 'stroke-width': 1.6, 'pointer-events': 'none'
            }));
            svg.appendChild(svgEl('polygon', {
                points: axisX + ',' + (T - 10) + ' ' + (axisX - 4.5) + ',' + T + ' ' + (axisX + 4.5) + ',' + T,
                fill: COL.axis, 'pointer-events': 'none'
            }));
            svg.appendChild(svgVarText(
                { x: W - 6, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis, 'pointer-events': 'none' },
                ['*x']));
            svg.appendChild(svgVarText(
                { x: axisX + 10, y: 17, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis, 'pointer-events': 'none' },
                ['*y']));

            // Tick-etiketter (2,4,6,8,10 på båda axlarna + en gemensam "0")
            for (i = 2; i <= 10; i += 2) {
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick, 'pointer-events': 'none' },
                    [String(i)]));
                svg.appendChild(svgVarText(
                    { x: axisX - 8, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick, 'pointer-events': 'none' },
                    [String(i)]));
            }
            svg.appendChild(svgVarText(
                { x: axisX - 8, y: axisY + 14, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick, 'pointer-events': 'none' },
                ['0']));

            // Klippram för linjer + kvadrater
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Spökt linje (elevens gissning precis före senaste Minimera)
            if (showGhost) {
                var gy1 = state.ghost.k * XMIN + state.ghost.m, gy2 = state.ghost.k * XMAX + state.ghost.m;
                g.appendChild(svgEl('line', {
                    x1: X(XMIN), y1: Y(gy1), x2: X(XMAX), y2: Y(gy2),
                    stroke: COL.ghost, 'stroke-width': 1.8, 'stroke-dasharray': '6 5', 'pointer-events': 'none'
                }));
            }

            // Kvadraterna — avvikelsen för ELEVENS linje (bläck), alla steg
            pts.forEach(function (p) {
                var yLine = sK * p.x + sM;
                var resid = p.y - yLine;
                if (Math.abs(resid) < 0.02) return;
                var Px = X(p.x), Py = Y(p.y), Pl = Y(yLine);
                var side = Math.abs(Py - Pl);
                var dir = p.x < 5 ? 1 : -1;
                var x2 = Px + dir * side;
                var pts4 = [Px + ',' + Py, Px + ',' + Pl, x2 + ',' + Pl, x2 + ',' + Py].join(' ');
                g.appendChild(svgEl('polygon', {
                    points: pts4, fill: COL.squareFill, stroke: COL.square, 'stroke-width': 1.1,
                    'stroke-opacity': 0.6, 'pointer-events': 'none'
                }));
            });

            // Regressionslinjen (grön) — bara när avslöjad
            if (showReg) {
                var ry1 = reg.k * XMIN + reg.m, ry2 = reg.k * XMAX + reg.m;
                g.appendChild(svgEl('line', {
                    x1: X(XMIN), y1: Y(ry1), x2: X(XMAX), y2: Y(ry2),
                    stroke: COL.regression, 'stroke-width': 2.4, 'pointer-events': 'none'
                }));
            }

            // Elevens linje (bläck), alltid synlig och styrs av handtagen
            var sy1 = sK * XMIN + sM, sy2 = sK * XMAX + sM;
            g.appendChild(svgEl('line', {
                x1: X(XMIN), y1: Y(sy1), x2: X(XMAX), y2: Y(sy2),
                stroke: COL.student, 'stroke-width': 2.2, 'pointer-events': 'none'
            }));

            // Datapunkter (dragbara)
            pts.forEach(function (p, idx) {
                var cx = X(p.x), cy = Y(p.y);
                var dot = svgEl('circle', { cx: cx, cy: cy, r: 4.3, fill: COL.point, 'pointer-events': 'none' });
                svg.appendChild(dot);
                var hit = svgEl('circle', { cx: cx, cy: cy, r: 13, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    if (e.button != null && e.button !== 0) return;
                    stopAnim();
                    dragging = 'P' + idx;
                    bgDown = null;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault(); e.stopPropagation();
                });
                svg.appendChild(hit);
            });

            // Handtag (dragbara, styr elevens linje)
            [{ key: 'H1', p: state.h1 }, { key: 'H2', p: state.h2 }].forEach(function (h) {
                var cx = X(h.p.x), cy = Y(h.p.y);
                svg.appendChild(svgEl('circle', {
                    cx: cx, cy: cy, r: 6.5, fill: COL.student, 'pointer-events': 'none'
                }));
                var hit = svgEl('circle', { cx: cx, cy: cy, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    if (e.button != null && e.button !== 0) return;
                    stopAnim();
                    dragging = h.key;
                    bgDown = null;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault(); e.stopPropagation();
                });
                svg.appendChild(hit);
            });
        }

        // ── Formler, mätare och notistext ──────────────────────────────────
        function updateInfo() {
            var sK = studentK(), sM = studentM();
            var reg = regression(state.points);
            var showReg = state.revealed && state.step >= 2;
            var areaUser = areaFor(sK, sM, state.points);
            var areaOpt = areaFor(reg.k, reg.m, state.points);

            katexInto(formelA, 'y = ' + lineTexKM(sK, sM));
            if (showReg) { katexInto(formelB, 'y = ' + lineTexKM(reg.k, reg.m)); }
            else { formelB.textContent = ''; }

            meterLabel.innerHTML = 'Total kvadratarea: <strong>' + fmt(areaUser, 2) + '</strong>';
            var barPct = clampNum(areaUser / AREA_MAX * 100, 0, 100);
            barFill.style.width = barPct + '%';
            var isOptimal = showReg && Math.abs(areaUser - areaOpt) < 0.01;
            barFill.style.background = isOptimal ? COL.regression : COL.square;

            var lines = [];
            lines.push('<em>r</em> ≈ ' + fmtDisp(reg.r, 2));
            if (showReg) {
                lines.push('Optimal kvadratarea (regressionslinjen): <strong>' + fmt(areaOpt, 2) + '</strong>');
            }
            if (state.lastResult && state.step >= 2) {
                lines.push('Du kom inom ' + fmt(state.lastResult.pct, 0) + ' % av optimum!');
            }
            note.innerHTML = lines.join('<br>');
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            var showReg = state.revealed && state.step >= 2;
            legReg.style.display = showReg ? '' : 'none';
            formelB.style.display = showReg ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';
            drawMain();
            updateInfo();
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
    window.VISUALISERINGAR['ma2c-6.6'] = api;
    window.VISUALISERINGAR['ma2c-6.7'] = api;
})();
