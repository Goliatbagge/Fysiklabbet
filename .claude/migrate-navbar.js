#!/usr/bin/env node
// migrate-navbar.js — byt ut gammal <nav class="navbar"> mot Laborans-versionen.
//
// Användning:
//   node .claude/migrate-navbar.js fil.html [fil2.html ...]
//   node .claude/migrate-navbar.js --all      (alla fysik1-*.html, fysik2-*.html)
//
// Skriptet är idempotent — körs filen två gånger händer inget andra gången.

const fs = require('fs');
const path = require('path');

const HEAD_ADDITIONS = `
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script>window.__CB = String(Date.now());</script>
    <script>document.write('<link rel="stylesheet" href="styles-laborans.css?v=' + window.__CB + '">');</script>`;

const NEW_NAVBAR = `    <div class="lab-topbar lab-topbar--on-sim">
        <div class="lab-topbar-inner">
            <span>FYSIKLABBET — TEORI, SIMULERINGAR OCH ÖVNINGAR I FYSIK</span>
        </div>
    </div>

    <div class="lab-header lab-header--on-sim">
        <div class="lab-header-inner">
            <a class="lab-logo" href="index.html">
                <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
                    <g fill="none" stroke="currentColor" stroke-width="1">
                        <ellipse cx="18" cy="18" rx="15" ry="6" />
                        <ellipse cx="18" cy="18" rx="15" ry="6" transform="rotate(60 18 18)" />
                        <ellipse cx="18" cy="18" rx="15" ry="6" transform="rotate(120 18 18)" />
                    </g>
                    <circle cx="18" cy="18" r="2.5" fill="var(--lab-accent)" />
                </svg>
                <span class="lab-logo-text">Fysiklabbet</span>
            </a>
            <nav class="lab-nav" aria-label="Huvudnavigation">
                <a href="index.html">Start</a>
                <a href="om.html">Om</a>
                <a href="kontakt.html">Kontakt</a>
            </nav>
        </div>
    </div>`;

function migrate(filePath) {
    const abs = path.resolve(filePath);
    let content = fs.readFileSync(abs, 'utf8');
    const original = content;

    // 1. Lägg till Laborans-CSS + fonts i <head> direkt efter styles.css
    //    (idempotent: hoppa över om styles-laborans.css redan finns)
    if (!content.includes('styles-laborans.css')) {
        content = content.replace(
            /(<link rel="stylesheet" href="styles\.css">)/,
            `$1${HEAD_ADDITIONS}`
        );
    }

    // 2. Ersätt gammal <nav class="navbar"> ... </nav> med Laborans navbar.
    //    Regex matchar från <nav class="navbar"> till första </nav>.
    const navRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
    if (navRegex.test(content)) {
        content = content.replace(navRegex, NEW_NAVBAR);
    } else if (!content.includes('lab-topbar--on-sim')) {
        console.warn(`  ⚠ ${path.basename(filePath)}: hittade ingen <nav class="navbar"> och ingen Laborans-navbar — hoppar över`);
        return false;
    }

    if (content === original) {
        console.log(`  · ${path.basename(filePath)}: redan migrerad`);
        return false;
    }

    fs.writeFileSync(abs, content, 'utf8');
    console.log(`  ✓ ${path.basename(filePath)}`);
    return true;
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Användning: node .claude/migrate-navbar.js fil.html [fil2.html ...]');
    console.log('             node .claude/migrate-navbar.js --all');
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
