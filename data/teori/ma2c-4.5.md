---
id: ma2c-4.5
title: Pythagoras sats
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.5'
---

# Pythagoras sats

Om vi vet två sidor i en rätvinklig triangel kan vi ta reda på den
tredje med **Pythagoras sats**. Triangelns längsta sida (mitt emot den
räta vinkeln) kallas **hypotenusa** och de två övriga sidorna kallas
**kateter**.

::: formel "Pythagoras sats"
$$
a^2 + b^2 = c^2
$$

Summan av kvadraterna på de två kortare sidorna är lika med kvadraten
på hypotenusan.
:::

::: figur
<svg viewBox="16 20 184 82" width="184" height="82" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En rätvinklig triangel med kateterna a och b och hypotenusan c."><polygon points="24,82 176,82 176,26" fill="none" stroke="#1f2530" stroke-width="1.8"/><rect x="165" y="71" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="100" y="96" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="184" y="58" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="92" y="46" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

::: härledning "Härledning — Pythagoras sats"
**1.** Vi bildar en godtycklig rätvinklig triangel med kateterna $a$
och $b$, och hypotenusan $c$.

**2.** Vi bildar sedan fyra likadana sådana trianglar och betecknar
vinklarna som inte är räta för $\alpha$ och $\beta$. För varje triangel
gäller

$$
90° + \alpha + \beta = 180° \quad \text{(vinkelsumma i triangel)}
$$

Vi subtraherar 90° från varje led och får

$$
\alpha + \beta = 90°
$$

**3.** Vi arrangerar trianglarna så att de bildar en stor kvadrat med
sidan $(a + b)$, med en mindre fyrhörning med sidan $c$ inskriven
(se figuren). I varje "skarv" längs den stora kvadratens sidor gäller

$$
\alpha + \beta + \text{mellanliggande vinkeln} = 180° \quad \text{(sidovinklar)}
$$

och eftersom $\alpha + \beta = 90°$ måste den mellanliggande vinkeln
vara 90°. Den inskrivna fyrhörningen med sidan $c$ är alltså en
kvadrat.

::: figur
<svg viewBox="6 6 194 196" width="194" height="196" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En stor kvadrat med sidan a plus b uppbyggd av fyra rätvinkliga trianglar och en inskriven kvadrat med sidan c."><rect x="20" y="20" width="160" height="160" fill="none" stroke="#1f2530" stroke-width="1.8"/><polygon points="110,20 180,110 90,180 20,90" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="65" y="14" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="145" y="14" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="188" y="70" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="188" y="150" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="55" y="196" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="145" y="196" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="12" y="60" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="12" y="140" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="133" y="76" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="73" y="70" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

**4.** Vi tecknar arean för den stora kvadraten på två sätt.

Varje sida i den stora kvadraten är $(a + b)$ så

$$
\text{Area} = (a + b)^2 = a^2 + 2ab + b^2 \qquad (1)
$$

Vi kan även teckna arean av den stora kvadraten som den sammanlagda
arean av de fyra trianglarna och den lilla inskrivna kvadraten. Arean
hos varje triangel är $\dfrac{ab}{2}$ och arean hos den inskrivna
kvadraten är $c^2$. Detta ger

$$
\text{Area} = 4 \cdot \frac{ab}{2} + c^2 = 2ab + c^2 \qquad (2)
$$

Vi har nu tecknat arean på den stora kvadraten på två olika sätt och
dessa uttryck måste såklart vara lika stora, dvs. (1) = (2). Detta ger

$$
a^2 + 2ab + b^2 = 2ab + c^2
$$

Vi subtraherar $2ab$ från båda led:

$$
a^2 + b^2 = c^2
$$

v.s.v.
:::

Om triangeln är rätvinklig, så gäller $a^2 + b^2 = c^2$. Men
omvändningen gäller också, dvs. om $a^2 + b^2 = c^2$, så är triangeln
rätvinklig. Detta är alltså en ekvivalens, så

$$
a^2 + b^2 = c^2 \iff \text{Triangeln är rätvinklig}
$$

::: exempel "Exempel 1 — Bestäm sidan"
**Bestäm sidan $x$.**

::: figur
<svg viewBox="14 14 176 112" width="176" height="112" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="En rätvinklig triangel med den lodräta kateten 9 centimeter, hypotenusan 15 centimeter och den vågräta kateten x."><polygon points="34,22 34,102 158,102" fill="none" stroke="#1f2530" stroke-width="1.8"/><rect x="34" y="91" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="26" y="66" font-size="13" text-anchor="end" fill="#1f2530">9</text><text x="102" y="52" font-size="13" text-anchor="start" fill="#1f2530">15</text><text x="96" y="118" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="184" y="30" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Sidan 15 cm är hypotenusa eftersom den är mitt emot den räta vinkeln.
Pythagoras sats ger

$$
x^2 + 9^2 = 15^2
$$

Vi beräknar och löser ut $x$:

$$
x^2 + 81 = 225
$$

$$
x^2 = 144
$$

$$
x = \pm\sqrt{144} = \pm 12
$$

Sidan måste vara positiv, så vi bortser från den negativa lösningen, så
$x = 12$ cm.

**Svar:** 12 cm
:::

::: exempel "Exempel 2 — Är triangeln rätvinklig?"
**Sidorna i en triangel är 8 cm, 15 cm och 20 cm. Är triangeln
rätvinklig?**

Om triangeln är rätvinklig ska summan av kvadraterna hos de korta
sidorna vara lika med kvadraten hos den längsta sidan.

$$
a^2 + b^2 = 8^2 + 15^2 = 64 + 225 = 289
$$

$$
c^2 = 20^2 = 400
$$

$289 \neq 400$, alltså gäller inte $a^2 + b^2 = c^2$ och då är
triangeln **inte** rätvinklig.

**Svar:** Nej
:::
