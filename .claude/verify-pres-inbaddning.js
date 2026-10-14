// Verifierar att varje INBÄDDNING i teorin (::: minisim, ::: graf,
// ::: video) faktiskt visas i presentationsläget.
//
// Felet som utlöste kontrollen (påpekat 2026-10-14, fy2-2.3): en
// demonstrationsruta med text + simulering var ETT steg. Rutan var högre än
// duken, autoskrollen lade rutans överkant 10 % ned, simuleringen hamnade
// under kontrollisten och nästa klick hoppade vidare till nästa ruta. Den
// syntes aldrig. buildPresSteps i katalog.html delar numera en sådan ruta så
// att simuleringen tänds som ett eget steg (tillsammans med stycket före).
//
// Laddar varje avsnitt på 1290×730, stegar igenom alla steg och kräver att
// varje inbäddning i NÅGOT steg där den är aktuell (is-current) ligger helt
// ovanför kontrollisten. Är inbäddningen högre än den tillgängliga ytan räcker
// det att dess överkant syns överst på duken.
// Utan argument granskas alla avsnitt med en inbäddning.
// Kräver dev-servern på port 8000 + playwright-core i %TEMP%\pptr-test.
const fs = require('fs'), path = require('path');
const NM = process.env.SAM_NODE_MODULES
  || path.join(process.env.TEMP || require('os').tmpdir(), 'pptr-test', 'node_modules');
let chromium;
try {
  ({ chromium } = require(path.join(NM, 'playwright-core')));
} catch (e) {
  console.error('playwright-core hittades inte i ' + NM + ' — hoppar över kontrollen.');
  process.exit(0);
}
const INB = /^:::\s*(minisim|graf|video)\b/m;

(async () => {
  let ids = process.argv.slice(2);
  if (!ids.length) {
    ids = fs.readdirSync('data/teori')
      .filter(f => f.endsWith('.md') && INB.test(fs.readFileSync(path.join('data/teori', f), 'utf8')))
      .map(f => f.slice(0, -3)).sort();
  }
  const W = 1290, H = 730;
  const exe = [process.env.PW_CHROMIUM, '/opt/pw-browsers/chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
    .find(p => p && fs.existsSync(p)) || '';
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  let fel = 0;
  for (const id of ids) {
    try {
      await page.goto('http://localhost:8000/katalog.html?id=' + id, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.lab-pres-launch', { timeout: 20000 });
      await page.waitForTimeout(800);
      await page.click('.lab-pres-launch');
      await page.waitForSelector('.lab-pres.is-ready', { timeout: 20000 });
      await page.waitForTimeout(1200);
      const raknare = () => page.evaluate(() => {
        const m = (document.querySelector('.lab-pres-counter') || {}).textContent || '';
        const t = m.match(/(\d+)\s*\/\s*(\d+)/);
        return t ? [+t[1], +t[2]] : [0, 0];
      });
      const sedd = {};
      let antal = 0, total = 0;
      // Pennlösningarnas steg tar flera klick var, så tryck tills sista
      // steget är nått (med ett tak).
      for (let tryck = 0; tryck < 600; tryck++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(tryck === 0 ? 1400 : 650);
        const [n, tot] = await raknare();
        total = tot;
        const r = await page.evaluate((H) => {
          const bar = document.querySelector('.lab-pres-bar');
          const avail = bar ? bar.getBoundingClientRect().top : H;
          const els = [...document.querySelectorAll('.lab-pres .lab-minisim, .lab-pres .lab-graf, .lab-pres .lab-video')];
          return { n: els.length, ok: els.map((e, k) => {
            if (!e.closest('.is-current')) return null;
            const b = e.getBoundingClientRect();
            if (b.height < 2) return null;
            const ryms = b.height <= avail - 4;
            const syns = ryms ? (b.top >= -2 && b.bottom <= avail + 2)
                              : (b.top >= -2 && b.top <= 0.2 * H);
            return syns ? k : null;
          }).filter(k => k !== null) };
        }, H);
        antal = r.n;
        r.ok.forEach(k => { sedd[k] = true; });
        if (tot && n >= tot) break;
      }
      const saknas = [];
      for (let k = 0; k < antal; k++) if (!sedd[k]) saknas.push(k + 1);
      if (saknas.length) {
        fel++;
        console.log('FEL  ' + id + ': inbäddning nr ' + saknas.join(', ') + ' av ' + antal +
          ' visas aldrig helt i presentationsläget');
      } else {
        console.log('ok   ' + id + ' (' + antal + ' inbäddningar, ' + total + ' steg)');
      }
    } catch (e) {
      fel++;
      console.log('FEL  ' + id + ': ' + e.message.split('\n')[0]);
    }
  }
  await browser.close();
  console.log(fel ? '\n' + fel + ' avsnitt med fel.' : '\nInga fel.');
  process.exit(fel ? 1 : 0);
})();
