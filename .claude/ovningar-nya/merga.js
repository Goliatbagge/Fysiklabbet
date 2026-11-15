#!/usr/bin/env node
// Sammanfogar fragmenten i .claude/ovningar-nya/<id>.js och rättelserna i
// .claude/ovningar-nya/<id>.rattelser.json med data/ovningar.js.
//
//   node .claude/ovningar-nya/merga.js            allt som finns
//   node .claude/ovningar-nya/merga.js fy1-       bara id:n som börjar så
//
// Rättelserna (par [gammal text, ny text], se lib.js) tillämpas först på
// avsnittets befintliga uppgifter. Sedan läggs fragmentet sist i avsnittets
// array. Efteråt laddas filen och antalet uppgifter kontrolleras: varje
// avsnitt ska ha ökat med exakt fragmentets antal och inget annat avsnitt
// får ha ändrats. Allt som sammanfogats flyttas till klara/, så att inget
// läggs in två gånger. Vid fel lämnas data/ovningar.js orörd.

const fs = require('fs');
const path = require('path');
const { OVN, insertFragment, applyRattelser, loadOvningar } = require('./lib.js');

const filt = process.argv.slice(2);
const dir = __dirname;
const klara = path.join(dir, 'klara');
fs.mkdirSync(klara, { recursive: true });
const SKIP = new Set(['lib.js', 'testa.js', 'merga.js', 'bilder.js', 'arbetslista.js']);
const valj = id => !filt.length || filt.some(p => id.startsWith(p));
const filer = fs.readdirSync(dir);
const fragIds = filer.filter(f => f.endsWith('.js') && !SKIP.has(f)).map(f => f.slice(0, -3)).filter(valj);
const rattIds = filer.filter(f => f.endsWith('.rattelser.json')).map(f => f.slice(0, -'.rattelser.json'.length)).filter(valj);
const ids = [...new Set([...fragIds, ...rattIds])].sort();

const fore = loadOvningar(OVN);
let src = fs.readFileSync(OVN, 'utf8');
const helpers = src.slice(0, src.indexOf('window.OVNINGAR = {'));
const vant = {};
try {
    for (const id of ids) {
        if (rattIds.includes(id)) {
            src = applyRattelser(src, id, JSON.parse(fs.readFileSync(path.join(dir, id + '.rattelser.json'), 'utf8')));
        }
        let n = 0;
        if (fragIds.includes(id)) {
            const frag = fs.readFileSync(path.join(dir, id + '.js'), 'utf8');
            global.window = {};
            n = eval(helpers + '\n;[\n' + frag + '\n]').length;
            src = insertFragment(src, id, frag);
        }
        vant[id] = (fore[id] || []).length + n;
    }
} catch (e) {
    console.log('FEL ' + e.message + '\nAvbrutet, data/ovningar.js orörd.');
    process.exit(1);
}
const tmp = OVN + '.tmp';
fs.writeFileSync(tmp, src);
let efter;
try { efter = loadOvningar(tmp); } catch (e) {
    fs.unlinkSync(tmp);
    console.log('FEL syntax efter sammanfogning: ' + e.message + '\nAvbrutet, data/ovningar.js orörd.');
    process.exit(1);
}
let fel = 0;
for (const id of ids) {
    const n = (efter[id] || []).length;
    if (n !== vant[id]) { console.log(`FEL ${id}: väntade ${vant[id]}, fick ${n}`); fel++; }
}
for (const id of Object.keys(fore)) {
    if (!ids.includes(id) && JSON.stringify(efter[id]) !== JSON.stringify(fore[id])) { console.log(`FEL ${id} ändrades oväntat`); fel++; }
}
if (fel) { fs.unlinkSync(tmp); console.log('Avbrutet, data/ovningar.js orörd.'); process.exit(1); }
fs.renameSync(tmp, OVN);
for (const id of ids) {
    for (const f of [id + '.js', id + '.rattelser.json']) {
        if (fs.existsSync(path.join(dir, f))) fs.renameSync(path.join(dir, f), path.join(klara, f));
    }
}
console.log(`Sammanfogade ${ids.length} avsnitt (${fragIds.length} med nya uppgifter, ${rattIds.length} med rättelser).`);
