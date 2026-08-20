---
id: ma1c-5.3
title: Korrelation och kausalitet
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.3'
---

# Korrelation och kausalitet

Om ett samband finns mellan två variabler har vi en **korrelation**.
Huruvida ett samband finns, kan undersökas med ett **spridningsdiagram**.
Om punkterna i ett spridningsdiagram ligger tydligt på en linje är
korrelationen **stark**. Om punkterna ligger kring en linje, men spridda,
är korrelationen **svag**. Om punkterna ligger kring en linje med positiv
lutning är korrelationen **positiv**. Om punkterna ligger kring en linje
med negativ lutning är korrelationen **negativ**.

Exempel: Värdena för 10 mammors respektive döttrars längd prickas in i
ett spridningsdiagram. Döttrars längd i cm är markerade på *y*-axeln och
mammors längd i cm är markerade på *x*-axeln:

::: figur
<svg viewBox="-34 -20 209 164" width="284" height="223" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Spridningsdiagram: tio punkter för mammors längd på x-axeln och döttrars längd på y-axeln. Punkterna är spridda men samlade kring en stigande linje. Peka eller tryck på diagrammet så visas trendlinjen." style="overflow:visible"><style>.q53m-g{cursor:pointer;outline:none}.q53m-g .q53m-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53m-g:hover .q53m-lbl,.q53m-g:focus .q53m-lbl{opacity:1}</style><line x1="18.2" y1="0.0" x2="18.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44.2" y1="0.0" x2="44.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70.2" y1="0.0" x2="70.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96.2" y1="0.0" x2="96.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="122.2" y1="0.0" x2="122.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="148.2" y1="0.0" x2="148.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="114.4" x2="153.4" y2="114.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="88.4" x2="153.4" y2="88.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="153.4" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="36.4" x2="153.4" y2="36.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="10.4" x2="153.4" y2="10.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="161.4" y2="119.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="169.4,119.6 159.4,115.1 159.4,124.1" fill="#1f2530"/><line x1="0.0" y1="119.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="167.4" y="137.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="18.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">150</text><text x="44.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">160</text><text x="70.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">170</text><text x="96.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">180</text><text x="122.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">190</text><text x="148.2" y="135.6" font-size="11" text-anchor="middle" fill="#1f2530">200</text><text x="-31" y="118.4" font-size="11" text-anchor="start" fill="#1f2530">150</text><text x="-31" y="92.4" font-size="11" text-anchor="start" fill="#1f2530">160</text><text x="-31" y="66.4" font-size="11" text-anchor="start" fill="#1f2530">170</text><text x="-31" y="40.4" font-size="11" text-anchor="start" fill="#1f2530">180</text><text x="-31" y="14.4" font-size="11" text-anchor="start" fill="#1f2530">190</text><circle cx="18.2" cy="88.4" r="3" fill="#1f2530"/><circle cx="31.2" cy="101.4" r="3" fill="#1f2530"/><circle cx="36.4" cy="75.4" r="3" fill="#1f2530"/><circle cx="52.0" cy="72.8" r="3" fill="#1f2530"/><circle cx="57.2" cy="67.6" r="3" fill="#1f2530"/><circle cx="65.0" cy="83.2" r="3" fill="#1f2530"/><circle cx="70.2" cy="36.4" r="3" fill="#1f2530"/><circle cx="75.4" cy="52.0" r="3" fill="#1f2530"/><circle cx="96.2" cy="41.6" r="3" fill="#1f2530"/><circle cx="122.2" cy="31.2" r="3" fill="#1f2530"/><g class="q53m-g" tabindex="0"><rect x="-6" y="-14" width="172" height="146" fill="transparent"/><g class="q53m-lbl"><line x1="0" y1="100" x2="160" y2="12" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.75"/><rect x="90" y="84" width="70" height="30" rx="4" fill="#f3eee4"/><text x="156" y="96" font-size="11" text-anchor="end" fill="#1f2530">Svag positiv</text><text x="156" y="109" font-size="11" text-anchor="end" fill="#1f2530">korrelation</text></g></g></svg>

Varje punkt är ett mor–dotter-par. Peka eller tryck på diagrammet så visas
trendlinjen.
:::

Även om mätvärdena är spridda, så finns ett visst samband — en
korrelation. Mätvärdena är ganska spridda, men samlade kring en rät linje
med *positiv lutning*. Vi säger då att vi har en *svag positiv
korrelation*.

Fler exempel:

::: figur
<svg viewBox="-14 -18 151 144" width="205" height="195" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Spridningsdiagram där punkterna ligger tätt kring en stigande rät linje: stark positiv korrelation. Peka eller tryck på diagrammet så visas trendlinjen." style="overflow:visible"><style>.q53a-g{cursor:pointer;outline:none}.q53a-g .q53a-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53a-g:hover .q53a-lbl,.q53a-g:focus .q53a-lbl{opacity:1}</style><line x1="0.0" y1="0.0" x2="0.0" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="115.2" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="123.2" y2="105.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="131.2,105.6 121.2,101.1 121.2,110.1" fill="#1f2530"/><line x1="0.0" y1="105.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="129.2" y="123.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="8.0" cy="94.4" r="2.4" fill="#c8324a"/><circle cx="16.0" cy="86.4" r="2.4" fill="#c8324a"/><circle cx="24.0" cy="83.2" r="2.4" fill="#c8324a"/><circle cx="32.0" cy="72.0" r="2.4" fill="#c8324a"/><circle cx="40.0" cy="67.2" r="2.4" fill="#c8324a"/><circle cx="48.0" cy="54.4" r="2.4" fill="#c8324a"/><circle cx="56.0" cy="51.2" r="2.4" fill="#c8324a"/><circle cx="64.0" cy="40.0" r="2.4" fill="#c8324a"/><circle cx="72.0" cy="35.2" r="2.4" fill="#c8324a"/><circle cx="80.0" cy="22.4" r="2.4" fill="#c8324a"/><circle cx="88.0" cy="16.0" r="2.4" fill="#c8324a"/><circle cx="96.0" cy="9.6" r="2.4" fill="#c8324a"/><circle cx="104.0" cy="3.2" r="2.4" fill="#c8324a"/><circle cx="35.2" cy="73.6" r="2.4" fill="#c8324a"/><circle cx="60.8" cy="41.6" r="2.4" fill="#c8324a"/><g class="q53a-g" tabindex="0"><rect x="-14" y="-18" width="151" height="128" fill="transparent"/><g class="q53a-lbl"><line x1="0" y1="99" x2="110" y2="-3" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.75"/><rect x="62" y="62" width="68" height="28" rx="4" fill="#f3eee4"/><text x="66" y="73" font-size="11" text-anchor="start" fill="#1f2530">Stark positiv</text><text x="66" y="86" font-size="11" text-anchor="start" fill="#1f2530">korrelation</text></g></g></svg>

**Stark positiv korrelation.** Ex. fotlängd/skostorlek. Peka eller tryck på diagrammet så visas trendlinjen.
:::

::: figur
<svg viewBox="-14 -18 151 144" width="205" height="195" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Spridningsdiagram där punkterna är spridda kring en fallande linje: svag negativ korrelation. Peka eller tryck på diagrammet så visas trendlinjen." style="overflow:visible"><style>.q53b-g{cursor:pointer;outline:none}.q53b-g .q53b-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53b-g:hover .q53b-lbl,.q53b-g:focus .q53b-lbl{opacity:1}</style><line x1="0.0" y1="0.0" x2="0.0" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="115.2" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="123.2" y2="105.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="131.2,105.6 121.2,101.1 121.2,110.1" fill="#1f2530"/><line x1="0.0" y1="105.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="129.2" y="123.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="8.0" cy="19.2" r="2.4" fill="#c8324a"/><circle cx="16.0" cy="38.4" r="2.4" fill="#c8324a"/><circle cx="24.0" cy="28.8" r="2.4" fill="#c8324a"/><circle cx="32.0" cy="48.0" r="2.4" fill="#c8324a"/><circle cx="40.0" cy="35.2" r="2.4" fill="#c8324a"/><circle cx="48.0" cy="60.8" r="2.4" fill="#c8324a"/><circle cx="56.0" cy="49.6" r="2.4" fill="#c8324a"/><circle cx="64.0" cy="70.4" r="2.4" fill="#c8324a"/><circle cx="72.0" cy="57.6" r="2.4" fill="#c8324a"/><circle cx="80.0" cy="80.0" r="2.4" fill="#c8324a"/><circle cx="88.0" cy="67.2" r="2.4" fill="#c8324a"/><circle cx="96.0" cy="86.4" r="2.4" fill="#c8324a"/><circle cx="104.0" cy="73.6" r="2.4" fill="#c8324a"/><circle cx="44.8" cy="43.2" r="2.4" fill="#c8324a"/><circle cx="92.8" cy="91.2" r="2.4" fill="#c8324a"/><g class="q53b-g" tabindex="0"><rect x="-14" y="-18" width="151" height="128" fill="transparent"/><g class="q53b-lbl"><line x1="0" y1="18" x2="112" y2="88" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.75"/><rect x="64" y="4" width="70" height="28" rx="4" fill="#f3eee4"/><text x="68" y="15" font-size="11" text-anchor="start" fill="#1f2530">Svag negativ</text><text x="68" y="28" font-size="11" text-anchor="start" fill="#1f2530">korrelation</text></g></g></svg>

**Svag negativ korrelation.** Ex. vägbredd/antal olyckor. Peka eller tryck på diagrammet så visas trendlinjen.
:::

::: figur
<svg viewBox="-14 -18 151 144" width="205" height="195" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Spridningsdiagram där punkterna är slumpmässigt utspridda utan mönster: ingen korrelation. Peka eller tryck på diagrammet så visas bedömningen." style="overflow:visible"><style>.q53c-g{cursor:pointer;outline:none}.q53c-g .q53c-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53c-g:hover .q53c-lbl,.q53c-g:focus .q53c-lbl{opacity:1}</style><line x1="0.0" y1="0.0" x2="0.0" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="115.2" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="123.2" y2="105.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="131.2,105.6 121.2,101.1 121.2,110.1" fill="#1f2530"/><line x1="0.0" y1="105.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="129.2" y="123.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="8.0" cy="57.6" r="2.4" fill="#c8324a"/><circle cx="16.0" cy="17.6" r="2.4" fill="#c8324a"/><circle cx="20.8" cy="89.6" r="2.4" fill="#c8324a"/><circle cx="32.0" cy="38.4" r="2.4" fill="#c8324a"/><circle cx="38.4" cy="92.8" r="2.4" fill="#c8324a"/><circle cx="44.8" cy="12.8" r="2.4" fill="#c8324a"/><circle cx="51.2" cy="65.6" r="2.4" fill="#c8324a"/><circle cx="57.6" cy="27.2" r="2.4" fill="#c8324a"/><circle cx="64.0" cy="83.2" r="2.4" fill="#c8324a"/><circle cx="70.4" cy="44.8" r="2.4" fill="#c8324a"/><circle cx="76.8" cy="96.0" r="2.4" fill="#c8324a"/><circle cx="83.2" cy="22.4" r="2.4" fill="#c8324a"/><circle cx="89.6" cy="70.4" r="2.4" fill="#c8324a"/><circle cx="96.0" cy="33.6" r="2.4" fill="#c8324a"/><circle cx="100.8" cy="76.8" r="2.4" fill="#c8324a"/><circle cx="27.2" cy="52.8" r="2.4" fill="#c8324a"/><circle cx="94.4" cy="51.2" r="2.4" fill="#c8324a"/><g class="q53c-g" tabindex="0"><rect x="-14" y="-18" width="151" height="128" fill="transparent"/><g class="q53c-lbl"><rect x="70" y="-14" width="66" height="28" rx="4" fill="#f3eee4"/><text x="132" y="-3" font-size="11" text-anchor="end" fill="#1f2530">Ingen</text><text x="132" y="10" font-size="11" text-anchor="end" fill="#1f2530">korrelation</text></g></g></svg>

**Ingen korrelation.** Ex. äggkonsumtion/kriminalitet. Peka eller tryck på diagrammet så visas bedömningen.
:::

## Kausalitet

Ett orsakssamband mellan två variabler kallas **kausalitet**.

Vi återgår till exemplet med döttrars och mammors längd. Är *orsaken*
till att döttrarna blir långa att mammorna är långa? Svaret är *ja*,
eftersom generna från mamman (delvis) avgör hur lång dottern blir. Alltså
råder kausalitet.

::: exempel "Exempel 1 — Livslängd och internet"
**Ett spridningsdiagram över medellivslängd (år, *y*-axeln) och tillgång
till internet (%, *x*-axeln) för några olika länder visar punkter spridda
kring en stigande linje. Avgör om det råder<br>a) korrelation, och i så
fall vilken typ<br>b) kausalitet.**

::: handskrift
typ: korrelation
:::

::: textlosning
**a)** Mätvärdena ligger spridda kring en linje med positiv lutning.

**Svar:** Svag positiv korrelation.

**b)** Vi tänker "Är orsaken till den ökade medellivslängden att
människor har tillgång till internet?". Svaret är *nej*.
Internettillgång ger inte ökad livslängd. Detta är ett så kallat
**skensamband**.

Den troliga förklaringen är att rika länder (där man har god tillgång
till internet) i större utsträckning har en bättre sjukvård, som i sin
tur ger längre livslängd.

**Svar:** Nej, ingen kausalitet råder.
:::
:::
