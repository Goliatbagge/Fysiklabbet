#!/usr/bin/env node
// fix-laborans-css.js — post-build-skript för fysik2-rorelse (Snett kast).
//
// Vite strippar bort `<link rel="stylesheet" href="../styles-laborans*.css">`
// från index.html under build (externa stylesheets utanför projekt-roten
// plockas inte med). Resultatet: dist/index.html saknar Laborans-temat.
//
// Detta skript körs efter `vite build` (via npm "postbuild"-hook) och
// injicerar Laborans-länkarna i dist/index.html med korrekt path
// (`../../styles-laborans*.css`, eftersom dist/ ligger en nivå djupare
// än source).
//
// Skriptet är idempotent — om länkarna redan finns lämnas filen orörd.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distIndex = path.join(__dirname, 'dist', 'index.html');

if (!fs.existsSync(distIndex)) {
    console.error(`[fix-laborans-css] dist/index.html saknas: ${distIndex}`);
    process.exit(1);
}

let html = fs.readFileSync(distIndex, 'utf8');

const laboransLinks = [
    '<link rel="stylesheet" href="../../styles-laborans.css">',
    '<link rel="stylesheet" href="../../styles-laborans-sim.css">',
];

const alreadyHasBoth = laboransLinks.every(link => html.includes(link));
if (alreadyHasBoth) {
    console.log('[fix-laborans-css] dist/index.html redan korrekt — inget att göra.');
    process.exit(0);
}

// Plocka bort eventuella felaktiga `../`-versioner som Vite kanske kopierat.
html = html.replace(
    /\s*<link rel="stylesheet" href="\.\.\/styles-laborans[\w-]*\.css">/g,
    '',
);
// Plocka även bort ev. tidigare `../../`-länkar för att undvika dubbletter.
html = html.replace(
    /\s*<link rel="stylesheet" href="\.\.\/\.\.\/styles-laborans[\w-]*\.css">/g,
    '',
);

// Injicera direkt efter Google Fonts-länken (eller före </head> som fallback).
const fontsLineRe = /(<link href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>)/;
const injection = '\n    ' + laboransLinks.join('\n    ');

if (fontsLineRe.test(html)) {
    html = html.replace(fontsLineRe, `$1${injection}`);
} else {
    html = html.replace(/<\/head>/, `${injection}\n  </head>`);
}

fs.writeFileSync(distIndex, html, 'utf8');
console.log('[fix-laborans-css] dist/index.html uppdaterad: Laborans-CSS-länkar injicerade.');
