// .claude/i18n/extrahera.js — plockar ut svenska gränssnittssträngar ur sidor
// och skript, som underlag för de engelska ordlistorna i i18n/.
//
//   node .claude/i18n/extrahera.js index.html katalog.html …   → JSON på stdout
//   node .claude/i18n/extrahera.js --saknas index.html          → bara de som
//        varken finns i i18n/en.js eller i sidans i18n/sidor/<sida>.js
//
// Kandidater: textnoder mellan taggar (HTML och JSX), attributen
// title/placeholder/aria-label/alt, <title> och meta-beskrivningar samt
// strängliteraler i JS som ser ut som svensk text (versal början eller
// å/ä/ö, minst ett mellanslag eller ett svenskt tecken). Brus filtreras grovt;
// en översatt sträng som aldrig visas gör ingen skada.
'use strict';
const fs = require('fs');
const path = require('path');
const ROT = path.join(__dirname, '..', '..');

const args = process.argv.slice(2);
const SAKNAS = args.includes('--saknas');
const filer = args.filter(a => !a.startsWith('--'));

function laddaDict(fil) {
    const p = path.join(ROT, fil);
    if (!fs.existsSync(p)) return {};
    const fake = { I18N: { add: o => Object.assign(acc, o), addHtml() {} } };
    const acc = {};
    new Function('window', 'I18N', fs.readFileSync(p, 'utf8'))(fake, fake.I18N);
    return acc;
}
const norm = s => s.replace(/\s+/g, ' ').trim();

const SV = /[åäöÅÄÖ]/;
const ORD = /[A-Za-zÅÄÖåäö]{2,}/;
function rimlig(s) {
    s = norm(s);
    if (s.length < 2 || s.length > 600) return false;
    if (!ORD.test(s)) return false;
    if (/^[\w.-]+\.(html|js|css|png|svg|jpg|json|md)$/i.test(s)) return false;
    if (/^(https?:|mailto:|#|\.\/|\/)/.test(s)) return false;
    if (/^[a-z][\w-]*$/.test(s) && !SV.test(s)) return false;        // klassnamn, nycklar
    if (/^[\w-]+(\s+[\w-]+)*$/.test(s) && /(^|\s)(lab|st|fs|ms|hk|np|sec|flex|grid|text|bg|px|py|mt|mb|w|h)-/.test(s)) return false;
    if (/[{};=]|=>|\)\s*\{|function\s*\(/.test(s)) return false;          // kod
    if (/^[\d\s.,:;%+\-−·×/()°]+$/.test(s)) return false;                // bara tal
    if (/\$/.test(s)) return false;                                      // KaTeX
    return true;
}

function extrahera(src, arJs) {
    const ut = new Set();
    let s = src;
    if (!arJs) {
        s = s.replace(/<!--[\s\S]*?-->/g, '');
        // <title> och meta
        for (const m of s.matchAll(/<title>([^<]+)<\/title>/g)) ut.add(norm(m[1]));
        for (const m of s.matchAll(/<meta\s+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"\s+content="([^"]+)"/g)) ut.add(norm(m[1]));
    }
    // Textnoder mellan taggar (HTML/JSX). Hoppa över <style> och JS utanför JSX
    // genom att bara ta text som inte innehåller kodtecken.
    const utanStil = s.replace(/<style[\s\S]*?<\/style>/g, '');
    for (const m of utanStil.matchAll(/>([^<>{}]+)</g)) {
        const t = m[1];
        if (rimlig(t)) ut.add(norm(t));
    }
    // JSX-text intill {uttryck}: "Visa {n} st" ger delarna "Visa" och "st".
    for (const m of utanStil.matchAll(/(?:>|\})([^<>{}]+)(?:\{|<)/g)) {
        const t = m[1];
        if (rimlig(t) && (SV.test(t) || /^[A-ZÅÄÖ]/.test(norm(t)))) ut.add(norm(t));
    }
    // Attribut
    for (const m of s.matchAll(/\b(?:title|placeholder|aria-label|alt|label)=["']([^"']+)["']/g)) {
        if (rimlig(m[1])) ut.add(norm(m[1]));
    }
    for (const m of s.matchAll(/\b(?:title|placeholder|aria-label|alt|label)=\{\s*["'`]([^"'`]+)["'`]\s*\}/g)) {
        if (rimlig(m[1])) ut.add(norm(m[1]));
    }
    // Strängliteraler i skriptdelar
    const skript = arJs ? s : [...s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
    const utanKommentar = skript.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\'"])\/\/[^\n]*/g, '$1');
    for (const m of utanKommentar.matchAll(/(['"`])((?:\\.|(?!\1)[^\\\n])*?)\1/g)) {
        const t = m[2].replace(/\\(['"`\\])/g, '$1').replace(/\\u00a0|\\u00A0/g, ' ');
        if (m[1] === '`' && /\$\{/.test(t)) {
            for (const del of t.split(/\$\{[^}]*\}/)) if (rimlig(del) && SV.test(del)) ut.add(norm(del));
            continue;
        }
        if (!rimlig(t)) continue;
        if (!(SV.test(t) || (/^[A-ZÅÄÖ]/.test(t) && /\s/.test(t)))) continue;
        if (/<[a-z]/i.test(t) && !/^[^<]*$/.test(t)) {
            // HTML-sträng: ta textdelarna
            for (const mm of t.matchAll(/>([^<>]+)</g)) if (rimlig(mm[1])) ut.add(norm(mm[1]));
            const forst = t.split('<')[0];
            if (rimlig(forst)) ut.add(norm(forst));
            continue;
        }
        ut.add(norm(t));
    }
    return [...ut];
}

const gemensam = SAKNAS ? laddaDict('i18n/en.js') : {};
const resultat = {};
for (const f of filer) {
    const src = fs.readFileSync(path.join(ROT, f), 'utf8');
    let lista = extrahera(src, f.endsWith('.js'));
    if (SAKNAS) {
        const sida = path.basename(f).replace(/\.(html|js)$/, '');
        const egen = laddaDict('i18n/sidor/' + sida + '.js');
        lista = lista.filter(s => gemensam[s] == null && egen[s] == null);
    }
    resultat[f] = lista;
}
process.stdout.write(JSON.stringify(resultat, null, 1) + '\n');
