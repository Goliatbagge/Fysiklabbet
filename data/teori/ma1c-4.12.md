---
id: ma1c-4.12
title: Potensfunktioner
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.12'
---

# Potensfunktioner

En kub med sidan $s$ har volymen $V = s^3$. Görs sidan dubbelt så lång, från
1 cm till 2 cm, växer volymen från $1\ \mathrm{cm^3}$ till $8\ \mathrm{cm^3}$.
Volymen blir alltså åtta gånger så stor, inte dubbelt så stor. Sambandet
mellan sidan och volymen är ett exempel på en **potensfunktion**.

En funktion där den oberoende variabeln, oftast $x$, står *i basen* och
exponenten är ett fast tal kallas en **potensfunktion**. $f(x) = 5x^3$ och
$g(x) = x^{-2}$ är exempel på potensfunktioner. Skilj dem från
exponentialfunktionerna, där den oberoende variabeln står i exponenten.

::: formel "Potensfunktion, allmän form"
$$
f(x) = Cx^a
$$

där $C$ och $a$ är konstanter och $C \neq 0$.
:::

::: formel "Exponentialfunktion, allmän form"
$$
f(x) = Ca^x
$$

där $C$ och $a$ är konstanter, $C \neq 0$ och $a > 0$.
:::

## Samma tecken, olika plats

$x^2$ och $2^x$ skrivs med samma två tecken, men det är två helt olika
funktioner. I $x^2$ står variabeln i basen, i $2^x$ står den i exponenten.
Tabellen visar några funktionsvärden.

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Potensfunktionen $x^2$ | 0 | 1 | 4 | 9 | 16 | 25 | 36 |
| Exponentialfunktionen $2^x$ | 1 | 2 | 4 | 8 | 16 | 32 | 64 |

Funktionerna har samma värde när $x = 2$ och när $x = 4$, men de växer på
olika sätt. Exponentialfunktionen fördubblas för varje steg åt höger.
Potensfunktionen gör inte det: från $x = 5$ till $x = 6$ ökar den bara från
25 till 36. Efter $x = 4$ drar därför $2^x$ ifrån mer och mer.

## Grafen till potensfunktioner

Grafen till en potensfunktion kan se väldigt olika ut, beroende på om
exponenten $a$ är udda eller jämn, positiv eller negativ, ett heltal eller
ett bråk. Här är fyra vanliga fall.

::: figur
<svg viewBox="-26 -20 218 160" width="296" height="217" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x i kvadrat: en parabel med botten i origo, symmetrisk kring y-axeln."><line x1="13.6" y1="0.0" x2="13.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="115.6" x2="170.0" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="81.6" x2="170.0" y2="81.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="47.6" x2="170.0" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="13.6" x2="170.0" y2="13.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="115.6" x2="178.0" y2="115.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,115.6 176.0,111.1 176.0,120.1" fill="#1f2530"/><line x1="81.6" y1="115.6" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="133.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="85.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="75.6" y="17.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M18.7,0.0 L20.0,3.8 L21.2,8.4 L22.5,12.8 L23.7,17.1 L25.0,21.3 L26.2,25.5 L27.5,29.5 L28.8,33.5 L30.0,37.4 L31.3,41.1 L32.5,44.8 L33.8,48.4 L35.1,51.9 L36.3,55.3 L37.6,58.6 L38.8,61.8 L40.1,64.9 L41.3,67.9 L42.6,70.9 L43.9,73.7 L45.1,76.5 L46.4,79.1 L47.6,81.7 L48.9,84.1 L50.1,86.5 L51.4,88.8 L52.7,91.0 L53.9,93.1 L55.2,95.1 L56.4,97.0 L57.7,98.8 L59.0,100.5 L60.2,102.1 L61.5,103.7 L62.7,105.1 L64.0,106.5 L65.2,107.7 L66.5,108.9 L67.8,110.0 L69.0,110.9 L70.3,111.8 L71.5,112.6 L72.8,113.3 L74.1,113.9 L75.3,114.4 L76.6,114.9 L77.8,115.2 L79.1,115.4 L80.3,115.6 L81.6,115.6 L82.9,115.6 L84.1,115.4 L85.4,115.2 L86.6,114.9 L87.9,114.4 L89.1,113.9 L90.4,113.3 L91.7,112.6 L92.9,111.8 L94.2,110.9 L95.4,110.0 L96.7,108.9 L98.0,107.7 L99.2,106.5 L100.5,105.1 L101.7,103.7 L103.0,102.1 L104.2,100.5 L105.5,98.8 L106.8,97.0 L108.0,95.1 L109.3,93.1 L110.5,91.0 L111.8,88.8 L113.0,86.5 L114.3,84.1 L115.6,81.7 L116.8,79.1 L118.1,76.5 L119.3,73.7 L120.6,70.9 L121.9,67.9 L123.1,64.9 L124.4,61.8 L125.6,58.6 L126.9,55.3 L128.1,51.9 L129.4,48.4 L130.7,44.8 L131.9,41.1 L133.2,37.4 L134.4,33.5 L135.7,29.5 L137.0,25.5 L138.2,21.3 L139.5,17.1 L140.7,12.8 L142.0,8.4 L143.2,3.8 L144.5,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>

$y = x^2$. Grafen är symmetrisk kring *y*-axeln och ligger aldrig under *x*-axeln.
:::

::: figur
<svg viewBox="-26 -20 218 157" width="296" height="213" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x upphöjt till 3: en kurva som kommer nerifrån vänster, planar ut genom origo och stiger brant uppåt till höger."><line x1="13.6" y1="0.0" x2="13.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="108.8" x2="170.0" y2="108.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="74.8" x2="170.0" y2="74.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="40.8" x2="170.0" y2="40.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="6.8" x2="170.0" y2="6.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="74.8" x2="178.0" y2="74.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,74.8 176.0,70.3 176.0,79.3" fill="#1f2530"/><line x1="81.6" y1="132.6" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="92.8" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="112.8" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="75.6" y="44.8" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="10.8" font-size="12" text-anchor="end" fill="#1f2530">2</text><path d="M40.8,132.6 L41.6,130.0 L42.5,126.5 L43.3,123.2 L44.2,120.1 L45.0,117.0 L45.9,114.2 L46.8,111.4 L47.6,108.8 L48.4,106.3 L49.3,104.0 L50.2,101.7 L51.0,99.6 L51.8,97.6 L52.7,95.7 L53.5,93.9 L54.4,92.2 L55.2,90.6 L56.1,89.1 L56.9,87.8 L57.8,86.5 L58.7,85.3 L59.5,84.1 L60.3,83.1 L61.2,82.1 L62.0,81.3 L62.9,80.5 L63.8,79.7 L64.6,79.1 L65.4,78.4 L66.3,77.9 L67.2,77.4 L68.0,77.0 L68.8,76.6 L69.7,76.3 L70.6,76.0 L71.4,75.7 L72.2,75.5 L73.1,75.3 L73.9,75.2 L74.8,75.1 L75.6,75.0 L76.5,74.9 L77.3,74.9 L78.2,74.8 L79.1,74.8 L79.9,74.8 L80.8,74.8 L81.6,74.8 L82.4,74.8 L83.3,74.8 L84.1,74.8 L85.0,74.8 L85.8,74.7 L86.7,74.7 L87.6,74.6 L88.4,74.5 L89.2,74.4 L90.1,74.3 L90.9,74.1 L91.8,73.9 L92.6,73.6 L93.5,73.3 L94.3,73.0 L95.2,72.6 L96.1,72.2 L96.9,71.7 L97.8,71.2 L98.6,70.6 L99.4,69.9 L100.3,69.1 L101.1,68.3 L102.0,67.5 L102.8,66.5 L103.7,65.5 L104.6,64.3 L105.4,63.1 L106.2,61.8 L107.1,60.5 L107.9,59.0 L108.8,57.4 L109.6,55.7 L110.5,53.9 L111.4,52.0 L112.2,50.0 L113.1,47.9 L113.9,45.6 L114.8,43.3 L115.6,40.8 L116.4,38.2 L117.3,35.4 L118.1,32.6 L119.0,29.5 L119.9,26.4 L120.7,23.1 L121.6,19.6 L122.4,16.0 L123.2,12.3 L124.1,8.4 L124.9,4.3 L125.8,0.1" fill="none" stroke="#1f2530" stroke-width="2"/></svg>

$y = x^3$. Negativa $x$ ger negativa värden, positiva $x$ ger positiva värden.
:::

::: figur
<svg viewBox="-26 -20 255 193" width="346" height="262" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med 1 genom x: en hyperbel med två grenar, en i tredje kvadranten och en i första, som närmar sig axlarna utan att röra dem."><line x1="13.2" y1="0.0" x2="13.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="57.2" y1="0.0" x2="57.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="101.2" y1="0.0" x2="101.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.2" y1="0.0" x2="145.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="189.2" y1="0.0" x2="189.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.2" x2="206.8" y2="145.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="101.2" x2="206.8" y2="101.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="57.2" x2="206.8" y2="57.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="13.2" x2="206.8" y2="13.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="101.2" x2="214.8" y2="101.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="222.8,101.2 212.8,96.7 212.8,105.7" fill="#1f2530"/><line x1="101.2" y1="162.8" x2="101.2" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="101.2,-16.0 96.7,-6.0 105.7,-6.0" fill="#1f2530"/><text x="220.8" y="119.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="110.2" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="57.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="145.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="189.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="95.2" y="149.2" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="95.2" y="61.2" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="95.2" y="17.2" font-size="12" text-anchor="end" fill="#1f2530">4</text><path d="M2.2,106.1 L3.4,106.1 L4.5,106.2 L5.7,106.3 L6.9,106.3 L8.1,106.4 L9.2,106.5 L10.4,106.5 L11.6,106.6 L12.7,106.7 L13.9,106.7 L15.1,106.8 L16.3,106.9 L17.4,107.0 L18.6,107.1 L19.8,107.1 L20.9,107.2 L22.1,107.3 L23.3,107.4 L24.5,107.5 L25.6,107.6 L26.8,107.7 L28.0,107.8 L29.1,107.9 L30.3,108.0 L31.5,108.1 L32.7,108.3 L33.8,108.4 L35.0,108.5 L36.2,108.6 L37.3,108.8 L38.5,108.9 L39.7,109.1 L40.9,109.2 L42.0,109.4 L43.2,109.5 L44.4,109.7 L45.5,109.9 L46.7,110.1 L47.9,110.3 L49.1,110.5 L50.2,110.7 L51.4,110.9 L52.6,111.2 L53.7,111.4 L54.9,111.7 L56.1,111.9 L57.3,112.2 L58.4,112.5 L59.6,112.8 L60.8,113.2 L61.9,113.5 L63.1,113.9 L64.3,114.3 L65.5,114.7 L66.6,115.2 L67.8,115.7 L69.0,116.2 L70.1,116.8 L71.3,117.4 L72.5,118.1 L73.7,118.8 L74.8,119.6 L76.0,120.4 L77.2,121.3 L78.3,122.4 L79.5,123.5 L80.7,124.8 L81.9,126.2 L83.0,127.8 L84.2,129.7 L85.4,131.8 L86.5,134.2 L87.7,137.1 L88.9,140.5 L90.1,144.7 L91.2,149.8 L92.4,156.2 L93.6,162.8" fill="none" stroke="#2563c9" stroke-width="2"/><path d="M106.3,5.5 L107.5,23.9 L108.7,36.4 L109.9,45.3 L111.1,52.1 L112.3,57.5 L113.5,61.8 L114.7,65.3 L115.9,68.2 L117.1,70.7 L118.3,72.9 L119.5,74.7 L120.7,76.4 L121.9,77.8 L123.1,79.1 L124.3,80.2 L125.5,81.3 L126.7,82.2 L127.9,83.1 L129.1,83.8 L130.3,84.6 L131.5,85.2 L132.7,85.8 L133.9,86.4 L135.1,86.9 L136.3,87.4 L137.5,87.9 L138.7,88.3 L139.9,88.7 L141.1,89.1 L142.3,89.4 L143.5,89.8 L144.7,90.1 L145.9,90.4 L147.1,90.7 L148.3,90.9 L149.5,91.2 L150.7,91.4 L151.9,91.7 L153.1,91.9 L154.3,92.1 L155.5,92.3 L156.7,92.5 L157.9,92.7 L159.1,92.8 L160.3,93.0 L161.5,93.2 L162.7,93.3 L163.9,93.5 L165.1,93.6 L166.3,93.8 L167.5,93.9 L168.8,94.0 L170.0,94.2 L171.2,94.3 L172.4,94.4 L173.6,94.5 L174.8,94.6 L176.0,94.7 L177.2,94.8 L178.4,94.9 L179.6,95.0 L180.8,95.1 L182.0,95.2 L183.2,95.3 L184.4,95.4 L185.6,95.5 L186.8,95.5 L188.0,95.6 L189.2,95.7 L190.4,95.8 L191.6,95.8 L192.8,95.9 L194.0,96.0 L195.2,96.1 L196.4,96.1 L197.6,96.2 L198.8,96.2 L200.0,96.3 L201.2,96.4 L202.4,96.4" fill="none" stroke="#2563c9" stroke-width="2"/></svg>

$y = x^{-1} = \dfrac{1}{x}$. Grafen har två grenar som närmar sig axlarna utan att nå dem. Funktionen är inte definierad för $x = 0$.
:::

::: figur
<svg viewBox="-26 -20 228 174" width="309" height="236" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med roten ur x: en kurva som startar i origo och stiger allt flackare åt höger. Den finns bara för x större än eller lika med 0."><line x1="4.0" y1="0.0" x2="4.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44.0" y1="0.0" x2="44.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84.0" y1="0.0" x2="84.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="124.0" y1="0.0" x2="124.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="164.0" y1="0.0" x2="164.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="136.0" x2="180.0" y2="136.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="96.0" x2="180.0" y2="96.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="56.0" x2="180.0" y2="56.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="16.0" x2="180.0" y2="16.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="96.0" x2="188.0" y2="96.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,96.0 186.0,91.5 186.0,100.5" fill="#1f2530"/><line x1="44.0" y1="144.0" x2="44.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="44.0,-16.0 39.5,-6.0 48.5,-6.0" fill="#1f2530"/><text x="194.0" y="114.0" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="53.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="4.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="84.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="124.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="164.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="38.0" y="140.0" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="38.0" y="60.0" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="38.0" y="20.0" font-size="12" text-anchor="end" fill="#1f2530">2</text><path d="M44.0,96.0 L45.7,87.9 L47.3,84.5 L49.0,81.9 L50.6,79.8 L52.3,77.8 L53.9,76.1 L55.5,74.5 L57.2,73.0 L58.8,71.6 L60.5,70.3 L62.1,69.1 L63.8,67.9 L65.5,66.7 L67.1,65.6 L68.8,64.5 L70.4,63.5 L72.0,62.5 L73.7,61.5 L75.3,60.6 L77.0,59.7 L78.7,58.8 L80.3,57.9 L82.0,57.0 L83.6,56.2 L85.2,55.4 L86.9,54.6 L88.6,53.8 L90.2,53.0 L91.8,52.3 L93.5,51.5 L95.2,50.8 L96.8,50.0 L98.4,49.3 L100.1,48.6 L101.8,47.9 L103.4,47.3 L105.0,46.6 L106.7,45.9 L108.4,45.3 L110.0,44.6 L111.6,44.0 L113.3,43.4 L115.0,42.7 L116.6,42.1 L118.2,41.5 L119.9,40.9 L121.6,40.3 L123.2,39.7 L124.8,39.1 L126.5,38.6 L128.2,38.0 L129.8,37.4 L131.4,36.9 L133.1,36.3 L134.8,35.8 L136.4,35.2 L138.1,34.7 L139.7,34.1 L141.3,33.6 L143.0,33.1 L144.7,32.5 L146.3,32.0 L147.9,31.5 L149.6,31.0 L151.2,30.5 L152.9,30.0 L154.6,29.5 L156.2,29.0 L157.8,28.5 L159.5,28.0 L161.2,27.5 L162.8,27.1 L164.4,26.6 L166.1,26.1 L167.8,25.6 L169.4,25.2 L171.1,24.7 L172.7,24.3 L174.4,23.8 L176.0,23.3" fill="none" stroke="#c8324a" stroke-width="2"/><circle cx="44.0" cy="96.0" r="3" fill="#c8324a"/></svg>

$y = x^{1/2} = \sqrt{x}$. Grafen finns bara för $x \geq 0$.
:::

Pröva själv i grafritaren nedan. Startläget visar $y = x^2$. Gissa först
vad som kommer att hända, och dra sedan i glidarna för att se om du hade
rätt.

- Hur ändras grafen när $a$ går från 2 till 4?
- Vad händer med grafens vänstra halva när $a = 3$?
- Varför försvinner den vänstra halvan när $a = 0{,}5$?
- Vad gör konstanten $C$ med grafen? Vad händer när $C$ är negativ?

::: graf
titel: y = Cx^a
uttryck: C*x^a
ekvation: y = {C}x^{{a}}
C: 1, -3, 3, 0.5
a: 2, -2, 4, 0.5
x: -4, 4
y: -2, 6
:::

::: förklaring "Förklaring — Det här händer i grafritaren"
- **Från $a = 2$ till $a = 4$:** grafen är fortfarande symmetrisk kring
  *y*-axeln, men den blir plattare mellan $x = -1$ och $x = 1$ och brantare
  utanför. Med $C = 1$ går den alltid genom punkten $(1, 1)$, eftersom 1
  upphöjt till vad som helst är 1.
- **När $a = 3$:** en udda exponent behåller tecknet. Ett negativt $x$ ger
  då ett negativt värde, och grafens vänstra halva hamnar under *x*-axeln.
- **När $a = 0{,}5$:** $x^{0{,}5} = \sqrt{x}$, och kvadratroten ur ett
  negativt tal är inte definierad. Därför finns grafen bara för
  $x \geq 0$.
- **Konstanten $C$:** alla funktionsvärden multipliceras med $C$. Grafen
  dras ut i höjdled när $C$ är större än 1 och trycks ihop när $C$ ligger
  mellan 0 och 1. Ett negativt $C$ speglar grafen i *x*-axeln.
:::

## Udda eller jämn exponent

I avsnittet Potensekvationer löste vi ekvationer som $x^n = b$. Med grafen
går det att *se* hur många lösningar en sådan ekvation har. Lösningarna är
de $x$ där grafen till $y = x^n$ skär den vågräta linjen $y = b$.

::: figur
<svg viewBox="-26 -20 218 195" width="296" height="264" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x i kvadrat med två vågräta linjer. Linjen y lika med 2 skär grafen i två punkter. Linjen y lika med minus 1 ligger under grafen och skär den inte."><line x1="13.6" y1="0.0" x2="13.6" y2="166.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="166.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="166.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="166.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="166.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="149.6" x2="170.0" y2="149.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="81.6" x2="170.0" y2="81.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="47.6" x2="170.0" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="13.6" x2="170.0" y2="13.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="115.6" x2="178.0" y2="115.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,115.6 176.0,111.1 176.0,120.1" fill="#1f2530"/><line x1="81.6" y1="166.6" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="133.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="85.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="17.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="0.0" y1="47.6" x2="170.0" y2="47.6" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="6 4"/><text x="168.0" y="41.6" font-size="12" text-anchor="end" fill="#2563c9"><tspan font-style="italic">y</tspan> = 2</text><line x1="0.0" y1="149.6" x2="170.0" y2="149.6" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="6 4"/><text x="168.0" y="163.6" font-size="12" text-anchor="end" fill="#2563c9"><tspan font-style="italic">y</tspan> = −1</text><path d="M18.9,0.0 L19.1,0.8 L19.5,2.4 L20.0,3.9 L20.4,5.4 L20.8,7.0 L21.3,8.5 L21.7,10.0 L22.1,11.5 L22.5,13.0 L23.0,14.4 L23.4,15.9 L23.8,17.3 L24.2,18.8 L24.7,20.2 L25.1,21.6 L25.5,23.0 L25.9,24.4 L26.3,25.8 L26.8,27.2 L27.2,28.6 L27.6,29.9 L28.0,31.3 L28.5,32.6 L28.9,33.9 L29.3,35.2 L29.8,36.5 L30.2,37.8 L30.6,39.1 L31.0,40.4 L31.5,41.6 L31.9,42.9 L32.3,44.1 L32.7,45.3 L33.2,46.6 L33.6,47.8 L34.0,49.0 L34.4,50.1 L34.8,51.3 L35.3,52.5 L35.7,53.6 L36.1,54.8 L36.5,55.9 L37.0,57.0 L37.4,58.1 L37.8,59.2 L38.3,60.3 L38.7,61.4 L39.1,62.5 L39.5,63.5 L40.0,64.6 L40.4,65.6 L40.8,66.6 L41.2,67.7 L41.7,68.7 L42.1,69.7 L42.5,70.6 L42.9,71.6 L43.3,72.6 L43.8,73.5 L44.2,74.5 L44.6,75.4 L45.0,76.3 L45.5,77.2 L45.9,78.1 L46.3,79.0 L46.8,79.9 L47.2,80.7 L47.6,81.6 L48.0,82.4 L48.5,83.3 L48.9,84.1 L49.3,84.9 L49.7,85.7 L50.2,86.5 L50.6,87.3 L51.0,88.1 L51.4,88.8 L51.8,89.6 L52.3,90.3 L52.7,91.0 L53.1,91.8 L53.5,92.5 L54.0,93.2 L54.4,93.8 L54.8,94.5 L55.3,95.2 L55.7,95.8 L56.1,96.5 L56.5,97.1 L57.0,97.7 L57.4,98.3 L57.8,98.9 L58.2,99.5 L58.7,100.1 L59.1,100.7 L59.5,101.2 L59.9,101.8 L60.3,102.3 L60.8,102.8 L61.2,103.4 L61.6,103.9 L62.0,104.4 L62.5,104.8 L62.9,105.3 L63.3,105.8 L63.8,106.2 L64.2,106.7 L64.6,107.1 L65.0,107.5 L65.5,107.9 L65.9,108.3 L66.3,108.7 L66.7,109.1 L67.2,109.5 L67.6,109.8 L68.0,110.2 L68.4,110.5 L68.8,110.8 L69.3,111.1 L69.7,111.4 L70.1,111.7 L70.6,112.0 L71.0,112.3 L71.4,112.5 L71.8,112.8 L72.3,113.0 L72.7,113.3 L73.1,113.5 L73.5,113.7 L73.9,113.9 L74.4,114.1 L74.8,114.2 L75.2,114.4 L75.7,114.6 L76.1,114.7 L76.5,114.8 L76.9,115.0 L77.3,115.1 L77.8,115.2 L78.2,115.3 L78.6,115.3 L79.1,115.4 L79.5,115.5 L79.9,115.5 L80.3,115.6 L80.8,115.6 L81.2,115.6 L81.6,115.6 L82.0,115.6 L82.4,115.6 L82.9,115.6 L83.3,115.5 L83.7,115.5 L84.2,115.4 L84.6,115.3 L85.0,115.3 L85.4,115.2 L85.8,115.1 L86.3,115.0 L86.7,114.8 L87.1,114.7 L87.6,114.6 L88.0,114.4 L88.4,114.2 L88.8,114.1 L89.3,113.9 L89.7,113.7 L90.1,113.5 L90.5,113.3 L90.9,113.0 L91.4,112.8 L91.8,112.5 L92.2,112.3 L92.7,112.0 L93.1,111.7 L93.5,111.4 L93.9,111.1 L94.3,110.8 L94.8,110.5 L95.2,110.2 L95.6,109.8 L96.1,109.5 L96.5,109.1 L96.9,108.7 L97.3,108.3 L97.8,107.9 L98.2,107.5 L98.6,107.1 L99.0,106.7 L99.4,106.2 L99.9,105.8 L100.3,105.3 L100.7,104.8 L101.2,104.4 L101.6,103.9 L102.0,103.4 L102.4,102.8 L102.8,102.3 L103.3,101.8 L103.7,101.2 L104.1,100.7 L104.6,100.1 L105.0,99.5 L105.4,98.9 L105.8,98.3 L106.3,97.7 L106.7,97.1 L107.1,96.5 L107.5,95.8 L107.9,95.2 L108.4,94.5 L108.8,93.8 L109.2,93.2 L109.7,92.5 L110.1,91.8 L110.5,91.0 L110.9,90.3 L111.3,89.6 L111.8,88.8 L112.2,88.1 L112.6,87.3 L113.1,86.5 L113.5,85.7 L113.9,84.9 L114.3,84.1 L114.8,83.3 L115.2,82.4 L115.6,81.6 L116.0,80.7 L116.4,79.9 L116.9,79.0 L117.3,78.1 L117.7,77.2 L118.2,76.3 L118.6,75.4 L119.0,74.5 L119.4,73.5 L119.8,72.6 L120.3,71.6 L120.7,70.6 L121.1,69.7 L121.6,68.7 L122.0,67.7 L122.4,66.6 L122.8,65.6 L123.3,64.6 L123.7,63.5 L124.1,62.5 L124.5,61.4 L124.9,60.3 L125.4,59.2 L125.8,58.1 L126.2,57.0 L126.7,55.9 L127.1,54.8 L127.5,53.6 L127.9,52.5 L128.3,51.3 L128.8,50.1 L129.2,49.0 L129.6,47.8 L130.1,46.6 L130.5,45.3 L130.9,44.1 L131.3,42.9 L131.8,41.6 L132.2,40.4 L132.6,39.1 L133.0,37.8 L133.4,36.5 L133.9,35.2 L134.3,33.9 L134.7,32.6 L135.2,31.3 L135.6,29.9 L136.0,28.6 L136.4,27.2 L136.9,25.8 L137.3,24.4 L137.7,23.0 L138.1,21.6 L138.6,20.2 L139.0,18.8 L139.4,17.3 L139.8,15.9 L140.3,14.4 L140.7,13.0 L141.1,11.5 L141.5,10.0 L141.9,8.5 L142.4,7.0 L142.8,5.4 L143.2,3.9 L143.6,2.4 L144.1,0.8 L144.3,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><circle cx="33.5" cy="47.6" r="3.4" fill="#2563c9"/><circle cx="129.7" cy="47.6" r="3.4" fill="#2563c9"/></svg>

Jämn exponent, här $y = x^2$. Linjen $y = 2$ skär grafen två gånger. Linjen $y = -1$ skär den inte alls.
:::

::: figur
<svg viewBox="-26 -20 218 191" width="296" height="259" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x upphöjt till 3 med två vågräta linjer. Linjen y lika med 2 skär grafen i en punkt, och linjen y lika med minus 1 skär den också i en punkt."><line x1="13.6" y1="0.0" x2="13.6" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156.4" x2="170.0" y2="156.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="122.4" x2="170.0" y2="122.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="54.4" x2="170.0" y2="54.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="20.4" x2="170.0" y2="20.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="88.4" x2="178.0" y2="88.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,88.4 176.0,83.9 176.0,92.9" fill="#1f2530"/><line x1="81.6" y1="163.2" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="106.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="104.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="104.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="104.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="104.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="58.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="160.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><line x1="0.0" y1="20.4" x2="170.0" y2="20.4" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="6 4"/><text x="168.0" y="14.4" font-size="12" text-anchor="end" fill="#2563c9"><tspan font-style="italic">y</tspan> = 2</text><line x1="0.0" y1="122.4" x2="170.0" y2="122.4" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="6 4"/><text x="168.0" y="136.4" font-size="12" text-anchor="end" fill="#2563c9"><tspan font-style="italic">y</tspan> = −1</text><path d="M37.4,163.2 L37.4,163.1 L37.8,161.0 L38.3,158.9 L38.7,156.8 L39.1,154.8 L39.5,152.8 L40.0,150.9 L40.4,149.0 L40.8,147.2 L41.2,145.3 L41.7,143.6 L42.1,141.8 L42.5,140.1 L42.9,138.4 L43.3,136.8 L43.8,135.2 L44.2,133.7 L44.6,132.1 L45.0,130.6 L45.5,129.2 L45.9,127.8 L46.3,126.4 L46.8,125.0 L47.2,123.7 L47.6,122.4 L48.0,121.1 L48.5,119.9 L48.9,118.7 L49.3,117.6 L49.7,116.4 L50.2,115.3 L50.6,114.2 L51.0,113.2 L51.4,112.2 L51.8,111.2 L52.3,110.2 L52.7,109.3 L53.1,108.4 L53.5,107.5 L54.0,106.6 L54.4,105.8 L54.8,105.0 L55.3,104.2 L55.7,103.5 L56.1,102.7 L56.5,102.0 L57.0,101.4 L57.4,100.7 L57.8,100.1 L58.2,99.4 L58.7,98.9 L59.1,98.3 L59.5,97.7 L59.9,97.2 L60.3,96.7 L60.8,96.2 L61.2,95.7 L61.6,95.3 L62.0,94.9 L62.5,94.5 L62.9,94.1 L63.3,93.7 L63.8,93.3 L64.2,93.0 L64.6,92.7 L65.0,92.3 L65.5,92.0 L65.9,91.8 L66.3,91.5 L66.7,91.2 L67.2,91.0 L67.6,90.8 L68.0,90.6 L68.4,90.4 L68.8,90.2 L69.3,90.0 L69.7,89.9 L70.1,89.7 L70.6,89.6 L71.0,89.4 L71.4,89.3 L71.8,89.2 L72.3,89.1 L72.7,89.0 L73.1,88.9 L73.5,88.9 L73.9,88.8 L74.4,88.7 L74.8,88.7 L75.2,88.6 L75.7,88.6 L76.1,88.5 L76.5,88.5 L76.9,88.5 L77.3,88.5 L77.8,88.4 L78.2,88.4 L78.6,88.4 L79.1,88.4 L79.5,88.4 L79.9,88.4 L80.3,88.4 L80.8,88.4 L81.2,88.4 L81.6,88.4 L82.0,88.4 L82.4,88.4 L82.9,88.4 L83.3,88.4 L83.7,88.4 L84.2,88.4 L84.6,88.4 L85.0,88.4 L85.4,88.4 L85.8,88.3 L86.3,88.3 L86.7,88.3 L87.1,88.3 L87.6,88.2 L88.0,88.2 L88.4,88.1 L88.8,88.1 L89.3,88.0 L89.7,87.9 L90.1,87.9 L90.5,87.8 L90.9,87.7 L91.4,87.6 L91.8,87.5 L92.2,87.4 L92.7,87.2 L93.1,87.1 L93.5,86.9 L93.9,86.8 L94.3,86.6 L94.8,86.4 L95.2,86.2 L95.6,86.0 L96.1,85.8 L96.5,85.6 L96.9,85.3 L97.3,85.0 L97.8,84.8 L98.2,84.5 L98.6,84.2 L99.0,83.8 L99.4,83.5 L99.9,83.1 L100.3,82.7 L100.7,82.3 L101.2,81.9 L101.6,81.5 L102.0,81.1 L102.4,80.6 L102.8,80.1 L103.3,79.6 L103.7,79.1 L104.1,78.5 L104.6,77.9 L105.0,77.4 L105.4,76.7 L105.8,76.1 L106.3,75.4 L106.7,74.8 L107.1,74.1 L107.5,73.3 L107.9,72.6 L108.4,71.8 L108.8,71.0 L109.2,70.2 L109.7,69.3 L110.1,68.4 L110.5,67.5 L110.9,66.6 L111.3,65.6 L111.8,64.6 L112.2,63.6 L112.6,62.6 L113.1,61.5 L113.5,60.4 L113.9,59.2 L114.3,58.1 L114.8,56.9 L115.2,55.7 L115.6,54.4 L116.0,53.1 L116.4,51.8 L116.9,50.4 L117.3,49.0 L117.7,47.6 L118.2,46.2 L118.6,44.7 L119.0,43.1 L119.4,41.6 L119.8,40.0 L120.3,38.4 L120.7,36.7 L121.1,35.0 L121.6,33.2 L122.0,31.5 L122.4,29.6 L122.8,27.8 L123.3,25.9 L123.7,24.0 L124.1,22.0 L124.5,20.0 L124.9,17.9 L125.4,15.8 L125.8,13.7 L126.2,11.5 L126.7,9.3 L127.1,7.0 L127.5,4.7 L127.9,2.4 L128.3,0.0 L128.4,0.0" fill="none" stroke="#1f2530" stroke-width="2"/><circle cx="124.4" cy="20.4" r="3.4" fill="#2563c9"/><circle cx="47.6" cy="122.4" r="3.4" fill="#2563c9"/></svg>

Udda exponent, här $y = x^3$. Varje vågrät linje skär grafen exakt en gång.
:::

- **Jämn exponent** ($x^2$, $x^4$, $x^6$ och så vidare): ett tal upphöjt
  till en jämn exponent blir aldrig negativt. Ekvationen har två lösningar,
  $x = \pm\sqrt[n]{b}$, om $b > 0$. Den har en lösning, $x = 0$, om $b = 0$
  och ingen lösning om $b < 0$.
- **Udda exponent** ($x^3$, $x^5$ och så vidare): tecknet behålls.
  Ekvationen har alltid exakt en lösning, $x = \sqrt[n]{b}$, och lösningen
  har samma tecken som $b$.

::: exempel "Exempel 1 — Funktionsvärde och ekvation"
**Låt $f(x) = x^4$.<br>a) Bestäm $f(2)$.&emsp;&emsp;b) Lös ekvationen $f(x) = 2$.**

::: handskrift
typ: potensfunktion
:::

::: textlosning
**a)** Vi sätter in $x = 2$ i funktionsuttrycket och beräknar värdet:

$$
f(2) = 2^4 = 16
$$

**Svar:** 16

**b)** Nu är det tvärtom: funktionsvärdet är känt och $x$ söks. Vi sätter
funktionsuttrycket lika med 2 och får en potensekvation:

$$
x^4 = 2
$$

Exponenten 4 är jämn. Både ett positivt och ett negativt tal upphöjt till 4
ger ett positivt värde, så ekvationen har två lösningar. Vi drar fjärderoten
ur båda led:

$$
x = \pm\sqrt[4]{2}
$$

$$
x \approx \pm 1{,}19
$$

Det stämmer med grafen: linjen $y = 2$ skär grafen till $y = x^4$ en gång
till vänster om *y*-axeln och en gång till höger.

**Svar:** $x = \pm\sqrt[4]{2} \approx \pm 1{,}19$
:::
:::

::: exempel "Exempel 2 — Potensekvationer med udda och jämn exponent"
**Lös ekvationerna.<br>a)&nbsp;$x^3 = -8$&emsp;&emsp;b)&nbsp;$x^4 = -16$&emsp;&emsp;c)&nbsp;$3x^5 = 96$**

::: handskrift
typ: potensekvuddajamn
:::

::: textlosning
**a)** Exponenten 3 är udda. Då finns exakt en lösning, och den är negativ
eftersom högerledet är negativt. Vi drar tredjeroten ur båda led:

$$
x = \sqrt[3]{-8}
$$

$$
x = -2
$$

Kontroll: $(-2)^3 = (-2) \cdot (-2) \cdot (-2) = -8$. Stämmer.

**Svar:** $x = -2$

**b)** Exponenten 4 är jämn. Ett tal upphöjt till 4 blir aldrig negativt,
så $x^4$ kan inte bli $-16$. Grafen till $y = x^4$ ligger aldrig under
*x*-axeln och skär därför inte linjen $y = -16$.

**Svar:** Ekvationen saknar lösning.

**c)** Potensen står inte ensam. Vi dividerar först båda led med 3:

$$
\dfrac{3x^5}{3} = \dfrac{96}{3}
$$

$$
x^5 = 32
$$

Exponenten 5 är udda, så det finns exakt en lösning. Vi drar femteroten ur
båda led:

$$
x = \sqrt[5]{32}
$$

$$
x = 2
$$

Kontroll: $3 \cdot 2^5 = 3 \cdot 32 = 96$. Stämmer.

**Svar:** $x = 2$
:::
:::

::: exempel "Exempel 3 — Bestäm konstanten med hjälp av en punkt"
**Grafen till potensfunktionen $f(x) = C \cdot x^2$ går genom punkten $(3, 18)$.<br>a) Bestäm $C$.&emsp;&emsp;b) Bestäm $f(6)$.**

::: handskrift
typ: potensbestamc
:::

::: textlosning
**a)** Att grafen går genom punkten $(3, 18)$ betyder att $f(3) = 18$. Vi
sätter in $x = 3$ i funktionsuttrycket och sätter det lika med 18:

$$
C \cdot 3^2 = 18
$$

$$
C \cdot 9 = 18
$$

Vi dividerar båda led med 9:

$$
\dfrac{C \cdot 9}{9} = \dfrac{18}{9}
$$

$$
C = 2
$$

**Svar:** $C = 2$

**b)** Nu är funktionen känd, $f(x) = 2x^2$. Vi sätter in $x = 6$:

$$
f(6) = 2 \cdot 6^2 = 2 \cdot 36 = 72
$$

**Svar:** 72
:::
:::

## När *x* multipliceras med ett tal

Jämför de två punkterna i exempel 3. När $x$ fördubblades från 3 till 6
blev funktionsvärdet fyra gånger så stort, från 18 till 72. Faktorn 4 är
$2^2$, alltså fördubblingen upphöjd till funktionens exponent. Kuben i
början av avsnittet följer samma mönster: där är exponenten 3, och dubbel
sida ger $2^3 = 8$ gånger så stor volym.

::: formel "Skalning i en potensfunktion"
$$
f(k \cdot x) = k^a \cdot f(x)
$$

När $x$ multipliceras med ett tal $k$ multipliceras funktionsvärdet med
$k^a$. Det gäller var på grafen man än börjar, och konstanten $C$ påverkar
inte faktorn.

::: härledning "Härledning — Skalning i en potensfunktion"
Vi sätter in $k \cdot x$ i stället för $x$ i $f(x) = C \cdot x^a$ och
använder potenslagen $(k \cdot x)^a = k^a \cdot x^a$:

$$
f(k \cdot x) = C \cdot (k \cdot x)^a = C \cdot k^a \cdot x^a = k^a \cdot C \cdot x^a = k^a \cdot f(x)
$$
:::
:::

Regeln gör det lätt att resonera utan att räkna ut $C$. Tre exempel:

- $a = 2$: tre gånger så stort $x$ ger $3^2 = 9$ gånger så stort
  funktionsvärde. Så växer arean av en kvadrat när sidan blir tre gånger
  så lång.
- $a = -1$: dubbelt så stort $x$ ger $2^{-1} = \dfrac{1}{2}$ av
  funktionsvärdet. Det är en omvänd proportionalitet.
- $a = \dfrac{1}{2}$: fyra gånger så stort $x$ ger
  $4^{1/2} = \sqrt{4} = 2$ gånger så stort funktionsvärde.

Jämför med exponentialfunktionen. Där multipliceras funktionsvärdet med
samma faktor varje gång ett fast tal *adderas* till $x$. I en
potensfunktion händer det varje gång $x$ *multipliceras* med ett fast tal.

## Funktion i funktion

I avsnittet Funktion och funktionsvärde liknade vi en funktion vid en
maskin: ett värde stoppas in och ett nytt värde kommer ut. Ibland kopplas
två maskiner efter varandra, så att det som kommer ut ur den första stoppas
in i den andra.

Skrivsättet $f(g(2))$ betyder just det. Talet 2 stoppas först in i den
inre funktionen $g$. Värdet $g(2)$ som kommer ut stoppas sedan in i den
yttre funktionen $f$. Vi räknar alltså **inifrån och ut**. Observera att
$f(g(2))$ inte är en multiplikation av $f(2)$ och $g(2)$.

::: exempel "Exempel 4 — Funktion i funktion"
**Låt $f(x) = x^{1/2}$ och $g(x) = 4x^2$. Bestäm $f(g(2))$.**

::: handskrift
typ: funktionifunktion
:::

::: textlosning
Vi räknar inifrån och ut och beräknar först den inre funktionen, $g(2)$:

$$
g(2) = 4 \cdot 2^2 = 4 \cdot 4 = 16
$$

Därefter ersätter vi $g(2)$ i den yttre funktionen med 16. Exponenten
$\dfrac{1}{2}$ betyder kvadratroten, $x^{1/2} = \sqrt{x}$, som vi såg i
avsnittet Rationella exponenter:

$$
f(g(2)) = f(16) = 16^{1/2} = \sqrt{16} = 4
$$

**Svar:** 4
:::
:::

::: härledning "OBS! Fyra vanliga fel"
- **Att blanda ihop $x^2$ och $2^x$.** Titta på var $x$ står. I basen är
  det en potensfunktion, i exponenten en exponentialfunktion.
- **Att glömma ± när exponenten är jämn.** $x^4 = 81$ har lösningarna
  $x = \pm 3$, inte bara $x = 3$.
- **Att skriva ”saknar lösning” när exponenten är udda.** $x^3 = -8$ har
  lösningen $x = -2$. Det är bara med jämn exponent som ett negativt
  högerled ger en ekvation utan lösning.
- **Att läsa $f(g(2))$ som en multiplikation.** Räkna inifrån och ut:
  först $g(2)$, sedan $f$ av det värdet.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Potens eller exponential"
- **Potensfunktion**: $f(x) = Cx^{a}$, variabeln i **basen**.
- **Exponentialfunktion**: $f(x) = Ca^{x}$, variabeln i **exponenten**.
- Titta på var $x$ står. Det är hela skillnaden.
:::

::: sampunkt "Graferna"
- $y = x^{2}$: symmetrisk kring *y*-axeln, aldrig under *x*-axeln.
- $y = x^{3}$: negativa värden till vänster, positiva till höger.
- $y = x^{-1} = \dfrac{1}{x}$: två grenar, inte definierad för $x = 0$.
- $y = x^{1/2} = \sqrt{x}$: bara för $x \geq 0$.
:::

::: sampunkt "Udda eller jämn exponent"
- Lösningarna till $x^{n} = b$ är skärningarna med linjen $y = b$.
- **Jämn**: två lösningar om $b > 0$, en om $b = 0$, ingen om $b < 0$.
- **Udda**: alltid exakt en lösning, med samma tecken som $b$.
:::

::: sampunkt "Skalning"
- När $x$ multipliceras med $k$ multipliceras funktionsvärdet med $k^{a}$.
- Dubbel sida på en kub ger $2^{3} = 8$ gånger så stor volym.
- Konstanten $C$ påverkar inte faktorn.
:::

::: sampunkt "Räkna med dem"
- Funktionsvärde: sätt in *x*-värdet. $f(x) = x^{4}$ ger $f(2) = 16$.
- Bestäm $C$: sätt in en känd punkt och lös ekvationen.
- $f(g(2))$ räknas **inifrån och ut**: först $g(2)$, sedan $f$ av svaret.
:::
:::
