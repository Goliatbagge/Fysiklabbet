/* ============================================================
   sim-dock.js — "Dölj verktyg" i fullskärm på smal skärm
   ----------------------------------------------------------------
   På mobil dockas verktygsrutorna (.fs-sliders, .scene-toggles,
   .fs-controls) UNDER scenen i stället för ovanpå den — se sektion 8
   i styles-laborans-sim.css. Docken kan bli hög på en telefon, så
   detta skript lägger till ett handtag som fäller ihop den och ger
   scenen hela skärmen.

   Handtaget skapas bara när ALLA dessa gäller:
     • scenen är i fullskärm,
     • skärmen är ≤600 px bred (annars ligger rutorna som overlay
       i lediga scenhörn och är inte i vägen),
     • wrappern innehåller minst en verktygsruta.

   Har simuleringen ett eget .fs-toggle-handle ("Dölj reglage", som
   bara fäller .fs-controls) göms det på mobil av CSS:en — annars
   skulle docken få två snarlika fäll-knappar. På mobil styr detta
   handtag hela docken; på desktop är simuleringens eget handtag
   kvar och sköter overlay-panelen som förut.

   Skriptet mäter också scenens höjd och väljer disposition:

     • normalfallet — scenen har egen proportion (SVG med viewBox) och
       tar ~1/3 av skärmen: verktygen dockas UNDER den.
     • ark-läget (.dock-overlay) — scenen är en canvas/div som JS
       skalat till hela skärmen, så det finns ingen ledig yta under.
       Verktygen läggs då som ett ark över scenens nedre del. CSS kan
       inte mäta höjder, därför sätts klassen här.

   Skriptet rör aldrig React-komponenternas egna noder — det lägger
   bara till/tar bort sitt eget handtag sist i wrappern och klasser
   (.dock-collapsed, .dock-overlay, .dock-media).
   ============================================================ */
(function () {
    'use strict';

    var MOBIL = '(max-width: 600px)';
    var WRAPPERS = ['scene-wrap', 'canvas-wrap', 'wave-stage'];
    var VERKTYG = '.fs-sliders, .scene-toggles, .fs-controls';
    var PANELER = ['fs-sliders', 'scene-toggles', 'fs-controls', 'scene-hint', 'fs-quick'];
    var KNAPPAR = ['fs-btn', 'fs-toggle-handle', 'fs-dock-handle'];
    // Över så stor andel av skärmhöjden räknas scenen som "fyller skärmen"
    // och docken läggs som ark i nederkanten i stället för under scenen.
    var ARK_GRANS = 0.62;

    var CARET_UPP = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
        'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true"><path d="M2.5 7.5 6 4l3.5 3.5"/></svg>';
    var CARET_NED = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
        'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';

    function fullskarmsWrapper() {
        var el = document.fullscreenElement || document.webkitFullscreenElement;
        if (!el || !el.classList) return null;
        for (var i = 0; i < WRAPPERS.length; i++) {
            if (el.classList.contains(WRAPPERS[i])) return el;
        }
        return null;
    }

    /* Scenen = första barnet i flödet som varken är en verktygsruta
       eller en knapp. */
    function scenElement(wrap) {
        var barn = wrap.children;
        for (var i = 0; i < barn.length; i++) {
            var c = barn[i], k = c.classList;
            if (PANELER.some(function (p) { return k.contains(p); })) continue;
            if (KNAPPAR.some(function (p) { return k.contains(p); })) continue;
            var pos = getComputedStyle(c).position;
            if (pos === 'fixed') continue;
            if (pos === 'absolute' && !k.contains('dock-media')) continue;
            return c;
        }
        return null;
    }

    /* Väljer dock under scenen eller ark över dess nederkant. */
    function valjLage(wrap) {
        var scen = scenElement(wrap);
        wrap.querySelectorAll('.dock-media').forEach(function (e) {
            if (e !== scen) e.classList.remove('dock-media');
        });
        if (!scen) { wrap.classList.remove('dock-overlay'); return; }
        // Mät utan ark-läget påslaget, annars mäter vi vår egen effekt
        var hadeArk = wrap.classList.contains('dock-overlay');
        if (hadeArk) { wrap.classList.remove('dock-overlay'); scen.classList.remove('dock-media'); }
        var fyllerSkarmen = scen.getBoundingClientRect().height > ARK_GRANS * window.innerHeight;
        if (fyllerSkarmen) {
            scen.classList.add('dock-media');
            wrap.classList.add('dock-overlay');
        }
    }

    function markera(handtag, hopfalld) {
        handtag.innerHTML = (hopfalld ? CARET_NED : CARET_UPP) +
            '<span>' + (hopfalld ? 'Visa verktyg' : 'Dölj verktyg') + '</span>';
        handtag.setAttribute('aria-expanded', hopfalld ? 'false' : 'true');
    }

    /* Utgångsläge. I dockat läge står verktygen ALLTID utfällda: de skymmer
       inget (de ligger under scenen), och att behöva trycka fram dem vore
       ett steg i vägen — lite skroll i nederkanten är normalt på en telefon.
       I ARK-läget täcker de däremot scenens nedre del, så där möter eleven
       en ren scen och fäller fram verktygen själv.

       Räknas om vid varje synk ända till användaren själv rört handtaget
       (dockUser), eftersom React ofta renderar verktygsrutorna en bit EFTER
       att fullskärmen slagits på — då hinner ett enda mätvärde bli fel. */
    function utgangslage(wrap, handtag) {
        if (wrap.dataset.dockUser === '1') return;
        var ark = wrap.classList.contains('dock-overlay');
        wrap.classList.toggle('dock-collapsed', ark);
        markera(handtag, ark);
    }

    function skapaHandtag(wrap) {
        var handtag = document.createElement('button');
        handtag.type = 'button';
        handtag.className = 'fs-dock-handle';
        handtag.setAttribute('aria-label', 'Visa eller dölj verktygen');
        markera(handtag, wrap.classList.contains('dock-collapsed'));
        handtag.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            wrap.dataset.dockUser = '1';        // härefter bestämmer användaren
            var hopfalld = wrap.classList.toggle('dock-collapsed');
            markera(handtag, hopfalld);
            if (!hopfalld) wrap.scrollTop = 0;
        });
        wrap.appendChild(handtag);
        return handtag;
    }

    /* Nollställer allt skriptet satt utanför den aktiva wrappern. */
    function stad(aktivWrap) {
        document.querySelectorAll('.fs-dock-handle').forEach(function (h) {
            if (h.parentElement !== aktivWrap) h.remove();
        });
        document.querySelectorAll('.dock-media').forEach(function (e) {
            if (e.parentElement !== aktivWrap) e.classList.remove('dock-media');
        });
        WRAPPERS.forEach(function (kl) {
            document.querySelectorAll('.' + kl).forEach(function (w) {
                if (w === aktivWrap) return;
                w.classList.remove('dock-overlay', 'dock-collapsed');
                delete w.dataset.dockUser;
            });
        });
    }

    function synka() {
        var wrap = fullskarmsWrapper();
        var aktiv = wrap && window.matchMedia && window.matchMedia(MOBIL).matches
                    && wrap.querySelector(VERKTYG);
        stad(aktiv ? wrap : null);
        if (!aktiv) return;
        var handtag = wrap.querySelector('.fs-dock-handle') || skapaHandtag(wrap);
        valjLage(wrap);
        utgangslage(wrap, handtag);
    }

    // React kan rendera om verktygsrutorna EFTER att fullskärm slagits på
    // (t.ex. `{isFullscreen && <div className="fs-sliders">…}`), så kolla
    // en gång till strax efter lägesbytet.
    function synkaSnart() {
        synka();
        setTimeout(synka, 60);
        setTimeout(synka, 400);
    }

    document.addEventListener('fullscreenchange', synkaSnart);
    document.addEventListener('webkitfullscreenchange', synkaSnart);
    window.addEventListener('resize', synka);
    window.addEventListener('orientationchange', synkaSnart);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', synka);
    } else {
        synka();
    }
})();
