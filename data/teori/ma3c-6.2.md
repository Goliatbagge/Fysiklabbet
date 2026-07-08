---
id: ma3c-6.2
title: Enhetscirkeln
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.2'
---

# Enhetscirkeln

En cirkel med radien 1 placerad med medelpunkten i origo kallas
**enhetscirkel**. Enhetscirkeln används för att definiera sinus, cosinus och
tangens för *alla* vinklar — inte bara spetsiga vinklar mellan $0°$ och $90°$
som i en rätvinklig triangel.

::: figur
<svg viewBox="24 4 262 264" width="262" height="264" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med en radie till en punkt vid vinkeln v ovanför x-axeln. En streckad lodrät linje ner till x-axeln bildar en rätvinklig triangel med hypotenusan 1, den vågräta kateten cos v och den lodräta kateten sin v."><circle cx="150" cy="140" r="95" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="30" y1="140" x2="270" y2="140" stroke="#1f2530" stroke-width="1.6"/><polygon points="279,140 270,135.5 270,144.5" fill="#1f2530"/><line x1="150" y1="260" x2="150" y2="20" stroke="#1f2530" stroke-width="1.6"/><polygon points="150,11 145.5,20 154.5,20" fill="#1f2530"/><text x="274" y="160" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="159" y="18" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="227.82" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="219.82" y="132" width="8" height="8" fill="none" stroke="#1f2530" stroke-width="1.1"/><line x1="150" y1="140" x2="227.82" y2="85.51" stroke="#1f2530" stroke-width="2"/><circle cx="227.82" cy="85.51" r="4" fill="#2563c9"/><path d="M178,140 A28,28 0 0 0 172.94,123.94" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="190.06" y="127.37" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="188.91" y="158" font-size="13" text-anchor="middle" fill="#1f2530">cos <tspan font-style="italic">v</tspan></text><text x="235.82" y="112.76" font-size="13" text-anchor="start" fill="#1f2530">sin <tspan font-style="italic">v</tspan></text><text x="182.0" y="102.93" font-size="13" text-anchor="end" fill="#1f2530">1</text></svg>
:::

Om vi drar en sträcka som bildar vinkeln $v$ med den positiva $x$-axeln, fram
till enhetscirkelns rand, bildas en rätvinklig triangel där hypotenusan är
cirkelns radie — som alltid är lika med $1$, se figuren ovan. Med hjälp av
den triangeln gäller

$$
\sin v = \frac{y}{1} = y \qquad \cos v = \frac{x}{1} = x \qquad
\tan v = \frac{y}{x} = \frac{\sin v}{\cos v}
$$

Alltså motsvaras $\sin v$ av punktens $y$-koordinat och $\cos v$ av punktens
$x$-koordinat. Punktens koordinat $(x, y)$ kan därför alltid skrivas
$(\cos v, \sin v)$ — för *vilken* vinkel $v$ som helst, inte bara spetsiga
vinklar.

::: tips "Definition av sinus, cosinus och tangens på enhetscirkeln"
Vinkeln $v$ ger en punkt $(x, y)$ på enhetscirkeln. För samtliga vinklar $v$
gäller

- $\sin v = y$
- $\cos v = x$
- $\tan v = \dfrac{\sin v}{\cos v}$, där $\cos v \neq 0$
:::

## Vinklar i enhetscirkeln

En vinkel $v$ i enhetscirkeln kan vara vilken storlek som helst — inte bara
mellan $0°$ och $90°$ som i en rätvinklig triangel.

::: tips "Vinklar i enhetscirkeln"
En vinkel $v$

- startar vid den positiva $x$-axeln och vrids **moturs** det antal grader
  som anges.
- som är större än $360°$ har gått ett helt varv och fortsätter sedan om
  igen, t.ex. ger $360° + v$ samma punkt på cirkeln som $v$.
- som är **negativ** motsvarar i stället en vridning **medurs** det antal
  grader som anges.
:::

::: figur
<svg viewBox="6 -3 237 237" width="237" height="237" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med en positiv vinkel v som vrids moturs ovanför x-axeln till en blå punkt, och den negativa vinkeln minus v som vrids medurs nedanför x-axeln till en röd punkt, en spegelbild i x-axeln."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="174.64" y2="54.89" stroke="#1f2530" stroke-width="2"/><circle cx="174.64" cy="54.89" r="4" fill="#2563c9"/><path d="M148,120 A28,28 0 0 0 138.0,98.55" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.07" y="102.25" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><line x1="120" y1="120" x2="174.64" y2="185.11" stroke="#1f2530" stroke-width="2"/><circle cx="174.64" cy="185.11" r="4" fill="#c8324a"/><path d="M148,120 A28,28 0 0 1 138.0,141.45" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.07" y="137.75" font-size="13" text-anchor="middle" fill="#1f2530">−<tspan font-style="italic">v</tspan></text></svg>
:::

Figuren visar en positiv vinkel $v$ (moturs, ovanför $x$-axeln, blå punkt)
och den negativa vinkeln $-v$ (medurs, nedanför $x$-axeln, röd punkt). Den
negativa vinkeln ger en punkt som är en spegelbild i $x$-axeln av punkten
för $v$: $x$-koordinaten (cosinusvärdet) är oförändrad, medan
$y$-koordinaten (sinusvärdet) byter tecken.

::: exempel "Exempel 1 — Bestäm ur enhetscirkeln"
**Bestäm ur enhetscirkeln, där punkten $(0{,}51;\ 0{,}86)$ motsvarar
vinkeln $v$ (se figuren).<br>a) $\cos v$&emsp;&emsp;b) $\sin v$&emsp;&emsp;c) $\tan v$<br>d) $v$&emsp;&emsp;e) $\sin 419{,}3^\circ$&emsp;&emsp;f) $\sin(-59{,}3^\circ)$**

::: figur
<svg viewBox="6 -3 237 237" width="237" height="237" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med punkten 0,51 och 0,86 markerad vid vinkeln v, mätt moturs från positiva x-axeln."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="163.40" y2="46.92" stroke="#1f2530" stroke-width="2"/><circle cx="163.40" cy="46.92" r="4" fill="#2563c9"/><path d="M146,120 A26,26 0 0 0 133.28,97.65" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="154.76" y="100.21" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="171.40" y="40.92" font-size="12.5" text-anchor="start" fill="#1f2530">(0,51; 0,86)</text></svg>
:::

**a)** $\cos v$ motsvarar punktens $x$-koordinat, det vill säga $0{,}51$.

**Svar:** $0{,}51$

**b)** $\sin v$ motsvarar punktens $y$-koordinat, det vill säga $0{,}86$.

**Svar:** $0{,}86$

**c)** Vi använder sambandet $\tan v = \dfrac{\sin v}{\cos v}$. Sedan
tidigare har vi $\cos v = 0{,}51$ och $\sin v = 0{,}86$, vilket ger

$$
\tan v = \frac{0{,}86}{0{,}51} = 1{,}686\ldots \approx 1{,}69
$$

**Svar:** $\approx 1{,}69$

**d)** Vi bestämmer $v$ med hjälp av något av sambanden ovan, till exempel
$\sin v = 0{,}86$.

$$
v = \sin^{-1}(0{,}86) = 59{,}316\ldots^\circ \approx 59{,}3^\circ
$$

**Svar:** $\approx 59{,}3^\circ$

**e)** Vinkeln $419{,}3^\circ$ är större än $360^\circ$. Vi drar bort ett
helt varv ($360^\circ$) för att hitta vinkeln mellan $0^\circ$ och
$360^\circ$ som ger samma punkt på enhetscirkeln.

$$
\sin 419{,}3^\circ = \sin(419{,}3^\circ - 360^\circ) = \sin 59{,}3^\circ
$$

Från d) vet vi att $59{,}3^\circ$ är vinkeln $v$ i figuren ovan, med
$\sin v = 0{,}86$.

**Svar:** $0{,}86$

**f)** Vinkeln $-59{,}3^\circ$ motsvarar en vridning $59{,}3^\circ$ medurs.
Vi markerar vinkeln och den nya punkten i en enhetscirkel:

::: figur
<svg viewBox="6 -3 237 237" width="237" height="237" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med punkten 0,51 och minus 0,86 markerad vid vinkeln minus 59,3 grader, mätt medurs från positiva x-axeln, en spegling i x-axeln av föregående punkt."><circle cx="120" cy="120" r="85" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="12" y1="120" x2="228" y2="120" stroke="#1f2530" stroke-width="1.6"/><polygon points="237,120 228,115.5 228,124.5" fill="#1f2530"/><line x1="120" y1="228" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,3 115.5,12 124.5,12" fill="#1f2530"/><text x="232" y="140" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="120" y1="120" x2="163.40" y2="193.08" stroke="#1f2530" stroke-width="2"/><circle cx="163.40" cy="193.08" r="4" fill="#c8324a"/><path d="M146,120 A26,26 0 0 1 133.28,142.35" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="158.23" y="141.77" font-size="12.5" text-anchor="middle" fill="#1f2530">−59,3°</text><text x="171.40" y="207.08" font-size="12.5" text-anchor="start" fill="#1f2530">(0,51; −0,86)</text></svg>
:::

Punkten är en spegelbild i $x$-axeln av punkten i föregående figur —
$x$-koordinaten (cosinusvärdet) är oförändrad, medan $y$-koordinaten
(sinusvärdet) byter tecken. Alltså gäller

$$
\sin(-59{,}3^\circ) = -\sin 59{,}3^\circ = -0{,}86
$$

**Svar:** $-0{,}86$
:::
