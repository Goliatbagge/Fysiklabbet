---
id: ma1c-4.11
title: Potensfunktioner
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.11'
---

# Potensfunktioner

Funktioner med en term där den beroende variabeln, oftast $x$, är *i
basen* kallas **potensfunktioner**. $f(x) = 5x^3$ och $g(x) = x^{-2}$ är
exempel på potensfunktioner. Skilj potensfunktioner från
exponentialfunktioner där den oberoende variabeln är i exponenten.

::: formel "Potensfunktioner — generellt"
$$
f(x) = Cx^a
$$

där $C$ och $a$ är konstanter.
:::

::: formel "Exponentialfunktioner — generellt"
$$
f(x) = Ca^x
$$

där $C$ och $a$ är konstanter.
:::

## Grafen till potensfunktioner

Grafen till en potensfunktion kan se väldigt olika ut, beroende på om
exponenten $a$ är udda/jämn, positiv/negativ eller ett heltal/bråk. Vi
kommer att utreda dem noggrannare i senare kurser. Nedan ser du några
exempel.

::: figur
<svg viewBox="-26 -20 218 160" width="218" height="160" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x i kvadrat: en parabel med botten i origo, symmetrisk kring y-axeln."><line x1="13.6" y1="0.0" x2="13.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="115.6" x2="170.0" y2="115.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="81.6" x2="170.0" y2="81.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="47.6" x2="170.0" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="13.6" x2="170.0" y2="13.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="115.6" x2="178.0" y2="115.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,115.6 176.0,111.1 176.0,120.1" fill="#1f2530"/><line x1="81.6" y1="115.6" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="133.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="131.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="85.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="75.6" y="17.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M18.7,0.0 L20.0,3.8 L21.2,8.4 L22.5,12.8 L23.7,17.1 L25.0,21.3 L26.2,25.5 L27.5,29.5 L28.8,33.5 L30.0,37.4 L31.3,41.1 L32.5,44.8 L33.8,48.4 L35.1,51.9 L36.3,55.3 L37.6,58.6 L38.8,61.8 L40.1,64.9 L41.3,67.9 L42.6,70.9 L43.9,73.7 L45.1,76.5 L46.4,79.1 L47.6,81.7 L48.9,84.1 L50.1,86.5 L51.4,88.8 L52.7,91.0 L53.9,93.1 L55.2,95.1 L56.4,97.0 L57.7,98.8 L59.0,100.5 L60.2,102.1 L61.5,103.7 L62.7,105.1 L64.0,106.5 L65.2,107.7 L66.5,108.9 L67.8,110.0 L69.0,110.9 L70.3,111.8 L71.5,112.6 L72.8,113.3 L74.1,113.9 L75.3,114.4 L76.6,114.9 L77.8,115.2 L79.1,115.4 L80.3,115.6 L81.6,115.6 L82.9,115.6 L84.1,115.4 L85.4,115.2 L86.6,114.9 L87.9,114.4 L89.1,113.9 L90.4,113.3 L91.7,112.6 L92.9,111.8 L94.2,110.9 L95.4,110.0 L96.7,108.9 L98.0,107.7 L99.2,106.5 L100.5,105.1 L101.7,103.7 L103.0,102.1 L104.2,100.5 L105.5,98.8 L106.8,97.0 L108.0,95.1 L109.3,93.1 L110.5,91.0 L111.8,88.8 L113.0,86.5 L114.3,84.1 L115.6,81.7 L116.8,79.1 L118.1,76.5 L119.3,73.7 L120.6,70.9 L121.9,67.9 L123.1,64.9 L124.4,61.8 L125.6,58.6 L126.9,55.3 L128.1,51.9 L129.4,48.4 L130.7,44.8 L131.9,41.1 L133.2,37.4 L134.4,33.5 L135.7,29.5 L137.0,25.5 L138.2,21.3 L139.5,17.1 L140.7,12.8 L142.0,8.4 L143.2,3.8 L144.5,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>

$y = x^2$
:::

::: figur
<svg viewBox="-26 -20 218 157" width="218" height="157" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med x upphöjt till 3: en kurva som kommer nerifrån vänster, planar ut genom origo och stiger brant uppåt till höger."><line x1="13.6" y1="0.0" x2="13.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="47.6" y1="0.0" x2="47.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="81.6" y1="0.0" x2="81.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="115.6" y1="0.0" x2="115.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="149.6" y1="0.0" x2="149.6" y2="132.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="108.8" x2="170.0" y2="108.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="74.8" x2="170.0" y2="74.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="40.8" x2="170.0" y2="40.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="6.8" x2="170.0" y2="6.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="74.8" x2="178.0" y2="74.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="186.0,74.8 176.0,70.3 176.0,79.3" fill="#1f2530"/><line x1="81.6" y1="132.6" x2="81.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="81.6,-16.0 77.1,-6.0 86.1,-6.0" fill="#1f2530"/><text x="184.0" y="92.8" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="90.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="47.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="115.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="149.6" y="90.8" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="75.6" y="112.8" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="75.6" y="44.8" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="75.6" y="10.8" font-size="12" text-anchor="end" fill="#1f2530">2</text><path d="M40.8,132.6 L41.6,130.0 L42.5,126.5 L43.3,123.2 L44.2,120.1 L45.0,117.0 L45.9,114.2 L46.8,111.4 L47.6,108.8 L48.4,106.3 L49.3,104.0 L50.2,101.7 L51.0,99.6 L51.8,97.6 L52.7,95.7 L53.5,93.9 L54.4,92.2 L55.2,90.6 L56.1,89.1 L56.9,87.8 L57.8,86.5 L58.7,85.3 L59.5,84.1 L60.3,83.1 L61.2,82.1 L62.0,81.3 L62.9,80.5 L63.8,79.7 L64.6,79.1 L65.4,78.4 L66.3,77.9 L67.2,77.4 L68.0,77.0 L68.8,76.6 L69.7,76.3 L70.6,76.0 L71.4,75.7 L72.2,75.5 L73.1,75.3 L73.9,75.2 L74.8,75.1 L75.6,75.0 L76.5,74.9 L77.3,74.9 L78.2,74.8 L79.1,74.8 L79.9,74.8 L80.8,74.8 L81.6,74.8 L82.4,74.8 L83.3,74.8 L84.1,74.8 L85.0,74.8 L85.8,74.7 L86.7,74.7 L87.6,74.6 L88.4,74.5 L89.2,74.4 L90.1,74.3 L90.9,74.1 L91.8,73.9 L92.6,73.6 L93.5,73.3 L94.3,73.0 L95.2,72.6 L96.1,72.2 L96.9,71.7 L97.8,71.2 L98.6,70.6 L99.4,69.9 L100.3,69.1 L101.1,68.3 L102.0,67.5 L102.8,66.5 L103.7,65.5 L104.6,64.3 L105.4,63.1 L106.2,61.8 L107.1,60.5 L107.9,59.0 L108.8,57.4 L109.6,55.7 L110.5,53.9 L111.4,52.0 L112.2,50.0 L113.1,47.9 L113.9,45.6 L114.8,43.3 L115.6,40.8 L116.4,38.2 L117.3,35.4 L118.1,32.6 L119.0,29.5 L119.9,26.4 L120.7,23.1 L121.6,19.6 L122.4,16.0 L123.2,12.3 L124.1,8.4 L124.9,4.3 L125.8,0.1" fill="none" stroke="#1f2530" stroke-width="2"/></svg>

$y = x^3$
:::

::: figur
<svg viewBox="-26 -20 255 193" width="255" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med 1 genom x: en hyperbel med två grenar, en i tredje kvadranten och en i första, som närmar sig axlarna utan att röra dem."><line x1="13.2" y1="0.0" x2="13.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="57.2" y1="0.0" x2="57.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="101.2" y1="0.0" x2="101.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.2" y1="0.0" x2="145.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="189.2" y1="0.0" x2="189.2" y2="162.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.2" x2="206.8" y2="145.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="101.2" x2="206.8" y2="101.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="57.2" x2="206.8" y2="57.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="13.2" x2="206.8" y2="13.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="101.2" x2="214.8" y2="101.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="222.8,101.2 212.8,96.7 212.8,105.7" fill="#1f2530"/><line x1="101.2" y1="162.8" x2="101.2" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="101.2,-16.0 96.7,-6.0 105.7,-6.0" fill="#1f2530"/><text x="220.8" y="119.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="110.2" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="13.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="57.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="145.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="189.2" y="117.2" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="95.2" y="149.2" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="95.2" y="61.2" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="95.2" y="17.2" font-size="12" text-anchor="end" fill="#1f2530">4</text><path d="M2.2,106.1 L3.4,106.1 L4.5,106.2 L5.7,106.3 L6.9,106.3 L8.1,106.4 L9.2,106.5 L10.4,106.5 L11.6,106.6 L12.7,106.7 L13.9,106.7 L15.1,106.8 L16.3,106.9 L17.4,107.0 L18.6,107.1 L19.8,107.1 L20.9,107.2 L22.1,107.3 L23.3,107.4 L24.5,107.5 L25.6,107.6 L26.8,107.7 L28.0,107.8 L29.1,107.9 L30.3,108.0 L31.5,108.1 L32.7,108.3 L33.8,108.4 L35.0,108.5 L36.2,108.6 L37.3,108.8 L38.5,108.9 L39.7,109.1 L40.9,109.2 L42.0,109.4 L43.2,109.5 L44.4,109.7 L45.5,109.9 L46.7,110.1 L47.9,110.3 L49.1,110.5 L50.2,110.7 L51.4,110.9 L52.6,111.2 L53.7,111.4 L54.9,111.7 L56.1,111.9 L57.3,112.2 L58.4,112.5 L59.6,112.8 L60.8,113.2 L61.9,113.5 L63.1,113.9 L64.3,114.3 L65.5,114.7 L66.6,115.2 L67.8,115.7 L69.0,116.2 L70.1,116.8 L71.3,117.4 L72.5,118.1 L73.7,118.8 L74.8,119.6 L76.0,120.4 L77.2,121.3 L78.3,122.4 L79.5,123.5 L80.7,124.8 L81.9,126.2 L83.0,127.8 L84.2,129.7 L85.4,131.8 L86.5,134.2 L87.7,137.1 L88.9,140.5 L90.1,144.7 L91.2,149.8 L92.4,156.2 L93.6,162.8" fill="none" stroke="#2563c9" stroke-width="2"/><path d="M106.3,5.5 L107.5,23.9 L108.7,36.4 L109.9,45.3 L111.1,52.1 L112.3,57.5 L113.5,61.8 L114.7,65.3 L115.9,68.2 L117.1,70.7 L118.3,72.9 L119.5,74.7 L120.7,76.4 L121.9,77.8 L123.1,79.1 L124.3,80.2 L125.5,81.3 L126.7,82.2 L127.9,83.1 L129.1,83.8 L130.3,84.6 L131.5,85.2 L132.7,85.8 L133.9,86.4 L135.1,86.9 L136.3,87.4 L137.5,87.9 L138.7,88.3 L139.9,88.7 L141.1,89.1 L142.3,89.4 L143.5,89.8 L144.7,90.1 L145.9,90.4 L147.1,90.7 L148.3,90.9 L149.5,91.2 L150.7,91.4 L151.9,91.7 L153.1,91.9 L154.3,92.1 L155.5,92.3 L156.7,92.5 L157.9,92.7 L159.1,92.8 L160.3,93.0 L161.5,93.2 L162.7,93.3 L163.9,93.5 L165.1,93.6 L166.3,93.8 L167.5,93.9 L168.8,94.0 L170.0,94.2 L171.2,94.3 L172.4,94.4 L173.6,94.5 L174.8,94.6 L176.0,94.7 L177.2,94.8 L178.4,94.9 L179.6,95.0 L180.8,95.1 L182.0,95.2 L183.2,95.3 L184.4,95.4 L185.6,95.5 L186.8,95.5 L188.0,95.6 L189.2,95.7 L190.4,95.8 L191.6,95.8 L192.8,95.9 L194.0,96.0 L195.2,96.1 L196.4,96.1 L197.6,96.2 L198.8,96.2 L200.0,96.3 L201.2,96.4 L202.4,96.4" fill="none" stroke="#2563c9" stroke-width="2"/></svg>

$y = x^{-1} = \dfrac{1}{x}$
:::

::: figur
<svg viewBox="-26 -20 228 174" width="228" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till y lika med roten ur x: en kurva som startar i origo och stiger allt flackare åt höger. Den finns bara för x större än eller lika med 0."><line x1="4.0" y1="0.0" x2="4.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44.0" y1="0.0" x2="44.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84.0" y1="0.0" x2="84.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="124.0" y1="0.0" x2="124.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="164.0" y1="0.0" x2="164.0" y2="144.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="136.0" x2="180.0" y2="136.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="96.0" x2="180.0" y2="96.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="56.0" x2="180.0" y2="56.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="16.0" x2="180.0" y2="16.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="96.0" x2="188.0" y2="96.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,96.0 186.0,91.5 186.0,100.5" fill="#1f2530"/><line x1="44.0" y1="144.0" x2="44.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="44.0,-16.0 39.5,-6.0 48.5,-6.0" fill="#1f2530"/><text x="194.0" y="114.0" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="53.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="4.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="84.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="124.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="164.0" y="112.0" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="38.0" y="140.0" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="38.0" y="60.0" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="38.0" y="20.0" font-size="12" text-anchor="end" fill="#1f2530">2</text><path d="M44.0,96.0 L45.7,87.9 L47.3,84.5 L49.0,81.9 L50.6,79.8 L52.3,77.8 L53.9,76.1 L55.5,74.5 L57.2,73.0 L58.8,71.6 L60.5,70.3 L62.1,69.1 L63.8,67.9 L65.5,66.7 L67.1,65.6 L68.8,64.5 L70.4,63.5 L72.0,62.5 L73.7,61.5 L75.3,60.6 L77.0,59.7 L78.7,58.8 L80.3,57.9 L82.0,57.0 L83.6,56.2 L85.2,55.4 L86.9,54.6 L88.6,53.8 L90.2,53.0 L91.8,52.3 L93.5,51.5 L95.2,50.8 L96.8,50.0 L98.4,49.3 L100.1,48.6 L101.8,47.9 L103.4,47.3 L105.0,46.6 L106.7,45.9 L108.4,45.3 L110.0,44.6 L111.6,44.0 L113.3,43.4 L115.0,42.7 L116.6,42.1 L118.2,41.5 L119.9,40.9 L121.6,40.3 L123.2,39.7 L124.8,39.1 L126.5,38.6 L128.2,38.0 L129.8,37.4 L131.4,36.9 L133.1,36.3 L134.8,35.8 L136.4,35.2 L138.1,34.7 L139.7,34.1 L141.3,33.6 L143.0,33.1 L144.7,32.5 L146.3,32.0 L147.9,31.5 L149.6,31.0 L151.2,30.5 L152.9,30.0 L154.6,29.5 L156.2,29.0 L157.8,28.5 L159.5,28.0 L161.2,27.5 L162.8,27.1 L164.4,26.6 L166.1,26.1 L167.8,25.6 L169.4,25.2 L171.1,24.7 L172.7,24.3 L174.4,23.8 L176.0,23.3" fill="none" stroke="#c8324a" stroke-width="2"/><circle cx="44.0" cy="96.0" r="3" fill="#c8324a"/></svg>

$y = x^{1/2} = \sqrt{x}$
:::

Undersök själv: prova olika värden på exponenten $a$ (t.ex. 2, 3 eller
−1) och konstanten $C$ och se hur grafens form ändras. Startläget visar
$y = x^2$.

::: graf
titel: y = Cx^a
uttryck: C*x^a
ekvation: y = {C}x^{{a}}
C: 1, -3, 3, 0.5
a: 2, -2, 3, 1
x: -4, 4
y: -2, 6
:::

::: exempel "Exempel 1 — Funktionsvärde och ekvation"
**Låt $f(x) = x^4$.<br>a) Bestäm $f(2)$.&emsp;&emsp;b) Lös ekvationen $f(x) = 2$**

**a)** Vi sätter in $x = 2$ i funktionsuttrycket och beräknar värdet:

$$
f(2) = 2^4 = 16
$$

**Svar:** 16

**b)** Vi sätter funktionsuttrycket lika med 2 och löser ekvationen:

$$
x^4 = 2
$$

$$
x = \pm\sqrt[4]{2}
$$

(± eftersom exponenten är jämn.)

**Svar:** $x = \pm\sqrt[4]{2}$
:::

::: exempel "Exempel 2 — Funktion i funktion"
**Låt $f(x) = x^{1/2}$ och $g(x) = 4x^2$. Bestäm $f(g(2))$.**

Nu har vi en funktion i en funktion. Då räknar vi "inifrån och ut". Vi
beräknar alltså först den inre funktionen, alltså $g(2)$:

$$
g(2) = 4 \cdot 2^2 = 4 \cdot 4 = 16
$$

Därefter kan vi ersätta $g(2)$ i den yttre funktionen med 16:

$$
f(g(2)) = f(16) = 16^{1/2} = \sqrt{16} = 4
$$

**Svar:** 4
:::
