# Koncept 6: Termodynamikens första huvudsats (bokens 7.4, Fysiklabbet fy1-6.5)

Status: **godkänt, byggt och testat** (2026-10-27)

Arbetsnamn: **Gaskolven**, filen `fysik1-forsta-huvudsatsen-app.html`, länkad
som `href` på fy1-6.5 Termodynamikens fyra huvudsatser. Sjätte delen i serien,
med samma joulebrickor och energifack som Arbetsbänken och Energiflödet, så att
eleven känner igen energibokföringen.

## Vad eleven ska förstå

1. **Den inre energin ändras på två sätt:** genom värme *Q* (temperaturskillnad)
   och genom arbete *W* (en kraft som flyttar kolven). Energin bevaras:
   $\Delta U = Q + W$.
2. **Arbete kan värma en gas utan någon låga:** när kolven trycks ned snabbt blir
   gasen varmare, som när en cykelpump blir varm.
3. **En gas som utför arbete svalnar:** när gasen trycker upp kolven och
   ingen värme tillförs minskar den inre energin, som när luft som pyser ut
   ur en cykelslang känns kall.
4. **Värme blir inte bara temperatur:** värms gasen med en fri kolv går en del
   av värmen till att lyfta vikten, och temperaturen stiger mindre än med låst
   kolv.
5. **Inre energi är partiklarnas rörelseenergi** (fy1-6.1). Temperaturen är ett
   mått på hur snabbt partiklarna rör sig.

## Beteckningar

Teorin i fy1-6.5 har ännu ingen formel för första huvudsatsen, bara orden
"Energi kan inte skapas eller förstöras, bara omvandlas". Förslaget är:

- $\Delta U = Q + W$, där *Q* är värmen **till** gasen och *W* arbetet som
  utförs **på** gasen. Båda är positiva när energi går in, och negativa när
  energi går ut.
- *U* inre energi (J), *T* temperatur (K och °C), *p* tryck (Pa), *V* volym (m³
  eller liter). Samma ord som i fy1-6.1 och fy1-5.7.

Konventionen är densamma som de norska läroböckerna använder (ΔU = W + Q), så
Sigbjørn behöver inte byta tecken i sin översättning.

## Koncept

### Scenen: en gaskolv på labbänken

En glascylinder med en tättslutande kolv står på en värmeplatta, som både kan
värma och kyla. Inne i cylindern studsar gaspartiklar, vars fart följer
temperaturen. På kolven kan eleven lägga vikter. Kolven kan låsas med en spärr,
eller tryckas ned för hand.

- **Värmeplattan:** en reglerbar värmeeffekt, där minus betyder att den kyler.
- **Kolven:** låst, fri med vikter, eller nedtryckt av handen (snabbt eller
  långsamt).
- **Isolering:** en isolerande mantel som stänger av värmeutbytet, så att bara
  arbetet ändrar den inre energin.

### Centerpiece: energibokföringen med joulebrickor

Bredvid cylindern finns ett energifack för den inre energin *U*. Brickor flyger
in i facket från värmeplattan (*Q*) och från kolven (*W*), och ut ur det när
gasen avger värme eller trycker upp vikten. Brickorna har samma färger och
samma värde i joule som i Arbetsbänken och Energiflödet:

- Värmebrickor kommer underifrån, arbetsbrickor ovanifrån.
- Ett räkneverk visar $\Delta U = Q + W$ med insatta tal och tecken, och
  fackets nivå följer temperaturen.

Det gör första huvudsatsen synlig som ett kassaflöde: ingen bricka uppstår
eller försvinner, den byter bara fack.

### p–V-diagram (litet, kan döljas)

Ett litet diagram över trycket mot volymen, där arbetet är arean under kurvan.
Det binder ihop med *F*–*s*-diagrammet i Arbetsbänken.

### Färdiga försök

1. **Värm med låst kolv:** *W* = 0, så Δ*U* = *Q*.
2. **Cykelpumpen:** tryck ned kolven snabbt i isolerad cylinder. *Q* = 0, så
   Δ*U* = *W* och gasen blir varm.
3. **Gasen lyfter en vikt:** isolerad cylinder, spärren släpps. Gasen utför
   arbete och svalnar.
4. **Värm med fri kolv:** värmen delas mellan Δ*U* och arbetet som lyfter
   vikten.
5. **Tryck ihop och kyl samtidigt:** *W* in och *Q* ut lika mycket, så
   temperaturen står still.

### Gissa-läge

- **Varmare eller kallare?** En process beskrivs (värme in eller ut, arbete på
  eller av gasen, isolerad eller inte). Eleven svarar om temperaturen stiger,
  sjunker eller står still, och får förklaringen med brickorna.
- **Hur mycket ändras den inre energin?** *Q* och *W* ges med tecken, och
  eleven räknar Δ*U*.

## 2D eller 3D

**2D.** Cylindern, brickorna och diagrammet läses bäst i ett plan.

## Hur den skiljer sig från PhET

PhET:s Gas Properties visar partiklar, en pump och ett lock som går att flytta,
men lägger ingen energibokföring bredvid. Gaskolven gör energiflödet till
centerpiece med samma joulebrickor som resten av serien, och ställer *Q* och *W*
sida vid sida i en enda ekvation.

## Öppna frågor till Sam

1. **Tecken:** ska vi använda $\Delta U = Q + W$, med arbetet *på* gasen, som
   föreslås ovan, eller $\Delta U = Q - W$ med arbetet *av* gasen? Förslag:
   $Q + W$, eftersom båda storheterna då räknas positiva när energi går in i
   gasen, och för att det är så de norska böckerna skriver.
2. **Teorin:** fy1-6.5 saknar formeln. Ska teorin få den i ett eget arbetspass
   (det sätter igång uppdateringskedjan med övningar, exit tickets och
   pennlösningar), eller ska simuleringen stå för den tills vidare? Förslag:
   simuleringen först, teorin som en egen senare uppgift.
3. **p–V-diagrammet** går lite utöver Fysik nivå 1. Förslag: med, men litet och
   dolt från början.
