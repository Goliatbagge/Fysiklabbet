---
id: ma2c-3.3
title: Andragradsfunktioner och modellering
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.3'
---

# Andragradsfunktioner och modellering

För att ta reda på vilken andragradsfunktion som är uppritad finns
flera olika metoder.

::: tips "Bestämma andragradsfunktionen utifrån dess graf"
**Metod 1 — Använda nollställen och en punkt.**
Andragradsfunktioner med nollställen kan skrivas i **faktorform** som
$f(x) = k(x - x_1)(x - x_2)$ där $x_1$ och $x_2$ är funktionens
nollställen. Sätt in funktionens nollställen och bestäm sedan $k$
utifrån ytterligare en punkt på grafen (som inte får vara ett
nollställe). Om funktionen har en dubbelrot (vänder på $x$-axeln)
gäller att $x_1 = x_2$. Denna metod är att föredra om man enkelt kan
avgöra nollställena.

**Metod 2 — Använda tre punkter.**
Alla andragradsfunktioner kan skrivas i **utvecklad form** som
$f(x) = ax^2 + bx + c$, där $a$, $b$ och $c$ är konstanter. Genom att
sätta in tre valfria punkter på grafen i detta funktionsuttryck kan vi
bilda ett ekvationssystem med tre obekanta och tre ekvationer. Då kan
vi bestämma konstanterna $a$, $b$ och $c$ och därefter bestämma
funktionen. Denna metod är ofta krängligare räknemässigt, men fungerar
alltid, även om t.ex. nollställena är okända.
:::

::: exempel "Exempel 1 — Nollställen och en punkt"
**Figuren visar grafen till en andragradsfunktion $f(x)$. Bestäm $f(x)$
och svara på formen $f(x) = ax^2 + bx + c$.**

::: figur
<svg viewBox="10 -10 164 300" width="164" height="300" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En parabel med nollställen i minus 1 och 3 som går genom punkten 1 komma minus 8, där punkten är markerad."><line x1="20" y1="0" x2="20" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="0" x2="40" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="0" x2="140" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="20" x2="164" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="60" x2="164" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="140" x2="164" y2="140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="180" x2="164" y2="180" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="220" x2="164" y2="220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="260" x2="164" y2="260" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="100" x2="164" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="172,100 162,95.5 162,104.5" fill="#1f2530"/><line x1="60" y1="286" x2="60" y2="-2" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,-10 55.5,0 64.5,0" fill="#1f2530"/><text x="170" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="69" y="-2" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="32" y="114" font-size="11" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="114" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="54" y="64" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="54" y="24" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="54" y="184" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="54" y="264" font-size="11" text-anchor="end" fill="#1f2530">−8</text><path d="M 29,0 Q 80,520 131,0" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="40" cy="100" r="3" fill="#1f2530"/><circle cx="120" cy="100" r="3" fill="#1f2530"/><circle cx="80" cy="260" r="3.5" fill="#c8324a"/><text x="90" y="272" font-size="12" text-anchor="start" fill="#c8324a">(1, −8)</text></svg>
:::

Vi ser i figuren att funktionen har nollställena $x_1 = -1$ och
$x_2 = 3$, och att grafen går genom punkten (1, −8). Vi skriver
funktionen i faktorform:

$$
f(x) = k(x - (-1))(x - 3) = k(x + 1)(x - 3) \qquad (1)
$$

Vi sätter in punkten (1, −8), dvs. $x = 1$ och $f(x) = -8$, i (1) för
att bestämma $k$:

$$
-8 = k(1 + 1)(1 - 3)
$$

$$
-8 = k \cdot 2 \cdot (-2)
$$

$$
-8 = -4k \iff k = 2
$$

Vi sätter in $k = 2$ i (1) och utvecklar sedan uttrycket:

$$
f(x) = 2(x + 1)(x - 3) = 2(x^2 - 3x + x - 3) = 2(x^2 - 2x - 3)
$$

$$
f(x) = 2x^2 - 4x - 6
$$

**Svar:** $f(x) = 2x^2 - 4x - 6$
:::

::: exempel "Exempel 2 — Tre punkter"
**Figuren visar grafen till en andragradsfunktion $f(x)$ som saknar
nollställen och som går genom punkterna (−2, 1), (−1, 2) och (0, 5).
Bestäm $f(x)$.**

::: figur
<svg viewBox="6 0 168 176" width="168" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En parabel utan nollställen med minimipunkt i minus 2 komma 1, genom punkterna minus 2 komma 1, minus 1 komma 2 och 0 komma 5."><line x1="24" y1="8" x2="24" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="8" x2="48" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="8" x2="72" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="8" x2="96" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="126" x2="156" y2="126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="102" x2="156" y2="102" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="78" x2="156" y2="78" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="54" x2="156" y2="54" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="30" x2="156" y2="30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="150" x2="156" y2="150" stroke="#1f2530" stroke-width="1.6"/><polygon points="164,150 154,145.5 154,154.5" fill="#1f2530"/><line x1="120" y1="158" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,4 115.5,14 124.5,14" fill="#1f2530"/><text x="162" y="168" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="24" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="48" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−3</text><text x="72" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="96" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−1</text><path d="M 21.1,18 Q 72,234 122.9,18" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="72" cy="126" r="3.5" fill="#c8324a"/><circle cx="96" cy="102" r="3.5" fill="#c8324a"/><circle cx="120" cy="30" r="3.5" fill="#c8324a"/><text x="64" y="131" font-size="12" text-anchor="end" fill="#c8324a">(−2, 1)</text><text x="88" y="106" font-size="12" text-anchor="end" fill="#c8324a">(−1, 2)</text><text x="128" y="34" font-size="12" text-anchor="start" fill="#c8324a">(0, 5)</text></svg>
:::

Funktionen saknar nollställen och vi kan därför inte enkelt skriva den
i faktorform. Vi skriver funktionen i utvecklad form
$f(x) = ax^2 + bx + c$ och sätter in de tre punkterna, vilket bildar
ett ekvationssystem:

$$
\begin{cases}
a \cdot (-2)^2 + b \cdot (-2) + c = 1 \\
a \cdot (-1)^2 + b \cdot (-1) + c = 2 \\
a \cdot 0^2 + b \cdot 0 + c = 5
\end{cases}
$$

Vi ska nu bestämma konstanterna $a$, $b$ och $c$. Vi förenklar
ekvationerna och får

$$
\begin{cases}
4a - 2b + c = 1 & (1) \\
a - b + c = 2 & (2) \\
c = 5
\end{cases}
$$

Från den undre ekvationen har vi att $c = 5$. Insättning i ekvation (1)
och (2) ger

$$
\begin{cases}
4a - 2b + 5 = 1 & (3) \\
a - b + 5 = 2 & (4)
\end{cases}
$$

Vi använder substitutionsmetoden och löser ut $a$ från ekvation (4):

$$
a = b - 3 \qquad (5)
$$

Insättning av $a = b - 3$ i ekvation (3) ger

$$
4(b - 3) - 2b + 5 = 1
$$

$$
4b - 12 - 2b + 5 = 1
$$

$$
2b - 7 = 1 \iff 2b = 8 \iff b = 4
$$

Insättning av $b = 4$ i (5) ger

$$
a = 4 - 3 = 1
$$

Insättning av $a = 1$, $b = 4$ och $c = 5$ i $f(x) = ax^2 + bx + c$ ger

$$
f(x) = x^2 + 4x + 5
$$

**Svar:** $f(x) = x^2 + 4x + 5$
:::

::: exempel "Exempel 3 — Fontänen i Seoul"
**Avståndet längs vattenytan från en vattenstråles start till dess att
strålen träffar vattnet är ungefär $2{,}3$ m. Strålens högsta höjd över
vattenytan är ungefär $3{,}1$ m. Anta att strålens bana har samma form
som grafen till en andragradsfunktion. Bestäm en funktion som beskriver
strålens bana. (Np Ma2c vt 2013)**

Vi gör en skiss och lägger in parabeln i ett koordinatsystem. Det kan
göras på olika sätt, men vi väljer att lägga in den med start i origo.
Vi inser att vi då får nollställen vid $x = 0$ och $x = 2{,}3$.
Maximipunkten måste ligga mitt emellan dessa, dvs. vid
$x = \dfrac{0 + 2{,}3}{2} = 1{,}15$ och med $y = 3{,}1$. Vi markerar
dessa tre punkter med koordinater.

::: figur
<svg viewBox="0 -2 196 206" width="196" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En parabel genom origo och punkten 2 komma 3 noll på x-axeln, med maximipunkt i 1 komma 15 semikolon 3 komma 1."><line x1="78" y1="8" x2="78" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="8" x2="126" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="122" x2="186" y2="122" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="74" x2="186" y2="74" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="26" x2="186" y2="26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="170" x2="186" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,170 184,165.5 184,174.5" fill="#1f2530"/><line x1="30" y1="178" x2="30" y2="6" stroke="#1f2530" stroke-width="1.6"/><polygon points="30,-2 25.5,8 34.5,8" fill="#1f2530"/><text x="192" y="188" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="39" y="8" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="78" y="184" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="126" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="24" y="126" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="24" y="78" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="24" y="30" font-size="11" text-anchor="end" fill="#1f2530">3</text><path d="M 30,170 Q 85.2,-127.6 140.4,170" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="30" cy="170" r="3.5" fill="#c8324a"/><circle cx="140.4" cy="170" r="3.5" fill="#c8324a"/><circle cx="85.2" cy="21.2" r="3.5" fill="#c8324a"/><text x="85" y="12" font-size="12" text-anchor="middle" fill="#c8324a">(1,15; 3,1)</text><text x="22" y="196" font-size="12" text-anchor="start" fill="#c8324a">(0, 0)</text><text x="148" y="188" font-size="12" text-anchor="start" fill="#c8324a">(2,3; 0)</text></svg>
:::

Vi kallar funktionen $f(x)$ och skriver den i faktorform
$f(x) = k(x - x_1)(x - x_2)$ där $x_1 = 0$ och $x_2 = 2{,}3$:

$$
f(x) = k(x - 0)(x - 2{,}3)
$$

$$
f(x) = kx(x - 2{,}3) \qquad (1)
$$

Vi sätter in punkten (1,15; 3,1), dvs. $x = 1{,}15$ och
$f(x) = 3{,}1$, i (1) för att bestämma $k$:

$$
3{,}1 = k \cdot 1{,}15(1{,}15 - 2{,}3)
$$

$$
3{,}1 = k \cdot 1{,}15 \cdot (-1{,}15)
$$

$$
3{,}1 = -1{,}3225k
$$

$$
k = \frac{3{,}1}{-1{,}3225} = -2{,}344\ldots
$$

Insättning av $k = -2{,}344\ldots$ i (1) ger

$$
f(x) = -2{,}344\ldots x(x - 2{,}3)
$$

Vi utvecklar funktionsuttrycket och får

$$
f(x) = -2{,}344\ldots x^2 + 5{,}391\ldots x
$$

Vi avrundar koefficienterna till två decimaler och får

$$
f(x) = -2{,}34x^2 + 5{,}39x
$$

**Svar:** $f(x) = -2{,}34x^2 + 5{,}39x$
:::

## Undersök faktorformen själv

Undersök hur faktorformen $y = k(x - p)(x - q)$ formar parabeln —
$p$ och $q$ är nollställena och $k$ styr hur "brant" parabeln är och åt
vilket håll den öppnar sig. Startläget visar exempel 1:s funktion
$f(x) = 2(x + 1)(x - 3)$.

::: graf
titel: y = k(x - p)(x - q)
uttryck: k*(x - p)*(x - q)
ekvation: y = {k}(x - {p})(x - {q})
k: 2, -3, 3, 0.5
p: -1, -5, 5, 1
q: 3, -5, 5, 1
x: -6, 6
y: -9, 5
:::
