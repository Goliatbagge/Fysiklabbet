/* minisim-kalkylblad.js — animerat kalkylblad i Google Kalkylark-stil.
 *
 * Laddas lazy av minisim.js (typ: kalkylblad) och visar steg för steg hur
 * eleven fyller i ett kalkylblad: muspekaren klickar i celler, text skrivs
 * tecken för tecken, formeln färgar sina cellreferenser, Enter flyttar
 * markeringen nedåt och fyllnadshandtaget dras ned så att formeln kopieras.
 * Animeringen klickas fram i steg, så att eleven hinner tänka efter varje
 * steg; varje steg kan pausas, spelas igen eller hoppas över.
 *
 *   ::: minisim
 *   typ: kalkylblad
 *   scen: arligt
 *   :::
 *
 * Används i textlösningarna till Exempel 1 (scen: sparkonto, standard) och
 * Exempel 2 (scen: arligt) i ma1c-3.4 samt Exempel 1 c i ma1c-3.5 (scen:
 * billan, 63 rader som rullar, med SUM). Varje scen är en egen steglista
 * (SPARKONTO, ARLIGT nedan) byggd av samma primitiver (klicka, ringa in,
 * skriv, piltangenter, Enter, dra i fyllnadshandtaget, markera, formatera
 * som valuta). En ny uppgift får en egen steglista och ett eget scennamn.
 *
 * Bladet ritas med absolut positionerade celler i fasta koordinater
 * (kolumnbredder i COLW), så att markeringar, referensramar och pekare kan
 * placeras utan DOM-mätning. Är behållaren smalare än bladet klipps
 * kolumnerna längst till höger, precis som i ett riktigt kalkylprogram.
 *
 * Steg k börjar alltid från slutläget i steg k−1: det räknas fram genom att
 * köra de tidigare stegen i "instant"-läge (inga väntetider, ingen pekare).
 */
(function () {
    'use strict';

    var COLS = ['', 'A', 'B', 'C', 'D', 'E'];
    var COLW_BRED = [38, 132, 128, 96, 96, 96];
    // smal skärm: A och B ska rymmas helt (radrubrik + "Förändringsfaktor" +
    // "39 504,27 kr"), resten av kolumnerna klipps i högerkanten
    var COLW_SMAL = [26, 108, 108, 90, 90, 90];
    // billånet (ma1c-3.5): fyra smala kolumner som alla ska synas, även på
    // telefonen, eftersom inbetalningarna i D är det som summeras
    var COLW_BILAN_BRED = [38, 72, 104, 90, 112, 80];
    var COLW_BILAN_SMAL = [24, 47, 56, 45, 68, 40];   // A–D = 240 px (bladet är 246 px på en 390 px-telefon)
    var VIS = 13;         // synliga rader; ett längre blad rullar
    var RH = 23;          // radhöjd
    var HH = 23;          // höjd på kolumnrubrikerna
    var BLA = '#1a73e8';  // markeringens färg i Kalkylark
    var REFF = ['#e37400', '#9334e6', '#188038', '#d93025'];
    // en cellreferens eller ett område (D2:D61)
    var REF_RE = /\$?[A-Z]\$?\d+(?::\$?[A-Z]\$?\d+)?/g;

    function colIdx(L) { return COLS.indexOf(L); }
    function parseRef(ref) {
        var m = /^\$?([A-Z])\$?(\d+)$/.exec(ref);
        return { c: colIdx(m[1]), r: +m[2] };
    }
    function refOf(c, r) { return COLS[c] + r; }

    /* ---------- tal i svensk form ---------- */
    function autoFmt(v) {
        if (Number.isInteger(v)) return String(v);
        return String(Number(v.toPrecision(10))).replace('.', ',');
    }
    function krFmt(v) {
        var s = v.toFixed(2).split('.');
        var heltal = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return heltal + ',' + s[1] + ' kr';
    }

    var CSS = [
        '.kb-wrap{font-family:Poppins,system-ui,sans-serif;max-width:100%;}',
        '.kb-app{position:relative;background:#fff;border:1px solid #c4c7c5;border-radius:10px;overflow:hidden;',
        '  box-shadow:0 1px 3px rgba(60,64,67,.15);color:#202124;user-select:none;-webkit-user-select:none;}',
        '.kb-top{background:#f9fbfd;border-bottom:1px solid #e1e3e1;}',
        '.kb-title{display:flex;align-items:center;gap:8px;padding:7px 12px 3px;font:400 14px/1.2 Roboto,Arial,sans-serif;color:#1f1f1f;}',
        '.kb-title svg{flex:0 0 auto}',
        '.kb-tool{display:flex;align-items:center;gap:2px;margin:3px 8px 7px;padding:3px 8px;background:#edf2fa;border-radius:20px;',
        '  font:500 13px/1 Roboto,Arial,sans-serif;color:#444746;overflow:hidden;white-space:nowrap;}',
        '.kb-tb{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:24px;padding:0 5px;border-radius:4px;}',
        '.kb-tb.on{background:#d3e3fd;color:#0b57d0;}',
        '.kb-sep{width:1px;height:18px;background:#c7c7c7;margin:0 5px;}',
        '.kb-fbar{display:flex;align-items:center;height:30px;border-bottom:1px solid #e1e3e1;background:#fff;',
        '  font:13px/1 Arial,Helvetica,sans-serif;}',
        '.kb-name{width:62px;padding:0 8px;color:#1f1f1f;border-right:1px solid #e1e3e1;height:100%;display:flex;align-items:center;}',
        '.kb-fx{padding:0 8px;color:#80868b;font:italic 15px/1 "Times New Roman",serif;border-right:1px solid #e1e3e1;height:100%;display:flex;align-items:center;}',
        '.kb-ftext{padding:0 8px;white-space:pre;position:relative;height:100%;display:flex;align-items:center;}',
        '.kb-sheet{position:relative;overflow:hidden;background:#fff;font:13px/1 Arial,Helvetica,sans-serif;}',
        '.kb-grid{position:absolute;left:0;top:0;}',
        '.kb-c{position:absolute;box-sizing:border-box;border-right:1px solid #e2e3e3;border-bottom:1px solid #e2e3e3;',
        '  padding:0 4px;display:flex;align-items:center;white-space:pre;overflow:hidden;}',
        '.kb-c.num{justify-content:flex-end;}',
        '.kb-c.kb-blink{animation:kbblinkbg 2.6s ease-out;}',
        '@keyframes kbblinkbg{0%,35%{background:#fde293}100%{background:transparent}}',
        '.kb-smal .kb-sheet,.kb-smal .kb-fbar{font-size:12px;}',
        '.kb-smal .kb-c{padding:0 3px;}',
        '.kb-smal .kb-ctrl{padding:0 10px;}',
        '.kb-c.over{overflow:visible;z-index:1;}',
        '.kb-h{background:#f8f9fa;color:#5f6368;justify-content:center;font-size:11px;border-color:#c4c7c5;}',
        '.kb-h.on{background:#d3e3fd;color:#0b57d0;font-weight:700;}',
        '.kb-h.in{background:#e8eaed;color:#202124;}',
        '.kb-ov{position:absolute;pointer-events:none;box-sizing:border-box;}',
        '.kb-range{background:rgba(26,115,232,.1);border:1px solid ' + BLA + ';z-index:2;}',
        '.kb-act{border:2px solid ' + BLA + ';z-index:3;}',
        '.kb-handle{width:9px;height:9px;border-radius:50%;background:' + BLA + ';border:1.5px solid #fff;z-index:4;}',
        '.kb-ref{border:1.5px dashed;z-index:3;}',
        '.kb-refsolid{border-style:solid;}',
        '.kb-fillprev{border:1.5px dashed #5f6368;z-index:3;}',
        '.kb-edit{background:#fff;border:2px solid ' + BLA + ';z-index:5;display:flex;align-items:center;padding:0 3px;',
        '  white-space:pre;box-shadow:0 2px 6px rgba(60,64,67,.3);}',
        '.kb-caret{display:inline-block;width:1px;height:15px;background:#202124;margin-left:1px;vertical-align:middle;animation:kbblink 1s steps(1) infinite;}',
        '@keyframes kbblink{50%{opacity:0}}',
        '.kb-cursor{position:absolute;left:0;top:0;z-index:20;pointer-events:none;transition:none;}',
        '.kb-ripple{position:absolute;z-index:19;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;',
        '  background:rgba(26,115,232,.35);pointer-events:none;animation:kbrip .45s ease-out forwards;}',
        '@keyframes kbrip{from{transform:scale(.2);opacity:1}to{transform:scale(1.4);opacity:0}}',
        '.kb-key{position:absolute;right:10px;bottom:10px;z-index:21;background:#3c4043;color:#fff;border-radius:6px;',
        '  padding:6px 11px;font:600 13px/1 Roboto,Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.25);opacity:0;',
        '  transition:opacity .15s;pointer-events:none;}',
        '.kb-key.on{opacity:1;}',
        '.kb-ctrl{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin-top:10px;}',
        '.kb-btn{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-radius:17px;cursor:pointer;',
        '  font:600 13px/1 Poppins,system-ui,sans-serif;border:1.5px solid var(--lab-ink,#1b2330);background:transparent;color:var(--lab-ink,#1b2330);}',
        '.kb-btn.prim{background:var(--lab-ink,#1b2330);color:#fff;}',
        '.kb-btn[hidden]{display:none;}',
        '.kb-btn:disabled{opacity:.35;cursor:default;}',
        // textrutan som förklarar det aktuella steget; byts ut vid varje steg
        '.kb-cap{flex:1 1 100%;box-sizing:border-box;padding:10px 14px;background:#fbf8f1;border:1px solid var(--lab-line-strong,#b9ae98);',
        '  border-left:3px solid var(--lab-ink,#1b2330);border-radius:6px;font:400 15px/1.55 Poppins,system-ui,sans-serif;color:var(--lab-ink,#1b2330);}',
        '.kb-cap.in{animation:kbcap .35s ease-out;}',
        '@keyframes kbcap{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}',
        '.kb-cap-rub{display:block;margin-bottom:3px;font:600 11px/1.3 Poppins,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6b6250;}',
        '.kb-cap code{font:500 .92em/1 Roboto Mono,Consolas,monospace;background:#efe8da;padding:1px 4px;border-radius:3px;white-space:nowrap;}'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('kb-css')) return;
        var st = document.createElement('style');
        st.id = 'kb-css';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    function el(tag, cls, parent) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (parent) parent.appendChild(e);
        return e;
    }
    function place(e, r) {
        e.style.left = r.x + 'px'; e.style.top = r.y + 'px';
        e.style.width = r.w + 'px'; e.style.height = r.h + 'px';
    }

    var IKON_PLAY = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 1.5v9l8-4.5z" fill="currentColor"/></svg>';
    var IKON_PAUS = '<svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="1.5" width="2.8" height="9" fill="currentColor"/><rect x="7.2" y="1.5" width="2.8" height="9" fill="currentColor"/></svg>';
    var IKON_OM = '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.5 7a4.5 4.5 0 1 0 1.4-3.3"/><path d="M2.2 1.8v2.6h2.6"/></svg>';
    var IKON_BAK = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L4 6l4 4"/></svg>';
    var IKON_FRAM = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2l4 4-4 4"/></svg>';
    var PEKARE = '<svg width="20" height="22" viewBox="0 0 20 22"><path d="M1.5 1.5v16l4.2-4 2.9 6.6 2.6-1.1-2.9-6.5h6z" fill="#fff" stroke="#202124" stroke-width="1.4" stroke-linejoin="round"/></svg>';
    var KORS = '<svg width="20" height="20" viewBox="-10 -10 20 20"><path d="M0-8V8M-8 0H8" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M0-8V8M-8 0H8" stroke="#202124" stroke-width="1.6"/></svg>';

    function mount(node, cfg) {
        cfg = cfg || {};
        var scen = ({ arligt: 1, 'sparkonto-b': 1, 'sparkonto-c': 1, billan: 1 })[cfg.scen] ? cfg.scen : 'sparkonto';
        injectCss();
        var smal = (node.clientWidth || 600) < 400;

        /* bladets geometri hör till instansen: flera blad på samma sida
         * kan ha olika kolumnbredd och olika antal rader */
        var ROWS = scen === 'billan' ? 63 : VIS;
        var COLW = scen === 'billan' ? (smal ? COLW_BILAN_SMAL : COLW_BILAN_BRED)
                                     : (smal ? COLW_SMAL : COLW_BRED);
        var colX = [0];
        for (var ci = 0; ci < COLW.length; ci++) colX.push(colX[ci] + COLW[ci]);
        var SHEET_W = colX[colX.length - 1];
        var SHEET_H = HH + ROWS * RH;          // hela bladet
        var VIEW_H = HH + Math.min(ROWS, VIS) * RH;   // det som syns
        function cellRect(ref) {
            var p = parseRef(ref);
            return { x: colX[p.c], y: HH + (p.r - 1) * RH, w: COLW[p.c], h: RH };
        }
        function rangeRect(a, b) {
            var r1 = cellRect(a), r2 = cellRect(b);
            var x = Math.min(r1.x, r2.x), y = Math.min(r1.y, r2.y);
            return { x: x, y: y, w: Math.max(r1.x + r1.w, r2.x + r2.w) - x,
                     h: Math.max(r1.y + r1.h, r2.y + r2.h) - y };
        }
        function refRect(rf) {
            var d = rf.split(':');
            return d.length > 1 ? rangeRect(d[0], d[1]) : cellRect(rf);
        }
        var wrap = el('div', 'kb-wrap' + (smal ? ' kb-smal' : ''), node);
        var app = el('div', 'kb-app', wrap);

        /* ---------- programfönstrets överdel ---------- */
        var top = el('div', 'kb-top', app);
        var title = el('div', 'kb-title', top);
        title.innerHTML = '<svg width="16" height="20" viewBox="0 0 16 20"><path d="M10 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6z" fill="#0f9d58"/><path d="M10 0v6h6z" fill="#87ceac"/><rect x="3.5" y="9" width="9" height="7" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M3.5 11.5h9M3.5 14h9M7 9v7" stroke="#fff" stroke-width="1.2"/></svg><span>' + (({ arligt: 'Årligt sparande', billan: 'Billån' })[scen] || 'Sparkonto') + '</span>';
        var tool = el('div', 'kb-tool', top);
        tool.innerHTML =
            '<span class="kb-tb"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4L2 7l3 3"/><path d="M2 7h7.5a4 4 0 0 1 0 8H7"/></svg></span>' +
            '<span class="kb-tb"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4l3 3-3 3"/><path d="M14 7H6.5a4 4 0 0 0 0 8H9"/></svg></span>' +
            '<span class="kb-sep"></span><span class="kb-tb">100 %</span><span class="kb-sep"></span>' +
            '<span class="kb-tb" data-tb="kr">kr</span><span class="kb-tb">%</span>' +
            '<span class="kb-tb">.0</span><span class="kb-tb">.00</span><span class="kb-tb">123</span>' +
            '<span class="kb-sep"></span><span class="kb-tb">Arial</span>';
        var fbar = el('div', 'kb-fbar', app);
        var nameBox = el('div', 'kb-name', fbar);
        el('div', 'kb-fx', fbar).textContent = 'fx';
        var ftext = el('div', 'kb-ftext', fbar);

        var sheet = el('div', 'kb-sheet', app);
        sheet.style.height = VIEW_H + 'px';
        var grid = el('div', 'kb-grid', sheet);
        grid.style.width = SHEET_W + 'px';
        grid.style.height = SHEET_H + 'px';

        var key = el('div', 'kb-key', app);
        var cursor = el('div', 'kb-cursor', app);
        cursor.innerHTML = PEKARE;
        cursor.style.display = 'none';

        /* rubrikceller och celler */
        var hdrC = [], hdrR = [], cellEl = {};
        for (var c = 0; c < COLS.length; c++) {
            var h = el('div', 'kb-c kb-h', grid);
            place(h, { x: colX[c], y: 0, w: COLW[c], h: HH });
            h.textContent = COLS[c];
            h.style.zIndex = 8;      // kolumnrubrikerna står kvar när bladet rullar
            hdrC.push(h);
        }
        for (var r = 1; r <= ROWS; r++) {
            var hr = el('div', 'kb-c kb-h', grid);
            place(hr, { x: 0, y: HH + (r - 1) * RH, w: COLW[0], h: RH });
            hr.textContent = r;
            hdrR[r] = hr;
            for (c = 1; c < COLS.length; c++) {
                var ce = el('div', 'kb-c', grid);
                place(ce, cellRect(refOf(c, r)));
                cellEl[refOf(c, r)] = ce;
            }
        }
        var ovRange = el('div', 'kb-ov kb-range', grid);
        var ovAct = el('div', 'kb-ov kb-act', grid);
        var ovHandle = el('div', 'kb-ov kb-handle', grid);
        var ovFill = el('div', 'kb-ov kb-fillprev', grid);
        var ovEdit = el('div', 'kb-ov kb-edit', grid);
        // ringar som pekaren ritar runt en cell för att peka ut den
        var SVGNS = 'http://www.w3.org/2000/svg';
        var markLager = document.createElementNS(SVGNS, 'svg');
        markLager.setAttribute('class', 'kb-ov kb-mark');
        markLager.setAttribute('width', SHEET_W);
        markLager.setAttribute('height', SHEET_H);
        markLager.style.cssText = 'display:block;left:0;top:0;z-index:6;overflow:visible;';
        grid.appendChild(markLager);
        function rensaMarkeringar() { markLager.innerHTML = ''; }
        var refBoxes = [];
        for (var i = 0; i < 3; i++) refBoxes.push(el('div', 'kb-ov kb-ref', grid));

        /* ---------- bladets tillstånd ---------- */
        var S;
        function nyttBlad() {
            return { cells: {}, act: 'A1', range: null, edit: null, fbarEdit: false,
                     fill: null, refs: [], krOn: false, top: 1 };
        }

        /* Värdena räknas i en kedja (B61 bygger på B60 och så vidare), så
         * under ett renderingsvarv sparas varje uträknat värde i memo. */
        var memo = null;
        function value(ref) {
            ref = ref.replace(/\$/g, '');
            if (memo && ref in memo) return memo[ref];
            var v = varde(ref);
            if (memo) memo[ref] = v;
            return v;
        }
        function varde(ref) {
            var cell = S.cells[ref];
            if (!cell) return 0;
            if (typeof cell.raw === 'number') return cell.raw;
            if (typeof cell.raw === 'string' && cell.raw.charAt(0) === '=') {
                // SUM(D2:D61) summerar ett område i en kolumn
                var expr = cell.raw.slice(1).replace(/SUM\(\$?([A-Z])\$?(\d+):\$?[A-Z]\$?(\d+)\)/g, function (m, L, r1, r2) {
                    var sum = 0;
                    for (var rr = +r1; rr <= +r2; rr++) { var x = value(L + rr); if (typeof x === 'number') sum += x; }
                    return '(' + sum + ')';
                });
                expr = expr.replace(/\$?[A-Z]\$?\d+/g, function (m) {
                    return '(' + value(m) + ')';
                });
                expr = expr.replace(/(\d),(\d)/g, '$1.$2');   // decimalkomma i formeln
                if (!/^[0-9.()*+\-\/ ]+$/.test(expr)) return 0;
                return Function('return ' + expr)();
            }
            return cell.raw;
        }
        function visas(ref) {
            var cell = S.cells[ref];
            if (!cell) return { t: '', num: false };
            var v = value(ref);
            if (typeof v === 'number') {
                // ett formelresultat visas med högst två decimaler (kronor och
                // ören, som tabellen i lösningen); ett inskrivet tal som det skrevs
                var formel = typeof cell.raw === 'string' && cell.raw.charAt(0) === '=';
                if (formel && !Number.isInteger(v)) v = Math.round(v * 100) / 100;
                return { t: cell.fmt === 'kr' ? krFmt(v) : autoFmt(v), num: true };
            }
            return { t: String(v), num: false };
        }
        function rawText(ref) {
            var cell = S.cells[ref];
            if (!cell) return '';
            if (typeof cell.raw === 'number') return autoFmt(cell.raw);
            return cell.raw;
        }

        // som farga(), men med textmarkören på plats pos (null = sist)
        function fargaMedMarkor(text, pos, markor) {
            if (pos === null || pos === undefined || pos >= text.length) return farga(text) + markor;
            var spann = [], n = 0, m, re = new RegExp(REF_RE.source, 'g');
            if (text.charAt(0) === '=') {
                while ((m = re.exec(text))) spann.push({ a: m.index, b: m.index + m[0].length, f: REFF[n++ % REFF.length] });
            }
            var html = '';
            for (var i = 0; i <= text.length; i++) {
                if (i === pos) html += markor;
                if (i === text.length) break;
                var sp = null;
                for (var k = 0; k < spann.length; k++) if (i >= spann[k].a && i < spann[k].b) sp = spann[k];
                var t = esc(text.charAt(i));
                html += sp ? '<span style="color:' + sp.f + '">' + t + '</span>' : t;
            }
            return html;
        }
        function farga(text) {
            // färgar cellreferenserna i en formel som Kalkylark gör
            if (text.charAt(0) !== '=') return esc(text);
            var n = 0;
            return esc(text).replace(REF_RE, function (m) {
                return '<span style="color:' + REFF[n++ % REFF.length] + '">' + m + '</span>';
            });
        }
        function esc(s) {
            return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
        }
        function hideOv(e) { e.style.display = 'none'; }
        function showOv(e, rr) { e.style.display = 'block'; place(e, rr); }

        function render() {
            // rullning: bladet flyttas uppåt, kolumnrubrikerna står kvar
            var dy = (S.top - 1) * RH;
            grid.style.top = -dy + 'px';
            for (var hc = 0; hc < hdrC.length; hc++) hdrC[hc].style.top = dy + 'px';
            memo = {};
            for (var ref in cellEl) {
                var d = visas(ref), ce = cellEl[ref];
                ce.textContent = d.t;
                ce.classList.toggle('num', d.num);
                // text får flöda ut i en tom grannecell, som i Kalkylark
                var p = parseRef(ref), nb = refOf(p.c + 1, p.r);
                ce.classList.toggle('over', !d.num && !!d.t && p.c + 1 < COLS.length && !S.cells[nb]);
            }
            memo = null;
            // rubrikmarkering
            var ap = parseRef(S.act);
            var rc = S.range ? [parseRef(S.range[0]), parseRef(S.range[1])] : [ap, ap];
            for (var c = 1; c < COLS.length; c++) {
                var inC = c >= Math.min(rc[0].c, rc[1].c) && c <= Math.max(rc[0].c, rc[1].c);
                hdrC[c].className = 'kb-c kb-h' + (c === ap.c ? ' on' : inC ? ' in' : '');
            }
            for (var r = 1; r <= ROWS; r++) {
                var inR = r >= Math.min(rc[0].r, rc[1].r) && r <= Math.max(rc[0].r, rc[1].r);
                hdrR[r].className = 'kb-c kb-h' + (r === ap.r ? ' on' : inR ? ' in' : '');
            }
            nameBox.textContent = S.range ? S.range[0] + ':' + S.range[1] : S.act;
            if (S.range) showOv(ovRange, rangeRect(S.range[0], S.range[1])); else hideOv(ovRange);
            showOv(ovAct, cellRect(S.act));
            var hRect = S.range ? rangeRect(S.range[0], S.range[1]) : cellRect(S.act);
            if (S.edit === null && !S.fbarEdit) {
                showOv(ovHandle, { x: hRect.x + hRect.w - 5, y: hRect.y + hRect.h - 5, w: 9, h: 9 });
            } else hideOv(ovHandle);
            if (S.fill) showOv(ovFill, rangeRect(S.fill[0], S.fill[1])); else hideOv(ovFill);

            // redigering: rutan över cellen + formelfältet
            var text = S.edit !== null ? S.edit : rawText(S.act);
            var caret = '<span class="kb-caret"></span>';
            if (S.edit !== null) {
                var er = cellRect(S.act);
                showOv(ovEdit, er);
                ovEdit.style.width = 'auto';
                ovEdit.style.minWidth = er.w + 'px';
                ovEdit.innerHTML = S.fbarEdit ? farga(S.edit) : fargaMedMarkor(S.edit, S.caret, caret);
                ftext.innerHTML = S.fbarEdit ? fargaMedMarkor(S.edit, S.caret, caret) : farga(S.edit);
            } else {
                hideOv(ovEdit);
                ftext.innerHTML = farga(text);
            }
            for (var i = 0; i < refBoxes.length; i++) {
                var rf = S.refs[i];
                if (rf) {
                    showOv(refBoxes[i], refRect(rf));
                    refBoxes[i].style.borderColor = REFF[i % REFF.length];
                    refBoxes[i].style.background = REFF[i % REFF.length] + '14';
                } else hideOv(refBoxes[i]);
            }
            tool.querySelector('[data-tb="kr"]').classList.toggle('on', S.krOn);
        }

        /* ---------- uppspelning: väntan, paus, avbrott ---------- */
        var run = null;          // { dead, instant }
        var paused = false;
        function AVBRUTEN() {}
        function sleep(ms) {
            var R = run;
            if (R.instant) return Promise.resolve();
            return new Promise(function (res, rej) {
                // timer i stället för requestAnimationFrame: i en strypt
                // bakgrundsflik skulle varje kort väntan annars bli en hel bildruta
                var kvar = ms, last = performance.now();
                function tick() {
                    var now = performance.now();
                    if (R.dead) return rej(new AVBRUTEN());
                    if (!paused) kvar -= now - last;
                    last = now;
                    if (kvar <= 0) res(); else setTimeout(tick, Math.min(kvar, 60));
                }
                setTimeout(tick, Math.min(kvar, 60));
            });
        }
        function alive() { if (run.dead) throw new AVBRUTEN(); }

        /* pekaren, i koordinater relativt programfönstret */
        var pek = { x: 0, y: 0 };
        // bladets (0,0) i fönstrets koordinater; följer med när bladet rullar
        function sheetOrigin() {
            return { x: sheet.offsetLeft, y: sheet.offsetTop - (S.top - 1) * RH };
        }
        function setPek(x, y, kors) {
            pek.x = x; pek.y = y;
            if (run && run.instant) return;
            cursor.style.display = 'block';
            cursor.innerHTML = kors ? KORS : PEKARE;
            var ox = kors ? -10 : -1.5, oy = kors ? -10 : -1.5;
            cursor.style.transform = 'translate(' + (x + ox) + 'px,' + (y + oy) + 'px)';
        }
        function flytta(x, y, ms, kors) {
            if (run.instant) { pek.x = x; pek.y = y; return Promise.resolve(); }
            var x0 = pek.x, y0 = pek.y, tid = ms || 520;
            var R = run;
            return new Promise(function (res, rej) {
                var gjort = 0, last = performance.now();
                function tick(now) {
                    if (R.dead) return rej(new AVBRUTEN());
                    if (!paused) gjort += now - last;
                    last = now;
                    var t = Math.min(1, gjort / tid);
                    var e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                    setPek(x0 + (x - x0) * e, y0 + (y - y0) * e, kors);
                    if (t < 1) requestAnimationFrame(tick); else res();
                }
                requestAnimationFrame(tick);
            });
        }
        function cellPunkt(ref, var_) {
            var o = sheetOrigin(), r = cellRect(ref);
            if (var_ === 'handtag') return { x: o.x + r.x + r.w, y: o.y + r.y + r.h };
            return { x: o.x + r.x + Math.min(r.w * 0.45, 52), y: o.y + r.y + r.h * 0.55 };
        }
        function krPunkt() {
            var b = tool.querySelector('[data-tb="kr"]');
            var a = app.getBoundingClientRect(), r = b.getBoundingClientRect();
            return { x: r.left - a.left + r.width / 2, y: r.top - a.top + r.height / 2 };
        }
        function fbarSlut() {
            var a = app.getBoundingClientRect(), r = ftext.getBoundingClientRect();
            return { x: r.right - a.left + 2, y: r.top - a.top + r.height / 2 };
        }
        function ripple() {
            if (run.instant) return;
            var rp = el('div', 'kb-ripple', app);
            rp.style.left = pek.x + 'px'; rp.style.top = pek.y + 'px';
            setTimeout(function () { rp.remove(); }, 500);
        }
        function tangent(namn) {
            if (run.instant) return Promise.resolve();
            key.textContent = namn;
            key.classList.add('on');
            return sleep(650).then(function () { key.classList.remove('on'); });
        }

        /* ---------- primitiver ---------- */
        async function klickaCell(ref) {
            var p = cellPunkt(ref);
            await flytta(p.x, p.y, 560);
            ripple();
            S.act = ref; S.range = null; S.refs = [];
            render();
            await sleep(260);
        }
        function tolka(text) {
            if (text.charAt(0) === '=') return text;
            var t = text.replace(/\s/g, '').replace(',', '.');
            if (/^-?\d+(\.\d+)?$/.test(t)) return parseFloat(t);
            return text;
        }
        function refsI(text) {
            if (text.charAt(0) !== '=') return [];
            return (text.match(REF_RE) || []).map(function (m) { return m.replace(/\$/g, ''); });
        }
        async function skriv(text, iFbar, tempo) {
            if (S.edit === null) S.edit = '';
            S.fbarEdit = !!iFbar;
            render();
            for (var i = 0; i < text.length; i++) {
                alive();
                if (S.caret === null || S.caret === undefined) S.edit += text.charAt(i);
                else {
                    S.edit = S.edit.slice(0, S.caret) + text.charAt(i) + S.edit.slice(S.caret);
                    S.caret++;
                }
                S.refs = refsI(S.edit);
                if (!run.instant) render();
                await sleep(text.charAt(i) === ' ' ? 60 : (tempo || 105));
            }
            render();
        }
        /* Piltangenterna flyttar textmarkören ett tecken i taget, så att
         * eleven ser exakt var dollartecknet hamnar. */
        async function pil(steg) {
            if (S.caret === null || S.caret === undefined) S.caret = S.edit.length;
            var n = Math.abs(steg), dir = steg < 0 ? -1 : 1;
            for (var i = 0; i < n; i++) {
                alive();
                S.caret = Math.max(0, Math.min(S.edit.length, S.caret + dir));
                render();
                await tangent(dir < 0 ? '←' : '→');
                await sleep(250);
            }
        }
        async function radera(n) {
            for (var i = 0; i < n; i++) {
                alive();
                S.edit = S.edit.slice(0, -1);
                S.refs = refsI(S.edit);
                render();
                await sleep(170);
            }
        }
        async function bekrafta(tangentNamn, dc, dr) {
            await tangent(tangentNamn);
            var fmt = S.cells[S.act] && S.cells[S.act].fmt;
            var fore = {};
            memo = {};
            if (!run.instant) for (var ref in cellEl) fore[ref] = visas(ref).t;
            var redigerad = S.act;
            S.cells[S.act] = { raw: tolka(S.edit), fmt: fmt };
            memo = {};
            // celler vars värde ändrades av sig självt lyser upp en stund
            if (!run.instant) {
                for (ref in cellEl) {
                    if (ref !== redigerad && fore[ref] && visas(ref).t !== fore[ref]) {
                        var ce = cellEl[ref];
                        ce.classList.remove('kb-blink'); void ce.offsetWidth; ce.classList.add('kb-blink');
                    }
                }
            }
            S.edit = null; S.fbarEdit = false; S.refs = []; S.caret = null;
            var p = parseRef(S.act);
            S.act = refOf(p.c + dc, p.r + dr);
            render();
            await sleep(300);
        }
        function enter() { return bekrafta('Enter ↵', 0, 1); }
        function tab() { return bekrafta('Tab ⇥', 1, 0); }

        async function draMarkera(fran, till) {
            var p = cellPunkt(fran);
            await flytta(p.x, p.y, 520);
            ripple();
            S.act = fran; S.range = null; render();
            await sleep(200);
            var a = parseRef(fran), b = parseRef(till);
            var steg = Math.max(1, Math.abs(b.r - a.r));
            for (var k = 1; k <= steg; k++) {
                var ref = refOf(b.c, a.r + Math.round((b.r - a.r) * k / steg));
                var q = cellPunkt(ref);
                await flytta(q.x, q.y, 150);
                S.range = [fran, ref]; render();
            }
            await sleep(250);
        }

        async function draHandtag(till) {
            var slut = S.range ? S.range[1] : S.act, borjan = S.range ? S.range[0] : S.act;
            var p = cellPunkt(slut, 'handtag');
            await flytta(p.x, p.y, 600);
            setPek(pek.x, pek.y, true);           // pekaren blir ett kors
            await sleep(450);
            ripple();
            var a = parseRef(slut), b = parseRef(till);
            // ett långt drag går fortare per rad, och bladet rullar med när
            // pekaren når den nedersta synliga raden
            var radTid = Math.max(45, Math.min(210, 2600 / Math.max(1, b.r - a.r)));
            for (var r = a.r + 1; r <= b.r; r++) {
                if (r > S.top + VIS - 2 && S.top + VIS - 1 < ROWS) { S.top++; if (!run.instant) render(); }
                var q = cellPunkt(refOf(b.c, r), 'handtag');
                await flytta(q.x, q.y - 4, radTid, true);
                S.fill = [borjan, refOf(b.c, r)]; if (!run.instant) render();
            }
            await sleep(300);
            fyll(borjan, slut, till);
            S.fill = null;
            S.act = borjan; S.range = [borjan, till];
            render();
            setPek(pek.x, pek.y, false);
            await sleep(400);
        }
        function fyll(borjan, slut, till) {
            var a = parseRef(borjan), s = parseRef(slut), t = parseRef(till), c = a.c;
            var start = S.cells[borjan], sist = S.cells[slut];
            if (typeof start.raw === 'number' && s.r > a.r && typeof sist.raw === 'number') {
                // talföljd ur två startvärden (0, 1 → 2, 3, …)
                var d = (sist.raw - start.raw) / (s.r - a.r);
                for (var r = s.r + 1; r <= t.r; r++) S.cells[refOf(c, r)] = { raw: start.raw + d * (r - a.r) };
                return;
            }
            // formel: relativa radreferenser flyttas med, $-låsta står still
            var f = sist.raw;
            for (r = s.r + 1; r <= t.r; r++) {
                var dr = r - s.r;
                S.cells[refOf(c, r)] = { raw: f.replace(/(\$?)([A-Z])(\$?)(\d+)/g, function (m, d1, L, d2, n) {
                    return d1 + L + d2 + (d2 ? n : (+n + dr));
                }), fmt: sist.fmt };
            }
        }
        async function klickaKr() {
            var p = krPunkt();
            await flytta(p.x, p.y, 700);
            ripple();
            S.krOn = true;
            var a = parseRef(S.range[0]), b = parseRef(S.range[1]);
            for (var r = a.r; r <= b.r; r++) {
                var ref = refOf(a.c, r);
                if (S.cells[ref]) S.cells[ref].fmt = 'kr';
            }
            render();
            await sleep(700);
        }
        /* Pekaren ringar in en cell och lämnar en ring efter sig, i samma
         * färg som cellens referens får i formeln som skrivs efteråt. Det
         * är lärarens "titta här" innan formeln byggs av de två värdena. */
        async function ringaIn(ref, farg, varv) {
            if (run.instant) return;
            var r = cellRect(ref), o = sheetOrigin();
            var cx = r.x + r.w / 2, cy = r.y + r.h / 2;
            var rx = r.w / 2 + 2, ry = r.h / 2 + 6;   // tätt, så att ringen inte går in i grannens text
            var el_ = document.createElementNS(SVGNS, 'ellipse');
            el_.setAttribute('cx', cx); el_.setAttribute('cy', cy);
            el_.setAttribute('rx', rx); el_.setAttribute('ry', ry);
            el_.setAttribute('fill', 'none');
            el_.setAttribute('stroke', farg);
            el_.setAttribute('stroke-width', '2.5');
            el_.setAttribute('pathLength', '1');
            el_.setAttribute('stroke-dasharray', '1');
            el_.setAttribute('stroke-dashoffset', '1');
            el_.style.transform = 'rotate(180deg)';      // ringen börjar i vänsterkanten
            el_.style.transformOrigin = cx + 'px ' + cy + 'px';
            el_.style.transition = 'opacity .5s';
            markLager.appendChild(el_);
            var punkt = function (v) {
                return { x: o.x + cx - rx * Math.cos(v), y: o.y + cy - ry * Math.sin(v) };
            };
            var p0 = punkt(0);
            await flytta(p0.x, p0.y, 650);
            await sleep(200);
            var tid = 1500 * varv, R = run;
            await new Promise(function (res, rej) {
                var gjort = 0, last = performance.now();
                function tick(now) {
                    if (R.dead) return rej(new AVBRUTEN());
                    if (!paused) gjort += now - last;
                    last = now;
                    var t = Math.min(1, gjort / tid);
                    var e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                    var v = e * varv * 2 * Math.PI;
                    var q = punkt(v);
                    setPek(q.x, q.y);
                    el_.setAttribute('stroke-dashoffset', String(Math.max(0, 1 - v / (2 * Math.PI))));
                    if (t < 1) requestAnimationFrame(tick); else res();
                }
                requestAnimationFrame(tick);
            });
        }
        function tonaUtMarkeringar() {
            var e = markLager.querySelectorAll('ellipse');
            for (var i = 0; i < e.length; i++) e[i].style.opacity = '0';
            setTimeout(rensaMarkeringar, 600);
        }

        async function klickaFbar() {
            var p = fbarSlut();
            await flytta(p.x, p.y, 600);
            ripple();
            S.edit = rawText(S.act); S.fbarEdit = true; S.refs = refsI(S.edit);
            render();
            await sleep(400);
        }

        /* ---------- stegen i Exempel 1 a) ---------- */
        var SPARKONTO = [
            { namn: 'Rubriker, år och startvärden',
              text: 'Vi gör en kolumn för ”År” och en kolumn för ”Behållning (kr)”. Vi skriver 0 i A2 och 1 i A3, markerar de två cellerna och drar i <em>fyllnadshandtaget</em> (det runda hörnet i högra nederkanten) ner till och med A10. Då fylls åren i från år 0 till och med år 8. Vi fyller också i insättningen 30 000 kr i B2 och förändringsfaktorn för en ökning med 3,5 %, det vill säga 1 + 0,035 = 1,035, i B12 (med rubriken ”Förändringsfaktor” i A12).',
              kor: async function () {
                  await klickaCell('A1'); await skriv('År'); await enter();
                  await klickaCell('B1'); await skriv('Behållning (kr)'); await enter();
                  await skriv('30000'); await enter();
                  await klickaCell('A2'); await skriv('0'); await enter();
                  await skriv('1'); await enter();
                  await draMarkera('A2', 'A3');
                  await draHandtag('A10');
                  await sleep(400);
                  await klickaCell('A12'); await skriv('Förändringsfaktor'); await tab();
                  await skriv('1,035'); await enter();
              } },
            { namn: 'Formeln för behållningen efter 1 år',
              text: 'För att få behållningen efter ett år multiplicerar vi 30 000 (värdet i B2) med förändringsfaktorn (värdet i B12). Vi ställer oss i cell B3 och skriver <code>=B2*B12</code> och får värdet efter 1 år, 31 050 kr.',
              kor: async function () {
                  // först de två värdena som ska multipliceras ...
                  await ringaIn('B2', REFF[0], 1.15);
                  await sleep(900);
                  await ringaIn('B12', REFF[1], 1.15);
                  await sleep(1100);
                  // ... sedan formeln, lugnt, och den får stå kvar en stund
                  await klickaCell('B3');
                  await skriv('=B2*B12', false, 230);
                  // pekaren flyttas undan så att formeln syns helt
                  var vila = cellPunkt('C6');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(3000);
                  await enter();
                  tonaUtMarkeringar();
                  await sleep(1400);
                  await klickaCell('B3');
                  await sleep(1500);
              } },
            { namn: 'Lås B12 med dollartecken och dra i fyllnadshandtaget',
              text: 'Samma beräkning ska upprepas för åren 2 till 8, och varje värde ska multipliceras med förändringsfaktorn i B12. Den cellen ”låses” därför med dollartecken innan formeln kopieras: formeln i B3 blir <code>=B2*$B$12</code>. Utan dollartecknen skulle B12 också flytta ner en rad för varje år, till tomma celler. Sedan drar vi i fyllnadshandtaget ner till och med B10. I B6 står nu till exempel <code>=B5*$B$12</code>: B5 har flyttat med, men <code>$B$12</code> står kvar.',
              kor: async function () {
                  await klickaFbar();
                  // pekaren flyttas undan så att formelfältet syns
                  var undan = cellPunkt('D2');
                  await flytta(undan.x, undan.y, 600);
                  // markören stegar till före B och sedan efter B
                  await pil(-3);
                  await sleep(500);
                  await skriv('$', true, 300);
                  await sleep(700);
                  await pil(1);
                  await sleep(500);
                  await skriv('$', true, 300);
                  await sleep(600);
                  await sleep(800);
                  await enter();
                  await klickaCell('B3');
                  await sleep(500);
                  await draHandtag('B10');
                  await sleep(600);
                  await klickaCell('B6');      // visa att formeln flyttats med
                  await sleep(1800);
              } }
        ];

        /* ---------- stegen i Exempel 2 (årligt sparande) ---------- */
        var ARLIGT = [
            { namn: 'Rubriker, insättningarnas nummer och den första insättningen',
              text: 'Vi gör en kolumn för ”Insättning” och en kolumn för ”Behållning (kr)”. Vi skriver 1 i A2 och 2 i A3, markerar de två cellerna och drar i fyllnadshandtaget ner till och med A11. Då fylls insättningarna i från 1 till och med 10. Vi fyller också i 5 000 kr i B2, som är behållningen direkt efter den första insättningen.',
              kor: async function () {
                  await klickaCell('A1'); await skriv('Insättning'); await enter();
                  await klickaCell('B1'); await skriv('Behållning (kr)'); await enter();
                  await skriv('5000'); await enter();
                  await klickaCell('A2'); await skriv('1'); await enter();
                  await skriv('2'); await enter();
                  await draMarkera('A2', 'A3');
                  await draHandtag('A11');
                  await sleep(400);
              } },
            { namn: 'Formeln för behållningen efter den andra insättningen',
              text: 'Efter den andra insättningen har det föregående beloppet (5 000 kr i B2) vuxit med 2,8 % <em>samtidigt</em> som ytterligare 5 000 kr läggs till. Att beloppet växer med 2,8 % betyder att det multipliceras med förändringsfaktorn 1,028. Vi ställer oss i B3 och skriver <code>=B2*1,028+5000</code> och får värdet efter den andra insättningen, 10 140 kr.',
              kor: async function () {
                  // det föregående beloppet, som ska växa med 2,8 % ...
                  await ringaIn('B2', REFF[0], 1.15);
                  await sleep(1100);
                  // ... och den nya insättningen läggs till
                  await klickaCell('B3');
                  await skriv('=B2*1,028+5000', false, 230);
                  var vila = cellPunkt('C7');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(3200);
                  await enter();
                  tonaUtMarkeringar();
                  await sleep(1400);
                  await klickaCell('B3');
                  await sleep(1500);
              } },
            { namn: 'Dra formeln nedåt till den tionde insättningen',
              text: 'Samma sak händer vid varje ny insättning: det föregående beloppet växer med 2,8 % och 5 000 kr läggs till. Vi drar i fyllnadshandtaget ner till och med B11, som är insättning 10. I B6 står nu till exempel <code>=B5*1,028+5000</code>. Här behövs inga dollartecken, eftersom formeln inte hämtar något från en fast cell.',
              kor: async function () {
                  await draHandtag('B11');
                  await sleep(600);
                  await klickaCell('B6');      // samma formel, ett radsteg längre ned
                  await sleep(2200);
                  await ringaIn('B11', REFF[2], 1.15);   // svaret
                  var undan = cellPunkt('D8');
                  await flytta(undan.x, undan.y, 600);
                  await sleep(800);
              } }
        ];

        /* Rullar bladet (mushjulet) tills rad `top` står överst. */
        async function rulla(top) {
            top = Math.max(1, Math.min(ROWS - VIS + 1, top));
            if (run.instant) { S.top = top; return; }
            var steg = top > S.top ? 1 : -1, n = Math.abs(top - S.top);
            var tid = Math.max(14, Math.min(60, 1400 / Math.max(1, n)));
            while (S.top !== top) {
                alive();
                S.top += steg; render();
                await sleep(tid);
            }
            await sleep(300);
        }

        /* ---------- stegen i Exempel 1 c) i ma1c-3.5 (billånet) ---------- */
        var BILAN = [
            { namn: 'Rubriker, månaderna och lånet',
              text: 'Vi gör fyra kolumner: ”Månad”, ”Skuld” (skulden just före inbetalningen), ”Ränta” (räntan för månaden) och ”Inbetalning”. Vi skriver 1 i A2 och 2 i A3, markerar de två cellerna och drar i <em>fyllnadshandtaget</em> (det runda hörnet i högra nederkanten) ner till och med A61. Då fylls alla 60 månaderna i. I B2 skriver vi lånet 150 000 kr, som är skulden vid den första inbetalningen.',
              kor: async function () {
                  await klickaCell('A1'); await skriv('Månad'); await tab();
                  await skriv('Skuld'); await tab();
                  await skriv('Ränta'); await tab();
                  await skriv('Inbetalning'); await enter();
                  await klickaCell('A2'); await skriv('1'); await enter();
                  await skriv('2'); await enter();
                  await draMarkera('A2', 'A3');
                  await draHandtag('A61');
                  await sleep(600);
                  await rulla(1);
                  await klickaCell('B2'); await skriv('150000'); await enter();
              } },
            { namn: 'Skulden minskar med amorteringen varje månad',
              text: 'Ellen amorterar 2 500 kr varje månad (se a), så till nästa månad har skulden minskat med 2 500 kr. Vi ställer oss i B3 och skriver <code>=B2-2500</code>, som ger 147 500 kr. Sedan drar vi i fyllnadshandtaget ner till och med B61. Vid den sista inbetalningen är skulden 2 500 kr, alltså precis det sista amorteringsbeloppet.',
              kor: async function () {
                  await ringaIn('B2', REFF[0], 1.15);
                  await sleep(900);
                  await klickaCell('B3');
                  await skriv('=B2-2500', false, 230);
                  var vila = cellPunkt('D7');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(2400);
                  await enter();
                  tonaUtMarkeringar();
                  await sleep(1000);
                  await klickaCell('B3');
                  await draHandtag('B61');
                  await sleep(500);
                  await ringaIn('B61', REFF[2], 1.15);
                  await sleep(1200);
                  tonaUtMarkeringar();
              } },
            { namn: 'Räntan för varje månad',
              text: 'Räntan räknas alltid på skulden. Årsräntan är 4,8 % av skulden, och för en månad betalar Ellen en tolftedel av årsräntan. Vi ställer oss i C2 och skriver <code>=B2*0,048/12</code>, som ger 600 kr (samma som i b). Sedan drar vi i fyllnadshandtaget ner till och med C61. Räntan blir 10 kr mindre för varje månad, eftersom skulden minskar.',
              kor: async function () {
                  await rulla(1);
                  await ringaIn('B2', REFF[0], 1.15);
                  await sleep(900);
                  await klickaCell('C2');
                  await skriv('=B2*0,048/12', false, 230);
                  var vila = cellPunkt('D7');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(2600);
                  await enter();
                  tonaUtMarkeringar();
                  await sleep(1000);
                  await klickaCell('C2');
                  await draHandtag('C61');
                  await sleep(900);
              } },
            { namn: 'Inbetalningen varje månad',
              text: 'Varje inbetalning består av räntan plus amorteringen 2 500 kr. Vi ställer oss i D2 och skriver <code>=C2+2500</code>, som ger 3 100 kr (samma som i b). Sedan drar vi i fyllnadshandtaget ner till och med D61. Den sista inbetalningen blir 2 510 kr.',
              kor: async function () {
                  await rulla(1);
                  await ringaIn('C2', REFF[0], 1.15);
                  await sleep(900);
                  await klickaCell('D2');
                  await skriv('=C2+2500', false, 230);
                  var vila = cellPunkt('B8');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(2400);
                  await enter();
                  tonaUtMarkeringar();
                  await sleep(1000);
                  await klickaCell('D2');
                  await draHandtag('D61');
                  await sleep(900);
              } },
            { namn: 'Summera alla inbetalningar',
              text: 'Det Ellen betalar totalt är summan av alla 60 inbetalningar i kolumn D. Vi ställer oss i D62, under den sista inbetalningen, och skriver <code>=SUM(D2:D61)</code> (eller klickar på summasymbolen ∑ och markerar D2 till D61). Summan blir 168 300 kr.',
              kor: async function () {
                  await rulla(ROWS - VIS + 1);
                  await klickaCell('C62'); await skriv('Totalt'); await tab();
                  await skriv('=SUM(D2:D61)', false, 200);
                  var vila = cellPunkt('B56');
                  await flytta(vila.x, vila.y, 700);
                  await sleep(2600);
                  await enter();
                  await sleep(600);
                  await ringaIn('D62', REFF[2], 1.15);
                  var undan = cellPunkt('B57');
                  await flytta(undan.x, undan.y, 600);
                  await sleep(800);
              } }
        ];

        /* ---------- b) och c) i Exempel 1: börjar i det färdiga bladet ---------- */
        async function andra(ref, text) {
            await ringaIn(ref, REFF[0], 1.15);
            await sleep(700);
            await klickaCell(ref);
            await skriv(text, false, 260);
            var undan = cellPunkt('D6');
            await flytta(undan.x, undan.y, 700);
            await sleep(600);
        }
        async function enterOchSvar() {
            await enter();
            tonaUtMarkeringar();
            await sleep(2600);
            await ringaIn('B10', REFF[2], 1.15);   // behållningen efter 8 år
            var undan = cellPunkt('D6');
            await flytta(undan.x, undan.y, 600);
            await sleep(600);
        }
        var SPARKONTO_B = [
            { namn: 'Skriv den nya insättningen 40000 i B2',
              text: 'Insättningen är nu 40 000 kr i stället för 30 000 kr. Vi behöver inte göra om bladet, utan går bara till cell B2 och ändrar beloppet där till 40 000.',
              kor: function () { return andra('B2', '40000'); } },
            { namn: 'Tryck Enter: alla värden räknas om',
              text: 'Vi trycker Enter. De resterande värdena ändras automatiskt (automagiskt!), eftersom alla formler i kolumn B bygger på den ändrade cellen. Behållningen efter 8 år står i B10.',
              kor: enterOchSvar }
        ];
        var SPARKONTO_C = [
            { namn: 'Skriv den nya förändringsfaktorn 1,045 i B12',
              text: 'Räntan är nu 4,5 % i stället för 3,5 %. Vi går bara till cell B12 och ändrar förändringsfaktorn till 1 + 0,045 = 1,045.',
              kor: function () { return andra('B12', '1,045'); } },
            { namn: 'Tryck Enter: alla värden räknas om',
              text: 'Vi trycker Enter. De resterande värdena ändras automatiskt (automagiskt!), eftersom alla formler i kolumn B bygger på den ändrade cellen. Behållningen efter 8 år står i B10.',
              kor: enterOchSvar }
        ];
        // bladet som b) och c) börjar i: a) färdigt, och för c) även b)
        async function fore(scener) {
            for (var i = 0; i < scener.length; i++)
                for (var k = 0; k < scener[i].length; k++) await scener[i][k].kor();
            S.act = 'B6'; S.range = null;
        }
        var SCENER = {
            sparkonto: { steg: SPARKONTO },
            'sparkonto-b': { steg: SPARKONTO_B, fore: function () { return fore([SPARKONTO]); } },
            'sparkonto-c': { steg: SPARKONTO_C, fore: function () { return fore([SPARKONTO, SPARKONTO_B]); } },
            arligt: { steg: ARLIGT },
            billan: { steg: BILAN }
        };
        var SCEN = SCENER[scen];
        var STEG = SCEN.steg;

        /* ---------- kontroller under bladet ---------- */
        var ctrl = el('div', 'kb-ctrl', wrap);
        // Föregående/Nästa i stället för numrerade stegknappar: siffrorna i
        // de små cirklarna hamnade snett i fullskärm, och två pilknappar
        // säger dessutom direkt hur man går vidare.
        var bPrev = el('button', 'kb-btn', ctrl); bPrev.type = 'button';
        bPrev.innerHTML = IKON_BAK + 'Föregående';
        var bPlay = el('button', 'kb-btn prim', ctrl); bPlay.type = 'button';
        var bNext = el('button', 'kb-btn', ctrl); bNext.type = 'button';
        bNext.innerHTML = 'Nästa' + IKON_FRAM;
        var bSkip = el('button', 'kb-btn', ctrl); bSkip.type = 'button';
        var bOm = el('button', 'kb-btn', ctrl); bOm.type = 'button';
        var cap = el('div', 'kb-cap', ctrl);
        cap.setAttribute('aria-live', 'polite');

        var aktuellt = 0, lage = 'redo';   // redo | spelar | klar

        function uppdateraKontroller() {
            var sista = aktuellt === STEG.length - 1;
            bPrev.disabled = aktuellt === 0;
            bNext.hidden = sista && lage === 'klar';
            bNext.disabled = sista;
            // byts texten (nytt steg) tonar den nya in; samma steg står still
            if (cap.dataset.steg !== String(aktuellt)) {
                cap.dataset.steg = String(aktuellt);
                cap.innerHTML = '<span class="kb-cap-rub">Steg ' + (aktuellt + 1) + ' av ' + STEG.length + '</span>' +
                    (STEG[aktuellt].text || STEG[aktuellt].namn);
                cap.classList.remove('in'); void cap.offsetWidth; cap.classList.add('in');
            }
            bOm.hidden = true; bSkip.hidden = true;
            if (lage === 'redo') {
                bPlay.innerHTML = IKON_PLAY + 'Spela steg ' + (aktuellt + 1);
            } else if (lage === 'spelar') {
                bPlay.innerHTML = paused ? IKON_PLAY + 'Fortsätt' : IKON_PAUS + 'Paus';
                bSkip.hidden = false; bSkip.innerHTML = 'Hoppa till slutet' + IKON_FRAM;
            } else {
                bPlay.innerHTML = IKON_OM + 'Spela igen';
                if (sista) { bOm.hidden = false; bOm.innerHTML = IKON_OM + 'Börja om från början'; }
            }
        }

        function dodaKorning() { if (run) run.dead = true; run = null; paused = false; }

        // ställer bladet i läget före steg k (slutläget efter steg k−1)
        async function laget(k) {
            dodaKorning();
            S = nyttBlad();
            rensaMarkeringar();
            var R = run = { dead: false, instant: true };
            try {
                if (SCEN.fore) await SCEN.fore();
                for (var i = 0; i < k; i++) await STEG[i].kor();
            } catch (e) {
                if (e instanceof AVBRUTEN) return false;
                throw e;
            }
            if (R.dead) return false;
            if (k === 0 && !SCEN.fore) S.act = 'A1';
            render();
            return true;
        }
        async function forbered(k) {
            aktuellt = k; lage = 'redo';
            cursor.style.display = 'none';
            uppdateraKontroller();
            await laget(k);
            run = null;
        }
        async function spela(k) {
            aktuellt = k;
            if (!(await laget(k))) return;
            var R = run = { dead: false, instant: false };
            lage = 'spelar'; uppdateraKontroller();
            if (cursor.style.display === 'none') setPek(sheet.offsetLeft + SHEET_W * 0.55, sheet.offsetTop + 60);
            try {
                await STEG[k].kor();
            } catch (e) {
                if (!(e instanceof AVBRUTEN)) throw e;
                return;
            }
            if (R !== run) return;
            run = null; lage = 'klar';
            uppdateraKontroller();
        }
        async function hoppa() {
            var k = aktuellt;
            if (!(await laget(k + 1))) return;
            run = null; lage = 'klar';
            cursor.style.display = 'none';
            uppdateraKontroller();
        }

        bPlay.addEventListener('click', function () {
            if (lage === 'redo') spela(aktuellt);
            else if (lage === 'spelar') { paused = !paused; uppdateraKontroller(); }
            else spela(aktuellt);
        });
        bPrev.addEventListener('click', function () { if (aktuellt > 0) spela(aktuellt - 1); });
        bNext.addEventListener('click', function () { if (aktuellt < STEG.length - 1) spela(aktuellt + 1); });
        bOm.addEventListener('click', function () { forbered(0); });
        bSkip.addEventListener('click', hoppa);

        forbered(0);
    }

    window.FYSIKKALKYLBLAD = { mount: mount };
})();
