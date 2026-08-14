#!/usr/bin/env node
/*
 * build-nyheter-og.js — genererar per-artikel-OG-sidor för delning.
 *
 * BAKGRUND
 * Nyhetssidan (nyheter.html) är en klientsidan-renderad React-app: samma
 * HTML-fil visar alla artiklar och väljer rätt via ?id=. Delningstjänster
 * (Facebook, X, LinkedIn, Messenger, WhatsApp, Slack, iMessage …) kör INTE
 * JavaScript — deras robot läser bara den råa HTML:en och plockar
 * förhandsvisningens bild/rubrik/beskrivning ur <meta property="og:*">.
 * Därför ser roboten alltid samma generiska taggar oavsett vilken artikel
 * som delas.
 *
 * LÖSNING
 * För varje artikel skrivs en riktig liten HTML-fil till nyheter/dela/<id>.html
 * med artikelns EGNA og:*-taggar inbakade i <head>. En människa som klickar
 * omdirigeras omedelbart vidare till den riktiga artikeln
 * (/nyheter.html?id=<id>); en robot läser OG-taggarna och bygger ett korrekt
 * förhandsvisningskort. Delningsknapparna i nyheter.html pekar på dessa filer.
 *
 * DESSUTOM genererar skriptet:
 *   feed.xml    — RSS 2.0-flöde med de senaste PUBLICERADE artiklarna
 *                 (datumgrindade framtida artiklar hålls utanför tills
 *                 skriptet körs igen efter deras datum — de dagliga
 *                 körningarna sköter det).
 *   sitemap.xml — alla publika sidor + varje publicerad artikels
 *                 kanoniska URL (nyheter.html?id=…), för sökmotorer.
 *                 robots.txt (statisk, i repo-roten) pekar hit.
 *
 * KÖRNING
 *   node data/build-nyheter-og.js
 * Kör detta efter varje ändring i data/nyheter.js (ny artikel, ändrad
 * rubrik/ingress/bild). Genererar OG-sidor för ALLA artiklar, inkl. framtida
 * (datumgrindade) — så att delningssidan finns redo när artikeln aktiveras.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_ORIGIN = 'https://fysiklabbet.se';
const OUT_DIR = path.join(ROOT, 'nyheter', 'dela');

// ── Läs artikeldata ur data/nyheter.js ──────────────────────────────────
// Filen sätter window.NYHETER_ALL i en IIFE. Vi kör den i en Function-scope
// med ett attrapp-window och plockar ut hela listan (inkl. framtida artiklar).
function loadArticles() {
  const code = fs.readFileSync(path.join(ROOT, 'data', 'nyheter.js'), 'utf8');
  const win = {};
  // eslint-disable-next-line no-new-func
  new Function('window', code)(win);
  const all = win.NYHETER_ALL;
  if (!Array.isArray(all)) throw new Error('Kunde inte läsa window.NYHETER_ALL ur data/nyheter.js');
  return all;
}

// ── Textbearbetning ──────────────────────────────────────────────────────
// Escape för HTML-attributvärde (content="…").
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Gör en ingress med inline-HTML/entiteter till ren text för og:description.
function toPlain(s) {
  return String(s)
    .replace(/<[^>]+>/g, '')          // ta bort ev. taggar
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// ── HTML-mall för en delningssida ─────────────────────────────────────────
function pageHtml(a) {
  const shareUrl = `${SITE_ORIGIN}/nyheter/dela/${a.id}.html`;      // sidans egen URL
  const articlePath = `/nyheter.html?id=${encodeURIComponent(a.id)}`; // dit människor skickas
  const articleUrl = `${SITE_ORIGIN}${articlePath}`;
  const imageUrl = a.image ? `${SITE_ORIGIN}/${String(a.image).replace(/^\/+/, '')}` : '';

  const title = esc(a.title);
  const desc = esc(toPlain(a.deck || a.title));
  const imgAlt = esc(a.imageAlt || a.title);

  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Fysiklabbet</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${articleUrl}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Open Graph (Facebook, LinkedIn, Messenger, WhatsApp, Slack, iMessage …) -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Fysiklabbet">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${shareUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:alt" content="${imgAlt}">
    <meta property="article:published_time" content="${esc(a.date)}">

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">

    <!-- Skicka människor vidare till den riktiga artikeln direkt. -->
    <meta http-equiv="refresh" content="0; url=${articlePath}">
    <script>location.replace(${JSON.stringify(articlePath)});</script>
    <style>
        html, body { margin: 0; height: 100%; }
        body {
            background: #f7f2e8;
            color: #1a1712;
            font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
            display: flex; align-items: center; justify-content: center;
            text-align: center; padding: 24px;
        }
        a { color: #b23a2e; }
    </style>
</head>
<body>
    <p>Öppnar artikeln … <a href="${articlePath}">Klicka här om inget händer.</a></p>
</body>
</html>
`;
}

// ── Delningssida för ett teoriavsnitt ─────────────────────────────────────
// Samma princip som artiklarnas dela-sidor ovan: katalog.html sätter visserligen
// rätt <title> per avsnitt, men det görs av JavaScript — och Facebooks,
// LinkedIns och Slacks robotar kör aldrig JS. De läser bara den statiska
// <head>, och skulle därför visa samma generiska kort för alla 333 avsnitt.
// Delningsraden i katalog.html pekar på de här filerna.
const AVSNITT_DELA_DIR = path.join(ROOT, 'katalog', 'dela');

function avsnittDelaHtml(a) {
  const articlePath = `/katalog.html?id=${encodeURIComponent(a.id)}`;
  const articleUrl = `${SITE_ORIGIN}${articlePath}`;
  const shareUrl = `${SITE_ORIGIN}/katalog/dela/${a.id}.html`;
  const imageUrl = `${SITE_ORIGIN}/og-fysiklabbet.png`;

  const rubrik = esc(`${a.namn} — ${a.kurs}`);
  const desc = esc(a.beskrivning || `${a.namn} — genomgång, övningar och simulering i ${a.kurs}.`);

  return `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(a.namn)} — ${esc(a.kurs)} — Fysiklabbet</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${articleUrl}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Open Graph (Facebook, LinkedIn, Messenger, WhatsApp, Slack, iMessage …) -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Fysiklabbet">
    <meta property="og:title" content="${rubrik}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${shareUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${rubrik}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${imageUrl}">

    <!-- Skicka människor vidare till genomgången direkt. -->
    <meta http-equiv="refresh" content="0; url=${articlePath}">
    <script>location.replace(${JSON.stringify(articlePath)});</script>
    <style>
        html, body { margin: 0; height: 100%; }
        body {
            background: #f7f2e8;
            color: #1a1712;
            font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
            display: flex; align-items: center; justify-content: center;
            text-align: center; padding: 24px;
        }
        a { color: #b23a2e; }
    </style>
</head>
<body>
    <p>Öppnar genomgången … <a href="${articlePath}">Klicka här om inget händer.</a></p>
</body>
</html>
`;
}

// ── Publiceringsgrind ─────────────────────────────────────────────────────
// Samma logik som datumgrinden i data/nyheter.js: en artikel är publicerad
// när date (+ ev. time) har passerats enligt lokal klocka. Framtidsdaterade
// artiklar hålls utanför RSS och sitemap tills skriptet körs igen.
function publishedOnly(articles) {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const nowStamp = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate())
    + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
  return articles.filter((a) => (a.date + 'T' + (a.time || '00:00')) <= nowStamp);
}

// RFC 1123-datum för RSS <pubDate>. Klockslag saknas oftast → 06:00 svensk
// tid som rimlig standard (exakt tidszonsförskjutning är oviktig här).
function rssDate(a) {
  const t = (a.time || '06:00') + ':00';
  return new Date(`${a.date}T${t}+02:00`).toUTCString();
}

// ── feed.xml (RSS 2.0) ────────────────────────────────────────────────────
const FEED_MAX = 20;

function buildFeed(published) {
  const items = published.slice(0, FEED_MAX).map((a) => {
    const link = `${SITE_ORIGIN}/nyheter.html?id=${encodeURIComponent(a.id)}`;
    // Bild som enclosure om filen finns på disk (RSS-läsare visar den).
    let enclosure = '';
    if (a.image) {
      const imgPath = path.join(ROOT, String(a.image).replace(/^\/+/, ''));
      if (fs.existsSync(imgPath)) {
        const ext = path.extname(imgPath).toLowerCase();
        const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
                       '.webp': 'image/webp', '.gif': 'image/gif' }[ext];
        if (mime) {
          const size = fs.statSync(imgPath).size;
          const url = `${SITE_ORIGIN}/${String(a.image).replace(/^\/+/, '')}`;
          enclosure = `\n      <enclosure url="${esc(url)}" length="${size}" type="${mime}"/>`;
        }
      }
    }
    return `    <item>
      <title>${esc(toPlain(a.title))}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${rssDate(a)}</pubDate>
      <category>${esc(a.category || 'Fysik')}</category>
      <description>${esc(toPlain(a.deck || a.title))}</description>${enclosure}
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fysiklabbet — fysiknyheter</title>
    <link>${SITE_ORIGIN}/nyheter.html</link>
    <atom:link href="${SITE_ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Dagliga fysiknyheter, populärvetenskapligt skrivna på svenska — från forskningsfronten till klassrummet.</description>
    <language>sv-SE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`;
}

// ── sitemap.xml ───────────────────────────────────────────────────────────
// Publika sidor = alla *.html i repo-roten utom interna verktygs-/testsidor.
const SITEMAP_EXCLUDE = new Set([
  'figur-preview.html',          // internt figur-testverktyg
  'prototyp-tts.html',           // prototyp
  'handskrift-demo.html',        // intern demo för handskriftsmotorn
  'matte-triangel-rektangel.html', // olänkad arbetsfil
  'fysik2-rorelse-wrapper.html', // olänkad wrapper
  'fysik1-enhetskollen.html',    // redirect-stub → fysik-enhetskoll.html
]);

// Ägarverifiering hos sökmotorerna (google<token>.html från Search Console,
// BingSiteAuth.xml m.fl.) är inte innehåll och ska aldrig in i sitemapen —
// men filerna MÅSTE ligga kvar i roten, annars återtas verifieringen.
const VERIFIERINGSFIL = /^(google[0-9a-f]+\.html|BingSiteAuth\.xml|yandex_[0-9a-f]+\.html)$/;

// ── data/begrepp-sok.js (lätt begreppsindex) ──────────────────────────────
// Hela ordlistan med brödtext är stor och växer. Sidor som bara behöver
// LÄNKA och förhandsvisa begrepp (index, katalog, simuleringar, nyheter)
// laddar därför den här nedbantade versionen — id, term, kort och former,
// utan body. Bara begrepp.html, som faktiskt renderar uppslagen, läser hela
// data/begrepp.js.
function buildBegreppIndex(begrepp) {
  const lätt = begrepp.map((b) => ({
    id: b.id, term: b.term, kort: b.kort, former: b.former,
  }));
  const rader = lätt.map((b) => '  ' + JSON.stringify(b) + ',').join('\n');
  return `/*
 * Fysiklabbet — lätt begreppsindex. GENERERAD FIL, redigera inte.
 *
 * Skapas av data/build-nyheter-og.js ur data/begrepp.js. Innehåller allt som
 * behövs för att länka och förhandsvisa begrepp (id, term, kort, former) men
 * INTE uppslagens brödtext — den läses bara av begrepp.html, som laddar hela
 * data/begrepp.js i stället för den här filen.
 *
 * Kör "node data/build-nyheter-og.js" efter varje ändring i data/begrepp.js.
 */
window.BEGREPP_LATT = true;
window.BEGREPP = [
${rader}
];
`;
}

// Begreppsordlistan (data/begrepp.js) — varje uppslagsord har en egen
// kanonisk URL (begrepp.html?ord=<id>) och hör hemma i sitemapen.
function loadBegrepp() {
  const file = path.join(ROOT, 'data', 'begrepp.js');
  if (!fs.existsSync(file)) return [];
  const win = {};
  // eslint-disable-next-line no-new-func
  new Function('window', fs.readFileSync(file, 'utf8'))(win);
  return Array.isArray(win.BEGREPP) ? win.BEGREPP : [];
}

// ── Teoriavsnitt, nationella prov och repetitionspaket ────────────────────
// Alla tre nås via en hash i webbläsaren (#fy1-3.2), men fragment efter #
// är osynliga för sökmotorer — utan detta räknas alla 333 genomgångar som
// EN sida. Sidorna svarar därför även på ?id=, och det är den formen som
// hör hemma i sitemapen. Se kommentaren i katalog.htmls parseInitialState().
const KURSKOD = {
  'Fysik nivå 1': 'fy1',
  'Fysik nivå 2': 'fy2',
  'Matematik nivå 1b': 'ma1b',
  'Matematik nivå 1c': 'ma1c',
  'Matematik nivå 2c': 'ma2c',
  'Matematik fortsättning nivå 1c': 'ma3c',
  'Matematik fortsättning nivå 2': 'ma4',
};

function korIFil(fil, global) {
  const p = path.join(ROOT, fil);
  if (!fs.existsSync(p)) return null;
  const win = {};
  // eslint-disable-next-line no-new-func
  new Function('window', fs.readFileSync(p, 'utf8'))(win);
  return win[global];
}

// Teoriavsnitt ur data/katalog.js → katalog.html?id=<kurskod>-<num>
function loadAvsnitt() {
  return loadAvsnittData().map((a) => a.id);
}

// Samma avsnitt, men med den text delningssidorna behöver.
function loadAvsnittData() {
  const flat = korIFil('data/katalog.js', 'KATALOG_FLAT');
  if (!Array.isArray(flat)) return [];
  // Katalogtitlar kan bära markdown-kursiv (*pq*-formeln) — den får inte
  // synas bokstavligt i ett delningskort. Samma strippning som katalog.html
  // gör för document.title.
  const rent = (t) => String(t == null ? '' : t).replace(/\*/g, '').trim();
  return flat
    .filter((s) => KURSKOD[s.course])
    .map((s) => ({
      id: `${KURSKOD[s.course]}-${s.num}`,
      // Sammanfattningarna och enhetskollarna heter likadant i varje kapitel.
      namn: String(s.num).endsWith('.S')
        ? `Sammanfattning: ${rent(s.chapter)}`
        : String(s.num).endsWith('.E')
          ? `Enhetskoll: ${rent(s.chapter)}`
          : rent(s.title),
      beskrivning: rent(s.description),
      kurs: s.course,
      kapitel: rent(s.chapter),
      num: s.num,
    }));
}

// Nationella prov ur data/np/index.js → np.html?id=<provId>
// Prov med `dold: true` hoppas över — de visas inte på np.html och ska
// därför inte heller ligga i sitemapen.
function loadProv() {
  const index = korIFil('data/np/index.js', 'NP_INDEX');
  if (!Array.isArray(index)) return [];
  return index.filter((p) => p && p.id && !p.dold).map((p) => p.id);
}

// Repetitionspaket — ett per fil i data/repetition/, id = filnamnet.
function loadRepetition() {
  const dir = path.join(ROOT, 'data', 'repetition');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort();
}

function buildSitemap(published) {
  const urls = [];

  for (const f of fs.readdirSync(ROOT).sort()) {
    if (!f.endsWith('.html') || SITEMAP_EXCLUDE.has(f) || VERIFIERINGSFIL.test(f)) continue;
    // index.html som ren domänrot.
    urls.push(f === 'index.html' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/${f}`);
  }

  const entries = urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`);
  for (const a of published) {
    const loc = `${SITE_ORIGIN}/nyheter.html?id=${encodeURIComponent(a.id)}`;
    entries.push(`  <url><loc>${esc(loc)}</loc><lastmod>${esc(a.date)}</lastmod></url>`);
  }
  for (const b of loadBegrepp()) {
    if (!b || !b.id) continue;
    entries.push(`  <url><loc>${esc(`${SITE_ORIGIN}/begrepp.html?ord=${encodeURIComponent(b.id)}`)}</loc></url>`);
  }
  for (const id of loadAvsnitt()) {
    entries.push(`  <url><loc>${esc(`${SITE_ORIGIN}/katalog.html?id=${encodeURIComponent(id)}`)}</loc></url>`);
  }
  for (const id of loadProv()) {
    entries.push(`  <url><loc>${esc(`${SITE_ORIGIN}/np.html?id=${encodeURIComponent(id)}`)}</loc></url>`);
  }
  for (const id of loadRepetition()) {
    entries.push(`  <url><loc>${esc(`${SITE_ORIGIN}/fysik-repetition.html?id=${encodeURIComponent(id)}`)}</loc></url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
}

// ── Bygg ───────────────────────────────────────────────────────────────────
function build() {
  const articles = loadArticles();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const wanted = new Set(articles.map((a) => `${a.id}.html`));

  // Skriv/uppdatera en sida per artikel.
  for (const a of articles) {
    if (!a.id) continue;
    fs.writeFileSync(path.join(OUT_DIR, `${a.id}.html`), pageHtml(a), 'utf8');
  }

  // Städa bort föräldralösa delningssidor (artiklar som tagits bort).
  let removed = 0;
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith('.html') && !wanted.has(f)) {
      fs.unlinkSync(path.join(OUT_DIR, f));
      removed++;
    }
  }

  console.log(`OG-delningssidor: ${articles.length} skrivna i nyheter/dela/` +
    (removed ? `, ${removed} föräldralösa borttagna` : ''));

  // Delningssidor för teoriavsnitten.
  const avsnitt = loadAvsnittData();
  if (avsnitt.length) {
    fs.mkdirSync(AVSNITT_DELA_DIR, { recursive: true });
    for (const a of avsnitt) {
      fs.writeFileSync(path.join(AVSNITT_DELA_DIR, `${a.id}.html`), avsnittDelaHtml(a), 'utf8');
    }
    const önskade = new Set(avsnitt.map((a) => `${a.id}.html`));
    let bort = 0;
    for (const f of fs.readdirSync(AVSNITT_DELA_DIR)) {
      if (f.endsWith('.html') && !önskade.has(f)) {
        fs.unlinkSync(path.join(AVSNITT_DELA_DIR, f));
        bort++;
      }
    }
    console.log(`Avsnittsdelning: ${avsnitt.length} skrivna i katalog/dela/` +
      (bort ? `, ${bort} föräldralösa borttagna` : ''));
  }

  // RSS + sitemap (endast publicerade artiklar).
  const published = publishedOnly(articles);
  fs.writeFileSync(path.join(ROOT, 'feed.xml'), buildFeed(published), 'utf8');
  console.log(`feed.xml: ${Math.min(published.length, FEED_MAX)} artiklar i RSS-flödet`);
  const sitemap = buildSitemap(published);
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  const begrepp = loadBegrepp();
  console.log(`sitemap.xml: ${(sitemap.match(/<url>/g) || []).length} URL:er ` +
    `(${published.length} artiklar + ${begrepp.length} begrepp + ` +
    `${loadAvsnitt().length} avsnitt + ${loadProv().length} prov + ` +
    `${loadRepetition().length} repetitionspaket + sidorna)`);

  // Lätt begreppsindex för sidor som bara länkar/förhandsvisar begrepp.
  if (begrepp.length) {
    const idx = buildBegreppIndex(begrepp);
    fs.writeFileSync(path.join(ROOT, 'data', 'begrepp-sok.js'), idx, 'utf8');
    const helSize = fs.statSync(path.join(ROOT, 'data', 'begrepp.js')).size;
    console.log(`data/begrepp-sok.js: ${begrepp.length} begrepp, ` +
      `${Math.round(idx.length / 1024)} kB (hela ordlistan: ${Math.round(helSize / 1024)} kB)`);
  }
}

// Kör bygget när filen startas direkt (node data/build-nyheter-og.js).
if (require.main === module) build();

// Exporteras så att .claude/verify-sitemap.js kan återanvända EXAKT samma
// logik när den kontrollerar att de committade filerna är aktuella. Byggde
// verifieraren en egen kopia av reglerna kunde de glida isär — och då vore
// kontrollen värdelös just när den behövs som mest.
module.exports = {
  ROOT, SITE_ORIGIN, OUT_DIR, FEED_MAX,
  loadArticles, publishedOnly, loadBegrepp, buildFeed, buildSitemap, pageHtml,
  loadAvsnitt, loadAvsnittData, loadProv, loadRepetition,
  AVSNITT_DELA_DIR, avsnittDelaHtml,
};
