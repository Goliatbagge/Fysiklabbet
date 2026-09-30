// Bygger övningsbladet "Potenser" (Matematik nivå 1c): exponenten noll,
// negativa exponenter och ekvationer som löses med potenslagarna, på tre
// nivåer (Grund, Mellan, Avancerad). Tänkt efter genomgångarna ma1c-1.6,
// 1.7, 1.8 och 2.10. Nivåerna heter Grund, Mellan och Avancerad, aldrig
// betygsbokstäver: betyg sätts på kursen, inte på uppgifter (2026-09-30).
//
// Varje svar kontrolleras numeriskt i kontrollerna längst ned (insättning i
// ekvationerna, värden på uttrycken för några x), så att facit inte kan
// innehålla ett räknefel.
//
//   node .claude/bygg-ovningsblad-potenser.js
//     bygger ovningsblad/ovningsblad-potenser.html
//
// PDF-versionen görs sedan med headless Chrome mot dev-servern:
//   chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//     --print-to-pdf=ovningsblad/ovningsblad-potenser.pdf
//     http://localhost:8000/ovningsblad/ovningsblad-potenser.html
'use strict';
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'ovningsblad', 'ovningsblad-potenser.html');

// ---------- hjälpfunktioner för lösningarna ----------
const k = (s) => `$$${s}$$`;
const p = (s) => `<p>${s}</p>`;
const sv = (s) => `<p class="svar"><b>Svar:</b> ${s}</p>`;
const kt = (s) => `<p class="kontroll"><i>Kontroll:</i> ${s}</p>`;
// operation i båda led, med operationen i fetstil
const minus = (vl, hl, t) => k(String.raw`${vl} \mathbin{\boldsymbol{-}} \boldsymbol{${t}} = ${hl} \mathbin{\boldsymbol{-}} \boldsymbol{${t}}`);
const plus = (vl, hl, t) => k(String.raw`${vl} \mathbin{\boldsymbol{+}} \boldsymbol{${t}} = ${hl} \mathbin{\boldsymbol{+}} \boldsymbol{${t}}`);
const delat = (vl, hl, t) => k(String.raw`\frac{${vl}}{\boldsymbol{${t}}} = \frac{${hl}}{\boldsymbol{${t}}}`);
const upph = (vl, hl, t) => k(String.raw`\left(${vl}\right)^{\boldsymbol{${t}}} = \left(${hl}\right)^{\boldsymbol{${t}}}`);
const samma = 'Båda led är nu potenser med samma bas. Då måste exponenterna vara lika:';

// ---------- uppgifterna ----------
// Varje nivå har delar; varje del har en instruktion, en kolumnbredd och
// uppgifter { q, los, svar, test }. test() kontrollerar svaret numeriskt.
const NIVAER = [
  {
    namn: 'Grund', under: 'Exponenten noll, negativa exponenter, potenslagarna och ekvationer med samma bas',
    delar: [
      {
        rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'kort',
        upg: [
          { q: '7^0', svar: '1', test: () => 7 ** 0 === 1,
            los: p('Varje tal utom 0 upphöjt till 0 är 1, inte 0.') + k('7^0 = 1') + sv('1') },
          { q: '2^{-1}', svar: '$\\dfrac{1}{2}$', test: () => 2 ** -1 === 1 / 2,
            los: p(String.raw`Negativ exponent betyder "1 delat med potensen utan minustecknet":`) + k(String.raw`2^{-1} = \frac{1}{2^1} = \frac{1}{2}`) + sv(String.raw`$\dfrac{1}{2}$`) },
          { q: '3^{-2}', svar: '$\\dfrac{1}{9}$', test: () => Math.abs(3 ** -2 - 1 / 9) < 1e-12,
            los: k(String.raw`3^{-2} = \frac{1}{3^2} = \frac{1}{9}`) + sv(String.raw`$\dfrac{1}{9}$`) },
          { q: '10^{-3}', svar: '0,001', test: () => Math.abs(10 ** -3 - 0.001) < 1e-15,
            los: k(String.raw`10^{-3} = \frac{1}{10^3} = \frac{1}{1\,000} = 0{,}001`) + sv('0,001') },
          { q: '4^0 + 4^{-1}', svar: '$\\dfrac{5}{4}$', test: () => 4 ** 0 + 4 ** -1 === 5 / 4,
            los: p(String.raw`Vi beräknar potenserna var för sig, $4^0 = 1$ och $4^{-1} = \dfrac{1}{4}$:`) + k(String.raw`4^0 + 4^{-1} = 1 + \frac{1}{4} = \frac{4}{4} + \frac{1}{4} = \frac{5}{4}`) + sv(String.raw`$\dfrac{5}{4}$`) },
          { q: '2^{-3}', svar: '$\\dfrac{1}{8}$', test: () => 2 ** -3 === 1 / 8,
            los: k(String.raw`2^{-3} = \frac{1}{2^3} = \frac{1}{8}`) + sv(String.raw`$\dfrac{1}{8}$`) },
          { q: '5^0 \\cdot 5^{-2}', svar: '$\\dfrac{1}{25}$', test: () => Math.abs(5 ** 0 * 5 ** -2 - 1 / 25) < 1e-15,
            los: k(String.raw`5^0 \cdot 5^{-2} = 1 \cdot \frac{1}{5^2} = \frac{1}{25}`) + sv(String.raw`$\dfrac{1}{25}$`) },
          { q: '1^{-5}', svar: '1', test: () => 1 ** -5 === 1,
            los: p('Ettor multiplicerade med varandra blir alltid 1:') + k(String.raw`1^{-5} = \frac{1}{1^5} = \frac{1}{1} = 1`) + sv('1') },
        ],
      },
      {
        rubrik: 'Skriv som en enda potens.', kol: 4, hojd: 'kort',
        upg: [
          { q: '5^3 \\cdot 5^4', svar: '$5^7$', test: () => 5 ** 3 * 5 ** 4 === 5 ** 7,
            los: p('Samma bas: exponenterna adderas.') + k('5^3 \\cdot 5^4 = 5^{3+4} = 5^7') + sv('$5^7$') },
          { q: '\\dfrac{2^9}{2^3}', svar: '$2^6$', test: () => 2 ** 9 / 2 ** 3 === 2 ** 6,
            los: p('Samma bas: nämnarens exponent subtraheras från täljarens.') + k(String.raw`\frac{2^9}{2^3} = 2^{9-3} = 2^6`) + sv('$2^6$') },
          { q: '(3^2)^4', svar: '$3^8$', test: () => (3 ** 2) ** 4 === 3 ** 8,
            los: p('En potens upphöjd till en exponent: exponenterna multipliceras.') + k(String.raw`(3^2)^4 = 3^{2 \cdot 4} = 3^8`) + sv('$3^8$') },
          { q: 'x^2 \\cdot x^5', svar: '$x^7$', test: () => [1.3, 2, -0.7].every(x => Math.abs(x ** 2 * x ** 5 - x ** 7) < 1e-9),
            los: k('x^2 \\cdot x^5 = x^{2+5} = x^7') + sv('$x^7$') },
          { q: '\\dfrac{a^3}{a^5}', svar: '$a^{-2}$', test: () => [1.3, 2, -0.7].every(a => Math.abs(a ** 3 / a ** 5 - a ** -2) < 1e-9),
            los: p('Exponenten blir negativ, och det går bra:') + k(String.raw`\frac{a^3}{a^5} = a^{3-5} = a^{-2}`) + p(String.raw`Samma sak kan skrivas $\dfrac{1}{a^2}$.`) + sv('$a^{-2}$') },
          { q: '\\dfrac{7^4}{7^4}', svar: '$7^0 = 1$', test: () => 7 ** 4 / 7 ** 4 === 7 ** 0,
            los: k(String.raw`\frac{7^4}{7^4} = 7^{4-4} = 7^0`) + p('Ett tal delat med sig självt är 1, och det är just därför $7^0 = 1$.') + sv('$7^0 = 1$') },
          { q: '6 \\cdot 6^3', svar: '$6^4$', test: () => 6 * 6 ** 3 === 6 ** 4,
            los: p(String.raw`Talet 6 är $6^1$:`) + k(String.raw`6 \cdot 6^3 = 6^1 \cdot 6^3 = 6^{1+3} = 6^4`) + sv('$6^4$') },
          { q: '(x^3)^2 \\cdot x', svar: '$x^7$', test: () => [1.3, 2, -0.7].every(x => Math.abs((x ** 3) ** 2 * x - x ** 7) < 1e-9),
            los: p(String.raw`Först parentesen, sedan $x = x^1$:`) + k(String.raw`(x^3)^2 \cdot x = x^{3 \cdot 2} \cdot x^1 = x^6 \cdot x^1 = x^{6+1} = x^7`) + sv('$x^7$') },
        ],
      },
      {
        rubrik: 'Skriv som en potens med negativ exponent.', kol: 4, hojd: 'kort',
        upg: [
          { q: '\\dfrac{1}{2^5}', svar: '$2^{-5}$', test: () => 1 / 2 ** 5 === 2 ** -5,
            los: p(String.raw`Eftersom $2^{-5} = \dfrac{1}{2^5}$ gäller även det omvända:`) + k(String.raw`\frac{1}{2^5} = 2^{-5}`) + sv('$2^{-5}$') },
          { q: '\\dfrac{1}{x^3}', svar: '$x^{-3}$', test: () => [1.3, 2].every(x => Math.abs(1 / x ** 3 - x ** -3) < 1e-12),
            los: k(String.raw`\frac{1}{x^3} = x^{-3}`) + sv('$x^{-3}$') },
          { q: '\\dfrac{1}{10}', svar: '$10^{-1}$', test: () => Math.abs(1 / 10 - 10 ** -1) < 1e-15,
            los: p(String.raw`Talet 10 i nämnaren är $10^1$:`) + k(String.raw`\frac{1}{10} = \frac{1}{10^1} = 10^{-1}`) + sv('$10^{-1}$') },
          { q: '\\dfrac{4}{x}', svar: '$4x^{-1}$', test: () => [1.3, 2].every(x => Math.abs(4 / x - 4 * x ** -1) < 1e-12),
            los: p('Flytta upp nämnaren till täljaren och byt tecken på exponenten. Fyran står kvar:') + k(String.raw`\frac{4}{x} = \frac{4}{x^1} = 4x^{-1}`) + sv('$4x^{-1}$') },
        ],
      },
      {
        rubrik: 'Lös ekvationerna.', kol: 3, hojd: 'mellan',
        upg: [
          { q: '2^x = 2^5', svar: '$x = 5$', test: () => 2 ** 5 === 2 ** 5,
            los: p('Båda led är potenser med basen 2. Då måste exponenterna vara lika:') + k('x = 5') + sv('$x = 5$') },
          { q: '3^x \\cdot 3^2 = 3^6', svar: '$x = 4$', test: () => 3 ** 4 * 3 ** 2 === 3 ** 6,
            los: p('Vi skriver vänsterledet som en enda potens:') + k('3^{x+2} = 3^6') + p(samma) + k('x + 2 = 6') + minus('x + 2', '6', '2') + k('x = 4') + sv('$x = 4$') },
          { q: '\\dfrac{5^x}{5^2} = 5^4', svar: '$x = 6$', test: () => 5 ** 6 / 5 ** 2 === 5 ** 4,
            los: k(String.raw`5^{x-2} = 5^4`) + p(samma) + k('x - 2 = 4') + plus('x - 2', '4', '2') + k('x = 6') + sv('$x = 6$') },
          { q: '7^x = 1', svar: '$x = 0$', test: () => 7 ** 0 === 1,
            los: p(String.raw`Talet 1 kan skrivas som en potens av 7, nämligen $7^0$:`) + k('7^x = 7^0') + p(samma) + k('x = 0') + sv('$x = 0$') },
          { q: '2^x = \\dfrac{1}{2^3}', svar: '$x = -3$', test: () => 2 ** -3 === 1 / 2 ** 3,
            los: p(String.raw`Högerledet är $\dfrac{1}{2^3} = 2^{-3}$:`) + k('2^x = 2^{-3}') + p(samma) + k('x = -3') + sv('$x = -3$') },
          { q: '(4^x)^2 = 4^{10}', svar: '$x = 5$', test: () => (4 ** 5) ** 2 === 4 ** 10,
            los: p('Exponenterna i vänsterledet multipliceras:') + k('4^{2x} = 4^{10}') + p(samma) + k('2x = 10') + delat('2x', '10', '2') + k('x = 5') + sv('$x = 5$') },
        ],
      },
    ],
  },
  {
    namn: 'Mellan', under: 'Teckenfällor, bråk med negativ exponent, byte till samma bas och resonemang',
    delar: [
      {
        rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'kort',
        upg: [
          { q: '(-3)^0', svar: '1', test: () => (-3) ** 0 === 1,
            los: p('Parentesen gör att hela talet $-3$ är basen:') + k('(-3)^0 = 1') + sv('1') },
          { q: '-3^0', svar: '$-1$', test: () => -(3 ** 0) === -1,
            los: p('Här är basen bara 3. Minustecknet står utanför potensen:') + k('-3^0 = -(3^0) = -1') + sv('$-1$') },
          { q: '\\left(\\dfrac{2}{3}\\right)^{-1}', svar: '$\\dfrac{3}{2}$', test: () => Math.abs((2 / 3) ** -1 - 3 / 2) < 1e-12,
            los: p('Att upphöja ett bråk till $-1$ är att invertera det:') + k(String.raw`\left(\frac{2}{3}\right)^{-1} = \frac{3}{2}`) + sv(String.raw`$\dfrac{3}{2}$`) },
          { q: '\\left(\\dfrac{1}{2}\\right)^{-3}', svar: '8', test: () => (1 / 2) ** -3 === 8,
            los: p('Invertera bråket och byt tecken på exponenten:') + k(String.raw`\left(\frac{1}{2}\right)^{-3} = \left(\frac{2}{1}\right)^{3} = 2^3 = 8`) + sv('8') },
          { q: '2^{-1} + 2^{-2}', svar: '$\\dfrac{3}{4}$', test: () => 2 ** -1 + 2 ** -2 === 3 / 4,
            los: p('Potenserna beräknas var för sig, sedan adderas bråken med gemensam nämnare:') + k(String.raw`2^{-1} + 2^{-2} = \frac{1}{2} + \frac{1}{4} = \frac{2}{4} + \frac{1}{4} = \frac{3}{4}`) + sv(String.raw`$\dfrac{3}{4}$`) },
          { q: '\\left(\\dfrac{3}{4}\\right)^{-2}', svar: '$\\dfrac{16}{9}$', test: () => Math.abs((3 / 4) ** -2 - 16 / 9) < 1e-12,
            los: k(String.raw`\left(\frac{3}{4}\right)^{-2} = \left(\frac{4}{3}\right)^{2} = \frac{4^2}{3^2} = \frac{16}{9}`) + sv(String.raw`$\dfrac{16}{9}$`) },
          { q: '10^{-2} \\cdot 10^5', svar: '1 000', test: () => Math.abs(10 ** -2 * 10 ** 5 - 1000) < 1e-9,
            los: p('Samma bas: exponenterna adderas, också när en av dem är negativ.') + k(String.raw`10^{-2} \cdot 10^5 = 10^{-2+5} = 10^3 = 1\,000`) + sv('1&nbsp;000') },
          { q: '6 \\cdot 6^{-2}', svar: '$\\dfrac{1}{6}$', test: () => Math.abs(6 * 6 ** -2 - 1 / 6) < 1e-12,
            los: k(String.raw`6 \cdot 6^{-2} = 6^{1+(-2)} = 6^{-1} = \frac{1}{6}`) + sv(String.raw`$\dfrac{1}{6}$`) },
        ],
      },
      {
        rubrik: 'Förenkla så långt som möjligt. Svara utan negativa exponenter.', kol: 3, hojd: 'kort',
        upg: [
          { q: 'x^{-3} \\cdot x^5', svar: '$x^2$', test: () => [1.3, 2, -0.7].every(x => Math.abs(x ** -3 * x ** 5 - x ** 2) < 1e-9),
            los: k(String.raw`x^{-3} \cdot x^5 = x^{-3+5} = x^2`) + sv('$x^2$') },
          { q: '\\dfrac{x^2}{x^{-4}}', svar: '$x^6$', test: () => [1.3, 2, -0.7].every(x => Math.abs(x ** 2 / x ** -4 - x ** 6) < 1e-9),
            los: p('Att subtrahera ett negativt tal är att addera:') + k(String.raw`\frac{x^2}{x^{-4}} = x^{2-(-4)} = x^{2+4} = x^6`) + sv('$x^6$') },
          { q: '(a^{-2})^3', svar: '$\\dfrac{1}{a^6}$', test: () => [1.3, 2, -0.7].every(a => Math.abs((a ** -2) ** 3 - 1 / a ** 6) < 1e-9),
            los: k(String.raw`(a^{-2})^3 = a^{-2 \cdot 3} = a^{-6} = \frac{1}{a^6}`) + sv(String.raw`$\dfrac{1}{a^6}$`) },
          { q: '(2x^{-1})^3', svar: '$\\dfrac{8}{x^3}$', test: () => [1.3, 2, -0.7].every(x => Math.abs((2 * x ** -1) ** 3 - 8 / x ** 3) < 1e-9),
            los: p('Både talet 2 och $x^{-1}$ upphöjs till 3:') + k(String.raw`(2x^{-1})^3 = 2^3 \cdot (x^{-1})^3 = 8x^{-3} = \frac{8}{x^3}`) + sv(String.raw`$\dfrac{8}{x^3}$`) },
          { q: '\\dfrac{12x^3}{4x^5}', svar: '$\\dfrac{3}{x^2}$', test: () => [1.3, 2, -0.7].every(x => Math.abs(12 * x ** 3 / (4 * x ** 5) - 3 / x ** 2) < 1e-9),
            los: p('Talen förenklas för sig och potenserna för sig:') + k(String.raw`\frac{12x^3}{4x^5} = \frac{12}{4} \cdot x^{3-5} = 3x^{-2} = \frac{3}{x^2}`) + sv(String.raw`$\dfrac{3}{x^2}$`) },
          { q: '(5x)^0 + x^0', svar: '2', test: () => [1.3, 2, -0.7].every(x => (5 * x) ** 0 + x ** 0 === 2),
            los: p('Båda termerna har exponenten 0, så båda är 1 (för $x \\neq 0$):') + k('(5x)^0 + x^0 = 1 + 1 = 2') + sv('2') },
        ],
      },
      {
        rubrik: 'Lös ekvationerna. Skriv först båda led som potenser med samma bas.', kol: 3, hojd: 'mellan',
        upg: [
          { q: '2^x = 32', svar: '$x = 5$', test: () => 2 ** 5 === 32,
            los: p(String.raw`$32 = 2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 2^5$:`) + k('2^x = 2^5') + p(samma) + k('x = 5') + sv('$x = 5$') },
          { q: '3^x = \\dfrac{1}{9}', svar: '$x = -2$', test: () => Math.abs(3 ** -2 - 1 / 9) < 1e-12,
            los: p(String.raw`$\dfrac{1}{9} = \dfrac{1}{3^2} = 3^{-2}$:`) + k('3^x = 3^{-2}') + p(samma) + k('x = -2') + sv('$x = -2$') },
          { q: '10^x = 0{,}001', svar: '$x = -3$', test: () => Math.abs(10 ** -3 - 0.001) < 1e-15,
            los: p(String.raw`$0{,}001 = \dfrac{1}{1\,000} = \dfrac{1}{10^3} = 10^{-3}$:`) + k('10^x = 10^{-3}') + p(samma) + k('x = -3') + sv('$x = -3$') },
          { q: '4^x = 2^6', svar: '$x = 3$', test: () => 4 ** 3 === 2 ** 6,
            los: p(String.raw`Baserna är olika, men $4 = 2^2$:`) + k(String.raw`(2^2)^x = 2^6`) + k('2^{2x} = 2^6') + p(samma) + k('2x = 6') + delat('2x', '6', '2') + k('x = 3') + sv('$x = 3$') },
          { q: '5^{x+1} = 125', svar: '$x = 2$', test: () => 5 ** 3 === 125,
            los: p(String.raw`$125 = 5 \cdot 5 \cdot 5 = 5^3$:`) + k('5^{x+1} = 5^3') + p(samma) + k('x + 1 = 3') + minus('x + 1', '3', '1') + k('x = 2') + sv('$x = 2$') },
          { q: '9^x = 27', svar: '$x = \\dfrac{3}{2}$', test: () => Math.abs(9 ** 1.5 - 27) < 1e-9,
            los: p(String.raw`Varken 27 eller 9 är en potens av den andra, men båda är potenser av 3: $9 = 3^2$ och $27 = 3^3$.`) + k(String.raw`(3^2)^x = 3^3`) + k('3^{2x} = 3^3') + p(samma) + k('2x = 3') + delat('2x', '3', '2') + k(String.raw`x = \frac{3}{2}`) + sv(String.raw`$x = \dfrac{3}{2}$`) },
        ],
      },
      {
        rubrik: 'Lös ekvationerna.', kol: 2, hojd: 'mellan',
        upg: [
          { q: 'x^{-1} = \\dfrac{1}{6}', svar: '$x = 6$', test: () => Math.abs(6 ** -1 - 1 / 6) < 1e-15,
            los: p('Nu är det basen som är okänd. Vi upphöjer båda led till $-1$, så att exponenten i vänsterledet blir $(-1) \\cdot (-1) = 1$:') + upph('x^{-1}', String.raw`\frac{1}{6}`, '-1') + p('Ett bråk upphöjt till $-1$ är det inverterade bråket:') + k('x = 6') + sv('$x = 6$') },
          { q: 'x^{-2} = \\dfrac{1}{9}', svar: '$x = \\pm 3$', test: () => [3, -3].every(x => Math.abs(x ** -2 - 1 / 9) < 1e-12),
            los: p('Vi upphöjer båda led till $-1$:') + upph('x^{-2}', String.raw`\frac{1}{9}`, '-1') + k('x^2 = 9') + p('Exponenten 2 är jämn, så det finns två lösningar: både $3^2$ och $(-3)^2$ är 9.') + k(String.raw`x = \pm\sqrt{9}`) + k(String.raw`x = \pm 3`) + sv(String.raw`$x = \pm 3$`) },
        ],
      },
      {
        rubrik: 'Resonera och förklara.', kol: 1, hojd: 'hog',
        upg: [
          { q: String.raw`Ordna talen i storleksordning, med det minsta först:&emsp;$3^{-2}$,&ensp;$\left(\dfrac{1}{2}\right)^{-2}$,&ensp;$0^5$,&ensp;$2^{-3}$,&ensp;$4^0$`, text: true,
            svar: String.raw`$0^5,\ 3^{-2},\ 2^{-3},\ 4^0,\ \left(\dfrac{1}{2}\right)^{-2}$`,
            test: () => { const v = [0 ** 5, 3 ** -2, 2 ** -3, 4 ** 0, (1 / 2) ** -2]; return v.every((x, i) => i === 0 || v[i - 1] < x); },
            los: p('Vi beräknar varje tal för sig:') +
              k(String.raw`3^{-2} = \frac{1}{9} \qquad \left(\frac{1}{2}\right)^{-2} = 2^2 = 4 \qquad 0^5 = 0`) +
              k(String.raw`2^{-3} = \frac{1}{8} \qquad 4^0 = 1`) +
              p(String.raw`$\dfrac{1}{9}$ är mindre än $\dfrac{1}{8}$: delar man 1 i nio lika delar blir varje del mindre än om man delar i åtta.`) +
              sv(String.raw`$0^5,\ 3^{-2},\ 2^{-3},\ 4^0,\ \left(\dfrac{1}{2}\right)^{-2}$`) },
          { q: String.raw`Elin skriver $5^{-2} = -25$ och Ali skriver $8^0 = 0$. Förklara vad de har gjort för fel och beräkna rätt värden.`, text: true,
            svar: String.raw`$5^{-2} = \dfrac{1}{25}$ och $8^0 = 1$`,
            test: () => Math.abs(5 ** -2 - 1 / 25) < 1e-12 && 8 ** 0 === 1,
            los: p(String.raw`<b>Elin</b> har trott att minustecknet i exponenten gör talet negativt. En negativ exponent betyder i stället "1 delat med potensen utan minustecknet":`) +
              k(String.raw`5^{-2} = \frac{1}{5^2} = \frac{1}{25}`) +
              p(String.raw`<b>Ali</b> har trott att exponenten noll gör potensen noll. Vi kan se vad $8^0$ måste vara genom att beräkna $\dfrac{8^3}{8^3}$ på två sätt:`) +
              k(String.raw`\frac{8^3}{8^3} = 8^{3-3} = 8^0 \qquad \text{och} \qquad \frac{8^3}{8^3} = 1`) +
              p('Båda är rätt, så $8^0 = 1$.') +
              sv(String.raw`$5^{-2} = \dfrac{1}{25}$ och $8^0 = 1$`) },
        ],
      },
    ],
  },
  {
    namn: 'Avancerad', under: 'Flera potenslagar i samma uppgift, ekvationer med olika baser och generella resonemang',
    delar: [
      {
        rubrik: 'Lös ekvationerna.', kol: 3, hojd: 'hog',
        upg: [
          { q: '2^x \\cdot 4^3 = 8^5', svar: '$x = 9$', test: () => 2 ** 9 * 4 ** 3 === 8 ** 5,
            los: p(String.raw`Alla baser är potenser av 2: $4 = 2^2$ och $8 = 2^3$.`) +
              k(String.raw`4^3 = (2^2)^3 = 2^6 \qquad 8^5 = (2^3)^5 = 2^{15}`) +
              k(String.raw`2^x \cdot 2^6 = 2^{15}`) + k(String.raw`2^{x+6} = 2^{15}`) + p(samma) + k('x + 6 = 15') + minus('x + 6', '15', '6') + k('x = 9') +
              kt(String.raw`$2^9 \cdot 4^3 = 512 \cdot 64 = 32\,768$ och $8^5 = 32\,768$.`) + sv('$x = 9$') },
          { q: '3^{2x-1} = 27^{x-2}', svar: '$x = 5$', test: () => 3 ** 9 === 27 ** 3,
            los: p(String.raw`$27 = 3^3$, och hela exponenten $x - 2$ multipliceras med 3:`) +
              k(String.raw`3^{2x-1} = (3^3)^{x-2}`) + k(String.raw`3^{2x-1} = 3^{3(x-2)}`) + k(String.raw`3^{2x-1} = 3^{3x-6}`) + p(samma) +
              k('2x - 1 = 3x - 6') + minus('2x - 1', '3x - 6', '2x') + k('-1 = x - 6') + plus('-1', 'x - 6', '6') + k('5 = x') +
              kt(String.raw`Vänsterledet blir $3^{9}$ och högerledet $27^{3} = (3^3)^3 = 3^9$.`) + sv('$x = 5$') },
          { q: '\\left(\\dfrac{1}{4}\\right)^{x} = 32', svar: '$x = -\\dfrac{5}{2}$', test: () => Math.abs((1 / 4) ** -2.5 - 32) < 1e-9,
            los: p(String.raw`Båda led går att skriva som potenser av 2: $\dfrac{1}{4} = \dfrac{1}{2^2} = 2^{-2}$ och $32 = 2^5$.`) +
              k(String.raw`(2^{-2})^x = 2^5`) + k(String.raw`2^{-2x} = 2^5`) + p(samma) + k('-2x = 5') + delat('-2x', '5', '-2') + k(String.raw`x = -\frac{5}{2}`) +
              kt(String.raw`$\left(\dfrac{1}{4}\right)^{-5/2} = 4^{5/2} = \left(\sqrt{4}\right)^5 = 2^5 = 32$.`) + sv(String.raw`$x = -\dfrac{5}{2}$`) },
          { q: '\\dfrac{25^x}{5^3} = \\dfrac{1}{125}', svar: '$x = 0$', test: () => Math.abs(25 ** 0 / 5 ** 3 - 1 / 125) < 1e-15,
            los: p(String.raw`$25^x = (5^2)^x = 5^{2x}$ och $\dfrac{1}{125} = \dfrac{1}{5^3} = 5^{-3}$:`) +
              k(String.raw`\frac{5^{2x}}{5^3} = 5^{-3}`) + k(String.raw`5^{2x-3} = 5^{-3}`) + p(samma) + k('2x - 3 = -3') + plus('2x - 3', '-3', '3') + k('2x = 0') + delat('2x', '0', '2') + k('x = 0') +
              kt(String.raw`$\dfrac{25^0}{5^3} = \dfrac{1}{125}$.`) + sv('$x = 0$') },
          { q: '4^x + 4^x + 4^x + 4^x = 2^{12}', svar: '$x = 5$', test: () => 4 * 4 ** 5 === 2 ** 12,
            los: p('Potenslagarna gäller bara för multiplikation och division, så vi skriver först om summan. Fyra likadana termer är 4 gånger termen:') +
              k(String.raw`4 \cdot 4^x = 2^{12}`) + k(String.raw`4^1 \cdot 4^x = 2^{12}`) + k(String.raw`4^{x+1} = 2^{12}`) +
              p(String.raw`Nu skriver vi $4 = 2^2$:`) + k(String.raw`(2^2)^{x+1} = 2^{12}`) + k(String.raw`2^{2x+2} = 2^{12}`) + p(samma) +
              k('2x + 2 = 12') + minus('2x + 2', '12', '2') + k('2x = 10') + delat('2x', '10', '2') + k('x = 5') +
              kt(String.raw`$4 \cdot 4^5 = 4^6 = 4\,096$ och $2^{12} = 4\,096$.`) + sv('$x = 5$') },
          { q: '3^x \\cdot 9^x = \\dfrac{1}{27}', svar: '$x = -1$', test: () => Math.abs(3 ** -1 * 9 ** -1 - 1 / 27) < 1e-15,
            los: p(String.raw`$9^x = (3^2)^x = 3^{2x}$ och $\dfrac{1}{27} = \dfrac{1}{3^3} = 3^{-3}$:`) +
              k(String.raw`3^x \cdot 3^{2x} = 3^{-3}`) + k(String.raw`3^{3x} = 3^{-3}`) + p(samma) + k('3x = -3') + delat('3x', '-3', '3') + k('x = -1') +
              kt(String.raw`$3^{-1} \cdot 9^{-1} = \dfrac{1}{3} \cdot \dfrac{1}{9} = \dfrac{1}{27}$.`) + sv('$x = -1$') },
        ],
      },
      {
        rubrik: 'Förenkla så långt som möjligt. Svara utan negativa exponenter.', kol: 2, hojd: 'mellan',
        upg: [
          { q: '\\left(2^{-1} + 2^{-2}\\right)^{-1}', svar: '$\\dfrac{4}{3}$', test: () => Math.abs((2 ** -1 + 2 ** -2) ** -1 - 4 / 3) < 1e-12,
            los: p('Potenslagarna gäller inte för en summa, så vi beräknar parentesen först:') +
              k(String.raw`2^{-1} + 2^{-2} = \frac{1}{2} + \frac{1}{4} = \frac{3}{4}`) +
              k(String.raw`\left(\frac{3}{4}\right)^{-1} = \frac{4}{3}`) +
              p(String.raw`Fällan är att skriva $2^{1} + 2^{2} = 6$, som om exponenten $-1$ kunde multipliceras in i varje term.`) + sv(String.raw`$\dfrac{4}{3}$`) },
          { q: '(x^{-2}y^3)^{-2} \\cdot x^{-4}y^6', svar: '1', test: () => [[1.3, 2], [2, -0.7]].every(([x, y]) => Math.abs((x ** -2 * y ** 3) ** -2 * x ** -4 * y ** 6 - 1) < 1e-9),
            los: p('Båda faktorerna i parentesen upphöjs till $-2$:') +
              k(String.raw`(x^{-2})^{-2} \cdot (y^3)^{-2} = x^{4} y^{-6}`) +
              p('Sedan samlar vi potenserna med samma bas:') +
              k(String.raw`x^{4} y^{-6} \cdot x^{-4} y^{6} = x^{4-4} \cdot y^{-6+6} = x^0 \cdot y^0 = 1`) + sv('1') },
          { q: '\\dfrac{(a^3 b^{-2})^2}{(a^{-1} b)^{-3}}', svar: '$\\dfrac{a^3}{b}$', test: () => [[1.3, 2], [2, -0.7]].every(([a, b]) => Math.abs((a ** 3 * b ** -2) ** 2 / (a ** -1 * b) ** -3 - a ** 3 / b) < 1e-9),
            los: p('Täljare och nämnare var för sig:') +
              k(String.raw`(a^3 b^{-2})^2 = a^{6} b^{-4} \qquad (a^{-1} b)^{-3} = a^{3} b^{-3}`) +
              k(String.raw`\frac{a^{6} b^{-4}}{a^{3} b^{-3}} = a^{6-3} \cdot b^{-4-(-3)} = a^3 b^{-1} = \frac{a^3}{b}`) + sv(String.raw`$\dfrac{a^3}{b}$`) },
          { q: '\\dfrac{8^n \\cdot 2^{-n}}{4^{n+1}}', svar: '$\\dfrac{1}{4}$', test: () => [0, 1, 3, -2].every(n => Math.abs(8 ** n * 2 ** -n / 4 ** (n + 1) - 1 / 4) < 1e-12),
            los: p(String.raw`Vi skriver allt med basen 2: $8^n = (2^3)^n = 2^{3n}$ och $4^{n+1} = (2^2)^{n+1} = 2^{2n+2}$.`) +
              k(String.raw`\frac{2^{3n} \cdot 2^{-n}}{2^{2n+2}} = \frac{2^{2n}}{2^{2n+2}} = 2^{2n-(2n+2)}`) +
              k(String.raw`2^{2n-2n-2} = 2^{-2} = \frac{1}{4}`) +
              p('Talet $n$ tar ut sig självt, så uttrycket är $\\dfrac{1}{4}$ vilket heltal $n$ än är.') + sv(String.raw`$\dfrac{1}{4}$`) },
        ],
      },
      {
        rubrik: 'Visa, lös och motivera.', kol: 1, hojd: 'hog',
        upg: [
          { q: String.raw`Talet $n$ är ett heltal.<br>a) Visa att $5^{n+1} - 5^n = 4 \cdot 5^n$ för alla heltal $n$.<br>b) Bestäm $n$ så att $5^{n+1} - 5^n = 100$.`, text: true,
            svar: 'b) $n = 2$', test: () => [-2, 0, 1, 4].every(n => Math.abs(5 ** (n + 1) - 5 ** n - 4 * 5 ** n) < 1e-9) && 5 ** 3 - 5 ** 2 === 100,
            los: `<p class="del">a)</p>` + p(String.raw`Vi skriver $5^{n+1} = 5^n \cdot 5^1 = 5 \cdot 5^n$. Då har båda termerna faktorn $5^n$, som vi bryter ut:`) +
              k(String.raw`5^{n+1} - 5^n = 5 \cdot 5^n - 1 \cdot 5^n`) + k(String.raw`= (5 - 1) \cdot 5^n = 4 \cdot 5^n`) +
              p(String.raw`Det är samma sak som $5y - y = 4y$ med $y = 5^n$. Det var det som skulle visas.`) +
              `<p class="del">b)</p>` + p('Enligt a) är vänsterledet $4 \\cdot 5^n$:') + k(String.raw`4 \cdot 5^n = 100`) + delat(String.raw`4 \cdot 5^n`, '100', '4') + k('5^n = 25') + k('5^n = 5^2') + p(samma) + k('n = 2') +
              kt(String.raw`$5^3 - 5^2 = 125 - 25 = 100$.`) + sv('$n = 2$') },
          { q: String.raw`Lös ekvationerna.<br>a)&nbsp;$x^{-3} = \dfrac{8}{27}$&emsp;&emsp;b)&nbsp;$2x^{-4} = 32$`, text: true,
            svar: String.raw`a) $x = \dfrac{3}{2}$&emsp;b) $x = \pm\dfrac{1}{2}$`,
            test: () => Math.abs(1.5 ** -3 - 8 / 27) < 1e-12 && [0.5, -0.5].every(x => Math.abs(2 * x ** -4 - 32) < 1e-9),
            los: `<p class="del">a)</p>` + p('Vi upphöjer båda led till $-1$ för att bli av med minustecknet i exponenten:') +
              upph('x^{-3}', String.raw`\frac{8}{27}`, '-1') + k(String.raw`x^3 = \frac{27}{8}`) +
              p(String.raw`Sedan upphöjer vi båda led till $\dfrac{1}{3}$, så att exponenten blir $3 \cdot \dfrac{1}{3} = 1$:`) +
              upph('x^3', String.raw`\frac{27}{8}`, String.raw`1/3`) + k(String.raw`x = \frac{3}{2}`) +
              p(String.raw`eftersom $\left(\dfrac{3}{2}\right)^3 = \dfrac{27}{8}$. Exponenten 3 är udda, så det finns bara en lösning.`) + sv(String.raw`$x = \dfrac{3}{2}$`) +
              `<p class="del">b)</p>` + delat('2x^{-4}', '32', '2') + k('x^{-4} = 16') + upph('x^{-4}', '16', '-1') + k(String.raw`x^4 = \frac{1}{16}`) +
              p(String.raw`Exponenten 4 är jämn, så det finns två lösningar, en positiv och en negativ:`) +
              k(String.raw`x = \pm\sqrt[4]{\frac{1}{16}}`) + k(String.raw`x = \pm\frac{1}{2}`) +
              p(String.raw`eftersom $\left(\dfrac{1}{2}\right)^4 = \dfrac{1}{16}$.`) +
              kt(String.raw`$2 \cdot \left(\pm\dfrac{1}{2}\right)^{-4} = 2 \cdot 2^4 = 32$.`) + sv(String.raw`$x = \pm\dfrac{1}{2}$`) },
          { q: String.raw`Vilket tal är störst, $2^{-10}$ eller $10^{-3}$? Motivera utan räknare.`, text: true,
            svar: '$10^{-3}$', test: () => 10 ** -3 > 2 ** -10,
            los: p('Vi skriver båda talen som bråk:') +
              k(String.raw`2^{-10} = \frac{1}{2^{10}} = \frac{1}{1\,024}`) + k(String.raw`10^{-3} = \frac{1}{10^3} = \frac{1}{1\,000}`) +
              p('Båda bråken har täljaren 1. Ju större nämnaren är, desto mindre blir bråket, och 1 024 är större än 1 000. Alltså är $2^{-10}$ det minsta talet.') +
              sv('$10^{-3}$ är störst.') },
        ],
      },
    ],
  },
];

// ---------- kontroller ----------
let nr = 0;
for (const niva of NIVAER) {
  niva.forsta = nr + 1;
  for (const del of niva.delar) for (const u of del.upg) {
    nr++; u.nr = nr;
    if (!u.test()) throw new Error(`Kontroll misslyckades i uppgift ${nr}: ${u.q}`);
    if (/—/.test(u.los)) throw new Error(`Tankstreck i lösningen till uppgift ${nr}`);
  }
  niva.sista = nr;
}
const ANTAL = nr;

// ---------- sidan ----------
const uppgHtml = NIVAER.map(n => `
  <section class="niva">
    <h2><span class="nivanamn">${n.namn}</span><span class="sv">Uppgift ${n.forsta}–${n.sista} · ${n.under}</span></h2>
${n.delar.map(d => `    <p class="instr">${d.rubrik}</p>
    <div class="tasks c${d.kol}">
${d.upg.map(u => `      <div class="task ${d.hojd}"><span class="nr">${u.nr}</span><span class="eq${u.text ? ' txt' : ''}">${u.text ? u.q : '$' + u.q + '$'}</span></div>`).join('\n')}
    </div>`).join('\n')}
  </section>`).join('\n');

const svarHtml = NIVAER.map(n => `
    <h3 class="svarniva">${n.namn}</h3>
    <div class="svarlista">${n.delar.flatMap(d => d.upg).map(u => `<div${u.svar.length > 34 ? ' class="lang"' : ''}><span class="nr">${u.nr}</span><span>${u.svar}</span></div>`).join('')}</div>`).join('');

const losHtml = NIVAER.map(n => `
    <h3 class="losniva">${n.namn}</h3>
    <div class="los">
${n.delar.flatMap(d => d.upg).map(u => `      <div class="sol"><p class="solh"><span class="nr">${u.nr}</span>${u.text ? '' : ' $' + u.q + '$'}</p>${u.los}</div>`).join('\n')}
    </div>`).join('');

const html = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Övningsblad: Potenser — Fysiklabbet</title>
<meta name="description" content="${ANTAL} uppgifter om potenser i Matematik nivå 1c på tre nivåer: exponenten noll, negativa exponenter och ekvationer som löses med potenslagarna. Med svar och lösningsförslag. Utskriftsklart.">
<link rel="canonical" href="https://fysiklabbet.se/ovningsblad/ovningsblad-potenser.html">
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
.box ul { margin: 2px 0 2px 16px; padding: 0; }
.box li { margin: 1px 0; }
.box .katex-display { margin: 2px 0 3px; text-align:left; }
.box .katex-display > .katex { text-align:left; }
.rub { font-weight: 600; }
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
.task .katex, .sol p .katex, .svarlista .katex, .box p .katex, .box li .katex { white-space: nowrap; }
.kort { min-height: 16mm; } .mellan { min-height: 30mm; } .hog { min-height: 44mm; }
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
    <p class="over">Matematik nivå 1c · Övningsblad</p>
    <h1>Potenser</h1>
    <p class="under">Exponenten noll, negativa exponenter och ekvationer med potenslagarna</p>
    <div class="namn"><span>Namn:</span><span>Klass:</span></div>
  </header>
  <div class="box boxgrid">
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>$a^0 = 1$ för alla $a \\neq 0$, inte 0.</li>
        <li>$a^{-n} = \\dfrac{1}{a^n}$, så $2^{-3} = \\dfrac{1}{8}$. Talet blir inte negativt.</li>
        <li>$\\left(\\dfrac{a}{b}\\right)^{-1} = \\dfrac{b}{a}$, att invertera bråket.</li>
        <li>$a^x \\cdot a^y = a^{x+y}$, $\\dfrac{a^x}{a^y} = a^{x-y}$, $(a^x)^y = a^{x \\cdot y}$, $(ab)^x = a^x b^x$</li>
        <li>Lagarna gäller för multiplikation och division, aldrig för en summa.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: lös ekvationen $4^x \\cdot 2 = 2^{-5}$</p>
      <p>Skriv allt med samma bas, $4 = 2^2$:</p>
      $$2^{2x} \\cdot 2^1 = 2^{-5}$$
      $$2^{2x+1} = 2^{-5}$$
      <p>Samma bas i båda led, så exponenterna är lika:</p>
      $$2x + 1 = -5$$
      $$2x + 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} = -5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} \\quad\\text{ger}\\quad 2x = -6$$
      $$\\frac{2x}{\\boldsymbol{2}} = \\frac{-6}{\\boldsymbol{2}} \\quad\\text{ger}\\quad x = -3$$
    </div>
  </div>
  <p class="nivaer"><b>Grund</b> tränar reglerna en i taget. <b>Mellan</b> blandar reglerna och har några vanliga fällor. <b>Avancerad</b> kräver att du kombinerar flera potenslagar och resonerar generellt. Räkna utan räknare. Svar och lösningsförslag finns efter uppgifterna.</p>
${uppgHtml}
  <section class="facit">
    <h2><span>Svar</span></h2>
${svarHtml}
    <h2><span>Lösningsförslag</span></h2>
${losHtml}
  </section>
  <footer><span>Matematik nivå 1c · Potenser</span><span>fysiklabbet.se</span></footer>
</section>
<!-- Cloudflare Web Analytics: cookiefri besöksmätning, se CLAUDE.md. -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "366677ecfe014a76b73f5bc78a489e0e"}'></script>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log('Skrev', path.relative(process.cwd(), OUT), '·', ANTAL, 'uppgifter');
