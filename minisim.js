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
 *           Tillgängliga typer: tomtebloss, centrifug
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

    // ── Register + publikt API ────────────────────────────────────────────
    var TYPES = { tomtebloss: buildTomtebloss, centrifug: buildCentrifug };

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
