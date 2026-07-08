---
id: ma3c-3.6
title: Tillämpningar av derivata
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.6'
---

# Tillämpningar av derivata

I avsnittet Använda derivata konstaterade vi hur derivatan tolkas: en positiv
derivata svarar mot en **ökning** och en negativ derivata mot en
**minskning**, och enheten för derivatan fås som "enheten för funktionen som
deriveras" per "enheten för variabeln". I det här avsnittet bygger vi vidare
på det med två nya tillämpningar: att bestämma en obekant konstant i en
modell med hjälp av derivatan, och att bestämma ekvationen för tangenten
till en kurva i en given punkt.

::: exempel "Exempel 1 — Tillväxthastighet för en folkmängd"
**Folkmängden $N(t)$ i en kommun beräknas minska enligt
$N(t) = 42\,000 \cdot 0{,}98^t$, där $t$ är tiden i år från 1 januari 2020.
Beräkna tillväxthastigheten den 1 januari 2025.**

Tillväxthastigheten av folkmängden vid en tidpunkt motsvaras av derivatan av
folkmängden. Tiden från 1 januari 2020 till 1 januari 2025 är 5 år, dvs.
$t = 5$. Det är alltså $N'(5)$ som söks. Vi deriverar först och sätter sedan
in 5 i derivatan.

$$
N(t) = 42\,000 \cdot 0{,}98^t
$$

$$
N'(t) = 42\,000 \cdot 0{,}98^t \cdot \ln 0{,}98
$$

$$
N'(5) = 42\,000 \cdot 0{,}98^5 \cdot \ln 0{,}98 \approx -766{,}989\ldots \approx -770
$$

Att värdet på derivatan blir negativt tolkar vi som en **minskning**.
Enheten för derivatan är "enheten för $N(t)$" per "enheten för $t$", alltså
invånare/år.

**Svar:** Den 1 januari 2025 minskar folkmängden med cirka 770 invånare/år.
:::

## Bestämma en konstant med hjälp av derivata

Ibland är inte alla konstanter i en modell kända från start. Om vi känner
till funktionens eller derivatans värde vid en viss tidpunkt kan vi använda
den informationen för att bestämma en obekant konstant — ofta med hjälp av
logaritmer, precis som vid exponentialekvationer i Matematik 2.

::: exempel "Exempel 2 — Bestämma en konstant med hjälp av derivata"
**Temperaturen $y$ °C hos en maträtt som placerats i en ugn ges av
$y = e^{kx} - 19$, där $x$ är antalet minuter i ugnen och $k$ en
konstant.<br>
a) Efter 20 minuter är maten 70 °C. Bestäm konstanten $k$.&emsp;&emsp;b)
Bestäm och tolka $y'(15)$.**

**a)** Att maten efter 20 minuter är 70 °C betyder att när $x = 20$ är
$y = 70$. Insättning av $x = 20$ och $y = 70$ i funktionen
$y = e^{kx} - 19$ ger

$$
70 = e^{k \cdot 20} - 19
$$

$$
70 = e^{20k} - 19
$$

Vi löser ut exponentialtermen genom att addera 19 till båda led.

$$
70 + 19 = e^{20k} - 19 + 19
$$

$$
89 = e^{20k} \quad \Longleftrightarrow \quad e^{20k} = 89
$$

Vi ska nu lösa ut $k$ som finns i exponenten. I Matematik 2 lärde vi oss att
lösa exponentialekvationer genom att logaritmera båda led, för att kunna
multiplicera ner exponenten. I detta fall när vi har $e$ som bas
logaritmerar vi enklast med den naturliga logaritmen $\ln$ (tänk på att
$\ln e = 1$, på samma sätt som $\lg 10 = 1$). Vi logaritmerar båda led för
att multiplicera ner exponenten.

$$
\ln e^{20k} = \ln 89
$$

$$
20k \cdot \ln e = \ln 89
$$

Eftersom $\ln e = 1$ får vi

$$
20k = \ln 89
$$

Vi löser ut konstanten $k$.

$$
\frac{20k}{20} = \frac{\ln 89}{20}
$$

$$
k = \frac{\ln 89}{20} = 0{,}22443\ldots
$$

Eftersom det är en modell kan vi avrunda och sätta $k \approx 0{,}2244$
(spara minst 4 decimaler, eftersom stora avrundningar i exponenter kan leda
till stora fel).

**Svar:** $k \approx 0{,}2244$

**b)** Vi ska bestämma och tolka $y'(15)$. Eftersom vi har fått
$k \approx 0{,}2244$ kan vi sätta in det i den ursprungliga funktionen
$y = e^{kx} - 19$ och får då

$$
y = e^{0{,}2244x} - 19
$$

Vi deriverar och sätter sedan in $x = 15$. Kom ihåg att konstanten $-19$
försvinner när vi deriverar.

$$
y' = 0{,}2244e^{0{,}2244x}
$$

$$
y'(15) = 0{,}2244e^{0{,}2244 \cdot 15} \approx 6{,}499\ldots \approx 6{,}5
$$

Att värdet på derivatan är positivt tolkar vi som en **ökning**. Enheten
för derivatan är "enheten för $y$" per "enheten för $x$", alltså
°C/minut.

**Svar:** Efter 15 minuter ökar temperaturen på maträtten med 6,5
°C/minut.
:::

## Tangentens ekvation

En tangent är en rät linje och kan därför beskrivas med räta linjens
ekvation $y = kx + m$. Eftersom derivatan i en punkt är detsamma som
kurvans (och tangentens) lutning där, kan vi bestämma riktningskoefficienten
$k$ genom att derivera. Konstanten $m$ bestäms sedan genom att sätta in
tangeringspunktens koordinater i räta linjens ekvation.

::: formel "Tangentens ekvation"
Tangenten till kurvan $y = f(x)$ i punkten där $x = a$ har ekvationen

$$
y = kx + m
$$

där riktningskoefficienten ges av derivatan i punkten,

$$
k = f'(a)
$$

Konstanten $m$ bestäms genom att sätta in tangeringspunktens koordinater
$(a, f(a))$ i räta linjens ekvation.
:::

::: exempel "Exempel 3 — Tangentens ekvation"
**Bestäm ekvationen för tangenten i punkten där $x = 3$ på kurvan
$y = x^2 + 4x - 7$.**

::: figur
<svg viewBox="4 -4 214 266" width="214" height="266" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Grafen till y lika med x i kvadrat plus 4x minus 7 med tangenten i punkten 3 komma 14. Tangentens ekvation är y lika med 10x minus 16."><line x1="14" y1="180" x2="186" y2="180" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,180 184,175.5 184,184.5" fill="#1f2530"/><line x1="100" y1="254" x2="100" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,4 95.5,14 104.5,14" fill="#1f2530"/><text x="192" y="198" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="109" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 28,222 Q 100,318 172,30" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="114.4" y1="228" x2="172" y2="36" stroke="#4a7d3a" stroke-width="2"/><line x1="154" y1="180" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><line x1="100" y1="96" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><circle cx="154" cy="96" r="3.5" fill="#c8324a"/><text x="163" y="99" font-size="12" text-anchor="start" fill="#c8324a">(3, 14)</text><text x="208" y="16" font-size="12" text-anchor="end" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 10<tspan font-style="italic">x</tspan> − 16</text></svg>
:::

En tangent är en rät linje och kan beskrivas med räta linjens ekvation
$y = kx + m$. Vi ska bestämma $k$ och $m$.

$k$-värdet står för tangentens lutning, som är samma sak som derivatan i
punkten då $x = 3$, dvs. $k = y'(3)$.

Vi bestämmer $y'(3)$ genom att först derivera och sedan sätta in $x = 3$.

$$
y = x^2 + 4x - 7
$$

$$
y' = 2x + 4
$$

$$
k = y'(3) = 2 \cdot 3 + 4 = 6 + 4 = 10
$$

Insättning av $k = 10$ i räta linjens ekvation $y = kx + m$ ger

$$
y = 10x + m
$$

Vi bestämmer till sist $m$ genom att sätta in en punkt som tangenten går
genom. Vi vet att tangenten träffar kurvan $y = x^2 + 4x - 7$ där $x = 3$.
Vi sätter in $x = 3$ för att få punktens $y$-koordinat.

$$
y = 3^2 + 4 \cdot 3 - 7 = 9 + 12 - 7 = 14
$$

Tangenten går alltså genom punkten $(3, 14)$. Insättning av $x = 3$ och
$y = 14$ i tangentens ekvation $y = 10x + m$ ger

$$
14 = 10 \cdot 3 + m
$$

$$
14 = 30 + m
$$

Vi löser ut $m$.

$$
14 - 30 = 30 + m - 30
$$

$$
-16 = m \quad \Longleftrightarrow \quad m = -16
$$

Insättning av $k = 10$ och $m = -16$ i räta linjens ekvation $y = kx + m$
ger tangentens ekvation

$$
y = 10x - 16
$$

**Svar:** $y = 10x - 16$
:::
