#!/usr/bin/env node
// Verifiera (och laga) att det står HÅRT MELLANSLAG mellan mätetal och enhet
// i all text besökaren läser: "10 m", "5,0 m/s", "10 meter", "20 °C", "3 kWh".
// Ett vanligt mellanslag låter webbläsaren bryta raden mellan talet och
// enheten, så att "10" står sist på en rad och "meter" först på nästa
// (påpekat 2026-11-12, Exempel 1 i fy2-2.13).
//
//   node .claude/verify-nbsp-enhet.js            granska, fel vid träff
//   node .claude/verify-nbsp-enhet.js --laga     byt mellanslaget mot U+00A0
//   node .claude/verify-nbsp-enhet.js fil …      bara de filerna
//
// Teorins md-filer granskas inte här: data/teori/build.js sätter det hårda
// mellanslaget själv när bundeln byggs (samma regel, UNIT_RE nedan).
//
// Granskas: data/**/*.js (utom genererade filer och engelskan/norskan) och
// HTML-sidorna i roten. Hoppar över inline-matte ($…$), SVG-/HTML-attribut
// (d="…", points="…", viewBox="…" — banornas "10 L 20" är inga enheter) och
// rader som är ren kod utan text.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const { laga } = require('./nbsp-enhet.js');

// Rader som är ren kod (ingen svensk text) granskas inte: de innehåller
// aritmetik som "10 * h" eller "x - 2 s" i variabelnamn, aldrig löptext.
function arTextrad(rad) {
  return /['"`>]/.test(rad) || /[åäöÅÄÖ]/.test(rad);
}

const UNDANTAG_FILER = [
  /^data\/teori\//,                 // byggs av build.js
  /^data\/en\//, /^i18n\//, /^data\/begrepp-sok\.js$/, /^data\/sok\.js$/,
  /\.min\.js$/, /^data\/tts\//, /^data\/np\/.*-figurer\.js$/,
  // pennlösningarna ritas glyf för glyf på ett ark och bryter aldrig rad;
  // ett U+00A0 saknar dessutom glyf i handstilen
  /-penna\.js$/, /^data\/ovningar-penna\//, /^handskrift.*\.(js|html)$/,
];

function filer() {
  const ut = [];
  const gå = (dir) => {
    for (const f of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = (dir ? dir + '/' : '') + f.name;
      if (f.isDirectory()) { if (!/^(node_modules|\.|en$)/.test(f.name)) gå(rel); }
      else if (rel.endsWith('.js')) ut.push(rel);
    }
  };
  gå('data');
  for (const f of fs.readdirSync(ROOT)) if (f.endsWith('.html')) ut.push(f);
  return ut.filter(f => !UNDANTAG_FILER.some(re => re.test(f)));
}

const args = process.argv.slice(2);
const LAGA = args.includes('--laga');
const valda = args.filter(a => !a.startsWith('--'));
const lista = valda.length ? valda.map(f => f.replace(/\\/g, '/')) : filer();

let antal = 0;
const rapport = [];
for (const rel of lista) {
  const fil = path.join(ROOT, rel);
  if (!fs.existsSync(fil)) continue;
  const raw = fs.readFileSync(fil, 'utf8');
  const rader = raw.split('\n');
  let andrad = false;
  rader.forEach((rad, i) => {
    if (!arTextrad(rad)) return;
    // hoppa över kodkommentarer
    if (/^\s*(\/\/|\*|\/\*)/.test(rad)) return;
    const { ut, traffar } = laga(rad);
    if (traffar.length) {
      antal += traffar.length;
      if (process.env.ALLA || rapport.length < 400) rapport.push(rel + ':' + (i + 1) + '  ' + rad.trim().slice(0, 110));
      if (LAGA) { rader[i] = ut; andrad = true; }
    }
  });
  if (LAGA && andrad) fs.writeFileSync(fil, rader.join('\n'));
}

if (LAGA) {
  console.log('Lagade ' + antal + ' mellanslag mellan tal och enhet.');
} else if (antal) {
  console.log(rapport.join('\n'));
  console.log('\nFEL: ' + antal + ' vanliga mellanslag mellan tal och enhet. ' +
    'Kör node .claude/verify-nbsp-enhet.js --laga eller skriv U+00A0 (&nbsp; i HTML).');
  process.exit(1);
} else {
  console.log('OK — hårt mellanslag mellan tal och enhet överallt.');
}

