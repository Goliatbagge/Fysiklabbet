#!/usr/bin/env node
// Kontrollerar inline-SVG-figurer (::: figur) i data/teori/*.md:
//
//  (1) TÄT viewBox — ingen onödig "luft" i kanterna (särskilt topp/botten),
//      eftersom figuren skalas till behållarens bredd och ett tomt band i
//      viewBoxen då blir ett stort visuellt glapp mot texten. Heuristik:
//      ungefärlig bounding-box av geometrin (line, rect, circle/ellipse,
//      polygon/polyline, path, text-ankarpunkter) jämförs med viewBoxen.
//
//  (2) SKALA — figuren ska renderas i naturlig storlek (1 viewBox-enhet =
//      1 CSS-px) så att texten/beteckningarna i figuren är lika stora som
//      brödtexten (16 px). Kräver width/height = viewBox-måtten på <svg>
//      (annars sträcks SVG:n till spaltbredden → texten blir för stor) och
//      att ingen etikett har font-size > 17.
//
//  (3) PLACERING — en figur i en ::: exempel-ruta får aldrig ligga sist
//      (efter deluppgifterna). Den ska komma efter uppgiftens inledande
//      stycke men FÖRE deluppgifterna a) b) c) … Frågorna ska stå sist.
//
// Kör: node .claude/verify-figur-bounds.js

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'data', 'teori');
const files = fs.readdirSync(dir).filter(f => /^(fy\d|ma\dc)-.*\.md$/.test(f)).sort();

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
            // Text är ingen punkt: glyferna sträcker sig UPP över baslinjen
            // (≈0,8 em) och en bit NER (≈0,28 em). Modellera det så att
            // utrymmet en topp-/bottenetikett verkligen upptar inte räknas
            // som tom marginal (annars motsäger margin- och clip-checken
            // varandra vid en etikett nära kanten).
            const x = +attr(m[0], 'x'), y = +attr(m[0], 'y');
            const fs = parseFloat(attr(m[0], 'font-size')) || 16;
            add(x, y - fs * 0.8);
            add(x, y + fs * 0.28);
        }
    }
    return { minX, minY, maxX, maxY };
}

// Text-only bounding-box för avklippnings-kollen. Geometri (särskilt <path>)
// kan inte parsas exakt av number-heuristiken (fantom-punkter i 0,0), så för
// clip-checken litar vi BARA på text — det är etiketter ("80 kg") som i
// praktiken klipps mot kanten. Text inuti en transform-grupp (t.ex. speglade
// figurdelar) hoppas över, eftersom koordinaterna då inte är i viewBox-rummet.
function textBboxOfSvgBody(body) {
    // Nolla ut innehållet i alla transformerade grupper så deras text ignoreras.
    const cleaned = body.replace(/<g\b[^>]*transform\s*=[^>]*>[\s\S]*?<\/g>/g, '');
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const reText = /<text\b([^>]*)>/g;
    let m;
    while ((m = reText.exec(cleaned))) {
        if (/transform\s*=/.test(m[1])) continue; // egen transform → hoppa
        const x = +attr(m[0], 'x'), y = +attr(m[0], 'y');
        const fs = parseFloat(attr(m[0], 'font-size')) || 16;
        if (!isFinite(x) || !isFinite(y)) continue;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        const top = y - fs * 0.8, bot = y + fs * 0.28;
        if (top < minY) minY = top; if (bot > maxY) maxY = bot;
    }
    return { minX, minY, maxX, maxY };
}

let problems = 0, figures = 0, sizeProblems = 0, clipProblems = 0;
// Innehåll som sticker UT över viewBox-kanten klipps bort i renderingen.
// Tolerans i px för konturer/strokes som får spilla en aning utanför.
const CLIP_TOL = 3;
for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8').replace(/\r\n?/g, '\n');
    const reFig = /::: figur\n([\s\S]*?)\n:::/g;
    let fm, idx = 0;
    while ((fm = reFig.exec(raw))) {
        idx++;
        const block = fm[1];
        const svg = block.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/);
        if (!svg) continue;
        const openTag = '<svg ' + svg[1] + '>'; // bara öppningstaggen (inte barnen)
        const vb = nums(attr(openTag, 'viewBox') || '');
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

        // Avklippt TEXT: en etikett vars glyfer sträcker sig över topp-/
        // nederkanten klipps bort (t.ex. "80 kg" i gungbräde-figuren). Vi
        // kontrollerar bara VERTIKALT och bara text — font-metriken ger en
        // pålitlig höjd, medan text-bredd (okänd, beror på text-anchor) och
        // <path>-geometri inte kan mätas exakt av number-heuristiken.
        const tb = textBboxOfSvgBody(svg[2]);
        if (isFinite(tb.minY)) {
            const overTop = vy - tb.minY;
            const overBot = tb.maxY - (vy + vh);
            const clipped = [];
            if (overTop > CLIP_TOL) clipped.push(`top=${overTop.toFixed(0)}px`);
            if (overBot > CLIP_TOL) clipped.push(`bottom=${overBot.toFixed(0)}px`);
            if (clipped.length) {
                clipProblems++;
                console.log(`  ✗ ${f} figur #${idx}: text AVKLIPPT utanför viewBox (${clipped.join(', ')}) ` +
                    `— viewBox ${vx} ${vy} ${vw} ${vh}, text y[${tb.minY.toFixed(0)},${tb.maxY.toFixed(0)}]. ` +
                    `Utöka viewBoxen (och width/height) uppåt/nedåt.`);
            }
        }

        // (3) Skala: figuren ska renderas i naturlig storlek (1 viewBox-enhet
        // = 1 CSS-px) så att text-storleken matchar brödtexten (16 px). Det
        // kräver width/height = viewBox-måtten (annars sträcks SVG:n till
        // spaltbredden och texten blir för stor), och att ingen etikett är
        // större än brödtexten.
        const wAttr = parseFloat(attr(openTag, 'width'));
        const hAttr = parseFloat(attr(openTag, 'height'));
        if (!(Math.abs(wAttr - vw) <= 1 && Math.abs(hAttr - vh) <= 1)) {
            sizeProblems++;
            console.log(`  ✗ ${f} figur #${idx}: saknar/felaktig width/height ` +
                `(width="${isFinite(wAttr) ? wAttr : ''}" height="${isFinite(hAttr) ? hAttr : ''}" ` +
                `mot viewBox ${vw}×${vh}). Sätt width/height = viewBox-måtten så figuren renderas 1:1.`);
        }
        const fsizes = (svg[2].match(/font-size="\d+(?:\.\d+)?"/g) || [])
            .map(s => parseFloat(s.match(/[\d.]+/)[0]));
        const maxFs = fsizes.length ? Math.max(...fsizes) : 0;
        if (maxFs > 17) {
            sizeProblems++;
            console.log(`  ✗ ${f} figur #${idx}: text-storlek ${maxFs}px > brödtext (16px). ` +
                `Etiketter ska vara ~16px (samma storlek som uppgiftstexten).`);
        }
    }
}

// --- (2) Placering: figur i ::: exempel måste komma före deluppgifterna.
let placementProblems = 0;
for (const f of files) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf-8').replace(/\r\n?/g, '\n').split('\n');
    const stack = [];
    let ctx = null; // { start, fig, sub } radnummer (0-baserat), -1 = saknas
    const evaluate = () => {
        // Undantag: ett exempel med FLERA figurer har en skiss per deluppgift
        // (a/b/c/d) — då ligger figurerna med rätta efter respektive deluppgift.
        // Regeln gäller bara enstaka problem-illustrationsfigur.
        if (ctx && ctx.figCount === 1 && ctx.fig >= 0 && ctx.sub >= 0 && ctx.fig > ctx.sub) {
            placementProblems++;
            console.log(`  ✗ ${f} (rad ${ctx.start + 1}): figur ligger EFTER deluppgift ` +
                `(figur rad ${ctx.fig + 1}, första deluppgift rad ${ctx.sub + 1}). ` +
                `Flytta figuren före a)/b)/…`);
        }
        ctx = null;
    };
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const open = line.match(/^:::\s*([a-zåäö]+)(?:\s+"[^"]*")?\s*$/i);
        const close = /^:::\s*$/.test(line);
        if (open) {
            const type = open[1].toLowerCase();
            if (type === 'exempel') ctx = { start: i, fig: -1, sub: -1, figCount: 0 };
            else if (type === 'figur' && ctx) { if (ctx.fig < 0) ctx.fig = i; ctx.figCount++; }
            stack.push(type);
        } else if (close) {
            const popped = stack.pop();
            if (popped === 'exempel') evaluate();
        } else if (ctx && ctx.sub < 0 && /^\*\*[a-d]\)/.test(line)) {
            ctx.sub = i;
        }
    }
}

const total = problems + sizeProblems + placementProblems + clipProblems;
if (total) {
    if (problems) console.log(`\n${problems} figur(er) med för mycket tom marginal — beskär viewBoxen tätt runt innehållet.`);
    if (clipProblems) console.log(`\n${clipProblems} figur(er) med avklippt innehåll — utöka viewBoxen så inget sticker utanför kanten.`);
    if (sizeProblems) console.log(`\n${sizeProblems} figur(er) med fel skala/text-storlek — sätt width/height = viewBox och text ~16px.`);
    if (placementProblems) console.log(`\n${placementProblems} figur(er) felplacerad(e) — figur i exempel ska stå före deluppgifterna.`);
    process.exit(1);
} else {
    console.log(`OK — ${figures} figur(er) granskade: tät viewBox + inget avklippt + naturlig skala + korrekt placering.`);
}
