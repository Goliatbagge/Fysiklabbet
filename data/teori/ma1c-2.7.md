---
id: ma1c-2.7
title: Ekvationer med nämnare
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.7'
---

# Ekvationer med nämnare

**OBS! När vi har ekvationer med variabler, t.ex. $x$, i nämnaren får den
inte anta ett värde som gör att nämnaren blir lika med 0**, eftersom
division med 0 inte är definierat. Innan vi löser sådana ekvationer skriver
vi vilka värden på variabeln som *inte* är tillåtna.

Inte sällan är det nämnaren som gör en ekvation svår att lösa, så för att
lösa ekvationer med nämnare är en nyckel att snabbt bli av med nämnarna.
Att bli av med nämnarna går att göra på olika sätt, beroende på hur
ekvationen ser ut. Det finns tre vanliga varianter.

::: formel "1. En bråkterm i ena ledet, ingen bråkterm i andra ledet"
**Metod:** Täljaren är lika med produkten av kvoten och nämnaren.
:::

::: exempel "Exempel 1 — En bråkterm"
**Lös $\dfrac{130}{3x} = 5$.**

Vi har $3x$ i nämnaren, så $3x \neq 0$, vilket ger $x \neq 0$.

Täljaren är lika med produkten av kvoten och nämnaren:

$$
130 = 5 \cdot 3x
$$

$$
130 = 15x
$$

$$
\frac{130}{15} = \frac{15x}{15}
$$

$$
\frac{26}{3} = x
$$

**Svar:** $x = \dfrac{26}{3}$
:::

::: formel "2. En bråkterm i ena ledet, en bråkterm i andra ledet"
**Metod:** Korsvis multiplikation.
:::

::: exempel "Exempel 2 — Korsvis multiplikation"
**Lös $\dfrac{9}{2x} = \dfrac{3}{8}$.**

Vi har $2x$ i nämnaren så $2x \neq 0$, vilket ger $x \neq 0$.

Vi multiplicerar "korsvis", dvs. vi multiplicerar täljaren i ena bråket
med nämnaren i det andra bråket och vice versa. Ordningen spelar ingen
roll!

::: figur
<svg viewBox="6 2 100 82" width="100" height="82" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Bråket 9 genom 2x är lika med bråket 3 genom 8. Pilar korsar: täljaren 9 multipliceras med nämnaren 8, och nämnaren 2x multipliceras med täljaren 3. Under står produkterna 3 gånger 2x och 9 gånger 8."><text x="30" y="21" font-size="15" text-anchor="middle" fill="#1f2530">9</text><line x1="19" y1="26" x2="41" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="43" font-size="15" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">x</tspan></text><text x="56" y="32" font-size="15" text-anchor="middle" fill="#1f2530">=</text><text x="82" y="21" font-size="15" text-anchor="middle" fill="#1f2530">3</text><line x1="72" y1="26" x2="92" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="82" y="43" font-size="15" text-anchor="middle" fill="#1f2530">8</text><line x1="36" y1="22" x2="74" y2="38" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,39.7) rotate(23)" fill="#c8324a"/><line x1="38" y1="38" x2="74" y2="23" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,21.3) rotate(-23)" fill="#2563c9"/><text x="30" y="76" font-size="14" text-anchor="middle" fill="#2563c9">3 · 2<tspan font-style="italic">x</tspan></text><text x="82" y="76" font-size="14" text-anchor="middle" fill="#c8324a">9 · 8</text></svg>
:::

$$
3 \cdot 2x = 9 \cdot 8
$$

$$
6x = 72
$$

$$
\frac{6x}{6} = \frac{72}{6}
$$

$$
x = 12
$$

**Svar:** $x = 12$
:::

::: formel "3. Tre eller fler bråktermer i en ekvation"
**Metod:** Multiplicera båda led med MGN (minsta gemensamma nämnaren)
eller skriv om båda led som ett bråk och använd korsvis multiplikation.
:::

::: exempel "Exempel 3 — Tre bråktermer"
**Lös $\dfrac{x}{3} + \dfrac{1}{4} = \dfrac{5}{6}$.**

**Alternativ 1: Multiplicera med MGN (eller någon gemensam nämnare)**

För att hitta MGN eller en gemensam nämnare kan man göra på lite olika
sätt, men en variant är att du tittar på talen som står i nämnaren. Vi har
3, 4 och 6. Då tänker du: "Vilket är det minsta tal jag kan komma på som är
delbart med 3, 4 och 6?". Svaret är 12. Då är 12 den minsta gemensamma
nämnaren. (Du kanske såg att 3, 4 och 6 är delbart med 24 och då går det
bra att multiplicera båda led med 24 också, huvudsaken är att vi hittar en
gemensam nämnare.)

Vi multiplicerar båda led med MGN = 12:

$$
12\left(\frac{x}{3} + \frac{1}{4}\right) = 12 \cdot \frac{5}{6}
$$

$$
\frac{12x}{3} + \frac{12 \cdot 1}{4} = \frac{12 \cdot 5}{6}
$$

$$
4x + 3 = 10
$$

$$
4x + 3 - 3 = 10 - 3
$$

$$
4x = 7
$$

$$
\frac{4x}{4} = \frac{7}{4}
$$

$$
x = \frac{7}{4}
$$

**Svar:** $x = \dfrac{7}{4}$

**Alternativ 2: Skriv om båda led som ett bråk och använd korsvis
multiplikation**

Vi förlänger bråken i VL med varandras nämnare för att göra dem
liknämniga:

$$
\frac{x \cdot 4}{3 \cdot 4} + \frac{1 \cdot 3}{4 \cdot 3} = \frac{5}{6}
$$

$$
\frac{4x}{12} + \frac{3}{12} = \frac{5}{6}
$$

$$
\frac{4x + 3}{12} = \frac{5}{6}
$$

Nu använder vi korsvis multiplikation:

$$
6(4x + 3) = 12 \cdot 5
$$

$$
24x + 18 = 60
$$

$$
24x + 18 - 18 = 60 - 18
$$

$$
24x = 42
$$

$$
x = \frac{42}{24} = \frac{42/2}{24/2} = \frac{21}{12} = \frac{21/3}{12/3} = \frac{7}{4}
$$

**Svar:** $x = \dfrac{7}{4}$
:::

::: exempel "Exempel 4 — Variabler i nämnarna"
**Lös $\dfrac{5}{3x} - \dfrac{1}{2x} = \dfrac{1}{6}$.**

Vi har $3x$ och $2x$ i nämnarna, vilka båda ger att $x \neq 0$.

Det här är en variant med tre bråk, så vi löser den genom att multiplicera
båda led med MGN. Lägg märke till att MGN även ska vara delbart med $x$,
eftersom $x$ finns med i nämnarna. Så MGN = $6x$.

När vi multiplicerar med MGN = $6x$ kan vi direkt göra det genom att
multiplicera *varje täljare* med $6x$, så går lösningen snabbare:

$$
\frac{6x \cdot 5}{3x} - \frac{6x \cdot 1}{2x} = \frac{6x \cdot 1}{6}
$$

$$
2 \cdot 5 - 3 \cdot 1 = x \cdot 1
$$

$$
10 - 3 = x
$$

$$
7 = x
$$

**Svar:** $x = 7$
:::

::: exempel "Exempel 5 — När lösningen inte är tillåten"
**Lös $\dfrac{5x - 35}{x - 7} = 4$.**

Vi har $(x - 7)$ i nämnaren, så $x \neq 7$.

Täljaren är lika med produkten av kvoten och nämnaren:

$$
5x - 35 = 4(x - 7)
$$

$$
5x - 35 = 4x - 28
$$

Subtraherar $4x$ från båda led:

$$
x - 35 = -28
$$

Adderar 35 till båda led:

$$
x = 7
$$

Men $x \neq 7$, så ekvationen saknar lösning.

**Svar:** Saknar lösning.
:::
