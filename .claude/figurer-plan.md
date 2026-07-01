# Plan: ersätt platshållartext med riktiga figurer i teorin

**Mål:** Gå igenom ALLA `data/teori/*.md` och ersätt de "fula" beskrivande
`::: bild`-platshållarna ("Figur: …") med riktiga, konstruerade SVG-figurer
(samma hantverk som simuleringarna). Figurer som är **för avancerade**
(riktiga foton, fotorealism, komplexa 3D-scener) lämnas som `::: bild`-text
tills vidare — vi löser dem på annat sätt senare.

Status totalt: **222 figur-block i 69 filer.** Mall/pilot helt klar (fy1-3.2).

---

## ▶ NÄSTA STEG (start här nästa session) — uppdat. 2026-06-21

**Var vi står:** Infrastrukturen är klar och committad. fy1-3.2 är den
godkända **mallen** — den uppfyller alla regler användaren gett:
3D-låda efter PDF, friktion i bakkanten, ordning stam→figur→deluppgifter,
tät viewBox, text i brödtextstorlek (16 px). Tre maskinella grindar finns
(`verify-no-white-outline`, `verify-figur-bounds` [viewBox-luft + skala +
placering]).

**Gör härnäst:** Bygg resten av kapitlet **Krafter (fy1-3.x)** —
kraftdiagrammen, mest värdefulla och närmast mallen. Ordning att ta dem:
1. ~~`fy1-3.4` Tyngdkraft och normalkraft~~ — **KLAR (2026-06-22).** 3 figurer:
   vikt på bord (`F_N` upp/`F_G` ned), låda på lutande plan + föremål mot vägg
   (egen figur var, med bildtext), bom med motvikt i exempel.
2. ~~`fy1-3.3` Newtons tredje lag~~ — **KLAR (2026-06-22).** 7 figurer:
   hand mot vägg (kraft/motkraft, färgkodade pilar + bildtext), vikt på bord
   (jämvikt), jorden/månen (3 kg vs 1 kg, lika krafter), äpple/jordklot
   (0,80 N action/reaktion), dragkamp felaktig (600/400 N) + korrekt
   (`F_A=F_B`, `K_A>K_B`), bil med magnet. Astronaut-fotot kvar som `::: bild`
   (SKIP-listan). PDF: `Fy 1 4.03 Newtons tredje lag.pdf`.
3. ~~`fy1-3.6` Friktion~~ — **KLAR (2026-06-22).** 4 figurer: kloss i fyra
   lägen (drag/friktion skalenligt), bokhylla (`F_R = F_drag − F_f`), bil
   (`F_N1+F_N2 = F_G`, `F_putt=F_f`), person som går (F₁/F₂ action-reaktion).
4. ~~`fy1-3.7` Lutande plan~~ — **KLAR (2026-06-22).** 5 figurer:
   komposanter (två rutnät: F + F_x/F_y med α), låda på plan (F_N/F_f/F_G +
   komposanter F₁/F₂ skalenligt, F_N=F₂, F_f=F₁), härledning vinklar
   (v, x, 90°−v + räta vinklar), exempel 1 (34°), exempel 2 (36°, F_f<F₁ +
   F_R nedför planet). Återanvänd lutande-plan-geometrin (A(60,175),
   hyp 210 px, α=34°-geometri) mellan fig 2/3/4/5. PDF: `Fy 1 4.07 Lutande plan.pdf`.
5. ~~`fy1-3.8` Sneda spännkrafter~~ — **KLAR (2026-06-22).** 1 figur:
   parallellogram-konstruktion på rutigt papper (F_G ned, lika lång streckad
   resultant upp, två repriktningar, spännkrafterna F_S1/F_S2 som komposanter).
   Avsnittet är WIP-författarnoteringar men figuren är ren och drawable.
6. ~~`fy1-3.1` Kraft och Newtons första lag~~ — **KLAR (2026-06-22).** 2 figurer:
   komposantuppdelning (F blå diagonal + Fₓ/Fᵧ streckade längs axlar + α på
   rutnät), och 25°-kraft­triangel (F = 20 N hypotenusa, Fᵧ motstående katet
   streckad, rät vinkel). Dynamometer-fotot [1] kvar som `::: bild` (SKIP).
7. ~~`fy1-3.10` Trissor~~ — **KLAR (2026-06-22).** 2 figurer: bord med två
   trissor + snöre och hängande vikter (1 kg/3 kg, 3 kg-lådan större), samt
   frikropp av 1 kg-vikten (F_S upp > F_G1 ned). PDF: `Fy 1 4.10 Trissor.pdf`.
   OBS: frikroppsfiguren behövde sido-etiketter + vw=72 för att klara
   verify-figur-bounds (text-bredd mäts inte → topp-etikett klipps annars).
8. ~~`fy1-3.9` Accelerationens riktning~~ — **KLAR (2026-06-22).** 5 figurer:
   bollkast rakt upp (person + streckad bana + bollar med skalenliga
   hastighetspilar 6→0→−6 m/s, talen i bildtext), och fyra hiss-triptyker
   (A/B/C med passagerare + hastighetspilar upp/ner). Hiss-figurerna
   genererades med `.shots/gen_elev.js` (delad mall, auto-tight viewBox).
   PDF: `Fy 1 4.09 Accelerationens riktning.pdf`.
   **KAPITEL KRAFTER (fy1-3.x) NU KOMPLETT** (3.1–3.10; dynamometer- och
   astronaut-foton kvar som SKIP).
   - Verktygsändring: `verify-figur-bounds.js` placeringsregel hoppar nu över
     exempel med FLERA figurer (en skiss per deluppgift är legitimt).
9. ~~`fy1-2.4` Hastighet-tid-diagram~~ — **KLAR (2026-06-22).** 2 v-t-diagram:
   bilen på parkeringen (trappstegslinje 16→6→0) och rät linje (0,10)→(10,−10)
   med skuggade areor A₁/A₂. Byggda med ny återanvändbar graf-generator
   `.shots/gen_graph.js` (cyan axlar, rutnät, box- eller pil-stil, areor).
   `.shots` är gitignored → generatorn finns kvar lokalt mellan sessioner.
   PDF: `Fy 1 3.04 Hastighet-tid-diagram.pdf`.
10. ~~**rörelse-grafer, fy1-2.x**~~ — **KLART (2026-06-23).** `fy1-2.5` (1 a-t
   med area A), `fy1-2.6` (1 generell v-t-härledning, rektangel+triangel),
   `fy1-2.2` (5: sekant/tangent-koncept, Ex1 rät linje + Δs/Δt, Ex2 Adam &
   Bertil, Ex3 böjd kurva + tangent), `fy1-2.1` (3: triangel 4+3→5, David
   över floden, vektoraddition parallellförflyttning), `fy1-2.3` (1 jord-
   ellips polradie/ekvatorialradie). **KAPITEL RÖRELSE (fy1-2.x) NU
   KOMPLETT** (2.1–2.6; 2.7 GeoGebra-skärmdump kvar som SKIP).
   - `.shots/gen_graph.js` utökad: `dots` + `texts` (datakoordinater) och
     `labelDecimals:{x,y}` för fixerade decimaler på axeletiketter.
   - `.shots/gen_vec.js`-mönster (i g21.js): återanvändbar `arrow()`-helper
     (butt-cap, skalenligt huvud) för vektorfigurer.
11. ~~**energi-kapitlet, fy1-4.x**~~ — **KLART (2026-06-23).** `fy1-4.1`
   (Hosni-vagn: F snett med komposanter F₁/F₂, vinkel v, sträcka s, blå kärra
   på hjul), `fy1-4.4` (klippkast: parabelbana via sampelpunkter, h₁-dimension,
   läge 1/2-prickar, v₁/v₂ maroon-pilar, vågig havsyta), `fy1-4.7` (F-t-graf
   via `gen_graph.js`: skuggad trapets-area, streckade delare vid t=3/7,
   A/B/C-etiketter), `fy1-4.8` (rörelsemängd före/efter: två-panels
   stick-figurer, v-pilar maroon, massetiketter). **KAPITEL ENERGI NU
   KOMPLETT** (4.1–4.9; inga foton/SKIP). Lärdom: velocity-figurer i detta
   kapitel använder maroon `#9c2f3a` (matchar PDF:ernas röda v-pilar).
   `gen48.js` = ny stick-figur-generator.
12. ~~**tryck/lyftkraft, fy1-5.x**~~ — **KLART (2026-06-23).** `fy1-5.2`
   (fyra bassänger med olika form, dykare på samma djup + streckad djuplinje +
   h-mått, generator `gen52.js`), `fy1-5.4` (kub i vätska med 4 röda
   tryckkraftspilar + grön F₀ resultant; flyter/sjunker två-panels med
   F_lyft/F_tyngd skalenligt), `fy1-5.5` (Algot-barn håller röd ballong,
   kraftkolumn F_L/F_G/F_S skalenligt F_L=F_G+F_S), `fy1-5.7` (hydraulisk
   domkraft med bil; U-rör med kolvar A₁/A₂, F₁/F₂, p₁=p₂). **KAPITEL TRYCK
   NU KOMPLETT** (5.1–5.7; inga foton/SKIP). Lärdomar: edge-etiketter ankras
   vid sin YTTRE textkant (vänster→start, höger→end) så verify-ankaret = glyfens
   kant; `p₁ = p₂` i SVG byggs med `<tspan dy="3">`/`<tspan dy="-3">` för att
   återställa baslinjen efter subscript.
13. ~~värme `fy1-6.3`~~ — **KLAR (2026-06-24).** 2 figurer: fascykel
   (Fast/Flytande/Gas med iskub/droppe/moln + sex böjda övergångspilar,
   stora sublimering/deposition-bågar + små smältning/stelning/förångning/
   kondensering, generator `gen63.js` med `arc()`-helper för Bézier-pilhuvuden)
   och värmediagram (cyan axlar, blå trappkurva med två platåer vid 0/100 °C,
   tunna guide-pilar #6f93b8 + tvåradiga etiketter). PDF: `Kopia av Fy 1 7.03
   Faser och fasövergångar.pdf`. Lärdom: NBSP före °C (0 °C) gör exakt
   Edit-matchning omöjlig → splica via radnummer i python i stället.
14. ~~ellära `fy1-7.x`~~ — **KLART (2026-06-24). KAPITEL ELLÄRA KOMPLETT.**
   17 figurer över 6 filer:
   - `fy1-7.1` (3): laddade kulor som pendlar (repulsion/neutral/attraktion),
     influens i ledare (oladdat vs negativ stav), influens isolator (dipoler)
     vs ledare (fria elektroner). `gen71.js`.
   - `fy1-7.3` (3): elektronflöde (ledare+batteri, röd strömpil vs blå
     elektronpil), Kirchhoff (4 strömmar I1+I2=I3+I4), T-förgrening. `gen73.js`.
   - `fy1-7.6` (4 + symboltabell): amperemeter serie, voltmeter parallellt,
     serie- och parallellkoppling. Symboltabell P15–P22 → inline-symboler.
     **Återanvändbart symbolbibliotek `gen76.js`** (lamp/meter/batteryH/wire/
     resistor/switch). Detta är grundmallen för alla framtida kretsscheman.
   - `fy1-7.8` (1): komplex koppling R1 i serie med parallell R2/R3. `gen78.js`.
   - `fy1-7.10` (1): tre fältlinjemönster (+/−/dipol). `gen710.js`.
   - `fy1-7.11` (1): homogent fält mellan plattor 2D+3D. `gen711.js`.
   - `fy1-7.12` (1): analogi laddning-i-fält vs massa-i-gravfält. `gen712.js`.
   - `fy1-7.13` (1): Faradays bur i 3 steg. `gen713.js`.
   - `fy1-7.14` (1): Millikans oljedroppe i jämvikt. `gen714.js`.
   Färgkonvention etablerad: **röd = +, blå = −, grön = neutral**; kretsar i
   currentColor (ink). Lärdomar: (a) topp-etikett med versal (U/R/I) à 16px
   spräcker 10px-marginalströskeln → använd 14px för topp-etiketter; (b) 𝔼
   (blackboard-E, U+1D53C) renderas fint i Poppins-fallback; (c) tabellceller
   hade U+0001-styrtecken runt P-platshållarna → matcha inkl. dem.
15. ~~kvar i fy1 (drawable): `fy1-8.1` + `fy1-9.1`~~ — **KLART (2026-07-01).**
   `fy1-8.1` (1: Michelson–Morley, sol med korona + jord på streckad bana +
   två ljusstrålar c vänster/höger + v-pil), `fy1-9.1` (2: heliumatom med
   kärna [2 röda p+, 2 vita n] + elektronskal + teckenförklaring; samt
   excitation/deexcitation-triptyk — två paneler med 6 skal, energinivåer
   0–13,32 eV, röd hopp-pil, cyan foton-våg). PDF: `Fy 1 10.01
   Relativitetsteori.pdf`, `Fy 1 11.01 Atomkärnan.pdf`. **HELA FYSIK 1 NU
   KLAR** (drawable-figurer). Kvar i fy1 = bara SKIP-foton/GeoGebra (1.4, 2.7,
   3.1, 3.3). Lärdom: legend-etiketter vid höger kant ankras `text-anchor="end"`
   vid textens YTTRE kant (skriptet mäter inte textbredd → vänsterankrad text
   ger falsk "för stor högermarginal").
16. **NÄSTA:** hela **Fysik 2** (fy2-*.md) — börja med mekanik fy2-1.x
   (moment/cirkelrörelse/pendlar), de liknar fy1-3-mallarna mest.

**Lärdom (2026-06-23):** node `fs.writeFileSync` skriver INTE avslutande
radbrytning. Bygger man figur-txt med `{ echo "::: figur"; cat fil.svg;
echo ":::"; }` hamnar då `</svg>:::` på SAMMA rad → figur-fencen saknar
`\n:::` och build/katalog-parsern blir fel. Lägg ALLTID en `\n` efter svg:n
(`printf '\n:::\n'` eller skriv svg-filen med trailing newline). Grep
`</svg>:::` i md efter splice för att fånga det.

**Lärdom (2026-06-23, kantetiketter & verify-figur-bounds):** en etikett i
fri yta vid figurens vänster/höger-kant ska ankras vid sin YTTRE textkant
(`text-anchor="end"` för högeretikett, `"start"` för vänsteretikett) så att
ankarpunkten (det enda skriptet mäter) ligger där texten faktiskt slutar.
Annars antingen falsklarm (luft mellan geometri och ankaret) eller klippning
(om man beskär till ankaret klipps textbredden utanför). För TOPP-etiketter:
glyfens versalhöjd ≈ 11 px över baslinjen — håll `vy` ≤ baslinje−11 OCH
top-marginal ≤ tröskeln (0,06·vh, min 10); välj `vh` så att båda ryms.

## ⚠️ DIAGRAM-CHECKLISTA (läs FÖRE varje nytt diagram — granskat 2026-06-23)

Användaren granskade fy1-2.2 och hittade fyra fel som ALLA var undvikbara.
Dra lärdom; dessa ska inte upprepas:

1. **viewBox MÅSTE rymma textens BREDD och HÖJD, inte bara ankarpunkten.**
   `verify-figur-bounds.js` mäter bara text-*ankaret* → en viewBox som
   beskärs till ankaret KLIPPER glyferna utan att skriptet varnar. Symptom
   som redan inträffat: y-axelns tal `10 20 … 60` (ankrade `end`) fick
   vänstersiffran bortklippt och visade bara **"0 0 0"**; en diagramrubrik
   fick överkanten kapad. **Lösning (gjord):** `gen_graph.js` beräknar nu
   viewBoxen AUTOMATISKT inkl. uppskattad textbredd (`len·fs·0,56`),
   versalhöjd (`0,74·fs`) och nedstapel (`0,24·fs`). **Sätt ALDRIG viewBox/
   width/height för hand på en `makeGraph`-figur** — lita på auto-fit.
   Behöver en figur extra topp-utrymme (t.ex. rubrik som blir översta
   elementet) kan `pad` sänkas (t.ex. `pad: 2`) så bounds-tröskeln (0,06·vh)
   inte överskrids.
2. **Punkter PÅ en kurva måste BERÄKNAS från kurvfunktionen, inte ögonmåttas.**
   Sampla kurvan som en polyline `f(t)` och placera prickar/sekant/tangent på
   sampelparametrar → garanterat på kurvan. En **sekant** går genom TVÅ
   kurvpunkter; en **tangent** snuddar EN kurvpunkt med lutning = lokala
   derivatan (`(f(t+h)−f(t−h))`). Eyeballade punkter hamnade "liite ovanför".
3. **Pedagogiska "slå en sekant/tangent"-grafer ska vara KURVOR, inte räta
   linjer.** Adam & Bertil ritades först som räta linjer → hela poängen (att
   approximera med en sekant) försvann. Rita oregelbundna kurvor; behåll bara
   de avläsningspunkter uppgiften använder exakt (Bertils ändpunkter (0,6)
   och (25,0)).
4. **Etikettens sida styrs av kurvans konkavitet.** En konkav (nedåtböjd)
   kurva ligger UNDER sin tangent och ÖVER sin sekantkorda → lägg
   tangent-etiketten OVANFÖR linjen, sekant-etiketten UNDER. Lyft etiketten
   från linjen med en vinkelrät offset så den hamnar i fri yta.
5. **Förhandsvisnings-HTML cachar den inbäddade SVG:n.** Bygg om
   `.shots/figtestNN.html` (cat:a in den nya svg-filen) EFTER varje
   regenerering — annars visar skärmdumpen den gamla figuren och du "fixar"
   i blindo. (Brände en hel iterationsrunda på detta.)
6. **Granska alltid en INZOOMAD skärmdump** (`--force-device-scale-factor=4`)
   av punkter/tangenter/etiketter — fel på några få px syns inte i översikt.
7. **AXELETIKETT-KONVENTION (obligatorisk på alla koordinataxlar med pilspets,
   granskat 2026-06-23).** Beteckning och enhet placeras SEPARAT vid pilspetsen:
   - **Beteckningen** (storhetssymbol, KURSIV) står BREDVID spetsen: variabeln
     **till HÖGER** om y-pilens spets och **ovanför** x-pilens spets.
   - **Enheten** (RAK, **UTAN parentes**) står på motsatt sida: **till VÄNSTER**
     om y-spetsen och **under** x-spetsen.
     (Korrigerat 2026-06-23: y-axeln har storhet till höger, enhet till vänster.)
   - Alltså INTE den gamla stilen `v (m/s)` / `t (s)` i ett block, utan
     `v` + `m/s` resp. `t` + `s` på var sin sida om spetsen.
   - **Tickvärdet vid själva pilspetsen skrivs INTE ut** (ger plats åt
     etiketten) — `gen_graph.js` utelämnar det automatiskt i `style:'arrows'`.
   - Är spetsvärdet relevant för uppgiften (t.ex. starthastigheten 10): **förläng
     axeln ett snäpp** (sätt `ymax`/`xmax` ett steg ovanför det relevanta
     värdet) så att värdet kan visas med pilspetsen ovanför. Se till att
     översta ticken har ~0,7 steg luft till spetsen så beteckningen inte
     trängs (fy1-2.4 fig2: yRange [-12,12], visar 10).
   - I `gen_graph.js`: skicka `xVar/xUnit/yVar/yUnit` (inte `xTitle/yTitle`).
     Enheten får innehålla `<tspan dy>` för exponent (m/s² = `m/s<tspan
     dy="-4" font-size="9">2</tspan>`).

**Lärdom (2026-06-23, användarens granskningsrunda fy1-4.x/5.x):** sex fel
påpekades — ALLA undvikbara, dra lärdom:
1. **Vinkelbeteckning står på UTSIDAN av vinkelbågen** — längs bisektrisen,
   längre från vertex än bågens radie (bågen mellan vertex och etiketten),
   ALDRIG innanför bågen. (fy1-4.1: `v` flyttades från radie ~0 till ~38 px
   längs bisektrisen.)
2. **Text får ALDRIG nudda en kurva/bana.** En läges-/punktetikett vid en
   kurva (t.ex. "Läge 2" på en kastbana) placeras tydligt vid SIDAN om kurvan
   med ankaret vid glyfens YTTRE kant (`text-anchor="end"` för en etikett som
   ska ligga till höger om kurvan, så glyfens vänsterkant hamnar strax till
   höger om kurvan). Lika viktigt i diagram: area-/deletiketter (A/B/C) måste
   ha luft till grafens linjer — håll ≥ 6–8 px från närmaste linje (fy1-4.7:
   `C` flyttades vänster så bokstaven inte nuddade den nedåtgående linjen).
3. **Resulterande kraft betecknas `F_R`, ALDRIG `F_0`.** (fy1-5.4.)
4. **Föremål mot ljus pappersbakgrund får INTE vara vita** — ett vitt föremål
   smälter in i pappret. Använd grått (`#aeb4bc` fyllning, `#7c828c` kontur)
   för t.ex. ett sjunkande föremål. (Vit reserveras för föremål mot mörk/blå
   yta, t.ex. en flytande planka i vatten är OK ljusgrå.)
5. **Visar scenen människor i en specifik kontext (rullskridskor, skidor,
   dykare) — rita kontextrekvisitan**, inte generiska figurer. Och **variera
   storleken efter fysiken**: större massa → längre/större figur (fy1-4.8:
   Boel 85 kg ritades 10 % längre än Agnes 60 kg, båda med rullskridskor
   = sula + två hjul under varje fot).

**Lärdom (2026-06-22, fy1-3.3):** Långa beskrivande etiketter i fri yta
krockar med `verify-figur-bounds` (skriptet mäter text-*ankarpunkt*, inte
text-*bredd* → tomt band mellan geometri och viewBox-kant flaggas). Lösningar:
(a) flytta beskrivningen till en **bildtext** (`<p>` efter `</svg>`) och
färgkoda pilarna i stället; (b) centrera korta etiketter inom geometrins
x-spann; (c) gör geometrin (t.ex. jordklotet) bred nog att nå etikettens
ytterkant. **Använd ABSOLUTA path-koordinater** (`C`/`L`, inte relativa
`c`/`q`) — bounds-skriptet läser varje talpar i `d` som en absolut punkt, så
relativa kontrollpunkter ger falska bbox-larm.

**Arbetsgång per figur (checklista):**
1. Öppna motsvarande PDF i `Genomgångar/Fysik 1/` (mappa via `title:`) och
   titta på figuren. 2. Byt `::: bild`→`::: figur`, skriv inline-SVG som
   efterliknar PDF:en (3D-objekt, perspektivgolv, kraftbeteckningar `F_G`
   stort G, `F_N`, `F_f`…). 3. `width`/`height` = viewBox, text 16 px,
   tät viewBox, figur före deluppgifterna. 4. `node data/teori/build.js`.
   5. Skärmdump (mall `.shots/figtest.html` eller djuplänk
   `localhost:8000/katalog.html#fy1-3.4`) + granska. 6. Kör
   `node .claude/verify-figur-bounds.js` och `verify-no-white-outline.js`.
   7. Committa per kapitel (användaren vill ha löpande commits).

**Obs about CLAUDE.md:** mina figurregler ligger även i CLAUDE.md men den
filen har användarens egen WIP ostagead → jag har INTE committat CLAUDE.md.
Reglerna är säkrade här i planen + i minnet oavsett.

---

## Mekanism (så här bygger du en figur)

1. Byt blocket `::: bild` → `::: figur` och lägg **inline-SVG** i blocket.
   Exempel finns färdigt i `data/teori/fy1-3.2.md`.
2. SVG:n står direkt på pappret (klassen `.lab-block-figur`, ingen streckad
   ram). Använd `stroke="currentColor"`/`fill` för neutrala delar (ärver
   ink-temat) och egna färger för kraftpilar m.m.
3. Kör `node data/teori/build.js` efter varje md-ändring (annars syns inte
   ändringen — katalogen läser `bundle.js`).
4. Verifiera **alltid** med skärmdump (se Workflow nedan).

### Tekniska skydd som redan är på plats
- `data/teori/build.js`: inline-`<svg>…</svg>` tokeniseras och skyddas HELT
  från md-transformerna. **Kritiskt** — annars korrumperar tusentals-NBSP-
  regeln SVG-attribut (t.ex. `viewBox="0 0 472 210"` → NBSP mellan talen →
  ogiltig SVG).
- `katalog.html` `preprocessSuperscripts`: skyddar `<svg>…</svg>` så att
  Unicode-superscript (²³) inuti SVG **inte** blir `<sup>` (som inte
  renderas i SVG-text).
- CSS: `.lab-block-figur` i `styles-laborans.css` (ren, centrerad, bildtext
  via `<p>`/`.lab-figur-cap`).
- `katalog.html` `applyBionic`: hoppar över SVG-namespace. **Kritiskt** —
  annars injiceras `<span class="lab-bionic">` i SVG `<text>` (ogiltigt →
  bokstäver försvinner, "F = 50 N" blev "= 50"). Körs ALLTID, oavsett om
  bionic-toggeln är på. Etiketter ska alltså alltid renderas korrekt nu.

### Regler för SVG-källan (följ exakt — annars korrumperas figuren)
- **Inga tomrader inuti `<svg>…</svg>`** (marked skulle bryta HTML-blocket).
- **Inga `$`** i SVG (krockar med math-pipelinen). Skriv tal/enheter rakt.
- **Inga Unicode-superscript** (²³⁰…) i SVG-text → använd `<tspan dy>` för
  exponenter. Unicode-**subscript** (₁₂ₓ) är OK och renderas fint.
- **Inga markdown-specialtecken** som löptext i SVG (`*`, `_`, `[`, `]`).
- **Variabler kursiva:** `<tspan font-style="italic">F</tspan>` — ALDRIG
  `font-style="italic"` på ett helt `<text>` som innehåller `= 50 N`
  (då blir mätetal/enhet också kursiva). Enheter rakt.
- **Beteckning + värde + enhet i etiketten startar vid pilens spets**, löper
  utåt i fri yta (`text-anchor="start"`/`"end"`), aldrig in över objektet.
- **Kraftpil** utgår från angreppspunkten (får ligga inne i kroppen);
  **hastighetspil** utgår från objektets kant.
- **Normalkraftens angreppspunkt ligger i KONTAKTYTAN** (påpekat 2026-06-22).
  `F_N`-pilens svans sitter där kropparna möts — för en vikt på vågrätt
  underlag vid lådans **undersida**, och pilen pekar uppåt *genom* kroppen.
  ALDRIG svansen uppe på/i mitten av kroppen. Samma princip som friktion
  (kontaktytan, bakkanten) — bara tyngdkraften `F_G` utgår från tyngdpunkten/CM.
- **Angreppspunkts-prick (`<circle r="2.6">`) ENDAST för `F_G`** (markerar
  tyngdpunkten). `F_N`, `F_f`, `F_S`, applicerad `F` m.fl. får ingen prick —
  bara pilen. (Påpekat 2026-06-22.)
- **SKAFTET SLUTAR VID PILHUVUDETS BAS — inte vid spetsen** (påpekat
  2026-06-22). Ritar du pilen som `<line>` + `<polygon>`-huvud: sätt linjens
  ändpunkt vid huvudets *bakkant* (basens mittpunkt), inte vid spetsen.
  Annars sticker linjens rundade ände (`stroke-linecap="round"`,
  halv-linjebredd ≈ 1,8 px) ut **förbi** spetsen och pilen ser ut att ha en
  liten tagg framför. Ex: spets i `(x, t)`, huvudhöjd 9 px ⇒ basen vid
  `y = t+9` (uppåtpil) ⇒ `<line … y2="t+9">`, `<polygon points="x-6,t+9 x,t x+6,t+9">`.
  (Lutande-plan-figuren i fy1-3.4 gjorde redan rätt — kopiera det mönstret.)
- **Kraftpilens skaft: `stroke-linecap="butt"`, ALDRIG `"round"`** (påpekat
  2026-06-22). En rund ände buktar ut en halv linjebredd *bakom* svansen, så
  pilen ser ut att starta bakom/under angreppsytan. `butt` ⇒ linjen slutar
  exakt vid angreppspunkten. Gäller även mörk casing-linje. Mark-/hatch-
  linjer får ha runda ändar.
- **SKALENLIGA KRAFTVEKTORER (viktig princip — påpekad av användaren).**
  En kraftpils *längd* ska vara proportionell mot kraftens belopp. Det
  räcker INTE att rita alla pilar "lagom långa".
  - Lika stora krafter ritas **exakt lika långa** (t.ex. jämvikt
    `F_N = F_G` på vågrätt underlag, eller `F_N = F` mot vägg).
  - En kraft som är dubbelt så stor ritas **dubbelt så lång**; hälften så
    stor → hälften så lång.
  - En resulterande/summa-vektor ritas **lika lång som komposanternas
    längder tillsammans** (t.ex. bom: `F_N = F_Gbom + F_Gvikt` ⇒ `F_N`-pilen
    lika lång som `F_Gbom`- och `F_Gvikt`-pilarna staplade; och `F_Gvikt`
    dubbelt så lång som `F_Gbom` eftersom 24 kg = 2 · 12 kg).
  - Praktiskt: räkna ut beloppen, välj en *skala* (px per N) som gör att
    alla pilar får plats, och sätt varje pils längd = belopp · skala. Håll
    pilhuvudet i samma storlek på alla pilar — det är skaftets/totallängden
    som bär informationen.
  Gäller även komposanter (`F_G·sinα` vs `F_G·cosα` vs `F_G`).
- **Ingen vit kontur/halo** på ljus bakgrund. På färgad yta: tunn MÖRK
  casing (`#0f1620`, opacity ~0.5) under den färgade pilen — aldrig vit.
- **Exakt noll skrivs `0`** (inga `0,0`). Komma som decimaltecken.
- Sätt `font-family="Poppins, system-ui, sans-serif"` på `<svg>`.
- **⚠️ GLYF-KLIPP VID TOPP-/BOTTENKANT (verify fångar INTE detta).**
  `verify-figur-bounds.js` mäter bara textens *ankarpunkt* (`x`/`y`), inte
  glyfens faktiska utsträckning. En etikett vars baslinje ligger för nära
  viewBoxens överkant får sin versal-topp (Poppins-versal ≈ 11–12 px ovanför
  baslinjen) **avskuren** — t.ex. ett kursivt `F` reduceras till en
  apostrof-liknande stump bredvid `N` ("ʹN"). Verify säger ändå OK eftersom
  ankarpunkten ligger innanför. **Regel:** håll en etikett-baslinje minst
  ~12 px under viewBoxens överkant (och ~4 px över underkanten för
  nedstaplar). Granska alltid en *inzoomad* skärmdump av varje etikett.
- **NATURLIG SKALA — text lika stor som brödtexten (16 px).** Sätt
  `width`/`height` på `<svg>` lika med viewBox-måtten (t.ex.
  `viewBox="38 74 420 136" width="420" height="136"`). Då renderas figuren
  1:1 (1 viewBox-enhet = 1 px) i stället för att sträckas till spaltbredden,
  och `font-size="16"` blir 16 px = brödtextens storlek. Tumregel: text/
  beteckningar/värden i figuren ska vara **samma storlek som uppgiftstexten**
  (16 px); subscript får vara mindre (~12). På smal skärm krymper figuren
  via `max-width:100%`. `verify-figur-bounds.js` flaggar saknad/felaktig
  width/height och etiketter > 17 px.
- **TÄT viewBox — ingen "luft".** viewBoxen ska tätt omsluta figurinnehållet,
  ingen tom marginal i topp/botten/sidor. Figuren skalas till behållarens
  bredd, så ett tomt band i viewBoxen blir ett stort glapp mot texten. Sätt
  `viewBox="minX minY bredd höjd"` efter innehållets faktiska bounding-box
  (några få px marginal räcker). Kör `node .claude/verify-figur-bounds.js`
  som fångar för stora marginaler maskinellt.
- **Synka beteckningar med genomgångens text** (samma fil): `F_G` (stort G),
  `F_N`, `F_S`, `F_f`, hävarm `l`, enhet `Nm` osv. Subscript-etikett (G, N,
  f) ritas upright; storhets-subscript kursivt.
- Färgkonvention som etablerats: applicerad/dragkraft blå `#2563c9`,
  friktion orange `#e0861a`/text `#c4730f`, ink `currentColor`. Håll det
  konsekvent mellan figurer.

## ⚠️ EMULERA ANVÄNDARENS PDF-GENOMGÅNGAR

Originalgenomgångarna finns som PDF i `Genomgångar/Fysik 1/` och
`Genomgångar/Fysik 2/`. **Öppna ALLTID motsvarande PDF och efterlikna dess
figur** (layout, perspektiv, vad som ritas) innan du bygger en figur.
Läs PDF med Read-verktyget (`pages`-parameter).

- **Kapitelnumren skiljer sig** mellan PDF och md-filerna → mappa via
  `title:` i md-frontmatter, INTE via numret. Ex: md `fy1-3.2` (title
  "Newtons andra lag") = PDF `Fy 1 4.02 Newtons andra lag.pdf`.

### Box/låd-mall (verifierad mot PDF, fy1-3.2)
Användarens lådor är **3D-kuboider på ett perspektivgolv**, inte platta
rektanglar:
- Golv: perspektiv-parallellogram, tunn ink-kontur (`rgba(15,22,32,0.28)`),
  svag fyllning (`rgba(15,22,32,0.035)`).
- Kub: ljusblå med skuggade sidor — front `#d3e4f5`, topp `#eaf2fb`,
  höger `#bcd4ec`, kontur `#4f7197` 1,6 px. Djupvektor ca (44, −30).
- Färdig SVG-källa finns i `data/teori/fy1-3.2.md` — kopiera och anpassa.

### Placering i exempel (VIKTIG regel)
En figur i en `::: exempel`-ruta får **aldrig ligga sist** (efter
deluppgifterna). Ordningen ska vara: **inledande stycke (uppgiftsstammen)
→ figur → deluppgifter a) b) c) …** Frågorna ska stå sist (precis före
lösningen). `node .claude/verify-figur-bounds.js` flaggar figur som ligger
efter första deluppgiften.

### Friktionskraftens angreppspunkt (VIKTIG regel)
Friktion mot underlag ritas med **angreppspunkten i kroppens BAKKANT**
(den kant som är "bak" sett i rörelse-/dragriktningen). Puttas lådan åt
höger → friktionen `F_f` pekar åt vänster med **svansen på lådans
vänsterkant** (vid bottenhörnet), och pilen sticker ut åt vänster utanför
lådan. ALDRIG svans inne i mitten av lådan.

## Workflow för verifiering
```bash
# 1. bygg om bundeln
node data/teori/build.js
# 2. starta dev-servern (om den inte redan kör)
python .claude/dev-server.py 8000
# 3a. snabbtest av EN figur isolerat (stort), redigera .shots/figtest.html
#     att inkludera svg-raderna, sedan:
chrome --headless=new --force-device-scale-factor=2 \
  --window-size=860,470 --virtual-time-budget=2500 \
  --screenshot=.shots/figtest.png http://localhost:8000/.shots/figtest.html
# 3b. i sitt sammanhang: djuplänk #fyN-K.S
chrome --headless=new --window-size=1100,3400 --virtual-time-budget=8000 \
  --screenshot=.shots/sec.png "http://localhost:8000/katalog.html#fy1-3.2"
```
Granska skärmdumpen mot de 7 punkterna i CLAUDE.md ("Skärmdumpsverifiering").
Kör `node .claude/verify-no-white-outline.js` (gäller .html-sims; figurer
i md fångas inte av det skriptet — granska manuellt).

---

## SKIP-lista (för avancerade / foton — lämna som `::: bild`)
Allt som INTE står här är drawable. Markera när bedömt.

- **fy1-1.4** [1][2][3] Aerogel / Osmium / Neutronstjärna — foton ("originalbild från PDF").
- **fy1-2.7** [1] GeoGebra-skärmdump (UI).
- **fy1-3.1** [1] Foto: dynamometer.
- **fy1-3.3** [3] Foto: astronaut McCandless.
- **fy2-1.2** [1] Foto: hammare under bordskant.
- **fy2-3.10** [1] 3D-växelströmsgenerator (komplex 3D) — ev. förenklad senare.
- **fy2-4.2** [2][3] Foton av laser-interferensmönster.
- **fy2-4.3** [2] Foton sol/måne genom atmosfär.
- **fy2-4.6** [2] Foto: elektron-träffmönster (5 paneler).
- **fy2-5.1** [2] Kosmiska nätet (fotorealistisk illustration) — ev. förenklad senare.

Gränsfall (drawable men svårare — gör sist, ev. via `grafik`-agenten):
högerhandsregeln med 3 fingrar (fy2-3.2 [2], fy2-3.4 [1]), realistiska
spektra (fy2-4.7 — ritas som färgade linjer, fullt görbart), stjärnbildning
(fy2-5.6), Comptonspridning (fy2-4.5 [2]).

---

## Progress per kapitel (bocka av filen när ALLA dess drawable-figurer är klara)

### Fysik 1
- [x] **fy1-2.1 (3 vektoraddition) KLAR (2026-06-23)** · [x] **fy1-2.2 (5 grafer) KLAR (2026-06-23)** · [x] **fy1-2.3 (1 ellips-jord) KLAR (2026-06-23)**
- [x] **fy1-2.4 (2 v-t) KLAR (2026-06-22)** · [x] **fy1-2.5 (1 a-t) KLAR (2026-06-23)** · [x] **fy1-2.6 (1 v-t) KLAR (2026-06-23)** — KAPITEL RÖRELSE KOMPLETT (2.7 GeoGebra SKIP)
- [x] **fy1-3.2 (1 låda) — KLAR (pilot)**
- [x] **fy1-3.1 (2 komposanter — dynamometer-foto SKIP) KLAR (2026-06-22)** · [x] **fy1-3.3 (kraftpar/dragkamp/bil — 7 fig) KLAR** · [x] **fy1-3.4 (3 normalkraft) — KLAR**
- [x] **fy1-3.6 (4 friktion: kloss/bokhylla/bil/gång) KLAR (2026-06-22)** · [x] **fy1-3.7 (5 lutande plan) KLAR (2026-06-22)** · [x] **fy1-3.8 (1 sneda spännkrafter, parallellogram-konstruktion) KLAR (2026-06-22)** · [x] **fy1-3.9 (5 hissar/kast) KLAR (2026-06-22)** · [x] **fy1-3.10 (2 trissa) KLAR (2026-06-22)**
- [x] **fy1-4.1 (1 vagn) · fy1-4.4 (1 kast) · fy1-4.7 (1 F-t) · fy1-4.8 (1 rörelsemängd) KLAR (2026-06-23)** — KAPITEL ENERGI KOMPLETT
- [x] **fy1-5.2 (1 bassänger) · fy1-5.4 (2 lyftkraft) · fy1-5.5 (1 ballong) · fy1-5.7 (2 hydraulik) KLAR (2026-06-23)** — KAPITEL TRYCK KOMPLETT
- [x] **fy1-6.3 (2: fascykel + värmediagram) KLAR (2026-06-24)** — KAPITEL VÄRME (enda bild-blocket)
- [x] **fy1-7.1 (3 laddning/influens) · fy1-7.3 (3 ström) · fy1-7.6 (4 koppling + symboltabell) KLAR (2026-06-24)**
- [x] **fy1-7.8 (1 schema) · fy1-7.10/7.11/7.12/7.13/7.14 (fältlinjer/plattor, 6 fig) KLAR (2026-06-24)** — KAPITEL ELLÄRA KOMPLETT
- [x] **fy1-8.1 (1 relativitet: sol/jordbana/ljusstrålar) · fy1-9.1 (2 atom: helium + excitation) KLAR (2026-07-01)** — KAPITEL RELATIVITET + KÄRNFYSIK KOMPLETT. **HELA FYSIK 1 KLAR (drawable).**

### Fysik 2
- [x] **fy2-1.1 (4: skiftnyckel F_A/F_B, hand+34 N, spett 45°, gungbräda pappa/barn) KLAR (2026-07-01)** · [x] **fy2-1.2 (1: bokhylla vältpunkt; hammar-foto SKIP) KLAR** · [x] **fy2-1.3 (3: 1 rad-sektor, tangentiell v, LP-skiva) KLAR (2026-07-01)** · [x] **fy2-1.4 (2: centripetal v/a_C, vertikal cirkel F_G/F_S övre+nedre) KLAR (2026-07-01)**
- [ ] fy2-1.5 (1 konisk) · fy2-1.6 (2 kast) · fy2-1.7 (3 gunga) · fy2-1.8 (1 konisk) — NÄSTA. Generatorer: `gen_fy2_14.js` (centripetal/vertikal cirkel), `gen_fy2_1213.js` (cirklar/rotation).
  - **Lärdom (kursiv-arv i katalogen, 2026-07-01 — VIKTIG):** teori-figurernas
    SVG-text ÄRVER `font-style: italic` (marked lindar `<svg>` i `<p>`, och
    `.lab-block-figur p` är kursiv för bildtexter) → **mätetal och enheter blir
    kursiva i katalogen** trots att källan inte kursiverar dem. Fixat GLOBALT
    med `.lab-block-figur svg, .lab-block-figur svg text { font-style: normal }`
    i `styles-laborans.css` (variabler behåller kursiv via `<tspan
    font-style="italic">`). **Granska alltid en KATALOG-skärmdump** — bugget
    syns INTE i isolerad SVG-förhandsvisning. Dokumenterat i CLAUDE.md.
  - **Lärdom (kraftriktning ↔ rotationsriktning, 2026-07-01):** en kraftpil
    måste peka så att den ger den rotationsriktning uppgiften anger. fy2-1.1
    Ex1: svaret är "moturs" → 34 N-pilen ska peka snett NEDÅT HÖGER (inte
    uppåt vänster). Räkna momentets tecken kring vridpunkten, gissa inte pilen.
  - **Lärdom (rotation & arc, 2026-07-01):** `verify-figur-bounds.js` läser INTE
    `transform="rotate()"` (mäter råa lokala koordinater) → baka in rotationen i
    koordinaterna (rotera hörn själv, rita `<polygon>`). Och SVG-`A`-bågkommandot
    förorenar bounds-parsern (läser rx/ry/flaggor som punkter, ger falsk (0,0)) →
    sampla bågar som `<polyline>`/`<polygon>` i stället (helper `arcPts`). Etikett
    vid vänster/höger kant ankras vid YTTRE textkanten (start=vänster, end=höger)
    så ankaret = glyfkanten. `gen_fy2_1213.js`.
  - Generator `gen_fy2_11.js`/`gen_fy2_11b.js` (scratchpad): `arrow()`, `hexagon()`,
    `person(cx,seatY,scale,shirt,label,flip)` sittande figur (spegelbar), skiftnyckel
    (ring-/öppen ände + skaft), hand-grepp (fist roterad till skaftvinkeln). Blå
    kraftpil #2563c9 (projektkonvention, INTE PDF:ens röda/magenta). Kraftmoment
    `M = F · l`, hävarm `l`, enhet Nm — synkat med genomgången.
- [ ] fy2-2.1..2.14 (vågor, fjäder, pendel, stående våg, pipor, interferens — många, mestadels drawable)
- [ ] fy2-3.1..3.14 (magnetism, fältlinjer, induktion — mestadels drawable schematiskt)
- [ ] fy2-4.1..4.8 (EM-vågor, spektrum, fotoelektrisk, energinivåer)
- [ ] fy2-5.1..5.6 (astronomi: parallax, månfaser, blå himmel, svart hål)

**Tips:** börja med mekanik-kraftdiagrammen (fy1-3.x, fy2-1.x) — de är
mest värdefulla och mest lika pilotmallen. Återanvänd hjälp-mönster
(pil, mark+hatch, låda, lutande plan) mellan figurer. Committa per kapitel.
