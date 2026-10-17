---
id: ma3b-6.5
title: Annuitetslån
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.5'
---

# Annuitetslån

Den som köper en bil eller en bostad har sällan hela summan på kontot och
tar därför ett **lån**. Lånet betalas tillbaka med regelbundna
betalningar, och varje betalning består av två delar:

- **Amortering**: den del som betalar tillbaka själva lånet, så att
  skulden minskar.
- **Ränta**: priset för att låna. Räntan räknas på den skuld som finns
  kvar.

I Matematik nivå 1b räknade vi på lån med **rak amortering**. Då
amorterar man lika mycket varje gång. Skulden minskar, så räntan blir
mindre för varje betalning, och därför blir den första betalningen
störst och den sista minst.

## Annuitetslån

Med ett **annuitetslån** betalar man i stället **lika mycket varje
gång**. Det belopp som betalas varje gång kallas **annuitet**. Annuiteten
består också av ränta och amortering, men fördelningen mellan dem
ändras. I början är skulden stor, så räntedelen är stor och amorteringen
liten. För varje betalning minskar skulden, räntedelen krymper och en
allt större del av annuiteten går till amortering.

Diagrammen nedan jämför de två lånetyperna för ett lån på 100 000 kr
med räntan 5 %, som betalas tillbaka med en betalning i slutet av varje
år i fem år.

::: figur
<svg viewBox="-42.7 -32 396.7 204" width="628" height="323" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två stapeldiagram över de fem årliga betalningarna på ett lån på 100 000 kronor med 5 procents ränta. Med rak amortering är amorteringen 20 000 kronor varje år och räntan sjunker från 5 000 till 1 000 kronor, så betalningen minskar från 25 000 till 21 000 kronor. Med annuitetslån är betalningen 23 097 kronor varje år, men räntedelen krymper och amorteringsdelen växer."><line x1="0" y1="100" x2="150" y2="100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="80" x2="150" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="60" x2="150" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="40" x2="150" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="20" x2="150" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><rect x="10" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="10" y="20" width="18" height="20" fill="#c8324a"/><text x="19" y="134" font-size="11" text-anchor="middle" fill="#1f2530">1</text><rect x="38" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="38" y="24" width="18" height="16" fill="#c8324a"/><text x="47" y="134" font-size="11" text-anchor="middle" fill="#1f2530">2</text><rect x="66" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="66" y="28" width="18" height="12" fill="#c8324a"/><text x="75" y="134" font-size="11" text-anchor="middle" fill="#1f2530">3</text><rect x="94" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="94" y="32" width="18" height="8" fill="#c8324a"/><text x="103" y="134" font-size="11" text-anchor="middle" fill="#1f2530">4</text><rect x="122" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="122" y="36" width="18" height="4" fill="#c8324a"/><text x="131" y="134" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="0" y1="120" x2="150" y2="120" stroke="#1f2530" stroke-width="1.4"/><line x1="0" y1="120" x2="0" y2="-2" stroke="#1f2530" stroke-width="1.4"/><polygon points="0,-10 -4.5,0 4.5,0" fill="#1f2530"/><text x="75" y="-18" font-size="12" text-anchor="middle" fill="#1f2530">Rak amortering</text><text x="75" y="149" font-size="11" text-anchor="middle" fill="#1f2530">År</text><line x1="200" y1="100" x2="350" y2="100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="80" x2="350" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="60" x2="350" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="40" x2="350" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="20" x2="350" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><rect x="210" y="47.6" width="18" height="72.4" fill="#2b5ca8"/><rect x="210" y="27.6" width="18" height="20" fill="#c8324a"/><text x="219" y="134" font-size="11" text-anchor="middle" fill="#1f2530">1</text><rect x="238" y="44" width="18" height="76" fill="#2b5ca8"/><rect x="238" y="27.6" width="18" height="16.4" fill="#c8324a"/><text x="247" y="134" font-size="11" text-anchor="middle" fill="#1f2530">2</text><rect x="266" y="40.2" width="18" height="79.8" fill="#2b5ca8"/><rect x="266" y="27.6" width="18" height="12.6" fill="#c8324a"/><text x="275" y="134" font-size="11" text-anchor="middle" fill="#1f2530">3</text><rect x="294" y="36.2" width="18" height="83.8" fill="#2b5ca8"/><rect x="294" y="27.6" width="18" height="8.6" fill="#c8324a"/><text x="303" y="134" font-size="11" text-anchor="middle" fill="#1f2530">4</text><rect x="322" y="32" width="18" height="88" fill="#2b5ca8"/><rect x="322" y="27.6" width="18" height="4.4" fill="#c8324a"/><text x="331" y="134" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="200" y1="120" x2="350" y2="120" stroke="#1f2530" stroke-width="1.4"/><line x1="200" y1="120" x2="200" y2="-2" stroke="#1f2530" stroke-width="1.4"/><polygon points="200,-10 195.5,0 204.5,0" fill="#1f2530"/><text x="275" y="-18" font-size="12" text-anchor="middle" fill="#1f2530">Annuitetslån</text><text x="275" y="149" font-size="11" text-anchor="middle" fill="#1f2530">År</text><text x="-6" y="104" font-size="11" text-anchor="end" fill="#1f2530">5&#160;000</text><text x="194" y="104" font-size="11" text-anchor="end" fill="#1f2530">5&#160;000</text><text x="-6" y="84" font-size="11" text-anchor="end" fill="#1f2530">10&#160;000</text><text x="194" y="84" font-size="11" text-anchor="end" fill="#1f2530">10&#160;000</text><text x="-6" y="64" font-size="11" text-anchor="end" fill="#1f2530">15&#160;000</text><text x="194" y="64" font-size="11" text-anchor="end" fill="#1f2530">15&#160;000</text><text x="-6" y="44" font-size="11" text-anchor="end" fill="#1f2530">20&#160;000</text><text x="194" y="44" font-size="11" text-anchor="end" fill="#1f2530">20&#160;000</text><text x="-6" y="24" font-size="11" text-anchor="end" fill="#1f2530">25&#160;000</text><text x="194" y="24" font-size="11" text-anchor="end" fill="#1f2530">25&#160;000</text><text x="-6" y="-18" font-size="11" text-anchor="end" fill="#1f2530">kr</text><rect x="40" y="157" width="11" height="11" fill="#2b5ca8"/><text x="56" y="166" font-size="11" fill="#1f2530">Amortering</text><rect x="160" y="157" width="11" height="11" fill="#c8324a"/><text x="176" y="166" font-size="11" fill="#1f2530">Ränta</text></svg>

Med rak amortering är den blå delen lika stor varje år. Med annuitetslån
är hela stapeln lika hög varje år.
:::

Med annuitetslånet betalar man 23 097,48 kr varje år. Det första året är
räntan 5 000 kr och amorteringen 18 097,48 kr. Det sista året är räntan
bara 1 099,88 kr och amorteringen 21 997,60 kr. Med rak amortering är
amorteringen alltid 20 000 kr, och betalningen sjunker från 25 000 kr
till 21 000 kr.

## Hur stor blir annuiteten?

Annuiteten bestäms med hjälp av nuvärden. Banken lånar ut $G$ kr i dag
och får tillbaka $A$ kr efter ett år, $A$ kr efter två år och så vidare.
En betalning som görs om några år är värd mindre i dag. Som vi såg i
avsnittet om nuvärde är nuvärdet av $A$ kr som betalas om ett år lika med
$\dfrac{A}{k}$, om två år $\dfrac{A}{k^2}$, och så vidare, där $k$ är
förändringsfaktorn. Lånet går jämnt upp när **lånebeloppet är lika med
summan av alla betalningarnas nuvärden**. Den summan är en geometrisk
summa.

::: formel "Annuitet"
$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

där

- $A$ = annuitet (belopp som betalas varje gång)
- $G$ = lånebelopp
- $k$ = förändringsfaktor för räntan under en period mellan två betalningar
- $n$ = antal betalningar

::: härledning "Härledning — formeln för annuiteten"
Lånet $G$ kr betalas tillbaka med $n$ betalningar på $A$ kr, en i slutet
av varje period. Den första betalningen görs om en period och har
nuvärdet $\dfrac{A}{k}$. Den sista görs om $n$ perioder och har
nuvärdet $\dfrac{A}{k^n}$. Lånebeloppet är summan av nuvärdena:

$$
G = \frac{A}{k} + \frac{A}{k^2} + \ldots + \frac{A}{k^n}
$$

Vi skriver summan i omvänd ordning, med den sista betalningen först:

$$
G = \frac{A}{k^n} + \frac{A}{k^{n-1}} + \ldots + \frac{A}{k}
$$

Varje term är den föregående gånger $k$. Det är alltså en geometrisk
summa med första termen $a_1 = \dfrac{A}{k^n}$, kvoten $k$ och $n$
termer. Formeln $s_n = \dfrac{a_1(k^n - 1)}{k - 1}$ ger

$$
G = \frac{A}{k^n} \cdot \frac{k^n - 1}{k - 1}
$$

Vi multiplicerar båda led med $k^n$:

$$
G \cdot k^n = \frac{A(k^n - 1)}{k - 1}
$$

Vi multiplicerar båda led med $k - 1$:

$$
G \cdot k^n \cdot (k - 1) = A(k^n - 1)
$$

Till sist dividerar vi båda led med $k^n - 1$:

$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

Raden $G \cdot k^n = \dfrac{A(k^n - 1)}{k - 1}$ går också att läsa på ett
annat sätt. Vänsterledet är vad lånebeloppet hade vuxit till efter $n$
perioder med ränta. Högerledet är vad alla betalningarna hade vuxit
till om de satts in på ett konto med samma ränta, precis som vid
regelbundet sparande. Lånet går jämnt upp när de två är lika stora.
:::
:::

::: tips "Räntan för en period"
Görs betalningarna en gång om året är $k$ förändringsfaktorn för
årsräntan, till exempel $1{,}06$ för 6 % ränta. Görs de varje månad är
$k$ förändringsfaktorn för **månadsräntan**, och $n$ är antalet
**månader**. Månadsräntan räknas som årsräntan delad med 12: 6 %
årsränta ger månadsräntan 0,5 % och $k = 1{,}005$.
:::

::: exempel "Exempel 1 — Lånet som en summa av nuvärden"
**Nora lånar 30 000 kr. Lånet ska betalas tillbaka med tre lika stora betalningar, en i slutet av varje år. Räntan är 5 %. Hur stor blir varje betalning?**

::: handskrift
typ: annuitetnuvarde
:::

::: textlosning
Vi kallar betalningen $A$ kr. Förändringsfaktorn är $k = 1{,}05$.
Betalningarna görs om 1, 2 och 3 år, så deras nuvärden är
$\dfrac{A}{1{,}05}$, $\dfrac{A}{1{,}05^2}$ och $\dfrac{A}{1{,}05^3}$.
Lånebeloppet är summan av nuvärdena:

$$
30\,000 = \frac{A}{1{,}05} + \frac{A}{1{,}05^2} + \frac{A}{1{,}05^3}
$$

Vi bryter ut $A$ i högerledet:

$$
30\,000 = A \left( \frac{1}{1{,}05} + \frac{1}{1{,}05^2} + \frac{1}{1{,}05^3} \right)
$$

Parentesen är ett tal som vi räknar ut:

$$
\frac{1}{1{,}05} + \frac{1}{1{,}05^2} + \frac{1}{1{,}05^3} = 2{,}7232\ldots
$$

Ekvationen blir

$$
30\,000 = A \cdot 2{,}7232\ldots
$$

Vi dividerar båda led med $2{,}7232\ldots$:

$$
A = \frac{30\,000}{2{,}7232\ldots} = 11\,016{,}256\ldots \approx 11\,016
$$

Nora betalar alltså tillbaka $3 \cdot 11\,016 = 33\,048$ kr, ungefär
3 000 kr mer än hon lånade. Det är rimligt för tre års ränta på 5 %
av en skuld som minskar.

**Svar:** Cirka 11 016 kr
:::
:::

::: exempel "Exempel 2 — Billånet"
**Sami lånar 120 000 kr till en bil. Lånet är ett annuitetslån med räntan 6 %, och det ska betalas tillbaka med en betalning i slutet av varje år i fem år.<br>a) Hur stor är annuiteten?<br>b) Hur mycket betalar Sami totalt, och hur mycket av det är ränta?<br>c) Hur mycket ränta hade Sami betalat totalt om lånet i stället hade haft rak amortering, med en betalning per år?**

::: handskrift
typ: annuitetbil
:::

::: textlosning
**a)** Lånebeloppet är $G = 120\,000$, förändringsfaktorn är $k = 1{,}06$
och antalet betalningar är $n = 5$. Insättning i formeln för annuiteten,
$A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$, ger

$$
A = \frac{120\,000 \cdot 1{,}06^5 \cdot (1{,}06 - 1)}{1{,}06^5 - 1} = 28\,487{,}568\ldots \approx 28\,488
$$

**Svar:** Cirka 28 488 kr

**b)** Sami gör fem betalningar på 28 487,568… kr:

$$
5 \cdot 28\,487{,}568\ldots = 142\,437{,}840\ldots \approx 142\,438
$$

Av det är 120 000 kr själva lånet. Resten är ränta:

$$
142\,437{,}840\ldots - 120\,000 = 22\,437{,}840\ldots \approx 22\,438
$$

**Svar:** Totalt cirka 142 438 kr, varav cirka 22 438 kr är ränta.

**c)** Med rak amortering amorterar Sami lika mycket varje år:

$$
\frac{120\,000}{5} = 24\,000
$$

Räntan är 6 % av skulden före varje betalning. Skulden minskar med
24 000 kr varje år, så räntorna blir

$$
\begin{aligned}
\text{år 1:}&\quad 0{,}06 \cdot 120\,000 = 7\,200 \\
\text{år 2:}&\quad 0{,}06 \cdot 96\,000 = 5\,760 \\
\text{år 3:}&\quad 0{,}06 \cdot 72\,000 = 4\,320 \\
\text{år 4:}&\quad 0{,}06 \cdot 48\,000 = 2\,880 \\
\text{år 5:}&\quad 0{,}06 \cdot 24\,000 = 1\,440
\end{aligned}
$$

Den totala räntan är

$$
7\,200 + 5\,760 + 4\,320 + 2\,880 + 1\,440 = 21\,600
$$

Med rak amortering betalar Sami cirka 838 kr mindre i ränta. Skulden
minskar snabbare i början, så det blir mindre skuld att betala ränta
på. I gengäld är de första betalningarna större.

**Svar:** 21 600 kr
:::
:::

::: exempel "Exempel 3 — Månadsbetalningar (svårare)"
**Linnea lånar 200 000 kr till en bil. Lånet är ett annuitetslån med årsräntan 6 %. Det ska betalas tillbaka med en betalning i slutet av varje månad i fem år, och månadsräntan räknas som årsräntan delad med 12.<br>a) Hur stor är månadsbetalningen?<br>b) Hur mycket ränta betalar Linnea totalt?**

::: handskrift
typ: annuitetmanad
:::

::: textlosning
**a)** Betalningarna görs varje månad, så vi räknar med månadsränta.
Månadsräntan är

$$
\frac{6\ \%}{12} = 0{,}5\ \%
$$

Förändringsfaktorn för en månad är alltså $k = 1{,}005$. På fem år görs

$$
n = 5 \cdot 12 = 60
$$

betalningar. Lånebeloppet är $G = 200\,000$. Insättning i formeln för
annuiteten, $A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$, ger

$$
A = \frac{200\,000 \cdot 1{,}005^{60} \cdot (1{,}005 - 1)}{1{,}005^{60} - 1} = 3\,866{,}560\ldots \approx 3\,867
$$

**Svar:** Cirka 3 867 kr

**b)** Linnea betalar totalt

$$
60 \cdot 3\,866{,}560\ldots = 231\,993{,}618\ldots
$$

Av det är 200 000 kr själva lånet, så räntan är

$$
231\,993{,}618\ldots - 200\,000 = 31\,993{,}618\ldots \approx 31\,994
$$

**Svar:** Cirka 31 994 kr
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Begreppen"
- **Amortering**: den del som betalar tillbaka själva lånet.
- **Ränta**: priset för att låna, räknat på den skuld som är kvar.
- **Annuitet**: det lika stora belopp som betalas varje gång.
:::

::: sampunkt "Rak amortering eller annuitet"
- **Rak amortering**: samma amortering varje gång. Betalningen minskar.
- **Annuitetslån**: samma betalning varje gång. Räntedelen minskar och
  amorteringen ökar.
- Rak amortering ger lite mindre ränta totalt.
:::

::: sampunkt "Formeln för annuiteten"
- $A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$
- $G$ = lånebelopp, $k$ = förändringsfaktor per period, $n$ = antal
  betalningar.
- Total kostnad: $n \cdot A$. Total ränta: $n \cdot A - G$.
:::

::: sampunkt "Varför formeln stämmer"
- Lånebeloppet är lika med summan av betalningarnas **nuvärden**.
- Nuvärdena $\dfrac{A}{k^n}, \ldots, \dfrac{A}{k}$ bildar en geometrisk
  summa.
- Månadsbetalningar: månadsräntan är årsräntan delad med 12, och $n$
  räknas i månader.
:::
:::
