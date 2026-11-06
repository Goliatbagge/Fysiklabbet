---
id: ma1c-4.9
title: Ekvationslösning med grafritande hjälpmedel
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.9'
---

# Ekvationslösning med grafritande hjälpmedel

När vi löser ekvationer med hjälp av grafer kallas det en **grafisk lösning**.
Vi kan då använda grafritande hjälpmedel, till exempel GeoGebra.

::: formel "Lösa ekvationer med grafritande hjälpmedel"
Vi har en ekvation VL = HL.

1. Rita upp ekvationerna $y = \mathrm{VL}$ och $y = \mathrm{HL}$ i
   GeoGebra.
2. Ta fram skärningspunkten och läs av dess *x*-koordinat. Detta är
   lösningen!
:::

::: exempel "Exempel 1 — Grafisk lösning av en ekvation"
**Lös med grafritande hjälpmedel ekvationen $3x - 5 = -x + 3$.**

::: handskrift
typ: grafiskekv
:::

::: textlosning
VL = $3x - 5$ och HL = $-x + 3$.

I filmen nedan visas hela lösningen i GeoGebra Classic, från inmatningsfältet till skärningspunkten. Stegen står också beskrivna under filmen.

::: video
ankare: geogebra-grafisk-losning
titel: Hela lösningen i GeoGebra Classic, steg för steg.
fil: media/video/geogebra-grafisk-losning.mp4
affisch: media/video/geogebra-grafisk-losning.jpg
källa: Inspelad i GeoGebra Classic
länk: https://www.geogebra.org/classic
:::

Vi klickar i *Inmatningsfältet* uppe till vänster, skriver $y = 3x - 5$
och trycker Enter. Sedan skriver vi $y = -x + 3$ och trycker Enter. Vi får
nedanstående grafer:

::: figur
<img src="media/bilder/teori/geogebra-grafisk-grafer.jpg" alt="GeoGebra Classic med linjerna f: y = 3x − 5 och g: y = −x + 3 i algebrafönstret till vänster och de två linjerna i ritområdet till höger. Linjerna korsar varandra." width="960" height="480" loading="lazy">

Linjerna får namnen f och g i algebrafönstret.
:::

Vi tar fram skärningspunkten med verktyget *Skärning mellan två objekt*.
Det ligger bland punktverktygen: vi klickar på den andra knappen i
verktygsraden, och en meny fälls ut.

::: figur
<img src="media/bilder/teori/geogebra-grafisk-verktyg.jpg" alt="Punktverktygens meny är utfälld under den andra knappen i verktygsraden, och muspekaren står på Skärning mellan två objekt." width="560" height="400" loading="lazy">

Skärning mellan två objekt är det fjärde verktyget i menyn.
:::

Vi klickar på den ena linjen och sedan på den andra. Skärningspunkten
markeras med bokstaven A, och i algebrafönstret till vänster kan vi läsa av
dess koordinater:

::: figur
<img src="media/bilder/teori/geogebra-grafisk-skarning.jpg" alt="Skärningspunkten A är markerad där linjerna korsar varandra. I algebrafönstret står A = Skärning(f, g) = (2, 1)." width="960" height="480" loading="lazy">

I algebrafönstret står A = Skärning(f, g) = (2, 1).
:::

Vi ser att skärningspunktens *x*-koordinat är 2, så lösningen är $x = 2$.

**Svar:** $x = 2$
:::
:::

::: exempel "Exempel 2 — Decimaltal och en potens"
**Lös ekvationen $0{,}5x^3 + 1{,}2 = 2{,}7$ med grafritande hjälpmedel. Ange lösningen med tre decimaler.**

::: handskrift
typ: grafiskpotens
:::

::: textlosning
VL = $0{,}5x^3 + 1{,}2$ och HL = $2{,}7$.

Vi ritar graferna $y = 0{,}5x^3 + 1{,}2$ och $y = 2{,}7$. I GeoGebra
skrivs decimaltal med punkt, och upphöjt till skrivs med tecknet `^`.
På ett svenskt tangentbord får du `^` med Skift och tangenten till höger
om Å. Tryck sedan på mellanslag, så att tecknet kommer fram.

Vi skriver alltså `y = 0.5x^3 + 1.2` i *Inmatningsfältet*. När vi har
skrivit `^` hamnar markören uppe i exponenten. Där skriver vi 3, och sedan
trycker vi på högerpilen (→) så att markören kommer ned på raden igen.
Först då skriver vi `+ 1.2`. Annars hamnar även $+\,1{,}2$ i exponenten.
Vi trycker Enter och skriver sedan `y = 2.7` och Enter.

Kurvan och den vågräta linjen skär varandra i en punkt. Vi tar fram
skärningspunkten med verktyget *Skärning mellan två objekt*, som i
exempel 1. I algebrafönstret står `A = (1.44, 2.7)`.

GeoGebra visar bara två decimaler från början, men uppgiften vill ha tre.
Så här ändrar vi antalet decimaler:

1. Klicka på menyknappen med de tre strecken uppe till höger.
2. Välj **Inställningar**.
3. På fliken **Allmänt** finns rutan **Antal decimaler**. Välj
   **3 decimaler**.

Nu står det `A = (1.442, 2.7)` i algebrafönstret. Skärningspunktens
*x*-koordinat är lösningen. Väljer vi 10 decimaler visar GeoGebra
`1.4422495703`, och decimalerna tar aldrig slut. Därför måste lösningen
avrundas, och uppgiften säger att vi ska avrunda till tre decimaler.

Kontroll genom insättning: $x = 1{,}442$ ger VL $= 0{,}5 \cdot 1{,}442^3 + 1{,}2 \approx 2{,}699$, som nästan är lika med HL $= 2{,}7$. Den lilla skillnaden kommer av avrundningen.

**Svar:** $x \approx 1{,}442$
:::
:::

::: exempel "Exempel 3 — Grafisk lösning av en olikhet"
**Lös olikheten $-2x + 5 < x - 4$.**

::: handskrift
typ: grafiskolikhet
:::

::: textlosning
VL = $-2x + 5$ och HL = $x - 4$.

Vi gör på motsvarande sätt som med en ekvation och ritar graferna
$y = -2x + 5$ och $y = x - 4$ (vi sätter "$y$ =" före vänster och höger
led). I filmen nedan visas hela lösningen i GeoGebra Classic. Stegen står
också beskrivna under filmen.

::: video
ankare: geogebra-grafisk-olikhet
titel: Olikheten −2x + 5 < x − 4 löses grafiskt i GeoGebra Classic.
fil: media/video/geogebra-grafisk-olikhet.mp4
affisch: media/video/geogebra-grafisk-olikhet.jpg
källa: Inspelad i GeoGebra Classic
länk: https://www.geogebra.org/classic
:::

Vi skriver $y = -2x + 5$ i *Inmatningsfältet* och trycker Enter, och sedan
$y = x - 4$ och Enter. Linjerna får namnen f och g:

::: figur
<img src="media/bilder/teori/geogebra-olikhet-grafer.jpg" alt="GeoGebra Classic med linjerna f: y = −2x + 5 och g: y = x − 4 i algebrafönstret till vänster och de två linjerna i ritområdet till höger. Linjerna korsar varandra." width="960" height="480" loading="lazy">

Linjen f lutar nedåt och linjen g uppåt.
:::

Med verktyget *Skärning mellan två objekt* (bland punktverktygen, som i
exempel 1) klickar vi på den ena linjen och sedan på den andra:

::: figur
<img src="media/bilder/teori/geogebra-olikhet-skarning.jpg" alt="Skärningspunkten A är markerad där linjerna korsar varandra. I algebrafönstret står A = Skärning(f, g) = (3, −1)." width="960" height="480" loading="lazy">

I algebrafönstret står A = Skärning(f, g) = (3, −1).
:::

Vi ska nu avgöra när $-2x + 5$ är MINDRE ÄN $x - 4$.

$-2x + 5$ är MINDRE ÄN $x - 4$ när linjen $y = -2x + 5$ ligger *under*
linjen $y = x - 4$. Det gör den *till höger* om skärningspunkten, det vill säga
när $x > 3$.

::: figur
<img src="media/bilder/teori/geogebra-olikhet-under.jpg" alt="Muspekaren följer linjen f till höger om skärningspunkten A, där f ligger under linjen g." width="960" height="480" loading="lazy">

Till höger om A ligger linjen f under linjen g.
:::

**Svar:** $x > 3$
:::
:::

::: härledning "GeoGebra — Tips"
**Decimaltal**

Decimaltal i GeoGebra skrivs med punkt (.) istället för decimalkomma (,).
Om du ska rita upp linjen $y = 7{,}5x + 3$ i GeoGebra ska du alltså
skriva `y = 7.5x + 3`. Observera skillnaden: **7,5 skrivs 7.5**.

**Upphöjt till**

Upphöjt till skrivs med tecknet `^`: $x^3$ skrivs `x^3`. Efter `^` står
markören i exponenten, så tryck på högerpilen (→) innan du skriver
resten av uttrycket.

**Antal decimaler**

GeoGebra avrundar till två decimaler. Vill du se fler eller färre
decimaler, till exempel i en skärningspunkts koordinater, klickar du på
menyknappen (de tre strecken uppe till höger) och väljer
**Inställningar**. På fliken **Allmänt** väljer du antal i rutan
**Antal decimaler**. Med knappen **Spara inställningar** gäller valet
även nästa gång du öppnar GeoGebra.

**Variabler**

I grafiska lösningar "förstår" GeoGebra bara variablerna $x$ och $y$. Om
vi till exempel vill skriva in ekvationen $y = 13t + 5$ behöver vi byta ut
variabeln $t$ mot $x$ och skriva in det vänstra ledet som $y = 13x + 5$:
**$y = 13t + 5$ skrivs `y = 13x + 5`**.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Grafisk lösning"
1. Rita $y = \mathrm{VL}$ och $y = \mathrm{HL}$ som varsin graf.
2. Ta fram **skärningspunkten**.
3. Skärningspunktens **$x$-koordinat** är lösningen.
:::

::: sampunkt "Olikheter grafiskt"
- Rita båda leden på samma sätt.
- Avläs **vilket intervall** där den ena grafen ligger över eller under
  den andra.
- $-2x + 5 < x - 4$ har skärningen i $x = 3$, och svaret blir
  $x > 3$.
:::

::: sampunkt "GeoGebra: decimaltal"
- Skriv **punkt** i stället för decimalkomma.
- $y = 7{,}5x + 3$ skrivs `y = 7.5x + 3`.
- Upphöjt till skrivs `^`: $x^3$ blir `x^3`.
- Fler decimaler: menyn, **Inställningar**, **Antal decimaler**.
:::

::: sampunkt "GeoGebra: variabler"
- Programmet förstår bara $x$ och $y$ i grafiska lösningar.
- $y = 13t + 5$ måste skrivas `y = 13x + 5`.
- Kom ihåg att **tolka tillbaka** svaret till den ursprungliga variabeln.
:::

::: sampunkt "Redovisning"
- Skriv alltid ut **vad du gjorde**: vilka grafer du ritade och var de
  skar varandra.
- En avläst skärningspunkt är ett fullgott svar, men motiveringen måste
  finnas.
:::
:::
