/* Fysiklabbets nyhetsbrev — anmälningsrutan, delad av flera sidor.
 *
 * Rutan låg tidigare bara på nyheter.html, med CSS och React-komponent
 * inbakade i den filen. Den bor nu här i stället, som en fristående
 * vanilla-widget i samma anda som graf.js, minisim.js och begrepp-lank.js,
 * så att startsidan, simuleringslistan och om-sidan kan visa exakt samma
 * ruta utan att koden kopieras.
 *
 * Använd så här:
 *
 *   <div data-nyhetsbrev></div>            (statisk sida — monteras själv)
 *   window.FYSIKNYHETSBREV.mount(el)       (React-sida — anropa i useEffect)
 *   window.FYSIKNYHETSBREV.mountAll()      (montera allt som ännu inte är monterat)
 *
 * Rubrik och ingress kan skrivas om per sida med data-attribut:
 *
 *   <div data-nyhetsbrev
 *        data-titel="Missa inget"
 *        data-ingress="Ett mejl i veckan."></div>
 *
 * OBS — EXAKT EN RUTA PER SIDA. EmailOctopus skript letar upp sitt formulär med
 * document.querySelector, så två samtidiga rutor skulle plocka fel. Widgeten
 * håller därför reda på vilken ruta som är aktiv och hoppar över resten —
 * lägg alltså inte in rutan två gånger i samma vy och räkna med att båda
 * fungerar.
 */
(function () {
    'use strict';

    // Formuläret kommer från EmailOctopus. Deras skript injicerar VANLIG DOM
    // (ingen iframe) plus en <style> vars samtliga regler är scopade till
    // [data-form="…"] — inget läcker ut i sidan. Därför kan vi skriva egen
    // rubrik och ingress och klä om deras fält via CSS i stället för att
    // bygga ett eget formulär: reCAPTCHA, honungsfällan och dubbel opt-in
    // fortsätter fungera även om de ändrar något i sin ände.
    var FORM_ID = '2513d79c-8e59-11f1-80f2-23100a18f544';

    var STANDARD = {
        etikett: 'Nyhetsbrev',
        titel: 'Fysiklabbets nyhetsbrev',
        ingress: 'Veckans fysiknyheter och nytt material på Fysiklabbet, samlat i ett '
               + 'mejl i veckan. Utvalt och förklarat så att det går att ta med in i '
               + 'klassrummet.',
        finstilt: 'Du får ett bekräftelsemejl innan prenumerationen startar. '
                + 'Avsluta när du vill — varje utskick har en avanmälningslänk.',
    };

    // Skriptets egna meddelanden är på engelska och går inte att ändra i
    // deras gränssnitt. Vi byter ut dem när de dyker upp.
    var FEL = {
        'Your email address is required.':
            'Du behöver fylla i din e-postadress.',
        'Your email address looks incorrect, please try again.':
            'E-postadressen ser inte riktig ut — kontrollera den och försök igen.',
        "This doesn't look like a human submission.":
            'Anmälan stoppades av skräppostskyddet. Ladda om sidan och försök igen.',
        'Please check the checkbox to indicate your consent.':
            'Du behöver kryssa i rutan för att ge ditt samtycke.',
        'This form has missing or invalid fields.':
            'Något fält saknas eller är felaktigt ifyllt.',
        'This form is not connected to a list.':
            'Formuläret är inte kopplat till någon lista — hör gärna av dig, så fixar vi det.',
        'Sorry, an unknown error has occurred. Please try again later.':
            'Något gick fel. Försök gärna igen om en stund.',
    };

    /* ── Utseende ──────────────────────────────────────────────────────
       Flyttad hit från nyheter.html. Färgerna kommer från
       styles-laborans.css (--lab-*), som varje sida med rutan laddar.

       Varje regel prefixas med .nb-box, även när klassen ensam hade räckt.
       Rutan ska se likadan ut på alla sidor, och en sida kan ha egna
       typografiregler som är starkare: .lab-about-block p på om.html ligger
       på (0,2,0) och gjorde ingressen 16 px och finstilten 16 px i stället
       för 15,5 och 10,5. Med .nb-box-prefixet blir vi lika starka, och
       eftersom denna <style> injiceras i huvudet EFTER stilmallen vinner
       vår regel vid lika specificitet. */
    var CSS = [
        '.nb-box {',
        '    margin: 44px 0 10px; padding: 30px 34px 24px;',
        '    border: 1px solid var(--lab-line-strong);',
        '    border-top: 3px solid var(--lab-accent);',
        '    border-radius: 4px; background: var(--lab-bg-panel);',
        '}',
        '.nb-box .nb-title {',
        '    font-family: var(--lab-font-display);',
        '    font-size: clamp(26px, 3.2vw, 34px); line-height: 1.06;',
        '    letter-spacing: -0.01em; color: var(--lab-ink); margin: 9px 0 11px;',
        '}',
        '.nb-box .nb-lead {',
        '    font-size: 15.5px; line-height: 1.6; color: var(--lab-ink-soft);',
        '    max-width: 58ch; margin: 0 0 18px;',
        '}',
        '.nb-box .nb-fine {',
        '    font-family: var(--lab-font-mono); font-size: 11px;',
        '    letter-spacing: 0.04em; line-height: 1.6;',
        '    color: var(--lab-ink-muted); margin: 13px 0 0;',
        '}',
        /* Höjden reserveras så att sidan inte hoppar när formuläret laddas in. */
        '.nb-box .nb-form { min-height: 46px; }',
        '.nb-box .nb-klar {',
        '    font-size: 15.5px; line-height: 1.6; color: var(--lab-ink);',
        '    max-width: 62ch;',
        '    padding: 14px 16px; border-radius: 4px;',
        '    background: var(--lab-accent-soft);',
        '    border-left: 3px solid var(--lab-accent);',
        '}',
        /* Formuläret är dolt efter anmälan — låt inte den reserverade
           höjden stå kvar som ett tomrum under kvittot. */
        '.nb-box.is-klar .nb-form { min-height: 0; }',
        /* På smal skärm äter 34 px sidopadding upp textspalten. */
        '@media (max-width: 620px) {',
        '    .nb-box { margin: 32px 0 10px; padding: 24px 20px 20px; }',
        '}',

        /* Omklädnad av EmailOctopus-formuläret.
           Deras injicerade CSS är i sin helhet scopad till [data-form="…"],
           så inget läcker ut i sidan. Nästan allt styrs av variabler —
           skriv över dem hellre än att slåss mot enskilda regler. De egna
           reglerna nedan behöver ändå !important på sina håll eftersom
           Bootstraps hjälpklasser (.w-100, .mb-2) använder det.

           Varje regel prefixas med BÅDE .nb-box och .nb-form. Det är inte
           slarv: deras egna selektorer ligger på (0,3,1) och injiceras SENARE
           i dokumentet än vår <style>, så vid lika specificitet vinner de.
           Färgvariablerna sitter dessutom på <form> (.emailoctopus-form),
           inte på wrappern — sätts de på wrappern skuggas de av formulärets
           egen deklaration och knappen förblir EmailOctopus-lila. */
        '.nb-box .nb-form [data-form] {',
        '    --font-family: var(--lab-font-sans);',
        '    --base-font-size: 15px;',
        '    --text-colour: var(--lab-ink);',
        '}',
        '.nb-box .nb-form [data-form] .emailoctopus-form {',
        '    --label-colour: var(--lab-ink);',
        '    --field-colour: var(--lab-bg);',
        '    --field-border-colour: var(--lab-line-strong);',
        '    --button-colour: var(--lab-accent);',
        '    --button-text-colour: #ffffff;',
        '}',
        /* Deras rubrik, ingress och kvittotext — vi sätter egna ovanför.
           Rubriken är dessutom en <h1>, och sidan har redan en. */
        '.nb-box .nb-form [data-form] [eo-block="title"],',
        '.nb-box .nb-form [data-form] [eo-block="text"],',
        '.nb-box .nb-form [data-form] .emailoctopus-success-message { display: none; }',
        '.nb-box .nb-form [data-form] [eo-block="form"] { margin: 0 !important; padding: 0 !important; }',
        /* Deras .form-container har margin: 0 40px och drog in hela
           formuläret jämfört med rubriken ovanför. */
        '.nb-box .nb-form [data-form] .form-container { margin: 0 !important; }',
        /* max-width: annars flyger knappen ut till högerkanten på breda
           sidor (startsidan är 1168 px mot artikelspaltens 704 px). */
        '.nb-box .nb-form [data-form] .main-form {',
        '    display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch;',
        '    max-width: 560px;',
        '}',
        '.nb-box .nb-form [data-form] .emailoctopus-form-row {',
        '    flex: 1 1 250px; margin: 0 !important;',
        '}',
        /* Etiketten döljs visuellt men läses fortfarande av skärmläsare. */
        '.nb-box .nb-form [data-form] .emailoctopus-form-row label {',
        '    position: absolute; width: 1px; height: 1px;',
        '    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;',
        '}',
        '.nb-box .nb-form [data-form] input.form-control {',
        '    height: 46px; border-radius: 4px; padding: 0 14px;',
        '    border: 1px solid var(--lab-line-strong);',
        '    color: var(--lab-ink); font-size: 15px;',
        '}',
        '.nb-box .nb-form [data-form] input.form-control:focus {',
        '    border-color: var(--lab-accent); box-shadow: none;',
        '}',
        '.nb-box .nb-form [data-form] input[type="submit"] {',
        '    flex: 0 0 auto; width: auto !important;',
        '    height: 46px; padding: 0 28px; margin: 0 !important;',
        '    border-radius: 4px; border: 1px solid var(--lab-accent);',
        '    font-family: var(--lab-font-mono); font-size: 12px;',
        '    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;',
        '}',
        '.nb-box .nb-form [data-form] input[type="submit"]:hover { opacity: 0.9; }',
        '.nb-box .nb-form [data-form] .emailoctopus-error-message {',
        '    font-size: 14.5px; line-height: 1.5; text-align: left !important;',
        '    color: var(--lab-accent); margin: 0 0 10px;',
        '}',
        /* Deras skript döljer formuläret vid lyckad anmälan. Vi gör det också,
           så att kvittot aldrig kan hamna ovanför ett fortfarande synligt fält. */
        '.nb-box.is-klar .nb-form [data-form] .emailoctopus-form { display: none; }',
        /* Signaturen är en inline-block i en .text-center-behållare, så det är
           FÖRÄLDERNS centrering som måste slås ut — inte signaturens egen. */
        '.nb-box .nb-form [data-form] .text-center { text-align: left !important; }',
        '.nb-box .nb-form [data-form] .mastfoot {',
        '    font-family: var(--lab-font-mono); font-size: 10px;',
        '    letter-spacing: 0.04em; margin-top: 12px !important;',
        '}',
        /* font-size även på <p>: en sidas egen styckeregel (om.html har
           .lab-about-block p på 16 px) träffar stycket direkt och slår
           annars ut den ärvda storleken från .mastfoot. */
        '.nb-box .nb-form [data-form] .mastfoot p {',
        '    color: var(--lab-ink-muted); margin: 0; font-size: 10px; line-height: 1.5;',
        '}',
        '.nb-box .nb-form [data-form] .mastfoot a { color: var(--lab-ink-muted); }',
    ].join('\n');

    var cssKlar = false;
    function injiceraCSS() {
        if (cssKlar) return;
        cssKlar = true;
        var style = document.createElement('style');
        style.setAttribute('data-nyhetsbrev-css', '');
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    // Den ruta som äger formuläret just nu. React monterar om vyer (lista →
    // artikel), och då är den gamla rutan borta ur dokumentet — då får nästa
    // ruta ta över.
    var aktiv = null;

    function laddaFormular(hallare) {
        // Skriptet väger ~230 kB. Det hämtas därför först när rutan närmar sig
        // vyn, så att en besökare som aldrig skrollar dit slipper det helt.
        var laddad = false;
        var ladda = function () {
            if (laddad) return;
            laddad = true;
            // Finns formuläret redan (t.ex. en ruta som just avmonterats men
            // vars DOM ligger kvar) ska vi inte lägga till ett andra.
            if (document.querySelector('[data-form="' + FORM_ID + '"]')) return;
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://eomail5.com/form/' + FORM_ID + '.js';
            s.setAttribute('data-form', FORM_ID);
            hallare.appendChild(s);   // skriptet ersätter sig själv med formuläret
        };

        if (!('IntersectionObserver' in window)) { ladda(); return function () {}; }
        var io = new IntersectionObserver(function (poster) {
            for (var i = 0; i < poster.length; i++) {
                if (poster[i].isIntersecting) { ladda(); io.disconnect(); return; }
            }
        }, { rootMargin: '400px' });
        io.observe(hallare);
        return function () { io.disconnect(); };
    }

    /**
     * Monterar anmälningsrutan i `el`. Returnerar en städfunktion.
     * opts (eller data-attribut på elementet): titel, ingress, etikett.
     */
    function mount(el, opts) {
        if (!el || el.getAttribute('data-nb-monterad') === '1') return function () {};
        // Rutan får bara finnas en gång per sida — se filhuvudet.
        if (aktiv && aktiv !== el && aktiv.isConnected) return function () {};

        opts = opts || {};
        var d = el.dataset || {};
        var titel = opts.titel || d.titel || STANDARD.titel;
        var ingress = opts.ingress || d.ingress || STANDARD.ingress;
        var etikett = opts.etikett || d.etikett || STANDARD.etikett;

        injiceraCSS();
        el.setAttribute('data-nb-monterad', '1');
        aktiv = el;

        var box = document.createElement('aside');
        // no-begrepp: ordlistans autolänkare ska inte plocka ord ur rutan.
        box.className = 'nb-box no-begrepp';

        var mono = document.createElement('span');
        mono.className = 'lab-mono-label';
        mono.textContent = etikett;

        var rubrik = document.createElement('h2');
        rubrik.className = 'nb-title';
        rubrik.textContent = titel;

        var lead = document.createElement('p');
        lead.className = 'nb-lead';
        lead.textContent = ingress;

        var hallare = document.createElement('div');
        hallare.className = 'nb-form';

        var fin = document.createElement('p');
        fin.className = 'nb-fine';
        fin.textContent = STANDARD.finstilt;

        box.appendChild(mono);
        box.appendChild(rubrik);
        box.appendChild(lead);
        box.appendChild(hallare);
        box.appendChild(fin);
        el.appendChild(box);

        var stoppaIO = laddaFormular(hallare);

        // Deras kvittotext är hårdkodad på engelska; vi visar en egen.
        var onSuccess = function (e) {
            if (!e.detail || e.detail.form_id !== FORM_ID) return;
            box.classList.add('is-klar');
            lead.className = 'nb-klar';
            lead.innerHTML = '<strong>Tack!</strong> Kolla din inkorg — vi har skickat '
                + 'ett mejl där du bekräftar din adress. Prenumerationen startar först '
                + 'när du har klickat på länken i det.';
            fin.remove();
        };
        document.addEventListener('emailoctopus:form.success', onSuccess);

        // Felmeddelandena skrivs rakt in i DOM:en av deras skript.
        var mo = new MutationObserver(function () {
            var p = hallare.querySelector('.emailoctopus-error-message');
            if (!p) return;
            var sv = FEL[p.textContent.trim()];
            if (sv) p.textContent = sv;
        });
        mo.observe(hallare, { childList: true, subtree: true, characterData: true });

        return function () {
            stoppaIO();
            mo.disconnect();
            document.removeEventListener('emailoctopus:form.success', onSuccess);
            if (aktiv === el) aktiv = null;
        };
    }

    function mountAll(root) {
        var noder = (root || document).querySelectorAll('[data-nyhetsbrev]');
        for (var i = 0; i < noder.length; i++) mount(noder[i]);
    }

    window.FYSIKNYHETSBREV = { mount: mount, mountAll: mountAll, FORM_ID: FORM_ID };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { mountAll(); });
    } else {
        mountAll();
    }
})();
