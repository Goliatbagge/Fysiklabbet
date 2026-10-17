---
id: ma3b-6.1
title: Talföljder och mönster
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.1'
---

# Talföljder och mönster

Ett sparkonto som växer år för år, antalet stolar i varje rad i en
teatersalong och antalet stickor i en figur som byggs större och större
har något gemensamt. I alla tre fallen får vi tal som kommer i en bestämd
ordning. Sådana tal kallas en talföljd, och i det här kapitlet ska vi
använda dem för att räkna på sparande och lån.

## Element och ordningsnummer

En **talföljd** är tal som står i en bestämd ordning. Talen kallas
talföljdens **element**. Elementen betecknas $a_1, a_2, a_3, \ldots$ där
talet $n$ i $a_n$ är elementets **ordningsnummer**, ibland kallat index.
Det $n$:te elementet skrivs alltså $a_n$. I talföljden

$$
3,\ 7,\ 11,\ 15,\ 19,\ \ldots
$$

är $a_1 = 3$, $a_2 = 7$ och $a_5 = 19$. De tre punkterna betyder att
talföljden fortsätter på samma sätt.

## Sluten och rekursiv formel

En talföljd kan beskrivas med en formel på två sätt.

- En **sluten formel** räknar ut ett element direkt ur ordningsnumret. Med
  $a_n = 4n - 1$ blir $a_{100} = 4 \cdot 100 - 1 = 399$, utan att vi behöver
  räkna ut de 99 elementen före.
- En **rekursiv formel** talar om hur varje element fås ur det föregående.
  Talföljden ovan kan beskrivas med $a_1 = 3$ och $a_{n+1} = a_n + 4$: börja
  med 3 och lägg till 4 varje gång. För att få $a_{100}$ måste vi då räkna
  oss fram element för element.

::: exempel "Exempel 1 — Element ur en formel"
**Bestäm de fyra första elementen i talföljden som ges av<br>a)&nbsp;$a_n = n^2 + 1$&emsp;&emsp;b)&nbsp;$a_1 = 2$ och $a_{n+1} = 2 \cdot a_n + 1$**

::: handskrift
typ: talfoljdelement
:::

::: textlosning
**a)** Formeln är sluten. Vi sätter in $n = 1, 2, 3$ och $4$ i formeln.

$$
a_1 = 1^2 + 1 = 2 \qquad a_2 = 2^2 + 1 = 5 \qquad a_3 = 3^2 + 1 = 10 \qquad a_4 = 4^2 + 1 = 17
$$

**Svar:** 2, 5, 10 och 17

**b)** Formeln är rekursiv. Det första elementet är givet, $a_1 = 2$.
Varje nytt element fås genom att det föregående multipliceras med 2 och
sedan ökas med 1.

$$
a_2 = 2 \cdot a_1 + 1 = 2 \cdot 2 + 1 = 5
$$

$$
a_3 = 2 \cdot a_2 + 1 = 2 \cdot 5 + 1 = 11
$$

$$
a_4 = 2 \cdot a_3 + 1 = 2 \cdot 11 + 1 = 23
$$

**Svar:** 2, 5, 11 och 23

Lägg märke till att de två talföljderna börjar likadant men sedan går
isär. Två element räcker alltså inte för att bestämma en talföljd.
:::
:::

## Aritmetisk talföljd

I talföljden $3, 7, 11, 15, \ldots$ ökar elementen med 4 varje gång. En
talföljd där skillnaden mellan två element som följer på varandra alltid
är densamma kallas en **aritmetisk talföljd**. Skillnaden kallas
**differensen** och betecknas $d$:

$$
d = a_2 - a_1 = a_3 - a_2 = \ldots
$$

::: formel "Aritmetisk talföljd"
$$
a_n = a_1 + (n - 1) \cdot d
$$

där

- $a_n$ = element nummer $n$
- $a_1$ = första element
- $d$ = differens
- $n$ = ordningsnummer

::: härledning "Härledning — Det $n$:te elementet i en aritmetisk talföljd"
Vi börjar i $a_1$ och lägger till differensen $d$ en gång för varje steg
framåt i talföljden:

$$
a_2 = a_1 + d \qquad a_3 = a_1 + 2d \qquad a_4 = a_1 + 3d
$$

Från $a_1$ till $a_n$ är det $n - 1$ steg, så differensen läggs till
$n - 1$ gånger:

$$
a_n = a_1 + (n - 1) \cdot d
$$
:::
:::

## Mönster

Talföljder dyker ofta upp när en figur byggs ut steg för steg. Vi räknar
antalet stickor, prickar eller rutor i varje figur och får en talföljd. Är
talföljden aritmetisk ger formeln ovan direkt en sluten formel.

::: exempel "Exempel 2 — Stickmönstret"
**Figurerna nedan är byggda av stickor, och mönstret fortsätter på samma sätt.**

::: figur
<svg viewBox="14 22 302 68" width="441" height="99" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tre figurer byggda av stickor. Figur 1 är en triangel av tre stickor. Figur 2 är två trianglar bredvid varandra, den andra upp och ned, av fem stickor. Figur 3 är tre trianglar i rad av sju stickor."><line x1="20" y1="60" x2="56" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="20" y1="60" x2="38" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="38" y1="28.8" x2="56" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="38" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figur 1</text><line x1="112" y1="60" x2="148" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="112" y1="60" x2="130" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="130" y1="28.8" x2="148" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="130" y1="28.8" x2="166" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="148" y1="60" x2="166" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="139" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figur 2</text><line x1="238" y1="60" x2="274" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="238" y1="60" x2="256" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="256" y1="28.8" x2="274" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="256" y1="28.8" x2="292" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="274" y1="60" x2="292" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="274" y1="60" x2="310" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="292" y1="28.8" x2="310" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="274" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figur 3</text></svg>
:::

**a) Ange en sluten formel för antalet stickor i figur $n$.<br>b) Hur många stickor behövs till figur 50?<br>c) Går det att bygga en figur i mönstret av exakt 100 stickor?**

::: handskrift
typ: stickmonster
:::

::: textlosning
**a)** Vi räknar stickorna i figurerna och får talföljden

$$
a_1 = 3 \qquad a_2 = 5 \qquad a_3 = 7
$$

Antalet ökar med 2 för varje ny figur, eftersom varje ny triangel lånar en
sticka av den förra och bara behöver två nya. Talföljden är alltså
aritmetisk med $a_1 = 3$ och $d = 2$. Insättning i formeln för en
aritmetisk talföljd, $a_n = a_1 + (n - 1) \cdot d$, ger

$$
a_n = 3 + (n - 1) \cdot 2 = 3 + 2n - 2 = 2n + 1
$$

**Svar:** $a_n = 2n + 1$

**b)** Vi sätter in $n = 50$ i formeln från a).

$$
a_{50} = 2 \cdot 50 + 1 = 101
$$

**Svar:** 101 stickor

**c)** Om 100 stickor räcker till en figur finns det ett heltal $n$ som
ger $a_n = 100$. Vi löser ekvationen.

$$
2n + 1 = 100
$$

$$
2n = 99
$$

$$
n = 49{,}5
$$

Ordningsnumret måste vara ett heltal, så 100 är inget element i
talföljden. Figur 49 har 99 stickor och figur 50 har 101.

**Svar:** Nej, det går inte.
:::
:::

## Aritmetisk eller geometrisk?

En annan vanlig typ av talföljd får man när varje element i stället
**multipliceras** med samma tal. I talföljden $2, 6, 18, 54, \ldots$
multipliceras varje element med 3. En sådan talföljd kallas en
**geometrisk talföljd**, och talet man multiplicerar med kallas
**kvoten** $k$:

$$
k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2} = \ldots
$$

Här är $k = \dfrac{6}{2} = 3$. Geometriska talföljder är huvudpersonerna i
resten av kapitlet. I nästa avsnitt tar vi fram en formel för deras
element.

::: tips "Så känner du igen talföljden"
- **Aritmetisk:** differensen $a_{n+1} - a_n$ är densamma hela tiden.
  Samma tal **läggs till** varje gång.
- **Geometrisk:** kvoten $\dfrac{a_{n+1}}{a_n}$ är densamma hela tiden.
  Varje element **multipliceras** med samma tal.
- Är varken differensen eller kvoten konstant är talföljden ingetdera.
:::

::: exempel "Exempel 3 — Vilken sorts talföljd?"
**Avgör om talföljden är aritmetisk, geometrisk eller ingetdera.<br>a)&nbsp;$5,\ 15,\ 45,\ 135,\ \ldots$&emsp;&emsp;b)&nbsp;$7,\ 4,\ 1,\ -2,\ \ldots$&emsp;&emsp;c)&nbsp;$1,\ 4,\ 9,\ 16,\ \ldots$**

::: handskrift
typ: vilkentalfoljd
:::

::: textlosning
**a)** Differenserna är $15 - 5 = 10$, $45 - 15 = 30$ och $135 - 45 = 90$.
De är inte lika, så talföljden är inte aritmetisk. Vi prövar kvoterna.

$$
\frac{15}{5} = 3 \qquad \frac{45}{15} = 3 \qquad \frac{135}{45} = 3
$$

Kvoten är densamma hela tiden.

**Svar:** Geometrisk med kvoten $k = 3$

**b)** Differenserna är $4 - 7 = -3$, $1 - 4 = -3$ och $-2 - 1 = -3$.
Samma tal läggs till varje gång (fast talet är negativt).

**Svar:** Aritmetisk med differensen $d = -3$

**c)** Differenserna är 3, 5 och 7, alltså inte lika. Kvoterna är

$$
\frac{4}{1} = 4 \qquad \frac{9}{4} = 2{,}25
$$

som inte heller är lika. Elementen är kvadraterna $1^2, 2^2, 3^2, 4^2$, så
talföljden ges av $a_n = n^2$, men den är varken aritmetisk eller
geometrisk.

**Svar:** Ingetdera
:::
:::

::: förklaring "Programmering — talföljden i Python"
En dator är bra på att räkna fram en talföljd element för element. Den
rekursiva formeln blir då en **loop**, en del av programmet som upprepas.
Programmet nedan skriver ut de tio första elementen i den geometriska
talföljden med $a_1 = 2$ och kvoten $k = 3$.

```python
a = 2
for n in range(1, 11):
    print(n, a)
    a = a * 3
```

- `a = 2` sparar det första elementet.
- `for n in range(1, 11):` upprepar de indragna raderna för $n = 1, 2, \ldots, 10$.
- `print(n, a)` skriver ut ordningsnumret och elementet.
- `a = a * 3` räknar fram nästa element: det föregående gånger kvoten.

Varje varv i loopen gör alltså precis det som den rekursiva formeln
$a_{n+1} = 3 \cdot a_n$ säger. Byts `a * 3` mot `a + 4` på sista raden blir
talföljden i stället aritmetisk med differensen 4.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Talföljd"
- Tal i en **bestämd ordning**. Talen kallas **element**.
- $a_n$ är element nummer $n$, där $n$ är **ordningsnumret**.
- I $3, 7, 11, \ldots$ är $a_1 = 3$ och $a_3 = 11$.
:::

::: sampunkt "Två sorters formler"
- **Sluten:** ger elementet direkt, $a_n = 4n - 1$.
- **Rekursiv:** ger elementet ur det föregående, $a_{n+1} = a_n + 4$
  med $a_1 = 3$.
:::

::: sampunkt "Aritmetisk talföljd"
- Samma tal $d$ **läggs till** varje gång.
- $a_n = a_1 + (n - 1) \cdot d$
- Ingår 100? Lös $a_n = 100$. Blir $n$ inget heltal ingår talet inte.
:::

::: sampunkt "Geometrisk talföljd"
- Varje element **multipliceras** med samma kvot $k$.
- $k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2}$
- $2, 6, 18, 54, \ldots$ har kvoten $k = 3$.
:::
:::
