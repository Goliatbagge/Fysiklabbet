/* section-nav.js — injicerar avsnittsväxlaren (Teori / Simulering / Övningar)
 * högst upp på simuleringssidor, så att man alltid lätt kan växla mellan
 * avsnittets tre vyer.
 *
 * Kräver att window.KATALOG (data/katalog.js) är laddad FÖRE detta skript.
 * Skriptet slår upp sidans filnamn mot katalogens section.href, härleder
 * hashen #fyN-K.A och länkar Teori → katalog, Simulering → (nuvarande sida),
 * Övningar → katalog med :ovningar-suffix.
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
                    if (sec.href && sec.href.toLowerCase() === file) {
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
        '.secnav .secnav-title{font-weight:600;font-size:15px;}',
        '@media(max-width:560px){.secnav{padding:0 1rem;gap:6px;}',
        '.secnav a,.secnav .secnav-cur{min-width:0;flex:1 1 0;padding:7px 10px;align-items:center;}',
        '.secnav .secnav-title{font-size:13px;}}'
    ].join('');
    document.head.appendChild(style);

    const bar = document.createElement('nav');
    bar.className = 'secnav';
    bar.setAttribute('aria-label', 'Avsnittsväxlare');
    bar.innerHTML =
        '<a href="' + base + '"><span class="secnav-tag">Läsning</span>' +
        '<span class="secnav-title">Teori</span></a>' +
        '<span class="secnav-cur"><span class="secnav-tag">Experiment</span>' +
        '<span class="secnav-title">Simulering</span></span>' +
        '<a href="' + base + ':ovningar"><span class="secnav-tag">Räkna</span>' +
        '<span class="secnav-title">Övningar</span></a>';

    const insert = function () {
        if (document.querySelector('.secnav')) return; // undvik dubbletter
        const header = document.querySelector('.lab-header');
        if (header && header.parentNode) {
            header.parentNode.insertBefore(bar, header.nextSibling);
        } else {
            document.body.insertBefore(bar, document.body.firstChild);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insert);
    } else {
        insert();
    }
})();
