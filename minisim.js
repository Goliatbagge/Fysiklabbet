/* minisim.js — minisimuleringar inbäddade i teorigenomgångar.
 *
 * En minisimulering är en liten, superlättillgänglig interaktiv demo som
 * bäddas in direkt i ett teoriavsnitt (enklare än de fristående
 * simuleringssidorna). Bäddas in i teori-markdown med ett ::: minisim-block:
 *
 *   ::: minisim
 *   typ: tomtebloss
 *   :::
 *
 * preprocessBlocks() i katalog.html/avsnitt.html gör om blocket till
 *   <div class="lab-minisim" data-minisim-src="<base64 av rå blocktext>"></div>
 * och efter render anropas window.FYSIKMINISIM.mountAll(container) som här
 * bygger widgeten. Blocket skyddas i data/teori/build.js (ingen NBSP/term-
 * transform) och hoppas över av TTS-manuset (export-manus.html).
 *
 * Fält i konfigurationen (en per rad, "nyckel: värde"):
 *   typ:    vilken minisimulering som ska byggas (OBLIGATORISKT).
 *           Tillgängliga typer: tomtebloss, centrifug, fjaderpendel,
 *           skiftnyckel, valtning, linjal
 *   titel:  liten rubrik ovanför scenen (valfritt).
 *
 * Widgeten är ren vanilla-JS (ingen React) och har egen intern CSS.
 *
 * ── typ: tomtebloss ──────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.4 (Cirkulär rörelse): ett tomtebloss fäst i en
 * skruvdragare, i mörker. Tänd tomteblosset — gnistorna sprutar åt alla
 * håll. Starta skruvdragaren — tomteblosset roterar snabbt och gnistorna
 * lämnar banan TANGENTIELLT i rörelsens riktning (inte radiellt utåt),
 * eftersom varje gnista behåller spetsens hastighet i frigörelseögonblicket
 * (Newtons första lag). Gnistornas utkastfart (~tiotals px/s) är liten
 * jämfört med spetsens banfart (ω·r, tusentals px/s), så strålen blir en
 * tangent till cirkeln.
 *
 * TEMA: minisimuleringar ska generellt gå i laboranstemat — ljus
 * pappersbakgrund med ett blått kollegieblocks-rutnät, som om simuleringen
 * låg ritad på ett anteckningsblock (kortklass ms-ljus + drawPaper()).
 * Tomteblosset är UNDANTAGET: det kräver mörker för ljuseffekten.
 *
 * ── typ: centrifug ───────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.4 (Cirkulär rörelse): en blöt tvättsvamp i en
 * centrifug (roterande korg utan lock, sedd rakt uppifrån, ritad på
 * papperstemat med rutnät). Blöt svampen
 * och starta centrifugen — vattendropparna pressas ut genom korgväggen och
 * lämnar banan TANGENTIELLT i rörelsens riktning (inte radiellt utåt),
 * eftersom varje droppe behåller svampens hastighet i frigörelseögonblicket
 * (Newtons första lag). Droppens lilla radiella läckfart (~tiotals px/s) är
 * försumbar mot banfarten (ω·r, tusentals px/s), så banan blir en tangent
 * till cirkeln. Varvtalsglidare, pausknapp som fryser bilden, "Ultrarapid"
 * för slow motion, fullskärm samt syntetiserat ljud (motorton som följer
 * varvtalet + vattenfräs som följer utslungningen — inga ljudfiler).
 *
 * ── typ: fjaderpendel ────────────────────────────────────────────────────
 * Demonstrationen ur fy2-2.1 (Hookes lag): en vikt som hänger i en
 * spiralfjäder från taket. Dra i vikten (eller tryck "Dra ner och släpp")
 * så pendlar den harmoniskt kring jämviktsläget y = 0, mellan vändlägena
 * +A och −A. Kryssrutor visar hastighetsvektorn v (blå) och accelerations-
 * vektorn a (röd) — pillängderna är skalenliga mot storheternas belopp, så
 * eleven ser att farten är störst i jämviktsläget (a = 0 där) och att
 * accelerationen är störst i vändlägena (v = 0 där), alltid riktad mot
 * jämviktsläget. Ritad i laboranstemat (ljust papper med rutnät), samma
 * färger som teorifigurerna: v = #2563c9, a = #c0392b. Pausknapp,
 * "Ultrarapid" och fullskärm som övriga minisims; inget ljud.
 *
 * ── typ: linjal ──────────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.2 (Mer kraftmoment): en linjal vilar vågrätt på
 * två pekfingrar. "Dra ihop fingrarna" — BÅDA fingrarna förs mot mitten
 * (som när man gör försöket själv), och linjalen åker med det finger som
 * håller fast: fingret närmast tyngdpunkten bär större normalkraft och
 * därmed större friktionskraft, så det FJÄRMARE fingret glider mot
 * linjalen. När det glidande fingret kommit tillräckligt nära
 * tyngdpunkten (kvoten N_glid/N_fast ≥ μs/μk) byter fingrarna roll,
 * växelvis, tills de möts — och linjalen har då förskjutit sig så att
 * tyngdpunkten ligger precis mitt emellan dem.
 * Skalenliga normalkraftspilar (blå, pillängd ∝ N, från kontaktytan uppåt
 * genom linjalen) bär förklaringen. Kryssrutan "Lägg en vikt på linjalen"
 * lägger en flyttbar (draggbar) mässingsvikt på linjalen som förskjuter
 * tyngdpunkten — fingrarna möts då i det NYA tyngdpunktsläget. "Visa
 * tyngdpunkten" markerar läget i förväg; annars avslöjas det först när
 * fingrarna möts. Ritad i laboranstemat; pausknapp, "Ultrarapid" och
 * fullskärm som övriga minisims; inget ljud.
 *
 * ── typ: valtning ────────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.2 (Vältning): en kloss står på en planka som
 * lutas med en glidare (0–45°). I klossens tyngdpunkt (grön prick) sitter
 * en metallvisare som alltid hänger lodrätt och illustrerar tyngdkraftens
 * riktning; klossens stödyta är markerad lila på plankan (samma färger som
 * teorifigurerna intill). Så länge visaren träffar plankan innanför
 * stödytan står klossen stabilt — när lutningen passerar den kritiska
 * vinkeln (tan θ = b/h, tyngdpunkten rakt ovanför det nedre hörnet) välter
 * klossen kring hörnet med fysikalisk vinkelacceleration. Knappval mellan
 * "Hög kloss" (välter vid ≈23°) och "Låg kloss" (står kvar upp till
 * glidarens max) gör stabilitetspoängen jämförbar. Ritad i laboranstemat;
 * "Ultrarapid" och fullskärm som övriga minisims; inget ljud.
 */
(function () {
    'use strict';

    // ── Svensk sifferformatering (komma, noll utan decimaler) ─────────────
    function fmt(v, decimals) {
        var s = v.toFixed(decimals == null ? 1 : decimals);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }

    // ── Intern CSS (injiceras en gång) ────────────────────────────────────
    var FONT = '"Poppins", system-ui, sans-serif';
    var CSS = [
        '.minisim-card{background:#07090f;border:1px solid #2a2f3a;border-radius:6px;',
        '  padding:10px 10px 12px;max-width:560px;margin:0 auto;user-select:none;-webkit-user-select:none;}',
        '.minisim-title{font-family:' + FONT + ';font-size:15px;letter-spacing:.04em;',
        '  color:#cfd4de;text-align:center;margin:2px 0 8px;font-style:normal;}',
        '.minisim-scene{position:relative;border-radius:4px;overflow:hidden;}',
        '.minisim-canvas{display:block;width:100%;height:auto;border-radius:4px;cursor:default;}',
        '.minisim-controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px;font-style:normal;}',
        '.minisim-btn{appearance:none;border:1px solid #3a4150;border-radius:4px;background:#151a24;',
        '  color:#dde2ec;font-family:' + FONT + ';font-size:14px;line-height:1;',
        '  padding:9px 14px;cursor:pointer;transition:background .15s,border-color .15s;}',
        '.minisim-btn:hover{background:#1d2432;border-color:#4a5468;}',
        '.minisim-btn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        '.minisim-btn.ms-primar{background:#b8531f;border-color:#d06a30;color:#fff4e8;}',
        '.minisim-btn.ms-primar:hover{background:#c95f26;}',
        '.minisim-btn:disabled{opacity:.45;cursor:default;}',
        '.minisim-check{display:inline-flex;align-items:center;gap:6px;color:#aab1bf;font-size:13.5px;',
        '  font-family:' + FONT + ';cursor:pointer;font-style:normal;}',
        '.minisim-check input{accent-color:#c95f26;width:15px;height:15px;cursor:pointer;}',
        '.minisim-info{margin-left:auto;color:#8a93a5;font-size:13px;font-variant-numeric:tabular-nums;',
        '  font-family:' + FONT + ';font-style:normal;white-space:nowrap;}',
        '.minisim-slider-row{display:flex;align-items:center;gap:10px;margin-top:10px;font-style:normal;}',
        '.minisim-slider-lbl{color:#aab1bf;font-size:13.5px;font-family:' + FONT + ';white-space:nowrap;}',
        '.minisim-slider-val{color:#dde2ec;font-size:13.5px;font-family:' + FONT + ';',
        '  font-variant-numeric:tabular-nums;white-space:nowrap;min-width:74px;text-align:right;}',
        '.minisim-slider{flex:1;appearance:none;-webkit-appearance:none;height:4px;border-radius:2px;',
        '  background:#2a2f3a;outline:none;cursor:pointer;}',
        '.minisim-slider::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:16px;height:16px;',
        '  border-radius:50%;background:#c95f26;border:2px solid #07090f;cursor:pointer;}',
        '.minisim-slider::-moz-range-thumb{width:12px;height:12px;border-radius:50%;',
        '  background:#c95f26;border:2px solid #07090f;cursor:pointer;}',
        '.minisim-slider:focus-visible{outline:2px solid #7aa2e0;outline-offset:4px;}',
        /* Fullskärmsknapp — samma utseende som .fs-btn på sims-sidorna
           (vit cirkel, ink-ikon, uppe till vänster på scenen). */
        '.minisim-fsbtn{position:absolute;top:8px;left:8px;width:40px;height:40px;border-radius:50%;',
        '  display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.92);',
        '  color:#0f1620;border:none;cursor:pointer;padding:0;z-index:5;',
        '  box-shadow:0 1px 4px rgba(0,0,0,0.35);}',
        '.minisim-fsbtn:hover{background:#fff;}',
        '.minisim-fsbtn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        /* Ljudknapp — samma cirkelstil, uppe till höger på scenen. */
        '.minisim-sndbtn{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;',
        '  display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.92);',
        '  color:#0f1620;border:none;cursor:pointer;padding:0;z-index:5;',
        '  box-shadow:0 1px 4px rgba(0,0,0,0.35);}',
        '.minisim-sndbtn:hover{background:#fff;}',
        '.minisim-sndbtn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        /* Fullskärm: mörkt rum, scenen centrerad, kontrollerna under. */
        '.minisim-card:fullscreen{max-width:none;border:none;border-radius:0;display:flex;',
        '  flex-direction:column;align-items:center;justify-content:center;background:#04060b;',
        '  padding:16px;gap:4px;}',
        '.minisim-card:fullscreen .minisim-scene{width:min(100%,calc((100vh - 150px)*' + (560 / 430) + '));}',
        '.minisim-card:fullscreen .minisim-controls,',
        '.minisim-card:fullscreen .minisim-slider-row{width:min(92vw,640px);}',
        '.minisim-card:-webkit-full-screen{max-width:none;border:none;border-radius:0;display:flex;',
        '  flex-direction:column;align-items:center;justify-content:center;background:#04060b;',
        '  padding:16px;gap:4px;}',
        '.minisim-card:-webkit-full-screen .minisim-scene{width:min(100%,calc((100vh - 150px)*' + (560 / 430) + '));}',
        '.minisim-card:-webkit-full-screen .minisim-controls,',
        '.minisim-card:-webkit-full-screen .minisim-slider-row{width:min(92vw,640px);}',
        /* Ljus temavariant (laborans papper) — standard för minisims som
           inte kräver mörker. Läggs som extra klass på kortet: ms-ljus. */
        '.minisim-card.ms-ljus{background:#f9f5ec;border-color:#d8cdb8;}',
        '.minisim-card.ms-ljus .minisim-title{color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-scene{border:1px solid #ddd3c0;}',
        '.minisim-card.ms-ljus .minisim-btn{background:#fdfaf3;border-color:#c9bfa9;color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-btn:hover{background:#f3ecdd;border-color:#b4a88e;}',
        '.minisim-card.ms-ljus .minisim-btn.ms-primar{background:#b8531f;border-color:#a04617;color:#fff4e8;}',
        '.minisim-card.ms-ljus .minisim-btn.ms-primar:hover{background:#c95f26;}',
        '.minisim-card.ms-ljus .minisim-check{color:#4a5160;}',
        '.minisim-card.ms-ljus .minisim-info{color:#6a7180;}',
        '.minisim-card.ms-ljus .minisim-slider-lbl{color:#4a5160;}',
        '.minisim-card.ms-ljus .minisim-slider-val{color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-slider{background:#d8cdb8;}',
        '.minisim-card.ms-ljus .minisim-slider::-webkit-slider-thumb{border-color:#f9f5ec;}',
        '.minisim-card.ms-ljus .minisim-slider::-moz-range-thumb{border-color:#f9f5ec;}',
        '.minisim-card.ms-ljus .minisim-fsbtn,',
        '.minisim-card.ms-ljus .minisim-sndbtn{box-shadow:0 1px 4px rgba(15,22,32,0.22);',
        '  border:1px solid #d8cdb8;}',
        '.minisim-card.ms-ljus:fullscreen{background:#f2ebdc;}',
        '.minisim-card.ms-ljus:-webkit-full-screen{background:#f2ebdc;}',
        /* (.lab-minisim-marginalen ligger i styles-laborans.css, som
           .lab-graf/.lab-handskrift.) Neutralisera ev. ärvd kursiv stil. */
        '.lab-minisim p{margin:0;}'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('minisim-style')) return;
        var st = document.createElement('style');
        st.id = 'minisim-style';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    // ── Konfigparser ("nyckel: värde" per rad) ────────────────────────────
    function parseConfig(src) {
        var cfg = {};
        src.split('\n').forEach(function (line) {
            var m = line.match(/^([a-zåäöA-ZÅÄÖ_][\wåäöÅÄÖ]*)\s*:\s*(.*)$/);
            if (m) cfg[m[1].toLowerCase()] = m[2].trim();
        });
        return cfg;
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: tomtebloss
    // ══════════════════════════════════════════════════════════════════════
    function buildTomtebloss(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var CX = W / 2, CY = H / 2 - 22;   // rotationscentrum (chucken)
        var R0 = 118;                      // tomteblossets fulla längd (px)
        var R_SLUT = 40;                   // brinnpunkt-radie där blosset tar slut
        var BURN_RATE = 2.1;               // px/s som brinnpunkten kryper inåt
        var GRAV = 300;                    // px/s²
        var DRAG = 3.6;                    // luftmotstånd (1/s)
        var MAX_P = 2600;                  // partikeltak

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Ett tomtebloss fäst i en skruvdragare, i mörker. När skruvdragaren ' +
            'roterar lämnar gnistorna cirkelbanan tangentiellt i rörelsens riktning.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);

        // Ljudknapp (högtalare / överstruken högtalare)
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var tandBtn = document.createElement('button');
        tandBtn.type = 'button';
        tandBtn.className = 'minisim-btn ms-primar';
        tandBtn.textContent = 'Tänd tomteblosset';

        var drillBtn = document.createElement('button');
        drillBtn.type = 'button';
        drillBtn.className = 'minisim-btn';
        drillBtn.textContent = 'Starta skruvdragaren';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var nyBtn = document.createElement('button');
        nyBtn.type = 'button';
        nyBtn.className = 'minisim-btn';
        nyBtn.textContent = 'Nytt tomtebloss';
        nyBtn.style.display = 'none';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var info = document.createElement('span');
        info.className = 'minisim-info';
        info.textContent = 'Varvtal: 0 varv/s';

        controls.appendChild(tandBtn);
        controls.appendChild(drillBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(nyBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Varvtalsglidare — styr skruvdragarens (mål)varvtal i varv/s.
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Varvtal';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0.5';
        slider.max = '6';
        slider.step = '0.1';
        slider.value = '4.2';
        slider.setAttribute('aria-label', 'Skruvdragarens varvtal i varv per sekund');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function targetOmega() { return 2 * Math.PI * parseFloat(slider.value); }
        function syncSliderVal() {
            sliderVal.textContent = fmt(parseFloat(slider.value), 1) + ' varv/s';
        }
        syncSliderVal();

        // ── Canvas-uppsättning ────────────────────────────────────────────
        // Backing-storen följer den VISADE storleken (skarp även i
        // fullskärm); all ritning sker i logiska koordinater (W × H).
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var lit = false;        // brinner blosset?
        var burnt = false;      // har det brunnit ut?
        var drillOn = false;
        var paused = false;     // fryst bild — gnistorna står stilla i luften
        var theta = -Math.PI / 2;   // blossets vinkel (rakt upp från chucken)
        var omega = 0;              // rad/s
        var burnR = R0;             // brinnpunktens radie
        var particles = [];
        var emitAcc = 0;            // ackumulerad bråkdels-emission
        var flick = 1;              // flimmerfaktor för glöden
        var running = false;        // rAF-loop aktiv?
        var visible = true;         // syns i viewport?
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowCb.checked ? 0.25 : 1; }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Motorton: två oscillatorer vars frekvens följer varvtalet.
        // Sprak: procedurellt genererad crackle-buffer (fizz + slumpvisa
        // knallar med exponentiella svansar) som loopas genom ett högpass.
        // I ultrarapid pitchas båda ner. Skapas lazy vid första knapptryck
        // (webbläsarnas autoplay-policy kräver en användargest).
        var AC = window.AudioContext || window.webkitAudioContext;
        var audio = null;
        var soundOn = true;

        function makeCrackleBuffer(actx) {
            var sr = actx.sampleRate;
            var len = Math.floor(sr * 2);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.05; // fräs
            for (var n = 0; n < 700; n++) {                                      // knallar
                var pos = Math.floor(Math.random() * (len - sr * 0.03));
                var amp = 0.25 + Math.random() * 0.75;
                var tau = sr * (0.0008 + Math.random() * 0.004);
                var dur = Math.floor(tau * 6);
                for (var k = 0; k < dur; k++) {
                    d[pos + k] += (Math.random() * 2 - 1) * amp * Math.exp(-k / tau);
                }
            }
            for (i = 0; i < len; i++) d[i] = Math.tanh(d[i]);                    // mjuk topp
            return buf;
        }

        function ensureAudio() {
            if (audio || !AC) return;
            var actx = new AC();
            var master = actx.createGain();
            master.gain.value = 0.6;
            master.connect(actx.destination);
            // motor
            var motorGain = actx.createGain();
            motorGain.gain.value = 0;
            var motorFilt = actx.createBiquadFilter();
            motorFilt.type = 'lowpass';
            motorFilt.frequency.value = 1600;
            motorFilt.Q.value = 1.5;
            var o1 = actx.createOscillator();
            o1.type = 'sawtooth';
            o1.frequency.value = 80;
            var o2 = actx.createOscillator();
            o2.type = 'square';
            o2.frequency.value = 162;
            var o2g = actx.createGain();
            o2g.gain.value = 0.3;
            o1.connect(motorFilt);
            o2.connect(o2g);
            o2g.connect(motorFilt);
            motorFilt.connect(motorGain);
            motorGain.connect(master);
            o1.start();
            o2.start();
            // sprak
            var crackleGain = actx.createGain();
            crackleGain.gain.value = 0;
            var hp = actx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 1700;
            var src = actx.createBufferSource();
            src.buffer = makeCrackleBuffer(actx);
            src.loop = true;
            src.connect(hp);
            hp.connect(crackleGain);
            crackleGain.connect(master);
            src.start();
            audio = { ctx: actx, master: master, motorGain: motorGain,
                      o1: o1, o2: o2, crackleGain: crackleGain, crackleSrc: src };
        }

        function resumeAudio() {
            ensureAudio();
            if (audio && audio.ctx.state === 'suspended') audio.ctx.resume();
        }

        function updateAudio() {
            if (!audio) return;
            var t = audio.ctx.currentTime;
            var ts = timeScale();
            var active = soundOn && visible && !document.hidden && !paused;
            // motorton — gain och frekvens följer det faktiska varvtalet
            var revs = Math.abs(omega) / (2 * Math.PI);
            var mg = (active && revs > 0.05) ? Math.min(0.5, 0.1 + revs * 0.09) : 0;
            audio.motorGain.gain.setTargetAtTime(mg, t, 0.06);
            var f = (55 + revs * 48) * (0.35 + 0.65 * ts);
            audio.o1.frequency.setTargetAtTime(f, t, 0.06);
            audio.o2.frequency.setTargetAtTime(f * 2.02, t, 0.06);
            // sprak — följer glödens flimmer, tystnar när blosset dör
            var cg = (active && lit) ? (0.32 + 0.22 * flick) : 0;
            audio.crackleGain.gain.setTargetAtTime(cg, t, 0.05);
            audio.crackleSrc.playbackRate.setTargetAtTime(ts < 1 ? 0.45 : 1, t, 0.1);
        }

        // ── Partiklar ─────────────────────────────────────────────────────
        function spawnSpark(x, y, vx, vy, main) {
            if (particles.length >= MAX_P) return;
            var life = main ? (0.28 + Math.random() * 0.65)
                            : (0.10 + Math.random() * 0.22);
            particles.push({
                x: x, y: y, px: x, py: y, vx: vx, vy: vy,
                age: 0, life: life,
                w: main ? (0.9 + Math.random() * 1.1) : (0.6 + Math.random() * 0.6),
                // andel av livet där gnistan ev. "poppar" i en stjärna
                popAt: (Math.random() < 0.42 && main) ? (0.55 + Math.random() * 0.35) : 2,
                main: main
            });
        }

        // Utkastfart för glödande partiklar ur brinnzonen (låga farter
        // dominerar). Riktningen är likformig åt alla håll.
        function ejectVel() {
            var a = Math.random() * 2 * Math.PI;
            var s = 40 + 240 * Math.random() * Math.random();
            return { vx: Math.cos(a) * s, vy: Math.sin(a) * s };
        }

        function emit(dt, thPrev) {
            if (!lit) return;
            var rate = 230 + 3.8 * Math.abs(omega);
            emitAcc += rate * dt;
            var n = Math.floor(emitAcc);
            emitAcc -= n;
            for (var i = 0; i < n; i++) {
                // fördela emissionen längs bågen som spetsen svepte under
                // frame:en, så gnistregnet blir jämnt även vid hög fart
                var f = Math.random();
                var th = thPrev + (theta - thPrev) * f;
                var x = CX + burnR * Math.cos(th);
                var y = CY + burnR * Math.sin(th);
                // KÄRNFYSIKEN: gnistan ärver spetsens tangentiella hastighet
                // (ω·r vinkelrätt mot radien) + en liten slumpvis utkastfart.
                var vtx = -Math.sin(th) * omega * burnR;
                var vty = Math.cos(th) * omega * burnR;
                var ev = ejectVel();
                spawnSpark(x, y, vtx + ev.vx, vty + ev.vy, true);
            }
        }

        function stepParticles(dt) {
            var kd = Math.exp(-DRAG * dt);
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                p.px = p.x; p.py = p.y;
                p.vx *= kd;
                p.vy = p.vy * kd + GRAV * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.age += dt;
                var t = p.age / p.life;
                if (t >= p.popAt) {
                    // gnistan brister i en liten stjärna av kortlivade barn
                    var nk = 4 + Math.floor(Math.random() * 4);
                    for (var k = 0; k < nk; k++) {
                        var a = Math.random() * 2 * Math.PI;
                        var s = 40 + Math.random() * 130;
                        spawnSpark(p.x, p.y,
                            p.vx * 0.25 + Math.cos(a) * s,
                            p.vy * 0.25 + Math.sin(a) * s, false);
                    }
                    particles.splice(i, 1);
                    continue;
                }
                if (t >= 1 || p.x < -60 || p.x > W + 60 || p.y > H + 60 || p.y < -60) {
                    particles.splice(i, 1);
                }
            }
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#04060b';
            ctx.fillRect(0, 0, W, H);
            // svag vinjett — extra mörka hörn
            var g = ctx.createRadialGradient(CX, CY, 60, CX, CY, 420);
            g.addColorStop(0, 'rgba(14,17,26,0.55)');
            g.addColorStop(1, 'rgba(0,0,0,0.72)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }

        function roundRect(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }

        function drawDrill() {
            // Skruvdragare sedd rakt framifrån: chuck i rotationscentrum,
            // växelhus bakom, pistolgrepp nedåt med batteripack i botten.
            ctx.globalCompositeOperation = 'source-over';

            // handtag (lätt lutning åt höger nedåt)
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(0.10);
            ctx.fillStyle = '#101319';
            ctx.strokeStyle = '#1e232d';
            ctx.lineWidth = 1.5;
            roundRect(-17, 22, 34, 132, 10);
            ctx.fill(); ctx.stroke();
            // avtryckare
            roundRect(13, 48, 10, 26, 5);
            ctx.fillStyle = '#0c0f14';
            ctx.fill();
            // batteripack
            roundRect(-42, 146, 86, 34, 7);
            ctx.fillStyle = '#0e1117';
            ctx.fill(); ctx.stroke();
            ctx.restore();

            // växelhus
            ctx.beginPath();
            ctx.arc(CX, CY, 27, 0, 2 * Math.PI);
            ctx.fillStyle = '#151922';
            ctx.fill();
            ctx.strokeStyle = '#232937';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // chuck med tre backar som roterar med blosset
            ctx.beginPath();
            ctx.arc(CX, CY, 16, 0, 2 * Math.PI);
            ctx.fillStyle = '#1c212b';
            ctx.fill();
            ctx.strokeStyle = '#2c3342';
            ctx.stroke();
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(theta);
            ctx.strokeStyle = '#343c4e';
            ctx.lineWidth = 2.4;
            for (var k = 0; k < 3; k++) {
                var a = k * 2 * Math.PI / 3;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 5, Math.sin(a) * 5);
                ctx.lineTo(Math.cos(a) * 13, Math.sin(a) * 13);
                ctx.stroke();
            }
            ctx.restore();
            ctx.beginPath();
            ctx.arc(CX, CY, 3.4, 0, 2 * Math.PI);
            ctx.fillStyle = '#3c4456';
            ctx.fill();
        }

        function drawStickAt(th, alpha) {
            var cosT = Math.cos(th), sinT = Math.sin(th);
            // ometänd/kvarvarande del: chucken → brinnpunkten (grå sats)
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#767a82';
            ctx.lineWidth = 4.6;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(CX + 16 * cosT, CY + 16 * sinT);
            ctx.lineTo(CX + burnR * cosT, CY + burnR * sinT);
            ctx.stroke();
            // utbrunnen del: brinnpunkten → spetsen (tunn naken tråd)
            ctx.strokeStyle = '#3a3e46';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(CX + burnR * cosT, CY + burnR * sinT);
            ctx.lineTo(CX + R0 * cosT, CY + R0 * sinT);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        function drawStick() {
            // Rörelseoskärpa vid hög fart: spökbilder tätt bakåt längs bågen.
            // Oskärpan speglar den VISUELLA rotationen per bildruta, så i
            // ultrarapid (timeScale < 1) krymper den i motsvarande grad.
            var wVis = Math.abs(omega) * timeScale();
            var n = Math.min(9, Math.floor(wVis / 3));
            var stepA = Math.sign(omega) * wVis * 0.0045;
            for (var i = n; i >= 1; i--) {
                drawStickAt(theta - stepA * i, 0.07);
            }
            drawStickAt(theta, 1);
        }

        function drawGlow() {
            if (!lit) return;
            var tx = CX + burnR * Math.cos(theta);
            var ty = CY + burnR * Math.sin(theta);
            ctx.globalCompositeOperation = 'lighter';
            // vid snabb rotation: svag glödring längs spetsens cirkelbana
            // (tröghet i ögat — som en lång exponering)
            var ring = Math.min(0.14, Math.abs(omega) / 190);
            if (ring > 0.015) {
                ctx.strokeStyle = 'rgba(255,185,105,' + ring.toFixed(3) + ')';
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.arc(CX, CY, burnR, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = 'rgba(255,220,160,' + (ring * 0.6).toFixed(3) + ')';
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }
            // rumsljus — det varma skenet som lyser upp skruvdragaren/mörkret
            var g = ctx.createRadialGradient(tx, ty, 4, tx, ty, 330);
            g.addColorStop(0, 'rgba(255,190,110,' + (0.16 * flick).toFixed(3) + ')');
            g.addColorStop(0.35, 'rgba(255,150,70,' + (0.055 * flick).toFixed(3) + ')');
            g.addColorStop(1, 'rgba(255,120,40,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            // brinnpunktens bländande kärna
            var c = ctx.createRadialGradient(tx, ty, 0, tx, ty, 26);
            c.addColorStop(0, 'rgba(255,255,245,' + (0.95 * flick).toFixed(3) + ')');
            c.addColorStop(0.25, 'rgba(255,220,150,' + (0.55 * flick).toFixed(3) + ')');
            c.addColorStop(1, 'rgba(255,160,60,0)');
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.arc(tx, ty, 26, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }

        function sparkStyle(t) {
            // vit → guld → orange → matt röd med falnande alfa
            if (t < 0.18) return 'rgba(255,252,240,';
            if (t < 0.5) return 'rgba(255,215,130,';
            if (t < 0.8) return 'rgba(255,160,64,';
            return 'rgba(220,90,40,';
        }

        function drawParticles() {
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var t = p.age / p.life;
                var a = (1 - t) * (p.main ? 0.9 : 0.8);
                var col = sparkStyle(t);
                ctx.strokeStyle = col + a.toFixed(3) + ')';
                ctx.lineWidth = p.w;
                ctx.beginPath();
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                if (p.main && t < 0.4) {
                    ctx.fillStyle = 'rgba(255,255,235,' + (0.5 * (1 - t)).toFixed(3) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.w * 0.8, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function render() {
            drawBackground();
            drawDrill();
            drawStick();
            drawGlow();
            drawParticles();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            var thPrev = theta;
            // skruvdragaren: mjuk uppspolning / utrullning mot glidarens mål
            var target = drillOn ? targetOmega() : 0;
            var k = drillOn ? 3.2 : 1.8;
            omega += (target - omega) * Math.min(1, k * dt);
            if (!drillOn && Math.abs(omega) < 0.02) omega = 0;
            theta += omega * dt;

            if (lit) {
                burnR -= BURN_RATE * dt;
                flick = 0.75 + 0.25 * Math.random();
                if (burnR <= R_SLUT) {
                    lit = false;
                    burnt = true;
                    burnR = R_SLUT;
                    syncUi();
                }
            }
            emit(dt, thPrev);
            stepParticles(dt);
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            updateAudio();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return lit || Math.abs(omega) > 0.02 || particles.length > 0;
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            info.textContent = 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) + ' varv/s';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            tandBtn.style.display = (!lit && !burnt) ? '' : 'none';
            nyBtn.style.display = burnt ? '' : 'none';
            drillBtn.textContent = drillOn ? 'Stoppa skruvdragaren' : 'Starta skruvdragaren';
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
        }

        tandBtn.addEventListener('click', function () {
            lit = true;
            burnt = false;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        drillBtn.addEventListener('click', function () {
            drillOn = !drillOn;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            updateAudio();  // tysta direkt vid paus
            if (!paused) kick();
            else render();  // frys exakt den bild som visas
        });
        nyBtn.addEventListener('click', function () {
            burnR = R0;
            burnt = false;
            lit = true;
            paused = false;
            particles.length = 0;
            resumeAudio();
            syncUi();
            kick();
        });
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
            updateAudio();
        });
        slowCb.addEventListener('change', kick);
        slider.addEventListener('input', function () {
            syncSliderVal();
            kick();
        });

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                updateAudio();  // tysta när widgeten skrollas ur bild
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            updateAudio();
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-skriptet i .shots/)
        card._audioState = function () { return audio ? audio.ctx.state : 'none'; };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: centrifug
    // ══════════════════════════════════════════════════════════════════════
    function buildCentrifug(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var CX = W / 2, CY = H / 2;        // rotationscentrum (korgens nav)
        var R_WALL = 150;                  // korgväggens radie
        var R_SVAMP = 126;                 // svampens mittradie (pressad mot väggen)
        var SVAMP_ARC = 0.40;              // vinkel som svampen upptar längs väggen
        var DRAG = 0.55;                   // luftmotstånd på dropparna (1/s)
        var OMEGA_MIN = 1.2;               // rad/s innan vattnet börjar pressas ut
        var VATTEN_TOT = 620;              // droppar i en fullblöt svamp
        var MAX_P = 1400;                  // partikeltak

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En blöt tvättsvamp i en roterande centrifugkorg, sedd rakt uppifrån. ' +
            'När centrifugen roterar lämnar vattendropparna cirkelbanan ' +
            'tangentiellt i rörelsens riktning.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);

        // Ljudknapp (högtalare / överstruken högtalare)
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var blotBtn = document.createElement('button');
        blotBtn.type = 'button';
        blotBtn.className = 'minisim-btn ms-primar';
        blotBtn.textContent = 'Blöt svampen';

        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn';
        startBtn.textContent = 'Starta centrifugen';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(blotBtn);
        controls.appendChild(startBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Varvtalsglidare — styr centrifugens (mål)varvtal i varv/s.
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Varvtal';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0.5';
        slider.max = '5';
        slider.step = '0.1';
        slider.value = '3';
        slider.setAttribute('aria-label', 'Centrifugens varvtal i varv per sekund');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function targetOmega() { return 2 * Math.PI * parseFloat(slider.value); }
        function syncSliderVal() {
            sliderVal.textContent = fmt(parseFloat(slider.value), 1) + ' varv/s';
        }
        syncSliderVal();

        // ── Canvas-uppsättning (samma mönster som tomteblosset) ───────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var wet = 0;                // vatten kvar i svampen, 0–1 (startar torr)
        var spinOn = false;
        var paused = false;         // fryst bild — dropparna står stilla i luften
        var theta = -Math.PI / 2;   // svampens vinkel (rakt upp från navet)
        var omega = 0;              // rad/s
        var particles = [];
        var emitAcc = 0;            // ackumulerad bråkdels-emission
        var emitRateSm = 0;         // glättad utslungningstakt (för ljudet)
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        // Svampens porer — slumpas EN gång så mönstret inte flimrar.
        var pores = [];
        for (var pi = 0; pi < 15; pi++) {
            pores.push({
                r: -16 + Math.random() * 32,     // radiellt läge i svampen
                s: -25 + Math.random() * 50,     // tangentiellt läge
                rad: 1.4 + Math.random() * 2.2
            });
        }

        function timeScale() { return slowCb.checked ? 0.25 : 1; }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Motorton: två oscillatorer vars frekvens följer varvtalet.
        // Vattenfräs: loopad vitbrus-buffer genom högpass, gain följer den
        // glättade utslungningstakten. Skapas lazy vid första knapptryck.
        var AC = window.AudioContext || window.webkitAudioContext;
        var audio = null;
        var soundOn = true;

        function makeNoiseBuffer(actx) {
            var sr = actx.sampleRate;
            var len = Math.floor(sr * 1.5);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
            return buf;
        }

        function ensureAudio() {
            if (audio || !AC) return;
            var actx = new AC();
            var master = actx.createGain();
            master.gain.value = 0.55;
            master.connect(actx.destination);
            // motor
            var motorGain = actx.createGain();
            motorGain.gain.value = 0;
            var motorFilt = actx.createBiquadFilter();
            motorFilt.type = 'lowpass';
            motorFilt.frequency.value = 1300;
            motorFilt.Q.value = 1.2;
            var o1 = actx.createOscillator();
            o1.type = 'sawtooth';
            o1.frequency.value = 60;
            var o2 = actx.createOscillator();
            o2.type = 'square';
            o2.frequency.value = 121;
            var o2g = actx.createGain();
            o2g.gain.value = 0.3;
            o1.connect(motorFilt);
            o2.connect(o2g);
            o2g.connect(motorFilt);
            motorFilt.connect(motorGain);
            motorGain.connect(master);
            o1.start();
            o2.start();
            // vattenfräs
            var sprayGain = actx.createGain();
            sprayGain.gain.value = 0;
            var hp = actx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 1500;
            var src = actx.createBufferSource();
            src.buffer = makeNoiseBuffer(actx);
            src.loop = true;
            src.connect(hp);
            hp.connect(sprayGain);
            sprayGain.connect(master);
            src.start();
            audio = { ctx: actx, master: master, motorGain: motorGain,
                      o1: o1, o2: o2, sprayGain: sprayGain, spraySrc: src };
        }

        function resumeAudio() {
            ensureAudio();
            if (audio && audio.ctx.state === 'suspended') audio.ctx.resume();
        }

        function updateAudio() {
            if (!audio) return;
            var t = audio.ctx.currentTime;
            var ts = timeScale();
            var active = soundOn && visible && !document.hidden && !paused;
            // motorton — gain och frekvens följer det faktiska varvtalet
            var revs = Math.abs(omega) / (2 * Math.PI);
            var mg = (active && revs > 0.05) ? Math.min(0.45, 0.08 + revs * 0.08) : 0;
            audio.motorGain.gain.setTargetAtTime(mg, t, 0.06);
            var f = (48 + revs * 44) * (0.35 + 0.65 * ts);
            audio.o1.frequency.setTargetAtTime(f, t, 0.06);
            audio.o2.frequency.setTargetAtTime(f * 2.02, t, 0.06);
            // vattenfräs — följer utslungningstakten, tystnar när svampen är torr
            var sg = active ? Math.min(0.4, emitRateSm / 260) : 0;
            audio.sprayGain.gain.setTargetAtTime(sg, t, 0.08);
            audio.spraySrc.playbackRate.setTargetAtTime(ts < 1 ? 0.5 : 1, t, 0.1);
        }

        // ── Droppar ───────────────────────────────────────────────────────
        function spawnDrop(th) {
            if (particles.length >= MAX_P) return;
            // droppen lämnar korgväggen någonstans längs svampens bredd
            var a = th + (Math.random() - 0.5) * SVAMP_ARC;
            var x = CX + R_WALL * Math.cos(a);
            var y = CY + R_WALL * Math.sin(a);
            // KÄRNFYSIKEN: droppen ärver svampens tangentiella hastighet
            // (ω·r vinkelrätt mot radien) + en liten radiell läckfart.
            var vtx = -Math.sin(a) * omega * R_WALL;
            var vty = Math.cos(a) * omega * R_WALL;
            var leak = 25 + 80 * Math.random() * Math.random();
            particles.push({
                x: x, y: y, px: x, py: y,
                vx: vtx + Math.cos(a) * leak + (Math.random() - 0.5) * 30,
                vy: vty + Math.sin(a) * leak + (Math.random() - 0.5) * 30,
                age: 0, life: 1.6,
                w: 1.1 + Math.random() * 1.1
            });
        }

        function emit(dt, thPrev) {
            if (wet <= 0) return 0;
            // vattnet pressas ut först när rotationen övervinner svampens
            // förmåga att hålla kvar det — takten växer med varvtalet
            var excess = Math.max(0, Math.abs(omega) - OMEGA_MIN);
            var rate = excess * 7 * (0.3 + 0.7 * wet);
            if (rate <= 0) return 0;
            emitAcc += rate * dt;
            var n = Math.floor(emitAcc);
            emitAcc -= n;
            for (var i = 0; i < n; i++) {
                // fördela emissionen längs bågen som svampen svepte under
                // frame:en, så duschen blir jämn även vid hög fart
                var f = Math.random();
                spawnDrop(thPrev + (theta - thPrev) * f);
            }
            wet = Math.max(0, wet - rate * dt / VATTEN_TOT);
            if (wet === 0) syncUi();
            return rate;
        }

        function stepParticles(dt) {
            var kd = Math.exp(-DRAG * dt);
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                p.px = p.x; p.py = p.y;
                p.vx *= kd;
                p.vy *= kd;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.age += dt;
                if (p.age >= p.life ||
                    p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
                    particles.splice(i, 1);
                }
            }
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            // rutnätet — som om simuleringen låg på ett kollegieblock
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function drawBasket() {
            ctx.globalCompositeOperation = 'source-over';
            // korgens botten — ljus metall mot pappret
            var g = ctx.createRadialGradient(CX, CY, 20, CX, CY, R_WALL);
            g.addColorStop(0, '#fdfaf3');
            g.addColorStop(1, '#efe7d5');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(CX, CY, R_WALL, 0, 2 * Math.PI);
            ctx.fill();
            // ekrar som roterar med korgen
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(theta);
            ctx.strokeStyle = '#a8aeb8';
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            for (var k = 0; k < 4; k++) {
                var a = k * Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 18, Math.sin(a) * 18);
                ctx.lineTo(Math.cos(a) * (R_WALL - 5), Math.sin(a) * (R_WALL - 5));
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawWall() {
            // korgväggen ritas EFTER svampen så den ser pressad ut mot väggen
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.arc(CX, CY, R_WALL, 0, 2 * Math.PI);
            ctx.strokeStyle = '#1f2530';
            ctx.lineWidth = 7;
            ctx.stroke();
            // perforeringen (hålen vattnet slungas ut genom) roterar med korgen
            ctx.fillStyle = '#ece3d2';
            for (var k = 0; k < 30; k++) {
                var a = theta + k * 2 * Math.PI / 30;
                ctx.beginPath();
                ctx.arc(CX + R_WALL * Math.cos(a), CY + R_WALL * Math.sin(a),
                        2.1, 0, 2 * Math.PI);
                ctx.fill();
            }
            // navet
            ctx.beginPath();
            ctx.arc(CX, CY, 14, 0, 2 * Math.PI);
            ctx.fillStyle = '#2a3140';
            ctx.fill();
            ctx.strokeStyle = '#1f2530';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(CX, CY, 3.2, 0, 2 * Math.PI);
            ctx.fillStyle = '#dfd6c2';
            ctx.fill();
        }

        function lerpByte(a, b, t) { return Math.round(a + (b - a) * t); }

        function drawSpongeAt(th, alpha) {
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(th);
            ctx.globalAlpha = alpha;
            // torr svamp är blekgul, blöt är mörkare och mättad
            var fill = 'rgb(' + lerpByte(226, 199, wet) + ',' +
                                lerpByte(211, 168, wet) + ',' +
                                lerpByte(148, 74, wet) + ')';
            ctx.fillStyle = fill;
            ctx.strokeStyle = 'rgba(20,16,6,0.55)';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            // rundad rektangel med långsidan tangentiellt (x = radiellt)
            var x0 = R_SVAMP - 20, y0 = -31, w = 40, h = 62, r = 9;
            ctx.moveTo(x0 + r, y0);
            ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
            ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
            ctx.arcTo(x0, y0 + h, x0, y0, r);
            ctx.arcTo(x0, y0, x0 + w, y0, r);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // porer
            ctx.fillStyle = 'rgba(60,48,16,0.4)';
            for (var i = 0; i < pores.length; i++) {
                ctx.beginPath();
                ctx.arc(R_SVAMP + pores[i].r, pores[i].s, pores[i].rad, 0, 2 * Math.PI);
                ctx.fill();
            }
            // blank vattenglans när svampen är blöt
            if (wet > 0.02) {
                ctx.fillStyle = 'rgba(96,156,224,' + (0.26 * wet).toFixed(3) + ')';
                ctx.beginPath();
                ctx.moveTo(x0 + r, y0);
                ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
                ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
                ctx.arcTo(x0, y0 + h, x0, y0, r);
                ctx.arcTo(x0, y0, x0 + w, y0, r);
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        function drawSponge() {
            // Rörelseoskärpa vid hög fart: spökbilder tätt bakåt längs bågen.
            var wVis = Math.abs(omega) * timeScale();
            // svag ring längs svampens bana (tröghet i ögat, som lång exponering)
            var ring = Math.min(0.12, wVis / 200);
            if (ring > 0.015) {
                ctx.strokeStyle = 'rgba(170,132,40,' + ring.toFixed(3) + ')';
                ctx.lineWidth = 42;
                ctx.beginPath();
                ctx.arc(CX, CY, R_SVAMP, 0, 2 * Math.PI);
                ctx.stroke();
            }
            var n = Math.min(9, Math.floor(wVis / 3));
            var stepA = Math.sign(omega) * wVis * 0.0045;
            for (var i = n; i >= 1; i--) {
                drawSpongeAt(theta - stepA * i, 0.07);
            }
            drawSpongeAt(theta, 1);
        }

        function drawParticles() {
            // mörkblå droppar mot ljust papper — ingen additiv blending
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineCap = 'round';
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var t = p.age / p.life;
                var a = (1 - t) * 0.9;
                ctx.strokeStyle = 'rgba(43,105,180,' + a.toFixed(3) + ')';
                ctx.lineWidth = p.w;
                ctx.beginPath();
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                if (t < 0.5) {
                    ctx.fillStyle = 'rgba(21,70,135,' + (0.75 * (1 - t)).toFixed(3) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.w * 0.85, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }

        function render() {
            drawBackground();
            drawBasket();
            drawSponge();
            drawWall();
            drawParticles();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            var thPrev = theta;
            // centrifugen: mjuk uppspolning / utrullning mot glidarens mål
            var target = spinOn ? targetOmega() : 0;
            var k = spinOn ? 2.6 : 1.4;
            omega += (target - omega) * Math.min(1, k * dt);
            if (!spinOn && Math.abs(omega) < 0.02) omega = 0;
            theta += omega * dt;

            var rate = emit(dt, thPrev);
            emitRateSm += (rate - emitRateSm) * Math.min(1, 6 * dt);
            stepParticles(dt);
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            updateAudio();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return Math.abs(omega) > 0.02 || particles.length > 0;
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            info.textContent = 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) +
                ' varv/s · Vatten: ' + Math.round(wet * 100) + ' %';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            blotBtn.disabled = wet > 0.95;
            startBtn.textContent = spinOn ? 'Stoppa centrifugen' : 'Starta centrifugen';
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
        }

        blotBtn.addEventListener('click', function () {
            wet = 1;
            paused = false;
            resumeAudio();
            syncUi();
            render();
            updateInfo();
            kick();
        });
        startBtn.addEventListener('click', function () {
            spinOn = !spinOn;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            updateAudio();  // tysta direkt vid paus
            if (!paused) kick();
            else render();  // frys exakt den bild som visas
        });
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
            updateAudio();
        });
        slowCb.addEventListener('change', kick);
        slider.addEventListener('input', function () {
            syncSliderVal();
            kick();
        });

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                updateAudio();
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            updateAudio();
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-skriptet i .shots/)
        card._audioState = function () { return audio ? audio.ctx.state : 'none'; };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: fjaderpendel
    // ══════════════════════════════════════════════════════════════════════
    function buildFjaderpendel(node, cfg) {
        var W = 560, H = 430;           // logisk ritstorlek
        var CX = 312;                   // fjäderns/viktens x-läge
        var CEIL_Y = 34;                // takets underkant
        var EQ_Y = 248;                 // viktens mittpunkt i jämviktsläget
        var Y_MAX = 92;                 // största tillåtna elongation (px)
        var PX_PER_CM = 12;             // skala för avläsningen (px per cm)
        var MASS_W = 38, MASS_H = 34;   // viktens mått
        var T_PERIOD = 2.2;             // svängningstid (s)
        var OMEGA = 2 * Math.PI / T_PERIOD;
        var A_DEFAULT = 66;             // "Dra ner och släpp"-amplitud (px)
        var L_VEC = 84;                 // pillängd vid maximal storhet (px)
        var COL_V = '#2563c9';          // hastighetens färg (som teorifiguren)
        var COL_A = '#c0392b';          // accelerationens färg (som teorifiguren)
        var INK = '#1f2530';

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En vikt som hänger i en spiralfjäder från taket. Dra i vikten och ' +
            'släpp så pendlar den kring jämviktsläget. Kryssrutor visar ' +
            'hastighetsvektorn och accelerationsvektorn: farten är störst i ' +
            'jämviktsläget och noll i vändlägena, accelerationen är störst i ' +
            'vändlägena, noll i jämviktsläget och alltid riktad mot jämviktsläget.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var slappBtn = document.createElement('button');
        slappBtn.type = 'button';
        slappBtn.className = 'minisim-btn ms-primar';
        slappBtn.textContent = 'Dra ner och släpp';

        var stoppBtn = document.createElement('button');
        stoppBtn.type = 'button';
        stoppBtn.className = 'minisim-btn';
        stoppBtn.textContent = 'Nollställ';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(slappBtn);
        controls.appendChild(stoppBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // Rad 2: visningsval (vektorer) + ultrarapid.
        var toggles = document.createElement('div');
        toggles.className = 'minisim-controls';

        function makeCheck(text, checked, accent) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = checked;
            if (accent) cb.style.accentColor = accent;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(text));
            return { lbl: lbl, cb: cb };
        }
        var vChk = makeCheck('Visa hastighet', true, COL_V);
        var aChk = makeCheck('Visa acceleration', true, COL_A);
        var slowChk = makeCheck('Ultrarapid', false, null);

        toggles.appendChild(vChk.lbl);
        toggles.appendChild(aChk.lbl);
        toggles.appendChild(slowChk.lbl);
        card.appendChild(toggles);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisims) ────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        // Elongationen y räknas POSITIV UPPÅT från jämviktsläget (som i
        // genomgången); skärmens y-axel pekar nedåt, så skärmläget är
        // EQ_Y - y. Svängningen beräknas analytiskt (y = A·cos φ) så att
        // amplituden aldrig driver.
        var mode = 'rest';          // 'rest' | 'drag' | 'svang'
        var A = 0;                  // amplitud (px)
        var ph = 0;                 // fas (rad)
        var yDrag = 0;              // elongation under pågående drag
        var paused = false;
        var dragging = false;
        var dragPtr = -1;
        var dragOffset = 0;         // greppunktens avstånd från viktens mitt
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowChk.cb.checked ? 0.25 : 1; }
        function elong() {
            if (mode === 'drag') return yDrag;
            if (mode === 'svang') return A * Math.cos(ph);
            return 0;
        }
        function veloc() {
            return mode === 'svang' ? -A * OMEGA * Math.sin(ph) : 0;
        }
        function accel() { return -OMEGA * OMEGA * elong(); }
        function massCY() { return EQ_Y - elong(); }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        // Text med blandad stil: parts = [{ t: '+', it: false }, ...].
        // align: 'left' | 'right' (mot angivet x).
        function drawMixed(x, y, parts, align, size, color) {
            var widths = [], total = 0, i;
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + size + 'px ' + FONT;
                widths[i] = ctx.measureText(parts[i].t).width;
                total += widths[i];
            }
            var cx = align === 'right' ? x - total : x;
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + size + 'px ' + FONT;
                ctx.fillText(parts[i].t, cx, y);
                cx += widths[i];
            }
        }

        function drawCeiling() {
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(150, CEIL_Y);
            ctx.lineTo(475, CEIL_Y);
            ctx.stroke();
            // snedstreck ovanför taket (fast yta)
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var x = 160; x <= 475; x += 15) {
                ctx.moveTo(x, CEIL_Y);
                ctx.lineTo(x - 9, CEIL_Y - 9);
            }
            ctx.stroke();
        }

        function drawGuides() {
            var yTop = null, yBot = null;
            if (mode === 'svang' && A > 0) { yTop = EQ_Y - A; yBot = EQ_Y + A; }
            if (mode === 'drag' && Math.abs(yDrag) > 4) {
                yTop = EQ_Y - Math.abs(yDrag);
                yBot = EQ_Y + Math.abs(yDrag);
            }
            // jämviktsläget y = 0 — heldragen
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(160, EQ_Y);
            ctx.lineTo(452, EQ_Y);
            ctx.stroke();
            drawMixed(152, EQ_Y + 4,
                [{ t: 'y', it: true }, { t: ' = 0', it: false }],
                'right', 14, INK);
            // vändlägena ±A — streckade
            if (yTop !== null) {
                ctx.strokeStyle = '#9aa0a6';
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 4]);
                ctx.beginPath();
                ctx.moveTo(160, yTop);
                ctx.lineTo(452, yTop);
                ctx.moveTo(160, yBot);
                ctx.lineTo(452, yBot);
                ctx.stroke();
                ctx.setLineDash([]);
                drawMixed(152, yTop + 4,
                    [{ t: '+', it: false }, { t: 'A', it: true }],
                    'right', 14, INK);
                drawMixed(152, yBot + 4,
                    [{ t: '−', it: false }, { t: 'A', it: true }],
                    'right', 14, INK);
            }
        }

        function drawSpring() {
            var massTop = massCY() - MASS_H / 2;
            var y0 = CEIL_Y, y1 = massTop;
            var N = 13;                       // antal sicksack-ben
            var lead = 7;                     // raka ändbitar
            var span = (y1 - lead) - (y0 + lead);
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.beginPath();
            ctx.moveTo(CX, y0);
            ctx.lineTo(CX, y0 + lead);
            for (var i = 1; i <= N; i++) {
                var xx = (i === N) ? CX : (i % 2 ? CX + 9 : CX - 9);
                ctx.lineTo(xx, y0 + lead + span * i / N);
            }
            ctx.lineTo(CX, y1);
            ctx.stroke();
        }

        function drawMass() {
            var cy = massCY();
            var x0 = CX - MASS_W / 2, y0 = cy - MASS_H / 2, r = 4;
            ctx.beginPath();
            ctx.moveTo(x0 + r, y0);
            ctx.arcTo(x0 + MASS_W, y0, x0 + MASS_W, y0 + MASS_H, r);
            ctx.arcTo(x0 + MASS_W, y0 + MASS_H, x0, y0 + MASS_H, r);
            ctx.arcTo(x0, y0 + MASS_H, x0, y0, r);
            ctx.arcTo(x0, y0, x0 + MASS_W, y0, r);
            ctx.closePath();
            ctx.fillStyle = '#6ba3d6';
            ctx.fill();
            ctx.strokeStyle = '#2f6db0';
            ctx.lineWidth = 1.6;
            ctx.stroke();
        }

        // Lodrät vektorpil: skaftet slutar vid pilhuvudets bas (linecap
        // butt), spets i änden. sgn > 0 = uppåt (skärmens -y).
        function drawVector(x, yTail, len, sgn, color, letter, labelSide) {
            if (len < 6) return;
            var yTip = yTail - sgn * len;
            var head = Math.max(9, Math.min(14, len * 0.5));
            var yBase = yTip + sgn * head;
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x, yTail);
            ctx.lineTo(x, yBase);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, yTip);
            ctx.lineTo(x - 5.5, yBase);
            ctx.lineTo(x + 5.5, yBase);
            ctx.closePath();
            ctx.fill();
            // etikett vid spetsen, ut från vikten i fri yta
            var ly = yTip + (sgn > 0 ? -6 : 16);
            drawMixed(labelSide === 'left' ? x - 10 : x + 10, ly,
                [{ t: letter, it: true }],
                labelSide === 'left' ? 'right' : 'left', 16, color);
        }

        function drawVectors() {
            var cy = massCY();
            var v = veloc(), a = accel();
            // skalenligt: pillängd ∝ belopp, samma referens (full
            // elongation Y_MAX) för båda storheterna
            if (vChk.cb.checked && mode === 'svang') {
                var Lv = Math.abs(v) / (OMEGA * Y_MAX) * L_VEC;
                var sv = v > 0 ? 1 : -1;
                // hastighetspilen startar vid viktens KANT i pilens riktning
                var tailV = cy - sv * MASS_H / 2;
                drawVector(CX - 11, tailV, Lv, sv, COL_V, 'v', 'left');
            }
            if (aChk.cb.checked && (mode === 'svang' || mode === 'drag')) {
                var La = Math.abs(a) / (OMEGA * OMEGA * Y_MAX) * L_VEC;
                var sa = a > 0 ? 1 : -1;
                var tailA = cy - sa * MASS_H / 2;
                drawVector(CX + 11, tailA, La, sa, COL_A, 'a', 'right');
            }
        }

        function render() {
            ctx.globalCompositeOperation = 'source-over';
            drawBackground();
            drawGuides();
            drawCeiling();
            drawSpring();
            drawMass();
            drawVectors();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            if (mode === 'svang') {
                ph += OMEGA * dt;
                if (ph > 2 * Math.PI) ph -= 2 * Math.PI;
            }
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return mode === 'svang';
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            var cm = elong() / PX_PER_CM;
            var s = fmt(Math.abs(cm), 1);
            var sign = s === '0' ? '' : (cm > 0 ? '+' : '−');
            info.textContent = 'Elongation: ' + sign + s + ' cm';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
            pausBtn.disabled = mode !== 'svang';
            stoppBtn.disabled = mode === 'rest';
        }

        slappBtn.addEventListener('click', function () {
            mode = 'svang';
            A = A_DEFAULT;
            ph = Math.PI;      // startar i nedre vändläget (y = −A, v = 0)
            paused = false;
            syncUi();
            kick();
        });
        stoppBtn.addEventListener('click', function () {
            mode = 'rest';
            A = 0;
            paused = false;
            syncUi();
            render();
            updateInfo();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            if (!paused) kick();
            else render();      // frys exakt den bild som visas
        });
        vChk.cb.addEventListener('change', function () { render(); });
        aChk.cb.addEventListener('change', function () { render(); });
        slowChk.cb.addEventListener('change', kick);

        // ── Dra i vikten (pekare/touch/mus) ───────────────────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function overMass(p) {
            return Math.abs(p.x - CX) < MASS_W / 2 + 16 &&
                   Math.abs(p.y - massCY()) < MASS_H / 2 + 16;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overMass(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            dragOffset = p.y - massCY();
            yDrag = elong();
            mode = 'drag';
            paused = false;
            A = 0;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            syncUi();
            render();
            updateInfo();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overMass(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            var y = EQ_Y - (p.y - dragOffset);   // elongation, positiv uppåt
            yDrag = Math.max(-Y_MAX, Math.min(Y_MAX, y));
            render();
            updateInfo();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
            if (Math.abs(yDrag) < 4) {
                mode = 'rest';
                A = 0;
            } else {
                A = Math.abs(yDrag);
                ph = yDrag > 0 ? 0 : Math.PI;    // släpps i vila (v = 0)
                mode = 'svang';
            }
            syncUi();
            render();
            updateInfo();
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-/skärmdumpsskript i .shots/):
        // frys svängningen i ett exakt fasläge.
        card._setPhase = function (newA, newPh) {
            mode = 'svang';
            A = newA;
            ph = newPh;
            paused = true;
            syncUi();
            render();
            updateInfo();
        };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: skiftnyckel
    //  Mini-varianten av fysik2-skiftnyckel-app.html: en skiftnyckel greppar
    //  en trög mutter, kraften F angriper skaftet och kan vridas ett helt
    //  varv genom att dra i pilspetsen. Hävarmen (det vinkelräta avståndet
    //  från vridningspunkten till kraftens riktningslinje) och kraftmomentet
    //  M = F · l uppdateras i realtid. Statisk scen — ritas om vid drag,
    //  ingen rAF-loop behövs.
    // ══════════════════════════════════════════════════════════════════════
    function buildSkiftnyckel(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var P = { x: 140, y: 205 };        // vridningspunkten (mutterns mitt)
        var S = 1.6, ROT = -10;            // grafikens skala/vridning (som stora simmen)
        var HANDLE_DEG = 12;               // skaftets riktning (22° i grafiken + ROT)
        var RAD = Math.PI / 180;
        var U = { x: Math.cos(HANDLE_DEG * RAD), y: Math.sin(HANDLE_DEG * RAD) };
        var D = 0.25;                      // kraftens angreppspunkt (m från muttern)
        var PXM = 860;                     // px per meter (0,40 m ≈ 344 px längs skaftet)
        var F_N = 34;                      // kraftens storlek (N) — fast i minisimmen
        var L_ARROW = 92;                  // kraftpilens längd (px)
        var G = { x: P.x + D * PXM * U.x, y: P.y + D * PXM * U.y };
        var COL_F = '#2563c9', COL_ARM = '#0d9488', INK = '#1f2530';

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En skiftnyckel greppar en mutter. Vridningspunkten i mutterns mitt ' +
            'är markerad med en röd prick. Kraften F angriper skaftet och kan ' +
            'vridas ett helt varv genom att dra i pilspetsen. Kraftens streckade ' +
            'riktningslinje och hävarmen — det vinkelräta avståndet från ' +
            'vridningspunkten till riktningslinjen — ritas om i realtid, och ' +
            'kraftmomentet M lika med F gånger l visas med rotationsriktning.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisimmar) ──────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var alpha = 65;                    // vinkel mot skaftet (grader, 0–360, moturs)
        var dragging = false, dragPtr = -1;

        function forceDir() {
            var c = Math.cos(alpha * RAD), s = Math.sin(alpha * RAD);
            return { x: U.x * c + U.y * s, y: -U.x * s + U.y * c };
        }

        // ── Skiftnyckelgrafiken — samma paths som teorifigurerna ──────────
        var PATH_HEX = new Path2D('M95.9 104.1 L82.7 114.8 L66.8 108.7 L64.1 91.9 L77.3 81.2 L93.2 87.3 Z');
        var PATH_BODY = new Path2D('M 62.8,75.9 Q 62.3,73 64.1,71 Q 78.5,68.5 103.2,71 Q 113.4,72.3 118,77.2 Q 130,90.4 130.3,106.6 Q 131,107.5 132.8,108.3 L 283,169 A 6.5 6.5 0 0 1 278.4,181.1 L 126.1,125.7 Q 120.3,124.2 114.8,127.4 L 108.1,142 Q 105.6,148.5 98.1,145.7 L 89.7,142.4 Q 84.1,140.3 86.3,134.7 L 102.9,91.3 L 62.8,75.9 Z');
        var PATH_WORM = new Path2D('M 93.4,129.9 L 102.8,133.5 Q 106.1,134.8 104.8,138 L 103.5,141.3 Q 102.3,144.6 99,143.3 L 89.7,139.7 Q 86.4,138.5 87.7,135.2 L 88.9,132 Q 90.2,128.7 93.4,129.9 Z');
        var PATH_JAW = new Path2D('M 52.4,102.9 L 95.3,119.4 L 89.8,133.9 Q 88.5,137.2 85,135.3 Q 65.3,125 53.4,108.7 Q 50.9,105.6 52.4,102.9 Z');
        var WORM_LINES = [[94.8, 131.5, 91.7, 139.5], [97.6, 132.6, 94.5, 140.5],
                          [100.4, 133.7, 97.3, 141.6], [103.2, 134.7, 100.1, 142.7]];

        function drawWrench() {
            ctx.save();
            ctx.translate(P.x, P.y);
            ctx.scale(S, S);
            ctx.rotate(ROT * RAD);
            ctx.translate(-80, -98);
            ctx.lineJoin = 'round';
            ctx.fillStyle = '#cfd4da';
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 1.4;
            ctx.fill(PATH_HEX);
            ctx.stroke(PATH_HEX);
            ctx.fillStyle = '#b3b9c1';
            ctx.strokeStyle = '#6b7178';
            ctx.fill(PATH_BODY);
            ctx.stroke(PATH_BODY);
            ctx.fillStyle = '#969ea7';
            ctx.strokeStyle = '#666c74';
            ctx.lineWidth = 1.3;
            ctx.fill(PATH_WORM);
            ctx.stroke(PATH_WORM);
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            for (var i = 0; i < WORM_LINES.length; i++) {
                ctx.moveTo(WORM_LINES[i][0], WORM_LINES[i][1]);
                ctx.lineTo(WORM_LINES[i][2], WORM_LINES[i][3]);
            }
            ctx.stroke();
            ctx.fillStyle = '#a6adb5';
            ctx.strokeStyle = '#6b7178';
            ctx.lineWidth = 1.4;
            ctx.fill(PATH_JAW);
            ctx.stroke(PATH_JAW);
            ctx.restore();
        }

        // ── Ritverktyg ────────────────────────────────────────────────────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
            for (var y = 26; y < H; y += 26) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
            ctx.stroke();
        }

        function arrow(x1, y1, x2, y2, color, width, head, dash) {
            var ang = Math.atan2(y2 - y1, x2 - x1);
            var len = Math.hypot(x2 - x1, y2 - y1);
            if (len < 1) return;
            var h = Math.max(8, Math.min(head, len * 0.9));
            var bx = x2 - h * 0.82 * Math.cos(ang);
            var by = y2 - h * 0.82 * Math.sin(ang);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.lineCap = 'butt';
            ctx.setLineDash(dash || []);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(bx, by);
            ctx.stroke();
            ctx.setLineDash([]);
            var hw = 0.42;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - h * Math.cos(ang - hw), y2 - h * Math.sin(ang - hw));
            ctx.lineTo(x2 - h * Math.cos(ang + hw), y2 - h * Math.sin(ang + hw));
            ctx.closePath();
            ctx.fill();
        }

        // text i delar — kursiva variabler, rak omgivande text (Poppins)
        function drawParts(parts, x, y, size, color, align) {
            var widths = [], total = 0, i;
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].i ? 'italic ' : '') + '600 ' + size + 'px Poppins, sans-serif';
                widths[i] = ctx.measureText(parts[i].t).width;
                total += widths[i];
            }
            var cx = align === 'center' ? x - total / 2 : (align === 'right' ? x - total : x);
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].i ? 'italic ' : '') + '600 ' + size + 'px Poppins, sans-serif';
                ctx.fillText(parts[i].t, cx, y);
                cx += widths[i];
            }
        }

        function tipPos() {
            var f = forceDir();
            return { x: G.x + L_ARROW * f.x, y: G.y + L_ARROW * f.y };
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function render() {
            var f = forceDir();
            var sinA = Math.sin(alpha * RAD);
            var l = D * Math.abs(sinA);
            var M = F_N * l;
            var medurs = sinA < -1e-9;
            var moturs = sinA > 1e-9;
            var tip = tipPos();

            drawBackground();
            drawWrench();

            // rotationsbåge kring muttern — pilspetsen i rörelsens riktning
            var rot0 = -78 * RAD, rot1 = -192 * RAD, rR = 46;
            ctx.save();
            ctx.globalAlpha = (moturs || medurs) ? 0.85 : 0.3;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2.2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.arc(P.x, P.y, rR, rot1, rot0);   // canvas ritar medurs rot1→rot0
            ctx.stroke();
            var endAng = medurs ? rot0 : rot1;
            var sgn = medurs ? -1 : 1;
            var ex = P.x + rR * Math.cos(endAng), ey = P.y + rR * Math.sin(endAng);
            var vx = sgn * Math.sin(endAng), vy = -sgn * Math.cos(endAng);
            ctx.fillStyle = INK;
            ctx.beginPath();
            ctx.moveTo(ex + vx * 10, ey + vy * 10);
            ctx.lineTo(ex - vy * 5, ey + vx * 5);
            ctx.lineTo(ex + vy * 5, ey - vx * 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // vridningspunkten — röd prick + etikett i fri yta
            ctx.strokeStyle = 'rgba(31,37,48,0.7)';
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(P.x - 34, P.y - 66);
            ctx.lineTo(P.x - 7, P.y - 13);
            ctx.stroke();
            ctx.fillStyle = '#d13b2e';
            ctx.beginPath();
            ctx.arc(P.x, P.y, 4.4, 0, 2 * Math.PI);
            ctx.fill();
            drawParts([{ t: 'Vridningspunkt' }], P.x - 38, P.y - 74, 13, INK, 'center');

            // kraftens riktningslinje + hävarmen
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.strokeStyle = COL_F;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([8, 5]);
            ctx.beginPath();
            ctx.moveTo(G.x - 700 * f.x, G.y - 700 * f.y);
            ctx.lineTo(G.x + 700 * f.x, G.y + 700 * f.y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            var lpx = l * PXM;
            if (lpx > 7) {
                // fotpunkten: vinkelrät projektion av P på riktningslinjen
                var tproj = -(D * PXM) * (U.x * f.x + U.y * f.y);
                var foot = { x: G.x + tproj * f.x, y: G.y + tproj * f.y };
                var m = { x: (P.x - foot.x) / lpx, y: (P.y - foot.y) / lpx };
                arrow(P.x, P.y, foot.x, foot.y, COL_ARM, 2.4, 9, [7, 5]);
                arrow(foot.x, foot.y, P.x, P.y, COL_ARM, 2.4, 9, [7, 5]);
                // rät vinkel vid fotpunkten
                ctx.strokeStyle = INK;
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(foot.x + 8 * m.x, foot.y + 8 * m.y);
                ctx.lineTo(foot.x + 8 * m.x + 8 * f.x, foot.y + 8 * m.y + 8 * f.y);
                ctx.lineTo(foot.x + 8 * f.x, foot.y + 8 * f.y);
                ctx.stroke();
                // etikettens plats: strax bortom fotpunkten; nära 90°/270° ligger
                // hävarmen längs skaftet — då i stället vid mitten, på motsatt
                // sida mot kraften. Hamnar bortom-fot-läget nära pilspetsen
                // eller angreppspunkten flyttas etiketten också till mittläget.
                var n = { x: m.y, y: -m.x };
                var uDot = n.x * U.x + n.y * U.y;
                var lx = foot.x - 44 * m.x, ly = foot.y - 44 * m.y;
                var nearArrow = Math.hypot(lx - tip.x, ly - tip.y) < 64 ||
                                Math.hypot(lx - G.x, ly - G.y) < 44;
                if (Math.abs(uDot) < 0.2 || nearArrow) {
                    var n2 = { x: m.y, y: -m.x };
                    if (Math.abs(uDot) < 0.2) {
                        // motsatt kraftens sida (fri yta ovan/under skaftet)
                        if (n2.x * f.x + n2.y * f.y > 0) n2 = { x: -n2.x, y: -n2.y };
                    } else {
                        // kraftens sida — bort från skaftet
                        if (n2.x * f.x + n2.y * f.y < 0) n2 = { x: -n2.x, y: -n2.y };
                    }
                    lx = P.x + 0.55 * (foot.x - P.x) + 32 * n2.x;
                    ly = P.y + 0.55 * (foot.y - P.y) + 32 * n2.y;
                }
                drawParts([{ t: 'Hävarm ' }, { t: 'l', i: true }, { t: ' = ' + fmt(l, 2) + ' m' }],
                          lx, ly + 4, 13, COL_ARM, 'center');
            } else {
                drawParts([{ t: 'Hävarm ' }, { t: 'l', i: true },
                           { t: ' = 0 — riktningslinjen går genom vridningspunkten' }],
                          P.x + 24, P.y + 112, 12.5, COL_ARM, 'left');
            }

            // kraften F med draghandtag i spetsen
            arrow(G.x, G.y, tip.x, tip.y, COL_F, 5, 16);
            ctx.fillStyle = COL_F;
            ctx.beginPath();
            ctx.arc(G.x, G.y, 4.6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = 'rgba(37,99,201,0.13)';
            ctx.strokeStyle = COL_F;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 11, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            // F-etikett strax bortom spetsen, vinkelrätt ut från riktningslinjen
            var away = { x: tip.x - P.x, y: tip.y - P.y };
            var perp = { x: f.y, y: -f.x };
            var aDot = perp.x * away.x + perp.y * away.y;
            if (Math.abs(aDot) < 8) { if (perp.y > 0) perp = { x: -perp.x, y: -perp.y }; }
            else if (aDot < 0) perp = { x: -perp.x, y: -perp.y };
            var po = Math.abs(aDot) < 8 ? 30 : 15;
            drawParts([{ t: 'F', i: true }, { t: ' = ' + fmt(F_N, 0) + ' N' }],
                      tip.x + 24 * f.x + po * perp.x, tip.y + 24 * f.y + po * perp.y + 4,
                      13.5, COL_F, perp.x >= 0 ? 'left' : 'right');

            // avläsning överst + ledtråd nederst
            var riktn = moturs ? ' (moturs)' : medurs ? ' (medurs)' : '';
            drawParts([{ t: 'M', i: true }, { t: ' = ' }, { t: 'F', i: true }, { t: ' · ' },
                       { t: 'l', i: true },
                       { t: ' = ' + fmt(F_N, 0) + ' · ' + fmt(l, 2) + ' = ' + fmt(M, 1) + ' Nm' + riktn }],
                      W / 2, 28, 15, INK, 'center');
            ctx.font = '500 12px Poppins, sans-serif';
            ctx.fillStyle = '#6a7180';
            ctx.textAlign = 'left';
            ctx.fillText('Dra i pilspetsen och vrid kraften — hela varvet runt.', 12, H - 12);
        }

        // ── Drag i pilspetsen ─────────────────────────────────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) * W / r.width,
                     y: (e.clientY - r.top) * H / r.height };
        }
        function overTip(p) {
            var tip = tipPos();
            return Math.hypot(p.x - tip.x, p.y - tip.y) < 26;
        }
        function setAlphaFrom(p) {
            var a = HANDLE_DEG - Math.atan2(p.y - G.y, p.x - G.x) / RAD;
            alpha = ((a % 360) + 360) % 360;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overTip(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            setAlphaFrom(p);
            render();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overTip(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            setAlphaFrom(p);
            render();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            render();
        });

        // Poppins kan laddas efter första render — rita om när fonterna är klara.
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            document.fonts.ready.then(function () { render(); });
        }

        // Test-handtag för skärmdumpsskript: ställ vinkeln exakt.
        card._setAlpha = function (a) { alpha = ((a % 360) + 360) % 360; render(); };

        render();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: valtning
    // ══════════════════════════════════════════════════════════════════════
    // Demonstrationen ur fy2-1.2 (Tyngdpunkt/vältning): en kloss står på en
    // planka som kan lutas med en glidare. I klossens tyngdpunkt (grön
    // prick) sitter en metallvisare som alltid hänger lodrätt och visar
    // tyngdkraftens riktning. Klossens stödyta är markerad lila på plankan.
    // Så länge visaren träffar plankan innanför stödytan står klossen
    // stabilt — när lutningen blir så stor att visaren passerar utanför
    // vridningspunkten (klossens nedre hörn) välter klossen kring hörnet.
    // Två klossformer: hög/smal (välter tidigt) och låg/bred (står kvar
    // ända upp till glidarens max). Ritad i laboranstemat.
    function buildValtning(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var HX = 105, HY = 344;            // gångjärnet (plankans vridpunkt)
        var LEN = 370;                     // plankans längd (px)
        var PLANK_T = 10;                  // plankans tjocklek (px)
        var GROUND_Y = HY + PLANK_T;       // marklinjen (plankan vilar på den)
        var S0 = 170;                      // klossens nedre (vänstra) hörn längs plankan
        var TILT_MAX = 45;                 // glidarens maxlutning (grader)
        var TILT_RATE = 16;                // plankans vridfart mot målet (grader/s)
        var GPX = 1500;                    // "g" i px/s² för vältdynamiken
        var RAD = Math.PI / 180;
        var INK = '#1f2530';
        var COL_STOD = '#8b5cf6';          // stödytan (som teorifigurerna)
        var COL_TP = '#2e9e4f';            // tyngdpunkten (grön, som figurerna)
        var SHAPES = {
            hog: { b: 64, h: 150 },        // hög/smal — välter vid ≈23°
            lag: { b: 120, h: 64 }         // låg/bred — välter först vid ≈62°
        };

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En kloss står på en planka som kan lutas med en glidare. I ' +
            'klossens tyngdpunkt sitter en metallvisare som alltid hänger ' +
            'lodrätt och visar tyngdkraftens riktning. Klossens stödyta är ' +
            'markerad på plankan. När lutningen blir så stor att visaren ' +
            'passerar utanför klossens nedre hörn välter klossen kring ' +
            'hörnet. En hög smal kloss välter tidigt, en låg bred står kvar.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var hogBtn = document.createElement('button');
        hogBtn.type = 'button';
        hogBtn.className = 'minisim-btn ms-primar';
        hogBtn.textContent = 'Hög kloss';

        var lagBtn = document.createElement('button');
        lagBtn.type = 'button';
        lagBtn.className = 'minisim-btn';
        lagBtn.textContent = 'Låg kloss';

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(hogBtn);
        controls.appendChild(lagBtn);
        controls.appendChild(omBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Lutningsglidare
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Lutning';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0';
        slider.max = String(TILT_MAX);
        slider.step = '0.5';
        slider.value = '0';
        slider.setAttribute('aria-label', 'Plankans lutning i grader');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisimmar) ──────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var shape = SHAPES.hog;
        var tiltCur = 0;                   // plankans lutning nu (grader)
        var tiltTarget = 0;                // glidarens mål (grader)
        var mode = 'star';                 // 'star' | 'valter' | 'ligger'
        var phi = 0;                       // vältvinkel kring hörnet (rad)
        var phiVel = 0;                    // vältvinkelns fart (rad/s)
        var tippedAt = 0;                  // lutningen då vältningen började
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function critDeg() { return Math.atan(shape.b / shape.h) / RAD; }
        function timeScale() { return slowCb.checked ? 0.3 : 1; }

        // Tyngdpunktens världsläge. Plankriktning dir=(cosθ,−sinθ),
        // plank-normal (uppåt) perp=(−sinθ,−cosθ); en punkt (s,u) i
        // plankans koordinater (s längs plankan, u vinkelrätt uppåt)
        // ligger i världen på hinge + s·dir + u·perp.
        function cogWorld() {
            var th = tiltCur * RAD;
            var dirX = Math.cos(th), dirY = -Math.sin(th);
            var perpX = -Math.sin(th), perpY = -Math.cos(th);
            // tyngdpunkten relativt vridhörnet (S0,0), CCW-roterad phi
            var xr = shape.b / 2 * Math.cos(phi) - shape.h / 2 * Math.sin(phi);
            var ur = shape.b / 2 * Math.sin(phi) + shape.h / 2 * Math.cos(phi);
            return {
                x: HX + (S0 + xr) * dirX + ur * perpX,
                y: HY + (S0 + xr) * dirY + ur * perpY
            };
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function drawGround() {
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(60, GROUND_Y);
            ctx.lineTo(500, GROUND_Y);
            ctx.stroke();
            // snedstreck under marken (fast yta)
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var x = 70; x <= 500; x += 15) {
                ctx.moveTo(x, GROUND_Y);
                ctx.lineTo(x - 9, GROUND_Y + 9);
            }
            ctx.stroke();
        }

        function drawAngle() {
            if (tiltCur < 3) return;
            var th = tiltCur * RAD;
            // bågen ritas i hörnet där plankans UNDERSIDA möter marken —
            // marklinjen är bågens undre ben, plankans undersida det övre
            var vx = HX + PLANK_T * Math.sin(th);
            var vy = HY + PLANK_T * Math.cos(th);
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(vx, vy, 52, 0, -th, true);
            ctx.stroke();
            // gradtal i fri yta vänster om gångjärnet (kilen är för smal
            // för texten vid små vinklar — aldrig ovanpå plankan/klossen)
            ctx.fillStyle = INK;
            ctx.font = '14px ' + FONT;
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(tiltCur) + '°', HX - 14, GROUND_Y - 6);
        }

        function drawPlankAndBlock() {
            var th = tiltCur * RAD;
            ctx.save();
            ctx.translate(HX, HY);
            ctx.rotate(-th);
            // plankan (ovansidan ligger på y = 0)
            ctx.fillStyle = '#d8c39a';
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.8;
            ctx.fillRect(0, 0, LEN, PLANK_T);
            ctx.strokeRect(0, 0, LEN, PLANK_T);
            // stödytan (lila) — kontaktsträckan mot plankan
            var b0 = S0, b1 = S0 + shape.b;
            if (mode === 'ligger') { b0 = S0 - shape.h; b1 = S0; }
            ctx.strokeStyle = COL_STOD;
            ctx.lineWidth = 5;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(b0, 0);
            ctx.lineTo(b1, 0);
            ctx.stroke();
            // klossen — vrids kring nedre hörnet (S0, 0) när den välter
            ctx.translate(S0, 0);
            ctx.rotate(-phi);
            ctx.fillStyle = '#e8d3ae';
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 2;
            ctx.fillRect(0, -shape.h, shape.b, shape.h);
            ctx.strokeRect(0, -shape.h, shape.b, shape.h);
            // träådring — svaga linjer längs klossens långsida
            ctx.strokeStyle = 'rgba(138,106,58,0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (shape.h >= shape.b) {
                ctx.moveTo(shape.b * 0.32, -shape.h + 8);
                ctx.lineTo(shape.b * 0.26, -8);
                ctx.moveTo(shape.b * 0.68, -shape.h + 10);
                ctx.lineTo(shape.b * 0.74, -10);
            } else {
                ctx.moveTo(8, -shape.h * 0.36);
                ctx.lineTo(shape.b - 8, -shape.h * 0.30);
                ctx.moveTo(10, -shape.h * 0.70);
                ctx.lineTo(shape.b - 10, -shape.h * 0.74);
            }
            ctx.stroke();
            ctx.restore();
        }

        // Metallvisaren: fritt upphängd i tyngdpunkten, hänger alltid
        // lodrätt och visar tyngdkraftens riktning (pil nedåt).
        function drawPointer() {
            var cog = cogWorld();
            var th = tiltCur * RAD;
            // plankans ovansida rakt under tyngdpunkten
            var footY = HY - (cog.x - HX) * Math.tan(th);
            var endY = Math.min(footY + 24, GROUND_Y - 2);
            var headLen = 9;
            ctx.strokeStyle = '#3a4049';
            ctx.lineWidth = 2.4;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(cog.x, cog.y);
            ctx.lineTo(cog.x, endY - headLen);
            ctx.stroke();
            ctx.fillStyle = '#3a4049';
            ctx.beginPath();
            ctx.moveTo(cog.x, endY);
            ctx.lineTo(cog.x - 4.5, endY - headLen);
            ctx.lineTo(cog.x + 4.5, endY - headLen);
            ctx.closePath();
            ctx.fill();
            // tyngdpunkten (grön prick, som teorifigurerna)
            ctx.fillStyle = COL_TP;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cog.x, cog.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        function render() {
            drawBackground();
            drawGround();
            drawPlankAndBlock();
            drawAngle();
            drawPointer();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            // plankan glider mjukt mot glidarens mål
            if (tiltCur !== tiltTarget) {
                var d = tiltTarget - tiltCur;
                var maxStep = TILT_RATE * dt;
                if (Math.abs(d) <= maxStep) tiltCur = tiltTarget;
                else tiltCur += (d > 0 ? maxStep : -maxStep);
            }
            // vältning: startar när tyngdpunktens lodlinje passerar hörnet
            if (mode === 'star' && tiltCur > critDeg() + 0.05) {
                mode = 'valter';
                phi = 0;
                phiVel = 0;
                tippedAt = tiltCur;
            }
            if (mode === 'valter') {
                // vridning kring hörnet: vinkelaccelerationen växer med
                // tyngdpunktens hävarm kring vridningspunkten
                var r = Math.hypot(shape.b, shape.h) / 2;
                var acc = GPX / r *
                    Math.sin((tiltCur - critDeg()) * RAD + phi);
                phiVel += acc * dt;
                phi += phiVel * dt;
                if (phi >= Math.PI / 2) {
                    phi = Math.PI / 2;
                    phiVel = 0;
                    mode = 'ligger';
                }
            }
        }

        function shouldRun() {
            if (!visible || document.hidden) return false;
            return mode === 'valter' || tiltCur !== tiltTarget;
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            sliderVal.textContent = fmt(tiltTarget, 1) + '°';
            if (mode === 'valter') info.textContent = 'Klossen välter!';
            else if (mode === 'ligger')
                info.textContent = 'Välte vid ' + fmt(tippedAt, 1) + '°';
            else info.textContent = 'Klossen står stabilt';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function setShape(key) {
            shape = SHAPES[key];
            hogBtn.className = 'minisim-btn' + (key === 'hog' ? ' ms-primar' : '');
            lagBtn.className = 'minisim-btn' + (key === 'lag' ? ' ms-primar' : '');
            mode = 'star';
            phi = 0;
            phiVel = 0;
            render();
            updateInfo();
            kick();
        }
        hogBtn.addEventListener('click', function () { setShape('hog'); });
        lagBtn.addEventListener('click', function () { setShape('lag'); });
        omBtn.addEventListener('click', function () {
            mode = 'star';
            phi = 0;
            phiVel = 0;
            tiltTarget = 0;
            slider.value = '0';
            render();
            updateInfo();
            kick();
        });
        slider.addEventListener('input', function () {
            tiltTarget = parseFloat(slider.value);
            updateInfo();
            kick();
        });
        slowCb.addEventListener('change', kick);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumpsskript: ställ lutning/vältvinkel exakt.
        card._set = function (tiltDeg, phiDeg, newMode) {
            tiltCur = tiltDeg;
            tiltTarget = tiltDeg;
            slider.value = String(tiltDeg);
            phi = (phiDeg || 0) * RAD;
            if (newMode) mode = newMode;
            if (mode !== 'star') tippedAt = tiltDeg;
            render();
            updateInfo();
        };

        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: linjal
    // ══════════════════════════════════════════════════════════════════════
    function buildLinjal(node, cfg) {
        var W = 560, H = 430;           // logisk ritstorlek
        // Linjalens geometri anges i LINJALENS eget system; på skärmen ritas
        // den förskjuten med offseten xr, eftersom linjalen "åker med" det
        // finger som håller fast medan båda fingrarna förs mot mitten.
        var R_X0 = 100, R_X1 = 460;     // linjalens vänstra/högra ände
        var R_TOP = 238, R_BOT = 264;   // linjalens över-/underkant
        var PX_PER_CM = (R_X1 - R_X0) / 30;   // 30 cm-linjal
        var MID = (R_X0 + R_X1) / 2;    // linjalens mitt (tyngdpunkt utan vikt)
        var X1_START = 124, X2_START = 452;   // fingrarnas startlägen (skärm)
        var FINGER_W = 21;
        var MEET_GAP = FINGER_W + 6;    // fingrarna "möts" vid detta gap
        var MU_S = 0.5, MU_K = 0.3;     // vilo- resp. glidfriktionstal
        var V_FINGER = 30;              // varje fingers fart mot mitten (px/s)
        var M_VIKT = 0.5;               // viktens massa i linjalmassor
        var N_LEN = 120;                // total pillängd för linjalens tyngd
        var COL_N = '#2563c9';          // normalkraftens färg (som teorin)
        var INK = '#1f2530';
        var SKIN = '#ecc19c', SKIN_D = '#b98a5e';

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En linjal vilar vågrätt på två pekfingrar. När fingrarna dras mot ' +
            'varandra glider alltid det finger som är längst från tyngdpunkten, ' +
            'eftersom det bär mindre normalkraft och därmed mindre friktion. ' +
            'Fingrarna turas om att glida och möts till slut precis under ' +
            'linjalens tyngdpunkt.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn ms-primar';
        startBtn.textContent = 'Dra ihop fingrarna';

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // Rad 2: visningsval.
        var toggles = document.createElement('div');
        toggles.className = 'minisim-controls';
        function makeCheck(text, checked, accent) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = checked;
            if (accent) cb.style.accentColor = accent;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(text));
            return { lbl: lbl, cb: cb };
        }
        var nChk = makeCheck('Visa normalkrafterna', true, COL_N);
        var viktChk = makeCheck('Lägg en vikt på linjalen', false, null);
        var tpChk = makeCheck('Visa tyngdpunkten', false, null);
        var slowChk = makeCheck('Ultrarapid', false, null);
        toggles.appendChild(nChk.lbl);
        toggles.appendChild(viktChk.lbl);
        toggles.appendChild(tpChk.lbl);
        toggles.appendChild(slowChk.lbl);
        card.appendChild(toggles);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisims) ────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var mode = 'rest';          // 'rest' | 'kor' | 'klar'
        var x1 = X1_START;          // vänstra fingrets läge (skärm)
        var x2 = X2_START;          // högra fingrets läge (skärm)
        var xr = 0;                 // linjalens förskjutning på skärmen
        var slid = 2;               // vilket finger som GLIDER MOT LINJALEN
        var xw = 380;               // viktens läge (i linjalens system)
        var paused = false;
        var dragging = false;
        var dragPtr = -1;
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowChk.cb.checked ? 0.25 : 1; }
        function viktPa() { return viktChk.cb.checked; }
        // Tyngdpunktens läge i linjalens system: linjalen (massa 1) + ev.
        // vikten (massa M_VIKT).
        function tyngdX() {
            return viktPa() ? (MID + M_VIKT * xw) / (1 + M_VIKT) : MID;
        }
        // …och på skärmen (linjalen är förskjuten xr).
        function tyngdScreenX() { return tyngdX() + xr; }
        // Normalkrafternas andelar av totala tyngden (momentjämvikt kring
        // motstående finger): fingret NÄRMAST tyngdpunkten bär störst andel.
        function frac1() { return (x2 - tyngdScreenX()) / (x2 - x1); }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function rr(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }

        function drawLinjal() {
            // träfärgad skollinjal med cm-gradering
            rr(R_X0, R_TOP, R_X1 - R_X0, R_BOT - R_TOP, 3);
            ctx.fillStyle = '#f0e2b8';
            ctx.fill();
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            for (var cm = 0; cm <= 30; cm++) {
                var x = R_X0 + cm * PX_PER_CM;
                var len = (cm % 5 === 0) ? 9 : 5.5;
                ctx.moveTo(x, R_TOP);
                ctx.lineTo(x, R_TOP + len);
            }
            ctx.stroke();
            ctx.fillStyle = INK;
            ctx.font = '9px ' + FONT;
            ctx.textAlign = 'center';
            for (cm = 5; cm <= 25; cm += 5) {
                ctx.fillText(String(cm), R_X0 + cm * PX_PER_CM, R_BOT - 4);
            }
        }

        function drawVikt() {
            if (!viktPa()) return;
            // mässingsvikt (labbvikt med knopp) stående på linjalen
            rr(xw - 15, R_TOP - 30, 30, 30, 3);
            ctx.fillStyle = '#c8a24a';
            ctx.fill();
            ctx.strokeStyle = '#8a6a2a';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            rr(xw - 5, R_TOP - 39, 10, 9, 2);
            ctx.fillStyle = '#c8a24a';
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = 'rgba(138,106,42,0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(xw - 11, R_TOP - 24);
            ctx.lineTo(xw + 11, R_TOP - 24);
            ctx.stroke();
        }

        function drawTyngdpunkt() {
            if (!(tpChk.cb.checked || mode === 'klar')) return;
            var xc = tyngdScreenX();    // ritas i skärmkoordinater
            // Etiketten läggs i fri yta: ovanför vikten om den är nära, och
            // ovanför varje normalkraftspil vars spets ligger inom textens
            // bredd (annars hamnar texten på pilen när fingrarna närmar sig).
            var yLbl = R_TOP - 22;
            if (viktPa() && Math.abs(xc - (xw + xr)) < 64) yLbl = R_TOP - 54;
            if (nChk.cb.checked) {
                var tot = (1 + (viktPa() ? M_VIKT : 0)) * N_LEN;
                var f1 = frac1();
                var arms = [[x1, f1 * tot], [x2, (1 - f1) * tot]];
                for (var i = 0; i < 2; i++) {
                    if (Math.abs(arms[i][0] - xc) < 46) {
                        yLbl = Math.min(yLbl, R_BOT - arms[i][1] - 16);
                    }
                }
                yLbl = Math.max(14, yLbl);
            }
            ctx.fillStyle = INK;
            ctx.beginPath();
            ctx.arc(xc, (R_TOP + R_BOT) / 2, 2.8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(xc, R_TOP - 2);
            ctx.lineTo(xc, yLbl + 6);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '13px ' + FONT;
            ctx.textAlign = 'center';
            ctx.fillText('Tyngdpunkt', xc, yLbl);
        }

        // En stiliserad fingertopp: rundad kapsel i hudton som bär linjalen
        // underifrån — avsiktligt enkel (ingen hel hand), med en mjuk
        // ljusare kant som ger volym och två små veck vid leden.
        function drawFinger(fx) {
            var tipY = R_BOT;
            var hw = FINGER_W / 2;
            var len = 74;               // kapselns höjd under linjalen
            ctx.fillStyle = SKIN;
            ctx.strokeStyle = SKIN_D;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(fx - hw, tipY + len - hw);
            ctx.lineTo(fx - hw, tipY + hw);
            ctx.quadraticCurveTo(fx - hw, tipY, fx, tipY);
            ctx.quadraticCurveTo(fx + hw, tipY, fx + hw, tipY + hw);
            ctx.lineTo(fx + hw, tipY + len - hw);
            ctx.quadraticCurveTo(fx + hw, tipY + len, fx, tipY + len);
            ctx.quadraticCurveTo(fx - hw, tipY + len, fx - hw, tipY + len - hw);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // mjuk ljusare kant längs ena sidan (volym)
            ctx.strokeStyle = 'rgba(255,240,220,0.7)';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(fx - hw + 4, tipY + len - 14);
            ctx.lineTo(fx - hw + 4, tipY + 12);
            ctx.quadraticCurveTo(fx - hw + 4, tipY + 4.5, fx - 2, tipY + 4);
            ctx.stroke();
            // två små veck vid fingerleden
            ctx.strokeStyle = 'rgba(185,138,94,0.55)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(fx - hw + 4, tipY + 46);
            ctx.quadraticCurveTo(fx, tipY + 49, fx + hw - 4, tipY + 46);
            ctx.moveTo(fx - hw + 4, tipY + 53);
            ctx.quadraticCurveTo(fx, tipY + 56, fx + hw - 4, tipY + 53);
            ctx.stroke();
        }

        // Rörelsestrimmor bakom det glidande fingret (dir = rörelseriktning).
        function drawStreaks(fx, dir) {
            ctx.strokeStyle = 'rgba(31,37,48,0.30)';
            ctx.lineWidth = 1.6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var k = 0; k < 3; k++) {
                var y = R_BOT + 16 + k * 11;
                var x0 = fx - dir * (20 + k * 4);
                ctx.moveTo(x0, y);
                ctx.lineTo(x0 - dir * (14 - k * 3), y);
            }
            ctx.stroke();
        }

        // "F" med N-subscript (normalkraftens beteckning) intill pilspetsen.
        function drawFN(x, y, align, color) {
            ctx.fillStyle = color;
            ctx.font = 'italic 15px ' + FONT;
            var wF = ctx.measureText('F').width;
            var x0 = align === 'right'
                ? x - wF - 7
                : x;
            ctx.textAlign = 'left';
            ctx.fillText('F', x0, y);
            ctx.font = '10px ' + FONT;
            ctx.fillText('N', x0 + wF, y + 3);
        }

        // Skalenlig normalkraftspil: från kontaktytan (fingertoppen) uppåt
        // genom linjalen, längd ∝ N. side: -1 = etikett åt vänster.
        function drawNormal(x, len, side) {
            len = Math.max(10, len);
            var yTail = R_BOT, yTip = yTail - len;
            var head = Math.max(9, Math.min(14, len * 0.5));
            var yBase = yTip + head;
            ctx.strokeStyle = COL_N;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x, yTail);
            ctx.lineTo(x, yBase);
            ctx.stroke();
            ctx.fillStyle = COL_N;
            ctx.beginPath();
            ctx.moveTo(x, yTip);
            ctx.lineTo(x - 5.5, yBase);
            ctx.lineTo(x + 5.5, yBase);
            ctx.closePath();
            ctx.fill();
            drawFN(x + side * 10, yTip + 12, side < 0 ? 'right' : 'left', COL_N);
        }

        function drawNormals() {
            if (!nChk.cb.checked) return;
            var tot = (1 + (viktPa() ? M_VIKT : 0)) * N_LEN;
            var f1 = frac1();
            drawNormal(x1, f1 * tot, -1);
            drawNormal(x2, (1 - f1) * tot, 1);
        }

        function render() {
            drawBackground();
            drawFinger(x1);
            drawFinger(x2);
            // linjalen (och vikten som står på den) ritas förskjuten xr —
            // den följer med det finger som håller fast
            ctx.save();
            ctx.translate(xr, 0);
            drawLinjal();
            drawVikt();
            ctx.restore();
            drawTyngdpunkt();
            if (mode === 'kor') {
                if (slid === 1) drawStreaks(x1, 1);
                else drawStreaks(x2, -1);
            }
            drawNormals();
        }

        // ── Simulationssteg (stick–slip) ──────────────────────────────────
        // BÅDA fingrarna förs mot mitten med farten V_FINGER — som när man
        // gör försöket själv. Linjalen följer med det finger som håller fast
        // (störst normalkraft → friktionen räcker), medan det andra fingret
        // GLIDER mot linjalen. Glidande finger byts när dess glidfriktion
        // hunnit ikapp det fastnande fingrets vilofriktion:
        // μk·N_glid ≥ μs·N_fast.
        function step(dt) {
            if (mode !== 'kor') return;
            var f1 = frac1(), f2 = 1 - f1;
            if (slid === 1 && MU_K * f1 >= MU_S * f2) slid = 2;
            else if (slid === 2 && MU_K * f2 >= MU_S * f1) slid = 1;
            x1 += V_FINGER * dt;
            x2 -= V_FINGER * dt;
            // linjalen åker med det FASTNANDE fingret (motsatt det glidande)
            xr += (slid === 1 ? -1 : 1) * V_FINGER * dt;
            xr = Math.max(4 - R_X0, Math.min(W - 4 - R_X1, xr));
            if (x2 - x1 <= MEET_GAP) {
                var mitt = (x1 + x2) / 2;
                x1 = mitt - MEET_GAP / 2;
                x2 = mitt + MEET_GAP / 2;
                // tyngdpunkten hamnar exakt mitt emellan fingrarna
                xr = mitt - tyngdX();
                mode = 'klar';
                syncUi();
            }
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return mode === 'kor';
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            if (mode === 'kor') {
                info.textContent = slid === 1 ? 'Vänster finger glider'
                                              : 'Höger finger glider';
            } else if (mode === 'klar') {
                info.textContent = 'Tyngdpunkten hittad!';
            } else {
                info.textContent = 'Fingrarna står stilla';
            }
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
            pausBtn.disabled = mode !== 'kor';
            startBtn.disabled = mode !== 'rest';
            omBtn.disabled = mode === 'rest';
        }

        function reset() {
            mode = 'rest';
            x1 = X1_START;
            x2 = X2_START;
            xr = 0;
            paused = false;
            syncUi();
            render();
            updateInfo();
        }

        startBtn.addEventListener('click', function () {
            if (mode !== 'rest') return;
            // fingret längst från tyngdpunkten (minst normalkraft och därmed
            // minst friktion) börjar glida
            slid = frac1() < 0.5 ? 1 : 2;
            mode = 'kor';
            paused = false;
            syncUi();
            kick();
        });
        omBtn.addEventListener('click', reset);
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            if (!paused) kick();
            else render();
        });
        nChk.cb.addEventListener('change', render);
        tpChk.cb.addEventListener('change', render);
        slowChk.cb.addEventListener('change', kick);
        // Att lägga på/ta av vikten flyttar tyngdpunkten — börja om från
        // startläget så att fingrarna säkert står på var sin sida om den.
        viktChk.cb.addEventListener('change', reset);

        // ── Dra vikten längs linjalen (pekare/touch/mus) ──────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function overVikt(p) {
            // vikten står på linjalen och ritas förskjuten xr
            return viktPa() && Math.abs(p.x - (xw + xr)) < 22 &&
                   p.y > R_TOP - 48 && p.y < R_BOT;
        }
        function clampVikt(x) {
            // x i linjalens system
            var lo = R_X0 + 16, hi = R_X1 - 16;
            if (mode === 'kor') {
                // tyngdpunkten måste stanna mellan fingrarna (skärm → linjal)
                lo = Math.max(lo, ((1 + M_VIKT) * (x1 + 12 - xr) - MID) / M_VIKT);
                hi = Math.min(hi, ((1 + M_VIKT) * (x2 - 12 - xr) - MID) / M_VIKT);
            }
            return Math.max(lo, Math.min(hi, x));
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overVikt(p)) return;
            e.preventDefault();
            if (mode === 'klar') reset();   // flyttad vikt = nytt försök
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overVikt(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            xw = clampVikt(p.x - xr);
            if (!running) { render(); updateInfo(); }
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumpsskript: frys ett läge mitt i förloppet.
        card._setLage = function (nx1, nx2, nslid, nxr) {
            x1 = nx1;
            x2 = nx2;
            slid = nslid;
            xr = nxr || 0;
            mode = 'kor';
            paused = true;
            syncUi();
            render();
            updateInfo();
        };

        syncUi();
        render();
        updateInfo();
    }

    // ── Register + publikt API ────────────────────────────────────────────
    var TYPES = { tomtebloss: buildTomtebloss, centrifug: buildCentrifug,
                  fjaderpendel: buildFjaderpendel, skiftnyckel: buildSkiftnyckel,
                  valtning: buildValtning, linjal: buildLinjal };

    function decodeSrc(b64) {
        try { return decodeURIComponent(escape(atob(b64))); }
        catch (e) { try { return atob(b64); } catch (e2) { return ''; } }
    }

    function mountAll(root) {
        if (!root) return;
        var nodes = root.querySelectorAll('.lab-minisim[data-minisim-src]:not([data-minisim-mounted])');
        if (nodes.length) injectCss();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            node.setAttribute('data-minisim-mounted', '1');
            var cfg = parseConfig(decodeSrc(node.getAttribute('data-minisim-src')));
            var build = cfg.typ && TYPES[cfg.typ];
            if (!build) { node.textContent = 'Okänd minisimulering.'; continue; }
            try { build(node, cfg); }
            catch (e) { node.textContent = 'Kunde inte bygga minisimuleringen.'; }
        }
    }

    window.FYSIKMINISIM = { mountAll: mountAll, parseConfig: parseConfig };
})();
