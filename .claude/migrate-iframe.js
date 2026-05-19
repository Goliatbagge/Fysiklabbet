#!/usr/bin/env node
// migrate-iframe.js — anpassa migrate-labsim för iframe-laddade standalone-filer.
// Iframe-filer ligger i underkataloger (t.ex. fysik1-tryck-pa/standalone.html)
// och måste referera till ../styles-laborans.css respektive ../styles-laborans-sim.css.
//
// Användning:
//   node .claude/migrate-iframe.js fil.html [...]
//   node .claude/migrate-iframe.js --all-iframes

const fs = require('fs');
const path = require('path');

const SIM_HEAD = `    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script>window.__CB = String(Date.now());</script>
    <script>document.write('<link rel="stylesheet" href="../styles-laborans.css?v=' + window.__CB + '">');</script>
    <script>document.write('<link rel="stylesheet" href="../styles-laborans-sim.css?v=' + window.__CB + '">');</script>`;

function migrate(filePath) {
    const abs = path.resolve(filePath);
    const baseName = path.basename(filePath);
    let c = fs.readFileSync(abs, 'utf8');
    const orig = c;

    // 1. Lägg in Laborans CSS-länkar i head om ej redan finns
    if (!c.includes('styles-laborans-sim.css')) {
        c = c.replace(/<\/head>/i, `${SIM_HEAD}\n  </head>`);
    }

    // 2. Lägg till class="lab-sim" på body + strippa dark Tailwind classes
    c = c.replace(/<body([^>]*)>/, (match, attrs) => {
        let newAttrs = attrs;
        const classMatch = newAttrs.match(/\sclass="([^"]*)"/);
        if (classMatch) {
            let cls = classMatch[1].split(/\s+/)
                .filter(x => !/^bg-(slate|gray|zinc|neutral|stone|black)-(8|9)\d{2}$/.test(x))
                .filter(x => !/^text-(slate|gray|zinc|neutral|stone)-(1|2|3)\d{2}$/.test(x))
                .filter(x => x !== 'text-white');
            if (!cls.includes('lab-sim')) cls.push('lab-sim');
            newAttrs = newAttrs.replace(/\sclass="[^"]*"/, ` class="${cls.join(' ').trim()}"`);
        } else {
            newAttrs = `${attrs} class="lab-sim"`;
        }
        return `<body${newAttrs}>`;
    });

    if (c === orig) {
        console.log(`  · ${baseName}: redan migrerad`);
        return false;
    }
    fs.writeFileSync(abs, c, 'utf8');
    console.log(`  ✓ ${baseName}`);
    return true;
}

const args = process.argv.slice(2);
let targets = args;
if (args[0] === '--all-iframes') {
    const root = path.resolve(__dirname, '..');
    targets = [
        'fysik1-tryck-pa/standalone.html',
        'fysik2-magnetfalt/standalone.html',
        'fysik2-magnetisk-kraft/standalone.html',
    ].map(f => path.join(root, f)).filter(p => fs.existsSync(p));
}

let n = 0;
targets.forEach(f => { if (migrate(f)) n++; });
console.log(`\nKlart. ${n} av ${targets.length} iframe-filer migrerade.`);
