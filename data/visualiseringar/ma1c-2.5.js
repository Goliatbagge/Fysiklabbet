/* ma1c-2.5.js — visualisering: "Ekvationsvågen".
 *
 * Kärninsikt: en ekvation är en balansvåg. Man får göra VAD man vill med
 * den, bara man gör SAMMA sak på båda sidor — då förblir vågen (och
 * likheten) i balans. "Flytta över och byt tecken" är ingen magisk regel,
 * utan en synlig konsekvens av grundreglerna i ma1c-2.5 (addition,
 * subtraktion, multiplikation, division) och ma1c-2.6 (variabler i båda
 * led — ta bort variabeltermen från sidan med minst koefficient).
 *
 * Tre nivåer (egna knappar, inte lager på samma ekvation):
 *   1. 3x + 2 = 11            — grundfallet (subtraktion + division).
 *   2. 5x + 1 = 2x + 10        — x på båda sidor (ma1c-2.6, exempel 1a).
 *   3. 4x − 3 = 9              — subtraktion: konstanten −3 visas som tre
 *                                 "ballonger" (negativa vikter) som lyfter
 *                                 vågskålen; man blir av med dem genom att
 *                                 ADDERA 3 till båda led.
 *
 * Vågen räknar internt ut den FAKTISKA nettovikten (x-lådans vikt sätts
 * till nivåns lösning) för att kunna tippa fysikaliskt korrekt: alla
 * lagliga operationer (samma sak på båda sidor) håller vågen i balans av
 * sig själv, eftersom båda leden fortfarande är lika mycket värda. Fusk-
 * knappen ändrar bara vänster skål → vågen tippar på riktigt, och en
 * ångra-knapp återställer.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som
 * ma3c-2.3/ma2c-2.1). API: window.VISUALISERINGAR['ma1c-2.5'/'ma1c-2.6']
 * = { mount(el) → { destroy() } }.
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
    function fmt0(v) { return fmt(v, 0); }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

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
        ink: '#1f2530',
        inkSoft: '#5b6472',
        dash: 'rgba(31,37,48,0.45)',
        panFill: '#efe7d8',
        standFill: '#e4dac4',
        xFill: '#dbe7f7', xStroke: '#2563c9',      // x-låda — blå (samma familj som "okänd"/kurva i övriga moduler)
        wFill: '#f1dfa3', wStroke: '#a67c1e',      // enhetsvikt — mässing/guld
        balFill: '#f6d4d9', balStroke: '#c8324a',  // ballong (negativ vikt) — accentröd
        accent: '#c8324a',
        good: '#3f8f5c'
    };

    // ── De tre nivåerna (leftX·x + leftC = rightX·x + rightC) ─────────────
    var LEVELS = [
        { pill: 'Nivå 1 · 3x + 2 = 11', leftX: 3, leftC: 2, rightX: 0, rightC: 11, xSol: 3 },
        { pill: 'Nivå 2 · 5x + 1 = 2x + 10', leftX: 5, leftC: 1, rightX: 2, rightC: 10, xSol: 3 },
        { pill: 'Nivå 3 · 4x − 3 = 9', leftX: 4, leftC: -3, rightX: 0, rightC: 9, xSol: 3 }
    ];

    // ── Scen-geometri ───────────────────────────────────────────────────
    var W = 560, H = 420;
    var PIVOT = { x: 280, y: 128 };
    var RB = 98;                 // halva balklängden
    var LSTR = 95;                // sträng-/kedjelängd ner till vågskålen
    var DW = 78, DH = 30;         // vågskålens halvbredd/djup
    var SHELF_CAP = 5, CELL_W = 25, CELL_H = 24;   // rutnät för x-lådor/vikter
    var BAL_CAP = 4, BAL_W = 30, BAL_H = 32;       // rutnät för ballonger
    var TH_MAX = 0.22, K_THETA = 0.035;            // klampad tiltvinkel

    var uid = 0;

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────────
        var state = {
            levelIdx: 0,
            leftX: 0, leftC: 0, rightX: 0, rightC: 0,
            history: [],
            undoStack: [],
            cheating: false,
            solved: false,
            animating: false,
            theta: 0
        };
        var activeFx = null;   // { old:{left,right}, new:{left,right}, e } under animation
        var animId = null;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Ekvationsvågen';
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
            'aria-label': 'Interaktiv balansvåg som visar en ekvation. Vänster vågskål ' +
                'innehåller x-lådor och enhetsvikter (eller ballonger för negativa tal), ' +
                'höger vågskål enhetsvikter. Tryck på operationsknapparna för att göra ' +
                'samma sak på båda sidor och lösa ut x.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);
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
        legend.appendChild(legendItem(COL.xStroke, '<em>x</em>-låda'));
        legend.appendChild(legendItem(COL.wStroke, 'enhetsvikt (1)'));
        legend.appendChild(legendItem(COL.balStroke, 'ballong (−1)'));

        var formelMain = document.createElement('div');
        formelMain.className = 'lab-vis-formel';
        formelMain.style.fontSize = '19px';
        card.appendChild(formelMain);

        var historyBox = document.createElement('div');
        historyBox.style.cssText = 'margin-top:2px;';
        card.appendChild(historyBox);

        var formelKontroll = document.createElement('div');
        formelKontroll.className = 'lab-vis-formel';
        card.appendChild(formelKontroll);

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

        // ── Nivå-pills ────────────────────────────────────────────────────
        var pillBtns = [];
        LEVELS.forEach(function (L, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = L.pill;
            b.addEventListener('click', function () { loadLevel(i); });
            stepsRow.appendChild(b);
            pillBtns.push(b);
        });

        // ── Operationsknappar ─────────────────────────────────────────────
        var opBtn = document.createElement('button');
        opBtn.type = 'button';
        opBtn.className = 'lab-btn';
        opBtn.addEventListener('click', function () { performOp(false); });
        actions.appendChild(opBtn);

        var cheatBtn = document.createElement('button');
        cheatBtn.type = 'button';
        cheatBtn.className = 'lab-btn';
        cheatBtn.style.borderColor = COL.accent;
        cheatBtn.style.color = COL.accent;
        cheatBtn.addEventListener('click', function () { performOp(true); });
        actions.appendChild(cheatBtn);

        var undoBtn = document.createElement('button');
        undoBtn.type = 'button';
        undoBtn.className = 'lab-graf-reset';
        undoBtn.addEventListener('click', function () { undo(); });
        actions.appendChild(undoBtn);

        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () { loadLevel(0); });
        foot.appendChild(reset);

        // ── Ekvationslogik ────────────────────────────────────────────────
        function sideTex(X, C) {
            var parts = [];
            if (X) parts.push((X === 1 ? '' : fmtTex(X)) + 'x');
            if (C !== 0) parts.push((parts.length ? (C > 0 ? ' + ' : ' - ') : (C < 0 ? '-' : '')) + fmtTex(Math.abs(C)));
            if (!parts.length) parts.push('0');
            return parts.join('');
        }
        function buildEqTex(s) { return sideTex(s.leftX, s.leftC) + ' = ' + sideTex(s.rightX, s.rightC); }
        function subExpr(X, C, xSol) {
            var parts = [];
            if (X) parts.push((X === 1 ? '' : fmtTex(X) + '\\cdot ') + fmtTex(xSol));
            if (C || !parts.length) parts.push((parts.length ? (C >= 0 ? ' + ' : ' - ') : '') + fmtTex(Math.abs(C)));
            return parts.join('');
        }

        function constOp(side, val) {
            var isLeft = side === 'left';
            if (val > 0) {
                return {
                    kind: 'const', amount: val,
                    label: '− ' + fmt0(val) + ' på båda led',
                    cheatLabel: 'Ta bara bort ' + fmt0(val) + ' från vänster (testa!)',
                    apply: function (t) { if (isLeft) { t.leftC -= val; t.rightC -= val; } else { t.rightC -= val; t.leftC -= val; } },
                    cheatApply: function (t) { t.leftC -= val; }
                };
            }
            var av = -val;
            return {
                kind: 'const', amount: av,
                label: '+ ' + fmt0(av) + ' på båda led',
                cheatLabel: 'Lägg bara till ' + fmt0(av) + ' på vänster (testa!)',
                apply: function (t) { if (isLeft) { t.leftC += av; t.rightC += av; } else { t.rightC += av; t.leftC += av; } },
                cheatApply: function (t) { t.leftC += av; }
            };
        }
        function nextOp(s) {
            if (s.leftX !== s.rightX && s.leftX > 0 && s.rightX > 0) {
                var amt = Math.min(s.leftX, s.rightX);
                return {
                    kind: 'x', amount: amt,
                    label: '− ' + fmt0(amt) + 'x på båda led',
                    cheatLabel: 'Ta bara bort ' + fmt0(amt) + 'x från vänster (testa!)',
                    apply: function (t) { t.leftX -= amt; t.rightX -= amt; },
                    cheatApply: function (t) { t.leftX -= amt; }
                };
            }
            if (s.leftX !== 0 && s.leftC !== 0) return constOp('left', s.leftC);
            if (s.rightX !== 0 && s.rightC !== 0) return constOp('right', s.rightC);
            var coeff = s.leftX !== 0 ? s.leftX : s.rightX;
            if (coeff && coeff !== 1) {
                var isLeft = s.leftX !== 0;
                return {
                    kind: 'divide', amount: coeff,
                    label: 'Dela båda led med ' + fmt0(coeff),
                    cheatLabel: null,
                    apply: function (t) {
                        if (isLeft) { t.leftX = 1; t.rightX = t.rightX / coeff; t.rightC = t.rightC / coeff; }
                        else { t.rightX = 1; t.leftX = t.leftX / coeff; t.leftC = t.leftC / coeff; }
                    },
                    cheatApply: null
                };
            }
            return null;
        }
        function countsFromXC(X, C) { return { x: Math.max(X, 0), w: Math.max(C, 0), b: Math.max(-C, 0) }; }
        function currentCounts(side) {
            return side === 'left' ? countsFromXC(state.leftX, state.leftC) : countsFromXC(state.rightX, state.rightC);
        }
        function currentCountsBoth() { return { left: currentCounts('left'), right: currentCounts('right') }; }
        function thetaFor(s) {
            var L = LEVELS[s.levelIdx];
            var netLeft = s.leftX * L.xSol + s.leftC;
            var netRight = s.rightX * L.xSol + s.rightC;
            return clampNum(K_THETA * (netRight - netLeft), -TH_MAX, TH_MAX);
        }

        // ── Nivåbyte ──────────────────────────────────────────────────────
        function loadLevel(i) {
            stopAnim();
            var L = LEVELS[i];
            state.levelIdx = i;
            state.leftX = L.leftX; state.leftC = L.leftC; state.rightX = L.rightX; state.rightC = L.rightC;
            state.cheating = false; state.solved = false; state.animating = false; state.theta = 0;
            state.undoStack = [];
            state.history = [{ tex: buildEqTex(state), label: null }];
            activeFx = null;
            update();
        }

        // ── Operationer + fusk + ångra ──────────────────────────────────────
        function snapshotBackup(label) {
            return {
                leftX: state.leftX, leftC: state.leftC, rightX: state.rightX, rightC: state.rightC,
                cheating: state.cheating, solved: state.solved, historyLen: state.history.length, label: label
            };
        }
        function performOp(cheat) {
            if (state.animating || state.cheating) return;
            var op = nextOp(state);
            if (!op || (cheat && !op.cheatApply)) return;
            var label = cheat ? op.cheatLabel : op.label;
            var backup = snapshotBackup(label);
            var oldCounts = currentCountsBoth();
            if (cheat) { op.cheatApply(state); state.cheating = true; }
            else {
                op.apply(state);
                state.cheating = false;
                state.history.push({ tex: buildEqTex(state), label: op.label });
                state.solved = (nextOp(state) === null);
            }
            state.undoStack.push(backup);
            var newCounts = currentCountsBoth();
            runAnim(oldCounts, newCounts);
        }
        function undo() {
            if (state.animating || !state.undoStack.length) return;
            var backup = state.undoStack.pop();
            var oldCounts = currentCountsBoth();
            state.leftX = backup.leftX; state.leftC = backup.leftC;
            state.rightX = backup.rightX; state.rightC = backup.rightC;
            state.cheating = backup.cheating; state.solved = backup.solved;
            state.history.length = backup.historyLen;
            var newCounts = currentCountsBoth();
            runAnim(oldCounts, newCounts);
        }
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            state.animating = false;
            activeFx = null;
        }
        function runAnim(oldCounts, newCounts) {
            if (animId != null) cancelAnimationFrame(animId);
            state.animating = true;
            activeFx = { old: oldCounts, new: newCounts, e: 0 };
            update();
            var themeFrom = state.theta, themeTo = thetaFor(state);
            var t0 = null, DUR = 650;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / DUR, 0, 1);
                var e = easeOutCubic(p);
                activeFx.e = e;
                state.theta = lerp(themeFrom, themeTo, e);
                render();
                if (p < 1) animId = requestAnimationFrame(frame);
                else {
                    state.theta = themeTo; activeFx = null; state.animating = false;
                    animId = null; render(); updateButtons(state.solved ? null : nextOp(state));
                }
            }
            animId = requestAnimationFrame(frame);
        }

        // ── Instruktions- och notetext ────────────────────────────────────
        function instrFor(op) {
            if (state.cheating) {
                return 'Vågen tippar! Du ändrade bara <em>vänster</em> sida av likheten. ' +
                    'Tryck på "Ångra" och testa igen — gör samma sak på <em>båda</em> led.';
            }
            if (state.solved) {
                return '<em>x</em> är ensam på vänster sida. Kontrollera lösningen genom att ' +
                    'sätta in den i den ursprungliga ekvationen — se raden nedan.';
            }
            if (!op) return '';
            if (op.kind === 'x') {
                return '<em>x</em> finns på båda sidor om likhetstecknet. Vi tar bort ' +
                    'variabeltermen från den sida som har minst koefficient — tryck på ' +
                    'knappen för att subtrahera samma term från båda led.';
            }
            if (op.kind === 'const') {
                return op.label.charAt(0) === '+'
                    ? 'En term som subtraheras blir vi av med genom att addera den — till båda led.'
                    : 'En term som adderas blir vi av med genom att subtrahera den — från båda led.';
            }
            return 'En faktor som multiplicerar <em>x</em> blir vi av med genom att dividera med den — i båda led.';
        }
        function updateNote() {
            if (state.cheating) {
                note.style.color = '';
                note.innerHTML = 'Vågen är inte längre i balans — vi rörde bara vänster sida. ' +
                    'Ekvationen som nu står stämmer inte längre med den ursprungliga.';
            } else if (state.solved) {
                var L = LEVELS[state.levelIdx];
                note.style.color = COL.good;
                note.innerHTML = '<em>x</em> = ' + fmt0(L.xSol) + ' — och vågen är fortfarande i balans!';
            } else if (state.history.length > 1) {
                var last = state.history[state.history.length - 1];
                note.style.color = '';
                note.innerHTML = 'Vi gjorde <em>' + last.label + '</em> — samma sak på båda leden, så vågen är fortfarande i balans.';
            } else {
                note.style.color = '';
                note.textContent = '';
            }
        }

        // ── Formler + historik ────────────────────────────────────────────
        function updateFormulas() {
            formelMain.style.color = state.cheating ? COL.accent : COL.ink;
            katexInto(formelMain, buildEqTex(state));

            historyBox.innerHTML = '';
            state.history.forEach(function (h) {
                var row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:center;justify-content:center;' +
                    'gap:8px;font-size:12.5px;color:var(--lab-ink-soft);margin-top:3px;flex-wrap:wrap;';
                if (h.label) {
                    var lbl = document.createElement('span');
                    lbl.textContent = h.label + ' →';
                    lbl.style.fontFamily = 'var(--lab-font-mono)';
                    row.appendChild(lbl);
                }
                var eq = document.createElement('span');
                katexInto(eq, h.tex);
                row.appendChild(eq);
                historyBox.appendChild(row);
            });

            if (state.solved) {
                var L = LEVELS[state.levelIdx];
                var leftVal = L.leftX * L.xSol + L.leftC, rightVal = L.rightX * L.xSol + L.rightC;
                formelKontroll.style.display = '';
                formelKontroll.style.fontSize = '15px';
                katexInto(formelKontroll,
                    '\\mathrm{VL} = ' + subExpr(L.leftX, L.leftC, L.xSol) + ' = ' + fmtTex(leftVal) +
                    '\\qquad \\mathrm{HL} = ' + subExpr(L.rightX, L.rightC, L.xSol) + ' = ' + fmtTex(rightVal));
            } else {
                formelKontroll.style.display = 'none';
                formelKontroll.textContent = '';
            }
            updateNote();
        }

        function updateButtons(op) {
            var busy = state.animating;
            if (state.cheating) {
                opBtn.style.display = 'none'; cheatBtn.style.display = 'none';
                undoBtn.style.display = ''; undoBtn.disabled = busy; undoBtn.textContent = 'Ångra (rätta till)';
            } else if (state.solved) {
                opBtn.style.display = 'none'; cheatBtn.style.display = 'none';
                undoBtn.style.display = state.undoStack.length ? '' : 'none';
                undoBtn.disabled = busy; undoBtn.textContent = 'Ångra sista steget';
            } else if (op) {
                opBtn.style.display = ''; opBtn.disabled = busy; opBtn.textContent = op.label;
                if (op.cheatApply) { cheatBtn.style.display = ''; cheatBtn.disabled = busy; cheatBtn.textContent = op.cheatLabel; }
                else cheatBtn.style.display = 'none';
                undoBtn.style.display = state.undoStack.length ? '' : 'none';
                undoBtn.disabled = busy; undoBtn.textContent = 'Ångra';
            } else {
                opBtn.style.display = 'none'; cheatBtn.style.display = 'none'; undoBtn.style.display = 'none';
            }
            actions.style.display =
                (opBtn.style.display === '' || cheatBtn.style.display === '' || undoBtn.style.display === '') ? '' : 'none';
        }

        // ── Scen: rutnätsplacering av x-lådor/vikter/ballonger ────────────
        function gridPositions(n, cap, cellW, cellH, centerX, baseY, dir) {
            var positions = [];
            if (n <= 0) return positions;
            var rows = Math.ceil(n / cap);
            for (var r = 0; r < rows; r++) {
                var cnt = Math.min(cap, n - r * cap);
                var rowY = baseY + dir * r * cellH;
                var totalW = cnt * cellW;
                var startX = centerX - totalW / 2 + cellW / 2;
                for (var c = 0; c < cnt; c++) positions.push({ x: startX + c * cellW, y: rowY });
            }
            return positions;
        }
        function drawXBox(parent, x, y, op) {
            var g = svgEl('g', { opacity: op });
            g.appendChild(svgEl('rect', { x: x - 12, y: y - 12, width: 24, height: 24, rx: 3, fill: COL.xFill, stroke: COL.xStroke, 'stroke-width': 1.6 }));
            g.appendChild(svgVarText({ x: x, y: y + 5, 'font-size': 14, 'text-anchor': 'middle', fill: COL.xStroke }, ['*x']));
            parent.appendChild(g);
        }
        function drawWeight(parent, x, y, op) {
            var g = svgEl('g', { opacity: op });
            g.appendChild(svgEl('circle', { cx: x, cy: y, r: 11, fill: COL.wFill, stroke: COL.wStroke, 'stroke-width': 1.4 }));
            g.appendChild(svgVarText({ x: x, y: y + 4, 'font-size': 11, 'text-anchor': 'middle', fill: COL.ink }, ['1']));
            parent.appendChild(g);
        }
        function drawBalloon(parent, x, y, op) {
            var g = svgEl('g', { opacity: op });
            g.appendChild(svgEl('line', { x1: x, y1: y + 15, x2: x, y2: y + 32, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
            g.appendChild(svgEl('ellipse', { cx: x, cy: y, rx: 12, ry: 15, fill: COL.balFill, stroke: COL.balStroke, 'stroke-width': 1.4 }));
            g.appendChild(svgEl('polygon', { points: (x - 3) + ',' + (y + 14) + ' ' + (x + 3) + ',' + (y + 14) + ' ' + x + ',' + (y + 19), fill: COL.balStroke }));
            g.appendChild(svgVarText({ x: x, y: y + 4, 'font-size': 10, 'text-anchor': 'middle', fill: COL.balStroke }, ['−1']));
            parent.appendChild(g);
        }
        function drawItem(parent, type, x, y, op) {
            if (type === 'x') drawXBox(parent, x, y, op);
            else if (type === 'w') drawWeight(parent, x, y, op);
            else drawBalloon(parent, x, y, op);
        }
        function renderTypeSlice(parent, oldN, newN, oldPos, newPos, oldOff, newOff, type, e) {
            var kept = Math.min(oldN, newN), i;
            for (i = 0; i < kept; i++) drawItem(parent, type, newPos[newOff + i].x, newPos[newOff + i].y, 1);
            if (oldN > newN) {
                for (i = kept; i < oldN; i++) {
                    var p0 = oldPos[oldOff + i];
                    drawItem(parent, type, p0.x, p0.y - 70 * e, 1 - e);
                }
            } else if (newN > oldN) {
                for (i = kept; i < newN; i++) {
                    var p1 = newPos[newOff + i];
                    drawItem(parent, type, p1.x, lerp(40, p1.y, e), e);
                }
            }
        }
        function drawShelfBucket(parent, oldC, newC, panX, baseY, e) {
            var oldTotal = oldC.x + oldC.w, newTotal = newC.x + newC.w;
            var oldPos = gridPositions(oldTotal, SHELF_CAP, CELL_W, CELL_H, panX, baseY, -1);
            var newPos = gridPositions(newTotal, SHELF_CAP, CELL_W, CELL_H, panX, baseY, -1);
            renderTypeSlice(parent, oldC.x, newC.x, oldPos, newPos, 0, 0, 'x', e);
            renderTypeSlice(parent, oldC.w, newC.w, oldPos, newPos, oldC.x, newC.x, 'w', e);
        }
        function drawBalloonBucket(parent, oldC, newC, panX, baseY, e) {
            var oldPos = gridPositions(oldC.b, BAL_CAP, BAL_W, BAL_H, panX, baseY, -1);
            var newPos = gridPositions(newC.b, BAL_CAP, BAL_W, BAL_H, panX, baseY, -1);
            renderTypeSlice(parent, oldC.b, newC.b, oldPos, newPos, 0, 0, 'b', e);
        }

        // ── Scen: stativ, balk, vågskålar ─────────────────────────────────
        function drawStand(parent) {
            parent.appendChild(svgEl('line', { x1: 180, y1: 376, x2: 380, y2: 376, stroke: COL.dash, 'stroke-width': 1, 'stroke-dasharray': '5 4' }));
            parent.appendChild(svgEl('path', {
                d: 'M' + (PIVOT.x - 10) + ',340 L' + (PIVOT.x + 10) + ',340 L' + (PIVOT.x + 65) + ',376 L' + (PIVOT.x - 65) + ',376 Z',
                fill: COL.standFill, stroke: COL.ink, 'stroke-width': 2
            }));
            parent.appendChild(svgEl('rect', { x: PIVOT.x - 8, y: PIVOT.y, width: 16, height: 340 - PIVOT.y, fill: COL.ink }));
        }
        function drawBeam(parent, leftEnd, rightEnd) {
            parent.appendChild(svgEl('line', {
                x1: leftEnd.x, y1: leftEnd.y, x2: rightEnd.x, y2: rightEnd.y,
                stroke: COL.ink, 'stroke-width': 7, 'stroke-linecap': 'round'
            }));
            parent.appendChild(svgEl('circle', { cx: PIVOT.x, cy: PIVOT.y, r: 6, fill: COL.ink }));
            parent.appendChild(svgEl('circle', { cx: PIVOT.x, cy: PIVOT.y, r: 2.4, fill: COL.panFill }));
        }
        function drawPanSide(parent, side, beamEnd, oldC, newC, e) {
            var panX = beamEnd.x, panY = beamEnd.y + LSTR;
            parent.appendChild(svgEl('line', { x1: beamEnd.x, y1: beamEnd.y, x2: panX - DW * 0.72, y2: panY, stroke: COL.ink, 'stroke-width': 1.2 }));
            parent.appendChild(svgEl('line', { x1: beamEnd.x, y1: beamEnd.y, x2: panX + DW * 0.72, y2: panY, stroke: COL.ink, 'stroke-width': 1.2 }));
            parent.appendChild(svgEl('circle', { cx: beamEnd.x, cy: beamEnd.y, r: 4, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));

            var d = 'M' + (panX - DW) + ',' + panY +
                ' Q' + (panX - DW * 0.5) + ',' + (panY + DH * 1.3) + ' ' + panX + ',' + (panY + DH) +
                ' Q' + (panX + DW * 0.5) + ',' + (panY + DH * 1.3) + ' ' + (panX + DW) + ',' + panY;
            parent.appendChild(svgEl('path', { d: d, fill: COL.panFill, stroke: COL.ink, 'stroke-width': 2 }));
            parent.appendChild(svgEl('ellipse', { cx: panX, cy: panY, rx: DW, ry: 7, fill: 'none', stroke: COL.ink, 'stroke-width': 1.6 }));

            drawShelfBucket(parent, oldC, newC, panX, panY + 16, e);
            drawBalloonBucket(parent, oldC, newC, panX, panY - 26, e);

            parent.appendChild(svgVarText(
                { x: panX, y: panY + DH + 20, 'font-size': 12, 'text-anchor': 'middle', fill: COL.inkSoft },
                [side === 'left' ? 'VL' : 'HL']));
        }

        // ── Master-rendering ──────────────────────────────────────────────
        function render() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var theta = state.theta;
            var leftEnd = { x: PIVOT.x - RB * Math.cos(theta), y: PIVOT.y - RB * Math.sin(theta) };
            var rightEnd = { x: PIVOT.x + RB * Math.cos(theta), y: PIVOT.y + RB * Math.sin(theta) };
            drawStand(svg);
            drawBeam(svg, leftEnd, rightEnd);
            var oldBoth = activeFx ? activeFx.old : null;
            var newBoth = activeFx ? activeFx.new : currentCountsBoth();
            var e = activeFx ? activeFx.e : 1;
            drawPanSide(svg, 'left', leftEnd, oldBoth ? oldBoth.left : currentCounts('left'), newBoth.left, e);
            drawPanSide(svg, 'right', rightEnd, oldBoth ? oldBoth.right : currentCounts('right'), newBoth.right, e);
        }

        function update() {
            pillBtns.forEach(function (b, i) { b.classList.toggle('active', state.levelIdx === i); });
            var op = state.solved ? null : nextOp(state);
            instr.innerHTML = instrFor(op);
            updateFormulas();
            updateButtons(op);
            render();
        }

        loadLevel(0);

        return {
            destroy: function () {
                stopAnim();
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-2.5'] = api;
    window.VISUALISERINGAR['ma1c-2.6'] = api;
})();
