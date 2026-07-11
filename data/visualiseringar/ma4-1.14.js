/* ma4-1.14.js — visualisering: "En vektor blir en sinuskurva" (grafen till
 * y = a sin x + b cos x). Hör till ma4-1.14.
 *
 * Kärninsikt: summan av en sinus- och en cosinusterm är SJÄLV en enda
 * sinuskurva — och paret (a, b), tolkat som en vektor från origo, avslöjar
 * varför. Vektorns längd är amplituden c = √(a²+b²), vektorns riktning är
 * fasvinkeln v (tan v = b/a). Hur man än drar i vektorn blir kurvan aldrig
 * "något annat än en sinus".
 *
 * Startläget a = 5, b = 12 (c = 13) är samma exempel som står direkt ovanför
 * ::: graf-blocket i genomgången ("Med a = 5 och b = 12 blir amplituden
 * c = 13"), så eleven kan spela upp det direkt.
 *
 * Scenen är delad: VÄNSTER ett litet (a, b)-plan med en dragbar vektor,
 * HÖGER en graf över x som visar tre kurvor: a·sin x (grön), b·cos x (blå)
 * och summan (röd, tjockare).
 *
 * Tre steg (lager):
 *   1. Summan av två kurvor   — dra vektorn (eller glidarna a/b) och se de
 *      tre kurvorna live. Gissa-först: kan summan bli något annat än en
 *      jämn våg?
 *   2. Vektorn avslöjar amplituden — kryssrutan "Visa c·sin(x+v)" lägger en
 *      svart streckad kurva ovanpå summan (de sammanfaller exakt). Live
 *      KaTeX för c = √(a²+b²) och tan v = b/a. Vågräta linjer y = ±c.
 *   3. Rotera med konstant längd — knappen roterar vektorn ett helt varv
 *      med bibehållen längd: kurvan fasförskjuts men amplituden ändras
 *      aldrig.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma4-4.5.js).
 * API: window.VISUALISERINGAR['<id>'] = { mount(el) → { destroy() } }.
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

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        aTerm: '#3f7d3a',   // a·sin x — grön
        bTerm: '#1d4ed8',   // b·cos x — blå
        sum: '#c8324a'      // summan / vektorns längd c — accentröd
    };

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var A_MIN = -14, A_MAX = 14, STEP = 0.1;
        var state = { a: 5, b: 12, step: 1, showC: false };
        function cLen(a, b) { return Math.hypot(a, b); }
        function vAngle(a, b) { return Math.atan2(b, a); } // radianer

        // ── Geometri: vektorplanet (a, b) — kvadratiskt rutnät ────────────
        var W1 = 250, H1 = 250, L1 = 36, R1 = 16, T1 = 16, B1 = 36;
        var PW1 = W1 - L1 - R1, PH1 = H1 - T1 - B1;
        var PMIN = -16, PMAX = 16;
        function X1(v) { return L1 + (v - PMIN) / (PMAX - PMIN) * PW1; }
        function Y1(v) { return T1 + (PMAX - v) / (PMAX - PMIN) * PH1; }

        // ── Geometri: grafen över x ────────────────────────────────────────
        var W2 = 460, H2 = 320, L2 = 44, R2 = 40, T2 = 18, B2 = 36;
        var PW2 = W2 - L2 - R2, PH2 = H2 - T2 - B2;
        var XMIN2 = 0, XMAX2 = 4 * Math.PI + 0.6;
        var YMIN2 = -22, YMAX2 = 22;
        function X2(x) { return L2 + (x - XMIN2) / (XMAX2 - XMIN2) * PW2; }
        function Y2(y) { return T2 + (YMAX2 - y) / (YMAX2 - YMIN2) * PH2; }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'En vektor blir en sinuskurva';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var sceneRow = document.createElement('div');
        sceneRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:flex-start;';
        card.appendChild(sceneRow);

        var vecScene = document.createElement('div');
        vecScene.className = 'lab-graf-scene lab-vis-scene';
        vecScene.style.cssText = 'flex:1 1 230px;max-width:250px;margin:0;';
        sceneRow.appendChild(vecScene);

        var svg1 = svgEl('svg', {
            viewBox: '0 0 ' + W1 + ' ' + H1,
            width: W1, height: H1,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Ett litet (a, b)-plan med en dragbar vektor från origo till ' +
                'punkten (a, b). Vektorns längd är amplituden c, dess riktning är fasvinkeln v.'
        });
        svg1.classList.add('lab-graf-svg');
        svg1.style.cursor = 'default';
        vecScene.appendChild(svg1);

        var graphScene = document.createElement('div');
        graphScene.className = 'lab-graf-scene lab-vis-scene';
        graphScene.style.cssText = 'flex:2 1 320px;max-width:480px;margin:0;';
        sceneRow.appendChild(graphScene);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Graf över x som visar kurvorna a·sin x, b·cos x och deras summa. ' +
                'Summan är alltid en enda förskjuten sinuskurva.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        graphScene.appendChild(svg2);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div'); formelA.className = 'lab-vis-formel'; card.appendChild(formelA);
        var formelB = document.createElement('div'); formelB.className = 'lab-vis-formel'; card.appendChild(formelB);
        var formelC = document.createElement('div'); formelC.className = 'lab-vis-formel'; card.appendChild(formelC);

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

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Summan av två kurvor' },
            { n: 2, label: '2 · Vektorn avslöjar amplituden' },
            { n: 3, label: '3 · Rotera med konstant längd' }
        ];
        var INSTR = {
            1: 'Gissa innan du drar: kan summan av en sinus- och en cosinusterm bli ' +
               'något annat än en jämn våg — till exempel med dubbla toppar? Dra i ' +
               'vektorns spets i det lilla koordinatsystemet (eller glidarna <em>a</em> ' +
               'och <em>b</em>) och se de tre kurvorna i grafen till höger.',
            2: 'Vektorns längd är amplituden <em>c</em> och dess riktning är fasvinkeln ' +
               '<em>v</em>. Bocka i kryssrutan för att rita om summan som en enda ' +
               'sinuskurva <em>c</em>·sin(<em>x</em>+<em>v</em>) (svart, streckad) — den ' +
               'läggs exakt ovanpå den röda summakurvan.',
            3: 'Tryck på knappen: vektorn roterar ett helt varv med bibehållen längd. ' +
               'Kurvan förskjuts i sidled (fasförskjutning), men amplituden ändras ' +
               'aldrig — den beror bara på vektorns längd, inte dess riktning.'
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
            return { el: span, txt: txt };
        }
        var legA = legendItem(COL.aTerm, '<em>a</em>·sin <em>x</em>');
        var legB = legendItem(COL.bTerm, '<em>b</em>·cos <em>x</em>');
        var legSum = legendItem(COL.sum, 'summan');
        var legC = legendItem(COL.axis, '<em>c</em>·sin(<em>x</em>+<em>v</em>)');

        // ── Knappar/val i actions-raden ───────────────────────────────────
        var cLabel = document.createElement('label');
        cLabel.className = 'lab-graf-check';
        var cCb = document.createElement('input');
        cCb.type = 'checkbox';
        cCb.addEventListener('change', function () { state.showC = cCb.checked; update(); });
        cLabel.appendChild(cCb);
        var cTxt = document.createElement('span');
        cTxt.innerHTML = 'Visa <em>c</em>·sin(<em>x</em>+<em>v</em>)';
        cLabel.appendChild(cTxt);
        actions.appendChild(cLabel);

        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Rotera vektorn';
        playBtn.addEventListener('click', function () { startAnim(); });
        actions.appendChild(playBtn);

        // ── Glidare (a och b) ─────────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.sum + ' 0%, ' +
                    COL.sum + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        var rowA = makeRow('a', A_MIN, A_MAX, STEP,
            function () { return state.a; },
            function (v) { state.a = Math.round(v / STEP) * STEP; });
        var rowB = makeRow('b', A_MIN, A_MAX, STEP,
            function () { return state.b; },
            function (v) { state.b = Math.round(v / STEP) * STEP; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.a = 5; state.b = 12; state.showC = false;
            cCb.checked = false;
            rowA.sync(); rowB.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: rotera vektorn med bibehållen längd (steg 3) ───────
        var animId = null;
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startAnim() {
            stopAnim();
            var r0 = clampNum(cLen(state.a, state.b), 0.5, 14);
            var v0 = vAngle(state.a, state.b);
            var T_MS = 4800, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                var ang = v0 + p * 2 * Math.PI;
                state.a = clampNum(r0 * Math.cos(ang), A_MIN, A_MAX);
                state.b = clampNum(r0 * Math.sin(ang), A_MIN, A_MAX);
                rowA.sync(); rowB.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar vektorspets i (a, b)-planet ───────────────────────────
        function toWorldAB(clientX, clientY) {
            var r = svg1.getBoundingClientRect();
            var px = (clientX - r.left) * W1 / r.width;
            var py = (clientY - r.top) * H1 / r.height;
            return {
                a: PMIN + (px - L1) / PW1 * (PMAX - PMIN),
                b: PMAX - (py - T1) / PH1 * (PMAX - PMIN)
            };
        }
        var dragging = false;
        svg1.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var wc = toWorldAB(e.clientX, e.clientY);
            state.a = clampNum(Math.round(wc.a / STEP) * STEP, A_MIN, A_MAX);
            state.b = clampNum(Math.round(wc.b / STEP) * STEP, A_MIN, A_MAX);
            rowA.sync(); rowB.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg1.addEventListener('pointerup', endDrag);
        svg1.addEventListener('pointercancel', endDrag);

        // ── Rita en pil (vektor) från origo till (av, bv) i planet ────────
        function polarPt1(cx, cy, r, ang) { return { x: cx + r * Math.cos(ang), y: cy - r * Math.sin(ang) }; }
        function arcPath1(cx, cy, r, a1, a2) {
            var diff = a2 - a1;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            while (diff <= -Math.PI) diff += 2 * Math.PI;
            var end = a1 + diff;
            var sweep = diff >= 0 ? 0 : 1;
            var p1 = polarPt1(cx, cy, r, a1), p2 = polarPt1(cx, cy, r, end);
            return 'M' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) +
                ' A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
        }
        function drawArrow1(parent, av, bv, color, width) {
            var px = X1(av), py = Y1(bv);
            var ox = X1(0), oy = Y1(0);
            var dx = px - ox, dy = py - oy, len = Math.hypot(dx, dy);
            if (len < 1e-3) return { tipX: px, tipY: py, ux: 1, uy: 0, len: 0 };
            var ux = dx / len, uy = dy / len;
            var headLen = clampNum(len * 0.18, 8, 14);
            var headW = headLen * 0.62;
            var baseX = px - ux * headLen, baseY = py - uy * headLen;
            var sw = width || 2.4;
            parent.appendChild(svgEl('line', {
                x1: ox.toFixed(1), y1: oy.toFixed(1), x2: baseX.toFixed(1), y2: baseY.toFixed(1),
                stroke: color, 'stroke-width': sw, 'stroke-linecap': 'butt'
            }));
            var nx = -uy, ny = ux;
            var h1x = baseX + nx * headW / 2, h1y = baseY + ny * headW / 2;
            var h2x = baseX - nx * headW / 2, h2y = baseY - ny * headW / 2;
            parent.appendChild(svgEl('polygon', {
                points: px.toFixed(1) + ',' + py.toFixed(1) + ' ' + h1x.toFixed(1) + ',' + h1y.toFixed(1) + ' ' + h2x.toFixed(1) + ',' + h2y.toFixed(1),
                fill: color
            }));
            return { tipX: px, tipY: py, ux: ux, uy: uy, len: len };
        }
        // Etiketten placeras med BÅDE en förskjutning längs vektorn och en
        // vinkelrät nick uppåt — annars hamnar den ovanpå en axel när
        // vektorn ligger exakt på a- eller b-axeln (a = 0 eller b = 0).
        function arrowLabel1(parts, info, color, offset) {
            offset = offset == null ? 16 : offset;
            var px = -info.uy, py = info.ux;
            if (py > 0) { px = -px; py = -py; }
            var dx = info.ux * offset + px * 10;
            var dy = info.uy * offset + py * 10;
            var lx = info.tipX + dx;
            var ly = info.tipY + dy + (dy < -2 ? -1 : (dy > 2 ? 8 : 4));
            var anchor = dx > 3 ? 'start' : (dx < -3 ? 'end' : 'middle');
            // Vänd etiketten mot mitten om den (givet sin faktiska textbredd)
            // annars skulle sticka ut ur planets viewBox. Ett fast pixelmått
            // triggade fel — flippade även för vektorer långt från kanten
            // och körde då in etiketten i vinkelbågens område i stället.
            var textW = parts.join('').length * 6.3;
            if (anchor === 'start' && lx + textW > W1 - 4) { anchor = 'end'; lx = info.tipX - 6; }
            else if (anchor === 'end' && lx - textW < 4) { anchor = 'start'; lx = info.tipX + 6; }
            // Håll etiketten (hela dess textbredd, inte bara ankarpunkten)
            // borta från axelns namnetikett ("a" vid pilspetsen, "b" vid
            // toppen) — vanligast för branta/vågräta vektorer där texten
            // annars sträcker sig in i namnetikettens ruta.
            function keepClear(bx0, by0, bx1, by1) {
                var tLeft = anchor === 'start' ? lx : (anchor === 'end' ? lx - textW : lx - textW / 2);
                var tRight = tLeft + textW, tTop = ly - 9, tBottom = ly + 3;
                if (tLeft < bx1 && tRight > bx0 && tTop < by1 && tBottom > by0) {
                    var midLabel = (tTop + tBottom) / 2, midBox = (by0 + by1) / 2;
                    ly = midLabel <= midBox ? by0 - 10 : by1 + 17;
                }
            }
            var ox0 = X1(0), oy0 = Y1(0);
            keepClear(ox0 - 2, T1 - 15, ox0 + 22, T1 + 3);
            keepClear(L1 + PW1 - 2, oy0 + 3, L1 + PW1 + 16, oy0 + 20);
            svg1.appendChild(svgVarText({ x: lx.toFixed(1), y: ly.toFixed(1), 'font-size': 12.5, 'text-anchor': anchor, fill: color }, parts));
        }

        // ── Rita vektorplanet ──────────────────────────────────────────────
        var clipId1 = 'ma4-114-clip1-' + (uid++);
        function drawVector() {
            while (svg1.firstChild) svg1.removeChild(svg1.firstChild);
            var a = state.a, b = state.b, c = cLen(a, b), v = vAngle(a, b);
            var ox = X1(0), oy = Y1(0);

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId1 });
            cp.appendChild(svgEl('rect', { x: L1, y: T1, width: PW1, height: PH1 }));
            defs.appendChild(cp);
            svg1.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId1 + ')' });
            svg1.appendChild(g);

            // Rutnät (glest — planet är litet)
            var ticks = [-15, -10, -5, 5, 10, 15];
            ticks.forEach(function (t) {
                g.appendChild(svgEl('line', { x1: X1(t), y1: T1, x2: X1(t), y2: T1 + PH1, stroke: COL.grid, 'stroke-width': 1 }));
                g.appendChild(svgEl('line', { x1: L1, y1: Y1(t), x2: L1 + PW1, y2: Y1(t), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // Axlar med pilspetsar
            svg1.appendChild(svgEl('line', { x1: L1, y1: oy, x2: L1 + PW1 + 6, y2: oy, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg1.appendChild(svgEl('polygon', { points: (L1 + PW1 + 13) + ',' + oy + ' ' + (L1 + PW1 + 3) + ',' + (oy - 4) + ' ' + (L1 + PW1 + 3) + ',' + (oy + 4), fill: COL.axis }));
            svg1.appendChild(svgEl('line', { x1: ox, y1: T1 + PH1, x2: ox, y2: T1 - 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg1.appendChild(svgEl('polygon', { points: ox + ',' + (T1 - 13) + ' ' + (ox - 4) + ',' + (T1 - 3) + ' ' + (ox + 4) + ',' + (T1 - 3), fill: COL.axis }));
            svg1.appendChild(svgVarText({ x: L1 + PW1 + 11, y: oy + 14, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*a']));
            svg1.appendChild(svgVarText({ x: ox + 9, y: T1 - 4, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, ['*b']));

            [-10, 10].forEach(function (t) {
                if (Math.abs(a - t) > 2.2) {
                    svg1.appendChild(svgVarText({ x: X1(t), y: oy + 14, 'font-size': 10, 'text-anchor': 'middle', fill: COL.tick }, [fmtDisp(t, 0)]));
                }
                if (Math.abs(b - t) > 2.2) {
                    svg1.appendChild(svgVarText({ x: ox - 6, y: Y1(t) + 3.5, 'font-size': 10, 'text-anchor': 'end', fill: COL.tick }, [fmtDisp(t, 0)]));
                }
            });

            // Vinkelbåge v (från positiva a-axeln till vektorn) — etiketten är
            // BARA bokstaven v (numeriskt värde står i formelraden från steg
            // 2) för att inte korsa den lodräta hjälplinjen till a-punkten.
            var vLabelPt = null;
            if (Math.abs(v) > 0.06) {
                g.appendChild(svgEl('path', { d: arcPath1(ox, oy, 20, 0, v), fill: 'none', stroke: COL.sum, 'stroke-width': 1.3 }));
                if (Math.abs(v) > 0.25) {
                    var mid = v / 2, pt = polarPt1(ox, oy, 20 + 9, mid);
                    vLabelPt = { x: pt.x, y: pt.y + 3.5 };
                    svg1.appendChild(svgVarText({ x: pt.x.toFixed(1), y: (pt.y + 3.5).toFixed(1), 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.sum },
                        ['*v']));
                }
            }

            // Hjälplinjer till axlarna (neutrala, streckade) + färgade axeletiketter
            var px = X1(a), py = Y1(b);
            if (Math.abs(a) > 0.15 || Math.abs(b) > 0.15) {
                g.appendChild(svgEl('line', { x1: px, y1: py, x2: px, y2: oy, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
                g.appendChild(svgEl('line', { x1: px, y1: py, x2: ox, y2: py, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
            }
            // Koordinatetiketterna hoppas över nära den positiva kanten (där
            // axelns namnetikett sitter) och när de skulle krocka med v-
            // etiketten på bågen (kan hända för vissa vinklar).
            function tooCloseToArc(lx, ly) {
                return vLabelPt != null && Math.hypot(lx - vLabelPt.x, ly - vLabelPt.y) < 16;
            }
            var aLblY = oy + (b >= 0 ? 14 : -8);
            if (Math.abs(a) > 0.4 && a < A_MAX - 3 && !tooCloseToArc(px, aLblY)) {
                svg1.appendChild(svgVarText({ x: px, y: aLblY, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.aTerm }, ['*a']));
            }
            var bLblX = ox + (a >= 0 ? -7 : 8), bLblY = py + 4;
            if (Math.abs(b) > 0.4 && b < A_MAX - 3 && !tooCloseToArc(bLblX, bLblY)) {
                svg1.appendChild(svgVarText({ x: bLblX, y: bLblY, 'font-size': 11.5, 'text-anchor': a >= 0 ? 'end' : 'start', fill: COL.bTerm }, ['*b']));
            }

            // Vektorn (a, b) — röd, dragbar
            var info = drawArrow1(g, a, b, COL.sum, 2.4);
            if (info.len > 4) arrowLabel1(['*c', ' ≈ ' + fmt(c, 2)], info, COL.sum, 15);
            g.appendChild(svgEl('circle', { cx: info.tipX.toFixed(1), cy: info.tipY.toFixed(1), r: 4.2, fill: COL.sum }));
            var hit = svgEl('circle', { cx: info.tipX.toFixed(1), cy: info.tipY.toFixed(1), r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg1.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            svg1.appendChild(hit);
        }

        // ── Rita grafen ────────────────────────────────────────────────────
        var clipId2 = 'ma4-114-clip2-' + (uid++);
        function pathFor(fn) {
            var d = '', down = false, N = 320;
            for (var i = 0; i <= N; i++) {
                var x = XMIN2 + (XMAX2 - XMIN2) * i / N;
                var y = fn(x);
                if (y >= YMIN2 - 3 && y <= YMAX2 + 3) {
                    d += (down ? 'L' : 'M') + X2(x).toFixed(1) + ' ' + Y2(y).toFixed(1) + ' ';
                    down = true;
                } else down = false;
            }
            return d;
        }
        function drawGraph() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var a = state.a, b = state.b, c = cLen(a, b), v = vAngle(a, b);
            var axisY = Y2(0);

            // Rutnät
            var i;
            [Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI, 5 * Math.PI / 2, 3 * Math.PI, 7 * Math.PI / 2, 4 * Math.PI].forEach(function (xv) {
                svg2.appendChild(svgEl('line', { x1: X2(xv), y1: T2, x2: X2(xv), y2: T2 + PH2, stroke: COL.grid, 'stroke-width': 1 }));
            });
            [-20, -10, 10, 20].forEach(function (yv) {
                svg2.appendChild(svgEl('line', { x1: L2, y1: Y2(yv), x2: L2 + PW2, y2: Y2(yv), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // Axlar
            svg2.appendChild(svgEl('line', { x1: L2, y1: axisY, x2: L2 + PW2 + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L2 + PW2 + 14) + ',' + axisY + ' ' + (L2 + PW2 + 4) + ',' + (axisY - 4.5) + ' ' + (L2 + PW2 + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: L2, y1: T2 + PH2, x2: L2, y2: T2 - 6, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: L2 + ',' + (T2 - 14) + ' ' + (L2 - 4.5) + ',' + (T2 - 4) + ' ' + (L2 + 4.5) + ',' + (T2 - 4), fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: L2 + PW2 + 6, y: axisY + 18, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg2.appendChild(svgVarText({ x: L2 + 9, y: T2 - 5, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*y']));

            // x-ticks: π, 2π, 3π, 4π
            ['π', '2π', '3π', '4π'].forEach(function (lbl, idx) {
                var xv = (idx + 1) * Math.PI;
                svg2.appendChild(svgVarText({ x: X2(xv), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [lbl]));
            });
            // y-ticks
            [-20, -10, 10, 20].forEach(function (yv) {
                svg2.appendChild(svgVarText({ x: L2 - 6, y: Y2(yv) + 3.5, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick }, [fmtDisp(yv, 0)]));
            });

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId2 });
            cp.appendChild(svgEl('rect', { x: L2, y: T2, width: PW2, height: PH2 }));
            defs.appendChild(cp);
            svg2.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId2 + ')' });
            svg2.appendChild(g);

            // Amplitudgränser y = ±c (steg 2+)
            if (state.step >= 2 && c > 0.3) {
                [c, -c].forEach(function (yv) {
                    svg2.appendChild(svgEl('line', {
                        x1: L2, y1: Y2(yv), x2: L2 + PW2 + 8, y2: Y2(yv),
                        stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '5 4'
                    }));
                });
                svg2.appendChild(svgVarText({ x: L2 + PW2 + 12, y: Y2(c) - 4, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.sum }, ['*c']));
                svg2.appendChild(svgVarText({ x: L2 + PW2 + 12, y: Y2(-c) + 12, 'font-size': 12.5, 'text-anchor': 'start', fill: COL.sum }, ['−', '*c']));
            }

            // Komponentkurvorna (tunna)
            g.appendChild(svgEl('path', { d: pathFor(function (x) { return a * Math.sin(x); }), fill: 'none', stroke: COL.aTerm, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));
            g.appendChild(svgEl('path', { d: pathFor(function (x) { return b * Math.cos(x); }), fill: 'none', stroke: COL.bTerm, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));

            // Summan (tjock, röd)
            g.appendChild(svgEl('path', { d: pathFor(function (x) { return a * Math.sin(x) + b * Math.cos(x); }), fill: 'none', stroke: COL.sum, 'stroke-width': 2.8, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

            // Facit-kurvan c·sin(x+v) — svart streckad ovanpå summan
            if (state.step >= 2 && state.showC) {
                g.appendChild(svgEl('path', {
                    d: pathFor(function (x) { return c * Math.sin(x + v); }),
                    fill: 'none', stroke: COL.axis, 'stroke-width': 2.1, 'stroke-dasharray': '7 5',
                    'stroke-linejoin': 'round', opacity: 0.85
                }));
            }
        }

        // ── Formler ────────────────────────────────────────────────────────
        function sqTerm(val) {
            var t = fmtTex(val, 1);
            return (val < 0 ? '(' + t + ')' : t) + '^2';
        }
        function buildEq(a, b) {
            var terms = [];
            if (Math.abs(a) > 1e-9) terms.push({ v: a, tex: '\\sin x' });
            if (Math.abs(b) > 1e-9) terms.push({ v: b, tex: '\\cos x' });
            if (!terms.length) return 'y = 0';
            var out = 'y = ';
            terms.forEach(function (t, i) {
                var av = fmtTex(Math.abs(t.v), 1);
                if (i === 0) out += (t.v < 0 ? '-' : '') + av + t.tex;
                else out += (t.v < 0 ? ' - ' : ' + ') + av + t.tex;
            });
            return out;
        }
        function updateFormulas() {
            var a = state.a, b = state.b, c = cLen(a, b), v = vAngle(a, b);
            formelA.style.color = COL.axis;
            katexInto(formelA, buildEq(a, b));

            if (state.step >= 2) {
                formelB.style.color = COL.sum;
                katexInto(formelB,
                    'c = \\sqrt{a^2+b^2} = \\sqrt{' + sqTerm(a) + ' + ' + sqTerm(b) + '} = \\sqrt{' +
                    fmtTex(a * a + b * b, 2) + '} = ' + fmtTex(c, 2));

                formelC.style.color = COL.sum;
                if (Math.abs(a) > 0.05) {
                    katexInto(formelC,
                        '\\tan v = \\dfrac{b}{a} = \\dfrac{' + fmtTex(b, 2) + '}{' + fmtTex(a, 2) + '} = ' +
                        fmtTex(b / a, 3) + ' \\;\\Rightarrow\\; v \\approx ' + fmtTex(v, 2) + '\\ \\text{rad}');
                } else {
                    katexInto(formelC,
                        '\\tan v \\text{ odefinierad (vektorn ligger på } b\\text{-axeln)} \\quad v = ' +
                        fmtTex(v, 2) + '\\ \\text{rad}');
                }

                var noteHtml = '';
                if (a < 0) {
                    noteHtml += 'Eftersom <em>a</em> < 0 pekar vektorn åt vänster — räknarens ' +
                        'arctan(<em>b</em>/<em>a</em>) ger då fel kvadrant, så <em>v</em> avläses ' +
                        'i stället ur figuren. ';
                }
                if (state.step === 2) {
                    noteHtml += 'Vanlig miss: <em>c</em> ≠ <em>a</em> + <em>b</em>. Just nu är ' +
                        '<em>a</em> + <em>b</em> = ' + fmt(a + b, 2) + ' men <em>c</em> ≈ ' + fmt(c, 2) + '.';
                } else {
                    noteHtml += 'Amplituden <em>c</em> beror bara på vektorns längd — inte på dess ' +
                        'riktning. Vektorn roterar, men kurvan behåller exakt samma <em>c</em>.';
                }
                note.innerHTML = noteHtml;
            } else {
                formelB.textContent = ''; formelC.textContent = ''; note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            formelB.style.display = state.step >= 2 ? '' : 'none';
            formelC.style.display = state.step >= 2 ? '' : 'none';
            note.style.display = state.step >= 2 ? '' : 'none';
            cLabel.style.display = state.step >= 2 ? '' : 'none';
            playBtn.style.display = state.step === 3 ? '' : 'none';
            actions.style.display = state.step >= 2 ? '' : 'none';
            legC.el.style.display = (state.step >= 2 && state.showC) ? '' : 'none';

            drawVector();
            drawGraph();
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
    var api = { mount: mount };
    window.VISUALISERINGAR['ma4-1.14'] = api;
})();
