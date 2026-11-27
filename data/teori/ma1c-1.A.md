---
id: ma1c-1.A
title: Avancerade exempel
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.A'
---

# Avancerade exempel

De här exemplen är på nivån **Avancerad**. Det som gör en uppgift avancerad
är sällan att räkningen är lång. Det är att vägen inte är given: innan du
kan börja räkna måste du se hur uppgiften hänger ihop. Ofta är det något av
det här:

- **Olika baser** som går att skriva om till samma bas.
- **Tal som är för stora** för att räknas ut, men vars struktur går att se.
- **En lång summa** som går att räkna ut på ett smart sätt.
- **En motivering** där ett svar inte räcker, utan du måste visa varför.

Läs uppgiften och försök först själv. Fundera på hur talen kan skrivas på
ett annat sätt. Titta sedan på lösningen.

## Potenser

*Bygger på avsnitt 1.6 Potenser med positiva heltalsexponenter och avsnitt 1.8 Rationella exponenter.*

::: exempel "Exempel 1: En exponent i bråkform (Avancerad)"
**Lös ekvationen $\sqrt{8} \cdot 4^{x} = 2^{6}$. Svara exakt.**

::: handskrift
typ: rotexponent
:::

::: textlosning
Vänster led har två olika baser och dessutom ett rottecken. Men både 8 och
4 är potenser av 2, och en kvadratrot är en potens med exponenten
$\dfrac{1}{2}$. Vi skriver därför om allt med basen 2.

$$
\sqrt{8} = 8^{\frac{1}{2}} = \left(2^3\right)^{\frac{1}{2}} = 2^{\frac{3}{2}}
$$

$$
4^{x} = \left(2^2\right)^{x} = 2^{2x}
$$

Ekvationen blir

$$
2^{\frac{3}{2}} \cdot 2^{2x} = 2^{6}
$$

Vid multiplikation med samma bas adderas exponenterna.

$$
2^{\frac{3}{2} + 2x} = 2^{6}
$$

Båda led är nu en potens av 2. Då måste exponenterna vara lika.

$$
\frac{3}{2} + 2x = 6
$$

Vi multiplicerar båda led med 2, så att bråket försvinner.

$$
\left(\frac{3}{2} + 2x\right) \boldsymbol{\cdot 2} = 6 \boldsymbol{\cdot 2}
$$

$$
3 + 4x = 12
$$

Vi subtraherar 3 från båda led.

$$
3 + 4x \mathbin{\boldsymbol{-}} \boldsymbol{3} = 12 \mathbin{\boldsymbol{-}} \boldsymbol{3}
$$

$$
4x = 9
$$

Vi dividerar båda led med 4.

$$
\frac{4x}{\boldsymbol{4}} = \frac{9}{\boldsymbol{4}}
$$

$$
x = \frac{9}{4}
$$

**Svar:** $x = \dfrac{9}{4}$
:::
:::

*Bygger på avsnitt 1.6 Potenser med positiva heltalsexponenter och avsnitt 1.9 Grundpotensform och prefix.*

::: exempel "Exempel 2: Hur många siffror har talet? (Avancerad)"
**Hur många siffror har talet $4^{10} \cdot 5^{25}$? Lös uppgiften utan räknare.**

::: handskrift
typ: antalsiffror
:::

::: textlosning
Talet är för stort för att räknas ut för hand. Men $2 \cdot 5 = 10$, och
tiopotenser är lätta att räkna siffror i. Vi försöker därför para ihop
faktorer 2 med faktorer 5.

Först skriver vi om 4 som en potens av 2.

$$
4^{10} = \left(2^2\right)^{10} = 2^{20}
$$

Det finns alltså 20 faktorer 2. Vi delar upp $5^{25}$ så att det finns
lika många faktorer 5.

$$
5^{25} = 5^{20} \cdot 5^{5}
$$

Talet blir

$$
4^{10} \cdot 5^{25} = 2^{20} \cdot 5^{20} \cdot 5^{5}
$$

Med potenslagen $a^x \cdot b^x = (a \cdot b)^x$ slår vi ihop de två första
faktorerna.

$$
2^{20} \cdot 5^{20} \cdot 5^{5} = (2 \cdot 5)^{20} \cdot 5^{5} = 10^{20} \cdot 5^{5}
$$

Faktorn $5^5$ går att räkna ut för hand:
$5^5 = 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5 = 3\,125$.

$$
10^{20} \cdot 5^{5} = 3\,125 \cdot 10^{20}
$$

Talet är alltså 3 125 följt av 20 nollor. Det har $4 + 20 = 24$ siffror.

**Svar:** 24 siffror
:::
:::

## Bråk

*Bygger på avsnitt 1.2 Bråk och avsnitt 1.3 Addition och subtraktion av bråk.*

::: exempel "Exempel 3: Två bråk nära 1 (Avancerad)"
**Vilket av talen $\dfrac{2\,024}{2\,025}$ och $\dfrac{2\,025}{2\,026}$ är störst? Motivera ditt svar utan räknare.**

::: handskrift
typ: braknara1
:::

::: textlosning
Att skriva bråken med gemensam nämnare blir alldeles för stora tal. I
stället jämför vi hur mycket som fattas till 1.

$$
\frac{2\,024}{2\,025} = \frac{2\,025}{2\,025} - \frac{1}{2\,025} = 1 - \frac{1}{2\,025}
$$

$$
\frac{2\,025}{2\,026} = \frac{2\,026}{2\,026} - \frac{1}{2\,026} = 1 - \frac{1}{2\,026}
$$

Båda talen är alltså 1 minus ett litet bråk. Bråken har samma täljare, 1,
och nämnaren 2 026 är störst. Då är $\dfrac{1}{2\,026}$ den minsta delen.

$$
\frac{1}{2\,026} < \frac{1}{2\,025}
$$

Ju mindre som fattas till 1, desto större är talet. Det betyder att
$1 - \dfrac{1}{2\,026}$ är störst.

**Svar:** $\dfrac{2\,025}{2\,026}$ är störst, eftersom det bara fattas
$\dfrac{1}{2\,026}$ till 1, medan det fattas $\dfrac{1}{2\,025}$ för det
andra talet, och $\dfrac{1}{2\,026} < \dfrac{1}{2\,025}$.
:::
:::

::: exempel "Exempel 4: En summa som nästan försvinner (Avancerad)"
**a) Visa att $\dfrac{1}{3} - \dfrac{1}{4} = \dfrac{1}{3 \cdot 4}$.<br>b) Beräkna $\dfrac{1}{1 \cdot 2} + \dfrac{1}{2 \cdot 3} + \dfrac{1}{3 \cdot 4} + \ldots + \dfrac{1}{9 \cdot 10}$ utan räknare.**

::: handskrift
typ: teleskopsumma
:::

::: textlosning
**a)** Vi skriver bråken med den gemensamma nämnaren $3 \cdot 4 = 12$.

$$
\frac{1}{3} - \frac{1}{4} = \frac{4}{12} - \frac{3}{12} = \frac{1}{12} = \frac{1}{3 \cdot 4}
$$

vilket skulle visas.

**b)** Summan har nio termer, och att skriva dem med gemensam nämnare blir
mycket räkning. I stället använder vi mönstret från a-uppgiften. I varje
term står två tal som följer på varandra i nämnaren. Med gemensam nämnare
skiljer sig täljarna då med precis 1, så mönstret gäller för alla
termerna.

$$
\frac{1}{1 \cdot 2} = \frac{1}{1} - \frac{1}{2}
$$

$$
\frac{1}{2 \cdot 3} = \frac{1}{2} - \frac{1}{3}
$$

$$
\frac{1}{3 \cdot 4} = \frac{1}{3} - \frac{1}{4}
$$

och så vidare ända till

$$
\frac{1}{9 \cdot 10} = \frac{1}{9} - \frac{1}{10}
$$

Summan blir

$$
\frac{1}{1} - \frac{1}{2} + \frac{1}{2} - \frac{1}{3} + \frac{1}{3} - \ldots + \frac{1}{9} - \frac{1}{10}
$$

Varje bråk i mitten förekommer två gånger, en gång med plus och en gång
med minus, så de tar ut varandra. Kvar blir bara det första och det sista
bråket.

$$
\frac{1}{1} - \frac{1}{10} = \frac{10}{10} - \frac{1}{10} = \frac{9}{10}
$$

**Svar:** $\dfrac{9}{10}$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Hitta vägen först"
- Fundera på hur talen kan skrivas om innan du börjar räkna.
- Stora tal: titta på strukturen i stället för att räkna ut dem.
- Motivera med ord varför svaret stämmer.
:::

::: sampunkt "Samma bas"
- 4 och 8 är potenser av 2: $4 = 2^2$, $8 = 2^3$.
- En kvadratrot är exponenten $\dfrac{1}{2}$: $\sqrt{a} = a^{\frac{1}{2}}$.
- Samma bas i båda led: sätt exponenterna lika.
:::

::: sampunkt "Räkna siffror"
- Para ihop faktorer 2 och 5: $2^n \cdot 5^n = 10^n$.
- $10^{20}$ är en etta följd av 20 nollor.
:::

::: sampunkt "Smarta bråk"
- Bråk nära 1: jämför hur mycket som fattas till 1.
- Samma täljare: större nämnare ger mindre bråk.
- $\dfrac{1}{n} - \dfrac{1}{n + 1} = \dfrac{1}{n(n + 1)}$, så de mittersta termerna tar ut varandra.
:::
:::
