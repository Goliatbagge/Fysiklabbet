# Koncept 12: Linjalen på två fingrar (bokens 4.1 Likevekt, Fysiklabbet fy2-1.2)

Status: **godkänt och byggt** (2026-10-27), väntar på Sams test

Arbetsnamn: **Fingerbalansen**, filen `fysik2-linjalen-app.html`. Den länkas som
`href2` på fy2-1.2 Mer kraftmoment, efter brädan på två bockar. Den inbäddade
simuleringen `linjal` i teorin står kvar. Den här sidan är den fristående
versionen, som Sigbjørn kan länka till, och den går längre: den visar
momentlagen bakom tricket och vad som händer när försöket görs åt andra hållet.

## Vad eleven ska förstå

Ur fy2-1.2:

1. **En stödkraft bär mer ju närmare tyngdpunkten den sitter.** Med
   momentlagen kring det ena fingret får man
   $F_P = F_G \cdot \dfrac{l_Q}{l_P + l_Q}$, där $l_P$ och $l_Q$ är fingrarnas
   avstånd till tyngdpunkten. Det är teorins tumregel, räknad.
2. **Friktionskraften följer normalkraften**, $F_f = \mu \cdot F_N$. Fingret
   som bär mest tål störst friktionskraft innan det glider och sitter fast. Det andra glider.
3. **Därför byter fingrarna roll, om och om igen**, och möts till sist under
   tyngdpunkten, var den än ligger.

## Beteckningar

Som i fy2-1.2: stödkrafterna $F_P$ och $F_Q$ (normalkrafterna från fingrarna
P och Q), $F_G$ i tyngdpunkten och hävarmarna $l_P$, $l_Q$, $l_G$.
Friktionstalet *μ* och $F_f$ som i fy1-3.6. Kraftmoment med pilbeteckning
(moturs och medurs), som i teorin.

## Koncept

En linjal ligger på två pekfingrar framför en svart tavla med en
centimeterskala. Eleven drar ihop fingrarna med ett reglage (eller en knapp,
"Dra ihop"), och linjalen åker med det finger som sitter fast.

### Centerpiece: Vågen under fingrarna

Under varje finger står en stapel som visar normalkraften, med en streckad
markering för hur stor friktionskraft fingret kan ge innan det glider
($\mu \cdot F_N$). Staplarna ändras medan fingrarna rör sig. Man ser direkt:
det finger vars stapel är lägst glider, och när staplarna går om varandra
byter fingrarna roll. Bredvid står momentlagen med de aktuella avstånden
insatta, så att stapelhöjderna går att räkna fram.

Under scenen ritas ett **spår över tiden**: fingrarnas lägen som två kurvor
som sicksackar mot varandra och möts vid tyngdpunkten. Det är den bild som
visar att växlingen sker "av sig själv".

### Variationer

- **Lägg en vikt på linjalen** och dra den dit du vill. Tyngdpunkten flyttar
  sig och fingrarna möts på det nya stället.
- **Andra föremål:** linjal, kvast (tung ände), basebollträ och en
  biljardkö. Tyngdpunkten är dold från början, och fingrarna hittar den.
- **Dra isär fingrarna:** försöket åt andra hållet. Nu glider hela tiden det
  finger som sitter längst bort från tyngdpunkten (det har minst
  normalkraft), ingen växling sker, och till slut faller linjalen. Det är en
  bra fråga till eleven: varför går det bara åt ena hållet?

### Färdiga försök

1. **Fingrarna symmetriskt:** möts i mitten.
2. **Ena fingret nära mitten:** det andra glider först, och sedan växlar de.
3. **Vikt i ena änden:** de möts nära vikten.
4. **Kvasten:** tyngdpunkten nära borsten.
5. **Dra isär:** linjalen faller.

### Gissa-läge

- **Var möts fingrarna?** En kvast eller en linjal med vikt visas med
  tyngdpunkten dold. Eleven pekar ut stället, eller räknar det med
  momentlagen när massor och lägen ges, innan fingrarna dras ihop.
- **Vilket finger glider först?** Fingrarnas lägen ges, och eleven väljer.

## 2D eller 3D

**2D.** Momentlagen, staplarna och spåret läses bäst i en sidovy. Fingrarna
ritas omsorgsfullt, med naglar och leder, som riktiga händer underifrån.

## Hur den skiljer sig från andra

Det finns videor av försöket men ingen simulering som visar *varför* det
fungerar. Fingerbalansen gör normalkrafterna och friktionsgränserna synliga
medan fingrarna rör sig, och visar med "dra isär" att förklaringen också
säger när tricket inte fungerar.

## Öppna frågor till Sam

1. **Vilofriktion och glidfriktion:** fysiken kräver egentligen att
   vilofriktionen är lite större än glidfriktionen, annars sker bytena hela
   tiden i små ryck. Teorin använder bara ett *μ*. Förslag: ett *μ* syns för
   eleven, och motorn använder ett något större värde för vila, som bara
   nämns i en "Fördjupning"-ruta.
2. **Dra isär** är inte med i teorin. Förslag: med, som det sista försöket,
   eftersom det prövar att eleven förstått förklaringen.
3. **Andra föremål än linjalen** (kvast, basebollträ, biljardkö). Förslag:
   med, för att visa att metoden hittar tyngdpunkten även när den inte
   ligger i mitten.
