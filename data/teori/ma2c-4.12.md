---
id: ma2c-4.12
title: Kordasatsen och inskrivna fyrhörningar
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.12'
---

# Kordasatsen och inskrivna fyrhörningar

En sträcka mellan två punkter på en cirkels rand kallas **korda**.

::: formel "Kordasatsen"
Om två kordor skär varandra är produkten av den ena kordans
delsträckor lika med produkten av den andra kordans delsträckor.

$$
a \cdot b = c \cdot d
$$
:::

::: figur
<svg viewBox="8 8 128 128" width="128" height="128" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En cirkel med två kordor som skär varandra. Den ena kordans delar är a och b, den andra kordans delar är c och d."><circle cx="70" cy="70" r="56" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="42" y1="21.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.4"/><line x1="14.2" y1="74.9" x2="124.1" y2="55.5" stroke="#1f2530" stroke-width="1.4"/><text x="45" y="46" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="84" y="99" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="36" y="64" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="95" y="52" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">d</tspan></text></svg>
:::

::: härledning "Bevis — Kordasatsen"
Vi ritar två godtyckliga korsande kordor $AC$ och $BD$ som skär
varandra i punkten $E$, och ritar två hjälpsträckor $AD$ och $BC$
enligt figuren nedan.

::: figur
<svg viewBox="2 2 142 142" width="142" height="142" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En cirkel med kordorna A C och B D som skär varandra i punkten E, samt hjälpsträckorna A D och B C."><circle cx="70" cy="70" r="56" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="42" y1="21.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.4"/><line x1="14.2" y1="74.9" x2="124.1" y2="55.5" stroke="#1f2530" stroke-width="1.4"/><line x1="42" y1="21.5" x2="14.2" y2="74.9" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><line x1="124.1" y1="55.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><text x="40" y="15" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="132" y="52" font-size="12" text-anchor="start" fill="#1f2530">B</text><text x="92" y="136" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="8" y="82" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="66" y="60" font-size="12" text-anchor="middle" fill="#1f2530">E</text></svg>
:::

Vi jämför trianglarna $ADE$ och $BCE$:

$$
\angle ADB = \angle ACB \quad \text{(randvinklar på samma båge)}
$$

$$
\angle DAC = \angle DBC \quad \text{(randvinklar på samma båge)}
$$

$$
\angle AED = \angle BEC \quad \text{(vertikalvinklar)}
$$

Trianglarnas vinklar är lika $\implies \triangle ADE \sim \triangle BCE$
(likformiga). Vi ställer upp sidförhållandena, med $a = AE$, $b = EC$,
$c = DE$ och $d = EB$:

$$
\frac{a}{d} = \frac{c}{b}
$$

Korsvis multiplikation ger

$$
a \cdot b = c \cdot d
$$

v.s.b.
:::

En fyrhörning med samtliga hörn på en cirkels rand kallas **inskriven
fyrhörning**.

::: formel "Motstående vinklar i inskriven fyrhörning"
Summan av motstående vinklar i en inskriven fyrhörning är 180°.

$$
u + v = 180°
$$

$$
x + y = 180°
$$
:::

::: härledning "Bevis — Motstående vinklar i inskriven fyrhörning"
Vi ritar en godtycklig inskriven fyrhörning. Vi kallar två motstående
hörn för $u$ och $v$ och vill visa att $u + v = 180°$. Vi drar två
hjälpsträckor från två motstående hörn till cirkelns medelpunkt enligt
figuren nedan.

::: figur
<svg viewBox="6 6 144 144" width="144" height="144" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En cirkel med en inskriven fyrhörning. Vinklarna u och v i två motstående hörn är markerade, och hjälpsträckor är dragna till medelpunkten där medelpunktsvinklarna 2v och 2u bildas."><circle cx="80" cy="80" r="62" fill="none" stroke="#1f2530" stroke-width="1.6"/><polygon points="63.9,20.1 18.9,90.8 58.8,138.3 138.3,58.8" fill="none" stroke="#1f2530" stroke-width="1.4"/><line x1="80" y1="80" x2="63.9" y2="20.1" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><line x1="80" y1="80" x2="58.8" y2="138.3" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><circle cx="80" cy="80" r="2.4" fill="#1f2530"/><path d="M 26.6,100 A 12 12 0 0 0 25.4,80.7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="36" y="93" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">v</tspan></text><path d="M 129.1,68 A 13 13 0 0 1 126.8,52.8" fill="none" stroke="#1f2530" stroke-width="1"/><text x="116" y="66" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">u</tspan></text><path d="M 76.5,66.8 A 13.7 13.7 0 1 1 75.3,92.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="104" y="84" font-size="11" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">v</tspan></text><path d="M 73.5,97.9 A 19 19 0 0 1 75.1,61.7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="53" y="82" font-size="11" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">u</tspan></text></svg>
:::

Enligt randvinkelsatsen är medelpunktsvinklarna då $2u$ respektive
$2v$. Då gäller

$$
2u + 2v = 360° \quad \text{(ett varv)}
$$

Vi dividerar båda led med 2 och får

$$
u + v = 180°
$$

v.s.b.
:::

::: exempel "Exempel 1 — Kordasatsen"
**Bestäm längden av sidan markerad $x$.**

::: figur
<svg viewBox="8 6 172 161" width="172" height="161" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En cirkel med två kordor som skär varandra. Den ena kordans delar är x och 10 millimeter, den andra kordans delar är 18 och 20 millimeter."><circle cx="85" cy="85" r="72" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="104.9" y1="15.8" x2="76.7" y2="156.5" stroke="#1f2530" stroke-width="1.4"/><line x1="19.5" y1="115" x2="150.5" y2="115" stroke="#1f2530" stroke-width="1.4"/><circle cx="104.9" cy="15.8" r="2.4" fill="#1f2530"/><circle cx="76.7" cy="156.5" r="2.4" fill="#1f2530"/><circle cx="19.5" cy="115" r="2.4" fill="#1f2530"/><circle cx="150.5" cy="115" r="2.4" fill="#1f2530"/><circle cx="85" cy="115" r="2.4" fill="#1f2530"/><text x="101" y="64" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="74" y="140" font-size="12" text-anchor="end" fill="#1f2530">10</text><text x="52" y="110" font-size="12" text-anchor="middle" fill="#1f2530">18</text><text x="117" y="110" font-size="12" text-anchor="middle" fill="#1f2530">20</text><text x="176" y="16" font-size="11" text-anchor="end" fill="#1f2530">(mm)</text></svg>
:::

Kordasatsen ger

$$
10x = 18 \cdot 20
$$

Vi förenklar och löser ut $x$:

$$
10x = 360
$$

$$
x = \frac{360}{10} = 36
$$

**Svar:** 36 mm
:::

::: exempel "Exempel 2 — Inskriven fyrhörning"
**Bestäm vinkeln $x$.**

::: figur
<svg viewBox="8 8 140 140" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En cirkel med medelpunkten M och en inskriven fyrhörning. Vinkeln 115 grader är markerad i det övre hörnet och vinkeln x i det motstående nedre hörnet."><circle cx="80" cy="80" r="62" fill="none" stroke="#1f2530" stroke-width="1.6"/><polygon points="63.9,20.1 18.9,90.8 58.8,138.3 138.3,58.8" fill="none" stroke="#1f2530" stroke-width="1.4"/><circle cx="80" cy="80" r="2" fill="#1f2530"/><text x="87" y="86" font-size="11" text-anchor="start" fill="#1f2530">M</text><path d="M 56.9,31.1 A 13 13 0 0 0 75.4,26.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="66" y="48" font-size="11" text-anchor="middle" fill="#1f2530">115°</text><path d="M 50.4,128.3 A 13 13 0 0 1 68,129.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="56" y="118" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

Motstående vinklar i en inskriven fyrhörning är tillsammans 180°:

$$
x + 115° = 180° \quad \text{(motstående vinklar i inskriven fyrhörning)}
$$

$$
x = 180° - 115° = 65°
$$

**Svar:** $x = 65°$
:::
