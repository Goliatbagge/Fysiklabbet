---
id: ma3c-4.S
title: Sammanfattning
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.S'
---

# Sammanfattning — Kurvor och extremvärden

Det här kapitlet handlade om hur derivatan avslöjar en funktions
utseende: var den växer och avtar, var den har lokala maximi- och
minimipunkter, och hur kurvan böjer (konvex eller konkav). Du har lärt
dig att bestämma extrempunkters karaktär både med en teckentabell och med
andraderivatan, att hitta en funktions största och minsta värde i ett
slutet intervall, att skissa en kurva utifrån dess extrempunkter, samt att
lösa extremvärdesproblem både algebraiskt och grafiskt med digitalt
hjälpmedel. Du ska efter kapitlet kunna läsa av och räkna fram en kurvas
form och extrempunkter, och använda detta för att lösa tillämpade
optimeringsproblem.

## Begrepp att kunna

- **växande funktion**: funktion vars graf har positiv lutning i ett
  intervall; $f'(x) > 0$.
- **avtagande funktion**: funktion vars graf har negativ lutning i ett
  intervall; $f'(x) < 0$.
- **strängt växande / strängt avtagande**: en funktion som är växande
  (avtagande) i HELA ett intervall, utan avbrott.
- **lokal extrempunkt**: gemensamt namn för lokal maximipunkt (en "topp",
  där kurvan växlar från växande till avtagande) och lokal minimipunkt
  (en "dal", där kurvan växlar från avtagande till växande).
  Funktionsvärdet i punkten kallas **lokalt extremvärde**.
- **terrasspunkt**: en punkt där tangenten är vågrät ($f'(a) = 0$) men
  kurvan fortsätter i samma riktning som innan, utan att vända.
- **teckentabell**: tabell som visar tecknet på $f'(x)$ (eller $f''(x)$)
  i intervallen mellan nollställena; används för att bestämma
  extrempunkters karaktär eller kurvans form.
- **andraderivata ($f''(x)$)**: derivatan av derivatan, utläses
  "$f$ bis av $x$"; beskriver hur lutningen $f'(x)$ ändras.
- **konvex kurva**: kurva som "böjer av uppåt" (en "glad" kurva);
  $f''(x) > 0$.
- **konkav kurva**: kurva som "böjer av nedåt" (en "sur" kurva);
  $f''(x) < 0$.
- **inflexionspunkt**: punkten där kurvan växlar mellan konvex och
  konkav; $f''(x) = 0$.
- **andraderivatametoden**: metod att bestämma en extrempunkts karaktär
  med hjälp av tecknet på $f''(a)$, som alternativ till en teckentabell.
- **extremvärdesproblem (optimeringsproblem)**: problem som handlar om
  att bestämma ett störst eller minst möjligt värde, t.ex. maximal area
  eller minimal kostnad.
- **kurvkonstruktion**: att skissa en funktions graf utifrån dess
  ändpunkter, extrempunkter och inflexionspunkter, utan att räkna ut
  fler punkter än nödvändigt.

## Formler

::: formel "Kapitlets formler och regler"
**Växande och avtagande funktion**

$$
f'(x) > 0 \quad \Rightarrow \quad f(x) \text{ är växande}
$$

$$
f'(x) < 0 \quad \Rightarrow \quad f(x) \text{ är avtagande}
$$

**Lokal extrempunkt**

$$
f'(a) = 0
$$

Punkten där $x = a$ är då en lokal maximipunkt, en lokal minimipunkt
eller en terrasspunkt — vilket avgörs med en teckentabell eller med
andraderivatan.

**Andraderivatan och kurvans form**

$$
f''(a) > 0 \quad \Rightarrow \quad \text{kurvan är konvex vid } x = a
$$

$$
f''(a) < 0 \quad \Rightarrow \quad \text{kurvan är konkav vid } x = a
$$

$$
f''(a) = 0 \quad \Rightarrow \quad x = a \text{ är en inflexionspunkt}
$$

**Andraderivatametoden — extrempunktens karaktär**

Om $f'(a) = 0$ gäller

$$
f''(a) > 0 \quad \Rightarrow \quad \text{lokal minimipunkt}
$$

$$
f''(a) < 0 \quad \Rightarrow \quad \text{lokal maximipunkt}
$$

$$
f''(a) = 0 \quad \Rightarrow \quad \text{terrasspunkt eller extrempunkt (teckentabell krävs)}
$$

där

- $f'(x)$ = förstaderivata (kurvans lutning)
- $f''(x)$ = andraderivata (hur lutningen ändras)
:::

## Viktiga samband och metoder

- Metoden "derivera $\to$ sätt $f'(x) = 0$ $\to$ lös" ger extrempunkternas
  $x$-koordinater; sätt sedan in dessa i den URSPRUNGLIGA funktionen
  $f(x)$ — inte i derivatan — för att få $y$-koordinaterna.
- Karaktären hos en extrempunkt kan bestämmas på två sätt: med en
  teckentabell (tecknet på $f'(x)$ strax till vänster/höger om punkten)
  eller snabbare med andraderivatametoden. Är $f''(a) = 0$ räcker inte
  andraderivatametoden — då krävs en teckentabell ändå.
- För en andragradsfunktion kan karaktären avgöras direkt utan
  derivering, utifrån tecknet framför $x^2$-termen: en positiv
  koefficient ger en "glad" kurva (minimipunkt), en negativ ger en "sur"
  kurva (maximipunkt).
- Störst/minst värde i ett slutet intervall $a \leq x \leq b$: jämför
  funktionsvärdet i ALLA extrempunkter inom intervallet med värdena i de
  två ändpunkterna — det störst/minst av dessa är svaret, aldrig något
  annat ställe.
- Kurvkonstruktion: rita en jämn kurva genom ändpunkter, extrempunkter
  och inflexionspunkter. Kurvans stigning eller sjunkning mellan
  punkterna ges av tecknet på $f'(x)$ i teckentabellen.
- En inflexionspunkt ligger alltid mitt emellan två närliggande
  extrempunkter till samma funktion (symmetri) — ett genvägsknep när
  extrempunkternas $x$-koordinater redan är kända.
- Andraderivatan $f''(x)$ kan tolkas som derivatan av $f'(x)$: en
  inflexionspunkt hos $f(x)$ svarar mot en extrempunkt hos $f'(x)$.
- Extremvärdesproblem löses i samma steg som när man vanligtvis tar fram
  extrempunkter, med ett tillägg: ett bivillkor används för att skriva om
  den storhet som ska optimeras i EN enda variabel innan derivering, och
  svaret tolkas till sist i problemets sammanhang (med rätt enhet).
- Kontrollera alltid att svaret i ett extremvärdesproblem ligger inom en
  rimlig definitionsmängd, t.ex. att en radie eller höjd inte blir
  negativ.
- Extremvärdesproblem kan även lösas grafiskt med digitalt hjälpmedel,
  t.ex. Geogebra: rita upp funktionen och använd verktyget Extrempunkt i
  stället för att derivera för hand. $x$-koordinaten ger den sökta
  variabeln och $y$-koordinaten det optimerade värdet — men bara som ett
  avrundat värde, inte ett exakt uttryck.
- Skilj en lokal extrempunkt (kurvan vänder) från en terrasspunkt (kurvan
  planar ut men fortsätter i samma riktning) — båda har $f'(a) = 0$, men
  bara i en extrempunkt byter $f'(x)$ tecken.

## Figurer värda att minnas

En kurva som stiger till en topp, sjunker till en dal och stiger igen —
grunddefinitionen av lokal maximipunkt och lokal minimipunkt:

::: figur
<svg viewBox="4 -2 268 202" width="268" height="202" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En kurva som stiger till en lokal maximipunkt, sjunker till en lokal minimipunkt och stiger sedan igen. Peka eller tryck på en extrempunkt så visas den vågräta tangenten och att derivatan är 0 där." style="overflow:visible"><style>.q42s{cursor:pointer;outline:none}.q42s .q42-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q42s:hover .q42-lbl,.q42s:focus .q42-lbl{opacity:1}.q42s .q42-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q42s:hover .q42-pt,.q42s:focus .q42-pt{transform:scale(1.5)}</style><line x1="20" y1="100" x2="236" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="248,100 236,95 236,105" fill="#1f2530"/><line x1="132" y1="190" x2="132" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="132,4 127,18 137,18" fill="#1f2530"/><text x="244" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="140" y="15" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M40,176.4 L44.6,156.2 L49.2,138.6 L53.8,123.3 L58.4,110.3 L63,99.4 L67.6,90.5 L72.2,83.4 L76.8,78.1 L81.4,74.3 L86,72 L90.6,71.1 L95.2,71.3 L99.8,72.5 L104.4,74.7 L109,77.7 L113.6,81.4 L118.2,85.6 L122.8,90.2 L127.4,95 L132,100 L136.6,105 L141.2,109.8 L145.8,114.4 L150.4,118.6 L155,122.3 L159.6,125.3 L164.2,127.5 L168.8,128.7 L173.4,128.9 L178,128 L182.6,125.7 L187.2,121.9 L191.8,116.6 L196.4,109.5 L201,100.6 L205.6,89.7 L210.2,76.7 L214.8,61.4 L219.4,43.8 L224,23.6" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q42s" tabindex="0"><circle cx="92" cy="71" r="16" fill="transparent"/><circle class="q42-pt" cx="92" cy="71" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="62" y1="71" x2="122" y2="71" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="90" y="58" font-size="11.5" text-anchor="middle" fill="#c8324a">derivatan är 0</text></g></g><g class="q42s" tabindex="0"><circle cx="172" cy="129" r="16" fill="transparent"/><circle class="q42-pt" cx="172" cy="129" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="142" y1="129" x2="202" y2="129" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="160" y="150" font-size="11.5" text-anchor="end" fill="#c8324a">derivatan är 0</text></g></g><text x="8" y="34" font-size="12.5" fill="#1f2530">lokal</text><text x="8" y="47" font-size="12.5" fill="#1f2530">maximipunkt</text><text x="182" y="150" font-size="12.5" fill="#1f2530">lokal</text><text x="182" y="163" font-size="12.5" fill="#1f2530">minimipunkt</text></svg>

Peka eller tryck på en extrempunkt så visas den vågräta tangenten.
:::

Övergången mellan en konkav (blå) och en konvex (röd) del av en kurva,
med inflexionspunkten mitt emellan:

::: figur
<svg viewBox="12 6 280 173" width="280" height="173" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Graf som visar övergången mellan en konkav och en konvex kurva. Vänster del av kurvan är blå och konkav, med andraderivatan negativ. Höger del är röd och konvex, med andraderivatan positiv. Mitt emellan, där kurvans lutning inte ändras, ligger inflexionspunkten. Peka eller tryck på en kurvdel eller inflexionspunkten så visas andraderivatans tecken." style="overflow:visible">
<style>.q44s{cursor:pointer;outline:none}.q44s .q44-cv{transition:stroke-width .18s ease}.q44s:hover .q44-cv,.q44s:focus .q44-cv{stroke-width:3.6}.q44s .q44-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q44s:hover .q44-lbl,.q44s:focus .q44-lbl{opacity:1}.q44s .q44-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q44s:hover .q44-pt,.q44s:focus .q44-pt{transform:scale(1.5)}</style>
<line x1="16" y1="105" x2="275" y2="105" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="288,105 275,100.5 275,109.5" fill="#1f2530"/>
<line x1="150" y1="175" x2="150" y2="25" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="150,14 145.5,25 154.5,25" fill="#1f2530"/>
<text x="283" y="122" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="160" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<g class="q44s" tabindex="0">
<path d="M29,169.8 L40,137 L51,111.9 L62,93.7 L73,81.7 L84,75.1 L95,73 L106,74.8 L117,79.7 L128,86.8 L139,95.5 L150,105" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M29,169.8 L40,137 L51,111.9 L62,93.7 L73,81.7 L84,75.1 L95,73 L106,74.8 L117,79.7 L128,86.8 L139,95.5 L150,105" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round"/>
<text x="50" y="60" font-size="13" text-anchor="start" fill="#2563c9">Konkav</text>
<g class="q44-lbl"><rect x="47" y="64" width="58" height="16" rx="4" fill="#f3eee4"/><text x="50" y="76" font-size="12" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &lt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<path d="M150,105 L161,114.5 L172,123.2 L183,130.3 L194,135.2 L205,137 L216,135 L227,128.3 L238,116.3 L249,98.1 L260,73 L271,40.2" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M150,105 L161,114.5 L172,123.2 L183,130.3 L194,135.2 L205,137 L216,135 L227,128.3 L238,116.3 L249,98.1 L260,73 L271,40.2" fill="none" stroke="#c8324a" stroke-width="2.4" stroke-linecap="round"/>
<text x="210" y="155" font-size="13" text-anchor="start" fill="#c8324a">Konvex</text>
<g class="q44-lbl"><text x="210" y="171" font-size="12" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &gt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<circle cx="150" cy="105" r="15" fill="transparent"/>
<line x1="160" y1="52" x2="152" y2="99" stroke="rgba(31,37,48,0.5)" stroke-width="1.2" stroke-dasharray="3 3"/>
<circle class="q44-pt" cx="150" cy="105" r="3.5" fill="#f3eee4" stroke="#1f2530" stroke-width="1.6"/>
<text x="163" y="42" font-size="12" text-anchor="start" fill="#1f2530">Inflexionspunkt</text>
<g class="q44-lbl"><text x="163" y="57" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) = 0</text></g>
</g>
</svg>
<p class="lab-figur-cap">Andraderivatan är negativ för hela den blå delen av kurvan ("ledsen" kurva, konkav) och positiv för hela den röda delen ("glad" kurva, konvex). I inflexionspunkten, där kurvan varken är konkav eller konvex, är andraderivatan lika med noll. Peka eller tryck på en kurvdel eller inflexionspunkten så visas andraderivatans tecken.</p>
:::

## Inför provet

- Kan du avgöra om en funktion är växande eller avtagande utifrån
  tecknet på $f'(x)$, både från en graf och från ett funktionsuttryck?
- Vet du skillnaden mellan en lokal maximipunkt, en lokal minimipunkt
  och en terrasspunkt?
- Kan du bestämma lokala extrempunkter genom att derivera, sätta
  $f'(x) = 0$ och lösa ekvationen — och sedan sätta in $x$-värdena i
  den URSPRUNGLIGA funktionen för att få $y$-koordinaterna?
- Kan du bestämma en extrempunkts karaktär med en teckentabell?
- Vet du hur du snabbt avgör karaktären hos en andragradsfunktions
  extrempunkt utifrån tecknet på $x^2$-termen?
- Kan du bestämma en funktions största och minsta värde i ett slutet
  intervall genom att jämföra extrempunkter med intervallets ändpunkter?
- Kan du skissa en funktions graf (kurvkonstruktion) utifrån dess
  ändpunkter, extrempunkter och deras karaktär?
- Vet du vad andraderivatan $f''(x)$ beskriver, och kan du avgöra om en
  kurva är konvex eller konkav utifrån dess tecken?
- Kan du bestämma en inflexionspunkts koordinater, och vet du att den
  ligger mitt emellan två närliggande extrempunkter?
- Kan du använda andraderivatametoden för att avgöra en extrempunkts
  karaktär utan teckentabell, och vet du när metoden inte räcker till
  ($f''(a) = 0$)?
- Kan du lösa ett extremvärdesproblem: ställa upp en formel, använda ett
  bivillkor för att få en enda variabel, derivera, bestämma karaktären
  och tolka svaret i sammanhanget?
- Kan du lösa ett extremvärdesproblem grafiskt med digitalt hjälpmedel,
  t.ex. med Geogebras verktyg Extrempunkt?
