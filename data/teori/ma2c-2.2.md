---
id: ma2c-2.2
title: Faktorisering av uttryck
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.2'
---

# Faktorisering av uttryck

Att skriva om ett uttryck som en multiplikation är att **faktorisera
uttryck**. Vi har gått igenom faktorisering tidigare i Matematik 1c. Då
faktoriserade vi genom att "bryta ut" en gemensam faktor. I den här
kursen ska vi även faktorisera genom att använda oss av
kvadreringsreglerna och konjugatregeln baklänges.

::: tips "Faktorisering med konjugat- och kvadreringsreglerna"
Ett uttryck kan faktoriseras med

- **konjugatregeln** om uttrycket har **två** kvadrattermer minus
  varandra. Kom ihåg-ramsa: "Kvadrat minus kvadrat är konjugat!"
- **första kvadreringsregeln** om uttrycket har **tre** termer där
  första och sista termen är kvadrater. Tecknet framför mittentermen är
  **plus**. OBS! Kontrollera att mittentermen stämmer överens med den
  dubbla produkten.
- **andra kvadreringsregeln** om uttrycket har **tre** termer där första
  och sista termen är kvadrater. Tecknet framför mittentermen är
  **minus**. OBS! Kontrollera att mittentermen stämmer överens med den
  dubbla produkten.
:::

::: tips "Faktorisera uttryck"
Om möjligt,

1. bryt ut "som vanligt"
2. använd kvadreringsregel eller konjugatregel baklänges
:::

::: tips "Förenkla rationella uttryck (bråkuttryck med x)"
1. Faktorisera täljare och nämnare så långt som möjligt.
2. Förkorta ("stryk") likadana faktorer från täljare och nämnare.
:::

::: exempel "Exempel 1 — Faktorisera"
**Faktorisera<br>a) $18x^2 + 45x^3 - 81x^4$&emsp;&emsp;b) $x^2 - 6x + 9$&emsp;&emsp;c) $50x^2 - 98$**

**a)** Först undersöker vi om det går att bryta ut "som vanligt". Vi
tittar först på alla koefficienter, alltså talen framför
variabeltermerna. 18, 45 och 81 har 9 som största möjliga delare. Då
kan vi bryta ut 9. Alla termer innehåller $x$, så vi kan även bryta ut
en variabel. Den **lägsta** exponent vi har på $x$ är 2, så vi kan bryta
ut $x^2$.

Den största faktorn som vi kan bryta ut är alltså $9x^2$. Sedan ska vi
fylla parentesen så att vi får det ursprungliga uttrycket när vi
multiplicerar in $9x^2$ i parentesen. Vi får då

$$
9x^2(2 + 5x - 9x^2)
$$

Nu tittar vi på uttrycket i parentesen igen. Kan vi faktorisera det
ytterligare? Nej, det kan inte faktoriseras ytterligare, t.ex. med en
kvadreringsregel, eftersom den första termen (2) inte är en kvadrat
(kan inte skrivas som ett heltal upphöjt till 2).

**Svar:** $9x^2(2 + 5x - 9x^2)$

**b)** Vi ska faktorisera $x^2 - 6x + 9$. Vi kan inte bryta ut något
"som vanligt". Kan det vara en kvadreringsregel eller konjugatregel
baklänges? Ja! Eftersom uttrycket innehåller tre termer där den första
och sista termen är kvadrater kan det vara en kvadreringsregel!

Vi skriver upp en mall för kvadreringsregeln. Eftersom mittentermen är
negativ måste det vara ett minustecken i parentesen:

$$
x^2 - 6x + 9 = (\ \ - \ \ )^2
$$

Sedan tittar vi på första termen $x^2$ och tänker "Vad upphöjt till 2
blir $x^2$? Jo, $x$!" Sedan tittar vi på andra termen 9 och tänker "Vad
upphöjt till 2 blir 9? Jo, 3!"

Då fyller vi på med $x$ och 3 i parentesen och får

$$
x^2 - 6x + 9 = (x - 3)^2
$$

Vi kontrollerar att mittentermen/den dubbla produkten blir $6x$, vilket
stämmer.

**Svar:** $(x - 3)^2$

**c)** Vi ska faktorisera $50x^2 - 98$. Vi börjar med att bryta ut 2
från uttrycket:

$$
2(25x^2 - 49)
$$

Nu tittar vi på uttrycket i parentesen igen. Kan vi faktorisera det
ytterligare? Ja! Eftersom uttrycket i parentesen är "kvadrat minus
kvadrat" är det ett konjugat!

Vi skriver en mall för konjugatregeln, så

$$
2(25x^2 - 49) = 2(\ \ + \ \ )(\ \ - \ \ )
$$

Sedan tittar vi på första termen $25x^2$ och tänker "Vad upphöjt till 2
blir $25x^2$? Jo, $5x$!" Sedan tittar vi på andra termen 49 och tänker
"Vad upphöjt till 2 blir 49? Jo, 7!"

Då fyller vi på med $5x$ och 7 i parenteserna och får

$$
2(25x^2 - 49) = 2(5x + 7)(5x - 7)
$$

**Svar:** $2(5x + 7)(5x - 7)$
:::

::: exempel "Exempel 2 — Förkorta ett rationellt uttryck"
**Förkorta $\dfrac{x^2 - 9}{5x + 15}$ så långt som möjligt.**

Vi faktoriserar täljaren och nämnaren så långt vi kan. Täljaren är
"kvadrat minus kvadrat" och kan därför faktoriseras med konjugatregeln.
Nämnaren kan faktoriseras genom att bryta ut 5.

$$
\frac{x^2 - 9}{5x + 15} = \frac{(x + 3)(x - 3)}{5(x + 3)}
$$

Därefter förkortar vi uttrycket med $(x + 3)$ eftersom den faktorn
finns i både täljare och nämnare.

$$
\frac{(x + 3)(x - 3)}{5(x + 3)} = \frac{x - 3}{5}
$$

**Svar:** $\dfrac{x - 3}{5}$
:::
