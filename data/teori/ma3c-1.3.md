---
id: ma3c-1.3
title: Multiplikation och division av rationella uttryck
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.3'
---

# Multiplikation och division av rationella uttryck

För multiplikation och division av rationella uttryck gäller samma regler
som för multiplikation och division av bråk — skillnaden är att täljare och
nämnare nu är polynom. Precis som vid förkortning behöver vi ofta
**faktorisera** först för att kunna förenkla resultatet så långt som
möjligt.

::: formel "Multiplikation av rationella uttryck"
Vid multiplikation av två rationella uttryck multipliceras täljarna med
varandra och nämnarna med varandra:

$$
\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}
$$

Faktorisera gärna täljare och nämnare **innan** du multiplicerar ihop dem —
det gör det lättare att se vilka faktorer som senare kan förkortas bort.
:::

::: exempel "Exempel 1 — Multiplikation av rationella uttryck"
**Förenkla<br>a) $\dfrac{3}{8-x}\cdot\dfrac{x^2+5}{6}$&emsp;&emsp;b) $\dfrac{3x+6}{x-2}\cdot\dfrac{x^2-4}{3}$**

**a)** Vi multiplicerar täljare med täljare och nämnare med nämnare:

$$
\frac{3}{8-x}\cdot\frac{x^2+5}{6} = \frac{3(x^2+5)}{6(8-x)}
$$

Förkortar med 3:

$$
\frac{3(x^2+5)}{6(8-x)} = \frac{x^2+5}{2(8-x)} = \frac{x^2+5}{16-2x}
$$

**Svar:** $\dfrac{x^2+5}{2(8-x)} = \dfrac{x^2+5}{16-2x}$

**b)** Vi faktoriserar täljare och nämnare så långt det går, multiplicerar
ihop dem och förkortar därefter med lika dana faktorer. Täljaren $3x+6$
bryts ut till $3(x+2)$, och nämnaren $x^2-4$ är en konjugat:
$x^2-4=(x+2)(x-2)$.

$$
\frac{3x+6}{x-2}\cdot\frac{x^2-4}{3} = \frac{3(x+2)}{x-2}\cdot\frac{(x+2)(x-2)}{3}
= \frac{3(x+2)(x+2)(x-2)}{3(x-2)}
$$

Förkortar med $3(x-2)$:

$$
\frac{3(x+2)(x+2)(x-2)}{3(x-2)} = (x+2)(x+2) = (x+2)^2 = x^2+4x+4
$$

**Svar:** $(x+2)^2 = x^2+4x+4$
:::

## Division av rationella uttryck

::: formel "Division av rationella uttryck"
Vid division med ett rationellt uttryck byter man ut det stora
divisionstecknet mot multiplikation, samtidigt som man **inverterar**
(byter plats på täljare och nämnare i) uttrycket i nämnaren. Sedan
förenklas det som vanligt:

$$
\frac{a}{b} \Big/ \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}
$$
:::

::: exempel "Exempel 2 — Division av rationella uttryck"
**Förenkla $\dfrac{3x}{x+7} \Big/ \dfrac{5x}{x-2}$.**

Vi byter ut divisionstecknet mot multiplikation och inverterar uttrycket i
nämnaren:

$$
\frac{3x}{x+7}\cdot\frac{x-2}{5x} = \frac{3x(x-2)}{5x(x+7)}
$$

Förkortar med $x$:

$$
\frac{3x(x-2)}{5x(x+7)} = \frac{3(x-2)}{5(x+7)} = \frac{3x-6}{5x+35}
$$

**Svar:** $\dfrac{3(x-2)}{5(x+7)} = \dfrac{3x-6}{5x+35}$
:::

## Ekvationer med rationella uttryck

Multiplikations- och divisionsreglerna används också när vi löser
**ekvationer** som innehåller rationella uttryck. Ett viktigt förbehåll:
eftersom division med noll inte är definierad måste vi alltid utesluta de
värden på $x$ som gör någon nämnare i ekvationen lika med noll.

::: exempel "Exempel 3 — Lös en ekvation med rationella uttryck"
**Lös ekvationen $\dfrac{x-2}{x-3} = \dfrac{x+7}{x}$.**

Eftersom ingen nämnare får vara noll måste $x \neq 3$ och $x \neq 0$.

**Alternativ 1: Multiplicera med MGN**

Vi multiplicerar båda leden med minsta gemensamma nämnaren,
$MGN = x(x-3)$, och förkortar:

$$
\frac{x(x-3)(x-2)}{x-3} = \frac{x(x-3)(x+7)}{x}
\qquad \Longrightarrow \qquad
x(x-2) = (x-3)(x+7)
$$

**Alternativ 2: Korsvis multiplikation**

Eftersom ekvationen har formen $\dfrac{a}{b}=\dfrac{c}{d}$ kan vi
multiplicera korsvis, $a \cdot d = c \cdot b$, vilket ger samma ekvation
direkt:

$$
x(x-2) = (x-3)(x+7)
$$

Båda alternativen leder alltså till samma andragradsekvation. Vi utvecklar
högerledet:

$$
x^2 - 2x = x^2 + 4x - 21
$$

Vi subtraherar $x^2$ från båda led, samlar $x$-termerna på samma sida och
löser ut $x$:

$$
\begin{aligned}
-2x &= 4x - 21 \\
-2x - 4x &= -21 \\
-6x &= -21 \\
x &= \frac{-21}{-6} = \frac{21}{6} = \frac{7}{2}
\end{aligned}
$$

Lösningen $x = \dfrac{7}{2}$ är varken 3 eller 0, så den är giltig.

**Svar:** $x = \dfrac{7}{2}$
:::

::: tips "Sammanfattning"
1. Multiplikation: täljare gånger täljare, nämnare gånger nämnare.
2. Division: byt ut divisionstecknet mot multiplikation och invertera
   uttrycket i nämnaren.
3. Faktorisera täljare och nämnare innan du förenklar — då syns vilka
   faktorer som kan förkortas bort.
4. Uteslut alltid de värden på $x$ som gör någon nämnare i ekvationen lika
   med noll.
:::
