---
id: ma2c-3.5
title: Problemlösning med grafritande hjälpmedel
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.5'
---

# Problemlösning med grafritande hjälpmedel

Vid problemlösning, så ritar vi upp den funktion som beskriver
situationen för att besvara frågan. Användbara verktyg i Geogebra är
*Extrempunkt*, *Skärning mellan två objekt* och *Nollställen*.

::: exempel "Exempel 1 — Nyårsraketen"
**En nyårsraket har en höjd som kan beskrivas av funktionen
$h(t) = 40t - 4{,}9t^2$, där $t$ är tiden i sekunder och $h(t)$ är
raketens höjd i meter.**

Vi ritar $h(t) = 40t - 4{,}9t^2$ i Geogebra och besvarar frågorna
nedan ur grafen.

::: figur
<svg viewBox="-2 -4 194 226" width="194" height="226" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till raketens höjd: en parabel från origo som når högst cirka 81,6 meter efter cirka 4 sekunder och landar efter cirka 8,2 sekunder, med en vågrät linje vid höjden 50 meter som skär banan i två punkter."><line x1="56" y1="12" x2="56" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="92" y1="12" x2="92" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="128" y1="12" x2="128" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="164" y1="12" x2="164" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="160" x2="182" y2="160" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="120" x2="182" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="80" x2="182" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="40" x2="182" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="200" x2="184" y2="200" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,200 182,195.5 182,204.5" fill="#1f2530"/><line x1="20" y1="212" x2="20" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="20,2 15.5,12 24.5,12" fill="#1f2530"/><text x="190" y="218" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">t</tspan> (s)</text><text x="29" y="12" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan> (m)</text><text x="56" y="214" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="92" y="214" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="128" y="214" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="164" y="214" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="14" y="164" font-size="11" text-anchor="end" fill="#1f2530">20</text><text x="14" y="124" font-size="11" text-anchor="end" fill="#1f2530">40</text><text x="14" y="84" font-size="11" text-anchor="end" fill="#1f2530">60</text><text x="14" y="44" font-size="11" text-anchor="end" fill="#1f2530">80</text><path d="M 20,200 Q 93.5,-126.4 166.9,200" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="12" y1="100" x2="182" y2="100" stroke="#4a7d3a" stroke-width="2"/><circle cx="47.7" cy="100" r="3.5" fill="#c8324a"/><circle cx="139.2" cy="100" r="3.5" fill="#c8324a"/><circle cx="166.9" cy="200" r="3" fill="#1f2530"/><text x="42" y="92" font-size="12" text-anchor="end" fill="#c8324a">A</text><text x="146" y="92" font-size="12" text-anchor="start" fill="#c8324a">B</text><text x="174" y="192" font-size="12" text-anchor="end" fill="#1f2530">8,2</text></svg>
:::

**Hur<br>a) lång tid tar det innan raketen landar?&emsp;&emsp;b) högt når raketen som högst?&emsp;&emsp;c) lång tid tar det för raketen att nå höjden 50 meter?**

**a)** Raketen landar när höjden $h(t) = 0$, vilket motsvarar nollstället
längst till höger på $t$-axeln. Vi använder verktyget *Nollställen* och
läser av dess $t$-koordinat: $t \approx 8{,}2$.

**Svar:** Efter 8,2 sekunder.

**b)** Raketen når som högst när höjden $h(t)$ är som störst, vilket är
i maximipunkten. Vi använder verktyget *Extrempunkt* och läser av
maximipunktens $y$-koordinat. Vi ser att högsta höjden är vid
$h(t) \approx 81{,}6$.

**Svar:** 81,6 meter

**c)** Raketen når höjden 50 meter när $h(t) = 50$. Vi ritar in
hjälpfunktionen $y = 50$ (den gröna linjen i figuren) och tar fram
skärningspunkterna A och B med verktyget *Skärning mellan två objekt*:
A ≈ (1,5; 50) och B ≈ (6,6; 50).

Vi ser att raketen når höjden 50 m efter $t \approx 1{,}5$ s (på väg
upp) och efter $t \approx 6{,}6$ s (på väg ner).

**Svar:** Efter 1,5 s (på väg upp) och efter 6,6 s (på väg ner).
:::

::: exempel "Exempel 2 — Hagen vid muren"
**En rektangulär hage ska byggas mot en mur. Det finns 52 meter
stängsel som ska räcka till tre av sidorna eftersom den fjärde sidan
utgörs av muren. Se figur. Vilka mått ska hagen ha för att dess area
ska bli så stor som möjligt?**

::: figur
<svg viewBox="22 4 246 162" width="246" height="162" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En rektangulär hage mot en mur: murens band överst, hagen under med de två lika sidorna x och den tredje sidan 52 minus 2x."><rect x="24" y="10" width="212" height="16" fill="rgba(31,37,48,0.12)" stroke="#1f2530" stroke-width="1" stroke-dasharray="5 4"/><text x="130" y="22" font-size="12" text-anchor="middle" fill="#1f2530">Mur</text><rect x="44" y="26" width="172" height="100" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="32" y1="30" x2="32" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="32,26 28.8,33 35.2,33" fill="#1f2530"/><polygon points="32,126 28.8,119 35.2,119" fill="#1f2530"/><text x="24" y="80" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="228" y1="30" x2="228" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="228,26 224.8,33 231.2,33" fill="#1f2530"/><polygon points="228,126 224.8,119 231.2,119" fill="#1f2530"/><text x="236" y="80" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="48" y1="140" x2="212" y2="140" stroke="#1f2530" stroke-width="1.2"/><polygon points="44,140 51,136.8 51,143.2" fill="#1f2530"/><polygon points="216,140 209,136.8 209,143.2" fill="#1f2530"/><text x="130" y="160" font-size="13" text-anchor="middle" fill="#1f2530">52 − 2<tspan font-style="italic">x</tspan></text><text x="266" y="16" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

Vi tecknar ett uttryck för hagens area. Vi kallar de två lika långa
sidorna för $x$. Eftersom vi har 52 meter stängsel totalt, måste den
tredje sidan ha längden $52 - 2x$. Arean hos rektangeln fås av basen
gånger höjden, dvs.

$$
A(x) = x(52 - 2x)
$$

Vi ritar upp funktionen $A(x) = x(52 - 2x)$ i Geogebra.

::: figur
<svg viewBox="-6 -6 196 222" width="196" height="222" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till hagens area som funktion av sidan x: en parabel med maximipunkt i 13 komma 338."><line x1="45" y1="10" x2="45" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="75" y1="10" x2="75" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="105" y1="10" x2="105" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="135" y1="10" x2="135" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="165" y1="10" x2="165" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="140" x2="180" y2="140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="90" x2="180" y2="90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="40" x2="180" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="190" x2="184" y2="190" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,190 182,185.5 182,194.5" fill="#1f2530"/><line x1="15" y1="202" x2="15" y2="8" stroke="#1f2530" stroke-width="1.6"/><polygon points="15,0 10.5,10 19.5,10" fill="#1f2530"/><text x="190" y="208" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="24" y="10" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="45" y="204" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="75" y="204" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="105" y="204" font-size="11" text-anchor="middle" fill="#1f2530">15</text><text x="135" y="204" font-size="11" text-anchor="middle" fill="#1f2530">20</text><text x="165" y="204" font-size="11" text-anchor="middle" fill="#1f2530">25</text><text x="9" y="144" font-size="11" text-anchor="end" fill="#1f2530">100</text><text x="9" y="94" font-size="11" text-anchor="end" fill="#1f2530">200</text><text x="9" y="44" font-size="11" text-anchor="end" fill="#1f2530">300</text><path d="M 15,190 Q 93,-148 171,190" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="93" cy="21" r="3.5" fill="#c8324a"/><text x="101" y="16" font-size="12" text-anchor="start" fill="#c8324a">(13, 338)</text></svg>
:::

Vi ska bestämma måtten som ger den maximala arean, dvs. vi vill ta
reda på för vilket värde på $x$ som $A(x)$ är som störst, vilket
motsvarar grafens maximipunkt. Vi använder verktyget *Extrempunkt* för
att ta fram maximipunktens koordinat: (13, 338).

Vi ser att den maximala arean är $338\ \mathrm{m}^2$ när
$x = 13$ meter.

De två lika stora sidorna är alltså $x = 13$ meter och den tredje sidan
är

$$
52 - 2x = 52 - 2 \cdot 13 = 52 - 26 = 26\ \mathrm{m}
$$

Måtten på hagen är alltså 26 × 13 meter.

**Svar:** 26 × 13 meter
:::
