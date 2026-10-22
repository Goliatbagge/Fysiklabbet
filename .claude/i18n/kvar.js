// .claude/i18n/kvar.js — listar svensk text som fortfarande syns när en sida
// visas på engelska. Laddar sidan med ?lang=en i headless Chrome, väntar in
// React och skriver ut synliga textnoder och attribut som ser svenska ut
// (å/ä/ö eller vanliga svenska ord).
//
//   node .claude/i18n/kvar.js index.html "katalog.html?id=fy1-3.2" …
//   KLICKA=".lab-nav-dd-trigger" node .claude/i18n/kvar.js om.html
//
// Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
'use strict';
const path = require('path');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sidor = process.argv.slice(2);
if (!sidor.length) { console.error('Ange sidor, till exempel: index.html'); process.exit(1); }

(async () => {
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
    let totalt = 0;
    for (const s of sidor) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1290, height: 900 });
        const fel = [];
        page.on('pageerror', e => fel.push(e.message));
        const url = 'http://localhost:8000/' + s + (s.includes('?') ? '&' : '?') + 'lang=en';
        try { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); } catch (e) { fel.push('goto: ' + e.message); }
        await new Promise(r => setTimeout(r, 2500));
        const kvar = await page.evaluate(() => {
            const SV = /[åäöÅÄÖ]|\b(och|eller|att|som|för|med|inte|är|på|till|av|den|det|en|ett|visa|dölj|sök|välj)\b/i;
            const ut = new Set();
            const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = w.nextNode())) {
                const p = n.parentElement;
                if (!p || p.closest('script,style,.katex,[translate="no"]')) continue;
                const t = n.nodeValue.replace(/\s+/g, ' ').trim();
                if (t.length < 2 || !SV.test(t)) continue;
                const r = p.getBoundingClientRect();
                const cs = getComputedStyle(p);
                const dold = (r.width === 0 && r.height === 0) || cs.visibility === 'hidden';
                ut.add((dold ? '(dold) ' : '') + t.slice(0, 160));
            }
            for (const el of document.querySelectorAll('[title],[placeholder],[aria-label],[alt]')) {
                for (const a of ['title', 'placeholder', 'aria-label', 'alt']) {
                    const v = el.getAttribute(a);
                    if (v && SV.test(v)) ut.add('[' + a + '] ' + v.slice(0, 160));
                }
            }
            if (SV.test(document.title)) ut.add('[title-tag] ' + document.title);
            return [...ut];
        });
        console.log('\n=== ' + s + ' — ' + kvar.length + ' svenska textbitar kvar' + (fel.length ? ', ' + fel.length + ' JS-fel' : ''));
        for (const k of kvar) console.log('  ' + k);
        for (const f of fel) console.log('  JS-FEL: ' + f.slice(0, 200));
        totalt += kvar.length;
        await page.close();
    }
    await browser.close();
    console.log('\nTotalt ' + totalt + ' textbitar kvar.');
})();
