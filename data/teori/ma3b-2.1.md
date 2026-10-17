---
id: ma3b-2.1
title: Olikheter och system av olikheter
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.1'
---

# Olikheter och system av olikheter

Ett företag som tillverkar två produkter kan inte göra hur mycket som helst
av dem. Arbetstiden, materialet och pengarna räcker bara till en viss mängd.
Sådana begränsningar skrivs som **olikheter med två variabler**, och varje
olikhet beskriver ett område i ett koordinatsystem. I nästa avsnitt använder
vi områdena för att hitta det bästa valet. Först behöver vi kunna rita dem,
och då behövs räta linjer och ekvationssystem, som du mött i tidigare nivåer.

## Repetition: räta linjer

::: formel "Räta linjens ekvation (i k-form)"
$$
y = kx + m
$$

där

- *k* = lutning (riktningskoefficient)
- *m* = skärning med *y*-axeln
:::

En linje ritas enklast med hjälp av $m$ och $k$: börja i punkten $(0, m)$
på *y*-axeln och gå sedan ett steg åt höger och $k$ steg uppåt (nedåt om $k$
är negativt). Två specialfall behövs också. En **vågrät linje** har
ekvationen $y = b$, till exempel $y = 4$, och en **lodrät linje** har
ekvationen $x = a$, till exempel $x = 1$. Själva *x*-axeln är linjen $y = 0$
och *y*-axeln är linjen $x = 0$.

I praktiska problem skrivs linjer ofta på formen $ax + by = c$, till exempel
$2x + y = 10$. Den formen går att skriva om till $y = kx + m$ genom att
$y$ löses ut, precis som när man löser en ekvation. Ett annat snabbt sätt att
rita linjen är att sätta $x = 0$ och $y = 0$ i tur och ordning. Då får vi
linjens skärningspunkter med axlarna, och linjen dras genom dem.

## Repetition: skärningspunkt och ekvationssystem

Den punkt där två linjer skär varandra ligger på båda linjerna. Dess
koordinater uppfyller alltså båda ekvationerna samtidigt, och de är
lösningen till **ekvationssystemet**. Skärningspunkten kan läsas av i en
figur, men den kan också beräknas algebraiskt med substitutionsmetoden
eller additionsmetoden. Det är säkrast att räkna, eftersom punkten inte
alltid hamnar exakt i en ruta.

::: exempel "Exempel 1 — Skärningspunkt mellan två linjer"
**Två linjer har ekvationerna $2x + y = 10$ och $x + y = 7$.<br>a) Skriv den första linjens ekvation på formen $y = kx + m$.<br>b) Bestäm linjernas skärningspunkt.**

::: handskrift
typ: optskarning
:::

::: textlosning
**a)** Vi löser ut $y$ genom att subtrahera $2x$ från båda led.

$$
\begin{aligned}
2x + y &= 10 \\
2x + y - 2x &= 10 - 2x \\
y &= -2x + 10
\end{aligned}
$$

**Svar:** $y = -2x + 10$

**b)** Vi skriver även den andra linjen på formen $y = kx + m$.

$$
\begin{aligned}
x + y &= 7 \\
x + y - x &= 7 - x \\
y &= -x + 7
\end{aligned}
$$

I skärningspunkten har båda linjerna samma $y$-värde. Därför sätter vi
högerleden lika med varandra och löser ekvationen.

$$
\begin{aligned}
-2x + 10 &= -x + 7 \\
-2x + 10 + 2x &= -x + 7 + 2x \\
10 &= x + 7 \\
10 - 7 &= x + 7 - 7 \\
3 &= x
\end{aligned}
$$

Vi sätter in $x = 3$ i $y = -x + 7$ och får $y = -3 + 7 = 4$.

Kontroll i den första ekvationen: $2 \cdot 3 + 4 = 10$. Det stämmer.

**Svar:** $(3, 4)$
:::
:::

## Olikheter med två variabler

En rät linje delar koordinatsystemet i två delar, som kallas **halvplan**.
Linjen $y = x + 1$ i figuren nedan är gränsen. Ovanför linjen är
$y$-värdet större än $x + 1$, och under linjen är det mindre.

::: figur
<svg viewBox="-94 -195 258 264" width="350" height="358" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Linjen y lika med x plus 1 delar koordinatsystemet i två halvplan. Det blå halvplanet ovanför linjen är y större än x plus 1, det orange halvplanet under linjen är y mindre än x plus 1."><line x1="-78" y1="65" x2="-78" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-52" y1="65" x2="-52" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-26" y1="65" x2="-26" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="26" y1="65" x2="26" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52" y1="65" x2="52" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="78" y1="65" x2="78" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104" y1="65" x2="104" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="130" y1="65" x2="130" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="52" x2="143" y2="52" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="26" x2="143" y2="26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-26" x2="143" y2="-26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-52" x2="143" y2="-52" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-78" x2="143" y2="-78" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-104" x2="143" y2="-104" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-130" x2="143" y2="-130" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-156" x2="143" y2="-156" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="-91,65 -91,65 137.8,-163.8 137.8,-163.8 -91,-163.8" fill="rgba(37,99,201,0.16)" stroke="none"/><polygon points="-91,65 137.8,65 137.8,-163.8 137.8,-163.8 -91,65" fill="rgba(200,100,40,0.13)" stroke="none"/><line x1="-91" y1="0" x2="153" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="161,0 151,-4.5 151,4.5" fill="#1f2530"/><line x1="0" y1="65" x2="0" y2="-179" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-187 -4.5,-177 4.5,-177" fill="#1f2530"/><text x="159" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-181" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-78" y1="-3.5" x2="-78" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-78" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="-52" y1="-3.5" x2="-52" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-52" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="-26" y1="-3.5" x2="-26" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-26" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="26" y1="-3.5" x2="26" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="26" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="52" y1="-3.5" x2="52" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="52" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="78" y1="-3.5" x2="78" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="78" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="104" y1="-3.5" x2="104" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="104" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="130" y1="-3.5" x2="130" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="130" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="-3.5" y1="52" x2="3.5" y2="52" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="56" font-size="12" text-anchor="end" fill="#1f2530">−2</text><line x1="-3.5" y1="26" x2="3.5" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="30" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-26" x2="3.5" y2="-26" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-22" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-52" x2="3.5" y2="-52" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-48" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-78" x2="3.5" y2="-78" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-74" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-104" x2="3.5" y2="-104" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-100" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-130" x2="3.5" y2="-130" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-126" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-156" x2="3.5" y2="-156" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-152" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-91" y1="65" x2="137.8" y2="-163.8" stroke="#1f2530" stroke-width="2"/><text x="88.7" y="-124.5" font-size="13" text-anchor="middle" fill="#1f2530" transform="rotate(-45 88.7 -124.5)"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">x</tspan> + 1</text><text x="-52" y="-114.4" font-size="14" text-anchor="middle" fill="#2563c9"><tspan font-style="italic">y</tspan> &gt; <tspan font-style="italic">x</tspan> + 1</text><text x="88.4" y="-15.6" font-size="14" text-anchor="middle" fill="#b8641c"><tspan font-style="italic">y</tspan> &lt; <tspan font-style="italic">x</tspan> + 1</text></svg>

Halvplanet ovanför linjen är området $y > x + 1$. Halvplanet under linjen är
området $y < x + 1$.
:::

::: formel "Olikhet med två variabler"
- $y > kx + m$ är halvplanet **ovanför** linjen $y = kx + m$.
- $y < kx + m$ är halvplanet **under** linjen.
- Vid $<$ och $>$ hör linjen **inte** till området. Den ritas **streckad**.
- Vid $\leq$ och $\geq$ hör linjen till området. Den ritas **heldragen**.
:::

Står olikheten inte med $y$ ensamt, till exempel $x + 2y < 6$, kan vi
antingen skriva om den eller använda en **testpunkt**. Välj en punkt som
inte ligger på linjen, oftast origo $(0, 0)$, och sätt in den i olikheten.
Stämmer olikheten ligger testpunkten i området, och då skuggar vi den sida
av linjen där testpunkten ligger. Stämmer den inte skuggar vi den andra
sidan.

::: tips "Kom ihåg"
Multipliceras eller divideras båda led i en olikhet med ett **negativt**
tal vänds olikhetstecknet. Det är en vanlig felkälla när $y$ löses ut ur
till exempel $3x - y \leq 6$. Testpunkten är ett bra sätt att kontrollera
att du skuggat rätt sida.
:::

::: exempel "Exempel 2 — Rita en olikhet"
**Rita det område som beskrivs av olikheten $x + 2y < 6$.**

::: handskrift
typ: opthalvplan
:::

::: textlosning
Vi skriver om olikheten så att $y$ står ensamt. Först subtraherar vi $x$
från båda led, sedan dividerar vi båda led med 2. Två är ett positivt tal,
så olikhetstecknet behåller sin riktning.

$$
\begin{aligned}
x + 2y &< 6 \\
x + 2y - x &< 6 - x \\
2y &< -x + 6 \\
\dfrac{2y}{2} &< \dfrac{-x + 6}{2} \\
y &< -0{,}5x + 3
\end{aligned}
$$

Gränslinjen är $y = -0{,}5x + 3$. Den skär *y*-axeln i 3 och lutar nedåt:
två steg åt höger och ett steg nedåt. Olikheten är $<$, så linjen hör inte
till området och ritas streckad.

Vi kontrollerar med testpunkten $(0, 0)$: $0 + 2 \cdot 0 = 0$, och $0 < 6$
stämmer. Origo ligger alltså i området, och vi skuggar den sida av linjen
där origo ligger, det vill säga området under linjen.

::: figur
<svg viewBox="-45 -152 276 197" width="375" height="267" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Den streckade linjen x plus 2y lika med 6 går genom punkterna 0 komma 3 och 6 komma 0. Området under linjen, där origo ligger, är skuggat."><line x1="-28" y1="42" x2="-28" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28" y1="42" x2="28" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="56" y1="42" x2="56" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="42" x2="84" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="112" y1="42" x2="112" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="42" x2="140" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="42" x2="168" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="196" y1="42" x2="196" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="28" x2="210" y2="28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-28" x2="210" y2="-28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-56" x2="210" y2="-56" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-84" x2="210" y2="-84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-112" x2="210" y2="-112" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="-42,42 204.4,42 204.4,18.2 -42,-105" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-42" y1="0" x2="220" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="228,0 218,-4.5 218,4.5" fill="#1f2530"/><line x1="0" y1="42" x2="0" y2="-136" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-144 -4.5,-134 4.5,-134" fill="#1f2530"/><text x="226" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-138" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-28" y1="-3.5" x2="-28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="28" y1="-3.5" x2="28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="56" y1="-3.5" x2="56" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="56" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="84" y1="-3.5" x2="84" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="84" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="112" y1="-3.5" x2="112" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="112" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="-3.5" x2="140" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="196" y1="-3.5" x2="196" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="196" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="-3.5" y1="28" x2="3.5" y2="28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="32" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-28" x2="3.5" y2="-28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-24" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-56" x2="3.5" y2="-56" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-52" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-84" x2="3.5" y2="-84" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-80" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-112" x2="3.5" y2="-112" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-108" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-42" y1="-105" x2="204.4" y2="18.2" stroke="#2563c9" stroke-width="2" stroke-dasharray="7 5"/><text x="120.7" y="-31.5" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(26.6 120.7 -31.5)"><tspan font-style="italic">x</tspan> + 2<tspan font-style="italic">y</tspan> = 6</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="8" y="-8" font-size="12.5" text-anchor="start" fill="#c8324a">Testpunkt (0, 0)</text></svg>

Området $x + 2y < 6$. Linjen är streckad eftersom den inte hör till
området.
:::
:::
:::

## System av olikheter

Ofta ska flera olikheter gälla samtidigt. De bildar då ett **system av
olikheter**, och området som beskrivs är den del av koordinatsystemet där
**alla** olikheterna gäller. Det är området där alla de skuggade halvplanen
överlappar varandra.

Gränslinjerna möts i områdets **hörnpunkter**. En hörnpunkt är alltså en
skärningspunkt mellan två gränslinjer, och den kan beräknas med ett
ekvationssystem. I praktiska problem kan antalen inte vara negativa. Därför
finns nästan alltid villkoren $x \geq 0$ och $y \geq 0$ med. Tillsammans
betyder de att området ligger i första kvadranten, alltså till höger om
*y*-axeln och ovanför *x*-axeln.

::: exempel "Exempel 3 — Område och hörnpunkter"
**Ett område beskrivs av olikheterna $x \geq 0$, $y \geq 0$, $x + 2y \leq 8$ och $3x + y \leq 9$.<br>a) Rita området.&emsp;&emsp;b) Bestäm områdets hörnpunkter.**

::: handskrift
typ: optsystem
:::

::: textlosning
**Lösning a)** Alla olikheterna har tecknet $\leq$ eller $\geq$, så alla
gränslinjer ritas heldragna.

Linjen $x + 2y = 8$ ritar vi genom dess skärningspunkter med axlarna.
$x = 0$ ger $2y = 8$, alltså $y = 4$. $y = 0$ ger $x = 8$. Linjen går genom
$(0, 4)$ och $(8, 0)$.

Linjen $3x + y = 9$: $x = 0$ ger $y = 9$, och $y = 0$ ger $3x = 9$, alltså
$x = 3$. Linjen går genom $(0, 9)$ och $(3, 0)$.

Testpunkten $(0, 0)$ uppfyller båda olikheterna, eftersom $0 \leq 8$ och
$0 \leq 9$. Området ligger alltså på origos sida om båda linjerna, och
villkoren $x \geq 0$ och $y \geq 0$ begränsar det till första kvadranten.

::: figur
<svg viewBox="-38 -266 277 292" width="376" height="396" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Linjerna x plus 2y lika med 8 och 3x plus y lika med 9 i första kvadranten. Det skuggade området har hörnen 0 komma 0, 3 komma 0, 2 komma 3 och 0 komma 4."><line x1="25" y1="17.5" x2="25" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="50" y1="17.5" x2="50" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="75" y1="17.5" x2="75" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="100" y1="17.5" x2="100" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="125" y1="17.5" x2="125" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="17.5" x2="150" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="175" y1="17.5" x2="175" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="17.5" x2="200" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-25" x2="217.5" y2="-25" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-50" x2="217.5" y2="-50" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-75" x2="217.5" y2="-75" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-100" x2="217.5" y2="-100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-125" x2="217.5" y2="-125" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-150" x2="217.5" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-175" x2="217.5" y2="-175" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-200" x2="217.5" y2="-200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-225" x2="217.5" y2="-225" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 75,0 50,-75 0,-100" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-17.5" y1="0" x2="227.5" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="235.5,0 225.5,-4.5 225.5,4.5" fill="#1f2530"/><line x1="0" y1="17.5" x2="0" y2="-250" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-258 -4.5,-248 4.5,-248" fill="#1f2530"/><text x="233.5" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-252" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="25" y1="-3.5" x2="25" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="25" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="50" y1="-3.5" x2="50" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="50" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="75" y1="-3.5" x2="75" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="75" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="100" y1="-3.5" x2="100" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="100" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="125" y1="-3.5" x2="125" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="125" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="175" y1="-3.5" x2="175" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="175" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="200" y1="-3.5" x2="200" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="200" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="-3.5" y1="-25" x2="3.5" y2="-25" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-21" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-50" x2="3.5" y2="-50" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-46" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-75" x2="3.5" y2="-75" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-71" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-100" x2="3.5" y2="-100" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-125" x2="3.5" y2="-125" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-121" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-175" x2="3.5" y2="-175" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-171" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-200" x2="3.5" y2="-200" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-196" font-size="12" text-anchor="end" fill="#1f2530">8</text><line x1="-3.5" y1="-225" x2="3.5" y2="-225" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-221" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-10" y1="-105" x2="215" y2="7.5" stroke="#2563c9" stroke-width="2"/><text x="143.1" y="-36.3" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(26.6 143.1 -36.3)"><tspan font-style="italic">x</tspan> + 2<tspan font-style="italic">y</tspan> = 8</text><line x1="-5" y1="-240" x2="78.3" y2="10" stroke="#4a7d3a" stroke-width="2"/><text x="3" y="-163.5" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(71.6 3 -163.5)">3<tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 9</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="75" cy="0" r="3.6" fill="#c8324a"/><text x="79" y="-8" font-size="12.5" text-anchor="start" fill="#c8324a">(3, 0)</text><circle cx="50" cy="-75" r="3.6" fill="#c8324a"/><text x="58" y="-80" font-size="12.5" text-anchor="start" fill="#c8324a">(2, 3)</text><circle cx="0" cy="-100" r="3.6" fill="#c8324a"/><text x="-7" y="-96" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 4)</text></svg>

Området där alla fyra olikheterna gäller, med hörnpunkterna markerade.
:::

**Lösning b)** Tre hörnpunkter ligger på axlarna och kan läsas av direkt: $(0, 0)$,
$(3, 0)$ där linjen $3x + y = 9$ skär *x*-axeln, och $(0, 4)$ där linjen
$x + 2y = 8$ skär *y*-axeln.

Den fjärde hörnpunkten är skärningspunkten mellan de två sneda linjerna.
Vi löser ekvationssystemet med additionsmetoden.

$$
\begin{cases}
x + 2y = 8 & (1) \\
3x + y = 9 & (2)
\end{cases}
$$

Vi multiplicerar ekvation (1) med 3, så att båda ekvationerna får termen
$3x$: $3x + 6y = 24$. Sedan subtraherar vi (2) ledvis, så att $x$-termerna
tar ut varandra.

$$
\begin{aligned}
(3x + 6y) - (3x + y) &= 24 - 9 \\
5y &= 15 \\
y &= 3
\end{aligned}
$$

Vi sätter in $y = 3$ i (1), $x + 2y = 8$: $x + 2 \cdot 3 = 8$, som ger
$x = 8 - 6 = 2$. Den fjärde hörnpunkten är $(2, 3)$.

**Svar:** $(0, 0)$, $(3, 0)$, $(2, 3)$ och $(0, 4)$
:::
:::

Ibland är det tvärtom: området är givet i en figur, och vi ska skriva de
olikheter som beskriver det. Då bestämmer vi först ekvationen för varje
gränslinje. Sedan avgör vi på vilken sida av linjen området ligger, och om
linjen är streckad eller heldragen.

::: exempel "Exempel 4 — Bestäm olikheterna till ett område"
**Det skuggade området i figuren begränsas av tre linjer. Bestäm de olikheter som beskriver området.**

::: figur
<svg viewBox="-45 -183 248 231" width="337" height="314" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett skuggat triangulärt område som begränsas av en heldragen lodrät linje, en heldragen vågrät linje och en streckad lutande linje."><line x1="-28" y1="44.8" x2="-28" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28" y1="44.8" x2="28" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="56" y1="44.8" x2="56" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="44.8" x2="84" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="112" y1="44.8" x2="112" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="44.8" x2="140" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="44.8" x2="168" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="28" x2="182" y2="28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-28" x2="182" y2="-28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-56" x2="182" y2="-56" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-84" x2="182" y2="-84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-112" x2="182" y2="-112" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-140" x2="182" y2="-140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="28,0 140,-112 28,-112" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-42" y1="0" x2="192" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="200,0 190,-4.5 190,4.5" fill="#1f2530"/><line x1="0" y1="44.8" x2="0" y2="-166.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-174.8 -4.5,-164.8 4.5,-164.8" fill="#1f2530"/><text x="198" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-168.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-28" y1="-3.5" x2="-28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="28" y1="-3.5" x2="28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="56" y1="-3.5" x2="56" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="56" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="84" y1="-3.5" x2="84" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="84" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="112" y1="-3.5" x2="112" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="112" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="-3.5" x2="140" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="-3.5" y1="28" x2="3.5" y2="28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="32" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-28" x2="3.5" y2="-28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-24" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-56" x2="3.5" y2="-56" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-52" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-84" x2="3.5" y2="-84" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-80" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-112" x2="3.5" y2="-112" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-108" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-140" x2="3.5" y2="-140" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-136" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="28" y1="44.8" x2="28" y2="-154" stroke="#1f2530" stroke-width="2"/><line x1="0" y1="-112" x2="179.2" y2="-112" stroke="#1f2530" stroke-width="2"/><line x1="-16.8" y1="44.8" x2="179.2" y2="-151.2" stroke="#1f2530" stroke-width="2" stroke-dasharray="7 5"/></svg>
:::

::: handskrift
typ: optbestamolikheter
:::

::: textlosning
**Den lodräta linjen** går genom $x = 1$ på *x*-axeln, så dess ekvation är
$x = 1$. Den är heldragen och området ligger till höger om den. Det ger
$x \geq 1$.

**Den vågräta linjen** går genom 4 på *y*-axeln, så dess ekvation är
$y = 4$. Den är heldragen och området ligger under den. Det ger $y \leq 4$.

**Den sneda linjen** skär *y*-axeln i $-1$, så $m = -1$. Går vi ett steg åt
höger längs linjen går vi ett steg uppåt, så $k = 1$. Linjens ekvation är
$y = x - 1$. Den är streckad och området ligger ovanför den. Det ger
$y > x - 1$.

Vi kontrollerar med punkten $(2, 2)$, som ligger inne i området:
$2 \geq 1$, $2 \leq 4$ och $2 > 2 - 1$. Alla tre stämmer.

**Svar:**
$\begin{cases} x \geq 1 \\ y \leq 4 \\ y > x - 1 \end{cases}$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Räta linjer"
- $y = kx + m$: lutning $k$, skärning $m$ med *y*-axeln.
- $ax + by = c$ skrivs om genom att $y$ löses ut.
- Vågrät linje $y = b$, lodrät linje $x = a$.
:::

::: sampunkt "Halvplan"
- En linje delar planet i två **halvplan**.
- $y > kx + m$: **ovanför** linjen.
- $y < kx + m$: **under** linjen.
:::

::: sampunkt "Streckad eller heldragen"
- $<$ och $>$: linjen hör inte till området, **streckad**.
- $\leq$ och $\geq$: linjen hör till området, **heldragen**.
- **Testpunkt**, oftast $(0, 0)$, avgör vilken sida som skuggas.
:::

::: sampunkt "System av olikheter"
- Området där **alla** olikheter gäller samtidigt.
- $x \geq 0$ och $y \geq 0$: första kvadranten.
- **Hörnpunkter**: skärningspunkter mellan gränslinjer, beräknas med
  ekvationssystem.
:::
:::
