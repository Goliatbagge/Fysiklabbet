---
id: ma3c-5.7
title: Tillämpningar av integraler
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.7'
---

# Tillämpningar av integraler

Vi kan använda integraler för att lösa praktiska problem inom en rad olika
områden. Kom ihåg sambandet mellan sträcka, hastighet och acceleration vid
tillämpningar: deriverar vi sträckan får vi hastigheten, och deriverar vi
hastigheten får vi accelerationen. Går vi åt andra hållet — integrerar vi —
går vi tillbaka.

::: formel "Samband mellan sträcka, hastighet och acceleration"
$$
s(t) \xrightarrow{\;\text{Derivera}\;} v(t) \xrightarrow{\;\text{Derivera}\;} a(t)
$$

$$
a(t) \xrightarrow{\;\text{Integrera}\;} v(t) \xrightarrow{\;\text{Integrera}\;} s(t)
$$
:::

Integraler kan dock användas för mer än så. Generellt kan man säga att
**integralen står för produkten av den beroende variabeln** (t.ex. $y$ eller
$f(x)$) **och den oberoende variabeln** (t.ex. $x$). Om vi t.ex. har ett
badkar som läcker vatten med en hastighet i liter per minut, som funktion av
tiden i minuter, kan vi bestämma hur många liter vatten som har läckt ut
efter en viss tid eftersom

$$
\frac{\text{liter}}{\text{minut}} \cdot \text{minut} = \text{liter}.
$$

::: formel "Tolka integraler"
En integral står för produkten av den beroende variabeln ($y$) och den
oberoende variabeln ($x$). För att få enheten för integralen tar vi alltså
"enheten för $y$" $\cdot$ "enheten för $x$".

På motsvarande sätt gäller att om vi utgår från en graf får vi enheten för
integralen genom att ta "enheten på $y$-axeln" $\cdot$ "enheten på
$x$-axeln".
:::

::: exempel "Exempel 1 — Sträcka från en hastighet-tid-funktion"
**Hastigheten $v(t)$ m/s för en bil ges av $v(t) = 40 - 40e^{-0,25t}$ där $t$
är tiden i sekunder efter start. Hur långt rör sig bilen mellan $t = 5,0$ s
och $t = 12$ s?**

Vi har en funktion för **hastigheten** och ska ta fram en **sträcka**. Vi får
då sträckan $s$ genom att integrera (se sambandet ovan). Eftersom vi ska
bestämma sträckan mellan $t = 5,0$ s och $t = 12$ s ska integralen starta vid
$t = 5,0$ och sluta vid $t = 12$. Detta ger

$$
s = \int_{5}^{12} v(t)\, dt = \int_{5}^{12} \left(40 - 40e^{-0,25t}\right) dt = \left[40t - \frac{40e^{-0,25t}}{-0,25}\right]_{5}^{12} = \left[40t + 160e^{-0,25t}\right]_{5}^{12}
$$

$$
= \left(40 \cdot 12 + 160e^{-0,25 \cdot 12}\right) - \left(40 \cdot 5 + 160e^{-0,25 \cdot 5}\right) = \left(480 + 160e^{-3}\right) - \left(200 + 160e^{-1,25}\right)
$$

$$
= 480 + 160e^{-3} - 200 - 160e^{-1,25} \approx 242 \text{ m} \approx 240 \text{ m}
$$

**Svar:** Bilen rör sig ungefär 240 m mellan $t = 5,0$ s och $t = 12$ s.
:::

::: exempel "Exempel 2 — Tolka en integral"
**Ett företag omsätter $K(t)$ kr/månad, där $t$ är tiden i månader. Tolka**

$$
\int_{0}^{12} K(t)\, dt = 3\,000\,000
$$

**i ord.**

Integralen står för produkten av den beroende variabeln och den oberoende
variabeln. Enheten för den beroende variabeln ($K(t)$) är kr/månad och
enheten för den oberoende variabeln ($t$) är månader. Vi gör en
enhetsanalys och får att integralen får enheten

$$
\frac{\text{kr}}{\text{månad}} \cdot \text{månad} = \text{kr}.
$$

Värdet av integralen, 3 000 000, står alltså för omsättningen i kronor
mellan månad 0 och månad 12, dvs. under det första året.

**Svar:** Under de 12 första månaderna (det första året) omsätter företaget
3 000 000 kr.
:::
