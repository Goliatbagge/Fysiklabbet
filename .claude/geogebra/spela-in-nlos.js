// Spelar in hur ekvationen 93 = 10 · lg(I / 10^−12) löses med NLös i
// GeoGebras CAS-räknare (fy2-2.11 exempel 2, alternativ lösning). Filmen
// fälls in i pennlösningen (scenen ljudniva i handskrift.js) och visas
// som ::: video i textlösningen.
//
// Kör: node .claude/geogebra/spela-in-nlos.js [bas-URL]
// Bas-URL:en ska servera repots rot (standard http://localhost:8000).
// Kräver ffmpeg i PATH och puppeteer-core i %TEMP%\pptr-test.
//
// Filmen renderas BILDRUTA FÖR BILDRUTA (en skärmdump per ruta, 30 fps)
// i stället för med screencast, så att pekaren glider jämnt och ingen
// ruta tappas. Rutor som står still sparas en gång och får en längd i
// ffmpegs concat-lista. GeoGebra laddas som den officiella appleten
// (scen-cas.html, appName 'cas', svenska), så att ingen cookieruta kommer
// med. Utfil: media/video/geogebra-nlos-ljudniva.mp4 + .jpg.
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const puppeteer = require(path.join(process.env.TEMP, 'pptr-test/node_modules/puppeteer-core'));
const ROT = path.join(__dirname, '..', '..');
const BAS = process.argv[2] || 'http://localhost:8000';
const TMP = path.join(ROT, '.shots', 'ggb-nlos');
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const vanta = (ms) => new Promise(r => setTimeout(r, ms));
const FPS = 30;

(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new', args: ['--lang=sv-SE'], defaultViewport: { width: 960, height: 540 },
  });
  const p = await b.newPage();
  const cdp = await p.target().createCDPSession();
  await p.goto(BAS + '/.claude/geogebra/scen-cas.html', { waitUntil: 'domcontentloaded' });
  await p.waitForFunction(() => window.ggbKlar, { timeout: 90000 });
  await vanta(3000);
  await p.evaluate(() => {
    document.getElementById('text').style.transition = 'none';
    const m = document.createElement('div');
    m.id = 'markering';
    m.style.cssText = 'position:absolute;border:3px solid rgba(37,99,201,.9);border-radius:10px;' +
      'pointer-events:none;z-index:99998;opacity:0';
    document.body.appendChild(m);
  });

  /* ---- bildrutor ---- */
  const rutor = [];
  async function ruta(antal = 1) {
    const fil = 'f' + String(rutor.length).padStart(5, '0') + '.jpg';
    await p.screenshot({ path: path.join(TMP, fil), type: 'jpeg', quality: 92 });
    rutor.push({ fil, antal });
  }
  const hall = (ms) => ruta(Math.max(1, Math.round(ms * FPS / 1000)));

  /* ---- pekare och klick ---- */
  let mus = { x: 640, y: 400 };
  async function pekare(x, y) {
    await p.evaluate((x, y) => {
      const e = document.getElementById('pekare');
      e.style.left = (x - 3) + 'px'; e.style.top = (y - 2) + 'px';
    }, x, y);
  }
  async function flytta(x, y, ms = 700) {
    const n = Math.max(6, Math.round(ms * FPS / 1000)), x0 = mus.x, y0 = mus.y;
    for (let i = 1; i <= n; i++) {
      const t = i / n, s = t * t * (3 - 2 * t);
      const xi = x0 + (x - x0) * s, yi = y0 + (y - y0) * s;
      await p.mouse.move(xi, yi);
      await pekare(xi, yi);
      await ruta();
    }
    mus = { x, y };
  }
  async function ring(x, y, v) {
    await p.evaluate((x, y, v) => {
      const r = document.getElementById('ring');
      r.style.left = x + 'px'; r.style.top = y + 'px';
      r.style.opacity = v >= 1 ? 0 : (1 - v);
      r.style.transform = 'scale(' + (0.4 + v) + ')';
    }, x, y, v);
  }
  async function klicka(x, y, ms) {
    await flytta(x, y, ms);
    await hall(200);
    const n = 13;
    for (let i = 0; i <= n; i++) {
      if (i === 1) await p.mouse.down();
      if (i === 3) { await p.mouse.up(); await vanta(150); }
      await ring(x, y, i / n);
      await ruta();
    }
  }

  /* ---- tangentbord ---- */
  async function tangent(c) {
    if (/[a-zA-Z0-9=\-\/\^\(\)\*\.,+ ]/.test(c)) { await p.keyboard.type(c); return; }
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: c, text: c, unmodifiedText: c, code: 'Semicolon', windowsVirtualKeyCode: 192 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: c, code: 'Semicolon', windowsVirtualKeyCode: 192 });
  }
  async function skriv(s) {
    for (const c of s) { await tangent(c); await vanta(110); await ruta(5); }
  }
  async function tryck(tangentnamn) {
    await p.keyboard.press(tangentnamn); await vanta(160); await ruta(9);
  }

  /* ---- textraden under appleten (tonar ut och in, 6 + 6 rutor) ---- */
  async function text(html) {
    for (let i = 1; i <= 6; i++) {
      await p.evaluate((o) => { document.getElementById('text').style.opacity = o; }, 1 - i / 6);
      await ruta();
    }
    await p.evaluate((h) => { document.getElementById('text').innerHTML = '<span>' + h + '</span>'; }, html);
    for (let i = 1; i <= 6; i++) {
      await p.evaluate((o) => { document.getElementById('text').style.opacity = o; }, i / 6);
      await ruta();
    }
  }

  /* ================= filmen ================= */
  await pekare(mus.x, mus.y);
  await p.mouse.move(mus.x, mus.y);
  await text('Vi löser 93 = 10 · lg(<i>I</i>/10<sup>−12</sup>) med NLös i GeoGebras CAS-räknare');
  await hall(2800);

  /* Algebrafönstret vidgas så att hela ekvationen får plats. */
  await text('Dra först algebrafönstret bredare, så att ekvationen får plats');
  await flytta(279, 240, 800);
  await hall(250);
  await p.mouse.down();
  await ruta(2);
  {
    const n = 22, x0 = 279, x1 = 700;
    for (let i = 1; i <= n; i++) {
      const t = i / n, s = t * t * (3 - 2 * t), x = x0 + (x1 - x0) * s;
      await p.mouse.move(x, 240); await pekare(x, 240); await vanta(25); await ruta();
    }
    mus = { x: x1, y: 240 };
  }
  await p.mouse.up();
  await vanta(600);
  await hall(600);

  await text('Klicka i inmatningsfältet och skriv <b>nlös</b>');
  await klicka(250, 23, 900);
  await hall(300);
  await skriv('nlös');
  await vanta(500);
  await hall(900);

  await text('Peka på NLös och välj <b>NLös( Ekvation )</b>');
  await flytta(200, 72, 600);
  await vanta(700);
  await hall(900);
  const mal = await p.evaluate(() => {
    const e = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 &&
      e.textContent.trim() === 'NLös( Ekvation )')[0];
    const r = e.getBoundingClientRect(); return { x: r.left + 60, y: r.top + r.height / 2 };
  });
  await flytta(mal.x - 40, mal.y - 50, 300);
  await flytta(mal.x, mal.y, 500);
  await hall(700);
  await klicka(mal.x, mal.y, 100);
  await vanta(400);
  await flytta(560, 330, 700);
  await hall(1200);

  await text('Skriv in ekvationen. Snedstrecket / gör ett bråk och ^ en exponent');
  await hall(1400);
  await skriv('93=10lg(');
  await hall(500);
  await skriv('I/');
  await hall(500);
  await skriv('10^-12');
  await hall(1400);

  await text('Tryck två gånger på högerpilen (→) för att komma ut ur exponenten och nämnaren');
  await hall(1800);
  await tryck('ArrowRight');
  await tryck('ArrowRight');
  await hall(1400);

  await text('Tryck Enter');
  await hall(1100);
  await tryck('Enter');
  await vanta(1200);
  await flytta(560, 300, 500);
  await hall(1500);

  /* Svaret ringas in. Utdataraden ritas av GeoGebra och går inte att mäta
     i DOM:en, så rutan är uppmätt i en skärmdump av samma läge (algebra-
     fönstret draget till x = 700). */
  const svar = { x: 142, y: 72, w: 212, h: 26 };
  await text('GeoGebra svarar <i>I</i> ≈ 0.001995… och skriver decimaltal med punkt');
  if (svar) {
    await p.evaluate((s) => {
      const m = document.getElementById('markering');
      m.style.left = (s.x - 8) + 'px'; m.style.top = (s.y - 6) + 'px';
      m.style.width = (s.w + 16) + 'px'; m.style.height = (s.h + 12) + 'px';
    }, svar);
    for (let i = 1; i <= 8; i++) {
      await p.evaluate((o) => { document.getElementById('markering').style.opacity = o; }, i / 8);
      await ruta();
    }
  }
  await hall(3200);
  await text('<i>I</i> ≈ 0,0020 W/m<sup>2</sup> = 2,0 mW/m<sup>2</sup>, samma svar som med algebra');
  await hall(3800);
  await p.screenshot({ path: path.join(TMP, 'affisch.jpg'), type: 'jpeg', quality: 88 });

  const info = await p.evaluate(() => ggb.getAllObjectNames().map(n => ggb.getCommandString(n) + ' -> ' + ggb.getValueString(n)));
  console.log(JSON.stringify(info), 'svarets ruta:', JSON.stringify(svar));
  await b.close();

  /* ---- ihop till mp4: concat-lista med längder ---- */
  const lista = rutor.map(r => "file '" + r.fil + "'\nduration " + (r.antal / FPS).toFixed(5)).join('\n') +
    "\nfile '" + rutor[rutor.length - 1].fil + "'\n";
  fs.writeFileSync(path.join(TMP, 'lista.txt'), lista);
  const mp4 = path.join(ROT, 'media', 'video', 'geogebra-nlos-ljudniva.mp4');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0',
    '-i', path.join(TMP, 'lista.txt'), '-vf', 'fps=30,format=yuv420p', '-r', '30',
    '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', '-an', mp4]);
  fs.copyFileSync(path.join(TMP, 'affisch.jpg'), path.join(ROT, 'media', 'video', 'geogebra-nlos-ljudniva.jpg'));
  const sek = rutor.reduce((s, r) => s + r.antal, 0) / FPS;
  console.log('mp4', (fs.statSync(mp4).size / 1e6).toFixed(2), 'MB,', sek.toFixed(1), 's');
})();
