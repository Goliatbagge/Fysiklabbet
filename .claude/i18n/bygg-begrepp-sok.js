// Bygger data/en/begrepp-sok.js — det lätta engelska begreppsindexet (term,
// kort, former) för sidor som bara länkar och förhandsvisar begrepp (de
// laddar data/begrepp-sok.js, inte hela ordlistan). Motsvarar den svenska
// data/begrepp-sok.js, som byggs av data/build-nyheter-og.js; körs därifrån.
'use strict';
const fs = require('fs'), path = require('path');
const { laddaEngelskt, ROT } = require('./kalla.js');
const en = laddaEngelskt('begrepp');
const ut = {};
for (const id of Object.keys(en).sort()) {
    const d = en[id].data || {};
    ut[id] = { kalla: en[id].kalla, data: { term: d.term, kort: d.kort, former: d.former } };
}
fs.mkdirSync(path.join(ROT, 'data/en'), { recursive: true });
fs.writeFileSync(path.join(ROT, 'data/en/begrepp-sok.js'),
    '/* GENERERAD av .claude/i18n/bygg-begrepp-sok.js ur data/en/begrepp/*.js. Redigera inte. */\n' +
    "I18N.innehall('begrepp', " + JSON.stringify(ut) + ');\n');
console.log('data/en/begrepp-sok.js:', Object.keys(ut).length, 'begrepp');
require('./bygg-manifest.js');
