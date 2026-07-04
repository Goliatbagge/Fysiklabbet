// ============================================================
// Bygger uppläsningsmanus (JSON) för talsyntesen.
//
//   node data/tts/build-manus.js
//
// - Teoriavsnitten renderas i headless Chrome via export-manus.html
//   (kräver att dev-servern kör: python .claude/dev-server.py 8000)
//   → data/tts/manus/teori.json
// - Nyheterna byggs direkt i Node ur data/nyheter.js
//   → data/tts/manus/nyheter.json
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

    const errors = docs.filter((d) => d.error);
    if (errors.length) {
        console.warn('\nVARNING: fel i avsnitt:', errors.map((d) => d.id + ': ' + d.error).join('; '));
    }
    const out = docs.filter((d) => !d.error && d.segments.length);
    fs.writeFileSync(path.join(OUT_DIR, 'teori.json'), JSON.stringify(out, null, 1), 'utf8');
    const nSeg = out.reduce((s, d) => s + d.segments.length, 0);
    console.log(`klart. ${out.length} avsnitt, ${nSeg} segment → manus/teori.json`);
}

// ---------- Nyheter: ren Node ur data/nyheter.js ----------

function decodeEntities(s) {
    return String(s)
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
}

function stripTags(html) {
    return decodeEntities(String(html).replace(/<[^>]+>/g, ''))
        .replace(/\s+/g, ' ').trim();
}

function buildNyheter() {
    global.window = {};
    require(path.join(ROOT, 'data', 'nyheter.js'));
    const arts = global.window.NYHETER_ALL || global.window.NYHETER || [];
    const T = require('./manus-lib.js');

    const docs = arts.map((a) => {
        const texts = [];
        if (a.title) texts.push(a.title.trim().replace(/[.!?]$/, '') + '.');
        if (a.deck) texts.push(stripTags(a.deck));
        for (const b of a.body || []) {
            if (b.type === 'h2') texts.push(stripTags(b.text).replace(/[.!?]$/, '') + '.');
            else if (b.type === 'quote') texts.push(stripTags(b.html));
            else if (b.type === 'fact') {
                if (b.title) texts.push(stripTags(b.title).replace(/[.!?]$/, '') + '.');
                for (const it of b.items || []) texts.push(stripTags(it));
            }
            else if (b.html) texts.push(stripTags(b.html));
        }
        const segments = [];
        for (const t of texts) {
            for (const sen of T.splitSentences(T.expandPlainText(t))) {
                segments.push({ t: sen });
            }
        }
        return { id: a.id, title: a.title, segments };
    }).filter((d) => d.segments.length);

    fs.writeFileSync(path.join(OUT_DIR, 'nyheter.json'), JSON.stringify(docs, null, 1), 'utf8');
    const nSeg = docs.reduce((s, d) => s + d.segments.length, 0);
    console.log(`Nyheter: ${docs.length} artiklar, ${nSeg} segment → manus/nyheter.json`);
}

buildTeori();
buildNyheter();
