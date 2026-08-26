#!/usr/bin/env node
/*
 * verify-brak.js — granskar bråkens teckenstorlek i INLINE-matte.
 *
 * Ett inline-bråk ska renderas i samma teckenstorlek som brödtexten runt
 * omkring. KaTeX väljer annars textstyle inline, och då krymper täljare och
 * nämnare till minisiffror som inte flyter ihop med texten:
 *
 *   ...eftersom att $f = \tfrac{1}{T}$. Insättning...     ← fult, litet bråk
 *   ...eftersom att $f = \dfrac{1}{T}$. Insättning...     ← rätt
 *
 * Två kommandon ger det lilla bråket:
 *   \tfrac  — tvingar ALLTID textstyle. Aldrig rätt i löptext.
 *   \frac   — ärver textstyle inline. Fel i löptext, men RÄTT i undantagen
 *             nedan, där ett litet bråk faktiskt är den korrekta sättningen.
 *
 * Undantag (litet bråk är rätt):
 *   1. Blandad form            $3\frac{3}{4}$      (siffra direkt före)
 *   2. \displaystyle i spannet $\displaystyle\lim_{x\to1}\frac{x^2-1}{x-1}$
 *   3. Exponent eller index    $e^{i\frac{\pi}{3}}$
 *   4. Nästlat i ett annat bråk
 *   5. Under rottecken         $\sqrt{\frac{k}{m}}$   (annars sväller roten)
 *   6. Parentes upphöjd        $\left(\frac{p}{2}\right)^2 - q$
 *
 * Displayblock ($$…$$) granskas inte alls — där är \frac redan displaystyle.
 *
 * Regeln står i CLAUDE.md under "Bråk i löptext".
 */

const fs = require('fs');
const path = require('path');

const ROT = path.join(__dirname, '..');
const MAPPAR = ['data'];
const HOPPA_OVER = /bundle\.js$|begrepp-sok\.js$/;

function samlaFiler(dir, ut) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '.shots') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) samlaFiler(p, ut);
    else if (/\.(md|js)$/.test(e.name) && !HOPPA_OVER.test(e.name)) ut.push(p);
  }
  return ut;
}

/* Markerar, tecken för tecken i ett math-spann, var undantagen 3–6 gäller. */
function undantagskarta(s) {
  const n = s.length;
  const iRot = new Array(n).fill(false);
  const iBrak = new Array(n).fill(false);
  const iSkript = new Array(n).fill(false);
  const iPotensParentes = new Array(n).fill(false);

  const stack = [];
  const start = [];
  let sistStangdSort = null;
  let sistStangdSlut = -1;

  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === '{') {
      const fore = s.slice(0, i);
      let sort = 'vanlig';
      if (/(\\\\?)(d|t)?frac\s*$/.test(fore)) sort = 'brak';
      else if (/(\\\\?)sqrt\s*$/.test(fore)) sort = 'rot';
      else if (/[\^_]\s*$/.test(fore)) sort = 'skript';
      else if (sistStangdSort === 'brak' && sistStangdSlut === i - 1) sort = 'brak';
      stack.push(sort); start.push(i);
      continue;
    }
    if (c === '}') {
      const sort = stack.pop();
      const fran = start.pop();
      sistStangdSort = sort; sistStangdSlut = i;
      if (fran === undefined) continue;
      const flagga = sort === 'brak' ? iBrak : sort === 'rot' ? iRot : sort === 'skript' ? iSkript : null;
      if (flagga) for (let j = fran; j <= i; j++) flagga[j] = true;
    }
  }

  // \left( … \right)^   och  \left( … \right)_
  const oppna = [];
  const re = /\\\\?left\s*[([|.]|\\\\?right\s*[)\]|.]/g;
  let m;
  while ((m = re.exec(s))) {
    if (/left/.test(m[0])) { oppna.push({ i: m.index }); continue; }
    const v = oppna.pop();
    if (!v) continue;
    if (/^\s*[\^_]/.test(s.slice(re.lastIndex))) {
      for (let j = v.i; j < re.lastIndex; j++) iPotensParentes[j] = true;
    }
  }

  return { iRot, iBrak, iSkript, iPotensParentes };
}

const fel = [];

for (const mapp of MAPPAR) {
  for (const fil of samlaFiler(path.join(ROT, mapp), [])) {
    const rader = fs.readFileSync(fil, 'utf8').split('\n');

    // Rader som tillhör ett $$…$$-block hoppas över helt.
    const display = new Set();
    let iBlock = false;
    rader.forEach((rad, i) => {
      const antal = (rad.match(/\$\$/g) || []).length;
      if (iBlock) display.add(i);
      if (antal % 2 === 1) {
        if (!iBlock) { display.add(i); iBlock = true; } else { iBlock = false; }
      } else if (antal >= 2) display.add(i);
    });

    rader.forEach((rad, i) => {
      if (display.has(i)) return;
      const spann = /\$([^$]+)\$/g;
      let m;
      while ((m = spann.exec(rad))) {
        const inre = m[1];
        if (!/\\\\?t?frac/.test(inre)) continue;
        const harDisplaystyle = /\\\\?displaystyle/.test(inre);
        const karta = undantagskarta(inre);
        const kmd = /(\\\\?)(t?frac)/g;
        let k;
        while ((k = kmd.exec(inre))) {
          const cmd = k[2];
          const fore = inre.slice(0, k.index).replace(/\s+$/, '');
          const blandadForm = /[0-9]$/.test(fore);
          const undantag = blandadForm || harDisplaystyle ||
            karta.iRot[k.index] || karta.iBrak[k.index] ||
            karta.iSkript[k.index] || karta.iPotensParentes[k.index];

          if (cmd === 'tfrac') {
            fel.push({
              fil, rad: i + 1,
              text: undantag
                ? '\\tfrac ska aldrig användas — skriv \\frac här (undantag gäller)'
                : '\\tfrac ger alltid ett litet bråk — skriv \\dfrac',
              spann: inre.slice(Math.max(0, k.index - 25), k.index + 35),
            });
          } else if (!undantag) {
            fel.push({
              fil, rad: i + 1,
              text: 'inline \\frac renderas mindre än brödtexten — skriv \\dfrac',
              spann: inre.slice(Math.max(0, k.index - 25), k.index + 35),
            });
          }
        }
      }
    });
  }
}

if (!fel.length) {
  console.log('OK — alla inline-bråk har rätt teckenstorlek.');
  process.exit(0);
}

const perFil = {};
for (const f of fel) (perFil[f.fil] = perFil[f.fil] || []).push(f);
for (const fil of Object.keys(perFil)) {
  console.log('\n' + path.relative(ROT, fil));
  for (const f of perFil[fil]) {
    console.log('  rad ' + f.rad + ': ' + f.text);
    console.log('      …' + f.spann.replace(/\s+/g, ' ') + '…');
  }
}
console.log('\n' + fel.length + ' fel. Se "Bråk i löptext" i CLAUDE.md.');
process.exit(1);
