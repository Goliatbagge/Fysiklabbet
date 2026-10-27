# Koncept 7: Energins kvalitet och termodynamikens andra huvudsats (bokens 7.5, Fysiklabbet fy1-6.5)

Status: **godkänt och byggt** (2026-10-27), testat och godkänt

Arbetsnamn: **Värmeflödet**, filen `fysik1-andra-huvudsatsen-app.html`, länkad
som `href2` på fy1-6.5, bredvid Gaskolven. Den sjunde delen i serien använder
samma joulebrickor som de tidigare delarna.

## Vad eleven ska förstå

1. **Värme går från varmt till kallt, aldrig tvärtom av sig självt**
   (andra huvudsatsen i fy1-6.5). Två föremål i kontakt får till slut
   samma temperatur (nollte huvudsatsen).
2. **Varför:** energin delas slumpmässigt mellan oerhört många partiklar. Det
   finns ofantligt många fler sätt att fördela energin jämnt än ojämnt. Därför
   sprids den, och det är bara osannolikt, inte förbjudet, att den samlar sig
   igen. Det är så omöjligt i praktiken att det aldrig händer.
3. **Energins kvalitet:** energin bevaras (första huvudsatsen), men den blir
   mindre användbar. Rörelseenergi och elektrisk energi kan helt omvandlas till
   värme, men värme kan aldrig helt omvandlas tillbaka.
4. **Värmemaskinen:** en maskin som gör arbete av värme måste släppa ut en del
   av värmen till något kallare. Den största möjliga verkningsgraden är
   $\eta_\text{max} = 1 - \dfrac{T_k}{T_v}$, med temperaturerna i kelvin.
5. **Värmepumpen och kylskåpet** flyttar värme från kallt till varmt, men bara
   när de får arbete tillfört (teorins exempel med kylskåpet).

## Beteckningar

Teorin i fy1-6.5 ger andra huvudsatsen i ord. Verkningsgraden
$\eta = \dfrac{E_\text{nyttig}}{E_\text{tillförd}}$ följer fy1-4.6 och
Energiflödet. *T* i kelvin, *Q* värme (J), *W* arbete (J). Samma tecken och
brickor som i Gaskolven.

## Koncept

### Läge 1: Varmt och kallt

Två kopparblock på labbänken, ett varmt och ett kallt, med en termometer i
vardera. Eleven trycker ihop dem.

- **Brickorna hoppar slumpmässigt** mellan blocken, en i taget. Varje
  partikel lämnar ifrån sig och tar emot energi på måfå, utan att "veta" vilket
  block som är varmt. Ändå blir flödet tydligt från varmt till kallt, och det
  stannar när temperaturerna är lika.
- Ett **temperatur–tid-diagram** visar hur kurvorna möts.
- **Knappen Spola baklänges** frågar: kan brickorna samla sig i det ena
  blocket igen av sig själva? Simuleringen fortsätter slumpa. Med få brickor
  händer det ibland, med många nästan aldrig.

### Centerpiece: Antalet sätt

Bredvid blocken finns ett stapeldiagram med antalet sätt att fördela brickorna
mellan blocken (antalet mikrotillstånd) för varje fördelning. Toppen ligger
vid den jämna fördelningen, och den blir smalare ju fler brickor det finns. En
markör visar var systemet befinner sig just nu. Diagrammet förklarar varför
värmen sprids: systemet hamnar där det finns flest sätt.

Ett reglage för antalet brickor (10, 40, 200) visar skillnaden mellan några få
partiklar, där baklänges händer, och många, där det aldrig gör det.

### Läge 2: Värmemaskinen och värmepumpen

En värmemaskin mellan en varm och en kall behållare, ritad som ett
energiflöde med brickor, som i Energiflödet:

- **Värmemaskinen:** *Q*_v kommer in från den varma sidan. En del blir arbete
  *W*, som lyfter en vikt, och resten, *Q*_k, går ut till den kalla sidan.
  Glidare för *T*_v och *T*_k och för den verkningsgrad eleven vill ha.
  Försöker eleven ställa in en verkningsgrad över $1 - \dfrac{T_k}{T_v}$ blir
  maskinen röd, med förklaringen att värme då skulle behöva gå från kallt till
  varmt av sig självt.
- **Värmepumpen och kylskåpet:** samma maskin baklänges. Arbete *W* går in,
  värme hämtas från den kalla sidan och lämnas på den varma.
- **Energins kvalitet:** brickorna har en färgskala, där arbete och
  elektrisk energi är "fina" och värme vid låg temperatur är "sliten". Antalet
  brickor bevaras genom hela maskinen, men kvaliteten sjunker.

### Färdiga försök

1. **Varmt möter kallt:** 80 °C mot 20 °C, lika stora block.
2. **Litet varmt, stort kallt:** sluttemperaturen hamnar närmare den kalla.
3. **Tio brickor:** baklänges händer ibland.
4. **Bilmotorn:** *T*_v ≈ 900 K och *T*_k ≈ 350 K ger η_max ≈ 61 %, och en
   verklig bensinmotor ligger kring 25–30 %.
5. **Kraftverket:** ånga vid 800 K och kylvatten vid 300 K.
6. **Kylskåpet:** värme flyttas från 5 °C till 20 °C med hjälp av arbete.

### Gissa-läge

- **Vilken sluttemperatur får blocken?** Massorna och starttemperaturerna ges.
- **Går maskinen att bygga?** En verkningsgrad och två temperaturer ges.
  Eleven svarar ja eller nej och får förklaringen med η_max.

## 2D eller 3D

**2D.** Brickorna, diagrammen och energiflödet läses i ett plan.

## Hur den skiljer sig från PhET

PhET:s Energy Forms and Changes visar energi som klossar som flyttar mellan
föremål, men förklarar inte varför värmen bara går åt ett håll. Värmeflödet
gör slumpen synlig. Brickorna hoppar på måfå, och diagrammet över antalet sätt
visar varför resultatet ändå alltid blir detsamma. Värmemaskinen binder ihop
andra huvudsatsen med verkningsgraden från Energiflödet.

## Öppna frågor till Sam

1. **Maximal verkningsgrad:** ska $\eta_\text{max} = 1 - \dfrac{T_k}{T_v}$ vara
   med? Den finns inte i Fysiklabbets teori, men den hör till 7.5 i de norska
   böckerna. Förslag: med, i läge 2.
2. **Antalet sätt (mikrotillstånd):** går det utöver Fysik nivå 1? Förslag:
   med, eftersom det är det som förklarar *varför*, men utan ordet entropi i
   rubriken. Entropi nämns i en rad som fördjupning.
3. **En simulering eller två:** förslaget är en sida med två lägen, länkad som
   `href2` på fy1-6.5.
