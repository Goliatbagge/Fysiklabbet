/**
 * verify-sim-vaxlare.js — går avsnittets ANDRA simulering att nå?
 *
 * Katalogen (katalog.html) länkar bara till avsnittets `href`. Har avsnittet
 * en andra simulering (`href2` i data/katalog.js) är avsnittsraden som
 * section-nav.js injicerar högst upp på simuleringssidorna den ENDA vägen
 * dit — och den raden ritas bara om sidan laddar både data/katalog.js och
 * section-nav.js, och får sina namn ur data/simuleringar.js.
 *
 * Felet har hänt (2026-08-23): flugan i bägaren lades som href2 på
 * fy1-3.3, men gick inte att nå från astronautsimuleringen — en besökare
 * som klickade "Simulering" i katalogen såg aldrig att den fanns.
 *
 * Skriptet kontrollerar för varje avsnitt med href2:
 *   1. att båda HTML-filerna finns,
 *   2. att BÅDA laddar data/katalog.js + section-nav.js (annars ingen rad),
 *   3. att data/simuleringar.js har ett eget namn för var och en av dem,
 *   4. att båda har egna nyckelord (kw) så att sökrutan hittar dem var för
 *      sig (samma krav som verify-sok.js ställer).
 *
 * Användning: node .claude/verify-sim-vaxlare.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Ladda katalogen och simuleringsnamnen i en minimal webbläsarkontext.
const win = {};
function loadGlobal(rel) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    new Function('window', src)(win);
}
loadGlobal('data/katalog.js');
loadGlobal('data/simuleringar.js');

const KATALOG = win.KATALOG || {};
const SIM_NAMES = win.SIM_NAMES || {};

// Alla avsnitt med två simuleringar
const pairs = [];
for (const subjKey of Object.keys(KATALOG)) {
    const courses = (KATALOG[subjKey] && KATALOG[subjKey].courses) || {};
    for (const courseKey of Object.keys(courses)) {
        const chapters = (courses[courseKey] && courses[courseKey].chapters) || {};
        for (const chapKey of Object.keys(chapters)) {
            for (const sec of (chapters[chapKey].sections || [])) {
                if (sec.href && sec.href2) {
                    pairs.push({ course: courseKey, num: sec.num, title: sec.title,
                                 href: sec.href, href2: sec.href2 });
                }
            }
        }
    }
}

// Namnet SIM_NAMES ger för en viss fil inom avsnittet (se data/simuleringar.js)
function entryFor(primary, target) {
    const entry = SIM_NAMES[primary];
    if (!entry) return null;
    if (typeof entry === 'string') {
        return primary.toLowerCase() === target.toLowerCase() ? { name: entry } : null;
    }
    if (!Array.isArray(entry)) return null;
    for (const e of entry) {
        if (e && typeof e === 'object' &&
            (e.href || primary).toLowerCase() === target.toLowerCase()) return e;
    }
    return null;
}

const problems = [];

for (const p of pairs) {
    const label = `${p.course} ${p.num} ${p.title}`;
    for (const file of [p.href, p.href2]) {
        const full = path.join(ROOT, file);
        if (!fs.existsSync(full)) {
            problems.push(`${label}: filen ${file} saknas`);
            continue;
        }
        // Sidorna laddar skripten antingen som vanlig <script src="…"> eller
        // via document.write med cache-buster ("…js?v=' + window.__CB"), så
        // leta efter filnamnet i sig — inte efter ett exakt src-attribut.
        const html = fs.readFileSync(full, 'utf8');
        if (!html.includes('section-nav.js')) {
            problems.push(`${label}: ${file} laddar inte section-nav.js — ` +
                `avsnittsraden ritas aldrig, så den andra simuleringen går inte att nå`);
        }
        if (!html.includes('data/katalog.js')) {
            problems.push(`${label}: ${file} laddar inte data/katalog.js — ` +
                `section-nav.js kan då inte slå upp avsnittet`);
        }
        const e = entryFor(p.href, file);
        if (!e || !e.name) {
            problems.push(`${label}: ${file} saknar namn i data/simuleringar.js ` +
                `(SIM_NAMES['${p.href}'] ska vara en array med en post per simulering)`);
        } else if (!Array.isArray(e.kw) || e.kw.length === 0) {
            problems.push(`${label}: "${e.name}" (${file}) saknar egna nyckelord (kw) ` +
                `i data/simuleringar.js — obligatoriskt när avsnittet har flera simuleringar`);
        }
    }
}

console.log('Verifierar växlingen mellan avsnittens simuleringar...\n');
console.log(`  ${pairs.length} avsnitt har två simuleringar.`);
for (const p of pairs) console.log(`    ${p.num} ${p.title}: ${p.href} + ${p.href2}`);
console.log('');
console.log('='.repeat(60));

if (problems.length) {
    console.log(`FEL! ${problems.length} problem:\n`);
    for (const m of problems) console.log('  - ' + m);
    process.exit(1);
}
console.log('OK! Bada simuleringarna gar att na fran avsnittsraden.');
