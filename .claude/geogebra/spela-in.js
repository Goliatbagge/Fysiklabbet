// Spelar in hur ekvationen 3x − 5 = −x + 3 löses grafiskt i GeoGebra
// Classic (ma1c-4.9 exempel 1). Kör: node .shots/ggb/spela-in.js
// Kräver dev-servern på port 8000 och ffmpeg i PATH. GeoGebra laddas som
// den officiella appleten (deployggb.js) i scen.html, så att ingen cookieruta
// från geogebra.org kommer med. Film och skärmdumpar hamnar i .shots/ggb/.
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test/node_modules/puppeteer-core'));
const UT = path.join(__dirname, '..', '..', '.shots', 'ggb');
fs.mkdirSync(UT, { recursive: true });
const vanta = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new', args: ['--lang=sv-SE'], defaultViewport: { width: 960, height: 540 },
  });
  const p = await b.newPage();
  await p.goto('http://localhost:8000/.claude/geogebra/scen.html', { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.ggbKlar, { timeout: 90000 });
  await vanta(2500);

  let mus = { x: 600, y: 360 };
  async function pekare(x, y) {
    await p.evaluate((x, y) => {
      const e = document.getElementById('pekare');
      e.style.left = (x - 3) + 'px'; e.style.top = (y - 2) + 'px';
    }, x, y);
  }
  async function flytta(x, y, ms = 700) {
    const n = Math.max(8, Math.round(ms / 20)), x0 = mus.x, y0 = mus.y;
    for (let i = 1; i <= n; i++) {
      const t = i / n, s = t * t * (3 - 2 * t);
      const xi = x0 + (x - x0) * s, yi = y0 + (y - y0) * s;
      await p.mouse.move(xi, yi);
      await pekare(xi, yi);
      await vanta(16);
    }
    mus = { x, y };
  }
  async function klicka(x, y, ms) {
    await flytta(x, y, ms);
    await vanta(250);
    await p.evaluate((x, y) => {
      const r = document.getElementById('ring');
      r.style.left = x + 'px'; r.style.top = y + 'px';
      r.classList.remove('klick'); void r.offsetWidth; r.classList.add('klick');
    }, x, y);
    await p.mouse.click(x, y);
    await vanta(350);
  }
  async function text(html) {
    await p.evaluate((h) => {
      const t = document.getElementById('text');
      t.style.opacity = 0;
      setTimeout(() => { t.innerHTML = '<span>' + h + '</span>'; t.style.opacity = 1; }, 300);
    }, html);
    await vanta(600);
  }
  async function skriv(s) {
    for (const c of s) { await p.keyboard.type(c); await vanta(c === ' ' ? 60 : 150); }
  }
  // Skärmläget för en punkt (x, y) i ritområdet, ur appletens vy.
  async function skarm(x, y) {
    return p.evaluate((x, y) => {
      const v = JSON.parse(ggb.getViewProperties());
      const c = [...document.querySelectorAll('#ggb canvas')]
        .map(e => e.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0];
      return { x: c.left + (x - v.xMin) / v.invXscale, y: c.top + c.height - (y - v.yMin) / v.invYscale };
    }, x, y);
  }

  await pekare(mus.x, mus.y);
  await p.mouse.move(mus.x, mus.y);
  const film = path.join(UT, 'ggb.webm');
  const rec = await p.screencast({ path: film });

  await text('Vi löser ekvationen 3<i>x</i> − 5 = −<i>x</i> + 3 grafiskt i GeoGebra');
  await vanta(2600);

  await text('Skriv in vänstra ledet som <i>y</i> = 3<i>x</i> − 5 i inmatningsfältet');
  await klicka(150, 77);
  await vanta(400);
  await skriv('y=3x-5');
  await vanta(700);
  await p.keyboard.press('Enter');
  await vanta(1600);

  await text('Skriv in högra ledet som <i>y</i> = −<i>x</i> + 3 och tryck Enter');
  await vanta(400);
  await skriv('y=-x+3');
  await vanta(700);
  await p.keyboard.press('Enter');
  await vanta(1600);
  await p.screenshot({ path: path.join(UT, 'bild-grafer.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });
  await vanta(600);

  await text('Klicka på punktverktygen och välj Skärning mellan två objekt');
  await klicka(70, 27, 900);
  await vanta(1400);
  await flytta(170, 212, 800);
  await vanta(500);
  await p.screenshot({ path: path.join(UT, 'bild-verktyg.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });
  await klicka(170, 212, 200);
  await vanta(1200);

  await text('Klicka på den ena linjen och sedan på den andra');
  const p1 = await skarm(2.9, 3 * 2.9 - 5);
  const p2 = await skarm(-0.5, 0.5 + 3);
  await klicka(p1.x, p1.y, 1000);
  await vanta(900);
  await klicka(p2.x, p2.y, 1000);
  await vanta(1200);
  const A = await skarm(2, 1);
  await flytta(A.x + 120, A.y + 90, 900);
  await vanta(600);

  await text('Skärningspunkten är A = (2, 1). Lösningen är <i>x</i> = 2');
  await vanta(1500);
  await p.screenshot({ path: path.join(UT, 'bild-skarning.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });
  await vanta(3500);

  await rec.stop();
  const info = await p.evaluate(() => ({ alg: ggb.getAllObjectNames().map(n => n + ': ' + ggb.getValueString(n)) }));
  console.log(JSON.stringify(info));
  await b.close();

  const mp4 = path.join(UT, 'ggb-grafisk-losning.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', film, '-vf', 'fps=30,scale=960:540',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '28', '-preset', 'slow', '-movflags', '+faststart', '-an', mp4]);
  console.log('mp4', (fs.statSync(mp4).size / 1e6).toFixed(2), 'MB');
})();
