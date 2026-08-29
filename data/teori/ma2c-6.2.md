---
id: ma2c-6.2
title: Spridningsmått, lådagram och percentiler
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.2'
---

# Spridningsmått, lådagram och percentiler

Spridningsmått säger något om hur spridda värdena är hos en datamängd.
En stor variation bland värdena ger en större spridning och en liten
variation ger en mindre spridning. Det finns flera typer av
spridningsmått. Hur mycket det skiljer mellan det största och minsta
värdet kallas **variationsbredd**.

::: formel "Variationsbredd"
$$
\text{variationsbredd} = \text{största värdet} - \text{minsta värdet}
$$
:::

Ett annat sätt att åskådliggöra spridning utifrån en bild är
**lådagram**. I lådagram delar man in värdena i fyra lika stora delar
och visar mellan vilka värden dessa ligger. Varje del i lådagrammet
innehåller alltså en fjärdedel av värdena. Gränserna mellan varje
fjärdedel kallas **kvartiler**. För att få lådagrammet behöver man fem
viktiga värden. Till att börja med behöver man **minsta värdet**,
**medianen** och **största värdet**. Medianen delar värdena i två lika
stora delar (50 %).

För att dela in det i fjärdedelar måste vi dela de undre värdena i två
lika stora delar. Talet som delar de undre värdena i två lika stora
delar kallas **nedre kvartil** (eller första kvartil) och betecknas
$Q_1$. På motsvarande sätt behövs ett värde för att dela de övre
värdena i två lika stora delar och detta kallas **övre kvartil** (eller
tredje kvartil) och betecknas $Q_3$. Medianen kallas ibland för den
andra kvartilen och betecknas då $Q_2$.

::: figur
<svg viewBox="22 44 166 102" width="287" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett lådagram: en låda från nedre kvartilen Q1 till övre kvartilen Q3 med medianen Q2 som streck i lådan, och morrhår ut till lägsta och högsta värdet. Varje del innehåller 25 procent av värdena. Peka eller tryck på en del av lådagrammet så visas vad den betyder." style="overflow:visible"><style>.m62-s{cursor:pointer;outline:none}.m62-s .m62-ln{transition:stroke-width .18s ease}.m62-s:hover .m62-ln,.m62-s:focus .m62-ln{stroke-width:3}.m62-s .m62-box{transition:fill .18s ease}.m62-s:hover .m62-box,.m62-s:focus .m62-box{fill:#79aacb}.m62-s .m62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m62-s:hover .m62-lbl,.m62-s:focus .m62-lbl{opacity:1}</style><g class="m62-s" tabindex="0"><rect x="24" y="78" width="44" height="24" fill="transparent"/><line class="m62-ln" x1="29.2" y1="90" x2="66" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="29.2" y1="82" x2="29.2" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="22" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="43" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Lägsta</text><text x="43" y="117" font-size="9" text-anchor="middle" fill="#1f2530">värdet</text></g></g><g class="m62-s" tabindex="0"><rect x="140" y="78" width="46" height="24" fill="transparent"/><line class="m62-ln" x1="144.2" y1="90" x2="181" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="181" y1="82" x2="181" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="146" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="167" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Högsta</text><text x="167" y="117" font-size="9" text-anchor="middle" fill="#1f2530">värdet</text></g></g><g class="m62-s" tabindex="0"><rect class="m62-box" x="66" y="70" width="78.2" height="40" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="72" y="79" width="66" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Mittersta 50 %</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">av värdena</text></g></g><g class="m62-s" tabindex="0"><rect x="105" y="68" width="14" height="44" fill="transparent"/><line class="m62-ln" x1="112" y1="70" x2="112" y2="110" stroke="#1f2530" stroke-width="1.6"/><g class="m62-lbl"><rect x="76" y="79" width="58" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Medianen</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">(mittvärdet)</text></g></g><text x="66" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₁</text><text x="112" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₂</text><text x="144" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₃</text><line x1="30" y1="120" x2="65" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="120" x2="111" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="113" y1="120" x2="143" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="120" x2="180" y2="120" stroke="#1f2530" stroke-width="1"/><text x="47" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="89" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="128" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="162" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text></svg>

Peka eller tryck på en del av lådagrammet så visas vad den betyder.
:::

Differensen (skillnaden) mellan övre kvartil och nedre kvartil
motsvarar lådans bredd och kallas **kvartilavstånd**.

::: formel "Kvartilavstånd"
$$
\text{kvartilavstånd} = \text{övre kvartil} - \text{nedre kvartil}
$$
:::

Eftersom varje del av lådan ("vänster pinne", "vänstra lådan", "högra
lådan" och "höger pinne") innehåller lika många värden betyder det att
**ju större delen är desto större är spridningen** i det området (ju
mer spridda ligger värdena). Omvändningen gäller också: **ju mindre
delen är desto mindre är spridningen** (ju mer samlade ligger värdena).

Om man har ett större antal observationer kan man, istället för
kvartiler (fjärdedelar), dela in det statistiska materialet i
**percentiler** (hundradelar). Percentiler anger hur många procent som
är **lägre** än ett visst värde. $p_{80}$ är till exempel den 80:e percentilen
och då är 80 % av värdena mindre än detta värde och 20 % av värdena
större. Percentiler beräknas i Geogebra (se exemplet nedan).

::: exempel "Exempel 1 — Två middagar"
**Adriana arrangerar två olika typer av middagar: en släktmiddag och en
kompismiddag. Åldrarna på deltagarna i respektive middag är:**

**Släktmiddag:** 1, 3, 4, 8, 15, 27, 30, 33, 36, 41, 42, 44, 46, 72, 72

**Kompismiddag:** 28, 30, 31, 31, 32, 32, 33, 33, 34, 34, 34, 34, 35,
35, 36

I b-uppgiften kommer vi att rita lådagrammen nedan över resultaten.

::: figur
<svg viewBox="6 6 226 180" width="390" height="311" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två lådagram över en tallinje från 0 till 75 år: släktmiddagen har en bred låda från 8 till 44 med median 33 och morrhår från 1 till 72, medan kompismiddagen har en mycket liten låda från 31 till 34 med median 33 och morrhår från 28 till 36."><text x="119" y="18" font-size="11" text-anchor="middle" fill="#1f2530">Släktmiddag</text><line x1="17.6" y1="52" x2="35.8" y2="52" stroke="#1f2530" stroke-width="1.3"/><line x1="129.4" y1="52" x2="202.2" y2="52" stroke="#1f2530" stroke-width="1.3"/><line x1="17.6" y1="45" x2="17.6" y2="59" stroke="#1f2530" stroke-width="1.3"/><line x1="202.2" y1="45" x2="202.2" y2="59" stroke="#1f2530" stroke-width="1.3"/><rect x="35.8" y="36" width="93.6" height="32" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.3"/><line x1="100.8" y1="36" x2="100.8" y2="68" stroke="#1f2530" stroke-width="1.5"/><text x="100.8" y="31" font-size="9" text-anchor="middle" fill="#1f2530">33</text><text x="14" y="70" font-size="9" text-anchor="middle" fill="#1f2530">1</text><text x="35.8" y="80" font-size="9" text-anchor="middle" fill="#1f2530">8</text><text x="129.4" y="80" font-size="9" text-anchor="middle" fill="#1f2530">44</text><text x="207" y="70" font-size="9" text-anchor="middle" fill="#1f2530">72</text><text x="119" y="100" font-size="11" text-anchor="middle" fill="#1f2530">Kompismiddag</text><line x1="87.8" y1="128" x2="95.6" y2="128" stroke="#1f2530" stroke-width="1.3"/><line x1="103.4" y1="128" x2="108.6" y2="128" stroke="#1f2530" stroke-width="1.3"/><line x1="87.8" y1="121" x2="87.8" y2="135" stroke="#1f2530" stroke-width="1.3"/><line x1="108.6" y1="121" x2="108.6" y2="135" stroke="#1f2530" stroke-width="1.3"/><rect x="95.6" y="114" width="7.8" height="28" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.3"/><line x1="100.8" y1="114" x2="100.8" y2="142" stroke="#1f2530" stroke-width="1.5"/><text x="100.8" y="109" font-size="9" text-anchor="middle" fill="#1f2530">33</text><text x="80" y="132" font-size="9" text-anchor="end" fill="#1f2530">28</text><text x="94" y="154" font-size="9" text-anchor="middle" fill="#1f2530">31</text><text x="108" y="154" font-size="9" text-anchor="middle" fill="#1f2530">34</text><text x="116" y="132" font-size="9" text-anchor="start" fill="#1f2530">36</text><line x1="10" y1="168" x2="220" y2="168" stroke="#1f2530" stroke-width="1.4"/><polygon points="228,168 219,164 219,172" fill="#1f2530"/><line x1="41" y1="165" x2="41" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="165" x2="67" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="93" y1="165" x2="93" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="119" y1="165" x2="119" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="165" x2="145" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="171" y1="165" x2="171" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="197" y1="165" x2="197" y2="171" stroke="#1f2530" stroke-width="1"/><text x="41" y="182" font-size="8" text-anchor="middle" fill="#1f2530">10</text><text x="67" y="182" font-size="8" text-anchor="middle" fill="#1f2530">20</text><text x="93" y="182" font-size="8" text-anchor="middle" fill="#1f2530">30</text><text x="119" y="182" font-size="8" text-anchor="middle" fill="#1f2530">40</text><text x="145" y="182" font-size="8" text-anchor="middle" fill="#1f2530">50</text><text x="171" y="182" font-size="8" text-anchor="middle" fill="#1f2530">60</text><text x="197" y="182" font-size="8" text-anchor="middle" fill="#1f2530">70</text></svg>
:::

**a) Bestäm för båda middagar medianen, variationsbredden, nedre och
övre kvartil samt kvartilavståndet.<br>b) Rita ett lådagram över resultaten.<br>c) Bestäm utifrån lådagrammet hur stor andel som är över 8 år på släktmiddagen.<br>d) Hur gammal ska man vara för att tillhöra de 10 % äldsta på släktmiddagen?**

**a)** **Medianen** är för båda middagarna 33 år (värdet i mitten). För
att bestämma den **nedre kvartilen**, så bestämmer vi medianen till
alla värden **till vänster** om medianen. Den är 8 år (släktmiddag) och
31 år (kompismiddag). Den **övre kvartilen** är på motsvarande sätt
medianen till alla värden **till höger** om medianen. Den är 44 år
(släktmiddag) och 34 år (kompismiddag).

$$
\text{Variationsbredd}_\text{släkt} = 72 - 1 = 71\ \text{år}
$$

$$
\text{Variationsbredd}_\text{kompis} = 36 - 28 = 8\ \text{år}
$$

$$
\text{Kvartilavstånd}_\text{släkt} = 44 - 8 = 36\ \text{år}
$$

$$
\text{Kvartilavstånd}_\text{kompis} = 34 - 31 = 3\ \text{år}
$$

**Svar:** Släktmiddag: median = 33 år, variationsbredd = 71 år, nedre
kvartil = 8 år, övre kvartil = 44 år och kvartilavstånd = 36 år.
Kompismiddag: median = 33 år, variationsbredd = 8 år, nedre kvartil =
31 år, övre kvartil = 34 år och kvartilavstånd = 3 år.

**b)** Vi markerar största och minsta värdet med korta lodräta streck
ovanför en tallinje. Därefter markerar vi medianen samt nedre och övre
kvartil med längre lodräta streck. Därefter förbinder vi de längre
lodräta strecken och bildar lådagrammen — se figuren ovan.


OBS! Lägg märke till hur den lilla spridningen vid kompismiddagen ger
små delar i lådagrammet, jämfört med lådagrammet för släktmiddagen.

**c)** Vi ska bestämma hur många procent som är äldre än 8 år utifrån
lådagrammet för släktmiddagen ovan. Eftersom varje del i lådagrammet
innehåller 25 % — och 8 år är den nedre kvartilen — betyder det att de
tre delarna till höger om 8 år tillsammans innehåller 75 %.

**Svar:** 75 %

**d)** För att tillhöra de 10 % äldsta ska man ligga över den 90:e
percentilen, $p_{90}$. Vi beräknar $p_{90}$ med Geogebra: skriv in alla
värden i kalkylbladet, markera dem och välj "Skapa lista" (standardnamn
l1). Skriv sedan `Percentil(l1, 90%)` i inmatningsfältet. Geogebra
svarar 72.

**Svar:** 72 år
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Spridningsmått"
- Ett spridningsmått beskriver hur spridda värdena är.
- **Variationsbredd** = största värdet minus minsta värdet.
- **Kvartilavstånd** = övre kvartil minus nedre kvartil, alltså lådans bredd.
:::

::: sampunkt "Kvartiler"
- Kvartilerna delar materialet i fyra lika stora delar, en fjärdedel i varje.
- **Nedre kvartil** $Q_1$ är medianen av värdena till vänster om medianen.
- **Övre kvartil** $Q_3$ är medianen av värdena till höger om medianen.
- Medianen kallas ibland andra kvartilen, $Q_2$.
:::

::: sampunkt "Lådagram"
- Ritas ur fem värden: minsta värdet, $Q_1$, medianen, $Q_3$ och största värdet.
- Varje del innehåller 25 % av värdena.
- Stor del betyder stor spridning i det området, liten del betyder att värdena ligger samlade.
- Andelar läses direkt ur bilden: över nedre kvartilen ligger tre delar, alltså 75 %.
:::

::: sampunkt "Percentiler"
- **Percentiler** delar materialet i hundradelar och används vid många observationer.
- $p_{80}$ betyder att 80 % av värdena är **lägre** och 20 % högre.
- De 10 % äldsta ligger över $p_{90}$.
- Beräknas digitalt, i Geogebra med kommandot `Percentil(l1, 90%)`.
:::

:::
