# Koncept 11: Vältning (bokens 4.1 Likevekt och 4.5 Gjenstander som står på skrå, Fysiklabbet fy2-1.3)

Status: **godkänt och byggt** (2026-10-27), väntar på Sams test

Arbetsnamn: **Vältbänken**, filen `fysik2-valtning-app.html`. Den länkas som
`href3` på fy2-1.3 Stabilitet, efter gaffelbalansen och dubbelkonen. Den
inbäddade simuleringen `valtning` i teorin står kvar. Den här sidan är den
fristående versionen, som Sigbjørn kan länka till, och den går längre.

## Vad eleven ska förstå

Ur fy2-1.3:

1. **Ett föremål välter när lodlinjen genom tyngdpunkten hamnar utanför
   stödytan.** När föremålet lutas kring en kant krymper stödytan till kanten,
   som blir vridningspunkt.
2. **Vältningsvinkeln för en kloss** med tyngdpunkten i mitten:
   $\tan \alpha = \dfrac{b}{h}$. Mer allmänt
   $\tan \alpha = \dfrac{b/2}{h_\text{T}}$, där $h_\text{T}$ är
   tyngdpunktens höjd. Det blir samma sak när tyngdpunkten sitter mitt i
   klossen.
3. **En låg tyngdpunkt och en bred bas ger stabilitet**, som hos en lastbil
   med lasten lågt eller en racerbil.
4. **På ett lutande plan (bokens 4.5) kan klossen antingen glida eller
   välta.** Den glider när $\tan \alpha > \mu$ och välter när
   $\tan \alpha > \dfrac{b/2}{h_\text{T}}$. Det som inträffar vid den minsta
   lutningen vinner.

## Beteckningar

Som i fy2-1.3: *b* (bredd), *h* (höjd), *α* (lutningsvinkel),
$F_\text{G}$, vridningspunkt, stödyta och lodlinje. Friktionstalet *μ* och
normalkraften $F_\text{N}$ följer fy1-3.6 och det lutande planet i
Fysik nivå 1. Färger som i figurerna: stödytan lila, tyngdpunkten grön och
vridningspunkten röd.

## Koncept

### Läge 1: Luta klossen

En kloss står på labbänken med en metallvisare i tyngdpunkten, som i
demonstrationen i teorin. Eleven tar tag i klossens överkant och lutar den
kring ett hörn. Släpper eleven faller klossen tillbaka eller välter, med riktig
rotationsdynamik.

- **Form:** bredd och höjd ställs med glidare. Det finns också färdiga former:
  mjölkpaket, hög bokhylla, lastbil, racerbil och tegelsten.
- **Flytta tyngdpunkten:** en tung vikt kan läggas högt eller lågt inne i
  klossen, som last i en lastbil. Tyngdpunkten flyttas, och vältningsvinkeln
  ändras fast formen är densamma.
- Lodlinjen från tyngdpunkten ritas streckad ned till bänken, och stödytan är
  lila. Hamnar lodlinjen utanför stödytan blinkar den röd just innan klossen
  välter.

### Läge 2: Klossen på det lutande planet

Klossen står på en planka med ett gångjärn i ena änden. Eleven vevar upp
plankan långsamt med en vinkelmätare bredvid. Två saker kan hända först:
klossen **glider** när $\tan \alpha$ blir större än *μ*, eller **välter**
när lodlinjen passerar det nedre hörnet. Friktionstalet ställs genom att byta
underlag: is, trä, gummimatta eller sandpapper.

- Krafterna ritas skalenligt: $F_\text{G}$ från tyngdpunkten, och
  $F_\text{N}$ och $F_\text{f}$ i kontaktytan. När klossen närmar sig
  vältningen flyttar sig normalkraftens angreppspunkt mot det nedre hörnet.
  Det är det som visar varför den välter. Vid gränsen sitter $F_\text{N}$ i
  hörnet och kan inte flytta längre.

### Centerpiece: Glida eller välta-kartan

Ett diagram med *μ* på den ena axeln och $\dfrac{b/2}{h_\text{T}}$ på den
andra. Diagonalen delar det i två fält: "glider först" och "välter först".
Klossen är en prick i kartan och flyttar när eleven ändrar form, last eller
underlag. Kartan förklarar *varför*: det är jämförelsen mellan två tal som
avgör, inte hur tung klossen är.

### Färdiga försök

1. **Hög och låg kloss:** samma volym, olika form (som i teorin).
2. **Lastbilen:** last högt mot last lågt.
3. **Racerbilen:** låg och bred, välter först vid en mycket stor lutning.
4. **Is:** klossen glider långt innan den välter.
5. **Sandpapper och hög kloss:** klossen välter innan den glider.
6. **Precis på gränsen:** *μ* = *b*/2*h*_T, så glida och välta händer samtidigt.

### Gissa-läge

- **Vid vilken vinkel välter klossen?** Mått och tyngdpunktens höjd ges, och
  eleven räknar *α*.
- **Glider eller välter den?** Form och underlag ges, och eleven väljer innan
  plankan vevas upp.

## 2D eller 3D

**2D.** Lodlinjen, stödytan och vinklarna läses bäst i en sidovy, som i
teorins figurer.

## Hur den skiljer sig från andra

PhET har ingen simulering om vältning. Vältbänken kombinerar vältning och
glidning på samma planka och gör jämförelsen mellan dem till en karta. Den visar
också hur normalkraften vandrar mot hörnet, och det är den egentliga
förklaringen till vältningen.

## Öppna frågor till Sam

1. **Glida eller välta:** fy2-1.3 tar bara upp vältning. Ska läge 2 vara med,
   eftersom det hör till bokens 4.5? Förslag: ja.
2. **Tyngdpunktens höjd:** ska den generella formeln
   $\tan \alpha = \dfrac{b/2}{h_\text{T}}$ visas, eller bara teorins
   $\tan \alpha = \dfrac{b}{h}$? Förslag: teorins formel först, och den
   generella när en vikt läggs i klossen.
3. **Normalkraften som vandrar** är en fördjupning. Förslag: med, eftersom
   det är den som förklarar vältningen med krafter och moment.
