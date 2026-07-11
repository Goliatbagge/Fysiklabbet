/* ma2c-4.11.js — visualisering: "Randvinkeljakten" (randvinkelsatsen).
 *
 * Kärninsikt: alla randvinklar som står på samma cirkelbåge är lika stora
 * — och exakt hälften av medelpunktsvinkeln. Eleven UPPLEVER invariansen
 * genom att dra periferipunkten P och se gradtalet stå stilla.
 *
 * Beteckningar spelar teorigenomgången ma2c-4.11.md exakt: x = randvinkeln,
 * y = medelpunktsvinkeln, satsen y = 2x. Startläget (medelpunktsvinkel
 * 120°, randvinkel 60°) återger genomgångens Exempel 1.
 *
 * Tre steg (lager):
 *   1. Dra punkten        — cirkel, korda AB, randvinkel x vid P (grön).
 *                            Gissa-först: växer/krymper/konstant?
 *   2. Medelpunktsvinkeln — + medelpunkten O, radierna OA/OB, medelpunkts-
 *                            vinkeln y (röd). Live-formel y = 2x.
 *   3. Specialfall         — knapp "Gör AB till diameter" (Tales sats,
 *                            x = 90°, rät-vinkel-symbol) + P kan dras till
 *                            den mindre bågen (supplementfallet, 180° − x).
 *
 * A, B och P är alla fritt dragbara längs cirkelns rand (min 15° isär).
 * Geometrin beräknas rent ur vinkelpositionerna (ingen "specialkod" för
 * supplementfallet — samma formel täcker alla lägen, se kommentarer vid
 * computeGeometry()).
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som ma3c-2.3).
 * API: window.VISUALISERINGAR['ma2c-4.11'] = { mount(el) → { destroy() } }.
 */
(function () {
    'use strict';

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
    // Sweep-/large-arc-flaggor för en cirkelbåge mellan två strålriktningar.
    // wantReflex = false → den korta vägen (≤ 180°), true → den långa.
    // (Verifierad numeriskt mot .claude/verify-vinkelbagar.js arcCenter().)
    function arcFlags(angle1, angle2, wantReflex) {
        var cw = normDeg(angle2 - angle1);
        var shortIsCW = cw <= 180;
        if (!wantReflex) return shortIsCW ? { laf: 0, sf: 1 } : { laf: 0, sf: 0 };
        return shortIsCW ? { laf: 1, sf: 0 } : { laf: 1, sf: 1 };
    }
    function arcPathD(cx, cy, r, a1, a2, wantReflex) {
        var f = arcFlags(a1, a2, wantReflex);
        var p1 = pt(cx, cy, r, a1), p2 = pt(cx, cy, r, a2);
        return 'M ' + p1.x.toFixed(2) + ' ' + p1.y.toFixed(2) + ' A ' + r + ' ' + r +
            ' 0 ' + f.laf + ' ' + f.sf + ' ' + p2.x.toFixed(2) + ' ' + p2.y.toFixed(2);
    }
    // Flaggor för en cirkelbåge mellan a1 och a2 där SIDAN väljs explicit via
    // goForward (true = den "framåt"-båge av längd d = normDeg(a2−a1), false
    // = den bakåt-vända bågen av längd 360−d). Används för bågarna kring O
    // (den gemensamma cirkelbågen + medelpunktsvinkelns markör), där sidan
    // måste följa isPOnForwardArc — INTE en generisk "korta vägen"-gissning.
    // (arcFlags ovan blir tvetydig exakt när d = 180°, dvs. när AB är en
    // diameter: båda riktningarna är då lika "korta", så "wantReflex"
    // ensam kan inte avgöra vilken sida av kordan som saknar P.)
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
    function bisectorShort(a1, a2) { return normDeg(a1 + shortSignedDiff(a1, a2) / 2); }
    // Anchor/dy för en radiellt placerad etikett i riktningen angleDeg.
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
        rand: '#4a7d3a',       // randvinkel x — grön (samma familj som sekant)
        central: '#c8324a',    // medelpunktsvinkel y — röd (som teorifigurens accent)
        arcHl: '#2563c9'       // gemensam cirkelbåge — blå (samma familj som kurvan)
    };

    var MIN_GAP = 15;   // minsta vinkelavstånd (grader) mellan A, B, P

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        // Startläge: medelpunktsvinkel 120°, randvinkel 60° — samma tal som
        // Exempel 1 i genomgången.
        var state = { aA: 150, aB: 30, aP: 270, step: 1, revealed: false };
        var trail = [];         // tidigare P-vinklar (spår i steg 1)
        var lastTrailAngle = null;
        var animId = null;      // rAF-id för "Gör AB till diameter"
        var dragging = null;    // 'A' | 'B' | 'P' | null

        // ── Scen-geometri ────────────────────────────────────────────────
        var W = 560, H = 400;
        var O = { x: 280, y: 195 }, R = 145;
        var R_P = 32, R_O = 34;           // vinkelbågeradier vid P resp. O
        var LABEL_R = R + 20;             // radie för A/B/P-etiketter
        var HIT_R = 18, DOT_R = 5;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Randvinkeljakten';
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
            'aria-label': 'Interaktiv figur: en cirkel med punkterna A, B och P på ' +
                'randen. Dra punkterna för att utforska randvinkelsatsen — randvinkeln ' +
                'vid P och medelpunktsvinkeln vid O.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        card.appendChild(formelA);

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
            { n: 1, label: '1 · Dra punkten' },
            { n: 2, label: '2 · Medelpunktsvinkeln' },
            { n: 3, label: '3 · Specialfall' }
        ];
        var INSTR = {
            1: 'Punkten <em>P</em> ligger på cirkelns rand. Vinkeln <em>x</em> vid ' +
               '<em>P</em>, mellan linjerna till <em>A</em> och <em>B</em>, kallas en ' +
               'randvinkel. Gissa först: vad händer med <em>x</em> när du drar ' +
               '<em>P</em> längs cirkeln — växer den, krymper den, eller är den ' +
               'konstant? Dra i punkten och se själv (dra gärna även <em>A</em> och ' +
               '<em>B</em>).',
            2: 'Medelpunkten <em>O</em> ligger mitt i cirkeln. Vinkeln <em>y</em> vid ' +
               '<em>O</em>, mellan radierna till samma punkter <em>A</em> och ' +
               '<em>B</em>, kallas medelpunktsvinkeln. Dra <em>P</em>, <em>A</em> eller ' +
               '<em>B</em> och jämför gradtalen — medelpunktsvinkeln är alltid dubbelt ' +
               'så stor som randvinkeln på samma cirkelbåge.',
            3: 'Testa specialfallen. Tryck på knappen för att göra <em>AB</em> till en ' +
               'diameter — då blir randvinkeln exakt 90°, oavsett var <em>P</em> ligger ' +
               '(Tales sats). Dra sedan <em>P</em> till andra sidan kordan <em>AB</em> ' +
               '(den mindre bågen) — vinkeln byter till sitt supplement, 180° − ' +
               '<em>x</em>, eftersom den nu står på den andra bågen.'
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
        var legArc = legendItem(COL.arcHl, 'gemensam cirkelbåge');
        var legChord = legendItem(COL.ink, 'korda <em>AB</em>');
        var legRand = legendItem(COL.rand, 'randvinkel <em>x</em>');
        var legCentral = legendItem(COL.central, 'medelpunktsvinkel <em>y</em>');
        legend.appendChild(legArc);
        legend.appendChild(legChord);
        legend.appendChild(legRand);
        legend.appendChild(legCentral);

        // ── Knapp: gör AB till diameter (steg 3) ───────────────────────────
        var diamBtn = document.createElement('button');
        diamBtn.type = 'button';
        diamBtn.className = 'lab-btn';
        diamBtn.textContent = 'Gör AB till diameter';
        diamBtn.addEventListener('click', function () { startDiameterAnim(); });
        actions.appendChild(diamBtn);

        // ── Återställ ─────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            stopAnim();
            state.aA = 150; state.aB = 30; state.aP = 270;
            state.revealed = false;
            trail = []; lastTrailAngle = null;
            update();
        });
        foot.appendChild(reset);

        // ── Geometri för aktuellt läge ───────────────────────────────────
        // Kärnformel (samma i alla lägen — inget specialfall för
        // supplementet, det faller ut automatiskt):
        //   d = vinkelavståndet A→B "framåt" (stigande vinkel), [0,360)
        //   isPOnForwardArc: står P på den framåt-bågen (längd d)?
        //   centralUse = bågen A–B som INTE innehåller P (medelpunktsvinkeln
        //                på just den bågen randvinkeln står på)
        //   x = centralUse / 2 (randvinkelsatsen)
        function computeGeometry() {
            var d = normDeg(state.aB - state.aA);
            var isPOnForwardArc = normDeg(state.aP - state.aA) < d;
            var centralUse = isPOnForwardArc ? (360 - d) : d;
            var v = centralUse / 2;
            var wantReflex = centralUse > 180 + 1e-9;
            var midArcAngle = isPOnForwardArc
                ? normDeg(state.aB + (360 - d) / 2)
                : normDeg(state.aA + d / 2);
            var isDiameter = Math.abs(d - 180) < 0.5;
            var xDisplay = Math.round(v);
            var yDisplay = 2 * xDisplay;
            return {
                d: d, isPOnForwardArc: isPOnForwardArc, centralUse: centralUse,
                v: v, wantReflex: wantReflex, midArcAngle: midArcAngle,
                isDiameter: isDiameter, xDisplay: xDisplay, yDisplay: yDisplay
            };
        }

        // ── Klämning: håll min. 15° avstånd mellan A, B och P ─────────────
        function clampAgainst(angle, others) {
            others.forEach(function (oa) {
                var diff = shortSignedDiff(oa, angle);
                if (Math.abs(diff) < MIN_GAP) {
                    angle = normDeg(oa + (diff >= 0 ? MIN_GAP : -MIN_GAP));
                }
            });
            return angle;
        }

        // ── Drag ──────────────────────────────────────────────────────────
        function clientToAngle(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            var px = (clientX - r.left) * W / r.width;
            var py = (clientY - r.top) * H / r.height;
            return normDeg(Math.atan2(py - O.y, px - O.x) * 180 / Math.PI);
        }
        svg.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var raw = clientToAngle(e.clientX, e.clientY);
            if (dragging === 'A') {
                state.aA = clampAgainst(raw, [state.aB, state.aP]);
            } else if (dragging === 'B') {
                state.aB = clampAgainst(raw, [state.aA, state.aP]);
            } else {
                state.aP = clampAgainst(raw, [state.aA, state.aB]);
                pushTrail();
            }
            update();
        });
        function endDrag() { dragging = null; }
        svg.addEventListener('pointerup', endDrag);
        svg.addEventListener('pointercancel', endDrag);

        function pushTrail() {
            if (lastTrailAngle != null && Math.abs(shortSignedDiff(lastTrailAngle, state.aP)) < 9) return;
            lastTrailAngle = state.aP;
            trail.push(state.aP);
            if (trail.length > 36) trail.shift();
            if (trail.length >= 2) state.revealed = true;
        }

        // ── Animation: gör AB till diameter ────────────────────────────────
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
        }
        function startDiameterAnim() {
            stopAnim();
            var startB = state.aB;
            var targetB = normDeg(state.aA + 180);
            var delta = shortSignedDiff(startB, targetB);
            var T_MS = 900, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / T_MS, 0, 1);
                var ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
                state.aB = normDeg(startB + delta * ease);
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else {
                    animId = null;
                    state.aB = targetB;
                    state.aP = clampAgainst(state.aP, [state.aA, state.aB]);
                    update();
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Rita scenen ──────────────────────────────────────────────────
        function makeHit(label, angle) {
            var p = pt(O.x, O.y, R, angle);
            var hit = svgEl('circle', {
                cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: HIT_R,
                fill: 'rgba(0,0,0,0)', 'data-pt': label
            });
            hit.style.cursor = 'grab';
            hit.addEventListener('pointerdown', function (e) {
                stopAnim();
                dragging = label;
                try { svg.setPointerCapture(e.pointerId); } catch (err) {}
                e.preventDefault();
            });
            return hit;
        }

        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var g = computeGeometry();
            var A = pt(O.x, O.y, R, state.aA);
            var B = pt(O.x, O.y, R, state.aB);
            var P = pt(O.x, O.y, R, state.aP);

            // Cirkeln
            svg.appendChild(svgEl('circle', {
                cx: O.x, cy: O.y, r: R, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6
            }));

            // Gemensam cirkelbåge (den båge AB som INTE innehåller P) — blå,
            // streckad, ligger kvar oavsett var P dras (bara vilken sida den
            // är på kan byta).
            svg.appendChild(svgEl('path', {
                d: arcPathSide(O.x, O.y, R, state.aA, state.aB, !g.isPOnForwardArc),
                fill: 'none', stroke: COL.arcHl, 'stroke-width': 4, 'stroke-dasharray': '9 7',
                'stroke-linecap': 'round'
            }));

            // Spår av tidigare P-lägen (steg 1) — visar att x inte ändras.
            if (state.step === 1) {
                trail.forEach(function (ang) {
                    var tp = pt(O.x, O.y, R, ang);
                    svg.appendChild(svgEl('circle', {
                        cx: tp.x.toFixed(2), cy: tp.y.toFixed(2), r: 2.6,
                        fill: 'rgba(74,125,58,0.35)'
                    }));
                });
            }

            // Korda AB (bläck)
            svg.appendChild(svgEl('line', {
                x1: A.x.toFixed(2), y1: A.y.toFixed(2), x2: B.x.toFixed(2), y2: B.y.toFixed(2),
                stroke: COL.ink, 'stroke-width': 1.8
            }));

            // Radierna OA, OB + medelpunkten O (steg 2+)
            if (state.step >= 2) {
                svg.appendChild(svgEl('line', {
                    x1: O.x, y1: O.y, x2: A.x.toFixed(2), y2: A.y.toFixed(2),
                    stroke: COL.central, 'stroke-width': 1.8
                }));
                svg.appendChild(svgEl('line', {
                    x1: O.x, y1: O.y, x2: B.x.toFixed(2), y2: B.y.toFixed(2),
                    stroke: COL.central, 'stroke-width': 1.8
                }));
                svg.appendChild(svgEl('circle', { cx: O.x, cy: O.y, r: 3.4, fill: COL.ink }));
            }

            // Vinkelben PA, PB (grönt)
            svg.appendChild(svgEl('line', {
                x1: P.x.toFixed(2), y1: P.y.toFixed(2), x2: A.x.toFixed(2), y2: A.y.toFixed(2),
                stroke: COL.rand, 'stroke-width': 1.8
            }));
            svg.appendChild(svgEl('line', {
                x1: P.x.toFixed(2), y1: P.y.toFixed(2), x2: B.x.toFixed(2), y2: B.y.toFixed(2),
                stroke: COL.rand, 'stroke-width': 1.8
            }));

            // Randvinkelns båge vid P (eller rät-vinkel-symbol om x = 90,0°)
            var dirPA = normDeg(Math.atan2(A.y - P.y, A.x - P.x) * 180 / Math.PI);
            var dirPB = normDeg(Math.atan2(B.y - P.y, B.x - P.x) * 180 / Math.PI);
            var bisP = bisectorShort(dirPA, dirPB);
            if (Math.abs(g.v - 90) < 0.5) {
                var s = 15;
                var q1 = pt(P.x, P.y, s, dirPA), q2 = pt(P.x, P.y, s, dirPB);
                var corner = { x: q1.x + q2.x - P.x, y: q1.y + q2.y - P.y };
                svg.appendChild(svgEl('polyline', {
                    points: q1.x.toFixed(1) + ',' + q1.y.toFixed(1) + ' ' +
                        corner.x.toFixed(1) + ',' + corner.y.toFixed(1) + ' ' +
                        q2.x.toFixed(1) + ',' + q2.y.toFixed(1),
                    fill: 'none', stroke: COL.rand, 'stroke-width': 2
                }));
            } else {
                svg.appendChild(svgEl('path', {
                    d: arcPathD(P.x, P.y, R_P, dirPA, dirPB, false),
                    fill: 'none', stroke: COL.rand, 'stroke-width': 2
                }));
            }
            // x-etiketten: framför bågen, på bisektrisen, i fri yta.
            var xLabelPt = pt(P.x, P.y, R_P + 17, bisP);
            var xAnchor = radialAnchor(bisP);
            svg.appendChild(svgVarText(
                { x: xLabelPt.x.toFixed(1), y: (xLabelPt.y + xAnchor.dy).toFixed(1),
                  'font-size': 14.5, 'text-anchor': xAnchor.anchor, fill: COL.rand },
                ['*x', ' = ' + g.xDisplay + '°']));

            // Medelpunktsvinkelns båge vid O (steg 2+)
            if (state.step >= 2) {
                svg.appendChild(svgEl('path', {
                    d: arcPathSide(O.x, O.y, R_O, state.aA, state.aB, !g.isPOnForwardArc),
                    fill: 'none', stroke: COL.central, 'stroke-width': 2
                }));
                var yLabelPt = pt(O.x, O.y, R_O + 17, g.midArcAngle);
                var yAnchor = radialAnchor(g.midArcAngle);
                svg.appendChild(svgVarText(
                    { x: yLabelPt.x.toFixed(1), y: (yLabelPt.y + yAnchor.dy).toFixed(1),
                      'font-size': 14.5, 'text-anchor': yAnchor.anchor, fill: COL.central },
                    ['*y', ' = ' + g.yDisplay + '°']));

                // O-etiketten, på motsatt sida (in mot P-sidan) för att inte
                // krocka med y-etiketten/den röda bågen.
                var oDir = normDeg(g.midArcAngle + 180);
                var oLabelPt = pt(O.x, O.y, 20, oDir);
                var oAnchor = radialAnchor(oDir);
                svg.appendChild(svgVarText(
                    { x: oLabelPt.x.toFixed(1), y: (oLabelPt.y + oAnchor.dy).toFixed(1),
                      'font-size': 14, 'text-anchor': oAnchor.anchor, fill: COL.ink },
                    ['O']));
            }

            // A-, B-, P-etiketter, radiellt utanför cirkeln.
            [['A', state.aA], ['B', state.aB], ['P', state.aP]].forEach(function (pr) {
                var name = pr[0], ang = pr[1];
                var lp = pt(O.x, O.y, LABEL_R, ang);
                var anc = radialAnchor(ang);
                svg.appendChild(svgVarText(
                    { x: lp.x.toFixed(1), y: (lp.y + anc.dy).toFixed(1),
                      'font-size': 15, 'text-anchor': anc.anchor, fill: COL.ink },
                    [name]));
            });

            // Punktmarkörer
            [A, B, P].forEach(function (p) {
                svg.appendChild(svgEl('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: DOT_R, fill: COL.ink }));
            });

            // Dragbara träffytor — sist, överst i z-ordningen.
            svg.appendChild(makeHit('A', state.aA));
            svg.appendChild(makeHit('B', state.aB));
            svg.appendChild(makeHit('P', state.aP));

            return g;
        }

        // ── Formel + anteckning ─────────────────────────────────────────
        function updateFormula(g) {
            if (state.step >= 2) {
                katexInto(formelA,
                    '\\textcolor{' + COL.central + '}{y} = 2\\textcolor{' + COL.rand + '}{x} = ' +
                    '2 \\cdot \\textcolor{' + COL.rand + '}{' + g.xDisplay + '°} = ' +
                    '\\textcolor{' + COL.central + '}{' + g.yDisplay + '°}');
            } else {
                formelA.textContent = '';
            }

            var html = '';
            if (state.step === 1) {
                if (state.revealed) {
                    html = 'Randvinkeln ändras inte! Alla randvinklar som står på samma ' +
                        'cirkelbåge är lika stora — just nu alltid <em>x</em> = ' + g.xDisplay +
                        '°, oavsett var på bågen <em>P</em> ligger.';
                }
            } else if (state.step === 2) {
                html = 'Medelpunktsvinkeln är alltid dubbelt så stor som randvinkeln på ' +
                    'samma cirkelbåge: <em>y</em> = 2<em>x</em>.';
            } else if (state.step === 3) {
                if (g.isDiameter) {
                    html = '<em>AB</em> är nu en diameter. Randvinkeln är exakt 90°, ' +
                        'oavsett var <em>P</em> ligger på cirkeln — det här kallas Tales sats.';
                } else if (g.wantReflex) {
                    html = '<em>P</em> står nu på den mindre bågen. Vinkeln som bildas är ' +
                        'supplementet till randvinkeln på den större bågen (180° − <em>x</em>). ' +
                        'Just nu är <em>x</em> = ' + g.xDisplay + '°.';
                } else {
                    html = 'Dra <em>P</em> till andra sidan kordan <em>AB</em> (den mindre ' +
                        'bågen) för att se supplementfallet, eller tryck på knappen ovan.';
                }
            }
            note.innerHTML = html;
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) {
                b.classList.toggle('active', state.step === i + 1);
            });
            instr.innerHTML = INSTR[state.step];
            legCentral.style.display = state.step >= 2 ? '' : 'none';
            formelA.style.display = state.step >= 2 ? '' : 'none';
            actions.style.display = state.step === 3 ? '' : 'none';
            var g = draw();
            updateFormula(g);
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
    window.VISUALISERINGAR['ma2c-4.11'] = { mount: mount };
})();
