---
id: ma2c-2.S
title: Sammanfattning
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.S'
---

# Sammanfattning — Algebra och andragradsekvationer

Det här kapitlet handlade om hur man utvecklar och faktoriserar
algebraiska uttryck, och hur man löser alla typer av andragradsekvationer
— från enkla ekvationer med bara $x^2$- och $x$-termer till fullständiga
ekvationer med en konstantterm, samt ekvationer där $x$ står under ett
rottecken. Du ska efter kapitlet kunna välja rätt lösningsmetod utifrån
ekvationens utseende, avgöra antalet lösningar utan att lösa ekvationen
färdigt, och använda allt detta i problemlösning.

## Begrepp att kunna

- **kvadreringsreglerna**: genvägar för att utveckla $(a + b)^2$ och
  $(a - b)^2$ utan att multiplicera ut parentes för parentes.
- **konjugatregeln**: genväg för att utveckla ett "kvadrat minus
  kvadrat"-uttryck: $(a + b)(a - b) = a^2 - b^2$.
- **faktorisera**: skriva om ett uttryck som en multiplikation, t.ex.
  genom att bryta ut en gemensam faktor eller använda en
  kvadrerings- eller konjugatregel baklänges.
- **rationellt uttryck**: ett bråkuttryck som innehåller $x$; förkortas
  genom att faktorisera täljare och nämnare och stryka gemensamma
  faktorer.
- **nollproduktmetoden**: lösningsmetod för ekvationer där en produkt är
  lika med 0: minst en av faktorerna måste då vara 0.
- **rot**: en annan benämning på en lösning till en ekvation.
- ***pq*-formeln**: formel som ger lösningarna till en fullständig
  andragradsekvation på formen $x^2 + px + q = 0$.
- ***abc*-formeln**: formel som ger lösningarna till en fullständig
  andragradsekvation på formen $ax^2 + bx + c = 0$, utan att koefficienten
  framför $x^2$ behöver divideras bort först.
- **diskriminant**: uttrycket under rottecknet i *pq*-formeln eller
  *abc*-formeln; tecknet avgör hur många lösningar ekvationen har.
- **rotekvation**: en ekvation där den obekanta står under ett
  rottecken.
- **falsk rot**: en lösning som uppstår vid kvadrering men som inte
  uppfyller den ursprungliga ekvationen.
- **variabelsubstitution**: att byta ut ett uttryck (t.ex. $\sqrt{x}$)
  mot en ny variabel för att förenkla en ekvation innan man löser den.

## Formler

::: formel "Kapitlets formler"
**Kvadreringsreglerna**

$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$

**Konjugatregeln**

$$
(a + b)(a - b) = a^2 - b^2
$$

**Nollproduktmetoden**

$$
A \cdot B = 0 \iff A = 0 \quad \text{eller} \quad B = 0
$$

***pq*-formeln**

$$
x^2 + px + q = 0
$$

har lösningarna

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

där *p* är koefficienten framför $x$-termen och *q* är konstanttermen.

***abc*-formeln**

$$
ax^2 + bx + c = 0
$$

har lösningarna

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

där *a*, *b* och *c* är koefficienterna respektive konstanttermen i
ekvationen ($a \neq 0$).

**Diskriminant** (uttrycket under rottecknet i *pq*-formeln)

$$
\left(\frac{p}{2}\right)^2 - q
$$

| Om diskriminanten är … | … har ekvationen … |
| --- | --- |
| positiv | två lösningar |
| noll | en lösning |
| negativ | noll lösningar |
:::

## Viktiga samband och metoder

- Välj metod efter vilka termer ekvationen innehåller: bara $x^2$- och
  $x$-termer (ingen konstantterm) → nollproduktmetoden; en fullständig
  ekvation med konstantterm → *pq*-formeln eller *abc*-formeln.
- Vid faktorisering: bryt alltid ut en gemensam faktor **först**, om
  möjligt, innan du provar en kvadrerings- eller konjugatregel baklänges.
- "Kvadrat minus kvadrat" (två termer) → konjugatregeln. Tre termer där
  första och sista är kvadrater → en kvadreringsregel; kontrollera alltid
  att mittentermen stämmer med den dubbla produkten, och läs av tecknet
  (plus ⟹ första regeln, minus ⟹ andra regeln).
- Nollproduktmetoden kräver att högra ledet är 0 **och** att vänstra
  ledet är faktoriserat — flytta över alla termer innan du faktoriserar.
- *pq*-formeln kräver att koefficienten framför $x^2$-termen är 1; är den
  inte det, dividera hela ekvationen med koefficienten först (eller
  använd *abc*-formeln, som fungerar direkt oavsett koefficient).
- Diskriminantens tecken avgör antalet lösningar utan att du behöver
  räkna färdigt: positiv ger två lösningar, noll ger en (en så kallad
  dubbelrot) och negativ ger inga lösningar (kvadratroten ur ett negativt
  tal saknar reell mening).
- En ekvation med givna rötter $x_1$ och $x_2$ kan konstrueras med
  nollproduktmetoden baklänges: $(x - x_1)(x - x_2) = 0$.
- Vid problemlösning: tolka problemet och inför variabler (rita figur vid
  behov), ställ upp en eller flera ekvationer, lös dem, och tolka sedan
  svaret — förkasta lösningar som inte är rimliga (t.ex. negativa
  längder eller negativa antal).
- Vid rotekvationer: isolera rotuttrycket i ett led, kvadrera båda led,
  lös ekvationen med lämplig metod och **kontrollera alltid** lösningen i
  den ursprungliga ekvationen — kvadrering kan skapa falska rötter.
- Variabelsubstitution (t.ex. $\sqrt{x} = t$) förenklar en rotekvation
  till en vanlig andragradsekvation i $t$ — glöm inte att räkna tillbaka
  till $x$ och kontrollera lösningarna på slutet.
- Förkorta ett rationellt uttryck genom att faktorisera täljare och
  nämnare fullständigt och sedan stryka de faktorer som finns i båda.

## Inför provet

- Kan du kvadreringsreglerna och konjugatregeln utantill, och känner du
  igen när ett uttryck ska utvecklas eller faktoriseras med dem?
- Kan du bryta ut en gemensam faktor ur ett uttryck innan du provar
  kvadrerings- eller konjugatregeln baklänges?
- Kan du förkorta ett rationellt uttryck genom att faktorisera täljare
  och nämnare?
- Vet du när nollproduktmetoden kan användas, och kan du lösa en
  ekvation med den (inklusive att flytta över termer så att högra ledet
  blir 0 först)?
- Kan du *pq*-formeln utantill och vet du vad som krävs för att den ska
  få användas (koefficienten framför $x^2$ måste vara 1)?
- Kan du *abc*-formeln och vet du vad som skiljer den från *pq*-formeln?
- Kan du avgöra hur många lösningar en andragradsekvation har genom att
  titta på diskriminantens tecken, utan att lösa ekvationen färdigt?
- Kan du konstruera en ekvation som har givna rötter?
- Kan du lösa en problemlösningsuppgift som leder till en
  andragradsekvation, och avgöra vilken av lösningarna som är rimlig?
- Vet du hur man löser en rotekvation genom att isolera rotuttrycket och
  kvadrera, och varför man alltid måste kontrollera lösningarna?
- Kan du lösa en rotekvation med variabelsubstitution?
- Vet du varför falska rötter kan uppstå vid kvadrering, och kan du
  förklara det med ett enkelt exempel ($A = B$ jämfört med $A = -B$)?
