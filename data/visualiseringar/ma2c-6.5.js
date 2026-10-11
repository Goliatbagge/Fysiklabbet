/* ma2c-6.5.js — visualisering: "Galtonbrädan — normalfördelningen växer
 * fram" (hör till ma2c-6.5, Normalfördelning; se även ma2c-6.4,
 * Standardavvikelse, för beteckningen sigma).
 *
 * Kärninsikt: många små oberoende slumpsteg (kulan studsar vänster/höger
 * med lika sannolikhet vid varje stift) ackumuleras till en förutsägbar
 * klockform — normalfördelningen är slumpens eget mönster, inte en
 * påhittad kurva.
 *
 * Modellen: en Galtonbräda med n rader stift (6–14, standard 11). En kula
 * som passerar alla rader har gjort n oberoende vänster/höger-val; antalet
 * högersteg k (0..n) avgör vilket av de n + 1 facken kulan hamnar i.
 * k är binomialfördelat, Bin(n; 0,5), med väntevärde mu = n/2 och
 * standardavvikelse sigma = sqrt(n · 0,25) (mätt i fack).
 *
 * Utseende (omgjord 2026-10-11): en riktig bräda i trä och glas. Kulorna
 * ligger i en glastratt, faller ut i en ström, studsar mot mässingsstift
 * i paraboliska hopp och staplas FYSISKT i facken (tät packning). När
 * staplarna växer zoomar skalan ut i steg — kulorna i facken krymper — och
 * vid tusentals kulor ritas högen som en sammanhängande stålpelare.
 *
 * Tre steg (lager):
 *   1. Släpp kulor   — +1/+100/+1000/+10 000 kulor, val av antal rader.
 *   2. Mönstret       — normalfördelningskurvan (röd) ritas på glaset;
 *                        live-andel mittersta/yttersta fack.
 *   3. 68–95-regeln   — zonerna mu ± sigma och mu ± 2·sigma skuggas;
 *                        live-andel jämförs med 68,2 % / 95,4 %.
 *
 * Rendering: tre förrenderade lager (bakgrund, kulhögar, front med stift,
 * skiljeväggar, tratt och ram) + kulor i luften per bildruta. Kulhögarna
 * ritas inkrementellt (bara nya kulor) och görs om helt bara när skalan
 * ändras, så att 10 000 kulor går att animera.
 *
 * API: window.VISUALISERINGAR['ma2c-6.5'] = { mount(el) -> { destroy() } }.
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
    function fmtInt(n) {
        var s = Math.round(n).toString();
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    function pct(x) { return fmt(x * 100, 1).replace('-', '−') + ' %'; }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }
    // Deterministisk slump för träådringen (samma bräda varje gång).
    function mulberry32(a) {
        return function () {
            a |= 0; a = a + 0x6D2B79F5 | 0;
            var t = Math.imul(a ^ a >>> 15, 1 | a);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    // ── Färger ──────────────────────────────────────────────────────────
    var COL = {
        ink: '#1f2530',
        tick: '#5b6472',
        curve: '#c8324a',          // normalfördelningskurvan — röd
        zoneText: '#3f6b34',       // formeltext för sigma-zonerna
        zone1: 'rgba(74,125,58,0.24)',
        zone2: 'rgba(74,125,58,0.11)',
        zoneLine: 'rgba(63,107,52,0.75)',
        woodLight: '#c9945c',
        woodMid: '#a96f3c',
        woodDark: '#7d4f27',
        grain: 'rgba(74,40,14,0.22)',
        panelTop: '#f7f2e8',
        panelBot: '#ece3d2',
        grid: 'rgba(60,100,165,0.10)'
    };
    var FONT = 'Poppins, "DM Sans", system-ui, sans-serif';

    // Logisk ritstorlek (allt räknas i dessa koordinater och skalas sedan).
    var W = 640, H = 672;
    var G = 2600;            // "tyngdacceleration" i logiska px/s²
    var T_ROW = 0.15;        // tid mellan två stiftrader (s)

    function mount(el) {
        var state = { step: 1, showCurve: false, rows: 11 };
        var ROWS, BINS, MU, SIGMA;
        var counts, pending, total;
        var flying = [], queue = 0, emitAcc = 0, batchRate = 0;
        var geo = null;
        var pile = null;           // { cols, r, solid, hPerBall }
        var drawn = [];            // antal kulor redan ritade i hög-lagret per fack
        var animId = null, lastTs = null;
        var destroyed = false;

        // ── DOM-skelett ───────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Galtonbrädan: normalfördelningen växer fram';
        card.appendChild(title);

        var stepsRow = document.createElement('div');
        stepsRow.className = 'lab-vis-steps';
        card.appendChild(stepsRow);

        var instr = document.createElement('div');
        instr.className = 'lab-vis-instr';
        card.appendChild(instr);

        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene lab-vis-scene';
        scene.style.maxWidth = '640px';
        scene.style.position = 'relative';
        card.appendChild(scene);

        var canvas = document.createElement('canvas');
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.aspectRatio = W + ' / ' + H;
        canvas.setAttribute('role', 'img');
        scene.appendChild(canvas);
        var ctx = canvas.getContext('2d');

        // Ljudknapp (högtalare / överstruken högtalare), samma stil som
        // minisimuleringarnas.
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        // Placeras inne i glasets övre högra hörn (ramen börjar 30 enheter
        // in från canvasens kant), i procent så att den följer skalningen.
        sndBtn.style.cssText = 'position:absolute;top:4.5%;right:8.6%;width:40px;height:40px;' +
            'border-radius:50%;display:flex;align-items:center;justify-content:center;' +
            'background:rgba(255,255,255,0.92);color:#0f1620;border:none;cursor:pointer;' +
            'padding:0;z-index:5;box-shadow:0 1px 4px rgba(0,0,0,0.35);';
        scene.appendChild(sndBtn);

        var legend = document.createElement('div');
        legend.className = 'lab-vis-legend';
        card.appendChild(legend);

        var formelMu = document.createElement('div');
        formelMu.className = 'lab-vis-formel';
        formelMu.style.color = COL.zoneText;
        card.appendChild(formelMu);

        var formelSigma = document.createElement('div');
        formelSigma.className = 'lab-vis-formel';
        formelSigma.style.color = COL.zoneText;
        card.appendChild(formelSigma);

        var note = document.createElement('div');
        note.className = 'lab-vis-note';
        card.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'lab-vis-actions';
        card.appendChild(actions);

        var actions2 = document.createElement('div');
        actions2.className = 'lab-vis-actions';
        card.appendChild(actions2);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ──────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Släpp kulor' },
            { n: 2, label: '2 · Mönstret' },
            { n: 3, label: '3 · 68–95-regeln' }
        ];
        function instrText(step) {
            if (step === 1) {
                return 'Släpp kulor genom Galtonbrädan. Vid varje stift studsar kulan åt ' +
                    'vänster eller höger med lika stor sannolikhet, helt slumpmässigt. ' +
                    'Antalet högersteg (<em>k</em>) avgör vilket av de ' + BINS + ' facken ' +
                    'kulan hamnar i. Innan du börjar: var tror du kulorna samlas när många ' +
                    'har fallit? Jämnt utspritt över alla fack, eller mest i mitten?';
            }
            if (step === 2) {
                return 'Klicka i "Visa kurvan" för att rita en normalfördelningskurva ' +
                    '(röd) på glaset. Fastän varje enskild kula bara studsar ' +
                    'slumpmässigt åt vänster eller höger bildar många kulor tillsammans ' +
                    'en förutsägbar klockform: normalfördelningen.';
            }
            return '68–95-regeln säger att ungefär 68 % av alla värden i en ' +
                'normalfördelning ligger inom en standardavvikelse (<em>σ</em>) från ' +
                'medelvärdet (<em>μ</em>), och ungefär 95 % inom två ' +
                'standardavvikelser. De skuggade zonerna visar detta. Jämför med ' +
                'hur stor andel av dina kulor som faktiskt hamnat där.';
        }
        var stepBtns = [];
        STEPS.forEach(function (s) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-vis-step';
            b.textContent = s.label;
            b.addEventListener('click', function () {
                state.step = s.n;
                if (s.n >= 3) { state.showCurve = true; curveCb.checked = true; }
                update();
            });
            stepsRow.appendChild(b);
            stepBtns.push(b);
        });

        // ── Legend ────────────────────────────────────────────────────────
        function legendItem(color, html, kind) {
            var span = document.createElement('span');
            var sw = document.createElement('span');
            sw.className = 'swatch';
            if (kind === 'ball') {
                sw.style.width = '11px'; sw.style.height = '11px';
                sw.style.border = 'none'; sw.style.borderRadius = '50%';
                sw.style.background = 'radial-gradient(circle at 35% 30%, #f2f4f7 0%, #a3abb6 45%, #3e4653 100%)';
            } else if (kind === 'zone') {
                sw.style.width = '16px'; sw.style.height = '11px';
                sw.style.border = 'none'; sw.style.borderRadius = '2px';
                sw.style.background = color;
            } else {
                sw.style.borderTopColor = color;
            }
            span.appendChild(sw);
            var txt = document.createElement('span');
            txt.innerHTML = html;
            span.appendChild(txt);
            return span;
        }
        var legBall = legendItem(null, 'kulor', 'ball');
        var legCurve = legendItem(COL.curve, 'normalfördelning');
        var legZone1 = legendItem('rgba(74,125,58,0.45)', '<em>μ</em> ± <em>σ</em>', 'zone');
        var legZone2 = legendItem('rgba(74,125,58,0.20)', '<em>μ</em> ± 2<em>σ</em>', 'zone');
        legend.appendChild(legBall);
        legend.appendChild(legCurve);
        legend.appendChild(legZone1);
        legend.appendChild(legZone2);

        // ── Actions: räknare, kula-knappar, kryssruta, rader ─────────────────
        var counterSpan = document.createElement('span');
        counterSpan.style.fontSize = '13.5px';
        counterSpan.style.fontWeight = '600';
        counterSpan.style.color = COL.ink;
        counterSpan.style.minWidth = '9.5em';
        counterSpan.style.textAlign = 'center';
        actions.appendChild(counterSpan);

        function makeBtn(parent, txt, fn) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = txt;
            b.addEventListener('click', fn);
            parent.appendChild(b);
            return b;
        }
        makeBtn(actions, '+1 kula', function () { addBalls(1); });
        makeBtn(actions, '+100 kulor', function () { addBalls(100); });
        makeBtn(actions, '+1 000 kulor', function () { addBalls(1000); });
        makeBtn(actions, '+10 000 kulor', function () { addBalls(10000); });

        // Antal rader (ändring nollställer brädan)
        var rowsWrap = document.createElement('span');
        rowsWrap.style.display = 'inline-flex';
        rowsWrap.style.alignItems = 'center';
        rowsWrap.style.gap = '8px';
        rowsWrap.style.fontSize = '13.5px';
        rowsWrap.style.color = COL.ink;
        var rowsLbl = document.createElement('span');
        var rowsMinus = document.createElement('button');
        var rowsPlus = document.createElement('button');
        [rowsMinus, rowsPlus].forEach(function (b, i) {
            b.type = 'button';
            b.className = 'lab-btn';
            b.style.padding = '6px 13px';
            b.textContent = i === 0 ? '−' : '+';
            b.setAttribute('aria-label', i === 0 ? 'Färre rader' : 'Fler rader');
            b.addEventListener('click', function () {
                var nr = clampNum(state.rows + (i === 0 ? -1 : 1), 6, 14);
                if (nr === state.rows) return;
                state.rows = nr;
                setupModel();
                update();
            });
        });
        rowsWrap.appendChild(rowsMinus);
        rowsWrap.appendChild(rowsLbl);
        rowsWrap.appendChild(rowsPlus);
        actions2.appendChild(rowsWrap);

        var curveLabel = document.createElement('label');
        curveLabel.className = 'lab-graf-check';
        var curveCb = document.createElement('input');
        curveCb.type = 'checkbox';
        curveCb.addEventListener('change', function () {
            state.showCurve = curveCb.checked;
            update();
        });
        curveLabel.appendChild(curveCb);
        var curveTxt = document.createElement('span');
        curveTxt.textContent = 'Visa kurvan';
        curveLabel.appendChild(curveTxt);
        actions2.appendChild(curveLabel);

        // ── Nollställ ────────────────────────────────────────────────────
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'lab-graf-reset';
        reset.textContent = 'Nollställ';
        reset.addEventListener('click', function () {
            setupModel();
            state.showCurve = false;
            curveCb.checked = false;
            update();
        });
        foot.appendChild(reset);

        // ── Modell + geometri ────────────────────────────────────────────
        function setupModel() {
            stopAnim();
            ROWS = state.rows;
            BINS = ROWS + 1;
            MU = ROWS / 2;
            SIGMA = Math.sqrt(ROWS * 0.25);
            counts = new Array(BINS).fill(0);
            pending = new Array(BINS).fill(0);
            drawn = new Array(BINS).fill(0);
            total = 0;
            flying = []; queue = 0; emitAcc = 0; batchRate = 0;
            buildGeometry();
            pile = null;
            choosePileScale(true);
            rowsLbl.textContent = ROWS + ' rader';
            rowsMinus.disabled = ROWS <= 6;
            rowsPlus.disabled = ROWS >= 14;
            canvas.setAttribute('aria-label', 'Galtonbräda i trä och glas med ' + ROWS +
                ' rader mässingsstift ovanför ' + BINS + ' fack. Kulor faller ur en tratt, ' +
                'studsar slumpmässigt åt vänster eller höger vid varje stift och staplas i facken.');
            rebuildLayers();
        }

        function buildGeometry() {
            var g = {};
            g.ox0 = 30; g.ox1 = W - 30; g.oy0 = 6; g.oy1 = 622;   // ramens ytterkant
            g.wood = 17;
            g.ix0 = g.ox0 + g.wood; g.ix1 = g.ox1 - g.wood;      // glasytan
            g.iy0 = g.oy0 + g.wood; g.iy1 = g.oy1 - g.wood;
            g.cx = W / 2;
            var innerW = g.ix1 - g.ix0;
            g.binW = Math.min(58, innerW / BINS);
            g.binsLeft = g.cx - BINS * g.binW / 2;
            g.binsRight = g.cx + BINS * g.binW / 2;
            g.binTop = 372;
            g.base = g.iy1;
            g.divW = 3.2;
            g.pileH = g.base - g.binTop - 10;
            g.funTop = g.iy0 + 6; g.funBot = 82; g.neckBot = 92;
            g.funTopW = 156;
            g.pegTop = 118;
            var pegBottom = g.binTop - 48;
            g.rowSp = (pegBottom - g.pegTop) / (ROWS - 1);
            g.pegR = clampNum(g.binW * 0.085, 2.8, 4.4);
            g.ballR = clampNum(g.binW * 0.135, 3.4, 6);
            g.funBotW = g.ballR * 3;
            // Platser för kulorna i tratten (tät packning, nedifrån och upp)
            g.funSlots = [];
            var fr = g.ballR * 0.92, ry = fr * Math.sqrt(3);
            for (var y = g.funBot - fr - 1, row = 0; y > g.funTop + fr; y -= ry, row++) {
                var t = (g.funBot - y) / (g.funBot - g.funTop);
                var halfW = (g.funBotW + (g.funTopW - g.funBotW) * t) / 2 - fr - 2;
                var n = Math.max(1, Math.floor(halfW * 2 / (2 * fr)) + 1);
                var startX = g.cx - (n - 1) * fr;
                var order = centerOut(n);
                for (var j = 0; j < n; j++) g.funSlots.push({ x: startX + order[j] * 2 * fr, y: y });
            }
            g.funR = fr;
            geo = g;
        }
        function centerOut(n) {
            // Ordning för att fylla en rad från mitten och utåt
            var res = [], mid = (n - 1) / 2;
            var idx = [];
            for (var i = 0; i < n; i++) idx.push(i);
            idx.sort(function (a, b) { return Math.abs(a - mid) - Math.abs(b - mid) || a - b; });
            for (i = 0; i < n; i++) res.push(idx[i]);
            return res;
        }
        function pegX(r, c) { return geo.cx + (c - r / 2) * geo.binW; }
        function pegY(r) { return geo.pegTop + r * geo.rowSp; }
        function binX(k) { return geo.binsLeft + (k + 0.5) * geo.binW; }

        function gaussDensity(k) {
            var dz = k - MU;
            return Math.exp(-(dz * dz) / (2 * SIGMA * SIGMA)) / (SIGMA * Math.sqrt(2 * Math.PI));
        }
        function midBins() {
            var m = ROWS / 2;
            return Number.isInteger(m) ? [m] : [Math.floor(m), Math.ceil(m)];
        }
        function sumBins(list) {
            var s = 0;
            for (var i = 0; i < list.length; i++) s += counts[list[i]];
            return s;
        }
        // Antal kulor inom mu ± nSigma·sigma, med kantfacken viktade efter
        // hur stor del av facket (bredd 1, centrerat på k) som ligger i
        // zonen. Utan viktningen räknas hela kantfack med och andelen blir
        // systematiskt för stor — skuggningen skär synligt genom kantfacken.
        function zoneCount(nSigma) {
            var lo = MU - nSigma * SIGMA, hi = MU + nSigma * SIGMA;
            var s = 0;
            for (var k = 0; k <= ROWS; k++) {
                var a = Math.max(lo, k - 0.5), b = Math.min(hi, k + 0.5);
                if (b > a) s += counts[k] * (b - a);
            }
            return s;
        }

        // ── Skalan för kulhögarna ─────────────────────────────────────────
        // Kulorna packas tätt (hexagonalt) i facket: cols kulor per rad,
        // radie r = innerbredd / (2·cols + 1), radhöjd r·√3. Skalan väljs så
        // att den högsta högen (och kurvans topp) ryms, och ändras bara åt
        // ett håll (zoomar ut) så att bilden aldrig fladdrar fram och tillbaka.
        var R_SOLID = 1.45;
        function pileNeed() {
            var m = 0;
            for (var k = 0; k < BINS; k++) m = Math.max(m, counts[k] + pending[k]);
            var curvePeak = (total + flying.length + queue) * gaussDensity(MU);
            if (!showCurveNow()) curvePeak = 0;
            return Math.max(m, curvePeak * 1.04) + 2;
        }
        function choosePileScale(force) {
            var innerW = geo.binW - geo.divW;
            var need = pileNeed();
            var next = null;
            var startCols = pile && !force ? pile.cols : 1;
            if (!pile || !pile.solid || force) {
                for (var cols = Math.max(1, startCols); cols < 60; cols++) {
                    var r = innerW / (2 * cols + 1);
                    if (r > geo.ballR + 0.01) continue;
                    if (r < R_SOLID) break;
                    var rowsNeeded = Math.ceil(need / cols);
                    if (rowsNeeded * r * Math.sqrt(3) + r <= geo.pileH) {
                        next = { cols: cols, r: r, solid: false, hPerBall: r * Math.sqrt(3) / cols };
                        break;
                    }
                }
            }
            if (!next) {
                // Sammanhängande pelare: höjd per kula krymper kontinuerligt.
                var h = geo.pileH * 0.9 / need;
                if (pile && pile.solid && !force) h = Math.min(pile.hPerBall, h);
                next = { cols: 0, r: R_SOLID, solid: true, hPerBall: h };
            }
            var changed = !pile || force || next.solid !== pile.solid || next.cols !== pile.cols ||
                (next.solid && next.hPerBall < pile.hPerBall * 0.985);
            if (changed) { pile = next; redrawPile(); }
            return changed;
        }
        function slotPos(k, idx) {
            var left = geo.binsLeft + k * geo.binW + geo.divW / 2;
            if (pile.solid) {
                return { x: left + (geo.binW - geo.divW) / 2, y: geo.base - (idx + 0.5) * pile.hPerBall };
            }
            var r = pile.r, cols = pile.cols;
            var row = Math.floor(idx / cols), c = idx % cols;
            var order = pile.order || (pile.order = centerOut(cols));
            var off = (row % 2 === 1) ? r : 0;
            return { x: left + r + off + order[c] * 2 * r, y: geo.base - r - row * r * Math.sqrt(3) };
        }

        // ── Kulsprites (förrenderade, per pixelradie) ───────────────────────
        var spriteCache = {};
        var px = 1;   // enhetspixlar per logisk enhet
        function ballSprite(rLog) {
            var rp = Math.max(1, Math.round(rLog * px * 4) / 4);
            var key = rp.toFixed(2);
            if (spriteCache[key]) return spriteCache[key];
            var size = Math.ceil(rp * 2 + 2);
            var c = document.createElement('canvas');
            c.width = c.height = size;
            var x = c.getContext('2d');
            var m = size / 2;
            var gr = x.createRadialGradient(m - rp * 0.38, m - rp * 0.42, rp * 0.05, m, m, rp);
            gr.addColorStop(0, '#f6f8fa');
            gr.addColorStop(0.22, '#d3d8de');
            gr.addColorStop(0.62, '#8c95a1');
            gr.addColorStop(1, '#39414d');
            x.fillStyle = gr;
            x.beginPath(); x.arc(m, m, rp, 0, Math.PI * 2); x.fill();
            if (rp >= 2.5) {
                x.strokeStyle = 'rgba(20,26,36,0.55)';
                x.lineWidth = Math.max(0.6, rp * 0.08);
                x.beginPath(); x.arc(m, m, rp - x.lineWidth / 2, 0, Math.PI * 2); x.stroke();
            }
            spriteCache[key] = { c: c, size: size };
            return spriteCache[key];
        }
        function drawBall(c, x, y, r) {
            var s = ballSprite(r);
            var d = s.size / px;
            c.drawImage(s.c, x - d / 2, y - d / 2, d, d);
        }

        // ── Lager ─────────────────────────────────────────────────────────
        var backLayer = document.createElement('canvas');
        var frontLayer = document.createElement('canvas');
        var pileLayer = document.createElement('canvas');
        var cssScale = 1, dpr = 1;
        function layerCtx(cv) {
            cv.width = canvas.width; cv.height = canvas.height;
            var c = cv.getContext('2d');
            c.setTransform(px, 0, 0, px, 0, 0);
            return c;
        }
        function resize() {
            var cssW = canvas.clientWidth || scene.clientWidth || W;
            dpr = Math.min(window.devicePixelRatio || 1, 2.5);
            cssScale = cssW / W;
            px = cssScale * dpr;
            var pw = Math.round(W * px), ph = Math.round(H * px);
            if (canvas.width !== pw || canvas.height !== ph) {
                canvas.width = pw; canvas.height = ph;
                spriteCache = {};
                rebuildLayers();
            }
            draw();
        }
        function rebuildLayers() {
            if (!geo || !canvas.width) return;
            drawBack(layerCtx(backLayer));
            drawFront(layerCtx(frontLayer));
            redrawPile();
        }

        function woodRect(c, x, y, w, h, vertical, seed) {
            var gr = vertical ? c.createLinearGradient(x, 0, x + w, 0) : c.createLinearGradient(0, y, 0, y + h);
            gr.addColorStop(0, COL.woodLight);
            gr.addColorStop(0.55, COL.woodMid);
            gr.addColorStop(1, COL.woodDark);
            c.fillStyle = gr;
            c.fillRect(x, y, w, h);
            // Ådring längs virkets långa led
            var rnd = mulberry32(seed);
            c.save();
            c.beginPath(); c.rect(x, y, w, h); c.clip();
            c.strokeStyle = COL.grain;
            var len = vertical ? h : w, thick = vertical ? w : h;
            var lines = Math.round(thick / 2.2);
            for (var i = 0; i < lines; i++) {
                var off = rnd() * thick;
                var amp = 0.6 + rnd() * 1.8, freq = 0.01 + rnd() * 0.03, ph = rnd() * 6;
                c.lineWidth = 0.5 + rnd() * 0.9;
                c.globalAlpha = 0.5 + rnd() * 0.5;
                c.beginPath();
                for (var s = 0; s <= len; s += 6) {
                    var o = off + Math.sin(s * freq + ph) * amp;
                    var px0 = vertical ? x + o : x + s, py0 = vertical ? y + s : y + o;
                    if (s === 0) c.moveTo(px0, py0); else c.lineTo(px0, py0);
                }
                c.stroke();
            }
            c.restore();
        }

        function drawBack(c) {
            c.clearRect(0, 0, W, H);
            // Bakpanel: papper med kollegieblocksrutnät
            var gr = c.createLinearGradient(0, geo.iy0, 0, geo.iy1);
            gr.addColorStop(0, COL.panelTop);
            gr.addColorStop(1, COL.panelBot);
            c.fillStyle = gr;
            c.fillRect(geo.ix0, geo.iy0, geo.ix1 - geo.ix0, geo.iy1 - geo.iy0);
            c.strokeStyle = COL.grid;
            c.lineWidth = 1;
            c.beginPath();
            for (var x = geo.ix0 + 8; x < geo.ix1; x += 16) { c.moveTo(x, geo.iy0); c.lineTo(x, geo.iy1); }
            for (var y = geo.iy0 + 8; y < geo.iy1; y += 16) { c.moveTo(geo.ix0, y); c.lineTo(geo.ix1, y); }
            c.stroke();
            // Facken: något mörkare botten så att högarna får djup
            var fg = c.createLinearGradient(0, geo.binTop, 0, geo.base);
            fg.addColorStop(0, 'rgba(120,90,50,0.00)');
            fg.addColorStop(1, 'rgba(120,90,50,0.10)');
            c.fillStyle = fg;
            c.fillRect(geo.binsLeft, geo.binTop, geo.binsRight - geo.binsLeft, geo.base - geo.binTop);
        }

        function drawFront(c) {
            c.clearRect(0, 0, W, H);
            var g = geo;
            // Sidoklossar när facken är smalare än brädan
            if (g.binsLeft - g.ix0 > 2) {
                var slope = 40;
                [[g.ix0, g.binsLeft, 1], [g.binsRight, g.ix1, -1]].forEach(function (s, i) {
                    c.save();
                    c.beginPath();
                    if (s[2] === 1) {
                        c.moveTo(s[0], g.binTop - slope); c.lineTo(s[1], g.binTop);
                        c.lineTo(s[1], g.base); c.lineTo(s[0], g.base);
                    } else {
                        c.moveTo(s[1], g.binTop - slope); c.lineTo(s[0], g.binTop);
                        c.lineTo(s[0], g.base); c.lineTo(s[1], g.base);
                    }
                    c.closePath(); c.clip();
                    woodRect(c, s[0], g.binTop - slope, s[1] - s[0], g.base - g.binTop + slope, true, 77 + i);
                    c.restore();
                });
            }
            // Skiljeväggar mellan facken (trä, spetsiga toppar)
            for (var k = 0; k <= BINS; k++) {
                var x = g.binsLeft + k * g.binW;
                var x0 = x - g.divW / 2;
                c.save();
                c.beginPath();
                c.moveTo(x0, g.base); c.lineTo(x0, g.binTop + 4); c.lineTo(x, g.binTop - 3);
                c.lineTo(x0 + g.divW, g.binTop + 4); c.lineTo(x0 + g.divW, g.base);
                c.closePath();
                var dg = c.createLinearGradient(x0, 0, x0 + g.divW, 0);
                dg.addColorStop(0, '#c08a52'); dg.addColorStop(1, '#7a4c25');
                c.fillStyle = dg;
                c.fill();
                c.restore();
            }
            // Stift i mässing, med skugga
            var pr = g.pegR;
            var pegC = document.createElement('canvas');
            var ps = Math.ceil((pr * 2 + 6) * px);
            pegC.width = pegC.height = ps;
            var p = pegC.getContext('2d');
            p.setTransform(px, 0, 0, px, 0, 0);
            var m = (pr * 2 + 6) / 2 - 1;
            p.fillStyle = 'rgba(40,25,10,0.22)';
            p.beginPath(); p.ellipse(m + 1.4, m + 1.8, pr, pr * 0.9, 0, 0, Math.PI * 2); p.fill();
            var bg = p.createRadialGradient(m - pr * 0.35, m - pr * 0.4, pr * 0.1, m, m, pr);
            bg.addColorStop(0, '#fff3c8');
            bg.addColorStop(0.35, '#e0b75a');
            bg.addColorStop(0.8, '#a87a2a');
            bg.addColorStop(1, '#6e4c14');
            p.fillStyle = bg;
            p.beginPath(); p.arc(m, m, pr, 0, Math.PI * 2); p.fill();
            var pd = ps / px;
            for (var r = 0; r < ROWS; r++) {
                for (var ci = 0; ci <= r; ci++) {
                    c.drawImage(pegC, pegX(r, ci) - m, pegY(r) - m, pd, pd);
                }
            }
            // Glastratt
            c.save();
            c.beginPath();
            c.moveTo(g.cx - g.funTopW / 2, g.funTop);
            c.lineTo(g.cx + g.funTopW / 2, g.funTop);
            c.lineTo(g.cx + g.funBotW / 2, g.funBot);
            c.lineTo(g.cx + g.funBotW / 2, g.neckBot);
            c.lineTo(g.cx - g.funBotW / 2, g.neckBot);
            c.lineTo(g.cx - g.funBotW / 2, g.funBot);
            c.closePath();
            c.fillStyle = 'rgba(150,180,210,0.16)';
            c.fill();
            c.strokeStyle = 'rgba(31,37,48,0.55)';
            c.lineWidth = 1.6;
            c.lineJoin = 'round';
            c.stroke();
            c.restore();
            // Glasets reflex (diagonalt ljusband, mycket svagt)
            c.save();
            c.beginPath(); c.rect(g.ix0, g.iy0, g.ix1 - g.ix0, g.iy1 - g.iy0); c.clip();
            var sh = c.createLinearGradient(g.ix0, g.iy0, g.ix0 + 260, g.iy0 + 420);
            sh.addColorStop(0, 'rgba(255,255,255,0)');
            sh.addColorStop(0.42, 'rgba(255,255,255,0)');
            sh.addColorStop(0.5, 'rgba(255,255,255,0.16)');
            sh.addColorStop(0.58, 'rgba(255,255,255,0)');
            sh.addColorStop(1, 'rgba(255,255,255,0)');
            c.fillStyle = sh;
            c.fillRect(g.ix0, g.iy0, g.ix1 - g.ix0, g.iy1 - g.iy0);
            // Inre skugga längs ramen
            var edge = 10;
            var t = c.createLinearGradient(0, g.iy0, 0, g.iy0 + edge);
            t.addColorStop(0, 'rgba(40,25,10,0.22)'); t.addColorStop(1, 'rgba(40,25,10,0)');
            c.fillStyle = t; c.fillRect(g.ix0, g.iy0, g.ix1 - g.ix0, edge);
            var l = c.createLinearGradient(g.ix0, 0, g.ix0 + edge, 0);
            l.addColorStop(0, 'rgba(40,25,10,0.16)'); l.addColorStop(1, 'rgba(40,25,10,0)');
            c.fillStyle = l; c.fillRect(g.ix0, g.iy0, edge, g.iy1 - g.iy0);
            c.restore();
            // Träramen
            woodRect(c, g.ox0, g.oy0, g.ox1 - g.ox0, g.wood, false, 11);
            woodRect(c, g.ox0, g.iy1, g.ox1 - g.ox0, g.wood, false, 12);
            woodRect(c, g.ox0, g.iy0, g.wood, g.iy1 - g.iy0, true, 13);
            woodRect(c, g.ix1, g.iy0, g.wood, g.iy1 - g.iy0, true, 14);
            c.strokeStyle = 'rgba(60,35,12,0.55)';
            c.lineWidth = 1.2;
            c.strokeRect(g.ox0 + 0.6, g.oy0 + 0.6, g.ox1 - g.ox0 - 1.2, g.oy1 - g.oy0 - 1.2);
            c.strokeStyle = 'rgba(60,35,12,0.45)';
            c.strokeRect(g.ix0 - 0.5, g.iy0 - 0.5, g.ix1 - g.ix0 + 1, g.iy1 - g.iy0 + 1);
            // Fackens nummer k under ramen
            var kFont = Math.round(clampNum(11.5 / cssScale, 15, 24));
            c.fillStyle = COL.ink;
            c.textAlign = 'center';
            c.textBaseline = 'alphabetic';
            c.font = '600 ' + kFont + 'px ' + FONT;
            for (k = 0; k <= ROWS; k++) c.fillText(String(k), binX(k), g.oy1 + 6 + kFont);
            c.font = 'italic 600 ' + kFont + 'px ' + FONT;
            c.textAlign = 'right';
            c.fillText('k', g.binsLeft - 10, g.oy1 + 6 + kFont);
        }

        // Mönster med små kulor i tät packning, ritat i enhetspixlar och
        // nedskalat till logiska koordinater.
        var grainPat = null, grainPx = 0;
        function grainPattern(c) {
            if (grainPat && grainPx === px) return grainPat;
            var s = 3;   // kuldiameter i logiska enheter
            var pc = document.createElement('canvas');
            var pw = Math.max(2, Math.round(s * 2 * px)), ph = Math.max(2, Math.round(s * Math.sqrt(3) * px));
            pc.width = pw; pc.height = ph;
            var p = pc.getContext('2d');
            var rr = pw / 4;
            [[pw / 4, ph / 4], [pw * 3 / 4, ph * 3 / 4]].forEach(function (q) {
                var gr = p.createRadialGradient(q[0] - rr * 0.35, q[1] - rr * 0.4, 0, q[0], q[1], rr);
                gr.addColorStop(0, 'rgba(255,255,255,0.30)');
                gr.addColorStop(0.6, 'rgba(255,255,255,0)');
                gr.addColorStop(1, 'rgba(20,26,36,0.28)');
                p.fillStyle = gr;
                p.beginPath(); p.arc(q[0], q[1], rr, 0, Math.PI * 2); p.fill();
            });
            grainPat = c.createPattern(pc, 'repeat');
            if (grainPat.setTransform && window.DOMMatrix) grainPat.setTransform(new DOMMatrix().scale(1 / px));
            grainPx = px;
            return grainPat;
        }

        // Hög-lagret: kulor som landat. Inkrementellt — bara nya kulor ritas.
        var pileCtx = null;
        function redrawPile() {
            if (!geo || !canvas.width || !pile) return;
            pileCtx = layerCtx(pileLayer);
            pileCtx.clearRect(0, 0, W, H);
            for (var k = 0; k < BINS; k++) drawn[k] = 0;
            updatePile();
        }
        function updatePile() {
            if (!pileCtx) return;
            var c = pileCtx;
            for (var k = 0; k < BINS; k++) {
                if (counts[k] === drawn[k]) continue;
                if (pile.solid) {
                    var left = geo.binsLeft + k * geo.binW + geo.divW / 2;
                    var w = geo.binW - geo.divW;
                    var h = counts[k] * pile.hPerBall;
                    c.clearRect(left - 0.5, geo.binTop - 20, w + 1, geo.base - geo.binTop + 20);
                    if (h > 0.3) {
                        var gr = c.createLinearGradient(left, 0, left + w, 0);
                        gr.addColorStop(0, '#4d5662');
                        gr.addColorStop(0.3, '#b9c0c9');
                        gr.addColorStop(0.55, '#8e97a3');
                        gr.addColorStop(1, '#3f4752');
                        c.fillStyle = gr;
                        var top = geo.base - h, rr = Math.min(3, h / 2, w / 2);
                        c.beginPath();
                        c.moveTo(left, geo.base); c.lineTo(left, top + rr);
                        c.quadraticCurveTo(left, top, left + rr, top);
                        c.lineTo(left + w - rr, top);
                        c.quadraticCurveTo(left + w, top, left + w, top + rr);
                        c.lineTo(left + w, geo.base); c.closePath();
                        c.fill();
                        // Fin kornighet: antyder att pelaren består av kulor
                        c.fillStyle = grainPattern(c);
                        c.fill();
                    }
                } else {
                    for (var i = drawn[k]; i < counts[k]; i++) {
                        var s = slotPos(k, i);
                        drawBall(c, s.x, s.y, pile.r);
                    }
                }
                drawn[k] = counts[k];
            }
        }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Stiftträff: kort metalliskt pling (grundton + inharmonisk överton,
        // panorerat efter x). Landning: dovt klick (brusskur genom bandpass).
        // Tät ström: ett regnliknande brus vars styrka följer antalet kulor i
        // luften. Antalet enskilda pling per sekund begränsas med en
        // "tokenhink", annars blir 10 000 kulor ett enda skrän.
        var AC = window.AudioContext || window.webkitAudioContext;
        var LJUD_NYCKEL = 'fysiklabbetGaltonLjud';
        var soundOn = true;
        try { soundOn = localStorage.getItem(LJUD_NYCKEL) !== 'av'; } catch (e) { /* privat läge */ }
        var actx = null, master = null, noiseBuf = null;
        var rainGain = null, rainSrc = null;
        var tokPeg = 0, tokLand = 0, tokTs = 0;
        function ensureAudio() {
            if (actx || !AC) return;
            try { actx = new AC(); } catch (e) { actx = null; return; }
            master = actx.createGain();
            master.gain.value = 0.55;
            master.connect(actx.destination);
            var len = Math.floor(actx.sampleRate * 1.0);
            noiseBuf = actx.createBuffer(1, len, actx.sampleRate);
            var d = noiseBuf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        }
        function resumeAudio() {
            if (!soundOn) return;
            ensureAudio();
            if (actx && actx.state === 'suspended') actx.resume();
        }
        function audioReady() { return soundOn && actx && actx.state === 'running'; }
        function panNode(x) {
            if (!actx.createStereoPanner) return null;
            var p = actx.createStereoPanner();
            p.pan.value = clampNum((x - W / 2) / (W / 2), -1, 1) * 0.6;
            return p;
        }
        function refillTokens() {
            var now = actx.currentTime;
            var dt = Math.min(0.25, now - tokTs);
            tokTs = now;
            tokPeg = Math.min(6, tokPeg + dt * 42);
            tokLand = Math.min(4, tokLand + dt * 22);
        }
        function soundPeg(x) {
            if (!audioReady()) return;
            refillTokens();
            if (tokPeg < 1) return;
            tokPeg -= 1;
            var t = actx.currentTime + 0.002;
            var f = 2900 + Math.random() * 1300;
            var g = actx.createGain();
            var vol = 0.05 + Math.random() * 0.035;
            g.gain.setValueAtTime(vol, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
            var o1 = actx.createOscillator(), o2 = actx.createOscillator();
            o1.type = 'sine'; o1.frequency.value = f;
            o2.type = 'sine'; o2.frequency.value = f * 2.76;
            var g2 = actx.createGain(); g2.gain.value = 0.35;
            o1.connect(g); o2.connect(g2); g2.connect(g);
            var p = panNode(x);
            if (p) { g.connect(p); p.connect(master); } else g.connect(master);
            o1.start(t); o2.start(t); o1.stop(t + 0.08); o2.stop(t + 0.08);
        }
        function soundLand(x) {
            if (!audioReady()) return;
            refillTokens();
            if (tokLand < 1) return;
            tokLand -= 1;
            var t = actx.currentTime + 0.002;
            var src = actx.createBufferSource();
            src.buffer = noiseBuf;
            var bp = actx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = pile && pile.solid ? 900 : 1500 + Math.random() * 600;
            bp.Q.value = 2.2;
            var g = actx.createGain();
            g.gain.setValueAtTime(0.32, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
            src.connect(bp); bp.connect(g);
            var p = panNode(x);
            if (p) { g.connect(p); p.connect(master); } else g.connect(master);
            src.start(t, Math.random() * 0.9, 0.06);
        }
        // Regnbruset följer antalet kulor i luften (hörs först vid tät ström).
        function updateRain() {
            if (!actx) return;
            var target = 0;
            if (soundOn && actx.state === 'running') {
                target = Math.min(0.11, Math.max(0, flying.length - 25) / 1500 * 0.11);
            }
            if (!rainSrc && target > 0) {
                rainSrc = actx.createBufferSource();
                rainSrc.buffer = noiseBuf;
                rainSrc.loop = true;
                var bp = actx.createBiquadFilter();
                bp.type = 'bandpass'; bp.frequency.value = 3600; bp.Q.value = 0.7;
                rainGain = actx.createGain();
                rainGain.gain.value = 0;
                rainSrc.connect(bp); bp.connect(rainGain); rainGain.connect(master);
                rainSrc.start();
            }
            if (rainGain) rainGain.gain.setTargetAtTime(target, actx.currentTime, 0.15);
        }
        function syncSndBtn() {
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            sndBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
        }
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            try { localStorage.setItem(LJUD_NYCKEL, soundOn ? 'pa' : 'av'); } catch (e) { /* ignorera */ }
            syncSndBtn();
            if (soundOn) resumeAudio();
            updateRain();
        });
        syncSndBtn();

        // ── Kulor i luften ────────────────────────────────────────────────
        // Varje kula följer en kedja av paraboliska hopp: tratt → stift i rad
        // 0 → … → stift i sista raden → ned i sitt fack. Vid varje stift
        // väljs vänster/höger med sannolikheten 0,5.
        function seg(x0, y0, x1, y1, T) {
            var vy0 = (y1 - y0 - 0.5 * G * T * T) / T;
            return { x0: x0, y0: y0, x1: x1, y1: y1, T: T, vy0: vy0 };
        }
        function spawnBall() {
            var g = geo;
            var lift = g.pegR + g.ballR * 0.95;
            var col = 0;
            var jitter = function () { return (Math.random() - 0.5) * g.ballR * 0.5; };
            var x = g.cx, y = g.neckBot;
            var y1 = pegY(0) - lift;
            var segs = [];
            var tDrop = Math.sqrt(2 * (y1 - y) / G);
            segs.push(seg(x, y, x + jitter() * 0.3, y1, tDrop));
            for (var r = 0; r < ROWS - 1; r++) {
                var right = Math.random() < 0.5;
                if (right) col++;
                var nx = pegX(r + 1, col) + jitter() * 0.4;
                var ny = pegY(r + 1) - lift;
                var last = segs[segs.length - 1];
                segs.push(seg(last.x1, last.y1, nx, ny, T_ROW * (0.92 + Math.random() * 0.16)));
            }
            if (Math.random() < 0.5) col++;
            var lastS = segs[segs.length - 1];
            flying.push({
                segs: segs, si: 0, t: 0, bin: col, x: lastS.x0, y: lastS.y0,
                startX: lastS.x1, startY: lastS.y1,
                dirX: (col > (ROWS - 1) / 2 ? 1 : -1), final: null, r: geo.ballR
            });
        }
        function enterFinal(b) {
            var last = b.segs[b.segs.length - 1];
            b.slot = counts[b.bin] + pending[b.bin];
            pending[b.bin]++;
            var target = slotPos(b.bin, b.slot);
            var vy0 = -60;
            var dy = target.y - last.y1;
            var T = (-vy0 + Math.sqrt(vy0 * vy0 + 2 * G * Math.max(4, dy))) / G;
            b.final = { x0: last.x1, y0: last.y1, T: T, vy0: vy0, tx0: target.x, ty0: target.y };
            b.t = 0;
        }
        function stepBall(b, dt) {
            if (!b.final) {
                b.t += dt;
                while (b.t >= b.segs[b.si].T) {
                    b.t -= b.segs[b.si].T;
                    soundPeg(b.segs[b.si].x1);   // kulan träffar ett stift
                    b.si++;
                    if (b.si >= b.segs.length) { enterFinal(b); return stepFinal(b, 0); }
                }
                var s = b.segs[b.si];
                var u = b.t / s.T;
                b.x = s.x0 + (s.x1 - s.x0) * u;
                b.y = s.y0 + s.vy0 * b.t + 0.5 * G * b.t * b.t;
                return false;
            }
            return stepFinal(b, dt);
        }
        function stepFinal(b, dt) {
            var f = b.final;
            b.t += dt;
            var target = slotPos(b.bin, b.slot);   // levande mål: skalan kan ändras under fallet
            var t = Math.min(b.t, f.T), u = t / f.T;
            var ease = u * u * (3 - 2 * u);
            b.x = f.x0 + (target.x - f.x0) * ease;
            var yPar = f.y0 + f.vy0 * t + 0.5 * G * t * t;
            b.y = yPar + (target.y - f.ty0) * u;
            var pr = pile.solid ? R_SOLID : pile.r;
            // Kulan behåller sin storlek under fallet och krymper först
            // de sista ögonblicken till högens skala.
            var shrink = clampNum((u - 0.7) / 0.3, 0, 1);
            b.r = geo.ballR + (Math.max(pr, 1.8) - geo.ballR) * shrink;
            return b.t >= f.T;
        }

        // ── Släpp kulor ───────────────────────────────────────────────────
        function addBalls(n) {
            resumeAudio();   // knapptrycket är den användargest ljudet kräver
            queue += n;
            // Takten väljs så att en hel sats tar ungefär 4,5 s att rinna ut.
            // Taket håller strömmen läsbar: 10 000 kulor tar då cirka 7 s.
            batchRate = Math.min(1400, Math.max(batchRate, queue / 4.5, 6));
            choosePileScale(false);
            runAnim();
        }
        function stopAnim() {
            if (animId != null) { cancelAnimationFrame(animId); animId = null; }
            lastTs = null;
        }
        function runAnim() {
            if (animId != null || destroyed) return;
            lastTs = null;
            animId = requestAnimationFrame(frame);
        }
        function frame(ts) {
            animId = null;
            var dt = lastTs == null ? 1 / 60 : Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;
            // Strömmen ur tratten
            if (queue > 0) {
                emitAcc += batchRate * dt;
                var n = Math.min(queue, Math.floor(emitAcc));
                if (queue === 1 && flying.length === 0) n = 1;
                emitAcc -= n;
                if (emitAcc < 0) emitAcc = 0;
                for (var i = 0; i < n; i++) spawnBall();
                queue -= n;
                if (queue === 0) { batchRate = 0; emitAcc = 0; }
            }
            var landed = false;
            for (var j = flying.length - 1; j >= 0; j--) {
                var b = flying[j];
                if (stepBall(b, dt)) {
                    soundLand(b.x);
                    counts[b.bin]++;
                    pending[b.bin]--;
                    total++;
                    flying.splice(j, 1);
                    landed = true;
                }
            }
            if (landed) {
                choosePileScale(false);
                updatePile();
                updateCounterAndNote();
            }
            draw();
            updateRain();
            if (flying.length > 0 || queue > 0) animId = requestAnimationFrame(frame);
            else { lastTs = null; updateCounterAndNote(); }
        }

        // ── Rita en bildruta ──────────────────────────────────────────────
        function showCurveNow() { return (state.step === 2 && state.showCurve) || state.step >= 3; }
        function draw() {
            if (!geo || !canvas.width) return;
            var c = ctx;
            c.setTransform(1, 0, 0, 1, 0, 0);
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(backLayer, 0, 0);
            c.setTransform(px, 0, 0, px, 0, 0);
            var g = geo;

            // Zonskuggning bakom högarna (steg 3)
            if (state.step >= 3) {
                var x2a = binX(MU - 2 * SIGMA), x2b = binX(MU + 2 * SIGMA);
                var x1a = binX(MU - SIGMA), x1b = binX(MU + SIGMA);
                c.fillStyle = COL.zone2;
                c.fillRect(x2a, g.binTop - 6, x2b - x2a, g.base - g.binTop + 6);
                c.fillStyle = COL.zone1;
                c.fillRect(x1a, g.binTop - 6, x1b - x1a, g.base - g.binTop + 6);
            }

            c.setTransform(1, 0, 0, 1, 0, 0);
            c.drawImage(pileLayer, 0, 0);
            c.setTransform(px, 0, 0, px, 0, 0);

            // Kulor kvar i tratten
            var nf = Math.min(queue, g.funSlots.length);
            for (var i = 0; i < nf; i++) drawBall(c, g.funSlots[i].x, g.funSlots[i].y, g.funR);
            // Kulor i luften
            for (i = 0; i < flying.length; i++) {
                var b = flying[i];
                drawBall(c, b.x, b.y, b.r);
            }

            c.setTransform(1, 0, 0, 1, 0, 0);
            c.drawImage(frontLayer, 0, 0);
            c.setTransform(px, 0, 0, px, 0, 0);

            var labelFont = Math.round(clampNum(9.5 / cssScale, 12.5, 23));

            // Zongränser + etiketter (steg 3)
            if (state.step >= 3) {
                var marks = [
                    { v: MU - 2 * SIGMA, t: ['*μ', ' − 2', '*σ'] },
                    { v: MU - SIGMA, t: ['*μ', ' − ', '*σ'] },
                    { v: MU, t: ['*μ'] },
                    { v: MU + SIGMA, t: ['*μ', ' + ', '*σ'] },
                    { v: MU + 2 * SIGMA, t: ['*μ', ' + 2', '*σ'] }
                ];
                c.save();
                c.strokeStyle = COL.zoneLine;
                c.lineWidth = 1.2;
                c.setLineDash([4, 4]);
                marks.forEach(function (m) {
                    var x = binX(m.v);
                    c.beginPath(); c.moveTo(x, g.binTop - 4); c.lineTo(x, g.base); c.stroke();
                });
                c.restore();
                marks.forEach(function (m) {
                    drawMixedText(c, m.t, binX(m.v), g.binTop - 10, labelFont, COL.zoneText);
                });
            }

            // Normalfördelningskurvan på glaset
            if (showCurveNow() && total > 0) {
                c.save();
                c.beginPath(); c.rect(g.binsLeft, g.iy0, g.binsRight - g.binsLeft, g.base - g.iy0); c.clip();
                c.beginPath();
                var N = 180;
                for (i = 0; i <= N; i++) {
                    var kk = -0.5 + (ROWS + 1) * i / N;
                    var yy = g.base - total * gaussDensity(kk) * pile.hPerBall;
                    var xx = binX(kk);
                    if (i === 0) c.moveTo(xx, yy); else c.lineTo(xx, yy);
                }
                c.strokeStyle = COL.curve;
                c.lineWidth = 2.8;
                c.lineJoin = 'round'; c.lineCap = 'round';
                c.stroke();
                c.restore();
            }

            // Antal kulor i varje fack (under fackens nummer), på bred skärm
            if (cssScale >= 0.68) {
                var kFont = Math.round(clampNum(11.5 / cssScale, 15, 24));
                var y = g.oy1 + 6 + kFont + 6 + labelFont;
                c.font = labelFont + 'px ' + FONT;
                c.fillStyle = COL.tick;
                c.textAlign = 'center';
                c.textBaseline = 'alphabetic';
                for (i = 0; i <= ROWS; i++) c.fillText(fmtInt(counts[i]), binX(i), y);
                c.textAlign = 'right';
                c.fillText('antal', g.binsLeft - 10, y);
            }

            // Kö-räknare vid tratten
            if (queue > 0) {
                c.font = '600 ' + labelFont + 'px ' + FONT;
                c.fillStyle = COL.tick;
                c.textAlign = 'left';
                c.textBaseline = 'middle';
                c.fillText('i tratten: ' + fmtInt(queue), g.cx + g.funTopW / 2 + 12, (g.funTop + g.funBot) / 2);
            }
        }
        // Text med kursiva delar (märkta med *), centrerad kring x.
        function drawMixedText(c, parts, x, y, size, color) {
            var widths = [], totalW = 0;
            parts.forEach(function (p) {
                var it = p.charAt(0) === '*';
                c.font = (it ? 'italic ' : '') + '600 ' + size + 'px ' + FONT;
                var w = c.measureText(it ? p.slice(1) : p).width;
                widths.push(w); totalW += w;
            });
            var cx = x - totalW / 2;
            c.fillStyle = color;
            c.textAlign = 'left';
            c.textBaseline = 'alphabetic';
            parts.forEach(function (p, i) {
                var it = p.charAt(0) === '*';
                c.font = (it ? 'italic ' : '') + '600 ' + size + 'px ' + FONT;
                c.fillText(it ? p.slice(1) : p, cx, y);
                cx += widths[i];
            });
        }

        // ── Formel (mu, sigma) ────────────────────────────────────────────
        function updateFormula() {
            if (state.step >= 3) {
                katexInto(formelMu,
                    '\\mu = \\dfrac{n}{2} = \\dfrac{' + ROWS + '}{2} = ' + fmtTex(MU, 1));
                katexInto(formelSigma,
                    '\\sigma = \\sqrt{n \\cdot 0{,}25} = \\sqrt{' + ROWS + ' \\cdot 0{,}25} \\approx ' + fmtTex(SIGMA, 2));
            } else { formelMu.textContent = ''; formelSigma.textContent = ''; }
        }

        // ── Räknare + live-text ────────────────────────────────────────────
        function updateCounterAndNote() {
            counterSpan.textContent = 'Antal kulor: ' + fmtInt(total);
            if (state.step === 1) {
                note.textContent = '';
                return;
            }
            if (total === 0) { note.textContent = 'Släpp några kulor för att se mönstret.'; return; }
            if (state.step === 2) {
                var mids = midBins();
                var midShare = sumBins(mids) / total;
                var edgeShare = sumBins([0, ROWS]) / total;
                var midLabel = mids.length === 2 ? (mids[0] + ' och ' + mids[1]) : String(mids[0]);
                note.innerHTML = 'De mittersta facken (' + midLabel + ') innehåller <strong>' +
                    pct(midShare) + '</strong> av kulorna. De yttersta facken (0 och ' + ROWS +
                    ') innehåller bara <strong>' + pct(edgeShare) + '</strong> tillsammans.';
            } else {
                var s1 = zoneCount(1) / total;
                var s2 = zoneCount(2) / total;
                note.innerHTML = 'Andel kulor inom <em>μ</em> ± <em>σ</em>: <strong>' + pct(s1) +
                    '</strong> (normalfördelningen ger 68,2 %). Andel inom <em>μ</em> ± 2<em>σ</em>: <strong>' +
                    pct(s2) + '</strong> (normalfördelningen ger 95,4 %). Kantfacken räknas efter ' +
                    'hur stor del av dem som ligger i zonen.';
            }
        }

        // ── Visa/dölj per steg + omritning ────────────────────────────────
        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = instrText(state.step);
            legCurve.style.display = state.step >= 2 ? '' : 'none';
            legZone1.style.display = state.step >= 3 ? '' : 'none';
            legZone2.style.display = state.step >= 3 ? '' : 'none';
            curveLabel.style.display = state.step === 2 ? '' : 'none';
            if (state.step >= 3) { curveCb.checked = true; curveCb.disabled = true; state.showCurve = true; }
            else { curveCb.disabled = false; }
            formelMu.style.display = state.step >= 3 ? '' : 'none';
            formelSigma.style.display = state.step >= 3 ? '' : 'none';
            updateFormula();
            choosePileScale(false);
            draw();
            updateRain();
            updateCounterAndNote();
        }

        // ── Storlek: följ kortets bredd (och fullskärm) ─────────────────────
        function onFullscreen() {
            var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
            if (fsEl && fsEl.contains(el)) {
                var maxW = Math.max(640, Math.min(980, (window.innerHeight - 300) * W / H));
                scene.style.maxWidth = Math.round(maxW) + 'px';
            } else {
                scene.style.maxWidth = '640px';
            }
            resize();
        }
        var ro = null;
        if (window.ResizeObserver) {
            ro = new ResizeObserver(function () { resize(); });
            ro.observe(scene);
        } else {
            window.addEventListener('resize', resize);
        }
        document.addEventListener('fullscreenchange', onFullscreen);
        document.addEventListener('webkitfullscreenchange', onFullscreen);
        // Teckensnittet kan laddas efter första ritningen
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () { if (!destroyed) { rebuildLayers(); draw(); } });
        }

        setupModel();
        resize();
        update();

        return {
            destroy: function () {
                destroyed = true;
                stopAnim();
                if (actx) { try { actx.close(); } catch (e) { /* redan stängd */ } }
                if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
                document.removeEventListener('fullscreenchange', onFullscreen);
                document.removeEventListener('webkitfullscreenchange', onFullscreen);
                el.innerHTML = '';
            }
        };
    }

    window.VISUALISERINGAR = window.VISUALISERINGAR || {};
    window.VISUALISERINGAR['ma2c-6.5'] = { mount: mount };
})();
