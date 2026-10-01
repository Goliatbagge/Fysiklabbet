/* =====================================================================
   melongele-sim.js — fysikkärnan i materialstudien "Melon i gelé"
   (utkast/melongele.html). Ingen Three.js här: bara typade arrayer, så
   att kärnan kan provköras i Node (.claude/test-melongele.js).

   MODELL
   ------
   Geléskivan är ett cirkelsegment (tårtbit) med rundade kanter, beskrivet
   av en avståndsfunktion sdShape() i VILOLÄGETS koordinater (meter).

   1. Gitter.  Vilolägets rymd delas i kuber med sidan H = T/4. Varje kub
      som innehåller gelé blir en CELL; kubens hörn är partiklar. Varje
      cell delas i sex tetraedrar (Kuhn-delning, samma i alla celler så
      att grannarnas sidoytor passar ihop).
   2. Dynamik: XPBD (extended position based dynamics, Macklin m.fl.
      2016) med många små delsteg och en iteration per delsteg.
      - avståndsvillkor längs tetraedrarnas kanter, styvhet k = E·H·Σf
        (E = elasticitetsmodul, f = cellens gelé-andel),
      - volymvillkor per tetraeder, kompressionsmodul K = 25·E
        (nästan inkompressibel, som gelatin),
      - "inre dämpning": varje partikels hastighet dras mot den stela
        kroppens hastighet V + ω × r, så att svängningen i materialet
        dämpas men fallet och rotationen inte bromsas.
   3. Ytan som ritas är INBÄDDAD i gittret. Den skapas en gång (och efter
      varje snitt) med "surface nets" på ett fem gånger finare rutnät,
      varje punkt projiceras ut på nivåytan d = 0, och i varje bildruta
      flyttas punkten med trilinjär interpolation av sin cells åtta
      partiklar (fri-formsdeformation).
   4. Snitt: den virtuella nodens metod (Molino, Bao, Fedkiw 2004). Kniven
      ger ett plan i VÄRLDEN. För varje partikel sparas det signerade
      avståndet ψ till planet. Celler som ligger på båda sidor kopieras
      till båda bitarna, och varje bits gelé är shape ∩ {ψ > 0}, där ψ
      interpoleras trilinjärt i vilolägets koordinater. Snittytan följer
      alltså materialet och rundas med en mjuk max-funktion.
   5. Kontakt: bordet och de andra bitarna möter ytans punkter (inte
      gittrets hörn, som kan ligga utanför gelén), och korrektionen
      fördelas på cellens partiklar med de trilinjära vikterna.
   ===================================================================== */

export const P = {
    R: 0.15,                       // skivans radie (m)
    T: 0.045,                      // tjocklek (m)
    HALF: 31 * Math.PI / 180,      // halva öppningsvinkeln
    NY: 4,                         // celler i tjockleken
    RR: 0.0075,                    // kantavrundning (m)
    KC: 0.0035,                    // avrundning av snittkanter (m)
    RHO: 1050,                     // densitet (kg/m³), gelatin i vatten
    S: 5,                          // ytnätets förfining per cell
    G: 9.82,                       // tyngdfaktor (N/kg)
    RIND_G: 0.0095,                // grönt skal (m)
    RIND_W: 0.0055,                // vitt band innanför skalet (m)
};

const H = P.T / P.NY;              // cellstorlek
export const CELL = H;
const TIPZ = -0.095;               // spetsens z i viloläget (ger masscentrum nära origo)
export const TIP = [0, 0, TIPZ];

// Gittrets ursprung och storlek (celler). x symmetriskt kring 0.
const XMAX = P.R * Math.sin(P.HALF);
const NHX = Math.ceil(XMAX / H) + 1;
const NX = 2 * NHX;
const NYC = P.NY;
const NZ = Math.ceil(P.R / H) + 2;
const OX = -NHX * H, OY = 0, OZ = TIPZ - H;
const NXN = NX + 1, NYN = NYC + 1;
export const GRID = { NX, NYC, NZ, OX, OY, OZ, H };

const cellKey = (i, j, k) => i + NX * (j + NYC * k);
const nodeGid = (i, j, k) => i + NXN * (j + NYN * k);
const gidI = g => g % NXN;
const gidJ = g => Math.floor(g / NXN) % NYN;
const gidK = g => Math.floor(g / (NXN * NYN));

/* ---------------------------------------------------------------------
   Avståndsfunktioner
   --------------------------------------------------------------------- */
const SH = Math.sin(P.HALF), CH = Math.cos(P.HALF);
const DELTA = P.RR / SH;                       // spetsens förskjutning vid insättning
const RIN = P.R - P.RR - DELTA;                // insatt radie från insatt spets

function sdPie2(px, pz) {
    // tårtbit med spets i origo och symmetriaxel +z (Inigo Quilez sdPie)
    const qx = Math.abs(px), qz = pz;
    const l = Math.hypot(qx, qz) - RIN;
    let t = qx * SH + qz * CH;
    t = t < 0 ? 0 : (t > RIN ? RIN : t);
    const m = Math.hypot(qx - SH * t, qz - CH * t);
    const s = CH * qx - SH * qz;
    return Math.max(l, s > 0 ? m : -m);
}

export function sdShape(x, y, z) {
    const wx = sdPie2(x, z - TIPZ - DELTA);
    const wy = Math.abs(y - P.T / 2) - (P.T / 2 - P.RR);
    const ox = wx > 0 ? wx : 0, oy = wy > 0 ? wy : 0;
    return Math.min(Math.max(wx, wy), 0) + Math.hypot(ox, oy) - P.RR;
}

function smax(a, b, k) {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.max(a, b) + h * h * k * 0.25;
}

/* Kuhn-delning av kuben: hörn c har bitar x=1, y=2, z=4 */
const KUHN = [[0, 1, 3, 7], [0, 1, 5, 7], [0, 2, 3, 7], [0, 2, 6, 7], [0, 4, 5, 7], [0, 4, 6, 7]];
const CUBE_EDGES = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];

/* Frön: fasta positioner i viloläget (deterministiska). */
function makeSeeds() {
    let s = 7;
    const rnd = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    const out = [];
    const ring = (rf, n, spread) => {
        for (let q = 0; q < n; q++) {
            const a = (n === 1 ? 0 : (q / (n - 1) - 0.5) * 2) * P.HALF * spread + (rnd() - 0.5) * 0.08;
            const r = P.R * rf * (1 + (rnd() - 0.5) * 0.06);
            const x = Math.sin(a) * r, z = TIPZ + Math.cos(a) * r;
            const y = P.T * (0.42 + rnd() * 0.3);
            out.push({ c: [x, y, z], tilt: (rnd() - 0.5) * 0.7, roll: (rnd() - 0.5) * 0.5, size: 0.9 + rnd() * 0.25 });
        }
    };
    ring(0.40, 2, 0.55);
    ring(0.57, 4, 0.72);
    ring(0.73, 5, 0.78);
    return out;
}
export const SEEDS = makeSeeds();

/* =====================================================================
   Bit (Piece): en sammanhängande geléklump
   ===================================================================== */
export class Piece {
    /* spec: { keys: Int32Array (cellnycklar), gids: Int32Array (nodernas id),
               x, v: Float32Array (3n), cuts: [Float32Array(n)] } */
    constructor(world, spec) {
        this.world = world;
        const n = spec.gids.length;
        this.n = n;
        this.gids = spec.gids;
        this.x = spec.x;
        this.v = spec.v;
        this.prev = new Float32Array(3 * n);
        this.rest = new Float32Array(3 * n);
        this.cuts = spec.cuts;
        this.gidMap = new Map();
        for (let a = 0; a < n; a++) {
            const g = this.gids[a];
            this.gidMap.set(g, a);
            this.rest[3 * a] = OX + gidI(g) * H;
            this.rest[3 * a + 1] = OY + gidJ(g) * H;
            this.rest[3 * a + 2] = OZ + gidK(g) * H;
        }
        // celler
        const nc = spec.keys.length;
        this.nc = nc;
        this.keys = spec.keys;
        this.ci = new Int16Array(nc); this.cj = new Int16Array(nc); this.ck = new Int16Array(nc);
        this.cellNodes = new Int32Array(8 * nc);
        this.cellMap = new Map();
        for (let c = 0; c < nc; c++) {
            const key = spec.keys[c];
            const i = key % NX, j = Math.floor(key / NX) % NYC, k = Math.floor(key / (NX * NYC));
            this.ci[c] = i; this.cj[c] = j; this.ck[c] = k;
            this.cellMap.set(key, c);
            for (let b = 0; b < 8; b++) {
                const g = nodeGid(i + (b & 1), j + ((b >> 1) & 1), k + ((b >> 2) & 1));
                this.cellNodes[8 * c + b] = this.gidMap.get(g);
            }
        }
        this.computeFractions();
        this.buildConstraints();
        this.buildSurface();
        this.seeds = [];
    }

    /* ---------- fält i viloläget ---------- */
    trilin(arr, c, u, v, w) {
        const cn = this.cellNodes, o = 8 * c;
        const u0 = 1 - u, v0 = 1 - v, w0 = 1 - w;
        return arr[cn[o]] * u0 * v0 * w0 + arr[cn[o + 1]] * u * v0 * w0 +
            arr[cn[o + 2]] * u0 * v * w0 + arr[cn[o + 3]] * u * v * w0 +
            arr[cn[o + 4]] * u0 * v0 * w + arr[cn[o + 5]] * u * v0 * w +
            arr[cn[o + 6]] * u0 * v * w + arr[cn[o + 7]] * u * v * w;
    }
    fieldLocal(c, u, v, w) {
        const px = OX + (this.ci[c] + u) * H, py = OY + (this.cj[c] + v) * H, pz = OZ + (this.ck[c] + w) * H;
        let d = sdShape(px, py, pz);
        for (let q = 0; q < this.cuts.length; q++) d = smax(d, -this.trilin(this.cuts[q], c, u, v, w), P.KC);
        return d;
    }
    /* Hitta cell för en vilolägespunkt; faller tillbaka på närmaste granncell
       (då extrapoleras de lokala koordinaterna). Returnerar cellindex eller -1. */
    locate(px, py, pz, out) {
        const fx = (px - OX) / H, fy = (py - OY) / H, fz = (pz - OZ) / H;
        const i = Math.floor(fx), j = Math.floor(fy), k = Math.floor(fz);
        let best = -1, bd = Infinity;
        if (i >= 0 && i < NX && j >= 0 && j < NYC && k >= 0 && k < NZ) {
            const c = this.cellMap.get(cellKey(i, j, k));
            if (c !== undefined) best = c;
        }
        if (best < 0) {
            for (let dk = -1; dk <= 1; dk++) for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
                const a = i + di, b = j + dj, e = k + dk;
                if (a < 0 || a >= NX || b < 0 || b >= NYC || e < 0 || e >= NZ) continue;
                const c = this.cellMap.get(cellKey(a, b, e));
                if (c === undefined) continue;
                const ex = Math.max(a - fx, 0, fx - a - 1), ey = Math.max(b - fy, 0, fy - b - 1), ez = Math.max(e - fz, 0, fz - e - 1);
                const dd = ex * ex + ey * ey + ez * ez;
                if (dd < bd) { bd = dd; best = c; }
            }
        }
        if (best >= 0 && out) {
            out[0] = fx - this.ci[best]; out[1] = fy - this.cj[best]; out[2] = fz - this.ck[best];
        }
        return best;
    }
    fieldAt(px, py, pz) {
        const uvw = this._uvw || (this._uvw = new Float64Array(3));
        const c = this.locate(px, py, pz, uvw);
        if (c < 0) return H;
        return this.fieldLocal(c, uvw[0], uvw[1], uvw[2]);
    }

    computeFractions() {
        const nc = this.nc, M = 4;
        this.frac = new Float32Array(nc);
        let vol = 0;
        for (let c = 0; c < nc; c++) {
            let cnt = 0;
            for (let a = 0; a < M; a++) for (let b = 0; b < M; b++) for (let e = 0; e < M; e++)
                if (this.fieldLocal(c, (a + 0.5) / M, (b + 0.5) / M, (e + 0.5) / M) < 0) cnt++;
            this.frac[c] = cnt / (M * M * M);
            vol += this.frac[c] * H * H * H;
        }
        this.materialVolume = vol;
    }

    /* ---------- villkor och massor ---------- */
    buildConstraints() {
        const n = this.n, nc = this.nc, cn = this.cellNodes, r = this.rest;
        const edgeMap = new Map();
        const tets = [], tetFrac = [];
        const mass = new Float64Array(n);
        for (let c = 0; c < nc; c++) {
            const f = this.frac[c];
            for (const t of KUHN) {
                let ids = t.map(b => cn[8 * c + b]);
                let V = tetVol(r, ids[0], ids[1], ids[2], ids[3]);
                if (V < 0) { ids = [ids[0], ids[1], ids[3], ids[2]]; V = -V; }
                tets.push(ids[0], ids[1], ids[2], ids[3]);
                tetFrac.push(f);
                const m = P.RHO * V * f / 4;
                for (const id of ids) mass[id] += m;
                for (let p = 0; p < 4; p++) for (let q = p + 1; q < 4; q++) {
                    const a = Math.min(ids[p], ids[q]), b = Math.max(ids[p], ids[q]);
                    const key = a * n + b;
                    edgeMap.set(key, (edgeMap.get(key) || 0) + f);
                }
            }
        }
        const ne = edgeMap.size;
        this.edges = new Int32Array(2 * ne);
        this.edgeL = new Float32Array(ne);
        this.edgeK = new Float32Array(ne);        // styvhet per E (m): k = E · edgeK
        let q = 0;
        for (const [key, fs] of edgeMap) {
            const a = Math.floor(key / n), b = key - a * n;
            this.edges[2 * q] = a; this.edges[2 * q + 1] = b;
            this.edgeL[q] = Math.hypot(r[3 * b] - r[3 * a], r[3 * b + 1] - r[3 * a + 1], r[3 * b + 2] - r[3 * a + 2]);
            this.edgeK[q] = H * Math.max(fs, 0.03) * 0.5;
            q++;
        }
        this.tets = new Int32Array(tets);
        const nt = tets.length / 4;
        this.nt = nt;
        this.tetV0 = new Float32Array(nt);
        this.tetF = new Float32Array(tetFrac);
        for (let t = 0; t < nt; t++) this.tetV0[t] = tetVol(r, tets[4 * t], tets[4 * t + 1], tets[4 * t + 2], tets[4 * t + 3]);
        const mMin = P.RHO * H * H * H * 0.015;
        this.mass = new Float32Array(n);
        this.im = new Float32Array(n);
        for (let a = 0; a < n; a++) {
            this.mass[a] = Math.max(mass[a], mMin);
            this.im[a] = 1 / this.mass[a];
        }
        this.totalMass = 0;
        for (let a = 0; a < n; a++) this.totalMass += this.mass[a];
    }

    /* ---------- inbäddad yta (surface nets) ---------- */
    buildSurface() {
        const S = P.S, sub = H / S;
        let i0 = 1e9, j0 = 1e9, k0 = 1e9, i1 = -1e9, j1 = -1e9, k1 = -1e9;
        for (let c = 0; c < this.nc; c++) {
            i0 = Math.min(i0, this.ci[c]); i1 = Math.max(i1, this.ci[c]);
            j0 = Math.min(j0, this.cj[c]); j1 = Math.max(j1, this.cj[c]);
            k0 = Math.min(k0, this.ck[c]); k1 = Math.max(k1, this.ck[c]);
        }
        // en extra rad utanför på alla sidor så att ytan alltid sluts
        i0--; j0--; k0--; i1++; j1++; k1++;
        const SX = (i1 - i0 + 1) * S + 1, SY = (j1 - j0 + 1) * S + 1, SZ = (k1 - k0 + 1) * S + 1;
        const N = SX * SY * SZ;
        const val = new Float32Array(N).fill(H);
        const done = new Uint8Array(N);
        const ID = (a, b, e) => a + SX * (b + SY * e);
        for (let c = 0; c < this.nc; c++) {
            const bi = (this.ci[c] - i0) * S, bj = (this.cj[c] - j0) * S, bk = (this.ck[c] - k0) * S;
            const dc = this.fieldLocal(c, 0.5, 0.5, 0.5);
            const fast = Math.abs(dc) > 1.3 * H;
            for (let e = 0; e <= S; e++) for (let b = 0; b <= S; b++) for (let a = 0; a <= S; a++) {
                const id = ID(bi + a, bj + b, bk + e);
                if (done[id]) continue;
                done[id] = 1;
                val[id] = fast ? dc : this.fieldLocal(c, a / S, b / S, e / S);
            }
        }
        const CX = SX - 1, CY = SY - 1, CZ = SZ - 1;
        const vid = new Int32Array(CX * CY * CZ).fill(-1);
        const CID = (a, b, e) => a + CX * (b + CY * e);
        const pos = [];
        const cv = new Float32Array(8);
        const ox = OX + i0 * H, oy = OY + j0 * H, oz = OZ + k0 * H;
        const P3 = new Float64Array(3);
        for (let e = 0; e < CZ; e++) for (let b = 0; b < CY; b++) for (let a = 0; a < CX; a++) {
            let mask = 0;
            for (let q = 0; q < 8; q++) {
                const vv = val[ID(a + (q & 1), b + ((q >> 1) & 1), e + ((q >> 2) & 1))];
                cv[q] = vv;
                if (vv < 0) mask |= 1 << q;
            }
            if (mask === 0 || mask === 255) continue;
            let sx = 0, sy = 0, sz = 0, cnt = 0;
            for (const [p, q] of CUBE_EDGES) {
                const ip = (mask >> p) & 1, iq = (mask >> q) & 1;
                if (ip === iq) continue;
                const t = cv[p] / (cv[p] - cv[q]);
                sx += (p & 1) + t * ((q & 1) - (p & 1));
                sy += ((p >> 1) & 1) + t * (((q >> 1) & 1) - ((p >> 1) & 1));
                sz += ((p >> 2) & 1) + t * (((q >> 2) & 1) - ((p >> 2) & 1));
                cnt++;
            }
            P3[0] = ox + (a + sx / cnt) * sub;
            P3[1] = oy + (b + sy / cnt) * sub;
            P3[2] = oz + (e + sz / cnt) * sub;
            this.project(P3, sub);
            vid[CID(a, b, e)] = pos.length / 3;
            pos.push(P3[0], P3[1], P3[2]);
        }
        // fyrhörningar kring varje kant med teckenbyte
        const idx = [];
        const quad = (q0, q1, q2, q3, flip) => {
            if (q0 < 0 || q1 < 0 || q2 < 0 || q3 < 0) return;
            if (flip) { const t = q1; q1 = q3; q3 = t; }
            const d02 = dist2(pos, q0, q2), d13 = dist2(pos, q1, q3);
            if (d02 < d13) idx.push(q0, q1, q2, q0, q2, q3);
            else idx.push(q0, q1, q3, q1, q2, q3);
        };
        for (let e = 0; e < SZ; e++) for (let b = 0; b < SY; b++) for (let a = 0; a < SX; a++) {
            const in0 = val[ID(a, b, e)] < 0;
            if (a < SX - 1 && b >= 1 && b < SY - 1 && e >= 1 && e < SZ - 1) {
                const in1 = val[ID(a + 1, b, e)] < 0;
                if (in0 !== in1) quad(vid[CID(a, b - 1, e - 1)], vid[CID(a, b, e - 1)], vid[CID(a, b, e)], vid[CID(a, b - 1, e)], !in0);
            }
            if (b < SY - 1 && a >= 1 && a < SX - 1 && e >= 1 && e < SZ - 1) {
                const in1 = val[ID(a, b + 1, e)] < 0;
                if (in0 !== in1) quad(vid[CID(a - 1, b, e - 1)], vid[CID(a - 1, b, e)], vid[CID(a, b, e)], vid[CID(a, b, e - 1)], !in0);
            }
            if (e < SZ - 1 && a >= 1 && a < SX - 1 && b >= 1 && b < SY - 1) {
                const in1 = val[ID(a, b, e + 1)] < 0;
                if (in0 !== in1) quad(vid[CID(a - 1, b - 1, e)], vid[CID(a, b - 1, e)], vid[CID(a, b, e)], vid[CID(a - 1, b, e)], !in0);
            }
        }
        const nv = pos.length / 3;
        this.nv = nv;
        // Utjämning: varje punkt dras mot grannarnas medelpunkt och projiceras
        // tillbaka på ytan. Surface nets lägger annars punkterna ojämnt runt
        // de rundade kanterna, och då blir glanslinjen där sågtandad.
        {
            const acc = new Float64Array(3 * nv), cnt = new Float32Array(nv);
            for (let it = 0; it < 3; it++) {
                acc.fill(0); cnt.fill(0);
                for (let t = 0; t < idx.length; t += 3) {
                    for (let e = 0; e < 3; e++) {
                        const a = idx[t + e], b = idx[t + (e + 1) % 3];
                        acc[3 * a] += pos[3 * b]; acc[3 * a + 1] += pos[3 * b + 1]; acc[3 * a + 2] += pos[3 * b + 2]; cnt[a]++;
                        acc[3 * b] += pos[3 * a]; acc[3 * b + 1] += pos[3 * a + 1]; acc[3 * b + 2] += pos[3 * a + 2]; cnt[b]++;
                    }
                }
                for (let q = 0; q < nv; q++) {
                    if (!cnt[q]) continue;
                    P3[0] = 0.4 * pos[3 * q] + 0.6 * acc[3 * q] / cnt[q];
                    P3[1] = 0.4 * pos[3 * q + 1] + 0.6 * acc[3 * q + 1] / cnt[q];
                    P3[2] = 0.4 * pos[3 * q + 2] + 0.6 * acc[3 * q + 2] / cnt[q];
                    this.project(P3, sub);
                    pos[3 * q] = P3[0]; pos[3 * q + 1] = P3[1]; pos[3 * q + 2] = P3[2];
                }
            }
        }
        this.surfRest = new Float32Array(pos);
        this.surfIdx = new Uint32Array(idx);
        this.surfPos = new Float32Array(3 * nv);
        this.surfNrm = new Float32Array(3 * nv);
        const emb = this.embed(this.surfRest, -1);
        this.surfNodes = emb.nodes; this.surfW = emb.w;
        // vilolägets normaler ur avståndsfunktionens gradient (exakta, ingen brusig
        // triangelmedelvärdesbildning). I varje bildruta vrids de med den lokala
        // deformationen: n = cof(F) · n0.
        this.surfN0 = new Float32Array(3 * nv);
        const ge = sub * 0.3;
        for (let q = 0; q < nv; q++) {
            const x0 = this.surfRest[3 * q], y0 = this.surfRest[3 * q + 1], z0 = this.surfRest[3 * q + 2];
            const gx = this.fieldAt(x0 + ge, y0, z0) - this.fieldAt(x0 - ge, y0, z0);
            const gy = this.fieldAt(x0, y0 + ge, z0) - this.fieldAt(x0, y0 - ge, z0);
            const gz = this.fieldAt(x0, y0, z0 + ge) - this.fieldAt(x0, y0, z0 - ge);
            const l = Math.hypot(gx, gy, gz) || 1;
            this.surfN0[3 * q] = gx / l; this.surfN0[3 * q + 1] = gy / l; this.surfN0[3 * q + 2] = gz / l;
        }
        this.surfM = new Float32Array(9 * nv);     // cof(F) per ytpunkt, till shadern
        this.nodeCof = new Float32Array(9 * this.n);
        this.contactDn = new Float32Array(this.n);
        this.nodeCnt = new Float32Array(this.n);
        // kollisionspunkter: en ytpunkt per ruta med sidan H/2 (i viloläget)
        const buckets = new Map(), cs = H * 0.5;
        for (let q = 0; q < nv; q++) {
            const key = Math.floor(this.surfRest[3 * q] / cs) + 1000 * (Math.floor(this.surfRest[3 * q + 1] / cs) + 1000 * Math.floor(this.surfRest[3 * q + 2] / cs));
            if (!buckets.has(key)) buckets.set(key, q);
        }
        this.colIdx = new Int32Array([...buckets.values()]);
        this.colPos = new Float32Array(3 * this.colIdx.length);
        this.colPrev = new Float32Array(3 * this.colIdx.length);
    }

    /* Newtonsteg mot nivåytan d = 0 */
    project(p, maxStep) {
        const eps = maxStep * 0.25;
        for (let it = 0; it < 3; it++) {
            const d = this.fieldAt(p[0], p[1], p[2]);
            if (Math.abs(d) < 1e-6) break;
            const gx = (this.fieldAt(p[0] + eps, p[1], p[2]) - this.fieldAt(p[0] - eps, p[1], p[2])) / (2 * eps);
            const gy = (this.fieldAt(p[0], p[1] + eps, p[2]) - this.fieldAt(p[0], p[1] - eps, p[2])) / (2 * eps);
            const gz = (this.fieldAt(p[0], p[1], p[2] + eps) - this.fieldAt(p[0], p[1], p[2] - eps)) / (2 * eps);
            const g2 = gx * gx + gy * gy + gz * gz;
            if (g2 < 1e-8) break;
            let s = d / g2;
            const len = Math.abs(s) * Math.sqrt(g2);
            if (len > maxStep) s *= maxStep / len;
            p[0] -= s * gx; p[1] -= s * gy; p[2] -= s * gz;
        }
    }

    /* Bädda in vilolägespunkter: 8 noder + 8 vikter per punkt.
       forceCell >= 0: använd den cellen för alla punkter (extrapolera). */
    embed(restPts, forceCell) {
        const m = restPts.length / 3;
        const nodes = new Int32Array(8 * m), w = new Float32Array(8 * m);
        const uvw = new Float64Array(3);
        for (let q = 0; q < m; q++) {
            const px = restPts[3 * q], py = restPts[3 * q + 1], pz = restPts[3 * q + 2];
            let c;
            if (forceCell >= 0) {
                c = forceCell;
                uvw[0] = (px - OX) / H - this.ci[c]; uvw[1] = (py - OY) / H - this.cj[c]; uvw[2] = (pz - OZ) / H - this.ck[c];
            } else {
                c = this.locate(px, py, pz, uvw);
                if (c < 0) c = 0;
            }
            const u = uvw[0], v = uvw[1], ww = uvw[2];
            for (let b = 0; b < 8; b++) {
                nodes[8 * q + b] = this.cellNodes[8 * c + b];
                w[8 * q + b] = ((b & 1) ? u : 1 - u) * ((b & 2) ? v : 1 - v) * ((b & 4) ? ww : 1 - ww);
            }
        }
        return { nodes, w };
    }

    /* Deformerade positioner för inbäddade punkter */
    deform(nodes, w, out, count) {
        const x = this.x;
        for (let q = 0; q < count; q++) {
            let sx = 0, sy = 0, sz = 0;
            const o = 8 * q;
            for (let b = 0; b < 8; b++) {
                const nd = 3 * nodes[o + b], ww = w[o + b];
                sx += ww * x[nd]; sy += ww * x[nd + 1]; sz += ww * x[nd + 2];
            }
            out[3 * q] = sx; out[3 * q + 1] = sy; out[3 * q + 2] = sz;
        }
    }

    updateSurface() {
        this.deform(this.surfNodes, this.surfW, this.surfPos, this.nv);
        // kofaktormatrisen cof(F) i varje cells mitt, medelvärdesbildad till noderna
        const x = this.x, cn = this.cellNodes, C = this.nodeCof, cnt = this.nodeCnt;
        C.fill(0); cnt.fill(0);
        for (let c = 0; c < this.nc; c++) {
            const o = 8 * c;
            // F:s kolonner (utan faktorn 1/4H, som försvinner vid normering)
            let ax = 0, ay = 0, az = 0, bx = 0, by = 0, bz = 0, qx = 0, qy = 0, qz = 0;
            for (let b = 0; b < 8; b++) {
                const nd = 3 * cn[o + b];
                const X = x[nd], Y = x[nd + 1], Z = x[nd + 2];
                const su = (b & 1) ? 1 : -1, sv = (b & 2) ? 1 : -1, sw = (b & 4) ? 1 : -1;
                ax += su * X; ay += su * Y; az += su * Z;
                bx += sv * X; by += sv * Y; bz += sv * Z;
                qx += sw * X; qy += sw * Y; qz += sw * Z;
            }
            // cof(F) = [b×c, c×a, a×b]
            const c0x = by * qz - bz * qy, c0y = bz * qx - bx * qz, c0z = bx * qy - by * qx;
            const c1x = qy * az - qz * ay, c1y = qz * ax - qx * az, c1z = qx * ay - qy * ax;
            const c2x = ay * bz - az * by, c2y = az * bx - ax * bz, c2z = ax * by - ay * bx;
            for (let b = 0; b < 8; b++) {
                const nd = cn[o + b], k = 9 * nd;
                C[k] += c0x; C[k + 1] += c0y; C[k + 2] += c0z;
                C[k + 3] += c1x; C[k + 4] += c1y; C[k + 5] += c1z;
                C[k + 6] += c2x; C[k + 7] += c2y; C[k + 8] += c2z;
                cnt[nd] += 1;
            }
        }
        const nodes = this.surfNodes, W8 = this.surfW, n0 = this.surfN0, nrm = this.surfNrm, SM = this.surfM;
        for (let q = 0; q < this.nv; q++) {
            const o = 8 * q;
            let m0 = 0, m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0;
            for (let b = 0; b < 8; b++) {
                const nd = nodes[o + b], w = W8[o + b] / cnt[nd], k = 9 * nd;
                m0 += w * C[k]; m1 += w * C[k + 1]; m2 += w * C[k + 2];
                m3 += w * C[k + 3]; m4 += w * C[k + 4]; m5 += w * C[k + 5];
                m6 += w * C[k + 6]; m7 += w * C[k + 7]; m8 += w * C[k + 8];
            }
            const f = 1 / (Math.sqrt(m0 * m0 + m1 * m1 + m2 * m2 + m3 * m3 + m4 * m4 + m5 * m5 + m6 * m6 + m7 * m7 + m8 * m8) || 1);
            const k = 9 * q;
            SM[k] = m0 * f; SM[k + 1] = m1 * f; SM[k + 2] = m2 * f; SM[k + 3] = m3 * f; SM[k + 4] = m4 * f;
            SM[k + 5] = m5 * f; SM[k + 6] = m6 * f; SM[k + 7] = m7 * f; SM[k + 8] = m8 * f;
            const mx = n0[3 * q], my = n0[3 * q + 1], mz = n0[3 * q + 2];
            const sx = m0 * mx + m3 * my + m6 * mz, sy = m1 * mx + m4 * my + m7 * mz, sz = m2 * mx + m5 * my + m8 * mz;
            const l = Math.hypot(sx, sy, sz) || 1;
            nrm[3 * q] = sx / l; nrm[3 * q + 1] = sy / l; nrm[3 * q + 2] = sz / l;
        }
    }

    /* ---------- dynamik ---------- */
    integrate(h, g) {
        const x = this.x, v = this.v, pr = this.prev;
        for (let a = 0; a < this.n; a++) {
            const o = 3 * a;
            v[o + 1] -= g * h;
            pr[o] = x[o]; pr[o + 1] = x[o + 1]; pr[o + 2] = x[o + 2];
            x[o] += v[o] * h; x[o + 1] += v[o + 1] * h; x[o + 2] += v[o + 2] * h;
        }
    }

    solve(h, E) {
        const x = this.x, im = this.im, ed = this.edges, L = this.edgeL, K = this.edgeK;
        const h2 = h * h;
        for (let e = 0; e < L.length; e++) {
            const ia = ed[2 * e], ja = ed[2 * e + 1];
            const i = 3 * ia, j = 3 * ja;
            const wi = im[ia], wj = im[ja];
            const dx = x[j] - x[i], dy = x[j + 1] - x[i + 1], dz = x[j + 2] - x[i + 2];
            const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (len < 1e-9) continue;
            const C = len - L[e];
            const alpha = 1 / (E * K[e] * h2);
            const dl = -C / (wi + wj + alpha) / len;
            x[i] -= wi * dl * dx; x[i + 1] -= wi * dl * dy; x[i + 2] -= wi * dl * dz;
            x[j] += wj * dl * dx; x[j + 1] += wj * dl * dy; x[j + 2] += wj * dl * dz;
        }
        const T4 = this.tets, V0 = this.tetV0, TF = this.tetF;
        const Kb = 25 * E;
        for (let t = 0; t < this.nt; t++) {
            const i0 = T4[4 * t], i1 = T4[4 * t + 1], i2 = T4[4 * t + 2], i3 = T4[4 * t + 3];
            const a = 3 * i0, b = 3 * i1, c = 3 * i2, d = 3 * i3;
            const e1x = x[b] - x[a], e1y = x[b + 1] - x[a + 1], e1z = x[b + 2] - x[a + 2];
            const e2x = x[c] - x[a], e2y = x[c + 1] - x[a + 1], e2z = x[c + 2] - x[a + 2];
            const e3x = x[d] - x[a], e3y = x[d + 1] - x[a + 1], e3z = x[d + 2] - x[a + 2];
            // ∂V/∂x1 = (e2 × e3)/6, ∂V/∂x2 = (e3 × e1)/6, ∂V/∂x3 = (e1 × e2)/6
            const g1x = (e2y * e3z - e2z * e3y) / 6, g1y = (e2z * e3x - e2x * e3z) / 6, g1z = (e2x * e3y - e2y * e3x) / 6;
            const g2x = (e3y * e1z - e3z * e1y) / 6, g2y = (e3z * e1x - e3x * e1z) / 6, g2z = (e3x * e1y - e3y * e1x) / 6;
            const g3x = (e1y * e2z - e1z * e2y) / 6, g3y = (e1z * e2x - e1x * e2z) / 6, g3z = (e1x * e2y - e1y * e2x) / 6;
            const g0x = -g1x - g2x - g3x, g0y = -g1y - g2y - g3y, g0z = -g1z - g2z - g3z;
            const V = e1x * g1x + e1y * g1y + e1z * g1z;
            const C = V - V0[t];
            const w0 = im[i0], w1 = im[i1], w2 = im[i2], w3 = im[i3];
            const W = w0 * (g0x * g0x + g0y * g0y + g0z * g0z) + w1 * (g1x * g1x + g1y * g1y + g1z * g1z) +
                w2 * (g2x * g2x + g2y * g2y + g2z * g2z) + w3 * (g3x * g3x + g3y * g3y + g3z * g3z);
            const alpha = V0[t] / (Kb * Math.max(TF[t], 0.03) * h2);
            const dl = -C / (W + alpha);
            x[a] += dl * w0 * g0x; x[a + 1] += dl * w0 * g0y; x[a + 2] += dl * w0 * g0z;
            x[b] += dl * w1 * g1x; x[b + 1] += dl * w1 * g1y; x[b + 2] += dl * w1 * g1z;
            x[c] += dl * w2 * g2x; x[c + 1] += dl * w2 * g2y; x[c + 2] += dl * w2 * g2z;
            x[d] += dl * w3 * g3x; x[d + 1] += dl * w3 * g3y; x[d + 2] += dl * w3 * g3z;
        }
    }

    /* Bordet (y = 0): villkor på ytans inbäddade punkter. Friktionen läggs
       på i efterhand, på hastighetsnivå (friction()), så att den bara kan
       bromsa: en positionsbaserad friktion tillförde energi och fick skivan
       att vibrera eller explodera vid högt friktionstal. */
    floor() {
        const x = this.x, im = this.im, dn = this.contactDn;
        const nodes = this.surfNodes, W8 = this.surfW, ci = this.colIdx;
        for (let q = 0; q < ci.length; q++) {
            const o = 8 * ci[q];
            let py = 0;
            for (let b = 0; b < 8; b++) py += W8[o + b] * x[3 * nodes[o + b] + 1];
            if (py >= 0) continue;
            let Wsum = 0;
            for (let b = 0; b < 8; b++) { const w = W8[o + b]; Wsum += w * w * im[nodes[o + b]]; }
            if (Wsum < 1e-12) continue;
            const dl = -py / Wsum;
            for (let b = 0; b < 8; b++) {
                const nd = nodes[o + b], d = W8[o + b] * im[nd] * dl;
                x[3 * nd + 1] += d;
                if (d > 0) dn[nd] += d;
            }
        }
    }

    /* Coulombfriktion: den vågräta hastigheten minskas med högst μ·Δv_n,
       där Δv_n är den hastighet bordet gav noden uppåt under delsteget. */
    friction(h, mu) {
        const v = this.v, dn = this.contactDn;
        for (let a = 0; a < this.n; a++) {
            if (dn[a] <= 0) continue;
            const o = 3 * a;
            const vx = v[o], vz = v[o + 2];
            const vt = Math.hypot(vx, vz);
            if (vt > 0) {
                const f = Math.max(0, 1 - mu * dn[a] / h / vt);
                v[o] = vx * f; v[o + 2] = vz * f;
            }
            dn[a] = 0;
        }
    }

    updateVelocities(h) {
        const x = this.x, v = this.v, pr = this.prev, ih = 1 / h;
        for (let o = 0; o < 3 * this.n; o++) v[o] = (x[o] - pr[o]) * ih;
    }

    /* Inre dämpning: dra partiklarnas hastighet mot stelkroppsrörelsen */
    damp(h, c) {
        const n = this.n, x = this.x, v = this.v, m = this.mass;
        let M = 0, cx = 0, cy = 0, cz = 0, vx = 0, vy = 0, vz = 0;
        for (let a = 0; a < n; a++) {
            const o = 3 * a, ma = m[a];
            M += ma; cx += ma * x[o]; cy += ma * x[o + 1]; cz += ma * x[o + 2];
            vx += ma * v[o]; vy += ma * v[o + 1]; vz += ma * v[o + 2];
        }
        cx /= M; cy /= M; cz /= M; vx /= M; vy /= M; vz /= M;
        let Lx = 0, Ly = 0, Lz = 0;
        let Ixx = 0, Iyy = 0, Izz = 0, Ixy = 0, Ixz = 0, Iyz = 0;
        for (let a = 0; a < n; a++) {
            const o = 3 * a, ma = m[a];
            const rx = x[o] - cx, ry = x[o + 1] - cy, rz = x[o + 2] - cz;
            const ux = v[o], uy = v[o + 1], uz = v[o + 2];
            Lx += ma * (ry * uz - rz * uy); Ly += ma * (rz * ux - rx * uz); Lz += ma * (rx * uy - ry * ux);
            Ixx += ma * (ry * ry + rz * rz); Iyy += ma * (rx * rx + rz * rz); Izz += ma * (rx * rx + ry * ry);
            Ixy -= ma * rx * ry; Ixz -= ma * rx * rz; Iyz -= ma * ry * rz;
        }
        const w = solve3(Ixx, Ixy, Ixz, Ixy, Iyy, Iyz, Ixz, Iyz, Izz, Lx, Ly, Lz);
        const f = 1 - Math.exp(-c * h);
        for (let a = 0; a < n; a++) {
            const o = 3 * a;
            const rx = x[o] - cx, ry = x[o + 1] - cy, rz = x[o + 2] - cz;
            const tx = vx + w[1] * rz - w[2] * ry, ty = vy + w[2] * rx - w[0] * rz, tz = vz + w[0] * ry - w[1] * rx;
            v[o] += f * (tx - v[o]); v[o + 1] += f * (ty - v[o + 1]); v[o + 2] += f * (tz - v[o + 2]);
        }
        this.com = [cx, cy, cz];
    }

    kinetic() {
        let e = 0;
        for (let a = 0; a < this.n; a++) {
            const o = 3 * a;
            e += 0.5 * this.mass[a] * (this.v[o] ** 2 + this.v[o + 1] ** 2 + this.v[o + 2] ** 2);
        }
        return e;
    }
    volumeRatio() {
        let v = 0, v0 = 0;
        const x = this.x, T4 = this.tets;
        for (let t = 0; t < this.nt; t++) {
            v += tetVol(x, T4[4 * t], T4[4 * t + 1], T4[4 * t + 2], T4[4 * t + 3]) * this.tetF[t];
            v0 += this.tetV0[t] * this.tetF[t];
        }
        return [v, v0];
    }
}

function tetVol(x, i0, i1, i2, i3) {
    const a = 3 * i0, b = 3 * i1, c = 3 * i2, d = 3 * i3;
    const e1x = x[b] - x[a], e1y = x[b + 1] - x[a + 1], e1z = x[b + 2] - x[a + 2];
    const e2x = x[c] - x[a], e2y = x[c + 1] - x[a + 1], e2z = x[c + 2] - x[a + 2];
    const e3x = x[d] - x[a], e3y = x[d + 1] - x[a + 1], e3z = x[d + 2] - x[a + 2];
    return (e1x * (e2y * e3z - e2z * e3y) + e1y * (e2z * e3x - e2x * e3z) + e1z * (e2x * e3y - e2y * e3x)) / 6;
}
function dist2(p, a, b) {
    return (p[3 * a] - p[3 * b]) ** 2 + (p[3 * a + 1] - p[3 * b + 1]) ** 2 + (p[3 * a + 2] - p[3 * b + 2]) ** 2;
}
function solve3(a, b, c, d, e, f, g, h, i, x, y, z) {
    const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
    const det = a * A + b * B + c * C;
    if (Math.abs(det) < 1e-18) return [0, 0, 0];
    const inv = 1 / det;
    return [
        (A * x + (c * h - b * i) * y + (b * f - c * e) * z) * inv,
        (B * x + (a * i - c * g) * y + (c * d - a * f) * z) * inv,
        (C * x + (b * g - a * h) * y + (a * e - b * d) * z) * inv,
    ];
}

/* =====================================================================
   Värld: alla bitar, greppet, knivens tryck och snitten
   ===================================================================== */
export class World {
    constructor() {
        this.E = 3500;           // elasticitetsmodul (Pa)
        this.damping = 7;        // inre dämpning (1/s)
        this.mu = 0.8;           // friktionstal mot bordet
        this.substepDt = 1 / 600;
        this.pieces = [];
        this.grab = null;
        this.blade = null;
        this.onChange = null;
        this._epi = 0;
        this.reset();
    }

    reset(yaw = -0.42, lift = 0.012) {
        const keys = [];
        const M = 4;
        for (let k = 0; k < NZ; k++) for (let j = 0; j < NYC; j++) for (let i = 0; i < NX; i++) {
            let inside = false;
            for (let a = 0; a < M && !inside; a++) for (let b = 0; b < M && !inside; b++) for (let e = 0; e < M && !inside; e++)
                if (sdShape(OX + (i + (a + 0.5) / M) * H, OY + (j + (b + 0.5) / M) * H, OZ + (k + (e + 0.5) / M) * H) < 0) inside = true;
            if (inside) keys.push(cellKey(i, j, k));
        }
        const gset = new Set();
        for (const key of keys) {
            const i = key % NX, j = Math.floor(key / NX) % NYC, k = Math.floor(key / (NX * NYC));
            for (let b = 0; b < 8; b++) gset.add(nodeGid(i + (b & 1), j + ((b >> 1) & 1), k + ((b >> 2) & 1)));
        }
        const gids = Int32Array.from([...gset].sort((a, b) => a - b));
        const n = gids.length;
        const x = new Float32Array(3 * n), v = new Float32Array(3 * n);
        const cy = Math.cos(yaw), sy = Math.sin(yaw);
        for (let a = 0; a < n; a++) {
            const g = gids[a];
            const rx = OX + gidI(g) * H, ry = OY + gidJ(g) * H, rz = OZ + gidK(g) * H;
            x[3 * a] = cy * rx + sy * rz;
            x[3 * a + 1] = ry + lift;
            x[3 * a + 2] = -sy * rx + cy * rz;
        }
        const p = new Piece(this, { keys: Int32Array.from(keys), gids, x, v, cuts: [] });
        p.seeds = SEEDS.map((_, q) => q);
        this.pieces = [p];
        this.grab = null;
        this.blade = null;
        this.restMass = p.materialVolume * P.RHO;
        if (this.onChange) this.onChange();
    }

    step(dt) {
        const nsub = Math.max(4, Math.min(24, Math.ceil(dt / this.substepDt)));
        const h = dt / nsub;
        for (let s = 0; s < nsub; s++) {
            for (const p of this.pieces) p.integrate(h, P.G);
            if (this.grab) this.applyGrab();
            if (this.blade && this.blade.press) this.applyBlade();
            for (const p of this.pieces) {
                p.solve(h, this.E);
                p.floor();
            }
            if (this.pieces.length > 1) this.collidePieces();
            for (const p of this.pieces) {
                p.updateVelocities(h);
                p.friction(h, this.mu);
                p.damp(h, this.damping);
            }
        }
    }

    /* ---------- kollision mellan bitar (ytpunkt mot ytpunkt) ---------- */
    collidePieces() {
        const cs = H * 0.5, rc = 0.0022, reach = cs * 1.15;
        const np = this.pieces.length;
        // 1) ytpunkternas lägen och bitarnas omslutande lådor
        const box = this._box && this._box.length >= 6 * np ? this._box : (this._box = new Float64Array(6 * np + 24));
        for (let pi = 0; pi < np; pi++) {
            const p = this.pieces[pi];
            const ci = p.colIdx, cp = p.colPos, nodes = p.surfNodes, W8 = p.surfW, x = p.x;
            let x0 = 1e9, y0 = 1e9, z0 = 1e9, x1 = -1e9, y1 = -1e9, z1 = -1e9;
            for (let q = 0; q < ci.length; q++) {
                const o = 8 * ci[q];
                let sx = 0, sy = 0, sz = 0;
                for (let b = 0; b < 8; b++) {
                    const nd = 3 * nodes[o + b], w = W8[o + b];
                    sx += w * x[nd]; sy += w * x[nd + 1]; sz += w * x[nd + 2];
                }
                cp[3 * q] = sx; cp[3 * q + 1] = sy; cp[3 * q + 2] = sz;
                if (sx < x0) x0 = sx; if (sx > x1) x1 = sx;
                if (sy < y0) y0 = sy; if (sy > y1) y1 = sy;
                if (sz < z0) z0 = sz; if (sz > z1) z1 = sz;
            }
            box[6 * pi] = x0; box[6 * pi + 1] = y0; box[6 * pi + 2] = z0;
            box[6 * pi + 3] = x1; box[6 * pi + 4] = y1; box[6 * pi + 5] = z1;
        }
        // 2) bara par vars lådor överlappar, och bara punkter i överlappet
        for (let pi = 0; pi < np; pi++) for (let pj = pi + 1; pj < np; pj++) {
            const ox0 = Math.max(box[6 * pi], box[6 * pj]) - reach, ox1 = Math.min(box[6 * pi + 3], box[6 * pj + 3]) + reach;
            const oy0 = Math.max(box[6 * pi + 1], box[6 * pj + 1]) - reach, oy1 = Math.min(box[6 * pi + 4], box[6 * pj + 4]) + reach;
            const oz0 = Math.max(box[6 * pi + 2], box[6 * pj + 2]) - reach, oz1 = Math.min(box[6 * pi + 5], box[6 * pj + 5]) + reach;
            if (ox0 > ox1 || oy0 > oy1 || oz0 > oz1) continue;
            this.collidePair(this.pieces[pi], this.pieces[pj], ox0, oy0, oz0, ox1, oy1, oz1, cs, rc, reach);
        }
    }

    collidePair(A, B, ox0, oy0, oz0, ox1, oy1, oz1, cs, rc, reach) {
        // B:s punkter i överlappet sorteras i ett rutnät (räknesortering i typade arrayer)
        let cell = reach;
        let gx = Math.ceil((ox1 - ox0) / cell) + 1, gy = Math.ceil((oy1 - oy0) / cell) + 1, gz = Math.ceil((oz1 - oz0) / cell) + 1;
        while (gx * gy * gz > 60000) { cell *= 1.5; gx = Math.ceil((ox1 - ox0) / cell) + 1; gy = Math.ceil((oy1 - oy0) / cell) + 1; gz = Math.ceil((oz1 - oz0) / cell) + 1; }
        const ncell = gx * gy * gz;
        if (!this._gStart || this._gStart.length < ncell + 1) this._gStart = new Int32Array(ncell + 1 + 1024);
        const start = this._gStart;
        start.fill(0, 0, ncell + 1);
        const mB = B.colIdx.length, bp = B.colPos;
        if (!this._gCell || this._gCell.length < mB) { this._gCell = new Int32Array(mB + 512); this._gItem = new Int32Array(mB + 512); }
        const cellOf = this._gCell, item = this._gItem;
        for (let r = 0; r < mB; r++) {
            const x = bp[3 * r], y = bp[3 * r + 1], z = bp[3 * r + 2];
            if (x < ox0 || x > ox1 || y < oy0 || y > oy1 || z < oz0 || z > oz1) { cellOf[r] = -1; continue; }
            const c = Math.floor((x - ox0) / cell) + gx * (Math.floor((y - oy0) / cell) + gy * Math.floor((z - oz0) / cell));
            cellOf[r] = c; start[c + 1]++;
        }
        for (let c = 0; c < ncell; c++) start[c + 1] += start[c];
        const fillp = this._gFill && this._gFill.length >= ncell ? this._gFill : (this._gFill = new Int32Array(ncell + 1024));
        fillp.set(start.subarray(0, ncell));
        for (let r = 0; r < mB; r++) if (cellOf[r] >= 0) item[fillp[cellOf[r]]++] = r;
        const ap = A.colPos, reach2 = reach * reach, cs2 = cs * cs;
        for (let q = 0; q < A.colIdx.length; q++) {
            const ax = ap[3 * q], ay = ap[3 * q + 1], az = ap[3 * q + 2];
            if (ax < ox0 || ax > ox1 || ay < oy0 || ay > oy1 || az < oz0 || az > oz1) continue;
            const ix = Math.floor((ax - ox0) / cell), iy = Math.floor((ay - oy0) / cell), iz = Math.floor((az - oz0) / cell);
            for (let dz = -1; dz <= 1; dz++) {
                const cz = iz + dz; if (cz < 0 || cz >= gz) continue;
                for (let dy = -1; dy <= 1; dy++) {
                    const cy = iy + dy; if (cy < 0 || cy >= gy) continue;
                    for (let dx = -1; dx <= 1; dx++) {
                        const cx = ix + dx; if (cx < 0 || cx >= gx) continue;
                        const c = cx + gx * (cy + gy * cz);
                        for (let k = start[c]; k < start[c + 1]; k++) {
                            const r = item[k];
                            // snabbtest med lägena från delstegets början
                            const ex = ax - bp[3 * r], ey = ay - bp[3 * r + 1], ez = az - bp[3 * r + 2];
                            if (ex * ex + ey * ey + ez * ez > reach2) continue;
                            const va = 3 * A.colIdx[q], vb = 3 * B.colIdx[r];
                            let nx = B.surfNrm[vb] - A.surfNrm[va], ny = B.surfNrm[vb + 1] - A.surfNrm[va + 1], nz = B.surfNrm[vb + 2] - A.surfNrm[va + 2];
                            const nl = Math.hypot(nx, ny, nz);
                            if (nl < 0.5) continue;               // normalerna pekar inte mot varandra
                            nx /= nl; ny /= nl; nz /= nl;
                            // aktuella lägen (Gauss–Seidel): annars knuffar alla punkter
                            // som delar en nod den samtidigt och korrektionen skjuter över
                            const pa = this.embeddedPos(A, A.colIdx[q]), pb = this.embeddedPos(B, B.colIdx[r]);
                            const ddx = pa[0] - pb[0], ddy = pa[1] - pb[1], ddz = pa[2] - pb[2];
                            const d2 = ddx * ddx + ddy * ddy + ddz * ddz;
                            const sep = ddx * nx + ddy * ny + ddz * nz;
                            if (sep >= rc) continue;
                            if (d2 - sep * sep > cs2) continue;
                            const pen = rc - sep;
                            this.pushEmbedded(A, A.colIdx[q], nx, ny, nz, pen * 0.5);
                            this.pushEmbedded(B, B.colIdx[r], -nx, -ny, -nz, pen * 0.5);
                        }
                    }
                }
            }
        }
    }
    embeddedPos(p, vi) {
        const o = 8 * vi, nodes = p.surfNodes, W8 = p.surfW, x = p.x, out = this._ep || (this._ep = [new Float64Array(3), new Float64Array(3)]);
        const r = out[this._epi = (this._epi ^ 1)];
        let sx = 0, sy = 0, sz = 0;
        for (let b = 0; b < 8; b++) {
            const nd = 3 * nodes[o + b], w = W8[o + b];
            sx += w * x[nd]; sy += w * x[nd + 1]; sz += w * x[nd + 2];
        }
        r[0] = sx; r[1] = sy; r[2] = sz;
        return r;
    }
    pushEmbedded(p, vi, nx, ny, nz, amount) {
        const o = 8 * vi, nodes = p.surfNodes, W8 = p.surfW, im = p.im, x = p.x;
        let Ws = 0;
        for (let b = 0; b < 8; b++) Ws += W8[o + b] * W8[o + b] * im[nodes[o + b]];
        if (Ws < 1e-12) return;
        // fördela som ett positionsvillkor; delat med vikten så att punkten flyttas 'amount'
        const s = amount / Ws;
        for (let b = 0; b < 8; b++) {
            const nd = nodes[o + b], w = W8[o + b] * im[nd] * s;
            x[3 * nd] += w * nx; x[3 * nd + 1] += w * ny; x[3 * nd + 2] += w * nz;
        }
    }

    /* ---------- greppet (handen) ---------- */
    startGrab(piece, restPoint, worldPoint, radius = 0.028) {
        const idx = [], wts = [];
        for (let a = 0; a < piece.n; a++) {
            const d = Math.hypot(piece.rest[3 * a] - restPoint[0], piece.rest[3 * a + 1] - restPoint[1], piece.rest[3 * a + 2] - restPoint[2]);
            if (d < radius) { const t = 1 - (d / radius) ** 2; idx.push(a); wts.push(t * t); }
        }
        if (!idx.length) return false;
        const g0 = new Float32Array(3 * idx.length);
        idx.forEach((a, q) => { g0[3 * q] = piece.x[3 * a]; g0[3 * q + 1] = piece.x[3 * a + 1]; g0[3 * q + 2] = piece.x[3 * a + 2]; });
        this.grab = {
            piece, idx: Int32Array.from(idx), w: Float32Array.from(wts), g0,
            P0: worldPoint.slice(), target: worldPoint.slice(), angle: 0, axis: [0, 1, 0],
        };
        return true;
    }
    moveGrab(target, angle, axis) {
        if (!this.grab) return;
        this.grab.target = target.slice();
        if (angle !== undefined) this.grab.angle = angle;
        if (axis) this.grab.axis = axis.slice();
    }
    endGrab() { this.grab = null; }
    applyGrab() {
        const g = this.grab, p = g.piece, x = p.x;
        if (!this.pieces.includes(p)) { this.grab = null; return; }
        const [kx, ky, kz] = g.axis, c = Math.cos(g.angle), s = Math.sin(g.angle), t = 1 - c;
        for (let q = 0; q < g.idx.length; q++) {
            const a = 3 * g.idx[q];
            const rx = g.g0[3 * q] - g.P0[0], ry = g.g0[3 * q + 1] - g.P0[1], rz = g.g0[3 * q + 2] - g.P0[2];
            // Rodrigues rotation
            const dot = kx * rx + ky * ry + kz * rz;
            const cx = ky * rz - kz * ry, cy = kz * rx - kx * rz, cz = kx * ry - ky * rx;
            let tx = g.target[0] + rx * c + cx * s + kx * dot * t;
            let ty = g.target[1] + ry * c + cy * s + ky * dot * t;
            let tz = g.target[2] + rz * c + cz * s + kz * dot * t;
            if (ty < 0.0005) ty = 0.0005;
            const k = Math.min(1, g.w[q] * 0.5);
            x[a] += (tx - x[a]) * k; x[a + 1] += (ty - x[a + 1]) * k; x[a + 2] += (tz - x[a + 2]) * k;
        }
    }

    /* ---------- knivens tryck innan den skär igenom ---------- */
    setBlade(b) { this.blade = b; }
    applyBlade() {
        const b = this.blade;
        const [nx, , nz] = b.n;
        const ux = b.bx - b.ax, uz = b.bz - b.az, L = Math.hypot(ux, uz) || 1;
        for (const p of this.pieces) {
            const x = p.x;
            for (let a = 0; a < p.n; a++) {
                const o = 3 * a;
                const psi = nx * x[o] + nz * x[o + 2] - b.d;
                if (Math.abs(psi) > b.slab) continue;
                const s = ((x[o] - b.ax) * ux + (x[o + 2] - b.az) * uz) / L;
                if (s < -0.01 || s > L + 0.01) continue;
                if (x[o + 1] > b.edgeY) {
                    b.contactY = Math.max(b.contactY ?? -1, x[o + 1]);
                    const fall = 1 - Math.abs(psi) / b.slab;
                    x[o + 1] += (b.edgeY - x[o + 1]) * Math.min(1, fall * 1.6);
                }
            }
        }
    }

    /* ---------- snitt ----------
       Plan: n·x = d (n vågrät). Segmentet a→b på bordet begränsar vilka
       bitar som berörs. Returnerar antalet nya bitar (0 = inget snitt). */
    cut(n, d, seg) {
        const out = [];
        let changed = false;
        const ux = seg.bx - seg.ax, uz = seg.bz - seg.az, L = Math.hypot(ux, uz) || 1;
        for (const p of this.pieces) {
            const psi = new Float32Array(p.n);
            let touched = false, pos = false, neg = false;
            for (let a = 0; a < p.n; a++) {
                const o = 3 * a;
                let v = n[0] * p.x[o] + n[1] * p.x[o + 1] + n[2] * p.x[o + 2] - d;
                if (Math.abs(v) < 1e-6) v = 1e-6;
                psi[a] = v;
                if (v > 0) pos = true; else neg = true;
                if (Math.abs(v) < H) {
                    const s = ((p.x[o] - seg.ax) * ux + (p.x[o + 2] - seg.az) * uz) / L;
                    if (s > -0.015 && s < L + 0.015) touched = true;
                }
            }
            if (!touched || !pos || !neg) { out.push(p); continue; }
            const kids = [];
            for (const side of [1, -1]) {
                const sidePsi = psi.map(v => v * side);
                // celler på denna sida som innehåller gelé
                const tmp = { cuts: [...p.cuts, sidePsi] };
                const inc = [];
                for (let c = 0; c < p.nc; c++) {
                    let any = false;
                    for (let q = 0; q < 8 && !any; q++) if (sidePsi[p.cellNodes[8 * c + q]] > 0) any = true;
                    if (!any) continue;
                    let has = false;
                    const M = 4;
                    for (let a = 0; a < M && !has; a++) for (let b = 0; b < M && !has; b++) for (let e = 0; e < M && !has; e++) {
                        const u = (a + 0.5) / M, v = (b + 0.5) / M, w = (e + 0.5) / M;
                        const px = OX + (p.ci[c] + u) * H, py = OY + (p.cj[c] + v) * H, pz = OZ + (p.ck[c] + w) * H;
                        let f = sdShape(px, py, pz);
                        for (const cut of tmp.cuts) f = smax(f, -p.trilin(cut, c, u, v, w), P.KC);
                        if (f < 0) has = true;
                    }
                    if (has) inc.push(c);
                }
                // sammanhängande komponenter (grannar via sidoyta)
                const inSet = new Set(inc);
                const seen = new Set();
                for (const c0 of inc) {
                    if (seen.has(c0)) continue;
                    const comp = [c0]; seen.add(c0);
                    for (let h = 0; h < comp.length; h++) {
                        const c = comp[h];
                        const i = p.ci[c], j = p.cj[c], k = p.ck[c];
                        for (const [di, dj, dk] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
                            const a = i + di, b = j + dj, e = k + dk;
                            if (a < 0 || a >= NX || b < 0 || b >= NYC || e < 0 || e >= NZ) continue;
                            const nb = p.cellMap.get(cellKey(a, b, e));
                            if (nb !== undefined && inSet.has(nb) && !seen.has(nb)) { seen.add(nb); comp.push(nb); }
                        }
                    }
                    kids.push({ cells: comp, side, sidePsi });
                }
            }
            if (kids.length < 2) { out.push(p); continue; }
            changed = true;
            for (const kid of kids) {
                const child = this.makeChild(p, kid.cells, kid.sidePsi);
                if (child.materialVolume < 0.12 * H * H * H) continue;       // smulor försvinner
                // knivens kil: bitarna glider isär
                for (let a = 0; a < child.n; a++) {
                    child.v[3 * a] += n[0] * 0.07 * kid.side;
                    child.v[3 * a + 2] += n[2] * 0.07 * kid.side;
                }
                out.push(child);
            }
            // frön: till den bit där fröets mitt ligger djupast
            const kidsNow = out.filter(k => k.parentRef === p);
            for (const s of p.seeds) {
                const c = SEEDS[s].c;
                let best = null, bd = 0.004;
                for (const k of kidsNow) {
                    const f = k.fieldAt(c[0], c[1], c[2]);
                    if (f < bd) { bd = f; best = k; }
                }
                if (best) best.seeds.push(s);
            }
        }
        if (!changed) return 0;
        const before = this.pieces.length;
        if (this.grab && !out.includes(this.grab.piece)) this.grab = null;
        this.pieces = out;
        for (const q of out) q.parentRef = undefined;
        if (this.onChange) this.onChange();
        return out.length - before;
    }

    makeChild(p, cells, sidePsi) {
        const keys = Int32Array.from(cells.map(c => p.keys[c]));
        const gset = new Set();
        for (const c of cells) for (let b = 0; b < 8; b++) gset.add(p.gids[p.cellNodes[8 * c + b]]);
        const gids = Int32Array.from([...gset].sort((a, b) => a - b));
        const n = gids.length;
        const x = new Float32Array(3 * n), v = new Float32Array(3 * n);
        const cuts = p.cuts.map(() => new Float32Array(n));
        const newPsi = new Float32Array(n);
        for (let a = 0; a < n; a++) {
            const src = p.gidMap.get(gids[a]);
            x[3 * a] = p.x[3 * src]; x[3 * a + 1] = p.x[3 * src + 1]; x[3 * a + 2] = p.x[3 * src + 2];
            v[3 * a] = p.v[3 * src]; v[3 * a + 1] = p.v[3 * src + 1]; v[3 * a + 2] = p.v[3 * src + 2];
            for (let q = 0; q < cuts.length; q++) cuts[q][a] = p.cuts[q][src];
            newPsi[a] = sidePsi[src];
        }
        cuts.push(newPsi);
        const child = new Piece(this, { keys, gids, x, v, cuts });
        child.parentRef = p;
        return child;
    }

    /* ---------- knuff ---------- */
    nudge() {
        const ang = Math.random() * Math.PI * 2;
        const tx = Math.cos(ang), tz = Math.sin(ang);
        for (const p of this.pieces) {
            let cx = 0, cz = 0, M = 0;
            for (let a = 0; a < p.n; a++) { cx += p.mass[a] * p.x[3 * a]; cz += p.mass[a] * p.x[3 * a + 2]; M += p.mass[a]; }
            cx /= M; cz /= M;
            for (let a = 0; a < p.n; a++) {
                const o = 3 * a;
                const r = (p.x[o] - cx) * tx + (p.x[o + 2] - cz) * tz;
                p.v[o + 1] += 0.55 + r * 5;
                p.v[o] += tx * 0.05; p.v[o + 2] += tz * 0.05;
            }
        }
    }

    stats() {
        let ek = 0, v = 0, v0 = 0, mass = 0;
        for (const p of this.pieces) {
            ek += p.kinetic();
            const [a, b] = p.volumeRatio(); v += a; v0 += b;
            mass += p.materialVolume * P.RHO;
        }
        return { kinetic: ek, volume: v0 > 0 ? v / v0 : 1, mass, pieces: this.pieces.length };
    }
}
