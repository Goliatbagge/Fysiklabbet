#!/usr/bin/env node
/**
 * verify-vinkelbagar.js — verifierar vinkelbågar och likhetsstreck i
 * teori-figurernas inline-SVG (::: figur i data/teori/*.md).
 *
 * Bakgrund: det VANLIGASTE felet i geometrifigurer är vinkelbågar som
 * "buktar åt fel håll" (fel sweep-flagga → bågens medelpunkt hamnar på
 * fel sida om kordan i stället för i vinkelns hörn) eller vars
 * ändpunkter inte ligger på vinkelbenen (bågen "sticker ut" eller
 * stannar mitt i luften). Näst vanligast: likhetsstreck (tvärstreck)
 * som ritats nästan parallellt med sin sida i stället för vinkelrätt.
 *
 * Kontroller per figur:
 *  1. Varje enkel bågkommandoväg  M x,y A r r 0 laf sf X,Y  ska ha en
 *     medelpunkt som sammanfaller med ett hörn (en punkt där minst två
 *     ritade segment möts). Bågens FAKTISKA medelpunkt beräknas ur
 *     ändpunkter + radie + sweep-flagga och jämförs mot hörnen.
 *  2. Bågens båda ändpunkter ska ligga på strålar från hörnet längs
 *     ritade segment (max ~8° vinkelavvikelse).
 *  3. Korta linjer (< 16 px, likhetsstreck) vars mittpunkt ligger på
 *     ett längre segment ska vara vinkelräta mot segmentet (> 55°).
 *
 * Kör:  node .claude/verify-vinkelbagar.js  [filglob-del t.ex. ma2c]
 */
const fs = require('fs');
const path = require('path');

const TEORI_DIR = path.join(__dirname, '..', 'data', 'teori');
const filter = process.argv[2] || '';

const files = fs.readdirSync(TEORI_DIR)
  .filter(f => f.endsWith('.md') && f.includes(filter));

let errors = 0, checkedArcs = 0, checkedTicks = 0;

function segsFromSvg(svg) {
  const segs = [];
  // <line> — isLine markerar äkta line-element (kandidater för likhetsstreck)
  for (const m of svg.matchAll(/<line\s([^>]*)\/?>(?:<\/line>)?/g)) {
    const a = attrs(m[1]);
    if ([a.x1, a.y1, a.x2, a.y2].some(v => v === undefined)) continue;
    segs.push({ x1: +a.x1, y1: +a.y1, x2: +a.x2, y2: +a.y2, isLine: true });
  }
  // <polygon>/<polyline> points (sido-segment, aldrig likhetsstreck)
  for (const m of svg.matchAll(/<poly(?:gon|line)\s[^>]*points="([^"]+)"/g)) {
    const pts = m[1].trim().split(/[\s,]+/).map(Number);
    const closed = m[0].startsWith('<polygon');
    for (let i = 0; i + 3 < pts.length; i += 2)
      segs.push({ x1: pts[i], y1: pts[i + 1], x2: pts[i + 2], y2: pts[i + 3] });
    if (closed && pts.length >= 6)
      segs.push({ x1: pts[pts.length - 2], y1: pts[pts.length - 1], x2: pts[0], y2: pts[1] });
  }
  return segs;
}

function attrs(s) {
  const o = {};
  for (const m of s.matchAll(/([\w-]+)="([^"]*)"/g)) o[m[1]] = m[2];
  return o;
}

function segLen(s) { return Math.hypot(s.x2 - s.x1, s.y2 - s.y1); }

// Alla hörn = segmentändpunkter + skärningspunkter mellan segment
// (kluster inom 2 px räknas som samma)
function vertices(segs) {
  const vs = [];
  const add = p => {
    if (!vs.some(v => Math.hypot(v[0] - p[0], v[1] - p[1]) < 2)) vs.push(p);
  };
  for (const s of segs) { add([s.x1, s.y1]); add([s.x2, s.y2]); }
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
    const a = segs[i], b = segs[j];
    const d = (a.x2 - a.x1) * (b.y2 - b.y1) - (a.y2 - a.y1) * (b.x2 - b.x1);
    if (Math.abs(d) < 1e-9) continue;
    const t = ((b.x1 - a.x1) * (b.y2 - b.y1) - (b.y1 - a.y1) * (b.x2 - b.x1)) / d;
    const u = ((b.x1 - a.x1) * (a.y2 - a.y1) - (b.y1 - a.y1) * (a.x2 - a.x1)) / d;
    if (t > -0.02 && t < 1.02 && u > -0.02 && u < 1.02)
      add([a.x1 + t * (a.x2 - a.x1), a.y1 + t * (a.y2 - a.y1)]);
  }
  return vs;
}

// Riktningar (grader) för vinkelben från punkten v: segment som börjar/
// slutar i v ger en stråle; segment som passerar genom v ger två.
function raysFrom(v, segs, minLen) {
  const rays = [];
  for (const s of segs) {
    if (segLen(s) < minLen) continue;
    const d1 = Math.hypot(s.x1 - v[0], s.y1 - v[1]);
    const d2 = Math.hypot(s.x2 - v[0], s.y2 - v[1]);
    if (d1 < 2) { rays.push(Math.atan2(s.y2 - v[1], s.x2 - v[0]) * 180 / Math.PI); continue; }
    if (d2 < 2) { rays.push(Math.atan2(s.y1 - v[1], s.x1 - v[0]) * 180 / Math.PI); continue; }
    // passerar segmentet genom v?
    const vx = s.x2 - s.x1, vy = s.y2 - s.y1, len = segLen(s);
    const t = ((v[0] - s.x1) * vx + (v[1] - s.y1) * vy) / (len * len);
    if (t <= 0 || t >= 1) continue;
    const dist = Math.hypot(v[0] - (s.x1 + t * vx), v[1] - (s.y1 + t * vy));
    if (dist < 1.5) {
      const a = Math.atan2(vy, vx) * 180 / Math.PI;
      rays.push(a, a + 180);
    }
  }
  return rays;
}

// Faktisk medelpunkt för SVG-bågen (ändpunkter, radie, flaggor)
function arcCenter(x1, y1, x2, y2, r, laf, sf) {
  const dx = (x2 - x1) / 2, dy = (y2 - y1) / 2;
  const d2 = dx * dx + dy * dy;
  let rr = r * r;
  if (rr < d2) rr = d2; // SVG skalar upp för liten radie
  const k = Math.sqrt(Math.max(0, (rr - d2) / d2)) * (laf === sf ? -1 : 1);
  return [x1 + dx - k * dy, y1 + dy + k * dx];
}

function angDiff(a, b) {
  let d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

for (const file of files) {
  const md = fs.readFileSync(path.join(TEORI_DIR, file), 'utf8');
  const figs = [...md.matchAll(/<svg[\s\S]*?<\/svg>/g)];
  figs.forEach((fm, fi) => {
    const svg = fm[0];
    const line = md.slice(0, fm.index).split('\n').length;
    const segs = segsFromSvg(svg);
    const vs = vertices(segs);
    const err = msg => { console.log(`FEL ${file}:${line} (figur ${fi + 1}): ${msg}`); errors++; };

    // 1+2: vinkelbågar
    for (const pm of svg.matchAll(/d="M\s*([\d.eE+-]+)[,\s]+([\d.eE+-]+)\s*A\s*([\d.eE+-]+)[,\s]+([\d.eE+-]+)[,\s]+[\d.eE+-]+[,\s]+([01])[,\s]+([01])[,\s]+([\d.eE+-]+)[,\s]+([\d.eE+-]+)\s*"/g)) {
      const [, x1, y1, rx, ry, laf, sf, x2, y2] = pm.map(Number);
      if (Math.abs(rx - ry) > 0.5) continue; // ej cirkelbåge
      // Rotations-/riktningspilar: en båge med pilspets (litet polygon-
      // huvud vid en ändpunkt) är ingen vinkelbåge — hoppa över.
      const hasArrowhead = [...svg.matchAll(/<polygon\s[^>]*points="([^"]+)"/g)].some(am => {
        const pts = am[1].trim().split(/[\s,]+/).map(Number);
        if (pts.length > 8) return false; // pilspetsar har ≤ 4 hörn
        let peri = 0;
        for (let i = 0; i + 3 < pts.length; i += 2)
          peri += Math.hypot(pts[i + 2] - pts[i], pts[i + 3] - pts[i + 1]);
        if (peri > 60) return false;
        for (let i = 0; i + 1 < pts.length; i += 2)
          for (const [ex, ey] of [[x1, y1], [x2, y2]])
            if (Math.hypot(pts[i] - ex, pts[i + 1] - ey) < 3) return true;
        return false;
      });
      if (hasArrowhead) continue;
      checkedArcs++;
      const c = arcCenter(x1, y1, x2, y2, rx, laf, sf);
      // närmaste hörn till den faktiska medelpunkten
      let best = null, bestD = Infinity;
      for (const v of vs) {
        const d = Math.hypot(v[0] - c[0], v[1] - c[1]);
        if (d < bestD) { bestD = d; best = v; }
      }
      // närmaste hörn till ändpunkterna (där bågen BORDE vara centrerad)
      let vtx = null, vtxD = Infinity;
      for (const v of vs) {
        const d = Math.abs(Math.hypot(v[0] - x1, v[1] - y1) - rx) +
                  Math.abs(Math.hypot(v[0] - x2, v[1] - y2) - rx);
        if (d < vtxD) { vtxD = d; vtx = v; }
      }
      const arcStr = `M ${x1},${y1} A ${rx} … ${x2},${y2}`;
      // Rak vinkel: ~180°-båge — medelpunkten ligger mitt på linjen,
      // inte i ett ritat hörn. Godkänn om medelpunkten ligger på ett segment.
      const chord = Math.hypot(x2 - x1, y2 - y1);
      if (Math.abs(chord - 2 * rx) < 1.5) {
        const onSeg = segs.some(s => {
          const vx = s.x2 - s.x1, vy = s.y2 - s.y1, len = segLen(s);
          if (len < 1) return false;
          const t = ((c[0] - s.x1) * vx + (c[1] - s.y1) * vy) / (len * len);
          if (t < 0 || t > 1) return false;
          return Math.hypot(c[0] - (s.x1 + t * vx), c[1] - (s.y1 + t * vy)) < 1.5;
        });
        if (onSeg) continue;
      }
      if (bestD > 3.5) {
        if (vtx && vtxD < 5) {
          err(`vinkelbåge [${arcStr}] buktar åt fel håll — medelpunkten (${c[0].toFixed(1)}, ${c[1].toFixed(1)}) ligger inte i hörnet (${vtx[0]}, ${vtx[1]}). Byt sweep-flagga (sista flaggan i A-kommandot).`);
          continue;
        }
        err(`vinkelbåge [${arcStr}] har medelpunkt (${c[0].toFixed(1)}, ${c[1].toFixed(1)}) som inte ligger i något hörn (närmast: ${bestD.toFixed(1)} px bort). Räkna om ändpunkterna: hörn + r·(cos θ, sin θ) längs respektive vinkelben.`);
        continue;
      }
      // 2: ändpunkter på vinkelben?
      const rays = raysFrom(best, segs, rx * 0.9);
      if (!rays.length) continue;
      for (const [px, py, namn] of [[x1, y1, 'start'], [x2, y2, 'slut']]) {
        const a = Math.atan2(py - best[1], px - best[0]) * 180 / Math.PI;
        const off = Math.min(...rays.map(r => angDiff(a, r)));
        if (off > 8) err(`vinkelbågens ${namn}punkt (${px}, ${py}) ligger ${off.toFixed(0)}° från närmaste vinkelben genom hörnet (${best[0]}, ${best[1]}) — bågen sticker ut utanför vinkeln eller stannar mitt i den.`);
      }
    }

    // 3: likhetsstreck vinkelräta mot sin sida. Bara <line>-element med
    // ändpunkterna på VAR SIN sida om sidan räknas (pilspetsben börjar
    // på linjen och kurv-polylines är inte line-element — hoppas över).
    for (const t of segs) {
      if (!t.isLine) continue;
      const L = segLen(t);
      if (L >= 16 || L < 3) continue;
      const mx = (t.x1 + t.x2) / 2, my = (t.y1 + t.y2) / 2;
      for (const s of segs) {
        if (s === t || segLen(s) < 30) continue;
        // avstånd mittpunkt → segment
        const vx = s.x2 - s.x1, vy = s.y2 - s.y1, len = segLen(s);
        const tt = ((mx - s.x1) * vx + (my - s.y1) * vy) / (len * len);
        if (tt < 0.05 || tt > 0.95) continue;
        const dist = Math.hypot(mx - (s.x1 + tt * vx), my - (s.y1 + tt * vy));
        if (dist > 3) continue;
        // signerade avstånd för ändpunkterna — kräv motsatta sidor
        const c1 = ((t.x1 - s.x1) * vy - (t.y1 - s.y1) * vx) / len;
        const c2 = ((t.x2 - s.x1) * vy - (t.y2 - s.y1) * vx) / len;
        if (!(c1 * c2 < 0 && Math.abs(c1) >= 1.5 && Math.abs(c2) >= 1.5)) continue;
        checkedTicks++;
        const aT = Math.atan2(t.y2 - t.y1, t.x2 - t.x1) * 180 / Math.PI;
        const aS = Math.atan2(vy, vx) * 180 / Math.PI;
        let d = angDiff(aT, aS); if (d > 90) d = 180 - d;
        if (d < 55) err(`likhetsstreck (${t.x1},${t.y1})–(${t.x2},${t.y2}) lutar bara ${d.toFixed(0)}° mot sidan (${s.x1},${s.y1})–(${s.x2},${s.y2}) — ska vara vinkelrätt (90°).`);
        break;
      }
    }
  });
}

console.log(`\n${files.length} filer, ${checkedArcs} vinkelbågar och ${checkedTicks} likhetsstreck kontrollerade — ${errors} fel.`);
process.exit(errors ? 1 : 0);
