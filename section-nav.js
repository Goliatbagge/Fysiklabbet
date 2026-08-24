/* section-nav.js — injicerar avsnittsväxlaren (Teori / Simulering / Övningar)
 * högst upp på simuleringssidor, så att man alltid lätt kan växla mellan
 * avsnittets vyer.
 *
 * Kräver att window.KATALOG (data/katalog.js) är laddad FÖRE detta skript.
 * Skriptet slår upp sidans filnamn mot katalogens section.href, härleder
 * hashen #fyN-K.A och länkar Teori → katalog, Simulering → (nuvarande sida),
 * Övningar → katalog med :ovningar-suffix.
 *
 * ⚠️ TVÅ SIMULERINGAR PÅ SAMMA AVSNITT (href2 i data/katalog.js):
 * då får BÅDA en egen ruta i raden, med sina namn ur data/simuleringar.js
 * (SIM_NAMES) — filen hämtas automatiskt om sidan inte redan laddat den.
 * Det är den GARANTERADE vägen mellan avsnittets simuleringar: katalogen
 * länkar bara till `href`, så utan detta blir `href2`-simuleringen
 * oåtkomlig från katalogen (hände 2026-08-23: flugan gick inte att nå från
 * astronauten). Enskilda sidor får gärna ha egna flikar i sitt sidhuvud
 * också, men de är ett komplement — aldrig den enda vägen.
 * `node .claude/verify-sim-vaxlare.js` kontrollerar detta.
 *
 * Hoppar över när sidan körs inbäddad i en wrapper-iframe (?embed eller
 * window.top !== window.self) — då sköter wrappern navigationen.
 */
(function () {
    'use strict';

    // Kör inte i iframe (embed-läge) — wrappern äger navigationen då.
    try { if (window.top !== window.self) return; } catch (e) { return; }
    if (new URLSearchParams(window.location.search).has('embed')) return;
    if (!window.KATALOG) return;

    const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (!file) return;

    // Hitta avsnittet vars href matchar denna fil.
    let found = null;
    const subjects = window.KATALOG;
    for (const subjKey in subjects) {
        const courses = (subjects[subjKey] && subjects[subjKey].courses) || {};
        for (const courseKey in courses) {
            const chapters = (courses[courseKey] && courses[courseKey].chapters) || {};
            for (const chapKey in chapters) {
                const sections = chapters[chapKey].sections || [];
                for (const sec of sections) {
                    if ((sec.href && sec.href.toLowerCase() === file) ||
                        (sec.href2 && sec.href2.toLowerCase() === file)) {
                        found = { courseKey, sec };
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (found) break;
    }
    if (!found) return;

    const n = found.courseKey === 'Fysik nivå 1' ? '1' : '2';
    const base = 'katalog.html#fy' + n + '-' + found.sec.num;

    // Stilar (laborans-tema, samma look som katalogens kort).
    const style = document.createElement('style');
    style.textContent = [
        '.secnav{display:flex;gap:8px;flex-wrap:wrap;max-width:1400px;',
        'margin:14px auto 0;padding:0 2rem;font-family:Poppins,sans-serif;box-sizing:border-box;}',
        '.secnav a,.secnav .secnav-cur{display:flex;flex-direction:column;gap:1px;',
        'background:var(--lab-bg,#f3eee4);color:var(--lab-ink,#0f1620);',
        'border:1px solid var(--lab-line-strong,rgba(15,22,32,0.28));border-radius:10px;',
        'padding:8px 18px;text-decoration:none;min-width:116px;transition:border-color .15s ease;}',
        '.secnav a:hover{border-color:var(--lab-accent,#c8324a);}',
        '.secnav .secnav-cur{background:var(--lab-ink,#0f1620);color:var(--lab-bg,#f3eee4);',
        'border-color:var(--lab-ink,#0f1620);cursor:default;}',
        '.secnav .secnav-tag{font-size:10px;letter-spacing:.12em;text-transform:uppercase;',
        'opacity:.65;font-family:var(--lab-font-mono,monospace);}',
        // overflow-wrap: ett långt simuleringsnamn utan mellanslag
        // ("Gaffelbalansen") ska brytas i stället för att spilla ut ur rutan.
        '.secnav .secnav-title{font-weight:600;font-size:15px;overflow-wrap:anywhere;}',
        '@media(max-width:560px){.secnav{padding:0 1rem;gap:6px;}',
        '.secnav a,.secnav .secnav-cur{min-width:0;flex:1 1 0;padding:7px 10px;align-items:center;',
        'text-align:center;}',
        // Har avsnittet TVÅ simuleringar blir raden fyra rutor bred, och då
        // finns det inte plats för namnen på en telefon. Lägg dem i 2 × 2.
        '.secnav--multi a,.secnav--multi .secnav-cur{flex:1 1 calc(50% - 3px);}',
        '.secnav .secnav-title{font-size:13px;}}'
    ].join('');
    document.head.appendChild(style);

    const sec = found.sec;

    // Avsnittets simuleringar i ordning: href (+ href2 när det finns).
    const simHrefs = [sec.href].concat(sec.href2 ? [sec.href2] : []).filter(Boolean);

    // Namnet på en simulering hämtas ur SIM_NAMES, som kan vara en sträng
    // (en sim), en array av strängar eller en array av objekt där `href`
    // utelämnas för avsnittets egen fil. Se huvudet i data/simuleringar.js.
    function simName(target, index) {
        const entry = window.SIM_NAMES && window.SIM_NAMES[sec.href];
        if (!entry) return null;
        if (typeof entry === 'string') return entry;
        if (!Array.isArray(entry)) return null;
        for (const e of entry) {
            if (e && typeof e === 'object' &&
                (e.href || sec.href).toLowerCase() === target.toLowerCase()) return e.name;
        }
        return typeof entry[index] === 'string' ? entry[index] : null;
    }

    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    function build() {
        const bar = document.createElement('nav');
        bar.className = simHrefs.length > 1 ? 'secnav secnav--multi' : 'secnav';
        bar.setAttribute('aria-label', 'Avsnittsväxlare');

        let mid = '';
        simHrefs.forEach((h, i) => {
            const current = h.toLowerCase() === file;
            // Med bara en simulering behålls den gamla etiketten "Simulering";
            // med två visas simuleringarnas egna namn så att de går att skilja åt.
            const title = simHrefs.length === 1
                ? 'Simulering'
                : (simName(h, i) || 'Simulering ' + (i + 1));
            const inner = '<span class="secnav-tag">Experiment</span>' +
                '<span class="secnav-title">' + esc(title) + '</span>';
            mid += current
                ? '<span class="secnav-cur">' + inner + '</span>'
                : '<a href="' + esc(h) + '">' + inner + '</a>';
        });

        bar.innerHTML =
            '<a href="' + base + '"><span class="secnav-tag">Läsning</span>' +
            '<span class="secnav-title">Teori</span></a>' +
            mid +
            '<a href="' + base + ':ovningar"><span class="secnav-tag">Räkna</span>' +
            '<span class="secnav-title">Övningar</span></a>';

        if (document.querySelector('.secnav')) return; // undvik dubbletter
        const header = document.querySelector('.lab-header');
        if (header && header.parentNode) {
            header.parentNode.insertBefore(bar, header.nextSibling);
        } else {
            document.body.insertBefore(bar, document.body.firstChild);
        }
    }

    const insert = function () {
        // Två simuleringar men SIM_NAMES saknas på sidan → hämta namnen.
        // Utan detta skulle rutorna heta "Simulering 1"/"Simulering 2".
        if (simHrefs.length > 1 && !window.SIM_NAMES) {
            const s = document.createElement('script');
            s.src = 'data/simuleringar.js';
            s.onload = build;
            s.onerror = build;
            document.head.appendChild(s);
        } else {
            build();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insert);
    } else {
        insert();
    }
})();
