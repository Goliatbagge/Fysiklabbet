---
id: maspec-4.1
title: Grundläggande vektoroperationer
course: Matematik specialisering
chapter: Vektorer
chapterNumber: 4
section: '4.1'
---

# Grundläggande vektoroperationer

Resultatet av en mätning skrivs som ett mätetal följt av en enhet, till
exempel sträckan $s = 2{,}0\ \mathrm{m}$. För många storheter är det hela
beskrivningen: en massa på $3{,}5\ \mathrm{kg}$ eller en
temperatur på $21\ ^\circ\mathrm{C}$ har ingen riktning. Sådana storheter
kallas **skalära**.

Andra storheter är inte fullständigt beskrivna förrän man också anger
en riktning. En kraft på $10\ \mathrm{N}$ kan dra åt höger eller åt
vänster, och en förflyttning på $500\ \mathrm{m}$ kan gå norrut eller
söderut. Storheter som har både storlek och riktning kallas
**vektoriella**, och de beskrivs med **vektorer**. En vektor ritas som
en pil: pilens längd anger storleken och pilens riktning anger
riktningen.

::: formel "Skalär och vektor"
- En **skalär** storhet beskrivs helt av ett mätetal och en enhet.
  Exempel: massa, tid, energi, temperatur och sträcka.
- En **vektoriell** storhet har dessutom en riktning. Exempel: kraft,
  hastighet, acceleration, förflyttning och rörelsemängd.
- En vektor ritas som en pil och betecknas med en pil ovanför
  bokstaven, till exempel $\vec{u}$. Pilens längd är vektorns storlek
  och pilens riktning är vektorns riktning.
:::

Att vektorer har riktning gör att de inte kan adderas som vanliga tal.
Två krafter på $3\ \mathrm{N}$ och $8\ \mathrm{N}$ ger tillsammans
$11\ \mathrm{N}$ bara om de drar åt samma håll. Drar de åt motsatt håll
tar de delvis ut varandra. Det första exemplet visar hur summan ser ut
i det fallet.

::: exempel "Exempel 1 — Två vektorer längs samma linje"
**Vektorerna $\vec{u}$ och $\vec{v}$ är riktade åt rakt motsatta håll.
Vektorn $\vec{u}$ har längden 3 och vektorn $\vec{v}$ har längden 8.
Bestäm summan $\vec{u} + \vec{v}$.**

::: figur
<svg viewBox="-4 -12 272 112" width="369" height="151" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två vektorer i ett rutnät. Vektorn u är tre rutor lång och pekar åt vänster. Vektorn v är åtta rutor lång och pekar åt höger."><line x1="0" y1="0" x2="0" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96.0" y1="24.0" x2="34.0" y2="24.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,24.0) rotate(180.0)" fill="#c8324a"/><text x="56.5" y="8.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="55.5" y1="-4.599999999999998" x2="64.5" y2="-4.599999999999998" stroke="#c8324a" stroke-width="1"/><polygon points="67.5,-4.599999999999998 63.5,-6.599999999999998 63.5,-2.599999999999998" fill="#c8324a"/><line x1="24.0" y1="72.0" x2="206.0" y2="72.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,72.0) rotate(0.0)" fill="#c8324a"/><text x="116.5" y="56.4" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="115.5" y1="43.400000000000006" x2="124.5" y2="43.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="127.5,43.400000000000006 123.5,41.400000000000006 123.5,45.400000000000006" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorsammalinje
:::

::: textlosning
Vektorer adderas genom att de läggs efter varandra: den andra vektorn
får börja där den första slutar. Vi ritar först $\vec{v}$ och låter
sedan $\vec{u}$ börja i spetsen på $\vec{v}$.

::: figur
<svg viewBox="-4 -12 272 136" width="369" height="184" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Vektorn v ritad först, åtta rutor åt höger. Vektorn u börjar där v slutar och går tre rutor åt vänster. Summan u plus v går från startpunkten till slutpunkten och är fem rutor lång, riktad åt höger."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="24.0" x2="206.0" y2="24.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,24.0) rotate(0.0)" fill="#c8324a"/><text x="116.5" y="8.4" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="115.5" y1="-4.6000000000000085" x2="124.5" y2="-4.6000000000000085" stroke="#c8324a" stroke-width="1"/><polygon points="127.5,-4.6000000000000085 123.5,-6.6000000000000085 123.5,-2.6000000000000085" fill="#c8324a"/><line x1="216.0" y1="48.0" x2="154.0" y2="48.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,48.0) rotate(180.0)" fill="#c8324a"/><text x="176.5" y="64.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="175.5" y1="51.80000000000001" x2="184.5" y2="51.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="187.5,51.80000000000001 183.5,49.80000000000001 183.5,53.80000000000001" fill="#c8324a"/><line x1="216.0" y1="24.0" x2="216.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="96.0" x2="134.0" y2="96.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,96.0) rotate(0.0)" fill="#2563c9"/><text x="69.0" y="80.4" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="68.0" y1="67.4" x2="77.0" y2="67.4" stroke="#2563c9" stroke-width="1"/><polygon points="80.0,67.4 76.0,65.4 76.0,69.4" fill="#2563c9"/><text x="77.0" y="80.4" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="92.0" y="80.4" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="91.0" y1="67.4" x2="100.0" y2="67.4" stroke="#2563c9" stroke-width="1"/><polygon points="103.0,67.4 99.0,65.4 99.0,69.4" fill="#2563c9"/></svg>
:::

Summan $\vec{u} + \vec{v}$ är vektorn från den första startpunkten till
den sista spetsen. Eftersom $\vec{u}$ går tillbaka tre rutor av de åtta
som $\vec{v}$ gick fram, blir summan $8 - 3 = 5$ rutor lång, riktad åt
samma håll som den längre vektorn $\vec{v}$.

**Svar:** $\vec{u} + \vec{v}$ har längden 5 och samma riktning som
$\vec{v}$.
:::
:::

Med vanlig addition hade vi fått $3 + 8 = 11$, men vektorsumman har
längden 5. Riktningen måste alltså alltid räknas med. I exempel 1 låg
vektorerna längs samma linje, och då räcker det att addera och
subtrahera längder. Ligger vektorerna snett mot varandra behövs
geometri: är de **vinkelräta** kan summans längd beräknas med
Pythagoras sats, och för andra vinklar tar man till sinussatsen eller
cosinussatsen.

::: exempel "Exempel 2 — Två vinkelräta krafter"
**På en kropp verkar två krafter som är vinkelräta mot varandra.
Kraften $\vec{F}_1$ har storleken $6{,}0\ \mathrm{N}$ och kraften
$\vec{F}_2$ har storleken $8{,}0\ \mathrm{N}$. Bestäm storleken av
vektorsumman $\vec{F} = \vec{F}_1 + \vec{F}_2$.**

::: figur
<svg viewBox="-8 -4 156 128" width="211" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två krafter som utgår från samma punkt: F1 pekar rakt uppåt och F2 rakt åt höger. Resultanten F ritas streckad som diagonalen i rektangeln som krafterna spänner upp."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="144" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="144" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="144" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="144" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="144" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="24.0" y2="34.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,24.0) rotate(-90.0)" fill="#c8324a"/><text x="-1.7" y="48.0" font-size="14" fill="#c8324a"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">1</tspan></text><line x1="-2.7" y1="35.0" x2="8.8" y2="35.0" stroke="#c8324a" stroke-width="1"/><polygon points="11.8,35.0 7.8,33.0 7.8,37.0" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="110.0" y2="96.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,96.0) rotate(0.0)" fill="#c8324a"/><text x="64.5" y="110.4" font-size="14" fill="#c8324a"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">2</tspan></text><line x1="63.5" y1="97.39999999999999" x2="75.1" y2="97.39999999999999" stroke="#c8324a" stroke-width="1"/><polygon points="78.1,97.39999999999999 74.1,95.39999999999999 74.1,99.39999999999999" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="112.0" y2="30.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt" stroke-dasharray="6 4"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,24.0) rotate(-36.9)" fill="#2563c9"/><text x="81.6" y="36.0" font-size="14" fill="#2563c9"><tspan font-style="italic">F</tspan></text><line x1="80.6" y1="23.0" x2="92.2" y2="23.0" stroke="#2563c9" stroke-width="1"/><polygon points="95.2,23.0 91.2,21.0 91.2,25.0" fill="#2563c9"/><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>

Vektorsumman $\vec{F}$ kallas **resultant**. Den ritas streckad
eftersom den ersätter de två krafterna: antingen verkar $\vec{F}_1$ och
$\vec{F}_2$ på kroppen, eller så verkar $\vec{F}$ ensam. Verkan på
kroppen blir densamma.
:::

::: handskrift
typ: vinkelratakrafter
:::

::: textlosning
Krafterna är vinkelräta, så $\vec{F}_1$, $\vec{F}_2$ och resultanten
$\vec{F}$ bildar en rätvinklig triangel där $\vec{F}$ är hypotenusan.
Pythagoras sats ger

$$
|\vec{F}|^2 = 6{,}0^2 + 8{,}0^2 = 36 + 64 = 100
$$

$$
|\vec{F}| = \sqrt{100} = 10
$$

Resultanten har alltså storleken $10\ \mathrm{N}$. Lägg märke till att
det är mindre än $6{,}0 + 8{,}0 = 14$: krafterna drar åt olika håll,
så de förstärker inte varandra fullt ut.

**Svar:** $10\ \mathrm{N}$
:::
:::

## Vektorer som riktade sträckor

En vektor är en **riktad sträcka**: en sträcka med en startpunkt och en
slutpunkt, där pilspetsen markerar slutpunkten. Två riktade sträckor
räknas som **samma vektor** om de är lika långa och har samma riktning.
Var på papperet de ritas spelar ingen roll. En vektor får alltså
parallellförflyttas hur som helst utan att den ändras.

Det kan jämföras med bråk. Talen $\dfrac{2}{3}$ och $\dfrac{4}{6}$ ser
olika ut men är samma tal, och i en räkning väljer man den skrivning som
passar bäst för stunden. På samma sätt är alla pilar i figuren nedan
samma vektor $\vec{u}$, och när vi räknar med $\vec{u}$ får vi använda
vilken av dem vi vill. Man säger att pilarna tillhör samma
**ekvivalensklass**.

::: figur
<svg viewBox="-4 -4 296 152" width="402" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fem pilar i ett rutnät, alla lika långa och riktade åt samma håll, snett uppåt höger. Var och en är märkt u."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="288" y1="0" x2="288" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="288" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="288" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="288" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="288" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="288" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="288" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="288" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="120.0" x2="64.0" y2="90.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,84.0) rotate(-36.9)" fill="#c8324a"/><text x="57.7" y="118.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="56.7" y1="105.80000000000001" x2="65.7" y2="105.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="68.7,105.80000000000001 64.7,103.80000000000001 64.7,107.80000000000001" fill="#c8324a"/><line x1="96.0" y1="96.0" x2="136.0" y2="66.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,60.0) rotate(-36.9)" fill="#c8324a"/><text x="129.7" y="94.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="128.7" y1="81.80000000000001" x2="137.7" y2="81.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="140.7,81.80000000000001 136.7,79.80000000000001 136.7,83.80000000000001" fill="#c8324a"/><line x1="168.0" y1="120.0" x2="208.0" y2="90.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,84.0) rotate(-36.9)" fill="#c8324a"/><text x="201.7" y="118.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="200.7" y1="105.80000000000001" x2="209.7" y2="105.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="212.7,105.80000000000001 208.7,103.80000000000001 208.7,107.80000000000001" fill="#c8324a"/><line x1="48.0" y1="48.0" x2="88.0" y2="18.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,12.0) rotate(-36.9)" fill="#c8324a"/><text x="81.7" y="46.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="80.7" y1="33.800000000000004" x2="89.7" y2="33.800000000000004" stroke="#c8324a" stroke-width="1"/><polygon points="92.7,33.800000000000004 88.7,31.800000000000004 88.7,35.800000000000004" fill="#c8324a"/><line x1="192.0" y1="60.0" x2="232.0" y2="30.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-36.9)" fill="#c8324a"/><text x="225.7" y="58.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="224.7" y1="45.800000000000004" x2="233.7" y2="45.800000000000004" stroke="#c8324a" stroke-width="1"/><polygon points="236.7,45.800000000000004 232.7,43.800000000000004 232.7,47.800000000000004" fill="#c8324a"/></svg>

Fem riktade sträckor som alla är samma vektor $\vec{u}$.
:::

Det finns flera sätt att markera att en bokstav betecknar en vektor. I
tryckt text används ofta fetstil, $\mathbf{u}$, och för hand är det
vanligt med ett streck eller en pil ovanför bokstaven. Här används
alltid pilen, $\vec{u}$.

::: formel "Lika vektorer"
Två vektorer är lika, $\vec{u} = \vec{v}$, om de har **samma längd och
samma riktning**. Startpunkten ingår inte i vektorn: en vektor som
parallellförflyttas är fortfarande samma vektor.
:::

## Addition av vektorer

Det finns två grafiska metoder för att addera vektorer, och de ger
alltid samma resultat.

::: formel "Polygonmetoden och parallellogrammetoden"
**Polygonmetoden.** Vektorerna läggs efter varandra, så att nästa vektor
startar där den föregående slutar. Summan är vektorn från den första
vektorns startpunkt till den sista vektorns spets. Metoden fungerar
lika bra för tre eller fler vektorer.

**Parallellogrammetoden.** Vektorerna $\vec{u}$ och $\vec{v}$ ritas från
samma startpunkt och kompletteras till en parallellogram med $\vec{u}$
och $\vec{v}$ som sidor. Summan $\vec{u} + \vec{v}$ är diagonalen från
den gemensamma startpunkten.

För vektorer gäller den **kommutativa lagen**, $\vec{u} + \vec{v} =
\vec{v} + \vec{u}$. Det spelar alltså ingen roll vilken vektor man
börjar med.
:::

::: exempel "Exempel 3 — Addera grafiskt med båda metoderna"
**Figuren visar vektorerna $\vec{u}$ och $\vec{v}$. Konstruera summan
$\vec{u} + \vec{v}$ grafiskt med<br>a) polygonmetoden&emsp;&emsp;b) parallellogrammetoden.**

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två vektorer i ett rutnät. Vektorn u går tre rutor åt höger och två uppåt. Vektorn v går två rutor åt höger och tre nedåt."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="144.0" y1="24.0" x2="186.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(192.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="186.0" y="43.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="185.0" y1="30.199999999999996" x2="194.0" y2="30.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="197.0,30.199999999999996 193.0,28.199999999999996 193.0,32.199999999999996" fill="#c8324a"/></svg>
:::

::: handskrift
typ: polygonparallellogram
:::

::: textlosning
**a)** Vi ritar $\vec{u}$ och parallellförflyttar sedan $\vec{v}$ så
att den startar i spetsen på $\vec{u}$. Summan $\vec{u} + \vec{v}$ går
från startpunkten på $\vec{u}$ till spetsen på $\vec{v}$.

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Polygonmetoden: v har parallellförflyttats så att den börjar i u:s spets. Summan u plus v går från u:s startpunkt till v:s spets."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="96.0" y1="48.0" x2="138.5" y2="111.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,120.0) rotate(56.3)" fill="#c8324a"/><text x="133.2" y="67.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="132.2" y1="54.19999999999999" x2="141.2" y2="54.19999999999999" stroke="#c8324a" stroke-width="1"/><polygon points="144.2,54.19999999999999 140.2,52.19999999999999 140.2,56.19999999999999" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="134.2" y2="118.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,120.0) rotate(11.3)" fill="#2563c9"/><text x="69.0" y="129.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="68.0" y1="116.60000000000002" x2="77.0" y2="116.60000000000002" stroke="#2563c9" stroke-width="1"/><polygon points="80.0,116.60000000000002 76.0,114.60000000000002 76.0,118.60000000000002" fill="#2563c9"/><text x="77.0" y="129.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="92.0" y="129.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="91.0" y1="116.60000000000002" x2="100.0" y2="116.60000000000002" stroke="#2563c9" stroke-width="1"/><polygon points="103.0,116.60000000000002 99.0,114.60000000000002 99.0,118.60000000000002" fill="#2563c9"/><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>
:::

**b)** Vi ritar $\vec{u}$ och $\vec{v}$ från samma punkt och
kompletterar parallellogrammen med två streckade sidor, parallella
med $\vec{v}$ och $\vec{u}$. Summan $\vec{u} + \vec{v}$ är diagonalen
från den gemensamma startpunkten.

::: figur
<svg viewBox="-4 -16 224 164" width="304" height="223" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Parallellogrammetoden: u och v startar i samma punkt, parallellogrammen kompletteras med streckade sidor och summan u plus v är diagonalen från startpunkten."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="48.0" x2="87.7" y2="5.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,0.0) rotate(-33.7)" fill="#c8324a"/><text x="44.5" y="3.6" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="-9.399999999999991" x2="52.5" y2="-9.399999999999991" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,-9.399999999999991 51.5,-11.399999999999991 51.5,-7.3999999999999915" fill="#c8324a"/><line x1="24.0" y1="48.0" x2="66.5" y2="111.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,120.0) rotate(56.3)" fill="#c8324a"/><text x="31.4" y="93.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="30.4" y1="80.6" x2="39.4" y2="80.6" stroke="#c8324a" stroke-width="1"/><polygon points="42.4,80.6 38.4,78.6 38.4,82.6" fill="#c8324a"/><line x1="96.0" y1="0.0" x2="144.0" y2="72.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="72.0" y1="120.0" x2="144.0" y2="72.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="48.0" x2="134.2" y2="70.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(11.3)" fill="#2563c9"/><text x="149.4" y="75.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="148.4" y1="62.599999999999994" x2="157.4" y2="62.599999999999994" stroke="#2563c9" stroke-width="1"/><polygon points="160.4,62.599999999999994 156.4,60.599999999999994 156.4,64.6" fill="#2563c9"/><text x="157.4" y="75.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="172.4" y="75.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="171.4" y1="62.599999999999994" x2="180.4" y2="62.599999999999994" stroke="#2563c9" stroke-width="1"/><polygon points="183.4,62.599999999999994 179.4,60.599999999999994 179.4,64.6" fill="#2563c9"/><circle cx="24.0" cy="48.0" r="3" fill="#1f2530"/></svg>
:::

Båda metoderna ger samma vektor: fem rutor åt höger och en ruta nedåt.

**Svar:** Se figurerna. Summan går fem rutor åt höger och en ruta
nedåt.
:::
:::

## Multiplikation av en vektor med ett tal

När en vektor multipliceras med ett tal ändras bara längden. Vektorn
$3\vec{u}$ är tre gånger så lång som $\vec{u}$ och pekar åt samma
håll. Är talet negativt vänds pilen: $-2\vec{u}$ är dubbelt så lång som
$\vec{u}$ och pekar åt rakt motsatt håll. Det betyder att $\vec{u}$ och
$k\vec{u}$ alltid är parallella, hur talet $k$ än väljs.

::: formel "Vektor gånger tal"
Om $k$ är ett reellt tal och $\vec{u}$ en vektor är $k\vec{u}$ en
vektor som

- är $|k|$ gånger så lång som $\vec{u}$,
- har samma riktning som $\vec{u}$ om $k > 0$ och motsatt riktning om
  $k < 0$.

Två vektorer $\vec{u}$ och $\vec{v}$ är **parallella** precis när det
finns ett tal $k$ så att $\vec{u} = k\vec{v}$.
:::

::: exempel "Exempel 4 — Multiplar av vektorer"
**Figuren visar vektorerna $\vec{u}$ och $\vec{v}$. Konstruera
vektorerna<br>a)&nbsp;$3\vec{u}$&emsp;&emsp;b)&nbsp;$-\vec{v}$&emsp;&emsp;c)&nbsp;$-2\vec{v}$**

::: figur
<svg viewBox="-4 -4 200 128" width="271" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två vektorer i ett rutnät. Vektorn u går två rutor åt höger och en uppåt. Vektorn v går en ruta åt vänster och två uppåt."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="63.1" y2="76.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(-26.6)" fill="#c8324a"/><text x="44.5" y="64.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="51.80000000000001" x2="52.5" y2="51.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,51.80000000000001 51.5,49.80000000000001 51.5,53.80000000000001" fill="#c8324a"/><line x1="144.0" y1="96.0" x2="124.5" y2="56.9" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,48.0) rotate(-116.6)" fill="#c8324a"/><text x="146.4" y="57.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="145.4" y1="44.599999999999994" x2="154.4" y2="44.599999999999994" stroke="#c8324a" stroke-width="1"/><polygon points="157.4,44.599999999999994 153.4,42.599999999999994 153.4,46.599999999999994" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorgangertal
:::

::: textlosning
Vektorn $\vec{u}$ går två rutor åt höger och en ruta uppåt. Vektorn
$\vec{v}$ går en ruta åt vänster och två rutor uppåt.

**a)** $3\vec{u}$ är tre gånger så lång som $\vec{u}$ och har samma
riktning: $3 \cdot 2 = 6$ rutor åt höger och $3 \cdot 1 = 3$ rutor
uppåt.

**b)** $-\vec{v}$ är lika lång som $\vec{v}$ men motriktad: en ruta åt
höger och två rutor nedåt.

**c)** $-2\vec{v}$ är dubbelt så lång som $\vec{v}$ och motriktad: två
rutor åt höger och fyra rutor nedåt. Ett sätt att rita den är att först
sätta av $-\vec{v}$ och sedan gå lika långt en gång till.

::: figur
<svg viewBox="-4 -11 344 207" width="467" height="281" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre konstruerade vektorer: 3u är sex rutor åt höger och tre uppåt. Minus v är en ruta åt höger och två nedåt. Minus 2v är två rutor åt höger och fyra nedåt."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="288" y1="0" x2="288" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="312" y1="0" x2="312" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="336" y1="0" x2="336" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="336" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="336" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="336" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="336" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="336" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="336" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="336" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="336" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="336" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="168.0" x2="159.1" y2="100.5" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,96.0) rotate(-26.6)" fill="#2563c9"/><text x="79.1" y="110.4" font-size="14" fill="#2563c9">3<tspan font-style="italic">u</tspan></text><line x1="85.7" y1="97.39999999999999" x2="94.7" y2="97.39999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="97.7,97.39999999999999 93.7,95.39999999999999 93.7,99.39999999999999" fill="#2563c9"/><line x1="192.0" y1="24.0" x2="211.5" y2="63.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,72.0) rotate(63.4)" fill="#2563c9"/><text x="218.4" y="36.0" font-size="14" fill="#2563c9">−<tspan font-style="italic">v</tspan></text><line x1="225.5" y1="23.0" x2="234.5" y2="23.0" stroke="#2563c9" stroke-width="1"/><polygon points="237.5,23.0 233.5,21.0 233.5,25.0" fill="#2563c9"/><line x1="240.0" y1="24.0" x2="283.5" y2="111.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(288.0,120.0) rotate(63.4)" fill="#2563c9"/><text x="283.2" y="57.6" font-size="14" fill="#2563c9">−2<tspan font-style="italic">v</tspan></text><line x1="297.9" y1="44.60000000000001" x2="306.9" y2="44.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="309.9,44.60000000000001 305.9,42.60000000000001 305.9,46.60000000000001" fill="#2563c9"/><text x="24.0" y="62.4" font-size="14" text-anchor="start" fill="#1f2530">a)</text><text x="172.8" y="4.8" font-size="14" text-anchor="start" fill="#1f2530">b)</text><text x="259.2" y="4.8" font-size="14" text-anchor="start" fill="#1f2530">c)</text></svg>
:::

**Svar:** Se figuren.
:::
:::

## Subtraktion av vektorer

Att subtrahera en vektor betyder att addera den motsatta vektorn. Vi
behöver därför ingen ny räkneregel: subtraktionen bygger på de två
operationer vi redan har, addition och multiplikation med talet $-1$.

::: formel "Subtraktion av vektorer"
$$
\vec{u} - \vec{v} = \vec{u} + (-1)\vec{v} = \vec{u} + (-\vec{v})
$$

Differensen kan konstrueras med polygonmetoden, genom att $-\vec{v}$
läggs i spetsen på $\vec{u}$. Enklast är dock att rita $\vec{u}$ och
$\vec{v}$ från samma punkt: då är $\vec{u} - \vec{v}$ **vektorn från
spetsen på $\vec{v}$ till spetsen på $\vec{u}$**.
:::

::: exempel "Exempel 5 — Subtrahera grafiskt"
**Vektorerna $\vec{u}$ och $\vec{v}$ är samma som i exempel 3.
Konstruera differensen $\vec{u} - \vec{v}$ grafiskt med<br>a) polygonmetoden&emsp;&emsp;b) parallellogrammetoden.**

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två vektorer i ett rutnät. Vektorn u går tre rutor åt höger och två uppåt. Vektorn v går två rutor åt höger och tre nedåt."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="144.0" y1="24.0" x2="186.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(192.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="186.0" y="43.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="185.0" y1="30.199999999999996" x2="194.0" y2="30.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="197.0,30.199999999999996 193.0,28.199999999999996 193.0,32.199999999999996" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorsubtraktion
:::

::: textlosning
**a)** Vi skriver om differensen som en addition,
$\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$. Den motsatta vektorn
$-\vec{v}$ är lika lång som $\vec{v}$ men går åt andra hållet: två rutor
åt vänster och tre rutor uppåt. Vi lägger $-\vec{v}$ med sin start i
spetsen på $\vec{u}$ och drar $\vec{u} - \vec{v}$ från startpunkten på
$\vec{u}$ till spetsen på $-\vec{v}$.

::: figur
<svg viewBox="-4 -4 224 200" width="304" height="271" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Polygonmetoden för u minus v: den motsatta vektorn minus v har lagts med sin start i u:s spets. Differensen u minus v går från u:s startpunkt till spetsen på minus v."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="216" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48.0" y1="144.0" x2="111.7" y2="101.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,96.0) rotate(-33.7)" fill="#c8324a"/><text x="90.1" y="130.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="89.1" y1="117.80000000000001" x2="98.1" y2="117.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="101.1,117.80000000000001 97.1,115.80000000000001 97.1,119.80000000000001" fill="#c8324a"/><line x1="120.0" y1="96.0" x2="77.5" y2="32.3" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,24.0) rotate(-123.7)" fill="#c8324a"/><text x="115.2" y="48.0" font-size="14" fill="#c8324a">−<tspan font-style="italic">v</tspan></text><line x1="122.3" y1="35.0" x2="131.3" y2="35.0" stroke="#c8324a" stroke-width="1"/><polygon points="134.3,35.0 130.3,33.0 130.3,37.0" fill="#c8324a"/><line x1="48.0" y1="144.0" x2="70.0" y2="33.8" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,24.0) rotate(-78.7)" fill="#2563c9"/><text x="16.2" y="67.2" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="15.2" y1="54.19999999999999" x2="24.2" y2="54.19999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="27.2,54.19999999999999 23.2,52.19999999999999 23.2,56.19999999999999" fill="#2563c9"/><text x="24.2" y="67.2" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="39.2" y="67.2" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="38.2" y1="54.19999999999999" x2="47.2" y2="54.19999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="50.2,54.19999999999999 46.2,52.19999999999999 46.2,56.19999999999999" fill="#2563c9"/><circle cx="48.0" cy="144.0" r="3" fill="#1f2530"/></svg>
:::

**b)** Vi ritar $\vec{u}$ och $\vec{v}$ från samma punkt. Differensen
$\vec{u} - \vec{v}$ är vektorn från spetsen på $\vec{v}$ till spetsen på
$\vec{u}$. Hela parallellogrammen behöver inte ritas.

::: figur
<svg viewBox="-4 -4 200 176" width="271" height="239" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="u och v startar i samma punkt. Differensen u minus v är vektorn från v:s spets till u:s spets."><line x1="0" y1="0" x2="0" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="192" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="72.0" x2="87.7" y2="29.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,24.0) rotate(-33.7)" fill="#c8324a"/><text x="44.5" y="27.6" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="14.600000000000009" x2="52.5" y2="14.600000000000009" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,14.600000000000009 51.5,12.600000000000009 51.5,16.60000000000001" fill="#c8324a"/><line x1="24.0" y1="72.0" x2="66.5" y2="135.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,144.0) rotate(56.3)" fill="#c8324a"/><text x="31.4" y="117.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="30.4" y1="104.60000000000001" x2="39.4" y2="104.60000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="42.4,104.60000000000001 38.4,102.60000000000001 38.4,106.60000000000001" fill="#c8324a"/><line x1="72.0" y1="144.0" x2="94.0" y2="33.8" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,24.0) rotate(-78.7)" fill="#2563c9"/><text x="105.0" y="81.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="104.0" y1="68.6" x2="113.0" y2="68.6" stroke="#2563c9" stroke-width="1"/><polygon points="116.0,68.6 112.0,66.6 112.0,70.6" fill="#2563c9"/><text x="113.0" y="81.6" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="128.0" y="81.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="127.0" y1="68.6" x2="136.0" y2="68.6" stroke="#2563c9" stroke-width="1"/><polygon points="139.0,68.6 135.0,66.6 135.0,70.6" fill="#2563c9"/><circle cx="24.0" cy="72.0" r="3" fill="#1f2530"/></svg>
:::

Båda metoderna ger samma vektor: en ruta åt höger och fem rutor uppåt.

**Svar:** Se figurerna. Differensen går en ruta åt höger och fem rutor
uppåt.
:::
:::

::: tips "Två diagonaler i samma parallellogram"
Ritas $\vec{u}$ och $\vec{v}$ från samma punkt spänner de upp en
parallellogram. Dess båda diagonaler är just summan och differensen:
$\vec{u} + \vec{v}$ går från den gemensamma startpunkten och
$\vec{u} - \vec{v}$ går från spetsen på $\vec{v}$ till spetsen på
$\vec{u}$.

::: figur
<svg viewBox="-4 -4 224 200" width="304" height="271" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Parallellogrammen som u och v spänner upp. Den ena diagonalen, från den gemensamma startpunkten, är u plus v. Den andra diagonalen, från v:s spets till u:s spets, är u minus v."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="216" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="168.0" x2="134.2" y2="146.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,144.0) rotate(-11.3)" fill="#c8324a"/><text x="80.5" y="178.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="79.5" y1="165.8" x2="88.5" y2="165.8" stroke="#c8324a" stroke-width="1"/><polygon points="91.5,165.8 87.5,163.8 87.5,167.8" fill="#c8324a"/><line x1="24.0" y1="168.0" x2="45.6" y2="81.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,72.0) rotate(-76.0)" fill="#c8324a"/><text x="19.4" y="120.0" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="18.4" y1="107.0" x2="27.4" y2="107.0" stroke="#c8324a" stroke-width="1"/><polygon points="30.4,107.0 26.4,105.0 26.4,109.0" fill="#c8324a"/><line x1="144.0" y1="144.0" x2="168.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="48.0" y1="72.0" x2="168.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="168.0" x2="160.3" y2="54.4" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,48.0) rotate(-39.8)" fill="#2563c9"/><text x="171.0" y="37.2" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="170.0" y1="24.199999999999996" x2="179.0" y2="24.199999999999996" stroke="#2563c9" stroke-width="1"/><polygon points="182.0,24.199999999999996 178.0,22.199999999999996 178.0,26.199999999999996" fill="#2563c9"/><text x="179.0" y="37.2" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="194.0" y="37.2" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="193.0" y1="24.199999999999996" x2="202.0" y2="24.199999999999996" stroke="#2563c9" stroke-width="1"/><polygon points="205.0,24.199999999999996 201.0,22.199999999999996 201.0,26.199999999999996" fill="#2563c9"/><line x1="48.0" y1="72.0" x2="136.0" y2="138.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,144.0) rotate(36.9)" fill="#2563c9"/><text x="95.4" y="144.0" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="94.4" y1="131.0" x2="103.4" y2="131.0" stroke="#2563c9" stroke-width="1"/><polygon points="106.4,131.0 102.4,129.0 102.4,133.0" fill="#2563c9"/><text x="103.4" y="144.0" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="118.4" y="144.0" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="117.4" y1="131.0" x2="126.4" y2="131.0" stroke="#2563c9" stroke-width="1"/><polygon points="129.4,131.0 125.4,129.0 125.4,133.0" fill="#2563c9"/><circle cx="24.0" cy="168.0" r="3" fill="#1f2530"/></svg>
:::

Figuren visar också två samband som är bra att ha i huvudet. Följer
man $\vec{v}$ och sedan $\vec{u} - \vec{v}$ hamnar man i spetsen på
$\vec{u}$, det vill säga $\vec{v} + (\vec{u} - \vec{v}) = \vec{u}$. Och
vänder man pilen på differensen får man
$\vec{u} - \vec{v} = -(\vec{v} - \vec{u})$: ordningen i en subtraktion
avgör åt vilket håll differensen pekar.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Skalär och vektor"
- **Skalär**: mätetal och enhet räcker. Massa, tid, energi, temperatur.
- **Vektor**: har dessutom **riktning**. Kraft, hastighet, förflyttning.
- Ritas som en pil, betecknas $\vec{u}$. Längden är storleken.
:::

::: sampunkt "Samma vektor"
- $\vec{u} = \vec{v}$ om **samma längd och samma riktning**.
- Startpunkten ingår inte: en vektor får **parallellförflyttas** fritt.
- Alla lika pilar bildar en **ekvivalensklass**, som $\dfrac{2}{3}$ och
  $\dfrac{4}{6}$ för bråk.
:::

::: sampunkt "Addition"
- **Polygonmetoden**: spets mot start. Summan går från första start till
  sista spets.
- **Parallellogrammetoden**: samma startpunkt, summan är diagonalen.
- $\vec{u} + \vec{v} = \vec{v} + \vec{u}$. Vinkelräta vektorer: längden
  med Pythagoras sats.
:::

::: sampunkt "Tal gånger vektor och subtraktion"
- $k\vec{u}$ är $|k|$ gånger så lång. $k < 0$ vänder riktningen.
- $\vec{u}$ och $\vec{v}$ parallella precis när $\vec{u} = k\vec{v}$.
- $\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$: från spetsen på $\vec{v}$
  till spetsen på $\vec{u}$ när de startar i samma punkt.
:::
:::
