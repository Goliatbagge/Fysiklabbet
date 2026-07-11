/* ma1c-5.7.js — visualisering: "Träddiagram-byggaren". Hör till ma1c-5.6
 * (produktregeln), ma1c-5.7 (träddiagram) och ma1c-5.8 (komplementhändelse).
 *
 * Scenario: en påse med röda och blå kulor. Man drar en kula, noterar
 * färgen, och drar sedan en kula till (med eller utan återläggning).
 * Standardläget (3 röda + 2 blå) är samma typ av exempel som
 * "Kulor med och utan återläggning" i ma1c-5.6.
 *
 * Kärninsikt:
 *   - Sannolikheter multipliceras LÄNGS en gren (produktregeln).
 *   - Sannolikheter för flera vägar adderas MELLAN grenarna.
 *   - Utan återläggning ändras nämnaren (och ev. täljaren) i nivå 2.
 *   - Komplementhändelsen: "alla vägar utom dessa" — ofta färre uträkningar.
 *
 * Fyra steg (lager):
 *   1. Bygg trädet     — påse med kulor, glidare för antal, växel med/utan
 *                         återläggning. Grenarnas sannolikheter (rå bråk,
 *                         som i genomgångens figur) uppdateras live.
 *   2. En väg = multiplikation — klicka ett löv, vägen dit lyser grönt,
 *                         live-formel med produkten längs grenarna.
 *   3. Flera vägar = addition  — välj en sammansatt händelse, alla
 *                         matchande vägar lyser, formeln summerar dem.
 *   4. Komplementhändelsen — "minst en röd" jämfört med komplementet
 *                         "ingen röd" (en enda, röd, väg) — samma svar,
 *                         färre uträkningar.
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
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function gcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { var t = b; b = a % b; a = t; }
        return a || 1;
    }
    function simplify(n, d) {
        if (n === 0) return { n: 0, d: 1 };
        var g = gcd(n, d);
        return { n: n / g, d: d / g };
    }
    function fracPlain(n, d) { return n === 0 ? '0' : (n + '/' + d); }
    function fracTexSimplified(s) {
        if (s.n === 0) return '0';
        if (s.d === 1) return String(s.n);
        return '\\dfrac{' + s.n + '}{' + s.d + '}';
    }
    // Avgör om bråket (i lägsta termer) har en ändlig decimalutveckling
    // (nämnarens enda primfaktorer är 2 och 5) — annars '\approx', aldrig
    // felaktigt '='.
    function decInfo(n, d) {
        var s = simplify(n, d);
        var t = s.d, terminating = true;
        while (t % 2 === 0) t /= 2;
        while (t % 5 === 0) t /= 5;
        terminating = (t === 1) || s.n === 0;
        var value = n / d;
        return {
            value: value,
            simp: s,
            terminating: terminating,
            // TeX-strängar: decimalkomma som {,} — annars renderar KaTeX
            // kommat som skiljetecken med mellanrum efter ("0, 84").
            decStr: fmtTex(value, terminating ? 6 : 3),
            percStr: fmtTex(value * 100, terminating ? 4 : 2)
        };
    }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    // Text med flerfärgade delar: parts = [{t:'röd', fill:'#c8324a'}, ...]
    function svgMixText(attrs, parts) {
        var el = svgEl('text', attrs);
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var t = svgEl('tspan', p.fill ? { fill: p.fill } : {});
            t.textContent = p.t;
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
        red: '#c8324a',       // röda kulor / grenar
        blue: '#2563c9',      // blå kulor / grenar
        highlight: '#2f8f46', // "vägen lyser" — multiplikation/summan
        dash: 'rgba(31,37,48,0.45)',
        track: 'rgba(15,22,32,0.22)'
    };

    // ── Trädets fasta struktur (två nivåer, röd/blå) ───────────────────
    var WORD = { red: 'röd', blue: 'blå' };
    var LEAVES = {
        RR: { c1: 'red', c2: 'red' },
        RB: { c1: 'red', c2: 'blue' },
        BR: { c1: 'blue', c2: 'red' },
        BB: { c1: 'blue', c2: 'blue' }
    };
    var LEAF_ORDER = ['RR', 'RB', 'BR', 'BB'];
    var EVENTS = [
        { key: 'olika', label: 'Olika färg', words: 'olika färg', leaves: ['RB', 'BR'] },
        { key: 'minstEnRod', label: 'Minst en röd', words: 'minst en röd', leaves: ['RR', 'RB', 'BR'] },
        { key: 'bada', label: 'Båda röda', words: 'båda röda', leaves: ['RR'] }
    ];

    function mount(el) {
        // ── Tillstånd ─────────────────────────────────────────────────
        var state = { red: 3, blue: 2, replacement: true, step: 1, selectedLeaf: null, selectedEvent: null };

        function wordsFor(key) {
            var m = LEAVES[key];
            return WORD[m.c1] + ', ' + WORD[m.c2];
        }
        function totals() {
            var total = state.red + state.blue;
            return { total: total, total2: state.replacement ? total : total - 1 };
        }
        function leafFrac(key) {
            var t = totals(), m = LEAVES[key];
            var n1 = state[m.c1], d1 = t.total;
            var n2 = (m.c2 === m.c1) ? (state.replacement ? state[m.c1] : state[m.c1] - 1) : state[m.c2];
            var d2 = t.total2;
            return { n1: n1, d1: d1, n2: n2, d2: d2, nProd: n1 * n2, dProd: d1 * d2 };
        }
        function buildProductTex(key) {
            var f = leafFrac(key), di = decInfo(f.nProd, f.dProd);
            var eq = di.terminating ? '=' : '\\approx';
            var rawTex = '\\dfrac{' + f.nProd + '}{' + f.dProd + '}';
            var simpTex = fracTexSimplified(di.simp);
            var s = 'P(\\text{' + wordsFor(key) + '}) = \\dfrac{' + f.n1 + '}{' + f.d1 + '} \\cdot \\dfrac{' +
                f.n2 + '}{' + f.d2 + '} = ' + rawTex;
            if (simpTex !== rawTex) s += ' = ' + simpTex;
            // Hoppa över decimalsteget om det bara skulle upprepa samma
            // heltal som redan visats (bråket förkortas till 0 eller 1).
            if (di.simp.d !== 1) s += ' ' + eq + ' ' + di.decStr;
            s += ' ' + eq + ' ' + di.percStr + '\\ \\%';
            return s;
        }
        function buildSumTex(words, leafKeys) {
            var fracs = leafKeys.map(leafFrac);
            var terms = fracs.map(function (f) { return '\\dfrac{' + f.n1 + '}{' + f.d1 + '} \\cdot \\dfrac{' + f.n2 + '}{' + f.d2 + '}'; });
            var rawTerms = fracs.map(function (f) { return '\\dfrac{' + f.nProd + '}{' + f.dProd + '}'; });
            var sumN = fracs.reduce(function (a, f) { return a + f.nProd; }, 0);
            var D = fracs[0].dProd;
            var di = decInfo(sumN, D);
            var eq = di.terminating ? '=' : '\\approx';
            var rawTex = '\\dfrac{' + sumN + '}{' + D + '}';
            var simpTex = fracTexSimplified(di.simp);
            var s = 'P(\\text{' + words + '}) = ' + terms.join(' + ') + ' = ' + rawTerms.join(' + ') + ' = ' + rawTex;
            if (simpTex !== rawTex) s += ' = ' + simpTex;
            if (di.simp.d !== 1) s += ' ' + eq + ' ' + di.decStr;
            s += ' ' + eq + ' ' + di.percStr + '\\ \\%';
            return s;
        }
        function buildComplementTex() {
            var bb = leafFrac('BB');
            var diBB = decInfo(bb.nProd, bb.dProd);
            var eqBB = diBB.terminating ? '=' : '\\approx';
            var D = bb.dProd, resultN = D - bb.nProd;
            var diR = decInfo(resultN, D);
            var eqR = diR.terminating ? '=' : '\\approx';
            var s = 'P(\\text{minst en röd}) = 1 - P(\\text{ingen röd}) = 1 - ' + fracTexSimplified(diBB.simp);
            if (diBB.simp.d !== 1) s += ' ' + eqBB + ' 1 - ' + diBB.decStr;
            s += ' ' + eqR + ' ' + diR.decStr;
            return s;
        }

        // ── Geometri ──────────────────────────────────────────────────
        var W = 560, H = 430;
        var BAG = { x: 24, y: 100, w: 92, h: 250, rx: 42 };
        var BAG_CX = BAG.x + BAG.w / 2, BAG_CY = BAG.y + BAG.h / 2;
        var ROOT = { x: 168, y: BAG_CY };
        var L1 = { red: { x: 300, y: 120 }, blue: { x: 300, y: 330 } };
        var L2 = {
            RR: { x: 450, y: 65 }, RB: { x: 450, y: 175 },
            BR: { x: 450, y: 275 }, BB: { x: 450, y: 385 }
        };

        // ── DOM-skelett ───────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Träddiagram-byggaren';
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
            'aria-label': 'Träddiagram över två dragningar av kulor ur en påse med röda och ' +
                'blå kulor. Grenarnas sannolikheter uppdateras när du ändrar antal kulor ' +
                'eller växlar med och utan återläggning.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var eventsRow = document.createElement('div');
        eventsRow.className = 'lab-vis-steps';
        eventsRow.style.marginTop = '2px';
        card.appendChild(eventsRow);

        var formelA = document.createElement('div');
        formelA.className = 'lab-vis-formel';
        formelA.style.color = COL.highlight;
        card.appendChild(formelA);

        var formelB = document.createElement('div');
        formelB.className = 'lab-vis-formel';
        formelB.style.color = COL.red;
        card.appendChild(formelB);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var repLabel = document.createElement('label');
        repLabel.className = 'lab-graf-check';
        var repCb = document.createElement('input');
        repCb.type = 'checkbox';
        repCb.checked = state.replacement;
        repCb.addEventListener('change', function () {
            state.replacement = repCb.checked;
            update();
        });
        repLabel.appendChild(repCb);
        var repTxt = document.createElement('span');
        repTxt.innerHTML = 'Med återläggning (avkryssad = utan återläggning)';
        repLabel.appendChild(repTxt);
        controls.appendChild(repLabel);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Bygg trädet' },
            { n: 2, label: '2 · En väg = multiplikation' },
            { n: 3, label: '3 · Flera vägar = addition' },
            { n: 4, label: '4 · Komplementhändelsen' }
        ];
        var INSTR = {
            1: 'Påsen innehåller <em>röda</em> och <em>blå</em> kulor. Du drar en kula, noterar ' +
               'färgen, lägger den <em>eventuellt</em> tillbaka, och drar sedan en kula till. ' +
               'Ändra antalet kulor och växla med/utan återläggning — sannolikheterna på ' +
               'grenarna räknas om direkt.',
            2: 'Klicka på ett <em>löv</em> (ett utfall längst till höger) — vägen dit lyser ' +
               'grönt. Sannolikheten för en väg fås genom att <em>multiplicera</em> ' +
               'sannolikheterna längs grenarna. Gissa själv först: blir P(röd, röd) större ' +
               'eller mindre <em>utan</em> återläggning?',
            3: 'Välj en händelse som kan inträffa på flera sätt. Alla vägar som ger händelsen ' +
               'lyser grönt — sannolikheten fås genom att <em>addera</em> vägarnas produkter.',
            4: 'Ibland är det enklare att räkna ut motsatsen. Komplementet till "minst en röd" ' +
               'är "ingen röd" — bara en väg (röd)! Jämför formlerna: <em>samma</em> svar, ' +
               'färre uträkningar.'
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

        // ── Händelseknappar (steg 3) ────────────────────────────────
        var eventBtns = [];
        EVENTS.forEach(function (ev) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = ev.label;
            b.addEventListener('click', function () { state.selectedEvent = ev.key; update(); });
            eventsRow.appendChild(b);
            eventBtns.push({ key: ev.key, btn: b });
        });

        // ── Legend ────────────────────────────────────────────────────
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
        var legRed = legendItem(COL.red, 'röd kula');
        var legBlue = legendItem(COL.blue, 'blå kula');
        var legPath = legendItem(COL.highlight, 'markerad väg');
        var legComp = legendItem(COL.red, 'komplement (ej markerad)');
        legend.appendChild(legRed);
        legend.appendChild(legBlue);
        legend.appendChild(legPath);
        legend.appendChild(legComp);

        // ── Glidare (antal röda / blå kulor) ─────────────────────────
        function makeRow(name, min, max, step, accent, get, set) {
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
            slider.setAttribute('aria-label', 'Antal ' + name);
            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = min; field.max = max; field.step = step; field.value = get();
            field.setAttribute('inputmode', 'numeric');
            field.setAttribute('aria-label', 'Antal ' + name);
            function paint() {
                var pct = clampNum((get() - min) / (max - min) * 100, 0, 100);
                slider.style.background = 'linear-gradient(to right, ' + accent + ' 0%, ' +
                    accent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
            }
            function apply(v, from) {
                if (!isFinite(v)) return;
                set(clampNum(Math.round(v), min, max));
                if (from !== 'slider') slider.value = get();
                if (from !== 'field') field.value = get();
                paint();
                update();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(parseFloat(field.value), 'field'); });
            field.addEventListener('blur', function () { field.value = get(); });
            paint();
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            return { sync: function () { slider.value = get(); field.value = get(); paint(); } };
        }
        var rowRed = makeRow('röda kulor', 1, 6, 1, COL.red,
            function () { return state.red; }, function (v) { state.red = v; });
        var rowBlue = makeRow('blå kulor', 1, 6, 1, COL.blue,
            function () { return state.blue; }, function (v) { state.blue = v; });

        // ── Återställ ────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Återställ';
        reset.addEventListener('click', function () {
            state.red = 3; state.blue = 2; state.replacement = true;
            state.selectedLeaf = null; state.selectedEvent = null; state.step = 1;
            repCb.checked = true;
            rowRed.sync(); rowBlue.sync();
            update();
        });
        foot.appendChild(reset);

        // ── Highlight-uppsättning beroende på steg/val ──────────────
        function highlightSets() {
            if (state.step === 2 && state.selectedLeaf) return { green: [state.selectedLeaf], red: [] };
            if (state.step === 3 && state.selectedEvent) {
                var ev = EVENTS.filter(function (e) { return e.key === state.selectedEvent; })[0];
                return { green: ev ? ev.leaves.slice() : [], red: [] };
            }
            if (state.step === 4) return { green: ['RR', 'RB', 'BR'], red: ['BB'] };
            return { green: [], red: [] };
        }
        function edgeStyle(leafKeysUnder, HL) {
            var hasGreen = leafKeysUnder.some(function (k) { return HL.green.indexOf(k) >= 0; });
            var hasRed = leafKeysUnder.some(function (k) { return HL.red.indexOf(k) >= 0; });
            var active = (HL.green.length + HL.red.length) > 0;
            if (hasGreen) return { stroke: COL.highlight, width: 4 };
            if (hasRed) return { stroke: COL.red, width: 4 };
            if (active) return { stroke: COL.axis, width: 1.4, dim: true };
            return { stroke: COL.axis, width: 1.4 };
        }

        // ── Rita påsen med kulor ─────────────────────────────────────
        function drawBag(svgRoot) {
            svgRoot.appendChild(svgEl('rect', {
                x: BAG.x, y: BAG.y, width: BAG.w, height: BAG.h, rx: BAG.rx, ry: 40,
                fill: 'rgba(255,255,255,0.28)', stroke: COL.axis, 'stroke-width': 1.6
            }));
            svgRoot.appendChild(svgEl('path', {
                d: 'M ' + (BAG.x + 20) + ' ' + BAG.y + ' Q ' + BAG_CX + ' ' + (BAG.y - 20) + ' ' + (BAG.x + BAG.w - 20) + ' ' + BAG.y,
                fill: 'none', stroke: COL.axis, 'stroke-width': 1.8
            }));
            svgRoot.appendChild(svgEl('circle', { cx: BAG_CX, cy: BAG.y - 10, r: 2.6, fill: COL.axis }));

            var total = state.red + state.blue;
            var cols = Math.min(4, total);
            var rows = Math.ceil(total / cols);
            var spacing = 24;
            var startX = BAG_CX - (cols - 1) * spacing / 2;
            var startY = BAG_CY - (rows - 1) * spacing / 2;
            for (var i = 0; i < total; i++) {
                var col = i % cols, row = Math.floor(i / cols);
                var cx = startX + col * spacing, cy = startY + row * spacing;
                var color = i < state.red ? COL.red : COL.blue;
                svgRoot.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 8, fill: color, stroke: 'rgba(15,22,32,0.35)', 'stroke-width': 1 }));
            }
            svgRoot.appendChild(svgMixText(
                { x: BAG_CX, y: BAG.y + BAG.h + 20, 'font-size': 13, 'text-anchor': 'middle' },
                [
                    { t: String(state.red), fill: COL.red }, { t: ' röda + ', fill: COL.axis },
                    { t: String(state.blue), fill: COL.blue }, { t: ' blå = ', fill: COL.axis },
                    { t: String(total) + ' kulor', fill: COL.axis }
                ]
            ));

            // Pil från påsen mot trädets rot
            svgRoot.appendChild(svgEl('line', {
                x1: BAG.x + BAG.w + 4, y1: ROOT.y, x2: ROOT.x - 10, y2: ROOT.y,
                stroke: COL.dash, 'stroke-width': 1.4, 'stroke-dasharray': '4 3'
            }));
            svgRoot.appendChild(svgEl('polygon', {
                points: (ROOT.x - 2) + ',' + ROOT.y + ' ' + (ROOT.x - 10) + ',' + (ROOT.y - 4) + ' ' + (ROOT.x - 10) + ',' + (ROOT.y + 4),
                fill: COL.dash
            }));
        }

        // ── Rita trädet ───────────────────────────────────────────────
        function drawTree(svgRoot) {
            var HL = highlightSets();

            // Kolumnrubriker
            svgRoot.appendChild(svgEl('text', { x: L1.red.x, y: 22, 'font-size': 12, 'text-anchor': 'middle', fill: COL.tick }))
                .textContent = 'Dragning 1';
            svgRoot.appendChild(svgEl('text', { x: L2.RR.x, y: 22, 'font-size': 12, 'text-anchor': 'middle', fill: COL.tick }))
                .textContent = 'Dragning 2';

            // Rot
            svgRoot.appendChild(svgEl('circle', { cx: ROOT.x, cy: ROOT.y, r: 5, fill: COL.axis }));

            // Nivå 1-grenar (root -> red/blue)
            var e1 = edgeStyle(['RR', 'RB'], HL);
            svgRoot.appendChild(svgEl('line', {
                x1: ROOT.x, y1: ROOT.y, x2: L1.red.x, y2: L1.red.y,
                stroke: e1.stroke, 'stroke-width': e1.width, opacity: e1.dim ? 0.28 : 1
            }));
            var e2 = edgeStyle(['BR', 'BB'], HL);
            svgRoot.appendChild(svgEl('line', {
                x1: ROOT.x, y1: ROOT.y, x2: L1.blue.x, y2: L1.blue.y,
                stroke: e2.stroke, 'stroke-width': e2.width, opacity: e2.dim ? 0.28 : 1
            }));

            function branchLabel(x1, y1, x2, y2, txt, color) {
                var mx = (x1 + x2) / 2, dy = y2 - y1;
                var ly = (y1 + y2) / 2 + (dy < 0 ? -9 : 16);
                svgRoot.appendChild(svgEl('text', { x: mx, y: ly, 'font-size': 13, 'text-anchor': 'middle', fill: color }))
                    .textContent = txt;
            }
            var t = totals();
            branchLabel(ROOT.x, ROOT.y, L1.red.x, L1.red.y, fracPlain(state.red, t.total), COL.red);
            branchLabel(ROOT.x, ROOT.y, L1.blue.x, L1.blue.y, fracPlain(state.blue, t.total), COL.blue);

            // Nivå 1-noder + etiketter
            svgRoot.appendChild(svgEl('circle', { cx: L1.red.x, cy: L1.red.y, r: 6, fill: COL.red, stroke: 'rgba(15,22,32,0.4)', 'stroke-width': 1 }));
            svgRoot.appendChild(svgEl('circle', { cx: L1.blue.x, cy: L1.blue.y, r: 6, fill: COL.blue, stroke: 'rgba(15,22,32,0.4)', 'stroke-width': 1 }));
            svgRoot.appendChild(svgEl('text', { x: L1.red.x, y: L1.red.y - 13, 'font-size': 13, 'text-anchor': 'middle', fill: COL.red })).textContent = 'röd';
            svgRoot.appendChild(svgEl('text', { x: L1.blue.x, y: L1.blue.y - 13, 'font-size': 13, 'text-anchor': 'middle', fill: COL.blue })).textContent = 'blå';

            // Nivå 2-grenar + löv
            LEAF_ORDER.forEach(function (key) {
                var m = LEAVES[key];
                var from = L1[m.c1], to = L2[key];
                var es = edgeStyle([key], HL);
                svgRoot.appendChild(svgEl('line', {
                    x1: from.x, y1: from.y, x2: to.x, y2: to.y,
                    stroke: es.stroke, 'stroke-width': es.width, opacity: es.dim ? 0.28 : 1
                }));
                var f = leafFrac(key);
                var branchColor = m.c2 === 'red' ? COL.red : COL.blue;
                branchLabel(from.x, from.y, to.x, to.y, fracPlain(f.n2, f.d2), branchColor);

                var nodeColor = m.c2 === 'red' ? COL.red : COL.blue;
                svgRoot.appendChild(svgEl('circle', { cx: to.x, cy: to.y, r: 5, fill: nodeColor, stroke: 'rgba(15,22,32,0.4)', 'stroke-width': 1 }));

                var isGreen = HL.green.indexOf(key) >= 0, isRed = HL.red.indexOf(key) >= 0;
                if (isGreen || isRed) {
                    svgRoot.appendChild(svgEl('circle', {
                        cx: to.x, cy: to.y, r: 9.5, fill: 'none',
                        stroke: isRed ? COL.red : COL.highlight, 'stroke-width': 2.4
                    }));
                } else if (state.step === 2) {
                    svgRoot.appendChild(svgEl('circle', {
                        cx: to.x, cy: to.y, r: 9.5, fill: 'none',
                        stroke: 'rgba(31,37,48,0.35)', 'stroke-width': 1.4, 'stroke-dasharray': '3 3'
                    }));
                }

                var labelColor = isRed ? COL.red : (isGreen ? COL.highlight : (state.step >= 2 && (HL.green.length + HL.red.length) > 0 ? 'rgba(31,37,48,0.4)' : COL.axis));
                var labelWeight = (isGreen || isRed) ? '700' : '400';
                svgRoot.appendChild(svgEl('text', {
                    x: to.x + 16, y: to.y + 4.5, 'font-size': 13, 'text-anchor': 'start',
                    fill: labelColor, 'font-weight': labelWeight
                })).textContent = wordsFor(key);

                // Klickyta (bara aktiv/synligt intressant i steg 2)
                var hit = svgEl('circle', { cx: to.x, cy: to.y, r: 18, fill: 'rgba(0,0,0,0)', 'data-leaf': key });
                if (state.step === 2) {
                    hit.style.cursor = 'pointer';
                    hit.addEventListener('pointerdown', function () {
                        state.selectedLeaf = key;
                        update();
                    });
                }
                svgRoot.appendChild(hit);
            });
        }

        // ── Formler och texter ─────────────────────────────────────────
        function updateFormulas() {
            if (state.step === 2) {
                if (state.selectedLeaf) {
                    katexInto(formelA, buildProductTex(state.selectedLeaf));
                    note.textContent = '';
                } else {
                    formelA.textContent = '';
                    note.textContent = 'Klicka på ett löv i trädet för att se dess sannolikhet.';
                }
                formelB.textContent = '';
            } else if (state.step === 3) {
                if (state.selectedEvent) {
                    var ev = EVENTS.filter(function (e) { return e.key === state.selectedEvent; })[0];
                    katexInto(formelA, buildSumTex(ev.words, ev.leaves));
                    note.textContent = '';
                } else {
                    formelA.textContent = '';
                    note.textContent = 'Välj en händelse ovan.';
                }
                formelB.textContent = '';
            } else if (state.step === 4) {
                katexInto(formelA, buildSumTex('minst en röd', ['RR', 'RB', 'BR']));
                katexInto(formelB, buildComplementTex());
                note.innerHTML = 'Samma svar som med addition i steg 3 — men färre uträkningar!';
            } else {
                formelA.textContent = ''; formelB.textContent = ''; note.textContent = '';
            }
        }

        // ── Visa/dölj per steg + omritning ─────────────────────────────
        function update() {
            if (state.step === 4 && !state.selectedEvent) state.selectedEvent = 'minstEnRod';

            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            eventBtns.forEach(function (o) { o.btn.classList.toggle('active', state.selectedEvent === o.key); });

            instr.innerHTML = INSTR[state.step];
            legPath.style.display = state.step >= 2 ? '' : 'none';
            legComp.style.display = state.step === 4 ? '' : 'none';
            eventsRow.style.display = state.step === 3 ? '' : 'none';
            formelA.style.display = state.step >= 2 ? '' : 'none';
            formelB.style.display = state.step === 4 ? '' : 'none';
            note.style.display = state.step >= 2 ? '' : 'none';

            while (svg.firstChild) svg.removeChild(svg.firstChild);
            drawBag(svg);
            drawTree(svg);
            updateFormulas();
        }

        update();

        return {
            destroy: function () { el.innerHTML = ''; }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    var api = { mount: mount };
    window.VISUALISERINGAR['ma1c-5.6'] = api;
    window.VISUALISERINGAR['ma1c-5.7'] = api;
    window.VISUALISERINGAR['ma1c-5.8'] = api;
})();
