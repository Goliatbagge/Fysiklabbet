---
id: ma1c-2.5
title: Ekvationslösningens grunder
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.5'
---

# Ekvationslösningens grunder

När vi har ett uttryck som ska vara lika med ett annat uttryck har vi en
**ekvation**. En ekvation innehåller alltså alltid någon variabel, till exempel
$x$, och ett likhetstecken, =. Vid ekvationslösning ska vi bestämma värdet
på variabeln. Det gör vi genom att **lösa ut** variabeln, till exempel $x$, så att
den står ensam på ena sidan av likhetstecknet.

::: formel "Rot, förstagradsekvation och andragradsekvation"
En **rot** är en lösning till en ekvation. Orden betyder samma sak: roten
till ekvationen $3x + 2 = 23$ är $x = 7$.

Ekvationer sorteras efter den **högsta exponent** som variabeln har:

- **Förstagradsekvation**: den högsta variabelexponenten är 1, till exempel
  $3x + 2 = 23$. Att $x$ betyder $x^1$ ser man inte, eftersom exponenten 1
  aldrig skrivs ut. Det är sådana ekvationer det här avsnittet handlar om.
- **Andragradsekvation**: den högsta variabelexponenten är 2, till exempel
  $x^2 - 5x + 4 = 0$. Hur de löses kommer i ett senare avsnitt.
:::

För att lösa ut $x$ används några grunder som beror på vilket räknesätt vi
har. Grundprincipen är att det vi gör på ena sidan av likhetstecknet måste
vi också göra på andra sidan av likhetstecknet, annars kommer ekvationen
inte att stämma.

Vi kan alltid testa om en lösning är korrekt genom att sätta in den i den
ursprungliga ekvationen. **VIKTIGT! Prövning (att testa sig fram till en
lösning) är inte tillåtet vid ekvationslösning!**

::: formel "Ekvationslösningens grunder"
**Addition** — för att få bort en term som adderas, så *subtraherar* vi den
från båda led:

$$
x + 36 = 53
\qquad
x + 36 \mathbin{\mathbf{-}} \mathbf{36} = 53 \mathbin{\mathbf{-}} \mathbf{36}
\qquad
x = 17
$$

**Subtraktion** — för att få bort en term som subtraheras, så *adderar* vi
den till båda led:

$$
x - 24 = 72
\qquad
x - 24 \mathbin{\mathbf{+}} \mathbf{24} = 72 \mathbin{\mathbf{+}} \mathbf{24}
\qquad
x = 96
$$

**Multiplikation** — för att få bort en faktor som multipliceras, så
*dividerar* vi med den i båda led:

$$
7x = 84
\qquad
\frac{7x}{\mathbf{7}} = \frac{84}{\mathbf{7}}
\qquad
x = 12
$$

**Division** — för att få bort en nämnare som divideras, så *multiplicerar*
vi den med båda led:

$$
\frac{x}{13} = 6
\qquad
\frac{x}{13} \mathbin{\boldsymbol{\cdot}} \mathbf{13} = 6 \mathbin{\boldsymbol{\cdot}} \mathbf{13}
\qquad
x = 78
$$
:::

::: exempel "Exempel 1 — Lös ekvationerna"
**Lös<br>a)&nbsp;$4x + 7 = 35$&emsp;&emsp;b)&nbsp;$\dfrac{7x}{6} - 15 = -11$**

::: handskrift
typ: ekvgrund
:::

::: textlosning
**a)** Vi subtraherar först 7 från båda led:

$$
4x + 7 - 7 = 35 - 7
$$

$$
4x = 28
$$

Därefter dividerar vi med 4 i båda led:

$$
\frac{4x}{4} = \frac{28}{4}
$$

$$
x = 7
$$

**Kontroll:** Vi kontrollerar att $x = 7$ är en lösning till ekvationen
genom att byta ut $x$ mot 7 i den ursprungliga ekvationen $4x + 7 = 35$:

$$
\mathrm{VL} = 4 \cdot 7 + 7 = 28 + 7 = 35
$$

$$
\mathrm{HL} = 35
$$

$\mathrm{VL} = \mathrm{HL}$ ⟹ Stämmer!

**Svar:** $x = 7$

**b)** Vi adderar först 15 till båda led:

$$
\frac{7x}{6} - 15 + 15 = -11 + 15
$$

$$
\frac{7x}{6} = 4
$$

Därefter multiplicerar vi med 6 i båda led:

$$
\frac{7x}{6} \cdot 6 = 4 \cdot 6
$$

$$
7x = 24
$$

Till sista dividerar vi med 7 i båda led:

$$
\frac{7x}{7} = \frac{24}{7}
$$

$$
x = \frac{24}{7}
$$

**Svar:** $x = \dfrac{24}{7}$ (avrunda inte!)
:::
:::

::: härledning "OBS — Avrunda eller inte?"
I **ren matematik**, när uppgiften bara är en ekvation som ska lösas,
avrundar vi **aldrig**. Svaret lämnas exakt, som $x = \dfrac{24}{7}$ i
exempel 1 b). Ett avrundat tal är inte längre en lösning till ekvationen:
sätter vi in $x = 3{,}4$ stämmer likheten inte exakt.

I en **tillämpning**, när ekvationen beskriver en verklig situation (ett
pris, en sträcka, ett antal personer), avrundar vi nästan **alltid**.
Svaret ska vara ett tal som går att använda, till exempel 3,43 kr eller
24 personer, och hur många decimaler som är rimligt avgör situationen.
:::

Nästan alla ekvationer i det här avsnittet har exakt en lösning. Men en
förstagradsekvation kan också **sakna lösning** eller ha **oändligt många
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

::: sammanfattning "Sammanfattning"

::: sampunkt "Vad en ekvation är"
- Två uttryck som ska vara **lika**. Innehåller alltid en variabel och ett
  likhetstecken.
- Att lösa den betyder att få variabeln **ensam** på ena sidan. Lösningen
  kallas också **rot**.
- **Förstagradsekvation**: högsta variabelexponenten är 1, som
  $3x + 2 = 23$. **Andragradsekvation**: högsta exponenten är 2, som
  $x^2 - 5x + 4 = 0$.
- Försvinner variabeln under lösningen: en **falsk** likhet ($3 = -4$)
  betyder att lösning saknas, en **sann** likhet ($3 = 3$) att alla tal
  är lösningar.
:::

::: sampunkt "Grundprincipen"
- **Allt du gör i ena ledet måste du göra i det andra.** Annars gäller
  likheten inte längre.
:::

::: sampunkt "De fyra operationerna"
- Term som **adderas**: subtrahera den från båda led.
- Term som **subtraheras**: addera den till båda led.
- Faktor som **multipliceras**: dividera båda led med den.
- Nämnare som **divideras**: multiplicera båda led med den.
:::

::: sampunkt "Kontroll och regler"
- Sätt in ditt svar i den **ursprungliga** ekvationen och kontrollera.
- **Prövning, alltså att testa sig fram, är inte tillåtet** som
  lösningsmetod.
- I ren matematik avrundas svaret **aldrig**, lämna det som ett bråk:
  $x = \dfrac{24}{7}$. I en tillämpning på verkligheten avrundas det
  nästan alltid.
:::
:::
