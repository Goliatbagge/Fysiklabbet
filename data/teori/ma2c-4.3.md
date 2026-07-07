---
id: ma2c-4.3
title: Implikation och ekvivalens
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.3'
---

# Implikation och ekvivalens

Ett logiskt förhållande där ett visst påstående 1 är sant medför att
ett annat påstående 2 också **måste** vara sant kallas **implikation**.
Något förenklat kan man säga att en implikation är när något medför
något annat. Implikation skrivs med symbolen ⟹ och utläses "implicerar"
eller "medför att".

Ett logiskt förhållande där implikationen även gäller åt andra hållet,
dvs. om påstående 2 är sant och det medför att påstående 1 också
**måste** vara sant, kallas **ekvivalens**. Ekvivalens skrivs med
symbolen ⟺ och utläses "är ekvivalent med".

Om en implikation är falsk bevisar man det genom att ge ett
**motexempel** (ett enda motexempel räcker).

::: formel "Implikation och ekvivalens"
**Implikation:** $A \implies B$. A leder till B, men B behöver inte
leda till A.

**Ekvivalens:** $A \iff B$. A leder till B och B leder till A.
:::

::: exempel "Exempel 1 — Taxen och hunden"
**Betrakta meningen "Om det är en tax, så är det en hund".<br>a) Skriv meningen med logiska symboler.&emsp;&emsp;b) Är meningen en implikation eller en ekvivalens?**

**a)** Påståendena som kopplas ihop är "det är en tax" och "det är en
hund".

**Svar:** Det är en tax ⟹ Det är en hund

**b)** Implikationen *Det är en tax ⟹ Det är en hund* är sann.

Vi undersöker omvändningen:

*Det är en hund ⟹ Det är en tax*

Detta är falskt. Motexempel: Det kan vara en pudel.

Eftersom implikationen endast gäller åt ett håll är det ingen
ekvivalens.

**Svar:** Det är en implikation.
:::

::: exempel "Exempel 2 — Vilket logiskt tecken?"
**Avgör vilket logiskt tecken som ska vara mellan påståendena:**

*Alla vinklar i triangeln är 60°* ____ *Triangeln är liksidig*

Vi undersöker om implikationerna är sanna åt varje håll.

*Alla vinklar i triangeln är 60° ⟹ Triangeln är liksidig*

Detta påstående är sant, eftersom det inte finns några trianglar som
detta gäller för förutom liksidiga trianglar.

Vi undersöker omvändningen.

*Triangeln är liksidig ⟹ Alla vinklar i triangeln är 60°*

Detta påstående är också sant. I alla liksidiga trianglar är alla
vinklarna 60°.

Implikationen gäller alltså åt båda håll och vi har då en ekvivalens.

**Svar:** ⟺
:::

::: exempel "Exempel 3 — Stämmer implikationerna?"
**Avgör om följande implikationer stämmer.<br>a) $2x + 5 = 11 \implies x = 3$&emsp;&emsp;b) man äter godis ⟹ man får hål i tänderna&emsp;&emsp;c) $x^2 = 25 \implies x = 5$&emsp;&emsp;d) $x^3 = 27 \implies x = 3$**

**a)** Vi löser ekvationen för att undersöka om lösningen entydigt är
$x = 3$:

$$
2x + 5 = 11 \iff 2x = 6 \iff x = 3
$$

och inga andra lösningar finns.

**Svar:** Implikationen gäller.

**b)** man äter godis ⟹ man får hål i tänderna

**Svar:** Implikationen gäller inte. Motexempel: Det finns de som äter
godis som inte får hål i tänderna.

**c)** Vi löser ekvationen för att undersöka om lösningen entydigt är
$x = 5$:

$$
x^2 = 25 \iff x = \pm\sqrt{25} = \pm 5
$$

**Svar:** Implikationen gäller inte. Motexempel: $x = -5$.

**d)** Vi löser ekvationen för att undersöka om lösningen entydigt är
$x = 3$:

$$
x^3 = 27 \iff x = \sqrt[3]{27} = 3
$$

(inga andra lösningar finns).

**Svar:** Implikationen gäller.
:::
