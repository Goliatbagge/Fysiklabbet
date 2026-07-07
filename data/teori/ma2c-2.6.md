---
id: ma2c-2.6
title: Antal lösningar till en andragradsekvation
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.6'
---

# Antal lösningar till en andragradsekvation

pq-formeln säger att ekvationen $x^2 + px + q = 0$ har lösningarna

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

Uttrycket under rottecknet, $\left(\dfrac{p}{2}\right)^2 - q$, kallas
**diskriminant**. Genom att undersöka diskriminantens tecken kan vi
avgöra hur många lösningar ekvationen har.

::: härledning "Undersökning — Diskriminantens tecken"
**Positiv diskriminant.** Ekvationen $x^2 + 6x - 7 = 0$ har lösningarna

$$
x = -3 \pm \sqrt{3^2 + 7} = -3 \pm \sqrt{16}
$$

Vi har en **positiv diskriminant** (16) och vi får **två lösningar**
($x = -3 \pm 4$).

**Diskriminanten 0.** Ekvationen $x^2 + 6x + 9 = 0$ har lösningarna

$$
x = -3 \pm \sqrt{3^2 - 9} = -3 \pm \sqrt{0}
$$

Vi har **diskriminanten 0** och vi får **en lösning** ($x = -3$).

**Negativ diskriminant.** Ekvationen $x^2 + 6x + 18 = 0$ har
lösningarna

$$
x = -3 \pm \sqrt{3^2 - 18} = -3 \pm \sqrt{-9}
$$

Vi har en **negativ diskriminant** (−9) och ekvationen **saknar
lösningar** eftersom vi inte kan ta kvadratroten ur ett negativt tal
(inget tal multiplicerat med sig själv blir −9).
:::

Vi sammanfattar undersökningen:

| Om diskriminanten är … | … har ekvationen … |
| --- | --- |
| positiv | två lösningar |
| noll | en lösning |
| negativ | noll lösningar |

::: exempel "Exempel 1 — Ange antalet lösningar"
**Ange antalet lösningar till<br>a) $x^2 + 12x - 13 = 0$&emsp;&emsp;b) $x^2 + 5x + 8 = 0$**

**a)** pq-formeln ger

$$
x = -6 \pm \sqrt{6^2 + 13} = -6 \pm \sqrt{36 + 13} = -6 \pm \sqrt{49}
$$

Diskriminanten (talet under rottecknet) är **positiv** (49). Alltså har
ekvationen **två lösningar**.

**Svar:** 2

**b)** pq-formeln ger

$$
x = -2{,}5 \pm \sqrt{2{,}5^2 - 8} = -2{,}5 \pm \sqrt{6{,}25 - 8} = -2{,}5 \pm \sqrt{-1{,}75}
$$

Diskriminanten är **negativ**. Alltså **saknar** ekvationen lösningar.

**Svar:** 0
:::

::: exempel "Exempel 2 — Dubbelrot"
**För vilka värden på $a$ gäller att ekvationen $x^2 - 8x + a = 0$ har
en enda lösning (en så kallad dubbelrot)?**

För att ekvationen ska ha en enda lösning ska diskriminanten vara lika
med 0. Vi påbörjar en lösning med pq-formeln:

$$
x = 4 \pm \sqrt{4^2 - a}
$$

Vi sätter nu diskriminanten lika med 0 och löser ekvationen:

$$
4^2 - a = 0
$$

$$
16 - a = 0
$$

$$
16 = a
$$

Vi får alltså en enda lösning när $a = 16$.

**Svar:** $a = 16$
:::
