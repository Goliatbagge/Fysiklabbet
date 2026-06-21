#!/usr/bin/env node
// Kontrollerar att inline-SVG-figurer (::: figur) i data/teori/*.md har en
// viewBox som TÄTT omsluter figurinnehållet — ingen onödig "luft" i kanterna
// (särskilt toppen/botten), eftersom figuren skalas till behållarens bredd
// och en tom band i viewBoxen då blir ett stort visuellt glapp mot texten.
//
// Heuristik: beräknar en ungefärlig bounding-box av geometrin (line, rect,
// circle/ellipse, polygon/polyline, path, samt text-ankarpunkter) och varnar
// om marginalen mellan innehållet och viewBox-kanten är för stor.
//
// Kör: node .claude/verify-figur-bounds.js

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data', 'teori');
const files = fs.readdirSync(dir).filter(f => /^fy\d-.*\.md$/.test(f)).sort();

// Tröskelvärden: andel av dimensionen OCH absolut minimum (båda måste
// överskridas för att flagga → färre falsklarm). Topp/botten striktare än
// vänster/höger (texten breddar ofta horisontellt utan att vi vet bredden).
const TOL = {
    top:    { rel: 0.06, abs: 10 },
    bottom: { rel: 0.06, abs: 10 },
    left:   { rel: 0.12, abs: 18 },
    right:  { rel: 0.12, abs: 18 },
};

function nums(s) { return (s.match(/-?\d+(?:\.\d+)?/g) || []).map(Number); }
function attr(tag, name) {
    const m = tag.match(new RegExp(name + '\\s*=\\s*"([^"]*)"'));
    return m ? m[1] : null;
}

function bboxOfSvgBody(body) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const add = (x, y) => {
        if (!isFinite(x) || !isFinite(y)) return;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
    };
    let m;
    // <line>
    const reTag = /<(line|rect|circle|ellipse|polygon|polyline|path|text)\b([^>]*)>/g;
    while ((m = reTag.exec(body))) {
        const tag = m[1], attrs = m[2];
        if (tag === 'line') {
            add(+attr(m[0], 'x1'), +attr(m[0], 'y1'));
            add(+attr(m[0], 'x2'), +attr(m[0], 'y2'));
        } else if (tag === 'rect') {
            const x = +attr(m[0], 'x'), y = +attr(m[0], 'y');
            const w = +attr(m[0], 'width'), h = +attr(m[0], 'height');
            add(x, y); add(x + w, y + h);
        } else if (tag === 'circle') {
            const cx = +attr(m[0], 'cx'), cy = +attr(m[0], 'cy'), r = +attr(m[0], 'r');
            add(cx - r, cy - r); add(cx + r, cy + r);
        } else if (tag === 'ellipse') {
            const cx = +attr(m[0], 'cx'), cy = +attr(m[0], 'cy');
            const rx = +attr(m[0], 'rx'), ry = +attr(m[0], 'ry');
            add(cx - rx, cy - ry); add(cx + rx, cy + ry);
        } else if (tag === 'polygon' || tag === 'polyline') {
            const pts = nums(attr(m[0], 'points') || '');
            for (let i = 0; i + 1 < pts.length; i += 2) add(pts[i], pts[i + 1]);
        } else if (tag === 'path') {
            const d = nums(attr(m[0], 'd') || '');
            for (let i = 0; i + 1 < d.length; i += 2) add(d[i], d[i + 1]);
        } else if (tag === 'text') {
            add(+attr(m[0], 'x'), +attr(m[0], 'y'));
        }
    }
    return { minX, minY, maxX, maxY };
}

let problems = 0, figures = 0;
for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8').replace(/\r\n?/g, '\n');
    const reFig = /::: figur\n([\s\S]*?)\n:::/g;
    let fm, idx = 0;
    while ((fm = reFig.exec(raw))) {
        idx++;
        const block = fm[1];
        const svg = block.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/);
        if (!svg) continue;
        const vb = nums(attr(svg[0], 'viewBox') || '');
        if (vb.length !== 4) continue;
        figures++;
        const [vx, vy, vw, vh] = vb;
        const bb = bboxOfSvgBody(svg[2]);
        if (!isFinite(bb.minX)) continue;
        const margins = {
            top:    bb.minY - vy,
            bottom: (vy + vh) - bb.maxY,
            left:   bb.minX - vx,
            right:  (vx + vw) - bb.maxX,
        };
        const dim = { top: vh, bottom: vh, left: vw, right: vw };
        const flagged = [];
        for (const side of ['top', 'bottom', 'left', 'right']) {
            const t = TOL[side];
            if (margins[side] > Math.max(t.abs, t.rel * dim[side])) {
                flagged.push(`${side}=${margins[side].toFixed(0)}px`);
            }
        }
        if (flagged.length) {
            problems++;
            console.log(`  ✗ ${f} figur #${idx}: för stor marginal (${flagged.join(', ')}) ` +
                `— viewBox ${vx} ${vy} ${vw} ${vh}, innehåll ` +
                `x[${bb.minX.toFixed(0)},${bb.maxX.toFixed(0)}] y[${bb.minY.toFixed(0)},${bb.maxY.toFixed(0)}]`);
        }
    }
}

if (problems) {
    console.log(`\n${problems} figur(er) med för mycket tom marginal. Beskär viewBoxen tätt runt innehållet.`);
    process.exit(1);
} else {
    console.log(`OK — ${figures} figur(er) granskade, alla har tät viewBox.`);
}
