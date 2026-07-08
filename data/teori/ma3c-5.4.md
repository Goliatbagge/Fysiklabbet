---
id: ma3c-5.4
title: Integralkalkylens fundamentalsats
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.4'
---

# Integralkalkylens fundamentalsats

Sedan tidigare vet vi att en bestämd integral grafiskt motsvarar arean
mellan en funktions graf och $x$-axeln, och att arean i princip kan
bestämmas genom att summera oändligt många smala rektangelareor. Men hur
beräknar vi integralen i praktiken, utan att behöva summera oändligt många
rektanglar? Svaret ligger i sambandet mellan integraler och primitiva
funktioner.

::: härledning "Härledning — Integralkalkylens fundamentalsats"
Tankesätt: om vi har en funktion $F(x)$ vars förändring vi vill undersöka
från $x = a$ till $x = b$ kan detta skrivas som "slutvärde" = "startvärde"
+ "summan av alla förändringar i $y$-led", dvs.

$$
F(b) = F(a) + \int_a^b F'(x)\, dx
$$

Eftersom $F'(x) = f(x)$ kan detta skrivas

$$
F(b) = F(a) + \int_a^b f(x)\, dx
$$

Vi löser ut integralen och får integralkalkylens fundamentalsats.

$$
\int_a^b f(x)\, dx = F(b) - F(a)
$$
:::

Vi kan alltså beräkna integralen exakt med hjälp av primitiva funktioner!
Detta samband kallas **integralkalkylens fundamentalsats**.

Differensen $F(b) - F(a)$ kan skrivas med det nya skrivsättet
$\big[F(x)\big]_a^b$.

::: formel "Integralkalkylens fundamentalsats"
$$
\int_a^b f(x)\, dx = \Big[F(x)\Big]_a^b = F(b) - F(a)
$$
:::

::: exempel "Exempel 1 — Beräkna integraler med primitiva funktioner"
**Beräkna integralerna med primitiva funktioner.**

$$
\text{a)}\ \int_1^3 2x\, dx \qquad \text{b)}\ \int_1^5 (x^2 - 4)\, dx
$$

**a)** Den primitiva funktionen till $f(x) = 2x$ är $F(x) = x^2$. Vi sätter
den primitiva funktionen inom klammer med gränserna och får

$$
\int_1^3 2x\, dx = \Big[x^2\Big]_1^3
$$

Vi sätter därefter in den övre gränsen $x = 3$ i den primitiva funktionen,
för att sedan subtrahera med det vi får då vi sätter in den undre gränsen
$x = 1$.

$$
\Big[x^2\Big]_1^3 = 3^2 - (1^2) = 9 - 1 = 8
$$

**Svar:** $8$

**b)** Vi löser b-uppgiften på motsvarande sätt som a-uppgiften. Extra
viktigt när den primitiva funktionen har flera termer är att sätta en
**parentes** runt hela uttrycket innan vi sätter in den undre gränsen —
annars blir tecknen fel.

$$
\int_1^5 (x^2 - 4)\, dx = \left[\frac{x^3}{3} - 4x\right]_1^5 = \frac{5^3}{3} - 4 \cdot 5 - \left(\frac{1^3}{3} - 4 \cdot 1\right)
$$

$$
= \frac{125}{3} - 20 - \left(\frac{1}{3} - 4\right) = \frac{125}{3} - \frac{60}{3} - \left(\frac{1}{3} - \frac{12}{3}\right) = \frac{65}{3} - \left(-\frac{11}{3}\right) = \frac{65}{3} + \frac{11}{3} = \frac{76}{3}
$$

**Svar:** $\dfrac{76}{3}$
:::

::: härledning "OBS — glöm inte parentesen"
Om den primitiva funktionen har flera termer **måste** du sätta parentes
runt hela uttrycket innan du sätter in den undre gränsen. Annars är risken
stor att minustecknet bara påverkar den första termen i stället för alla
termer i uttrycket — vilket ger fel svar. Jämför exempel 1b ovan:

$$
-\left(\frac{1}{3} - 4\right) = -\frac{1}{3} + 4 \qquad \text{men} \qquad -\frac{1}{3} - 4 \ \text{är fel.}
$$
:::
