---
id: ma2c-5.4
title: Logaritmlagarna
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.4'
---

# Logaritmlagarna

Räknereglerna för logaritmer kallas **logaritmlagarna**.

::: formel "Logaritmlagarna"
Första logaritmlagen:

$$
\lg x + \lg y = \lg xy
$$

Andra logaritmlagen:

$$
\lg x - \lg y = \lg \frac{x}{y}
$$

Tredje logaritmlagen:

$$
\lg x^p = p \cdot \lg x
$$

där $x > 0$ och $y > 0$.
:::

::: härledning "Bevis — Första logaritmlagen"
Vi skriver multiplikationen $x \cdot y$ på två sätt.

Sätt 1:

$$
x \cdot y = 10^{\lg x} \cdot 10^{\lg y} = 10^{\lg x + \lg y}
$$

Sätt 2:

$$
x \cdot y = 10^{\lg(x \cdot y)}
$$

Eftersom dessa motsvarar samma sak, måste de vara lika, så

$$
10^{\lg x + \lg y} = 10^{\lg(x \cdot y)}
$$

Eftersom vi har en likhet med samma bas, måste exponenterna vara lika,
så

$$
\lg x + \lg y = \lg xy
$$

v.s.v.
:::

::: härledning "Bevis — Andra logaritmlagen"
Vi skriver divisionen $\dfrac{x}{y}$ på två sätt.

Sätt 1:

$$
\frac{x}{y} = \frac{10^{\lg x}}{10^{\lg y}} = 10^{\lg x - \lg y}
$$

Sätt 2:

$$
\frac{x}{y} = 10^{\lg \frac{x}{y}}
$$

Eftersom dessa motsvarar samma sak, måste de vara lika, och eftersom vi
har en likhet med samma bas, måste exponenterna vara lika, så

$$
\lg x - \lg y = \lg \frac{x}{y}
$$

v.s.v.
:::

::: härledning "Bevis — Tredje logaritmlagen"
Vi skriver $x^p$ på två olika sätt.

Sätt 1:

$$
x^p = \left(10^{\lg x}\right)^p = 10^{p \cdot \lg x}
$$

Sätt 2:

$$
x^p = 10^{\lg x^p}
$$

Eftersom dessa motsvarar samma sak, måste de vara lika, och eftersom vi
har en likhet med samma bas, måste exponenterna vara lika, så

$$
p \cdot \lg x = \lg x^p
$$

v.s.v.
:::

Med den tredje logaritmlagen kan vi lösa exponentialekvationer på
ytterligare ett sätt.

::: tips "Lösa exponentialekvationer med tredje logaritmlagen"
1. Logaritmera båda led i ekvationen (sätt lg framför båda uttrycken).
2. Multiplicera ner exponenten, enligt tredje logaritmlagen, och lös
   sedan som vanligt.
:::

Vi kan nu även stöta på logaritmekvationer med flera logaritmtermer.

::: tips "Lösa logaritmekvationer med flera logaritmtermer"
Skriv om båda led som en enda logaritm med hjälp av logaritmlagarna.
Logaritmfunktionen kan därefter strykas och vi löser ekvationen som
vanligt.
:::

::: exempel "Exempel 1 — Beräkna utan räknare"
**Beräkna utan räknare<br>a) $\lg 25 + \lg 4$&emsp;&emsp;b) $\lg 3\,000 - \lg 3$**

**a)** Vi utnyttjar första logaritmlagen och får

$$
\lg 25 + \lg 4 = \lg(25 \cdot 4) = \lg 100 = 2
$$

**Svar:** 2

**b)** Vi utnyttjar andra logaritmlagen och får

$$
\lg 3\,000 - \lg 3 = \lg \frac{3\,000}{3} = \lg 1\,000 = 3
$$

**Svar:** 3
:::

::: exempel "Exempel 2 — Lös med tredje logaritmlagen"
**Lös ekvationerna med tredje logaritmlagen.<br>a) $5^x = 136$&emsp;&emsp;b) $4 \cdot 5^x = 3 \cdot 2^x$**

**a)** Vi logaritmerar båda led:

$$
\lg 5^x = \lg 136
$$

Vi multiplicerar ner exponenten och löser sedan ekvationen som vanligt:

$$
x \cdot \lg 5 = \lg 136
$$

$$
x = \frac{\lg 136}{\lg 5} \approx 3{,}05
$$

**Svar:** $x = \dfrac{\lg 136}{\lg 5} \approx 3{,}05$

**b)** Vi samlar faktorerna med exponenter på samma sida för att
därefter skriva om dem med en enda exponent. Därefter logaritmerar vi
och löser med tredje logaritmlagen.

$$
\frac{5^x}{2^x} = \frac{3}{4}
$$

$$
\left(\frac{5}{2}\right)^x = \frac{3}{4}
$$

Vi logaritmerar båda led:

$$
\lg \left(\frac{5}{2}\right)^x = \lg \left(\frac{3}{4}\right)
$$

$$
x \cdot \lg \left(\frac{5}{2}\right) = \lg \left(\frac{3}{4}\right)
$$

$$
x = \frac{\lg \left(\frac{3}{4}\right)}{\lg \left(\frac{5}{2}\right)} \approx -0{,}31
$$

**Svar:** $x = \dfrac{\lg \left(\frac{3}{4}\right)}{\lg \left(\frac{5}{2}\right)} \approx -0{,}31$
:::

::: exempel "Exempel 3 — Flera logaritmtermer"
**Lös ekvationen $2 \lg 5 + \lg 4 = \lg 2x$.**

Vi börjar med att skriva om den första termen i VL med tredje
logaritmlagen:

$$
\lg 5^2 + \lg 4 = \lg 2x
$$

$$
\lg 25 + \lg 4 = \lg 2x
$$

Vi skriver sedan om hela VL med första logaritmlagen:

$$
\lg(25 \cdot 4) = \lg 2x
$$

$$
\lg 100 = \lg 2x
$$

Vi har nu en enda logaritm i båda led och kan ta bort
logaritmfunktionen från båda sidor och sedan lösa ekvationen som
vanligt:

$$
100 = 2x
$$

$$
x = 50
$$

**Svar:** $x = 50$
:::
