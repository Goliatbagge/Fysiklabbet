/* ma2c-4.9.js — visualisering: "Topptriangelsatsen" (och transversalsatsen).
 * Hör till ma2c-4.9 (Triangelsatserna).
 *
 * Kärninsikt: en parallelltransversal genom D (på AB) och E (på AC) skär av
 * en topptriangel ADE som är LIKFORMIG med hela triangeln ABC. Delnings-
 * förhållandet är samma på båda sidorna (transversalsatsen: AD/DB = AE/EC)
 * — och alla tre sidoförhållanden mellan topptriangeln och hela triangeln
 * är lika (topptriangelsatsen: AD/AB = AE/AC = DE/BC), en gemensam
 * skalfaktor.
 *
 * Konstruktion: D och E ligger på samma "höjdparameter" t längs AB
 * respektive AC (D = A + t(B−A), E = A + t(C−A)), vilket automatiskt
 * garanterar att DE är parallell med BC — precis den situation
 * transversalsatsen/topptriangelsatsen handlar om.
 *
 * Tre steg (lager):
 *   1. Dra transversalen   — handtag vid D (+ glidare t), hörnen A/B/C
 *                             också dragbara. Segmenten AD/DB/AE/EC mäts
 *                             live; transversalsatsens två kvoter jämförs.
 *   2. Topptriangeln lyfts ut — knapp kopierar ADE ut bredvid ABC i samma
 *                             skala (translaterad, oskalad) för visuell
 *                             jämförelse; topptriangelsatsens tre lika
 *                             förhållanden (skalfaktorn) skrivs ut.
 *   3. Använd satsen        — knapp snäpper figuren till genomgångens
 *                             Exempel 1 (AD=4, DB=8, EC=10, x=AE=5) och
 *                             visar lösningen steg för steg (transversal-
 *                             satsen, med topptriangelsatsen som alternativ)
 *                             — dra sedan vidare, proportionen håller.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['ma2c-4.9'] = { mount }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
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
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }

    // ── Färger ─────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        tick: '#5b6472',
        trans: '#2563c9',    // parallelltransversalen / topptriangeln (blå)
        fillTri: 'rgba(37,99,201,0.08)',
        ratio: '#2f8f4e',    // transversalsatsen (grön, invarianten)
        scale: '#c8324a',    // topptriangelsatsen / skalfaktorn (röd accent)
        dash: 'rgba(31,37,48,0.42)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── Geometrihjälp ──────────────────────────────────────────────────
    function dist(P1, P2) { return Math.hypot(P2.x - P1.x, P2.y - P1.y); }
    function mid(P1, P2) { return { x: (P1.x + P2.x) / 2, y: (P1.y + P2.y) / 2 }; }
    function lerp(P1, P2, t) { return { x: P1.x + t * (P2.x - P1.x), y: P1.y + t * (P2.y - P1.y) }; }
    function areaOf(P1, P2, P3) {
        return Math.abs((P2.x - P1.x) * (P3.y - P1.y) - (P3.x - P1.x) * (P2.y - P1.y)) / 2;
    }
    // Utåtriktad normal till segmentet P1→P2 (bort från P3)
    function outwardNormal(P1, P2, P3) {
        var dx = P2.x - P1.x, dy = P2.y - P1.y, len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len, ny = dx / len;
        var m = mid(P1, P2);
        var tox = P3.x - m.x, toy = P3.y - m.y;
        if (nx * tox + ny * toy > 0) { nx = -nx; ny = -ny; }
        return { x: nx, y: ny };
    }
    function pts(arr) { return arr.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '); }
    function bbox(arr) {
        var xs = arr.map(function (p) { return p.x; }), ys = arr.map(function (p) { return p.y; });
        return { xmin: Math.min.apply(null, xs), xmax: Math.max.apply(null, xs), ymin: Math.min.apply(null, ys), ymax: Math.max.apply(null, ys) };
    }
    function chevron(P1, P2, tpos, color) {
        var m = lerp(P1, P2, tpos);
        var dx = P2.x - P1.x, dy = P2.y - P1.y, len = Math.hypot(dx, dy) || 1;
        var ux = dx / len, uy = dy / len, px = -uy, py = ux, s = 5.5;
        var a = { x: m.x - ux * s + px * 3.4, y: m.y - uy * s + py * 3.4 };
        var b = { x: m.x + ux * s, y: m.y + uy * s };
        var c = { x: m.x - ux * s - px * 3.4, y: m.y - uy * s - py * 3.4 };
        var d = 'M ' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) +
            ' L ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1) +
            ' L ' + c.x.toFixed(1) + ' ' + c.y.toFixed(1);
        return svgEl('path', { d: d, fill: 'none', stroke: color, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    }
    // Textankare valt efter normalens vågräta komponent: en etikett som
    // förskjuts åt vänster ska VÄXA åt vänster (anchor "end", aldrig
    // "middle") så att den aldrig sträcker sig tillbaka in mot linjen —
    // annars korsar halva textens bredd linjen den beskriver.
    function anchorFor(normal) {
        if (normal.x < -0.12) return 'end';
        if (normal.x > 0.12) return 'start';
        return 'middle';
    }
    function ptLabel(P, normal, offset, letter, color) {
        var x = P.x + normal.x * offset, y = P.y + normal.y * offset + 4;
        var t = svgEl('text', { x: x, y: y, 'font-size': 14, 'text-anchor': 'middle', fill: color });
        t.textContent = letter;
        return t;
    }
    function segLabel(P1, P2, normal, offset, letter, value, color) {
        var m = mid(P1, P2);
        var x = m.x + normal.x * offset, y = m.y + normal.y * offset + 4;
        var t = svgEl('text', { x: x, y: y, 'font-size': 12.5, 'text-anchor': anchorFor(normal), fill: color });
        var it = svgEl('tspan', { 'font-style': 'italic' }); it.textContent = letter;
        var rest = svgEl('tspan'); rest.textContent = ' = ' + value;
        t.appendChild(it); t.appendChild(rest);
        return t;
    }

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var DEFAULT_A = { x: 220, y: 75.4 };
        var DEFAULT_B = { x: 150, y: 330 };
        var DEFAULT_C = { x: 430, y: 330 };
        var DEFAULT_T = 0.42;
        var T_MIN = 0.1, T_MAX = 0.9, T_STEP = 0.01;
        var BX_MIN = 50, BX_MAX = 510, BY_MIN = 55, BY_MAX = 375;
        var MIN_AREA = 9000;

        var state = {
            step: 1,
            A: { x: DEFAULT_A.x, y: DEFAULT_A.y },
            B: { x: DEFAULT_B.x, y: DEFAULT_B.y },
            C: { x: DEFAULT_C.x, y: DEFAULT_C.y },
            t: DEFAULT_T,
            lifted: false,
            exampleShown: false,
            interacted: false
        };

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Topptriangelsatsen';
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

        var W = 560, H = 420;
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv triangel A B C med en parallelltransversal genom ' +
                'D på AB och E på AC. Dra handtaget vid D eller hörnen för att ändra figuren.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var ratioHead = document.createElement('div');
        ratioHead.textContent = 'Transversalsatsen';
        ratioHead.style.cssText = 'font-size:13px;font-weight:600;color:' + COL.ratio + ';margin:2px 0 -4px;';
        card.appendChild(ratioHead);

        var ratioWrap = document.createElement('div');
        ratioWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px;';
        card.appendChild(ratioWrap);

        var formelT1 = document.createElement('div');
        formelT1.className = 'lab-vis-formel';
        formelT1.style.cssText = 'color:' + COL.ratio + ';flex:1 1 220px;';
        ratioWrap.appendChild(formelT1);

        var formelT2 = document.createElement('div');
        formelT2.className = 'lab-vis-formel';
        formelT2.style.cssText = 'color:' + COL.ratio + ';flex:1 1 220px;';
        ratioWrap.appendChild(formelT2);

        var noteMain = document.createElement('div');
        noteMain.className = 'lab-vis-note';
        card.appendChild(noteMain);

        var s2Head = document.createElement('div');
        s2Head.textContent = 'Topptriangelsatsen';
        s2Head.style.cssText = 'font-size:13px;font-weight:600;color:' + COL.scale + ';margin:6px 0 -4px;';
        card.appendChild(s2Head);

        var formelS2 = document.createElement('div');
        formelS2.className = 'lab-vis-formel';
        formelS2.style.color = COL.scale;
        card.appendChild(formelS2);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        scene2.style.transition = 'opacity .35s ease, transform .35s ease';
        card.appendChild(scene2);

        var H2 = 240;
        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H2, width: W, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Triangeln ABC och en utlyft kopia av topptriangeln ADE sida vid ' +
                'sida i samma skala — samma form, bara mindre.'
        });
        svg2.classList.add('lab-graf-svg');
        scene2.appendChild(svg2);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var liftBtn = document.createElement('button');
        liftBtn.type = 'button';
        liftBtn.className = 'lab-btn';
        liftBtn.addEventListener('click', function () {
            state.lifted = !state.lifted;
            update();
        });
        actions.appendChild(liftBtn);

        var exampleBtn = document.createElement('button');
        exampleBtn.type = 'button';
        exampleBtn.className = 'lab-btn';
        exampleBtn.textContent = 'Exempel 1: sätt måtten';
        exampleBtn.addEventListener('click', function () { applyExample(); });
        actions.appendChild(exampleBtn);

        var formelExample = document.createElement('div');
        card.appendChild(formelExample);

        var exTitle = document.createElement('div');
        exTitle.style.cssText = 'font-size:13px;font-weight:600;color:' + COL.ratio + ';margin:6px 0 -4px;';
        exTitle.textContent = 'Exempel 1 — Transversalsatsen (Bestäm sidan x)';
        formelExample.appendChild(exTitle);

        var exK1 = document.createElement('div');
        exK1.className = 'lab-vis-formel';
        exK1.style.color = COL.ratio;
        formelExample.appendChild(exK1);

        var exK2 = document.createElement('div');
        exK2.className = 'lab-vis-formel';
        exK2.style.color = COL.ratio;
        formelExample.appendChild(exK2);

        var exAnswer = document.createElement('div');
        exAnswer.className = 'lab-vis-note';
        formelExample.appendChild(exAnswer);

        var exAltTitle = document.createElement('div');
        exAltTitle.style.cssText = 'font-size:12.5px;font-weight:600;color:' + COL.scale + ';margin:6px 0 -4px;';
        exAltTitle.textContent = 'Topptriangelsatsen ger samma svar';
        formelExample.appendChild(exAltTitle);

        var exAlt = document.createElement('div');
        exAlt.className = 'lab-vis-formel';
        exAlt.style.color = COL.scale;
        formelExample.appendChild(exAlt);

        var noteBisektris = document.createElement('div');
        noteBisektris.className = 'lab-vis-note';
        noteBisektris.innerHTML = 'Genomgången tar också upp <em>bisektrissatsen</em>: en bisektris ' +
            '(vinkelhalverare) delar motstående sida i förhållandet <em>AD</em>/<em>BD</em> = ' +
            '<em>AC</em>/<em>BC</em>. Konstruktionen är en annan (ingen parallelltransversal) — men ' +
            'idén att en triangel delas i ett bestämt, beräkningsbart förhållande är densamma.';
        card.appendChild(noteBisektris);

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
            { n: 1, label: '1 · Dra transversalen' },
            { n: 2, label: '2 · Topptriangeln lyfts ut' },
            { n: 3, label: '3 · Använd satsen' }
        ];
        var INSTR = {
            1: 'En <em>parallelltransversal</em> genom <em>D</em> på <em>AB</em> och <em>E</em> på ' +
               '<em>AC</em>, parallell med basen <em>BC</em>, skär av en topptriangel <em>ADE</em>. ' +
               'Dra handtaget vid <em>D</em> (eller glidaren) uppåt/nedåt — och gärna hörnen ' +
               '<em>A</em>, <em>B</em>, <em>C</em> för att pröva andra trianglar. Gissa först: om ' +
               '<em>AD</em> är dubbelt så långt som <em>DB</em> — vad tror du gäller för <em>AE</em> ' +
               'och <em>EC</em>?',
            2: 'Topptriangeln <em>ADE</em> är likformig med hela triangeln <em>ABC</em> — samma form, ' +
               'bara mindre. Tryck på knappen för att lyfta ut en kopia av <em>ADE</em> och jämföra ' +
               'den, i samma skala, med <em>ABC</em>.',
            3: 'Testa genomgångens exempel: en parallelltransversal delar <em>AB</em> i 4 cm och 8 cm. ' +
               'Hur långt är <em>AE</em> = <em>x</em> när <em>EC</em> = 10 cm? Tryck på knappen — ' +
               'figuren snäpper till exemplets mått och lösningen visas steg för steg. Dra sedan ' +
               'vidare i figuren: proportionen håller ändå.'
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
        legend.appendChild(legendItem(COL.ink, 'triangel <em>ABC</em>'));
        legend.appendChild(legendItem(COL.trans, 'parallelltransversal <em>DE</em> (topptriangel <em>ADE</em>)'));

        // ── Glidare (t) ───────────────────────────────────────────────────
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
            slider.setAttribute('aria-label', 'Transversalens läge (' + name + ')');
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Transversalens läge (' + name + ')');
            var decimals = 2;
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.trans + ' 0%, ' +
                    COL.trans + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
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
            field.addEventListener('blur', function () { field.value = fmt(get(), decimals).replace(',', '.'); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return { sync: function () { slider.value = get(); field.value = fmt(get(), decimals).replace(',', '.'); paint(); } };
        }
        var rowT = makeRow('t', T_MIN, T_MAX, T_STEP,
            function () { return state.t; },
            function (v) { state.t = v; state.interacted = true; });

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.A = { x: DEFAULT_A.x, y: DEFAULT_A.y };
            state.B = { x: DEFAULT_B.x, y: DEFAULT_B.y };
            state.C = { x: DEFAULT_C.x, y: DEFAULT_C.y };
            state.t = DEFAULT_T;
            state.lifted = false;
            state.exampleShown = false;
            state.interacted = false;
            rowT.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Exempel 1 (snäpp till genomgångens mått) ────────────────────────
        function applyExample() {
            state.A = { x: DEFAULT_A.x, y: DEFAULT_A.y };
            state.B = { x: DEFAULT_B.x, y: DEFAULT_B.y };
            state.C = { x: DEFAULT_C.x, y: DEFAULT_C.y };
            state.t = 1 / 3;
            state.exampleShown = true;
            state.interacted = true;
            rowT.sync();
            update();
        }

        // ── Drag: hörn A/B/C och handtaget D ────────────────────────────────
        function toWorld(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return {
                x: (clientX - r.left) * (W / r.width),
                y: (clientY - r.top) * (H / r.height)
            };
        }
        var dragging = null; // 'A' | 'B' | 'C' | 'D' | null
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var p = toWorld(e.clientX, e.clientY);
            if (dragging === 'D') {
                var A = state.A, B = state.B;
                var abx = B.x - A.x, aby = B.y - A.y;
                var len2 = abx * abx + aby * aby || 1;
                var tt = ((p.x - A.x) * abx + (p.y - A.y) * aby) / len2;
                state.t = clampNum(tt, T_MIN, T_MAX);
                state.interacted = true;
                rowT.sync();
            } else {
                var cand = { x: clampNum(p.x, BX_MIN, BX_MAX), y: clampNum(p.y, BY_MIN, BY_MAX) };
                var A2 = dragging === 'A' ? cand : state.A;
                var B2 = dragging === 'B' ? cand : state.B;
                var C2 = dragging === 'C' ? cand : state.C;
                if (areaOf(A2, B2, C2) >= MIN_AREA) {
                    state[dragging] = cand;
                    state.interacted = true;
                }
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function makeHit(P, key, r) {
            var hit = svgEl('circle', { cx: P.x, cy: P.y, r: r || 16, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = key;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            return hit;
        }

        // ── Rita huvudscenen ──────────────────────────────────────────────
        function drawMain() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var A = state.A, B = state.B, C = state.C, t = state.t;
            var D = lerp(A, B, t), E = lerp(A, C, t);
            var nAB = outwardNormal(A, B, C);
            var nAC = outwardNormal(A, C, B);
            var nBC = outwardNormal(B, C, A);

            // Fyllning topptriangeln
            svg.appendChild(svgEl('polygon', { points: pts([A, D, E]), fill: COL.fillTri, stroke: 'none' }));
            // Yttre triangel
            svg.appendChild(svgEl('polygon', { points: pts([A, B, C]), fill: 'none', stroke: COL.ink, 'stroke-width': 2 }));
            // Transversal
            svg.appendChild(svgEl('line', { x1: D.x, y1: D.y, x2: E.x, y2: E.y, stroke: COL.trans, 'stroke-width': 2.2 }));
            // Parallellmärken (samma relativa läge på DE och BC)
            svg.appendChild(chevron(D, E, 0.30, COL.tick));
            svg.appendChild(chevron(B, C, 0.30, COL.tick));

            // Segmentetiketter (kursiv bokstav + värde), offset vinkelrätt ut.
            // Vid litet t blir topptriangeln liten och a/c/e/D/E trängs ihop
            // nära A — släpp de etiketter som då skulle krocka (samma princip
            // som referensmodulens hopp över kolliderande tick-etiketter).
            var adLen = dist(A, D), aeLen = dist(A, E), deLen = dist(D, E);
            var cramped = Math.min(adLen, aeLen) < 34;
            var dOff = cramped ? 20 : 13, eOff = cramped ? 20 : 13;
            if (!cramped) svg.appendChild(segLabel(A, D, nAB, 21, 'a', fmt(adLen, 1), COL.ink));
            svg.appendChild(segLabel(D, B, nAB, 21, 'b', fmt(dist(D, B), 1), COL.ink));
            if (!cramped) svg.appendChild(segLabel(A, E, nAC, 21, 'c', fmt(aeLen, 1), COL.ink));
            svg.appendChild(segLabel(E, C, nAC, 21, 'd', fmt(dist(E, C), 1), COL.ink));
            if (deLen >= 95) svg.appendChild(segLabel(D, E, { x: -nBC.x, y: -nBC.y }, 15, 'e', fmt(deLen, 1), COL.trans));
            svg.appendChild(segLabel(B, C, nBC, 19, 'f', fmt(dist(B, C), 1), COL.ink));

            // Hörnprickar + punktetiketter — riktning rakt ut från tyngdpunkten
            // (fungerar för godtycklig triangelform, håller etiketterna utanför).
            var cx = (A.x + B.x + C.x) / 3, cy = (A.y + B.y + C.y) / 3;
            function outFromCentroid(P) {
                var dx = P.x - cx, dy = P.y - cy, len = Math.hypot(dx, dy) || 1;
                return { x: dx / len, y: dy / len };
            }
            [[A, 'A'], [B, 'B'], [C, 'C']].forEach(function (item) {
                var P = item[0], letter = item[1];
                svg.appendChild(svgEl('circle', { cx: P.x, cy: P.y, r: 4, fill: COL.ink }));
                svg.appendChild(ptLabel(P, outFromCentroid(P), 16, letter, COL.ink));
            });
            svg.appendChild(svgEl('circle', { cx: D.x, cy: D.y, r: 4.5, fill: COL.trans }));
            svg.appendChild(ptLabel(D, nAB, dOff, 'D', COL.trans));
            svg.appendChild(svgEl('circle', { cx: E.x, cy: E.y, r: 4.5, fill: COL.trans }));
            svg.appendChild(ptLabel(E, nAC, eOff, 'E', COL.trans));

            // Träffytor (dras sist så de ligger överst)
            svg.appendChild(makeHit(A, 'A'));
            svg.appendChild(makeHit(B, 'B'));
            svg.appendChild(makeHit(C, 'C'));
            svg.appendChild(makeHit(D, 'D'));
        }

        // ── Rita "utlyft" jämförelse (steg 2) ────────────────────────────
        function drawLifted() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var A = state.A, B = state.B, C = state.C, t = state.t;
            var D = lerp(A, B, t), E = lerp(A, C, t);
            var bAbc = bbox([A, B, C]), bAde = bbox([A, D, E]);
            var wAbc = Math.max(bAbc.xmax - bAbc.xmin, 1), hAbc = Math.max(bAbc.ymax - bAbc.ymin, 1);
            var wAde = Math.max(bAde.xmax - bAde.xmin, 1), hAde = Math.max(bAde.ymax - bAde.ymin, 1);
            var marginL = 34, marginR = 34, marginT = 40, marginB = 20, gap0 = 46;
            var availW = W - marginL - marginR, availH = H2 - marginT - marginB;
            var S = Math.min(availW / (wAbc + wAde + gap0), availH / Math.max(hAbc, hAde), 0.72);
            if (!isFinite(S) || S <= 0) S = 0.3;

            var offXa = marginL, offYa = marginT + (availH - S * hAbc) / 2;
            var offXd = marginL + S * wAbc + S * gap0, offYd = marginT + (availH - S * hAde) / 2;
            function mapA(P) { return { x: offXa + S * (P.x - bAbc.xmin), y: offYa + S * (P.y - bAbc.ymin) }; }
            function mapD(P) { return { x: offXd + S * (P.x - bAde.xmin), y: offYd + S * (P.y - bAde.ymin) }; }

            var A1 = mapA(A), B1 = mapA(B), C1 = mapA(C);
            var A2 = mapD(A), D2 = mapD(D), E2 = mapD(E);

            svg2.appendChild(svgEl('polygon', { points: pts([A1, B1, C1]), fill: 'none', stroke: COL.ink, 'stroke-width': 2 }));
            svg2.appendChild(svgEl('polygon', { points: pts([A2, D2, E2]), fill: COL.fillTri, stroke: COL.trans, 'stroke-width': 2 }));

            var capAbc = svgEl('text', { x: offXa + S * wAbc / 2, y: marginT - 16, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.ink });
            capAbc.textContent = 'Hela triangeln';
            svg2.appendChild(capAbc);
            var capAde = svgEl('text', { x: offXd + S * wAde / 2, y: marginT - 16, 'font-size': 12.5, 'text-anchor': 'middle', fill: COL.trans });
            capAde.textContent = 'Topptriangeln';
            svg2.appendChild(capAde);

            [[A1, 'A', COL.ink], [B1, 'B', COL.ink], [C1, 'C', COL.ink]].forEach(function (item) {
                svg2.appendChild(svgEl('circle', { cx: item[0].x, cy: item[0].y, r: 3.2, fill: item[2] }));
                var lb = svgEl('text', { x: item[0].x, y: item[0].y - 8, 'font-size': 12, 'text-anchor': 'middle', fill: item[2] });
                lb.textContent = item[1];
                svg2.appendChild(lb);
            });
            [[A2, 'A', COL.trans], [D2, 'D', COL.trans], [E2, 'E', COL.trans]].forEach(function (item) {
                svg2.appendChild(svgEl('circle', { cx: item[0].x, cy: item[0].y, r: 3.2, fill: item[2] }));
                var lb = svgEl('text', { x: item[0].x, y: item[0].y - 8, 'font-size': 12, 'text-anchor': 'middle', fill: item[2] });
                lb.textContent = item[1];
                svg2.appendChild(lb);
            });
        }

        // ── Formler ────────────────────────────────────────────────────────
        function updateFormulas() {
            var A = state.A, B = state.B, C = state.C, t = state.t;
            var D = lerp(A, B, t), E = lerp(A, C, t);
            var AD = dist(A, D), DB = dist(D, B), AE = dist(A, E), EC = dist(E, C);
            var AB = dist(A, B), AC = dist(A, C), DE = dist(D, E), BC = dist(B, C);
            var r1 = AD / DB, r2 = AE / EC, sk = AD / AB;

            katexInto(formelT1, '\\dfrac{AD}{DB} = \\dfrac{' + fmtTex(AD, 1) + '}{' + fmtTex(DB, 1) + '} = ' + fmtTex(r1, 2));
            katexInto(formelT2, '\\dfrac{AE}{EC} = \\dfrac{' + fmtTex(AE, 1) + '}{' + fmtTex(EC, 1) + '} = ' + fmtTex(r2, 2));

            if (!state.interacted) {
                noteMain.innerHTML = 'Fundera innan du drar: om <em>AD</em> blir dubbelt så långt som ' +
                    '<em>DB</em> — blir <em>AE</em> också dubbelt så långt som <em>EC</em>?';
            } else if (Math.abs(r1 - r2) < 0.06 && Math.abs(r1 - 2) < 0.15) {
                noteMain.innerHTML = 'Precis — nu är <em>AD</em>/<em>DB</em> ≈ ' + fmt(r1, 1) + ' och ' +
                    '<em>AE</em>/<em>EC</em> ≈ ' + fmt(r2, 1) + ' också. Kvoterna följs alltid åt.';
            } else {
                noteMain.innerHTML = 'Kvoterna är exakt lika — oavsett var du drar transversalen eller ' +
                    'hur du formar triangeln. Det är transversalsatsen.';
            }

            katexInto(formelS2, '\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC} = ' + fmtTex(sk, 2));

            if (state.exampleShown) {
                katexInto(exK1, '\\dfrac{x}{10} = \\dfrac{4}{8}');
                katexInto(exK2, 'x = \\dfrac{4}{8} \\cdot 10 = 5');
                exAnswer.innerHTML = '<strong>Svar:</strong> <em>x</em> = 5 cm';
                katexInto(exAlt, '\\dfrac{4}{4+8} = \\dfrac{x}{x+10} \\implies x = 5');
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];

            noteMain.style.display = state.step === 1 ? '' : 'none';

            s2Head.style.display = state.step === 2 ? '' : 'none';
            formelS2.style.display = state.step === 2 ? '' : 'none';
            liftBtn.style.display = state.step === 2 ? '' : 'none';
            liftBtn.textContent = state.lifted ? 'Dölj kopian' : 'Lyft ut topptriangeln';
            scene2.style.display = (state.step === 2 && state.lifted) ? '' : 'none';
            scene2.style.opacity = (state.step === 2 && state.lifted) ? '1' : '0';
            scene2.style.transform = (state.step === 2 && state.lifted) ? 'translateY(0)' : 'translateY(-6px)';

            exampleBtn.style.display = state.step === 3 ? '' : 'none';
            formelExample.style.display = (state.step === 3 && state.exampleShown) ? '' : 'none';
            noteBisektris.style.display = state.step === 3 ? '' : 'none';

            actions.style.display = (state.step === 2 || state.step === 3) ? '' : 'none';

            drawMain();
            if (state.step === 2 && state.lifted) drawLifted();
            updateFormulas();
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma2c-4.9'] = { mount: mount };
})();
