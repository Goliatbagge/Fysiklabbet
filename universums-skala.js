/* universums-skala.js — Universums skala, från plancklängden till hela det
 * observerbara universum.
 *
 * Laddas lazy av minisim.js (typ: universumsskala) och bäddas in i
 * genomgången fy1-1.1 (Fysik som ämne):
 *
 *   ::: minisim
 *   typ: universumsskala
 *   :::
 *
 * MODELL
 * Bilden visar hela tiden ett fönster som är V meter brett. Zoomnivån hålls
 * som z = lg V, från ZMIN (plancklängden fyller bilden) till ZMAX (hela det
 * observerbara universum ryms). Varje föremål är ett lager med sin verkliga
 * storlek s (meter) och sitt läge (meter, y uppåt) i förhållande till
 * bildens mittpunkt. Lagret ritas med diametern s/V · bredd och tonas in och
 * ut efter hur stort det är i bild (fin/fout i lg(d/bredd)) eller efter z
 * (zon), så att nästa lager tar över när man zoomar. Allt ritas med kod
 * (canvas); de tunga bilderna (galaxer, jordklotet, cellen …) ritas en gång
 * till en sprite första gången de behövs.
 *
 * Bildens mittpunkt är alltid samma punkt: en kvark i en proton i en kolkärna
 * i en kolatom i en DNA-molekyl i en hudcell på fingertoppen hos en människa
 * som står på jorden. Kedjan följer verkligheten: jorden går runt solen (som
 * ligger 1 AU åt vänster), solen ligger 26 000 ljusår från Vintergatans mitt
 * och så vidare. Föremål som ställs bredvid för att jämföra storlekar
 * (viruset, myran, Eiffeltornet, solen bredvid jorden …) har jmf: true, och
 * informationsrutan säger att de är jämförelser och inte har sitt verkliga
 * läge.
 *
 * Den aktuella skalan syns hela tiden: bildens bredd som tiopotens uppe till
 * höger, en skalstock nere till vänster och en markör på linjalen under
 * bilden. Linjalen går att dra i; i bilden zoomar mushjulet (efter ett klick
 * i bilden, så att sidan går att skrolla förbi), lodrät dragning med musen
 * och nypning med två fingrar.
 *
 * Mörk scen trots laboranstemat: rymden och mikrovärldens glöd motiverar det
 * (samma undantag som tomteblosset). Vid människans skala är himlen blå.
 */
(function () {
    'use strict';
    if (window.FYSIKUNIVERSUMSSKALA) return;

    var NB = ' ', MINUS = '−';
    var LY = 9.461e15, AU = 1.496e11, RJ = 6.371e6;
    var ZMIN = -34.6, ZMAX = 27.4, ZSTART = 0.58;
    var FONT = 'Poppins, "DM Sans", system-ui, sans-serif';
    var TAU = Math.PI * 2;

    // ── Hjälpfunktioner ─────────────────────────────────────────────────
    function lg(x) { return Math.log(x) / Math.LN10; }
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
    function frac(x) { return x - Math.floor(x); }
    function rng(seed) {
        var s = seed >>> 0;
        return function () {
            s = (s + 0x6D2B79F5) >>> 0;
            var t = s;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    function gauss(R) { var u = R() || 1e-9, v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
    function hexRgb(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
    function blanda(a, b, t) {
        return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
    }

    // ── Tal på svenska ──────────────────────────────────────────────────
    function grupp(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, NB); }
    function fmt(x) {                       // två värdesiffror, decimalkomma
        if (!(x > 0)) return '0';
        var e = Math.floor(lg(x));
        var p = Math.pow(10, e - 1);
        var r = Math.round(x / p) * p;
        if (r >= Math.pow(10, e + 1) * 0.9999) e++;
        var dec = Math.max(0, 1 - e);
        var s = r.toFixed(dec);
        if (parseFloat(s) === 0) return '0';
        var del = s.split('.');
        return del[1] !== undefined ? grupp(del[0]) + ',' + del[1] : grupp(del[0]);
    }
    function exp(e) { return e < 0 ? MINUS + (-e) : String(e); }
    function potens(V) {
        var e = Math.floor(lg(V) + 1e-9);
        var ms = fmt(V / Math.pow(10, e));
        if (ms === '10') { e++; ms = '1'; }
        return { e: e, m: ms };
    }
    function talHtml(V) {                   // bildens bredd i huvudavläsningen
        if (V >= 1 && V < 1000) return fmt(V) + NB + 'm';
        var p = potens(V);
        return (p.m === '1' ? '' : p.m + NB + '·' + NB) + '10<sup>' + exp(p.e) + '</sup>' + NB + 'm';
    }
    function ljusar(ly, kort) {
        if (ly < 1e6) return fmt(ly) + NB + 'ljusår';
        if (ly < 1e9) { var m = fmt(ly / 1e6); return m + NB + (m === '1' ? 'miljon' : 'miljoner') + ' ljusår'; }
        var g = fmt(ly / 1e9); return g + NB + (g === '1' ? 'miljard' : 'miljarder') + ' ljusår';
    }
    function km(x) {                        // x i kilometer
        if (x < 1e6) return fmt(x) + NB + 'km';
        if (x < 1e9) { var m = fmt(x / 1e6); return m + NB + (m === '1' ? 'miljon' : 'miljoner') + ' km'; }
        var g = fmt(x / 1e9); return g + NB + (g === '1' ? 'miljard' : 'miljarder') + ' km';
    }
    function iOrd(V) {                      // bildens bredd i ord
        if (V < 1e-19) return 'mindre än något som har mätts';
        if (V < 1e-15) return 'cirka ' + fmt(V / 1e-18) + ' attometer';
        if (V < 1e-12) return 'cirka ' + fmt(V / 1e-15) + ' femtometer';
        if (V < 1e-9) return 'cirka ' + fmt(V / 1e-12) + ' pikometer';
        if (V < 1e-6) return 'cirka ' + fmt(V / 1e-9) + ' nanometer';
        if (V < 1e-3) return 'cirka ' + fmt(V / 1e-6) + ' mikrometer';
        if (V < 1e-2) return 'cirka ' + fmt(V / 1e-3) + ' millimeter';
        if (V < 1) return 'cirka ' + fmt(V / 1e-2) + ' centimeter';
        if (V < 1e3) return 'cirka ' + fmt(V) + ' meter';
        if (V < 1e15) return 'cirka ' + km(V / 1e3);
        return 'cirka ' + ljusar(V / LY);
    }
    function snyggt(x) {                    // 1, 2 eller 5 gånger en tiopotens
        var e = Math.floor(lg(x)), m = x / Math.pow(10, e);
        var n = m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10;
        return n * Math.pow(10, e);
    }
    function skalstock(V) {                 // { L (meter), text }
        if (V >= 3e16) {
            var ly = snyggt(0.2 * V / LY);
            return { L: ly * LY, text: ljusar(ly) };
        }
        var L = snyggt(0.2 * V), t;
        var pref = [[1e-15, 1e-18, 'am'], [1e-12, 1e-15, 'fm'], [1e-9, 1e-12, 'pm'], [1e-6, 1e-9, 'nm'],
                    [1e-3, 1e-6, 'µm'], [1e-2, 1e-3, 'mm'], [1, 1e-2, 'cm'], [1e3, 1, 'm']];
        if (L < 1e-18 * 0.999) {
            var p = potens(L);
            t = (p.m === '1' ? '' : p.m + NB + '·' + NB) + '10^{' + exp(p.e) + '}' + NB + 'm';
        } else if (L < 1e3 * 0.999) {
            for (var i = 0; i < pref.length; i++) if (L < pref[i][0] * 0.999) { t = fmt(L / pref[i][1]) + NB + pref[i][2]; break; }
        } else t = km(L / 1e3);
        return { L: L, text: t };
    }

    // ── Text med upphöjda delar på canvas ("10^{−35} m") ─────────────────
    function delar(str) {
        var out = [], re = /\^\{([^}]*)\}/g, last = 0, m;
        while ((m = re.exec(str))) {
            if (m.index > last) out.push({ t: str.slice(last, m.index) });
            out.push({ t: m[1], sup: true });
            last = re.lastIndex;
        }
        if (last < str.length) out.push({ t: str.slice(last) });
        return out;
    }
    function richHtml(str) {
        return str.replace(/\^\{([^}]*)\}/g, function (_, x) { return '<sup>' + x + '</sup>'; });
    }
    function richBredd(c, str, px, vikt) {
        var d = delar(str), w = 0;
        for (var i = 0; i < d.length; i++) {
            c.font = (vikt || 400) + ' ' + (d[i].sup ? px * 0.68 : px) + 'px ' + FONT;
            w += c.measureText(d[i].t).width;
        }
        return w;
    }
    function richText(c, str, x, y, px, vikt, align) {
        var d = delar(str), w = richBredd(c, str, px, vikt);
        var x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
        c.textAlign = 'left';
        c.textBaseline = 'alphabetic';
        for (var i = 0; i < d.length; i++) {
            c.font = (vikt || 400) + ' ' + (d[i].sup ? px * 0.68 : px) + 'px ' + FONT;
            c.fillText(d[i].t, x0, d[i].sup ? y - px * 0.42 : y);
            x0 += c.measureText(d[i].t).width;
        }
        return w;
    }

    // ── Sprites ─────────────────────────────────────────────────────────
    var SPR = {};
    function sprite(namn, w, h, fn) {
        if (SPR[namn]) return SPR[namn];
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        fn(cv.getContext('2d'), w, h);
        SPR[namn] = cv;
        return cv;
    }
    function glowSpr(col) {
        return sprite('g' + col.join(','), 128, 128, function (g) {
            var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
            gr.addColorStop(0, rgba(col, 1));
            gr.addColorStop(0.22, rgba(col, 0.5));
            gr.addColorStop(0.55, rgba(col, 0.12));
            gr.addColorStop(1, rgba(col, 0));
            g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
        });
    }
    function ringSpr(col) {
        return sprite('r' + col.join(','), 128, 128, function (g) {
            var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
            gr.addColorStop(0, rgba(col, 0));
            gr.addColorStop(0.5, rgba(col, 0.06));
            gr.addColorStop(0.8, rgba(col, 0.9));
            gr.addColorStop(0.9, rgba(col, 0.35));
            gr.addColorStop(1, rgba(col, 0));
            g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
        });
    }
    function ballSpr(lys, mitt, mork) {
        return sprite('b' + lys + mitt + mork, 128, 128, function (g) {
            var gr = g.createRadialGradient(46, 42, 3, 64, 64, 64);
            gr.addColorStop(0, lys); gr.addColorStop(0.45, mitt); gr.addColorStop(1, mork);
            g.fillStyle = gr; g.beginPath(); g.arc(64, 64, 63, 0, TAU); g.fill();
        });
    }
    // drawImage som beskär källan när bilden är mycket större än duken
    function bild(c, spr, x, y, w, h) {
        h = h || w;
        var W = c._W, H = c._H, x0 = x - w / 2, y0 = y - h / 2;
        if (w < 0.3 || x0 > W || y0 > H || x0 + w < 0 || y0 + h < 0) return;
        if (w < 3 * W && h < 3 * H) { c.drawImage(spr, x0, y0, w, h); return; }
        var sw = spr.width, sh = spr.height;
        var dx0 = Math.max(0, x0), dy0 = Math.max(0, y0), dx1 = Math.min(W, x0 + w), dy1 = Math.min(H, y0 + h);
        var sx0 = (dx0 - x0) / w * sw, sy0 = (dy0 - y0) / h * sh;
        var sx1 = (dx1 - x0) / w * sw, sy1 = (dy1 - y0) / h * sh;
        c.drawImage(spr, sx0, sy0, Math.max(sx1 - sx0, 0.02), Math.max(sy1 - sy0, 0.02), dx0, dy0, dx1 - dx0, dy1 - dy0);
    }
    function synlig(L, x, y, r) { return x + r > -2 && x - r < L.W + 2 && y + r > -2 && y - r < L.H + 2; }
    function lager(c) { c.globalCompositeOperation = 'lighter'; }
    function vanlig(c) { c.globalCompositeOperation = 'source-over'; }
    // Ritar i meter med y uppåt (bara för lager där skalan är rimlig, k < 1e9)
    function metrisk(c, L) { c.save(); c.translate(L.x, L.y); c.scale(L.k, -L.k); }

    // ═══════════════════════════════════════════════════════════════════
    // LÄGEN I KEDJAN (meter, y uppåt, i förhållande till bildens mittpunkt)
    // ═══════════════════════════════════════════════════════════════════
    var SP = 1.7e-15;                                       // protonens diameter
    var QREL = [[0, 0.24], [-0.21, -0.12], [0.21, -0.12]];  // kvarkarna, i protondiametrar
    var QF = [[255, 59, 92], [43, 230, 120], [70, 140, 255]];
    var QBALL = [['#ffd0da', '#ff3b5c', '#6a0018'], ['#d0ffe4', '#2be678', '#005a2a'], ['#d8e6ff', '#468cff', '#0a2466']];
    var POFF = [0, -0.24 * SP];                             // protonens mitt
    var NUK = (function () {                                // kolkärnan: tolv nukleoner i en ikosaeder
        var f = (1 + Math.sqrt(5)) / 2, n = Math.sqrt(1 + f * f), RI = 1.62e-15;
        var v = [[0, 1, f], [0, -1, f], [0, 1, -f], [0, -1, -f], [1, f, 0], [-1, f, 0], [1, -f, 0], [-1, -f, 0],
                 [f, 0, 1], [-f, 0, 1], [f, 0, -1], [-f, 0, -1]];
        var a = 0.55, b = 0.35, out = [];
        for (var i = 0; i < v.length; i++) {
            var x = v[i][0] / n, y = v[i][1] / n, z = v[i][2] / n;
            var y1 = y * Math.cos(a) - z * Math.sin(a), z1 = y * Math.sin(a) + z * Math.cos(a);
            var x2 = x * Math.cos(b) + z1 * Math.sin(b), z2 = -x * Math.sin(b) + z1 * Math.cos(b);
            out.push({ x: x2 * RI, y: y1 * RI, z: z2 * RI, typ: i % 2 ? 'n' : 'p', ph: i * 1.7 });
        }
        var bast = null;
        out.forEach(function (o) { if (o.typ === 'p' && (!bast || o.z > bast.z)) bast = o; });
        bast.mitt = true;
        out.sort(function (p, q) { return p.z - q.z; });
        out.mittX = bast.x; out.mittY = bast.y;
        return out;
    })();
    var NOFF = [POFF[0] - NUK.mittX, POFF[1] - NUK.mittY]; // kärnans (och atomens) mitt
    var E = [0, -1.25 - RJ];                                // jordens mitt (marken ligger 1,25 m under fingret)
    var S = [E[0] - AU, E[1]];                              // solen, på riktigt avstånd
    var G = [S[0] - 1.5e20, S[1] + 1.95e20];                // Vintergatans mitt, 26 000 ljusår bort
    var ANDR = [G[0] + 2.2e22, G[1] + 0.9e22];
    var M33 = [G[0] + 2.4e22, G[1] - 1.05e22];
    var VIRGO = [G[0] - 4.4e23, G[1] + 2.2e23];
    var LANI = [G[0] + 1.7e24, G[1] - 1.75e24];
    var PERSON = [-0.75, -1.25];                            // människans fötter

    // ═══════════════════════════════════════════════════════════════════
    // RITFUNKTIONER, från det minsta till det största
    // ═══════════════════════════════════════════════════════════════════

    // ── Plancklängden: kvantskum ───────────────────────────────────────
    var SKUM = null, SKUMF = [[190, 90, 255], [60, 220, 255], [255, 70, 200]];
    function ritaPlanck(c, L) {
        if (!SKUM) {
            var R = rng(7); SKUM = [];
            for (var i = -26; i <= 26; i++) for (var j = -26; j <= 26; j++)
                SKUM.push({ x: (i + R() - 0.5) * 1.3, y: (j + R() - 0.5) * 1.3, r: 0.4 + R() * 0.8, p: R() * TAU, f: 0.7 + R() * 1.6, h: (R() * 3) | 0 });
        }
        var lp = 1.616e-35 * L.k, a = L.a;
        lager(c);
        c.globalAlpha = a * 0.5;
        bild(c, glowSpr([120, 40, 220]), L.cx, L.cy, Math.max(L.W, L.H) * 1.3);
        for (var n = 0; n < SKUM.length; n++) {
            var p = SKUM[n];
            var x = L.cx + p.x * lp, y = L.cy - p.y * lp;
            var r = p.r * lp * (0.8 + 0.3 * Math.sin(L.t * p.f + p.p));
            if (r < 0.7 || !synlig(L, x, y, r)) continue;
            c.globalAlpha = a * (0.55 + 0.35 * Math.sin(L.t * p.f * 1.7 + p.p * 3));
            bild(c, ringSpr(SKUMF[p.h]), x, y, 2 * r);
        }
        vanlig(c);
        if (lp > 24) {                        // måttstock med plancklängden
            var y0 = Math.min(L.cy + lp * 0.75 + 30, L.H - 46);
            c.globalAlpha = a;
            c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 2;
            c.beginPath();
            c.moveTo(L.cx - lp / 2, y0); c.lineTo(L.cx + lp / 2, y0);
            c.moveTo(L.cx - lp / 2, y0 - 7); c.lineTo(L.cx - lp / 2, y0 + 7);
            c.moveTo(L.cx + lp / 2, y0 - 7); c.lineTo(L.cx + lp / 2, y0 + 7);
            c.stroke();
            c.fillStyle = '#ffffff';
            richText(c, 'Plancklängden, 1,6' + NB + '·' + NB + '10^{' + MINUS + '35}' + NB + 'm', L.cx, y0 + 24, 14, 600, 'center');
        }
    }

    // ── Okänt område: tunnel av damm och virtuella partikelpar ─────────
    var DAMM = null, PAR = null;
    function ritaOkant(c, L) {
        var R, i;
        if (!DAMM) {
            R = rng(21); DAMM = []; PAR = [];
            for (i = 0; i < 200; i++) DAMM.push({ th: R() * TAU, b: R(), s: 0.8 + R() * 1.8, col: SKUMF[(R() * 3) | 0] });
            for (i = 0; i < 18; i++) PAR.push({ x: 0.08 + R() * 0.84, y: 0.1 + R() * 0.8, per: 2.2 + R() * 2.5, ph: R(), ang: R() * TAU, col: (R() * 3) | 0 });
        }
        var a = L.a, W = L.W, H = L.H, M = Math.max(W, H);
        lager(c);
        var moln = [[[120, 40, 220], 0.3, 0.35, 0.55], [[220, 40, 160], 0.72, 0.6, 0.5], [[40, 90, 230], 0.5, 0.82, 0.6], [[90, 30, 180], 0.18, 0.75, 0.45]];
        for (i = 0; i < moln.length; i++) {
            var m = moln[i];
            c.globalAlpha = a * 0.22;
            bild(c, glowSpr(m[0]), (m[1] + 0.06 * Math.sin(L.t * 0.07 + i * 2)) * W, (m[2] + 0.05 * Math.cos(L.t * 0.05 + i)) * H, m[3] * M * 2);
        }
        var Rm = 0.75 * Math.hypot(W, H);
        for (i = 0; i < DAMM.length; i++) {
            var p = DAMM[i];
            var u = frac(p.b - L.z / 2);
            var r = Rm * Math.pow(10, 2 * u - 2);
            var al = a * Math.sin(Math.PI * u) * 0.8;
            c.fillStyle = rgba(p.col, al);
            var sz = p.s * (0.8 + 1.6 * u);
            c.fillRect(L.cx + Math.cos(p.th) * r - sz / 2, L.cy + Math.sin(p.th) * r - sz / 2, sz, sz);
        }
        for (i = 0; i < PAR.length; i++) {
            var q = PAR[i], ph = frac(L.t / q.per + q.ph);
            if (ph > 0.66) continue;
            var x = q.x * W, y = q.y * H;
            if (ph < 0.6) {
                var sep = Math.sin(ph / 0.6 * Math.PI) * 26;
                var dx = Math.cos(q.ang) * sep, dy = Math.sin(q.ang) * sep;
                c.globalAlpha = a * 0.9;
                bild(c, glowSpr(SKUMF[q.col]), x + dx, y + dy, 12);
                bild(c, glowSpr(SKUMF[(q.col + 1) % 3]), x - dx, y - dy, 12);
            } else {
                c.globalAlpha = a * (1 - (ph - 0.6) / 0.06);
                bild(c, glowSpr([255, 255, 255]), x, y, 34);
            }
        }
        vanlig(c);
    }

    // ── Kvarken ────────────────────────────────────────────────────────
    function ritaKvark(c, L) {
        var a = L.a, x = L.x, y = L.y, i, j;
        lager(c);
        c.lineWidth = 1.6;
        for (i = 0; i < 6; i++) {
            var vinkel = i * TAU / 6 + L.t * 0.12;
            var len = 0.48 * Math.max(L.W, L.H);
            c.strokeStyle = rgba(i % 2 ? QF[1] : QF[2], 0.22 * a);
            c.beginPath();
            for (j = 0; j <= 50; j++) {
                var f = j / 50, w = Math.sin(f * 18 - L.t * 5 + i) * 7 * f;
                var px = x + Math.cos(vinkel) * (30 + f * len) - Math.sin(vinkel) * w;
                var py = y + Math.sin(vinkel) * (30 + f * len) + Math.cos(vinkel) * w;
                if (j === 0) c.moveTo(px, py); else c.lineTo(px, py);
            }
            c.stroke();
        }
        var puls = 1 + 0.06 * Math.sin(L.t * 3);
        c.globalAlpha = a;
        bild(c, glowSpr(QF[0]), x, y, 60 * puls);
        bild(c, glowSpr([255, 140, 160]), x, y, 140 * puls);
        vanlig(c);
        bild(c, ballSpr(QBALL[0][0], QBALL[0][1], QBALL[0][2]), x, y, 24);
        if (L.d > 34) {
            c.setLineDash([6, 6]);
            c.strokeStyle = 'rgba(255,255,255,' + (0.55 * a) + ')';
            c.lineWidth = 1.5;
            c.beginPath(); c.arc(x, y, L.d / 2, 0, TAU); c.stroke();
            c.setLineDash([]);
        }
    }

    // ── Protonen ───────────────────────────────────────────────────────
    var HAV = null;
    function fjader(c, p0, p1, amp, n, t, c0, c1) {
        var dx = p1[0] - p0[0], dy = p1[1] - p0[1], len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len, ny = dx / len;
        var gr = c.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
        gr.addColorStop(0, c0); gr.addColorStop(1, c1);
        c.strokeStyle = gr;
        c.beginPath();
        for (var i = 0; i <= 70; i++) {
            var f = i / 70, w = Math.sin(f * n * TAU - t * 6) * amp * Math.sin(f * Math.PI);
            var x = p0[0] + dx * f + nx * w, y = p0[1] + dy * f + ny * w;
            if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.stroke();
    }
    function ritaProton(c, L) {
        if (!HAV) {
            var R = rng(31); HAV = [];
            for (var n = 0; n < 34; n++) HAV.push({ r: Math.sqrt(R()) * 0.42, th: R() * TAU, per: 1.2 + R() * 2, ph: R(), col: (R() * 3) | 0, ang: R() * TAU });
        }
        var d = L.d, a = L.a, i;
        var q = QREL.map(function (v) { return [L.x + v[0] * d, L.y - v[1] * d]; });
        lager(c);
        c.globalAlpha = a * 0.85; bild(c, glowSpr([255, 110, 70]), L.x, L.y, d * 1.55);
        c.globalAlpha = a * 0.55; bild(c, glowSpr([200, 60, 255]), L.x, L.y, d * 1.05);
        vanlig(c);
        c.globalAlpha = a * 0.85;
        c.lineWidth = Math.max(1.3, Math.min(4, d * 0.004));
        var par = [[0, 1], [1, 2], [2, 0]];
        for (i = 0; i < 3; i++) {
            var A = par[i][0], B = par[i][1];
            fjader(c, q[A], q[B], d * 0.03, 8, L.t + i, rgba(QF[A], 0.9), rgba(QF[B], 0.9));
        }
        lager(c);
        for (i = 0; i < HAV.length; i++) {
            var h = HAV[i], ph = frac(L.t / h.per + h.ph);
            if (ph > 0.5) continue;
            var al = Math.sin(ph / 0.5 * Math.PI), x = L.x + Math.cos(h.th) * h.r * d, y = L.y + Math.sin(h.th) * h.r * d;
            var sep = 0.02 * d * al, s = Math.max(4, d * 0.02);
            c.globalAlpha = a * al;
            bild(c, glowSpr(QF[h.col]), x + Math.cos(h.ang) * sep, y + Math.sin(h.ang) * sep, s);
            bild(c, glowSpr(QF[(h.col + 1) % 3]), x - Math.cos(h.ang) * sep, y - Math.sin(h.ang) * sep, s);
        }
        var gq = Math.min(0.11 * d, 30), kq = Math.min(0.045 * d, 12);
        c.globalAlpha = a;
        for (i = 0; i < 3; i++) bild(c, glowSpr(QF[i]), q[i][0], q[i][1], gq * 2);
        vanlig(c);
        for (i = 0; i < 3; i++) bild(c, ballSpr(QBALL[i][0], QBALL[i][1], QBALL[i][2]), q[i][0], q[i][1], kq * 2);
        if (d > 260) {
            c.fillStyle = '#ffffff';
            c.font = '600 15px ' + FONT;
            c.textAlign = 'center'; c.textBaseline = 'middle';
            var bok = ['u', 'u', 'd'];
            for (i = 0; i < 3; i++) c.fillText(bok[i], q[i][0], q[i][1] + kq + 14);
        }
    }

    // ── Kolkärnan ──────────────────────────────────────────────────────
    function ritaKarna(c, L) {
        var k = L.k, rp = 0.52 * SP * k, a = L.a;
        lager(c);
        c.globalAlpha = a * 0.6; bild(c, glowSpr([255, 140, 60]), L.x, L.y, L.d * 1.8);
        vanlig(c);
        var pb = ballSpr('#ffb0b0', '#ff3355', '#4a0014'), nb = ballSpr('#c4ddff', '#3d7bff', '#081a4d');
        for (var i = 0; i < NUK.length; i++) {
            var n = NUK[i];
            var j = n.mitt ? 0 : 0.035 * SP * Math.sin(L.t * 5 + n.ph);
            var x = L.x + (n.x + j) * k, y = L.y - (n.y + j * 0.7) * k;
            c.globalAlpha = a;
            bild(c, n.typ === 'p' ? pb : nb, x, y, 2 * rp);
            var djup = (1 - (n.z / 1.62e-15 + 1) / 2) * 0.55;
            if (djup > 0.02) {
                c.fillStyle = 'rgba(8,0,20,' + djup * a + ')';
                c.beginPath(); c.arc(x, y, rp, 0, TAU); c.fill();
            }
        }
    }

    // ── Kolatomen: elektronmolnet ──────────────────────────────────────
    var ATOMPKT = null;
    function atomSpr() {
        return sprite('atom', 512, 512, function (g, n) {
            var c = n / 2, R = n / 2, i;
            g.globalCompositeOperation = 'lighter';
            var gr = g.createRadialGradient(c, c, 0, c, c, R);
            gr.addColorStop(0, 'rgba(120,210,255,0.5)'); gr.addColorStop(0.15, 'rgba(90,170,255,0.32)');
            gr.addColorStop(0.35, 'rgba(80,120,255,0.2)'); gr.addColorStop(0.65, 'rgba(120,80,255,0.1)');
            gr.addColorStop(0.88, 'rgba(160,60,255,0.04)'); gr.addColorStop(1, 'rgba(160,60,255,0)');
            g.fillStyle = gr; g.beginPath(); g.arc(c, c, R, 0, TAU); g.fill();
            var vinklar = [0, Math.PI / 2, Math.PI / 4];
            for (i = 0; i < 3; i++) for (var s = -1; s <= 1; s += 2) {
                g.save();
                g.translate(c + s * 0.34 * R * Math.cos(vinklar[i]), c + s * 0.34 * R * Math.sin(vinklar[i]));
                g.rotate(vinklar[i]); g.scale(1, i === 2 ? 0.45 : 0.68);
                var lg2 = g.createRadialGradient(0, 0, 0, 0, 0, 0.3 * R);
                lg2.addColorStop(0, 'rgba(70,210,255,0.2)'); lg2.addColorStop(1, 'rgba(70,210,255,0)');
                g.fillStyle = lg2; g.beginPath(); g.arc(0, 0, 0.3 * R, 0, TAU); g.fill();
                g.restore();
            }
            var kg = g.createRadialGradient(c, c, 0, c, c, 0.17 * R);
            kg.addColorStop(0, 'rgba(225,250,255,0.95)'); kg.addColorStop(0.4, 'rgba(140,220,255,0.55)'); kg.addColorStop(1, 'rgba(80,160,255,0)');
            g.fillStyle = kg; g.beginPath(); g.arc(c, c, 0.17 * R, 0, TAU); g.fill();
            var Rr = rng(5); ATOMPKT = [];
            for (i = 0; i < 2600; i++) {
                var r = Rr() < 0.25 ? -Math.log(Rr() + 1e-6) * 0.06 : 0.18 + Math.abs(gauss(Rr)) * 0.3;
                if (r > 0.98) continue;
                var th = Rr() * TAU;
                ATOMPKT.push([Math.cos(th) * r, Math.sin(th) * r]);
                g.fillStyle = 'rgba(200,235,255,0.22)';
                g.fillRect(c + Math.cos(th) * r * R, c + Math.sin(th) * r * R, 1.3, 1.3);
            }
        });
    }
    function ritaAtom(c, L) {
        var a = L.a, R = L.d / 2;
        lager(c);
        c.globalAlpha = a * 0.72 * (1 - 0.75 * smooth(0.6, 2.2, lg(L.d / L.W)));
        bild(c, atomSpr(), L.x, L.y, L.d);
        c.globalAlpha = a;
        if (ATOMPKT && R < 6 * L.W) {
            for (var i = 0; i < 30; i++) {
                var p = ATOMPKT[(Math.random() * ATOMPKT.length) | 0];
                c.globalAlpha = a * (0.4 + Math.random() * 0.6);
                bild(c, glowSpr([170, 230, 255]), L.x + p[0] * R, L.y + p[1] * R, 7);
            }
        }
        c.globalAlpha = a;
        bild(c, glowSpr([255, 200, 120]), L.x, L.y, 16);
        vanlig(c);
        c.fillStyle = 'rgba(255,255,255,' + a + ')';
        c.fillRect(L.x - 1, L.y - 1, 2, 2);
    }

    // ── Atomer i en DNA-molekyl ────────────────────────────────────────
    var MOL = null;
    var ELF = {
        C: ['#e6ebf5', '#8f9bb3', '#262d3d', 1.1e-10], O: ['#ffd0d0', '#ff3b3b', '#5a0808', 1.0e-10],
        N: ['#d6e2ff', '#4a7dff', '#0b1d60', 1.05e-10], H: ['#ffffff', '#e2e2ec', '#7a7a92', 0.7e-10],
        P: ['#ffe2b8', '#ff9d1a', '#5e2f00', 1.25e-10]
    };
    function byggMolekyl() {
        var R = rng(44), at = [{ x: 0, y: 0, z: 0, el: 'C', b: 0 }];
        var val = ['C', 'C', 'C', 'C', 'C', 'O', 'O', 'O', 'N', 'N', 'N', 'H', 'H', 'H', 'P'];
        var tries = 0;
        while (at.length < 26 && tries++ < 2000) {
            var p = at[(R() * at.length) | 0];
            if (p.b >= 3 || p.el === 'H') continue;
            var u = R() * 2 - 1, th = R() * TAU, s = Math.sqrt(1 - u * u);
            var bl = 1.45e-10 + R() * 0.15e-10;
            var q = { x: p.x + s * Math.cos(th) * bl, y: p.y + s * Math.sin(th) * bl, z: p.z + u * bl, el: val[(R() * val.length) | 0], b: 1 };
            if (q.el === 'H') { q.x = p.x + (q.x - p.x) * 0.75; q.y = p.y + (q.y - p.y) * 0.75; q.z = p.z + (q.z - p.z) * 0.75; }
            var ok = true;
            for (var i = 0; i < at.length; i++) if (at[i] !== p && Math.hypot(at[i].x - q.x, at[i].y - q.y, at[i].z - q.z) < 1.25e-10) { ok = false; break; }
            if (!ok) continue;
            p.b++; at.push(q);
        }
        at.sort(function (p, q) { return p.z - q.z; });
        return at;
    }
    function ritaMolekyl(c, L) {
        if (!MOL) MOL = byggMolekyl();
        var k = L.k, a = L.a;
        lager(c);
        c.globalAlpha = a * 0.5; bild(c, glowSpr([90, 120, 255]), L.x, L.y, L.d * 1.1);
        vanlig(c);
        for (var i = 0; i < MOL.length; i++) {
            var m = MOL[i], f = ELF[m.el];
            var x = L.x + m.x * k, y = L.y - m.y * k, r = f[3] * k;
            if (!synlig(L, x, y, r)) continue;
            c.globalAlpha = a;
            bild(c, ballSpr(f[0], f[1], f[2]), x, y, 2 * r);
            var djup = clamp(-m.z / 6e-10, 0, 1) * 0.5;
            if (djup > 0.02) { c.fillStyle = 'rgba(5,5,25,' + djup * a + ')'; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
        }
    }

    // ── DNA-spiralen ───────────────────────────────────────────────────
    function dnaSpr() {
        return sprite('dna', 1024, 1024, function (g, n) {
            var m2u = 1 / 2.4e-8, Rh = 1.0e-9 * m2u, pitch = 3.4e-9 * m2u, steg = 0.34e-9 * m2u;
            var nbp = Math.round(1.3 / steg), ax = [Math.SQRT1_2, -Math.SQRT1_2], nx = [Math.SQRT1_2, Math.SQRT1_2];
            var R = rng(9), kulor = [];
            var bas = [['#00e5a0', '#ffd23f'], ['#4d8bff', '#ff5b8a'], ['#ffd23f', '#00e5a0'], ['#ff5b8a', '#4d8bff']];
            var bb = [['#e6c8ff', '#b06bff', '#3a1170'], ['#ffe0c0', '#ff9a3c', '#6a2a00']];
            function pos(t, ph, rr) {
                return { x: 0.5 + ax[0] * t + nx[0] * rr * Math.cos(ph), y: 0.5 + ax[1] * t + nx[1] * rr * Math.cos(ph), z: rr * Math.sin(ph) };
            }
            for (var i = 0; i < nbp; i++) {
                var t = (i - nbp / 2) * steg, ph = TAU * t / pitch;
                for (var s = 0; s < 2; s++) for (var sub = 0; sub < 2; sub++) {
                    var pp = pos(t + sub * steg / 2, ph + (s ? 2.4 : 0) + sub * Math.PI * steg / pitch, Rh);
                    pp.r = 0.34e-9 * m2u; pp.f = bb[s]; kulor.push(pp);
                }
                var typ = bas[(R() * 4) | 0];
                for (var j = 1; j <= 6; j++) {
                    var f = j / 7, a0 = pos(t, ph, Rh * 0.8), a1 = pos(t, ph + 2.4, Rh * 0.8);
                    var c2 = hexRgb(typ[j <= 3 ? 0 : 1]);
                    kulor.push({ x: a0.x + (a1.x - a0.x) * f, y: a0.y + (a1.y - a0.y) * f, z: a0.z + (a1.z - a0.z) * f, r: 0.19e-9 * m2u,
                                 f: ['#ffffff', rgba(c2, 1), rgba(blanda(c2, [0, 0, 0], 0.7), 1)] });
                }
            }
            kulor.sort(function (p, q) { return p.z - q.z; });
            g.globalCompositeOperation = 'lighter';
            var gl = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
            gl.addColorStop(0, 'rgba(120,80,255,0.25)'); gl.addColorStop(1, 'rgba(120,80,255,0)');
            g.fillStyle = gl; g.fillRect(0, 0, n, n);
            g.globalCompositeOperation = 'source-over';
            for (var k = 0; k < kulor.length; k++) {
                var b = kulor[k], d = 2 * b.r * n * (0.9 + 0.1 * b.z / Rh);
                g.drawImage(ballSpr(b.f[0], b.f[1], b.f[2]), b.x * n - d / 2, b.y * n - d / 2, d, d);
                var dj = clamp(-b.z / Rh, 0, 1) * 0.45;
                if (dj > 0.02) { g.fillStyle = 'rgba(5,0,25,' + dj + ')'; g.beginPath(); g.arc(b.x * n, b.y * n, d / 2, 0, TAU); g.fill(); }
            }
        });
    }
    function ritaDna(c, L) { c.globalAlpha = L.a; bild(c, dnaSpr(), L.x, L.y, L.d); }

    // ── Kromatin: DNA lindat runt nukleosomer ──────────────────────────
    var KROM = null;
    function byggKromatin() {
        var tradar = [];
        function trad(seed, start, rikt, genom) {
            var R = rng(seed), pkt = [], i, h;
            if (genom) {
                var fram = [[0, 0]], bak = [];
                h = rikt; var p = [0, 0];
                for (i = 0; i < 8; i++) { h += (R() - 0.5) * 1.6; p = [p[0] + Math.cos(h) * 4.5e-8, p[1] + Math.sin(h) * 4.5e-8]; fram.push(p); }
                h = rikt + Math.PI; p = [0, 0];
                for (i = 0; i < 8; i++) { h += (R() - 0.5) * 1.6; p = [p[0] + Math.cos(h) * 4.5e-8, p[1] + Math.sin(h) * 4.5e-8]; bak.push(p); }
                pkt = bak.reverse().concat(fram);
            } else {
                h = rikt; var q = start.slice(); pkt.push(q);
                for (i = 0; i < 16; i++) { h += (R() - 0.5) * 1.6; q = [q[0] + Math.cos(h) * 4.5e-8, q[1] + Math.sin(h) * 4.5e-8]; pkt.push(q); }
            }
            // Catmull–Rom, sedan pärlor var 18:e nanometer längs kurvan
            var kurva = [];
            for (i = 0; i < pkt.length - 1; i++) {
                var p0 = pkt[Math.max(0, i - 1)], p1 = pkt[i], p2 = pkt[i + 1], p3 = pkt[Math.min(pkt.length - 1, i + 2)];
                for (var s = 0; s < 12; s++) {
                    var t = s / 12, t2 = t * t, t3 = t2 * t;
                    kurva.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]);
                }
            }
            kurva.push(pkt[pkt.length - 1]);
            var lang = [0];
            for (i = 1; i < kurva.length; i++) lang.push(lang[i - 1] + Math.hypot(kurva[i][0] - kurva[i - 1][0], kurva[i][1] - kurva[i - 1][1]));
            var mittL = genom ? lang[8 * 12] : 0, parlor = [];
            for (var sL = mittL % 1.8e-8 + 0.9e-8; sL < lang[lang.length - 1]; sL += 1.8e-8) {
                if (genom && Math.abs(sL - mittL) < 0.85e-8) continue;
                for (i = 1; i < lang.length && lang[i] < sL; i++);
                var f = (sL - lang[i - 1]) / (lang[i] - lang[i - 1] || 1);
                parlor.push([kurva[i - 1][0] + (kurva[i][0] - kurva[i - 1][0]) * f + 0.35e-8 * (R() - 0.5),
                             kurva[i - 1][1] + (kurva[i][1] - kurva[i - 1][1]) * f + 0.35e-8 * (R() - 0.5), R()]);
            }
            tradar.push({ kurva: kurva, parlor: parlor });
        }
        trad(3, null, Math.PI / 4, true);
        trad(5, [-2.2e-7, 1.4e-7], -0.3, false);
        trad(8, [2.4e-7, -1.6e-7], 2.6, false);
        trad(13, [-1.5e-7, -2.4e-7], 1.1, false);
        return tradar;
    }
    function ritaKromatin(c, L) {
        if (!KROM) KROM = byggKromatin();
        var k = L.k, a = L.a, pr = 5.5e-9 * k, ball = ballSpr('#ead8ff', '#a070ff', '#2e1173');
        c.globalAlpha = a;
        c.lineWidth = Math.max(1, 2e-9 * k);
        c.strokeStyle = '#ff86d9';
        c.lineJoin = 'round';
        for (var t = 0; t < KROM.length; t++) {
            var tr = KROM[t];
            c.beginPath();
            for (var i = 0; i < tr.kurva.length; i++) {
                var x = L.x + tr.kurva[i][0] * k, y = L.y - tr.kurva[i][1] * k;
                if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
            }
            c.stroke();
            for (var j = 0; j < tr.parlor.length; j++) {
                var p = tr.parlor[j], px = L.x + p[0] * k, py = L.y - p[1] * k;
                if (!synlig(L, px, py, pr)) continue;
                bild(c, ball, px, py, 2 * pr * (0.9 + 0.2 * p[2]));
                if (pr > 9) {
                    c.strokeStyle = 'rgba(255,150,225,0.85)';
                    c.beginPath(); c.ellipse(px, py, pr * 1.02, pr * 0.42, p[2] * 3, 0, TAU); c.stroke();
                    c.strokeStyle = '#ff86d9';
                }
            }
        }
    }

    // ── Viruset ────────────────────────────────────────────────────────
    function ritaVirus(c, L) {
        var R = L.d / 2 * 0.8, a = L.a, x = L.x, y = L.y, i;
        c.globalAlpha = a;
        c.lineCap = 'round';
        for (i = 0; i < 26; i++) {
            var v = i * TAU / 26 + 0.1 * Math.sin(i * 3);
            c.strokeStyle = '#ff6a3d';
            c.lineWidth = Math.max(1, R * 0.06);
            c.beginPath(); c.moveTo(x + Math.cos(v) * R * 0.95, y + Math.sin(v) * R * 0.95);
            c.lineTo(x + Math.cos(v) * R * 1.18, y + Math.sin(v) * R * 1.18); c.stroke();
            bild(c, ballSpr('#ffd0a0', '#ff6a3d', '#7a1a00'), x + Math.cos(v) * R * 1.22, y + Math.sin(v) * R * 1.22, R * 0.2);
        }
        bild(c, ballSpr('#c8fff4', '#1ccfb5', '#03443c'), x, y, 2 * R);
        var Rr = rng(77);
        for (i = 0; i < 14; i++) {
            var rr = Math.sqrt(Rr()) * 0.75 * R, th = Rr() * TAU;
            bild(c, ballSpr('#ffd0a0', '#ff6a3d', '#7a1a00'), x + Math.cos(th) * rr, y + Math.sin(th) * rr, R * 0.15);
        }
    }

    // ── Bakterien ──────────────────────────────────────────────────────
    function ritaBakterie(c, L) {
        var len = L.d, w = L.d * 0.36, a = L.a;
        c.save();
        c.globalAlpha = a;
        c.translate(L.x, L.y); c.rotate(-0.45);
        c.strokeStyle = 'rgba(160,255,120,0.75)';
        c.lineWidth = Math.max(1, len * 0.012);
        for (var f = 0; f < 5; f++) {
            c.beginPath();
            var y0 = (f - 2) * w * 0.18;
            for (var i = 0; i <= 40; i++) {
                var s = i / 40, xx = -len / 2 - s * len * 0.9, yy = y0 + Math.sin(s * 14 - L.t * 6 + f) * w * 0.12 + (f - 2) * s * w * 0.4;
                if (i === 0) c.moveTo(xx + len * 0.05, yy); else c.lineTo(xx, yy);
            }
            c.stroke();
        }
        var gr = c.createLinearGradient(0, -w / 2, 0, w / 2);
        gr.addColorStop(0, '#d8ff7a'); gr.addColorStop(0.45, '#5fd23a'); gr.addColorStop(1, '#1d5a12');
        c.fillStyle = gr;
        c.beginPath();
        c.moveTo(-len / 2 + w / 2, -w / 2); c.lineTo(len / 2 - w / 2, -w / 2);
        c.arc(len / 2 - w / 2, 0, w / 2, -Math.PI / 2, Math.PI / 2);
        c.lineTo(-len / 2 + w / 2, w / 2);
        c.arc(-len / 2 + w / 2, 0, w / 2, Math.PI / 2, Math.PI * 1.5);
        c.fill();
        c.strokeStyle = 'rgba(230,255,180,0.6)'; c.lineWidth = Math.max(1, w * 0.04); c.stroke();
        c.fillStyle = 'rgba(30,80,20,0.35)';
        for (var j = 0; j < 7; j++) { c.beginPath(); c.ellipse((j - 3) * len * 0.11, Math.sin(j * 2) * w * 0.15, w * 0.12, w * 0.07, j, 0, TAU); c.fill(); }
        c.restore();
    }

    // ── Cellkärnan ─────────────────────────────────────────────────────
    var KTRAD = null;
    function ritaCellkarna(c, L) {
        if (!KTRAD) {
            var R = rng(61); KTRAD = [];
            for (var i = 0; i < 90; i++) {
                var r = Math.sqrt(R()) * 0.85, th = R() * TAU, p = [Math.cos(th) * r, Math.sin(th) * r], tr = [p], h = R() * TAU;
                for (var j = 0; j < 12; j++) { h += (R() - 0.5) * 2; p = [p[0] + Math.cos(h) * 0.05, p[1] + Math.sin(h) * 0.05]; if (Math.hypot(p[0], p[1]) > 0.93) break; tr.push(p); }
                KTRAD.push(tr);
            }
        }
        var Rp = L.d / 2, a = L.a, x = L.x, y = L.y;
        if (Rp < 1) return;
        c.globalAlpha = a;
        var gr = c.createRadialGradient(x - 0.3 * Rp, y - 0.3 * Rp, 0.1 * Rp, x, y, Rp);
        gr.addColorStop(0, '#b38cff'); gr.addColorStop(0.6, '#6a3fe0'); gr.addColorStop(1, '#3a1a99');
        c.fillStyle = gr;
        c.beginPath(); c.arc(x, y, Rp, 0, TAU); c.fill();
        c.fillStyle = 'rgba(200,60,170,0.75)';
        c.beginPath(); c.ellipse(x - 0.25 * Rp, y - 0.2 * Rp, 0.22 * Rp, 0.18 * Rp, 0.4, 0, TAU); c.fill();
        c.strokeStyle = 'rgba(240,185,255,0.45)';
        c.lineWidth = Math.max(0.8, 0.005 * L.d);
        c.lineJoin = 'round';
        for (var t = 0; t < KTRAD.length; t++) {
            var tr2 = KTRAD[t];
            c.beginPath();
            for (var n = 0; n < tr2.length; n++) {
                var px = x + tr2[n][0] * Rp, py = y + tr2[n][1] * Rp;
                if (n === 0) c.moveTo(px, py); else c.lineTo(px, py);
            }
            c.stroke();
        }
        c.strokeStyle = '#dcc6ff';
        c.lineWidth = Math.max(1.2, 0.013 * L.d);
        c.beginPath(); c.arc(x, y, Rp, 0, TAU); c.stroke();
        c.fillStyle = '#3a1a99';
        for (var p2 = 0; p2 < 56; p2++) {
            var v = p2 * TAU / 56;
            c.beginPath(); c.arc(x + Math.cos(v) * Rp, y + Math.sin(v) * Rp, Math.max(0.8, 0.008 * L.d), 0, TAU); c.fill();
        }
    }

    // ── Hudcellen ──────────────────────────────────────────────────────
    function cellSpr() {
        return sprite('cell', 1024, 1024, function (g, n) {
            var c = n / 2, R = rng(17), i;
            var form = [];
            for (i = 0; i < 18; i++) {
                var v = i * TAU / 18, r = n * 0.46 * (1 + 0.05 * Math.sin(3 * v + 1) + 0.04 * Math.sin(5 * v + 2));
                form.push([c + Math.cos(v) * r, c + Math.sin(v) * r]);
            }
            function blob() {
                g.beginPath();
                for (var k = 0; k <= form.length; k++) {
                    var p = form[k % form.length], q = form[(k + 1) % form.length];
                    var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
                    if (k === 0) g.moveTo(mx, my); else g.quadraticCurveTo(p[0], p[1], mx, my);
                }
                g.closePath();
            }
            var gr = g.createRadialGradient(c, c, 0, c, c, n * 0.5);
            gr.addColorStop(0, '#ffc2d4'); gr.addColorStop(0.6, '#ff6f9c'); gr.addColorStop(1, '#c2295c');
            g.fillStyle = gr; blob(); g.fill();
            g.save(); blob(); g.clip();
            for (i = 0; i < 160; i++) { g.fillStyle = 'rgba(255,215,230,0.45)'; g.beginPath(); g.arc(c + gauss(R) * n * 0.17, c + gauss(R) * n * 0.17, 2 + R() * 4, 0, TAU); g.fill(); }
            g.strokeStyle = 'rgba(255,60,130,0.6)'; g.lineWidth = 4;
            for (i = 0; i < 12; i++) {
                var r0 = n * (0.19 + 0.012 * i), v0 = R() * TAU;
                g.beginPath(); g.arc(c, c, r0, v0, v0 + 0.8 + R() * 1.2); g.stroke();
            }
            for (i = 0; i < 16; i++) {
                var vv = R() * TAU, rr = n * (0.25 + R() * 0.16), mx = c + Math.cos(vv) * rr, my = c + Math.sin(vv) * rr;
                g.save(); g.translate(mx, my); g.rotate(R() * TAU);
                g.fillStyle = '#ff9a3c'; g.strokeStyle = '#ffd08a'; g.lineWidth = 3;
                g.beginPath(); g.ellipse(0, 0, n * 0.04, n * 0.017, 0, 0, TAU); g.fill(); g.stroke();
                g.strokeStyle = '#ffe9c0'; g.lineWidth = 2; g.beginPath();
                for (var z = 0; z <= 8; z++) g.lineTo(-n * 0.032 + z * n * 0.008, (z % 2 ? 1 : -1) * n * 0.009);
                g.stroke(); g.restore();
            }
            g.strokeStyle = '#ffcf5a'; g.lineWidth = 5;
            for (i = 0; i < 5; i++) { g.beginPath(); g.arc(c + n * 0.3, c - n * 0.12, n * (0.06 + i * 0.016), 2.3, 3.6); g.stroke(); }
            g.restore();
            g.strokeStyle = '#ffe3ec'; g.lineWidth = 8; blob(); g.stroke();
            var kr = n / 6;
            var kg = g.createRadialGradient(c - 0.3 * kr, c - 0.3 * kr, 0.1 * kr, c, c, kr);
            kg.addColorStop(0, '#b38cff'); kg.addColorStop(0.6, '#6a3fe0'); kg.addColorStop(1, '#3a1a99');
            g.fillStyle = kg; g.beginPath(); g.arc(c, c, kr, 0, TAU); g.fill();
            g.fillStyle = 'rgba(200,60,170,0.75)';
            g.beginPath(); g.ellipse(c - 0.25 * kr, c - 0.2 * kr, 0.22 * kr, 0.18 * kr, 0.4, 0, TAU); g.fill();
            g.strokeStyle = '#dcc6ff'; g.lineWidth = 3; g.beginPath(); g.arc(c, c, kr, 0, TAU); g.stroke();
        });
    }
    function ritaCell(c, L) { c.globalAlpha = L.a; bild(c, cellSpr(), L.x, L.y, L.d); }

    // ── Röda blodkroppar ───────────────────────────────────────────────
    function ritaBlod(c, L) {
        var a = L.a, d = L.d;
        var lagen = [[0, 0, 0.4, 0.55], [0.9, 0.55, -0.6, 0.85], [-0.4, 0.95, 1.2, 0.4]];
        c.globalAlpha = a;
        for (var i = 0; i < lagen.length; i++) {
            var p = lagen[i], x = L.x + p[0] * d, y = L.y - p[1] * d;
            c.save(); c.translate(x, y); c.rotate(p[2]); c.scale(1, p[3]);
            var gr = c.createRadialGradient(0, 0, 0, 0, 0, d / 2);
            gr.addColorStop(0, '#b0102a'); gr.addColorStop(0.45, '#d81830'); gr.addColorStop(0.8, '#ff3048'); gr.addColorStop(1, '#8a0018');
            c.fillStyle = gr; c.beginPath(); c.arc(0, 0, d / 2, 0, TAU); c.fill();
            c.strokeStyle = 'rgba(255,140,150,0.55)'; c.lineWidth = Math.max(1, d * 0.02);
            c.beginPath(); c.arc(0, 0, d * 0.36, 3.6, 5.6); c.stroke();
            c.restore();
        }
    }

    // ── Hudceller (fyller bilden) ──────────────────────────────────────
    function cellPlatta(v) {
        return sprite('hc' + v, 96, 96, function (g) {
            var R = rng(90 + v), pts = [];
            for (var i = 0; i < 6; i++) { var a = i * TAU / 6 + Math.PI / 6, r = 44 + (R() - 0.5) * 4; pts.push([48 + Math.cos(a) * r, 48 + Math.sin(a) * r]); }
            g.beginPath(); pts.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.closePath();
            var gr = g.createRadialGradient(40, 38, 4, 48, 48, 50);
            gr.addColorStop(0, ['#ffc3d2', '#ffb8c9', '#ffcbd8'][v]); gr.addColorStop(0.7, '#ff7aa2'); gr.addColorStop(1, '#d63a6c');
            g.fillStyle = gr; g.lineJoin = 'round'; g.fill();
            g.strokeStyle = 'rgba(255,220,232,0.7)'; g.lineWidth = 3; g.stroke();
            g.fillStyle = '#6a3fe0'; g.beginPath(); g.arc(48 + (R() - 0.5) * 10, 48 + (R() - 0.5) * 10, 14, 0, TAU); g.fill();
        });
    }
    function ritaHudceller(c, L) {
        var h = 3e-5 * L.k, a = L.a;
        if (h < 3) return;
        c.globalAlpha = a;
        c.fillStyle = '#8c2a52'; c.fillRect(0, 0, L.W, L.H);
        var dy = 0.866 * h;
        var r0 = Math.floor(-L.cy / dy) - 1, r1 = Math.ceil((L.H - L.cy) / dy) + 1;
        var q0 = Math.floor(-L.cx / h) - 2, q1 = Math.ceil((L.W - L.cx) / h) + 2;
        if ((r1 - r0) * (q1 - q0) > 3000) return;
        for (var r = r0; r <= r1; r++) for (var q = q0; q <= q1; q++) {
            var x = L.cx + (q + (r & 1) * 0.5) * h, y = L.cy + r * dy;
            bild(c, cellPlatta(((q * 7 + r * 13) % 3 + 3) % 3), x, y, h * 1.1);
        }
    }

    // ── Fingertoppens hud (fyller bilden) ──────────────────────────────
    var FC = [-6e-3, -1e-3], RIDGE = 4.6e-4, ELY = 1.25, ELROT = 0.2;
    function rander(c, L, maxI) {
        var k = L.k, cx = L.cx + FC[0] * k, cy = L.cy - FC[1] * k;
        var dist = Math.hypot(FC[0], FC[1]), half = Math.hypot(L.W, L.H) / 2 / k;
        var i0 = Math.max(1, Math.floor((dist - half) / (RIDGE * ELY)) - 1), i1 = Math.ceil((dist + half) / RIDGE) + 1;
        if (maxI) i1 = Math.min(i1, maxI);
        if (i1 - i0 > 260) i0 = i1 - 260;
        var sp = RIDGE * k;
        c.lineWidth = 0.5 * sp;
        c.strokeStyle = 'rgba(200,100,76,0.55)';
        for (var i = i0; i <= i1; i++) { c.beginPath(); c.ellipse(cx, cy, i * sp, i * sp * ELY, ELROT, 0, TAU); c.stroke(); }
        c.lineWidth = Math.max(0.6, 0.12 * sp);
        c.strokeStyle = 'rgba(255,220,198,0.45)';
        for (i = i0; i <= i1; i++) { c.beginPath(); c.ellipse(cx, cy, (i + 0.32) * sp, (i + 0.32) * sp * ELY, ELROT, 0, TAU); c.stroke(); }
        if (sp > 10) {
            var dx = L.cx - cx, dy = L.cy - cy, cr = Math.cos(ELROT), sr = Math.sin(ELROT);
            var ux = dx * cr + dy * sr, uy = -dx * sr + dy * cr, th0 = Math.atan2(uy / ELY, ux);
            c.fillStyle = 'rgba(150,62,46,0.6)';
            var pr = Math.max(0.8, 0.075 * sp);
            for (i = i0; i <= i1; i++) {
                var rho = i * sp, dth = 5e-4 * k / rho, span = Math.min(Math.PI, half * k / rho * 1.3);
                var fas = frac(Math.sin(i * 12.9898) * 43758.5453) * dth;
                for (var th = th0 - span + fas; th < th0 + span; th += dth) {
                    var ex = rho * Math.cos(th), ey = rho * ELY * Math.sin(th);
                    var px = cx + ex * cr - ey * sr, py = cy + ex * sr + ey * cr;
                    if (px < -4 || px > L.W + 4 || py < -4 || py > L.H + 4) continue;
                    c.beginPath(); c.arc(px, py, pr, 0, TAU); c.fill();
                }
            }
        }
    }
    function ritaHud(c, L) {
        c.globalAlpha = L.a;
        var gr = c.createLinearGradient(0, 0, 0, L.H);
        gr.addColorStop(0, '#f7b593'); gr.addColorStop(1, '#e5896a');
        c.fillStyle = gr; c.fillRect(0, 0, L.W, L.H);
        rander(c, L);
    }

    // ── Hårstrået ──────────────────────────────────────────────────────
    function ritaHar(c, L) {
        var k = L.k, w = 7e-5 * k, a = L.a, ang = 0.61, len = 6e-3 * k;
        var x0 = L.cx + 1.2e-4 * k, y0 = L.cy + 0.8e-4 * k;
        var dx = Math.cos(ang), dy = -Math.sin(ang), nx = -dy, ny = dx;
        c.globalAlpha = a;
        c.fillStyle = 'rgba(120,40,30,0.55)';
        c.beginPath(); c.ellipse(x0, y0, w * 1.1, w * 0.75, -ang, 0, TAU); c.fill();
        var gr = c.createLinearGradient(x0 - nx * w / 2, y0 - ny * w / 2, x0 + nx * w / 2, y0 + ny * w / 2);
        gr.addColorStop(0, '#24120a'); gr.addColorStop(0.35, '#6e4026'); gr.addColorStop(0.52, '#b0805a'); gr.addColorStop(0.72, '#55301b'); gr.addColorStop(1, '#1e0f07');
        c.fillStyle = gr;
        c.beginPath();
        c.moveTo(x0 - nx * w / 2, y0 - ny * w / 2);
        c.lineTo(x0 + dx * len - nx * w * 0.42, y0 + dy * len - ny * w * 0.42);
        c.lineTo(x0 + dx * len + nx * w * 0.42, y0 + dy * len + ny * w * 0.42);
        c.lineTo(x0 + nx * w / 2, y0 + ny * w / 2);
        c.closePath(); c.fill();
        if (w > 30) {
            c.strokeStyle = 'rgba(255,220,180,0.25)'; c.lineWidth = Math.max(1, w * 0.02);
            for (var s = w * 0.6; s < Math.min(len, 3 * L.W); s += w * 0.55) {
                var cx = x0 + dx * s, cy = y0 + dy * s;
                if (!synlig(L, cx, cy, w)) continue;
                c.beginPath();
                c.moveTo(cx - nx * w * 0.45, cy - ny * w * 0.45);
                c.quadraticCurveTo(cx + dx * w * 0.25, cy + dy * w * 0.25, cx + nx * w * 0.45, cy + ny * w * 0.45);
                c.stroke();
            }
        }
    }

    // ── Sandkornet ─────────────────────────────────────────────────────
    function ritaSand(c, L) {
        var R = rng(55), d = L.d, a = L.a, pts = [];
        for (var i = 0; i < 10; i++) { var v = i * TAU / 10 + (R() - 0.5) * 0.4, r = d * (0.4 + R() * 0.1); pts.push([L.x + Math.cos(v) * r, L.y + Math.sin(v) * r * 0.85]); }
        c.globalAlpha = a;
        var gr = c.createLinearGradient(L.x - d / 2, L.y - d / 2, L.x + d / 2, L.y + d / 2);
        gr.addColorStop(0, '#fff0b0'); gr.addColorStop(0.45, '#ffc54a'); gr.addColorStop(1, '#a8580f');
        c.fillStyle = gr;
        c.beginPath(); pts.forEach(function (p, i) { if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }); c.closePath(); c.fill();
        var mx = L.x - d * 0.06, my = L.y - d * 0.08;
        for (i = 0; i < pts.length; i++) {
            var p = pts[i], q = pts[(i + 1) % pts.length];
            c.fillStyle = i % 3 === 0 ? 'rgba(255,255,255,0.22)' : i % 3 === 1 ? 'rgba(90,40,0,0.18)' : 'rgba(255,220,140,0.15)';
            c.beginPath(); c.moveTo(mx, my); c.lineTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.closePath(); c.fill();
        }
    }

    // ── Myran ──────────────────────────────────────────────────────────
    function ritaMyra(c, L) {
        var d = L.d, a = L.a;
        c.save();
        c.globalAlpha = a;
        c.translate(L.x, L.y); c.rotate(0.35); c.scale(d, d);
        c.strokeStyle = '#3a0e06'; c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = 0.016;
        var ben = [[-0.02, 0.0, -0.18, 0.2, -0.32, 0.26], [0.02, 0.0, 0.0, 0.24, -0.05, 0.36], [0.06, 0.0, 0.18, 0.2, 0.26, 0.32]];
        for (var s = -1; s <= 1; s += 2) for (var i = 0; i < 3; i++) {
            var b = ben[i];
            c.beginPath(); c.moveTo(b[0], b[1] * s); c.lineTo(b[2], b[3] * s); c.lineTo(b[4], b[5] * s); c.stroke();
        }
        c.lineWidth = 0.012;
        for (s = -1; s <= 1; s += 2) { c.beginPath(); c.moveTo(0.32, 0.03 * s); c.lineTo(0.42, 0.12 * s); c.lineTo(0.55, 0.08 * s); c.stroke(); }
        function kropp(x, rx, ry) {
            var gr = c.createRadialGradient(x - rx * 0.3, -ry * 0.4, ry * 0.1, x, 0, Math.max(rx, ry));
            gr.addColorStop(0, '#c2452a'); gr.addColorStop(0.5, '#6e1a0c'); gr.addColorStop(1, '#2a0704');
            c.fillStyle = gr; c.beginPath(); c.ellipse(x, 0, rx, ry, 0, 0, TAU); c.fill();
            c.fillStyle = 'rgba(255,230,210,0.25)'; c.beginPath(); c.ellipse(x - rx * 0.2, -ry * 0.45, rx * 0.4, ry * 0.18, 0, 0, TAU); c.fill();
        }
        kropp(-0.3, 0.2, 0.13); kropp(-0.07, 0.04, 0.035); kropp(0.06, 0.13, 0.06); kropp(0.27, 0.095, 0.085);
        c.restore();
    }

    // ── Fingertoppen ───────────────────────────────────────────────────
    function fingerForm(c) {
        c.beginPath();
        c.moveTo(-0.2, 0.011); c.lineTo(-0.003, 0.0095);
        c.arc(-0.003, 0, 0.0095, Math.PI / 2, -Math.PI / 2, true);
        c.lineTo(-0.2, -0.011); c.closePath();
    }
    function ritaFinger(c, L) {
        c.globalAlpha = L.a;
        metrisk(c, L);
        fingerForm(c);
        var gr = c.createRadialGradient(-0.006, 0.003, 0.001, -0.006, 0, 0.03);
        gr.addColorStop(0, '#ffc9a8'); gr.addColorStop(0.55, '#f09a78'); gr.addColorStop(1, '#b85c42');
        c.fillStyle = gr; c.fill();
        c.save(); c.clip();
        c.setTransform(c._dpr, 0, 0, c._dpr, 0, 0);
        rander(c, L, 34);
        c.restore();
        fingerForm(c);
        c.strokeStyle = '#a8503a'; c.lineWidth = 0.0005; c.stroke();
        c.restore();
    }

    // ── Människan ──────────────────────────────────────────────────────
    function ritaManniska(c, L) {
        c.globalAlpha = L.a;
        metrisk(c, L);
        var hud = '#a2623e', har = '#1e1022', lc = 'round';
        function streck(x0, y0, x1, y1, w, col) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = lc; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }
        var byx = c.createLinearGradient(-0.1, 0, 0.1, 0);
        byx.addColorStop(0, '#2a1ea8'); byx.addColorStop(0.5, '#4b3cf0'); byx.addColorStop(1, '#2a1ea8');
        c.fillStyle = byx;
        c.beginPath(); c.moveTo(-0.13, 0.95); c.lineTo(-0.11, 0.06); c.lineTo(-0.03, 0.06); c.lineTo(0, 0.78); c.lineTo(0.03, 0.06); c.lineTo(0.11, 0.06); c.lineTo(0.13, 0.95); c.closePath(); c.fill();
        c.fillStyle = '#16142a';
        c.beginPath(); c.ellipse(-0.075, 0.035, 0.075, 0.035, 0, 0, TAU); c.fill();
        c.beginPath(); c.ellipse(0.075, 0.035, 0.075, 0.035, 0, 0, TAU); c.fill();
        streck(-0.16, 1.38, -0.2, 1.1, 0.075, '#00b8a8');
        streck(-0.2, 1.1, -0.21, 0.86, 0.06, hud);
        c.fillStyle = hud; c.beginPath(); c.arc(-0.21, 0.82, 0.045, 0, TAU); c.fill();
        var tr = c.createLinearGradient(-0.18, 0, 0.18, 0);
        tr.addColorStop(0, '#00a596'); tr.addColorStop(0.5, '#1ee6d0'); tr.addColorStop(1, '#00a596');
        c.fillStyle = tr;
        c.beginPath(); c.moveTo(-0.18, 1.43); c.quadraticCurveTo(0, 1.47, 0.18, 1.43); c.lineTo(0.14, 0.92); c.lineTo(-0.14, 0.92); c.closePath(); c.fill();
        streck(0.15, 1.39, 0.42, 1.33, 0.075, '#00b8a8');
        streck(0.42, 1.33, 0.66, 1.275, 0.062, hud);
        c.fillStyle = hud; c.beginPath(); c.ellipse(0.7, 1.262, 0.05, 0.036, -0.15, 0, TAU); c.fill();
        streck(0.715, 1.257, 0.747, 1.25, 0.019, hud);
        streck(-0.0, 1.45, 0.0, 1.52, 0.07, hud);
        c.fillStyle = hud; c.beginPath(); c.arc(0, 1.6, 0.105, 0, TAU); c.fill();
        c.fillStyle = har;
        c.beginPath(); c.arc(0, 1.62, 0.11, 0.15, Math.PI - 0.15, false); c.closePath(); c.fill();
        c.beginPath(); c.ellipse(-0.12, 1.56, 0.045, 0.11, 0.35, 0, TAU); c.fill();
        c.restore();
    }

    // ── Trädet ─────────────────────────────────────────────────────────
    function ritaTrad(c, L) {
        c.globalAlpha = L.a;
        metrisk(c, L);
        var st = c.createLinearGradient(-0.5, 0, 0.5, 0);
        st.addColorStop(0, '#4a2a14'); st.addColorStop(0.5, '#8a5a32'); st.addColorStop(1, '#3a200e');
        c.fillStyle = st;
        c.beginPath(); c.moveTo(-0.55, 0); c.lineTo(-0.22, 8); c.lineTo(0.22, 8); c.lineTo(0.55, 0); c.closePath(); c.fill();
        c.strokeStyle = '#5a3418'; c.lineCap = 'round';
        c.lineWidth = 0.35; c.beginPath(); c.moveTo(0, 6); c.lineTo(-2.4, 9.5); c.moveTo(0, 7); c.lineTo(2.6, 10); c.stroke();
        var kronor = [[0, 13.5, 4.4], [-3, 11, 3.2], [3.2, 11.3, 3.3], [-1.8, 15, 3], [2, 15.3, 2.9], [0, 10, 3.2], [0.4, 16.2, 2.2]];
        for (var i = 0; i < kronor.length; i++) {
            var k2 = kronor[i];
            var gr = c.createRadialGradient(k2[0] - k2[2] * 0.35, k2[1] + k2[2] * 0.4, k2[2] * 0.1, k2[0], k2[1], k2[2]);
            gr.addColorStop(0, '#8cff7a'); gr.addColorStop(0.55, '#2fbf4a'); gr.addColorStop(1, '#0f6a2a');
            c.fillStyle = gr; c.beginPath(); c.arc(k2[0], k2[1], k2[2], 0, TAU); c.fill();
        }
        c.restore();
    }

    // ── Eiffeltornet ───────────────────────────────────────────────────
    function eiffelSpr() {
        return sprite('eiffel', 264, 660, function (g, w, h) {
            var s = h / 330, cx = w / 2;
            function X(m) { return cx + m * s; }
            function Y(m) { return h - m * s; }
            var profil = [[0, 62], [20, 52], [57, 36], [80, 25], [115, 17], [180, 9], [276, 3.6], [300, 2.6], [312, 1.6], [330, 0.4]];
            g.beginPath();
            g.moveTo(X(-profil[0][1]), Y(0));
            for (var i = 1; i < profil.length; i++) g.lineTo(X(-profil[i][1]), Y(profil[i][0]));
            for (i = profil.length - 1; i >= 0; i--) g.lineTo(X(profil[i][1]), Y(profil[i][0]));
            g.closePath();
            var gr = g.createLinearGradient(0, 0, w, 0);
            gr.addColorStop(0, '#a8401a'); gr.addColorStop(0.5, '#ff9a4a'); gr.addColorStop(1, '#a8401a');
            g.fillStyle = gr; g.fill();
            g.globalCompositeOperation = 'destination-out';
            g.beginPath(); g.moveTo(X(-40), Y(0)); g.quadraticCurveTo(X(0), Y(64), X(40), Y(0)); g.closePath(); g.fill();
            g.beginPath(); g.moveTo(X(-19), Y(57)); g.quadraticCurveTo(X(0), Y(100), X(19), Y(57)); g.closePath(); g.fill();
            g.globalAlpha = 0.55;
            g.lineWidth = 1.4;
            for (var y = 6; y < 270; y += 9) {
                var hw = 0;
                for (i = 1; i < profil.length; i++) if (profil[i][0] >= y) { var f = (y - profil[i - 1][0]) / (profil[i][0] - profil[i - 1][0]); hw = profil[i - 1][1] + (profil[i][1] - profil[i - 1][1]) * f; break; }
                g.beginPath(); g.moveTo(X(-hw * 0.95), Y(y)); g.lineTo(X(hw * 0.95), Y(y + 9)); g.moveTo(X(hw * 0.95), Y(y)); g.lineTo(X(-hw * 0.95), Y(y + 9)); g.stroke();
            }
            g.globalAlpha = 1;
            g.globalCompositeOperation = 'source-over';
            g.fillStyle = '#ffd08a';
            [[57, 42], [115, 22], [276, 5]].forEach(function (p) { g.fillRect(X(-p[1]), Y(p[0]) - 4, p[1] * 2 * s, 5); });
        });
    }
    function ritaEiffel(c, L) {
        c.globalAlpha = L.a;
        bild(c, eiffelSpr(), L.x, L.y - 165 * L.k, 132 * L.k, 330 * L.k);
    }

    // ── Burj Khalifa (världens högsta byggnad, 828 m) ──────────────────
    // Elevation: en mittkärna med vingar som trappas av i en spiral uppåt,
    // och en spira som smalnar av till en spets. Mått i meter, 160 m brett.
    function burjSpr() {
        return sprite('burj', 200, 1035, function (g, w, h) {
            var s = h / 828, cx = w / 2;
            function X(m) { return cx + m * s; }
            function Y(m) { return h - m * s; }
            // [x0, x1, höjd] för varje kolumn; topparna smalnar av med en liten spets
            var kol = [
                [-80, -64, 150], [-64, -49, 290], [-49, -35, 420], [-35, -20, 520],
                [20, 35, 560], [35, 49, 465], [49, 64, 345], [64, 80, 215]
            ];
            function glas(x0, x1, ljus) {
                var gr = g.createLinearGradient(X(x0), 0, X(x1), 0);
                gr.addColorStop(0, ljus ? '#2f6fb8' : '#1f4f94');
                gr.addColorStop(0.5, ljus ? '#bfe6ff' : '#7fbdf0');
                gr.addColorStop(1, ljus ? '#3c80c8' : '#2a5ea6');
                return gr;
            }
            kol.forEach(function (k) {
                g.fillStyle = glas(k[0], k[1], false);
                g.beginPath();
                g.moveTo(X(k[0]), Y(0)); g.lineTo(X(k[0]), Y(k[2] - 14));
                g.lineTo(X((k[0] + k[1]) / 2), Y(k[2])); g.lineTo(X(k[1]), Y(k[2] - 14));
                g.lineTo(X(k[1]), Y(0)); g.closePath(); g.fill();
            });
            // Mittkärnan i tre avsatser och spiran
            var karna = [[-20, 20, 0, 600], [-14, 14, 600, 668], [-9, 9, 668, 712]];
            karna.forEach(function (k) {
                g.fillStyle = glas(k[0], k[1], true);
                g.fillRect(X(k[0]), Y(k[3]), (k[1] - k[0]) * s, (k[3] - k[2]) * s);
            });
            g.fillStyle = glas(-5, 5, true);
            g.beginPath();
            g.moveTo(X(-5), Y(712)); g.lineTo(X(-0.8), Y(828)); g.lineTo(X(0.8), Y(828)); g.lineTo(X(5), Y(712));
            g.closePath(); g.fill();
            // Våningsband och lodräta fogar ger glaset struktur
            g.globalAlpha = 0.28; g.strokeStyle = '#0c2a55'; g.lineWidth = 1;
            for (var y = 12; y < 700; y += 12) {
                g.beginPath();
                kol.concat(karna.map(function (k) { return [k[0], k[1], k[3]]; })).forEach(function (k) {
                    if (y < k[2] - 16) { g.moveTo(X(k[0]), Y(y)); g.lineTo(X(k[1]), Y(y)); }
                });
                g.stroke();
            }
            g.globalAlpha = 0.45; g.strokeStyle = '#e8f6ff';
            kol.forEach(function (k) {
                var xm = (k[0] + k[1]) / 2;
                g.beginPath(); g.moveTo(X(xm), Y(4)); g.lineTo(X(xm), Y(k[2] - 16)); g.stroke();
            });
            g.beginPath(); g.moveTo(X(0), Y(4)); g.lineTo(X(0), Y(700)); g.stroke();
            g.globalAlpha = 1;
            // Röd flygvarningslampa i toppen
            g.fillStyle = '#ff3b4f';
            g.beginPath(); g.arc(X(0), Y(824), 3.2, 0, TAU); g.fill();
        });
    }
    function ritaBurj(c, L) {
        c.globalAlpha = L.a;
        bild(c, burjSpr(), L.x, L.y - 414 * L.k, 160 * L.k, 828 * L.k);
    }

    // ── Bergen ─────────────────────────────────────────────────────────
    function berg(c, L, halv, hojd, profil, f0, f1, sno) {
        metrisk(c, L);
        c.beginPath(); c.moveTo(-halv, 0);
        for (var i = 0; i < profil.length; i++) c.lineTo(profil[i][0] * halv, profil[i][1] * hojd);
        c.lineTo(halv, 0); c.closePath();
        var gr = c.createLinearGradient(0, hojd, 0, 0);
        gr.addColorStop(0, f0); gr.addColorStop(1, f1);
        c.fillStyle = gr; c.fill();
        c.save(); c.clip();
        c.fillStyle = '#f4f8ff';
        c.fillRect(-halv, sno * hojd, 2 * halv, hojd);
        c.fillStyle = 'rgba(20,30,90,0.32)';
        c.beginPath(); c.moveTo(0, hojd * 1.01); c.lineTo(halv, 0); c.lineTo(halv, hojd); c.closePath(); c.fill();
        c.restore();
        c.restore();
    }
    var KEBPROF = [[-0.8, 0.18], [-0.55, 0.42], [-0.4, 0.38], [-0.22, 0.72], [-0.08, 0.88], [0, 1], [0.12, 0.9], [0.3, 0.62], [0.45, 0.66], [0.65, 0.3], [0.85, 0.12]];
    var EVPROF = [[-0.85, 0.14], [-0.6, 0.38], [-0.45, 0.34], [-0.25, 0.68], [-0.1, 0.86], [0, 1], [0.15, 0.84], [0.28, 0.93], [0.42, 0.68], [0.6, 0.48], [0.8, 0.2]];
    function ritaKeb(c, L) { c.globalAlpha = L.a; berg(c, L, 3200, 2097, KEBPROF, '#a58cff', '#2f2378', 0.72); }
    function ritaEverest(c, L) { c.globalAlpha = L.a; berg(c, L, 7500, 8849, EVPROF, '#7d98ff', '#1c2a7a', 0.58); }

    // ── Jorden: jordklotet ur kartpolygoner ────────────────────────────
    var KONT = [
        [[-17, 21], [-16, 12], [-8, 4.5], [5, 6], [9, 4], [9, -1], [13, -6], [12, -17], [15, -27], [18, -34], [20, -35], [26, -34], [32, -29], [35, -24], [40, -15], [40, -10], [39, -5], [43, 0], [51, 11], [43, 12], [39, 17], [35, 23], [33, 30], [25, 32], [20, 31], [10, 34], [10, 37], [0, 36], [-6, 36], [-10, 30], [-13, 27]],
        [[-9.5, 37], [-9, 43], [-1.5, 43.5], [-1.2, 46], [-4.5, 48], [-1.5, 49.5], [1.5, 50.5], [4, 51.5], [5, 53.3], [8.5, 53.8], [8.2, 55.5], [8.6, 57.1], [10.5, 57.6], [10.5, 56.3], [11, 54.2], [14, 54], [18, 54.8], [21, 55.3], [21.5, 57.5], [23.5, 59.3], [28, 59.7], [30, 60.2], [26.5, 60.4], [22.5, 60.2], [21.5, 61.5], [21.5, 63.2], [25, 65], [25.3, 65.8], [22, 65.8], [21, 64.5], [19, 63.5], [17.5, 62.5], [17.3, 61], [18.9, 59.9], [18.5, 59.3], [16.5, 58.5], [16.5, 57.3], [16, 56.2], [14.3, 56], [13, 55.4], [12.8, 56.3], [11.9, 57.6], [11.2, 58.9], [10.6, 59.9], [9.5, 59], [7, 58], [5.5, 58.8], [5, 60.5], [5, 62], [7, 62.8], [10, 64], [12.5, 65.5], [14, 67.2], [16, 68.5], [19, 69.8], [23.5, 70.7], [28, 71], [31, 70], [33, 69.3], [37, 68], [41, 66.5], [44, 68.4], [50, 68], [54, 68.5], [60, 69.5], [66, 69.4], [69, 73], [73, 72.5], [75, 68.5], [80, 72.5], [87, 74], [95, 76], [100, 77], [113, 73.5], [130, 71], [150, 71.5], [170, 69.5], [180, 66], [175, 62], [163, 60], [156, 51], [142, 53], [140, 47], [135, 43], [129, 41], [127, 35], [121, 31], [121, 25], [110, 20], [106, 10], [104, 1.5], [100, 4], [98, 8], [98, 16], [94, 16], [92, 22], [87, 21.5], [85, 19.5], [80.3, 15.5], [80, 13], [77.5, 8], [76.5, 9], [73, 17], [72.8, 21.5], [70, 22.5], [68, 23.8], [66.5, 25.4], [61.5, 25.2], [57, 25.7], [56.3, 26.8], [51, 28], [48.5, 30], [48, 29.5], [50, 26], [51.5, 24.3], [56, 24], [56.4, 26.2], [57.8, 23.6], [59.8, 22.4], [57.8, 19], [55, 17], [52, 15.6], [48, 14], [45, 13], [43.4, 12.8], [42.7, 15.5], [41, 19], [38.5, 23], [35.2, 28], [34.5, 29.5], [34.5, 31.5], [35.5, 33.5], [36, 35.5], [36.2, 36.7], [33, 36.2], [30, 36.3], [28, 36.7], [26.5, 38.5], [26.2, 40], [24, 40.5], [24, 38], [22.5, 36.5], [21.5, 37.5], [21, 39.5], [19.5, 41.8], [19, 42.5], [16, 43.5], [13.7, 45.6], [12.3, 45.3], [12.5, 44], [14, 42.5], [16, 41.5], [18.5, 40.2], [16.5, 39.3], [16, 38], [15.6, 40.1], [12.5, 41.8], [10.5, 43], [8.8, 44.4], [7, 43.6], [4, 43.4], [3.2, 42], [0.8, 41], [-0.3, 39.5], [0, 38.7], [-1.6, 37.2], [-2.2, 36.7], [-4.4, 36.7], [-5.6, 36], [-6.4, 36.8], [-7.4, 37.2], [-8.9, 37]],
        [[-5.7, 50], [-3, 50.6], [1.4, 51.2], [1.7, 52.7], [0.2, 53.5], [-0.3, 54.5], [-1.6, 55.6], [-2, 57.6], [-3.5, 58.6], [-5, 58.6], [-6.2, 57.5], [-5.6, 56], [-4.8, 55], [-3.2, 54.9], [-3.4, 54], [-3, 53.3], [-4.6, 53.2], [-4.2, 52.3], [-5.2, 51.7], [-3.2, 51.4], [-5.5, 50.1]],
        [[-6, 52], [-6.2, 53.5], [-5.6, 54.6], [-7.2, 55.3], [-8.5, 54.6], [-10, 54], [-9.8, 52.2], [-8, 51.6]],
        [[-22, 64], [-24, 65.5], [-21, 66.2], [-16, 66.5], [-14, 65.3], [-15, 64.3], [-18, 63.4]],
        [[-73, 78], [-60, 82], [-30, 83], [-20, 81], [-18, 77], [-22, 72], [-22, 70], [-30, 68], [-38, 65.5], [-43, 60], [-48, 61], [-52, 65], [-54, 69], [-58, 75], [-66, 76]],
        [[44, -25], [47, -25], [50, -15], [49.5, -12], [47, -15.5], [43.5, -21]],
        [[-80, -5], [-81, -1], [-78, 1], [-77, 7], [-73, 11.5], [-64, 10.5], [-60, 8.5], [-52, 5], [-50, 0], [-44, -2.5], [-35, -5.5], [-35, -9], [-39, -15], [-40, -22], [-48, -26], [-53, -34], [-58, -38], [-62, -39], [-65, -42], [-67, -46], [-69, -52], [-72, -50], [-75, -45], [-73, -37], [-71, -30], [-71, -18], [-76, -14], [-81, -6]],
        [[-125, 49], [-124, 40], [-117, 32.5], [-110, 23], [-105, 20], [-97, 16], [-92, 14.5], [-87, 13], [-83, 9], [-79, 9], [-77, 8], [-81, 12], [-84, 15], [-87, 21], [-90, 21.2], [-91, 18.5], [-94, 18.2], [-97, 22], [-97.5, 26], [-94, 29.5], [-89, 30], [-85, 30], [-83, 29], [-81, 25.2], [-80, 25], [-80.5, 28], [-81, 31], [-76, 35], [-75.5, 38], [-74, 40.5], [-70, 41.5], [-70, 43.5], [-66, 44.8], [-64, 45.5], [-61, 45], [-60, 46.5], [-64, 48.5], [-59.5, 50], [-56, 52], [-56, 53.5], [-61, 56], [-64.5, 60], [-70, 59], [-78, 62], [-82, 63], [-92, 62], [-95, 68], [-110, 68], [-125, 70], [-140, 70], [-160, 70], [-165, 65], [-150, 60], [-135, 58], [-128, 52]],
        [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -28], [150, -37], [141, -38], [135, -35], [129, -32], [115, -34]]
    ];
    var HAV2 = [[[27.5, 41], [33, 41.5], [41.5, 41.5], [40, 43.5], [37, 45.2], [33.5, 44.5], [31, 46.6], [29.7, 45.2], [28.6, 44]],
                [[47, 45], [50, 46.5], [53, 46.5], [54, 42], [53, 38], [50, 37], [49, 40], [47.5, 43]]];
    function jordSpr() {
        return sprite('jord', 640, 640, function (g, n) {
            var tw = 1024, th = 512, tex = document.createElement('canvas');
            tex.width = tw; tex.height = th;
            var t = tex.getContext('2d');
            function poly(lista, col) {
                t.fillStyle = col;
                lista.forEach(function (p) {
                    t.beginPath();
                    p.forEach(function (q, i) { var x = (q[0] + 180) / 360 * tw, y = (90 - q[1]) / 180 * th; if (i) t.lineTo(x, y); else t.moveTo(x, y); });
                    t.closePath(); t.fill();
                });
            }
            poly(KONT, '#fff'); poly(HAV2, '#000');
            t.fillStyle = '#fff'; t.fillRect(0, (90 + 68) / 180 * th, tw, th);
            var land = t.getImageData(0, 0, tw, th).data;
            var img = g.createImageData(n, n), d = img.data;
            var phi0 = 8 * Math.PI / 180, lam0 = 15 * Math.PI / 180, sp = Math.sin(phi0), cp = Math.cos(phi0);
            var Lx = -0.45, Ly = 0.5, Lz = 0.74;
            for (var py = 0; py < n; py++) for (var px = 0; px < n; px++) {
                var nx = (px - n / 2 + 0.5) / (n / 2), ny = -(py - n / 2 + 0.5) / (n / 2), r2 = nx * nx + ny * ny;
                if (r2 > 1) continue;
                var nz = Math.sqrt(1 - r2), rho = Math.sqrt(r2), cc = Math.asin(Math.min(1, rho)), sc = Math.sin(cc), ccs = Math.cos(cc);
                var lat = rho < 1e-9 ? phi0 : Math.asin(ccs * sp + ny * sc * cp / rho);
                var lon = lam0 + Math.atan2(nx * sc, rho * ccs * cp - ny * sc * sp);
                var la = lat * 180 / Math.PI, lo = ((lon * 180 / Math.PI + 540) % 360) - 180;
                var u = Math.min(tw - 1, Math.max(0, ((lo + 180) / 360 * tw) | 0)), v = Math.min(th - 1, Math.max(0, ((90 - la) / 180 * th) | 0));
                var ar = land[(v * tw + u) * 4] > 128;
                var brus = Math.sin(lon * 9 + lat * 5) * 0.5 + Math.sin(lon * 23 - lat * 17) * 0.3 + Math.sin(lon * 51 + lat * 40) * 0.2;
                var col;
                if (ar) {
                    if (la > 70 && lo < -15 && lo > -75 || la < -66) col = [236, 242, 250];
                    else if ((la > 13 + 4 * brus && la < 32 + 3 * brus && lo > -17 && lo < 60) || (la > 15 + 3 * brus && la < 30 && lo > 60 && lo < 72) || (la < -20 + 3 * brus && la > -32 && lo > 118 && lo < 142)) col = blanda([214, 170, 104], [58, 150, 74], smooth(0.45, 0.9, Math.abs(la - 22) / 12));
                    else if (la > 62) col = [110, 140, 100];
                    else col = [58, 150, 74];
                    col = blanda(col, [30, 90, 40], 0.18 * (brus + 1) / 2);
                } else {
                    col = blanda([20, 90, 190], [10, 40, 120], (brus + 1) / 2 * 0.5);
                }
                var moln = Math.sin(lon * 6 + 1.3) * Math.sin(lat * 7 + 0.7) + 0.6 * Math.sin(lon * 13 - lat * 9 + 2) + 0.4 * Math.sin(lon * 27 + lat * 21 + 1);
                var ma = smooth(0.55, 1.15, moln) * 0.8 * Math.cos(lat);
                col = blanda(col, [250, 252, 255], ma);
                var ljus = 0.38 + 0.62 * Math.max(0, nx * Lx + ny * Ly + nz * Lz);
                var kant = Math.pow(1 - nz, 2.6);
                var r = col[0] * ljus, gg = col[1] * ljus, b = col[2] * ljus;
                r = r + (120 - r) * kant * 0.7; gg = gg + (190 - gg) * kant * 0.7; b = b + (255 - b) * kant * 0.7;
                var i4 = (py * n + px) * 4;
                d[i4] = r; d[i4 + 1] = gg; d[i4 + 2] = b;
                d[i4 + 3] = r2 > 0.985 ? 255 * (1 - r2) / 0.015 : 255;
            }
            g.putImageData(img, 0, 0);
        });
    }
    function ritaJorden(c, L) {
        var R = L.d / 2, W = L.W, H = L.H, z = L.z, a = L.a;
        var gA = 1 - smooth(2.5 * W, 6 * W, R), hA = smooth(2.5 * W, 6 * W, R);
        if (R < 1.5) { c.globalAlpha = a; c.fillStyle = '#5ab0ff'; c.beginPath(); c.arc(L.x, L.y, 1.8, 0, TAU); c.fill(); }
        else if (gA > 0.003) {
            lager(c);
            c.globalAlpha = a * gA * 0.55; bild(c, glowSpr([90, 170, 255]), L.x, L.y, R * 2.5);
            vanlig(c);
            c.globalAlpha = a * gA; bild(c, jordSpr(), L.x, L.y, 2 * R);
        }
        if (hA > 0.003) {
            c.globalAlpha = a * hA;
            var N = 40, pts = [];
            for (var i = 0; i <= N; i++) {
                var x = -20 + (W + 40) * i / N, dx = x - L.x, v = R * R - dx * dx;
                pts.push([x, v > 0 ? L.y - Math.sqrt(v) : L.y]);
            }
            var ymid = pts[N >> 1][1];
            if (ymid < H + 20) {
                var t0, t1;
                if (z < 1) { t0 = hexRgb('#5ccf62'); t1 = hexRgb('#1f7a35'); }
                else if (z < 3) { var f = (z - 1) / 2; t0 = blanda(hexRgb('#5ccf62'), hexRgb('#3b8f4e'), f); t1 = blanda(hexRgb('#1f7a35'), hexRgb('#18452a'), f); }
                else { var f2 = smooth(3, 4.8, z); t0 = blanda(hexRgb('#3b8f4e'), hexRgb('#4a90d8'), f2); t1 = blanda(hexRgb('#18452a'), hexRgb('#0d2e57'), f2); }
                var gr = c.createLinearGradient(0, ymid, 0, ymid + Math.max(60, 0.6 * H));
                gr.addColorStop(0, rgba(t0, 1)); gr.addColorStop(1, rgba(t1, 1));
                c.fillStyle = gr;
                c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
                for (i = 1; i <= N; i++) c.lineTo(pts[i][0], pts[i][1]);
                c.lineTo(W + 20, H + 20); c.lineTo(-20, H + 20); c.closePath(); c.fill();
                var atm = smooth(3.4, 4.6, z), band = 1e5 * L.k;
                if (atm > 0.01) {
                    lager(c);
                    var ag = c.createLinearGradient(0, ymid, 0, ymid - band * 1.3);
                    ag.addColorStop(0, 'rgba(130,215,255,' + 0.75 * atm + ')'); ag.addColorStop(0.35, 'rgba(70,150,255,' + 0.35 * atm + ')'); ag.addColorStop(1, 'rgba(60,110,255,0)');
                    c.fillStyle = ag;
                    c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
                    for (i = 1; i <= N; i++) c.lineTo(pts[i][0], pts[i][1]);
                    for (i = N; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] - band * 1.3);
                    c.closePath(); c.fill();
                    vanlig(c);
                }
                if (z < 0.8) {
                    var k = L.k, R2 = rng(4);
                    c.strokeStyle = 'rgba(30,120,50,0.9)'; c.lineWidth = Math.max(1, 0.006 * k); c.lineCap = 'round';
                    c.beginPath();
                    for (i = 0; i < 160; i++) {
                        var xm = -3.2 + 6.4 * i / 160 + (R2() - 0.5) * 0.03, hh = 0.05 + R2() * 0.09;
                        var gx = L.cx + xm * k, gy = L.cy + 1.25 * k;
                        if (gx < -5 || gx > W + 5) continue;
                        c.moveTo(gx, gy + 2); c.quadraticCurveTo(gx + 0.01 * k, gy - hh * 0.6 * k, gx + (R2() - 0.4) * 0.04 * k, gy - hh * k);
                    }
                    c.stroke();
                }
            }
        }
    }

    // ── Månen ──────────────────────────────────────────────────────────
    function maneSpr() {
        return sprite('mane', 256, 256, function (g, n) {
            var c = n / 2, R = rng(12);
            g.beginPath(); g.arc(c, c, c - 1, 0, TAU); g.clip();
            var gr = g.createRadialGradient(c * 0.75, c * 0.7, 4, c, c, c);
            gr.addColorStop(0, '#f2f2f6'); gr.addColorStop(0.7, '#b8b8c4'); gr.addColorStop(1, '#6a6a78');
            g.fillStyle = gr; g.fillRect(0, 0, n, n);
            g.fillStyle = 'rgba(70,72,90,0.5)';
            [[0.38, 0.32, 0.17, 0.13], [0.62, 0.36, 0.1, 0.09], [0.66, 0.5, 0.12, 0.1], [0.3, 0.52, 0.16, 0.2], [0.5, 0.62, 0.08, 0.07], [0.72, 0.64, 0.07, 0.06]].forEach(function (m) {
                g.beginPath(); g.ellipse(m[0] * n, m[1] * n, m[2] * n, m[3] * n, 0.3, 0, TAU); g.fill();
            });
            for (var i = 0; i < 50; i++) {
                var x = R() * n, y = R() * n, r = 1 + R() * 6;
                g.strokeStyle = 'rgba(255,255,255,0.25)'; g.lineWidth = 1; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
                g.fillStyle = 'rgba(40,40,60,0.15)'; g.beginPath(); g.arc(x + 0.5, y + 0.5, r * 0.8, 0, TAU); g.fill();
            }
        });
    }
    function ritaMane(c, L) { c.globalAlpha = L.a; bild(c, maneSpr(), L.x, L.y, L.d); }
    function ritaManbana(c, L) {
        var R = L.d / 2, a = L.a;
        c.globalAlpha = a;
        c.setLineDash([5, 6]);
        c.strokeStyle = 'rgba(200,210,255,0.5)'; c.lineWidth = 1.2;
        c.beginPath(); c.arc(L.x, L.y, R, 0, TAU); c.stroke();
        c.setLineDash([]);
        var v = 0.44, mx = L.x + Math.cos(v) * R, my = L.y - Math.sin(v) * R;
        bild(c, maneSpr(), mx, my, Math.max(3.47e6 * L.k, 5));
        L.etiketter.push({ x: mx, y: my, r: 4, namn: 'Månen', matt: '384' + NB + '000' + NB + 'km bort', pri: 2 });
    }

    // ── Solen och Jupiter ──────────────────────────────────────────────
    function solSpr() {
        return sprite('sol', 512, 512, function (g, n) {
            var c = n / 2, R = rng(19), i;
            g.beginPath(); g.arc(c, c, c - 1, 0, TAU); g.clip();
            var gr = g.createRadialGradient(c, c, 0, c, c, c);
            gr.addColorStop(0, '#fffbe0'); gr.addColorStop(0.5, '#ffd64a'); gr.addColorStop(0.86, '#ffa21a'); gr.addColorStop(1, '#ff6a00');
            g.fillStyle = gr; g.fillRect(0, 0, n, n);
            for (i = 0; i < 6000; i++) {
                var rr = Math.sqrt(R()) * c, th = R() * TAU;
                g.fillStyle = R() < 0.5 ? 'rgba(255,255,220,0.08)' : 'rgba(200,80,0,0.08)';
                g.beginPath(); g.arc(c + Math.cos(th) * rr, c + Math.sin(th) * rr, 1.5 + R() * 2.5, 0, TAU); g.fill();
            }
            [[0.62, 0.42, 9], [0.66, 0.45, 6], [0.35, 0.6, 7], [0.3, 0.58, 4]].forEach(function (f) {
                g.fillStyle = 'rgba(160,70,0,0.55)'; g.beginPath(); g.arc(f[0] * n, f[1] * n, f[2] * 1.8, 0, TAU); g.fill();
                g.fillStyle = 'rgba(70,20,0,0.85)'; g.beginPath(); g.arc(f[0] * n, f[1] * n, f[2], 0, TAU); g.fill();
            });
        });
    }
    function ritaSolen(c, L) {
        var a = L.a;
        lager(c);
        c.globalAlpha = a * 0.75; bild(c, glowSpr([255, 170, 60]), L.x, L.y, L.d * 1.8);
        c.globalAlpha = a * 0.35; bild(c, glowSpr([255, 90, 30]), L.x, L.y, L.d * 2.8);
        vanlig(c);
        c.globalAlpha = a; bild(c, solSpr(), L.x, L.y, L.d);
    }
    function jupSpr() {
        return sprite('jup', 256, 256, function (g, n) {
            var c = n / 2, pal = ['#f1e3c8', '#c98a5a', '#ead2ae', '#b8754a', '#f5e8d0', '#d49a66', '#e8cfa6', '#a8653e', '#f0dcbc', '#c48a5c', '#e6cca4', '#b07040', '#efe0c4'];
            g.beginPath(); g.arc(c, c, c - 1, 0, TAU); g.clip();
            for (var y = 0; y < n; y++) {
                var lat = y / n * 2 - 1, b = Math.floor((lat + 1) * 6.4 + 0.25 * Math.sin(y * 0.3)) % pal.length;
                g.fillStyle = pal[(b + pal.length) % pal.length];
                g.fillRect(0, y, n, 1.4);
            }
            g.fillStyle = '#c4502e'; g.beginPath(); g.ellipse(0.64 * n, 0.66 * n, 0.11 * n, 0.065 * n, 0, 0, TAU); g.fill();
            g.strokeStyle = '#f5d8b8'; g.lineWidth = 3; g.stroke();
            var sk = g.createRadialGradient(c * 0.8, c * 0.75, c * 0.2, c, c, c);
            sk.addColorStop(0, 'rgba(0,0,0,0)'); sk.addColorStop(0.75, 'rgba(0,0,0,0.12)'); sk.addColorStop(1, 'rgba(20,0,0,0.55)');
            g.fillStyle = sk; g.fillRect(0, 0, n, n);
        });
    }
    function ritaJupiter(c, L) { c.globalAlpha = L.a; bild(c, jupSpr(), L.x, L.y, L.d); }

    // ── Solsystemet ────────────────────────────────────────────────────
    var PLANETER = [['Merkurius', 0.387, '#c9b8aa', 2.44e6, 2.1], ['Venus', 0.723, '#ffd99a', 6.05e6, 4.0], ['Jorden', 1, '#4aa3ff', 6.37e6, 0],
                    ['Mars', 1.524, '#ff6a3d', 3.39e6, 1.2], ['Jupiter', 5.203, '#f0c08a', 6.99e7, 3.3], ['Saturnus', 9.537, '#f5dc9a', 5.82e7, 5.0],
                    ['Uranus', 19.19, '#8ff0ff', 2.54e7, 2.4], ['Neptunus', 30.07, '#6b8cff', 2.46e7, 0.6]];
    var KUIPER = null;
    function ritaSolsystem(c, L) {
        var k = L.k, a = L.a, i;
        if (!KUIPER) { var R = rng(23); KUIPER = []; for (i = 0; i < 700; i++) KUIPER.push([(30 + R() * 20) * AU, R() * TAU]); }
        c.globalAlpha = a;
        c.lineWidth = 1;
        for (i = 0; i < PLANETER.length; i++) {
            var p = PLANETER[i], r = p[1] * AU * k;
            if (r < 2) continue;
            c.strokeStyle = p[0] === 'Jorden' ? 'rgba(120,190,255,0.75)' : 'rgba(150,180,255,0.32)';
            c.beginPath(); c.arc(L.x, L.y, r, 0, TAU); c.stroke();
        }
        c.fillStyle = 'rgba(170,190,230,0.55)';
        for (i = 0; i < KUIPER.length; i++) {
            var q = KUIPER[i];
            c.fillRect(L.x + Math.cos(q[1]) * q[0] * k, L.y - Math.sin(q[1]) * q[0] * k, 1.2, 1.2);
        }
        lager(c);
        bild(c, glowSpr([255, 190, 80]), L.x, L.y, Math.max(1.39e9 * k * 3, 22));
        vanlig(c);
        c.fillStyle = '#fff3c0'; c.beginPath(); c.arc(L.x, L.y, Math.max(1.39e9 * k / 2, 3.5), 0, TAU); c.fill();
        L.etiketter.push({ x: L.x, y: L.y, r: 6, namn: 'Solen', matt: '', pri: 1 });
        for (i = 0; i < PLANETER.length; i++) {
            var pl = PLANETER[i], rr = pl[1] * AU * k;
            var x = L.x + Math.cos(pl[4]) * rr, y = L.y - Math.sin(pl[4]) * rr, pr = Math.max(pl[3] * k, 2.3);
            if (!synlig(L, x, y, 10)) continue;
            c.fillStyle = pl[2]; c.beginPath(); c.arc(x, y, pr, 0, TAU); c.fill();
            if (pl[0] === 'Saturnus') { c.strokeStyle = 'rgba(245,220,154,0.8)'; c.beginPath(); c.ellipse(x, y, pr * 2.2, pr * 0.8, -0.3, 0, TAU); c.stroke(); }
            if (rr > 22 && rr < 2.2 * L.W) L.etiketter.push({ x: x, y: y, r: pr + 2, namn: pl[0], matt: pl[0] === 'Jorden' ? 'du är här' : '', pri: pl[0] === 'Jorden' ? 1 : 3 });
        }
    }

    // ── Oorts moln ─────────────────────────────────────────────────────
    function oortSpr() {
        return sprite('oort', 512, 512, function (g, n) {
            var c = n / 2, R = rng(29);
            for (var i = 0; i < 7000; i++) {
                var u = R() * 2 - 1, th = R() * TAU, rr = Math.pow(0.18 + 0.82 * R(), 0.33) * c * 0.98, s = Math.sqrt(1 - u * u);
                g.fillStyle = 'rgba(190,225,255,' + (0.18 + R() * 0.3) + ')';
                g.fillRect(c + s * Math.cos(th) * rr, c + s * Math.sin(th) * rr, 1.2, 1.2);
            }
        });
    }
    function ritaOort(c, L) {
        c.globalAlpha = L.a;
        bild(c, oortSpr(), L.x, L.y, L.d);
        lager(c);
        bild(c, glowSpr([255, 220, 140]), L.x, L.y, 16);
        vanlig(c);
    }

    // ── Solens närmaste grannar ────────────────────────────────────────
    var GRANNAR = [['Solen', 0, 0, [255, 230, 150], 16, ''], ['Alfa Centauri', 4.37, 3.75, [255, 240, 200], 18, '4,4' + NB + 'ljusår'],
                   ['Barnards stjärna', 5.96, 0.7, [255, 120, 80], 9, '6,0' + NB + 'ljusår'], ['Wolf 359', 7.86, 1.95, [255, 110, 70], 8, '7,9' + NB + 'ljusår'],
                   ['Sirius', 8.6, 5.3, [190, 215, 255], 26, '8,6' + NB + 'ljusår'], ['Epsilon Eridani', 10.5, 4.6, [255, 190, 120], 11, '10,5' + NB + 'ljusår']];
    function ritaGrannar(c, L) {
        c.globalAlpha = L.a;
        lager(c);
        for (var i = 0; i < GRANNAR.length; i++) {
            var g = GRANNAR[i], x = L.x + Math.cos(g[2]) * g[1] * LY * L.k, y = L.y - Math.sin(g[2]) * g[1] * LY * L.k;
            if (!synlig(L, x, y, 20)) continue;
            bild(c, glowSpr(g[3]), x, y, g[4] * 2.2);
            bild(c, glowSpr([255, 255, 255]), x, y, g[4] * 0.5);
            if (i > 0 || L.d < 3 * L.W) L.etiketter.push({ x: x, y: y, r: g[4] * 0.4, namn: g[0], matt: g[5], pri: i === 0 ? 2 : 3 });
        }
        vanlig(c);
    }

    // ── Solens grannskap: stjärnfält ───────────────────────────────────
    var STJ = null, STJF = [[170, 200, 255], [220, 230, 255], [255, 250, 235], [255, 225, 160], [255, 170, 110], [255, 120, 90]];
    function ritaStjarnfalt(c, L) {
        var k = L.k, a = L.a, i;
        if (!STJ) {
            var R = rng(37); STJ = [];
            for (i = 0; i < 1600; i++) { var rr = Math.sqrt(R()) * 2.2e19, th = R() * TAU; if (rr < 2e17) continue; STJ.push([Math.cos(th) * rr, Math.sin(th) * rr, Math.pow(R(), 3), (R() * STJF.length) | 0]); }
        }
        lager(c);
        for (i = 0; i < STJ.length; i++) {
            var s = STJ[i], x = L.x + s[0] * k, y = L.y - s[1] * k;
            if (x < -4 || x > L.W + 4 || y < -4 || y > L.H + 4) continue;
            var sz = 0.7 + 1.9 * s[2];
            c.fillStyle = rgba(STJF[s[3]], (0.35 + 0.65 * s[2]) * a);
            c.fillRect(x - sz / 2, y - sz / 2, sz, sz);
            if (s[2] > 0.82) { c.globalAlpha = a * 0.7; bild(c, glowSpr(STJF[s[3]]), x, y, 12); c.globalAlpha = 1; }
        }
        var ox = L.x + 1.0e19 * k, oy = L.y + 0.78e19 * k, or = Math.max(2.3e17 * k * 3, 26);
        c.globalAlpha = a * 0.85; bild(c, glowSpr([255, 80, 170]), ox, oy, or * 2);
        c.globalAlpha = a * 0.6; bild(c, glowSpr([60, 230, 220]), ox + or * 0.2, oy - or * 0.15, or * 1.2);
        L.etiketter.push({ x: ox, y: oy, r: or * 0.4, namn: 'Orionnebulosan', matt: '1' + NB + '300' + NB + 'ljusår bort', pri: 2 });
        var px = L.x - 3.0e18 * k, py = L.y - 2.9e18 * k, R2 = rng(41);
        c.globalAlpha = a * 0.6; bild(c, glowSpr([90, 150, 255]), px, py, Math.max(30, 1.5e17 * k * 4));
        for (i = 0; i < 7; i++) { c.globalAlpha = a; bild(c, glowSpr([170, 205, 255]), px + gauss(R2) * Math.max(5, 4e16 * k), py + gauss(R2) * Math.max(5, 4e16 * k), 9); }
        L.etiketter.push({ x: px, y: py, r: 8, namn: 'Plejaderna', matt: '440' + NB + 'ljusår bort', pri: 2 });
        c.globalAlpha = 1;
        vanlig(c);
    }

    // ── Galaxer ────────────────────────────────────────────────────────
    function galaxSpr(namn, seed, opt) {
        return sprite(namn, opt.n, opt.n, function (g, n) {
            var R = rng(seed), c = n / 2, Rg = c * 0.96, b = Math.tan(opt.pitch), i, j;
            g.globalCompositeOperation = 'lighter';
            var gr = g.createRadialGradient(c, c, 0, c, c, Rg);
            gr.addColorStop(0, 'rgba(255,220,170,0.5)'); gr.addColorStop(0.18, 'rgba(255,170,110,0.22)');
            gr.addColorStop(0.5, 'rgba(110,140,255,0.1)'); gr.addColorStop(1, 'rgba(80,110,255,0)');
            g.fillStyle = gr; g.beginPath(); g.arc(c, c, Rg, 0, TAU); g.fill();
            var r0 = 0.12 * Rg;
            function arm(fas, antal, bred, inat) {
                for (var k = 0; k < antal; k++) {
                    var f = Math.pow(R(), 0.85), r = Rg * (0.12 + 0.86 * f);
                    var th = fas + Math.log(r / r0) / b - (inat || 0);
                    var sp = (0.025 + 0.06 * f) * Rg * bred;
                    var x = c + r * Math.cos(th) + gauss(R) * sp, y = c + r * Math.sin(th) + gauss(R) * sp;
                    if (inat) { g.beginPath(); g.arc(x, y, 1.4 + R() * 2.4, 0, TAU); g.fill(); continue; }
                    if (R() < 0.025) { g.fillStyle = 'rgba(255,80,170,' + (0.35 + R() * 0.4) + ')'; g.beginPath(); g.arc(x, y, 1.2 + R() * 1.8, 0, TAU); g.fill(); }
                    else { g.fillStyle = R() < 0.7 ? 'rgba(175,205,255,' + (0.18 + R() * 0.4) + ')' : 'rgba(255,255,255,' + (0.2 + R() * 0.45) + ')'; var s = 0.6 + R() * 1.1; g.fillRect(x, y, s, s); }
                }
            }
            for (i = 0; i < opt.armar.length; i++) arm(opt.armar[i][0], opt.armar[i][1], opt.armar[i][2]);
            for (i = 0; i < opt.halo; i++) { var rr = Math.abs(gauss(R)) * Rg * 0.45, tt = R() * TAU; g.fillStyle = 'rgba(255,240,215,' + (0.1 + R() * 0.25) + ')'; g.fillRect(c + Math.cos(tt) * rr, c + Math.sin(tt) * rr, 1, 1); }
            g.globalCompositeOperation = 'destination-out';
            g.fillStyle = 'rgba(0,0,0,0.13)';
            for (i = 0; i < opt.armar.length; i++) arm(opt.armar[i][0], opt.armar[i][1] * 0.12, 0.5, 0.22);
            g.globalCompositeOperation = 'lighter';
            for (j = 0; j < opt.bula; j++) { var br = Math.abs(gauss(R)) * Rg * 0.075, bt = R() * TAU; g.fillStyle = 'rgba(255,215,150,' + (0.15 + R() * 0.3) + ')'; g.fillRect(c + Math.cos(bt) * br * 1.6, c + Math.sin(bt) * br, 1.2, 1.2); }
            g.save(); g.translate(c, c); g.rotate(0.45); g.scale(1, opt.stav ? 0.32 : 0.85);
            var bg = g.createRadialGradient(0, 0, 0, 0, 0, Rg * (opt.stav ? 0.22 : 0.14));
            bg.addColorStop(0, 'rgba(255,245,210,0.95)'); bg.addColorStop(0.4, 'rgba(255,190,110,0.45)'); bg.addColorStop(1, 'rgba(255,150,80,0)');
            g.fillStyle = bg; g.beginPath(); g.arc(0, 0, Rg * (opt.stav ? 0.22 : 0.14), 0, TAU); g.fill();
            g.restore();
        });
    }
    function vgSpr() {
        return galaxSpr('vg', 3, { n: 1024, pitch: 0.22, stav: true, halo: 5000, bula: 9000,
            armar: [[0, 14000, 1], [Math.PI, 14000, 1], [Math.PI / 2, 6000, 1.4], [Math.PI * 1.5, 6000, 1.4]] });
    }
    function ritaVintergatan(c, L) {
        c.globalAlpha = L.a;
        bild(c, vgSpr(), L.x, L.y, L.d);
        if (L.d > 0.15 * L.W) {
            var sx = L.x + (S[0] - G[0]) * L.k, sy = L.y - (S[1] - G[1]) * L.k;
            c.strokeStyle = 'rgba(255,240,120,' + 0.95 * L.a + ')'; c.lineWidth = 1.6;
            c.beginPath(); c.arc(sx, sy, 7, 0, TAU); c.stroke();
            L.etiketter.push({ x: sx, y: sy, r: 8, namn: 'Du är här', matt: '', pri: 1 });
        }
    }
    function ritaLokala(c, L) {
        var k = L.k, a = L.a, R = rng(71), i;
        var andr = galaxSpr('andr', 8, { n: 512, pitch: 0.16, stav: false, halo: 2500, bula: 3500, armar: [[0, 7000, 0.9], [Math.PI, 7000, 0.9]] });
        var ax = L.x + (ANDR[0] - L.ox) * k, ay = L.y - (ANDR[1] - L.oy) * k, ad = 2.2e21 * k * clamp(0.07 * L.W / (2.2e21 * k), 1, 2.5);
        lager(c); c.globalAlpha = a * 0.6; bild(c, glowSpr([170, 190, 255]), ax, ay, ad * 0.9); vanlig(c); c.globalAlpha = a;
        c.globalAlpha = a;
        c.save(); c.translate(ax, ay); c.rotate(-0.62); c.scale(1, 0.3); c.drawImage(andr, -ad / 2, -ad / 2, ad, ad); c.restore();
        if (2.2e21 * k > 0.012 * L.W) L.etiketter.push({ x: ax, y: ay, r: ad * 0.3, namn: 'Andromedagalaxen', matt: '2,5' + NB + 'miljoner ljusår bort', pri: 2 });
        var mx = L.x + (M33[0] - L.ox) * k, my = L.y - (M33[1] - L.oy) * k, md = 6e20 * k * clamp(0.035 * L.W / (6e20 * k), 1, 2.5);
        c.save(); c.translate(mx, my); c.rotate(0.5); c.scale(1, 0.7); c.drawImage(andr, -md / 2, -md / 2, md, md); c.restore();
        if (6e20 * k > 0.006 * L.W) L.etiketter.push({ x: mx, y: my, r: md * 0.4, namn: 'Triangelgalaxen', matt: '', pri: 3 });
        lager(c);
        for (i = 0; i < 40; i++) {
            var rr = Math.sqrt(R()) * 4.8e22, th = R() * TAU;
            var x = L.x + Math.cos(th) * rr * k, y = L.y - Math.sin(th) * rr * k;
            c.globalAlpha = a * (0.3 + R() * 0.5);
            bild(c, glowSpr([255, 225, 190]), x, y, Math.max(3, 3e20 * k * (0.5 + R())));
        }
        vanlig(c);
    }
    function virgoSpr() {
        return sprite('virgo', 512, 512, function (g, n) {
            var c = n / 2, R = rng(83);
            g.globalCompositeOperation = 'lighter';
            var gr = g.createRadialGradient(c, c, 0, c, c, c);
            gr.addColorStop(0, 'rgba(255,210,150,0.35)'); gr.addColorStop(0.5, 'rgba(255,170,120,0.08)'); gr.addColorStop(1, 'rgba(255,170,120,0)');
            g.fillStyle = gr; g.fillRect(0, 0, n, n);
            for (var i = 0; i < 480; i++) {
                var rr = Math.min(0.97, Math.abs(gauss(R)) * 0.36) * c, th = R() * TAU, s = 2 + Math.pow(R(), 3) * 9;
                g.globalAlpha = 0.5 + R() * 0.5;
                g.drawImage(glowSpr(R() < 0.7 ? [255, 225, 170] : [170, 200, 255]), c + Math.cos(th) * rr - s / 2, c + Math.sin(th) * rr - s / 2, s, s);
            }
            g.globalAlpha = 1;
            g.drawImage(glowSpr([255, 235, 190]), c - 34, c - 34, 68, 68);
        });
    }
    function ritaVirgo(c, L) { c.globalAlpha = L.a; bild(c, virgoSpr(), L.x, L.y, L.d); }
    function laniSpr() {
        return sprite('lani', 1024, 1024, function (g, n) {
            var c = n / 2, Rg = c * 0.95, R = rng(97), i, j;
            g.globalCompositeOperation = 'lighter';
            var cyan = [86, 200, 255], guld = [255, 205, 85];
            for (i = 0; i < 190; i++) {
                var th = R() * TAU, r = Rg * (0.6 + R() * 0.38), p = [Math.cos(th) * r, Math.sin(th) * r], fas = R() * TAU, pts = [p.slice()];
                for (j = 0; j < 110; j++) {
                    var len = Math.hypot(p[0], p[1]);
                    if (len < 0.035 * Rg) break;
                    var dx = -p[0] / len, dy = -p[1] / len, v = Math.atan2(p[1], p[0]);
                    var sw = 0.55 * Math.sin(3 * v + fas) + 0.25 * Math.sin(7 * v - fas);
                    var vx = dx - dy * sw, vy = dy + dx * sw, vl = Math.hypot(vx, vy);
                    p = [p[0] + vx / vl * 0.011 * Rg, p[1] + vy / vl * 0.011 * Rg];
                    pts.push(p.slice());
                }
                for (j = 1; j < pts.length; j++) {
                    var f = 1 - Math.hypot(pts[j][0], pts[j][1]) / Rg;
                    g.strokeStyle = rgba(blanda(cyan, guld, clamp(f * 1.3, 0, 1)), 0.16 + 0.22 * f);
                    g.lineWidth = 1.3;
                    g.beginPath(); g.moveTo(c + pts[j - 1][0], c + pts[j - 1][1]); g.lineTo(c + pts[j][0], c + pts[j][1]); g.stroke();
                    if (j % 4 === 0) { g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillRect(c + pts[j][0], c + pts[j][1], 1.4, 1.4); }
                }
            }
            g.drawImage(glowSpr([255, 200, 90]), c - 90, c - 90, 180, 180);
            g.setLineDash([4, 7]); g.strokeStyle = 'rgba(255,210,130,0.45)'; g.lineWidth = 2;
            g.beginPath();
            for (i = 0; i <= 80; i++) { var v2 = i / 80 * TAU, rr = Rg * (0.97 + 0.03 * Math.sin(5 * v2)); if (i) g.lineTo(c + Math.cos(v2) * rr, c + Math.sin(v2) * rr); else g.moveTo(c + rr, c); }
            g.stroke();
        });
    }
    function ritaLaniakea(c, L) {
        c.globalAlpha = L.a;
        bild(c, laniSpr(), L.x, L.y, L.d);
        var vx = L.x + (G[0] - LANI[0]) * L.k, vy = L.y - (G[1] - LANI[1]) * L.k;
        if (L.d > 0.2 * L.W) {
            c.strokeStyle = 'rgba(255,240,120,' + 0.9 * L.a + ')'; c.lineWidth = 1.5;
            c.beginPath(); c.arc(vx, vy, 6, 0, TAU); c.stroke();
            L.etiketter.push({ x: vx, y: vy, r: 7, namn: 'Vintergatan', matt: '', pri: 1 });
        }
    }
    function univSpr() {
        return sprite('univ', 2048, 2048, function (g, n) {
            var c = n / 2, Rg = c * 0.985, R = rng(101), i, j;
            var bg = g.createRadialGradient(c, c, 0, c, c, Rg);
            bg.addColorStop(0, 'rgba(20,10,60,0.85)'); bg.addColorStop(0.85, 'rgba(25,10,70,0.75)'); bg.addColorStop(1, 'rgba(40,10,60,0.6)');
            g.fillStyle = bg; g.beginPath(); g.arc(c, c, Rg, 0, TAU); g.fill();
            g.globalCompositeOperation = 'lighter';
            var noder = [];
            for (i = 0; noder.length < 210 && i < 8000; i++) {
                var rr = Math.sqrt(R()) * 0.9 * Rg, th = R() * TAU, p = [c + Math.cos(th) * rr, c + Math.sin(th) * rr], ok = true;
                for (j = 0; j < noder.length; j++) if (Math.hypot(noder[j][0] - p[0], noder[j][1] - p[1]) < 0.062 * Rg) { ok = false; break; }
                if (ok) noder.push(p);
            }
            for (i = 0; i < noder.length; i++) {
                var dist = noder.map(function (q, ix) { return [Math.hypot(q[0] - noder[i][0], q[1] - noder[i][1]), ix]; }).sort(function (a, b) { return a[0] - b[0]; });
                for (j = 1; j <= 3; j++) {
                    var q = noder[dist[j][1]];
                    if (dist[j][1] < i && j > 1) continue;
                    var mx = (noder[i][0] + q[0]) / 2 + gauss(R) * 0.15 * dist[j][0], my = (noder[i][1] + q[1]) / 2 + gauss(R) * 0.15 * dist[j][0];
                    var bredd = [[10, 'rgba(140,80,255,0.06)'], [3, 'rgba(200,120,255,0.16)'], [1, 'rgba(255,200,255,0.32)']];
                    for (var b = 0; b < 3; b++) {
                        g.strokeStyle = bredd[b][1]; g.lineWidth = bredd[b][0];
                        g.beginPath(); g.moveTo(noder[i][0], noder[i][1]); g.quadraticCurveTo(mx, my, q[0], q[1]); g.stroke();
                    }
                    for (var s = 0; s < 40; s++) {
                        var t = R(), x = (1 - t) * (1 - t) * noder[i][0] + 2 * (1 - t) * t * mx + t * t * q[0], y = (1 - t) * (1 - t) * noder[i][1] + 2 * (1 - t) * t * my + t * t * q[1];
                        g.fillStyle = 'rgba(255,220,255,0.6)'; g.fillRect(x + gauss(R) * 3, y + gauss(R) * 3, 1.6, 1.6);
                    }
                }
            }
            for (i = 0; i < 6000; i++) { var fr = Math.sqrt(R()) * 0.92 * Rg, ft = R() * TAU; g.fillStyle = 'rgba(210,190,255,' + (0.08 + R() * 0.2) + ')'; g.fillRect(c + Math.cos(ft) * fr, c + Math.sin(ft) * fr, 1.4, 1.4); }
            for (i = 0; i < noder.length; i++) {
                var sz = 8 + R() * 20;
                g.drawImage(glowSpr(R() < 0.5 ? [255, 120, 220] : [200, 160, 255]), noder[i][0] - sz, noder[i][1] - sz, sz * 2, sz * 2);
                g.drawImage(glowSpr([255, 255, 255]), noder[i][0] - 4, noder[i][1] - 4, 8, 8);
            }
            g.globalCompositeOperation = 'source-over';
            var kall = [[30, 60, 220], [80, 160, 255], [240, 240, 230], [255, 170, 60], [230, 60, 30]];
            for (i = 0; i < 26000; i++) {
                var v = R() * TAU, r = Rg * (0.935 + R() * 0.06);
                var nv = Math.sin(v * 7 + 1) * 0.5 + Math.sin(v * 19 + 2) * 0.3 + Math.sin(v * 41 + (r / Rg) * 60) * 0.25 + gauss(R) * 0.25;
                var ix = clamp((nv + 1) / 2 * (kall.length - 1), 0, kall.length - 1.001), lo = Math.floor(ix);
                g.fillStyle = rgba(blanda(kall[lo], kall[lo + 1], ix - lo), 0.85);
                g.fillRect(c + Math.cos(v) * r, c + Math.sin(v) * r, 3, 3);
            }
            g.globalCompositeOperation = 'lighter';
            g.strokeStyle = 'rgba(255,120,60,0.35)'; g.lineWidth = 6;
            g.beginPath(); g.arc(c, c, Rg, 0, TAU); g.stroke();
        });
    }
    function ritaUniversum(c, L) {
        c.globalAlpha = L.a;
        bild(c, univSpr(), L.x, L.y, L.d);
        if (L.d > 0.25 * L.W && L.d < 3 * L.W) {
            c.strokeStyle = 'rgba(255,240,120,' + L.a + ')'; c.lineWidth = 1.6;
            c.beginPath(); c.moveTo(L.x - 9, L.y); c.lineTo(L.x + 9, L.y); c.moveTo(L.x, L.y - 9); c.lineTo(L.x, L.y + 9); c.stroke();
            L.etiketter.push({ x: L.x, y: L.y, r: 9, namn: 'Du är här', matt: '', pri: 2 });
            L.etiketter.push({ x: L.x + L.d * 0.36, y: L.y + L.d * 0.36, r: 4, namn: 'Bakgrundsstrålningen', matt: '', pri: 3 });
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // LAGREN
    // ═══════════════════════════════════════════════════════════════════
    function lagerDef(o) {
        o.fin = o.fin || [-1.9, -1.2];
        o.fout = o.fout || [0.5, 1.1];
        o.off = o.off || [0, 0];
        if (o.info && o.zf == null) o.zf = lg(o.s) + 0.35;
        return o;
    }
    var LAGER = [
        lagerDef({ id: 'planck', s: 1.616e-35, fyll: 1, zon: [-99, -98, -33.3, -32.4], rita: ritaPlanck,
            info: { namn: 'Plancklängden', matt: '1,6' + NB + '·' + NB + '10^{' + MINUS + '35}' + NB + 'm', text: 'Den kortaste längd som fysiken kan säga något om. Många fysiker tror att rummet självt blir ett skummande kaos här, men ingen vet säkert. För att förstå det behövs en teori som förenar kvantfysiken med gravitationen, och någon sådan finns ännu inte.' }, zf: -34.4 }),
        lagerDef({ id: 'okant', s: 1e-26, fyll: 2, zon: [-33.5, -32.6, -19.6, -18.8], rita: ritaOkant,
            info: { namn: 'Okänt område', matt: '10^{' + MINUS + '34}' + NB + 'till' + NB + '10^{' + MINUS + '19}' + NB + 'm', text: 'Mellan plancklängden och de minsta avstånd som har mätts ligger 15 tiopotenser som ingen har kunnat undersöka. Kanske finns strängar här, kanske något helt annat. Här kan du bara gissa.' }, zf: -26 }),
        lagerDef({ id: 'kvark', s: 1e-18, zon: [-20, -19.4, -16.6, -16.0], fin: [-99, -98], fout: [98, 99], rita: ritaKvark,
            etikett: { namn: 'Kvark', matt: 'mindre än 10^{' + MINUS + '18}' + NB + 'm' },
            info: { namn: 'Kvark', matt: 'mindre än 10^{' + MINUS + '18}' + NB + 'm', text: 'Kvarkar och elektroner verkar sakna storlek. Inte ens i de kraftigaste partikelacceleratorerna har någon kunnat se att de har någon utsträckning. Den streckade ringen visar hur stor kvarken högst kan vara.' }, zf: -17.6 }),
        lagerDef({ id: 'proton', s: SP, off: POFF, fin: [-1.2, -0.5], fout: [0.9, 1.5], rita: ritaProton,
            info: { namn: 'Protonen', matt: '1,7' + NB + '·' + NB + '10^{' + MINUS + '15}' + NB + 'm', text: 'En proton består av tre kvarkar, två uppkvarkar (u) och en nedkvark (d), som hålls ihop av gluoner. Nästan hela protonens massa kommer från energin i gluonfältet och inte från kvarkarna själva. Färgerna står för kvarkarnas färgladdning, som inte har med vanliga färger att göra.' } }),
        lagerDef({ id: 'karna', s: 5e-15, off: NOFF, fin: [-1.6, -1.0], fout: [0.7, 1.3], rita: ritaKarna,
            etikett: { namn: 'Kolatomens kärna', matt: '5' + NB + '·' + NB + '10^{' + MINUS + '15}' + NB + 'm' },
            info: { namn: 'Kolatomens kärna', matt: '5' + NB + '·' + NB + '10^{' + MINUS + '15}' + NB + 'm', text: 'Sex protoner (röda) och sex neutroner (blå), packade så tätt att en tesked kärnmaterial skulle väga ungefär en miljard ton.' } }),
        lagerDef({ id: 'inuti', s: 4.5e-13, endastInfo: true,
            info: { namn: 'Inuti atomen', matt: '10^{' + MINUS + '12}' + NB + 'm', text: 'Här är det nästan helt tomt. Elektronmolnet är tunt, och kärnan i mitten syns bara som en ljus prick. Bilden är fortfarande flera hundra gånger bredare än kärnan.' } }),
        lagerDef({ id: 'atom', s: 2.2e-10, off: NOFF, fin: [-1.9, -1.2], fout: [2.6, 3.8], rita: ritaAtom,
            info: { namn: 'Kolatomen', matt: '2' + NB + '·' + NB + '10^{' + MINUS + '10}' + NB + 'm', text: 'Elektronerna har inga bestämda banor. De finns i ett moln, och där molnet lyser starkast är det mest sannolikt att hitta en elektron. Om kärnan vore stor som en ärta skulle atomen vara lika stor som en fotbollsarena.' } }),
        lagerDef({ id: 'molekyl', s: 1.2e-9, fin: [-1.6, -1.0], fout: [0.6, 1.2], rita: ritaMolekyl,
            etikett: { namn: 'Atomer i DNA', matt: '' },
            info: { namn: 'Atomer i en DNA-molekyl', matt: '10^{' + MINUS + '9}' + NB + 'm', text: 'Kol, kväve, syre, väte och fosfor sitter ihop i ett bestämt mönster. Atomerna har kemins vanliga färger: kol grå, syre röd, kväve blå, fosfor orange och väte vit.' } }),
        lagerDef({ id: 'dna', s: 2.4e-8, fin: [-1.5, -0.9], fout: [0.5, 1.2], rita: ritaDna,
            etikett: { namn: 'DNA', matt: '2' + NB + 'nm bred' },
            info: { namn: 'DNA', matt: '2' + NB + '·' + NB + '10^{' + MINUS + '9}' + NB + 'm bred', text: 'DNA är en dubbelspiral som bär arvsanlagen. Den är bara 2 nanometer bred, men DNA:t i en enda cell blir ungefär 2 meter långt om man sträcker ut det.' } }),
        lagerDef({ id: 'kromatin', s: 3e-7, fin: [-1.3, -0.8], fout: [0.5, 1.1], rita: ritaKromatin,
            etikett: { namn: 'Kromatin', matt: '' },
            info: { namn: 'Kromatin', matt: '10^{' + MINUS + '8}' + NB + 'm per pärla', text: 'För att få plats i cellkärnan är DNA:t lindat runt små proteinkulor, nukleosomer, som pärlor på ett snöre.' } }),
        lagerDef({ id: 'virus', s: 1.2e-7, off: [8e-8, 3.2e-8], jmf: true, fin: [-1.7, -1.1], fout: [0.4, 0.9], rita: ritaVirus,
            etikett: { namn: 'Virus', matt: '120' + NB + 'nm' },
            info: { namn: 'Virus', matt: '1,2' + NB + '·' + NB + '10^{' + MINUS + '7}' + NB + 'm', text: 'Ett coronavirus är så litet att det inte syns i ett vanligt ljusmikroskop. Synligt ljus har våglängder på 400 till 700 nanometer, och det är mer än hela viruset.' } }),
        lagerDef({ id: 'bakterie', s: 2e-6, off: [1.35e-6, -0.95e-6], jmf: true, fin: [-1.6, -1.0], fout: [0.4, 0.9], rita: ritaBakterie,
            etikett: { namn: 'Bakterie', matt: '2' + NB + 'µm' },
            info: { namn: 'Bakterie', matt: '2' + NB + '·' + NB + '10^{' + MINUS + '6}' + NB + 'm', text: 'Bakterien E. coli är en egen levande cell. I din tarm finns ungefär lika många bakterier som det finns celler i resten av kroppen.' } }),
        lagerDef({ id: 'cellkarna', s: 1e-5, fin: [-1.1, -0.6], fout: [0.8, 1.4], rita: ritaCellkarna,
            etikett: { namn: 'Cellkärnan', matt: '' },
            info: { namn: 'Cellkärnan', matt: '10^{' + MINUS + '5}' + NB + 'm', text: 'Cellkärnan rymmer cellens DNA. Det rosa området är kärnkroppen, där cellen bygger sina ribosomer.' } }),
        lagerDef({ id: 'blod', s: 7.5e-6, off: [-1.75e-5, -1.2e-5], jmf: true, fin: [-1.6, -1.1], fout: [0.3, 0.8], rita: ritaBlod,
            etikett: { namn: 'Röda blodkroppar', matt: '7,5' + NB + 'µm' },
            info: { namn: 'Röda blodkroppar', matt: '7,5' + NB + '·' + NB + '10^{' + MINUS + '6}' + NB + 'm', text: 'Röda blodkroppar transporterar syre. Kroppen tillverkar ungefär två miljoner nya varje sekund.' }, zf: -4.4 }),
        lagerDef({ id: 'cell', s: 3e-5, fin: [-0.9, -0.5], fout: [0.4, 1.0], rita: ritaCell,
            etikett: { namn: 'Hudcell', matt: '30' + NB + 'µm' },
            info: { namn: 'En hudcell', matt: '3' + NB + '·' + NB + '10^{' + MINUS + '5}' + NB + 'm', text: 'Kroppen består av ungefär 30 biljoner celler. Runt cellkärnan syns mitokondrierna (orange), som omvandlar energin i maten till en form som cellen kan använda.' } }),
        lagerDef({ id: 'hudceller', s: 4e-4, fyll: 4, zon: [-5.3, -4.9, -3.6, -3.1], rita: ritaHudceller }),
        lagerDef({ id: 'hud', s: 2e-3, fyll: 3, zon: [-3.95, -3.45, -2.8, -2.3], rita: ritaHud,
            info: { namn: 'Fingertoppens hud', matt: '10^{' + MINUS + '3}' + NB + 'm', text: 'Ränderna i huden ligger ungefär en halv millimeter isär, och prickarna är svettporer. Mönstret i ditt fingeravtryck är unikt. Inte ens enäggstvillingar har samma.' }, zf: -2.75 }),
        lagerDef({ id: 'har', s: 7e-5, jmf: false, fin: [-1.8, -1.2], fout: [0.6, 1.1], rita: ritaHar, ingenEtikett: true,
            info: { namn: 'Ett hårstrå', matt: '7' + NB + '·' + NB + '10^{' + MINUS + '5}' + NB + 'm tjockt', text: 'Ett hårstrå är ungefär 0,07 millimeter tjockt, nästan det tunnaste du kan se utan förstoring. Det växer ur en hårsäck, ett litet hål i huden.' }, zf: -3.6 }),
        lagerDef({ id: 'sand', s: 6e-4, off: [-3.3e-4, -3.1e-4], jmf: true, fin: [-1.6, -1.0], fout: [0.2, 0.5], rita: ritaSand,
            etikett: { namn: 'Sandkorn', matt: '0,6' + NB + 'mm' },
            info: { namn: 'Ett sandkorn', matt: '6' + NB + '·' + NB + '10^{' + MINUS + '4}' + NB + 'm', text: 'Enligt grova uppskattningar finns det fler stjärnor i det observerbara universum än sandkorn på alla jordens stränder.' } }),
        lagerDef({ id: 'myra', s: 5e-3, off: [2.6e-3, 1.4e-3], jmf: true, fin: [-1.7, -1.1], fout: [0.3, 0.8], rita: ritaMyra,
            etikett: { namn: 'Myra', matt: '5' + NB + 'mm' },
            info: { namn: 'En myra', matt: '5' + NB + '·' + NB + '10^{' + MINUS + '3}' + NB + 'm', text: 'En myra kan bära flera gånger sin egen tyngd. Små djur är starka i förhållande till sin storlek, eftersom musklernas styrka växer med tvärsnittsarean medan tyngden växer med volymen.' } }),
        lagerDef({ id: 'finger', s: 0.02, fin: [-1.5, -0.9], fout: [0.9, 1.4], rita: ritaFinger, ingenEtikett: true,
            info: { namn: 'Fingertoppen', matt: '2' + NB + '·' + NB + '10^{' + MINUS + '2}' + NB + 'm', text: 'Fingertopparna hör till kroppens känsligaste ställen. På en kvadratcentimeter sitter hundratals känselkroppar.' } }),
        lagerDef({ id: 'manniska', s: 1.7, off: [PERSON[0], PERSON[1]], mitt: [0, 0.85], fin: [-1.9, -1.3], fout: [1.0, 1.5], rita: ritaManniska,
            etikett: { namn: 'Människa', matt: '1,7' + NB + 'm' },
            info: { namn: 'Människa', matt: '1,7' + NB + 'm', text: 'En vuxen människa består av ungefär 7' + NB + '·' + NB + '10<sup>27</sup> atomer. Bildens mittpunkt sitter på hennes fingertopp, och det är dit du zoomar när du går mot det allra minsta.' } }),
        lagerDef({ id: 'trad', s: 18, off: [6, -1.25], mitt: [0, 9], fout: [0.6, 1.2], rita: ritaTrad,
            etikett: { namn: 'Träd', matt: '18' + NB + 'm' },
            info: { namn: 'Ett träd', matt: '18' + NB + 'm', text: 'Ett träd bygger nästan hela sin massa av koldioxid ur luften och vatten, inte av jord.' } }),
        lagerDef({ id: 'eiffel', s: 330, off: [100, -1.25], mitt: [0, 165], jmf: true, etikettR: 0.22, etikettSida: 'left', fout: [0.6, 1.2], rita: ritaEiffel,
            etikett: { namn: 'Eiffeltornet', matt: '330' + NB + 'm' },
            info: { namn: 'Eiffeltornet', matt: '330' + NB + 'm', text: 'Järnet i Eiffeltornet utvidgas när det blir varmt. En het sommardag kan tornet vara upp till 15 centimeter högre än en kall vinterdag.' } }),
        lagerDef({ id: 'burj', s: 828, off: [300, -1.25], mitt: [0, 414], jmf: true, etikettR: 0.12, fout: [0.6, 1.2], rita: ritaBurj,
            etikett: { namn: 'Burj Khalifa', matt: '828' + NB + 'm' },
            info: { namn: 'Burj Khalifa', matt: '828' + NB + 'm', text: 'Världens högsta byggnad står i Dubai och har över 160 våningar. Högst upp är luften ungefär fem grader kallare än vid marken, eftersom luften svalnar med höjden.' } }),
        lagerDef({ id: 'keb', s: 2097, off: [-6000, -1.25], mitt: [0, 1050], jmf: true, fin: [-1.9, -1.2], fout: [0.2, 0.6], rita: ritaKeb,
            etikett: { namn: 'Kebnekaise', matt: '2' + NB + '097' + NB + 'm' },
            info: { namn: 'Kebnekaise', matt: '2' + NB + '097' + NB + 'm', text: 'Sveriges högsta berg. Glaciären på sydtoppen har smält så mycket att nordtoppen numera är högst.' }, zf: 4.25 }),
        lagerDef({ id: 'everest', s: 8849, off: [9000, -1.25], mitt: [0, 4400], jmf: true, fin: [-1.9, -1.2], fout: [0.3, 0.7], rita: ritaEverest,
            etikett: { namn: 'Mount Everest', matt: '8' + NB + '849' + NB + 'm' },
            info: { namn: 'Mount Everest', matt: '8' + NB + '849' + NB + 'm', text: 'Jordens högsta berg. Ändå är höjden bara drygt en tusendel av jordens radie, så från rymden ser jorden nästan helt slät ut.' }, zf: 4.5 }),
        lagerDef({ id: 'atmos', s: 1e5, endastInfo: true,
            info: { namn: 'Atmosfären', matt: '10^{5}' + NB + 'm', text: 'Gränsen till rymden brukar sättas 100 kilometer upp. Om jorden vore ett äpple skulle hela atmosfären vara ungefär lika tunn som skalet.' }, zf: 5.35 }),
        lagerDef({ id: 'jorden', s: 2 * RJ, off: E, zon: [-2.6, -2.1, 98, 99], fin: [-3.0, -2.6], etikettMin: 0, fout: [98, 99], rita: ritaJorden,
            etikett: { namn: 'Jorden', matt: '12' + NB + '700' + NB + 'km' }, etikettMax: 1.4,
            info: { namn: 'Jorden', matt: '12' + NB + '700' + NB + 'km', text: 'Ljuset hinner runt jorden ungefär sju och ett halvt varv på en sekund. Atmosfären syns som en tunn, blå hinna längs kanten.' } }),
        lagerDef({ id: 'mane', s: 3.47e6, off: [E[0] + 0.95e7, E[1] + 0.45e7], jmf: true, fin: [-1.7, -1.1], fout: [0.5, 1.0], rita: ritaMane,
            etikett: { namn: 'Månen', matt: '3' + NB + '500' + NB + 'km' },
            info: { namn: 'Månen', matt: '3' + NB + '500' + NB + 'km', text: 'Här står månen nära jorden så att storlekarna går att jämföra. I verkligheten är den 384' + NB + '000 kilometer bort, och ljuset tar drygt en sekund dit.' }, zf: 7.2 }),
        lagerDef({ id: 'manbana', s: 7.69e8, off: E, fin: [-1.7, -1.1], fout: [0.25, 0.6], rita: ritaManbana, ingenEtikett: true,
            info: { namn: 'Månens bana', matt: '7,7' + NB + '·' + NB + '10^{8}' + NB + 'm', text: 'Här syns månen på sitt riktiga avstånd. Ungefär 30 jordklot får plats mellan jorden och månen.' } }),
        lagerDef({ id: 'jupiter', s: 1.43e8, off: [5.5e8, E[1] + 0.4e8], jmf: true, fin: [-2.1, -1.6], fout: [0.6, 1.1], rita: ritaJupiter,
            etikett: { namn: 'Jupiter', matt: '143' + NB + '000' + NB + 'km' },
            info: { namn: 'Jupiter', matt: '143' + NB + '000' + NB + 'km', text: 'Jupiter är solsystemets största planet. Över 1' + NB + '300 jordklot skulle få plats i den.' }, zf: 9.25 }),
        lagerDef({ id: 'solen', s: 1.39e9, off: [-1.25e9, E[1]], jmf: true, fin: [-1.3, -0.8], fout: [0.3, 0.8], rita: ritaSolen,
            etikett: { namn: 'Solen', matt: '1,4' + NB + 'miljoner km' },
            info: { namn: 'Solen', matt: '1,4' + NB + 'miljoner km', text: 'Solen innehåller 99,8 % av solsystemets massa. Ungefär en miljon jordklot skulle få plats i den.' }, zf: 9.65 }),
        lagerDef({ id: 'jordbana', s: 3e11, endastInfo: true,
            info: { namn: 'Jordens bana', matt: '3' + NB + '·' + NB + '10^{11}' + NB + 'm', text: 'Jorden är 150 miljoner kilometer från solen. Solljuset som når dig nu lämnade solen för drygt åtta minuter sedan.' } }),
        lagerDef({ id: 'solsystem', s: 9e12, off: S, zon: [10.0, 10.6, 98, 99], fin: [-2.2, -1.5], fout: [98, 99], rita: ritaSolsystem, ingenEtikett: true,
            info: { namn: 'Solsystemet', matt: '9' + NB + '·' + NB + '10^{12}' + NB + 'm', text: 'Neptunus, den yttersta planeten, går i en bana som är 9 miljarder kilometer bred. Rymdsonden Voyager 1 har färdats i nästan 50 år och är nu mer än 160 gånger så långt från solen som jorden.' } }),
        lagerDef({ id: 'oort', s: 3e16, off: S, fout: [1.0, 1.6], rita: ritaOort,
            etikett: { namn: 'Oorts moln', matt: '' },
            info: { namn: 'Oorts moln', matt: 'cirka 3' + NB + 'ljusår', text: 'Ett jättelikt skal av isklumpar runt solsystemet, och många kometer tros komma därifrån. Ingen har sett molnet direkt. Det är för mörkt och för långt bort.' } }),
        lagerDef({ id: 'grannar', s: 1e17, off: S, fin: [-1.5, -0.9], fout: [0.7, 1.2], rita: ritaGrannar, ingenEtikett: true,
            info: { namn: 'Solens närmaste grannar', matt: 'cirka 10' + NB + 'ljusår', text: 'Ljuset från Alfa Centauri, den närmaste stjärnan, har varit på väg i drygt fyra år. Med dagens rymdsonder skulle resan dit ta tiotusentals år.' }, zf: 17.55 }),
        lagerDef({ id: 'grannskap', s: 3e19, off: S, fin: [-1.5, -0.9], fout: [0.5, 1.0], rita: ritaStjarnfalt, ingenEtikett: true,
            info: { namn: 'Solens grannskap', matt: 'cirka 3' + NB + '000' + NB + 'ljusår', text: 'Orionnebulosan är ett gasmoln där nya stjärnor föds just nu. Plejaderna är en hop unga, blå stjärnor som du kan se med blotta ögat en vinterkväll.' } }),
        lagerDef({ id: 'vintergatan', s: 9.5e20, off: G, fin: [-1.9, -1.2], fout: [0.4, 0.9], rita: ritaVintergatan,
            etikett: { namn: 'Vintergatan', matt: '100' + NB + '000' + NB + 'ljusår' },
            info: { namn: 'Vintergatan', matt: '100' + NB + '000' + NB + 'ljusår', text: 'Vår galax har mellan 100 och 400 miljarder stjärnor. Solen ligger ungefär 26' + NB + '000 ljusår från mitten och går ett varv runt den på drygt 200 miljoner år.' } }),
        lagerDef({ id: 'lokala', s: 1e23, off: G, fin: [-1.6, -1.0], fout: [0.3, 0.8], rita: ritaLokala, ingenEtikett: true,
            info: { namn: 'Lokala galaxgruppen', matt: 'cirka 10' + NB + 'miljoner ljusår', text: 'Andromedagalaxen är den största i gruppen. Den närmar sig Vintergatan och kan krocka med den om några miljarder år.' }, zf: 22.75 }),
        lagerDef({ id: 'virgo', s: 1.4e23, off: VIRGO, fout: [0.4, 0.9], rita: ritaVirgo,
            etikett: { namn: 'Virgohopen', matt: '54' + NB + 'miljoner ljusår bort' },
            info: { namn: 'Virgohopen', matt: 'cirka 15' + NB + 'miljoner ljusår', text: 'En hop med över tusen galaxer, 54 miljoner ljusår bort. I mitten finns galaxen M87, vars svarta hål var det första som fotograferades.' }, zf: 24.1 }),
        lagerDef({ id: 'laniakea', s: 4.9e24, off: LANI, fout: [0.4, 0.9], rita: ritaLaniakea,
            etikett: { namn: 'Laniakea', matt: '520' + NB + 'miljoner ljusår' },
            info: { namn: 'Laniakea', matt: '520' + NB + 'miljoner ljusår', text: 'Laniakea betyder ”omätlig himmel” på hawaiiska. I den här superhopen rör sig omkring 100' + NB + '000 galaxer, Vintergatan inräknad, mot en gemensam punkt.' } }),
        lagerDef({ id: 'natet', s: 7e25, endastInfo: true,
            info: { namn: 'Det kosmiska nätet', matt: 'miljarder ljusår', text: 'Galaxerna ligger inte jämnt utspridda. De samlas längs trådar och väggar runt enorma tomrum, ungefär som skummet i ett badkar.' } }),
        lagerDef({ id: 'universum', s: 8.8e26, fin: [-1.6, -1.0], fout: [0.8, 1.4], rita: ritaUniversum,
            etikett: { namn: 'Det observerbara universum', matt: '93' + NB + 'miljarder ljusår' },
            info: { namn: 'Det observerbara universum', matt: '93' + NB + 'miljarder ljusår', text: 'Universum är 13,8 miljarder år gammalt, men eftersom rummet har utvidgats ligger kanten 46 miljarder ljusår bort i varje riktning. Ytterst syns den kosmiska bakgrundsstrålningen, ljus från universums barndom.' }, zf: 27.3 })
    ];
    var RITORDNING = LAGER.filter(function (l) { return l.rita; }).sort(function (a, b) {
        if (a.fyll || b.fyll) return (a.fyll ? a.fyll : 99) - (b.fyll ? b.fyll : 99);
        return b.s - a.s;
    });
    var INFO = LAGER.filter(function (l) { return l.info; }).sort(function (a, b) { return a.zf - b.zf; });

    var RIKEN = [
        { a: ZMIN, b: -19, namn: 'Kvantvärlden', f: '#8a3cff' }, { a: -19, b: -13.5, namn: 'Partiklar', f: '#ff3d9a' },
        { a: -13.5, b: -8.5, namn: 'Atomer', f: '#2ad4ff' }, { a: -8.5, b: -3.5, namn: 'Celler', f: '#2bff9a' },
        { a: -3.5, b: 4.6, namn: 'Vår värld', f: '#ffd23f' }, { a: 4.6, b: 14, namn: 'Solsystemet', f: '#ff8a2b' },
        { a: 14, b: 21.5, namn: 'Vintergatan', f: '#5b8cff' }, { a: 21.5, b: ZMAX, namn: 'Kosmos', f: '#d95bff' }];
    var BG = [[-35, '#16002e', '#07000f'], [-19, '#1c0436', '#090014'], [-15, '#2a0a3a', '#0d0216'], [-12, '#081a3d', '#030716'],
              [-8.5, '#062a35', '#020c12'], [-5, '#0a2b2e', '#03100f'], [-2.6, '#2f7fd6', '#a8dcff'], [3.6, '#2a74cc', '#9fd4ff'],
              [5.0, '#0b2350', '#2b5a9a'], [6.2, '#03060f', '#060b1a'], [28, '#02020a', '#03030d']]
        .map(function (b) { return [b[0], hexRgb(b[1]), hexRgb(b[2])]; });
    function bgAt(z) {
        for (var i = 1; i < BG.length; i++) if (z <= BG[i][0]) {
            var f = (z - BG[i - 1][0]) / (BG[i][0] - BG[i - 1][0]);
            return [blanda(BG[i - 1][1], BG[i][1], f), blanda(BG[i - 1][2], BG[i][2], f)];
        }
        return [BG[BG.length - 1][1], BG[BG.length - 1][2]];
    }

    // ═══════════════════════════════════════════════════════════════════
    // CSS
    // ═══════════════════════════════════════════════════════════════════
    var cssKlar = false;
    function css() {
        if (cssKlar) return; cssKlar = true;
        var s = document.createElement('style');
        s.textContent = [
            '.us-kort{background:#070a18;border-radius:14px;overflow:hidden;color:#e8ecff;font-family:' + FONT + ';box-shadow:0 10px 30px rgba(10,10,40,0.25);margin:1.4em 0}',
            '.us-kort *{box-sizing:border-box}',
            '.us-scen{position:relative;width:100%;height:440px;touch-action:pan-y;user-select:none;-webkit-user-select:none;cursor:ns-resize;outline:none}',
            '.us-scen canvas{display:block;width:100%;height:100%}',
            '.us-fs{position:absolute;top:14px;left:14px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,0.35);background:rgba(10,14,34,0.55);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;z-index:3}',
            '.us-fs:hover{background:rgba(40,50,100,0.75)}',
            '.us-avl{position:absolute;top:12px;right:12px;text-align:right;background:rgba(6,8,24,0.6);border:1px solid rgba(255,255,255,0.16);border-radius:12px;padding:8px 14px 9px;z-index:2;pointer-events:none;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}',
            '.us-avl-rub{font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#aeb8e8}',
            '.us-avl-tal{font-size:26px;font-weight:700;line-height:1.15;color:#fff;white-space:nowrap}',
            '.us-avl-tal sup{font-size:0.62em;line-height:0}',
            '.us-avl-ord{font-size:12.5px;color:#ffd98a;white-space:nowrap}',
            '.us-tips{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);background:rgba(6,8,24,0.72);border-radius:20px;padding:6px 14px;font-size:12.5px;color:#e8ecff;pointer-events:none;transition:opacity 0.6s;white-space:nowrap;z-index:2}',
            '.us-linjal{display:block;width:100%;height:58px;cursor:pointer;touch-action:none;outline:none}',
            '.us-linjal:focus-visible{box-shadow:inset 0 0 0 2px #ffd23f}',
            '.us-under{display:flex;gap:16px;padding:10px 16px 14px;align-items:flex-start}',
            '.us-info{flex:1 1 auto;min-width:0}',
            '.us-info-rad{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}',
            '.us-info-namn{font-size:17px;font-weight:700;color:#fff}',
            '.us-info-matt{font-size:14px;color:#ffd98a;white-space:nowrap}',
            '.us-info-matt sup,.us-info-text sup{font-size:0.7em;line-height:0}',
            '.us-info-jmf{font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#0b0f24;background:#8fe3ff;border-radius:10px;padding:1px 8px}',
            '.us-info-text{margin:4px 0 0;font-size:14px;line-height:1.5;color:#d4dbf8}',
            '.us-knappar{display:flex;flex-direction:column;gap:7px;flex:0 0 auto}',
            '.us-knapp{font-family:inherit;font-size:13.5px;font-weight:600;color:#fff;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.22);border-radius:22px;padding:7px 16px;cursor:pointer;white-space:nowrap;text-align:center}',
            '.us-knapp:hover{background:rgba(255,255,255,0.16)}',
            '.us-knapp.us-pa{background:linear-gradient(90deg,#c13cff,#ff3d9a);border-color:transparent}',
            '.us-kort:fullscreen{width:100vw;height:100vh;border-radius:0;margin:0;display:flex;flex-direction:column}',
            '.us-kort:fullscreen .us-scen{flex:1 1 auto;height:auto !important;min-height:0}',
            '.us-kort:-webkit-full-screen{width:100vw;height:100vh;border-radius:0;margin:0;display:flex;flex-direction:column}',
            '.us-kort:-webkit-full-screen .us-scen{flex:1 1 auto;height:auto !important;min-height:0}',
            '@media (max-width:600px){.us-under{flex-direction:column;gap:10px;padding:10px 12px 12px}.us-knappar{flex-direction:row;flex-wrap:wrap;width:100%}.us-knapp{flex:1 1 auto;padding:7px 10px;font-size:12.5px}',
            '.us-avl{top:8px;right:8px;padding:6px 10px}.us-avl-tal{font-size:20px}.us-avl-ord{font-size:11.5px}.us-fs{width:32px;height:32px;top:10px;left:10px}.us-tips{font-size:11.5px;white-space:normal;width:88%;text-align:center}.us-info-text{font-size:13.5px}}'
        ].join('\n');
        document.head.appendChild(s);
    }

    var IKON_UT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
    var IKON_IN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';

    // ═══════════════════════════════════════════════════════════════════
    // MONTERING
    // ═══════════════════════════════════════════════════════════════════
    function mount(node) {
        css();
        node.innerHTML = '';
        var kort = document.createElement('div'); kort.className = 'us-kort';
        var scen = document.createElement('div'); scen.className = 'us-scen'; scen.tabIndex = 0;
        scen.setAttribute('aria-label', 'Universums skala. Bilden visar ett område vars bredd står uppe till höger. Använd piltangenterna för att zooma.');
        var cv = document.createElement('canvas'); scen.appendChild(cv);
        var fs = document.createElement('button'); fs.type = 'button'; fs.className = 'us-fs'; fs.innerHTML = IKON_UT;
        fs.setAttribute('aria-label', 'Fullskärm'); fs.title = 'Fullskärm'; scen.appendChild(fs);
        var avl = document.createElement('div'); avl.className = 'us-avl';
        avl.innerHTML = '<div class="us-avl-rub">Bildens bredd</div><div class="us-avl-tal"></div><div class="us-avl-ord"></div>';
        scen.appendChild(avl);
        var tips = document.createElement('div'); tips.className = 'us-tips';
        tips.textContent = 'Dra i linjalen nedanför, eller dra uppåt och nedåt i bilden';
        scen.appendChild(tips);
        kort.appendChild(scen);
        var lin = document.createElement('canvas'); lin.className = 'us-linjal'; lin.tabIndex = 0;
        lin.setAttribute('role', 'slider'); lin.setAttribute('aria-label', 'Skala, som tiopotens av bildens bredd i meter');
        lin.setAttribute('aria-valuemin', String(ZMIN)); lin.setAttribute('aria-valuemax', String(ZMAX));
        kort.appendChild(lin);
        var under = document.createElement('div'); under.className = 'us-under';
        var info = document.createElement('div'); info.className = 'us-info'; info.setAttribute('aria-live', 'polite');
        var knappar = document.createElement('div'); knappar.className = 'us-knappar';
        function knapp(text) { var b = document.createElement('button'); b.type = 'button'; b.className = 'us-knapp'; b.textContent = text; knappar.appendChild(b); return b; }
        var bIn = knapp('Zooma in till det minsta'), bUt = knapp('Zooma ut till det största'), bHem = knapp('Tillbaka till människan');
        under.appendChild(info); under.appendChild(knappar);
        kort.appendChild(under);
        node.appendChild(kort);

        var c = cv.getContext('2d'), lc = lin.getContext('2d');
        var W = 600, H = 400, LW = 600, LH = 58, dpr = 1;
        var z = ZSTART, zt = ZSTART, resa = 0, aktiv = false, synligNu = true, senast = 0, t0 = performance.now();
        var visadInfo = null, visatTal = '', dra = null, pek = {}, tipsBort = false;

        function arFs() { return document.fullscreenElement === kort || document.webkitFullscreenElement === kort; }
        function storlek() {
            var w = scen.clientWidth || 600, fsNu = arFs(), h;
            if (fsNu) h = scen.clientHeight;
            else {
                h = w < 600 ? clamp(w * 1.0, 300, 460) : clamp(w * 0.6, 300, Math.min(520, (window.innerHeight || 800) * 0.6 - 60));
                scen.style.height = Math.round(h) + 'px';
            }
            dpr = Math.min(2, window.devicePixelRatio || 1);
            W = w; H = h;
            cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
            LW = lin.clientWidth || w; LH = 58;
            lin.width = Math.round(LW * dpr); lin.height = Math.round(LH * dpr);
            c._W = W; c._H = H; c._dpr = dpr; lc._W = LW; lc._H = LH;
            ritaLinjal();
            knappText();
        }

        function doljTips() { if (!tipsBort) { tipsBort = true; tips.style.opacity = '0'; } }
        function visaTips(t) { tips.textContent = t; tips.style.opacity = '1'; tipsBort = false; setTimeout(function () { if (!tipsBort) doljTips(); }, 2600); }

        // ── Linjalen ──
        var X0 = 16;
        function zX(zz) { return X0 + (zz - ZMIN) / (ZMAX - ZMIN) * (LW - 2 * X0); }
        function Xz(x) { return clamp(ZMIN + (x - X0) / (LW - 2 * X0) * (ZMAX - ZMIN), ZMIN, ZMAX); }
        function ritaLinjal() {
            var g = lc, i;
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            g.fillStyle = '#0b0f24'; g.fillRect(0, 0, LW, LH);
            for (i = 0; i < RIKEN.length; i++) {
                var r = RIKEN[i], x0 = zX(r.a), x1 = zX(r.b), f = hexRgb(r.f);
                var gr = g.createLinearGradient(x0, 0, x1, 0);
                gr.addColorStop(0, rgba(f, 0.95)); gr.addColorStop(1, rgba(blanda(f, [255, 255, 255], 0.15), 0.95));
                g.fillStyle = gr; g.fillRect(x0, 22, x1 - x0, 7);
                g.font = '500 10.5px ' + FONT; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
                if (g.measureText(r.namn).width < x1 - x0 - 6) { g.fillStyle = rgba(blanda(f, [255, 255, 255], 0.45), 0.95); g.fillText(r.namn, (x0 + x1) / 2, 16); }
            }
            g.fillStyle = 'rgba(255,255,255,0.45)';
            for (i = Math.ceil(ZMIN); i <= Math.floor(ZMAX); i++) {
                var xx = zX(i), stor = i % 5 === 0;
                g.fillRect(xx - 0.5, 31, 1, stor ? 7 : 3.5);
            }
            var steg = LW < 520 ? 10 : 5;
            g.fillStyle = 'rgba(220,228,255,0.85)';
            for (i = Math.ceil(ZMIN / steg) * steg; i <= ZMAX; i += steg) richText(g, '10^{' + exp(i) + '}', zX(i), 52, 11, 500, 'center');
            g.fillStyle = 'rgba(255,255,255,0.95)';
            for (i = 0; i < INFO.length; i++) { g.beginPath(); g.arc(zX(INFO[i].zf), 25.5, 1.6, 0, TAU); g.fill(); }
            var mx = zX(z);
            g.fillStyle = '#ffffff';
            g.shadowColor = 'rgba(255,210,80,0.9)'; g.shadowBlur = 10;
            g.beginPath(); g.moveTo(mx - 6, 18); g.lineTo(mx + 6, 18); g.lineTo(mx, 25); g.closePath(); g.fill();
            g.fillRect(mx - 1, 22, 2, 18);
            g.shadowBlur = 0;
            lin.setAttribute('aria-valuenow', z.toFixed(1));
            lin.setAttribute('aria-valuetext', 'Bildens bredd ' + iOrd(Math.pow(10, z)));
        }

        // ── Informationsrutan ──
        function uppdateraInfo() {
            var bast = null, bd = 1e9;
            for (var i = 0; i < INFO.length; i++) { var dd = Math.abs(INFO[i].zf - z); if (dd < bd) { bd = dd; bast = INFO[i]; } }
            if (bast === visadInfo) return;
            visadInfo = bast;
            var inf = bast.info;
            info.innerHTML = '<div class="us-info-rad"><span class="us-info-namn">' + inf.namn + '</span><span class="us-info-matt">' + richHtml(inf.matt) + '</span>' +
                (bast.jmf ? '<span class="us-info-jmf" title="Ställd bredvid för att jämföra storlekar, inte på sin riktiga plats">Jämförelse</span>' : '') +
                '</div><p class="us-info-text">' + inf.text + '</p>';
        }
        function uppdateraAvl() {
            var V = Math.pow(10, z), t = talHtml(V);
            if (t === visatTal) return;
            visatTal = t;
            avl.children[1].innerHTML = t;
            avl.children[2].textContent = iOrd(V);
        }

        // ── Bilden ──
        function rita(t) {
            c.setTransform(dpr, 0, 0, dpr, 0, 0);
            // Kameran sänks i "vår värld" så att marken hamnar långt ned och bergen ryms,
            // och höjs lite vid människan så att fötterna syns.
            var skift = -0.12 * smooth(-1.3, -0.3, z) + 0.42 * smooth(0.9, 2.2, z) - 0.3 * smooth(4.8, 5.8, z);
            var V = Math.pow(10, z), k = W / V, cx = W / 2, cy = H / 2 + skift * H, i;
            var bg = bgAt(z), gr = c.createLinearGradient(0, 0, 0, H);
            gr.addColorStop(0, rgba(bg[0], 1)); gr.addColorStop(1, rgba(bg[1], 1));
            c.globalAlpha = 1; vanlig(c);
            c.fillStyle = gr; c.fillRect(0, 0, W, H);
            var etiketter = [];
            for (i = 0; i < RITORDNING.length; i++) {
                var l = RITORDNING[i], d = l.s * k, r = lg(d / W);
                var a = smooth(l.fin[0], l.fin[1], r) * (1 - smooth(l.fout[0], l.fout[1], r));
                if (l.zon) a *= smooth(l.zon[0], l.zon[1], z) * (1 - smooth(l.zon[2], l.zon[3], z));
                if (a < 0.004) continue;
                var x = cx + l.off[0] * k, y = cy - l.off[1] * k;
                if (!l.fyll && l.id !== 'jorden' && l.id !== 'solsystem' && l.id !== 'lokala' && l.id !== 'grannskap' && l.id !== 'grannar' && l.id !== 'manbana') {
                    var my = l.mitt ? l.mitt[1] * k : 0, ext = d * 0.75 + 4;
                    if (x + ext < 0 || x - ext > W || y - my + ext < 0 || y - my - ext > H) continue;
                }
                var L = { x: x, y: y, k: k, d: d, a: a, t: t, z: z, W: W, H: H, cx: cx, cy: cy, ox: l.off[0], oy: l.off[1], etiketter: etiketter };
                c.save();
                c.globalAlpha = a;
                try { l.rita(c, L); } catch (e) { /* ett lager som inte kan ritas får inte stoppa de andra */ }
                c.restore();
                vanlig(c);
                if (!l.fyll && !l.ingenEtikett && (l.etikett || l.info) && a > 0.3 && d > (l.etikettMin != null ? l.etikettMin : 0.025) * W && d < (l.etikettMax || 1.1) * W) {
                    var et = l.etikett || l.info;
                    var ly = l.mitt ? y - l.mitt[1] * k : y;
                    if (x > 0 && x < W && ly > 0 && ly < H) etiketter.push({ x: x, y: ly, r: d / 2, rx: l.etikettR ? d * l.etikettR : null, sida: l.etikettSida, pri: l.etikettSida ? -1 : 0, namn: et.namn, matt: et.matt, a: a });
                }
            }
            var bgNu = bgAt(z), lum = function (q) { return 0.2126 * q[0] + 0.7152 * q[1] + 0.0722 * q[2]; };
            ritaEtiketter(etiketter, z > -2.4 && z < 4.7);
            ritaSkalstock(V, k, lum(bgAt(z)[1]) > 150 && z < 4.6 && z > -2.2);
            var vg = c.createRadialGradient(cx, cy, Math.min(W, H) * 0.45, cx, cy, Math.hypot(W, H) * 0.62);
            vg.addColorStop(0, 'rgba(0,0,10,0)'); vg.addColorStop(1, 'rgba(0,0,10,0.32)');
            c.globalAlpha = 1; c.fillStyle = vg; c.fillRect(0, 0, W, H);
        }
        function ritaEtiketter(lista, ljus) {
            lista.sort(function (a, b) { return a.pri - b.pri; });
            var lagda = [{ x0: W - 200, y0: 0, x1: W, y1: 92 }, { x0: 0, y0: 0, x1: 64, y1: 64 }, { x0: 0, y0: H - 46, x1: 220, y1: H }];
            c.textBaseline = 'alphabetic';
            for (var i = 0; i < lista.length; i++) {
                var e = lista[i];
                var bn = richBredd(c, e.namn, 13.5, 600), bm = e.matt ? richBredd(c, e.matt, 12, 400) : 0, bw = Math.max(bn, bm);
                var hh = e.matt ? 32 : 17;
                var rx = e.rx != null ? e.rx : e.r;
                var lagen = [[e.x + rx + 10, e.y - hh / 2 + 12, 'left'], [e.x - rx - 10, e.y - hh / 2 + 12, 'right'],
                             [e.x, e.y - e.r - hh - 2 + 12, 'center'], [e.x, e.y + e.r + 18, 'center']];
                if (e.sida === 'left') lagen.unshift(lagen.splice(1, 1)[0]);
                for (var j = 0; j < lagen.length; j++) {
                    var p = lagen[j], x0 = p[2] === 'left' ? p[0] : p[2] === 'right' ? p[0] - bw : p[0] - bw / 2;
                    var ruta = { x0: x0 - 3, y0: p[1] - 14, x1: x0 + bw + 3, y1: p[1] - 14 + hh + 4 };
                    if (ruta.x0 < 4 || ruta.x1 > W - 4 || ruta.y0 < 4 || ruta.y1 > H - 4) continue;
                    var krock = false;
                    for (var q = 0; q < lagda.length; q++) { var o = lagda[q]; if (ruta.x0 < o.x1 && ruta.x1 > o.x0 && ruta.y0 < o.y1 && ruta.y1 > o.y0) { krock = true; break; } }
                    if (krock) continue;
                    lagda.push(ruta);
                    var al = e.a == null ? 1 : clamp((e.a - 0.3) / 0.4, 0, 1);
                    c.save();
                    c.globalAlpha = al;
                    if (!ljus) { c.shadowColor = 'rgba(0,0,20,0.85)'; c.shadowBlur = 6; }
                    c.fillStyle = ljus ? '#0c1633' : '#ffffff';
                    richText(c, e.namn, p[0], p[1], 13.5, 600, p[2]);
                    if (e.matt) { c.fillStyle = ljus ? '#7a2e00' : '#ffd98a'; richText(c, e.matt, p[0], p[1] + 16, 12, 400, p[2]); }
                    c.restore();
                    break;
                }
            }
        }
        function ritaSkalstock(V, k, ljus) {
            var sk = skalstock(V), px = sk.L * k, x0 = 18, y0 = H - 22, col = ljus ? '#0c1633' : '#ffffff';
            c.save();
            if (!ljus) { c.shadowColor = 'rgba(0,0,20,0.8)'; c.shadowBlur = 5; }
            c.strokeStyle = col; c.lineWidth = 2.5;
            c.beginPath(); c.moveTo(x0, y0 - 6); c.lineTo(x0, y0); c.lineTo(x0 + px, y0); c.lineTo(x0 + px, y0 - 6); c.stroke();
            c.fillStyle = col;
            richText(c, sk.text, Math.max(x0 + px / 2, x0 + richBredd(c, sk.text, 13, 600) / 2), y0 - 10, 13, 600, 'center');
            c.restore();
        }

        // ── Animering ──
        function narmasteAvstand(zz) { var m = 9; for (var i = 0; i < INFO.length; i++) m = Math.min(m, Math.abs(INFO[i].zf - zz)); return m; }
        function knappText() { var smal = W < 600; if (resa !== -1) bIn.textContent = smal ? 'Till det minsta' : 'Zooma in till det minsta'; if (resa !== 1) bUt.textContent = smal ? 'Till det största' : 'Zooma ut till det största'; bHem.textContent = smal ? 'Till människan' : 'Tillbaka till människan'; }
        function stoppaResa() { resa = 0; knappText(); bIn.classList.remove('us-pa'); bUt.classList.remove('us-pa'); }
        function loop(nu) {
            if (!kort.isConnected) return;
            var dt = Math.min(0.05, (nu - (senast || nu)) / 1000); senast = nu;
            if (resa) {
                var fart = 0.32 + 0.9 * Math.min(1, narmasteAvstand(zt) / 0.5);
                zt += resa * fart * dt;
                if (zt <= ZMIN || zt >= ZMAX) { zt = clamp(zt, ZMIN, ZMAX); stoppaResa(); }
            }
            var gl = dra && dra.typ === 'linjal' ? 14 : 7;
            z += (zt - z) * (1 - Math.exp(-dt * gl));
            if (Math.abs(zt - z) < 1e-5) z = zt;
            if (synligNu) {
                rita((nu - t0) / 1000);
                ritaLinjal();
                uppdateraAvl();
                uppdateraInfo();
            }
            requestAnimationFrame(loop);
        }

        // ── Styrning ──
        function satt(nz) { zt = clamp(nz, ZMIN, ZMAX); doljTips(); }
        bIn.addEventListener('click', function () { if (resa === -1) { stoppaResa(); return; } stoppaResa(); resa = -1; bIn.textContent = 'Pausa resan'; bIn.classList.add('us-pa'); doljTips(); });
        bUt.addEventListener('click', function () { if (resa === 1) { stoppaResa(); return; } stoppaResa(); resa = 1; bUt.textContent = 'Pausa resan'; bUt.classList.add('us-pa'); doljTips(); });
        bHem.addEventListener('click', function () { stoppaResa(); satt(ZSTART); });

        lin.addEventListener('pointerdown', function (e) {
            stoppaResa();
            var r = lin.getBoundingClientRect();
            dra = { typ: 'linjal', id: e.pointerId, x0: e.clientX, flyttat: false };
            try { lin.setPointerCapture(e.pointerId); } catch (er) { }
            satt(Xz(e.clientX - r.left));
            e.preventDefault();
        });
        lin.addEventListener('pointermove', function (e) {
            if (!dra || dra.typ !== 'linjal' || dra.id !== e.pointerId) return;
            var r = lin.getBoundingClientRect();
            if (Math.abs(e.clientX - dra.x0) > 4) dra.flyttat = true;
            satt(Xz(e.clientX - r.left));
        });
        function slappLinjal(e) {
            if (!dra || dra.typ !== 'linjal') return;
            if (!dra.flyttat) {               // ett klick fäster på närmaste föremål
                var r = lin.getBoundingClientRect(), x = e.clientX - r.left, bast = null, bd = 9;
                for (var i = 0; i < INFO.length; i++) { var dd = Math.abs(zX(INFO[i].zf) - x); if (dd < bd) { bd = dd; bast = INFO[i]; } }
                if (bast) satt(bast.zf);
            }
            dra = null;
        }
        lin.addEventListener('pointerup', slappLinjal);
        lin.addEventListener('pointercancel', function () { dra = null; });
        function tangent(e) {
            var steg = { ArrowLeft: -0.25, ArrowDown: -0.25, ArrowRight: 0.25, ArrowUp: 0.25, PageDown: -2, PageUp: 2, '-': 0.25, '+': -0.25 }[e.key];
            if (e.key === 'Home') { stoppaResa(); satt(ZMIN); e.preventDefault(); return; }
            if (e.key === 'End') { stoppaResa(); satt(ZMAX); e.preventDefault(); return; }
            if (steg != null) { stoppaResa(); satt(zt + steg); e.preventDefault(); }
        }
        lin.addEventListener('keydown', tangent);
        scen.addEventListener('keydown', tangent);

        scen.addEventListener('pointerdown', function (e) {
            if (e.target === fs || fs.contains(e.target)) return;
            aktiv = true;
            pek[e.pointerId] = { x: e.clientX, y: e.clientY };
            var ids = Object.keys(pek);
            if (e.pointerType === 'mouse') { dra = { typ: 'scen', id: e.pointerId, y: e.clientY }; try { scen.setPointerCapture(e.pointerId); } catch (er) { } stoppaResa(); }
            else if (ids.length === 2) { var a = pek[ids[0]], b = pek[ids[1]]; dra = { typ: 'nyp', d: Math.hypot(a.x - b.x, a.y - b.y) }; stoppaResa(); }
        });
        scen.addEventListener('pointermove', function (e) {
            if (pek[e.pointerId]) pek[e.pointerId] = { x: e.clientX, y: e.clientY };
            if (!dra) return;
            if (dra.typ === 'scen' && dra.id === e.pointerId) { satt(zt + (e.clientY - dra.y) / H * 4); dra.y = e.clientY; }
            else if (dra.typ === 'nyp') {
                var ids = Object.keys(pek); if (ids.length < 2) return;
                var a = pek[ids[0]], b = pek[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d > 10 && dra.d > 10) { satt(zt - lg(d / dra.d) * 1.6); dra.d = d; }
            }
        });
        function slappScen(e) { delete pek[e.pointerId]; if (dra && (dra.typ === 'scen' || dra.typ === 'nyp')) dra = null; }
        scen.addEventListener('pointerup', slappScen);
        scen.addEventListener('pointercancel', slappScen);
        document.addEventListener('pointerdown', function (e) { if (!kort.contains(e.target)) aktiv = false; }, true);
        scen.addEventListener('wheel', function (e) {
            if (!aktiv && !arFs()) { visaTips('Klicka i bilden först, så zoomar mushjulet'); return; }
            e.preventDefault();
            stoppaResa();
            var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
            satt(zt + clamp(dy, -200, 200) * 0.004);
        }, { passive: false });

        fs.addEventListener('click', function () {
            if (arFs()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
            var f = kort.requestFullscreen || kort.webkitRequestFullscreen;
            if (f) f.call(kort);
        });
        function fsByte() { var p = arFs(); fs.innerHTML = p ? IKON_IN : IKON_UT; fs.title = p ? 'Lämna fullskärm' : 'Fullskärm'; if (!p) scen.style.height = ''; setTimeout(storlek, 30); }
        document.addEventListener('fullscreenchange', fsByte);
        document.addEventListener('webkitfullscreenchange', fsByte);

        if (window.ResizeObserver) new ResizeObserver(function () { storlek(); }).observe(kort);
        else window.addEventListener('resize', storlek);
        if (window.IntersectionObserver) new IntersectionObserver(function (en) { synligNu = en[0].isIntersecting; }).observe(kort);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { visatTal = ''; ritaLinjal(); });

        storlek();
        uppdateraInfo(); uppdateraAvl();
        requestAnimationFrame(loop);
    }

    window.FYSIKUNIVERSUMSSKALA = {
        mount: mount,
        // för test: kedjans lägen och lagren
        _lager: LAGER, _zmin: ZMIN, _zmax: ZMAX
    };
})();
