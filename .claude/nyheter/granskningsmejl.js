#!/usr/bin/env node
/*
 * Bygger mejlet som nyhetsjobbet (daglig-nyhet.ps1) skickar till ägaren när
 * en artikel är skriven: ämnesrad, HTML-kropp och textkropp.
 *
 *   node .claude/nyheter/granskningsmejl.js <artikel-id> <granska|publicerad> <utkatalog>
 *
 * Skriver <utkatalog>/amne.txt, mejl.html och mejl.txt (UTF-8).
 *
 * Varför mejlet byggs här och inte av Claude-sessionen: tidigare skrev
 * sessionen hela mejlet själv efter en lista med punkter, och förhandslänken
 * (nyheter.html?forhand=<id>) föll bort ur mejlen för 2026-11-07 och
 * 2026-11-08 utan att något larmade. Ägaren fick ett granskningsmejl utan
 * något att klicka på. Nu står länken, rubriken, ingressen och källorna fast
 * i mallen, och sessionen fyller bara i platshållaren [[UTGIVARE]] (en kort
 * sammanfattning av utgivarens rättelser) och skickar resten ordagrant.
 * daglig-nyhet.ps1 kontrollerar dessutom att länken finns i kropparna innan
 * sessionen startas.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const [id, typ, utdir] = process.argv.slice(2);
if (!id || !/^(granska|publicerad)$/.test(typ || '') || !utdir) {
  console.error('Användning: node granskningsmejl.js <artikel-id> <granska|publicerad> <utkatalog>');
  process.exit(2);
}

const repo = path.resolve(__dirname, '..', '..');
const BAS = 'https://fysiklabbet.se';

// data/nyheter.js sätter window.NYHETER_ALL (hela listan, även framtida).
const ctx = { window: {}, document: {}, location: { search: '' } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(repo, 'data', 'nyheter.js'), 'utf8'), ctx);
const alla = ctx.window.NYHETER_ALL || ctx.window.NYHETER || [];
const a = alla.find((n) => n.id === id);
if (!a) { console.error('Hittar ingen artikel med id ' + id); process.exit(1); }

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Ingressen är ren text, men kan innehålla &nbsp; eller enstaka taggar.
const ren = (s) => String(s == null ? '' : s)
  .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

const VECKODAG = ['söndagen', 'måndagen', 'tisdagen', 'onsdagen', 'torsdagen', 'fredagen', 'lördagen'];
const MANAD = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti',
  'september', 'oktober', 'november', 'december'];
const [y, m, d] = a.date.split('-').map(Number);
const dag = new Date(Date.UTC(y, m - 1, d));
const datumText = `${VECKODAG[dag.getUTCDay()]} den ${d} ${MANAD[m - 1]} ${y}`;

// Utgivarens beslut ur granskningar.md: alla rader för artikeln, i ordning.
let beslut = [];
try {
  const g = fs.readFileSync(path.join(repo, '.claude', 'nyheter', 'granskningar.md'), 'utf8');
  for (const rad of g.split(/\r?\n/)) {
    if (!rad.includes(id)) continue;
    const m2 = rad.match(/(GODKÄND|RÄTTA FÖRST|STOPPAD)(\s*→\s*(GODKÄND|RÄTTA FÖRST|STOPPAD))?/);
    if (m2) beslut.push(m2[0].replace(/\s*→\s*/, ' → '));
  }
} catch (e) { /* ingen granskningslogg: beslutet lämnas åt sessionen */ }
const beslutText = beslut.length ? beslut.join(' → ') : 'se granskningsloggen';

const granska = typ === 'granska';
const lank = granska ? `${BAS}/nyheter.html?forhand=${id}` : `${BAS}/nyheter.html?id=${id}`;

const amne = granska
  ? `[Nyhet ${a.date}] Att granska: ${ren(a.title)}`
  : `[Nyhet ${a.date}] Publicerad utan förhandsgranskning: ${ren(a.title)}`;

const inledning = granska
  ? `Morgondagens nyhetsartikel (${datumText}) är klar och publiceras automatiskt vid midnatt.`
  : `Dagens nyhetsartikel (${datumText}) skrevs av nattens skyddsnät, eftersom ingen artikel hade förberetts dagen innan. Den är därför redan publicerad, utan att du har granskat den.`;

const lankRubrik = granska ? 'Läs artikeln i förhandsvisning:' : 'Läs artikeln på sajten:';
const lankNot = granska
  ? 'Det kan ta några minuter efter det här mejlet innan länken fungerar.'
  : '';

const instruktion = granska
  ? 'Svara på det här mejlet med OK, eller skriv vad som ska ändras. Ändringar som kommer in före klockan 22.15 hinner göras före publiceringen. Vill du inte att artikeln publiceras, skriv stoppa. Svarar du inte publiceras den ändå.'
  : 'Svara på det här mejlet om något ska rättas, så ändras artikeln på sajten.';

const kallor = [];
for (const s of a.sources || []) if (s && s.url) kallor.push({ namn: ren(s.name || s.url), url: s.url });
if (a.research && a.research.url && !kallor.some((k) => k.url === a.research.url)) {
  kallor.push({ namn: ren(a.research.citation || 'Originalstudien'), url: a.research.url });
}

const markor = `FL-JOBB FL-NYHET:${a.date}`;
const P = 'margin:0 0 14px; font-size:15px; line-height:1.55;';

const html = `<div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; max-width:640px;">
<p style="${P}">${esc(inledning)}</p>
<p style="margin:0 0 6px; font-size:15px;">${esc(lankRubrik)}</p>
<p style="margin:0 0 6px; font-size:17px; font-weight:bold;"><a href="${esc(lank)}">${esc(lank)}</a></p>
${lankNot ? `<p style="margin:0 0 18px; font-size:13px;">${esc(lankNot)}</p>` : ''}
<p style="margin:18px 0 6px; font-size:18px; font-weight:bold;">${esc(ren(a.title))}</p>
<p style="${P}">${esc(ren(a.deck))}</p>
<p style="${P}">Kategori: ${esc(a.category)}<br>Lästid: ${esc(a.readingTime)}</p>
<p style="${P}"><b>Utgivaren:</b> ${esc(beslutText)}. [[UTGIVARE]]</p>
<p style="margin:0 0 6px; font-size:15px;"><b>Källor</b></p>
<ul style="margin:0 0 14px; padding-left:20px; font-size:14px; line-height:1.5;">
${kallor.map((k) => `<li><a href="${esc(k.url)}">${esc(k.namn)}</a></li>`).join('\n')}
</ul>
<p style="${P}">${esc(instruktion)}</p>
<p style="margin:18px 0 0; font-size:11px; color:#888888;">${markor}</p>
</div>
`;

const txt = [
  inledning,
  '',
  lankRubrik,
  lank,
  ...(lankNot ? [lankNot] : []),
  '',
  ren(a.title),
  '',
  ren(a.deck),
  '',
  `Kategori: ${a.category}`,
  `Lästid: ${a.readingTime}`,
  '',
  `Utgivaren: ${beslutText}. [[UTGIVARE]]`,
  '',
  'Källor:',
  ...kallor.map((k) => `- ${k.namn.replace(/\.$/, '')}: ${k.url}`),
  '',
  instruktion,
  '',
  markor,
  '',
].join('\n');

fs.mkdirSync(utdir, { recursive: true });
fs.writeFileSync(path.join(utdir, 'amne.txt'), amne + '\n', 'utf8');
fs.writeFileSync(path.join(utdir, 'mejl.html'), html, 'utf8');
fs.writeFileSync(path.join(utdir, 'mejl.txt'), txt, 'utf8');
console.log(lank);
