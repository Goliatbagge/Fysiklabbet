// Stämplar data/en/katalog.js: varje avsnitt får `kalla` = fingeravtryck av
// den svenska titeln + beskrivningen (samma som verify-engelska.js räknar).
// Kör efter att en engelsk katalogpost lagts till eller rättats:
//   node .claude/i18n/stampla-katalog.js [id …]   (utan id: alla som saknar kalla)
'use strict';
const fs = require('fs'), path = require('path');
const { kalla, laddaSvenskt, ROT } = require('./kalla.js');
const fil = path.join(ROT, 'data/en/katalog.js');
let EN;
new Function('I18N', fs.readFileSync(fil, 'utf8'))({ katalog: (e) => { EN = e; } });
const sv = laddaSvenskt('katalog');
const valda = process.argv.slice(2);
let n = 0;
for (const id in EN.avsnitt) {
    if (valda.length ? !valda.includes(id) : EN.avsnitt[id].kalla) continue;
    if (!sv[id]) { console.error('finns inte på svenska:', id); continue; }
    EN.avsnitt[id].kalla = kalla(sv[id]); n++;
}
fs.writeFileSync(fil, '/* Engelska katalogtexter. Se I18N.katalog i i18n.js. `kalla` = fingeravtryck\n' +
    ' * av den svenska titeln + beskrivningen (.claude/i18n/stampla-katalog.js). */\n' +
    'I18N.katalog(' + JSON.stringify(EN, null, 1) + ');\n');
console.log('stämplade', n, 'avsnitt');
