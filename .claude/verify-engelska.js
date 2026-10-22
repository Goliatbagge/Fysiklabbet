// .claude/verify-engelska.js — håller den engelska versionen i takt med den svenska.
//
//   node .claude/verify-engelska.js            → sammanställning + fel
//   node .claude/verify-engelska.js --saknas   → lista även varje post som saknar översättning
//   node .claude/verify-engelska.js ovningar   → bara en innehållstyp
//
// För varje innehållstyp jämförs de svenska posterna med de engelska
// överläggen i data/en/ (teorin: data/teori/en/*.md):
//   INAKTUELL — översättningen finns men svenskan har ändrats efteråt
//               (fingeravtrycket `kalla` stämmer inte). FEL: rätta den
//               engelska posten i samma arbetspass och uppdatera `kalla`.
//   SAKNAS    — ingen översättning. Varning så länge typen inte är klar;
//               FEL för typer i KOMPLETT (där allt en gång översatts, så att
//               en ny svensk post utan engelska syns direkt).
//   FÖRÄLDRAD — engelsk post vars svenska post inte längre finns.
//
// Se avsnittet "Engelska" i CLAUDE.md och .claude/i18n/RIKTLINJER.md.
'use strict';
const fs = require('fs'), path = require('path');
const { kalla, laddaSvenskt, laddaEngelskt, ROT } = require('./i18n/kalla.js');

// Typer där översättningen är komplett — en saknad post är då ett fel.
// Lägg till en typ här när den har översatts helt.
const KOMPLETT = ['katalog', 'teori', 'exittickets'];

// Härledda kurser vars avsnitt delas med en källa (data/katalog.js) har ingen
// egen post — de räknas som översatta när källan är det.
const TYPER = ['teori', 'katalog', 'ovningar', 'exittickets', 'nyheter', 'begrepp', 'np', 'repetition'];

const args = process.argv.slice(2);
const VISA_SAKNADE = args.includes('--saknas');
const valda = args.filter(a => !a.startsWith('--'));

function laddaTeoriEn() {
    const dir = path.join(ROT, 'data/teori/en'), ut = {};
    if (!fs.existsSync(dir)) return ut;
    for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith('.md')) continue;
        const src = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n?/g, '\n');
        const fm = /^---\n([\s\S]*?)\n---/.exec(src);
        const m = fm && /(?:^|\n)kalla:\s*['"]?([0-9a-f]+)['"]?/.exec(fm[1]);
        ut[f.slice(0, -3)] = { kalla: m ? m[1] : null };
    }
    return ut;
}

let fel = 0;
for (const typ of (valda.length ? valda : TYPER)) {
    const sv = laddaSvenskt(typ);
    const en = typ === 'teori' ? laddaTeoriEn() : laddaEngelskt(typ);
    const alias = typ === 'katalog' ? aliasKarta() : {};
    const inaktuella = [], saknade = [], foraldrade = [];
    let ok = 0;
    for (const id in sv) {
        let e = en[id];
        let kallId = id;
        if (!e && alias[id]) { kallId = alias[id]; e = en[kallId]; }
        if (!e) { if (!alias[id] || !sv[alias[id]]) saknade.push(id); else saknade.push(id); continue; }
        if (!e.kalla) { inaktuella.push(id + ' (saknar kalla)'); continue; }
        if (e.kalla !== kalla(sv[kallId])) inaktuella.push(id);
        else ok++;
    }
    for (const id in en) if (!(id in sv)) foraldrade.push(id);
    // Härledda poster vars källa är översatt räknas inte som saknade.
    const verkligtSaknade = saknade.filter(id => !(alias[id] && en[alias[id]]));
    const komplett = KOMPLETT.includes(typ);
    const total = Object.keys(sv).length;
    console.log(`${typ.padEnd(12)} ${String(ok).padStart(4)}/${total} översatta` +
        (inaktuella.length ? `, ${inaktuella.length} INAKTUELLA` : '') +
        (verkligtSaknade.length ? `, ${verkligtSaknade.length} saknas` : '') +
        (foraldrade.length ? `, ${foraldrade.length} föräldrade` : ''));
    for (const id of inaktuella) console.log('   INAKTUELL  ' + id);
    for (const id of foraldrade) console.log('   FÖRÄLDRAD  ' + id);
    if (VISA_SAKNADE || komplett) for (const id of verkligtSaknade) console.log('   SAKNAS     ' + id);
    fel += inaktuella.length + foraldrade.length + (komplett ? verkligtSaknade.length : 0);
}

function aliasKarta() {
    const win = {};
    new Function('window', 'I18N', fs.readFileSync(path.join(ROT, 'data/katalog.js'), 'utf8'))(win, undefined);
    return Object.assign({}, win.MA1B_ALIAS, win.MA2B_ALIAS, win.MA3B_ALIAS, win.FY1_ALIAS);
}

if (fel) {
    console.log(`\n${fel} fel. En svensk ändring ska följas av samma ändring i den engelska`);
    console.log('posten i samma arbetspass (se "Engelska" i CLAUDE.md).');
    process.exit(1);
}
console.log('\nInga inaktuella översättningar.');
