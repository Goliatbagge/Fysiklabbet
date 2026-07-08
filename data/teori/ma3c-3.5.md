---
id: ma3c-3.5
title: Derivatan av eᵏˣ och aˣ
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.5'
---

# Derivatan av eᵏˣ och aˣ

Vi har sett att derivatan till $f(x) = e^x$ är $f'(x) = e^x$, eller ännu mer
generellt att derivatan till $f(x) = ae^x$ är $f'(x) = ae^x$ — funktionerna
är sina egna derivator.

Nu undersöker vi derivatan till en exponentialfunktion med en koefficient i
exponenten, $f(x) = e^{kx}$, med hjälp av derivatans definition.

## Koefficient i exponenten

::: härledning "Derivatan för $f(x) = e^{kx}$ med derivatans definition"
Vi undersöker derivatan för $f(x) = e^{kx}$ genom att studera derivatan till
$f(x) = e^{3x}$ med derivatans definition.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
= \lim_{h \to 0} \frac{e^{3(x+h)} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x+3h} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x} \cdot e^{3h} - e^{3x}}{h}
= \lim_{h \to 0} \frac{e^{3x}(e^{3h} - 1)}{h}
$$

Eftersom faktorn $e^{3x}$ inte beror av $h$ kan den flyttas framför
gränsvärdet, så

$$
f'(x) = e^{3x} \lim_{h \to 0} \frac{e^{3h} - 1}{h}
$$

Med räknare kan vi visa att $\lim\limits_{h \to 0} \dfrac{e^{3h} - 1}{h}$ går
mot 3 när $h$ går mot 0, så

$$
f'(x) = e^{3x} \cdot 3
$$

$f(x) = e^{3x}$ har alltså derivatan $f'(x) = 3e^{3x}$.

På motsvarande sätt kan vi visa att t.ex. $f(x) = e^{4x}$ har derivatan
$f'(x) = 4e^{4x}$ och att $f(x) = e^{5x}$ har derivatan $f'(x) = 5e^{5x}$.

**Slutsats:** Om $f(x) = e^{kx}$ så gäller att $f'(x) = ke^{kx}$.
:::

::: formel "Derivatan av $f(x) = e^{kx}$"
Om $f(x) = e^{kx}$ så gäller att

$$
f'(x) = k \cdot e^{kx}
$$
:::

::: exempel "Exempel 1 — Derivera exponentialfunktioner med basen e"
**Derivera<br>
a) $f(x) = 3e^x$&emsp;&emsp;b) $f(x) = e^{4x}$&emsp;&emsp;c) $f(x) = 2e^{5x}$&emsp;&emsp;d) $f(x) = 12e^{x/3}$**

**a)** När vi deriverar en exponentialfunktion med basen $e$ **utan**
koefficient i exponenten blir derivatan densamma som funktionen.

**Svar:** $f'(x) = 3e^x$

**b)** När vi deriverar en exponentialfunktion med basen $e$ **med** en
koefficient i exponenten blir derivatan densamma, fast vi multiplicerar med
koefficienten i exponenten.

**Svar:** $f'(x) = 4e^{4x}$

**c)** En koefficient framför exponentialfunktionen behålls när vi
deriverar, och vi multiplicerar dessutom med koefficienten i exponenten.

$$
f'(x) = 5 \cdot 2e^{5x} = 10e^{5x}
$$

**Svar:** $f'(x) = 10e^{5x}$

**d)** Har vi i stället en division i exponenten dividerar vi koefficienten
framför med samma nämnare.

$$
f'(x) = \frac{12e^{x/3}}{3} = 4e^{x/3}
$$

**Svar:** $f'(x) = 4e^{x/3}$
:::

Nu har vi deriveringsregler för alla exponentialfunktioner med basen $e$.
Men vad gäller för derivatan till en exponentialfunktion med en annan bas än
$e$, t.ex. $f(x) = 2^x$ eller $f(x) = 3^{5x}$?

För att ta reda på det behöver vi först repetera tiologaritmer och införa en
ny logaritm.

## Naturliga logaritmen

::: härledning "Tiologaritmer (repetition) och den naturliga logaritmen"
Tiologaritmen skrivs $\log_{10}$ eller förkortat **lg**.

$\lg 100$ är "det tal vi ska upphöja 10 till för att svaret ska bli 100".
Eftersom $10^2 = 100$ är alltså $\lg 100 = 2$.

Eftersom $\lg 100 = 2$ gäller

$$
10^2 = 10^{\lg 100} = 100, \qquad \text{dvs.} \qquad 10^{\lg 100} = 100
$$

På motsvarande sätt gäller $10^{\lg 1000} = 1000$ och $10^{\lg 7} = 7$ och så
vidare.

Nu inför vi en ny logaritm, **$e$-logaritmen**. Den fungerar på exakt samma
sätt som tiologaritmen, men har i stället talet $e$ som bas.

$e$-logaritmen skrivs $\log_e$ eller förkortat **ln** och kallas för **den
naturliga logaritmen**.

Så $\ln 5$ är "det tal vi ska upphöja $e$ till för att svaret ska bli 5".
Eftersom $e$ är det irrationella talet $2{,}718\ldots$ är det svårt att
beräkna $\ln 5$ med huvudräkning. På räknaren finns en knapp märkt "ln" som
ger ett närmevärde på $\ln 5$. Hitta den!

$$
\ln 5 \approx 1{,}61
$$

dvs. $e^{1{,}61} \approx 5$. Exakt kan vi skriva $e^{\ln 5} = 5$.

På motsvarande sätt som för tiologaritmen gäller $e^{\ln 12} = 12$ och så
vidare.
:::

## Andra baser än e

::: härledning "Derivatan för $f(x) = a^x$ med annan bas än e"
Vi undersöker derivatan för $f(x) = a^x$ med annan bas än $e$ genom att
studera derivatan till $f(x) = 5^x$. Vi gör det genom att skriva om basen 5
till basen $e$ — och sedan derivera som vanligt med regeln för
$f(x) = e^{kx}$.

Vi skriver om basen 5 till basen $e$ enligt principen $5 = e^{\ln 5}$, så

$$
f(x) = 5^x = (e^{\ln 5})^x = e^{(\ln 5) \cdot x}
$$

Sedan deriverar vi enligt deriveringsregeln för $f(x) = e^{kx}$, med
$k = \ln 5$:

$$
f'(x) = \ln 5 \cdot e^{(\ln 5) \cdot x}
$$

Vi "skriver tillbaka" $e^{\ln 5}$ som 5:

$$
f'(x) = \ln 5 \cdot 5^x
$$

$f(x) = 5^x$ har alltså derivatan $f'(x) = 5^x \cdot \ln 5$.

På motsvarande sätt kan vi visa att t.ex. $f(x) = 7^x$ har derivatan
$f'(x) = 7^x \cdot \ln 7$ och att $f(x) = 1{,}14^x$ har derivatan
$f'(x) = 1{,}14^x \cdot \ln 1{,}14$.

**Slutsats:** Om $f(x) = a^x$ så gäller att $f'(x) = a^x \ln a$.
:::

::: formel "Derivatan av $f(x) = a^x$"
Om $f(x) = a^x$ så gäller att

$$
f'(x) = a^x \cdot \ln a
$$
:::

Om vi lägger ihop alla deriveringsregler vi nu har kommit fram till för
exponentialfunktioner kan vi sammanfatta dem i en enda "lathund" som alltid
fungerar.

::: tips "Lathund för att derivera exponentialfunktioner"
1. Skriv av den ursprungliga funktionen. Ändra ingenting.
2. Multiplicera med koefficienten framför variabeln i exponenten.
3. Är basen en annan än $e$, multiplicera även med $\ln$ för den basen.
:::

::: exempel "Exempel 2 — Derivera exponentialfunktioner med annan bas än e"
**Derivera<br>
a) $f(x) = 12^x$&emsp;&emsp;b) $f(x) = 3 \cdot 7^x$&emsp;&emsp;c) $f(x) = 4^{3x}$&emsp;&emsp;d) $f(x) = 5 \cdot 8^{6x}$**

**a)** Vi har en exponentialfunktion, så vi skriver först av funktionen.
Eftersom vi har en annan bas än $e$ multiplicerar vi med $\ln$ för basen,
alltså med $\ln 12$.

**Svar:** $f'(x) = 12^x \cdot \ln 12$

**b)** Vi skriver först av funktionen. Eftersom vi har en annan bas än $e$
multiplicerar vi med $\ln 7$. Koefficienten framför (3) behålls.

**Svar:** $f'(x) = 3 \cdot 7^x \cdot \ln 7$

**c)** Vi skriver först av funktionen. Eftersom vi har en koefficient i
exponenten (3) multiplicerar vi med den. Eftersom vi har en annan bas än $e$
multiplicerar vi även med $\ln 4$.

**Svar:** $f'(x) = 3 \cdot 4^{3x} \cdot \ln 4$

**d)** Vi skriver först av funktionen. Eftersom vi har en koefficient i
exponenten (6) multiplicerar vi med den. Eftersom vi har en annan bas än $e$
multiplicerar vi även med $\ln 8$. Koefficienten framför (5) behålls.

$$
f'(x) = 5 \cdot 6 \cdot 8^{6x} \cdot \ln 8 = 30 \cdot 8^{6x} \cdot \ln 8
$$

**Svar:** $f'(x) = 30 \cdot 8^{6x} \cdot \ln 8$
:::
