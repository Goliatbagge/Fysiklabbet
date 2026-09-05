// Spelar in en kort film (reel) av en simulering eller minisimulering på
// sajten — färdig att ladda upp på Instagram (och Facebook) som rörligt
// inlägg i stället för en stillbild.
//
// Bakgrund (SoMe-rapporterna aug/sep 2026): Instagram visar i praktiken inte
// stillbilder från konton utan följare för någon ny publik; reels är det enda
// format som distribueras till icke-följare. Simuleringarna är färdigt
// reels-material, och det här skriptet gör klippet utan handpåläggning.
//
// Användning (dev-servern på port 8000 måste svara):
//
//   node .claude/some/spela-in-reel.js --url http://localhost:8000/fysik2-magnetror-app.html \
//        --ut .shots/magnetror-reel.mp4 --titel "Magneten i kopparröret" \
//        --klick "Släpp magneterna" --langd 8
//
// Flaggor:
//   --url     Sidan som spelas in (obligatorisk).
//   --ut      Utfil, .mp4 (obligatorisk). En .webm-råfil läggs bredvid och
//             tas bort när mp4:an är klar.
//   --titel   Rubrik i bandet ovanför scenen (Poppins, bläck på papper).
//             Utelämnas den skrivs sidans <h1> (eller <title> före " — ").
//   --rad2    Valfri andra rad under rubriken (kort: "Dra i reglaget …").
//   --valj    CSS-väljare för det som filmas. Standard `.scene-wrap`
//             (simuleringarna); minisimuleringar i teorin: `.lab-minisim`,
//             och med --block väljs den minisim som ligger i den rutan.
//   --block   Ankare i katalogen (samma som &block= i adressen) — sidan
//             öppnas med ankaret och första `.lab-minisim` INUTI den rutan
//             filmas. Kräver --valj .lab-minisim.
//   --klick   Klicka på en knapp/etikett vars text innehåller strängen,
//             EFTER att inspelningen startat (så att starten syns). Kan
//             upprepas; flera --klick klickas i ordning med --paus emellan.
//   --forklick Samma, men FÖRE inspelningen (förbered scenen: byt läge,
//             kryssa i "Visa spår" …).
//   --paus    Millisekunder mellan klick (standard 400).
//   --start   Millisekunder från inspelningsstart till första --klick
//             (standard 800: en stund stillbild före starten).
//   --langd   Filmens längd i sekunder (standard 8, max 60). Instagram
//             kräver minst 3 s.
//   --format  4:5 (standard, 1080×1350 — fyller flödet) eller 9:16
//             (1080×1920, helskärmsreel).
//   --js      Valfri JavaScript-sträng som körs i sidan före inspelningen
//             (t.ex. sätta ett reglage: "document.querySelector('#fart').value=9200").
//
// Så här görs bilden: sidan laddas i headless Chrome i bred vy (så att
// simuleringen får sin vanliga liggande layout, inte mobil-dockningen),
// scenen lyfts ut som ett fast element överst i en 1080 px bred yta med
// pappersfärg, skalas till full bredd, och ett rubrikband i Poppins läggs
// ovanför. Allt annat på sidan täcks över. Ramen som filmas är exakt
// 1080×1350 (eller 1080×1920). React-händelserna rörs inte: scenen flyttas
// aldrig i DOM:en, bara positioneras med CSS, så knapparna fungerar under
// inspelningen.
//
// Kräver puppeteer-core i %TEMP%\pptr-test (samma som verifierarna) och
// ffmpeg (winget Gyan.FFmpeg; sökvägen hittas via PATH eller miljövariabeln
// FFMPEG). Ljudspår: tyst AAC-spår läggs till — Instagram nekar ibland
// helt ljudlösa filer.

const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawnSync } = require('child_process');

const PPTR = path.join(os.tmpdir(), 'pptr-test', 'node_modules', 'puppeteer-core');
const puppeteer = require(PPTR);
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

function hittaFfmpeg() {
  if (process.env.FFMPEG && fs.existsSync(process.env.FFMPEG)) return process.env.FFMPEG;
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['ffmpeg'], { encoding: 'utf8' });
  const rad = (r.stdout || '').split(/\r?\n/).map(s => s.trim()).find(Boolean);
  if (rad && fs.existsSync(rad)) return rad;
  throw new Error('ffmpeg hittas inte — installera (winget install Gyan.FFmpeg) eller sätt FFMPEG=<sökväg>.');
}

// --- argument ---------------------------------------------------------
const arg = { klick: [], forklick: [] };
{
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    if (!k.startsWith('--')) continue;
    const namn = k.slice(2);
    const v = a[i + 1];
    if (namn === 'klick' || namn === 'forklick') { arg[namn].push(v); i++; }
    else { arg[namn] = v; i++; }
  }
}
if (!arg.url || !arg.ut) {
  console.error('Användning: --url <adress> --ut <fil.mp4> [--titel …] [--klick …] [--langd 8]');
  process.exit(2);
}
const LANGD  = Math.min(60, Math.max(3, parseFloat(arg.langd || '8')));
const PAUS   = parseInt(arg.paus || '400', 10);
const START  = parseInt(arg.start || '800', 10);
const VALJ   = arg.valj || '.scene-wrap';
const FORMAT = arg.format === '9:16' ? '9:16' : '4:5';
const W = 1080;
const H = FORMAT === '9:16' ? 1920 : 1350;
const FPS = 30;
const ut = path.resolve(arg.ut);
const raw = ut.replace(/\.mp4$/i, '') + '.webm';
const ffmpeg = hittaFfmpeg();

// Bred vy: simuleringens vanliga desktop-layout. Höjden = ramens höjd så
// att crop-rutan ryms i viewporten (puppeteer kräver det).
const VIEW_W = 1700;
const VIEW_H = H;

// --- själva inspelningen ---------------------------------------------
(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: [`--window-size=${VIEW_W},${VIEW_H}`, '--autoplay-policy=no-user-gesture-required',
           '--hide-scrollbars', '--font-render-hinting=none'],
    defaultViewport: { width: VIEW_W, height: VIEW_H, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();
  let url = arg.url;
  if (arg.block && !/[?&]block=/.test(url)) url += (url.includes('?') ? '&' : '?') + 'block=' + arg.block;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  // Klick på knapp/etikett via text (samma helper som skärmdumpsskripten).
  async function klicka(txt) {
    const ok = await page.evaluate(t => {
      const kand = [...document.querySelectorAll('button, label, a, summary, [role="button"]')];
      const b = kand.find(b => (b.textContent || '').trim().toLowerCase().includes(t.toLowerCase()));
      if (!b) return null;
      b.scrollIntoView({ block: 'center' });
      b.click();
      return b.textContent.trim().slice(0, 40);
    }, txt);
    console.log((ok ? 'klickade: ' : 'HITTADE INTE: ') + (ok || txt));
    if (!ok) process.exitCode = 3;
    await new Promise(r => setTimeout(r, PAUS));
  }

  if (arg.js) await page.evaluate(arg.js);
  for (const t of arg.forklick) await klicka(t);

  // Rubrik: --titel, annars h1, annars <title> före " — ".
  const titel = arg.titel || await page.evaluate(() => {
    const h = document.querySelector('h1');
    if (h && h.textContent.trim()) return h.textContent.trim();
    return (document.title || '').split(' — ')[0].trim();
  });

  // Bygg reel-ramen: pappersyta som täcker allt, scenen fast överst,
  // rubrikband i Poppins. Scenen flyttas INTE i DOM:en.
  const info = await page.evaluate(({ VALJ, block, W, H, titel, rad2 }) => {
    let el = null;
    if (block) {
      const ruta = document.querySelector(`[data-block="${block}"],[data-blockkort="${block}"],[data-blocknr="${block}"]`);
      el = ruta ? ruta.querySelector(VALJ) : null;
    }
    if (!el) el = document.querySelector(VALJ);
    if (!el) return { fel: 'hittar inget element för ' + VALJ };

    const PAPPER = '#f7f2e8', BLACK = '#0f1620';
    const st = document.createElement('style');
    st.textContent = `
      html, body { overflow: hidden !important; background: ${PAPPER} !important; }
      #reel-tack { position: fixed; left: 0; top: 0; width: ${W}px; height: ${H}px;
        background: linear-gradient(180deg, #f7f2e8 0%, #ece3d2 100%); z-index: 99990; }
      #reel-band { position: fixed; left: 0; top: 0; width: ${W}px; z-index: 99995;
        font-family: Poppins, 'Segoe UI', sans-serif; color: ${BLACK}; padding: 54px 60px 0; box-sizing: border-box; }
      #reel-band .t { font-size: 52px; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
      #reel-band .r { font-size: 30px; font-weight: 400; line-height: 1.3; margin-top: 12px; opacity: .85; }
      #reel-fot { position: fixed; left: 0; bottom: 34px; width: ${W}px; text-align: center; z-index: 99995;
        font-family: Poppins, 'Segoe UI', sans-serif; font-size: 28px; font-weight: 500; color: ${BLACK}; opacity: .7; }
      #reel-scen-mal { position: fixed !important; z-index: 99993 !important; margin: 0 !important; }
      #reel-scen-mal .fs-btn, #reel-scen-mal .st-show-btn, #reel-scen-mal .fs-quick,
      #reel-scen-mal .fs-toggle-handle, #reel-scen-mal .fs-controls { display: none !important; }
    `;
    document.head.appendChild(st);
    const tack = document.createElement('div'); tack.id = 'reel-tack';
    const band = document.createElement('div'); band.id = 'reel-band';
    band.innerHTML = `<div class="t"></div>` + (rad2 ? `<div class="r"></div>` : '');
    band.querySelector('.t').textContent = titel;
    if (rad2) band.querySelector('.r').textContent = rad2;
    const fot = document.createElement('div'); fot.id = 'reel-fot'; fot.textContent = 'fysiklabbet.se';
    document.body.append(tack, band, fot);

    const bandH = band.getBoundingClientRect().height + 30;
    const fotH = 34 + fot.getBoundingClientRect().height + 30;
    const r = el.getBoundingClientRect();
    const k = Math.min(W / r.width, (H - bandH - fotH) / r.height);
    const scenH = r.height * k;
    const top = bandH + Math.max(0, (H - bandH - fotH - scenH) / 2);
    el.id = el.id || 'reel-scen';
    el.setAttribute('data-reel', '1');
    // Fast position + skala. Elementets egen bredd/höjd behålls så att
    // canvas- och SVG-scener inte ritas om i annan storlek mitt i klippet.
    el.style.setProperty('position', 'fixed', 'important');
    el.style.setProperty('left', '0px', 'important');
    el.style.setProperty('top', top + 'px', 'important');
    el.style.setProperty('width', r.width + 'px', 'important');
    el.style.setProperty('height', r.height + 'px', 'important');
    el.style.setProperty('transform-origin', '0 0', 'important');
    el.style.setProperty('transform', `scale(${k}) translateX(${((W - r.width * k) / 2) / k}px)`, 'important');
    el.style.setProperty('z-index', '99993', 'important');
    el.style.setProperty('border-radius', '18px', 'important');
    el.style.setProperty('box-shadow', '0 10px 30px rgba(15,22,32,.12)', 'important');
    el.classList.add('reel-scen-mal');
    el.id === 'reel-scen' || (el.dataset.reelId = el.id);
    // Gör dolda knappar-regeln oberoende av id
    st.textContent = st.textContent.replace(/#reel-scen-mal/g, '[data-reel="1"]');
    window.scrollTo(0, 0);
    return { bredd: r.width, hojd: r.height, skala: k, top, bandH };
  }, { VALJ, block: arg.block, W, H, titel, rad2: arg.rad2 });

  if (info.fel) { console.error(info.fel); await browser.close(); process.exit(4); }
  console.log(`scen ${Math.round(info.bredd)}×${Math.round(info.hojd)} → skala ${info.skala.toFixed(3)}, band ${Math.round(info.bandH)} px, ram ${W}×${H}`);
  await new Promise(r => setTimeout(r, 600));

  const recorder = await page.screencast({
    path: raw, ffmpegPath: ffmpeg, fps: FPS,
    crop: { x: 0, y: 0, width: W, height: H },
  });
  const t0 = Date.now();
  if (arg.klick.length) {
    await new Promise(r => setTimeout(r, START));
    for (const t of arg.klick) await klicka(t);
  }
  const kvar = LANGD * 1000 - (Date.now() - t0);
  if (kvar > 0) await new Promise(r => setTimeout(r, kvar));
  await recorder.stop();
  await browser.close();

  // webm → mp4 (H.264, yuv420p, 30 fps, tyst AAC-spår, faststart).
  const ff = spawnSync(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', raw,
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
    '-shortest', '-r', String(FPS),
    '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-profile:v', 'high', '-level', '4.0',
    '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', ut,
  ], { encoding: 'utf8' });
  if (ff.status !== 0) { console.error('ffmpeg misslyckades:\n' + ff.stderr); process.exit(5); }
  fs.unlinkSync(raw);

  const probe = spawnSync(path.join(path.dirname(ffmpeg), 'ffprobe'), [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate:format=duration',
    '-of', 'default=nw=1', ut,
  ], { encoding: 'utf8' });
  console.log('klar: ' + ut + '\n' + (probe.stdout || '').trim());
})().catch(e => { console.error(e); process.exit(1); });
