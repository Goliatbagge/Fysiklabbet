#!/usr/bin/env node
// migrate-labsim.js — applicera Laborans-sim-stilen på simuleringar.
//
// Detta är steg 2 ovanpå migrate-navbar.js. Det lägger till:
//   1. <link rel="stylesheet" href="styles-laborans-sim.css?v=..."> i <head>
//   2. class="lab-sim" på <body> (bibehåller befintliga klasser)
//   3. data-theme="ljusPapper" på canvas-wrap/scene-wrap/wave-stage
//      — såvida filen INTE finns i SPACE_FILES (då lämnas wrappern utan attribut,
//        vilket gör att default-temat "morkRymd" används).
//
// Användning:
//   node .claude/migrate-labsim.js fil.html [fil2.html ...]
//   node .claude/migrate-labsim.js --all   (alla fysik1-*.html / fysik2-*.html)
//
// Idempotent — säkert att köra flera gånger.

const fs = require('fs');
const path = require('path');

// Sidor där det canvas-/scen-baserade innehållet uppenbart utspelar sig i rymd
// eller är så mörkt i sin natur (emissionsspektra, blackbody-stjärnor) att
// "Ljus papper" inte är meningsfullt. Body förblir lab-sim (papper) men
// canvas-wrap/scene-wrap får INGEN data-theme-attribut (default = morkRymd).
const SPACE_FILES = new Set([
    'fysik1-newtons-gravitationslag.html',
    'fysik2-rorelse.html',
    'fysik2-rorelse-app.html',
    'fysik2-rorelse-wrapper.html',
    'fysik2-spektrallinjer.html',
    'fysik2-energinivaer.html',
    'fysik2-manens-faser.html',
    'fysik2-solens-farg.html',
    'fysik2-wiens-lag.html',
    'fysik2-em-stralning.html',
]);

const SIM_CSS_TAG = `<script>document.write('<link rel="stylesheet" href="styles-laborans-sim.css?v=' + window.__CB + '">');</script>`;

function migrate(filePath) {
    const abs = path.resolve(filePath);
    const baseName = path.basename(filePath);
    let content = fs.readFileSync(abs, 'utf8');
    const original = content;

    // ─── 1. Lägg till styles-laborans-sim.css i <head> ────────────────
    if (!content.includes('styles-laborans-sim.css')) {
        // Föredra att placera direkt efter styles-laborans.css-länken
        const labCssMatch = content.match(
            /(<script>document\.write\(['"]<link rel="stylesheet" href="styles-laborans\.css\?v=['"]\s*\+\s*window\.__CB\s*\+\s*['"]['"]>['"]\);<\/script>)/
        );
        if (labCssMatch) {
            content = content.replace(
                labCssMatch[1],
                `${labCssMatch[1]}\n    ${SIM_CSS_TAG}`
            );
        } else {
            // Fallback: lägg in direkt före </head>
            content = content.replace(/<\/head>/, `    ${SIM_CSS_TAG}\n</head>`);
        }
    }

    // ─── 2. Sätt class="lab-sim" på <body> ────────────────────────────
    // Hanterar tre fall:
    //   a) <body>                            → <body class="lab-sim">
    //   b) <body class="x y">                → <body class="x y lab-sim">
    //   c) <body ... class="lab-sim"...>     → ingen ändring (idempotent)
    content = content.replace(/<body([^>]*)>/, (match, attrs) => {
        if (/\blab-sim\b/.test(attrs)) return match;
        const classMatch = attrs.match(/\sclass="([^"]*)"/);
        if (classMatch) {
            const newClasses = (classMatch[1].trim() + ' lab-sim').trim();
            return `<body${attrs.replace(/\sclass="[^"]*"/, ` class="${newClasses}"`)}>`;
        }
        return `<body${attrs} class="lab-sim">`;
    });

    // ─── 3. data-theme="ljusPapper" på canvas-/scen-wrappers ──────────
    //   - Endast för sidor som INTE är i SPACE_FILES.
    //   - Endast om wrappern inte redan har data-theme satt (idempotent).
    //   - Stödjer både className (JSX) och class (vanlig HTML).
    if (!SPACE_FILES.has(baseName)) {
        const wrapClasses = ['canvas-wrap', 'scene-wrap', 'wave-stage'];
        for (const cls of wrapClasses) {
            // JSX: className="canvas-wrap" eller className="canvas-wrap foo"
            const jsxRe = new RegExp(
                `(className=["'][^"']*\\b${cls}\\b[^"']*["'])(?![^<>]*data-theme)`,
                'g'
            );
            content = content.replace(jsxRe, '$1 data-theme="ljusPapper"');
            // HTML: class="canvas-wrap" eller class="canvas-wrap foo"
            const htmlRe = new RegExp(
                `(<[a-zA-Z]+[^>]*\\sclass=["'][^"']*\\b${cls}\\b[^"']*["'])(?![^<>]*data-theme)`,
                'g'
            );
            content = content.replace(htmlRe, '$1 data-theme="ljusPapper"');
        }
    }

    if (content === original) {
        console.log(`  · ${baseName}: redan migrerad`);
        return false;
    }

    fs.writeFileSync(abs, content, 'utf8');
    console.log(`  ✓ ${baseName}${SPACE_FILES.has(baseName) ? ' (rymd-tema)' : ''}`);
    return true;
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Användning: node .claude/migrate-labsim.js fil.html [fil2.html ...]');
    console.log('             node .claude/migrate-labsim.js --all');
    process.exit(1);
}

let targets = args;
if (args[0] === '--all') {
    const root = path.resolve(__dirname, '..');
    targets = fs.readdirSync(root)
        .filter(f => /^fysik[12]-.+\.html$/.test(f))
        .map(f => path.join(root, f));
}

let migrated = 0;
targets.forEach(f => { if (migrate(f)) migrated++; });
console.log(`\nKlart. ${migrated} av ${targets.length} filer ändrade.`);
