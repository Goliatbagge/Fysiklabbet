---
id: ma1c-2.4
title: Faktorisera uttryck
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.4'
---

# Faktorisera uttryck

När vi skriver ett uttryck som en multiplikation kallas det att
**faktorisera uttryck**. Att faktorisera underlättar att lösa vissa
ekvationer och att förkorta rationella uttryck.

::: formel "Faktorisera"
Hitta en eller flera **gemensamma faktorer** för alla termer i uttrycket.
"Bryt ut" den gemensamma faktorn och färdigställ uttrycket genom att "tänka
baklänges".
:::

::: exempel "Exempel 1 — Faktorisera så långt som möjligt"
**Faktorisera så långt som möjligt<br>a) $27x^2 - 18x$&emsp;&emsp;b) $5x^3 + 20x^5$&emsp;&emsp;c) $21x^2 - 14$&emsp;&emsp;d) $4x^3 - 6x^2 + 10x$&emsp;&emsp;e) $81y - 45x^2y + 27xy^2$**

**a)** Vi börjar med att titta på koefficienterna. Det största tal som 27
och 18 båda är delbara med är 9 (de finns i 9:ans gångertabell) och därför
är 9 en gemensam faktor. Alltså kan vi bryta ut **9**.

Därefter tittar vi på variablerna. Alla termer innehåller variabeln $x$.
Då kan vi bryta ut den *minsta* potensen av $x$. Alltså kan vi bryta ut
$x$.

Eftersom vi kan bryta ut både 9 och $x$, så bryter vi ut $9x$. Sedan sätter
vi en parentes efteråt och tänker "distributiva lagen baklänges" för att
uttrycket ska bli detsamma som det ursprungliga:

$$
9x(\phantom{3x - 2})
$$

Vi tänker "$9x$ gånger något ska bli $27x^2$". Det måste vara $3x$. Då
fyller vi på med $3x$ i parentesen. Efter $27x^2$ i det ursprungliga
uttrycket kommer ett minustecken. Då fyller vi på med ett minustecken.
Till sist tänker vi "$9x$ gånger något ska bli $18x$". Det måste vara 2.
Då fyller vi på med 2 i parentesen. Eftersom vi sedan är klara avslutar vi
med en parentes:

$$
27x^2 - 18x = 9x(3x - 2)
$$

(Om vi vill kan vi kontrollera att uttrycket blir $27x^2 - 18x$ när vi
utför multiplikationen.)

**Svar:** $9x(3x - 2)$

**b)** Enligt samma resonemang som i a-uppgiften kan vi här bryta ut
$5x^3$, eftersom den största gemensamma delaren till 5 och 20 är **5** och
den minsta potensen av variablerna är $x^3$. Vi sätter en parentes efter
och fyller på den, så att uttrycket vid multiplikation blir detsamma som
det ursprungliga:

$$
5x^3 + 20x^5 = 5x^3(1 + 4x^2)
$$

**Svar:** $5x^3(1 + 4x^2)$

**c)** I detta fall kan vi endast bryta ut 7 (gemensam delare till 21 och
14) och ingen variabel, eftersom vi har en konstantterm med som inte
innehåller något $x$:

$$
21x^2 - 14 = 7(3x^2 - 2)
$$

**Svar:** $7(3x^2 - 2)$

**d)** I detta fall har vi tre termer. Då ska vi hitta en gemensam faktor
till alla tre termer. 4, 6 och 10 är alla delbara med 2. Alltså kan vi
bryta ut **2**. Den minsta potensen av $x$ är $x$. Alltså kan vi bryta ut
$x$. Vi kan alltså tillsammans bryta ut $2x$:

$$
4x^3 - 6x^2 + 10x = 2x(2x^2 - 3x + 5)
$$

**Svar:** $2x(2x^2 - 3x + 5)$

**e)** I detta fall har vi återigen tre termer som dessutom innehåller två
olika variabler: $x$ och $y$. Då får vi titta på varje variabel för sig.

81, 45 och 27 har **9** som gemensam faktor. Den första termen innehåller
inget $x$, alltså kan vi inte bryta ut något $x$. Alla termer innehåller
$y$. Då kan vi bryta ut den minsta potensen av $y$, dvs. $y$. Tillsammans
bryter vi alltså ut $9y$:

$$
81y - 45x^2y + 27xy^2 = 9y(9 - 5x^2 + 3xy)
$$

**Svar:** $9y(9 - 5x^2 + 3xy)$
:::
