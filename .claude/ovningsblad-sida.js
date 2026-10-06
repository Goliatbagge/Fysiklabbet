// Gemensam sidmall för övningsbladen med nivåerna Grund, Mellan och Avancerad
// (samma utseende som potensbladet, .claude/bygg-ovningsblad-potenser.js).
// Används av bygg-ovningsblad-problemlosning.js, -olikheter.js och
// -rationella-exponenter.js. Varje uppgift är { q, los, svar, test, text?,
// fig? }; test() kontrollerar svaret numeriskt, och byggSida() vägrar skriva
// sidan om någon kontroll misslyckas eller om ett tankstreck smugit sig in.
'use strict';
const fs = require('fs');
const path = require('path');

// ---------- hjälpfunktioner för lösningarna ----------
const k = (s) => `$$${s}$$`;
const p = (s) => `<p>${s}</p>`;
const sv = (s) => `<p class="svar"><b>Svar:</b> ${s}</p>`;
const kt = (s) => `<p class="kontroll"><i>Kontroll:</i> ${s}</p>`;
const del = (s) => `<p class="del">${s}</p>`;
const fet = (t) => String.raw`\boldsymbol{${t}}`;
// En operation i båda led, med operationen i fetstil. rel är likhets- eller
// olikhetstecknet mellan leden (=, <, \leq …).
const minus = (vl, hl, t, rel = '=') => k(String.raw`${vl} \mathbin{\boldsymbol{-}} ${fet(t)} ${rel} ${hl} \mathbin{\boldsymbol{-}} ${fet(t)}`);
const plus = (vl, hl, t, rel = '=') => k(String.raw`${vl} \mathbin{\boldsymbol{+}} ${fet(t)} ${rel} ${hl} \mathbin{\boldsymbol{+}} ${fet(t)}`);
const ganger = (vl, hl, t, rel = '=') => k(String.raw`${fet(t)} \mathbin{\boldsymbol{\cdot}} ${vl} ${rel} ${fet(t)} \mathbin{\boldsymbol{\cdot}} ${hl}`);
const delat = (vl, hl, t, rel = '=') => k(String.raw`\frac{${vl}}{${fet(t)}} ${rel} \frac{${hl}}{${fet(t)}}`);
const upph = (vl, hl, t) => k(String.raw`\left(${vl}\right)^{${fet(t)}} = \left(${hl}\right)^{${fet(t)}}`);

// ---------- figurer ----------
const INK = '#1f2530';
const BLA = '#2563eb';
const it = (s) => `<tspan font-style="italic">${s}</tspan>`;
// Värdet i en etikett: "x + 5" med kursivt x.
const lbl = (s) => s.replace(/-/g, '−').replace(/\b([a-z])\b/g, (m) => it(m));
const svg = (w, h, inner, skala = 1.25) =>
  `<div class="fig"><svg viewBox="0 0 ${w} ${h}" width="${Math.round(w * skala)}" height="${Math.round(h * skala)}" font-family="Poppins, sans-serif" font-size="12" fill="${INK}">${inner}</svg></div>`;

// Tallinje med lösningsmängd. Axeln har pilspets bara åt höger (det positiva
// hållet). punkter: [{ x, fylld }], delar: [{ fran, till }] där ±Infinity
// ger en stråle med egen blå pilspets.
function tallinje({ min, max, punkter = [], delar = [] }) {
  const W = 280, Y = 26, X0 = 22, X1 = 246, AX = 262;
  const px = (v) => X0 + (v - min) / (max - min) * (X1 - X0);
  let s = `<line x1="8" y1="${Y}" x2="${AX - 8}" y2="${Y}" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<polygon points="${AX - 9},${Y - 4.5} ${AX},${Y} ${AX - 9},${Y + 4.5}" fill="${INK}"/>`;
  const nyckel = punkter.map(q => q.x);
  for (let v = min; v <= max; v++) {
    s += `<line x1="${px(v)}" y1="${Y - 4}" x2="${px(v)}" y2="${Y + 4}" stroke="${INK}" stroke-width="1"/>`;
    // Vid långa tallinjer: bara jämna tal och lösningens gränser, så att
    // talen inte trängs ihop. Ett tal precis intill en gräns hoppas över.
    const visa = nyckel.includes(v) || (max - min <= 10 ? true : v % 2 === 0 && !nyckel.some(n => Math.abs(n - v) === 1));
    if (visa) s += `<text x="${px(v)}" y="${Y + 18}" text-anchor="middle" font-size="10.5">${v < 0 ? '−' + -v : v}</text>`;
  }
  for (const d of delar) {
    const a = d.fran === -Infinity ? 16 : px(d.fran);
    const b = d.till === Infinity ? AX - 22 : px(d.till);
    s += `<line x1="${a}" y1="${Y}" x2="${b}" y2="${Y}" stroke="${BLA}" stroke-width="4" stroke-linecap="butt"/>`;
    if (d.fran === -Infinity) s += `<polygon points="${a + 9},${Y - 6} ${a - 1},${Y} ${a + 9},${Y + 6}" fill="${BLA}"/>`;
    if (d.till === Infinity) s += `<polygon points="${b - 9},${Y - 6} ${b + 1},${Y} ${b - 9},${Y + 6}" fill="${BLA}"/>`;
  }
  for (const q of punkter) {
    s += `<circle cx="${px(q.x)}" cy="${Y}" r="4.6" fill="${q.fylld ? BLA : '#fff'}" stroke="${BLA}" stroke-width="2"/>`;
  }
  return svg(W, 52, s, 1.0);
}

// ---------- sidan ----------
function byggSida(cfg) {
  const { fil, titel, under, beskrivning, box, nivaText, NIVAER, kalkylator } = cfg;
  let nr = 0;
  for (const niva of NIVAER) {
    niva.forsta = nr + 1;
    for (const d of niva.delar) for (const u of d.upg) {
      nr++; u.nr = nr;
      if (!u.test()) throw new Error(`Kontroll misslyckades i uppgift ${nr}: ${u.q}`);
      if (/—/.test(u.los + u.q + u.svar)) throw new Error(`Tankstreck i uppgift ${nr}`);
    }
    niva.sista = nr;
  }
  const ANTAL = nr;

  const uppgHtml = NIVAER.map(n => `
  <section class="niva">
${n.delar.map((d, di) => {
    // Nivårubriken, första instruktionen och första raden uppgifter hålls
    // ihop, så att rubriken aldrig blir ensam längst ned på en sida.
    const uppg = (lista) => `    <div class="tasks c${d.kol}">
${lista.map(u => `      <div class="task ${u.hojd || d.hojd}"><span class="nr">${u.nr}</span><span class="eq${u.text ? ' txt' : ''}">${u.text ? u.q : '$' + u.q + '$'}${u.fig || ''}</span></div>`).join('\n')}
    </div>`;
    const instr = `    <p class="instr">${d.rubrik}</p>`;
    if (di) return instr + '\n' + uppg(d.upg);
    const rest = d.upg.slice(d.kol);
    return `    <div class="nivastart">
    <h2><span class="nivanamn">${n.namn}</span><span class="sv">Uppgift ${n.forsta}–${n.sista} · ${n.under}</span></h2>
${instr}
${uppg(d.upg.slice(0, d.kol))}
    </div>` + (rest.length ? '\n' + uppg(rest) : '');
  }).join('\n')}
  </section>`).join('\n');

  const svarHtml = NIVAER.map(n => `
    <h3 class="svarniva">${n.namn}</h3>
    <div class="svarlista">${n.delar.flatMap(d => d.upg).map(u => `<div${u.svar.replace(/<[^>]+>|\\[a-z]+|[${}]/g, '').length > 30 ? ' class="lang"' : ''}><span class="nr">${u.nr}</span><span>${u.svar}</span></div>`).join('')}</div>`).join('');

  const losHtml = NIVAER.map(n => `
    <h3 class="losniva">${n.namn}</h3>
    <div class="los">
${n.delar.flatMap(d => d.upg).map(u => `      <div class="sol"><p class="solh"><span class="nr">${u.nr}</span>${u.text ? '' : ' $' + u.q + '$'}</p>${u.los}</div>`).join('\n')}
    </div>`).join('');

  const slug = path.basename(fil, '.html');
  const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: ${titel} — Fysiklabbet</title>
<meta name="description" content="${ANTAL} ${beskrivning}">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/${slug}.html">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    throwOnError: false
  });
  document.documentElement.setAttribute('data-katex', 'klar');
});
</script>
<style>
:root { --ink:#1f2530; --paper:#f7f2e8; --line:rgba(31,37,48,.22); --teal:#0d9488; }
* { box-sizing: border-box; }
html { color-scheme: light; }
body { margin:0; font-family:'Poppins', system-ui, sans-serif; color:var(--ink); background:#fff; font-size:11pt; line-height:1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { max-width: 186mm; margin: 0 auto; padding: 10mm 6mm 20mm; }
header { border-bottom: 2px solid var(--ink); padding-bottom: 6px; margin-bottom: 12px; }
.over { font-size: 9.5pt; text-transform: uppercase; letter-spacing: .06em; color:#5b6472; margin:0; }
h1 { font-size: 20pt; margin: 2px 0 0; line-height:1.2; }
.under { margin: 2px 0 0; font-size: 11pt; color:#3b4350; }
.namn { display:flex; gap: 28px; margin-top: 8px; font-size: 10pt; color:#3b4350; }
.namn span { flex:1; border-bottom: 1px solid var(--line); padding-bottom: 2px; }
.box { background: var(--paper); border: 1px solid rgba(31,37,48,.18); border-radius: 8px; padding: 8px 14px; margin: 0 0 10px; break-inside: avoid; }
.box p { margin: 3px 0; }
.boxgrid { display:grid; grid-template-columns: 1fr 1fr; gap: 4px 18px; }
.box ul, .box ol { margin: 2px 0 2px 16px; padding: 0; }
.box li { margin: 1px 0; }
.box .katex-display { margin: 2px 0 3px; text-align:left; }
.box .katex-display > .katex { text-align:left; }
.rub { font-weight: 600; }
.nivaer { font-size: 9.5pt; color:#3b4350; margin: 0 0 6px; }
.niva { margin-bottom: 6px; }
.nivastart { break-inside: avoid; page-break-inside: avoid; }
.nivastart + .tasks { margin-top: 4px; }
h2 { display:flex; flex-wrap: wrap; align-items: baseline; gap: 2px 10px; font-size: 13pt; margin: 14px 0 4px; padding: 3px 0; border-bottom: 1.4px solid var(--ink); break-after: avoid; }
h2 .nivanamn { color: var(--teal); }
h2 .sv { font-weight: 400; font-size: 9pt; color:#5b6472; }
.instr { font-weight: 600; margin: 8px 0 3px; break-after: avoid; }
.tasks { display: grid; gap: 4px 14px; }
.c1 { grid-template-columns: 1fr; } .c2 { grid-template-columns: repeat(2, 1fr); }
.c3 { grid-template-columns: repeat(3, 1fr); } .c4 { grid-template-columns: repeat(4, 1fr); }
.task { break-inside: avoid; padding: 4px 4px 0; border-bottom: 1px dotted var(--line); display:flex; gap: 6px; align-items: baseline; }
.task .nr { font-weight: 600; min-width: 1.7em; text-align:right; font-size: 10pt; }
.task .eq { flex:1; min-width: 0; }
.task .katex, .sol p .katex, .svarlista .katex, .box p .katex, .box li .katex { white-space: nowrap; }
.kort { min-height: 16mm; } .mellan { min-height: 30mm; } .hog { min-height: 44mm; } .xhog { min-height: 64mm; }
.fig { margin: 4px 0 2px; }
.fig svg { max-width: 100%; height: auto; }
.facit { break-before: page; page-break-before: always; }
.facit h2 { font-size: 14pt; }
.svarniva, .losniva { font-size: 11pt; margin: 8px 0 3px; color: var(--teal); break-after: avoid; }
.svarlista { display:grid; grid-template-columns: repeat(4, 1fr); gap: 2px 12px; font-size: 9.8pt; margin-bottom: 6px; }
.svarlista div { display:flex; gap: 6px; align-items: center; min-height: 9mm; }
.svarlista div.lang { grid-column: span 2; }
.svarlista .nr { font-weight: 600; min-width: 1.7em; text-align:right; }
.los { columns: 2; column-gap: 10mm; font-size: 9.8pt; }
.sol { break-inside: avoid; page-break-inside: avoid; margin: 0 0 8px; padding: 0 0 5px; border-bottom: 1px dotted var(--line); }
.sol .solh { font-weight: 600; margin: 0 0 1px; }
.sol .solh .nr { margin-right: 4px; }
.sol p { margin: 2px 0; }
.sol .del { font-weight: 700; margin: 5px 0 1px; }
.sol .kontroll { color:#3b4350; }
.sol .obs { color:#b42318; font-weight: 600; }
.sol .katex-display { margin: 2px 0 3px; text-align: left; padding-left: 3mm; overflow-x: auto; overflow-y: hidden; padding-bottom: 2px; }
.sol .katex-display > .katex { text-align: left; }
.sol .svar { margin: 3px 0 0; }
footer { margin-top: 18px; font-size: 9pt; color:#5b6472; border-top: 1px solid var(--line); padding-top: 6px; display:flex; justify-content: space-between; }
@page { size: A4; margin: 13mm 12mm 14mm; }
@media print {
  body { font-size: 10.5pt; }
  .page { max-width: none; padding: 0; }
}
@media (max-width: 640px) {
  .c3, .c4 { grid-template-columns: repeat(2, 1fr); }
  .c2, .c3:has(.hog) { grid-template-columns: 1fr; }
  .boxgrid { grid-template-columns: 1fr; }
  .svarlista { grid-template-columns: repeat(2, 1fr); }
  .los { columns: 1; }
  .sol .katex-display { padding-left: 0; }
}
</style>
</head>
<body>
<section class="page">
  <header>
    <p class="over">Matematik nivå 1c · Övningsblad</p>
    <h1>${titel}</h1>
    <p class="under">${under}</p>
    <div class="namn"><span>Namn:</span><span>Klass:</span></div>
  </header>
${box}
  <p class="nivaer">${nivaText} ${kalkylator} Svar och lösningsförslag finns efter uppgifterna.</p>
${uppgHtml}
  <section class="facit">
    <h2><span>Svar</span></h2>
${svarHtml}
    <h2><span>Lösningsförslag</span></h2>
${losHtml}
  </section>
  <footer><span>Matematik nivå 1c · ${titel}</span><span>fysiklabbet.se</span></footer>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;
  const ut = path.join(__dirname, '..', 'ovningsblad', fil);
  fs.writeFileSync(ut, html);
  console.log('Skrev', path.relative(process.cwd(), ut), '·', ANTAL, 'uppgifter');
  return ANTAL;
}

const nara = (a, b) => Math.abs(a - b) < 1e-9;

module.exports = { k, p, sv, kt, del, minus, plus, ganger, delat, upph, svg, it, lbl, tallinje, byggSida, nara, INK, BLA };
