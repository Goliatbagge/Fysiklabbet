---
id: ma3c-4.5
title: Andraderivatan och lokala extrempunkter
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.5'
---

# Andraderivatan och lokala extrempunkter

Vi har tidigare konstaterat att andraderivatans tecken säger något om
kurvans utseende.

::: härledning "Kom ihåg — Andraderivatan och konkavitet"
Om

- $f''(a) > 0$ är kurvan **konvex**, dvs. den "böjer av uppåt" (är en
  "glad mun") där $x = a$,
- $f''(a) < 0$ är kurvan **konkav**, dvs. den "böjer av nedåt" (är en
  "sur mun") där $x = a$,
- $f''(a) = 0$ har vi en **inflexionspunkt** (övergången mellan konvex och
  konkav) där $x = a$.
:::

Andraderivatans tecken kan vi utnyttja för att bestämma karaktären hos
lokala extrempunkter! En lokal minimipunkt ligger alltid på en "glad mun",
så där måste andraderivatan vara positiv. En lokal maximipunkt ligger
alltid på en "sur mun", så där måste andraderivatan vara negativ.

För att bestämma karaktären hos extrempunkter behöver vi alltså **inte**
göra teckenstudier med en teckentabell — vi kan göra det snabbare med
andraderivatans tecken!

## Andraderivatan och extrempunktens karaktär

::: tips "Andraderivatan och extrempunktens karaktär"
Om $f'(a) = 0$ och

1. $f''(a) > 0$ (positiv) har funktionen $f(x)$ en lokal **minimipunkt**
   där $x = a$,
2. $f''(a) < 0$ (negativ) har funktionen $f(x)$ en lokal **maximipunkt**
   där $x = a$,
3. $f''(a) = 0$ har funktionen $f(x)$ en **terrasspunkt** eller en lokal
   extrempunkt där $x = a$. Ett teckenstudium (teckentabell) krävs då för
   att avgöra karaktären.
:::

Metoden kallas ibland **andraderivatametoden** och fungerar som ett
alternativ till teckentabellen så länge $f''(a) \neq 0$.

::: tips "Steg för steg"
1. Derivera funktionen, sätt $f'(x) = 0$ och lös ekvationen för att få
   extrempunkternas $x$-koordinater.
2. Sätt in $x$-koordinaterna i den **ursprungliga** funktionen $f(x)$ för
   att få fram $y$-koordinaterna.
3. Derivera $f'(x)$ en gång till för att få andraderivatan $f''(x)$. Sätt
   in extrempunkternas $x$-koordinater i $f''(x)$ och avgör tecknet för att
   bestämma karaktären.
:::

::: exempel "Exempel 1 — Andraderivatametoden"
**Bestäm lokala maximi-, minimi- och terrasspunkter till
$f(x) = \dfrac{x^3}{3} - 9x$.**

**1. Derivera funktionen, sätt $f'(x) = 0$ och lös ekvationen** för att få
extrempunkternas $x$-koordinater.

$$
f'(x) = \frac{3x^2}{3} - 9 = x^2 - 9
$$

$$
f'(x) = 0 \; \Rightarrow \; x^2 - 9 = 0 \; \Rightarrow \; x^2 = 9 \;
\Rightarrow \; x = \pm\sqrt{9} = \pm 3
$$

Alltså är $x_1 = -3$ och $x_2 = 3$.

**2. Sätt in $x$-värdena i den ursprungliga funktionen** för att få fram
$y$-koordinaterna.

$$
f(-3) = \frac{(-3)^3}{3} - 9 \cdot (-3) = \frac{-27}{3} + 27 = -9 + 27 = 18
$$

så $(-3, 18)$ är en lokal extrempunkt.

$$
f(3) = \frac{3^3}{3} - 9 \cdot 3 = \frac{27}{3} - 27 = 9 - 27 = -18
$$

så $(3, -18)$ är en lokal extrempunkt.

**3. Bestäm extrempunkternas karaktär** genom att sätta in deras
$x$-värden i andraderivatan och undersöka tecknet.

Sedan tidigare har vi $f'(x) = x^2 - 9$. Vi deriverar den en gång till för
att få andraderivatan.

$$
f''(x) = 2x
$$

Vi sätter nu in extrempunkternas $x$-koordinater $-3$ och $3$ för att
avgöra karaktären.

$$
f''(-3) = 2 \cdot (-3) = -6 < 0 \; \text{(negativ)} \;
\Rightarrow \; \text{maximipunkt}
$$

Så $(-3, 18)$ är en maximipunkt.

$$
f''(3) = 2 \cdot 3 = 6 > 0 \; \text{(positiv)} \; \Rightarrow \;
\text{minimipunkt}
$$

Så $(3, -18)$ är en minimipunkt.

**Svar:** $(-3, 18)$ är en lokal maximipunkt och $(3, -18)$ är en lokal
minimipunkt.
:::
