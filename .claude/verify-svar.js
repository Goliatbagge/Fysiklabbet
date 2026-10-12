#!/usr/bin/env node
/*
 * verify-svar.js — varje exempel i teorin ska ha ett tydligt "Svar:".
 *
 * Regeln (uttryckligt krav 2026-10-12): ett `::: exempel` med lösning
 * (`::: textlosning`) ska avslutas med en svarsrad, och har frågan
 * deluppgifter a), b), c) … ska VARJE deluppgift få sitt svar: antingen
 * en egen `**Svar:**` efter deluppgiften eller en gemensam svarsrad med
 * alla bokstäverna (`**Svar:** a) …&emsp;&emsp;b) …`). Felet som utlöste
 * regeln: Exempel 1 i ma1c-3.4 hade tre deluppgifter och inte ett enda
 * "Svar:", bara en tabell och en bisats om behållningen efter 8 år.
 *
 * Undantag: deluppgifter som inte har något svar att ge, alltså bevis och
 * ritningar ("Visa att", "Bevisa", "Härled", "Rita", "Konstruera").
 *
 * UNDANTAG nedan är arvsskulden när verifieraren skrevs. Den ska bara
 * krympa: rättar du ett av exemplen, ta bort det ur listan.
 *
 * Kör: node .claude/verify-svar.js [avsnitts-id …]
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'data', 'teori');

const UNDANTAG = new Set([
    'fy2-1.2:Exempel 1 — Bräda på två bockar (C)',
    'fy2-2.8:Exempel 1 — Två pulser möts på ett snöre',
    'fy2-5.2:Exempel 1 — Avstånd från parallax (C)',
    'fy2-5.3:Exempel — Månens och solens vinkeldiameter (C)',
    'ma1c-4.1:Exempel 1 — Bilverkstaden',
    'ma1c-4.2:Exempel 1 — Tanka mopeden',
    'ma2c-2.1:Exempel 1 — Utveckla med kvadreringsreglerna',
    'ma2c-6.3:Exempel 1 — Släktmiddagen i Geogebra',
    'ma3c-1.4:Exempel 2 — Förkorta uttrycket',
    'ma3c-2.1:Exempel 1 — Sekantens lutning som förändringshastighet',
    'ma3c-2.4:Exempel 2 — Beräkna derivata med Geogebra',
    'ma3c-6.6:Exempel 2 — Bestäm en vinkel med sinussatsen',
    'maspec-4.1:Exempel 3 — Addera grafiskt med båda metoderna',
    'maspec-4.1:Exempel 4 — Multiplar av vektorer',
    'maspec-4.1:Exempel 5 — Subtrahera grafiskt',
]);

const INGET_SVAR = /\b(visa att|bevisa|härled|rita|konstruera)\b/i;
const SVAR = /Svar[^:\n]{0,12}:/g;

const ids = process.argv.slice(2);
const filer = fs.readdirSync(DIR).filter(f => f.endsWith('.md'))
    .filter(f => !ids.length || ids.includes(f.replace(/\.md$/, '')));

const fel = [];
let antal = 0;
for (const f of filer) {
    const id = f.replace(/\.md$/, '');
    const L = fs.readFileSync(path.join(DIR, f), 'utf8').split(/\r?\n/);
    for (let i = 0; i < L.length; i++) {
        if (!/^::: exempel\b/.test(L[i])) continue;
        let d = 0, j = i;
        for (; j < L.length; j++) {
            if (/^:::\s*\S/.test(L[j])) d++;
            else if (/^:::\s*$/.test(L[j]) && --d === 0) break;
        }
        const blk = L.slice(i, j + 1).join('\n');
        if (!blk.includes('::: textlosning')) continue;
        antal++;
        const titel = (L[i].match(/"([^"]*)"/) || [, ''])[1];
        if (UNDANTAG.has(id + ':' + titel)) continue;
        const [stam, los] = blk.split('::: textlosning');

        // deluppgifterna i frågestammen, med texten fram till nästa bokstav
        const delar = [];
        const re = /(?:^|<br>|&emsp;|\s)\(?([a-h])\)(?:&nbsp;|\s)/gm;
        let m, forra = null;
        while ((m = re.exec(stam))) {
            if (forra) forra.text = stam.slice(forra.slut, m.index);
            forra = { bokstav: m[1], slut: re.lastIndex };
            delar.push(forra);
        }
        if (forra) forra.text = stam.slice(forra.slut);
        const svarBehov = delar.length
            ? delar.filter(dl => !INGET_SVAR.test(dl.text)).length
            : (INGET_SVAR.test(stam) ? 0 : 1);
        if (!svarBehov) continue;

        const svarRader = los.split('\n').filter(r => /Svar[^:\n]{0,12}:/.test(r));
        const antalSvar = (los.match(SVAR) || []).length;
        const gemensam = svarRader.some(r => /\bb\)/.test(r));
        if (!antalSvar) fel.push(`${f}:${i + 1}  "${titel}": inget "Svar:" i lösningen`);
        else if (svarBehov >= 2 && antalSvar < svarBehov && !gemensam)
            fel.push(`${f}:${i + 1}  "${titel}": ${svarBehov} deluppgifter men ${antalSvar} svar`);
    }
}

console.log(`Granskade ${antal} exempel med lösning.`);
if (fel.length) {
    console.log('\nFEL: exempel utan tydligt svar på varje deluppgift:\n  ' + fel.join('\n  '));
    console.log('\nSkriv **Svar:** efter varje deluppgift (eller en gemensam svarsrad med a) b) c) …).');
    process.exit(1);
}
console.log('Inga fel.');
