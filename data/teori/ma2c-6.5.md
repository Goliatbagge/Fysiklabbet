---
id: ma2c-6.5
title: Normalfördelning
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.5'
---

# Normalfördelning

Mycket statistiskt material fördelas jämnt kring medelvärdet. En sådan
fördelning kallas **normalfördelning**. I ett normalfördelat material
fördelas värdena med samma procentsatser inom vissa givna intervall som
bygger på medelvärdet $\mu$ och standardavvikelsen $\sigma$, enligt
nedanstående normalfördelningskurva:

::: figur
<svg viewBox="4 22 286 134" width="286" height="134" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva med markerade intervall: 34,1 procent mellan medelvärdet och en standardavvikelse åt vardera håll, 13,6 procent mellan en och två standardavvikelser och 2,3 procent utanför två standardavvikelser."><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 30,127.7 L 40,125.6 L 50,122 L 60,116.5 L 70,108.4 L 80,97.5 L 90,84.2 L 100,69.4 L 110,54.5 L 120,41.8 L 130,33.1 L 140,30 L 150,33.1 L 160,41.8 L 170,54.5 L 180,69.4 L 190,84.2 L 200,97.5 L 210,108.4 L 220,116.5 L 230,122 L 240,125.6 L 250,127.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="60" y1="116.5" x2="60" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="100" y1="69.4" x2="100" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="180" y1="69.4" x2="180" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="220" y1="116.5" x2="220" y2="130" stroke="#1f2530" stroke-width="1"/><text x="120" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><text x="160" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><text x="80" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><text x="200" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><text x="34" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><text x="246" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − 2<tspan font-style="italic">σ</tspan></text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − <tspan font-style="italic">σ</tspan></text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + <tspan font-style="italic">σ</tspan></text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + 2<tspan font-style="italic">σ</tspan></text></svg>
:::

där $\mu$ = medelvärde och $\sigma$ = standardavvikelse.

Om man ska bestämma andelar som inte ligger vid jämna
standardavvikelser får man ta hjälp av digitala verktyg, t.ex.
Geogebra.

För att beräkna procentsatser vid normalfördelningar i Geogebra klickar
vi på knappen "Växla till sannolikhetskalkylator", fyller i medelvärde
($\mu$) och standardavvikelse ($\sigma$), klickar på den knapp som
motsvarar det intervall vi är intresserade av och fyller i värdena.

| Intervalltyp | Exempelformulering |
| --- | --- |
| Öppet åt vänster | "Hur många procent är mindre än $x$?" |
| Intervall | "Hur många procent ligger mellan $x$ och $y$?" |
| Intervallkomplement | "Hur många procent är mindre än $x$, men större än $y$?" |
| Öppet åt höger | "Hur många procent är större än $x$?" |

Hur hög normalfördelningskurvan blir beror på spridningen. Vid liten
spridning ligger värdena samlade och kurvan blir högre och smalare. Vid
stor spridning ligger värdena mer utspridda och kurvan blir lägre och
bredare.

::: figur
<svg viewBox="8 22 280 136" width="280" height="136" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre normalfördelningskurvor med samma medelvärde: en hög och smal grön kurva med liten spridning, en blå mellankurva och en låg och bred röd kurva med stor spridning."><line x1="14" y1="140" x2="272" y2="140" stroke="#1f2530" stroke-width="1.4"/><polygon points="280,140 271,136 271,144" fill="#1f2530"/><path d="M 70,138.8 L 82.5,135.2 L 95,125.1 L 107.5,104.3 L 120,73.3 L 132.5,42.9 L 145,30 L 157.5,42.9 L 170,73.3 L 182.5,104.3 L 195,125.1 L 207.5,135.2 L 220,138.8" fill="none" stroke="#4a7d3a" stroke-width="1.8"/><path d="M 20,139.4 L 45,137.6 L 70,132.6 L 95,122.1 L 120,106.6 L 132.5,98 L 145,85 L 157.5,98 L 170,106.6 L 195,122.1 L 220,132.6 L 245,137.6 L 270,139.4" fill="none" stroke="#2563c9" stroke-width="1.8"/><path d="M 20,136.5 L 32.5,135 L 70,128.1 L 107.5,117.7 L 126,110 L 145,103.3 L 164,110 L 182.5,117.7 L 220,128.1 L 257.5,135 L 270,136.5" fill="none" stroke="#c8324a" stroke-width="1.8"/><line x1="145" y1="137" x2="145" y2="143" stroke="#1f2530" stroke-width="1.2"/><text x="145" y="156" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="168" y="38" font-size="10" text-anchor="start" fill="#4a7d3a">liten spridning</text><text x="196" y="82" font-size="10" text-anchor="start" fill="#2563c9">mellanstor</text><text x="228" y="112" font-size="10" text-anchor="start" fill="#c8324a">stor spridning</text></svg>
:::

::: exempel "Exempel 1 — Längden hos vuxna män"
**Anta att längden hos vuxna män är normalfördelad med medellängden
181 cm och standardavvikelsen 8 cm.**

Vi ritar en normalfördelningskurva och fyller i värdena. Rakt
under toppen skriver vi in medelvärdet 181. I nästa steg åt höger
skriver vi in "medelvärdet + en standardavvikelse", alltså
$181 + 8 = 189$. Ytterligare ett steg åt höger skriver vi in
"medelvärdet + två standardavvikelser", alltså $181 + 8 + 8 = 197$.

Ett steg åt vänster från medelvärdet skriver vi in "medelvärdet − en
standardavvikelse" = $181 - 8 = 173$. Och till sist, vid ytterligare
ett steg åt vänster skriver vi in "medelvärdet − två
standardavvikelser" = $181 - 8 - 8 = 165$. Vi markerar området mellan
173 cm och 189 cm och jämför med normalfördelningskurvan:

::: figur
<svg viewBox="6 22 280 134" width="280" height="134" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva för mäns längder med markerat område mellan 173 och 189 centimeter, som täcker 68,2 procent."><path d="M 100,130 L 100,69.4 L 110,54.5 L 120,41.8 L 130,33.1 L 140,30 L 150,33.1 L 160,41.8 L 170,54.5 L 180,69.4 L 180,130 Z" fill="#8fb8d8" opacity="0.6"/><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 30,127.7 L 40,125.6 L 50,122 L 60,116.5 L 70,108.4 L 80,97.5 L 90,84.2 L 100,69.4 L 110,54.5 L 120,41.8 L 130,33.1 L 140,30 L 150,33.1 L 160,41.8 L 170,54.5 L 180,69.4 L 190,84.2 L 200,97.5 L 210,108.4 L 220,116.5 L 230,122 L 240,125.6 L 250,127.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530">165</text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530">173</text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530">181</text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530">189</text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530">197</text><text x="284" y="146" font-size="10" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

**Hur stor andel är<br>a) mellan 173 cm och 189 cm?&emsp;&emsp;b) längre än 197 cm?**

**a)** Vi ser då att mellan 173 cm och 181 cm ligger 34,1 %. Mellan 181 cm
och 189 cm ligger också 34,1 %. Mellan 173 cm och 189 cm ligger alltså

$$
34{,}1\ \% + 34{,}1\ \% = 68{,}2\ \%
$$

**Svar:** 68,2 %

**b)** Vi markerar området över 197 cm och jämför med
normalfördelningskurvan. 197 cm motsvarar "medelvärdet + två
standardavvikelser" och över detta ligger 2,3 %.

**Svar:** 2,3 %
:::

::: exempel "Exempel 2 — Längden hos vuxna kvinnor (Geogebra)"
**Vuxna kvinnor har medellängden 165,5 cm med standardavvikelsen
6,15 cm. Hur<br>a) stor andel av kvinnorna är mellan 160 och 170 cm?&emsp;&emsp;b) lång ska en kvinna vara för att vara längre än 99 % av alla kvinnor?**

**a)** Vi löser uppgiften med Geogebra.

1. Klicka på knappen "Växla till sannolikhetskalkylator" i menyraden
   överst.
2. Vi skriver in medelvärdet 165,5 vid $\mu$ och standardavvikelsen
   6,15 vid $\sigma$. OBS! Tänk på att decimaltal skrivs med punkt i
   stället för komma: 165,5 → 165.5.
3. Vi har nu ett "slutet intervall" mellan 160 till 170 cm som vi
   skriver in i fälten: $P(160 \leq X \leq 170) = 0{,}582\ldots$

Vi ser att andelen är ca 0,58 = 58 %, samtidigt som området markeras i
normalfördelningskurvan.

Lämplig redovisning: "$\mu = 165{,}5$ och $\sigma = 6{,}15$ i GG
[Geogebra] med intervallet $160 \leq x \leq 170$ ger 58 %."

**Svar:** 58 %

**b)** Vi skriver in medelvärde och standardavvikelse precis som i
a-uppgiften. Vi vill ta reda på vilken längd 99 % är MINDRE ÄN. Då har
vi ett så kallat "halvöppet intervall" som ska vara mindre än ett visst
värde — vi klickar på knappen "öppet åt vänster".

Vilket värdet är vet vi inte, men vi vill att andelen ska vara
99 % = 0,99. Vi skriver in 0,99 i fältet för andel:
$P(X \leq 179{,}807\ldots) = 0{,}99$.

Vi ser att längden där detta gäller är ca 180 cm.

Lämplig redovisning: "$\mu = 165{,}5$ och $\sigma = 6{,}15$ i GG med
andelen 0,99 som undre gräns ger 180 cm."

**Svar:** 180 cm
:::
