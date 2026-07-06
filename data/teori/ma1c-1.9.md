---
id: ma1c-1.9
title: Grundpotensform och prefix
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.9'
---

# Grundpotensform och prefix

## Grundpotensform

En potens av 10 kallas **tiopotens**. För att enklare skriva stora och små
tal kan man använda sig av tiopotenser. Om man anger ett tal med ett tal
mellan 1 och 10 följt av en tiopotens är det skrivet i **grundpotensform**.

::: formel "Grundpotensform"
Ett tal i grundpotensform skrivs

$$
a \cdot 10^n \quad \text{där } 1 \leq a < 10 \text{ och } n \text{ är ett heltal.}
$$
:::

::: formel "Tiopotensens exponent"
Om ett tal är skrivet i grundpotensform gäller för tal

- **större än 1** att tiopotensens exponent anger antalet heltalssiffror
  *efter* den första siffran
- **mindre än 1** att tiopotensens exponent anger antalet nollor *innan*
  första siffran.
:::

::: exempel "Exempel 1 — Skriv i grundpotensform"
**Skriv i grundpotensform<br>a) 8 000 000 000&emsp;&emsp;b) 743 000&emsp;&emsp;c) 0,0009&emsp;&emsp;d) 0,000024**

**a)** Det inledande talet ska vara mellan 1 och 10. I detta fall är det 8.
Antalet siffror efter den första ger tiopotensens exponent. I detta fall är
det 9.

**Svar:** $8 \cdot 10^9$

**b)** I detta fall inleds grundpotensformen med 7,43. Antalet siffror
efter den första ger tiopotensens exponent. I detta fall är det 5.

**Svar:** $7{,}43 \cdot 10^5$ (observera att exponenten ska vara 5 och
inte 3)

**c)** I detta fall inleds grundpotensformen med 9. Antalet nollor före den
första icke-nollan ger tiopotensens negativa exponent. I detta fall är det
4 nollor.

**Svar:** $9 \cdot 10^{-4}$

**d)** I detta fall inleds grundpotensformen med 2,4. Antalet nollor före
den första icke-nollan ger tiopotensens negativa exponent. I detta fall är
det 5 nollor.

**Svar:** $2{,}4 \cdot 10^{-5}$
:::

## Prefix

En bokstav som ersätter en tiopotens och sätts framför en enhet kallas
**prefix**. Alla nödvändiga prefix finns i formelbladet.

::: formel "Prefix"
| Beteckning | Namn | Tiopotens |
| --- | --- | --- |
| T | tera | $10^{12}$ |
| G | giga | $10^{9}$ |
| M | mega | $10^{6}$ |
| k | kilo | $10^{3}$ |
| h | hekto | $10^{2}$ |
| da | deka | $10^{1}$ |
| d | deci | $10^{-1}$ |
| c | centi | $10^{-2}$ |
| m | milli | $10^{-3}$ |
| µ | mikro | $10^{-6}$ |
| n | nano | $10^{-9}$ |
| p | piko | $10^{-12}$ |
:::

::: exempel "Exempel 2 — Skriv med lämpligt prefix"
**Skriv med lämpligt prefix<br>a) 2 000 000 000 000 B&emsp;&emsp;b) 0,0047 l&emsp;&emsp;c) 270 000 N&emsp;&emsp;d) 0,000082 g**

**a)** Ett bra första steg är att skriva talet i grundpotensform:

$$
2\,000\,000\,000\,000\ \mathrm{B} = 2{,}0 \cdot 10^{12}\ \mathrm{B}
$$

Därefter byter du ut tiopotensen mot sitt prefix. $10^{12}$ byts här ut mot
T (se tabellen ovan).

**Svar:** 2,0 TB

**b)** Grundpotensform och prefix:

$$
0{,}0047\ \mathrm{l} = 4{,}7 \cdot 10^{-3}\ \mathrm{l} = 4{,}7\ \mathrm{ml}
$$

**Svar:** 4,7 ml

**c)** I grundpotensform: $270\,000\ \mathrm{N} = 2{,}7 \cdot 10^5\ \mathrm{N}$.

Vi har inget prefix för $10^5$. Vi skriver om talet med en tiopotens i
närheten som vi har prefix för, t.ex. $10^6$. **OBS!** När vi ökar
tiopotensen från $10^5$ till $10^6$ gör vi tiopotensen 10 gånger så stor.
För att talet ska behålla sin storlek måste vi samtidigt göra talet framför
tiopotensen 10 "gånger så litet", dvs. 2,7 ska då ändras till
$\frac{2{,}7}{10} = 0{,}27$:

$$
2{,}7 \cdot 10^5\ \mathrm{N} = 0{,}27 \cdot 10^6\ \mathrm{N} = 0{,}27\ \mathrm{MN}
$$

**Svar:** 0,27 MN

**d)** Grundpotensform, justering till en tiopotens med prefix och byte
till prefixet:

$$
0{,}000082\ \mathrm{g} = 8{,}2 \cdot 10^{-5}\ \mathrm{g} = 82 \cdot 10^{-6}\ \mathrm{g} = 82\ \mathrm{µg}
$$

**Svar:** 82 µg
:::

::: exempel "Exempel 3 — Skriv utan prefix"
**Skriv 5 MHz utan prefix.**

Ersätt prefixet med sin tiopotens:

$$
5\ \mathrm{MHz} = 5 \cdot 10^6\ \mathrm{Hz}
$$

**Svar:** $5 \cdot 10^6$ Hz (5 000 000 Hz)
:::

::: exempel "Exempel 4 — Hårddisken"
**Josefin har köpt en extern hårddisk på 2,0 TB. Hur många videofiler får
plats på den om en fil i genomsnitt är 4,0 GB?**

Vi ska ta reda på hur många filer med storleken 4,0 GB som får plats på en
hårddisk med storleken 2,0 TB. Vi ska alltså dividera hårddiskens storlek
med storleken hos en fil för att få antalet. För att få det korrekta
antalet behöver vi göra om det till samma enhet i täljare och nämnare,
t.ex. genom att skriva om prefixen som tiopotenser:

$$
\text{antal filer} = \frac{2{,}0\ \mathrm{TB}}{4{,}0\ \mathrm{GB}}
= \frac{2{,}0 \cdot 10^{12}\ \mathrm{B}}{4{,}0 \cdot 10^{9}\ \mathrm{B}}
= 0{,}5 \cdot 10^3 = 500\ \text{st}
$$

**Svar:** 500 st
:::
