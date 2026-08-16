#!/usr/bin/env node
/*
 * verify-sitemap.js — kontrollerar att feed.xml, sitemap.xml och
 * delningssidorna är i takt med data/nyheter.js och data/begrepp.js.
 *
 * VARFÖR
 * Nyhetsagenten ska köra `node data/build-nyheter-og.js` (steg 8) varje gång
 * den publicerar. Gör den inte det — eller committar den bara en del av
 * resultatet — blir följden tyst: artikeln syns på sajten, men saknas i
 * RSS-flödet och i sitemapen, och Google får aldrig veta att den finns.
 * Ingenting kraschar, ingenting ser fel ut. Därför behövs en kontroll som
 * INTE är beroende av att agenten själv kommer ihåg att göra rätt.
 *
 * HUR
 * Skriptet importerar byggskriptets egna funktioner, bygger om vad filerna
 * BORDE innehålla, och jämför med det som faktiskt ligger på disk. Samma
 * logik på båda sidor = kontrollen kan inte glida isär från bygget.
 * `lastBuildDate` i RSS-flödet ignoreras (den är en tidsstämpel och skiljer
 * sig alltid).
 *
 * KÖRNING
 *   node .claude/verify-sitemap.js
 * Körs dessutom automatiskt av .github/workflows/verifiera-sitemap.yml vid
 * varje push till main — det är det egentliga skyddsnätet.
 *
 * Avslutar med kod 1 om något är fel (så att CI failar).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const B = require('../data/build-nyheter-og.js');

const fel = [];
const varning = [];

function las(fil) {
  const p = path.join(B.ROOT, fil);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

// Normaliserar bort skillnader som inte är innehåll:
//  · CRLF vs LF — git checkar ut med CRLF på Windows medan byggskriptet
//    skriver LF, så en ojämförd fil ser "ändrad" ut på Windows men inte på
//    Linux. Utan detta ger verifieraren olika svar beroende på plattform.
//  · <lastBuildDate> — tidsstämpel för när bygget kördes, ändras varje gång.
function normalisera(xml) {
  return String(xml)
    .replace(/\r\n/g, '\n')
    .replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, '<lastBuildDate/>');
}

// ── Underlaget ────────────────────────────────────────────────────────────
let artiklar;
try {
  artiklar = B.loadArticles();
} catch (e) {
  console.error('❌ Kunde inte läsa data/nyheter.js:', e.message);
  process.exit(1);
}
const publicerade = B.publishedOnly(artiklar);

// ── 1. Är feed.xml aktuell? ───────────────────────────────────────────────
const feedPaDisk = las('feed.xml');
if (feedPaDisk === null) {
  fel.push('feed.xml saknas helt. Kör: node data/build-nyheter-og.js');
} else if (normalisera(feedPaDisk) !== normalisera(B.buildFeed(publicerade))) {
  const iFlodet = new Set([...feedPaDisk.matchAll(/<link>[^<]*\?id=([^<]*)<\/link>/g)]
    .map((m) => decodeURIComponent(m[1])));
  const saknas = publicerade.slice(0, B.FEED_MAX).filter((a) => !iFlodet.has(a.id));
  fel.push('feed.xml är inaktuell — innehållet matchar inte data/nyheter.js.' +
    (saknas.length
      ? `\n   Saknas i flödet: ${saknas.map((a) => a.id).join(', ')}`
      : '\n   (samma artiklar, men rubrik/ingress/bild har ändrats sedan bygget)') +
    '\n   Kör: node data/build-nyheter-og.js');
}

// ── 2. Är sitemap.xml aktuell? ────────────────────────────────────────────
const sitemapPaDisk = las('sitemap.xml');
if (sitemapPaDisk === null) {
  fel.push('sitemap.xml saknas helt. Kör: node data/build-nyheter-og.js');
} else {
  const forvantad = B.buildSitemap(publicerade);
  if (normalisera(sitemapPaDisk) !== normalisera(forvantad)) {
    const pa = (xml) => new Set([...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]));
    const harNu = pa(sitemapPaDisk);
    const borde = pa(forvantad);
    const saknas = [...borde].filter((u) => !harNu.has(u));
    const overflodiga = [...harNu].filter((u) => !borde.has(u));
    fel.push('sitemap.xml är inaktuell.' +
      (saknas.length ? `\n   Saknas (${saknas.length}): ${saknas.slice(0, 8).join('\n             ')}` +
        (saknas.length > 8 ? `\n             … och ${saknas.length - 8} till` : '') : '') +
      (overflodiga.length ? `\n   Ligger kvar men borde bort (${overflodiga.length}): ` +
        overflodiga.slice(0, 8).join('\n             ') : '') +
      '\n   Kör: node data/build-nyheter-og.js');
  }
}

// ── 3. Har varje publicerad artikel sin delningssida? ─────────────────────
// Delningssidorna byggs för ALLA artiklar (även framtida), men det är bara
// de publicerade som redan delas — de måste finnas.
const utanDelning = publicerade.filter(
  (a) => !fs.existsSync(path.join(B.OUT_DIR, `${a.id}.html`)));
if (utanDelning.length) {
  fel.push(`${utanDelning.length} publicerad(e) artiklar saknar delningssida i ` +
    `nyheter/dela/:\n   ${utanDelning.map((a) => a.id).join('\n   ')}` +
    '\n   Kör: node data/build-nyheter-og.js');
}

// ── 3b. Har varje teoriavsnitt sin delningssida? ──────────────────────────
// Utan den visar en delad avsnittslänk samma generiska kort för alla 333
// avsnitt — och delningsknappen i katalog.html pekar på en 404.
const avsnittUtanDela = B.loadAvsnittData().filter(
  (a) => !fs.existsSync(path.join(B.AVSNITT_DELA_DIR, `${a.id}.html`)));
if (avsnittUtanDela.length) {
  fel.push(`${avsnittUtanDela.length} teoriavsnitt saknar delningssida i katalog/dela/:` +
    `\n   ${avsnittUtanDela.slice(0, 8).map((a) => a.id).join('\n   ')}` +
    '\n   Kör: node data/build-nyheter-og.js');
}

// ── 3c. Är kurskoderna samma på båda sidor? ───────────────────────────────
// Delningsknappen i katalog.html bygger sin URL ur HASH_COURSES; filerna i
// katalog/dela/ genereras ur KURSKOD i byggskriptet. Två listor över samma
// sak — glider de isär pekar en hel kurs delningslänkar på 404 utan att
// något annat ser fel ut.
const katalogHtml = las('katalog.html');
if (katalogHtml) {
  const block = katalogHtml.match(/const HASH_COURSES = \{([\s\S]*?)\};/);
  if (!block) {
    varning.push('Hittade inte HASH_COURSES i katalog.html — kan inte kontrollera ' +
      'att kurskoderna stämmer med byggskriptets KURSKOD.');
  } else {
    const iSidan = new Map();
    for (const m of block[1].matchAll(/(\w+):\s*\[[^,]+,\s*'([^']+)'\]/g)) {
      iSidan.set(m[2], m[1]);           // kursnamn → kod
    }
    const iBygget = new Map();
    for (const id of B.loadAvsnitt()) iBygget.set(id.split('-')[0], true);
    const saknas = [...iSidan.entries()].filter(([, kod]) => !iBygget.has(kod));
    if (saknas.length) {
      varning.push('Kurser i katalog.htmls HASH_COURSES som inte gav några avsnitt i ' +
        `bygget: ${saknas.map(([namn, kod]) => `${kod} (${namn})`).join(', ')}. ` +
        'Kontrollera att KURSKOD i data/build-nyheter-og.js har exakt samma kursnamn.');
    }
  }
}

// ── 3d. Har simuleringssidorna sidspecifika og:-taggar? ───────────────────
// Utan og:title/og:description visar en delad simulering samma generiska
// Fysiklabbet-kort som alla andra, och Googles sökresultat får ingen
// beskrivningstext. Nya simuleringar missar detta tyst — därför kontrollen.
// (Sidorna som medvetet hålls utanför sitemapen kontrolleras inte.)
if (sitemapPaDisk) {
  const iSitemap = new Set([...sitemapPaDisk.matchAll(/<loc>[^<]*?\/([^/<?]+\.html)<\/loc>/g)]
    .map((m) => m[1]));
  const utanOg = fs.readdirSync(B.ROOT)
    .filter((f) => /^fysik[12].*\.html$/.test(f))
    .filter((f) => f !== 'fysik1.html' && f !== 'fysik2.html')
    .filter((f) => iSitemap.has(f))
    .filter((f) => !/og:title/.test(fs.readFileSync(path.join(B.ROOT, f), 'utf8')));
  if (utanOg.length) {
    fel.push(`${utanOg.length} simuleringssida(or) saknar og:title/og:description ` +
      `och visar därför ett generiskt delningskort:\n   ${utanOg.slice(0, 8).join('\n   ')}` +
      '\n   Lägg in dem i <head> (se en befintlig simulering som mall).');
  }
}

// ── 4. Pekar sitemapen på filer som faktiskt finns? ───────────────────────
// Fångar sidor som döpts om eller tagits bort utan att sitemapen byggts om.
if (sitemapPaDisk) {
  const doda = [];
  for (const m of sitemapPaDisk.matchAll(/<loc>([^<]*)<\/loc>/g)) {
    const url = m[1];
    if (!url.startsWith(B.SITE_ORIGIN)) { doda.push(`${url} (fel domän)`); continue; }
    let stig = url.slice(B.SITE_ORIGIN.length).split('?')[0];
    if (stig === '/' || stig === '') stig = '/index.html';
    if (!fs.existsSync(path.join(B.ROOT, stig.replace(/^\//, '')))) doda.push(url);
  }
  if (doda.length) {
    fel.push(`${doda.length} adress(er) i sitemap.xml pekar på filer som inte finns:` +
      `\n   ${doda.slice(0, 8).join('\n   ')}`);
  }
}

// ── 4b. Löser avsnittsadresserna faktiskt ut? ─────────────────────────────
// Det farligaste felläget: byter någon kursnamnet i data/katalog.js slutar
// KURSKOD matcha, och alla 333 avsnittsadresser hamnar utanför sitemapen —
// eller värre, en adress som INTE matchar katalogens regexp faller tyst
// tillbaka till standardsidan, så Google indexerar hundratals identiska
// sidor. Regexpen nedan är kopierad ur katalog.htmls parseInitialState() och
// måste hållas i takt med den.
const KATALOG_RE = /^(fy1|fy2|ma1b|ma1c|ma2c|ma3c|ma4)(?:-(\d+)(?:\.(\d+|S|E))?)?(?::(teori|ovningar|exitticket|visualisering|fordjupning))?$/;
const avsnitt = B.loadAvsnitt();
if (!avsnitt.length) {
  fel.push('Inga teoriavsnitt hittades i data/katalog.js — har kursnamnen ändrats? ' +
    'KURSKOD i data/build-nyheter-og.js måste matcha `course`-fältet exakt.');
} else {
  const trasiga = avsnitt.filter((id) => !KATALOG_RE.test(id));
  if (trasiga.length) {
    fel.push(`${trasiga.length} avsnittsadress(er) matchar inte katalogens routing och ` +
      `skulle visa standardsidan i stället:\n   ${trasiga.slice(0, 8).join('\n   ')}`);
  }
  const sedda = new Set();
  const dubbletter = avsnitt.filter((id) => sedda.size === sedda.add(id).size);
  if (dubbletter.length) {
    fel.push(`${dubbletter.length} avsnittsadress(er) förekommer flera gånger: ` +
      `${[...new Set(dubbletter)].slice(0, 8).join(', ')}`);
  }
}

// ── 5. Är XML:en välformad? ───────────────────────────────────────────────
// Ett oescapat & i en rubrik räcker för att Google ska avvisa hela filen.
for (const fil of ['feed.xml', 'sitemap.xml']) {
  const xml = las(fil);
  if (!xml) continue;
  const oescapade = xml.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g);
  if (oescapade) {
    fel.push(`${fil} innehåller ${oescapade.length} oescapat/oescapade &-tecken — ` +
      'Google avvisar hela filen. Kontrollera esc() i byggskriptet.');
  }
}

// ── 6. Varning: nyaste artikeln är inte överst i flödet ───────────────────
if (feedPaDisk && publicerade.length) {
  const forsta = feedPaDisk.match(/<link>[^<]*\?id=([^<]*)<\/link>/);
  if (forsta && decodeURIComponent(forsta[1]) !== publicerade[0].id) {
    varning.push('Nyaste artikeln ligger inte överst i feed.xml — kontrollera ' +
      'att data/nyheter.js är sorterad med nyast först.');
  }
}

// ── Rapport ───────────────────────────────────────────────────────────────
console.log('Kontroll av feed.xml, sitemap.xml och delningssidor');
console.log('='.repeat(60));
console.log(`Artiklar i data/nyheter.js : ${artiklar.length} (${publicerade.length} publicerade)`);
console.log(`Begrepp i data/begrepp.js  : ${B.loadBegrepp().length}`);
console.log(`Teoriavsnitt (katalog.js)  : ${B.loadAvsnitt().length}`);
console.log(`Nationella prov            : ${B.loadProv().length}`);
console.log(`Repetitionspaket           : ${B.loadRepetition().length}`);
if (sitemapPaDisk) {
  console.log(`Adresser i sitemap.xml     : ${(sitemapPaDisk.match(/<loc>/g) || []).length}`);
}
if (feedPaDisk) {
  console.log(`Artiklar i feed.xml        : ${(feedPaDisk.match(/<item>/g) || []).length}`);
}
console.log('='.repeat(60));

for (const v of varning) console.log(`⚠️  ${v}`);

if (fel.length) {
  console.log('');
  for (const f of fel) console.log(`❌ ${f}`);
  console.log(`\n${fel.length} fel. Sajtens nya innehåll når inte Google förrän detta är fixat.`);
  process.exit(1);
}

console.log('✅ Allt i takt — RSS-flödet, sitemapen och delningssidorna är aktuella.');
