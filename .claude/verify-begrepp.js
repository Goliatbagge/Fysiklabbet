// Validerar begreppsordlistan (data/begrepp.js):
//   • syntax och schema (id, term, former, kort, body, relaterade)
//   • att uppslagsordet självt går att länka (termen finns bland former)
//   • att ingen böjningsform tillhör två begrepp (tvetydig länkning)
//   • att formerna faktiskt matchar som HELA ord med samma regex som
//     begrepp-lank.js bygger — och inte träffar mitt inuti andra ord
//   • typografi: emoji, Unicode-superscript, raka citattecken
//   • täckning: vilka begrepp som förekommer i data/nyheter.js (rapport)
//
// Kör före commit när data/begrepp.js ändrats.
//   node .claude/verify-begrepp.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function loadWindowScript(file) {
    const src = fs.readFileSync(file, 'utf8');
    const window = {};
    new Function('window', 'Date', src)(window, Date);
    return window;
}

const errors = [];
const warnings = [];

let BEGREPP;
try {
    BEGREPP = loadWindowScript(path.join(ROOT, 'data/begrepp.js')).BEGREPP;
} catch (e) {
    console.error('SYNTAXFEL i data/begrepp.js:', e.message);
    process.exit(1);
}
if (!Array.isArray(BEGREPP)) {
    console.error('data/begrepp.js sätter inte window.BEGREPP till en array.');
    process.exit(1);
}

// Emoji och dekorativa piktogram är förbjudna (CLAUDE.md). Matematiska och
// typografiska tecken (→ · ° ⟂ ± grekiska) är däremot tillåtna.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;
const SUPERSCRIPT = /[⁰¹²³⁴-ₜ]/;
const BLOCK_TYPES = new Set(['p', 'h2', 'fact']);
const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Samma ordgräns-regex som begrepp-lank.js bygger, för en form.
function formRegex(form) {
    return new RegExp(
        '(?<![\\p{L}\\p{N}_])(?:' + escapeRe(form).replace(/ /g, '[\\s\\u00a0]+') + ')s?(?![\\p{L}\\p{N}_])',
        'iu'
    );
}

// `plain: true` för fält som renderas som REN TEXT (term och kort). De visas
// som React-textbarn i uppslaget, i A–Ö-listan och i sökträffarna, och sätts
// med textContent i popovern — all HTML i dem hamnar SYNLIG på skärmen
// ("9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km"). Använd literalt hårt
// mellanslag (U+00A0) i stället för &nbsp;, och skriv om exponenter i ord.
function checkText(etikett, text, plain) {
    const s = String(text);
    if (EMOJI.test(s)) errors.push(`${etikett}: innehåller emoji/piktogram`);
    if (SUPERSCRIPT.test(s)) errors.push(`${etikett}: Unicode-superscript — använd <sup>…</sup>`);
    if (/"/.test(s)) warnings.push(`${etikett}: rakt citattecken " — använd ”`);
    if (/\d,\d*\s*\.\s*\d/.test(s)) warnings.push(`${etikett}: blandad decimalpunkt/komma?`);
    // Ordlistan renderas som ren HTML — det finns ingen KaTeX på begrepp.html.
    // Ett math-block skulle visas bokstavligt, med dollartecken och allt.
    if (/\$[^$]{1,60}\$/.test(s)) {
        errors.push(`${etikett}: math-block ($…$) renderas inte här — skriv <em>x</em> och &nbsp;`);
    }

    if (plain) {
        const taggar = s.match(/<[^>]+>/g);
        if (taggar) {
            errors.push(`${etikett}: HTML-taggar (${[...new Set(taggar)].join(' ')}) visas bokstavligt — fältet renderas som ren text`);
        }
        const ent = s.match(/&[a-zA-Z#][a-zA-Z0-9]{1,9};/g);
        if (ent) {
            errors.push(`${etikett}: HTML-entiteter (${[...new Set(ent)].join(' ')}) visas bokstavligt — använd tecknet självt (hårt mellanslag = U+00A0)`);
        }
    }

    // Tal och enhet ska hållas ihop. Ordgränsen måste vara unicode-medveten —
    // \b ser "1998 mätte" som tal + enheten m, eftersom ä inte räknas som
    // ordtecken i JS:s \w.
    const löst = s.match(/\d (?:km|m|s|kg|K|°C|Hz|THz|GHz|nm|µm|au|eV|GeV|MeV|W|J|T|A|V|%)(?![\p{L}\p{N}])/gu);
    if (löst) {
        warnings.push(`${etikett}: vanligt mellanslag mellan tal och enhet (${löst[0].trim()}) — använd `
            + (plain ? 'hårt mellanslag (U+00A0)' : '&nbsp;'));
    }
}

const ids = new Map();
const formOwner = new Map();

for (const b of BEGREPP) {
    const etikett = `"${b && b.term || b && b.id || '?'}"`;

    if (!b || typeof b !== 'object') { errors.push('En post är inte ett objekt'); continue; }
    if (!b.id) { errors.push(`${etikett}: saknar id`); continue; }
    if (!ID_RE.test(b.id)) {
        errors.push(`${b.id}: id får bara innehålla a–z, 0–9 och bindestreck (skriv å/ä/ö som a/a/o)`);
    }
    if (ids.has(b.id)) errors.push(`${b.id}: id förekommer två gånger`);
    ids.set(b.id, b);

    // Term
    if (!b.term) errors.push(`${b.id}: saknar term`);
    else {
        checkText(`${b.id} term`, b.term, true);
        if (b.term[0] !== b.term[0].toUpperCase()) {
            warnings.push(`${b.id}: termen börjar med gemen ("${b.term}")`);
        }
        const ordEfter = b.term.split(/\s+/).slice(1);
        if (ordEfter.some(w => /^[A-ZÅÄÖ]/.test(w))) {
            warnings.push(`${b.id}: ser ut som title case ("${b.term}") — bara första ordet versalt`);
        }
    }

    // Kort förklaring
    if (!b.kort) errors.push(`${b.id}: saknar kort`);
    else {
        checkText(`${b.id} kort`, b.kort, true);
        if (b.kort.length > 340) warnings.push(`${b.id}: kort är ${b.kort.length} tecken — popovern blir hög (sikta på ≤ 340)`);
        if (!/[.!?]$/.test(b.kort.trim())) warnings.push(`${b.id}: kort saknar avslutande punkt`);
    }

    // Böjningsformer
    const former = b.former || [];
    if (!Array.isArray(former) || former.length === 0) {
        errors.push(`${b.id}: saknar former (inga ord att känna igen i texten)`);
    } else {
        for (const f of former) {
            if (typeof f !== 'string' || !f.trim()) { errors.push(`${b.id}: tom form`); continue; }
            if (f !== f.toLowerCase()) errors.push(`${b.id}: formen "${f}" måste vara gemener`);
            if (f.trim() !== f) errors.push(`${b.id}: formen "${f}" har inledande/avslutande blanksteg`);
            if (f.length < 4) warnings.push(`${b.id}: formen "${f}" är kort — risk för falska träffar`);
            const key = f.toLowerCase();
            if (formOwner.has(key) && formOwner.get(key) !== b.id) {
                errors.push(`Formen "${f}" tillhör både ${formOwner.get(key)} och ${b.id} — tvetydig länkning`);
            }
            formOwner.set(key, b.id);
            // En form som bara är en annan form + "s" är onödig (genitiv fångas
            // automatiskt av matchningen).
            if (key.endsWith('s') && former.includes(key.slice(0, -1))) {
                warnings.push(`${b.id}: formen "${f}" behövs inte — genitiv-s fångas automatiskt`);
            }
        }
        // Uppslagsordet självt måste gå att länka.
        if (b.term && !former.includes(b.term.toLowerCase())) {
            errors.push(`${b.id}: termen "${b.term}" saknas bland former — ordet skulle inte länkas i artiklarna`);
        }
        // Formen ska matcha sig själv som helt ord.
        for (const f of former) {
            try {
                if (!formRegex(f).test(f)) errors.push(`${b.id}: formen "${f}" matchar inte sig själv (konstiga tecken?)`);
            } catch (e) {
                errors.push(`${b.id}: formen "${f}" ger ogiltig regex: ${e.message}`);
            }
        }
    }

    // Brödtext
    if (!Array.isArray(b.body) || b.body.length === 0) {
        errors.push(`${b.id}: saknar body`);
    } else {
        b.body.forEach((blk, i) => {
            const bt = `${b.id} body[${i}]`;
            if (!blk || !blk.type) { errors.push(`${bt}: saknar type`); return; }
            if (!BLOCK_TYPES.has(blk.type)) {
                errors.push(`${bt}: okänd blocktyp "${blk.type}" (tillåtna: ${[...BLOCK_TYPES].join(', ')})`);
                return;
            }
            if (blk.type === 'p') {
                if (!blk.html) errors.push(`${bt}: p-block utan html`);
                else checkText(bt, blk.html);
            } else if (blk.type === 'h2') {
                // <h2>{blk.text}</h2> — rendereras som ren text.
                if (!blk.text) errors.push(`${bt}: h2-block utan text`);
                else checkText(bt, blk.text, true);
            } else if (blk.type === 'fact') {
                // Faktarutans rubrik rendereras som ren text; items som HTML.
                if (!blk.title) errors.push(`${bt}: fact-block utan title`);
                else checkText(`${bt} title`, blk.title, true);
                if (!Array.isArray(blk.items) || blk.items.length === 0) errors.push(`${bt}: fact-block utan items`);
                else blk.items.forEach((it, k) => checkText(`${bt} item[${k}]`, it));
            }
        });
        const ord = b.body.filter(x => x.type === 'p')
            .reduce((n, x) => n + String(x.html).replace(/<[^>]*>/g, ' ').split(/\s+/).length, 0);
        if (ord < 90) warnings.push(`${b.id}: bara ~${ord} ord — förklaringen ska vara utförligare än nyhetsartikelns`);
    }
}

// Relaterade begrepp ska finnas
for (const b of BEGREPP) {
    for (const r of (b.relaterade || [])) {
        if (!ids.has(r)) errors.push(`${b.id}: relaterade pekar på okänt id "${r}"`);
        if (r === b.id) errors.push(`${b.id}: relaterade pekar på sig själv`);
    }
}

// ── Täckning mot nyheterna ────────────────────────────────────────────────
// Vilka begrepp dyker faktiskt upp i artiklarna? Ett begrepp utan en enda
// träff är inte fel (det kan vara förberedande), men oftast ett stavfel i
// former-listan.
let nyhetsText = '';
try {
    const win = loadWindowScript(path.join(ROOT, 'data/nyheter.js'));
    for (const a of (win.NYHETER_ALL || [])) {
        nyhetsText += ' ' + [a.title, a.deck].join(' ');
        for (const blk of (a.body || [])) {
            nyhetsText += ' ' + (blk.html || blk.text || blk.caption || '');
            if (Array.isArray(blk.items)) nyhetsText += ' ' + blk.items.join(' ');
        }
    }
    nyhetsText = nyhetsText.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');
} catch (e) {
    warnings.push('Kunde inte läsa data/nyheter.js för täckningskontroll: ' + e.message);
}

const utanTraff = [];
if (nyhetsText) {
    for (const b of BEGREPP) {
        const träffar = (b.former || []).some(f => {
            try { return formRegex(f).test(nyhetsText); } catch (e) { return false; }
        });
        if (!träffar) utanTraff.push(b.id);
    }
}

// ── Sammansättningar där begreppet är efterled ────────────────────────────
// "diffraktionsgitter", "laserspektroskopi", "gammafotoner" — ord i
// artiklarna som SLUTAR på en känd form men inte själva står i former.
// Matchningen sker på hela ord, så de blir aldrig klickbara förrän de
// läggs till. Rapporteras som förslag, inte fel: alla sammansättningar är
// inte samma sak som sitt efterled ("ytplasmon" är inte plasma).
const allaFormer = new Set(formOwner.keys());
const sammansattningar = [];
if (nyhetsText) {
    // Alla ord i artiklarna, en gång var.
    const ord = new Set((nyhetsText.toLowerCase().match(/[\p{L}][\p{L}-]{3,}/gu) || []));
    for (const b of BEGREPP) {
        const funna = new Set();
        for (const f of (b.former || [])) {
            if (f.length < 5 || f.includes(' ')) continue;
            for (const o of ord) {
                if (o.length <= f.length + 1 || !o.endsWith(f)) continue;
                if (allaFormer.has(o)) continue;          // tillhör redan ett begrepp
                if (o.endsWith('-' + f)) continue;        // bindestreck: redan klickbart
                funna.add(o);
            }
        }
        if (funna.size) sammansattningar.push({ id: b.id, ord: [...funna].sort() });
    }
}

console.log(`Begrepp i ordlistan: ${BEGREPP.length}`);
console.log(`Böjningsformer totalt: ${formOwner.size}`);
if (nyhetsText) {
    console.log(`Förekommer i nyhetsartiklarna: ${BEGREPP.length - utanTraff.length} av ${BEGREPP.length}`);
    if (utanTraff.length) console.log(`  utan träff: ${utanTraff.join(', ')}`);
}
if (sammansattningar.length) {
    console.log('\n--- SAMMANSÄTTNINGAR I ARTIKLARNA SOM INTE ÄR KLICKBARA ---');
    console.log('(ord som slutar på en känd form. Lägg till dem i `former` om de');
    console.log(' betyder samma sak — hoppa över dem som inte gör det.)');
    for (const s of sammansattningar) {
        console.log(`  ${s.id}: ${s.ord.join(', ')}`);
    }
}
console.log('');
if (warnings.length) {
    console.log(`--- VARNINGAR (${warnings.length}) ---`);
    warnings.forEach(w => console.log('  ' + w));
    console.log('');
}
if (errors.length) {
    console.log(`--- FEL (${errors.length}) ---`);
    errors.forEach(e => console.log('  ' + e));
    process.exit(1);
}
console.log('OK — inga fel.');
