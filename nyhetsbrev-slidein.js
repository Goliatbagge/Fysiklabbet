/* Fysiklabbets nyhetsbrev — slide-in-panelen.
 *
 * En ruta som glider upp och lägger sig mitt på skärmen när besökaren har
 * läst en bit av sidan, och som därefter INTE kommer tillbaka. Rutan
 * återanvänder anmälningsformuläret i nyhetsbrev.js — samma EmailOctopus-
 * formulär, samma felöversättningar, samma kvittotext — men klär av den
 * blockramen och sätter den i en flytande panel i stället.
 *
 * Varför den ligger här och inte hos EmailOctopus: kontots plan rymmer
 * bara ETT formulär, och det är upptaget av inline-rutan. Att bygga
 * panelen själva ger dessutom laboranstemat rakt av och full kontroll
 * över när den visas — vilket är hela poängen, se reglerna nedan.
 *
 * Använd så här:
 *
 *   <script src="nyhetsbrev-slidein.js" defer></script>
 *
 * Skriptet kopplar sig självt och beter sig rätt utan konfiguration.
 * Vill man stänga av den på en enskild sida:
 *
 *   <body data-nyhetsbrev-slidein="av">
 *
 * ── NÄR RUTAN VISAS ────────────────────────────────────────────────────
 * Den ska aldrig upplevas som ett hinder. Därför gäller ALLA villkoren:
 *
 *   1. Sidan har ingen inline-ruta ([data-nyhetsbrev]). EmailOctopus
 *      skript letar upp sitt formulär med document.querySelector, så två
 *      samtidiga rutor skulle plocka fel — och på de sidorna kan
 *      besökaren redan anmäla sig utan att bli avbruten.
 *   2. Besökaren har läst minst 45 % av sidan OCH varit kvar 30 sekunder.
 *   3. Sidan är alls värd att skrolla i (minst ~1,6 skärmhöjder).
 *   4. Rutan har inte visats förut: en stängd ruta vilar 60 dagar, och
 *      den som anmält sig får aldrig se den igen.
 *   5. Besökaren kom inte hit från ett utskick (?eocampaign1=… eller
 *      utm_source=nyhetsbrev) — då prenumererar hen redan, och vi
 *      minns det.
 *   6. Inget helskärmsläge eller presentationsläge är igång.
 *
 * Rutan ligger centrerad över en dämpad skärm, alltså som en dialog: den
 * syns, till skillnad från en hörnruta som är lätt att missa. Priset är
 * att den avbryter läsningen, och det är just därför villkoren ovan är
 * så snäva. Escape och ett klick utanför stänger, fokus flyttas in i
 * rutan när den öppnas och tillbaka dit det låg när den stängs.
 *
 * Minnet ligger i localStorage under nyckeln FL_NB_SLIDEIN. Det är per
 * webbläsare och enhet — samma person i mobilen eller efter en
 * cookierensning börjar om. Det går inte att komma runt utan inloggning.
 */
(function () {
    'use strict';

    var NYCKEL = 'fl-nyhetsbrev-slidein';
    var VILA_DAGAR = 60;          // hur länge en stängd ruta håller tyst
    var SKROLL_ANDEL = 0.45;      // 45 % av sidan läst
    var TID_MS = 30000;           // och minst 30 sekunder på sidan
    var MIN_SIDHOJD = 1.6;        // sidan måste vara skrollbar på riktigt

    // Vinjettbilden. Sidorna som visar rutan ligger alla i roten.
    var BILD = 'media/nyhetsbrev-atom.webp';
    var TITEL = 'Ett mejl i veckan';
    var INGRESS = 'Veckans fysiknyheter och nytt material på Fysiklabbet, '
                + 'samlat i ett mejl.';
    // Kortare än inline-rutans finstilta — panelen är en liten yta, och det
    // som måste stå kvar är dubbel opt-in och att man kan avsluta.
    var FINSTILT = 'Du får ett bekräftelsemejl innan prenumerationen startar. '
                 + 'Avsluta när du vill.';

    /* ── Minnet ────────────────────────────────────────────────────── */

    function las() {
        try {
            var rad = window.localStorage.getItem(NYCKEL);
            return rad ? JSON.parse(rad) : null;
        } catch (e) { return null; }        // privat läge, blockerad lagring
    }

    function skriv(status) {
        try {
            window.localStorage.setItem(NYCKEL, JSON.stringify({
                status: status, tid: Date.now(),
            }));
        } catch (e) { /* strunt samma — då visas rutan igen nästa besök */ }
    }

    function farVisas() {
        var m = las();
        if (!m) return true;
        if (m.status === 'prenumererar') return false;
        var dagar = (Date.now() - (m.tid || 0)) / 86400000;
        return dagar >= VILA_DAGAR;
    }

    /* ── Utseende ──────────────────────────────────────────────────────
       Färgerna kommer från styles-laborans.css (--lab-*). Panelen är en
       kompakt nb-box: samma vita panel, samma accentlinje i överkant,
       men utan blockets marginaler. z-index 850 håller den UNDER
       presentationsläget (9000+) — den får aldrig lägga sig över en
       genomgång som visas för en klass. */
    var CSS = [
        /* Skärmen bakom. Bläckton med lätt oskärpa — sidan ska anas, inte
           läsas, medan rutan är uppe. */
        '.nbs-skarm {',
        '    position: fixed; inset: 0; z-index: 9990;',
        '    background: rgba(15, 22, 32, 0.46);',
        '    backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);',
        '    opacity: 0; transition: opacity .3s ease;',
        '}',
        '.nbs-skarm.nbs-in { opacity: 1; }',

        /* Rutan: centrerad, glider upp underifrån. Samma vita panel och
           samma accentlinje i överkant som inline-rutan har. */
        '.nbs-panel {',
        '    position: fixed; z-index: 9991;',
        '    left: 50%; top: 50%;',
        '    width: min(430px, calc(100vw - 32px));',
        /* overflow-x måste sättas uttryckligen: med bara overflow-y: auto
           räknas även x om till auto, och då får rutan en sidled-rullist av
           reCAPTCHA-brickan. Den ligger position: fixed på right: -186px, och
           eftersom rutan har en transform blir RUTAN dess referensram i stället
           för fönstret — så den hamnar 186 px utanför kanten och breddar
           innehållet. Brickan är redan visibility: hidden, alltså aldrig tänkt
           att synas; att klippa den ändrar ingenting för besökaren. */
        '    max-height: min(92vh, 760px); overflow-y: auto; overflow-x: hidden;',
        '    box-sizing: border-box; padding: 0;',
        '    background: var(--lab-bg-panel, #fff);',
        '    border: 1px solid var(--lab-line-strong, rgba(15,22,32,0.28));',
        '    border-top: 3px solid var(--lab-accent, #c8324a);',
        '    border-radius: 5px;',
        '    box-shadow: 0 26px 70px rgba(15, 22, 32, 0.34),',
        '                0 4px 12px rgba(15, 22, 32, 0.14);',
        '    opacity: 0; transform: translate(-50%, calc(-50% + 34px));',
        '    transition: opacity .34s ease, transform .5s cubic-bezier(.22,.75,.3,1);',
        '}',
        '.nbs-panel.nbs-in { opacity: 1; transform: translate(-50%, -50%); }',
        '.nbs-panel.nbs-ut { opacity: 0; transform: translate(-50%, calc(-50% + 22px)); }',
        /* Rutan tar emot fokus när den öppnas (tabindex -1) och ska inte
           rita någon ram för det — den syns redan tydligt. */
        '.nbs-panel:focus { outline: none; }',

        /* Bilden ligger i kant med rutan, som en vinjett över innehållet. */
        '.nbs-bild {',
        '    display: block; width: 100%; height: auto;',
        '    border-bottom: 1px solid var(--lab-line, rgba(15,22,32,0.12));',
        '}',
        '.nbs-kropp { padding: 18px 24px 20px; }',

        /* Stängknappen sitter över bilden — krämtonen där är ljus, så
           bläckgrått räcker som kontrast. Ingen platta, ingen halo. */
        '.nbs-stang {',
        '    position: absolute; top: 8px; right: 8px;',
        '    width: 32px; height: 32px; padding: 0;',
        '    display: flex; align-items: center; justify-content: center;',
        '    border: 0; border-radius: 3px; background: transparent;',
        '    color: var(--lab-ink-muted, #69655c); cursor: pointer;',
        '    transition: color .15s ease, background .15s ease;',
        '}',
        '.nbs-stang:hover { color: var(--lab-ink, #0f1620); background: rgba(15,22,32,0.09); }',
        '.nbs-stang:focus-visible { outline: 2px solid var(--lab-accent, #c8324a); outline-offset: 1px; }',

        /* Av med blockramen — nb-box sitter nu I rutan och ska inte rita
           en andra ruta innanför den. */
        '.nbs-panel .nb-box {',
        '    margin: 0; padding: 0; border: 0; border-radius: 0;',
        '    background: transparent;',
        '}',
        '.nbs-panel .nb-title {',
        '    font-size: 27px; line-height: 1.08; margin: 7px 0 9px;',
        '}',
        '.nbs-panel .nb-lead { font-size: 15px; margin: 0 0 15px; }',
        '.nbs-panel .nb-klar { font-size: 15px; }',
        '.nbs-panel .nb-fine { font-size: 10px; margin-top: 12px; }',
        '.nbs-panel .nb-form { min-height: 44px; }',

        /* Rutan äger skärmen medan den är uppe. Feedback-knappen ligger på
           z-index 9998, alltså ovanför skärmen, och skulle annars sväva
           kvar som en lös knapp mitt i dämpningen. */
        'body.nbs-oppen .fb-btn { opacity: 0; pointer-events: none; }',

        '@media (max-width: 600px) {',
        '    .nbs-panel { width: calc(100vw - 24px); }',
        '    .nbs-kropp { padding: 16px 18px 18px; }',
        '    .nbs-panel .nb-title { font-size: 24px; }',
        '}',

        /* Låg skärm (liggande telefon): bilden äter för mycket höjd. */
        '@media (max-height: 620px) {',
        '    .nbs-bild { display: none; }',
        '}',

        '@media (prefers-reduced-motion: reduce) {',
        '    .nbs-panel {',
        '        transition: opacity .01s linear;',
        '        transform: translate(-50%, -50%);',
        '    }',
        '    .nbs-panel.nbs-ut { transform: translate(-50%, -50%); }',
        '    .nbs-skarm { backdrop-filter: none; -webkit-backdrop-filter: none; }',
        '}',
    ].join('\n');

    /* ── Panelen ───────────────────────────────────────────────────── */

    var panel = null;
    var skarm = null;
    var stadaFormular = null;
    var forraFokus = null;
    var forraOverflow = '';
    var forraPadding = '';

    function injiceraCSS() {
        if (document.querySelector('style[data-nbs-css]')) return;
        var style = document.createElement('style');
        style.setAttribute('data-nbs-css', '');
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    // Sidan bakom ska inte skrolla medan rutan är uppe. Rullisten tas bort
    // när overflow slås av, så bredden kompenseras — annars hoppar hela
    // layouten några pixlar i sidled just när rutan glider in.
    function lasSidan() {
        var bredd = window.innerWidth - document.documentElement.clientWidth;
        forraOverflow = document.body.style.overflow;
        forraPadding = document.body.style.paddingRight;
        document.body.style.overflow = 'hidden';
        if (bredd > 0) document.body.style.paddingRight = bredd + 'px';
    }

    function slappSidan() {
        document.body.style.overflow = forraOverflow;
        document.body.style.paddingRight = forraPadding;
    }

    function stang(status) {
        if (!panel) return;
        skriv(status || 'stangd');
        var el = panel, sk = skarm;
        panel = null;
        skarm = null;
        document.body.classList.remove('nbs-oppen');
        document.removeEventListener('keydown', onTangent, true);
        slappSidan();
        if (forraFokus && forraFokus.focus) { try { forraFokus.focus(); } catch (e) {} }
        forraFokus = null;
        el.classList.remove('nbs-in');
        el.classList.add('nbs-ut');
        if (sk) sk.classList.remove('nbs-in');
        window.setTimeout(function () {
            if (stadaFormular) { stadaFormular(); stadaFormular = null; }
            if (el.parentNode) el.parentNode.removeChild(el);
            if (sk && sk.parentNode) sk.parentNode.removeChild(sk);
        }, 520);
    }

    // Escape stänger. Tab hålls kvar i rutan — den ligger över en dämpad
    // sida, och fokus får inte vandra ut till länkar som inte går att se.
    function onTangent(e) {
        if (!panel) return;
        if (e.key === 'Escape' || e.key === 'Esc') { stang('stangd'); return; }
        if (e.key !== 'Tab') return;
        var kan = panel.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        var syns = [];
        for (var i = 0; i < kan.length; i++) {
            if (kan[i].offsetParent !== null && !kan[i].disabled) syns.push(kan[i]);
        }
        if (!syns.length) return;
        var forst = syns[0], sist = syns[syns.length - 1];
        if (e.shiftKey && document.activeElement === forst) {
            e.preventDefault(); sist.focus();
        } else if (!e.shiftKey && document.activeElement === sist) {
            e.preventDefault(); forst.focus();
        } else if (!panel.contains(document.activeElement)) {
            e.preventDefault(); forst.focus();
        }
    }

    function visa() {
        if (panel || !window.FYSIKNYHETSBREV) return;
        injiceraCSS();
        forraFokus = document.activeElement;

        skarm = document.createElement('div');
        skarm.className = 'nbs-skarm';
        skarm.addEventListener('click', function () { stang('stangd'); });

        panel = document.createElement('aside');
        panel.className = 'nbs-panel no-begrepp';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Anmälan till nyhetsbrevet');
        // Fokus flyttas till själva rutan, inte till kryssknappen: en
        // programmatiskt fokuserad knapp ritar sin fokusring direkt, och
        // det första ögat möter ska vara rubriken — inte en markerad knapp.
        panel.setAttribute('tabindex', '-1');

        var knapp = document.createElement('button');
        knapp.type = 'button';
        knapp.className = 'nbs-stang';
        knapp.setAttribute('aria-label', 'Stäng');
        knapp.title = 'Stäng';
        knapp.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" '
            + 'stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'
            + '<path d="M5 5l14 14M19 5L5 19"/></svg>';
        knapp.addEventListener('click', function () { stang('stangd'); });

        // Dekorativ vinjett — rubriken bredvid säger redan vad rutan är,
        // så bilden får tomt alt-attribut i stället för en dubblering.
        var bild = document.createElement('img');
        bild.className = 'nbs-bild';
        bild.src = BILD;
        bild.alt = '';
        bild.width = 960;
        bild.height = 520;
        // Går bilden inte att hämta ska rutan ändå se hel ut.
        bild.addEventListener('error', function () { bild.remove(); });

        var kropp = document.createElement('div');
        kropp.className = 'nbs-kropp';

        panel.appendChild(knapp);
        panel.appendChild(bild);
        panel.appendChild(kropp);
        document.body.appendChild(skarm);
        document.body.appendChild(panel);

        // Formuläret byggs av nyhetsbrev.js — med samma fältstyling,
        // samma svenska felmeddelanden och samma kvittotext som inline-rutan.
        stadaFormular = window.FYSIKNYHETSBREV.mount(kropp, {
            titel: TITEL, ingress: INGRESS,
        });
        var fin = kropp.querySelector('.nb-fine');
        if (fin) fin.textContent = FINSTILT;

        // Ett anmält formulär byter till kvittotexten. Låt den stå kvar
        // en stund, stäng sedan — och kom ihåg att aldrig visa rutan igen.
        document.addEventListener('emailoctopus:form.success', function (e) {
            if (!e.detail || e.detail.form_id !== window.FYSIKNYHETSBREV.FORM_ID) return;
            skriv('prenumererar');
            window.setTimeout(function () { stang('prenumererar'); }, 7000);
        });

        document.addEventListener('keydown', onTangent, true);
        lasSidan();
        document.body.classList.add('nbs-oppen');

        // Nästa bildruta, så att övergången faktiskt animeras.
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                if (!panel) return;
                panel.classList.add('nbs-in');
                skarm.classList.add('nbs-in');
                panel.focus();
            });
        });
    }

    /* ── Villkoren ─────────────────────────────────────────────────── */

    function komFranUtskick() {
        var s = window.location.search;
        return /[?&]eocampaign1=/.test(s) || /[?&]utm_source=nyhetsbrev\b/.test(s);
    }

    function nagotAnnatArIVagen() {
        // Helskärm (simuleringar, minisimuleringar) och presentationsläget
        // äger hela skärmen — lägg oss aldrig över dem.
        return !!(document.fullscreenElement || document.webkitFullscreenElement
                  || document.querySelector('.lab-pres'));
    }

    function start() {
        if (document.body.getAttribute('data-nyhetsbrev-slidein') === 'av') return;
        // Sidor med inline-rutan äger formuläret — se filhuvudet.
        if (document.querySelector('[data-nyhetsbrev]')) return;
        // Förhandsvisning: ?nbs=test visar rutan direkt, utan villkor och
        // utan att skriva i minnet. Bara för att titta på den.
        if (/[?&]nbs=test\b/.test(window.location.search)) {
            window.setTimeout(visa, 300);
            return;
        }
        if (komFranUtskick()) { skriv('prenumererar'); return; }
        if (!farVisas()) return;

        var start_tid = Date.now();
        var timer = null;

        var kolla = function () {
            if (panel) return;
            // Skyddsnät: sidor som monterar inline-rutan med JS (React-vyerna
            // på startsidan, nyhetssidan och simuleringslistan) har ingen
            // [data-nyhetsbrev] i källan att känna igen i förväg — men väl en
            // .nb-box i DOM:en när den väl finns. Den rutan äger formuläret.
            if (document.querySelector('.nb-box')) { avsluta(); return; }
            if (Date.now() - start_tid < TID_MS) return;
            if (nagotAnnatArIVagen()) return;

            var doc = document.documentElement;
            var hojd = Math.max(doc.scrollHeight, document.body.scrollHeight);
            var skarm = window.innerHeight;
            if (hojd < skarm * MIN_SIDHOJD) return;      // för kort sida att läsa i

            var last = (window.scrollY + skarm) / hojd;
            if (last < SKROLL_ANDEL) return;

            avsluta();
            visa();
        };

        var avsluta = function () {
            window.removeEventListener('scroll', kolla);
            if (timer) { window.clearInterval(timer); timer = null; }
        };

        window.addEventListener('scroll', kolla, { passive: true });
        // Även utan skrollning: en läsare som stannat länge på en lång sida
        // (eller vars skroll skett innan tidsgränsen passerades) ska nås.
        timer = window.setInterval(kolla, 5000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
