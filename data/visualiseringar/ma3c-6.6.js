/* ma3c-6.6.js — visualisering: "Sinussatsen på den omskrivna cirkeln".
 * Hör till ma3c-6.6 (Sinussatsen) och ma3c-6.8 (Tillämpningar av
 * triangelsatserna).
 *
 * Kärninsikt: kvoten a/sin A är densamma för alla tre hörnparen i en
 * triangel — och den kvoten är inget mindre än diametern hos den cirkel
 * triangeln är inskriven i (2R). Randvinkelsatsen (ma2c-4.11) ligger bakom:
 * en sida är en korda, dess motstående vinkel är en randvinkel som står på
 * bågen mellan de två andra hörnen, och kordans längd ges av 2R·sin(vinkeln).
 *
 * Beteckningar följer ma3c-6.6.md/ma3c-6.8.md exakt: triangel ABC, sidan a
 * motstående A, b motstående B, c motstående C. Formen som ställs upp är
 * den alternativa (samma som Exempel 1): a/sin A = b/sin B = c/sin C.
 * Startläget (A = 80°, B = 30°, C = 70°, R = 5,0) återger Exempel 1:s
 * vinklar (A = 180° − 30° − 70° = 80°).
 *
 * Tre steg (lager):
 *   1. Tre kvoter, samma tal  — triangel inskriven i cirkeln, hörnen A, B, C
 *                                dragbara på randen. Tre färgkodade
 *                                KaTeX-rader visar att alla tre kvoter är
 *                                lika. Gissa-först i instruktionen.
 *   2. Dra ett hörn           — + färgade bågar på cirkelranden som binder
 *                                varje sida/vinkel-par till sin motstående
 *                                båge (kopplingen till randvinkelsatsen).
 *   3. Konstanten är diametern — + medelpunkten O och en diameterlinje,
 *                                R-glidare, kvotraderna kompletteras med
 *                                "= 2R". Not: utblick bortom genomgången.
 *
 * 2R (den omskrivna cirkelns diameter) nämns INTE i ma3c-6.6.md/ma3c-6.8.md
 * — steg 3 presenteras därför uttryckligen som en utblick, inte som
 * facit-repetition av genomgången.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-4.11/ma3c-2.3). API: window.VISUALISERINGAR['<id>'] = { mount }.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0",
    //    trimmar överflödiga nollor — samma helper som övriga moduler) ────
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

    // ── Vinkelgeometri (grader, atan2-konvention: 0°=höger, 90°=ned) ──────
    function normDeg(a) { a = a % 360; if (a < 0) a += 360; return a; }
    function shortSignedDiff(a, b) {
        var d = normDeg(b - a);
        if (d > 180) d -= 360;
        return d;
    }
    function pt(cx, cy, r, angleDeg) {
        var rad = angleDeg * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }
    // Sweep-/large-arc-flaggor: sidan väljs explicit via goForward (samma
    // som ma2c-4.11 — behövs för bågar där vilken sida som saknar den tredje
    // punkten avgör riktningen, t.ex. exakt vid en diameter).
    function arcSideFlags(a1, a2, goForward) {
        var d = normDeg(a2 - a1);
        if (goForward) return { laf: d > 180 ? 1 : 0, sf: 1 };
        var back = 360 - d;
        return { laf: back > 180 ? 1 : 0, sf: 0 };
    }
    function arcPathSide(cx, cy, r, a1, a2, goForward) {
        var f = arcSideFlags(a1, a2, goForward);
        var p1 = pt(cx, cy, r, a1), p2 = pt(cx, cy, r, a2);
        return 'M ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) + ' A ' + r + ' ' + r +
            ' 0 ' + f.laf + ' ' + f.sf + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
    }
    // Korta vägens vinkelbåge (för en triangels inre vinklar, alltid < 180°).
    function arcFlagsShort(angle1, angle2) {
        var cw = normDeg(angle2 - angle1);
        return cw <= 180 ? { laf: 0, sf: 1 } : { laf: 0, sf: 0 };
    }
    function arcPathShort(cx, cy, r, a1, a2) {
        var f = arcFlagsShort(a1, a2);
        var p1 = pt(cx, cy, r, a1), p2 = pt(cx, cy, r, a2);
        return 'M ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) + ' A ' + r + ' ' + r +
            ' 0 ' + f.laf + ' ' + f.sf + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
    }
    function bisectorShort(a1, a2) { return normDeg(a1 + shortSignedDiff(a1, a2) / 2); }
    // Anchor/dy för en radiellt placerad etikett i riktningen angleDeg.
    function radialAnchor(angleDeg) {
        var rad = angleDeg * Math.PI / 180;
        var cx = Math.cos(rad), cy = Math.sin(rad);
        var anchor = cx > 0.35 ? 'start' : (cx < -0.35 ? 'end' : 'middle');
        var dy = cy > 0.35 ? 13 : (cy < -0.35 ? -8 : 4.5);
        return { anchor: anchor, dy: dy };
    }
    // Vinkeln vid X som ser kordan mellan Y och Z (randvinkelsatsens
    // grundformel — samma logik som ma2c-4.11:s computeGeometry, generell
    // för valfritt hörnval).
    function vertexAngle(aX, aY, aZ) {
        var d = normDeg(aZ - aY);
        var isXOnForwardArc = normDeg(aX - aY) < d;
        var centralUse = isXOnForwardArc ? (360 - d) : d;
        return centralUse / 2;
    }
    // Cirkelbågen YZ som INTE innehåller X ("den gemensamma bågen" för
    // sidan/vinkelparet vid X).
    function oppositeArcPath(r, aX, aY, aZ) {
        var d = normDeg(aZ - aY);
        var isXOnForwardArc = normDeg(aX - aY) < d;
        return arcPathSide(O.x, O.y, r, aY, aZ, !isXOnForwardArc);
    }
    // Bredaste lediga luckan mellan tre vinklar (för att placera
    // diametermåttet i fri yta, oavsett hur hörnen är dragna).
    function widestGapMid(angles) {
        var arr = angles.slice().sort(function (x, y) { return x - y; });
        var n = arr.length, bestGap = -1, bestMid = 0;
        for (var i = 0; i < n; i++) {
            var a1 = arr[i];
            var a2 = i + 1 < n ? arr[i + 1] : arr[0] + 360;
            var gap = a2 - a1;
            if (gap > bestGap) { bestGap = gap; bestMid = normDeg(a1 + gap / 2); }
        }
        return bestMid;
    }
    function arrowHeadPoints(tipX, tipY, dirDeg, len, half) {
        var rad = dirDeg * Math.PI / 180;
        var bx = tipX - len * Math.cos(rad), by = tipY - len * Math.sin(rad);
        var perp = rad + Math.PI / 2;
        var p1x = bx + half * Math.cos(perp), p1y = by + half * Math.sin(perp);
        var p2x = bx - half * Math.cos(perp), p2y = by - half * Math.sin(perp);
        return tipX.toFixed(1) + ',' + tipY.toFixed(1) + ' ' +
            p1x.toFixed(1) + ',' + p1y.toFixed(1) + ' ' +
            p2x.toFixed(1) + ',' + p2y.toFixed(1);
    }

    // ── Färger (per hörnpar: sida ↔ motstående vinkel ↔ motstående båge) ──
    var COL = {
        ink: '#1f2530',
        a: '#4a7d3a',      // sida a / vinkel A — grön
        b: '#c8324a',      // sida b / vinkel B — röd/accent
        c: '#2563c9',      // sida c / vinkel C — blå
        dash: 'rgba(31,37,48,0.45)'
    };

    var MIN_GAP = 25;   // minsta vinkelavstånd (grader) mellan A, B, C

    // ── Scen-geometri (fast pixelradie — R-glidaren skalar bara talen) ────
    var W = 560, H = 410;
    var O = { x: 280, y: 200 }, R = 140;
    var ANG_R = 34, LABEL_R = R + 24, HIT_R = 18, DOT_R = 4.5;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        // Startläge: A = 80°, B = 30°, C = 70° — samma vinklar som
        // Exempel 1 i genomgången (A = 180° − 30° − 70°).
        var state = { aA: 250, aB: 30, aC: 190, Rw: 5.0, step: 1, interacted: false };
        var dragging = null;   // 'A' | 'B' | 'C' | null

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Sinussatsen på den omskrivna cirkeln';
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
            'aria-label': 'Interaktiv figur: en triangel ABC inskriven i en cirkel. ' +
                'Dra hörnen A, B och C längs cirkelranden och se sidorna a, b, c samt ' +
                'vinklarna A, B, C ändras, medan kvoten mellan en sida och sinus för ' +
                'dess motstående vinkel förblir densamma.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.a;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.b;
        card.appendChild(formelB);

        var formelC = document.createElement('div');
        formelC.className = 'lab-vis-formel';
        formelC.style.color = COL.c;
        card.appendChild(formelC);

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
            { n: 1, label: '1 · Tre kvoter, samma tal' },
            { n: 2, label: '2 · Dra ett hörn' },
            { n: 3, label: '3 · Konstanten är diametern' }
        ];
        var INSTR = {
            1: 'Tre olika sidor, tre olika vinklar. Gissa först: vilken sida hör ihop ' +
               'med vilken vinkel, och vad skulle kunna vara lika mellan dem? Dra ' +
               'hörnen <em>A</em>, <em>B</em> och <em>C</em> längs cirkeln och jämför ' +
               'raderna nedanför.',
            2: 'Dra ett hörn (testa <em>C</em>) längs cirkelranden. Triangelns form ' +
               'ändras hela tiden — sidorna och vinklarna byter värde. Men de tre ' +
               'kvoterna nedanför står stilla. De färgade bågarna på cirkelranden ' +
               'visar varför: en sida är en korda, och dess motstående vinkel är en ' +
               'randvinkel som står på just den bågen.',
            3: 'Medelpunkten <em>O</em> och diameterlinjen avslöjar vad kvoten faktiskt ' +
               'är. Dra <em>R</em>-glidaren och se alla tre kvoterna följa 2<em>R</em> ' +
               'exakt — sambandet gäller för alla trianglar inskrivna i samma cirkel.'
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
        legend.appendChild(legendItem(COL.a, 'sida <em>a</em> / vinkel <em>A</em>'));
        legend.appendChild(legendItem(COL.b, 'sida <em>b</em> / vinkel <em>B</em>'));
        legend.appendChild(legendItem(COL.c, 'sida <em>c</em> / vinkel <em>C</em>'));

        // ── Knapp: slumpa triangel ───────────────────────────────────────
        var randomBtn = document.createElement('button');
        randomBtn.type = 'button';
        randomBtn.className = 'lab-btn';
        randomBtn.textContent = 'Slumpa triangel';
        randomBtn.addEventListener('click', function () {
            var g1 = MIN_GAP + Math.random() * (360 - 3 * MIN_GAP);
            var g2 = MIN_GAP + Math.random() * (360 - 2 * MIN_GAP - g1);
            var offset = Math.random() * 360;
            state.aA = Math.round(normDeg(offset));
            state.aB = Math.round(normDeg(state.aA + g1));
            state.aC = Math.round(normDeg(state.aB + g2));
            state.interacted = true;
            update();
        });
        actions.appendChild(randomBtn);

        // ── R-glidare (endast relevant/synlig i steg 3) ──────────────────
        var Rw = { min: 3.0, max: 8.0, step: 0.1 };
        var rowRw = (function () {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';
            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = 'R';
            lbl.appendChild(em);
            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = Rw.min; slider.max = Rw.max; slider.step = Rw.step; slider.value = state.Rw;
            slider.setAttribute('aria-label', 'Cirkelns radie R');
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = Rw.min; field.max = Rw.max; field.step = Rw.step; field.value = state.Rw;
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Cirkelns radie R');
            function paint() {
                var pct = clampNum((state.Rw - Rw.min) / (Rw.max - Rw.min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + COL.c + ' 0%, ' +
                    COL.c + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                state.Rw = clampNum(v, Rw.min, Rw.max);
                if (from !== 'slider') slider.value = state.Rw;
                if (from !== 'field') field.value = fmt(state.Rw, 1).replace(',', '.');
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(String(field.value).replace(',', '.')), 'field'); });
            field.addEventListener('blur', function () {
                field.value = fmt(state.Rw, 1).replace(',', '.');
            });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return {
                sync: function () {
                    slider.value = state.Rw;
                    field.value = fmt(state.Rw, 1).replace(',', '.');
                    paint();
                }
            };
        })();

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.aA = 250; state.aB = 30; state.aC = 190;
            state.Rw = 5.0; state.interacted = false;
            rowRw.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Drag ──────────────────────────────────────────────────────────
        function clampAgainst(angle, others) {
            others.forEach(function (oa) {
                var diff = shortSignedDiff(oa, angle);
                if (Math.abs(diff) < MIN_GAP) {
                    angle = normDeg(oa + (diff >= 0 ? MIN_GAP : -MIN_GAP));
                }
            });
            return angle;
        }
        function clientToAngle(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return normDeg(Math.atan2(py - O.y, px - O.x) * 180 / Math.PI);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var raw = Math.round(clientToAngle(e.clientX, e.clientY));
            if (dragging === 'A') state.aA = clampAgainst(raw, [state.aB, state.aC]);
            else if (dragging === 'B') state.aB = clampAgainst(raw, [state.aA, state.aC]);
            else state.aC = clampAgainst(raw, [state.aA, state.aB]);
            state.interacted = true;
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);
        function makeHit(label, angle) {
            var p = pt(O.x, O.y, R, angle);
            var hit = svgEl('circle', {
                cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: HIT_R, fill: 'rgba(0,0,0,0)'
            });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = label;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            return hit;
        }

        // ── Triangelns vinklar/sidor (heltalsgrader; C = 180° − A − B så
        //    att vinkelsumman alltid blir exakt 180° i det som visas) ─────
        function triangleGeometry() {
            var Adisp = Math.round(vertexAngle(state.aA, state.aB, state.aC));
            var Bdisp = Math.round(vertexAngle(state.aB, state.aA, state.aC));
            var Cdisp = 180 - Adisp - Bdisp;
            var Rw2 = state.Rw;
            return {
                Adisp: Adisp, Bdisp: Bdisp, Cdisp: Cdisp,
                aVal: 2 * Rw2 * Math.sin(Adisp * Math.PI / 180),
                bVal: 2 * Rw2 * Math.sin(Bdisp * Math.PI / 180),
                cVal: 2 * Rw2 * Math.sin(Cdisp * Math.PI / 180),
                kvot: 2 * Rw2
            };
        }

        // ── Rita en vinkelbåge vid ett hörn (eller rätvinkelsymbol) ───────
        function drawVertexAngle(Xp, dirXY, dirXZ, angleDeg, color) {
            var frag = [];
            if (Math.abs(angleDeg - 90) < 0.5) {
                var s = 14;
                var q1 = pt(Xp.x, Xp.y, s, dirXY), q2 = pt(Xp.x, Xp.y, s, dirXZ);
                var corner = { x: q1.x + q2.x - Xp.x, y: q1.y + q2.y - Xp.y };
                frag.push(svgEl('polyline', {
                    points: q1.x.toFixed(1) + ',' + q1.y.toFixed(1) + ' ' +
                        corner.x.toFixed(1) + ',' + corner.y.toFixed(1) + ' ' +
                        q2.x.toFixed(1) + ',' + q2.y.toFixed(1),
                    fill: 'none', stroke: color, 'stroke-width': 2
                }));
            } else {
                frag.push(svgEl('path', {
                    d: arcPathShort(Xp.x, Xp.y, ANG_R, dirXY, dirXZ),
                    fill: 'none', stroke: color, 'stroke-width': 2
                }));
            }
            var bis = bisectorShort(dirXY, dirXZ);
            var lp = pt(Xp.x, Xp.y, ANG_R + 17, bis);
            var anc = radialAnchor(bis);
            frag.push(svgVarText(
                { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1),
                  'font-size': 14, 'text-anchor': anc.anchor, fill: color },
                [angleDeg + '°']));
            return frag;
        }

        // ── Rita en sidetikett i fri yta mot cirkelns mitt (aldrig ut mot
        //    den markerade cirkelbågen på randen). Etiketten visar bara
        //    BOKSTAVEN (som i genomgångens huvudfigur) — värdet finns redan,
        //    samma färg, i kvotraden nedanför, så figuren hålls kompakt och
        //    kolliderar mindre med vinkeletiketterna även i trånga trianglar.
        function sideLabel(P1, P2, letter, color) {
            var M = { x: (P1.x + P2.x) / 2, y: (P1.y + P2.y) / 2 };
            // O→M är alltid vinkelrät mot kordan (cirkelgeometri), så att
            // flytta längs den linjen — ut mot randen ELLER in mot O — ger
            // ett offset vinkelrätt bort från sidan, aldrig längs den.
            var dir = normDeg(Math.atan2(M.y - O.y, M.x - O.x) * 180 / Math.PI);
            var distFromO = Math.hypot(M.x - O.x, M.y - O.y);
            var targetDist = distFromO + 16;
            if (targetDist > R - 14) targetDist = Math.max(distFromO - 16, 8);
            var lp = pt(O.x, O.y, targetDist, dir);
            var dy = radialAnchor(dir).dy;
            return svgVarText(
                { x: lp.x.toFixed(1), y: (lp.y + dy).toFixed(1),
                  'font-size': 14, 'text-anchor': 'middle', fill: color },
                ['*' + letter]);
        }

        // ── Rita scenen ──────────────────────────────────────────────────
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var g = triangleGeometry();
            var A = pt(O.x, O.y, R, state.aA);
            var B = pt(O.x, O.y, R, state.aB);
            var C = pt(O.x, O.y, R, state.aC);

            // Cirkeln
            svg.appendChild(svgEl('circle', {
                cx: O.x, cy: O.y, r: R, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6
            }));

            // Motstående cirkelbågar (steg 2+) — binder varje sida/vinkel-
            // par till bågen mellan de två ANDRA hörnen.
            if (state.step >= 2) {
                svg.appendChild(svgEl('path', {
                    d: oppositeArcPath(R, state.aA, state.aB, state.aC),
                    fill: 'none', stroke: COL.a, 'stroke-width': 4, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round'
                }));
                svg.appendChild(svgEl('path', {
                    d: oppositeArcPath(R, state.aB, state.aA, state.aC),
                    fill: 'none', stroke: COL.b, 'stroke-width': 4, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round'
                }));
                svg.appendChild(svgEl('path', {
                    d: oppositeArcPath(R, state.aC, state.aA, state.aB),
                    fill: 'none', stroke: COL.c, 'stroke-width': 4, 'stroke-dasharray': '8 6', 'stroke-linecap': 'round'
                }));
            }

            // Diameterlinjen (steg 3) — placerad i den bredaste lediga
            // luckan mellan hörnen, så den aldrig korsar triangeln.
            if (state.step >= 3) {
                var dirMid = widestGapMid([state.aA, state.aB, state.aC]);
                var d1 = pt(O.x, O.y, R, dirMid), d2 = pt(O.x, O.y, R, dirMid + 180);
                svg.appendChild(svgEl('line', {
                    x1: d1.x.toFixed(1), y1: d1.y.toFixed(1), x2: d2.x.toFixed(1), y2: d2.y.toFixed(1),
                    stroke: COL.ink, 'stroke-width': 1.4, 'stroke-dasharray': '5 4', 'stroke-linecap': 'butt'
                }));
                svg.appendChild(svgEl('polygon', { points: arrowHeadPoints(d1.x, d1.y, dirMid, 8, 4), fill: COL.ink }));
                svg.appendChild(svgEl('polygon', { points: arrowHeadPoints(d2.x, d2.y, dirMid + 180, 8, 4), fill: COL.ink }));
                var diamLp = pt(O.x, O.y, R + 18, dirMid);
                var diamAnc = radialAnchor(dirMid);
                svg.appendChild(svgVarText(
                    { x: diamLp.x.toFixed(1), y: (diamLp.y + diamAnc.dy).toFixed(1),
                      'font-size': 14, 'text-anchor': diamAnc.anchor, fill: COL.ink },
                    ['2', '*R', ' = ' + fmt(g.kvot, 1) + ' cm']));
                svg.appendChild(svgEl('circle', { cx: O.x, cy: O.y, r: 3.4, fill: COL.ink }));
                var oDir = normDeg(dirMid + 90);
                var oLp = pt(O.x, O.y, 15, oDir);
                var oAnc = radialAnchor(oDir);
                svg.appendChild(svgVarText(
                    { x: oLp.x.toFixed(1), y: (oLp.y + oAnc.dy).toFixed(1),
                      'font-size': 13, 'text-anchor': oAnc.anchor, fill: COL.ink },
                    ['O']));
            }

            // Triangelns sidor, färgkodade per motstående hörn.
            svg.appendChild(svgEl('line', { x1: B.x.toFixed(2), y1: B.y.toFixed(2), x2: C.x.toFixed(2), y2: C.y.toFixed(2), stroke: COL.a, 'stroke-width': 2.2 }));
            svg.appendChild(svgEl('line', { x1: A.x.toFixed(2), y1: A.y.toFixed(2), x2: C.x.toFixed(2), y2: C.y.toFixed(2), stroke: COL.b, 'stroke-width': 2.2 }));
            svg.appendChild(svgEl('line', { x1: A.x.toFixed(2), y1: A.y.toFixed(2), x2: B.x.toFixed(2), y2: B.y.toFixed(2), stroke: COL.c, 'stroke-width': 2.2 }));

            // Sidetiketter
            svg.appendChild(sideLabel(B, C, 'a', COL.a));
            svg.appendChild(sideLabel(A, C, 'b', COL.b));
            svg.appendChild(sideLabel(A, B, 'c', COL.c));

            // Vinkelbågar vid hörnen
            var dirAB = normDeg(Math.atan2(B.y - A.y, B.x - A.x) * 180 / Math.PI);
            var dirAC = normDeg(Math.atan2(C.y - A.y, C.x - A.x) * 180 / Math.PI);
            drawVertexAngle(A, dirAB, dirAC, g.Adisp, COL.a).forEach(function (n) { svg.appendChild(n); });
            var dirBA = normDeg(Math.atan2(A.y - B.y, A.x - B.x) * 180 / Math.PI);
            var dirBC = normDeg(Math.atan2(C.y - B.y, C.x - B.x) * 180 / Math.PI);
            drawVertexAngle(B, dirBA, dirBC, g.Bdisp, COL.b).forEach(function (n) { svg.appendChild(n); });
            var dirCA = normDeg(Math.atan2(A.y - C.y, A.x - C.x) * 180 / Math.PI);
            var dirCB = normDeg(Math.atan2(B.y - C.y, B.x - C.x) * 180 / Math.PI);
            drawVertexAngle(C, dirCA, dirCB, g.Cdisp, COL.c).forEach(function (n) { svg.appendChild(n); });

            // Hörnetiketter A, B, C (upprätt, som i genomgångens figur)
            [['A', state.aA], ['B', state.aB], ['C', state.aC]].forEach(function (pr) {
                var lp = pt(O.x, O.y, LABEL_R, pr[1]);
                var anc = radialAnchor(pr[1]);
                svg.appendChild(svgVarText(
                    { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1),
                      'font-size': 15, 'text-anchor': anc.anchor, fill: COL.ink },
                    [pr[0]]));
            });

            // Punktmarkörer
            [A, B, C].forEach(function (p) {
                svg.appendChild(svgEl('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: DOT_R, fill: COL.ink }));
            });

            // Dragbara träffytor — sist, överst.
            svg.appendChild(makeHit('A', state.aA));
            svg.appendChild(makeHit('B', state.aB));
            svg.appendChild(makeHit('C', state.aC));

            return g;
        }

        // ── Formler ──────────────────────────────────────────────────────
        function updateFormulas(g) {
            var kvotT = fmtTex(g.kvot, 1);
            var tail = state.step >= 3 ? ' = 2R' : '';
            katexInto(formelA,
                '\\dfrac{a}{\\sin A} = \\dfrac{' + fmtTex(g.aVal, 1) + '}{\\sin ' + g.Adisp + '^\\circ}' + tail + ' = ' + kvotT);
            katexInto(formelB,
                '\\dfrac{b}{\\sin B} = \\dfrac{' + fmtTex(g.bVal, 1) + '}{\\sin ' + g.Bdisp + '^\\circ}' + tail + ' = ' + kvotT);
            katexInto(formelC,
                '\\dfrac{c}{\\sin C} = \\dfrac{' + fmtTex(g.cVal, 1) + '}{\\sin ' + g.Cdisp + '^\\circ}' + tail + ' = ' + kvotT);
        }

        // ── Anteckning ───────────────────────────────────────────────────
        function updateNote(g) {
            var html = '';
            if (state.step === 1) {
                if (state.interacted) {
                    html = 'Alla tre kvoterna ovan är exakt lika, ' + fmt(g.kvot, 1) + ' — trots ' +
                        'att sidorna och vinklarna är helt olika för olika hörn. Det är ' +
                        'sinussatsen.';
                }
            } else if (state.step === 2) {
                html = 'Just nu ger alla tre kvoter <em>' + fmt(g.kvot, 1) + '</em>, oavsett vilket ' +
                    'hörn du senast drog. Den färgade bågen på cirkelranden är den båge ' +
                    'som hör till respektive sida/vinkel-par.';
            } else if (state.step === 3) {
                html = 'Här är förklaringen: kvoten <em>a</em>/sin<em>A</em> är alltid lika med ' +
                    'diametern 2<em>R</em> hos den cirkel som triangeln är inskriven i, oavsett ' +
                    'triangelns form. Det här är en utblick bortom genomgången, men följer ' +
                    'direkt av randvinkelsatsen (medelpunktsvinkeln till en cirkelbåge är ' +
                    'dubbelt så stor som randvinkeln på samma båge).';
            }
            note.innerHTML = html;
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            controls.style.display = state.step === 3 ? '' : 'none';
            var g = draw();
            updateFormulas(g);
            updateNote(g);
        }

        update();

        return {
            destroy: function () {
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma3c-6.6'] = api;
    window.VISUALISERINGAR['ma3c-6.8'] = api;
})();
