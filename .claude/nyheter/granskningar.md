# Utgivargranskningar

Logg över den oberoende slutgranskningen av nyhetsartiklar före publicering.
Protokollet finns i `.claude/agents/utgivare.md`. Nyast överst.

| Datum | Artikel-id | Utslag | Motivering |
|-------|-----------|--------|------------|
| 2026-08-07 | `2026-08-08-virvlar-pa-solens-yta` | RÄTTA FÖRST → GODKÄND | Två fel funna och åtgärdade (Kelvin/Helmholtz-datering, fotosfärens tjocklek). Originalpublikationen gick INTE att öppna — se anteckningen nedan. |

---

## 2026-08-07 — `2026-08-08-virvlar-pa-solens-yta`

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

## 2026-08-08 | 2026-08-07-svavande-magnet | GODKÄND efter rättning

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
