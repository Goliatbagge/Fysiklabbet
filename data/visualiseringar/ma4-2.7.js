/* ma4-2.7.js — visualisering: "Produktregeln som växande rektangel".
 *
 * Kärninsikt: f(x)·g(x) ÄR en rektangelarea med sidorna f och g. När x
 * ökar med Δx växer arean med två REMSOR (g(x)·Δf och f(x)·Δg) plus ett
 * litet hörn (Δf·Δg) — och hörnets ANDEL av tillväxten går mot noll när
 * Δx → 0, eftersom hörnet är en produkt av TVÅ små tal. Det är
 * produktregeln, och det förklarar varför derivatan av en produkt inte
 * är produkten av derivatorna.
 *
 * Funktioner: f(x) = x², g(x) = sin x + 2 (alltid positiv). Domänen
 * x ∈ [0,3 ; 0,9] och Δx ∈ [0,01 ; 0,6] är valda så att f'(x) = 2x > 0
 * och g'(x) = cos x > 0 HELA vägen (även vid x+Δx = 1,5, cos 1,5 ≈ 0,07)
 * — båda sidorna växer alltid, så de två remsorna är alltid "riktiga"
 * växande remsor (ingen krympande remsa att särbehandla).
 *
 * Beteckningar speglar ma4-2.7.md exakt: y = f(x)·g(x),
 * y' = f'(x)·g(x) + f(x)·g'(x).
 *
 * Tre steg:
 *   1. Arean växer       — bas-rektangel + två remsor + hörn, alla synliga.
 *                           Dra x/Δx-glidarna eller den svarta punkten.
 *                           Live ΔA-formel, färgkodad per term.
 *   2. Hörnet försvinner — procentmätare för hörnets andel av ΔA +
 *                           knapp "Låt Δx → 0" (rAF, exponentiell krympning).
 *   3. Produktregeln     — KaTeX i genomgångens notation, jämförd med
 *                           ΔA/Δx. "Vanligt fel"-notis: f'(x)·g'(x).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3 och ma2c-2.1). API: window.VISUALISERINGAR['ma4-2.7'] = { mount }.
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
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        base: '#2563c9',              // f(x)·g(x) — bas-rektangeln (blå kontur)
        baseFill: 'rgba(37,99,201,0.08)',
        df: '#3f8f5c',                 // g(x)·Δf — höger remsa, grön
        dfFill: 'rgba(63,143,92,0.26)',
        dg: '#2563c9',                 // f(x)·Δg — övre remsa, blå
        dgFill: 'rgba(37,99,201,0.26)',
        corner: '#c8324a',             // Δf·Δg — hörnet, rött
        cornerFill: 'rgba(200,50,74,0.32)'
    };

    // ── Matematiska funktioner ─────────────────────────────────────────
    function fFunc(x) { return x * x; }
    function gFunc(x) { return Math.sin(x) + 2; }
    function fDeriv(x) { return 2 * x; }
    function gDeriv(x) { return Math.cos(x); }

    function mount(el) {
        // ── Domän: vald så att f och g är strikt växande HELA vägen upp
        // till x+Δx (cos(1,5) ≈ 0,07 > 0) — inga krympande remsor.
        var X_MIN = 0.3, X_MAX = 0.9, X_STEP = 0.01;
        var DX_MIN = 0.01, DX_MAX = 0.6, DX_STEP = 0.01;
        var state = { x: 0.6, dx: 0.3, step: 1 };
        var animId = null;

        // ── Geometri (pixel-rum) ────────────────────────────────────────
        var W = 560, H = 400, L = 140, R = 110, T = 70, B = 90;
        var DRAWW = W - L - R, DRAWH = H - T - B;
        var originX = L, baseY = H - B, rightX = originX + DRAWW;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Produktregeln som växande rektangel';
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
            'aria-label': 'Interaktiv figur: en rektangel med sidorna f(x) och g(x). ' +
                'Ökar x med Δx växer rektangeln med en grön remsa g(x) gånger Δf, en ' +
                'blå remsa f(x) gånger Δg och ett rött hörn Δf gånger Δg. Dra i ' +
                'glidarna eller i den svarta punkten för att ändra x och Δx.'
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

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        card.appendChild(formelB);

        var meterWrap = document.createElement('div');
        meterWrap.style.margin = '10px 2px 4px';
        var meterLabel = document.createElement('div');
        meterLabel.style.fontSize = '13px';
        meterLabel.style.color = COL.ink;
        meterLabel.style.marginBottom = '5px';
        meterWrap.appendChild(meterLabel);
        var meterTrack = document.createElement('div');
        meterTrack.style.height = '10px';
        meterTrack.style.borderRadius = '6px';
        meterTrack.style.background = COL.track;
        meterTrack.style.overflow = 'hidden';
        var meterFill = document.createElement('div');
        meterFill.style.height = '100%';
        meterFill.style.width = '0%';
        meterFill.style.background = COL.corner;
        meterFill.style.transition = 'width 120ms linear';
        meterTrack.appendChild(meterFill);
        meterWrap.appendChild(meterTrack);
        card.appendChild(meterWrap);

        var noteCorner = document.createElement('div');
        noteCorner.className = 'lab-vis-note';
        card.appendChild(noteCorner);

        var formelDef = document.createElement('div');
        formelDef.className = 'lab-vis-formel';
        card.appendChild(formelDef);

        var formelDeriv = document.createElement('div');
        formelDeriv.className = 'lab-vis-formel';
        card.appendChild(formelDeriv);

        var formelDerivNum = document.createElement('div');
        formelDerivNum.className = 'lab-vis-formel';
        card.appendChild(formelDerivNum);

        var formelCompare = document.createElement('div');
        formelCompare.className = 'lab-vis-formel';
        card.appendChild(formelCompare);

        var noteCompare = document.createElement('div');
        noteCompare.className = 'lab-vis-note';
        card.appendChild(noteCompare);

        var noteWrong = document.createElement('div');
        noteWrong.className = 'lab-vis-note';
        noteWrong.style.color = COL.corner;
        card.appendChild(noteWrong);

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

        // ── Steg-knappar ────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Arean växer' },
            { n: 2, label: '2 · Hörnet försvinner' },
            { n: 3, label: '3 · Produktregeln' }
        ];
        var INSTR = {
            1: 'Rektangeln har sidorna <em>f</em>(<em>x</em>) och <em>g</em>(<em>x</em>) — ' +
               'arean är själva produkten. Dra i <em>x</em>- och <em>Δx</em>-glidarna — ' +
               'eller i den svarta punkten i figuren — och se den gröna remsan ' +
               '<em>g</em>·Δ<em>f</em>, den blå remsan <em>f</em>·Δ<em>g</em> och det ' +
               'röda hörnet Δ<em>f</em>·Δ<em>g</em> växa fram.',
            2: 'Låt <em>Δx</em> bli mindre och mindre: tryck på knappen eller dra ' +
               'glidaren långsamt åt vänster. Hörnet krymper snabbare än remsorna, ' +
               'eftersom det är en produkt av TVÅ små tal — dess andel av tillväxten ' +
               'rasar mot noll.',
            3: 'I gränsvärdet <em>Δx</em> → 0 finns bara de två remsorna kvar — det ' +
               'är produktregeln. Jämför med det vanliga felet att bara multiplicera ' +
               'derivatorna med varandra.'
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

        // ── Legend (statisk — samma fyra fält syns i alla steg) ───────────
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
        legend.appendChild(legendItem(COL.ink, '<em>f</em>(<em>x</em>)·<em>g</em>(<em>x</em>) — arean innan'));
        legend.appendChild(legendItem(COL.df, '<em>g</em>(<em>x</em>)·Δ<em>f</em> — höger remsa'));
        legend.appendChild(legendItem(COL.dg, '<em>f</em>(<em>x</em>)·Δ<em>g</em> — övre remsa'));
        legend.appendChild(legendItem(COL.corner, 'Δ<em>f</em>·Δ<em>g</em> — hörnet'));

        // ── Knapp: Låt Δx gå mot 0 ──────────────────────────────────────
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Låt Δx → 0';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        // ── Glidare (x och Δx) ──────────────────────────────────────────
        function makeRow(name, min, max, step, get, set, accent) {
            var trackFill = accent || COL.corner;
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
                slider.style.background = 'linear-gradient(to right, ' + trackFill + ' 0%, ' +
                    trackFill + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        var rowX = makeRow('x', X_MIN, X_MAX, X_STEP,
            function () { return state.x; },
            function (v) { state.x = v; }, COL.ink);
        var rowDx = makeRow('Δx', DX_MIN, DX_MAX, DX_STEP,
            function () { return state.dx; },
            function (v) { state.dx = v; }, COL.corner);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.x = 0.6; state.dx = 0.3; state.step = 1;
            rowX.sync(); rowDx.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: Δx → 0 ───────────────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var dx0 = state.dx > 0.05 ? state.dx : 0.5;
            state.dx = dx0;
            var T_MS = 2600, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.dx = dx0 * Math.pow(DX_MIN / dx0, p);
                rowDx.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.dx = DX_MIN; rowDx.sync(); update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar delningspunkt: styr x (Δx hålls fast) ─────────────────
        // f(x) = x² är analytiskt inverterbar: given förhållandet
        // r = f(x)/f(x+Δx) och fast Δx, är x = Δx·√r / (1-√r).
        var dragging = false;
        function toSvgX(clientX) {
            var r = svg.getBoundingClientRect();
            return (clientX - r.left) * W / r.width;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var px = toSvgX(e.clientX);
            var ratio = clampNum((px - originX) / DRAWW, 0.02, 0.97);
            var sq = Math.sqrt(ratio);
            var xNew = state.dx * sq / (1 - sq);
            state.x = clampNum(Math.round(xNew / X_STEP) * X_STEP, X_MIN, X_MAX);
            rowX.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Ritahjälpare: mått-linjer (dubbelpil + etikett) ────────────────
        function dimH(x1, x2, y, parts) {
            var asz = 5;
            svg.appendChild(svgEl('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: COL.ink, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', {
                points: x1 + ',' + y + ' ' + (x1 + asz) + ',' + (y - asz * 0.6) + ' ' + (x1 + asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            svg.appendChild(svgEl('polygon', {
                points: x2 + ',' + y + ' ' + (x2 - asz) + ',' + (y - asz * 0.6) + ' ' + (x2 - asz) + ',' + (y + asz * 0.6),
                fill: COL.ink
            }));
            svg.appendChild(svgVarText(
                { x: (x1 + x2) / 2, y: y + 16, 'font-size': 13, 'text-anchor': 'middle', fill: COL.ink }, parts));
        }
        function dimV(y1, y2, x, parts) {
            var asz = 5;
            svg.appendChild(svgEl('line', { x1: x, y1: y1, x2: x, y2: y2, stroke: COL.ink, 'stroke-width': 1.4 }));
            svg.appendChild(svgEl('polygon', {
                points: x + ',' + y1 + ' ' + (x - asz * 0.6) + ',' + (y1 + asz) + ' ' + (x + asz * 0.6) + ',' + (y1 + asz),
                fill: COL.ink
            }));
            svg.appendChild(svgEl('polygon', {
                points: x + ',' + y2 + ' ' + (x - asz * 0.6) + ',' + (y2 - asz) + ' ' + (x + asz * 0.6) + ',' + (y2 - asz),
                fill: COL.ink
            }));
            svg.appendChild(svgVarText(
                { x: x - 9, y: (y1 + y2) / 2 + 4, 'font-size': 13, 'text-anchor': 'end', fill: COL.ink }, parts));
        }
        function zoneRect(x, y, w, h, fill, stroke) {
            svg.appendChild(svgEl('rect', {
                x: x, y: y, width: w, height: h, fill: fill,
                stroke: stroke, 'stroke-width': 1, 'stroke-opacity': 0.4
            }));
        }
        function zoneLabel(cx, cy, wpx, hpx, parts, fontSize) {
            if (wpx < 80 || hpx < 22) return;
            svg.appendChild(svgVarText(
                { x: cx, y: cy + (fontSize || 13) / 3, 'font-size': fontSize || 13, 'text-anchor': 'middle', fill: COL.ink },
                parts));
        }

        // ── Rita scenen ─────────────────────────────────────────────────
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var x = state.x, dx = state.dx;
            var fx = fFunc(x), gx = gFunc(x), fxdx = fFunc(x + dx), gxdx = gFunc(x + dx);
            var Df = fxdx - fx, Dg = gxdx - gx;

            var kw = DRAWW / fxdx, kh = DRAWH / gxdx;
            var splitX = originX + kw * fx;
            var splitY = baseY - kh * gx;

            // Fyra fält
            zoneRect(originX, splitY, splitX - originX, baseY - splitY, COL.baseFill, COL.base);
            zoneRect(splitX, splitY, rightX - splitX, baseY - splitY, COL.dfFill, COL.df);
            zoneRect(originX, T, splitX - originX, splitY - T, COL.dgFill, COL.dg);
            zoneRect(splitX, T, rightX - splitX, splitY - T, COL.cornerFill, COL.corner);

            // Yttre ram runt hela (f+Δf)×(g+Δg)
            svg.appendChild(svgEl('rect', {
                x: originX, y: T, width: rightX - originX, height: baseY - T,
                fill: 'none', stroke: COL.ink, 'stroke-width': 2
            }));

            // Etiketter i fälten (döljs om fältet är för smalt/lågt)
            zoneLabel((originX + splitX) / 2, (splitY + baseY) / 2, splitX - originX, baseY - splitY,
                ['*A', ' = ' + fmt(fx * gx, 2)], 14);
            zoneLabel((splitX + rightX) / 2, (splitY + baseY) / 2, rightX - splitX, baseY - splitY,
                ['*g', '·Δ', '*f', ' = ' + fmt(gx * Df, 2)]);
            zoneLabel((originX + splitX) / 2, (T + splitY) / 2, splitX - originX, splitY - T,
                ['*f', '·Δ', '*g', ' = ' + fmt(fx * Dg, 2)]);
            zoneLabel((splitX + rightX) / 2, (T + splitY) / 2, rightX - splitX, splitY - T,
                ['Δ', '*f', '·Δ', '*g', ' = ' + fmt(Df * Dg, 2)]);

            // Måttlinjer: f(x) + Δf under, g(x) + Δg till vänster
            dimH(originX, splitX, baseY + 26, ['*f', '(', '*x', ') = ' + fmt(fx, 2)]);
            dimH(splitX, rightX, baseY + 26, ['Δ', '*f', ' = ' + fmt(Df, 2)]);
            dimV(splitY, baseY, originX - 26, ['*g', '(', '*x', ') = ' + fmt(gx, 2)]);
            dimV(T, splitY, originX - 26, ['Δ', '*g', ' = ' + fmt(Dg, 2)]);

            // Dragbar delningspunkt
            svg.appendChild(svgEl('circle', { cx: splitX, cy: splitY, r: 5, fill: COL.ink }));
            var hit = svgEl('circle', { cx: splitX, cy: splitY, r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hit);
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas() {
            var x = state.x, dx = state.dx;
            var fx = fFunc(x), gx = gFunc(x), fxdx = fFunc(x + dx), gxdx = gFunc(x + dx);
            var Df = fxdx - fx, Dg = gxdx - gx;
            var greenA = gx * Df, blueA = fx * Dg, cornerA = Df * Dg;
            var dA = greenA + blueA + cornerA;
            var pctCorner = clampNum(cornerA / dA * 100, 0, 100);

            katexInto(formelA,
                '\\Delta A = \\textcolor{' + COL.df + '}{g(x)\\cdot \\Delta f} + ' +
                '\\textcolor{' + COL.dg + '}{f(x)\\cdot \\Delta g} + ' +
                '\\textcolor{' + COL.corner + '}{\\Delta f\\cdot \\Delta g}');
            katexInto(formelB,
                '\\Delta A = \\textcolor{' + COL.df + '}{' + fmtTex(gx, 2) + '\\cdot ' + fmtTex(Df, 2) + '} + ' +
                '\\textcolor{' + COL.dg + '}{' + fmtTex(fx, 2) + '\\cdot ' + fmtTex(Dg, 2) + '} + ' +
                '\\textcolor{' + COL.corner + '}{' + fmtTex(Df, 2) + '\\cdot ' + fmtTex(Dg, 2) + '}' +
                ' = ' + fmtTex(dA, 2));

            if (state.step >= 2) {
                meterLabel.innerHTML = 'Hörnets andel av tillväxten: <strong>' + fmt(pctCorner, 1) + ' %</strong>';
                meterFill.style.width = pctCorner + '%';
                noteCorner.innerHTML = (dx <= DX_MIN + 0.005)
                    ? 'Vid <span style="white-space:nowrap">Δ<em>x</em> = ' + fmt(dx, 2) + '</span> är hörnet nästan ' +
                      'försumbart — nästan hela tillväxten kommer från de två remsorna. Därför innehåller ' +
                      'produktregeln bara två termer, inget Δ<em>f</em>·Δ<em>g</em>-hörn.'
                    : 'Halvera Δ<em>x</em> några gånger (eller tryck på knappen) och se andelen rasa — hörnet ' +
                      'krymper snabbare än remsorna eftersom det är en produkt av TVÅ små tal.';
            }

            if (state.step >= 3) {
                katexInto(formelDef, 'y = f(x)\\cdot g(x) = x^2(\\sin x + 2)');
                var fp = fDeriv(x), gp = gDeriv(x);
                var yprime = fp * gx + fx * gp;
                katexInto(formelDeriv, "y' = f'(x)\\cdot g(x) + f(x)\\cdot g'(x)");
                katexInto(formelDerivNum,
                    "y' = " + fmtTex(fp, 2) + '\\cdot ' + fmtTex(gx, 2) + ' + ' + fmtTex(fx, 2) + '\\cdot ' + fmtTex(gp, 2) +
                    ' = ' + fmtTex(yprime, 2));
                var slope = dA / dx;
                katexInto(formelCompare,
                    '\\dfrac{\\Delta A}{\\Delta x} = ' + fmtTex(slope, 2) + '\\quad ' +
                    "y'(x) = " + fmtTex(yprime, 2));
                noteCompare.innerHTML = (dx <= 0.05)
                    ? 'Nästan lika — vid litet Δ<em>x</em> närmar sig ändringskvoten derivatan.'
                    : 'Gå till steg 2 och gör Δ<em>x</em> mindre för att se värdena närma sig varandra.';
                var wrongProduct = fp * gp;
                noteWrong.innerHTML = 'Vanligt fel: <span style="white-space:nowrap"><em>f</em>′(<em>x</em>)·' +
                    '<em>g</em>′(<em>x</em>) = ' + fmt(wrongProduct, 2) + '</span> — helt annat tal än ' +
                    '<span style="white-space:nowrap"><em>y</em>′ = ' + fmt(yprime, 2) + '</span>!';
            }
        }

        // ── Master-uppdatering ────────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            meterWrap.style.display = state.step >= 2 ? '' : 'none';
            noteCorner.style.display = state.step >= 2 ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';
            formelDef.style.display = state.step >= 3 ? '' : 'none';
            formelDeriv.style.display = state.step >= 3 ? '' : 'none';
            formelDerivNum.style.display = state.step >= 3 ? '' : 'none';
            formelCompare.style.display = state.step >= 3 ? '' : 'none';
            noteCompare.style.display = state.step >= 3 ? '' : 'none';
            noteWrong.style.display = state.step >= 3 ? '' : 'none';
            draw();
            updateFormulas();
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
    window.VISUALISERINGAR['ma4-2.7'] = { mount: mount };
})();
