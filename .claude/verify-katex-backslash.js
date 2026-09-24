#!/usr/bin/env node
/*
 * verify-katex-backslash.js — hittar KaTeX-kommandon som tappat sin
 * backslash i JS-strängar.
 *
 * I en .js-fil ligger KaTeX-källan i en JS-sträng, och där är backslash ett
 * escape-tecken. Enkel backslash äts upp av JS innan KaTeX ser texten:
 *
 *   html: 'uttrycket $E = B \cdot A \cdot \omega$'     ← JS ger "B cdot A cdot omega"
 *   html: 'uttrycket $E = B \\cdot A \\cdot \\omega$'  ← rätt
 *
 * Felet ser inte trasigt ut i källan, bara på sidan: "E = BcdotAcdotomega"
 * i kursiv matte (nyheten om duvornas inneröra, 2026-09-24). Värre är att
 * vissa bokstäver blir styrtecken: \frac ger ett sidmatningstecken + "rac",
 * \times en tabb + "imes", \beta ett backsteg + "eta", \right en vagnretur.
 *
 * Granskningen sker på KÄLLTEXTEN, inte på den tolkade strängen: skriptet
 * läser varje strängliteral ('…', "…", `…`), följer var math-spannen ($…$
 * och $$…$$) börjar och slutar, och ger fel på varje escape inuti ett
 * math-spann som inte är en dubbel backslash. Undantag (legitima escapes):
 *   \\          — det rätta skrivsättet
 *   \' \" \`    — citattecken (f\'(x) i en '…'-sträng ger f'(x))
 *   \uXXXX \xXX — Unicode-tecken (hårt mellanslag med mera)
 *   \n          — radbrytning i ett $$…$$-block, UTOM när det följs av
 *                 bokstäver som bildar ett KaTeX-kommando (\neq, \nu, \nabla)
 * String.raw`…` granskas inte (där är enkel backslash rätt).
 *
 * .md-filer berörs inte: där är enkel backslash rätt skrivsätt.
 *
 * Användning:  node .claude/verify-katex-backslash.js [--laga] [fil …]
 * --laga dubblar backslash före bokstäver och mellanrum, och gör \^ till ^.
 * Utan argument granskas alla .js-filer under data/ (utom genererade).
 * Regeln står i CLAUDE.md under "JS-strängar: dubbla alla backslash".
 */

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const HOPPA_OVER = /(^|[\\/])(bundle\.js|begrepp-sok\.js)$/;

function samlaFiler(dir, ut) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) samlaFiler(p, ut);
    else if (e.name.endsWith('.js') && !HOPPA_OVER.test(p)) ut.push(p);
  }
  return ut;
}

// KaTeX-kommandon som börjar på n — där är "\n" inte en radbrytning.
const N_KOMMANDO = /^n(eq|e|u|abla|eg|ot|i|ewline|leq|geq|mid|parallel|subseteq|exists|oindent|ormalsize|atural|earrow|warrow)(?![A-Za-z])/;

/* Plockar ut alla strängliteraler ur en JS-källa. Varje literal blir en lista
   av delar [{start, slut}] (index för innehållet, utan citattecken) — en
   mallsträng med ${…} delas vid interpolationerna, men delarna hör ihop så
   att ett math-spann kan fortsätta förbi en interpolation. En enkel
   tokeniserare som klarar kommentarer, regexliteraler och nästlade mallar. */
function strangar(src) {
  const ut = [];
  const n = src.length;
  let i = 0;
  let sistaTecken = '';            // senaste icke-blanka kodtecken (för regex-gissning)
  const oppna = [];                // mallsträngar vi står inne i ett ${…} av

  // Läser en sträng från i (första innehållstecknet) till slutcitat eller ${.
  function lasDel(q, lit) {
    const start = i;
    while (i < n) {
      const c = src[i];
      if (c === '\\') { i += 2; continue; }
      if (c === q) break;
      if (q === '`' && c === '$' && src[i + 1] === '{') {
        lit.delar.push({ start, slut: i });
        oppna.push({ lit, djup: 0 });
        i += 2;
        return;
      }
      if (q !== '`' && c === '\n') break;
      i++;
    }
    lit.delar.push({ start, slut: i });
    i++;
  }

  while (i < n) {
    const c = src[i];
    const d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '\'' || c === '"' || c === '`') {
      const lit = { delar: [], raw: c === '`' && /String\.raw\s*$/.test(src.slice(Math.max(0, i - 12), i)) };
      ut.push(lit);
      i++;
      lasDel(c, lit);
      sistaTecken = 'a';
      continue;
    }
    if (c === '/' && !/[A-Za-z0-9_$)\]}]/.test(sistaTecken)) {
      // Regexliteral: föregående kodtecken kan inte avsluta ett uttryck.
      i++;
      let klass = false;
      while (i < n && src[i] !== '\n') {
        const r = src[i];
        if (r === '\\') { i += 2; continue; }
        if (r === '[') klass = true;
        else if (r === ']') klass = false;
        else if (r === '/' && !klass) break;
        i++;
      }
      i++;
      while (i < n && /[a-z]/.test(src[i])) i++;
      sistaTecken = 'a';
      continue;
    }
    const topp = oppna[oppna.length - 1];
    if (topp && c === '{') topp.djup++;
    if (topp && c === '}') {
      if (topp.djup === 0) {       // slut på ${…}: fortsätt i samma mallsträng
        oppna.pop();
        i++;
        lasDel('`', topp.lit);
        sistaTecken = 'a';
        continue;
      }
      topp.djup--;
    }
    if (!/\s/.test(c)) sistaTecken = c;
    i++;
  }
  return ut;
}

/* Går igenom en literals källtext och returnerar felaktiga escapes i math. */
function granskaStrang(src, lit) {
  const fel = [];
  if (lit.raw) return fel;
  let iMath = false;
  let mathStart = -1;
  for (const del of lit.delar) {
    for (let i = del.start; i < del.slut; i++) {
      const c = src[i];
      if (c === '\\') {
        const e = src[i + 1];
        if (iMath) {
          let ok = e === '\\' || e === '\'' || e === '"' || e === '`' || e === 'u' || e === 'x' || e === '\n';
          if (e === 'n') ok = !N_KOMMANDO.test(src.slice(i + 1, i + 14));
          if (!ok) fel.push({ pos: i, mathStart, del });
        }
        i++;                       // en escape tar alltid två tecken i källan
        continue;
      }
      if (c === '$') {
        if (src[i + 1] === '$') i++;
        iMath = !iMath;
        if (iMath) mathStart = i;
      }
    }
  }
  return fel;
}

function radOchKolumn(src, pos) {
  const fore = src.slice(0, pos);
  const rad = fore.split('\n').length;
  return { rad, kol: pos - fore.lastIndexOf('\n') };
}

const args = process.argv.slice(2);
const LAGA = args.includes('--laga');
const filArg = args.filter(a => a !== '--laga');
const filer = filArg.length
  ? filArg.map(f => path.resolve(f))
  : samlaFiler(path.join(ROT, 'data'), []);

/* --laga: dubblar backslash före bokstäver, blanksteg och , ; : ! (KaTeX-
   kommandon och mellanrum). \^ och \_ blir ^ och _ (det JS redan gjorde av
   dem, och det som avsågs: 27\^\circ ska vara 27^\\circ). Övriga tecken
   rapporteras men lagas inte, eftersom avsikten inte går att gissa. */
function laga(src, pos) {
  const e = src[pos + 1];
  if (/[A-Za-z ,;:!]/.test(e)) return '\\\\';
  if (e === '^' || e === '_') return '';
  return null;
}

let antalFel = 0;
let antalLagade = 0;
for (const fil of filer) {
  if (!fil.endsWith('.js')) continue;
  let src = fs.readFileSync(fil, 'utf8');
  const hittade = [];
  for (const s of strangar(src)) {
    for (const f of granskaStrang(src, s)) hittade.push(f);
  }
  if (LAGA && hittade.length) {
    let ny = src;
    let kvar = 0;
    for (const f of hittade.slice().sort((a, b) => b.pos - a.pos)) {
      const ers = laga(src, f.pos);
      if (ers === null) { kvar++; continue; }
      ny = ny.slice(0, f.pos) + ers + ny.slice(f.pos + 1);
      antalLagade++;
    }
    fs.writeFileSync(fil, ny);
    if (kvar === 0) continue;
    src = ny;
    hittade.length = 0;
    for (const s of strangar(src)) {
      for (const f of granskaStrang(src, s)) hittade.push(f);
    }
  }
  for (const f of hittade) {
    antalFel++;
    const { rad, kol } = radOchKolumn(src, f.pos);
    const slut = src.indexOf('$', f.pos);
    const utdrag = src.slice(Math.max(f.del.start, f.mathStart), slut < 0 ? f.pos + 30 : Math.min(slut + 1, f.pos + 50));
    console.log(`FEL ${path.relative(ROT, fil)}:${rad}:${kol}  enkel backslash "\\${src[f.pos + 1]}" i math: ${utdrag.replace(/\n/g, '⏎')}`);
  }
}

if (antalLagade) console.log(`Lagade ${antalLagade} backslash.`);
if (antalFel) {
  console.log(`\n${antalFel} KaTeX-backslash som JS äter upp. Dubbla dem: \\cdot → \\\\cdot (se CLAUDE.md, "JS-strängar: dubbla alla backslash"). --laga gör det automatiskt.`);
  process.exit(1);
}
console.log(`OK: inga tappade KaTeX-backslash i ${filer.length} JS-filer.`);
