/* ============================================================
   verify-mobil-scen.js
   ----------------------------------------------------------------
   Kontrollerar mobil-dispositionen i simuleringarna (sektion 8 i
   styles-laborans-sim.css): på en 390×744-skärm ska verktygsrutorna
   ligga UNDER scenen — aldrig ovanpå ritytan och aldrig utanför
   scenramen (där overflow:hidden klipper bort dem).

   Testar varje simulering i BÅDA lägena: normalläge och fullskärm.

   Kör:  node .claude/verify-mobil-scen.js [filnamn ...]
   Kräver dev-servern på port 8000 (python .claude/dev-server.py 8000)
   samt puppeteer-core i %TEMP%\pptr-test (samma som .shots/*-e2e.js).
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = 8000;
const VP = { width: 390, height: 744 };
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let puppeteer;
try {
    puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
} catch (e) {
    console.error('puppeteer-core hittades inte i %TEMP%\\pptr-test — hoppar över mobilkontrollen.');
    process.exit(0);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const argv = process.argv.slice(2);
const files = argv.length ? argv : fs.readdirSync(ROOT)
    .filter(f => /^fysik[12]-.*\.html$/.test(f))
    .filter(f => /styles-laborans-sim\.css/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));

// Mäter alla scenramar och deras verktygsrutor i sidan.
const MAT = function () {
    const PANELER = ['scene-toggles', 'fs-sliders', 'fs-controls', 'scene-hint', 'fs-quick'];
    const IGNORERA = ['fs-btn', 'fs-toggle-handle', 'fs-dock-handle'];
    const rect = e => { const r = e.getBoundingClientRect();
        return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                 right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1) }; };
    const out = [];
    document.querySelectorAll('.scene-wrap, .canvas-wrap, .wave-stage').forEach((w, i) => {
        const cs = getComputedStyle(w);
        const kids = [...w.children];
        const panelEls = kids.filter(c => PANELER.some(p => c.classList.contains(p)));
        // "Mediet" = första barnet som varken är en panel eller en knapp
        const media = kids.find(c => !PANELER.some(p => c.classList.contains(p))
                                  && !IGNORERA.some(p => c.classList.contains(p))
                                  && getComputedStyle(c).position !== 'absolute'
                                  && getComputedStyle(c).position !== 'fixed');
        out.push({
            i, cls: w.className.split(/\s+/)[0],
            // ark-läge: scenen fyller skärmen, verktygen ligger som ett
            // hopfällbart ark över dess nedre del (sim-dock.js sätter klassen)
            ark: w.classList.contains('dock-overlay'),
            // hidden = innehåll under kanten är OÅTKOMLIGT; auto/scroll = nåbart
            klipper: cs.overflowY === 'hidden' || cs.overflowY === 'clip',
            skrollbar: cs.overflowY === 'auto' || cs.overflowY === 'scroll',
            scrollTop: w.scrollTop,
            wrap: rect(w),
            media: media ? { tag: media.tagName.toLowerCase(), box: rect(media) } : null,
            paneler: panelEls.map(p => ({
                cls: PANELER.find(c => p.classList.contains(c)),
                pos: getComputedStyle(p).position,
                display: getComputedStyle(p).display,
                box: rect(p)
            })),
            // Avläsningsrutan hör på scenen — får aldrig hamna bakom verktygen
            info: (() => { const e = w.querySelector('.scene-info');
                           if (!e) return null;
                           const ics = getComputedStyle(e);
                           if (ics.display === 'none') return null;
                           // "ruta" = har synlig bakgrund, ram eller skugga
                           const bg = ics.backgroundColor;
                           const ruta = !(bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)')
                                     || parseFloat(ics.borderTopWidth) > 0
                                     || ics.boxShadow !== 'none';
                           return { box: rect(e), ruta,
                                    diskret: e.classList.contains('si-diskret') }; })(),
            handtag: (() => { const h = w.querySelector('.fs-dock-handle, .fs-toggle-handle');
                              return h ? { cls: h.className, box: rect(h) } : null; })(),
            fsbtn: (() => { const b = w.querySelector('.fs-btn'); return b ? rect(b) : null; })()
        });
    });
    return { vp: { w: innerWidth, h: innerHeight },
             fs: !!(document.fullscreenElement || document.webkitFullscreenElement), scener: out };
};

// Överlapp mellan två rektanglar, i px²
function overlapp(a, b) {
    const w = Math.min(a.right, b.right) - Math.max(a.x, b.x);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y);
    return (w > 1 && h > 1) ? Math.round(w * h) : 0;
}

function granska(m, lage) {
    const fel = [], varning = [];
    m.scener.forEach(s => {
        const namn = `${s.cls}[${s.i}]`;
        // 0. Ramen får inte kollapsa (händer om alla barn är ur flödet
        //    och höjden satts till auto) och mediet måste synas i den
        if (s.wrap.h < 40) {
            fel.push(`${lage}: ${namn} har kollapsat till ${s.wrap.h} px höjd`);
        } else if (s.media && s.klipper && s.media.box.h > 0
                   && s.media.box.y > s.wrap.bottom - 10) {
            fel.push(`${lage}: scenen (${s.media.tag}) ligger helt under ramkanten i ${namn}`);
        }
        // I ark-läge SKA verktygen ligga över scenens nedre del, men de får
        // inte äta mer än 60 % av skärmen och måste gå att fälla bort.
        if (s.ark) {
            const synliga = s.paneler.filter(p => p.display !== 'none' && p.box.h > 0
                                                  && p.cls !== 'scene-hint');
            if (synliga.length) {
                const topp = Math.min(...synliga.map(p => p.box.y));
                const andel = Math.round(100 * (m.vp.h - topp) / m.vp.h);
                // Arket får äta högst ~2/3 av skärmen; scenen måste synas kvar.
                if (andel > 62) fel.push(`${lage}: arket täcker ${andel} % av skärmen i ${namn}`);
                if (!s.handtag) fel.push(`${lage}: ark-läge utan fäll-knapp i ${namn}`);
                varning.push(`${lage}: ark-läge, verktygen täcker ${andel} % av scenen i ${namn}`);
            }
        }
        s.paneler.forEach(p => {
            if (p.display === 'none' || p.box.w === 0 || p.box.h === 0) return;
            if (p.cls === 'scene-hint') return;           // liten pill, får ligga tätt
            // 1. Panelen får inte ligga ovanpå mediet (scenens rityta)
            if (s.media && !s.ark) {
                const o = overlapp(p.box, s.media.box);
                if (o > 400) fel.push(`${lage}: .${p.cls} ligger ovanpå ${s.media.tag} i ${namn} (${o} px²)`);
            }
            // 2. Under ramkanten: FEL om ramen klipper (oåtkomligt),
            //    varning om den är skrollbar (nåbart, men kräver skroll)
            const under = +(p.box.bottom - s.wrap.bottom).toFixed(0);
            if (under > 2 && !s.ark) {
                if (s.klipper) {
                    fel.push(`${lage}: .${p.cls} klipps bort i ${namn} — ${under} px under ramens kant`);
                } else if (s.skrollbar) {
                    varning.push(`${lage}: .${p.cls} kräver ${under} px skroll i ${namn}`
                        + (s.handtag ? '' : ' — och ingen fäll-knapp finns'));
                    if (!s.handtag) {
                        fel.push(`${lage}: .${p.cls} sticker ut ${under} px i ${namn} utan fäll-knapp`);
                    }
                }
            }
            // 3. Panelen får inte sticka ut i sidled
            if (p.box.right > m.vp.w + 2 || p.box.x < -2) {
                fel.push(`${lage}: .${p.cls} utanför skärmen i ${namn} (x ${p.box.x}–${p.box.right}, skärm ${m.vp.w})`);
            }
        });
        // 4b. I ark-läget får avläsningen ALDRIG ligga som en RUTA över
        //     scenen — den ska gömmas/visas med docken, eller ritas som
        //     diskret text (klassen si-diskret, utan bakgrund/ram/skugga).
        //     (Solförmörkelsen: rutan centrerades mitt över scenen och
        //     skymde hela sikten, påpekat 2026-08-15.)
        if (s.ark && s.info && s.info.ruta && s.media) {
            const o = overlapp(s.info.box, s.media.box);
            if (o > 400) fel.push(`${lage}: .scene-info ligger som ruta över scenen i ${namn} (${o} px²)`
                + ' — göm den med docken eller använd si-diskret (ren text)');
        }
        // 4. Avläsningsrutan får inte hamna under/bakom en verktygsruta
        if (s.info) {
            s.paneler.forEach(p => {
                if (p.display === 'none' || p.box.h === 0 || p.cls === 'scene-hint') return;
                const o = overlapp(s.info.box, p.box);
                if (o > 200) fel.push(`${lage}: .scene-info krockar med .${p.cls} i ${namn} (${o} px²)`);
            });
        }
        // 5. Fullskärmsknappen måste vara nåbar
        if (lage === 'fullskärm' && s.fsbtn && (s.fsbtn.bottom < 0 || s.fsbtn.y > m.vp.h)) {
            fel.push(`${lage}: .fs-btn utanför skärmen i ${namn} (y ${s.fsbtn.y})`);
        }
    });
    return { fel, varning };
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath: CHROME, headless: 'new',
        args: ['--window-size=900,900', '--hide-scrollbars', '--use-gl=angle']
    });
    const page = await browser.newPage();
    await page.setViewport({ ...VP, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    const sidfel = [];
    page.on('pageerror', e => sidfel.push('JS-fel: ' + e.message.split('\n')[0]));

    // Nollställ ev. skroll i scenramen så mätningen sker i utgångsläget
    const tillToppen = () => page.evaluate(() => {
        document.querySelectorAll('.scene-wrap, .canvas-wrap, .wave-stage')
            .forEach(w => { w.scrollTop = 0; });
    });

    let antalFel = 0, antalSidor = 0, antalVarn = 0;
    for (const f of files) {
        sidfel.length = 0;
        let fel = [], varning = [];
        try {
            await page.goto(`http://localhost:${PORT}/${f}`, { waitUntil: 'networkidle2', timeout: 30000 });
            await sleep(800);
            await tillToppen();
            let r = granska(await page.evaluate(MAT), 'normalläge');
            fel = fel.concat(r.fel); varning = varning.concat(r.varning);

            if (await page.$('.fs-btn')) {
                await page.click('.fs-btn');
                await sleep(800);
                await tillToppen();
                const m = await page.evaluate(MAT);
                if (m.fs) { r = granska(m, 'fullskärm'); fel = fel.concat(r.fel); varning = varning.concat(r.varning); }
                else fel.push('fullskärm: gick inte in i fullskärm');
                await page.keyboard.press('Escape');
                await sleep(300);
            }
        } catch (e) {
            fel.push('undantag: ' + e.message.split('\n')[0]);
        }
        fel = fel.concat(sidfel);
        antalSidor++;
        if (fel.length) {
            antalFel++;
            console.log(`\nFEL  ${f}`);
            fel.forEach(x => console.log('     ' + x));
            varning.forEach(x => console.log('   · ' + x));
        } else if (varning.length) {
            antalVarn++;
            console.log(`ok   ${f}`);
            varning.forEach(x => console.log('   · ' + x));
        } else {
            console.log(`ok   ${f}`);
        }
    }
    await browser.close();
    console.log(`\n${antalSidor - antalFel}/${antalSidor} simuleringar ok`
        + (antalVarn ? ` (${antalVarn} med skroll-varning)` : '') + '.');
    process.exit(antalFel ? 1 : 0);
})();
