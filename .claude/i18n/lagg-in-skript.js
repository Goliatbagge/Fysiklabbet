// Lägger in <script src="i18n.js"></script> direkt efter <meta charset> i
// varje sida i roten (idempotent). Kör igen när nya sidor tillkommit.
//   node .claude/i18n/lagg-in-skript.js [mapp=. ] [prefix=]
const fs = require('fs'), path = require('path');
const ROT = path.join(__dirname, '..', '..');
const mapp = process.argv[2] || '.';
const prefix = process.argv[3] || '';
let n = 0;
for (const f of fs.readdirSync(path.join(ROT, mapp))) {
    if (!f.endsWith('.html') || /^google[0-9a-f]+\.html$/.test(f)) continue;
    const p = path.join(ROT, mapp, f);
    let s = fs.readFileSync(p, 'utf8');
    if (/src="[^"]*i18n\.js"/.test(s)) continue;
    const tag = `<script src="${prefix}i18n.js"></script>`;
    const ny = s.replace(/(<meta\s+charset=["']?utf-8["']?\s*\/?>)(\r?\n)?/i, (m, a, nl) => {
        const ind = (s.slice(0, s.indexOf(a)).match(/[ \t]*$/) || [''])[0];
        return a + (nl || '\n') + ind + tag + (nl || '\n');
    });
    if (ny === s) { console.log('INGEN charset:', f); continue; }
    fs.writeFileSync(p, ny); n++;
}
console.log('lade in i18n.js i', n, 'sidor');
