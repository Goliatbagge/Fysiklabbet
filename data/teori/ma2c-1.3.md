---
id: ma2c-1.3
title: Additionsmetoden
course: Matematik nivå 2c
chapter: Linjära ekvationssystem
chapterNumber: 1
section: '1.3'
---

# Additionsmetoden

Att lösa ett ekvationssystem algebraiskt genom att addera ekvationer
kallas **additionsmetoden**.

::: tips "Lösa ekvationssystem med additionsmetoden"
1. Modifiera en eller båda ekvationer så att samma variabelterm, fast
   med olika tecken, finns i båda ekvationer.
2. Addera dem ledvis för att eliminera ena variabeln och lös ut den ena
   variabeln.
3. Sätt in värdet på den ena variabeln i någon av de tidigare
   ekvationerna för att få värdet på den andra variabeln.
:::

::: exempel "Exempel 1 — Addera direkt"
**Lös ekvationssystemet**

$$
\begin{cases}
-2x + 5y = 6 \\
4x - 5y = 12
\end{cases}
$$

Vi ser att båda ekvationer innehåller samma term $5y$ med ett plustecken
framför den ena och ett minustecken framför den andra. Vi adderar
ekvationerna "ledvis" med additionsmetoden!

$$
\begin{array}{rcl}
-2x + 5y & = & 6 \quad (1) \\
+\quad 4x - 5y & = & 12 \quad (2) \\
\hline
2x + 0 & = & 18
\end{array}
$$

$y$-termerna tar ut varandra och kvar blir en ekvation med bara $x$:

$$
2x = 18
$$

$$
\frac{2x}{2} = \frac{18}{2}
$$

$$
x = 9
$$

Insättning av $x = 9$ i (1) ger

$$
-2 \cdot 9 + 5y = 6
$$

$$
-18 + 5y = 6
$$

Vi adderar 18 till båda led och dividerar sedan med 5:

$$
5y = 24
$$

$$
y = \frac{24}{5} = 4{,}8
$$

**Svar:**

$$
\begin{cases}
x = 9 \\
y = 4{,}8
\end{cases}
$$
:::

::: exempel "Exempel 2 — Multiplicera ena ekvationen först"
**Lös ekvationssystemet**

$$
\begin{cases}
5x + 4y = 30 \\
2x - 8y = -12
\end{cases}
$$

Vi börjar med att skriva av ekvationssystemet och sätta etiketter.

$$
\begin{cases}
5x + 4y = 30 & (1) \\
2x - 8y = -12 & (2)
\end{cases}
$$

Innan vi adderar ekvationerna så vill vi ha samma $x$- eller $y$-term i
båda ekvationer, men med olika tecken framför. I den undre ekvationen
har vi termen $-8y$. I den övre ekvationen har vi termen $+4y$. Om vi
multiplicerar den övre ekvationen med 2 kommer termen att bli $+8y$ och
$y$-termerna kommer att kunna elimineras med additionsmetoden. Vi
multiplicerar den övre ekvationen med 2. **Alla** termer i ekvationen
ska då multipliceras med 2:

$$
\begin{cases}
10x + 8y = 60 \\
2x - 8y = -12
\end{cases}
$$

Nu adderar vi ekvationerna.

$$
\begin{array}{rcl}
10x + 8y & = & 60 \\
+\quad 2x - 8y & = & -12 \\
\hline
12x & = & 48
\end{array}
$$

Division med 12 i båda led ger

$$
x = 4
$$

Insättning av $x = 4$ i t.ex. ekvation (1) ger

$$
5 \cdot 4 + 4y = 30
$$

$$
20 + 4y = 30
$$

Vi subtraherar 20 från båda led och dividerar sedan med 4:

$$
4y = 10
$$

$$
y = \frac{10}{4} = 2{,}5
$$

**Svar:**

$$
\begin{cases}
x = 4 \\
y = 2{,}5
\end{cases}
$$
:::

::: exempel "Exempel 3 — Multiplicera båda ekvationerna"
**Lös ekvationssystemet**

$$
\begin{cases}
2x + 7y = 8 \\
5x + 9y = 3
\end{cases}
$$

$$
\begin{cases}
2x + 7y = 8 & (1) \\
5x + 9y = 3 & (2)
\end{cases}
$$

Här räcker det inte att multiplicera en av ekvationerna för att
eliminera $x$ eller $y$. Vi kan då multiplicera **båda** ekvationer. Om
vi t.ex. vill eliminera $x$-termerna kan vi multiplicera ekvationerna
med varandras koefficienter framför $x$ och se till att de får olika
tecken.

Vi multiplicerar den övre ekvationen med 5 (koefficienten framför $x$ i
den undre ekvationen) och den undre ekvationen med −2 (koefficienten
framför $x$ i den övre ekvationen med ombytt tecken). Det ger

$$
\begin{cases}
10x + 35y = 40 \\
-10x - 18y = -6
\end{cases}
$$

Vi adderar nu ekvationerna och fortsätter sedan som vanligt.

$$
\begin{array}{rcl}
10x + 35y & = & 40 \\
+\quad -10x - 18y & = & -6 \\
\hline
17y & = & 34
\end{array}
$$

Division med 17 i båda led ger

$$
y = 2
$$

$y = 2$ i ekvation (1) ger

$$
2x + 7 \cdot 2 = 8
$$

$$
2x + 14 = 8
$$

Vi subtraherar 14 från båda led och dividerar sedan med 2:

$$
2x = -6
$$

$$
x = -3
$$

**Svar:**

$$
\begin{cases}
x = -3 \\
y = 2
\end{cases}
$$
:::
