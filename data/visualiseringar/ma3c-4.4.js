/* ma3c-4.4.js — visualisering: "Tre synkade grafer: f, f′ och f″".
 *
 * Kärninsikt: växande/avtagande styrs av f′, buktar-uppåt/buktar-nedåt
 * (konvex/konkav) styrs av f″ — och de två är HELT OBEROENDE av varandra.
 * Missuppfattningen är att blanda ihop dem (t.ex. tro att "avtagande" alltid
 * betyder "buktar nedåt"). Tre staplade koordinatsystem (f överst, f′ i
 * mitten, f″ nederst) delar samma x-axel. En lodrät draglinje går genom
 * alla tre samtidigt: f-kurvans TANGENT färgas efter f′:s tecken (grön/
 * orange), f-kurvans EGEN FÄRG färgas efter f″:s tecken (blå/röd) — och
 * mitt i den tredje domänen (mellan inflexionspunkten och minimipunkten)
 * kan eleven se en avtagande OCH konvex kurva samtidigt: den överraskande
 * kombinationen som texten frågar om i steg 3.
 *
 * Funktionen är f(x) = x³ − 6x² + 7x — samma som Exempel 1 i genomgången
 * (inflexionspunkt vid (2, −2), f′(x) = 3x² − 12x + 7, f″(x) = 6x − 12),
 * så eleven kan "spela upp" exemplet. Extrempunkterna ligger vid
 * x = 2 ∓ √15/3 (≈ 0,709 och ≈ 3,291).
 *
 * Fyra kombinationer syns när man drar hela vägen genom domänen:
 *   x < 0,709        växande + konkav   (bromsande uppgång)
 *   0,709 < x < 2     avtagande + konkav (den "väntade" nedgången)
 *   2 < x < 3,291     avtagande + konvex (den ÖVERRASKANDE kombinationen)
 *   x > 3,291         växande + konvex   (accelererande uppgång)
 *
 * Tre steg (lager):
 *   1. Växande & avtagande — f + f′. Tangenten på f-kurvan färgas grön/
 *      orange efter f′:s tecken; f′-kurvan är färgad likadant. Vändpunkter
 *      markerade.
 *   2. Konvex & konkav — f + f″. f-kurvan färgas blå/röd efter f″:s tecken;
 *      f″-kurvan (rak linje) är färgad likadant. Inflexionspunkt markerad.
 *   3. Gissa: går det ihop? — alla tre grafer. Tangent- OCH kurvfärgning
 *      samtidigt. Gissningsfråga + knapp som hoppar till den överraskande
 *      zonen (2 < x < 3,291) och markerar den.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / ma3c-4.1.js).
 * API: window.VISUALISERINGAR['ma3c-4.4'] = { mount(el) → { destroy() } }.
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
    // Del-prefix '*' = kursiv (variabel). Del-prefix '^' = liten dx-lucka
    // före delen (används för prim-tecken ′/″ som annars klipper in i en
    // föregående kursiv bokstavs kurva och blir nästintill osynliga vid
    // små teckenstorlekar).
    function svgVarText(attrs, parts) {
        var el = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var italic = p.charAt(0) === '*';
            var gap = p.charAt(0) === '^';
            var raw = (italic || gap) ? p.slice(1) : p;
            var tAttrs = {};
            if (italic) tAttrs['font-style'] = 'italic';
            if (gap) tAttrs.dx = '1.5';
            var t = svgEl('tspan', tAttrs);
            t.textContent = raw;
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
    // grow/fall = f′:s tecken (växande/avtagande). curve/convex = f″:s
    // tecken (konkav/konvex) — medvetet EN ANNAN färgpar än grow/fall, så
    // att de två oberoende egenskaperna aldrig kan förväxlas visuellt.
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        axis: '#1f2530',
        tick: '#5b6472',
        curve: '#2563c9',      // f″ < 0 — konkav (samma blå som teorifigurens "Konkav")
        convex: '#c8324a',     // f″ > 0 — konvex (samma röd som teorifigurens "Konvex")
        grow: '#4a7d3a',       // f′ > 0 — växande
        fall: '#f97316',       // f′ < 0 — avtagande
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        zone: 'rgba(249,115,22,0.13)'
    };

    var EPS = 0.15;
    var uid = 0;

    // ── Funktionen och dess derivator (Exempel 1 i ma3c-4.4) ──────────────
    function fVal(x) { return x * x * x - 6 * x * x + 7 * x; }
    function fp(x) { return 3 * x * x - 12 * x + 7; }
    function fpp(x) { return 6 * x - 12; }
    var EX1 = 2 - Math.sqrt(15) / 3;     // ≈ 0,709 — lokal maximipunkt
    var EX2 = 2 + Math.sqrt(15) / 3;     // ≈ 3,291 — lokal minimipunkt
    var F_EX1 = fVal(EX1);
    var F_EX2 = fVal(EX2);
    var X_INFL = 2, F_INFL = fVal(2);    // −2 — inflexionspunkt

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var XMIN = -0.5, XMAX = 4.5, X_STEP = 0.02;
        var state = { x: 1.8, step: 1, showZone: false };
        var animId = null;

        // ── Geometri: gemensam x-axel för alla tre grafer ───────────────
        var W = 560, L = 46, R = 16;
        var PW = W - L - R;
        function X(x) { return L + (x - XMIN) / (XMAX - XMIN) * PW; }

        // f-grafen (störst — huvudscenen)
        var HF = 172, TF = 14, BF = 30, PHF = HF - TF - BF;
        var YMIN_F = -8, YMAX_F = 4;
        function YF(y) { return TF + (YMAX_F - y) / (YMAX_F - YMIN_F) * PHF; }

        // f′-grafen
        var HP = 152, TP = 12, BP = 26, PHP = HP - TP - BP;
        var YMIN_P = -7, YMAX_P = 15;
        function YP(y) { return TP + (YMAX_P - y) / (YMAX_P - YMIN_P) * PHP; }

        // f″-grafen
        var H2 = 152, T2 = 12, B2 = 26, PH2 = H2 - T2 - B2;
        var YMIN_2 = -17, YMAX_2 = 17;
        function Y2(y) { return T2 + (YMAX_2 - y) / (YMAX_2 - YMIN_2) * PH2; }

        function screenTangentF(x) {
            var d = 0.03;
            var x1 = clampNum(x - d, XMIN, XMAX), x2 = clampNum(x + d, XMIN, XMAX);
            var p1x = X(x1), p1y = YF(fVal(x1));
            var p2x = X(x2), p2y = YF(fVal(x2));
            var ang = Math.atan2(p2y - p1y, p2x - p1x);
            return { rad: ang, sx: X(x), sy: YF(fVal(x)) };
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Tre synkade grafer: f, f′ och f″';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        function makeScene(ariaLabel, h) {
            var scene = document.createElement('div');
            scene.className = 'lab-graf-scene lab-vis-scene';
            scene.style.marginTop = '8px';
            var svg = svgEl('svg', {
                viewBox: '0 0 ' + W + ' ' + h,
                width: W, height: h,
                'font-family': 'DM Sans, system-ui, sans-serif',
                role: 'img',
                'aria-label': ariaLabel
            });
            svg.classList.add('lab-graf-svg');
            svg.style.cursor = 'default';
            svg.style.touchAction = 'none';
            scene.appendChild(svg);
            card.appendChild(scene);
            return { scene: scene, svg: svg };
        }
        var sF = makeScene('Graf över f(x) = x i tredje minus 6x i kvadrat plus 7x. ' +
            'Tangentlinjen vid den lodräta draglinjen visar riktningen; kurvan kan ' +
            'färgas efter om den buktar uppåt eller nedåt.', HF);
        sF.scene.style.marginTop = '0';
        var svgF = sF.svg;
        var sP = makeScene('Graf över f-prim av x, förstaderivatan — dess tecken avslöjar ' +
            'om f växer eller avtar.', HP);
        var svgP = sP.svg;
        var sPP = makeScene('Graf över f-bis av x, andraderivatan — dess tecken avslöjar ' +
            'om f är konvex eller konkav.', H2);
        var svgPP = sPP.svg;

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelX = document.createElement('div');
        formelX.className = 'lab-vis-formel';
        card.appendChild(formelX);

        var formelFp = document.createElement('div');
        formelFp.className = 'lab-vis-formel';
        card.appendChild(formelFp);

        var formelFpp = document.createElement('div');
        formelFpp.className = 'lab-vis-formel';
        card.appendChild(formelFpp);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var zoneNote = document.createElement('div');
        zoneNote.className = 'lab-vis-note';
        zoneNote.style.cssText = 'border-left:3px solid ' + COL.fall + ';padding-left:10px;';
        card.appendChild(zoneNote);

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
            { n: 1, label: '1 · Växande & avtagande' },
            { n: 2, label: '2 · Konvex & konkav' },
            { n: 3, label: '3 · Gissa: går det ihop?' }
        ];
        var INSTR = {
            1: 'Dra i <em>f</em>-kurvan (eller <em>x</em>-glidaren) och se tangentlinjen ' +
               'färgas grön där kurvan är <em>växande</em> och orange där den är ' +
               '<em>avtagande</em> — exakt samma tecken som <em>f</em>′(<em>x</em>) har i ' +
               'grafen under. De vita prickarna är vändpunkter, där <em>f</em>′(<em>x</em>) = 0.',
            2: 'Nu handlar det om kurvans form, inte dess riktning. <em>f</em>-kurvan ' +
               'färgas blå där den buktar nedåt (<em>konkav</em>) och röd där den buktar ' +
               'uppåt (<em>konvex</em>) — samma tecken som <em>f</em>″(<em>x</em>) i grafen ' +
               'under. Den vita pricken är inflexionspunkten, där <em>f</em>″(<em>x</em>) = 0.',
            3: 'Gissa innan du drar: kan en kurva vara <em>avtagande</em> samtidigt som den ' +
               '<em>buktar uppåt</em> (konvex)? Dra linjen mellan inflexionspunkten ' +
               '(<em>x</em> = 2) och minimipunkten (<em>x</em> ≈ 3,29) för att se svaret — ' +
               'eller tryck på knappen nedan. Alla tre grafer syns nu tillsammans.'
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
            return span;
        }
        var legF = legendItem(COL.axis, '<em>f</em>(<em>x</em>) = <em>x</em>³ − 6<em>x</em>² + 7<em>x</em>');
        var legGrow = legendItem(COL.grow, 'växande (<em>f</em>′(<em>x</em>) &gt; 0)');
        var legFall = legendItem(COL.fall, 'avtagande (<em>f</em>′(<em>x</em>) &lt; 0)');
        var legConcave = legendItem(COL.curve, 'konkav (<em>f</em>″(<em>x</em>) &lt; 0)');
        var legConvex = legendItem(COL.convex, 'konvex (<em>f</em>″(<em>x</em>) &gt; 0)');
        var legExtreme = legendItem(COL.axis, 'vändpunkt (<em>f</em>′(<em>x</em>) = 0)');
        var legInfl = legendItem(COL.axis, 'inflexionspunkt (<em>f</em>″(<em>x</em>) = 0)');
        legend.appendChild(legF);
        legend.appendChild(legGrow);
        legend.appendChild(legFall);
        legend.appendChild(legConcave);
        legend.appendChild(legConvex);
        legend.appendChild(legExtreme);
        legend.appendChild(legInfl);

        // ── Steg 3: gissningsknapp + zon-kryssruta ─────────────────────────
        var revealBtn = document.createElement('button');
        revealBtn.type = 'button';
        revealBtn.className = 'lab-btn';
        revealBtn.textContent = 'Visa den överraskande zonen';
        revealBtn.addEventListener('click', function () {
            state.showZone = true;
            zoneCb.checked = true;
            animateTo((X_INFL + EX2) / 2);
        });
        actions.appendChild(revealBtn);

        var zoneLabel = document.createElement('label');
        zoneLabel.className = 'lab-graf-check';
        var zoneCb = document.createElement('input');
        zoneCb.type = 'checkbox';
        zoneCb.addEventListener('change', function () { state.showZone = zoneCb.checked; update(); });
        zoneLabel.appendChild(zoneCb);
        var zoneTxt = document.createElement('span');
        zoneTxt.innerHTML = 'Markera zonen (avtagande men konvex)';
        zoneLabel.appendChild(zoneTxt);
        actions.appendChild(zoneLabel);

        // ── Glidare (x) ───────────────────────────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.axis + ' 0%, ' +
                    COL.axis + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
        function setX(v) { state.x = Math.round(v / X_STEP) * X_STEP; }
        var rowX = makeRow('x', XMIN, XMAX, X_STEP, function () { return state.x; }, setX);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Börja om';
        reset.addEventListener('click', function () {
            stopAnim();
            state.x = 1.8; state.step = 1; state.showZone = false;
            zoneCb.checked = false;
            rowX.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: mjuk glidning till ett x-värde ──────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function animateTo(target) {
            stopAnim();
            var x0 = state.x, t0 = null, T_MS = 700;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                var e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
                state.x = x0 + (target - x0) * e;
                rowX.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else { animId = null; state.x = target; rowX.sync(); update(); }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dra draglinjen — var som helst i någon av de tre graferna ──────
        function toWorldX(svgNode, clientX) {
            var r = svgNode.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            return XMIN + (px - L) / PW * (XMAX - XMIN);
        }
        function setupDrag(svgNode) {
            var dragging = false;
            svgNode.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svgNode.setPointerCapture(e.pointerId); } catch (err) {}
                setX(toWorldX(svgNode, e.clientX));
                rowX.sync();
                update();
                e.preventDefault();
            });
            svgNode.addEventListener('pointermove', function (e) {
                if (!dragging) return;
                setX(clampNum(toWorldX(svgNode, e.clientX), XMIN, XMAX));
                rowX.sync();
                update();
            });
            function endDrag() { dragging = false; }
            svgNode.addEventListener('pointerup', endDrag);
            svgNode.addEventListener('pointercancel', endDrag);
        }
        setupDrag(svgF);
        setupDrag(svgP);
        setupDrag(svgPP);

        // ── Gemensam axel/rutnät-ritare ──────────────────────────────────
        function pathSeg(fn, Yfn, x0, x1, N) {
            var d = '', j;
            for (j = 0; j <= N; j++) {
                var xv = x0 + (x1 - x0) * j / N;
                d += (j === 0 ? 'M' : 'L') + X(xv).toFixed(1) + ' ' + Yfn(fn(xv)).toFixed(1) + ' ';
            }
            return d;
        }
        function drawAxesGrid(svg, opt) {
            var axisX = X(0), axisY = opt.Yfn(0);
            var i;
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                svg.appendChild(svgEl('line', { x1: X(i), y1: opt.T, x2: X(i), y2: opt.T + opt.PH, stroke: COL.grid, 'stroke-width': 1 }));
            }
            var y0 = Math.ceil(opt.ymin / opt.ystep) * opt.ystep;
            for (i = y0; i <= opt.ymax; i += opt.ystep) {
                svg.appendChild(svgEl('line', { x1: L, y1: opt.Yfn(i), x2: L + PW, y2: opt.Yfn(i), stroke: COL.grid, 'stroke-width': 1 }));
            }
            // Zon-markering (steg 3): 2 < x < EX2 — bakom kurvan, framför rutnätet
            if (state.step === 3 && state.showZone) {
                svg.appendChild(svgEl('rect', {
                    x: X(X_INFL), y: opt.T, width: X(EX2) - X(X_INFL), height: opt.PH,
                    fill: COL.zone
                }));
            }
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: opt.T + opt.PH, x2: axisX, y2: opt.T - 4, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (opt.T - 12) + ' ' + (axisX - 4.5) + ',' + (opt.T - 2) + ' ' + (axisX + 4.5) + ',' + (opt.T - 2), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: L + PW + 2, y: axisY + 16, 'font-size': 13, 'text-anchor': 'end', fill: COL.axis }, ['*x']));
            svg.appendChild(svgVarText({ x: axisX + 8, y: opt.T + 10, 'font-size': 13, 'text-anchor': 'start', fill: COL.axis }, opt.yLabel));
            for (i = Math.ceil(XMIN); i <= Math.floor(XMAX); i++) {
                if (opt.xSkip && opt.xSkip(i)) continue;
                svg.appendChild(svgVarText({ x: X(i), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
            }
            for (i = y0; i <= opt.ymax; i += opt.ystep) {
                if (Math.abs(i) < 1e-9) continue;
                svg.appendChild(svgVarText({ x: axisX - 6, y: opt.Yfn(i) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
            }
            return { axisX: axisX, axisY: axisY };
        }

        // ── Rita f-grafen ───────────────────────────────────────────────
        var clipF = 'lab-vis-clip-' + (uid++);
        function drawF() {
            while (svgF.firstChild) svgF.removeChild(svgF.firstChild);
            var x = state.x, k1 = fp(x), px = X(x);
            var axes = drawAxesGrid(svgF, {
                Yfn: YF, ymin: YMIN_F, ymax: YMAX_F, ystep: 2, T: TF, PH: PHF,
                yLabel: ['*f', '(', '*x', ')'],
                xSkip: function (i) { return Math.abs(X(i) - X(x)) < 34; }
            });
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipF });
            cp.appendChild(svgEl('rect', { x: L, y: TF, width: PW, height: PHF }));
            defs.appendChild(cp);
            svgF.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipF + ')' });
            svgF.appendChild(g);

            // Kurvan — enfärgad i steg 1, konkav/konvex-färgad i steg 2–3
            if (state.step >= 2) {
                g.appendChild(svgEl('path', { d: pathSeg(fVal, YF, XMIN, X_INFL, 140), fill: 'none', stroke: COL.curve, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: pathSeg(fVal, YF, X_INFL, XMAX, 140), fill: 'none', stroke: COL.convex, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            } else {
                g.appendChild(svgEl('path', { d: pathSeg(fVal, YF, XMIN, XMAX, 220), fill: 'none', stroke: COL.axis, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            }

            // Tangentlinje (steg 1 och 3) — färgad efter f′:s tecken
            if (state.step === 1 || state.step === 3) {
                var tcol = k1 > EPS ? COL.grow : (k1 < -EPS ? COL.fall : COL.axis);
                var tang = screenTangentF(x);
                var half = 30;
                g.appendChild(svgEl('line', {
                    x1: tang.sx - half * Math.cos(tang.rad), y1: tang.sy - half * Math.sin(tang.rad),
                    x2: tang.sx + half * Math.cos(tang.rad), y2: tang.sy + half * Math.sin(tang.rad),
                    stroke: tcol, 'stroke-width': 2.2, 'stroke-dasharray': '7 5'
                }));
            }

            // Kurvetikett i fri yta uppe till höger (kurvan ligger lågt där)
            svgF.appendChild(svgVarText(
                { x: L + PW - 4, y: TF + 12, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.axis },
                ['*f', '(', '*x', ') = ', '*x', '³ − 6', '*x', '² + 7', '*x']));

            // Vändpunkter (max/min) — steg 1 och 3. Textetiketten döljs när
            // den skulle hamna där den nuvarande draglinje-punkten (px) står
            // — annars kan draglinjens prick/tangent hamna rakt ovanpå
            // texten. Den levande avläsningen/notisen säger redan
            // "vändpunkt" i det läget, så ingen information går förlorad.
            // BUFFER är ett generöst marginaltillägg runt textens uppskattade
            // pixelbredd.
            var BUFFER = 12;
            function labelClear(x0, x1) { return px < x0 - BUFFER || px > x1 + BUFFER; }
            if (state.step === 1 || state.step === 3) {
                g.appendChild(svgEl('circle', { cx: X(EX1), cy: YF(F_EX1), r: 3.6, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.5 }));
                g.appendChild(svgEl('circle', { cx: X(EX2), cy: YF(F_EX2), r: 3.6, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.5 }));
                var maxX0 = X(EX1) + 9, maxX1 = maxX0 + 68;
                if (labelClear(maxX0, maxX1)) {
                    svgF.appendChild(svgEl('text', { x: maxX0, y: YF(F_EX1) + 38, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.axis })).textContent = 'Maximipunkt';
                }
                var minX1 = X(EX2) - 9, minX0 = minX1 - 68;
                if (labelClear(minX0, minX1)) {
                    svgF.appendChild(svgEl('text', { x: minX1, y: YF(F_EX2) - 8, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.axis })).textContent = 'Minimipunkt';
                }
            }
            // Inflexionspunkt — steg 2 och 3 (samma undantag)
            if (state.step >= 2) {
                g.appendChild(svgEl('circle', { cx: X(X_INFL), cy: YF(F_INFL), r: 3.6, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.5 }));
                var inflX0 = X(X_INFL) + 10, inflX1 = inflX0 + 86;
                if (labelClear(inflX0, inflX1)) {
                    svgF.appendChild(svgEl('text', { x: inflX0, y: YF(F_INFL) - 10, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.axis })).textContent = 'Inflexionspunkt';
                }
            }

            // Punkten vid draglinjen + "x ="-etikett under axeln
            var py = YF(fVal(x));
            var dotCol = state.step === 2 ? (fpp(x) > EPS ? COL.convex : (fpp(x) < -EPS ? COL.curve : COL.axis))
                : (k1 > EPS ? COL.grow : (k1 < -EPS ? COL.fall : COL.axis));
            svgF.appendChild(svgEl('line', { x1: px, y1: TF, x2: px, y2: TF + PHF, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
            svgF.appendChild(svgEl('circle', { cx: px, cy: py, r: 5, fill: dotCol, stroke: COL.axis, 'stroke-width': 1 }));
            // "x = …"-etiketten hålls innanför kortets kanter även när
            // draglinjen står nära domänens ändar (annars sticker den ut).
            var xLabelPx = clampNum(px, L + 30, L + PW - 54);
            // Normalt hamnar "x = …" på tick-raden strax under x-axeln — men
            // när kurvan (och därmed pricken) själv ligger nära x-axeln
            // skulle etiketten kollidera med pricken. Flytta då etiketten
            // nedanför pricken i stället.
            var tickRowY = axes.axisY + 16;
            var xLabelY = Math.abs(tickRowY - py) < 16 ? clampNum(py + 20, TF + 18, TF + PHF + 24) : tickRowY;
            svgF.appendChild(svgVarText({ x: xLabelPx, y: xLabelY, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.axis }, ['*x', ' = ' + fmt(x, 2)]));

            // Osynlig träffcirkel (grab-handtag) längst upp på draglinjen
            var handle = svgEl('circle', { cx: px, cy: TF, r: 16, fill: 'rgba(0,0,0,0)' });
            handle.style.cursor = 'grab';
            svgF.appendChild(handle);
        }

        // ── Rita f′-grafen ─────────────────────────────────────────────
        var clipP = 'lab-vis-clip-' + (uid++);
        function drawP() {
            while (svgP.firstChild) svgP.removeChild(svgP.firstChild);
            var x = state.x, k1 = fp(x);
            var axes = drawAxesGrid(svgP, {
                Yfn: YP, ymin: YMIN_P, ymax: YMAX_P, ystep: 5, T: TP, PH: PHP,
                yLabel: ['*f', '^′(', '*x', ')'],
                xSkip: function (i) { return Math.abs(X(i) - X(x)) < 15; }
            });
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipP });
            cp.appendChild(svgEl('rect', { x: L, y: TP, width: PW, height: PHP }));
            defs.appendChild(cp);
            svgP.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipP + ')' });
            svgP.appendChild(g);

            g.appendChild(svgEl('path', { d: pathSeg(fp, YP, XMIN, EX1, 60), fill: 'none', stroke: COL.grow, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            g.appendChild(svgEl('path', { d: pathSeg(fp, YP, EX1, EX2, 60), fill: 'none', stroke: COL.fall, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            g.appendChild(svgEl('path', { d: pathSeg(fp, YP, EX2, XMAX, 60), fill: 'none', stroke: COL.grow, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));

            g.appendChild(svgEl('circle', { cx: X(EX1), cy: YP(0), r: 3.2, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.4 }));
            g.appendChild(svgEl('circle', { cx: X(EX2), cy: YP(0), r: 3.2, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.4 }));

            var px = X(x), py = YP(k1);
            var col = k1 > EPS ? COL.grow : (k1 < -EPS ? COL.fall : COL.axis);
            svgP.appendChild(svgEl('line', { x1: px, y1: TP, x2: px, y2: TP + PHP, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
            svgP.appendChild(svgEl('circle', { cx: px, cy: py, r: 5, fill: col, stroke: COL.axis, 'stroke-width': 1 }));

            var handle = svgEl('circle', { cx: px, cy: TP, r: 16, fill: 'rgba(0,0,0,0)' });
            handle.style.cursor = 'grab';
            svgP.appendChild(handle);
        }

        // ── Rita f″-grafen ─────────────────────────────────────────────
        var clipPP = 'lab-vis-clip-' + (uid++);
        function drawPP() {
            while (svgPP.firstChild) svgPP.removeChild(svgPP.firstChild);
            var x = state.x, k2 = fpp(x);
            var axes = drawAxesGrid(svgPP, {
                Yfn: Y2, ymin: YMIN_2, ymax: YMAX_2, ystep: 5, T: T2, PH: PH2,
                yLabel: ['*f', '^″(', '*x', ')'],
                xSkip: function (i) { return Math.abs(X(i) - X(x)) < 15; }
            });
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipPP });
            cp.appendChild(svgEl('rect', { x: L, y: T2, width: PW, height: PH2 }));
            defs.appendChild(cp);
            svgPP.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipPP + ')' });
            svgPP.appendChild(g);

            g.appendChild(svgEl('path', { d: pathSeg(fpp, Y2, XMIN, X_INFL, 20), fill: 'none', stroke: COL.curve, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            g.appendChild(svgEl('path', { d: pathSeg(fpp, Y2, X_INFL, XMAX, 20), fill: 'none', stroke: COL.convex, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            g.appendChild(svgEl('circle', { cx: X(X_INFL), cy: Y2(0), r: 3.2, fill: '#ffffff', stroke: COL.axis, 'stroke-width': 1.4 }));

            var px = X(x), py = Y2(k2);
            var col = k2 > EPS ? COL.convex : (k2 < -EPS ? COL.curve : COL.axis);
            svgPP.appendChild(svgEl('line', { x1: px, y1: T2, x2: px, y2: T2 + PH2, stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '4 3' }));
            svgPP.appendChild(svgEl('circle', { cx: px, cy: py, r: 5, fill: col, stroke: COL.axis, 'stroke-width': 1 }));

            var handle = svgEl('circle', { cx: px, cy: T2, r: 16, fill: 'rgba(0,0,0,0)' });
            handle.style.cursor = 'grab';
            svgPP.appendChild(handle);
        }

        // ── Formler (live-substituerade) ───────────────────────────────
        function updateFormulas() {
            var x = state.x, xT = fmtTex(x, 2);
            formelX.style.color = COL.axis;
            katexInto(formelX, 'x = ' + xT);

            var k1 = fp(x), k1T = fmtTex(k1, 2);
            var col1 = k1 > EPS ? COL.grow : (k1 < -EPS ? COL.fall : COL.axis);
            formelFp.style.color = col1;
            katexInto(formelFp,
                "f'(" + xT + ') = 3x^2-12x+7 = 3\\cdot(' + xT + ')^2-12\\cdot(' + xT + ')+7 = ' + k1T);

            var k2 = fpp(x), k2T = fmtTex(k2, 2);
            var col2 = k2 > EPS ? COL.convex : (k2 < -EPS ? COL.curve : COL.axis);
            formelFpp.style.color = col2;
            katexInto(formelFpp, "f''(" + xT + ') = 6x-12 = 6\\cdot(' + xT + ')-12 = ' + k2T);
        }

        // ── Textbeskrivning (ord) ─────────────────────────────────────
        function wordSpan(text, color) { return '<strong style="color:' + color + '">' + text + '</strong>'; }
        function updateNote() {
            var x = state.x, k1 = fp(x), k2 = fpp(x);
            var growWord = k1 > EPS ? wordSpan('växande', COL.grow) : (k1 < -EPS ? wordSpan('avtagande', COL.fall) : wordSpan('en vändpunkt', COL.axis));
            var concWord = k2 > EPS ? wordSpan('konvex (buktar uppåt)', COL.convex) : (k2 < -EPS ? wordSpan('konkav (buktar nedåt)', COL.curve) : wordSpan('en inflexionspunkt', COL.axis));
            if (state.step === 1) {
                note.innerHTML = 'Vid <em>x</em> = ' + fmt(x, 2) + ' är kurvan ' + growWord + '.';
            } else if (state.step === 2) {
                note.innerHTML = 'Vid <em>x</em> = ' + fmt(x, 2) + ' är kurvan ' + concWord + '.';
            } else {
                note.innerHTML = 'Vid <em>x</em> = ' + fmt(x, 2) + ' är kurvan samtidigt ' + growWord + ' och ' + concWord + '.';
            }
            var inZone = state.step === 3 && x > X_INFL + 0.03 && x < EX2 - 0.03;
            if (inZone) {
                zoneNote.style.display = '';
                zoneNote.innerHTML = 'Just nu ser du det: kurvan är ' + wordSpan('avtagande', COL.fall) +
                    ' men buktar ändå ' + wordSpan('uppåt (konvex)', COL.convex) + '. Växande/avtagande ' +
                    '(<em>f</em>′) och konvex/konkav (<em>f</em>″) är oberoende av varandra — det ena ' +
                    'säger inget om det andra.';
            } else {
                zoneNote.style.display = 'none';
            }
        }

        // ── Visa/dölj per steg + omritning ─────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            sP.scene.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            sPP.scene.style.display = (state.step >= 2) ? '' : 'none';

            legGrow.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            legFall.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            legExtreme.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            legConcave.style.display = (state.step >= 2) ? '' : 'none';
            legConvex.style.display = (state.step >= 2) ? '' : 'none';
            legInfl.style.display = (state.step >= 2) ? '' : 'none';

            formelFp.style.display = (state.step === 1 || state.step === 3) ? '' : 'none';
            formelFpp.style.display = (state.step >= 2) ? '' : 'none';
            actions.style.display = (state.step === 3) ? '' : 'none';

            drawF();
            drawP();
            if (state.step >= 2) drawPP();
            updateFormulas();
            updateNote();
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
    window.VISUALISERINGAR['ma3c-4.4'] = api;
})();
