// Renderar textlager, undertexter, bakgrund och scen 3 till PNG.
//   node film-rendera.js <filmmapp i scratchpad> <tidslinje.txt>
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const OUT = path.join(DIR, 'lager');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(DIR, 's3'), { recursive: true });
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(f => fs.existsSync(f));
const url = f => 'file:///' + path.join(DIR, f).replace(/\\/g, '/');

// Repliker och undertexter läses ur manus.json (femte argumentet)
const manus = JSON.parse(fs.readFileSync(process.argv[5], 'utf8')).segment;
const repliker = Object.fromEntries(manus.map(m => [m.scen, m.tal]));
const undertext = Object.fromEntries(manus.map(m => [m.scen, m.undertext.replace(/(\d) (\d{3}|m\/s\b|m\b|s\b|år\b)/g, '$1 $2')]));

// Dela en replik i bitar om högst 32 tecken per rad och högst två rader
function bitar(t) {
  const meningar = t.match(/[^.?!]+[.?!]?/g).map(s => s.trim()).filter(Boolean);
  const ut = [];
  for (const m of meningar) {
    if (m.length <= 64) { ut.push(m); continue; }
    const ord = m.split(' '); let a = '';
    for (const o of ord) { if ((a + ' ' + o).trim().length > 40 && a) { ut.push(a); a = o; } else a = (a + ' ' + o).trim(); }
    if (a) ut.push(a);
  }
  // slå ihop korta grannar så länge de ryms på två rader
  const ihop = [];
  for (const b of ut) { const s = ihop[ihop.length - 1]; if (s && (s + ' ' + b).length <= 44) ihop[ihop.length - 1] = s + ' ' + b; else ihop.push(b); }
  return ihop;
}

const tl = fs.readFileSync(process.argv[3], 'utf8').trim().split('\n').slice(1).map(r => r.trim().split(/\s+/).map(Number));
const tal = Object.fromEntries(tl.filter(r => r[0] <= 14).map(r => [r[0], { start: r[1], slut: r[2] }]));
const undertexter = [];
for (const n of Object.keys(repliker).map(Number)) {
  const b = bitar(undertext[n]); const { start, slut } = tal[n];
  const tot = b.reduce((s, x) => s + x.length, 0); let t = start;
  b.forEach((x, i) => { const d = (slut - start) * x.length / tot; undertexter.push({ id: `tt${n}-${i}`, text: x, start: +t.toFixed(2), slut: +(t + d).toFixed(2), scen: n }); t += d; });
}
// varje undertext ligger kvar fram till nästa (högst 0,6 s efter repliken)
undertexter.forEach((u, i) => { const nx = undertexter[i + 1]; u.slut = nx ? Math.min(nx.start, u.slut + 0.6) : u.slut + 0.6; });
fs.writeFileSync(path.join(DIR, 'undertexter.json'), JSON.stringify(undertexter, null, 1));

const lager = {
  hook: `<div class="text rubrik" style="top:150px;font-size:96px;line-height:1.1">Vilken landar<br>först?</div>`,
  aristoteles: `<div class="etikett"><b>Aristoteles</b><i>cirka 350 före vår tideräkning</i></div>`,
  galileo: `<div class="etikett"><b>Galileo Galilei</b><i>1564–1642</i></div>`,
  formel1: `<div class="text formel" style="top:330px"><span data-tex="a = \\dfrac{F_\\mathrm{G}}{m} = \\dfrac{m \\cdot g}{m}"></span></div>`,
  formel2: `<div class="text formel" style="top:330px"><span data-tex="a = \\dfrac{F_\\mathrm{G}}{m} = \\dfrac{\\cancel{m} \\cdot g}{\\cancel{m}} = g"></span></div>`,
  v1: `<div class="rad" style="position:absolute;white-space:nowrap;left:500px;top:225px"><span data-tex="t = 1\\ \\mathrm{s}\\quad v = 9{,}82\\ \\mathrm{m/s}"></span></div>`,
  v2: `<div class="rad" style="position:absolute;white-space:nowrap;left:500px;top:320px"><span data-tex="t = 2\\ \\mathrm{s}\\quad v \\approx 19{,}6\\ \\mathrm{m/s}"></span></div>`,
  v3: `<div class="rad" style="position:absolute;white-space:nowrap;left:500px;top:415px"><span data-tex="t = 3\\ \\mathrm{s}\\quad v \\approx 29{,}5\\ \\mathrm{m/s}"></span></div>`,
  simrubrik: `<div class="text" style="top:150px;font-size:40px;font-weight:600;color:#2b5ca8">Simuleringen Fritt fall i vakuum</div>`,
  nasa: `<div class="text" style="top:1150px;font-size:34px;font-weight:500;color:#3f4a5c">Film: NASA, Apollo 15, 1971</div>`,
  slut: `<div class="text" style="top:1270px;font-size:46px;font-weight:500;color:#3f4a5c">Testa själv på</div>
         <div class="text rubrik" style="top:1335px;font-size:100px">fysiklabbet.se</div>
         <div class="text" style="top:1480px;font-size:40px;font-weight:500;color:#3f4a5c">Simuleringen Fritt fall i vakuum</div>`,
};

(async () => {
  const b = await chromium.launch({ executablePath: exe });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(url('render.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const skjut = async (namn, html, bakgrund) => {
    await p.evaluate(h => window.visa(h), html);
    await p.evaluate(() => document.fonts.ready);
    await p.locator('#yta').screenshot({ path: path.join(OUT, namn + '.png'), omitBackground: !bakgrund });
  };
  await skjut('papper', '<div class="papper"></div>', true);
  for (const [n, h] of Object.entries(lager)) await skjut(n, h);
  for (const u of undertexter) await skjut(u.id, `<div class="tt"><span>${u.text}</span></div>`);
  // Scen 3
  await p.goto(url('scen3.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  console.log('landning (s):', JSON.stringify(await p.evaluate(() => window.info())));
  const n3 = Math.round(+process.argv[4] * 30);
  for (let i = 0; i < n3; i++) {
    await p.evaluate(t => window.rita(t), i / 30);
    await p.locator('#c').screenshot({ path: path.join(DIR, 's3', `f${String(i).padStart(4, '0')}.png`) });
  }
  await b.close();
  console.log('klart:', Object.keys(lager).length, 'lager,', undertexter.length, 'undertexter,', n3, 'bildrutor i scen 3');
})();
