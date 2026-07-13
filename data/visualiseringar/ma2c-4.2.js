/* ma2c-4.2.js — visualisering: "Vinkelsummans promenad" (vinklar i
 * trianglar och månghörningar).
 *
 * Kärninsikt: en pil som promenerar runt en (konvex) månghörning och vid
 * varje hörn vrider sig med yttervinkeln har, efter ett helt varv, vridit
 * sig EXAKT 360° — oavsett formens utseende. Därför är yttervinkelsumman
 * alltid 360°, och eftersom inre vinkel + yttervinkel = 180° vid varje
 * hörn faller den inre vinkelsumman ut automatiskt:
 *   n · 180° − 360° = (n − 2) · 180°.
 *
 * Beteckningar/synk med genomgången (ma2c-4.2.md): genomgången visar INGEN
 * generell formel (n−2)·180° eller yttervinkel-argument — den ger bara
 * triangel = 180°, fyrhörning = 360°, och i Exempel 1 en femhörning delad
 * med DIAGONALER från ett hörn i 3 trianglar (3 · 180° = 540°). Denna
 * visualisering bygger samma tal (180°, 360°, 540° för n = 3, 4, 5) men via
 * en KOMPLETTERANDE metod (yttervinkel-promenaden) — steg 3 nämner uttryck-
 * ligen genomgångens diagonal-metod för femhörningen så de två hänger ihop.
 * Lokala symboler (definierade i denna visualisering, inte i genomgången):
 * v = inre vinkel, y = yttervinkel (mnemonic: y som i "yttervinkel").
 *
 * Tre steg (lager):
 *   1. Promenaden     — pil på en sida, "Gå ett steg"/"Gå hela varvet"
 *                        vrider pilen med yttervinkeln vid varje hörn
 *                        (växande vinkelbåge + förlängd sida, streckad).
 *                        Gissa-först: hur mycket totalt, beror det på formen?
 *   2. Dra i hörnen    — fri (konvex-klampad) dragning; kör promenaden igen;
 *                        alla yttervinklar listas + summeras live.
 *   3. Inre vinkelsumman — v + y = 180° vid varje hörn (visas vid hörn 1),
 *                        härledning n·180° − 360° = (n−2)·180°, tabell
 *                        n = 3..8 med aktuellt n markerat.
 *
 * n-väljare (3–8 hörn) återställer till en regelbunden månghörning på en
 * cirkel. Dragning är fri men klampad så figuren förblir konvex (varje
 * hörns inre vinkel hålls inom [25°, 155°] och vridriktningen konsekvent
 * — ogiltiga drag ignoreras, se isValidPolygon()).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma2c-4.11.js). API: window.VISUALISERINGAR['ma2c-4.2'] = { mount }.
 */
(function () {
    'use strict';

    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function fmtDeg(v) {
        var r = Math.round(v);
        if (r === 0) return '0°';
        return String(r) + '°';
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

    // ── Vinkelgeometri (grader, atan2-konvention: 0°=höger, 90°=ned) ──────
    function normDeg(a) { a = a % 360; if (a < 0) a += 360; return a; }
    // Kortaste signerade diff b−a i (−180, 180].
    function shortSignedDiff(a, b) {
        var d = normDeg(b - a);
        if (d > 180) d -= 360;
        return d;
    }
    function pt(cx, cy, r, angleDeg) {
        var rad = angleDeg * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }
    function polygonAngleDeg(from, to) {
        return normDeg(Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI);
    }
    // Sweep-/large-arc-flaggor för en cirkelbåge mellan två strålriktningar
    // (korta vägen, ≤ 180° — alltid rätt här eftersom både inre och yttre
    // vinklar i en konvex månghörning är < 180°).
    function arcFlags(angle1, angle2) {
        var cw = normDeg(angle2 - angle1);
        return cw <= 180 ? { laf: 0, sf: 1 } : { laf: 0, sf: 0 };
    }
    function arcPathD(cx, cy, r, a1, a2) {
        var f = arcFlags(a1, a2);
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
        var dy = cy > 0.35 ? 12 : (cy < -0.35 ? -8 : 4.5);
        return { anchor: anchor, dy: dy };
    }
    function easeInOut(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        dash: 'rgba(31,37,48,0.45)',
        ext: '#c8324a',    // yttervinkeln y, pilen — accentröd
        int: '#2563c9'     // inre vinkeln v — blå
    };

    // ── Scen-geometri ───────────────────────────────────────────────────
    var W = 560, H = 420;
    var CENTER = { x: 280, y: 200 }, RADIUS = 140;
    var SAFE = { x0: 70, x1: 490, y0: 55, y1: 365 };
    var R_ANG = 26, EXT_LEN = 40, HIT_R = 17, DOT_R = 5;
    var INT_MIN = 25, INT_MAX = 155;   // klampgränser för inre vinkeln (konvex + läsbart)
    var MOVE_MS = 650, TURN_MS = 550, AUTO_PAUSE_MS = 260;

    function regularPolygon(n) {
        var pts = [];
        for (var i = 0; i < n; i++) {
            pts.push(pt(CENTER.x, CENTER.y, RADIUS, -90 + i * (360 / n)));
        }
        return pts;
    }
    function centroidOf(pts) {
        var sx = 0, sy = 0;
        pts.forEach(function (p) { sx += p.x; sy += p.y; });
        return { x: sx / pts.length, y: sy / pts.length };
    }
    // Alla per-hörn vinklar för aktuell figur (rent geometriskt, oberoende
    // av promenaden). exterior[i] är SIGNERAD (vridriktning); interior[i]
    // = 180 − |exterior[i]|.
    function computeAngles(pts) {
        var n = pts.length, exterior = [], interior = [], dirIn = [], dirOut = [];
        for (var i = 0; i < n; i++) {
            var prev = pts[(i - 1 + n) % n], cur = pts[i], next = pts[(i + 1) % n];
            var di = polygonAngleDeg(prev, cur), doo = polygonAngleDeg(cur, next);
            var turn = shortSignedDiff(di, doo);
            dirIn.push(di); dirOut.push(doo);
            exterior.push(turn);
            interior.push(180 - Math.abs(turn));
        }
        return { exterior: exterior, interior: interior, dirIn: dirIn, dirOut: dirOut };
    }
    // Konvex + läsbar? (alla inre vinklar inom [INT_MIN, INT_MAX] OCH
    // vridriktningen konsekvent åt samma håll runt hela figuren).
    function isValidPolygon(pts) {
        var ang = computeAngles(pts), n = pts.length, sign = 0;
        for (var i = 0; i < n; i++) {
            if (ang.interior[i] < INT_MIN || ang.interior[i] > INT_MAX) return false;
            var s = ang.exterior[i] >= 0 ? 1 : -1;
            if (sign === 0) sign = s; else if (s !== sign) return false;
        }
        return true;
    }
    function polygonPathD(pts) {
        var d = 'M ' + pts[0].x.toFixed(2) + ' ' + pts[0].y.toFixed(2);
        for (var i = 1; i < pts.length; i++) d += ' L ' + pts[i].x.toFixed(2) + ' ' + pts[i].y.toFixed(2);
        return d + ' Z';
    }

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = { n: 3, pts: regularPolygon(3), step: 1 };
        var walk = null;           // se resetWalk()
        var dragging = null;       // vertex-index eller null
        var animId = null, walkTimeoutId = null;

        function resetWalk() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            if (walkTimeoutId != null) { clearTimeout(walkTimeoutId); walkTimeoutId = null; }
            walk = {
                idx: 0, phase: 'idle',           // 'idle' | 'moving' | 'turning'
                fromIdx: 0, toIdx: 1, progress: 0, moveHeading: 0,
                turnVertex: 0, headingStart: 0, turnDelta: 0,
                totalTurn: 0, stepsWalked: 0, done: false
            };
        }
        resetWalk();

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Vinkelsummans promenad';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var nWrap = document.createElement('div');
        nWrap.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:2px 0 8px;';
        var nLbl = document.createElement('span');
        nLbl.textContent = 'Antal hörn:';
        nLbl.style.cssText = 'font-size:13px;color:#1f2530;font-weight:500;';
        nWrap.appendChild(nLbl);
        var nBtnsRow = document.createElement('div');
        nBtnsRow.className = 'lab-vis-steps';
        nBtnsRow.style.margin = '0';
        nWrap.appendChild(nBtnsRow);
        card.appendChild(nWrap);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H,
            width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv figur: en konvex månghörning med dragbara hörn. ' +
                'En pil promenerar runt kanten och vrider sig med yttervinkeln vid varje ' +
                'hörn — efter ett helt varv har den vridit sig exakt 360 grader.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelTotal = document.createElement('div');
        formelTotal.className = 'lab-vis-formel';
        card.appendChild(formelTotal);

        var extList = document.createElement('div');
        extList.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 0;font-size:13px;';
        card.appendChild(extList);

        var derivWrap = document.createElement('div');
        card.appendChild(derivWrap);
        var derivRows = [];
        for (var dr = 0; dr < 4; dr++) {
            var row = document.createElement('div');
            row.className = 'lab-vis-formel';
            derivWrap.appendChild(row);
            derivRows.push(row);
        }
        var derivLive = document.createElement('div');
        derivLive.className = 'lab-vis-formel';
        derivWrap.appendChild(derivLive);

        var tableWrap = document.createElement('div');
        tableWrap.style.cssText = 'margin:10px 0;overflow-x:auto;';
        card.appendChild(tableWrap);
        var table = document.createElement('table');
        table.style.cssText = 'border-collapse:collapse;font-size:13.5px;min-width:280px;';
        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');
        ['<em>n</em>', '(<em>n</em> − 2) · 180°', 'Vinkelsumma'].forEach(function (h) {
            var th = document.createElement('th');
            th.innerHTML = h;
            th.style.cssText = 'text-align:left;padding:4px 14px 4px 4px;border-bottom:1.5px solid #1f2530;font-weight:600;color:#1f2530;';
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        tableWrap.appendChild(table);
        var tableRows = {};
        for (var tn = 3; tn <= 8; tn++) {
            (function (n) {
                var tr = document.createElement('tr');
                var sum = (n - 2) * 180;
                // OBS: n-VÄRDET i raden är ett mätetal (rakt), inte variabeln
                // n själv (kursiv) — kursiv hör bara till kolumnrubriken.
                var cells = [String(n), '(' + n + ' − 2) · 180°', sum + '°'];
                cells.forEach(function (txt, ci) {
                    var td = document.createElement('td');
                    td.textContent = txt;
                    td.style.cssText = 'padding:4px 14px 4px 4px;border-bottom:1px solid rgba(31,37,48,0.14);';
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
                tableRows[n] = tr;
            })(tn);
        }

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Promenaden' },
            { n: 2, label: '2 · Dra i hörnen' },
            { n: 3, label: '3 · Inre vinkelsumman' }
        ];
        var INSTR = {
            1: 'Pilen står på en sida av månghörningen, redo att gå. <em>Gissa först</em>: ' +
               'hur mycket har pilen vridit sig totalt när den är tillbaka vid start — och ' +
               'beror svaret på formen? Tryck <em>Gå ett steg</em> för att flytta pilen till ' +
               'nästa hörn (den vrider sig samtidigt med yttervinkeln där), eller ' +
               '<em>Gå hela varvet</em> för att se hela promenaden i ett svep.',
            2: 'Dra i hörnen — gör månghörningen hur skev du vill (den förblir konvex, du ' +
               'kan inte "vika in" ett hörn). Kör promenaden igen med knapparna nedan och se ' +
               'att summan fortfarande blir 360°. Yttervinklarna vid alla hörn listas och ' +
               'summeras live här under, även utan att du klickar på något.',
            3: 'Vid varje hörn gäller <em>v</em> + <em>y</em> = 180°, där <em>v</em> är den ' +
               'inre vinkeln och <em>y</em> är yttervinkeln (båda markerade vid hörn 1). ' +
               'Eftersom yttervinklarna alltid summerar till 360° (steg 1–2) faller formeln ' +
               'för den inre vinkelsumman ut av sig själv — byt antal hörn och se tabellen ' +
               'och figuren följa med.'
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

        // ── n-väljare (3–8 hörn) ─────────────────────────────────────────
        var nBtns = {};
        for (var nn = 3; nn <= 8; nn++) {
            (function (n) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'lab-vis-step';
                b.textContent = n + ' hörn';
                b.addEventListener('click', function () {
                    state.n = n;
                    state.pts = regularPolygon(n);
                    resetWalk();
                    update();
                });
                nBtnsRow.appendChild(b);
                nBtns[n] = b;
            })(nn);
        }

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
        var legPoly = legendItem(COL.ink, 'månghörningens sidor');
        var legDash = legendItem(COL.dash, 'förlängning av sidan');
        var legExt = legendItem(COL.ext, 'yttervinkel <em>y</em> (och pilen)');
        var legInt = legendItem(COL.int, 'inre vinkel <em>v</em>');
        legend.appendChild(legPoly);
        legend.appendChild(legDash);
        legend.appendChild(legExt);
        legend.appendChild(legInt);

        // ── Knappar: gå ett steg / gå hela varvet ──────────────────────────
        var stepBtn = document.createElement('button');
        stepBtn.type = 'button';
        stepBtn.className = 'lab-btn';
        stepBtn.textContent = 'Gå ett steg';
        stepBtn.addEventListener('click', function () { doStep(false); });
        actions.appendChild(stepBtn);

        var loopBtn = document.createElement('button');
        loopBtn.type = 'button';
        loopBtn.className = 'lab-btn';
        loopBtn.textContent = 'Gå hela varvet';
        loopBtn.addEventListener('click', function () {
            resetWalk();
            update();
            doStep(true);
        });
        actions.appendChild(loopBtn);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.n = 3; state.pts = regularPolygon(3); state.step = 1;
            resetWalk();
            update();
        });
        foot.appendChild(reset);

        // ── Promenaden: animation ───────────────────────────────────────────
        function doStep(auto) {
            if (walk.phase !== 'idle' || walk.done) return;
            var n = state.n;
            var fromIdx = walk.idx, toIdx = (fromIdx + 1) % n;
            walk.phase = 'moving'; walk.fromIdx = fromIdx; walk.toIdx = toIdx; walk.progress = 0;
            walk.moveHeading = polygonAngleDeg(state.pts[fromIdx], state.pts[toIdx]);
            var t0 = null;
            function moveFrame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / MOVE_MS, 0, 1);
                walk.progress = p;
                update();
                if (p < 1) animId = requestAnimationFrame(moveFrame);
                else startTurnPhase(toIdx, auto);
            }
            animId = requestAnimationFrame(moveFrame);
        }
        function startTurnPhase(vertexIdx, auto) {
            var n = state.n, pts = state.pts;
            var prev = pts[(vertexIdx - 1 + n) % n], cur = pts[vertexIdx], next = pts[(vertexIdx + 1) % n];
            var dirIn = polygonAngleDeg(prev, cur), dirOut = polygonAngleDeg(cur, next);
            var turnDelta = shortSignedDiff(dirIn, dirOut);
            walk.phase = 'turning'; walk.turnVertex = vertexIdx;
            walk.headingStart = dirIn; walk.turnDelta = turnDelta; walk.progress = 0;
            var t0 = null;
            function turnFrame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / TURN_MS, 0, 1);
                walk.progress = p;
                update();
                if (p < 1) animId = requestAnimationFrame(turnFrame);
                else {
                    walk.idx = vertexIdx;
                    walk.phase = 'idle';
                    walk.totalTurn += turnDelta;
                    walk.stepsWalked++;
                    if (walk.stepsWalked % n === 0) walk.done = true;
                    update();
                    if (auto && !walk.done) {
                        walkTimeoutId = setTimeout(function () { doStep(true); }, AUTO_PAUSE_MS);
                    }
                }
            }
            animId = requestAnimationFrame(turnFrame);
        }
        function arrowPose() {
            var n = state.n, pts = state.pts;
            if (walk.phase === 'moving') {
                var a = pts[walk.fromIdx], b = pts[walk.toIdx];
                var e = easeInOut(walk.progress);
                return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, heading: walk.moveHeading };
            }
            if (walk.phase === 'turning') {
                var e2 = easeInOut(walk.progress);
                var v = pts[walk.turnVertex];
                return { x: v.x, y: v.y, heading: normDeg(walk.headingStart + walk.turnDelta * e2) };
            }
            var cur = pts[walk.idx], nxt = pts[(walk.idx + 1) % n];
            return { x: cur.x, y: cur.y, heading: polygonAngleDeg(cur, nxt) };
        }

        // ── Drag ──────────────────────────────────────────────────────────
        function clientToScenePoint(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return { x: px, y: py };
        }
        svg.addEventListener('pointermove', function (e) {
            if (dragging == null) return;
            var raw = clientToScenePoint(e.clientX, e.clientY);
            var candidate = { x: clampNum(raw.x, SAFE.x0, SAFE.x1), y: clampNum(raw.y, SAFE.y0, SAFE.y1) };
            var trial = state.pts.slice();
            trial[dragging] = candidate;
            if (isValidPolygon(trial)) { state.pts = trial; update(); }
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        function makeHit(i) {
            var p = state.pts[i];
            var hit = svgEl('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: HIT_R, fill: 'rgba(0,0,0,0)' });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                resetWalk();
                dragging = i;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
                update();
            });
            return hit;
        }

        // ── Rita en yttervinkel-båge + streckad förlängning vid ett hörn ──
        function drawExtArc(g, vertexIdx, headingOverride) {
            var n = state.n, pts = state.pts;
            var idxPrev = (vertexIdx - 1 + n) % n, idxNext = (vertexIdx + 1) % n;
            var cur = pts[vertexIdx];
            var dirIn = polygonAngleDeg(pts[idxPrev], cur);
            var dirOutFull = polygonAngleDeg(cur, pts[idxNext]);
            var dirOutUsed = headingOverride != null ? headingOverride : dirOutFull;
            var extEnd = pt(cur.x, cur.y, EXT_LEN, dirIn);
            g.appendChild(svgEl('line', {
                x1: cur.x.toFixed(2), y1: cur.y.toFixed(2), x2: extEnd.x.toFixed(2), y2: extEnd.y.toFixed(2),
                stroke: COL.dash, 'stroke-width': 1.3, 'stroke-dasharray': '5 4'
            }));
            var turnNow = shortSignedDiff(dirIn, dirOutUsed);
            if (Math.abs(turnNow) > 0.5) {
                g.appendChild(svgEl('path', {
                    d: arcPathD(cur.x, cur.y, R_ANG, dirIn, dirOutUsed),
                    fill: 'none', stroke: COL.ext, 'stroke-width': 2
                }));
            }
            var bis = bisectorShort(dirIn, dirOutUsed);
            var lp = pt(cur.x, cur.y, R_ANG + 17, bis);
            var anc = radialAnchor(bis);
            g.appendChild(svgVarText(
                { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1), 'font-size': 13, 'text-anchor': anc.anchor, fill: COL.ext },
                ['*y', ' = ' + fmtDeg(Math.abs(turnNow))]));
        }
        // ── Rita en inre vinkel-båge vid ett hörn ─────────────────────────
        function drawIntArc(g, vertexIdx) {
            var n = state.n, pts = state.pts;
            var idxPrev = (vertexIdx - 1 + n) % n, idxNext = (vertexIdx + 1) % n;
            var cur = pts[vertexIdx];
            var dirIn = polygonAngleDeg(pts[idxPrev], cur);
            var dirOut = polygonAngleDeg(cur, pts[idxNext]);
            var a1 = normDeg(dirIn + 180), a2 = dirOut;
            var interior = 180 - Math.abs(shortSignedDiff(dirIn, dirOut));
            g.appendChild(svgEl('path', {
                d: arcPathD(cur.x, cur.y, R_ANG, a1, a2),
                fill: 'none', stroke: COL.int, 'stroke-width': 2
            }));
            var bis = bisectorShort(a1, a2);
            var lp = pt(cur.x, cur.y, R_ANG + 17, bis);
            var anc = radialAnchor(bis);
            g.appendChild(svgVarText(
                { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1), 'font-size': 13, 'text-anchor': anc.anchor, fill: COL.int },
                ['*v', ' = ' + fmtDeg(interior)]));
        }

        // ── Rita scenen ──────────────────────────────────────────────────
        function drawScene() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var n = state.n, pts = state.pts;
            var centroid = centroidOf(pts);

            // Polygonens sidor
            svg.appendChild(svgEl('path', {
                d: polygonPathD(pts), fill: 'rgba(37,99,201,0.05)', stroke: COL.ink, 'stroke-width': 1.8,
                'stroke-linejoin': 'round'
            }));

            var g = svgEl('g');
            svg.appendChild(g);

            if (state.step === 2) {
                for (var i = 0; i < n; i++) {
                    if (walk.phase === 'turning' && i === walk.turnVertex) continue; // ritas dynamiskt nedan
                    drawExtArc(g, i, null);
                }
            }
            if (state.step === 3) {
                for (var j = 0; j < n; j++) drawIntArc(g, j);
                drawExtArc(g, 0, null); // demo: v + y = 180° vid hörn 1
            }
            if (walk.phase === 'turning') {
                var e = easeInOut(walk.progress);
                var liveHeading = normDeg(walk.headingStart + walk.turnDelta * e);
                drawExtArc(g, walk.turnVertex, liveHeading);
            }

            // Hörnnummer (radiellt utåt från medelpunkten)
            for (var k = 0; k < n; k++) {
                var away = polygonAngleDeg(centroid, pts[k]);
                var lp = pt(pts[k].x, pts[k].y, 24, away);
                var anc = radialAnchor(away);
                svg.appendChild(svgVarText(
                    { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1), 'font-size': 12, 'text-anchor': anc.anchor, fill: 'rgba(31,37,48,0.55)' },
                    [String(k + 1)]));
            }

            // Hörnprickar
            pts.forEach(function (p) {
                svg.appendChild(svgEl('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: DOT_R, fill: COL.ink }));
            });

            // Pilen (öppen pilsymbol) — döljs i steg 3 för att fokusera på de inre vinklarna
            if (state.step !== 3) {
                var pose = arrowPose();
                // Pilen är förankrad vid sin svans (lokalt x=0) och pekar
                // FRAMÅT i rörelseriktningen — ingen bakåtriktad stjärt som
                // kan förväxlas med färdriktningen.
                var grp = svgEl('g', { transform: 'translate(' + pose.x.toFixed(2) + ',' + pose.y.toFixed(2) + ') rotate(' + pose.heading.toFixed(2) + ')' });
                grp.appendChild(svgEl('line', { x1: 0, y1: 0, x2: 25, y2: 0, stroke: COL.ext, 'stroke-width': 3.4, 'stroke-linecap': 'round' }));
                grp.appendChild(svgEl('polyline', { points: '15,-8 30,0 15,8', fill: 'none', stroke: COL.ext, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
                svg.appendChild(grp);
            }

            // Dragbara träffytor — sist, överst i z-ordningen.
            for (var m = 0; m < n; m++) svg.appendChild(makeHit(m));
        }

        // ── Total-vridning (steg 1–2), yttervinkellista (steg 2) ──────────
        function currentDisplayedTotal() {
            var total = walk.totalTurn;
            if (walk.phase === 'turning') total += walk.turnDelta * easeInOut(walk.progress);
            return Math.abs(total);
        }
        function updateTotalDisplay() {
            katexInto(formelTotal,
                '\\textcolor{' + COL.ext + '}{\\text{Vridit totalt: ' + fmtDeg(currentDisplayedTotal()) + '}}');
        }
        function updateExtList() {
            extList.innerHTML = '';
            var ang = computeAngles(state.pts), n = state.n, sum = 0;
            for (var i = 0; i < n; i++) {
                sum += Math.abs(ang.exterior[i]);
                var chip = document.createElement('span');
                chip.style.color = COL.ext;
                chip.innerHTML = 'Hörn ' + (i + 1) + ': ' + fmtDeg(Math.abs(ang.exterior[i]));
                extList.appendChild(chip);
            }
            var sumChip = document.createElement('span');
            sumChip.style.cssText = 'font-weight:600;color:' + COL.ext + ';';
            sumChip.textContent = 'Summa: ' + fmtDeg(sum);
            extList.appendChild(sumChip);
        }

        // ── Härledning + tabell (steg 3) ───────────────────────────────────
        function updateDerivation() {
            var n = state.n, sum = (n - 2) * 180;
            katexInto(derivLive,
                '\\text{För } n = ' + n + ': \\quad (' + n + '-2)\\cdot180° = ' +
                (n - 2) + '\\cdot180° = ' + sum + '°');
            for (var k = 3; k <= 8; k++) {
                var tr = tableRows[k];
                if (k === n) {
                    tr.style.background = 'rgba(200,50,74,0.10)';
                    tr.style.fontWeight = '600';
                } else {
                    tr.style.background = '';
                    tr.style.fontWeight = '';
                }
            }
        }

        // ── Anteckning (per steg, live) ────────────────────────────────────
        function noteHtml() {
            var ang = computeAngles(state.pts);
            var sumExt = ang.exterior.reduce(function (a, b) { return a + Math.abs(b); }, 0);
            var sumInt = ang.interior.reduce(function (a, b) { return a + b; }, 0);
            if (state.step === 1) {
                if (walk.done) {
                    return 'Ett helt varv! Pilen pekar åt exakt samma håll som i starten — den ' +
                        'har vridit sig totalt ' + fmtDeg(sumExt) + '. Byt antal hörn eller dra i ' +
                        'hörnen (steg 2) och kör igen: svaret blir alltid 360°.';
                }
                return '';
            }
            if (state.step === 2) {
                return 'Summan av yttervinklarna är just nu ' + fmtDeg(sumExt) + ', oavsett hur ' +
                    'skev figuren är. Gör den extremt oregelbunden — summan rör sig inte.';
            }
            if (state.step === 3) {
                var extra = '';
                if (state.n === 5) {
                    extra = ' Genomgångens Exempel 1 kommer fram till samma svar för en ' +
                        'femhörning (540°) på ett annat sätt: genom att dela den i 3 trianglar ' +
                        'med diagonaler, 3 · 180° = 540°. Yttervinkel-promenaden ovan är en ' +
                        'annan väg till exakt samma formel.';
                }
                return 'Just nu (' + state.n + ' hörn): inre vinkelsumma = ' + fmtDeg(sumInt) +
                    ', precis som formeln (' + state.n + ' − 2) · 180° ger.' + extra;
            }
            return '';
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            for (var nn2 = 3; nn2 <= 8; nn2++) nBtns[nn2].classList.toggle('active', state.n === nn2);
            instr.innerHTML = INSTR[state.step];

            legDash.style.display = (state.step === 2 || state.step === 3 || walk.phase === 'turning') ? '' : 'none';
            // Yttervinkeln (och pilen) syns i alla tre steg — promenaden
            // (1), listan (2) och v+y=180°-demot vid hörn 1 (3).
            legExt.style.display = '';
            legInt.style.display = state.step === 3 ? '' : 'none';

            formelTotal.style.display = state.step <= 2 ? '' : 'none';
            extList.style.display = state.step === 2 ? 'flex' : 'none';
            actions.style.display = state.step <= 2 ? '' : 'none';
            stepBtn.disabled = walk.phase !== 'idle' || walk.done;
            loopBtn.disabled = walk.phase !== 'idle' || walk.done;
            derivWrap.style.display = state.step === 3 ? '' : 'none';
            tableWrap.style.display = state.step === 3 ? '' : 'none';

            drawScene();
            updateTotalDisplay();
            if (state.step === 2) updateExtList();
            if (state.step === 3) updateDerivation();
            note.innerHTML = noteHtml();
        }

        // Statisk härledning (rader 1–4, oberoende av n) — sätts en gång.
        katexInto(derivRows[0],
            '\\textcolor{' + COL.int + '}{v} + \\textcolor{' + COL.ext + '}{y} = 180° \\quad \\text{(vid varje hörn)}');
        katexInto(derivRows[1],
            '\\textcolor{' + COL.int + '}{v_1+v_2+\\ldots+v_n} + \\textcolor{' + COL.ext + '}{y_1+y_2+\\ldots+y_n} = n \\cdot 180°');
        katexInto(derivRows[2],
            '\\textcolor{' + COL.ext + '}{y_1+y_2+\\ldots+y_n} = 360° \\quad \\text{(promenaden, steg 1 och 2)}');
        katexInto(derivRows[3],
            '\\textcolor{' + COL.int + '}{v_1+v_2+\\ldots+v_n} = n \\cdot 180° - 360° = (n-2)\\cdot 180°');

        update();

        return {
            destroy: function () {
                if (animId != null) cancelAnimationFrame(animId);
                if (walkTimeoutId != null) clearTimeout(walkTimeoutId);
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma2c-4.2'] = { mount: mount };
})();
