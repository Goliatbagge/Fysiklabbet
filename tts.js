// ============================================================
// Fysiklabbet: uppläsningsspelare (talsyntes)
//
// Spelar förgenererade MP3-uppläsningar (edge-tts, sv-SE-SofieNeural)
// av teoriavsnitt och nyhetsartiklar, med medföljande markering av
// aktuell mening i texten. Ljud + tidsstämpel-JSON genereras av
// data/tts/build-manus.js + data/tts/generate-audio.py och ligger i
// audio/tts/<kind>/<id>.{mp3,json}.
//
// Användning (kräver att data/tts/manus-lib.js laddats först):
//   const cleanup = window.FYSIKTTS.mount(hostEl, {
//       kind: 'teori' | 'nyheter',
//       id: 'fy1-7.9',
//       getContainer: () => document.querySelector('.lab-article-body-inline'),
//   });
// Panelen renderas i hostEl; finns inget ljud för id:t förblir hostEl tom.
// Returvärdet är en cleanup-funktion (stoppar ljudet, tömmer hostEl).
// ============================================================

(function () {
    'use strict';

    const CSS = `
.fys-tts {
    background: linear-gradient(180deg, #fbf8f1, #f5efe2);
    border: 1px solid rgba(15, 22, 32, 0.16);
    border-radius: 12px;
    padding: 12px 16px;
    margin: 0 0 22px;
    color: #0f1620;
    font-size: 14px;
}
.fys-tts-row { display: flex; align-items: center; gap: 12px; }
.fys-tts-btn {
    flex: 0 0 auto;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(15, 22, 32, 0.85);
    background: #0f1620;
    color: #f7f2e8;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
.fys-tts-btn:hover { background: #243040; }
.fys-tts-btn svg { display: block; }
.fys-tts-mid { flex: 1 1 auto; min-width: 0; }
.fys-tts-title {
    font-weight: 600;
    font-size: 13.5px;
    line-height: 1.3;
}
.fys-tts-sub {
    font-size: 12px;
    opacity: 0.65;
    line-height: 1.3;
}
.fys-tts-seek {
    display: none;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}
.fys-tts.is-started .fys-tts-seek { display: flex; }
.fys-tts-range {
    flex: 1 1 auto;
    accent-color: #0f1620;
    height: 22px;
    margin: 0;
    cursor: pointer;
}
.fys-tts-time {
    flex: 0 0 auto;
    font-variant-numeric: tabular-nums;
    font-size: 12px;
    opacity: 0.7;
    white-space: nowrap;
}
.fys-tts-rate {
    flex: 0 0 auto;
    font: inherit;
    font-size: 12.5px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid rgba(15, 22, 32, 0.35);
    background: transparent;
    color: inherit;
    cursor: pointer;
    white-space: nowrap;
}
.fys-tts-rate:hover { border-color: rgba(15, 22, 32, 0.85); }
.tts-current {
    background: rgba(214, 158, 46, 0.22);
    outline: 2px solid rgba(214, 158, 46, 0.55);
    outline-offset: 3px;
    border-radius: 4px;
    transition: background 0.25s ease;
}
`;

    let cssInjected = false;
    function injectCss() {
        if (cssInjected) return;
        cssInjected = true;
        const st = document.createElement('style');
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    const ICON_PLAY =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M8 5.5v13l11-6.5z"/></svg>';
    const ICON_PAUSE =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<rect x="7" y="5" width="3.4" height="14" rx="1"/>' +
        '<rect x="13.6" y="5" width="3.4" height="14" rx="1"/></svg>';
    const ICON_SPEAKER =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
        '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';

    const RATES = [1, 1.25, 1.5, 0.75];

    function fmtTime(sec) {
        sec = Math.max(0, Math.round(sec || 0));
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return m + ':' + String(s).padStart(2, '0');
    }

    function fmtRate(r) {
        return (r === 1 ? '1' : String(r).replace('.', ',')) + '×';
    }

    // Normalisera text för segmentmatchning manus ↔ sida
    function norm(s) {
        return String(s).toLowerCase().replace(/[^0-9a-zåäöé]+/g, '');
    }

    // Koppla manussegmenten (med tidsstämplar) till sidans element.
    // Sidans DOM kan skilja sig något från exportsidans (t.ex. katalogens
    // formelruta-ombyggnad), så matchningen är en tvåpekare med fönster.
    function alignSegments(metaSegs, pageSegs) {
        let j = 0;
        return metaSegs.map((ms) => {
            const target = norm(ms.t);
            if (!target) return null;
            for (let k = j; k < Math.min(j + 6, pageSegs.length); k++) {
                const cand = norm(pageSegs[k].text);
                if (cand === target || cand.indexOf(target) >= 0 || target.indexOf(cand) >= 0) {
                    j = k + 1;
                    return pageSegs[k].el;
                }
            }
            return null;
        });
    }

    function mount(host, opts) {
        injectCss();
        const kind = opts.kind;
        const id = opts.id;
        const base = (opts.base || '') + 'audio/tts/' + kind + '/' + encodeURIComponent(id);
        const labels = kind === 'nyheter'
            ? { title: 'Lyssna på artikeln' }
            : { title: 'Lyssna på avsnittet' };

        let dead = false;
        let audio = null;
        let meta = null;
        let els = null;          // manussegment-index → sidelement (eller null)
        let currentEls = [];
        let rateIdx = 0;
        let raf = 0;

        host.innerHTML = '';

        fetch(base + '.json')
            .then((r) => (r.ok ? r.json() : null))
            .then((m) => {
                if (dead || !m || !m.segments || !m.segments.length) return;
                meta = m;
                build();
            })
            .catch(() => { /* inget ljud för detta id */ });

        function build() {
            const panel = document.createElement('div');
            panel.className = 'fys-tts';
            panel.innerHTML =
                '<div class="fys-tts-row">' +
                '  <button type="button" class="fys-tts-btn" aria-label="Läs upp texten">' + ICON_PLAY + '</button>' +
                '  <div class="fys-tts-mid">' +
                '    <div class="fys-tts-title">' + labels.title + '</div>' +
                '    <div class="fys-tts-sub">Uppläsning med talsyntes · ' +
                         fmtTime(meta.dur) + ' · texten markeras medan du lyssnar</div>' +
                '  </div>' +
                '</div>' +
                '<div class="fys-tts-seek">' +
                '  <input class="fys-tts-range" type="range" min="0" max="' + (meta.dur || 0) +
                '" step="0.1" value="0" aria-label="Position i uppläsningen">' +
                '  <span class="fys-tts-time">0:00 / ' + fmtTime(meta.dur) + '</span>' +
                '  <button type="button" class="fys-tts-rate" aria-label="Uppläsningshastighet">' +
                     fmtRate(RATES[0]) + '</button>' +
                '</div>';
            host.appendChild(panel);

            const btn = panel.querySelector('.fys-tts-btn');
            const range = panel.querySelector('.fys-tts-range');
            const timeEl = panel.querySelector('.fys-tts-time');
            const rateBtn = panel.querySelector('.fys-tts-rate');

            btn.addEventListener('click', () => {
                if (!audio) start();
                else if (audio.paused) audio.play();
                else audio.pause();
            });
            range.addEventListener('input', () => {
                if (audio) audio.currentTime = parseFloat(range.value);
            });
            rateBtn.addEventListener('click', () => {
                rateIdx = (rateIdx + 1) % RATES.length;
                rateBtn.textContent = fmtRate(RATES[rateIdx]);
                if (audio) audio.playbackRate = RATES[rateIdx];
            });

            function start() {
                audio = new Audio(base + '.mp3');
                audio.playbackRate = RATES[rateIdx];
                panel.classList.add('is-started');

                // Koppla manus → sidans element (först nu är KaTeX klar)
                try {
                    const container = opts.getContainer && opts.getContainer();
                    if (container && window.TTSMANUS) {
                        const pageSegs = window.TTSMANUS.extractSegments(container,
                            { names: !/^ma/.test(String(opts.id || '')) });
                        els = alignSegments(meta.segments, pageSegs);
                    }
                } catch (e) { els = null; }

                audio.addEventListener('play', () => { btn.innerHTML = ICON_PAUSE; tick(); });
                audio.addEventListener('pause', () => { btn.innerHTML = ICON_PLAY; cancelAnimationFrame(raf); });
                audio.addEventListener('ended', () => {
                    btn.innerHTML = ICON_PLAY;
                    cancelAnimationFrame(raf);
                    setHighlight([]);
                    audio.currentTime = 0;
                });
                audio.addEventListener('error', () => { panel.remove(); });
                audio.play();
            }

            function tick() {
                if (!audio || dead) return;
                const t = audio.currentTime;
                range.value = String(t);
                timeEl.textContent = fmtTime(t) + ' / ' + fmtTime(meta.dur);
                updateHighlight(t);
                raf = requestAnimationFrame(() => setTimeout(tick, 120));
            }
        }

        function updateHighlight(t) {
            if (!els) return;
            const active = [];
            for (let i = 0; i < meta.segments.length; i++) {
                const s = meta.segments[i];
                if (t >= s.s && t < s.e && els[i]) active.push(els[i]);
                if (s.s > t) break;
            }
            setHighlight(active);
        }

        function setHighlight(active) {
            let changed = active.length !== currentEls.length ||
                          active.some((el, i) => el !== currentEls[i]);
            if (!changed) return;
            currentEls.forEach((el) => el.classList.remove('tts-current'));
            active.forEach((el) => el.classList.add('tts-current'));
            // Följ med i texten — men bara om läsaren är kvar vid uppläsningen
            if (active[0]) {
                const r = active[0].getBoundingClientRect();
                const vh = window.innerHeight || 800;
                if (r.top > -vh * 0.5 && r.bottom < vh * 1.5) {
                    active[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }
            currentEls = active;
        }

        return function cleanup() {
            dead = true;
            cancelAnimationFrame(raf);
            if (audio) { audio.pause(); audio.src = ''; audio = null; }
            setHighlight([]);
            host.innerHTML = '';
        };
    }

    window.FYSIKTTS = { mount };
})();
