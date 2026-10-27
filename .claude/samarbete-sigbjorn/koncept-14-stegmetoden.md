# Koncept 14: Numerisk modellering (bokens 2.6 Matematisk modellering av bevegelse, Fysiklabbet fy2-1.9)

Status: **godkänt och byggt** (2026-10-27), väntar på Sams test

Arbetsnamn: **Stegverkstaden**, filen `fysik2-stegmetoden-app.html`. Den blir
`href` på fy2-1.9 Numerisk simulering av kaströrelse, som i dag saknar en
fristående simulering. De inbäddade simuleringarna `kalkylblad` och `stegkast`
i teorin står kvar. Den här sidan samlar dem och går längre: kalkylbladet och
banan sitter ihop, felet går att mäta, och fallet med luftmotstånd får ett
eget läge.

## Vad eleven ska förstå

Ur fy2-1.9:

1. **Stegmetoden (Eulers stegmetod):** nytt värde = gammalt värde + ändringen
   under tidssteget, $x_{n+1} = x_n + v_{x,n} \cdot \Delta t$ och
   $v_{x,n+1} = v_{x,n} + a_{x,n} \cdot \Delta t$, i *x*- och *y*-led för sig.
2. **Tidssteget avgör felet.** Ett kortare tidssteg ger ett mindre fel, och
   för stegmetoden ungefär halveras felet när tidssteget halveras.
3. **Luftmotståndet** $F_\text{luft} = k \cdot v^2$ är motriktat hastigheten.
   Accelerationen lutar då bakåt, kastet blir kortare och lägre, banan blir
   osymmetrisk och den bästa utkastvinkeln blir mindre än 45°.
4. **Så vet man att modellen räknar rätt:** pröva ett fall med känt svar,
   halvera tidssteget och rimlighetsbedöm (teorins tipsruta).

## Beteckningar

Som i fy2-1.9: *t*, $\Delta t$, *x*, *y*, $v_x$, $v_y$, $a_x$, $a_y$, *n*,
$F_\text{luft} = k \cdot v^2$ med *k* i kg/m, *m*, $F_G$ och *g* = 9,82 m/s².
Färger som i teorins simulering: stegen blå, hastigheten grön och
accelerationen röd, den exakta parabeln grå.

## Koncept

### Läge 1: Kalkylbladet och banan

Till vänster ett riktigt kalkylblad med kolumnerna *t*, *x*, *y*, $v_x$,
$v_y$, $a_x$, $a_y$, och tidssteget, *g*, *k* och *m* i egna celler (som i
tipsrutan). Till höger banan.

- **Bladet och banan sitter ihop:** klicka på en rad, så markeras punkten i
  banan med sina hastighets- och accelerationspilar. Klicka på en punkt, så
  markeras raden.
- **Formlerna syns:** klicka på en cell, så visas formeln som i ett riktigt
  kalkylblad (`=B3+D3*$I$2`), med pilar till de celler den hämtar från.
- **Ett steg i taget** eller hela kastet. Raderna fylls i medan bollen flyger.
- **Kopiera till ditt eget kalkylblad:** en knapp kopierar bladet med
  formlerna, så att det går att klistra in i Excel eller Google Kalkylark.

### Läge 2: Hur kort ska tidssteget vara?

Samma kast räknas med flera tidssteg samtidigt, från 0,2 s ned till 0,001 s,
ovanpå den exakta parabeln.

- **Centerpiece, felkartan:** ett diagram med tidssteget på den vågräta
  axeln och felet i kastvidden på den lodräta. Varje körning lägger en prick,
  och prickarna hamnar på en rät linje genom origo. Det är "felet halveras när
  tidssteget halveras", synligt.
- Tabellen ur teorin (antal steg, kastvidd, stighöjd) fylls i av sig själv.

### Läge 3: Fallet med luftmotstånd

En tennisboll och en badmintonboll släpps från samma höjd. Ett *v*–*t*-diagram
räknat med stegmetoden visar hur badmintonbollen snabbt når sin gränshastighet
$v = \sqrt{\dfrac{m \cdot g}{k}}$, när luftmotståndet blivit lika stort som
tyngdkraften. Kraftpilarna på bollarna är skalenliga. Det är teorins
demonstration med tennisbollen och badmintonbollen, i en dimension.

### Föremål

Tennisboll, badmintonboll, fotboll och stålkula, med *m* och *k* som i
kuriosarutan (*k* ≈ 0,0012 kg/m för en tennisboll). Egna värden går att
skriva in.

### Färdiga försök

1. **Exempel 1 från teorin:** två steg för hand, sedan hela kastet.
2. **Tidssteget 0,2 s mot 0,001 s.**
3. **Tennisboll och badmintonboll** kastade lika hårt.
4. **Bästa utkastvinkeln med luftmotstånd:** ungefär 39° för tennisbollen
   med 30 m/s.
5. **Gränshastigheten** för badmintonbollen.

### Gissa-läge

- **Hur ändras felet?** Felet med ett visst tidssteg ges. Hur stort blir det
  med halva tidssteget?
- **Längre eller kortare?** Ett kast med luftmotstånd jämförs med samma kast
  utan. Eleven gissar kastvidden, och simuleringen räknar.

## 2D eller 3D

**2D.** Kalkylblad, banor och diagram läses bäst platt.

## Hur den skiljer sig från andra

Simuleringar av kast med luftmotstånd brukar visa banan men gömma
räkningen. Stegverkstaden gör räkningen till huvudsaken: varje punkt i banan
är en rad i ett kalkylblad vars formler eleven kan se och ta med sig, och
felkartan visar varför tidssteget måste vara kort.

## Öppna frågor till Sam

1. **Tre lägen:** läge 3 (fallet med luftmotstånd och gränshastigheten) står
   inte i fy2-1.9, men hör till bokens 2.6 om den tar upp fall med
   luftmotstånd. Förslag: med, eftersom det är teorins demonstration i en
   dimension och ger en ren bild av gränshastigheten.
2. **Kopiera kalkylbladet:** förslag ja, som en knapp som lägger bladet med
   formlerna i urklipp (ingen nedladdning).
3. **Formlerna i cellerna** skrivs i svensk Excel-stil (semikolon, decimalkomma)
   eller engelsk? Förslag: svensk, eftersom eleverna har svenska Excel.
