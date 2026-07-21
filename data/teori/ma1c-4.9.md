---
id: ma1c-4.9
title: Definitionsmängd och värdemängd
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.9'
---

# Definitionsmängd och värdemängd

Möjliga värden på den

- **oberoende variabeln**, oftast $x$, kallas **definitionsmängd**
- **beroende variabeln**, oftast $y$, kallas **värdemängd**.

När vi anger definitions- och värdemängd utifrån en graf är det viktigt
att titta på hur grafens ändpunkter är markerade. En

- **ifylld ring** betyder att ändpunkten *ingår* i intervallet (markeras
  med ≤ eller ≥)
- **tom ring** betyder att ändpunkten *inte* ingår i intervallet (markeras
  med < eller >).

::: exempel "Exempel 1 — Musiktjänsten"
**En musiktjänst kostar 50 kr/månad. Erbjudandet gäller max 1 år.
Kostnaden $y$ kr för $x$ månader kan då skrivas $y = 50x$. Bestäm
funktionens<br>a) definitionsmängd&emsp;&emsp;b) värdemängd.**

**a)** Antalet månader vi betalar detta pris för tjänsten $x$ kan variera
från minst 0 till högst 12 månader. (Vi kan inte betala för tjänsten ett
negativt antal månader och priset gäller endast i 12 månader.)

**Svar:** $0 \leq x \leq 12$

**b)** I a-uppgiften fick vi att definitionsmängden var
$0 \leq x \leq 12$. Det *minsta* värdet på $y$ (kostnaden) får vi då
$x = 0$, dvs. då vi inte köper musiktjänsten alls:

$$
y(0) = 50 \cdot 0 = 0\ \mathrm{kr}
$$

Det *största* värdet på $y$ får vi då $x = 12$:

$$
y(12) = 50 \cdot 12 = 600\ \mathrm{kr}
$$

Så värdet på $y$ kan vara mellan 0 och 600 kr.

**Svar:** $0 \leq y \leq 600$
:::

::: exempel "Exempel 2 — Ur en graf"
**Bestäm definitions- och värdemängd till nedanstående funktion.**

::: figur
<svg viewBox="-26 -20 224 211" width="224" height="211" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kurvbåge som börjar med en tom ring i punkten minus 1 komma 3, stiger till en topp i 0 komma 4 och faller till en ifylld punkt i 2 komma 0."><line x1="25.2" y1="0.0" x2="25.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.2" y1="0.0" x2="67.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="109.2" y1="0.0" x2="109.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="151.2" y1="0.0" x2="151.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.2" x2="176.4" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="131.2" x2="176.4" y2="131.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="99.2" x2="176.4" y2="99.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.2" x2="176.4" y2="67.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="35.2" x2="176.4" y2="35.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="3.2" x2="176.4" y2="3.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.2" x2="184.4" y2="163.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="192.4,163.2 182.4,158.7 182.4,167.7" fill="#1f2530"/><line x1="67.2" y1="182.4" x2="67.2" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="67.2,-16.0 62.7,-6.0 71.7,-6.0" fill="#1f2530"/><text x="190.4" y="181.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="76.2" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="25.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="109.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="151.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="61.2" y="135.2" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="61.2" y="103.2" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="61.2" y="71.2" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="61.2" y="39.2" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="61.2" y="7.2" font-size="12" text-anchor="end" fill="#1f2530">5</text><path d="M25.2,67.2 L26.5,65.3 L27.7,63.5 L29.0,61.7 L30.2,60.0 L31.5,58.3 L32.8,56.7 L34.0,55.2 L35.3,53.7 L36.5,52.3 L37.8,50.9 L39.1,49.6 L40.3,48.3 L41.6,47.1 L42.8,46.0 L44.1,44.9 L45.4,43.9 L46.6,42.9 L47.9,42.0 L49.1,41.1 L50.4,40.3 L51.7,39.6 L52.9,38.9 L54.2,38.3 L55.4,37.7 L56.7,37.2 L58.0,36.7 L59.2,36.4 L60.5,36.0 L61.7,35.7 L63.0,35.5 L64.3,35.4 L65.5,35.3 L66.8,35.2 L68.0,35.2 L69.3,35.3 L70.6,35.4 L71.8,35.6 L73.1,35.8 L74.3,36.1 L75.6,36.5 L76.9,36.9 L78.1,37.4 L79.4,37.9 L80.6,38.5 L81.9,39.1 L83.2,39.8 L84.4,40.6 L85.7,41.4 L86.9,42.3 L88.2,43.2 L89.5,44.2 L90.7,45.2 L92.0,46.3 L93.2,47.5 L94.5,48.7 L95.8,50.0 L97.0,51.3 L98.3,52.7 L99.5,54.2 L100.8,55.7 L102.1,57.2 L103.3,58.9 L104.6,60.5 L105.8,62.3 L107.1,64.1 L108.4,65.9 L109.6,67.8 L110.9,69.8 L112.1,71.8 L113.4,73.9 L114.7,76.1 L115.9,78.3 L117.2,80.5 L118.4,82.8 L119.7,85.2 L121.0,87.6 L122.2,90.1 L123.5,92.7 L124.7,95.3 L126.0,97.9 L127.3,100.6 L128.5,103.4 L129.8,106.2 L131.0,109.1 L132.3,112.1 L133.6,115.1 L134.8,118.1 L136.1,121.3 L137.3,124.4 L138.6,127.7 L139.9,131.0 L141.1,134.3 L142.4,137.7 L143.6,141.2 L144.9,144.7 L146.2,148.3 L147.4,151.9 L148.7,155.6 L149.9,159.4 L151.2,163.2" fill="none" stroke="#2563c9" stroke-width="2.2"/><circle cx="25.2" cy="67.2" r="5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="151.2" cy="163.2" r="5" fill="#2563c9"/></svg>
:::

Vi börjar med att bestämma definitionsmängden som står för tillåtna
*x*-värden. Vi tittar var grafen börjar på *x*-axeln (håll t.ex. en penna
lodrätt och vandra från vänster till höger och stanna när du stöter på
grafen). Grafen startar vid $x = -1$. Ringen är inte ifylld, vilket
medför att $x > -1$.

Titta sedan var grafen slutar på *x*-axeln (håll pennan lodrät och vandra
från höger till vänster och stanna när du stöter på grafen). Grafen
slutar vid $x = 2$. Ringen är ifylld, vilket medför att $x \leq 2$.

**Definitionsmängden är alltså $-1 < x \leq 2$.**

Vi bestämmer nu värdemängden som står för tillåtna *y-värden*. Vi tittar
var grafen börjar på *y*-axeln (håll pennan vågrätt och vandra nerifrån och
upp och stanna när du stöter på grafen). Grafen startar vid $y = 0$.
Punkten där är ifylld, vilket medför att $y \geq 0$.

Titta var grafen slutar på *y*-axeln (håll pennan vågrät och vandra
uppifrån och ned och stanna när du stöter på grafen). Grafen slutar vid
$y = 4$ (toppen ligger på kurvan), vilket medför att $y \leq 4$.

**Värdemängden är alltså $0 \leq y \leq 4$.**

**Svar:** Definitionsmängd: $-1 < x \leq 2$ och värdemängd:
$0 \leq y \leq 4$
:::
