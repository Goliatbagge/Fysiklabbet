---
id: ma1c-2.S
title: Sammanfattning
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.S'
---

# Sammanfattning — Algebra och ekvationer

Det här kapitlet handlade om att teckna, tolka, förenkla, utveckla och
faktorisera algebraiska uttryck, samt att lösa ekvationer och olikheter av
flera olika slag — linjära ekvationer, ekvationer med nämnare, enkla
andra- och tredjegradsekvationer, potensekvationer och olikheter. Du har
också övat på att lösa ut en variabel ur en formel och att hitta en sluten
formel för en talföljd. Du ska efter kapitlet kunna lösa dessa
ekvationstyper metodiskt — aldrig genom att pröva dig fram — och avgöra
hur många lösningar en ekvation eller olikhet har.

## Begrepp att kunna

- **variabel**: bokstav (t.ex. $x$) som representerar ett okänt eller
  varierande tal.
- **koefficient**: talet som multiplicerar en variabel i en term
  (t.ex. 150 i $150x$).
- **variabelterm / konstantterm**: term som innehåller en variabel
  respektive en term som bara består av ett tal.
- **uttryckets värde**: talet man får när man sätter in ett värde på
  variabeln och beräknar uttrycket.
- **förenkla uttryck**: slå ihop likadana termer ($x$-termer för sig,
  $x^2$-termer för sig, konstanttermer för sig och så vidare).
- **utveckla uttryck**: skriva om ett parentesuttryck utan parenteser
  genom att multiplicera in faktorn i varje term.
- **distributiva lagen**: regeln $a(b+c) = ab + ac$ som ligger bakom all
  multiplikation med en parentes.
- **faktorisera uttryck**: skriva ett uttryck som en multiplikation genom
  att bryta ut en gemensam faktor.
- **ekvation**: likhet mellan två uttryck som innehåller en variabel; att
  lösa den innebär att lösa ut variabeln.
- **olikhet**: jämförelse mellan två uttryck med ett olikhetstecken
  (<, >, ≤, ≥) i stället för likhetstecken.
- **andragradsekvation / tredjegradsekvation**: ekvation där variabelns
  högsta exponent är 2 respektive 3.
- **potensekvation**: ekvation där variabeln står upphöjd till en
  godtycklig exponent, $x^n = a$.
- **talföljd och element**: en serie tal $a_1, a_2, a_3, \ldots$; varje
  tal i serien kallas ett element.
- **sluten formel**: formel som ger ett godtyckligt element $a_n$ i en
  talföljd direkt, utan att räkna ut alla föregående element.
- **storhet och formel**: något mätbart, t.ex. längd eller hastighet
  (storhet), respektive en ekvation som beskriver ett samband mellan
  storheter (formel).

## Formler

::: formel "Kapitlets formler"
**Distributiva lagen**

$$
a(b + c) = ab + ac
$$

**Ekvationslösningens grunder**

Samma räkneoperation görs på båda led, med motsatt räknesätt för att få
bort en term eller faktor:

- addition tas bort genom subtraktion, och tvärtom
- multiplikation tas bort genom division, och tvärtom

**Enkla andra- och tredjegradsekvationer**

$$
x^2 = a\ (a \geq 0) \implies x = \pm\sqrt{a}
$$

$$
x^3 = a \implies x = \sqrt[3]{a}
$$

där *a* är talet på ekvationens högerled. I andragradsfallet saknas reella
lösningar om $a < 0$.

**Potensekvationer**

$$
x^n = a \implies x = a^{1/n} = \sqrt[n]{a}
$$

där jämn exponent $n$ ger $\pm$ framför roten (två, en eller noll
lösningar) och udda exponent ger en lösning utan $\pm$.

**Olikheter**

Löses som ekvationer, men olikhetstecknet **vänds** vid multiplikation
eller division med ett negativt tal.
:::

## Viktiga samband och metoder

- Ekvationer löses genom att göra samma räkneoperation på båda led —
  ALDRIG genom prövning (att gissa och testa sig fram till en lösning).
- Ett minustecken framför en parentes byter tecken på alla termer inuti
  parentesen när parentesen tas bort; ett plustecken lämnar tecknen
  oförändrade.
- Vid multiplikation av två parenteser ska varje term i den första
  parentesen multipliceras med varje term i den andra.
- Vid faktorisering bryter man ut den största gemensamma talfaktorn och
  den minsta potensen av varje variabel som finns i alla termer.
- Har ekvationen variabler i båda led: samla variabeltermerna på den sida
  som har minst koefficient, så blir fortsatt räkning enklare.
- Leder ekvationslösningen till en falsk likhet (t.ex. $-12 = 63$) saknar
  ekvationen lösning.
- I ekvationer med variabeln i nämnaren måste man först ange vilka värden
  som gör nämnaren noll (och alltså inte är tillåtna); har ekvationen en
  bråkterm i vardera ledet löser man med korsvis multiplikation, och med
  tre eller fler bråktermer multiplicerar man båda led med minsta
  gemensamma nämnaren (MGN).
- Problemlösning görs i tre steg: översätt (inför en beteckning och ställ
  upp en ekvation), lös ekvationen, och tolka och svara med enhet — och
  kontrollera att svaret är rimligt.
- Andragradsolikheter löses genom att först undersöka gränsfallet
  (motsvarande ekvation) och sedan avgöra vilket intervall som uppfyller
  olikheten med hjälp av en tallinje.
- I potensekvationer avgör exponentens jämnhet antalet lösningar: jämn
  exponent ger upp till två lösningar (med $\pm$), udda exponent ger
  alltid exakt en lösning.
- En sluten formel för en talföljd hittas genom att gissa en term utifrån
  skillnaden mellan elementen, testa mot $a_1$, och justera med en
  konstant tills formeln stämmer för flera element.
- Vid formelanvändning måste enheterna vara konsekventa genom hela
  beräkningen (t.ex. omvandla mil till km, och km/h till samma tidsenhet
  som övriga värden) innan man sätter in dem i formeln.

## Figurer värda att minnas

Multiplikation av två parenteser: varje term i den första parentesen
multipliceras med varje term i den andra — grunden för att utveckla
uttryck som $(a+b)(c+d)$:

::: figur
<svg viewBox="16 0 336 56" width="336" height="56" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Parentesen a plus b gånger parentesen c plus d. Bågar visar att a multipliceras med c och med d, och att b multipliceras med c och med d. Resultatet är a gånger c plus a gånger d plus b gånger c plus b gånger d."><text x="24" y="46" font-size="15" fill="#1f2530">(</text><text x="31" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="46" y="46" font-size="15" fill="#1f2530">+</text><text x="62" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="72" y="46" font-size="15" fill="#1f2530">)(</text><text x="88" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="102" y="46" font-size="15" fill="#1f2530">+</text><text x="118" y="46" font-size="15" fill="#1f2530"><tspan font-style="italic">d</tspan></text><text x="128" y="46" font-size="15" fill="#1f2530">)</text><path d="M35,31 C45,12 81,12 91,29" fill="none" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(91,29) rotate(58)" fill="#c8324a"/><path d="M35,31 C57,2 113,2 123,29" fill="none" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(123,29) rotate(50)" fill="#c8324a"/><path d="M67,31 C75,17 87,17 95,29" fill="none" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(95,29) rotate(52)" fill="#2563c9"/><path d="M67,31 C85,8 117,8 127,29" fill="none" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(127,29) rotate(55)" fill="#2563c9"/><text x="346" y="46" font-size="15" text-anchor="end" fill="#1f2530">= <tspan font-style="italic">a</tspan> · <tspan font-style="italic">c</tspan> + <tspan font-style="italic">a</tspan> · <tspan font-style="italic">d</tspan> + <tspan font-style="italic">b</tspan> · <tspan font-style="italic">c</tspan> + <tspan font-style="italic">b</tspan> · <tspan font-style="italic">d</tspan></text></svg>
:::

Andragradsolikheten $x^2 < 9$: gränsfallet $x^2 = 9$ ger $x = \pm 3$, och
lösningen är alla tal mellan −3 och 3, markerat på en tallinje:

::: figur
<svg viewBox="20 16 424 38" width="424" height="38" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En tallinje från minus 6 till 6 med öppna ringar vid minus 3 och 3 och en markerad sträcka mellan dem: lösningen är alla tal mellan minus 3 och 3."><line x1="32" y1="28" x2="428" y2="28" stroke="#1f2530" stroke-width="1.4"/><line x1="38" y1="24" x2="38" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="38" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−6</text><line x1="70" y1="24" x2="70" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="70" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><line x1="102" y1="24" x2="102" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="102" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><line x1="134" y1="24" x2="134" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="134" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="166" y1="24" x2="166" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="166" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="198" y1="24" x2="198" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="198" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="230" y1="24" x2="230" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="230" y="46" font-size="12" text-anchor="middle" fill="#1f2530">0</text><line x1="262" y1="24" x2="262" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="262" y="46" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="294" y1="24" x2="294" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="294" y="46" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="326" y1="24" x2="326" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="326" y="46" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="358" y1="24" x2="358" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="358" y="46" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="390" y1="24" x2="390" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="390" y="46" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="422" y1="24" x2="422" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="422" y="46" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="140" y1="28" x2="320" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><circle cx="134" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="326" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/></svg>
:::

## Inför provet

- Kan du teckna och tolka ett uttryck (variabel, koefficient,
  variabelterm, konstantterm), och förenkla det genom att slå ihop
  likadana termer och hantera tecken framför en parentes?
- Kan du utveckla ett parentesuttryck med distributiva lagen, även när två
  parenteser multipliceras med varandra?
- Kan du faktorisera ett uttryck genom att bryta ut en gemensam faktor
  (tal och variabel)?
- Kan du lösa en linjär ekvation steg för steg, utan att pröva dig fram?
- Vet du hur man löser en ekvation med variabler i båda led, och känner du
  igen när en ekvation saknar lösning?
- Kan du lösa en ekvation med nämnare, ange vilka värden som inte är
  tillåtna, och välja rätt metod utifrån antalet bråktermer?
- Kan du lösa ett problem genom att införa en beteckning, ställa upp en
  ekvation, lösa den och tolka svaret med rätt enhet?
- Kan du lösa enkla andra- och tredjegradsekvationer och en
  potensekvation, och avgöra antalet lösningar utifrån exponentens
  jämnhet?
- Kan du lösa en olikhet och komma ihåg att vända olikhetstecknet vid
  multiplikation eller division med ett negativt tal?
- Kan du lösa en andragradsolikhet genom att undersöka gränsfallet och
  rita upp lösningen på en tallinje?
- Kan du lösa ut en variabel ur en formel och sätta in värden med rätt
  enheter?
- Kan du hitta en sluten formel för en talföljd och använda den för att
  beräkna ett element långt fram i följden?
