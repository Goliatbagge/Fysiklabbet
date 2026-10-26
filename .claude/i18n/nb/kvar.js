// .claude/i18n/nb/kvar.js — listar svensk text som fortfarande syns när en
// simulering visas på norska (?lang=nb). Laddar sidan i headless Chrome,
// väntar in React och skriver ut textnoder, attribut och canvas-text
// (fillText/strokeText) som ser svenska ut: ä/ö eller ord som bara finns
// på svenska.
//
//   node .claude/i18n/nb/kvar.js fysik1-densitet-app.html …
//   node .claude/i18n/nb/kvar.js --alla      (alla fysik1-*/fysik2-*-sidor)
//   KORT=1 …                                  bara antal per sida
//
// Text som står i dolda element (fullskärmspaneler, andra lägen) markeras
// "(dold)"; den syns inte förrän läget byts men ska också vara översatt.
// Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROT = path.join(__dirname, '..', '..', '..');

let sidor = process.argv.slice(2);
if (sidor.includes('--alla')) {
    sidor = fs.readdirSync(ROT).filter(f => /^fysik[12]-.*\.html$/.test(f)).sort();
}
if (!sidor.length) { console.error('Ange sidor, till exempel: fysik1-densitet-app.html'); process.exit(1); }

(async () => {
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
    let totalt = 0;
    for (const s of sidor) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1290, height: 900 });
        const fel = [];
        page.on('pageerror', e => fel.push(e.message));
        await page.evaluateOnNewDocument(() => {
            window.__canvasText = new Set();
            const P = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
            if (!P) return;
            ['fillText', 'strokeText'].forEach(fn => {
                const orig = P[fn];
                P[fn] = function (t) { try { window.__canvasText.add(String(t)); } catch (e) {} return orig.apply(this, arguments); };
            });
        });
        const url = 'http://localhost:8000/' + s + (s.includes('?') ? '&' : '?') + 'lang=nb';
        try { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); } catch (e) { fel.push('goto: ' + e.message); }
        await new Promise(r => setTimeout(r, 3000));
        const kvar = await page.evaluate(() => {
            const SV = /[äöÄÖ]|\b(och|att|för|inte|är|visa|dölj|välj|sök|från|också|när|hur|vad|eller hur|ej|sträcka)\b/i;
            // Allt som inte kommit ur den norska ordlistan räknas som kvar,
            // utom tal, enheter och namn (minst ett ord på tre bokstäver krävs).
            const D = (window.I18N && window.I18N._dict) || {};
            const VAL = new Set(Object.values(D).map(v => String(v).replace(/\s+/g, ' ').trim()));
            const NAMN = /^(Fysiklabbet|Svenska|Poppins.*|DM Sans.*)$/;
            const ORD = /[A-Za-zÅÄÖåäöÆØæø]{3,}/;
            // Ord som förekommer i någon norsk översättning räknas som norska,
            // så att hopsatta strängar ("Jern – 7 870 kg/m³") inte larmar.
            const NORD = new Set();
            VAL.forEach(v => (v.match(/[A-Za-zÅÄÖåäöÆØæø]{3,}/g) || []).forEach(w => NORD.add(w.toLowerCase())));
            const okand = t => !VAL.has(t) && !NAMN.test(t) &&
                (t.match(/[A-Za-zÅÄÖåäöÆØæø]{3,}/g) || []).some(w => !NORD.has(w.toLowerCase()));
            const SVx = { test: t => SV.test(t) || okand(t) };
            const ut = new Set();
            const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let n;
            while ((n = w.nextNode())) {
                const p = n.parentElement;
                if (!p || p.closest('script,style,.katex,[translate="no"],.lab-lang')) continue;
                const t = n.nodeValue.replace(/\s+/g, ' ').trim();
                if (t.length < 2 || !SVx.test(t)) continue;
                const r = p.getBoundingClientRect();
                const cs = getComputedStyle(p);
                const dold = (r.width === 0 && r.height === 0) || cs.visibility === 'hidden';
                ut.add((dold ? '(dold) ' : '') + t.slice(0, 160));
            }
            for (const el of document.querySelectorAll('[title],[placeholder],[aria-label],[alt]')) {
                if (el.closest('.lab-lang')) continue;
                for (const a of ['title', 'placeholder', 'aria-label', 'alt']) {
                    const v = el.getAttribute(a);
                    if (v && SVx.test(v.replace(/\s+/g, " ").trim())) ut.add('[' + a + '] ' + v.slice(0, 160));
                }
            }
            for (const t of (window.__canvasText || [])) if (SVx.test(t.trim())) ut.add('[canvas] ' + t.slice(0, 160));
            if (SV.test(document.title)) ut.add('[title-tag] ' + document.title);
            const md = document.querySelector('meta[name="description"]');
            if (md && SV.test(md.content)) ut.add('[meta] ' + md.content.slice(0, 160));
            return [...ut];
        });
        const harLista = fs.existsSync(path.join(ROT, 'i18n', 'nb', 'sidor', s.split('?')[0].replace(/\.html$/, '.js')));
        console.log('\n=== ' + s + (harLista ? '' : ' (ingen norsk ordlista)') + ' — ' + kvar.length + ' svenska textbitar kvar' + (fel.length ? ', ' + fel.length + ' JS-fel' : ''));
        if (!process.env.KORT) for (const k of kvar) console.log('  ' + k);
        for (const f of fel) console.log('  JS-FEL: ' + f.slice(0, 200));
        totalt += kvar.length;
        await page.close();
    }
    await browser.close();
    console.log('\nTotalt ' + totalt + ' textbitar kvar.');
})();
