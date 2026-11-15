#!/usr/bin/env node
// Skriver ut arbetslistan för påfyllningen som JSON: ett objekt per
// teoriavsnitt (sammanfattningar K.S undantagna) med titel, kurs och hur
// många uppgifter som saknas på varje nivå för att nå 7 + 7 + 7.
const fs = require('fs');
const path = require('path');
const { ROOT, OVN, loadOvningar, levelCount } = require('./lib.js');
const O = loadOvningar(OVN);
const dir = path.join(ROOT, 'data', 'teori');
const ut = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !/\.S\.md$/.test(f)).sort()) {
    const id = f.slice(0, -3);
    const md = fs.readFileSync(path.join(dir, f), 'utf8');
    const title = (md.match(/^title:\s*['"]?(.+?)['"]?\s*$/m) || [])[1] || id;
    const course = (md.match(/^course:\s*(.+?)\s*$/m) || [])[1] || '';
    const L = levelCount(O[id]);
    const saknas = L.map(n => Math.max(0, 7 - n));
    if (saknas.some(Boolean)) ut.push({ id, title, course, har: L, saknas });
}
console.log(JSON.stringify(ut));
