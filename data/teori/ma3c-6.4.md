---
id: ma3c-6.4
title: Trigonometriska ekvationer – räknelektion och tangens
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.4'
---

# Trigonometriska ekvationer – räknelektion och tangens

Ekvationer av typen $\sin v = a$ eller $\cos v = a$ löser vi med hjälp av
deras inversa funktioner. På motsvarande sätt löser vi ekvationen
$\tan v = a$ med den inversa funktionen för tangens. Precis som $\sin^{-1}$
och $\cos^{-1}$ skriver vi den inversa funktionen för tangens som
$\tan^{-1}$.

Vi har tidigare konstaterat att sinus- och cosinusfunktionerna upprepas
för varje $360^\circ$ som läggs till (eller dras ifrån) en vinkel. Vi
säger att sinus- och cosinusfunktionen har en **period** på $360^\circ$.

::: härledning "Härledning — tangens period"
Vi undersöker perioden för tangensfunktionen. Vi vet sedan tidigare att

$$
\tan v = \frac{\sin v}{\cos v}
$$

Detta ger

$$
\tan (v + 180^\circ) = \frac{\sin (v + 180^\circ)}{\cos (v + 180^\circ)} = \frac{-\sin v}{-\cos v} = \frac{\sin v}{\cos v} = \tan v
$$

Vi ser alltså att

$$
\tan v = \tan (v + 180^\circ)
$$

Tangensfunktionen har alltså en period på $180^\circ$ v.s.v.
:::

::: härledning "Kuriosa — tangens period"
Det finns ett alternativt sätt att tänka kring tangens period. Eftersom

$$
\tan v = \frac{\sin v}{\cos v} = \frac{y}{x} = k
$$

kan vi se värdet av $\tan v$ som **riktningskoefficienten** ($k$-värdet)
för linjen genom origo och en punkt på enhetscirkeln. Bildar vi en
godtycklig vinkel $v$ ger den en punkt på enhetscirkeln, och linjen genom
origo och den punkten får ett visst $k$-värde.

::: figur
<svg viewBox="-108 -108 230 216" width="230" height="216" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En enhetscirkel med en linje genom origo som skär cirkeln i två motsatta punkter. Vinkeln v mäts från positiva x-axeln till den ena punkten, och vinkeln v plus 180 grader mäts på motsvarande sätt till den motsatta punkten på samma linje."><line x1="-100" y1="0" x2="92" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,0 90,-4 90,4" fill="#1f2530"/><line x1="0" y1="100" x2="0" y2="-92" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-100 -4,-90 4,-90" fill="#1f2530"/><text x="105" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="8" y="-86" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="0" cy="0" r="68" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="55.70" y1="-39.00" x2="72.08" y2="-50.47" stroke="#2563c9" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="-55.70" y1="39.00" x2="-72.08" y2="50.47" stroke="#2563c9" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="55.70" y1="-39.00" x2="-55.70" y2="39.00" stroke="#2563c9" stroke-width="2"/><circle cx="55.70" cy="-39.00" r="3.5" fill="#1f2530"/><circle cx="-55.70" cy="39.00" r="3.5" fill="#1f2530"/><path d="M 24,0 A 24,24 0 0 0 19.66,-13.77" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M -24,0 A 24,24 0 0 0 -19.66,13.77" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="36" y="-11" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="-38" y="18" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan> + 180°</text></svg>
:::

Vrider vi vinkeln ytterligare $180^\circ$ hamnar vi i den diametralt
motsatta punkten på cirkeln — men det är **samma linje** genom origo, så
lutningen ($\tan v$) blir densamma. Alltså är perioden för
tangensfunktionen $180^\circ$.
:::

::: formel "Trigonometriska funktioner och perioder"
| Funktion | Period |
| --- | --- |
| $\sin$ | $360^\circ$ |
| $\cos$ | $360^\circ$ |
| $\tan$ | $180^\circ$ |
:::

::: exempel "Exempel 1 — Lös en tangensekvation"
**Lös ekvationen $\tan v = 2$ i intervallet $0^\circ \leq v \leq 360^\circ$.**

$$
v_1 = \tan^{-1}(2) = 63{,}434\ldots^\circ \approx 63{,}4^\circ
$$

Vi lägger till en period på $180^\circ$ för att få den andra lösningen i
intervallet.

$$
v_2 \approx 63{,}4^\circ + 180^\circ = 243{,}4^\circ
$$

**Svar:** $v_1 \approx 63{,}4^\circ$ och $v_2 \approx 243{,}4^\circ$
:::
