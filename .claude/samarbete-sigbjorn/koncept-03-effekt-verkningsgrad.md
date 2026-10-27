# Koncept 3: Effekt och verkningsgrad (bokens 5.6, Fysiklabbet fy1-4.5 och fy1-4.6)

Status: **väntar på Sams godkännande** (2026-10-27)

Arbetsnamn: **Energiflödet**, filen `fysik1-effekt-verkningsgrad-app.html`.
Den länkas från två avsnitt: fy1-4.5 Effekt (läget Lyft, med kWh-mätaren)
och fy1-4.6 Verkningsgrad (läget Lampor, via `?lage=lampor`). Tredje delen i
serien efter Arbetsbänken och Klossbanan, med samma joulebrickor och färger.

## Vad eleven ska förstå

Ur fy1-4.5 och fy1-4.6 och de vanligaste missuppfattningarna:

1. **Effekt är hur snabbt energi omvandlas:** $P = \dfrac{\Delta E}{\Delta t}$.
   Samma arbete på kortare tid ger större effekt (Emilia som springer i
   trappan).
2. **Energi och effekt är olika saker.** Energi är *hur mycket* (J eller kWh),
   effekt är *hur snabbt* (W). En lampa på 8,5 W som lyser länge kan använda
   mer energi än en vattenkokare på 2 000 W som är på en kort stund.
3. **1 kWh = 3,6 · 10⁶ J**, och elräkningen betalar för energi, inte effekt.
4. **Verkningsgraden** är andelen nyttig energi: $\eta = \dfrac{E_n}{E_t} = \dfrac{P_n}{P_t}$,
   alltid mellan 0 och 1. Resten blir oftast värme, och den försvinner inte.
5. En apparat kan aldrig ge ut mer energi än den tar emot.

## Beteckningar (synkas med fy1-4.5 och fy1-4.6)

*P*, Δ*E*, Δ*t*, *W*, *η*, $E_n$, $E_t$, $P_n$, $P_t$. Enheterna W, J, Ws och
kWh.

## Koncept

### Centerpiece: effekt är hur snabbt brickorna strömmar

Simuleringen gör den abstrakta skillnaden mellan energi och effekt synlig med
samma joulebrickor som i Arbetsbänken och Klossbanan:

- **Energi** är *antalet* brickor.
- **Effekt** är *hur många brickor per sekund* som strömmar. En motor på 20 W
  skickar 20 brickor i sekunden, en på 5 W bara fem.

Brickorna strömmar från eluttaget genom ett **energiflödesdiagram** (ett
sankeydiagram) där bredden på varje gren visar effekten. Vid apparaten delar
sig flödet: de nyttiga brickorna går vidare till det apparaten ska göra
(lägesenergi eller ljus) och resten går till värme. Grenarnas bredd visar
direkt $P_n$ och förlusten, och kvoten mellan dem är verkningsgraden.

### Läge 1: Lyft (fy1-4.5, med verkningsgrad)

En liten elmotor med vinsch sitter överst på ett labbstativ och lyfter en
vikt. Motorn är inkopplad via en **energimätare**, en sådan man sätter i
eluttaget hemma, som visar tillförd effekt i W och tillförd energi i J och
kWh. En meterskala på stativet och ett stoppur visar höjden och tiden.

- Eleven väljer **motor** (en gammal leksaksmotor med låg verkningsgrad eller
  en modern elmotor), **massa**, **höjd** och **effekt** på motorn.
- Lyftet går med jämn fart: $v = \dfrac{\eta \cdot P_t}{m \cdot g}$. En större
  effekt lyfter samma vikt till samma höjd snabbare, med samma nyttiga energi.
- Ett **energi–tid-diagram** visar tillförd och nyttig energi mot tiden. Båda
  är räta linjer, och **lutningen är effekten**: $P_t$ och $P_n$. Förra lyftet
  står kvar som spöke, så att "samma energi, kortare tid, brantare linje" syns
  direkt.

### Läge 2: Lampor (fy1-4.6, med kWh och kostnad)

Två lampor i var sin lampa på labbänken, som teorins introduktion:
**glödlampa** och **LED-lampa** som ger lika mycket ljus. Sankeydiagrammet
visar att glödlampan skickar nästan alla brickor till värme (infrarött)
och LED-lampan nästan alla till ljus.

- En **tidsratt** snabbspolar tiden (en timme, ett dygn, ett år), och
  energimätarna räknar upp energin i kWh och kostnaden i kronor med ett
  valbart elpris.
- En **värmekamera** (samma grepp som i Klossbanan) visar att glödlampan
  är het och LED-lampan sval.
- Eleven kan också välja en egen apparat (vattenkokare, laddare, tv i
  viloläge) med kända effekter, för att se att en liten effekt under lång tid
  kan bli mer energi än en stor effekt under kort tid.

### Färdiga försök

1. **Samma lyft, dubbel effekt:** samma vikt och höjd med 10 W och 20 W.
   Samma energi, halva tiden, dubbelt så brant linje.
2. **Gammal och ny motor:** samma lyft med låg och hög verkningsgrad.
   Samma nyttiga energi, men olika mycket tillförd energi och värme.
3. **Emilia i trappan (skalenligt):** 60 kg, 4,0 m, gå på 10 s och spring på
   2,5 s. Människokroppens verkningsgrad (cirka 20 %) visar också hur mycket
   energi musklerna gör av med.
4. **Glödlampa och LED-lampa i ett dygn:** energi i kWh och kostnad.
5. **Den glömda glödlampan:** 8,5 W i två dygn, som exempel 2 i fy1-4.5.
6. **Vattenkokare och laddare:** kort tid och stor effekt mot lång tid och
   liten effekt.

### Gissa-läge

- **Räkna effekten:** energimätaren och stoppuret visas, och eleven räknar ut
  den nyttiga effekten eller verkningsgraden innan facit visas.
- **Hur länge tar lyftet?** Eleven får massa, höjd, effekt och verkningsgrad
  och förutsäger tiden, och sedan körs lyftet med stoppuret synligt.

## 2D eller 3D

**2D.** Sankeydiagrammet, energidiagrammet och mätarna ska läsas av, och
ingen av dem vinner på djup.

## Hur den skiljer sig från PhET

PhET:s Energy Forms and Changes har energisymboler som rör sig mellan källor
och användare, men inga mätvärden, ingen tid och ingen effekt. Energiflödet
skiljer på energi (antalet brickor) och effekt (brickor per sekund), visar
verkningsgraden som grenar i ett sankeydiagram med riktiga tal, och kopplar
till elräkningen med kWh och kronor.

## Öppna frågor till Sam

1. Ska lampläget ta upp effekt som *U* · *I*? Förslag: nej. Ellära kommer
   senare i kursen, så energimätaren visar effekten direkt.
2. Räcker två lägen, eller ska Emilia i trappan bli ett eget läge med en
   tecknad person i stället för en vikt på en motor? Förslag: ett färdigt
   försök i läget Lyft, med vikten utbytt mot en figur i trappan.
