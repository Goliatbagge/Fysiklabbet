/* kopplade-fjadrar.js — en fjäder, två seriekopplade och två
 * parallellkopplade fjädrar bredvid varandra (fy2-2.2).
 *
 * Används på två ställen, så att de alltid visar samma sak:
 *   1. ::: minisim  typ: kopplade-fjadrar  i teorin (minisim.js laddar
 *      filen först när blocket finns på sidan och anropar mount()).
 *   2. Läget "Kopplade fjädrar" i fysik2-hookes-lag-app.html, som använder
 *      motor() direkt på sin egen canvas och bygger reglagen i React.
 *
 * Förloppet har tre steg:
 *   tom     bara fjädrarna, olastade
 *   hangt   samma massa m i varje upphängning (parallellt fördelad på två
 *           vikter med massan m/2), förlängningen markerad med måttlinjer
 *   svang   alla tre dras ned lika långt (amplituden A) och släpps samtidigt
 *
 * Fysik (likadana fjädrar, fjäderkonstanten k, n = 2):
 *   en fjäder        k_R = k        Δl = m·g/k     T = 2π·√(m/k)
 *   seriekoppling    k_R = k/2      Δl = 2·m·g/k   T = √2 · T₁
 *   parallellt       k_R = 2·k      Δl = m·g/(2k)  T = T₁/√2
 * I serien sitter skarven mellan fjädrarna alltid mitt emellan taket och
 * vikten i höjdled räknat från de olastade längderna: varje fjäder bär
 * hela tyngden och förlängs lika mycket. Svängningen räknas analytiskt,
 * y = −A·cos(ω·t), så att amplituden aldrig driver.
 */
(function () {
    'use strict';

    var W = 560, H = 430;            // logisk ritstorlek (samma som minisims)
    var G = 9.82;
    var FONT = '"Poppins", system-ui, sans-serif';
    var INK = '#1f2530';
    var BLUE = '#2563c9';
    var SPRING = '#7c828c';
    var CEIL_Y = 40;
    var L0 = 72;                     // olastad fjäderlängd (px)
    var XS = [100, 286, 462];        // upphängningarnas x
    var PAR_D = 24;                  // parallellfjädrarnas avstånd från mitten
    var NAMN = ['En fjäder', 'Seriekoppling', 'Parallellkoppling'];
    var BOTTOM_LIMIT = 364;          // lägsta tillåtna viktunderkant (px)
    var A_M = 0.02;                  // amplitud vid "Sätt i svängning" (m)
    var HANG_S = 0.9;                // nedsänkningens längd (s)

    function fmt(v, d) {
        var s = v.toFixed(d == null ? 1 : d);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }

    function motor(canvas, opts) {
        opts = opts || {};
        var ctx = canvas.getContext('2d');
        var m = opts.m || 0.1, k = opts.k || 10;
        var visaDl = opts.visaDl !== false, visaT = opts.visaT !== false;
        var state = 'tom';           // 'tom' | 'hanger' | 'hangt' | 'svang'
        var hangT = 0;               // tid sedan "Häng i vikterna" (s)
        var t = 0;                   // tid sedan "Sätt i svängning" (s)
        var paused = false, slow = false;
        var visible = true, rafId = 0, lastTs = 0, dead = false;
        var view = { s: 1, ox: 0, oy: 0, dpr: 1, cw: W, ch: H };

        function kR(i) { return i === 0 ? k : (i === 1 ? k / 2 : 2 * k); }
        function dl(i) { return m * G / kR(i); }                 // m
        function period(i) { return 2 * Math.PI * Math.sqrt(m / kR(i)); }
        // skala: seriekopplingen (störst förlängning) ska rymmas med amplitud
        function pxm() {
            var budget = BOTTOM_LIMIT - (CEIL_Y + 2 * L0) - 30;
            return Math.min(760, budget / (dl(1) + A_M));
        }
        function ease(u) { return u <= 0 ? 0 : u >= 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * u); }
        function lastFaktor() {
            if (state === 'tom') return 0;
            if (state === 'hanger') return ease(hangT / HANG_S);
            return 1;
        }
        // elongation (m, positiv NEDÅT) runt jämviktsläget
        function elong(i) {
            if (state !== 'svang') return 0;
            return A_M * Math.cos(2 * Math.PI * t / period(i));
        }
        // fjäderändens/viktfästets y (px) för upphängning i
        function hookY(i) {
            var P = pxm();
            var natur = CEIL_Y + (i === 1 ? 2 * L0 : L0);
            return natur + (dl(i) * lastFaktor() + elong(i)) * P;
        }
        function naturY(i) { return CEIL_Y + (i === 1 ? 2 * L0 : L0); }
        function eqY(i) { return naturY(i) + dl(i) * pxm(); }

        // ── Canvas-storlek ───────────────────────────────────────────────
        function resize() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cw = canvas.clientWidth || W;
            // extraW: tom yta till höger om scenen (logiska enheter), där
            // Hookes lag-sidans inställningsruta ligger utan att skymma något
            var ex = typeof opts.extraW === 'function' ? opts.extraW() : (opts.extraW || 0);
            var Wt = W + ex;
            var ch = opts.fyll ? (canvas.clientHeight || H) : cw * H / Wt;
            var s = Math.min(cw / Wt, ch / H);
            view = { s: s, ox: (cw - Wt * s) / 2, oy: (ch - H * s) / 2, dpr: dpr, cw: cw, ch: ch };
            var bw = Math.round(cw * dpr), bh = Math.round(ch * dpr);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            render();
        }

        // ── Ritning ──────────────────────────────────────────────────────
        function drawBackground() {
            ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
            var g = ctx.createLinearGradient(0, 0, 0, view.ch);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, view.cw, view.ch);
            // rutnätet följer scenens skala så att det ser likadant ut i alla lägen
            var step = 26 * view.s;
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            var x0 = view.ox % step, y0 = view.oy % step;
            for (var x = x0; x < view.cw; x += step) { ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, view.ch); }
            for (var y = y0; y < view.ch; y += step) { ctx.moveTo(0, Math.round(y) + 0.5); ctx.lineTo(view.cw, Math.round(y) + 0.5); }
            ctx.stroke();
            var S = view.s * view.dpr;
            ctx.setTransform(S, 0, 0, S, view.ox * view.dpr, view.oy * view.dpr);
        }

        function text(str, x, y, opt) {
            opt = opt || {};
            ctx.font = (opt.it ? 'italic ' : '') + (opt.bold ? '600 ' : '') + (opt.size || 14) + 'px ' + FONT;
            ctx.fillStyle = opt.color || INK;
            ctx.textAlign = opt.align || 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(str, x, y);
        }
        // blandad stil: parts = [{t, it}], align 'left'|'right'|'center'
        function mixed(x, y, parts, align, size, color) {
            var w = [], tot = 0, i;
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + (parts[i].small ? size * 0.72 : size) + 'px ' + FONT;
                w[i] = ctx.measureText(parts[i].t).width;
                tot += w[i];
            }
            var cx = align === 'right' ? x - tot : align === 'center' ? x - tot / 2 : x;
            ctx.fillStyle = color || INK;
            ctx.textAlign = 'left';
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + (parts[i].small ? size * 0.72 : size) + 'px ' + FONT;
                ctx.fillText(parts[i].t, cx, y + (parts[i].small ? 4 : 0));
                cx += w[i];
            }
        }

        function drawCeiling() {
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(60, CEIL_Y);
            ctx.lineTo(W - 24, CEIL_Y);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var x = 70; x <= W - 24; x += 14) {
                ctx.moveTo(x, CEIL_Y);
                ctx.lineTo(x - 8, CEIL_Y - 8);
            }
            ctx.stroke();
        }

        function spring(x, y0, y1) {
            var N = 12, lead = 6, span = (y1 - lead) - (y0 + lead);
            ctx.strokeStyle = SPRING;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.beginPath();
            ctx.moveTo(x, y0);
            ctx.lineTo(x, y0 + lead);
            for (var i = 1; i <= N; i++) {
                var xx = (i === N) ? x : (i % 2 ? x + 9 : x - 9);
                ctx.lineTo(xx, y0 + lead + span * i / N);
            }
            ctx.lineTo(x, y1);
            ctx.stroke();
            // fästpunkt/öglor
            ctx.fillStyle = SPRING;
            ctx.beginPath();
            ctx.arc(x, y1, 2.2, 0, 2 * Math.PI);
            ctx.fill();
        }

        function block(cx, top, w, h, label, labelSide) {
            var x0 = cx - w / 2, r = 3;
            ctx.beginPath();
            ctx.moveTo(x0 + r, top);
            ctx.arcTo(x0 + w, top, x0 + w, top + h, r);
            ctx.arcTo(x0 + w, top + h, x0, top + h, r);
            ctx.arcTo(x0, top + h, x0, top, r);
            ctx.arcTo(x0, top, x0 + w, top, r);
            ctx.closePath();
            ctx.fillStyle = '#6ba3d6';
            ctx.fill();
            ctx.strokeStyle = '#2f6db0';
            ctx.lineWidth = 1.6;
            ctx.stroke();
            if (labelSide === 'right') text(label, cx + w / 2 + 6, top + h / 2 + 5, { size: 13 });
            else if (labelSide === 'below') text(label, cx, top + h + 15, { size: 13, align: 'center' });
        }

        // måttlinje (dubbelpil) i x från y1 (olastad ände) till y2 (jämvikt)
        function dimLine(x, y1, y2, xFrom, label, labelLines) {
            ctx.strokeStyle = 'rgba(31,37,48,0.45)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(xFrom, y1); ctx.lineTo(x - 4, y1);
            ctx.moveTo(xFrom, y2); ctx.lineTo(x - 4, y2);
            ctx.stroke();
            ctx.setLineDash([]);
            var len = y2 - y1;
            ctx.strokeStyle = INK;
            ctx.fillStyle = INK;
            ctx.lineWidth = 1.4;
            var hd = Math.min(7, len / 2.5);
            ctx.beginPath();
            ctx.moveTo(x, y1 + hd); ctx.lineTo(x, y2 - hd);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y1); ctx.lineTo(x - 3.4, y1 + hd); ctx.lineTo(x + 3.4, y1 + hd); ctx.closePath();
            ctx.moveTo(x, y2); ctx.lineTo(x - 3.4, y2 - hd); ctx.lineTo(x + 3.4, y2 - hd); ctx.closePath();
            ctx.fill();
            var mid = (y1 + y2) / 2;
            mixed(x - 7, mid - 3, [{ t: 'Δ', it: false }, { t: 'l', it: true }], 'right', 15, INK);
            text(label, x - 7, mid + 14, { size: 14, align: 'right' });
        }

        function render() {
            drawBackground();
            drawCeiling();
            var alfa = state === 'tom' ? 0 : Math.min(1, (state === 'hanger' ? hangT / 0.2 : 1));
            var dimAlfa = state === 'hangt' || state === 'svang' ? 1 :
                (state === 'hanger' ? Math.max(0, (hangT - HANG_S) / 0.3) : 0);

            // ── 1: en fjäder ──
            var x = XS[0], y1 = hookY(0);
            spring(x, CEIL_Y, y1);
            mixed(x + 15, (CEIL_Y + y1) / 2 + 5, [{ t: 'k', it: true }], 'left', 15, BLUE);

            // ── 2: seriekoppling (skarven mitt emellan) ──
            var xs = XS[1], y2 = hookY(1);
            var mid = (CEIL_Y + y2) / 2;
            spring(xs, CEIL_Y, mid);
            spring(xs, mid, y2);
            mixed(xs + 15, (CEIL_Y + mid) / 2 + 5, [{ t: 'k', it: true }], 'left', 15, BLUE);
            mixed(xs + 15, (mid + y2) / 2 + 5, [{ t: 'k', it: true }], 'left', 15, BLUE);

            // ── 3: parallellkoppling ──
            var xp = XS[2], y3 = hookY(2);
            spring(xp - PAR_D, CEIL_Y, y3);
            spring(xp + PAR_D, CEIL_Y, y3);
            mixed(xp - PAR_D + 13, (CEIL_Y + y3) / 2 + 5, [{ t: 'k', it: true }], 'left', 15, BLUE);
            mixed(xp + PAR_D + 13, (CEIL_Y + y3) / 2 + 5, [{ t: 'k', it: true }], 'left', 15, BLUE);
            // stången som fjädrarna bär (lätt, ritas alltid)
            ctx.fillStyle = '#8a7a62';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.fillRect(xp - PAR_D - 12, y3, 2 * PAR_D + 24, 5);
            ctx.strokeRect(xp - PAR_D - 12, y3, 2 * PAR_D + 24, 5);

            // ── vikterna ──
            if (alfa > 0) {
                ctx.globalAlpha = alfa;
                var hel = fmt(m * 1000, 0) + ' g', halv = fmt(m * 500, 0) + ' g';
                block(x, y1, 36, 30, hel, 'right');
                block(xs, y2, 36, 30, hel, 'right');
                // två vikter med halva massan, en under varje fjäder, mot stången
                block(xp - PAR_D, y3 + 5, 28, 22, halv, 'below');
                block(xp + PAR_D, y3 + 5, 28, 22, halv, 'below');
                ctx.globalAlpha = 1;
            }

            // ── förlängningen ──
            if (visaDl && dimAlfa > 0) {
                ctx.globalAlpha = dimAlfa;
                var P = pxm();
                for (var i = 0; i < 3; i++) {
                    var dx = i === 2 ? XS[2] - PAR_D - 38 : XS[i] - 36;
                    var xFrom = i === 2 ? XS[2] - PAR_D - 12 : XS[i] - 9;
                    dimLine(dx, naturY(i), naturY(i) + dl(i) * P, xFrom,
                        fmt(dl(i) * 100, 1) + ' cm');
                }
                ctx.globalAlpha = 1;
            }

            // ── namn, periodtid och antal svängningar ──
            for (var j = 0; j < 3; j++) {
                text(NAMN[j], XS[j], 386, { size: 14, align: 'center', bold: true });
                if (visaT && state === 'svang') {
                    mixed(XS[j], 405, [{ t: 'T', it: true }, { t: ' = ' + fmt(period(j), 2) + ' s', it: false }],
                        'center', 14, INK);
                    var n = Math.floor(t / period(j) + 1e-9);
                    text(n + (n === 1 ? ' svängning' : ' svängningar'), XS[j], 423,
                        { size: 13, align: 'center', color: '#4a5260' });
                }
            }
        }

        // ── Loop ─────────────────────────────────────────────────────────
        function shouldRun() {
            if (dead || !visible || document.hidden || paused) return false;
            return state === 'hanger' || state === 'svang';
        }
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.05) * (slow ? 0.25 : 1);
            if (!paused) {
                if (state === 'hanger') {
                    hangT += dt;
                    if (hangT >= HANG_S + 0.3) { state = 'hangt'; changed(); }
                } else if (state === 'svang') {
                    t += dt;
                }
            }
            render();
            if (opts.onTick) opts.onTick(api.get());
            if (shouldRun()) rafId = requestAnimationFrame(frame);
            else lastTs = 0;
        }
        function kick() {
            if (rafId || !shouldRun()) return;
            lastTs = 0;
            rafId = requestAnimationFrame(frame);
        }
        function changed() { if (opts.onState) opts.onState(api.get()); }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (e) {
                visible = e[0].isIntersecting;
                kick();
            }, { threshold: 0.05 }).observe(canvas);
        }
        document.addEventListener('visibilitychange', kick);
        window.addEventListener('resize', resize);

        var api = {
            hang: function () {
                if (state !== 'tom') return;
                state = 'hanger'; hangT = 0; paused = false;
                changed(); kick();
            },
            svang: function () {
                if (state !== 'hangt' && state !== 'svang') return;
                state = 'svang'; t = 0; paused = false;
                changed(); render(); kick();
            },
            reset: function () {
                state = 'tom'; t = 0; hangT = 0; paused = false;
                changed(); render();
            },
            paus: function (p) {
                paused = p == null ? !paused : !!p;
                changed();
                if (!paused) kick(); else render();
            },
            slow: function (s) { slow = !!s; changed(); kick(); },
            set: function (p) {
                if (p.m != null) m = p.m;
                if (p.k != null) k = p.k;
                // nya värden: stå stilla i det nya jämviktsläget
                if (state === 'svang') { state = 'hangt'; t = 0; paused = false; }
                if (state === 'hanger') { state = 'hangt'; }
                changed(); render();
            },
            visa: function (v) {
                if (v.dl != null) visaDl = !!v.dl;
                if (v.T != null) visaT = !!v.T;
                render();
            },
            get: function () {
                return { state: state, t: t, paused: paused, slow: slow, m: m, k: k,
                         kR: [kR(0), kR(1), kR(2)], dl: [dl(0), dl(1), dl(2)],
                         T: [period(0), period(1), period(2)] };
            },
            resize: resize,
            render: render,
            destroy: function () {
                dead = true;
                if (rafId) cancelAnimationFrame(rafId);
                rafId = 0;
                window.removeEventListener('resize', resize);
                document.removeEventListener('visibilitychange', kick);
            },
            // test-handtag: frys svängningen vid tiden tt
            _frys: function (tt) {
                if (state === 'tom' || state === 'hanger') state = 'hangt';
                state = 'svang'; t = tt; paused = true; changed(); render();
            }
        };
        resize();
        return api;
    }

    // ── Minisimuleringen i teorin ────────────────────────────────────────
    var ICON_EXPAND =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
    var ICON_COMPRESS =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';

    function mount(node, cfg) {
        cfg = cfg || {};
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var ti = document.createElement('div');
            ti.className = 'minisim-title';
            ti.textContent = cfg.titel;
            card.appendChild(ti);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Tre upphängningar bredvid varandra med likadana fjädrar: en ensam fjäder, ' +
            'två seriekopplade fjädrar och två parallellkopplade fjädrar som bär en stång. ' +
            'Häng i vikterna så hänger 100 gram i varje upphängning, och förlängningen ' +
            'markeras: seriekopplingen förlängs dubbelt så mycket som den ensamma fjädern ' +
            'och parallellkopplingen hälften så mycket. Sätt dem i svängning för att se att ' +
            'seriekopplingen svänger långsammast och parallellkopplingen snabbast.');
        scene.appendChild(canvas);
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        function btn(txt, primar) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (primar ? ' ms-primar' : '');
            b.textContent = txt;
            return b;
        }
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var hangBtn = btn('Häng i vikterna', true);
        var svangBtn = btn('Sätt i svängning', false);
        var pausBtn = btn('Pausa', false);
        // "Häng i vikterna" blir "Ta bort vikterna" när vikterna hänger i,
        // och tar då tillbaka scenen till bara fjädrarna.
        [hangBtn, svangBtn, pausBtn].forEach(function (b) { controls.appendChild(b); });
        card.appendChild(controls);

        var row2 = document.createElement('div');
        row2.className = 'minisim-controls';
        var lbl = document.createElement('label');
        lbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        lbl.appendChild(slowCb);
        lbl.appendChild(document.createTextNode('Ultrarapid'));
        row2.appendChild(lbl);
        var info = document.createElement('span');
        info.className = 'minisim-info';
        row2.appendChild(info);
        card.appendChild(row2);
        node.appendChild(card);

        function sync(s) {
            hangBtn.textContent = s.state === 'tom' ? 'Häng i vikterna' : 'Ta bort vikterna';
            svangBtn.disabled = s.state === 'tom' || s.state === 'hanger';
            svangBtn.className = 'minisim-btn' + (s.state === 'hangt' ? ' ms-primar' : '');
            hangBtn.className = 'minisim-btn' + (s.state === 'tom' ? ' ms-primar' : '');
            pausBtn.disabled = s.state !== 'svang';
            pausBtn.textContent = s.paused ? 'Fortsätt' : 'Pausa';
            info.textContent = s.state === 'svang'
                ? 'Tid: ' + fmt(s.t, 1) + ' s'
                : (s.state === 'tom' ? 'Alla fjädrar har k = ' + fmt(s.k, 0) + ' N/m.'
                                     : 'Samma massa, ' + fmt(s.m * 1000, 0) + ' g, i varje upphängning.');
        }
        var lastInfo = 0;
        var mot = motor(canvas, {
            m: 0.1, k: 10,
            onState: sync,
            onTick: function (s) {
                var now = Date.now();
                if (now - lastInfo > 90) { lastInfo = now; sync(s); }
            }
        });
        hangBtn.addEventListener('click', function () {
            if (mot.get().state === 'tom') mot.hang(); else mot.reset();
        });
        svangBtn.addEventListener('click', function () { mot.svang(); });
        pausBtn.addEventListener('click', function () { mot.paus(); });
        slowCb.addEventListener('change', function () { mot.slow(slowCb.checked); });

        function isFs() {
            return document.fullscreenElement === card || document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            else (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        });
        function onFs() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            mot.resize();
        }
        document.addEventListener('fullscreenchange', onFs);
        document.addEventListener('webkitfullscreenchange', onFs);

        card._motor = mot;            // test-handtag för skärmdumpsskript
        sync(mot.get());
        return mot;
    }

    window.FYSIKKOPPLADEFJADRAR = { motor: motor, mount: mount, W: W, H: H };
})();
