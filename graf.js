/* graf.js — interaktiv grafritare för teorigenomgångar.
 *
 * Bäddas in i teori-markdown med ett ::: graf-block:
 *
 *   ::: graf
 *   titel: y = kx + m
 *   uttryck: k*x + m
 *   ekvation: y = {k}x + {m}
 *   lutningstriangel: ja
 *   k: -2, -5, 5, 0.5
 *   m: 3, -10, 10, 1
 *   x: -6, 6
 *   y: -6, 6
 *   :::
 *
 * preprocessBlocks() i katalog.html/avsnitt.html gör om blocket till
 *   <div class="lab-graf" data-graf-src="<base64 av rå blocktext>"></div>
 * och efter render anropas window.FYSIKGRAF.mountAll(container) som här
 * bygger ett koordinatsystem + glidare/sifferfält som ritar om grafen live.
 *
 * Rutnätet är ALLTID symmetriskt: en enhet i x-led är lika lång som en
 * enhet i y-led (kvadratiska rutor). x-/y-fönstren i konfigurationen
 * anpassas så att båda intervallen ryms; vyn kan sedan panoreras (dra i
 * rutnätet, även touch/pinch) och zoomas (mushjul över rutnätet eller
 * +/−-knapparna).
 *
 * Fält i konfigurationen (en per rad, "nyckel: värde"):
 *   titel:    KaTeX-etikett ovanför grafen (valfritt; $ behövs ej).
 *   uttryck:  matematiskt uttryck i x och parametrarna (OBLIGATORISKT).
 *             Stöder + - * / ^, parenteser, unärt minus samt funktionerna
 *             sin cos tan asin acos atan sqrt abs exp ln log sign
 *             samt konstanterna pi och e. Decimaltecken: punkt.
 *   ekvation: KaTeX-mall med {param}-platshållare som visas under grafen
 *             med AKTUELLA värden insatta, live (valfritt men rekommenderat).
 *             Snyggas upp automatiskt: "+ -3" → "- 3", "1x" → "x",
 *             "0x + " försvinner.
 *   lutningstriangel: ja — streckat "trappsteg" från y-skärningen: 1 steg åt
 *             höger, Δy steg upp/ner (för räta linjer = k). Får automatiskt
 *             en kryssruta "Visa trappsteget" så det kan döljas. Valfritt.
 *   x:        startfönster i x-led "min, max" (valfritt, standard -6, 6).
 *   y:        startfönster i y-led "min, max" (valfritt, standard -6, 6).
 *   <param>:  "värde, min, max[, steg]" — en glidare per parameter.
 *
 * Widgeten är ren vanilla-JS (ingen React) och matchar Laborans-papperstemat.
 */
(function () {
    'use strict';

    // ── Sifferformatering (svensk: komma, exakt/avrundat noll → "0") ──────
    function fmt(v, decimals) {
        if (!isFinite(v)) return '–';
        var d = decimals == null ? 2 : decimals;
        var s = v.toFixed(d);
        if (parseFloat(s) === 0) return '0';
        // strippa avslutande nollor i decimaldelen
        if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s.replace('.', ',');
    }
    // KaTeX-variant: decimalkomma skrivs {,} så det inte läses som skiljetecken
    function fmtTex(v, decimals) {
        return fmt(v, decimals).replace(',', '{,}');
    }
    // Visningsvariant för SVG-etiketter: äkta minustecken (U+2212), som i
    // de handritade teori-figurerna. (Fälten behöver ASCII '-' och '.')
    function fmtDisp(v, decimals) {
        return fmt(v, decimals).replace('-', '−');
    }
    // Antal decimaler ett steg kräver (0.5 → 1, 0.25 → 2, 1 → 0)
    function stepDecimals(step) {
        if (!isFinite(step) || step <= 0) return 2;
        var s = String(step);
        var i = s.indexOf('.');
        return i < 0 ? 0 : (s.length - i - 1);
    }
    // Decimaler för rutnätssteg (niceStep ger 1/2/5 · 10^n)
    function gridDecimals(gs) {
        return gs >= 1 ? 0 : -Math.floor(Math.log(gs) / Math.LN10 + 1e-9);
    }

    // ── Uttrycks-kompilator (shunting-yard → RPN → utvärderare) ───────────
    // Ingen eval(); bara aritmetik och en vitlista av funktioner/konstanter.
    var FUNCS = {
        sin: Math.sin, cos: Math.cos, tan: Math.tan,
        asin: Math.asin, acos: Math.acos, atan: Math.atan,
        sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp,
        ln: Math.log, log: function (v) { return Math.log(v) / Math.LN10; },
        sign: Math.sign
    };
    var CONSTS = { pi: Math.PI, e: Math.E };
    var OPS = {
        '+': { prec: 2, assoc: 'L', fn: function (a, b) { return a + b; } },
        '-': { prec: 2, assoc: 'L', fn: function (a, b) { return a - b; } },
        '*': { prec: 3, assoc: 'L', fn: function (a, b) { return a * b; } },
        '/': { prec: 3, assoc: 'L', fn: function (a, b) { return a / b; } },
        '^': { prec: 4, assoc: 'R', fn: function (a, b) { return Math.pow(a, b); } }
    };

    function tokenize(expr) {
        var tokens = [];
        var i = 0, n = expr.length;
        while (i < n) {
            var c = expr[i];
            if (c === ' ' || c === '\t') { i++; continue; }
            if ((c >= '0' && c <= '9') || c === '.') {
                var num = '';
                while (i < n && ((expr[i] >= '0' && expr[i] <= '9') || expr[i] === '.')) { num += expr[i++]; }
                tokens.push({ t: 'num', v: parseFloat(num) });
                continue;
            }
            if (/[a-zA-Z_]/.test(c)) {
                var name = '';
                while (i < n && /[a-zA-Z0-9_]/.test(expr[i])) { name += expr[i++]; }
                tokens.push({ t: 'name', v: name });
                continue;
            }
            if (c === '(' || c === ')' || c === ',') { tokens.push({ t: c }); i++; continue; }
            if (OPS[c]) { tokens.push({ t: 'op', v: c }); i++; continue; }
            // '·' och '−' (Unicode) tolereras
            if (c === '·') { tokens.push({ t: 'op', v: '*' }); i++; continue; }
            if (c === '−') { tokens.push({ t: 'op', v: '-' }); i++; continue; }
            throw new Error('Okänt tecken i uttryck: ' + c);
        }
        return tokens;
    }

    // Returnerar en funktion(scope) → tal. scope innehåller x + parametrar.
    function compile(expr) {
        var tokens = tokenize(expr);
        var output = [];   // RPN
        var stack = [];
        var prev = null;   // för att känna igen unärt minus
        for (var i = 0; i < tokens.length; i++) {
            var tk = tokens[i];
            if (tk.t === 'num') { output.push(tk); }
            else if (tk.t === 'name') {
                if (FUNCS[tk.v]) stack.push({ t: 'func', v: tk.v });
                else output.push(tk); // variabel eller konstant
            }
            else if (tk.t === ',') {
                while (stack.length && stack[stack.length - 1].t !== '(') output.push(stack.pop());
            }
            else if (tk.t === 'op') {
                // unärt minus/plus
                var unary = (prev === null || prev.t === 'op' || prev.t === '(' || prev.t === ',');
                if (unary && (tk.v === '-' || tk.v === '+')) {
                    output.push({ t: 'num', v: 0 });
                    stack.push({ t: 'op', v: tk.v });
                } else {
                    var o1 = OPS[tk.v];
                    while (stack.length) {
                        var top = stack[stack.length - 1];
                        if (top.t === 'op') {
                            var o2 = OPS[top.v];
                            if ((o1.assoc === 'L' && o1.prec <= o2.prec) ||
                                (o1.assoc === 'R' && o1.prec < o2.prec)) { output.push(stack.pop()); continue; }
                        }
                        break;
                    }
                    stack.push({ t: 'op', v: tk.v });
                }
            }
            else if (tk.t === '(') { stack.push(tk); }
            else if (tk.t === ')') {
                while (stack.length && stack[stack.length - 1].t !== '(') output.push(stack.pop());
                if (!stack.length) throw new Error('Obalanserade parenteser');
                stack.pop(); // '('
                if (stack.length && stack[stack.length - 1].t === 'func') output.push(stack.pop());
            }
            prev = tk;
        }
        while (stack.length) {
            var s = stack.pop();
            if (s.t === '(') throw new Error('Obalanserade parenteser');
            output.push(s);
        }
        // Utvärdera RPN mot en scope
        return function (scope) {
            var st = [];
            for (var j = 0; j < output.length; j++) {
                var o = output[j];
                if (o.t === 'num') st.push(o.v);
                else if (o.t === 'name') {
                    if (o.v in scope) st.push(scope[o.v]);
                    else if (o.v in CONSTS) st.push(CONSTS[o.v]);
                    else throw new Error('Okänd variabel: ' + o.v);
                }
                else if (o.t === 'op') { var b = st.pop(), a = st.pop(); st.push(OPS[o.v].fn(a, b)); }
                else if (o.t === 'func') { st.push(FUNCS[o.v](st.pop())); }
            }
            return st.pop();
        };
    }

    // ── Konfigurationsparser ──────────────────────────────────────────────
    function num(str) { return parseFloat(String(str).replace(',', '.').trim()); }

    function parseConfig(text) {
        var cfg = {
            title: null, expr: null, eq: null, triangle: false,
            params: [], x: [-6, 6], y: [-6, 6]
        };
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line || line.indexOf(':::') === 0) continue;
            var ci = line.indexOf(':');
            if (ci < 0) continue;
            var key = line.slice(0, ci).trim();
            var val = line.slice(ci + 1).trim();
            if (key === 'titel') cfg.title = val;
            else if (key === 'uttryck') cfg.expr = val;
            else if (key === 'ekvation') cfg.eq = val;
            else if (key === 'lutningstriangel') cfg.triangle = /^(ja|1|true)$/i.test(val);
            else if (key === 'x') { var xp = val.split(','); cfg.x = [num(xp[0]), num(xp[1])]; }
            else if (key === 'y') { var yp = val.split(','); cfg.y = [num(yp[0]), num(yp[1])]; }
            else {
                // parameter: "namn: värde, min, max[, steg]"
                var p = val.split(',');
                if (p.length < 3) continue;
                var value = num(p[0]), mn = num(p[1]), mx = num(p[2]);
                var step = p.length >= 4 ? num(p[3]) : null;
                if (step == null || !isFinite(step) || step <= 0) {
                    // gissa ett rimligt steg (~40 steg över intervallet, nice-avrundat)
                    step = niceStep((mx - mn) / 40) || 0.1;
                }
                cfg.params.push({ name: key, value: value, min: mn, max: mx, step: step });
            }
        }
        return cfg;
    }

    // ── "Nice"-tal för steg och rutnät ────────────────────────────────────
    function niceStep(raw) {
        if (!(raw > 0)) return 1;
        var pow = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
        var f = raw / pow;
        var nice = f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10;
        return nice * pow;
    }

    // ── SVG-hjälpare ──────────────────────────────────────────────────────
    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    function svgText(attrs, str) {
        var el = svgEl('text', attrs);
        el.textContent = str;
        return el;
    }
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    // ── Widgetbyggare ─────────────────────────────────────────────────────
    var COL = {
        grid: 'rgba(31,37,48,0.08)',
        gridStrong: 'rgba(31,37,48,0.14)',
        axis: '#1f2530',
        curve: '#2563c9',
        accent: '#c8324a',
        tri: '#1c3d6b',
        tick: '#5b6472',
        track: 'rgba(15,22,32,0.22)'
    };
    var GEO = { W: 500, H: 400, l: 40, r: 30, t: 22, b: 32 };
    var uid = 0;   // unika clipPath-id:n även när samma uttryck förekommer flera gånger

    function build(el, cfg) {
        var fn;
        try { fn = compile(cfg.expr); }
        catch (err) {
            el.textContent = 'Kunde inte tolka uttrycket: ' + cfg.expr;
            return;
        }

        // scope (parameternamn → aktuellt värde)
        var scope = {};
        cfg.params.forEach(function (p) { scope[p.name] = p.value; });

        var card = document.createElement('div');
        card.className = 'lab-graf-card';

        if (cfg.title) {
            var h = document.createElement('div');
            h.className = 'lab-graf-title';
            // Rendera titeln som KaTeX (kursiva variabler, upprätta operatorer)
            // så den matchar övriga formler på sidan. Faller tillbaka på
            // ren text där KaTeX inte finns laddat.
            if (window.katex) {
                try { window.katex.render(cfg.title, h, { throwOnError: false, displayMode: false }); }
                catch (e) { h.textContent = cfg.title; }
            } else { h.textContent = cfg.title; }
            card.appendChild(h);
        }

        // Scen: svg + zoomknappar i ett positionerat omslag
        var scene = document.createElement('div');
        scene.className = 'lab-graf-scene';
        card.appendChild(scene);

        var svg = svgEl('svg', {
            viewBox: '0 0 ' + GEO.W + ' ' + GEO.H,
            width: GEO.W, height: GEO.H,
            'font-family': 'DM Sans, system-ui, sans-serif',
            role: 'img',
            'aria-label': 'Interaktiv graf till ' + (cfg.title || cfg.expr) +
                '. Dra för att panorera, zooma med knapparna.'
        });
        svg.classList.add('lab-graf-svg');
        scene.appendChild(svg);

        // Live-ekvation med aktuella värden (under grafen)
        var eqDiv = null;
        if (cfg.eq) {
            eqDiv = document.createElement('div');
            eqDiv.className = 'lab-graf-eq';
            card.appendChild(eqDiv);
        }

        // Kontroller
        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        // Värde-chips visas bara när ingen live-ekvation finns (annars dubblett)
        var chips = null;
        if (!cfg.eq && cfg.params.length) {
            chips = document.createElement('div');
            chips.className = 'lab-graf-chips';
            card.appendChild(chips);
        }

        el.innerHTML = '';
        el.appendChild(card);

        // ── Vy: centrum + skala (px per enhet, SAMMA i x- och y-led) ──────
        // Startfönstret anpassas så att BÅDA de begärda intervallen ryms
        // med kvadratiska rutor; den rymligare riktningen får luft.
        var plotW = GEO.W - GEO.l - GEO.r;
        var plotH = GEO.H - GEO.t - GEO.b;
        var CXpx = GEO.l + plotW / 2, CYpx = GEO.t + plotH / 2;
        var scale0 = Math.min(plotW / (cfg.x[1] - cfg.x[0]), plotH / (cfg.y[1] - cfg.y[0]));
        var view0 = { cx: (cfg.x[0] + cfg.x[1]) / 2, cy: (cfg.y[0] + cfg.y[1]) / 2, scale: scale0 };
        var view = { cx: view0.cx, cy: view0.cy, scale: view0.scale };
        var SC_MIN = scale0 / 10, SC_MAX = scale0 * 20;

        function xToPx(x) { return CXpx + (x - view.cx) * view.scale; }
        function yToPx(y) { return CYpx - (y - view.cy) * view.scale; }

        var showTri = cfg.triangle;
        var clipId = 'lab-graf-clip-' + (uid++);

        // ── Live-ekvation: sätt in aktuella värden i {param}-mallen ───────
        function eqTex() {
            var tex = cfg.eq;
            cfg.params.forEach(function (p) {
                tex = tex.split('{' + p.name + '}').join(fmtTex(scope[p.name], stepDecimals(p.step)));
            });
            // Skolboks-städning av insatta värden:
            tex = tex.replace(/\+\s*-\s*/g, '- ');          // "+ -3"  → "- 3"
            tex = tex.replace(/(^|[=+(\s-])1x/g, '$1x');    // "1x"    → "x"  (inte "21x")
            tex = tex.replace(/(^|[=+(\s-])1\s*\\cdot\s*/g, '$1'); // "1 · a^x" → "a^x"
            tex = tex.replace(/\s*\+\s*0(?![.,{\d])/g, ''); // "+ 0"   → bort
            tex = tex.replace(/0x\s*\+\s*/g, '');           // "0x + 3"→ "3"
            tex = tex.replace(/0x\s*-\s*/g, '-');           // "0x - 3"→ "-3"
            tex = tex.replace(/0x\s*$/g, '0');              // "= 0x"  → "= 0"
            return tex;
        }
        function updateEq() {
            if (!eqDiv) return;
            var tex = eqTex();
            if (window.katex) {
                try { window.katex.render(tex, eqDiv, { throwOnError: false, displayMode: false }); return; }
                catch (e) { /* fall igenom till text */ }
            }
            eqDiv.textContent = tex.replace(/\{,\}/g, ',');
        }

        // ── Rita (rensa + bygg om SVG-innehållet) ─────────────────────────
        function draw() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);

            var xmin = view.cx - plotW / 2 / view.scale;
            var xmax = view.cx + plotW / 2 / view.scale;
            var ymin = view.cy - plotH / 2 / view.scale;
            var ymax = view.cy + plotH / 2 / view.scale;

            // Rutnätssteg: samma i båda riktningarna (kvadratiska rutor).
            // Målet ~34 px per ruta är valt så att standardstartläget
            // (fönster ±6) får stödlinjer för VARJE heltalssteg.
            var gs = niceStep(34 / view.scale);
            var dec = gridDecimals(gs);

            var yAxisVisible = (0 >= xmin && 0 <= xmax);
            var xAxisVisible = (0 >= ymin && 0 <= ymax);
            // Tick-etiketternas rad/kolumn: vid axeln om synlig, annars
            // fastnålad vid närmaste plotkant.
            var axisXpx = clampNum(xToPx(0), GEO.l + 22, GEO.l + plotW - 4);
            var axisYpx = clampNum(yToPx(0), GEO.t + 4, GEO.t + plotH);

            // Rutnät
            var i, k, px, py;
            var i0 = Math.ceil(xmin / gs), i1 = Math.floor(xmax / gs);
            for (i = i0; i <= i1; i++) {
                k = i * gs; px = xToPx(k);
                svg.appendChild(svgEl('line', {
                    x1: px, y1: GEO.t, x2: px, y2: GEO.t + plotH,
                    stroke: i === 0 ? COL.gridStrong : COL.grid, 'stroke-width': 1
                }));
            }
            var j0 = Math.ceil(ymin / gs), j1 = Math.floor(ymax / gs);
            for (i = j0; i <= j1; i++) {
                k = i * gs; py = yToPx(k);
                svg.appendChild(svgEl('line', {
                    x1: GEO.l, y1: py, x2: GEO.l + plotW, y2: py,
                    stroke: i === 0 ? COL.gridStrong : COL.grid, 'stroke-width': 1
                }));
            }

            // Axlar med pilspetsar (bara när de faktiskt är i bild)
            if (xAxisVisible) {
                var ay = yToPx(0);
                svg.appendChild(svgEl('line', { x1: GEO.l, y1: ay, x2: GEO.l + plotW + 10, y2: ay, stroke: COL.axis, 'stroke-width': 1.6 }));
                svg.appendChild(svgEl('polygon', { points: (GEO.l + plotW + 18) + ',' + ay + ' ' + (GEO.l + plotW + 8) + ',' + (ay - 4.5) + ' ' + (GEO.l + plotW + 8) + ',' + (ay + 4.5), fill: COL.axis }));
                svg.appendChild(svgText({ x: GEO.W - 4, y: ay + 17, 'font-size': 14.5, 'text-anchor': 'end', fill: COL.axis, 'font-style': 'italic' }, 'x'));
            }
            if (yAxisVisible) {
                var ax = xToPx(0);
                svg.appendChild(svgEl('line', { x1: ax, y1: GEO.t + plotH, x2: ax, y2: GEO.t - 8, stroke: COL.axis, 'stroke-width': 1.6 }));
                svg.appendChild(svgEl('polygon', { points: ax + ',' + (GEO.t - 16) + ' ' + (ax - 4.5) + ',' + (GEO.t - 6) + ' ' + (ax + 4.5) + ',' + (GEO.t - 6), fill: COL.axis }));
                svg.appendChild(svgText({ x: ax + 10, y: GEO.t - 6, 'font-size': 14.5, 'text-anchor': 'start', fill: COL.axis, 'font-style': 'italic' }, 'y'));
            }

            // Tick-etiketter (hoppa över 0 — origo markeras inte)
            for (i = i0; i <= i1; i++) {
                if (i === 0) continue;
                k = i * gs;
                svg.appendChild(svgText(
                    { x: xToPx(k), y: axisYpx + 16, 'font-size': 11, 'text-anchor': 'middle', fill: COL.tick },
                    fmtDisp(k, dec)));
            }
            for (i = j0; i <= j1; i++) {
                if (i === 0) continue;
                k = i * gs;
                svg.appendChild(svgText(
                    { x: axisXpx - 6, y: yToPx(k) + 3.5, 'font-size': 11, 'text-anchor': 'end', fill: COL.tick },
                    fmtDisp(k, dec)));
            }

            // Klippram för kurva, trappsteg och skärningspunkt
            var defs = svgEl('defs');
            var cp = svgEl('clipPath', { id: clipId });
            cp.appendChild(svgEl('rect', { x: GEO.l, y: GEO.t, width: plotW, height: plotH }));
            defs.appendChild(cp);
            svg.appendChild(defs);
            var gClip = svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
            svg.appendChild(gClip);

            // Trappsteget (under kurvan i z-ordning): från y-skärningen
            // 1 steg åt höger, sedan Δy upp/ner. För en rät linje är Δy = k.
            if (showTri) {
                scope.x = 0; var yA; try { yA = fn(scope); } catch (e) { yA = NaN; }
                scope.x = 1; var yB; try { yB = fn(scope); } catch (e) { yB = NaN; }
                var dy = yB - yA;
                if (isFinite(yA) && isFinite(yB) && Math.abs(dy) > 0.005) {
                    var tax = xToPx(0), tay = yToPx(yA);
                    var tbx = xToPx(1), tby = yToPx(yB);
                    gClip.appendChild(svgEl('line', { x1: tax, y1: tay, x2: tbx, y2: tay, stroke: COL.tri, 'stroke-width': 1.6, 'stroke-dasharray': '5 4' }));
                    gClip.appendChild(svgEl('line', { x1: tbx, y1: tay, x2: tbx, y2: tby, stroke: COL.tri, 'stroke-width': 1.6, 'stroke-dasharray': '5 4' }));
                    // Etiketter: "1" under/över den vågräta kateten (på motsatt
                    // sida mot kurvan), Δy till höger om den lodräta.
                    gClip.appendChild(svgText(
                        { x: (tax + tbx) / 2, y: dy > 0 ? tay + 14 : tay - 7, 'font-size': 11.5, 'text-anchor': 'middle', fill: COL.tri },
                        '1'));
                    gClip.appendChild(svgText(
                        { x: tbx + 6, y: (tay + tby) / 2 + 4, 'font-size': 11.5, 'text-anchor': 'start', fill: COL.tri },
                        fmtDisp(dy, 2)));
                }
            }

            // Kurvan — sampla och bryt vid diskontinuiteter/utanför fönster
            var N = 400;
            var d = '', penDown = false;
            for (var s = 0; s <= N; s++) {
                var xv = xmin + (xmax - xmin) * s / N;
                scope.x = xv;
                var yv;
                try { yv = fn(scope); } catch (e) { yv = NaN; }
                var inRange = isFinite(yv) && yv >= ymin - (ymax - ymin) && yv <= ymax + (ymax - ymin);
                if (isFinite(yv) && inRange) {
                    var pxc = xToPx(xv), pyc = yToPx(clampNum(yv, ymin - 1, ymax + 1));
                    d += (penDown ? 'L' : 'M') + pxc.toFixed(1) + ' ' + pyc.toFixed(1) + ' ';
                    penDown = true;
                } else {
                    penDown = false;
                }
            }
            gClip.appendChild(svgEl('path', {
                d: d, fill: 'none', stroke: COL.curve, 'stroke-width': 2.4,
                'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }));

            // Markera y-skärning (x = 0)
            scope.x = 0;
            var yInt;
            try { yInt = fn(scope); } catch (e) { yInt = NaN; }
            if (isFinite(yInt)) {
                gClip.appendChild(svgEl('circle', { cx: xToPx(0), cy: yToPx(yInt), r: 3.8, fill: COL.accent }));
            }

            updateEq();
            updateChips();
        }

        function updateChips() {
            if (!chips) return;
            chips.innerHTML = '';
            cfg.params.forEach(function (p) {
                var c = document.createElement('span');
                c.className = 'lab-graf-chip';
                var b = document.createElement('em');
                b.textContent = p.name;
                c.appendChild(b);
                c.appendChild(document.createTextNode(' = ' + fmtDisp(scope[p.name], stepDecimals(p.step))));
                chips.appendChild(c);
            });
        }

        // ── Panorering och zoom ───────────────────────────────────────────
        // Klientkoordinater → svg-användarkoordinater (viewBox-skala)
        function toSvg(clientX, clientY) {
            var r = svg.getBoundingClientRect();
            return {
                x: (clientX - r.left) * GEO.W / r.width,
                y: (clientY - r.top) * GEO.H / r.height
            };
        }
        function setScale(s2, px, py) {
            s2 = clampNum(s2, SC_MIN, SC_MAX);
            if (px != null) {
                // Håll världspunkten under (px, py) stilla under zoomen
                var wx = view.cx + (px - CXpx) / view.scale;
                var wy = view.cy - (py - CYpx) / view.scale;
                view.cx = wx - (px - CXpx) / s2;
                view.cy = wy + (py - CYpx) / s2;
            }
            view.scale = s2;
            draw();
        }

        var pointers = {};      // pointerId → senaste svg-position
        var pCount = 0;
        var panStart = null;    // { x, y, cx, cy } för endragspanorering
        var pinchStart = null;  // { d, mid, view } för tvåfingerzoom

        svg.addEventListener('pointerdown', function (e) {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            var pt = toSvg(e.clientX, e.clientY);
            pointers[e.pointerId] = pt;
            pCount++;
            try { svg.setPointerCapture(e.pointerId); } catch (err) { /* syntetiska event */ }
            if (pCount === 1) {
                panStart = { x: pt.x, y: pt.y, cx: view.cx, cy: view.cy };
                svg.classList.add('is-panning');
            } else if (pCount === 2) {
                // Pinch: spara startavstånd + mittpunkt + vy
                var ids = Object.keys(pointers);
                var a = pointers[ids[0]], b = pointers[ids[1]];
                pinchStart = {
                    d: Math.hypot(b.x - a.x, b.y - a.y) || 1,
                    mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
                    view: { cx: view.cx, cy: view.cy, scale: view.scale }
                };
                panStart = null;
            }
        });
        svg.addEventListener('pointermove', function (e) {
            if (!(e.pointerId in pointers)) return;
            var pt = toSvg(e.clientX, e.clientY);
            pointers[e.pointerId] = pt;
            if (pinchStart && pCount >= 2) {
                var ids = Object.keys(pointers);
                var a = pointers[ids[0]], b = pointers[ids[1]];
                var d1 = Math.hypot(b.x - a.x, b.y - a.y) || 1;
                var mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
                var s2 = clampNum(pinchStart.view.scale * d1 / pinchStart.d, SC_MIN, SC_MAX);
                // Världspunkten under start-mitten ska följa med till nya mitten
                var wx = pinchStart.view.cx + (pinchStart.mid.x - CXpx) / pinchStart.view.scale;
                var wy = pinchStart.view.cy - (pinchStart.mid.y - CYpx) / pinchStart.view.scale;
                view.scale = s2;
                view.cx = wx - (mid.x - CXpx) / s2;
                view.cy = wy + (mid.y - CYpx) / s2;
                draw();
            } else if (panStart) {
                view.cx = panStart.cx - (pt.x - panStart.x) / view.scale;
                view.cy = panStart.cy + (pt.y - panStart.y) / view.scale;
                draw();
            }
        });
        function endPointer(e) {
            if (!(e.pointerId in pointers)) return;
            delete pointers[e.pointerId];
            pCount = Math.max(0, pCount - 1);
            pinchStart = null;
            if (pCount === 1) {
                // Fortsätt panorera med kvarvarande finger
                var ids = Object.keys(pointers);
                var pt = pointers[ids[0]];
                panStart = { x: pt.x, y: pt.y, cx: view.cx, cy: view.cy };
            } else {
                panStart = null;
                svg.classList.remove('is-panning');
            }
        }
        svg.addEventListener('pointerup', endPointer);
        svg.addEventListener('pointercancel', endPointer);

        // Mushjul över koordinatsystemet = zoom mot muspekaren.
        // preventDefault stoppar sidscroll (och webbläsarzoom vid Ctrl+hjul)
        // medan pekaren är över scenen — utanför scrollar sidan som vanligt.
        svg.addEventListener('wheel', function (e) {
            e.preventDefault();
            var pt = toSvg(e.clientX, e.clientY);
            setScale(view.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), pt.x, pt.y);
        }, { passive: false });

        // Zoomknappar (+ / − / återställ vyn) uppe till höger på scenen
        var zoomBox = document.createElement('div');
        zoomBox.className = 'lab-graf-zoom';
        function zBtn(html, title, onClick) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-graf-zbtn';
            b.innerHTML = html;
            b.title = title;
            b.setAttribute('aria-label', title);
            b.addEventListener('click', onClick);
            zoomBox.appendChild(b);
            return b;
        }
        zBtn('+', 'Zooma in', function () { setScale(view.scale * 1.3); });
        zBtn('&#8722;', 'Zooma ut', function () { setScale(view.scale / 1.3); });
        zBtn('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
            'Återställ vyn', function () {
                view.cx = view0.cx; view.cy = view0.cy; view.scale = view0.scale;
                draw();
            });
        scene.appendChild(zoomBox);

        // Accentfärgad fyllnad i glidarspåret fram till tummen
        function paintSlider(slider, p) {
            var pct = (scope[p.name] - p.min) / (p.max - p.min) * 100;
            pct = clampNum(pct, 0, 100);
            slider.style.background = 'linear-gradient(to right, ' + COL.accent + ' 0%, ' +
                COL.accent + ' ' + pct + '%, ' + COL.track + ' ' + pct + '%, ' + COL.track + ' 100%)';
        }

        // ── Bygg kontrollrader ────────────────────────────────────────────
        var rows = [];
        cfg.params.forEach(function (p) {
            var row = document.createElement('div');
            row.className = 'lab-graf-row';

            var lbl = document.createElement('label');
            lbl.className = 'lab-graf-lbl';
            var em = document.createElement('em');
            em.textContent = p.name;
            lbl.appendChild(em);

            var slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'lab-graf-slider';
            slider.min = p.min; slider.max = p.max; slider.step = p.step; slider.value = p.value;
            slider.setAttribute('aria-label', 'Parametern ' + p.name);

            var field = document.createElement('input');
            field.type = 'number';
            field.className = 'lab-graf-num';
            field.min = p.min; field.max = p.max; field.step = p.step; field.value = p.value;
            field.setAttribute('inputmode', 'decimal');
            field.setAttribute('aria-label', 'Värde för ' + p.name);

            function apply(v, from) {
                if (!isFinite(v)) return;
                v = clampNum(v, p.min, p.max);
                scope[p.name] = v;
                if (from !== 'slider') slider.value = v;
                if (from !== 'field') field.value = fmt(v, stepDecimals(p.step)).replace(',', '.');
                paintSlider(slider, p);
                draw();
            }
            slider.addEventListener('input', function () { apply(parseFloat(slider.value), 'slider'); });
            field.addEventListener('input', function () { apply(num(field.value), 'field'); });
            // Normalisera fältet när man lämnar det (t.ex. efter halvskrivet tal)
            field.addEventListener('blur', function () {
                field.value = fmt(scope[p.name], stepDecimals(p.step)).replace(',', '.');
            });

            paintSlider(slider, p);
            lbl.appendChild(slider);
            row.appendChild(lbl);
            row.appendChild(field);
            controls.appendChild(row);
            rows.push({ p: p, slider: slider, field: field });
        });

        // ── Footer: kryssruta för trappsteget + Återställ ─────────────────
        if (cfg.triangle || cfg.params.length) {
            var foot = document.createElement('div');
            foot.className = 'lab-graf-foot';

            if (cfg.triangle) {
                var check = document.createElement('label');
                check.className = 'lab-graf-check';
                var cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = showTri;
                cb.addEventListener('change', function () { showTri = cb.checked; draw(); });
                check.appendChild(cb);
                // Texten i ett eget spann — etiketten är en flex-container
                // med gap, så en naken textnod som senare splittas av någon
                // DOM-vandrare (t.ex. bionic) skulle bli flera flex-items
                // med luckor mitt i orden.
                var cbText = document.createElement('span');
                cbText.textContent = 'Visa trappsteget';
                check.appendChild(cbText);
                foot.appendChild(check);
            }

            if (cfg.params.length) {
                var reset = document.createElement('button');
                reset.type = 'button';
                reset.className = 'lab-graf-reset';
                reset.textContent = 'Återställ';
                reset.addEventListener('click', function () {
                    rows.forEach(function (r) {
                        scope[r.p.name] = r.p.value;
                        r.slider.value = r.p.value;
                        r.field.value = fmt(r.p.value, stepDecimals(r.p.step)).replace(',', '.');
                        paintSlider(r.slider, r.p);
                    });
                    view.cx = view0.cx; view.cy = view0.cy; view.scale = view0.scale;
                    draw();
                });
                foot.appendChild(reset);
            }
            card.appendChild(foot);
        }

        draw();
    }

    // ── Publikt API ───────────────────────────────────────────────────────
    function decodeSrc(b64) {
        try { return decodeURIComponent(escape(atob(b64))); }
        catch (e) { try { return atob(b64); } catch (e2) { return ''; } }
    }

    function mountAll(root) {
        if (!root) return;
        var nodes = root.querySelectorAll('.lab-graf[data-graf-src]:not([data-graf-mounted])');
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            node.setAttribute('data-graf-mounted', '1');
            var src = decodeSrc(node.getAttribute('data-graf-src'));
            var cfg = parseConfig(src);
            if (!cfg.expr) { node.textContent = 'Graf saknar uttryck.'; continue; }
            try { build(node, cfg); }
            catch (e) { node.textContent = 'Kunde inte bygga grafen.'; }
        }
    }

    window.FYSIKGRAF = { mountAll: mountAll, compile: compile, parseConfig: parseConfig };
})();
