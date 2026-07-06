---
id: ma1c-6.8
title: Längden av en vektor i koordinatform
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.8'
---

# Längden av en vektor i koordinatform

Vi har tidigare konstaterat att längden av en vektor kan beräknas med
Pythagoras sats.

Studera nedanstående vektor $\overrightarrow{AB}$:

::: figur
<svg viewBox="-14 -8 268 158" width="268" height="158" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Vektorn AB i ett rutnät med streckade kateter: 8 rutor i x-led och 4 rutor i y-led."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="240" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="240" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="240" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="240" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="240" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="240" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="120" x2="216" y2="120" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="216" y1="120" x2="216" y2="24" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><rect x="204" y="108" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><line x1="24" y1="120" x2="207.1" y2="28.5" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216,24) rotate(-26.6)" fill="#1f2530"/><circle cx="24" cy="120" r="3" fill="#1f2530"/><text x="16" y="134" font-size="14" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="222" y="18" font-size="14" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="90" y="76" font-size="15" fill="#2563c9"><tspan font-style="italic">AB</tspan></text><line x1="86" y1="60" x2="106" y2="60" stroke="#2563c9" stroke-width="1.1"/><polygon points="110,60 105,57.8 105,62.2" fill="#2563c9"/></svg>
:::

Kom ihåg: Sträckan av vektorn $\overrightarrow{AB}$ skrivs
$|\overrightarrow{AB}|$ och utläses "absolutbeloppet av AB".

Om varje ruta motsvarar 1 l.e. gäller att kateten i x-led är 8 l.e. och
att kateten i y-led är 4 l.e. Så sträckan $|\overrightarrow{AB}|$
beräknas med Pythagoras sats enligt

$$
|\overrightarrow{AB}|^2 = 8^2 + 4^2
$$

$$
|\overrightarrow{AB}| = \sqrt{8^2 + 4^2}
$$

Nu tittar vi på vektorn i koordinatform. I koordinatform gäller
$\overrightarrow{AB} = (8,\ 4)$. Vi ser att koordinaternas storlek (8
och 4) motsvarar kateternas längd och termerna under rottecknet i
formeln för sträckan $|\overrightarrow{AB}|$ ovan!

Det spelar dessutom ingen roll om koordinaterna är negativa (en sträcka
måste ju vara positiv) eftersom de blir positiva när de kvadreras under
rottecknet. Längden hos en vektor fås alltså genom att ta kvadratroten
ur summan av koordinaternas kvadrater.

::: formel "Längden hos en vektor i koordinatform"
Längden $|\vec{u}|$ för vektor $\vec{u} = (a,\ b)$ är

$$
|\vec{u}| = \sqrt{a^2 + b^2}
$$
:::

::: formel "… i formelbladet"
Längden $|\vec{u}|$ för vektor $\vec{u} = (a_x,\ a_y)$ är

$$
|\vec{u}| = \sqrt{a_x^2 + a_y^2}
$$
:::

::: exempel "Exempel 1 — Längden ur koordinatform"
**Bestäm längden hos vektorn $\vec{u} = (11,\ -5)$. Svara exakt och
avrundat till två decimaler.**

$$
|\vec{u}| = \sqrt{11^2 + (-5)^2} = \sqrt{121 + 25} = \sqrt{146}\ \text{l.e.} \approx 12{,}08\ \text{l.e.}
$$

**Svar:** $\sqrt{146}$ l.e. ≈ 12,08 l.e.
:::
