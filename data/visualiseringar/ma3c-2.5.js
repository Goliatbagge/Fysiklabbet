/* ma3c-2.5.js — visualisering: "Deriverbarhets-mikroskopet" (deriverbarhet
 * och absolutbelopp). Hör till ma3c-2.5.
 *
 * Kärninsikt: deriverbar = LOKALT LINJÄR. Zoomar man in på en deriverbar
 * punkt rätas kurvan ut till en rät linje (vars lutning är derivatan). Ett
 * hörn (t.ex. |x| i origo) förblir ett hörn hur mycket man än zoomar — det
 * finns ingen enda tangentriktning där.
 *
 * Tre steg (funktioner), samma som (eller nära) genomgångens exempel:
 *   1. Slät kurva        — f(x) = x² . Gissa-först: rätas kurvan ut?
 *                           Zoom-glidare ×1 → ×200. Vänster-/högerlutningen
 *                           (beräknad över linsens bredd) konvergerar mot
 *                           samma värde.
 *   2. Hörnet som vägrar  — f(x) = |x| i x = 0 (genomgångens exempel).
 *                           Lutningarna −1 och +1 förblir olika hur mycket
 *                           man än zoomar.
 *   3. Testa själv        — f(x) = |x² − 2| (hörn vid x = ±√2). Dra punkten
 *                           längs kurvan: de flesta ställen är deriverbara
 *                           (en lutning), hörnen är det inte (två olika).
 *
 * Linsen är en andra, mindre SVG-vy: kurvan ritas om i zoomat, isotropt
 * skal kring den valda punkten och klipps med en cirkulär clipPath.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['<id>'] = { mount(el) }.
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
    // Samma '*'-konvention men som HTML-sträng (för legend/instr-text).
    function partsToHTML(parts) {
        return parts.map(function (p) {
            return p.charAt(0) === '*' ? '<em>' + p.slice(1) + '</em>' : p;
        }).join('');
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Färger (samma familj som graf.js/teorifigurerna) ─────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // kurvan / vänsterlutning
        secant: '#4a7d3a',     // deriverbar (grönt facit)
        tangent: '#c8324a',    // inte deriverbar / högerlutning (accentröd)
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── Layout: huvudscen ──────────────────────────────────────────────
    var W = 560, H1 = 380, L = 46, R = 16, T = 14, B = 36;
    var PW = W - L - R, PH = H1 - T - B;
    var XMIN = -4, XMAX = 4;
    var S_MAIN = PW / (XMAX - XMIN);   // px per enhet — bas för linsens skala

    // ── Layout: linsen (andra, mindre vy) ─────────────────────────────
    var LENS_W = 232, LENS_H = 232, LENS_CX = LENS_W / 2, LENS_CY = LENS_H / 2;
    var LENS_R_BORDER = 94, LENS_R_CLIP = 90;

    var ZOOM_MIN = 1, ZOOM_MAX = 200;
    var CORNER_THRESH = 0.15;   // |höger − vänster| under detta → "en lutning"
    var CONFIRM_ZOOM = 30;      // zoom-nivå för att våga slå fast "inte deriverbar"
    var SNAP_TOL = 0.06;        // "magnet" mot hörnpunkter vid dragning

    // ── De tre funktionerna ────────────────────────────────────────────
    var FUNCS = {
        1: {
            key: 'x2',
            parts: ['*f', '(', '*x', ') = ', '*x', '²'],
            f: function (x) { return x * x; },
            kinks: [],
            defaultX0: 2, defaultZoom: 1,
            yRange: [-1.6, 17], gridStep: 4
        },
        2: {
            key: 'abs',
            parts: ['*f', '(', '*x', ') = |', '*x', '|'],
            f: function (x) { return Math.abs(x); },
            kinks: [0],
            defaultX0: 0, defaultZoom: 5,
            yRange: [-0.5, 4.6], gridStep: 1
        },
        3: {
            key: 'abs2',
            parts: ['*f', '(', '*x', ') = |', '*x', '² − 2|'],
            f: function (x) { return Math.abs(x * x - 2); },
            kinks: [-Math.SQRT2, Math.SQRT2],
            defaultX0: 0, defaultZoom: 20,
            yRange: [-0.8, 15], gridStep: 4
        }
    };

    // Vänster-/högersekant beräknad över halfWorld på vardera sida av x0,
    // samt en klassificering: "merged" (en lutning), "corner" (säkert
    // olika, hög zoom) eller "undecided" (skiljer sig men zoom för låg
    // för att vara säker).
    function statusFor(FN, x0, zoom) {
        var halfWorld = LENS_R_CLIP / (S_MAIN * zoom);
        var Lk = (FN.f(x0) - FN.f(x0 - halfWorld)) / halfWorld;
        var Rk = (FN.f(x0 + halfWorld) - FN.f(x0)) / halfWorld;
        var diff = Math.abs(Rk - Lk);
        var merged = diff < CORNER_THRESH;
        var state = merged ? 'merged' : (zoom >= CONFIRM_ZOOM ? 'corner' : 'undecided');
        return { L: Lk, R: Rk, diff: diff, halfWorld: halfWorld, state: state };
    }

    // Bygger en path-sträng för f över [xStart, xEnd], med ev. hörnpunkter
    // i kinksIn tvingade in som exakta samplingspunkter (annars kan hörnet
    // avrundas av den jämna samplingen).
    function pathFor(f, xStart, xEnd, n, kinksIn, X, Y) {
        var xs = [], i;
        for (i = 0; i <= n; i++) xs.push(xStart + (xEnd - xStart) * i / n);
        (kinksIn || []).forEach(function (k) {
            if (k > xStart && k < xEnd) xs.push(k);
        });
        xs.sort(function (a, b) { return a - b; });
        var d = '';
        for (i = 0; i < xs.length; i++) {
            var x = xs[i];
            d += (i === 0 ? 'M' : 'L') + X(x).toFixed(2) + ' ' + Y(f(x)).toFixed(2) + ' ';
        }
        return d;
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, x0: FUNCS[1].defaultX0, zoom: FUNCS[1].defaultZoom, zoomT: 0 };
        state.zoomT = Math.log(state.zoom) / Math.log(ZOOM_MAX);
        var animId = null;
        var STATUS = null;   // uppdateras överst i update()

        function currentFN() { return FUNCS[state.step]; }
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Deriverbarhets-mikroskopet';
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
            viewBox: '0 0 ' + W + ' ' + H1,
            width: W, height: H1,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf med en dragbar punkt på kurvan. ' +
                'En cirkulär lins under grafen visar en zoomad delbild kring punkten.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        // Linsen: en andra, mindre scen — centrerad och smalare än huvudscenen.
        var sceneLens = document.createElement('div');
        sceneLens.className = 'lab-graf-scene lab-vis-scene';
        sceneLens.style.maxWidth = '250px';
        sceneLens.style.margin = '14px auto 0';
        card.appendChild(sceneLens);

        var svgLens = svgEl('svg', {
            viewBox: '0 0 ' + LENS_W + ' ' + LENS_H,
            width: LENS_W, height: LENS_H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Linsen: zoomad delbild av kurvan kring den valda punkten.'
        });
        svgLens.classList.add('lab-graf-svg');
        svgLens.style.cursor = 'default';
        sceneLens.appendChild(svgLens);

        var lensCaption = document.createElement('div');
        lensCaption.style.textAlign = 'center';
        lensCaption.style.fontSize = '13px';
        lensCaption.style.color = 'var(--lab-ink-soft)';
        lensCaption.style.marginTop = '4px';
        sceneLens.appendChild(lensCaption);

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
            { n: 1, label: '1 · Slät kurva' },
            { n: 2, label: '2 · Hörnet som vägrar' },
            { n: 3, label: '3 · Testa själv' }
        ];
        var INSTR = {
            1: 'Gissa först: kommer kurvan att se böjd ut hur långt in du än ' +
               'zoomar? Dra i <em>zoom</em>-glidaren (eller flytta punkten) ' +
               'och se vad som händer i linsen.',
            2: 'Nu undersöker vi <em>f</em>(<em>x</em>) = |<em>x</em>| i ' +
               'hörnpunkten <em>x</em> = 0. Dra <em>zoom</em>-glidaren mellan ' +
               '×5, ×50 och ×200 — ändras formen i linsen?',
            3: 'Dra punkten längs kurvan <em>f</em>(<em>x</em>) = ' +
               '|<em>x</em>² − 2|. På de flesta ställen rätas linsen ut till en ' +
               'rät linje. Hitta punkterna där den inte gör det.'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                stopAnim();
                state.step = s.n;
                var FN = currentFN();
                state.x0 = FN.defaultX0;
                setZoom(FN.defaultZoom);
                rowX0.sync();
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
            return { el: span, txt: txt };
        }
        var legCurve = legendItem(COL.curve, '');
        legend.appendChild(legCurve.el);

        // ── Zooma automatiskt ────────────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Zooma in automatiskt';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        // ── Glidare: x0 (dra punkten längs kurvan) ─────────────────────────
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
            var decimals = step < 0.05 ? 2 : step < 1 ? 1 : 0;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                    COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(v, min, max));
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
        function setX0(v) {
            var x = clampNum(v, XMIN, XMAX);
            var FN = currentFN();
            var snapped = null;
            (FN.kinks || []).forEach(function (k) {
                if (Math.abs(x - k) < SNAP_TOL) snapped = k;
            });
            state.x0 = snapped != null ? snapped : x;
        }
        var rowX0 = makeRow('x₀', XMIN, XMAX, 0.02,
            function () { return state.x0; },
            function (v) { setX0(v); });

        // ── Glidare: zoom (exponentiell — glidaren styr exponenten) ───────
        function setZoom(z) {
            state.zoom = clampNum(z, ZOOM_MIN, ZOOM_MAX);
            state.zoomT = Math.log(state.zoom) / Math.log(ZOOM_MAX);
        }
        var zoomRow, zoomSlider, zoomField;
        (function () {
            zoomRow = document.createElement('div');
            zoomRow.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var nameSpan = document.createElement('span');
            nameSpan.textContent = 'zoom';
            nameSpan.style.fontFamily = 'var(--lab-font-display)';
            nameSpan.style.fontSize = '15px';
            nameSpan.style.color = 'var(--lab-ink-soft)';
            nameSpan.style.minWidth = '2.6em';
            nameSpan.style.textAlign = 'center';
            nameSpan.style.flexShrink = '0';
            lbl.appendChild(nameSpan);
            zoomSlider = document.createElement('input');
            zoomSlider.type = 'range';
            zoomSlider.className = 'lab-graf-slider';
            zoomSlider.min = 0; zoomSlider.max = 1; zoomSlider.step = 0.0015;
            zoomSlider.value = state.zoomT;
            zoomSlider.setAttribute('aria-label', 'Zoomnivå i linsen');
            zoomField = document.createElement('div');
            zoomField.className = 'lab-graf-num';
            zoomSlider.addEventListener('input', function () {
                stopAnim();
                setZoom(Math.pow(ZOOM_MAX, parseFloat(zoomSlider.value)));
                update();
            });
            lbl.appendChild(zoomSlider);
            zoomRow.appendChild(lbl);
            zoomRow.appendChild(zoomField);
            controls.appendChild(zoomRow);
        })();
        function syncZoomRow() {
            zoomSlider.value = state.zoomT;
            var pct = clampNum(state.zoomT * 100, 0, 100);
            zoomSlider.style.background = 'linear-gradient(to right, ' + COL.tangent + ' 0%, ' +
                COL.tangent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            zoomField.textContent = '×' + fmt(state.zoom, state.zoom < 10 ? 1 : 0);
        }

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            var FN = currentFN();
            state.x0 = FN.defaultX0;
            setZoom(FN.defaultZoom);
            rowX0.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: zooma automatiskt från ×1 till ×200 ─────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var T_MS = 3200, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                setZoom(Math.pow(ZOOM_MAX, p));
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            setZoom(ZOOM_MIN);
            animId = requestAnimationFrame(frame);
        }

        // ── Dragpunkt i huvudscenen ─────────────────────────────────────────
        function toWorldX(clientX) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        var dragging = false;
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            setX0(toWorldX(e.clientX));
            rowX0.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita huvudscenen ──────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var FN = currentFN();
            var ymin = FN.yRange[0], ymax = FN.yRange[1];
            function Y(y) { return T + (ymax - y) / (ymax - ymin) * PH; }
            var axisY = Y(0), axisX = X(0);
            var x0 = state.x0, y0 = FN.f(x0);
            var i;

            // Rutnät
            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            var gs = FN.gridStep;
            for (var yv = Math.ceil(ymin / gs) * gs; yv <= ymax; yv += gs) {
                if (Math.abs(yv) < 1e-9) continue;
                svg.appendChild(svgEl('line', { x1: L, y1: Y(yv), x2: L + PW, y2: Y(yv), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 20, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',10 ' + (axisX - 4.5) + ',20 ' + (axisX + 4.5) + ',20', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 18, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // Tick-etiketter: x-heltal (hoppa nära punkten), y var gridStep.
            for (i = -4; i <= 4; i++) {
                if (i === 0) continue;
                if (Math.abs(i - x0) < 0.5) continue;
                svg.appendChild(svgVarText(
                    { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    [String(i)]));
            }
            for (yv = Math.ceil(ymin / gs) * gs; yv <= ymax; yv += gs) {
                if (Math.abs(yv) < 1e-9) continue;
                svg.appendChild(svgVarText(
                    { x: axisX - 6, y: Y(yv) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    [String(yv)]));
            }

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Kurvan
            var d = pathFor(FN.f, XMIN, XMAX, 240, FN.kinks, X, Y);
            g.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Kurvetikett i lugn yta
            svg.appendChild(svgVarText(
                { x: X(-3.7), y: Y(ymax * 0.86), 'font-size': 13, 'text-anchor': 'start', fill: COL.curve },
                FN.parts));

            // Projektionslinje ner till x-axeln + x0-etikett
            var Px = X(x0), Py = Y(y0);
            g.appendChild(svgEl('line', { x1: Px, y1: Py, x2: Px, y2: axisY, stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            svg.appendChild(svgVarText(
                { x: Px, y: axisY + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis },
                ['*x', '₀']));

            // Lins-indikator: en svag streckad ring runt punkten
            g.appendChild(svgEl('circle', { cx: Px, cy: Py, r: 13, fill: 'none', stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '3 3' }));

            // Punkten (dra i den) + generös träffyta
            g.appendChild(svgEl('circle', { cx: Px, cy: Py, r: 5, fill: COL.curve }));
            var hit = svgEl('circle', { cx: Px, cy: Py, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Rita linsen ───────────────────────────────────────────────────
        var clipIdLens = 'lab-vis-clip-' + (uid++);
        function drawLens() {
            while (svgLens.firstChild) svgLens.removeChild(svgLens.firstChild);
            var FN = currentFN();
            var x0 = state.x0, y0 = FN.f(x0), zoom = state.zoom;
            var S = S_MAIN * zoom;
            function LX(x) { return LENS_CX + (x - x0) * S; }
            function LY(y) { return LENS_CY - (y - y0) * S; }
            var halfWorld = STATUS.halfWorld, halfDraw = halfWorld * 1.4;

            // Vit bakgrund + svag yttre ring
            svgLens.appendChild(svgEl('circle', { cx: LENS_CX, cy: LENS_CY, r: LENS_R_BORDER + 4, fill: 'none', stroke: 'rgba(31,37,48,0.12)', 'stroke-width': 1 }));
            svgLens.appendChild(svgEl('circle', { cx: LENS_CX, cy: LENS_CY, r: LENS_R_BORDER, fill: '#ffffff' }));

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipIdLens });
            cp.appendChild(svgEl('circle', { cx: LENS_CX, cy: LENS_CY, r: LENS_R_CLIP }));
            defs.appendChild(cp);
            svgLens.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipIdLens + ')' });
            svgLens.appendChild(g);

            var colorL, colorR;
            if (STATUS.state === 'merged') { colorL = COL.secant; colorR = COL.secant; }
            else if (STATUS.state === 'corner') { colorL = COL.curve; colorR = COL.tangent; }
            else { colorL = COL.tick; colorR = COL.tick; }

            var dLeft = pathFor(FN.f, x0 - halfDraw, x0, 44, FN.kinks, LX, LY);
            var dRight = pathFor(FN.f, x0, x0 + halfDraw, 44, FN.kinks, LX, LY);
            g.appendChild(svgEl('path', { d: dLeft, fill: 'none', stroke: colorL, 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
            g.appendChild(svgEl('path', { d: dRight, fill: 'none', stroke: colorR, 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));

            // Centerprick vid (x0, y0)
            g.appendChild(svgEl('circle', { cx: LX(x0), cy: LY(y0), r: 3.4, fill: COL.axis }));

            // Ink-kant (ovanpå, oklippt, för en skarp lins-rand)
            svgLens.appendChild(svgEl('circle', { cx: LENS_CX, cy: LENS_CY, r: LENS_R_BORDER, fill: 'none', stroke: COL.axis, 'stroke-width': 2.4 }));

            lensCaption.textContent = 'Zoom ×' + fmt(zoom, zoom < 10 ? 1 : 0);
        }

        // ── Formel + avläsning ────────────────────────────────────────────
        function updateFormulas() {
            katexInto(formelA,
                '\\textcolor{' + COL.curve + '}{k_{\\text{vänster}} \\approx ' + fmtTex(STATUS.L, 2) + '}' +
                '\\qquad' +
                '\\textcolor{' + COL.tangent + '}{k_{\\text{höger}} \\approx ' + fmtTex(STATUS.R, 2) + '}');

            if (STATUS.state === 'merged') {
                var kAvg = (STATUS.L + STATUS.R) / 2;
                note.style.color = COL.secant;
                note.innerHTML = 'Vänster- och högerlutningen närmar sig samma värde, ' +
                    '<em>k</em> ≈ ' + fmtDisp(kAvg, 2) + ' — kurvan är <strong>deriverbar</strong> här.';
            } else if (STATUS.state === 'corner') {
                note.style.color = COL.tangent;
                note.innerHTML = 'Vänster- och högerlutningen förblir olika (' + fmtDisp(STATUS.L, 2) +
                    ' och ' + fmtDisp(STATUS.R, 2) + ') hur mycket du än zoomar — kurvan är ' +
                    '<strong>inte deriverbar</strong> här.';
            } else {
                note.style.color = COL.axis;
                note.innerHTML = 'Vänster- och högerlutningen skiljer sig ännu (' + fmtDisp(STATUS.L, 2) +
                    ' och ' + fmtDisp(STATUS.R, 2) + '). Zooma in mer för att se om de närmar sig varandra.';
            }
        }

        // ── Omritning ─────────────────────────────────────────────────────
        function update() {
            var FN = currentFN();
            STATUS = statusFor(FN, state.x0, state.zoom);
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legCurve.txt.innerHTML = partsToHTML(FN.parts);
            drawMain();
            drawLens();
            updateFormulas();
            syncZoomRow();
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
    window.VISUALISERINGAR['ma3c-2.5'] = { mount: mount };
})();
