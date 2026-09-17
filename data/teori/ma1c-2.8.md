---
id: ma1c-2.8
title: Problemlösning med ekvationer
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.8'
---

# Problemlösning med ekvationer

När vi översätter ett problem till matematiskt språk för att lösa det ägnar
vi oss åt **problemlösning**.

::: formel "Metod för problemlösning"
1. **Översätt.** Definiera och inför en beteckning, till exempel $x$, på det som
   söks och ställ upp en ekvation.
2. **Lös ekvationen.**
3. **Tolka och svara** med enhet. Är svaret rimligt?
:::

::: exempel "Exempel 1 — Dela upp ett belopp"
**Rayan, Arielle och Samuel ska dela på 4 000 kr. Rayan ska få dubbelt så
mycket som Arielle och Samuel ska få 300 kr mindre än Rayan. Hur stort
belopp får Arielle?**

::: handskrift
typ: delabelopp
:::

::: textlosning
**1. Översätt**

Vi tittar först på vad som efterfrågas. Arielles belopp efterfrågas. Då
kallar vi det för $x$. *Skriv ner detta!*

$$
x = \text{Arielles belopp}
$$

Detta ger

$$
2x = \text{Rayans belopp}
$$

$$
2x - 300 = \text{Samuels belopp}
$$

Vi ställer upp en ekvation och får

$$
x + 2x + (2x - 300) = 4\,000
$$

**2. Lös ekvationen**

$$
x + 2x + 2x - 300 = 4\,000
$$

$$
5x - 300 = 4\,000
$$

Adderar 300 till båda led:

$$
5x - 300 + 300 = 4\,000 + 300
$$

$$
5x = 4\,300
$$

Dividerar med 5 i båda led:

$$
\frac{5x}{5} = \frac{4\,300}{5}
$$

$$
x = 860
$$

**3. Tolka och svara**

$x$ var Arielles belopp, och 860 kr av 4 000 kr är rimligt.

**Svar:** 860 kr
:::
:::

::: formel "Sträcka, hastighet och tid"
Många problem handlar om något som rör sig. Då hänger tre storheter ihop,
och samma samband kan skrivas på tre sätt beroende på vad som söks:

$$
\begin{array}{ccccc} v = \dfrac{s}{t} & \Longleftrightarrow & s = v \cdot t & \Longleftrightarrow & t = \dfrac{s}{v} \end{array}
$$

där

- $v$ = hastighet, till exempel i km/h eller m/s
- $s$ = sträcka, i km eller m
- $t$ = tid, i h eller s

Hastighet är sträcka per tidsenhet. Vet du två av storheterna får du den
tredje. Enheterna måste passa ihop: är hastigheten i km/h ska sträckan vara
i km och tiden i timmar, så 20 minuter skrivs som $\dfrac{20}{60}$ h och inte
som 20.
:::

::: exempel "Exempel 2 — Fram och tillbaka med olika fart"
**Amir cyklar hemifrån till badplatsen med medelfarten 18 km/h och går
sedan hem samma väg med medelfarten 6 km/h. Hela turen tar 1 timme och
20 minuter. Hur långt är det till badplatsen?**

::: handskrift
typ: framochtillbaka
:::

::: textlosning
Det här problemet är svårare än det första, eftersom det som efterfrågas
(avståndet) inte står direkt i ekvationen. Ekvationen handlar om **tid**.
Nyckeln är att uttrycka båda tiderna med hjälp av avståndet.

**1. Översätt**

Sträckan är densamma dit och hem, och det är den som efterfrågas. Vi
låter $x$ vara avståndet till badplatsen i kilometer. *Skriv ner detta!*

$$
x = \text{avståndet i km}
$$

Vi vet hastigheterna, och vi vill ha tiderna. Hastighet är sträcka delad
med tid, och löser vi ut tiden ur det sambandet får vi att tid är sträcka
delad med hastighet:

$$
\begin{array}{ccc} \text{hastighet} = \dfrac{\text{sträcka}}{\text{tid}} & \Longleftrightarrow & \text{tid} = \dfrac{\text{sträcka}}{\text{hastighet}} \end{array}
$$

Dit cyklar Amir sträckan $x$ km med hastigheten 18 km/h, så tiden dit är
$x$ delat med 18. Hem går han samma sträcka $x$ km med hastigheten 6 km/h:

$$
\text{tid dit} = \frac{x}{18}\ \text{h}
$$

$$
\text{tid hem} = \frac{x}{6}\ \text{h}
$$

Hela turen tar 1 timme och 20 minuter. Farterna är angivna i km/h, så
tiden måste räknas i **timmar**. 20 minuter är $\dfrac{20}{60} = \dfrac{1}{3}$
timme, så hela turen tar $1 + \dfrac{1}{3} = \dfrac{4}{3}$ timme. (En vanlig
fälla är att skriva 1,2 timmar. Det är fel: en timme har 60 minuter, inte
100.)

Tiden dit plus tiden hem är hela turen. Det ger ekvationen

$$
\frac{x}{18} + \frac{x}{6} = \frac{4}{3}
$$

**2. Lös ekvationen**

Ekvationen har tre bråktermer, precis som i avsnittet *Ekvationer med
nämnare*. Nämnarna är 18, 6 och 3, och det minsta tal som alla tre går
jämnt upp i är 18, så MGN = 18. Vi multiplicerar varje täljare med 18:

$$
\frac{18x}{18} + \frac{18x}{6} = \frac{18 \cdot 4}{3}
$$

$$
x + 3x = 24
$$

$$
4x = 24
$$

Dividerar med 4 i båda led:

$$
\frac{4x}{4} = \frac{24}{4}
$$

$$
x = 6
$$

**3. Tolka och svara**

$x$ var avståndet i kilometer, så det är 6 km till badplatsen. Rimlighet:
6 km i 18 km/h tar $\dfrac{6}{18}$ h $= \dfrac{1}{3}$ h, alltså 20 minuter, och
6 km i 6 km/h tar en hel timme. Tillsammans blir det 1 timme och
20 minuter, precis som i uppgiften.

**Svar:** 6 km
:::
:::

::: härledning "Så tänker du vid svårare problem"
Det här exemplet visar tre saker som är bra att ta med sig till de
svårare uppgifterna:

- **Låt $x$ vara det som allt annat kan uttryckas utifrån.** Här beror
  båda tiderna på avståndet, så avståndet får heta $x$. Ibland är det
  inte samma sak som det som efterfrågas: söks medelfarten för en tur
  fram och tillbaka får sträckan ändå heta $x$, och den försvinner ur
  räkningen på slutet.
- **Använd ett samband för att översätta.** Tid $=$ sträcka delad med
  fart gör att ord som "cyklar 18 km/h" blir ett uttryck, $\dfrac{x}{18}$.
  Samma sak med "dubbelt så gammal" ($2x$), "5 år yngre" ($x - 5$) eller
  "tre gånger så tung" ($3x$).
- **Kontrollera enheterna innan du ställer upp ekvationen.** Alla termer
  i ekvationen måste ha samma enhet. Minuter räknas om till timmar som
  bråk, $20\ \text{min} = \dfrac{20}{60}\ \text{h} = \dfrac{1}{3}\ \text{h}$.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Metoden i tre steg"
1. **Översätt.** Inför en beteckning för det som söks och ställ upp en
   ekvation.
2. **Lös ekvationen.**
3. **Tolka och svara** med enhet. Kontrollera att svaret är rimligt.
:::

::: sampunkt "Välj beteckningen smart"
- Låt $x$ vara det som allt annat kan uttryckas **utifrån**, inte
  nödvändigtvis det som frågan söker.
- Får en person dubbelt så mycket som en annan: låt $x$ vara den
  **minsta** delen, så slipper du bråk.
- Skriv **alltid ut vad $x$ betyder**, till exempel "låt $x$ vara Arielles
  belopp i kronor".
:::

::: sampunkt "Uttryck de andra storheterna"
- "dubbelt så mycket som $x$" blir $2x$.
- "300 kr mindre än $2x$" blir $2x - 300$.
- Rörelse: tid är sträcka delad med hastighet, $t = \dfrac{s}{v}$.
- Summan av delarna sätts lika med helheten.
:::

::: sampunkt "Sista steget glöms lätt"
- Löser du ut $x$ men frågan gällde någon annan, räkna ut den storheten
  också.
- Svara med **enhet** och kontrollera att svaret är rimligt. Blir ett
  belopp eller en ålder negativ har något gått fel i räkningen.
:::
:::
