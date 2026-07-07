---
id: ma2c-5.2
title: Tiologaritmer
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.2'
---

# Tiologaritmer

Det tal som 10 ska upphöjas till ("tians exponent") för att bli ett
visst värde kallas **tiologaritm**, skrivs "lg" och utläses ofta
"tiologaritmen för". Logaritmer går att se som den inversa (bakvända)
operationen till att upphöja och används för att lösa
exponentialekvationer algebraiskt.

Vi börjar med några enkla exempel för att förstå skrivsättet.

- lg 100 betyder "det tal som 10 ska upphöjas till för att bli 100".
  Eftersom $10^2 = 100$ gäller alltså att $\lg 100 = 2$.
- lg 1 betyder "det tal som 10 ska upphöjas till för att bli 1".
  Eftersom $10^0 = 1$ gäller $\lg 1 = 0$.
- lg 0,01 betyder "det tal som 10 ska upphöjas till för att bli 0,01".
  Eftersom $10^{-2} = \frac{1}{10^2} = 0{,}01$ gäller
  $\lg 0{,}01 = -2$.

Upptäck mönstret för tiologaritmer för jämna potenser av 10:

| | | |
| --- | --- | --- |
| lg 1 000 | $= \lg 10^3$ | $= 3$ |
| lg 100 | $= \lg 10^2$ | $= 2$ |
| lg 10 | $= \lg 10^1$ | $= 1$ |
| lg 1 | $= \lg 10^0$ | $= 0$ |
| lg 0,1 | $= \lg 10^{-1}$ | $= -1$ |
| lg 0,01 | $= \lg 10^{-2}$ | $= -2$ |
| lg 0,001 | $= \lg 10^{-3}$ | $= -3$ |

Tiologaritmer för annat än jämna potenser av 10 är svårare att bestämma
med huvudräkning, men har vi förståelsen för logaritmer kan vi ändå
göra bra uppskattningar.

Säg att vi ska avgöra hur stort lg 42 är. Det betyder alltså vad vi ska
upphöja 10 till för att värdet ska bli 42. Vi vet att $10^1 = 10$ är
för litet. Vi vet också att $10^2 = 100$ är för stort. Alltså måste
exponenten vara någonstans mellan 1 och 2, dvs. lg 42 ligger mellan 1
och 2.

Vi kan få ett exaktare värde genom att slå logaritmen på våra räknare
med knappen **log**. Testa att slå lg 42 på din räknare. Vi får
$\lg 42 = 1{,}623\ldots \approx 1{,}62$.

Som vi förutsåg hamnade värdet mellan 1 och 2, närmare bestämt ungefär
1,62. Detta betyder att $42 \approx 10^{1{,}62}$.

Om vi vill ha en exakt likhet, så behåller vi logaritmen i exponenten,
dvs.

$$
42 = 10^{\lg 42}
$$

::: formel "Tiologaritm — Definition"
$$
a = 10^x \iff x = \lg a \qquad \text{där } a > 0
$$
:::

::: formel "Skriva ett tal med basen 10"
$$
a = 10^{\lg a} \qquad \text{där } a > 0
$$
:::

Det tal vi tar logaritmen för måste vara större än 0 eftersom vi aldrig
kan upphöja 10 till något och få ett negativt värde. Ju mindre värde
tians exponent har desto närmare 0 kommer vi, men det blir aldrig 0
eller negativt: $10^{-3} = \frac{1}{1\,000} = 0{,}001$ och
$10^{-6} = \frac{1}{1\,000\,000} = 0{,}000\,001$ och så vidare.

::: exempel "Exempel 1 — Bestäm utan räknare"
**Bestäm utan räknare<br>a) $\lg 10\,000$&emsp;&emsp;b) $\lg 10^{-5}$&emsp;&emsp;c) $\lg \sqrt{10}$**

**a)** Vi tänker "Vad ska vi upphöja 10 till för att det ska bli
10 000? Jo, 4."

**Svar:** 4

**b)** Vi tänker "Vad ska vi upphöja 10 till för att det ska bli
$10^{-5}$? Jo, −5."

**Svar:** −5

**c)** Vi tänker "Vad ska vi upphöja 10 till för att det ska bli
$\sqrt{10}$?" Svaret till denna fråga kanske inte är lika självklart.
Kom ihåg att dra kvadratroten ur är samma sak som att upphöja till en
halv, så $\sqrt{10} = 10^{1/2}$. Vi ska alltså upphöja 10 till
$\frac{1}{2}$ för att svaret ska bli $\sqrt{10}$.

**Svar:** $\dfrac{1}{2}$
:::

::: exempel "Exempel 2 — Skriv som en potens med basen 10"
**Skriv som en potens med basen 10.<br>a) 4&emsp;&emsp;b) 75**

**a)** Den exponent vi ska upphöja 10 till för att det ska bli 4 kan
skrivas lg 4. Så

$$
10^{\lg 4} = 4
$$

**Svar:** $10^{\lg 4}$

**b)** På motsvarande sätt som i a-uppgiften gäller $75 = 10^{\lg 75}$.

**Svar:** $10^{\lg 75}$
:::

::: exempel "Exempel 3 — Beräkna utan räknare"
**Beräkna utan räknare $10^{\lg 9} - \dfrac{3 \cdot 10^{\lg 3}}{\lg 10}$.**

Vi förenklar de olika logaritmerna:

$$
10^{\lg 9} = 9
$$

$$
10^{\lg 3} = 3
$$

$$
\lg 10 = 1 \quad \text{(lg 10 betyder vad vi ska upphöja 10 till för att det ska bli 10, alltså 1)}
$$

Insättning av dessa förenklade värden ger

$$
10^{\lg 9} - \frac{3 \cdot 10^{\lg 3}}{\lg 10} = 9 - \frac{3 \cdot 3}{1} = 9 - 9 = 0
$$

**Svar:** 0
:::
