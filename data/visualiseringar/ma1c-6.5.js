/* ma1c-6.5.js — visualisering: "Vektorpromenaden".
 *
 * Hör till ma1c-6.5 (vektorer och skalärer), ma1c-6.6 (räkneoperationer:
 * addition), ma1c-6.7 (subtraktion) och ma1c-6.8 (längden av en vektor i
 * koordinatform).
 *
 * Kärninsikt: en vektor är en FÖRFLYTTNING. Addition är att gå
 * promenaderna efter varandra (spets-till-svans, polygonmetoden) —
 * ordningen spelar ingen roll. Subtraktion är att gå baklänges
 * ($\vec u - \vec v = \vec u + (-\vec v)$). Längden fås ur komposanterna
 * med Pythagoras sats.
 *
 * Notation speglar genomgången exakt: vektorer med pil ($\vec u$, $\vec v$),
 * koordinatform $(a_x,\ a_y)$, resultanten/summavektorn heter alltid
 * $\vec w$ (som i ma1c-6.6/6.7:s figurer "w = u + v").
 *
 * Fyra steg (lager):
 *   1. Förflyttningen  — en dragbar vektor v, koordinatform + komposant-
 *                         trappa + längdformel (Pythagoras).
 *   2. Addition         — u (blå) och v (grön) i kedja från origo, kedjans
 *                         resultant w (röd). Knapp "Byt ordning" animerar
 *                         om till v-först-sedan-u; w står stilla.
 *   3. Subtraktion       — kryssruta vänder v till −v (animerad 180°-
 *                         vändning, konstant längd); kedjan blir u − v.
 *   4. Skattjakten       — en skattkista på en slumpad heltalspunkt; nå
 *                         den med kedjan av u och v.
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
    function fmtDisp(v, decimals) { return fmt(v, decimals).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

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
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        return [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)];
    }
    function colorLerp(c1, c2, t) {
        var a = hexToRgb(c1), b = hexToRgb(c2);
        var r = Math.round(a[0] + (b[0] - a[0]) * t);
        var g = Math.round(a[1] + (b[1] - a[1]) * t);
        var bl = Math.round(a[2] + (b[2] - a[2]) * t);
        return 'rgb(' + r + ',' + g + ',' + bl + ')';
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        u: '#2563c9',        // vektor u — blå
        v: '#4a7d3a',        // vektor v — grön
        sum: '#c8324a',      // resultanten w — accentröd
        success: '#158a3c',  // skattjakt: bekräftelse
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        chestBody: '#8a5a2b',
        chestLid: '#c9a15a',
        chestLock: '#e8c477'
    };

    // ── Geometri (kvadratiskt rutnät, ±8) ──────────────────────────────
    var GRID_N = 8, WORLD = 8.9;
    var W = 560, L = 44, R = 36, T = 20, B = 40;
    var PW = W - L - R, PH = PW;
    var H = Math.round(T + PH + B);
    function X(x) { return L + (x + WORLD) / (2 * WORLD) * PW; }
    function Y(y) { return T + (WORLD - y) / (2 * WORLD) * PH; }

    function snap(v) { return clampNum(Math.round(v), -GRID_N, GRID_N); }
    function nTex(v) { return String(Math.round(v)); }
    function plainTerm(v) { return nTex(v); }
    function addTerm(v) { return v < 0 ? (' - ' + nTex(-v)) : (' + ' + nTex(v)); }
    function subTermNeg(v) { return v < 0 ? (' - (' + nTex(v) + ')') : (' - ' + nTex(v)); }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var state = {
            step: 1,
            u: { x: -2, y: 3 },
            v: { x: 6, y: 4 },   // v-komponenter i AB-exemplets anda (ma1c-6.5/6.8)
            orderT: 0,           // 0 = u-först, 1 = v-först (kedjeordning i addition)
            flipT: 0,            // 0 = v visas, 1 = −v visas (subtraktion)
            target: { x: 4, y: 5 },
            solved: false,
            step4Started: false
        };
        var orderAnimId = null, flipAnimId = null;
        var dragging = null;   // { kind: 'v1' | 'elbow' | 'end' }

        function restOrder() { return state.orderT < 0.5 ? 0 : 1; }
        function restFlip() { return state.flipT < 0.5 ? 0 : 1; }
        function firstVecObj() { return restOrder() === 0 ? state.u : state.v; }
        function secondVecObj() { return restOrder() === 0 ? state.v : state.u; }

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Vektorpromenaden';
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
            'aria-label': 'Interaktivt rutnät med vektorer. Dra i pilspetsarna för ' +
                'att ändra vektorernas komposanter, eller använd glidarna nedanför.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        svg.style.touchAction = 'none';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelCoord = document.createElement('div');
        formelCoord.className = 'lab-vis-formel';
        formelCoord.style.color = COL.v;
        card.appendChild(formelCoord);

        var formelLen = document.createElement('div');
        formelLen.className = 'lab-vis-formel';
        formelLen.style.color = COL.v;
        card.appendChild(formelLen);

        var formelId = document.createElement('div');
        formelId.className = 'lab-vis-formel';
        formelId.style.color = COL.axis;
        card.appendChild(formelId);

        var formelU = document.createElement('div');
        formelU.className = 'lab-vis-formel';
        formelU.style.color = COL.u;
        card.appendChild(formelU);

        var formelV = document.createElement('div');
        formelV.className = 'lab-vis-formel';
        formelV.style.color = COL.v;
        card.appendChild(formelV);

        var formelSum = document.createElement('div');
        formelSum.className = 'lab-vis-formel';
        formelSum.style.color = COL.sum;
        card.appendChild(formelSum);

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

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Förflyttningen' },
            { n: 2, label: '2 · Addition' },
            { n: 3, label: '3 · Subtraktion' },
            { n: 4, label: '4 · Skattjakten' }
        ];
        var INSTR = {
            1: 'En vektor är en <em>förflyttning</em> — den har både storlek och ' +
               'riktning. Dra i pilens spets och se hur komposanterna ' +
               '<em>v</em>ₓ, <em>v</em>ᵧ och längden |<em>v</em>| ändras.',
            2: 'Två vektorer adderas genom att den ena parallellförflyttas så att ' +
               'den startar vid den andras spets (polygonmetoden). Dra i ' +
               'spetsarna på <em>u</em> och <em>v</em>. Resultanten ' +
               '<em>w</em> = <em>u</em> + <em>v</em> (röd) går från start till ' +
               'slut i kedjan. Prova "Byt ordning" — resultanten står stilla!',
            3: 'En subtraktion skrivs om som en addition: ' +
               '<em>u</em> − <em>v</em> = <em>u</em> + (−<em>v</em>). Kryssa i ' +
               'rutan för att vända <em>v</em> till −<em>v</em> (samma längd, ' +
               'motsatt riktning) och se kedjan bilda resultanten ' +
               '<em>w</em> = <em>u</em> − <em>v</em>.',
            4: 'En skatt ligger gömd i punkten (<em>t</em>ₓ, <em>t</em>ᵧ). Dra ' +
               '<em>u</em> och <em>v</em> så att kedjan <em>u</em> + <em>v</em> ' +
               'landar precis på skattkistan.'
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

        // ── Legend ────────────────────────────────────────────────────
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
        var legV = legendItem(COL.v, '<em>v</em>');
        var legU = legendItem(COL.u, '<em>u</em>');
        var legW = legendItem(COL.sum, '<em>w</em> = <em>u</em> + <em>v</em>');
        legend.appendChild(legV.el);
        legend.appendChild(legU.el);
        legend.appendChild(legW.el);

        // ── Actions: Byt ordning / Visa −v / Ny skatt ────────────────
        var orderBtn = document.createElement('button');
        orderBtn.type = 'button';
        orderBtn.className = 'lab-btn';
        orderBtn.textContent = 'Byt ordning';
        orderBtn.addEventListener('click', function () { toggleOrder(); });
        actions.appendChild(orderBtn);

        var flipLabel = document.createElement('label');
        flipLabel.className = 'lab-graf-check';
        var flipCb = document.createElement('input');
        flipCb.type = 'checkbox';
        flipCb.addEventListener('change', function () { toggleFlip(flipCb.checked); });
        flipLabel.appendChild(flipCb);
        var flipTxt = document.createElement('span');
        flipTxt.innerHTML = 'Visa −<em>v</em> (<em>u</em> − <em>v</em>)';
        flipLabel.appendChild(flipTxt);
        actions.appendChild(flipLabel);

        var treasureBtn = document.createElement('button');
        treasureBtn.type = 'button';
        treasureBtn.className = 'lab-btn';
        treasureBtn.textContent = 'Ny skatt';
        treasureBtn.addEventListener('click', function () { newTreasure(); refresh(); });
        actions.appendChild(treasureBtn);

        // ── Glidare/sifferfält (komplement till att dra i scenen) ─────
        function makeCompRow(letter, sub, color, get, set) {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            lbl.innerHTML = '<em>' + letter + '</em><span style="font-size:0.7em;vertical-align:sub">' + sub + '</span>';
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = -GRID_N; slider.max = GRID_N; slider.step = 1; slider.value = get();
            slider.setAttribute('aria-label', 'Värdet på ' + letter + sub);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = -GRID_N; field.max = GRID_N; field.step = 1; field.value = get();
            field.setAttribute('aria-label', 'Värdet på ' + letter + sub);
            function paint() {
                var pct = clampNum((get() + GRID_N) / (2 * GRID_N) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' +
                    color + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                settleAll();
                set(snap(v));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = get();
                paint();
                refresh();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(field.value), 'field'); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                row: row,
                sync: function () { slider.value = get(); field.value = get(); paint(); }
            };
        }
        var rowVx = makeCompRow('v', 'x', COL.v, function () { return state.v.x; }, function (val) { state.v.x = val; });
        var rowVy = makeCompRow('v', 'y', COL.v, function () { return state.v.y; }, function (val) { state.v.y = val; });
        var rowUx = makeCompRow('u', 'x', COL.u, function () { return state.u.x; }, function (val) { state.u.x = val; });
        var rowUy = makeCompRow('u', 'y', COL.u, function () { return state.u.y; }, function (val) { state.u.y = val; });
        function syncAllRows() { rowVx.sync(); rowVy.sync(); rowUx.sync(); rowUy.sync(); }

        // ── Återställ ───────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopOrderAnim(); stopFlipAnim();
            state.u = { x: -2, y: 3 };
            state.v = { x: 6, y: 4 };
            state.orderT = 0; state.flipT = 0;
            flipCb.checked = false;
            refresh();
        });
        foot.appendChild(reset);

        // ── Animationer ─────────────────────────────────────────────
        function stopOrderAnim() { if (orderAnimId != null) { cancelAnimationFrame(orderAnimId); orderAnimId = null; } }
        function stopFlipAnim() { if (flipAnimId != null) { cancelAnimationFrame(flipAnimId); flipAnimId = null; } }
        function settleAll() {
            stopOrderAnim(); state.orderT = restOrder();
            stopFlipAnim(); state.flipT = restFlip();
        }
        function toggleOrder() {
            stopOrderAnim();
            var target = state.orderT < 0.5 ? 1 : 0;
            var start = state.orderT;
            var T_MS = 650, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.orderT = lerp(start, target, p);
                refresh();
                if (p < 1) orderAnimId = requestAnimationFrame(frame);
                else { orderAnimId = null; state.orderT = target; refresh(); }
            }
            orderAnimId = requestAnimationFrame(frame);
        }
        function toggleFlip(checked) {
            stopFlipAnim();
            var target = checked ? 1 : 0;
            var start = state.flipT;
            var T_MS = 650, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.flipT = lerp(start, target, p);
                refresh();
                if (p < 1) flipAnimId = requestAnimationFrame(frame);
                else { flipAnimId = null; state.flipT = target; refresh(); }
            }
            flipAnimId = requestAnimationFrame(frame);
        }

        // ── Skattjakt ───────────────────────────────────────────────
        function newTreasure() {
            var tx, ty;
            do { tx = randInt(-6, 6); ty = randInt(-6, 6); } while (tx === 0 && ty === 0);
            state.target = { x: tx, y: ty };
            state.u = { x: 2, y: 0 };
            state.v = { x: 0, y: 2 };
            state.solved = false;
        }

        // ── Dragning i scenen ──────────────────────────────────────
        function toWorld(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return {
                x: (px - L) / PW * (2 * WORLD) - WORLD,
                y: WORLD - (py - T) / PH * (2 * WORLD)
            };
        }
        function bindDrag(hitEl, kind) {
            hitEl.style.cursor = 'grab';
            hitEl.addEventListener('pointerdown', function (e) {
                settleAll();
                dragging = { kind: kind };
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var wp = toWorld(e.clientX, e.clientY);
            var wx = snap(wp.x), wy = snap(wp.y);
            if (dragging.kind === 'v1') {
                state.v.x = wx; state.v.y = wy;
            } else if (dragging.kind === 'elbow') {
                var first = (state.step === 3) ? state.u : firstVecObj();
                first.x = wx; first.y = wy;
            } else if (dragging.kind === 'end') {
                if (state.step === 3) {
                    var dispSecond = { x: wx - state.u.x, y: wy - state.u.y };
                    if (restFlip() === 0) { state.v.x = dispSecond.x; state.v.y = dispSecond.y; }
                    else { state.v.x = -dispSecond.x; state.v.y = -dispSecond.y; }
                } else {
                    var second = secondVecObj(), first2 = firstVecObj();
                    second.x = wx - first2.x; second.y = wy - first2.y;
                }
            }
            refresh();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Ritfunktioner: grundritning ────────────────────────────
        function drawGridAxes(relX, relY) {
            var i;
            for (i = -GRID_N; i <= GRID_N; i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            for (i = -GRID_N; i <= GRID_N; i++) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
            var axisY = Y(0), axisX = X(0);
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 8, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 16) + ',' + axisY + ' ' + (L + PW + 6) + ',' + (axisY - 4.5) + ' ' + (L + PW + 6) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: T - 8, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 16) + ' ' + (axisX - 4.5) + ',' + (T - 6) + ' ' + (axisX + 4.5) + ',' + (T - 6), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 6, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T - 8, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*y']));
            for (i = -GRID_N; i <= GRID_N; i += 2) {
                if (i === 0) continue;
                var skipX = relX.some(function (rx) { return Math.abs(rx - i) < 0.6; });
                if (!skipX) {
                    svg.appendChild(svgVarText(
                        { x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                        [fmtDisp(i, 0)]));
                }
                var skipY = relY.some(function (ry) { return Math.abs(ry - i) < 0.6; });
                if (!skipY) {
                    svg.appendChild(svgVarText(
                        { x: axisX - 7, y: Y(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                        [fmtDisp(i, 0)]));
                }
            }
        }

        // Håller etiketter/gripbara punkter innanför scenens ram även om en
        // vektorkedja (t.ex. u − v vid extrema dragningar) hamnar utanför
        // det synliga rutnätet — annars klipps text mitt i glyfen.
        function clampPx(px, py) {
            return { x: clampNum(px, L + 12, L + PW - 12), y: clampNum(py, T + 12, T + PH - 12) };
        }

        // Pil i pixelkoordinater. Skaftet slutar vid huvudets bas.
        function drawArrow(container, px1, py1, px2, py2, color, sw) {
            var dx = px2 - px1, dy = py2 - py1;
            var len = Math.hypot(dx, dy);
            if (len < 2) return;
            var ux = dx / len, uy = dy / len;
            var hl = Math.min(11, Math.max(6, len * 0.4));
            var baseX = px2 - ux * hl, baseY = py2 - uy * hl;
            container.appendChild(svgEl('line', {
                x1: px1, y1: py1, x2: baseX, y2: baseY,
                stroke: color, 'stroke-width': sw || 2.4, 'stroke-linecap': 'butt'
            }));
            var hw = hl * 0.45;
            var nx = -uy, ny = ux;
            var b1x = baseX + nx * hw, b1y = baseY + ny * hw;
            var b2x = baseX - nx * hw, b2y = baseY - ny * hw;
            container.appendChild(svgEl('polygon', {
                points: px2 + ',' + py2 + ' ' + b1x + ',' + b1y + ' ' + b2x + ',' + b2y, fill: color
            }));
        }
        // Etikett vid mittpunkten, förskjuten vinkelrätt ut, bort från en
        // "undvik"-punkt (default origo). Origo funkar bra som referens för
        // kedjesegment, men INTE för summapilen (som själv utgår från
        // origo — då blir sido-testet riktningslöst/instabilt). Ange då
        // armbågspunkten som avoidPx/avoidPy i stället.
        function arrowLabel(container, px1, py1, px2, py2, color, html, dist, avoidPx, avoidPy) {
            var mx = (px1 + px2) / 2, my = (py1 + py2) / 2;
            var dx = px2 - px1, dy = py2 - py1, len = Math.hypot(dx, dy) || 1;
            var ux = dx / len, uy = dy / len;
            var nx = -uy, ny = ux;
            var avx = avoidPx == null ? X(0) : avoidPx, avy = avoidPy == null ? Y(0) : avoidPy;
            var ox = mx - avx, oy = my - avy;
            var dot = nx * ox + ny * oy;
            if (dot < 0) { nx = -nx; ny = -ny; }
            var d = dist == null ? 15 : dist;
            var lx = mx + nx * d, ly = my + ny * d;
            var clamped = clampPx(lx, ly);
            var t = svgEl('text', {
                x: clamped.x, y: clamped.y + 4.5, 'font-size': 14, 'text-anchor': 'middle', fill: color
            });
            t.innerHTML = html;
            container.appendChild(t);
        }
        // Resultantens etikett är ofta bred ("w = u + v"/"w = u − v") — vid
        // korta vektorer räcker inget vinkelrätt sidoval (etiketten är
        // bredare än avståndet till kedjans andra segment). Lägg den i
        // stället EFTER pilspetsen, ut i fri yta i pilens egen riktning
        // (samma princip som kraftetiketter i CLAUDE.md: "etiketten startar
        // vid pilens spets och löper utåt").
        function tipLabel(container, px1, py1, px2, py2, color, html) {
            var dx = px2 - px1, dy = py2 - py1, len = Math.hypot(dx, dy) || 1;
            var ux = dx / len, uy = dy / len;
            var ext = 20;
            var lx = px2 + ux * ext, ly = py2 + uy * ext;
            // Bredare marginal än clampPx: etiketten ("w = u + v") är bred
            // och centreras (anchor "middle"), så båda sidor om ankaret
            // måste rymmas innanför ramen även i ett hörn av rutnätet.
            var clamped = { x: clampNum(lx, L + 46, L + PW - 46), y: clampNum(ly, T + 12, T + PH - 12) };
            var t = svgEl('text', {
                x: clamped.x, y: clamped.y + 4.5, 'font-size': 14,
                'text-anchor': 'middle',
                fill: color
            });
            t.innerHTML = html;
            container.appendChild(t);
        }
        function hitCircle(container, px, py, kind) {
            var clamped = clampPx(px, py);
            var c = svgEl('circle', { cx: clamped.x, cy: clamped.y, r: 16, fill: 'rgba(0,0,0,0)' });
            bindDrag(c, kind);
            container.appendChild(c);
        }
        function tipDot(container, px, py, color) {
            container.appendChild(svgEl('circle', { cx: px, cy: py, r: 3.6, fill: color }));
        }

        // ── Steg 1: en dragbar vektor v ────────────────────────────
        function drawStep1() {
            var vx = state.v.x, vy = state.v.y;
            drawGridAxes([vx, vx / 2], [vy, vy / 2]);
            var ox = X(0), oy = Y(0), px = X(vx), py = Y(vy);

            // Komposant-trappa (streckad) + rätvinkel-markör
            if (Math.abs(vx) > 0.01) {
                svg.appendChild(svgEl('line', { x1: ox, y1: oy, x2: px, y2: oy, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '5 4' }));
            }
            if (Math.abs(vy) > 0.01) {
                svg.appendChild(svgEl('line', { x1: px, y1: oy, x2: px, y2: py, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '5 4' }));
            }
            if (Math.abs(vx) >= 1 && Math.abs(vy) >= 1) {
                var insetX = -Math.sign(vx) * 9, insetY = -Math.sign(vy) * 9;
                svg.appendChild(svgEl('rect', {
                    x: Math.min(px, px + insetX), y: Math.min(oy, oy + insetY),
                    width: Math.abs(insetX), height: Math.abs(insetY),
                    fill: 'none', stroke: COL.axis, 'stroke-width': 1.1
                }));
            }
            // Komposant-etiketter i fri yta
            if (Math.abs(vx) > 0.5) {
                var vxLabelY = oy + (vy >= 0 ? 17 : -12);
                svg.appendChild(svgVarText(
                    { x: (ox + px) / 2, y: vxLabelY, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis },
                    ['*v', 'ₓ = ' + fmtDisp(vx, 0)]));
            }
            if (Math.abs(vy) > 0.5) {
                var vyLabelX = px + (vx >= 0 ? 10 : -10);
                svg.appendChild(svgVarText(
                    { x: vyLabelX, y: (oy + py) / 2 + 4, 'font-size': 12.5, 'text-anchor': vx >= 0 ? 'start' : 'end', fill: COL.axis },
                    ['*v', 'ᵧ = ' + fmtDisp(vy, 0)]));
            }

            drawArrow(svg, ox, oy, px, py, COL.v, 2.4);
            arrowLabel(svg, ox, oy, px, py, COL.v, '<tspan style="font-style:italic">v</tspan>', 16);
            tipDot(svg, ox, oy, COL.axis);
            hitCircle(svg, px, py, 'v1');
        }

        // ── Steg 2/4: additionskedja ────────────────────────────────
        function drawChainAdd(withTreasure) {
            var relX = [state.u.x, state.v.x, state.u.x + state.v.x];
            var relY = [state.u.y, state.v.y, state.u.y + state.v.y];
            if (withTreasure) { relX.push(state.target.x); relY.push(state.target.y); }
            drawGridAxes(relX, relY);
            var ox = X(0), oy = Y(0);

            var elbowW = { x: lerp(state.u.x, state.v.x, state.orderT), y: lerp(state.u.y, state.v.y, state.orderT) };
            var sumW = { x: state.u.x + state.v.x, y: state.u.y + state.v.y };
            var ex = X(elbowW.x), ey = Y(elbowW.y);
            var sx = X(sumW.x), sy = Y(sumW.y);
            var c1 = colorLerp(COL.u, COL.v, state.orderT);
            var c2 = colorLerp(COL.v, COL.u, state.orderT);
            var firstLetter = state.orderT < 0.5 ? 'u' : 'v';
            var secondLetter = state.orderT < 0.5 ? 'v' : 'u';

            if (withTreasure) drawChest(state.target.x, state.target.y, state.solved);

            drawArrow(svg, ox, oy, ex, ey, c1, 2.3);
            arrowLabel(svg, ox, oy, ex, ey, c1, '<tspan style="font-style:italic">' + firstLetter + '</tspan>', 15, sx, sy);
            drawArrow(svg, ex, ey, sx, sy, c2, 2.3);
            arrowLabel(svg, ex, ey, sx, sy, c2, '<tspan style="font-style:italic">' + secondLetter + '</tspan>', 15);
            drawArrow(svg, ox, oy, sx, sy, COL.sum, 2.6);
            var sumHtml = '<tspan style="font-style:italic">w</tspan> = <tspan style="font-style:italic">u</tspan> + <tspan style="font-style:italic">v</tspan>';
            if (withTreasure) {
                arrowLabel(svg, ox, oy, sx, sy, COL.sum, sumHtml, -17, ex, ey);
            } else {
                tipLabel(svg, ox, oy, sx, sy, COL.sum, sumHtml);
            }

            tipDot(svg, ox, oy, COL.axis);
            hitCircle(svg, ex, ey, 'elbow');
            hitCircle(svg, sx, sy, 'end');
        }

        // ── Steg 3: subtraktion (u + (−v), animerad vändning) ──────
        function drawChainSub() {
            var r = Math.hypot(state.v.x, state.v.y);
            var theta0 = Math.atan2(state.v.y, state.v.x);
            var angle = theta0 + Math.PI * state.flipT;
            var dispV = r < 1e-6 ? { x: 0, y: 0 } : { x: r * Math.cos(angle), y: r * Math.sin(angle) };
            var sumDisp = { x: state.u.x + dispV.x, y: state.u.y + dispV.y };
            var relX = [state.u.x, state.v.x, -state.v.x, state.u.x + state.v.x, state.u.x - state.v.x];
            var relY = [state.u.y, state.v.y, -state.v.y, state.u.y + state.v.y, state.u.y - state.v.y];
            drawGridAxes(relX, relY);
            var ox = X(0), oy = Y(0);
            var ex = X(state.u.x), ey = Y(state.u.y);
            var sx = X(sumDisp.x), sy = Y(sumDisp.y);
            var flipped = restFlip() === 1;

            drawArrow(svg, ox, oy, ex, ey, COL.u, 2.3);
            arrowLabel(svg, ox, oy, ex, ey, COL.u, '<tspan style="font-style:italic">u</tspan>', 15, sx, sy);
            drawArrow(svg, ex, ey, sx, sy, COL.v, 2.3);
            arrowLabel(svg, ex, ey, sx, sy, COL.v,
                flipped ? '−<tspan style="font-style:italic">v</tspan>' : '<tspan style="font-style:italic">v</tspan>', 15);
            drawArrow(svg, ox, oy, sx, sy, COL.sum, 2.6);
            tipLabel(svg, ox, oy, sx, sy, COL.sum,
                '<tspan style="font-style:italic">w</tspan> = <tspan style="font-style:italic">u</tspan> ' +
                (flipped ? '−' : '+') + ' <tspan style="font-style:italic">v</tspan>');

            tipDot(svg, ox, oy, COL.axis);
            hitCircle(svg, ex, ey, 'elbow');
            hitCircle(svg, sx, sy, 'end');
        }

        // ── Skattkista ──────────────────────────────────────────────
        function drawChest(tx, ty, solved) {
            var cx = X(tx), cy = Y(ty);
            var bw = 34, bh = 18, lh = 8;
            var g = svgEl('g', {});
            g.appendChild(svgEl('rect', {
                x: cx - bw / 2, y: cy - bh / 2, width: bw, height: bh, rx: 3,
                fill: COL.chestBody, stroke: COL.axis, 'stroke-width': 1.4
            }));
            g.appendChild(svgEl('path', {
                d: 'M ' + (cx - bw / 2) + ' ' + (cy - bh / 2) +
                   ' Q ' + cx + ' ' + (cy - bh / 2 - lh * 1.7) + ' ' + (cx + bw / 2) + ' ' + (cy - bh / 2) +
                   ' L ' + (cx + bw / 2) + ' ' + (cy - bh / 2 + 3) +
                   ' L ' + (cx - bw / 2) + ' ' + (cy - bh / 2 + 3) + ' Z',
                fill: COL.chestLid, stroke: COL.axis, 'stroke-width': 1.4
            }));
            g.appendChild(svgEl('rect', {
                x: cx - 4, y: cy - bh / 2 - 2, width: 8, height: 8, rx: 1.5,
                fill: COL.chestLock, stroke: COL.axis, 'stroke-width': 1
            }));
            svg.appendChild(g);
            var labelY = cy - bh / 2 - lh * 1.7 - 10;
            svg.appendChild(svgVarText(
                { x: cx, y: labelY, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis },
                ['(' + fmtDisp(tx, 0) + ', ' + fmtDisp(ty, 0) + ')']));
            if (solved) {
                var chk = svgEl('path', {
                    d: 'M ' + (cx + bw / 2 - 3) + ' ' + (cy - bh / 2 - 2) +
                       ' l 4 5 l 8 -10',
                    fill: 'none', stroke: COL.success, 'stroke-width': 3.2,
                    'stroke-linecap': 'round', 'stroke-linejoin': 'round'
                });
                svg.appendChild(chk);
                svg.appendChild(svgEl('circle', {
                    cx: cx + bw / 2 + 8, cy: cy - bh / 2 - 4, r: 12,
                    fill: 'none', stroke: COL.success, 'stroke-width': 2
                }));
            }
        }

        // ── Omritning ──────────────────────────────────────────────
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            if (state.step === 1) drawStep1();
            else if (state.step === 2) drawChainAdd(false);
            else if (state.step === 3) drawChainSub();
            else if (state.step === 4) {
                var sumX = state.u.x + state.v.x, sumY = state.u.y + state.v.y;
                state.solved = (sumX === state.target.x && sumY === state.target.y);
                drawChainAdd(true);
            }
        }

        // ── Formler ─────────────────────────────────────────────────
        function updateFormulas() {
            var u = state.u, v = state.v;
            if (state.step === 1) {
                var len2 = v.x * v.x + v.y * v.y;
                var len = Math.sqrt(len2);
                katexInto(formelCoord, '\\vec{v} = (v_x,\\ v_y) = (' + nTex(v.x) + ',\\ ' + nTex(v.y) + ')');
                katexInto(formelLen,
                    '|\\vec{v}| = \\sqrt{v_x^2 + v_y^2} = \\sqrt{' +
                    (v.x < 0 ? '(' + nTex(v.x) + ')' : nTex(v.x)) + '^2 + ' +
                    (v.y < 0 ? '(' + nTex(v.y) + ')' : nTex(v.y)) + '^2} = \\sqrt{' + len2 +
                    '}\\ \\text{l.e.} \\approx ' + fmtTex(len, 2) + '\\ \\text{l.e.}');
            } else {
                katexInto(formelU, '\\vec{u} = (' + nTex(u.x) + ',\\ ' + nTex(u.y) + ')');
                if (state.step === 3 && restFlip() === 1) {
                    katexInto(formelV, '-\\vec{v} = (' + nTex(-v.x) + ',\\ ' + nTex(-v.y) + ')');
                } else {
                    katexInto(formelV, '\\vec{v} = (' + nTex(v.x) + ',\\ ' + nTex(v.y) + ')');
                }
                if (state.step === 3) {
                    katexInto(formelId, '\\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})');
                    if (restFlip() === 1) {
                        katexInto(formelSum,
                            '\\vec{w} = \\vec{u} - \\vec{v} = (' + plainTerm(u.x) + subTermNeg(v.x) + ',\\ ' +
                            plainTerm(u.y) + subTermNeg(v.y) + ') = (' + nTex(u.x - v.x) + ',\\ ' + nTex(u.y - v.y) + ')');
                    } else {
                        katexInto(formelSum,
                            '\\vec{w} = \\vec{u} + \\vec{v} = (' + plainTerm(u.x) + addTerm(v.x) + ',\\ ' +
                            plainTerm(u.y) + addTerm(v.y) + ') = (' + nTex(u.x + v.x) + ',\\ ' + nTex(u.y + v.y) + ')');
                    }
                } else {
                    katexInto(formelSum,
                        '\\vec{w} = \\vec{u} + \\vec{v} = (' + plainTerm(u.x) + addTerm(v.x) + ',\\ ' +
                        plainTerm(u.y) + addTerm(v.y) + ') = (' + nTex(u.x + v.x) + ',\\ ' + nTex(u.y + v.y) + ')');
                }
            }
            if (state.step === 4) {
                if (state.solved) {
                    note.style.color = COL.success;
                    note.innerHTML = 'Skatten är funnen! <em>u</em> + <em>v</em> = (' +
                        fmtDisp(state.target.x, 0) + ', ' + fmtDisp(state.target.y, 0) + ')';
                } else {
                    note.style.color = '';
                    note.innerHTML = '';
                }
            } else {
                note.innerHTML = '';
            }
        }

        // ── Legend (dynamisk text) ─────────────────────────────────
        function updateLegend() {
            if (state.step === 3 && restFlip() === 1) {
                legV.txt.innerHTML = '−<em>v</em>';
                legW.txt.innerHTML = '<em>w</em> = <em>u</em> − <em>v</em>';
            } else if (state.step === 3) {
                legV.txt.innerHTML = '<em>v</em>';
                legW.txt.innerHTML = '<em>w</em> = <em>u</em> + <em>v</em>';
            } else {
                legV.txt.innerHTML = '<em>v</em>';
                legW.txt.innerHTML = '<em>w</em> = <em>u</em> + <em>v</em>';
            }
        }

        // ── Visa/dölj per steg + samlad uppritning ─────────────────
        function refresh() {
            drawScene();
            updateFormulas();
            updateLegend();
            syncAllRows();
        }
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legU.el.style.display = state.step >= 2 ? '' : 'none';
            legW.el.style.display = state.step >= 2 ? '' : 'none';

            formelCoord.style.display = state.step === 1 ? '' : 'none';
            formelLen.style.display = state.step === 1 ? '' : 'none';
            formelId.style.display = state.step === 3 ? '' : 'none';
            formelU.style.display = state.step >= 2 ? '' : 'none';
            formelV.style.display = state.step >= 2 ? '' : 'none';
            formelSum.style.display = state.step >= 2 ? '' : 'none';

            orderBtn.style.display = (state.step === 2 || state.step === 4) ? '' : 'none';
            flipLabel.style.display = state.step === 3 ? '' : 'none';
            treasureBtn.style.display = state.step === 4 ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';

            rowUx.row.style.display = state.step >= 2 ? '' : 'none';
            rowUy.row.style.display = state.step >= 2 ? '' : 'none';

            if (state.step === 4 && !state.step4Started) {
                state.step4Started = true;
                newTreasure();
            }

            refresh();
        }

        update();

        return {
            destroy: function () {
                stopOrderAnim();
                stopFlipAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-6.5'] = api;
    window.VISUALISERINGAR['ma1c-6.6'] = api;
    window.VISUALISERINGAR['ma1c-6.7'] = api;
    window.VISUALISERINGAR['ma1c-6.8'] = api;
})();
