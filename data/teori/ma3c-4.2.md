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
punkt där derivatan är exakt 0, det vill säga där $f'(x) = 0$? Där är kurvans
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
<svg viewBox="4 -2 268 202" width="392" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kurva som stiger till en lokal maximipunkt, sjunker till en lokal minimipunkt och stiger sedan igen. Peka eller tryck på en extrempunkt så visas den vågräta tangenten och att derivatan är 0 där." style="overflow:visible"><style>.q42s{cursor:pointer;outline:none}.q42s .q42-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q42s:hover .q42-lbl,.q42s:focus .q42-lbl{opacity:1}.q42s .q42-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q42s:hover .q42-pt,.q42s:focus .q42-pt{transform:scale(1.5)}</style><line x1="20" y1="100" x2="236" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="248,100 236,95 236,105" fill="#1f2530"/><line x1="132" y1="190" x2="132" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="132,4 127,18 137,18" fill="#1f2530"/><text x="244" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="140" y="15" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 40,176.4 C 40.77,173.03 43.07,162.5 44.6,156.2 C 46.13,149.9 47.67,144.08 49.2,138.6 C 50.73,133.12 52.27,128.02 53.8,123.3 C 55.33,118.58 56.87,114.28 58.4,110.3 C 59.93,106.32 61.47,102.7 63,99.4 C 64.53,96.1 66.07,93.17 67.6,90.5 C 69.13,87.83 70.67,85.47 72.2,83.4 C 73.73,81.33 75.27,79.62 76.8,78.1 C 78.33,76.58 79.87,75.32 81.4,74.3 C 82.93,73.28 84.47,72.53 86,72 C 87.53,71.47 89.07,71.22 90.6,71.1 C 92.13,70.98 93.67,71.07 95.2,71.3 C 96.73,71.53 98.27,71.93 99.8,72.5 C 101.33,73.07 102.87,73.83 104.4,74.7 C 105.93,75.57 107.47,76.58 109,77.7 C 110.53,78.82 112.07,80.08 113.6,81.4 C 115.13,82.72 116.67,84.13 118.2,85.6 C 119.73,87.07 121.27,88.63 122.8,90.2 C 124.33,91.77 125.87,93.37 127.4,95 C 128.93,96.63 130.47,98.33 132,100 C 133.53,101.67 135.07,103.37 136.6,105 C 138.13,106.63 139.67,108.23 141.2,109.8 C 142.73,111.37 144.27,112.93 145.8,114.4 C 147.33,115.87 148.87,117.28 150.4,118.6 C 151.93,119.92 153.47,121.18 155,122.3 C 156.53,123.42 158.07,124.43 159.6,125.3 C 161.13,126.17 162.67,126.93 164.2,127.5 C 165.73,128.07 167.27,128.47 168.8,128.7 C 170.33,128.93 171.87,129.02 173.4,128.9 C 174.93,128.78 176.47,128.53 178,128 C 179.53,127.47 181.07,126.72 182.6,125.7 C 184.13,124.68 185.67,123.42 187.2,121.9 C 188.73,120.38 190.27,118.67 191.8,116.6 C 193.33,114.53 194.87,112.17 196.4,109.5 C 197.93,106.83 199.47,103.9 201,100.6 C 202.53,97.3 204.07,93.68 205.6,89.7 C 207.13,85.72 208.67,81.42 210.2,76.7 C 211.73,71.98 213.27,66.88 214.8,61.4 C 216.33,55.92 217.87,50.1 219.4,43.8 C 220.93,37.5 223.23,26.97 224,23.6" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q42s" tabindex="0"><circle cx="92" cy="71" r="16" fill="transparent"/><circle class="q42-pt" cx="92" cy="71" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="62" y1="71" x2="122" y2="71" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="90" y="58" font-size="11.5" text-anchor="middle" fill="#c8324a">derivatan är 0</text></g></g><g class="q42s" tabindex="0"><circle cx="172" cy="129" r="16" fill="transparent"/><circle class="q42-pt" cx="172" cy="129" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="142" y1="129" x2="202" y2="129" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="160" y="150" font-size="11.5" text-anchor="end" fill="#c8324a">derivatan är 0</text></g></g><text x="8" y="34" font-size="12.5" fill="#1f2530">lokal</text><text x="8" y="47" font-size="12.5" fill="#1f2530">maximipunkt</text><text x="182" y="150" font-size="12.5" fill="#1f2530">lokal</text><text x="182" y="163" font-size="12.5" fill="#1f2530">minimipunkt</text></svg>

Peka eller tryck på en extrempunkt så visas den vågräta tangenten.
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
ett valfritt värde mindre än 1 (till exempel $x = 0$), ett värde mellan 1 och 3
(till exempel $x = 2$) och ett värde större än 3 (till exempel $x = 10$) i derivatan.

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

::: sammanfattning "Sammanfattning"

::: sampunkt "Var derivatan är noll"
- Där $f'(x) = 0$ är tangenten vågrät.
- Punkten är då antingen en **lokal maximipunkt**, en **lokal minimipunkt** eller en **terrasspunkt**.
- **Terrasspunkt:** kurvan planar ut men fortsätter sedan i samma riktning.
:::

::: sampunkt "Extrempunkt och extremvärde"
- Maximi- och minimipunkter kallas gemensamt **lokala extrempunkter**.
- Funktionsvärdet i en sådan punkt är det **lokala extremvärdet**.
- Ordet lokal betyder att det bara gäller i ett litet intervall kring punkten.
:::

::: sampunkt "Arbetsgång"
1. Derivera, sätt $f'(x) = 0$ och lös ekvationen. Det ger $x$-koordinaterna.
2. Sätt in $x$-värdena i den **ursprungliga** funktionen. Det ger $y$-koordinaterna.
3. Bestäm punkternas karaktär med en teckentabell.
:::

::: sampunkt "Karaktär"
- Teckenväxling $+ \to 0 \to -$ ger en **maximipunkt**.
- Teckenväxling $- \to 0 \to +$ ger en **minimipunkt**.
- Samma tecken på båda sidor ger en terrasspunkt.
- Genväg för andragradsfunktioner: positiv $x^2$-term ger minimipunkt, negativ ger maximipunkt.
:::

:::
