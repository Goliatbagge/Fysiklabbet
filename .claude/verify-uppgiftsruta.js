#!/usr/bin/env node
// verify-uppgiftsruta.js — de FASTNÅLADE UPPGIFTSRUTORNA får aldrig skrolla
// i sig själva.
//
// Tre ställen nålar fast uppgiftstexten i överkanten medan lösningen rullar
// under den: frågekortet i provens stegvy (.np-fraga-fast i np.html),
// frågekortet i presentationsläget (.np-pres-fraga-fast) och uppgiftspanelen
// i pennlösningens helskärm (.hk-uppgift i handskrift.js). Alla tre hade en
// gång max-height + overflow-y: auto, så att en uppgift med figur fick en
// inre rullningslist med figuren avhuggen i underkant (uppgift 11 i Ma 2c
// VT2022, påpekat 2026-09-13). Regeln (se "Fastnålade uppgiftsrutor" i
// CLAUDE.md): ingen inre skroll — figuren läggs bredvid texten och krymps
// efter skärmhöjden, och ryms rutan ändå inte släpps nålen (rutan rullar
// med sidan). Skriptet mäter att det verkligen blir så, i webbläsaren:
//
//   1. INGEN INRE SKROLL — computed overflow-y får inte vara auto/scroll,
//      och innehållet får inte vara högre än rutan om den klipper.
//   2. NÅLAD BARA NÄR DEN RYMS — är rutan position: sticky ska den vara
//      lägre än sin takhöjd (andel av fönstret: stegvyn 38 %, presenta-
//      tionen 34 %, pennlösningen 42 %, 30 % under 600 px). Talen speglar
//      NP_FAST_TAK/NP_PRES_TAK i np.html och UPG_TAK() i handskrift.js.
//
// Utan argument granskas alla provuppgifter som har en figur (det är de som
// blir höga). Argument:
//   ma2c-vt2022:11     → en uppgift
//   np:ma2c-vt2022     → provets alla uppgifter med figur
//   alla               → alla uppgifter i alla prov, figur eller ej
//   teori:ma2c-4.2     → pennlösningarnas uppgiftspanel i ett teoriavsnitt
// Körs på 1290×730 (den snålaste vanliga liggande laptopskärmen);
// MOBIL=1 kör 390×844 också.
//
// Kräver dev-servern på port 8000 + playwright-core/katex/marked/react i
// %TEMP%\pptr-test\node_modules (eller peka ut dem med SAM_NODE_MODULES).
// Webbläsare: PW_CHROMIUM, annars den förinstallerade i molnmiljön, annars
// playwright-cores egen.
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const NM = process.env.SAM_NODE_MODULES
  || path.join(process.env.TEMP || require('os').tmpdir(), 'pptr-test', 'node_modules');
let chromium;
try {
  ({ chromium } = require(path.join(NM, 'playwright-core')));
} catch (e) {
  console.error('playwright-core hittades inte i ' + NM
    + ' — hoppar över uppgiftsrute-kontrollen.');
  process.exit(0);
}

/* takhöjder — samma tal som i np.html och handskrift.js */
const TAK = { steg: 0.38, pres: 0.34, penna: 0.42, pennaSmal: 0.30 };
const TOL = 2;                       /* px, avrundning */

const MAP = [
  [/unpkg\.com\/react@18\/umd\/react\.production\.min\.js/, 'react/umd/react.production.min.js'],
  [/unpkg\.com\/react-dom@18\/umd\/react-dom\.production\.min\.js/, 'react-dom/umd/react-dom.production.min.js'],
  [/unpkg\.com\/@babel\/standalone.*babel\.min\.js/, '@babel/standalone/babel.min.js'],
  [/katex@0\.16\.9\/dist\/katex\.min\.js/, 'katex/dist/katex.min.js'],
  [/katex@0\.16\.9\/dist\/katex\.min\.css/, 'katex/dist/katex.min.css'],
  [/katex@0\.16\.9\/dist\/contrib\/auto-render\.min\.js/, 'katex/dist/contrib/auto-render.min.js'],
  [/marked@11\.1\.1\/marked\.min\.js/, 'marked/marked.min.js'],
];
async function routeCdn(page) {
  await page.route(/https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|cdn\.tailwindcss\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)\/.*/, r => {
    const url = r.request().url();
    for (const [re, rel] of MAP)
      if (re.test(url)) return r.fulfill({ body: fs.readFileSync(path.join(NM, rel)),
        contentType: rel.endsWith('.css') ? 'text/css' : 'application/javascript' });
    const fm = url.match(/katex@0\.16\.9\/dist\/(fonts\/[^?#]+)/);
    if (fm) { const p = path.join(NM, 'katex/dist', fm[1]);
      if (fs.existsSync(p)) return r.fulfill({ body: fs.readFileSync(p), contentType: 'font/woff2' }); }
    return r.fulfill({ status: 200, body: '', contentType: url.includes('css') ? 'text/css' : 'application/javascript' });
  });
}

/* ---------- vilka uppgifter? (provdata laddas i Node med en window-stubb) ---------- */
function provData() {
  const win = {};
  const dir = path.join(ROOT, 'data', 'np');
  const filer = ['index.js'].concat(fs.readdirSync(dir)
    .filter(n => /^[a-z0-9]+-[a-z]+\d+\.js$/.test(n)).sort());
  for (const f of filer) {
    // eslint-disable-next-line no-new-func
    new Function('window', fs.readFileSync(path.join(dir, f), 'utf8'))(win);
  }
  return { index: win.NP_INDEX || [], prov: win.NP_PROV || {} };
}
function malLista(args, data) {
  const ut = [];
  const laggProv = (id, allaUppg) => {
    const p = data.prov[id];
    if (!p) { console.log('FEL   okänt prov: ' + id); return; }
    for (const u of p.uppgifter) {
      if (u.sekretess) continue;
      if (allaUppg || u.figur) ut.push({ typ: 'np', prov: id, nr: u.nr });
    }
  };
  if (!args.length) {
    for (const p of data.index) laggProv(p.id, false);
    return ut;
  }
  for (const a of args) {
    if (a === 'alla') for (const p of data.index) laggProv(p.id, true);
    else if (a.startsWith('np:')) laggProv(a.slice(3), false);
    else if (a.startsWith('teori:')) ut.push({ typ: 'teori', id: a.slice(6) });
    else {
      const m = a.match(/^([a-z0-9]+-[a-z]+\d+):(\d+)$/);
      if (!m) { console.log('FEL   förstår inte argumentet: ' + a); continue; }
      ut.push({ typ: 'np', prov: m[1], nr: parseInt(m[2], 10) });
    }
  }
  return ut;
}

/* ---------- mätning i sidan ---------- */
// sel: rutan vars overflow granskas; nalSel: elementet som bär sticky
// (samma som sel om inget anges). vhSel: skrollportens element (annars
// fönstret) — presentationsoverlayen har egen höjd.
const MAT = ({ sel, nalSel, vhSel }) => {
  /* i helskärm: leta BARA i det helskärmade elementet — ett avsnitt med
   * flera pennlösningar har flera (dolda) paneler, och den första i
   * dokumentet är inte nödvändigtvis den som visas */
  const rot = document.fullscreenElement || document;
  const el = rot.querySelector(sel);
  if (!el) return null;
  const nal = nalSel ? el.closest(nalSel) || rot.querySelector(nalSel) : el;
  const cs = getComputedStyle(el), ns = getComputedStyle(nal);
  const bas = vhSel ? document.querySelector(vhSel) : null;
  return {
    h: nal.getBoundingClientRect().height,
    clientH: el.clientHeight, scrollH: el.scrollHeight,
    overflowY: cs.overflowY, pos: ns.position,
    vh: bas ? bas.clientHeight : window.innerHeight,
  };
};
function bedom(m, tak) {
  const fel = [];
  if (/auto|scroll/.test(m.overflowY)) {
    fel.push('skrollar i sig själv (overflow-y: ' + m.overflowY + ')');
  } else if (/hidden|clip/.test(m.overflowY) && m.scrollH > m.clientH + TOL) {
    fel.push('innehållet klipps (' + Math.round(m.scrollH) + ' px i en ruta på '
      + Math.round(m.clientH) + ' px)');
  }
  if (m.pos === 'sticky' && m.h > m.vh * tak + TOL) {
    fel.push('nålad fast trots att den är ' + Math.round(m.h) + ' px hög (taket är '
      + Math.round(m.vh * tak) + ' px = ' + Math.round(tak * 100) + ' % av ' + m.vh + ')');
  }
  return fel;
}
function kort(m) {
  return Math.round(m.h) + ' px (' + (m.pos === 'sticky' ? 'nålad' : 'släppt') + ')';
}

async function klickaKnapp(page, text) {
  return page.evaluate(t => {
    const b = [...document.querySelectorAll('button')]
      .find(x => x.textContent.trim() === t || new RegExp(t).test(x.textContent.trim()));
    if (b) b.click();
    return !!b;
  }, text);
}
async function lamnaHelskarm(page) {
  await page.evaluate(() => document.fullscreenElement ? document.exitFullscreen() : null);
  await page.waitForFunction(() => !document.fullscreenElement, null, { timeout: 5000 })
    .catch(() => {});
}

/* pennlösningens helskärmspanel: klicka helskärmsknappen i widget nr i */
async function matPenna(page, i, smal) {
  const knappar = await page.$$('.lab-handskrift .hk-fsbtn, .np-penna .hk-fsbtn');
  if (!knappar[i]) return null;
  /* mitt i fönstret — under det fastnålade kortet skulle klicket träffa
   * kortet (riktigt klick krävs: helskärm fordrar en användargest) */
  await knappar[i].evaluate(el => el.scrollIntoView({ block: 'center' }));
  await knappar[i].click();
  await page.waitForFunction(() => !!document.fullscreenElement, null, { timeout: 5000 });
  await page.waitForTimeout(700);                 /* fitFS mäter om efter 450 ms */
  const m = await page.evaluate(MAT, { sel: '.hk-upg-inner', nalSel: '.hk-uppgift' });
  await lamnaHelskarm(page);
  if (!m) return null;                            /* ingen uppgiftspanel (ingen frågestam) */
  return { m, fel: bedom(m, smal ? TAK.pennaSmal : TAK.penna) };
}

(async () => {
  const data = provData();
  const mals = malLista(process.argv.slice(2), data);
  if (!mals.length) { console.log('inget att granska'); process.exit(0); }
  const vyer = [{ w: 1290, h: 730, namn: 'laptop' }];
  if (process.env.MOBIL) vyer.push({ w: 390, h: 844, namn: 'mobil' });
  const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  let fel = 0, granskade = 0;
  for (const vy of vyer) {
    const smal = vy.w <= 600;
    const page = await browser.newPage({ viewport: { width: vy.w, height: vy.h } });
    await routeCdn(page);
    let laddadNp = false;
    for (const t of mals) {
      const namn = t.typ === 'np' ? t.prov + ':' + t.nr : 'teori:' + t.id;
      const rader = [], felHar = [];
      let fas = 'sidan';
      try {
        if (t.typ === 'teori') {
          await page.goto('http://localhost:8000/katalog.html?id=' + t.id, { waitUntil: 'domcontentloaded' });
          await page.waitForSelector('.lab-article-body', { timeout: 20000 });
          await page.waitForTimeout(1500);
          laddadNp = false;
          const n = (await page.$$('.lab-handskrift .hk-fsbtn')).length;
          if (!n) { console.log('--    ' + namn + '  (' + vy.namn + ')  ingen pennlösning'); continue; }
          for (let i = 0; i < n; i++) {
            const r = await matPenna(page, i, smal);
            if (!r) continue;
            rader.push('penna ' + (i + 1) + ' ' + kort(r.m));
            r.fel.forEach(f => felHar.push('pennlösning ' + (i + 1) + ': ' + f));
          }
        } else {
          const hash = '#' + t.prov + ':' + t.nr;
          if (!laddadNp) {
            await page.goto('http://localhost:8000/np.html' + hash, { waitUntil: 'domcontentloaded' });
            laddadNp = true;
          } else {
            await page.evaluate(h => { location.hash = h; }, hash);
          }
          await page.waitForFunction(nr => {
            const h = document.querySelector('h1.np-hero-title');
            return h && h.textContent.trim() === 'Uppgift ' + nr;
          }, t.nr, { timeout: 20000 });
          await page.waitForTimeout(900);
          const harPenna = !!(await page.$('.np-vyval-btn'));
          /* 1. stegvyn */
          fas = 'stegvyn';
          if (harPenna) { await klickaKnapp(page, 'Som text'); await page.waitForTimeout(300); }
          await klickaKnapp(page, '^Visa (första|nästa) steget$');
          await page.waitForTimeout(400);
          const ms = await page.evaluate(MAT, { sel: '.np-fraga-fast' });
          if (ms) { rader.push('steg ' + kort(ms)); bedom(ms, TAK.steg).forEach(f => felHar.push('stegvyn: ' + f)); }
          else felHar.push('stegvyn: hittar inget frågekort (.np-fraga-fast)');
          /* 2. presentationsläget */
          fas = 'presentationen';
          /* JS-klick: ett riktigt klick rullar knappen in under det
           * fastnålade kortet och träffar kortet i stället. Overlayen
           * ritas oavsett om helskärmen beviljas. */
          await page.evaluate(() => document.querySelector('.np-pres-btn').click());
          await page.waitForSelector('.np-pres-fraga-fast .np-fraga',
                                     { state: 'attached', timeout: 10000 });
          /* titelbilden först; kortet nålas fast från och med första
           * lösningssteget (steg 2) — stega dit innan mätningen */
          await page.keyboard.press('ArrowRight');
          await page.keyboard.press('ArrowRight');
          await page.waitForTimeout(1100);
          const mp = await page.evaluate(MAT, { sel: '.np-pres-fraga-fast .np-fraga',
                                               nalSel: '.np-pres-fraga-fast', vhSel: '.lab-pres' });
          if (mp) { rader.push('pres ' + kort(mp)); bedom(mp, TAK.pres).forEach(f => felHar.push('presentationen: ' + f)); }
          else felHar.push('presentationen: hittar inget frågekort');
          await lamnaHelskarm(page);
          await page.keyboard.press('Escape');
          await page.waitForSelector('.lab-pres', { state: 'detached', timeout: 5000 }).catch(() => {});
          /* 3. pennlösningens helskärm */
          fas = 'pennlösningen';
          if (harPenna) {
            await klickaKnapp(page, 'Med penna');
            await page.waitForSelector('.np-penna .hk-fsbtn', { timeout: 10000 });
            await page.waitForTimeout(400);
            const r = await matPenna(page, 0, smal);
            if (r) { rader.push('penna ' + kort(r.m)); r.fel.forEach(f => felHar.push('pennlösningen: ' + f)); }
          }
        }
      } catch (e) {
        console.log('FEL   ' + namn + '  (' + vy.namn + ')  ' + fas + ': '
          + e.message.split('\n')[0]);
        fel++;
        laddadNp = false;
        continue;
      }
      granskade++;
      if (felHar.length) {
        fel += felHar.length;
        console.log('FEL   ' + namn + '  (' + vy.namn + ')  ' + rader.join(' · '));
        felHar.forEach(f => console.log('        ' + f));
      } else {
        console.log('ok    ' + namn + '  (' + vy.namn + ')  ' + rader.join(' · '));
      }
    }
    await page.close();
  }
  await browser.close();
  if (fel) {
    console.log('\n' + fel + ' fel i ' + granskade + ' granskade uppgifter.');
    console.log('En fastnålad uppgiftsruta får aldrig skrolla i sig själv — se '
      + '"Fastnålade uppgiftsrutor" i CLAUDE.md.');
    process.exit(1);
  }
  console.log('\nok    inga skrollande eller för höga uppgiftsrutor (' + granskade + ' uppgifter).');
})();
