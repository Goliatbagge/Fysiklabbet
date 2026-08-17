// Genererar datatabellen för formorkelse-sverige.js (nyhetswidgeten
// "Förmörkelsen ort för ort" i artikeln 2026-08-10-solformorkelse-sverige):
//  - per stad: månens läge relativt solen i vy-koordinater (x höger, y upp,
//    i solradier) varannan minut 16:40–19:00 UT, solens höjd, kontakttider,
//    max skymd andel, solnedgång och månskivans relativa storlek k.
//  - Sverigekontur + grannländer ur Natural Earth 50m, projicerade.
//
// Så körs den om (behövs bara om datat/orterna ska ändras):
//   1. I en tom arbetsmapp: npm install astronomy-engine
//   2. Hämta https://raw.githubusercontent.com/nvkelso/natural-earth-vector/
//      master/geojson/ne_50m_admin_0_countries.geojson som ne50.geojson
//      (public domain; committas INTE — 3 MB)
//   3. node gen-data.js  → skriver fse-data.json
//   4. Klistra in JSON-innehållet som DATA-objektet i formorkelse-sverige.js
//      (raden "var DATA = …;").
//
// OBS: månradien är POLRADIEN 1736,0 km — samma som astronomy-engine
// använder för skymningsgraden. Med medelradien 1737,4 blir alla procenttal
// 0,1 procentenhet för höga jämfört med artikeltexten och Astroinfo.
const A = require('astronomy-engine');
const fs = require('fs');

const CITIES = [
  { id: 'kiruna',    name: 'Kiruna',    lat: 67.8558, lon: 20.2253 },
  { id: 'lulea',     name: 'Luleå',     lat: 65.5848, lon: 22.1567 },
  { id: 'ostersund', name: 'Östersund', lat: 63.1767, lon: 14.6361 },
  { id: 'umea',      name: 'Umeå',      lat: 63.8258, lon: 20.2630 },
  { id: 'karlstad',  name: 'Karlstad',  lat: 59.3793, lon: 13.5036 },
  { id: 'stockholm', name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
  { id: 'goteborg',  name: 'Göteborg',  lat: 57.7089, lon: 11.9746 },
  { id: 'visby',     name: 'Visby',     lat: 57.6348, lon: 18.2948 },
  { id: 'malmo',     name: 'Malmö',     lat: 55.6050, lon: 13.0038 },
];

const SUN_RADIUS_KM = 695700, MOON_RADIUS_KM = 1736.0, AU_KM = 149597870.7;
const DEG = Math.PI / 180;
const T0 = Date.parse('2026-08-12T16:40:00Z'); // slider-nolla
const STEP_MIN = 2, N = 71;                    // 16:40–19:00 UT

function viewGeometry(time, observer) {
  const eqSun = A.Equator(A.Body.Sun, time, observer, true, true);
  const eqMoon = A.Equator(A.Body.Moon, time, observer, true, true);
  const hSun = A.Horizon(time, observer, eqSun.ra, eqSun.dec, null);
  const hMoon = A.Horizon(time, observer, eqMoon.ra, eqMoon.dec, null);
  const rs = Math.asin(SUN_RADIUS_KM / (eqSun.dist * AU_KM));
  const rm = Math.asin(MOON_RADIUS_KM / (eqMoon.dist * AU_KM));
  let daz = hMoon.azimuth - hSun.azimuth;
  if (daz > 180) daz -= 360; if (daz < -180) daz += 360;
  const dx = daz * Math.cos(hSun.altitude * DEG) * DEG;
  const dy = (hMoon.altitude - hSun.altitude) * DEG;
  return { dx: dx / rs, dy: dy / rs, k: rm / rs, alt: hSun.altitude };
}

function obscuration(s, k) {
  if (s >= 1 + k) return 0;
  if (s <= k - 1) return 1;
  if (s <= 1 - k) return k * k;
  const x1 = (s * s + 1 - k * k) / (2 * s);
  const x2 = s - x1;
  const a1 = Math.acos(Math.min(1, Math.max(-1, x1)));
  const a2 = Math.acos(Math.min(1, Math.max(-1, x2 / k)));
  return (a1 - x1 * Math.sqrt(Math.max(0, 1 - x1 * x1))
        + k * k * (a2 - (x2 / k) * Math.sqrt(Math.max(0, 1 - (x2 / k) ** 2)))) / Math.PI;
}

// Minuter efter T0, 1 decimal
const minOf = t => Math.round((new Date(t.date).getTime() - T0) / 6000) / 10;

const cities = [];
for (const c of CITIES) {
  const obs = new A.Observer(c.lat, c.lon, 20);
  const ecl = A.SearchLocalSolarEclipse(new A.AstroTime(new Date('2026-08-12T00:00:00Z')), obs);
  const sunset = A.SearchAltitude(A.Body.Sun, obs, -1,
    new A.AstroTime(new Date('2026-08-12T12:00:00Z')), 1, -0.833);
  const dx = [], dy = [], alt = [];
  let kSum = 0;
  for (let i = 0; i < N; i++) {
    const t = new A.AstroTime(new Date(T0 + i * STEP_MIN * 60000));
    const g = viewGeometry(t, obs);
    dx.push(Math.round(g.dx * 1000) / 1000);
    dy.push(Math.round(g.dy * 1000) / 1000);
    alt.push(Math.round(g.alt * 10) / 10);
    kSum += g.k;
  }
  const k = Math.round((kSum / N) * 10000) / 10000;
  const pk = viewGeometry(ecl.peak.time, obs);
  cities.push({
    id: c.id, name: c.name, lat: c.lat, lon: c.lon, k,
    start: minOf(ecl.partial_begin.time),
    max: minOf(ecl.peak.time),
    end: minOf(ecl.partial_end.time),
    maxPct: Math.round(obscuration(Math.hypot(pk.dx, pk.dy), pk.k) * 1000) / 10,
    sunset: minOf(sunset),
    dx, dy, alt,
  });
}

// ---- Kartan ----------------------------------------------------------------
// Projektion: enkel plattkarta med cos(63°) i x-led.
const LAT0 = 69.6, LON0 = 9.6, S = 46, CX = Math.cos(63 * DEG);
const px = lon => Math.round((lon - LON0) * S * CX * 10) / 10;
const py = lat => Math.round((LAT0 - lat) * S * 10) / 10;

const ne = JSON.parse(fs.readFileSync('ne50.geojson', 'utf8'));
function ringsOf(name) {
  const f = ne.features.find(f => f.properties.NAME === name || f.properties.ADMIN === name);
  if (!f) throw new Error('saknar ' + name);
  const g = f.geometry;
  return g.type === 'Polygon' ? [g.coordinates[0]] : g.coordinates.map(p => p[0]);
}
// Douglas–Peucker-förenkling i projicerade koordinater
function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const keep = new Array(pts.length).fill(false);
  // Sluten ring: första = sista punkten gör segmentet degenererat.
  // Ankra i tre punkter (start, mitt, slut) så rekursionen får riktiga korder.
  const mid = Math.floor(pts.length / 2);
  keep[0] = keep[mid] = keep[pts.length - 1] = true;
  const stack = [[0, mid], [mid, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let dmax = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dxx = bx - ax, dyy = by - ay, len = Math.hypot(dxx, dyy) || 1e-9;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dyy * (pts[i][0] - ax) - dxx * (pts[i][1] - ay)) / len;
      if (d > dmax) { dmax = d; idx = i; }
    }
    if (dmax > eps) { keep[idx] = true; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
function toPath(rings, eps, minPts) {
  let d = '';
  for (const ring of rings) {
    let pts = ring.map(([lon, lat]) => [px(lon), py(lat)]);
    pts = simplify(pts, eps);
    if (pts.length < (minPts || 4)) continue;
    d += 'M' + pts.map(p => `${Math.round(p[0]*10)/10} ${Math.round(p[1]*10)/10}`).join('L') + 'Z';
  }
  return d;
}

const swePath = toPath(ringsOf('Sweden'), 0.9, 4);
// Grannländer: öppna konturlinjer, klippta mot kartfönstret (med marginal).
const BOX = { x0: -80, x1: 410, y0: -40, y1: 720 };
const inBox = p => p[0] >= BOX.x0 && p[0] <= BOX.x1 && p[1] >= BOX.y0 && p[1] <= BOX.y1;
function toClippedPath(rings, eps) {
  let d = '';
  for (const ring of rings) {
    let pts = simplify(ring.map(([lon, lat]) => [px(lon), py(lat)]), eps);
    let run = [];
    const flush = () => {
      if (run.length >= 2)
        d += 'M' + run.map(p => `${p[0]} ${p[1]}`).join('L');
      run = [];
    };
    for (let i = 0; i < pts.length; i++) {
      if (inBox(pts[i])) {
        if (run.length === 0 && i > 0) run.push(pts[i - 1]); // en punkt utanför för kontinuitet
        run.push(pts[i]);
      } else {
        if (run.length) { run.push(pts[i]); flush(); }
      }
    }
    flush();
  }
  return d;
}
const grann = ['Norway', 'Finland', 'Denmark', 'Estonia', 'Latvia', 'Germany', 'Poland', 'Lithuania', 'Russia']
  .map(n => { try { return toClippedPath(ringsOf(n), 1.8); } catch (e) { return ''; } }).join('');

const out = {
  t0: '2026-08-12T16:40:00Z', stepMin: STEP_MIN, n: N,
  cities: cities.map(c => ({ ...c, mx: px(c.lon), my: py(c.lat) })),
  swePath, grannPath: grann,
  view: { w: Math.round((25.2 - LON0) * S * CX), h: Math.round((LAT0 - 54.8) * S) },
};
fs.writeFileSync('fse-data.json', JSON.stringify(out));
console.log('viewBox', out.view, 'swePath', swePath.length, 'tecken, grannPath', grann.length);
for (const c of out.cities) console.log(c.name.padEnd(10), 'karta', c.mx, c.my, 'max', c.maxPct + '%', 'start/max/end/sunset (min)', c.start, c.max, c.end, c.sunset);
