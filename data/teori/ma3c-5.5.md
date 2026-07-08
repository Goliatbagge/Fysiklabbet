---
id: ma3c-5.5
title: Beräkna integraler med digitalt hjälpmedel
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.5'
---

# Beräkna integraler med digitalt hjälpmedel

Vi kan använda digitala hjälpmedel, till exempel Geogebra, för att beräkna
primitiva funktioner och bestämda integraler. Beroende på om du arbetar i
Geogebras **standardläge** eller **CAS-läge** får du antingen ett numeriskt
närmevärde eller ett exakt svar.

::: tips "Beräkna primitiva funktioner och integraler i Geogebra"
**Bestämma en primitiv funktion** (standardläget)
1. I inmatningsfältet, skriv "Integral" och välj *Integral( Funktion )*.
2. Mata in funktionsuttrycket, utan $f(x) =$.
3. Enter ger en primitiv funktion.

**Bestämma samtliga primitiva funktioner** (CAS-läget)
1. I inmatningsfältet, skriv "Integral" och välj *Integral( Funktion )*.
2. Mata in funktionsuttrycket, utan $f(x) =$.
3. Enter ger samtliga primitiva funktioner, med konstanten $c_1$.

**Beräkna integral exakt** (CAS-läget)
1. I inmatningsfältet, skriv "Integral" och välj
   *Integral( Funktion, Från x-värde, Till x-värde )*.
2. Mata in funktionsuttrycket, utan $f(x)$.
3. Pil höger och skriv undre integrationsgränsen.
4. Pil höger och skriv övre integrationsgränsen.
5. Enter ger det exakta svaret.

**Beräkna integral med närmevärde** (standardläget)
1. I inmatningsfältet, skriv "Integral" och välj
   *Integral( Funktion, Från x-värde, Till x-värde )*.
2. Mata in funktionsuttrycket, utan $f(x)$.
3. Pil höger och skriv undre integrationsgränsen.
4. Pil höger och skriv övre integrationsgränsen.
5. Enter ger ett närmevärde (ungefärligt värde).
:::

Kommandot *Integral* har alltså flera varianter beroende på vad du matar
in: med bara ett funktionsuttryck ger det en primitiv funktion, och med två
gränser dessutom ger det integralens värde. **CAS-läget** ger exakta svar
(bråk, rotuttryck) medan **standardläget** ger numeriska närmevärden —
välj läge efter vilken sorts svar uppgiften efterfrågar.

::: exempel "Exempel 1 — Beräkna en bestämd integral med digitalt hjälpmedel"
**Beräkna $\displaystyle\int_1^5 (x^2 - 4)\, dx$ med ett digitalt
hjälpmedel. Svara<br>a) med ett närmevärde&emsp;&emsp;b) exakt.**

**a)** I Geogebras standardläge skriver vi "Integral" och väljer
*Integral( Funktion, Från x-värde, Till x-värde )* i menyn *Integral*. I
inmatningsfältet skriver vi sedan "Integral$(x^2 - 4, 1, 5)$" och får
$x \approx 25{,}3$.

**Svar:** $x \approx 25{,}3$

**b)** Vi byter till Geogebras CAS-läge. I inmatningsfältet skriver vi
sedan, precis som i a-uppgiften, "Integral$(x^2 - 4, 1, 5)$" och får

$$
x = \frac{76}{3}
$$

**Svar:** $\dfrac{76}{3}$
:::

::: exempel "Exempel 2 — Bestämma en primitiv funktion med digitalt hjälpmedel"
**Ange en primitiv funktion till $f(x) = x^2 - 4$.**

I Geogebras standardläge skriver vi "Integral" och väljer
*Integral( Funktion )* i menyn *Integral*. I inmatningsfältet skriver vi
sedan "Integral$(x^2 - 4)$" och får

$$
\frac{1}{3}x^3 - 4x
$$

**Svar:** $F(x) = \dfrac{1}{3}x^3 - 4x$ alternativt
$F(x) = \dfrac{x^3}{3} - 4x$
:::
