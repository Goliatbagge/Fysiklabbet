'use strict';
// Bygger övningsbladen i ekvationslösning (grundnivå, Matematik 1) som
// fristående HTML-sidor i ovningsblad/. Varje lösningsförslag räknas fram
// av en liten ekvationslösare som följer genomgångarnas metod (ma1c-2.5,
// 2.6, 2.7) och kontrolleras genom insättning i den ursprungliga
// ekvationen, så att facit aldrig kan innehålla ett räknefel.
//
//   node .claude/bygg-ovningsblad.js        bygger HTML-sidorna
//
// PDF-versionerna görs sedan med headless Chrome mot dev-servern:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//     --print-to-pdf=ovningsblad/<fil>.pdf http://localhost:8000/ovningsblad/<fil>.html
//
// Bladen registreras i data/ovningsblad.js (titel, nivå, antal, länkar), och
// katalogen visar dem under kortet "Övningsblad" på avsnittet.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'ovningsblad');

// ---------- rationella tal ----------
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
function R(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error('icke-heltal ' + n + '/' + d);
  if (d === 0) throw new Error('nämnare 0');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
const rz = x => (typeof x === 'number' ? R(x) : x);
const radd = (p, q) => { p = rz(p); q = rz(q); return R(p.n * q.d + q.n * p.d, p.d * q.d); };
const rsub = (p, q) => { p = rz(p); q = rz(q); return R(p.n * q.d - q.n * p.d, p.d * q.d); };
const rmul = (p, q) => { p = rz(p); q = rz(q); return R(p.n * q.n, p.d * q.d); };
const rdiv = (p, q) => { p = rz(p); q = rz(q); return R(p.n * q.d, p.d * q.n); };
const rneg = p => { p = rz(p); return R(-p.n, p.d); };
const rzero = p => rz(p).n === 0;
const rnum = p => { p = rz(p); return p.n / p.d; };
const req = (p, q) => { p = rz(p); q = rz(q); return p.n === q.n && p.d === q.d; };
const rlt = (p, q) => rnum(p) < rnum(q);

function fracTex(p) { // {neg, tex} för |p|
  p = rz(p); const neg = p.n < 0; const n = Math.abs(p.n);
  return { neg, tex: p.d === 1 ? String(n) : `\\frac{${n}}{${p.d}}` };
}
const texR = p => { const f = fracTex(p); return (f.neg ? '-' : '') + f.tex; };
const texRd = p => texR(p).replace(/\\frac/g, '\\dfrac');
function coefTex(a) { // {neg, tex} för |a|x
  a = rz(a); const neg = a.n < 0; const n = Math.abs(a.n);
  let tex;
  if (a.d === 1) tex = n === 1 ? 'x' : `${n}x`;
  else tex = n === 1 ? `\\frac{x}{${a.d}}` : `\\frac{${n}x}{${a.d}}`;
  return { neg, tex };
}

// ---------- linjära uttryck a·x + b ----------
const L = (a, b = 0) => ({ a: rz(a), b: rz(b) });
function linTex(e) {
  const terms = [];
  // "12 - 2x" i stallet for "-2x + 12": talet forst nar koefficienten ar negativ
  const cfirst = !rzero(e.a) && !rzero(e.b) && rnum(e.a) < 0 && rnum(e.b) > 0;
  if (cfirst) { terms.push(fracTex(e.b)); terms.push(coefTex(e.a)); }
  else {
    if (!rzero(e.a)) terms.push(coefTex(e.a));
    if (!rzero(e.b)) terms.push(fracTex(e.b));
  }
  if (!terms.length) return '0';
  let s = '';
  terms.forEach((t, i) => {
    if (i === 0) s += (t.neg ? '-' : '') + t.tex;
    else s += (t.neg ? ' - ' : ' + ') + t.tex;
  });
  return s;
}
const hasX = e => !rzero(e.a);
const isMono = e => rzero(e.b);
const linEval = (e, x) => rnum(e.a) * x + rnum(e.b);
const linScale = (e, k) => L(rmul(e.a, k), rmul(e.b, k));
function mulLin(p, q) {
  if (hasX(p) && hasX(q)) throw new Error('produkt av två x-uttryck');
  return hasX(p) ? linScale(p, q.b) : linScale(q, p.b);
}
// produkt talet först: "5 \cdot 3x", "5(x + 2)", "6 \cdot 4"
function prodTex(c, e) {
  const ct = texR(c);
  if (!hasX(e)) return `${ct} \\cdot ${texR(e.b)}`;
  if (isMono(e)) return `${ct} \\cdot ${linTex(e)}`;
  return req(c, 1) ? '1 \\cdot (' + linTex(e) + ')' : `${ct}(${linTex(e)})`;
}
function prodLinTex(p, q) {
  if (!hasX(p)) return prodTex(p.b, q);
  return prodTex(q.b, p);
}

const blue = t => `\\textcolor{#2563c9}{${t}}`;

// ---------- lösaren (samma arbetsgång som genomgången) ----------
function solveLinear(lines, Ls, Rs, forb) {
  const side = (xLeft, xs, cs) => (xLeft ? { l: xs, r: cs } : { l: cs, r: xs });
  if (hasX(Ls) && hasX(Rs)) {
    // ta bort variabeltermen från den sida som har minst koefficient
    const fromLeft = !rlt(Rs.a, Ls.a);
    const a = fromLeft ? Ls.a : Rs.a;
    const ct = coefTex(a);
    const op = ct.neg ? ` + ${ct.tex}` : ` - ${ct.tex}`;
    lines.push({ l: linTex(Ls) + blue(op), r: linTex(Rs) + blue(op) });
    Ls = L(rsub(Ls.a, a), Ls.b); Rs = L(rsub(Rs.a, a), Rs.b);
    lines.push({ l: linTex(Ls), r: linTex(Rs) });
    if (!hasX(Ls) && !hasX(Rs)) {
      if (req(Ls.b, Rs.b)) { lines.push({ note: 'Variabeln försvann och kvar står en sann likhet. Ekvationen stämmer för alla värden på $x$.' }); return { kind: 'alla' }; }
      lines.push({ note: 'Variabeln försvann och kvar står en falsk likhet. Inget värde på $x$ gör att ekvationen stämmer.' });
      return { kind: 'ingen' };
    }
  }
  let xLeft = hasX(Ls);
  let X = xLeft ? Ls : Rs, C = xLeft ? Rs : Ls;
  if (hasX(C)) throw new Error('x kvar i båda led');
  if (!rzero(X.b)) {
    const ft = fracTex(X.b);
    const op = ft.neg ? ` + ${ft.tex}` : ` - ${ft.tex}`;
    lines.push(side(xLeft, linTex(X) + blue(op), linTex(C) + blue(op)));
    const b = X.b; X = L(X.a, 0); C = L(0, rsub(C.b, b));
    lines.push(side(xLeft, linTex(X), linTex(C)));
  }
  if (X.a.d !== 1) {
    const d = X.a.d;
    const op = ` \\cdot ${d}`;
    lines.push(side(xLeft, linTex(X) + blue(op), linTex(C) + blue(op)));
    X = L(rmul(X.a, d), 0); C = L(0, rmul(C.b, d));
    lines.push(side(xLeft, linTex(X), linTex(C)));
  }
  if (!req(X.a, 1)) {
    const n = X.a.n;
    lines.push(side(xLeft, `\\frac{${linTex(X)}}{${blue(String(n))}}`, `\\frac{${linTex(C)}}{${blue(String(n))}}`));
    X = L(1, 0); C = L(0, rdiv(C.b, n));
    lines.push(side(xLeft, linTex(X), linTex(C)));
  }
  const sol = C.b;
  if (forb && forb.some(f => req(f, sol))) {
    lines.push({ note: `Men $x \\neq ${texR(sol)}$ är inte tillåtet, eftersom nämnaren då blir 0. Ekvationen saknar lösning.` });
    return { kind: 'ingen', forbidden: true };
  }
  return { kind: 'en', x: sol };
}

// ---------- uppgiftstyper ----------
function lin(a1, b1, a2, b2) {
  const Ls = L(a1, b1), Rs = L(a2, b2);
  const disp = `${linTex(Ls)} = ${linTex(Rs)}`.replace(/\\frac/g, '\\dfrac');
  const lines = [{ l: linTex(Ls), r: linTex(Rs) }];
  const res = solveLinear(lines, Ls, Rs, []);
  return { disp, lines, res, ev: x => [linEval(Ls, x), linEval(Rs, x)], forb: [] };
}
// rå visning + förenklingsrader innan den linjära formen tar vid
function raw(disp, ev, pre, a1, b1, a2, b2) {
  const Ls = L(a1, b1), Rs = L(a2, b2);
  const lines = pre.map(([l, r]) => ({ l, r }));
  lines.push({ l: linTex(Ls), r: linTex(Rs) });
  // förenklingen ska stämma med den råa ekvationen (skillnaden VL−HL i tre punkter)
  for (const x of [0, 1, 2]) {
    const [l, r] = ev(x);
    if (Math.abs((l - r) - (linEval(Ls, x) - linEval(Rs, x))) > 1e-9) throw new Error('förenklingen stämmer inte: ' + disp);
  }
  const res = solveLinear(lines, Ls, Rs, []);
  return { disp, lines, res, ev, forb: [] };
}
function forbOf(D, forb, lines) {
  if (hasX(D)) {
    const f = rdiv(rneg(D.b), D.a);
    forb.push(f);
    lines.push({ note: `Nämnaren får inte bli 0, så $x \\neq ${texR(f)}$.` });
  }
}
// typ 1: en bråkterm i ena ledet, ett tal i andra: täljaren = kvoten · nämnaren
function brak1(N, D, q) {
  q = rz(q);
  const disp = `\\dfrac{${linTex(N)}}{${linTex(D)}} = ${texRd(q)}`;
  const lines = []; const forb = [];
  forbOf(D, forb, lines);
  lines.push({ l: `\\frac{${linTex(N)}}{${linTex(D)}}`, r: texR(q) });
  lines.push({ note: 'Täljaren är lika med kvoten gånger nämnaren:' });
  lines.push({ l: linTex(N), r: prodTex(q, D) });
  const R2 = linScale(D, q);
  lines.push({ l: linTex(N), r: linTex(R2) });
  const res = solveLinear(lines, N, R2, forb);
  return { disp, lines, res, ev: x => [linEval(N, x) / linEval(D, x), rnum(q)], forb };
}
// typ 2: en bråkterm i varje led: korsvis multiplikation
function kors(N1, D1, N2, D2) {
  const disp = `\\dfrac{${linTex(N1)}}{${linTex(D1)}} = \\dfrac{${linTex(N2)}}{${linTex(D2)}}`;
  const lines = []; const forb = [];
  forbOf(D1, forb, lines); forbOf(D2, forb, lines);
  lines.push({ l: `\\frac{${linTex(N1)}}{${linTex(D1)}}`, r: `\\frac{${linTex(N2)}}{${linTex(D2)}}` });
  lines.push({ note: 'Korsvis multiplikation:' });
  lines.push({ l: prodLinTex(N2, D1), r: prodLinTex(N1, D2) });
  const Ls = mulLin(N2, D1), Rs = mulLin(N1, D2);
  lines.push({ l: linTex(Ls), r: linTex(Rs) });
  const res = solveLinear(lines, Ls, Rs, forb);
  return { disp, lines, res, ev: x => [linEval(N1, x) / linEval(D1, x), linEval(N2, x) / linEval(D2, x)], forb };
}

// ---------- kontroll genom insättning ----------
function verify(t, label) {
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  if (t.res.kind === 'en') {
    const x = rnum(t.res.x);
    const [l, r] = t.ev(x);
    if (!near(l, r)) throw new Error(`${label}: lösningen ${texR(t.res.x)} stämmer inte (${l} ≠ ${r}) i ${t.disp}`);
    if (t.forb.some(f => near(rnum(f), x))) throw new Error(`${label}: lösningen är förbjuden`);
  } else {
    const pts = [0.37, 2.71, -1.9].filter(x => !t.forb.some(f => near(rnum(f), x)));
    for (const x of pts) {
      const [l, r] = t.ev(x);
      if (t.res.kind === 'alla' && !near(l, r)) throw new Error(`${label}: påstås gälla för alla x men ${l} ≠ ${r}`);
      if (t.res.kind === 'ingen' && !t.res.forbidden && near(l, r)) throw new Error(`${label}: påstås sakna lösning men x=${x} passar`);
    }
    if (t.res.kind === 'ingen' && t.res.forbidden) {
      // lösningen ska vara exakt det förbjudna värdet: kontrollerat av lösaren
    }
  }
}

function svarTex(t) {
  if (t.res.kind === 'en') return `$x = ${texRd(t.res.x)}$`;
  if (t.res.kind === 'alla') return 'Oändligt många lösningar (alla tal)';
  return 'Saknar lösning';
}

// ---------- uppgiftslistor ----------
const x = 'x';
const S1 = {
  file: 'ovningsblad-ekvationer-1.html', nr: 1, title: 'Ekvationslösningens grunder',
  avsnitt: 'Matematik 1, avsnitt 2.5',
  intro: 'Målet med att lösa en ekvation är att få $x$ <b>ensamt</b> på ena sidan av likhetstecknet. Det du gör i ena ledet måste du också göra i det andra, annars stämmer inte ekvationen längre.',
  example: `
<p class="ex-rubrik">Exempel: lös ekvationen $3x + 5 = 20$</p>
<p><b>Steg 1.</b> Talet 5 <em>adderas</em> till $3x$. För att få bort det <em>subtraherar</em> vi 5 från båda led:</p>
$$\\begin{aligned} 3x + 5 \\textcolor{#2563c9}{\\; - \\; 5} &= 20 \\textcolor{#2563c9}{\\; - \\; 5} \\\\ 3x &= 15 \\end{aligned}$$
<p><b>Steg 2.</b> Nu <em>multipliceras</em> $x$ med 3. För att få bort trean <em>dividerar</em> vi båda led med 3:</p>
$$\\begin{aligned} \\frac{3x}{\\textcolor{#2563c9}{3}} &= \\frac{15}{\\textcolor{#2563c9}{3}} \\\\ x &= 5 \\end{aligned}$$
<p><b>Kontroll.</b> Byt ut $x$ mot 5 i den ursprungliga ekvationen: $\\mathrm{VL} = 3 \\cdot 5 + 5 = 20$ och $\\mathrm{HL} = 20$. Vänsterledet är lika med högerledet, så lösningen stämmer.</p>
<p><b>Svar:</b> $x = 5$</p>`,
  reminder: `
<p class="ex-rubrik">Kom ihåg</p>
<ul>
<li>Term som <b>adderas</b>: subtrahera den från båda led.</li>
<li>Term som <b>subtraheras</b>: addera den till båda led.</li>
<li>Tal som <b>multipliceras</b> med $x$: dividera båda led med talet.</li>
<li>Tal som $x$ <b>divideras</b> med: multiplicera båda led med talet.</li>
<li>Ta bort det som adderas eller subtraheras <b>först</b>, och talet framför $x$ <b>sist</b>.</li>
<li>Blir svaret ett bråk, till exempel $x = \\dfrac{5}{2}$: låt det stå så. Avrunda inte.</li>
</ul>`,
  sections: [
    { title: 'A. Ett steg: addition eller subtraktion', cols: 4, h: 'kort', tasks: [
      lin(1, 5, 0, 12), lin(1, 9, 0, 20), lin(1, -4, 0, 10), lin(1, -7, 0, 2),
      lin(1, 15, 0, 31), lin(1, -12, 0, 25), lin(0, 18, 1, 6), lin(1, 8, 0, 3),
    ] },
    { title: 'B. Ett steg: multiplikation eller division', cols: 4, h: 'kort', tasks: [
      lin(4, 0, 0, 20), lin(6, 0, 0, 42), lin(R(1, 3), 0, 0, 5), lin(R(1, 7), 0, 0, 2),
      lin(9, 0, 0, 63), lin(R(1, 5), 0, 0, 8), lin(8, 0, 0, 24), lin(R(1, 4), 0, 0, 9),
    ] },
    { title: 'C. Två steg', cols: 3, h: 'mellan', tasks: [
      lin(2, 3, 0, 11), lin(3, 4, 0, 19), lin(5, -2, 0, 18), lin(4, -7, 0, 13),
      lin(6, 5, 0, 41), lin(2, -9, 0, 1), lin(R(1, 2), 3, 0, 8), lin(R(1, 3), -4, 0, 2),
      lin(7, 10, 0, 24), lin(3, -11, 0, 10), lin(R(1, 5), 6, 0, 9), lin(9, 4, 0, 40),
    ] },
    { title: 'D. Lite mer att tänka på: $x$ i högerledet och negativa tal', cols: 3, h: 'mellan', tasks: [
      lin(0, 26, 4, 2), lin(4, 12, 0, 4), lin(3, 10, 0, 1),
      lin(2, -5, 0, -13), lin(5, 8, 0, 8), lin(R(1, 4), 7, 0, 5),
    ] },
    { title: 'E. Lite svårare', svar: true, cols: 3, h: 'hog', tasks: [
      lin(4, 3, 0, 13), lin(3, -1, 0, 6), lin(R(2, 3), 4, 0, 10),
      lin(R(5, 2), -3, 0, 7), lin(-2, 12, 0, 4), lin(-3, 7, 0, 16),
    ] },
  ],
};

const S2 = {
  file: 'ovningsblad-ekvationer-2.html', nr: 2, title: 'Variabler i båda led',
  avsnitt: 'Matematik 1, avsnitt 2.6',
  intro: 'När $x$ finns på båda sidor om likhetstecknet samlar du först alla $x$ på ena sidan. Sedan löser du ekvationen precis som på blad 1.',
  example: `
<p class="ex-rubrik">Exempel: lös ekvationen $7x + 4 = 3x + 20$</p>
<p><b>Steg 1.</b> Här finns $x$ i båda led. Ta bort variabeltermen från den sida där talet framför $x$ är <em>minst</em>, så slipper du negativa tal. Talet 3 är mindre än 7, så vi subtraherar $3x$ från båda led:</p>
$$\\begin{aligned} 7x + 4 \\textcolor{#2563c9}{\\; - \\; 3x} &= 3x + 20 \\textcolor{#2563c9}{\\; - \\; 3x} \\\\ 4x + 4 &= 20 \\end{aligned}$$
<p><b>Steg 2.</b> Nu ser ekvationen ut som på blad 1. Subtrahera 4 från båda led, och dividera sedan båda led med 4:</p>
$$\\begin{aligned} 4x + 4 \\textcolor{#2563c9}{\\; - \\; 4} &= 20 \\textcolor{#2563c9}{\\; - \\; 4} \\\\ 4x &= 16 \\\\ \\frac{4x}{\\textcolor{#2563c9}{4}} &= \\frac{16}{\\textcolor{#2563c9}{4}} \\\\ x &= 4 \\end{aligned}$$
<p><b>Kontroll.</b> $\\mathrm{VL} = 7 \\cdot 4 + 4 = 32$ och $\\mathrm{HL} = 3 \\cdot 4 + 20 = 32$. Stämmer.</p>
<p><b>Svar:</b> $x = 4$</p>`,
  reminder: `
<p class="ex-rubrik">Arbetsgång</p>
<ol>
<li>Utveckla eventuella parenteser, till exempel $2(x + 3) = 2x + 6$.</li>
<li>Förenkla varje led för sig: slå ihop $x$-termer med $x$-termer och tal med tal.</li>
<li>Samla alla $x$ i ena ledet. Ta bort från den sida där talet framför $x$ är minst.</li>
<li>Samla talen i det andra ledet.</li>
<li>Dividera med talet framför $x$.</li>
</ol>
<p>Försvinner $x$ helt och kvar står något <b>falskt</b>, som $5 = 8$, saknar ekvationen lösning. Står något <b>sant</b> kvar, som $8 = 8$, är alla tal lösningar.</p>`,
  sections: [
    { title: 'A. Samla $x$ på ena sidan', cols: 3, h: 'mellan', tasks: [
      lin(5, 3, 2, 15), lin(7, -4, 3, 8), lin(4, 9, 1, 24), lin(6, -1, 2, 23), lin(8, 2, 5, 23),
      lin(9, -5, 4, 10), lin(3, 14, 5, 4), lin(2, 33, 7, 3), lin(10, -8, 6, 4), lin(4, -6, 1, 12),
    ] },
    { title: 'B. Förenkla leden först', cols: 3, h: 'hog', tasks: [
      raw('3x + 5 + 2x = x + 25', x => [3 * x + 5 + 2 * x, x + 25], [['3x + 5 + 2x', 'x + 25']], 5, 5, 1, 25),
      raw('8x - 3 - 2x = 4x + 9', x => [8 * x - 3 - 2 * x, 4 * x + 9], [['8x - 3 - 2x', '4x + 9']], 6, -3, 4, 9),
      raw('2x + 7 + 3x = 3x + 23', x => [2 * x + 7 + 3 * x, 3 * x + 23], [['2x + 7 + 3x', '3x + 23']], 5, 7, 3, 23),
      raw('9x - 4x + 6 = 2x + 21', x => [9 * x - 4 * x + 6, 2 * x + 21], [['9x - 4x + 6', '2x + 21']], 5, 6, 2, 21),
      raw('4x + 10 = 6x + 2 - x', x => [4 * x + 10, 6 * x + 2 - x], [['4x + 10', '6x + 2 - x']], 4, 10, 5, 2),
      raw('7x + 1 - 3x = 2x + 15', x => [7 * x + 1 - 3 * x, 2 * x + 15], [['7x + 1 - 3x', '2x + 15']], 4, 1, 2, 15),
      raw('x + 3x + 8 = 2x + 24', x => [x + 3 * x + 8, 2 * x + 24], [['x + 3x + 8', '2x + 24']], 4, 8, 2, 24),
      raw('6x - 5 + x = 3x + 19', x => [6 * x - 5 + x, 3 * x + 19], [['6x - 5 + x', '3x + 19']], 7, -5, 3, 19),
      raw('12 + 5x - 4 = 3x + 20', x => [12 + 5 * x - 4, 3 * x + 20], [['12 + 5x - 4', '3x + 20']], 5, 8, 3, 20),
    ] },
    { title: 'C. Parenteser', cols: 3, h: 'hog', tasks: [
      raw('2(x + 3) = x + 10', x => [2 * (x + 3), x + 10], [['2(x + 3)', 'x + 10']], 2, 6, 1, 10),
      raw('3(x - 2) = 2x + 1', x => [3 * (x - 2), 2 * x + 1], [['3(x - 2)', '2x + 1']], 3, -6, 2, 1),
      raw('4(2x + 1) = 5x + 13', x => [4 * (2 * x + 1), 5 * x + 13], [['4(2x + 1)', '5x + 13']], 8, 4, 5, 13),
      raw('5(x + 2) = 3x + 18', x => [5 * (x + 2), 3 * x + 18], [['5(x + 2)', '3x + 18']], 5, 10, 3, 18),
      raw('2(3x - 4) = 4x + 6', x => [2 * (3 * x - 4), 4 * x + 6], [['2(3x - 4)', '4x + 6']], 6, -8, 4, 6),
      raw('6x + 9 = 3(x + 5)', x => [6 * x + 9, 3 * (x + 5)], [['6x + 9', '3(x + 5)']], 6, 9, 3, 15),
      raw('4(x - 1) = 2(x + 3)', x => [4 * (x - 1), 2 * (x + 3)], [['4(x - 1)', '2(x + 3)']], 4, -4, 2, 6),
      raw('3(2x + 5) = 5(x + 4)', x => [3 * (2 * x + 5), 5 * (x + 4)], [['3(2x + 5)', '5(x + 4)']], 6, 15, 5, 20),
      raw('7x - 2 = 2(2x + 5)', x => [7 * x - 2, 2 * (2 * x + 5)], [['7x - 2', '2(2x + 5)']], 7, -2, 4, 10),
    ] },
    { title: 'D. Saknar lösning eller oändligt många lösningar?', cols: 3, h: 'mellan', tasks: [
      lin(3, 5, 3, 8),
      raw('2(x + 4) = 2x + 8', x => [2 * (x + 4), 2 * x + 8], [['2(x + 4)', '2x + 8']], 2, 8, 2, 8),
      lin(5, -2, 5, 1),
      raw('4x + 6 = 2(2x + 3)', x => [4 * x + 6, 2 * (2 * x + 3)], [['4x + 6', '2(2x + 3)']], 4, 6, 4, 6),
      raw('3x + 2 + x = 4x + 2', x => [3 * x + 2 + x, 4 * x + 2], [['3x + 2 + x', '4x + 2']], 4, 2, 4, 2),
      raw('6x - 1 = 3(2x + 1)', x => [6 * x - 1, 3 * (2 * x + 1)], [['6x - 1', '3(2x + 1)']], 6, -1, 6, 3),
    ] },
    { title: 'E. Lite svårare', svar: true, cols: 3, h: 'hog', tasks: [
      raw('3(2x - 1) = 4(x + 3)', x => [3 * (2 * x - 1), 4 * (x + 3)], [['3(2x - 1)', '4(x + 3)']], 6, -3, 4, 12),
      lin(-2, 7, 4, -11),
      raw('5x - 3(x - 4) = 20', x => [5 * x - 3 * (x - 4), 20], [['5x - 3(x - 4)', '20'], ['5x - 3x + 12', '20']], 2, 12, 0, 20),
      raw('2(x + 5) - 3 = 3(x - 1)', x => [2 * (x + 5) - 3, 3 * (x - 1)], [['2(x + 5) - 3', '3(x - 1)'], ['2x + 10 - 3', '3x - 3']], 2, 7, 3, -3),
      lin(-3, 10, -1, 2),
      raw('(x + 2)(x + 3) = x(x + 1) + 10', x => [(x + 2) * (x + 3), x * (x + 1) + 10],
        [['(x + 2)(x + 3)', 'x(x + 1) + 10'], ['x^2 + 3x + 2x + 6', 'x^2 + x + 10'], ['x^2 + 5x + 6', 'x^2 + x + 10'],
         ['x^2 + 5x + 6 \\textcolor{#2563c9}{\\; - \\; x^2}', 'x^2 + x + 10 \\textcolor{#2563c9}{\\; - \\; x^2}']], 5, 6, 1, 10),
    ] },
  ],
};

const S3 = {
  file: 'ovningsblad-ekvationer-3.html', nr: 3, title: 'Ekvationer med nämnare, typ 1',
  under: 'En bråkterm i ena ledet: täljaren är lika med kvoten gånger nämnaren',
  avsnitt: 'Matematik 1, avsnitt 2.7',
  intro: 'Nämnaren gör ekvationen krånglig, så första steget är alltid att bli av med den. Står ett bråk i ena ledet och ett tal i det andra, så är <b>täljaren lika med kvoten gånger nämnaren</b>. Kvoten är talet på andra sidan likhetstecknet.',
  example: `
<p class="ex-rubrik">Exempel: lös ekvationen $\\dfrac{24}{x} = 6$</p>
<p><b>Steg 1.</b> Nämnaren får aldrig bli 0, och här står $x$ i nämnaren. Skriv därför $x \\neq 0$ innan du börjar.</p>
<p><b>Steg 2.</b> Täljaren är lika med kvoten gånger nämnaren. Täljaren är 24, kvoten är 6 och nämnaren är $x$:</p>
$$\\begin{aligned} 24 &= 6 \\cdot x \\\\ 24 &= 6x \\end{aligned}$$
<p><b>Steg 3.</b> Nu är nämnaren borta. Dividera båda led med 6:</p>
$$\\begin{aligned} \\frac{24}{\\textcolor{#2563c9}{6}} &= \\frac{6x}{\\textcolor{#2563c9}{6}} \\\\ 4 &= x \\end{aligned}$$
<p><b>Kontroll.</b> $\\mathrm{VL} = \\dfrac{24}{4} = 6$ och $\\mathrm{HL} = 6$. Stämmer, och 4 är inte 0.</p>
<p><b>Svar:</b> $x = 4$</p>
<p class="ex-rubrik">Samma metod när det står ett tal framför $x$: $\\dfrac{40}{2x} = 4$</p>
<p>Nämnaren är $2x$, så $x \\neq 0$. Täljaren är lika med kvoten gånger nämnaren, alltså $40 = 4 \\cdot 2x$, det vill säga $40 = 8x$. Dividera båda led med 8: $x = 5$.</p>`,
  reminder: `
<p class="ex-rubrik">Kom ihåg</p>
<ul>
<li>Står $x$ i nämnaren: skriv först vilket värde som är förbjudet, till exempel $x \\neq 0$.</li>
<li>$\\dfrac{\\text{täljare}}{\\text{nämnare}} = \\text{kvot}$ betyder att $\\text{täljare} = \\text{kvot} \\cdot \\text{nämnare}$.</li>
<li>Metoden fungerar också när $x$ står i täljaren: $\\dfrac{x}{4} = 5$ ger $x = 5 \\cdot 4$.</li>
<li>Blir svaret det förbjudna värdet saknar ekvationen lösning.</li>
</ul>`,
  sections: [
    { title: 'A. Ett tal i täljaren och $x$ i nämnaren', cols: 4, h: 'mellan', tasks: [
      brak1(L(0, 12), L(1), 3), brak1(L(0, 20), L(1), 4), brak1(L(0, 36), L(1), 9), brak1(L(0, 45), L(1), 5),
      brak1(L(0, 30), L(1), 6), brak1(L(0, 28), L(1), 4), brak1(L(0, 50), L(1), 10), brak1(L(0, 8), L(1), 8),
      brak1(L(0, 63), L(1), 7), brak1(L(0, 100), L(1), 20), brak1(L(0, 54), L(1), 6), brak1(L(0, 72), L(1), 8),
    ] },
    { title: 'B. Ett tal framför $x$ i nämnaren', cols: 4, h: 'mellan', tasks: [
      brak1(L(0, 40), L(2), 4), brak1(L(0, 60), L(5), 3), brak1(L(0, 18), L(3), 2), brak1(L(0, 100), L(4), 5),
      brak1(L(0, 42), L(2), 7), brak1(L(0, 90), L(3), 6), brak1(L(0, 24), L(4), 2), brak1(L(0, 72), L(6), 4),
    ] },
    { title: 'C. Samma metod med $x$ i täljaren', cols: 4, h: 'mellan', tasks: [
      brak1(L(1), L(0, 4), 5), brak1(L(1), L(0, 6), 3), brak1(L(3), L(0, 2), 6), brak1(L(2), L(0, 5), 4),
      brak1(L(1, 3), L(0, 2), 5), brak1(L(1, -4), L(0, 3), 2), brak1(L(2, 1), L(0, 5), 3), brak1(L(1, 8), L(0, 4), 3),
    ] },
    { title: 'D. Lite svårare', svar: true, cols: 3, h: 'hog', tasks: [
      brak1(L(0, 50), L(1, 2), 5), brak1(L(0, 12), L(1, -1), 4), brak1(L(0, 9), L(1), -3),
      brak1(L(0, 8), L(2), 6), brak1(L(0, 70), L(3), 5), brak1(L(0, 36), L(1, 3), 4),
      brak1(L(4, -12), L(1, -3), 3),
    ] },
  ],
};

const korsFig = `<svg class="korsfig" viewBox="6 2 100 82" width="115" height="94" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bråket x genom 4 är lika med bråket 6 genom 8. Pilar korsar: täljaren x multipliceras med nämnaren 8, och nämnaren 4 multipliceras med täljaren 6."><text x="30" y="21" font-size="15" text-anchor="middle" fill="#1f2530" font-style="italic">x</text><line x1="19" y1="26" x2="41" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="43" font-size="15" text-anchor="middle" fill="#1f2530">4</text><text x="56" y="32" font-size="15" text-anchor="middle" fill="#1f2530">=</text><text x="82" y="21" font-size="15" text-anchor="middle" fill="#1f2530">6</text><line x1="72" y1="26" x2="92" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="82" y="43" font-size="15" text-anchor="middle" fill="#1f2530">8</text><line x1="36" y1="22" x2="74" y2="38" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,39.7) rotate(23)" fill="#c8324a"/><line x1="38" y1="38" x2="74" y2="23" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,21.3) rotate(-23)" fill="#2563c9"/><text x="30" y="76" font-size="14" text-anchor="middle" fill="#2563c9">6 · 4</text><text x="82" y="76" font-size="14" text-anchor="middle" fill="#c8324a">8 · <tspan font-style="italic">x</tspan></text></svg>`;

const S4 = {
  file: 'ovningsblad-ekvationer-4.html', nr: 4, title: 'Ekvationer med nämnare, typ 2',
  under: 'En bråkterm i varje led: korsvis multiplikation',
  avsnitt: 'Matematik 1, avsnitt 2.7',
  intro: 'Står det ett bråk på varje sida om likhetstecknet blir du av med båda nämnarna på en gång med <b>korsvis multiplikation</b>: täljaren i det ena bråket gånger nämnaren i det andra, och tvärtom. De två produkterna är lika stora.',
  example: `
<div class="ex-flex">${korsFig}<div>
<p class="ex-rubrik">Exempel: lös ekvationen $\\dfrac{x}{4} = \\dfrac{6}{8}$</p>
<p><b>Steg 1.</b> Multiplicera korsvis: täljaren 6 gånger nämnaren 4, och täljaren $x$ gånger nämnaren 8. Sätt produkterna lika. Vilken produkt som skrivs först spelar ingen roll.</p>
$$\\begin{aligned} 6 \\cdot 4 &= 8 \\cdot x \\\\ 24 &= 8x \\end{aligned}$$
</div></div>
<p><b>Steg 2.</b> Nämnarna är borta. Dividera båda led med 8:</p>
$$\\begin{aligned} \\frac{24}{\\textcolor{#2563c9}{8}} &= \\frac{8x}{\\textcolor{#2563c9}{8}} \\\\ 3 &= x \\end{aligned}$$
<p><b>Kontroll.</b> $\\mathrm{VL} = \\dfrac{3}{4}$ och $\\mathrm{HL} = \\dfrac{6}{8} = \\dfrac{3}{4}$. Stämmer.</p>
<p><b>Svar:</b> $x = 3$</p>
<p class="ex-rubrik">Samma metod när $x$ står i nämnaren: $\\dfrac{6}{x} = \\dfrac{3}{4}$</p>
<p>Nämnaren $x$ får inte bli 0, så $x \\neq 0$. Korsvis multiplikation ger $3 \\cdot x = 6 \\cdot 4$, det vill säga $3x = 24$. Dividera båda led med 3: $x = 8$.</p>`,
  reminder: `
<p class="ex-rubrik">Kom ihåg</p>
<ul>
<li>Står $x$ i en nämnare: skriv först vilket värde som är förbjudet, till exempel $x \\neq 0$.</li>
<li>$\\dfrac{a}{b} = \\dfrac{c}{d}$ betyder att $c \\cdot b = a \\cdot d$. Kors gånger kors.</li>
<li>Skriv ut produkterna som en ny ekvation utan nämnare, och lös den som på blad 1.</li>
</ul>`,
  sections: [
    { title: 'A. $x$ i täljaren', cols: 4, h: 'mellan', tasks: [
      kors(L(1), L(0, 3), L(0, 4), L(0, 6)), kors(L(1), L(0, 5), L(0, 6), L(0, 10)), kors(L(1), L(0, 2), L(0, 9), L(0, 6)), kors(L(1), L(0, 4), L(0, 3), L(0, 2)),
      kors(L(1), L(0, 6), L(0, 5), L(0, 3)), kors(L(1), L(0, 8), L(0, 3), L(0, 4)), kors(L(1), L(0, 10), L(0, 7), L(0, 5)), kors(L(1), L(0, 9), L(0, 2), L(0, 3)),
      kors(L(1), L(0, 12), L(0, 3), L(0, 4)), kors(L(1), L(0, 7), L(0, 6), L(0, 14)), kors(L(1), L(0, 15), L(0, 4), L(0, 5)), kors(L(1), L(0, 20), L(0, 3), L(0, 10)),
    ] },
    { title: 'B. $x$ i nämnaren', cols: 4, h: 'mellan', tasks: [
      kors(L(0, 6), L(1), L(0, 3), L(0, 4)), kors(L(0, 10), L(1), L(0, 5), L(0, 2)), kors(L(0, 8), L(1), L(0, 2), L(0, 5)), kors(L(0, 12), L(1), L(0, 4), L(0, 3)),
      kors(L(0, 15), L(1), L(0, 3), L(0, 2)), kors(L(0, 9), L(1), L(0, 3), L(0, 5)), kors(L(0, 14), L(1), L(0, 7), L(0, 3)), kors(L(0, 20), L(1), L(0, 4), L(0, 5)),
    ] },
    { title: 'C. Ett tal framför $x$', cols: 4, h: 'mellan', tasks: [
      kors(L(0, 9), L(2), L(0, 3), L(0, 4)), kors(L(0, 4), L(3), L(0, 2), L(0, 15)), kors(L(3), L(0, 4), L(0, 9), L(0, 2)), kors(L(2), L(0, 5), L(0, 4), L(0, 10)),
      kors(L(5), L(0, 6), L(0, 10), L(0, 4)), kors(L(0, 12), L(5), L(0, 3), L(0, 5)), kors(L(3), L(0, 8), L(0, 3), L(0, 4)), kors(L(0, 10), L(3), L(0, 5), L(0, 6)),
    ] },
    { title: 'D. Lite svårare', svar: true, cols: 3, h: 'hog', tasks: [
      kors(L(1, 1), L(0, 3), L(0, 4), L(0, 2)), kors(L(0, 5), L(1, -2), L(0, 1), L(0, 3)), kors(L(1), L(0, 6), L(0, 5), L(0, 4)),
      kors(L(2, -1), L(0, 5), L(0, 3), L(0, 5)), kors(L(0, 7), L(1, 3), L(0, 2), L(0, 4)), kors(L(0, 5), L(2), L(0, 3), L(0, 4)),
    ] },
  ],
};

const S5 = {
  file: 'ovningsblad-ekvationer-5.html', nr: 5, title: 'Blandade ekvationer',
  under: 'Alla fyra typerna från blad 1 till 4, huller om buller',
  avsnitt: 'Matematik 1, avsnitt 2.5 till 2.7',
  intro: 'Här är typerna blandade. Titta först på ekvationen och bestäm vilken sorts ekvation det är, och välj sedan metod. Det är precis så det är på ett prov.',
  reminder: `
<p class="ex-rubrik">Vilken sorts ekvation är det?</p>
<ul>
<li><b>$x$ bara på ena sidan</b>, till exempel $3x + 7 = 22$: ta bort talet som adderas eller subtraheras, dividera sedan med talet framför $x$ (blad 1).</li>
<li><b>$x$ på båda sidor</b>, till exempel $5x + 2 = 2x + 14$: utveckla parenteser, förenkla, samla $x$ på ena sidan (blad 2).</li>
<li><b>Ett bråk på ena sidan och ett tal på den andra</b>, till exempel $\\dfrac{18}{x} = 6$: täljaren är lika med kvoten gånger nämnaren (blad 3).</li>
<li><b>Ett bråk på varje sida</b>, till exempel $\\dfrac{x}{3} = \\dfrac{8}{12}$: korsvis multiplikation (blad 4).</li>
<li>Står $x$ i en nämnare: skriv först vilket värde som är förbjudet.</li>
</ul>`,
  sections: [
    { title: 'A. Blandade ekvationer', cols: 3, h: 'hog', tasks: [
      lin(3, 7, 0, 22), lin(5, 2, 2, 14), brak1(L(0, 18), L(1), 6), kors(L(1), L(0, 3), L(0, 8), L(0, 12)),
      lin(1, -13, 0, 21), lin(4, -5, 2, 9), lin(R(1, 4), 0, 0, 7), kors(L(0, 15), L(1), L(0, 5), L(0, 3)),
      lin(6, 0, 0, 54), raw('2(x + 5) = 3x + 4', x => [2 * (x + 5), 3 * x + 4], [['2(x + 5)', '3x + 4']], 2, 10, 3, 4),
      brak1(L(0, 35), L(5), 7), lin(R(1, 2), -3, 0, 6),
      lin(8, 3, 6, 15), kors(L(1), L(0, 5), L(0, 4), L(0, 10)), lin(7, -10, 0, 39), brak1(L(0, 48), L(4), 3),
      raw('3x + 8 + x = 2x + 20', x => [3 * x + 8 + x, 2 * x + 20], [['3x + 8 + x', '2x + 20']], 4, 8, 2, 20),
      kors(L(0, 20), L(1), L(0, 4), L(0, 7)), lin(1, 19, 0, 12), brak1(L(1, 6), L(0, 3), 4),
      lin(9, -2, 4, 18), kors(L(2), L(0, 3), L(0, 8), L(0, 6)), lin(5, 6, 0, 1),
      raw('3(x - 1) = 2x + 4', x => [3 * (x - 1), 2 * x + 4], [['3(x - 1)', '2x + 4']], 3, -3, 2, 4),
      brak1(L(0, 56), L(1), 8), lin(R(1, 6), 2, 0, 5), lin(6, 4, 6, 9), kors(L(0, 8), L(3), L(0, 2), L(0, 3)),
      lin(10, -7, 3, 14), lin(4, 9, 0, 25), brak1(L(0, 60), L(1, 2), 6),
      raw('4(x + 2) = 2x + 20', x => [4 * (x + 2), 2 * x + 20], [['4(x + 2)', '2x + 20']], 4, 8, 2, 20),
      brak1(L(0, 27), L(1), 3), lin(4, 1, 1, 22), kors(L(1), L(0, 8), L(0, 3), L(0, 12)), brak1(L(2), L(0, 7), 4),
    ] },
    { title: 'B. Lite svårare', svar: true, cols: 3, h: 'hog', tasks: [
      raw('5x - 2(x + 3) = 9', x => [5 * x - 2 * (x + 3), 9], [['5x - 2(x + 3)', '9'], ['5x - 2x - 6', '9']], 3, -6, 0, 9),
      kors(L(0, 3), L(1, -4), L(0, 1), L(0, 2)), lin(-2, 9, 3, -6), lin(R(3, 4), 1, 0, 7),
      raw('2(3x + 1) = 3(x + 5)', x => [2 * (3 * x + 1), 3 * (x + 5)], [['2(3x + 1)', '3(x + 5)']], 6, 2, 3, 15),
      kors(L(1, -3), L(0, 4), L(0, 3), L(0, 6)), brak1(L(0, 25), L(2), 10),
      raw('4x + 3 = 4(x + 1) - 1', x => [4 * x + 3, 4 * (x + 1) - 1], [['4x + 3', '4(x + 1) - 1'], ['4x + 3', '4x + 4 - 1']], 4, 3, 4, 3),
    ] },
  ],
};

// ---------- HTML ----------
const CSS = `
:root { --ink:#1f2530; --blue:#2563c9; --paper:#f7f2e8; --line:rgba(31,37,48,.22); --accent:#c8324a; }
* { box-sizing: border-box; }
html { color-scheme: light; }
body { margin:0; font-family:'Poppins', system-ui, sans-serif; color:var(--ink); background:#fff; font-size:11pt; line-height:1.45; }
.page { max-width: 186mm; margin: 0 auto; padding: 10mm 6mm 20mm; }
header { border-bottom: 2px solid var(--ink); padding-bottom: 6px; margin-bottom: 12px; }
.over { font-size: 9.5pt; text-transform: uppercase; letter-spacing: .06em; color:#5b6472; margin:0; }
h1 { font-size: 20pt; margin: 2px 0 0; line-height:1.2; }
.under { margin: 2px 0 0; font-size: 11pt; color:#3b4350; }
.namn { display:flex; gap: 28px; margin-top: 8px; font-size: 10pt; color:#3b4350; }
.namn span { flex:1; border-bottom: 1px solid var(--line); padding-bottom: 2px; }
.intro { margin: 0 0 10px; }
.box { background: var(--paper); border: 1px solid rgba(31,37,48,.18); border-radius: 8px; padding: 10px 14px; margin: 0 0 12px; break-inside: avoid; }
.box p { margin: 4px 0; }
.box ul, .box ol { margin: 4px 0 4px 18px; padding: 0; }
.box li { margin: 2px 0; }
.box .katex-display { margin: 4px 0 6px; }
.ex-rubrik { font-weight: 600; margin: 0 0 4px !important; }
.ex-flex { display:flex; gap: 14px; align-items:flex-start; }
.ex-flex svg { flex: 0 0 auto; margin-top: 4px; }
.ex-flex > div { flex: 1 1 auto; min-width: 0; }
.tips { font-size: 9.5pt; color:#3b4350; margin: 0 0 12px; }
section { break-inside: auto; margin-bottom: 8px; }
h2 { font-size: 12pt; margin: 12px 0 6px; padding: 3px 0 3px; border-bottom: 1px solid var(--line); break-after: avoid; }
h2 .sv { font-weight: 400; font-size: 9.5pt; color:#5b6472; margin-left: 8px; }
.tasks { display: grid; gap: 6px 14px; }
.c2 { grid-template-columns: repeat(2, 1fr); }
.c3 { grid-template-columns: repeat(3, 1fr); }
.c4 { grid-template-columns: repeat(4, 1fr); }
.task { break-inside: avoid; padding: 4px 4px 0; border-bottom: 1px dotted var(--line); display:flex; gap: 6px; align-items: baseline; }
.task .nr { font-weight: 600; min-width: 1.7em; text-align:right; font-size: 10pt; }
.task .eq { flex:1; }
.kort { min-height: 17mm; }
.mellan { min-height: 27mm; }
.hog { min-height: 38mm; }
.facit { break-before: page; page-break-before: always; }
.facit h2 { border-bottom: 2px solid var(--ink); font-size: 14pt; }
.svarlista { display:grid; grid-template-columns: repeat(4, 1fr); gap: 2px 12px; font-size: 10pt; margin-bottom: 14px; }
.svarlista div { display:flex; gap: 6px; align-items: baseline; }
.svarlista .nr { font-weight: 600; min-width: 1.7em; text-align:right; }
.los { columns: 2; column-gap: 12mm; font-size: 10pt; }
.sol { break-inside: avoid; page-break-inside: avoid; margin: 0 0 10px; padding: 0 0 6px; border-bottom: 1px dotted var(--line); }
.sol .nr { font-weight: 600; }
.sol .note { margin: 2px 0; font-size: 9.5pt; color:#3b4350; }
.sol .katex-display { margin: 2px 0 4px; text-align: left; }
.sol .katex-display > .katex { text-align: left; }
.sol .svar { margin: 2px 0 0; }
footer { margin-top: 18px; font-size: 9pt; color:#5b6472; border-top: 1px solid var(--line); padding-top: 6px; display:flex; justify-content: space-between; }
@page { size: A4; margin: 13mm 12mm 14mm; }
@media print {
  body { font-size: 10.5pt; }
  .page { max-width: none; padding: 0; }
  .box { background: var(--paper); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
}
@media (max-width: 640px) {
  .c3, .c4 { grid-template-columns: repeat(2, 1fr); }
  .svarlista { grid-template-columns: repeat(2, 1fr); }
  .los { columns: 1; }
  .ex-flex { flex-direction: column; }
}
`;

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

function renderLines(lines) {
  let html = ''; let buf = [];
  const flush = () => { if (buf.length) { html += `$$\\begin{aligned} ${buf.join(' \\\\ ')} \\end{aligned}$$\n`; buf = []; } };
  for (const ln of lines) {
    if (ln.note) { flush(); html += `<p class="note">${ln.note}</p>\n`; }
    else buf.push(`${ln.l} &= ${ln.r}`);
  }
  flush();
  return html;
}

function buildSheet(S) {
  let n = 0;
  const all = [];
  let tasksHtml = '';
  for (const sec of S.sections) {
    tasksHtml += `<section><h2>${sec.title}${sec.svar ? '' : ''}</h2><div class="tasks c${sec.cols}">`;
    for (const t of sec.tasks) {
      n++; all.push({ n, t });
      verify(t, `${S.file} uppgift ${n}`);
      tasksHtml += `<div class="task ${sec.h}"><span class="nr">${n}.</span><span class="eq">$${t.disp}$</span></div>`;
    }
    tasksHtml += `</div></section>`;
  }
  const svar = all.map(({ n, t }) => `<div><span class="nr">${n}.</span><span>${svarTex(t)}</span></div>`).join('');
  const los = all.map(({ n, t }) => `<div class="sol"><span class="nr">${n}.</span>\n${renderLines(t.lines)}<p class="svar"><b>Svar:</b> ${svarTex(t)}</p></div>`).join('\n');
  const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad ${S.nr}: ${S.title} — Fysiklabbet</title>
<meta name="description" content="Övningsblad ${S.nr} av 5 i ekvationslösning (${S.avsnitt}): ${S.title}. Många uppgifter på grundnivå, ett genomräknat exempel först och lösningsförslag till varje uppgift sist. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/${S.file}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  renderMathInElement(document.body, {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    throwOnError: false, trust: true
  });
  document.documentElement.setAttribute('data-katex', 'klar');
});
</script>
<style>${CSS}</style>
</head>
<body>
<div class="page">
<header>
<p class="over">Övningsblad ${S.nr} av 5 · ${S.avsnitt}</p>
<h1>${S.title}</h1>
${S.under ? `<p class="under">${S.under}</p>` : ''}
<div class="namn"><span>Namn:</span><span>Datum:</span></div>
</header>
<p class="intro">${S.intro}</p>
${S.example ? `<div class="box">${S.example}</div>` : ''}
<div class="box">${S.reminder}</div>
<p class="tips">Lös uppgifterna i ordning och skriv alla steg, ett led i taget. Kontrollera dina svar mot listan <b>Svar</b> längst bak. Fastnar du: titta på lösningsförslaget till just den uppgiften, och lös den sedan en gång till utan att titta.</p>
${tasksHtml}
<div class="facit">
<h2>Svar</h2>
<div class="svarlista">${svar}</div>
<h2>Lösningsförslag</h2>
<div class="los">
${los}
</div>
</div>
<footer><span>Fysiklabbet · fysiklabbet.se</span><span>Övningsblad ${S.nr}: ${S.title}</span></footer>
</div>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, S.file), html, 'utf8');
  console.log(`${S.file}: ${n} uppgifter, alla lösningar kontrollerade genom insättning`);
}

for (const S of [S1, S2, S3, S4, S5]) buildSheet(S);
