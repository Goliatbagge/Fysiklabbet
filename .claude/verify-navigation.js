/**
 * Navigation Verification Script
 *
 * Detta script kontrollerar att alla HTML-sidor har korrekt navigationsmeny.
 * Kör detta script innan varje commit för att säkerställa konsistens.
 *
 * Användning: node .claude/verify-navigation.js
 */

const fs = require('fs');
const path = require('path');

//Required navigation HTML that should be present in all simulation files
const REQUIRED_NAV = [
    '<nav class="navbar">',
    '<a href="index.html" class="logo">',
    '<a href="fysik1.html" class="nav-link',
    '<a href="fysik2.html" class="nav-link',
    '<a href="om.html" class="nav-link',
    '<a href="kontakt.html" class="nav-link',
    '<link rel="stylesheet" href="styles.css">'
];

// Files to check
const HTML_FILES_TO_CHECK = [
    'fysik1-hastighet-tid-app.html',
    'fysik1-stracka-tid-app.html',
    'fysik1-varme-app.html',
    'fysik1-densitet-app.html',
    'fysik1-newtons-tredje-app.html',
    'fysik1-tryck-pa-app.html',
    'fysik1-ellara-app.html',
    'fysik1-tyngdfaktor-jorden.html',
    'fysik1-influens.html',
    'fysik1-magdeburgska-halvklot.html',
    'fysik2-magnetfalt-standalone.html',
    'fysik2-magnetisk-kraft-ledare.html',
    'fysik2-vagsimulator.html',
    'fysik2-konisk-pendel.html',
    'fysik2-jordmagnetiska-faltet.html',
    'fysik1-rorelsediagram.html',
    'fysik1-coulombs-lag.html',
    'fysik1-kirchhoffs-lag.html',
    'fysik2-svangningar-jamforelse.html',
    'fysik1-serie-parallell.html',
    'fysik2-magnetfalt-spole.html',
    'fysik1-elektriska-falt.html',
    'fysik2-rorelse-app.html',
    'fysik2-brytning-app.html',
    'fysik2-pendel-app.html',
    'fysik2-magnetiskt-flode.html',
    'fysik1-enhetskollen.html',
    'om.html',
    'kontakt.html'
];

let hasErrors = false;

console.log('🔍 Verifierar navigation i alla HTML-filer...\n');

HTML_FILES_TO_CHECK.forEach(filename => {
    const filepath = path.join(__dirname, '..', filename);

    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  ${filename} - Filen existerar inte (kan vara OK om den inte skapats än)`);
        return;
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    const missingElements = [];

    REQUIRED_NAV.forEach(requiredElement => {
        if (!content.includes(requiredElement)) {
            missingElements.push(requiredElement);
        }
    });

    if (missingElements.length > 0) {
        hasErrors = true;
        console.log(`❌ ${filename} - SAKNAR navigation!`);
        console.log(`   Saknade element:`);
        missingElements.forEach(elem => {
            console.log(`   - ${elem}`);
        });
        console.log('');
    } else {
        console.log(`✅ ${filename} - OK`);
    }
});

console.log('\n' + '='.repeat(60));

if (hasErrors) {
    console.log('❌ VERIFIERING MISSLYCKADES!');
    console.log('En eller flera filer saknar korrekt navigation.');
    console.log('Lägg till navigationsmeny innan commit.');
    process.exit(1);
} else {
    console.log('✅ ALLA FILER HAR KORREKT NAVIGATION!');
    process.exit(0);
}
