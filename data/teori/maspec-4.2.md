---
id: maspec-4.2
title: Basvektorer och vektorkoordinater
course: Matematik specialisering
chapter: Vektorer
chapterNumber: 4
section: '4.2'
---

# Basvektorer och vektorkoordinater

I förra avsnittet ritade vi vektorer och räknade med dem grafiskt. Det
fungerar, men det är omständligt och blir lätt oprecist. Här inför vi
ett sätt att beskriva en vektor med två tal, så att räkningen kan göras
med tal i stället för med linjal.

Utgångspunkten är att en vektor alltid kan **delas upp i komposanter**
längs två givna riktningar, bara riktningarna inte är parallella. I ett
plan väljer vi riktningarna med hjälp av två vektorer, $\vec{e}_x$ och
$\vec{e}_y$. Är de inte parallella kan varje vektor i planet skrivas
som en summa av en del längs $\vec{e}_x$ och en del längs
$\vec{e}_y$. Vektorparet kallas då **basvektorer**, och man säger att de
utgör en **bas**.

::: figur
<svg viewBox="-4 -6 179 130" width="243" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med basvektorerna e_x längs x-axeln och e_y längs y-axeln, båda en ruta långa. Vektorn u går från origo fyra rutor åt höger och tre uppåt. Streckade komposanter 4 e_x och 3 e_y visar uppdelningen."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="168" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="168" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="168" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="168" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="160" y2="96" stroke="#1f2530" stroke-width="1.4"/><polygon points="168,96 159,92 159,100" fill="#1f2530"/><line x1="24" y1="120" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="166" y="112" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="96.0" x2="38.0" y2="96.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,96.0) rotate(0.0)" fill="#c8324a"/><text x="36.0" y="112.8" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"></tspan></text><line x1="24.0" y1="96.0" x2="24.0" y2="82.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,72.0) rotate(-90.0)" fill="#c8324a"/><text x="15.6" y="86.4" font-size="14" text-anchor="end" fill="#c8324a"><tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">y</tspan><tspan dy="-3"></tspan></text><line x1="24.0" y1="96.0" x2="120.0" y2="96.0" stroke="#2563c9" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="120.0" y1="96.0" x2="120.0" y2="24.0" stroke="#2563c9" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="96.0" x2="112.0" y2="30.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,24.0) rotate(-36.9)" fill="#1f2530"/><text x="54.1" y="55.2" font-size="14" fill="#1f2530"><tspan font-style="italic">u</tspan></text><line x1="53.1" y1="42.199999999999996" x2="62.1" y2="42.199999999999996" stroke="#1f2530" stroke-width="1"/><polygon points="65.1,42.199999999999996 61.1,40.199999999999996 61.1,44.199999999999996" fill="#1f2530"/><text x="124.8" y="63.6" font-size="14" text-anchor="start" fill="#2563c9">3<tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">y</tspan><tspan dy="-3"></tspan></text><text x="88.8" y="112.8" font-size="14" text-anchor="middle" fill="#2563c9">4<tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"></tspan></text><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>

Vektorn $\vec{u}$ delas upp i komposanterna $4\vec{e}_x$ och
$3\vec{e}_y$. Koordinaterna för $\vec{u}$ är $(4,\ 3)$.
:::

I figuren är $\vec{u} = 4\vec{e}_x + 3\vec{e}_y$. Är basvektorerna
underförstådda räcker det att ange talen: $\vec{u} = (4,\ 3)$. Talen
4 och 3 kallas vektorns **koordinater** eller **komponenter**, och
vektorerna $4\vec{e}_x$ och $3\vec{e}_y$ är dess **komposanter**.
Basvektorerna själva har koordinaterna $\vec{e}_x = (1,\ 0)$ och
$\vec{e}_y = (0,\ 1)$. Den basen kallas **standardbasen**.

::: formel "Basvektorer och koordinater"
Om $\vec{e}_x$ och $\vec{e}_y$ inte är parallella kan varje vektor i
planet skrivas på precis ett sätt som

$$
\vec{u} = x\vec{e}_x + y\vec{e}_y = (x,\ y)
$$

- Talen $x$ och $y$ är vektorns **koordinater** (komponenter).
- Vektorerna $x\vec{e}_x$ och $y\vec{e}_y$ är vektorns **komposanter**.
- Är basvektorerna dessutom **vinkelräta** mot varandra och har
  **längden 1** kallas basen en **ON-bas** (ortonormerad bas). Det är
  den bas vi använder om inget annat sägs.
:::

Beteckningen ON står för *ortonormerad*: *orto* av ortogonal, som
betyder vinkelrät, och *normerad*, som betyder att basvektorerna har
längden 1. I ett vanligt koordinatsystem med lika långa steg på båda
axlarna är $\vec{e}_x$ och $\vec{e}_y$ just en sådan bas.

## Räkning i koordinatform

Med koordinater blir vektorräkningen enkel. När två vektorer adderas
läggs de första koordinaterna ihop för sig och de andra för sig, och
när en vektor multipliceras med ett tal multipliceras båda
koordinaterna med talet. Reglerna följer direkt av att komposanterna
längs $\vec{e}_x$ och längs $\vec{e}_y$ kan behandlas var för sig.

::: formel "Räkneregler i koordinatform"
Om $\vec{u} = (x_1,\ y_1)$, $\vec{v} = (x_2,\ y_2)$ och $k$ är ett
reellt tal gäller

$$
\vec{u} + \vec{v} = (x_1 + x_2,\ y_1 + y_2)
$$

$$
\vec{u} - \vec{v} = (x_1 - x_2,\ y_1 - y_2)
$$

$$
k\vec{u} = (kx_1,\ ky_1)
$$
:::

::: exempel "Exempel 1 — Räkna med koordinater"
**Vektorerna $\vec{u} = (2,\ -3)$ och $\vec{v} = (-4,\ 1)$ är givna.
Bestäm koordinaterna för<br>a)&nbsp;$\vec{u} + \vec{v}$&emsp;&emsp;b)&nbsp;$\vec{u} - \vec{v}$&emsp;&emsp;c)&nbsp;$4\vec{u}$<br>d)&nbsp;$3\vec{u} - 2\vec{v}$&emsp;&emsp;e)&nbsp;$2(\vec{u} + \vec{v})$**

::: handskrift
typ: koordinatrakning
:::

::: textlosning
**a)** Koordinaterna adderas var för sig:

$$
\vec{u} + \vec{v} = (2 + (-4),\ -3 + 1) = (-2,\ -2)
$$

Resultatet kan kontrolleras grafiskt: ritas $\vec{v}$ med sin start i
spetsen på $\vec{u}$ går summan två rutor åt vänster och två rutor
nedåt.

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Vektorn u går två rutor åt höger och tre nedåt. Vektorn v börjar i u:s spets och går fyra rutor åt vänster och en uppåt. Summan u plus v går från startpunkten två rutor åt vänster och två nedåt."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120.0" y1="24.0" x2="162.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="158.4" y="55.2" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="157.4" y1="42.199999999999996" x2="166.4" y2="42.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="169.4,42.199999999999996 165.4,40.199999999999996 165.4,44.199999999999996" fill="#c8324a"/><line x1="168.0" y1="96.0" x2="81.7" y2="74.4" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(-166.0)" fill="#c8324a"/><text x="121.3" y="94.8" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="120.3" y1="81.80000000000001" x2="129.3" y2="81.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="132.3,81.80000000000001 128.3,79.80000000000001 128.3,83.80000000000001" fill="#c8324a"/><line x1="120.0" y1="24.0" x2="79.1" y2="64.9" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(135.0)" fill="#2563c9"/><text x="66.6" y="33.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="65.6" y1="20.60000000000001" x2="74.6" y2="20.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="77.6,20.60000000000001 73.6,18.60000000000001 73.6,22.60000000000001" fill="#2563c9"/><text x="74.6" y="33.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="89.6" y="33.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="88.6" y1="20.60000000000001" x2="97.6" y2="20.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="100.6,20.60000000000001 96.6,18.60000000000001 96.6,22.60000000000001" fill="#2563c9"/><circle cx="120.0" cy="24.0" r="3" fill="#1f2530"/></svg>
:::

**b)** Koordinaterna subtraheras var för sig:

$$
\vec{u} - \vec{v} = (2 - (-4),\ -3 - 1) = (6,\ -4)
$$

**c)** Båda koordinaterna multipliceras med 4:

$$
4\vec{u} = (4 \cdot 2,\ 4 \cdot (-3)) = (8,\ -12)
$$

**d)** Först multiplarna, sedan subtraktionen:

$$
3\vec{u} - 2\vec{v} = (6,\ -9) - (-8,\ 2) = (6 - (-8),\ -9 - 2) = (14,\ -11)
$$

**e)** Summan $\vec{u} + \vec{v} = (-2,\ -2)$ är redan beräknad i a):

$$
2(\vec{u} + \vec{v}) = 2 \cdot (-2,\ -2) = (-4,\ -4)
$$

**Svar:** a) $(-2,\ -2)$&emsp;&emsp;b) $(6,\ -4)$&emsp;&emsp;c) $(8,\ -12)$&emsp;&emsp;d) $(14,\ -11)$&emsp;&emsp;e) $(-4,\ -4)$
:::
:::

## Parallella vektorer

I förra avsnittet såg vi att $\vec{u}$ och $k\vec{u}$ alltid är
parallella. Det ger också ett sätt att avgöra om två givna vektorer är
parallella: undersök om den ena kan skrivas som ett tal gånger den
andra. I koordinatform betyder det att båda koordinaterna ska
multipliceras med samma tal.

::: formel "Parallella vektorer"
Två vektorer $\vec{u}$ och $\vec{v}$ är parallella om och endast om det
finns ett tal $k \neq 0$ så att

$$
\vec{u} = k\vec{v}
$$

Till exempel är $(6,\ -4)$ och $(-3,\ 2)$ parallella, eftersom
$(6,\ -4) = -2 \cdot (-3,\ 2)$. Däremot är $(6,\ -4)$ och $(3,\ 2)$
inte parallella: $6 = 2 \cdot 3$, men $-4 \neq 2 \cdot 2$.
:::

::: exempel "Exempel 2 — Bestäm ett tal så att vektorerna blir parallella"
**Bestäm det reella talet $t$ så att vektorn $(5,\ 1) + t(1,\ 2)$
blir parallell med vektorn $(1,\ 1)$.**

::: handskrift
typ: parallellt
:::

::: textlosning
Vi skriver först vektorn i koordinatform:

$$
(5,\ 1) + t(1,\ 2) = (5 + t,\ 1 + 2t)
$$

Den ska vara parallell med $(1,\ 1)$, så det ska finnas ett tal $k$
sådant att

$$
(5 + t,\ 1 + 2t) = k(1,\ 1) = (k,\ k)
$$

Lika vektorer har lika koordinater. Den första koordinaten ger
$5 + t = k$ och den andra ger $1 + 2t = k$. Båda uttrycken är lika med
$k$, så de är lika med varandra:

$$
5 + t = 1 + 2t
$$

$$
t = 4
$$

Talet $k$ blir $5 + 4 = 9$. Kontroll: $(5,\ 1) + 4(1,\ 2) = (9,\ 9)
= 9 \cdot (1,\ 1)$, som mycket riktigt är parallell med $(1,\ 1)$.

::: figur
<svg viewBox="-4 -6 275 274" width="373" height="372" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Koordinatsystem. Vektorn (5, 1) från origo, sedan fyra gånger (1, 2) från dess spets upp till punkten (9, 9). Summan (9, 9) ritas blå från origo och ligger längs den streckade linjen genom origo med riktningen (1, 1)."><line x1="0" y1="0" x2="0" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="264" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="264" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="264" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="216" x2="264" y2="216" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="240" x2="264" y2="240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="264" x2="264" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="240" x2="256" y2="240" stroke="#1f2530" stroke-width="1.4"/><polygon points="264,240 255,236 255,244" fill="#1f2530"/><line x1="24" y1="264" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="262" y="256" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="240.0" x2="254.4" y2="9.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="240.0" x2="134.2" y2="218.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,216.0) rotate(-11.3)" fill="#c8324a"/><text x="96.0" y="258.0" font-size="14" text-anchor="middle" fill="#c8324a">(5, 1)</text><line x1="144.0" y1="216.0" x2="235.5" y2="32.9" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-63.4)" fill="#c8324a"/><text x="199.2" y="129.6" font-size="14" text-anchor="start" fill="#c8324a">4 · (1, 2)</text><line x1="24.0" y1="240.0" x2="232.9" y2="31.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-45.0)" fill="#2563c9"/><text x="122.4" y="88.8" font-size="14" text-anchor="end" fill="#2563c9">(9, 9) = 9 · (1, 1)</text><line x1="24.0" y1="240.0" x2="40.9" y2="223.1" stroke="#1f2530" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,216.0) rotate(-45.0)" fill="#1f2530"/><text x="62.4" y="219.6" font-size="14" text-anchor="start" fill="#1f2530">(1, 1)</text><circle cx="24.0" cy="240.0" r="3" fill="#1f2530"/></svg>
:::

**Svar:** $t = 4$
:::
:::

## Ortsvektorer och vektorn mellan två punkter

Alla vektorer med samma koordinater är samma vektor, precis som i förra
avsnittet: de tillhör samma ekvivalensklass. När vektorer ritas in i
ett koordinatsystem är det därför viktigt att skilja på en **vektors**
koordinater och en **punkts** koordinater. En punkt har ett bestämt
läge, men en vektor får flyttas.

Origo kopplar ihop de två. Den vektor i ekvivalensklassen
som börjar i origo kallas **ortsvektor**, och dess koordinater är
desamma som koordinaterna för punkten där den slutar. Punkten
$P = (4,\ 3)$ har alltså ortsvektorn $\overrightarrow{OP} = (4,\ 3)$.

::: figur
<svg viewBox="-4 -6 242 154" width="328" height="209" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Koordinatsystem med origo O, punkterna P1 och P2 och deras ortsvektorer från origo. Vektorn P1P2 går från P1 till P2 och är ritad blå."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="184" y2="120" stroke="#1f2530" stroke-width="1.4"/><polygon points="192,120 183,116 183,124" fill="#1f2530"/><line x1="24" y1="144" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="190" y="136" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="120.0" x2="45.6" y2="33.7" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,24.0) rotate(-76.0)" fill="#1f2530"/><line x1="24.0" y1="120.0" x2="134.7" y2="75.7" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(-21.8)" fill="#1f2530"/><line x1="48.0" y1="24.0" x2="135.1" y2="67.5" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(26.6)" fill="#2563c9"/><circle cx="48.0" cy="24.0" r="3" fill="#1f2530"/><circle cx="144.0" cy="72.0" r="3" fill="#1f2530"/><circle cx="24.0" cy="120.0" r="3" fill="#1f2530"/><text x="55.2" y="12.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan> = (<tspan font-style="italic">x</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan>, <tspan font-style="italic">y</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan>)</text><text x="147.6" y="82.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan> = (<tspan font-style="italic">x</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan>, <tspan font-style="italic">y</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan>)</text><text x="20.4" y="136.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">O</tspan> = (0, 0)</text><text x="98.4" y="39.6" font-size="14" fill="#2563c9"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan></text><line x1="97.4" y1="25.60000000000001" x2="124.4" y2="25.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="127.4,25.60000000000001 123.4,23.60000000000001 123.4,27.60000000000001" fill="#2563c9"/></svg>

Ortsvektorerna $\overrightarrow{OP_1}$ och $\overrightarrow{OP_2}$ går
från origo. Vektorn $\overrightarrow{P_1P_2}$ går från $P_1$ till
$P_2$.
:::

En vektor som börjar i punkten $P_1$ och slutar i punkten $P_2$
betecknas $\overrightarrow{P_1P_2}$. I figuren ser vi att man kommer
till $P_2$ antingen direkt längs $\overrightarrow{OP_2}$ eller genom
att först gå till $P_1$ och sedan längs $\overrightarrow{P_1P_2}$.
Alltså är $\overrightarrow{OP_1} + \overrightarrow{P_1P_2} =
\overrightarrow{OP_2}$, vilket ger vektorn mellan punkterna.

::: formel "Vektorn mellan två punkter"
Om $P_1 = (x_1,\ y_1)$ och $P_2 = (x_2,\ y_2)$ är

$$
\overrightarrow{P_1P_2} = \overrightarrow{OP_2} - \overrightarrow{OP_1} = (x_2 - x_1,\ y_2 - y_1)
$$

Vektorns koordinater är alltså **slutpunktens koordinater minus
startpunktens**.
:::

::: exempel "Exempel 3 — Vektorer mellan punkter"
**Punkterna $A = (-1,\ 2)$ och $B = (4,\ -1)$ är givna.
Bestäm<br>a)&nbsp;$\overrightarrow{AB}$&emsp;&emsp;b)&nbsp;$\overrightarrow{BA}$<br>c) punkten $C$ så att $\overrightarrow{AC} = (2,\ 6)$.**

::: handskrift
typ: punktvektor
:::

::: textlosning
**a)** Slutpunktens koordinater minus startpunktens:

$$
\overrightarrow{AB} = (4 - (-1),\ -1 - 2) = (5,\ -3)
$$

**b)** Nu är $B$ startpunkt och $A$ slutpunkt:

$$
\overrightarrow{BA} = (-1 - 4,\ 2 - (-1)) = (-5,\ 3)
$$

Som väntat är $\overrightarrow{BA} = -\overrightarrow{AB}$.

**c)** Punkten $C$ nås genom att gå från $A$ längs
$\overrightarrow{AC}$. Ortsvektorn till $C$ är därför
$\overrightarrow{OC} = \overrightarrow{OA} + \overrightarrow{AC}$:

$$
\overrightarrow{OC} = (-1,\ 2) + (2,\ 6) = (1,\ 8)
$$

Punkten $C$ har samma koordinater som sin ortsvektor.

**Svar:** a) $(5,\ -3)$&emsp;&emsp;b) $(-5,\ 3)$&emsp;&emsp;c) $C = (1,\ 8)$
:::
:::

## Vektorns längd i en ON-bas

I många tillämpningar behöver man veta hur lång en vektor är. Längden
kallas också vektorns **belopp** och skrivs $|\vec{u}|$. Beloppet är
ett tal som aldrig är negativt: varje vektor har en längd, och
nollvektorn är den enda med längden 0.

I en ON-bas är längden lätt att beräkna. Koordinaterna $x$ och $y$ är
kateterna i en rätvinklig triangel där vektorn är hypotenusan, så
Pythagoras sats ger längden direkt.

::: formel "Vektorns längd"
I en ON-bas har vektorn $\vec{u} = (x,\ y)$ längden

$$
|\vec{u}| = \sqrt{x^2 + y^2}
$$

::: figur
<svg viewBox="-4 -6 179 154" width="243" height="209" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Vektorn u med koordinaterna (x, y) ritad från origo. Streckade linjer bildar en rätvinklig triangel med kateterna x längs x-axeln och y lodrätt, där u är hypotenusan."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="168" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="168" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="168" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="168" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="160" y2="120" stroke="#1f2530" stroke-width="1.4"/><polygon points="168,120 159,116 159,124" fill="#1f2530"/><line x1="24" y1="144" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="166" y="136" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="120.0" x2="112.0" y2="54.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,48.0) rotate(-36.9)" fill="#2563c9"/><line x1="24.0" y1="120.0" x2="120.0" y2="120.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="120.0" y1="120.0" x2="120.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><rect x="110" y="110" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="72.0" y="132.0" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="126.0" y="86.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="30.0" y="64.8" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">u</tspan> = (<tspan font-style="italic">x</tspan>, <tspan font-style="italic">y</tspan>)</text><line x1="29.0" y1="50.80000000000001" x2="37.0" y2="50.80000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="40.0,50.80000000000001 36.0,48.80000000000001 36.0,52.80000000000001" fill="#2563c9"/><circle cx="24.0" cy="120.0" r="3" fill="#1f2530"/></svg>
:::

::: härledning "Bevis — längdformeln"
I en ON-bas är $x$-riktningen och $y$-riktningen vinkelräta mot
varandra, och ett steg är lika långt i båda riktningarna. Vektorn
$\vec{u} = (x,\ y)$ kan därför ritas som hypotenusan i en rätvinklig
triangel med kateterna $x$ och $y$, som i figuren. Pythagoras sats ger

$$
|\vec{u}|^2 = x^2 + y^2
$$

och eftersom en längd inte kan vara negativ är
$|\vec{u}| = \sqrt{x^2 + y^2}$. Är $x$ eller $y$ negativt spelar det
ingen roll, eftersom talen kvadreras.
:::
:::

::: exempel "Exempel 4 — Beräkna längder"
**Vektorerna $\vec{u} = (3,\ -4)$ och $\vec{v} = (-2,\ 1)$ är givna.
Beräkna<br>a)&nbsp;$|\vec{u}|$&emsp;&emsp;b)&nbsp;$|\vec{u} - 2\vec{v}|$**

::: handskrift
typ: koordinatbelopp
:::

::: textlosning
**a)** Koordinaterna sätts in i formeln:

$$
|\vec{u}| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5
$$

**b)** Först beräknas koordinaterna för $\vec{u} - 2\vec{v}$, sedan
längden:

$$
\vec{u} - 2\vec{v} = (3,\ -4) - (-4,\ 2) = (7,\ -6)
$$

$$
|\vec{u} - 2\vec{v}| = \sqrt{7^2 + (-6)^2} = \sqrt{49 + 36} = \sqrt{85} \approx 9{,}2
$$

**Svar:** a) $5$&emsp;&emsp;b) $\sqrt{85} \approx 9{,}2$
:::
:::

::: kuriosa "Andra sätt att mäta en vektor"
Längden $\sqrt{x^2 + y^2}$ kallas också vektorns **euklidiska norm**.
En norm är ett mått som tilldelar varje vektor ett tal som inte är
negativt, och det finns fler sådana mått än det vanliga avståndet.
Ett exempel är **maximumnormen**, det största av koordinaternas absolutbelopp: för
$(3,\ -4)$ blir den 4. Ett annat är summan av
koordinaternas absolutbelopp, här $3 + 4 = 7$, som beskriver hur långt
man går i ett rutnät av gator där man bara kan svänga i rät vinkel.
I den här kursen menar vi alltid den euklidiska normen när vi säger
längd.
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Bas och koordinater"
- **Basvektorer** $\vec{e}_x$, $\vec{e}_y$: två icke-parallella
  vektorer som varje vektor kan byggas av.
- $\vec{u} = x\vec{e}_x + y\vec{e}_y = (x,\ y)$. Talen är
  **koordinater**, delarna $x\vec{e}_x$ och $y\vec{e}_y$ är
  **komposanter**.
- **ON-bas**: basvektorerna är vinkelräta och har längden 1.
:::

::: sampunkt "Räkning i koordinatform"
- Addera och subtrahera **koordinat för koordinat**:
  $(x_1,\ y_1) + (x_2,\ y_2) = (x_1 + x_2,\ y_1 + y_2)$.
- Tal gånger vektor: båda koordinaterna multipliceras,
  $k(x,\ y) = (kx,\ ky)$.
- **Parallella** precis när $\vec{u} = k\vec{v}$ för något tal
  $k \neq 0$.
:::

::: sampunkt "Punkter och vektorer"
- **Ortsvektorn** $\overrightarrow{OP}$ går från origo och har samma
  koordinater som punkten $P$.
- $\overrightarrow{P_1P_2} = (x_2 - x_1,\ y_2 - y_1)$: slutpunkt
  minus startpunkt.
:::

::: sampunkt "Längd"
- I en ON-bas: $|\vec{u}| = \sqrt{x^2 + y^2}$ för $\vec{u} = (x,\ y)$.
- Pythagoras sats med koordinaterna som kateter. Tecknen spelar ingen
  roll eftersom talen kvadreras.
- Längden kallas också **belopp** eller euklidisk norm.
:::
:::
