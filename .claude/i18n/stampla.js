// .claude/i18n/stampla.js — skriver den svenska källans fingeravtryck i en
// engelsk teorifil (frontmatter-raden `kalla:`). Kör EFTER att översättningen
// stämts av mot den aktuella svenska texten:
//   node .claude/i18n/stampla.js fy1-2.1 fy1-2.2 …
// verify-engelska.js larmar sedan om den svenska filen ändras igen.
'use strict';
const fs = require('fs'), path = require('path');
const { kalla, ROT } = require('./kalla.js');
for (const id of process.argv.slice(2)) {
    const sv = path.join(ROT, 'data/teori', id + '.md');
    const en = path.join(ROT, 'data/teori/en', id + '.md');
    if (!fs.existsSync(sv) || !fs.existsSync(en)) { console.error('saknas:', id); process.exitCode = 1; continue; }
    const h = kalla(fs.readFileSync(sv, 'utf8'));
    let s = fs.readFileSync(en, 'utf8').replace(/\r\n?/g, '\n');
    if (!s.startsWith('---\n')) { console.error('ingen frontmatter:', id); process.exitCode = 1; continue; }
    if (/\nkalla:.*\n/.test(s)) s = s.replace(/\nkalla:.*\n/, '\nkalla: ' + h + '\n');
    else s = s.replace(/^---\n/, '---\nkalla: ' + h + '\n');
    fs.writeFileSync(en, s);
    console.log(id, h);
}
