'use strict';
// Bygger diagnosen på kapitel 1 och 2 i Matematik nivå 1c (2026-10-06):
//   diagnos-ma1c-kap1-2      nivå 1, 2 och 3, 60 minuter
// Avsnitt som inte ingår (ej genomgångna i klassen): 1.5 Tal i decimalform,
// 1.9 Grundpotensform och prefix, 1.10 Prioriteringsregler, 2.12 Använda
// formler och 2.13 Mönster och formler. Uppgifterna är medvetet andra än i
// övningsdiagnosen på kapitel 1 (bygg-diagnos.js).
//
//   node .claude/bygg-diagnos-kap12.js   bygger HTML-filerna i diagnoser/
//
// Renderingen är kopierad från bygg-diagnos.js (samma utseende).
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'diagnoser');
fs.mkdirSync(OUT, { recursive: true });

const R = String.raw;
const AVSNITT = {
  '1.1': 'Talmängder och negativa tal',
  '1.2': 'Bråk',
  '1.3': 'Addition och subtraktion av bråk',
  '1.4': 'Multiplikation och division av bråk',
  '1.6': 'Potenser med positiva heltalsexponenter',
  '1.7': 'Negativa exponenter och exponenten noll',
  '1.8': 'Rationella exponenter',
  '2.1': 'Teckna och tolka uttryck',
  '2.2': 'Förenkla uttryck',
  '2.3': 'Multiplicera med parenteser',
  '2.4': 'Faktorisera uttryck',
  '2.5': 'Ekvationslösningens grunder',
  '2.6': 'Variabler i båda led',
  '2.7': 'Ekvationer med nämnare',
  '2.8': 'Problemlösning med ekvationer',
  '2.9': 'Enkla andra- och tredjegradsekvationer',
  '2.10': 'Potensekvationer',
  '2.11': 'Olikheter',
};

const D3 = {
  id: 'diagnos-ma1c-kap1-2',
  over: 'Diagnos · Matematik nivå 1c · Kapitel 1 och 2',
  titel: 'Diagnos kapitel 1 och 2: Aritmetik, algebra och ekvationer',
  under: '60 minuter · utan digitala verktyg',
  intro: 'Diagnosen visar vad du kan i kapitel 1 och 2 och vad du behöver repetera. Tillåtna hjälpmedel är formelblad och linjal. Inga digitala verktyg.',
  regler: [
    'Skriv alla lösningar och svar på det separata dubbelarket. Skriv ditt namn på dubbelarket och numrera uppgifterna.',
    'Redovisa dina lösningar till alla uppgifter, så att det går att följa hur du har tänkt. Ett svar utan lösning ger inte full poäng.',
    'Efter varje uppgift står maxpoängen på nivå 1, 2 och 3, skrivet (1/2/3). Till exempel betyder (1/1/0) att uppgiften kan ge 1 poäng på nivå 1 och 1 poäng på nivå 2.',
    'Svara med bråk i enklaste form.',
    'Uppgifterna på nivå 3 står sist. Fastnar du på en uppgift: gå vidare och gå sedan tillbaka till uppgiften om det finns tid.',
  ],
  grupper: [
    { rubrik: 'Negativa tal och bråk', sek: ['1.1', '1.2', '1.3', '1.4'] },
    { rubrik: 'Potenser', sek: ['1.6', '1.7', '1.8'] },
    { rubrik: 'Uttryck', sek: ['2.1', '2.2', '2.3', '2.4'] },
    { rubrik: 'Ekvationer', sek: ['2.5', '2.6', '2.7'] },
    { rubrik: 'Andragrads- och potensekvationer', sek: ['2.9', '2.10'] },
    { rubrik: 'Olikheter', sek: ['2.11'] },
    { rubrik: 'Problemlösning', sek: ['2.8'] },
    { rubrik: 'Fördjupning', sek: ['A'] },
  ],
  // ba = bedömningsanvisning i de nationella provens form: ett block per
  // (del)uppgift med korrekta svar (likvärdiga svar skiljs med ;), maxpoäng och
  // en rad per poäng. Liten begynnelsebokstav = bygger på raden ovanför och ges
  // bara om den poängen har getts. Stor bokstav = kan ges fristående.
  uppgifter: [
    {
      grupp: 0, sek: '1.3', sekAlla: ['1.3', '1.4', '1.2'], typ: 'svar', poang: [2, 0, 0],
      text: 'Beräkna och svara i enklaste form.',
      delar: [
        { id: 'a', text: R`$\dfrac{3}{4} - \dfrac{2}{5}$` },
        { id: 'b', text: R`$\dfrac{4}{9} \Big/ \dfrac{2}{3}$` },
      ],
      ba: [
        { del: 'a', svar: R`$\dfrac{7}{20}$`, poang: [1, 0, 0], krav: [['Lösning med korrekt svar.', '+E']] },
        { del: 'b', svar: R`$\dfrac{2}{3}$`, poang: [1, 0, 0], krav: [['Lösning med korrekt svar.', '+E']],
          anm: R`Svaret $\dfrac{12}{18}$ ger inte poäng, eftersom uppgiften kräver enklaste form.` },
      ],
      kommentar: R`a) Gemensam nämnare $20$: $\dfrac{15}{20} - \dfrac{8}{20} = \dfrac{7}{20}$. Svaret $-1$ betyder att täljare och nämnare subtraherats var för sig. b) $\dfrac{4}{9} \cdot \dfrac{3}{2} = \dfrac{12}{18} = \dfrac{2}{3}$. Svaret $\dfrac{8}{27}$ betyder att eleven multiplicerat utan att invertera.`,
    },
    {
      grupp: 1, sek: '1.7', sekAlla: ['1.7', '1.8'], typ: 'svar', poang: [1, 1, 0],
      text: 'Beräkna utan räknare.',
      delar: [
        { id: 'a', text: R`$49^{1/2}$` },
        { id: 'b', text: R`$\left(\dfrac{2}{5}\right)^{-2}$` },
      ],
      ba: [
        { del: 'a', svar: '7', poang: [1, 0, 0], krav: [['Lösning med korrekt svar.', '+E']] },
        { del: 'b', svar: R`$\dfrac{25}{4}$ ; $6{,}25$`, poang: [0, 1, 0], krav: [['Lösning med korrekt svar.', '+C']] },
      ],
      kommentar: R`a) Svaret $24{,}5$ betyder att eleven halverat i stället för att dra kvadratroten. b) $\left(\dfrac{2}{5}\right)^{-2} = \left(\dfrac{5}{2}\right)^{2} = \dfrac{25}{4}$. Svaret $-\dfrac{4}{25}$ visar att den negativa exponenten tolkats som ett negativt tal. Nivå 2 av samma skäl som uppgift 6 i HT15, där potenser med exponenten $0$ och $1$ gav nivå 2, medan en ren potenslag med en bas ($7^{-4} \cdot (7^2)^3$, VT16) gav nivå 1.`,
    },
    {
      grupp: 1, sek: '1.6', sekAlla: ['1.6', '1.7'], typ: 'redovisa', poang: [0, 1, 0],
      text: R`Skriv $\dfrac{27^{2} \cdot 3^{-1}}{9}$ som en potens med basen $3$.`,
      ba: [
        { svar: R`$3^3$`, poang: [0, 1, 0], krav: [['Lösning med korrekt svar.', '+C']],
          anm: R`Svaret $27$ ger poäng om potensen $3^3$ framgår av lösningen.` },
      ],
      kommentar: R`$27^2 = (3^3)^2 = 3^6$ och $9 = 3^2$, så uttrycket blir $3^{6 + (-1) - 2} = 3^3$. Vanligt fel: $27^2 = 3^5$, där exponenterna adderats i stället för multiplicerats. Att skriva om till en gemensam bas är nivå 2 i de nationella proven (VT15 uppgift 12, $(2^4)^8 / (4^8)^2$).`,
    },
    {
      grupp: 2, sek: '2.1', typ: 'svar', poang: [1, 0, 0],
      text: R`En biobiljett kostar $x$ kr och en popcorn kostar $y$ kr. Teckna ett uttryck för vad $4$ biobiljetter och $3$ popcorn kostar tillsammans.`,
      ba: [
        { svar: R`$4x + 3y$ (kr)`, poang: [1, 0, 0], krav: [['Korrekt uttryck.', '+E']] },
      ],
      kommentar: R`Jämför HT14 uppgift 5, "skriv ett uttryck för ett tal som är 5 mer än hälften av talet $x$", nivå 1.`,
    },
    {
      grupp: 2, sek: '2.3', sekAlla: ['2.3', '2.2'], typ: 'svar', poang: [0, 1, 0],
      text: R`Förenkla $(x + 4)(2x - 3) - 2x^2$ så långt som möjligt.`,
      ba: [
        { svar: R`$5x - 12$`, poang: [0, 1, 0], krav: [['Lösning med korrekt svar.', '+C']] },
      ],
      kommentar: R`$(x + 4)(2x - 3) = 2x^2 - 3x + 8x - 12 = 2x^2 + 5x - 12$, och sedan tar $2x^2$ och $-2x^2$ ut varandra. Svaret $-12$ visar att de mellersta termerna saknas. Att multiplicera två parenteser och förenkla gav en poäng på nivå 2 i VT22 uppgift 20.`,
    },
    {
      grupp: 2, sek: '2.4', sekAlla: ['2.4', '2.3'], typ: 'svar', poang: [1, 1, 0],
      text: '',
      delar: [
        { id: 'a', text: R`Faktorisera $12x - 18$ så långt som möjligt.` },
        { id: 'b', text: R`Skriv ett uttryck i den tomma parentesen så att likheten gäller.<br>$6(2x - 4) = 4(\qquad\qquad)$` },
      ],
      kol: 1,
      ba: [
        { del: 'a', svar: R`$6(2x - 3)$`, poang: [1, 0, 0], krav: [['Korrekt svar.', '+E']],
          anm: R`Svaren $2(6x - 9)$ och $3(4x - 6)$ ger inte poäng, eftersom de inte är faktoriserade så långt som möjligt.` },
        { del: 'b', svar: R`$3x - 6$`, poang: [0, 1, 0], krav: [['Korrekt svar.', '+C']] },
      ],
      kommentar: R`b) $6(2x - 4) = 12x - 24 = 4(3x - 6)$. Svaret $2x - 4$ visar att eleven bara skrivit av parentesen. Samma typ som VT22 uppgift 10, $3(4x - 10) = 2(\;)$, nivå 2: eleven måste se uttryckets struktur i stället för att följa en inövad algoritm. Att faktorisera ett uttryck med en gemensam talfaktor, som i a), är nivå 1 (VT22 uppgift 1, $5x + 25$).`,
    },
    {
      grupp: 3, sek: '2.7', sekAlla: ['2.7', '2.5'], typ: 'redovisa', poang: [0, 2, 0],
      text: R`Lös ekvationen $\dfrac{x + 3}{4} - \dfrac{x - 1}{6} = 2$.`,
      ba: [
        { svar: R`$x = 13$`, poang: [0, 2, 0], krav: [
          [R`Påbörjad lösning, t.ex. förlänger bråken korrekt till gemensam nämnare eller multiplicerar båda leden med $12$.`, '+C'],
          ['Lösning med korrekt svar.', '+C'],
        ] },
      ],
      kommentar: R`$3(x + 3) - 2(x - 1) = 24$ ger $3x + 9 - 2x + 2 = 24$, alltså $x = 13$. Kontroll: $\dfrac{16}{4} - \dfrac{12}{6} = 2$. Vanliga fel: $-2(x - 1)$ blir $-2x - 2$ (ger $x = 17$), eller högerledet multipliceras inte med $12$. Uppgiften och bedömningen är byggda som HT16 uppgift 9, $\dfrac{3x + 1}{4} - \dfrac{2x + 3}{3} = 2$ (0/2/0).`,
    },
    {
      grupp: 4, sek: '2.9', sekAlla: ['2.9', '2.10'], typ: 'svar', poang: [1, 1, 0],
      text: 'Lös ekvationerna utan räknare.',
      delar: [
        { id: 'a', text: R`$2x^4 = 32$` },
        { id: 'b', text: R`$(x + 2)^2 - 7 = 18$` },
      ],
      ba: [
        { del: 'a', svar: R`$x = \pm 2$ ; $x_1 = 2$, $x_2 = -2$`, poang: [1, 0, 0], krav: [['Lösning med korrekt svar.', '+E']],
          anm: R`Endast lösningen $x = 2$ ger inte poäng.` },
        { del: 'b', svar: R`$x_1 = 3$, $x_2 = -7$`, poang: [0, 1, 0], krav: [['Lösning med korrekt svar.', '+C']],
          anm: R`Endast lösningen $x = 3$ ger inte poäng.` },
      ],
      kommentar: R`a) $x^4 = 16$, och jämn exponent ger två lösningar. Jämför HT16 uppgift 4, $4x^3 = 32$, nivå 1. b) $(x + 2)^2 = 25$ ger $x + 2 = \pm 5$. Deluppgiften kräver att eleven ser parentesen som en enhet och kombinerar tre steg (jämför exempel 3 i avsnitt 2.9).`,
    },
    {
      grupp: 5, sek: '2.11', sekAlla: ['2.11', '2.6', '1.1'], typ: 'svar', poang: [1, 1, 0],
      text: R`Lös olikheten $3(x - 2) > 5x + 4$.`,
      ba: [
        { svar: R`$x < -5$ ; $-5 > x$`, poang: [1, 1, 0], krav: [
          [R`Påbörjad lösning, t.ex. multiplicerar in $3$ i parentesen och samlar $x$-termerna i ett led.`, '+E'],
          ['Lösning med korrekt svar.', '+C'],
        ] },
      ],
      kommentar: R`$3x - 6 > 5x + 4$ ger $-2x > 10$, och division med $-2$ vänder olikhetstecknet: $x < -5$. Svaret $x > -5$ betyder att tecknet inte vänts. En olikhet med teckenvändning i ett steg är nivå 1 (VT16 uppgift 5, $-3x + 4 \geq -5$). Här kombineras parentes, variabel i båda led och teckenvändning, och bedömningen följer HT13 uppgift 6, $2(4x + 1) = 4(2 - x)$ (1/1/0).`,
    },
    {
      grupp: 6, sek: '2.8', typ: 'redovisa', poang: [1, 1, 0],
      text: R`Tre syskon delar på $1\,300$ kr. Mellanbarnet får $100$ kr mer än det yngsta, och det äldsta får dubbelt så mycket som det yngsta. Hur mycket får det yngsta syskonet? Lös uppgiften med en ekvation.`,
      ba: [
        { svar: '300 (kr)', poang: [1, 1, 0], krav: [
          [R`Tecknar en godtagbar ekvation, t.ex. $x + (x + 100) + 2x = 1\,300$<br>eller<br>avslutad lösning med korrekt svar utifrån prövning.`, '+E'],
          ['Lösning med korrekt svar.', '+C'],
        ] },
      ],
      kommentar: R`$4x + 100 = 1\,300$ ger $x = 300$. Kontroll: $300 + 400 + 600 = 1\,300$. Eftersom uppgiften kräver en ekvation ger en lösning genom prövning bara poängen på nivå 1.`,
    },
    {
      grupp: 7, sek: 'A', sekAlla: ['1.6'], typ: 'svar', poang: [0, 0, 1],
      text: R`Bestäm $n$ om $6^{4} \cdot 2^{n} = 12^{4}$.`,
      ba: [
        { svar: R`$n = 4$`, poang: [0, 0, 1], krav: [['Lösning med korrekt svar.', '+A']] },
      ],
      kommentar: R`$12^4 = (6 \cdot 2)^4 = 6^4 \cdot 2^4$, alltså $n = 4$. Med primtalsfaktorer: $2^4 \cdot 3^4 \cdot 2^n = 2^8 \cdot 3^4$. Vanligt fel: $n = 1$, när eleven delar $12$ med $6$ och glömmer exponenten. Potenslagar med ett nytt grepp är den vanligaste sortens nivå 3-uppgift i proven utan digitala verktyg, t.ex. $2^4 \cdot 3^8 = 9^n \cdot 6^4$ (HT12, HT14), $4^n + 4^n + 4^n + 4^n = 4^{12}$ (HT11, VT15) och $3^x = 9^{100}$ (HT15).`,
    },
    {
      grupp: 7, sek: 'A', sekAlla: ['2.3', '2.1'], typ: 'redovisa', poang: [1, 1, 2],
      text: R`Ta två udda tal som följer direkt efter varandra, till exempel $7$ och $9$. Multiplicera dem och addera $1$. Visa att resultatet alltid är delbart med $4$.`,
      ba: [
        { svar: R`$(2n - 1)(2n + 1) + 1 = 4n^2$, som är delbart med $4$`, poang: [1, 1, 2], krav: [
          ['Visar att påståendet stämmer för minst två talpar.', '+E'],
          [R`Tecknar två på varandra följande udda tal generellt, t.ex. $2n - 1$ och $2n + 1$, och påbörjar beräkningen av uttrycket.`, '+C'],
          [R`med korrekt förenkling till $4n^2$ eller ett likvärdigt uttryck, t.ex. $4n^2 + 8n + 4$.`, '+A'],
          [R`med en tydlig slutsats om att uttrycket alltid är delbart med $4$, t.ex. att $4n^2 = 4 \cdot n^2$ där $n^2$ är ett heltal.`, '+A'],
        ] },
      ],
      kommentar: R`$(2n - 1)(2n + 1) + 1 = 4n^2 + 2n - 2n - 1 + 1 = 4n^2$. Med $2n + 1$ och $2n + 3$ blir uttrycket $4n^2 + 8n + 4 = 4(n^2 + 2n + 1)$. Den vanligaste fällan är att beteckna talen $n$ och $n + 2$ utan att utnyttja att $n$ är udda. Då syns inte delbarheten. Bedömningen följer talleksuppgifterna HT11 och HT13 (uppgift 14): beräkningar för enskilda tal ger nivå 1, ett tecknat generellt uttryck nivå 2, och en självständigt genomförd generell visning nivå 3.`,
    },
    {
      grupp: 7, sek: 'A', sekAlla: ['2.6'], typ: 'redovisa', poang: [0, 1, 1],
      text: R`För vilket värde på talet $a$ saknar ekvationen $a(x - 2) = 4x + 5$ lösning? Motivera ditt svar.`,
      ba: [
        { svar: R`$a = 4$`, poang: [0, 1, 1], krav: [
          [R`Korrekt svar med knapphändig motivering, t.ex. att $x$-termerna tar ut varandra när $a = 4$.`, '+C'],
          [R`Fullständig motivering där eleven visar att $a = 4$ ger en ekvation som saknar lösning, t.ex. $4x - 8 = 4x + 5$, som ger $-8 = 5$.`, '+A'],
        ] },
      ],
      kommentar: R`$ax - 2a = 4x + 5$ ger $(a - 4)x = 2a + 5$. För $a = 4$ blir vänsterledet $0$ och högerledet $13$, så ekvationen saknar lösning. För alla andra $a$ är $x = \dfrac{2a + 5}{a - 4}$. Att bestämma en parameter så att en ekvation eller olikhet får en viss lösningsmängd är nivå 3 i proven (VT22 uppgift 15, $2x - a < 5$). Uppdelningen mellan knapphändig och fullständig motivering följer VT12 uppgift 12 (0/1/1).`,
    },
  ],
};
D3.uppgifter.sort((a, b) => a.grupp - b.grupp);
// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
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
.namn { display:flex; gap: 28px; margin-top: 10px; font-size: 10pt; color:#3b4350; }
.namn span { flex:1; border-bottom: 1px solid var(--line); padding-bottom: 2px; }
.intro { margin: 0 0 10px; }
.box { background: var(--paper); border: 1px solid rgba(31,37,48,.18); border-radius: 8px; padding: 10px 14px; margin: 0 0 12px; break-inside: avoid; }
.box p { margin: 4px 0; }
.box ul, .box ol { margin: 4px 0 4px 18px; padding: 0; }
.box li { margin: 2px 0; }
.box .rubrik { font-weight: 600; margin: 0 0 4px; }
h2 { font-size: 12pt; margin: 14px 0 6px; padding: 3px 0; border-bottom: 1px solid var(--line); break-after: avoid; }
h2 .sv { font-weight: 400; font-size: 9.5pt; color:#5b6472; margin-left: 8px; }
.upg { break-inside: avoid; page-break-inside: avoid; display:grid; grid-template-columns: 2.2em 1fr 4.2em; gap: 0 8px; padding: 8px 0 10px; border-bottom: 1px dotted var(--line); }
.upg .nr { font-weight: 600; text-align:right; }
.upg .po { text-align:right; font-size: 10pt; color:#3b4350; white-space: nowrap; }
.upg .txt { min-width:0; }
.upg .txt p { margin: 0 0 4px; }
.delar { display:grid; grid-template-columns: repeat(var(--kol, 2), 1fr); gap: 6px 14px; margin-top: 4px; }
.del { display:flex; gap: 6px; align-items: center; }
.del .bok { font-weight: 600; min-width: 1.3em; }
.del .eq { flex: 1 1 auto; min-width: 0; }
.lista { margin: 8px 0 4px; font-size: 12pt; }
.svarrad { margin-top: 8px; display:flex; gap: 8px; align-items: baseline; font-size: 10pt; color:#3b4350; }
.svarrad .linje { flex: 1 1 auto; border-bottom: 1px solid var(--ink); min-height: 1.4em; }
.svarrad .enh { white-space: nowrap; }
.svarrad.flera { gap: 18px; }
.svarrad.flera > span { flex: 1 1 0; display:flex; gap: 6px; align-items: baseline; }
.svarrad.flera .linje { flex: 1 1 auto; }
.ruta { margin-top: 8px; border: 1px solid var(--ink); border-radius: 4px; }
.ruta.kort { min-height: 32mm; } .ruta.mellan { min-height: 42mm; } .ruta.hog { min-height: 54mm; }
.ruta .svarrad { margin: 0; padding: 4px 8px 6px; }
.rutasvar { display:flex; gap: 8px; align-items: baseline; font-size: 10pt; color:#3b4350; margin-top: 6px; }
.rutasvar .linje { flex: 1 1 auto; border-bottom: 1px solid var(--ink); min-height: 1.4em; }
.hint { font-size: 9.5pt; color:#5b6472; margin: 2px 0 0; }
table.res { border-collapse: collapse; width: 100%; font-size: 10pt; margin-top: 8px; }
table.res tr { break-inside: avoid; page-break-inside: avoid; }
table.res th, table.res td { border: 1px solid var(--line); padding: 4px 8px; text-align: left; vertical-align: top; }
table.res th { background: var(--paper); font-weight: 600; }
table.res td.c, table.res th.c { text-align: center; }
table.res td.tom { min-width: 3.4em; }
table.res td.adr { white-space: nowrap; }
table.res tr.summa td { font-weight: 600; background: var(--paper); }
.ny { break-before: page; page-break-before: always; }
.facit .upg { grid-template-columns: 2.2em 1fr; padding: 6px 0 8px; }
.facit .svar { margin: 0 0 4px; }
.facit .bed { margin: 2px 0 4px 0; padding: 0; list-style: none; font-size: 10pt; }
.facit .bed li { display:flex; gap: 8px; align-items: baseline; }
.facit .bed li .niva { font-weight: 600; color: var(--blue); min-width: 3.6em; white-space: nowrap; }
.facit .kom { font-size: 10pt; color:#3b4350; margin: 4px 0 0; line-height: 2; }
.facit .kom .katex-display { margin: 4px 0 6px; text-align: left; } .facit .kom .katex-display > .katex { text-align: left; }
.facit .svar, .facit .bed { line-height: 1.75; }
.facit .sek { font-size: 9.5pt; color:#5b6472; margin: 0 0 2px; }
.ba { margin: 2px 0 6px; font-size: 10.5pt; line-height: 1.7; }
.ba-svar, .ba-krav { display:flex; justify-content: space-between; gap: 16px; align-items: baseline; }
.ba-svar { font-weight: 600; margin-top: 4px; }
.ba-svar .po, .ba-krav .pl { white-space: nowrap; font-weight: 600; }
.ba-krav { padding-left: 1.6em; }
.ba-krav .pl { color: var(--blue); }
.ba-anm { padding-left: 1.6em; font-size: 9.5pt; color:#3b4350; margin: 0; }
.facit .kom b { color: var(--ink); }
.facit .katex-display { margin: 4px 0; }
footer { margin-top: 18px; font-size: 9pt; color:#5b6472; border-top: 1px solid var(--line); padding-top: 6px; display:flex; justify-content: space-between; }
@page { size: A4; margin: 13mm 12mm 14mm; }
@media print {
  body { font-size: 10.5pt; }
  .page { max-width: none; padding: 0; }
  .box, table.res th, table.res tr.summa td { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
}
@media (max-width: 640px) {
  .delar { grid-template-columns: 1fr !important; }
  .upg { grid-template-columns: 2em 1fr; }
  .upg .po { grid-column: 2; text-align: left; }
}
`;

function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${title} — Fysiklabbet</title>
<meta name="description" content="${desc}">
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
<div class="page">`;
}
const FOOT = (v) => `<footer><span>${v}</span></footer>
</div>
</body>
</html>
`;

const NIVA = { '+E': 'Nivå 1', '+C': 'Nivå 2', '+A': 'Nivå 3' };
const poangTxt = (d, p) => d.bara_e ? `(${p[0]} p)` : `(${p[0]}/${p[1]}/${p[2]})`;
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

// Håller ihop ett tal eller en ensam variabel med ordet efter, så att det
// aldrig blir radbrytning mellan "4" och "biobiljetter" eller "$x$" och "kr".
function nobr(t) {
  return String(t).replace(/(\$(?:[0-9\\, ]+|[a-zA-Z])\$)\s+([A-Za-zÅÄÖåäö]+)/g,
    '<span style="white-space:nowrap">$1&nbsp;$2</span>');
}

function renderElev(d) {
  let h = head(d.titel, `${d.titel}. Utskriftsklart elevhäfte.`);
  h += `<header>
<p class="over">${d.over}</p>
<h1>${d.titel}</h1>
<p class="under">${d.under}</p>
<div class="namn"><span>Namn:</span><span>Klass:</span></div>
</header>
<p class="intro">${d.intro}</p>
<div class="box"><p class="rubrik">Så här gör du</p><ul>${d.regler.map(r => `<li>${r}</li>`).join('')}</ul></div>
`;
  let nr = 0;
  d.grupper.forEach((g, gi) => {
    const upp = d.uppgifter.filter(u => u.grupp === gi);
    if (!upp.length) return;
    const sekTxt = g.sek[0] === 'A' ? 'Nivå 3' : 'Avsnitt ' + g.sek.join(', ');
    for (const u of upp) {
      nr++; u.nr = nr;
      h += `<div class="upg"><span class="nr">${nr}.</span><div class="txt">`;
      // Inga svarsrader eller rutor: eleverna skriver lösningar och svar på
      // ett separat dubbelark, och alla uppgifter ska redovisas.
      if (u.text) h += `<p>${nobr(u.text)}</p>`;
      if (u.delar) {
        const kol = u.kol || Math.min(u.delar.length, 5);
        h += `<div class="delar" style="--kol:${kol}">`;
        for (const p of u.delar) h += `<div class="del"><span class="bok">${p.id})</span><span class="eq">${nobr(p.text)}</span></div>`;
        h += `</div>`;
      }
      h += `</div><span class="po">${poangTxt(d, u.poang)}</span></div>\n`;
    }
  });
  // Resultattabellen ligger på ett eget blad (renderResultatblad), eftersom
  // avsnittsnamnen per uppgift annars blir ledtrådar under skrivningen.
  h += FOOT(d.titel);
  return h;
}

function renderResultatblad(d) {
  let h = head(d.titel + ': resultat', `Resultatblad till ${d.titel}.`);
  // Tätare tabell så att bladet ryms på en A4
  h += `<style>table.res { font-size: 9.5pt; } table.res th, table.res td { padding: 2px 6px; line-height: 1.3; } h1 { font-size: 17pt; }</style>`;
  h += `<header>
<p class="over">${d.over} · Resultat</p>
<h1>${d.titel}</h1>
<p class="under">Resultatblad, delas ut när diagnosen är rättad</p>
<div class="namn"><span>Namn:</span><span>Klass:</span></div>
</header>`;
  h += renderResultat(d, false);
  h += FOOT(d.titel + ' · resultat');
  return h;
}

function sekFor(u) {
  return u.sekAlla || [u.sek];
}

function renderResultat(d, facit) {
  const rader = Object.keys(AVSNITT).map(s => {
    const upp = d.uppgifter.filter(u => sekFor(u).includes(s));
    return { s, upp };
  }).filter(r => r.upp.length);
  const max = d.uppgifter.reduce((m, u) => [m[0] + u.poang[0], m[1] + u.poang[1], m[2] + u.poang[2]], [0, 0, 0]);
  let h = `<h2>${facit ? 'Uppgifterna per avsnitt' : 'Resultat'}</h2>`;
  if (!facit) h += `<p class="intro">Fyll i dina poäng per avsnitt. Ett avsnitt där du har färre än hälften av poängen är ett avsnitt att repetera. Genomgången till varje avsnitt finns på fysiklabbet.se/katalog.html följt av koden i sista kolumnen, till exempel fysiklabbet.se/katalog.html?id=ma1c-2.7.</p>`;
  else h += `<p class="intro">Tabellen visar vilka uppgifter som prövar vilket avsnitt. En uppgift som använder två avsnitt står under båda. Poängen i tabellen räknar varje uppgift bara en gång, under sitt huvudavsnitt.</p>`;
  if (d.bara_e) {
    h += `<table class="res"><tr><th>Avsnitt</th><th>Uppgifter</th><th class="c">Max</th>` + (facit ? '' : `<th class="c tom">Dina poäng</th>`) + `<th>Repetera på fysiklabbet.se</th></tr>`;
  } else {
    const niv = `<th class="c">Nivå 1</th><th class="c">Nivå 2</th><th class="c">Nivå 3</th>`;
    h += `<table class="res"><tr><th rowspan="2">Avsnitt</th><th rowspan="2">Uppgifter</th><th class="c" colspan="3">Max poäng</th>` + (facit ? '' : `<th class="c" colspan="3">Dina poäng</th>`) + `<th rowspan="2">Genomgång på fysiklabbet.se</th></tr>`;
    h += `<tr>` + niv + (facit ? '' : niv.replace(/<th class="c">/g, '<th class="c tom">')) + `</tr>`;
  }
  for (const r of rader) {
    const egna = r.upp.filter(u => (u.sekAlla ? u.sekAlla[0] : u.sek) === r.s || (u.sek === 'A' && u.sekAlla[0] === r.s));
    const p = egna.reduce((m, u) => [m[0] + u.poang[0], m[1] + u.poang[1], m[2] + u.poang[2]], [0, 0, 0]);
    h += `<tr><td>${r.s} ${AVSNITT[r.s]}</td><td>${r.upp.map(u => u.nr).join(', ')}</td>`;
    if (d.bara_e) h += `<td class="c">${p[0]}</td>` + (facit ? '' : `<td class="tom"></td>`);
    else h += `<td class="c">${p[0] || ''}</td><td class="c">${p[1] || ''}</td><td class="c">${p[2] || ''}</td>` + (facit ? '' : `<td class="tom"></td><td class="tom"></td><td class="tom"></td>`);
    h += `<td class="adr">?id=ma1c-${r.s}</td></tr>`;
  }
  h += `<tr class="summa"><td>Hela diagnosen</td><td></td>`;
  if (d.bara_e) h += `<td class="c">${max[0]}</td>` + (facit ? '' : `<td class="tom"></td>`);
  else h += `<td class="c">${max[0]}</td><td class="c">${max[1]}</td><td class="c">${max[2]}</td>` + (facit ? '' : `<td class="tom"></td><td class="tom"></td><td class="tom"></td>`);
  h += `<td></td></tr></table>`;
  return h;
}

function renderFacit(d) {
  const max = d.uppgifter.reduce((m, u) => [m[0] + u.poang[0], m[1] + u.poang[1], m[2] + u.poang[2]], [0, 0, 0]);
  let h = head(d.titel + ': bedömningsanvisningar', `Bedömningsanvisningar till ${d.titel}.`);
  h += `<header>
<p class="over">${d.over} · Bedömningsanvisningar</p>
<h1>${d.titel}</h1>
<p class="under">Bedömningsanvisningar i de nationella provens form</p>
</header>
<div class="page facit">`;
  if (d.bara_e) {
    h += `<div class="box"><p class="rubrik">Om diagnosen</p><ul>
<li>Alla ${max[0]} poäng är på nivå 1, den nivå som prövar att eleven kan reglerna. Diagnosen är tänkt att skrivas på 60 minuter utan digitala verktyg.</li>
<li>Poängkraven följer de nationella provens mönster: poängen ges för det som står i kravet, oavsett hur eleven kommit fram till svaret, utom där redovisning krävs.</li>
<li>Ett svar i annan men likvärdig form godtas (bråk i stället för decimaltal, $1{,}5$ i stället för $\\dfrac{3}{2}$), om inte uppgiften ber om en bestämd form.</li>
<li>Riktvärde: minst två tredjedelar av poängen, alltså ${Math.ceil(max[0] * 2 / 3)} poäng, tyder på att grunderna i kapitlet sitter. Viktigare än totalen är avsnittstabellen sist: den pekar ut vad som ska repeteras.</li>
</ul></div>`;
  } else {
    h += `<div class="box"><p class="rubrik">Om diagnosen</p><ul>
<li>Diagnosen ger högst ${sum(max)} poäng: ${max[0]} på nivå 1, ${max[1]} på nivå 2 och ${max[2]} på nivå 3. Den skrivs på 60 minuter utan digitala verktyg, och eleverna redovisar alla lösningar på ett separat dubbelark. Nivå 1, 2 och 3 motsvarar nivåerna E, C och A i de nationella proven, och poängen är kalibrerade mot de 13 nationella proven i Matematik 1c (HT11 till VT22).</li>
</ul></div>
<div class="box"><p class="rubrik">Så läses bedömningsanvisningarna</p><ul>
<li>Utgångspunkten är att eleven får poäng för lösningens förtjänster och inte poängavdrag för fel och brister. En lösning som visar att eleven kommit en bit på väg kan ge delpoäng.</li>
<li>Överst i varje uppgift står det korrekta svaret och till höger maxpoängen. Flera svar åtskilda med semikolon är likvärdiga. Ett elevsvar som är likvärdigt med det angivna är också korrekt. En enhet inom parentes behöver inte stå med.</li>
<li>Därefter beskrivs vad som krävs för varje poäng, en rad per poäng, med poängens nivå till höger.</li>
<li><b>En beskrivning som börjar med liten bokstav</b>, till exempel "med korrekt förenkling", bygger på raden ovanför. Poängen ges bara om poängen på raden ovanför har getts.</li>
<li><b>En beskrivning som börjar med stor bokstav</b>, till exempel "Lösning med korrekt svar." eller "Fullständig motivering …", kan ges även om poängen ovanför inte har getts.</li>
<li>Med "Påbörjad lösning, t.ex. …" menas att den påbörjade lösningen ska vara relevant och kunna leda framåt. Exemplen visar det lägsta kravet för poängen.</li>
<li>Där prövning godtas står det i anvisningen. Beskrivs prövningen som "avslutad lösning" ges inte de efterföljande poängen. Att bara verifiera det korrekta svaret räknas inte som prövning och ger ingen poäng.</li>
<li>Alla uppgifter ska redovisas. För poängen "Lösning med korrekt svar" krävs en redovisad lösning, och ett svar utan lösning ger ingen poäng.</li>
<li>Ett fel i en deluppgift ska inte påverka bedömningen av följande deluppgifter, om deras svårighetsgrad inte minskar av felet.</li>
<li>Under varje uppgift står en kommentar med vanliga fel och vilken uppgift i de nationella proven nivån bygger på.</li>
</ul></div>`;
  }
  let nr = 0;
  d.grupper.forEach((g, gi) => {
    const upp = d.uppgifter.filter(u => u.grupp === gi);
    if (!upp.length) return;
    h += `<h2>${g.rubrik}</h2>`;
    for (const u of upp) {
      nr++;
      const sek = sekFor(u).map(s => `${s} ${AVSNITT[s]}`).join(' · ');
      h += `<div class="upg"><span class="nr">${nr}.</span><div class="txt">`;
      h += `<p class="sek">${sek} · ${poangTxt(d, u.poang)}</p>`;
      h += `<div class="ba">`;
      for (const blk of u.ba) {
        h += `<div class="ba-svar"><span>${blk.del ? blk.del + ')&ensp;' : ''}${blk.svar}</span><span class="po">${poangTxt(d, blk.poang)}</span></div>`;
        for (const k of blk.krav) h += `<div class="ba-krav"><span>${k[0]}</span><span class="pl">+ ${NIVA[k[1]]}</span></div>`;
        if (blk.anm) h += `<p class="ba-anm">${blk.anm}</p>`;
      }
      h += `</div>`;
      if (u.kommentar) h += `<p class="kom"><b>Kommentar.</b> ${u.kommentar}</p>`;
      h += `</div></div>\n`;
    }
  });
  h += renderResultat(d, true);
  h += `</div>` + FOOT(d.titel + ' · bedömningsanvisningar');
  return h;
}

for (const d of [D3]) {
  const elev = renderElev(d);           // sätter u.nr
  const facit = renderFacit(d);
  fs.writeFileSync(path.join(OUT, d.id + '.html'), elev, 'utf8');
  fs.writeFileSync(path.join(OUT, d.id + '-bedomning.html'), facit, 'utf8');
  fs.writeFileSync(path.join(OUT, d.id + '-resultat.html'), renderResultatblad(d), 'utf8');
  const max = d.uppgifter.reduce((m, u) => [m[0] + u.poang[0], m[1] + u.poang[1], m[2] + u.poang[2]], [0, 0, 0]);
  console.log(d.id + ': ' + d.uppgifter.length + ' uppgifter, poäng nivå 1/2/3 = ' + max.join('/'));
}
