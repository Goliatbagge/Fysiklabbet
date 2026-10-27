# Koncept 15: Kalorimetri (bokens 7.3 Kalorimetri, Fysiklabbet fy1-6.2)

Status: **godkänt, byggt och testat** (2026-10-27)

Arbetsnamn: **Kalorimetern**, filen `fysik1-kalorimetri-app.html`. Den länkas
som `href2` på fy1-6.2 Uppvärmning och avsvalning, bredvid den simulering som
finns där. Den nuvarande simuleringen visar uppvärmning och avsvalning av ett
föremål. Det som saknas är kalorimetern: två ämnen som blandas, där den
avgivna energin är lika stor som den upptagna och sluttemperaturen kan
förutsägas.

## Vad eleven ska förstå

Ur fy1-6.2 (och fy1-6.3 för isen):

1. **Den energi som upptas eller avges** är $E = c \cdot m \cdot \Delta T$.
2. **Utan energiförluster är avgiven energi lika med upptagen energi**,
   $E_\text{avg} = E_\text{upp}$. Det varma svalnar och det kalla värms tills
   båda har samma temperatur.
3. **Sluttemperaturen hamnar närmast det ämne som har störst $c \cdot m$.**
   En liten metallbit i mycket vatten ändrar vattnets temperatur lite, eftersom
   vatten har stor specifik värmekapacitet.
4. **Med kalorimetern kan man mäta en okänd specifik värmekapacitet** genom
   att mäta temperaturerna och räkna baklänges.

## Beteckningar

Som i fy1-6.2: *E* (i formelhäftet *Q*), *c* i J/(kg · K), *m*, $\Delta T$,
$E_\text{avg}$, $E_\text{upp}$ och *T* för sluttemperaturen. Smältvärmet
$l_\text{s}$ som i fy1-6.3, om isen kommer med.

## Koncept

En kalorimeter på labbänken: en isolerad kopp med lock, omrörare och
termometer. Bredvid står en kokande vattenkastrull som metallbitar värms i, en
vattenkokare och en isbehållare.

### Läge 1: Blanda varmt och kallt vatten

Teorins Exempel 2: häll varmt vatten i kallt. Mängder och temperaturer ställs
in, och eleven ser blandningen röras om tills temperaturen slutar ändras.

### Läge 2: Metallbit i vatten

En metallbit värms i kokande vatten (100 °C) och lyfts över i kalorimetern.
Välj aluminium, järn, koppar eller bly, eller en **okänd metall**: eleven
läser av temperaturerna och räknar fram *c*, och jämför med värmetabellen
för att se vilken metall det är.

### Läge 3: Is i vatten

Teorins Exempel 2 i fy1-6.3: is smälter i varmt vatten. Temperaturen står still
vid 0 °C tills isen smält, och energin delas i "smälta isen" och "värma
smältvattnet".

### Centerpiece: Energivågen

Två staplar bredvid kalorimetern, avgiven energi och upptagen energi, byggda
av joulebrickor som i Arbetet och Värmeflödet. Medan blandningen rörs om
flyttas brickor från det varma till det kalla, och staplarna är alltid lika
höga. Ett *T*–*t*-diagram visar de två temperaturerna som närmar sig varandra
och möts i sluttemperaturen.

### Energiförluster

Kryssrutan **Riktig kalorimeter** låter en del av energin läcka ut till rummet
och räknar med kalorimeterns egen värmekapacitet. Sluttemperaturen hamnar då
lite lägre än beräknat, och en tredje stapel visar energin som gått till
omgivningen. Det förklarar varför mätningar i skolan aldrig blir exakta.

### Färdiga försök

1. **Teorins Exempel 2:** 5,0 dl 80-gradigt och 3,0 dl 20-gradigt vatten.
2. **Lika mycket av varje:** sluttemperaturen hamnar mitt emellan.
3. **Kopparbit i vatten:** temperaturen ändras nästan inte.
4. **Den okända metallen.**
5. **Is i varmt vatten.**

### Gissa-läge

- **Vad blir sluttemperaturen?** Mängder och temperaturer ges, och eleven
  räknar innan blandningen görs.
- **Vilken metall är det?** Temperaturerna mäts, och eleven räknar *c*.

## 2D eller 3D

**2D.** En sidovy av kalorimetern med staplarna och diagrammet bredvid.

## Hur den skiljer sig från andra

Kalorimetersimuleringar brukar visa termometern och sluttemperaturen. Den här
gör energibalansen synlig som brickor som flyttas och staplar som alltid är
lika höga, och låter eleven använda kalorimetern som ett mätinstrument för
att identifiera en okänd metall.

## Öppna frågor till Sam

1. **Läge 3, isen:** den hör till fy1-6.3 Faser och fasövergångar. Förslag: med,
   eftersom bokens 7.3 Kalorimetri brukar ta med blandningar med is.
2. **Energiförluster:** förslag att de är avslagna från början och kan slås på
   med kryssrutan Riktig kalorimeter.
3. **Var den ska ligga:** förslag `href2` på fy1-6.2, med ett djuplänkat läge
   (`?lage=is`) som även länkas från fy1-6.3, som i dag saknar simulering.
