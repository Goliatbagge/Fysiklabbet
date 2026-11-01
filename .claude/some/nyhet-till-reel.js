// Gör en kort reel av en nyhetsartikels huvudbild: bilden glider långsamt
// över ytan (panorering + svag inzoomning) under ett rubrikband, med
// bildkrediten i nederkanten. Själva inspelningen görs av spela-in-reel.js,
// så ramen, typsnittet och mp4-formatet blir desamma som i lanseringarnas
// reels.
//
// Bakgrund (SoMe-rapporten oktober 2026): stillbilderna med dagens nyhet
// nådde 3–4 konton per inlägg på Instagram, reelsen i snitt 122. Instagram
// visar i praktiken bara reels för icke-följare.
//
// Användning (dev-servern på port 8000 måste svara):
//
//   node .claude/some/nyhet-till-reel.js --id 2026-11-02-kalla-atomer \
//        --ut .shots/2026-11-02-kalla-atomer-reel.mp4 --langd 8
//
// Flaggor:
//   --id     Artikelns id i data/nyheter.js (obligatorisk).
//   --ut     Utfil, .mp4 (obligatorisk).
//   --titel  Rubrik i bandet. Standard: artikelns title.
//   --rad2   Valfri andra rad under rubriken.
//   --langd  Filmens längd i sekunder (standard 8).
//
// Avslutas med kod 6 och skriver ANVÄND STILLBILD när bilden inte får
// bearbetas: licens med NoDerivatives (ND), eller ingen bild alls. Då
// postar jobbet stillbilden som förut.

const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROT = path.resolve(__dirname, '..', '..');

const arg = {};
{
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) { arg[a[i].slice(2)] = a[i + 1]; i++; }
  }
}
if (!arg.id || !arg.ut) {
  console.error('Användning: --id <artikel-id> --ut <fil.mp4> [--titel …] [--rad2 …] [--langd 8]');
  process.exit(2);
}

// Läs data/nyheter.js som i webbläsaren.
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROT, 'data', 'nyheter.js'), 'utf8'), sandbox);
const lista = sandbox.window.NYHETER_ALL || sandbox.window.NYHETER
  || Object.values(sandbox.window).find(v => Array.isArray(v) && v.some(x => x && x.id));
const art = (lista || []).find(x => x.id === arg.id);
if (!art) { console.error('Hittar ingen artikel med id ' + arg.id); process.exit(2); }

function stillbild(orsak) {
  console.log('ANVÄND STILLBILD: ' + orsak);
  process.exit(6);
}
if (!art.image || !fs.existsSync(path.join(ROT, art.image))) stillbild('artikeln saknar bild');
const kredit = (art.imageCredit || '').trim();
// NoDerivatives: bilden får inte beskäras eller bearbetas till en film.
if (/\bND\b|NoDeriv|BY-NC-ND|BY-ND/i.test(kredit)) stillbild('licensen förbjuder bearbetning (' + kredit + ')');

// Första meningen av krediten räcker i filmen ("Foto: X (CC BY-SA 4.0),
// via Wikimedia Commons"); förklaringar efteråt står kvar i artikeln.
const kortKredit = kredit.split(/\.\s+(?=[A-ZÅÄÖ])/)[0].replace(/\.$/, '');

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LANGD = Math.max(3, parseFloat(arg.langd || '8'));
const mapp = path.join(ROT, '.shots', 'reel-nyhet');
fs.mkdirSync(mapp, { recursive: true });
const sida = path.join(mapp, arg.id + '.html');

// Scenen: 1080×900, bilden täcker ytan (object-fit: cover) och glider från
// ena kanten till den andra i den riktning där den beskärs, så att hela
// bilden hinner synas. Knappen "Starta glid" klickas av spela-in-reel.js
// när inspelningen börjat.
fs.writeFileSync(sida, `<!doctype html>
<html lang="sv"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  body { margin: 0; background: #f7f2e8; }
  .scene-wrap { position: relative; width: 1080px; height: 900px; overflow: hidden; background: #0f1620; }
  .scene-wrap img { width: 100%; height: 100%; object-fit: cover; display: block;
    transform-origin: 50% 50%; transition: object-position ${LANGD}s linear, transform ${LANGD}s linear; }
  .kredit { position: absolute; left: 0; right: 0; bottom: 0; padding: 40px 24px 14px;
    font: 400 20px Poppins, 'Segoe UI', sans-serif; color: #f7f2e8;
    background: linear-gradient(180deg, rgba(15,22,32,0) 0%, rgba(15,22,32,.72) 100%); }
  #start { position: absolute; left: 0; top: 0; opacity: 0; }
</style></head><body>
<h1>${esc(art.title)}</h1>
<div class="scene-wrap"><img id="bild" src="/${esc(art.image)}" alt="">${kortKredit ? `<div class="kredit">${esc(kortKredit)}</div>` : ''}</div>
<button id="start">Starta glid</button>
<script>
  const img = document.getElementById('bild');
  function forbered() {
    const box = 1080 / 900, bild = img.naturalWidth / img.naturalHeight;
    // Bredare än ytan: glid i sidled. Högre: glid uppifrån och ned.
    const [fran, till] = bild >= box ? ['0% 50%', '100% 50%'] : ['50% 0%', '50% 100%'];
    img.style.transition = 'none';
    img.style.objectPosition = fran;
    img.style.transform = 'scale(1)';
    img.dataset.till = till;
  }
  img.complete ? forbered() : img.addEventListener('load', forbered);
  document.getElementById('start').addEventListener('click', () => {
    img.style.transition = '';
    img.style.objectPosition = img.dataset.till;
    img.style.transform = 'scale(1.06)';
  });
</script></body></html>
`);

const args = [
  path.join(__dirname, 'spela-in-reel.js'),
  '--url', 'http://localhost:8000/.shots/reel-nyhet/' + encodeURIComponent(arg.id) + '.html',
  '--ut', path.resolve(arg.ut),
  '--titel', arg.titel || art.title,
  '--klick', 'Starta glid', '--start', '300',
  '--langd', String(LANGD),
];
if (arg.rad2) args.push('--rad2', arg.rad2);
const r = spawnSync(process.execPath, args, { stdio: 'inherit' });
fs.unlinkSync(sida);
process.exit(r.status === null ? 1 : r.status);
