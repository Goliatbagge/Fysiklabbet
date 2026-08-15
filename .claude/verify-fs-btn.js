/* ============================================================
   verify-fs-btn.js
   ----------------------------------------------------------------
   Kontrollerar att fullskärmsknappen (.fs-btn) ligger ENSAM på sin
   yta uppe till vänster: inget annat interaktivt element (knapp,
   länk, label, reglage) får överlappa dess ruta. Felet har hänt på
   riktigt: en äldre simulering lade sin egen Play-knapp absolut-
   positionerad på 24,24 — rakt bakom .fs-btn (40 px vid 14,14).

   Mäter på BRED skärm (1280×800) — verify-mobil-scen.js täcker
   mobilen, där overlay-lägena ändå dockas om. Testar varje
   simulering i både normalläge och fullskärm.

   Kör:  node .claude/verify-fs-btn.js [filnamn ...]
   Kräver dev-servern på port 8000 (python .claude/dev-server.py 8000)
   samt puppeteer-core i %TEMP%\pptr-test (samma som mobil-verifieraren).
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = 8000;
const VP = { width: 1280, height: 800 };
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let puppeteer;
try {
    puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
} catch (e) {
    console.error('puppeteer-core hittades inte i %TEMP%\\pptr-test — hoppar över fs-btn-kontrollen.');
    process.exit(0);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const argv = process.argv.slice(2);
const files = argv.length ? argv : fs.readdirSync(ROOT)
    .filter(f => /^fysik[12]-.*\.html$/.test(f))
    .filter(f => /fs-btn/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));

// Körs i sidan: hittar varje synlig .fs-btn och listar alla interaktiva
// element vars ruta skär knappens ruta.
const MAT = function () {
    const rect = e => { const r = e.getBoundingClientRect();
        return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
                 right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1) }; };
    const synlig = e => {
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
    };
    const beskrivning = e => {
        const id = e.id ? '#' + e.id : '';
        const cls = e.className && typeof e.className === 'string'
            ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
        const txt = (e.getAttribute('aria-label') || e.title || e.textContent || '')
            .trim().replace(/\s+/g, ' ').slice(0, 30);
        return `<${e.tagName.toLowerCase()}${id}${cls}${txt ? ' "' + txt + '"' : ''}>`;
    };
    const out = [];
    // I fullskärm renderas bara fullskärmselementets subträd — element
    // utanför (nav, flikar) har kvar sina boxar men syns inte. Mät därför
    // enbart inom det subträdet, annars blir loggan en falsk krock.
    const rot = document.fullscreenElement || document.webkitFullscreenElement || document;
    const interaktiva = [...rot.querySelectorAll(
        'button, a, label, input, select, textarea, [role="button"]')].filter(synlig);
    rot.querySelectorAll('.fs-btn').forEach((btn, i) => {
        if (!synlig(btn)) return;
        const b = rect(btn);
        const krockar = interaktiva
            .filter(e => e !== btn && !btn.contains(e) && !e.contains(btn))
            .map(e => ({ e, r: rect(e) }))
            .filter(({ r }) => Math.min(b.right, r.right) - Math.max(b.x, r.x) > 1
                            && Math.min(b.bottom, r.bottom) - Math.max(b.y, r.y) > 1)
            .map(({ e, r }) => ({ vad: beskrivning(e), box: r }));
        out.push({ i, box: b, krockar });
    });
    return { fs: !!(document.fullscreenElement || document.webkitFullscreenElement), knappar: out };
};

function granska(m, lage) {
    const fel = [];
    m.knappar.forEach(k => {
        k.krockar.forEach(kr => {
            fel.push(`${lage}: ${kr.vad} ligger på .fs-btn[${k.i}] `
                + `(knappen ${k.box.x},${k.box.y} ${k.box.w}×${k.box.h} — `
                + `elementet ${kr.box.x},${kr.box.y} ${kr.box.w}×${kr.box.h})`);
        });
    });
    return fel;
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath: CHROME, headless: 'new',
        args: ['--window-size=1300,900', '--hide-scrollbars', '--use-gl=angle']
    });
    const page = await browser.newPage();
    await page.setViewport({ ...VP, deviceScaleFactor: 1 });
    const sidfel = [];
    page.on('pageerror', e => sidfel.push('JS-fel: ' + e.message.split('\n')[0]));

    let antalFel = 0, antalSidor = 0;
    for (const f of files) {
        sidfel.length = 0;
        let fel = [];
        try {
            // 'load' i stället för networkidle2 — sidor som nätverkspollar
            // (t.ex. vagsimulatorn) blir annars aldrig "idle" och timar ut
            await page.goto(`http://localhost:${PORT}/${f}`, { waitUntil: 'load', timeout: 30000 });
            await sleep(1200);
            fel = fel.concat(granska(await page.evaluate(MAT), 'normalläge'));

            if (await page.$('.fs-btn')) {
                await page.click('.fs-btn');
                await sleep(800);
                const m = await page.evaluate(MAT);
                if (m.fs) fel = fel.concat(granska(m, 'fullskärm'));
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
        } else {
            console.log(`ok   ${f}`);
        }
    }
    await browser.close();
    console.log(`\n${antalSidor - antalFel}/${antalSidor} simuleringar ok.`);
    process.exit(antalFel ? 1 : 0);
})();
