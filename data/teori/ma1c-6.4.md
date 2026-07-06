---
id: ma1c-6.4
title: Bestämma sträckor och vinklar i koordinatsystem
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.4'
---

# Bestämma sträckor och vinklar i koordinatsystem

Kom ihåg: Om två sidor är kända i en rätvinklig triangel kan vi bestämma
den tredje med **Pythagoras sats**.

::: formel "Pythagoras sats"
::: figur
<svg viewBox="36 32 212 124" width="212" height="124" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med katetrarna a och b och hypotenusan c."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

$$
a^2 + b^2 = c^2
$$

eller

$$
\text{katet}^2 + \text{katet}^2 = \text{hypotenusa}^2
$$
:::

Om vi ska bestämma en sträcka eller vinkel mellan två punkter i ett
koordinatsystem, så bildar vi en rätvinklig triangel med hörn i två av
punkterna. Sträckan motsvarar hypotenusan som beräknas med Pythagoras
sats. Vinkeln beräknas med trigonometri.

::: exempel "Exempel 1 — Sträcka och vinkel i koordinatsystemet"
**En sträcka dras mellan punkterna (−2, 1) och (2, 4). Bestäm<br>a) sträckans längd&emsp;&emsp;b) vinkeln mellan sträckan och x-axeln.**

**a)** Vi börjar med att rita upp punkterna i ett koordinatsystem och
drar sträckan mellan dem:

::: figur
<svg viewBox="-26 -20 352 217" width="352" height="217" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med punkterna minus 2 komma 1 och 2 komma 4 markerade och en blå sträcka dragen mellan dem."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/></svg>
:::

Vi bildar nu en rätvinklig triangel enligt figuren nedan:

::: figur
<svg viewBox="-26 -20 352 217" width="352" height="217" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma koordinatsystem där en rätvinklig triangel har bildats med streckade kateter: en vågrät på 4 rutor och en lodrät på 3 rutor. Sträckan är hypotenusan."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/><line x1="93.6" y1="119.6" x2="197.6" y2="119.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="197.6" y1="119.6" x2="197.6" y2="41.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="185.6" y="107.6" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/></svg>
:::

Vi tittar på skalan och ser att varje ruta motsvarar 1 l.e.
(längdenhet). Vi räknar rutor och ser att den ena kateten (basen) är
4 l.e. och den andra kateten (höjden) är 3 l.e. Vi bestämmer nu sträckan
$c$ med Pythagoras sats, $c^2 = a^2 + b^2$.

Insättning av $a = 4$ och $b = 3$ ger

$$
c^2 = 4^2 + 3^2
$$

$$
c^2 = 16 + 9
$$

$$
c^2 = 25
$$

$$
c = \pm\sqrt{25} = \pm 5
$$

Eftersom en sträcka inte kan vara negativ bortser vi från den negativa
lösningen.

**Svar:** 5 l.e.

**b)** Vi studerar återigen den rätvinkliga triangeln och markerar
vinkeln $v$ mellan sträckan och x-axeln (eller en valfri vågrät linje,
enklast att välja triangelns bas):

::: figur
<svg viewBox="-26 -20 352 217" width="352" height="217" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma figur där vinkeln v mellan sträckan och den vågräta kateten är markerad med en vinkelbåge vid den vänstra punkten."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/><line x1="93.6" y1="119.6" x2="197.6" y2="119.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="197.6" y1="119.6" x2="197.6" y2="41.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="185.6" y="107.6" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><path d="M115.6,119.6 A22,22 0 0 0 111.2,106.4" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="119.6" y="113.6" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

Vi har den *motstående kateten* (3 l.e.) och den *närliggande kateten*
(4 l.e.) till vinkeln $v$. Vi kan då beräkna vinkeln med *tangens*
eftersom tan $v$ = motstående katet/närliggande katet.

Insättning av motstående katet = 3 och närliggande katet = 4 ger

$$
\tan v = \frac{3}{4}
$$

$$
v = \tan^{-1}\left(\frac{3}{4}\right) = 36{,}869\ldots\degree \approx 37\degree
$$

**Svar:** 37°
:::
