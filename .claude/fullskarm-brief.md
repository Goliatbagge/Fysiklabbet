# Brief: Lägg till fullskärmsläge i simuleringar

Du ska lägga till fullskärmsläge i ett antal simuleringssidor som saknar det,
enligt projektets kanoniska mönster. Läs FÖRST avsnitten "Fullskärmsläge",
"Inga överlappande objekt" och fs-btn-mallen i `CLAUDE.md` (repo-roten).

## Kanoniskt mönster (referens: fysik2-fotoelektrisk-effekt.html, rad ~875–1010)

Alla målsidor har redan `<body class="... lab-sim">` och laddar
`styles-laborans-sim.css`, så klasserna `.scene-wrap`, `.fs-btn`,
`.fs-controls`, `.fs-toggle-handle`, `.scene-toggles`, `.fs-sliders` och
alla `:fullscreen`-overrides är GLOBALT stylade. **Definiera ALDRIG egen
lokal CSS för `.fs-btn`** och hitta aldrig på en egen ikon.

Steg per fil:

1. **Identifiera scenen** — den huvudsakliga visualiseringen (canvas, SVG
   eller HTML-scen). Wrappa den i `<div className="scene-wrap"
   ref={sceneWrapRef}>` om ingen scen-wrapper finns. Har sidan redan en
   likvärdig wrapper (`.canvas-wrap`, `.wave-stage` e.d. med
   position:relative) kan den användas som fullskärmselement i stället —
   men `.scene-wrap` är förstahandsvalet.
   - **Ljus SVG-/HTML-scen (inte THREE.js/canvas med egen mörk bakgrund):**
     sätt `data-theme="ljusPapper"` på scen-wrappern, annars blir bakgrunden
     marinblå i fullskärm.
   - Sidor utan klassisk "scen" (t.ex. kretsbyggare, quiz/övningsyta):
     fullskärma den huvudsakliga interaktiva ytan (kortet med
     visualisering + närmaste interaktion). All interaktion måste fungera
     i fullskärm.
2. **Fullskärmsknapp** `.fs-btn` uppe till VÄNSTER i scenen, med EXAKT
   ikon-SVG:n från CLAUDE.md-mallen (kopiera från
   fysik2-fotoelektrisk-effekt.html). Ingen text i knappen,
   `aria-label="Fullskärm"`.
3. **State + listeners** (React-sidor):
   `const [isFullscreen, setIsFullscreen] = useState(false)` +
   `fullscreenchange`/`webkitfullscreenchange`-lyssnare och
   `toggleFullscreen()` exakt som i referensen. För icke-React-sidor
   (vanilla JS): samma logik i vanlig JS.
4. **Reglageplacering i fullskärm** (kritiskt, se CLAUDE.md):
   - Glidare/sifferfält → hopfällbar `.fs-controls`-panel i scenens
     UNDERKANT med `.fs-toggle-handle` ("Reglage"/"Dölj reglage").
     Startläge: hopfälld (`collapsed`). Ta bara med de viktigaste
     glidarna; tunga/sällan använda kontroller stannar i sidopanelen.
     **Alternativ (föredras när det bara är 1–3 glidare och det finns
     ledig sceneyta):** `.fs-sliders` — direkt synliga glidare uppe till
     vänster under fs-knappen (referens: fysik2-kraftmoment-app.html
     rad ~814). Då ingen nedre panel alls.
   - Kryssrutor/radioknappar (visningsval, lägesval) + Start/Paus/Börja
     om-knappar → `.scene-toggles`-ruta UPPE TILL HÖGER (syns i både
     normalläge och fullskärm enligt global CSS).
   - ⛔ VARJE reglage på EXAKT ETT ställe i fullskärm — aldrig dubblerat
     inom scenen. Har sidan inga glidare: rendera INTE `.fs-controls`/
     `.fs-toggle-handle` alls.
   - Om sidans befintliga kontroller ligger i en sidopanel utanför scenen
     behåller du dem där för normalläget — dubblering scen⇄sidopanel är OK
     (sidopanelen syns inte i fullskärm). Håll värdena i samma state så
     båda är synkade.
5. **`user-select: none`** på scen-wrappern (via style eller befintlig
   global klass).
6. **Överlapp:** kontrollera att fs-knappen inte krockar med befintliga
   etiketter/badges i scenens övre vänstra hörn — flytta i så fall
   etiketten (aldrig konturer/halos).
7. **Canvas-storlek i fullskärm:** om scenen är en `<canvas>` med fast
   storlek måste den följa med när wrappern blir 100vw/100vh (resize-
   lyssnare eller ResizeObserver som ritar om; THREE.js:
   renderer.setSize + camera.aspect + updateProjectionMatrix). SVG med
   viewBox skalar av sig själv (`width:100%`), men scopa ev. lokal
   `svg{width:100%}`-regel till `.scene-wrap > svg` så att fs-btn-ikonen
   inte blåses upp (vanlig bugg, se CLAUDE.md).

## Verifiering (per fil, obligatorisk)

Dev-servern KÖRS REDAN på port 8000 — starta INTE en egen (porten är
upptagen). Ta headless-skärmdumpar och GRANSKA dem visuellt:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1280,900 --virtual-time-budget=6000 `
  --screenshot="C:\claude\Fysiklabbet\.shots\fs-<filnamn>.png" `
  "http://localhost:8000/<filnamn>.html"
```

Kontrollera: sidan renderar utan blank skärm (JS-fel), fs-knappen syns
uppe till vänster som en cirkulär 40 px-knapp med ikon (inte uppblåst,
ingen text), inga överlapp, scenen ser ut som före ändringen i övrigt.
Äkta fullskärm kan inte tas i headless — verifiera i stället
fullskärmslayouten genom att läsa CSS:en (globala :fullscreen-reglerna
gäller `.scene-wrap`) och att din struktur matchar referensens.

Smal skärm: ta även en skärmdump med `--window-size=500,900` och
kontrollera att inget överlappar.

## Regler som ofta glöms

- Emojis är strikt förbjudna överallt.
- Svenska UI-texter, aldrig title case ("Dölj reglage", inte "Dölj Reglage").
- Decimalkomma i alla visade värden.
- Variabler kursiva (`<em>`/`italic-var`), enheter raka.
- Ändra INTE simuleringens fysik, layout eller övriga funktioner — bara
  fullskärmstillägget.
- Babel-CDN-länken får inte röras (pinnad @7.29.7).

## Rapport

Returnera per fil: vad du gjorde (scen-element, var reglagen hamnade),
eventuella avvikelser/problem, och skärmdumpsfilens namn.
