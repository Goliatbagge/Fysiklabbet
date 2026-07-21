---
id: ma3c-5.3
title: Arean under en kurva
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.3'
---

# Arean under en kurva

Vi vet sedan tidigare hur vi beräknar arean av enkla geometriska figurer,
som rektanglar och trianglar. Men hur beräknar vi arean under grafen till
en godtycklig funktion — en area som ofta har en böjd, oregelbunden rand?
Betrakta till exempel arean under grafen till $f(x) = x^2$ mellan $x = 1$
och $x = 3$. Vi ritar upp grafen och markerar det sökta området, se
figuren nedan.

::: figur
<svg viewBox="30 0 258 200" width="258" height="200" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till en funktion f av x med det skuggade exakta området under kurvan mellan x lika med a och x lika med b, samt fyra rektanglar som approximerar arean under kurvan."><line x1="34" y1="168" x2="272" y2="168" stroke="#1f2530" stroke-width="1.6"/><polygon points="282,168 272,163.5 272,172.5" fill="#1f2530"/><line x1="42" y1="178" x2="42" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="42,4 37.5,14 46.5,14" fill="#1f2530"/><text x="277" y="190" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="50" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><polygon points="90,168 90,148.5 102,144.9 122,137.2 142,127.3 162,115.2 182,100.9 202,84.4 218,69.6 218,168" fill="rgba(37,99,201,0.16)"/><rect x="90" y="137.2" width="32" height="30.8" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="122" y="120.3" width="32" height="47.7" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="154" y="97.8" width="32" height="70.2" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="186" y="69.6" width="32" height="98.4" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><path d="M42,154.8 L62,153.7 L82,150.4 L102,144.9 L122,137.2 L142,127.3 L162,115.2 L182,100.9 L202,84.4 L222,65.7 L242,44.8 L262,21.7" fill="none" stroke="#2563c9" stroke-width="2"/><text x="230" y="35" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="90" y1="164" x2="90" y2="172" stroke="#1f2530" stroke-width="1.3"/><line x1="218" y1="164" x2="218" y2="172" stroke="#1f2530" stroke-width="1.3"/><text x="90" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="218" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><line x1="154" y1="173" x2="186" y2="173" stroke="#1f2530" stroke-width="1.2"/><line x1="154" y1="170" x2="154" y2="176" stroke="#1f2530" stroke-width="1.2"/><line x1="186" y1="170" x2="186" y2="176" stroke="#1f2530" stroke-width="1.2"/><text x="170" y="188" font-size="12" text-anchor="middle" fill="#1f2530">&#916;<tspan font-style="italic">x</tspan></text></svg>
:::

::: härledning "Härledning — från rektanglar till integral"
Vi kan **approximera** (få ett ungefärligt värde på) arean genom att dela
in området under grafen i rektanglar — ibland kallade **kolonner** — och
lägga ihop deras areor. Ju fler och smalare rektanglar vi delar in
området i, desto bättre stämmer rektanglarnas sammanlagda area med den
verkliga arean under kurvan — rektanglarna "sticker ut" allt mindre från
grafen, som i figuren ovan.

Arean $A$ hos en enskild rektangel är höjden gånger bredden. Har
rektangeln bredden $\Delta x$ och en höjd som ges av funktionsvärdet
$f(x)$ kan alltså arean skrivas

$$
A = \text{höjden} \cdot \text{bredden} = f(x) \cdot \Delta x
$$

Summerar vi ett ändligt antal sådana rektangelareor från $x = a$ till
$x = b$ kan den sammanlagda (ungefärliga) arean skrivas med
summatecknet — stora grekiska bokstaven sigma, $\Sigma$ — enligt

$$
A \approx \sum_{x=a}^{b} f(x) \cdot \Delta x \qquad (1)
$$

Detta ger dock bara ett ungefärligt värde på arean. Vi har konstaterat att
ju smalare bredd $\Delta x$ rektanglarna har, desto exaktare blir arean.
Hur får vi då den exakta arean?

Vi låter $\Delta x$ gå mot 0! När $\Delta x$ går mot noll skriver vi det
$dx$ i stället. Vi ska nu summera ett **oändligt** antal oändligt smala
rektangelareor. När vi summerar ett oändligt antal termer byts
summatecknet $\Sigma$ ut mot **integraltecknet** $\int$ (ett utdraget
"s"), men symbolen står fortfarande för samma sak — en summa.

Gör vi dessa ersättningar i formel (1) ovan får vi den exakta arean

$$
A = \int_a^b f(x)\, dx
$$

Detta uttryck kallas en **integral**. Eftersom denna integral har en
undre gräns $a$ och en övre gräns $b$ kallas den en **bestämd integral**.
:::

::: tips "Bestämd integral"
$$
\int_a^b f(x)\, dx
$$

där

- $\int$ = **integraltecken** (summatecknet för oändligt många termer)
- $a$ = **undre integrationsgräns** (grafiskt, det $x$-värde där arean
  börjar)
- $b$ = **övre integrationsgräns** (grafiskt, det $x$-värde där arean
  slutar)
- $f(x)$ = **integrand** (grafiskt, den funktion vi ska beräkna arean
  under)
- $dx$ = **integrationsvariabel** (grafiskt, den oändligt smala bredden
  hos en rektangel)

Grafiskt motsvaras alltså en bestämd integral av arean mellan en
funktions graf och $x$-axeln, avgränsad av $x = a$ och $x = b$.
:::

::: formel "Areor under *x*-axeln"
En bestämd integral kan få ett **negativt värde**, nämligen om arean
under grafen ligger **under** $x$-axeln. En area kan däremot aldrig vara
negativ. Ligger området under $x$-axeln är alltså integralens värde lika
med arean, fast med motsatt (negativt) tecken.
:::

::: exempel "Exempel 1 — Beskriv en skuggad area med en integral"
**Grafen till $f(x) = 0{,}5x^2 + 1$ är ritad i ett koordinatsystem. Det
skuggade området begränsas av grafen, $x$-axeln, linjen $x = 1$ och
linjen $x = 4$. Beskriv det skuggade områdets area med en integral.**

Arean börjar vid $x = 1$ och slutar vid $x = 4$, så den undre
integrationsgränsen är $1$ och den övre är $4$. Grafens funktion är
$f(x) = 0{,}5x^2 + 1$, vilket är integranden. Arean ges alltså av

$$
\int_1^4 (0{,}5x^2 + 1)\, dx
$$

**Svar:** $\displaystyle\int_1^4 (0{,}5x^2 + 1)\, dx$
:::

## Beräkna arean utifrån en graf

::: exempel "Exempel 2 — Beräkna area och integral utifrån en graf"
**Grafen till den räta linjen $f(x) = 0{,}5x + 2$ är ritad i ett
koordinatsystem. Tillsammans med $x$-axeln, linjen $x = 2$ och linjen
$x = 6$ bildar grafen ett skuggat område.<br>
a) Beräkna den skuggade arean.&emsp;&emsp;b) Beräkna
$\displaystyle\int_2^6 (0{,}5x + 2)\, dx$ utifrån grafen.**

**a)** Vi delar in det skuggade området i en rektangel och en triangel,
båda med basen $4$ (avståndet mellan $x = 2$ och $x = 6$). Rektangelns
höjd ges av det lägsta funktionsvärdet, $f(2) = 0{,}5 \cdot 2 + 2 = 3$.
Triangelns höjd ges av **skillnaden** mellan det högsta och det lägsta
funktionsvärdet: $f(6) - f(2) = (0{,}5 \cdot 6 + 2) - 3 = 5 - 3 = 2$.

$$
A = \text{rektangelarean} + \text{triangelarean} = 4 \cdot 3 + \frac{4 \cdot 2}{2} = 12 + 4 = 16
$$

**Svar:** $16$ a.e.

**b)** Integralen motsvarar arean under grafen mellan $x = 2$ och
$x = 6$, det vill säga samma area som i a-uppgiften. Värdet av integralen
är alltså $16$ (observera att integraler, till skillnad från areor, inte
anges med någon enhet).

**Svar:** $16$
:::

::: exempel "Exempel 3 — En integral med negativt värde"
**Grafen till $f(x) = 1 - x$ är ritad i ett koordinatsystem. Tillsammans
med $x$-axeln och linjen $x = 6$ bildar grafen ett skuggat område mellan
$x = 1$ och $x = 6$. Bestäm<br>
a) den skuggade arean&emsp;&emsp;b) $\displaystyle\int_1^6 (1 - x)\, dx$.**

**a)** Området är en triangel. Grafen skär $x$-axeln vid $x = 1$ (då
$f(1) = 1 - 1 = 0$), så triangelns bas sträcker sig från $x = 1$ till
$x = 6$ och är $5$ längdenheter. Höjden ges av beloppet
$|f(6)| = |1 - 6| = 5$ längdenheter.

$$
\text{Area} = \frac{\text{basen} \cdot \text{höjden}}{2} = \frac{5 \cdot 5}{2} = 12{,}5
$$

**Svar:** $12{,}5$ a.e.

**b)** Integralen motsvarar samma område, men eftersom området ligger
**under** $x$-axeln blir integralens värde negativt. Till skillnad från i
a-uppgiften anges inte svaret med areaenheter, eftersom det är
integralens värde (inte en area) som efterfrågas.

**Svar:** $-12{,}5$
:::

## Avgöra tecknet på en integral

::: exempel "Exempel 4 — Avgör om en integral är positiv eller negativ"
**Grafen till $f(x)$ delar tillsammans med $x$-axeln in ett område i två
delar mellan $x = a$ och $x = b$: del $A$ ligger ovanför $x$-axeln och
del $B$ ligger under $x$-axeln. Del $B$ är större än del $A$. Avgör om
$\displaystyle\int_a^b f(x)\, dx$ är positiv eller negativ. Motivera ditt
svar.**

Arean under $x$-axeln (del $B$) bidrar med ett negativt värde till
integralen, medan arean ovanför $x$-axeln (del $A$) bidrar med ett
positivt värde. Eftersom del $B$ är större än del $A$ blir det negativa
bidraget större än det positiva, så integralens sammanlagda värde blir
negativt.

**Svar:** Negativ
:::
