#!/usr/bin/env node
// renumber-fy1.js — slå ihop Fy1 kap 1+2 till nya kap 1 "Introduktion och
// grunder" och renumrera kap 3-10 till 2-9.
//
// Mapping:
//   1.1     → 1.1   (chapter = "Introduktion och grunder")
//   2.1-2.3 → 1.2-1.4
//   3.x     → 2.x
//   4.x-10.x→ 3.x-9.x
//
// Renamar md-filer och uppdaterar frontmatter (id, section, chapter,
// chapterNumber). Två-pass för att undvika kollisioner när vissa nya
// namn återanvänder gamla namn (t.ex. fy1-3.1 → fy1-2.1).

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../data/teori');

const newChapterName = {
    1: 'Introduktion och grunder',
    2: 'Rörelse',
    3: 'Krafter',
    4: 'Energi',
    5: 'Tryck',
    6: 'Värmelära',
    7: 'Elektricitet',
    8: 'Relativitetsteori',
    9: 'Kärnfysik',
};

function mapSection(oldSec) {
    const [chStr, subStr] = oldSec.split('.');
    const ch = parseInt(chStr);
    const sub = parseInt(subStr);
    if (ch === 1 && sub === 1) return { ch: 1, sub: 1 };
    if (ch === 2) return { ch: 1, sub: sub + 1 };
    if (ch >= 3 && ch <= 10) return { ch: ch - 1, sub };
    throw new Error('Out of range: ' + oldSec);
}

const files = fs.readdirSync(dir).filter(f => /^fy1-\d+\.\d+\.md$/.test(f));
const plans = [];
for (const f of files) {
    const oldId = f.replace(/\.md$/, '');
    const oldSec = oldId.replace('fy1-', '');
    const { ch, sub } = mapSection(oldSec);
    const newId = `fy1-${ch}.${sub}`;
    const newFile = `${newId}.md`;
    const newSec = `${ch}.${sub}`;
    let content = fs.readFileSync(path.join(dir, f), 'utf-8');
    content = content
        .replace(/^id: fy1-\d+\.\d+/m, `id: ${newId}`)
        .replace(/^section: ['"]\d+\.\d+['"]/m, `section: '${newSec}'`)
        .replace(/^chapterNumber: \d+/m, `chapterNumber: ${ch}`)
        .replace(/^chapter: .+/m, `chapter: ${newChapterName[ch]}`);
    plans.push({ oldFile: f, newFile, content });
}

// Pass 1: skriv alla till tempnamn (.tmp-suffix) för att undvika kollisioner
for (const p of plans) {
    fs.writeFileSync(path.join(dir, p.newFile + '.tmp'), p.content);
}
// Pass 2: ta bort original
for (const p of plans) {
    const orig = path.join(dir, p.oldFile);
    if (fs.existsSync(orig)) fs.unlinkSync(orig);
}
// Pass 3: rename .tmp → slutligt namn
for (const p of plans) {
    fs.renameSync(path.join(dir, p.newFile + '.tmp'), path.join(dir, p.newFile));
    if (p.oldFile !== p.newFile) {
        console.log(`✓ ${p.oldFile}\t→\t${p.newFile}`);
    } else {
        console.log(`= ${p.oldFile}\t(samma namn, frontmatter uppdaterat)`);
    }
}
console.log(`\nKlart: ${plans.length} filer migrerade.`);
