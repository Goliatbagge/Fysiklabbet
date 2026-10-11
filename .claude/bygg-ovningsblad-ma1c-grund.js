// Bygger tre övningsblad på grundnivå för Matematik nivå 1c (och 1b, som
// delar avsnitten via aliaskartan):
//   Upprepade procentuella förändringar (ma1c-3.3),
//   Sparande, lån och ränta (ma1c-3.4 och 3.5 i samma blad),
//   Koordinatsystem och linjära modeller (ma1c-4.1).
// Bladen har bara nivån Grund. Nivåer heter aldrig betygsbokstäver: betyg
// sätts på kursen, inte på uppgifter.
//
// Varje svar kontrolleras numeriskt (test() på varje uppgift), så att facit
// inte kan innehålla ett räknefel. Graferna ritas ur sina funktioner med
// graf() (samma ritare som i bygg-ovningsblad-ma1b.js).
//
//   node .claude/bygg-ovningsblad-ma1c-grund.js
//     bygger ovningsblad/ovningsblad-upprepade-procent.html,
//     -sparande-lan.html och -koordinatsystem.html
//
// PDF-versionerna görs sedan med headless Chrome mot dev-servern:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//     --print-to-pdf=ovningsblad/ovningsblad-upprepade-procent.pdf
//     http://localhost:8000/ovningsblad/ovningsblad-upprepade-procent.html
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'ovningsblad');

// ---------- hjälpfunktioner för lösningarna ----------
const k = (s) => `$$${s}$$`;
const p = (s) => `<p>${s}</p>`;
const sv = (s) => `<p class="svar"><b>Svar:</b> ${s}</p>`;
const del = (b) => `<p class="del">${b})</p>`;
const fig = (svg) => `<div class="fig">${svg}</div>`;
const nara = (a, b, tol) => Math.abs(a - b) < (tol || 1e-9) * Math.max(1, Math.abs(b));
const rund = (v, steg) => Math.round(v / steg) * steg;
// ett ord med variabel som aldrig bryts vid bindestrecket
const xax = '<span class="nw"><em>x</em>-axeln</span>';
const yax = '<span class="nw"><em>y</em>-axeln</span>';
const xko = '<span class="nw"><em>x</em>-koordinaten</span>';
const yko = '<span class="nw"><em>y</em>-koordinaten</span>';

// ---------- tabeller ----------
// värdetabell på en rad: x överst, y under (tomma celler om ys saknas)
const vt = (xs, ys, xl, yl) => `<table class="vt"><tr><th>${xl || '$x$'}</th>${xs.map(x => `<td>${x}</td>`).join('')}</tr><tr><th>${yl || '$y$'}</th>${xs.map((_, i) => `<td>${ys ? ys[i] : ''}</td>`).join('')}</tr></table>`;
// kalkylblad med kolumnbokstäver och radnummer
const kalk = (rader) => {
  const kol = 'ABCDEFG'.slice(0, Math.max(...rader.map(r => r.length)));
  return `<table class="kalk"><tr><th></th>${[...kol].map(c => `<th>${c}</th>`).join('')}</tr>${rader.map((r, i) => `<tr><th>${i + 1}</th>${[...kol].map((_, j) => `<td>${r[j] !== undefined ? r[j] : ''}</td>`).join('')}</tr>`).join('')}</table>`;
};
// vanlig tabell med rubrikrad
const tab = (rubriker, rader, cls) => `<table class="${cls || 'fyll'}"><tr>${rubriker.map(h => `<th>${h}</th>`).join('')}</tr>${rader.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;

// ---------- grafer ----------
// Koordinatsystem med rutnät, axlar med pilspets bara åt det positiva hållet,
// kurvor samplade ur sina funktioner, punkter (ifyllda eller tomma ringar)
// och trappsteg med Δx-måttet på det vågräta steget och Δy-måttet på det
// lodräta, båda på utsidan.
const INK = '#1f2530', BLA = '#2563c9', ROD = '#c8324a', TEAL = '#0d9488';
const fmt = (v) => String(Math.round(v * 100) / 100);
const tal = (n) => (n < 0 ? '−' + Math.abs(n) : String(n)).replace('.', ',');
function graf(o) {
  const s = o.s || 20;
  const [x0, x1] = o.x, [y0, y1] = o.y;
  const X = (x) => (x - x0) * s, Y = (y) => (y1 - y) * s;
  const W = (x1 - x0) * s, H = (y1 - y0) * s;
  let g = '';
  for (let i = x0; i <= x1; i++) g += `<line x1="${fmt(X(i))}" y1="0" x2="${fmt(X(i))}" y2="${fmt(H)}" stroke="rgba(31,37,48,.16)" stroke-width="1"/>`;
  for (let j = y0; j <= y1; j++) g += `<line x1="0" y1="${fmt(Y(j))}" x2="${fmt(W)}" y2="${fmt(Y(j))}" stroke="rgba(31,37,48,.16)" stroke-width="1"/>`;
  const ax = Y(0), ay = X(0);
  g += `<line x1="0" y1="${fmt(ax)}" x2="${fmt(W + 6)}" y2="${fmt(ax)}" stroke="${INK}" stroke-width="1.4"/>`;
  g += `<polygon points="${fmt(W + 14)},${fmt(ax)} ${fmt(W + 5)},${fmt(ax - 4)} ${fmt(W + 5)},${fmt(ax + 4)}" fill="${INK}"/>`;
  g += `<line x1="${fmt(ay)}" y1="${fmt(H)}" x2="${fmt(ay)}" y2="-6" stroke="${INK}" stroke-width="1.4"/>`;
  g += `<polygon points="${fmt(ay)},-14 ${fmt(ay - 4)},-5 ${fmt(ay + 4)},-5" fill="${INK}"/>`;
  g += `<text x="${fmt(W + 12)}" y="${fmt(ax + 15)}" font-size="13" text-anchor="end" fill="${INK}" font-style="italic">x</text>`;
  g += `<text x="${fmt(ay + 7)}" y="-6" font-size="13" text-anchor="start" fill="${INK}" font-style="italic">y</text>`;
  // Skalans tal: inte i rutnätets ytterkant (där klipps de) och inte där en
  // kurva går genom talets ruta (då ligger talet på linjen).
  const steg = o.steg || 1;
  const kurvor = (o.fns || []).flatMap(f => { const a = f.a !== undefined ? f.a : x0, b = f.b !== undefined ? f.b : x1, ut = [];
    for (let t = 0; t <= 800; t++) { const x = a + (b - a) * t / 800; ut.push([X(x), Y(f.f(x))]); } return ut; });
  // trappstegen och deras mått, och punkterna, räknas också som hinder
  for (const t of o.trapp || []) for (let u = 0; u <= 40; u++) {
    kurvor.push([X(t.x + t.dx * u / 40), Y(t.y)], [X(t.x + t.dx), Y(t.y + t.dy * u / 40)]);
    kurvor.push([X(t.x + t.dx / 2) + (u - 20) / 3, Y(t.y) + (t.dy > 0 ? 9 : -9)], [X(t.x + t.dx) + 6 + u / 2, Y(t.y + t.dy / 2)]);
  }
  for (const pt of o.punkter || []) for (const [dx, dy] of [[0, 0], [4, 0], [-4, 0], [0, 4], [0, -4]]) kurvor.push([X(pt.x) + dx, Y(pt.y) + dy]);
  const fri = (l, r, t, b) => !kurvor.some(([px, py]) => px > l - 2 && px < r + 2 && py > t - 2 && py < b + 2);
  const bredd = (str) => str.length * 6;
  for (let i = x0 + 1; i < x1; i++) if (i !== 0 && i % steg === 0) {
    const str = tal(i), cx = X(i), w = bredd(str);
    // under axeln i första hand, ovanför om kurvan är i vägen
    if (fri(cx - w / 2, cx + w / 2, ax + 5, ax + 15))
      g += `<text x="${fmt(cx)}" y="${fmt(ax + 13)}" font-size="10.5" text-anchor="middle" fill="${INK}">${str}</text>`;
    else if (fri(cx - w / 2, cx + w / 2, ax - 14, ax - 4))
      g += `<text x="${fmt(cx)}" y="${fmt(ax - 5)}" font-size="10.5" text-anchor="middle" fill="${INK}">${str}</text>`;
  }
  for (let j = y0 + 1; j < y1; j++) if (j !== 0 && j % steg === 0) {
    const str = tal(j), w = bredd(str);
    // till vänster om axeln i första hand, till höger om kurvan är i vägen
    if (fri(ay - 4 - w, ay - 4, Y(j) - 4.5, Y(j) + 4.5))
      g += `<text x="${fmt(ay - 4)}" y="${fmt(Y(j) + 3.8)}" font-size="10.5" text-anchor="end" fill="${INK}">${str}</text>`;
    else if (fri(ay + 4, ay + 4 + w, Y(j) - 4.5, Y(j) + 4.5))
      g += `<text x="${fmt(ay + 4)}" y="${fmt(Y(j) + 3.8)}" font-size="10.5" text-anchor="start" fill="${INK}">${str}</text>`;
  }
  for (const f of o.fns || []) {
    const a = f.a !== undefined ? f.a : x0, b = f.b !== undefined ? f.b : x1;
    const pts = [];
    for (let t = 0; t <= 400; t++) {
      const x = a + (b - a) * t / 400, y = f.f(x);
      if (y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push(`${fmt(X(x))},${fmt(Y(y))}`);
    }
    g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${f.farg || BLA}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  for (const t of o.trapp || []) {
    const xa = X(t.x), ya = Y(t.y), xb = X(t.x + t.dx), yb = Y(t.y + t.dy);
    g += `<path d="M${fmt(xa)},${fmt(ya)} H${fmt(xb)} V${fmt(yb)}" fill="none" stroke="${TEAL}" stroke-width="2" stroke-dasharray="5 3"/>`;
    const under = t.dy > 0; // stigande linje: det vågräta steget ligger under linjen
    g += `<text x="${fmt((xa + xb) / 2)}" y="${fmt(under ? ya + 14 : ya - 5)}" font-size="12" font-weight="600" text-anchor="middle" fill="${TEAL}">${tal(t.dx)}</text>`;
    g += `<text x="${fmt(xb + 5)}" y="${fmt((ya + yb) / 2 + 4)}" font-size="12" font-weight="600" text-anchor="start" fill="${TEAL}">${t.dy > 0 ? '+' : ''}${tal(t.dy)}</text>`;
  }
  for (const pt of o.punkter || []) {
    g += `<circle cx="${fmt(X(pt.x))}" cy="${fmt(Y(pt.y))}" r="${pt.oppen ? 3.6 : 3.4}" fill="${pt.oppen ? '#fff' : (pt.farg || INK)}" stroke="${pt.farg || INK}" stroke-width="${pt.oppen ? 1.6 : 1}"/>`;
    if (pt.lbl) g += `<text x="${fmt(X(pt.x) + (pt.dx || 6))}" y="${fmt(Y(pt.y) + (pt.dy || -6))}" font-size="12" font-weight="600" text-anchor="${pt.anchor || 'start'}" fill="${pt.farg || INK}">${pt.lbl}</text>`;
  }
  for (const t of o.text || []) g += `<text x="${fmt(X(t.x))}" y="${fmt(Y(t.y))}" font-size="12" text-anchor="${t.anchor || 'start'}" fill="${t.farg || INK}">${t.html}</text>`;
  const L = Math.min(0, ay - 20) - 2, T = -20, R = W + 16;
  let B = Math.max(H, ax + 16) + 3;
  // Förklaring under rutnätet: en kort linje i kurvans färg och dess ekvation,
  // en rad per kurva. Ligger utanför rutnätet, så den hamnar aldrig på en linje.
  for (const [i, l] of (o.legend || []).entries()) {
    const y = B + 12 + i * 17;
    g += `<line x1="${fmt(L + 6)}" y1="${fmt(y - 4)}" x2="${fmt(L + 26)}" y2="${fmt(y - 4)}" stroke="${l.farg}" stroke-width="2.4" stroke-linecap="round"/>`;
    g += `<text x="${fmt(L + 32)}" y="${fmt(y)}" font-size="12.5" fill="${INK}">${l.html}</text>`;
    if (i === o.legend.length - 1) B = y + 6;
  }
  const vw = R - L, vh = B - T;
  return `<svg viewBox="${fmt(L)} ${T} ${fmt(vw)} ${fmt(vh)}" width="${fmt(vw)}" height="${fmt(vh)}" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="${o.aria || 'Koordinatsystem'}">${g}</svg>`;
}

// =====================================================================
// BLAD 1: UPPREPADE PROCENTUELLA FÖRÄNDRINGAR (ma1c-3.3)
// =====================================================================
const pct = (s) => s + '&nbsp;%';
const BLAD1 = {
  fil: 'ovningsblad-upprepade-procent',
  titel: 'Upprepade procentuella förändringar',
  under: 'Total förändringsfaktor, samma förändring flera gånger och tillbaka till procent',
  rakna: 'Räknare får användas.',
  box: `
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>Ökning med 12&nbsp;% ger förändringsfaktorn $1 + 0{,}12 = 1{,}12$.</li>
        <li>Minskning med 12&nbsp;% ger förändringsfaktorn $1 - 0{,}12 = 0{,}88$.</li>
        <li>Flera förändringar efter varandra: <b>multiplicera</b> förändringsfaktorerna. Procenttalen får aldrig adderas.</li>
        <li>Samma förändring $n$ gånger: nya värdet $=$ gamla värdet $\\cdot$ förändringsfaktorn$^{\\,n}$.</li>
        <li>Från total förändringsfaktor till procent: jämför med 1. Över 1 är en ökning, under 1 en minskning.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: ett pris höjs med 15&nbsp;% och sänks sedan med 15&nbsp;%</p>
      <p>Förändringsfaktorerna är 1,15 och 0,85. Den totala förändringsfaktorn är</p>
      $$1{,}15 \\cdot 0{,}85 = 0{,}9775$$
      <p>0,9775 är mindre än 1, alltså en minskning:</p>
      $$1 - 0{,}9775 = 0{,}0225 = 2{,}25\\ \\%$$
      <p><b>Svar:</b> Priset har minskat med 2,25&nbsp;%, trots att det höjdes och sänktes lika många procent. Sänkningen räknas på det höjda priset.</p>
    </div>`,
  AVSNITT: [
    {
      namn: 'Förändringsfaktorer', under: 'Från procent till förändringsfaktor och tillbaka',
      delar: [
        {
          rubrik: 'Skriv förändringsfaktorn.', kol: 4, hojd: 'kort',
          upg: [
            { q: 'Ökning med ' + pct('20'), text: true, svar: '1,20', test: () => nara(1 + 0.20, 1.20),
              los: p('Det nya värdet är 100&nbsp;% + 20&nbsp;% = 120&nbsp;% av det gamla:') + k('1 + 0{,}20 = 1{,}20') + sv('1,20') },
            { q: 'Minskning med ' + pct('15'), text: true, svar: '0,85', test: () => nara(1 - 0.15, 0.85),
              los: p('Det nya värdet är 100&nbsp;% − 15&nbsp;% = 85&nbsp;% av det gamla:') + k('1 - 0{,}15 = 0{,}85') + sv('0,85') },
            { q: 'Ökning med ' + pct('4'), text: true, svar: '1,04', test: () => nara(1 + 0.04, 1.04),
              los: p('4&nbsp;% är 0,04, inte 0,4:') + k('1 + 0{,}04 = 1{,}04') + sv('1,04') },
            { q: 'Minskning med ' + pct('2,5'), text: true, svar: '0,975', test: () => nara(1 - 0.025, 0.975),
              los: p('2,5&nbsp;% är 0,025:') + k('1 - 0{,}025 = 0{,}975') + sv('0,975') },
          ],
        },
        {
          rubrik: 'Beräkna den totala förändringsfaktorn.', kol: 2, hojd: 'kort',
          upg: [
            { q: `Ökning med ${pct('10')} och sedan ökning med ${pct('20')}`, text: true, svar: '1,32', test: () => nara(1.10 * 1.20, 1.32),
              los: p('Förändringsfaktorerna är 1,10 och 1,20. De multipliceras:') + k('1{,}10 \\cdot 1{,}20 = 1{,}32') + sv('1,32') },
            { q: `Ökning med ${pct('25')} och sedan minskning med ${pct('20')}`, text: true, svar: '1,00', test: () => nara(1.25 * 0.80, 1),
              los: p('Förändringsfaktorerna är 1,25 och 0,80:') + k('1{,}25 \\cdot 0{,}80 = 1{,}00') + p('Värdet är alltså tillbaka där det började.') + sv('1,00') },
            { q: `Minskning med ${pct('10')} två gånger`, text: true, svar: '0,81', test: () => nara(0.90 * 0.90, 0.81),
              los: p('Förändringsfaktorn 0,90 används två gånger:') + k('0{,}90 \\cdot 0{,}90 = 0{,}81') + sv('0,81') },
            { q: `Minskning med ${pct('30')} och sedan ökning med ${pct('40')}`, text: true, svar: '0,98', test: () => nara(0.70 * 1.40, 0.98),
              los: p('Förändringsfaktorerna är 0,70 och 1,40:') + k('0{,}70 \\cdot 1{,}40 = 0{,}98') + sv('0,98') },
            { q: `Ökning med ${pct('50')} och sedan minskning med ${pct('50')}`, text: true, svar: '0,75', test: () => nara(1.50 * 0.50, 0.75),
              los: p('Förändringsfaktorerna är 1,50 och 0,50:') + k('1{,}50 \\cdot 0{,}50 = 0{,}75') + sv('0,75') },
            { q: `Ökning med ${pct('5')} tre gånger`, text: true, svar: '1,157625', test: () => nara(1.05 ** 3, 1.157625),
              los: p('Förändringsfaktorn 1,05 används tre gånger:') + k('1{,}05 \\cdot 1{,}05 \\cdot 1{,}05 = 1{,}05^3 = 1{,}157625') + sv('1,157625') },
          ],
        },
        {
          rubrik: 'Den totala förändringsfaktorn är given. Är det en ökning eller en minskning, och med hur många procent?', kol: 4, hojd: 'kort',
          upg: [
            { q: '1{,}32', svar: 'Ökning med 32&nbsp;%', test: () => nara(1.32 - 1, 0.32),
              los: p('1,32 är större än 1, alltså en ökning. Vi drar bort 1:') + k('1{,}32 - 1 = 0{,}32 = 32\\ \\%') + sv('Ökning med 32&nbsp;%') },
            { q: '0{,}81', svar: 'Minskning med 19&nbsp;%', test: () => nara(1 - 0.81, 0.19),
              los: p('0,81 är mindre än 1, alltså en minskning. Skillnaden mot 1 är minskningen:') + k('1 - 0{,}81 = 0{,}19 = 19\\ \\%') + sv('Minskning med 19&nbsp;%') },
            { q: '1{,}08', svar: 'Ökning med 8&nbsp;%', test: () => nara(1.08 - 1, 0.08),
              los: k('1{,}08 - 1 = 0{,}08 = 8\\ \\%') + sv('Ökning med 8&nbsp;%') },
            { q: '0{,}9775', svar: 'Minskning med 2,25&nbsp;%', test: () => nara(1 - 0.9775, 0.0225),
              los: k('1 - 0{,}9775 = 0{,}0225 = 2{,}25\\ \\%') + sv('Minskning med 2,25&nbsp;%') },
          ],
        },
        {
          rubrik: 'Skriv den totala förändringsfaktorn som en potens. Du behöver inte beräkna den.', kol: 3, hojd: 'kort',
          upg: [
            { q: `Ökning med ${pct('3')} per år i 8 år`, text: true, svar: '$1{,}03^8$', test: () => nara(1.03 ** 8, Array(8).fill(1.03).reduce((a, b) => a * b)),
              los: p('Förändringsfaktorn 1,03 multipliceras med sig själv 8 gånger:') + k('1{,}03 \\cdot 1{,}03 \\cdot \\ldots \\cdot 1{,}03 = 1{,}03^8') + sv('$1{,}03^8$') },
            { q: `Minskning med ${pct('12')} per år i 5 år`, text: true, svar: '$0{,}88^5$', test: () => nara(1 - 0.12, 0.88),
              los: p('En minskning med 12&nbsp;% ger förändringsfaktorn 0,88, och den används 5 gånger:') + k('0{,}88^5') + sv('$0{,}88^5$') },
            { q: `Ökning med ${pct('2,5')} per år i 18 år`, text: true, svar: '$1{,}025^{18}$', test: () => nara(1 + 0.025, 1.025),
              los: p('Förändringsfaktorn är 1,025, och den används 18 gånger:') + k('1{,}025^{18}') + sv('$1{,}025^{18}$') },
          ],
        },
      ],
    },
    {
      namn: 'Uppgifter i text', under: 'Priser, sparande och värdeminskning',
      delar: [
        {
          rubrik: 'Lös uppgifterna. Svara med den totala förändringen i procent.', kol: 2, hojd: 'mellan',
          upg: [
            { q: `Priset på en cykel höjs först med ${pct('10')} och sedan med ${pct('20')}. Hur många procent har priset höjts totalt?`, text: true,
              svar: '32&nbsp;%', test: () => nara(1.10 * 1.20 - 1, 0.32),
              los: p('Förändringsfaktorerna är 1,10 och 1,20. Den totala förändringsfaktorn är') + k('1{,}10 \\cdot 1{,}20 = 1{,}32') +
                p('1,32 är större än 1, alltså en ökning:') + k('1{,}32 - 1 = 0{,}32 = 32\\ \\%') +
                p('Svaret är inte 30&nbsp;%. Den andra höjningen räknas på det redan höjda priset.') + sv('Priset har höjts med 32&nbsp;%.') },
            { q: `En tröja sänks först med ${pct('20')} och sedan med ${pct('25')} från det nya priset. Hur många procent har priset sänkts totalt?`, text: true,
              svar: '40&nbsp;%', test: () => nara(1 - 0.80 * 0.75, 0.40),
              los: p('Förändringsfaktorerna är 0,80 och 0,75:') + k('0{,}80 \\cdot 0{,}75 = 0{,}60') +
                p('0,60 är mindre än 1, alltså en minskning:') + k('1 - 0{,}60 = 0{,}40 = 40\\ \\%') + sv('Priset har sänkts med 40&nbsp;%.') },
            { q: `Ett pris höjs med ${pct('20')} och sänks sedan med ${pct('20')}. Hur många procent har priset ändrats totalt?`, text: true,
              svar: 'Minskat med 4&nbsp;%', test: () => nara(1 - 1.20 * 0.80, 0.04),
              los: p('Förändringsfaktorerna är 1,20 och 0,80:') + k('1{,}20 \\cdot 0{,}80 = 0{,}96') +
                p('0,96 är mindre än 1, alltså en minskning:') + k('1 - 0{,}96 = 0{,}04 = 4\\ \\%') + sv('Priset har minskat med 4&nbsp;%.') },
            { q: `En aktie ökar i värde med ${pct('40')} ett år och minskar med ${pct('30')} året efter. Har värdet ökat eller minskat totalt, och med hur många procent?`, text: true,
              svar: 'Minskat med 2&nbsp;%', test: () => nara(1 - 1.40 * 0.70, 0.02),
              los: p('Förändringsfaktorerna är 1,40 och 0,70:') + k('1{,}40 \\cdot 0{,}70 = 0{,}98') +
                p('0,98 är mindre än 1, så värdet har minskat, trots att ökningen var fler procent än minskningen:') + k('1 - 0{,}98 = 0{,}02 = 2\\ \\%') + sv('Värdet har minskat med 2&nbsp;%.') },
          ],
        },
        {
          rubrik: 'Lös uppgifterna.', kol: 2, hojd: 'mellan',
          upg: [
            { q: `En vara kostar 500&nbsp;kr. Priset höjs med ${pct('10')} och sedan med ${pct('10')} till. Vad kostar varan nu?`, text: true,
              svar: '605&nbsp;kr', test: () => nara(500 * 1.10 * 1.10, 605),
              los: p('Den totala förändringsfaktorn är') + k('1{,}10 \\cdot 1{,}10 = 1{,}21') +
                p('Nya priset är gamla priset gånger den totala förändringsfaktorn:') + k('500 \\cdot 1{,}21 = 605\\ \\mathrm{kr}') +
                p('Rimligt: den första höjningen är 50&nbsp;kr och den andra lite mer, 55&nbsp;kr, eftersom den räknas på 550&nbsp;kr.') + sv('605&nbsp;kr') },
            { q: `En jacka kostar 1&nbsp;200&nbsp;kr. Den sänks först med ${pct('30')} och sedan med ${pct('10')} från det nya priset. Vad kostar jackan efter sänkningarna?`, text: true,
              svar: '756&nbsp;kr', test: () => nara(1200 * 0.70 * 0.90, 756),
              los: p('Förändringsfaktorerna är 0,70 och 0,90:') + k('0{,}70 \\cdot 0{,}90 = 0{,}63') +
                k('1\\,200 \\cdot 0{,}63 = 756\\ \\mathrm{kr}') + sv('756&nbsp;kr') },
            { q: `Lisa sätter in 10&nbsp;000&nbsp;kr på ett sparkonto med årsräntan ${pct('3')} och tar inte ut några pengar. Hur mycket finns på kontot efter 5 år? Avrunda till hela kronor.`, text: true,
              svar: '11&nbsp;593&nbsp;kr', test: () => rund(10000 * 1.03 ** 5, 1) === 11593,
              los: p('Förändringsfaktorn är 1,03 varje år, och den används 5 gånger:') +
                k('10\\,000 \\cdot 1{,}03^5 = 11\\,592{,}74\\ldots \\approx 11\\,593\\ \\mathrm{kr}') + sv('11&nbsp;593&nbsp;kr') },
            { q: `En bil köps för 200&nbsp;000&nbsp;kr. Bilens värde minskar med ${pct('12')} varje år. Vad är bilen värd efter 6 år? Avrunda till hela hundratal kronor.`, text: true,
              svar: '92&nbsp;900&nbsp;kr', test: () => rund(200000 * 0.88 ** 6, 100) === 92900,
              los: p('En minskning med 12&nbsp;% ger förändringsfaktorn 0,88, och den används 6 gånger:') +
                k('200\\,000 \\cdot 0{,}88^6 = 92\\,880{,}8\\ldots \\approx 92\\,900\\ \\mathrm{kr}') + p('Rimligt: bilen har tappat drygt halva sitt värde på sex år.') + sv('92&nbsp;900&nbsp;kr') },
            { q: `I en stad bor 25&nbsp;000 personer, och antalet invånare ökar med ${pct('2')} per år. Hur många bor i staden efter 10 år? Avrunda till hela hundratal.`, text: true,
              svar: 'Cirka 30&nbsp;500', test: () => rund(25000 * 1.02 ** 10, 100) === 30500,
              los: p('Förändringsfaktorn är 1,02, och den används 10 gånger:') +
                k('25\\,000 \\cdot 1{,}02^{10} = 30\\,474{,}8\\ldots \\approx 30\\,500') + sv('Cirka 30&nbsp;500 personer') },
            { q: `Mängden av ett läkemedel i blodet minskar med ${pct('20')} per timme. Från början finns 400&nbsp;mg. Hur mycket finns kvar efter 4 timmar? Avrunda till hela milligram.`, text: true,
              svar: '164&nbsp;mg', test: () => rund(400 * 0.8 ** 4, 1) === 164,
              los: p('En minskning med 20&nbsp;% ger förändringsfaktorn 0,80, och den används 4 gånger:') +
                k('400 \\cdot 0{,}80^4 = 163{,}84 \\approx 164\\ \\mathrm{mg}') + sv('164&nbsp;mg') },
            { q: `Ett belopp växer med ${pct('4')} per år i 10 år. Med hur många procent har beloppet ökat totalt? Avrunda till hela procent.`, text: true,
              svar: '48&nbsp;%', test: () => rund((1.04 ** 10 - 1) * 100, 1) === 48,
              los: p('Den totala förändringsfaktorn är') + k('1{,}04^{10} = 1{,}4802\\ldots') +
                p('Vi drar bort 1:') + k('1{,}4802\\ldots - 1 = 0{,}4802\\ldots \\approx 48\\ \\%') +
                p('Svaret är inte $10 \\cdot 4\\ \\% = 40\\ \\%$, eftersom varje års ränta räknas på ett större belopp än året innan.') + sv('Beloppet har ökat med cirka 48&nbsp;%.') },
          ],
        },
        {
          rubrik: 'Resonera och förklara.', kol: 2, hojd: 'mellan',
          upg: [
            { q: `Elias säger att om ett pris höjs med ${pct('15')} och sedan sänks med ${pct('15')} blir det samma pris som från början. Har han rätt? Förklara.`, text: true,
              svar: 'Nej, priset minskar med 2,25&nbsp;%.', test: () => nara(1.15 * 0.85, 0.9775),
              los: p('Pröva med ett pris på 100&nbsp;kr. Efter höjningen kostar varan 115&nbsp;kr. Sänkningen räknas på 115&nbsp;kr:') +
                k('0{,}15 \\cdot 115 = 17{,}25\\ \\mathrm{kr}') + k('115 - 17{,}25 = 97{,}75\\ \\mathrm{kr}') +
                p('Med förändringsfaktorer:') + k('1{,}15 \\cdot 0{,}85 = 0{,}9775') +
                p('Sänkningen tar bort mer kronor än höjningen lade till, eftersom den räknas på ett större pris.') + sv('Nej. Priset minskar med 2,25&nbsp;%.') },
            { q: `Ett pris sänks först med ${pct('15')} och höjs sedan med ${pct('15')}. Blir det en annan total förändring än om priset först höjs och sedan sänks? Förklara.`, text: true,
              svar: 'Nej, det blir samma: en minskning med 2,25&nbsp;%.', test: () => nara(0.85 * 1.15, 1.15 * 0.85),
              los: p('Den totala förändringsfaktorn blir') + k('0{,}85 \\cdot 1{,}15 = 0{,}9775') +
                p('Det är samma tal som $1{,}15 \\cdot 0{,}85$, eftersom ordningen inte spelar någon roll när man multiplicerar.') + sv('Nej. Båda ger en minskning med 2,25&nbsp;%.') },
            { q: `Sara räknar ut att två höjningar med ${pct('10')} efter varandra ger en höjning med ${pct('20')}. Vad har hon gjort för fel, och hur stor blir höjningen?`, text: true,
              svar: 'Hon har adderat procenttalen. Höjningen blir 21&nbsp;%.', test: () => nara(1.10 * 1.10 - 1, 0.21),
              los: p('Sara har adderat procenttalen, men den andra höjningen räknas på det redan höjda priset. Förändringsfaktorerna ska multipliceras:') +
                k('1{,}10 \\cdot 1{,}10 = 1{,}21') + k('1{,}21 - 1 = 0{,}21 = 21\\ \\%') + sv('Hon har adderat procenttalen. Höjningen blir 21&nbsp;%.') },
            { q: `Hampus har pengar på ett konto med årsräntan ${pct('5')}. Han tror att pengarna har ökat med ${pct('10')} efter två år. Har han rätt?`, text: true,
              svar: 'Nej, de har ökat med 10,25&nbsp;%.', test: () => nara(1.05 ** 2 - 1, 0.1025),
              los: p('Det andra årets ränta räknas också på det första årets ränta:') + k('1{,}05^2 = 1{,}1025') + k('1{,}1025 - 1 = 0{,}1025 = 10{,}25\\ \\%') +
                p('Han har nästan rätt, men pengarna har ökat lite mer än 10&nbsp;%.') + sv('Nej. Pengarna har ökat med 10,25&nbsp;%.') },
            { q: `Vilket ger det högsta priset: att höja ett pris med ${pct('30')} en gång, eller att höja det med ${pct('15')} två gånger? Motivera.`, text: true,
              svar: `${pct('15')} två gånger`, test: () => 1.15 ** 2 > 1.30,
              los: p('Vi jämför de totala förändringsfaktorerna:') + k('1{,}30 \\qquad \\text{och} \\qquad 1{,}15^2 = 1{,}3225') +
                p('1,3225 är större än 1,30, eftersom den andra höjningen med 15&nbsp;% räknas på ett högre pris.') + sv(`Två höjningar med ${pct('15')} ger det högsta priset.`) },
            { q: `En tröja kostade 400&nbsp;kr. På rean sänks priset med ${pct('50')} till 200&nbsp;kr. Med hur många procent måste priset sedan höjas för att tröjan ska kosta 400&nbsp;kr igen?`, text: true,
              svar: '100&nbsp;%', test: () => nara(200 * (1 + 1.00), 400),
              los: p('Priset ska gå från 200&nbsp;kr till 400&nbsp;kr. Förändringsfaktorn är nya priset delat med gamla priset:') +
                k('\\frac{400}{200} = 2{,}00') + k('2{,}00 - 1 = 1{,}00 = 100\\ \\%') +
                p('Höjningen räknas på 200&nbsp;kr, så den måste vara 100&nbsp;%, inte 50&nbsp;%.') + sv('100&nbsp;%') },
          ],
        },
      ],
    },
  ],
};

// =====================================================================
// BLAD 2: SPARANDE, LÅN OCH RÄNTA (ma1c-3.4 och 3.5)
// =====================================================================
const KALK = kalk([
  ['År', 'Behållning (kr)', '', 'Förändringsfaktor'],
  ['0', '15000', '', '1,02'],
  ['1', '', '', ''],
  ['2', '', '', ''],
  ['3', '', '', ''],
  ['4', '', '', ''],
  ['5', '', '', ''],
]);
const LAN_RUB = ['År', 'Skuld före inbetalningen (kr)', 'Ränta (kr)', 'Amortering (kr)', 'Inbetalning (kr)'];
const LAN = [[20000, 1000, 5000, 6000], [15000, 750, 5000, 5750], [10000, 500, 5000, 5500], [5000, 250, 5000, 5250]];
const tkr = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;');
const BLAD2 = {
  fil: 'ovningsblad-sparande-lan',
  titel: 'Sparande, lån och ränta',
  under: 'Ränta och behållning, kalkylblad, rak amortering och vad en inbetalning består av',
  rakna: 'Räknare får användas.',
  box: `
    <div>
      <p class="rub">Kom ihåg: sparande</p>
      <ul>
        <li><b>Årsränta</b>: hur många procent pengarna växer på ett år. Står det bara "ränta" menas årsränta.</li>
        <li><b>Behållning</b>: beloppet som finns på kontot.</li>
        <li>Insatt belopp $K$ i $n$ år: behållning $= K \\cdot$ förändringsfaktorn$^{\\,n}$.</li>
        <li>En formel i ett kalkylblad inleds med $=$. Dollartecken låser en cell när formeln dras nedåt: <code>=B2*$D$2</code>.</li>
      </ul>
      <p class="rub">Kom ihåg: lån</p>
      <ul>
        <li><b>Amortering</b>: att betala tillbaka själva lånet. <b>Ränta</b>: kostnaden för att låna.</li>
        <li><b>Rak amortering</b>: samma amortering varje gång, $\\dfrac{\\text{lånet}}{\\text{antal inbetalningar}}$.</li>
        <li>Inbetalning $=$ amortering $+$ ränta. Räntan räknas på den skuld som är kvar.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: lån på 150&nbsp;000&nbsp;kr, rak amortering varje månad i 5 år, årsränta 4,8&nbsp;%</p>
      <p>Antal inbetalningar: $5 \\cdot 12 = 60$. Amortering varje månad:</p>
      $$\\frac{150\\,000\\ \\mathrm{kr}}{60} = 2\\,500\\ \\mathrm{kr}$$
      <p>Ränta för ett år på hela skulden, och för en månad:</p>
      $$0{,}048 \\cdot 150\\,000\\ \\mathrm{kr} = 7\\,200\\ \\mathrm{kr}$$
      $$\\frac{7\\,200\\ \\mathrm{kr}}{12} = 600\\ \\mathrm{kr}$$
      <p>Första inbetalningen är amortering plus ränta:</p>
      $$2\\,500\\ \\mathrm{kr} + 600\\ \\mathrm{kr} = 3\\,100\\ \\mathrm{kr}$$
    </div>`,
  AVSNITT: [
    {
      namn: 'Sparande', under: 'Ränta, behållning, kalkylblad och årligt sparande',
      delar: [
        {
          rubrik: 'Beräkna.', kol: 2, hojd: 'kort',
          upg: [
            { q: `Du har 8&nbsp;000&nbsp;kr på ett konto med årsräntan ${pct('2')}. Hur mycket ränta får du på ett år?`, text: true,
              svar: '160&nbsp;kr', test: () => nara(0.02 * 8000, 160),
              los: p('Räntan är 2&nbsp;% av beloppet:') + k('0{,}02 \\cdot 8\\,000\\ \\mathrm{kr} = 160\\ \\mathrm{kr}') + sv('160&nbsp;kr') },
            { q: `Du har 25&nbsp;000&nbsp;kr på ett konto med årsräntan ${pct('3,5')}. Hur mycket ränta får du på ett år?`, text: true,
              svar: '875&nbsp;kr', test: () => nara(0.035 * 25000, 875),
              los: p('3,5&nbsp;% är 0,035:') + k('0{,}035 \\cdot 25\\,000\\ \\mathrm{kr} = 875\\ \\mathrm{kr}') + sv('875&nbsp;kr') },
            { q: `Du sätter in 12&nbsp;000&nbsp;kr på ett konto med årsräntan ${pct('1,5')}. Hur stor är behållningen efter ett år?`, text: true,
              svar: '12&nbsp;180&nbsp;kr', test: () => nara(12000 * 1.015, 12180),
              los: p('Behållningen ökar med 1,5&nbsp;%, så förändringsfaktorn är 1,015:') + k('12\\,000 \\cdot 1{,}015 = 12\\,180\\ \\mathrm{kr}') + sv('12&nbsp;180&nbsp;kr') },
            { q: `Du sätter in 40&nbsp;000&nbsp;kr på ett konto med årsräntan ${pct('4')}. Hur stor är behållningen efter ett år?`, text: true,
              svar: '41&nbsp;600&nbsp;kr', test: () => nara(40000 * 1.04, 41600),
              los: p('Förändringsfaktorn är 1,04:') + k('40\\,000 \\cdot 1{,}04 = 41\\,600\\ \\mathrm{kr}') + sv('41&nbsp;600&nbsp;kr') },
          ],
        },
        {
          rubrik: 'Pengarna står kvar på kontot och inga pengar tas ut. Avrunda till hela kronor.', kol: 2, hojd: 'mellan',
          upg: [
            { q: `10&nbsp;000&nbsp;kr sätts in med årsräntan ${pct('2')}. Hur stor är behållningen efter 3 år?`, text: true,
              svar: '10&nbsp;612&nbsp;kr', test: () => rund(10000 * 1.02 ** 3, 1) === 10612,
              los: p('Förändringsfaktorn 1,02 används 3 gånger:') + k('10\\,000 \\cdot 1{,}02^3 = 10\\,612{,}08 \\approx 10\\,612\\ \\mathrm{kr}') + sv('10&nbsp;612&nbsp;kr') },
            { q: `20&nbsp;000&nbsp;kr sätts in med årsräntan ${pct('4,5')}. Hur stor är behållningen efter 8 år?`, text: true,
              svar: '28&nbsp;442&nbsp;kr', test: () => rund(20000 * 1.045 ** 8, 1) === 28442,
              los: p('Förändringsfaktorn 1,045 används 8 gånger:') + k('20\\,000 \\cdot 1{,}045^8 = 28\\,442{,}01\\ldots \\approx 28\\,442\\ \\mathrm{kr}') + sv('28&nbsp;442&nbsp;kr') },
            { q: `När ett barn föds sätter föräldrarna in 5&nbsp;000&nbsp;kr på ett konto med årsräntan ${pct('2,5')}. Hur mycket finns på kontot när barnet fyller 18 år?`, text: true,
              svar: '7&nbsp;798&nbsp;kr', test: () => rund(5000 * 1.025 ** 18, 1) === 7798,
              los: p('Pengarna växer i 18 år med förändringsfaktorn 1,025:') + k('5\\,000 \\cdot 1{,}025^{18} = 7\\,798{,}29\\ldots \\approx 7\\,798\\ \\mathrm{kr}') + sv('7&nbsp;798&nbsp;kr') },
            { q: `50&nbsp;000&nbsp;kr sätts in med årsräntan ${pct('3')}.<br>a) Hur stor är behållningen efter 10 år?<br>b) Hur mycket ränta har pengarna gett totalt under de 10 åren?`, text: true,
              svar: 'a) 67&nbsp;196&nbsp;kr&emsp;b) 17&nbsp;196&nbsp;kr', test: () => rund(50000 * 1.03 ** 10, 1) === 67196 && rund(50000 * 1.03 ** 10 - 50000, 1) === 17196,
              los: del('a') + p('Förändringsfaktorn 1,03 används 10 gånger:') + k('50\\,000 \\cdot 1{,}03^{10} = 67\\,195{,}81\\ldots \\approx 67\\,196\\ \\mathrm{kr}') + sv('67&nbsp;196&nbsp;kr') +
                del('b') + p('Räntan är det som tillkommit utöver insättningen:') + k('67\\,195{,}81\\ldots - 50\\,000 \\approx 17\\,196\\ \\mathrm{kr}') + sv('17&nbsp;196&nbsp;kr') },
          ],
        },
        {
          rubrik: 'Kalkylbladet nedan ska visa behållningen på ett sparkonto. I cell B2 står insättningen och i cell D2 förändringsfaktorn.', fig: KALK, kol: 2, hojd: 'mellan',
          upg: [
            { q: 'Hur stor är räntan på kontot?', text: true, svar: '2&nbsp;%', test: () => nara(1.02 - 1, 0.02),
              los: p('Förändringsfaktorn i D2 är 1,02:') + k('1{,}02 - 1 = 0{,}02 = 2\\ \\%') + sv('2&nbsp;%') },
            { q: 'Vilket år står i cell A5?', text: true, svar: '3', test: () => 5 - 2 === 3,
              los: p('Kolumn A börjar med år 0 på rad 2, så rad 5 är år 3.') + sv('År 3') },
            { q: 'Vilken formel ska stå i cell B3 för att visa behållningen efter ett år?', text: true, svar: '<code>=B2*D2</code>', test: () => nara(15000 * 1.02, 15300),
              los: p('Behållningen efter ett år är insättningen i B2 gånger förändringsfaktorn i D2. En formel inleds med likhetstecken:') + p('<code>=B2*D2</code>') + sv('<code>=B2*D2</code>') },
            { q: 'Formeln i B3 ska dras nedåt med fyllnadshandtaget till B7. Hur ska den då skrivas? Förklara varför.', text: true, svar: '<code>=B2*$D$2</code>', test: () => true,
              los: p('När formeln dras nedåt flyttas alla cellnamn en rad: B2 blir B3, B4 och så vidare, och det är rätt. Men D2 skulle bli D3, D4, som är tomma. Därför låses D2 med dollartecken:') + p('<code>=B2*$D$2</code>') + sv('<code>=B2*$D$2</code>') },
            { q: 'Vilka värden visas i cellerna B3 och B4?', text: true, svar: '15&nbsp;300 och 15&nbsp;606', test: () => nara(15000 * 1.02, 15300) && nara(15000 * 1.02 ** 2, 15606),
              los: k('B3:\\quad 15\\,000 \\cdot 1{,}02 = 15\\,300') + k('B4:\\quad 15\\,300 \\cdot 1{,}02 = 15\\,606') + sv('15&nbsp;300 och 15&nbsp;606') },
          ],
        },
        {
          rubrik: 'Årligt sparande.', kol: 2, hojd: 'hog',
          upg: [
            { q: `Du sätter in 2&nbsp;000&nbsp;kr i slutet av varje år på ett konto med årsräntan ${pct('3')}. I ett kalkylblad står behållningen efter den första insättningen i cell B2. Vilken formel ska stå i cell B3?`, text: true,
              svar: '<code>=B2*1,03+2000</code>', test: () => nara(2000 * 1.03 + 2000, 4060),
              los: p('Behållningen från året innan växer med 3&nbsp;%, och samtidigt läggs 2&nbsp;000&nbsp;kr till:') + p('<code>=B2*1,03+2000</code>') + sv('<code>=B2*1,03+2000</code>') },
            { q: `Du sätter in 2&nbsp;000&nbsp;kr i slutet av varje år på ett konto med årsräntan ${pct('3')}. Hur stor är behållningen direkt efter den tredje insättningen?`, text: true,
              svar: '6&nbsp;181,80&nbsp;kr', test: () => nara((2000 * 1.03 + 2000) * 1.03 + 2000, 6181.80),
              los: p('Efter den första insättningen finns 2&nbsp;000&nbsp;kr. Efter den andra har de vuxit med 3&nbsp;% och 2&nbsp;000&nbsp;kr har lagts till:') +
                k('2\\,000 \\cdot 1{,}03 + 2\\,000 = 4\\,060\\ \\mathrm{kr}') + p('Efter den tredje:') + k('4\\,060 \\cdot 1{,}03 + 2\\,000 = 6\\,181{,}80\\ \\mathrm{kr}') +
                p('Rimligt: du har satt in 6&nbsp;000&nbsp;kr, och räntan är lite mer än 180&nbsp;kr.') + sv('6&nbsp;181,80&nbsp;kr') },
          ],
        },
      ],
    },
    {
      namn: 'Lån', under: 'Rak amortering, ränta per år, månad och kvartal',
      delar: [
        {
          rubrik: 'Beräkna.', kol: 2, hojd: 'kort',
          upg: [
            { q: 'Ett lån på 60&nbsp;000&nbsp;kr betalas tillbaka med rak amortering en gång per år i 5 år. Hur stor är amorteringen varje år?', text: true,
              svar: '12&nbsp;000&nbsp;kr', test: () => nara(60000 / 5, 12000),
              los: p('Lånet delas upp i 5 lika stora delar:') + k('\\frac{60\\,000\\ \\mathrm{kr}}{5} = 12\\,000\\ \\mathrm{kr}') + sv('12&nbsp;000&nbsp;kr') },
            { q: 'Ett lån på 36&nbsp;000&nbsp;kr betalas tillbaka med rak amortering varje månad i 3 år. Hur stor är amorteringen varje månad?', text: true,
              svar: '1&nbsp;000&nbsp;kr', test: () => nara(36000 / (3 * 12), 1000),
              los: p('På 3 år görs $3 \\cdot 12 = 36$ inbetalningar:') + k('\\frac{36\\,000\\ \\mathrm{kr}}{36} = 1\\,000\\ \\mathrm{kr}') + sv('1&nbsp;000&nbsp;kr') },
            { q: `Skulden är 80&nbsp;000&nbsp;kr och räntesatsen är ${pct('6')}. Hur stor är räntan för ett år?`, text: true,
              svar: '4&nbsp;800&nbsp;kr', test: () => nara(0.06 * 80000, 4800),
              los: p('Räntan för ett år är 6&nbsp;% av skulden:') + k('0{,}06 \\cdot 80\\,000\\ \\mathrm{kr} = 4\\,800\\ \\mathrm{kr}') + sv('4&nbsp;800&nbsp;kr') },
            { q: `Skulden är 80&nbsp;000&nbsp;kr och räntesatsen är ${pct('6')}. Hur stor är räntan för en månad?`, text: true,
              svar: '400&nbsp;kr', test: () => nara(0.06 * 80000 / 12, 400),
              los: p('Räntan för ett år är $0{,}06 \\cdot 80\\,000\\ \\mathrm{kr} = 4\\,800\\ \\mathrm{kr}$. Ett år har 12 månader:') + k('\\frac{4\\,800\\ \\mathrm{kr}}{12} = 400\\ \\mathrm{kr}') + sv('400&nbsp;kr') },
            { q: `Skulden är 120&nbsp;000&nbsp;kr och räntesatsen är ${pct('4,5')}. Hur stor är räntan för en månad?`, text: true,
              svar: '450&nbsp;kr', test: () => nara(0.045 * 120000 / 12, 450),
              los: p('Räntan för ett år:') + k('0{,}045 \\cdot 120\\,000\\ \\mathrm{kr} = 5\\,400\\ \\mathrm{kr}') + p('Räntan för en månad är en tolftedel av det:') + k('\\frac{5\\,400\\ \\mathrm{kr}}{12} = 450\\ \\mathrm{kr}') + sv('450&nbsp;kr') },
            { q: `Skulden är 30&nbsp;000&nbsp;kr och räntesatsen är ${pct('8')}. Hur stor är räntan för ett kvartal? Ett kvartal är tre månader.`, text: true,
              svar: '600&nbsp;kr', test: () => nara(0.08 * 30000 / 4, 600),
              los: p('Räntan för ett år:') + k('0{,}08 \\cdot 30\\,000\\ \\mathrm{kr} = 2\\,400\\ \\mathrm{kr}') + p('Ett år har fyra kvartal:') + k('\\frac{2\\,400\\ \\mathrm{kr}}{4} = 600\\ \\mathrm{kr}') + sv('600&nbsp;kr') },
          ],
        },
        {
          rubrik: 'Lös uppgifterna.', kol: 1, hojd: 'hog',
          upg: [
            { q: `Noah lånar 48&nbsp;000&nbsp;kr till en begagnad bil. Lånet betalas tillbaka med rak amortering varje månad i 2 år, och årsräntan är ${pct('6')}.<br>a) Hur stor är amorteringen varje månad?<br>b) Hur mycket ränta betalar Noah den första månaden?<br>c) Hur mycket betalar Noah totalt vid den första inbetalningen?<br>d) Hur mycket betalar Noah vid den andra inbetalningen?`, text: true,
              svar: 'a) 2&nbsp;000&nbsp;kr&emsp;b) 240&nbsp;kr&emsp;c) 2&nbsp;240&nbsp;kr&emsp;d) 2&nbsp;230&nbsp;kr',
              test: () => nara(48000 / 24, 2000) && nara(0.06 * 48000 / 12, 240) && nara(2000 + 240, 2240) && nara(2000 + 0.06 * 46000 / 12, 2230),
              los: del('a') + p('På 2 år görs $2 \\cdot 12 = 24$ inbetalningar:') + k('\\frac{48\\,000\\ \\mathrm{kr}}{24} = 2\\,000\\ \\mathrm{kr}') + sv('2&nbsp;000&nbsp;kr') +
                del('b') + p('Den första månaden är hela lånet kvar. Räntan för ett år och för en månad:') + k('0{,}06 \\cdot 48\\,000\\ \\mathrm{kr} = 2\\,880\\ \\mathrm{kr}') + k('\\frac{2\\,880\\ \\mathrm{kr}}{12} = 240\\ \\mathrm{kr}') + sv('240&nbsp;kr') +
                del('c') + p('Inbetalningen är amortering plus ränta:') + k('2\\,000\\ \\mathrm{kr} + 240\\ \\mathrm{kr} = 2\\,240\\ \\mathrm{kr}') + sv('2&nbsp;240&nbsp;kr') +
                del('d') + p('Efter första inbetalningen är skulden $48\\,000 - 2\\,000 = 46\\,000\\ \\mathrm{kr}$. Räntan räknas nu på den:') + k('\\frac{0{,}06 \\cdot 46\\,000\\ \\mathrm{kr}}{12} = 230\\ \\mathrm{kr}') + k('2\\,000\\ \\mathrm{kr} + 230\\ \\mathrm{kr} = 2\\,230\\ \\mathrm{kr}') + sv('2&nbsp;230&nbsp;kr') },
            { q: `Elsa lånar 20&nbsp;000&nbsp;kr. Lånet betalas tillbaka med rak amortering en gång per år i 4 år, och räntan är ${pct('5')}.<br>a) Fyll i tabellen.<br>b) Hur mycket betalar Elsa i ränta totalt?` + tab(LAN_RUB, [1, 2, 3, 4].map(n => [n, '', '', '', ''])), text: true,
              svar: 'a) Inbetalningarna blir 6&nbsp;000, 5&nbsp;750, 5&nbsp;500 och 5&nbsp;250&nbsp;kr.&emsp;b) 2&nbsp;500&nbsp;kr',
              test: () => LAN.every(([s, r, a, i], n) => s === 20000 - 5000 * n && nara(0.05 * s, r) && a === 20000 / 4 && i === a + r) && LAN.reduce((t, r) => t + r[1], 0) === 2500,
              los: del('a') + p('Amorteringen är $\\dfrac{20\\,000\\ \\mathrm{kr}}{4} = 5\\,000\\ \\mathrm{kr}$ varje år. Räntan är 5&nbsp;% av skulden som är kvar, till exempel $0{,}05 \\cdot 20\\,000 = 1\\,000$ det första året. Skulden minskar med 5&nbsp;000&nbsp;kr varje år.') +
                tab(['År', 'Skuld', 'Ränta', 'Amort.', 'Inbet.'], LAN.map((r, n) => [n + 1, ...r.map(tkr)]), 'fyll los-tab') +
                del('b') + k('1\\,000 + 750 + 500 + 250 = 2\\,500\\ \\mathrm{kr}') + sv('2&nbsp;500&nbsp;kr') },
          ],
        },
        {
          rubrik: 'Förklara.', kol: 2, hojd: 'mellan',
          upg: [
            { q: 'Vad är skillnaden mellan amortering och ränta?', text: true,
              svar: 'Amortering betalar tillbaka lånet, ränta är kostnaden för att låna.', test: () => true,
              los: p('Med amorteringen betalar man tillbaka själva lånet, så att skulden minskar. Räntan är priset för att få låna pengarna. Den minskar inte skulden.') + sv('Amortering är återbetalning av lånet, ränta är kostnaden för lånet.') },
            { q: 'Varför blir inbetalningarna mindre för varje gång när ett lån betalas med rak amortering?', text: true,
              svar: 'Räntan räknas på skulden, som minskar.', test: () => LAN.every((r, n) => n === 0 || r[3] < LAN[n - 1][3]),
              los: p('Amorteringen är lika stor varje gång, men räntan räknas på den skuld som är kvar. Skulden blir mindre för varje inbetalning, och då blir räntan också mindre.') + sv('Räntan räknas på en skuld som minskar, så räntedelen blir mindre för varje gång.') },
          ],
        },
      ],
    },
  ],
};

// =====================================================================
// BLAD 3: KOORDINATSYSTEM OCH LINJÄRA MODELLER (ma1c-4.1)
// =====================================================================
const PKT = [
  { lbl: 'A', x: 3, y: 2, svar: 'första kvadranten' },
  { lbl: 'B', x: -2, y: 4, svar: 'andra kvadranten' },
  { lbl: 'C', x: -4, y: -3, svar: 'tredje kvadranten' },
  { lbl: 'D', x: 2, y: -4, svar: 'fjärde kvadranten' },
  { lbl: 'E', x: 0, y: 3, svar: 'på ' + yax },
  { lbl: 'F', x: -5, y: 0, svar: 'på ' + xax },
  { lbl: 'G', x: 5, y: -1, svar: 'fjärde kvadranten' },
  { lbl: 'H', x: -1, y: -2, svar: 'tredje kvadranten', dx: -6, anchor: 'end' },
];
const kvadrant = (x, y) => (x === 0 ? 'y' : y === 0 ? 'x' : x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3));
const RITA = [['P', 4, 1], ['Q', -2, 3], ['R', -5, -2], ['S', 0, -4], ['T', 3, -3]];
const KS = { x: [-6, 6], y: [-6, 6], s: 18 };
const G = {
  punkter: graf({ ...KS, punkter: PKT.map(q => ({ x: q.x, y: q.y, lbl: q.lbl, dx: q.dx, anchor: q.anchor })), aria: 'Åtta punkter A till H' }),
  tom: graf({ ...KS, aria: 'Tomt koordinatsystem' }),
  ritad: graf({ ...KS, punkter: RITA.map(([lbl, x, y]) => ({ x, y, lbl, farg: BLA })), aria: 'Punkterna P, Q, R, S och T' }),
  ljus: graf({ x: [0, 9], y: [0, 13], s: 14, fns: [{ f: (x) => 12 - 1.5 * x, a: 0, b: 8 }], aria: 'Ljusets längd som funktion av tiden' }),
  planta: graf({ x: [0, 7], y: [0, 10], s: 16, aria: 'Tomt koordinatsystem för första kvadranten' }),
  plantaRitad: graf({ x: [0, 7], y: [0, 10], s: 20, fns: [{ f: (x) => 3 + x, a: 0, b: 6 }], punkter: [0, 2, 4, 6].map(x => ({ x, y: 3 + x })), aria: 'Grafen till y = 3 + x' }),
};
const BLAD3 = {
  fil: 'ovningsblad-koordinatsystem',
  titel: 'Koordinatsystem och linjära modeller',
  under: 'Koordinater och kvadranter, och linjära modeller som formel, tabell och graf',
  rakna: 'Räkna utan räknare.',
  box: `
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>En koordinat skrivs $(x, y)$: läget i sidled först, läget i höjdled sist. Origo är $(0, 0)$.</li>
        <li>Kvadranterna numreras moturs med start uppe till höger. I första kvadranten är både $x$ och $y$ positiva.</li>
        <li>En punkt på ${xax} har $y = 0$, och en punkt på ${yax} har $x = 0$.</li>
        <li>En <b>linjär modell</b> ändras lika mycket varje gång. Grafen blir en rät linje.</li>
        <li>Fast del $+$ del per enhet $\\cdot\\, x$, till exempel $y = 500 + 400x$.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: en verkstad tar 500&nbsp;kr i fast avgift och 400&nbsp;kr per timme</p>
      <p>Kostnaden $y$&nbsp;kr för $x$ timmar är</p>
      $$y = 500 + 400x$$
      <p>Värdetabell:</p>
      ${vt(['0', '1', '2', '3'], ['500', '900', '1&nbsp;300', '1&nbsp;700'])}
      <p>Punkterna $(0, 500)$, $(1, 900)$ och så vidare prickas in och förbinds med en rät linje.</p>
    </div>`,
  AVSNITT: [
    {
      namn: 'Koordinatsystem', under: 'Läsa av, rita in och kvadranter',
      delar: [
        {
          rubrik: 'Ange punktens koordinater. Ligger punkten i en kvadrant eller på en axel?', fig: G.punkter, kol: 4, hojd: 'kort',
          upg: PKT.map(q => ({
            q: 'Punkten ' + q.lbl, text: true, svar: `$(${q.x}, ${q.y})$, ${q.svar}`,
            test: () => { const kv = kvadrant(q.x, q.y); return q.svar.replace(/<[^>]+>/g, '').includes(kv === 'x' ? 'x-axeln' : kv === 'y' ? 'y-axeln' : ['första', 'andra', 'tredje', 'fjärde'][kv - 1]); },
            los: p(q.x === 0 ? `Punkten ligger rakt ovanför origo, ${q.y} steg upp. Den har inte flyttats i sidled, så $x = 0$.` : q.y === 0 ? `Punkten ligger ${Math.abs(q.x)} steg till vänster om origo och har inte flyttats i höjdled, så $y = 0$.` : `Gå ${Math.abs(q.x)} steg ${q.x > 0 ? 'åt höger' : 'åt vänster'} och ${Math.abs(q.y)} steg ${q.y > 0 ? 'uppåt' : 'nedåt'} från origo.`) + sv(`$(${q.x}, ${q.y})$, ${q.svar}`),
          })),
        },
        {
          rubrik: 'I vilken kvadrant ligger punkten?', kol: 4, hojd: 'kort',
          upg: [[4, 7], [-3, 5], [-2, -8], [6, -1]].map(([x, y]) => {
            const n = ['första', 'andra', 'tredje', 'fjärde'][kvadrant(x, y) - 1];
            const tx = x > 0 ? 'positiv' : 'negativ', ty = y > 0 ? 'positiv' : 'negativ';
            return { q: `(${x}, ${y})`, svar: `I ${n} kvadranten`, test: () => typeof kvadrant(x, y) === 'number',
              los: p(`Till ${x > 0 ? 'höger' : 'vänster'} om origo är ${xko} ${tx}, och ${y > 0 ? 'ovanför' : 'under'} origo är ${yko} ${ty}.`) + sv(`I ${n} kvadranten`) };
          }),
        },
        {
          rubrik: 'Rita punkterna i koordinatsystemet och skriv bokstaven vid varje punkt.', kol: 1, hojd: 'kort',
          upg: [
            { q: RITA.map(([l, x, y]) => `${l}&nbsp;$(${x}, ${y})$`).join(',&ensp;') + fig(G.tom), text: true,
              svar: 'Se lösningsförslaget.', test: () => RITA.every(([, x, y]) => Math.abs(x) <= 6 && Math.abs(y) <= 6),
              los: p('Börja i origo. Gå först i sidled och sedan i höjdled. S ligger på ' + yax + ' eftersom $x = 0$.') + fig(G.ritad) },
          ],
        },
        {
          rubrik: 'Svara på frågorna.', kol: 2, hojd: 'kort',
          upg: [
            { q: 'Vilka koordinater har origo?', text: true, svar: '$(0, 0)$', test: () => kvadrant(0, 0) === 'y',
              los: p('Origo är där axlarna skär varandra. Där är både $x$ och $y$ noll.') + sv('$(0, 0)$') },
            { q: `En punkt ligger på ${xax}. Vilken är dess ${yko}?`, text: true, svar: '0', test: () => kvadrant(3, 0) === 'x',
              los: p(`På ${xax} har man inte gått något i höjdled.`) + sv('$y = 0$') },
            { q: 'Vilket tecken har $x$ och $y$ i andra kvadranten?', text: true, svar: '$x$ negativ, $y$ positiv', test: () => kvadrant(-1, 1) === 2,
              los: p('Andra kvadranten ligger uppe till vänster: till vänster om origo är $x$ negativ, ovanför origo är $y$ positiv.') + sv('$x$ är negativ och $y$ är positiv.') },
            { q: 'Punkten $(a, 5)$ ligger i andra kvadranten. Vad vet du om talet $a$?', text: true, svar: '$a$ är negativt', test: () => kvadrant(-2, 5) === 2,
              los: p('I andra kvadranten är ' + xko + ' negativ.') + sv('$a < 0$, alltså är $a$ ett negativt tal.') },
          ],
        },
      ],
    },
    {
      namn: 'Linjära modeller', under: 'Formel, värdetabell och graf',
      delar: [
        {
          rubrik: 'Teckna en formel för sambandet.', kol: 2, hojd: 'mellan',
          upg: [
            { q: 'Ett gym tar 300&nbsp;kr i startavgift och 250&nbsp;kr per månad. Kostnaden är $y$&nbsp;kr för $x$ månader.', text: true, svar: '$y = 300 + 250x$', test: () => 300 + 250 * 2 === 800,
              los: p('Startavgiften betalas en gång och är den fasta delen. 250&nbsp;kr betalas för varje månad, alltså $250 \\cdot x$:') + k('y = 300 + 250x') + sv('$y = 300 + 250x$') },
            { q: 'Att hyra en elsparkcykel kostar 10&nbsp;kr för upplåsningen och 3&nbsp;kr per minut. Kostnaden är $y$&nbsp;kr för $x$ minuter.', text: true, svar: '$y = 10 + 3x$', test: () => 10 + 3 * 5 === 25,
              los: p('Upplåsningen är den fasta delen, och 3&nbsp;kr tillkommer för varje minut:') + k('y = 10 + 3x') + sv('$y = 10 + 3x$') },
            { q: 'Ett ljus är 20&nbsp;cm långt och brinner ned 2&nbsp;cm per timme. Längden är $y$&nbsp;cm efter $x$ timmar.', text: true, svar: '$y = 20 - 2x$', test: () => 20 - 2 * 10 === 0,
              los: p('Från början är ljuset 20&nbsp;cm. Varje timme blir det 2&nbsp;cm kortare, så $2x$ dras bort:') + k('y = 20 - 2x') + sv('$y = 20 - 2x$') },
            { q: 'Hugo har 150&nbsp;kr i en spargris och lägger i 50&nbsp;kr varje vecka. Han har $y$&nbsp;kr efter $x$ veckor.', text: true, svar: '$y = 150 + 50x$', test: () => 150 + 50 * 4 === 350,
              los: p('Han börjar med 150&nbsp;kr, och 50&nbsp;kr tillkommer varje vecka:') + k('y = 150 + 50x') + sv('$y = 150 + 50x$') },
          ],
        },
        {
          rubrik: 'Fyll i värdetabellen.', kol: 2, hojd: 'kort',
          upg: [
            { q: 'Kostnaden på gymmet, $y = 300 + 250x$' + vt(['0', '1', '2', '3', '4']), text: true,
              svar: '300, 550, 800, 1&nbsp;050, 1&nbsp;300', test: () => [0, 1, 2, 3, 4].map(x => 300 + 250 * x).join() === '300,550,800,1050,1300',
              los: p('Sätt in varje värde på $x$ i formeln, till exempel') + k('y = 300 + 250 \\cdot 3 = 1\\,050') + vt(['0', '1', '2', '3', '4'], ['300', '550', '800', '1&nbsp;050', '1&nbsp;300']) + p('$y$ ökar med 250 för varje steg i $x$.') },
            { q: 'Ljusets längd, $y = 20 - 2x$' + vt(['0', '2', '4', '6', '8']), text: true,
              svar: '20, 16, 12, 8, 4', test: () => [0, 2, 4, 6, 8].map(x => 20 - 2 * x).join() === '20,16,12,8,4',
              los: p('Sätt in varje värde på $x$, till exempel') + k('y = 20 - 2 \\cdot 6 = 8') + vt(['0', '2', '4', '6', '8'], ['20', '16', '12', '8', '4']) },
          ],
        },
        {
          rubrik: 'Grafen visar längden $y$&nbsp;cm hos ett annat ljus efter $x$ timmar. Läs av i grafen.', fig: G.ljus, kol: 2, hojd: 'kort',
          upg: [
            { q: 'Hur långt var ljuset från början?', text: true, svar: '12&nbsp;cm', test: () => 12 - 1.5 * 0 === 12,
              los: p('Från början är $x = 0$. Grafen skär ' + yax + ' vid $y = 12$.') + sv('12&nbsp;cm') },
            { q: 'Hur långt är ljuset efter 4 timmar?', text: true, svar: '6&nbsp;cm', test: () => 12 - 1.5 * 4 === 6,
              los: p('Gå upp från $x = 4$ till linjen och läs av $y$.') + sv('6&nbsp;cm') },
            { q: 'Efter hur många timmar har ljuset brunnit ut?', text: true, svar: '8 timmar', test: () => 12 - 1.5 * 8 === 0,
              los: p('Ljuset är slut när $y = 0$. Linjen når ' + xax + ' vid $x = 8$.') + sv('Efter 8 timmar') },
            { q: 'Hur många centimeter brinner ljuset ned per timme? Teckna en formel för $y$.', text: true, svar: '1,5&nbsp;cm per timme, $y = 12 - 1{,}5x$', test: () => (12 - 1.5 * 2) === 9 && nara((12 - 6) / 4, 1.5),
              los: p('På 4 timmar blir ljuset $12 - 6 = 6$&nbsp;cm kortare:') + k('\\frac{6\\ \\mathrm{cm}}{4\\ \\mathrm{h}} = 1{,}5\\ \\mathrm{cm\\ per\\ timme}') + p('Det fasta värdet är 12 och 1,5 dras bort varje timme:') + k('y = 12 - 1{,}5x') + sv('1,5&nbsp;cm per timme och $y = 12 - 1{,}5x$') },
          ],
        },
        {
          rubrik: 'Rita grafen.', kol: 1, hojd: 'kort',
          upg: [
            { q: 'En planta är 3&nbsp;cm hög och växer 1&nbsp;cm per vecka. Höjden är $y$&nbsp;cm efter $x$ veckor.<br>a) Teckna en formel för $y$.<br>b) Gör en värdetabell för $x = 0$, 2, 4 och 6.<br>c) Rita grafen för de första sex veckorna.' + fig(G.planta), text: true,
              svar: 'a) $y = 3 + x$&emsp;b) 3, 5, 7, 9&emsp;c) Se lösningsförslaget.', test: () => [0, 2, 4, 6].map(x => 3 + x).join() === '3,5,7,9',
              los: del('a') + p('Plantan är 3&nbsp;cm från början och växer 1&nbsp;cm per vecka:') + k('y = 3 + x') + sv('$y = 3 + x$') +
                del('b') + vt(['0', '2', '4', '6'], ['3', '5', '7', '9']) +
                del('c') + p('Pricka in $(0, 3)$, $(2, 5)$, $(4, 7)$ och $(6, 9)$ och förbind dem med en rät linje:') + fig(G.plantaRitad) },
          ],
        },
        {
          rubrik: 'Är sambandet linjärt? Motivera.', kol: 2, hojd: 'kort',
          upg: [
            { q: 'Ett pris höjs med 10&nbsp;kr varje år.', text: true, svar: 'Ja', test: () => true,
              los: p('Priset ändras lika mycket, 10&nbsp;kr, varje år.') + sv('Ja') },
            { q: `Ett pris höjs med ${pct('10')} varje år.`, text: true, svar: 'Nej', test: () => 100 * 1.1 - 100 < 110 * 1.1 - 110,
              los: p('Med 100&nbsp;kr från början blir höjningen 10&nbsp;kr första året, men 11&nbsp;kr andra året, eftersom den räknas på 110&nbsp;kr. Priset ändras inte lika mycket varje år.') + sv('Nej') },
            { q: 'Värdetabellen' + vt(['0', '1', '2', '3'], ['5', '8', '11', '14']), text: true, svar: 'Ja', test: () => [8 - 5, 11 - 8, 14 - 11].every(d => d === 3),
              los: p('$y$ ökar med 3 för varje steg i $x$, varje gång.') + sv('Ja') },
            { q: 'Värdetabellen' + vt(['0', '1', '2', '3'], ['2', '4', '8', '16']), text: true, svar: 'Nej', test: () => 4 - 2 !== 8 - 4,
              los: p('$y$ ökar med 2, sedan 4 och sedan 8. Ökningen är inte lika stor varje gång. (Här fördubblas $y$ i stället.)') + sv('Nej') },
          ],
        },
      ],
    },
  ],
};

// =====================================================================
// sidan
// =====================================================================
function bygg(B) {
  let nr = 0;
  for (const av of B.AVSNITT) {
    av.forsta = nr + 1;
    for (const d of av.delar) for (const u of d.upg) {
      nr++; u.nr = nr;
      if (!u.test()) throw new Error(`${B.fil}: kontroll misslyckades i uppgift ${nr}: ${u.q}`);
      if (/—/.test(u.los + u.q + u.svar)) throw new Error(`${B.fil}: tankstreck i uppgift ${nr}`);
    }
    av.sista = nr;
  }
  const ANTAL = nr;
  B.antal = ANTAL;
  // Rubriken i lösningsförslaget visar uppgiften när den är kort och utan figur eller tabell.
  const solh = (u) => (!u.text ? ' $' + u.q + '$' : (u.q.length < 70 && !/<(div|br|table)/.test(u.q) ? ' ' + u.q : ''));

  const uppgHtml = B.AVSNITT.map(n => `
  <section class="niva">
    <h2><span class="nivanamn">${n.namn}</span><span class="sv">Uppgift ${n.forsta}–${n.sista} · ${n.under}</span></h2>
${n.delar.map(d => `    <p class="instr">${d.rubrik}</p>${d.fig ? `\n    <div class="fig delfig">${d.fig}</div>` : ''}
    <div class="tasks c${d.kol}">
${d.upg.map(u => `      <div class="task ${d.hojd}"><span class="nr">${u.nr}</span><span class="eq${u.text ? ' txt' : ''}">${u.text ? u.q : '$' + u.q + '$'}</span></div>`).join('\n')}
    </div>`).join('\n')}
  </section>`).join('\n');

  const svarHtml = B.AVSNITT.map(n => `
    <h3 class="svarniva">${n.namn}</h3>
    <div class="svarlista">${n.delar.flatMap(d => d.upg).map(u => `<div${u.svar.replace(/<[^>]+>|\$|\\[a-z]+/g, '').replace(/&[a-z]+;/g, ' ').length > 22 ? ' class="lang"' : ''}><span class="nr">${u.nr}</span><span>${u.svar}</span></div>`).join('')}</div>`).join('');

  const losHtml = B.AVSNITT.map(n => `
    <h3 class="losniva">${n.namn}</h3>
    <div class="los">
${n.delar.flatMap(d => d.upg).map(u => `      <div class="sol"><p class="solh"><span class="nr">${u.nr}</span>${solh(u)}</p>${u.los}</div>`).join('\n')}
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: ${B.titel} — Fysiklabbet</title>
<meta name="description" content="${ANTAL} uppgifter på grundnivå om ${B.titel.toLowerCase()} i Matematik nivå 1b och 1c: ${B.under.toLowerCase()}. Med svar och lösningsförslag. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/${B.fil}.html">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'svg'],
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
.box ul { margin: 2px 0 2px 16px; padding: 0; }
.box li { margin: 1px 0; }
.box .katex-display { margin: 2px 0 3px; text-align:left; }
.box .katex-display > .katex { text-align:left; }
.rub { font-weight: 600; }
.nw { white-space: nowrap; }
.nivaer { font-size: 9.5pt; color:#3b4350; margin: 0 0 6px; }
.niva { margin-bottom: 6px; }
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
.task:has(.fig), .task:has(table) { align-items: flex-start; }
.task .katex, .sol p .katex, .svarlista .katex, .box p .katex, .box li .katex { white-space: nowrap; }
.kort { min-height: 16mm; } .mellan { min-height: 30mm; } .hog { min-height: 44mm; }
.fig { margin: 6px 0 4px; }
.fig svg { display:block; max-width: 100%; height: auto; margin: 0 auto; }
.delfig { break-after: avoid; break-inside: avoid; }
.sol .fig svg { max-width: 62mm; }
code { font-family: 'JetBrains Mono', Consolas, monospace; font-size: .92em; background: rgba(31,37,48,.06); padding: 0 3px; border-radius: 3px; white-space: nowrap; }
table { border-collapse: collapse; margin: 5px 0; font-size: 10pt; }
table th, table td { border: 1px solid rgba(31,37,48,.45); padding: 2px 8px; text-align: center; }
table th { background: var(--paper); font-weight: 600; }
.vt td { min-width: 12mm; height: 7mm; }
.box .vt td { height: auto; min-width: 0; }
.kalk { margin: 4px auto 6px; font-size: 9.5pt; }
.kalk th { background: #e9e6df; color:#3b4350; font-weight: 500; min-width: 8mm; }
.kalk td { min-width: 22mm; height: 6.5mm; text-align: left; }
.fyll { width: 100%; font-size: 9.5pt; }
.fyll td { height: 9mm; }
.fyll.los-tab { font-size: 8.8pt; }
.fyll.los-tab td { height: auto; padding: 1px 4px; }
.fyll.los-tab th { padding: 1px 4px; }
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
  .fyll th { font-size: 8pt; padding: 2px 3px; }
  .kalk { font-size: 8.5pt; }
  .kalk td { min-width: 0; padding: 2px 4px; }
  .kalk th { min-width: 0; padding: 2px 4px; }
  .delfig { overflow-x: auto; }
}
</style>
</head>
<body>
<section class="page">
  <header>
    <p class="over">Matematik nivå 1b och 1c · Övningsblad · Grund</p>
    <h1>${B.titel}</h1>
    <p class="under">${B.under}</p>
    <div class="namn"><span>Namn:</span><span>Klass:</span></div>
  </header>
  <div class="box boxgrid">${B.box}
  </div>
  <p class="nivaer">Bladet är på <b>grundnivå</b>: uppgifterna tränar avsnittets metoder en i taget, och de sista uppgifterna i varje del är i text. ${B.rakna} Svar och lösningsförslag finns efter uppgifterna.</p>
${uppgHtml}
  <section class="facit">
    <h2><span>Svar</span></h2>
${svarHtml}
    <h2><span>Lösningsförslag</span></h2>
${losHtml}
  </section>
  <footer><span>Matematik nivå 1b och 1c · ${B.titel}</span><span>fysiklabbet.se</span></footer>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;
  const out = path.join(DIR, B.fil + '.html');
  fs.writeFileSync(out, html);
  console.log('Skrev', path.relative(process.cwd(), out), '·', ANTAL, 'uppgifter');
}

for (const B of [BLAD1, BLAD2, BLAD3]) bygg(B);
