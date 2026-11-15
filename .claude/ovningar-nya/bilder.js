// Skärmdumpar av nya övningar: node bilder.js <id> <n> [<n> …]
// Fotograferar uppgiftskortet nr n i .shots/ovn-<id>.html (skrivs av testa.js).
const path = require('path');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.join(__dirname, '..', '..');
const [id, ...nr] = process.argv.slice(2);
(async () => {
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 1 });
        for (const n of nr) {
            await page.goto(`http://localhost:8000/.shots/ovn-${id}.html?i=${n}`, { waitUntil: 'load', timeout: 30000 });
            await new Promise(r => setTimeout(r, 400));
            const el = await page.$('.u');
            if (!el) { console.log('hittar inget kort för ' + n); continue; }
            const png = path.join(ROOT, '.shots', `ovn-${id}-${n}.png`);
            await el.screenshot({ path: png });
            console.log('bild: ' + png);
        }
    } finally {
        // browser.close() kan hänga på Windows: döda processen i stället.
        try { browser.process().kill('SIGKILL'); } catch (e) {}
    }
    process.exit(0);
})().catch(e => { console.log(e.message); process.exit(1); });
