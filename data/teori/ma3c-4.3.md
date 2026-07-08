---
id: ma3c-4.3
title: Största och minsta värde i ett intervall samt kurvkonstruktion
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.3'
---

# Största och minsta värde i ett intervall samt kurvkonstruktion

Sedan tidigare vet vi hur vi bestämmer en funktions extrempunkter och deras
karaktär (maximipunkt, minimipunkt eller terrasspunkt).

::: tips "Kom ihåg — bestämma extrempunkter och deras karaktär"
1. Derivera den ursprungliga funktionen, sätt derivatan lika med 0 och lös
   ekvationen. Vi får då fram extrempunkternas $x$-koordinater.
2. Sätt in de $x$-värden vi fick fram i steg 1 i den **ursprungliga**
   funktionen. Vi får då fram extrempunkternas $y$-koordinater.
3. Bestäm extrempunkternas karaktär med hjälp av en teckentabell.
:::

Ibland ska vi bestämma en funktions största eller minsta värde i ett
**slutet intervall**, dvs. ett intervall där även ändpunkterna
$a \leq x \leq b$ räknas med. Det största eller minsta värdet i intervallet
finns då alltid antingen i en extrempunkt **eller** i en av intervallets
ändpunkter — aldrig någon annanstans.

::: tips "Bestämma största och minsta värdet i ett intervall"
1. Sätt in intervallets ändpunkter i $f(x)$ för att få fram
   $y$-koordinaterna i dessa ändpunkter.
2. Beräkna $y$-koordinaterna i de extrempunkter som ligger inom intervallet,
   enligt metoden för att bestämma extrempunkter med derivata (se
   kom-ihåg-rutan ovan).
3. Det största respektive minsta värdet bland punkterna i steg 1 och 2 är
   funktionens största respektive minsta värde i intervallet.
:::

## Kurvkonstruktion

Vid **kurvkonstruktion** använder vi samma metod som ovan för att bestämma
extrempunkter och deras karaktär. Därefter skissar vi kurvan utifrån
extrempunkternas läge och karaktär — utan att räkna ut fler punkter än
nödvändigt.

::: exempel "Exempel 1 — Största och minsta värde samt kurvkonstruktion"
**Funktionen $f(x) = x^3 - 3x$ är given i intervallet $-2 \leq x \leq 3$.
Bestäm funktionens största och minsta värde i intervallet och skissa sedan
grafen utan digitala hjälpmedel.**

Vi börjar med att bestämma $y$-koordinaterna i intervallets
ändpunkter.

$$
f(-2) = (-2)^3 - 3 \cdot (-2) = -8 + 6 = -2 \qquad \Rightarrow \qquad (-2, -2) \text{ är en ändpunkt}
$$

$$
f(3) = 3^3 - 3 \cdot 3 = 27 - 9 = 18 \qquad \Rightarrow \qquad (3, 18) \text{ är en ändpunkt}
$$

Därefter bestämmer vi $y$-koordinaterna i extrempunkterna. Vi börjar med att
derivera och ta fram de $x$-värden där derivatan (lutningen) är $0$.

$$
f'(x) = 3x^2 - 3
$$

$f'(x) = 0$ ger

$$
3x^2 - 3 = 0 \quad \Leftrightarrow \quad 3x^2 = 3 \quad \Leftrightarrow \quad x^2 = 1 \quad \Leftrightarrow \quad x = \pm\sqrt{1}
$$

vilket ger $x_1 = -1$ och $x_2 = 1$. Vi sätter in dessa $x$-värden i den
ursprungliga funktionen för att få extrempunkternas $y$-koordinater.

$$
f(-1) = (-1)^3 - 3 \cdot (-1) = -1 + 3 = 2 \qquad \Rightarrow \qquad (-1, 2) \text{ är en extrempunkt}
$$

$$
f(1) = 1^3 - 3 \cdot 1 = 1 - 3 = -2 \qquad \Rightarrow \qquad (1, -2) \text{ är en extrempunkt}
$$

Vi jämför nu $y$-värdena i ändpunkterna och i extrempunkterna: $-2$, $18$,
$2$ och $-2$. Det största värdet är $18$ (i ändpunkten $x = 3$) och det
minsta är $-2$ (både i ändpunkten $x = -2$ och i extrempunkten $x = 1$).

**Svar:** Största värdet är $18$. Minsta värdet är $-2$.

Nu skissar vi grafen. Vi har redan fått fram ändpunkterna $(-2, -2)$ och
$(3, 18)$ samt extrempunkterna $(-1, 2)$ och $(1, -2)$. Vi bestämmer
extrempunkternas karaktär med hjälp av en teckentabell. Vi fyller i de
$x$-värden vi har fått fram där derivatan är $0$, och testar sedan tecknet
på $f'(x) = 3x^2 - 3$ i en punkt i vart och ett av de tre delintervallen.

$$
f'(-2) = 3 \cdot (-2)^2 - 3 = 12 - 3 = 9 \quad \Rightarrow \quad + \qquad
f'(0) = 3 \cdot 0^2 - 3 = -3 \quad \Rightarrow \quad - \qquad
f'(2) = 3 \cdot 2^2 - 3 = 12 - 3 = 9 \quad \Rightarrow \quad +
$$

| $x$ | | $-1$ | | $1$ | |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $f'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f(x)$ | $\nearrow$ | $\rightarrow$ | $\searrow$ | $\rightarrow$ | $\nearrow$ |

Teckentabellen visar att kurvan har en **maximipunkt** i $(-1, 2)$ (växande
$\to$ avtagande) och en **minimipunkt** i $(1, -2)$ (avtagande $\to$
växande). Vi förbinder nu de fyra punkterna med en jämn kurva.

::: figur
<svg viewBox="4 0 240 242" width="240" height="242" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till f av x lika med x upphöjt till tre minus tre x, ritad på intervallet minus två till tre. Ändpunkterna vid x lika med minus två och x lika med tre är markerade med ohyllda cirklar. Maximipunkten vid minus ett, två och minimipunkten vid ett, minus två är markerade med fyllda röda punkter.">
<line x1="16" y1="155" x2="206" y2="155" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="16" y1="105" x2="206" y2="105" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="16" y1="55" x2="206" y2="55" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<text x="90" y="159" font-size="11" text-anchor="end" fill="#1f2530">5</text>
<text x="90" y="109" font-size="11" text-anchor="end" fill="#1f2530">10</text>
<text x="90" y="59" font-size="11" text-anchor="end" fill="#1f2530">15</text>
<line x1="16" y1="205" x2="206" y2="205" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="216,205 206,200.5 206,209.5" fill="#1f2530"/>
<line x1="100" y1="235" x2="100" y2="23" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="100,13 95.5,23 104.5,23" fill="#1f2530"/>
<text x="222" y="209" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="107" y="18" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<text x="32" y="219" font-size="11" text-anchor="middle" fill="#1f2530">−2</text>
<text x="66" y="219" font-size="11" text-anchor="middle" fill="#1f2530">−1</text>
<text x="90" y="219" font-size="11" text-anchor="end" fill="#1f2530">0</text>
<text x="134" y="219" font-size="11" text-anchor="middle" fill="#1f2530">1</text>
<text x="168" y="219" font-size="11" text-anchor="middle" fill="#1f2530">2</text>
<text x="202" y="219" font-size="11" text-anchor="middle" fill="#1f2530">3</text>
<path d="M32,225 L40.5,206.1 L49,193.8 L57.5,187 L66,185 L74.5,186.7 L83,191.3 L91.5,197.7 L100,205 L108.5,212.3 L117,218.8 L125.5,223.3 L134,225 L142.5,223 L151,216.3 L159.5,203.9 L168,185 L176.5,158.6 L185,123.8 L193.5,79.5 L202,25" fill="none" stroke="#2563c9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="32" cy="225" r="3.4" fill="#f7f2e8" stroke="#1f2530" stroke-width="1.6"/>
<circle cx="202" cy="25" r="3.4" fill="#f7f2e8" stroke="#1f2530" stroke-width="1.6"/>
<circle cx="66" cy="185" r="3.4" fill="#c8324a"/>
<circle cx="134" cy="225" r="3.4" fill="#c8324a"/>
</svg>
:::

*Ändpunkterna $(-2, -2)$ och $(3, 18)$ markeras med ohyllda cirklar,
maximipunkten $(-1, 2)$ och minimipunkten $(1, -2)$ med fyllda röda punkter.
Kurvan är växande fram till maximipunkten, avtagande mellan max- och
minimipunkten, och därefter växande igen fram till högra ändpunkten.*

**Svar:** Se grafen ovan.
:::
