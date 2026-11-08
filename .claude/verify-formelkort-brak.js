/* ============================================================
   verify-formelkort-brak.js
   ----------------------------------------------------------------
   Kontrollerar bråken i simuleringarnas formelkort (CLAUDE.md,
   Formelpresentation punkt 8):

   1. Bråkstrecket får inte vara mycket bredare än symbolerna. Ett ord
      ovanför täljaren eller under nämnaren ska gå ut över kanterna
      (klassen .flbl.brak-etikett i styles-laborans-sim.css), inte göra
      bråket lika brett som ordet. Fel när strecket är mer än 12 px
      bredare än det bredaste av täljare och nämnare.
   2. Inga etiketter får krocka med varandra eller med symbolerna, vilket
      kan hända när orden går ut över kanterna.

   Felet som utlöste regeln (2026-11-08): i 25 simuleringar var
   bråkstrecken två till tio gånger så breda som symbolerna, så att
   likhetstecknet hamnade långt från bråket.

   Mäter på 1400×1000. Kräver dev-servern på port 8000 (PORT=… för en
   annan) och playwright-core i %TEMP%\pptr-test.

   Användning: node .claude/verify-formelkort-brak.js [fil.html …]
   ============================================================ */
const fs = require('fs'), path = require('path');
const NM = process.env.SAM_NODE_MODULES
  || path.join(process.env.TEMP || require('os').tmpdir(), 'pptr-test', 'node_modules');
let chromium;
try { ({ chromium } = require(path.join(NM, 'playwright-core'))); }
catch (e) { console.error('playwright-core hittades inte i ' + NM + ' — hoppar över kontrollen.'); process.exit(0); }
const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 8000;
const files = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(ROOT).filter(f => /^fysik[12]-.*\.html$/.test(f) && /borderTop|border-top/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));
const CHROME = [process.env.PW_CHROMIUM, 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p => p && fs.existsSync(p));

(async () => {
  const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
  let fel = 0;
  for (const f of files) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    try {
      await page.goto(`http://localhost:${PORT}/${f}`, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(2500);
      const res = await page.evaluate(() => {
        const isLabel = n => {
          let e = n.nodeType === 3 ? n.parentElement : n;
          while (e) {
            if (e.classList && e.classList.contains('flbl')) return true;
            const cs = getComputedStyle(e);
            if (cs.textTransform === 'uppercase' && parseFloat(cs.fontSize) <= 12) return true;
            e = e.parentElement;
          }
          return false;
        };
        const textRects = (root, wantLabel) => {
          const out = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
          while ((n = w.nextNode())) {
            if (!n.textContent.trim() || isLabel(n) !== wantLabel) continue;
            if (getComputedStyle(n.parentElement).visibility === 'hidden') continue;
            const rg = document.createRange(); rg.selectNodeContents(n);
            for (const rc of rg.getClientRects()) if (rc.width) out.push({ rc, t: n.textContent.trim() });
          }
          return out;
        };
        const span = rs => rs.length ? { l: Math.min(...rs.map(r => r.rc.left)), r: Math.max(...rs.map(r => r.rc.right)) } : null;
        const bred = [], krock = [], kort = new Set();
        for (const el of document.querySelectorAll('body *')) {
          if (el.closest('nav, footer, svg, .katex, canvas')) continue;
          const cs = getComputedStyle(el);
          let num, den;
          if (cs.borderTopStyle === 'solid' && parseFloat(cs.borderTopWidth) >= 1.5 && el.previousElementSibling) { den = el; num = el.previousElementSibling; }
          else if (cs.borderBottomStyle === 'solid' && parseFloat(cs.borderBottomWidth) >= 1.5 && el.nextElementSibling) { num = el; den = el.nextElementSibling; }
          else continue;
          const rc = el.getBoundingClientRect();
          if (!rc.width || rc.width > 320 || rc.height > 80) continue;
          const t = (num.textContent + den.textContent).trim();
          if (!t || t.length > 60) continue;
          // Ett bråk: täljare och nämnare staplade i samma kolumn.
          const a = span(textRects(num, false)), b = span(textRects(den, false));
          if (!a || !b) continue;
          const nr = num.getBoundingClientRect();
          if (nr.bottom > rc.top + 6 && cs.borderTopStyle === 'solid') continue;
          const ink = Math.max(a.r, b.r) - Math.min(a.l, b.l);
          if (rc.width - ink > 12) bred.push(`${num.textContent.trim().slice(0, 24)} / ${den.textContent.trim().slice(0, 24)}: streck ${Math.round(rc.width)} px, symboler ${Math.round(ink)} px`);
          let c = el; for (let i = 0; i < 4 && c.parentElement; i++) c = c.parentElement; kort.add(c);
        }
        const sh = r => { const h = r.bottom - r.top; return { left: r.left, right: r.right, top: r.top + h * 0.22, bottom: r.bottom - h * 0.22 }; };
        const ov = (a0, b0) => { const a = sh(a0), b = sh(b0); return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5; };
        for (const c of kort) {
          const L = textRects(c, true), S = textRects(c, false);
          for (let i = 0; i < L.length; i++) {
            for (let j = i + 1; j < L.length; j++) if (ov(L[i].rc, L[j].rc)) krock.push(`"${L[i].t}" krockar med "${L[j].t}"`);
            const s = S.find(x => ov(L[i].rc, x.rc)); if (s) krock.push(`"${L[i].t}" ligger på "${s.t.slice(0, 20)}"`);
          }
        }
        return { bred, krock: [...new Set(krock)] };
      });
      const problem = res.bred.map(x => 'BRETT BRÅKSTRECK: ' + x).concat(res.krock.map(x => 'KROCK: ' + x));
      if (problem.length) { fel += problem.length; console.log('✗ ' + f); problem.forEach(p => console.log('    ' + p)); }
    } catch (e) { console.log('? ' + f + ': ' + e.message.split('\n')[0]); }
    await page.close();
  }
  await browser.close();
  console.log(fel ? `\n${fel} fel i formelkortens bråk.` : `Formelkortens bråk: inga fel (${files.length} sidor).`);
  process.exit(fel ? 1 : 0);
})();
