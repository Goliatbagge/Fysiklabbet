---
id: ma1c-4.10
title: Exponentialfunktioner
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.10'
---

# Exponentialfunktioner

**Exponentialfunktioner** är funktioner där den oberoende variabeln,
t.ex. $x$, är i **exponenten**.

::: exempel "Exempel 1 — Kapital som växer"
**Ett kapital på 25 000 kr ökar varje år med 2 %. Ange en formel för
kapitalet $K$ kr efter $x$ år.**

Förändringsfaktorn för en ökning med 2 % är 1,02. Efter

| Tid | Kapital (kr) |
| --- | --- |
| 0 år | $25\,000$ |
| 1 år | $25\,000 \cdot 1{,}02$ |
| 2 år | $25\,000 \cdot 1{,}02^2$ |
| 3 år | $25\,000 \cdot 1{,}02^3$ |
| $x$ år | $25\,000 \cdot 1{,}02^x$ |

så $K(x) = 25\,000 \cdot 1{,}02^x$.

**Svar:** $K(x) = 25\,000 \cdot 1{,}02^x$
:::

::: formel "Exponentiell förändring"
Om man ska ställa upp en formel för en exponentiell förändring (något som
ökar/minskar med en viss procent med tiden) gäller:

$$
y = Ca^x
$$

där

- $y$ = värdet efter en viss tid
- $C$ = ursprungliga värdet
- $a$ = förändringsfaktorn
- $x$ = tid
:::

::: exempel "Exempel 2 — Tolka en exponentialfunktion"
**En bils värde $V$ efter $t$ år ges av funktionen
$V(t) = 180\,000 \cdot 0{,}85^t$. Vad står 180 000 respektive 0,85
för?**

Jämför med formeln $y = Ca^x$ ovan: 180 000 motsvarar $C$ (det
ursprungliga värdet) och 0,85 motsvarar $a$ (förändringsfaktorn).

**Svar:** Bilens nyvärde (ursprungliga värde) är 180 000 kr och värdet
minskar varje år med 15 % (förändringsfaktorn är 0,85).
:::

## Exponentialfunktioners utseende

::: figur
<svg viewBox="-26 -20 240 208" width="240" height="208" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en exponentiell ökning: kurvan ligger nära noll till vänster, passerar 0 komma 1 och stiger allt brantare åt höger."><line x1="2.6" y1="0.0" x2="2.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28.6" y1="0.0" x2="28.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="54.6" y1="0.0" x2="54.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="80.6" y1="0.0" x2="80.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="106.6" y1="0.0" x2="106.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132.6" y1="0.0" x2="132.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.6" y1="0.0" x2="158.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="184.6" y1="0.0" x2="184.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.8" x2="192.4" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="137.8" x2="192.4" y2="137.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.8" x2="192.4" y2="111.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="85.8" x2="192.4" y2="85.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="59.8" x2="192.4" y2="59.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="33.8" x2="192.4" y2="33.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="7.8" x2="192.4" y2="7.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.8" x2="200.4" y2="163.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="208.4,163.8 198.4,159.3 198.4,168.3" fill="#1f2530"/><line x1="80.6" y1="163.8" x2="80.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="80.6,-16.0 76.1,-6.0 85.1,-6.0" fill="#1f2530"/><text x="206.4" y="181.8" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="89.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="2.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="28.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="54.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="106.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="132.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="184.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="74.6" y="141.8" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="74.6" y="115.8" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="74.6" y="89.8" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="74.6" y="63.8" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="74.6" y="37.8" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="74.6" y="11.8" font-size="12" text-anchor="end" fill="#1f2530">6</text><path d="M1.3,157.6 L2.8,157.4 L4.3,157.3 L5.9,157.1 L7.4,156.9 L8.9,156.7 L10.4,156.5 L11.9,156.3 L13.4,156.1 L15.0,155.9 L16.5,155.6 L18.0,155.4 L19.5,155.2 L21.0,154.9 L22.5,154.7 L24.1,154.4 L25.6,154.2 L27.1,153.9 L28.6,153.6 L30.1,153.4 L31.6,153.1 L33.2,152.8 L34.7,152.5 L36.2,152.2 L37.7,151.8 L39.2,151.5 L40.7,151.2 L42.3,150.8 L43.8,150.4 L45.3,150.1 L46.8,149.7 L48.3,149.3 L49.8,148.9 L51.4,148.5 L52.9,148.1 L54.4,147.6 L55.9,147.2 L57.4,146.7 L58.9,146.2 L60.5,145.7 L62.0,145.2 L63.5,144.7 L65.0,144.2 L66.5,143.6 L68.0,143.1 L69.6,142.5 L71.1,141.9 L72.6,141.3 L74.1,140.7 L75.6,140.0 L77.1,139.4 L78.7,138.7 L80.2,138.0 L81.7,137.3 L83.2,136.5 L84.7,135.8 L86.2,135.0 L87.8,134.2 L89.3,133.4 L90.8,132.5 L92.3,131.7 L93.8,130.8 L95.3,129.9 L96.9,128.9 L98.4,128.0 L99.9,127.0 L101.4,125.9 L102.9,124.9 L104.4,123.8 L106.0,122.7 L107.5,121.5 L109.0,120.4 L110.5,119.2 L112.0,117.9 L113.5,116.6 L115.1,115.3 L116.6,114.0 L118.1,112.6 L119.6,111.2 L121.1,109.7 L122.6,108.2 L124.2,106.7 L125.7,105.1 L127.2,103.4 L128.7,101.8 L130.2,100.0 L131.7,98.3 L133.2,96.5 L134.8,94.6 L136.3,92.7 L137.8,90.7 L139.3,88.6 L140.8,86.6 L142.3,84.4 L143.9,82.2 L145.4,79.9 L146.9,77.6 L148.4,75.2 L149.9,72.7 L151.5,70.2 L153.0,67.6 L154.5,64.9 L156.0,62.2 L157.5,59.4 L159.0,56.5 L160.6,53.5 L162.1,50.4 L163.6,47.3 L165.1,44.0 L166.6,40.7 L168.1,37.3 L169.7,33.8 L171.2,30.1 L172.7,26.4 L174.2,22.6 L175.7,18.7 L177.2,14.7 L178.8,10.5 L180.3,6.2 L181.8,1.9 L183.3,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>

**Exponentiell ökning:** $y = Ca^x$ där $a > 1$. Kan t.ex. beskriva
befolkningstillväxt.
:::

::: figur
<svg viewBox="-26 -20 240 208" width="240" height="208" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en exponentiell minskning: kurvan kommer brant uppifrån till vänster, passerar 0 komma 1 och planar ut mot noll åt höger."><line x1="2.6" y1="0.0" x2="2.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28.6" y1="0.0" x2="28.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="54.6" y1="0.0" x2="54.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="80.6" y1="0.0" x2="80.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="106.6" y1="0.0" x2="106.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132.6" y1="0.0" x2="132.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.6" y1="0.0" x2="158.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="184.6" y1="0.0" x2="184.6" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.8" x2="192.4" y2="163.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="137.8" x2="192.4" y2="137.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.8" x2="192.4" y2="111.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="85.8" x2="192.4" y2="85.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="59.8" x2="192.4" y2="59.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="33.8" x2="192.4" y2="33.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="7.8" x2="192.4" y2="7.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.8" x2="200.4" y2="163.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="208.4,163.8 198.4,159.3 198.4,168.3" fill="#1f2530"/><line x1="80.6" y1="163.8" x2="80.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="80.6,-16.0 76.1,-6.0 85.1,-6.0" fill="#1f2530"/><text x="206.4" y="181.8" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="89.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="2.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="28.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="54.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="106.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="132.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="184.6" y="179.8" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="74.6" y="141.8" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="74.6" y="115.8" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="74.6" y="89.8" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="74.6" y="63.8" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="74.6" y="37.8" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="74.6" y="11.8" font-size="12" text-anchor="end" fill="#1f2530">6</text><path d="M1.3,54.8 L2.9,57.8 L4.5,60.8 L6.0,63.7 L7.6,66.6 L9.2,69.3 L10.8,72.0 L12.4,74.5 L14.0,77.1 L15.5,79.5 L17.1,81.9 L18.7,84.2 L20.3,86.4 L21.9,88.6 L23.4,90.7 L25.0,92.8 L26.6,94.8 L28.2,96.7 L29.8,98.6 L31.4,100.5 L32.9,102.3 L34.5,104.0 L36.1,105.7 L37.7,107.3 L39.3,108.9 L40.8,110.5 L42.4,112.0 L44.0,113.4 L45.6,114.8 L47.2,116.2 L48.8,117.6 L50.3,118.9 L51.9,120.1 L53.5,121.4 L55.1,122.6 L56.7,123.7 L58.2,124.8 L59.8,125.9 L61.4,127.0 L63.0,128.1 L64.6,129.1 L66.1,130.0 L67.7,131.0 L69.3,131.9 L70.9,132.8 L72.5,133.7 L74.1,134.5 L75.6,135.4 L77.2,136.2 L78.8,136.9 L80.4,137.7 L82.0,138.4 L83.5,139.1 L85.1,139.8 L86.7,140.5 L88.3,141.2 L89.9,141.8 L91.5,142.4 L93.0,143.0 L94.6,143.6 L96.2,144.2 L97.8,144.7 L99.4,145.3 L100.9,145.8 L102.5,146.3 L104.1,146.8 L105.7,147.3 L107.3,147.7 L108.9,148.2 L110.4,148.6 L112.0,149.1 L113.6,149.5 L115.2,149.9 L116.8,150.3 L118.3,150.7 L119.9,151.0 L121.5,151.4 L123.1,151.7 L124.7,152.1 L126.3,152.4 L127.8,152.7 L129.4,153.0 L131.0,153.3 L132.6,153.6 L134.2,153.9 L135.7,154.2 L137.3,154.5 L138.9,154.7 L140.5,155.0 L142.1,155.2 L143.7,155.5 L145.2,155.7 L146.8,155.9 L148.4,156.2 L150.0,156.4 L151.6,156.6 L153.1,156.8 L154.7,157.0 L156.3,157.2 L157.9,157.4 L159.5,157.6 L161.0,157.7 L162.6,157.9 L164.2,158.1 L165.8,158.2 L167.4,158.4 L169.0,158.5 L170.5,158.7 L172.1,158.8 L173.7,159.0 L175.3,159.1 L176.9,159.2 L178.4,159.4 L180.0,159.5 L181.6,159.6 L183.2,159.7 L184.8,159.8 L186.4,160.0 L187.9,160.1 L189.5,160.2 L191.1,160.3" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>

**Exponentiell minskning:** $y = Ca^x$ där $0 < a < 1$. Kan t.ex.
beskriva radioaktivt sönderfall.
:::

Undersök själv hur $C$ och $a$ formar exponentialfunktionen. Den röda
pricken visar skärningen med *y*-axeln — den ligger alltid i höjd med $C$,
eftersom $y = C \cdot a^0 = C$ när $x = 0$. Prova värden på
förändringsfaktorn $a$ både över och under 1.

::: graf
titel: y = C \cdot a^x
uttryck: C*a^x
ekvation: y = {C} \cdot {a}^x
C: 1, 0.5, 4, 0.5
a: 1.5, 0.2, 2.5, 0.1
x: -4, 4
y: -1, 7
:::

::: exempel "Exempel 3 — Vilken funktion är uppritad?"
**Vilken funktion är uppritad: $f(x) = 3^x$ eller $g(x) = 2^x$?**

::: figur
<svg viewBox="-26 -20 219 195" width="219" height="195" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En exponentialkurva som passerar 0 komma 1 och 1 komma 2 och stiger brant: grafen till g av x lika med 2 upphöjt till x."><line x1="3.0" y1="0.0" x2="3.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="33.0" y1="0.0" x2="33.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="63.0" y1="0.0" x2="63.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.0" y1="0.0" x2="93.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="123.0" y1="0.0" x2="123.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="153.0" y1="0.0" x2="153.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="151.2" x2="171.0" y2="151.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="123.2" x2="171.0" y2="123.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="95.2" x2="171.0" y2="95.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.2" x2="171.0" y2="67.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="39.2" x2="171.0" y2="39.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.2" x2="171.0" y2="11.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="151.2" x2="179.0" y2="151.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="187.0,151.2 177.0,146.7 177.0,155.7" fill="#1f2530"/><line x1="93.0" y1="151.2" x2="93.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="93.0,-16.0 88.5,-6.0 97.5,-6.0" fill="#1f2530"/><text x="185.0" y="169.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="102.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="3.0" y="167.2" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="33.0" y="167.2" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="63.0" y="167.2" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="123.0" y="167.2" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="153.0" y="167.2" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="87.0" y="127.2" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="87.0" y="99.2" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="87.0" y="71.2" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="87.0" y="43.2" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="87.0" y="15.2" font-size="12" text-anchor="end" fill="#1f2530">5</text><path d="M1.5,147.8 L2.9,147.7 L4.2,147.6 L5.6,147.5 L7.0,147.4 L8.4,147.2 L9.7,147.1 L11.1,147.0 L12.5,146.8 L13.8,146.7 L15.2,146.6 L16.6,146.4 L17.9,146.3 L19.3,146.1 L20.7,145.9 L22.1,145.8 L23.4,145.6 L24.8,145.4 L26.2,145.2 L27.5,145.0 L28.9,144.8 L30.3,144.6 L31.6,144.4 L33.0,144.2 L34.4,144.0 L35.8,143.7 L37.1,143.5 L38.5,143.3 L39.9,143.0 L41.2,142.7 L42.6,142.5 L44.0,142.2 L45.3,141.9 L46.7,141.6 L48.1,141.3 L49.5,141.0 L50.8,140.6 L52.2,140.3 L53.6,139.9 L54.9,139.6 L56.3,139.2 L57.7,138.8 L59.0,138.4 L60.4,138.0 L61.8,137.6 L63.2,137.2 L64.5,136.7 L65.9,136.2 L67.3,135.8 L68.6,135.3 L70.0,134.7 L71.4,134.2 L72.7,133.7 L74.1,133.1 L75.5,132.5 L76.9,131.9 L78.2,131.3 L79.6,130.7 L81.0,130.0 L82.3,129.3 L83.7,128.6 L85.1,127.9 L86.4,127.1 L87.8,126.4 L89.2,125.6 L90.6,124.7 L91.9,123.9 L93.3,123.0 L94.7,122.1 L96.0,121.2 L97.4,120.2 L98.8,119.2 L100.1,118.2 L101.5,117.1 L102.9,116.0 L104.3,114.9 L105.6,113.7 L107.0,112.5 L108.4,111.3 L109.7,110.0 L111.1,108.7 L112.5,107.3 L113.8,105.9 L115.2,104.4 L116.6,102.9 L118.0,101.4 L119.3,99.8 L120.7,98.1 L122.1,96.4 L123.4,94.6 L124.8,92.8 L126.2,90.9 L127.5,89.0 L128.9,87.0 L130.3,84.9 L131.7,82.8 L133.0,80.6 L134.4,78.3 L135.8,76.0 L137.1,73.6 L138.5,71.1 L139.9,68.5 L141.2,65.8 L142.6,63.1 L144.0,60.3 L145.4,57.3 L146.7,54.3 L148.1,51.2 L149.5,48.0 L150.8,44.7 L152.2,41.3 L153.6,37.7 L154.9,34.1 L156.3,30.3 L157.7,26.4 L159.1,22.4 L160.4,18.3 L161.8,14.0 L163.2,9.6 L164.5,5.0 L165.9,0.3" fill="none" stroke="#2563c9" stroke-width="2"/></svg>
:::

Testar att beräkna några punkter på $f(x) = 3^x$:

$f(0) = 3^0 = 1$, så (0, 1) ska vara på kurvan (stämmer).

$f(1) = 3^1 = 3$, så (1, 3) ska vara på kurvan (stämmer ej!).

Slutsats: $f(x) = 3^x$ är INTE uppritad.

Testar att beräkna några punkter på $g(x) = 2^x$:

$g(0) = 2^0 = 1$, så (0, 1) ska vara på kurvan (stämmer).

$g(1) = 2^1 = 2$, så (1, 2) ska vara på kurvan (stämmer).

Slutsats: $g(x) = 2^x$ är uppritad!

**Svar:** $g(x) = 2^x$
:::
