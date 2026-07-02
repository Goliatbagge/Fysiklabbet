const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const re = /(<a href="simuleringar\.html"[^>]*>Simuleringar<\/a>\s*\n)([ \t]*)(<a href="om\.html")/;
let changed = [];
for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('href="nyheter.html"')) continue; // already has it
  if (!re.test(s)) continue;
  s = s.replace(re, (m, simLine, indent, omOpen) =>
    `${simLine}${indent}<a href="nyheter.html">Fysiknyheter</a>\n${indent}${omOpen}`);
  fs.writeFileSync(p, s);
  changed.push(f);
}
console.log('Uppdaterade ' + changed.length + ' filer:');
console.log(changed.join('\n'));
