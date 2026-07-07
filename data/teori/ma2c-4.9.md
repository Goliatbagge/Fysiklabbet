---
id: ma2c-4.9
title: Triangelsatserna
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.9'
---

# Triangelsatserna

Vi ska nu titta på några speciella samband i trianglar som tillsammans
kallas **triangelsatserna**.

::: formel "Topptriangelsatsen"
En parallelltransversal bildar en topptriangel som är likformig med den
ursprungliga triangeln.

$$
\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}
$$

$$
\frac{a}{a + b} = \frac{c}{c + d} = \frac{e}{f}
$$
:::

::: figur
<svg viewBox="8 6 216 152" width="216" height="152" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel A B C med en parallelltransversal genom punkterna D och E. Sträckorna a, b, c, d, e och f är markerade."><polygon points="100,20 25,135 195,135" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="16" y1="66" x2="216" y2="66" stroke="#1f2530" stroke-width="1.4"/><text x="100" y="14" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="19" y="148" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="201" y="148" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="62" y="62" font-size="12" text-anchor="end" fill="#1f2530">D</text><text x="139" y="62" font-size="12" text-anchor="start" fill="#1f2530">E</text><text x="78" y="42" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="42" y="102" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="122" y="42" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="172" y="102" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">d</tspan></text><text x="100" y="80" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">e</tspan></text><text x="110" y="130" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan></text></svg>
:::

Parallelltransversalen är parallell med sidan $BC$; $a = AD$, $b = DB$,
$c = AE$, $d = EC$, $e = DE$ och $f = BC$.

::: härledning "Bevis — Topptriangelsatsen"
$\angle A$ är gemensam vinkel i $\triangle ABC$ och $\triangle ADE$.

$\angle ABC = \angle ADE$ (likbelägna vinklar)

$\triangle ABC$ och $\triangle ADE$ har alltså två lika vinklar
$\implies \triangle ABC \sim \triangle ADE$ (trianglarna är
likformiga).

Förhållandet mellan motsvarande sidor är då lika, dvs.

$$
\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}
$$

v.s.b.
:::

::: formel "Transversalsatsen"
En parallelltransversal delar en triangels sidor i samma förhållande.

$$
\frac{AD}{DB} = \frac{AE}{EC}
$$

$$
\frac{a}{b} = \frac{c}{d}
$$
:::

::: härledning "Bevis — Transversalsatsen"
Sedan tidigare har vi visat $\triangle ABC \sim \triangle ADE$. Detta
ger

$$
\frac{a}{a + b} = \frac{c}{c + d}
$$

Vi inverterar båda led, delar upp bråken och löser sedan ut
$\dfrac{a}{b}$:

$$
\frac{a + b}{a} = \frac{c + d}{c}
$$

$$
\frac{a}{a} + \frac{b}{a} = \frac{c}{c} + \frac{d}{c}
$$

$$
1 + \frac{b}{a} = 1 + \frac{d}{c}
$$

Vi subtraherar 1 från båda led:

$$
\frac{b}{a} = \frac{d}{c}
$$

Vi inverterar båda led:

$$
\frac{a}{b} = \frac{c}{d}
$$

v.s.b.
:::

::: tips "Topptriangelsatsen eller transversalsatsen?"
Om vi ska använda en triangelsats där topptriangelns bas

- **används** kan vi endast använda topptriangelsatsen.
- **inte används** kan vi använda både topptriangelsatsen och
  transversalsatsen. Tumregeln är då att använda transversalsatsen
  eftersom räkningen ofta blir enklare och snabbare.
:::

::: formel "Bisektrissatsen"
En bisektris (en stråle som delar en vinkel mitt itu) delar en triangel
enligt förhållandet

$$
\frac{AD}{BD} = \frac{AC}{BC}
$$
:::

::: figur
<svg viewBox="10 -2 180 154" width="180" height="154" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel A B C där bisektrisen från C delar vinkeln vid C mitt itu och träffar sidan A B i punkten D."><polygon points="20,130 170,130 100,18" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="100" y1="18" x2="96.6" y2="130" stroke="#1f2530" stroke-width="1.4"/><path d="M 91.9,29.4 A 14 14 0 0 0 99.6,32" fill="none" stroke="#1f2530" stroke-width="1"/><path d="M 99.6,32 A 14 14 0 0 0 107.4,29.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="96" y="10" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="14" y="143" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="176" y="143" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="96.6" y="144" font-size="12" text-anchor="middle" fill="#1f2530">D</text></svg>
:::

::: härledning "Bevis — Bisektrissatsen"
Vi ritar en godtycklig triangel $ABC$ och ritar in en bisektris $AD$
(där $D$ ligger på sidan $BC$). Vi vill visa att
$\dfrac{CD}{BD} = \dfrac{AC}{AB}$.

Vi förlänger bisektrisen till en punkt $P$, så att sträckorna $AB$ och
$BP$ blir lika långa och bildar då en likbent triangel $\triangle ABP$.

::: figur
<svg viewBox="0 4 236 136" width="236" height="136" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Triangeln A B C med bisektrisen från A genom punkten D på sidan B C, förlängd till punkten P så att B P är lika lång som A B."><polygon points="12,78 108,28 98,117" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="12" y1="78" x2="102.7" y2="75.5" stroke="#1f2530" stroke-width="1.4"/><line x1="102.7" y1="75.5" x2="206.6" y2="72.7" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="6 5"/><line x1="108" y1="28" x2="206.6" y2="72.7" stroke="#1f2530" stroke-width="1.4"/><text x="6" y="82" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="110" y="18" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="98" y="131" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="107" y="90" font-size="12" text-anchor="start" fill="#1f2530">D</text><text x="212" y="77" font-size="12" text-anchor="start" fill="#1f2530">P</text><line x1="57.9" y1="49" x2="62.1" y2="57" stroke="#1f2530" stroke-width="1.3"/><line x1="159.2" y1="46.3" x2="155.4" y2="54.5" stroke="#1f2530" stroke-width="1.3"/></svg>
:::

Vi studerar $\triangle ACD$ och $\triangle BDP$:

$\angle BAD = \angle BPD$ (basvinklar i likbent triangel
$\triangle ABP$)

$\angle BAD = \angle CAD$ (per definition eftersom $AP$ är en bisektris
som delar dem lika)

Alltså gäller

$$
\angle BPD = \angle CAD
$$

$$
\angle BDP = \angle ADC \quad \text{(vertikalvinklar)}
$$

$\triangle ACD$ och $\triangle BDP$ har alltså två lika vinklar och är
likformiga. Vi ställer upp sidförhållandena:

$$
\frac{CD}{BD} = \frac{AC}{BP}
$$

Eftersom $BP = AB$ kan vi ersätta $BP$ med $AB$, vilket ger

$$
\frac{CD}{BD} = \frac{AC}{AB}
$$

v.s.b.
:::

::: exempel "Exempel 1 — Parallelltransversal"
**Bestäm sidan $x$.**

::: figur
<svg viewBox="10 -2 214 156" width="214" height="156" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel med en parallelltransversal genom D och E. Övre delen av vänstra sidan är 4, nedre delen 8, övre delen av högra sidan är x och nedre delen 10 centimeter."><polygon points="95,16 25,135 190,135" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="18" y1="55.7" x2="200" y2="55.7" stroke="#1f2530" stroke-width="1.4"/><text x="95" y="10" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="19" y="148" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="196" y="148" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="66" y="51" font-size="12" text-anchor="end" fill="#1f2530">D</text><text x="130" y="51" font-size="12" text-anchor="start" fill="#1f2530">E</text><text x="78" y="38" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="42" y="100" font-size="11" text-anchor="end" fill="#1f2530">8</text><text x="117" y="38" font-size="11" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="166" y="100" font-size="11" text-anchor="start" fill="#1f2530">10</text><text x="222" y="14" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Eftersom vi inte räknar på trianglarnas baser kan vi använda både
transversalsatsen och topptriangelsatsen. Välj en metod. (Tumregeln är
att använda transversalsatsen när det är möjligt.)

**Transversalsatsen ger**

$$
\frac{x}{10} = \frac{4}{8}
$$

$$
x = \frac{4}{8} \cdot 10 = 5
$$

**Topptriangelsatsen ger**

$$
\frac{4}{4 + 8} = \frac{x}{x + 10}
$$

$$
\frac{4}{12} = \frac{x}{x + 10}
$$

Korsvis multiplikation ger

$$
4(x + 10) = 12x
$$

$$
4x + 40 = 12x
$$

$$
40 = 8x \iff x = 5
$$

**Svar:** 5 cm
:::

::: exempel "Exempel 2 — Bisektris"
**Bestäm sidan $x$.**

::: figur
<svg viewBox="8 0 240 142" width="240" height="142" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En triangel där en bisektris från det vänstra hörnet delar motstående sida i delarna 3 och 5. Sidan mot 3-delen är 9 och basen är x centimeter."><polygon points="15,120 119.8,68 210,120" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="15" y1="120" x2="153.6" y2="87.5" stroke="#1f2530" stroke-width="1.4"/><path d="M 49,120 A 34 34 0 0 0 48.1,112.2" fill="none" stroke="#1f2530" stroke-width="1"/><path d="M 48.1,112.2 A 34 34 0 0 0 45.5,104.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="62" y="86" font-size="11" text-anchor="middle" fill="#1f2530">9</text><text x="143" y="70" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="188" y="96" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="112" y="134" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="244" y="14" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Bisektrissatsen ger

$$
\frac{5}{3} = \frac{x}{9}
$$

Vi multiplicerar båda led med 9 för att lösa ut $x$:

$$
x = \frac{5}{3} \cdot 9 = \frac{45}{3} = 15
$$

**Svar:** 15 cm
:::
