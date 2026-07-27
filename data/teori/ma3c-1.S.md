---
id: ma3c-1.S
title: Sammanfattning
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.S'
---

# Sammanfattning — Rationella uttryck och gränsvärden

Det här kapitlet handlade om rationella uttryck — bråk där täljare och
nämnare är polynom — och om gränsvärden. Du har övat på att förkorta,
förlänga, addera, subtrahera, multiplicera och dividera rationella uttryck
genom att faktorisera, bland annat med en ny metod: faktorisering med hjälp
av polynomets nollställen. Du har också löst ekvationer som innehåller
rationella uttryck, och lärt dig bestämma gränsvärden både då en variabel
går mot ett tal och då den går mot en oändlighet. Sist i kapitlet användes
ett symbolhanterande hjälpmedel (Geogebra) för att lösa samma typer av
problem.

## Begrepp att kunna

- **polynom**: ett uttryck där alla variabeltermer har positiva
  heltalsexponenter.
- **rationellt uttryck**: ett uttryck med ett polynom i täljaren och ett
  polynom i nämnaren, t.ex. $\dfrac{5x^2 - 5x}{3x - 3}$.
- **förlänga**: multiplicera både täljare och nämnare med samma tal eller
  uttryck; ändrar inte uttryckets värde.
- **förkorta**: dividera både täljare och nämnare med en gemensam faktor;
  ändrar inte uttryckets värde.
- **nollställe**: det $x$-värde som gör att ett uttryck blir lika med noll;
  används för att faktorisera polynom som inte går att faktorisera med
  utbrytning eller kvadrerings-/konjugatregeln.
- **minsta gemensamma nämnaren (MGN)**: den minsta gemensamma nämnare som
  alla termer i ett uttryck eller en ekvation kan göras liknämniga med.
- **liknämnigt**: när flera rationella uttryck har förlängts till samma
  nämnare, så att täljarna kan adderas eller subtraheras på ett
  gemensamt divisionsstreck.
- **korsvis multiplikation**: genväg för att lösa en ekvation på formen
  $\dfrac{a}{b} = \dfrac{c}{d}$: ger direkt $a \cdot d = c \cdot b$.
- **definitionsmängd**: de $x$-värden en ekvation eller ett uttryck är
  definierat för; värden som gör en nämnare lika med noll måste alltid
  uteslutas.
- **gränsvärde ($\lim$)**: det värde ett uttryck närmar sig, utan att
  nödvändigtvis nå fram till det, när variabeln närmar sig ett tal eller en
  oändlighet.
- **oändligheten ($\infty$)**: beteckning för att en variabel växer utan
  gräns ($x \to \infty$) eller avtar utan gräns ($x \to -\infty$).
- **gränsvärde saknas**: när uttrycket går mot olika värden underifrån och
  ovanifrån finns inget gemensamt gränsvärde.
- **symbolhanterande hjälpmedel**: en räknare eller programvara (t.ex.
  Geogebra) som förutom siffror även kan hantera algebraiska
  bokstavsuttryck.

## Formler

::: formel "Kapitlets formler och regler"
**Faktorisera med hjälp av nollställen**

$$
p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)
$$

där

- $p(x)$ = ett polynom av grad $n$ med nollställena $x_1, x_2, \ldots, x_n$
- $k$ = koefficienten framför $x$-termen med högst grad (exponent)

**Multiplikation av rationella uttryck**

$$
\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}
$$

Täljare multipliceras med täljare och nämnare med nämnare. Faktorisera
gärna innan du multiplicerar — det gör det lättare att se vad som senare
kan förkortas bort.

**Division av rationella uttryck**

$$
\frac{a}{b} \Big/ \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}
$$

Divisionstecknet byts ut mot multiplikation samtidigt som uttrycket i
nämnaren inverteras (täljare och nämnare byter plats).

**Korsvis multiplikation**

$$
\frac{a}{b} = \frac{c}{d} \quad \Longrightarrow \quad a \cdot d = c \cdot b
$$

**Gränsvärde**

$$
\lim_{x \to a} f(x) = L
$$

utläses "gränsvärdet av $f(x)$ då $x$ går mot $a$ är $L$".

**Regler för gränsvärde vid en oändlighet**

- Oändlighet enbart i täljaren → gränsvärdet blir en oändlighet.
- Oändlighet enbart i nämnaren → gränsvärdet blir 0.
- Oändlighet i både täljare och nämnare → stryk konstanttermerna, förkorta
  uttrycket och bestäm sedan gränsvärdet av det som blir kvar.
:::

## Viktiga samband och metoder

- Faktorisera i den här ordningen: 1) bryt ut gemensam faktor,
  2) kvadreringsreglerna eller konjugatregeln baklänges, 3) bestäm
  nollställena och skriv $p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)$.
  Fungerar inte metod 1, gå vidare till metod 2, och så vidare.
- Vid addition och subtraktion krävs samma nämnare. Har termerna olika
  nämnare förlänger du varje term med den andra termens nämnare (eller med
  MGN) innan täljarna adderas eller subtraheras.
- Vid en ekvation med rationella uttryck: kontrollera först vilka
  $x$-värden som gör någon nämnare lika med noll — dessa är aldrig
  tillåtna som lösningar. Lös sedan genom att multiplicera båda leden med
  MGN, eller genom att göra liknämnigt och likställa täljarna.
- En ekvation på formen $\dfrac{a}{b} = \dfrac{c}{d}$ kan lösas snabbare med
  korsvis multiplikation — det ger samma ekvation som att multiplicera med
  MGN, men i ett steg.
- Vid division av rationella uttryck: byt ut divisionstecknet mot
  multiplikation och invertera uttrycket i nämnaren innan du förenklar.
- Kontrollera alltid mot uteslutna $x$-värden i slutet — en lösning som
  råkar bli lika med ett uteslutet värde måste förkastas.
- Bestäm ett gränsvärde då $x$ går mot ett tal i den här ordningen:
  1) sätt in värdet direkt, 2) faktorisera och förkorta uttrycket och sätt
  sedan in värdet, 3) gör två tabeller och närma dig värdet underifrån och
  ovanifrån. Ger metod 1 ett tal som $\dfrac{0}{0}$ är uttrycket inte
  definierat där, och du måste gå vidare till metod 2.
- Går tabellerna i metod 3 mot olika värden underifrån och ovanifrån (eller
  mot $-\infty$ åt ena hållet och $+\infty$ åt andra) saknas gränsvärde.
- Går både täljaren och nämnaren mot en oändlighet: stryk
  konstanttermerna (de försvinner i jämförelse med oändligheten), förkorta
  det som blir kvar, och beräkna gränsvärdet av det förenklade uttrycket.
- Ett symbolhanterande hjälpmedel som Geogebra kan förenkla, faktorisera,
  lösa ekvationer (exakt eller numeriskt) och beräkna gränsvärden direkt —
  men förstå gärna metoden för hand innan du använder ett sådant verktyg,
  så att du kan tolka och kontrollera svaret.

## Inför provet

- Kan du förklara skillnaden mellan ett polynom och ett rationellt uttryck?
- Kan du de tre metoderna för att faktorisera ett uttryck (bryta ut,
  kvadrerings-/konjugatregeln, nollställen) och vet du i vilken ordning du
  ska pröva dem?
- Kan du förkorta och förlänga rationella uttryck utan att ändra deras
  värde?
- Kan du addera och subtrahera rationella uttryck med olika nämnare genom
  att göra dem liknämniga?
- Kan du lösa en ekvation med rationella uttryck genom att multiplicera med
  MGN, och vet du varför vissa lösningar måste förkastas?
- Kan du multiplicera och dividera rationella uttryck, och minns du att
  division innebär att invertera och multiplicera?
- Vet du hur man löser en ekvation på formen $\dfrac{a}{b} = \dfrac{c}{d}$
  med korsvis multiplikation?
- Kan du bestämma ett gränsvärde genom att sätta in värdet direkt, och vet
  du när den metoden inte fungerar?
- Kan du bestämma ett gränsvärde genom att faktorisera och förkorta
  uttrycket, t.ex. med konjugatregeln?
- Vet du hur man med hjälp av tabeller avgör om ett gränsvärde saknas?
- Kan du bestämma gränsvärden då $x$ går mot en oändlighet, och vet du
  skillnaden mellan oändlighet i täljaren, i nämnaren och i båda?
- Kan du använda ett symbolhanterande hjälpmedel för att förenkla,
  faktorisera, lösa ekvationer och bestämma gränsvärden?
