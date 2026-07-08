---
id: ma3c-4.6
title: Extremvärdesproblem
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.6'
---

# Extremvärdesproblem

Problem som handlar om att bestämma ett "största/maximala" eller
"minsta/minimala" värde kallas **extremvärdesproblem** eller
**optimeringsproblem**. Vi löser extremvärdesproblem på samma sätt som när
vi tar fram extrempunkter — med tillägget att vi också ska tolka vårt
resultat i problemets sammanhang.

::: tips "Steg för steg"
1. Ställ upp en funktion för den storhet som ska maximeras eller
   minimeras.
2. Derivera funktionen.
3. Sätt derivatan lika med 0 och lös ekvationen. Det ger det $x$-värde
   som kan ge det största eller minsta värdet.
4. Bestäm extrempunktens karaktär (maximi- eller minimipunkt) med
   andraderivatan eller ett teckenschema.
5. Sätt in $x$-värdet i den ursprungliga funktionen för att få fram
   extremvärdet.
6. Tolka resultatet i problemets sammanhang.
:::

::: exempel "Exempel 1 — Maximal intäkt"
**Per anordnar en fest. Intäkten $I$ kr med biljettpriset $x$ kr ges av
formeln $I(x) = 300x - 2x^2$.<br>a) Vilket biljettpris ger maximal intäkt
och vad blir då intäkten?&emsp;&emsp;b) Förklara varför formeln ser ut
som den gör.**

**a)** Vi börjar med att ta reda på vilket biljettpris $x$ som ger
maximal intäkt. Vi deriverar den ursprungliga funktionen, sätter
derivatan lika med 0 och löser ekvationen för att få det biljettpris som
kan ge den största intäkten.

$$
I(x) = 300x - 2x^2 \qquad \Rightarrow \qquad I'(x) = 300 - 4x
$$

$I'(x) = 0$ ger

$$
300 - 4x = 0 \quad \Rightarrow \quad 4x = 300 \quad \Rightarrow \quad x = 75
$$

Vi har alltså en maximal eller minimal intäkt då biljettpriset är 75 kr.

Vi sätter in $x$-värdet 75 i den ursprungliga funktionen
$I(x) = 300x - 2x^2$ för att få fram intäkten vid biljettpriset 75 kr.

$$
I(75) = 300 \cdot 75 - 2 \cdot 75^2 = 22\,500 - 11\,250 = 11\,250
$$

Vi bestämmer extrempunktens karaktär genom att sätta in $x$-värdet i
andraderivatan och undersöka tecknet. Sedan tidigare har vi
$I'(x) = 300 - 4x$, vilket ger

$$
I''(x) = -4
$$

Eftersom $I''(75) = -4 < 0$ (negativ) är extrempunkten en
**maximipunkt**. Vi hade också kunnat avgöra karaktären genom att
konstatera att $I$ är en andragradsfunktion med **negativ**
$x^2$-term, vilket alltid ger en maximipunkt.

Den maximala intäkten är alltså 11 250 kr då biljettpriset är 75 kr.

**Svar:** Biljettpriset 75 kr ger den maximala intäkten 11 250 kr.

**b)** Intäkten ges av formeln

$$
\text{intäkt} = \text{biljettpris} \cdot \text{antal sålda biljetter}
$$

Om vi faktoriserar formeln för intäkten kan vi jämföra den med formeln
ovan.

$$
I(x) = 300x - 2x^2 = x(300 - 2x)
$$

Vi jämför $I(x) = x \cdot (300 - 2x)$ med
$\text{intäkt} = \text{biljettpris} \cdot \text{antal sålda biljetter}$.
Vi vet att $I$ står för intäkten och att $x$ står för biljettpriset. Då
måste faktorn $(300 - 2x)$ stå för antalet sålda biljetter. Att antalet
sålda biljetter är $(300 - 2x)$ kan vi tolka som att det vid fritt
inträde ($x = 0$) säljs 300 biljetter, och att det för varje krona
biljettpriset ökar säljs 2 biljetter färre.

**Svar:** Formeln motsvarar intäkt $=$ biljettpris $\cdot$ antal sålda
biljetter. Vid gratis inträde säljs 300 biljetter, och för varje krona
biljettpriset ökar säljs 2 biljetter färre.
:::

::: exempel "Exempel 2 — Maximal area"
**Vanja har köpt 60 meter stängsel för att göra en rektangulär hästhage
där en av sidorna ska utgöras av en mur (inget stängsel behövs där). Se
figur.<br>a) Teckna ett uttryck för hagens area.&emsp;&emsp;b) Vilken är
den maximala area hagen kan få?**

::: figur
<svg viewBox="22 4 246 162" width="246" height="162" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En rektangulär hage mot en mur: murens band överst, hagen under med de två lika sidorna x och den tredje sidan 60 minus 2x."><rect x="24" y="10" width="212" height="16" fill="rgba(31,37,48,0.12)" stroke="#1f2530" stroke-width="1" stroke-dasharray="5 4"/><text x="130" y="22" font-size="12" text-anchor="middle" fill="#1f2530">Mur</text><rect x="44" y="26" width="172" height="100" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="32" y1="30" x2="32" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="32,26 28.8,33 35.2,33" fill="#1f2530"/><polygon points="32,126 28.8,119 35.2,119" fill="#1f2530"/><text x="24" y="80" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="228" y1="30" x2="228" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="228,26 224.8,33 231.2,33" fill="#1f2530"/><polygon points="228,126 224.8,119 231.2,119" fill="#1f2530"/><text x="236" y="80" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="48" y1="140" x2="212" y2="140" stroke="#1f2530" stroke-width="1.2"/><polygon points="44,140 51,136.8 51,143.2" fill="#1f2530"/><polygon points="216,140 209,136.8 209,143.2" fill="#1f2530"/><text x="130" y="160" font-size="13" text-anchor="middle" fill="#1f2530">60 − 2<tspan font-style="italic">x</tspan></text><text x="266" y="16" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

**a)** Vi låter sidorna mot muren vara $x$ meter. Stängslet på den
tredje sidan kommer då att vara $(60 - 2x)$ meter, eftersom Vanja hade
60 meter stängsel och $2x$ har gått åt till de övriga två sidorna. Se
figur.

Vi kallar hagens area för $A$. Eftersom den har formen av en rektangel
gäller

$$
A = \text{basen} \cdot \text{höjden}
$$

vilket ger

$$
A(x) = (60 - 2x) \cdot x = x(60 - 2x) = 60x - 2x^2
$$

**Svar:** $A(x) = x(60 - 2x)$ eller $A(x) = 60x - 2x^2$

**b)** Vi ska nu bestämma den maximala arean — vi har alltså ett
extremvärdesproblem! Vi deriverar funktionen som ska optimeras, sätter
derivatan lika med 0 och löser ekvationen för att få det $x$-värde som
kan ge den största arean.

$$
A(x) = 60x - 2x^2 \qquad \Rightarrow \qquad A'(x) = 60 - 4x
$$

$A'(x) = 0$ ger

$$
60 - 4x = 0 \quad \Rightarrow \quad 4x = 60 \quad \Rightarrow \quad x = 15
$$

Vi har alltså en maximal eller minimal area då $x = 15$ meter.

Vi sätter in $x$-värdet i den ursprungliga funktionen
$A(x) = 60x - 2x^2$ för att få fram vilken area den ger.

$$
A(15) = 60 \cdot 15 - 2 \cdot 15^2 = 900 - 450 = 450
$$

Vi bestämmer extrempunktens karaktär genom att sätta in $x$-värdet i
andraderivatan och undersöka tecknet. Sedan tidigare hade vi
$A'(x) = 60 - 4x$, vilket ger

$$
A''(x) = -4
$$

Eftersom $A''(15) = -4 < 0$ (negativ) är extrempunkten en
**maximipunkt**, så den area vi räknat ut är ett maximivärde.

Den maximala arean är alltså $450\ \mathrm{m}^2$ när $x = 15$ meter.

**Svar:** Den maximala arean är $450\ \mathrm{m}^2$.
:::
