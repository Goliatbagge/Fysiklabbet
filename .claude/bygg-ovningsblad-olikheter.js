// Bygger övningsbladet "Olikheter" (Matematik nivå 1c, ma1c-2.11) på tre
// nivåer: Grund, Mellan och Avancerad. Varje gång olikhetstecknet vänds står
// det en röd OBS-rad i lösningen, som i genomgången. Andragradsolikheterna
// löses via gränsfallet och får en tallinje i lösningen. Varje svar
// kontrolleras numeriskt i test(): lösningsmängden prövas mot olikheten i
// ett tätt rutnät av x-värden.
//
//   node .claude/bygg-ovningsblad-olikheter.js
'use strict';
const S = require('./ovningsblad-sida.js');
const { k, p, sv, kt, del, minus, plus, ganger, delat, tallinje, nara } = S;

const obs = (s = 'eftersom vi dividerar med ett negativt tal') => `<p class="obs">OBS! Vänd olikhetstecknet, ${s}.</p>`;
const GRANS = 'Vi löser först gränsfallet, där vänsterledet är lika med högerledet:';

// Prövar att olikheten f(x) och lösningsmängden g(x) ger samma svar för
// x-värden från −20 till 20 i steg om 0,05 (gränsvärdena ingår).
const lika = (f, g) => {
  for (let i = -400; i <= 400; i++) { const x = i / 20; if (f(x) !== g(x)) return false; }
  return true;
};

const NIVAER = [
  {
    namn: 'Grund', under: 'Olikhetstecknen, enkla olikheter och när tecknet ska vändas',
    delar: [
      {
        rubrik: 'Vilket tecken, &lt; eller &gt;, ska stå i rutan?', kol: 4, hojd: 'kort',
        upg: [
          { q: '-3 \\;\\square\\; 2', svar: '$-3 < 2$', test: () => -3 < 2,
            los: p('Alla negativa tal är mindre än alla positiva.') + k('-3 < 2') + sv('$-3 < 2$') },
          { q: '-5 \\;\\square\\; -8', svar: '$-5 > -8$', test: () => -5 > -8,
            los: p('På tallinjen ligger $-5$ till höger om $-8$, och talen växer åt höger.') + k('-5 > -8') + sv('$-5 > -8$') },
          { q: '0{,}5 \\;\\square\\; \\dfrac{1}{3}', svar: '$0{,}5 > \\dfrac{1}{3}$', test: () => 0.5 > 1 / 3,
            los: p('$0{,}5 = \\dfrac{1}{2}$, och en halv är mer än en tredjedel.') + k('0{,}5 > \\frac{1}{3}') + sv('$0{,}5 > \\dfrac{1}{3}$') },
          { q: '-\\dfrac{1}{2} \\;\\square\\; -0{,}4', svar: '$-\\dfrac{1}{2} < -0{,}4$', test: () => -0.5 < -0.4,
            los: p('$-\\dfrac{1}{2} = -0{,}5$, som ligger längre till vänster på tallinjen än $-0{,}4$.') + k('-\\frac{1}{2} < -0{,}4') + sv('$-\\dfrac{1}{2} < -0{,}4$') },
          { q: '2^3 \\;\\square\\; 3^2', svar: '$2^3 < 3^2$', test: () => 2 ** 3 < 3 ** 2,
            los: k('2^3 = 8 \\qquad 3^2 = 9') + k('2^3 < 3^2') + sv('$2^3 < 3^2$') },
          { q: '-0{,}1 \\;\\square\\; -0{,}01', svar: '$-0{,}1 < -0{,}01$', test: () => -0.1 < -0.01,
            los: p('$-0{,}1 = -0{,}10$ ligger längre från noll åt vänster än $-0{,}01$.') + k('-0{,}1 < -0{,}01') + sv('$-0{,}1 < -0{,}01$') },
          { q: '|{-7}| \\;\\square\\; 6', svar: '$|{-7}| > 6$', test: () => Math.abs(-7) > 6,
            los: p('Absolutbeloppet är avståndet till noll, så $|{-7}| = 7$.') + k('7 > 6') + sv('$|{-7}| > 6$') },
          { q: '\\dfrac{3}{4} \\;\\square\\; \\dfrac{4}{5}', svar: '$\\dfrac{3}{4} < \\dfrac{4}{5}$', test: () => 3 / 4 < 4 / 5,
            los: p('Med den gemensamma nämnaren 20:') + k('\\frac{3}{4} = \\frac{15}{20} \\qquad \\frac{4}{5} = \\frac{16}{20}') + k('\\frac{3}{4} < \\frac{4}{5}') + sv('$\\dfrac{3}{4} < \\dfrac{4}{5}$') },
        ],
      },
      {
        rubrik: 'Är $x = 4$ en lösning till olikheten? Svara ja eller nej och motivera.', kol: 3, hojd: 'kort',
        upg: [
          { q: '2x + 1 > 9', svar: 'Nej', test: () => !(2 * 4 + 1 > 9),
            los: p('Vi sätter in $x = 4$:') + k('2 \\cdot 4 + 1 = 9') + p('Är $9 > 9$? Nej, 9 är lika med 9, inte större.') + sv('Nej') },
          { q: '3x - 5 \\leq 7', svar: 'Ja', test: () => 3 * 4 - 5 <= 7,
            los: k('3 \\cdot 4 - 5 = 7') + p('Är $7 \\leq 7$? Ja, tecknet $\\leq$ tillåter likhet.') + sv('Ja') },
          { q: '10 - x < 7', svar: 'Ja', test: () => 10 - 4 < 7,
            los: k('10 - 4 = 6') + p('Är $6 < 7$? Ja.') + sv('Ja') },
        ],
      },
      {
        rubrik: 'Lös olikheterna.', kol: 3, hojd: 'mellan',
        upg: [
          { q: 'x + 7 > 12', svar: '$x > 5$', test: () => lika(x => x + 7 > 12, x => x > 5),
            los: minus('x + 7', '12', '7', '>') + k('x > 5') + sv('$x > 5$') },
          { q: 'x - 4 \\leq 3', svar: '$x \\leq 7$', test: () => lika(x => x - 4 <= 3, x => x <= 7),
            los: plus('x - 4', '3', '4', '\\leq') + k('x \\leq 7') + sv('$x \\leq 7$') },
          { q: '3x < 21', svar: '$x < 7$', test: () => lika(x => 3 * x < 21, x => x < 7),
            los: p('Vi dividerar med 3, ett positivt tal, så tecknet står kvar:') + delat('3x', '21', '3', '<') + k('x < 7') + sv('$x < 7$') },
          { q: '5x \\geq -20', svar: '$x \\geq -4$', test: () => lika(x => 5 * x >= -20, x => x >= -4),
            los: p('Det är talet vi dividerar <b>med</b> som avgör, och 5 är positivt. Att högerledet är negativt spelar ingen roll:') + delat('5x', '-20', '5', '\\geq') + k('x \\geq -4') + sv('$x \\geq -4$') },
          { q: '2x + 3 > 15', svar: '$x > 6$', test: () => lika(x => 2 * x + 3 > 15, x => x > 6),
            los: minus('2x + 3', '15', '3', '>') + k('2x > 12') + delat('2x', '12', '2', '>') + k('x > 6') + sv('$x > 6$') },
          { q: '4x - 7 \\leq 13', svar: '$x \\leq 5$', test: () => lika(x => 4 * x - 7 <= 13, x => x <= 5),
            los: plus('4x - 7', '13', '7', '\\leq') + k('4x \\leq 20') + delat('4x', '20', '4', '\\leq') + k('x \\leq 5') + sv('$x \\leq 5$') },
          { q: '\\dfrac{x}{3} < 4', svar: '$x < 12$', test: () => lika(x => x / 3 < 4, x => x < 12),
            los: ganger('\\frac{x}{3}', '4', '3', '<') + k('x < 12') + sv('$x < 12$') },
          { q: '6 + 2x \\geq 0', svar: '$x \\geq -3$', test: () => lika(x => 6 + 2 * x >= 0, x => x >= -3),
            los: minus('6 + 2x', '0', '6', '\\geq') + k('2x \\geq -6') + delat('2x', '-6', '2', '\\geq') + k('x \\geq -3') + sv('$x \\geq -3$') },
          { q: '9 < 2x + 1', svar: '$x > 4$', test: () => lika(x => 9 < 2 * x + 1, x => x > 4),
            los: minus('9', '2x + 1', '1', '<') + k('8 < 2x') + delat('8', '2x', '2', '<') + k('4 < x') +
              p('$4 < x$ betyder att $x$ är större än 4. Med $x$ till vänster vänds tecknet: $x > 4$.') + sv('$x > 4$') },
        ],
      },
      {
        rubrik: 'Lös olikheterna. Här måste olikhetstecknet vändas.', kol: 3, hojd: 'mellan',
        upg: [
          { q: '-x > 3', svar: '$x < -3$', test: () => lika(x => -x > 3, x => x < -3),
            los: p('Vi dividerar med $-1$:') + delat('-x', '3', '-1', '<') + obs() + k('x < -3') +
              kt('$x = -4$ ger $-(-4) = 4 > 3$. Stämmer.') + sv('$x < -3$') },
          { q: '-2x < 10', svar: '$x > -5$', test: () => lika(x => -2 * x < 10, x => x > -5),
            los: delat('-2x', '10', '-2', '>') + obs() + k('x > -5') + sv('$x > -5$') },
          { q: '-4x \\geq -12', svar: '$x \\leq 3$', test: () => lika(x => -4 * x >= -12, x => x <= 3),
            los: delat('-4x', '-12', '-4', '\\leq') + obs() + k('x \\leq 3') + sv('$x \\leq 3$') },
          { q: '5 - x \\leq 2', svar: '$x \\geq 3$', test: () => lika(x => 5 - x <= 2, x => x >= 3),
            los: minus('5 - x', '2', '5', '\\leq') + k('-x \\leq -3') + delat('-x', '-3', '-1', '\\geq') + obs() + k('x \\geq 3') + sv('$x \\geq 3$') },
          { q: '-\\dfrac{x}{2} > 4', svar: '$x < -8$', test: () => lika(x => -x / 2 > 4, x => x < -8),
            los: p('Vi multiplicerar med $-2$:') + ganger('\\left(-\\frac{x}{2}\\right)', '4', '(-2)', '<') + obs('eftersom vi multiplicerar med ett negativt tal') + k('x < -8') + sv('$x < -8$') },
          { q: '7 - 3x > 1', svar: '$x < 2$', test: () => lika(x => 7 - 3 * x > 1, x => x < 2),
            los: minus('7 - 3x', '1', '7', '>') + k('-3x > -6') + delat('-3x', '-6', '-3', '<') + obs() + k('x < 2') +
              kt('$x = 0$ ger $7 > 1$. Stämmer, och 0 är mindre än 2.') + sv('$x < 2$') },
        ],
      },
    ],
  },
  {
    namn: 'Mellan', under: 'Parenteser, $x$ i båda led, nämnare, olikheter av andra graden och textuppgifter',
    delar: [
      {
        rubrik: 'Lös olikheterna.', kol: 3, hojd: 'hog',
        upg: [
          { q: '3(x - 2) < 12', svar: '$x < 6$', test: () => lika(x => 3 * (x - 2) < 12, x => x < 6),
            los: p('Vi utvecklar parentesen:') + k('3x - 6 < 12') + plus('3x - 6', '12', '6', '<') + k('3x < 18') + delat('3x', '18', '3', '<') + k('x < 6') + sv('$x < 6$') },
          { q: '5x + 4 > 2x + 19', svar: '$x > 5$', test: () => lika(x => 5 * x + 4 > 2 * x + 19, x => x > 5),
            los: minus('5x + 4', '2x + 19', '2x', '>') + k('3x + 4 > 19') + minus('3x + 4', '19', '4', '>') + k('3x > 15') + delat('3x', '15', '3', '>') + k('x > 5') + sv('$x > 5$') },
          { q: '2(x + 1) \\geq 5x - 7', svar: '$x \\leq 3$', test: () => lika(x => 2 * (x + 1) >= 5 * x - 7, x => x <= 3),
            los: k('2x + 2 \\geq 5x - 7') + minus('2x + 2', '5x - 7', '5x', '\\geq') + k('-3x + 2 \\geq -7') + minus('-3x + 2', '-7', '2', '\\geq') + k('-3x \\geq -9') +
              delat('-3x', '-9', '-3', '\\leq') + obs() + k('x \\leq 3') +
              p('Man kan också samla $x$ i högerledet, då slipper man vända tecknet: $9 \\geq 3x$, alltså $3 \\geq x$.') + sv('$x \\leq 3$') },
          { q: '\\dfrac{x}{2} + 1 \\leq \\dfrac{x}{3} + 3', svar: '$x \\leq 12$', test: () => lika(x => x / 2 + 1 <= x / 3 + 3 + 1e-12, x => x <= 12),
            los: p('Minsta gemensamma nämnare är 6. Vi multiplicerar båda led med 6, ett positivt tal:') +
              ganger('\\left(\\frac{x}{2} + 1\\right)', '\\left(\\frac{x}{3} + 3\\right)', '6', '\\leq') + k('3x + 6 \\leq 2x + 18') +
              minus('3x + 6', '2x + 18', '2x', '\\leq') + k('x + 6 \\leq 18') + minus('x + 6', '18', '6', '\\leq') + k('x \\leq 12') + sv('$x \\leq 12$') },
          { q: '4 - 2(x - 3) > x + 1', svar: '$x < 3$', test: () => lika(x => 4 - 2 * (x - 3) > x + 1, x => x < 3),
            los: p('Minus framför parentesen byter tecken på båda termerna: $-2(x - 3) = -2x + 6$.') + k('4 - 2x + 6 > x + 1') + k('10 - 2x > x + 1') +
              minus('10 - 2x', 'x + 1', 'x', '>') + k('10 - 3x > 1') + minus('10 - 3x', '1', '10', '>') + k('-3x > -9') +
              delat('-3x', '-9', '-3', '<') + obs() + k('x < 3') + sv('$x < 3$') },
          { q: '\\dfrac{2x - 1}{3} \\geq x - 2', svar: '$x \\leq 5$', test: () => lika(x => (2 * x - 1) / 3 >= x - 2 - 1e-12, x => x <= 5),
            los: ganger('\\frac{2x - 1}{3}', '(x - 2)', '3', '\\geq') + k('2x - 1 \\geq 3x - 6') + minus('2x - 1', '3x - 6', '3x', '\\geq') + k('-x - 1 \\geq -6') +
              plus('-x - 1', '-6', '1', '\\geq') + k('-x \\geq -5') + delat('-x', '-5', '-1', '\\leq') + obs() + k('x \\leq 5') + sv('$x \\leq 5$') },
        ],
      },
      {
        rubrik: 'Lös olikheterna av andra graden. Rita gärna en tallinje.', kol: 2, hojd: 'hog',
        upg: [
          { q: 'x^2 < 9', svar: '$-3 < x < 3$', test: () => lika(x => x * x < 9, x => -3 < x && x < 3),
            los: p(GRANS) + k('x^2 = 9') + k('x = \\pm\\sqrt{9}') + k('x = \\pm 3') +
              p('Vi prövar ett värde mellan gränserna: $x = 0$ ger $0 < 9$, sant. Utanför, till exempel $x = 4$, ger $16 < 9$, falskt. Gränserna ingår inte eftersom tecknet är $<$:') +
              tallinje({ min: -5, max: 5, punkter: [{ x: -3 }, { x: 3 }], delar: [{ fran: -3, till: 3 }] }) + sv('$-3 < x < 3$') },
          { q: 'x^2 \\geq 16', svar: '$x \\leq -4$ och $x \\geq 4$', test: () => lika(x => x * x >= 16, x => x <= -4 || x >= 4),
            los: p(GRANS) + k('x^2 = 16') + k('x = \\pm\\sqrt{16}') + k('x = \\pm 4') +
              p('$x = 0$ ger $0 \\geq 16$, falskt, så mittdelen ingår inte. $x = 5$ ger $25 \\geq 16$ och $x = -5$ ger $25 \\geq 16$, sant på båda sidor. Gränserna ingår eftersom tecknet är $\\geq$:') +
              tallinje({ min: -6, max: 6, punkter: [{ x: -4, fylld: true }, { x: 4, fylld: true }], delar: [{ fran: -Infinity, till: -4 }, { fran: 4, till: Infinity }] }) + sv('$x \\leq -4$ och $x \\geq 4$') },
          { q: 'x^2 \\leq 25', svar: '$-5 \\leq x \\leq 5$', test: () => lika(x => x * x <= 25, x => -5 <= x && x <= 5),
            los: p(GRANS) + k('x^2 = 25') + k('x = \\pm\\sqrt{25}') + k('x = \\pm 5') +
              p('$x = 0$ ger $0 \\leq 25$, sant. Lösningen ligger mellan gränserna, och gränserna ingår:') +
              tallinje({ min: -6, max: 6, punkter: [{ x: -5, fylld: true }, { x: 5, fylld: true }], delar: [{ fran: -5, till: 5 }] }) + sv('$-5 \\leq x \\leq 5$') },
          { q: '2x^2 > 50', svar: '$x < -5$ och $x > 5$', test: () => lika(x => 2 * x * x > 50, x => x < -5 || x > 5),
            los: p('Vi dividerar först med 2:') + delat('2x^2', '50', '2', '>') + k('x^2 > 25') + p(GRANS) + k('x^2 = 25') + k('x = \\pm\\sqrt{25}') + k('x = \\pm 5') +
              p('$x = 0$ ger $0 > 25$, falskt. Lösningen ligger utanför gränserna, och gränserna ingår inte:') +
              tallinje({ min: -7, max: 7, punkter: [{ x: -5 }, { x: 5 }], delar: [{ fran: -Infinity, till: -5 }, { fran: 5, till: Infinity }] }) + sv('$x < -5$ och $x > 5$') },
        ],
      },
      {
        rubrik: 'Lös uppgifterna.', kol: 1, hojd: 'hog',
        upg: [
          { text: true, q: 'Ett mobilabonnemang kostar 99 kr i månaden och dessutom 0,50 kr per sms. Hur många sms kan Noah skicka om månadsräkningen högst får bli 150 kr?',
            svar: 'Högst 102 sms', test: () => 99 + 0.5 * 102 <= 150 && 99 + 0.5 * 103 > 150,
            los: p('Låt $x$ vara antalet sms. Räkningen är $99 + 0{,}5x$ kr och får vara högst 150 kr, alltså mindre än eller lika med:') + k('99 + 0{,}5x \\leq 150') +
              minus('99 + 0{,}5x', '150', '99', '\\leq') + k('0{,}5x \\leq 51') + delat('0{,}5x', '51', '0{,}5', '\\leq') + k('x \\leq 102') +
              p('Med 102 sms blir räkningen exakt 150 kr, med 103 sms 150,50 kr.') + sv('Högst 102 sms') },
          { text: true, q: 'Vilka heltal uppfyller båda olikheterna $2x - 3 > 1$ och $x + 4 \\leq 9$?',
            svar: '3, 4 och 5', test: () => [3, 4, 5].every(x => 2 * x - 3 > 1 && x + 4 <= 9) && !(2 * 2 - 3 > 1) && !(6 + 4 <= 9),
            los: p('Vi löser olikheterna var för sig:') + k('2x - 3 > 1 \\quad\\text{ger}\\quad 2x > 4 \\quad\\text{ger}\\quad x > 2') +
              k('x + 4 \\leq 9 \\quad\\text{ger}\\quad x \\leq 5') +
              p('Båda ska gälla, så $2 < x \\leq 5$. Talet 2 ingår inte, men 5 gör det:') +
              tallinje({ min: 0, max: 7, punkter: [{ x: 2 }, { x: 5, fylld: true }], delar: [{ fran: 2, till: 5 }] }) + sv('3, 4 och 5') },
          { text: true, q: 'Sara löser olikheten $4 - 2x < 10$ och får svaret $x < -3$. Förklara vad hon har gjort för fel och lös olikheten rätt.',
            svar: '$x > -3$', test: () => lika(x => 4 - 2 * x < 10, x => x > -3),
            los: p('Sara har glömt att vända olikhetstecknet när hon dividerade med $-2$. Rätt lösning:') + minus('4 - 2x', '10', '4', '<') + k('-2x < 6') +
              delat('-2x', '6', '-2', '>') + obs() + k('x > -3') +
              kt('$x = 0$ ger $4 < 10$, sant. Talet 0 uppfyller alltså olikheten, men 0 är inte mindre än $-3$, så Saras svar kan inte stämma.') + sv('$x > -3$') },
        ],
      },
    ],
  },
  {
    namn: 'Avancerad', under: 'Flera bråk, dubbla olikheter, andragradsolikheter i flera steg och resonemang',
    delar: [
      {
        rubrik: 'Lös olikheterna.', kol: 2, hojd: 'hog',
        upg: [
          { q: '\\dfrac{3 - x}{4} - \\dfrac{x + 1}{2} \\geq 1', svar: '$x \\leq -1$', test: () => lika(x => (3 - x) / 4 - (x + 1) / 2 >= 1 - 1e-12, x => x <= -1),
            los: p('Vi multiplicerar båda led med 4. Täljaren $x + 1$ får en parentes, eftersom hela täljaren dras bort:') +
              ganger('\\left(\\frac{3 - x}{4} - \\frac{x + 1}{2}\\right)', '1', '4', '\\geq') + k('(3 - x) - 2(x + 1) \\geq 4') + k('3 - x - 2x - 2 \\geq 4') + k('1 - 3x \\geq 4') +
              minus('1 - 3x', '4', '1', '\\geq') + k('-3x \\geq 3') + delat('-3x', '3', '-3', '\\leq') + obs() + k('x \\leq -1') + sv('$x \\leq -1$') },
          { q: '-3 < 2x + 1 \\leq 7', svar: '$-2 < x \\leq 3$', test: () => lika(x => -3 < 2 * x + 1 && 2 * x + 1 <= 7, x => -2 < x && x <= 3),
            los: p('En dubbel olikhet löses genom att samma operation görs i alla tre leden:') +
              k('-3 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} < 2x + 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} \\leq 7 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1}') + k('-4 < 2x \\leq 6') +
              k('\\frac{-4}{\\boldsymbol{2}} < \\frac{2x}{\\boldsymbol{2}} \\leq \\frac{6}{\\boldsymbol{2}}') + k('-2 < x \\leq 3') +
              tallinje({ min: -4, max: 5, punkter: [{ x: -2 }, { x: 3, fylld: true }], delar: [{ fran: -2, till: 3 }] }) + sv('$-2 < x \\leq 3$') },
          { q: 'x^2 - 7 > 2', svar: '$x < -3$ och $x > 3$', test: () => lika(x => x * x - 7 > 2, x => x < -3 || x > 3),
            los: plus('x^2 - 7', '2', '7', '>') + k('x^2 > 9') + p(GRANS) + k('x^2 = 9') + k('x = \\pm\\sqrt{9}') + k('x = \\pm 3') +
              p('$x = 0$ ger $-7 > 2$, falskt. Lösningen ligger utanför gränserna:') +
              tallinje({ min: -5, max: 5, punkter: [{ x: -3 }, { x: 3 }], delar: [{ fran: -Infinity, till: -3 }, { fran: 3, till: Infinity }] }) + sv('$x < -3$ och $x > 3$') },
          { q: '(x - 1)^2 < 16', svar: '$-3 < x < 5$', test: () => lika(x => (x - 1) ** 2 < 16, x => -3 < x && x < 5),
            los: p(GRANS) + k('(x - 1)^2 = 16') + k('x - 1 = \\pm\\sqrt{16}') + k('x - 1 = \\pm 4') +
              p('Två fall: $x - 1 = 4$ ger $x = 5$, och $x - 1 = -4$ ger $x = -3$. Gränserna ligger alltså inte symmetriskt kring noll.') +
              p('Vi prövar $x = 1$, mellan gränserna: $(1 - 1)^2 = 0 < 16$, sant. Vi prövar $x = 6$: $25 < 16$, falskt.') +
              tallinje({ min: -5, max: 7, punkter: [{ x: -3 }, { x: 5 }], delar: [{ fran: -3, till: 5 }] }) + sv('$-3 < x < 5$') },
          { q: '3x^2 + 5 \\leq 32', svar: '$-3 \\leq x \\leq 3$', test: () => lika(x => 3 * x * x + 5 <= 32 + 1e-9, x => -3 <= x && x <= 3),
            los: minus('3x^2 + 5', '32', '5', '\\leq') + k('3x^2 \\leq 27') + delat('3x^2', '27', '3', '\\leq') + k('x^2 \\leq 9') + p(GRANS) + k('x^2 = 9') + k('x = \\pm\\sqrt{9}') + k('x = \\pm 3') +
              p('$x = 0$ ger $5 \\leq 32$, sant. Lösningen ligger mellan gränserna, och gränserna ingår.') + sv('$-3 \\leq x \\leq 3$') },
          { q: '-2x^2 + 8 < 0', svar: '$x < -2$ och $x > 2$', test: () => lika(x => -2 * x * x + 8 < 0, x => x < -2 || x > 2),
            los: minus('-2x^2 + 8', '0', '8', '<') + k('-2x^2 < -8') + delat('-2x^2', '-8', '-2', '>') + obs() + k('x^2 > 4') +
              p(GRANS) + k('x^2 = 4') + k('x = \\pm\\sqrt{4}') + k('x = \\pm 2') +
              p('$x = 0$ ger $8 < 0$ i den ursprungliga olikheten, falskt. Lösningen ligger utanför gränserna.') + sv('$x < -2$ och $x > 2$') },
        ],
      },
      {
        rubrik: 'Lös uppgifterna.', kol: 1, hojd: 'hog',
        upg: [
          { text: true, q: 'Ett företag tillverkar mobilskal. De fasta kostnaderna är 24 000 kr i månaden. Varje skal kostar dessutom 35 kr att tillverka och säljs för 99 kr. Hur många skal måste företaget sälja i månaden för att gå med vinst?',
            svar: 'Minst 376 skal', test: () => 99 * 376 > 24000 + 35 * 376 && !(99 * 375 > 24000 + 35 * 375),
            los: p('Låt $x$ vara antalet sålda skal. Intäkten är $99x$ kr och kostnaden $24\\,000 + 35x$ kr. Vinst betyder att intäkten är större än kostnaden:') +
              k('99x > 24\\,000 + 35x') + minus('99x', '24\\,000 + 35x', '35x', '>') + k('64x > 24\\,000') + delat('64x', '24\\,000', '64', '>') + k('x > 375') +
              p('Vid exakt 375 skal går företaget jämnt upp, och det säljer bara hela skal. Det första heltalet som är större än 375 är 376.') + sv('Minst 376 skal') },
          { text: true, q: 'För vilka värden på talet $a$ har ekvationen $2x + a = 11$ en positiv lösning?',
            svar: '$a < 11$', test: () => lika(a => (11 - a) / 2 > 0, a => a < 11),
            los: p('Vi löser ekvationen och låter $a$ stå kvar som ett tal:') + minus('2x + a', '11', 'a') + k('2x = 11 - a') + delat('2x', '11 - a', '2') + k('x = \\frac{11 - a}{2}') +
              p('Lösningen ska vara positiv:') + k('\\frac{11 - a}{2} > 0') + ganger('\\frac{11 - a}{2}', '0', '2', '>') + k('11 - a > 0') + plus('11 - a', '0', 'a', '>') + k('11 > a') +
              kt('$a = 5$ ger $2x + 5 = 11$ och $x = 3$, som är positivt.') + sv('$a < 11$') },
          { text: true, q: 'Vilka positiva heltal $x$ uppfyller olikheten $x^2 < 5x$? Förklara varför man får dividera båda led med $x$ här, men inte om $x$ kunde vara negativt.',
            svar: '1, 2, 3 och 4', test: () => [1, 2, 3, 4].every(x => x * x < 5 * x) && !(25 < 25) && !(36 < 30),
            los: p('Eftersom $x$ är positivt får vi dividera båda led med $x$ utan att vända tecknet:') + delat('x^2', '5x', 'x', '<') + k('x < 5') +
              p('De positiva heltalen som är mindre än 5 är 1, 2, 3 och 4. Kontroll: $x = 4$ ger $16 < 20$, men $x = 5$ ger $25 < 25$, falskt.') +
              p('Om $x$ vore negativt skulle divisionen med $x$ vända olikhetstecknet. Vet man inte tecknet på $x$ vet man alltså inte åt vilket håll tecknet ska stå, och då får man inte dividera.') + sv('1, 2, 3 och 4') },
        ],
      },
    ],
  },
];

const box = `  <div class="box boxgrid">
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>$<$ mindre än, $>$ större än, $\\leq$ mindre än eller lika med, $\\geq$ större än eller lika med. Tecknet gapar åt det större värdet.</li>
        <li>Olikheter löses som ekvationer, med samma operation i båda led.</li>
        <li><b>Olikhetstecknet vänds</b> när båda led multipliceras eller divideras med ett negativt tal.</li>
        <li>Andra graden: lös gränsfallet ($x^2 = 9$ ger $x = \\pm 3$) och pröva sedan ett värde i varje del av tallinjen.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: lös $-3x + 4 \\leq 19$</p>
      $$-3x + 4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} \\leq 19 \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} \\quad\\text{ger}\\quad -3x \\leq 15$$
      <p>Division med $-3$, så tecknet vänds:</p>
      $$\\frac{-3x}{\\boldsymbol{-3}} \\geq \\frac{15}{\\boldsymbol{-3}} \\quad\\text{ger}\\quad x \\geq -5$$
      <p>Kontroll: $x = 0$ ger $4 \\leq 19$, sant, och $0 \\geq -5$.</p>
    </div>
  </div>`;

S.byggSida({
  fil: 'ovningsblad-olikheter.html',
  titel: 'Olikheter',
  under: 'Olikhetstecken, lösning av olikheter och olikheter av andra graden',
  beskrivning: 'uppgifter om olikheter i Matematik nivå 1c på tre nivåer: olikhetstecknen, när tecknet ska vändas, parenteser och nämnare, olikheter av andra graden och textuppgifter. Med svar och lösningsförslag. Utskriftsklart.',
  box,
  nivaText: '<b>Grund</b> tränar tecknen och en operation i taget. <b>Mellan</b> har parenteser, nämnare, olikheter av andra graden och textuppgifter. <b>Avancerad</b> kräver flera steg, dubbla olikheter och resonemang.',
  kalkylator: 'Räkna utan räknare.',
  NIVAER,
});
