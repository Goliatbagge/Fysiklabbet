// Bygger övningsbladet "Problemlösning med ekvationer" (Matematik nivå 1c,
// ma1c-2.8) på tre nivåer: Grund, Mellan och Avancerad. Lösningsförslagen
// följer genomgångens tre steg (Översätt, Lös ekvationen, Tolka och svara)
// och varje svar kontrolleras numeriskt i test().
//
//   node .claude/bygg-ovningsblad-problemlosning.js
//
// PDF: chrome --headless=new --no-pdf-header-footer --virtual-time-budget=10000
//   --print-to-pdf=ovningsblad/ovningsblad-problemlosning.pdf
//   http://localhost:8000/ovningsblad/ovningsblad-problemlosning.html
'use strict';
const S = require('./ovningsblad-sida.js');
const { k, p, sv, kt, minus, plus, delat, ganger, svg, lbl, nara, INK } = S;

const ov = (s) => p(`<b>1. Översätt.</b> ${s}`);
const lo = (s = '') => p(`<b>2. Lös ekvationen.</b> ${s}`);
const to = (s) => p(`<b>3. Tolka och svara.</b> ${s}`);

// Rektangel med bredden x och längden x + 5 (förhållandet 9 : 14 som i svaret).
const rektangel = svg(200, 122,
  `<rect x="40" y="12" width="130" height="84" fill="none" stroke="${INK}" stroke-width="2"/>` +
  `<text x="33" y="58" text-anchor="end">${lbl('x')}</text>` +
  `<text x="105" y="114" text-anchor="middle">${lbl('x + 5')}</text>`, 1.0);

// Hönsgård mot en vägg: staket på tre sidor, längden dubbla bredden.
const honsgard = (medX) => svg(230, 132,
  `<text x="115" y="17" text-anchor="middle" font-size="11">Vägg</text>` +
  `<line x1="20" y1="34" x2="210" y2="34" stroke="${INK}" stroke-width="2.5"/>` +
  Array.from({ length: 23 }, (_, i) => `<line x1="${22 + i * 8}" y1="34" x2="${28 + i * 8}" y2="26" stroke="${INK}" stroke-width="1"/>`).join('') +
  `<polyline points="45,34 45,104 185,104 185,34" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="7 3"/>` +
  `<text x="115" y="73" text-anchor="middle" font-size="11" fill="#5b6472">hönsgård</text>` +
  (medX
    ? `<text x="37" y="73" text-anchor="end">${lbl('x')}</text><text x="193" y="73">${lbl('x')}</text><text x="115" y="122" text-anchor="middle">${lbl('2x')}</text>`
    : `<text x="115" y="122" text-anchor="middle" font-size="11">staket (streckat)</text>`), 1.0);

const NIVAER = [
  {
    namn: 'Grund', under: 'Översätt texten till en ekvation, lös den och svara med enhet',
    delar: [
      {
        rubrik: 'Teckna en ekvation och lös den.', kol: 2, hojd: 'hog',
        upg: [
          { text: true, q: 'Ett tal multipliceras med 4, och sedan adderas 7. Resultatet blir 43. Vilket är talet?',
            svar: '9', test: () => 4 * 9 + 7 === 43,
            los: ov('Låt $x$ vara talet. ”Multipliceras med 4” ger $4x$ och ”sedan adderas 7” ger $4x + 7$:') + k('4x + 7 = 43') +
              lo() + minus('4x + 7', '43', '7') + k('4x = 36') + delat('4x', '36', '4') + k('x = 9') +
              to('Kontroll: $4 \\cdot 9 + 7 = 36 + 7 = 43$.') + sv('Talet är 9.') },
          { text: true, q: 'När man drar bort 12 från tre gånger ett tal får man 30. Vilket är talet?',
            svar: '14', test: () => 3 * 14 - 12 === 30,
            los: ov('Låt $x$ vara talet. Tre gånger talet är $3x$, och 12 dras bort från det:') + k('3x - 12 = 30') +
              lo() + plus('3x - 12', '30', '12') + k('3x = 42') + delat('3x', '42', '3') + k('x = 14') +
              to('Kontroll: $3 \\cdot 14 - 12 = 42 - 12 = 30$.') + sv('Talet är 14.') },
          { text: true, q: 'Summan av två tal är 50. Det ena talet är 8 större än det andra. Vilka är talen?',
            svar: '21 och 29', test: () => 21 + 29 === 50 && 29 - 21 === 8,
            los: ov('Låt $x$ vara det mindre talet. Det större är då $x + 8$, och summan är 50:') + k('x + (x + 8) = 50') +
              lo() + k('2x + 8 = 50') + minus('2x + 8', '50', '8') + k('2x = 42') + delat('2x', '42', '2') + k('x = 21') +
              to('Det mindre talet är 21 och det större $21 + 8 = 29$. Summan blir $21 + 29 = 50$.') + sv('21 och 29') },
          { text: true, q: 'Summan av tre heltal som följer direkt efter varandra är 72. Vilka är talen?',
            svar: '23, 24 och 25', test: () => 23 + 24 + 25 === 72,
            los: ov('Låt $x$ vara det minsta talet. Nästa heltal är $x + 1$ och nästa igen $x + 2$:') + k('x + (x + 1) + (x + 2) = 72') +
              lo() + k('3x + 3 = 72') + minus('3x + 3', '72', '3') + k('3x = 69') + delat('3x', '69', '3') + k('x = 23') +
              to('Talen är 23, 24 och 25, och $23 + 24 + 25 = 72$.') + sv('23, 24 och 25') },
        ],
      },
      {
        rubrik: 'Lös problemen. Skriv ut vad $x$ betyder, ställ upp en ekvation och svara med enhet.', kol: 2, hojd: 'xhog',
        upg: [
          { text: true, q: 'Lina är tre gånger så gammal som sin lillebror. Tillsammans är de 32 år. Hur gammal är Lina?',
            svar: '24 år', test: () => 8 + 3 * 8 === 32,
            los: ov('Låt $x$ vara lillebroderns ålder i år. Den minsta delen får heta $x$, så slipper vi bråk. Lina är då $3x$ år:') + k('x + 3x = 32') +
              lo() + k('4x = 32') + delat('4x', '32', '4') + k('x = 8') +
              to('$x$ var <b>lillebroderns</b> ålder, men frågan gällde Lina: $3 \\cdot 8 = 24$ år. Kontroll: $8 + 24 = 32$.') + sv('Lina är 24 år.') },
          { text: true, q: 'En biobiljett kostar 120 kr och en påse popcorn kostar 45 kr. Ett kompisgäng köper 4 biljetter och några påsar popcorn och betalar 750 kr. Hur många påsar popcorn köpte de?',
            svar: '6 påsar', test: () => 4 * 120 + 6 * 45 === 750,
            los: ov('Låt $x$ vara antalet påsar. Biljetterna kostar $4 \\cdot 120 = 480$ kr och påsarna $45x$ kr:') + k('480 + 45x = 750') +
              lo() + minus('480 + 45x', '750', '480') + k('45x = 270') + delat('45x', '270', '45') + k('x = 6') +
              to('Ett helt antal påsar, som det ska vara. Kontroll: $480 + 6 \\cdot 45 = 480 + 270 = 750$.') + sv('6 påsar') },
          { text: true, q: 'En rektangel är 5 cm längre än den är bred. Omkretsen är 46 cm. Hur långa är rektangelns sidor?',
            svar: '9 cm och 14 cm', test: () => 2 * 9 + 2 * 14 === 46 && 14 - 9 === 5,
            los: ov('Låt $x$ vara bredden i cm. Längden är då $x + 5$. Omkretsen är summan av alla fyra sidorna:') + rektangel +
              k('x + (x + 5) + x + (x + 5) = 46') +
              lo() + k('4x + 10 = 46') + minus('4x + 10', '46', '10') + k('4x = 36') + delat('4x', '36', '4') + k('x = 9') +
              to('Bredden är 9 cm och längden $9 + 5 = 14$ cm. Kontroll: $9 + 14 + 9 + 14 = 46$.') + sv('9 cm och 14 cm') },
          { text: true, q: 'En taxiresa kostar 45 kr i startavgift och 15 kr per kilometer. En resa kostade 330 kr. Hur lång var resan?',
            svar: '19 km', test: () => 45 + 15 * 19 === 330,
            los: ov('Låt $x$ vara resans längd i km. Kilometrarna kostar $15x$ kr, och startavgiften kommer till:') + k('45 + 15x = 330') +
              lo() + minus('45 + 15x', '330', '45') + k('15x = 285') + delat('15x', '285', '15') + k('x = 19') +
              to('Kontroll: $45 + 15 \\cdot 19 = 45 + 285 = 330$.') + sv('19 km') },
          { text: true, q: 'Ali, Bea och Cleo delar på 1 200 kr. Ali får 100 kr mer än Bea, och Cleo får dubbelt så mycket som Bea. Hur mycket får var och en?',
            svar: 'Bea 275 kr, Ali 375 kr, Cleo 550 kr', test: () => 275 + 375 + 550 === 1200,
            los: ov('Både Ali och Cleo beskrivs utifrån Bea, så Bea får heta $x$. Låt $x$ vara Beas belopp i kronor. Ali får $x + 100$ och Cleo $2x$:') +
              k('x + (x + 100) + 2x = 1\\,200') +
              lo() + k('4x + 100 = 1\\,200') + minus('4x + 100', '1\\,200', '100') + k('4x = 1\\,100') + delat('4x', '1\\,100', '4') + k('x = 275') +
              to('Bea får 275 kr, Ali $275 + 100 = 375$ kr och Cleo $2 \\cdot 275 = 550$ kr. Kontroll: $275 + 375 + 550 = 1\\,200$.') + sv('Bea 275 kr, Ali 375 kr och Cleo 550 kr') },
          { text: true, q: 'En bil kör med medelhastigheten 80 km/h. Hur lång tid tar det att köra 200 km?',
            svar: '2,5 h (2 h 30 min)', test: () => 80 * 2.5 === 200,
            los: ov('Låt $t$ vara tiden i timmar. Sträckan är hastigheten gånger tiden, $s = v \\cdot t$:') + k('80t = 200') +
              lo() + delat('80t', '200', '80') + k('t = 2{,}5') +
              to('Tiden är 2,5 timmar. En halv timme är 30 minuter, så det är 2 timmar och 30 minuter. Rimligt: 160 km tar 2 timmar, och 40 km till tar en halvtimme.') + sv('2,5 h, alltså 2 h 30 min') },
        ],
      },
    ],
  },
  {
    namn: 'Mellan', under: 'Parenteser, variabler i båda led, tid och sträcka, medelvärde och figurer',
    delar: [
      {
        rubrik: 'Lös problemen. Skriv ut vad $x$ betyder, ställ upp en ekvation och svara med enhet.', kol: 2, hojd: 'xhog',
        upg: [
          { text: true, q: 'Ett tal ökas med 6, och summan multipliceras med 3. Resultatet blir lika stort som när talet multipliceras med 5. Vilket är talet?',
            svar: '9', test: () => 3 * (9 + 6) === 5 * 9,
            los: ov('Låt $x$ vara talet. ”Ökas med 6” ger $x + 6$, och hela summan multipliceras med 3, så parentesen behövs:') + k('3(x + 6) = 5x') +
              lo() + k('3x + 18 = 5x') + minus('3x + 18', '5x', '3x') + k('18 = 2x') + delat('18', '2x', '2') + k('9 = x') +
              to('Kontroll: $3 \\cdot (9 + 6) = 45$ och $5 \\cdot 9 = 45$.') + sv('Talet är 9.') },
          { text: true, q: 'En mamma är 28 år äldre än sin dotter. Om 6 år är mamman tre gånger så gammal som dottern. Hur gammal är dottern nu?',
            svar: '8 år', test: () => (8 + 28 + 6) === 3 * (8 + 6),
            los: ov('Låt $x$ vara dotterns ålder nu. Mamman är $x + 28$ år nu. Om 6 år är dottern $x + 6$ och mamman $x + 28 + 6 = x + 34$:') + k('x + 34 = 3(x + 6)') +
              lo() + k('x + 34 = 3x + 18') + minus('x + 34', '3x + 18', 'x') + k('34 = 2x + 18') + minus('34', '2x + 18', '18') + k('16 = 2x') + delat('16', '2x', '2') + k('8 = x') +
              to('Dottern är 8 år och mamman 36 år. Om 6 år är de 14 och 42 år, och $3 \\cdot 14 = 42$.') + sv('Dottern är 8 år.') },
          { text: true, q: 'Ett gym har två sorters kort. Med kort A betalar man 300 kr i månaden och dessutom 20 kr per besök. Med kort B betalar man bara 50 kr per besök. Hur många besök i månaden ger samma kostnad? Vilket kort lönar sig om man tränar oftare än så?',
            svar: '10 besök; kort A', test: () => 300 + 20 * 10 === 50 * 10 && 300 + 20 * 15 < 50 * 15,
            los: ov('Låt $x$ vara antalet besök i månaden. Kort A kostar $300 + 20x$ kr och kort B $50x$ kr. Samma kostnad betyder att uttrycken är lika:') + k('300 + 20x = 50x') +
              lo() + minus('300 + 20x', '50x', '20x') + k('300 = 30x') + delat('300', '30x', '30') + k('10 = x') +
              to('Vid 10 besök kostar båda korten 500 kr. Med fler besök kostar varje extra besök 20 kr med kort A men 50 kr med kort B, så kort A blir billigare. Vid 15 besök: kort A kostar 600 kr och kort B 750 kr.') + sv('10 besök. Den som tränar oftare tjänar på kort A.') },
          { text: true, q: 'Elsa cyklar till skolan med medelhastigheten 15 km/h. Om hon åker moped i 30 km/h kommer hon fram 12 minuter snabbare. Hur långt är det till skolan?',
            svar: '6 km', test: () => nara(6 / 15 - 6 / 30, 12 / 60),
            los: ov('Låt $x$ vara avståndet i km. Tiden är sträckan delad med hastigheten, $t = \\dfrac{s}{v}$. Cykeltiden är $\\dfrac{x}{15}$ h och mopedtiden $\\dfrac{x}{30}$ h. Skillnaden är 12 minuter, som måste skrivas i timmar: $\\dfrac{12}{60} = \\dfrac{1}{5}$ h.') +
              k('\\frac{x}{15} - \\frac{x}{30} = \\frac{1}{5}') +
              lo('Minsta gemensamma nämnare är 30, så vi multiplicerar båda led med 30:') + ganger('\\left(\\frac{x}{15} - \\frac{x}{30}\\right)', '\\frac{1}{5}', '30') + k('2x - x = 6') + k('x = 6') +
              to('Cykeln tar $\\dfrac{6}{15}$ h $= 24$ min och mopeden $\\dfrac{6}{30}$ h $= 12$ min. Skillnaden är 12 minuter.') + sv('6 km') },
          { text: true, q: 'Ett rep som är 12 m långt delas i tre bitar. Den mellersta biten är dubbelt så lång som den kortaste, och den längsta är 1,5 m längre än den mellersta. Hur långa är bitarna?',
            svar: '2,1 m, 4,2 m och 5,7 m', test: () => nara(2.1 + 4.2 + 5.7, 12) && nara(5.7 - 4.2, 1.5),
            los: ov('Låt $x$ vara den kortaste bitens längd i meter. Den mellersta är $2x$ och den längsta $2x + 1{,}5$:') + k('x + 2x + (2x + 1{,}5) = 12') +
              lo() + k('5x + 1{,}5 = 12') + minus('5x + 1{,}5', '12', '1{,}5') + k('5x = 10{,}5') + delat('5x', '10{,}5', '5') + k('x = 2{,}1') +
              to('Bitarna är 2,1 m, $2 \\cdot 2{,}1 = 4{,}2$ m och $4{,}2 + 1{,}5 = 5{,}7$ m. Kontroll: $2{,}1 + 4{,}2 + 5{,}7 = 12$.') + sv('2,1 m, 4,2 m och 5,7 m') },
          { text: true, q: 'Ella har fått 14, 17 och 12 poäng på tre prov. Hur många poäng måste hon få på det fjärde provet för att medelvärdet ska bli 15 poäng?',
            svar: '17 poäng', test: () => (14 + 17 + 12 + 17) / 4 === 15,
            los: ov('Låt $x$ vara poängen på det fjärde provet. Medelvärdet är summan av alla poäng delad med antalet prov:') + k('\\frac{14 + 17 + 12 + x}{4} = 15') +
              lo() + k('\\frac{43 + x}{4} = 15') + ganger('\\frac{43 + x}{4}', '15', '4') + k('43 + x = 60') + minus('43 + x', '60', '43') + k('x = 17') +
              to('Kontroll: $\\dfrac{14 + 17 + 12 + 17}{4} = \\dfrac{60}{4} = 15$.') + sv('17 poäng') },
          { text: true, q: 'En rektangulär hönsgård ska byggas mot en vägg, så det behövs staket bara på tre sidor (se figuren). Sidan längs väggen ska vara dubbelt så lång som de andra sidorna. Det finns 36 m staket. Hur stor blir hönsgårdens area?',
            fig: honsgard(false), hojd: 'xhog',
            svar: '162 m<sup>2</sup>', test: () => 9 + 18 + 9 === 36 && 9 * 18 === 162,
            los: ov('Låt $x$ vara längden i meter på de två sidorna som går ut från väggen. Sidan längs väggen är då $2x$. Väggen behöver inget staket, så staketet är tre sidor:') + honsgard(true) +
              k('x + 2x + x = 36') +
              lo() + k('4x = 36') + delat('4x', '36', '4') + k('x = 9') +
              to('Sidorna är 9 m och $2 \\cdot 9 = 18$ m. Men frågan gällde arean: $9 \\cdot 18 = 162$ m². Kontroll av staketet: $9 + 18 + 9 = 36$ m.') + sv('162 m<sup>2</sup>') },
        ],
      },
    ],
  },
  {
    namn: 'Avancerad', under: 'Problem där $x$ inte är det som söks, flera samband och flera steg',
    delar: [
      {
        rubrik: 'Lös problemen. Skriv ut vad $x$ betyder, ställ upp en ekvation och svara med enhet.', kol: 2, hojd: 'xhog',
        upg: [
          { text: true, q: 'En bil kör från A till B med medelhastigheten 90 km/h och tillbaka samma väg med medelhastigheten 60 km/h. Vilken är medelhastigheten för hela resan? (Svaret är inte 75 km/h.)',
            svar: '72 km/h', test: () => nara(2 / (1 / 90 + 1 / 60), 72),
            los: ov('Sträckan står inte i uppgiften, men båda tiderna beror på den. Låt därför $x$ vara sträckan mellan A och B i km. Tiden är sträckan delad med hastigheten:') +
              k('\\text{tid dit} = \\frac{x}{90}\\ \\text{h} \\qquad \\text{tid hem} = \\frac{x}{60}\\ \\text{h}') +
              p('Medelhastigheten är hela sträckan, $2x$, delad med hela tiden:') +
              k('v = \\frac{2x}{\\dfrac{x}{90} + \\dfrac{x}{60}}') +
              lo('Vi skriver tiderna med den gemensamma nämnaren 180:') +
              k('\\frac{x}{90} + \\frac{x}{60} = \\frac{2x}{180} + \\frac{3x}{180} = \\frac{5x}{180} = \\frac{x}{36}') +
              k('v = \\frac{2x}{\\dfrac{x}{36}} = 2x \\cdot \\frac{36}{x} = 72') +
              to('Sträckan $x$ tog ut sig själv, så svaret gäller hur lång vägen än är. Svaret är lägre än 75 km/h eftersom bilen kör längre <b>tid</b> med den låga hastigheten. Kontroll med $x = 180$ km: 2 h dit och 3 h hem, 360 km på 5 h ger 72 km/h.') + sv('72 km/h') },
          { text: true, q: 'Hur många liter vatten ska man blanda i 2 liter saft med 40 % koncentrat för att andelen koncentrat ska bli 25 %?',
            svar: '1,2 liter', test: () => nara(0.4 * 2 / (2 + 1.2), 0.25),
            los: ov('Låt $x$ vara mängden vatten i liter. Koncentratet ändras inte när vatten tillsätts: det är $0{,}40 \\cdot 2 = 0{,}8$ liter före och efter. Hela mängden blir $2 + x$ liter, och koncentratet ska vara 25 % av den:') +
              k('\\frac{0{,}8}{2 + x} = 0{,}25') +
              lo() + ganger('\\frac{0{,}8}{2 + x}', '0{,}25', '(2 + x)') + k('0{,}8 = 0{,}5 + 0{,}25x') + minus('0{,}8', '0{,}5 + 0{,}25x', '0{,}5') + k('0{,}3 = 0{,}25x') + delat('0{,}3', '0{,}25x', '0{,}25') + k('1{,}2 = x') +
              to('Det blir $2 + 1{,}2 = 3{,}2$ liter, och $\\dfrac{0{,}8}{3{,}2} = 0{,}25 = 25\\ \\%$.') + sv('1,2 liter vatten') },
          { text: true, q: 'Anna klipper en gräsmatta på 3 timmar. Bo klipper samma gräsmatta på 6 timmar. Hur lång tid tar det om de klipper den tillsammans, med var sin gräsklippare?',
            svar: '2 h', test: () => nara(2 / 3 + 2 / 6, 1),
            los: ov('Låt $x$ vara tiden i timmar när de klipper tillsammans. Anna klipper $\\dfrac{1}{3}$ av gräsmattan per timme, så på $x$ timmar hinner hon $\\dfrac{x}{3}$ av den. Bo hinner $\\dfrac{x}{6}$. Tillsammans ska de klippa en hel gräsmatta:') +
              k('\\frac{x}{3} + \\frac{x}{6} = 1') +
              lo('Vi multiplicerar båda led med 6:') + ganger('\\left(\\frac{x}{3} + \\frac{x}{6}\\right)', '1', '6') + k('2x + x = 6') + k('3x = 6') + delat('3x', '6', '3') + k('x = 2') +
              to('Två personer ska gå fortare än Anna ensam (3 h), så 2 h är rimligt. På 2 h klipper Anna $\\dfrac{2}{3}$ och Bo $\\dfrac{2}{6} = \\dfrac{1}{3}$, tillsammans hela gräsmattan.') + sv('2 timmar') },
          { text: true, q: 'För 5 år sedan var Pia fyra gånger så gammal som Theo. Om 5 år är hon dubbelt så gammal som Theo. Hur gamla är de nu?',
            svar: 'Pia 25 år, Theo 10 år', test: () => (25 - 5) === 4 * (10 - 5) && (25 + 5) === 2 * (10 + 5),
            los: ov('Låt $x$ vara Theos ålder nu. För 5 år sedan var Theo $x - 5$ och Pia fyra gånger så gammal, $4(x - 5) = 4x - 20$. Pia är alltså $4x - 20 + 5 = 4x - 15$ år nu.') +
              p('Om 5 år är Theo $x + 5$ och Pia $4x - 15 + 5 = 4x - 10$. Då är hon dubbelt så gammal som Theo:') + k('4x - 10 = 2(x + 5)') +
              lo() + k('4x - 10 = 2x + 10') + minus('4x - 10', '2x + 10', '2x') + k('2x - 10 = 10') + plus('2x - 10', '10', '10') + k('2x = 20') + delat('2x', '20', '2') + k('x = 10') +
              to('Theo är 10 år och Pia $4 \\cdot 10 - 15 = 25$ år. För 5 år sedan: 20 och 5 år, och $20 = 4 \\cdot 5$. Om 5 år: 30 och 15 år, och $30 = 2 \\cdot 15$.') + sv('Pia är 25 år och Theo 10 år.') },
          { text: true, q: 'I ett tvåsiffrigt tal är tiotalssiffran 3 större än entalssiffran, och siffrornas summa är 11. Vilket är talet? Vad händer med talet om siffrorna byter plats?',
            svar: '74; det minskar med 27', test: () => 7 + 4 === 11 && 7 - 4 === 3 && 74 - 47 === 27,
            los: ov('Låt $x$ vara entalssiffran. Tiotalssiffran är då $x + 3$, och summan av siffrorna är 11:') + k('x + (x + 3) = 11') +
              lo() + k('2x + 3 = 11') + minus('2x + 3', '11', '3') + k('2x = 8') + delat('2x', '8', '2') + k('x = 4') +
              to('Entalssiffran är 4 och tiotalssiffran 7, så talet är 74. Byter siffrorna plats blir det 47, och $74 - 47 = 27$.') + sv('Talet är 74. Med siffrorna i omvänd ordning blir det 47, alltså 27 mindre.') },
          { text: true, q: 'Två tåg startar samtidigt från två städer som ligger 330 km från varandra och kör mot varandra. Det ena tåget kör 20 km/h fortare än det andra. De möts efter 1,5 timmar. Vilka medelhastigheter har tågen?',
            svar: '100 km/h och 120 km/h', test: () => nara(1.5 * 100 + 1.5 * 120, 330),
            los: ov('Låt $x$ vara det långsammare tågets hastighet i km/h. Det snabbare kör $x + 20$. På 1,5 h kör tågen sträckorna $1{,}5x$ och $1{,}5(x + 20)$, enligt $s = v \\cdot t$. När de möts har de tillsammans kört hela avståndet:') +
              k('1{,}5x + 1{,}5(x + 20) = 330') +
              lo() + k('1{,}5x + 1{,}5x + 30 = 330') + k('3x + 30 = 330') + minus('3x + 30', '330', '30') + k('3x = 300') + delat('3x', '300', '3') + k('x = 100') +
              to('Tågen kör 100 km/h och 120 km/h. Kontroll: $1{,}5 \\cdot 100 + 1{,}5 \\cdot 120 = 150 + 180 = 330$ km.') + sv('100 km/h och 120 km/h') },
        ],
      },
    ],
  },
];

const box = `  <div class="box boxgrid">
    <div>
      <p class="rub">Kom ihåg</p>
      <ol>
        <li><b>Översätt.</b> Skriv ut vad $x$ betyder och ställ upp en ekvation.</li>
        <li><b>Lös ekvationen.</b></li>
        <li><b>Tolka och svara</b> med enhet. Är svaret rimligt?</li>
      </ol>
      <ul>
        <li>”dubbelt så mycket som $x$” blir $2x$, ”5 mindre än $x$” blir $x - 5$.</li>
        <li>Låt $x$ vara det som allt annat kan uttryckas utifrån.</li>
        <li>Tid, sträcka och hastighet: $s = v \\cdot t$ och $t = \\dfrac{s}{v}$. Minuter skrivs om till timmar: $20\\ \\text{min} = \\dfrac{1}{3}\\ \\text{h}$.</li>
      </ul>
    </div>
    <div>
      <p class="rub">Exempel: summan av tre heltal som följer direkt efter varandra är 87. Vilka är talen?</p>
      <p><b>1.</b> Låt $x$ vara det minsta talet. Då är de andra $x + 1$ och $x + 2$:</p>
      $$x + (x + 1) + (x + 2) = 87$$
      <p><b>2.</b> $3x + 3 = 87$ ger $3x = 84$ och $x = 28$.</p>
      <p><b>3.</b> Talen är 28, 29 och 30. Kontroll: $28 + 29 + 30 = 87$.</p>
    </div>
  </div>`;

S.byggSida({
  fil: 'ovningsblad-problemlosning.html',
  titel: 'Problemlösning med ekvationer',
  under: 'Översätt texten till en ekvation, lös den, tolka och svara',
  beskrivning: 'textuppgifter i Matematik nivå 1c på tre nivåer: tal, ålder, pengar, figurer, tid och sträcka, blandningar och arbete. Med svar och lösningsförslag i tre steg. Utskriftsklart.',
  box,
  nivaText: '<b>Grund</b> översätter en mening i taget. <b>Mellan</b> har parenteser, variabler i båda led och samband som tid och sträcka. <b>Avancerad</b> kräver att du själv väljer vad som ska heta $x$, ibland något som inte efterfrågas.',
  kalkylator: 'Räknare får användas.',
  NIVAER,
});
