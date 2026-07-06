---
id: ma1c-2.11
title: Olikheter
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.11'
---

# Olikheter

När två led är lika har vi en **ekvation** (likhet) som skrivs med
likhetstecken, =. När två led är olika har vi en **olikhet** som skrivs med
olikhetstecken. Det finns flera olikhetstecken.

::: formel "Olikhetstecken"
| Tecken | Betydelse |
| --- | --- |
| < | mindre än |
| > | större än |
| ≤ | mindre än eller lika med |
| ≥ | större än eller lika med |

Exempel: $3x - 4 = 2$ är en *ekvation*. $3x - 4 < 2$ är en *olikhet*.
:::

Tolkningen av olikhetstecknen gäller om vi läser från vänster till höger.
Vi utläser alltså $3 < 5$ som "3 är mindre än 5".

En kom ihåg-regel är att olikhetstecknet "gapar åt" det *större* värdet. En
annan är att man ser det som en pil som pekar på det *mindre* värdet.

::: formel "Lösa olikheter"
Olikheter löses på samma sätt som ekvationer, men olikhetstecknet **vänds**
vid *division eller multiplikation med negativa tal*. Olikheter av andra
graden löser vi genom att undersöka gränsfallet (se exemplet nedan).
:::

::: härledning "Undersökning — Olikhetstecknets vändning"
Vi vet att $5 > 3$.

Om vi multiplicerar eller dividerar med ett negativt tal, t.ex. (−1), får
vi

$$
5 \cdot (-1) > 3 \cdot (-1)
$$

$$
-5 > -3
$$

Men detta är ju falskt eftersom −5 är *mindre* än −3. Alltså måste
olikhetstecknet vändas, dvs. $-5 < -3$, vid multiplikation och division
med negativa tal.
:::

::: exempel "Exempel 1 — Lös olikheterna"
**Lös<br>a) $3x - 5 < 22$&emsp;&emsp;b) $7(6 - x) \leq 105$&emsp;&emsp;c) $\dfrac{6a}{5} > 3a - 18$**

**a)** Vi adderar 5 till båda led:

$$
3x - 5 + 5 < 22 + 5
$$

$$
3x < 27
$$

Vi dividerar båda led med 3:

$$
\frac{3x}{3} < \frac{27}{3}
$$

$$
x < 9
$$

**Svar:** $x < 9$

**b)** Vi utvecklar parentesen:

$$
42 - 7x \leq 105
$$

Vi subtraherar 42 från båda led:

$$
42 - 7x - 42 \leq 105 - 42
$$

$$
-7x \leq 63
$$

Vi dividerar med (−7) i båda led. Eftersom vi dividerar med ett negativt
tal ska olikhetstecknet vändas:

$$
\frac{-7x}{-7} \geq \frac{63}{-7}
$$

$$
x \geq -9
$$

**Svar:** $x \geq -9$

**c)** Vi multiplicerar båda led med 5 (vilket motsvarar täljaren = kvoten
· nämnaren):

$$
6a > 5(3a - 18)
$$

$$
6a > 15a - 90
$$

Vi har variabeltermer på båda sidor. Vi tar bort $a$-termen från VL och
löser sedan som vanligt. Subtraherar $6a$ från båda led:

$$
0 > 9a - 90
$$

Adderar 90 till båda led:

$$
90 > 9a
$$

Dividerar med 9:

$$
\frac{90}{9} > \frac{9a}{9}
$$

$$
10 > a
$$

När vi svarar med en olikhet vill vi som regel ha variabeln till vänster
om olikhetstecknet. När vi nu vänder på "10" och "$a$" måste också
olikhetstecknet vändas, dvs. $a < 10$.

**Svar:** $a < 10$
:::

::: exempel "Exempel 2 — Olikheter av andra graden"
**Lös<br>a) $x^2 < 9$&emsp;&emsp;b) $x^2 > 9$**

**a)** Att lösa olikheter av andra graden gör vi på ett annat sätt. Vi
undersöker vad som gäller på gränsen av intervallet.

På gränsen av intervallet är $x^2 = 9$, där lösningen är
$x = \pm\sqrt{9} = \pm 3$.

Vi ritar en tallinje och placerar punkter vid $x = -3$ och $x = 3$. För
att $x^2 < 9$ gäller nu att $x$ måste vara *mellan* −3 och 3, vilket vi
kan åskådliggöra med en sträcka däremellan:

::: figur
<svg viewBox="20 16 424 38" width="424" height="38" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En tallinje från minus 6 till 6 med öppna ringar vid minus 3 och 3 och en markerad sträcka mellan dem: lösningen är alla tal mellan minus 3 och 3."><line x1="32" y1="28" x2="428" y2="28" stroke="#1f2530" stroke-width="1.4"/><line x1="38" y1="24" x2="38" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="38" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−6</text><line x1="70" y1="24" x2="70" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="70" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><line x1="102" y1="24" x2="102" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="102" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><line x1="134" y1="24" x2="134" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="134" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="166" y1="24" x2="166" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="166" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="198" y1="24" x2="198" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="198" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="230" y1="24" x2="230" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="230" y="46" font-size="12" text-anchor="middle" fill="#1f2530">0</text><line x1="262" y1="24" x2="262" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="262" y="46" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="294" y1="24" x2="294" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="294" y="46" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="326" y1="24" x2="326" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="326" y="46" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="358" y1="24" x2="358" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="358" y="46" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="390" y1="24" x2="390" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="390" y="46" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="422" y1="24" x2="422" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="422" y="46" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="140" y1="28" x2="320" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><circle cx="134" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="326" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/></svg>
:::

Detta intervall beskrivs av $-3 < x < 3$.

**Svar:** $-3 < x < 3$

**b)** Vi studerar gränsen av intervallet, som återigen är $x^2 = 9$ där
lösningen är $x = \pm\sqrt{9} = \pm 3$. På motsvarande sätt som i
a-uppgiften placerar vi punkter vid $x = -3$ och $x = 3$.

För att $x^2 > 9$ gäller nu att $x$ måste vara *större än 3* eller
*mindre än −3*, vilket kan åskådliggöras med strålarna nedan:

::: figur
<svg viewBox="20 16 424 38" width="424" height="38" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En tallinje från minus 6 till 6 med öppna ringar vid minus 3 och 3 och markerade strålar utåt från dem: lösningen är alla tal mindre än minus 3 eller större än 3."><line x1="32" y1="28" x2="428" y2="28" stroke="#1f2530" stroke-width="1.4"/><line x1="38" y1="24" x2="38" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="38" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−6</text><line x1="70" y1="24" x2="70" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="70" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><line x1="102" y1="24" x2="102" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="102" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><line x1="134" y1="24" x2="134" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="134" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="166" y1="24" x2="166" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="166" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="198" y1="24" x2="198" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="198" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="230" y1="24" x2="230" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="230" y="46" font-size="12" text-anchor="middle" fill="#1f2530">0</text><line x1="262" y1="24" x2="262" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="262" y="46" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="294" y1="24" x2="294" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="294" y="46" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="326" y1="24" x2="326" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="326" y="46" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="358" y1="24" x2="358" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="358" y="46" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="390" y1="24" x2="390" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="390" y="46" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="422" y1="24" x2="422" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="422" y="46" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="36" y1="28" x2="128" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><polygon points="24,28 36,23 36,33" fill="#2563c9"/><line x1="332" y1="28" x2="424" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><polygon points="436,28 424,23 424,33" fill="#2563c9"/><circle cx="134" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="326" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/></svg>
:::

Dessa intervall beskrivs av $x < -3$ och $x > 3$.

**Svar:** $x < -3$ och $x > 3$.
:::
