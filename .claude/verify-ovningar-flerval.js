#!/usr/bin/env node
// Verifierar flervalsuppgifterna i data/ovningar.js (choices + correct).
//
//   node .claude/verify-ovningar-flerval.js
//
// Bakgrund: 648 av 771 flervalsuppgifter hade rätt svar på alternativ A
// (correct: 0), och fysikkurserna hade i stället nästan alltid B. En lärare
// som klickade runt i övningarna såg mönstret direkt (påpekat 2026-09-30).
// Samma fel hade redan rättats i exit tickets 2026-08-18, men då granskades
// bara data/exittickets.js. Den här verifieraren gör samma kontroll för
// övningarna, och kontrollerar dessutom att lösningens bokstavshänvisningar
// ("**Svar:** Alternativ C") stämmer med correct efter en omblandning.
//
// FEL (exit 1):
//   - correct utanför alternativens intervall
//   - ett index har mer än 45 % av rätt svar inom en kurs (minst 20 frågor)
//   - alla flervalsuppgifter i ett avsnitt (minst 4) har samma rätt-index
//   - "**Svar:** Alternativ X" pekar på en annan bokstav än correct
//   - "Alternativ X" nämner en bokstav som inte finns bland alternativen
//   - lösningen hänvisar till ett alternativ via dess PLATS ("det sista
//     alternativet", "de två första alternativen"), vilket blir fel så fort
//     alternativen blandas om. Hänvisa till innehållet i stället.
//
// Blanda alternativen när du skriver nya uppgifter: lägg inte rätt svar
// först (eller på samma plats) av gammal vana.

const path = require('path');

global.window = {};
require(path.resolve(process.argv[2] || path.join(__dirname, '..', 'data', 'ovningar.js')));
const O = window.OVNINGAR;

const L = 'ABCD';
const errors = [];
const courseDist = {};
const totalDist = {};
let totalMC = 0;

for (const [id, list] of Object.entries(O)) {
    if (!Array.isArray(list)) continue;
    const mc = [];
    list.forEach((u, ui) => {
        if (!Array.isArray(u.choices)) return;
        const tag = `${id} uppgift ${ui + 1}`;
        const n = u.choices.length;
        if (!Number.isInteger(u.correct) || u.correct < 0 || u.correct >= n) {
            errors.push(`${tag}: correct=${u.correct} utanför intervallet 0–${n - 1}`);
            return;
        }
        totalMC++;
        mc.push(u.correct);
        const kurs = id.split('-')[0];
        courseDist[kurs] = courseDist[kurs] || {};
        courseDist[kurs][u.correct] = (courseDist[kurs][u.correct] || 0) + 1;
        totalDist[u.correct] = (totalDist[u.correct] || 0) + 1;

        const text = `${u.question || ''}\n${u.solution || ''}`;
        const svar = (u.solution || '').match(/\*\*Svar:?\*\*:?\s*Alternativ\s+([A-D])\b/);
        if (svar && L.indexOf(svar[1]) !== u.correct) {
            errors.push(`${tag}: lösningen säger "Svar: Alternativ ${svar[1]}" men correct är ${u.correct} (${L[u.correct]})`);
        }
        for (const m of text.matchAll(/[Aa]lternativ(?:en)?\s+([A-D])\b/g)) {
            if (L.indexOf(m[1]) >= n) errors.push(`${tag}: nämner alternativ ${m[1]} men har bara ${n} alternativ`);
        }
        const plats = text.match(/\b(första|tredje|fjärde|sista|översta|nedersta)\s+(svars)?alternativ(et|en)\b/i);
        if (plats) {
            errors.push(`${tag}: hänvisar till "${plats[0]}" — blir fel när alternativen blandas om; hänvisa till innehållet i stället`);
        }
    });
    if (mc.length >= 4 && new Set(mc).size === 1) {
        errors.push(`${id}: alla ${mc.length} flervalsuppgifter har rätt svar på ${L[mc[0]]} — blanda om alternativen`);
    }
}

for (const [kurs, dist] of Object.entries(courseDist)) {
    const n = Object.values(dist).reduce((a, b) => a + b, 0);
    if (n < 20) continue; // för litet underlag för statistik
    for (const [idx, cnt] of Object.entries(dist)) {
        if (cnt / n > 0.45) {
            errors.push(`${kurs}: rätt svar ligger på ${L[idx]} i ${cnt} av ${n} flervalsuppgifter (${Math.round(100 * cnt / n)} %) — blanda om alternativen så att rätt svar blir jämnt fördelat`);
        }
    }
}

console.log(`Flervalsuppgifter: ${totalMC}`);
console.log('Rätt svar per bokstav:', Object.keys(totalDist).sort().map(i => `${L[i]}: ${totalDist[i]}`).join(', '));
for (const [kurs, dist] of Object.entries(courseDist)) {
    const n = Object.values(dist).reduce((a, b) => a + b, 0);
    console.log(`  ${kurs.padEnd(7)} ` + [0, 1, 2, 3].map(i => `${L[i]}: ${dist[i] || 0}`).join('  ') + `  (${n})`);
}
if (errors.length) {
    console.log(`\n--- FEL (${errors.length}) ---`);
    errors.forEach(e => console.log('  ' + e));
    process.exit(1);
}
console.log('\nOK — inga fel.');
