#!/usr/bin/env node
// tag-glossary.js — auto-taggar fysikaliska begrepp i data/teori/*.md
// baserat på data/teori/glossary.js. Markerar FÖRSTA förekomsten av varje
// term per fil med [[term|tip]]-syntax.
//
// Strategin:
//   1. UNTAG först — tar bort alla [[term|tip]] (rekursivt för att hantera
//      ev. nested) så vi alltid jobbar från ren markdown.
//   2. SKYDDA chunks som inte ska taggas: frontmatter, math-block,
//      code-block, markdown-länkar, block-directives, rubriker (#..),
//      och tabell-rader.
//   3. För varje glossary-entry: hitta första matchen i skyddad md,
//      ersätt med placeholder så att efterföljande matchningar inte
//      hittar termen inom redan-taggade tip-texter.
//
// Användning:
//   node .claude/tag-glossary.js                  # alla .md-filer
//   node .claude/tag-glossary.js fy1-3.3          # bara denna fil
//   node .claude/tag-glossary.js fy1              # alla fy1-*.md

const fs = require('fs');
const path = require('path');

const teoriDir = path.resolve(__dirname, '../data/teori');
const glossary = require(path.join(teoriDir, 'glossary.js'));

// Sortera entries så att längst form först (specifik före allmän).
const entries = [...glossary]
    .sort((a, b) => {
        const maxA = Math.max(...a.forms.map(f => f.length));
        const maxB = Math.max(...b.forms.map(f => f.length));
        return maxB - maxA;
    })
    .map(e => {
        const forms = [...e.forms].sort((a, b) => b.length - a.length);
        const escaped = forms.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        return {
            re: new RegExp(`\\b(${escaped.join('|')})\\b`, 'i'),
            tip: e.tip,
        };
    });

// Rensa ut alla [[term|tip]] (rekursivt — gör om tills inga kvarvarande).
function untag(md) {
    let prev;
    do {
        prev = md;
        // Innerst-och-ut: matcha [[X|Y]] där varken X eller Y har [
        md = md.replace(/\[\[([^\[\]|\n]+)\|[^\[\]\n]+\]\]/g, '$1');
    } while (md !== prev);
    return md;
}

// Skydda chunks som inte ska taggas.
function protect(md) {
    const tokens = [];
    function push(m) { tokens.push(m); return `\x01P${tokens.length - 1}\x01`; }
    md = md.replace(/^---\n[\s\S]+?\n---\n/, push);              // frontmatter
    md = md.replace(/\$\$[\s\S]+?\$\$/g, push);                  // display math
    md = md.replace(/\$[^\n$]+?\$/g, push);                      // inline math
    md = md.replace(/```[\s\S]+?```/g, push);                    // fenced code
    md = md.replace(/`[^`\n]+`/g, push);                         // inline code
    md = md.replace(/!\[[^\]]*\]\([^)]+\)/g, push);              // image
    md = md.replace(/\[[^\]]+\]\([^)]+\)/g, push);               // link
    md = md.replace(/^:::\s*\S+(\s+"[^"]*")?\s*$/gm, push);      // ::: directive
    md = md.replace(/^#{1,6}\s+.+$/gm, push);                    // rubriker
    md = md.replace(/^\|.+\|\s*$/gm, push);                      // tabell-rader
    return { md, tokens };
}

function restore(md, tokens) {
    return md.replace(/\x01P(\d+)\x01/g, (_, i) => tokens[+i]);
}

function tagFile(content) {
    const cleaned = untag(content);
    let { md, tokens } = protect(cleaned);
    let changed = 0;
    for (const { re, tip } of entries) {
        const m = md.match(re);
        if (!m) continue;
        const orig = m[0];
        const safeTip = tip.replace(/\|/g, '\\|').replace(/\]/g, '\\]');
        const tag = `[[${orig}|${safeTip}]]`;
        // Sätt taggen som ny protected token, så att efterföljande
        // entries inte matchar termer INOM dess tip-text.
        const placeholder = `\x01P${tokens.length}\x01`;
        tokens.push(tag);
        md = md.replace(re, placeholder);
        changed++;
    }
    return { result: restore(md, tokens), changed };
}

const arg = process.argv[2];
let files = fs.readdirSync(teoriDir).filter(f => f.endsWith('.md'));
if (arg) files = files.filter(f => f.startsWith(arg) || f === arg + '.md');
files.sort();

let totalChanged = 0;
let filesChanged = 0;
for (const f of files) {
    const p = path.join(teoriDir, f);
    const orig = fs.readFileSync(p, 'utf8');
    const { result, changed } = tagFile(orig);
    if (result !== orig) {
        fs.writeFileSync(p, result);
        filesChanged++;
        totalChanged += changed;
        console.log(`✓ ${f} — ${changed} begrepp markerade`);
    }
}

console.log(`\nKlart: ${totalChanged} begrepp i ${filesChanged} filer (av ${files.length} processade).`);
