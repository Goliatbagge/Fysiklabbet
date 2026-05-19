#!/usr/bin/env node
// audit-dark-bg.js — sök efter återstående mörka bg-källor i sim-filer.
//
// OBLIGATORISK: kör detta INNAN du säger till användaren att hård-refresha en sim.
// Användaren har upprepade gånger fått fixa kvarvarande svarta bakgrunder —
// det är samma typ av fel varje gång och det måste fångas innan visning.
//
// Användning:
//   node .claude/audit-dark-bg.js fil.html [fil2.html ...]
//   node .claude/audit-dark-bg.js --all
//
// Avslutar med exit-kod 1 om träffar finns, 0 om inga.

const fs = require('fs');
const path = require('path');

const SPACE_FILES = new Set([
    'fysik1-newtons-gravitationslag.html',
    'fysik1-newtons-tredje-app.html',
    'fysik1-tyngdfaktor-jorden.html',
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

function isDarkHex(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length !== 6) return false;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    return (0.299 * r + 0.587 * g + 0.114 * b) < 60;
}

const OUR_OUTPUTS = new Set(['#f3eee4', '#0f1620', '#ffffff', '#c8324a']);

function audit(filePath) {
    const baseName = path.basename(filePath);
    if (SPACE_FILES.has(baseName)) return null;
    const c = fs.readFileSync(filePath, 'utf8');
    const issues = {
        svgFill: [],
        svgStroke: [],
        ctxFill: [],
        ctxStroke: [],
        cssGrad: [],
        cssBg: [],
        threeColor: [],
        jsxBg: [],
        gradStops: [],
    };
    const lines = c.split('\n');
    lines.forEach((line, i) => {
        const lineno = i + 1;
        // SVG fill/stroke med mörk hex
        const svgFillRe = /(?:fill|stroke)="(#[0-9a-fA-F]{3,6})"/g;
        let m;
        while ((m = svgFillRe.exec(line)) !== null) {
            if (isDarkHex(m[1]) && !OUR_OUTPUTS.has(m[1].toLowerCase())) {
                if (line.includes('fill=')) issues.svgFill.push(`${lineno}: ${m[1]}`);
                else issues.svgStroke.push(`${lineno}: ${m[1]}`);
            }
        }
        // Canvas fillStyle/strokeStyle (utom keep-dark)
        if (!/keep-dark/i.test(line)) {
            const ctxRe = /ctx\.(fillStyle|strokeStyle)\s*=\s*['"`](#[0-9a-fA-F]{3,6})['"`]/g;
            while ((m = ctxRe.exec(line)) !== null) {
                if (isDarkHex(m[2]) && !OUR_OUTPUTS.has(m[2].toLowerCase())) {
                    if (m[1] === 'fillStyle') issues.ctxFill.push(`${lineno}: ${m[2]}`);
                    else issues.ctxStroke.push(`${lineno}: ${m[2]}`);
                }
            }
        }
        // CSS dark gradients
        if (/background[^;:"']{0,30}linear-gradient/.test(line) && /#[0-3][0-9a-fA-F]{5}/.test(line)) {
            const hexes = line.match(/#[0-9a-fA-F]{3,6}/g) || [];
            const dark = hexes.filter(h => isDarkHex(h));
            if (dark.length >= hexes.length * 0.5) {
                issues.cssGrad.push(`${lineno}: ${dark.join(',')}`);
            }
        }
        // CSS background: #XXX
        const cssBgRe = /\bbackground(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,6})\s*;/g;
        while ((m = cssBgRe.exec(line)) !== null) {
            if (isDarkHex(m[1]) && !OUR_OUTPUTS.has(m[1].toLowerCase())) {
                issues.cssBg.push(`${lineno}: ${m[1]}`);
            }
        }
        // Three.js color literals
        const threeRe = /(?:setClearColor|new\s+THREE\.Color|scene\.background\s*=\s*new\s+THREE\.Color|fog\s*=\s*new\s+THREE\.Fog)\(\s*0x([0-9a-fA-F]{6})/g;
        while ((m = threeRe.exec(line)) !== null) {
            if (isDarkHex('#' + m[1])) {
                issues.threeColor.push(`${lineno}: 0x${m[1]}`);
            }
        }
        // JSX inline background
        const jsxBgRe = /(?:background|backgroundColor):\s*['"`](#[0-9a-fA-F]{3,6})['"`]/g;
        while ((m = jsxBgRe.exec(line)) !== null) {
            if (isDarkHex(m[1]) && !OUR_OUTPUTS.has(m[1].toLowerCase())) {
                issues.jsxBg.push(`${lineno}: ${m[1]}`);
            }
        }
        // Canvas gradient stops
        const stopRe = /addColorStop\(\s*[\d.]+\s*,\s*['"`](#[0-9a-fA-F]{3,6})['"`]\s*\)/g;
        while ((m = stopRe.exec(line)) !== null) {
            if (isDarkHex(m[1])) {
                issues.gradStops.push(`${lineno}: ${m[1]}`);
            }
        }
    });
    const total = Object.values(issues).reduce((s, arr) => s + arr.length, 0);
    return total > 0 ? { file: baseName, total, issues } : null;
}

const args = process.argv.slice(2);
let targets = args;
const root = path.resolve(__dirname, '..');
if (args.length === 0 || args[0] === '--all') {
    targets = fs.readdirSync(root)
        .filter(f => /^fysik[12]-.+\.html$/.test(f))
        .map(f => path.join(root, f));
}

let problemFiles = 0;
let problemTotal = 0;
for (const f of targets) {
    const result = audit(f);
    if (result) {
        problemFiles++;
        problemTotal += result.total;
        console.log(`\n⚠ ${result.file} — ${result.total} mörka träffar:`);
        for (const [k, arr] of Object.entries(result.issues)) {
            if (arr.length) console.log(`   ${k} (${arr.length}):`, arr.slice(0, 3).join(' | '));
        }
    }
}

console.log('\n' + '='.repeat(60));
if (problemFiles > 0) {
    console.log(`❌ ${problemFiles} filer har ${problemTotal} kvarvarande mörka bg-källor.`);
    console.log('Fixa dessa INNAN du levererar till användaren.');
    process.exit(1);
} else {
    console.log(`✓ ${targets.length} filer rena. Inga kvarvarande mörka bg-källor.`);
    process.exit(0);
}
