#!/usr/bin/env node
// Verifierar sökindexet (data/sok.js):
//
//  1. Varje simulering som är länkad i data/katalog.js (href OCH href2) finns
//     som en egen rad i sökindexet — ingen sim får sakna sökträff.
//  2. Avsnitt med FLERA simuleringar har en post per sim i
//     data/simuleringar.js (eget namn) — inte avsnittstiteln som reserv.
//  3. Varje sådan sim har egna nyckelord (kw), eftersom avsnittets keywords
//     inte ärvs när avsnittet har flera simuleringar.
//  4. Varje simulering går att söka fram på sitt eget namn.
//
// Kör före commit när simuleringar eller data/simuleringar.js ändrats.

const path = require('path');
const root = path.join(__dirname, '..');

global.window = {};
require(path.join(root, 'data/katalog.js'));
require(path.join(root, 'data/simuleringar.js'));
require(path.join(root, 'data/sok.js'));

const KF = window.KATALOG_FLAT;
const SIM_NAMES = window.SIM_NAMES;
const INDEX = window.SOK_INDEX;
const search = window.SOK_SEARCH;

const fel = [];
const simRader = INDEX.filter(e => e.kind === 'sim');

// Filen en länk pekar på, utan ?query/#hash — en djuplänk till en av flera
// simuleringar i samma fil (t.ex. "...html?sim=globe") räknas som täckt.
const fil = (href) => String(href).split(/[?#]/)[0];

for (const section of KF) {
  if (!section.href) continue;
  const hrefs = [section.href].concat(section.href2 ? [section.href2] : []);
  const namngivet = SIM_NAMES[section.href];
  const flera = hrefs.length > 1 || Array.isArray(namngivet);
  const etikett = `${section.course} ${section.num} "${section.title}"`;

  // 1. Alla länkade simuleringar finns i indexet.
  for (const href of hrefs) {
    if (!simRader.some(e => fil(e.resultHref) === fil(href))) {
      fel.push(`${etikett}: ${href} saknas i sökindexet.`);
    }
  }

  if (!flera) continue;

  // 2. Egna namn i data/simuleringar.js.
  if (!Array.isArray(namngivet)) {
    fel.push(`${etikett}: har ${hrefs.length} simuleringar men saknar en ` +
      `array i data/simuleringar.js — båda hamnar under avsnittstiteln i ` +
      `sökrutan.`);
    continue;
  }
  const poster = namngivet.map(it => (typeof it === 'string')
    ? { name: it, href: section.href, kw: null }
    : { name: it.name, href: it.href || section.href, kw: it.kw || null });

  for (const href of hrefs) {
    if (!poster.some(p => fil(p.href) === fil(href))) {
      fel.push(`${etikett}: ${href} saknar egen post i data/simuleringar.js.`);
    }
  }

  // 3. Egna nyckelord (avsnittets keywords ärvs inte vid flera sims).
  for (const p of poster) {
    if (String(p.href).indexOf('fysik-repetition.html') === 0) continue;
    if (!p.kw || p.kw.length === 0) {
      fel.push(`${etikett}: simuleringen "${p.name}" saknar kw: [...] — ` +
        `den går bara att hitta på sitt namn och sin beskrivning.`);
    }
  }
}

// 4. Varje simulering hittas på sitt eget namn.
for (const rad of simRader) {
  const traffar = search(rad.title);
  if (!traffar.some(t => t.kind === 'sim' && t.resultHref === rad.resultHref)) {
    fel.push(`Sökning på "${rad.title}" hittar inte ${rad.resultHref}.`);
  }
}

console.log('Verifierar sökindexet (data/sok.js)...\n');
console.log(`  ${INDEX.length} rader totalt — ${simRader.length} simuleringar, ` +
  `${INDEX.length - simRader.length} teoriavsnitt.`);

console.log('\n' + '='.repeat(60));
if (fel.length === 0) {
  console.log('OK! Varje simulering går att söka fram.');
  process.exit(0);
}
console.log(`FEL! ${fel.length} problem i sökindexet:\n`);
for (const f of fel) console.log('  - ' + f);
process.exit(1);
