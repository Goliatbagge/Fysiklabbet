// Gör en kort reel av en nyhetsartikels huvudbild: bilden glider långsamt
// över ytan (panorering + svag inzoomning) under ett rubrikband, med
// bildkrediten i nederkanten och fysiklabbet.se under. Samma ram som
// lanseringarnas reels (spela-in-reel.js): 1080×1350, Poppins, pappersyta.
//
// Bakgrund (SoMe-rapporten oktober 2026): stillbilderna med dagens nyhet
// nådde 3–4 konton per inlägg på Instagram, reelsen i snitt 122. Instagram
// visar i praktiken bara reels för icke-följare.
//
// ⚠️ VARFÖR FILMEN RITAS BILDRUTA FÖR BILDRUTA (2026-11-07)
// Första versionen spelade in glidet i realtid med puppeteers screencast.
// Den levererar bara en bildruta när Chrome hinner, och ffmpeg fyller ut
// till 30 fps genom att upprepa rutor: i reelen 2026-11-07 var 66 av 239
// rutor unika, alltså cirka 8 bilder per sekund. Besökarna upplevde filmen
// som hackig och laggig, och ett långsamt glid är just det som avslöjar
// ojämn takt. Nu sätts bildens läge exakt för varje ruta (t = i / antal),
// rutan fotograferas i dubbel upplösning och skalas ned, så att även
// förflyttningar på en bråkdels pixel per ruta syns som ett mjukt glid.
// Gå inte tillbaka till realtidsinspelning för det här formatet.
//
// Användning (ingen dev-server behövs, sidan läses som lokal fil):
//
//   node .claude/some/nyhet-till-reel.js --id 2026-11-02-kalla-atomer \
//        --ut .shots/2026-11-02-kalla-atomer-reel.mp4 --langd 8
//
// Flaggor:
//   --id      Artikelns id (obligatorisk).
//   --ut      Utfil, .mp4 (obligatorisk).
//   --titel   Rubrik i bandet. Standard: artikelns title.
//   --rad2    Valfri andra rad under rubriken.
//   --langd   Filmens längd i sekunder (standard 8).
//   --nyheter Annan nyheter.js att läsa (till exempel en fil utdragen ur
//             origin/main när artikeln inte finns i arbetsgrenen).
//   --bild    Annan bildfil än artikelns image (samma motiv, till exempel
//             en kopia i .shots/ när bilden bara finns på main).
//   --fps     Bildrutor per sekund (standard 30).
//
// Avslutas med kod 6 och skriver ANVÄND STILLBILD när bilden inte får
// bearbetas: licens med NoDerivatives (ND), eller ingen bild alls. Då
// postar jobbet stillbilden som förut.
//
// Kräver puppeteer-core i %TEMP%\pptr-test (samma som verifierarna) och
// ffmpeg (PATH eller miljövariabeln FFMPEG).

const path = require('path');
const fs = require('fs');
const os = require('os');
const vm = require('vm');
const { spawn, spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

const ROT = path.resolve(__dirname, '..', '..');

const arg = {};
{
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) { arg[a[i].slice(2)] = a[i + 1]; i++; }
  }
}
if (!arg.id || !arg.ut) {
  console.error('Användning: --id <artikel-id> --ut <fil.mp4> [--titel …] [--rad2 …] [--langd 8] [--nyheter fil] [--bild fil]');
  process.exit(2);
}

// Läs nyheter.js som i webbläsaren.
const nyheterFil = path.resolve(arg.nyheter || path.join(ROT, 'data', 'nyheter.js'));
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(nyheterFil, 'utf8'), sandbox);
const lista = sandbox.window.NYHETER_ALL || sandbox.window.NYHETER
  || Object.values(sandbox.window).find(v => Array.isArray(v) && v.some(x => x && x.id));
const art = (lista || []).find(x => x.id === arg.id);
if (!art) { console.error('Hittar ingen artikel med id ' + arg.id + ' i ' + nyheterFil); process.exit(2); }

function stillbild(orsak) {
  console.log('ANVÄND STILLBILD: ' + orsak);
  process.exit(6);
}
const bildFil = arg.bild ? path.resolve(arg.bild) : (art.image ? path.join(ROT, art.image) : null);
if (!bildFil || !fs.existsSync(bildFil)) stillbild('artikeln saknar bild' + (bildFil ? ' (' + bildFil + ')' : ''));

// Krediten kan innehålla HTML-entiteter (&nbsp;) som annars syns bokstavligt.
const avkoda = s => String(s)
  .replace(/&nbsp;/g, '\u00a0').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n))
  .replace(/<[^>]+>/g, '');
const kredit = avkoda(art.imageCredit || '').trim();
// NoDerivatives: bilden får inte beskäras eller bearbetas till en film.
if (/\bND\b|NoDeriv|BY-NC-ND|BY-ND/i.test(kredit)) stillbild('licensen förbjuder bearbetning (' + kredit + ')');

// Första meningen av krediten räcker i filmen ("Foto: X (CC BY-SA 4.0),
// via Wikimedia Commons"). En punkt efter en ensam versal är en initial
// ("P. J. Assuncao Lago", "Y. Beletsky"), inte ett meningsslut: där klipptes
// fotografens namn bort förut, och CC BY kräver namnet.
const kortKredit = kredit.split(/(?<!(?:^|[\s/(.\-])\p{Lu})\.\s+(?=\p{Lu})/u)[0].replace(/\.$/, '');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LANGD = Math.max(3, parseFloat(arg.langd || '8'));
const FPS = Math.max(24, Math.min(60, parseInt(arg.fps || '30', 10)));
const W = 1080, H = 1350, SCEN_H = 900, DSF = 2;
const titel = arg.titel || art.title;

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
const ffmpeg = hittaFfmpeg();

// Ramen byggs direkt i sidan: band, scen och fot på samma mått som
// spela-in-reel.js ger (scenen 1080×900 i full bredd, rundade hörn).
const mapp = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-nyhet-'));
const sida = path.join(mapp, 'reel.html');
fs.writeFileSync(sida, `<!doctype html>
<html lang="sv"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; overflow: hidden; }
  #ram { position: relative; width: ${W}px; height: ${H}px; overflow: hidden;
    background: linear-gradient(180deg, #f7f2e8 0%, #ece3d2 100%);
    font-family: Poppins, 'Segoe UI', sans-serif; color: #0f1620; }
  #band { padding: 54px 60px 0; box-sizing: border-box; }
  #band .t { font-size: 52px; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
  #band .r { font-size: 30px; font-weight: 400; line-height: 1.3; margin-top: 12px; opacity: .85; }
  #fot { position: absolute; left: 0; bottom: 34px; width: ${W}px; text-align: center;
    font-size: 28px; font-weight: 500; opacity: .7; }
  #scen { position: absolute; left: 0; overflow: hidden; background: #0f1620;
    border-radius: 18px; box-shadow: 0 10px 30px rgba(15,22,32,.12); transform-origin: 0 0; }
  #scen img { position: absolute; left: 0; top: 0; transform-origin: 0 0; will-change: transform; }
  .kredit { position: absolute; left: 0; right: 0; bottom: 0; padding: 40px 24px 14px;
    font-size: 20px; font-weight: 400; color: #f7f2e8;
    background: linear-gradient(180deg, rgba(15,22,32,0) 0%, rgba(15,22,32,.72) 100%); }
</style></head><body>
<div id="ram">
  <div id="band"><div class="t">${esc(titel)}</div>${arg.rad2 ? `<div class="r">${esc(arg.rad2)}</div>` : ''}</div>
  <div id="scen" style="width:${W}px;height:${SCEN_H}px"><img id="bild" src="${pathToFileURL(bildFil).href}" alt="">${kortKredit ? `<div class="kredit">${esc(kortKredit)}</div>` : ''}</div>
  <div id="fot">fysiklabbet.se</div>
</div>
<script>
  // Placera scenen mellan bandet och foten (samma regel som spela-in-reel.js).
  function layout() {
    const band = document.getElementById('band'), fot = document.getElementById('fot');
    const scen = document.getElementById('scen');
    const bandH = band.getBoundingClientRect().height + 30;
    const fotH = 34 + fot.getBoundingClientRect().height + 30;
    const k = Math.min(1, (${H} - bandH - fotH) / ${SCEN_H});
    const top = bandH + Math.max(0, (${H} - bandH - fotH - ${SCEN_H} * k) / 2);
    scen.style.top = top + 'px';
    scen.style.transform = 'scale(' + k + ') translateX(' + ((${W} - ${W} * k) / 2) / k + 'px)';
    return { k, top, bandH };
  }
  // Bildens läge vid tiden t (0–1). Täcker scenen som object-fit: cover och
  // glider från ena kanten till den andra i den riktning där den beskärs,
  // med mjuk start och mjukt slut, samtidigt som den zoomar in 6 %.
  let M = null;
  function forbered() {
    const img = document.getElementById('bild');
    const iw = img.naturalWidth, ih = img.naturalHeight, SW = ${W}, SH = ${SCEN_H};
    const s = Math.max(SW / iw, SH / ih);
    M = { iw, ih, s, SW, SH, sid: iw / ih >= SW / SH };
    img.style.width = iw + 'px'; img.style.height = ih + 'px';
  }
  window.satt = function (t) {
    const e = 0.5 - 0.5 * Math.cos(Math.PI * t);      // mjuk in och ut
    const z = 1 + 0.06 * e;
    const sk = M.s * z, dw = M.iw * sk, dh = M.ih * sk;
    // Glidet: hela beskurna överskottet vid z = 1, från kant till kant.
    const ox = M.iw * M.s - M.SW, oy = M.ih * M.s - M.SH;
    const p = M.sid ? e : 0.5, q = M.sid ? 0.5 : e;
    // Mittpunkt för z = 1-läget, sedan zoom kring scenens mitt.
    const cx = M.SW / 2 + ox * (0.5 - p), cy = M.SH / 2 + oy * (0.5 - q);
    const x = cx - dw / 2, y = cy - dh / 2;
    document.getElementById('bild').style.transform =
      'translate3d(' + x + 'px,' + y + 'px,0) scale(' + sk + ')';
  };
  window.klar = (async () => {
    const img = document.getElementById('bild');
    await img.decode();
    await document.fonts.ready;
    forbered();
    const info = layout();
    window.satt(0);
    return info;
  })();
</script></body></html>
`);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--hide-scrollbars', '--font-render-hinting=none', '--allow-file-access-from-files'],
    defaultViewport: { width: W, height: H, deviceScaleFactor: DSF },
  });
  const page = await browser.newPage();
  await page.goto(pathToFileURL(sida).href, { waitUntil: 'networkidle0', timeout: 60000 });
  const info = await page.evaluate(() => window.klar);
  console.log(`scen 1080×900 → skala ${info.k.toFixed(3)}, band ${Math.round(info.bandH)} px, ram ${W}×${H}, ${FPS} fps`);

  const ut = path.resolve(arg.ut);
  const N = Math.round(LANGD * FPS);
  const ff = spawn(ffmpeg, [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
    '-shortest', '-r', String(FPS),
    '-vf', `scale=${W}:${H}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-profile:v', 'high', '-level', '4.1',
    '-g', String(FPS), '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', ut,
  ], { stdio: ['pipe', 'inherit', 'pipe'] });
  let fel = '';
  ff.stderr.on('data', d => { fel += d; });
  const slut = new Promise(r => ff.on('close', r));

  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    await page.evaluate(t => window.satt(t), i / (N - 1));
    const buf = await page.screenshot({ type: 'jpeg', quality: 94, clip: { x: 0, y: 0, width: W, height: H } });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % FPS === 0) process.stdout.write(`\rruta ${i + 1}/${N}`);
  }
  ff.stdin.end();
  const kod = await slut;
  await browser.close();
  fs.rmSync(mapp, { recursive: true, force: true });
  process.stdout.write(`\rruta ${N}/${N} på ${((Date.now() - t0) / 1000).toFixed(0)} s\n`);
  if (kod !== 0) { console.error('ffmpeg misslyckades:\n' + fel); process.exit(5); }

  const probe = spawnSync(path.join(path.dirname(ffmpeg), 'ffprobe'), [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate:format=duration',
    '-of', 'default=nw=1', ut,
  ], { encoding: 'utf8' });
  console.log('klar: ' + ut + '\n' + (probe.stdout || '').trim());
})().catch(e => { console.error(e); process.exit(1); });
