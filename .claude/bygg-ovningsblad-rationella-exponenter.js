// Bygger övningsbladet "Rationella exponenter" (Matematik nivå 1c, ma1c-1.8)
// på tre nivåer: Grund, Mellan och Avancerad. Beteckningarna följer
// genomgången: a^{1/n} = n:te roten ur a och a^{m/n} = (n:te roten ur a)^m.
// Potenser skrivs om ett steg i taget (negativ exponent → bråk → rot), och
// varje svar kontrolleras numeriskt i test().
//
//   node .claude/bygg-ovningsblad-rationella-exponenter.js
'use strict';
const S = require('./ovningsblad-sida.js');
const { k, p, sv, kt, del, minus, plus, delat, upph, nara } = S;

const X = [0.7, 1.3, 2, 5.5];
const allaX = (f, g) => X.every(x => nara(f(x), g(x)));
const samma = 'Båda led är nu potenser med samma bas. Då måste exponenterna vara lika:';

const NIVAER = [
  {
    namn: 'Grund', under: 'Från exponent till rot och tillbaka, och beräkningar utan räknare',
    delar: [
      {
        rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'kort',
        upg: [
          { q: '36^{1/2}', svar: '6', test: () => nara(36 ** 0.5, 6),
            los: p('Exponenten $\\dfrac{1}{2}$ betyder kvadratroten:') + k('36^{1/2} = \\sqrt{36} = 6') + sv('6') },
          { q: '64^{1/3}', svar: '4', test: () => nara(64 ** (1 / 3), 4),
            los: p('Exponenten $\\dfrac{1}{3}$ betyder tredjeroten:') + k('64^{1/3} = \\sqrt[3]{64} = 4') + p('eftersom $4 \\cdot 4 \\cdot 4 = 64$.') + sv('4') },
          { q: '81^{1/4}', svar: '3', test: () => nara(81 ** 0.25, 3),
            los: k('81^{1/4} = \\sqrt[4]{81} = 3') + p('eftersom $3^4 = 81$.') + sv('3') },
          { q: '100^{1/2}', svar: '10', test: () => nara(100 ** 0.5, 10),
            los: k('100^{1/2} = \\sqrt{100} = 10') + sv('10') },
          { q: '1\\,000^{1/3}', svar: '10', test: () => nara(1000 ** (1 / 3), 10),
            los: k('1\\,000^{1/3} = \\sqrt[3]{1\\,000} = 10') + p('eftersom $10^3 = 1\\,000$.') + sv('10') },
          { q: '32^{1/5}', svar: '2', test: () => nara(32 ** 0.2, 2),
            los: k('32^{1/5} = \\sqrt[5]{32} = 2') + p('eftersom $2^5 = 32$.') + sv('2') },
          { q: '2 \\cdot 16^{1/2}', svar: '8', test: () => nara(2 * 16 ** 0.5, 8),
            los: p('Potensen beräknas först, sedan multiplikationen:') + k('2 \\cdot 16^{1/2} = 2 \\cdot \\sqrt{16} = 2 \\cdot 4 = 8') + sv('8') },
          { q: '125^{1/3} + 9^{1/2}', svar: '8', test: () => nara(125 ** (1 / 3) + 9 ** 0.5, 8),
            los: k('125^{1/3} + 9^{1/2} = \\sqrt[3]{125} + \\sqrt{9} = 5 + 3 = 8') + sv('8') },
        ],
      },
      {
        rubrik: 'Skriv med rottecken.', kol: 4, hojd: 'kort',
        upg: [
          { q: '7^{1/2}', svar: '$\\sqrt{7}$', test: () => nara(7 ** 0.5, Math.sqrt(7)),
            los: k('7^{1/2} = \\sqrt{7}') + sv('$\\sqrt{7}$') },
          { q: 'x^{1/3}', svar: '$\\sqrt[3]{x}$', test: () => allaX(x => x ** (1 / 3), Math.cbrt),
            los: k('x^{1/3} = \\sqrt[3]{x}') + sv('$\\sqrt[3]{x}$') },
          { q: '5^{1/4}', svar: '$\\sqrt[4]{5}$', test: () => nara(5 ** 0.25, Math.sqrt(Math.sqrt(5))),
            los: k('5^{1/4} = \\sqrt[4]{5}') + sv('$\\sqrt[4]{5}$') },
          { q: 'a^{2/3}', svar: '$\\sqrt[3]{a^2}$', test: () => allaX(a => a ** (2 / 3), a => Math.cbrt(a * a)),
            los: p('Nämnaren 3 är rotens ordning och täljaren 2 är exponenten:') + k('a^{2/3} = \\sqrt[3]{a^2}') + p('Det kan också skrivas $\\left(\\sqrt[3]{a}\\right)^2$.') + sv('$\\sqrt[3]{a^2}$') },
        ],
      },
      {
        rubrik: 'Skriv som en potens.', kol: 4, hojd: 'kort',
        upg: [
          { q: '\\sqrt{x}', svar: '$x^{1/2}$', test: () => allaX(Math.sqrt, x => x ** 0.5),
            los: k('\\sqrt{x} = x^{1/2}') + sv('$x^{1/2}$') },
          { q: '\\sqrt[3]{10}', svar: '$10^{1/3}$', test: () => nara(Math.cbrt(10), 10 ** (1 / 3)),
            los: k('\\sqrt[3]{10} = 10^{1/3}') + sv('$10^{1/3}$') },
          { q: '\\sqrt[5]{a}', svar: '$a^{1/5}$', test: () => allaX(a => Math.pow(a, 1 / 5), a => a ** 0.2),
            los: k('\\sqrt[5]{a} = a^{1/5}') + sv('$a^{1/5}$') },
          { q: '\\sqrt{x^3}', svar: '$x^{3/2}$', test: () => allaX(x => Math.sqrt(x ** 3), x => x ** 1.5),
            los: p('Roten är en exponent $\\dfrac{1}{2}$, och potens av potens ger produkten av exponenterna:') + k('\\sqrt{x^3} = \\left(x^3\\right)^{1/2} = x^{3 \\cdot \\frac{1}{2}} = x^{3/2}') + sv('$x^{3/2}$') },
        ],
      },
      {
        rubrik: 'Beräkna utan räknare. Ta roten först.', kol: 4, hojd: 'kort',
        upg: [
          { q: '8^{2/3}', svar: '4', test: () => nara(8 ** (2 / 3), 4),
            los: k('8^{2/3} = \\left(8^{1/3}\\right)^2 = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4') + sv('4') },
          { q: '16^{3/4}', svar: '8', test: () => nara(16 ** 0.75, 8),
            los: k('16^{3/4} = \\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8') + sv('8') },
          { q: '25^{3/2}', svar: '125', test: () => nara(25 ** 1.5, 125),
            los: k('25^{3/2} = \\left(\\sqrt{25}\\right)^3 = 5^3 = 125') + p('Att ta roten först ger små tal. Annars hade vi behövt $\\sqrt{25^3} = \\sqrt{15\\,625}$.') + sv('125') },
          { q: '4^{5/2}', svar: '32', test: () => nara(4 ** 2.5, 32),
            los: k('4^{5/2} = \\left(\\sqrt{4}\\right)^5 = 2^5 = 32') + sv('32') },
        ],
      },
    ],
  },
  {
    namn: 'Mellan', under: 'Negativa bråkexponenter, bråk som bas, potenslagarna och enkla ekvationer',
    delar: [
      {
        rubrik: 'Beräkna utan räknare.', kol: 4, hojd: 'mellan',
        upg: [
          { q: '9^{-1/2}', svar: '$\\dfrac{1}{3}$', test: () => nara(9 ** -0.5, 1 / 3),
            los: p('Minustecknet betyder "1 delat med", och $\\dfrac{1}{2}$ betyder kvadratroten. Ett steg i taget:') + k('9^{-1/2} = \\frac{1}{9^{1/2}} = \\frac{1}{\\sqrt{9}} = \\frac{1}{3}') + sv('$\\dfrac{1}{3}$') },
          { q: '8^{-2/3}', svar: '$\\dfrac{1}{4}$', test: () => nara(8 ** (-2 / 3), 1 / 4),
            los: k('8^{-2/3} = \\frac{1}{8^{2/3}} = \\frac{1}{\\left(\\sqrt[3]{8}\\right)^2} = \\frac{1}{2^2} = \\frac{1}{4}') + sv('$\\dfrac{1}{4}$') },
          { q: '\\left(\\dfrac{1}{4}\\right)^{1/2}', svar: '$\\dfrac{1}{2}$', test: () => nara(0.25 ** 0.5, 0.5),
            los: p('Roten ur ett bråk är roten ur täljaren delad med roten ur nämnaren:') + k('\\left(\\frac{1}{4}\\right)^{1/2} = \\frac{\\sqrt{1}}{\\sqrt{4}} = \\frac{1}{2}') + sv('$\\dfrac{1}{2}$') },
          { q: '\\left(\\dfrac{8}{27}\\right)^{1/3}', svar: '$\\dfrac{2}{3}$', test: () => nara((8 / 27) ** (1 / 3), 2 / 3),
            los: k('\\left(\\frac{8}{27}\\right)^{1/3} = \\frac{\\sqrt[3]{8}}{\\sqrt[3]{27}} = \\frac{2}{3}') + sv('$\\dfrac{2}{3}$') },
          { q: '\\left(\\dfrac{1}{16}\\right)^{-1/4}', svar: '2', test: () => nara((1 / 16) ** -0.25, 2),
            los: p('Den negativa exponenten inverterar bråket:') + k('\\left(\\frac{1}{16}\\right)^{-1/4} = 16^{1/4} = \\sqrt[4]{16} = 2') + sv('2') },
          { q: '0{,}01^{1/2}', svar: '0,1', test: () => nara(0.01 ** 0.5, 0.1),
            los: k('0{,}01^{1/2} = \\sqrt{0{,}01} = 0{,}1') + p('eftersom $0{,}1 \\cdot 0{,}1 = 0{,}01$.') + sv('0,1') },
          { q: '2^{1/2} \\cdot 8^{1/2}', svar: '4', test: () => nara(2 ** 0.5 * 8 ** 0.5, 4),
            los: p('Samma exponent, så baserna kan multipliceras först: $(ab)^x = a^x b^x$ baklänges.') + k('2^{1/2} \\cdot 8^{1/2} = (2 \\cdot 8)^{1/2} = 16^{1/2} = 4') + sv('4') },
          { q: '\\dfrac{5^{3/2}}{5^{1/2}}', svar: '5', test: () => nara(5 ** 1.5 / 5 ** 0.5, 5),
            los: k('\\frac{5^{3/2}}{5^{1/2}} = 5^{\\frac{3}{2} - \\frac{1}{2}} = 5^{2/2} = 5^1 = 5') + sv('5') },
        ],
      },
      {
        rubrik: 'Skriv som en enda potens av x.', kol: 4, hojd: 'kort',
        upg: [
          { q: 'x^{1/2} \\cdot x^{1/2}', svar: '$x$', test: () => allaX(x => x ** 0.5 * x ** 0.5, x => x),
            los: k('x^{1/2} \\cdot x^{1/2} = x^{\\frac{1}{2} + \\frac{1}{2}} = x^1 = x') + p('Det är samma sak som $\\sqrt{x} \\cdot \\sqrt{x} = x$.') + sv('$x$') },
          { q: 'x^{3/2} \\cdot x^{1/2}', svar: '$x^2$', test: () => allaX(x => x ** 1.5 * x ** 0.5, x => x * x),
            los: k('x^{3/2} \\cdot x^{1/2} = x^{\\frac{3}{2} + \\frac{1}{2}} = x^{4/2} = x^2') + sv('$x^2$') },
          { q: '\\dfrac{x^{5/3}}{x^{2/3}}', svar: '$x$', test: () => allaX(x => x ** (5 / 3) / x ** (2 / 3), x => x),
            los: k('\\frac{x^{5/3}}{x^{2/3}} = x^{\\frac{5}{3} - \\frac{2}{3}} = x^{3/3} = x') + sv('$x$') },
          { q: '\\left(x^{1/3}\\right)^6', svar: '$x^2$', test: () => allaX(x => (x ** (1 / 3)) ** 6, x => x * x),
            los: k('\\left(x^{1/3}\\right)^6 = x^{\\frac{1}{3} \\cdot 6} = x^2') + sv('$x^2$') },
          { q: '\\left(x^4\\right)^{3/4}', svar: '$x^3$', test: () => allaX(x => (x ** 4) ** 0.75, x => x ** 3),
            los: k('\\left(x^4\\right)^{3/4} = x^{4 \\cdot \\frac{3}{4}} = x^3') + sv('$x^3$') },
          { q: '\\sqrt{x} \\cdot x', svar: '$x^{3/2}$', test: () => allaX(x => Math.sqrt(x) * x, x => x ** 1.5),
            los: p('Skriv roten som potens och $x$ som $x^1$:') + k('\\sqrt{x} \\cdot x = x^{1/2} \\cdot x^1 = x^{\\frac{1}{2} + \\frac{2}{2}} = x^{3/2}') + sv('$x^{3/2}$') },
          { q: '\\dfrac{x^{1/2}}{x^2}', svar: '$x^{-3/2}$', test: () => allaX(x => x ** 0.5 / x ** 2, x => x ** -1.5),
            los: k('\\frac{x^{1/2}}{x^2} = x^{\\frac{1}{2} - \\frac{4}{2}} = x^{-3/2}') + p('Samma sak kan skrivas $\\dfrac{1}{x^{3/2}}$.') + sv('$x^{-3/2}$') },
          { q: '\\sqrt[3]{x} \\cdot \\sqrt[3]{x^2}', svar: '$x$', test: () => allaX(x => Math.cbrt(x) * Math.cbrt(x * x), x => x),
            los: k('\\sqrt[3]{x} \\cdot \\sqrt[3]{x^2} = x^{1/3} \\cdot x^{2/3} = x^{\\frac{1}{3} + \\frac{2}{3}} = x^1 = x') + sv('$x$') },
        ],
      },
      {
        rubrik: 'Lös ekvationerna, där $x > 0$.', kol: 3, hojd: 'mellan',
        upg: [
          { q: 'x^{1/2} = 6', svar: '$x = 36$', test: () => nara(36 ** 0.5, 6),
            los: p('Vi upphöjer båda led till 2, så att exponenten blir $\\dfrac{1}{2} \\cdot 2 = 1$:') + upph('x^{1/2}', '6', '2') + k('x = 36') + sv('$x = 36$') },
          { q: 'x^{1/3} = 2', svar: '$x = 8$', test: () => nara(8 ** (1 / 3), 2),
            los: upph('x^{1/3}', '2', '3') + k('x = 8') + sv('$x = 8$') },
          { q: 'x^{1/2} + 3 = 7', svar: '$x = 16$', test: () => nara(16 ** 0.5 + 3, 7),
            los: minus('x^{1/2} + 3', '7', '3') + k('x^{1/2} = 4') + upph('x^{1/2}', '4', '2') + k('x = 16') + sv('$x = 16$') },
          { q: '2x^{1/3} = 10', svar: '$x = 125$', test: () => nara(2 * 125 ** (1 / 3), 10),
            los: delat('2x^{1/3}', '10', '2') + k('x^{1/3} = 5') + upph('x^{1/3}', '5', '3') + k('x = 125') + sv('$x = 125$') },
          { q: 'x^{3/2} = 8', svar: '$x = 4$', test: () => nara(4 ** 1.5, 8),
            los: p('Vi upphöjer båda led till det inverterade bråket $\\dfrac{2}{3}$, så att exponenten blir $\\dfrac{3}{2} \\cdot \\dfrac{2}{3} = 1$:') + upph('x^{3/2}', '8', '2/3') +
              k('x = 8^{2/3} = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4') + kt('$4^{3/2} = \\left(\\sqrt{4}\\right)^3 = 2^3 = 8$.') + sv('$x = 4$') },
          { q: 'x^{2/3} = 9', svar: '$x = 27$', test: () => nara(27 ** (2 / 3), 9),
            los: upph('x^{2/3}', '9', '3/2') + k('x = 9^{3/2} = \\left(\\sqrt{9}\\right)^3 = 3^3 = 27') + kt('$27^{2/3} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9$.') + sv('$x = 27$') },
        ],
      },
      {
        rubrik: 'Resonera och förklara.', kol: 1, hojd: 'mellan',
        upg: [
          { text: true, q: 'Förklara med hjälp av potenslagarna varför $16^{1/2}$ måste vara lika med $\\sqrt{16}$.',
            svar: 'Båda i kvadrat ger 16', test: () => nara((16 ** 0.5) ** 2, 16),
            los: p('Vi upphöjer $16^{1/2}$ till 2 och använder lagen om potens av potens:') + k('\\left(16^{1/2}\\right)^2 = 16^{\\frac{1}{2} \\cdot 2} = 16^1 = 16') +
              p('Talet $16^{1/2}$ är alltså ett positivt tal som blir 16 när det multipliceras med sig självt. Det är precis vad $\\sqrt{16}$ betyder, så $16^{1/2} = \\sqrt{16} = 4$.') + sv('$16^{1/2}$ i kvadrat blir 16, och det är definitionen av $\\sqrt{16}$.') },
          { text: true, q: 'Ordna talen i storleksordning, med det minsta först:&emsp;$8^{2/3}$,&ensp;$27^{1/3}$,&ensp;$32^{3/5}$,&ensp;$4^{-1/2}$',
            svar: '$4^{-1/2},\\ 27^{1/3},\\ 8^{2/3},\\ 32^{3/5}$', test: () => { const v = [4 ** -0.5, 27 ** (1 / 3), 8 ** (2 / 3), 32 ** 0.6]; return v.every((x, i) => i === 0 || v[i - 1] < x - 1e-9); },
            los: p('Vi beräknar varje tal för sig:') +
              k('8^{2/3} = \\left(\\sqrt[3]{8}\\right)^2 = 4 \\qquad 27^{1/3} = \\sqrt[3]{27} = 3') +
              k('32^{3/5} = \\left(\\sqrt[5]{32}\\right)^3 = 2^3 = 8 \\qquad 4^{-1/2} = \\frac{1}{\\sqrt{4}} = \\frac{1}{2}') +
              sv('$4^{-1/2},\\ 27^{1/3},\\ 8^{2/3},\\ 32^{3/5}$') },
        ],
      },
    ],
  },
  {
    namn: 'Avancerad', under: 'Flera lagar i samma uttryck, exponentialekvationer med rötter och generella resonemang',
    delar: [
      {
        rubrik: 'Beräkna eller förenkla så långt som möjligt.', kol: 2, hojd: 'mellan',
        upg: [
          { q: '4^{3/2} - 27^{2/3} + 32^{-1/5}', svar: '$-\\dfrac{1}{2}$', test: () => nara(4 ** 1.5 - 27 ** (2 / 3) + 32 ** -0.2, -0.5),
            los: p('Vi beräknar varje potens för sig:') + k('4^{3/2} = \\left(\\sqrt{4}\\right)^3 = 2^3 = 8') + k('27^{2/3} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9') +
              k('32^{-1/5} = \\frac{1}{32^{1/5}} = \\frac{1}{\\sqrt[5]{32}} = \\frac{1}{2}') + k('8 - 9 + \\frac{1}{2} = -\\frac{1}{2}') + sv('$-\\dfrac{1}{2}$') },
          { q: '\\dfrac{\\sqrt{x} \\cdot \\sqrt[3]{x}}{\\sqrt[6]{x}}', svar: '$x^{2/3} = \\sqrt[3]{x^2}$', test: () => allaX(x => Math.sqrt(x) * Math.cbrt(x) / x ** (1 / 6), x => x ** (2 / 3)),
            los: p('Alla rötter skrivs som potenser, och exponenterna får den gemensamma nämnaren 6:') +
              k('\\frac{x^{1/2} \\cdot x^{1/3}}{x^{1/6}} = x^{\\frac{3}{6} + \\frac{2}{6} - \\frac{1}{6}} = x^{4/6} = x^{2/3}') + sv('$x^{2/3}$, alltså $\\sqrt[3]{x^2}$') },
          { q: '\\left(x^{2/3} y^{-1/2}\\right)^6 \\cdot y^3', svar: '$x^4$', test: () => [[1.3, 2], [2, 0.7]].every(([x, y]) => nara((x ** (2 / 3) * y ** -0.5) ** 6 * y ** 3, x ** 4)),
            los: p('Båda faktorerna i parentesen upphöjs till 6:') + k('\\left(x^{2/3}\\right)^6 \\cdot \\left(y^{-1/2}\\right)^6 = x^{4} y^{-3}') +
              k('x^4 y^{-3} \\cdot y^3 = x^4 y^{-3+3} = x^4 y^0 = x^4') + sv('$x^4$') },
          { q: '\\dfrac{\\sqrt{x^3}}{\\sqrt[4]{x}}', svar: '$x^{5/4}$', test: () => allaX(x => Math.sqrt(x ** 3) / x ** 0.25, x => x ** 1.25),
            los: k('\\frac{\\sqrt{x^3}}{\\sqrt[4]{x}} = \\frac{x^{3/2}}{x^{1/4}} = x^{\\frac{6}{4} - \\frac{1}{4}} = x^{5/4}') + sv('$x^{5/4}$') },
          { q: '8^{n/3} \\cdot 2^{-n}', svar: '1', test: () => [0, 1, 2, -3, 0.5].every(n => nara(8 ** (n / 3) * 2 ** -n, 1)),
            los: p('Vi skriver $8 = 2^3$:') + k('8^{n/3} = \\left(2^3\\right)^{n/3} = 2^{3 \\cdot \\frac{n}{3}} = 2^n') + k('2^n \\cdot 2^{-n} = 2^{n - n} = 2^0 = 1') +
              p('Svaret är 1 vilket tal $n$ än är.') + sv('1') },
          { q: '\\left(\\dfrac{27}{64}\\right)^{-2/3}', svar: '$\\dfrac{16}{9}$', test: () => nara((27 / 64) ** (-2 / 3), 16 / 9),
            los: p('Den negativa exponenten inverterar bråket, sedan tar vi tredjeroten och kvadrerar:') +
              k('\\left(\\frac{27}{64}\\right)^{-2/3} = \\left(\\frac{64}{27}\\right)^{2/3}') + k('= \\left(\\frac{\\sqrt[3]{64}}{\\sqrt[3]{27}}\\right)^2 = \\left(\\frac{4}{3}\\right)^2 = \\frac{16}{9}') + sv('$\\dfrac{16}{9}$') },
        ],
      },
      {
        rubrik: 'Lös ekvationerna.', kol: 3, hojd: 'hog',
        upg: [
          { q: '4^x = 8', svar: '$x = \\dfrac{3}{2}$', test: () => nara(4 ** 1.5, 8),
            los: p('Båda baserna är potenser av 2, $4 = 2^2$ och $8 = 2^3$:') + k('\\left(2^2\\right)^x = 2^3') + k('2^{2x} = 2^3') + p(samma) + k('2x = 3') + delat('2x', '3', '2') + k('x = \\frac{3}{2}') +
              kt('$4^{3/2} = \\left(\\sqrt{4}\\right)^3 = 8$.') + sv('$x = \\dfrac{3}{2}$') },
          { q: '9^x = \\dfrac{1}{3}', svar: '$x = -\\dfrac{1}{2}$', test: () => nara(9 ** -0.5, 1 / 3),
            los: p('$9 = 3^2$ och $\\dfrac{1}{3} = 3^{-1}$:') + k('3^{2x} = 3^{-1}') + p(samma) + k('2x = -1') + delat('2x', '-1', '2') + k('x = -\\frac{1}{2}') + sv('$x = -\\dfrac{1}{2}$') },
          { q: '27^x = \\sqrt{3}', svar: '$x = \\dfrac{1}{6}$', test: () => nara(27 ** (1 / 6), Math.sqrt(3)),
            los: p('$27 = 3^3$ och $\\sqrt{3} = 3^{1/2}$:') + k('\\left(3^3\\right)^x = 3^{1/2}') + k('3^{3x} = 3^{1/2}') + p(samma) + k('3x = \\frac{1}{2}') + delat('3x', '\\frac{1}{2}', '3') + k('x = \\frac{1}{6}') + sv('$x = \\dfrac{1}{6}$') },
          { q: '2^x = \\sqrt[3]{16}', svar: '$x = \\dfrac{4}{3}$', test: () => nara(2 ** (4 / 3), Math.cbrt(16)),
            los: p('$16 = 2^4$, och tredjeroten är exponenten $\\dfrac{1}{3}$:') + k('\\sqrt[3]{16} = \\left(2^4\\right)^{1/3} = 2^{4/3}') + k('2^x = 2^{4/3}') + p(samma) + k('x = \\frac{4}{3}') + sv('$x = \\dfrac{4}{3}$') },
          { q: 'x^{-1/2} = \\dfrac{1}{5}', svar: '$x = 25$', test: () => nara(25 ** -0.5, 1 / 5),
            los: p('Ett steg i taget. Vi upphöjer först båda led till $-1$ för att bli av med minustecknet:') + upph('x^{-1/2}', '\\frac{1}{5}', '-1') + k('x^{1/2} = 5') +
              p('Sedan upphöjer vi båda led till 2:') + upph('x^{1/2}', '5', '2') + k('x = 25') + kt('$25^{-1/2} = \\dfrac{1}{\\sqrt{25}} = \\dfrac{1}{5}$.') + sv('$x = 25$') },
          { q: 'x^{3/4} = 27, \\ x > 0', svar: '$x = 81$', test: () => nara(81 ** 0.75, 27),
            los: upph('x^{3/4}', '27', '4/3') + k('x = 27^{4/3} = \\left(\\sqrt[3]{27}\\right)^4 = 3^4 = 81') + kt('$81^{3/4} = \\left(\\sqrt[4]{81}\\right)^3 = 3^3 = 27$.') + sv('$x = 81$') },
        ],
      },
      {
        rubrik: 'Visa och motivera.', kol: 1, hojd: 'mellan',
        upg: [
          { text: true, q: 'Visa utan räknare att $2^{1/2} \\cdot 2^{1/3} \\cdot 2^{1/6} = 2$.',
            svar: 'Exponenternas summa är 1', test: () => nara(2 ** 0.5 * 2 ** (1 / 3) * 2 ** (1 / 6), 2),
            los: p('Samma bas, så exponenterna adderas. Med den gemensamma nämnaren 6:') + k('\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6} = \\frac{6}{6} = 1') +
              k('2^{1/2} \\cdot 2^{1/3} \\cdot 2^{1/6} = 2^1 = 2') + sv('Exponenterna har summan 1, så produkten är $2^1 = 2$.') },
          { text: true, q: 'Förklara varför $(-8)^{1/3}$ är ett reellt tal, men inte $(-8)^{1/2}$.',
            svar: '$(-8)^{1/3} = -2$; inget reellt tal i kvadrat är negativt', test: () => (-2) ** 3 === -8,
            los: p('$(-8)^{1/3} = \\sqrt[3]{-8}$ är det tal som multiplicerat med sig självt tre gånger blir $-8$. Det talet finns:') + k('(-2) \\cdot (-2) \\cdot (-2) = -8') +
              p('$(-8)^{1/2} = \\sqrt{-8}$ skulle vara ett tal som multiplicerat med sig självt blir $-8$. Men ett tal i kvadrat är aldrig negativt: positivt gånger positivt och negativt gånger negativt blir båda positivt. Därför finns inget sådant reellt tal.') +
              sv('$(-8)^{1/3} = -2$, men inget reellt tal i kvadrat blir $-8$.') },
          { text: true, q: 'Vilket tal är störst, $2^{1/2}$ eller $3^{1/3}$? Motivera utan räknare. Tips: upphöj båda talen till 6.',
            svar: '$3^{1/3}$', test: () => 3 ** (1 / 3) > 2 ** 0.5,
            los: p('Båda talen är positiva, och för positiva tal gäller att det större talet också har den större sjätte potensen. Vi upphöjer båda till 6:') +
              k('\\left(2^{1/2}\\right)^6 = 2^{3} = 8 \\qquad \\left(3^{1/3}\\right)^6 = 3^{2} = 9') +
              p('Eftersom $9 > 8$ är $3^{1/3}$ störst. Talet 6 valdes för att det är minsta gemensamma nämnare till $\\dfrac{1}{2}$ och $\\dfrac{1}{3}$: då blir båda exponenterna heltal.') + sv('$3^{1/3}$ är störst.') },
        ],
      },
    ],
  },
];

const box = `  <div class="box boxgrid">
    <div>
      <p class="rub">Kom ihåg</p>
      <ul>
        <li>$a^{1/n} = \\sqrt[n]{a}$, så $25^{1/2} = \\sqrt{25} = 5$ och $27^{1/3} = \\sqrt[3]{27} = 3$.</li>
        <li>$a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$. <b>Nämnaren</b> är rotens ordning, <b>täljaren</b> är exponenten.</li>
        <li>$a^{-x} = \\dfrac{1}{a^x}$, och alla potenslagar gäller som vanligt, även med bråk i exponenten.</li>
        <li>Lös $x^{m/n} = b$ genom att upphöja båda led till $\\dfrac{n}{m}$.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: beräkna $16^{3/4}$ och lös $x^{2/3} = 4$, $x > 0$</p>
      $$16^{3/4} = \\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8$$
      <p>Upphöj båda led till $\\dfrac{3}{2}$, så att exponenten blir $\\dfrac{2}{3} \\cdot \\dfrac{3}{2} = 1$:</p>
      $$\\left(x^{2/3}\\right)^{\\boldsymbol{3/2}} = 4^{\\boldsymbol{3/2}} \\quad\\text{ger}\\quad x = \\left(\\sqrt{4}\\right)^3 = 8$$
    </div>
  </div>`;

S.byggSida({
  fil: 'ovningsblad-rationella-exponenter.html',
  titel: 'Rationella exponenter',
  under: 'Bråk i exponenten, rötter och potenslagarna',
  beskrivning: 'uppgifter om rationella exponenter i Matematik nivå 1c på tre nivåer: från exponent till rot, negativa bråkexponenter, potenslagarna och ekvationer. Med svar och lösningsförslag. Utskriftsklart.',
  box,
  nivaText: '<b>Grund</b> översätter mellan exponent och rot och beräknar en potens i taget. <b>Mellan</b> har negativa exponenter, bråk som bas, potenslagarna och enkla ekvationer. <b>Avancerad</b> kombinerar flera lagar och kräver resonemang.',
  kalkylator: 'Räkna utan räknare.',
  NIVAER,
});
