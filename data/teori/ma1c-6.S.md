---
id: ma1c-6.S
title: Sammanfattning
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.S'
---

# Sammanfattning — Trigonometri

Det här kapitlet handlade om trigonometri i rätvinkliga trianglar och om
vektorer. Du har lärt dig beräkna sidor och vinklar med tangens, sinus,
cosinus och deras inversa funktioner, samt bestämma sträckor och vinklar
mellan punkter i ett koordinatsystem med Pythagoras sats. Du har också
lärt dig skillnaden mellan vektorer och skalärer, hur en vektors längd
beräknas, och hur vektorer adderas, subtraheras och multipliceras med en
skalär — både grafiskt och i koordinatform.

## Begrepp att kunna

- **hypotenusa**: den längsta sidan i en rätvinklig triangel, sidan mitt
  emot den räta vinkeln.
- **katet**: en av de två kortare sidorna i en rätvinklig triangel.
- **motstående katet**: kateten som ligger mitt emot den aktuella
  vinkeln.
- **närliggande katet**: kateten som (tillsammans med hypotenusan)
  bildar den aktuella vinkeln.
- **tangens, sinus, cosinus (tan, sin, cos)**: trigonometriska
  funktioner som beskriver förhållandet mellan två sidor i en rätvinklig
  triangel för en given vinkel.
- **inversa trigonometriska funktioner (tan⁻¹/arctan, sin⁻¹/arcsin,
  cos⁻¹/arccos)**: används för att bestämma en vinkel när ett
  sidoförhållande är känt.
- **Pythagoras sats**: sambandet mellan kateterna och hypotenusan i en
  rätvinklig triangel; används för sträckor i koordinatsystem och för
  vektorers längd.
- **l.e. och a.e. (längdenheter och areaenheter)**: beteckningar som
  används när en sträcka respektive area saknar angiven enhet.
- **storhet**: en egenskap som kan mätas, t.ex. sträcka, hastighet eller
  temperatur.
- **vektor**: en storhet som anges med både storlek och riktning, t.ex.
  hastighet, kraft och acceleration; betecknas $\vec{u}$.
- **skalär**: en storhet som endast anges med storlek, t.ex. vikt, tid
  och temperatur.
- **vektorns längd (belopp) ($|\vec{u}|$)**: vektorns storlek, beräknas
  med Pythagoras sats eller ur koordinatformen.
- **motsatta vektorer**: vektorer med samma storlek men motsatt
  riktning, t.ex. $\vec{v}_2 = -\vec{v}_1$.
- **parallella vektorer**: vektorer som har samma lutning, oavsett om de
  är olika stora eller motriktade.
- **resultant**: den vektor som fås när två (eller flera) vektorer
  adderas, med polygonmetoden.

## Formler

::: formel "Kapitlets formler"
**Trigonometriska funktioner**

$$
\tan v = \frac{\text{motstående katet}}{\text{närliggande katet}} = \frac{a}{b}
$$

$$
\sin v = \frac{\text{motstående katet}}{\text{hypotenusa}} = \frac{a}{c}
$$

$$
\cos v = \frac{\text{närliggande katet}}{\text{hypotenusa}} = \frac{b}{c}
$$

där *a* är motstående katet, *b* är närliggande katet och *c* är
hypotenusan till vinkeln *v*.

**Inversa trigonometriska funktioner**

$$
v = \tan^{-1}\left(\frac{a}{b}\right)
\qquad
v = \sin^{-1}\left(\frac{a}{c}\right)
\qquad
v = \cos^{-1}\left(\frac{b}{c}\right)
$$

där tan⁻¹ (arctan), sin⁻¹ (arcsin) och cos⁻¹ (arccos) är de inversa
funktionerna till tan, sin respektive cos.

**Pythagoras sats**

$$
a^2 + b^2 = c^2
$$

där *a* och *b* är kateterna och *c* är hypotenusan i en rätvinklig
triangel.

**Triangelns area**

$$
A = \frac{b \cdot h}{2}
$$

där *b* är basen och *h* är höjden mot basen.

**Vektorns längd i koordinatform**

$$
|\vec{u}| = \sqrt{a_x^2 + a_y^2}
$$

där $\vec{u} = (a_x,\ a_y)$.

**Subtraktion av vektorer**

$$
\vec{u} - \vec{v} = \vec{u} + (-\vec{v})
$$

där subtraktionen skrivs om som en addition av den motsatta vektorn
$-\vec{v}$.
:::

## Viktiga samband och metoder

- Välj rätt trigonometrisk funktion utifrån vilka två sidor (eller sida
  och vinkel) som är kända eller efterfrågade: tangens kopplar ihop de
  två kateterna, sinus kopplar motstående katet och hypotenusa, cosinus
  kopplar närliggande katet och hypotenusa.
- Sök en vinkel med den *inversa* funktionen (tan⁻¹, sin⁻¹ eller cos⁻¹)
  — inte med den vanliga funktionen — när sidoförhållandet redan är
  känt.
- Rita alltid en skiss och markera vilken sida som är motstående
  respektive närliggande katet till den aktuella vinkeln innan du väljer
  formel — annars är det lätt att blanda ihop tan, sin och cos.
- Är triangeln inte rätvinklig: rita in höjden mot en av sidorna för att
  bilda en rätvinklig deltriangel, beräkna höjden med sinus och sätt
  sedan in den i triangelns areaformel.
- Sträckan och vinkeln mellan två punkter i ett koordinatsystem bestäms
  genom att bilda en rätvinklig triangel med kateterna längs *x*- och
  *y*-led: sträckan (hypotenusan) fås med Pythagoras sats, vinkeln mot
  *x*-axeln fås med tangens.
- Saknar en sträcka enhet i uppgiften: svara i l.e. (längdenheter);
  motsvarande gäller area i a.e. (areaenheter).
- En vektor kan parallellförflyttas utan att ändras — det är storleken
  och riktningen som avgör om två vektorer är samma vektor, inte var i
  planet de ritas.
- Vid addition av vektorer: parallellförflytta den ena vektorn så att
  den startar vid den andras spets (polygonmetoden); resultanten dras
  sedan från startpunkten till den slutliga spetsen.
- Vid subtraktion $\vec{u} - \vec{v}$: rita den motsatta vektorn
  $-\vec{v}$ (lika lång men motriktad mot $\vec{v}$) och addera den till
  $\vec{u}$ som vanligt.
- Multiplikation av en vektor med en skalär ändrar bara vektorns storlek
  (och, om skalären är negativ, dess riktning) — aldrig dess lutning.
- En sträckas eller en vektors längd är alltid positiv: bortse från den
  negativa lösningen när du löser ut roten i Pythagoras sats.
- I koordinatform motsvarar en vektors koordinater precis kateternas
  längd i den rätvinkliga triangel som bildas — därför fungerar samma
  formel, $|\vec{u}| = \sqrt{a_x^2 + a_y^2}$, oavsett om koordinaterna är
  negativa.

## Figurer värda att minnas

Grundfiguren för all trigonometri i kapitlet: en rätvinklig triangel med
kateterna *a* och *b*, hypotenusan *c* och vinkeln *v*. Det är denna
uppställning tan, sin, cos och Pythagoras sats bygger på:

::: figur
<svg viewBox="36 28 212 128" width="212" height="128" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten a, den vågräta kateten b, hypotenusan c och vinkeln v nere till höger."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

Så här adderas två vektorer med polygonmetoden: den ena vektorn
parallellförflyttas till den andras spets, och resultanten
$\vec{w} = \vec{u} + \vec{v}$ dras från startpunkten till den nya
slutpunkten:

::: figur
<svg viewBox="6 -4 302 92" width="302" height="92" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma kedja där resultanten w lika med u plus v är dragen som en röd pil från startpunkten av u till slutpunkten av v."><line x1="0" y1="0" x2="0" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="0" x2="22" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="0" x2="44" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="0" x2="66" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="0" x2="88" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="0" x2="110" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0" x2="132" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="0" x2="176" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="0" x2="198" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="0" x2="220" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="0" x2="242" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="286" y1="0" x2="286" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="286" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="22" x2="286" y2="22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="44" x2="286" y2="44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="286" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14.0" y1="26.0" x2="180.0" y2="26.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(190.0,26.0) rotate(0.0)" fill="#1f2530"/><text x="100" y="16" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">u</tspan></text><line x1="96.0" y1="2" x2="104.0" y2="2" stroke="#1f2530" stroke-width="1"/><polygon points="107.0,2 103.0,0 103.0,4" fill="#1f2530"/><line x1="190.0" y1="26.0" x2="290.0" y2="26.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(300.0,26.0) rotate(0.0)" fill="#1f2530"/><text x="246" y="16" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><line x1="242.0" y1="2" x2="250.0" y2="2" stroke="#1f2530" stroke-width="1"/><polygon points="253.0,2 249.0,0 249.0,4" fill="#1f2530"/><line x1="14.0" y1="56.0" x2="290.0" y2="56.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(300.0,56.0) rotate(0.0)" fill="#c8324a"/><text x="150" y="80" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">w</tspan> = <tspan font-style="italic">u</tspan> + <tspan font-style="italic">v</tspan></text><line x1="126" y1="66" x2="134" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="137,66 133,64 133,68" fill="#c8324a"/><line x1="152" y1="66" x2="160" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="163,66 159,64 159,68" fill="#c8324a"/><line x1="178" y1="66" x2="186" y2="66" stroke="#c8324a" stroke-width="1"/><polygon points="189,66 185,64 185,68" fill="#c8324a"/></svg>
:::

## Inför provet

- Kan du namnge hypotenusa, motstående katet och närliggande katet till
  en given vinkel i en rätvinklig triangel?
- Kan du ställa upp och beräkna tan, sin och cos för en vinkel utifrån
  sidornas längd?
- Vet du hur du väljer rätt trigonometrisk funktion beroende på vilka
  sidor och vinklar som är kända?
- Kan du använda de inversa funktionerna (tan⁻¹, sin⁻¹, cos⁻¹) för att
  bestämma en okänd vinkel?
- Kan du beräkna arean av en triangel som inte är rätvinklig genom att
  först bestämma höjden med trigonometri?
- Kan du bestämma sträckan och vinkeln mellan två punkter i ett
  koordinatsystem genom att bilda en rätvinklig triangel och använda
  Pythagoras sats respektive tangens?
- Vet du skillnaden mellan en vektor och en skalär, och kan du ge
  exempel på var och en?
- Kan du avgöra om två vektorer är samma, motsatta eller parallella
  utifrån storlek och riktning?
- Kan du beräkna en vektors längd (belopp), både grafiskt med Pythagoras
  sats och ur koordinatformen $|\vec{u}| = \sqrt{a_x^2 + a_y^2}$?
- Kan du addera och subtrahera vektorer grafiskt med polygonmetoden?
- Vet du vad som händer med en vektors storlek och riktning när den
  multipliceras med en positiv respektive negativ skalär?
