---
id: ma3c-4.2
title: Derivatans nollställen
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.2'
---

# Derivatans nollställen

Vi vet sedan tidigare att tecknet på derivatan $f'(x)$ avgör om en funktion
är växande eller avtagande i ett intervall: $f'(x) > 0$ ger en växande
funktion och $f'(x) < 0$ ger en avtagande funktion. Men vad händer i den
punkt där derivatan är exakt 0, dvs. där $f'(x) = 0$? Där är kurvans
tangent vågrät, och punkten är antingen en **lokal maximipunkt**, en
**lokal minimipunkt** eller en **terrasspunkt**.

::: tips "Lokal maximipunkt och lokal minimipunkt"
En punkt på en kurva som vänder kallas en lokal extrempunkt. Vänder kurvan
i en

1. "topp" kallas punkten en **lokal maximipunkt**. Funktionsvärdet
   ($y$-värdet) i en lokal maximipunkt kallas **lokalt maximum**.
2. "dal" kallas punkten en **lokal minimipunkt**. Funktionsvärdet
   ($y$-värdet) i en lokal minimipunkt kallas **lokalt minimum**.

::: figur
<svg viewBox="4 -2 268 202" width="268" height="202" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kurva som stiger till en lokal maximipunkt, sjunker till en lokal minimipunkt och stiger sedan igen."><line x1="20" y1="100" x2="236" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="248,100 236,95 236,105" fill="#1f2530"/><line x1="132" y1="190" x2="132" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="132,4 127,18 137,18" fill="#1f2530"/><text x="244" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="140" y="15" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M40,176.4 L44.6,156.2 L49.2,138.6 L53.8,123.3 L58.4,110.3 L63,99.4 L67.6,90.5 L72.2,83.4 L76.8,78.1 L81.4,74.3 L86,72 L90.6,71.1 L95.2,71.3 L99.8,72.5 L104.4,74.7 L109,77.7 L113.6,81.4 L118.2,85.6 L122.8,90.2 L127.4,95 L132,100 L136.6,105 L141.2,109.8 L145.8,114.4 L150.4,118.6 L155,122.3 L159.6,125.3 L164.2,127.5 L168.8,128.7 L173.4,128.9 L178,128 L182.6,125.7 L187.2,121.9 L191.8,116.6 L196.4,109.5 L201,100.6 L205.6,89.7 L210.2,76.7 L214.8,61.4 L219.4,43.8 L224,23.6" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="92" cy="71" r="3.2" fill="#c8324a"/><circle cx="172" cy="129" r="3.2" fill="#c8324a"/><text x="8" y="34" font-size="12.5" fill="#1f2530">lokal</text><text x="8" y="47" font-size="12.5" fill="#1f2530">maximipunkt</text><text x="182" y="150" font-size="12.5" fill="#1f2530">lokal</text><text x="182" y="163" font-size="12.5" fill="#1f2530">minimipunkt</text></svg>
:::
:::

Ett gemensamt namn för lokala maximi- och minimipunkter är **lokala
extrempunkter**, och funktionsvärdet i en sådan punkt kallas **lokalt
extremvärde**. Ordet "lokal" används eftersom det bara gäller i ett litet
intervall kring punkten — kurvan kan mycket väl ha andra delar med större
eller mindre funktionsvärden. I en lokal extrempunkt är derivatan
(lutningen) lika med 0.

::: formel "Terrasspunkt"
Om en kurva planar ut i en punkt (tangenten blir vågrät) men sedan
fortsätter i samma riktning som innan kallas punkten en **terrasspunkt**.
Även i en terrasspunkt är derivatan (lutningen) lika med 0.
:::

Sammanfattningsvis gäller att om $f'(a) = 0$ så är punkten där $x = a$
antingen en lokal maximipunkt, en lokal minimipunkt eller en
terrasspunkt.

Huruvida en punkt är en maximi-, minimi- eller terrasspunkt kallas
punktens **karaktär**. Karaktären kan alltid bestämmas med hjälp av en
**teckentabell**, där vi undersöker tecknet på $f'(x)$ strax till vänster
och strax till höger om punkten (se exemplet nedan). Är funktionen en
andragradsfunktion kan karaktären bestämmas snabbare, direkt utifrån
tecknet framför $x^2$-termen: en positiv $x^2$-term ger en "glad" kurva
och en minimipunkt, medan en negativ $x^2$-term ger en "sur" kurva och en
maximipunkt.

## Bestämma extrempunkter och deras karaktär

::: tips "Bestämma extrempunkter och deras karaktär"
1. Derivera den ursprungliga funktionen, sätt derivatan lika med 0 och lös
   ekvationen. Det ger extrempunkternas $x$-koordinater.
2. Sätt in $x$-värdena från steg 1 i den **ursprungliga** funktionen. Det
   ger extrempunkternas $y$-koordinater.
3. Bestäm punkternas karaktär med hjälp av en teckentabell.
:::

::: exempel "Exempel 1 — Bestäm lokala extrempunkter och deras karaktär"
**Bestäm de lokala extrempunkterna och deras karaktär till funktionen**

$$
f(x) = x^3 - 6x^2 + 9x + 3
$$

Steg 1: Vi deriverar funktionen, sätter derivatan lika med 0 och löser
ekvationen för att få fram extrempunkternas $x$-koordinater.

$$
f'(x) = 3x^2 - 12x + 9
$$

$$
f'(x) = 0 \quad \Rightarrow \quad 3x^2 - 12x + 9 = 0
$$

Vi delar båda led med 3 och löser med $pq$-formeln.

$$
x^2 - 4x + 3 = 0
$$

$$
\begin{aligned}
x &= 2 \pm \sqrt{2^2 - 3} \\
x &= 2 \pm \sqrt{1} \\
x &= 2 \pm 1
\end{aligned}
$$

vilket ger $x_1 = 1$ och $x_2 = 3$.

Steg 2: Vi sätter in $x$-värdena i den ursprungliga funktionen för att få
fram extrempunkternas $y$-koordinater.

$$
f(1) = 1^3 - 6 \cdot 1^2 + 9 \cdot 1 + 3 = 7
$$

$$
f(3) = 3^3 - 6 \cdot 3^2 + 9 \cdot 3 + 3 = 3
$$

Punkterna $(1, 7)$ och $(3, 3)$ har alltså derivatan 0.

Steg 3: Vi bestämmer punkternas karaktär med en teckentabell. Vi sätter in
ett valfritt värde mindre än 1 (t.ex. $x = 0$), ett värde mellan 1 och 3
(t.ex. $x = 2$) och ett värde större än 3 (t.ex. $x = 10$) i derivatan.

$$
f'(0) = 3 \cdot 0^2 - 12 \cdot 0 + 9 = 9 > 0
$$

$$
f'(2) = 3 \cdot 2^2 - 12 \cdot 2 + 9 = -3 < 0
$$

$$
f'(10) = 3 \cdot 10^2 - 12 \cdot 10 + 9 = 189 > 0
$$

| $x$ | $x < 1$ | $x = 1$ | $1 < x < 3$ | $x = 3$ | $x > 3$ |
| --- | --- | --- | --- | --- | --- |
| $f'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f(x)$ | $\nearrow$ | $7$ | $\searrow$ | $3$ | $\nearrow$ |

Derivatans teckenväxling $+ \to 0 \to -$ vid $x = 1$ visar att $(1, 7)$ är
en lokal maximipunkt, och teckenväxlingen $- \to 0 \to +$ vid $x = 3$
visar att $(3, 3)$ är en lokal minimipunkt.

**Svar:** $(1, 7)$ är en lokal maximipunkt och $(3, 3)$ är en lokal
minimipunkt.
:::

::: exempel "Exempel 2 — Extrempunkt till en andragradsfunktion"
**Bestäm extrempunkten och dess karaktär till funktionen**

$$
f(x) = 3x^2 - 6x + 2
$$

Vi deriverar funktionen, sätter derivatan lika med 0 och löser ekvationen
för att få fram extrempunktens $x$-koordinat.

$$
f'(x) = 6x - 6
$$

$$
f'(x) = 0 \quad \Rightarrow \quad 6x - 6 = 0 \quad \Rightarrow \quad x = 1
$$

Vi sätter in $x = 1$ i den ursprungliga funktionen för att få fram
extrempunktens $y$-koordinat.

$$
f(1) = 3 \cdot 1^2 - 6 \cdot 1 + 2 = -1
$$

Extrempunkten har alltså koordinaterna $(1, -1)$.

Eftersom $f(x)$ är en andragradsfunktion kan vi bestämma karaktären
snabbare, utan teckentabell, genom tecknet framför $x^2$-termen.
Koefficienten framför $x^2$ är 3, som är positiv, vilket ger en "glad"
kurva och därmed en minimipunkt.

**Svar:** $(1, -1)$ är en lokal minimipunkt.
:::
