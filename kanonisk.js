/**
 * Kanonisk adress för sidor som visar ALLT sitt innehåll i EN HTML-fil.
 *
 * Bakgrunden: katalog.html, np.html, fysik-repetition.html, nyheter.html och
 * begrepp.html levererar byte-identisk HTML för alla sina hundratals
 * ?id=- och ?ord=-adresser — innehållet byggs av React efter laddning.
 * Utan en kanonisk tagg ser Google en hög identiska sidor, grupperar dem som
 * dubbletter och väljer SJÄLV en representant per grupp. Resten hamnar under
 * "Dubblett utan att användaren valt en kanonisk sida" i Search Console och
 * indexeras inte alls.
 *
 * Den här filen låter varje sida peka ut sin egen adress i stället, samma
 * adress som står i sitemap.xml. Taggen sätts om varje gång användaren
 * navigerar i React-state (sidorna skriver aldrig om adressfältet, se
 * "Adresser till teoriavsnitt" i CLAUDE.md), så den speglar alltid det
 * avsnitt som faktiskt visas.
 *
 * Anropas ur samma useEffect som redan sätter document.title.
 *
 * OBS: detta hjälper Google, som kör JavaScript. Robotar som INTE gör det
 * (Facebook, LinkedIn) ser fortfarande bara den statiska <head> — för dem
 * finns de förrenderade sidorna i nyheter/dela/ och katalog/dela/.
 */
(function () {
    'use strict';

    var BAS = 'https://fysiklabbet.se/';

    /**
     * @param {string} relativUrl  t.ex. 'katalog.html?id=fy1-3.2' eller
     *                             'nyheter.html' för en listvy.
     */
    function sattKanonisk(relativUrl) {
        if (!relativUrl) return;
        var el = document.querySelector('link[rel="canonical"]');
        if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', 'canonical');
            document.head.appendChild(el);
        }
        el.setAttribute('href', BAS + String(relativUrl).replace(/^\//, ''));
    }

    window.sattKanonisk = sattKanonisk;
})();
