# Koncept 5: Tryck i vätskor och rör (bokens 6.3, Fysiklabbet fy1-5.3 och 5.8)

Status: **godkänt och byggt** (2026-10-27), testat och godkänt

Arbetsnamn: **Tryckbänken**, filen `fysik1-vatsketryck-app.html`, länkad som
`href` på fy1-5.3 Vätsketryck och, med ett eget läge (`?lage=pascal`), på
fy1-5.8 Pascals princip. Samma labbänk och papperstema som de fyra första.

## Vad eleven ska förstå

Ur fy1-5.3, fy1-5.4 och fy1-5.8 och de vanligaste missuppfattningarna:

1. **Trycket växer med djupet**, linjärt: $p = \rho \cdot g \cdot h$. Dubbelt
   så djupt ger dubbelt så stort vätsketryck.
2. **Bara djupet spelar roll**, inte kärlets form eller hur mycket vätska som
   finns. Den vanligaste missuppfattningen är att ett brett kärl med mycket
   vatten ger större tryck på botten.
3. **Trycket är lika stort åt alla håll** på ett visst djup, och tryckkraften
   verkar vinkelrätt mot ytan, även underifrån.
4. **Kommunicerande kärl:** sammankopplade kärl får samma vätskenivå, eftersom
   trycket i botten annars skulle vara olika och vätskan strömma.
5. **Pascals princip:** en tryckökning fortplantas i hela vätskan, så
   $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$. Kraften förstärks, men den lilla
   kolven måste röra sig längre. Arbetet blir detsamma (koppling till
   Arbetsbänken, nr 1).

## Beteckningar (synkas med fy1-5.3, 5.4 och 5.8)

*p* (vätsketryck, Pa), *ρ* (vätskans densitet, kg/m³), *g* (tyngdfaktor,
9,82 N/kg), *h* (vätskedjup, m), $p_0$ (lufttrycket mot vätskeytan),
$p = p_0 + \rho \cdot g \cdot h$ (totalt tryck), $F_1$, $F_2$, $A_1$, $A_2$,
$p_1 = p_2$. Tryck visas i Pa och kPa.

## Koncept

### Läge 1: Trycksonden (fy1-5.3)

Ett högt akvarium på labbänken. Eleven sänker ned en **trycksond**, en tratt
med ett gummimembran, som via en slang sitter kopplad till en
**U-rörsmanometer** med färgad vätska bredvid akvariet. Det är den klassiska
skollaborationen: ju djupare sonden går, desto större nivåskillnad i
U-röret.

- **Dra sonden** upp och ned och åt sidan. Manometern och en tryckmätare visar
  *p* direkt. Att flytta sonden åt sidan ändrar ingenting.
- **Vrid sonden** (membranet uppåt, åt sidan, nedåt). Manometern står still:
  trycket är lika stort åt alla håll. Membranet buktar alltid inåt, vinkelrätt
  mot sin yta.
- **Byt vätska:** vatten, saltvatten (1 028 kg/m³), matolja, glycerol. Samma
  djup ger olika tryck.
- **Lufttrycket:** en kryssruta lägger till $p_0$ och visar totalt tryck
  $p = p_0 + \rho \cdot g \cdot h$ (fy1-5.4). Manometern visar fortfarande
  bara vätsketrycket, eftersom lufttrycket verkar på båda sidor av U-röret.
  Det är samma resonemang som för trumhinnan i Exempel 1 i fy1-5.4.

### Centerpiece: vätskepelaren

Rakt ovanför sonden lyser en **vätskepelare** upp, med samma area som
membranet och höjden *h* upp till ytan. Pelaren fylls med små, lika tunga
brickor, och bredvid står härledningen ur genomgången med de
aktuella talen:

$p = \dfrac{F}{A} = \dfrac{m \cdot g}{A} = \dfrac{\rho \cdot A \cdot h \cdot g}{A} = \rho \cdot g \cdot h$

Arean förkortas bort, och det syns: pelaren ser likadan ut hur brett
akvariet än är. Pelaren förklarar *varför* bara djupet räknas, i stället för
att bara visa ett tal.

### Läge 2: Kärlens form (fy1-5.3)

Fyra kärl med olika form (rakt, smalt, vidgat uppåt, smalnande uppåt, som i
figuren med de fyra bassängerna), kopplade i botten med ett rör och en kran.

- **Kranen stängd:** eleven häller vatten i ett kärl i taget. Varje kärl har
  en tryckmätare i botten. Samma nivå ger samma tryck, oavsett form och
  mängd. Varje kärl visar också vattnets massa, som är helt olika.
- **Kranen öppen:** kärlen blir kommunicerande. Vattnet strömmar från högre
  till lägre tryck tills nivåerna är lika, och tryckmätarna visar då samma
  värde. Pilar i röret visar åt vilket håll vattnet strömmar och varför.

### Läge 3: Hydraulpressen (fy1-5.8)

En hydraulisk press med en smal och en bred cylinder, oljefylld, och en last
på den breda kolven (ett paket, en motorcykel, en bil).

- Eleven trycker ned den lilla kolven med en kraft $F_1$ (glidare eller dra i
  handtaget). En **tryckmätare på varje cylinder och en mitt i röret** visar
  samma värde: $p_1 = p_2$.
- Formelkortet visar $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$ med insatta tal och
  ordetiketter.
- **Vätskevolymen bevaras:** när den lilla kolven går ned $s_1$ går den stora
  upp $s_2 = s_1 \cdot \dfrac{A_1}{A_2}$. En liten arbetsruta visar att
  $F_1 \cdot s_1 = F_2 \cdot s_2$: kraften förstärks, arbetet gör det inte.
- Areorna väljs fritt. Ett färdigt försök är exakt Exempel 1 i fy1-5.8.

### Färdiga försök

1. **Tio meter vatten:** sonden på 10 m djup i en djup cistern (skalan byter
   till meter), vätsketrycket blir ungefär ett atmosfärstryck.
2. **Samma djup, olika vätskor:** vatten och glycerol sida vid sida.
3. **Vrid sonden:** samma djup, tre riktningar, samma tryck.
4. **Fyra kärl, samma nivå** (figuren i genomgången).
5. **Öppna kranen:** olika nivåer som jämnar ut sig.
6. **Domkraften i Exempel 1:** 100 N på 0,50 dm² lyfter 20 kN på 100 dm².

### Gissa-läge

- **Vad visar tryckmätaren?** Djup och vätska ges, eleven räknar
  $\rho \cdot g \cdot h$ innan sonden sänks. Felsvaret med kärlets bredd eller
  vattenmängd i räkningen får sin förklaring.
- **Vilket kärl har störst tryck i botten?** Fyra kärl med olika form och
  nivå. Eleven väljer, och svaret är alltid kärlet med högst nivå.
- **Hur stor kraft lyfter pressen?** Pascals princip med givna areor och
  kraft, i samma enhet som i Exempel 1.

## 2D eller 3D

**2D.** Djup, nivåer och manometerns nivåskillnad läses av i ett plan, och
U-röret och kärlen är typiska tvärsnittsbilder.

## Hur den skiljer sig från PhET

PhET:s Under Pressure har en tryckmätare som man drar runt i bassänger med
olika form. Tryckbänken bygger i stället på skollaborationen med trycksond och
U-rörsmanometer, har vätskepelaren som förklarar varför formen inte spelar
roll, låter kärlen bli kommunicerande med en kran och binder ihop Pascals
princip med arbete, så att kraftförstärkningen inte ser ut som gratis energi.

## Öppna frågor till Sam

1. **Tre lägen i en simulering, eller två simuleringar?** Förslag: en sida med
   tre lägen, där fy1-5.8 länkar direkt till Hydraulpressen
   (`?lage=pascal`), som Energiflödet gör med fy1-4.6.
2. **Lufttrycket (fy1-5.4) som kryssruta i Trycksonden?** Förslag: ja, avstängd
   från början.
3. **Arbetsrutan i Hydraulpressen** ($F_1 \cdot s_1 = F_2 \cdot s_2$) går
   utöver fy1-5.8. Förslag: med, men liten och nedtonad.
