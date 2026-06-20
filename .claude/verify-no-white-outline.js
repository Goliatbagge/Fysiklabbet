/**
 * Verifiering: ingen vit kontur/halo runt etiketter eller pilar
 *
 * På ljusa scenbakgrunder (t.ex. "Laborans papper" #f7f2e8 → #ece3d2, eller
 * ljus himmel/mark i andra scener) får SVG-textetiketter och pilar ALDRIG
 * en vit eller nästan-vit kontur/halo — den ger bara en suddig vit gloria
 * och försämrar läsbarheten. Se CLAUDE.md, avsnittet
 * "⛔ FÖRBJUDET: vit kontur/halo runt text och pilar på ljus scenbakgrund".
 *
 * Detta script grep:ar alla *.html-filer i projektroten efter förbjudna
 * mönster:
 *   - stroke="#fff" / "#ffffff" / "white" (SVG-attribut, alla skiftlägen)
 *   - stroke: '#fff' / '#ffffff' / 'white' (inline style-objekt)
 *   - paintOrder/paint-order: stroke KOMBINERAT med vit stroke på samma rad
 *   - WebkitTextStroke / -webkit-text-stroke i vitt
 *   - textShadow/text-shadow med vit/nästan-vit färg (rgba 255,255,255)
 *   - canvas strokeStyle = '#fff' / '#ffffff' / 'white'
 *
 * En whitelist undantar kända legitima fall (muspekar-ikoner, fs-btn-ikoner
 * på mörka knappar, pappersfärgad halo #f3eee4 m.fl.) — bedömningen är
 * gjord manuellt mot scenens FAKTISKA bakgrund, inte filens tema.
 *
 * Användning: node .claude/verify-no-white-outline.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Whitelist: { fil: [understrängar som får förekomma på matchande rader] }
// Varje post är manuellt granskad mot scenens faktiska bakgrund.
const WHITELIST = {
    // Fartstrimmor mot mörk väg/rymd och glasreflektion på bilrutan —
    // sitter på mörka ytor, inte på ljust papper.
    'fysik1-newtons-forsta-app.html': [
        'stroke="#ffffff" strokeWidth="3" opacity={v > 1 ? s.op : 0}',   // fartstrimmor, mörk väg
        'stroke="#ffffff" strokeWidth="2.5" opacity={v > 1 ? s.op : 0}', // fartstrimmor, rymd
        '<path d="M -64,-13 L -46,-27 M -14,-13 L 4,-29" stroke="#ffffff"', // glasreflektion på vindruta
        'stroke="#ffffff" strokeWidth="1.5" />',                          // liten kontaktpunktsmarkör på mörk väg
    ],
    // Muspekar-ikon (cursor: url(...)) — inte en scen-etikett.
    'fysik1-elektriska-falt.html': [
        "cursor: url(\"data:image/svg+xml",
    ],
    // fs-btn/ljud-ikon på mörk, halvtransparent knapp.
    'fysik1-newtons-tredje-app.html': [
        'className="w-8 h-8"',
    ],
    // Drag-handtag vid plantoppen: vit ikon/kontur på en MÖRK kontrollcirkel
    // (fill={COL.ink}) — samma konvention som fs-btn, inte en halo på papper.
    'fysik1-lutande-plan-app.html': [
        'stroke="#fff" strokeWidth="1.5"',     // ring runt mörk handtagscirkel
        '<g stroke="#fff" strokeWidth="2" strokeLinecap="round"', // vit upp/ned-pil-ikon i handtaget
    ],
};

// Hämta alla *.html-filer direkt i projektroten (inte undermappar som
// design/, .shots/, node_modules/ osv.)
const htmlFiles = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .filter(f => fs.statSync(path.join(ROOT, f)).isFile());

// Regex-mönster för vit/nästan-vit kontur/halo.
const WHITE = `(#fff|#ffffff|white|rgba?\\(\\s*255\\s*,\\s*255\\s*,\\s*255)`;

const PATTERNS = [
    // SVG/JSX-attribut: stroke="#fff" / stroke="white" m.fl.
    { name: 'stroke=vit (SVG-attribut)', re: new RegExp(`stroke\\s*=\\s*["']${WHITE}["']`, 'i') },
    // Inline style-objekt: stroke: '#fff'
    { name: 'stroke: vit (style-objekt)', re: new RegExp(`stroke\\s*:\\s*['"]${WHITE}['"]`, 'i') },
    // Canvas: ctx.strokeStyle = '#fff'
    { name: 'strokeStyle = vit (canvas)', re: new RegExp(`strokeStyle\\s*=\\s*['"]${WHITE}['"]`, 'i') },
    // WebkitTextStroke i vitt
    { name: 'WebkitTextStroke vit', re: new RegExp(`(WebkitTextStroke|-webkit-text-stroke)[^;\\n]*${WHITE}`, 'i') },
    // text-shadow/textShadow med vit/nästan-vit färg
    { name: 'text-shadow vit', re: new RegExp(`(textShadow|text-shadow)\\s*:\\s*[^;\\n]*rgba?\\(\\s*255\\s*,\\s*255\\s*,\\s*255`, 'i') },
    // paintOrder: stroke KOMBINERAT med vit stroke på samma rad
    { name: 'paintOrder: stroke + vit kontur', re: new RegExp(`(paintOrder|paint-order)\\s*:?\\s*['"]?stroke['"]?[^\\n]*stroke\\s*[:=]\\s*['"]${WHITE}['"]`, 'i'),
      altRe: new RegExp(`stroke\\s*[:=]\\s*['"]${WHITE}['"][^\\n]*(paintOrder|paint-order)\\s*:?\\s*['"]?stroke['"]?`, 'i') },
];

let hasErrors = false;
let totalFindings = 0;

console.log('Verifierar att inga vita konturer/halor finns runt etiketter/pilar...\n');

htmlFiles.forEach(filename => {
    const filepath = path.join(ROOT, filename);
    const lines = fs.readFileSync(filepath, 'utf-8').split('\n');
    const allowed = WHITELIST[filename] || [];

    lines.forEach((line, idx) => {
        for (const pattern of PATTERNS) {
            const matches = pattern.re.test(line) || (pattern.altRe && pattern.altRe.test(line));
            if (!matches) continue;

            // Whitelistad rad? (känt, manuellt granskat undantag)
            if (allowed.some(substr => line.includes(substr))) continue;

            hasErrors = true;
            totalFindings++;
            console.log(`FEL: ${filename}:${idx + 1} — ${pattern.name}`);
            console.log(`   ${line.trim()}`);
            console.log('');
        }
    });
});

console.log('='.repeat(60));

if (hasErrors) {
    console.log(`MISSLYCKADES! ${totalFindings} förekomst(er) av vit kontur/halo hittades.`);
    console.log('');
    console.log('Åtgärd (se CLAUDE.md, "⛔ FÖRBJUDET: vit kontur/halo..."):');
    console.log('  1. Ta bort konturen helt — mörk/mättad textfärg räcker mot ljus bakgrund.');
    console.log('  2. Behövs separation: använd en diskret halo i scenens papperston');
    console.log('     (t.ex. #f3eee4, strokeWidth <= 3) — aldrig vitt.');
    console.log('  3. Hellre flytta etiketten till en lugn yta än att lösa en kollision');
    console.log('     med kontur.');
    console.log('');
    console.log('Är fyndet ett LEGITIMT undantag (ikon på mörk knapp, muspekare, mörk');
    console.log('scen)? Lägg då till en post i WHITELIST i .claude/verify-no-white-outline.js');
    console.log('med en kort kommentar om varför.');
    process.exit(1);
} else {
    console.log('OK! Inga vita konturer/halor runt etiketter/pilar på ljus bakgrund.');
    process.exit(0);
}
