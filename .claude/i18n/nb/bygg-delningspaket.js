// .claude/i18n/nb/bygg-delningspaket.js — bygger ett fristående paket med
// simuleringarna på norska (bokmål), där den norska texten står DIREKT I
// KODEN, för att delas med en samarbetspartner som vill anpassa dem efter
// sin egen sajt (Sigi, 2026-10-27).
//
//   node .claude/i18n/nb/bygg-delningspaket.js [utmapp]
//
// Standard-utmapp: delningspaket/fysiklabbet-simuleringer-nb/ i repots rot
// (ignoreras av git lokalt via .git/info/exclude). Paketet byggs alltid om
// från början.
//
// Vad skriptet gör med varje fysik1-*/fysik2-*-simulering:
//   1. Bakar in den norska texten: varje JSX-/HTML-textnod och varje
//      strängliteral vars (normaliserade) text är en nyckel i ordlistorna
//      (i18n/nb.js + i18n/nb/sidor/<sida>.js) byts mot den norska texten.
//      I18N.t('…', {n}) står kvar men får den norska mallen, och tekst.js
//      (en liten ersättare för i18n.js) fyller bara i platshållarna.
//   2. Tar bort det som hör till Fysiklabbet: sidhuvudet med menyn,
//      brödsmulan, sidfoten, avsnittsraden (section-nav.js + katalogdatan),
//      feedbackwidgeten, Cloudflares besöksmätning, canonical/og/twitter-
//      taggar och favicon. Länkar till sajtens övriga sidor görs absoluta
//      (https://fysiklabbet.se/…); länkar mellan simuleringarna står kvar.
//   3. Kopierar de delade filerna (stilmallar, sim-dock.js, minisim.js …)
//      och simuleringarnas undermappar (iframes, bilder) till paketet.
//   4. Tar bort reservgrenarna (window.I18N ? I18N.t('norsk') : 'svensk')
//      med @babel/parser, så att bara den norska texten står kvar.
//   5. Lägger till index.html (översikt), LES-MEG.md (README på norska,
//      källa: delningspaket-LES-MEG.md) och en zip-fil bredvid mappen.
// Det som inte går att baka in automatiskt (text som sätts ihop av delar,
// ord som också är kodnamn) står som riktade ersättningar i
// delningspaket-tillagg.js. Kontrollera alltid med
// kontrollera-delningspaket.js efteråt (JS-fel, synlig svenska, rester).
// Omdirigeringssidor (bara en hänvisning till en annan sida) tas inte med.
'use strict';
const fs = require('fs');
const path = require('path');
const ROT = path.join(__dirname, '..', '..', '..');
const UT = path.resolve(process.argv[2] || path.join(ROT, 'delningspaket', 'fysiklabbet-simuleringer-nb'));
const SAJT = 'https://fysiklabbet.se/';

// ---- Ordlistor --------------------------------------------------------------
const norm = s => String(s).replace(/\s+/g, ' ').trim();
function lasDict(fil) {
    const acc = {};
    const p = path.join(ROT, fil);
    if (!fs.existsSync(p)) return acc;
    // addHtml-stycken (hela innerHTML med markup) sparas under nyckeln __html.
    const html = {};
    const I18N = { add: o => { for (const k in o) acc[norm(k)] = o[k]; }, addHtml: o => Object.assign(html, o), t: s => s };
    new Function('window', 'I18N', fs.readFileSync(p, 'utf8'))({ I18N }, I18N);
    delete acc[''];
    Object.defineProperty(acc, '__html', { value: html, enumerable: false });
    return acc;
}
const GEMENSAM = lasDict('i18n/nb.js');
const TILLAGG = require('./delningspaket-tillagg.js');
// Tilläggen: [sträng eller RegExp, ersättning]. Varnar när koden inte finns.
function tillagg(s, fil) {
    for (const [fran, till] of (TILLAGG[fil] || [])) {
        const finns = fran instanceof RegExp ? fran.test(s) : s.includes(fran);
        if (!finns) { console.log('VARNING ' + fil + ': hittar inte tillägget ' + String(fran).slice(0, 80)); continue; }
        s = fran instanceof RegExp ? s.replace(fran, () => till) : s.split(fran).join(till);
    }
    return s;
}

// ---- Hjälpare för HTML-block -------------------------------------------------
// Tar bort ett element (inklusive innehåll) som börjar vid index i, genom att
// räkna öppnande och stängande taggar med samma namn.
function taBortElement(s, i, tag) {
    const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'gi');
    re.lastIndex = i;
    let djup = 0, m;
    while ((m = re.exec(s))) {
        if (m[0].endsWith('/>')) continue;
        djup += m[1] ? -1 : 1;
        if (djup === 0) {
            let slut = re.lastIndex;
            // ta med radslutet efter elementet
            const nl = /^[ \t]*\r?\n/.exec(s.slice(slut));
            if (nl) slut += nl[0].length;
            let start = i;
            while (start > 0 && (s[start - 1] === ' ' || s[start - 1] === '\t')) start--;
            return s.slice(0, start) + s.slice(slut);
        }
    }
    return s;
}
function taBortAlla(s, oppningRe, tag) {
    for (let varv = 0; varv < 20; varv++) {
        const m = oppningRe.exec(s);
        oppningRe.lastIndex = 0;
        if (!m) break;
        const ny = taBortElement(s, m.index, tag);
        if (ny === s) break;
        s = ny;
    }
    return s;
}
const taBortRad = (s, re) => s.replace(new RegExp('^[ \\t]*' + re.source + '[^\\n]*\\r?\\n', 'gm' + (re.flags.includes('i') ? 'i' : '')), '');

// ---- Inbakning av norsk text -------------------------------------------------
function escStr(s, q) {
    s = String(s).replace(/\\/g, '\\\\');
    if (q === '`') return s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return s.split(q).join('\\' + q).replace(/\r?\n/g, '\\n');
}
// HTML-entiteter i källan avkodas innan texten slås upp, eftersom
// ordlistans nycklar är texten som den syns på skärmen.
const ENT = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', shy: '­',
    thinsp: ' ', ensp: ' ', emsp: ' ', hairsp: ' ', nbhy: '‑',
    mdash: '—', ndash: '–', hellip: '…', rarr: '→', larr: '←', uarr: '↑', darr: '↓', harr: '↔', rArr: '⇒',
    times: '×', middot: '·', deg: '°', minus: '−', plusmn: '±', asymp: '≈', ne: '≠', le: '≤', ge: '≥',
    sup2: '²', sup3: '³', frac12: '½', micro: 'µ', prop: '∝', infin: '∞', radic: '√', sdot: '⋅',
    aring: 'å', auml: 'ä', ouml: 'ö', Aring: 'Å', Auml: 'Ä', Ouml: 'Ö', eacute: 'é', aelig: 'æ', oslash: 'ø',
    AElig: 'Æ', Oslash: 'Ø', laquo: '«', raquo: '»', rdquo: '”', ldquo: '“', rsquo: '’', lsquo: '‘', bull: '•',
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π',
    rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'φ', omega: 'ω', Delta: 'Δ', Phi: 'Φ', Omega: 'Ω', Sigma: 'Σ' };
const avkoda = s => String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENT[e] != null ? ENT[e] : ENT[e.toLowerCase()] != null ? ENT[e.toLowerCase()] : m;
});
const slaUpp = (D, txt) => {
    let k = norm(txt);
    if (D[k] != null) return [k, D[k]];
    k = norm(avkoda(txt));
    if (D[k] != null) return [k, D[k]];
    k = norm(avkoda(txt).replace(/­/g, ''));
    if (D[k] != null) return [k, D[k]];
    return [k, null];
};
function bakaIn(src, D) {
    let antal = 0;
    const orig = src;
    // Hopslagna strängar ('Kroppen alstrar … ' +\n 'Värmeutbytet …') slås ihop
    // till en, så att hela meningen kan slås upp. Samma värde i koden.
    for (let varv = 0; varv < 10; varv++) {
        const fore = src;
        src = src.replace(/([=(:,?[{+]\s*|^[ \t]*)(['"])((?:\\.|(?!\2)[^\\\r\n])*)\2[ \t]*\+[ \t]*\r?\n[ \t]*\2((?:\\.|(?!\2)[^\\\r\n])*)\2(?=\s*[,);\]}+]|[ \t]*\r?\n)/gm,
            (m, fore, q, a, b) => /[A-Za-zÅÄÖåäö]/.test(a + b) ? fore + q + a + b + q : m);
        if (src === fore) break;
    }
    // Hårt mellanslag som variabel ("100" + NB + "W") blir ett tecken i strängen.
    const nbDef = /\bNB\s*=\s*(['"])(\\u[0-9a-fA-F]{4}|[^'"\\])\1/.exec(src);
    if (nbDef) {
        const tecken = nbDef[2].length > 1 ? String.fromCharCode(parseInt(nbDef[2].slice(2), 16)) : nbDef[2];
        for (let varv = 0; varv < 10; varv++) {
            const fore = src;
            src = src.replace(/(['"])((?:\\.|(?!\1)[^\\\r\n])*)\1\s*\+\s*NB\s*\+\s*\1((?:\\.|(?!\1)[^\\\r\n])*)\1/g,
                (m, q, a, b) => q + a + tecken + b + q);
            if (src === fore) break;
        }
    }
    // 0. Hela stycken med markup (addHtml): matchas med flexibla blanktecken.
    //    Före allt annat, så att inga delar av stycket hunnit bytas.
    const H = D.__html || {};
    for (const k of Object.keys(H)) {
        const re = new RegExp(norm(k).split(/(> <| )/).map(t => t === '> <' ? '>\\s*<' : t === ' ' ? '\\s+' : t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(''));
        if (re.test(src)) { src = src.replace(re, () => H[k]); antal++; }
    }
    // A. Nyckeln i I18N.t('…') och sidornas egna hjälpare (tr, T, tt,
    //    oversatt), var de än står, även inne i ${…} i en mallsträng.
    src = src.replace(/(\b(?:I18N\.t|tr|T|tt|oversatt)\(\s*)(['"`])((?:\\.|(?!\2)[^\\\r\n])*?)\2/g, (m, fore, q, inner) => {
        if (q === '`' && inner.includes('${')) return m;
        const [k, v] = slaUpp(D, inner.replace(/\\(['"`])/g, '$1'));
        if (v == null || v === k) return m;
        antal++;
        return fore + q + escStr(v, q) + q;
    });
    // B. Attribut som kan sträcka sig över flera rader (aria-label="…").
    src = src.replace(/(\b(?:aria-label|title|alt|placeholder)=)(["'])([^"'<>{}]*?)\2/g, (m, fore, q, inner) => {
        if (!/[A-Za-zÅÄÖåäö]/.test(inner)) return m;
        const [k, v] = slaUpp(D, inner);
        if (v == null || v === k) return m;
        antal++;
        return fore + q + String(v).replace(/&/g, '&amp;').split(q).join(q === '"' ? '&quot;' : '&#39;') + q;
    });
    // C. Textnoder mellan taggar/uttryck i HTML och JSX: >…< , >…{ , }…< .
    //    Görs före strängarna, så att citattecken i löptexten ("Resulterande
    //    fält") inte byts för sig och bryter upp stycket.
    src = src.replace(/([>}])([^<>{}]+)(?=[<{])/g, (m, fore, txt) => {
        if (!/[A-Za-zÅÄÖåäö]/.test(txt)) return m;
        const [k, v] = slaUpp(D, txt);
        if (v == null || v === k) return m;
        const lead = /^\s*/.exec(txt)[0], tail = /\s*$/.exec(txt)[0];
        antal++;
        // < och > i texten måste vara entiteter i HTML och JSX.
        return fore + lead + String(v).replace(/</g, '&lt;').replace(/>/g, '&gt;') + tail;
    });
    // 1. Strängliteraler ('…', "…", `…` utan ${}) vars innehåll är en nyckel.
    //    Strängar med inbäddad markup eller ${…} ('Massa (<em>m</em>)') byts
    //    bit för bit: varje textbit mellan taggarna/uttrycken som är en nyckel.
    src = src.replace(/(['"`])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g, (m, q, inner) => {
        if (!/[A-Za-zÅÄÖåäö]/.test(inner)) return m;
        // Ett ord med bara små a–z ('ledare', 'drag') är oftast ett kodnamn
        // (läge, objektnyckel) som jämförs med andra strängar: rör det inte.
        if (/^[a-z]+$/.test(inner) && new RegExp('(^|[\\s{,.])' + inner + '\\s*:|\\.' + inner + '\\b').test(orig)) return m;
        if (!(q === '`' && inner.includes('${'))) {
            let txt = inner;
            try { txt = q === '`' ? inner.replace(/\\`/g, '`') : JSON.parse('"' + inner.replace(/\\'/g, "'").replace(/"/g, '\\"') + '"'); } catch (e) { txt = inner; }
            const [k1, v] = slaUpp(D, txt);
            if (v != null && v !== k1) { antal++; return q + escStr(v, q) + q; }
        }
        if (!/<[a-zA-Z\/][^>]*>|\$\{/.test(inner)) return m;
        let byt = false;
        const ny = inner.split(/(<[^>]*>|\$\{[^}]*\})/).map((del, i) => {
            if (i % 2 === 1 || !/[A-Za-zÅÄÖåäö]/.test(del)) return del;
            const [k2, v] = slaUpp(D, del);
            if (v == null || v === k2) return del;
            byt = true;
            const lead = /^\s*/.exec(del)[0], tail = /\s*$/.exec(del)[0];
            return lead + escStr(v, q) + tail;
        }).join('');
        if (!byt) return m;
        antal++;
        return q + ny + q;
    });
    return { src, antal };
}

// ---- Reservgrenar -------------------------------------------------------------
// window.I18N ? I18N.t('norsk') : 'svensk' → I18N.t('norsk'). I paketet finns
// I18N alltid (tekst.js), så den svenska grenen körs aldrig; den tas bort så
// att koden bara har norsk text. Kräver @babel/parser (i %TEMP%\pptr-test);
// saknas den lämnas grenarna kvar, vilket är ofarligt.
let PARSER = null;
try { PARSER = require(path.join(process.env.TEMP || '', 'pptr-test', 'node_modules', '@babel', 'parser')); } catch (e) {}
function rensaReservKod(kod) {
    if (!PARSER || !/window\.I18N/.test(kod)) return { kod, n: 0 };
    let n = 0;
    for (let varv = 0; varv < 20; varv++) {
        let ast;
        try { ast = PARSER.parse(kod, { sourceType: 'unambiguous', plugins: ['jsx'], errorRecovery: true }); }
        catch (e) { return { kod, n }; }
        const traffar = [];
        const arTest = t => /^window\.I18N(\s*&&\s*(window\.)?I18N\.(nb|t))?$/.test(kod.slice(t.start, t.end).trim());
        (function gå(nod) {
            if (!nod || typeof nod.type !== 'string') return;
            // if (window.I18N && I18N.nb) return I18N.t('…');  return `svensk`;
            //  → return I18N.t('…');
            const lista = nod.type === 'BlockStatement' || nod.type === 'Program' ? nod.body
                : nod.type === 'SwitchCase' ? nod.consequent : null;
            if (lista) for (let i = 0; i + 1 < lista.length; i++) {
                const a = lista[i], b = lista[i + 1];
                if (a.type === 'IfStatement' && !a.alternate && arTest(a.test) &&
                    a.consequent.type === 'ReturnStatement' && b.type === 'ReturnStatement') {
                    traffar.push({ start: a.start, end: b.end, consequent: a.consequent });
                    return;
                }
            }
            if (nod.type === 'ConditionalExpression' &&
                /^window\.I18N(\s*&&\s*window\.I18N\.(nb|t))?$/.test(kod.slice(nod.test.start, nod.test.end).trim())) {
                traffar.push(nod);
                return;   // inre träffar tas i nästa varv
            }
            for (const k in nod) {
                if (k === 'loc' || k === 'start' || k === 'end') continue;
                const v = nod[k];
                if (Array.isArray(v)) v.forEach(gå);
                else if (v && typeof v.type === 'string') gå(v);
            }
        })(ast.program);
        if (!traffar.length) break;
        traffar.sort((a, b) => b.start - a.start);
        for (const t of traffar) {
            kod = kod.slice(0, t.start) + kod.slice(t.consequent.start, t.consequent.end) + kod.slice(t.end);
            n++;
        }
    }
    return { kod, n };
}
function rensaReserv(s, arJs) {
    if (arJs) return rensaReservKod(s);
    let n = 0;
    s = s.replace(/(<script(?![^>]*\bsrc=)[^>]*>)([\s\S]*?)(<\/script>)/g, (m, a, kod, b) => {
        const r = rensaReservKod(kod);
        n += r.n;
        return a + r.kod + b;
    });
    return { kod: s, n };
}

// ---- Bearbetning av en sida ---------------------------------------------------
const PAKET_SIDOR = new Set();
function arOmdirigering(html) {
    return html.length < 4000 && /location\.replace|http-equiv="refresh"/i.test(html);
}
function bearbeta(fil, html, D) {
    let s = html;
    // Huvudet: i18n.js → tekst.js, bort med delningstaggar, favicon och canonical.
    s = s.replace(/<script src="i18n\.js"><\/script>/, '<script src="tekst.js"></script>');
    s = taBortRad(s, /<link rel="(?:canonical|icon|apple-touch-icon)"/);
    s = taBortRad(s, /<meta (?:property="og:|name="twitter:)/);
    s = s.replace(/<html lang="sv">/, '<html lang="nb">');
    // Cachebrytaren (document.write) blir vanliga länkar.
    s = s.replace(/<script>document\.write\('<link rel="stylesheet" href="([^"?]+)\?v=' \+ window\.__CB \+ '">'\);<\/script>/g,
        '<link rel="stylesheet" href="$1">');
    s = s.replace(/<script>document\.write\('<scr' \+ 'ipt src="([^"?]+)\?v=' \+ window\.__CB \+ '"><\/scr' \+ 'ipt>'\);<\/script>/g,
        '<script src="$1"></script>');
    // Sidhuvud, menyer, brödsmulor och sidfot.
    s = taBortAlla(s, /<div class="lab-header\b/, 'div');
    s = taBortAlla(s, /<nav class="navbar\b/, 'nav');
    s = taBortAlla(s, /<div className="breadcrumb\b/, 'div');
    s = taBortAlla(s, /<div class="breadcrumb\b/, 'div');
    s = taBortAlla(s, /<p className="breadcrumb\b/, 'p');
    // Brödsmula byggd med React.createElement('div', { className: "breadcrumb …" }, …)
    // ersätts med null (React ritar ingenting).
    {
        const i = s.search(/React\.createElement\(\s*'div',\s*\{\s*className:\s*["']breadcrumb/);
        if (i >= 0) {
            let d = 0, j = s.indexOf('(', i);
            for (; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')') { d--; if (d === 0) break; } }
            let slut = j + 1;
            const efter = /^\s*,/.exec(s.slice(slut));
            if (efter) slut += efter[0].length;
            s = s.slice(0, i) + 'null,' + s.slice(slut);
        }
    }
    s = taBortAlla(s, /<nav className="breadcrumb\b/, 'nav');
    s = taBortAlla(s, /<footer\b/, 'footer');
    // Skript som hör till sajten.
    s = taBortRad(s, /<script src="(?:feedback|section-nav)\.js[^"]*"/);
    s = taBortRad(s, /<script src="data\/(?:katalog|simuleringar|sok)\.js[^"]*"/);
    s = s.replace(/[ \t]*<!-- Cloudflare Web Analytics -->[\s\S]*?<!-- End Cloudflare Web Analytics -->[ \t]*\r?\n?/g, '');
    s = taBortRad(s, /<script[^>]*cloudflareinsights/);
    // Norsk text i koden.
    const r = bakaIn(s, D);
    s = r.src;
    // Länkar till sajtens övriga sidor blir absoluta.
    s = s.replace(/(href=["'{]?["'`]?)((?:index|katalog|avsnitt|om|kontakt|simuleringar|nyheter|begrepp|np|fysik1|fysik2|fysik-repetition|fysik-enhetskoll)\.html[^"'`\s>]*)/g,
        (m, a, url) => a + SAJT + url);
    // Ursprung överst i filen.
    s = s.replace(/^(<!DOCTYPE html>\r?\n)/i,
        '$1<!-- Opprinnelig laget av Fysiklabbet (https://fysiklabbet.se), oversatt til norsk (bokmål). -->\n');
    return { s, antal: r.antal };
}

// ---- Beroenden ------------------------------------------------------------------
function lokalaReferenser(html) {
    const ut = new Set();
    const re = /(?:src|href)\s*=\s*["']([^"'#?]+)|["'`]((?:[\w.-]+\/)*[\w.-]+\.(?:js|css|png|jpe?g|svg|gif|webp|mp4|mp3|wav|json|glb|gltf|html))["'`?]/g;
    let m;
    while ((m = re.exec(html))) {
        const u = m[1] || m[2];
        if (!u || /^(https?:|data:|mailto:|\/\/)/.test(u) || u.startsWith('/')) continue;
        ut.add(u.replace(/^\.\//, ''));
    }
    return ut;
}
function kopiera(rel) {
    const fran = path.join(ROT, rel);
    if (!fs.existsSync(fran)) return false;
    const till = path.join(UT, rel);
    fs.mkdirSync(path.dirname(till), { recursive: true });
    if (fs.statSync(fran).isDirectory()) fs.cpSync(fran, till, { recursive: true });
    else fs.copyFileSync(fran, till);
    return true;
}

// ---- Kör ---------------------------------------------------------------------------
fs.mkdirSync(UT, { recursive: true });
for (const f of fs.readdirSync(UT)) fs.rmSync(path.join(UT, f), { recursive: true, force: true });
const sidor = fs.readdirSync(ROT).filter(f => /^fysik[12]-.*\.html$/.test(f)).sort();
const rapport = [];
const delade = new Set(['styles.css', 'styles-laborans.css', 'styles-laborans-sim.css']);
const mappar = new Set();
for (const fil of sidor) {
    const html = fs.readFileSync(path.join(ROT, fil), 'utf8');
    if (arOmdirigering(html)) { rapport.push(fil + ': omdirigering, ej med'); continue; }
    PAKET_SIDOR.add(fil);
}
for (const fil of PAKET_SIDOR) {
    const html = fs.readFileSync(path.join(ROT, fil), 'utf8');
    const SD = lasDict('i18n/nb/sidor/' + fil.replace(/\.html$/, '.js'));
    const D = Object.assign({}, GEMENSAM, SD);
    Object.defineProperty(D, '__html', { value: SD.__html, enumerable: false });
    let { s, antal } = bearbeta(fil, html, D);
    s = tillagg(s, fil);
    s = rensaReserv(s, false).kod;
    fs.writeFileSync(path.join(UT, fil), s);
    rapport.push(fil + ': ' + antal + ' textbitar inbakade');
    for (const ref of lokalaReferenser(s)) {
        const forsta = ref.split('/')[0];
        if (ref.includes('/') && /^fysik[12]-/.test(forsta)) mappar.add(forsta);
        else if (!ref.includes('/') && /^fysik[12]-.*\.html$/.test(ref)) continue;
        else delade.add(ref);
    }
}
// Undermappar (iframe-simuleringar, bilder): bearbeta deras html också.
for (const mapp of mappar) {
    kopiera(mapp);
    const bas = mapp.replace(/\/$/, '');
    const D = Object.assign({}, GEMENSAM, lasDict('i18n/nb/sidor/' + bas + '-app.js'), lasDict('i18n/nb/sidor/' + bas + '.js'));
    for (const f of fs.readdirSync(path.join(UT, mapp))) {
        if (!f.endsWith('.html')) continue;
        if (/backup/i.test(f)) { fs.rmSync(path.join(UT, mapp, f)); continue; }
        const p = path.join(UT, mapp, f);
        const r = bakaIn(fs.readFileSync(p, 'utf8'), D);
        fs.writeFileSync(p, r.src.replace(/<html lang="sv">/, '<html lang="nb">'));
        rapport.push(mapp + '/' + f + ': ' + r.antal + ' textbitar inbakade');
    }
}
const saknas = [];
for (const d of delade) {
    if (/^(i18n\.js|tekst\.js|feedback\.js|section-nav\.js|favicon\.svg|index\.html|katalog\.html|fysik[12]\.html)$/.test(d) || d.startsWith('data/katalog') || d.startsWith('i18n/')) continue;
    if (!kopiera(d)) saknas.push(d);
}
// Delade skript (minisim.js, sim-dock.js …): bakas in med alla ordlistor
// tillsammans, eftersom de används av flera simuleringar.
const ALLA = Object.assign({}, GEMENSAM);
for (const f of fs.readdirSync(path.join(ROT, 'i18n', 'nb', 'sidor')))
    Object.assign(ALLA, lasDict('i18n/nb/sidor/' + f));
Object.assign(ALLA, GEMENSAM);
for (const d of delade) {
    if (!d.endsWith('.js') || saknas.includes(d)) continue;
    const p = path.join(UT, d);
    if (!fs.existsSync(p)) continue;
    const r = bakaIn(fs.readFileSync(p, 'utf8'), ALLA);
    fs.writeFileSync(p, rensaReserv(tillagg(r.src, d), true).kod);
    rapport.push(d + ' (delad): ' + r.antal + ' textbitar inbakade');
}
// tekst.js: ersätter i18n.js. Texten är redan norsk; I18N.t fyller bara i platshållare.
fs.writeFileSync(path.join(UT, 'tekst.js'), `/* tekst.js — erstatter Fysiklabbets språkmotor (i18n.js) i denne pakken.
 * Teksten står allerede på norsk i hver fil. I18N.t('… {n} …', { n: 3 })
 * fyller bare inn plassholderne. Desimalkomma beholdes. */
(function () {
    function t(s, v) {
        s = String(s);
        return v ? s.replace(/\\{(\\w+)\\}/g, function (m, k) { return v[k] != null ? v[k] : m; }) : s;
    }
    window.I18N = { lang: 'nb', nb: true, en: false, t: t, tal: function (s) { return s; },
        add: function () {}, addHtml: function () {}, overlay: function (n, cb) { if (cb) cb(); },
        url: function (u) { return u; } };
    document.documentElement.lang = 'nb';
})();
`);
// index.html: en enkel oversikt med lenker til alle simuleringene.
{
    const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const rader = { 1: [], 2: [] };
    for (const fil of PAKET_SIDOR) {
        const html = fs.readFileSync(path.join(UT, fil), 'utf8');
        const tittel = ((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || fil).replace(/\s*[—–-]\s*Fysiklabbet\s*$/, '').trim();
        const beskr = ((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] || '');
        rader[fil[5]].push({ fil, tittel, beskr });
    }
    const liste = n => rader[n].sort((a, b) => a.tittel.localeCompare(b.tittel, 'nb'))
        .map(r => '      <li><a href="' + r.fil + '">' + esc(r.tittel) + '</a>' + (r.beskr ? '<span>' + r.beskr + '</span>' : '') + '</li>').join('\n');
    fs.writeFileSync(path.join(UT, 'index.html'), `<!DOCTYPE html>
<!-- Opprinnelig laget av Fysiklabbet (https://fysiklabbet.se), oversatt til norsk (bokmål). -->
<html lang="nb">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fysikksimuleringer på norsk</title>
  <style>
    body { margin: 0; background: #f3eee4; color: #0f1620; font-family: Poppins, system-ui, sans-serif; line-height: 1.5; }
    main { max-width: 860px; margin: 0 auto; padding: 32px 20px 64px; }
    h1 { font-size: 28px; margin: 0 0 6px; }
    h2 { font-size: 18px; margin: 32px 0 8px; }
    p { color: #3a4151; margin: 0 0 8px; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { padding: 8px 0; border-bottom: 1px solid rgba(15,22,32,.12); }
    a { color: #c8324a; font-weight: 600; text-decoration: none; }
    a:hover { text-decoration: underline; }
    li span { display: block; font-size: 14px; color: #4a5160; }
  </style>
</head>
<body>
  <main>
    <h1>Fysikksimuleringer på norsk</h1>
    <p>${PAKET_SIDOR.size} interaktive simuleringer fra Fysiklabbet (fysiklabbet.se), oversatt til bokmål. Se LES-MEG.md for hvordan filene henger sammen.</p>
    <h2>Fysikk nivå 1</h2>
    <ul>
${liste(1)}
    </ul>
    <h2>Fysikk nivå 2</h2>
    <ul>
${liste(2)}
    </ul>
  </main>
</body>
</html>
`);
}
// LES-MEG.md (README på norska) kopieras från .claude/i18n/nb/.
{
    const lesMeg = path.join(__dirname, 'delningspaket-LES-MEG.md');
    if (fs.existsSync(lesMeg)) fs.copyFileSync(lesMeg, path.join(UT, 'LES-MEG.md'));
    else console.log('VARNING: delningspaket-LES-MEG.md saknas');
}
// Zip-fil bredvid mappen (Windows: PowerShell Compress-Archive).
if (process.platform === 'win32' && !process.env.INGEN_ZIP) {
    const zip = UT + '.zip';
    try {
        fs.rmSync(zip, { force: true });
        require('child_process').execSync('powershell -NoProfile -Command "Compress-Archive -Path \'' + UT + '\' -DestinationPath \'' + zip + '\'"', { stdio: 'ignore' });
        console.log('Zip: ' + zip);
    } catch (e) { console.log('VARNING: kunde inte zippa: ' + e.message.slice(0, 120)); }
}
fs.writeFileSync(path.join(UT, '..', 'bygglogg.txt'), rapport.join('\n') + '\n\nSaknade filer: ' + (saknas.join(', ') || 'inga') + '\nMappar: ' + [...mappar].join(', ') + '\n');
console.log(PAKET_SIDOR.size + ' simuleringar i ' + UT);
console.log('Delade filer: ' + [...delade].filter(d => !saknas.includes(d)).join(', '));
console.log('Mappar: ' + [...mappar].join(', '));
if (saknas.length) console.log('SAKNAS: ' + saknas.join(', '));
