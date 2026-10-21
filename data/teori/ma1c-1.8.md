---
id: ma1c-1.8
title: Rationella exponenter
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.8'
---

# Rationella exponenter

En exponent som innehåller ett bråk kallas **rationell exponent**. Hur ska
vi tolka rationella exponenter, till exempel $25^{1/2}$?

::: formel "Rationella exponenter"
$$
a^{1/n} = \sqrt[n]{a}
$$

::: härledning "Undersökning — Tolkning av rationella exponenter"
Vi bildar till exempel talet 25 på två sätt.

**Med potenslagarna:**

$$
\left(25^{1/2}\right)^2 = 25^{(1/2) \cdot 2} = 25^{2/2} = 25^1 = 25
$$

**Med rötter:**

$$
\left(\sqrt{25}\right)^2 = 5^2 = 25
$$

Båda sätt är korrekta. Vi ser alltså att $25^{1/2} = \sqrt{25}$.

På motsvarande sätt gäller

$$
\left(27^{1/3}\right)^3 = 27^{3/3} = 27^1 = 27
$$

$$
\left(\sqrt[3]{27}\right)^3 = 3^3 = 3 \cdot 3 \cdot 3 = 27
$$

det vill säga $27^{1/3} = \sqrt[3]{27}$.
:::
:::

::: exempel "Exempel 1 — Beräkna utan räknare"
**Beräkna utan räknare<br>a)&nbsp;$49^{1/2}$&emsp;&emsp;b)&nbsp;$5 \cdot 8^{1/3}$&emsp;&emsp;c)&nbsp;$27^{2/3}$**

::: handskrift
typ: rotberakna
:::

::: textlosning
**a)** Exponenten $\dfrac{1}{2}$ betyder kvadratroten:

$$
49^{1/2} = \sqrt{49} = 7
$$

**Svar:** 7

**b)** Exponenten $\dfrac{1}{3}$ betyder tredjeroten (kubikroten):

$$
5 \cdot 8^{1/3} = 5 \cdot \sqrt[3]{8} = 5 \cdot 2 = 10
$$

**Svar:** 10

**c)** Vi delar upp exponenten med potenslagen "potens av potens":

$$
27^{2/3} = \left(27^{1/3}\right)^2 = \left(\sqrt[3]{27}\right)^2 = 3^2 = 9
$$

**Svar:** 9
:::
:::

::: exempel "Exempel 2 — Förenkla med potenslagarna"
**Förenkla $\dfrac{x^{\frac{7}{2}}}{x^3}$.**

::: handskrift
typ: rotforenkla
:::

::: textlosning
Vi använder potenslagen för division och räknar med exponenterna som med
vanliga bråk:

$$
\frac{x^{\frac{7}{2}}}{x^3} = x^{\frac{7}{2} - 3}
= x^{\frac{7}{2} - \frac{6}{2}} = x^{\frac{1}{2}} = \sqrt{x}
$$

**Svar:** $\sqrt{x}$
:::
:::

## Roten ur en produkt och roten ur en kvot

Står det en produkt under rottecknet kan vi dra roten ur varje faktor för
sig och sedan multiplicera. På samma sätt kan roten ur en kvot delas upp i
roten ur täljaren delat med roten ur nämnaren.

::: formel "Roten ur en produkt och roten ur en kvot"
$$
\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}
\qquad\qquad
\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}
$$

Reglerna gäller när $a \geq 0$ och $b \geq 0$ (för kvoten $b > 0$). De
gäller också baklänges: $\sqrt{2} \cdot \sqrt{8} = \sqrt{2 \cdot 8}$.

::: härledning "Härledning — Med potenslagarna"
Kvadratroten är detsamma som exponenten $\dfrac{1}{2}$. Potenslagen
$(a \cdot b)^n = a^n \cdot b^n$ ger då

$$
\sqrt{a \cdot b} = (a \cdot b)^{1/2} = a^{1/2} \cdot b^{1/2} = \sqrt{a} \cdot \sqrt{b}
$$

och potenslagen $\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n}$ ger på samma sätt

$$
\sqrt{\dfrac{a}{b}} = \left(\dfrac{a}{b}\right)^{1/2} = \dfrac{a^{1/2}}{b^{1/2}} = \dfrac{\sqrt{a}}{\sqrt{b}}
$$
:::
:::

::: härledning "OBS! Gäller inte vid addition och subtraktion"
Regeln gäller **bara** för en produkt eller en kvot under rottecknet. Vid
addition och subtraktion får vi inte dra roten ur termerna var för sig:

$$
\sqrt{9 + 16} = \sqrt{25} = 5 \qquad \text{men} \qquad \sqrt{9} + \sqrt{16} = 3 + 4 = 7
$$

$$
\sqrt{25 - 16} = \sqrt{9} = 3 \qquad \text{men} \qquad \sqrt{25} - \sqrt{16} = 5 - 4 = 1
$$

Alltså är $\sqrt{9 + 16} \neq \sqrt{9} + \sqrt{16}$. Räkna först ut summan
eller differensen under rottecknet och dra roten ur först därefter.
:::

::: exempel "Exempel 3 — Roten ur en produkt och en kvot"
**Beräkna utan räknare<br>a)&nbsp;$\sqrt{4 \cdot 49}$&emsp;&emsp;b)&nbsp;$\sqrt{\dfrac{9}{25}}$&emsp;&emsp;c)&nbsp;$\sqrt{2} \cdot \sqrt{8}$**

::: handskrift
typ: rotprodukt
:::

::: textlosning
**a)** Roten ur en produkt är roten ur varje faktor för sig:

$$
\sqrt{4 \cdot 49} = \sqrt{4} \cdot \sqrt{49} = 2 \cdot 7 = 14
$$

**Svar:** 14

**b)** Roten ur en kvot är roten ur täljaren delat med roten ur nämnaren:

$$
\sqrt{\dfrac{9}{25}} = \dfrac{\sqrt{9}}{\sqrt{25}} = \dfrac{3}{5}
$$

**Svar:** $\dfrac{3}{5}$

**c)** Varken 2 eller 8 har en jämn kvadratrot. Regeln gäller även
baklänges, så vi samlar allt under ett rottecken:

$$
\sqrt{2} \cdot \sqrt{8} = \sqrt{2 \cdot 8} = \sqrt{16} = 4
$$

**Svar:** 4
:::
:::

## Lyfta ut och lyfta in en faktor

Regeln för roten ur en produkt gör att vi kan förenkla en rot. Vi delar
upp talet under rottecknet i en kvadrat (4, 9, 16, 25 …) gånger ett annat
tal, och drar sedan roten ur kvadraten för sig:

$$
\sqrt{45} = \sqrt{9 \cdot 5} = \sqrt{9} \cdot \sqrt{5} = 3\sqrt{5}
$$

Vi säger att vi **lyfter ut** faktorn 3 ur rottecknet. Det går också åt
andra hållet: en faktor framför roten **lyfts in** genom att den kvadreras,

$$
3\sqrt{5} = \sqrt{9} \cdot \sqrt{5} = \sqrt{9 \cdot 5} = \sqrt{45}
$$

::: formel "Lyfta ut och lyfta in en faktor"
$$
\sqrt{a^2 \cdot b} = a\sqrt{b}
$$

Regeln gäller när $a \geq 0$ och $b \geq 0$. Läs den från vänster till
höger när en faktor lyfts ut och från höger till vänster när den lyfts in.
:::

::: exempel "Exempel 4 — Lyfta ut och lyfta in"
**Förenkla genom att lyfta ut en faktor ur rottecknet.<br>a)&nbsp;$\sqrt{12}$&emsp;&emsp;b)&nbsp;$\sqrt{50}$<br>c)&nbsp;Skriv $2\sqrt{7}$ som roten ur ett enda tal.**

::: handskrift
typ: rotlyft
:::

::: textlosning
**a)** Kvadraten 4 går jämnt upp i 12, eftersom $12 = 4 \cdot 3$:

$$
\sqrt{12} = \sqrt{4 \cdot 3} = \sqrt{4} \cdot \sqrt{3} = 2\sqrt{3}
$$

**Svar:** $2\sqrt{3}$

**b)** Kvadraten 25 går jämnt upp i 50, eftersom $50 = 25 \cdot 2$:

$$
\sqrt{50} = \sqrt{25 \cdot 2} = \sqrt{25} \cdot \sqrt{2} = 5\sqrt{2}
$$

**Svar:** $5\sqrt{2}$

**c)** Faktorn 2 är roten ur 4, så den lyfts in som 4:

$$
2\sqrt{7} = \sqrt{4} \cdot \sqrt{7} = \sqrt{4 \cdot 7} = \sqrt{28}
$$

**Svar:** $\sqrt{28}$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Rationella exponenter"
- En exponent som är ett bråk.
- $a^{1/n} = \sqrt[n]{a}$
- $25^{1/2} = \sqrt{25} = 5$ och
  $27^{1/3} = \sqrt[3]{27} = 3$.
:::

::: sampunkt "Varför det stämmer"
- $\left(25^{1/2}\right)^{2} = 25^{1} = 25$ enligt potenslagarna.
- $\left(\sqrt{25}\right)^{2} = 25$ enligt rotdefinitionen.
- Alltså måste $25^{1/2}$ och $\sqrt{25}$ vara samma tal.
:::

::: sampunkt "Allmän form"
- $a^{m/n} = \sqrt[n]{a^m}
  = \left(\sqrt[n]{a}\right)^{m}$.
- **Nämnaren** är rotens ordning, **täljaren** är exponenten.
- $27^{2/3} = \left(\sqrt[3]{27}\right)^{2} = 3^2 = 9$.
:::

::: sampunkt "Rötter ur produkt och kvot"
- $\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$ och $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$.
- $\sqrt{4 \cdot 49} = 2 \cdot 7 = 14$.
- Lyfta ut: $\sqrt{45} = \sqrt{9} \cdot \sqrt{5} = 3\sqrt{5}$.
- **Inte** vid $+$ och $-$: $\sqrt{9 + 16} = 5$, men $\sqrt{9} + \sqrt{16} = 7$.
:::

::: sampunkt "Räkna med dem"
- Alla potenslagar gäller precis som vanligt, även med bråkexponenter.
- $\dfrac{x^{\frac{7}{2}}}{x^{3}} = x^{\frac{7}{2} - 3}
  = x^{\frac{1}{2}} = \sqrt{x}$.
:::
:::
