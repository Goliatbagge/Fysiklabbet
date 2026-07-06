---
id: ma1c-6.1
title: Tangens för en vinkel
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.1'
---

# Tangens för en vinkel

För att beräkna sidor och vinklar i trianglar kan vi använda oss av de
**trigonometriska funktionerna**. De vanligaste är tangens (tan), sinus
(sin) och cosinus (cos).

Först repeterar vi några grundläggande begrepp i rätvinkliga trianglar.
Den längsta sidan (sidan mitt emot den räta vinkeln) kallas
**hypotenusa**. De två kortare sidorna kallas **kateter**. Kateten mitt
emot en vinkel kallas **motstående katet**. Kateten som bildar vinkeln
kallas **närliggande katet**. Se figur:

::: figur
<svg viewBox="24 30 302 130" width="302" height="130" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med vinkeln v nere till vänster. Den längsta sidan snett uppåt är hypotenusan, den lodräta sidan mitt emot vinkeln är motstående katet och den vågräta sidan intill vinkeln är närliggande katet."><polygon points="30,130 230,130 230,40" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="218.0,130.0 218.0,118.0 230.0,118.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M48.2,121.8 A20,20 0 0 1 50.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="60" y="122" font-size="13" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="118" y="66" font-size="13" fill="#2563c9" transform="rotate(-24 118 66)">Hypotenusa</text><text x="322" y="82" font-size="13" text-anchor="end" fill="#2563c9">Motstående</text><text x="238" y="97" font-size="13" fill="#2563c9">katet</text><text x="130" y="150" font-size="13" text-anchor="middle" fill="#2563c9">Närliggande katet</text></svg>
:::

Förhållandet (divisionen) mellan sidorna i en *rätvinklig triangel* kan
skrivas med de trigonometriska funktionerna. **OBS! Gäller endast
rätvinkliga trianglar!**

::: formel "Trigonometriska funktioner"
::: figur
<svg viewBox="36 28 212 128" width="212" height="128" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten a, den vågräta kateten b, hypotenusan c och vinkeln v nere till höger."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

$$
\tan v = \frac{\text{motstående katet}}{\text{närliggande katet}} = \frac{a}{b}
$$

$$
\sin v = \frac{\text{motstående katet}}{\text{hypotenusa}} = \frac{a}{c}
$$

$$
\cos v = \frac{\text{närliggande katet}}{\text{hypotenusa}} = \frac{b}{c}
$$
:::

De trigonometriska funktionerna kan beräknas med räknare. Hitta knappen
med "tan", "sin" och "cos" på din räknare!

Till sist några detaljer:

Det finns olika skrivsätt för vinklar. ∠ABC betyder den vinkel som
uppstår om man utgår från hörn *A*, går till hörn *B* och sedan till hörn
*C*. Se exempel nedan:

::: figur
<svg viewBox="16 10 240 168" width="240" height="168" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En triangel med hörnen A överst, B nere till vänster och C till höger. Vinkeln vid A är 60 grader, vid B 41 grader och vid C 79 grader."><polygon points="150,28 40,160 232,138" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><path d="M162.0,44.0 A20,20 0 0 1 137.2,43.4" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M54.1,143.1 A22,22 0 0 1 61.9,157.5" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M214.1,140.0 A18,18 0 0 1 221.2,123.6" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="150" y="20" font-size="13" text-anchor="middle" fill="#1f2530">A</text><text x="28" y="172" font-size="13" text-anchor="middle" fill="#1f2530">B</text><text x="244" y="146" font-size="13" text-anchor="middle" fill="#1f2530">C</text><text x="150" y="66" font-size="11" text-anchor="middle" fill="#1f2530">60°</text><text x="72" y="152" font-size="11" text-anchor="middle" fill="#1f2530">41°</text><text x="204" y="134" font-size="11" text-anchor="middle" fill="#1f2530">79°</text></svg>

∠ABC = 41°, ∠BCA = 79° och ∠CAB = 60°.
:::

Om vi ska ange en sträcka, men enhet saknas, så används beteckningen
l.e. (längdenheter). Se en av exempeluppgifterna nedan.

::: exempel "Exempel 1 — Tangens ur sidorna"
**Beräkna för triangeln nedan<br>a) tan $u$&emsp;&emsp;b) tan $v$.**

::: figur
<svg viewBox="34 22 226 152" width="226" height="152" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med lodräta kateten 3 centimeter, vågräta kateten 4 centimeter och hypotenusan 5 centimeter. Vinkeln u ligger överst och vinkeln v nere till höger."><polygon points="90,30 90,150 250,150" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,138.0 102.0,138.0 102.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M106.0,42.0 A20,20 0 0 1 90.0,50.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M228.0,150.0 A22,22 0 0 1 232.4,136.8" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="104" y="58" font-size="13" fill="#1f2530"><tspan font-style="italic">u</tspan></text><text x="212" y="142" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="78" y="95" font-size="13" text-anchor="end" fill="#1f2530">3 cm</text><text x="170" y="168" font-size="13" text-anchor="middle" fill="#1f2530">4 cm</text><text x="182" y="80" font-size="13" fill="#1f2530">5 cm</text></svg>
:::

**a)** Vi ska titta på förhållandet mellan motstående och närliggande
katet till vinkeln $u$:

$$
\tan u = \frac{\text{motstående katet}}{\text{närliggande katet}} = \frac{4}{3}
$$

**Svar:** $\dfrac{4}{3}$

**b)** Vi ska nu titta på förhållandet mellan motstående och närliggande
katet till vinkeln $v$:

$$
\tan v = \frac{\text{motstående katet}}{\text{närliggande katet}} = \frac{3}{4} = 0{,}75
$$

**Svar:** $\dfrac{3}{4}$ eller 0,75
:::

::: exempel "Exempel 2 — Tangens med räknaren"
**Bestäm tan 29° med din räknare.**

Vi slår tan 29° på räknaren och får

$$
\tan 29\degree = 0{,}5543\ldots \approx 0{,}554
$$

**Svar:** 0,554
:::

::: exempel "Exempel 3 — Bestäm en okänd sida"
**Bestäm längden hos sidan $x$. Figurerna är inte skalenliga.**

**a)**

::: figur
<svg viewBox="40 20 200 154" width="200" height="154" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med vinkeln 30 grader överst, den lodräta kateten 1,3 meter och den okända vågräta kateten x."><polygon points="100,28 100,150 230,150" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="100.0,138.0 112.0,138.0 112.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M114.6,41.7 A20,20 0 0 1 100.0,48.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="112" y="58" font-size="12" fill="#1f2530">30°</text><text x="88" y="95" font-size="13" text-anchor="end" fill="#1f2530">1,3 m</text><text x="165" y="168" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Vinkeln 30° har den motstående kateten $x$ och den närliggande kateten
1,3 m:

$$
\tan 30\degree = \frac{x}{1{,}3}
\qquad
x = 1{,}3 \cdot \tan 30\degree
$$

Vi slår på räknaren och får

$$
x = 0{,}750\ldots\ \mathrm{m} \approx 0{,}75\ \mathrm{m}
$$

**Svar:** 0,75 m

**b)**

::: figur
<svg viewBox="30 32 300 142" width="300" height="142" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten 5,0, vinkeln 22 grader nere till höger och den okända vågräta kateten x."><polygon points="80,40 80,150 320,150" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="80.0,138.0 92.0,138.0 92.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M296.0,150.0 A24,24 0 0 1 298.2,140.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="272" y="142" font-size="12" text-anchor="end" fill="#1f2530">22°</text><text x="68" y="100" font-size="13" text-anchor="end" fill="#1f2530">5,0</text><text x="200" y="168" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Vinkeln 22° har den motstående kateten 5,0 och den närliggande kateten
$x$:

$$
\tan 22\degree = \frac{5{,}0}{x}
\qquad
x = \frac{5{,}0}{\tan 22\degree} = 12{,}375\ldots \approx 12\ \text{l.e.}
$$

(Eftersom enhet saknas på sträckan 5,0 i uppgiften anger vi den i
längdenheter.)

**Svar:** 12 l.e.
:::
