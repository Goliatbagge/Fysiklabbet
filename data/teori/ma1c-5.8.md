---
id: ma1c-5.8
title: Komplementhändelse
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.8'
---

# Komplementhändelse

En händelse som kompletterar en annan händelse, så att de tillsammans
utgör alla möjliga utfall kallas **komplementhändelse**.
Komplementhändelse kan alltså ses som "händelsens motsats".
Sannolikheten för en händelse plus sannolikheten för dess
komplementhändelse är lika med 1 eller 100 %.

::: formel "Sannolikhet med komplementhändelse"
$$
P(\text{händelse}) = 1 - P(\text{komplementhändelse})
$$

::: härledning "Härledning — Sannolikhet med komplementhändelse"
Enligt definitionen för komplementhändelse gäller

$$
P(\text{händelse}) + P(\text{komplementhändelse}) = 1
$$

Vi löser ut $P(\text{händelse})$ och får

$$
P(\text{händelse}) = 1 - P(\text{komplementhändelse})
$$

vsv.
:::
:::

Komplementhändelser är användbara i uppgifter där vi ska beräkna
sannolikheten för **minst en** eller **åtminstone en**.

::: exempel "Exempel 1 — Ange komplementhändelsen"
**Vad är komplementhändelsen till att<br>a) det regnar?<br>b) dra ett hjärter ur en kortlek?<br>c) slå minst en femma på en tärning?**

::: handskrift
typ: komplementhandelse
:::

::: textlosning
**a)** "Att det snöar"? Nej, bara för att det inte regnar behöver det
inte snöa. Det kan ju vara uppehåll. "Att det är soligt"? Nej, bara för
att det inte regnar behöver det inte vara soligt. Det kan ju vara mulet
utan att regna.

Att sätta ett "inte" framför händelsen för att få komplementhändelsen
fungerar alltid! Men om det går så försök att undvika "inte" i ditt svar.
I det här fallet är det dock svårt.

**Svar:** Att det inte regnar.

**b)** Komplementhändelsen är "att inte dra ett hjärter", dvs. att dra
ett spader, klöver eller ruter.

**Svar:** Att dra ett spader, klöver eller ruter.

**c)** Komplementhändelsen är "att inte slå minst en femma", dvs. att slå
1, 2, 3 eller 4. Detta kan vi uttrycka som "att slå högst en fyra".

**Svar:** Att slå högst en fyra.
:::
:::

::: exempel "Exempel 2 — Minst en sexa med fem tärningar"
**Vad är sannolikheten att få minst en sexa vid kast med fem vanliga
tärningar?**

::: handskrift
typ: minstensexa
:::

::: textlosning
Att beräkna denna uppgift utan komplementhändelse är jobbigt eftersom det
finns så många kombinationer. Men med komplementhändelse blir det lätt!

Komplementhändelsen till "att få minst en sexa" är "att inte få någon
sexa". Sannolikheten att inte få sexa vid kast med en tärning är
$\frac{5}{6}$, så för fem tärningar gäller

$$
P(\text{ingen sexa}) = \left(\frac{5}{6}\right)^5 = \frac{3\,125}{7\,776} = 0{,}401\ldots
$$

Vi beräknar nu sannolikheten för minst en sexa genom att subtrahera
sannolikheten för komplementhändelsen från 1, så

$$
P(\text{minst en sexa}) = 1 - 0{,}401\ldots = 0{,}598\ldots \approx 0{,}60 = 60\ \%
$$

**Svar:** ca 60 %
:::
:::

::: exempel "Exempel 3 — Minst en dotter"
**Vad är sannolikheten att få minst en dotter om man skaffar fyra barn?
(Vi räknar med att det är samma sannolikhet att få en flicka som en
pojke.)**

::: handskrift
typ: minstendotter
:::

::: textlosning
Komplementhändelsen är "ingen dotter":

$$
P(\text{ingen dotter}) = \left(\frac{1}{2}\right)^4 = \frac{1^4}{2^4} = \frac{1}{16} = 0{,}0625
$$

$$
P(\text{minst en dotter}) = 1 - 0{,}0625 = 0{,}9375 = 93{,}75\ \%
$$

**Svar:** Ca 94 %
:::
:::

::: fördjupning "Fördjupning — Födelsedagsparadoxen"
**Hur många personer måste vara i ett rum för att det ska vara mer än
50 % chans att minst två av dem fyller år på samma dag?**

Stanna upp och gissa innan du läser vidare — på riktigt. Ett år har
365 dagar. Hur många personer tror du krävs?

De flesta gissar högt, och resonemangen låter kloka:

- **"Ungefär 183 — hälften av 365."** Tanken bakom: för att chansen ska
  komma över hälften borde väl mer än hälften av årets dagar behöva vara
  "upptagna"?
- **"Minst 100."** Tanken bakom: chansen att två bestämda personer delar
  födelsedag är ju bara $\frac{1}{365} \approx 0{,}3\ \%$ — då borde det
  väl krävas ett hav av människor innan något händer?

Båda resonemangen gör samma tankefel: de räknar som om frågan gällde en
*bestämd* person eller en *bestämd* dag. Men frågan gäller **vilket par
som helst, vilken dag som helst** — och det ändrar allt.

**Svaret: det räcker med 23 personer.** I en grupp på 23 slumpvis valda
personer är sannolikheten 50,7 % att minst två delar födelsedag — en
helt vanlig skolklass räcker. På en fotbollsplan står för övrigt exakt
23 personer (två lag om elva spelare plus domaren), så statistiskt sett
delar två personer på planen födelsedag i mer än varannan match.
Slutsatsen känns så orimlig att den har fått namnet
**födelsedagsparadoxen** — trots att den inte är någon paradox, utan
helt vanlig sannolikhetslära.

**Därför räcker 23 — räkna baklänges med komplementhändelsen.** Att
räkna direkt på "minst två delar födelsedag" är hopplöst: det kan ske på
oöverskådligt många sätt (exakt två delar, tre delar, två olika par
delar var sin dag …). Men komplementhändelsen är *en enda* händelse:
**ingen delar födelsedag.** Precis som i exemplen ovan räknar vi på den
i stället.

Låt personerna komma in i rummet en i taget:

- Person 1 får fylla år vilken dag som helst: $\frac{365}{365}$.
- Person 2 måste undvika en upptagen dag: $\frac{364}{365}$.
- Person 3 måste undvika två upptagna dagar: $\frac{363}{365}$.

$$
P(\text{ingen av tre delar födelsedag}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \approx 0{,}9918
$$

$$
P(\text{minst två av tre delar födelsedag}) = 1 - 0{,}9918 = 0{,}0082 = 0{,}8\ \%
$$

Varje ny person lägger till en faktor, som dessutom är lite mindre än
den förra — och en produkt av många faktorer strax under 1 sjunker
snabbare än man anar. Med 23 personer är den sista faktorn
$\frac{343}{365}$:

$$
P(\text{ingen delar födelsedag}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \cdot \ldots \cdot \frac{343}{365} \approx 0{,}493
$$

$$
P(\text{minst två delar födelsedag}) = 1 - 0{,}493 = 0{,}507 = 50{,}7\ \%
$$

Ritar vi sannolikheten som funktion av antalet personer syns hur brant
kurvan stiger:

::: figur
<svg viewBox="7 8 300 238" width="300" height="238" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Sannolikheten att minst två personer i gruppen delar födelsedag som funktion av antalet personer: kurvan stiger brant, passerar 50 procent redan vid 23 personer och närmar sig 100 procent runt 60–70 personer."><line x1="69.7" y1="30" x2="69.7" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="105.4" y1="30" x2="105.4" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="141.1" y1="30" x2="141.1" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176.9" y1="30" x2="176.9" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="212.6" y1="30" x2="212.6" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="248.3" y1="30" x2="248.3" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="284" y1="30" x2="284" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34" y1="165.5" x2="286" y2="165.5" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34" y1="121" x2="286" y2="121" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34" y1="76.5" x2="286" y2="76.5" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34" y1="32" x2="286" y2="32" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34" y1="121" x2="286" y2="121" stroke="#4a7d3a" stroke-width="1.6" stroke-dasharray="6 4"/><line x1="26" y1="210" x2="296" y2="210" stroke="#1f2530" stroke-width="1.6"/><polygon points="304,210 294,205.5 294,214.5" fill="#1f2530"/><line x1="34" y1="218" x2="34" y2="20" stroke="#1f2530" stroke-width="1.6"/><polygon points="34,12 29.5,22 38.5,22" fill="#1f2530"/><polyline points="34.0,210.0 37.6,210.0 41.1,209.5 44.7,208.5 48.3,207.1 51.9,205.2 55.4,202.8 59.0,200.0 62.6,196.8 66.1,193.2 69.7,189.2 73.3,184.9 76.9,180.3 80.4,175.4 84.0,170.3 87.6,165.0 91.1,159.5 94.7,153.9 98.3,148.2 101.9,142.5 105.4,136.8 109.0,131.0 112.6,125.3 116.1,119.7 119.7,114.2 123.3,108.8 126.9,103.5 130.4,98.4 134.0,93.5 137.6,88.8 141.1,84.3 144.7,80.0 148.3,75.9 151.9,72.1 155.4,68.4 159.0,65.0 162.6,61.9 166.1,58.9 169.7,56.2 173.3,53.7 176.9,51.4 180.4,49.2 184.0,47.3 187.6,45.5 191.1,43.9 194.7,42.5 198.3,41.2 201.9,40.1 205.4,39.0 209.0,38.1 212.6,37.3 216.1,36.6 219.7,35.9 223.3,35.4 226.9,34.9 230.4,34.4 234.0,34.1 237.6,33.8 241.1,33.5 244.7,33.2 248.3,33.0 251.9,32.9 255.4,32.7 259.0,32.6 262.6,32.5 266.1,32.4 269.7,32.3 273.3,32.3 276.9,32.2 280.4,32.2 284.0,32.1" fill="none" stroke="#2563c9" stroke-width="2.2" stroke-linejoin="round"/><line x1="116.1" y1="210" x2="116.1" y2="119.7" stroke="#c8324a" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="116.1" cy="119.7" r="3.6" fill="#c8324a"/><text x="69.7" y="225" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="141.1" y="225" font-size="11" text-anchor="middle" fill="#1f2530">30</text><text x="212.6" y="225" font-size="11" text-anchor="middle" fill="#1f2530">50</text><text x="284" y="225" font-size="11" text-anchor="middle" fill="#1f2530">70</text><text x="105.4" y="225" font-size="11" text-anchor="middle" fill="#1f2530">20</text><text x="176.9" y="225" font-size="11" text-anchor="middle" fill="#1f2530">40</text><text x="248.3" y="225" font-size="11" text-anchor="middle" fill="#1f2530">60</text><text x="28" y="169.5" font-size="11" text-anchor="end" fill="#1f2530">25</text><text x="28" y="125" font-size="11" text-anchor="end" fill="#1f2530">50</text><text x="28" y="80.5" font-size="11" text-anchor="end" fill="#1f2530">75</text><text x="28" y="36" font-size="11" text-anchor="end" fill="#1f2530">100</text><text x="125.1" y="143.7" font-size="12" text-anchor="start" fill="#c8324a">23 personer → 50,7 %</text><text x="304" y="240" font-size="12" text-anchor="end" fill="#1f2530">antal personer</text><text x="43" y="20" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">P</tspan>(minst två delar) (%)</text></svg>
:::

Redan vid 30 personer är sannolikheten över 70 %, vid 41 över 90 % och
vid 57 hela 99 %. Först vid 366 personer (367 om vi räknar med
skottdagen) är det *garanterat* att två delar födelsedag — men som
kurvan visar är det i praktiken nästan säkert långt tidigare.

**Nyckeln: antalet par växer explosionsartat.** Det som lurar
intuitionen är att vi tänker på *personer*, när vi borde tänka på *par*.
Varje ny person som kliver in i rummet kan nämligen matcha **alla** som
redan är där: person 2 bildar 1 par, person 3 lägger till 2 nya par,
person 4 lägger till 3 nya … och person 23 lägger till hela 22 nya par.

::: figur
<svg viewBox="16 5 297 121" width="297" height="121" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre grupper ritade som punkter med en linje mellan varje par: 3 personer ger 3 par, 5 personer ger 10 par och 8 personer ger 28 par — antalet linjer växer mycket snabbare än antalet punkter."><line x1="52.0" y1="12.0" x2="81.4" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="52.0" y1="12.0" x2="22.6" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="81.4" y1="63.0" x2="22.6" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="52.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="81.4" cy="63.0" r="4" fill="#1f2530"/><circle cx="22.6" cy="63.0" r="4" fill="#1f2530"/><text x="52" y="104" font-size="12" text-anchor="middle" fill="#1f2530">3 personer</text><text x="52" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">3 par</text><line x1="162.0" y1="12.0" x2="194.3" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="182.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="182.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="182.0" y1="73.5" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="182.0" y1="73.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="142.0" y1="73.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="162.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="194.3" cy="35.5" r="4" fill="#1f2530"/><circle cx="182.0" cy="73.5" r="4" fill="#1f2530"/><circle cx="142.0" cy="73.5" r="4" fill="#1f2530"/><circle cx="129.7" cy="35.5" r="4" fill="#1f2530"/><text x="162" y="104" font-size="12" text-anchor="middle" fill="#1f2530">5 personer</text><text x="162" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">10 par</text><line x1="272.0" y1="12.0" x2="296.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="306.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="306.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="248.0" y1="70.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="248.0" y1="70.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="238.0" y1="46.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="272.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="296.0" cy="22.0" r="4" fill="#1f2530"/><circle cx="306.0" cy="46.0" r="4" fill="#1f2530"/><circle cx="296.0" cy="70.0" r="4" fill="#1f2530"/><circle cx="272.0" cy="80.0" r="4" fill="#1f2530"/><circle cx="248.0" cy="70.0" r="4" fill="#1f2530"/><circle cx="238.0" cy="46.0" r="4" fill="#1f2530"/><circle cx="248.0" cy="22.0" r="4" fill="#1f2530"/><text x="272" y="104" font-size="12" text-anchor="middle" fill="#1f2530">8 personer</text><text x="272" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">28 par</text></svg>
:::

I en grupp på $n$ personer finns det totalt $\frac{n \cdot (n-1)}{2}$
möjliga par. Med 23 personer:

$$
\frac{23 \cdot 22}{2} = 253\ \text{par}
$$

**253 chanser** att pricka en gemensam födelsedag — inte 23! Varje par
är som en lott med vinstchansen $\frac{1}{365}$, och med 253 lotter är
det inte längre konstigt att någon av dem vinner.

::: figur
<svg viewBox="13 6 290 240" width="290" height="240" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Antalet möjliga par som funktion av gruppens storlek: kurvan böjer av allt brantare uppåt och når 253 par redan vid 23 personer."><line x1="80" y1="28" x2="80" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="28" x2="120" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="160" y1="28" x2="160" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="28" x2="200" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="28" x2="240" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="280" y1="28" x2="280" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="170" x2="282" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="130" x2="282" y2="130" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="90" x2="282" y2="90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="50" x2="282" y2="50" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="32" y1="210" x2="292" y2="210" stroke="#1f2530" stroke-width="1.6"/><polygon points="300,210 290,205.5 290,214.5" fill="#1f2530"/><line x1="40" y1="218" x2="40" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="40,10 35.5,20 44.5,20" fill="#1f2530"/><polyline points="40.0,210.0 48.0,210.0 56.0,209.6 64.0,208.8 72.0,207.6 80.0,206.0 88.0,204.0 96.0,201.6 104.0,198.8 112.0,195.6 120.0,192.0 128.0,188.0 136.0,183.6 144.0,178.8 152.0,173.6 160.0,168.0 168.0,162.0 176.0,155.6 184.0,148.8 192.0,141.6 200.0,134.0 208.0,126.0 216.0,117.6 224.0,108.8 232.0,99.6 240.0,90.0 248.0,80.0 256.0,69.6 264.0,58.8 272.0,47.6 280.0,36.0" fill="none" stroke="#2563c9" stroke-width="2.2" stroke-linejoin="round"/><line x1="224" y1="210" x2="224" y2="108.8" stroke="#c8324a" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="40" y1="108.8" x2="224" y2="108.8" stroke="#c8324a" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="224" cy="108.8" r="3.6" fill="#c8324a"/><text x="80" y="225" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="120" y="225" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="160" y="225" font-size="11" text-anchor="middle" fill="#1f2530">15</text><text x="200" y="225" font-size="11" text-anchor="middle" fill="#1f2530">20</text><text x="240" y="225" font-size="11" text-anchor="middle" fill="#1f2530">25</text><text x="280" y="225" font-size="11" text-anchor="middle" fill="#1f2530">30</text><text x="34" y="174" font-size="11" text-anchor="end" fill="#1f2530">100</text><text x="34" y="134" font-size="11" text-anchor="end" fill="#1f2530">200</text><text x="34" y="94" font-size="11" text-anchor="end" fill="#1f2530">300</text><text x="34" y="54" font-size="11" text-anchor="end" fill="#1f2530">400</text><text x="216" y="100.8" font-size="12" text-anchor="end" fill="#c8324a">23 personer → 253 par</text><text x="300" y="240" font-size="12" text-anchor="end" fill="#1f2530">antal personer</text><text x="49" y="18" font-size="12" text-anchor="start" fill="#1f2530">antal par</text></svg>
:::

| Antal personer | Möjliga par | Sannolikhet att minst två delar födelsedag |
| --- | --- | --- |
| 5 | 10 | 2,7 % |
| 10 | 45 | 11,7 % |
| 15 | 105 | 25,3 % |
| 20 | 190 | 41,1 % |
| **23** | **253** | **50,7 %** |
| 30 | 435 | 70,6 % |
| 41 | 820 | 90,3 % |
| 50 | 1 225 | 97,0 % |
| 57 | 1 596 | 99,0 % |
| 70 | 2 415 | 99,9 % |

**"Men ingen delar ju *min* födelsedag!"** Just det — och det är precis
här intuitionen går vilse. Frågar vi i stället efter sannolikheten att
någon delar *din* födelsedag räknas bara de 22 par som du själv ingår i,
och med 23 personer i rummet är den sannolikheten futtiga 5,9 %. För att
komma över 50 % för just din födelsedag krävs det faktiskt 253 personer.
Skillnaden mellan "något par" (253 chanser) och "mitt par" (22 chanser)
är hela förklaringen till att paradoxen känns omöjlig.

**Testa själv!** Räkningen bortser från skottdagen och antar att alla
dagar är lika vanliga — i verkligheten är födelsedagar ojämnt fördelade
över året, vilket bara gör sannolikheten ännu lite högre. Så nästa gång
du sitter i ett klassrum eller på en fest med minst 23 personer: fråga
runt. Oddsen är på din sida.
:::
