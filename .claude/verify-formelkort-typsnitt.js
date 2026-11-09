/**
 * verify-formelkort-typsnitt.js — står formelkortens variabler i ett normalt typsnitt?
 *
 * Formelkorten i simuleringarna (klasserna .fnum och .flbl) ska ärva sidans
 * vanliga typsnitt (DM Sans). Rubriktypsnittet Instrument Serif
 * (--lab-font-display) är ett smalt rubriksnitt: sätts variablerna i det ser
 * de hoptryckta ut i sidled, och formeln ser annorlunda ut än i alla andra
 * simuleringar. Felet fanns i åtta simuleringar och påpekades 2026-11-09.
 *
 * Skriptet ger fel när en HTML-fil i projektroten som har ett formelkort
 * (.fnum) sätter Instrument Serif eller --lab-font-display i sin egen CSS
 * eller i en inline-stil. Länken till Google Fonts räknas inte.
 *
 * Användning: node .claude/verify-formelkort-typsnitt.js [fil.html …]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2);
const filer = (argv.length ? argv : fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))).sort();

let fel = 0, granskade = 0;
for (const f of filer) {
    const text = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (!/\bfnum\b/.test(text)) continue;
    granskade++;
    text.split(/\r?\n/).forEach((rad, i) => {
        if (/fonts\.googleapis\.com/.test(rad)) return;
        if (/Instrument Serif|--lab-font-display/.test(rad)) {
            fel++;
            console.log(`FEL: ${f}:${i + 1} — rubriktypsnittet används i en sida med formelkort`);
            console.log(`   ${rad.trim().slice(0, 150)}`);
        }
    });
}

console.log('\n' + '='.repeat(60));
if (fel) {
    console.log(`MISSLYCKADES! ${fel} förekomst(er) i ${granskade} sidor med formelkort.`);
    console.log('Ta bort font-family ur regeln, så att formeln ärver sidans typsnitt.');
    console.log('Se Formelpresentation punkt 10 i CLAUDE.md.');
    process.exit(1);
}
console.log(`OK! ${granskade} sidor med formelkort använder sidans vanliga typsnitt.`);
