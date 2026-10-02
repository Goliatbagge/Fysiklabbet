#!/usr/bin/env node
// Räknar om de numeriska leden i lösningarnas formler och larmar när ett
// likhetstecken ljuger.
//
//   node .claude/verify-rakning.js            (övningar, exit tickets, teori)
//   node .claude/verify-rakning.js fy2-1.8    (bara de id:n som anges)
//
// Bakgrund: övningen "Samma boll sparkas … Hur hög blir stighöjden?" i
// fy2-1.8 hade raden
//     \frac{324 \cdot 0{,}25}{19{,}64} = 8{,}2 m
// och svaret 8,2 m, fast 324 · 0,25 / 19,64 = 4,12 (påpekat 2026-10-02).
// Räkningen var rätt uppställd, men slutvärdet hade räknats med sin α i
// stället för sin² α. Ingen annan verifierare räknar, så felet låg ute på
// sajten tills en människa slog på räknaren.
//
// Så fungerar det: varje formel ($…$ och $$…$$) delas i led vid =, ≈ och
// = efter pilar/\quad. Två intilliggande led som BÅDA går att räkna ut
// (bara tal, + − · /, bråk, potenser, rötter, sin/cos/tan med grader, π)
// jämförs. Ett led med en bokstavsvariabel hoppas över — det är alltså
// insättningsleden och slutvärdet som granskas, inte algebran.
//
// Tolerans: högerledet är avrundat, så det får avvika med en halv enhet i
// sista skrivna siffran plus 1,5 % (mellanled som 1,43 s bärs vidare
// avrundade i texten). Skiljer sig enheterna mellan leden (km mot m,
// grader mot radianer) jämförs de inte.
//
// FEL (exit 1): ett led som inte är lika med nästa.
// Läs alltid felraden själv innan du ändrar — en träff kan vara ett
// överslag som borde märkas ut som överslag (se "Värdesiffror" i CLAUDE.md).
//
// UNDANTAG: ett led som MEDVETET är fel (en felräkning i en elevlösning som
// uppgiften ber eleven granska) läggs i listan UNDANTAG nedan, med källans
// id och ledet exakt som det skrivs ut i felmeddelandet. Lägg aldrig in
// ett led där bara för att få tyst på verifieraren.

const fs = require('fs');
const path = require('path');

const UNDANTAG = [
    // Selma räknade −2 · (−2) = −4; lösningen visar felet.
    ['ma1c-4.3', '-2 \\cdot (-2) = -4'],
];

const ROOT = path.join(__dirname, '..');
const filter = process.argv.slice(2);

// ── Tokeniserare + parser för numerisk LaTeX ──────────────────────────
class Ej extends Error {}

function tokenize(src) {
    const t = [];
    let i = 0;
    while (i < src.length) {
        const c = src[i];
        if (/\s/.test(c)) { i++; continue; }
        if (/[0-9.]/.test(c)) {
            let j = i;
            while (j < src.length && /[0-9.]/.test(src[j])) j++;
            t.push({ k: 'num', v: parseFloat(src.slice(i, j)), s: src.slice(i, j) });
            i = j; continue;
        }
        if (c === '\\') {
            const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i));
            if (!m) throw new Ej('ensamt backslash');
            t.push({ k: 'cmd', v: m[1] });
            i += m[0].length; continue;
        }
        if ('+-*/^(){}[]|!'.includes(c)) { t.push({ k: c }); i++; continue; }
        if (c === '−') { t.push({ k: '-' }); i++; continue; }
        if (c === '·' || c === '⋅' || c === '×') { t.push({ k: '*' }); i++; continue; }
        if (c === '°') { t.push({ k: 'deg' }); i++; continue; }
        throw new Ej('tecken ' + c);
    }
    return t;
}

const IGNORE = new Set(['left', 'right', ',', ';', ':', '!', ' ', 'big', 'Big', 'bigl', 'bigr',
    'Bigl', 'Bigr', 'displaystyle', 'textstyle', 'quad', 'qquad']);
const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
    sqrt: Math.sqrt, ln: Math.log, lg: Math.log10, log: Math.log10,
};
const DEG = Math.PI / 180;

function evaluate(src) {
    const tok = tokenize(src).filter(x => !(x.k === 'cmd' && IGNORE.has(x.v)));
    let p = 0;
    const peek = () => tok[p];
    const eat = k => { const x = tok[p]; if (!x || x.k !== k) throw new Ej('väntade ' + k); p++; return x; };

    function group() {
        if (peek() && peek().k === '{') { p++; const v = expr(); eat('}'); return v; }
        return atom();
    }
    // Ett värde bär med sig om det är i grader, så att sin 30° blir rätt.
    function expr() {
        let a = term();
        while (peek() && (peek().k === '+' || peek().k === '-')) {
            const op = tok[p++].k; const b = term();
            a = { v: op === '+' ? a.v + b.v : a.v - b.v, deg: a.deg && b.deg };
        }
        return a;
    }
    function startsAtom(x) {
        if (!x) return false;
        if (x.k === 'num' || x.k === '(' || x.k === '{') return true;
        return x.k === 'cmd' && (x.v in FUNCS || ['frac', 'dfrac', 'tfrac', 'pi', 'sqrt'].includes(x.v));
    }
    function term() {
        // Grader följer med genom multiplikation och division (5 · 180° / 4).
        const mul = (a, b) => ({ v: a.v * b.v, deg: a.deg || b.deg });
        const start = p;
        let a = unary();
        for (;;) {
            const x = peek();
            if (x && (x.k === '*' || (x.k === 'cmd' && (x.v === 'cdot' || x.v === 'times')))) {
                p++; a = mul(a, unary());
            } else if (x && (x.k === '/' || (x.k === 'cmd' && x.v === 'div'))) {
                // I löptext skrivs 50 · 10^6 / 20 · 10^3 och menar en kvot
                // av två produkter: allt till höger om strecket är nämnare.
                p++; const b = term(); a = { v: a.v / b.v, deg: a.deg || b.deg };
            } else if (x && x.k === 'cmd' && /^[dt]?frac$/.test(x.v) && p === start + 1 && tok[start].k === 'num') {
                // Blandad form: 2\frac{3}{4} betyder 2 + 3/4.
                const b = unary(); a = { v: a.v + b.v };
            } else if (startsAtom(x) && !(x.k === 'num' && tok[p - 1] && tok[p - 1].k === 'num')) {
                a = mul(a, unary());
            } else break;
        }
        return a;
    }
    function unary() {
        if (peek() && peek().k === '-') { p++; const a = unary(); return { v: -a.v, deg: a.deg }; }
        if (peek() && peek().k === '+') { p++; return unary(); }
        return power();
    }
    function power() {
        const a = atom();
        if (peek() && peek().k === '^') {
            p++;
            const x = peek();
            if (x && x.k === 'cmd' && x.v === 'circ') { p++; return { v: a.v, deg: true }; }
            if (x && x.k === '{' && tok[p + 1] && tok[p + 1].k === 'cmd' && tok[p + 1].v === 'circ'
                && tok[p + 2] && tok[p + 2].k === '}') { p += 3; return { v: a.v, deg: true }; }
            const e = x && x.k === '{' ? group() : unaryNoPow();
            return { v: Math.pow(a.v, e.v) };
        }
        if (peek() && peek().k === 'deg') { p++; return { v: a.v, deg: true }; }
        return a;
    }
    function unaryNoPow() {
        if (peek() && peek().k === '-') { p++; const a = atom(); return { v: -a.v }; }
        return atom();
    }
    function atom() {
        const x = tok[p++];
        if (!x) throw new Ej('slut');
        if (x.k === 'num') return { v: x.v };
        if (x.k === '(') { const v = expr(); eat(')'); return v; }
        if (x.k === '{') { const v = expr(); eat('}'); return v; }
        if (x.k === '|') { const v = expr(); eat('|'); return { v: Math.abs(v.v) }; }
        if (x.k === 'cmd') {
            if (x.v === 'pi') return { v: Math.PI };
            if (x.v === 'frac' || x.v === 'dfrac' || x.v === 'tfrac') {
                const a = group(); const b = group(); return { v: a.v / b.v, deg: a.deg || b.deg };
            }
            if (x.v === 'sqrt') {
                if (peek() && peek().k === '[') { p++; const n = expr(); eat(']'); const a = group(); return { v: Math.pow(a.v, 1 / n.v) }; }
                return { v: Math.sqrt(group().v) };
            }
            if (x.v in FUNCS) {
                const f = FUNCS[x.v];
                let pw = null;
                if (peek() && peek().k === '^') { p++; pw = group(); }
                let a;
                if (peek() && (peek().k === '(' || peek().k === '{')) a = atom();
                else a = power();
                if (peek() && peek().k === '^' ) throw new Ej('tvetydig');
                const trig = ['sin', 'cos', 'tan'].includes(x.v);
                if (trig && !a.deg) throw new Ej('radianer');   // vinkel utan gradtecken: hoppa över
                let v = f(trig ? a.v * DEG : a.v);
                if (x.v.startsWith('arc')) return { v: v / DEG, deg: true };
                if (pw) v = Math.pow(v, pw.v);
                return { v };
            }
        }
        throw new Ej('okänd ' + (x.v || x.k));
    }
    const r = expr();
    if (p !== tok.length) throw new Ej('rest');
    if (!isFinite(r.v)) throw new Ej('oändlig');
    return r;
}

// ── Ett led: skala bort enheten, räkna ut värdet ──────────────────────
function prepare(seg) {
    let s = seg.trim();
    let unit = '';
    // enheter: \ \mathrm{…}, \mathrm{…}, \text{…} sist i ledet
    s = s.replace(/(\\[ ,;!]|~)*\\(mathrm|text|textrm|operatorname)\{((?:[^{}]|\{[^{}]*\})*)\}/g, (m, a, cmd, u) => {
        u = u.replace(/\s/g, '');
        if (u === 'E') throw new Ej('räknarnotation');         // 2,5E-4
        if (u === '‰' || u === '%') return ' ' + u + ' ';
        unit += u;
        return ' ';
    });
    s = s.replace(/\{,\}/g, '.').replace(/(\d),(\d)/g, '$1.$2');
    s = s.replace(/(\d)\\,(?=\d{3}\b)/g, '$1').replace(/(\d)\s(?=\d{3}\b)/g, '$1');
    // procent och promille är tal: 77,6 % = 0,776
    s = s.replace(/\\%|%/g, ' \\cdot 0.01 ').replace(/‰/g, ' \\cdot 0.001 ');
    s = s.replace(/\\ /g, ' ');
    // bara mellanrumskommandon (\, \;) i kanterna, aldrig backslashen i \frac
    s = s.replace(/(\s|\\[,;:!])+$/, '').replace(/^(\s|\\[,;:!])+/, '').replace(/\\$/, '');
    if (/[a-zA-Zα-ωΑ-Ω]/.test(s.replace(/\\[a-zA-Z]+/g, ''))) throw new Ej('variabel');
    if (!/\d/.test(s)) throw new Ej('inget tal');
    return { s, unit };
}

function rounding(seg) {
    // Halv enhet i sista skrivna siffran, om ledet är ett enda tal
    // (eventuellt i grundpotensform, 1,3 · 10^4, eller i procent).
    let t = seg.s.replace(/\^\\circ|\^\{\\circ\}|°/g, '').trim();
    let skala = 1;
    const proc = /^(.*?)\s*\\cdot 0\.(01|001)\s*$/.exec(t);
    if (proc) { t = proc[1]; skala *= proc[2] === '01' ? 0.01 : 0.001; }
    const pot = /^(.*?)\s*(?:\\cdot|\\times)\s*10\^\{?(-?\d+)\}?\s*$/.exec(t);
    if (pot) { t = pot[1]; skala *= Math.pow(10, +pot[2]); }
    const m = /^\s*-?(\d+(?:[.]\d+)?)\s*$/.exec(t);
    if (!m) return null;
    return skala * halfUlp(m[1]);
}

function halfUlp(str) {
    const dec = str.includes('.') ? str.split('.')[1].length : 0;
    if (dec > 0) return 0.5 * Math.pow(10, -dec);
    // heltal: avslutande nollor kan vara avrundning (80 = 8·10¹)
    const z = /0*$/.exec(str)[0].length;
    return 0.5 * Math.pow(10, Math.min(z, str.length - 1));
}

// Delar en formel i kedjor av led. Kedjor skiljs åt av pilar, \quad,
// radbrytning (\\), & och kommatecken på toppnivå.
function chains(math) {
    let m = math.replace(/\\begin\{[a-z*]+\}(\{[^}]*\})?|\\end\{[a-z*]+\}/g, ' \\\\ ');
    m = m.replace(/\\tag\{[^}]*\}/g, ' ');
    const parts = [];
    let depth = 0, cur = '';
    for (let i = 0; i < m.length; i++) {
        const c = m[i];
        if (c === '{') depth++;
        if (c === '}') depth--;
        if (depth === 0) {
            const rest = m.slice(i);
            const sep = /^(\\\\|\\(?:Leftrightarrow|Rightarrow|Longrightarrow|iff|implies|quad|qquad|text\{ och \}|text\{ eller \}|land)\b|&|,(?!\d))/.exec(rest);
            if (sep && sep[0] === ',' && m[i - 1] === '\\') { cur += c; continue; }   // \, är mellanrum
            if (sep) { parts.push(cur); cur = ''; i += sep[0].length - 1; continue; }
        }
        cur += c;
    }
    parts.push(cur);
    return parts.map(c => {
        const legs = [];
        let d = 0, buf = '', rel = [];
        for (let i = 0; i < c.length; i++) {
            const ch = c[i];
            if (ch === '{') d++;
            if (ch === '}') d--;
            if (d === 0) {
                const r = /^(=|\\approx\b|\\neq\b|<|>|\\leq?\b|\\geq?\b|\\lt\b|\\gt\b)/.exec(c.slice(i));
                if (r) { legs.push(buf); rel.push(r[0]); buf = ''; i += r[0].length - 1; continue; }
            }
            buf += ch;
        }
        legs.push(buf);
        return { legs, rel };
    });
}

function checkMath(math, id, where, errors) {
    let n = 0;
    for (const { legs, rel } of chains(math)) {
        const vals = legs.map(l => {
            try { const pr = prepare(l); return { pr, r: evaluate(pr.s) }; }
            catch (e) { if (e instanceof Ej) return null; throw e; }
        });
        for (let i = 0; i + 1 < legs.length; i++) {
            const a = vals[i], b = vals[i + 1];
            if (!a || !b) continue;
            if (rel[i] !== '=' && rel[i] !== '\\approx') continue;
            // Vänsterledet har en enhet som högerledet inte delar: en
            // enhetsomvandling (60 km/h = 60/3,6, 1 eV = 1,602 · 10^-19).
            if (a.pr.unit && a.pr.unit !== b.pr.unit) continue;
            if (!!a.r.deg !== !!b.r.deg) continue;
            // Två ensamma tal (5 = 8, 0 = −12) är en falsk likhet som texten
            // pekar ut, inte en uträkning.
            if (bart(legs[i]) && bart(legs[i + 1])) continue;
            const led = `${legs[i].trim()} ${rel[i]} ${legs[i + 1].trim()}`;
            if (UNDANTAG.some(([u, l]) => u === id && l === led)) continue;
            n++;
            const half = rounding(b.pr) ?? rounding(a.pr) ?? 0;
            const tol = y => half * 1.001 + 0.015 * Math.abs(y) + 1e-9;
            let ok = Math.abs(a.r.v - b.r.v) <= tol(Math.max(Math.abs(a.r.v), Math.abs(b.r.v)));
            // Högerledet i prefixad enhet eller räkneord (31,25 MW,
            // 0,27 miljoner): tillåt tusenpotenser.
            // Procentenheter (1,96 · 5 = 9,8 %, där 5 redan står i procent).
            if (!ok && /cdot 0\.01\s*$/.test(b.pr.s) && !/cdot 0\.01/.test(a.pr.s)
                && Math.abs(a.r.v / 100 - b.r.v) <= tol(b.r.v)) ok = true;
            if (!ok && b.pr.unit && !a.pr.unit) {
                for (const k of [1e-12, 1e-9, 1e-6, 1e-3, 1e3, 1e6, 1e9, 1e12])
                    if (Math.abs(a.r.v * k - b.r.v) <= tol(b.r.v)) ok = true;
            }
            if (!ok) {
                const fmt = v => (Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0))
                    ? v.toExponential(3) : +v.toPrecision(4) + '';
                errors.push(`${where}\n    ${legs[i].trim()}  ${rel[i]}  ${legs[i + 1].trim()}\n    vänster = ${fmt(a.r.v)}, höger = ${fmt(b.r.v)}`);
            }
        }
    }
    return n;
}

function bart(leg) {
    return /^\s*\(?\s*-?\s*\d+(\{,\}\d+)?\s*\)?\s*$/.test(leg);   // även ekvationsnummer (1)
}

function mathSpans(text) {
    const out = [];
    const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
    let m;
    while ((m = re.exec(text))) out.push(m[1] || m[2]);
    return out;
}

// ── Källor ────────────────────────────────────────────────────────────
if (require.main !== module) {
    module.exports = { evaluate, prepare, chains, checkMath };
    return;
}

const errors = [];
let checked = 0;
const want = id => !filter.length || filter.some(f => id === f || id.startsWith(f));

global.window = {};
require(process.env.OVNINGAR_FIL ? path.resolve(process.env.OVNINGAR_FIL) : path.join(ROOT, 'data', 'ovningar.js'));
for (const [id, list] of Object.entries(window.OVNINGAR || {})) {
    if (!Array.isArray(list) || !want(id)) continue;
    list.forEach((u, ui) => {
        const where = `övningar ${id} uppgift ${ui + 1}`;
        // Flervalsalternativen hoppas över: felsvaren är avsiktligt fel.
        const text = [u.solution, u.question].filter(x => typeof x === 'string').join('\n');
        for (const m of mathSpans(text)) checked += checkMath(m, id, where, errors);
        checkFacit(u, where);
    });
}

// Facit (answer.value) ska stämma med något tal på svarsraden. I fy2-3.12
// stod facit på 5,12 · 10^-8 medan lösningen kom fram till 2,6 · 10^-8, så
// en elev som räknat rätt fick fel av sidan.
function svarstal(rad) {
    const t = rad.replace(/\\\\/g, '\\').replace(/\{,\}/g, ',').replace(/\\[,;! ]| | /g, ' ')
        .replace(/[⁻−]/g, '-').replace(/⁰/g, '0').replace(/¹/g, '1').replace(/²/g, '2').replace(/³/g, '3')
        .replace(/⁴/g, '4').replace(/⁵/g, '5').replace(/⁶/g, '6').replace(/⁷/g, '7').replace(/⁸/g, '8').replace(/⁹/g, '9');
    const out = [];
    // bråk på svarsraden: \dfrac{1}{2}
    for (const f of t.matchAll(/\\[dt]?frac\{(\d+)\}\{(\d+)\}/g)) out.push(f[1] / f[2]);
    const re = /(-?\d{1,3}(?: \d{3})+|-?\d+)(?:,(\d+))?(?:\s*(?:\\cdot|·|×|\\times)\s*10\s*(?:\^\s*\{?\s*(-?\d+)\s*\}?|(-?\d+)))?/g;
    let m;
    while ((m = re.exec(t))) {
        let v = parseFloat(m[1].replace(/ /g, '') + (m[2] ? '.' + m[2] : ''));
        const e = m[3] ?? m[4];
        if (e !== undefined) v *= Math.pow(10, +e);
        out.push(v);
    }
    return out;
}

function checkFacit(u, where) {
    if (!u.answer || typeof u.answer.value !== 'number' || typeof u.solution !== 'string') return;
    const rader = u.solution.split('\n').filter(r => /\*\*Svar/.test(r));
    if (!rader.length) return;
    const tal = rader.flatMap(svarstal);
    if (!tal.length) return;
    // Tecknet jämförs inte: svarsraden säger ofta "minskar med 7,7" eller
    // "−4,8 nC (negativ)" medan facit har beloppet, eller tvärtom.
    const v = Math.abs(u.answer.value);
    tal.forEach((x, i) => { tal[i] = Math.abs(x); });
    const tol = Math.max(u.answer.tol || 0, 0.05);
    const ok = tal.some(x => Math.abs(x - v) <= tol * Math.max(Math.abs(v), 1e-300)
        || [1e-9, 1e-6, 1e-3, 1e-2, 1e2, 1e3, 1e6, 1e9].some(k => Math.abs(x * k - v) <= tol * Math.abs(v)));
    if (!ok) errors.push(`${where}\n    facit answer.value = ${v}, men svarsraden säger: ${rader.join(' / ').trim().slice(0, 160)}`);
}

try {
    require(path.join(ROOT, 'data', 'exittickets.js'));
    const ET = window.EXITTICKETS || {};
    for (const [id, list] of Object.entries(ET)) {
        if (!Array.isArray(list) || !want(id)) continue;
        list.forEach((q, qi) => {
            const where = `exit ticket ${id} fråga ${qi + 1}`;
            // Bara frågan och förklaringen till rätt svar; de övriga
            // förklaringarna återger felräkningar med flit.
            const text = [q.question, (q.why || [])[q.correct]].filter(x => typeof x === 'string').join('\n');
            for (const m of mathSpans(text)) checked += checkMath(m, id, where, errors);
        });
    }
} catch (e) { /* exit tickets saknas eller laddas inte i Node */ }

const teoriDir = path.join(ROOT, 'data', 'teori');
for (const f of fs.readdirSync(teoriDir).filter(f => f.endsWith('.md'))) {
    const id = f.replace(/\.md$/, '');
    if (!want(id)) continue;
    const text = fs.readFileSync(path.join(teoriDir, f), 'utf8')
        .replace(/::: (graf|minisim|video|handskrift)[\s\S]*?\n:::/g, '');
    for (const m of mathSpans(text)) checked += checkMath(m, id, `teori ${id}`, errors);
}

if (errors.length) {
    console.log(`verify-rakning: ${errors.length} led stämmer inte (av ${checked} kontrollerade)\n`);
    for (const e of errors) console.log('FEL  ' + e + '\n');
    process.exit(1);
}
console.log(`verify-rakning: OK, ${checked} numeriska likheter räknade och stämmer.`);
