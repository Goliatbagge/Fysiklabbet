/**
 * verify-analytics.js — har varje sida Cloudflares mättagg?
 *
 * Besöksstatistiken bygger på en JS-tagg som måste ligga i VARJE sida som
 * besökaren kan landa på. Saknas den på en sida ser ingenting trasigt ut:
 * sidan fungerar precis som vanligt, den bara försvinner ur statistiken,
 * och det märks först när man undrar varför ett avsnitt aldrig läses.
 *
 * Skriptet kontrollerar för varje HTML-fil i projektroten:
 *   1. att taggen finns,
 *   2. att den bär RÄTT token (en felkopierad token mäter till ingenstans),
 *   3. att den ligger före </body>, där Cloudflare vill ha den.
 *
 * Undantag: google<token>.html (ägarverifiering, saknar <body> med flit)
 * samt delningssidorna under nyheter/dela/ och katalog/dela/, som bara är
 * vidarebefordringar — besökaren räknas på den riktiga sidan i stället.
 *
 * Användning: node .claude/verify-analytics.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKEN = '366677ecfe014a76b73f5bc78a489e0e';
const UNDANTAG = new Set(['google23ed164365ae9e8f.html']);

const filer = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html') && !UNDANTAG.has(f))
    .sort();

const fel = [];
let ok = 0;

for (const fil of filer) {
    const text = fs.readFileSync(path.join(ROOT, fil), 'utf8');
    const harTagg = text.includes('static.cloudflareinsights.com/beacon.min.js');

    if (!harTagg) {
        fel.push(`${fil}: saknar mättaggen. Klistra in den före </body>:\n` +
                 `      <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"\n` +
                 `              data-cf-beacon='{"token": "${TOKEN}"}'></script>`);
        continue;
    }
    if (!text.includes(TOKEN)) {
        fel.push(`${fil}: mättaggen har fel token (ska vara ${TOKEN}).`);
        continue;
    }
    const taggPos = text.lastIndexOf('static.cloudflareinsights.com');
    const bodyPos = text.lastIndexOf('</body>');
    if (bodyPos !== -1 && taggPos > bodyPos) {
        fel.push(`${fil}: mättaggen ligger EFTER </body>.`);
        continue;
    }
    ok++;
}

console.log(`Granskade ${filer.length} sidor.`);
if (fel.length) {
    console.log('');
    fel.forEach(f => console.log(`  ❌ ${f}`));
    console.log(`\n❌ ${fel.length} sida/sidor saknar korrekt mättagg.`);
    process.exit(1);
}
console.log(`✅ ALLA ${ok} SIDOR HAR CLOUDFLARES MÄTTAGG!`);
