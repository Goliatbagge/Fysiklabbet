// Validerar data/exittickets.js: syntax, schema, täckning mot katalogen,
// typografi (emoji, Unicode-superscript, borttappade KaTeX-backslash).
const fs = require('fs');

function loadWindowScript(file) {
    const src = fs.readFileSync(file, 'utf8');
    const window = {};
    // katalog.js läser window.KATALOG i sin IIFE — kör i funktion med window.
    new Function('window', 'Date', src)(window, Date);
    return window;
}

const errors = [];
const warnings = [];

let W;
try {
    W = loadWindowScript('C:/claude/Fysiklabbet/data/exittickets.js');
} catch (e) {
    console.error('SYNTAXFEL i exittickets.js:', e.message);
    process.exit(1);
}
const ET = W.EXITTICKETS || {};

const WK = loadWindowScript('C:/claude/Fysiklabbet/data/katalog.js');
const sections = [];
for (const subj of Object.values(WK.KATALOG)) {
    for (const [courseName, course] of Object.entries(subj.courses || {})) {
        const code = courseName === 'Fysik nivå 2' ? 'fy2'
                   : courseName === 'Matematik nivå 1c' ? 'ma1c'
                   : courseName === 'Matematik nivå 2c' ? 'ma2c'
                   : courseName === 'Matematik fortsättning nivå 1c' ? 'ma3c' : 'fy1';
        for (const ch of Object.values(course.chapters || {})) {
            for (const s of ch.sections || []) sections.push(code + '-' + s.num);
        }
    }
}

// Täckning
for (const id of sections) {
    if (!ET[id] || !Array.isArray(ET[id]) || ET[id].length === 0) {
        errors.push(`SAKNAS: ${id} har ingen exit ticket`);
    }
}
for (const id of Object.keys(ET)) {
    if (!sections.includes(id)) warnings.push(`OKÄND: ${id} finns inte i katalogen`);
}

// Regexar
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/u;
const UNI_SUP = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/;
// KaTeX-kommandon som tappat sin backslash (JS åt upp den):
const LOST_BS = /(?<![\\A-Za-zåäö])(mathrm|mathbb|mathit|mathbf|text|frac|sqrt|cdot|times|approx|propto|leq|geq|neq|Delta|Omega|alpha|beta|gamma|lambda|omega|mu|rho|sigma|theta|varphi|pi\b|sin|cos|tan|log|lg)\s*[{ ]/;

function checkStr(id, qi, field, s) {
    if (typeof s !== 'string' || !s.trim()) {
        errors.push(`${id} f${qi + 1} ${field}: tom/ej sträng`);
        return;
    }
    if (EMOJI.test(s)) errors.push(`${id} f${qi + 1} ${field}: emoji: ${s.match(EMOJI)[0]}`);
    if (UNI_SUP.test(s)) {
        // Unicode-superscript är förbjudet överallt (exponenter ska vara $10^{-3}$)
        warnings.push(`${id} f${qi + 1} ${field}: Unicode-superscript: "${s.match(UNI_SUP)[0]}" i: ${s.slice(0, 60)}`);
    }
    // Kolla borttappade backslashes inuti math-segment
    const mathSegs = s.match(/\$[^$]+\$/g) || [];
    for (const seg of mathSegs) {
        const m = seg.match(LOST_BS);
        if (m) errors.push(`${id} f${qi + 1} ${field}: trolig borttappad backslash före "${m[1]}" i: ${seg.slice(0, 70)}`);
    }
    // Decimalpunkt i siffror (utanför rimliga fall) — varning
    const noMath = s.replace(/\$[^$]+\$/g, '');
    const dp = noMath.match(/\d\.\d/);
    if (dp) warnings.push(`${id} f${qi + 1} ${field}: decimalpunkt? "${dp[0]}" i: ${noMath.slice(0, 60)}`);
}

let totalQ = 0;
const correctDist = {};
for (const [id, list] of Object.entries(ET)) {
    if (!Array.isArray(list)) { errors.push(`${id}: inte en array`); continue; }
    if (list.length < 3) warnings.push(`${id}: bara ${list.length} frågor`);
    if (list.length > 8) warnings.push(`${id}: hela ${list.length} frågor`);
    list.forEach((q, qi) => {
        totalQ++;
        checkStr(id, qi, 'question', q.question);
        if (!Array.isArray(q.choices) || q.choices.length < 3 || q.choices.length > 4) {
            errors.push(`${id} f${qi + 1}: choices ska vara 3–4 st (är ${q.choices && q.choices.length})`);
        } else {
            q.choices.forEach((c, ci) => checkStr(id, qi, `val ${ci}`, c));
        }
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= (q.choices || []).length) {
            errors.push(`${id} f${qi + 1}: correct=${q.correct} utanför intervallet`);
        } else {
            correctDist[q.correct] = (correctDist[q.correct] || 0) + 1;
        }
        if (!Array.isArray(q.why) || q.why.length !== (q.choices || []).length) {
            errors.push(`${id} f${qi + 1}: why har ${q.why && q.why.length} poster, choices ${q.choices && q.choices.length}`);
        } else {
            q.why.forEach((w, wi) => checkStr(id, qi, `why ${wi}`, w));
            // Förklaringar ska inte börja med Rätt!/Fel!
            q.why.forEach((w, wi) => {
                if (/^\s*(Rätt|Fel)[!.]/i.test(w)) warnings.push(`${id} f${qi + 1} why ${wi}: börjar med "Rätt/Fel" — UI:t har redan etikett`);
            });
        }
    });
}

console.log(`Avsnitt i katalogen: ${sections.length}, med exit ticket: ${Object.keys(ET).filter(id => sections.includes(id)).length}`);
console.log(`Totalt antal frågor: ${totalQ}`);
console.log('Fördelning av rätt-index:', JSON.stringify(correctDist));
console.log('');
if (warnings.length) {
    console.log(`--- VARNINGAR (${warnings.length}) ---`);
    warnings.forEach(w => console.log('  ' + w));
}
if (errors.length) {
    console.log(`--- FEL (${errors.length}) ---`);
    errors.forEach(e => console.log('  ' + e));
    process.exit(1);
}
console.log('OK — inga fel.');
