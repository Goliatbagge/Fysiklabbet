/* ma4-4.10.js — visualisering: "Eulers formel — den vinkelräta hastigheten".
 * Hör till ma4-4.10 (Eulers formel och talet e^z).
 *
 * Kärninsikt: varför hamnar e^{iv} på enhetscirkeln? Derivatan av e^{iv}
 * med avseende på v är i·e^{iv} — en multiplikation med i, som bara vrider
 * 90° utan att skala. Positionens "puff" (hastighet) är alltså ALLTID
 * vinkelrät mot positionen, och en vinkelrät puff ändrar aldrig avståndet
 * till origo (precis som månens bana runt jorden) — därför blir banan en
 * cirkel, och e^{iv} = cos v + i sin v blir synligt självklart.
 *
 * Tre steg (lager), alla kring samma delade vinkel v (0–360°):
 *   1. Positionen och puffen — dra punkten/glidaren runt enhetscirkeln.
 *      Blå visare = positionen e^{iv}, röd pil = hastigheten i·e^{iv},
 *      fäst i punkten, vinkelrät mot visaren, samma längd (rät-vinkel-
 *      markering mellan dem). Gissa-först i instruktionstexten.
 *   2. Två tillväxtregler, två öden — "Släpp två partiklar": båda startar
 *      i talet 1 och lyder "hastighet = (något)·position", men med olika
 *      riktning på puffen. Partikel A (orange, hastighet = position)
 *      rusar rakt ut längs reella axeln som e^v. Partikel B (röd,
 *      hastighet = i·position) går runt enhetscirkeln som e^{iv}. Samma
 *      delade v-vinkel animeras 0→360° över ~4 s (rAF).
 *   3. Formeln och pärlorna — specialvärdesknappar v = π/2, π (Eulers
 *      identitet, highlightad), 2π. Live-KaTeX visar respektive likhet
 *      exakt som genomgången skriver dem, plus en utblick mot
 *      e^{a+bi} = e^a·e^{bi} som knyter ihop steg 2:s två öden (realdelen
 *      skalar som partikel A, imaginärdelen vrider som partikel B).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-6.2.js / ma4-4.5.js / graf.js).
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
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function fmtSmart(v) { var av = Math.abs(v); var d = av >= 100 ? 0 : (av >= 10 ? 1 : 2); return fmt(v, d); }
    function fmtTexSmart(v) { return fmtSmart(v).replace(',', '{,}'); }
    // '=' om värdet är exakt (till given decimal), annars '\approx'.
    function chooseEq(value, decimals) {
        var scale = Math.pow(10, decimals);
        var rounded = Math.round(value * scale) / scale;
        return Math.abs(value - rounded) < 1e-6 ? '=' : '\\approx';
    }

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
        unit: 'rgba(31,37,48,0.22)',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)',
        pos: '#1d4ed8',       // positionsvisaren e^{iv} — blå
        vel: '#c8324a',       // hastigheten i·e^{iv} (= partikel B) — röd
        partA: '#b5561f'      // partikel A (reell tillväxt e^v) — orange/brun
    };

    // Standardvinklar (samma tabell som ma3c-6.2/ma4-1.x — π-snap-punkter).
    var DEG_FRAC = {
        0: '0', 30: '\\dfrac{\\pi}{6}', 45: '\\dfrac{\\pi}{4}', 60: '\\dfrac{\\pi}{3}',
        90: '\\dfrac{\\pi}{2}', 120: '\\dfrac{2\\pi}{3}', 135: '\\dfrac{3\\pi}{4}',
        150: '\\dfrac{5\\pi}{6}', 180: '\\pi', 210: '\\dfrac{7\\pi}{6}',
        225: '\\dfrac{5\\pi}{4}', 240: '\\dfrac{4\\pi}{3}', 270: '\\dfrac{3\\pi}{2}',
        300: '\\dfrac{5\\pi}{3}', 315: '\\dfrac{7\\pi}{4}', 330: '\\dfrac{11\\pi}{6}',
        360: '2\\pi'
    };
    var SNAP_DEG = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    function snapDeg(deg) {
        for (var i = 0; i < SNAP_DEG.length; i++) {
            if (Math.abs(deg - SNAP_DEG[i]) <= 4) return SNAP_DEG[i];
        }
        return deg;
    }
    // v = π/2 → "i", v = π → "−1" osv. (exakta pärlor för förenklingssteget).
    function simplifyLabel(vDeg) {
        if (vDeg === 0 || vDeg === 360) return '1';
        if (vDeg === 90) return 'i';
        if (vDeg === 180) return '-1';
        if (vDeg === 270) return '-i';
        return null;
    }
    // "cos v + i sin v" med aktuella tal, i genomgångens substitutionsstil
    // ("0 + i·1", "-1 + 0" — nollterm tappar i-prefixet, se ma4-4.10.md).
    function complexTermTex(re, im) {
        var reStr = fmtTex(re, 2);
        var imIsZero = (fmt(im, 2) === '0');
        if (imIsZero) return reStr + ' + 0';
        var imAbsStr = fmtTex(Math.abs(im), 2);
        return reStr + (im < 0 ? ' - i\\cdot ' : ' + i\\cdot ') + imAbsStr;
    }

    // ── Geometrihjälpare (rena pixel-funktioner, y neråt) ─────────────────
    function polarPt(cx, cy, rad, angRad) {
        return { x: cx + rad * Math.cos(angRad), y: cy - rad * Math.sin(angRad) };
    }
    // Bågen 0 → v (v i radianer, 0..2π), alltid moturs (ökande vinkel).
    // Hanterar v nära 2π som en full cirkel (två halvbågar — annars blir
    // start- och slutpunkt identiska och SVG-bågen degenererar).
    function angleArcD(cx, cy, rad, v) {
        var vv = v % (2 * Math.PI);
        if (vv < 0) vv += 2 * Math.PI;
        if (vv < 1e-6) return '';
        var p0 = polarPt(cx, cy, rad, 0);
        if (vv > 2 * Math.PI - 1e-4) {
            var pmid = polarPt(cx, cy, rad, Math.PI);
            return 'M' + p0.x.toFixed(2) + ' ' + p0.y.toFixed(2) +
                ' A' + rad + ' ' + rad + ' 0 1 0 ' + pmid.x.toFixed(2) + ' ' + pmid.y.toFixed(2) +
                ' A' + rad + ' ' + rad + ' 0 1 0 ' + p0.x.toFixed(2) + ' ' + p0.y.toFixed(2);
        }
        var p1 = polarPt(cx, cy, rad, vv);
        var largeArc = vv > Math.PI ? 1 : 0;
        return 'M' + p0.x.toFixed(2) + ' ' + p0.y.toFixed(2) +
            ' A' + rad + ' ' + rad + ' 0 ' + largeArc + ' 0 ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2);
    }
    // Pil från (x0,y0) till (x1,y1) — skaftet slutar vid huvudets bas.
    function drawVec(parent, x0, y0, x1, y1, color, width) {
        var dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
        if (len < 1e-3) return { tipX: x1, tipY: y1, ux: 1, uy: 0, len: 0 };
        var ux = dx / len, uy = dy / len;
        var headLen = clampNum(len * 0.22, 8, 14);
        var headW = headLen * 0.62;
        var baseX = x1 - ux * headLen, baseY = y1 - uy * headLen;
        var sw = width || 2.2;
        parent.appendChild(svgEl('line', {
            x1: x0.toFixed(1), y1: y0.toFixed(1), x2: baseX.toFixed(1), y2: baseY.toFixed(1),
            stroke: color, 'stroke-width': sw, 'stroke-linecap': 'butt'
        }));
        var nx = -uy, ny = ux;
        var h1x = baseX + nx * headW / 2, h1y = baseY + ny * headW / 2;
        var h2x = baseX - nx * headW / 2, h2y = baseY - ny * headW / 2;
        parent.appendChild(svgEl('polygon', {
            points: x1.toFixed(1) + ',' + y1.toFixed(1) + ' ' + h1x.toFixed(1) + ',' + h1y.toFixed(1) + ' ' + h2x.toFixed(1) + ',' + h2y.toFixed(1),
            fill: color
        }));
        return { tipX: x1, tipY: y1, ux: ux, uy: uy, len: len };
    }
    function nearAny(list, val, eps) {
        for (var i = 0; i < list.length; i++) if (Math.abs(list[i] - val) < eps) return true;
        return false;
    }

    function mount(el) {
        // ── Geometri (kvadratiskt rutnät) ────────────────────────────────
        var W = 560, H = 560, L = 42, R = 26, T = 26, B = 42;
        var PW = W - L - R, PH = H - T - B;
        var XMIN = -2, XMAX = 2, YMIN = -2, YMAX = 2;
        function X(re) { return L + (re - XMIN) / (XMAX - XMIN) * PW; }
        function Y(im) { return T + (YMAX - im) / (YMAX - YMIN) * PH; }
        var UNIT_PX = PW / (XMAX - XMIN);
        var axisX = X(0), axisY = Y(0);
        var SMALL_R = 40;      // liten vinkelbåge nära origo (v-etikett)
        var EDGE = XMAX - 0.15; // var partikel A klipps/markeras som "flytt"

        // "e^{iv}" / "i·e^{iv}" / "e^v" som riktig SVG-superscript (kursiv,
        // ingen Unicode-superscript — se CLAUDE.md om exponenter).
        function expLabel(info, color, offset, withIDot, supText) {
            if (!info || info.len < 4) return;
            offset = offset == null ? 16 : offset;
            var lx = info.tipX + info.ux * offset;
            var ly = info.tipY + info.uy * offset;
            var anchor = info.ux > 0.2 ? 'start' : (info.ux < -0.2 ? 'end' : 'middle');
            ly += info.uy < -0.3 ? -2 : (info.uy > 0.3 ? 9 : 4);
            var elx = svgEl('text', { x: lx.toFixed(1), y: ly.toFixed(1), 'font-size': 13.5, 'text-anchor': anchor, fill: color });
            if (withIDot) {
                var ti = svgEl('tspan', { 'font-style': 'italic' }); ti.textContent = 'i'; elx.appendChild(ti);
                var td = svgEl('tspan', {}); td.textContent = '·'; elx.appendChild(td);
            }
            var te = svgEl('tspan', { 'font-style': 'italic' }); te.textContent = 'e'; elx.appendChild(te);
            var tsup = svgEl('tspan', { 'font-size': '9.5', dy: '-5.5', 'font-style': 'italic' }); tsup.textContent = supText; elx.appendChild(tsup);
            svg.appendChild(elx);
        }

        // ── Tillstånd (delad vinkel v i grader, 0–360) ────────────────────
        var state = { vDeg: 45, step: 1 };
        var animId = null;
        function stopAnim() { if (animId != null) { cancelAnimationFrame(animId); animId = null; } }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Eulers formel — den vinkelräta hastigheten';
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
            'aria-label': 'Interaktivt komplext talplan med en punkt på enhetscirkeln vid ' +
                'vinkeln v. Steg 1 och 3 visar positionsvisaren e upphöjt till iv (blå) och ' +
                'den vinkelräta hastighetspilen i gånger e upphöjt till iv (röd), fäst i ' +
                'punkten. Steg 2 visar två partiklar som båda startar i talet 1: partikel A ' +
                'med hastighet lika med positionen, som rusar rakt ut längs reella axeln, och ' +
                'partikel B med hastighet vinkelrät mot positionen, som går runt enhetscirkeln.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelV = document.createElement('div'); formelV.className = 'lab-vis-formel'; formelV.style.color = COL.axis; card.appendChild(formelV);
        var formelPos = document.createElement('div'); formelPos.className = 'lab-vis-formel'; formelPos.style.color = COL.pos; card.appendChild(formelPos);
        var formelVel = document.createElement('div'); formelVel.className = 'lab-vis-formel'; formelVel.style.color = COL.vel; card.appendChild(formelVel);
        var formelRaceA = document.createElement('div'); formelRaceA.className = 'lab-vis-formel'; formelRaceA.style.color = COL.partA; card.appendChild(formelRaceA);
        var formelRaceB = document.createElement('div'); formelRaceB.className = 'lab-vis-formel'; formelRaceB.style.color = COL.vel; card.appendChild(formelRaceB);

        var identityBox = document.createElement('div');
        identityBox.style.margin = '8px 0 4px';
        identityBox.style.padding = '8px 12px';
        identityBox.style.borderLeft = '3px solid ' + COL.vel;
        identityBox.style.background = 'rgba(200,50,74,0.07)';
        identityBox.style.borderRadius = '4px';
        card.appendChild(identityBox);
        var identityFormula = document.createElement('div');
        identityFormula.className = 'lab-vis-formel';
        identityFormula.style.color = COL.vel;
        identityFormula.style.margin = '0 0 4px 0';
        identityBox.appendChild(identityFormula);
        var identityCaption = document.createElement('div');
        identityCaption.style.fontSize = '13px';
        identityCaption.style.lineHeight = '1.4';
        identityBox.appendChild(identityCaption);

        var outlookBox = document.createElement('div');
        outlookBox.style.margin = '4px 0';
        card.appendChild(outlookBox);
        var outlookFormula = document.createElement('div');
        outlookFormula.className = 'lab-vis-formel';
        outlookFormula.style.color = COL.axis;
        outlookBox.appendChild(outlookFormula);
        var outlookCaption = document.createElement('div');
        outlookCaption.className = 'lab-vis-note';
        outlookBox.appendChild(outlookCaption);

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

        // ── Etikett-byggstenar för HTML-text (löptext, inte KaTeX/SVG) ────
        var EIV_HTML = '<em>e</em><sup><em>i</em><em>v</em></sup>';
        var IEIV_HTML = '<em>i</em>·' + EIV_HTML;
        var EV_HTML = '<em>e</em><sup><em>v</em></sup>';

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Positionen och puffen' },
            { n: 2, label: '2 · Två tillväxtregler, två öden' },
            { n: 3, label: '3 · Formeln och pärlorna' }
        ];
        var INSTR = {
            1: 'Dra punkten (eller <em>v</em>-glidaren) runt enhetscirkeln. Den blå visaren ' +
               'är positionen ' + EIV_HTML + ', den röda pilen är hastigheten ' + IEIV_HTML +
               ' — fäst i punkten, alltid vinkelrät mot visaren och lika lång som den. ' +
               'Gissa först: om hastigheten alltid puffar rätvinkligt mot positionen, vilken ' +
               'sorts bana tvingar det fram?',
            2: 'Tryck på "Släpp två partiklar". Båda startar i talet 1 och lyder samma sorts ' +
               'regel — hastighet = (något) gånger position — bara riktningen på puffen ' +
               'skiljer. Partikel A (orange) puffas rakt ut (hastighet = position) och rusar ' +
               'längs reella axeln som ' + EV_HTML + '. Partikel B (röd) puffas vinkelrätt ' +
               '(hastighet = <em>i</em>·position) och går runt enhetscirkeln som ' + EIV_HTML +
               '. Se hur snabbt A försvinner medan B lugnt fullbordar sitt varv.',
            3: 'Tryck på ett specialvärde och se ' + EIV_HTML + ' landa exakt på en av ' +
               '"pärlorna". Vid <em>v</em> = π hamnar visaren i −1 — Eulers identitet, ofta ' +
               'kallad "världens vackraste ekvation". Du kan förstås fortsätta dra glidaren ' +
               'mellan pärlorna också.'
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
        var legPos = legendItem(COL.pos, 'position ' + EIV_HTML);
        var legVel = legendItem(COL.vel, 'hastighet ' + IEIV_HTML);
        var legA = legendItem(COL.partA, '<em>z</em><sub>A</sub> = ' + EV_HTML);
        var legB = legendItem(COL.vel, '<em>z</em><sub>B</sub> = ' + EIV_HTML);

        // ── Knappar i actions-raden ──────────────────────────────────────
        var raceBtn = document.createElement('button');
        raceBtn.type = 'button';
        raceBtn.className = 'lab-btn';
        raceBtn.textContent = 'Släpp två partiklar';
        raceBtn.addEventListener('click', function () { startSweep(); });
        actions.appendChild(raceBtn);

        function specialBtn(text, deg) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = text;
            b.addEventListener('click', function () {
                stopAnim(); state.vDeg = deg; rowV.sync(); update();
            });
            actions.appendChild(b);
            return b;
        }
        var btnHalfPi = specialBtn('v = π/2', 90);
        var btnPi = specialBtn('v = π (Eulers identitet)', 180);
        var btnTwoPi = specialBtn('v = 2π', 360);

        // ── Glidare (v i grader, med π-snap) ──────────────────────────────
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
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.pos + ' 0%, ' +
                    COL.pos + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                stopAnim();
                set(clampNum(v, min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = String(get());
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () { field.value = String(get()); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return { sync: function () { slider.value = get(); field.value = String(get()); paint(); } };
        }
        var rowV = makeRow('v (grader)', 0, 360, 1,
            function () { return state.vDeg; },
            function (v) { state.vDeg = Math.round(snapDeg(v)); });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.vDeg = 45; state.step = 1;
            rowV.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Animation: "Släpp två partiklar" — v svep 0 → 360° ────────────
        function startSweep() {
            stopAnim();
            var T_MS = 4000, t0 = null;
            state.vDeg = 0; rowV.sync(); update();
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                state.vDeg = Math.round(p * 360);
                rowV.sync();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Dragbar punkt på cirkeln (steg 1 och 3) ───────────────────────
        var dragging = false;
        function toAngleDeg(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            var dx = px - axisX, dy = axisY - py;
            var deg = Math.atan2(dy, dx) * 180 / Math.PI;
            if (deg < 0) deg += 360;
            return deg;
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var deg = snapDeg(toAngleDeg(e.clientX, e.clientY));
            state.vDeg = clampNum(Math.round(deg), 0, 360);
            rowV.sync();
            update();
        });
        function endDrag() { dragging = false; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        // ── Rita: positionen + hastigheten (steg 1 och 3 delar denna) ─────
        function drawVectorScene(g, isStep3) {
            var vDeg = state.vDeg, vRad = vDeg * Math.PI / 180;
            var a = Math.cos(vRad), b = Math.sin(vRad);

            // Liten vinkelbåge + v-etikett nära origo (0 < v ≤ 180°, annars
            // clutter — samma tröskel som ma3c-6.2).
            if (vDeg > 6 && vDeg <= 180) {
                var dSmall = angleArcD(axisX, axisY, SMALL_R, vRad);
                g.appendChild(svgEl('path', { d: dSmall, fill: 'none', stroke: COL.axis, 'stroke-width': 1.3 }));
                var bisRad = vRad / 2;
                if (Math.abs(bisRad - Math.PI / 2) < (4 * Math.PI / 180)) bisRad -= 6 * Math.PI / 180;
                var bis = polarPt(axisX, axisY, SMALL_R + 14, bisRad);
                svg.appendChild(svgVarText({ x: bis.x.toFixed(1), y: (bis.y + 4).toFixed(1), 'font-size': 13, 'text-anchor': 'middle', fill: COL.axis }, ['*v']));
            }

            // Positionsvisaren (blå), origo → punkten.
            var infoPos = drawVec(g, axisX, axisY, X(a), Y(b), COL.pos, 2.4);
            expLabel(infoPos, COL.pos, 16, false, 'iv');

            // Hastighetspilen (röd): i·(a+bi) = -b + ai, fäst i punkten.
            var infoVel = drawVec(g, X(a), Y(b), X(a - b), Y(b + a), COL.vel, 2.2);
            expLabel(infoVel, COL.vel, 14, true, 'iv');

            // Rät-vinkel-markering mellan visaren och hastighetspilen.
            var s = 11;
            var backX = X(a) - infoPos.ux * s, backY = Y(b) - infoPos.uy * s;
            var cornerX = backX + infoVel.ux * s, cornerY = backY + infoVel.uy * s;
            var fwdX = X(a) + infoVel.ux * s, fwdY = Y(b) + infoVel.uy * s;
            g.appendChild(svgEl('path', {
                d: 'M' + backX.toFixed(1) + ' ' + backY.toFixed(1) + ' L' + cornerX.toFixed(1) + ' ' + cornerY.toFixed(1) + ' L' + fwdX.toFixed(1) + ' ' + fwdY.toFixed(1),
                fill: 'none', stroke: COL.axis, 'stroke-width': 1.3
            }));

            // "Pärla"-markering vid specialvärden (steg 3).
            if (isStep3 && (vDeg === 90 || vDeg === 180 || vDeg === 360)) {
                g.appendChild(svgEl('circle', { cx: X(a).toFixed(1), cy: Y(b).toFixed(1), r: 10, fill: 'none', stroke: COL.vel, 'stroke-width': 2, 'stroke-dasharray': '2 3' }));
            }

            // Dragbart handtag.
            g.appendChild(svgEl('circle', { cx: X(a).toFixed(1), cy: Y(b).toFixed(1), r: 4.5, fill: COL.pos }));
            var hit = svgEl('circle', { cx: X(a).toFixed(1), cy: Y(b).toFixed(1), r: 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim(); dragging = true;
                try { svg.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
                e.preventDefault();
            });
            g.appendChild(hit);

            return { a: a, b: b };
        }

        // ── Rita: två partiklar (steg 2) ───────────────────────────────────
        function drawRaceScene(g) {
            var vDeg = state.vDeg, vRad = vDeg * Math.PI / 180;
            var cosV = Math.cos(vRad), sinV = Math.sin(vRad);
            var zA = Math.exp(vRad);
            var escaped = zA > EDGE;
            var zAClamped = Math.min(zA, EDGE);

            // Startpunkten (talet 1), delad av båda partiklarna.
            g.appendChild(svgEl('circle', { cx: X(1).toFixed(1), cy: Y(0).toFixed(1), r: 3, fill: COL.axis }));

            // Partikel A: rak, reell tillväxt längs positiva reella axeln.
            var infoA = drawVec(g, X(1), Y(0), X(zAClamped), Y(0), COL.partA, 2.4);
            if (!escaped) {
                expLabel(infoA, COL.partA, 14, false, 'v');
            } else if (vDeg > 0) {
                var infTxt = svgEl('text', { x: (X(EDGE) - 6).toFixed(1), y: (Y(0) - 10).toFixed(1), 'font-size': 13, 'text-anchor': 'end', fill: COL.partA });
                infTxt.textContent = '→ ∞';
                svg.appendChild(infTxt);
            }

            // Partikel B: vinkelrät tillväxt — traceat spår längs enhetscirkeln.
            var dArc = angleArcD(axisX, axisY, UNIT_PX, vRad);
            if (dArc) g.appendChild(svgEl('path', { d: dArc, fill: 'none', stroke: COL.vel, 'stroke-width': 3.2, 'stroke-linecap': 'round' }));
            var bx = X(cosV), by = Y(sinV);
            g.appendChild(svgEl('circle', { cx: bx.toFixed(1), cy: by.toFixed(1), r: 5, fill: COL.vel }));
            if (vDeg > 0) {
                expLabel({ tipX: bx, tipY: by, ux: cosV, uy: -sinV, len: 99 }, COL.vel, 14, false, 'iv');
            }

            return { zA: zA, cosV: cosV, sinV: sinV };
        }

        // ── Rita: delat rutnät/axlar + dispatcha till steg-innehåll ───────
        var clipId = 'ma4-410-clip-' + Math.random().toString(36).slice(2);
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var vDeg = state.vDeg, vRad = vDeg * Math.PI / 180;
            var cosV = Math.cos(vRad), sinV = Math.sin(vRad);

            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: L, y: T, width: PW, height: PH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var g = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(g);

            // Kollisionsundvikande lista för heltalsticks.
            var avoidX = [1], avoidY = [0];
            if (state.step !== 2) {
                avoidX.push(cosV, cosV - sinV);
                avoidY.push(sinV, sinV + cosV);
            } else {
                avoidX.push(cosV, Math.min(Math.exp(vRad), EDGE));
                avoidY.push(sinV);
            }

            var i;
            for (i = -2; i <= 2; i++) {
                if (i === 0) continue;
                g.appendChild(svgEl('line', { x1: X(i), y1: T, x2: X(i), y2: T + PH, stroke: COL.grid, 'stroke-width': 1 }));
                g.appendChild(svgEl('line', { x1: L, y1: Y(i), x2: L + PW, y2: Y(i), stroke: COL.grid, 'stroke-width': 1 }));
            }

            // Enhetscirkeln (svag guide) + origo.
            g.appendChild(svgEl('circle', { cx: axisX, cy: axisY, r: UNIT_PX, fill: 'none', stroke: COL.unit, 'stroke-width': 1, 'stroke-dasharray': '3 4' }));
            g.appendChild(svgEl('circle', { cx: axisX, cy: axisY, r: 2.4, fill: COL.axis }));

            // Axlar med pilspetsar.
            svg.appendChild(svgEl('line', { x1: L, y1: axisY, x2: (L + PW + 6), y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg.appendChild(svgEl('line', { x1: axisX, y1: (T + PH), x2: axisX, y2: (T - 6), stroke: COL.axis, 'stroke-width': 1.6 }));
            svg.appendChild(svgEl('polygon', { points: axisX + ',' + (T - 14) + ' ' + (axisX - 4.5) + ',' + (T - 4) + ' ' + (axisX + 4.5) + ',' + (T - 4), fill: COL.axis }));
            svg.appendChild(svgVarText({ x: (L + PW + 12), y: axisY + 18, 'font-size': 14, 'text-anchor': 'end', fill: COL.axis }, ['*Re']));
            svg.appendChild(svgVarText({ x: axisX + 10, y: T - 4, 'font-size': 14, 'text-anchor': 'start', fill: COL.axis }, ['*Im']));

            for (i = -2; i <= 2; i++) {
                if (i === 0) continue;
                if (!nearAny(avoidX, i, 0.28)) {
                    svg.appendChild(svgVarText({ x: X(i), y: axisY + 15, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [String(i)]));
                }
                if (!nearAny(avoidY, i, 0.28)) {
                    svg.appendChild(svgVarText({ x: axisX - 7, y: Y(i) + 3.5, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick }, [String(i)]));
                }
            }

            if (state.step === 2) drawRaceScene(g);
            else drawVectorScene(g, state.step === 3);
        }

        // ── Formler (KaTeX, live) ─────────────────────────────────────────
        function updateFormulas() {
            formelV.style.display = 'none'; formelPos.style.display = 'none'; formelVel.style.display = 'none';
            formelRaceA.style.display = 'none'; formelRaceB.style.display = 'none';
            identityBox.style.display = 'none'; outlookBox.style.display = 'none';
            note.innerHTML = '';

            var vDeg = state.vDeg, vRad = vDeg * Math.PI / 180;
            var cosV = Math.cos(vRad), sinV = Math.sin(vRad);

            formelV.style.display = '';
            var texV = 'v = ' + vDeg + '^\\circ';
            var frac = DEG_FRAC[vDeg];
            if (frac && vDeg !== 0) texV += ' = ' + frac + '\\text{ rad}';
            texV += ' ' + chooseEq(vRad, 2) + ' ' + fmtTex(vRad, 2) + '\\text{ rad}';
            katexInto(formelV, texV);

            if (state.step === 2) {
                formelRaceA.style.display = '';
                katexInto(formelRaceA, '\\dfrac{dz}{dv} = z \\;\\Rightarrow\\; z_\\text{A}(v) = e^{v} = ' + fmtTexSmart(Math.exp(vRad)));
                formelRaceB.style.display = '';
                katexInto(formelRaceB, '\\dfrac{dz}{dv} = i\\cdot z \\;\\Rightarrow\\; z_\\text{B}(v) = e^{iv} = \\cos v + i\\sin v = ' + complexTermTex(cosV, sinV));
                note.innerHTML = 'Samma regel — bara riktningen på puffen skiljer — därför är ' + EIV_HTML +
                    ' en cirkelrörelse. A far mot oändligheten, B kommer tillbaka till start efter ett varv.';
                return;
            }

            formelPos.style.display = '';
            var simp = simplifyLabel(vDeg);
            var texPos = 'e^{iv} = \\cos v + i\\sin v = ' + complexTermTex(cosV, sinV);
            if (simp) texPos += ' = ' + simp;
            katexInto(formelPos, texPos);

            formelVel.style.display = '';
            katexInto(formelVel, 'i\\cdot e^{iv} = -\\sin v + i\\cos v = ' + complexTermTex(-sinV, cosV));

            if (state.step === 1) {
                note.innerHTML = 'En puff vinkelrät mot rörelseriktningen ändrar aldrig avståndet till origo ' +
                    '— precis som månens bana runt jorden. Därför ligger ' + EIV_HTML +
                    ' alltid kvar på enhetscirkeln, oavsett v.';
            } else { // steg 3
                if (vDeg === 180) {
                    identityBox.style.display = '';
                    katexInto(identityFormula, 'e^{i\\pi} = -1 \\qquad \\text{eller} \\qquad e^{i\\pi} + 1 = 0');
                    identityCaption.textContent = 'Eulers identitet — ofta kallad "världens vackraste ekvation": fem ' +
                        'grundläggande konstanter (0, 1, e, i och π) i ett enda samband.';
                } else if (vDeg === 90) {
                    note.innerHTML = 'Efter ett kvarts varv hamnar visaren rakt upp på den imaginära axeln — vid talet i.';
                } else if (vDeg === 360) {
                    note.innerHTML = 'Ett helt varv senare är visaren tillbaka exakt där den startade, i talet 1.';
                } else {
                    note.innerHTML = 'Prova specialvärdena nedan, eller fortsätt dra glidaren fritt mellan pärlorna.';
                }
                outlookBox.style.display = '';
                katexInto(outlookFormula, 'e^{a+bi} = e^{a}\\cdot e^{bi} = e^{a}(\\cos b + i\\sin b)');
                outlookCaption.textContent = 'Utblick: är exponenten själv komplex delas den upp. Realdelen a skalar ' +
                    'avståndet till origo — precis som partikel A i steg 2 — imaginärdelen b vrider, som partikel B.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            legPos.style.display = state.step !== 2 ? '' : 'none';
            legVel.style.display = state.step !== 2 ? '' : 'none';
            legA.style.display = state.step === 2 ? '' : 'none';
            legB.style.display = state.step === 2 ? '' : 'none';

            raceBtn.style.display = state.step === 2 ? '' : 'none';
            btnHalfPi.style.display = btnPi.style.display = btnTwoPi.style.display = state.step === 3 ? '' : 'none';
            actions.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';

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
    var api = { mount: mount };
    window.VISUALISERINGAR['ma4-4.10'] = api;
})();
