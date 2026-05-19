#!/usr/bin/env node
// migrate-nav-add-courses.js — lägg till "Fysik 1" och "Fysik 2" som
// snabblänkar i lab-nav efter "Start" och före "Om", på alla HTML-filer
// med lab-nav.
//
// Hanterar både HTML-syntax (class="lab-nav") och JSX-syntax (className).
// Idempotent: hoppar över filer som redan har en länk till katalog.html#fy1
// inom lab-nav.

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const NEW_LINKS_HTML = `<a href="katalog.html#fy1">Fysik 1</a>
                <a href="katalog.html#fy2">Fysik 2</a>
                `;
const NEW_LINKS_JSX = `<a href="katalog.html#fy1">Fysik 1</a>
                            <a href="katalog.html#fy2">Fysik 2</a>
                            `;

// Matchar både <a href="om.html"...>Om</a> i HTML och JSX. Vi byter ut
// raden så att Fysik 1/2 hamnar direkt före Om-länken.
const PATTERNS = [
    // JSX (className) — bevara indentering
    {
        re: /(\n[ \t]+)(<a href="om\.html"[^>]*>Om<\/a>)/g,
        wrap: (indent, match) => `${indent}<a href="katalog.html#fy1">Fysik 1</a>${indent}<a href="katalog.html#fy2">Fysik 2</a>${indent}${match}`,
    },
];

const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let touched = 0, skipped = 0;

for (const f of files) {
    const p = path.join(root, f);
    let c = fs.readFileSync(p, 'utf8');
    // Hoppa över filer utan lab-nav
    if (!c.includes('lab-nav')) { continue; }
    // Idempotens: redan migrerad?
    if (c.includes('katalog.html#fy1')) {
        skipped++;
        continue;
    }
    const before = c;
    for (const { re, wrap } of PATTERNS) {
        c = c.replace(re, (m, indent, omLink) => wrap(indent, omLink));
    }
    if (c !== before) {
        fs.writeFileSync(p, c);
        touched++;
        console.log(`✓ ${f}`);
    } else {
        console.log(`⚠ ${f} — hittade ingen "Om"-länk att infoga före`);
    }
}

console.log(`\nKlart: ${touched} filer uppdaterade, ${skipped} hoppade över (redan migrerade).`);
