// Generator för data/np/fy1-vt2017-figurer.js — kursprov Fysik 1 VT 2017.
// Figurerna byggdes i tre delar (del 1, 2 och 3), en generator per del.
// Den här filen kör alla tre och slår ihop deras utdata till en figurfil.
// Kör från repo-roten:
//   node .claude/np-figs/gen-fy1-vt2017.js
'use strict';
const fs = require('fs');
const path = require('path');
const NP = path.join(__dirname, '..', '..', 'data', 'np');

const delar = ['1', '2', '3'];
const figurer = {};
for (const d of delar) {
    // Delgeneratorn skriver fy1-vt2017-figurer-<d>.js när den laddas.
    require('./gen-fy1-vt2017-' + d + '.js');
    const fil = path.join(NP, 'fy1-vt2017-figurer-' + d + '.js');
    const win = { NP_FIGURER: {} };
    new Function('window', fs.readFileSync(fil, 'utf8'))(win);
    const del = win.NP_FIGURER['fy1-vt2017'] || {};
    for (const k of Object.keys(del)) {
        if (figurer[k]) throw new Error('Dubblerad figurnyckel ' + k);
        figurer[k] = del[k];
    }
    fs.unlinkSync(fil);
}

const nr = k => { const m = /^u(\d+)(?:-s(\d+))?$/.exec(k); return m ? (+m[1]) * 100 + (+(m[2] || 0)) : 1e9; };
const nycklar = Object.keys(figurer).sort((a, b) => nr(a) - nr(b));
const ut = [
    '// Fysiklabbet — figurer till kursprov Fy 1 VT 2017 (genererade — redigera inte för',
    '// hand; generatorn ligger i .claude/np-figs/gen-fy1-vt2017.js, som kör',
    '// gen-fy1-vt2017-1/2/3.js, koordinater beräknade).',
    '// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.',
    'window.NP_FIGURER = window.NP_FIGURER || {};',
    "window.NP_FIGURER['fy1-vt2017'] = {",
    ...nycklar.map(k => '  ' + JSON.stringify(k).replace(/"/g, "'") + ': ' + JSON.stringify(figurer[k]) + ','),
    '};',
];
fs.writeFileSync(path.join(NP, 'fy1-vt2017-figurer.js'), ut.join('\n') + '\n');
console.log('fy1-vt2017-figurer.js: ' + nycklar.length + ' figurer');
