---
id: ma3c-2.5
title: Deriverbarhet och absolutbelopp
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.5'
---

# Deriverbarhet och absolutbelopp

Om det går att beräkna derivatan i en punkt, så är funktionen **deriverbar**
i den punkten. För att förstå deriverbarhet behöver vi först gå igenom
begreppen kontinuerlig/diskontinuerlig funktion och absolutbelopp.

## Kontinuerlig och diskontinuerlig funktion

::: tips "Kontinuerlig och diskontinuerlig funktion"
En funktion vars graf
1. hänger ihop är **kontinuerlig**. Grafen till en kontinuerlig funktion kan
   vi rita "utan att lyfta pennan".
2. inte hänger ihop, på grund av ett "hopp" eller "språng", är
   **diskontinuerlig** i punkten.
:::

En diskontinuitet kan se ut på olika sätt. Vid ett **hopp** ändras
funktionsvärdet plötsligt till ett annat värde i punkten — grafen ritas då
ofta med en öppen ring (punkten ingår inte) och en fylld prick (punkten
ingår) på olika höjd. Vid ett **språng** går grafen i stället mot
oändligheten på ömse sidor om punkten, t.ex. vid en lodrät asymptot, där
grafen delas i två grenar som går mot $+\infty$ respektive $-\infty$.

## Absolutbelopp

Ett tals avstånd till 0 på tallinjen kallas **absolutbelopp**. Absolut-
beloppet av ett tal $a$ skrivs $|a|$ och utläses "absolutbeloppet av $a$".

Till exempel gäller

$$
|2| = 2 \qquad \text{(avståndet från 2 till 0 på tallinjen är 2)}
$$

$$
|-3| = 3 \qquad \text{(avståndet från −3 till 0 på tallinjen är 3)}
$$

Vi kan också se det som att absolutbelopp "tar bort" minustecknet från
negativa tal.

Vi gör en värdetabell för funktionen $f(x) = |x|$ och undersöker grafens
utseende.

$$
\begin{array}{c|ccccccc}
x & -3 & -2 & -1 & 0 & 1 & 2 & 3 \\ \hline
f(x) = |x| & 3 & 2 & 1 & 0 & 1 & 2 & 3
\end{array}
$$

::: figur
<svg viewBox="-4 -20 221 148" width="221" height="148" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till f av x lika med absolutbeloppet av x. Grafen är formad som ett V med spetsen i origo, vilket bildar ett hörn."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><text x="140" y="35" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = |<tspan font-style="italic">x</tspan>|</text></svg>

Grafen får ett "hörn".
:::

## Deriverbarhet

::: tips "Deriverbarhet"
En funktion är **inte** deriverbar i en viss punkt om funktionen
1. inte är definierad i punkten (t.ex. då grafen har ett "språng"),
2. är diskontinuerlig i punkten (t.ex. då grafen har ett "hopp"), eller
3. har en hörnpunkt i punkten (då grafen har ett "hörn").
:::

::: härledning "Kuriosa — Deriverbarhet"
Hur kan det komma sig att en funktion med en hörnpunkt inte är deriverbar i
hörnpunkten, trots att den både är definierad och kontinuerlig i punkten?
Vi tittar på grafen till $f(x) = |x|$ igen.

::: figur
<svg viewBox="-10 -20 227 148" width="227" height="148" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till f av x lika med absolutbeloppet av x med två streckade trappsteg som visar lutningen minus 1 till vänster om origo och lutningen 1 till höger om origo."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><text x="140" y="35" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = |<tspan font-style="italic">x</tspan>|</text><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

Vi ser att om vi undersöker gränsvärdet när vi närmar oss $x = 0$ från
vänster, så gäller $f'(0) = -1$ (lutningen där är $-1$). Om vi i stället
undersöker gränsvärdet när vi närmar oss $x = 0$ från höger, så gäller
$f'(0) = 1$ (lutningen där är $1$). Eftersom gränsvärdet blir olika,
beroende på från vilket håll vi närmar oss $x = 0$, saknar derivatan ett
entydigt värde, och $f(x) = |x|$ är alltså inte deriverbar i $x = 0$.
:::

::: exempel "Exempel 1 — Beräkna absolutbelopp"
**Beräkna $|x^3 + 5|$ för $x = -2$.**

Vi sätter $x = -2$ i uttrycket $|x^3 + 5|$ och beräknar.

$$
|(-2)^3 + 5| = |-8 + 5| = |-3| = 3
$$

**Svar:** 3
:::

::: exempel "Exempel 2 — Lös en ekvation med absolutbelopp"
**Lös ekvationen $|x - 7| = 10$.**

Om $|x - 7| = 10$ gäller antingen $x - 7 = 10$ eller $x - 7 = -10$, som vi
kan lösa separat.

$$
x - 7 = 10 \qquad \text{eller} \qquad x - 7 = -10
$$

vilket ger $x_1 = 17$ respektive $x_2 = -3$.

Alternativt kan vi ställa upp ekvationen $x - 7 = \pm 10$ och få båda
lösningarna direkt.

$$
x - 7 = \pm 10 \quad \Rightarrow \quad x_1 = 7 + 10 = 17, \quad x_2 = 7 - 10 = -3
$$

**Svar:** $x_1 = 17$ och $x_2 = -3$
:::

::: exempel "Exempel 3 — Avläs deriverbarhet ur en graf"
**Figuren visar grafen till en funktion. För vilka värden på $x$ är
funktionen inte deriverbar?**

::: figur
<svg viewBox="-2 -2 252 136" width="252" height="136" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion med ett hörn vid x lika med minus 4 och ett hopp vid x lika med 0."><line x1="0" y1="98.4" x2="234.8" y2="98.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="244.8,98.4 234.8,93.9 234.8,102.9" fill="#1f2530"/><line x1="158.4" y1="112" x2="158.4" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="158.4,0 153.9,10 162.9,10" fill="#1f2530"/><text x="62.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="110.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="148" y="118" font-size="12" text-anchor="end" fill="#1f2530">0</text><text x="206.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="242.8" y="90.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="167.4" y="10" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14.4,86.4 L62.4,26.4 Q110.4,178.8 158.4,105.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M158.4,69.6 Q194.4,56.4 230.4,19.2" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><circle cx="158.4" cy="105.6" r="4" fill="#fdfaf3" stroke="#2563c9" stroke-width="1.8"/><circle cx="158.4" cy="69.6" r="4" fill="#2563c9" stroke="#2563c9" stroke-width="1.8"/></svg>
:::

Grafen har ett hörn då $x = -4$ och är diskontinuerlig (den har ett hopp)
då $x = 0$. I dessa punkter är funktionen alltså inte deriverbar.

**Svar:** $x = -4$ och $x = 0$
:::
