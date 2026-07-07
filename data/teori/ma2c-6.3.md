---
id: ma2c-6.3
title: Statistik med digitala verktyg
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.3'
---

# Statistik med digitala verktyg

Vid stora mängder data underlättar det att beräkna statistiska mått med
digitala hjälpmedel.

För att ta fram statistiska mått så skriver vi in våra värden i en
kolumn i Geogebras kalkylblad. Därefter markerar vi värdena, klickar på
menyn "blå staplar", väljer *Envariabelanalys* och sedan knappen "Visa
statistik".

::: tips "Användbara statistiska värden i Geogebra"
| Beteckning | Betydelse |
| --- | --- |
| n | antal värden |
| Medel | medelvärde |
| Min | minsta värde |
| Q1 | nedre kvartil |
| Median | median |
| Q3 | övre kvartil |
| Max | största värde |
:::

Med Geogebra kan vi även bestämma percentiler och rita lådagram, se
exemplet nedan.

::: exempel "Exempel 1 — Släktmiddagen i Geogebra"
**På en släktmiddag är åldrarna 1, 3, 4, 8, 15, 27, 30, 33, 36, 41,
42, 44, 46, 72 och 72 år. Använd ett digitalt verktyg för att<br>a) bestämma minsta värdet, nedre kvartil, median, övre kvartil och största värdet&emsp;&emsp;b) avgöra hur gammal man ska vara för att tillhöra de 10 % äldsta&emsp;&emsp;c) rita ett lådagram över åldrarna**

**a)** Vi startar Geogebra, klickar på knappen "Växla till kalkylblad"
i den översta menyraden och skriver in värdena i den vänstra kolumnen.
Vi markerar värdena, klickar på menyn "blå staplar" och väljer
*Envariabelanalys*. Vi klickar på knappen "Visa statistik" och läser av
de efterfrågade värdena.

**Svar:** Minsta värde = 1, nedre kvartil = 8, median = 33, övre
kvartil = 44 och största värde = 72.

**b)** För att tillhöra de 10 % äldsta ska man ligga över den 90:e
percentilen, $p_{90}$ (90 % ska ha en lägre ålder).

1. Markera alla värden i kalkylbladet och klicka på "Skapa lista".
   Standardnamnet är l1, men du kan ge listan ett eget namn. Välj sedan
   OK.
2. Växla sedan tillbaka till standardläge i den övre menyraden.
3. Skriv "perc" i inmatningsfältet och klicka på
   "Percentil( <Lista med tal>, <Procent> )".
4. Skriv därefter "l1" eller det namn du själv gett listan. Stega ett
   steg åt höger med piltangenterna och skriv "90%" (eller "0.9") för
   att få svaret.

Geogebra svarar 72.

**Svar:** 72 år

**c)** Vi ska nu rita ett lådagram. Markera alla värden i
kalkylbladet, klicka på menyn "blå staplar" och välj
*Envariabelanalys*. I rullistan där det står "Histogram" väljer du
"Boxplot (Lådagram)".

Om du vill modifiera lådagrammets utseende eller t.ex. lättare läsa av
det mot axlarna kan du med fördel kopiera det till ritområdet. Växla
därefter till standardläget och justera vid behov axlarna med verktyget
*Flytta ritområdet*. Där kan du även justera utseendet (färg,
linjetjocklek med mera).
:::

::: exempel "Exempel 2 — Frekvenstabell i Geogebra"
**Antalet syskon som varje elev hade på en skola med 177 elever
undersöktes. Bestäm medelvärdet för antalet syskon utifrån nedanstående
frekvenstabell.**

| Antal syskon | Frekvens |
| --- | --- |
| 0 | 17 |
| 1 | 68 |
| 2 | 51 |
| 3 | 26 |
| 4 | 9 |
| 5 | 2 |
| 6 | 4 |

För att slippa skriva in 177 separata värden i ett kalkylblad (eller i
formeln för medelvärde), så kan vi i Geogebras kalkylblad skriva in
frekvenserna i en extra kolumn till höger, dvs. så som de står i
tabellen ovan.

Markera alla värden i båda kolumner, klicka på "blå staplar" och välj
*Envariabelanalys*. Klicka därefter på knappen "Visa statistik" och läs
av medelvärdet i tabellen: Medel ≈ 1,7966.

**Svar:** Medelvärdet är ca 1,8 syskon.
:::
