// Verifierar sammanfattnings-sliden (::: sammanfattning) i presentationsläget.
// Laddar varje avsnitt på 1290×730 — den snålaste vanliga liggande
// laptopskärmen — stegar till sista steget med End och mäter att sliden
//   * är sista steget,
//   * ryms i höjdled ovanför kontrollisten och inte spiller i sidled,
//   * inte krympts under 12 px, och
//   * FYLLER minst 80 % av den tillgängliga höjden (annars är texten onödigt
//     liten — se "Ytan ska utnyttjas" i CLAUDE.md).
// Utan argument granskas alla avsnitt som har en sammanfattning.
// Kräver dev-servern på port 8000 + playwright-core/katex/marked/react i
// %TEMP%\pptr-test\node_modules (eller peka ut dem med SAM_NODE_MODULES).
// SHOT=1 sparar en skärmdump per avsnitt i .shots/.
const fs = require('fs'), path = require('path');
const NM = process.env.SAM_NODE_MODULES
  || path.join(process.env.TEMP || require('os').tmpdir(), 'pptr-test', 'node_modules');
let chromium;
try {
  ({ chromium } = require(path.join(NM, 'playwright-core')));
} catch (e) {
  console.error('playwright-core hittades inte i ' + NM
    + ' — hoppar över sammanfattningskontrollen.');
  process.exit(0);
}
const SHOTDIR = '.shots';
if (process.env.SHOT && !fs.existsSync(SHOTDIR)) fs.mkdirSync(SHOTDIR, { recursive: true });
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
(async () => {
  let ids = process.argv.slice(2);
  if (!ids.length) {                       // utan argument: alla som har en sammanfattning
    ids = fs.readdirSync('data/teori')
      .filter(f => f.endsWith('.md') && !f.endsWith('.S.md'))
      .filter(f => fs.readFileSync(path.join('data/teori', f), 'utf8').includes('::: sammanfattning'))
      .map(f => f.slice(0, -3))
      .sort();
  }
  const W = 1290, H = 730;                 // liggande laptop, den snålaste vanliga
  // Webbläsare: PW_CHROMIUM om den är satt, annars den förinstallerade i
  // molnmiljön, annars playwright-cores egen (samma logik som verify-formelklipp).
  const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await routeCdn(page);
  let fel = 0;
  for (const id of ids) {
    let r;
    try {
      await page.goto('http://localhost:8000/katalog.html?id=' + id, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.lab-pres-launch', { timeout: 20000 });
      await page.click('.lab-pres-launch');
      await page.waitForSelector('.lab-pres.is-ready', { timeout: 20000 });
      await page.keyboard.press('End');
      await page.waitForTimeout(2600);
      r = await page.evaluate(() => {
        const el = document.querySelector('.lab-pres .lab-block-sammanfattning');
        if (!el) return { saknas: true };
        const b = el.getBoundingClientRect();
        const bar = document.querySelector('.lab-pres-bar');
        const barH = bar ? bar.getBoundingClientRect().height : 0;
        let spill = 0;                      // kort som spiller ut i sidled
        el.querySelectorAll('.lab-block-sampunkt').forEach(k => {
          const kr = k.getBoundingClientRect();
          if (kr.right > innerWidth + 1 || kr.left < -1) spill++;
        });
        return { top: Math.round(b.top), bot: Math.round(b.bottom), h: Math.round(b.height),
                 vh: innerHeight, barH: Math.round(barH), spill,
                 fs: parseFloat(el.style.fontSize || getComputedStyle(el).fontSize),
                 sista: el.classList.contains('is-current'),
                 kort: el.querySelectorAll('.lab-block-sampunkt').length,
                 sc: Math.round(document.querySelector('.lab-pres').scrollTop),
                 sh: Math.round(document.querySelector('.lab-pres').scrollHeight),
                 ch: Math.round(document.querySelector('.lab-pres').clientHeight) };
      });
    } catch (e) { console.log('FEL   ' + id + ': ' + e.message.split('\n')[0]); fel++; continue; }
    if (process.env.SHOT) await page.screenshot({ path: path.join(SHOTDIR, 'sam-' + id + '.png') });
    if (r.saknas) { console.log('FEL   ' + id + ': ingen sammanfattning i presentationsläget'); fel++; continue; }
    const problem = [];
    if (!r.sista) problem.push('inte sista steget');
    if (r.top < 0) problem.push('överkant ovanför bild (top ' + r.top + ')');
    if (r.bot > r.vh - r.barH + 2) problem.push('underkant utanför bild (bot ' + r.bot + ' > ' + (r.vh - r.barH) + ')');
    if (r.spill) problem.push(r.spill + ' kort spiller i sidled');
    if (r.fs < 12) problem.push('krympt till ' + r.fs + 'px (för mycket text)');
    // Ytan ska utnyttjas: en slide som slutar högt upp läses på onödigt liten
    // stil. Under 80 % av den tillgängliga höjden är texten för liten — utom
    // när den redan står på takstorleken och alltså inte kan växa mer.
    const yta = r.vh * 0.96 - r.barH - 10;
    const fyll = r.h / yta;
    if (fyll < 0.80 && r.fs < 29.5) {
      problem.push('bara ' + Math.round(fyll * 100) + ' % av ytan utnyttjad vid ' + r.fs + 'px');
    }
    const rad = id + '  ' + r.kort + ' kort, ' + r.fs + 'px, h=' + r.h + '/' + r.vh
              + ' (' + Math.round(fyll * 100) + ' % av ytan)';
    if (problem.length) { console.log('FEL   ' + rad + '  << ' + problem.join('; ')); fel++; }
    else console.log('ok    ' + rad);
  }
  await browser.close();
  process.exit(fel ? 1 : 0);
})();
