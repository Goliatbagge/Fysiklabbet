---
id: ma2c-4.7
title: Likformiga månghörningar
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.7'
---

# Likformiga månghörningar

Månghörningar med samma form kallas **likformiga**. Likformiga
månghörningar kan vara olika stora, vridna olika mycket och
spegelvända.

::: tips "Likformiga månghörningar"
Två månghörningar är likformiga om

- motsvarande vinklar är lika stora **OCH**
- förhållandet mellan motsvarande sidor är lika

**OBS!** Både vinklar och sidförhållanden måste kontrolleras.
(Undantaget är trianglar, vilket nästa genomgång handlar om.)
:::

::: exempel "Exempel 1 — Är parallellogrammen likformiga?"
**Är parallellogrammen likformiga? Motstående vinklar i en
parallellogram är lika stora. Motstående sidor i en parallellogram är
lika stora.**

::: figur
<svg viewBox="8 30 306 118" width="306" height="118" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två parallellogram: en mindre A B C D med sidan 8 och sidan 6 samt vinklarna 50 och 130 grader, och en större E F G H med sidan 12 och sidan 9."><polygon points="20,124 84,124 106,76 42,76" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="16" y="138" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="88" y="138" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="111" y="70" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="38" y="70" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="52" y="138" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="27" y="98" font-size="11" text-anchor="end" fill="#1f2530">6</text><path d="M 32,124 A 12 12 0 0 0 25,113.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="37" y="116" font-size="10" text-anchor="start" fill="#1f2530">50°</text><path d="M 73,124 A 11 11 0 0 1 88.6,114" fill="none" stroke="#1f2530" stroke-width="1"/><text x="74" y="111" font-size="10" text-anchor="middle" fill="#1f2530">130°</text><polygon points="158,132 254,132 287,60 191,60" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="153" y="146" font-size="12" text-anchor="middle" fill="#1f2530">E</text><text x="259" y="146" font-size="12" text-anchor="middle" fill="#1f2530">F</text><text x="292" y="54" font-size="12" text-anchor="middle" fill="#1f2530">G</text><text x="187" y="54" font-size="12" text-anchor="middle" fill="#1f2530">H</text><text x="206" y="146" font-size="11" text-anchor="middle" fill="#1f2530">12</text><text x="168" y="98" font-size="11" text-anchor="end" fill="#1f2530">9</text></svg>
:::

Vi börjar med att bestämma alla vinklar. I den lilla parallellogrammen
är $A = 50°$ och $B = 130°$, och motstående vinklar ger $C = 50°$ och
$D = 130°$. I den stora gäller på samma sätt $E = 50°$, $F = 130°$,
$G = 50°$ och $H = 130°$.

Nu undersöker vi motsvarande vinklar:

$$
A = E = 50° \qquad B = F = 130° \qquad C = G = 50° \qquad D = H = 130°
$$

Alla motsvarande vinklar är lika stora.

Vi bestämmer alla sidor: $AB = 8$, $AD = 6$ (motstående sidor ger
$DC = 8$ och $BC = 6$) samt $EF = 12$, $EH = 9$ (motstående sidor ger
$HG = 12$ och $FG = 9$).

Nu undersöker vi sidförhållandena:

$$
\frac{AB}{EF} = \frac{DC}{HG} = \frac{8}{12} = \frac{2}{3}
$$

$$
\frac{AD}{EH} = \frac{BC}{FG} = \frac{6}{9} = \frac{2}{3}
$$

Även sidförhållandena är lika.

Eftersom både motsvarande vinklar och sidförhållanden är lika är
parallellogrammen likformiga.

**Svar:** Ja
:::

::: exempel "Exempel 2 — Bestäm sidan"
**Figurerna är likformiga. Bestäm sidan $x$.**

::: figur
<svg viewBox="8 22 296 112" width="296" height="112" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två likformiga fyrhörningar: en mindre med sidorna 5 och 8, och en större med sidorna x och 24."><polygon points="22,110 88,110 78,84 34,92" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="22" y="98" font-size="11" text-anchor="end" fill="#1f2530">5</text><text x="55" y="124" font-size="11" text-anchor="middle" fill="#1f2530">8</text><polygon points="118,116 268,116 244,54 146,72" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="126" y="92" font-size="11" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="193" y="130" font-size="11" text-anchor="middle" fill="#1f2530">24</text><text x="296" y="34" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Sidor i likformiga figurer kan bestämmas på två sätt: med ekvation
eller med skalfaktor.

**Med ekvation.** Förhållandet mellan motsvarande sidor är lika, så

$$
\frac{x}{5} = \frac{24}{8}
$$

Korsvis multiplikation ger

$$
8x = 24 \cdot 5
$$

$$
8x = 120 \iff x = 15\ \mathrm{cm}
$$

**Med skalfaktor.** Vi dividerar två kända sidor för att bestämma
skalfaktorn, dvs. hur stora figurerna är relativt varandra.

$$
\text{Skalfaktor} = \frac{24}{8} = 3
$$

Det innebär att motsvarande sidor är 3 gånger längre i den större
månghörningen. Sidan $x$ motsvarar sidan 5 i den mindre figuren:

$$
x = 5 \cdot 3 = 15\ \mathrm{cm}
$$

**Svar:** 15 cm
:::
