#!/usr/bin/env node
/* verify-handskrift.js — maskinell granskning av pennlösningarna
 * (::: handskrift-scenerna i handskrift.js).
 *
 * Kör:  node .claude/verify-handskrift.js [scennamn ...]
 * Utan argument granskas ALLA scener som är inlänkade från data/teori/*.md.
 *
 * Skriptet laddar handskrift.js med en minimal window/document-stubb och
 * bygger varje scens aktlista via HANDSKRIFT.scen(typ) — ingen webbläsare
 * behövs, eftersom layoutfunktionerna bara räknar koordinater.
 *
 * Kontrollerna motsvarar reglerna i handskrift.js filhuvud:
 *
 *   1. ARKBREDD — allt bläck ska ligga innanför papperets kant
 *      (0 … PAPER_W) med lite marginal. Ett streck som sticker ut till
 *      höger klipps bort på skärmen.
 *   2. MOBILZONEN — arkets övre högra hörn är reserverat för
 *      inställningsrutan och helskärmsknappen. Rutan är HTML och behåller
 *      sin pixelstorlek när arket krymper, så på mobil täcker den
 *      x > PAPER_W−310, y < 150. Där får inget bläck ligga.
 *   2b. PILZONEN — stega-pilarna ligger som smala band i arkets vänster-
 *      och högerkant (26 px-knapp + 2 px kant) och FÖLJER SKROLLEN i
 *      höjdled, så hela kantremsan är förbjuden yta oavsett y. Vänster
 *      band klaras av padL=30 (underlinjer når x≈27); höger band kräver
 *      att inget bläck når förbi PAPER_W−NAVZON (x > 700 döljs bakom
 *      framåtknappen — "27 700" blev "27 70", påpekat 2026-08-14).
 *   3. BUBBLOR SKYMMER INGET — en tankebubbla (moln + bulor) får aldrig
 *      ligga över bläck som redan är skrivet när den visas. Skriptet
 *      går igenom akterna i ordning, håller reda på vad som ritats och
 *      jämför varje bubblas rektangel (plus bulornas 25 px) mot det.
 *   4. BUBBLOR INNANFÖR ARKET — och aldrig i mobilzonen (samma hörn).
 *   5. PAPPERSHÖJDEN — lastBase ska rymma allt ritat bläck.
 *   6. FLERTECKENSINDEX — "v_tot" blir v med index t följt av "ot".
 *      Källkodsgranskning; skriv "v_t_o_t".
 *   7. TECKEN UTAN GLYF — en bokstav som saknas i GLYPHS ritas inte alls
 *      men tar plats ("FÖRSTÄRKS" blev "FÖRST RKS").
 *
 * Bubblornas höjd räknas som i buildBubble(): rader·24 + 18.
 *
 * OBS: kontrollen ERSÄTTER INTE skärmdumpsgranskningen. Etiketter som
 * ligger ovanpå linjer och figurdelar syns bara i en renderad bild.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUMP = 25;          /* molnbulornas utstick utanför rektangeln */
const LINE_H = 24, PAD_H = 18;
const ZON_X = 310, ZON_Y = 150;   /* inställningsrutans mobilzon */
const NAVZON = 34;        /* stega-pilarnas band vid höger arkkant.
                             Knappen är 26 px + 2 px kant i CSS-pixlar;
                             i en smal spalt (ark renderat ~600 px brett)
                             motsvarar det ~34 viewBox-enheter. Samma
                             gräns som motorns radbrytningsvillkor
                             (PAPER_W−34) i handskrift.js. */
const NAVZON_V = 24;      /* vänster gräns: padL=30 minus underlinjens
                             och jittrets utstick (~27) med marginal */
const MARGINAL = 2;       /* tillåten överskjutning i px (pennbredd) */

/* Scener som fanns FÖRE den här kontrollen skrevs (2026-08-09) och som
 * granskades för hand i skärmdump enligt reglerna som gällde då. De
 * bryter mot någon av kontrollerna nedan — nästan alltid med bara några
 * pixlar in i mobilzonen — och rapporteras som VARNINGAR i stället för
 * fel, så att skriptet kan användas som grind för nytt material utan att
 * kräva en omgranskning av allt gammalt på en gång. Ta bort en scen ur
 * listan när den städats; lägg ALDRIG till en ny scen här.
 * OBS: pennskriften jittras med Math.random(), så en scen som ligger
 * precis på gränsen kan slå om mellan körningar. Får du "städad" på en
 * scen: kör om ett par gånger innan du tar bort den ur listan. */
const TIDIGARE_GRANSKADE = new Set([
  'brada', 'dampning', 'decimaler', 'faktorisera', 'felmarginal', 'fjader',
  'fjaderenergi', 'grundpotens', 'harmonisk', 'karusell', 'kasthojd',
  'lpskiva', 'mgn', 'olikanamnare', 'olikhet', 'periodfjader',
  'potensforenkla', 'prefix', 'prioritering', 'samnamnare', 'sekundpendel',
  'skiftnyckel', 'trebrak',
]);

/* ---------- ladda handskrift.js med en minimal DOM-stubb ---------- */
function loadHandskrift() {
  const noop = () => {};
  const win = {
    addEventListener: noop,
    requestAnimationFrame: noop,
    matchMedia: () => ({ matches: false, addEventListener: noop }),
  };
  const doc = {
    addEventListener: noop,
    getElementById: () => null,
    createElement: () => ({ setAttribute: noop, appendChild: noop, style: {} }),
    createElementNS: () => ({ setAttribute: noop, appendChild: noop, style: {} }),
    head: { appendChild: noop },
  };
  const src = fs.readFileSync(path.join(ROOT, 'handskrift.js'), 'utf8');
  // eslint-disable-next-line no-new-func
  new Function('window', 'document', 'requestAnimationFrame', src)(
    win, doc, noop);
  if (!win.HANDSKRIFT) throw new Error('handskrift.js exporterade inget');
  return win.HANDSKRIFT;
}

/* ---------- vilka scener används i teorin? ---------- */
function scenerITeorin() {
  const dir = path.join(ROOT, 'data', 'teori');
  const ut = new Map();
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.md'))) {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8');
    const re = /^:::\s*handskrift\s*$([\s\S]*?)^:::\s*$/gm;
    let m;
    while ((m = re.exec(txt))) {
      const typ = (m[1].match(/^\s*typ:\s*(\S+)\s*$/m) || [])[1];
      if (typ) ut.set(typ, (ut.get(typ) || []).concat(f));
    }
  }
  return ut;
}

/* ---------- geometri ---------- */
function bboxAvPunkter(pts, box) {
  for (const p of pts) {
    if (!isFinite(p[0]) || !isFinite(p[1])) { box.trasig = true; continue; }
    if (p[0] < box.x0) box.x0 = p[0];
    if (p[0] > box.x1) box.x1 = p[0];
    if (p[1] < box.y0) box.y0 = p[1];
    if (p[1] > box.y1) box.y1 = p[1];
  }
}
function nyBox() {
  return { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
}
function overlappar(a, b) {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}
/* första punkten på en polylinje som hamnar i mobilzonen (samplat var
 * ~3:e px längs varje segment), eller null */
function zonPunkt(pts, zonX, zonY) {
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = pts[i], b = pts[i + 1];
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 3));
    for (let k = 0; k <= n; k++) {
      const x = a[0] + (b[0] - a[0]) * k / n;
      const y = a[1] + (b[1] - a[1]) * k / n;
      if (x > zonX + MARGINAL && y < zonY - MARGINAL) return [x, y];
    }
  }
  if (pts.length === 1 && pts[0][0] > zonX + MARGINAL &&
      pts[0][1] < zonY - MARGINAL) return pts[0];
  return null;
}

function granska(HK, typ, cfg) {
  const fel = [];
  const varn = [];
  let L;
  try {
    L = HK.scen(typ, undefined, cfg);
  } catch (e) {
    return { fel: ['scenen kraschade: ' + e.message], varn: [] };
  }
  if (!L) return { fel: ['scenen finns inte i registret'], varn: [] };

  const W = HK.PAPER_W;
  const zonX = W - ZON_X;
  /* ekvval-scener har en HÖGRE inställningsruta (tankar + "Ekvationer")
   * — zonen sträcker sig då ned till y=210 (se OBS i handskrift.js) */
  const zonY = L.ekvval ? 210 : ZON_Y;
  const total = nyBox();
  /* bläck som ritats FÖRE varje tidpunkt — byggs upp medan vi går */
  const hittills = nyBox();

  for (const a of L.acts) {
    if (a.kind === 'stroke') {
      bboxAvPunkter(a.pts, total);
      bboxAvPunkter(a.pts, hittills);
      /* mobilzonen: sampla LÄNGS strecket. En bbox räcker inte — en lång
       * sned linje kan ha ett hörn i zonens x-intervall och ett annat i
       * dess y-intervall utan att någon punkt på linjen ligger i zonen. */
      const p = zonPunkt(a.pts, zonX, zonY);
      if (p) {
        fel.push('bläck i inställningsrutans mobilzon (x>' + zonX +
                 ', y<' + zonY + '): [' +
                 p[0].toFixed(0) + ',' + p[1].toFixed(0) + ']');
      }
      /* pilzonen (2b): kantbanden är förbjudna oavsett y — pilarna
       * följer skrollen och kan hamna på vilken rad som helst */
      for (const pt of a.pts) {
        if (pt[0] > W - NAVZON + MARGINAL) {
          fel.push('bläck i högerpilens zon (x>' + (W - NAVZON) + '): [' +
                   pt[0].toFixed(0) + ',' + pt[1].toFixed(0) + ']');
          break;
        }
        if (pt[0] < NAVZON_V - MARGINAL) {
          fel.push('bläck i vänsterpilens zon (x<' + NAVZON_V + '): [' +
                   pt[0].toFixed(0) + ',' + pt[1].toFixed(0) + ']');
          break;
        }
      }
    } else if (a.kind === 'show' && a.obj && a.obj.bubble) {
      const o = a.obj;
      const h = o.lines.length * LINE_H + PAD_H;
      const b = { x0: o.x - BUMP, y0: o.y - BUMP,
                  x1: o.x + o.w + BUMP, y1: o.y + h + BUMP };
      if (b.x0 < -BUMP || b.x1 > W) {
        varn.push('bubbla utanför arket i sidled: x ' +
                  b.x0.toFixed(0) + '–' + b.x1.toFixed(0));
      }
      if (b.x1 > zonX && b.y0 < zonY) {
        fel.push('bubbla i inställningsrutans mobilzon: x ' +
                 b.x0.toFixed(0) + '–' + b.x1.toFixed(0) + ', y ' +
                 b.y0.toFixed(0) + '–' + b.y1.toFixed(0));
      }
      if (isFinite(hittills.x0) && overlappar(b, hittills)) {
        /* grov bbox-träff — kolla streck för streck om något FAKTISKT
         * ligger i bubblans ruta */
        const traff = [];
        for (const p of L.acts) {
          if (p === a) break;
          if (p.kind !== 'stroke') continue;
          const s = nyBox();
          bboxAvPunkter(p.pts, s);
          if (overlappar(b, s)) traff.push(s);
        }
        if (traff.length) {
          const s = traff[0];
          fel.push('bubbla (' + o.lines.map(l => l.map(g => g[0]).join(''))
                     .join(' ').slice(0, 42) + '…) ligger över ' +
                   traff.length + ' redan ritade streck, t.ex. ' +
                   `[${s.x0.toFixed(0)},${s.y0.toFixed(0)}]–` +
                   `[${s.x1.toFixed(0)},${s.y1.toFixed(0)}]`);
        }
      }
    }
  }

  if (total.trasig) fel.push('scenen innehåller NaN-koordinater');
  if (total.x1 > W - MARGINAL) {
    fel.push('bläck utanför papperets högerkant: x=' + total.x1.toFixed(0) +
             ' (arket är ' + W + ' brett)');
  }
  if (total.x0 < MARGINAL) {
    fel.push('bläck utanför papperets vänsterkant: x=' + total.x0.toFixed(0));
  }
  if (total.y0 < MARGINAL) {
    fel.push('bläck utanför papperets överkant: y=' + total.y0.toFixed(0));
  }
  if (total.y1 > L.lastBase + 10) {
    varn.push('bläck (y=' + total.y1.toFixed(0) + ') når under lastBase=' +
              L.lastBase.toFixed(0) + ' — höj lastBase');
  }
  return {
    fel, varn, ekvval: !!L.ekvval,
    info: 'bläck x ' + total.x0.toFixed(0) + '–' + total.x1.toFixed(0) +
          ', y ' + total.y0.toFixed(0) + '–' + total.y1.toFixed(0) +
          ', ark ' + W + '×' + Math.round(L.lastBase + 40) +
          ', ' + L.acts.length + ' akter',
  };
}

/* ---------- huvudprogram ---------- */
const HK = loadHandskrift();
const anvanda = scenerITeorin();
const valda = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [...anvanda.keys()].sort();

let felTot = 0, varnTot = 0, gamlaTot = 0;
for (const typ of valda) {
  const var_ = anvanda.get(typ);
  const varifran = var_ ? ' (' + [...new Set(var_)].join(', ') + ')' : '';
  const gammal = TIDIGARE_GRANSKADE.has(typ);
  /* scener med två ekvationsredovisningslägen (ekvval) granskas i BÅDA:
   * "Båda led" (standard) och "Väggen" (cfg.vagg) — strecken skiljer sig */
  const r0 = granska(HK, typ);
  const varianter = [[typ, r0]];
  if (r0.ekvval) varianter.push([typ + ' [väggen]', granska(HK, typ, { vagg: true })]);
  for (const [namn, r] of varianter) {
    if (r.fel.length && gammal) {
      gamlaTot++;
      console.log('gml  ' + namn + varifran + '  ' + r.fel.length +
                  ' avvikelse(r), granskad för hand tidigare');
    } else if (r.fel.length) {
      felTot += r.fel.length;
      console.log('\n\x1b[31mFEL\x1b[0m  ' + namn + varifran);
      r.fel.forEach(f => console.log('      - ' + f));
    } else {
      console.log('ok   ' + namn + varifran + '  ' + (r.info || ''));
      if (gammal && namn === typ) {
        console.log('      ! städad — ta bort ur TIDIGARE_GRANSKADE');
      }
    }
    r.varn.forEach(v => { varnTot++; console.log('      ! ' + v); });
  }
}

/* FLERTECKENSINDEX — placeString tar bara ETT tecken efter '_' och '^'.
 * "v_tot" skrivs alltså som v med index t, följt av vanliga bokstäver
 * "ot" — ett fel som bara syns i skärmdump. Ett index med flera tecken
 * måste skrivas med ett understreck per tecken: "v_t_o_t". Kontrollen är
 * en KÄLLKODSGRANSKNING (aktlistan minns inte längre vilken sträng den
 * kom ur), och tittar bara på strängar som skickas till pennan. */
{
  const src = fs.readFileSync(path.join(ROOT, 'handskrift.js'), 'utf8');
  const rader = src.split('\n');
  const pennStr = /(?:T\.str|T\.lbl|placeString|frac:\s*\[|valueBracket)/;
  const flerteckens = [];
  rader.forEach((rad, i) => {
    if (!pennStr.test(rad) && !/^\s*'/.test(rad) && !/^\s*\[/.test(rad)) return;
    if (/^\s*(\/\*|\*)/.test(rad)) return;               /* kommentar */
    for (const m of rad.matchAll(/'([^']*)'/g)) {
      const t = m[1];
      /* indextecknet måste vara en BOKSTAV för att träffa — "x^2y" är
         x upphöjt till 2 gånger y och helt i sin ordning, medan "v_tot"
         nästan alltid är ett tänkt flerteckensindex */
      const bad = t.match(/[_^][a-zA-ZåäöÅÄÖ][a-zA-ZåäöÅÄÖ]/);
      if (bad) {
        flerteckens.push((i + 1) + ': ' + t.slice(0, 56));
      }
    }
  });
  if (flerteckens.length) {
    felTot += flerteckens.length;
    console.log('\n\x1b[31mFEL\x1b[0m  index/exponent med flera tecken utan ' +
                'eget understreck (skriv v_t_o_t, inte v_tot):');
    flerteckens.slice(0, 12).forEach(r => console.log('      - rad ' + r));
    if (flerteckens.length > 12) {
      console.log('      … och ' + (flerteckens.length - 12) + ' till');
    }
  }
}

/* TECKEN UTAN GLYF — en bokstav som saknas i GLYPHS ritas inte alls men
 * tar plats, så ordet får ett tomrum mitt i ("FÖRST RKS"). Det syns bara
 * i skärmdump, därför räknas missarna medan scenerna byggs. */
const saknade = HK.saknadeGlyfer();
const saknadeTecken = Object.keys(saknade);
if (saknadeTecken.length) {
  felTot += saknadeTecken.length;
  console.log('\n\x1b[31mFEL\x1b[0m  tecken som saknar glyf i GLYPHS:');
  saknadeTecken.forEach(ch => console.log('      - ' + JSON.stringify(ch) +
    ' (U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') +
    ') skrivs ' + saknade[ch] + ' gånger'));
}

/* scener som saknas i registret men används i teorin */
for (const [typ, filer] of anvanda) {
  if (!HK.typer().includes(typ)) {
    felTot++;
    console.log('\n\x1b[31mFEL\x1b[0m  ' + typ +
                ' används i ' + filer.join(', ') + ' men finns inte i SCENES');
  }
}

console.log('\n' + valda.length + ' scener granskade, ' + felTot + ' fel, ' +
            varnTot + ' varningar, ' + gamlaTot +
            ' tidigare handgranskade med avvikelser');
process.exit(felTot ? 1 : 0);
