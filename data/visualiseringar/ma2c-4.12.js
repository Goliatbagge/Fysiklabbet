/* ma2c-4.12.js — visualisering: "Kordasatsen — rektangeln som vägrar ändra
 * area" (kordasatsen).
 *
 * Kärninsikt: två kordor som skär varandra i en punkt E inuti cirkeln delas
 * upp i segment a, b (korda 1) och c, d (korda 2) — och oavsett hur man
 * drar gäller alltid a · b = c · d (potensen hos punkten E). Eleven
 * UPPLEVER invariansen genom att dra i kordornas ändpunkter och i själva
 * skärningspunkten E och se produkterna stå stilla.
 *
 * Beteckningar spelar teorigenomgången ma2c-4.12.md exakt: kordasatsen
 * a · b = c · d, och bevisfigurens punktnamn A, B, C, D, E med
 * a = AE, b = EC (korda 1 = AC), c = DE, d = EB (korda 2 = DB).
 *
 * Tre steg (lager):
 *   1. Dra och jämför  — cirkel + två kordor, gissa-först, live-formler
 *                         a·b = ... och c·d = ... (färgkodade, alltid lika).
 *   2. Rektanglarna     — samma segment som sidor i två rektanglar (a×b
 *                         grönt, c×d blått) som morfar men aldrig ändrar
 *                         area.
 *   3. Satsen           — kordasatsen i KaTeX + kryssruta "Visa trianglarna"
 *                         som färgar bevisets två likformiga trianglar
 *                         ADE och BCE (hjälpsträckor AD, BC streckade).
 *
 * ── Interaktionsval (dokumenterat enligt bygginstruktionen) ──────────────
 * Tillståndet är INTE de fyra ändpunktsvinklarna utan (E, θ1, θ2): E är en
 * fri 2D-punkt inuti cirkeln, och θ1/θ2 är de båda kordornas riktningar.
 * Varje korda är då linjen genom E med riktning θ — dess två ändpunkter
 * fås som de två skärningarna med cirkeln (linje–cirkel, andragradsformel).
 *   • Drar man E: kordornas RIKTNINGAR (θ1, θ2) hålls fasta, båda kordornas
 *     ändpunkter räknas om så de fortsätter gå genom nya E.
 *   • Drar man en ändpunkt (A/B/C/D): E hålls fast, den kordans riktning
 *     räknas om så linjen genom E fortsätter träffa cirkeln exakt vid den
 *     nya (vinkel-snappade) ändpunkten — den andra änden av samma korda
 *     räknas om automatiskt.
 * Detta är matematiskt robust: potensen hos punkten (a·b = c·d = R² − |OE|²)
 * gäller för VILKEN riktning som helst genom E, så invarianten håller i
 * alla lägen oavsett vilken av de fem punkterna som dras. Varje dragning
 * valideras (minsta segmentlängd, minsta vinkelavstånd mellan alla fyra
 * ändpunkter, max avstånd E–centrum) innan den appliceras — annars ignoreras
 * uppdateringen (mjuk klämning vid gränsen, aldrig ett trasigt läge).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-4.11 / ma3c-2.3).
 * API: window.VISUALISERINGAR['ma2c-4.12'] = { mount(el) → { destroy() } }.
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
    function radialAnchor(angleDeg) {
        var rad = angleDeg * Math.PI / 180;
        var cx = Math.cos(rad), cy = Math.sin(rad);
        var anchor = cx > 0.35 ? 'start' : (cx < -0.35 ? 'end' : 'middle');
        var dy = cy > 0.35 ? 13 : (cy < -0.35 ? -8 : 4.5);
        return { anchor: anchor, dy: dy };
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        chord1: '#4a7d3a',     // korda AC (a, b) — grön
        chord2: '#2563c9',     // korda DB (c, d) — blå
        tri1: '#c8324a',       // triangel ADE — accentröd
        tri2: '#7c5cbf',       // triangel BCE — lila
        dash: 'rgba(31,37,48,0.45)'
    };

    // ── Scen-geometri (cirkeln) ─────────────────────────────────────────
    var W = 560, H = 400;
    var O = { x: 200, y: 205 }, R = 145;
    var LABEL_R = R + 22;
    var UNIT_PX = 30;                 // px per längdenhet i segmentvärdena
    // MAX_E_DIST begränsar hur nära randen E får dras. Värsta tänkbara
    // segment (när en kordas riktning råkar peka mot närmaste randpunkt)
    // blir R − |OE|, så med 0,58 · R håller sig minsta möjliga segment kring
    // 2 enheter (60 px) — tillräckligt för att etiketterna (offset 20 px)
    // aldrig ska klämmas ihop mot E-etiketten eller punktbokstäverna, även
    // i värsta hörnfallet.
    var MAX_E_DIST = R * 0.58;
    var MIN_SEG_UNITS = 0.8;          // minsta tillåtna segmentlängd (extra spärr)
    var MIN_PT_GAP = 16;              // min. vinkelavstånd (grader) mellan A,B,C,D
    var HIT_R = 17, DOT_R = 4.6;

    // ── Rektangelscenen (steg 2) ────────────────────────────────────────
    var W2 = 560, H2 = 250;
    var RECT_SCALE = 20;              // px per längdenhet i rektanglarna
    var RECT_Y0 = 208, RECT_CX1 = 150, RECT_CX2 = 410;

    var DEFAULT_STATE = { ex: O.x - 15, ey: O.y + 20, th1: 260, th2: 165 };

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            ex: DEFAULT_STATE.ex, ey: DEFAULT_STATE.ey,
            th1: DEFAULT_STATE.th1, th2: DEFAULT_STATE.th2,
            step: 1, revealed: false, showTriangles: false
        };
        var dragging = null;   // 'A' | 'B' | 'C' | 'D' | 'E' | null

        // ── Ren geometri ──────────────────────────────────────────────────
        function computeChord(ex, ey, thetaDeg) {
            var rad = thetaDeg * Math.PI / 180;
            var ux = Math.cos(rad), uy = Math.sin(rad);
            var rx = ex - O.x, ry = ey - O.y;
            var k = rx * ux + ry * uy;
            var rr = rx * rx + ry * ry;
            var disc = k * k + (R * R - rr);
            var sq = Math.sqrt(Math.max(0, disc));
            var sPos = -k + sq, sNeg = -k - sq;
            return {
                fwd: { x: ex + sPos * ux, y: ey + sPos * uy },
                bwd: { x: ex + sNeg * ux, y: ey + sNeg * uy },
                sPos: sPos, sNeg: sNeg, ux: ux, uy: uy
            };
        }
        function computeGeometry(s) {
            var c1 = computeChord(s.ex, s.ey, s.th1);
            var c2 = computeChord(s.ex, s.ey, s.th2);
            return {
                A: c1.fwd, C: c1.bwd, a: c1.sPos / UNIT_PX, b: -c1.sNeg / UNIT_PX,
                D: c2.fwd, B: c2.bwd, c: c2.sPos / UNIT_PX, d: -c2.sNeg / UNIT_PX,
                E: { x: s.ex, y: s.ey }, th1: s.th1, th2: s.th2
            };
        }
        function angleAround(P) { return normDeg(Math.atan2(P.y - O.y, P.x - O.x) * 180 / Math.PI); }

        function isValidState(ex, ey, th1, th2) {
            if (Math.hypot(ex - O.x, ey - O.y) > MAX_E_DIST + 0.5) return false;
            var g = computeGeometry({ ex: ex, ey: ey, th1: th1, th2: th2 });
            if (g.a < MIN_SEG_UNITS || g.b < MIN_SEG_UNITS || g.c < MIN_SEG_UNITS || g.d < MIN_SEG_UNITS) return false;
            var angs = [angleAround(g.A), angleAround(g.B), angleAround(g.C), angleAround(g.D)];
            for (var i = 0; i < 4; i++) {
                for (var j = i + 1; j < 4; j++) {
                    if (Math.abs(shortSignedDiff(angs[i], angs[j])) < MIN_PT_GAP) return false;
                }
            }
            return true;
        }

        // Etikett-placering: välj den av två vinkelräta offset-riktningar som
        // ligger längst bort från DEN ANDRA kordans linje (garanterar att
        // segmentvärdet aldrig hamnar på den korsande kordan), och returnera
        // även vilken vinkel som valdes så texten kan FLÖDA BORT från linjen
        // (text-anchor start/end via radialAnchor) i stället för att centreras
        // på offset-punkten — annars kan långa etiketter ("b = 4,23") svepa
        // tillbaka över den egna kordan när ankaret är "middle".
        function pickPerpOffset(mid, thetaDeg, offsetPx, E, otherThetaDeg) {
            var a1 = normDeg(thetaDeg + 90), a2 = normDeg(thetaDeg - 90);
            var r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
            var c1 = { x: mid.x + offsetPx * Math.cos(r1), y: mid.y + offsetPx * Math.sin(r1), angle: a1 };
            var c2 = { x: mid.x + offsetPx * Math.cos(r2), y: mid.y + offsetPx * Math.sin(r2), angle: a2 };
            var ux = Math.cos(otherThetaDeg * Math.PI / 180), uy = Math.sin(otherThetaDeg * Math.PI / 180);
            function distLine(P) { return Math.abs((P.x - E.x) * uy - (P.y - E.y) * ux); }
            var chosen = distLine(c1) >= distLine(c2) ? c1 : c2;
            // Punkter nära cirkelns rand (t.ex. segment a/c/d nära en
            // ändpunkt) kan få sin vinkelräta offset tryckt UT genom randen,
            // så texten hamnar ovanpå cirkellinjen. Dra tillbaka radiellt mot
            // O om det händer — etiketter ska alltid ligga inuti cirkeln.
            var dO = Math.hypot(chosen.x - O.x, chosen.y - O.y);
            if (dO > R - 12) {
                var sc = (R - 12) / dO;
                chosen = { x: O.x + (chosen.x - O.x) * sc, y: O.y + (chosen.y - O.y) * sc, angle: chosen.angle };
            }
            return chosen;
        }
        // Väljer E-etikettens position: provar vinklar runt HELA E (var
        // 15:e grad) på tre radier och tar den kombination som ligger
        // längst bort från ALLA fyra segmentetiketter. En första idé
        // (begränsa sökningen till "öppna sektorn" mellan kordornas fyra
        // strålar) visade sig otillräcklig: segmentetiketterna är själva
        // offsatta från sina segmentmitter (inte från E), så de kan ändå
        // hamna INNANFÖR den teoretiskt öppna sektorn när E dras mot ett
        // hörn och två segment från olika kordor blir korta samtidigt.
        // Att söka fritt runt hela E och utvärdera det faktiska avståndet
        // till varje etikett är robust oavsett var de landar.
        function placeELabel(E, segLabelPts) {
            var best = null, bestScore = -1;
            [16, 24, 32].forEach(function (radius) {
                for (var ang = 0; ang < 360; ang += 15) {
                    var cand = pt(E.x, E.y, radius, ang);
                    var score = Infinity;
                    segLabelPts.forEach(function (p) {
                        score = Math.min(score, Math.hypot(p.x - cand.x, p.y - cand.y));
                    });
                    if (score > bestScore) { bestScore = score; best = { x: cand.x, y: cand.y, angle: ang }; }
                }
            });
            return best;
        }

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Kordasatsen';
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
            'aria-label': 'Interaktiv figur: en cirkel med två kordor som skär varandra ' +
                'i punkten E. Dra i ändpunkterna A, B, C, D eller i E för att ändra ' +
                'segmentens längder a, b, c och d.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.chord1;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.chord2;
        card.appendChild(formelB);

        var formelSats = document.createElement('div');
        formelSats.className = 'lab-vis-formel';
        formelSats.style.color = COL.ink;
        card.appendChild(formelSats);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '10px';
        card.appendChild(scene2);

        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2,
            width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Två rektanglar: a gånger b i grönt och c gånger d i blått. ' +
                'Formen ändras när kordorna dras, men arean är alltid densamma.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Dra och jämför' },
            { n: 2, label: '2 · Rektanglarna' },
            { n: 3, label: '3 · Satsen' }
        ];
        var INSTR = {
            1: 'Två kordor skär varandra i punkten <em>E</em> inuti cirkeln. Dra i ' +
               'ändpunkterna <em>A</em>, <em>B</em>, <em>C</em>, <em>D</em> — eller i ' +
               '<em>E</em> själv. Segmentens längder <em>a</em>, <em>b</em>, <em>c</em> ' +
               'och <em>d</em> ändras vilt när du drar. Men något står stilla. Gissa ' +
               'innan du drar: vad?',
            2: 'Samma fyra segment ritade som sidor i två rektanglar: <em>a</em> × ' +
               '<em>b</em> i grönt och <em>c</em> × <em>d</em> i blått. Dra i cirkeln ' +
               'och se rektanglarna morfa — formen ändras, men arean gör det aldrig.',
            3: 'Kordasatsen: produkten av den ena kordans delsträckor är alltid lika ' +
               'med produkten av den andra kordans delsträckor. Kryssa i rutan för att ' +
               'se varför — bevisidén bygger på två likformiga trianglar.'
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
        legend.appendChild(legendItem(COL.chord1, 'korda 1 (<em>a</em>, <em>b</em>)'));
        legend.appendChild(legendItem(COL.chord2, 'korda 2 (<em>c</em>, <em>d</em>)'));
        legend.appendChild(legendItem(COL.ink, 'skärningspunkt <em>E</em>'));

        // ── Kryssruta: Visa trianglarna (steg 3) ────────────────────────────
        var triLabel = document.createElement('label');
        triLabel.className = 'lab-graf-check';
        var triCb = document.createElement('input');
        triCb.type = 'checkbox';
        triCb.addEventListener('change', function () {
            state.showTriangles = triCb.checked;
            update();
        });
        triLabel.appendChild(triCb);
        var triTxt = document.createElement('span');
        triTxt.innerHTML = 'Visa trianglarna';
        triLabel.appendChild(triTxt);
        actions.appendChild(triLabel);

        // ── Slumpa + återställ ──────────────────────────────────────────────
        function randomizeState() {
            for (var attempt = 0; attempt < 60; attempt++) {
                var ang = Math.random() * 360;
                var dist = Math.random() * MAX_E_DIST * 0.85;
                var ex = O.x + dist * Math.cos(ang * Math.PI / 180);
                var ey = O.y + dist * Math.sin(ang * Math.PI / 180);
                var th1 = Math.random() * 360;
                var th2 = normDeg(th1 + 35 + Math.random() * 290);
                if (isValidState(ex, ey, th1, th2)) {
                    state.ex = ex; state.ey = ey; state.th1 = th1; state.th2 = th2;
                    state.revealed = true;
                    return true;
                }
            }
            return false;
        }
        var randomBtn = document.createElement('button');
        randomBtn.type = 'button';
        randomBtn.className = 'lab-btn';
        randomBtn.textContent = 'Slumpa läge';
        randomBtn.addEventListener('click', function () { randomizeState(); update(); });
        foot.appendChild(randomBtn);

        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.ex = DEFAULT_STATE.ex; state.ey = DEFAULT_STATE.ey;
            state.th1 = DEFAULT_STATE.th1; state.th2 = DEFAULT_STATE.th2;
            state.revealed = false; state.showTriangles = false;
            triCb.checked = false;
            update();
        });
        foot.appendChild(reset);

        // ── Drag ──────────────────────────────────────────────────────────
        function toScenePt(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return {
                x: (clientX - r.left) * W / r.width,
                y: (clientY - r.top) * H / r.height
            };
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var p = toScenePt(e.clientX, e.clientY);
            if (dragging === 'E') {
                var dx = p.x - O.x, dy = p.y - O.y, dist = Math.hypot(dx, dy);
                var ex = p.x, ey = p.y;
                if (dist > MAX_E_DIST) {
                    var sc = MAX_E_DIST / dist;
                    ex = O.x + dx * sc; ey = O.y + dy * sc;
                }
                if (isValidState(ex, ey, state.th1, state.th2)) {
                    state.ex = ex; state.ey = ey; state.revealed = true;
                    update();
                }
            } else {
                var rawAngle = angleAround(p);
                var snapped = Math.round(rawAngle);
                var cand = pt(O.x, O.y, R, snapped);
                var dirDeg = normDeg(Math.atan2(cand.y - state.ey, cand.x - state.ex) * 180 / Math.PI);
                var th1 = state.th1, th2 = state.th2;
                if (dragging === 'A') th1 = dirDeg;
                else if (dragging === 'C') th1 = normDeg(dirDeg + 180);
                else if (dragging === 'D') th2 = dirDeg;
                else if (dragging === 'B') th2 = normDeg(dirDeg + 180);
                if (isValidState(state.ex, state.ey, th1, th2)) {
                    state.th1 = th1; state.th2 = th2; state.revealed = true;
                    update();
                }
            }
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        function makeHit(label, p) {
            var hit = svgEl('circle', {
                cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: HIT_R, fill: 'rgba(0,0,0,0)',
                'data-pt': label
            });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                dragging = label;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            return hit;
        }

        // ── Rita huvudscenen ──────────────────────────────────────────────
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var g = computeGeometry(state);
            var showTri = state.step === 3 && state.showTriangles;

            // Cirkeln
            svg.appendChild(svgEl('circle', {
                cx: O.x, cy: O.y, r: R, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6
            }));

            // Trianglarna ADE, BCE + hjälpsträckor AD, BC (bevis, steg 3).
            // Polygonerna ritas UTAN egen kant (endast fyllning) — kanterna
            // ED och EA sammanfaller ändå med kordorna (ritas separat, solida,
            // nedan) och kanten AD/BC är just hjälpsträckan ur beviset, som
            // ska synas streckad mot bläck — inte som en solid triangelkant.
            if (showTri) {
                svg.appendChild(svgEl('polygon', {
                    points: g.A.x.toFixed(1) + ',' + g.A.y.toFixed(1) + ' ' +
                        g.D.x.toFixed(1) + ',' + g.D.y.toFixed(1) + ' ' +
                        g.E.x.toFixed(1) + ',' + g.E.y.toFixed(1),
                    fill: COL.tri1, 'fill-opacity': 0.16, stroke: 'none'
                }));
                svg.appendChild(svgEl('polygon', {
                    points: g.B.x.toFixed(1) + ',' + g.B.y.toFixed(1) + ' ' +
                        g.C.x.toFixed(1) + ',' + g.C.y.toFixed(1) + ' ' +
                        g.E.x.toFixed(1) + ',' + g.E.y.toFixed(1),
                    fill: COL.tri2, 'fill-opacity': 0.16, stroke: 'none'
                }));
                svg.appendChild(svgEl('line', {
                    x1: g.A.x.toFixed(1), y1: g.A.y.toFixed(1), x2: g.D.x.toFixed(1), y2: g.D.y.toFixed(1),
                    stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
                svg.appendChild(svgEl('line', {
                    x1: g.B.x.toFixed(1), y1: g.B.y.toFixed(1), x2: g.C.x.toFixed(1), y2: g.C.y.toFixed(1),
                    stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '5 4'
                }));
            }

            // Kordorna
            svg.appendChild(svgEl('line', {
                x1: g.A.x.toFixed(1), y1: g.A.y.toFixed(1), x2: g.C.x.toFixed(1), y2: g.C.y.toFixed(1),
                stroke: COL.chord1, 'stroke-width': 2.1
            }));
            svg.appendChild(svgEl('line', {
                x1: g.D.x.toFixed(1), y1: g.D.y.toFixed(1), x2: g.B.x.toFixed(1), y2: g.B.y.toFixed(1),
                stroke: COL.chord2, 'stroke-width': 2.1
            }));

            // Segmentetiketter (a, b, c, d) — placeras längs segmentet på
            // MINST MIN_LABEL_E_DIST px avstånd från E (inte alltid exakt
            // mittpunkten). Skälet: när E dras mot ett hörn kan TVÅ segment
            // från OLIKA kordor bli korta samtidigt (deras riktningar pekar
            // båda mot samma närliggande randbit) — då skulle mittpunkts-
            // etiketterna klumpa ihop sig med E-etiketten trots att var och
            // en har sin egen vinkelräta offset. Genom att alltid hålla
            // etiketten en bit bort från E (och ändå inom segmentet, max
            // 85 % av vägen mot fjärran ändpunkten) hålls alla fem
            // etiketterna isär även i hörnfallen.
            var MIN_LABEL_E_DIST = 42;
            function alongFromE(far) {
                var dx = far.x - g.E.x, dy = far.y - g.E.y;
                var len = Math.hypot(dx, dy) || 1;
                var t = clampNum(MIN_LABEL_E_DIST / len, 0.5, 0.85);
                return { x: g.E.x + dx * t, y: g.E.y + dy * t };
            }
            var midAE = alongFromE(g.A);
            var midEC = alongFromE(g.C);
            var midDE = alongFromE(g.D);
            var midEB = alongFromE(g.B);
            var lblA = pickPerpOffset(midAE, g.th1, 20, g.E, g.th2);
            var lblB = pickPerpOffset(midEC, g.th1, 20, g.E, g.th2);
            var lblC = pickPerpOffset(midDE, g.th2, 20, g.E, g.th1);
            var lblD = pickPerpOffset(midEB, g.th2, 20, g.E, g.th1);
            // Ömsesidig frånstötning: lblA/B tillhör korda 1, lblC/D korda 2 —
            // var och en har redan sin egen vinkelräta offset bort från DEN
            // ANDRA kordans LINJE, men två etiketter från olika kordor kan
            // ändå hamna nära varandra i RUMMET (t.ex. när E dras mot ett
            // hörn och två segment blir korta samtidigt). Ett par enkla
            // avstötningssteg mellan alla fyra etikettpunkter löser det
            // generellt, oavsett varför de blev nära.
            (function repel(pts, minSep, iters) {
                for (var k = 0; k < iters; k++) {
                    for (var i = 0; i < pts.length; i++) {
                        for (var j = i + 1; j < pts.length; j++) {
                            var dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
                            var d = Math.hypot(dx, dy);
                            if (d < 0.01) { dx = 1; dy = 0; d = 0.01; }
                            if (d < minSep) {
                                var push = (minSep - d) / 2, ux = dx / d, uy = dy / d;
                                pts[i].x -= ux * push; pts[i].y -= uy * push;
                                pts[j].x += ux * push; pts[j].y += uy * push;
                            }
                        }
                    }
                }
            })([lblA, lblB, lblC, lblD], 46, 4);
            var ancA = radialAnchor(lblA.angle), ancB = radialAnchor(lblB.angle);
            var ancC = radialAnchor(lblC.angle), ancD = radialAnchor(lblD.angle);
            svg.appendChild(svgVarText(
                { x: lblA.x.toFixed(1), y: (lblA.y + ancA.dy).toFixed(1), 'font-size': 13.5, 'text-anchor': ancA.anchor, fill: COL.chord1 },
                ['*a', ' = ' + fmt(g.a, 2)]));
            svg.appendChild(svgVarText(
                { x: lblB.x.toFixed(1), y: (lblB.y + ancB.dy).toFixed(1), 'font-size': 13.5, 'text-anchor': ancB.anchor, fill: COL.chord1 },
                ['*b', ' = ' + fmt(g.b, 2)]));
            svg.appendChild(svgVarText(
                { x: lblC.x.toFixed(1), y: (lblC.y + ancC.dy).toFixed(1), 'font-size': 13.5, 'text-anchor': ancC.anchor, fill: COL.chord2 },
                ['*c', ' = ' + fmt(g.c, 2)]));
            svg.appendChild(svgVarText(
                { x: lblD.x.toFixed(1), y: (lblD.y + ancD.dy).toFixed(1), 'font-size': 13.5, 'text-anchor': ancD.anchor, fill: COL.chord2 },
                ['*d', ' = ' + fmt(g.d, 2)]));

            // Punktmarkörer (ink)
            [g.A, g.B, g.C, g.D].forEach(function (p) {
                svg.appendChild(svgEl('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: DOT_R, fill: COL.ink }));
            });
            svg.appendChild(svgEl('circle', { cx: g.E.x.toFixed(2), cy: g.E.y.toFixed(2), r: DOT_R + 0.6, fill: COL.ink }));

            // Punktetiketter A, B, C, D (radiellt utanför cirkeln, upprätt text)
            [['A', angleAround(g.A)], ['B', angleAround(g.B)], ['C', angleAround(g.C)], ['D', angleAround(g.D)]]
                .forEach(function (pr) {
                    var name = pr[0], ang = pr[1];
                    var lp = pt(O.x, O.y, LABEL_R, ang);
                    var anc = radialAnchor(ang);
                    svg.appendChild(svgVarText(
                        { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1), 'font-size': 15, 'text-anchor': anc.anchor, fill: COL.ink },
                        [name]));
                });
            // E-etiketten — provar flera vinklar/radier inom den öppnaste
            // sektorn mellan kordorna och väljer den som ligger längst bort
            // från alla fyra segmentetiketter (se placeELabel()).
            var segLabelPts = [lblA, lblB, lblC, lblD];
            var eLp = placeELabel(g.E, segLabelPts);
            var eAnc = radialAnchor(eLp.angle);
            svg.appendChild(svgVarText(
                { x: eLp.x.toFixed(1), y: (eLp.y + eAnc.dy).toFixed(1), 'font-size': 14.5, 'text-anchor': eAnc.anchor, fill: COL.ink, 'font-weight': '600' },
                ['E']));

            // Dragbara träffytor, sist (överst i z-ordningen)
            svg.appendChild(makeHit('A', g.A));
            svg.appendChild(makeHit('C', g.C));
            svg.appendChild(makeHit('D', g.D));
            svg.appendChild(makeHit('B', g.B));
            svg.appendChild(makeHit('E', g.E));

            return g;
        }

        // ── Rita rektangelscenen (steg 2) ──────────────────────────────────
        function drawRects(g) {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);

            svg2.appendChild(svgEl('line', {
                x1: 16, y1: RECT_Y0, x2: W2 - 16, y2: RECT_Y0,
                stroke: COL.dash, 'stroke-width': 1.2
            }));

            function rect(cx, wUnits, hUnits, color, letters, areaVal) {
                var wPx = wUnits * RECT_SCALE, hPx = hUnits * RECT_SCALE;
                var x = cx - wPx / 2, y = RECT_Y0 - hPx;
                svg2.appendChild(svgEl('rect', {
                    x: x.toFixed(1), y: y.toFixed(1), width: wPx.toFixed(1), height: hPx.toFixed(1),
                    fill: color, 'fill-opacity': 0.18, stroke: color, 'stroke-width': 2
                }));
                // Bildtext ovanför: "a ⋅ b"
                svg2.appendChild(svgVarText(
                    { x: cx, y: (y - 10).toFixed(1), 'font-size': 14, 'text-anchor': 'middle', fill: color },
                    ['*' + letters[0], ' ⋅ ', '*' + letters[1]]));
                // Areavärde: inuti om det ryms, annars under baslinjen.
                var areaTxt = '= ' + fmt(areaVal, 2);
                if (wPx >= 46 && hPx >= 22) {
                    svg2.appendChild(svgEl('text', {
                        x: cx, y: (y + hPx / 2 + 5).toFixed(1), 'font-size': 14.5,
                        'text-anchor': 'middle', fill: color, 'font-weight': '600'
                    })).textContent = areaTxt;
                } else {
                    svg2.appendChild(svgEl('text', {
                        x: cx, y: (RECT_Y0 + 20).toFixed(1), 'font-size': 14.5,
                        'text-anchor': 'middle', fill: color, 'font-weight': '600'
                    })).textContent = areaTxt;
                }
            }
            rect(RECT_CX1, g.a, g.b, COL.chord1, ['a', 'b'], g.a * g.b);
            rect(RECT_CX2, g.c, g.d, COL.chord2, ['c', 'd'], g.c * g.d);
        }

        // ── Formler och texter ────────────────────────────────────────────
        function updateFormulas(g) {
            var aT = fmtTex(g.a, 2), bT = fmtTex(g.b, 2), cT = fmtTex(g.c, 2), dT = fmtTex(g.d, 2);
            var abT = fmtTex(g.a * g.b, 2), cdT = fmtTex(g.c * g.d, 2);
            katexInto(formelA, 'a \\cdot b = ' + aT + ' \\cdot ' + bT + ' = ' + abT);
            katexInto(formelB, 'c \\cdot d = ' + cT + ' \\cdot ' + dT + ' = ' + cdT);
            if (state.step === 3) {
                katexInto(formelSats,
                    '\\textcolor{' + COL.chord1 + '}{a \\cdot b} = \\textcolor{' + COL.chord2 + '}{c \\cdot d}', true);
            } else {
                formelSats.textContent = '';
            }
        }
        function updateNote(g) {
            var html = '';
            if (state.step === 1) {
                if (state.revealed) {
                    html = 'Produkterna är alltid lika! Oavsett hur du drar <em>E</em>, ' +
                        '<em>A</em>, <em>B</em>, <em>C</em> eller <em>D</em> gäller ' +
                        '<em>a</em> · <em>b</em> = <em>c</em> · <em>d</em>.';
                }
            } else if (state.step === 2) {
                html = 'Rektangeln byter form för varje ny dragning — men arean ' +
                    '(' + fmt(g.a * g.b, 2) + ') förblir exakt densamma.';
            } else if (state.step === 3) {
                html = state.showTriangles
                    ? 'Trianglarna <em>ADE</em> och <em>BCE</em> är likformiga — de har ' +
                      'samma vinklar (randvinklar på samma båge, samt vertikalvinkeln vid ' +
                      '<em>E</em>). Likformigheten ger <em>a</em>/<em>d</em> = ' +
                      '<em>c</em>/<em>b</em>, det vill säga <em>a</em> · <em>b</em> = ' +
                      '<em>c</em> · <em>d</em>.'
                    : 'Kryssa i rutan nedan för att se bevisidén — två likformiga ' +
                      'trianglar döljer sig i figuren.';
            }
            note.innerHTML = html;
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            actions.style.display = state.step === 3 ? '' : 'none';
            scene2.style.display = state.step === 2 ? '' : 'none';
            var g = draw();
            if (state.step === 2) drawRects(g);
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
    window.VISUALISERINGAR['ma2c-4.12'] = { mount: mount };
})();
