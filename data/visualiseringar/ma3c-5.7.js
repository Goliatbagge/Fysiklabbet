/* ma3c-5.7.js — visualisering: "Integralen som resemätare" (tillämpningar av
 * integraler / beräkning av storheter med integraler). Hör till ma3c-5.7
 * (Tillämpningar av integraler) och ma4-3.5 (Beräkning av storheter med
 * integraler).
 *
 * Kärninsikt: arean under en v(t)-graf ÄR sträckan — enheterna
 * multipliceras (m/s · s = m), negativ hastighet ger negativ area (bilen
 * backar), och "integralen = 0" betyder tillbaka på startpunkten trots att
 * bilen kört hela tiden.
 *
 * Hastigheten v(t) är styckvis linjär mellan sex fasta tidpunkter
 * (t = 0, 2, 4, 6, 8, 10 s) — bara v-värdet i varje punkt dras, vilket gör
 * integralen exakt beräkningsbar med trapetsformeln (ärligt, inget
 * numeriskt approximationsfel).
 *
 * Tre steg (lager):
 *   1. Kör!       — dra i punkterna, kör bilen (rAF) eller dra tidsmarkören
 *                   själv. Arean skuggas grön där v > 0. Bilens läge s
 *                   avläses live. Vägen och bilen synkas med tidsmarkören.
 *   2. Backa      — dra punkter under nollinjen: röd area, bilen backar.
 *                   Två avläsningar: läget s (med tecken) och vägmätarens
 *                   totala körsträcka (∫|v|) — skillnaden förklaras.
 *   3. Uppdraget  — forma kurvan så att ∫₀¹⁰ v dt ≈ 0: tillbaka till start
 *                   trots att bilen kört hela tiden. KaTeX-formel med
 *                   enhetsresonemanget m/s · s = m.
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
    function fmtTick(n) { return String(n).replace('-', '−'); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function roundHalf(v) { return Math.round(v * 2) / 2; }

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
        pos: '#4a7d3a',                        // v > 0 — framåt (grön)
        neg: '#c8324a',                        // v < 0 — bakåt (röd)
        posFill: 'rgba(74,125,58,0.22)',
        negFill: 'rgba(200,50,74,0.20)',
        marker: '#1f2530',
        car: '#3b6ea5',
        wheel: '#20242c',
        hub: '#8a93a3',
        window: '#dbe8f2',
        headlight: '#f4c04a'
    };

    // ── Ren matematik på ett styckvis linjärt v(t) (inga state-beroenden) ─
    var T_KNOTS = [0, 2, 4, 6, 8, 10];
    var DEFAULT_V = [0, 9, 9, 9, 9, 0];
    var V_MIN = -8, V_MAX = 12, V_STEP = 0.5;

    function vAtSeg(v0, v1, t0, t1, t) { return v0 + (v1 - v0) * (t - t0) / (t1 - t0); }
    function segSignedInt(t0, v0, t1, v1) { return (v0 + v1) / 2 * (t1 - t0); }
    function segAbsInt(t0, v0, t1, v1) {
        if (v0 * v1 >= 0) return Math.abs((v0 + v1) / 2 * (t1 - t0));
        var tc = t0 + (t1 - t0) * Math.abs(v0) / (Math.abs(v0) + Math.abs(v1));
        return 0.5 * Math.abs(v0) * (tc - t0) + 0.5 * Math.abs(v1) * (t1 - tc);
    }
    // Delar upp i segment vid nollgenomgångar — varje segment har ett
    // entydigt tecken (för färgläggning av kurva/area).
    function segments(points) {
        var segs = [];
        for (var i = 0; i < points.length - 1; i++) {
            var t0 = points[i].t, v0 = points[i].v, t1 = points[i + 1].t, v1 = points[i + 1].v;
            if (v0 * v1 < 0) {
                var tc = t0 + (t1 - t0) * Math.abs(v0) / (Math.abs(v0) + Math.abs(v1));
                segs.push({ t0: t0, v0: v0, t1: tc, v1: 0, sign: v0 > 0 ? 1 : -1 });
                segs.push({ t0: tc, v0: 0, t1: t1, v1: v1, sign: v1 > 0 ? 1 : -1 });
            } else {
                segs.push({ t0: t0, v0: v0, t1: t1, v1: v1, sign: (v0 + v1) >= 0 ? 1 : -1 });
            }
        }
        return segs;
    }
    function clippedSegs(points, tEnd) {
        var segs = segments(points), out = [];
        for (var i = 0; i < segs.length; i++) {
            var s = segs[i];
            if (s.t0 >= tEnd) continue;
            if (s.t1 <= tEnd) { out.push(s); continue; }
            var vEnd = vAtSeg(s.v0, s.v1, s.t0, s.t1, tEnd);
            out.push({ t0: s.t0, v0: s.v0, t1: tEnd, v1: vEnd, sign: s.sign });
        }
        return out;
    }
    // Exakt integral (trapetsregeln — exakt eftersom v är styckvis linjär).
    function integrate(points, tEnd, absMode) {
        var total = 0;
        for (var i = 0; i < points.length - 1; i++) {
            var t0 = points[i].t, v0 = points[i].v, t1 = points[i + 1].t, v1 = points[i + 1].v;
            if (tEnd <= t0) break;
            if (tEnd >= t1) {
                total += absMode ? segAbsInt(t0, v0, t1, v1) : segSignedInt(t0, v0, t1, v1);
            } else {
                var vt = vAtSeg(v0, v1, t0, t1, tEnd);
                total += absMode ? segAbsInt(t0, v0, tEnd, vt) : segSignedInt(t0, v0, tEnd, vt);
                break;
            }
        }
        return total;
    }
    function vAt(points, t) {
        for (var i = 0; i < points.length - 1; i++) {
            var t0 = points[i].t, v0 = points[i].v, t1 = points[i + 1].t, v1 = points[i + 1].v;
            if (t >= t0 && t <= t1) return vAtSeg(v0, v1, t0, t1, t);
        }
        return points[points.length - 1].v;
    }
    // Exakt spann för bilens läge s(t) över hela 0–10 s (extrempunkter
    // ligger alltid vid en knut eller en nollgenomgång).
    function roadBounds(points) {
        var segs = segments(points);
        var times = [0];
        for (var i = 0; i < segs.length; i++) times.push(segs[i].t1);
        var mn = 0, mx = 0;
        for (var j = 0; j < times.length; j++) {
            var sv = integrate(points, times[j], false);
            if (sv < mn) mn = sv;
            if (sv > mx) mx = sv;
        }
        return { min: mn, max: mx };
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { step: 1, v: DEFAULT_V.slice(), tPlay: 0, playing: false, dir: 1 };
        var animId = null, animLastTs = null;
        var ANIM_MS = 6000;

        function pts() {
            var arr = [];
            for (var i = 0; i < T_KNOTS.length; i++) arr.push({ t: T_KNOTS[i], v: state.v[i] });
            return arr;
        }

        // ── Geometri: huvudplot (v–t-grafen) ────────────────────────────
        var W = 560, H = 380, L = 46, R = 28, T = 16, B = 24;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -0.6, XMAX = 10.6, YMIN = -8, YMAX = 12;
        function X(t) { return L + (t - XMIN) / (XMAX - XMIN) * PW; }
        function Y(v) { return T + (YMAX - v) / (YMAX - YMIN) * PH; }

        // ── Geometri: vägen ──────────────────────────────────────────────
        var H2 = 140, L2 = 40, R2 = 40;
        var PW2 = W - L2 - R2, roadY = 64;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Integralen som resemätare';
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
            viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf: bilens hastighet v som funktion av tiden t, ' +
                'formad av sex dragbara punkter. Arean under kurvan skuggas grön där ' +
                'hastigheten är positiv och röd där den är negativ. En tidsmarkör kan ' +
                'dras längs tidsaxeln.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var infoBox = document.createElement('div');
        infoBox.style.cssText = 'text-align:center;margin-top:8px;line-height:1.7';
        var posLine = document.createElement('div');
        posLine.style.cssText = 'font-size:14.5px;color:var(--lab-ink)';
        var odoLine = document.createElement('div');
        odoLine.style.cssText = 'font-size:13px;color:var(--lab-ink-soft)';
        var diffLine = document.createElement('div');
        diffLine.style.cssText = 'font-size:12.5px;color:var(--lab-accent);margin-top:2px;max-width:56ch;margin-left:auto;margin-right:auto';
        infoBox.appendChild(posLine);
        infoBox.appendChild(odoLine);
        infoBox.appendChild(diffLine);
        card.appendChild(infoBox);

        var enhetsNote = document.createElement('div');
        enhetsNote.style.cssText = 'text-align:center;font-size:12.5px;font-style:italic;color:var(--lab-ink-soft);margin-top:4px';
        card.appendChild(enhetsNote);

        var formelRow = document.createElement('div');
        formelRow.className = 'lab-vis-formel';
        card.appendChild(formelRow);

        var missionNote = document.createElement('div');
        missionNote.className = 'lab-vis-note';
        card.appendChild(missionNote);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        scene2.style.maxWidth = '560px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2, width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Vägen: en bil som kör längs en rak väg, synkad med tidsmarkören ' +
                'i grafen ovanför. Bilens läge visar det aktuella värdet av integralen.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

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
            { n: 1, label: '1 · Kör!' },
            { n: 2, label: '2 · Backa' },
            { n: 3, label: '3 · Uppdraget' }
        ];
        var INSTR = {
            1: 'Grafen visar bilens hastighet <em>v</em>(<em>t</em>) under 10 sekunder — ' +
               'kurvan formas av sex punkter du kan dra i (eller styra med reglagen ' +
               'nedanför). Gissa först: hur långt tror du bilen kommer på 10 s med den ' +
               'här kurvan? Tryck sedan på Kör, eller dra tidsmarkören själv i grafen — ' +
               'arean under kurvan är sträckan.',
            2: 'Dra ner några punkter under nollinjen. Då blir hastigheten negativ och ' +
               'bilen backar — den röda arean räknas som negativ sträcka. Kör igen och ' +
               'jämför bilens läge <em>s</em> med hur långt den faktiskt har kört.',
            3: 'Uppdrag: forma kurvan så att bilen är tillbaka vid startpunkten efter ' +
               '10 s — fast den har kört hela tiden. Det betyder att integralen ska bli ' +
               '0: lika stor grön som röd area. Kör (eller dra tidsmarkören till slutet) ' +
               'för att testa.'
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
        legend.appendChild(legendItem(COL.pos, '<em>v</em> &gt; 0 (framåt)'));
        legend.appendChild(legendItem(COL.neg, '<em>v</em> &lt; 0 (bakåt)'));

        // ── Play / Börja om ───────────────────────────────────────────────
        function pausePlay() {
            state.playing = false;
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            animLastTs = null;
            playBtn.textContent = 'Kör!';
        }
        function stepAnim(ts) {
            if (animLastTs == null) animLastTs = ts;
            var dt = (ts - animLastTs) / 1000;
            animLastTs = ts;
            state.tPlay = clampNum(state.tPlay + dt * (10 / (ANIM_MS / 1000)), 0, 10);
            tRow.sync();
            update();
            if (state.tPlay < 10 - 1e-6 && state.playing) {
                animId = requestAnimationFrame(stepAnim);
            } else {
                state.tPlay = 10;
                tRow.sync();
                pausePlay();
                update();
            }
        }
        function startPlay() {
            if (state.tPlay >= 10 - 1e-6) { state.tPlay = 0; tRow.sync(); }
            state.playing = true;
            animLastTs = null;
            playBtn.textContent = 'Pausa';
            animId = requestAnimationFrame(stepAnim);
        }
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'lab-btn';
        playBtn.textContent = 'Kör!';
        playBtn.addEventListener('click', function () { state.playing ? pausePlay() : startPlay(); });
        actions.appendChild(playBtn);

        var restartBtn = document.createElement('button');
        restartBtn.type = 'button';
        restartBtn.className = 'lab-graf-reset';
        restartBtn.textContent = 'Börja om';
        restartBtn.addEventListener('click', function () {
            pausePlay();
            state.tPlay = 0;
            tRow.sync();
            update();
        });
        actions.appendChild(restartBtn);

        // ── Reglage: v₁…v₆ och tidsmarkören t ────────────────────────────
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
                slider.style.background = 'linear-gradient(to right, ' + COL.neg + ' 0%, ' +
                    COL.neg + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                pausePlay();
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
        var SUBS = ['₁', '₂', '₃', '₄', '₅', '₆'];
        var vRows = [];
        for (var vi = 0; vi < 6; vi++) {
            (function (idx) {
                vRows.push(makeRow('v' + SUBS[idx], V_MIN, V_MAX, V_STEP,
                    function () { return state.v[idx]; },
                    function (val) { state.v[idx] = clampNum(roundHalf(val), V_MIN, V_MAX); }));
            })(vi);
        }
        var tRow = makeRow('t', 0, 10, 0.1,
            function () { return state.tPlay; },
            function (val) { state.tPlay = clampNum(val, 0, 10); });

        // ── Återställ (allt: kurvform + tidsmarkör) ─────────────────────
        var resetAllBtn = document.createElement('button');
        resetAllBtn.type = 'button';
        resetAllBtn.className = 'lab-graf-reset';
        resetAllBtn.textContent = 'Återställ';
        resetAllBtn.addEventListener('click', function () {
            pausePlay();
            state.v = DEFAULT_V.slice();
            state.tPlay = 0;
            state.dir = 1;
            vRows.forEach(function (r) { r.sync(); });
            tRow.sync();
            update();
        });
        foot.appendChild(resetAllBtn);

        // ── Dragning i grafen (punkter + tidsmarkör) ────────────────────
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
        var dragging = null;   // 0..5 (punkt) | 'T' (tidsmarkör) | null
        svg.addEventListener('pointermove', function (e) {
            if (dragging === null) return;
            if (dragging === 'T') {
                var t = clampNum(Math.round(toWorldX(e.clientX) * 10) / 10, 0, 10);
                state.tPlay = t;
                tRow.sync();
            } else {
                var v = clampNum(roundHalf(toWorldY(e.clientY)), V_MIN, V_MAX);
                state.v[dragging] = v;
                vRows[dragging].sync();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita huvudgrafen ─────────────────────────────────────────────
        var clipId = 'lab-vis-clip-' + (uid++);
        var V_TICKS = [-8, -4, 0, 4, 8, 12];
        var V_GRID = [-8, -4, 4, 8, 12];
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var points = pts();
            var axisY = Y(0), axisX = X(0);

            [2, 4, 6, 8].forEach(function (t) {
                svg.appendChild(svgEl('line', { x1: X(t), y1: T, x2: X(t), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
            });
            V_GRID.forEach(function (v) {
                svg.appendChild(svgEl('line', { x1: L, y1: Y(v), x2: L + PW, y2: Y(v), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // Axlar med pilspetsar
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: T + PH, x2: axisX, y2: 22, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',12 ' + (axisX - 4.5) + ',22 ' + (axisX + 4.5) + ',22', fill: COL.axis }));
            svg.appendChild(svgVarText({ x: W - 4, y: axisY + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis }, ['*t', ' (s)']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: 14, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis }, ['*v', ' (m/s)']));

            // Tick-etiketter
            T_KNOTS.forEach(function (t) {
                svg.appendChild(svgVarText({ x: X(t), y: axisY + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, [String(t)]));
            });
            V_TICKS.forEach(function (v) {
                svg.appendChild(svgVarText({ x: axisX - 6, y: Y(v) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, [fmtTick(v)]));
            });

            // Klippram
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Skuggad area (grön/röd) fram till tidsmarkören
            clippedSegs(points, state.tPlay).forEach(function (s) {
                var x0 = X(s.t0), x1 = X(s.t1), y0 = Y(s.v0), y1 = Y(s.v1);
                var poly = x0 + ',' + axisY + ' ' + x0 + ',' + y0 + ' ' + x1 + ',' + y1 + ' ' + x1 + ',' + axisY;
                g.appendChild(svgEl('polygon', { points: poly, fill: s.sign > 0 ? COL.posFill : COL.negFill }));
            });

            // Kurvan v(t), färgad efter tecken
            segments(points).forEach(function (s) {
                g.appendChild(svgEl('line', {
                    x1: X(s.t0), y1: Y(s.v0), x2: X(s.t1), y2: Y(s.v1),
                    stroke: s.sign > 0 ? COL.pos : COL.neg, 'stroke-width': 2.4, 'stroke-linecap': 'round'
                }));
            });

            // Tidsmarkör (dragbar över hela höjden)
            var mx = X(state.tPlay);
            g.appendChild(svgEl('line', { x1: mx, y1: T, x2: mx, y2: T + PH, stroke: COL.marker, 'stroke-width': 1.8, 'stroke-dasharray': '6 4' }));
            svg.appendChild(svgEl('circle', { cx: mx, cy: axisY, r: 5, fill: COL.marker }));
            var hitT = svgEl('rect', { x: mx - 10, y: T, width: 20, height: PH, fill: 'rgba(0,0,0,0)' });
            hitT.style.cursor = 'ew-resize';
            hitT.addEventListener('pointerdown', function (e) {
                pausePlay(); dragging = 'T';
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            svg.appendChild(hitT);

            // Dragbara punkter
            T_KNOTS.forEach(function (t, idx) {
                var v = state.v[idx];
                var px = X(t), py = Y(v);
                var col = v >= 0 ? COL.pos : COL.neg;
                svg.appendChild(svgEl('circle', { cx: px, cy: py, r: 4.5, fill: col }));
                var hit = svgEl('circle', { cx: px, cy: py, r: 16, fill: 'rgba(0,0,0,0)' });
                hit.style.cursor = 'grab';
                hit.addEventListener('pointerdown', function (e) {
                    pausePlay(); dragging = idx;
                    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                    e.preventDefault();
                });
                svg.appendChild(hit);
            });
        }

        // ── Rita vägen + bilen ───────────────────────────────────────────
        function drawCar(root, cx, cy, dir) {
            var g = svgEl('g', { transform: 'translate(' + cx.toFixed(1) + ',' + cy.toFixed(1) + ') scale(' + dir + ',1)' });
            g.appendChild(svgEl('circle', { cx: -10, cy: -6.5, r: 6.5, fill: COL.wheel }));
            g.appendChild(svgEl('circle', { cx: 10, cy: -6.5, r: 6.5, fill: COL.wheel }));
            g.appendChild(svgEl('circle', { cx: -10, cy: -6.5, r: 2.3, fill: COL.hub }));
            g.appendChild(svgEl('circle', { cx: 10, cy: -6.5, r: 2.3, fill: COL.hub }));
            g.appendChild(svgEl('rect', { x: -17, y: -17, width: 34, height: 11.5, rx: 3, ry: 3, fill: COL.car }));
            g.appendChild(svgEl('path', { d: 'M -6,-17 L -2,-27 L 9,-27 L 14,-17 Z', fill: COL.car }));
            g.appendChild(svgEl('path', { d: 'M -3,-18 L 0,-25 L 7,-25 L 11,-18 Z', fill: COL.window }));
            g.appendChild(svgEl('circle', { cx: 16.5, cy: -9, r: 1.6, fill: COL.headlight }));
            g.appendChild(svgEl('circle', { cx: -16.5, cy: -9, r: 1.4, fill: COL.neg }));
            root.appendChild(g);
        }
        function drawRoad() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var points = pts();
            var b = roadBounds(points);
            var bmin = Math.min(0, b.min) - 4, bmax = Math.max(0, b.max) + 4;
            if (bmax - bmin < 20) { var mid = (bmin + bmax) / 2; bmin = mid - 10; bmax = mid + 10; }
            function PX(s) { return L2 + (s - bmin) / (bmax - bmin) * PW2; }

            svg2.appendChild(svgEl('line', { x1: L2, y1: roadY, x2: L2 + PW2, y2: roadY, stroke: COL.axis, 'stroke-width': 2 }));

            var m0 = Math.ceil(bmin / 10) * 10;
            for (var m = m0; m <= bmax + 1e-6; m += 10) {
                var x = PX(m);
                if (Math.abs(m) < 1e-6) {
                    svg2.appendChild(svgEl('line', { x1: x, y1: roadY, x2: x, y2: roadY - 24, stroke: COL.marker, 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }));
                    svg2.appendChild(svgVarText({ x: x, y: roadY - 28, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.axis }, ['Start']));
                } else {
                    svg2.appendChild(svgEl('line', { x1: x, y1: roadY - 5, x2: x, y2: roadY + 5, stroke: COL.tick, 'stroke-width': 1.4 }));
                }
                svg2.appendChild(svgVarText({ x: x, y: roadY + 19, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [fmtTick(m)]));
            }
            svg2.appendChild(svgVarText({ x: L2 + PW2 + R2 - 6, y: roadY - 8, 'font-size': 12, 'text-anchor': 'end', fill: COL.axis }, ['*s', ' (m)']));

            var vNow = vAt(points, state.tPlay);
            if (vNow > 0.05) state.dir = 1;
            else if (vNow < -0.05) state.dir = -1;
            var sNow = integrate(points, state.tPlay, false);
            drawCar(svg2, PX(sNow), roadY, state.dir);
        }

        // ── Live-avläsningar, formel och uppdrag ────────────────────────
        function updateInfo() {
            var points = pts();
            var revealed = state.tPlay > 1e-6;
            var posVal = integrate(points, state.tPlay, false);
            var odoVal = integrate(points, state.tPlay, true);

            posLine.style.display = revealed ? '' : 'none';
            posLine.innerHTML = 'Bilens läge: <em>s</em> = ' + fmtDisp(posVal, 1) + ' m';

            var showOdo = revealed && state.step >= 2;
            odoLine.style.display = showOdo ? '' : 'none';
            if (showOdo) odoLine.textContent = 'Vägmätaren i bilen: ' + fmt(odoVal, 1) + ' m (total körsträcka)';

            var showDiff = showOdo && Math.abs(odoVal - Math.abs(posVal)) > 0.05;
            diffLine.style.display = showDiff ? '' : 'none';
            if (showDiff) {
                diffLine.textContent = 'Skillnaden: läget räknar med tecken (framåt minus bakåt), medan ' +
                    'vägmätaren räknar all körd sträcka — oavsett riktning.';
            }

            enhetsNote.style.display = revealed ? '' : 'none';
            if (revealed) enhetsNote.textContent = 'Enheterna multipliceras: m/s · s = m — arean under grafen är därför en sträcka.';

            var showMission = state.step === 3;
            formelRow.style.display = showMission ? '' : 'none';
            missionNote.style.display = showMission ? '' : 'none';
            if (showMission) {
                var fullS = integrate(points, 10, false);
                katexInto(formelRow, 's = \\int_0^{10} v(t)\\,dt = ' + fmtTex(fullS, 1) + '\\ \\mathrm{m}');
                if (state.tPlay >= 9.95) {
                    if (Math.abs(fullS) < 2) {
                        var fsTxt = fmt(fullS, 1);
                        missionNote.style.color = '#2f8f4e';
                        missionNote.innerHTML = 'Träff! Integralen är ' + fsTxt + ' m' + (fsTxt === '0' ? '' : ' ≈ 0') +
                            ' — bilen är tillbaka vid startpunkten. Ändå visar vägmätaren att den kört ' +
                            fmt(integrate(points, 10, true), 1) + ' m totalt.';
                    } else {
                        missionNote.style.color = '';
                        missionNote.textContent = 'Ännu inte: s = ' + fmtDisp(fullS, 1) + ' m. Justera kurvan så att den ' +
                            'gröna och röda arean tar ut varandra.';
                    }
                } else {
                    missionNote.style.color = '';
                    missionNote.textContent = 'Kör bilen till slutet (eller dra tidsmarkören till t = 10 s) för att testa om du lyckats.';
                }
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            drawMain();
            drawRoad();
            updateInfo();
        }

        update();

        return {
            destroy: function () {
                pausePlay();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-5.7'] = api;
    window.VISUALISERINGAR['ma4-3.5'] = api;
})();
