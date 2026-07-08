---
id: ma3c-1.1
title: Förkortning och förlängning av rationella uttryck
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.1'
---

# Förkortning och förlängning av rationella uttryck

Ett uttryck där alla variabeltermer har positiva heltalsexponenter kallas
**polynom**. Ett uttryck med ett polynom i täljare och nämnare kallas
**rationellt uttryck**.

$$
\frac{5x^2 - 5x}{3x - 3} \qquad \text{och} \qquad \frac{x + 3}{8}
$$

är exempel på rationella uttryck.

Vi förkortar och förlänger rationella uttryck enligt samma princip som för
bråk. Kom ihåg att vid förkortning och förlängning av bråk eller rationella
uttryck så **ändras inte** storleken på uttrycket.

När vi förkortar rationella uttryck gör vi det genom att **faktorisera** för
att hitta gemensamma faktorer. Sedan tidigare har vi två metoder för att
faktorisera polynom:

1. Bryta ut gemensam faktor.
2. Kvadreringsreglerna eller konjugatregeln baklänges.

Det finns en tredje metod för att faktorisera vilket polynomuttryck som
helst — genom att bestämma polynomets **nollställen**! I Matematik 2c
konstaterade vi att ett polynom $p(x)$ med nollställena $x_1, x_2, \ldots,
x_n$ kunde skrivas enligt $p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)$. Detta
är en faktorisering.

::: formel "Faktorisera med nollställen"
Ett polynom $p(x)$ av grad $n$ med nollställena $x_1, x_2, \ldots, x_n$ kan
faktoriseras enligt

$$
p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)
$$

där $k$ är koefficienten framför $x$-termen med högst grad (exponent).
:::

I uppgifter där vi ska faktorisera uttryck, t.ex. när vi ska förenkla
rationella uttryck, har vi nu tre metoder.

::: tips "Faktorisera"
1. Bryt ut gemensam faktor.
2. Kvadreringsreglerna eller konjugatregeln baklänges.
3. Med hjälp av nollställen.
:::

## Förläng och förkorta

Vi repeterar först principen med några exempel med bråk. Därefter går vi
över till rationella uttryck. Att **förlänga** innebär att multiplicera både
täljare och nämnare med samma tal eller uttryck. Att **förkorta** innebär
att dividera både täljare och nämnare med en gemensam faktor.

::: exempel "Exempel 1 — Förläng ett bråk"
**Förläng $\dfrac{3}{4}$ med 5.**

Vi multiplicerar både täljare och nämnare med 5.

$$
\frac{3}{4} = \frac{3 \cdot 5}{4 \cdot 5} = \frac{15}{20}
$$

**Svar:** $\dfrac{15}{20}$
:::

::: exempel "Exempel 2 — Förkorta ett bråk"
**Förkorta $\dfrac{14}{21}$.**

Vi ska försöka hitta gemensamma delare till 14 och 21. Vid mindre tal kan vi
ganska lätt hitta en gemensam delare (i detta fall 7). Alternativt kan vi
primtalsfaktorisera täljare och nämnare och därefter förkorta med gemensamma
faktorer, vilket är lämpligt för större tal.

*Alternativ 1:* Vi ser att största gemensamma delaren till 14 och 21 är 7
och förkortar med den.

$$
\frac{14}{21} = \frac{14/7}{21/7} = \frac{2}{3}
$$

*Alternativ 2:* Med primtalsfaktorisering.

$$
\frac{14}{21} = \frac{2 \cdot 7}{3 \cdot 7} = \frac{2}{3}
$$

**Svar:** $\dfrac{2}{3}$
:::

::: exempel "Exempel 3 — Förläng ett rationellt uttryck"
**Förläng $\dfrac{x + 3}{8}$ med $(x - 2)$. Svara i faktoriserad form och i
utvecklad form.**

Vi multiplicerar täljare och nämnare med $(x - 2)$.

$$
\frac{x + 3}{8} = \frac{(x + 3)(x - 2)}{8(x - 2)} = \frac{x^2 + x - 6}{8x - 16}
$$

**Svar:** $\dfrac{(x + 3)(x - 2)}{8(x - 2)}$ (faktoriserad form) eller
$\dfrac{x^2 + x - 6}{8x - 16}$ (utvecklad form)
:::

::: exempel "Exempel 4 — Förkorta rationella uttryck"
**Förkorta**

$$
\text{a)}\ \frac{35x^3}{30x^5} \qquad
\text{b)}\ \frac{5x^2 - 5x}{3x - 3} \qquad
\text{c)}\ \frac{x^2 - 8x + 7}{x - 1}
$$

**a)** Detta uttryck har en enda term i både täljare och nämnare, så vi
skriver ut samtliga faktorer för att se vilka förkortningar som är möjliga.

$$
\frac{35x^3}{30x^5} = \frac{7 \cdot 5 \cdot x \cdot x \cdot x}{5 \cdot 3 \cdot 2 \cdot x \cdot x \cdot x \cdot x \cdot x} = \frac{7}{3 \cdot 2 \cdot x \cdot x} = \frac{7}{6x^2}
$$

**b)** Detta uttryck har flera termer i täljare och nämnare. Vi utnyttjar
samma princip som för bråken: vi skriver om täljare och nämnare som
multiplikationer, dvs. vi **faktoriserar** dem. Vi bryter ut största
gemensamma faktorn i täljaren respektive nämnaren och förkortar sedan.

$$
\frac{5x^2 - 5x}{3x - 3} = \frac{5x(x - 1)}{3(x - 1)} = \frac{5x}{3}
$$

**c)** Nämnaren $x - 1$ kan inte faktoriseras mer. Täljaren kan inte
faktoriseras med metod 1 eller 2, så vi bestämmer dess nollställen genom att
sätta uttrycket lika med noll och lösa ekvationen.

$$
x^2 - 8x + 7 = 0
$$

Vi använder $pq$-formeln och får

$$
\begin{aligned}
x &= 4 \pm \sqrt{4^2 - 7} \\
x &= 4 \pm \sqrt{9} \\
x &= 4 \pm 3
\end{aligned}
$$

vilket ger $x_1 = 4 - 3 = 1$ och $x_2 = 4 + 3 = 7$. Täljaren har alltså
nollställena 1 och 7 och kan då faktoriseras som $(x - 1)(x - 7)$.

Detta ger

$$
\frac{x^2 - 8x + 7}{x - 1} = \frac{(x - 1)(x - 7)}{(x - 1)} = x - 7
$$

**Svar:** $x - 7$
:::
