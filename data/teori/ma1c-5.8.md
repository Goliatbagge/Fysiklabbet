---
id: ma1c-5.8
title: Komplementhändelse
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.8'
---

# Komplementhändelse

En händelse som kompletterar en annan händelse, så att de tillsammans
utgör alla möjliga utfall kallas **komplementhändelse**.
Komplementhändelse kan alltså ses som "händelsens motsats".
Sannolikheten för en händelse plus sannolikheten för dess
komplementhändelse är lika med 1 eller 100 %.

::: formel "Sannolikhet med komplementhändelse"
$$
P(\text{händelse}) = 1 - P(\text{komplementhändelse})
$$
:::

::: härledning "Härledning — Sannolikhet med komplementhändelse"
Enligt definitionen för komplementhändelse gäller

$$
P(\text{händelse}) + P(\text{komplementhändelse}) = 1
$$

Vi löser ut $P(\text{händelse})$ och får

$$
P(\text{händelse}) = 1 - P(\text{komplementhändelse})
$$

vsv.
:::

Komplementhändelser är användbara i uppgifter där vi ska beräkna
sannolikheten för **minst en** eller **åtminstone en**.

::: exempel "Exempel 1 — Ange komplementhändelsen"
**Vad är komplementhändelsen till att<br>a) det regnar?&emsp;&emsp;b) dra ett hjärter ur en kortlek?&emsp;&emsp;c) slå minst en femma på en tärning?**

**a)** "Att det snöar"? Nej, bara för att det inte regnar behöver det
inte snöa. Det kan ju vara uppehåll. "Att det är soligt"? Nej, bara för
att det inte regnar behöver det inte vara soligt. Det kan ju vara mulet
utan att regna.

Att sätta ett "inte" framför händelsen för att få komplementhändelsen
fungerar alltid! Men om det går så försök att undvika "inte" i ditt svar.
I det här fallet är det dock svårt.

**Svar:** Att det inte regnar.

**b)** Komplementhändelsen är "att inte dra ett hjärter", dvs. att dra
ett spader, klöver eller ruter.

**Svar:** Att dra ett spader, klöver eller ruter.

**c)** Komplementhändelsen är "att inte slå minst en femma", dvs. att slå
1, 2, 3 eller 4. Detta kan vi uttrycka som "att slå högst en fyra".

**Svar:** Att slå högst en fyra.
:::

::: exempel "Exempel 2 — Minst en sexa med fem tärningar"
**Vad är sannolikheten att få minst en sexa vid kast med fem vanliga
tärningar?**

Att beräkna denna uppgift utan komplementhändelse är jobbigt eftersom det
finns så många kombinationer. Men med komplementhändelse blir det lätt!

Komplementhändelsen till "att få minst en sexa" är "att inte få någon
sexa". Sannolikheten att inte få sexa vid kast med en tärning är
$\frac{5}{6}$, så för fem tärningar gäller

$$
P(\text{ingen sexa}) = \left(\frac{5}{6}\right)^5 = \frac{3\,125}{7\,776} = 0{,}401\ldots
$$

Vi beräknar nu sannolikheten för minst en sexa genom att subtrahera
sannolikheten för komplementhändelsen från 1, så

$$
P(\text{minst en sexa}) = 1 - 0{,}401\ldots = 0{,}598\ldots \approx 0{,}60 = 60\ \%
$$

**Svar:** ca 60 %
:::

::: exempel "Exempel 3 — Minst en dotter"
**Vad är sannolikheten att få minst en dotter om man skaffar fyra barn?
(Vi räknar med att det är samma sannolikhet att få en flicka som en
pojke.)**

Komplementhändelsen är "ingen dotter":

$$
P(\text{ingen dotter}) = \left(\frac{1}{2}\right)^4 = \frac{1^4}{2^4} = \frac{1}{16} = 0{,}0625
$$

$$
P(\text{minst en dotter}) = 1 - 0{,}0625 = 0{,}9375 = 93{,}75\ \%
$$

**Svar:** Ca 94 %
:::

::: kuriosa "Kuriosa — Födelsedagsparadoxen"
Hur många slumpvis valda personer måste vi ha för att sannolikheten att
minst två stycken ska dela samma födelsedag ska vara över 50 %?

Gissa själv först! $\frac{365}{2} \approx 183$ stycken?
$\frac{365}{3} \approx 122$ stycken?

Detta är ett exempel som kan beräknas med hjälp av komplementhändelse!

Sannolikheten att 2 personer *inte* delar födelsedag
$= \frac{365}{365} \cdot \frac{364}{365}$

Sannolikheten att 2 personer delar födelsedag
$= 1 - \left(\frac{365}{365} \cdot \frac{364}{365}\right) \approx 0{,}003 = 0{,}3\ \%$

På motsvarande sätt får vi: sannolikheten att 3 personer delar samma
födelsedag
$= 1 - \left(\frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365}\right) \approx 0{,}008 = 0{,}8\ \%$

Fortsätter vi på samma sätt ser vi att det räcker med att ha **23
personer** för att sannolikheten ska bli över 50 % för att minst två
stycken ska dela födelsedag.

Det är mycket färre än vad man kan tro, eftersom 23 är en så liten andel
av 365, och på grund av sin kontraintuitiva slutsats kallas detta
**födelsedagsparadoxen**.

Det räcker dessutom med en grupp på 57 personer för att sannolikheten ska
bli över 99 % att två delar samma födelsedag!

Ett sätt att kanske förstå varför det inte krävs så många är att tänka på
antalet kombinationer. I en grupp av 23 personer finns det 253 möjliga
par (du och jag, du och någon annan, jag och någon annan, osv.). Varje
par har en 1/365 chans att dela födelsedag. Eftersom det finns så många
möjliga par, ökar sannolikheten snabbt att något av dessa par kommer att
dela en födelsedag.
:::
