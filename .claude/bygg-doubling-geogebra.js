// Bygger den engelska sidan utkast/doubling-geogebra.html ur den svenska
// utkast/fordubbling-geogebra.html. Kör: node .claude/bygg-doubling-geogebra.js
//
// Sidan bär all synlig text på båda språken (TEXT och FRAGOR i skriptet) och
// väljer språk efter <html lang>. Skriptet byter därför bara lang och huvudet.
// Redigera aldrig doubling-geogebra.html för hand.

const fs = require('fs');
const path = require('path');
const KALLA = path.join(__dirname, '..', 'utkast', 'fordubbling-geogebra.html');
const MAL = path.join(__dirname, '..', 'utkast', 'doubling-geogebra.html');

const PAR = [
  ['<html lang="sv">', '<html lang="en">'],
  ['<title>Fördubbla pengarna i GeoGebra — Fysiklabbet</title>', '<title>Doubling your money in GeoGebra — Fysiklabbet</title>'],
  ['<meta name="description" content="Fördubblingstiden som skärningspunkt i GeoGebra: dra i räntan, jämför med 72-regeln och se när regeln slår fel. Komplement till undersökningen Hur lång tid tar det att fördubbla pengarna?">',
   '<meta name="description" content="The doubling time as a point of intersection in GeoGebra: drag the interest rate, compare with the rule of 72 and see when the rule goes wrong. Companion to the investigation How long does it take to double your money?">'],
  ['<link rel="canonical" href="https://fysiklabbet.se/utkast/fordubbling-geogebra.html">', '<link rel="canonical" href="https://fysiklabbet.se/utkast/doubling-geogebra.html">'],
  ['<!--\n  fordubbling-geogebra.html:', '<!--\n  doubling-geogebra.html: ENGELSK VERSION, GENERERAD. Redigera inte den här filen.\n  Ändra i fordubbling-geogebra.html och kör node .claude/bygg-doubling-geogebra.js.\n\n  fordubbling-geogebra.html:'],
];

const ra = fs.readFileSync(KALLA, 'utf8');
const CRLF = ra.includes('\r\n');
let s = ra.replace(/\r\n/g, '\n');
const saknas = PAR.filter(([sv]) => !s.includes(sv));
if (saknas.length) {
  console.error('Hittade inte i fordubbling-geogebra.html (har huvudet ändrats?):');
  saknas.forEach(([sv]) => console.error('  - ' + sv.slice(0, 90).replace(/\n/g, ' ')));
  process.exit(1);
}
for (const [sv, en] of PAR) s = s.split(sv).join(en);
fs.writeFileSync(MAL, CRLF ? s.replace(/\n/g, '\r\n') : s);
console.log('Skrev ' + path.relative(process.cwd(), MAL));
