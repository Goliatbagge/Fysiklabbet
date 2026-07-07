---
id: ma2c-1.2
title: Substitutionsmetoden
course: Matematik nivå 2c
chapter: Linjära ekvationssystem
chapterNumber: 1
section: '1.2'
---

# Substitutionsmetoden

Förutom att lösa ekvationssystem grafiskt, så kan vi lösa dem
**algebraiskt** (med algebraiska metoder). En metod för att lösa
ekvationssystem algebraiskt är **substitutionsmetoden**. (Att utföra en
substitution innebär att man byter ut något och det är precis det vi
gör.)

::: tips "Lösa ekvationssystem med substitutionsmetoden"
1. Lös ut en valfri variabel från en valfri ekvation i ekvationssystemet.
2. **Byt ut** variabeln mot uttrycket du fick i den ekvation som du inte
   använt.
3. Lös ekvationen och bestäm värdet för den ena variabeln.
4. Sätt in värdet på den ena variabeln i någon av de tidigare
   ekvationerna för att få värdet på den andra variabeln.
:::

::: exempel "Exempel 1 — Variabeln redan utlöst"
**Lös ekvationssystemet**

$$
\begin{cases}
y = 2x - 4 \\
y = -x + 5
\end{cases}
$$

Vi börjar med att ge ekvationerna etiketter för att underlätta
hänvisning till dem. Vi kallar den övre ekvationen för (1) och den undre
ekvationen för (2).

$$
\begin{cases}
y = 2x - 4 & (1) \\
y = -x + 5 & (2)
\end{cases}
$$

Enligt ekvation (1) är $y = 2x - 4$. Vi byter ut (substituerar) $y$ mot
$2x - 4$ i ekvation (2). Det ger

$$
2x - 4 = -x + 5
$$

Vi samlar alla $x$ på ena sidan genom att addera $x$ till båda led, och
adderar sedan 4 till båda led:

$$
3x - 4 = 5
$$

$$
3x = 9
$$

Division med 3 i båda led ger

$$
\frac{3x}{3} = \frac{9}{3}
$$

$$
x = 3
$$

Vi har nu bestämt $x$. Vi sätter nu in $x = 3$ i någon av de
ursprungliga ekvationerna (vilken spelar ingen roll) för att få ut $y$.
Insättning av $x = 3$ i ekvation (1) ger

$$
y = 2 \cdot 3 - 4 = 6 - 4 = 2
$$

Så $y = 2$. Lösningen till ett ekvationssystem brukar anges med klammer.

**Svar:**

$$
\begin{cases}
x = 3 \\
y = 2
\end{cases}
$$
:::

::: exempel "Exempel 2 — Lös ut en variabel först"
**Lös ekvationssystemet**

$$
\begin{cases}
2x - y = 7 \\
x - 3y = 1
\end{cases}
$$

Vi skriver av ekvationssystemet och sätter etiketter.

$$
\begin{cases}
2x - y = 7 & (1) \\
x - 3y = 1 & (2)
\end{cases}
$$

Här står inte $x$ eller $y$ ensamt i det ena ledet, så vi börjar med att
lösa ut $x$ eller $y$ från någon av ekvationerna. Vi löser ut $x$ från
ekvation (2) eftersom det är enklast (då den saknar koefficienter och
minustecken framför). Vi adderar $3y$ till båda led:

$$
x = 1 + 3y \qquad (3)
$$

Då sätter vi $x = 1 + 3y$ i ekvation (1) (den ekvation som vi inte
använt oss av) och löser sedan ut $y$:

$$
2(1 + 3y) - y = 7
$$

$$
2 + 6y - y = 7
$$

$$
2 + 5y = 7
$$

Vi subtraherar 2 från båda led och dividerar sedan med 5:

$$
5y = 5
$$

$$
y = 1
$$

Vi har nu bestämt $y$. Vi sätter nu in $y = 1$ i någon av våra
ekvationer. Insättning av $y = 1$ i ekvation (3) ger

$$
x = 1 + 3 \cdot 1 = 1 + 3 = 4
$$

Så $x = 4$.

**Svar:**

$$
\begin{cases}
x = 4 \\
y = 1
\end{cases}
$$
:::
