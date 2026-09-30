// verify-ovningsblad-kontakt.js — kontrollerar att föremål som ska ha
// KONTAKT i övningsbladens figurer verkligen nuddar varandra.
//
//   node .claude/verify-ovningsblad-kontakt.js [ovningsblad/fil.html …]
//
// Bakgrund (2026-09-30): i "Rita krafterna" skulle en hand skjuta en låda,
// men fingrarna slutade 3 px före lådan. Figuren såg rätt ut i källan och
// passerade kraft- och momentkontrollen, men en elev ser en hand som inte
// rör lådan, och då finns ingen kontaktkraft att rita. En glipa på några
// pixlar syns inte i en översiktsskärmdump, bara vid inzoomning.
//
// Så fungerar det: byggskriptet märker de två element som ska mötas med
// samma namn i attributet data-k (till exempel data-k="hand" på fingrarna
// och på lådan). Skriptet laddar sidan i headless Chrome, mäter elementens
// geometriska ramar (utan linjebredd) i figurens egna koordinater och ger
// fel om avståndet mellan dem är större än TOL. Överlapp är tillåtet: en
// boll som vilar på en linje har ramen i linjens höjd.
//
// Utan argument granskas alla ovningsblad/*.html som innehåller data-k.
// Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOL = 0.6; // figurens användarenheter
let puppeteer;
try {
  puppeteer = require(path.join(process.env.TEMP, 'pptr-test', 'node_modules', 'puppeteer-core'));
} catch (e) {
  console.error('puppeteer-core hittades inte i %TEMP%\\pptr-test — kan inte köra kontaktkontrollen.');
  process.exit(2);
}

let files = process.argv.slice(2);
if (!files.length) {
  files = fs.readdirSync(path.join(ROOT, 'ovningsblad'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => 'ovningsblad/' + f)
    .filter((f) => fs.readFileSync(path.join(ROOT, f), 'utf8').includes('data-k="'));
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  let fel = 0, antal = 0;
  for (const f of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 900 });
    await page.goto('http://localhost:8000/' + f.replace(/\\/g, '/'), { waitUntil: 'load' });
    const res = await page.evaluate((TOL) => {
      const out = [];
      document.querySelectorAll('svg').forEach((svg, si) => {
        const vb = svg.viewBox.baseVal;
        const sr = svg.getBoundingClientRect();
        if (!vb || !vb.width || !sr.width) return;
        const k = sr.width / vb.width;
        const cell = svg.closest('.cell, .panel');
        const namn = cell ? (cell.querySelector('.num') ? cell.querySelector('.num').textContent + ' ' : '') +
          ((cell.querySelector('.cap') || cell.querySelector('.sh') || {}).textContent || '') : 'figur ' + si;
        const grupper = {};
        svg.querySelectorAll('[data-k]').forEach((el) => {
          for (const n of el.getAttribute('data-k').split(/\s+/)) (grupper[n] = grupper[n] || []).push(el);
        });
        for (const [n, els] of Object.entries(grupper)) {
          if (els.length < 2) { out.push({ namn, k: n, fel: 'bara ett element är märkt' }); continue; }
          const r = els.map((el) => el.getBoundingClientRect());
          // varje element ska nudda minst ett annat i gruppen
          r.forEach((a, i) => {
            let bast = Infinity;
            r.forEach((b, j) => {
              if (i === j) return;
              const dx = Math.max(a.left - b.right, b.left - a.right);
              const dy = Math.max(a.top - b.bottom, b.top - a.bottom);
              bast = Math.min(bast, Math.max(dx, dy) / k);
            });
            out.push({ namn, k: n, el: els[i].tagName, glipa: bast, ok: bast <= TOL });
          });
        }
      });
      return out;
    }, TOL);
    await page.close();
    for (const r of res) {
      antal++;
      if (r.fel || !r.ok) {
        fel++;
        console.log(`FEL  ${f}  [${r.namn.trim()}]  "${r.k}" (${r.el || ''}): ` + (r.fel || `glipa ${r.glipa.toFixed(1)} enheter`));
      }
    }
  }
  await browser.close();
  if (fel) { console.log(`\n${fel} kontakter av ${antal} möts inte.`); process.exit(1); }
  console.log(`OK! Alla ${antal} märkta kontakter möts (${files.length} fil${files.length === 1 ? '' : 'er'}).`);
})();
