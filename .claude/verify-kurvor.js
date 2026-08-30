#!/usr/bin/env node
// Kontrollerar att KURVOR i teori-figurerna (::: figur i data/teori/*.md) är
// mjuka — inte ritade som en grov polylinje med synliga facetter.
//
// Bakgrunden: normalfördelningskurvorna i ma2c-6.5 ritades som 11–13 raka
// segment med en spetsig topp i stället för som klockkurvor (påpekat
// 2026-08-20: "det ska givetvis vara fina och jämna klockkurvor och inte
// spetsigt och hackigt"). Samma slarv fanns i ett tjugotal andra grafer.
//
// REGELN (se "Kurvor ska ritas ur sin funktion" i CLAUDE.md):
//   En kurva ritas antingen
//     (a) ur sin funktion med TÄT sampling (steg ≤ ~4 enheter), eller
//     (b) med riktiga kurvkommandon (C/Q/A/S).
//   En handdragen polylinje med långa segment är aldrig godtagbart.
//
// Heuristik: en path som bara har M/L, vars hörn svänger mjukt (2–40°) på
// minst 3 ställen, är en kurva. Är dess segment längre än ~10 px RENDERAT
// (segmentlängd × figurens skalfaktor) syns facetterna.
//
// Kör: node .claude/verify-kurvor.js

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data', 'teori');
const files = fs.readdirSync(dir).filter(f => /^(fy\d|ma\dc|ma4|ma1b|ma2b)-.*\.md$/.test(f)).sort();

const MJUK_MIN = 2, MJUK_MAX = 40;   // grader: sväng som tolkas som kurva
const MIN_MJUKA = 3;                 // så många mjuka hörn = kurva, inte polygon
const MAX_SEGMENT_PX = 10;           // renderad segmentlängd som ännu inte facetterar

const vinkel = (p, q, r) => {
    const a = [q[0] - p[0], q[1] - p[1]], b = [r[0] - q[0], r[1] - q[1]];
    const la = Math.hypot(...a), lb = Math.hypot(...b);
    if (!la || !lb) return 0;
    const cos = (a[0] * b[0] + a[1] * b[1]) / (la * lb);
    return Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
};

let problem = 0, granskade = 0;
for (const f of files) {
    const src = fs.readFileSync(path.join(dir, f), 'utf-8');
    let idx = 0;
    for (const m of src.matchAll(/<svg[\s\S]*?<\/svg>/g)) {
        idx++;
        const svg = m[0];
        const vb = (svg.match(/viewBox="([^"]*)"/) || [])[1];
        if (!vb) continue;
        const vw = +vb.trim().split(/\s+/)[2];
        const wAttr = parseFloat((svg.match(/<svg[^>]*\swidth="([\d.]+)"/) || [])[1]);
        const k = isFinite(wAttr) && vw ? wAttr / vw : 1;

        for (const p of svg.matchAll(/<path[^>]*\sd="([^"]*)"/g)) {
            const d = p[1];
            if (/[CQAScqasT]/.test(d)) continue;          // riktiga kurvkommandon
            const pts = [...d.replace(/[Zz]/g, '').matchAll(/(-?[\d.]+)[ ,]+(-?[\d.]+)/g)]
                .map(x => [+x[1], +x[2]]);
            if (pts.length < 5) continue;
            granskade++;

            let mjuka = 0, langder = [];
            for (let i = 1; i < pts.length - 1; i++) {
                const v = vinkel(pts[i - 1], pts[i], pts[i + 1]);
                langder.push(Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
                if (v > MJUK_MIN && v < MJUK_MAX) mjuka++;
            }
            if (mjuka < MIN_MJUKA || !langder.length) continue;

            const medel = langder.reduce((s, x) => s + x, 0) / langder.length;
            const px = medel * k;
            if (px > MAX_SEGMENT_PX) {
                problem++;
                console.log(`  ✗ ${f} figur #${idx}: kurva ritad som polylinje — ` +
                    `${pts.length} punkter, ${mjuka} mjuka hörn, segment ${medel.toFixed(1)} enheter ` +
                    `(${px.toFixed(1)}px renderat). Sampla tätare ur funktionen, eller rita med C/Q.`);
            }
        }
    }
}

console.log('');
if (problem) {
    console.log(`${problem} kurva/kurvor med synliga facetter (av ${granskade} polylinje-paths).`);
    process.exit(1);
}
console.log(`OK — inga facetterade kurvor (${granskade} polylinje-paths granskade).`);
