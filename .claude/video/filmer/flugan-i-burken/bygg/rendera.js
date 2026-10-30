// Renderar textlager, undertexter, bakgrund och de egna scenerna till PNG
// för filmen "Flugan i burken".
//   node rendera.js <arbetsmapp> <tidslinje.txt> <manus.json>
// Kräver playwright-core (körs från %TEMP%\pptr-test med NODE_PATH satt dit).
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const [DIR, TIDSLINJE, MANUS] = process.argv.slice(2);
const BYGG = __dirname;
const OUT = path.join(DIR, 'lager');
fs.mkdirSync(OUT, { recursive: true });
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(f => fs.existsSync(f));

const manus = JSON.parse(fs.readFileSync(MANUS, 'utf8')).segment;
// Hårt mellanslag mellan tal och enhet, och i tusentalsgrupper
const undertext = Object.fromEntries(manus.map(m => [m.scen, m.undertext.replace(/(\d) (\d{3}|ton\b|kg\b|liter\b|år\b|m\/s\b)/g, '$1\u00a0$2')]));

// Dela en replik i bitar som ryms på högst två rader
function bitar(t) {
  const meningar = t.match(/[^.?!]+[.?!]?/g).map(s => s.trim()).filter(Boolean);
  const ut = [];
  for (const m of meningar) {
    if (m.length <= 64) { ut.push(m); continue; }
    // Dela vid kommatecken om det finns, annars vid ordgränsen närmast mitten
    const k = m.indexOf(', ');
    if (k > 15 && m.length - k > 15) { ut.push(m.slice(0, k + 1)); ut.push(m.slice(k + 2)); continue; }
    const ord = m.split(' '); let bast = 1, diff = 1e9;
    for (let i = 1; i < ord.length; i++) { const d = Math.abs(ord.slice(0, i).join(' ').length - ord.slice(i).join(' ').length); if (d < diff) { diff = d; bast = i; } }
    ut.push(ord.slice(0, bast).join(' ')); ut.push(ord.slice(bast).join(' '));
  }
  const ihop = [];
  for (const b of ut) { const s = ihop[ihop.length - 1]; if (s && (s + ' ' + b).length <= 44) ihop[ihop.length - 1] = s + ' ' + b; else ihop.push(b); }
  return ihop;
}

const tl = fs.readFileSync(TIDSLINJE, 'utf8').trim().split('\n').slice(1).map(r => r.trim().split(/\s+/).map(Number));
const tal = Object.fromEntries(tl.map(r => [r[0], { start: r[1], slut: r[2] }]));
const sista = Math.max(...manus.map(m => m.scen)) + 1;
const cut = { 1: 0 };
for (let n = 2; n < sista; n++) cut[n] = +(tal[n].start - 0.1).toFixed(3);
cut[sista] = +(tal[sista - 1].slut + 0.15).toFixed(3);
const slot = n => (n < sista ? cut[n + 1] : tal[sista].slut) - cut[n];

const undertexter = [];
for (const m of manus) {
  const n = m.scen, b = bitar(undertext[n]), { start, slut } = tal[n];
  const tot = b.reduce((s, x) => s + x.length, 0); let t = start;
  b.forEach((x, i) => { const d = (slut - start) * x.length / tot; undertexter.push({ id: `tt${n}-${i}`, text: x, start: +t.toFixed(2), slut: +(t + d).toFixed(2), scen: n }); t += d; });
}
undertexter.forEach((u, i) => { const nx = undertexter[i + 1]; u.slut = nx ? Math.min(nx.start, u.slut + 0.6) : u.slut + 0.6; });
fs.writeFileSync(path.join(DIR, 'undertexter.json'), JSON.stringify(undertexter, null, 1));

const lager = {
  hook: `<div class="text rubrik" style="top:150px;font-size:96px;line-height:1.1">Blir burken<br>lättare?</div>`,
  newton: `<div class="text rubrik" style="top:70px;font-size:80px;line-height:1.1">Newtons tredje lag</div>`,
  slut: `<div class="text" style="top:1300px;font-size:46px;font-weight:500;color:#3f4a5c">Testa själv på</div>
         <div class="text rubrik" style="top:1365px;font-size:100px">fysiklabbet.se</div>
         <div class="text" style="top:1510px;font-size:40px;font-weight:500;color:#3f4a5c">Simuleringen Flugan i bägaren</div>`,
};

// Egna scener: scen 6 spelas in över 6 och 7, scen 10 över 10 och 11
const egna = { 3: slot(3), 6: slot(6) + slot(7), 9: slot(9), 10: slot(10) + slot(11) };

(async () => {
  const b = await chromium.launch({ executablePath: exe });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(pathToFileURL(path.join(BYGG, 'render.html')).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const skjut = async (namn, html, bakgrund) => {
    await p.evaluate(h => window.visa(h), html);
    await p.evaluate(() => document.fonts.ready);
    await p.locator('#yta').screenshot({ path: path.join(OUT, namn + '.png'), omitBackground: !bakgrund });
  };
  await skjut('papper', '<div class="papper"></div>', true);
  for (const [n, h] of Object.entries(lager)) await skjut(n, h);
  for (const u of undertexter) await skjut(u.id, `<div class="tt"><span>${u.text}</span></div>`);

  await p.goto(pathToFileURL(path.join(BYGG, 'egna.html')).href, { waitUntil: 'networkidle' });
  await p.evaluate(s => window.satt(s), { 6: slot(6), 10: slot(10) });
  // Värm upp alla teckensnittsvikter innan första bildrutan
  for (const n of Object.keys(egna)) await p.evaluate(n => window.rita(+n, 1), n);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  console.log('fysik:', JSON.stringify(await p.evaluate(() => window.info())));
  for (const [n, d] of Object.entries(egna)) {
    const mapp = path.join(DIR, 's' + n); fs.mkdirSync(mapp, { recursive: true });
    const antal = Math.round(d * 30);
    for (let i = 0; i < antal; i++) {
      await p.evaluate(([n, t]) => window.rita(+n, t), [n, i / 30]);
      await p.locator('#c').screenshot({ path: path.join(mapp, `f${String(i).padStart(4, '0')}.png`) });
    }
    console.log(`scen ${n}: ${antal} bildrutor`);
  }
  await b.close();
  console.log('klart:', Object.keys(lager).length, 'lager,', undertexter.length, 'undertexter');
})();
