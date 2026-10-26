/* i18n.js — språkval för Fysiklabbet (svenska som standard, engelska och
 * norska (bokmål) som tillval).
 *
 * NORSKA (?lang=nb, infört 2026-10-26) gäller bara fysiksimuleringarna
 * (fysik1-*.html, fysik2-*.html). Ordlistorna ligger i i18n/nb.js (gemensamt)
 * och i18n/nb/sidor/<sida>.js (en per simulering), och i18n/nb/manifest.js
 * (genererad av .claude/i18n/nb/bygg-manifest.js) räknar upp vilka som finns.
 * Decimalkomma behålls på norska. Se "Norska" i CLAUDE.md.
 *
 * Laddas SYNKRONT i <head> på varje sida, före allt annat innehåll:
 *     <script src="i18n.js"></script>
 *
 * Hur språket väljs (första träff vinner):
 *   1. ?lang=en / ?lang=sv i adressen (det sökmotorerna ser),
 *   2. det besökaren valt tidigare (localStorage 'fysiklabbetSprak'),
 *   3. svenska.
 * På engelska skrivs ?lang=en in i adressfältet, i alla interna länkar och i
 * varje pushState/replaceState, så att en kopierad adress alltid visar samma
 * språk som besökaren såg. På svenska rörs ingenting.
 *
 * Tre delar översätter sajten (se avsnittet "Engelska" i CLAUDE.md):
 *
 *   A. Gränssnittet — en ordlista svenska → engelska (i18n/en.js och
 *      i18n/sidor/<sida>.js). DOM-översättaren byter textnoder och attributen
 *      title/placeholder/aria-label/alt vars HELA (trimmade) text finns i
 *      ordlistan, och fortsätter med en MutationObserver när React ritar om.
 *      Text som byggs ihop av delar översätts i koden med I18N.t('…').
 *
 *   B. Innehållet — varje svensk datafil (data/katalog.js, teori-bundeln,
 *      övningar, exit tickets, nyheter …) slutar med
 *          if (window.I18N) window.I18N.overlay('<namn>');
 *      På engelska laddar det data/en/<namn>.js direkt efter, som skriver
 *      över de poster som är översatta. Det som saknas visas på svenska.
 *
 *   C. Kod med egen text (simuleringar, pennlösningar, canvas-etiketter)
 *      anropar I18N.t(sv) där strängen ritas.
 *
 * Elementet eller något av dess föräldrar med klassen .no-i18n (eller
 * attributet translate="no") lämnas orört av DOM-översättaren — sätt det på
 * innehåll som redan kommer på rätt språk ur datafilerna, på formler och på
 * användarens egen text (klasslistor, scheman).
 */
(function () {
    'use strict';

    var NYCKEL = 'fysiklabbetSprak';
    var SPRAK = ['sv', 'en', 'nb'];

    function lasParam() {
        try {
            var v = new URLSearchParams(window.location.search).get('lang');
            return v && SPRAK.indexOf(v) >= 0 ? v : null;
        } catch (e) { return null; }
    }
    function lasSparat() {
        try {
            var v = window.localStorage.getItem(NYCKEL);
            return v && SPRAK.indexOf(v) >= 0 ? v : null;
        } catch (e) { return null; }
    }
    function spara(v) {
        try { window.localStorage.setItem(NYCKEL, v); } catch (e) {}
    }

    // Sidor där den engelska versionen är PÅSLAGEN (2026-10-22: bara
    // teorigenomgångarna). På alla andra sidor gör i18n.js ingenting: ingen
    // språkknapp, ingen engelska även om besökaren valt det tidigare, och
    // länkar dit får inget ?lang=en. Lägg till en sida här först när hela
    // dess innehåll är översatt och verifierat.
    var AKTIVA_SIDOR = ['katalog', 'avsnitt'];
    function sidnamn(path) {
        return (String(path).split('?')[0].split('#')[0].split('/').pop() || 'index.html').replace(/\.html$/, '');
    }
    // Norska: alla fysiksimuleringar (fysik1-*, fysik2-*), men inte
    // översiktssidorna fysik1.html/fysik2.html.
    function norskSida(namn) { return /^fysik[12]-/.test(namn); }
    function harSprak(namn, l) {
        if (l === 'en') return AKTIVA_SIDOR.indexOf(namn) >= 0;
        if (l === 'nb') return norskSida(namn);
        return true;
    }
    var SIDA = sidnamn(window.location.pathname);
    var AKTIV = harSprak(SIDA, 'en') || harSprak(SIDA, 'nb');

    var param = lasParam();
    if (param) spara(param);
    var onskat = param || lasSparat() || 'sv';
    var lang = harSprak(SIDA, onskat) ? onskat : 'sv';
    var EN = lang === 'en';
    var NB = lang === 'nb';
    var OV = EN || NB;   // sidan visas översatt

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // ---- Ordlistan -------------------------------------------------------
    var DICT = Object.create(null);
    // HTML-ordlistan: hela stycken med inbäddad markup (<strong>, <a>, <em>),
    // som inte går att översätta fragment för fragment utan att ordföljden
    // blir fel. Nyckeln är elementets innerHTML, normaliserad. Används för
    // statiska sidor (om.html, kontakt.html …) — i React-ritade stycken
    // skrivs texten i stället om med I18N.t, eftersom React äger noderna.
    var HTML = Object.create(null), harHtml = false;
    function normal(s) { return String(s).replace(/\s+/g, ' ').trim(); }
    function normalHtml(s) {
        return normal(String(s).replace(/([?&])lang=(?:en|nb)(&amp;|&)?/g, function (m, a, b) { return b ? a : ''; })
            .replace(/>\s+</g, '> <'));
    }
    function add(obj) {
        if (!obj) return;
        for (var k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) DICT[normal(k)] = obj[k];
        }
        if (OV && klar) oversattAllt();
    }
    function addHtml(obj) {
        if (!obj) return;
        for (var k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) { HTML[normalHtml(k)] = obj[k]; harHtml = true; }
        }
        if (OV && klar) oversattAllt();
    }
    var BLOCK = { P: 1, LI: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, TD: 1, TH: 1, DT: 1, DD: 1,
                  FIGCAPTION: 1, LABEL: 1, SUMMARY: 1, BLOCKQUOTE: 1, SPAN: 1, DIV: 1, BUTTON: 1, A: 1 };
    function oversattBlock(el) {
        if (!harHtml || !BLOCK[el.nodeName] || !el.firstElementChild) return false;
        var inner = el.innerHTML;
        if (inner.length > 4000) return false;
        var hit = HTML[normalHtml(inner)];
        if (hit == null) return false;
        el.innerHTML = hit;
        return true;
    }
    // t('Visa {n} laddningar', {n: 3}) — platshållare i båda språken.
    function t(sv, vars) {
        var s = sv;
        if (OV) {
            var hit = DICT[normal(sv)];
            if (hit != null) s = hit;
        }
        if (vars) s = String(s).replace(/\{(\w+)\}/g, function (m, k) {
            return vars[k] != null ? vars[k] : m;
        });
        return s;
    }

    // ---- Skript och överlägg ----------------------------------------------
    var bas = (function () {
        // Sökvägen till sajtens rot, räknad ur var i18n.js själv ligger, så att
        // sidor i undermappar (ovningsblad/, utkast/) hittar data/en/.
        var s = document.currentScript && document.currentScript.getAttribute('src');
        if (!s) return '';
        return s.replace(/i18n\.js(\?.*)?$/, '');
    })();
    // Cachebrytare: sidans egen __CB om den finns, annars en tiominutershink
    // (GitHub Pages låter webbläsaren spara filer i tio minuter).
    function cbNu() { return window.__CB || String(Math.floor(Date.now() / 600000)); }
    function skript(src, onload) {
        var url = bas + src + (src.indexOf('?') >= 0 ? '&' : '?') + 'v=' + cbNu();
        if (document.readyState === 'loading' && !onload) {
            // Medan sidan tolkas: synkront, så att överlägget hinner köras
            // innan sidans egen kod (React/Babel) läser datan.
            document.write('<scr' + 'ipt src="' + url + '"></scr' + 'ipt>');
            return;
        }
        var el = document.createElement('script');
        el.src = url;
        if (onload) el.onload = onload;
        document.head.appendChild(el);
    }
    var laddade = Object.create(null);
    // overlay('ovningar') → data/en/ovningar.js (bara på engelska).
    function overlay(namn, onload) {
        if (!EN) { if (onload) onload(); return; }
        if (laddade[namn]) { if (onload) onload(); return; }
        // Manifestet (i18n/manifest.js) räknar upp de överlägg som finns, så
        // att en datafil utan översättning inte ger ett 404-anrop.
        // Ett överlägg kan vara en fil (data/en/<namn>.js) och/eller en mapp
        // med delfiler (data/en/<namn>/*.js), som när en stor datamängd
        // översätts i satser. Alla laddas, i manifestets ordning.
        var finns = window.I18N_OVERLAYS || [];
        var filer = finns.filter(function (f) { return f === namn || f.indexOf(namn + '/') === 0; });
        if (!filer.length) { if (onload) onload(); return; }
        laddade[namn] = true;
        var kvar = filer.length;
        filer.forEach(function (f) {
            skript('data/en/' + f + '.js', onload ? function () { if (--kvar === 0) onload(); } : null);
        });
    }

    // ---- Adresser ----------------------------------------------------------
    function medLang(url) {
        if (!OV || url == null) return url;
        var s = String(url);
        if (/^(mailto:|tel:|javascript:|data:|blob:|#)/i.test(s)) return s;
        var a;
        try { a = new URL(s, window.location.href); } catch (e) { return s; }
        if (a.origin !== window.location.origin) return s;
        if (!/(\.html|\/)$/.test(a.pathname)) return s;  // bara sidor, inte filer
        if (!harSprak(sidnamn(a.pathname), lang)) return s;  // sidan finns inte på språket
        if (a.searchParams.get('lang') === lang) return s;
        a.searchParams.set('lang', lang);
        // Behåll relativ form om originalet var relativt.
        if (/^[a-z]+:\/\//i.test(s) || s.charAt(0) === '/') return a.href;
        var rel = a.pathname.split('/').pop() + a.search + a.hash;
        var dir = s.replace(/[^\/]*$/, '');
        if (s.indexOf('?') >= 0 || s.indexOf('#') >= 0) {
            var forst = s.search(/[?#]/);
            dir = s.slice(0, forst).replace(/[^\/]*$/, '');
        }
        return dir + rel;
    }
    if (OV && window.history) {
        ['pushState', 'replaceState'].forEach(function (fn) {
            var orig = window.history[fn];
            if (!orig) return;
            window.history[fn] = function (state, title, url) {
                if (url != null) url = medLang(url);
                return orig.call(this, state, title, url);
            };
        });
        if (!param) {
            try { window.history.replaceState(window.history.state, '', medLang(window.location.href)); } catch (e) {}
        }
    }
    function bytTill(nytt) {
        spara(nytt);
        var a = new URL(window.location.href);
        if (nytt !== 'sv') a.searchParams.set('lang', nytt);
        else a.searchParams.delete('lang');
        window.location.href = a.href;
    }

    // ---- hreflang i <head> --------------------------------------------------
    function hreflang() {
        try {
            var sv = new URL(window.location.href);
            sv.searchParams.delete('lang');
            var par = [['sv', sv.href]];
            ['en', 'nb'].forEach(function (l) {
                if (!harSprak(SIDA, l)) return;
                var u = new URL(sv.href);
                u.searchParams.set('lang', l);
                par.push([l, u.href]);
            });
            par.push(['x-default', sv.href]);
            par.forEach(function (p) {
                var l = document.createElement('link');
                l.rel = 'alternate'; l.hreflang = p[0]; l.href = p[1];
                document.head.appendChild(l);
            });
            if (OV) {
                var c = document.querySelector('link[rel="canonical"]');
                if (c) c.href = medLang(c.href);
                var og = document.querySelector('meta[property="og:url"]');
                if (og) og.content = medLang(og.content);
                var loc = document.querySelector('meta[property="og:locale"]');
                if (loc) loc.content = EN ? 'en_GB' : 'nb_NO';
            }
        } catch (e) {}
    }

    // ---- DOM-översättaren -------------------------------------------------
    var ATTR = ['title', 'placeholder', 'aria-label', 'alt'];
    var klar = false;
    function skippa(el) {
        for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
            var tag = n.nodeName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'CODE' || tag === 'PRE') return true;
            var c = n.classList;
            // .i18n-ja: översätts även inuti .no-i18n (inbäddade widgetar —
            // pennlösningar, simuleringar, grafer — i redan översatt innehåll).
            if (c && c.contains('i18n-ja')) return false;
            if (n.getAttribute('translate') === 'no') return true;
            if (c && (c.contains('no-i18n') || c.contains('katex'))) return true;
        }
        return false;
    }
    function oversattText(node) {
        var v = node.nodeValue;
        if (!v || !/[A-Za-zÅÄÖåäöé]/.test(v)) return;
        var k = normal(v);
        var hit = DICT[k];
        // Sammanhang: "nav:<text>" gäller bara i huvudmenyn.
        var p = node.parentNode;
        if (p && p.closest && DICT['nav:' + k] != null && p.closest('.lab-nav, .lab-header')) hit = DICT['nav:' + k];
        if (hit == null || hit === k) return;
        if (p && skippa(p)) return;
        // Behåll omgivande blanktecken (JSX-mellanrum mellan ord och element).
        var m = /^(\s*)[\s\S]*?(\s*)$/.exec(v);
        node.nodeValue = m[1] + hit + m[2];
    }
    function oversattAttr(el) {
        for (var i = 0; i < ATTR.length; i++) {
            var v = el.getAttribute(ATTR[i]);
            if (!v) continue;
            var hit = DICT[normal(v)];
            if (hit != null && hit !== v) el.setAttribute(ATTR[i], hit);
        }
        if (el.nodeName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
            var hv = DICT[normal(el.value || '')];
            if (hv != null) el.value = hv;
        }
        if (el.nodeName === 'A') {
            var h = el.getAttribute('href');
            if (h && !el.hasAttribute('data-lang-fast')) {
                var ny = medLang(h);
                if (ny !== h) el.setAttribute('href', ny);
            }
        }
    }
    function oversattTrad(rot) {
        if (rot.nodeType === 3) { oversattText(rot); return; }
        if (rot.nodeType !== 1 || skippa(rot)) return;
        if (oversattBlock(rot)) { lankar(rot); return; }
        oversattAttr(rot);
        var w = document.createTreeWalker(rot, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                if (n.nodeType === 1) {
                    var tag = n.nodeName;
                    // Textrutans innehåll är användarens, men dess placeholder/title översätts.
                    if (tag === 'TEXTAREA') { oversattAttr(n); return NodeFilter.FILTER_REJECT; }
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') return NodeFilter.FILTER_REJECT;
                    var c = n.classList;
                    if ((c && c.contains('no-i18n')) || n.getAttribute('translate') === 'no') {
                        var ja = n.querySelectorAll('.i18n-ja');
                        for (var q = 0; q < ja.length; q++) undantag.push(ja[q]);
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (c && c.contains('katex')) return NodeFilter.FILTER_REJECT;
                    if (oversattBlock(n)) { lankar(n); return NodeFilter.FILTER_REJECT; }
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var n, undantag = [];
        while ((n = w.nextNode())) {
            if (n.nodeType === 3) oversattText(n); else oversattAttr(n);
        }
        for (var u = 0; u < undantag.length; u++) oversattTrad(undantag[u]);
    }
    function lankar(el) {
        var as = el.querySelectorAll('a[href]');
        for (var i = 0; i < as.length; i++) oversattAttr(as[i]);
    }
    function oversattAllt() {
        if (document.body) oversattTrad(document.body);
        var tt = DICT[normal(document.title)];
        if (tt) document.title = tt;
        ['description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'].forEach(function (n) {
            var m = document.querySelector('meta[name="' + n + '"], meta[property="' + n + '"]');
            if (m) { var h = DICT[normal(m.content)]; if (h) m.content = h; }
        });
    }
    var ko = [], schemalagd = false;
    function kor() {
        schemalagd = false;
        var lista = ko; ko = [];
        for (var i = 0; i < lista.length; i++) {
            var r = lista[i];
            if (r.type === 'characterData') oversattText(r.target);
            else if (r.type === 'attributes') {
                var tg = r.target;
                if (tg.nodeName === 'TEXTAREA' ? !(tg.parentNode && skippa(tg.parentNode)) : !skippa(tg)) oversattAttr(tg);
            }
            else for (var j = 0; j < r.addedNodes.length; j++) oversattTrad(r.addedNodes[j]);
        }
    }
    function starta() {
        klar = true;
        oversattAllt();
        new MutationObserver(function (rec) {
            for (var i = 0; i < rec.length; i++) ko.push(rec[i]);
            // Mikrotask: översätt innan webbläsaren hinner rita den svenska texten.
            if (!schemalagd) { schemalagd = true; Promise.resolve().then(kor); }
        }).observe(document.body, {
            childList: true, subtree: true, characterData: true,
            attributes: true, attributeFilter: ATTR.concat(['href'])
        });
        var tObs = document.querySelector('title');
        if (tObs) new MutationObserver(function () {
            var h = DICT[normal(document.title)];
            if (h && h !== document.title) document.title = h;
        }).observe(tObs, { childList: true, characterData: true, subtree: true });
    }

    // ---- Språkknappen -----------------------------------------------------
    // Ett jordklot som öppnar en liten meny med språken. Samma väljare
    // sitter sist i huvudmenyn och (på teorisidorna) till höger om
    // knappen Dyslexivänligt: katalog.html anropar I18N.sprakvaljare(el).
    var SPRAKNAMN = { sv: 'Svenska', nb: 'Norsk', en: 'English' };
    // Menyn visar bara de språk sidan finns på (svenska alltid först).
    function sidansSprak() {
        return ['sv', 'nb', 'en'].filter(function (k) { return k === 'sv' || harSprak(SIDA, k); });
    }
    var GLOB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/>' +
        '<path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>';
    var CSS = '' +
        '.lab-lang-dd{position:relative;display:inline-flex;align-items:center}' +
        '.lab-lang-glob{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;' +
        'padding:0 !important;border:none;border-radius:999px;background:none;color:inherit;cursor:pointer;opacity:.85}' +
        '.lab-lang-glob:hover,.lab-lang-dd.is-open .lab-lang-glob{opacity:1;background:rgba(15,22,32,.07)}' +
        '.lab-lang-glob:focus-visible{outline:2px solid currentColor;outline-offset:2px}' +
        '.lab-lang-meny{position:absolute;top:calc(100% + 6px);right:0;z-index:60;min-width:150px;padding:6px;' +
        'background:#fbf9f4;border:1px solid rgba(15,22,32,.14);border-radius:12px;' +
        'box-shadow:0 8px 24px rgba(15,22,32,.14);display:none}' +
        '.lab-lang-dd.is-open .lab-lang-meny{display:block}' +
        '.lab-lang-meny a{display:flex !important;align-items:center;justify-content:space-between;gap:12px;' +
        'padding:8px 12px !important;border-radius:8px;color:#0f1620 !important;text-decoration:none !important;' +
        'font-size:14px;white-space:nowrap;background:none !important;border:none !important}' +
        '.lab-lang-meny a:hover{background:rgba(15,22,32,.07) !important}' +
        '.lab-lang-meny a[aria-checked="true"]{font-weight:600}' +
        '.lab-lang-meny a[aria-checked="true"]::after{content:"\\2713";font-weight:600}' +
        '.lab-bionic-bar .lab-lang-glob{width:30px;height:30px}' +
        // Simuleringarna: väljaren sitter som en egen ruta längst till höger
        // i avsnittsraden (.secnav från section-nav.js), direkt ovanför
        // simuleringen, med texten SPRÅK + språkets namn. Den ser ut som
        // rutorna bredvid så att den syns, och läget visar att den gäller
        // simuleringen och inte hela sajten.
        '.lab-lang-sim{margin-left:auto;flex:0 0 auto}' +
        '.lab-lang-sim .lab-lang-kort{display:flex;align-items:center;gap:10px;height:100%;cursor:pointer;' +
        'background:var(--lab-bg,#f3eee4);color:var(--lab-ink,#0f1620);font-family:Poppins,sans-serif;' +
        'border:1px solid var(--lab-line-strong,rgba(15,22,32,.28));border-radius:10px;padding:8px 14px 8px 12px;' +
        'text-align:left;transition:border-color .15s ease}' +
        '.lab-lang-sim .lab-lang-kort:hover,.lab-lang-sim.is-open .lab-lang-kort{border-color:var(--lab-accent,#c8324a)}' +
        '.lab-lang-sim .lab-lang-kort:focus-visible{outline:2px solid currentColor;outline-offset:2px}' +
        '.lab-lang-kort svg{flex:none}' +
        '.lab-lang-kort-text{display:flex;flex-direction:column;gap:1px}' +
        '.lab-lang-kort-tag{font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.65;' +
        'font-family:var(--lab-font-mono,monospace)}' +
        '.lab-lang-kort-namn{font-weight:600;font-size:15px;white-space:nowrap}' +
        '.lab-lang-kort-namn::after{content:"";display:inline-block;margin-left:7px;vertical-align:3px;' +
        'border:4px solid transparent;border-top:5px solid currentColor;border-bottom:0}' +
        // Avsnittsradens regler för länkar (.secnav a: kolumn, ram, centrering)
        // får inte slå igenom i rullgardinsmenyn.
        '.secnav .lab-lang-meny a{flex-direction:row !important;align-items:center !important;text-align:left !important;' +
        'min-width:0 !important;flex:none !important;border:none !important;gap:12px}' +
        '.lab-lang-rad{display:flex;justify-content:flex-end;max-width:1400px;margin:14px auto 0;' +
        'padding:0 2rem;box-sizing:border-box}' +
        '@media(max-width:560px){.lab-lang-sim{flex:1 1 100%;display:flex;justify-content:flex-end}' +
        '.lab-lang-rad{padding:0 1rem}.lab-lang-kort-namn{font-size:13px}}';
    var cssLagd = false;
    function laggCss() {
        if (cssLagd) return;
        cssLagd = true;
        var st = document.createElement('style');
        st.textContent = CSS;
        document.head.appendChild(st);
    }
    function sprakUrl(till) {
        var u = new URL(window.location.href);
        if (till !== 'sv') u.searchParams.set('lang', till); else u.searchParams.delete('lang');
        return u.href;
    }
    function bygValjare(kort) {
        var dd = document.createElement('div');
        dd.className = 'lab-lang-dd no-i18n' + (kort ? ' lab-lang-sim' : '');
        var knp = document.createElement('button');
        knp.type = 'button';
        knp.className = kort ? 'lab-lang-kort' : 'lab-lang-glob';
        knp.setAttribute('aria-haspopup', 'true');
        knp.setAttribute('aria-expanded', 'false');
        knp.setAttribute('aria-label', EN ? 'Language' : 'Språk');
        knp.title = EN ? 'Language / Språk' : NB ? 'Språk / Svenska' : sidansSprak().indexOf('nb') >= 0 ? 'Språk / Norsk' : 'Språk / Language';
        knp.innerHTML = kort
            ? GLOB + '<span class="lab-lang-kort-text"><span class="lab-lang-kort-tag">' +
              (EN ? 'Language' : 'Språk') + '</span><span class="lab-lang-kort-namn">' + SPRAKNAMN[lang] + '</span></span>'
            : GLOB;
        if (kort) knp.title = NB ? 'Velg språk for simuleringen' : 'Välj språk för simuleringen';
        var meny = document.createElement('div');
        meny.className = 'lab-lang-meny';
        meny.setAttribute('role', 'menu');
        sidansSprak().forEach(function (k) {
            var a = document.createElement('a');
            a.setAttribute('role', 'menuitemradio');
            a.setAttribute('aria-checked', k === lang ? 'true' : 'false');
            a.setAttribute('data-lang-fast', '1');
            a.setAttribute('hreflang', k);
            a.setAttribute('lang', k);
            a.href = sprakUrl(k);
            a.textContent = SPRAKNAMN[k];
            a.addEventListener('click', function (e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
                e.preventDefault();
                if (k === lang) { stang(); return; }
                bytTill(k);
            });
            meny.appendChild(a);
        });
        function stang() {
            dd.classList.remove('is-open');
            knp.setAttribute('aria-expanded', 'false');
        }
        knp.addEventListener('click', function (e) {
            e.stopPropagation();
            var opp = !dd.classList.contains('is-open');
            dd.classList.toggle('is-open', opp);
            knp.setAttribute('aria-expanded', opp ? 'true' : 'false');
        });
        document.addEventListener('click', function (e) { if (!dd.contains(e.target)) stang(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') stang(); });
        dd.appendChild(knp);
        dd.appendChild(meny);
        return dd;
    }
    // Lägger en väljare i el (en gång). Används av katalog.html.
    function sprakvaljare(el) {
        if (!AKTIV || !el || el.querySelector('.lab-lang-dd')) return;
        laggCss();
        el.appendChild(bygValjare());
    }
    // Simuleringarna (de sidor som finns på norska) har väljaren i
    // avsnittsraden ovanför simuleringen, inte i huvudmenyn. Saknar sidan
    // avsnittsrad läggs väljaren i en egen rad under sidhuvudet. I en iframe
    // (simuleringen inbäddad i en annan sida) visas ingen väljare.
    var SIMSIDA = harSprak(SIDA, 'nb');
    var IFRAME = (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
    function simKnapp(reserv) {
        if (IFRAME) return;
        var dd = document.querySelector('.lab-lang-sim');
        var secnav = document.querySelector('.secnav');
        if (secnav) {
            if (dd && dd.parentNode === secnav) return;
            if (!dd) dd = bygValjare(true);
            var gammal = document.querySelector('.lab-lang-rad');
            secnav.appendChild(dd);
            if (gammal) gammal.parentNode.removeChild(gammal);
            return;
        }
        if (dd || !reserv) return;
        var rad = document.createElement('div');
        rad.className = 'lab-lang-rad';
        rad.appendChild(bygValjare(true));
        var header = document.querySelector('.lab-header') || document.querySelector('nav.navbar, nav.lab-nav');
        if (header && header.parentNode) header.parentNode.insertBefore(rad, header.nextSibling);
        else document.body.insertBefore(rad, document.body.firstChild);
    }
    function knapp(forsok) {
        if (SIMSIDA) { simKnapp((forsok || 0) >= 12); return; }
        var navs = document.querySelectorAll('nav.lab-nav, .navbar .nav-menu');
        for (var i = 0; i < navs.length; i++) {
            var nav = navs[i];
            if (nav.querySelector('.lab-lang-dd')) continue;
            var dd = bygValjare();
            if (nav.nodeName === 'UL') {
                var li = document.createElement('li'); li.appendChild(dd); nav.appendChild(li);
            } else nav.appendChild(dd);
        }
    }

    function onReady() {
        if (!AKTIV) return;   // sidan har ingen engelsk version ännu
        laggCss();
        hreflang();
        knapp();
        // React-sidor ritar sidhuvudet efter DOMContentLoaded: leta igen en stund.
        var forsok = 0;
        var iv = setInterval(function () {
            knapp(forsok);
            if (++forsok > 40) clearInterval(iv);
        }, 250);
        if (OV) starta();
    }

    // ---- Katalogen --------------------------------------------------------
    // data/en/katalog.js anropar I18N.katalog({...}). Kurs- och kapitelnamnen
    // är NYCKLAR i window.KATALOG och rörs aldrig (de översätts på skärmen
    // av ordlistan i i18n/en.js); här byts bara de visade fälten.
    //   kurser:  { 'fy1': { tagline, paragraphs[], bullets[] } }
    //   kapitel: { 'fy1-3': 'kapitelintro' }
    //   avsnitt: { 'fy1-3.2': { title, description, keywords[] } }
    // Härledda kurser (ma1b, ma2b, ma3b, fy1:s delade kraftmoment) slår upp
    // sin källa i aliaskartorna när de saknar egen post.
    var KODER = {
        'Fysik nivå 1': 'fy1', 'Fysik nivå 2': 'fy2',
        'Matematik nivå 1b': 'ma1b', 'Matematik nivå 1c': 'ma1c',
        'Matematik nivå 2b': 'ma2b', 'Matematik nivå 2c': 'ma2c',
        'Matematik fortsättning nivå 1b': 'ma3b', 'Matematik fortsättning nivå 1c': 'ma3c',
        'Matematik fortsättning nivå 2': 'ma4', 'Matematik specialisering': 'maspec'
    };
    function alias(id) {
        var kartor = [window.MA1B_ALIAS, window.MA2B_ALIAS, window.MA3B_ALIAS, window.FY1_ALIAS];
        for (var i = 0; i < kartor.length; i++) if (kartor[i] && kartor[i][id]) return kartor[i][id];
        return null;
    }
    function katalog(EN) {
        var K = window.KATALOG;
        if (!K || !EN) return;
        var av = EN.avsnitt || {}, ku = EN.kurser || {}, ka = EN.kapitel || {};
        function post(id) { return av[id] || (alias(id) && av[alias(id)]) || null; }
        function laggPa(sec, code) {
            var p = post(code + '-' + sec.num);
            if (!p) return;
            if (p.title) sec.title = p.title;
            if (p.description) sec.description = p.description;
            // Engelska sökord läggs TILL, så att svenska sökningar fortsätter fungera.
            if (p.keywords) sec.keywords = (sec.keywords || []).concat(p.keywords);
        }
        for (var s in K) {
            var subj = K[s];
            for (var c in (subj.courses || {})) {
                var code = KODER[c], kurs = subj.courses[c];
                if (!code) continue;
                var ki = ku[code];
                if (ki && kurs.intro) {
                    if (ki.tagline) kurs.intro.tagline = ki.tagline;
                    if (ki.paragraphs) kurs.intro.paragraphs = ki.paragraphs;
                    if (ki.bullets) kurs.intro.bullets = ki.bullets;
                }
                for (var ch in (kurs.chapters || {})) {
                    var kap = kurs.chapters[ch];
                    var kid = code + '-' + kap.number;
                    if (ka[kid]) kap.intro = ka[kid];
                    (kap.sections || []).forEach(function (sec) { laggPa(sec, code); });
                }
            }
        }
        (window.KATALOG_FLAT || []).forEach(function (sec) {
            var code = KODER[sec.course];
            if (code) laggPa(sec, code);
        });
    }

    // ---- Innehåll (övningar, exit tickets, nyheter, ordlista, prov …) -------
    // data/en/<namn>.js anropar I18N.innehall('<namn>', { '<id>': {kalla, data}, … }).
    // `kalla` är ett fingeravtryck av den svenska posten vid översättningen
    // (.claude/i18n/kalla.js). Det används inte här, bara av
    // .claude/verify-engelska.js, som larmar när svenskan ändrats efteråt.
    //   Objektmängder (window.OVNINGAR[id] = …): hela posten ersätts.
    //   Listor med id (nyheter, begrepp): fälten i `data` slås ihop med posten.
    var INNEHALL = {
        ovningar: { glob: 'OVNINGAR', satt: 'ersatt' },
        exittickets: { glob: 'EXITTICKETS', satt: 'ersatt' },
        repetition: { glob: 'REPETITION', satt: 'ersatt' },
        np: { glob: 'NP_PROV', satt: 'sla-ihop' },
        nyheter: { glob: ['NYHETER_ALL', 'NYHETER'], satt: 'lista' },
        begrepp: { glob: ['BEGREPP'], satt: 'lista' },
        ovningsblad: { glob: 'OVNINGSBLAD', satt: 'sla-ihop' },
        visualiseringar: { glob: 'VISUALISERINGAR_INDEX', satt: 'sla-ihop' }
    };
    function innehall(namn, poster) {
        var typ = INNEHALL[namn.split('/')[0]];
        if (!typ || !poster) return;
        if (typ.satt === 'lista') {
            var sedda = [];
            typ.glob.forEach(function (g) {
                var arr = window[g];
                if (!arr || !arr.forEach || sedda.indexOf(arr) >= 0) return;
                sedda.push(arr);
                arr.forEach(function (o) {
                    var p = o && poster[o.id];
                    if (p && p.data) for (var f in p.data) o[f] = p.data[f];
                });
            });
            return;
        }
        var G = window[typ.glob];
        if (!G) return;
        for (var id in poster) {
            var p = poster[id];
            if (!p || !p.data) continue;
            if (typ.satt === 'ersatt' || !G[id] || typeof G[id] !== 'object') G[id] = p.data;
            else for (var f2 in p.data) G[id][f2] = p.data[f2];
        }
    }

    // ---- Etiketter i genererade SVG-figurer ---------------------------------
    // Provens figurer (window.NP_FIGURER[id] = { u1: '<svg …>', … }) är stora,
    // genererade SVG-strängar. I stället för en engelsk kopia byts bara ord i
    // <text>/<tspan> och aria-label ut mot en ordlista, och decimalkomma blir
    // decimalpunkt. data/en/np/<id>-figurer.js anropar
    //   I18N.svgEtiketter('NP_FIGURER', '<id>', { 'svensk etikett': 'English', … });
    // np.html laddar dessa efter figurfilerna.
    function svgEtiketter(glob, id, dict) {
        var G = window[glob], F = G && G[id];
        if (!F || !EN) return;
        var d = Object.create(null);
        for (var k in dict) d[normal(k)] = dict[k];
        function byt(txt) {
            var h = d[normal(txt)];
            return h != null ? h : txt.replace(/(\d),(\d)/g, '$1.$2');
        }
        for (var key in F) {
            if (typeof F[key] !== 'string') continue;
            F[key] = F[key]
                .replace(/(<(?:text|tspan)\b[^>]*>)([^<]+)/g, function (m, tag, txt) {
                    if (!/\S/.test(txt)) return m;
                    var lead = /^\s*/.exec(txt)[0], tail = /\s*$/.exec(txt)[0];
                    return tag + lead + byt(txt.trim()) + tail;
                })
                .replace(/(aria-label|title)="([^"]*)"/g, function (m, a, v) { return a + '="' + byt(v) + '"'; });
        }
    }

    window.I18N = {
        svgEtiketter: svgEtiketter,
        innehall: innehall,
        katalog: katalog,
        sprakvaljare: sprakvaljare,
        kurskod: function (namn) { return KODER[namn] || null; },
        lang: lang,
        en: EN,
        nb: NB,
        t: t,
        add: add,
        addHtml: addHtml,
        overlay: overlay,
        skript: skript,
        url: medLang,
        bytTill: bytTill,
        // Tal: decimalkomma på svenska, decimalpunkt på engelska.
        tal: function (s) { return EN ? String(s).replace(/(\d),(\d)/g, '$1.$2') : s; },
        _dict: DICT
    };

    if (NB) {
        skript('i18n/nb.js');
        window.I18N._sida = SIDA;
        skript('i18n/nb/manifest.js');
    }
    if (EN) {
        skript('i18n/en.js');
        // Sidans egen ordlista (i18n/sidor/<sida>.js) laddas av manifestet,
        // bara om den finns — så att sidor utan egen ordlista inte ger 404.
        window.I18N._sida = (window.location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
        skript('i18n/manifest.js');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
    else onReady();
})();
