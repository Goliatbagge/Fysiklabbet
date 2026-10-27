# Fysiklabbet: fysikksimuleringer på bokmål

Denne mappen inneholder 88 interaktive fysikksimuleringer fra Fysiklabbet
(https://fysiklabbet.se), oversatt til bokmål. Teksten står direkte i koden,
så det trengs ingen språkfiler. `index.html` er en oversikt med lenker til
alle simuleringene.

Opprinnelig laget av Fysiklabbet.

Vilkår for bruk: [fylles inn]

## Slik kjører du simuleringene

Åpne mappen gjennom en lokal webserver, ikke ved å dobbeltklikke på filene.
Flere av simuleringene laster inn filer og iframes, og det blokkerer
nettleseren når siden åpnes fra `file://`.

```
python -m http.server
```

Kjør kommandoen i denne mappen og åpne http://localhost:8000 i nettleseren.

Simuleringene trenger internettilgang, fordi de henter:

- React 18 (UMD) og Babel standalone fra unpkg
- Tailwind fra cdn.tailwindcss.com
- Three.js (r128) fra cdnjs (bare 3D-simuleringene)
- skrifttypene Poppins, DM Sans, Instrument Serif og JetBrains Mono fra
  Google Fonts

## Slik henger filene sammen

Hver simulering er én HTML-fil: `fysik1-*` hører til Fysikk nivå 1 og
`fysik2-*` til Fysikk nivå 2. React-koden står inne i filen, i et
`<script type="text/babel">`.

Delte filer:

| Fil | Innhold |
|---|---|
| `styles.css` | Grunnstilen |
| `styles-laborans.css` | Temaet: farger og typografi som CSS-variabler i `:root`, for eksempel `--lab-bg` (`#f3eee4`, bakgrunn), `--lab-ink` (`#0f1620`, tekst), `--lab-accent` (`#c8324a`, aksent) og `--lab-font-sans`, `--lab-font-mono`, `--lab-font-display` |
| `styles-laborans-sim.css` | Layouten til simuleringene, fullskjerm og mobil |
| `sim-dock.js` | Verktøypanelet under scenen på mobil |
| `minisim.js`, `kopplade-fjadrar.js` | Mindre simuleringer som brukes av noen av sidene |
| `tekst.js` | Erstatter språkmotoren til Fysiklabbet. Teksten er allerede norsk, og `I18N.t('… {n} …', { n })` fyller bare inn plassholdere |

Mappene `fysik1-tryck-pa/` og `fysik2-magnetfalt/` inneholder simuleringer
som vises i en iframe. I `media/video/` ligger en film.

## Endre stilen

Det meste av utseendet styres av CSS-variablene i `styles-laborans.css`.
Mange av fargene i selve scenene står likevel direkte i den enkelte
HTML-filen og må endres der.

## Dette er fjernet

Sammenlignet med nettstedet er menyen, brødsmulene, bunnteksten,
delsnavigasjonen (Teori, Simulering, Oppgaver), tilbakemeldingsknappen og
besøksmålingen tatt bort. Noen lenker i teksten peker fortsatt til
teorisidene på https://fysiklabbet.se. Dem kan du fjerne eller endre.

## Begrensninger

- Kodekommentarer og interne variabelnavn er på svensk. All tekst som vises
  på skjermen, er norsk.
- Tall skrives med desimalkomma.
- `minisim.js` inneholder også andre små simuleringer fra Fysiklabbet som
  ikke brukes av sidene her. Teksten i dem er ikke oversatt.
