---
id: ma3c-1.2
title: Addition och subtraktion av rationella uttryck
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.2'
---

# Addition och subtraktion av rationella uttryck

För att addera och subtrahera rationella uttryck krävs (precis som för
bråk) att de har **samma nämnare**. I det här avsnittet löser vi också
ekvationer som innehåller rationella uttryck.

::: tips "Lösa ekvationer med rationella uttryck"
Kontrollera först för vilka värden på $x$ som nämnaren eller nämnarna blir
lika med noll. För dessa värden är ekvationen inte definierad, så de är
inte tillåtna som lösningar. Lös sedan ekvationen med någon av metoderna:

1. **Multiplicera med minsta gemensamma nämnaren (MGN).** Multiplicera
   båda leden med MGN (eller en annan gemensam nämnare). Förkorta sedan
   och lös som vanligt.
2. **Gör liknämnigt.** Förläng termerna så att de får samma nämnare. Slå
   sedan ihop dem på ett enda divisionsstreck och utnyttja att
   $\text{täljare} = \text{kvot} \cdot \text{nämnare}$ (eller motsvarande).
:::

## Addera och subtrahera rationella uttryck

Har termerna redan samma nämnare adderar eller subtraherar vi bara
täljarna — nämnaren förblir densamma. Har de olika nämnare måste vi först
göra dem liknämniga, precis som för vanliga bråk: vi förlänger varje term
med den andra termens nämnare.

::: exempel "Exempel 1 — Förenkla"
**Förenkla**

$$
\text{a)}\ \frac{5x^2}{x - 2} + \frac{7}{x - 2} \qquad
\text{b)}\ \frac{8x}{x + 3} - \frac{5x - 9}{x}
$$

**a)** Här har båda termerna samma nämnare, så täljarna adderas.

$$
\frac{5x^2}{x - 2} + \frac{7}{x - 2} = \frac{5x^2 + 7}{x - 2}
$$

**Svar:** $\dfrac{5x^2 + 7}{x - 2}$

**b)** Här har termerna olika nämnare. För att få samma nämnare förlänger
vi den första termen med nämnaren i den andra termen, $x$, och den andra
termen med nämnaren i den första termen, $(x + 3)$.

$$
\frac{8x}{x + 3} - \frac{5x - 9}{x} = \frac{8x \cdot x}{(x + 3) \cdot x} - \frac{(5x - 9)(x + 3)}{x \cdot (x + 3)} = \frac{8x^2}{x(x + 3)} - \frac{(5x - 9)(x + 3)}{x(x + 3)}
$$

Nu har båda termerna samma nämnare $x(x + 3)$, och vi kan subtrahera
täljarna på ett gemensamt divisionsstreck.

$$
\frac{8x^2 - (5x - 9)(x + 3)}{x(x + 3)} = \frac{8x^2 - (5x^2 + 15x - 9x - 27)}{x(x + 3)} = \frac{8x^2 - 5x^2 - 15x + 9x + 27}{x(x + 3)} = \frac{3x^2 - 6x + 27}{x(x + 3)} = \frac{3(x^2 - 2x + 9)}{x(x + 3)}
$$

Vi undersöker om $(x^2 - 2x + 9)$ kan faktoriseras mer genom att bestämma
dess nollställen.

$$
x^2 - 2x + 9 = 0
$$

$pq$-formeln ger

$$
x = 1 \pm \sqrt{1^2 - 9} = 1 \pm \sqrt{-8}
$$

Uttrycket under rottecknet är negativt, så andragradsekvationen saknar
reella rötter. $(x^2 - 2x + 9)$ kan alltså inte faktoriseras mer.

**Svar:** $\dfrac{3(x^2 - 2x + 9)}{x(x + 3)}$
:::

## Lös ekvationer med rationella uttryck

När en ekvation innehåller rationella uttryck börjar vi alltid med att
kontrollera vilka $x$-värden som gör någon nämnare lika med noll — dessa
värden får aldrig vara med i svaret. Sedan löser vi ekvationen med metod 1
eller metod 2 från rutan ovan.

::: exempel "Exempel 2 — Lös ekvationerna"
**Lös ekvationerna**

$$
\text{a)}\ \frac{x}{2} - \frac{x}{8} = 24 \qquad
\text{b)}\ \frac{1}{3} + \frac{2}{x - 3} = 1 \qquad
\text{c)}\ \frac{x}{x - 1} = \frac{2x}{x^2 - 1}
$$

**a)** Ingen nämnare innehåller $x$, så ekvationen är definierad för alla
$x$.

*Metod 1: Multiplicera med MGN.* Här är MGN $= 8$. Vi multiplicerar båda
leden med 8.

$$
\frac{x}{2} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{x \cdot 8}{2} - \frac{x \cdot 8}{8} = 24 \cdot 8 \quad\Rightarrow\quad 4x - x = 192 \quad\Rightarrow\quad 3x = 192 \quad\Rightarrow\quad x = 64
$$

**Svar:** $x = 64$

*Metod 2: Göra liknämnigt.* Vi förlänger den första termen med 4 för att
få samma nämnare.

$$
\frac{x}{2} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{4x}{8} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{4x - x}{8} = 24 \quad\Rightarrow\quad \frac{3x}{8} = 24
$$

$$
3x = 24 \cdot 8 = 192 \quad\Rightarrow\quad x = \frac{192}{3} = 64
$$

**Svar:** $x = 64$

**b)** Nämnaren $(x - 3)$ gör att ekvationen inte är definierad för
$x = 3$, så $x \neq 3$. Vi multiplicerar båda leden med MGN
$= 3(x - 3)$.

$$
\frac{1 \cdot 3(x - 3)}{3} + \frac{2 \cdot 3(x - 3)}{x - 3} = 1 \cdot 3(x - 3)
$$

$$
(x - 3) + 2 \cdot 3 = 3(x - 3) \quad\Rightarrow\quad x - 3 + 6 = 3x - 9 \quad\Rightarrow\quad x + 3 = 3x - 9
$$

$$
3 = 2x - 9 \quad\Rightarrow\quad 12 = 2x \quad\Rightarrow\quad x = 6
$$

**Svar:** $x = 6$

**c)** Vi undersöker för vilka $x$ som nämnarna blir noll.

$$
x - 1 = 0 \iff x = 1 \qquad\qquad x^2 - 1 = 0 \iff x = \pm 1
$$

Så $x \neq 1$ och $x \neq -1$. Vi faktoriserar täljare och nämnare så
långt det går — $(x^2 - 1)$ är en konjugat och faktoriseras som
$(x + 1)(x - 1)$.

$$
\frac{x}{x - 1} = \frac{2x}{(x + 1)(x - 1)}
$$

Vi multiplicerar båda leden med MGN $= (x + 1)(x - 1)$.

$$
\frac{x(x + 1)(x - 1)}{x - 1} = \frac{2x(x + 1)(x - 1)}{(x + 1)(x - 1)} \quad\Rightarrow\quad x(x + 1) = 2x
$$

Vi utvecklar och gör högerledet lika med noll.

$$
x^2 + x = 2x \quad\Rightarrow\quad x^2 - x = 0 \quad\Rightarrow\quad x(x - 1) = 0
$$

Nollproduktmetoden ger $x_1 = 0$ och $x_2 = 1$. Eftersom $x \neq 1$
förkastar vi lösningen $x_2 = 1$.

**Svar:** $x = 0$
:::
