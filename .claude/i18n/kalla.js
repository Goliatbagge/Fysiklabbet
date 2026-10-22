// .claude/i18n/kalla.js — fingeravtryck av en svensk post, som sparas i dess
// engelska översättning (fältet `kalla`, eller `kalla:` i teorins frontmatter).
// verify-engelska.js räknar om avtrycket ur den svenska posten och larmar när
// det inte längre stämmer: då har svenskan ändrats efter översättningen.
//
//   const { kalla, laddaSvenskt } = require('./kalla.js');
//   kalla(posten)              → 'a1b2c3d4e5' (objekt via JSON, text direkt)
//   laddaSvenskt('ovningar')   → { id: post, … }   (samma nycklar som overlayn)
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROT = path.join(__dirname, '..', '..');

function kalla(x) {
    const s = typeof x === 'string' ? x.replace(/\r\n?/g, '\n') : JSON.stringify(x);
    return crypto.createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 10);
}
function kor(fil, win) {
    win = win || {};
    new Function('window', 'I18N', fs.readFileSync(path.join(ROT, fil), 'utf8'))(win, undefined);
    return win;
}
// De svenska posterna, med samma id som de engelska överläggen använder.
function laddaSvenskt(namn) {
    switch (namn) {
        case 'teori': {
            const dir = path.join(ROT, 'data/teori'), ut = {};
            for (const f of fs.readdirSync(dir)) if (f.endsWith('.md')) ut[f.slice(0, -3)] = fs.readFileSync(path.join(dir, f), 'utf8');
            return ut;
        }
        case 'ovningar': return kor('data/ovningar.js').OVNINGAR;
        case 'exittickets': return kor('data/exittickets.js').EXITTICKETS;
        case 'ovningsblad': return kor('data/ovningsblad.js').OVNINGSBLAD || {};
        case 'nyheter': {
            const ut = {};
            for (const a of kor('data/nyheter.js').NYHETER_ALL) ut[a.id] = a;
            return ut;
        }
        case 'begrepp': {
            const ut = {};
            for (const b of kor('data/begrepp.js').BEGREPP) ut[b.id] = b;
            return ut;
        }
        case 'repetition': {
            const win = { REPETITION: {} };
            for (const f of fs.readdirSync(path.join(ROT, 'data/repetition'))) if (f.endsWith('.js')) kor('data/repetition/' + f, win);
            return win.REPETITION;
        }
        case 'np': {
            const win = { NP_PROV: {}, NP_FIGURER: {} };
            for (const f of fs.readdirSync(path.join(ROT, 'data/np'))) {
                if (!f.endsWith('.js') || /index|figurer|penna/.test(f)) continue;
                try { kor('data/np/' + f, win); } catch (e) { /* prov som kräver webbläsare */ }
            }
            return win.NP_PROV;
        }
        case 'katalog': {
            // Hela KATALOG (inte KATALOG_FLAT, som utelämnar dolda kurser).
            const ut = {}, K = kor('data/katalog.js').KATALOG;
            for (const s in K) for (const c in (K[s].courses || {})) {
                const code = KODER[c];
                if (!code) continue;
                for (const ch in (K[s].courses[c].chapters || {})) {
                    for (const sec of (K[s].courses[c].chapters[ch].sections || [])) {
                        ut[code + '-' + sec.num] = { title: sec.title, description: sec.description };
                    }
                }
            }
            return ut;
        }
    }
    throw new Error('Okänd innehållstyp: ' + namn);
}
const KODER = {
    'Fysik nivå 1': 'fy1', 'Fysik nivå 2': 'fy2',
    'Matematik nivå 1b': 'ma1b', 'Matematik nivå 1c': 'ma1c',
    'Matematik nivå 2b': 'ma2b', 'Matematik nivå 2c': 'ma2c',
    'Matematik fortsättning nivå 1b': 'ma3b', 'Matematik fortsättning nivå 1c': 'ma3c',
    'Matematik fortsättning nivå 2': 'ma4', 'Matematik specialisering': 'maspec'
};
// Läser ett engelskt överlägg (data/en/<namn>.js eller en undermapp) och
// returnerar { id: {kalla, data} }.
function laddaEngelskt(namn) {
    const ut = {};
    const fake = {
        innehall: (n, poster) => Object.assign(ut, poster),
        katalog: (EN) => { for (const id in (EN.avsnitt || {})) ut[id] = { kalla: EN.avsnitt[id].kalla, data: EN.avsnitt[id] }; },
        add() {}, addHtml() {}, svgEtiketter() {}, en: true, lang: 'en', t: s => s,
    };
    const filer = [];
    const p = path.join(ROT, 'data/en', namn + '.js');
    if (fs.existsSync(p)) filer.push(p);
    const d = path.join(ROT, 'data/en', namn);
    if (fs.existsSync(d) && fs.statSync(d).isDirectory()) for (const f of fs.readdirSync(d)) if (f.endsWith('.js')) filer.push(path.join(d, f));
    for (const f of filer) new Function('window', 'I18N', fs.readFileSync(f, 'utf8'))({ I18N: fake }, fake);
    return ut;
}
module.exports = { kalla, laddaSvenskt, laddaEngelskt, KODER, ROT };
