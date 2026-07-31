#!/usr/bin/env node
/**
 * verify-kopplingsschema.js — verifierar BALANSEN i kopplingsscheman:
 * inline-SVG i teorin (::: figur i data/teori/*.md) och de scheman som
 * makeCircuit()/makeBridge() genererar i data/ovningar.js.
 *
 * Bakgrund (påpekat 2026-07-31): komponenter hamnar lätt hopklumpade i
 * ena änden av en ledare — "lampa 1 och 2 tryckta åt vänster medan
 * resten av ledaren är tom" — och batteriet hamnar bredvid mitten i
 * stället för på den. En parallellkoppling kan dessutom få ett mycket
 * mindre avstånd mellan understa grenen och bottenledningen än mellan
 * grenarna. Allt detta läses som slarv i en annars stram lärobokstil.
 *
 * REGELN som kontrolleras (se CLAUDE.md, "Kopplingsscheman: jämn
 * fördelning och centrering"):
 *
 *  1. Komponenterna på en ledarsträcka (mellan två noder/hörn) ska ha
 *     LIKA STORA mellanrum — före första, mellan varje par och efter
 *     sista komponenten. Gäller både vågräta och lodräta ledare, och
 *     både lampor/resistorer/mätare och batterier.
 *  2. Parallellkopplingens grenar ska ligga på LIKA STORA avstånd —
 *     inklusive avståndet från toppledningen ner till första grenen och
 *     från sista grenen ner till bottenledningen.
 *
 * Figuren räknas som kopplingsschema om den innehåller en
 * batterisymbol (två parallella streck, ett kort och tjockt).
 *
 * Kör:  node .claude/verify-kopplingsschema.js  [filglob-del t.ex. fy1-7]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TEORI_DIR = path.join(ROOT, 'data', 'teori');
const filter = process.argv[2] || '';
const TOL = 3;          // px — tillåten avvikelse mellan mellanrum
const MIN_SEG = 24;     // px — kortare ledningsstumpar räknas inte som ledare

let errors = 0, checkedRows = 0, checkedLadders = 0, checkedFigs = 0;
function err(fig, msg) { errors++; console.log(`  ✗ ${fig}: ${msg}`); }

// ── SVG-parsning ────────────────────────────────────────────────────
function attrs(tag) {
    const o = {};
    for (const m of tag.matchAll(/([a-zA-Z0-9-]+)\s*=\s*"([^"]*)"/g)) o[m[1]] = m[2];
    return o;
}
const num = v => (v === undefined ? undefined : parseFloat(v));
const isWhite = c => /^(#fff(fff)?|white)$/i.test((c || '').trim());

function parseSvg(svg) {
    const H = [], V = [], comps = [], dots = [];
    const add = (x1, y1, x2, y2, w) => {
        if (Math.abs(y1 - y2) < 0.6) H.push({ y: (y1 + y2) / 2, a: Math.min(x1, x2), b: Math.max(x1, x2), w });
        else if (Math.abs(x1 - x2) < 0.6) V.push({ x: (x1 + x2) / 2, a: Math.min(y1, y2), b: Math.max(y1, y2), w });
    };
    for (const m of svg.matchAll(/<line\b([^>]*)>/g)) {
        const a = attrs(m[1]);
        if (isWhite(a.stroke)) continue;
        add(num(a.x1), num(a.y1), num(a.x2), num(a.y2), num(a['stroke-width']) || 1);
    }
    for (const m of svg.matchAll(/<polyline\b([^>]*)>/g)) {
        const a = attrs(m[1]);
        if (isWhite(a.stroke) || !a.points) continue;
        const p = a.points.trim().split(/\s+/).map(s => s.split(',').map(Number));
        for (let i = 1; i < p.length; i++) add(p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], num(a['stroke-width']) || 1);
    }
    for (const m of svg.matchAll(/<circle\b([^>]*)>/g)) {
        const a = attrs(m[1]);
        const r = num(a.r), cx = num(a.cx), cy = num(a.cy);
        if (r >= 8) comps.push({ kind: 'symbol', cx, cy, w: 2 * r, h: 2 * r });
        else dots.push({ cx, cy });
    }
    for (const m of svg.matchAll(/<rect\b([^>]*)>/g)) {
        const a = attrs(m[1]);
        const x = num(a.x), y = num(a.y), w = num(a.width), h = num(a.height);
        if (!(w >= 10 && h >= 8)) continue;
        if (isWhite(a.stroke) && isWhite(a.fill)) continue;
        comps.push({ kind: 'symbol', cx: x + w / 2, cy: y + h / 2, w, h });
    }
    // Batteri: två korta parallella streck, ett tjockt, förskjutna 6–16 px.
    // Plattorna är INTE ledare — plocka bort dem ur H/V.
    const drop = { H: new Set(), V: new Set() };
    const pair = (list, key, kind) => {
        for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
            const p = list[i], q = list[j];
            const lp = p.b - p.a, lq = q.b - q.a;
            // Plattorna: en lång tunn (pluspol) + en kort tjock (minuspol)
            if (lp > 34 || lq > 34 || lp < 8 || lq < 8) continue;
            if (Math.abs(lp - lq) < 4) continue;          // olika långa plattor
            if (Math.max(p.w, q.w) < 2.4) continue;       // minst en kraftig platta
            const d = Math.abs(p[key] - q[key]);
            if (d < 6 || d > 16) continue;
            const cp = (p.a + p.b) / 2, cq = (q.a + q.b) / 2;
            if (Math.abs(cp - cq) > 3) continue;
            const c = (p[key] + q[key]) / 2, mid = (cp + cq) / 2;
            comps.push(kind === 'H'
                ? { kind: 'battery', cx: c, cy: mid, w: d, h: Math.max(p.b - p.a, q.b - q.a) }
                : { kind: 'battery', cx: mid, cy: c, w: Math.max(p.b - p.a, q.b - q.a), h: d });
            drop[kind].add(i); drop[kind].add(j);
        }
    };
    pair(V, 'x', 'H');   // lodräta plattor → batteri på vågrät ledare
    pair(H, 'y', 'V');   // vågräta plattor → batteri på lodrät ledare
    return {
        H: H.filter((_, i) => !drop.V.has(i)),
        V: V.filter((_, i) => !drop.H.has(i)),
        comps, dots,
    };
}

// Slår ihop segment till ledare ("runs"); ett glapp får bryggas av en komponent
function buildRuns(segs, comps, axis) {
    const pos = axis === 'H' ? 'y' : 'x';
    const cpos = axis === 'H' ? 'cy' : 'cx';
    const cspan = axis === 'H' ? 'cx' : 'cy';
    const csize = axis === 'H' ? 'w' : 'h';
    const groups = new Map();
    for (const s of segs) {
        const k = Math.round(s[pos] * 2) / 2;
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k).push(s);
    }
    const runs = [];
    for (const [p, list] of groups) {
        list.sort((x, y) => x.a - y.a);
        const on = comps.filter(c => Math.abs(c[cpos] - p) < 2);
        let cur = { p, a: list[0].a, b: list[0].b };
        for (let i = 1; i < list.length; i++) {
            const s = list[i];
            if (s.a <= cur.b + 0.5) { cur.b = Math.max(cur.b, s.b); continue; }
            const bridge = on.find(c => c[cspan] > cur.b - 1 && c[cspan] < s.a + 1);
            if (bridge) cur.b = Math.max(cur.b, s.b);
            else { runs.push(cur); cur = { p, a: s.a, b: s.b }; }
        }
        runs.push(cur);
        for (const r of runs) {
            if (r.p !== p) continue;
            r.comps = on.filter(c => c[cspan] > r.a - 1 && c[cspan] < r.b + 1)
                        .sort((x, y) => x[cspan] - y[cspan]);
            r.axis = axis; r.cspan = cspan; r.csize = csize;
        }
    }
    return runs.filter(r => r.b - r.a >= MIN_SEG * 2);
}

// Noder på en ledare: punkter där en tvärgående ledare (eller en ritad
// nodpunkt) möter den — där delas ledaren i egna sträckor.
function junctions(run, cross, dots) {
    const out = [];
    for (const c of cross) {
        if (c[run.axis === 'H' ? 'x' : 'y'] === undefined) continue;
        const at = run.axis === 'H' ? c.x : c.y;
        if (at <= run.a + 1 || at >= run.b - 1) continue;
        if (c.a > run.p + 1 || c.b < run.p - 1) continue;   // rör inte ledaren
        out.push(at);
    }
    for (const d of dots) {
        const at = run.axis === 'H' ? d.cx : d.cy;
        const off = run.axis === 'H' ? d.cy : d.cx;
        if (Math.abs(off - run.p) > 2) continue;
        if (at <= run.a + 1 || at >= run.b - 1) continue;
        out.push(at);
    }
    return [...new Set(out.map(v => Math.round(v * 2) / 2))].sort((a, b) => a - b);
}

function checkRuns(fig, runs, cross, dots) {
    for (const run of runs) {
        if (!run.comps.length) continue;
        const cuts = [run.a, ...junctions(run, cross, dots), run.b];
        for (let i = 1; i < cuts.length; i++) {
            const a = cuts[i - 1], b = cuts[i];
            if (b - a < MIN_SEG) continue;
            const cs = run.comps.filter(c => c[run.cspan] > a && c[run.cspan] < b);
            if (!cs.length) continue;
            const gaps = [];
            let prev = a;
            for (const c of cs) { gaps.push(c[run.cspan] - c[run.csize] / 2 - prev); prev = c[run.cspan] + c[run.csize] / 2; }
            gaps.push(b - prev);
            checkedRows++;
            const spread = Math.max(...gaps) - Math.min(...gaps);
            if (spread > TOL) {
                const dir = run.axis === 'H' ? `vågrät ledare y=${run.p}` : `lodrät ledare x=${run.p}`;
                err(fig, `${dir}, sträckan ${a}–${b}: ${cs.length} komponent(er) ojämnt fördelade — ` +
                    `mellanrum ${gaps.map(g => g.toFixed(1)).join(' | ')} (skillnad ${spread.toFixed(1)} px). ` +
                    `Lika mellanrum vore ${((b - a - cs.reduce((s, c) => s + c[run.csize], 0)) / (cs.length + 1)).toFixed(1)} px.`);
            }
        }
    }
}

// Parallellkoppling: raderna längs en räls ska ligga jämnt fördelade
function checkLadders(fig, runsH, runsV) {
    for (const rail of runsV) {
        const rows = runsH
            .filter(r => r.p >= rail.a - 1.5 && r.p <= rail.b + 1.5 && r.a <= rail.p + 1.5 && r.b >= rail.p - 1.5)
            .map(r => r.p)
            .sort((a, b) => a - b);
        const uniq = [...new Set(rows)];
        if (uniq.length < 3) continue;
        const gaps = [];
        for (let i = 1; i < uniq.length; i++) gaps.push(uniq[i] - uniq[i - 1]);
        checkedLadders++;
        const spread = Math.max(...gaps) - Math.min(...gaps);
        if (spread > TOL) {
            err(fig, `räls x=${rail.p}: grenarna ligger ojämnt (rader y=${uniq.join(', ')}, ` +
                `avstånd ${gaps.map(g => g.toFixed(1)).join(' | ')}). Avstånden mellan toppledning, ` +
                `grenar och bottenledning ska vara lika stora.`);
        }
    }
}

function checkFigure(fig, svg) {
    const p = parseSvg(svg);
    if (!p.comps.some(c => c.kind === 'battery')) return;   // inte ett kopplingsschema
    checkedFigs++;
    const runsH = buildRuns(p.H, p.comps, 'H');
    const runsV = buildRuns(p.V, p.comps, 'V');
    checkRuns(fig, runsH, runsV, p.dots);
    checkRuns(fig, runsV, runsH, p.dots);
    checkLadders(fig, runsH, runsV);
}

// ── 1. Teorifigurer ─────────────────────────────────────────────────
const files = fs.readdirSync(TEORI_DIR).filter(f => f.endsWith('.md') && f.includes(filter));
for (const f of files) {
    const src = fs.readFileSync(path.join(TEORI_DIR, f), 'utf8');
    let i = 0;
    for (const m of src.matchAll(/<svg[\s\S]*?<\/svg>/g)) {
        i++;
        const line = src.slice(0, m.index).split('\n').length;
        checkFigure(`${f} figur #${i} (rad ${line})`, m[0]);
    }
}

// ── 2. Genererade scheman i data/ovningar.js (makeCircuit/makeBridge) ─
if (!filter || 'ovningar'.includes(filter)) {
    const ctx = { window: {}, document: {}, console: { log() {}, warn() {}, error() {} } };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', 'ovningar.js'), 'utf8'), ctx);
    const data = ctx.window.OVNINGAR || {};
    const seen = new Set();
    for (const key of Object.keys(data)) {
        (data[key] || []).forEach((q, qi) => {
            const txt = [q.question, q.solution].filter(Boolean).join('\n');
            let i = 0;
            for (const m of txt.matchAll(/<svg[\s\S]*?<\/svg>/g)) {
                i++;
                if (seen.has(m[0])) continue;
                seen.add(m[0]);
                checkFigure(`ovningar.js ${key} uppg ${qi + 1} figur #${i}`, m[0]);
            }
        });
    }
}

if (!errors) {
    console.log(`\nOK — ${checkedFigs} kopplingsschema(n): ${checkedRows} ledarsträckor och ` +
        `${checkedLadders} parallellkopplingar har jämn fördelning och centrerade komponenter.`);
} else {
    console.log(`\n${errors} fel i ${checkedFigs} kopplingsschema(n) ` +
        `(${checkedRows} ledarsträckor, ${checkedLadders} parallellkopplingar kontrollerade).`);
}
process.exit(errors ? 1 : 0);
