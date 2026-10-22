/* i18n/manifest.js — GENERERAD av .claude/i18n/bygg-manifest.js. Redigera inte.
 * Räknar upp de engelska överlägg och sidordlistor som finns, så att
 * i18n.js bara hämtar filer som verkligen finns. */
window.I18N_OVERLAYS = ["begrepp/a-k","begrepp/k-o","begrepp-sok","exittickets/fy1","exittickets/fy2","exittickets/ma1","exittickets/ma2","exittickets/ma3b","exittickets/ma3c","exittickets/ma4","exittickets/maspec","handskrift/fy1","katalog","nyheter/2026-10","nyheter/2026-a","ovningar/fy1-b","ovningar/fy1","ovningar/fy2-1","ovningar/fy2-2","ovningar/fy2-3","ovningar/ma1b","ovningar/ma1c-4","ovningar/ma1c-5","ovningar/ma1c-a","ovningar/ma2","ovningar/ma3c","simuleringar","teori/bundle"];
(function () {
    // i18n/gemensamt/*.js: ordlistor för delade skript (section-nav.js,
    // feedback.js …) — laddas på varje sida.
    window.I18N.skript('i18n/gemensamt.js');
    var SIDOR = ["avsnitt","begrepp","fysik-enhetskoll","fysik-repetition","index","katalog","kontakt","kopplingsschema","np","nyheter","nyhetsbrev","om","ovningsblad","sammanfattningar","sannolikhetskalkylator","simuleringar","slumpa-grupper"];
    var s = window.I18N && window.I18N._sida;
    if (s && SIDOR.indexOf(s) >= 0) window.I18N.skript('i18n/sidor/' + s + '.js');
})();
