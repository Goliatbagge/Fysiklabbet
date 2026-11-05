// Spelar in hur olikheten −2x + 5 < x − 4 löses grafiskt i GeoGebra
// Classic (ma1c-4.9 exempel 2). Kör: node .claude/geogebra/spela-in-olikhet.js
// Samma upplägg som spela-in.js (exempel 1); BAS byter server vid behov.
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
  await p.goto((process.env.BAS || 'http://localhost:8000') + '/.claude/geogebra/scen.html', { waitUntil: 'domcontentloaded' });
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
  const film = path.join(UT, 'olik.webm');
  const rec = await p.screencast({ path: film });

  await text('Vi löser olikheten −2<i>x</i> + 5 &lt; <i>x</i> − 4 grafiskt i GeoGebra');
  await vanta(2600);

  await text('Skriv in vänstra ledet som <i>y</i> = −2<i>x</i> + 5 i inmatningsfältet');
  await klicka(150, 77);
  await vanta(400);
  await skriv('y=-2x+5');
  await vanta(700);
  await p.keyboard.press('Enter');
  await vanta(1600);

  await text('Skriv in högra ledet som <i>y</i> = <i>x</i> − 4 och tryck Enter');
  await vanta(400);
  await skriv('y=x-4');
  await vanta(700);
  await p.keyboard.press('Enter');
  await vanta(1600);
  await flytta(640, 330, 700);
  await vanta(300);
  await p.screenshot({ path: path.join(UT, 'olik-grafer.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });
  await vanta(600);

  await text('Klicka på punktverktygen och välj Skärning mellan två objekt');
  await klicka(70, 27, 900);
  await vanta(1400);
  await flytta(170, 212, 800);
  await vanta(500);
  await klicka(170, 212, 200);
  await vanta(1200);

  await text('Klicka på den ena linjen och sedan på den andra');
  const p1 = await skarm(1, 3);
  const p2 = await skarm(5.5, 1.5);
  await klicka(p1.x, p1.y, 1000);
  await vanta(900);
  await klicka(p2.x, p2.y, 1000);
  await vanta(1200);
  const A = await skarm(3, -1);
  await flytta(A.x + 60, A.y + 110, 900);
  await vanta(600);

  await text('Skärningspunkten är A = (3, −1)');
  await vanta(2200);
  await p.screenshot({ path: path.join(UT, 'olik-skarning.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });

  // Pekaren följer linjen f till höger om A, där den ligger under g.
  await text('Till höger om A ligger <i>y</i> = −2<i>x</i> + 5 under <i>y</i> = <i>x</i> − 4');
  const s0 = await skarm(3.15, -2 * 3.15 + 5);
  await flytta(s0.x, s0.y, 900);
  await vanta(300);
  for (const xv of [3.5, 3.9, 4.3]) {
    const q = await skarm(xv, -2 * xv + 5);
    await flytta(q.x, q.y, 700);
  }
  await vanta(1400);
  await p.screenshot({ path: path.join(UT, 'olik-under.png'), clip: { x: 0, y: 0, width: 960, height: 480 } });
  await vanta(400);

  await text('Olikheten gäller alltså när <i>x</i> &gt; 3');
  await vanta(4000);

  await rec.stop();
  const info = await p.evaluate(() => ({ alg: ggb.getAllObjectNames().map(n => n + ': ' + ggb.getValueString(n)) }));
  console.log(JSON.stringify(info));
  await b.close();

  const mp4 = path.join(UT, 'ggb-grafisk-olikhet.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', film, '-vf', 'fps=30,scale=960:540',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '28', '-preset', 'slow', '-movflags', '+faststart', '-an', mp4]);
  console.log('mp4', (fs.statSync(mp4).size / 1e6).toFixed(2), 'MB');
})();
