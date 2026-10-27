// .claude/i18n/nb/kontrollera-delningspaket.js — kontrollerar det norska
// delningspaketet (byggt av bygg-delningspaket.js). Startar en egen server
// på port 8002 i paketmappen, laddar varje simulering i headless Chrome och
// rapporterar:
//   - JS-fel och lokala filer som saknas (404),
//   - anrop till fysiklabbet.se eller Cloudflares mätning,
//   - svensk text som syns (en nyckel ur de norska ordlistorna, eller ä/ö),
//     även canvas-text,
//   - rester av sajten (sidhuvud, meny, brödsmula, avsnittsrad, logotyp).
//
//   node .claude/i18n/nb/kontrollera-delningspaket.js [paketmapp] [sida …]
// Kräver puppeteer-core i %TEMP%\pptr-test och Python (för servern).
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
const ROT = path.join(__dirname, '..', '..', '..');
const args = process.argv.slice(2);
const PAKET = path.resolve(args[0] && !args[0].endsWith('.html') ? args.shift() : path.join(ROT, 'delningspaket', 'fysiklabbet-simuleringer-nb'));
const PORT = 8002;

const norm = s => String(s).replace(/\s+/g, ' ').trim();
function lasDict(fil) {
    const acc = {};
    const p = path.join(ROT, fil);
    if (!fs.existsSync(p)) return acc;
    const I18N = { add: o => { for (const k in o) acc[norm(k)] = o[k]; }, addHtml() {}, t: s => s };
    new Function('window', 'I18N', fs.readFileSync(p, 'utf8'))({ I18N }, I18N);
    return acc;
}
const GEM = lasDict('i18n/nb.js');

(async () => {
    const server = spawn('python', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: PAKET, stdio: 'ignore' });
    await new Promise(r => setTimeout(r, 1500));
    const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] });
    const sidor = args.length ? args : fs.readdirSync(PAKET).filter(f => /^fysik[12]-.*\.html$/.test(f)).sort();
    let felSidor = 0;
    for (const s of sidor) {
        const D = Object.assign({}, GEM, lasDict('i18n/nb/sidor/' + s.replace(/\.html$/, '.js')));
        const nycklar = Object.keys(D).filter(k => norm(D[k]) !== k && /[A-Za-zÅÄÖåäö]{3,}/.test(k));
        const page = await browser.newPage();
        await page.setViewport({ width: 1290, height: 900 });
        const fel = [], natet = [];
        page.on('pageerror', e => fel.push('JS: ' + e.message.slice(0, 160)));
        page.on('response', r => {
            const u = r.url();
            if (u.startsWith('http://127.0.0.1:' + PORT) && r.status() >= 400 && !u.endsWith('/favicon.ico')) fel.push('404: ' + u.replace('http://127.0.0.1:' + PORT + '/', ''));
        });
        page.on('request', r => { const u = r.url(); if (/fysiklabbet\.se|cloudflareinsights/.test(u)) natet.push(u.slice(0, 120)); });
        await page.evaluateOnNewDocument(() => {
            window.__canvasText = new Set();
            const P = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
            if (P) ['fillText', 'strokeText'].forEach(fn => {
                const o = P[fn];
                P[fn] = function (t) { try { window.__canvasText.add(String(t)); } catch (e) {} return o.apply(this, arguments); };
            });
        });
        try { await page.goto('http://127.0.0.1:' + PORT + '/' + s, { waitUntil: 'load', timeout: 45000 }); } catch (e) { fel.push('goto: ' + e.message.slice(0, 100)); }
        await new Promise(r => setTimeout(r, 3500));
        const res = await page.evaluate((nycklar) => {
            const N = new Set(nycklar);
            const n = t => t.replace(/\s+/g, ' ').trim();
            const sv = t => N.has(t) || /[äöÄÖ]/.test(t);
            const ut = new Set();
            const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let x;
            while ((x = w.nextNode())) {
                const p = x.parentElement;
                if (!p || p.closest('script,style,.katex')) continue;
                const t = n(x.nodeValue);
                if (t.length >= 2 && sv(t)) ut.add(t.slice(0, 140));
            }
            for (const el of document.querySelectorAll('[title],[placeholder],[aria-label],[alt]'))
                for (const a of ['title', 'placeholder', 'aria-label', 'alt']) {
                    const v = el.getAttribute(a);
                    if (v && sv(n(v))) ut.add('[' + a + '] ' + n(v).slice(0, 140));
                }
            for (const t of window.__canvasText || []) if (sv(n(t))) ut.add('[canvas] ' + n(t).slice(0, 140));
            if (sv(n(document.title))) ut.add('[title] ' + document.title);
            const rester = ['.lab-header', 'nav.navbar', '.secnav', '.breadcrumb', '.lab-logo', '#feedback-widget', '.fb-btn']
                .filter(q => document.querySelector(q));
            return { svenska: [...ut], rester };
        }, nycklar);
        const ok = !fel.length && !natet.length && !res.svenska.length && !res.rester.length;
        if (!ok) felSidor++;
        console.log((ok ? 'OK  ' : 'FEL ') + s);
        if (!ok) {
            fel.forEach(f => console.log('    ' + f));
            [...new Set(natet)].forEach(u => console.log('    nät: ' + u));
            res.rester.forEach(r => console.log('    rest: ' + r));
            res.svenska.forEach(t => console.log('    sv: ' + t));
        }
        await page.close();
    }
    await browser.close();
    // Döda servern (på Windows räcker inte alltid kill(): python håller
    // annars paketmappen låst så att nästa bygge inte kan tömma den).
    if (process.platform === 'win32') { try { require('child_process').execSync('taskkill /pid ' + server.pid + ' /T /F', { stdio: 'ignore' }); } catch (e) {} }
    else server.kill();
    console.log('\n' + (sidor.length - felSidor) + ' av ' + sidor.length + ' utan anmärkning.');
})();
