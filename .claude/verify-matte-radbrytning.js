#!/usr/bin/env node
/*
 * verify-matte-radbrytning.js
 *
 * Fångar RADBRYTNINGAR I MATTEBLOCK SOM INTE BRYTER. En klammer med
 * mätvärden (\left[ \begin{array}{l} … \end{array} \right]), en
 * \begin{aligned} eller en cases-uppställning ska ha en rad per värde:
 *
 *     k = 40\ \mathrm{N/m} \\
 *     n = 2
 *
 * Står det bara ETT bakstreck i radslutet (`\` i md, `\\` i JS-källan)
 * blir det i KaTeX ett "control space" i stället för en radbrytning, och
 * värdena hamnar bredvid varandra på samma rad. Ingenting ser trasigt ut i
 * källan, och KaTeX ger inget fel. Felet har hänt (2026-10-12, Exempel 3 i
 * fy2-2.2: k = 40 N/m och n = 2 stod på en rad i klammern).
 *
 * Granskar:
 *   - data/teori/*.md: rader INUTI $$…$$ som slutar med exakt ett `\`.
 *     (Utanför display-matte är `\` i radslut en markdown-radbrytning och
 *     lämnas i fred.)
 *   - data/**.js: rader inuti $$…$$ i källan som slutar med exakt två
 *     bakstreck (`\\` i källan = ett bakstreck i strängen).
 *
 * Användning: node .claude/verify-matte-radbrytning.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const fel = [];

function trailingBackslashes(line) {
  const m = line.replace(/\s+$/, '').match(/\\+$/);
  return m ? m[0].length : 0;
}

function granska(fil, ensam) {
  const text = fs.readFileSync(fil, 'utf8');
  const rader = text.split(/\r?\n/);
  let iDisplay = false;
  rader.forEach((rad, i) => {
    // Räkna $$ på raden för att veta om NÄSTA rad ligger i display-matte.
    // Raden som slutar i ett block (… \\ följt av $$ senare) granskas med
    // läget som gällde när raden började.
    const start = iDisplay;
    const antal = (rad.match(/\$\$/g) || []).length;
    let inne = start;
    // Om raden öppnar ett $$ och inte stänger det, är raden själv inne i
    // matte från och med $$ — räkna den som inne om radslutet ligger efter
    // ett udda antal $$.
    if (antal % 2 === 1) inne = !start;
    if (inne && trailingBackslashes(rad) === ensam) {
      fel.push(`${path.relative(ROOT, fil)}:${i + 1}: ${rad.trim().slice(-60)}`);
    }
    if (antal % 2 === 1) iDisplay = !iDisplay;
  });
}

const teori = path.join(ROOT, 'data', 'teori');
for (const f of fs.readdirSync(teori)) {
  if (f.endsWith('.md')) granska(path.join(teori, f), 1);
}

function jsFiler(dir) {
  const ut = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) ut.push(...jsFiler(p));
    else if (e.name.endsWith('.js') && e.name !== 'bundle.js') ut.push(p);
  }
  return ut;
}
for (const f of jsFiler(path.join(ROOT, 'data'))) granska(f, 2);

if (fel.length) {
  console.log('FEL: radbrytning i matteblock med ett ensamt bakstreck i radslutet.');
  console.log('     Skriv \\\\ i md-filerna och \\\\\\\\ i JS-källan, annars hamnar raderna');
  console.log('     bredvid varandra (till exempel värdena i en mätvärdesklammer).\n');
  fel.forEach(f => console.log('  ' + f));
  console.log(`\n${fel.length} fel.`);
  process.exit(1);
}
console.log('OK — alla radbrytningar i matteblocken har dubbla bakstreck.');
