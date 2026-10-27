# Koncept 1: Arbete (bokens 5.1, Fysiklabbet fy1-4.1)

Status: **väntar på Sams godkännande** (2026-10-27)

Arbetsnamn: **Arbetsbänken**, filen `fysik1-arbete-app.html`, länkad som
`href` på fy1-4.1 Energi, intro och arbete.

## Vad eleven ska förstå

Ur fy1-4.1 och de vanligaste missuppfattningarna:

1. Arbete är kraft gånger sträcka, *W* = *F*ₛ · *s*, där *F*ₛ är kraften **i
   rörelsens riktning**.
2. En sned kraft räknas bara med sin komposant längs rörelsen,
   *F*ₛ = *F* · cos *v*.
3. **Trött är inte samma sak som arbete.** Att bära en låda rakt fram eller
   dra i något som inte rör sig ger *W* = 0, hur hårt man än tar i.
4. 1 kg lyft 2 m ger samma arbete som 2 kg lyft 1 m.
5. Arbete är ingen energiform utan en **process**: energi som flyttas från dig
   till föremålet och byter form (rörelseenergi, lägesenergi, värme).

## Beteckningar (synkas med fy1-4.1)

*W*, *F*, *F*ₛ, *s* och vinkeln *v* mot rörelseriktningen. Komposanterna
heter *F*₁ (lodrät) och *F*₂ (längs rörelsen), streckade som i teorins figur
till exempel 3. Enheten skrivs Nm (= J), som i teorins svar. Teorin använder
*v* för vinkeln, så simuleringen gör det också.

## Koncept

### Scenen: en labbänk, inte en abstrakt låda

En labbänk sedd från sidan, med en meterlinjal längs bänkkanten och ett
labbstativ i ena änden. På bänken står en trälåda eller en dynamikvagn. En
hand håller i en **dynamometer** (kraftmätare) som är fäst i föremålet.
Talen är i labbskala: 0–20 N och upp till 1,5 m, så arbetet hamnar mellan 0
och 30 J och går att räkna med ögonen.

**Eleven drar direkt i dynamometerns handtag.** Handtagets läge bestämmer
både kraften (hur långt fjädern sträcks, med skalan läsbar på
dynamometern) och vinkeln *v*. Det finns inga reglage för *F* och *v* i
scenen, bara greppet. Reglagen finns i sidopanelen för den som vill sätta
exakta värden. Kraftpilen *F* och de streckade komposanterna *F*₁ och *F*₂
följer handtaget i realtid.

### Centerpiece: arbetsrutan fylls med joulebrickor

Till höger om scenen finns ett diagram med *F*ₛ på den lodräta axeln och *s*
på den vågräta. När föremålet rör sig växer en rektangel med bredden *s* och
höjden *F*ₛ, och den fylls med **brickor på 1 J** (rutor på 1 N · 1 m). Det är
formeln *W* = *F*ₛ · *s* som går att se, mäta och räkna.

- *F*₂-pilen i scenen och rektangelns höjd hänger ihop visuellt. En tunn
  streckad linje visar att det är samma längd, så att eleven ser varför det
  är just komposanten som räknas.
- Lutas kraften mer blir rektangeln lägre, och vid *v* = 90° blir den platt.
  Då kommer inga brickor alls.
- Förra försöket står kvar som en streckad kontur. Då syns direkt att
  "smal och hög" och "bred och låg" kan ha samma area (1 kg × 2 m mot
  2 kg × 1 m).

**Brickorna flyger vidare** till tre energifack under diagrammet:
rörelseenergi, lägesenergi och värme. Det visar att arbetet är en process där
energi flyttas och byter form, inte en energi i sig. Vart brickorna går
bestäms av fysiken:

- vagn utan friktion: allt blir rörelseenergi (vagnen accelererar)
- låda med friktion: en del blir värme, resten rörelseenergi
- lyft längs stativet: lägesenergi (plus rörelseenergi om man drar hårdare
  än tyngden)

Facken visar bara antalet joule. Formlerna för *E*ₖ och *E*ₚ kommer först i
4.2–4.3, så de nämns inte här.

### Fysiken är ärlig

Samma rörelsemotor för alla försök: en rörelse längs en axel med den
resulterande kraften längs axeln.

- Friktionen är $F_f = \mu \cdot F_N$ med $F_N = m \cdot g - F_1$. En
  uppåtlutad kraft minskar alltså friktionen, som i verkligheten.
- Är *F*ₛ mindre än den statiska friktionen står lådan still. Dynamometern
  visar en stor kraft, men rektangeln får bredden 0 och inga brickor
  kommer. Det blir en egen aha-stund: **kraft utan förflyttning är inget
  arbete**.
- Energin kontrolleras i varje tidssteg: dina brickor = rörelseenergi +
  värme + lägesenergi.

### Färdiga försök (ett klick ställer upp scenen)

1. **Dra rakt** (vagn, *v* = 0°): grundfallet.
2. **Dra snett** (vagn, *v* = 30°): komposanten, som Hosnis vagn.
3. **Bära lådan** (handen håller vikten och går längs bänken): kraften uppåt,
   rörelsen åt sidan, 0 J. Martins låda.
4. **Lyfta 1 kg två meter eller 2 kg en meter** (längs stativet): två
   rektanglar med samma area.
5. **Dra i något som sitter fast** (tung låda med hög friktion): stor kraft,
   0 J.

### Gissa-läge: "Hur mycket arbete?"

Simuleringen slumpar kraft, vinkel och sträcka och döljer brickräknaren.
Eleven räknar *W* och skriver in svaret, och sedan drar sig lådan fram medan
brickorna fyller rutan som facit. Svaret godkänns inom 2 %, med förklaring vid
fel (vanligaste felet: att glömma cos *v*). Poäng och svit räknas.

En kvalitativ variant ligger i samma läge: tre försök som kort, och eleven
väljer vilket som ger mest arbete innan de körs.

### Formelkortet i sidhuvudet

    Arbete = kraften i rörelsens riktning · sträcka
       W   =            Fₛ               ·    s

med ordetiketter över och under varje storhet, och
*F*ₛ = *F* · cos *v* som andra rad. När försöket körs fylls värdena i live:
*W* = 12 N · 1,5 m = 18 Nm.

## 2D eller 3D

**2D.** Allt som ska läsas av (kraftens riktning, komposanterna, sträckan
och arbetsrutan) ligger i ett plan. 3D skulle bara göra vinklarna svårare att
bedöma och tillföra mycket lite.

## Hur den skiljer sig från PhET

PhET (The Ramp, Energy Skate Park) visar arbete som stapeldiagram och styrs
med reglage. Arbetsbänken styrs med ett grepp i en riktig dynamometer.
Arbetet syns som en area som fylls med räknebara joulebrickor, och brickorna
går synligt vidare till energiformer. Det är tre egna grepp.

## Layout

Normalläge: scenen till vänster (labbänk med arbetsrutan och energifacken
till höger i samma scen), sidopanel till höger med försök, reglage (*F*, *v*,
*s*, underlag, massa) och gissa-läget. I fullskärm samlas verktygen i
inställningsrutan uppe till höger. På mobil hamnar scenen överst och
arbetsrutan under den, och verktygen dockas under.

## Öppna frågor till Sam

1. Ska vinklar över 90° tillåtas (negativt arbete, kraften bromsar)? Det står
   inte i fy1-4.1, men det är standard i norska Fysikk 1 (*W* = *F* · *s* ·
   cos *α*). Förslag: ja, men bara i ett läge "Utforska".
2. Brickor på 1 J räcker upp till ~30 J. Ska de bli 10 J-brickor
   automatiskt vid större arbete, eller ska talen hållas i labbskala?
