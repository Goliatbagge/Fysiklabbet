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
"Bryt ut" den gemensamma faktorn och färdigställ uttrycket genom att "räkna
baklänges".
:::

::: exempel "Exempel 1 — Faktorisera så långt som möjligt"
**Faktorisera så långt som möjligt<br>a)&nbsp;$27x^2 - 18x$&emsp;&emsp;b)&nbsp;$5x^3 + 20x^5$&emsp;&emsp;c)&nbsp;$21x^2 - 14$&emsp;&emsp;d)&nbsp;$4x^3 - 6x^2 + 10x$&emsp;&emsp;e)&nbsp;$81y - 45x^2y + 27xy^2$**

::: handskrift
typ: faktoriseraut
:::

::: textlosning
**a)** Vi börjar med att titta på koefficienterna. Det största tal som 27
och 18 båda är delbara med är 9 (de finns i 9:ans gångertabell) och därför
är 9 en gemensam faktor. Alltså kan vi bryta ut **9**.

Därefter tittar vi på variablerna. Alla termer innehåller variabeln $x$.
Då kan vi bryta ut den *minsta* potensen av $x$. Alltså kan vi bryta ut
$x$.

Eftersom vi kan bryta ut både 9 och $x$, så bryter vi ut $9x$. Sedan
öppnar vi en parentes efteråt och räknar "distributiva lagen baklänges"
för att uttrycket ska bli detsamma som det ursprungliga. Parentesen
stänger vi först när alla termer är skrivna, eftersom vi inte vet i
förväg hur lång den blir:

$$
9x(\phantom{3x - 2}
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
$y$. Då kan vi bryta ut den minsta potensen av $y$, det vill säga $y$. Tillsammans
bryter vi alltså ut $9y$:

$$
81y - 45x^2y + 27xy^2 = 9y(9 - 5x^2 + 3xy)
$$

**Svar:** $9y(9 - 5x^2 + 3xy)$
:::
:::

## Bryta ut ett helt parentesuttryck

Den gemensamma faktorn behöver inte vara ett tal eller en variabel. Om
samma parentesuttryck återkommer i flera termer är hela parentesen en
gemensam faktor, och då kan den brytas ut precis som om den vore en enda
faktor. I uttrycket $3(x + 2) - x(x + 2)$ innehåller båda termerna
faktorn $(x + 2)$:

$$
3(x + 2) - x(x + 2) = (x + 2)(3 - x)
$$

Parentesen $(x + 2)$ skrivs först. I den nya parentesen hamnar det som
blir kvar av varje term när $(x + 2)$ tagits bort: $3$ från den första
termen och $-x$ från den andra.

Det går också att bryta ut mer ur ett uttryck där en faktor **redan är
utbruten**. I $2(3x - 9)$ står 2 framför parentesen, men inuti
parentesen är både $3x$ och 9 delbara med 3. Då bryter vi ut 3 ur
parentesen också och multiplicerar ihop de två faktorerna framför:

$$
2(3x - 9) = 2 \cdot 3(x - 3) = 6(x - 3)
$$

Först när det som står kvar i parentesen saknar gemensam faktor är
uttrycket faktoriserat så långt som möjligt.

::: formel "Bryt ut en parentes"
Återkommer samma parentesuttryck i alla termer är parentesen en gemensam
faktor som kan brytas ut:

$$
a(x + 2) + b(x + 2) = (x + 2)(a + b)
$$

Kontrollera alltid att uttrycket är faktoriserat **så långt som möjligt**.
Det som står kvar inuti parentesen får inte ha någon gemensam faktor
kvar: $5(9x - 6)$ är inte färdigt, eftersom 9 och 6 båda är delbara
med 3.
:::

::: exempel "Exempel 2 — Bryt ut en parentes"
**Faktorisera så långt som möjligt<br>a)&nbsp;$5(9x - 6)$&emsp;&emsp;b)&nbsp;$3(x + 2) - x(x + 2)$**

::: handskrift
typ: faktoriseraparentes
:::

::: textlosning
**a)** Faktorn 5 är redan utbruten, men uttrycket är inte faktoriserat så
långt som möjligt. Inuti parentesen är både 9 och 6 delbara med 3, så 3
kan brytas ut ur parentesen också:

$$
5(9x - 6) = 5 \cdot 3(3x - 2) = 15(3x - 2)
$$

Nu har $3x$ och 2 ingen gemensam faktor kvar, och uttrycket är
färdigfaktoriserat.

**Svar:** $15(3x - 2)$

**b)** Parentesen $(x + 2)$ finns i båda termerna. Då är hela parentesen
en gemensam faktor som kan brytas ut, på samma sätt som $9x$ bröts ut i
exempel 1. Vi skriver $(x + 2)$ först, sätter en tom parentes efter och
fyller på den term för term. $(x + 2)$ gånger något ska bli $3(x + 2)$,
alltså 3. Och $(x + 2)$ gånger något ska bli $-x(x + 2)$, alltså $-x$:

$$
3(x + 2) - x(x + 2) = (x + 2)(3 - x)
$$

Kontroll: multiplicerar vi in $(x + 2)$ i den andra parentesen får vi
tillbaka $3(x + 2) - x(x + 2)$.

**Svar:** $(x + 2)(3 - x)$
:::
:::

## Teckna jämna tal, udda tal och tal som följer på varandra

Faktorisering används också för att **visa** att något gäller för alla
tal av en viss sort, till exempel att en summa alltid är delbar med 3.
Då går det inte att pröva med några tal och nöja sig med det. Talen måste
i stället tecknas med en variabel, så att uttrycket gäller för vilket tal
som helst.

::: formel "Teckna tal med en variabel"
Låt $k$ och $n$ vara heltal.

- **Jämna tal** tecknas $2k$. Talen 0, 2, 4, 6, … är alla 2 gånger ett
  heltal.
- **Udda tal** tecknas $2k + 1$. Ett udda tal ligger ett steg efter ett
  jämnt tal: 1, 3, 5, 7, …
- **Tal delbara med 3** tecknas $3n$. På samma sätt är $53n$ alltid
  delbart med 53.
- **Tre på varandra följande heltal** tecknas $n$, $n + 1$ och $n + 2$,
  eller lika gärna $n - 1$, $n$ och $n + 1$.
:::

Här syns kopplingen till faktoriseringen: ett tal är delbart med 3 om det
kan skrivas som 3 gånger ett heltal. Ska vi visa att en summa alltid är
delbar med 3 tecknar vi summan med en variabel, förenklar den och
faktoriserar. Kan vi bryta ut faktorn 3 är saken klar.

::: exempel "Exempel 3 — Visa att en summa är delbar med ett tal"
**a) Visa att summan av fyra på varandra följande heltal alltid är ett jämnt tal.<br>b) Visa att summan av två på varandra följande udda tal alltid är delbar med 4.**

::: handskrift
typ: delbarhet
:::

::: textlosning
**a)** Vi kallar det minsta av talen $n$. De tre följande talen är då
$n + 1$, $n + 2$ och $n + 3$. Vi tecknar summan, tar bort parenteserna
(plus framför en parentes ändrar inga tecken) och slår ihop likadana
termer:

$$
n + (n + 1) + (n + 2) + (n + 3) = 4n + 6
$$

Ett jämnt tal är ett tal som kan skrivas som 2 gånger ett heltal. Både
$4n$ och 6 har faktorn 2, som vi bryter ut:

$$
4n + 6 = 2(2n + 3)
$$

Eftersom $n$ är ett heltal är även $2n + 3$ ett heltal. Summan är alltså
2 gånger ett heltal, och därmed ett jämnt tal, vilket tal $n$ än är.

Faktoriseringen visar dessutom att summan aldrig är delbar med 4:
$2n + 3$ är ett udda tal, så någon mer faktor 2 finns inte att bryta ut.

**Svar:** Summan kan skrivas $2(2n + 3)$ och är därför alltid ett jämnt
tal.

**b)** Ett udda tal tecknas $2k + 1$. Nästa udda tal ligger två steg
längre fram, alltså $2k + 1 + 2 = 2k + 3$. Vi tecknar summan och förenklar:

$$
(2k + 1) + (2k + 3) = 4k + 4
$$

Både $4k$ och 4 har faktorn 4, som vi bryter ut:

$$
4k + 4 = 4(k + 1)
$$

$k + 1$ är ett heltal, så summan är 4 gånger ett heltal och därmed delbar
med 4.

**Svar:** Summan kan skrivas $4(k + 1)$ och är därför alltid delbar
med 4.
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Faktorisera"
- Att skriva ett uttryck som en **multiplikation**. Motsatsen till att
  utveckla.
- Underlättar när man ska lösa vissa ekvationer och förkorta bråk.
:::

::: sampunkt "Så gör du"
1. Hitta den **största gemensamma faktorn** för **alla** termer.
2. Bryt ut den framför en parentes.
3. Fyll i parentesen genom att räkna baklänges: vad ska varje term
   multipliceras med för att bli den ursprungliga?
4. Kontrollera genom att multiplicera in igen. Glöm inte ettan när hela
   termen bryts ut.
:::

::: sampunkt "Bryt ut både tal och variabler"
- $27x^2 - 18x = 9x(3x - 2)$: både 9 och $x$ är gemensamma.
- Bryt ut den **lägsta** förekommande potensen:
  $5x^3 + 20x^5 = 5x^3(1 + 4x^2)$.
- Ibland finns bara ett tal gemensamt:
  $21x^2 - 14 = 7(3x^2 - 2)$.
:::

::: sampunkt "Bryt ut en hel parentes"
- Återkommer samma parentes i alla termer är den en gemensam faktor:
  $3(x + 2) - x(x + 2) = (x + 2)(3 - x)$.
- **Så långt som möjligt**: titta in i parentesen också, även om en
  faktor redan är utbruten: $2(3x - 9) = 2 \cdot 3(x - 3) = 6(x - 3)$.
:::

::: sampunkt "Teckna tal med en variabel"
- Jämna tal: $2k$. Udda tal: $2k + 1$.
- Tal delbara med 3: $3n$.
- Tre på varandra följande heltal: $n$, $n + 1$, $n + 2$ (eller $n - 1$,
  $n$, $n + 1$).
:::

::: sampunkt "Visa delbarhet"
- Teckna, förenkla och faktorisera. Syns faktorn är summan delbar med
  den.
- $n + (n + 1) + (n + 2) + (n + 3) = 4n + 6 = 2(2n + 3)$: alltid ett
  jämnt tal.
:::
:::
