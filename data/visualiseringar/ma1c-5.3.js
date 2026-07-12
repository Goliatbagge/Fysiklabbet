/* ma1c-5.3.js — visualisering: "Korrelationens lekplats" (hör till ma1c-5.3,
 * Korrelation och kausalitet).
 *
 * Kärninsikt: korrelationskoefficienten r mäter bara hur nära punkterna
 * ligger en RÄT linje — man kan ha ett perfekt tydligt mönster (t.ex. en
 * parabel) med r ≈ 0. Och ett tydligt r-samband bevisar inte kausalitet:
 * en dold tredje variabel kan ligga bakom (skensamband). Beteckningarna
 * (stark/svag, positiv/negativ korrelation, "skensamband") och exemplet i
 * steg 3 (internettillgång/medellivslängd) är hämtade rakt av från
 * ma1c-5.3.md, Exempel 1.
 *
 * Tre steg (lager):
 *   1. Känn på r        — 12 dragbara punkter (klicka tom yta för att lägga
 *                          till, max 20; dubbelklick/långtryck tar bort).
 *                          Live r-mätare. Två uppdrag: nå r ≈ 0,9, sänk
 *                          sedan under 0,2.
 *   2. Fällan            — samma lekplats. Uppdrag: bygg ett TYDLIGT mönster
 *                          med r ≈ 0. Knappen "Visa ett exempel" lägger
 *                          punkterna i en symmetrisk parabel (r exakt 0).
 *   3. Korrelation ≠ kausalitet — låst, färdigbyggt exempel (internet-
 *                          tillgång/medellivslängd, 14 länder, svag positiv
 *                          korrelation som i genomgången). Knappen
 *                          "Avslöja den tredje variabeln" färgar punkterna
 *                          efter ländernas rikedom och förklarar skensambandet.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma2c-6.6.js / graf.js).
 * API: window.VISUALISERINGAR['ma1c-5.3'] = { mount(el) -> { destroy() } }.
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

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        point: '#1f2530',      // datapunkter — bläck
        reg: '#4a7d3a',        // regressionslinjen — grön
        neutral: '#8b93a1',    // r nära 0 — grå
        pos: '#2f8f4e',        // stark positiv korrelation — grön
        neg: '#c8324a',        // stark negativ korrelation — röd
        poor: '#2563c9',       // "fattigare länder" i steg 3 — blå
        rich: '#c8324a',       // "rikare länder" i steg 3 — röd
        track: 'rgba(15,22,32,0.16)'
    };

    function hexMix(hex1, hex2, t) {
        function h2r(h) { h = h.replace('#', ''); var num = parseInt(h, 16); return [(num >> 16) & 255, (num >> 8) & 255, num & 255]; }
        var c1 = h2r(hex1), c2 = h2r(hex2);
        var rr = Math.round(c1[0] + (c2[0] - c1[0]) * t);
        var gg = Math.round(c1[1] + (c2[1] - c1[1]) * t);
        var bb = Math.round(c1[2] + (c2[2] - c1[2]) * t);
        return 'rgb(' + rr + ',' + gg + ',' + bb + ')';
    }
    function rColor(r) {
        if (r == null) return COL.tick;
        var a = clampNum(Math.abs(r), 0, 1);
        var base = r >= 0 ? COL.pos : COL.neg;
        return hexMix(COL.neutral, base, a);
    }
    function rWord(r) {
        if (r == null) return '';
        var a = Math.abs(r);
        if (a < 0.15) return 'Ingen korrelation';
        var strength = a >= 0.7 ? 'Stark' : 'Svag';
        var sign = r > 0 ? 'positiv' : 'negativ';
        return strength + ' ' + sign + ' korrelation';
    }

    // ── Regression / korrelation (Pearson r) ───────────────────────────
    function regression(pts) {
        var n = pts.length;
        if (n < 2) return { k: 0, m: pts.length ? pts[0].y : 0 };
        var sx = 0, sy = 0, sxy = 0, sxx = 0;
        pts.forEach(function (p) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; });
        var denomK = n * sxx - sx * sx;
        var k = Math.abs(denomK) < 1e-9 ? 0 : (n * sxy - sx * sy) / denomK;
        var m = (sy - k * sx) / n;
        return { k: k, m: m };
    }
    function computeR(pts) {
        var n = pts.length;
        if (n < 3) return null;
        var sx = 0, sy = 0, sxy = 0, sxx = 0, syy = 0;
        pts.forEach(function (p) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; syy += p.y * p.y; });
        var denomR = Math.sqrt(Math.max(0, (n * sxx - sx * sx) * (n * syy - sy * sy)));
        if (denomR < 1e-9) return null;
        return (n * sxy - sx * sy) / denomR;
    }
    // "y = kx + m" med aktuella värden, korrekt minustecken framför m.
    function lineTexKM(k, m) {
        var kTex = fmtTex(k, 2);
        var mR = parseFloat(fmt(m, 2).replace(',', '.'));
        var sign = mR < 0 ? ' - ' : ' + ';
        var mTex = fmtTex(Math.abs(mR), 2);
        return kTex + 'x' + sign + mTex;
    }

    var uid = 0;

    function mount(el) {
        // ── Data: lekplatsen (steg 1 & 2, delad) ─────────────────────────
        var INITIAL_POINTS = [
            { x: 0.6, y: 3.2 }, { x: 1.4, y: 6.6 }, { x: 2.2, y: 1.8 }, { x: 3.0, y: 7.4 },
            { x: 3.8, y: 2.6 }, { x: 4.6, y: 8.0 }, { x: 5.4, y: 3.4 }, { x: 6.2, y: 7.8 },
            { x: 7.0, y: 4.6 }, { x: 7.8, y: 8.6 }, { x: 8.6, y: 5.4 }, { x: 9.4, y: 9.0 }
        ];
        var MAX_POINTS = 20;
        // Symmetrisk parabel (kring x = 5) — ger r exakt 0 trots ett
        // spikrakt tydligt mönster. Facit-knappen "Visa ett exempel" i steg 2.
        var PARABOLA_POINTS = [];
        for (var px = 0; px <= 10; px++) {
            PARABOLA_POINTS.push({ x: px, y: 9 - 0.32 * (px - 5) * (px - 5) });
        }

        // ── Data: steg 3 — låst exempel (Exempel 1 i genomgången) ─────────
        // x = tillgång till internet (%), y = medellivslängd (år),
        // w = landets rikedom (godtycklig skala, bara för färgläggning).
        var STEP3_DATA = [
            { x: 5, y: 65, w: 15 }, { x: 10, y: 57, w: 22 }, { x: 15, y: 72, w: 30 },
            { x: 22, y: 60, w: 28 }, { x: 28, y: 76, w: 45 }, { x: 33, y: 62, w: 38 },
            { x: 40, y: 80, w: 55 }, { x: 47, y: 64, w: 50 }, { x: 52, y: 78, w: 68 },
            { x: 60, y: 68, w: 60 }, { x: 66, y: 82, w: 75 }, { x: 74, y: 70, w: 70 },
            { x: 82, y: 79, w: 88 }, { x: 90, y: 73, w: 82 }
        ];
        var R3 = computeR(STEP3_DATA);
        var REG3 = regression(STEP3_DATA);
        var W_MIN = Math.min.apply(null, STEP3_DATA.map(function (p) { return p.w; }));
        var W_MAX = Math.max.apply(null, STEP3_DATA.map(function (p) { return p.w; }));
        function wealthColor(w) { return hexMix(COL.poor, COL.rich, clampNum((w - W_MIN) / (W_MAX - W_MIN), 0, 1)); }

        var state = {
            step: 1,
            points: INITIAL_POINTS.map(function (p) { return { x: p.x, y: p.y }; }),
            revealed3: false
        };
        var dragging = null;      // 'P<i>' | null
        var bgDown = null;        // { cx, cy } — klick-lägg-till-punkt
        var pressTimer = null, pressIdx = null, pressStart = null, pressMoved = false;

        // ── Geometri: kvadratisk pixel-ruta, olika domäner per steg ────────
        var W = 560, H = 420, L = 50, R = 20, T = 20, B = 40;
        var PW = W - L - R, PH = H - T - B;
        var DOM12 = {
            xmin: 0, xmax: 10, ymin: 0, ymax: 10,
            xGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9], yGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            xTicks: [2, 4, 6, 8, 10], yTicks: [2, 4, 6, 8, 10],
            cornerLabel: '0'
        };
        var DOM3 = {
            xmin: 0, xmax: 100, ymin: 50, ymax: 90,
            xGrid: [20, 40, 60, 80], yGrid: [60, 70, 80],
            xTicks: [20, 40, 60, 80, 100], yTicks: [60, 70, 80, 90],
            cornerLabel: '50'
        };
        function currentDom() { return state.step === 3 ? DOM3 : DOM12; }
        function X(dom, x) { return L + (x - dom.xmin) / (dom.xmax - dom.xmin) * PW; }
        function Y(dom, y) { return T + (dom.ymax - y) / (dom.ymax - dom.ymin) * PH; }
        function toWorld(dom, clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px2 = (clientX - r.left) * W / r.width;
            var py2 = (clientY - r.top) * H / r.height;
            return {
                x: dom.xmin + (px2 - L) / PW * (dom.xmax - dom.xmin),
                y: dom.ymax - (py2 - T) / PH * (dom.ymax - dom.ymin)
            };
        }
        function snap(v) { return Math.round(v * 10) / 10; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Korrelationens lekplats';
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
            'aria-label': 'Interaktivt spridningsdiagram med dragbara punkter. Dra i ' +
                'punkterna, klicka på en tom yta för att lägga till en punkt, eller ' +
                'dubbelklicka en punkt för att ta bort den. Korrelationskoefficienten ' +
                'r visas live under diagrammet.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        // r-mätare (eget widget, inline-styles)
        var meterWrap = document.createElement('div');
        meterWrap.style.margin = '10px 2px 0';
        var rBig = document.createElement('div');
        rBig.style.fontSize = '25px';
        rBig.style.fontWeight = '600';
        rBig.style.lineHeight = '1.25';
        meterWrap.appendChild(rBig);
        var rWordDiv = document.createElement('div');
        rWordDiv.style.fontSize = '13px';
        rWordDiv.style.color = COL.tick;
        rWordDiv.style.marginTop = '2px';
        meterWrap.appendChild(rWordDiv);

        var scaleWrap = document.createElement('div');
        scaleWrap.style.position = 'relative';
        scaleWrap.style.height = '30px';
        scaleWrap.style.marginTop = '8px';
        meterWrap.appendChild(scaleWrap);
        var scaleTrack = document.createElement('div');
        scaleTrack.style.position = 'absolute';
        scaleTrack.style.left = '4px'; scaleTrack.style.right = '4px';
        scaleTrack.style.top = '12px'; scaleTrack.style.height = '4px';
        scaleTrack.style.borderRadius = '2px';
        scaleTrack.style.background = COL.track;
        scaleWrap.appendChild(scaleTrack);
        [{ v: -1, t: '−1' }, { v: 0, t: '0' }, { v: 1, t: '+1' }].forEach(function (tk) {
            var pct = (tk.v + 1) / 2 * 100;
            var mark = document.createElement('div');
            mark.style.position = 'absolute'; mark.style.left = pct + '%'; mark.style.top = '6px';
            mark.style.width = '1px'; mark.style.height = '16px'; mark.style.background = COL.tick;
            scaleWrap.appendChild(mark);
            var lbl = document.createElement('div');
            lbl.textContent = tk.t;
            lbl.style.position = 'absolute'; lbl.style.left = pct + '%'; lbl.style.top = '22px';
            lbl.style.transform = 'translateX(-50%)'; lbl.style.fontSize = '11px'; lbl.style.color = COL.tick;
            scaleWrap.appendChild(lbl);
        });
        var marker = document.createElement('div');
        marker.style.position = 'absolute'; marker.style.top = '5px';
        marker.style.width = '16px'; marker.style.height = '16px';
        marker.style.borderRadius = '50%';
        marker.style.transform = 'translateX(-50%)';
        marker.style.boxShadow = '0 1px 3px rgba(15,22,32,0.35)';
        marker.style.transition = 'left .12s ease, background .12s ease';
        scaleWrap.appendChild(marker);
        card.appendChild(meterWrap);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.reg;
        card.appendChild(formelA);

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
            { n: 1, label: '1 · Känn på r' },
            { n: 2, label: '2 · Mönster utan korrelation' },
            { n: 3, label: '3 · Korrelation ≠ kausalitet' }
        ];
        var INSTR = {
            1: 'Dra i punkterna för att ändra sambandet. Klicka på en tom yta i ' +
               'diagrammet för att lägga till en punkt (max 20 stycken); dubbelklicka ' +
               'på en punkt (eller håll in den) för att ta bort den. Mätaren nedanför ' +
               'visar korrelationskoefficienten <em>r</em> live.',
            2: 'Samma lekplats som i steg 1. Nu till fällan: <em>r</em> mäter bara ' +
               'raka, linjära samband. Kan du placera punkterna i ett tydligt mönster ' +
               'som INTE är en rät linje — och ändå få <em>r</em> nära 0?',
            3: 'Ett exempel från genomgången: tillgång till internet (<em>x</em>) och ' +
               'medellivslängd (<em>y</em>) för 14 länder. Punkterna är låsta. ' +
               'Korrelationen syns tydligt — men bevisar den ett orsakssamband?'
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
        var legPoint = legendItem(COL.point, 'datapunkt');
        var legPoor = legendItem(COL.poor, 'fattigare länder');
        var legRich = legendItem(COL.rich, 'rikare länder');
        var legReg = legendItem(COL.reg, 'regressionslinje (vid |<em>r</em>| &gt; 0,3)');
        legend.appendChild(legPoint);
        legend.appendChild(legPoor);
        legend.appendChild(legRich);
        legend.appendChild(legReg);

        // ── Actions ──────────────────────────────────────────────────────
        var exampleBtn = document.createElement('button');
        exampleBtn.type = 'button';
        exampleBtn.className = 'lab-btn';
        exampleBtn.textContent = 'Visa ett exempel';
        exampleBtn.addEventListener('click', function () {
            state.points = PARABOLA_POINTS.map(function (p) { return { x: p.x, y: p.y }; });
            update();
        });
        actions.appendChild(exampleBtn);

        var revealBtn = document.createElement('button');
        revealBtn.type = 'button';
        revealBtn.className = 'lab-btn';
        revealBtn.textContent = 'Avslöja den tredje variabeln';
        revealBtn.addEventListener('click', function () {
            state.revealed3 = !state.revealed3;
            revealBtn.textContent = state.revealed3 ? 'Dölj den tredje variabeln' : 'Avslöja den tredje variabeln';
            update();
        });
        actions.appendChild(revealBtn);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.points = INITIAL_POINTS.map(function (p) { return { x: p.x, y: p.y }; });
            state.revealed3 = false;
            revealBtn.textContent = 'Avslöja den tredje variabeln';
            state.step = 1;
            update();
        });
        foot.appendChild(reset);

        // ── Ta bort punkt ────────────────────────────────────────────────
        function removePoint(idx) {
            if (idx < 0 || idx >= state.points.length) return;
            state.points.splice(idx, 1);
            dragging = null; pressTimer = null; pressIdx = null;
            update();
        }
        function attachPointHandlers(hit, idx) {
            hit.addEventListener('pointerdown', function (e) {
                if (e.button != null && e.button !== 0) return;
                dragging = 'P' + idx;
                bgDown = null;
                pressIdx = idx; pressStart = { x: e.clientX, y: e.clientY }; pressMoved = false;
                if (pressTimer) clearTimeout(pressTimer);
                pressTimer = setTimeout(function () {
                    if (!pressMoved && dragging === 'P' + idx) removePoint(idx);
                    pressTimer = null;
                }, 550);
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault(); e.stopPropagation();
            });
            hit.addEventListener('dblclick', function (e) {
                removePoint(idx);
                e.preventDefault(); e.stopPropagation();
            });
        }
        function onBgDown(e) {
            if (e.button != null && e.button !== 0) return;
            if (state.step === 3) return;
            bgDown = { cx: e.clientX, cy: e.clientY };
            try { svg.setPointerCapture(e.pointerId); } catch (err) {}
        }

        // ── Pekarhantering (drag + klicka-för-att-lägga-till) ──────────────
        svg.addEventListener('pointermove', function (e) {
            if (pressTimer && pressIdx != null && pressStart) {
                var ddx = e.clientX - pressStart.x, ddy = e.clientY - pressStart.y;
                if (Math.sqrt(ddx * ddx + ddy * ddy) > 6) { pressMoved = true; clearTimeout(pressTimer); pressTimer = null; }
            }
            if (!dragging) return;
            var dom = currentDom();
            var w = toWorld(dom, e.clientX, e.clientY);
            var xs = clampNum(snap(w.x), dom.xmin, dom.xmax);
            var ys = clampNum(snap(w.y), dom.ymin, dom.ymax);
            var idx = parseInt(dragging.slice(1), 10);
            if (state.points[idx]) { state.points[idx].x = xs; state.points[idx].y = ys; }
            update();
        });
        function endDrag(e) {
            if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
            pressIdx = null; pressStart = null; pressMoved = false;
            if (dragging) { dragging = null; update(); return; }
            if (bgDown) {
                var ddx = e.clientX - bgDown.cx, ddy = e.clientY - bgDown.cy;
                if (Math.sqrt(ddx * ddx + ddy * ddy) < 6 && state.step !== 3 && state.points.length < MAX_POINTS) {
                    var dom = currentDom();
                    var w = toWorld(dom, bgDown.cx, bgDown.cy);
                    var xs = clampNum(snap(w.x), dom.xmin, dom.xmax);
                    var ys = clampNum(snap(w.y), dom.ymin, dom.ymax);
                    state.points.push({ x: xs, y: ys });
                    update();
                }
            }
            bgDown = null;
        }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', function () {
            dragging = null; bgDown = null;
            if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
        });

        // ── Rita scenen ──────────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawScene(dom, pts, r, reg, showReg) {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var axisX = X(dom, dom.xmin), axisY = Y(dom, dom.ymin);
            var i;

            // Rutnät
            dom.xGrid.forEach(function (gx) {
                svg.appendChild(svgEl('line', { x1: X(dom, gx), y1: T, x2: X(dom, gx), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            });
            dom.yGrid.forEach(function (gy) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(dom, gy), x2: L + PW, y2: Y(dom, gy), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // Bakgrundsyta (transparent) — klick i tom yta lägger till punkt (steg 1/2)
            if (state.step !== 3) {
                var bgRect = svgEl('rect', { x: L, y: T, width: PW, height: PH, fill: 'rgba(0,0,0,0)' });
                bgRect.style.cursor = 'crosshair';
                bgRect.addEventListener('pointerdown', onBgDown);
                svg.appendChild(bgRect);
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: T - 8, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 16) + ' ' + (axisX - 4.5) + ',' + (T - 6) + ' ' + (axisX + 4.5) + ',' + (T - 6), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 6, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T - 4, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter
            dom.xTicks.forEach(function (tx) {
                svg.appendChild(svgVarText({ x: X(dom, tx), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(tx)]));
            });
            dom.yTicks.forEach(function (ty) {
                svg.appendChild(svgVarText({ x: axisX - 8, y: Y(dom, ty) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(ty)]));
            });
            svg.appendChild(svgVarText({ x: axisX - 8, y: axisY + 14, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [dom.cornerLabel]));

            // Klippram (bara regressionslinjen behöver klippas — punkterna hålls alltid inom domänen)
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            if (showReg) {
                var ry1 = reg.k * dom.xmin + reg.m, ry2 = reg.k * dom.xmax + reg.m;
                var opac = state.step === 3 ? 0.85 : clampNum(0.25 + Math.abs(r) * 0.65, 0.25, 0.9);
                g.appendChild(svgEl('line', {
                    x1: X(dom, dom.xmin), y1: Y(dom, ry1), x2: X(dom, dom.xmax), y2: Y(dom, ry2),
                    stroke: COL.reg, 'stroke-width': 2, opacity: opac
                }));
            }

            // Datapunkter
            if (state.step === 3) {
                pts.forEach(function (p) {
                    var cx = X(dom, p.x), cy = Y(dom, p.y);
                    var fill = state.revealed3 ? wealthColor(p.w) : COL.point;
                    svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 4.6, fill: fill }));
                });
            } else {
                pts.forEach(function (p, idx) {
                    var cx = X(dom, p.x), cy = Y(dom, p.y);
                    svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 4.4, fill: COL.point }));
                    var hit = svgEl('circle', { cx: cx, cy: cy, r: 14, fill: 'rgba(0,0,0,0)' });
                    hit.style.cursor = 'grab';
                    attachPointHandlers(hit, idx);
                    svg.appendChild(hit);
                });
            }
        }

        // ── Notis-"chip" (uppdrag/insikt, grön när uppnådd) ────────────────
        function chip(html, achieved) {
            var bg = achieved ? 'rgba(47,143,78,0.14)' : 'rgba(31,37,48,0.04)';
            var bd = achieved ? COL.pos : 'rgba(31,37,48,0.18)';
            var fg = achieved ? COL.pos : COL.axis;
            return '<div style="padding:6px 10px;margin-top:6px;border-radius:7px;' +
                'background:' + bg + ';border:1px solid ' + bd + ';color:' + fg + ';font-size:13.5px">' + html + '</div>';
        }

        // ── Mätare, formel, notis ───────────────────────────────────────
        function updateMeter(r) {
            var col = rColor(r);
            if (r == null) {
                rBig.textContent = 'r ej definierat';
                rBig.style.color = COL.tick;
                rWordDiv.textContent = 'Lägg till minst tre punkter med spridning i både x- och y-led.';
                marker.style.left = '50%';
                marker.style.background = COL.tick;
                marker.style.opacity = '0.4';
            } else {
                katexInto(rBig, 'r \\approx ' + fmtTex(r, 2));
                rBig.style.color = col;
                rWordDiv.textContent = rWord(r);
                marker.style.left = clampNum((r + 1) / 2 * 100, 0, 100) + '%';
                marker.style.background = col;
                marker.style.opacity = '1';
            }
        }
        function updateFormula(showReg, reg) {
            if (showReg) { formelA.style.display = ''; katexInto(formelA, 'y = ' + lineTexKM(reg.k, reg.m)); }
            else { formelA.style.display = 'none'; }
        }
        function updateNote(r) {
            if (state.step === 1) {
                var g1 = (r != null && r >= 0.85);
                var g2 = (r != null && Math.abs(r) < 0.2);
                note.innerHTML =
                    chip('Uppdrag 1 — skapa ett starkt samband: <em>r</em> ≈ 0,9.' + (g1 ? ' Klart!' : ''), g1) +
                    chip('Uppdrag 2 — förstör sambandet: få ner <em>r</em> under 0,2.' + (g2 ? ' Klart!' : ''), g2);
            } else if (state.step === 2) {
                var g = (r != null && Math.abs(r) < 0.15);
                note.innerHTML =
                    '<div>Kom ihåg: <em>r</em> mäter bara hur nära punkterna ligger en RÄT linje.</div>' +
                    chip('Uppdrag — skapa ett tydligt mönster med <em>r</em> ≈ 0.' +
                        (g ? ' Snyggt! Mönstret är tydligt, men r ≈ 0.' : ''), g);
            } else {
                if (!state.revealed3) {
                    note.innerHTML = '<div>Tillgången till internet (<em>x</em>) och medellivslängden ' +
                        '(<em>y</em>) samvarierar: <em>r</em> ≈ ' + fmtDisp(r, 2) + '. Betyder det att mer ' +
                        'internet ger ett längre liv?</div>';
                } else {
                    note.innerHTML = chip('Den bakomliggande variabeln är ländernas rikedom (färgen på ' +
                        'punkterna). Rika länder (rött) har ofta både god tillgång till internet och ' +
                        'bättre sjukvård, som ger längre medellivslängd — internet i sig förlänger inte ' +
                        'livet. Detta kallas ett <strong>skensamband</strong>.', true);
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            exampleBtn.style.display = state.step === 2 ? '' : 'none';
            revealBtn.style.display = state.step === 3 ? '' : 'none';

            var dom = currentDom();
            var pts = state.step === 3 ? STEP3_DATA : state.points;
            var r = state.step === 3 ? R3 : computeR(state.points);
            var reg = state.step === 3 ? REG3 : regression(state.points);
            var showReg = state.step === 3 ? true : (r != null && Math.abs(r) > 0.3);

            legPoint.style.display = state.step === 3 ? 'none' : '';
            legPoor.style.display = (state.step === 3 && state.revealed3) ? '' : 'none';
            legRich.style.display = (state.step === 3 && state.revealed3) ? '' : 'none';
            legReg.style.display = showReg ? '' : 'none';

            drawScene(dom, pts, r, reg, showReg);
            updateMeter(r);
            updateFormula(showReg, reg);
            updateNote(r);
        }

        update();

        return {
            destroy: function () {
                if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-5.3'] = api;
})();
