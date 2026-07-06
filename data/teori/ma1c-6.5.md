---
id: ma1c-6.5
title: Vektorer och skalärer
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.5'
---

# Vektorer och skalärer

En egenskap som på något sätt kan mätas kallas **storhet**. Exempel på
storheter är sträcka, hastighet, vikt, volym och temperatur. Det finns
två typer av storheter: vektorer och skalärer.

En storhet som anges med

- storlek och riktning kallas **vektor**. Exempel på vektorer är
  hastighet, kraft och acceleration.
- endast storlek (ingen riktning) kallas **skalär**. Exempel på skalärer
  är vikt, tid och temperatur.

Vi representerar vektorer med pilar där pilens längd motsvarar vektorns
storlek och pilen motsvarar vektorns riktning. För att beteckna en vektor
används ofta en variabel ihop med en pil ovanför, t.ex. $\vec{x}$.

Vektorer kan parallellförflyttas: så länge inte storleken eller
riktningen ändras, så är det *samma vektor*. Vektorer som är lika stora,
men med motsatta riktningar kallas **motsatta vektorer**. Vektorer som
har samma lutning (men kan ha motsatta riktningar eller vara olika stora)
är **parallella**.

Längden av en vektor $\vec{u}$ skrivs $|\vec{u}|$ och utläses
"absolutbeloppet av $u$". Längden av en vektor beräknas med Pythagoras
sats, på samma sätt som sträckor i koordinatsystem.

::: exempel "Exempel 1 — Samma, motsatta och parallella"
**Studera nedanstående vektorer.**

::: figur
<svg viewBox="-4 -6 300 180" width="300" height="180" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fem vektorer i ett rutnät. Vektorerna v1 och v4 är lika långa och pekar åt samma håll. Vektorn v2 är lika lång men pekar åt motsatt håll. Vektorn v3 är dubbelt så lång med samma lutning. Vektorn v5 pekar brant uppåt åt höger."><line x1="0" y1="0" x2="0" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="288" y1="0" x2="288" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="288" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="288" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="288" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="288" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="288" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="288" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="288" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="288" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120.0" y1="33.6" x2="33.7" y2="55.2" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,57.6) rotate(166.0)" fill="#c8324a"/><text x="72" y="32" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">2</tspan></text><line x1="67" y1="18" x2="75" y2="18" stroke="#c8324a" stroke-width="1"/><polygon points="78,18 74,16 74,20" fill="#c8324a"/><line x1="168.0" y1="43.2" x2="254.3" y2="21.6" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(264.0,19.2) rotate(-14.0)" fill="#c8324a"/><text x="214" y="36" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">4</tspan></text><line x1="209" y1="22" x2="217" y2="22" stroke="#c8324a" stroke-width="1"/><polygon points="220,22 216,20 216,24" fill="#c8324a"/><line x1="24.0" y1="91.2" x2="110.3" y2="69.6" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,67.2) rotate(-14.0)" fill="#c8324a"/><text x="64" y="94" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">1</tspan></text><line x1="59" y1="80" x2="67" y2="80" stroke="#c8324a" stroke-width="1"/><polygon points="70,80 66,78 66,82" fill="#c8324a"/><line x1="48.0" y1="139.2" x2="230.3" y2="93.6" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,91.2) rotate(-14.0)" fill="#c8324a"/><text x="148" y="124" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">3</tspan></text><line x1="143" y1="110" x2="151" y2="110" stroke="#c8324a" stroke-width="1"/><polygon points="154,110 150,108 150,112" fill="#c8324a"/><line x1="216.0" y1="153.6" x2="236.8" y2="91.1" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,81.6) rotate(-71.6)" fill="#c8324a"/><text x="240" y="120" font-size="14" text-anchor="start" fill="#c8324a"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">5</tspan></text><line x1="235" y1="106" x2="243" y2="106" stroke="#c8324a" stroke-width="1"/><polygon points="246,106 242,104 242,108" fill="#c8324a"/></svg>
:::

**Vilka vektorer är<br>a) samma&emsp;&emsp;b) motsatta&emsp;&emsp;c) parallella?**

**a)** Eftersom $\vec{v}_1$ och $\vec{v}_4$ har samma storlek och
riktning är de samma vektor, så $\vec{v}_1 = \vec{v}_4$.

**Svar:** $\vec{v}_1$ och $\vec{v}_4$

**b)** Eftersom $\vec{v}_1$ och $\vec{v}_2$ har samma storlek, men
motsatt riktning är de motsatta vektorer, så $\vec{v}_2 = -\vec{v}_1$.

**Svar:** $\vec{v}_2$ och $\vec{v}_1$

**c)** Eftersom $\vec{v}_1$, $\vec{v}_2$, $\vec{v}_3$ och $\vec{v}_4$
har samma lutning är de parallella vektorer.

**Svar:** $\vec{v}_1$, $\vec{v}_2$, $\vec{v}_3$ och $\vec{v}_4$
:::

::: exempel "Exempel 2 — Vektorns längd"
**Beräkna längden av vektorn $\overrightarrow{AB}$. En ruta motsvarar
1 l.e.**

::: figur
<svg viewBox="-14 -8 268 158" width="268" height="158" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Vektorn AB dras från punkten A snett uppåt höger till punkten B i ett rutnät. En ruta motsvarar 1 längdenhet."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="240" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="240" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="240" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="240" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="240" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="240" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="120.0" x2="207.1" y2="28.5" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,24.0) rotate(-26.6)" fill="#1f2530"/><circle cx="24" cy="120" r="3" fill="#1f2530"/><text x="16" y="134" font-size="14" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="222" y="18" font-size="14" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="90" y="76" font-size="15" fill="#1f2530"><tspan font-style="italic">AB</tspan></text><line x1="86" y1="60" x2="106" y2="60" stroke="#1f2530" stroke-width="1.1"/><polygon points="110,60 105,57.8 105,62.2" fill="#1f2530"/></svg>
:::

Vi bildar en rätvinklig triangel:

::: figur
<svg viewBox="-14 -8 268 158" width="268" height="158" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma vektor AB där en rätvinklig triangel bildats med streckade kateter: 8 rutor vågrätt och 4 rutor lodrätt."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="240" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="240" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="240" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="240" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="240" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="240" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="120.0" x2="207.1" y2="28.5" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,24.0) rotate(-26.6)" fill="#1f2530"/><line x1="24" y1="120" x2="216" y2="120" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="216" y1="120" x2="216" y2="24" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><rect x="204" y="108" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><circle cx="24" cy="120" r="3" fill="#1f2530"/><text x="16" y="134" font-size="14" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="222" y="18" font-size="14" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="90" y="76" font-size="15" fill="#2563c9"><tspan font-style="italic">AB</tspan></text><line x1="86" y1="60" x2="106" y2="60" stroke="#2563c9" stroke-width="1.1"/><polygon points="110,60 105,57.8 105,62.2" fill="#2563c9"/></svg>
:::

Pythagoras sats ger

$$
|\overrightarrow{AB}|^2 = 8^2 + 4^2
$$

$$
|\overrightarrow{AB}|^2 = 64 + 16
$$

$$
|\overrightarrow{AB}|^2 = 80
$$

$$
|\overrightarrow{AB}| = \pm\sqrt{80}
$$

Den negativa lösningen kan bortses.

**Svar:** $\sqrt{80}$ l.e.
:::
