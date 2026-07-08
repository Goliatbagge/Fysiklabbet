---
id: ma3c-1.4
title: Gränsvärden
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.4'
---

# Gränsvärden

::: härledning "Introduktion — gränsvärde"
Vi undersöker värdet hos uttrycket $\dfrac{1}{x}$ när $x$ blir större och
större.

$$
\frac{1}{10} = 0{,}1 \qquad \frac{1}{100} = 0{,}01 \qquad
\frac{1}{1000} = 0{,}001 \qquad \frac{1}{10\,000} = 0{,}0001
$$

Vi ser att när $x$ ökar, kommer värdet av $\dfrac{1}{x}$ närmare och närmare
0. Talet 0 är den gräns som värdet går mot — men det når aldrig fram dit.
Vi säger att **gränsvärdet är 0**.
:::

Ett värde som ett uttryck närmar sig kallas **gränsvärde**. I exemplet ovan
gäller alltså att gränsvärdet när $x$ går mot oändligheten ($\infty$) för
$\dfrac{1}{x}$ är lika med 0. Detta skrivs

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

Beteckningen $\lim_{x \to \infty}$ utläses "limes då $x$ går mot
oändligheten" eller "gränsvärdet då $x$ går mot oändligheten" (ordet kommer
av det latinska *limes*, som betyder just "gräns" — jämför med engelskans
*limit*).

Gränsvärden kan bestämmas med olika metoder beroende på hur uttrycket ser ut
och på om variabeln går mot ett tal eller mot en oändlighet.

## Gränsvärde då variabeln går mot ett tal

::: tips "Bestämma gränsvärde då variabeln går mot ett tal"
1. **Metod 1:** Sätt in det värde som $x$ går mot direkt och beräkna.
2. **Metod 2:** Faktorisera och förkorta uttrycket, och sätt sedan in
   värdet som $x$ går mot.
3. **Metod 3:** Gör två tabeller och närma dig värdet som $x$ går mot
   underifrån ("från vänster") respektive ovanifrån ("från höger"). Går de
   mot samma gränsvärde är det uttryckets gränsvärde. Går de mot olika
   värden saknas gränsvärde.

Metoderna är sorterade efter hur effektiva de är. Fungerar inte metod 1, gå
vidare till metod 2. Fungerar inte metod 2, gå vidare till metod 3.
:::

::: exempel "Exempel 1 — Sätta in värdet direkt"
**Bestäm $\displaystyle\lim_{x \to 2} (x + 5)$.**

Uttrycket $x + 5$ är definierat för alla $x$, så metod 1 fungerar: vi sätter
in $x = 2$ direkt (samtidigt som limes-beteckningen tas bort) och beräknar.

$$
\lim_{x \to 2} (x + 5) = 2 + 5 = 7
$$

**Svar:** $7$
:::

::: exempel "Exempel 2 — Förkorta uttrycket"
**Bestäm $\displaystyle\lim_{x \to 1} \frac{x^2 - 1}{x - 1}$ a) med tabeller
b) genom att förkorta uttrycket.**

Metod 1 fungerar inte: sätter vi in $x = 1$ får vi $\dfrac{0}{0}$, och
uttrycket är inte definierat där.

**a)** Vi gör två tabeller och närmar oss värdet 1 underifrån respektive
ovanifrån.

| Underifrån $x$ | $\dfrac{x^2 - 1}{x - 1}$ | Ovanifrån $x$ | $\dfrac{x^2 - 1}{x - 1}$ |
| --- | --- | --- | --- |
| 0,9 | 1,9 | 1,1 | 2,1 |
| 0,99 | 1,99 | 1,01 | 2,01 |
| 0,999 | 1,999 | 1,001 | 2,001 |

Både underifrån och ovanifrån närmar sig uttrycket värdet 2 när $x$ går mot
1, så

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2
$$

**b)** Vi faktoriserar täljaren med konjugatregeln och förkortar bort den
gemensamma faktorn $(x - 1)$.

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} \frac{(x + 1)(x - 1)}{x - 1} = \lim_{x \to 1} (x + 1)
$$

Nu är uttrycket definierat vid $x = 1$, så vi sätter in värdet (samtidigt
som limes-beteckningen tas bort) och beräknar.

$$
\lim_{x \to 1} (x + 1) = 1 + 1 = 2
$$

**Svar:** $2$
:::

::: exempel "Exempel 3 — Gränsvärde saknas"
**Bestäm $\displaystyle\lim_{x \to 3} \frac{x + 1}{x - 3}$.**

Metod 1 fungerar inte eftersom nämnaren blir 0 vid $x = 3$. Vi kan inte
heller förkorta uttrycket enligt metod 2 — varken täljaren eller nämnaren
går att faktorisera. Då återstår metod 3: två tabeller där $x$ närmar sig 3
underifrån respektive ovanifrån.

| Underifrån $x$ | $\dfrac{x + 1}{x - 3}$ | Ovanifrån $x$ | $\dfrac{x + 1}{x - 3}$ |
| --- | --- | --- | --- |
| 2,9 | −39 | 3,1 | 41 |
| 2,99 | −399 | 3,01 | 401 |
| 2,999 | −3999 | 3,001 | 4001 |

Underifrån växer uttrycket mot $-\infty$, medan det ovanifrån växer mot
$+\infty$. Eftersom vi får **olika** gränsvärden underifrån och ovanifrån
saknas gränsvärde.

**Svar:** Gränsvärde saknas.
:::

## Gränsvärde då variabeln går mot en oändlighet

Går enbart täljaren i ett uttryck mot en oändlighet är täljaren alltid
oändligt mycket större än nämnaren, hur stor nämnaren än är — gränsvärdet
blir då en oändlighet. Går i stället enbart nämnaren mot en oändlighet blir
nämnaren oändligt mycket större än täljaren, och kvoten går mot 0. Går
**både** täljaren och nämnaren mot en oändlighet måste uttrycket först
förenklas: konstanttermer kan strykas eftersom de försvinner i jämförelse
med en oändlighet (att hälla en tesked vatten i havet gör fortfarande havet
"oändligt" mycket större). Därefter kan uttrycket förkortas och
gränsvärdet bestämmas.

::: tips "Bestämma gränsvärde då variabeln går mot en oändlighet"
Om en variabel $x$ går mot

- den positiva oändligheten skrivs det $x \to \infty$ eller $x \to +\infty$
- den negativa oändligheten skrivs det $x \to -\infty$

Ett uttryck med en oändlighet

- enbart i täljaren ger en oändlighet som gränsvärde
- enbart i nämnaren ger 0 som gränsvärde
- i både täljaren och nämnaren förenklas genom att konstanttermer stryks.
  Därefter görs en förkortning och gränsvärdet kan bestämmas.
:::

::: exempel "Exempel 4 — Oändlighet i nämnaren"
**Bestäm $\displaystyle\lim_{x \to \infty} \frac{5}{x}$.**

Vi har ett gränsvärde med en oändlighet enbart i nämnaren. Gränsvärdet blir
då 0.

**Svar:** $0$
:::

::: exempel "Exempel 5 — Oändlighet i både täljare och nämnare"
**Bestäm $\displaystyle\lim_{x \to \infty} \frac{3x + 2}{x - 1}$.**

Vi har ett gränsvärde med oändligheter i både täljaren och nämnaren. Vi
stryker konstanttermerna, förkortar och beräknar.

$$
\lim_{x \to \infty} \frac{3x + 2}{x - 1} = \lim_{x \to \infty} \frac{3x}{x} = \lim_{x \to \infty} 3 = 3
$$

**Svar:** $3$
:::
