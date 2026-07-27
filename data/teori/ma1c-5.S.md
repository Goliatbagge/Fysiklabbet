---
id: ma1c-5.S
title: Sammanfattning
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.S'
---

# Sammanfattning — Statistik och sannolikhetslära

Det här kapitlet handlade om hur man samlar in och tolkar data på ett
tillförlitligt sätt, och om hur man räknar på slumpens spel. Du har mött
urvalsmetoder och felkällor, felmarginal och signifikans, korrelation och
kausalitet, samt fyra olika sätt att räkna ut sannolikheter: den klassiska
sannolikhetsdefinitionen, experimentell sannolikhet, produktregeln med
träddiagram och komplementhändelse. Du ska efter kapitlet kunna granska en
undersöknings tillförlitlighet och beräkna sannolikheten för både enkla och
sammansatta händelser.

## Begrepp att kunna

- **population och stickprov**: populationen är den grupp en undersökning
  handlar om; en totalundersökning undersöker hela populationen, en
  stickprovsundersökning bara en mindre del av den.
- **urval**: hur man väljer ut vilka i populationen som ska ingå i en
  stickprovsundersökning; tre vanliga metoder är obundet slumpmässigt,
  systematiskt och stratifierat urval.
- **felkällor (urvalsfel och mätfel)**: urvalsfel uppstår när urvalet inte
  representerar populationen; mätfel uppstår t.ex. genom ledande frågor
  eller ofullständiga svarsalternativ.
- **svarsbortfall**: när inte alla tillfrågade svarar på en undersökning;
  ett stort bortfall gör att det sanna resultatet bara kan anges som ett
  intervall.
- **felmarginal ($f$)**: hur mycket ett resultat kan förväntas variera om
  undersökningen upprepades; anges ofta så att resultatet med 95 %
  säkerhet ligger inom felmarginalen.
- **konfidensintervall**: det intervall (resultatet ± felmarginalen) som
  det sanna värdet med 95 % säkerhet ligger inom.
- **signifikans**: sannolikheten att en uppmätt förändring är verklig och
  inte bara beror på slumpen; en förändring större än felmarginalen är
  statistiskt säkerställd.
- **korrelation**: ett samband mellan två variabler, undersöks med ett
  spridningsdiagram; kan vara stark eller svag samt positiv eller negativ.
- **kausalitet och skensamband**: kausalitet är ett orsakssamband mellan
  två variabler; ett skensamband är en korrelation utan kausalitet, ofta
  orsakad av en bakomliggande gemensam faktor.
- **sannolikhet ($P$), utfall och utfallsrum**: sannolikheten anger
  chansen att en händelse inträffar; utfallsrummet är mängden av alla
  möjliga utfall och de gynnsamma utfallen är de som stämmer med
  händelsen.
- **den klassiska sannolikhetsdefinitionen**: vid likformig
  sannolikhetsfördelning (alla utfall lika sannolika) ges sannolikheten av
  antalet gynnsamma utfall genom antalet möjliga utfall.
- **experimentell sannolikhet och relativ frekvens**: när utfallen inte är
  lika sannolika bestäms sannolikheten i stället genom upprepade försök;
  ju fler försök desto säkrare blir den relativa frekvensen.
- **produktregeln**: sannolikheten för en kombination av händelser fås
  genom att multiplicera de enskilda händelsernas sannolikheter.
- **oberoende och beroende händelse**: vid en oberoende händelse (t.ex.
  med återläggning) påverkas inte sannolikheten av tidigare utfall; vid en
  beroende händelse (t.ex. utan återläggning) ändras sannolikheten.
- **träddiagram**: ett diagram med grenar som visar sannolikheten för
  varje utfall i en kombination; sannolikheten för en gren fås genom att
  multiplicera längs grenen, och flera grenar med samma resultat adderas.
- **komplementhändelse**: en händelses "motsats"; sannolikheterna för en
  händelse och dess komplementhändelse summerar alltid till 1 (100 %),
  vilket används vid "minst en"-uppgifter.

## Formler

::: formel "Kapitlets formler"
**Felmarginal**

$$
f = 1{,}96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

där

- $f$ = felmarginal (procentenheter)
- $p$ = andelen i procent som gett ett visst svar
- $n$ = stickprovets storlek

**Konfidensintervall**

$$
p - f \le \text{sant värde} \le p + f
$$

där

- $p$ = den uppmätta andelen (%)
- $f$ = felmarginalen (procentenheter)

**Den klassiska sannolikhetsdefinitionen**

$$
P(\text{händelse}) = \frac{\text{antalet gynnsamma utfall}}{\text{antalet möjliga utfall}}
$$

(Gäller vid likformig sannolikhetsfördelning, dvs. när alla utfall är lika
sannolika.)

**Produktregeln (oberoende händelser)**

$$
P(A \text{ och } B) = P(A) \cdot P(B)
$$

där $P(A)$ och $P(B)$ är sannolikheterna för två oberoende händelser.
Regeln gäller på samma sätt för fler än två händelser i rad —
sannolikheterna multipliceras led för led.

**Komplementhändelse**

$$
P(\text{händelse}) = 1 - P(\text{komplementhändelse})
$$
:::

## Viktiga samband och metoder

- Skilj på **totalundersökning** (hela populationen undersöks, exakt men
  tidskrävande) och **stickprovsundersökning** (en del av populationen,
  mindre exakt men lättare att genomföra).
- Kontrollera alltid att en enkätfråga inte är ledande och att
  svarsalternativen täcker in alla rimliga svar — annars uppstår ett
  mätfel.
- Tar man hänsyn till svarsbortfallet kan resultatets sanna värde bara
  anges som ett intervall: den undre gränsen fås om ingen i bortfallet
  svarat på ett visst sätt, den övre gränsen om alla gjort det.
- Konfidensintervallet fås genom att ta resultatet ± felmarginalen
  ($p \pm f$).
- En förändring är signifikant (statistiskt säkerställd) bara om den är
  större än felmarginalen — annars kan den bero på slumpen.
- Avläs riktning (positiv/negativ lutning) och styrka (stark/svag
  spridning) hos en korrelation i ett spridningsdiagram.
- Korrelation innebär inte kausalitet — kontrollera alltid om ett samband
  kan vara ett skensamband, orsakat av en bakomliggande gemensam faktor.
- Den klassiska sannolikhetsdefinitionen gäller bara vid likformig
  sannolikhetsfördelning — är utfallen olika sannolika (t.ex. mål/miss vid
  straffar) måste sannolikheten i stället bestämmas experimentellt genom
  relativ frekvens.
- Vid uppgifter med två föremål (två tärningar, två mynt): rita upp hela
  utfallsrummet och räkna gynnsamma utfall mot möjliga utfall.
- Avgör alltid om händelser är oberoende (med återläggning — sannolikheten
  ändras inte) eller beroende (utan återläggning — sannolikheten ändras)
  innan produktregeln tillämpas.
- I ett träddiagram: multiplicera sannolikheterna längs en gren för att få
  sannolikheten för just den kombinationen; finns flera grenar som ger
  samma resultat, addera grenarnas sannolikheter.
- Vid "minst en"-uppgifter (t.ex. minst en sexa vid flera tärningskast) är
  det oftast enklast att räkna ut sannolikheten för komplementhändelsen
  ("ingen sexa alls") och sedan ta $1 -$ den sannolikheten.

## Figurer värda att minnas

Ett spridningsdiagram där punkterna ligger tätt kring en stigande linje
visar en stark positiv korrelation:

::: figur
<svg viewBox="-14 -18 151 144" width="151" height="144" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Spridningsdiagram där punkterna ligger tätt kring en stigande rät linje: stark positiv korrelation."><line x1="0.0" y1="0.0" x2="0.0" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="115.2" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="123.2" y2="105.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="131.2,105.6 121.2,101.1 121.2,110.1" fill="#1f2530"/><line x1="0.0" y1="105.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="129.2" y="123.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="8.0" cy="94.4" r="2.4" fill="#c8324a"/><circle cx="16.0" cy="86.4" r="2.4" fill="#c8324a"/><circle cx="24.0" cy="83.2" r="2.4" fill="#c8324a"/><circle cx="32.0" cy="72.0" r="2.4" fill="#c8324a"/><circle cx="40.0" cy="67.2" r="2.4" fill="#c8324a"/><circle cx="48.0" cy="54.4" r="2.4" fill="#c8324a"/><circle cx="56.0" cy="51.2" r="2.4" fill="#c8324a"/><circle cx="64.0" cy="40.0" r="2.4" fill="#c8324a"/><circle cx="72.0" cy="35.2" r="2.4" fill="#c8324a"/><circle cx="80.0" cy="22.4" r="2.4" fill="#c8324a"/><circle cx="88.0" cy="16.0" r="2.4" fill="#c8324a"/><circle cx="96.0" cy="9.6" r="2.4" fill="#c8324a"/><circle cx="104.0" cy="3.2" r="2.4" fill="#c8324a"/><circle cx="35.2" cy="73.6" r="2.4" fill="#c8324a"/><circle cx="60.8" cy="41.6" r="2.4" fill="#c8324a"/></svg>

**Stark positiv korrelation.** Ex. fotlängd/skostorlek.
:::

Utfallsrummet för summan av två tärningar — grunden för att systematiskt
räkna gynnsamma och möjliga utfall vid uppgifter med två föremål:

::: figur
<svg viewBox="6 8 296 212" width="296" height="212" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Utfallsrummet för summan av två tärningar: en tabell med tärning 1 längs underkanten och tärning 2 längs vänsterkanten, där varje ruta visar summan. Rutorna med summa 10, 11 och 12 i övre högra hörnet är skuggade."><rect x="109" y="28" width="26" height="26" fill="#cfe3f2"/><rect x="135" y="54" width="26" height="26" fill="#cfe3f2"/><rect x="135" y="28" width="26" height="26" fill="#cfe3f2"/><rect x="161" y="80" width="26" height="26" fill="#cfe3f2"/><rect x="161" y="54" width="26" height="26" fill="#cfe3f2"/><rect x="161" y="28" width="26" height="26" fill="#cfe3f2"/><text x="44" y="180" font-size="14" text-anchor="middle" fill="#1f2530">2</text><text x="44" y="154" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="44" y="128" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="44" y="102" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="44" y="76" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="44" y="50" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="70" y="180" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="70" y="154" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="70" y="128" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="70" y="102" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="70" y="76" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="70" y="50" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="96" y="180" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="96" y="154" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="96" y="128" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="96" y="102" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="96" y="76" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="96" y="50" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="122" y="180" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="122" y="154" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="122" y="128" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="122" y="102" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="122" y="76" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="122" y="50" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="148" y="180" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="148" y="154" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="148" y="128" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="148" y="102" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="148" y="76" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="148" y="50" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="174" y="180" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="174" y="154" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="174" y="128" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="174" y="102" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="174" y="76" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="174" y="50" font-size="14" text-anchor="middle" fill="#1f2530">12</text><text x="20" y="180" font-size="13" text-anchor="middle" fill="#1f2530">1</text><line x1="25" y1="171" x2="31" y2="171" stroke="#1f2530" stroke-width="1"/><text x="20" y="154" font-size="13" text-anchor="middle" fill="#1f2530">2</text><line x1="25" y1="145" x2="31" y2="145" stroke="#1f2530" stroke-width="1"/><text x="20" y="128" font-size="13" text-anchor="middle" fill="#1f2530">3</text><line x1="25" y1="119" x2="31" y2="119" stroke="#1f2530" stroke-width="1"/><text x="20" y="102" font-size="13" text-anchor="middle" fill="#1f2530">4</text><line x1="25" y1="93" x2="31" y2="93" stroke="#1f2530" stroke-width="1"/><text x="20" y="76" font-size="13" text-anchor="middle" fill="#1f2530">5</text><line x1="25" y1="67" x2="31" y2="67" stroke="#1f2530" stroke-width="1"/><text x="20" y="50" font-size="13" text-anchor="middle" fill="#1f2530">6</text><line x1="25" y1="41" x2="31" y2="41" stroke="#1f2530" stroke-width="1"/><text x="44" y="208" font-size="13" text-anchor="middle" fill="#1f2530">1</text><text x="70" y="208" font-size="13" text-anchor="middle" fill="#1f2530">2</text><text x="96" y="208" font-size="13" text-anchor="middle" fill="#1f2530">3</text><text x="122" y="208" font-size="13" text-anchor="middle" fill="#1f2530">4</text><text x="148" y="208" font-size="13" text-anchor="middle" fill="#1f2530">5</text><text x="174" y="208" font-size="13" text-anchor="middle" fill="#1f2530">6</text><text x="25" y="22" font-size="14" text-anchor="start" fill="#1f2530">tärning 2</text><text x="296" y="180" font-size="14" text-anchor="end" fill="#1f2530">tärning 1</text></svg>
:::

Ett träddiagram med sannolikheterna vid varje gren — sannolikheten för en
kombination fås genom att multiplicera sannolikheterna längs grenen:

::: figur
<svg viewBox="14 24 392 142" width="392" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Träddiagram med två nivåer. Första dragningen: svart med sannolikhet 7 tiondelar eller vit med 3 tiondelar. Andra dragningen har samma sannolikheter eftersom strumpan läggs tillbaka."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">svart</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">vit</text></svg>
:::

## Inför provet

- Kan du skilja mellan totalundersökning och stickprovsundersökning, och
  namnge de tre urvalsmetoderna?
- Vet du skillnaden mellan urvalsfel och mätfel, och kan du känna igen en
  ledande fråga eller ofullständiga svarsalternativ?
- Kan du räkna ut hur ett svarsbortfall påverkar resultatets övre och
  undre gräns?
- Kan du formeln för felmarginal och räkna ut ett konfidensintervall
  utifrån ett stickprovsresultat?
- Vet du när en förändring räknas som statistiskt säkerställd
  (signifikant)?
- Kan du avgöra typ av korrelation (stark/svag, positiv/negativ) utifrån
  ett spridningsdiagram?
- Kan du förklara skillnaden mellan korrelation och kausalitet, och vad
  ett skensamband är?
- Kan du den klassiska sannolikhetsdefinitionen och vet du när den inte
  gäller?
- Kan du räkna ut en experimentell sannolikhet med hjälp av relativ
  frekvens?
- Kan du produktregeln, och kan du avgöra om två händelser är oberoende
  eller beroende av varandra?
- Kan du rita och använda ett träddiagram för att beräkna sannolikheten
  för en kombination av händelser?
- Kan du använda komplementhändelse för att förenkla en "minst
  en"-uppgift?
