---
id: ma3c-1.5
title: Symbolhanterande hjälpmedel
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.5'
---

# Symbolhanterande hjälpmedel

En räknare som inte bara kan hantera numeriska beräkningar (beräkningar med
siffror), utan också kan hantera algebraiska uttryck (bokstavsuttryck),
kallas **symbolhanterande hjälpmedel**. Geogebra är ett exempel på ett
sådant hjälpmedel.

Symbolhanterande hjälpmedel kan t.ex. användas för att förenkla uttryck,
faktorisera uttryck, lösa ekvationer och bestämma gränsvärden.

::: tips "Kommandon i Geogebra"
| Uppgift | Kommando i Geogebra |
| --- | --- |
| Förenkla uttryck | Förenkla( Funktion ) |
| Faktorisera uttryck | Faktorisera( Polynom ) |
| Lösa ekvationer numeriskt (skriver ut decimaler) | NLös( Ekvation ) |
| Lösa ekvationer exakt (skriver ut symboler) | Lös( Ekvation ) |
| Bestämma funktionsvärde | Definiera $f(x) = \ldots$ och skriv sedan t.ex. $f(3)$ |
| Beräkna gränsvärde | Gränsvärde( Funktion, Värde ) |
:::

::: exempel "Exempel 1 — Förenkla ett uttryck"
**Förenkla $(x + 3)(x - 1)(x + 5)$ med symbolhanterande hjälpmedel.**

Kommandot *Utveckla* är nära besläktat med *Förenkla* i tabellen ovan — det
multiplicerar ut parenteserna och skriver om uttrycket i utvecklad
(expanderad) form. I Geogebras inmatningsfält skriver vi "utv" och väljer
*Utveckla( Uttryck )* i menyn *Utveckla*. Vi skriver in uttrycket och slår
Enter.

$$
\begin{aligned}
&\text{Utveckla}\big((x + 3)(x - 1)(x + 5)\big) \\
&\rightarrow\ x^3 + 7x^2 + 7x - 15
\end{aligned}
$$

**Svar:** $x^3 + 7x^2 + 7x - 15$
:::

::: exempel "Exempel 2 — Faktorisera ett uttryck"
**Faktorisera $x^3 + 7x^2 + 7x - 15$ med symbolhanterande hjälpmedel.**

I Geogebras inmatningsfält skriver vi "fakt" och väljer
*Faktorisera( Polynom )* i menyn *Faktorisera*. Vi definierar en funktion med
uttrycket i kommandot och slår Enter.

$$
\begin{aligned}
&f(x) = \text{Faktorisera}(x^3 + 7x^2 + 7x - 15) \\
&=\ (x - 1)(x + 3)(x + 5)
\end{aligned}
$$

**Svar:** $(x - 1)(x + 3)(x + 5)$
:::

::: exempel "Exempel 3 — Lös en tredjegradsekvation"
**Lös ekvationen $x^3 - x^2 - 3x + 3 = 0$ med symbolhanterande hjälpmedel.
Svara<br>a) med två decimaler&emsp;&emsp;b) exakt.**

**a)** I Geogebras inmatningsfält skriver vi "nlös" och väljer
*NLös( Ekvation )* i menyn *NLös*. Vi skriver in ekvationen och slår Enter.

$$
\begin{aligned}
&l_1 = \text{NLös}(x^3 - x^2 - 3x + 3 = 0) \\
&\approx\ \{x = -1{,}73205,\ x = 1,\ x = 1{,}73205\}
\end{aligned}
$$

**Svar:** $x_1 \approx -1{,}73$, $x_2 = 1$ och $x_3 \approx 1{,}73$

**b)** I stället skriver vi "lös" och väljer *Lös( Ekvation )* i menyn *Lös*.

$$
\begin{aligned}
&l_1 = \text{Lös}(x^3 - x^2 - 3x + 3 = 0) \\
&=\ \{x = -\sqrt{3},\ x = 1,\ x = \sqrt{3}\}
\end{aligned}
$$

**Svar:** $x_1 = -\sqrt{3}$, $x_2 = 1$ och $x_3 = \sqrt{3}$
:::

Observera att man i Geogebra enkelt kan växla mellan exakt och ungefärlig
form med knapparna "$=$" och "$\approx$" utan att skriva om hela
kommandot.

::: exempel "Exempel 4 — Funktionsvärde och ekvationslösning"
**Funktionen $f(x) = x^3 - 4x^2$ är given. Med symbolhanterande hjälpmedel,
bestäm<br>a) $f(7)$&emsp;&emsp;b) lösningen till $f(x) = 7$.**

**a)** Vi definierar funktionen genom att skriva $f(x) = x^3 - 4x^2$ i
Geogebras inmatningsfält. Därefter skriver vi $f(7)$ på raden under och får
vårt värde.

$$
\begin{aligned}
&f(x) = x^3 - 4x^2 \\[2pt]
&f(7) \\[2pt]
&=\ 147
\end{aligned}
$$

**Svar:** $147$

**b)** Vi definierar funktionen precis som i a). På raden under väljer vi
kommandot *Lös( Ekvation )* och skriver $f(x) = 7$ (eller bara $f = 7$) i
parentesen.

$$
\begin{aligned}
&\text{Lös}(f = 7) \\
&=\ \{x = 4{,}36705\}
\end{aligned}
$$

**Svar:** $x \approx 4{,}37$
:::

::: exempel "Exempel 5 — Gränsvärde"
**Bestäm $\displaystyle\lim_{x \to \infty} \frac{3x + 2}{x - 1}$ med
symbolhanterande hjälpmedel.**

I Geogebras inmatningsfält skriver vi "grän" och väljer
*Gränsvärde( Funktion, Värde )* i menyn *Gränsvärde*. Vi skriver in
uttrycket och det värde som variabeln går mot, och slår Enter.

$$
\begin{aligned}
&\text{Gränsvärde}\!\left(\frac{3x + 2}{x - 1},\ \infty\right) \\
&\rightarrow\ 3
\end{aligned}
$$

Oändlighetstecknet $\infty$ hittar du bland tangentbordets specialtecken,
eller genom att skriva "infinity".

**Svar:** $3$
:::
