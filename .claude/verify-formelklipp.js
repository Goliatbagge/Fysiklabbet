// Verifierar att INGEN block-formel (.katex-display) klipps av sin egen ruta.
//
// KaTeX ritar bråkens nämnare en bit NEDANFÖR .katex egen ruta, samtidigt som
// .katex-display klipper i höjdled (overflow: hidden, och overflow-y: hidden
// på de rutor som scrollar i sidled). Utan luft kapas nämnaren rakt av: "a" i
// g(x)/a fick underdelen avhuggen i sammanfattningsrutan i ma3c-3.1
// (rapporterat 2026-08-29). Luften sätts av --katex-luft-botten i
// styles-laborans.css, och för nedskalade formler av scaleDownDisplay() i
// katalog.html/avsnitt.html. Det här skriptet mäter att luften RÄCKER — i
// alla avsnitt, på riktigt.
//
// Mätningen: för varje synlig .katex-display jämförs bläckets utsträckning
// (lövelement med text + bråkstreck och andra ramade/fyllda element) med
// rutans klippkant (padding-boxen). Hamnar bläcket utanför är formeln kapad.
// Bara kanter som faktiskt klipper granskas: en ruta med overflow-y: visible
// kapar ingenting, och en overflow-x: auto-ruta får ha innehåll utanför i
// sidled — det går att dra fram.
//
// ÖVERKANTEN granskas inte. KaTeX reserverar alltid gott om plats ovanför
// bläcket (pixelmätning av 39 formler: minst 9 px slack), medan ett
// textelements ruta täcker hela sin radhöjd och alltså sticker upp en bit
// över glyferna. En överkantskontroll på rutorna ger därför bara falsklarm
// på 1–3 px.
//
// Körs på 390×844 (mobil) — den smalaste vanliga skärmen, där formlerna
// skalas ned och klippet slår hårdast. BRED=1 kör 1290×800 också.
//
// Utan argument granskas alla teoriavsnitt. Argument kan vara
//   ma3c-3.1          → katalog.html?id=ma3c-3.1
//   np:fy2-vt2016     → np.html?id=fy2-vt2016
//   nyhet:<artikelid> → nyheter.html?id=<artikelid>
//
// Kräver dev-servern på port 8000 + playwright-core/katex/marked/react i
// %TEMP%\pptr-test\node_modules (eller peka ut dem med SAM_NODE_MODULES).
// Webbläsare: PW_CHROMIUM, annars den förinstallerade i molnmiljön, annars
// playwright-cores egen.
const fs = require('fs'), path = require('path');
const NM = process.env.SAM_NODE_MODULES
  || path.join(process.env.TEMP || require('os').tmpdir(), 'pptr-test', 'node_modules');
let chromium;
try {
  ({ chromium } = require(path.join(NM, 'playwright-core')));
} catch (e) {
  console.error('playwright-core hittades inte i ' + NM
    + ' — hoppar över formelklipp-kontrollen.');
  process.exit(0);
}
const MAP = [
  [/unpkg\.com\/react@18\/umd\/react\.production\.min\.js/, 'react/umd/react.production.min.js'],
  [/unpkg\.com\/react-dom@18\/umd\/react-dom\.production\.min\.js/, 'react-dom/umd/react-dom.production.min.js'],
  [/unpkg\.com\/@babel\/standalone.*babel\.min\.js/, '@babel/standalone/babel.min.js'],
  [/katex@0\.16\.9\/dist\/katex\.min\.js/, 'katex/dist/katex.min.js'],
  [/katex@0\.16\.9\/dist\/katex\.min\.css/, 'katex/dist/katex.min.css'],
  [/katex@0\.16\.9\/dist\/contrib\/auto-render\.min\.js/, 'katex/dist/contrib/auto-render.min.js'],
  [/marked@11\.1\.1\/marked\.min\.js/, 'marked/marked.min.js'],
];
async function routeCdn(page) {
  await page.route(/https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|cdn\.tailwindcss\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)\/.*/, r => {
    const url = r.request().url();
    for (const [re, rel] of MAP)
      if (re.test(url)) return r.fulfill({ body: fs.readFileSync(path.join(NM, rel)),
        contentType: rel.endsWith('.css') ? 'text/css' : 'application/javascript' });
    const fm = url.match(/katex@0\.16\.9\/dist\/(fonts\/[^?#]+)/);
    if (fm) { const p = path.join(NM, 'katex/dist', fm[1]);
      if (fs.existsSync(p)) return r.fulfill({ body: fs.readFileSync(p), contentType: 'font/woff2' }); }
    return r.fulfill({ status: 200, body: '', contentType: url.includes('css') ? 'text/css' : 'application/javascript' });
  });
}

// Kör i sidan: mät bläckets utsträckning mot varje formelrutas klippkant.
const MAT = (tol) => {
  const ut = [];
  const bakgrundsfri = c => !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
  document.querySelectorAll('.katex-display').forEach(disp => {
    const cs = getComputedStyle(disp);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const inre = disp.querySelector('.katex');
    if (!inre) return;
    const r = disp.getBoundingClientRect();
    if (!r.width || !r.height) return;
    // Bläckets ytterkanter. Tomma stödspann (KaTeX strut/vlist) räknas inte —
    // bara lövelement med text, samt bråkstreck och andra ramade/fyllda ytor.
    let t = Infinity, b = -Infinity, l = Infinity, h = -Infinity, n = 0;
    disp.querySelectorAll('*').forEach(el => {
      if (el.closest('.katex-mathml')) return;               // dold MathML-kopia
      const e = getComputedStyle(el);
      const blackt = (el.children.length === 0 && el.textContent.trim() !== '')
        || parseFloat(e.borderTopWidth) > 0 || parseFloat(e.borderBottomWidth) > 0
        || !bakgrundsfri(e.backgroundColor);
      if (!blackt) return;
      const q = el.getBoundingClientRect();
      if (!q.width || !q.height) return;
      n++;
      t = Math.min(t, q.top); b = Math.max(b, q.bottom);
      l = Math.min(l, q.left); h = Math.max(h, q.right);
    });
    if (!n) return;
    const skallar = {};
    // Nedåt: bara om rutan verkligen klipper i höjdled.
    if (cs.overflowY !== 'visible') skallar.under = b - r.bottom;
    // Vågrätt: en ruta som scrollar i sidled får ha innehåll utanför.
    if (cs.overflowX === 'hidden' || cs.overflowX === 'clip') {
      skallar.vanster = r.left - l; skallar.hoger = h - r.right;
    }
    const varsta = Object.entries(skallar)
      .filter(([, v]) => v > tol)
      .sort((a, c) => c[1] - a[1]);
    if (!varsta.length) return;
    const tex = ((disp.querySelector('annotation[encoding="application/x-tex"]') || {}).textContent || '')
      .trim().replace(/\s+/g, ' ').slice(0, 60);
    ut.push({ kant: varsta[0][0], px: Math.round(varsta[0][1] * 10) / 10, tex });
  });
  return ut;
};

function mal(t) {
  if (t.startsWith('np:')) return { url: 'np.html?id=' + t.slice(3), vanta: '.np-md' };
  if (t.startsWith('nyhet:')) return { url: 'nyheter.html?id=' + t.slice(6), vanta: '.article-body' };
  return { url: 'katalog.html?id=' + t, vanta: '.lab-article-body' };
}

(async () => {
  let mals = process.argv.slice(2);
  if (!mals.length) {
    mals = fs.readdirSync('data/teori')
      .filter(f => f.endsWith('.md'))
      .map(f => f.slice(0, -3))
      .sort();
  }
  const TOL = 0.6;                            // delpixlar från avrundning
  const vyer = [{ w: 390, h: 844, namn: 'mobil' }];
  if (process.env.BRED) vyer.push({ w: 1290, h: 800, namn: 'laptop' });
  // Webbläsare: PW_CHROMIUM om den är satt, annars den förinstallerade i
  // molnmiljön, annars playwright-cores egen (Windows/lokal utveckling).
  const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  let fel = 0, granskade = 0;
  for (const vy of vyer) {
    const page = await browser.newPage({ viewport: { width: vy.w, height: vy.h } });
    await routeCdn(page);
    for (const t of mals) {
      const m = mal(t);
      let r;
      try {
        await page.goto('http://localhost:8000/' + m.url, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector(m.vanta, { timeout: 20000 });
        await page.waitForTimeout(1200);
        // Fäll ut härledningar och andra dropdowns så även deras formler mäts,
        // och låt sidans egen fit-rutin räkna om (den lyssnar på resize).
        const oppnade = await page.evaluate(() => {
          let k = 0;
          document.querySelectorAll('details:not([open])').forEach(d => { d.open = true; k++; });
          return k;
        });
        if (oppnade) { await page.evaluate(() => window.dispatchEvent(new Event('resize'))); }
        await page.waitForTimeout(oppnade ? 900 : 300);
        r = await page.evaluate(MAT, TOL);
      } catch (e) {
        console.log('FEL   ' + t + '  (' + vy.namn + ')  ' + e.message.split('\n')[0]);
        fel++;
        continue;
      }
      granskade++;
      if (!r.length) continue;
      fel += r.length;
      console.log('FEL   ' + t + '  (' + vy.namn + ')');
      for (const x of r) {
        const kant = { under: 'underkant',
                       vanster: 'vänsterkant', hoger: 'högerkant' }[x.kant];
        console.log('        ' + x.px + ' px utanför ' + kant + ':  ' + x.tex);
      }
    }
    await page.close();
  }
  await browser.close();
  if (fel) {
    console.log('\n' + fel + ' klippt(a) formler i ' + granskade + ' granskade sidor.');
    console.log('Formeln kapas av sin egen ruta. Kontrollera --katex-luft-botten '
      + 'i styles-laborans.css\noch scaleDownDisplay() i katalog.html/avsnitt.html.');
    process.exit(1);
  }
  console.log('ok    inga klippta block-formler (' + granskade + ' sidor).');
})();
