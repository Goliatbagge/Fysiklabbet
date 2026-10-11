// Bygger tre övningsblad för Matematik nivå 1b, ett per kapitel:
//   kapitel 1 Aritmetik (utan talmängder och rationella exponenter),
//   kapitel 3 Procentuella förändringar (utan promille, ppm, KPI och index),
//   kapitel 4 Räta linjer och funktioner (utan potensfunktioner).
// Varje blad har nivån Grund och en mindre del Mellan. Nivåerna heter
// aldrig betygsbokstäver: betyg sätts på kursen, inte på uppgifter.
//
// Varje svar kontrolleras numeriskt (test() på varje uppgift), så att facit
// inte kan innehålla ett räknefel. Graferna i kapitel 4 ritas ur sina
// funktioner med graf() längst upp.
//
//   node .claude/bygg-ovningsblad-ma1b.js
//     bygger ovningsblad/ovningsblad-ma1b-kap1.html, -kap3.html, -kap4.html
//
// PDF-versionerna görs sedan med headless Chrome mot dev-servern:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//     --print-to-pdf=ovningsblad/ovningsblad-ma1b-kap1.pdf
//     http://localhost:8000/ovningsblad/ovningsblad-ma1b-kap1.html
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'ovningsblad');

// ---------- hjälpfunktioner för lösningarna ----------
const k = (s) => `$$${s}$$`;
const p = (s) => `<p>${s}</p>`;
const sv = (s) => `<p class="svar"><b>Svar:</b> ${s}</p>`;
const kt = (s) => `<p class="kontroll"><i>Kontroll:</i> ${s}</p>`;
const del = (b) => `<p class="del">${b})</p>`;
const fig = (svg) => `<div class="fig">${svg}</div>`;
// operation i båda led, med operationen i fetstil
const minus = (vl, hl, t) => k(String.raw`${vl} \mathbin{\boldsymbol{-}} \boldsymbol{${t}} = ${hl} \mathbin{\boldsymbol{-}} \boldsymbol{${t}}`);
const plus = (vl, hl, t) => k(String.raw`${vl} \mathbin{\boldsymbol{+}} \boldsymbol{${t}} = ${hl} \mathbin{\boldsymbol{+}} \boldsymbol{${t}}`);
const delat = (vl, hl, t) => k(String.raw`\frac{${vl}}{\boldsymbol{${t}}} = \frac{${hl}}{\boldsymbol{${t}}}`);
const samma = 'Båda led är nu potenser med samma bas. Då måste exponenterna vara lika:';
const nara = (a, b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b));

// ---------- grafer (kapitel 4) ----------
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
const iv = (s) => s.replace(/\b([xy])\b/g, '<tspan font-style="italic">$1</tspan>');

// =====================================================================
// KAPITEL 1: ARITMETIK
// =====================================================================
const KAP1 = {
  fil: 'ovningsblad-ma1b-kap1',
  titel: 'Aritmetik',
  under: 'Negativa tal, bråk, decimalform, potenser, grundpotensform och prioriteringsregler',
  beskrivning: 'Övningsblad i kapitel 1 Aritmetik för Matematik nivå 1b',
  rakna: 'Räkna utan räknare.',
  box: String.raw`
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>Lika tecken ger plus, olika tecken ger minus: $a - (-b) = a + b$ och $(-a) \cdot (-b) = a \cdot b$.</li>
        <li>Bråk adderas när de har samma nämnare. Vid division inverteras bråket man delar med: $\dfrac{a}{b} \Big/ \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c}$.</li>
        <li>Vid multiplikation och division avgör minst antal värdesiffror, vid addition och subtraktion minst antal decimaler.</li>
        <li>$a^x \cdot a^y = a^{x+y}$, $\dfrac{a^x}{a^y} = a^{x-y}$, $(a^x)^y = a^{x \cdot y}$, $a^0 = 1$, $a^{-n} = \dfrac{1}{a^n}$</li>
        <li>Grundpotensform: $a \cdot 10^n$ med $1 \leq a < 10$. Prefix: <span class="nw">G $= 10^9$</span>, <span class="nw">M $= 10^6$</span>, <span class="nw">k $= 10^3$</span>, <span class="nw">m $= 10^{-3}$</span>, <span class="nw">µ $= 10^{-6}$</span>.</li>
        <li>Ordning: parenteser, potenser, multiplikation och division, sist addition och subtraktion.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: beräkna $\dfrac{3}{4} - \dfrac{1}{6}$</p>
      <p>Nämnarna är olika. Både 4 och 6 går jämnt upp i 12, så vi förlänger bråken till nämnaren 12:</p>
      $$\frac{3 \cdot 3}{4 \cdot 3} - \frac{1 \cdot 2}{6 \cdot 2} = \frac{9}{12} - \frac{2}{12}$$
      <p>Med samma nämnare subtraheras täljarna:</p>
      $$\frac{9}{12} - \frac{2}{12} = \frac{7}{12}$$
      <p>Bråket går inte att förkorta, så svaret är $\dfrac{7}{12}$.</p>
    </div>`,
  NIVAER: [
    {
      namn: 'Grund', under: 'Kapitlets metoder en i taget',
      delar: [
        { rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'kort', upg: [
          { q: '4 - (-9)', svar: '13', test: () => 4 - (-9) === 13,
            los: p('Minus minus ger plus:') + k('4 - (-9) = 4 + 9 = 13') + sv('13') },
          { q: '(-5) - 3', svar: '$-8$', test: () => (-5) - 3 === -8,
            los: p('Här dras ett positivt tal ifrån. Tänk på en termometer som visar $-5$ grader: sjunker temperaturen 3 grader till visar den $-8$ grader.') + k('(-5) - 3 = -8') + sv('$-8$') },
          { q: '-7 + 12', svar: '5', test: () => -7 + 12 === 5,
            los: p('Att börja på $-7$ och gå 12 steg uppåt är samma sak som $12 - 7$:') + k('-7 + 12 = 12 - 7 = 5') + sv('5') },
          { q: '25 + (-10)', svar: '15', test: () => 25 + (-10) === 15,
            los: p('Plus minus ger minus:') + k('25 + (-10) = 25 - 10 = 15') + sv('15') },
          { q: '6 \\cdot (-4)', svar: '$-24$', test: () => 6 * -4 === -24,
            los: p('Olika tecken ger minus:') + k(String.raw`6 \cdot (-4) = -24`) + sv('$-24$') },
          { q: '(-8) \\cdot (-3)', svar: '24', test: () => -8 * -3 === 24,
            los: p('Lika tecken ger plus:') + k(String.raw`(-8) \cdot (-3) = 24`) + sv('24') },
          { q: '\\dfrac{-42}{6}', svar: '$-7$', test: () => -42 / 6 === -7,
            los: p('Samma teckenregel gäller vid division. Olika tecken ger minus:') + k(String.raw`\frac{-42}{6} = -7`) + sv('$-7$') },
          { q: '\\dfrac{-36}{-9}', svar: '4', test: () => -36 / -9 === 4,
            los: p('Lika tecken ger plus:') + k(String.raw`\frac{-36}{-9} = 4`) + sv('4') },
        ] },
        { rubrik: 'Förkorta så långt som möjligt.', kol: 4, hojd: 'kort', upg: [
          { q: '\\dfrac{6}{15}', svar: '$\\dfrac{2}{5}$', test: () => nara(6 / 15, 2 / 5),
            los: p('Täljaren och nämnaren har den gemensamma faktorn 3, som stryks:') + k(String.raw`\frac{6}{15} = \frac{2 \cdot 3}{5 \cdot 3} = \frac{2}{5}`) + sv(String.raw`$\dfrac{2}{5}$`) },
          { q: '\\dfrac{12}{18}', svar: '$\\dfrac{2}{3}$', test: () => nara(12 / 18, 2 / 3),
            los: p('Den största gemensamma faktorn är 6:') + k(String.raw`\frac{12}{18} = \frac{2 \cdot 6}{3 \cdot 6} = \frac{2}{3}`) + sv(String.raw`$\dfrac{2}{3}$`) },
          { q: '\\dfrac{35}{49}', svar: '$\\dfrac{5}{7}$', test: () => nara(35 / 49, 5 / 7),
            los: p('Både 35 och 49 finns i sjuans tabell:') + k(String.raw`\frac{35}{49} = \frac{5 \cdot 7}{7 \cdot 7} = \frac{5}{7}`) + sv(String.raw`$\dfrac{5}{7}$`) },
          { q: '\\dfrac{36}{48}', svar: '$\\dfrac{3}{4}$', test: () => nara(36 / 48, 3 / 4),
            los: p('Den största gemensamma faktorn är 12:') + k(String.raw`\frac{36}{48} = \frac{3 \cdot 12}{4 \cdot 12} = \frac{3}{4}`) + p('Förkortar du med en mindre faktor, till exempel 2, får du förkorta flera gånger och kommer till samma svar.') + sv(String.raw`$\dfrac{3}{4}$`) },
        ] },
        { rubrik: 'Beräkna. Svara i enklaste form.', kol: 4, hojd: 'mellan', upg: [
          { q: '\\dfrac{2}{7} + \\dfrac{3}{7}', svar: '$\\dfrac{5}{7}$', test: () => nara(2 / 7 + 3 / 7, 5 / 7),
            los: p('Samma nämnare: täljarna adderas och nämnaren står kvar.') + k(String.raw`\frac{2}{7} + \frac{3}{7} = \frac{2 + 3}{7} = \frac{5}{7}`) + sv(String.raw`$\dfrac{5}{7}$`) },
          { q: '\\dfrac{5}{6} - \\dfrac{1}{6}', svar: '$\\dfrac{2}{3}$', test: () => nara(5 / 6 - 1 / 6, 2 / 3),
            los: k(String.raw`\frac{5}{6} - \frac{1}{6} = \frac{4}{6} = \frac{2}{3}`) + p('Bråket förkortas med 2 på slutet.') + sv(String.raw`$\dfrac{2}{3}$`) },
          { q: '\\dfrac{1}{2} + \\dfrac{1}{3}', svar: '$\\dfrac{5}{6}$', test: () => nara(1 / 2 + 1 / 3, 5 / 6),
            los: p('Olika nämnare. Båda bråken kan skrivas med nämnaren 6:') + k(String.raw`\frac{1 \cdot 3}{2 \cdot 3} + \frac{1 \cdot 2}{3 \cdot 2} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}`) + sv(String.raw`$\dfrac{5}{6}$`) },
          { q: '\\dfrac{3}{4} - \\dfrac{2}{5}', svar: '$\\dfrac{7}{20}$', test: () => nara(3 / 4 - 2 / 5, 7 / 20),
            los: p('Gemensam nämnare är $4 \\cdot 5 = 20$:') + k(String.raw`\frac{3 \cdot 5}{4 \cdot 5} - \frac{2 \cdot 4}{5 \cdot 4} = \frac{15}{20} - \frac{8}{20} = \frac{7}{20}`) + sv(String.raw`$\dfrac{7}{20}$`) },
          { q: '\\dfrac{2}{3} \\cdot \\dfrac{4}{5}', svar: '$\\dfrac{8}{15}$', test: () => nara(2 / 3 * 4 / 5, 8 / 15),
            los: p('Täljare gånger täljare och nämnare gånger nämnare:') + k(String.raw`\frac{2}{3} \cdot \frac{4}{5} = \frac{2 \cdot 4}{3 \cdot 5} = \frac{8}{15}`) + sv(String.raw`$\dfrac{8}{15}$`) },
          { q: '3 \\cdot \\dfrac{5}{6}', svar: '$\\dfrac{5}{2}$', test: () => nara(3 * 5 / 6, 5 / 2),
            los: p('Bara täljaren multipliceras med 3:') + k(String.raw`3 \cdot \frac{5}{6} = \frac{3 \cdot 5}{6} = \frac{15}{6} = \frac{5}{2}`) + p('Bråket förkortas med 3 på slutet.') + sv(String.raw`$\dfrac{5}{2}$`) },
          { q: '\\dfrac{3}{4} \\Big/ \\dfrac{2}{5}', svar: '$\\dfrac{15}{8}$', test: () => nara((3 / 4) / (2 / 5), 15 / 8),
            los: p('Att dividera med ett bråk är att multiplicera med det inverterade bråket:') + k(String.raw`\frac{3}{4} \Big/ \frac{2}{5} = \frac{3}{4} \cdot \frac{5}{2} = \frac{15}{8}`) + sv(String.raw`$\dfrac{15}{8}$`) },
          { q: '\\dfrac{2}{3} \\Big/ 4', svar: '$\\dfrac{1}{6}$', test: () => nara((2 / 3) / 4, 1 / 6),
            los: p('Talet 4 är $\\dfrac{4}{1}$, och inverterat blir det $\\dfrac{1}{4}$:') + k(String.raw`\frac{2}{3} \Big/ 4 = \frac{2}{3} \cdot \frac{1}{4} = \frac{2}{12} = \frac{1}{6}`) + sv(String.raw`$\dfrac{1}{6}$`) },
        ] },
        { rubrik: 'Lös uppgifterna.', kol: 2, hojd: 'mellan', upg: [
          { q: 'Hur mycket är $\\dfrac{3}{4}$ av 60&nbsp;kr?', text: true, svar: '45 kr', test: () => 3 / 4 * 60 === 45,
            los: p('En bråkdel av något beräknas genom att multiplicera med bråkdelen:') + k(String.raw`\frac{3}{4} \cdot 60 = \frac{3 \cdot 60}{4} = \frac{180}{4} = 45`) + sv('45 kr') },
          { q: 'Avrunda 47,386 till<br>a)&nbsp;en decimal&emsp;&emsp;b)&nbsp;heltal<br>c)&nbsp;fyra värdesiffror', text: true,
            svar: 'a) 47,4&emsp;b) 47&emsp;c) 47,39', test: () => (47.386).toFixed(1) === '47.4' && (47.386).toFixed(0) === '47' && (47.386).toFixed(2) === '47.39',
            los: del('a') + p('Tiondelssiffran är 3. Siffran efter den är 8, som är 5 eller mer, så vi avrundar uppåt.') + k(String.raw`47{,}386 \approx 47{,}4`) + sv('47,4') +
              del('b') + p('Entalssiffran är 7. Siffran efter den är 3, som är mindre än 5, så vi avrundar nedåt.') + k(String.raw`47{,}386 \approx 47`) + sv('47') +
              del('c') + p('De fyra första siffrorna är 4, 7, 3 och 8. Siffran efter är 6, så åttan avrundas uppåt till en nia.') + k(String.raw`47{,}386 \approx 47{,}39`) + sv('47,39') },
          { q: 'En rektangel är 4,2&nbsp;m lång och 3,15&nbsp;m bred. Beräkna arean och avrunda till rätt antal värdesiffror.', text: true,
            svar: '13&nbsp;m<sup>2</sup>', test: () => nara(4.2 * 3.15, 13.23) && Math.round(13.23) === 13,
            los: p('Arean av en rektangel är längden gånger bredden:') + k(String.raw`A = 4{,}2 \cdot 3{,}15 = 13{,}23`) +
              p('Vid multiplikation avgör talet med minst antal värdesiffror. 4,2 har två värdesiffror och 3,15 har tre, så svaret ska ha två.') +
              k(String.raw`13{,}23\ \mathrm{m^2} \approx 13\ \mathrm{m^2}`) + sv('13&nbsp;m<sup>2</sup>') },
          { q: 'En planka är 2,48&nbsp;m lång. Du sågar av 1,6&nbsp;m. Hur lång bit är kvar? Avrunda till rätt antal decimaler.', text: true,
            svar: '0,9&nbsp;m', test: () => nara(2.48 - 1.6, 0.88) && (0.88).toFixed(1) === '0.9',
            los: k(String.raw`2{,}48 - 1{,}6 = 0{,}88`) +
              p('Vid subtraktion avgör talet med minst antal decimaler. 1,6 har en decimal, så svaret ska ha en decimal.') +
              k(String.raw`0{,}88\ \mathrm{m} \approx 0{,}9\ \mathrm{m}`) + sv('0,9&nbsp;m') },
        ] },
        { rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'kort', upg: [
          { q: '2^5', svar: '32', test: () => 2 ** 5 === 32,
            los: k(String.raw`2^5 = 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 32`) + sv('32') },
          { q: '(-3)^2', svar: '9', test: () => (-3) ** 2 === 9,
            los: p('Parentesen gör hela $-3$ till bas:') + k(String.raw`(-3)^2 = (-3) \cdot (-3) = 9`) + sv('9') },
          { q: '-3^2', svar: '$-9$', test: () => -(3 ** 2) === -9,
            los: p('Utan parentes är basen bara 3. Minustecknet står utanför potensen:') + k(String.raw`-3^2 = -(3 \cdot 3) = -9`) + sv('$-9$') },
          { q: '10^{-2}', svar: '0,01', test: () => nara(10 ** -2, 0.01),
            los: p('Negativ exponent betyder 1 delat med potensen:') + k(String.raw`10^{-2} = \frac{1}{10^2} = \frac{1}{100} = 0{,}01`) + sv('0,01') },
          { q: '5^0', svar: '1', test: () => 5 ** 0 === 1,
            los: p('Varje tal utom 0 upphöjt till 0 är 1, inte 0:') + k('5^0 = 1') + sv('1') },
          { q: '4^{-1}', svar: '$\\dfrac{1}{4}$', test: () => 4 ** -1 === 1 / 4,
            los: k(String.raw`4^{-1} = \frac{1}{4^1} = \frac{1}{4}`) + sv(String.raw`$\dfrac{1}{4}$`) },
        ] },
        { rubrik: 'Skriv som en enda potens.', kol: 4, hojd: 'kort', upg: [
          { q: '3^4 \\cdot 3^5', svar: '$3^9$', test: () => 3 ** 4 * 3 ** 5 === 3 ** 9,
            los: p('Samma bas: exponenterna adderas.') + k(String.raw`3^4 \cdot 3^5 = 3^{4+5} = 3^9`) + sv('$3^9$') },
          { q: '\\dfrac{7^8}{7^3}', svar: '$7^5$', test: () => 7 ** 8 / 7 ** 3 === 7 ** 5,
            los: p('Samma bas: nämnarens exponent dras ifrån täljarens.') + k(String.raw`\frac{7^8}{7^3} = 7^{8-3} = 7^5`) + sv('$7^5$') },
          { q: '(2^3)^4', svar: '$2^{12}$', test: () => (2 ** 3) ** 4 === 2 ** 12,
            los: p('En potens upphöjd till en exponent: exponenterna multipliceras.') + k(String.raw`(2^3)^4 = 2^{3 \cdot 4} = 2^{12}`) + sv('$2^{12}$') },
          { q: 'x^2 \\cdot x^6', svar: '$x^8$', test: () => [1.3, 2, -0.7].every(x => nara(x ** 2 * x ** 6, x ** 8)),
            los: k(String.raw`x^2 \cdot x^6 = x^{2+6} = x^8`) + sv('$x^8$') },
        ] },
        { rubrik: 'Skriv i grundpotensform.', kol: 4, hojd: 'kort', upg: [
          { q: '743\\,000', svar: '$7{,}43 \\cdot 10^5$', test: () => nara(7.43e5, 743000),
            los: p('Talet framför tiopotensen ska ligga mellan 1 och 10. Decimaltecknet flyttas 5 steg åt vänster:') + k(String.raw`743\,000 = 7{,}43 \cdot 100\,000 = 7{,}43 \cdot 10^5`) + sv(String.raw`$7{,}43 \cdot 10^5$`) },
          { q: '8\\,000\\,000\\,000', svar: '$8 \\cdot 10^9$', test: () => 8e9 === 8000000000,
            los: p('Nio nollor ger exponenten 9:') + k(String.raw`8\,000\,000\,000 = 8 \cdot 10^9`) + sv(String.raw`$8 \cdot 10^9$`) },
          { q: '0{,}0009', svar: '$9 \\cdot 10^{-4}$', test: () => nara(9e-4, 0.0009),
            los: p('Decimaltecknet flyttas 4 steg åt höger, så exponenten blir $-4$:') + k(String.raw`0{,}0009 = \frac{9}{10\,000} = 9 \cdot 10^{-4}`) + sv(String.raw`$9 \cdot 10^{-4}$`) },
          { q: '0{,}000\\,024', svar: '$2{,}4 \\cdot 10^{-5}$', test: () => nara(2.4e-5, 0.000024),
            los: p('Decimaltecknet flyttas 5 steg åt höger:') + k(String.raw`0{,}000\,024 = \frac{2{,}4}{100\,000} = 2{,}4 \cdot 10^{-5}`) + sv(String.raw`$2{,}4 \cdot 10^{-5}$`) },
        ] },
        { rubrik: 'Skriv utan prefix, i grundpotensform.', kol: 4, hojd: 'kort', upg: [
          { q: '5&nbsp;MHz', text: true, svar: '$5 \\cdot 10^6$ Hz', test: () => 5 * 1e6 === 5e6,
            los: p('M (mega) betyder $10^6$:') + k(String.raw`5\ \mathrm{MHz} = 5 \cdot 10^6\ \mathrm{Hz}`) + sv(String.raw`$5 \cdot 10^6$&nbsp;Hz`) },
          { q: '3,2&nbsp;km', text: true, svar: '$3{,}2 \\cdot 10^3$ m', test: () => nara(3.2 * 1e3, 3200),
            los: p('k (kilo) betyder $10^3$:') + k(String.raw`3{,}2\ \mathrm{km} = 3{,}2 \cdot 10^3\ \mathrm{m}`) + sv(String.raw`$3{,}2 \cdot 10^3$&nbsp;m`) },
          { q: '45&nbsp;mg', text: true, svar: '$4{,}5 \\cdot 10^{-2}$ g', test: () => nara(45e-3, 4.5e-2),
            los: p('m (milli) betyder $10^{-3}$:') + k(String.raw`45\ \mathrm{mg} = 45 \cdot 10^{-3}\ \mathrm{g}`) +
              p('Talet 45 ligger inte mellan 1 och 10. Vi skriver $45 = 4{,}5 \\cdot 10^1$ och adderar exponenterna:') +
              k(String.raw`4{,}5 \cdot 10^{1} \cdot 10^{-3}\ \mathrm{g} = 4{,}5 \cdot 10^{-2}\ \mathrm{g}`) + sv(String.raw`$4{,}5 \cdot 10^{-2}$&nbsp;g`) },
          { q: '7&nbsp;µs', text: true, svar: '$7 \\cdot 10^{-6}$ s', test: () => nara(7e-6, 0.000007),
            los: p('µ (mikro) betyder $10^{-6}$, så 7&nbsp;µs är $7 \\cdot 10^{-6}$&nbsp;s.') + sv(String.raw`$7 \cdot 10^{-6}$&nbsp;s`) },
        ] },
        { rubrik: 'Beräkna utan räknare. Tänk på prioriteringsreglerna.', kol: 3, hojd: 'kort', upg: [
          { q: '5 \\cdot (3 + 6)', svar: '45', test: () => 5 * (3 + 6) === 45,
            los: p('Parentesen först:') + k(String.raw`5 \cdot (3 + 6) = 5 \cdot 9 = 45`) + sv('45') },
          { q: '20 - 4 \\cdot 3', svar: '8', test: () => 20 - 4 * 3 === 8,
            los: p('Multiplikation före subtraktion:') + k(String.raw`20 - 4 \cdot 3 = 20 - 12 = 8`) + sv('8') },
          { q: '7 \\cdot 4 - (9 - 5)^2', svar: '12', test: () => 7 * 4 - (9 - 5) ** 2 === 12,
            los: p('Parentesen först, sedan potensen, sedan multiplikationen och sist subtraktionen:') + k(String.raw`7 \cdot 4 - (9 - 5)^2 = 7 \cdot 4 - 4^2 = 28 - 16 = 12`) + sv('12') },
          { q: '2 + 3^2 \\cdot 2', svar: '20', test: () => 2 + 3 ** 2 * 2 === 20,
            los: p('Potensen först, sedan multiplikationen och sist additionen:') + k(String.raw`2 + 3^2 \cdot 2 = 2 + 9 \cdot 2 = 2 + 18 = 20`) + sv('20') },
          { q: '\\dfrac{18}{5 - 2}', svar: '6', test: () => 18 / (5 - 2) === 6,
            los: p('Nämnaren räknas ut först, som om den stod inom parentes:') + k(String.raw`\frac{18}{5 - 2} = \frac{18}{3} = 6`) + sv('6') },
          { q: '\\dfrac{4 + 8}{2 \\cdot 3}', svar: '2', test: () => (4 + 8) / (2 * 3) === 2,
            los: p('Täljare och nämnare räknas ut var för sig innan divisionen:') + k(String.raw`\frac{4 + 8}{2 \cdot 3} = \frac{12}{6} = 2`) + sv('2') },
        ] },
      ],
    },
    {
      namn: 'Mellan', under: 'Flera steg i samma uppgift, och uppgifter i text',
      delar: [
        { rubrik: 'Beräkna utan räknare. Svara i enklaste form.', kol: 3, hojd: 'mellan', upg: [
          { q: '(-2)^3 - (-3)^2', svar: '$-17$', test: () => (-2) ** 3 - (-3) ** 2 === -17,
            los: p('Potenserna först:') + k(String.raw`(-2)^3 = (-2) \cdot (-2) \cdot (-2) = -8`) + k(String.raw`(-3)^2 = (-3) \cdot (-3) = 9`) + k(String.raw`(-2)^3 - (-3)^2 = -8 - 9 = -17`) + sv('$-17$') },
          { q: '\\dfrac{2}{3} + \\dfrac{5}{6} \\cdot \\dfrac{4}{5}', svar: '$\\dfrac{4}{3}$', test: () => nara(2 / 3 + 5 / 6 * 4 / 5, 4 / 3),
            los: p('Multiplikation före addition:') + k(String.raw`\frac{5}{6} \cdot \frac{4}{5} = \frac{20}{30} = \frac{2}{3}`) + p('Sedan additionen:') + k(String.raw`\frac{2}{3} + \frac{2}{3} = \frac{4}{3}`) + sv(String.raw`$\dfrac{4}{3}$`) },
          { q: '\\left(\\dfrac{1}{2} + \\dfrac{1}{4}\\right) \\Big/ \\dfrac{3}{8}', svar: '2', test: () => nara((1 / 2 + 1 / 4) / (3 / 8), 2),
            los: p('Parentesen först, med nämnaren 4:') + k(String.raw`\frac{1}{2} + \frac{1}{4} = \frac{2}{4} + \frac{1}{4} = \frac{3}{4}`) +
              p('Sedan divisionen, som blir multiplikation med det inverterade bråket:') + k(String.raw`\frac{3}{4} \Big/ \frac{3}{8} = \frac{3}{4} \cdot \frac{8}{3} = \frac{24}{12} = 2`) + sv('2') },
          { q: '\\dfrac{3^4 \\cdot 3^{-2}}{3^3}', svar: '$\\dfrac{1}{3}$', test: () => nara(3 ** 4 * 3 ** -2 / 3 ** 3, 1 / 3),
            los: p('Täljaren först, sedan divisionen:') + k(String.raw`\frac{3^4 \cdot 3^{-2}}{3^3} = \frac{3^{4 + (-2)}}{3^3} = \frac{3^2}{3^3}`) + k(String.raw`\frac{3^2}{3^3} = 3^{2-3} = 3^{-1} = \frac{1}{3}`) + sv(String.raw`$\dfrac{1}{3}$`) },
          { q: '(3 \\cdot 10^4) \\cdot (2 \\cdot 10^{-6})', svar: '$6 \\cdot 10^{-2}$', test: () => nara(3e4 * 2e-6, 6e-2),
            los: p('Talen för sig och tiopotenserna för sig:') + k(String.raw`3 \cdot 2 \cdot 10^{4 + (-6)} = 6 \cdot 10^{-2}`) + sv(String.raw`$6 \cdot 10^{-2}$`) },
          { q: '\\dfrac{8 \\cdot 10^9}{4 \\cdot 10^3}', svar: '$2 \\cdot 10^6$', test: () => nara(8e9 / 4e3, 2e6),
            los: k(String.raw`\frac{8 \cdot 10^9}{4 \cdot 10^3} = \frac{8}{4} \cdot 10^{9-3} = 2 \cdot 10^6`) + sv(String.raw`$2 \cdot 10^6$`) },
        ] },
        { rubrik: 'Lös ekvationerna.', kol: 2, hojd: 'mellan', upg: [
          { q: '2^x \\cdot 2^3 = 2^{10}', svar: '$x = 7$', test: () => 2 ** 7 * 2 ** 3 === 2 ** 10,
            los: p('Vänsterledet skrivs som en enda potens:') + k('2^{x+3} = 2^{10}') + p(samma) + k('x + 3 = 10') + minus('x + 3', '10', '3') + k('x = 7') + kt('$2^7 \\cdot 2^3 = 2^{10}$.') + sv('$x = 7$') },
          { q: '\\dfrac{5^x}{5^2} = 5^6', svar: '$x = 8$', test: () => 5 ** 8 / 5 ** 2 === 5 ** 6,
            los: p('Vänsterledet skrivs som en enda potens:') + k('5^{x-2} = 5^6') + p(samma) + k('x - 2 = 6') + plus('x - 2', '6', '2') + k('x = 8') + sv('$x = 8$') },
        ] },
        { rubrik: 'Lös uppgifterna.', kol: 1, hojd: 'hog', upg: [
          { q: 'Lisa har läst $\\dfrac{3}{8}$ av en bok på 320 sidor. Hur många sidor har hon kvar att läsa?', text: true,
            svar: '200 sidor', test: () => 320 - 3 / 8 * 320 === 200,
            los: p('En bråkdel av något beräknas genom att multiplicera med bråkdelen. Lisa har läst') + k(String.raw`\frac{3}{8} \cdot 320 = \frac{3 \cdot 320}{8} = \frac{960}{8} = 120`) +
              p('sidor. Kvar att läsa är') + k('320 - 120 = 200') + sv('200 sidor') },
          { q: 'En bil kör 154&nbsp;km på 1,75 timmar. Beräkna medelhastigheten och svara med rätt antal värdesiffror.', text: true,
            svar: '88,0&nbsp;km/h', test: () => nara(154 / 1.75, 88),
            los: p('Medelhastighet är sträcka delat med tid:') + k(String.raw`\text{medelhastighet} = \frac{\text{sträcka}}{\text{tid}}`) + k(String.raw`\frac{154\ \mathrm{km}}{1{,}75\ \mathrm{h}} = 88\ \mathrm{km/h}`) +
              p('Vid division avgör talet med minst antal värdesiffror. Både 154 och 1,75 har tre värdesiffror, så svaret ska också ha tre. Då måste nollan skrivas ut: 88,0&nbsp;km/h.') + sv('88,0&nbsp;km/h') },
          { q: 'Ett minneskort rymmer 64&nbsp;GB. En bild tar 4&nbsp;MB. Hur många bilder får plats på kortet?', text: true,
            svar: '16&nbsp;000 bilder', test: () => nara(64e9 / 4e6, 16000),
            los: p('G (giga) betyder $10^9$ och M (mega) betyder $10^6$. Antalet bilder är kortets storlek delat med en bilds storlek:') +
              k(String.raw`\frac{64 \cdot 10^9\ \mathrm{B}}{4 \cdot 10^6\ \mathrm{B}} = \frac{64}{4} \cdot 10^{9-6} = 16 \cdot 10^3 = 16\,000`) + sv('16&nbsp;000 bilder') },
          { q: 'Vilket bråk är störst, $\\dfrac{5}{8}$ eller $\\dfrac{7}{11}$? Motivera utan räknare.', text: true,
            svar: '$\\dfrac{7}{11}$', test: () => 7 / 11 > 5 / 8,
            los: p('Vi skriver bråken med samma nämnare, $8 \\cdot 11 = 88$:') + k(String.raw`\frac{5}{8} = \frac{5 \cdot 11}{8 \cdot 11} = \frac{55}{88} \qquad \frac{7}{11} = \frac{7 \cdot 8}{11 \cdot 8} = \frac{56}{88}`) +
              p('Med samma nämnare är det bråk störst som har störst täljare.') + sv(String.raw`$\dfrac{7}{11}$ är störst.`) },
          { q: 'Elias skriver $-4^2 = 16$ och $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$. Förklara vad som är fel och beräkna rätt värden.', text: true,
            svar: '$-4^2 = -16$ och $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{5}{6}$', test: () => -(4 ** 2) === -16 && nara(1 / 2 + 1 / 3, 5 / 6),
            los: p('<b>Första felet:</b> utan parentes är basen bara 4, och minustecknet står utanför potensen:') + k(String.raw`-4^2 = -(4 \cdot 4) = -16`) +
              p('<b>Andra felet:</b> bråk adderas inte genom att täljarna och nämnarna adderas var för sig. Bråken måste först få samma nämnare:') + k(String.raw`\frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}`) +
              sv(String.raw`$-4^2 = -16$ och $\dfrac{1}{2} + \dfrac{1}{3} = \dfrac{5}{6}$`) },
        ] },
      ],
    },
  ],
};

// =====================================================================
// KAPITEL 3: PROCENTUELLA FÖRÄNDRINGAR
// =====================================================================
const tf = String.raw`\text{förändringsfaktor}`;
const KAP3 = {
  fil: 'ovningsblad-ma1b-kap3',
  titel: 'Procentuella förändringar',
  under: 'Procent, förändringsfaktor, upprepade förändringar, sparande och lån',
  rakna: 'Räknare får användas.',
  box: String.raw`
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>$1\ \% = \dfrac{1}{100} = 0{,}01$, så $8\ \% = 0{,}08$.</li>
        <li>$\text{andel} = \dfrac{\text{delen}}{\text{hela}}$, $\text{delen} = \text{andel} \cdot \text{hela}$, $\text{hela} = \dfrac{\text{delen}}{\text{andel}}$. Delen och det hela i samma enhet.</li>
        <li>Förändringsfaktor: ökning med 5 % ger 1,05, minskning med 25 % ger 0,75.</li>
        <li>Nya värdet är förändringsfaktorn gånger gamla värdet. Det man jämför med är det gamla värdet.</li>
        <li>Flera förändringar efter varandra: multiplicera faktorerna. Samma förändring $n$ gånger: multiplicera med förändringsfaktorn upphöjd till $n$.</li>
        <li>Lån: inbetalning = amortering + ränta. Ränta per månad $= \dfrac{\text{årsränta}}{12}$.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: ett pris på 450 kr höjs med 12 %. Vad blir det nya priset?</p>
      <p>En ökning med 12 % ger förändringsfaktorn</p>
      $$1 + 0{,}12 = 1{,}12$$
      <p>Nya värdet är förändringsfaktorn gånger gamla värdet:</p>
      $$1{,}12 \cdot 450 = 504$$
      <p>Det nya priset är 504 kr. Samma svar som $450 + 0{,}12 \cdot 450$, men i ett enda steg.</p>
    </div>`,
  NIVAER: [
    {
      namn: 'Grund', under: 'Kapitlets metoder en i taget',
      delar: [
        { rubrik: 'Skriv i decimalform.', kol: 4, hojd: 'kort', upg: [
          { q: '25&nbsp;%', text: true, svar: '0,25', test: () => nara(25 / 100, 0.25),
            los: p('Procent betyder hundradelar:') + k(String.raw`25\ \% = \frac{25}{100} = 0{,}25`) + sv('0,25') },
          { q: '8&nbsp;%', text: true, svar: '0,08', test: () => nara(8 / 100, 0.08),
            los: k(String.raw`8\ \% = \frac{8}{100} = 0{,}08`) + p('Glöm inte nollan: 8 hundradelar är 0,08, inte 0,8.') + sv('0,08') },
          { q: '1,5&nbsp;%', text: true, svar: '0,015', test: () => nara(1.5 / 100, 0.015),
            los: k(String.raw`1{,}5\ \% = \frac{1{,}5}{100} = 0{,}015`) + sv('0,015') },
          { q: '120&nbsp;%', text: true, svar: '1,2', test: () => nara(120 / 100, 1.2),
            los: k(String.raw`120\ \% = \frac{120}{100} = 1{,}2`) + p('Mer än 100 % ger ett tal större än 1.') + sv('1,2') },
        ] },
        { rubrik: 'Skriv i procentform.', kol: 4, hojd: 'kort', upg: [
          { q: '0{,}35', svar: '35 %', test: () => nara(0.35 * 100, 35),
            los: p('Multiplicera med 100 för att få antalet hundradelar:') + k(String.raw`0{,}35 = \frac{35}{100} = 35\ \%`) + sv('35 %') },
          { q: '0{,}07', svar: '7 %', test: () => nara(0.07 * 100, 7),
            los: k(String.raw`0{,}07 = \frac{7}{100} = 7\ \%`) + sv('7 %') },
          { q: '0{,}125', svar: '12,5 %', test: () => nara(0.125 * 100, 12.5),
            los: k(String.raw`0{,}125 = \frac{12{,}5}{100} = 12{,}5\ \%`) + sv('12,5 %') },
          { q: '\\dfrac{3}{4}', svar: '75 %', test: () => nara(3 / 4 * 100, 75),
            los: p('Förläng bråket så att nämnaren blir 100:') + k(String.raw`\frac{3}{4} = \frac{3 \cdot 25}{4 \cdot 25} = \frac{75}{100} = 75\ \%`) + sv('75 %') },
        ] },
        { rubrik: 'Lös uppgifterna.', kol: 2, hojd: 'mellan', upg: [
          { q: 'Hur många procent är 12 av 48?', text: true, svar: '25 %', test: () => nara(12 / 48, 0.25),
            los: p('Andelen är delen genom det hela:') + k(String.raw`\text{andel} = \frac{\text{delen}}{\text{hela}} = \frac{12}{48} = 0{,}25 = 25\ \%`) + sv('25 %') },
          { q: 'Vad är 15&nbsp;% av 240&nbsp;kr?', text: true, svar: '36 kr', test: () => nara(0.15 * 240, 36),
            los: p('Delen är andelen gånger det hela:') + k(String.raw`\text{delen} = \text{andel} \cdot \text{hela} = 0{,}15 \cdot 240 = 36`) + sv('36 kr') },
          { q: '30&nbsp;% av ett tal är 18. Vilket är talet?', text: true, svar: '60', test: () => nara(18 / 0.3, 60),
            los: p('Nu söks det hela. Det hela är delen genom andelen:') + k(String.raw`\text{hela} = \frac{\text{delen}}{\text{andel}} = \frac{18}{0{,}30} = 60`) + kt('30 % av 60 är $0{,}30 \\cdot 60 = 18$.') + sv('60') },
          { q: 'I en klass med 25 elever cyklar 7 till skolan. Hur stor andel av eleverna cyklar? Svara i procent.', text: true, svar: '28 %', test: () => nara(7 / 25, 0.28),
            los: k(String.raw`\text{andel} = \frac{\text{delen}}{\text{hela}} = \frac{7}{25} = 0{,}28 = 28\ \%`) + sv('28 %') },
          { q: 'Hur många procent är 450&nbsp;g av 1,5&nbsp;kg?', text: true, svar: '30 %', test: () => nara(450 / 1500, 0.3),
            los: p('Delen och det hela måste ha samma enhet, så vi gör om 1,5&nbsp;kg till 1&nbsp;500&nbsp;g:') + k(String.raw`\text{andel} = \frac{\text{delen}}{\text{hela}} = \frac{450\ \mathrm{g}}{1\,500\ \mathrm{g}} = 0{,}30 = 30\ \%`) + sv('30 %') },
          { q: 'En jacka som kostar 1&nbsp;200&nbsp;kr säljs med 20&nbsp;% rabatt. Hur många kronor sparar man?', text: true, svar: '240 kr', test: () => nara(0.2 * 1200, 240),
            los: p('Rabatten är 20 % av priset:') + k(String.raw`\text{delen} = \text{andel} \cdot \text{hela} = 0{,}20 \cdot 1\,200 = 240`) + sv('240 kr') },
        ] },
        { rubrik: 'Ange förändringsfaktorn.', kol: 3, hojd: 'kort', upg: [
          { q: 'Ökning med 5&nbsp;%', text: true, svar: '1,05', test: () => nara(1 + 0.05, 1.05),
            los: p('Vid en ökning läggs procenten till 100 %:') + k(String.raw`100\ \% + 5\ \% = 105\ \% = 1{,}05`) + sv('1,05') },
          { q: 'Minskning med 25&nbsp;%', text: true, svar: '0,75', test: () => nara(1 - 0.25, 0.75),
            los: p('Vid en minskning dras procenten från 100 %:') + k(String.raw`100\ \% - 25\ \% = 75\ \% = 0{,}75`) + sv('0,75') },
          { q: 'Ökning med 30&nbsp;%', text: true, svar: '1,3', test: () => nara(1 + 0.3, 1.3),
            los: k(String.raw`100\ \% + 30\ \% = 130\ \% = 1{,}3`) + sv('1,3') },
          { q: 'Minskning med 8&nbsp;%', text: true, svar: '0,92', test: () => nara(1 - 0.08, 0.92),
            los: k(String.raw`100\ \% - 8\ \% = 92\ \% = 0{,}92`) + sv('0,92') },
          { q: 'Ökning med 120&nbsp;%', text: true, svar: '2,2', test: () => nara(1 + 1.2, 2.2),
            los: k(String.raw`100\ \% + 120\ \% = 220\ \% = 2{,}2`) + p('Värdet blir mer än dubbelt så stort.') + sv('2,2') },
          { q: 'Minskning med 2,5&nbsp;%', text: true, svar: '0,975', test: () => nara(1 - 0.025, 0.975),
            los: k(String.raw`100\ \% - 2{,}5\ \% = 97{,}5\ \% = 0{,}975`) + sv('0,975') },
        ] },
        { rubrik: 'Vilken procentuell förändring motsvarar förändringsfaktorn?', kol: 4, hojd: 'kort', upg: [
          { q: '1{,}12', svar: 'Ökning med 12 %', test: () => nara(1.12 - 1, 0.12),
            los: p('1,12 är 0,12 mer än 1:') + k(String.raw`1{,}12 = 112\ \% = 100\ \% + 12\ \%`) + sv('Ökning med 12 %') },
          { q: '0{,}85', svar: 'Minskning med 15 %', test: () => nara(1 - 0.85, 0.15),
            los: p('0,85 är 0,15 mindre än 1:') + k(String.raw`0{,}85 = 85\ \% = 100\ \% - 15\ \%`) + sv('Minskning med 15 %') },
          { q: '0{,}6', svar: 'Minskning med 40 %', test: () => nara(1 - 0.6, 0.4),
            los: k(String.raw`0{,}6 = 60\ \% = 100\ \% - 40\ \%`) + sv('Minskning med 40 %') },
          { q: '1{,}035', svar: 'Ökning med 3,5 %', test: () => nara(1.035 - 1, 0.035),
            los: k(String.raw`1{,}035 = 103{,}5\ \% = 100\ \% + 3{,}5\ \%`) + sv('Ökning med 3,5 %') },
        ] },
        { rubrik: 'Lös uppgifterna med förändringsfaktor.', kol: 2, hojd: 'mellan', upg: [
          { q: 'En begagnad moped kostar 18&nbsp;500&nbsp;kr och sänks i pris med 8&nbsp;%. Vad blir det nya priset?', text: true,
            svar: '17&nbsp;020 kr', test: () => nara(0.92 * 18500, 17020),
            los: p('En minskning med 8 % ger förändringsfaktorn $1 - 0{,}08 = 0{,}92$. Nya värdet är förändringsfaktorn gånger gamla värdet:') + k(String.raw`\text{nya priset} = 0{,}92 \cdot 18\,500 = 17\,020`) + sv('17&nbsp;020 kr') },
          { q: 'Saras månadslön är 28&nbsp;500&nbsp;kr och höjs med 3&nbsp;%. Vad blir den nya lönen?', text: true,
            svar: '29&nbsp;355 kr', test: () => nara(1.03 * 28500, 29355),
            los: p('En ökning med 3 % ger förändringsfaktorn $1 + 0{,}03 = 1{,}03$:') + k(String.raw`\text{nya lönen} = 1{,}03 \cdot 28\,500 = 29\,355`) + sv('29&nbsp;355 kr') },
          { q: 'Ett pris ökar från 160&nbsp;kr till 196&nbsp;kr. Hur många procent har priset ökat?', text: true,
            svar: '22,5 %', test: () => nara(196 / 160, 1.225),
            los: p('Förändringsfaktorn är nya värdet delat med gamla värdet:') + k(String.raw`\frac{196}{160} = 1{,}225`) +
              p('1,225 är 0,225 mer än 1, alltså en ökning med 22,5 %.') + sv('Priset har ökat med 22,5 %.') },
          { q: 'Ett pris sänks från 640&nbsp;kr till 512&nbsp;kr. Hur många procent har priset sänkts?', text: true,
            svar: '20 %', test: () => nara(512 / 640, 0.8),
            los: p('Förändringsfaktorn är nya värdet delat med gamla värdet:') + k(String.raw`\frac{512}{640} = 0{,}8`) +
              p('0,8 är 0,2 mindre än 1, alltså en minskning med 20 %.') + sv('Priset har sänkts med 20 %.') },
        ] },
        { rubrik: 'Upprepade förändringar.', kol: 2, hojd: 'mellan', upg: [
          { q: 'Ett pris höjs med 10&nbsp;% och sänks sedan med 10&nbsp;%. Hur många procent har priset ändrats totalt?', text: true,
            svar: 'Minskat med 1 %', test: () => nara(1.1 * 0.9, 0.99),
            los: p('Förändringsfaktorerna är 1,10 och 0,90. Vid flera förändringar efter varandra multipliceras faktorerna:') + k(String.raw`\text{total förändringsfaktor} = 1{,}10 \cdot 0{,}90 = 0{,}99`) +
              p('0,99 är 0,01 mindre än 1. Sänkningen räknas på det höjda priset, så den blir större än höjningen.') + sv('Priset har minskat med 1 %.') },
          { q: 'Ett pris höjs först med 20&nbsp;% och sänks sedan med 30&nbsp;%. Hur stor är den totala procentuella förändringen?', text: true,
            svar: 'Minskning med 16 %', test: () => nara(1.2 * 0.7, 0.84),
            los: k(String.raw`\text{total förändringsfaktor} = 1{,}20 \cdot 0{,}70 = 0{,}84`) + p('0,84 är 0,16 mindre än 1.') + sv('En minskning med 16 %.') },
          { q: 'Du sätter in 20&nbsp;000&nbsp;kr på ett sparkonto med årsräntan 3&nbsp;% och tar inte ut några pengar. Hur mycket finns på kontot efter 5 år?', text: true,
            svar: '23&nbsp;185 kr', test: () => Math.round(20000 * 1.03 ** 5) === 23185,
            los: p('Varje år multipliceras beloppet med förändringsfaktorn 1,03. Efter 5 år har det multiplicerats med 1,03 fem gånger, alltså med $1{,}03^5$:') +
              k(String.raw`20\,000 \cdot 1{,}03^5 = 23\,185{,}48\ldots \approx 23\,185`) + sv('23&nbsp;185 kr') },
          { q: 'En bil köps för 250&nbsp;000&nbsp;kr. Värdet minskar med 15&nbsp;% varje år. Vad är bilen värd efter 4 år?', text: true,
            svar: '130&nbsp;502 kr', test: () => Math.round(250000 * 0.85 ** 4) === 130502,
            los: p('En minskning med 15 % ger förändringsfaktorn 0,85, och den används fyra gånger:') + k(String.raw`250\,000 \cdot 0{,}85^4 = 130\,501{,}56\ldots \approx 130\,502`) + sv('130&nbsp;502 kr') },
        ] },
        { rubrik: 'Sparande och lån.', kol: 1, hojd: 'hog', upg: [
          { q: 'Du har 15&nbsp;000&nbsp;kr på ett sparkonto med årsräntan 2&nbsp;%.<br>a) Hur mycket ränta får du det första året?<br>b) I ett kalkylblad står 15&nbsp;000 i cell B2. Vilken formel ska stå i cell B3 för att den ska visa behållningen efter ett år?', text: true,
            svar: 'a) 300 kr&emsp;b) <code>=B2*1,02</code>', test: () => nara(0.02 * 15000, 300) && nara(15000 * 1.02, 15300),
            los: del('a') + p('Räntan är räntesatsen gånger beloppet, med räntesatsen i decimalform:') + k(String.raw`\text{ränta} = 0{,}02 \cdot 15\,000 = 300`) + sv('300 kr') +
              del('b') + p('Behållningen efter ett år är behållningen före gånger förändringsfaktorn 1,02. Formeln börjar med likhetstecken och hämtar beloppet från B2:') +
              `<p class="kod"><code>=B2*1,02</code></p>` + p('Cellen visar då 15&nbsp;300, som är 15&nbsp;000&nbsp;kr plus 300&nbsp;kr i ränta.') + sv('<code>=B2*1,02</code>') },
          { q: 'Amir lånar 96&nbsp;000&nbsp;kr till en bil. Lånet ska betalas tillbaka med rak amortering under 4 år, med en inbetalning varje månad. Årsräntan är 5&nbsp;%.<br>a) Hur stor är amorteringen varje månad?<br>b) Hur mycket ränta betalar han den första månaden?<br>c) Hur stor är den första inbetalningen?', text: true,
            svar: 'a) 2&nbsp;000 kr&emsp;b) 400 kr&emsp;c) 2&nbsp;400 kr', test: () => 96000 / 48 === 2000 && nara(0.05 * 96000 / 12, 400),
            los: del('a') + p('4 år är $4 \\cdot 12 = 48$ månader. Vid rak amortering delas lånet lika på alla månader:') + k(String.raw`\text{amortering} = \frac{96\,000}{48} = 2\,000`) + sv('2&nbsp;000 kr') +
              del('b') + p('Räntan beräknas på skulden. Den första månaden är skulden hela lånet. Årsräntan på den är') + k(String.raw`\text{årsränta} = 0{,}05 \cdot 96\,000 = 4\,800`) +
              p('och räntan för en månad är en tolftedel av årsräntan:') + k(String.raw`\text{ränta per månad} = \frac{4\,800}{12} = 400`) + sv('400 kr') +
              del('c') + p('Inbetalningen är amorteringen plus räntan:') + k(String.raw`\text{inbetalning} = 2\,000 + 400 = 2\,400`) + sv('2&nbsp;400 kr') },
        ] },
      ],
    },
    {
      namn: 'Mellan', under: 'Baklänges, jämförelser åt båda hållen och flera steg',
      delar: [
        { rubrik: 'Lös uppgifterna.', kol: 2, hojd: 'hog', upg: [
          { q: 'Efter en prishöjning med 25&nbsp;% kostar en vara 500&nbsp;kr. Vad kostade den före höjningen?', text: true,
            svar: '400 kr', test: () => nara(500 / 1.25, 400),
            los: p('Det gamla priset kallar vi $x$. Nya värdet är förändringsfaktorn gånger gamla värdet, och förändringsfaktorn är 1,25:') + k(String.raw`1{,}25 \cdot x = 500`) +
              delat(String.raw`1{,}25 \cdot x`, '500', '1{,}25') + k('x = 400') + kt('$1{,}25 \\cdot 400 = 500$.') +
              p('Fällan är att dra 25 % av 500&nbsp;kr. Höjningen räknades på det gamla priset, inte på det nya.') + sv('400 kr') },
          { q: 'Butik A säljer en tröja för 400&nbsp;kr och butik B samma tröja för 500&nbsp;kr.<br>a) Hur många procent dyrare är tröjan i butik B än i butik A?<br>b) Hur många procent billigare är tröjan i butik A än i butik B?', text: true,
            svar: 'a) 25 %&emsp;b) 20 %', test: () => nara(500 / 400, 1.25) && nara(400 / 500, 0.8),
            los: del('a') + p('Vi jämför med butik A, så A:s pris är det gamla värdet:') + k(String.raw`${tf} = \frac{500}{400} = 1{,}25`) + p('En ökning med 25 %.') + sv('25 % dyrare') +
              del('b') + p('Nu jämför vi med butik B, så B:s pris är det gamla värdet:') + k(String.raw`${tf} = \frac{400}{500} = 0{,}8`) + p('En minskning med 20 %. Svaren skiljer sig eftersom vi jämför med olika belopp.') + sv('20 % billigare') },
          { q: 'Ett pris höjs med 20&nbsp;% och sänks sedan med 20&nbsp;%. Är priset då detsamma som från början? Motivera.', text: true,
            svar: 'Nej, det har minskat med 4 %', test: () => nara(1.2 * 0.8, 0.96),
            los: k(String.raw`\text{total förändringsfaktor} = 1{,}20 \cdot 0{,}80 = 0{,}96`) +
              p('0,96 är 0,04 mindre än 1. Sänkningen räknas på det höjda priset, så den blir fler kronor än höjningen.') + sv('Nej, priset har minskat med 4 %.') },
          { q: 'En stad har 40&nbsp;000 invånare. Antalet ökar med 2&nbsp;% per år. Hur många procent har antalet ökat totalt efter 10 år?', text: true,
            svar: 'Cirka 22 %', test: () => Math.round((1.02 ** 10 - 1) * 100) === 22,
            los: p('Varje år multipliceras antalet med 1,02. Efter 10 år är den totala förändringsfaktorn') + k(String.raw`1{,}02^{10} = 1{,}2189\ldots`) +
              p('Det är ungefär 0,22 mer än 1. Antalet invånare behövs inte: den procentuella ökningen beror bara på förändringsfaktorn. Lägg märke till att svaret är mer än $10 \\cdot 2\\ \\% = 20\\ \\%$.') + sv('Cirka 22 %') },
          { q: 'Du sätter in 5&nbsp;000&nbsp;kr i slutet av varje år på ett konto med årsräntan 2&nbsp;%. Hur stor är behållningen direkt efter den tredje insättningen?', text: true,
            svar: '15&nbsp;302 kr', test: () => nara((5000 * 1.02 + 5000) * 1.02 + 5000, 15302),
            los: p('Vi följer kontot insättning för insättning. Före varje ny insättning har det som redan finns vuxit med förändringsfaktorn 1,02.') +
              p('Efter första insättningen finns 5&nbsp;000&nbsp;kr. Efter den andra:') + k(String.raw`5\,000 \cdot 1{,}02 + 5\,000 = 10\,100`) +
              p('Efter den tredje:') + k(String.raw`10\,100 \cdot 1{,}02 + 5\,000 = 15\,302`) + sv('15&nbsp;302 kr') },
          { q: 'Ett lån på 60&nbsp;000&nbsp;kr betalas av med rak amortering under 2 år, med en inbetalning varje månad. Årsräntan är 4,2&nbsp;%. Hur stor är den andra inbetalningen?', text: true,
            svar: '2&nbsp;701,25 kr', test: () => nara(60000 / 24 + 0.042 * (60000 - 2500) / 12, 2701.25),
            los: p('2 år är 24 månader. Amorteringen varje månad är') + k(String.raw`\text{amortering} = \frac{60\,000}{24} = 2\,500`) +
              p('Efter den första inbetalningen är skulden 2&nbsp;500&nbsp;kr mindre. Den andra månadens ränta beräknas på den skulden:') + k(String.raw`60\,000 - 2\,500 = 57\,500`) +
              k(String.raw`\text{årsränta} = 0{,}042 \cdot 57\,500 = 2\,415`) + k(String.raw`\text{ränta per månad} = \frac{2\,415}{12} = 201{,}25`) +
              p('Inbetalningen är amorteringen plus räntan:') + k(String.raw`2\,500 + 201{,}25 = 2\,701{,}25`) + sv('2&nbsp;701,25 kr') },
          { q: 'Ett kapital växer med 7&nbsp;% per år. Efter hur många hela år har det mer än fördubblats? Pröva dig fram.', text: true,
            svar: 'Efter 11 år', test: () => 1.07 ** 10 < 2 && 1.07 ** 11 > 2,
            los: p('Kapitalet har fördubblats när den totala förändringsfaktorn är 2. Startbeloppet spelar ingen roll. Vi prövar:') +
              k(String.raw`1{,}07^{10} = 1{,}967\ldots \qquad 1{,}07^{11} = 2{,}104\ldots`) + p('Efter 10 år är faktorn mindre än 2, efter 11 år större.') + sv('Efter 11 år') },
          { q: 'Behållningen på ett sparkonto år 0 står i cell B2 i ett kalkylblad, och förändringsfaktorn står i cell E1. I B3 står formeln <code>=B2*E1</code>. Varför blir det fel när formeln kopieras ned till B4? Hur ska formeln skrivas?', text: true,
            svar: '<code>=B2*$E$1</code>', test: () => true,
            los: p('När formeln kopieras en rad ned flyttas båda referenserna en rad, och i B4 står <code>=B3*E2</code>. Cell E2 är tom, så resultatet blir 0.') +
              p('Behållningen ska hämtas från raden ovanför, men förändringsfaktorn ska alltid hämtas från E1. Den referensen låses med dollartecken:') +
              `<p class="kod"><code>=B2*$E$1</code></p>` + sv('<code>=B2*$E$1</code>') },
        ] },
      ],
    },
  ],
};

// =====================================================================
// KAPITEL 4: RÄTA LINJER OCH FUNKTIONER
// =====================================================================
const R5 = { x: [-5, 5], y: [-5, 5] };
const fGraf = (x) => x * x - 2 * x - 3;
const G = {
  punkter: graf({ ...R5, aria: 'Koordinatsystem med punkterna A, B, C och D', punkter: [
    { x: 3, y: 2, lbl: 'A' }, { x: -4, y: 1, lbl: 'B' }, { x: -2, y: -3, lbl: 'C' }, { x: 1, y: -4, lbl: 'D' }] }),
  tom: graf({ ...R5, aria: 'Tomt koordinatsystem' }),
  prq: graf({ ...R5, aria: 'Punkterna P, Q och R utritade', punkter: [
    { x: 2, y: -1, lbl: 'P', farg: BLA }, { x: -3, y: 4, lbl: 'Q', farg: BLA }, { x: 0, y: -2, lbl: 'R', farg: BLA }] }),
  rita1: graf({ ...R5, aria: 'Linjen y = 2x − 1', fns: [{ f: (x) => 2 * x - 1 }], punkter: [{ x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3 }],
    legend: [{ farg: BLA, html: iv('y = 2x − 1') }] }),
  rita2: graf({ ...R5, aria: 'Linjen y = −x + 3', fns: [{ f: (x) => -x + 3 }], punkter: [{ x: 0, y: 3 }, { x: 1, y: 2 }, { x: 3, y: 0 }],
    legend: [{ farg: BLA, html: iv('y = −x + 3') }] }),
  l1: (trapp) => graf({ x: [-4, 4], y: [-4, 4], aria: 'En rät linje', fns: [{ f: (x) => 2 * x + 1 }],
    trapp: trapp ? [{ x: 0, y: 1, dx: 1, dy: 2 }] : [], punkter: trapp ? [{ x: 0, y: 1, farg: ROD }] : [] }),
  l2: (trapp) => graf({ x: [-4, 4], y: [-4, 4], aria: 'En rät linje', fns: [{ f: (x) => -2 * x + 3 }],
    trapp: trapp ? [{ x: 0, y: 3, dx: 1, dy: -2 }] : [], punkter: trapp ? [{ x: 0, y: 3, farg: ROD }] : [] }),
  l3: (trapp) => graf({ x: [-4, 4], y: [-4, 4], aria: 'En rät linje', fns: [{ f: (x) => 0.5 * x - 2 }],
    trapp: trapp ? [{ x: 0, y: -2, dx: 2, dy: 1 }] : [], punkter: trapp ? [{ x: 0, y: -2, farg: ROD }] : [] }),
  para: (los) => graf({ x: [-3, 5], y: [-5, 6], aria: 'Grafen till funktionen f', fns: [{ f: fGraf }],
    legend: [{ farg: BLA, html: '<tspan font-style="italic">y</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)' }],
    punkter: los ? [{ x: 0, y: -3, farg: ROD }, { x: 4, y: 5, farg: ROD }, { x: -1, y: 0, farg: ROD }, { x: 3, y: 0, farg: ROD }] : [] }),
  tva: (los) => graf({ x: [-2, 5], y: [-4, 6], aria: 'Linjerna y = 3x − 5 och y = −x + 3', fns: [{ f: (x) => 3 * x - 5, farg: BLA }, { f: (x) => -x + 3, farg: ROD }],
    legend: [{ farg: BLA, html: iv('y = 3x − 5') }, { farg: ROD, html: iv('y = −x + 3') }],
    punkter: los ? [{ x: 2, y: 1, lbl: '(2, 1)', dx: 8, dy: 4 }] : [] }),
  segment: graf({ x: [-5, 4], y: [-3, 5], aria: 'En funktion vars graf är en sträcka med ifylld ring i vänster ände och tom ring i höger ände',
    fns: [{ f: (x) => x + 2, a: -3, b: 1.9 }], punkter: [{ x: -3, y: -1, farg: BLA }, { x: 2, y: 4, oppen: true, farg: BLA }] }),
};

const KAP4 = {
  fil: 'ovningsblad-ma1b-kap4',
  titel: 'Räta linjer och funktioner',
  under: 'Koordinatsystem, proportionalitet, räta linjens ekvation, funktioner och exponentialfunktioner',
  rakna: 'Räknare får användas i uppgifterna om exponentialfunktioner.',
  box: String.raw`
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>Punkten $(x, y)$: först $x$ i sidled, sedan $y$ i höjdled.</li>
        <li>$y = kx + m$: $k$ är lutningen och $m$ är där linjen skär $y$-axeln. Proportionalitet $y = kx$ är en rät linje genom origo.</li>
        <li>$k = \dfrac{y_2 - y_1}{x_2 - x_1}$. Ur en graf: gå ett steg åt höger, så är trappstegets höjd $k$.</li>
        <li>$f(a)$: sätt in $x = a$ i funktionen.</li>
        <li>Grafisk lösning: lösningen är skärningspunktens $x$-koordinat.</li>
        <li>Ifylld ring: gränsen ingår ($\leq$). Tom ring: den ingår inte ($<$).</li>
        <li>$y = C \cdot a^x$: $C$ är startvärdet och $a$ förändringsfaktorn.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: bestäm ekvationen för linjen genom $(1, 3)$ och $(3, 7)$</p>
      $$k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{7 - 3}{3 - 1} = \frac{4}{2} = 2$$
      <p>Alltså $y = 2x + m$. Punkten $(1, 3)$ ligger på linjen, så vi sätter in $x = 1$ och $y = 3$:</p>
      $$3 = 2 \cdot 1 + m$$
      $$3 \mathbin{\boldsymbol{-}} \boldsymbol{2} = 2 + m \mathbin{\boldsymbol{-}} \boldsymbol{2}$$
      $$1 = m$$
      <p>Linjens ekvation är $y = 2x + 1$.</p>
    </div>`,
  NIVAER: [
    {
      namn: 'Grund', under: 'Kapitlets metoder en i taget',
      delar: [
        { rubrik: 'Koordinater.', kol: 2, hojd: 'hog', upg: [
          { q: 'Ange koordinaterna för punkterna A, B, C och D och i vilken kvadrant varje punkt ligger.' + fig(G.punkter), text: true,
            svar: 'A&nbsp;$(3, 2)$ första, B&nbsp;$(-4, 1)$ andra, C&nbsp;$(-2, -3)$ tredje, D&nbsp;$(1, -4)$ fjärde kvadranten', test: () => true,
            los: p('Läs först av $x$ i sidled, sedan $y$ i höjdled. Kvadranterna numreras moturs med början uppe till höger.') +
              k(String.raw`A = (3, 2) \qquad B = (-4, 1)`) + k(String.raw`C = (-2, -3) \qquad D = (1, -4)`) +
              sv('A i första, B i andra, C i tredje och D i fjärde kvadranten.') },
          { q: 'Rita punkterna P&nbsp;$(2, -1)$, Q&nbsp;$(-3, 4)$ och R&nbsp;$(0, -2)$.' + fig(G.tom), text: true,
            svar: 'Se lösningsförslaget', test: () => true,
            los: p('P: 2 steg åt höger och 1 steg nedåt. Q: 3 steg åt vänster och 4 steg uppåt. R: inget steg i sidled och 2 steg nedåt, så R ligger på $y$-axeln.') + fig(G.prq) },
        ] },
        { rubrik: 'Linjära modeller och proportionalitet.', kol: 1, hojd: 'hog', upg: [
          { q: 'En taxiresa kostar 45&nbsp;kr i startavgift och 12&nbsp;kr per kilometer.<br>a) Teckna en formel för kostnaden $y$&nbsp;kr för en resa på $x$&nbsp;km.<br>b) Vad kostar en resa på 8&nbsp;km?<br>c) Hur långt kan man åka för 285&nbsp;kr?', text: true,
            svar: 'a) $y = 12x + 45$&emsp;b) 141 kr&emsp;c) 20 km', test: () => 12 * 8 + 45 === 141 && 12 * 20 + 45 === 285,
            los: del('a') + p('Kostnaden är startavgiften plus 12 kr för varje kilometer:') + k('y = 12x + 45') + sv('$y = 12x + 45$') +
              del('b') + p('Sätt in $x = 8$:') + k(String.raw`y = 12 \cdot 8 + 45 = 96 + 45 = 141`) + sv('141 kr') +
              del('c') + p('Nu är kostnaden känd, $y = 285$, och $x$ söks:') + k('12x + 45 = 285') + minus('12x + 45', '285', '45') + k('12x = 240') + delat('12x', '240', '12') + k('x = 20') + sv('20 km') },
          { q: 'Bensin kostar 18&nbsp;kr per liter.<br>a) Teckna en formel för kostnaden $y$&nbsp;kr för $x$&nbsp;liter bensin.<br>b) Är sambandet en proportionalitet? Ange i så fall proportionalitetskonstanten.', text: true,
            svar: 'a) $y = 18x$&emsp;b) Ja, $k = 18$', test: () => true,
            los: del('a') + p('Kostnaden är 18 kr gånger antalet liter:') + k('y = 18x') + sv('$y = 18x$') +
              del('b') + p('Formeln har formen $y = kx$. Grafen är en rät linje genom origo: 0 liter kostar 0 kr.') + sv('Ja, proportionalitetskonstanten är $k = 18$.') },
        ] },
        { rubrik: 'Är sambandet en proportionalitet? Svara ja eller nej.', kol: 4, hojd: 'kort', upg: [
          { q: 'y = 3x', svar: 'Ja', test: () => true, los: p('Formen $y = kx$ med $k = 3$. Linjen går genom origo.') + sv('Ja') },
          { q: 'y = 2x + 1', svar: 'Nej', test: () => 2 * 0 + 1 !== 0, los: p('När $x = 0$ blir $y = 1$, så linjen går inte genom origo.') + sv('Nej') },
          { q: 'y = \\dfrac{x}{4}', svar: 'Ja', test: () => true, los: p('$\\dfrac{x}{4} = \\dfrac{1}{4} \\cdot x$, alltså formen $y = kx$ med $k = \\dfrac{1}{4}$.') + sv('Ja') },
          { q: 'y = 5 - x', svar: 'Nej', test: () => 5 - 0 !== 0, los: p('När $x = 0$ blir $y = 5$, så linjen går inte genom origo.') + sv('Nej') },
        ] },
        { rubrik: 'Ange <i>k</i>-värdet och <i>m</i>-värdet.', kol: 3, hojd: 'kort', upg: [
          { q: 'y = 3x + 2', svar: '$k = 3$, $m = 2$', test: () => true, los: p('Talet framför $x$ är $k$, och talet som står ensamt är $m$.') + sv('$k = 3$, $m = 2$') },
          { q: 'y = -2x + 5', svar: '$k = -2$, $m = 5$', test: () => true, los: p('Minustecknet hör till $k$-värdet.') + sv('$k = -2$, $m = 5$') },
          { q: 'y = x - 4', svar: '$k = 1$, $m = -4$', test: () => true, los: k('y = 1 \\cdot x + (-4)') + sv('$k = 1$, $m = -4$') },
          { q: 'y = 7 - x', svar: '$k = -1$, $m = 7$', test: () => true, los: p('Termerna står i omvänd ordning:') + k('y = -1 \\cdot x + 7') + sv('$k = -1$, $m = 7$') },
          { q: 'y = 4x', svar: '$k = 4$, $m = 0$', test: () => true, los: k('y = 4x + 0') + p('Linjen går genom origo.') + sv('$k = 4$, $m = 0$') },
          { q: 'y = 6', svar: '$k = 0$, $m = 6$', test: () => true, los: k('y = 0 \\cdot x + 6') + p('Linjen är vågrät.') + sv('$k = 0$, $m = 6$') },
        ] },
        { rubrik: 'Rita grafen.', kol: 2, hojd: 'hog', upg: [
          { q: '$y = 2x - 1$' + fig(G.tom), text: true, svar: 'Se lösningsförslaget', test: () => 2 * 0 - 1 === -1 && 2 * 2 - 1 === 3,
            los: p('Vi räknar ut två punkter:') + k(String.raw`x = 0:\ y = 2 \cdot 0 - 1 = -1`) + k(String.raw`x = 2:\ y = 2 \cdot 2 - 1 = 3`) +
              p('Rita punkterna $(0, -1)$ och $(2, 3)$ och dra en linje genom dem. Kontrollera med en tredje punkt, till exempel $(1, 1)$.') + fig(G.rita1) },
          { q: '$y = -x + 3$' + fig(G.tom), text: true, svar: 'Se lösningsförslaget', test: () => -0 + 3 === 3 && -3 + 3 === 0,
            los: p('Vi räknar ut två punkter:') + k(String.raw`x = 0:\ y = -0 + 3 = 3`) + k(String.raw`x = 3:\ y = -3 + 3 = 0`) +
              p('Rita punkterna $(0, 3)$ och $(3, 0)$ och dra en linje genom dem. Kontrollera med $(1, 2)$.') + fig(G.rita2) },
        ] },
        { rubrik: 'Bestäm linjens ekvation.', kol: 3, hojd: 'mellan', upg: [
          { q: fig(G.l1(false)), text: true, svar: '$y = 2x + 1$', test: () => 2 * 1 + 1 === 3,
            los: p('Linjen skär $y$-axeln i $y = 1$, så $m = 1$. Gå ett steg åt höger från skärningspunkten: linjen går då 2 steg uppåt, så $k = 2$.') + fig(G.l1(true)) + sv('$y = 2x + 1$') },
          { q: fig(G.l2(false)), text: true, svar: '$y = -2x + 3$', test: () => -2 * 1 + 3 === 1,
            los: p('Linjen skär $y$-axeln i $y = 3$, så $m = 3$. Ett steg åt höger ger 2 steg nedåt, så $k = -2$.') + fig(G.l2(true)) + sv('$y = -2x + 3$') },
          { q: fig(G.l3(false)), text: true, svar: '$y = 0{,}5x - 2$', test: () => 0.5 * 2 - 2 === -1,
            los: p('Linjen skär $y$-axeln i $y = -2$, så $m = -2$. Ett steg åt höger ger bara ett halvt steg uppåt, som är svårt att läsa av. Två steg åt höger ger ett helt steg uppåt:') +
              k(String.raw`k = \frac{1}{2} = 0{,}5`) + fig(G.l3(true)) + sv('$y = 0{,}5x - 2$') },
        ] },
        { rubrik: 'Beräkna <i>k</i>-värdet för linjen genom punkterna.', kol: 2, hojd: 'mellan', upg: [
          { q: '$(1, 3)$ och $(4, 9)$', text: true, svar: '$k = 2$', test: () => (9 - 3) / (4 - 1) === 2,
            los: k(String.raw`k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{9 - 3}{4 - 1} = \frac{6}{3} = 2`) + sv('$k = 2$') },
          { q: '$(-2, 5)$ och $(1, -1)$', text: true, svar: '$k = -2$', test: () => (-1 - 5) / (1 - (-2)) === -2,
            los: k(String.raw`k = \frac{-1 - 5}{1 - (-2)} = \frac{-6}{3} = -2`) + p('Linjen faller, så $k$ är negativt.') + sv('$k = -2$') },
          { q: '$(0, 4)$ och $(6, 1)$', text: true, svar: '$k = -\\dfrac{1}{2}$', test: () => nara((1 - 4) / (6 - 0), -0.5),
            los: k(String.raw`k = \frac{1 - 4}{6 - 0} = \frac{-3}{6} = -\frac{1}{2}`) + sv(String.raw`$k = -\dfrac{1}{2}$`) },
          { q: '$(2, 7)$ och $(5, 7)$', text: true, svar: '$k = 0$', test: () => (7 - 7) / (5 - 2) === 0,
            los: k(String.raw`k = \frac{7 - 7}{5 - 2} = \frac{0}{3} = 0`) + p('Båda punkterna har $y = 7$, så linjen är vågrät.') + sv('$k = 0$') },
        ] },
        { rubrik: 'Bestäm ekvationen för linjen.', kol: 3, hojd: 'hog', upg: [
          { q: 'som har $k = 3$ och går genom punkten $(2, 5)$', text: true, svar: '$y = 3x - 1$', test: () => 3 * 2 - 1 === 5,
            los: p('Sätt in $k = 3$ i $y = kx + m$:') + k('y = 3x + m') + p('Punkten $(2, 5)$ ligger på linjen, så vi sätter in $x = 2$ och $y = 5$:') +
              k(String.raw`5 = 3 \cdot 2 + m`) + k('5 = 6 + m') + minus('5', '6 + m', '6') + k('-1 = m') + sv('$y = 3x - 1$') },
          { q: 'som har $k = -2$ och går genom punkten $(-1, 6)$', text: true, svar: '$y = -2x + 4$', test: () => -2 * -1 + 4 === 6,
            los: k('y = -2x + m') + p('Sätt in $x = -1$ och $y = 6$:') + k(String.raw`6 = -2 \cdot (-1) + m`) + k('6 = 2 + m') + minus('6', '2 + m', '2') + k('4 = m') + sv('$y = -2x + 4$') },
          { q: 'som går genom punkterna $(1, 4)$ och $(3, 10)$', text: true, svar: '$y = 3x + 1$', test: () => 3 * 1 + 1 === 4 && 3 * 3 + 1 === 10,
            los: p('Först $k$-värdet:') + k(String.raw`k = \frac{10 - 4}{3 - 1} = \frac{6}{2} = 3`) + p('Sedan $m$ med punkten $(1, 4)$:') +
              k(String.raw`4 = 3 \cdot 1 + m`) + k('4 = 3 + m') + minus('4', '3 + m', '3') + k('1 = m') + kt('$3 \\cdot 3 + 1 = 10$, så även $(3, 10)$ ligger på linjen.') + sv('$y = 3x + 1$') },
        ] },
        { rubrik: 'Funktionen $f$ ges av $f(x) = 4x - 7$. Beräkna', kol: 4, hojd: 'kort', upg: [
          { q: 'f(3)', svar: '5', test: () => 4 * 3 - 7 === 5, los: p('Sätt in $x = 3$:') + k(String.raw`f(3) = 4 \cdot 3 - 7 = 12 - 7 = 5`) + sv('5') },
          { q: 'f(-2)', svar: '$-15$', test: () => 4 * -2 - 7 === -15, los: k(String.raw`f(-2) = 4 \cdot (-2) - 7 = -8 - 7 = -15`) + sv('$-15$') },
          { q: 'f(0)', svar: '$-7$', test: () => 4 * 0 - 7 === -7, los: k(String.raw`f(0) = 4 \cdot 0 - 7 = -7`) + sv('$-7$') },
          { q: 'f(10)', svar: '33', test: () => 4 * 10 - 7 === 33, los: k(String.raw`f(10) = 4 \cdot 10 - 7 = 40 - 7 = 33`) + sv('33') },
        ] },
        { rubrik: 'Läs av i grafen.', kol: 1, hojd: 'hog', upg: [
          { q: 'Figuren visar grafen till funktionen $f$. Bestäm<br>a)&nbsp;$f(0)$&emsp;&emsp;b)&nbsp;$f(4)$<br>c) de värden på $x$ där $f(x) = 0$' + fig(G.para(false)), text: true,
            svar: 'a) $-3$&emsp;b) 5&emsp;c) $x = -1$ och $x = 3$', test: () => fGraf(0) === -3 && fGraf(4) === 5 && fGraf(-1) === 0 && fGraf(3) === 0,
            los: del('a') + p('$f(0)$ är $y$-värdet där $x = 0$, alltså där grafen skär $y$-axeln.') + sv('$f(0) = -3$') +
              del('b') + p('Gå till $x = 4$ och läs av grafens höjd.') + sv('$f(4) = 5$') +
              del('c') + p('$f(x) = 0$ betyder att grafens höjd är 0, alltså där grafen skär $x$-axeln. De fyra avlästa punkterna är markerade i figuren.') + fig(G.para(true)) + sv('$x = -1$ och $x = 3$') },
        ] },
        { rubrik: 'Grafisk lösning.', kol: 1, hojd: 'hog', upg: [
          { q: 'Figuren visar linjerna $y = 3x - 5$ och $y = -x + 3$. Lös ekvationen $3x - 5 = -x + 3$ med hjälp av figuren, och kontrollera genom att sätta in lösningen.' + fig(G.tva(false)), text: true,
            svar: '$x = 2$', test: () => 3 * 2 - 5 === -2 + 3,
            los: p('Vänsterledet är linjen $y = 3x - 5$ och högerledet linjen $y = -x + 3$. Där linjerna skär varandra är leden lika stora. Skärningspunkten är $(2, 1)$, och lösningen är dess $x$-koordinat.') +
              fig(G.tva(true)) + k('x = 2') + kt('VL $= 3 \\cdot 2 - 5 = 1$ och HL $= -2 + 3 = 1$.') + sv('$x = 2$') },
        ] },
        { rubrik: 'Definitionsmängd och värdemängd.', kol: 2, hojd: 'hog', upg: [
          { q: 'Ett gym kostar 300&nbsp;kr per månad, och ett avtal gäller i högst 12 månader. Kostnaden $y$&nbsp;kr för $x$ månader är $y = 300x$. Bestäm funktionens<br>a) definitionsmängd&emsp;&emsp;b) värdemängd.', text: true,
            svar: 'a) $0 \\leq x \\leq 12$&emsp;b) $0 \\leq y \\leq 3\\,600$', test: () => 300 * 12 === 3600,
            los: del('a') + p('Antalet månader kan vara från 0 till och med 12.') + sv(String.raw`$0 \leq x \leq 12$`) +
              del('b') + p('Den minsta kostnaden får vi för $x = 0$ och den största för $x = 12$:') + k(String.raw`y = 300 \cdot 0 = 0 \qquad y = 300 \cdot 12 = 3\,600`) + sv(String.raw`$0 \leq y \leq 3\,600$`) },
          { q: 'Bestäm definitionsmängd och värdemängd för funktionen i figuren.' + fig(G.segment), text: true,
            svar: '$-3 \\leq x < 2$ och $-1 \\leq y < 4$', test: () => -3 + 2 === -1 && 2 + 2 === 4,
            los: p('Definitionsmängden läses av i sidled. Grafen börjar vid $x = -3$ med ifylld ring (ingår) och slutar vid $x = 2$ med tom ring (ingår inte).') + sv(String.raw`Definitionsmängd $-3 \leq x < 2$`) +
              p('Värdemängden läses av i höjdled. Grafen går från $y = -1$ (ifylld ring) upp till $y = 4$ (tom ring).') + sv(String.raw`Värdemängd $-1 \leq y < 4$`) },
        ] },
        { rubrik: 'Ökar eller minskar funktionen? Med hur många procent per steg i <i>x</i>-led?', kol: 4, hojd: 'kort', upg: [
          { q: 'y = 3 \\cdot 1{,}4^x', svar: 'Ökar med 40 %', test: () => nara(1.4 - 1, 0.4),
            los: p('Förändringsfaktorn 1,4 är större än 1, så funktionen ökar. $1{,}4 = 1 + 0{,}4$.') + sv('Ökar med 40 %') },
          { q: 'y = 500 \\cdot 0{,}9^x', svar: 'Minskar med 10 %', test: () => nara(1 - 0.9, 0.1),
            los: p('Förändringsfaktorn 0,9 är mindre än 1, så funktionen minskar. $0{,}9 = 1 - 0{,}1$.') + sv('Minskar med 10 %') },
          { q: 'y = 2 \\cdot 1{,}05^x', svar: 'Ökar med 5 %', test: () => nara(1.05 - 1, 0.05),
            los: p('$1{,}05 = 1 + 0{,}05$.') + sv('Ökar med 5 %') },
          { q: 'y = 80 \\cdot 0{,}75^x', svar: 'Minskar med 25 %', test: () => nara(1 - 0.75, 0.25),
            los: p('$0{,}75 = 1 - 0{,}25$.') + sv('Minskar med 25 %') },
        ] },
        { rubrik: 'Exponentialfunktioner.', kol: 2, hojd: 'hog', upg: [
          { q: 'Ett kapital på 40&nbsp;000&nbsp;kr växer med 3&nbsp;% per år.<br>a) Teckna en formel för kapitalet $K$&nbsp;kr efter $x$ år.<br>b) Hur stort är kapitalet efter 5 år?', text: true,
            svar: 'a) $K = 40\\,000 \\cdot 1{,}03^x$&emsp;b) 46&nbsp;371 kr', test: () => Math.round(40000 * 1.03 ** 5) === 46371,
            los: del('a') + p('Startvärdet är 40&nbsp;000 och förändringsfaktorn $1 + 0{,}03 = 1{,}03$:') + k(String.raw`K = 40\,000 \cdot 1{,}03^x`) + sv(String.raw`$K = 40\,000 \cdot 1{,}03^x$`) +
              del('b') + p('Sätt in $x = 5$:') + k(String.raw`K = 40\,000 \cdot 1{,}03^5 = 46\,370{,}96\ldots \approx 46\,371`) + sv('46&nbsp;371 kr') },
          { q: 'En bils värde i kronor $t$ år efter köpet är $V(t) = 220\\,000 \\cdot 0{,}88^t$. Vad betyder talen 220&nbsp;000 och 0,88?', text: true,
            svar: 'Inköpspriset 220&nbsp;000 kr; värdet minskar med 12 % per år', test: () => nara(1 - 0.88, 0.12),
            los: p('När $t = 0$ är $V(0) = 220\\,000 \\cdot 0{,}88^0 = 220\\,000$, alltså bilens värde när den köptes.') +
              p('0,88 är förändringsfaktorn. $0{,}88 = 1 - 0{,}12$, så värdet minskar med 12 % varje år.') +
              sv('Bilen kostade 220&nbsp;000&nbsp;kr, och värdet minskar med 12 % per år.') },
        ] },
      ],
    },
    {
      namn: 'Mellan', under: 'Flera steg i samma uppgift och jämförelser mellan modeller',
      delar: [
        { rubrik: 'Lös uppgifterna.', kol: 2, hojd: 'hog', upg: [
          { q: 'Funktionen $f$ ges av $f(x) = 4x - 7$. Lös ekvationen $f(x) = 13$.', text: true, svar: '$x = 5$', test: () => 4 * 5 - 7 === 13,
            los: p('$f(x) = 13$ betyder att funktionsvärdet är 13, och $x$ söks:') + k('4x - 7 = 13') + plus('4x - 7', '13', '7') + k('4x = 20') + delat('4x', '20', '4') + k('x = 5') +
              kt(String.raw`$f(5) = 4 \cdot 5 - 7 = 13$.`) + sv('$x = 5$') },
          { q: 'Ligger punkten $(3, 4)$ på linjen $y = 2x - 1$? Motivera.', text: true, svar: 'Nej', test: () => 2 * 3 - 1 !== 4,
            los: p('Sätt in $x = 3$ i linjens ekvation:') + k(String.raw`y = 2 \cdot 3 - 1 = 5`) + p('Linjen går genom $(3, 5)$, inte genom $(3, 4)$.') + sv('Nej, punkten ligger inte på linjen.') },
          { q: 'Bestäm ekvationen för linjen som går genom punkterna $(-2, 7)$ och $(4, -5)$.', text: true, svar: '$y = -2x + 3$', test: () => -2 * -2 + 3 === 7 && -2 * 4 + 3 === -5,
            los: k(String.raw`k = \frac{-5 - 7}{4 - (-2)} = \frac{-12}{6} = -2`) + p('Sedan $m$ med punkten $(-2, 7)$:') + k(String.raw`7 = -2 \cdot (-2) + m`) + k('7 = 4 + m') +
              minus('7', '4 + m', '4') + k('3 = m') + kt(String.raw`$-2 \cdot 4 + 3 = -5$, så även $(4, -5)$ ligger på linjen.`) + sv('$y = -2x + 3$') },
          { q: 'I vilka punkter skär linjen $y = 3x - 6$ koordinataxlarna?', text: true, svar: '$(0, -6)$ och $(2, 0)$', test: () => 3 * 0 - 6 === -6 && 3 * 2 - 6 === 0,
            los: p('På $y$-axeln är $x = 0$:') + k(String.raw`y = 3 \cdot 0 - 6 = -6`) + p('På $x$-axeln är $y = 0$:') + k('3x - 6 = 0') + plus('3x - 6', '0', '6') + k('3x = 6') + delat('3x', '6', '3') + k('x = 2') +
              sv('Linjen skär $y$-axeln i $(0, -6)$ och $x$-axeln i $(2, 0)$.') },
          { q: 'Använd figuren i uppgiften om grafisk lösning och lös olikheten $-x + 3 > 3x - 5$.', text: true, svar: '$x < 2$', test: () => -0 + 3 > 3 * 0 - 5 && !(-3 + 3 > 3 * 3 - 5),
            los: p('Vi söker de $x$ där den röda linjen $y = -x + 3$ ligger ovanför den blå linjen $y = 3x - 5$. Det gäller till vänster om skärningspunkten vid $x = 2$. I skärningspunkten är leden lika, så $x = 2$ ingår inte.') +
              kt('$x = 0$ ger VL $= 3$ och HL $= -5$, och $3 > -5$ stämmer.') + sv('$x < 2$') },
          { q: 'Ett mobilabonnemang kostar 99&nbsp;kr i månaden plus 0,50&nbsp;kr per sms. Ett annat kostar 149&nbsp;kr i månaden, och alla sms ingår. Hur många sms i månaden måste man skicka för att det andra abonnemanget ska bli billigare?', text: true,
            svar: 'Fler än 100 sms', test: () => 99 + 0.5 * 100 === 149,
            los: p('Det första abonnemanget kostar $y = 0{,}50x + 99$ kr för $x$ sms. Det andra kostar alltid 149 kr. De kostar lika mycket när') +
              k('0{,}50x + 99 = 149') + minus('0{,}50x + 99', '149', '99') + k('0{,}50x = 50') + delat('0{,}50x', '50', '0{,}50') + k('x = 100') +
              p('Skickar man fler än 100 sms blir det första abonnemanget dyrare, och då är det andra billigare.') + sv('Fler än 100 sms') },
          { q: 'En stad har 20&nbsp;000 invånare. Teckna en formel för antalet invånare $y$ efter $x$ år om antalet<br>a) ökar med 400 invånare per år&emsp;&emsp;b) ökar med 2&nbsp;% per år<br>c) Vilken av modellerna ger flest invånare efter 30 år?', text: true,
            svar: 'a) $y = 400x + 20\\,000$&emsp;b) $y = 20\\,000 \\cdot 1{,}02^x$&emsp;c) Modellen i b', test: () => 400 * 30 + 20000 === 32000 && Math.round(20000 * 1.02 ** 30) === 36227,
            los: del('a') + p('Lika många nya invånare varje år ger en linjär modell, med startvärdet som $m$ och ökningen per år som $k$:') + k(String.raw`y = 400x + 20\,000`) + sv(String.raw`$y = 400x + 20\,000$`) +
              del('b') + p('Samma procentuella ökning varje år ger en exponentialfunktion med förändringsfaktorn 1,02:') + k(String.raw`y = 20\,000 \cdot 1{,}02^x`) + sv(String.raw`$y = 20\,000 \cdot 1{,}02^x$`) +
              del('c') + p('Sätt in $x = 30$ i båda:') + k(String.raw`400 \cdot 30 + 20\,000 = 32\,000`) + k(String.raw`20\,000 \cdot 1{,}02^{30} = 36\,227{,}2\ldots \approx 36\,227`) +
              p('Den procentuella ökningen räknas på ett allt större antal och växer därför ifatt och förbi den linjära.') + sv('Modellen i b, med cirka 36&nbsp;227 invånare mot 32&nbsp;000.') },
          { q: 'Ett radioaktivt preparat har massan 800&nbsp;g. Massan minskar med 6&nbsp;% per år. Hur stor är massan efter 10 år?', text: true,
            svar: '431 g', test: () => Math.round(800 * 0.94 ** 10) === 431,
            los: p('En minskning med 6 % ger förändringsfaktorn 0,94. Massan efter $x$ år är $y = 800 \\cdot 0{,}94^x$:') +
              k(String.raw`y = 800 \cdot 0{,}94^{10} = 430{,}89\ldots \approx 431`) + sv('431 g') },
        ] },
      ],
    },
  ],
};

// =====================================================================
// sidan
// =====================================================================
function bygg(B) {
  let nr = 0;
  for (const niva of B.NIVAER) {
    niva.forsta = nr + 1;
    for (const d of niva.delar) for (const u of d.upg) {
      nr++; u.nr = nr;
      if (!u.test()) throw new Error(`${B.fil}: kontroll misslyckades i uppgift ${nr}: ${u.q}`);
      if (/—/.test(u.los + u.q + u.svar)) throw new Error(`${B.fil}: tankstreck i uppgift ${nr}`);
    }
    niva.sista = nr;
  }
  const ANTAL = nr;
  B.antal = ANTAL;
  // Rubriken i lösningsförslaget visar uppgiften när den är kort och utan figur.
  const solh = (u) => (!u.text ? ' $' + u.q + '$' : (u.q.length < 60 && !/<(div|br)/.test(u.q) ? ' ' + u.q : ''));

  const uppgHtml = B.NIVAER.map(n => `
  <section class="niva">
    <h2><span class="nivanamn">${n.namn}</span><span class="sv">Uppgift ${n.forsta}–${n.sista} · ${n.under}</span></h2>
${n.delar.map(d => `    <p class="instr">${d.rubrik}</p>
    <div class="tasks c${d.kol}">
${d.upg.map(u => `      <div class="task ${d.hojd}"><span class="nr">${u.nr}</span><span class="eq${u.text ? ' txt' : ''}">${u.text ? u.q : '$' + u.q + '$'}</span></div>`).join('\n')}
    </div>`).join('\n')}
  </section>`).join('\n');

  const svarHtml = B.NIVAER.map(n => `
    <h3 class="svarniva">${n.namn}</h3>
    <div class="svarlista">${n.delar.flatMap(d => d.upg).map(u => `<div${u.svar.replace(/<[^>]+>|\$|\\[a-z]+|&[a-z]+;/g, '').length > 24 ? ' class="lang"' : ''}><span class="nr">${u.nr}</span><span>${u.svar}</span></div>`).join('')}</div>`).join('');

  const losHtml = B.NIVAER.map(n => `
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
<meta name="description" content="${ANTAL} uppgifter i kapitlet ${B.titel} i Matematik nivå 1b, på nivåerna Grund och Mellan: ${B.under.toLowerCase()}. Med svar och lösningsförslag. Utskriftsklart.">
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
.task:has(.fig) { align-items: flex-start; }
.task .katex, .sol p .katex, .svarlista .katex, .box p .katex, .box li .katex { white-space: nowrap; }
.kort { min-height: 16mm; } .mellan { min-height: 30mm; } .hog { min-height: 44mm; }
.fig { margin: 6px 0 4px; }
.fig svg { display:block; max-width: 100%; height: auto; margin: 0 auto; }
.sol .fig svg { max-width: 62mm; }
code { font-family: 'JetBrains Mono', Consolas, monospace; font-size: .92em; background: rgba(31,37,48,.06); padding: 0 3px; border-radius: 3px; }
.sol .kod { padding-left: 3mm; }
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
    <p class="over">Matematik nivå 1b · Övningsblad</p>
    <h1>${B.titel}</h1>
    <p class="under">${B.under}</p>
    <div class="namn"><span>Namn:</span><span>Klass:</span></div>
  </header>
  <div class="box boxgrid">${B.box}
  </div>
  <p class="nivaer"><b>Grund</b> tränar kapitlets metoder en i taget. <b>Mellan</b> kräver några steg till och har en del uppgifter i text. ${B.rakna} Svar och lösningsförslag finns efter uppgifterna.</p>
${uppgHtml}
  <section class="facit">
    <h2><span>Svar</span></h2>
${svarHtml}
    <h2><span>Lösningsförslag</span></h2>
${losHtml}
  </section>
  <footer><span>Matematik nivå 1b · ${B.titel}</span><span>fysiklabbet.se</span></footer>
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

for (const B of [KAP1, KAP3, KAP4]) bygg(B);
