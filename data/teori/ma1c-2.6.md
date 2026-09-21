---
id: ma1c-2.6
title: Variabler i båda led
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.6'
---

# Variabler i båda led

Om vi har variabler på båda sidor om likhetstecknet, så samla dem på ena
sidan och lös sedan ekvationen som vanligt. Enklast brukar det bli genom
att ta bort variabeltermen från den sida som har *minst* koefficient.

::: exempel "Exempel 1 — Variabler i båda led"
**Lös<br>a)&nbsp;$5x + 8 - 3x = 9x - 20$&emsp;&emsp;b)&nbsp;$54 - 4(3x - 5) = 25x$&emsp;&emsp;c)&nbsp;$3(7x - 4) = 7(9 + 3x)$**

::: handskrift
typ: variabelbada
:::

::: textlosning
**a)** Vi börjar med att förenkla båda led:

$$
2x + 8 = 9x - 20
$$

Därefter tar vi bort variabeltermen från VL, eftersom den har minst
koefficient. Vi subtraherar alltså $2x$ från båda led:

$$
2x + 8 - 2x = 9x - 20 - 2x
$$

$$
8 = 7x - 20
$$

Sedan löser vi ekvationen enligt tidigare metod. Vi adderar 20 till båda
led:

$$
8 + 20 = 7x - 20 + 20
$$

$$
28 = 7x
$$

Dividerar med 7 i båda led:

$$
\frac{28}{7} = \frac{7x}{7}
$$

$$
4 = x
$$

**Svar:** $x = 4$

**b)** Vi börjar återigen med att förenkla båda led. Vi multiplicerar in
−4 i parentesen (tänk på tecknen: $-4 \cdot (-5) = +20$):

$$
54 - 4(3x - 5) = 25x
$$

$$
54 - 12x + 20 = 25x
$$

$$
74 - 12x = 25x
$$

Därefter tar vi bort variabeltermen från VL, eftersom den har minst
koefficient (−12 är mindre än 25). Vi adderar $12x$ till båda led:

$$
74 - 12x + 12x = 25x + 12x
$$

$$
74 = 37x
$$

Dividerar med 37 i båda led:

$$
\frac{74}{37} = \frac{37x}{37}
$$

$$
2 = x
$$

**Svar:** $x = 2$

**c)** Vi börjar med att utveckla och förenkla båda led:

$$
3(7x - 4) = 7(9 + 3x)
$$

$$
21x - 12 = 63 + 21x
$$

Vi subtraherar $21x$ från båda led:

$$
21x - 12 - 21x = 63 + 21x - 21x
$$

$$
-12 = 63
$$

Detta är falskt eftersom $-12 \neq 63$. Alltså saknar ekvationen lösningar.

**Svar:** Saknar lösning.
:::
:::

I exempel 1 c) hände något nytt: variabeln försvann. De flesta
förstagradsekvationer har exakt en lösning, men en ekvation med variabler
i båda led kan också **sakna lösning** eller ha **oändligt många
lösningar**. Det händer när variabeltermerna tar ut varandra: står till
exempel $8x$ i båda led och vi subtraherar $8x$ från båda led, så
försvinner $x$ helt, och kvar står bara en likhet mellan två tal. Det som
avgör är om den likheten är sann eller falsk.

::: formel "Hur många lösningar har en förstagradsekvation?"
Förenkla båda led och lös ekvationen som vanligt. En av tre saker händer:

- **Variabeln blir kvar**, till exempel $x = 7$. Ekvationen har **exakt en
  lösning**. Det är det vanliga fallet.
- **Variabeln försvinner och kvar står en falsk likhet**, till exempel
  $3 = -4$. Inget värde på $x$ kan göra påståendet sant. Ekvationen
  **saknar lösning**.
- **Variabeln försvinner och kvar står en sann likhet**, till exempel
  $3 = 3$. Påståendet är sant vilket värde $x$ än har. Ekvationen har
  **oändligt många lösningar**: varje tal är en lösning.
:::

Att variabeln försvinner är alltså inget räknefel, utan ett tecken på att
ekvationen är av det här slaget. Man känner igen de två fallen redan
innan man börjar lösa: när båda led är förenklade står **samma
variabelterm i båda led**. Är konstanterna olika, som i $4x + 3 = 4x - 4$,
saknar ekvationen lösning. Är leden helt identiska, som i
$4x + 3 = 4x + 3$, är båda led samma uttryck skrivet på två sätt, och då
är alla tal lösningar.

::: exempel "Exempel 2 — Ekvationer utan lösning och med oändligt många lösningar"
**Lös<br>a)&nbsp;$8x + 3 = 5x + 3x - 4$&emsp;&emsp;b)&nbsp;$4(x - 1) + 7 = 4x + 3$**

::: handskrift
typ: losningsantal
:::

::: textlosning
**a)** Vi förenklar först högerledet, där $5x + 3x = 8x$:

$$
8x + 3 = 8x - 4
$$

Nu står $8x$ i båda led. Vi subtraherar $8x$ från båda led:

$$
8x + 3 - 8x = 8x - 4 - 8x
$$

$$
3 = -4
$$

Variabeln försvann, och kvar står en likhet som är falsk: 3 är inte lika
med $-4$. Det finns alltså inget värde på $x$ som gör att ekvationen
stämmer.

**Svar:** Ekvationen saknar lösning.

**b)** Vi multiplicerar först in 4 i parentesen:

$$
4x - 4 + 7 = 4x + 3
$$

Sedan slår vi ihop konstanterna i vänsterledet, $-4 + 7 = 3$:

$$
4x + 3 = 4x + 3
$$

Båda led är nu exakt samma uttryck. Vi subtraherar $4x$ från båda led:

$$
4x + 3 - 4x = 4x + 3 - 4x
$$

$$
3 = 3
$$

Variabeln försvann, och kvar står en likhet som är sann. Ekvationen
stämmer alltså vilket värde $x$ än har.

**Svar:** Ekvationen har oändligt många lösningar. Varje tal $x$ är en
lösning.
:::
:::

Ibland måste båda led utvecklas innan variablerna kan samlas. Då kan
ekvationen först se ut att innehålla $x^2$, men finns samma $x^2$-term i
båda led tar den ut sig själv när den subtraheras bort, och kvar blir en
vanlig förstagradsekvation.

::: exempel "Exempel 3 — Ekvation med parentesmultiplikation"
**Lös ekvationen $(1 + 4x)(3x - 2) = x(12x - 6)$.**

::: handskrift
typ: parentesekv
:::

::: textlosning
Utvecklar parenteserna:

$$
3x - 2 + 12x^2 - 8x = 12x^2 - 6x
$$

Subtraherar $12x^2$ från båda led och förenklar:

$$
-5x - 2 = -6x
$$

Adderar $6x$ till båda led och förenklar:

$$
x - 2 = 0
$$

Adderar 2 till båda led och förenklar:

$$
x = 2
$$

**Svar:** $x = 2$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Variabler i båda led"
- **Samla variablerna på ena sidan** och konstanterna på den andra.
- Ta bort variabeltermen från den sida där koefficienten är **minst**. Då
  slipper du negativa tal.
:::

::: sampunkt "Arbetsgång"
1. Utveckla eventuella parenteser.
2. Förenkla varje led för sig.
3. Samla variabeltermerna i ena ledet.
4. Samla konstanttermerna i det andra.
5. Dividera med koefficienten.
:::

::: sampunkt "När lösningen saknas"
- Försvinner variabeln och kvar står en **falsk** likhet, som $3 = -4$
  eller $-12 = 63$, **saknar ekvationen lösning**.
- Känns igen på att samma variabelterm står i båda led men konstanterna
  är olika: $4x + 3 = 4x - 4$.
:::

::: sampunkt "Oändligt många lösningar"
- Försvinner variabeln och kvar står en **sann** likhet, som $3 = 3$, är
  **varje tal** en lösning.
- Känns igen på att båda led är samma uttryck: $4x + 3 = 4x + 3$.
- Att variabeln försvinner är inget räknefel utan ett av de tre fallen.
:::
:::
