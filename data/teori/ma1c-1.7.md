---
id: ma1c-1.7
title: Negativa exponenter och exponenten noll
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.7'
---

# Negativa exponenter och exponenten noll

## Exponenten noll

$7^3$ betyder att 7 ska multipliceras med sig själv 3 gånger, dvs.
$7^3 = 7 \cdot 7 \cdot 7$. Men hur ska vi tolka exponenten noll, t.ex.
$7^0$?

::: härledning "Undersökning — Tolkning av exponenten noll"
För att undersöka det så studerar vi t.ex. kvoten $\dfrac{7^5}{7^5}$ och
beräknar den på två sätt.

**Med potenslagarna:**

$$
\frac{7^5}{7^5} = 7^{5-5} = 7^0
$$

**Lika stora tal divideras:**

$$
\frac{7^5}{7^5} = 1
$$

Båda sätt är korrekta. Vi ser alltså att $7^0 = 1$. Detta gäller för alla
reella tal. Enda undantaget är 0, eftersom det skulle motsvara en division
med 0. Till exempel: $0^0 = \dfrac{0^5}{0^5} = \dfrac{0}{0}$, som inte är
definierat.
:::

::: formel "Exponenten noll"
$$
a^0 = 1, \quad \text{där } a \neq 0
$$

**Varning!** $7^0 \neq 0$ — värdet är 1, inte 0.
:::

::: exempel "Exempel 1 — Exponenten noll"
**Beräkna<br>a) $25^0$&emsp;&emsp;b) $4^0 + (-7)^0$**

**a)** Varje tal (utom 0) upphöjt till 0 är 1:

$$
25^0 = 1
$$

**Svar:** 1

**b)** Båda termerna är potenser med exponenten 0:

$$
4^0 + (-7)^0 = 1 + 1 = 2
$$

**Svar:** 2
:::

## Negativa exponenter

Hur ska vi tolka negativa exponenter, t.ex. $2^{-3}$? Vi undersöker!

::: härledning "Undersökning — Tolkning av negativa exponenter"
På motsvarande sätt som för exponenten noll, så undersöker vi tolkningen av
negativa tal genom att beräkna t.ex. kvoten $\dfrac{2^2}{2^5}$ på två olika
sätt.

**Med potenslagarna:**

$$
\frac{2^2}{2^5} = 2^{2-5} = 2^{-3}
$$

**Med förkortning av bråk:**

$$
\frac{2^2}{2^5} = \frac{2 \cdot 2}{2 \cdot 2 \cdot 2 \cdot 2 \cdot 2}
= \frac{1}{2 \cdot 2 \cdot 2} = \frac{1}{2^3}
$$

Båda sätt är korrekta. Vi ser alltså att $2^{-3} = \dfrac{1}{2^3}$. Vi kan
upprepa samma resonemang och visa att t.ex. $3^{-7} = \dfrac{1}{3^7}$ och
$5^{-4} = \dfrac{1}{5^4}$. Slutsats: tal upphöjt till negativa tal kan
skrivas som "1 dividerat med samma tal, men utan minustecknet framför
exponenten".
:::

::: formel "Negativa exponenter"
$$
a^{-n} = \frac{1}{a^n}, \quad \text{där } a \neq 0
$$
:::

::: exempel "Exempel 2 — Negativa exponenter"
**Beräkna utan räknare<br>a) $4^{-2}$&emsp;&emsp;b) $5^{-1}$**

**a)** Negativ exponent betyder "1 delat med potensen utan minustecken":

$$
4^{-2} = \frac{1}{4^2} = \frac{1}{16}
$$

**Svar:** $\dfrac{1}{16}$

**b)** På samma sätt:

$$
5^{-1} = \frac{1}{5^1} = \frac{1}{5}
$$

**Svar:** $\dfrac{1}{5}$
:::

::: exempel "Exempel 3 — Skriv i potensform"
**Skriv $\dfrac{1}{3^5}$ i potensform.**

Vi ska skriva $\dfrac{1}{3^5}$ som *en* potens. Eftersom
$3^{-5} = \dfrac{1}{3^5}$ måste givetvis det omvända gälla. Så

$$
\frac{1}{3^5} = 3^{-5}
$$

**Svar:** $3^{-5}$
:::

::: exempel "Exempel 4 — Flytta upp nämnaren"
**Skriv $\dfrac{5}{x}$ som en potens med basen $x$.**

Ett alternativt sätt att tänka när vi ska skriva om bråk som potenser är
att "flytta upp" nämnaren till täljaren. Samtidigt som vi gör det ska vi
byta tecken på exponenten, så

$$
\frac{5}{x} = \frac{5}{x^1} = 5x^{-1}
$$

**Svar:** $5x^{-1}$
:::

## Upphöja bråk till −1

::: formel "Upphöja bråk till −1"
Att upphöja bråk till (−1) är samma sak som att **invertera** bråket.
:::

::: härledning "Bevis — Upphöja bråk till (−1) är samma sak som bråkets invers"
Vi studerar bråket $\left(\dfrac{a}{b}\right)^{-1}$. Enligt reglerna för
negativa exponenter och division av bråk gäller

$$
\left(\frac{a}{b}\right)^{-1}
= \dfrac{1}{\left(\dfrac{a}{b}\right)^{1}}
= \dfrac{1}{\;\dfrac{a}{b}\;}
= 1 \cdot \frac{b}{a}
= \frac{b}{a}
$$

dvs. $\left(\dfrac{a}{b}\right)^{-1} = \dfrac{b}{a}$, vsv.
:::

::: exempel "Exempel 5 — Bråk med negativa exponenter"
**Beräkna<br>a) $\left(\dfrac{3}{4}\right)^{-1}$&emsp;&emsp;b) $\left(\dfrac{4}{5}\right)^{-2}$**

**a)** Att upphöja till −1 är samma sak som att invertera bråket:

$$
\left(\frac{3}{4}\right)^{-1} = \frac{4}{3}
$$

**Svar:** $\dfrac{4}{3}$

**b)** Invertera bråket och byt tecken på exponenten — sedan är det en
vanlig potens:

$$
\left(\frac{4}{5}\right)^{-2} = \left(\frac{5}{4}\right)^{2}
= \frac{5^2}{4^2} = \frac{25}{16}
$$

**Svar:** $\dfrac{25}{16}$
:::
