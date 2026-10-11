// Generator för data/np/ma3c-vt2018-figurer.js — NP Matematik 3c VT 2018.
// Figurerna byggdes i tre delar (delprov B, C och D), en generator per del.
// Den här filen kör alla tre och slår ihop deras utdata till en figurfil.
// Kör från repo-roten:
//   node .claude/np-figs/gen-ma3c-vt2018.js
'use strict';
const fs = require('fs');
const path = require('path');
const NP = path.join(__dirname, '..', '..', 'data', 'np');

const delar = ['B', 'C', 'D'];
const figurer = {};
for (const d of delar) {
    // Delgeneratorn skriver ma3c-vt2018-figurer-<d>.js när den laddas.
    require('./gen-ma3c-vt2018-' + d + '.js');
    const fil = path.join(NP, 'ma3c-vt2018-figurer-' + d + '.js');
    const win = { NP_FIGURER: {} };
    new Function('window', fs.readFileSync(fil, 'utf8'))(win);
    const del = win.NP_FIGURER['ma3c-vt2018'] || {};
    for (const k of Object.keys(del)) {
        if (figurer[k]) throw new Error('Dubblerad figurnyckel ' + k);
        figurer[k] = del[k];
    }
    fs.unlinkSync(fil);
}

const nr = k => { const m = /^u(\d+)(?:-s(\d+))?$/.exec(k); return m ? (+m[1]) * 100 + (+(m[2] || 0)) : 1e9; };
const nycklar = Object.keys(figurer).sort((a, b) => nr(a) - nr(b));
const ut = [
    '// Fysiklabbet — figurer till NP Ma 3c VT 2018 (genererade — redigera inte för',
    '// hand; generatorn ligger i .claude/np-figs/gen-ma3c-vt2018.js, som kör',
    '// gen-ma3c-vt2018-B/C/D.js, koordinater beräknade).',
    '// Klasserna anim-draw/anim-fade animeras av CSS i np.html när steget fälls ut.',
    'window.NP_FIGURER = window.NP_FIGURER || {};',
    "window.NP_FIGURER['ma3c-vt2018'] = {",
    ...nycklar.map(k => '  ' + JSON.stringify(k).replace(/"/g, "'") + ': ' + JSON.stringify(figurer[k]) + ','),
    '};',
];
fs.writeFileSync(path.join(NP, 'ma3c-vt2018-figurer.js'), ut.join('\n') + '\n');
console.log('ma3c-vt2018-figurer.js: ' + nycklar.length + ' figurer');
