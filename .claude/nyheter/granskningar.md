# Utgivargranskningar

Logg över den oberoende slutgranskningen av nyhetsartiklar före publicering.
Protokollet finns i `.claude/agents/utgivare.md`. Nyast överst.

| Datum | Artikel-id | Utslag | Motivering |
|-------|-----------|--------|------------|
| 2026-08-09 | `2026-08-09-flygande-fokus` | RÄTTA FÖRST → GODKÄND | Tre formuleringar rättade (bildtextens ”tre mellersta”, ”hela effekten” vid 4,8 J, 2004 som årtal). Hela originalartikeln lästes i PDF — samtliga siffror verifierade mot den. |
| 2026-08-07 | `2026-08-07-virvlar-pa-solens-yta` | RÄTTA FÖRST → GODKÄND | Två fel funna och åtgärdade (Kelvin/Helmholtz-datering, fotosfärens tjocklek). Originalpublikationen gick INTE att öppna — se anteckningen nedan. |

---

## 2026-08-09 — `2026-08-09-flygande-fokus`

**Granskningsläge:** självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen skulle inte starta subagenter). Artikeln är
förhandsskriven kvällen 2026-08-08 och datumgrindad till midnatt.

**1. Originalpublikationen — LÄST I SIN HELHET.** `nature.com/articles/...`
gav 303 mot inloggningen, men artikeln är öppet tillgänglig och
PDF:en (`.../s41567-026-03352-x.pdf`, 13 sidor) laddades ner utan hinder och
lästes i original — abstract, brödtext, samtliga figurtexter och referenslistan.
Ingen uppgift i artikeln vilar alltså på Phys.org-referatet.

**2. Peer review-status:** *Nature Physics*, mottagen 6 december 2025, accepterad
29 maj 2026, publicerad online 10 juli 2026. Kollegialt granskad. Licens
CC BY-NC-ND 4.0, © The Author(s) 2026 — vilket också är grunden för bildbruket.
Phys.org:s referat (2026-08-08) är alltså en månad efter publiceringen; artikeln
utger sig inte för att beskriva ett nyare datum, och `research.citation` anger
10 juli.

**3. Siffror — verifieringslista (allt mot PDF:en)**
- 396 ± 14 MeV vid $n_e$ = (5,0 ± 0,5) · 10¹⁸ cm⁻³ ✓ s. 3
- Dephasing-gränsen 185 MeV (+40/−39) ✓ s. 3 — felmarginalen utelämnad i texten
- Tätintervallet 4,5–5,4 · 10¹⁸ cm⁻³ ✓ s. 3
- 21 fs, 4 J; H₂:Ar = 95:5; injektion från Ar⁹⁻¹⁶⁺ ✓ s. 3
- Acceleratorlängd 7 mm ✓ s. 2–3 (fokusets utbredningssträcka = gascellens längd)
- Fält >1 GV/cm ✓ s. 1; ⟨ϵz⟩ ≈ 1–1,5 GV/cm ✓ s. 4
- 1 GV/cm = 100 000 MV/m — efterräknat ✓; kvoten mot ”några tiotals MV/m”
  ger ~3 000 ⇒ ”tusentals gånger” ✓
- ”Drygt tio meter rör” för 400 MeV vid 30 MV/m — efterräknat: 13,3 m ✓
- 10 GeV i ett steg vid ne ≈ 10¹⁷ cm⁻³ ✓ s. 1
- ”Ungefär tio meter plasma” för 100 GeV traditionellt ✓ s. 2 (”plasma lengths
  of 10 m”)
- Skalningen: 0,66 m mot 13,5 m, ~20× ✓ s. 5 (formlerna insatta för 100 GeV)
- 6 · 10⁶ elektroner = 0,9 ± 0,2 pC ✓ s. 3 — korskontrollerat mot elementar-
  laddningen: 6 · 10⁶ · 1,602 · 10⁻¹⁹ C = 0,96 pC ✓
- Fördubblingen försvann när pulsenergin höjdes 4,0 → 4,8 J ✓ s. 3
- 1 GeV ”borde” ha nåtts: 1,5 GV/cm · 0,7 cm = 1,05 GeV ✓ s. 4
- NSF-OPAL 2 × 25 PW ✓ s. 2
- DLWFA föreslaget teoretiskt 2020 ✓ ref. 32 (Palastro m.fl., PRL 124, 134802)
- Tajima & Dawson 1979 ✓ ref. 1 (PRL 43, 267)
- 2004 års genombrott ✓ ref. 3–5 (Mangles, Geddes, Faure — samtliga Nature 431)
- LEP: ”skulle motsvara de högsta elektronenergier som producerats vid CERN:s
  LEP” ✓ s. 1; ringen 27 km och nedstängningen år 2000 är allmänt kända fakta
- **Räkneord:** artikeln innehåller inga träffar på biljon/biljard/triljon.
  ”Tusentals”, ”sex miljoner” och ”100 000” är efterräknade ovan.

**4. Citat:** ett enda, Arrowsmith till Phys.org. Originalet (”…this was one of
those thrilling occasions where the data started coming out just as predicted”)
återgivet troget i översättning; `cite` anger korrekt att det sagts till Phys.org
och inte står i studien. Froula-citatet i LLE:s pressmeddelande används inte.

**5. Facktermer:** inga träffar på ”upphets”. Falska vänner genomgångna —
*wakefield* → kölvattenfält, *group velocity* → grupphastighet, *beam* → stråle,
*dephasing* behållet på engelska i kursiv med svensk förklaring (”i otakt med
vågen”), eftersom någon etablerad svensk term inte finns.

**6. Fysikalisk rimlighetskontroll av den pedagogiska framställningen:** påståendet
att en ljuspunkt får röra sig med eller över ljushastigheten är korrekt — det är
gruppfarten som bär energi och information. Framställningen av varför tätheten
ändå spelar roll (ljuset på väg till fokuspunkterna passerar plasmat) är hämtad
ur s. 2, där fokushastigheten anges bero på både fokusgeometrin och plasmats
grupphastighet. Phys.org:s formulering att fokusfarten är ”oberoende av” hur
snabbt ljuset går i plasmat är alltså en förenkling som INTE följts.

**7. Bild och licens:** två figurer ur studien (fig. 1 och fig. 2), oförändrade
frånsett formatkonvertering PNG → JPEG, hämtade från förlagets egen bildserver.
CC BY-NC-ND 4.0 tillåter spridning i oförändrat skick med angiven upphovsperson;
krediteringen anger författare, tidskrift, år och licens. Ingen beskärning har
gjorts (skulle räknas som bearbetning). Inga AI-bilder. Bägge är äkta figurer,
och brödtexten hänvisar till dem som just mätfigurer.

**Rättningar som krävdes (åtgärdade före publicering)**

1. **Bildtexten till fig. 2 sade fel sak.** ”Bara i de tre mellersta tätheterna
   finns det elektroner långt till höger om linjen” stämmer inte — även vid
   6,1 · 10¹⁸ cm⁻³ ligger den uppmätta maxenergin till höger om gränsen, fast
   mindre än dubbelt så långt. Omskrivet till att de tre mellersta har en samlad
   fläck *mer än dubbelt så långt* till höger. Alt-texten justerad på samma sätt.
2. **”Försvann hela effekten” vid 4,8 J** kunde läsas som att inga elektroner
   alls kom ut. Studien säger att elektroner vid dubbla dephasing-gränsen inte
   längre observerades. Ändrat till ”försvann fördubblingen”.
3. **Faktarutans 2004-påstående** (”innan lasrarna var korta och starka nog att
   göra det på riktigt”) var missvisande — kölvattenacceleration demonstrerades
   redan på 1990-talet, men med utsmetad energi. Ändrat till att 2004 var året då
   tre lag oberoende visade strålar med en smal energitopp.

**Utslag: GODKÄND** efter rättningarna.

---

## 2026-08-07 — `2026-08-07-virvlar-pa-solens-yta`

**Granskningsläge:** utfört som självständigt granskningspass enligt fallbacken i
nyhetsagentens steg 11 (sessionen fick inte starta subagenter). Hela protokollet i
`utgivare.md` gicks igenom punkt för punkt.

**1. Originalpublikationen — EJ ÅTKOMLIG.** `nature.com` gav 403 från sessionens
egress-proxy (som bara släppte igenom GitHub), både via WebFetch och curl. Något
arXiv-preprint gick inte att hitta vid sökning. Abstract och metoddel har alltså
**inte** kunnat läsas i original. Konsekvens: alla uppgifter kontrollerades mot
NSO:s och Max-Planck-Gesellschafts pressmeddelanden, Phys.org, EurekAlert! och
AP-telegrammet. **Ingen central uppgift i artikeln vilar enbart på paperet** —
varje siffra och varje citat finns i pressmaterialet. Titeln i `research.citation`
och figurtexten ”spatial resolution of 19 km” återgavs ordagrant i sökträffar från
nature.com och stöds oberoende av pressmeddelandets ~19 km.

**2. Peer review-status:** publicerad i *Nature*, onsdag 5 augusti 2026 (veckodagen
kontrollräknad). Kollegialt granskad tidskrift → ingen preprint-markering behövs i
artikeln.

**3. Siffror — verifieringslista**
- 19 km upplösning ✓ NSO/Nature fig. 1 · tillika teleskopets diffraktionsgräns
- 4 m spegel ✓ NSO (”first 4-m class solar telescope”)
- 416 nm ✓ NSO bildtext
- Diffraktionsräkningen efterräknad: 1,22 · 416 nm / 4,0 m = 1,269 · 10⁻⁷ rad;
  × 1,496 · 10¹¹ m = 18 981 m → ”knappt 19 km” ✓ (stämmer med angiven upplösning)
- Virvlar 19–170 km ✓ MPG/phys.org
- Granuler 500–2 000 km ✓ MPG · jfr Sveriges längd 1 572 km → ”längre än Sverige” ✓
- Fotosfär ~5 500 °C ✓ (källan: ~6 000 K / 5 540 °C)
- Korona >1 miljon grader ✓ standarduppgift, stöds av pressmaterialet
- Solförmörkelse 12 augusti 2026, max 2 min 18 s, östra Grönland/västra Island/
  norra Spanien ✓ (källan nämner även Sibirien och nordvästligaste Portugal —
  urvalet är ett urval, inte ett fel)
- Soldiameter 1,4 miljoner km ✓
- Inga träffar på biljon/biljard/triljon i artikeln — inga räkneordsfällor.

**4. Citat — verifieringslista**
- Wöger (gränsytan/vågorna) ✓ ordagrant i pressreferat; översättningen trogen
- Kuridze (energikaskaden) ✓ ordagrant; översättningen trogen
- Solanki (plasmavirvlarna/vår stjärnas beskaffenhet) ✓ ordagrant; trogen
- Kuridze om utbrotten samt om överraskningen: återgivna indirekt, täcks av
  källformuleringarna ✓
- Ruizhu Chen (van Gogh) — AP, återgiven indirekt; korrekt markerad som
  utomstående som inte deltog i studien ✓
- Titlar/institutioner i `cite` stämmer med pressmaterialet ✓

**5. Källor:** samtliga fem `sources` täcker det de anges för. Notera att länkarna
inte kunde öppnas i sessionen (egress-spärr) — de är verifierade via sökträffar,
inte genom att sidan hämtats.

**6. Facktermer:** inga träffar på ”upphets”. Falska vänner genomgångna. Rättade
under granskningen: svenska termen är **koronan**, inte ”kronan”.

**7. Bild och licens:** två äkta pressbilder från NSO:s pressrum, krediterade
NSF/NSO/AURA/MPS i enlighet med källans egen kreditering. Inga AI-bilder, inga
vattenstämplar. Brödtexten hänvisar till bild 2 som det den är — ett äkta utsnitt
med skalstock.

**Rättningar som krävdes (åtgärdade före publicering)**
1. `beskrev det matematiskt på 1860-talet` → `beskrev det matematiskt 1868
   respektive 1871`. Helmholtz publicerade 1868, Thomson/Kelvin 1871 — ”1860-talet”
   är fel för paret. Samma rättning i begreppsposten.
2. `räknades ut på papper på 1860-talet` (ingressen) → `räknades ut på papper redan
   på 1800-talet`. Samma skäl.
3. `Fotosfären är bara ett par hundra kilometer tjock` → `några hundra kilometer`.
   Vedertaget värde är 400–500 km; ”ett par hundra” underskattar. Samma rättning i
   begreppsposten.

**Utslag efter rättning: GODKÄND.**

**Kvarstående reservation att notera för framtiden:** granskningen är gjord utan att
originalpublikationen kunnat läsas. Skulle någon senare få åtkomst till paperet bör
särskilt virvlarnas storleksintervall (19–170 km) och beskrivningen av vad
MURaM-simuleringarna faktiskt visar stämmas av mot metoddelen.

---

## 2026-08-08 | 2026-08-08-svavande-magnet | GODKÄND efter rättning

**Granskningsform.** Sessionen fick inte starta subagenter, så granskningen är
genomförd som ett separat, självkritiskt pass enligt hela protokollet i
`utgivare.md` (samma fallback som nyhetsagent.md steg 11 anvisar).

**Peer review-status.** Publicerad i *Science* 393 (6811), 607–610, tryckdatum
6 augusti 2026, DOI 10.1126/science.adx1707. Kollegialt granskad. Metadata
verifierade direkt mot Crossref (`api.crossref.org/works/10.1126/science.adx1707`):
titel, volym, sidor, utgåva, datum och samtliga fyra författare med affiliationer
stämmer med `research.citation`.

**Originalpublikationen.** science.org svarade HTTP 403 (betalvägg/botspärr).
Abstractet lästes i stället i sin helhet via Crossref, och metoddelen via
författarnas egen fritt tillgängliga version, arXiv:2504.21524 (CC BY 4.0), i
HTML-form. Där finns samtliga tekniska värden artikeln bygger på. Studien är ett
EXPERIMENT, inte en simulering — beskrivningen i artikeln stämmer.

**Verifierade siffror**
- 0,82 mm diameter / 0,38 mm tjocklek — arXiv: ”410±2 μm radius and 380±2 μm
  thickness” ✓ (radie → diameter omräknad korrekt)
- 32 fT/√Hz — Science-abstract + arXiv (”32±3 fT/√Hz”) ✓
- 3,2 · 10⁻¹⁴ T — omräkning av 32 fT ✓
- jordfältet 50 μT och kvoten ”en och en halv miljard” — 5·10⁻⁵/3,2·10⁻¹⁴ =
  1,56·10⁹ ✓. RÄKNEORDSKONTROLL: engelskans *billion* = miljard. Artikeln
  innehåller inga träffar på biljon/biljard/triljon.
- resonans 305 Hz, ställbar 260–318 Hz — arXiv brödtext + figur 4 ✓
- Q ≈ 12 000 och linjebredd 0,025 Hz — arXiv ✓ (kontrollräknat: 305/12 000 = 0,025)
- optisk arm 3,4 m, fyrdelad fotodiod (QPD), 852 nm — arXiv ✓
- brus 110 → 30 fT/√Hz, ”drygt 70 %” — (110−30)/110 = 72,7 % ✓
- vakuum 0,025 mbar och ”en fyrtiotusendel av lufttrycket” — 1013/0,025 = 40 520 ✓
- SQUID ≈ 20 fT/√Hz, bredbandsvärdena ≈ 200 pT/√Hz (80–200 Hz) och ≈ 1 nT/√Hz
  (< 15 Hz) — arXiv:s jämförelse respektive figur 3 ✓
- hjärnans fält 50–500 fT, hjärtats ≈ 100 gånger starkare — MEG-/MKG-litteratur ✓
- Geim, groda, ~16 T, Nijmegen 1997, Ig Nobel 2000, Nobelpris 2010 ✓

**Citat.** Ett enda citatblock, en översättning av slutmeningen i Science-abstractet
(hämtat ordagrant från Crossref). Ingen forskare citeras direkt — de formuleringar
som cirkulerade i pressreferaten gick inte att härleda till en namngiven person och
användes därför inte alls.

**Bild och licens.** Bild 1 är figur 1 ur arXiv:2504.21524, som ligger under
CC BY 4.0 (verifierat på arXiv:s abstract-sida). Bild 2 är
`Diamagnetic graphite levitation.jpg` från Wikimedia Commons, public domain
(verifierat via Commons API, upphovsperson en:User:Splarka). Ingen AI-bild.
Bildtexten till bild 2 säger uttryckligen att den visar fenomenet i klassrumsformat
och inte forskarnas apparat.

**Rättningar som krävdes (åtgärdade före publicering)**
1. `Femtotesla är en tusendels miljarddels tesla` → `En femtotesla är en miljondels
   miljarddels tesla`. Tusendels miljarddel är 10⁻¹², alltså pikotesla — felet var
   tusen gånger. Samma rättning i begreppsposten ”Magnetometer”.
2. Citatet: `grundforskning` → `grundläggande fysik` och
   `supraledande kvantinterferensmagnetometrar` → `supraledande
   kvantinterferensinstrument`, för att ligga närmare originalets
   ”fundamental physics” respektive ”superconducting quantum interference devices”.
3. `johnsonbrus` → `magnetiskt Johnsonbrus` (egennamn, och det är den magnetiska
   varianten som avses).
4. `imageCredit` innehöll `&nbsp;`-entiteter. Fältet renderas som REN TEXT i
   `nyheter.html`, så entiteterna syntes bokstavligt under bilden — bytt mot
   literalt hårt mellanslag. Samma fel fanns sedan tidigare i artikeln
   2026-08-05-rubin-mork-materia och rättades samtidigt.

**Utslag efter rättning: GODKÄND.**
