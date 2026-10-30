// Spelar in vakuumsimuleringen bildruta för bildruta med en virtuell klocka,
// så att rörelsen blir jämn och skarp oavsett hur lång tid varje skärmdump tar.
//   node film-sim-spela.js <utmapp>
const { chromium } = require('playwright-core');
const fs = require('fs');
const UT = process.argv[2];
fs.mkdirSync(UT, { recursive: true });
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(f => fs.existsSync(f));
const FPS = 30;
const KLIPP = { x: 168, y: 553, width: 464, height: 530 };

const KLOCKA = `
(() => {
  let t = 0; const start = Date.now(); let ko = [];
  const pn = performance.now.bind(performance);
  performance.now = () => t;
  const RD = Date;
  Date.now = () => start + t;
  window.requestAnimationFrame = cb => { ko.push(cb); return ko.length; };
  window.cancelAnimationFrame = () => {};
  window.__steg = dt => { t += dt; const k = ko; ko = []; k.forEach(cb => { try { cb(t); } catch (e) { console.error(e); } }); };
})();`;

(async () => {
  const b = await chromium.launch({ executablePath: exe });
  const p = await b.newPage({ viewport: { width: 1280, height: 1200 }, deviceScaleFactor: 2.5 });
  await p.addInitScript(KLOCKA);
  await p.goto('http://localhost:8000/fysik1-tyngdfaktor-jorden.html?sim=vacuum', { waitUntil: 'load' });
  await p.waitForTimeout(3500);
  await p.addStyleTag({ content: '.scene-toggles,.fs-btn,.st-show-btn{display:none!important}' });
  const steg = async (n, foto, namn) => {
    for (let i = 0; i < n; i++) {
      await p.evaluate(dt => window.__steg(dt), 1000 / FPS);
      if (foto) await p.screenshot({ path: `${UT}/${namn}-${String(i).padStart(4, '0')}.png`, clip: KLIPP });
    }
  };
  await steg(10, false);
  const klicka = async txt => { await p.getByRole('button', { name: txt, exact: true }).click(); };
  // Med luft
  await steg(5, true, 'luft-fore');
  await klicka('Vänd rören & släpp');
  await steg(150, true, 'luft');
  // Pumpa ut all luft (spelas inte in)
  for (let i = 0; i < 2000 && await p.getByRole('button', { name: '↻ Återställ', exact: true }).isDisabled(); i++) await steg(3, false);
  console.log('luftfall:', await p.evaluate(() => (document.body.innerText.match(/\d,\d\d s/g) || []).join(' ')));
  await klicka('↻ Återställ');
  await steg(10, false);
  await klicka('Pumpa ut luften');
  await steg(30 * 20, false);
  console.log('luft kvar:', await p.evaluate(() => document.body.innerText.match(/(\d+) %/)?.[0]));
  await steg(5, true, 'vak-fore');
  await klicka('Vänd rören & släpp');
  await steg(150, true, 'vak');
  console.log('falltider:', await p.evaluate(() => (document.body.innerText.match(/\d,\d\d s/g) || []).join(' ')));
  await b.close();
})();
