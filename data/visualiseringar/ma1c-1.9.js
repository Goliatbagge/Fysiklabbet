/* ma1c-1.9.js — visualisering: "Zoomresan" (grundpotensform och prefix).
 *
 * Kärninsikt: tiopotensen är en POSITION på en zoomskala. Multiplikation
 * med 10 är ett zoomsteg, och grundpotensformen a·10ⁿ är "siffrorna ×
 * zoomnivån". Från en atom till Vintergatan är det bara ~31 steg.
 *
 * Ett enda kontinuerligt tillstånd bär hela modulen: state.n (exponentens
 * position, kan vara ett decimaltal medan man drar). Värdet i meter är
 * 10^n. Grundpotensformen a·10^nInt fås genom nInt = floor(n),
 * a = 10^(n − nInt) — exakt samma tal, bara uppdelat som genomgången vill.
 *
 * Fyra steg (lager):
 *   1. Resan            — fri zoom genom 13 dekad-vinjetter, gissa-först.
 *   2. Grundpotensformen — omvandla ett tal steg för steg (genomgångens
 *                          metod: räkna siffror/nollor), zoomvyn hoppar dit.
 *   3. Sökuppdrag        — ställ in glidaren nära ett målvärde.
 *   4. Prefixen          — prefixtabellen markerad på skalan.
 *
 * Ren vanilla-JS + SVG i Laborans-papperstemat (samma mönster som graf.js
 * och ma3c-2.3.js). API: window.VISUALISERINGAR['ma1c-1.9'] = { mount }.
 */
(function () {
    'use strict';

    // ── Hjälpfunktioner ─────────────────────────────────────────────────
    function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function repeatChar(ch, n) { var s = ''; for (var i = 0; i < n; i++) s += ch; return s; }

    var SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
        var el = document.createElementNS(SVGNS, name);
        if (attrs) for (var k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }
    function svgText(attrs, str) {
        var t = svgEl('text', attrs);
        t.textContent = str;
        return t;
    }
    function katexInto(div, tex) {
        if (window.katex) {
            try { window.katex.render(tex, div, { throwOnError: false, displayMode: false }); return; }
            catch (e) { /* fall igenom */ }
        }
        div.textContent = tex.replace(/\{,\}/g, ',');
    }
    // Unicode-superscript för enkla potenser i SVG-text (tillåtet enligt
    // bygginstruktionen — bara siffror, inga variabler att kursivera).
    var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
    function supStr(n) { return String(n).split('').map(function (c) { return SUP[c] || c; }).join(''); }
    // Samma sak fast för HTML-text (löptext/knappar): riktig <sup> + äkta minus.
    function supHtml(n) { return '<sup>' + (n < 0 ? '−' + Math.abs(n) : String(n)) + '</sup>'; }

    // ── Grundpotensform: sträng-baserad decimalflytt (exakt, inga
    // flyttalsfel) — speglar genomgångens metod "flytta decimaltecknet". ──
    function shiftDecimal(aStr, n) {
        var parts = aStr.split('.');
        var intPart = parts[0];
        var fracPart = parts[1] || '';
        var digits = intPart + fracPart;
        var pointPos = intPart.length + n;
        if (pointPos <= 0) return '0.' + repeatChar('0', -pointPos) + digits;
        if (pointPos >= digits.length) return digits + repeatChar('0', pointPos - digits.length);
        return digits.slice(0, pointPos) + '.' + digits.slice(pointPos);
    }
    function groupThousands(intStr, sep) {
        return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }
    // Fullt utskrivet tal, NBSP-grupperat, decimalkomma — för HTML-text.
    function plainNumberHtml(aStr, n, unit) {
        var raw = shiftDecimal(aStr, n);
        var bits = raw.split('.');
        var intPart = bits[0].replace(/^0+(?=\d)/, '') || '0';
        var grouped = groupThousands(intPart, ' ');
        var frac = bits[1];
        var out = grouped + (frac ? ',' + frac : '');
        return out + (unit ? ' ' + unit : '');
    }
    // Samma sak fast som KaTeX-källa (tunt \, mellan grupper, ingen NBSP).
    function plainNumberTex(aStr, n) {
        var raw = shiftDecimal(aStr, n);
        var bits = raw.split('.');
        var intPart = bits[0].replace(/^0+(?=\d)/, '') || '0';
        var grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
        var frac = bits[1];
        return grouped + (frac ? '{,}' + frac : '');
    }
    function texFromDot(s) { return s.indexOf('.') >= 0 ? s.replace('.', '{,}') : s; }

    // Tolka valfritt tal (sv-format, ev. NBSP/space som tusentalsavskiljare)
    // till grundpotensform genom att RÄKNA siffror/nollor — precis som i
    // genomgången — i stället för log10 (odds för flyttalsfel).
    function trimSig(aStr) {
        var dot = aStr.indexOf('.');
        if (dot < 0) return aStr;
        var intp = aStr.slice(0, dot), frac = aStr.slice(dot + 1);
        if (frac.length > 3) frac = frac.slice(0, 3);
        frac = frac.replace(/0+$/, '');
        return frac ? intp + '.' + frac : intp;
    }
    function parseToGrundpotens(str) {
        str = String(str).trim();
        if (!str) return null;
        var neg = false;
        if (str.charAt(0) === '-' || str.charAt(0) === '−') { neg = true; str = str.slice(1); }
        str = str.replace(/[\s ]/g, '').replace(',', '.');
        if (!/^\d+(\.\d+)?$/.test(str)) return null;
        var parts = str.split('.');
        var intPart = parts[0].replace(/^0+(?=\d)/, '');
        var fracPart = parts[1] || '';
        if (intPart === '0' || intPart === '') {
            var m = fracPart.match(/^0*/);
            var zeros = m ? m[0].length : 0;
            if (zeros === fracPart.length) return null; // talet är noll
            var sig = fracPart.slice(zeros);
            var n = -(zeros + 1);
            var aStr = sig.charAt(0) + (sig.length > 1 ? '.' + sig.slice(1) : '');
            return { neg: neg, aStr: trimSig(aStr), n: n };
        }
        var nInt = intPart.length - 1;
        var digits = intPart + fracPart;
        var a2 = digits.charAt(0) + (digits.length > 1 ? '.' + digits.slice(1) : '');
        return { neg: neg, aStr: trimSig(a2), n: nInt };
    }

    // ── Kontinuerlig zoomposition → grundpotensform ────────────────────────
    function decompose(nCont) {
        var nInt = Math.floor(nCont + 1e-9);
        var frac = nCont - nInt;
        var aNum = Math.pow(10, frac);
        var aRounded = Math.round(aNum * 100) / 100;
        if (aRounded >= 10) { aRounded = 1; nInt += 1; }
        if (aRounded < 1) aRounded = 1;
        return { nInt: nInt, aNum: aRounded };
    }
    function numToDotStr(v) {
        var s = v.toFixed(2);
        s = s.replace(/0+$/, '').replace(/\.$/, '');
        return s;
    }

    // ── Färger (dova/bläck-toner — inga emojis, ingen vit halo) ───────────
    var INK = '#1f2530';
    var INK_SOFT = '#5b6472';
    var INK_FAINT = 'rgba(31,37,48,0.14)';
    var INK_FAINT2 = 'rgba(31,37,48,0.28)';
    var PATH = '#2563c9';
    var DASH = 'rgba(31,37,48,0.4)';
    var GOOD = '#4a7d3a';

    // ── De 13 dekad-vinjetterna ─────────────────────────────────────────
    // Varje draw(g) ritar in i ett lokalt koordinatsystem centrerat i (0,0),
    // ungefär ±90 enheter åt varje håll — ingen text i vinjetterna själva
    // (etiketter/bildtext ligger utanför scenen, se caption-raden).
    function orbitPoint(cx, cy, rx, ry, ang) {
        return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
    }
    function spiralPathD(turns, rMax, points, phase) {
        var d = '';
        for (var i = 0; i <= points; i++) {
            var t = i / points;
            var ang = t * turns * 2 * Math.PI + phase;
            var r = t * rMax;
            var x = r * Math.cos(ang), y = r * Math.sin(ang);
            d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
        }
        return d;
    }

    var DECADES = [
        {
            key: 'atom', n: -10, a: 1, name: 'en atom',
            caption: 'Ungefär så stor är en atom – en kärna omgiven av ett elektronmoln.',
            draw: function (g) {
                [0, 60, 120].forEach(function (rot) {
                    g.appendChild(svgEl('ellipse', {
                        cx: 0, cy: 0, rx: 70, ry: 26, fill: 'none', stroke: INK_SOFT,
                        'stroke-width': 1.3, 'stroke-dasharray': '3 4',
                        transform: 'rotate(' + rot + ')'
                    }));
                });
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: 10, fill: INK }));
                [0, 60, 120].forEach(function (rot, i) {
                    var rad = rot * Math.PI / 180, t = 0.6 + i * 1.3;
                    var ex = 70 * Math.cos(t), ey = 26 * Math.sin(t);
                    var x = ex * Math.cos(rad) - ey * Math.sin(rad);
                    var y = ex * Math.sin(rad) + ey * Math.cos(rad);
                    g.appendChild(svgEl('circle', { cx: x, cy: y, r: 4, fill: PATH }));
                });
            }
        },
        {
            key: 'virus', n: -8, a: 3, name: 'ett virus',
            caption: 'Ett virus – så litet att det bara syns i ett elektronmikroskop.',
            draw: function (g) {
                var R = 44;
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: R, fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.6 }));
                for (var i = 0; i < 7; i++) {
                    var ang = i / 7 * 2 * Math.PI;
                    var x1 = R * Math.cos(ang), y1 = R * Math.sin(ang);
                    var x2 = (R + 16) * Math.cos(ang), y2 = (R + 16) * Math.sin(ang);
                    g.appendChild(svgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, 'stroke-width': 2, 'stroke-linecap': 'round' }));
                    g.appendChild(svgEl('circle', { cx: x2, cy: y2, r: 3.4, fill: INK }));
                }
            }
        },
        {
            key: 'cell', n: -5, a: 1.5, name: 'en cell',
            caption: 'En mänsklig cell, med sin cellkärna.',
            draw: function (g) {
                g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 80, ry: 54, fill: INK_FAINT, stroke: INK, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('ellipse', { cx: -16, cy: 4, rx: 24, ry: 19, fill: INK_SOFT, stroke: INK, 'stroke-width': 1.2 }));
                g.appendChild(svgEl('circle', { cx: -16, cy: 4, r: 5, fill: INK }));
                [[32, -18], [42, 16], [-42, -24], [8, 34], [-48, 20]].forEach(function (p) {
                    g.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 3.4, fill: INK_SOFT }));
                });
            }
        },
        {
            key: 'ant', n: -3, a: 5, name: 'en myra',
            caption: 'En myra. Nu är vi i en storlek du kan se med blotta ögat.',
            draw: function (g) {
                [{ cx: -38, cy: 0, rx: 15, ry: 11 }, { cx: -6, cy: -2, rx: 19, ry: 14 }, { cx: 30, cy: -4, rx: 26, ry: 16 }]
                    .forEach(function (s) { g.appendChild(svgEl('ellipse', { cx: s.cx, cy: s.cy, rx: s.rx, ry: s.ry, fill: INK })); });
                [-20, -2, 16].forEach(function (x) {
                    g.appendChild(svgEl('line', { x1: x, y1: 6, x2: x - 15, y2: 32, stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }));
                    g.appendChild(svgEl('line', { x1: x, y1: 6, x2: x + 15, y2: 32, stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }));
                });
                g.appendChild(svgEl('line', { x1: -46, y1: -8, x2: -64, y2: -26, stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('line', { x1: -40, y1: -10, x2: -56, y2: -30, stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
            }
        },
        {
            key: 'human', n: 0, a: 1.8, name: 'en människa',
            caption: 'En människa – vår egen vardagliga skala.',
            draw: function (g) {
                g.appendChild(svgEl('circle', { cx: 0, cy: -56, r: 13, fill: INK }));
                g.appendChild(svgEl('path', {
                    d: 'M -15 -41 C -19 -20 -17 -2 -12 10 L -19 58 L -7 58 L -1 14 L 1 14 L 7 58 L 19 58 L 12 10 C 17 -2 19 -20 15 -41 C 9 -47 -9 -47 -15 -41 Z',
                    fill: INK
                }));
                g.appendChild(svgEl('path', { d: 'M -15 -38 Q -33 -18 -29 8', fill: 'none', stroke: INK, 'stroke-width': 6.5, 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: 'M 15 -38 Q 33 -18 29 8', fill: 'none', stroke: INK, 'stroke-width': 6.5, 'stroke-linecap': 'round' }));
            }
        },
        {
            key: 'house', n: 1, a: 1.2, name: 'ett hus',
            caption: 'Ett hus, ungefär tio gånger större än en människa.',
            draw: function (g) {
                g.appendChild(svgEl('polygon', { points: '-50,-6 0,-46 50,-6', fill: INK }));
                g.appendChild(svgEl('rect', { x: -40, y: -6, width: 80, height: 56, fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('rect', { x: -10, y: 20, width: 20, height: 30, fill: INK }));
                g.appendChild(svgEl('rect', { x: -30, y: 6, width: 16, height: 14, fill: 'none', stroke: INK, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('rect', { x: 14, y: 6, width: 16, height: 14, fill: 'none', stroke: INK, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('rect', { x: 24, y: -50, width: 9, height: 32, fill: INK }));
            }
        },
        {
            key: 'city', n: 3, a: 5, name: 'en stad',
            caption: 'En stad. Hustaken sträcker sig kilometervis.',
            draw: function (g) {
                g.appendChild(svgEl('line', { x1: -90, y1: 40, x2: 90, y2: 40, stroke: INK, 'stroke-width': 1.6 }));
                [{ x: -80, w: 20, h: 50 }, { x: -55, w: 16, h: 74 }, { x: -34, w: 22, h: 40 },
                 { x: -6, w: 18, h: 90 }, { x: 16, w: 20, h: 60 }, { x: 42, w: 16, h: 44 }, { x: 62, w: 22, h: 70 }]
                    .forEach(function (r) { g.appendChild(svgEl('rect', { x: r.x, y: 40 - r.h, width: r.w, height: r.h, fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.2 })); });
            }
        },
        {
            key: 'sweden', n: 6, a: 1.6, name: 'Sverige',
            caption: 'Sverige, sett rakt uppifrån.',
            draw: function (g) {
                g.appendChild(svgEl('path', {
                    d: 'M -6 -85 C 10 -70 4 -50 14 -30 C 22 -14 10 4 18 22 C 26 40 8 55 12 78 C 6 86 -10 84 -14 66 C -20 44 -8 30 -16 10 C -22 -8 -12 -26 -18 -46 C -22 -64 -16 -80 -6 -85 Z',
                    fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.6
                }));
                g.appendChild(svgEl('circle', { cx: -2, cy: 60, r: 3.6, fill: INK }));
                g.appendChild(svgEl('line', { x1: 58, y1: -68, x2: 58, y2: -88, stroke: INK_SOFT, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('polygon', { points: '58,-92 53,-84 63,-84', fill: INK_SOFT }));
            }
        },
        {
            key: 'earth', n: 7, a: 1.3, name: 'jorden',
            caption: 'Jorden, sett utifrån rymden.',
            draw: function (g) {
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: 78, fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.6 }));
                [
                    'M -50 -30 Q -20 -50 10 -34 Q 30 -22 18 -4 Q -10 10 -34 -6 Q -54 -14 -50 -30 Z',
                    'M 10 20 Q 40 10 54 34 Q 50 56 24 54 Q 4 46 10 20 Z',
                    'M -40 30 Q -20 24 -12 44 Q -18 62 -38 56 Q -50 44 -40 30 Z'
                ].forEach(function (d) { g.appendChild(svgEl('path', { d: d, fill: INK_SOFT })); });
                g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 78, ry: 18, fill: 'none', stroke: DASH, 'stroke-width': 1 }));
            }
        },
        {
            key: 'moon', n: 8, a: 3.8, name: 'månens bana',
            caption: 'Månens bana runt jorden.',
            draw: function (g) {
                g.appendChild(svgEl('circle', { cx: -30, cy: 0, r: 22, fill: INK_FAINT2, stroke: INK, 'stroke-width': 1.6 }));
                g.appendChild(svgEl('ellipse', { cx: -30, cy: 0, rx: 85, ry: 30, fill: 'none', stroke: PATH, 'stroke-width': 1.3, 'stroke-dasharray': '4 4' }));
                var p = orbitPoint(-30, 0, 85, 30, 0.35);
                g.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 7, fill: INK_SOFT, stroke: INK, 'stroke-width': 1.2 }));
                [[-70, -50], [60, -46], [-60, 48], [75, -10]].forEach(function (pt) {
                    g.appendChild(svgEl('circle', { cx: pt[0], cy: pt[1], r: 1.6, fill: INK_SOFT }));
                });
            }
        },
        {
            key: 'innersolar', n: 11, a: 2.3, name: 'solsystemets inre',
            caption: 'Solsystemets inre, med de steniga planeterna kring solen.',
            draw: function (g) {
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: 8, fill: INK }));
                var radii = [22, 34, 46, 58], angs = [0.4, 2.1, 4.0, 5.3];
                radii.forEach(function (r, i) {
                    g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: r, fill: 'none', stroke: INK_SOFT, 'stroke-width': 1, 'stroke-dasharray': '2 3' }));
                    var p = orbitPoint(0, 0, r, r, angs[i]);
                    g.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 3.2, fill: i === 2 ? PATH : INK_SOFT }));
                });
            }
        },
        {
            key: 'wholesolar', n: 13, a: 1.8, name: 'hela solsystemet',
            caption: 'Hela solsystemet, ut mot den interstellära rymden.',
            draw: function (g) {
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: 5, fill: INK }));
                var radii = [18, 26, 36, 48, 62, 78];
                radii.forEach(function (r) {
                    g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: r, fill: 'none', stroke: INK_SOFT, 'stroke-width': 1, 'stroke-dasharray': '2 3' }));
                });
                g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: 90, fill: 'none', stroke: DASH, 'stroke-width': 1.4, 'stroke-dasharray': '1 5' }));
                [1, 4].forEach(function (i) {
                    var p = orbitPoint(0, 0, radii[i], radii[i], i * 1.7 + 0.6);
                    g.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 2.6, fill: INK_SOFT }));
                });
            }
        },
        {
            key: 'milkyway', n: 21, a: 1, name: 'Vintergatan',
            caption: 'Vintergatan – vår galax, med hundratals miljarder stjärnor.',
            draw: function (g) {
                g.appendChild(svgEl('path', { d: spiralPathD(1.4, 90, 48, 0), fill: 'none', stroke: INK_SOFT, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('path', { d: spiralPathD(1.4, 90, 48, Math.PI), fill: 'none', stroke: INK_SOFT, 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
                g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 15, ry: 8, fill: INK }));
                [[40, -70], [-55, -60], [70, 20], [-75, 10], [20, 80], [-30, 75], [85, -30], [-85, -15]].forEach(function (p) {
                    g.appendChild(svgEl('circle', { cx: p[0], cy: p[1], r: 1.5, fill: INK_SOFT }));
                });
            }
        }
    ];

    // ── Prefixtabellen (från genomgången) ──────────────────────────────
    var PREFIXES = [
        { sym: 'T', name: 'tera', n: 12 }, { sym: 'G', name: 'giga', n: 9 },
        { sym: 'M', name: 'mega', n: 6 }, { sym: 'k', name: 'kilo', n: 3 },
        { sym: 'h', name: 'hekto', n: 2 }, { sym: 'da', name: 'deka', n: 1 },
        { sym: 'd', name: 'deci', n: -1 }, { sym: 'c', name: 'centi', n: -2 },
        { sym: 'm', name: 'milli', n: -3 }, { sym: 'µ', name: 'mikro', n: -6 },
        { sym: 'n', name: 'nano', n: -9 }, { sym: 'p', name: 'piko', n: -12 }
    ].filter(function (p) { return p.n >= -10 && p.n <= 22; })
     .sort(function (a, b) { return a.n - b.n; });

    // ── Sökuppdrag ──────────────────────────────────────────────────────
    var MISSIONS = [
        { text: 'Hitta en atom', a: 1, n: -10, tol: 0.3, found: 'Så liten är en atom – kärnan omgiven av ett elektronmoln.' },
        { text: 'Hitta en stad', a: 5, n: 3, tol: 0.3, found: 'Nu är du på en stads skala – hustaken sträcker sig kilometervis.' },
        { text: 'Hitta månens bana', a: 3, n: 8, tol: 0.3, found: 'Så långt är det till månen – omkring 3,8 · 10<sup>8</sup> m.' }
    ];
    MISSIONS.forEach(function (m) { m.L = m.n + Math.log10(m.a); });

    function mount(el) {
        var N_MIN = -10, N_MAX = 22;
        var state = { n: 0, step: 1 };
        var missionDone = MISSIONS.map(function () { return false; });
        var quiz = { answered: false };
        var animId = null;

        function stopAnim() { if (animId != null) { cancelAnimationFrame(animId); animId = null; } }
        function jumpTo(target) {
            stopAnim();
            state.n = clampNum(target, N_MIN, N_MAX);
            syncSlider();
            update();
        }
        function animateTo(target, ms) {
            stopAnim();
            var n0 = state.n, t0 = null;
            function frame(ts) {
                if (t0 == null) t0 = ts;
                var p = clampNum((ts - t0) / ms, 0, 1);
                var ease = p * p * (3 - 2 * p);
                state.n = n0 + (target - n0) * ease;
                syncSlider();
                update();
                if (p < 1) animId = requestAnimationFrame(frame);
                else animId = null;
            }
            animId = requestAnimationFrame(frame);
        }

        // ── DOM-skelett ──────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'lab-graf-card lab-vis';

        var title = document.createElement('div');
        title.className = 'lab-graf-title';
        title.textContent = 'Zoomresan – grundpotensform';
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
        var W = 560, H = 320;
        var svg = svgEl('svg', {
            viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
            'font-family': 'DM Sans, system-ui, sans-serif', role: 'img',
            'aria-label': 'Zoomvy som visar ett typiskt objekt för aktuell tiopotens, från atomer till Vintergatan.'
        });
        svg.classList.add('lab-graf-svg');
        svg.style.cursor = 'default';
        scene.appendChild(svg);

        var scene2 = document.createElement('div');
        scene2.className = 'lab-graf-scene lab-vis-scene';
        scene2.style.marginTop = '8px';
        card.appendChild(scene2);
        var W2 = 560, H2 = 70, H2_PREFIX = 96;
        var svg2 = svgEl('svg', {
            viewBox: '0 0 ' + W2 + ' ' + H2, width: W2, height: H2,
            'font-family': 'DM Sans, system-ui, sans-serif', role: 'img',
            'aria-label': 'Dekadlinjal från 10 upphöjt till minus 10 till 10 upphöjt till 22 meter, med aktuell position markerad.'
        });
        svg2.classList.add('lab-graf-svg');
        svg2.style.cursor = 'default';
        scene2.appendChild(svg2);

        var bigValue = document.createElement('div');
        bigValue.className = 'lab-vis-formel';
        bigValue.style.fontSize = '26px';
        bigValue.style.marginTop = '10px';
        card.appendChild(bigValue);

        var plainValue = document.createElement('div');
        plainValue.style.textAlign = 'center';
        plainValue.style.fontSize = '13.5px';
        plainValue.style.color = 'var(--lab-ink-soft)';
        plainValue.style.marginTop = '2px';
        card.appendChild(plainValue);

        var caption = document.createElement('div');
        caption.style.textAlign = 'center';
        caption.style.fontSize = '14px';
        caption.style.color = 'var(--lab-ink)';
        caption.style.marginTop = '8px';
        caption.style.minHeight = '20px';
        card.appendChild(caption);

        // ── Steg-specifika paneler ─────────────────────────────────────
        var quizPanel = document.createElement('div');
        card.appendChild(quizPanel);
        var convPanel = document.createElement('div');
        card.appendChild(convPanel);
        var missionPanel = document.createElement('div');
        card.appendChild(missionPanel);
        var prefixPanel = document.createElement('div');
        card.appendChild(prefixPanel);

        // — Steg 1: gissa-först-quiz —
        var quizQ = document.createElement('div');
        quizQ.className = 'lab-vis-note';
        quizQ.style.color = 'var(--lab-ink-soft)';
        quizQ.innerHTML = 'Gissa först: hur många <em>×10</em>-steg är det från en människa (10<sup>0</sup> m) till jorden (10<sup>7</sup> m)?';
        quizPanel.appendChild(quizQ);
        var quizBtns = document.createElement('div');
        quizBtns.style.display = 'flex';
        quizBtns.style.justifyContent = 'center';
        quizBtns.style.gap = '10px';
        quizBtns.style.flexWrap = 'wrap';
        quizBtns.style.margin = '8px 0';
        quizPanel.appendChild(quizBtns);
        var quizReveal = document.createElement('div');
        quizReveal.className = 'lab-vis-note';
        quizPanel.appendChild(quizReveal);
        var quizActions = document.createElement('div');
        quizActions.className = 'lab-vis-actions';
        quizActions.style.display = 'none';
        quizPanel.appendChild(quizActions);
        var showJourneyBtn = document.createElement('button');
        showJourneyBtn.type = 'button';
        showJourneyBtn.className = 'lab-btn';
        showJourneyBtn.textContent = 'Visa resan på skalan';
        showJourneyBtn.addEventListener('click', function () {
            state.n = 0; syncSlider(); update();
            animateTo(7, 2200);
        });
        quizActions.appendChild(showJourneyBtn);

        [3, 5, 7, 10].forEach(function (val) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = String(val);
            b.addEventListener('click', function () {
                quiz.answered = true;
                Array.prototype.forEach.call(quizBtns.children, function (btn, idx) {
                    var v = [3, 5, 7, 10][idx];
                    btn.style.background = v === 7 ? GOOD : (v === val && val !== 7 ? '#a83232' : '');
                    btn.style.color = (v === 7 || (v === val && val !== 7)) ? '#fff' : '';
                    btn.style.borderColor = v === 7 ? GOOD : (v === val && val !== 7 ? '#a83232' : '');
                });
                quizReveal.innerHTML = 'Rätt svar är 7. Varje ×10-steg höjer exponenten n med exakt 1, och 7 − 0 = 7 steg skiljer människan (10<sup>0</sup> m) från jorden (10<sup>7</sup> m).';
                quizActions.style.display = '';
            });
            quizBtns.appendChild(b);
        });

        // — Steg 2: grundpotensform-omvandlaren —
        var convChipsRow = document.createElement('div');
        convChipsRow.style.display = 'flex';
        convChipsRow.style.flexWrap = 'wrap';
        convChipsRow.style.justifyContent = 'center';
        convChipsRow.style.gap = '8px';
        convChipsRow.style.marginBottom = '10px';
        convPanel.appendChild(convChipsRow);

        var convInputRow = document.createElement('div');
        convInputRow.style.display = 'flex';
        convInputRow.style.justifyContent = 'center';
        convInputRow.style.alignItems = 'center';
        convInputRow.style.gap = '8px';
        convPanel.appendChild(convInputRow);
        var convInput = document.createElement('input');
        convInput.type = 'text';
        convInput.className = 'lab-graf-num';
        convInput.style.width = '170px';
        convInput.style.textAlign = 'left';
        convInput.placeholder = 't.ex. 45000 eller 0,0007';
        convInput.setAttribute('aria-label', 'Skriv ett eget tal att omvandla');
        convInputRow.appendChild(convInput);
        var convBtn = document.createElement('button');
        convBtn.type = 'button';
        convBtn.className = 'lab-btn';
        convBtn.textContent = 'Omvandla';
        convInputRow.appendChild(convBtn);

        var convResult = document.createElement('div');
        convResult.className = 'lab-vis-formel';
        convPanel.appendChild(convResult);
        var convNote = document.createElement('div');
        convNote.className = 'lab-vis-note';
        convPanel.appendChild(convNote);

        function doConvert(raw, unit) {
            var parsed = parseToGrundpotens(raw);
            if (!parsed) {
                convResult.textContent = '';
                convNote.textContent = 'Kunde inte tolka talet – skriv t.ex. 384000000 eller 0,0009.';
                return;
            }
            var aTex = texFromDot(parsed.aStr);
            var sign = parsed.neg ? '-' : '';
            var groupedTex = plainNumberTex(parsed.aStr, parsed.n);
            var unitTex = unit ? '\\ \\text{' + unit + '}' : '';
            katexInto(convResult, sign + groupedTex + unitTex + ' = ' + sign + aTex + ' \\cdot 10^{' + parsed.n + '}' + unitTex);
            if (parsed.n >= 0) {
                convNote.textContent = parsed.n + ' siffror efter den första siffran ger exponenten ' + parsed.n + '.';
            } else {
                convNote.textContent = (-parsed.n) + ' nollor före den första siffran ger den negativa exponenten −' + (-parsed.n) + '.';
            }
            if (!parsed.neg) {
                var target = parsed.n + Math.log10(parseFloat(parsed.aStr));
                jumpTo(target);
            }
        }
        convBtn.addEventListener('click', function () { doConvert(convInput.value, ''); });
        convInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') doConvert(convInput.value, ''); });

        [
            { label: '8 000 000 000', raw: '8000000000', unit: '' },
            { label: '743 000', raw: '743000', unit: '' },
            { label: '0,0009', raw: '0.0009', unit: '' },
            { label: '0,000024', raw: '0.000024', unit: '' },
            { label: '384 000 000 m (till månen)', raw: '384000000', unit: 'm' }
        ].forEach(function (chip) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            b.textContent = chip.label;
            b.addEventListener('click', function () {
                convInput.value = chip.raw;
                doConvert(chip.raw, chip.unit);
            });
            convChipsRow.appendChild(b);
        });

        // — Steg 3: sökuppdrag —
        var missionRows = [];
        MISSIONS.forEach(function (m, idx) {
            var row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '10px';
            row.style.padding = '8px 10px';
            row.style.border = '1px solid var(--lab-line)';
            row.style.borderRadius = '4px';
            row.style.marginBottom = '8px';
            var dot = document.createElement('span');
            dot.style.display = 'inline-block';
            dot.style.width = '11px';
            dot.style.height = '11px';
            dot.style.borderRadius = '50%';
            dot.style.flexShrink = '0';
            dot.style.background = 'var(--lab-line-strong)';
            row.appendChild(dot);
            var txt = document.createElement('span');
            txt.style.flex = '1';
            txt.style.fontSize = '14px';
            row.appendChild(txt);
            var targ = document.createElement('span');
            targ.style.fontSize = '13px';
            row.appendChild(targ);
            katexInto(targ, m.a + ' \\cdot 10^{' + m.n + '}\\ \\text{m}');
            missionPanel.appendChild(row);
            missionRows.push({ row: row, dot: dot, txt: txt });
        });

        // — Steg 4: prefixen —
        var prefixNote = document.createElement('div');
        prefixNote.className = 'lab-vis-note';
        prefixPanel.appendChild(prefixNote);
        var prefixChips = document.createElement('div');
        prefixChips.style.display = 'flex';
        prefixChips.style.flexWrap = 'wrap';
        prefixChips.style.justifyContent = 'center';
        prefixChips.style.gap = '8px';
        prefixChips.style.marginTop = '8px';
        prefixPanel.appendChild(prefixChips);
        PREFIXES.forEach(function (p) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'lab-btn';
            // Unicode-superscript (inte <sup>) — <sup> reser sig inte
            // korrekt inuti <button> i den här miljön (vertical-align
            // ignoreras), medan Unicode-siffrorna renderar pålitligt.
            b.textContent = p.sym + ' · ' + p.name + ' (10' + supStr(p.n) + ')';
            b.addEventListener('click', function () { jumpTo(p.n); });
            prefixChips.appendChild(b);
        });

        // ── Glidare + ×10/÷10 ────────────────────────────────────────────
        var controls = document.createElement('div');
        controls.className = 'lab-graf-controls';
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'lab-graf-row';
        controls.appendChild(sliderRow);
        var divBtn = document.createElement('button');
        divBtn.type = 'button';
        divBtn.className = 'lab-btn';
        divBtn.textContent = '÷ 10';
        divBtn.title = 'Zooma in ett steg';
        divBtn.addEventListener('click', function () { jumpTo(state.n - 1); });
        sliderRow.appendChild(divBtn);
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'lab-graf-slider';
        slider.min = N_MIN; slider.max = N_MAX; slider.step = 0.02; slider.value = state.n;
        slider.setAttribute('aria-label', 'Zoomposition, exponenten n');
        slider.addEventListener('input', function () {
            stopAnim();
            state.n = clampNum(parseFloat(slider.value), N_MIN, N_MAX);
            update();
        });
        sliderRow.appendChild(slider);
        var mulBtn = document.createElement('button');
        mulBtn.type = 'button';
        mulBtn.className = 'lab-btn';
        mulBtn.textContent = '× 10';
        mulBtn.title = 'Zooma ut ett steg';
        mulBtn.addEventListener('click', function () { jumpTo(state.n + 1); });
        sliderRow.appendChild(mulBtn);

        function paintSlider() {
            var pct = clampNum((state.n - N_MIN) / (N_MAX - N_MIN) * 100, 0, 100);
            slider.style.background = 'linear-gradient(to right, ' + PATH + ' 0%, ' + PATH + ' ' + pct + '%, rgba(15,22,32,0.22) ' + pct + '%, rgba(15,22,32,0.22) 100%)';
        }
        function syncSlider() { slider.value = state.n; paintSlider(); }

        var endsRow = document.createElement('div');
        endsRow.style.display = 'flex';
        endsRow.style.justifyContent = 'space-between';
        endsRow.style.fontSize = '11.5px';
        endsRow.style.color = 'var(--lab-ink-soft)';
        endsRow.style.fontFamily = 'var(--lab-font-mono)';
        endsRow.style.marginTop = '2px';
        controls.appendChild(endsRow);
        var endL = document.createElement('span'); endL.innerHTML = '10<sup>&minus;10</sup> m (atom)';
        var endR = document.createElement('span'); endR.innerHTML = '10<sup>22</sup> m';
        endsRow.appendChild(endL); endsRow.appendChild(endR);

        var foot = document.createElement('div');
        foot.className = 'lab-graf-foot';
        card.appendChild(foot);
        var resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'lab-graf-reset';
        resetBtn.textContent = 'Återställ';
        resetBtn.addEventListener('click', function () {
            stopAnim();
            state.n = 0; state.step = 1;
            quiz.answered = false;
            for (var i = 0; i < missionDone.length; i++) missionDone[i] = false;
            convInput.value = ''; convResult.textContent = ''; convNote.textContent = '';
            quizReveal.textContent = ''; quizActions.style.display = 'none';
            Array.prototype.forEach.call(quizBtns.children, function (btn) {
                btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = '';
            });
            syncSlider();
            update();
        });
        foot.appendChild(resetBtn);

        el.innerHTML = '';
        el.appendChild(card);

        // ── Steg-knappar ─────────────────────────────────────────────────
        var STEPS = [
            { n: 1, label: '1 · Resan' },
            { n: 2, label: '2 · Grundpotensformen' },
            { n: 3, label: '3 · Sökuppdrag' },
            { n: 4, label: '4 · Prefixen' }
        ];
        var INSTR = {
            1: 'Dra i glidaren – eller tryck <em>×10</em>/<em>÷10</em> – och res genom skalorna, från atomens inre till Vintergatans yttre kant.',
            2: 'Välj ett tal (eller skriv ett eget) och se det skrivas om i grundpotensform, steg för steg. Zoomvyn hoppar dit.',
            3: 'Ställ in glidaren så nära målvärdet som möjligt för varje uppdrag. Kommer du inom räckhåll blir det klart.',
            4: 'Prefixen ersätter tiopotensen framför en enhet. De är markerade på skalan nedanför – dra glidaren eller tryck på ett prefix för att hoppa dit.'
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

        // ── Ritning: huvudscen (vinjett-crossfade) ─────────────────────
        function computeBlend(n) {
            if (n <= DECADES[0].n) return { li: 0, ui: null, t: 0 };
            for (var i = 0; i < DECADES.length - 1; i++) {
                if (n >= DECADES[i].n && n <= DECADES[i + 1].n) {
                    return { li: i, ui: i + 1, t: (n - DECADES[i].n) / (DECADES[i + 1].n - DECADES[i].n) };
                }
            }
            return { li: DECADES.length - 1, ui: null, t: 0 };
        }
        function ease(t) { return t * t * (3 - 2 * t); }

        function drawCorner(x, y, dx, dy, len) {
            svg.appendChild(svgEl('path', {
                d: 'M ' + x + ' ' + (y + dy * len) + ' L ' + x + ' ' + y + ' L ' + (x + dx * len) + ' ' + y,
                fill: 'none', stroke: INK_SOFT, 'stroke-width': 1.6, 'stroke-linecap': 'round'
            }));
        }

        function renderVignette() {
            while (svg.firstChild) svg.removeChild(svg.firstChild);
            var fx = 8, fy = 8, fw = W - 16, fh = H - 16;
            svg.appendChild(svgEl('rect', { x: fx, y: fy, width: fw, height: fh, rx: 4, fill: 'none', stroke: 'var(--lab-line-strong)', 'stroke-width': 1.4 }));
            drawCorner(fx + 6, fy + 6, 1, 1, 14);
            drawCorner(fx + fw - 6, fy + 6, -1, 1, 14);
            drawCorner(fx + 6, fy + fh - 6, 1, -1, 14);
            drawCorner(fx + fw - 6, fy + fh - 6, -1, -1, 14);

            var dec = decompose(state.n);
            svg.appendChild(svgText({ x: 24, y: 30, 'font-size': 12, 'text-anchor': 'start', fill: INK_SOFT },
                '10' + supStr(dec.nInt) + ' – 10' + supStr(dec.nInt + 1) + ' m'));

            var cx = fx + fw / 2, cy = fy + fh / 2 + 8;
            var blend = computeBlend(state.n);
            var lowerOpacity = blend.ui == null ? 1 : 1 - ease(blend.t);
            var lowerScale = blend.ui == null ? 1 : 1 - 0.5 * ease(blend.t);
            var gLower = svgEl('g', { transform: 'translate(' + cx + ',' + cy + ') scale(' + lowerScale.toFixed(3) + ')', opacity: lowerOpacity.toFixed(3) });
            DECADES[blend.li].draw(gLower);
            svg.appendChild(gLower);
            if (blend.ui != null) {
                var upperOpacity = ease(blend.t);
                var upperScale = 0.5 + 0.5 * ease(blend.t);
                var gUpper = svgEl('g', { transform: 'translate(' + cx + ',' + cy + ') scale(' + upperScale.toFixed(3) + ')', opacity: upperOpacity.toFixed(3) });
                DECADES[blend.ui].draw(gUpper);
                svg.appendChild(gUpper);
            }
        }

        // ── Ritning: dekadlinjal ────────────────────────────────────────
        var marginL = 28, marginR = 20;
        var pxPerDecade = (W2 - marginL - marginR) / (N_MAX - N_MIN);
        function rx(n) { return marginL + (n - N_MIN) * pxPerDecade; }
        var LABEL_NS = [-10, -8, -4, 0, 4, 8, 12, 16, 20, 22];

        function renderRuler() {
            while (svg2.firstChild) svg2.removeChild(svg2.firstChild);
            var hNow = state.step === 4 ? H2_PREFIX : H2;
            svg2.setAttribute('viewBox', '0 0 ' + W2 + ' ' + hNow);
            svg2.setAttribute('height', hNow);
            var baseY = 34;
            svg2.appendChild(svgEl('line', { x1: rx(N_MIN), y1: baseY, x2: rx(N_MAX), y2: baseY, stroke: INK, 'stroke-width': 1.4 }));
            for (var n = N_MIN; n <= N_MAX; n++) {
                var tall = LABEL_NS.indexOf(n) >= 0;
                svg2.appendChild(svgEl('line', { x1: rx(n), y1: baseY - (tall ? 8 : 4), x2: rx(n), y2: baseY, stroke: INK_SOFT, 'stroke-width': tall ? 1.3 : 1 }));
                if (tall) {
                    var labelY = (n === N_MIN || n === N_MAX) ? 13 : 20;
                    svg2.appendChild(svgText({ x: rx(n), y: labelY, 'font-size': 9, 'text-anchor': 'middle', fill: INK_SOFT }, '10' + supStr(n)));
                }
            }
            DECADES.forEach(function (d) {
                svg2.appendChild(svgEl('circle', { cx: rx(d.n), cy: baseY, r: 2, fill: INK_SOFT }));
            });
            if (state.step === 4) {
                PREFIXES.forEach(function (p, i) {
                    var level = i % 3;
                    svg2.appendChild(svgEl('line', { x1: rx(p.n), y1: baseY, x2: rx(p.n), y2: baseY + 9, stroke: PATH, 'stroke-width': 1.5 }));
                    svg2.appendChild(svgText({ x: rx(p.n), y: baseY + 20 + level * 12, 'font-size': 9.5, 'text-anchor': 'middle', fill: PATH }, p.sym));
                });
            }
            var mx = rx(state.n);
            svg2.appendChild(svgEl('line', { x1: mx, y1: 8, x2: mx, y2: baseY - 8, stroke: PATH, 'stroke-width': 1.3, 'stroke-dasharray': '3 3' }));
            svg2.appendChild(svgEl('polygon', { points: (mx - 5) + ',' + (baseY - 8) + ' ' + (mx + 5) + ',' + (baseY - 8) + ' ' + mx + ',' + baseY, fill: PATH }));
        }

        // ── Värden, bildtext, paneler ────────────────────────────────────
        function renderValues() {
            var dec = decompose(state.n);
            var aStr = numToDotStr(dec.aNum);
            katexInto(bigValue, texFromDot(aStr) + ' \\cdot 10^{' + dec.nInt + '}\\ \\text{m}');
            plainValue.textContent = '= ' + plainNumberHtml(aStr, dec.nInt, 'm');

            var blend = computeBlend(state.n);
            if (blend.ui == null) {
                caption.textContent = DECADES[blend.li].caption;
            } else if (blend.t < 0.35) {
                caption.textContent = DECADES[blend.li].caption;
            } else if (blend.t > 0.65) {
                caption.textContent = DECADES[blend.ui].caption;
            } else {
                caption.textContent = 'Mellan ' + DECADES[blend.li].name + ' och ' + DECADES[blend.ui].name + '.';
            }
        }

        function renderMissions() {
            MISSIONS.forEach(function (m, i) {
                if (!missionDone[i] && Math.abs(state.n - m.L) <= m.tol) missionDone[i] = true;
                var mr = missionRows[i];
                mr.dot.style.background = missionDone[i] ? GOOD : 'var(--lab-line-strong)';
                mr.txt.innerHTML = m.text + (missionDone[i] ? ' – klart! ' + m.found : '');
                mr.row.style.background = missionDone[i] ? 'var(--lab-bg-raised)' : '';
            });
        }

        function renderPrefixNote() {
            var nearest = PREFIXES[0], best = Infinity;
            PREFIXES.forEach(function (p) {
                var d = Math.abs(p.n - state.n);
                if (d < best) { best = d; nearest = p; }
            });
            prefixNote.innerHTML = 'Just nu närmast prefixet <strong>' + nearest.name + '</strong> (' + nearest.sym + '): <span style="white-space:nowrap">1 ' + nearest.sym + ' = 10' + supHtml(nearest.n) + '</span>.';
        }

        function update() {
            stepBtns.forEach(function (b, i) { b.classList.toggle('active', state.step === i + 1); });
            instr.innerHTML = INSTR[state.step];
            quizPanel.style.display = state.step === 1 ? '' : 'none';
            convPanel.style.display = state.step === 2 ? '' : 'none';
            missionPanel.style.display = state.step === 3 ? '' : 'none';
            prefixPanel.style.display = state.step === 4 ? '' : 'none';

            paintSlider();
            renderVignette();
            renderRuler();
            renderValues();
            if (state.step === 3) renderMissions();
            if (state.step === 4) renderPrefixNote();
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
    window.VISUALISERINGAR['ma1c-1.9'] = { mount: mount };
})();
