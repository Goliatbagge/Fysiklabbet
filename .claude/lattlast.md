# Lättläst svenska: råd

Sammanfattning av Myndigheten för tillgängliga medier (MTM), "Att skriva
lättläst" med guiderna för samhällsinformation, litteratur och webben, samt
8 Sidors beskrivning av sig själv. Läst 2026-11-19. Delar av MTM:s långa
sidor kom bara fram som sammanfattning, så kontrollera ett råd mot källan
om det blir avgörande:
<https://www.mtm.se/vagledning-och-handledningar/att-skriva-lattlast/>.

Används när användaren uttryckligen ber om **lättläst** text. Ber hen bara
om "enklare språk" gäller i första hand klarspråksråden i
`.claude/klarsprak.md`. Lättläst bygger på samma grund men går längre.
Projektets regler i CLAUDE.md gäller fortfarande (inga förkortningar, inga
tankstreck, inga emojier, decimalkomma, beteckningar).

## Skillnaden mot klarspråk

| | Klarspråk | Lättläst |
|---|---|---|
| Läsare | Alla, i synnerhet den breda allmänheten | Läsare med lässvårigheter: intellektuell eller neuropsykiatrisk funktionsnedsättning, dyslexi, afasi, demens, den som lär sig svenska, ovana läsare |
| Innehåll | Allt läsaren behöver, väl ordnat | Mindre innehåll, ett ämne i taget, bara det viktigaste |
| Meningar | 10–20 ord, sällan över 25 | Under 20 ord, inga inskott, huvudsats först |
| Ord | Fackord förklaras | Vardagsord, sammansättningar delas upp, inga bilder eller idiom |
| Form | Vanlig layout | Korta rader (cirka 50 tecken), radbrytning vid naturliga pauser, större radavstånd |

Skriv för den läsare som har störst behov. Då förstår fler.

## 1. Innehåll

- Bestäm först vem som läser och vad hen ska veta eller kunna göra efteråt.
- **Ett ämne i taget.** Ta bort det överflödiga, men lämna inga logiska
  luckor: ett steg som stryks kan göra resten obegripligt.
- Utgå från läsarens förkunskaper och vardag.
- Korta ord och meningar räcker inte. Innehållet måste också vara enkelt.
- Vaga formuleringar gör texten svår. Skriv bara det du är säker på.
- Berättande text: tydlig tid och plats, vardagliga miljöer, få personer,
  en huvudhandling utan sidospår.

## 2. Ordning

- Det viktigaste först.
- Rak kronologi, inga hopp fram och tillbaka i tiden.
- Rubriker och mellanrubriker som sammanfattar det som kommer under dem.
- Nytt stycke för varje ny tanke. Blankrad, inte indrag.
- Punktlista vid uppräkningar.

## 3. Meningar

- **Högst cirka 20 ord.** Blanda korta och lite längre, så att texten
  flyter.
- **Huvudsatsen först**, bisatsen efter: "Bollen faller fortare om du
  släpper den högre upp" hellre än en mening som börjar med villkoret.
- **Inga inskjutna bisatser.** "Bollen, som är av gummi, studsar högt."
  blir "Bollen är av gummi. Den studsar högt."
- Visa sambanden med enkla bindeord: men, därför, så, alltså, eftersom.
- Aktiva verb och tydligt subjekt, "du" och "vi" i stället för "man":
  "Du mäter tiden med ett tidtagarur" i stället för "Tiden mäts".

## 4. Ord

- **Vanliga, korta, konkreta ord**: "bil" i stället för "fordon".
- **Dela upp långa sammansättningar**: "besök på restaurang" i stället för
  "restaurangbesök"; i fysiken "kraften från marken" kan vara lättare än
  "normalkraften" första gången (fackordet kommer sedan, förklarat).
- **Samma ord för samma sak hela texten.** Variera inte med synonymer, då
  tror läsaren att det är olika saker ("kulan" ska inte bli "klotet" och
  "föremålet").
- **Svåra ord förklaras i sammanhanget**, genom vad saken gör eller är,
  utan att det låter förminskande ("det betyder …" kan kännas
  nedlåtande).
- **Inget bildspråk**: inga metaforer, ordspråk eller idiom ("en riktig
  räv", "ligger en hund begraven"). De kan läsas bokstavligt. En konkret
  jämförelse ("kall som is") går bra.
- **Inga onödiga negationer**: skriv vad något är, inte vad det inte är.
  "Det är tråkigt att vänta" hellre än "Det är inte roligt att vänta".

## 5. Tal, datum och förkortningar

- MTM: skriv tal i ord när det går ("hälften", "en miljon") och årtal med
  "år" ("år 1999"). Undvik tabeller och diagram, eller förklara dem i
  löptexten.
- **I fysik och matematik behövs exakta tal**: behåll mätvärden och
  formler, men ge en vardaglig jämförelse när talet är stort eller litet
  ("ungefär hälften", "lika tungt som en mjölkförpackning").
- Inga förkortningar (sajtens regel ändå). En akronym som EU eller FN
  skrivs ut och förklaras första gången.

## 6. Layout

- Radlängd högst cirka 50 tecken (webben högst 55, kontrollera på
  mobilen).
- Ojämn högermarginal, ingen avstavning, **radbrytning vid naturliga
  pauser** (aldrig mitt i en fras som hör ihop).
- Brödtext 12–14 punkter, radavstånd 140–150 procent.
- Tydligt typsnitt där I och l inte förväxlas, öppna former, hög x-höjd.
  Kursivera aldrig hela stycken.
- God kontrast, ingen text över bilder eller mönster.
- Bilder ska vara konkreta och förklara texten. Inga dekorativa bilder och
  ingen information i bilden som inte står i texten.
- Webben: den lättlästa versionen ska gå att hitta från originalet (länk
  eller bredvid), men den lättlästa texten länkar inte tillbaka till
  originalet.

## 7. Testa

- Läs texten högt. Där du snubblar snubblar läsaren.
- Bäst: låt någon i målgruppen läsa och berätta vad texten säger.
- Kör `verify-sprak.js` och be `korrekturlasare` granska mot den här filen.

## Förebilder

8 Sidor (lättläst nyhetstidning från MTM): något större text, kortare
meningar, inga svåra eller ovanliga ord, förklarar vad som hänt, var och
varför. Lättlästa myndighetssidor finns bland annat på 1177.se,
krisinformation.se, riksdagen.se, skolverket.se och socialstyrelsen.se.

## Inte läst

MTM beskriver inga nivåer av lättläst på de lästa sidorna. Ej lästa:
MTM:s temasida om lättläst, sidorna för läsombud och LL-förlaget samt
Begripsams material.
