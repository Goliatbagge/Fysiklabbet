/* rubik-losare.js — lösare för Rubiks kub (körs som Web Worker).

   Två steg:
   1. Kociembas tvåfasalgoritm hittar snabbt en lösning på runt 20 drag och
      fortsätter sedan leta kortare lösningar så länge tidsbudgeten räcker.
   2. En uttömmande IDA*-sökning försöker BEVISA att den bästa lösningen är
      kortast möjliga (eller hittar en kortare). Heuristiken är det största av
      fas 1-tabellerna längs alla tre axlarna (kuben konjugerad med en
      120°-rotation kring hörndiagonalen) och hörnpermutationens avstånd. Alla
      är undre gränser för det verkliga avståndet, så sökningen är exakt.

   Drag räknas i halvvarvsmetrik (HTM): U, U2 och U' är ett drag vardera.

   Filen fungerar också i Node (module.exports) för test. */
(function () {
'use strict';

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

// ---------- Kubbitar (Kociembas numrering) ----------
// Hörn: URF UFL ULB UBR DFR DLF DBL DRB   Kanter: UR UF UL UB DR DF DL DB FR FL BL BR
function cub(cp, co, ep, eo) { return { cp: cp.slice(), co: co.slice(), ep: ep.slice(), eo: eo.slice() }; }
const Z8 = [0,0,0,0,0,0,0,0], Z12 = [0,0,0,0,0,0,0,0,0,0,0,0];
const ID = cub([0,1,2,3,4,5,6,7], Z8, [0,1,2,3,4,5,6,7,8,9,10,11], Z12);
const BASIC = [
  cub([3,0,1,2,4,5,6,7], Z8, [3,0,1,2,4,5,6,7,8,9,10,11], Z12),                                   // U
  cub([4,1,2,0,7,5,6,3], [2,0,0,1,1,0,0,2], [8,1,2,3,11,5,6,7,4,9,10,0], Z12),                    // R
  cub([1,5,2,3,0,4,6,7], [1,2,0,0,2,1,0,0], [0,9,2,3,4,8,6,7,1,5,10,11], [0,1,0,0,0,1,0,0,1,1,0,0]), // F
  cub([0,1,2,3,5,6,7,4], Z8, [0,1,2,3,5,6,7,4,8,9,10,11], Z12),                                   // D
  cub([0,2,6,3,4,1,5,7], [0,1,2,0,0,2,1,0], [0,1,10,3,4,5,9,7,8,2,6,11], Z12),                    // L
  cub([0,1,3,7,4,5,2,6], [0,0,1,2,0,0,2,1], [0,1,2,11,4,5,6,10,8,9,3,7], [0,0,0,1,0,0,0,1,0,0,1,1]), // B
];
function mul(a, b) {
  const r = cub(Z8, Z8, Z12, Z12);
  for (let i = 0; i < 8; i++) { r.cp[i] = a.cp[b.cp[i]]; r.co[i] = (a.co[b.cp[i]] + b.co[i]) % 3; }
  for (let i = 0; i < 12; i++) { r.ep[i] = a.ep[b.ep[i]]; r.eo[i] = (a.eo[b.ep[i]] + b.eo[i]) % 2; }
  return r;
}
function inv(a) {
  const r = cub(Z8, Z8, Z12, Z12);
  for (let i = 0; i < 8; i++) { r.cp[a.cp[i]] = i; r.co[a.cp[i]] = (3 - a.co[i]) % 3; }
  for (let i = 0; i < 12; i++) { r.ep[a.ep[i]] = i; r.eo[a.ep[i]] = (2 - a.eo[i]) % 2; }
  return r;
}
function same(a, b) {
  for (let i = 0; i < 8; i++) if (a.cp[i] !== b.cp[i] || a.co[i] !== b.co[i]) return false;
  for (let i = 0; i < 12; i++) if (a.ep[i] !== b.ep[i] || a.eo[i] !== b.eo[i]) return false;
  return true;
}
const MOVES = [];
for (let f = 0; f < 6; f++) { let c = ID; for (let p = 0; p < 3; p++) { c = mul(c, BASIC[f]); MOVES.push(c); } }
const MOVE_NAMES = [];
for (const f of 'URFDLB') for (const s of ['', '2', "'"]) MOVE_NAMES.push(f + s);
const P2 = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16];          // U U2 U' R2 F2 D D2 D' L2 B2
const isP2 = new Uint8Array(18); for (const m of P2) isP2[m] = 1;

// 120° rotation kring URF–DBL-diagonalen (U→R→F→U)
const S_URF = cub([0,4,5,1,3,7,6,2], [1,2,1,2,2,1,2,1], [1,8,5,9,3,11,7,10,0,4,6,2], [1,0,1,0,1,0,1,0,1,1,1,1]);
const S_URF_INV = inv(S_URF);
const S2 = mul(S_URF, S_URF), S2_INV = inv(S2);

// ---------- Koordinater ----------
const Cnk = []; for (let n = 0; n < 13; n++) { Cnk.push([]); for (let k = 0; k < 13; k++) Cnk[n].push(k > n ? 0 : k === 0 || k === n ? 1 : Cnk[n-1][k-1] + Cnk[n-1][k]); }
const C = (n, k) => (k > n || k < 0) ? 0 : Cnk[n][k];

function getTwist(c) { let t = 0; for (let i = 0; i < 7; i++) t = t * 3 + c.co[i]; return t; }
function setTwist(c, t) { let s = 0; for (let i = 6; i >= 0; i--) { c.co[i] = t % 3; s += c.co[i]; t = (t / 3) | 0; } c.co[7] = (3 - s % 3) % 3; }
function getFlip(c) { let t = 0; for (let i = 0; i < 11; i++) t = t * 2 + c.eo[i]; return t; }
function setFlip(c, t) { let s = 0; for (let i = 10; i >= 0; i--) { c.eo[i] = t & 1; s += c.eo[i]; t >>= 1; } c.eo[11] = (2 - s % 2) % 2; }
function getSlice(c) { let a = 0, x = 0; for (let j = 11; j >= 0; j--) if (c.ep[j] >= 8) { a += C(11 - j, x + 1); x++; } return a; }
function setSlice(c, a) {
  let x = 4, s = 8, o = 0;
  for (let j = 0; j < 12; j++) {
    if (x > 0 && a - C(11 - j, x) >= 0) { c.ep[j] = s++; a -= C(11 - j, x); x--; }
    else c.ep[j] = o++;
  }
}
const FACT = [1,1,2,6,24,120,720,5040,40320];
function rank(arr, off, n, base) {
  let r = 0;
  for (let i = 0; i < n; i++) { let k = 0; for (let j = i + 1; j < n; j++) if (arr[off + j] < arr[off + i]) k++; r = r * (n - i) + k; }
  return r;
}
function unrank(arr, off, n, base, r) {
  const d = new Array(n);
  for (let i = n - 1; i >= 0; i--) { d[i] = r % (n - i); r = (r / (n - i)) | 0; }
  const av = []; for (let i = 0; i < n; i++) av.push(base + i);
  for (let i = 0; i < n; i++) arr[off + i] = av.splice(d[i], 1)[0];
}

// ---------- Tabeller ----------
const NT = 2187, NF = 2048, NS = 495, NCP = 40320, NEP = 40320, NSP = 24;
let twistMv, flipMv, sliceMv, cpMv, epMv, spMv, tsPrune, fsPrune, cpsPrune, epsPrune, cpDist, conj1, conj2;
let ready = false;

function moveTable(n, nm, moves, set, get) {
  const t = new Uint16Array(n * nm);
  const c = cub(ID.cp, ID.co, ID.ep, ID.eo);
  for (let i = 0; i < n; i++) {
    set(c, i);
    for (let k = 0; k < nm; k++) t[i * nm + k] = get(mul(c, MOVES[moves[k]]));
  }
  return t;
}
function prune(n1, n2, m1, m2, nm, startIdx) {
  // BFS över produktkoordinaten n1*n2 (index i1*n2+i2)
  const N = n1 * n2, d = new Int8Array(N).fill(-1);
  d[startIdx] = 0; let done = 1, depth = 0;
  while (done < N) {
    let any = false;
    for (let i = 0; i < N; i++) {
      if (d[i] !== depth) continue;
      const a = (i / n2) | 0, b = i - a * n2;
      for (let k = 0; k < nm; k++) {
        const j = m1[a * nm + k] * n2 + m2[b * nm + k];
        if (d[j] < 0) { d[j] = depth + 1; done++; any = true; }
      }
    }
    if (!any) break;
    depth++;
  }
  return d;
}

function init() {
  const t0 = now();
  const ALL = []; for (let m = 0; m < 18; m++) ALL.push(m);
  twistMv = moveTable(NT, 18, ALL, setTwist, getTwist);
  flipMv = moveTable(NF, 18, ALL, setFlip, getFlip);
  sliceMv = moveTable(NS, 18, ALL, setSlice, getSlice);
  cpMv = moveTable(NCP, 18, ALL, (c, i) => unrank(c.cp, 0, 8, 0, i), c => rank(c.cp, 0, 8, 0));
  epMv = moveTable(NEP, 10, P2, (c, i) => { unrank(c.ep, 0, 8, 0, i); for (let j = 8; j < 12; j++) c.ep[j] = j; }, c => rank(c.ep, 0, 8, 0));
  spMv = moveTable(NSP, 10, P2, (c, i) => { for (let j = 0; j < 8; j++) c.ep[j] = j; unrank(c.ep, 8, 4, 8, i); }, c => rank(c.ep, 8, 4, 8));
  tsPrune = prune(NT, NS, twistMv, sliceMv, 18, 0);
  fsPrune = prune(NF, NS, flipMv, sliceMv, 18, 0);
  cpsPrune = prune(NCP, NSP, cpMv.length === NCP * 18 ? p2sub(cpMv) : cpMv, spMv, 10, 0);
  epsPrune = prune(NEP, NSP, epMv, spMv, 10, 0);
  // hörnpermutationens avstånd med alla 18 drag
  cpDist = new Int8Array(NCP).fill(-1); cpDist[0] = 0;
  for (let depth = 0, done = 1; done < NCP; depth++) {
    for (let i = 0; i < NCP; i++) if (cpDist[i] === depth) for (let k = 0; k < 18; k++) { const j = cpMv[i * 18 + k]; if (cpDist[j] < 0) { cpDist[j] = depth + 1; done++; } }
  }
  // konjugerade drag: S m S^-1
  const find = cc => { for (let k = 0; k < 18; k++) if (same(cc, MOVES[k])) return k; throw new Error('konjugat saknas'); };
  conj1 = new Uint8Array(18); conj2 = new Uint8Array(18);
  for (let m = 0; m < 18; m++) {
    conj1[m] = find(mul(mul(S_URF, MOVES[m]), S_URF_INV));
    conj2[m] = find(mul(mul(S2, MOVES[m]), S2_INV));
  }
  ready = true;
  return now() - t0;
}
// hörnpermutationens flyttabell begränsad till fas 2-dragen
function p2sub(t) {
  const r = new Uint16Array(NCP * 10);
  for (let i = 0; i < NCP; i++) for (let k = 0; k < 10; k++) r[i * 10 + k] = t[i * 18 + P2[k]];
  return r;
}
let cpMv2 = null;

// ---------- Fasellsträng → kubbitar ----------
// Fasellordning U1..U9 R1..R9 F1..F9 D1..D9 L1..L9 B1..B9
const CF = [[8,9,20],[6,18,38],[0,36,47],[2,45,11],[29,26,15],[27,44,24],[33,53,42],[35,17,51]];
const EF = [[5,10],[7,19],[3,37],[1,46],[32,16],[28,25],[30,43],[34,52],[23,12],[21,41],[50,39],[48,14]];
const CC = ['URF','UFL','ULB','UBR','DFR','DLF','DBL','DRB'];
const EC = ['UR','UF','UL','UB','DR','DF','DL','DB','FR','FL','BL','BR'];
function fromFacelets(f) {
  const c = cub(Z8, Z8, Z12, Z12);
  const usedC = new Set(), usedE = new Set();
  for (let i = 0; i < 8; i++) {
    let ori = 0; for (; ori < 3; ori++) if (f[CF[i][ori]] === 'U' || f[CF[i][ori]] === 'D') break;
    if (ori === 3) throw new Error('ogiltigt hörn');
    const c1 = f[CF[i][(ori + 1) % 3]], c2 = f[CF[i][(ori + 2) % 3]];
    let j = 0; for (; j < 8; j++) if (CC[j][1] === c1 && CC[j][2] === c2) break;
    if (j === 8 || usedC.has(j)) throw new Error('ogiltigt hörn');
    usedC.add(j); c.cp[i] = j; c.co[i] = ori;
  }
  for (let i = 0; i < 12; i++) {
    const a = f[EF[i][0]], b = f[EF[i][1]];
    let j = 0, o = 0;
    for (; j < 12; j++) { if (EC[j][0] === a && EC[j][1] === b) { o = 0; break; } if (EC[j][0] === b && EC[j][1] === a) { o = 1; break; } }
    if (j === 12 || usedE.has(j)) throw new Error('ogiltig kant');
    usedE.add(j); c.ep[i] = j; c.eo[i] = o;
  }
  return c;
}
function isSolved(c) { return same(c, ID); }

// ---------- Tvåfasalgoritmen ----------
function twoPhase(c0, deadline, onImprove) {
  const tw = getTwist(c0), fl = getFlip(c0), sl = getSlice(c0);
  const sol1 = [], sol2 = [];
  let best = null, bestLen = 99, aborted = false, nodes = 0;
  const h1 = (t, f, s) => Math.max(tsPrune[t * NS + s], fsPrune[f * NS + s]);

  function search2(cp, ep, sp, togo, last) {
    if (togo === 0) return cp === 0 && ep === 0 && sp === 0;
    for (let k = 0; k < 10; k++) {
      const m = P2[k], f = (m / 3) | 0;
      if (last >= 0) { const lf = (last / 3) | 0; if (f === lf || (f % 3 === lf % 3 && f < lf)) continue; }
      const ncp = cpMv2[cp * 10 + k], nep = epMv[ep * 10 + k], nsp = spMv[sp * 10 + k];
      if (Math.max(cpsPrune[ncp * NSP + nsp], epsPrune[nep * NSP + nsp]) >= togo) continue;
      sol2.push(m);
      if (search2(ncp, nep, nsp, togo - 1, m)) return true;
      sol2.pop();
    }
    return false;
  }
  function phase2() {
    let c = c0; for (const m of sol1) c = mul(c, MOVES[m]);
    const cp = rank(c.cp, 0, 8, 0), ep = rank(c.ep, 0, 8, 0), sp = rank(c.ep, 8, 4, 8);
    const last = sol1.length ? sol1[sol1.length - 1] : -1;
    const h = Math.max(cpsPrune[cp * NSP + sp], epsPrune[ep * NSP + sp]);
    for (let d2 = h; sol1.length + d2 < bestLen; d2++) {
      sol2.length = 0;
      if (search2(cp, ep, sp, d2, last)) {
        best = sol1.concat(sol2); bestLen = best.length;
        if (onImprove) onImprove(best);
        return;
      }
    }
  }
  function search1(t, f, s, togo, last) {
    if (aborted) return;
    if (togo === 0) {
      if (t === 0 && f === 0 && s === 0 && !(last >= 0 && isP2[last])) phase2();
      return;
    }
    if ((++nodes & 2047) === 0 && best && now() > deadline) { aborted = true; return; }
    for (let fc = 0; fc < 6; fc++) {
      if (last >= 0) { const lf = (last / 3) | 0; if (fc === lf || (fc % 3 === lf % 3 && fc < lf)) continue; }
      for (let p = 0; p < 3; p++) {
        const m = fc * 3 + p;
        const nt = twistMv[t * 18 + m], nf = flipMv[f * 18 + m], ns = sliceMv[s * 18 + m];
        if (h1(nt, nf, ns) >= togo) continue;
        sol1.push(m);
        search1(nt, nf, ns, togo - 1, m);
        sol1.pop();
        if (aborted) return;
      }
    }
  }
  for (let d1 = h1(tw, fl, sl); d1 < bestLen && !aborted; d1++) search1(tw, fl, sl, d1, -1);
  return { moves: best, exhausted: !aborted };
}

// ---------- Uttömmande sökning (IDA*) ----------
function coordsAllAxes(c) {
  const a = [c, mul(mul(S_URF, c), S_URF_INV), mul(mul(S2, c), S2_INV)];
  return a.map(x => [getTwist(x), getFlip(x), getSlice(x)]);
}
function lowerBound(c) {
  const ax = coordsAllAxes(c);
  let h = cpDist[rank(c.cp, 0, 8, 0)];
  for (const [t, f, s] of ax) h = Math.max(h, tsPrune[t * NS + s], fsPrune[f * NS + s]);
  return h;
}
function optimal(c, maxDepth, deadline) {
  const ax = coordsAllAxes(c), cp0 = rank(c.cp, 0, 8, 0);
  const path = [];
  let aborted = false, nodes = 0;
  const H = (t0, f0, s0, t1, f1, s1, t2, f2, s2, cp) => {
    let h = cpDist[cp], v;
    v = tsPrune[t0 * NS + s0]; if (v > h) h = v; v = fsPrune[f0 * NS + s0]; if (v > h) h = v;
    v = tsPrune[t1 * NS + s1]; if (v > h) h = v; v = fsPrune[f1 * NS + s1]; if (v > h) h = v;
    v = tsPrune[t2 * NS + s2]; if (v > h) h = v; v = fsPrune[f2 * NS + s2]; if (v > h) h = v;
    return h;
  };
  function dfs(t0, f0, s0, t1, f1, s1, t2, f2, s2, cp, togo, last) {
    if (togo === 0) return t0 === 0 && f0 === 0 && s0 === 0 && cp === 0 && t1 === 0 && f1 === 0 && s1 === 0 && t2 === 0 && f2 === 0 && s2 === 0 && checkPath();
    if ((++nodes & 4095) === 0 && now() > deadline) { aborted = true; return false; }
    for (let fc = 0; fc < 6; fc++) {
      if (last >= 0) { const lf = (last / 3) | 0; if (fc === lf || (fc % 3 === lf % 3 && fc < lf)) continue; }
      for (let p = 0; p < 3; p++) {
        const m = fc * 3 + p, m1 = conj1[m], m2 = conj2[m];
        const a0 = twistMv[t0 * 18 + m], b0 = flipMv[f0 * 18 + m], c0 = sliceMv[s0 * 18 + m];
        const a1 = twistMv[t1 * 18 + m1], b1 = flipMv[f1 * 18 + m1], c1 = sliceMv[s1 * 18 + m1];
        const a2 = twistMv[t2 * 18 + m2], b2 = flipMv[f2 * 18 + m2], c2 = sliceMv[s2 * 18 + m2];
        const ncp = cpMv[cp * 18 + m];
        if (H(a0, b0, c0, a1, b1, c1, a2, b2, c2, ncp) >= togo) continue;
        path.push(m);
        if (dfs(a0, b0, c0, a1, b1, c1, a2, b2, c2, ncp, togo - 1, m)) return true;
        path.pop();
        if (aborted) return false;
      }
    }
    return false;
  }
  // Koordinaterna ovan fångar inte kantpermutationen fullt ut, så en
  // kandidat kontrolleras på riktigt innan den godkänns.
  function checkPath() { let x = c; for (const m of path) x = mul(x, MOVES[m]); return isSolved(x); }
  const h0 = H(ax[0][0], ax[0][1], ax[0][2], ax[1][0], ax[1][1], ax[1][2], ax[2][0], ax[2][1], ax[2][2], cp0);
  for (let d = h0; d <= maxDepth; d++) {
    if (dfs(ax[0][0], ax[0][1], ax[0][2], ax[1][0], ax[1][1], ax[1][2], ax[2][0], ax[2][1], ax[2][2], cp0, d, -1)) return { moves: path.slice(), complete: true };
    if (aborted) return { moves: null, complete: false, reached: d };
  }
  return { moves: null, complete: true };
}

// ---------- Ingång ----------
function solve(facelets, budgetMs, onProgress) {
  if (!ready) init();
  if (!cpMv2) cpMv2 = p2sub(cpMv);
  const c = fromFacelets(facelets);
  if (isSolved(c)) return { moves: [], optimal: true };
  const t0 = now();
  // Kort ställning: låt den uttömmande sökningen gå först, den är exakt.
  const lb = lowerBound(c);
  const tp = twoPhase(c, t0 + budgetMs * 0.4, m => onProgress && onProgress(m.map(x => MOVE_NAMES[x])));
  let best = tp.moves, opt = false;
  if (best.length <= lb) opt = true;
  else {
    const r = optimal(c, best.length - 1, t0 + budgetMs);
    if (r.moves) { best = r.moves; opt = true; }
    else if (r.complete) opt = true;
  }
  // säkerhetskontroll
  let x = c; for (const m of best) x = mul(x, MOVES[m]);
  if (!isSolved(x)) throw new Error('lösningen löser inte kuben');
  return { moves: best.map(m => MOVE_NAMES[m]), optimal: opt, lowerBound: lb, ms: Math.round(now() - t0) };
}
function bound(facelets) {
  if (!ready) init();
  const c = fromFacelets(facelets);
  return isSolved(c) ? 0 : Math.max(1, lowerBound(c));
}

const api = { init, solve, bound, fromFacelets, MOVES, MOVE_NAMES, mul, ID, isSolved };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  const ms = init();
  cpMv2 = p2sub(cpMv);
  self.postMessage({ type: 'ready', ms: Math.round(ms) });
  self.onmessage = e => {
    const d = e.data;
    try {
      if (d.type === 'solve') {
        const r = solve(d.facelets, d.budget || 4000, best => self.postMessage({ type: 'progress', id: d.id, length: best.length }));
        self.postMessage(Object.assign({ type: 'result', id: d.id }, r));
      } else if (d.type === 'bound') {
        self.postMessage({ type: 'bound', id: d.id, h: bound(d.facelets) });
      }
    } catch (err) { self.postMessage({ type: 'error', id: d.id, message: String(err.message || err) }); }
  };
}
})();
