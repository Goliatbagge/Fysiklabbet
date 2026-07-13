/* ma2c-4.7.js — visualisering: "Likformighetens tre exponenter". Hör till
 * ma2c-4.7 (likformiga månghörningar) och ma2c-4.8 (likformiga trianglar).
 *
 * Referenstriangel: en rätvinklig triangel med sidorna 3, 4, 5 (samma
 * triangel som ligger till grund för Exempel 2 i ma2c-4.8, som skalar den
 * med 0,9 respektive 1,5). Skalfaktorn heter *k*, precis som "Skalfaktor"
 * i ma2c-4.7 Exempel 2.
 *
 * VIKTIGT: ma2c-4.7/4.8 tar bara upp skalfaktorn för LÄNGDER (sidled). De
 * nämner aldrig att arean skalar med k² — det är denna moduls egna,
 * fristående utvidgning av samma skalfaktor-resonemang, inte ett citat ur
 * genomgången. Språket ("likformiga", "skalfaktor") återanvänds ändå
 * konsekvent från texten.
 *
 * Fyra steg:
 *   1. Samma form, annan storlek — original (3,4,5) + kopia (3k,4k,5k),
 *      kvoterna 3k/3 = 4k/4 = 5k/5 = k, vinklarna identiska.
 *   2. Areafällan — vid heltals-k (2 eller 3): fyll den stora triangeln
 *      med k² kopior av den lilla. Area-skalan = k².
 *   3. Tre exponenter — stapelmätare + graf: längd ~ k, area ~ k²,
 *      volym ~ k³.
 *   4. Använd likformigheten — Exempel 3 i ma2c-4.8 (Alva och
 *      flaggstången), interaktiv med "Visa lösningen".
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3.js / graf.js).
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
    function katexInto(div, tex, display) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: !!display }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        axis: '#1f2530',
        tick: '#5b6472',
        grid: 'rgba(31,37,48,0.08)',
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.16)',
        a: '#2563c9',          // sida a (kateten 3) — blå
        b: '#4a7d3a',          // sida b (kateten 4) — grön
        c: '#b5642f',          // hypotenusan c (5) — ockra
        area: '#c8324a',       // area / k² — röd
        vol: '#7a4fb5',        // volym / k³ — lila
        fillUp: 'rgba(37,99,201,0.55)',
        fillDown: 'rgba(37,99,201,0.28)'
    };

    // ── Geometrihjälp ───────────────────────────────────────────────────
    function pts(p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }
    function mid(p, q) { return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }; }
    // Utåtriktad enhetsnormal för segmentet p→q, sett bort från "other".
    function outwardNormal(p, q, other) {
        var dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len, ny = dx / len;
        var m = mid(p, q);
        var dot = nx * (other.x - m.x) + ny * (other.y - m.y);
        if (dot > 0) { nx = -nx; ny = -ny; }
        return { x: nx, y: ny };
    }

    var uid = 0;

    function mount(el) {
        // ── Konstanter (referenstriangeln 3-4-5) ─────────────────────────
        var LEG_A = 3, LEG_B = 4, HYP = 5, AREA_T0 = 6; // (3·4)/2
        var UNIT = 15;                                   // px per enhet
        var K_MIN = 0.5, K_MAX = 3, K_STEP = 0.25;

        var state = {
            step: 1,
            k: 1.5,
            filled: 0,          // antal ifyllda kopior i areafällan
            showSolution4: false,
            poleShadow: 6.75    // Exempel 3-siffran ur ma2c-4.8
        };
        var fillAnimId = null;
        var currentPieces = [];

        function angleQdeg() { return Math.atan2(LEG_A, LEG_B) * 180 / Math.PI; }

        // ── Triangelgeometri: högervinkeln i R, ben till P (vågrätt) och
        //    Q (lodrätt uppåt) ────────────────────────────────────────────
        function triAt(Rx, Ry, scale) {
            return {
                R: { x: Rx, y: Ry },
                P: { x: Rx + LEG_A * scale, y: Ry },
                Q: { x: Rx, y: Ry - LEG_B * scale }
            };
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Likformighetens tre exponenter';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        // Huvudscen: original + kopia
        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);
        var W = 560, H = 250;
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Två likformiga rätvinkliga trianglar: en fast originaltriangel ' +
                'med sidorna 3, 4 och 5, och en kopia som skalas med skalfaktorn k.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div'); // kvot-raden (steg 1-3)
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

        var formelB = document.createElement('div'); // area-skalan (steg 2)
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.area;
        card.appendChild(formelB);

        var formelCWrap = document.createElement('div'); // tre exponenter (steg 3)
        formelCWrap.className = 'lab-vis-formel';
        formelCWrap.style.gap = '20px';
        var formelC1 = document.createElement('div'); formelC1.style.color = COL.a;
        var formelC2 = document.createElement('div'); formelC2.style.color = COL.area;
        var formelC3 = document.createElement('div'); formelC3.style.color = COL.vol;
        formelCWrap.appendChild(formelC1);
        formelCWrap.appendChild(formelC2);
        formelCWrap.appendChild(formelC3);
        card.appendChild(formelCWrap);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        // Steg 2: fyllnadsknapp + snabbval
        var fillBtn = document.createElement('button');
        fillBtn.type = 'button';
        fillBtn.className = 'lab-btn';
        fillBtn.textContent = 'Fyll den stora med kopior av den lilla';
        fillBtn.addEventListener('click', startFill);
        actions.appendChild(fillBtn);

        var chip2 = document.createElement('button');
        chip2.type = 'button';
        chip2.className = 'lab-btn';
        chip2.textContent = 'k = 2';
        chip2.addEventListener('click', function () { setK(2); });
        actions.appendChild(chip2);

        var chip3 = document.createElement('button');
        chip3.type = 'button';
        chip3.className = 'lab-btn';
        chip3.textContent = 'k = 3';
        chip3.addEventListener('click', function () { setK(3); });
        actions.appendChild(chip3);

        // Steg 4: lösningsknapp + snabbval
        var solveBtn = document.createElement('button');
        solveBtn.type = 'button';
        solveBtn.className = 'lab-btn';
        solveBtn.addEventListener('click', function () {
            state.showSolution4 = !state.showSolution4;
            update();
        });
        actions.appendChild(solveBtn);

        var snapBtn = document.createElement('button');
        snapBtn.type = 'button';
        snapBtn.className = 'lab-btn';
        snapBtn.textContent = 'Alvas mätning (6,75 m)';
        snapBtn.addEventListener('click', function () {
            state.poleShadow = 6.75;
            rowShadow.sync();
            update();
        });
        actions.appendChild(snapBtn);

        // Scen 2: staplar + graf (steg 3)
        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        card.appendChild(scene2);
        var H2 = 300;
        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2, width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Tre mätare och en graf som visar hur längd, area och volym ' +
                'skalar med k, k-kvadrat respektive k-kubik.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        // Egen legend för graf-kurvorna (steg 3). En etikett FAST intill en
        // kurvas ändpunkt riskerar att kollidera med den rörliga markören
        // (glidaren kan stå var som helst i intervallet) — en separat
        // legend-rad är kollisionsfri oavsett k.
        var legend2 = document.createElement('div');
        legend2.className = 'lab-vis-legend';
        card.appendChild(legend2);

        // Scen 3: Alva och flaggstången (steg 4)
        var scene3 = document.createElement('div');
        scene3.className = 'lab-graf-scene lab-vis-scene';
        scene3.style.marginTop = '10px';
        card.appendChild(scene3);
        var H3 = 310;
        var svg3 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H3, width: W, height: H3,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Två likformiga rätvinkliga trianglar: Alva och hennes skugga, ' +
                'och den mycket större flaggstången och dess skugga.'
        });
        svg3.classList.add('lab-graf-svg');
        svg3.style.cursor = 'default';
        scene3.appendChild(svg3);

        var formelD = document.createElement('div'); // lösningen (steg 4)
        formelD.className = 'lab-vis-formel';
        formelD.style.color = COL.c;
        card.appendChild(formelD);

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
            { n: 1, label: '1 · Samma form' },
            { n: 2, label: '2 · Areafällan' },
            { n: 3, label: '3 · Tre exponenter' },
            { n: 4, label: '4 · Använd likformigheten' }
        ];
        var INSTR = {
            1: 'Två figurer är <em>likformiga</em> om alla motsvarande sidor skalar med ' +
               'samma tal — skalfaktorn <em>k</em>. Dra i <em>k</em>-glidaren: sidorna i ' +
               'kopian ändras, men kvoterna nedanför står stilla på <em>k</em>, och ' +
               'vinklarna är identiska i båda trianglarna. Gissa först: om alla sidor ' +
               'dubblas (<em>k</em> = 2) — dubblas arean också?',
            2: 'Ställ <em>k</em> på 2 eller 3 och tryck på knappen. Kopior av den lilla ' +
               'triangeln fyller då exakt den stora, en efter en. Räkna hur många som får ' +
               'plats — arean skalar INTE med <em>k</em>, utan med <em>k</em>².',
            3: 'Tre storheter skalar olika fort med skalfaktorn: längden med <em>k</em>, ' +
               'arean med <em>k</em>² och volymen (om figuren fick djup, en 3D-kropp) med ' +
               '<em>k</em>³. Dra i <em>k</em>-glidaren och se hur staplarna och kurvorna ' +
               'sprätter isär mer och mer.',
            4: 'Likformighet används för att räkna ut okända sträckor. Alva mäter sin egen ' +
               'skugga och flaggstångens skugga — trianglarna är likformiga eftersom ' +
               'solstrålarna träffar båda under samma vinkel. Dra i skuggans längd eller ' +
               'tryck på knappen för att se lösningen (Exempel 3, likformiga trianglar).'
        };
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () { stopFillAnim(); state.step = s.n; update(); });
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
        legend.appendChild(legendItem(COL.a, 'sida <em>a</em>'));
        legend.appendChild(legendItem(COL.b, 'sida <em>b</em>'));
        legend.appendChild(legendItem(COL.c, 'hypotenusa <em>c</em>'));
        legend2.appendChild(legendItem(COL.a, '<em>k</em> (längd)'));
        legend2.appendChild(legendItem(COL.area, '<em>k</em>² (area)'));
        legend2.appendChild(legendItem(COL.vol, '<em>k</em>³ (volym)'));

        // ── Glidare ───────────────────────────────────────────────────────
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
            var decimals = step < 0.05 ? 2 : step < 1 ? 2 : 0;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.a + ' 0%, ' +
                    COL.a + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
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
                el: row,
                sync: function () {
                    slider.value = get();
                    field.value = fmt(get(), decimals).replace(',', '.');
                    paint();
                }
            };
        }
        var rowK = makeRow('k', K_MIN, K_MAX, K_STEP,
            function () { return state.k; },
            function (v) { state.k = v; state.filled = 0; stopFillAnim(); });
        // setK: används av snabbvalsknapparna (k = 2 / k = 3), som inte går
        // via glidarens egen apply()-pipeline och därför måste synka+rita själva.
        function setK(v) {
            state.k = clampNum(Math.round(v / K_STEP) * K_STEP, K_MIN, K_MAX);
            state.filled = 0;
            stopFillAnim();
            rowK.sync();
            update();
        }

        var rowShadow = makeRow('skugga', 3, 9, 0.25,
            function () { return state.poleShadow; },
            function (v) { state.poleShadow = v; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopFillAnim();
            state.step = 1; state.k = 1.5; state.filled = 0;
            state.showSolution4 = false; state.poleShadow = 6.75;
            rowK.sync(); rowShadow.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Areafällan: bygg och animera mosaiken ───────────────────────
        function stopFillAnim() {
            if (fillAnimId != null) { cancelAnimationFrame(fillAnimId); fillAnimId = null; }
        }
        function buildPieces(n, copyR) {
            var eB = { x: LEG_A * UNIT, y: 0 };
            var eC = { x: 0, y: -LEG_B * UNIT };
            function P(i, j) {
                return { x: copyR.x + i * eB.x + j * eC.x, y: copyR.y + i * eB.y + j * eC.y };
            }
            var pieces = [];
            var i, j;
            for (j = 0; j < n; j++) {
                for (i = 0; i <= n - 1 - j; i++) {
                    pieces.push({ type: 'up', v: [P(i, j), P(i + 1, j), P(i, j + 1)] });
                    if (i <= n - 2 - j) {
                        pieces.push({ type: 'down', v: [P(i + 1, j), P(i, j + 1), P(i + 1, j + 1)] });
                    }
                }
            }
            return pieces;
        }
        function startFill() {
            var n = Math.round(state.k);
            if (Math.abs(state.k - n) > 1e-6 || n < 2 || n > 3) return;
            stopFillAnim();
            var copyR = { x: 230, y: 215 };
            currentPieces = buildPieces(n, copyR);
            state.filled = 0;
            var total = currentPieces.length; // = n²
            var t0 = null, MS_PER_PIECE = 130;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var count = Math.min(total, Math.floor((ts - t0) / MS_PER_PIECE) + 1);
                if (count !== state.filled) { state.filled = count; update(); }
                if (state.filled < total) fillAnimId = requestAnimationFrame(frame);
                else fillAnimId = null;
            }
            fillAnimId = requestAnimationFrame(frame);
        }

        // ── Rita huvudscenen: original + kopia ───────────────────────────
        function drawSideLabel(g, p, q, other, color, parts, fontSize, offset) {
            var n = outwardNormal(p, q, other);
            var m = mid(p, q);
            var lx = m.x + n.x * offset, ly = m.y + n.y * offset + (n.y < -0.3 ? 3 : n.y > 0.3 ? 8 : 4);
            var anchor = n.x >= 0.15 ? 'start' : n.x <= -0.15 ? 'end' : 'middle';
            g.appendChild(svgVarText({ x: lx, y: ly, 'font-size': fontSize, 'text-anchor': anchor, fill: color }, parts));
        }
        function drawTriangleSides(g, T, w) {
            g.appendChild(svgEl('line', { x1: T.R.x, y1: T.R.y, x2: T.P.x, y2: T.P.y, stroke: COL.a, 'stroke-width': w }));
            g.appendChild(svgEl('line', { x1: T.R.x, y1: T.R.y, x2: T.Q.x, y2: T.Q.y, stroke: COL.b, 'stroke-width': w }));
            g.appendChild(svgEl('line', { x1: T.P.x, y1: T.P.y, x2: T.Q.x, y2: T.Q.y, stroke: COL.c, 'stroke-width': w }));
        }
        function rightAngleMark(g, R, m) {
            g.appendChild(svgEl('rect', { x: R.x, y: R.y - m, width: m, height: m, fill: 'none', stroke: COL.axis, 'stroke-width': 1 }));
        }
        // Vinkeln vid Q är smal (36,9°), så det finns inte plats för
        // mätetalet INNE i kilen utan att det ligger på ett av benen (testat
        // och förkastat). Q är alltid triangelns TOPPUNKT — båda benen går
        // nedåt från Q — så fri yta rakt OVANFÖR Q är alltid ledig,
        // oavsett k. Bågen (liten, bara en visuell markör) ligger kvar i
        // kilen; mätetalet flyttas till den fria ytan ovanför.
        function angleArc(g, Q, R, P, color) {
            var r = 11;
            var u1 = { x: (R.x - Q.x) / Math.hypot(R.x - Q.x, R.y - Q.y), y: (R.y - Q.y) / Math.hypot(R.x - Q.x, R.y - Q.y) };
            var u2 = { x: (P.x - Q.x) / Math.hypot(P.x - Q.x, P.y - Q.y), y: (P.y - Q.y) / Math.hypot(P.x - Q.x, P.y - Q.y) };
            var a1 = { x: Q.x + r * u1.x, y: Q.y + r * u1.y };
            var a2 = { x: Q.x + r * u2.x, y: Q.y + r * u2.y };
            var th1 = Math.atan2(u1.y, u1.x), th2 = Math.atan2(u2.y, u2.x);
            var diff = (th2 - th1 + 2 * Math.PI) % (2 * Math.PI);
            var sweep = diff <= Math.PI ? 1 : 0;
            g.appendChild(svgEl('path', {
                d: 'M ' + a1.x.toFixed(1) + ' ' + a1.y.toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + a2.x.toFixed(1) + ' ' + a2.y.toFixed(1),
                fill: 'none', stroke: color, 'stroke-width': 1.3
            }));
            g.appendChild(svgVarText({ x: Q.x, y: Q.y - 6, 'font-size': 10.5, 'text-anchor': 'middle', fill: color },
                [fmt(angleQdeg(), 1) + '°']));
        }

        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var g = svgEl('g');
            svg.appendChild(g);
            var k = state.k;
            var origR = { x: 70, y: 215 };
            var copyR = { x: 230, y: 215 };
            var origT = triAt(origR.x, origR.y, UNIT);
            var copyT = triAt(copyR.x, copyR.y, UNIT * k);

            // Areafällan-mosaik (bakom kopians ram), bara steg 2
            if (state.step === 2 && state.filled > 0 && currentPieces.length) {
                var mg = svgEl('g');
                g.appendChild(mg);
                for (var pi = 0; pi < state.filled && pi < currentPieces.length; pi++) {
                    var piece = currentPieces[pi];
                    mg.appendChild(svgEl('polygon', {
                        points: pts(piece.v[0]) + ' ' + pts(piece.v[1]) + ' ' + pts(piece.v[2]),
                        fill: piece.type === 'up' ? COL.fillUp : COL.fillDown,
                        stroke: 'rgba(15,22,32,0.35)', 'stroke-width': 1
                    }));
                }
            }

            // Trianglarnas sidor
            drawTriangleSides(g, origT, 2.2);
            drawTriangleSides(g, copyT, 2.2);
            rightAngleMark(g, origT.R, 7);
            rightAngleMark(g, copyT.R, 7);
            angleArc(g, origT.Q, origT.R, origT.P, COL.axis);
            angleArc(g, copyT.Q, copyT.R, copyT.P, COL.axis);

            // Sidetiketter: original (rena tal) + kopia (symbol + tal)
            drawSideLabel(g, origT.R, origT.P, origT.Q, COL.a, [String(LEG_A)], 12, 15);
            drawSideLabel(g, origT.R, origT.Q, origT.P, COL.b, [String(LEG_B)], 12, 13);
            drawSideLabel(g, origT.P, origT.Q, origT.R, COL.c, [String(HYP)], 12, 15);

            drawSideLabel(g, copyT.R, copyT.P, copyT.Q, COL.a,
                [String(LEG_A), '*k', ' = ', fmt(LEG_A * k, 2)], 12, 15);
            drawSideLabel(g, copyT.R, copyT.Q, copyT.P, COL.b,
                [String(LEG_B), '*k', ' = ', fmt(LEG_B * k, 2)], 12, 13);
            drawSideLabel(g, copyT.P, copyT.Q, copyT.R, COL.c,
                [String(HYP), '*k', ' = ', fmt(HYP * k, 2)], 12, 17);

            // "original" / "kopia" — små etiketter i fri yta ovanför resp.
            // figur, ovanför vinkelmåttet (som sitter på Q.y - 6)
            g.appendChild(svgVarText({ x: origT.Q.x, y: origT.Q.y - 18, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, ['original']));
            g.appendChild(svgVarText({ x: copyT.Q.x, y: copyT.Q.y - 18, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, ['kopia']));
        }

        // ── Rita staplar + graf (steg 3) ──────────────────────────────────
        function drawBarsGraph() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var k = state.k;
            var L2 = 46, BARPX = 15;
            var rows = [
                { y: 18, label: 'Längd', color: COL.a, val: k, maxVal: K_MAX, symParts: ['*k', ' = ', fmt(k, 2)] },
                { y: 54, label: 'Area', color: COL.area, val: k * k, maxVal: K_MAX * K_MAX, symParts: ['*k', '² = ', fmt(k * k, 2)] },
                { y: 90, label: 'Volym', color: COL.vol, val: k * k * k, maxVal: K_MAX * K_MAX * K_MAX, symParts: ['*k', '³ = ', fmt(k * k * k, 2)] }
            ];
            rows.forEach(function (row) {
                var h = 20;
                svg2.appendChild(svgVarText({ x: L2 - 6, y: row.y + h / 2 + 4, 'font-size': 11.5, 'text-anchor': 'end', fill: COL.tick }, [row.label]));
                svg2.appendChild(svgEl('rect', { x: L2, y: row.y, width: row.maxVal * BARPX, height: h, fill: COL.track, rx: 2 }));
                svg2.appendChild(svgEl('rect', { x: L2, y: row.y, width: Math.max(2, row.val * BARPX), height: h, fill: row.color, rx: 2 }));
                svg2.appendChild(svgVarText({ x: L2 + row.val * BARPX + 8, y: row.y + h / 2 + 4, 'font-size': 12, 'text-anchor': 'start', fill: row.color }, row.symParts));
            });

            // Graf: k, k², k³ mot k
            var L = 46, R = 16, T3 = 140, B3 = 34;
            var PW = W - L - R, PH = H2 - T3 - B3;
            var YMAX = 30;
            function Xg(kv) { return L + (kv - K_MIN) / (K_MAX - K_MIN) * PW; }
            function Yg(v) { return T3 + (YMAX - v) / YMAX * PH; }

            // rutnät
            var i;
            [0.5, 1, 1.5, 2, 2.5, 3].forEach(function (kv) {
                svg2.appendChild(svgEl('line', { x1: Xg(kv), y1: T3, x2: Xg(kv), y2: T3 + PH, stroke: COL.grid, 'stroke-width': 1 }));
            });
            [0, 10, 20, 30].forEach(function (v) {
                svg2.appendChild(svgEl('line', { x1: L, y1: Yg(v), x2: L + PW, y2: Yg(v), stroke: COL.grid, 'stroke-width': 1 }));
            });

            // axlar
            var axisY = Yg(0);
            svg2.appendChild(svgEl('line', { x1: L, y1: axisY, x2: L + PW + 6, y2: axisY, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: (L + PW + 14) + ',' + axisY + ' ' + (L + PW + 4) + ',' + (axisY - 4.5) + ' ' + (L + PW + 4) + ',' + (axisY + 4.5), fill: COL.axis }));
            svg2.appendChild(svgEl('line', { x1: L, y1: T3 + PH, x2: L, y2: T3 - 8, stroke: COL.axis, 'stroke-width': 1.6 }));
            svg2.appendChild(svgEl('polygon', { points: L + ',' + (T3 - 16) + ' ' + (L - 4.5) + ',' + (T3 - 6) + ' ' + (L + 4.5) + ',' + (T3 - 6), fill: COL.axis }));
            svg2.appendChild(svgVarText({ x: L + PW + 2, y: axisY + 17, 'font-size': 13.5, 'text-anchor': 'end', fill: COL.axis }, ['*k']));

            [0.5, 1, 1.5, 2, 2.5, 3].forEach(function (kv) {
                svg2.appendChild(svgVarText({ x: Xg(kv), y: axisY + 16, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.tick }, [fmt(kv, 2)]));
            });
            [10, 20, 30].forEach(function (v) {
                svg2.appendChild(svgVarText({ x: L - 6, y: Yg(v) + 3.5, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.tick }, [String(v)]));
            });

            // kurvor
            function curvePath(p) {
                var d = '', N = 50;
                for (i = 0; i <= N; i++) {
                    var kv = K_MIN + (K_MAX - K_MIN) * i / N;
                    var v = Math.pow(kv, p);
                    d += (i === 0 ? 'M' : 'L') + Xg(kv).toFixed(1) + ' ' + Yg(v).toFixed(1) + ' ';
                }
                return d;
            }
            var curves = [
                { p: 1, color: COL.a },
                { p: 2, color: COL.area },
                { p: 3, color: COL.vol }
            ];
            curves.forEach(function (c) {
                svg2.appendChild(svgEl('path', { d: curvePath(c.p), fill: 'none', stroke: c.color, 'stroke-width': 2.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
            });
            // (Kurvorna namnges i legend2 under grafen — INTE med etiketter
            // fästa vid kurvornas ändpunkter, eftersom den rörliga markören
            // kan stå var som helst i intervallet och då skulle krocka med
            // en fast etikett.)

            // rörlig markör vid aktuellt k
            var kx = Xg(k);
            svg2.appendChild(svgEl('line', { x1: kx, y1: axisY, x2: kx, y2: Yg(Math.pow(k, 3)), stroke: COL.dash, 'stroke-width': 1.2, 'stroke-dasharray': '4 3' }));
            curves.forEach(function (c) {
                svg2.appendChild(svgEl('circle', { cx: kx, cy: Yg(Math.pow(k, c.p)), r: 4, fill: c.color }));
            });
        }

        // ── Rita Alva + flaggstången (steg 4) ────────────────────────────
        function drawFlagpole() {
            while (svg3.firstChild) svg3.removeChild(svg3.firstChild);
            var g = svgEl('g');
            svg3.appendChild(g);
            var pxPerM = 18;
            var baseline = 278;
            var personH = 1.60, personShadow = 1.20;
            var poleShadow = state.poleShadow;
            var poleH = poleShadow / personShadow * personH;

            var poleR = { x: 70, y: baseline };
            var poleP = { x: poleR.x + poleShadow * pxPerM, y: baseline };
            var poleQ = { x: poleR.x, y: baseline - poleH * pxPerM };

            var personR = { x: 290, y: baseline };
            var personP = { x: personR.x + personShadow * pxPerM, y: baseline };
            var personQ = { x: personR.x, y: baseline - personH * pxPerM };

            function tri(g2, R, P, Q, mSq) {
                g2.appendChild(svgEl('line', { x1: R.x, y1: R.y, x2: P.x, y2: P.y, stroke: COL.a, 'stroke-width': 2.2 }));
                g2.appendChild(svgEl('line', { x1: R.x, y1: R.y, x2: Q.x, y2: Q.y, stroke: COL.b, 'stroke-width': 2.2 }));
                g2.appendChild(svgEl('line', { x1: P.x, y1: P.y, x2: Q.x, y2: Q.y, stroke: COL.c, 'stroke-width': 1.8 }));
                rightAngleMark(g2, R, mSq);
            }
            tri(g, poleR, poleP, poleQ, 8);
            tri(g, personR, personP, personQ, 6);

            // Höjd-etiketter (till vänster om lodräta ben)
            g.appendChild(svgVarText({ x: poleR.x - 8, y: (poleR.y + poleQ.y) / 2 + 4, 'font-size': 12.5, 'text-anchor': 'end', fill: COL.b },
                state.showSolution4 ? ['*x', ' = ', fmt(poleH, 2)] : ['*x', ' = ?']));
            g.appendChild(svgVarText({ x: personR.x - 7, y: (personR.y + personQ.y) / 2 + 4, 'font-size': 10.5, 'text-anchor': 'end', fill: COL.b }, [fmt(personH, 2)]));

            // Skugg-etiketter (under baslinjen)
            g.appendChild(svgVarText({ x: (poleR.x + poleP.x) / 2, y: baseline + 16, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.a }, [fmt(poleShadow, 2)]));
            g.appendChild(svgVarText({ x: (personR.x + personP.x) / 2, y: baseline + 16, 'font-size': 10.5, 'text-anchor': 'middle', fill: COL.a }, [fmt(personShadow, 2)]));

            // Namn i fri yta ovanför topparna
            g.appendChild(svgVarText({ x: poleQ.x, y: Math.max(16, poleQ.y - 10), 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, ['flaggstången']));
            g.appendChild(svgVarText({ x: personQ.x, y: personQ.y - 10, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick }, ['Alva']));

            // Enhet i hörnet
            g.appendChild(svgVarText({ x: W - 10, y: 20, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick }, ['(m)']));
        }

        // ── Formler ───────────────────────────────────────────────────────
        function updateFormulas() {
            var k = state.k;
            var kT = fmtTex(k, 2);

            if (state.step <= 3) {
                katexInto(formelA,
                    '\\dfrac{' + fmtTex(LEG_A * k, 2) + '}{' + LEG_A + '} = ' +
                    '\\dfrac{' + fmtTex(LEG_B * k, 2) + '}{' + LEG_B + '} = ' +
                    '\\dfrac{' + fmtTex(HYP * k, 2) + '}{' + HYP + '} = ' + kT);
            } else formelA.textContent = '';

            if (state.step === 2) {
                katexInto(formelB,
                    'A_\\text{kopia} = A_\\text{original} \\cdot k^2 = ' + AREA_T0 + ' \\cdot ' + kT + '^2 = ' +
                    fmtTex(AREA_T0 * k * k, 2));
            } else formelB.textContent = '';

            if (state.step === 3) {
                katexInto(formelC1, 'k = ' + kT);
                katexInto(formelC2, 'k^2 = ' + fmtTex(k * k, 2));
                katexInto(formelC3, 'k^3 = ' + fmtTex(k * k * k, 2));
            } else { formelC1.textContent = ''; formelC2.textContent = ''; formelC3.textContent = ''; }

            if (state.step === 4 && state.showSolution4) {
                var sT = fmtTex(state.poleShadow, 2);
                var xT = fmtTex(state.poleShadow / 1.20 * 1.60, 2);
                katexInto(formelD,
                    '\\begin{aligned} \\dfrac{x}{1{,}60} &= \\dfrac{' + sT + '}{1{,}20} \\\\[4pt] ' +
                    'x &= \\dfrac{' + sT + '}{1{,}20} \\cdot 1{,}60 = ' + xT + '\\ \\text{m} \\end{aligned}', true);
            } else formelD.textContent = '';
        }

        function updateNote() {
            if (state.step === 2) {
                var n = Math.round(state.k);
                var isInt = Math.abs(state.k - n) < 1e-6 && n >= 2 && n <= 3;
                if (!isInt) {
                    note.innerHTML = 'Fyllningen fungerar bara vid heltalsvärden — prova <em>k</em> = 2 eller <em>k</em> = 3.';
                } else {
                    var total = n * n;
                    if (state.filled === 0) {
                        note.innerHTML = 'Tryck på knappen för att se hur många kopior av den lilla triangeln som får plats i den stora.';
                    } else if (state.filled < total) {
                        note.innerHTML = 'Kopior hittills: <strong>' + state.filled + '</strong> av <em>k</em>² = ' + total + '.';
                    } else {
                        note.innerHTML = 'Kopior: <strong>' + total + '</strong> = <em>k</em>² = ' + n + '². ' +
                            'Arean är alltså ' + total + ' gånger så stor som originalets — inte ' + n + ' gånger!';
                    }
                }
            } else if (state.step === 3) {
                note.innerHTML = 'Tumregel ur naturen: en fisk som är dubbelt så lång (<em>k</em> = 2) väger ungefär ' +
                    '2³ = 8 gånger så mycket — kroppens volym skalar med <em>k</em>³, inte med <em>k</em>.';
            } else {
                note.textContent = '';
            }
        }

        // ── Master-uppdatering ────────────────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            var st = state.step;
            scene.style.display = st <= 3 ? '' : 'none';
            legend.style.display = st <= 3 ? '' : 'none';
            formelA.style.display = st <= 3 ? '' : 'none';
            formelB.style.display = st === 2 ? '' : 'none';
            formelCWrap.style.display = st === 3 ? '' : 'none';
            scene2.style.display = st === 3 ? '' : 'none';
            legend2.style.display = st === 3 ? '' : 'none';
            scene3.style.display = st === 4 ? '' : 'none';
            formelD.style.display = st === 4 ? '' : 'none';
            note.style.display = (st === 2 || st === 3) ? '' : 'none';
            actions.style.display = (st === 2 || st === 4) ? '' : 'none';
            fillBtn.style.display = st === 2 ? '' : 'none';
            chip2.style.display = st === 2 ? '' : 'none';
            chip3.style.display = st === 2 ? '' : 'none';
            solveBtn.style.display = st === 4 ? '' : 'none';
            snapBtn.style.display = st === 4 ? '' : 'none';
            solveBtn.textContent = state.showSolution4 ? 'Dölj lösningen' : 'Visa lösningen';

            rowK.el.style.display = st !== 4 ? '' : 'none';
            rowShadow.el.style.display = st === 4 ? '' : 'none';

            var n = Math.round(state.k);
            fillBtn.disabled = !(Math.abs(state.k - n) < 1e-6 && n >= 2 && n <= 3);
            fillBtn.style.opacity = fillBtn.disabled ? '0.45' : '1';
            fillBtn.style.cursor = fillBtn.disabled ? 'default' : 'pointer';

            if (st <= 3) drawMain();
            if (st === 3) drawBarsGraph();
            if (st === 4) drawFlagpole();
            updateFormulas();
            updateNote();
        }

        update();

        return {
            destroy: function () {
                stopFillAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma2c-4.7'] = api;
    window.VISUALISERINGAR['ma2c-4.8'] = api;
})();
