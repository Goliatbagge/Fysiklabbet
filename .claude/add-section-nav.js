#!/usr/bin/env node
/* Lägger till data/katalog.js + section-nav.js före </body> på alla
 * katalog-länkade simuleringssidor, så att avsnittsväxlaren
 * (Teori / Simulering / Övningar) injiceras automatiskt.
 *
 * Idempotent: hoppar över filer som redan har section-nav.js.
 * Kör: node .claude/add-section-nav.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Alla filer som katalogen länkar till (section.href i data/katalog.js).
const FILES = [
    'fysik1-arkimedes.html', 'fysik1-coulombs-lag.html', 'fysik1-densitet-app.html',
    'fysik1-elektriska-falt.html', 'fysik1-ellara-app.html', 'fysik1-enhetskollen.html',
    'fysik1-faradays-bur.html', 'fysik1-halveringstid.html', 'fysik1-hastighet-tid-app.html',
    'fysik1-influens.html', 'fysik1-kirchhoffs-lag.html', 'fysik1-magdeburgska-halvklot.html',
    'fysik1-massdefekt.html', 'fysik1-newtons-gravitationslag.html', 'fysik1-newtons-tredje-app.html',
    'fysik1-rorelsediagram.html', 'fysik1-serie-parallell.html', 'fysik1-sonderfall.html',
    'fysik1-stracka-tid-app.html', 'fysik1-stralning-genomtranglighet.html', 'fysik1-tryck-pa-app.html',
    'fysik1-tryck.html', 'fysik1-tyngdfaktor-jorden.html', 'fysik1-varme-app.html',
    'fysik2-brytning-app.html', 'fysik2-dubbelspalt.html', 'fysik2-em-stralning.html',
    'fysik2-energinivaer.html', 'fysik2-fotoelektrisk-effekt.html', 'fysik2-jordmagnetiska-faltet.html',
    'fysik2-konisk-pendel.html', 'fysik2-magnetfalt-app.html', 'fysik2-magnetiskt-flode.html',
    'fysik2-manens-faser.html', 'fysik2-pendel-app.html', 'fysik2-rorelse-app.html',
    'fysik2-solens-farg.html', 'fysik2-spektrallinjer.html', 'fysik2-staende-vag-app.html',
    'fysik2-svangningar-jamforelse.html', 'fysik2-vagsimulator.html', 'fysik2-vaxelstromsgenerator.html',
    'fysik2-wiens-lag.html'
];

let added = 0, skipped = 0, missing = 0;

FILES.forEach(file => {
    const fp = path.join(ROOT, file);
    if (!fs.existsSync(fp)) { console.log('⚠️  saknas: ' + file); missing++; return; }
    let c = fs.readFileSync(fp, 'utf8');

    if (c.includes('section-nav.js')) { skipped++; return; }

    const tags = [];
    if (!c.includes('data/katalog.js')) tags.push('    <script src="data/katalog.js"></script>');
    tags.push('    <script src="section-nav.js"></script>');
    const insert = tags.join('\n') + '\n';

    const idx = c.lastIndexOf('</body>');
    if (idx === -1) { console.log('⚠️  ingen </body>: ' + file); missing++; return; }

    c = c.slice(0, idx) + insert + c.slice(idx);
    fs.writeFileSync(fp, c, 'utf8');
    console.log('✅ ' + file);
    added++;
});

console.log(`\nKlart — tillagt: ${added}, redan ok: ${skipped}, problem: ${missing}`);
