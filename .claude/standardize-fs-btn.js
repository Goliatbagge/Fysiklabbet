#!/usr/bin/env node
/* Standardiserar fullskärmsknappen i simuleringar till den delade .fs-btn
 * (cirkulär ikon-knapp, definierad i styles-laborans-sim.css) med samma
 * expandera/komprimera-ikon som fysik2-fotoelektrisk-effekt.html.
 *
 * - Ersätter knappen som har onClick={toggleFullscreen} med standardmarkup.
 * - Tar bort lokala .fs-btn / .fs-btn:hover-overrides (så delade regeln gäller).
 *
 * Idempotent. Kör: node .claude/standardize-fs-btn.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Sim-filer med egen/handkodad fullskärmsknapp (ej fotoelektrisk/konisk som
// redan är korrekta).
const FILES = [
    'fysik1-coulombs-lag.html',
    'fysik1-newtons-gravitationslag.html',
    'fysik2-energinivaer.html',
    'fysik2-manens-faser.html',
    'fysik2-wiens-lag.html',
    'fysik2-brytning-app.html',
    'fysik2-solens-farg.html'
];

const STD_BTN =
    '<button className="fs-btn" onClick={toggleFullscreen} aria-label="Fullskärm" ' +
    'title={isFullscreen ? \'Lämna fullskärm\' : \'Fullskärm\'}>' +
    '{isFullscreen ? (' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">' +
    '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>' +
    ') : (' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">' +
    '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>' +
    ')}</button>';

// Matchar en <button>…</button> som innehåller onClick={toggleFullscreen},
// utan att korsa en </button>-gräns.
const BTN_RE = /<button((?:(?!<\/button>)[\s\S])*?)onClick=\{toggleFullscreen\}(?:(?!<\/button>)[\s\S])*?<\/button>/;

let btnFixed = 0, cssRemoved = 0;

FILES.forEach(file => {
    const fp = path.join(ROOT, file);
    if (!fs.existsSync(fp)) { console.log('⚠️  saknas: ' + file); return; }
    let c = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // 1) Byt knappen.
    if (BTN_RE.test(c)) {
        c = c.replace(BTN_RE, STD_BTN);
        btnFixed++; changed = true;
    } else {
        console.log('ℹ️  ingen toggleFullscreen-knapp hittad i ' + file);
    }

    // 2) Ta bort lokala .fs-btn-overrides.
    const before = c;
    c = c.replace(/[ \t]*\.fs-btn:hover\s*\{[^}]*\}\s*\n?/g, '');
    c = c.replace(/[ \t]*\.fs-btn\s*\{[^}]*\}\s*\n?/g, '');
    if (c !== before) { cssRemoved++; changed = true; }

    if (changed) { fs.writeFileSync(fp, c, 'utf8'); console.log('✅ ' + file); }
});

console.log(`\nKlart — knappar bytta: ${btnFixed}, CSS-overrides borttagna: ${cssRemoved}`);
