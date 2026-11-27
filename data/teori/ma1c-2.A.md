---
id: ma1c-2.A
title: Avancerade exempel
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.A'
---

# Avancerade exempel

De här exemplen är på nivån **Avancerad**. Det som gör en uppgift avancerad
är sällan att räkningen är lång. Det är att vägen inte är given: innan du
kan börja räkna måste du se hur uppgiften hänger ihop. Ofta är det något av
det här:

- **Ett påstående som ska gälla alla tal**, så att ett exempel inte räcker.
- **En okänd konstant**, som ska väljas så att lösningen blir en bestämd.
- **Ett uttryck som ska beräknas ur ett annat**, utan att variablerna är kända.
- **Ett mönster** där du själv måste hitta en formel.

Läs uppgiften och försök först själv. Fundera på vad som är okänt och hur
det du vet kan skrivas med bokstäver. Titta sedan på lösningen.

## Uttryck

*Bygger på avsnitt 2.3 Multiplicera med parenteser och avsnitt 2.4 Faktorisera uttryck.*

::: exempel "Exempel 1: Två jämna tal i rad (Avancerad)"
**Visa att produkten av två på varandra följande jämna tal alltid är delbar med 8.**

::: handskrift
typ: jamnaprodukt
:::

::: textlosning
Påståendet ska gälla alla jämna tal, så vi räknar med bokstäver. Ett
jämnt tal kan skrivas $2n$, där *n* är ett heltal. Nästa jämna tal ligger
två steg längre fram, $2n + 2$. Produkten är

$$
2n(2n + 2) = 4n^2 + 4n
$$

Båda termerna har faktorn $4n$. Vi bryter ut den.

$$
4n^2 + 4n = 4n(n + 1)
$$

Faktorn 4 visar att produkten är delbar med 4. För att den ska vara delbar
med 8 behövs en faktor 2 till. Den finns i $n(n + 1)$: talen *n* och
$n + 1$ är två heltal som följer på varandra, så ett av dem är jämnt. Då
är också produkten $n(n + 1)$ jämn, och kan skrivas $2k$, där *k* är ett
heltal.

$$
4n(n + 1) = 4 \cdot 2k = 8k
$$

Produkten är 8 gånger ett heltal och därför delbar med 8, vilket skulle
visas.
:::
:::

*Bygger på avsnitt 2.3 Multiplicera med parenteser och avsnitt 2.12 Använda formler.*

::: exempel "Exempel 2: Summa och produkt är kända (Avancerad)"
**För två tal $x$ och $y$ gäller att $x + y = 6$ och $xy = 5$. Bestäm $x^2 + y^2$.**

::: handskrift
typ: summaprodukt
:::

::: textlosning
Vi behöver inte bestämma *x* och *y*. I stället letar vi efter ett uttryck
där både $x + y$ och $x^2 + y^2$ finns med. Det gör produkten
$(x + y)(x + y)$. Eftersom $x + y = 6$ är

$$
(x + y)(x + y) = 6 \cdot 6
$$

Vi multiplicerar ihop parenteserna i vänster led.

$$
x^2 + xy + yx + y^2 = 36
$$

$xy$ och $yx$ är samma sak, så de slås ihop.

$$
x^2 + 2xy + y^2 = 36
$$

Nu sätter vi in $xy = 5$.

$$
x^2 + 2 \cdot 5 + y^2 = 36
$$

$$
x^2 + y^2 + 10 = 36
$$

Vi subtraherar 10 från båda led.

$$
x^2 + y^2 + 10 \mathbin{\boldsymbol{-}} \boldsymbol{10} = 36 \mathbin{\boldsymbol{-}} \boldsymbol{10}
$$

$$
x^2 + y^2 = 26
$$

**Svar:** $x^2 + y^2 = 26$
:::
:::

## Olikheter

*Bygger på avsnitt 2.11 Olikheter och avsnitt 2.7 Ekvationer med nämnare.*

::: exempel "Exempel 3: Välj konstanten (Avancerad)"
**Bestäm konstanten $a$ så att olikheten $5 - 2x \leq a$ har lösningarna $x \geq -3$.**

::: handskrift
typ: olikhetkonstant
:::

::: textlosning
Vi löser olikheten som vanligt och låter *a* stå kvar som en bokstav.
Sedan jämför vi lösningen med $x \geq -3$.

Vi subtraherar 5 från båda led.

$$
5 - 2x \mathbin{\boldsymbol{-}} \boldsymbol{5} \leq a \mathbin{\boldsymbol{-}} \boldsymbol{5}
$$

$$
-2x \leq a - 5
$$

Vi dividerar båda led med $-2$. Division med ett negativt tal vänder
olikhetstecknet.

$$
\frac{-2x}{\boldsymbol{-2}} \geq \frac{a - 5}{\boldsymbol{-2}}
$$

$$
x \geq \frac{a - 5}{-2}
$$

Vi förlänger bråket med $-1$, så att minustecknet försvinner ur nämnaren.

$$
x \geq \frac{5 - a}{2}
$$

Lösningarna ska vara $x \geq -3$. Gränsen måste därför vara $-3$.

$$
\frac{5 - a}{2} = -3
$$

Vi multiplicerar båda led med 2.

$$
\frac{5 - a}{2} \boldsymbol{\cdot 2} = -3 \boldsymbol{\cdot 2}
$$

$$
5 - a = -6
$$

Vi subtraherar 5 från båda led.

$$
5 - a \mathbin{\boldsymbol{-}} \boldsymbol{5} = -6 \mathbin{\boldsymbol{-}} \boldsymbol{5}
$$

$$
-a = -11
$$

Vi dividerar båda led med $-1$.

$$
\frac{-a}{\boldsymbol{-1}} = \frac{-11}{\boldsymbol{-1}}
$$

$$
a = 11
$$

Kontroll: med $a = 11$ blir olikheten $5 - 2x \leq 11$. Det ger
$-2x \leq 6$ och $x \geq -3$, som det ska.

**Svar:** $a = 11$
:::
:::

## Mönster

*Bygger på avsnitt 2.13 Mönster och formler och avsnitt 2.1 Teckna och tolka uttryck.*

::: exempel "Exempel 4: Rutnät av stickor (Avancerad)"
**Figurerna nedan byggs av stickor. Figur $n$ är ett kvadratiskt rutnät med $n$ rutor i varje led.<br>a) Bestäm en formel för antalet stickor i figur $n$.<br>b) Vilken är den största figuren som går att bygga av 500 stickor?**

::: figur
<svg viewBox="6 9 235 109" width="372" height="173" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, sans-serif" fill="#0f1620" role="img" aria-label="Tre figurer av stickor. Figur 1 är en kvadrat av fyra stickor. Figur 2 är ett rutnät med två gånger två rutor av tolv stickor. Figur 3 är ett rutnät med tre gånger tre rutor av tjugofyra stickor.">
<line x1="17.2" y1="66.0" x2="36.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="36.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="17.2" y1="92.0" x2="36.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="36.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="14.0" y1="88.8" x2="14.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="14.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="40.0" y1="88.8" x2="40.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="40.0" cy="69.2" r="2.4" fill="#b8323a"/>
<text x="27" y="112" font-size="12" text-anchor="middle">Figur 1</text>
<line x1="75.2" y1="40.0" x2="94.8" y2="40.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="94.8" cy="40.0" r="2.4" fill="#b8323a"/>
<line x1="101.2" y1="40.0" x2="120.8" y2="40.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="120.8" cy="40.0" r="2.4" fill="#b8323a"/>
<line x1="75.2" y1="66.0" x2="94.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="94.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="101.2" y1="66.0" x2="120.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="120.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="75.2" y1="92.0" x2="94.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="94.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="101.2" y1="92.0" x2="120.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="120.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="72.0" y1="62.8" x2="72.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="72.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="72.0" y1="88.8" x2="72.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="72.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="98.0" y1="62.8" x2="98.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="98.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="98.0" y1="88.8" x2="98.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="98.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="124.0" y1="62.8" x2="124.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="124.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="124.0" y1="88.8" x2="124.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="124.0" cy="69.2" r="2.4" fill="#b8323a"/>
<text x="98" y="112" font-size="12" text-anchor="middle">Figur 2</text>
<line x1="161.2" y1="14.0" x2="180.8" y2="14.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="180.8" cy="14.0" r="2.4" fill="#b8323a"/>
<line x1="187.2" y1="14.0" x2="206.8" y2="14.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="206.8" cy="14.0" r="2.4" fill="#b8323a"/>
<line x1="213.2" y1="14.0" x2="232.8" y2="14.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="232.8" cy="14.0" r="2.4" fill="#b8323a"/>
<line x1="161.2" y1="40.0" x2="180.8" y2="40.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="180.8" cy="40.0" r="2.4" fill="#b8323a"/>
<line x1="187.2" y1="40.0" x2="206.8" y2="40.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="206.8" cy="40.0" r="2.4" fill="#b8323a"/>
<line x1="213.2" y1="40.0" x2="232.8" y2="40.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="232.8" cy="40.0" r="2.4" fill="#b8323a"/>
<line x1="161.2" y1="66.0" x2="180.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="180.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="187.2" y1="66.0" x2="206.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="206.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="213.2" y1="66.0" x2="232.8" y2="66.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="232.8" cy="66.0" r="2.4" fill="#b8323a"/>
<line x1="161.2" y1="92.0" x2="180.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="180.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="187.2" y1="92.0" x2="206.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="206.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="213.2" y1="92.0" x2="232.8" y2="92.0" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="232.8" cy="92.0" r="2.4" fill="#b8323a"/>
<line x1="158.0" y1="36.8" x2="158.0" y2="17.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="158.0" cy="17.2" r="2.4" fill="#b8323a"/>
<line x1="158.0" y1="62.8" x2="158.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="158.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="158.0" y1="88.8" x2="158.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="158.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="184.0" y1="36.8" x2="184.0" y2="17.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="184.0" cy="17.2" r="2.4" fill="#b8323a"/>
<line x1="184.0" y1="62.8" x2="184.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="184.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="184.0" y1="88.8" x2="184.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="184.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="210.0" y1="36.8" x2="210.0" y2="17.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="210.0" cy="17.2" r="2.4" fill="#b8323a"/>
<line x1="210.0" y1="62.8" x2="210.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="210.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="210.0" y1="88.8" x2="210.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="210.0" cy="69.2" r="2.4" fill="#b8323a"/>
<line x1="236.0" y1="36.8" x2="236.0" y2="17.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="236.0" cy="17.2" r="2.4" fill="#b8323a"/>
<line x1="236.0" y1="62.8" x2="236.0" y2="43.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="236.0" cy="43.2" r="2.4" fill="#b8323a"/>
<line x1="236.0" y1="88.8" x2="236.0" y2="69.2" stroke="#b0803f" stroke-width="3" stroke-linecap="round"/>
<circle cx="236.0" cy="69.2" r="2.4" fill="#b8323a"/>
<text x="197" y="112" font-size="12" text-anchor="middle">Figur 3</text>
</svg>
:::

::: handskrift
typ: stickrutnat
:::

::: textlosning
**a)** Antalet stickor ökar med 8 och sedan med 12, alltså inte lika
mycket varje gång. Därför letar vi efter en formel genom att räkna
stickorna på ett ordnat sätt, först de vågräta och sedan de lodräta.

I figur $n$ finns $n + 1$ vågräta rader av stickor, och varje rad har $n$
stickor. Det ger

$$
\text{vågräta stickor} = n(n + 1)
$$

Rutnätet ser likadant ut om det vrids ett kvarts varv, så de lodräta
stickorna är lika många.

$$
\text{antal stickor} = n(n + 1) + n(n + 1) = 2n(n + 1)
$$

Kontroll mot figurerna: $2 \cdot 1 \cdot 2 = 4$, $2 \cdot 2 \cdot 3 = 12$ och
$2 \cdot 3 \cdot 4 = 24$. Det stämmer.

**Svar:** $2n(n + 1)$

**b)** Figur $n$ går att bygga om antalet stickor högst är 500.

$$
2n(n + 1) \leq 500
$$

Vi dividerar båda led med 2.

$$
\frac{2n(n + 1)}{\boldsymbol{2}} \leq \frac{500}{\boldsymbol{2}}
$$

$$
n(n + 1) \leq 250
$$

Produkten av två heltal som följer på varandra ska vara högst 250. Vi
prövar tal i närheten av $\sqrt{250} \approx 16$.

$$
15 \cdot 16 = 240 \leq 250
$$

$$
16 \cdot 17 = 272 > 250
$$

Figur 15 går att bygga, med $2 \cdot 240 = 480$ stickor. Figur 16 skulle
kräva $2 \cdot 272 = 544$ stickor.

**Svar:** Figur 15
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Visa att något alltid gäller"
- Ett exempel räcker inte. Räkna med bokstäver.
- Jämnt tal: $2n$. Nästa jämna tal: $2n + 2$.
- Två heltal i rad, $n$ och $n + 1$: ett av dem är jämnt.
:::

::: sampunkt "Uttryck ur andra uttryck"
- Leta efter ett uttryck där det kända och det sökta finns med.
- $(x + y)(x + y) = x^2 + 2xy + y^2$
- Sätt in det kända värdet i stället för att lösa ut variablerna.
:::

::: sampunkt "En konstant i olikheten"
- Lös olikheten med konstanten kvar som en bokstav.
- Dela med ett negativt tal: vänd olikhetstecknet.
- Sätt gränsen lika med den givna och lös ekvationen.
:::

::: sampunkt "Mönster med en formel"
- Ökar antalet olika mycket: leta efter en produkt.
- Räkna ordnat, till exempel först vågräta och sedan lodräta delar.
- Kontrollera formeln mot figurerna.
:::
:::
