#!/usr/bin/env node
// fix-canvas-text.js — Engångsfix för icke-idempotens-buggen i paperify.
//
// Tidigare versioner av paperify flippade canvas-hex fram och tillbaka:
// 1. Original dark bg #050510 → cream #f3eee4 (correct)
// 2. Sedan: isLightTextHex såg #f3eee4 som ljus → konverterade till ink #0f1620 (BAD: bg blev svart)
// Plus omvänt för text:
// 3. Original light text #cbd5e1 → ink #0f1620 (correct)
// 4. Sedan: isDarkHex såg #0f1620 som mörk → konverterade till cream #f3eee4 (BAD: text osynlig)
//
// Detta script använder kontext-heuristik (vad finns på nästa rad?) för att
// skilja BG-fillningar (fillRect(0,0,w,h)) från text-ritning (fillText).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(f => /^fysik[12]-.+\.html$/.test(f));

let totalFixed = 0;
for (const f of files) {
    let cur;
    try {
        cur = fs.readFileSync(path.join(root, f), 'utf8');
    } catch (e) { continue; }
    const lines = cur.split('\n');
    let changes = 0;
    for (let i = 0; i < lines.length; i++) {
        // Är raden en fillStyle/strokeStyle med en av våra två output-färger?
        const m = lines[i].match(/((?:fillStyle|strokeStyle)\s*=\s*['"])(#0f1620|#f3eee4|#0F1620|#F3EEE4)(['"])/);
        if (!m) continue;
        const currentValue = m[2].toLowerCase();
        // Kolla nästa 5 rader för fillText vs fillRect(0,0,...)
        let isText = false;
        let isBackground = false;
        for (let j = i + 1; j < Math.min(lines.length, i + 6); j++) {
            const next = lines[j];
            if (/\bfillText\s*\(/.test(next)) { isText = true; break; }
            if (/\bfillRect\s*\(\s*0\s*,\s*0\s*,/.test(next)) { isBackground = true; break; }
            if (/(?:fillStyle|strokeStyle)\s*=/.test(next)) break;
        }
        let target = null;
        if (isText && currentValue === '#f3eee4') target = '#0f1620';
        else if (isBackground && currentValue === '#0f1620') target = '#f3eee4';
        if (target) {
            lines[i] = lines[i].replace(
                /((?:fillStyle|strokeStyle)\s*=\s*['"])(?:#0f1620|#f3eee4|#0F1620|#F3EEE4)(['"])/,
                `$1${target}$2`
            );
            changes++;
        }
    }
    if (changes > 0) {
        fs.writeFileSync(path.join(root, f), lines.join('\n'), 'utf8');
        console.log(`  ✓ ${f} — ${changes} canvas-värden korrigerade`);
        totalFixed += changes;
    }
}
console.log(`\nTotalt ${totalFixed} canvas-fillStyle-värden återställda.`);
