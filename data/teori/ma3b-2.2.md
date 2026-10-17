---
id: ma3b-2.2
title: Linjär optimering
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.2'
---

# Linjär optimering

En möbelsnickare tillverkar stolar och bord. Varje stol och varje bord ger
en vinst, men verkstaden har bara ett visst antal arbetstimmar i veckan.
Hur många av varje ska tillverkas för att vinsten ska bli så stor som
möjligt? Den sortens fråga löses med **linjär optimering**. Att optimera
betyder att hitta det bästa valet, till exempel störst vinst eller lägst
kostnad, när resurserna är begränsade.

## Begrepp

Ett problem i linjär optimering byggs upp av några delar som alltid
återkommer.

- **Variabler**: de storheter vi själva får välja, till exempel antalet
  stolar $x$ och antalet bord $y$.
- **Bivillkor**: begränsningarna, skrivna som olikheter. Hit hör också
  $x \geq 0$ och $y \geq 0$, eftersom antal inte kan vara negativa.
- **Tillåtet område**: området i koordinatsystemet där alla bivillkoren
  gäller. Varje punkt i området är ett möjligt val.
- **Målfunktion**: den storhet som ska bli så stor eller så liten som
  möjligt, till exempel vinsten $V = 400x + 500y$.

Ordet linjär kommer av att både bivillkoren och målfunktionen är linjära.
Variablerna förekommer bara i första potens, så alla gränser blir räta
linjer när området ritas.

::: formel "Hörnpunktsmetoden"
Är det tillåtna området begränsat antar målfunktionen sitt **största** och
sitt **minsta** värde i någon av områdets **hörnpunkter**.

Beräkna därför målfunktionens värde i varje hörnpunkt och jämför.
:::

::: exempel "Exempel 1 — Största och minsta värde i ett område"
**Figuren visar ett område med hörnpunkterna $(0, 0)$, $(5, 0)$, $(3, 2)$ och $(0, 3)$. Bestäm det största och det minsta värdet av $z = 2x + 3y$ i området.**

::: figur
<svg viewBox="-38 -197 257 223" width="349" height="303" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett skuggat område som begränsas av axlarna och linjerna x plus y lika med 5 och x plus 3y lika med 9. Hörnpunkterna är 0 komma 0, 5 komma 0, 3 komma 2 och 0 komma 3."><line x1="30" y1="21" x2="30" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="21" x2="60" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="90" y1="21" x2="90" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="21" x2="120" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="21" x2="150" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="21" x2="180" y2="-171" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-30" x2="198" y2="-30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-60" x2="198" y2="-60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-90" x2="198" y2="-90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-120" x2="198" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-150" x2="198" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 150,0 90,-60 0,-90" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-21" y1="0" x2="208" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="216,0 206,-4.5 206,4.5" fill="#1f2530"/><line x1="0" y1="21" x2="0" y2="-181" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-189 -4.5,-179 4.5,-179" fill="#1f2530"/><text x="214" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-183" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="30" y1="-3.5" x2="30" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="60" y1="-3.5" x2="60" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="60" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="90" y1="-3.5" x2="90" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="90" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="180" y1="-3.5" x2="180" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="180" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="-3.5" y1="-30" x2="3.5" y2="-30" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-26" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-60" x2="3.5" y2="-60" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-56" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-90" x2="3.5" y2="-90" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-12" y1="-162" x2="162" y2="12" stroke="#2563c9" stroke-width="2"/><text x="46.9" y="-112.9" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(45 46.9 -112.9)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 5</text><line x1="-12" y1="-94" x2="195" y2="-25" stroke="#4a7d3a" stroke-width="2"/><text x="152.2" y="-46.6" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(18.4 152.2 -46.6)"><tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 9</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="150" cy="0" r="3.6" fill="#c8324a"/><text x="156" y="-6" font-size="12.5" text-anchor="start" fill="#c8324a">(5, 0)</text><circle cx="90" cy="-60" r="3.6" fill="#c8324a"/><text x="82" y="-44" font-size="12.5" text-anchor="end" fill="#c8324a">(3, 2)</text><circle cx="0" cy="-90" r="3.6" fill="#c8324a"/><text x="-11" y="-86" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 3)</text></svg>
:::

::: handskrift
typ: opthorn
:::

::: textlosning
Enligt hörnpunktsmetoden räcker det att beräkna $z = 2x + 3y$ i områdets
fyra hörnpunkter.

| Hörnpunkt | $z = 2x + 3y$ |
| --- | --- |
| $(0, 0)$ | $2 \cdot 0 + 3 \cdot 0 = 0$ |
| $(5, 0)$ | $2 \cdot 5 + 3 \cdot 0 = 10$ |
| $(3, 2)$ | $2 \cdot 3 + 3 \cdot 2 = 12$ |
| $(0, 3)$ | $2 \cdot 0 + 3 \cdot 3 = 9$ |

Det största värdet är 12, i punkten $(3, 2)$. Det minsta värdet är 0, i
punkten $(0, 0)$.

**Svar:** Största värdet är 12 och minsta värdet är 0.
:::
:::

## Varför ligger det bästa värdet i ett hörn?

Vi fortsätter med målfunktionen $z = 2x + 3y$ från Exempel 1. Alla punkter
där $z$ har ett bestämt värde, till exempel $z = 6$, ligger på linjen
$2x + 3y = 6$. En sådan linje kallas en **nivålinje**. Nivålinjerna för
olika värden på $z$ är parallella, och ju större $z$ är, desto längre upp åt
höger ligger linjen.

::: figur
<svg viewBox="-24 -188 273 214" width="371" height="290" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Det skuggade området med hörnen 0 komma 0, 5 komma 0, 3 komma 2 och 0 komma 3, och fyra parallella nivålinjer 2x plus 3y lika med z för z lika med 3, 6, 9 och 12. Linjen z lika med 12 nuddar området bara i hörnet 3 komma 2."><line x1="30" y1="21" x2="30" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="21" x2="60" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="90" y1="21" x2="90" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="21" x2="120" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="21" x2="150" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="21" x2="180" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="210" y1="21" x2="210" y2="-162" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-30" x2="228" y2="-30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-60" x2="228" y2="-60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-90" x2="228" y2="-90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-120" x2="228" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-21" y1="-150" x2="228" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 150,0 90,-60 0,-90" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-21" y1="0" x2="238" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="246,0 236,-4.5 236,4.5" fill="#1f2530"/><line x1="0" y1="21" x2="0" y2="-172" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-180 -4.5,-170 4.5,-170" fill="#1f2530"/><text x="244" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-174" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="30" y1="-3.5" x2="30" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="60" y1="-3.5" x2="60" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="60" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="90" y1="-3.5" x2="90" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="90" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="180" y1="-3.5" x2="180" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="180" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="210" y1="-3.5" x2="210" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="210" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="-3.5" y1="-30" x2="3.5" y2="-30" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-26" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-60" x2="3.5" y2="-60" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-56" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-90" x2="3.5" y2="-90" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-86" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-7.5" y1="-35" x2="56.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-17.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -17.2)"><tspan font-style="italic">z</tspan> = 3</text><line x1="-7.5" y1="-65" x2="101.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-47.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -47.2)"><tspan font-style="italic">z</tspan> = 6</text><line x1="-7.5" y1="-95" x2="146.3" y2="7.5" stroke="#b8641c" stroke-width="2" stroke-dasharray="7 5"/><text x="28.3" y="-77.2" font-size="12" text-anchor="middle" fill="#b8641c" transform="rotate(33.7 28.3 -77.2)"><tspan font-style="italic">z</tspan> = 9</text><line x1="-7.5" y1="-125" x2="191.3" y2="7.5" stroke="#c8324a" stroke-width="2.4"/><text x="28.3" y="-107.2" font-size="12" text-anchor="middle" fill="#c8324a" transform="rotate(33.7 28.3 -107.2)"><tspan font-style="italic">z</tspan> = 12</text><circle cx="90" cy="-60" r="3.6" fill="#c8324a"/><text x="99" y="-66" font-size="12.5" text-anchor="start" fill="#c8324a">(3, 2)</text></svg>

Nivålinjerna $2x + 3y = z$ för $z = 3$, $6$, $9$ och $12$. Den sista som
fortfarande nuddar området är $z = 12$, och den nuddar bara hörnet
$(3, 2)$.
:::

Tänk dig att nivålinjen flyttas parallellt uppåt. Så länge den skär
området finns det tillåtna punkter med just det värdet på $z$. Den sista
punkten som linjen lämnar är ett hörn, och där är $z$ som störst. På samma
sätt är det minsta värdet den första punkt som linjen når, och även det är
ett hörn. I grafen nedan kan du själv dra i $z$ och se nivålinjen
$y = \dfrac{z - 2x}{3}$ flytta sig över området.

::: graf
titel: 2x + 3y = z
uttryck: (z - 2*x)/3
ekvation: 2x + 3y = {z}
z: 6, 0, 16, 0.5
område: 0 0; 5 0; 3 2; 0 3
hörn: ja
skärning: nej
x: -0.8, 9
y: -0.8, 6
:::

::: tips "Arbetsgång vid linjär optimering"
1. Inför variabler och skriv vad de står för.
2. Ställ upp bivillkoren som olikheter. Glöm inte $x \geq 0$ och
   $y \geq 0$.
3. Ställ upp målfunktionen.
4. Rita det tillåtna området.
5. Bestäm hörnpunkterna. Beräkna skärningspunkter med ekvationssystem om de
   inte går att läsa av exakt.
6. Beräkna målfunktionens värde i varje hörnpunkt.
7. Svara på frågan i dess sammanhang.
:::

::: exempel "Exempel 2 — Störst vinst"
**En möbelsnickare tillverkar stolar och bord. En stol kräver 2 timmars snickeriarbete och 1 timmes målning. Ett bord kräver 3 timmars snickeriarbete och 1 timmes målning. Varje vecka finns högst 24 timmar för snickeri och högst 10 timmar för målning. Vinsten är 400 kr per stol och 500 kr per bord.<br>a) Ställ upp bivillkoren och målfunktionen.<br>b) Hur många stolar och bord ska snickaren tillverka varje vecka för att vinsten ska bli så stor som möjligt, och hur stor blir vinsten då?**

::: handskrift
typ: optmobler
:::

::: textlosning
**Lösning a)** Vi låter $x$ vara antalet stolar och $y$ antalet bord per vecka.

Snickeriet tar $2x$ timmar för stolarna och $3y$ timmar för borden, och
tillsammans får det vara högst 24 timmar. Målningen tar $x + y$ timmar och
får vara högst 10 timmar.

$$
\begin{cases}
x \geq 0 \\
y \geq 0 \\
2x + 3y \leq 24 \\
x + y \leq 10
\end{cases}
$$

Vinsten är 400 kr för varje stol och 500 kr för varje bord.
Målfunktionen är vinsten i kronor:

$$
V = 400x + 500y
$$

**Svar:** Bivillkoren är $x \geq 0$, $y \geq 0$, $2x + 3y \leq 24$ och
$x + y \leq 10$. Målfunktionen är $V = 400x + 500y$.

**Lösning b)** Linjen $2x + 3y = 24$ går genom $(0, 8)$ och $(12, 0)$. Linjen
$x + y = 10$ går genom $(0, 10)$ och $(10, 0)$. Testpunkten $(0, 0)$
uppfyller båda olikheterna, så det tillåtna området ligger under båda
linjerna, i första kvadranten.

::: figur
<svg viewBox="-38 -262 339 288" width="460" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Det tillåtna området för möbelsnickaren: under linjerna 2x plus 3y lika med 24 och x plus y lika med 10 i första kvadranten, med hörnen 0 komma 0, 10 komma 0, 6 komma 4 och 0 komma 8."><line x1="22" y1="15.4" x2="22" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="15.4" x2="44" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="15.4" x2="66" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="15.4" x2="88" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="15.4" x2="110" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="15.4" x2="132" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="15.4" x2="154" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="15.4" x2="176" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="198" y1="15.4" x2="198" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="220" y1="15.4" x2="220" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="242" y1="15.4" x2="242" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="15.4" x2="264" y2="-235.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-22" x2="279.4" y2="-22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-44" x2="279.4" y2="-44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-66" x2="279.4" y2="-66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-88" x2="279.4" y2="-88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-110" x2="279.4" y2="-110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-132" x2="279.4" y2="-132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-154" x2="279.4" y2="-154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-176" x2="279.4" y2="-176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-198" x2="279.4" y2="-198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-15.4" y1="-220" x2="279.4" y2="-220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 220,0 132,-88 0,-176" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-15.4" y1="0" x2="289.4" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="297.4,0 287.4,-4.5 287.4,4.5" fill="#1f2530"/><line x1="0" y1="15.4" x2="0" y2="-245.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-253.4 -4.5,-243.4 4.5,-243.4" fill="#1f2530"/><text x="295.4" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-247.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="22" y1="-3.5" x2="22" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="44" y1="-3.5" x2="44" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="44" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="66" y1="-3.5" x2="66" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="88" y1="-3.5" x2="88" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="88" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="110" y1="-3.5" x2="110" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="132" y1="-3.5" x2="132" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="132" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="154" y1="-3.5" x2="154" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="176" y1="-3.5" x2="176" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="176" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="198" y1="-3.5" x2="198" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="220" y1="-3.5" x2="220" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="242" y1="-3.5" x2="242" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><line x1="264" y1="-3.5" x2="264" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="264" y="16" font-size="12" text-anchor="middle" fill="#1f2530">12</text><line x1="-3.5" y1="-22" x2="3.5" y2="-22" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-18" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-44" x2="3.5" y2="-44" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-40" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-66" x2="3.5" y2="-66" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-62" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-88" x2="3.5" y2="-88" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-84" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-110" x2="3.5" y2="-110" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-106" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-132" x2="3.5" y2="-132" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-128" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-154" x2="3.5" y2="-154" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-150" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-176" x2="3.5" y2="-176" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-198" x2="3.5" y2="-198" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-194" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-3.5" y1="-220" x2="3.5" y2="-220" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-216" font-size="12" text-anchor="end" fill="#1f2530">10</text><line x1="-8.8" y1="-181.9" x2="268" y2="2.6" stroke="#2563c9" stroke-width="2"/><text x="208.5" y="-45.4" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(33.7 208.5 -45.4)">2<tspan font-style="italic">x</tspan> + 3<tspan font-style="italic">y</tspan> = 24</text><line x1="-8.8" y1="-228.8" x2="222.6" y2="2.6" stroke="#4a7d3a" stroke-width="2"/><text x="66.5" y="-163.3" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 66.5 -163.3)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 10</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="220" cy="0" r="3.6" fill="#c8324a"/><text x="227" y="17" font-size="12.5" text-anchor="middle" fill="#c8324a">(10, 0)</text><circle cx="132" cy="-88" r="3.6" fill="#c8324a"/><text x="124" y="-71" font-size="12.5" text-anchor="end" fill="#c8324a">(6, 4)</text><circle cx="0" cy="-176" r="3.6" fill="#c8324a"/><text x="-7" y="-172" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text></svg>

Det tillåtna området för snickaren, med hörnpunkterna markerade.
:::

Hörnen $(0, 0)$, $(10, 0)$ och $(0, 8)$ ligger på axlarna. Det fjärde
hörnet är skärningspunkten mellan de sneda linjerna.

$$
\begin{cases}
2x + 3y = 24 & (1) \\
x + y = 10 & (2)
\end{cases}
$$

Vi multiplicerar (2) med 2, $2x + 2y = 20$, och subtraherar den från (1)
ledvis.

$$
\begin{aligned}
(2x + 3y) - (2x + 2y) &= 24 - 20 \\
y &= 4
\end{aligned}
$$

Insättning i (2), $x + y = 10$, ger $x + 4 = 10$, alltså $x = 6$. Det
fjärde hörnet är $(6, 4)$.

Vi beräknar vinsten $V = 400x + 500y$ i varje hörn.

| Hörnpunkt | $V = 400x + 500y$ |
| --- | --- |
| $(0, 0)$ | $400 \cdot 0 + 500 \cdot 0 = 0$ |
| $(10, 0)$ | $400 \cdot 10 + 500 \cdot 0 = 4\,000$ |
| $(6, 4)$ | $400 \cdot 6 + 500 \cdot 4 = 4\,400$ |
| $(0, 8)$ | $400 \cdot 0 + 500 \cdot 8 = 4\,000$ |

Störst vinst ger hörnet $(6, 4)$.

**Svar:** 6 stolar och 4 bord ger störst vinst, 4 400 kr per vecka.
:::
:::

## Minsta värde och obegränsade områden

Ibland ska målfunktionen bli så **liten** som möjligt, till exempel en
kostnad. Då står bivillkoren ofta med $\geq$, eftersom något måste
uppnås: minst så många platser, minst så mycket näring. Hörnpunktsmetoden
fungerar på samma sätt. Vi väljer det hörn som ger det minsta värdet.

Ett område som beskrivs av $\geq$-villkor kan fortsätta obegränsat uppåt
och åt höger. Då finns inget största värde av en kostnad, men det minsta
värdet finns fortfarande i ett hörn.

::: exempel "Exempel 3 — Lägsta kostnad"
**En skola ska hyra bussar till en utflykt för 300 personer. En liten buss har 30 platser och kostar 2 000 kr. En stor buss har 50 platser och kostar 4 000 kr. Bussbolaget har bara 8 förare lediga, så skolan kan hyra högst 8 bussar. Hur många bussar av varje sort ska skolan hyra för att kostnaden ska bli så låg som möjligt?**

::: handskrift
typ: optbussar
:::

::: textlosning
Vi låter $x$ vara antalet små bussar och $y$ antalet stora bussar.

Bussarna ska rymma minst 300 personer, och högst 8 bussar kan hyras.

$$
\begin{cases}
x \geq 0 \\
y \geq 0 \\
30x + 50y \geq 300 \\
x + y \leq 8
\end{cases}
$$

Kostnaden ska minimeras, och målfunktionen är $K = 2\,000x + 4\,000y$.

Linjen $30x + 50y = 300$ går genom $(0, 6)$ och $(10, 0)$. Testpunkten
$(0, 0)$ ger $0 \geq 300$, som inte stämmer, så området ligger på den
andra sidan, ovanför linjen. Linjen $x + y = 8$ går genom $(0, 8)$ och
$(8, 0)$, och där ligger området under linjen.

::: figur
<svg viewBox="-38 -240 316 266" width="429" height="361" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Det tillåtna området för bussarna är en triangel ovanför linjen 30x plus 50y lika med 300 och under linjen x plus y lika med 8, med hörnen 0 komma 6, 0 komma 8 och 5 komma 3."><line x1="24" y1="16.8" x2="24" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="16.8" x2="48" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="16.8" x2="72" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="16.8" x2="96" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="16.8" x2="120" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="16.8" x2="144" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="16.8" x2="168" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="16.8" x2="192" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="16.8" x2="216" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="16.8" x2="240" y2="-213.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-24" x2="256.8" y2="-24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-48" x2="256.8" y2="-48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-72" x2="256.8" y2="-72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-96" x2="256.8" y2="-96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-120" x2="256.8" y2="-120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-144" x2="256.8" y2="-144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-168" x2="256.8" y2="-168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-16.8" y1="-192" x2="256.8" y2="-192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,-144 120,-72 0,-192" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-16.8" y1="0" x2="266.8" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="274.8,0 264.8,-4.5 264.8,4.5" fill="#1f2530"/><line x1="0" y1="16.8" x2="0" y2="-223.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-231.6 -4.5,-221.6 4.5,-221.6" fill="#1f2530"/><text x="272.8" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-225.6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24" y1="-3.5" x2="24" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="24" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="48" y1="-3.5" x2="48" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="48" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="72" y1="-3.5" x2="72" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="72" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="96" y1="-3.5" x2="96" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="96" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="120" y1="-3.5" x2="120" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="120" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="144" y1="-3.5" x2="144" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="144" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="192" y1="-3.5" x2="192" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="192" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="216" y1="-3.5" x2="216" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="216" y="16" font-size="12" text-anchor="middle" fill="#1f2530">9</text><line x1="240" y1="-3.5" x2="240" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="240" y="16" font-size="12" text-anchor="middle" fill="#1f2530">10</text><line x1="-3.5" y1="-24" x2="3.5" y2="-24" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-20" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-48" x2="3.5" y2="-48" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-44" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-72" x2="3.5" y2="-72" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-68" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-96" x2="3.5" y2="-96" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-92" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-120" x2="3.5" y2="-120" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-116" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-144" x2="3.5" y2="-144" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-168" x2="3.5" y2="-168" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-164" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-192" x2="3.5" y2="-192" stroke="#1f2530" stroke-width="1.2"/><line x1="-9.6" y1="-149.8" x2="254.4" y2="8.6" stroke="#2563c9" stroke-width="2"/><text x="186" y="-40.6" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(31 186 -40.6)">30<tspan font-style="italic">x</tspan> + 50<tspan font-style="italic">y</tspan> = 300</text><line x1="-9.6" y1="-201.6" x2="201.6" y2="9.6" stroke="#4a7d3a" stroke-width="2"/><text x="67.3" y="-134.5" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(45 67.3 -134.5)"><tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 8</text><circle cx="0" cy="-144" r="3.6" fill="#c8324a"/><text x="-7" y="-140" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 6)</text><circle cx="0" cy="-192" r="3.6" fill="#c8324a"/><text x="-7" y="-188" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 8)</text><circle cx="120" cy="-72" r="3.6" fill="#c8324a"/><text x="112" y="-55" font-size="12.5" text-anchor="end" fill="#c8324a">(5, 3)</text></svg>

Det tillåtna området är triangeln mellan de två linjerna och *y*-axeln.
:::

Hörnen $(0, 6)$ och $(0, 8)$ ligger på *y*-axeln. Det tredje hörnet är
skärningspunkten mellan linjerna.

$$
\begin{cases}
30x + 50y = 300 & (1) \\
x + y = 8 & (2)
\end{cases}
$$

Vi multiplicerar (2) med 30, $30x + 30y = 240$, och subtraherar den från (1)
ledvis.

$$
\begin{aligned}
(30x + 50y) - (30x + 30y) &= 300 - 240 \\
20y &= 60 \\
y &= 3
\end{aligned}
$$

Insättning i (2), $x + y = 8$, ger $x + 3 = 8$, alltså $x = 5$. Det tredje
hörnet är $(5, 3)$.

| Hörnpunkt | $K = 2\,000x + 4\,000y$ |
| --- | --- |
| $(0, 6)$ | $2\,000 \cdot 0 + 4\,000 \cdot 6 = 24\,000$ |
| $(0, 8)$ | $2\,000 \cdot 0 + 4\,000 \cdot 8 = 32\,000$ |
| $(5, 3)$ | $2\,000 \cdot 5 + 4\,000 \cdot 3 = 22\,000$ |

Lägst kostnad ger hörnet $(5, 3)$. Antalet bussar måste vara heltal, och
här är hörnets koordinater heltal, så valet går att genomföra.

**Svar:** 5 små och 3 stora bussar, som kostar 22 000 kr.
:::
:::

## När två hörn ger samma värde

Ibland ger två hörn exakt samma värde. Då är nivålinjen parallell med den
kant som förbinder hörnen, och **alla** punkter på kanten ger samma bästa
värde. Svaret är då inte en enda punkt. Måste svaret vara heltal kan det
finnas flera heltalspunkter på kanten som alla är lika bra.

::: exempel "Exempel 4 — Två hörn ger samma vinst"
**Möbelsnickaren från Exempel 2 höjer priset på borden så att vinsten blir 600 kr per bord. Vinsten per stol är fortfarande 400 kr, och bivillkoren är desamma, så det tillåtna området har hörnen $(0, 0)$, $(10, 0)$, $(6, 4)$ och $(0, 8)$, där $x$ är antalet stolar och $y$ antalet bord. Hur många stolar och bord ska snickaren nu tillverka för att vinsten ska bli så stor som möjligt?**

::: handskrift
typ: optkant
:::

::: textlosning
Den nya målfunktionen är $V = 400x + 600y$. Vi beräknar vinsten i varje
hörn.

| Hörnpunkt | $V = 400x + 600y$ |
| --- | --- |
| $(0, 0)$ | $400 \cdot 0 + 600 \cdot 0 = 0$ |
| $(10, 0)$ | $400 \cdot 10 + 600 \cdot 0 = 4\,000$ |
| $(6, 4)$ | $400 \cdot 6 + 600 \cdot 4 = 4\,800$ |
| $(0, 8)$ | $400 \cdot 0 + 600 \cdot 8 = 4\,800$ |

Två hörn ger den största vinsten, 4 800 kr. Då ger alla punkter på kanten
mellan $(6, 4)$ och $(0, 8)$ samma vinst. Kanten ligger på linjen
$2x + 3y = 24$, och nivålinjen $400x + 600y = 4\,800$ är samma linje, för
om båda led delas med 200 blir den $2x + 3y = 24$.

Snickaren kan bara tillverka hela stolar och bord. Vi söker därför
heltalspunkter på kanten, där $x$ går från 0 till 6. Löser vi ut $y$ ur
$2x + 3y = 24$ får vi $y = \dfrac{24 - 2x}{3}$, som är ett heltal för
$x = 0$, $x = 3$ och $x = 6$. Det ger punkterna $(0, 8)$, $(3, 6)$ och
$(6, 4)$.

Kontroll av mittpunkten: $400 \cdot 3 + 600 \cdot 6 = 4\,800$.

**Svar:** Vinsten blir 4 800 kr med 0 stolar och 8 bord, 3 stolar och 6 bord
eller 6 stolar och 4 bord.
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Begrepp"
- **Variabler**: det vi väljer, till exempel antal stolar $x$ och bord $y$.
- **Bivillkor**: begränsningar skrivna som olikheter, även $x \geq 0$ och
  $y \geq 0$.
- **Tillåtet område**: där alla bivillkor gäller.
- **Målfunktion**: det som ska maximeras eller minimeras.
:::

::: sampunkt "Hörnpunktsmetoden"
- Största och minsta värdet finns i en **hörnpunkt**.
- Beräkna målfunktionen i varje hörn och jämför.
- Hörn mellan två sneda linjer beräknas med ett **ekvationssystem**.
:::

::: sampunkt "Arbetsgång"
1. Variabler, bivillkor och målfunktion.
2. Rita det tillåtna området.
3. Bestäm hörnpunkterna och beräkna målfunktionen i dem.
4. Svara i sammanhanget.
:::

::: sampunkt "Nivålinjer och specialfall"
- **Nivålinje**: målfunktionen lika med en konstant. Alla är parallella.
- Två hörn med samma värde: hela kanten emellan är lika bra.
- Antal måste vara **heltal**. Pröva heltalspunkter vid behov.
:::
:::
