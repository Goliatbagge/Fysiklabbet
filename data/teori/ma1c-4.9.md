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

::: exempel "Exempel 2 — Grafisk lösning av en olikhet"
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
