---
id: ma2c-6.5
title: Normalfördelning
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.5'
---

# Normalfördelning

Mycket statistiskt material fördelas jämnt kring medelvärdet. En sådan
fördelning kallas **normalfördelning**. I ett normalfördelat material
fördelas värdena med samma procentsatser inom vissa givna intervall som
bygger på medelvärdet $\mu$ och standardavvikelsen $\sigma$, enligt
nedanstående normalfördelningskurva:

::: figur
<svg viewBox="4 22 286 134" width="515" height="241" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva med markerade intervall: 34,1 procent mellan medelvärdet och en standardavvikelse åt vardera håll, 13,6 procent mellan en och två standardavvikelser och 2,3 procent utanför två standardavvikelser. Peka eller tryck på ett intervall så färgas området och den samlade andelen visas." style="overflow:visible"><style>.m65-s{cursor:pointer;outline:none}.m65-s .m65-om{fill:#8fb8d8;opacity:0;transition:opacity .18s ease}.m65-s:hover .m65-om,.m65-s:focus .m65-om{opacity:.45}.m65-s .m65-pc{transition:fill .18s ease}.m65-s:hover .m65-pc,.m65-s:focus .m65-pc{fill:#c8324a;font-weight:600}.m65-s .m65-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m65-s:hover .m65-lbl,.m65-s:focus .m65-lbl{opacity:1}</style><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 22,128.7 L 24,128.5 L 26,128.3 L 28,128 L 30,127.7 L 32,127.4 L 34,127 L 36,126.6 L 38,126.1 L 40,125.6 L 42,125 L 44,124.4 L 46,123.7 L 48,122.9 L 50,122 L 52,121.1 L 54,120.1 L 56,119 L 58,117.8 L 60,116.5 L 62,115.1 L 64,113.6 L 66,111.9 L 68,110.2 L 70,108.4 L 72,106.4 L 74,104.4 L 76,102.2 L 78,99.9 L 80,97.5 L 82,95 L 84,92.5 L 86,89.8 L 88,87 L 90,84.2 L 92,81.3 L 94,78.4 L 96,75.4 L 98,72.4 L 100,69.3 L 102,66.3 L 104,63.3 L 106,60.3 L 108,57.4 L 110,54.5 L 112,51.7 L 114,49 L 116,46.5 L 118,44 L 120,41.8 L 122,39.6 L 124,37.7 L 126,35.9 L 128,34.4 L 130,33.1 L 132,32 L 134,31.1 L 136,30.5 L 138,30.1 L 140,30 L 142,30.1 L 144,30.5 L 146,31.1 L 148,32 L 150,33.1 L 152,34.4 L 154,35.9 L 156,37.7 L 158,39.6 L 160,41.8 L 162,44 L 164,46.5 L 166,49 L 168,51.7 L 170,54.5 L 172,57.4 L 174,60.3 L 176,63.3 L 178,66.3 L 180,69.3 L 182,72.4 L 184,75.4 L 186,78.4 L 188,81.3 L 190,84.2 L 192,87 L 194,89.8 L 196,92.5 L 198,95 L 200,97.5 L 202,99.9 L 204,102.2 L 206,104.4 L 208,106.4 L 210,108.4 L 212,110.2 L 214,111.9 L 216,113.6 L 218,115.1 L 220,116.5 L 222,117.8 L 224,119 L 226,120.1 L 228,121.1 L 230,122 L 232,122.9 L 234,123.7 L 236,124.4 L 238,125 L 240,125.6 L 242,126.1 L 244,126.6 L 246,127 L 248,127.4 L 250,127.7 L 252,128 L 254,128.3 L 256,128.5 L 258,128.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="60" y1="116.5" x2="60" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="100" y1="69.4" x2="100" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="180" y1="69.4" x2="180" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="220" y1="116.5" x2="220" y2="130" stroke="#1f2530" stroke-width="1"/><g class="m65-s" tabindex="0"><rect x="20" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="20,130 20,128.9 30,127.7 40,125.6 50,122 60,116.5 60,130"/><text class="m65-pc" x="34" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><g class="m65-lbl"><rect x="4" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="60" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Utanför <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4,6 %</text></g></g><g class="m65-s" tabindex="0"><rect x="60" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="60,130 60,116.5 70,108.4 80,97.5 90,84.2 100,69.4 100,130"/><text class="m65-pc" x="80" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><g class="m65-lbl"><rect x="8" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="62" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95,4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="100" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="100,130 100,69.4 110,54.5 120,41.8 130,33.1 140,30 140,130"/><text class="m65-pc" x="120" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><g class="m65-lbl"><rect x="16" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="66" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68,2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="140" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="140,130 140,30 150,33.1 160,41.8 170,54.5 180,69.4 180,130"/><text class="m65-pc" x="160" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><g class="m65-lbl"><rect x="164" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="214" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68,2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="180" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="180,130 180,69.4 190,84.2 200,97.5 210,108.4 220,116.5 220,130"/><text class="m65-pc" x="200" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><g class="m65-lbl"><rect x="164" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="218" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95,4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="220" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="220,130 220,116.5 230,122 240,125.6 250,127.7 260,128.9 260,130"/><text class="m65-pc" x="246" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><g class="m65-lbl"><rect x="164" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="220" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Utanför <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4,6 %</text></g></g><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − 2<tspan font-style="italic">σ</tspan></text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − <tspan font-style="italic">σ</tspan></text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + <tspan font-style="italic">σ</tspan></text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + 2<tspan font-style="italic">σ</tspan></text></svg>

Peka eller tryck på ett intervall så färgas området och den samlade
andelen visas.
:::

där $\mu$ = medelvärde och $\sigma$ = standardavvikelse.

Om man ska bestämma andelar som inte ligger vid jämna
standardavvikelser får man ta hjälp av digitala verktyg, t.ex.
Geogebra.

För att beräkna procentsatser vid normalfördelningar i Geogebra klickar
vi på knappen "Växla till sannolikhetskalkylator", fyller i medelvärde
($\mu$) och standardavvikelse ($\sigma$), klickar på den knapp som
motsvarar det intervall vi är intresserade av och fyller i värdena.

| Intervalltyp | Exempelformulering |
| --- | --- |
| Öppet åt vänster | "Hur många procent är mindre än $x$?" |
| Intervall | "Hur många procent ligger mellan $x$ och $y$?" |
| Intervallkomplement | "Hur många procent är mindre än $x$, men större än $y$?" |
| Öppet åt höger | "Hur många procent är större än $x$?" |

Hur hög normalfördelningskurvan blir beror på spridningen. Vid liten
spridning ligger värdena samlade och kurvan blir högre och smalare. Vid
stor spridning ligger värdena mer utspridda och kurvan blir lägre och
bredare.

::: figur
<svg viewBox="8 22 280 136" width="504" height="245" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre normalfördelningskurvor med samma medelvärde: en hög och smal grön kurva med liten spridning, en blå mellankurva och en låg och bred röd kurva med stor spridning."><line x1="14" y1="140" x2="272" y2="140" stroke="#1f2530" stroke-width="1.4"/><polygon points="280,140 271,136 271,144" fill="#1f2530"/><path d="M 75,139.3 L 77,139.1 L 79,138.8 L 81,138.4 L 83,137.9 L 85,137.3 L 87,136.6 L 89,135.7 L 91,134.6 L 93,133.3 L 95,131.7 L 97,129.8 L 99,127.6 L 101,125.1 L 103,122.2 L 105,118.9 L 107,115.3 L 109,111.2 L 111,106.7 L 113,101.8 L 115,96.6 L 117,91.1 L 119,85.3 L 121,79.3 L 123,73.3 L 125,67.2 L 127,61.3 L 129,55.6 L 131,50.2 L 133,45.2 L 135,40.8 L 137,37 L 139,34 L 141,31.8 L 143,30.5 L 145,30 L 147,30.5 L 149,31.8 L 151,34 L 153,37 L 155,40.8 L 157,45.2 L 159,50.2 L 161,55.6 L 163,61.3 L 165,67.2 L 167,73.3 L 169,79.3 L 171,85.3 L 173,91.1 L 175,96.6 L 177,101.8 L 179,106.7 L 181,111.2 L 183,115.3 L 185,118.9 L 187,122.2 L 189,125.1 L 191,127.6 L 193,129.8 L 195,131.7 L 197,133.3 L 199,134.6 L 201,135.7 L 203,136.6 L 205,137.3 L 207,137.9 L 209,138.4 L 211,138.8 L 213,139.1 L 215,139.3" fill="none" stroke="#4a7d3a" stroke-width="1.8"/><path d="M 33,139.6 L 35,139.5 L 37,139.4 L 39,139.3 L 41,139.2 L 43,139 L 45,138.8 L 47,138.6 L 49,138.4 L 51,138.1 L 53,137.8 L 55,137.5 L 57,137.1 L 59,136.6 L 61,136.1 L 63,135.6 L 65,134.9 L 67,134.2 L 69,133.5 L 71,132.6 L 73,131.7 L 75,130.6 L 77,129.5 L 79,128.3 L 81,127 L 83,125.6 L 85,124.1 L 87,122.5 L 89,120.8 L 91,119 L 93,117.1 L 95,115.1 L 97,113 L 99,110.8 L 101,108.6 L 103,106.3 L 105,104 L 107,101.6 L 109,99.3 L 111,96.9 L 113,94.5 L 115,92.1 L 117,89.8 L 119,87.5 L 121,85.3 L 123,83.3 L 125,81.3 L 127,79.4 L 129,77.7 L 131,76.2 L 133,74.8 L 135,73.6 L 137,72.6 L 139,71.9 L 141,71.3 L 143,71 L 145,70.9 L 147,71 L 149,71.3 L 151,71.9 L 153,72.6 L 155,73.6 L 157,74.8 L 159,76.2 L 161,77.7 L 163,79.4 L 165,81.3 L 167,83.3 L 169,85.3 L 171,87.5 L 173,89.8 L 175,92.1 L 177,94.5 L 179,96.9 L 181,99.3 L 183,101.6 L 185,104 L 187,106.3 L 189,108.6 L 191,110.8 L 193,113 L 195,115.1 L 197,117.1 L 199,119 L 201,120.8 L 203,122.5 L 205,124.1 L 207,125.6 L 209,127 L 211,128.3 L 213,129.5 L 215,130.6 L 217,131.7 L 219,132.6 L 221,133.5 L 223,134.2 L 225,134.9 L 227,135.6 L 229,136.1 L 231,136.6 L 233,137.1 L 235,137.5 L 237,137.8 L 239,138.1 L 241,138.4 L 243,138.6 L 245,138.8 L 247,139 L 249,139.2 L 251,139.3 L 253,139.4 L 255,139.5 L 257,139.6" fill="none" stroke="#2563c9" stroke-width="1.8"/><path d="M 12,138.2 L 14,138.1 L 16,137.9 L 18,137.6 L 20,137.4 L 22,137.2 L 24,136.9 L 26,136.6 L 28,136.3 L 30,136 L 32,135.6 L 34,135.2 L 36,134.8 L 38,134.4 L 40,133.9 L 42,133.5 L 44,132.9 L 46,132.4 L 48,131.8 L 50,131.2 L 52,130.6 L 54,129.9 L 56,129.2 L 58,128.5 L 60,127.8 L 62,127 L 64,126.2 L 66,125.3 L 68,124.5 L 70,123.6 L 72,122.6 L 74,121.7 L 76,120.7 L 78,119.7 L 80,118.7 L 82,117.7 L 84,116.6 L 86,115.6 L 88,114.5 L 90,113.4 L 92,112.3 L 94,111.2 L 96,110.1 L 98,109.1 L 100,108 L 102,106.9 L 104,105.9 L 106,104.9 L 108,103.9 L 110,102.9 L 112,101.9 L 114,101 L 116,100.2 L 118,99.3 L 120,98.5 L 122,97.8 L 124,97.1 L 126,96.5 L 128,95.9 L 130,95.4 L 132,94.9 L 134,94.5 L 136,94.2 L 138,93.9 L 140,93.7 L 142,93.5 L 144,93.5 L 146,93.5 L 148,93.5 L 150,93.7 L 152,93.9 L 154,94.2 L 156,94.5 L 158,94.9 L 160,95.4 L 162,95.9 L 164,96.5 L 166,97.1 L 168,97.8 L 170,98.5 L 172,99.3 L 174,100.2 L 176,101 L 178,101.9 L 180,102.9 L 182,103.9 L 184,104.9 L 186,105.9 L 188,106.9 L 190,108 L 192,109.1 L 194,110.1 L 196,111.2 L 198,112.3 L 200,113.4 L 202,114.5 L 204,115.6 L 206,116.6 L 208,117.7 L 210,118.7 L 212,119.7 L 214,120.7 L 216,121.7 L 218,122.6 L 220,123.6 L 222,124.5 L 224,125.3 L 226,126.2 L 228,127 L 230,127.8 L 232,128.5 L 234,129.2 L 236,129.9 L 238,130.6 L 240,131.2 L 242,131.8 L 244,132.4 L 246,132.9 L 248,133.5 L 250,133.9 L 252,134.4 L 254,134.8 L 256,135.2 L 258,135.6 L 260,136 L 262,136.3 L 264,136.6 L 266,136.9 L 268,137.2 L 270,137.4 L 272,137.6 L 274,137.9 L 276,138.1" fill="none" stroke="#c8324a" stroke-width="1.8"/><line x1="145" y1="137" x2="145" y2="143" stroke="#1f2530" stroke-width="1.2"/><text x="145" y="156" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="168" y="38" font-size="10" text-anchor="start" fill="#4a7d3a">liten spridning</text><text x="196" y="82" font-size="10" text-anchor="start" fill="#2563c9">mellanstor</text><text x="228" y="112" font-size="10" text-anchor="start" fill="#c8324a">stor spridning</text></svg>
:::

::: exempel "Exempel 1 — Längden hos vuxna män"
**Anta att längden hos vuxna män är normalfördelad med medellängden
181 cm och standardavvikelsen 8 cm.**

Vi ritar en normalfördelningskurva och fyller i värdena. Rakt
under toppen skriver vi in medelvärdet 181. I nästa steg åt höger
skriver vi in "medelvärdet + en standardavvikelse", alltså
$181 + 8 = 189$. Ytterligare ett steg åt höger skriver vi in
"medelvärdet + två standardavvikelser", alltså $181 + 8 + 8 = 197$.

Ett steg åt vänster från medelvärdet skriver vi in "medelvärdet − en
standardavvikelse" = $181 - 8 = 173$. Och till sist, vid ytterligare
ett steg åt vänster skriver vi in "medelvärdet − två
standardavvikelser" = $181 - 8 - 8 = 165$. Vi markerar området mellan
173 cm och 189 cm och jämför med normalfördelningskurvan:

::: figur
<svg viewBox="6 22 280 134" width="504" height="241" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva för mäns längder med markerat område mellan 173 och 189 centimeter, som täcker 68,2 procent."><path d="M 100,130 L 100,69.3 L 102,66.3 L 104,63.3 L 106,60.3 L 108,57.4 L 110,54.5 L 112,51.7 L 114,49 L 116,46.5 L 118,44 L 120,41.8 L 122,39.6 L 124,37.7 L 126,35.9 L 128,34.4 L 130,33.1 L 132,32 L 134,31.1 L 136,30.5 L 138,30.1 L 140,30 L 142,30.1 L 144,30.5 L 146,31.1 L 148,32 L 150,33.1 L 152,34.4 L 154,35.9 L 156,37.7 L 158,39.6 L 160,41.8 L 162,44 L 164,46.5 L 166,49 L 168,51.7 L 170,54.5 L 172,57.4 L 174,60.3 L 176,63.3 L 178,66.3 L 180,69.3 L 180,130 Z" fill="#8fb8d8" opacity="0.6"/><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 22,128.7 L 24,128.5 L 26,128.3 L 28,128 L 30,127.7 L 32,127.4 L 34,127 L 36,126.6 L 38,126.1 L 40,125.6 L 42,125 L 44,124.4 L 46,123.7 L 48,122.9 L 50,122 L 52,121.1 L 54,120.1 L 56,119 L 58,117.8 L 60,116.5 L 62,115.1 L 64,113.6 L 66,111.9 L 68,110.2 L 70,108.4 L 72,106.4 L 74,104.4 L 76,102.2 L 78,99.9 L 80,97.5 L 82,95 L 84,92.5 L 86,89.8 L 88,87 L 90,84.2 L 92,81.3 L 94,78.4 L 96,75.4 L 98,72.4 L 100,69.3 L 102,66.3 L 104,63.3 L 106,60.3 L 108,57.4 L 110,54.5 L 112,51.7 L 114,49 L 116,46.5 L 118,44 L 120,41.8 L 122,39.6 L 124,37.7 L 126,35.9 L 128,34.4 L 130,33.1 L 132,32 L 134,31.1 L 136,30.5 L 138,30.1 L 140,30 L 142,30.1 L 144,30.5 L 146,31.1 L 148,32 L 150,33.1 L 152,34.4 L 154,35.9 L 156,37.7 L 158,39.6 L 160,41.8 L 162,44 L 164,46.5 L 166,49 L 168,51.7 L 170,54.5 L 172,57.4 L 174,60.3 L 176,63.3 L 178,66.3 L 180,69.3 L 182,72.4 L 184,75.4 L 186,78.4 L 188,81.3 L 190,84.2 L 192,87 L 194,89.8 L 196,92.5 L 198,95 L 200,97.5 L 202,99.9 L 204,102.2 L 206,104.4 L 208,106.4 L 210,108.4 L 212,110.2 L 214,111.9 L 216,113.6 L 218,115.1 L 220,116.5 L 222,117.8 L 224,119 L 226,120.1 L 228,121.1 L 230,122 L 232,122.9 L 234,123.7 L 236,124.4 L 238,125 L 240,125.6 L 242,126.1 L 244,126.6 L 246,127 L 248,127.4 L 250,127.7 L 252,128 L 254,128.3 L 256,128.5 L 258,128.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530">165</text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530">173</text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530">181</text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530">189</text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530">197</text><text x="284" y="146" font-size="10" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

**Hur stor andel är<br>a) mellan 173 cm och 189 cm?<br>b) längre än 197 cm?**

**a)** Vi ser då att mellan 173 cm och 181 cm ligger 34,1 %. Mellan 181 cm
och 189 cm ligger också 34,1 %. Mellan 173 cm och 189 cm ligger alltså

$$
34{,}1\ \% + 34{,}1\ \% = 68{,}2\ \%
$$

**Svar:** 68,2 %

**b)** Vi markerar området över 197 cm och jämför med
normalfördelningskurvan. 197 cm motsvarar "medelvärdet + två
standardavvikelser" och över detta ligger 2,3 %.

**Svar:** 2,3 %
:::

::: exempel "Exempel 2 — Längden hos vuxna kvinnor (Geogebra)"
**Vuxna kvinnor har medellängden 165,5 cm med standardavvikelsen
6,15 cm. Hur<br>a) stor andel av kvinnorna är mellan 160 och 170 cm?<br>b) lång ska en kvinna vara för att vara längre än 99 % av alla kvinnor?**

**a)** Vi löser uppgiften med Geogebra.

1. Klicka på knappen "Växla till sannolikhetskalkylator" i menyraden
   överst.
2. Vi skriver in medelvärdet 165,5 vid $\mu$ och standardavvikelsen
   6,15 vid $\sigma$. OBS! Tänk på att decimaltal skrivs med punkt i
   stället för komma: 165,5 → 165.5.
3. Vi har nu ett "slutet intervall" mellan 160 till 170 cm som vi
   skriver in i fälten: $P(160 \leq X \leq 170) = 0{,}582\ldots$

Vi ser att andelen är ca 0,58 = 58 %, samtidigt som området markeras i
normalfördelningskurvan.

Lämplig redovisning: "$\mu = 165{,}5$ och $\sigma = 6{,}15$ i GG
[Geogebra] med intervallet $160 \leq x \leq 170$ ger 58 %."

**Svar:** 58 %

**b)** Vi skriver in medelvärde och standardavvikelse precis som i
a-uppgiften. Vi vill ta reda på vilken längd 99 % är MINDRE ÄN. Då har
vi ett så kallat "halvöppet intervall" som ska vara mindre än ett visst
värde — vi klickar på knappen "öppet åt vänster".

Vilket värdet är vet vi inte, men vi vill att andelen ska vara
99 % = 0,99. Vi skriver in 0,99 i fältet för andel:
$P(X \leq 179{,}807\ldots) = 0{,}99$.

Vi ser att längden där detta gäller är ca 180 cm.

Lämplig redovisning: "$\mu = 165{,}5$ och $\sigma = 6{,}15$ i GG med
andelen 0,99 som undre gräns ger 180 cm."

**Svar:** 180 cm
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Normalfördelning"
- **Normalfördelning:** värdena fördelas jämnt och symmetriskt kring medelvärdet.
- Kurvan bestäms helt av medelvärdet $\mu$ och standardavvikelsen $\sigma$.
- Liten spridning ger hög och smal kurva, stor spridning ger låg och bred kurva. Arean under kurvan är alltid densamma.
:::

::: sampunkt "Procentsatserna"
- Mellan $\mu$ och $\mu \pm \sigma$: 34,1 % åt vardera hållet.
- Mellan $\mu \pm \sigma$ och $\mu \pm 2\sigma$: 13,6 % åt vardera hållet.
- Utanför $\mu \pm 2\sigma$: 2,3 % åt vardera hållet.
- Inom en standardavvikelse ligger alltså 68,2 % av värdena.
:::

::: sampunkt "Arbetsgång för hand"
1. Rita kurvan och skriv $\mu$ rakt under toppen.
2. Fyll i $\mu \pm \sigma$ och $\mu \pm 2\sigma$ stegvis åt båda håll.
3. Markera det efterfrågade området och addera procentsatserna.
- Med $\mu = 181$ och $\sigma = 8$ ligger 68,2 % mellan 173 och 189, och 2,3 % över 197.
:::

::: sampunkt "Sannolikhetskalkylatorn"
- Ojämna gränser kräver digitalt verktyg: knappen "Växla till sannolikhetskalkylator".
- Fyll i $\mu$ och $\sigma$, välj intervalltyp och skriv in gränserna. Decimaltal med punkt.
- Fyra intervalltyper: öppet åt vänster, slutet intervall, intervallkomplement och öppet åt höger.
- Söks en **gräns** i stället för en andel skrivs andelen in, till exempel 0,99 för att hitta längden som 99 % ligger under.
- Redovisa alltid vilka värden du matat in och vilket intervall du valt.
:::

:::
