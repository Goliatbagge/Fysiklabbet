// ============================================================
// Bygger uppläsningsmanus (JSON) för talsyntesen.
//
//   node data/tts/build-manus.js
//
// - Teoriavsnitten renderas i headless Chrome via export-manus.html
//   (kräver att dev-servern kör: python .claude/dev-server.py 8000)
//   → data/tts/manus/teori.json
//
// Nyhetsartiklar har INGEN uppläsning (borttaget 2026-07-18) — bara
// teoriavsnitten genereras.
//
// Kör därefter: python data/tts/generate-audio.py
// ============================================================

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(__dirname, 'manus');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:8000/data/tts/export-manus.html';

fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- Teori: headless Chrome → JSON ur <pre id="out"> ----------

function buildTeori() {
    process.stdout.write('Renderar teoriavsnitten i headless Chrome ... ');
    const dom = execFileSync(CHROME, [
        '--headless=new', '--disable-gpu', '--hide-scrollbars',
        '--virtual-time-budget=120000',
        '--dump-dom', URL,
    ], { maxBuffer: 64 * 1024 * 1024, encoding: 'utf8' });

    if (!dom.includes('MANUS-KLAR')) {
        throw new Error('Exportsidan blev inte klar (titeln "MANUS-KLAR" saknas). Kör dev-servern på port 8000?');
    }
    const m = dom.match(/<pre id="out">([\s\S]*?)<\/pre>/);
    if (!m || !m[1].trim()) throw new Error('Hittade ingen manus-JSON i exportsidan.');
    const json = m[1]
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
    const docs = JSON.parse(json);

    // Normalisera unicode-superscript i rubriker/prosa (t.ex. titeln "Derivatan
    // av eˣ") som TTS annars läser fel. KaTeX-formler i brödtexten sköts av
    // manus-lib; detta gäller bara löptext utanför math-block.
    const normalizeSuper = (s) => s
        .replace(/eᵏˣ/g, 'e upphöjt till k x')
        .replace(/eˣ/g, 'e upphöjt till x')
        .replace(/aˣ/g, 'a upphöjt till x');
    for (const d of docs) {
        if (d.title) d.title = normalizeSuper(d.title);
        for (const seg of (d.segments || [])) {
            if (seg && seg.t) seg.t = normalizeSuper(seg.t);
        }
    }

    const errors = docs.filter((d) => d.error);
    if (errors.length) {
        console.warn('\nVARNING: fel i avsnitt:', errors.map((d) => d.id + ': ' + d.error).join('; '));
    }
    const out = docs.filter((d) => !d.error && d.segments.length);
    fs.writeFileSync(path.join(OUT_DIR, 'teori.json'), JSON.stringify(out, null, 1), 'utf8');
    const nSeg = out.reduce((s, d) => s + d.segments.length, 0);
    console.log(`klart. ${out.length} avsnitt, ${nSeg} segment → manus/teori.json`);
}

buildTeori();
