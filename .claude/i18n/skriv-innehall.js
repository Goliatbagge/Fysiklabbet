// .claude/i18n/skriv-innehall.js — skriver ett engelskt innehållsöverlägg ur
// en JSON-fil med översättningar, och stämplar varje post med den aktuella
// svenska postens fingeravtryck (`kalla`).
//
//   node .claude/i18n/skriv-innehall.js <typ> <delnamn> <översättning.json>
//
//   <typ>      ovningar | exittickets | nyheter | begrepp | repetition | np
//   <delnamn>  filnamn i data/en/<typ>/ (till exempel fy1, ma2c-1, 2026-10)
//   JSON       { "<id>": <engelska datan>, … }
//              ovningar/exittickets/repetition: hela posten (samma form som
//                den svenska: övningarnas lista, exit ticketens lista …)
//              nyheter/begrepp/np: de fält som ska bytas (title, deck, body …)
//
// Slår ihop med en befintlig delfil (samma id skrivs över), så att en sats
// kan skrivas i flera omgångar. Kör sedan node .claude/i18n/bygg-manifest.js.
//
//   node .claude/i18n/skriv-innehall.js <typ> --mall <id> …   → skriver ut de
//        svenska posterna som JSON (underlag att översätta)
'use strict';
const fs = require('fs'), path = require('path');
const { kalla, laddaSvenskt, ROT } = require('./kalla.js');

const [typ, del, fil, ...rest] = process.argv.slice(2);
if (!typ || !del) { console.error('Användning: skriv-innehall.js <typ> <delnamn> <fil.json>'); process.exit(1); }
const sv = laddaSvenskt(typ);

if (del === '--mall') {
    const ids = [fil, ...rest].filter(Boolean);
    const ut = {};
    for (const id of ids) ut[id] = sv[id];
    process.stdout.write(JSON.stringify(ut, null, 1) + '\n');
    process.exit(0);
}

const ny = JSON.parse(fs.readFileSync(fil, 'utf8'));
const mal = path.join(ROT, 'data/en', typ, del + '.js');
let befintlig = {};
if (fs.existsSync(mal)) {
    const fake = { innehall: (n, p) => Object.assign(befintlig, p) };
    new Function('I18N', fs.readFileSync(mal, 'utf8'))(fake);
}
let fel = 0;
for (const id in ny) {
    if (!(id in sv)) { console.error('okänt id (finns inte på svenska):', id); fel++; continue; }
    befintlig[id] = { kalla: kalla(sv[id]), data: ny[id] };
}
const sorterad = {};
for (const id of Object.keys(befintlig).sort((a, b) => a.localeCompare(b, 'sv', { numeric: true }))) sorterad[id] = befintlig[id];
fs.mkdirSync(path.dirname(mal), { recursive: true });
fs.writeFileSync(mal,
    `/* Engelsk översättning av ${typ} (${del}). Skriven av .claude/i18n/skriv-innehall.js.\n` +
    ` * \`kalla\` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */\n` +
    `I18N.innehall('${typ}', ${JSON.stringify(sorterad, null, 1)});\n`);
console.log(`${path.relative(ROT, mal)}: ${Object.keys(sorterad).length} poster` + (fel ? `, ${fel} okända id` : ''));
require('./bygg-manifest.js');
if (fel) process.exitCode = 1;
