#!/usr/bin/env node
// Bygger data/teori/bundle.js från alla *.md-filer i samma mapp.
// Resultatet sätter window.TEORI = { 'fy1-2.3': '<markdown>', ... }.
// Kör: node data/teori/build.js

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort();

// --- Transform inom math-block: gör subscripts upright.
// I fysik är subscripts nästan alltid identifierare/etiketter (N=normal,
// f=friktion, G=gravitation, drag, tot, ...) — inte variabler. KaTeX renderar
// dem dock som kursiva som default, vilket vi inte vill ha.
//
// Mönster som transformeras:
//   _X            → _\mathrm{X}            (X = enstaka bokstav)
//   _{abc}        → _\mathrm{abc}           (rena bokstäver/siffror)
//   _\text{X}     → _\mathrm{X}             (font-konsistens)
//
// Siffror lämnas oförändrade — KaTeX renderar dem redan upright.
function uprightSubscripts(math) {
    // _\text{X} → _\mathrm{X}
    math = math.replace(/_\\text\{([^{}]+)\}/g, '_\\mathrm{$1}');
    // _{...} där ... inte innehåller LaTeX-kommandon (inga backslashes)
    math = math.replace(/_\{([^\\{}]+)\}/g, function (m, inner) {
        if (/^\d+$/.test(inner)) return m; // bara siffror — lämna
        return '_\\mathrm{' + inner + '}';
    });
    // _<enstaka bokstav> följt av icke-bokstav. OBS: undvik att matcha
    // om föregående tecken redan är del av \mathrm eller liknande.
    math = math.replace(/_([A-Za-z])(?![A-Za-z{])/g, '_\\mathrm{$1}');
    return math;
}

// --- Ersätt mellanslag i tusentalsavgränsningar med non-breaking space
// (U+00A0) så att "1 000 kg" inte radbryts. Hoppar över innehåll inom
// $...$ och $$...$$ där KaTeX hanterar avstånd själv (\,  \;).
function transformMd(md) {
    const tokens = [];
    md = md.replace(/\$\$[\s\S]+?\$\$/g, (m) => {
        tokens.push(uprightSubscripts(m));
        return '@@MATHBLOCK' + (tokens.length - 1) + '@@';
    });
    md = md.replace(/\$[^\n$]+?\$/g, (m) => {
        tokens.push(uprightSubscripts(m));
        return '@@MATHBLOCK' + (tokens.length - 1) + '@@';
    });
    let prev;
    do {
        prev = md;
        md = md.replace(/(\d) (\d{3})(?!\d)/g, '$1 $2');
    } while (md !== prev);
    md = md.replace(/@@MATHBLOCK(\d+)@@/g, (_, i) => tokens[+i]);
    return md;
}

const out = {};
for (const f of files) {
    const id = f.replace(/\.md$/, '');
    out[id] = transformMd(fs.readFileSync(path.join(dir, f), 'utf-8'));
}

const banner = '/* Auto-genererad av data/teori/build.js. Redigera *.md-filerna, kör sedan om skriptet. */\n';
const bundle = banner + 'window.TEORI = ' + JSON.stringify(out, null, 2) + ';\n';

fs.writeFileSync(path.join(dir, 'bundle.js'), bundle);
console.log('Bundlade ' + files.length + ' teori-filer till data/teori/bundle.js');
for (const f of files) console.log('  - ' + f);
