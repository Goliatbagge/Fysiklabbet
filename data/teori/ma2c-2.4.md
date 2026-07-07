---
id: ma2c-2.4
title: pq-formeln
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.4'
---

# pq-formeln

Ekvationer som innehåller $x^2$-termer, $x$-termer **och**
konstanttermer kan vi varken lösa med vår vanliga metod eller med
nollproduktmetoden. Dessa ekvationer löser vi med **pq-formeln**.

::: formel "pq-formeln"
$$
x^2 + px + q = 0
$$

har lösningarna

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$
:::

Formeln med ord: först **halva koefficienten framför $x$-termen med
ombytt tecken**, sedan plus/minus roten ur **föregående tal upphöjt
till 2** (eventuellt minustecken innan kan bortses) **minus
konstanttermen med ombytt tecken**.

**OBS!** En förutsättning för att pq-formeln ska kunna användas är att
ekvationen är lika med 0 **och** att vi inte har någon koefficient
framför $x^2$-termen.

::: härledning "Härledning — pq-formeln"
Vi utgår från ekvationen

$$
x^2 + px + q = 0
$$

Vi subtraherar båda led med $q$ för att få $x$-termerna ensamma i VL:

$$
x^2 + px = -q
$$

Vi adderar $\left(\dfrac{p}{2}\right)^2$ till båda led, så att VL kan
skrivas som en kvadreringsregel:

$$
x^2 + px + \left(\frac{p}{2}\right)^2 = \left(\frac{p}{2}\right)^2 - q
$$

$$
\left(x + \frac{p}{2}\right)^2 = \left(\frac{p}{2}\right)^2 - q
$$

Vi drar roten ur båda led och löser sedan ut $x$:

$$
x + \frac{p}{2} = \pm\sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

v.s.b.
:::

::: exempel "Exempel 1 — Lös ekvationerna"
**Lös ekvationerna<br>a) $x^2 + 6x - 7 = 0$&emsp;&emsp;b) $3x^2 - 15x + 18 = 0$&emsp;&emsp;c) $x^2 = 39 - 10x$**

**a)** Vi identifierar $p$ och $q$: $p = 6$ och $q = -7$.

Insättning av dessa i pq-formeln ger

$$
x = -\frac{6}{2} \pm \sqrt{\left(\frac{6}{2}\right)^2 - (-7)}
$$

$$
x = -3 \pm \sqrt{3^2 + 7} = -3 \pm \sqrt{9 + 7} = -3 \pm \sqrt{16} = -3 \pm 4
$$

Detta ger lösningarna

$$
x_1 = -3 - 4 = -7
$$

$$
x_2 = -3 + 4 = 1
$$

**Svar:** $x_1 = -7$ och $x_2 = 1$

Kommentar — snabbare lösning "med ord": halva koefficienten framför
$x$-termen med ombytt tecken är $-3$; under rottecknet skrivs
föregående tal (3) upphöjt till 2, och konstanttermen med ombytt tecken
($-7$ blir $+7$). Så kan vi direkt skriva $x = -3 \pm \sqrt{3^2 + 7}$.

**b)** För att kunna använda pq-formeln dividerar vi båda led med 3 för
att få bort koefficienten framför $x^2$-termen:

$$
x^2 - 5x + 6 = 0
$$

pq-formeln ger

$$
x = \frac{5}{2} \pm \sqrt{\left(\frac{5}{2}\right)^2 - 6} = \frac{5}{2} \pm \sqrt{\frac{25}{4} - \frac{24}{4}} = \frac{5}{2} \pm \sqrt{\frac{1}{4}} = \frac{5}{2} \pm \frac{1}{2}
$$

Detta ger lösningarna

$$
x_1 = \frac{5}{2} - \frac{1}{2} = \frac{4}{2} = 2
$$

$$
x_2 = \frac{5}{2} + \frac{1}{2} = \frac{6}{2} = 3
$$

**Svar:** $x_1 = 2$ och $x_2 = 3$

**c)** För att kunna använda pq-formeln gör vi om ekvationen så att ena
ledet blir lika med 0:

$$
x^2 + 10x - 39 = 0
$$

Nu använder vi pq-formeln:

$$
x = -5 \pm \sqrt{5^2 + 39} = -5 \pm \sqrt{64} = -5 \pm 8
$$

Detta ger lösningarna

$$
x_1 = -5 - 8 = -13
$$

$$
x_2 = -5 + 8 = 3
$$

**Svar:** $x_1 = -13$ och $x_2 = 3$
:::
