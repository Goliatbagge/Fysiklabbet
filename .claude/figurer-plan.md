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
1. `fy1-3.4` Tyngdkraft och normalkraft (vikt på bord: `F_N` upp, `F_G` ned)
   — enklast efter lådan. PDF: `Fy 1 4.04 Tyngdkraft och normalkraft.pdf`.
2. `fy1-3.3` Newtons tredje lag (hand mot vägg, äpple/jord, dragkamp).
   PDF: `Fy 1 4.03 Newtons tredje lag.pdf`.
3. `fy1-3.6`, `fy1-3.7` (lutande plan), `fy1-3.1` (komposanter),
   `fy1-3.8`, `fy1-3.9`, `fy1-3.10`.

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
- **Ingen vit kontur/halo** på ljus bakgrund. På färgad yta: tunn MÖRK
  casing (`#0f1620`, opacity ~0.5) under den färgade pilen — aldrig vit.
- **Exakt noll skrivs `0`** (inga `0,0`). Komma som decimaltecken.
- Sätt `font-family="Poppins, system-ui, sans-serif"` på `<svg>`.
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
- [ ] fy1-2.1 (3 vektoraddition) · fy1-2.2 (5 grafer) · fy1-2.3 (1 ellips-jord)
- [ ] fy1-2.4 (2 v-t) · fy1-2.5 (1 a-t) · fy1-2.6 (1 v-t)
- [x] **fy1-3.2 (1 låda) — KLAR (pilot)**
- [ ] fy1-3.1 (2 kvar: komposanter) · fy1-3.3 (kraftpar, influens) · fy1-3.4 (3 normalkraft)
- [ ] fy1-3.6 (4) · fy1-3.7 (5 lutande plan) · fy1-3.8 (1 spännkraft) · fy1-3.9 (5 hissar/kast) · fy1-3.10 (2 trissa)
- [ ] fy1-4.1 (1) · fy1-4.4 (1 kast) · fy1-4.7 (1 F-t) · fy1-4.8 (1 rörelsemängd)
- [ ] fy1-5.2 (1) · fy1-5.4 (2 lyftkraft) · fy1-5.5 (1 ballong) · fy1-5.7 (2 hydraulik)
- [ ] fy1-6.3 (2 fasdiagram/värme)
- [ ] fy1-7.1 (3 laddning/influens) · fy1-7.3 (3 ström) · fy1-7.6 (4 kopplingsscheman)
- [ ] fy1-7.8 (1 schema) · fy1-7.10/7.11/7.12/7.13/7.14 (fältlinjer/plattor)
- [ ] fy1-8.1 (1) · fy1-9.1 (2 atom)

### Fysik 2
- [ ] fy2-1.1 (4 moment/gungbräda) · fy2-1.2 (1 kvar: bokhylla) · fy2-1.3 (3 cirkel) · fy2-1.4 (2)
- [ ] fy2-1.5 (1 konisk) · fy2-1.6 (2 kast) · fy2-1.7 (3 gunga) · fy2-1.8 (1 konisk)
- [ ] fy2-2.1..2.14 (vågor, fjäder, pendel, stående våg, pipor, interferens — många, mestadels drawable)
- [ ] fy2-3.1..3.14 (magnetism, fältlinjer, induktion — mestadels drawable schematiskt)
- [ ] fy2-4.1..4.8 (EM-vågor, spektrum, fotoelektrisk, energinivåer)
- [ ] fy2-5.1..5.6 (astronomi: parallax, månfaser, blå himmel, svart hål)

**Tips:** börja med mekanik-kraftdiagrammen (fy1-3.x, fy2-1.x) — de är
mest värdefulla och mest lika pilotmallen. Återanvänd hjälp-mönster
(pil, mark+hatch, låda, lutande plan) mellan figurer. Committa per kapitel.
