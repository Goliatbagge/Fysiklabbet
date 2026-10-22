// .claude/i18n/handskrift-strangar.js — samlar ALL text som pennlösningarna
// skriver på papperet, scen för scen. Bygger varje scen i Node (samma stubb
// som verify-handskrift.js) med en låtsad engelsk I18N vars t() registrerar
// varje sträng som passerar tillBmp. Därmed får man exakt de nycklar som
// ordlistan data/en/handskrift*.js behöver.
//
//   node .claude/i18n/handskrift-strangar.js                → JSON {grupp: {scen: [strängar]}}
//   node .claude/i18n/handskrift-strangar.js --saknas       → bara strängar utan översättning
//   node .claude/i18n/handskrift-strangar.js --grupp ma1c   → bara scener i teorin för ma1c
//
// Grupp = var scenen används: teori-avsnittets kurs (fy1, ma2c …), "np-<prov>"
// eller "ov-<avsnitt>". Strängar som bara består av tal, tecken och
// enbokstavsvariabler (inget att översätta) räknas inte.
'use strict';
const fs = require('fs'), path = require('path');
const ROT = path.join(__dirname, '..', '..');
const args = process.argv.slice(2);
const SAKNAS = args.includes('--saknas');
const GRUPP = args.includes('--grupp') ? args[args.indexOf('--grupp') + 1] : null;

let fangade = null;
const dict = {};
const I18N = {
    en: true, lang: 'en',
    t: (s) => { if (fangade) fangade.add(s); return s; },
    tal: (s) => s,
    add: (o) => { for (const k in o) dict[k.replace(/\s+/g, ' ').trim()] = o[k]; }, addHtml() {}, overlay() {}, innehall() {},
};
const noop = () => {};
const win = { I18N, addEventListener: noop, requestAnimationFrame: noop,
    matchMedia: () => ({ matches: false, addEventListener: noop }) };
const doc = { addEventListener: noop, getElementById: () => null,
    createElement: () => ({ setAttribute: noop, appendChild: noop, style: {} }),
    createElementNS: () => ({ setAttribute: noop, appendChild: noop, style: {} }),
    head: { appendChild: noop } };
function kor(f) { new Function('window', 'document', 'requestAnimationFrame', 'I18N', fs.readFileSync(f, 'utf8'))(win, doc, noop, I18N); }
kor(path.join(ROT, 'handskrift.js'));
const grupper = {};
const ovDir = path.join(ROT, 'data/ovningar-penna'), npDir = path.join(ROT, 'data/np');
const extra = [];
for (const f of fs.readdirSync(npDir)) if (f.endsWith('-penna.js')) extra.push(path.join(npDir, f));
if (fs.existsSync(ovDir)) for (const f of fs.readdirSync(ovDir)) if (f.endsWith('.js')) extra.push(path.join(ovDir, f));
const fore = new Set(win.HANDSKRIFT.typer());
for (const f of extra) kor(f);
// Befintliga engelska ordlistor (för --saknas)
const enDir = path.join(ROT, 'data/en');
if (fs.existsSync(enDir)) for (const f of fs.readdirSync(enDir)) if (/^handskrift.*\.js$/.test(f)) kor(path.join(enDir, f));
const enHk = path.join(enDir, 'handskrift');
if (fs.existsSync(enHk)) for (const f of fs.readdirSync(enHk)) if (f.endsWith('.js')) kor(path.join(enHk, f));

// Var används teoriscenerna?
const anvands = {};
for (const f of fs.readdirSync(path.join(ROT, 'data/teori'))) {
    if (!f.endsWith('.md')) continue;
    const txt = fs.readFileSync(path.join(ROT, 'data/teori', f), 'utf8');
    for (const m of txt.matchAll(/^:::\s*handskrift\s*\n\s*typ:\s*(\S+)/gm)) (anvands[m[1]] = anvands[m[1]] || []).push(f.replace(/\.md$/, ''));
}
function grupp(typ) {
    let m;
    if ((m = /^ov-(.+)-u\d+$/.exec(typ))) return 'ov-' + m[1];
    if ((m = /^((?:fy|ma)[\w]*-(?:vt|ht)\d{4})-/.exec(typ))) return 'np-' + m[1];
    const a = anvands[typ];
    if (a && a.length) return a[0].split('-')[0];
    return fore.has(typ) ? 'oanvand' : 'ovrigt';
}
const TRIVIAL = /^[\s\d.,:;=+\-−·×÷/()\[\]{}^_√±≈<>≤≥%°'′″|!?∫∞πΔΣαβγθλμωρσφ⟺⟹→⇒↶↷↺↻…]*([A-Za-zα-ω](?![A-Za-z]))?[\s\d.,:;=+\-−·×÷/()\[\]{}^_√±≈<>≤≥%°'′″|!?∫∞πΔ]*$/;
const MATTE = /^[^A-Za-zÅÄÖåäö]*([A-Za-z]{1,2}[_^]?[\w]?[^A-Za-zÅÄÖåäö]*)*$/;
function intressant(s) {
    if (TRIVIAL.test(s)) return false;
    if (!/[A-Za-zÅÄÖåäö]{2,}/.test(s.replace(/\b(sin|cos|tan|lg|ln|log|lim|max|min|kg|km|cm|mm|m\/s|N|Nm|J|W|Pa|kPa|Hz|rad|mol)\b/g, ''))) return false;
    return true;
}
const ut = {};
for (const typ of win.HANDSKRIFT.typer()) {
    const g = grupp(typ);
    if (GRUPP && g !== GRUPP) continue;
    fangade = new Set();
    for (const cfg of [{}, { vagg: true }]) {
        try { win.HANDSKRIFT.scen(typ, undefined, cfg); } catch (e) { /* scen som kräver mer */ }
    }
    let lista = [...fangade].filter(intressant);
    fangade = null;
    if (SAKNAS) lista = lista.filter(s => dict[s.replace(/\s+/g, ' ').trim()] == null);
    if (!lista.length) continue;
    (ut[g] = ut[g] || {})[typ] = lista;
}
process.stdout.write(JSON.stringify(ut, null, 1) + '\n');
