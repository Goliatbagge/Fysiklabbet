---
id: ma3c-3.2
title: Derivatan av polynomfunktioner
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.2'
---

# Derivatan av polynomfunktioner

En funktion med flera termer kallas **polynomfunktion**. Vi undersöker om det
finns enkla deriveringsregler även för polynomfunktioner.

Sedan tidigare har vi derivatans definition

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

::: härledning "Härledning — Derivatan av $f(x) = x^2 + 4x - 7$ med definitionen"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{(x+h)^2 + 4(x+h) - 7 - (x^2 + 4x - 7)}{h} \\
&= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 + 4x + 4h - 7 - x^2 - 4x + 7}{h} = \lim_{h \to 0} \frac{2xh + h^2 + 4h}{h} \\
&= \lim_{h \to 0} \frac{h(2x + h + 4)}{h} = \lim_{h \to 0} (2x + h + 4) = 2x + 4
\end{aligned}
$$

Så $f(x) = x^2 + 4x - 7$ har derivatan $f'(x) = 2x + 4$.
:::

Om vi i stället deriverar samma funktion $f(x) = x^2 + 4x - 7$ **term för
term**, med de deriveringsregler vi tidigare tagit fram (multiplicera ner
exponenten och minska den med 1), får vi

- $x^2$ har derivatan $2x$
- $4x$ har derivatan $4$
- $-7$ har derivatan $0$

Lägger vi ihop dessa termer får vi $f'(x) = 2x + 4$ — precis samma svar som
med derivatans definition ovan!

::: formel "Derivatan av polynom"
Derivatan av en funktion med flera termer (ett polynom) fås genom att
derivera funktionen **term för term**.
:::

::: exempel "Exempel 1 — Derivera term för term"
**Derivera<br>a) $f(x) = 3x^7 - 5x^2 + 8$&emsp;&emsp;b)
$f(x) = \dfrac{4x^3}{3} - \dfrac{x}{5}$&emsp;&emsp;c) $f(x) = (2x - 3)^2$**

**a)** Vi deriverar term för term och får

$$
f'(x) = 7 \cdot 3x^6 - 2 \cdot 5x = 21x^6 - 10x
$$

**Svar:** $f'(x) = 21x^6 - 10x$

**b)** Vi deriverar täljarna med de vanliga deriveringsreglerna och behåller
nämnarna oförändrade.

$$
f'(x) = \frac{3 \cdot 4x^2}{3} - \frac{1}{5} = \frac{12x^2}{3} - \frac{1}{5} = 4x^2 - \frac{1}{5}
$$

**Svar:** $f'(x) = 4x^2 - \dfrac{1}{5}$

**c)** Har funktionen ett parentesuttryck måste vi först utveckla parentesen
och därefter derivera som vanligt. Vi utvecklar med andra kvadreringsregeln.

$$
f(x) = 4x^2 - 12x + 9
$$

Nu deriverar vi term för term.

$$
f'(x) = 2 \cdot 4x - 12 = 8x - 12
$$

**Svar:** $f'(x) = 8x - 12$
:::

::: exempel "Exempel 2 — Derivatans värde i en punkt"
**Låt $f(x) = 3x^2 - x$. Bestäm $f'(-2)$.**

Vi börjar med att derivera funktionen.

$$
f'(x) = 2 \cdot 3x - 1 = 6x - 1
$$

Därefter sätter vi in $x = -2$ i derivatafunktionen.

$$
f'(-2) = 6 \cdot (-2) - 1 = -12 - 1 = -13
$$

**Svar:** $-13$
:::
