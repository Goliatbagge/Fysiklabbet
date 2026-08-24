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
 * Två lägen finns, och de styrs av ett attribut på <body>:
 *
 *   (inget attribut)                      rutan bygger sitt eget formulär
 *   <body data-nyhetsbrev-slidein="lana"> rutan LÅNAR sidans inline-ruta
 *   <body data-nyhetsbrev-slidein="av">   rutan visas inte alls
 *
 * ── LÅNLÄGET ───────────────────────────────────────────────────────────
 * Startsidan, nyhetssidan, simuleringslistan och om-sidan har redan en
 * inline-ruta i sidfoten. EmailOctopus skript letar upp sitt formulär med
 * document.querySelector och kontots plan rymmer bara ETT formulär, så vi
 * kan inte bygga ett andra åt modalen där.
 *
 * Lösningen är att inte bygga något nytt: den befintliga .nb-box LYFTS på
 * plats. Den får klassen .nbs-panel, alltså position: fixed och mitt på
 * skärmen, och en vinjettbild plus en kryssknapp läggs in i den. När rutan
 * stängs tas allt bort igen och boxen sjunker tillbaka i flödet.
 *
 * Det avgörande är att boxen ALDRIG flyttas i DOM:en. Formuläret rymmer en
 * reCAPTCHA-iframe, och en iframe som tas ur trädet och sätts in igen
 * laddas om — vilket hade kunnat slå sönder verifieringen mitt i en
 * anmälan. Att bara ändra CSS och lägga till barn rör inte den saken.
 * En platshållare med boxens höjd sätts in där den satt, så att sidan
 * bakom inte hoppar när boxen lyfts.
 *
 * ── NÄR RUTAN VISAS ────────────────────────────────────────────────────
 * Den ska aldrig upplevas som ett hinder. Därför gäller ALLA villkoren:
 *
 *   1. I lånläget finns sidans egen ruta att lyfta, med sitt e-postfält på
 *      plats. Har den inte hunnit monteras väntar vi — vi bygger aldrig
 *      en andra.
 *   2. Besökaren har läst minst 45 % av sidan OCH varit kvar 30 sekunder.
 *   3. Sidan är alls värd att skrolla i (minst ~1,6 skärmhöjder).
 *   4. Rutan har inte visats förut. Minnet skrivs i samma ögonblick som
 *      rutan VISAR sig — inte när den stängs — så att den som backar,
 *      byter flik eller bara lämnar sidan räknas som en visning. En visad
 *      ruta vilar 60 dagar, och den som anmält sig får aldrig se den igen.
 *      Skriften går till både localStorage (de 60 dagarna) och
 *      sessionStorage (fliken), så att ett blockerat localStorage inte
 *      låter rutan komma tillbaka sida efter sida under samma besök.
 *   5. Besökaren kom inte hit från ett utskick (?eocampaign1=… eller
 *      utm_source=nyhetsbrev) — då prenumererar hen redan, och vi
 *      minns det.
 *   6. Inget helskärmsläge eller presentationsläge är igång.
 *   7. Rutan är KOMPLETT — den har ett ifyllbart e-postfält, och
 *      vinjettbilden har hunnit fram. Både bilden och EmailOctopus skript
 *      hämtas först i det ögonblick rutan öppnas, alltså långt efter
 *      sidladdningen, och en annonsblockerare eller ett tapp i det mobila
 *      nätet räcker för att fälla dem. Rutan byggs därför osynlig, väntar
 *      på sitt innehåll, och glider upp först när det är på plats — blir
 *      den aldrig komplett städas den bort utan ett ljud, och utan att
 *      skriva i minnet, så att besökaren kan få den på nästa sida.
 *      (Rapporterat från en telefon 2026-08-23: rutan visade rubrik och
 *      ingress, men varken bild eller fält att skriva adressen i.)
 *
 * Rutan ligger centrerad över en dämpad skärm, alltså som en dialog: den
 * syns, till skillnad från en hörnruta som är lätt att missa. Priset är
 * att den avbryter läsningen, och det är just därför villkoren ovan är
 * så snäva. Escape och ett klick utanför stänger, fokus flyttas in i
 * rutan när den öppnas och tillbaka dit det låg när den stängs.
 *
 * Minnet ligger under nyckeln fl-nyhetsbrev-slidein, i localStorage (de 60
 * dagarna) och i sessionStorage (den öppna fliken). Det är per webbläsare
 * och enhet — samma person i mobilen eller efter en cookierensning börjar
 * om. Det går inte att komma runt utan inloggning.
 */
(function () {
    'use strict';

    var NYCKEL = 'fl-nyhetsbrev-slidein';
    var forhandsvisning = false;  // ?nbs=test — visa rutan, rör inte minnet
    var VILA_DAGAR = 60;          // hur länge en stängd ruta håller tyst
    var SKROLL_ANDEL = 0.45;      // 45 % av sidan läst
    var TID_MS = 30000;           // och minst 30 sekunder på sidan
    var MIN_SIDHOJD = 1.6;        // sidan måste vara skrollbar på riktigt
    var VANTETID = 9000;          // så länge väntar vi på ett ifyllbart fält
    var BILD_FRIST = 6000;        // vinjettbilden får inte hålla upp rutan längre

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

    function las(lager) {
        try {
            var rad = window[lager].getItem(NYCKEL);
            return rad ? JSON.parse(rad) : null;
        } catch (e) { return null; }        // privat läge, blockerad lagring
    }

    /* Skriver i BÅDA lagren. localStorage bär de 60 dagarna; sessionStorage
       är ett skyddsnät för den enda flik besökaren håller på i — går
       localStorage inte att skriva i (privat läge, blockerad lagring,
       full kvot) skulle rutan annars komma tillbaka på var och varannan
       sida under hela besöket. Ingetdera får kasta: misslyckas allt är det
       värsta som händer att rutan visas igen vid nästa besök. */
    function skriv(status) {
        // Förhandsvisningen (?nbs=test) finns för att titta på rutan, och
        // ska aldrig kosta besökaren sina 60 dagar.
        if (forhandsvisning) return;
        var rad = JSON.stringify({ status: status, tid: Date.now() });
        try { window.localStorage.setItem(NYCKEL, rad); } catch (e) { /* strunt samma */ }
        try { window.sessionStorage.setItem(NYCKEL, rad); } catch (e) { /* strunt samma */ }
    }

    function farVisas() {
        // Har rutan redan haft sin chans i den här fliken är den färdig,
        // oavsett vad det långa minnet säger.
        if (las('sessionStorage')) return false;
        var m = las('localStorage');
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
        '    box-sizing: border-box;',
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
        /* Medan rutan väntar på formuläret ligger den osynlig i dokumentet.
           Utan pointer-events: none hade den ätit tryck mitt på skärmen —
           en osynlig vägg framför sidan i upp till nio sekunder. */
        '.nbs-panel.nbs-vantar { pointer-events: none; }',

        /* Lånläget: den lyfta .nb-box ÄR rutan. Den har redan vit botten,
           ram och accentlinje i överkant från nyhetsbrev.js — bara
           marginalen behöver bort, resten ärvs. */
        '.nbs-panel.nb-box { margin: 0 !important; }',
        /* Platshållaren håller kvar boxens höjd i flödet medan den är lyft. */
        '.nbs-plats { flex: none; }',

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
    var vantar = false;      // rutan är byggd men väntar på sitt innehåll
    var lanad = null;        // den lyfta .nb-box, i lånläget
    var lanadPlats = null;   // platshållaren den lämnat efter sig
    var lanadText = null;    // rubrik och ingress att lämna tillbaka
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
            if (lanad) {
                aterlamna(el);
            } else {
                if (stadaFormular) { stadaFormular(); stadaFormular = null; }
                if (el.parentNode) el.parentNode.removeChild(el);
            }
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

    // Bygger kryssknappen och vinjettbilden — samma i båda lägena.
    function byggKnapp() {
        var knapp = document.createElement('button');
        knapp.type = 'button';
        knapp.className = 'nbs-stang';
        knapp.setAttribute('aria-label', 'Stäng');
        knapp.title = 'Stäng';
        knapp.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" '
            + 'stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'
            + '<path d="M5 5l14 14M19 5L5 19"/></svg>';
        knapp.addEventListener('click', function () { stang('stangd'); });
        return knapp;
    }

    // Dekorativ vinjett — rubriken bredvid säger redan vad rutan är, så
    // bilden får tomt alt-attribut i stället för en dubblering.
    function byggBild() {
        var bild = document.createElement('img');
        bild.className = 'nbs-bild';
        bild.src = BILD;
        bild.alt = '';
        bild.width = 960;
        bild.height = 520;
        // Går bilden inte att hämta ska rutan ändå se hel ut. Men ett tapp
        // i nätet ska inte kosta vinjetten: ett omtag först, med en egen
        // adress så att webbläsarens minne av det misslyckade svaret inte
        // används om, och först därefter ger vi upp.
        var forsok = 0;
        bild.addEventListener('error', function () {
            if (forsok++ === 0) {
                window.setTimeout(function () { bild.src = BILD + '?omtag=1'; }, 900);
                return;
            }
            bild.remove();
        });
        return bild;
    }

    // LÅNLÄGET: lyft sidans egen ruta i stället för att bygga en ny.
    // Boxen flyttas aldrig i DOM:en — se filhuvudet om reCAPTCHA-iframen.
    function lana(box) {
        lanad = box;

        // Platshållare med samma höjd, så att sidan bakom inte hoppar när
        // boxen lämnar flödet.
        lanadPlats = document.createElement('div');
        lanadPlats.className = 'nbs-plats';
        lanadPlats.style.height = box.offsetHeight + 'px';
        box.parentNode.insertBefore(lanadPlats, box);

        // Modalens kortare texter — inline-rutans egna sparas och sätts
        // tillbaka när rutan stängs.
        var rubrik = box.querySelector('.nb-title');
        var lead = box.querySelector('.nb-lead');
        var fin = box.querySelector('.nb-fine');
        lanadText = {
            rubrik: rubrik && rubrik.textContent,
            lead: lead && lead.textContent,
            fin: fin && fin.textContent,
        };
        if (rubrik) rubrik.textContent = TITEL;
        // Har besökaren redan anmält sig står kvittotexten här — rör den inte.
        if (lead && !box.classList.contains('is-klar')) lead.textContent = INGRESS;
        if (fin) fin.textContent = FINSTILT;

        var bild = byggBild();
        // Bilden ska gå ut i rutans kanter, men boxen har egen padding.
        // Den mäts i stället för att gissas — den är olika på mobil.
        var cs = window.getComputedStyle(box);
        var vl = parseFloat(cs.paddingLeft) || 0;
        var hg = parseFloat(cs.paddingRight) || 0;
        bild.style.marginTop = '-' + cs.paddingTop;
        bild.style.marginLeft = '-' + cs.paddingLeft;
        bild.style.marginRight = '-' + cs.paddingRight;
        bild.style.marginBottom = '16px';
        bild.style.width = 'calc(100% + ' + (vl + hg) + 'px)';
        bild.style.maxWidth = 'none';

        box.classList.add('nbs-panel');
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('tabindex', '-1');
        box.insertBefore(bild, box.firstChild);
        box.insertBefore(byggKnapp(), box.firstChild);
        return box;
    }

    // Lämnar tillbaka den lånade boxen till sidan, i det skick den kom.
    function aterlamna(box) {
        var knapp = box.querySelector(':scope > .nbs-stang');
        var bild = box.querySelector(':scope > .nbs-bild');
        if (knapp) knapp.remove();
        if (bild) bild.remove();
        box.classList.remove('nbs-panel', 'nbs-in', 'nbs-ut');
        box.removeAttribute('role');
        box.removeAttribute('aria-modal');
        box.removeAttribute('tabindex');
        if (lanadText) {
            var rubrik = box.querySelector('.nb-title');
            var lead = box.querySelector('.nb-lead');
            var fin = box.querySelector('.nb-fine');
            if (rubrik && lanadText.rubrik !== null) rubrik.textContent = lanadText.rubrik;
            // Kvittotexten efter en lyckad anmälan ska förstås stå kvar.
            if (lead && lanadText.lead !== null && !box.classList.contains('is-klar')) {
                lead.textContent = lanadText.lead;
            }
            if (fin && lanadText.fin !== null) fin.textContent = lanadText.fin;
        }
        if (lanadPlats && lanadPlats.parentNode) lanadPlats.remove();
        lanad = null; lanadPlats = null; lanadText = null;
    }

    // Har rutan ett fält att skriva sin adress i? Formuläret kommer från
    // eomail5.com och kan utebli — se harFalt() i nyhetsbrev.js.
    function harFalt(el) {
        if (window.FYSIKNYHETSBREV && window.FYSIKNYHETSBREV.harFalt) {
            return window.FYSIKNYHETSBREV.harFalt(el);
        }
        return !!(el && el.querySelector('input:not([type="hidden"])'));
    }

    /* Väntar tills rutan är KOMPLETT innan den glider upp: ett ifyllbart
       fält, och en vinjettbild som hunnit fram. Utan den väntan kan rutan
       visa sig som rubrik + ingress + ett tomt hål, vilket är precis vad
       som rapporterades från en telefon 2026-08-23 — bilden och
       EmailOctopus-skriptet hämtas ju båda i samma ögonblick som rutan
       öppnas, alltså långt efter att sidan laddats, och ett tapp i det
       mobila nätet (eller en annonsblockerare) räcker för att fälla dem.
       Bilden får en kortare frist än fältet: den är dekor, fältet är hela
       poängen med rutan. */
    function vantaPaInnehall(p, klar) {
        var start = Date.now();
        var t = window.setInterval(function () {
            var gatt = Date.now() - start;
            var bild = p.querySelector('.nbs-bild');
            var bildKlar = !bild || bild.complete;   // borttagen bild = färdigt besked
            if (harFalt(p) && (bildKlar || gatt > BILD_FRIST)) {
                window.clearInterval(t); klar(true); return;
            }
            if (gatt > VANTETID) { window.clearInterval(t); klar(false); }
        }, 200);
    }

    // Bygger den egna rutan (osynlig än så länge) och startar formuläret.
    function byggPanel() {
        var p = document.createElement('aside');
        // nbs-vantar: rutan ligger i dokumentet med opacity 0 medan vi
        // väntar, och får absolut inte fånga tryck som gäller sidan bakom.
        p.className = 'nbs-panel nbs-vantar no-begrepp';
        p.setAttribute('role', 'dialog');
        p.setAttribute('aria-modal', 'true');
        p.setAttribute('aria-label', 'Anmälan till nyhetsbrevet');
        // Fokus flyttas till själva rutan, inte till kryssknappen: en
        // programmatiskt fokuserad knapp ritar sin fokusring direkt, och
        // det första ögat möter ska vara rubriken — inte en markerad knapp.
        p.setAttribute('tabindex', '-1');

        var kropp = document.createElement('div');
        kropp.className = 'nbs-kropp';

        p.appendChild(byggKnapp());
        p.appendChild(byggBild());
        p.appendChild(kropp);
        document.body.appendChild(p);

        // Formuläret byggs av nyhetsbrev.js — med samma fältstyling,
        // samma svenska felmeddelanden och samma kvittotext som
        // inline-rutan.
        stadaFormular = window.FYSIKNYHETSBREV.mount(kropp, {
            titel: TITEL, ingress: INGRESS,
        });
        var fin = kropp.querySelector('.nb-fine');
        if (fin) fin.textContent = FINSTILT;
        return p;
    }

    // Rutan blev aldrig komplett. Städa bort den utan ett ljud — och utan
    // att skriva i minnet, så att besökaren kan få rutan på nästa sida.
    function stadaBort(p) {
        if (stadaFormular) { stadaFormular(); stadaFormular = null; }
        if (p && p.parentNode) p.parentNode.removeChild(p);
    }

    // Öppnar en färdig ruta: skärmen bakom, tangentfångst, låst sida.
    function oppna(p) {
        panel = p;
        panel.classList.remove('nbs-vantar');
        forraFokus = document.activeElement;

        // Minnet skrivs HÄR, i samma andetag som rutan visar sig — inte
        // först när den stängs. Annars räknas bara den besökare som
        // uttryckligen kryssar bort rutan: den som i stället backar med
        // telefonens bakåtgest, byter flik, stänger fliken eller vars
        // webbläsare slås ihjäl lämnar inget spår, och får rutan igen på
        // nästa sida. Bakåtknappen är dessutom fullt nåbar medan rutan är
        // uppe, så det är inte ens ett kantfall — det är den vanliga vägen
        // ut på en telefon. (Rapporterat 2026-08-24: rutan kom tillbaka
        // flera gånger på kort tid.) stang() skriver sedan över med sin
        // egen status; det gör ingen skada.
        skriv('visad');

        skarm = document.createElement('div');
        skarm.className = 'nbs-skarm';
        skarm.addEventListener('click', function () { stang('stangd'); });
        document.body.appendChild(skarm);

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

    function visa(slappKrav) {
        if (panel || vantar || !window.FYSIKNYHETSBREV) return;
        injiceraCSS();

        if (lanLage()) {
            // Lånläget lyfter sidans egen ruta, och den har haft hela
            // sidbesöket på sig att hämta sitt formulär. Saknas fältet ändå
            // lyfter vi ingenting — en ruta utan fält att skriva i är värre
            // än ingen ruta alls, och sidans egen ruta visar då sin
            // reservtext på sin plats i flödet.
            var box = document.querySelector('.nb-box');
            if (!box || (!harFalt(box) && !slappKrav)) return;
            oppna(lana(box));
            return;
        }

        var p = byggPanel();
        vantar = true;
        vantaPaInnehall(p, function (komplett) {
            vantar = false;
            if (!komplett && !slappKrav) { stadaBort(p); return; }
            oppna(p);
        });
    }

    /* ── Villkoren ─────────────────────────────────────────────────── */

    function lanLage() {
        return document.body.getAttribute('data-nyhetsbrev-slidein') === 'lana';
    }

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
        // Förhandsvisning: ?nbs=test visar rutan direkt, utan villkor och
        // utan att skriva i minnet. Bara för att titta på den.
        if (/[?&]nbs=test\b/.test(window.location.search)) {
            forhandsvisning = true;
            // I lånläget måste sidans egen ruta hinna monteras först —
            // React-vyerna gör det i en effekt, en bit efter
            // DOMContentLoaded, så en fast fördröjning blir en lotteri.
            var forsok = 0;
            var t = window.setInterval(function () {
                if (!lanLage() || document.querySelector('.nb-box')) {
                    // slappKrav: förhandsvisningen ska visa rutan även om
                    // EmailOctopus inte svarar — den finns för att titta på
                    // formen, inte för att prova anmälan.
                    window.clearInterval(t); visa(true); return;
                }
                if (++forsok > 25) window.clearInterval(t);
            }, 300);
            return;
        }
        if (komFranUtskick()) { skriv('prenumererar'); return; }
        if (!farVisas()) return;

        var start_tid = Date.now();
        var timer = null;

        var kolla = function () {
            if (panel) return;
            // I lånläget lyfter vi sidans egen ruta, och då måste den
            // finnas OCH ha fått sitt e-postfält. React-vyerna monterar sin
            // i en effekt, och formuläret hämtas från eomail5.com — båda kan
            // dröja. Vänta hellre än att lyfta en halvfärdig ruta; loopen
            // fortsätter titta efter så länge sidbesöket varar.
            if (lanLage() && !harFalt(document.querySelector('.nb-box'))) return;
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
