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

// Required globala element som ska finnas på ALLA simuleringar
const REQUIRED_NAV = [
    '<link rel="stylesheet" href="styles.css">',
    '<script src="feedback.js"'
];

// Navigation accepteras antingen som den gamla navbar-mallen eller som
// Laborans-headern. Verifiering kräver att MINST en variant finns helt.
const LEGACY_NAV = [
    '<nav class="navbar">',
    '<a href="index.html" class="logo">',
    '<a href="fysik1.html" class="nav-link',
    '<a href="fysik2.html" class="nav-link',
    '<a href="om.html" class="nav-link',
    '<a href="kontakt.html" class="nav-link',
];
const LABORANS_NAV = [
    'lab-topbar--on-sim',
    'lab-header--on-sim',
    '<a class="lab-logo" href="index.html">',
    '<nav class="lab-nav"',
    '<a href="om.html">Om</a>',
    '<a href="kontakt.html">Kontakt</a>',
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
    'fysik2-magnetisk-kraft-ledare.html',
    'fysik2-vagsimulator.html',
    'fysik2-konisk-pendel.html',
    'fysik2-konisk-pendel-app.html',
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
    'fysik1-faradays-bur.html',
    'fysik1-sonderfall.html',
    'fysik1-massdefekt.html',
    'fysik1-stralning-genomtranglighet.html',
    'fysik2-vaxelstromsgenerator.html',
    'fysik2-em-stralning.html',
    'fysik2-dubbelspalt.html',
    'fysik2-manens-faser.html',
    'fysik2-wiens-lag.html',
    'fysik2-solens-farg.html',
    'fysik2-fotoelektrisk-effekt.html',
    'fysik2-spektrallinjer.html',
    'fysik2-energinivaer.html',
    'fysik1-halveringstid.html',
    'fysik1-newtons-gravitationslag.html',
    'fysik1-vektoraddition-app.html',
    // om.html och kontakt.html använder nu Laborans-headern (inte gamla
    // navbar-mallen) — de testas inte med samma kontroll. Samma sak gäller
    // index.html, katalog.html, avsnitt.html, fysik1.html, fysik2.html.
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
    const missingGlobal = REQUIRED_NAV.filter(el => !content.includes(el));
    const missingLegacy = LEGACY_NAV.filter(el => !content.includes(el));
    const missingLaborans = LABORANS_NAV.filter(el => !content.includes(el));

    const hasLegacy = missingLegacy.length === 0;
    const hasLaborans = missingLaborans.length === 0;

    if (missingGlobal.length > 0 || (!hasLegacy && !hasLaborans)) {
        hasErrors = true;
        console.log(`❌ ${filename} - SAKNAR navigation!`);
        if (missingGlobal.length > 0) {
            console.log(`   Saknade globala element:`);
            missingGlobal.forEach(elem => console.log(`   - ${elem}`));
        }
        if (!hasLegacy && !hasLaborans) {
            console.log(`   Ingen av navbar-varianterna är komplett.`);
            console.log(`   Saknat i Laborans-navbar: ${missingLaborans.join(', ')}`);
            console.log(`   Saknat i gamla navbar: ${missingLegacy.join(', ')}`);
        }
        console.log('');
    } else {
        const variant = hasLaborans ? 'Laborans' : 'gammal';
        console.log(`✅ ${filename} - OK (${variant} navbar)`);
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
