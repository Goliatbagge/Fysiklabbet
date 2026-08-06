# Utgivargranskningar

Logg över den oberoende slutgranskningen av nyhetsartiklar före publicering.
Protokollet finns i `.claude/agents/utgivare.md`. Nyast överst.

| Datum | Artikel-id | Utslag | Motivering |
|-------|-----------|--------|------------|
| 2026-08-07 | `2026-08-07-virvlar-pa-solens-yta` | RÄTTA FÖRST → GODKÄND | Två fel funna och åtgärdade (Kelvin/Helmholtz-datering, fotosfärens tjocklek). Originalpublikationen gick INTE att öppna — se anteckningen nedan. |

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
